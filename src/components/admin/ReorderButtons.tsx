"use client";

/** Up/down arrows that resubmit a reorder server action for one row. */
export default function ReorderButtons({
  action,
  id,
  disableUp,
  disableDown,
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  disableUp?: boolean;
  disableDown?: boolean;
}) {
  const btnCls =
    "grid h-7 w-7 place-items-center rounded-md border border-ink/15 text-ink transition-colors hover:border-cardinal hover:text-cardinal disabled:opacity-30 disabled:hover:border-ink/15 disabled:hover:text-ink";
  return (
    <div className="flex flex-col gap-1">
      <form action={action}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="direction" value="up" />
        <button type="submit" disabled={disableUp} aria-label="Move up" className={btnCls}>
          ↑
        </button>
      </form>
      <form action={action}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="direction" value="down" />
        <button type="submit" disabled={disableDown} aria-label="Move down" className={btnCls}>
          ↓
        </button>
      </form>
    </div>
  );
}
