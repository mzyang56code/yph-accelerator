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
  host         text not null default '',
  tag          text not null default 'Workshop',
  featured     boolean not null default false,
  register_url text,
  created_at   timestamptz not null default now()
);

create table if not exists public.workshops (
  id           text primary key default gen_random_uuid()::text,
  title        text not null,
  category     text not null default 'Research skills',
  summary      text not null default '',
  released     date not null default current_date,
  duration_min integer not null default 45,
  drive_url    text not null default '#',
  file_kind    text not null default 'Slides',
  created_at   timestamptz not null default now()
);

create table if not exists public.team_members (
  id          text primary key default gen_random_uuid()::text,
  name        text not null,
  role        text not null default '',
  affiliation text not null default '',
  bio         text not null default '',
  kind        text not null default 'Student',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

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
alter table public.events        enable row level security;
alter table public.workshops     enable row level security;
alter table public.team_members  enable row level security;
alter table public.site_content  enable row level security;

do $$
declare t text;
begin
  foreach t in array array['events','workshops','team_members','site_content'] loop
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
