"use client";

/** A small delete form with a confirmation prompt. `action` is a server action. */
export default function DeleteButton({
  action,
  id,
  label = "Delete",
  what = "this item",
  extraFields,
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  label?: string;
  what?: string;
  extraFields?: Record<string, string>;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Delete ${what}? This can't be undone.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      {extraFields &&
        Object.entries(extraFields).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}
      <button className="rounded-md border border-cardinal/30 px-3 py-1.5 text-sm font-medium text-cardinal transition-colors hover:bg-cardinal hover:text-white">
        {label}
      </button>
    </form>
  );
}
