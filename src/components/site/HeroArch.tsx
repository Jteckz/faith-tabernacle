/**
 * Alternate Home hero variant — "HeroArch" (not enabled by default).
 * Split layout: solid deep green with a faint kanga-inspired pattern behind the
 * copy on the left; the video inside a church-window arch (rounded top, thin
 * gold outline) on the right. On mobile the arch stacks above the text.
 *
 * To use it instead of the overlay hero, edit src/routes/index.tsx:
 *   import { HeroArch } from "@/components/site/HeroArch";
 *   and render <HeroArch /> in place of <Hero />.
 */
import { Clock } from "lucide-react";
import { CalmVideo, HERO_POSTER } from "./CalmVideo";
import { KangaPattern } from "./KangaPattern";
import { useRequestModal } from "./RequestModal";
import { services } from "@/lib/site";

export function HeroArch() {
  const openModal = useRequestModal();

  const planCls =
    "rounded-lg bg-brand-gold px-6 py-3 text-sm font-bold text-brand-deep transition duration-200 hover:-translate-y-0.5 hover:bg-[#cba927] hover:shadow-[0_14px_30px_rgba(16,75,43,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold";
  const prayerCls =
    "rounded-lg border-2 border-white/90 px-6 py-3 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold";

  return (
    <section
      aria-labelledby="hero-arch-title"
      className="relative isolate overflow-hidden bg-brand-deep lg:h-[94svh]"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Copy — solid deep green with the pattern behind it */}
        <div className="relative order-2 flex flex-col justify-center px-5 pb-14 pt-8 sm:px-10 lg:order-1 lg:min-h-[94svh] lg:px-10 lg:py-0">
          <KangaPattern />
          <div className="relative max-w-xl">
            <p className="hero-rise text-[0.7rem] font-bold uppercase tracking-[0.3em] text-brand-gold sm:text-xs">
              EAGT Sinza · Dar es Salaam
            </p>
            <h1
              id="hero-arch-title"
              className="hero-rise mt-4 font-brand-serif text-[clamp(3rem,8.4vw,5rem)] font-semibold leading-[1.04] tracking-[-0.01em] text-white [animation-delay:120ms]"
            >
              Karibu{" "}
              <span className="relative inline-block whitespace-nowrap">
                nyumbani
                <svg
                  aria-hidden="true"
                  viewBox="0 0 230 14"
                  preserveAspectRatio="none"
                  className="absolute -bottom-[0.18em] left-0 h-[0.18em] w-full"
                >
                  <path
                    d="M4 9 C 34 4, 58 11, 88 7 S 150 10, 178 6 S 214 9, 226 5"
                    fill="none"
                    stroke="#E5BE36"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>
            <p className="hero-rise mt-5 max-w-[32rem] text-base leading-relaxed text-white/85 [animation-delay:240ms] sm:text-lg md:text-xl">
              {"Welcome home, there's a seat for you this Sunday."}
            </p>
            <div className="hero-rise mt-8 flex flex-wrap gap-3 [animation-delay:360ms] sm:gap-4">
              <button onClick={() => openModal("visit")} className={planCls}>
                Plan to Visit
              </button>
              <button onClick={() => openModal("prayer")} className={prayerCls}>
                Prayer Request
              </button>
            </div>
            <div className="hero-rise mt-9 max-w-sm space-y-2.5 border-t border-brand-gold/30 pt-6 [animation-delay:480ms]">
              {services.map((s) => (
                <p key={s.name} className="flex items-center gap-3 text-sm text-white/85">
                  <Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-gold" />
                  <span className="font-semibold tracking-[0.02em]">{s.short}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Video in a church-window arch */}
        <div className="order-1 flex items-center justify-center px-5 pt-10 sm:px-10 lg:order-2 lg:h-[94svh] lg:py-0">
          <div className="relative aspect-[3/4] max-h-[550px] w-full max-w-[400px] overflow-hidden rounded-t-full rounded-b-3xl ring-2 ring-brand-gold/70 lg:max-h-none lg:max-w-[460px]">
            <div aria-hidden="true" className="hero-zoom absolute inset-0">
              <img
                src={HERO_POSTER}
                alt=""
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <CalmVideo className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/55 via-brand-deep/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
