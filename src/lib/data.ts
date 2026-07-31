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

export type WorkshopFileKind = "Slides" | "Recording" | "Workbook" | "Reading";

export type TeamKind = "Student" | "Mentor" | "Director";

export type Event = {
  id: string;
  title: string;
  date: string; // ISO date
  endDate?: string;
  location: string;
  summary: string; // short teaser shown on the card
  details?: string; // longer description shown when the card is expanded
  photoUrl?: string; // event photo/flyer shown in the expanded popup
  host: string; // the student(s) running it
  tag: EventTag;
  featured: boolean;
  registerUrl?: string;
  sortOrder: number;
};

export type Workshop = {
  id: string;
  title: string;
  category: string; // matches a WorkshopCategory.label — admin-editable, see getWorkshopCategories
  summary: string;
  released: string; // ISO date
  durationMin: number;
  driveUrl: string; // link to the file/folder in the shared Google Drive
  fileKind: WorkshopFileKind;
  sortOrder: number;
};

export type WorkshopCategory = {
  id: string;
  label: string;
  color: string; // hex, used for the dot + eyebrow on workshop cards
  sortOrder: number;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  bio: string;
  kind: TeamKind;
  sortOrder: number;
  photoUrl?: string;
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

// The editable content of the /program page (the fixed annual timeline stays in
// code). Also owns the cohort-application toggle + Google Form URL, which drive
// the Apply buttons on both /program and the homepage.
export type ProgramContent = {
  heroTitle: string;
  heroIntro: string;
  applicationOpen: boolean;
  applicationUrl: string;
};

// select-option lists, shared with the admin forms
export const eventTags: EventTag[] = [
  "Workshop", "Symposium", "Field visit", "Community", "Info session",
];
export const workshopFileKinds: WorkshopFileKind[] = [
  "Slides", "Recording", "Workbook", "Reading",
];
export const teamKinds: TeamKind[] = ["Director", "Mentor", "Student"];

// ---------------------------------------------------------------------------
// Seed content (fallback when Supabase isn't configured)
// ---------------------------------------------------------------------------
const seedSiteContent: SiteContent = {
  cohortLabel: "Cohort 2026",
  location: "San Francisco Bay Area",
  heroHeadline: "Elevating young people to lead public health in the Bay.",
  heroLede:
    "We're a Stanford program that pairs students with mentors, teaches them how public health actually works, and helps them take on a real problem in their own community.",
  missionTitle: "Every student gets a mentor and a real project.",
  missionBody:
    "The best public health usually comes from people who know a community from the inside. We pair students across the Bay Area with Stanford mentors, teach them the essentials (reading data, running a study, explaining it clearly), then help them use it somewhere real: their school, their neighborhood, a clinic down the street.",
  stats: [
    { value: "48", label: "Students mentored this cohort" },
    { value: "30+", label: "Workshops in the library" },
    { value: "12", label: "Youth-led community projects" },
    { value: "9", label: "Partner clinics & schools" },
  ],
};

const seedProgramContent: ProgramContent = {
  heroTitle: "From a first spark to a finished project.",
  heroIntro:
    "A year-long, cohort-based mentorship program. Each high schooler is paired with a Stanford mentor and moves through a set schedule of monthly meetings and check-ins, carrying one public-health project from first proposal to finished work.",
  applicationOpen: false,
  applicationUrl: "#",
};

const seedEvents: Event[] = [
  { id: "immunization-mapping-2026", title: "Mapping Immunization Gaps in Santa Clara County", date: "2026-07-19", location: "Li Ka Shing Center, Stanford", summary: "Student teams present interactive maps of childhood vaccination coverage and propose outreach for the neighborhoods most left behind.", details: "Six student teams spent the spring pulling county immunization records and overlaying them against school district boundaries and clinic locations. Each team will present a 10-minute walkthrough of their map, the gap they found, and a concrete outreach idea: flyering, a pop-up clinic day, or a partnership with a school nurse. Open to the public; light refreshments provided.", host: "Epidemiology track students", tag: "Symposium", featured: true, registerUrl: "#", sortOrder: 0 },
  { id: "air-quality-walk", title: "Air Quality Field Walk & Sensor Build", date: "2026-07-26", location: "East Palo Alto", summary: "Build a low-cost particulate sensor, then walk a transect through the neighborhood logging readings and talking with residents.", details: "We'll start indoors soldering a low-cost PM2.5 sensor from a kit (no experience needed), then walk a fixed route through East Palo Alto logging readings every block. Bring comfortable shoes and a phone for the logging app. Residents along the route have agreed to short conversations about air quality near their homes. This is as much a listening exercise as a data one.", host: "Aanya R. & the Environmental Health group", tag: "Field visit", featured: true, registerUrl: "#", sortOrder: 1 },
  { id: "biostats-bootcamp", title: "Weekend Biostatistics Bootcamp", date: "2026-08-02", endDate: "2026-08-03", location: "Online", summary: "Two days from means to models: confidence intervals, p-values done honestly, and reading a study without being fooled.", host: "Biostatistics mentors", tag: "Workshop", featured: true, registerUrl: "#", sortOrder: 2 },
  { id: "fall-info-session", title: "Fall Cohort — Information Session for Families", date: "2026-08-14", location: "Online", summary: "What the program asks of students, what it offers, and how to apply. Bring questions; we'll stay as long as there are any.", host: "Program staff", tag: "Info session", featured: false, registerUrl: "#", sortOrder: 3 },
  { id: "community-clinic-day", title: "Community Health Screening Day", date: "2026-08-23", location: "Fair Oaks Community Center, Redwood City", summary: "Students support a free blood-pressure and health-literacy clinic alongside partner physicians. Spanish-speaking volunteers especially needed.", host: "Health Equity track students", tag: "Community", featured: false, registerUrl: "#", sortOrder: 4 },
];

const seedWorkshops: Workshop[] = [
  { id: "intro-epi-curves", title: "Reading an Epidemic Curve", category: "Epidemiology", summary: "What the shape of an outbreak tells you: index cases, incubation, and why the curve bends when it does.", released: "2026-06-30", durationMin: 45, driveUrl: "#", fileKind: "Slides", sortOrder: 0 },
  { id: "study-design", title: "Cohort vs. Case-Control: Choosing a Study Design", category: "Research skills", summary: "A plain-language guide to the workhorse designs of public health research and when each one earns its keep.", released: "2026-06-22", durationMin: 50, driveUrl: "#", fileKind: "Slides", sortOrder: 1 },
  { id: "confidence-intervals", title: "Confidence Intervals Without the Panic", category: "Biostatistics", summary: "Where the interval comes from, what it does and doesn't promise, and how to compute one in a spreadsheet.", released: "2026-06-15", durationMin: 40, driveUrl: "#", fileKind: "Workbook", sortOrder: 2 },
  { id: "health-equity-frameworks", title: "The Social Determinants of Health", category: "Health equity", summary: "Zip code over genetic code: how housing, income, and race shape health long before anyone reaches a clinic.", released: "2026-06-08", durationMin: 55, driveUrl: "#", fileKind: "Recording", sortOrder: 3 },
  { id: "survey-design", title: "Writing a Survey People Will Answer Honestly", category: "Research skills", summary: "Question order, leading language, and the quiet biases that ruin a questionnaire before it's sent.", released: "2026-05-30", durationMin: 35, driveUrl: "#", fileKind: "Slides", sortOrder: 4 },
  { id: "vaccine-policy", title: "How a Vaccine Recommendation Becomes Policy", category: "Policy", summary: "From clinical trial to the ACIP schedule: the committees, evidence, and trade-offs along the way.", released: "2026-05-21", durationMin: 50, driveUrl: "#", fileKind: "Recording", sortOrder: 5 },
  { id: "global-burden", title: "Reading the Global Burden of Disease", category: "Global health", summary: "DALYs, YLLs, and how researchers compare a world of very different illnesses on one honest scale.", released: "2026-05-12", durationMin: 45, driveUrl: "#", fileKind: "Reading", sortOrder: 6 },
  { id: "data-cleaning", title: "Cleaning Messy Health Data", category: "Biostatistics", summary: "The unglamorous 80% of every project: missing values, duplicates, and dates that refuse to behave.", released: "2026-05-03", durationMin: 60, driveUrl: "#", fileKind: "Workbook", sortOrder: 7 },
];

const seedWorkshopCategories: WorkshopCategory[] = [
  { id: "epidemiology", label: "Epidemiology", color: "#8c1515", sortOrder: 1 },
  { id: "biostatistics", label: "Biostatistics", color: "#175e54", sortOrder: 2 },
  { id: "health-equity", label: "Health equity", color: "#b1040e", sortOrder: 3 },
  { id: "global-health", label: "Global health", color: "#2e8b7a", sortOrder: 4 },
  { id: "research-skills", label: "Research skills", color: "#cdb98d", sortOrder: 5 },
  { id: "policy", label: "Policy", color: "#5a5750", sortOrder: 6 },
];

const seedTeam: TeamMember[] = [
  { id: "director", name: "Dr. Elena Marquez", role: "Faculty Director", affiliation: "Stanford School of Medicine", bio: "Epidemiologist studying vaccine access in immigrant communities. Founded the Accelerator to bring that work within reach of students.", kind: "Director", sortOrder: 1 },
  { id: "program-lead", name: "Jordan Whitfield", role: "Program Manager", affiliation: "Stanford Center for Health Education", bio: "Runs the day-to-day: cohorts, mentors, logistics, and the shared calendar that somehow holds it all together.", kind: "Director", sortOrder: 2 },
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
    location: r.location ?? "", summary: r.summary ?? "", details: r.details ?? undefined,
    photoUrl: r.photo_url ?? undefined,
    host: r.host ?? "", tag: r.tag, featured: Boolean(r.featured),
    registerUrl: r.register_url ?? undefined, sortOrder: r.sort_order ?? 0,
  };
}
function mapWorkshop(r: any): Workshop {
  return {
    id: r.id, title: r.title, category: r.category, summary: r.summary ?? "",
    released: r.released, durationMin: r.duration_min ?? 0, driveUrl: r.drive_url ?? "#",
    fileKind: r.file_kind, sortOrder: r.sort_order ?? 0,
  };
}
function mapWorkshopCategory(r: any): WorkshopCategory {
  return {
    id: r.id, label: r.label, color: r.color ?? "#8c1515", sortOrder: r.sort_order ?? 0,
  };
}
function mapTeam(r: any): TeamMember {
  return {
    id: r.id, name: r.name, role: r.role ?? "", affiliation: r.affiliation ?? "",
    bio: r.bio ?? "", kind: r.kind === "Staff" ? "Director" : r.kind, sortOrder: r.sort_order ?? 0,
    photoUrl: r.photo_url ?? undefined,
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
function mapProgramContent(r: any): ProgramContent {
  return {
    heroTitle: r.hero_title ?? "",
    heroIntro: r.hero_intro ?? "",
    applicationOpen: Boolean(r.application_open),
    applicationUrl: r.application_url ?? "#",
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// ---------------------------------------------------------------------------
// Accessors
// ---------------------------------------------------------------------------
function sortEvents(events: Event[]): Event[] {
  return [...events].sort((a, b) => a.sortOrder - b.sortOrder || a.date.localeCompare(b.date));
}

export async function getEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured()) return sortEvents(seedEvents);
  const { data, error } = await createPublicClient()
    .from("events").select("*")
    .order("sort_order", { ascending: true })
    .order("date", { ascending: true });
  if (error || !data) return sortEvents(seedEvents);
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

function sortWorkshops(workshops: Workshop[]): Workshop[] {
  return [...workshops].sort(
    (a, b) => a.sortOrder - b.sortOrder || b.released.localeCompare(a.released),
  );
}

export async function getWorkshops(): Promise<Workshop[]> {
  if (!isSupabaseConfigured()) return sortWorkshops(seedWorkshops);
  const { data, error } = await createPublicClient()
    .from("workshops").select("*")
    .order("sort_order", { ascending: true })
    .order("released", { ascending: false });
  if (error || !data) return sortWorkshops(seedWorkshops);
  return data.map(mapWorkshop);
}

export async function getWorkshopById(id: string): Promise<Workshop | null> {
  if (!isSupabaseConfigured()) return seedWorkshops.find((w) => w.id === id) ?? null;
  const { data, error } = await createPublicClient()
    .from("workshops").select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return mapWorkshop(data);
}

export async function getWorkshopCategories(): Promise<WorkshopCategory[]> {
  if (!isSupabaseConfigured()) {
    return [...seedWorkshopCategories].sort((a, b) => a.sortOrder - b.sortOrder);
  }
  const { data, error } = await createPublicClient()
    .from("workshop_categories").select("*").order("sort_order", { ascending: true });
  if (error || !data) return [...seedWorkshopCategories].sort((a, b) => a.sortOrder - b.sortOrder);
  return data.map(mapWorkshopCategory);
}

export async function getWorkshopCategoryById(id: string): Promise<WorkshopCategory | null> {
  if (!isSupabaseConfigured()) return seedWorkshopCategories.find((c) => c.id === id) ?? null;
  const { data, error } = await createPublicClient()
    .from("workshop_categories").select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return mapWorkshopCategory(data);
}

export async function getTeam(): Promise<TeamMember[]> {
  if (!isSupabaseConfigured()) return [...seedTeam].sort((a, b) => a.sortOrder - b.sortOrder);
  const { data, error } = await createPublicClient()
    .from("team_members").select("*").order("sort_order", { ascending: true });
  if (error || !data) return [...seedTeam].sort((a, b) => a.sortOrder - b.sortOrder);
  return data.map(mapTeam);
}

// Count-only accessors for the dashboard's summary cards — avoids fetching
// every row (and every column) just to display a length.
async function countRows(table: "events" | "workshops" | "workshop_categories" | "team_members"): Promise<number> {
  if (!isSupabaseConfigured()) {
    const seedByTable = {
      events: seedEvents, workshops: seedWorkshops,
      workshop_categories: seedWorkshopCategories, team_members: seedTeam,
    } as const;
    return seedByTable[table].length;
  }
  const { count, error } = await createPublicClient()
    .from(table).select("id", { count: "exact", head: true });
  if (error || count === null) return 0;
  return count;
}

export const countEvents = () => countRows("events");
export const countWorkshops = () => countRows("workshops");
export const countWorkshopCategories = () => countRows("workshop_categories");
export const countTeam = () => countRows("team_members");

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

export async function getProgramContent(): Promise<ProgramContent> {
  if (!isSupabaseConfigured()) return seedProgramContent;
  const { data, error } = await createPublicClient()
    .from("program_content").select("*").eq("id", "main").maybeSingle();
  if (error || !data) return seedProgramContent;
  return mapProgramContent(data);
}
