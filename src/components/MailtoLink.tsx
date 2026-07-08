"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Addresses are assembled from parts at runtime, and the href attribute is
// only written after hydration — so the raw mailto: never appears in the
// server-rendered HTML a scraper fetches, only in a real browser after JS runs.
const RECIPIENTS = [
  { user: "cwu618", domain: "stanford.edu" },
  { user: "mzyang56", domain: "stanford.edu" },
];

function buildMailto() {
  return `mailto:${RECIPIENTS.map((r) => `${r.user}@${r.domain}`).join(",")}`;
}

export default function MailtoLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    ref.current?.setAttribute("href", buildMailto());
  }, []);

  return (
    <a
      ref={ref}
      onClick={(e) => {
        if (ref.current?.getAttribute("href")) return;
        e.preventDefault();
        window.location.href = buildMailto();
      }}
      className={className}
    >
      {children}
    </a>
  );
}
