import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
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

export function SectionTitle({
  eyebrow,
  title,
  light,
  center,
}: {
  eyebrow?: string;
  title: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={cn("mb-10", center && "text-center")}>
      {eyebrow && (
        <p className={cn("eyebrow mb-3", light ? "text-gold" : "text-burgundy")}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          "text-4xl font-semibold md:text-5xl",
          light ? "text-deep-foreground" : "text-deep",
        )}
      >
        {title}
      </h2>
      <span className={cn("gold-rule mt-4", center && "mx-auto")} />
    </div>
  );
}

export function PageBanner({
  title,
  subtitle,
  background,
}: {
  title: string;
  subtitle: string;
  background?: string;
}) {
  return (
    <section
      className={cn(
        "bg-pattern relative overflow-hidden bg-deep pb-20 pt-28 text-deep-foreground md:pb-28 md:pt-36",
        background && "flex min-h-[56vh] items-center md:min-h-[60vh]",
      )}
    >
      {background && <ParallaxBackground src={background} />}
      <div className="relative z-10 mx-auto max-w-6xl px-5 text-center">
        <p className="eyebrow mb-3 text-gold">{subtitle}</p>
        <h1 className="text-5xl font-semibold md:text-6xl">{title}</h1>
        <span className="gold-rule mx-auto mt-5" />
      </div>
    </section>
  );
}

/**
 * Banner background that drifts slower than the page (parallax).
 * The image layer is oversized and shifted on scroll with rAF throttling,
 * so it stays smooth on mobile where `background-attachment: fixed` is ignored.
 */
function ParallaxBackground({ src }: { src: string }) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const host = layer?.parentElement?.parentElement;
    if (!layer || !host) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduce.matches) {
        layer.style.transform = "";
        return;
      }
      const rect = host.getBoundingClientRect();
      // move the photo at ~25% of the scroll speed
      const shift = (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.25;
      layer.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div ref={layerRef} className="absolute inset-x-0 -top-[15%] h-[130%] will-change-transform">
        <img src={src} alt="" className="h-full w-full object-cover object-[center_30%]" />
      </div>
      {/* deep-green tint + gradient keep the white type crisp over the photo */}
      <div className="absolute inset-0 bg-deep/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-deep/75 via-deep/55 to-deep" />
      {/* soft scrim right behind the heading */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_50%_50%,var(--deep),transparent_75%)] opacity-70" />
      {/* brand cross pattern, kept above the photo */}
      <div className="bg-pattern absolute inset-0 opacity-25" />
    </div>
  );
}

export function ImagePlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        "brand-img bg-pattern relative flex items-center justify-center bg-gradient-to-br from-primary to-deep",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="h-20 w-20 text-gold/40" fill="currentColor" aria-hidden>
        <path d="M10 2h4v6h6v4h-6v10h-4V12H4V8h6z" />
      </svg>
      <span className="absolute bottom-3 rounded-full bg-deep/80 px-3 py-1 text-xs text-gold">
        {label}
      </span>
    </div>
  );
}
