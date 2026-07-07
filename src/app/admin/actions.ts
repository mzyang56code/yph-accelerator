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

// --- events -----------------------------------------------------------------
export async function saveEvent(formData: FormData) {
  const sb = await createClient();
  const id = strOrNull(formData, "id");
  const row = {
    title: str(formData, "title"),
    date: str(formData, "date"),
    end_date: strOrNull(formData, "end_date"),
    location: str(formData, "location"),
    summary: str(formData, "summary"),
    host: str(formData, "host"),
    tag: str(formData, "tag"),
    featured: formData.get("featured") === "on",
    register_url: strOrNull(formData, "register_url"),
  };
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

// --- workshops --------------------------------------------------------------
export async function saveWorkshop(formData: FormData) {
  const sb = await createClient();
  const id = strOrNull(formData, "id");
  const row = {
    title: str(formData, "title"),
    category: str(formData, "category"),
    summary: str(formData, "summary"),
    released: str(formData, "released"),
    duration_min: intOr(formData, "duration_min", 45),
    drive_url: str(formData, "drive_url") || "#",
    file_kind: str(formData, "file_kind"),
  };
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

// --- team -------------------------------------------------------------------
export async function saveTeamMember(formData: FormData) {
  const sb = await createClient();
  const id = strOrNull(formData, "id");
  const row = {
    name: str(formData, "name"),
    role: str(formData, "role"),
    affiliation: str(formData, "affiliation"),
    bio: str(formData, "bio"),
    kind: str(formData, "kind"),
    sort_order: intOr(formData, "sort_order", 0),
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

// --- auth -------------------------------------------------------------------
export async function signOut() {
  const sb = await createClient();
  await sb.auth.signOut();
  redirect("/admin/login");
}
