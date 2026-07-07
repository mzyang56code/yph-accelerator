import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import WorkshopBrowser from "@/components/WorkshopBrowser";
import { getWorkshops } from "@/lib/data";

export const metadata: Metadata = {
  title: "Workshop library",
  description:
    "Slides, recordings, and workbooks from the Stanford Youth Public Health Accelerator — new workshops every month, free for every student.",
};

export default async function WorkshopsPage() {
  const workshops = await getWorkshops();

  return (
    <>
      <PageHeader
        eyebrow="Workshop library"
        title="The workshop library"
        intro="The team adds new material most months. Filter by topic, then open anything in the shared Google Drive — slides, recordings, and workbooks."
      />
      <section className="shell py-16">
        <WorkshopBrowser workshops={workshops} />
      </section>
    </>
  );
}
