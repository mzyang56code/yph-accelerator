import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // /program is the primary conversion page. /educators was retired on
  // 2026-10-20: it is unlinked from the footer and dropped from here, but the
  // page itself still responds, because the URL was mailed to teachers and
  // counsellors directly. Nothing on the site points at it any more.
  const routes = ["", "/program", "/events", "/workshops", "/about"];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : route === "/program" ? 0.9 : 0.7,
  }));
}
