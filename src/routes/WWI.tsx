import { createFileRoute } from "@tanstack/react-router";
import { ImagePlaceholder, PageBanner, Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/WWI")({
  head: () => ({
    meta: [
      { title: "WWI (Women's Ministry) — EAGT Sinza" },
      {
        name: "description",
        content:
          "WWI — the women's ministry of EAGT Sinza, raising women of faith, prayer and purpose.",
      },
      { property: "og:title", content: "WWI (Women's Ministry) — EAGT Sinza" },
    ],
  }),
  component: WWI,
});

function WWI() {
  return (
    <>
      <PageBanner title="WWI" subtitle="Women's Ministry" />

      <section className="bg-cream py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5">
          {/* REPLACE: drop the women's ministry banner photo at /public/wwi.jpg and set src="/wwi.jpg" */}
          <Reveal>
            <ImagePlaceholder
              label="Replace: WWI banner photo — /public/wwi.jpg"
              className="aspect-[21/9] w-full"
            />
          </Reveal>

          <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
            {/* REPLACE: sample copy — edit with the ministry's own story */}
            <Reveal>
              <p>
                WWI brings the women of EAGT Sinza together as women of faith, prayer and purpose —
                supporting one another in the home, in the church and in the community.
              </p>
            </Reveal>
            <Reveal>
              <p>
                From Bible study and prayer meetings to visiting the sick and helping families in
                need, the women of WWI serve with open hands and open hearts.
              </p>
            </Reveal>
            <Reveal>
              <p>{"REPLACE: add meeting day/time, leadership names and how to join."}</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
