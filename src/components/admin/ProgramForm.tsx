import { saveProgramContent } from "@/app/admin/actions";
import { Field, Text, Area, Toggle, SubmitButton } from "./ui";
import type { ProgramContent } from "@/lib/data";

export default function ProgramForm({ content }: { content: ProgramContent }) {
  return (
    <form action={saveProgramContent} className="max-w-2xl space-y-8">
      {/* Cohort application — the toggle + form URL that drive the Apply buttons. */}
      <section className="rounded-lg border border-ink/15 bg-paper/50 p-5">
        <p className="text-sm font-semibold text-ink">Cohort application</p>
        <p className="mt-0.5 text-xs text-stone">
          When off, the Apply buttons (home + program) read “2026 Cohort — Coming Soon”. Turn it on to make them live.
        </p>
        <div className="mt-4 space-y-4">
          <Toggle name="application_open" defaultChecked={content.applicationOpen} label="Applications are open" />
          <Field label="Application form URL" hint="The Google Form (or similar) the Apply button opens.">
            <Text name="application_url" defaultValue={content.applicationUrl} placeholder="https://forms.gle/…" />
          </Field>
        </div>
      </section>

      <section className="space-y-5">
        <p className="text-sm font-semibold text-ink">Hero</p>
        <Field label="Hero title">
          <Text name="hero_title" defaultValue={content.heroTitle} />
        </Field>
        <Field label="Hero intro" hint="One or two sentences on the cohort mentorship structure.">
          <Area name="hero_intro" defaultValue={content.heroIntro} rows={3} />
        </Field>
      </section>

      <div className="pt-2">
        <SubmitButton>Save program page</SubmitButton>
      </div>
    </form>
  );
}
