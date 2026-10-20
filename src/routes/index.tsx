import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Flame, Music, Clock, ArrowRight } from "lucide-react";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { Reveal, SectionTitle } from "@/components/site/Reveal";
import { useRequestModal } from "@/components/site/RequestModal";
import { images, services } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EAGT Sinza — Church in Sinza, Dar es Salaam" },
      { name: "description", content: "Join EAGT Sinza for Sunday School, Sunday services, prayer and deliverance, and praise and worship in Dar es Salaam." },
      { property: "og:title", content: "EAGT Sinza — Church in Sinza, Dar es Salaam" },
      { property: "og:description", content: "Sunday School, services, prayer and worship at EAGT Sinza." },
    ],
  }),
  component: Index,
});

const work = [
  { Icon: BookOpen, title: "Sunday School & Services", text: "Bible teaching for every age and Spirit-filled Sunday services for the whole family.", img: images.hero[0], to: "/about" as const },
  { Icon: Flame, title: "Prayers & Deliverance", text: "Dedicated times of intercession where we stand together for healing and freedom.", img: images.hero[1], to: "/contact" as const },
  { Icon: Music, title: "Praise & Worship", text: "Joyful worship led by our choir and praise team — come and lift your voice.", img: images.hero[2], to: "/contact" as const },
];

function Index() {
  const openModal = useRequestModal();
  return (
    <>
      <HeroCarousel />

      {/* Welcome strip + service times */}
      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <Reveal>
            <SectionTitle eyebrow="Karibu — Welcome" title="A home for every heart in Sinza" />
            <p className="text-lg leading-relaxed text-muted-foreground">
              Whether you are new to faith or have walked with God for years, you belong here. Come as you are and experience the love of Christ with us.
            </p>
          </Reveal>
          <Reveal className="grid gap-4 sm:grid-cols-3">
            {services.map((s) => (
              <div key={s.name} className="rounded-xl border-t-4 border-gold bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
                <Clock className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-2xl font-semibold text-deep">{s.name}</h3>
                <p className="mt-1 text-sm font-semibold text-burgundy">{s.day}</p>
                <p className="text-sm text-muted-foreground">{s.time}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* What we do */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal><SectionTitle eyebrow="Ministries" title="What We Do" center /></Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {work.map(({ Icon, title, text, img, to }) => (
              <Reveal key={title}>
                <Link to={to} className="group block h-full overflow-hidden rounded-2xl bg-card shadow-soft transition hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="relative h-56 overflow-hidden">
                    <img src={img} alt={title} loading="lazy" className="hero-img h-full w-full object-cover object-right transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep/70 to-transparent" />
                    <span className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-full bg-gold text-gold-foreground"><Icon className="h-5 w-5" /></span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-deep">{title}</h3>
                    <p className="mt-2 text-muted-foreground">{text}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-burgundy">Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture banner */}
      <section className="bg-pattern bg-deep py-20 text-center">
        <Reveal className="mx-auto max-w-3xl px-5">
          <p className="font-display text-3xl italic leading-snug text-gold md:text-4xl">
            “For where two or three gather in my name, there am I with them.”
          </p>
          <span className="gold-rule mx-auto mt-6" />
          <p className="eyebrow mt-4 text-deep-foreground/80">Matthew 18:20</p>
        </Reveal>
      </section>

      {/* CTA band */}
      <section className="bg-cream py-20">
        <Reveal className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 text-center">
          <h2 className="text-4xl font-semibold text-deep md:text-5xl">We would love to see you this Sunday</h2>
          <p className="max-w-xl text-muted-foreground">Bring your family and friends. A warm welcome is waiting for you at EAGT Sinza.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => openModal("visit")} className="rounded-full bg-gold px-7 py-3.5 font-semibold text-gold-foreground transition hover:-translate-y-0.5 hover:shadow-lift">Plan to Visit</button>
            <button onClick={() => openModal("prayer")} className="rounded-full border-2 border-primary px-7 py-3.5 font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">Prayer Request</button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
