"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/events", label: "Events" },
  { href: "/workshops", label: "Workshops" },
  { href: "/team", label: "Team" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-cardinal/95 backdrop-blur supports-[backdrop-filter]:bg-cardinal/85"
          : "bg-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3 text-white">
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-sm bg-white/10 font-display text-lg font-semibold leading-none ring-1 ring-white/25 transition-colors group-hover:bg-white/20"
          >
            Y
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[0.95rem] font-semibold tracking-tight">
              Youth Public Health Accelerator
            </span>
            <span className="eyebrow mt-1 text-[0.6rem] text-sandstone/90">
              Stanford
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:text-white ${
                  active ? "text-white" : ""
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-sandstone transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-white ring-1 ring-inset ring-white/25 md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span className="relative block h-3.5 w-5">
            <span className={`absolute left-0 block h-0.5 w-5 bg-white transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 block h-0.5 w-5 bg-white transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {/* mobile drawer */}
      <div className={`overflow-hidden border-t border-white/15 bg-cardinal-dark md:hidden ${open ? "max-h-96" : "max-h-0"} transition-[max-height] duration-300`}>
        <nav className="shell flex flex-col gap-1 py-3">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-sm px-2 py-2.5 text-white/90 hover:bg-white/10">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
