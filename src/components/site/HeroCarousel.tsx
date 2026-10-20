import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { church_info, services } from "@/lib/site";
import { useRequestModal } from "./RequestModal";
import { cn } from "@/lib/utils";

type Slide = {
  eyebrow: string;
  lines: [string, string];
  label: string;
  graphic?: string;
};

const slides: Slide[] = [
  {
    eyebrow: "Join us this Sunday for our",
    lines: ["Sunday School", "& Services"],
    label: "Sunday School & Services",
    graphic: "/image1-a.svg",
  },
  {
    eyebrow: "Come expectant this Sunday for",
    lines: ["Prayers &", "Deliverance"],
    label: "Prayers & Deliverance",
  },
  {
    eyebrow: "Lift your voice with us in",
    lines: ["Praise &", "Worship"],
    label: "Praise & Worship",
  },
];

function ordinal(n: number) {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${suffixes[(v - 20) % 10] ?? suffixes[v] ?? suffixes[0]}`;
}

function upcomingSunday() {
  const d = new Date();
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7));
  return [
    ordinal(d.getDate()).toUpperCase(),
    d.toLocaleString("en-US", { month: "long" }).toUpperCase(),
    String(d.getFullYear()),
  ];
}

function clockLabel(value: string) {
  const match = value.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return value;
  const [, hour = "", minute = "", meridiem = ""] = match;
  return `${hour.padStart(2, "0")}:${minute}${meridiem.toUpperCase()}`;
}

const serviceTimes = services.map((s) => clockLabel(s.time.split("–")[0]?.trim() ?? s.time));

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef<number | null>(null);
  const openModal = useRequestModal();
  const n = slides.length;
  const date = useMemo(upcomingSunday, []);
  const go = useCallback((d: number) => setI((p) => (p + d + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setI((p) => (p + 1) % n), 6500);
    return () => window.clearInterval(t);
  }, [paused, n]);

  const ctaCls =
    "min-w-[9.5rem] rounded-md bg-[#e01b24] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:bg-[#c1141c] sm:px-8 sm:text-base";
  const arrowCls =
    "absolute top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30 sm:h-12 sm:w-12";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Church highlights"
      className="relative h-[calc(100svh-5rem)] min-h-[640px] overflow-hidden bg-deep"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      onTouchStart={(e) => (touch.current = e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = (e.changedTouches[0]?.clientX ?? touch.current) - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <img
        src="/image1.svg"
        alt=""
        width={1199}
        height={678}
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/10 to-slate-950/65" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.14),transparent_62%)]" />

      <div className="relative z-10 flex h-full items-center justify-center px-6 pb-32 pt-16 sm:px-10 sm:pb-36">
        <div className="relative w-full max-w-6xl text-center">
          {slides.map((s, idx) => (
            <div
              key={s.label}
              aria-hidden={idx !== i}
              className={cn(
                "transition-all duration-700",
                idx === i
                  ? "relative opacity-100"
                  : "pointer-events-none absolute inset-0 translate-y-4 opacity-0",
              )}
            >
              {s.graphic ? (
                <>
                  <h1 className="sr-only">
                    {s.eyebrow} {s.label}. Ministering: {church_info.pastor}.
                  </h1>
                  <div className="flex justify-center">
                    <img
                      src={s.graphic}
                      alt=""
                      width={2856}
                      height={1396}
                      loading="eager"
                      fetchPriority="high"
                      className="block w-[118vw] max-w-none select-none object-contain drop-shadow-[0_16px_44px_rgba(0,0,0,0.35)] sm:w-[92vw] sm:max-w-[96rem] lg:max-h-[calc(100svh-17rem)]"
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.28em] text-white/80 sm:text-sm sm:tracking-[0.38em]">
                    {s.eyebrow}
                  </p>
                  <h1 className="hero-display mt-4 text-white sm:mt-6">
                    {s.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h1>
                  <div className="mt-6 sm:mt-8">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/75 sm:text-xs">
                      Ministering:
                    </p>
                    <p className="mt-1.5 text-sm font-extrabold uppercase tracking-[0.14em] text-white sm:text-lg">
                      {church_info.pastor}
                    </p>
                  </div>
                  <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/75 sm:text-[0.7rem] xl:hidden">
                    <span>{date.join(" ")}</span>
                    <span aria-hidden="true">•</span>
                    <span>{serviceTimes.join(" · ")}</span>
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Slide {i + 1} of {n}: {slides[i]?.label}
      </p>

      <div
        aria-hidden={i === 0}
        className={cn(
          "absolute left-20 top-1/2 z-10 hidden -translate-y-1/2 text-center transition-opacity duration-500 xl:block 2xl:left-24",
          i === 0 ? "opacity-0" : "opacity-100",
        )}
      >
        <p className="text-2xl font-black uppercase leading-[0.95] tracking-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)] 2xl:text-3xl">
          {date.map((part) => (
            <span key={part} className="block">
              {part}
            </span>
          ))}
        </p>
      </div>

      <div
        aria-hidden={i === 0}
        className={cn(
          "absolute right-20 top-1/2 z-10 hidden -translate-y-1/2 transition-opacity duration-500 xl:block 2xl:right-24",
          i === 0 ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="-rotate-2 bg-white/95 px-5 py-4 text-center shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
          <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.22em] text-[#b3261e]">
            Service Time
          </p>
          <div className="mt-2 space-y-0.5">
            {serviceTimes.map((time) => (
              <p
                key={time}
                className="text-xl font-black tracking-tight text-[#b3261e] 2xl:text-2xl"
              >
                {time}
              </p>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className={cn(arrowCls, "left-2 sm:left-4")}
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next slide"
        className={cn(arrowCls, "right-2 sm:right-4")}
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <div className="absolute inset-x-0 bottom-6 z-20 flex flex-wrap items-center justify-center gap-3 px-4 sm:bottom-8">
        <button onClick={() => openModal("prayer")} className={ctaCls}>
          Prayer Request
        </button>
        <button onClick={() => openModal("visit")} className={ctaCls}>
          Plan to Visit
        </button>
      </div>
    </section>
  );
}
