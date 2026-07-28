"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

const inputCls =
  "mt-1.5 w-full rounded-md border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-cardinal focus:ring-2 focus:ring-cardinal/20";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      {hint && <span className="mt-0.5 block text-xs text-stone">{hint}</span>}
      {children}
    </label>
  );
}

export function Text({
  name,
  defaultValue,
  type = "text",
  required,
  placeholder,
}: {
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <input
      className={inputCls}
      name={name}
      type={type}
      defaultValue={defaultValue}
      required={required}
      placeholder={placeholder}
    />
  );
}

export function Area({
  name,
  defaultValue,
  rows = 3,
  required,
}: {
  name: string;
  defaultValue?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <textarea className={inputCls} name={name} rows={rows} defaultValue={defaultValue} required={required} />
  );
}

export function Select({
  name,
  defaultValue,
  options,
}: {
  name: string;
  defaultValue?: string;
  options: readonly string[];
}) {
  return (
    <select className={inputCls} name={name} defaultValue={defaultValue}>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

// On-brand, contrast-safe category swatches. Constrained so an organizer can't
// introduce an off-palette color (e.g. an electric cyan) on the public site.
const CATEGORY_PALETTE = [
  { hex: "#8c1515", name: "Cardinal" },
  { hex: "#b1040e", name: "Cardinal bright" },
  { hex: "#175e54", name: "Palo Alto" },
  { hex: "#2e8b7a", name: "Palo Alto bright" },
  { hex: "#8a5a12", name: "Gold" },
  { hex: "#5a5750", name: "Stone" },
  { hex: "#2e2d29", name: "Ink" },
];

export function ColorInput({
  name,
  defaultValue = "#8c1515",
}: {
  name: string;
  defaultValue?: string;
}) {
  const current = defaultValue?.toLowerCase();
  const hasMatch = CATEGORY_PALETTE.some((c) => c.hex === current);
  return (
    <div className="mt-1.5">
      <div className="flex flex-wrap gap-2.5">
        {CATEGORY_PALETTE.map((c, i) => (
          <label key={c.hex} className="cursor-pointer" title={c.name}>
            <input
              type="radio"
              name={name}
              value={c.hex}
              defaultChecked={hasMatch ? c.hex === current : i === 0}
              className="peer sr-only"
            />
            <span
              className="block h-9 w-9 rounded-full ring-2 ring-transparent ring-offset-2 ring-offset-white transition peer-checked:ring-ink/70 peer-focus-visible:ring-cardinal"
              style={{ backgroundColor: c.hex }}
            />
          </label>
        ))}
      </div>
      <span className="mt-2 block font-mono text-xs text-stone">
        On-brand swatches only: the dot + label color for this category.
      </span>
    </div>
  );
}

export function Toggle({
  name,
  defaultChecked,
  label,
}: {
  name: string;
  defaultChecked?: boolean;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2.5">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-ink/25 text-cardinal accent-cardinal focus:ring-cardinal/30"
      />
      <span className="text-sm font-medium text-ink">{label}</span>
    </label>
  );
}

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-cardinal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cardinal-bright disabled:opacity-60"
    >
      {pending ? "Saving…" : children}
    </button>
  );
}
