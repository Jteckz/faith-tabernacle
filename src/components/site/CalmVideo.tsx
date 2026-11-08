/**
 * Poster + calm-motion video layer shared by the Home heroes.
 * - The poster renders first and doubles as the fallback when playback is
 *   unavailable or intentionally skipped.
 * - Playback is slowed to 0.75× (browsers reset the rate when autoplay
 *   starts, so it is re-applied on every ratechange).
 * - People with prefers-reduced-motion or Save-Data enabled simply get the
 *   still poster — no autoplay.
 */
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const HERO_POSTER = "/heroVideo-poster.webp";
export const HERO_VIDEO = "/heroVideo-web.mp4";

const CALM_RATE = 0.75;

export function CalmVideo({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [skipVideo, setSkipVideo] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || skipVideo) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    if (reduce || saveData) {
      setSkipVideo(true);
      return;
    }
    const slow = () => {
      if (v.defaultPlaybackRate !== CALM_RATE) v.defaultPlaybackRate = CALM_RATE;
      if (v.playbackRate !== CALM_RATE) v.playbackRate = CALM_RATE;
    };
    slow();
    for (const event of ["loadedmetadata", "canplay", "play", "ratechange"] as const) {
      v.addEventListener(event, slow);
    }
    // If autoplay is blocked, the poster simply stays visible.
    v.play().catch(() => undefined);
    return () => {
      for (const event of ["loadedmetadata", "canplay", "play", "ratechange"] as const) {
        v.removeEventListener(event, slow);
      }
    };
  }, [skipVideo]);

  if (skipVideo) return null;
  return (
    <video
      ref={videoRef}
      src={HERO_VIDEO}
      poster={HERO_POSTER}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      className={cn(className, "pointer-events-none motion-reduce:hidden")}
    />
  );
}
