import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import EventCard from "@/components/EventCard";
import Reveal from "@/components/Reveal";
import { getEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Symposia, field studies, workshops, and community days run by students in the Stanford Youth Public Health Accelerator.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHeader
        eyebrow="What's happening"
        title="Events"
        intro="Everything the cohort is running this season. Most events are open to the public and free — registration links are on each card."
      />
      <section className="shell py-16">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => (
            <Reveal as="li" key={event.id} delay={(i % 3) * 90}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
