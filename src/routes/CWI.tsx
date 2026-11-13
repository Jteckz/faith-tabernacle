import { createFileRoute } from "@tanstack/react-router";
import { ImagePlaceholder, PageBanner, Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/CWI")({
  head: () => ({
    meta: [
      { title: "LITENAS CWI (Children's Ministry) — EAGT Sinza" },
      {
        name: "description",
        content:
          "LITENAS CWI — the children's ministry of EAGT Sinza, raising children to know, love and follow Jesus.",
      },
      { property: "og:title", content: "LITENAS CWI (Children's Ministry) — EAGT Sinza" },
    ],
  }),
  component: CWI,
});

function CWI() {
  return (
    <>
      <PageBanner title="LITENAS CWI" subtitle="Children's Ministry" />

      <section className="bg-cream py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5">
          {/* REPLACE: drop the children's ministry banner photo at /public/cwi.jpg and set src="/cwi.jpg" */}
          <Reveal>
            <ImagePlaceholder
              label="Replace: CWI banner photo — /public/cwi.jpg"
              className="aspect-[21/9] w-full"
            />
          </Reveal>

          <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
            {/* REPLACE: sample copy — edit with the ministry's own story */}
            <Reveal>
              <p>
                LITENAS CWI is the children's ministry of EAGT Sinza — a safe, joyful place where
                children meet Jesus. Through Bible stories, songs, memory verses and games, children
                learn the Word of God at their own level.
              </p>
            </Reveal>
            <Reveal>
              <p>
                {
                  "Sunday School teachers and helpers walk with the children every week, praying with them and walking with their families. Parents are always welcome to sit in and see what their children are learning."
                }
              </p>
            </Reveal>
            <Reveal>
              <p>
                {
                  "REPLACE: add meeting times, age groups and who parents should talk to about joining the class."
                }
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
