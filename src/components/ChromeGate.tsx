"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Chooses the page chrome by route: the public site nav + footer everywhere,
 * except under /admin, which brings its own chrome. `nav` and `footer` are
 * server-rendered elements passed in from the root layout.
 */
export default function ChromeGate({
  nav,
  footer,
  children,
}: {
  nav: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      {nav}
      <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}
