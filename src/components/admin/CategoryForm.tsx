import Link from "next/link";
import { saveWorkshopCategory } from "@/app/admin/actions";
import { Field, Text, ColorInput, SubmitButton } from "./ui";
import type { WorkshopCategory } from "@/lib/data";

export default function CategoryForm({ category }: { category?: WorkshopCategory }) {
  return (
    <form action={saveWorkshopCategory} className="max-w-md space-y-5">
      {category && <input type="hidden" name="id" value={category.id} />}
      <input type="hidden" name="original_label" value={category?.label ?? ""} />

      <Field label="Name" hint="Shown as a filter tab on the workshop library">
        <Text name="label" defaultValue={category?.label} required />
      </Field>

      <Field label="Color">
        <ColorInput name="color" defaultValue={category?.color} />
      </Field>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton>Save category</SubmitButton>
        <Link href="/admin/categories" className="text-sm font-medium text-stone hover:text-cardinal">
          Cancel
        </Link>
      </div>
    </form>
  );
}
