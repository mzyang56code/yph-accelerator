-- ============================================================================
-- Stanford Youth Public Health Accelerator — database schema
-- Run this in the Supabase SQL editor (see SUPABASE_SETUP.md).
-- Safe to re-run: uses IF NOT EXISTS / ON CONFLICT.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table if not exists public.events (
  id           text primary key default gen_random_uuid()::text,
  title        text not null,
  date         date not null,
  end_date     date,
  location     text not null default '',
  summary      text not null default '',
  details      text,
  host         text not null default '',
  tag          text not null default 'Workshop',
  featured     boolean not null default false,
  register_url text,
  sort_order   integer not null default 0,
  photo_url    text,
  created_at   timestamptz not null default now()
);

-- Older databases created before these columns existed won't have them.
alter table public.events add column if not exists details text;
alter table public.events add column if not exists sort_order integer not null default 0;
alter table public.events add column if not exists photo_url text;

-- Backfill sort_order once, in the calendar's existing (soonest-first) order —
-- but only if nothing has customized it yet, so re-running this file never
-- clobbers an admin's manual ordering.
do $$
begin
  if not exists (select 1 from public.events where sort_order <> 0) then
    update public.events e
    set sort_order = ranked.rn
    from (
      select id, row_number() over (order by date asc) as rn
      from public.events
    ) ranked
    where e.id = ranked.id;
  end if;
end $$;

create table if not exists public.workshops (
  id           text primary key default gen_random_uuid()::text,
  title        text not null,
  category     text not null default 'Research skills',
  summary      text not null default '',
  released     date not null default current_date,
  duration_min integer not null default 45,
  drive_url    text not null default '#',
  file_kind    text not null default 'Slides',
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now()
);

-- Older databases created before manual ordering was supported won't have the column.
alter table public.workshops add column if not exists sort_order integer not null default 0;

-- Backfill sort_order once, in the library's existing (newest-first) order —
-- but only if nothing has customized it yet, so re-running this file never
-- clobbers an admin's manual ordering.
do $$
begin
  if not exists (select 1 from public.workshops where sort_order <> 0) then
    update public.workshops w
    set sort_order = ranked.rn
    from (
      select id, row_number() over (order by released desc) as rn
      from public.workshops
    ) ranked
    where w.id = ranked.id;
  end if;
end $$;

create table if not exists public.workshop_categories (
  id         text primary key default gen_random_uuid()::text,
  label      text not null unique,
  color      text not null default '#8c1515',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id          text primary key default gen_random_uuid()::text,
  name        text not null,
  role        text not null default '',
  affiliation text not null default '',
  bio         text not null default '',
  kind        text not null default 'Student',
  sort_order  integer not null default 0,
  photo_url   text,
  created_at  timestamptz not null default now()
);

-- Older databases created before photos were supported won't have the column.
alter table public.team_members add column if not exists photo_url text;

create table if not exists public.site_content (
  id            text primary key default 'main',
  cohort_label  text not null default '',
  location      text not null default '',
  hero_headline text not null default '',
  hero_lede     text not null default '',
  mission_title text not null default '',
  mission_body  text not null default '',
  stats         jsonb not null default '[]'::jsonb,
  updated_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
--   • Anyone may READ (the public site).
--   • Only signed-in team members may WRITE.
--     (Keep the team small: invite users in Supabase Auth and disable public
--      sign-ups. Every authenticated user is treated as a team editor.)
-- ---------------------------------------------------------------------------
alter table public.events              enable row level security;
alter table public.workshops           enable row level security;
alter table public.workshop_categories enable row level security;
alter table public.team_members        enable row level security;
alter table public.site_content        enable row level security;

do $$
declare t text;
begin
  foreach t in array array['events','workshops','workshop_categories','team_members','site_content'] loop
    execute format('drop policy if exists "public read %1$s" on public.%1$I;', t);
    execute format('drop policy if exists "authenticated write %1$s" on public.%1$I;', t);

    execute format(
      'create policy "public read %1$s" on public.%1$I for select using (true);', t);

    execute format(
      'create policy "authenticated write %1$s" on public.%1$I
         for all to authenticated using (true) with check (true);', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Storage — a public bucket for team member photos.
--   • Anyone may READ (the public site shows the photos).
--   • Only signed-in team members may upload/replace/delete.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('team-photos', 'team-photos', true)
on conflict (id) do nothing;

drop policy if exists "public read team-photos" on storage.objects;
drop policy if exists "authenticated write team-photos" on storage.objects;

create policy "public read team-photos" on storage.objects
  for select using (bucket_id = 'team-photos');

create policy "authenticated write team-photos" on storage.objects
  for all to authenticated
  using (bucket_id = 'team-photos')
  with check (bucket_id = 'team-photos');

-- ---------------------------------------------------------------------------
-- Storage — a public bucket for event photos/flyers.
--   • Anyone may READ (the public site shows the photo in the event popup).
--   • Only signed-in team members may upload/replace/delete.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('event-photos', 'event-photos', true)
on conflict (id) do nothing;

drop policy if exists "public read event-photos" on storage.objects;
drop policy if exists "authenticated write event-photos" on storage.objects;

create policy "public read event-photos" on storage.objects
  for select using (bucket_id = 'event-photos');

create policy "authenticated write event-photos" on storage.objects
  for all to authenticated
  using (bucket_id = 'event-photos')
  with check (bucket_id = 'event-photos');

-- ---------------------------------------------------------------------------
-- Seed content (matches the site''s built-in demo content; edit or delete
-- freely from the admin once you''re set up).
-- ---------------------------------------------------------------------------
insert into public.site_content (id, cohort_label, location, hero_headline, hero_lede, mission_title, mission_body, stats)
values (
  'main',
  'Cohort 2026',
  'San Francisco Bay Area',
  'Elevating young people to lead public health in the Bay.',
  'We''re a Stanford program that pairs students with mentors, teaches them how public health actually works, and helps them take on a real problem in their own community.',
  'Learn the basics, then put them to work.',
  'The best public health usually comes from people who know a community from the inside. We pair students across the Bay Area with Stanford mentors, teach them the essentials — reading data, running a study, explaining it clearly — then help them use it somewhere real: their school, their neighborhood, a clinic down the street.',
  '[{"value":"48","label":"Students mentored this cohort"},{"value":"30+","label":"Workshops in the library"},{"value":"12","label":"Youth-led community projects"},{"value":"9","label":"Partner clinics & schools"}]'::jsonb
)
on conflict (id) do nothing;

insert into public.events (id, title, date, end_date, location, summary, host, tag, featured, register_url) values
  ('immunization-mapping-2026','Mapping Immunization Gaps in Santa Clara County','2026-07-19',null,'Li Ka Shing Center, Stanford','Student teams present interactive maps of childhood vaccination coverage and propose outreach for the neighborhoods most left behind.','Epidemiology track students','Symposium',true,'#'),
  ('air-quality-walk','Air Quality Field Walk & Sensor Build','2026-07-26',null,'East Palo Alto','Build a low-cost particulate sensor, then walk a transect through the neighborhood logging readings and talking with residents.','Aanya R. & the Environmental Health group','Field visit',true,'#'),
  ('biostats-bootcamp','Weekend Biostatistics Bootcamp','2026-08-02','2026-08-03','Online','Two days from means to models — confidence intervals, p-values done honestly, and reading a study without being fooled.','Biostatistics mentors','Workshop',true,'#'),
  ('fall-info-session','Fall Cohort — Information Session for Families','2026-08-14',null,'Online','What the program asks of students, what it offers, and how to apply. Bring questions; we''ll stay as long as there are any.','Program staff','Info session',false,'#'),
  ('community-clinic-day','Community Health Screening Day','2026-08-23',null,'Fair Oaks Community Center, Redwood City','Students support a free blood-pressure and health-literacy clinic alongside partner physicians. Spanish-speaking volunteers especially needed.','Health Equity track students','Community',false,'#')
on conflict (id) do nothing;

insert into public.workshop_categories (label, color, sort_order) values
  ('Epidemiology','#8c1515',1),
  ('Biostatistics','#175e54',2),
  ('Health equity','#b1040e',3),
  ('Global health','#2e8b7a',4),
  ('Research skills','#cdb98d',5),
  ('Policy','#5a5750',6)
on conflict (label) do nothing;

insert into public.workshops (id, title, category, summary, released, duration_min, drive_url, file_kind) values
  ('intro-epi-curves','Reading an Epidemic Curve','Epidemiology','What the shape of an outbreak tells you — index cases, incubation, and why the curve bends when it does.','2026-06-30',45,'#','Slides'),
  ('study-design','Cohort vs. Case-Control: Choosing a Study Design','Research skills','A plain-language guide to the workhorse designs of public health research and when each one earns its keep.','2026-06-22',50,'#','Slides'),
  ('confidence-intervals','Confidence Intervals Without the Panic','Biostatistics','Where the interval comes from, what it does and doesn''t promise, and how to compute one in a spreadsheet.','2026-06-15',40,'#','Workbook'),
  ('health-equity-frameworks','The Social Determinants of Health','Health equity','Zip code over genetic code: how housing, income, and race shape health long before anyone reaches a clinic.','2026-06-08',55,'#','Recording'),
  ('survey-design','Writing a Survey People Will Answer Honestly','Research skills','Question order, leading language, and the quiet biases that ruin a questionnaire before it''s sent.','2026-05-30',35,'#','Slides'),
  ('vaccine-policy','How a Vaccine Recommendation Becomes Policy','Policy','From clinical trial to the ACIP schedule — the committees, evidence, and trade-offs along the way.','2026-05-21',50,'#','Recording'),
  ('global-burden','Reading the Global Burden of Disease','Global health','DALYs, YLLs, and how researchers compare a world of very different illnesses on one honest scale.','2026-05-12',45,'#','Reading'),
  ('data-cleaning','Cleaning Messy Health Data','Biostatistics','The unglamorous 80% of every project — missing values, duplicates, and dates that refuse to behave.','2026-05-03',60,'#','Workbook')
on conflict (id) do nothing;

insert into public.team_members (id, name, role, affiliation, bio, kind, sort_order) values
  ('director','Dr. Elena Marquez','Faculty Director','Stanford School of Medicine','Epidemiologist studying vaccine access in immigrant communities. Founded the Accelerator to bring that work within reach of students.','Staff',1),
  ('program-lead','Jordan Whitfield','Program Manager','Stanford Center for Health Education','Runs the day-to-day: cohorts, mentors, logistics, and the shared calendar that somehow holds it all together.','Staff',2),
  ('mentor-epi','Priya Nair','Epidemiology Mentor','PhD candidate, Epidemiology & Population Health','Studies respiratory disease surveillance. Teaches students to tell a real signal from noise.','Mentor',3),
  ('mentor-biostat','Marcus Bell','Biostatistics Mentor','MS, Biostatistics','Believes anyone can learn statistics if you throw out the jargon and keep the ideas.','Mentor',4),
  ('student-aanya','Aanya Reddy','Student Fellow · Environmental Health','Class of 2027','Leading the air-quality field study in East Palo Alto. Wants to be the first epidemiologist in her family.','Student',5),
  ('student-diego','Diego Fuentes','Student Fellow · Health Equity','Class of 2026','Building a Spanish-language health-literacy toolkit with a partner clinic in Redwood City.','Student',6)
on conflict (id) do nothing;
