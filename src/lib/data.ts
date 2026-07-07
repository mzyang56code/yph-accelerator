/**
 * Content accessors for the Stanford Youth Public Health Accelerator.
 *
 * Each accessor reads from Supabase when it's configured, and falls back to the
 * built-in seed content otherwise — so the site always renders, even before the
 * backend is connected. Public reads use the cookie-free anon client.
 *
 * DB columns are snake_case; the mappers below convert them to these types.
 */
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicClient } from "@/lib/supabase/public";

export type EventTag =
  | "Workshop"
  | "Symposium"
  | "Field visit"
  | "Community"
  | "Info session";

export type WorkshopCategory =
  | "Epidemiology"
  | "Biostatistics"
  | "Health equity"
  | "Global health"
  | "Research skills"
  | "Policy";

export type WorkshopFileKind = "Slides" | "Recording" | "Workbook" | "Reading";

export type TeamKind = "Student" | "Mentor" | "Staff";

export type Event = {
  id: string;
  title: string;
  date: string; // ISO date
  endDate?: string;
  location: string;
  summary: string;
  host: string; // the student(s) running it
  tag: EventTag;
  featured: boolean;
  registerUrl?: string;
};

export type Workshop = {
  id: string;
  title: string;
  category: WorkshopCategory;
  summary: string;
  released: string; // ISO date
  durationMin: number;
  driveUrl: string; // link to the file/folder in the shared Google Drive
  fileKind: WorkshopFileKind;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  bio: string;
  kind: TeamKind;
  sortOrder: number;
};

export type SiteContent = {
  cohortLabel: string;
  location: string;
  heroHeadline: string;
  heroLede: string;
  missionTitle: string;
  missionBody: string;
  stats: { value: string; label: string }[];
};

// select-option lists, shared with the admin forms
export const eventTags: EventTag[] = [
  "Workshop", "Symposium", "Field visit", "Community", "Info session",
];
export const workshopCategories: WorkshopCategory[] = [
  "Epidemiology", "Biostatistics", "Health equity", "Global health", "Research skills", "Policy",
];
export const workshopFileKinds: WorkshopFileKind[] = [
  "Slides", "Recording", "Workbook", "Reading",
];
export const teamKinds: TeamKind[] = ["Staff", "Mentor", "Student"];

// ---------------------------------------------------------------------------
// Seed content (fallback when Supabase isn't configured)
// ---------------------------------------------------------------------------
const seedSiteContent: SiteContent = {
  cohortLabel: "Cohort 2026",
  location: "San Francisco Bay Area",
  heroHeadline: "Elevating young people to lead public health in the Bay.",
  heroLede:
    "We're a Stanford program that pairs students with mentors, teaches them how public health actually works, and helps them take on a real problem in their own community.",
  missionTitle: "Learn the basics, then put them to work.",
  missionBody:
    "The best public health usually comes from people who know a community from the inside. We pair students across the Bay Area with Stanford mentors, teach them the essentials — reading data, running a study, explaining it clearly — then help them use it somewhere real: their school, their neighborhood, a clinic down the street.",
  stats: [
    { value: "48", label: "Students mentored this cohort" },
    { value: "30+", label: "Workshops in the library" },
    { value: "12", label: "Youth-led community projects" },
    { value: "9", label: "Partner clinics & schools" },
  ],
};

const seedEvents: Event[] = [
  { id: "immunization-mapping-2026", title: "Mapping Immunization Gaps in Santa Clara County", date: "2026-07-19", location: "Li Ka Shing Center, Stanford", summary: "Student teams present interactive maps of childhood vaccination coverage and propose outreach for the neighborhoods most left behind.", host: "Epidemiology track students", tag: "Symposium", featured: true, registerUrl: "#" },
  { id: "air-quality-walk", title: "Air Quality Field Walk & Sensor Build", date: "2026-07-26", location: "East Palo Alto", summary: "Build a low-cost particulate sensor, then walk a transect through the neighborhood logging readings and talking with residents.", host: "Aanya R. & the Environmental Health group", tag: "Field visit", featured: true, registerUrl: "#" },
  { id: "biostats-bootcamp", title: "Weekend Biostatistics Bootcamp", date: "2026-08-02", endDate: "2026-08-03", location: "Online", summary: "Two days from means to models — confidence intervals, p-values done honestly, and reading a study without being fooled.", host: "Biostatistics mentors", tag: "Workshop", featured: true, registerUrl: "#" },
  { id: "fall-info-session", title: "Fall Cohort — Information Session for Families", date: "2026-08-14", location: "Online", summary: "What the program asks of students, what it offers, and how to apply. Bring questions; we'll stay as long as there are any.", host: "Program staff", tag: "Info session", featured: false, registerUrl: "#" },
  { id: "community-clinic-day", title: "Community Health Screening Day", date: "2026-08-23", location: "Fair Oaks Community Center, Redwood City", summary: "Students support a free blood-pressure and health-literacy clinic alongside partner physicians. Spanish-speaking volunteers especially needed.", host: "Health Equity track students", tag: "Community", featured: false, registerUrl: "#" },
];

const seedWorkshops: Workshop[] = [
  { id: "intro-epi-curves", title: "Reading an Epidemic Curve", category: "Epidemiology", summary: "What the shape of an outbreak tells you — index cases, incubation, and why the curve bends when it does.", released: "2026-06-30", durationMin: 45, driveUrl: "#", fileKind: "Slides" },
  { id: "study-design", title: "Cohort vs. Case-Control: Choosing a Study Design", category: "Research skills", summary: "A plain-language guide to the workhorse designs of public health research and when each one earns its keep.", released: "2026-06-22", durationMin: 50, driveUrl: "#", fileKind: "Slides" },
  { id: "confidence-intervals", title: "Confidence Intervals Without the Panic", category: "Biostatistics", summary: "Where the interval comes from, what it does and doesn't promise, and how to compute one in a spreadsheet.", released: "2026-06-15", durationMin: 40, driveUrl: "#", fileKind: "Workbook" },
  { id: "health-equity-frameworks", title: "The Social Determinants of Health", category: "Health equity", summary: "Zip code over genetic code: how housing, income, and race shape health long before anyone reaches a clinic.", released: "2026-06-08", durationMin: 55, driveUrl: "#", fileKind: "Recording" },
  { id: "survey-design", title: "Writing a Survey People Will Answer Honestly", category: "Research skills", summary: "Question order, leading language, and the quiet biases that ruin a questionnaire before it's sent.", released: "2026-05-30", durationMin: 35, driveUrl: "#", fileKind: "Slides" },
  { id: "vaccine-policy", title: "How a Vaccine Recommendation Becomes Policy", category: "Policy", summary: "From clinical trial to the ACIP schedule — the committees, evidence, and trade-offs along the way.", released: "2026-05-21", durationMin: 50, driveUrl: "#", fileKind: "Recording" },
  { id: "global-burden", title: "Reading the Global Burden of Disease", category: "Global health", summary: "DALYs, YLLs, and how researchers compare a world of very different illnesses on one honest scale.", released: "2026-05-12", durationMin: 45, driveUrl: "#", fileKind: "Reading" },
  { id: "data-cleaning", title: "Cleaning Messy Health Data", category: "Biostatistics", summary: "The unglamorous 80% of every project — missing values, duplicates, and dates that refuse to behave.", released: "2026-05-03", durationMin: 60, driveUrl: "#", fileKind: "Workbook" },
];

const seedTeam: TeamMember[] = [
  { id: "director", name: "Dr. Elena Marquez", role: "Faculty Director", affiliation: "Stanford School of Medicine", bio: "Epidemiologist studying vaccine access in immigrant communities. Founded the Accelerator to bring that work within reach of students.", kind: "Staff", sortOrder: 1 },
  { id: "program-lead", name: "Jordan Whitfield", role: "Program Manager", affiliation: "Stanford Center for Health Education", bio: "Runs the day-to-day: cohorts, mentors, logistics, and the shared calendar that somehow holds it all together.", kind: "Staff", sortOrder: 2 },
  { id: "mentor-epi", name: "Priya Nair", role: "Epidemiology Mentor", affiliation: "PhD candidate, Epidemiology & Population Health", bio: "Studies respiratory disease surveillance. Teaches students to tell a real signal from noise.", kind: "Mentor", sortOrder: 3 },
  { id: "mentor-biostat", name: "Marcus Bell", role: "Biostatistics Mentor", affiliation: "MS, Biostatistics", bio: "Believes anyone can learn statistics if you throw out the jargon and keep the ideas.", kind: "Mentor", sortOrder: 4 },
  { id: "student-aanya", name: "Aanya Reddy", role: "Student Fellow · Environmental Health", affiliation: "Class of 2027", bio: "Leading the air-quality field study in East Palo Alto. Wants to be the first epidemiologist in her family.", kind: "Student", sortOrder: 5 },
  { id: "student-diego", name: "Diego Fuentes", role: "Student Fellow · Health Equity", affiliation: "Class of 2026", bio: "Building a Spanish-language health-literacy toolkit with a partner clinic in Redwood City.", kind: "Student", sortOrder: 6 },
];

// ---------------------------------------------------------------------------
// Row → type mappers
// ---------------------------------------------------------------------------
/* eslint-disable @typescript-eslint/no-explicit-any */
function mapEvent(r: any): Event {
  return {
    id: r.id, title: r.title, date: r.date, endDate: r.end_date ?? undefined,
    location: r.location ?? "", summary: r.summary ?? "", host: r.host ?? "",
    tag: r.tag, featured: Boolean(r.featured), registerUrl: r.register_url ?? undefined,
  };
}
function mapWorkshop(r: any): Workshop {
  return {
    id: r.id, title: r.title, category: r.category, summary: r.summary ?? "",
    released: r.released, durationMin: r.duration_min ?? 0, driveUrl: r.drive_url ?? "#",
    fileKind: r.file_kind,
  };
}
function mapTeam(r: any): TeamMember {
  return {
    id: r.id, name: r.name, role: r.role ?? "", affiliation: r.affiliation ?? "",
    bio: r.bio ?? "", kind: r.kind, sortOrder: r.sort_order ?? 0,
  };
}
function mapSiteContent(r: any): SiteContent {
  return {
    cohortLabel: r.cohort_label ?? "", location: r.location ?? "",
    heroHeadline: r.hero_headline ?? "", heroLede: r.hero_lede ?? "",
    missionTitle: r.mission_title ?? "", missionBody: r.mission_body ?? "",
    stats: Array.isArray(r.stats) ? r.stats : [],
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// ---------------------------------------------------------------------------
// Accessors
// ---------------------------------------------------------------------------
export async function getEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured()) {
    return [...seedEvents].sort((a, b) => a.date.localeCompare(b.date));
  }
  const { data, error } = await createPublicClient()
    .from("events").select("*").order("date", { ascending: true });
  if (error || !data) return [...seedEvents].sort((a, b) => a.date.localeCompare(b.date));
  return data.map(mapEvent);
}

export async function getFeaturedEvents(): Promise<Event[]> {
  return (await getEvents()).filter((e) => e.featured);
}

export async function getEventById(id: string): Promise<Event | null> {
  if (!isSupabaseConfigured()) return seedEvents.find((e) => e.id === id) ?? null;
  const { data, error } = await createPublicClient()
    .from("events").select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return mapEvent(data);
}

export async function getWorkshops(): Promise<Workshop[]> {
  if (!isSupabaseConfigured()) {
    return [...seedWorkshops].sort((a, b) => b.released.localeCompare(a.released));
  }
  const { data, error } = await createPublicClient()
    .from("workshops").select("*").order("released", { ascending: false });
  if (error || !data) return [...seedWorkshops].sort((a, b) => b.released.localeCompare(a.released));
  return data.map(mapWorkshop);
}

export async function getWorkshopById(id: string): Promise<Workshop | null> {
  if (!isSupabaseConfigured()) return seedWorkshops.find((w) => w.id === id) ?? null;
  const { data, error } = await createPublicClient()
    .from("workshops").select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return mapWorkshop(data);
}

export async function getTeam(): Promise<TeamMember[]> {
  if (!isSupabaseConfigured()) return [...seedTeam].sort((a, b) => a.sortOrder - b.sortOrder);
  const { data, error } = await createPublicClient()
    .from("team_members").select("*").order("sort_order", { ascending: true });
  if (error || !data) return [...seedTeam].sort((a, b) => a.sortOrder - b.sortOrder);
  return data.map(mapTeam);
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  if (!isSupabaseConfigured()) return seedTeam.find((m) => m.id === id) ?? null;
  const { data, error } = await createPublicClient()
    .from("team_members").select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return mapTeam(data);
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!isSupabaseConfigured()) return seedSiteContent;
  const { data, error } = await createPublicClient()
    .from("site_content").select("*").eq("id", "main").maybeSingle();
  if (error || !data) return seedSiteContent;
  return mapSiteContent(data);
}
