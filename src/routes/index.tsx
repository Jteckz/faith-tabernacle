import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { KangaPattern } from "@/components/site/KangaPattern";
import { Reveal } from "@/components/site/Reveal";
import { useRequestModal } from "@/components/site/RequestModal";
import { images } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EAGT Sinza — Church in Sinza, Dar es Salaam" },
      {
        name: "description",
        content:
          "Join EAGT Sinza for Sunday School, Sunday services, prayer and deliverance, and praise and worship in Dar es Salaam.",
      },
      { property: "og:title", content: "EAGT Sinza — Church in Sinza, Dar es Salaam" },
      {
        property: "og:description",
        content: "Sunday School, services, prayer and worship at EAGT Sinza.",
      },
    ],
    links: [{ rel: "preload", as: "image", href: "/heroVideo-poster.webp", fetchPriority: "high" }],
  }),
  component: Index,
});

// EDIT ME: "Your first Sunday" steps — keep each note to a sentence or two.
const firstSundaySteps = [
  {
    n: "01",
    title: "Arrive and be welcomed",
    text: "Our ushers will greet you at the door and help you find a seat.",
  },
  { n: "02", title: "Worship with us", text: "Sing, pray and hear the Word. Come as you are." },
  {
    n: "03",
    title: "Stay and connect",
    text: "Meet people, ask questions, and let us pray with you.",
  },
];

function Index() {
  const openModal = useRequestModal();

  const planCls =
    "rounded-lg bg-brand-gold px-6 py-3 text-sm font-bold text-brand-deep transition duration-200 hover:-translate-y-0.5 hover:bg-[#cba927] hover:shadow-[0_14px_30px_rgba(16,75,43,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold";
  const prayerCls =
    "rounded-lg border-2 border-deep px-6 py-3 text-sm font-bold text-deep transition duration-200 hover:-translate-y-0.5 hover:bg-deep hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep";

  return (
    <>
      <Hero />

      {/* A — Welcome split: arch photo + overlapping print, warm copy */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-[400px] sm:max-w-[440px] lg:max-w-[460px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl ring-2 ring-brand-gold/70">
              {/* REPLACE: welcome photo (arch) — currently images.hero[0] in src/lib/site.ts; point src at your own photo */}
              <img
                src={images.hero[0]}
                alt="A family smiling during Sunday service at EAGT Sinza"
                loading="lazy"
                width={1920}
                height={966}
                className="h-full w-full object-cover object-[72%_38%]"
              />
            </div>
            <div className="absolute -bottom-9 -right-2 w-[46%] rotate-3 bg-white p-1.5 shadow-soft sm:-right-6">
              {/* REPLACE: welcome photo (small print) — currently images.hero[1] in src/lib/site.ts */}
              <img
                src={images.hero[1]}
                alt="Members lifting their hands in prayer"
                loading="lazy"
                width={1920}
                height={966}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="pb-6 lg:pb-0">
            <Reveal>
              <p className="eyebrow mb-3 text-burgundy">Karibu — Welcome</p>
              <h2 className="text-4xl font-semibold leading-[1.12] text-deep sm:text-5xl">
                {"You don't have to be perfect to walk in."}
              </h2>
            </Reveal>
            <Reveal>
              <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  {
                    "Whether you are new to faith or have walked with God for years, you belong here. Come as you are and experience the love of Christ with us."
                  }
                </p>
                <p>
                  {
                    "We are ordinary people following an extraordinary Saviour — families, students and elders learning to pray, serve and grow together. There is a seat with your name on it."
                  }
                </p>
              </div>
              <p className="mt-7 font-brand-script text-3xl text-deep">— Pastor Chubwa Vitus</p>
              <Link
                to="/about"
                className="group mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-burgundy transition hover:text-deep"
              >
                Read our story
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* B — Your first Sunday: three steps, no cards, dotted joins on desktop */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <h2 className="text-4xl font-semibold text-deep sm:text-5xl">Your first Sunday</h2>
          </Reveal>
          <ol className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-8 lg:gap-12">
            {firstSundaySteps.map((step, i) => (
              <li key={step.n} className="relative">
                {i < firstSundaySteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[calc(50%+3rem)] right-[-1.5rem] top-8 hidden border-t-2 border-dashed border-deep/25 lg:block"
                  />
                )}
                <Reveal>
                  <p
                    aria-hidden="true"
                    className="font-display text-6xl font-semibold leading-none text-brand-gold"
                  >
                    {step.n}
                  </p>
                  <h3 className="mt-4 text-2xl font-bold text-deep">{step.title}</h3>
                  <p className="mt-3 max-w-xs leading-relaxed text-muted-foreground">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* C — Verse band in burgundy with a faint kanga pattern */}
      <section className="relative isolate overflow-hidden bg-brand-burgundy py-20 text-center md:py-24">
        <KangaPattern />
        <Reveal className="relative mx-auto max-w-3xl px-5">
          <blockquote className="font-display text-3xl italic leading-snug text-cream md:text-4xl">
            “For where two or three gather in my name, there am I with them.”
          </blockquote>
          <p className="eyebrow mt-6 text-brand-gold">Matthew 18:20</p>
        </Reveal>
      </section>

      {/* D — Closing invitation */}
      <section className="bg-cream py-20 md:py-28">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-7 px-5 text-center">
          <h2 className="text-4xl font-semibold text-deep sm:text-5xl">
            We saved you a seat this Sunday.
          </h2>
          <p className="max-w-xl text-muted-foreground">
            {"Bring your family and friends — a warm welcome is waiting for you at EAGT Sinza."}
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <button onClick={() => openModal("visit")} className={planCls}>
              Plan to Visit
            </button>
            <button onClick={() => openModal("prayer")} className={prayerCls}>
              Prayer Request
            </button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
