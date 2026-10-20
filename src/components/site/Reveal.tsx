import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={cn("reveal", className)}>
      {children}
    </Tag>
  );
}

export function SectionTitle({ eyebrow, title, light, center }: { eyebrow?: string; title: string; light?: boolean; center?: boolean }) {
  return (
    <div className={cn("mb-10", center && "text-center")}>
      {eyebrow && <p className={cn("eyebrow mb-3", light ? "text-gold" : "text-burgundy")}>{eyebrow}</p>}
      <h2 className={cn("text-4xl font-semibold md:text-5xl", light ? "text-deep-foreground" : "text-deep")}>{title}</h2>
      <span className={cn("gold-rule mt-4", center && "mx-auto")} />
    </div>
  );
}

export function PageBanner({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-pattern relative overflow-hidden bg-deep py-20 text-deep-foreground md:py-28">
      <div className="mx-auto max-w-6xl px-5 text-center">
        <p className="eyebrow mb-3 text-gold">{subtitle}</p>
        <h1 className="text-5xl font-semibold md:text-6xl">{title}</h1>
        <span className="gold-rule mx-auto mt-5" />
      </div>
    </section>
  );
}

export function ImagePlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("brand-img bg-pattern relative flex items-center justify-center bg-gradient-to-br from-primary to-deep", className)}>
      <svg viewBox="0 0 24 24" className="h-20 w-20 text-gold/40" fill="currentColor" aria-hidden>
        <path d="M10 2h4v6h6v4h-6v10h-4V12H4V8h6z" />
      </svg>
      <span className="absolute bottom-3 rounded-full bg-deep/80 px-3 py-1 text-xs text-gold">{label}</span>
    </div>
  );
}
