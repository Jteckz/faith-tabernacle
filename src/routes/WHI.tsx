import { createFileRoute } from "@tanstack/react-router";
import { ImagePlaceholder, PageBanner, Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/WHI")({
  head: () => ({
    meta: [
      { title: "WHI (Men's & Fathers' Ministry) — EAGT Sinza" },
      {
        name: "description",
        content:
          "WHI — the men's and fathers' ministry of EAGT Sinza, raising men of the Word, prayer and integrity.",
      },
      { property: "og:title", content: "WHI (Men's & Fathers' Ministry) — EAGT Sinza" },
    ],
  }),
  component: WHI,
});

function WHI() {
  return (
    <>
      <PageBanner title="WHI" subtitle="Men's & Fathers' Ministry" />

      <section className="bg-cream py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5">
          {/* REPLACE: drop the men's ministry banner photo at /public/whi.jpg and set src="/whi.jpg" */}
          <Reveal>
            <ImagePlaceholder
              label="Replace: WHI banner photo — /public/whi.jpg"
              className="aspect-[21/9] w-full"
            />
          </Reveal>

          <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
            {/* REPLACE: sample copy — edit with the ministry's own story */}
            <Reveal>
              <p>
                WHI gathers the men and fathers of EAGT Sinza to grow into men of the Word, prayer
                and integrity — at home, at work and in the church.
              </p>
            </Reveal>
            <Reveal>
              <p>
                Through fellowship meetings, prayer breakfasts and serving together, the men of EAGT
                Sinza carry one another's burdens and build one another up.
              </p>
            </Reveal>
            <Reveal>
              <p>{"REPLACE: add meeting day/time, leadership names and how to join."}</p>
            </Reveal>
          </div>

          {/* REPLACE: gallery — drop photos at /public/whi-1.jpg, /public/whi-2.jpg, /public/whi-3.jpg */}
          <Reveal className="mt-14">
            <h2 className="text-3xl font-semibold text-deep">Moments from WHI</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <ImagePlaceholder
                label="Replace: WHI photo 1 — /public/whi-1.jpg"
                className="aspect-[4/3] w-full"
              />
              <ImagePlaceholder
                label="Replace: WHI photo 2 — /public/whi-2.jpg"
                className="aspect-[4/3] w-full"
              />
              <ImagePlaceholder
                label="Replace: WHI photo 3 — /public/whi-3.jpg"
                className="aspect-[4/3] w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
