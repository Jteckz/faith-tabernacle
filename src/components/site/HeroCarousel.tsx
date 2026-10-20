import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { images } from "@/lib/site";
import { useRequestModal } from "./RequestModal";
import { cn } from "@/lib/utils";

type Action = { label: string; kind: "visit" | "prayer" | "about" | "contact"; primary?: boolean };
// REPLACE: slide text; images come from images.hero in src/lib/site.ts
const slides: { title: string; sub: string; actions: Action[] }[] = [
  { title: "Join Our Every Sunday School & Services", sub: "A warm family of faith in Sinza — come grow, learn and worship with us.", actions: [{ label: "Plan to Visit", kind: "visit", primary: true }, { label: "Learn More", kind: "about" }] },
  { title: "Prayers and Deliverance", sub: "Bring your burdens. We believe in a God who hears, heals and sets free.", actions: [{ label: "Prayer Request", kind: "prayer", primary: true }] },
  { title: "Praise and Worship", sub: "Lift your voice with us in joyful, Spirit-filled worship every Sunday.", actions: [{ label: "Join Us", kind: "contact", primary: true }] },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef<number | null>(null);
  const openModal = useRequestModal();
  const n = slides.length;
  const go = useCallback((d: number) => setI((p) => (p + d + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [paused, go, i]);

  const btn = (a: Action) => {
    const cls = cn(
      "rounded-full px-7 py-3.5 font-semibold transition hover:-translate-y-0.5",
      a.primary ? "bg-gold text-gold-foreground hover:shadow-lift" : "border-2 border-deep-foreground/80 text-deep-foreground hover:border-gold hover:text-gold",
    );
    if (a.kind === "visit" || a.kind === "prayer") return <button key={a.label} onClick={() => openModal(a.kind as "visit")} className={cls}>{a.label}</button>;
    return <Link key={a.label} to={a.kind === "about" ? "/about" : "/contact"} className={cls}>{a.label}</Link>;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative h-[85vh] min-h-[520px] overflow-hidden bg-deep"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => { if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); }}
      onTouchStart={(e) => (touch.current = e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = (e.changedTouches[0]?.clientX ?? touch.current) - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      {slides.map((s, idx) => (
        <div key={s.title} className={cn("absolute inset-0 transition-opacity duration-1000", idx === i ? "opacity-100" : "pointer-events-none opacity-0")} aria-hidden={idx !== i}>
          <img src={images.hero[idx]} alt="" width={1920} height={912} loading={idx === 0 ? "eager" : "lazy"} fetchPriority={idx === 0 ? "high" : "auto"} className="hero-img absolute inset-0 h-full w-full object-cover object-right" />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 md:px-20">
            <div className={cn("max-w-2xl transition-all duration-1000", idx === i ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0")}>
              <span className="mb-5 block h-1 w-16 rounded bg-burgundy" />
              <h1 className="text-4xl font-bold uppercase leading-[1.05] text-deep-foreground sm:text-5xl lg:text-7xl">{s.title}</h1>
              <p className="mt-5 max-w-lg text-lg text-deep-foreground/90">{s.sub}</p>
              <div className="mt-8 flex flex-wrap gap-3">{s.actions.map(btn)}</div>
            </div>
          </div>
        </div>
      ))}

      <button onClick={() => go(-1)} aria-label="Previous slide" className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-deep-foreground/40 text-deep-foreground transition hover:bg-gold hover:text-gold-foreground md:grid">
        <ChevronLeft />
      </button>
      <button onClick={() => go(1)} aria-label="Next slide" className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-deep-foreground/40 text-deep-foreground transition hover:bg-gold hover:text-gold-foreground md:grid">
        <ChevronRight />
      </button>
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, idx) => (
          <button key={s.title} onClick={() => setI(idx)} aria-label={`Go to slide ${idx + 1}`} aria-current={idx === i} className={cn("h-2.5 rounded-full transition-all", idx === i ? "w-8 bg-gold" : "w-2.5 bg-deep-foreground/60")} />
        ))}
      </div>
    </section>
  );
}
