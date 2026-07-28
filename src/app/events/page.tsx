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

export const revalidate = 300;

export default async function EventsPage() {
  const events = await getEvents();

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => (e.endDate ?? e.date) >= today);
  const past = events
    .filter((e) => (e.endDate ?? e.date) < today)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        eyebrow="What's happening"
        title="Events"
        intro="Everything the cohort is running this season. Most events are open to the public and free. Registration links are on each card."
      />
      <div className="shell space-y-16 py-16">
        <section>
          <h2 className="display text-2xl text-ink sm:text-3xl">Upcoming events</h2>
          <div className="rule-tick mt-4 mb-8" />
          {upcoming.length > 0 ? (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event, i) => (
                <Reveal as="li" key={event.id} delay={(i % 3) * 90}>
                  <EventCard event={event} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <p className="text-stone">Nothing on the calendar right now. Check back soon.</p>
          )}
        </section>

        {past.length > 0 && (
          <section>
            <h2 className="display text-2xl text-ink sm:text-3xl">Past events</h2>
            <div className="rule-tick mt-4 mb-8" />
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {past.map((event, i) => (
                <Reveal as="li" key={event.id} delay={(i % 3) * 90}>
                  <EventCard event={event} past />
                </Reveal>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
