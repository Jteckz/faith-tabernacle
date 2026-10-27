import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ImagePlaceholder, PageBanner, Reveal } from "@/components/site/Reveal";
import { images } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — EAGT Sinza" },
      {
        name: "description",
        content: "Meet Pastor Chubwa Vitus and discover the story of EAGT Sinza in Dar es Salaam.",
      },
      { property: "og:title", content: "About Us — EAGT Sinza" },
      { property: "og:description", content: "Our pastor and church history." },
    ],
  }),
  component: About,
});

// REPLACE: sample history — edit years and text
const history = [
  {
    year: "19XX",
    title: "A small beginning",
    text: "Sample text: a handful of believers began meeting for prayer in a family home in Sinza.",
  },
  {
    year: "20XX",
    title: "Our first building",
    text: "Sample text: God provided land and the congregation built its first place of worship.",
  },
  {
    year: "20XX",
    title: "Growing ministries",
    text: "Sample text: Sunday School, youth, choir and prayer ministries were established.",
  },
  {
    year: "Today",
    title: "A thriving family",
    text: "Sample text: EAGT Sinza continues to reach Dar es Salaam with the Gospel of Jesus Christ.",
  },
];

type TabId = "pastor" | "history";

const TABS: ReadonlyArray<{ id: TabId; label: string }> = [
  { id: "pastor", label: "Our Pastor" },
  { id: "history", label: "Church History" },
];

function About() {
  const [tab, setTab] = useState<TabId>("pastor");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Arrow / Home / End keys move between tabs, as in the WAI-ARIA tabs pattern.
  const onTablistKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const index = TABS.findIndex((t) => t.id === tab);
    let next: number;
    if (e.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TABS.length - 1;
    else return;
    e.preventDefault();
    const nextTab = TABS[next];
    if (!nextTab) return;
    setTab(nextTab.id);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <PageBanner title="About Us" subtitle="Our Story" />

      <section className="bg-cream py-16 md:py-24">
        <Reveal className="mx-auto max-w-6xl px-5">
          {/* Tab navigation — scrolls horizontally on very narrow screens */}
          <div
            role="tablist"
            aria-label="About EAGT Sinza"
            onKeyDown={onTablistKeyDown}
            className="flex justify-start gap-1 overflow-x-auto border-b-2 border-gold/30 sm:justify-center"
          >
            {TABS.map((t, idx) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls={`panel-${t.id}`}
                tabIndex={tab === t.id ? 0 : -1}
                onClick={() => setTab(t.id)}
                className={cn(
                  "relative shrink-0 px-5 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:px-8 sm:text-sm",
                  tab === t.id ? "text-burgundy" : "text-deep/55 hover:text-deep",
                )}
              >
                {t.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3 bottom-0 h-[3px] rounded-t-sm bg-gold transition-opacity duration-200",
                    tab === t.id ? "opacity-100" : "opacity-0",
                  )}
                />
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mx-auto max-w-6xl px-5 pt-12 md:pt-16">
          {TABS.map((t) => (
            <div
              key={t.id}
              id={`panel-${t.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${t.id}`}
              hidden={tab !== t.id}
              className="focus-visible:outline-none"
            >
              {tab === t.id && (
                <div className="panel-in">
                  {t.id === "pastor" ? <PastorProfile /> : <ChurchHistory />}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function PastorProfile() {
  return (
    <div className="grid items-center gap-14 md:grid-cols-[1fr_1.2fr]">
      <div className="relative">
        <div
          className="absolute -bottom-4 -left-4 h-full w-full rounded-2xl bg-burgundy/10"
          aria-hidden
        />
        {/* REPLACE: pastor photo — set images.pastor in src/lib/site.ts */}
        {images.pastor ? (
          <img
            src={images.pastor}
            alt="Pastor Chubwa Vitus"
            loading="lazy"
            className="brand-img relative aspect-[4/5] w-full"
          />
        ) : (
          <ImagePlaceholder
            label="Replace: pastor photo"
            className="relative aspect-[4/5] w-full"
          />
        )}
      </div>
      <div>
        <h2 className="text-5xl font-bold text-deep">PASTOR CHUBWA VITUS</h2>
        <p className="mt-2 font-semibold text-primary">Senior Pastor</p>
        <span className="gold-rule mt-4" />
        {/* REPLACE: pastor biography (sample text) */}
        <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
          <p>
            Sample biography: Pastor Chubwa Vitus serves as the Senior Pastor of EAGT Sinza, leading
            the congregation with a heart for prayer, sound teaching and compassion for the
            community.
          </p>
          <p>
            Sample biography: Called to ministry at a young age, he has faithfully served in various
            capacities within the Evangelistic Assemblies of God Tanzania, raising disciples and
            strengthening families.
          </p>
          <p>
            Sample biography: Together with his family, he is passionate about seeing lives
            transformed by the power of the Gospel across Dar es Salaam and beyond.
          </p>
        </div>
      </div>
    </div>
  );
}

function ChurchHistory() {
  return (
    <div className="grid items-start gap-14 lg:grid-cols-2">
      <ol className="relative border-l-2 border-gold/60 pl-8">
        {history.map((h) => (
          <li key={h.title} className="relative mb-10 last:mb-0">
            <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-cream bg-burgundy" />
            <p className="font-display text-2xl font-bold text-primary">{h.year}</p>
            <h3 className="text-2xl font-semibold text-deep">{h.title}</h3>
            <p className="mt-1 text-muted-foreground">{h.text}</p>
          </li>
        ))}
      </ol>
      {/* REPLACE: church history photo */}
      <img
        src={images.history}
        alt="EAGT Sinza church building"
        loading="lazy"
        width={1600}
        height={1008}
        className="brand-img aspect-[4/3] w-full"
      />
    </div>
  );
}
