import Link from "next/link";
import { getSiteContent } from "@/lib/data";

export default async function SiteFooter() {
  const siteContent = await getSiteContent();
  return (
    <footer className="mt-24 bg-cardinal-dark text-white/80">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-semibold text-white">
            Youth Public Health Accelerator
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
            A Stanford mentorship program elevating young people to bring public
            health to their communities across the Bay Area.
          </p>
          <p className="eyebrow mt-5 text-sandstone/80">
            {siteContent.cohortLabel} · {siteContent.location}
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4 text-white/50">Explore</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/events" className="hover:text-white">Events</Link></li>
            <li><Link href="/workshops" className="hover:text-white">Workshop library</Link></li>
            <li><Link href="/team" className="hover:text-white">Team & mentors</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-white/50">Get in touch</p>
          <ul className="space-y-2.5 text-sm">
            <li><a href="mailto:ypha@stanford.edu" className="hover:text-white">ypha@stanford.edu</a></li>
            <li><Link href="/admin" className="hover:text-white">Team login</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-start justify-between gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>© {"2026"} Stanford Youth Public Health Accelerator. A student program.</p>
          <p>Not an official Stanford University webpage — program prototype.</p>
        </div>
      </div>
    </footer>
  );
}
