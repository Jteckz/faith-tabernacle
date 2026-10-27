import { useEffect, useRef } from "react";
import { useRequestModal } from "./RequestModal";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const openModal = useRequestModal();

  // Slow the background video for a calmer hero, and hold the poster when the
  // visitor prefers reduced motion. Browsers reset playbackRate when autoplay
  // begins, so the rate is also enforced on every `ratechange`.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    const RATE = 0.75;
    const slow = () => {
      if (v.defaultPlaybackRate !== RATE) v.defaultPlaybackRate = RATE;
      if (v.playbackRate !== RATE) v.playbackRate = RATE;
    };
    slow();
    v.addEventListener("loadedmetadata", slow);
    v.addEventListener("canplay", slow);
    v.addEventListener("play", slow);
    v.addEventListener("ratechange", slow);
    v.play().catch(() => {
      /* autoplay blocked — the poster remains visible */
    });
    return () => {
      v.removeEventListener("loadedmetadata", slow);
      v.removeEventListener("canplay", slow);
      v.removeEventListener("play", slow);
      v.removeEventListener("ratechange", slow);
    };
  }, []);

  const ctaCls =
    "rounded-md bg-[#e01b24] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(0,0,0,0.25)] transition hover:bg-[#c1141c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <section
      aria-labelledby="hero-title"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-deep"
    >
      <h1 id="hero-title" className="sr-only">
        EAGT – Sinza. Join us this Sunday for our Sunday School and Services.
      </h1>

      {/* Video hero — the poster frame stays visible until the video renders
          (and is the fallback if playback is unavailable). */}
      <img
        src="/heroVideo-poster.webp"
        alt=""
        width={1280}
        height={720}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <video
        ref={videoRef}
        src="/heroVideo-web.mp4"
        poster="/heroVideo-poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover object-center motion-reduce:hidden"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/5 to-slate-950/65" />

      {/* Full-width frosted strip with the two actions */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-deep/45 backdrop-blur-md backdrop-saturate-150">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2.5 px-5 py-3.5 sm:gap-3 sm:px-8 sm:py-4">
          <button onClick={() => openModal("prayer")} className={ctaCls}>
            Prayer Request
          </button>
          <button onClick={() => openModal("visit")} className={ctaCls}>
            Plan to Visit
          </button>
        </div>
      </div>
    </section>
  );
}
