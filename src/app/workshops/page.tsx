import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import WorkshopBrowser from "@/components/WorkshopBrowser";
import { getWorkshops, getWorkshopCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Workshop library",
  description:
    "Slides, recordings, and workbooks from the Stanford Youth Public Health Accelerator. New workshops every month, free for every student.",
};

export const revalidate = 300;

export default async function WorkshopsPage() {
  const [workshops, categories] = await Promise.all([getWorkshops(), getWorkshopCategories()]);

  return (
    <>
      <PageHeader
        title="Workshop Library"
        intro="A growing library of talks and skill-building sessions, free for every student in the program."
      />
      <section className="shell py-16">
        <WorkshopBrowser workshops={workshops} categories={categories} />
      </section>
    </>
  );
}
