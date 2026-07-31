import type { ReactNode } from "react";

/** Shared eyebrow/title/description header for admin list and form pages, with an optional action slot (usually a "+ New X" button). */
export default function AdminPageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="eyebrow text-cardinal">{eyebrow}</p>
        <h1 className="display mt-1 text-3xl text-ink">{title}</h1>
        {description && <p className="mt-2 max-w-lg text-sm text-stone">{description}</p>}
      </div>
      {action}
    </div>
  );
}
