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

export function ColorInput({
  name,
  defaultValue = "#8c1515",
}: {
  name: string;
  defaultValue?: string;
}) {
  return (
    <div className="mt-1.5 flex items-center gap-3">
      <input
        type="color"
        name={name}
        defaultValue={defaultValue}
        className="h-10 w-14 shrink-0 cursor-pointer rounded-md border border-ink/15 bg-white p-1"
      />
      <span className="font-mono text-xs text-stone">Pick a swatch for this category&apos;s dot + label</span>
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
