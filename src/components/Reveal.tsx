"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/** Fades content up as it scrolls into view. Respects reduced-motion via CSS. */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const nodeRef = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  // Callback ref: (HTMLElement | null) => void is assignable to every tag in the union.
  const setRef = (node: HTMLElement | null) => {
    nodeRef.current = node;
  };

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as ElementType;

  return (
    <Comp
      ref={setRef}
      className={`reveal ${shown ? "in" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}
