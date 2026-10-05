import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // /program is the primary conversion page and /educators the referral
  // channel -- both belong here.
  const routes = ["", "/program", "/events", "/workshops", "/educators", "/about"];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : route === "/program" ? 0.9 : 0.7,
  }));
}
