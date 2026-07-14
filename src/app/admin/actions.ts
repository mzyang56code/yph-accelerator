"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// --- helpers ----------------------------------------------------------------
function str(fd: FormData, key: string, fallback = ""): string {
  const v = fd.get(key);
  return (typeof v === "string" ? v : fallback).trim();
}
function strOrNull(fd: FormData, key: string): string | null {
  const v = str(fd, key);
  return v === "" ? null : v;
}
function intOr(fd: FormData, key: string, fallback: number): number {
  const n = parseInt(str(fd, key), 10);
  return Number.isFinite(n) ? n : fallback;
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/workshops");
  revalidatePath("/team");
  revalidatePath("/admin", "layout");
}

function fail(entity: string, message: string): never {
  redirect(`/admin/${entity}?error=${encodeURIComponent(message)}`);
}

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

// Uploads a photo to the given storage bucket and returns its public URL, or
// null if the field is empty/unset or "remove photo" was checked.
async function resolvePhotoUrl(
  sb: Awaited<ReturnType<typeof createClient>>,
  formData: FormData,
  existingPhotoUrl: string | null,
  opts: { bucket: "team-photos" | "event-photos"; entity: string },
): Promise<string | null> {
  if (formData.get("remove_photo") === "on") return null;

  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) return existingPhotoUrl;

  if (!file.type.startsWith("image/")) fail(opts.entity, "Photo must be an image file.");
  if (file.size > MAX_PHOTO_BYTES) fail(opts.entity, "Photo must be under 5MB.");

  const ext = file.name.includes(".") ? file.name.split(".").pop() : file.type.split("/")[1] || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await sb.storage.from(opts.bucket).upload(path, file, {
    contentType: file.type,
    upsert: true,
  });
  if (error) fail(opts.entity, `Photo upload failed: ${error.message}`);

  return sb.storage.from(opts.bucket).getPublicUrl(path).data.publicUrl;
}

// Moves a row one place up/down within its ordered list by re-numbering every
// row's sort_order to match the new sequence. Self-healing against rows that
// still share the same default sort_order.
async function reorder(
  sb: Awaited<ReturnType<typeof createClient>>,
  table: "events" | "workshops" | "workshop_categories",
  orderBy: { column: string; ascending: boolean }[],
  id: string,
  direction: "up" | "down",
) {
  let query = sb.from(table).select("id");
  for (const { column, ascending } of orderBy) query = query.order(column, { ascending });
  const { data } = await query;
  const ids = (data ?? []).map((r: { id: string }) => r.id);

  const idx = ids.indexOf(id);
  const swapWith = direction === "up" ? idx - 1 : idx + 1;
  if (idx === -1 || swapWith < 0 || swapWith >= ids.length) return;
  [ids[idx], ids[swapWith]] = [ids[swapWith], ids[idx]];

  await Promise.all(ids.map((rowId, i) => sb.from(table).update({ sort_order: i }).eq("id", rowId)));
}

// --- events -----------------------------------------------------------------
export async function saveEvent(formData: FormData) {
  const sb = await createClient();
  const id = strOrNull(formData, "id");
  const photoUrl = await resolvePhotoUrl(sb, formData, strOrNull(formData, "existing_photo_url"), {
    bucket: "event-photos",
    entity: "events",
  });
  const row: Record<string, unknown> = {
    title: str(formData, "title"),
    date: str(formData, "date"),
    end_date: strOrNull(formData, "end_date"),
    location: str(formData, "location"),
    summary: str(formData, "summary"),
    details: strOrNull(formData, "details"),
    photo_url: photoUrl,
    host: str(formData, "host"),
    tag: str(formData, "tag"),
    featured: formData.get("featured") === "on",
    register_url: strOrNull(formData, "register_url"),
  };
  if (!id) {
    // New events join the end of the manually-ordered list, not the top.
    const { data: last } = await sb
      .from("events").select("sort_order").order("sort_order", { ascending: false }).limit(1).maybeSingle();
    row.sort_order = (last?.sort_order ?? -1) + 1;
  }
  const { error } = id
    ? await sb.from("events").update(row).eq("id", id)
    : await sb.from("events").insert(row);
  if (error) fail("events", error.message);
  revalidateAll();
  redirect("/admin/events");
}

export async function deleteEvent(formData: FormData) {
  const sb = await createClient();
  const { error } = await sb.from("events").delete().eq("id", str(formData, "id"));
  if (error) fail("events", error.message);
  revalidateAll();
  redirect("/admin/events");
}

export async function moveEvent(formData: FormData) {
  const sb = await createClient();
  await reorder(
    sb,
    "events",
    [{ column: "sort_order", ascending: true }, { column: "date", ascending: true }],
    str(formData, "id"),
    str(formData, "direction") === "up" ? "up" : "down",
  );
  revalidateAll();
  redirect("/admin/events");
}

// --- workshops --------------------------------------------------------------
export async function saveWorkshop(formData: FormData) {
  const sb = await createClient();
  const id = strOrNull(formData, "id");
  const row: Record<string, unknown> = {
    title: str(formData, "title"),
    category: str(formData, "category"),
    summary: str(formData, "summary"),
    released: str(formData, "released"),
    duration_min: intOr(formData, "duration_min", 45),
    drive_url: str(formData, "drive_url") || "#",
    file_kind: str(formData, "file_kind"),
  };
  if (!id) {
    // New workshops join the end of the manually-ordered list, not the top.
    const { data: last } = await sb
      .from("workshops").select("sort_order").order("sort_order", { ascending: false }).limit(1).maybeSingle();
    row.sort_order = (last?.sort_order ?? -1) + 1;
  }
  const { error } = id
    ? await sb.from("workshops").update(row).eq("id", id)
    : await sb.from("workshops").insert(row);
  if (error) fail("workshops", error.message);
  revalidateAll();
  redirect("/admin/workshops");
}

export async function deleteWorkshop(formData: FormData) {
  const sb = await createClient();
  const { error } = await sb.from("workshops").delete().eq("id", str(formData, "id"));
  if (error) fail("workshops", error.message);
  revalidateAll();
  redirect("/admin/workshops");
}

export async function moveWorkshop(formData: FormData) {
  const sb = await createClient();
  await reorder(
    sb,
    "workshops",
    [{ column: "sort_order", ascending: true }, { column: "released", ascending: false }],
    str(formData, "id"),
    str(formData, "direction") === "up" ? "up" : "down",
  );
  revalidateAll();
  redirect("/admin/workshops");
}

// --- workshop categories ------------------------------------------------------
export async function saveWorkshopCategory(formData: FormData) {
  const sb = await createClient();
  const id = strOrNull(formData, "id");
  const label = str(formData, "label");
  const originalLabel = strOrNull(formData, "original_label");
  const row: Record<string, unknown> = {
    label,
    color: str(formData, "color") || "#8c1515",
  };
  if (!id) {
    const { data: last } = await sb
      .from("workshop_categories").select("sort_order").order("sort_order", { ascending: false }).limit(1).maybeSingle();
    row.sort_order = (last?.sort_order ?? -1) + 1;
  }
  const { error } = id
    ? await sb.from("workshop_categories").update(row).eq("id", id)
    : await sb.from("workshop_categories").insert(row);
  if (error) fail("categories", error.message);

  // Renaming a category re-labels every workshop that used the old name, so
  // nothing silently falls out of its filter.
  if (id && originalLabel && originalLabel !== label) {
    await sb.from("workshops").update({ category: label }).eq("category", originalLabel);
  }

  revalidateAll();
  redirect("/admin/categories");
}

export async function deleteWorkshopCategory(formData: FormData) {
  const sb = await createClient();
  const id = str(formData, "id");
  const label = str(formData, "label");

  const { count, error: countError } = await sb
    .from("workshops")
    .select("id", { count: "exact", head: true })
    .eq("category", label);
  if (countError) fail("categories", countError.message);
  if (count) {
    fail("categories", `${count} workshop${count === 1 ? "" : "s"} still use "${label}" — reassign them first.`);
  }

  const { error } = await sb.from("workshop_categories").delete().eq("id", id);
  if (error) fail("categories", error.message);
  revalidateAll();
  redirect("/admin/categories");
}

export async function moveWorkshopCategory(formData: FormData) {
  const sb = await createClient();
  await reorder(
    sb,
    "workshop_categories",
    [{ column: "sort_order", ascending: true }],
    str(formData, "id"),
    str(formData, "direction") === "up" ? "up" : "down",
  );
  revalidateAll();
  redirect("/admin/categories");
}

// --- team -------------------------------------------------------------------
export async function saveTeamMember(formData: FormData) {
  const sb = await createClient();
  const id = strOrNull(formData, "id");
  const photoUrl = await resolvePhotoUrl(sb, formData, strOrNull(formData, "existing_photo_url"), {
    bucket: "team-photos",
    entity: "team",
  });
  const row = {
    name: str(formData, "name"),
    role: str(formData, "role"),
    affiliation: str(formData, "affiliation"),
    bio: str(formData, "bio"),
    kind: str(formData, "kind"),
    sort_order: intOr(formData, "sort_order", 0),
    photo_url: photoUrl,
  };
  const { error } = id
    ? await sb.from("team_members").update(row).eq("id", id)
    : await sb.from("team_members").insert(row);
  if (error) fail("team", error.message);
  revalidateAll();
  redirect("/admin/team");
}

export async function deleteTeamMember(formData: FormData) {
  const sb = await createClient();
  const { error } = await sb.from("team_members").delete().eq("id", str(formData, "id"));
  if (error) fail("team", error.message);
  revalidateAll();
  redirect("/admin/team");
}

// --- homepage / site content ------------------------------------------------
export async function saveSiteContent(formData: FormData) {
  const sb = await createClient();
  const stats: { value: string; label: string }[] = [];
  for (let i = 0; i < 6; i++) {
    const value = str(formData, `stat_value_${i}`);
    const label = str(formData, `stat_label_${i}`);
    if (value || label) stats.push({ value, label });
  }
  const row = {
    id: "main",
    cohort_label: str(formData, "cohort_label"),
    location: str(formData, "location"),
    hero_headline: str(formData, "hero_headline"),
    hero_lede: str(formData, "hero_lede"),
    mission_title: str(formData, "mission_title"),
    mission_body: str(formData, "mission_body"),
    stats,
    updated_at: new Date().toISOString(),
  };
  const { error } = await sb.from("site_content").upsert(row);
  if (error) fail("home", error.message);
  revalidateAll();
  redirect("/admin/home");
}

// --- program page -----------------------------------------------------------
export async function saveProgramContent(formData: FormData) {
  const sb = await createClient();
  const row = {
    id: "main",
    hero_title: str(formData, "hero_title"),
    hero_intro: str(formData, "hero_intro"),
    application_open: formData.get("application_open") === "on",
    application_url: str(formData, "application_url") || "#",
    updated_at: new Date().toISOString(),
  };
  const { error } = await sb.from("program_content").upsert(row);
  if (error) fail("program", error.message);
  revalidatePath("/");
  revalidatePath("/program");
  revalidatePath("/admin", "layout");
  redirect("/admin/program");
}

// --- auth -------------------------------------------------------------------
export async function signOut() {
  const sb = await createClient();
  await sb.auth.signOut();
  redirect("/admin/login");
}
