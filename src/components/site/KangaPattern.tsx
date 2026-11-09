import { useId } from "react";

/**
 * Faint kanga/kitenge-inspired geometric tile (gold linework).
 * Render at ~5–8% opacity over a solid brand band; safe to use more than once
 * per page (ids are generated per instance).
 */
export function KangaPattern({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full opacity-[0.07] ${className ?? ""}`}
    >
      <defs>
        <pattern id={`kanga-${id}`} width="132" height="132" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#E5BE36" strokeWidth="2">
            <rect x="4" y="4" width="124" height="124" strokeDasharray="7 9" />
            <path d="M66 16 116 66 66 116 16 66Z" />
            <path d="M66 40 92 66 66 92 40 66Z" />
            <circle cx="66" cy="66" r="6" fill="#E5BE36" stroke="none" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#kanga-${id})`} />
    </svg>
  );
}
