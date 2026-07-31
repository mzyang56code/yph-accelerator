"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };
type NavGroup = { label?: string; items: NavItem[] };

// Dashboard stands alone; everything else clusters into what you edit
// regularly (Content) vs. one-off page copy (Pages).
const NAV_GROUPS: NavGroup[] = [
  { items: [{ href: "/admin", label: "Dashboard" }] },
  {
    label: "Content",
    items: [
      { href: "/admin/events", label: "Events" },
      { href: "/admin/workshops", label: "Workshops" },
      { href: "/admin/team", label: "Team" },
    ],
  },
  {
    label: "Pages",
    items: [
      { href: "/admin/home", label: "Homepage" },
      { href: "/admin/program", label: "Program" },
    ],
  },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminNav({ variant }: { variant: "desktop" | "mobile" }) {
  const pathname = usePathname();

  if (variant === "mobile") {
    return (
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-ink/8 px-6 py-2 sm:hidden">
        {NAV_GROUPS.flatMap((g) => g.items).map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive(pathname, n.href) ? "bg-cardinal/10 text-cardinal" : "text-stone"
            }`}
          >
            {n.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="hidden items-center gap-1 sm:flex">
      {NAV_GROUPS.map((group, gi) => (
        <div key={group.label ?? "dashboard"} className="flex items-center gap-1">
          {gi > 0 && <span aria-hidden className="mx-1.5 h-5 w-px bg-ink/10" />}
          {group.items.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive(pathname, n.href)
                  ? "bg-cardinal/10 text-cardinal"
                  : "text-stone hover:bg-paper hover:text-cardinal"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
