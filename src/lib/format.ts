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

/** { weekday, day, month } parts for the calendar-block card treatment. */
export function dateParts(iso: string) {
  const dt = parse(iso);
  return {
    weekday: WEEKDAYS[dt.getUTCDay()],
    day: String(dt.getUTCDate()),
    month: MONTHS[dt.getUTCMonth()].toUpperCase(),
  };
}
