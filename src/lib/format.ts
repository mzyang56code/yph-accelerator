/** Deterministic date formatting (no locale/timezone drift between server & client). */
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parse(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  // noon UTC keeps the calendar day stable regardless of the viewer's timezone
  return new Date(Date.UTC(y, m - 1, d, 12));
}

export function formatDate(iso: string, long = false): string {
  const dt = parse(iso);
  const months = long ? MONTHS_LONG : MONTHS;
  return `${months[dt.getUTCMonth()]} ${dt.getUTCDate()}, ${dt.getUTCFullYear()}`;
}

export function formatDateRange(startIso: string, endIso?: string): string {
  if (!endIso) return formatDate(startIso);
  const a = parse(startIso);
  const b = parse(endIso);
  if (a.getUTCMonth() === b.getUTCMonth() && a.getUTCFullYear() === b.getUTCFullYear()) {
    return `${MONTHS[a.getUTCMonth()]} ${a.getUTCDate()}–${b.getUTCDate()}, ${a.getUTCFullYear()}`;
  }
  return `${formatDate(startIso)} – ${formatDate(endIso)}`;
}

/**
 * "14:30" or Postgres' "14:30:00" → "2:30 PM". Returns "" for anything
 * unparseable so callers can treat a missing time the same as a blank one.
 */
export function formatTime(hhmm?: string | null): string {
  if (!hhmm) return "";
  const [h, m] = hhmm.split(":").map(Number);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return "";
  const period = h < 12 ? "AM" : "PM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12} ${period}` : `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

/** "9 AM – 1 PM", or just the start when there's no end time. */
export function formatTimeRange(startHhmm?: string | null, endHhmm?: string | null): string {
  const start = formatTime(startHhmm);
  const end = formatTime(endHhmm);
  if (!start) return end;
  return end ? `${start} – ${end}` : start;
}

// ---------------------------------------------------------------------------
// Time zones
//
// Event times are stored as naive wall-clock ("10:00" = ten in the morning at
// the venue), which is the right model for a scheduled event: if DST rules
// change, "10 AM" should stay 10 AM rather than sliding an hour. The zone
// those wall times belong to is a separate, fixed fact — every YPHA event is
// Bay Area or run from Stanford.
//
// To show a viewer their own local time we resolve wall-clock + SITE_TZ to a
// real instant, then re-format that instant in the viewer's zone. All zone
// math goes through Intl (IANA tzdb), so DST is handled for us.
// ---------------------------------------------------------------------------
export const SITE_TZ = "America/Los_Angeles";

/** How far `tz` is from UTC at a given instant, in ms. Positive = east of UTC. */
function tzOffsetMs(instant: Date, tz: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour12: false,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(instant);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  // hour12:false yields "24" for midnight in some engines.
  const hour = get("hour") % 24;
  const asIfUtc = Date.UTC(get("year"), get("month") - 1, get("day"), hour, get("minute"), get("second"));
  return asIfUtc - instant.getTime();
}

/**
 * Wall-clock date + "HH:MM" in `tz` → the real instant it refers to.
 * Applied twice because the offset itself depends on the instant; the second
 * pass settles the answer across a DST boundary.
 */
export function zonedWallTimeToInstant(dateIso: string, hhmm: string, tz = SITE_TZ): Date | null {
  const [y, m, d] = dateIso.split("-").map(Number);
  const [hh, mi] = hhmm.split(":").map(Number);
  if (![y, m, d, hh, mi].every(Number.isFinite)) return null;
  const guess = Date.UTC(y, m - 1, d, hh, mi);
  let ts = guess - tzOffsetMs(new Date(guess), tz);
  ts = guess - tzOffsetMs(new Date(ts), tz);
  return new Date(ts);
}

/** The viewer's IANA zone, e.g. "America/Denver". Browser-only. */
export function viewerTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * True when the viewer sees a different wall clock than the venue does. Zone
 * *names* differ constantly without the clock differing (America/Los_Angeles
 * vs America/Vancouver), so compare the actual offset at that instant.
 */
export function zonesDifferAt(instant: Date, tz: string, other = SITE_TZ): boolean {
  return tzOffsetMs(instant, tz) !== tzOffsetMs(instant, other);
}

function zoneNamePart(instant: Date, tz: string, style: "short" | "shortGeneric"): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hour: "numeric", timeZoneName: style,
  }).formatToParts(instant);
  return parts.find((p) => p.type === "timeZoneName")?.value ?? "";
}

/**
 * Season-agnostic zone label: "PT", "ET", "GMT+1".
 *
 * `shortGeneric` is preferred because it sidesteps the PST/PDT question, but
 * en-US only has true abbreviations for North American zones — elsewhere it
 * returns prose ("France Time", "São Paulo Time"). Fall back to `short`, whose
 * "GMT+2" form is compact and unambiguous, whenever that happens.
 */
export function timeZoneLabel(instant: Date, tz: string): string {
  const generic = zoneNamePart(instant, tz, "shortGeneric");
  if (generic && generic.length <= 4 && !generic.includes(" ")) return generic;
  return zoneNamePart(instant, tz, "short") || generic;
}

/** The calendar date ("YYYY-MM-DD") an instant falls on in `tz`. */
function calendarDateInZone(instant: Date, tz: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(instant);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** An instant rendered as "1:30 PM" in the given zone (":00" dropped). */
export function formatInstantInZone(instant: Date, tz: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hour: "numeric", minute: "2-digit", hour12: true,
  }).formatToParts(instant);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const minute = get("minute");
  const period = get("dayPeriod").replace(/ /g, " ").trim();
  return minute === "00" ? `${get("hour")} ${period}` : `${get("hour")}:${minute} ${period}`;
}

/**
 * "10 AM – 3 PM PT" for a whole event, rendered in `tz`. Falls back to the
 * naive formatter when the times can't be resolved to an instant.
 */
export function formatZonedTimeRange(
  dateIso: string,
  startHhmm?: string | null,
  endHhmm?: string | null,
  tz: string = SITE_TZ,
): string {
  if (!startHhmm && !endHhmm) return "";
  const startAt = startHhmm ? zonedWallTimeToInstant(dateIso, startHhmm) : null;
  const endAt = endHhmm ? zonedWallTimeToInstant(dateIso, endHhmm) : null;
  const anchor = startAt ?? endAt;
  if (!anchor) return formatTimeRange(startHhmm, endHhmm);

  const start = startAt ? formatInstantInZone(startAt, tz) : "";
  const end = endAt ? formatInstantInZone(endAt, tz) : "";
  const label = timeZoneLabel(anchor, tz);
  const range = start && end ? `${start} – ${end}` : start || end;
  const withLabel = label ? `${range} ${label}` : range;

  // Far enough east or west and the event lands on a different calendar day
  // for the viewer than the date printed beside it — say so, or "6 AM" reads
  // as the morning of a day that already passed.
  const localDate = calendarDateInZone(anchor, tz);
  if (localDate !== dateIso) {
    const [, m, d] = localDate.split("-").map(Number);
    return `${withLabel} (${MONTHS[m - 1]} ${d})`;
  }
  return withLabel;
}

/** { weekday, day, month } parts for the calendar-block card treatment. */
export function dateParts(iso: string) {
  const dt = parse(iso);
  return {
    weekday: WEEKDAYS[dt.getUTCDay()],
    day: String(dt.getUTCDate()),
    month: MONTHS[dt.getUTCMonth()].toUpperCase(),
  };
}
