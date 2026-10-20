import { createFileRoute } from "@tanstack/react-router";
import { ImagePlaceholder, PageBanner, Reveal, SectionTitle } from "@/components/site/Reveal";
import { images } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — EAGT Sinza" },
      { name: "description", content: "Meet Pastor Chubwa Vitus and discover the story of EAGT Sinza in Dar es Salaam." },
      { property: "og:title", content: "About Us — EAGT Sinza" },
      { property: "og:description", content: "Our pastor and church history." },
    ],
  }),
  component: About,
});

// REPLACE: sample history — edit years and text
const history = [
  { year: "19XX", title: "A small beginning", text: "Sample text: a handful of believers began meeting for prayer in a family home in Sinza." },
  { year: "20XX", title: "Our first building", text: "Sample text: God provided land and the congregation built its first place of worship." },
  { year: "20XX", title: "Growing ministries", text: "Sample text: Sunday School, youth, choir and prayer ministries were established." },
  { year: "Today", title: "A thriving family", text: "Sample text: EAGT Sinza continues to reach Dar es Salaam with the Gospel of Jesus Christ." },
];

function About() {
  return (
    <>
      <PageBanner title="About Us" subtitle="Our Story" />

      <section className="py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-[1fr_1.2fr]">
          <Reveal className="relative">
            <div className="absolute -bottom-4 -left-4 h-full w-full rounded-2xl bg-burgundy/10" aria-hidden />
            {/* REPLACE: pastor photo — set images.pastor in src/lib/site.ts */}
            {images.pastor ? (
              <img src={images.pastor} alt="Pastor Chubwa Vitus" loading="lazy" className="brand-img relative aspect-[4/5] w-full" />
            ) : (
              <ImagePlaceholder label="Replace: pastor photo" className="relative aspect-[4/5] w-full" />
            )}
          </Reveal>
          <Reveal>
            <p className="eyebrow mb-3 text-burgundy">Our Pastor</p>
            <h2 className="text-5xl font-bold text-deep">PASTOR CHUBWA VITUS</h2>
            <p className="mt-2 font-semibold text-primary">Senior Pastor</p>
            <span className="gold-rule mt-4" />
            {/* REPLACE: pastor biography (sample text) */}
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              <p>Sample biography: Pastor Chubwa Vitus serves as the Senior Pastor of EAGT Sinza, leading the congregation with a heart for prayer, sound teaching and compassion for the community.</p>
              <p>Sample biography: Called to ministry at a young age, he has faithfully served in various capacities within the Evangelistic Assemblies of God Tanzania, raising disciples and strengthening families.</p>
              <p>Sample biography: Together with his family, he is passionate about seeing lives transformed by the power of the Gospel across Dar es Salaam and beyond.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal><SectionTitle eyebrow="Since the beginning" title="Church History" center /></Reveal>
          <div className="grid items-start gap-14 lg:grid-cols-2">
            <ol className="relative border-l-2 border-gold/60 pl-8">
              {history.map((h) => (
                <Reveal key={h.title} className="relative mb-10 last:mb-0">
                  <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-cream bg-burgundy" />
                  <p className="font-display text-2xl font-bold text-primary">{h.year}</p>
                  <h3 className="text-2xl font-semibold text-deep">{h.title}</h3>
                  <p className="mt-1 text-muted-foreground">{h.text}</p>
                </Reveal>
              ))}
            </ol>
            <Reveal>
              {/* REPLACE: church history photo */}
              <img src={images.history} alt="EAGT Sinza church building" loading="lazy" width={1600} height={1008} className="brand-img aspect-[4/3] w-full" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
