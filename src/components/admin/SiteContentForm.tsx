import { saveSiteContent } from "@/app/admin/actions";
import { Field, Text, Area, SubmitButton } from "./ui";
import type { SiteContent } from "@/lib/data";

export default function SiteContentForm({ content }: { content: SiteContent }) {
  const stats = [...content.stats];
  while (stats.length < 4) stats.push({ value: "", label: "" });

  return (
    <form action={saveSiteContent} className="max-w-2xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Cohort label" hint="Shown in the eyebrow, e.g. Cohort 2026">
          <Text name="cohort_label" defaultValue={content.cohortLabel} />
        </Field>
        <Field label="Location">
          <Text name="location" defaultValue={content.location} />
        </Field>
      </div>

      <Field label="Hero headline">
        <Area name="hero_headline" defaultValue={content.heroHeadline} rows={2} />
      </Field>
      <Field label="Hero subtext">
        <Area name="hero_lede" defaultValue={content.heroLede} rows={3} />
      </Field>

      <Field label="Mission title">
        <Text name="mission_title" defaultValue={content.missionTitle} />
      </Field>
      <Field label="Mission text">
        <Area name="mission_body" defaultValue={content.missionBody} rows={4} />
      </Field>

      <div>
        <p className="text-sm font-semibold text-ink">Stats row</p>
        <p className="mt-0.5 text-xs text-stone">The four numbers on the homepage. Leave a pair blank to hide it.</p>
        <div className="mt-3 space-y-3">
          {stats.slice(0, 4).map((s, i) => (
            <div key={i} className="grid grid-cols-[1fr_2fr] gap-3">
              <Text name={`stat_value_${i}`} defaultValue={s.value} placeholder="48" />
              <Text name={`stat_label_${i}`} defaultValue={s.label} placeholder="Students mentored this cohort" />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <SubmitButton>Save homepage</SubmitButton>
      </div>
    </form>
  );
}
