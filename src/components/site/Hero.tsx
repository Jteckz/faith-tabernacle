/**
 * Home hero — a warm, human welcome laid over the church video.
 * Deep-green gradient scrim (exact brand colours) over the footage, left-aligned copy,
 * gold hand-drawn underline, and a slim service-times bar pinned to the bottom.
 * Motion is CSS-only and fully disabled for prefers-reduced-motion.
 */
import { Fragment } from "react";
import { Clock } from "lucide-react";
import { CalmVideo, HERO_POSTER } from "./CalmVideo";
import { useRequestModal } from "./RequestModal";
import { services } from "@/lib/site";

/** Slightly imperfect, hand-drawn swell under "nyumbani" (viewBox 230×12). */
const UNDERLINE_PATH = "M4 9 C 34 4, 58 11, 88 7 S 150 10, 178 6 S 214 9, 226 5";

export function Hero() {
  const openModal = useRequestModal();

  const planCls =
    "rounded-lg bg-brand-gold px-6 py-3 text-sm font-bold text-brand-deep transition duration-200 hover:-translate-y-0.5 hover:bg-[#cba927] hover:shadow-[0_14px_30px_rgba(16,75,43,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold";
  const prayerCls =
    "rounded-lg border-2 border-white px-6 py-3 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold";

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex h-[80svh] min-h-[600px] items-center overflow-hidden bg-brand-deep md:h-[92svh] md:min-h-[660px]"
    >
      {/* Video — full bleed, poster first, very slow settling zoom */}
      <div aria-hidden="true" className="hero-zoom absolute inset-0">
        <img
          src={HERO_POSTER}
          alt=""
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <CalmVideo className="absolute inset-0 h-full w-full object-cover" />
      </div>

      {/* Deep-green scrims (exact brand colour): bottom→top on mobile, left→right from md up */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,75,43,0.95)_0%,rgba(16,75,43,0.82)_55%,rgba(16,75,43,0.35)_100%)] md:bg-[linear-gradient(100deg,rgba(16,75,43,0.93)_4%,rgba(16,75,43,0.8)_38%,rgba(16,75,43,0)_74%)]"
      />

      {/* Copy — asymmetric, left aligned */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8">
        <div className="max-w-3xl">
          <p className="hero-rise text-[0.7rem] font-bold uppercase tracking-[0.3em] text-brand-gold sm:text-xs">
            EAGT Sinza · Dar es Salaam
          </p>
          <h1
            id="hero-title"
            className="hero-rise mt-4 font-brand-serif text-[clamp(3rem,8.4vw,5.5rem)] font-semibold leading-[1.04] tracking-[-0.01em] text-white [animation-delay:120ms]"
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
                  d={UNDERLINE_PATH}
                  fill="none"
                  stroke="#E5BE36"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h1>
          <p className="hero-rise mt-5 max-w-[34rem] text-base leading-relaxed text-white/85 [animation-delay:240ms] sm:text-lg md:text-xl">
            {"Welcome home, there's a seat for you this Sunday."}
          </p>
          <div className="hero-rise mt-9 flex flex-wrap gap-3 [animation-delay:360ms] sm:gap-4">
            <button onClick={() => openModal("visit")} className={planCls}>
              Plan to Visit
            </button>
            <button onClick={() => openModal("prayer")} className={prayerCls}>
              Prayer Request
            </button>
          </div>
        </div>
      </div>

      {/* Service times bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t-2 border-brand-gold/60 bg-brand-deep/70 backdrop-blur-md backdrop-saturate-150">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-1.5 px-5 py-3 sm:px-8">
          <Clock aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-gold" />
          {services.map((s, i) => (
            <Fragment key={s.name}>
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="hidden h-1 w-1 rounded-full bg-brand-gold/70 sm:block"
                />
              )}
              <span className="text-xs font-semibold tracking-[0.02em] text-white/90 sm:text-sm">
                {s.short}
              </span>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
