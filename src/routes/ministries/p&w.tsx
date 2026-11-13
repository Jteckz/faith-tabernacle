import { createFileRoute } from "@tanstack/react-router";
import { PageBanner, Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/ministries/p&w")({
  head: () => ({
    meta: [
      { title: "Praise & Worship — EAGT Sinza" },
      {
        name: "description",
        content:
          "The Praise & Worship ministry of EAGT Sinza — joyful worship led by our choir and praise team.",
      },
      { property: "og:title", content: "Praise & Worship — EAGT Sinza" },
    ],
  }),
  component: PraiseAndWorship,
});

function PraiseAndWorship() {
  return (
    <>
      {/* REPLACE: banner photo — swap /public/p&w.jpg with your final team photo */}
      <PageBanner title="Praise & Worship" subtitle="Ministry" background="/p&w.jpg" />

      <section className="bg-cream py-20 md:py-24">
        <div className="mx-auto max-w-3xl space-y-6 px-5 text-lg leading-relaxed text-muted-foreground">
          {/* REPLACE: sample copy — edit with the ministry's own story */}
          <Reveal>
            <p>
              The Praise &amp; Worship ministry leads our church family into the presence of God
              through song. Every Sunday, the choir and praise team open the service with hearts
              full of gratitude, preparing the congregation for the Word.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Beyond Sundays, the team gathers through the week to pray, rehearse and grow — because
              worship is a lifestyle, not a performance. Voices, instruments and willing hands are
              all part of the offering.
            </p>
          </Reveal>
          <Reveal>
            <p>
              {
                "If you love to sing or play an instrument, there is a place for you on the team. Speak to any member after the service, or reach us through the contact page."
              }
            </p>
          </Reveal>
          <Reveal>
            {/* REPLACE: add rehearsal day/time and how to join once confirmed */}
            <div className="rounded-2xl border-t-4 border-gold bg-card p-6 shadow-soft">
              <h2 className="text-2xl font-semibold text-deep">Join the team</h2>
              <p className="mt-2 text-base">
                {
                  "REPLACE: add the rehearsal day and time, and the name of the worship leader to contact."
                }
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
