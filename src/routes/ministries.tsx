import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock, Flame, Music } from "lucide-react";
import { PageBanner, Reveal, SectionTitle } from "@/components/site/Reveal";
import { images, services } from "@/lib/site";

export const Route = createFileRoute("/ministries")({
  head: () => ({
    meta: [
      { title: "Ministries — EAGT Sinza" },
      {
        name: "description",
        content:
          "Sunday School, prayers and deliverance, and praise and worship at EAGT Sinza in Dar es Salaam.",
      },
      { property: "og:title", content: "Ministries — EAGT Sinza" },
      {
        property: "og:description",
        content:
          "The ministries of EAGT Sinza: Sunday School, prayer and deliverance, and worship.",
      },
    ],
  }),
  component: Ministries,
});

// REPLACE: ministry descriptions and photos — images.hero is set in src/lib/site.ts
const ministries = [
  {
    Icon: BookOpen,
    title: "Sunday School & Services",
    text: "Bible teaching for every age and Spirit-filled Sunday services for the whole family.",
    img: images.hero[0],
    to: "/about" as const,
  },
  {
    Icon: Flame,
    title: "Prayers & Deliverance",
    text: "Dedicated times of intercession where we stand together for healing and freedom.",
    img: images.hero[1],
    to: "/contact" as const,
  },
  {
    Icon: Music,
    title: "Praise & Worship",
    text: "Joyful worship led by our choir and praise team — come and lift your voice.",
    img: images.hero[2],
    to: "/contact" as const,
  },
];

function Ministries() {
  return (
    <>
      <PageBanner title="Ministries" subtitle="What We Do" />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Every ministry at EAGT Sinza is a place to grow in the Word, stand together in prayer,
              and lift your voice in worship. There is a place for you here.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {ministries.map(({ Icon, title, text, img, to }) => (
              <Reveal key={title}>
                <Link
                  to={to}
                  className="group block h-full overflow-hidden rounded-2xl bg-card shadow-soft transition hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={img}
                      alt={title}
                      loading="lazy"
                      className="hero-img h-full w-full object-cover object-right transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep/70 to-transparent" />
                    <span className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-full bg-gold text-gold-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-deep">{title}</h2>
                    <p className="mt-2 text-muted-foreground">{text}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-burgundy">
                      Learn more{" "}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal>
            <SectionTitle eyebrow="When we meet" title="Gather with us" center />
          </Reveal>
          <Reveal className="grid gap-4 sm:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.name}
                className="rounded-xl border-t-4 border-gold bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
              >
                <Clock className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-2xl font-semibold text-deep">{s.name}</h3>
                <p className="mt-1 text-sm font-semibold text-burgundy">{s.day}</p>
                <p className="text-sm text-muted-foreground">{s.time}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
