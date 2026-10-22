import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { images, church_info } from "@/lib/site";
import { useRequestModal } from "./RequestModal";
import { cn } from "@/lib/utils";

/**
 * Reference-style menu (Living Faith Church Worldwide layout).
 * Add new sections here as their routes are created — e.g.
 *   { to: "/media", hash: undefined, exact: false, label: "Media Center" }
 */
const nav = [
  { to: "/", hash: undefined, exact: true, label: "Home" },
  { to: "/about", hash: undefined, exact: false, label: "About Us" },
  { to: "/", hash: "ministries", exact: false, label: "Ministries" },
  { to: "/contact", hash: undefined, exact: false, label: "Contact Us" },
] as const;

/** TanStack's `hash` prop only accepts `true` or an updater, and exactOptionalPropertyTypes forbids `undefined`. */
const hashProps = (hash: string | undefined) => (hash ? { hash: () => hash } : {});

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const openModal = useRequestModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Keep the page behind the mobile panel from scrolling.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkCls =
    "relative py-2 text-[13px] font-bold uppercase tracking-[0.14em] text-white/90 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:text-white hover:after:scale-x-100";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-deep/95 shadow-soft backdrop-blur-md"
          : "bg-gradient-to-b from-black/70 via-black/30 to-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:h-24 sm:px-8 lg:px-10">
        {/* Brand — the logo artwork has an opaque white background, so it is
            presented as a white badge to read cleanly over the dark hero. */}
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="flex shrink-0 overflow-hidden rounded-xl bg-white shadow-soft">
            <img
              src={images.logo}
              alt="EAGT logo"
              width={217}
              height={217}
              className="h-12 w-auto sm:h-14"
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-xl font-bold uppercase leading-none tracking-wide text-white sm:text-2xl">
              {church_info.short}
            </span>
            <span className="mt-1.5 hidden truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:block">
              {church_info.full}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-5 lg:gap-7">
          {/* Navigation */}
          <nav aria-label="Main" className="hidden items-center gap-6 lg:flex xl:gap-8">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                {...hashProps(n.hash)}
                className={linkCls}
                activeOptions={{ exact: n.exact }}
                activeProps={{ className: n.hash ? "" : "text-white after:scale-x-100" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Calls to action */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => openModal("prayer")}
              className="rounded-full border-[1.5px] border-white/80 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-deep"
            >
              Prayer Request
            </button>
            <button
              onClick={() => openModal("visit")}
              className="rounded-full bg-gold px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-gold-foreground transition hover:bg-gold/90 hover:shadow-lift"
            >
              Plan to Visit
            </button>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white lg:hidden"
          >
            <Menu className="h-6 w-6" /> Menu
          </button>
        </div>
      </div>

      {/* Mobile slide-in panel */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-deep/70 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <aside
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "bg-pattern absolute right-0 top-0 flex h-full w-80 max-w-[85%] flex-col bg-deep p-6 text-deep-foreground transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="self-end">
            <X className="h-7 w-7" />
          </button>
          <nav aria-label="Mobile" className="mt-8 flex flex-col gap-2">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                {...hashProps(n.hash)}
                onClick={() => setOpen(false)}
                className="border-b border-deep-foreground/10 py-3 text-sm font-bold uppercase tracking-[0.16em] text-deep-foreground transition-colors hover:text-gold"
                activeProps={{ className: "text-gold" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => {
                setOpen(false);
                openModal("visit");
              }}
              className="rounded-full bg-gold py-3 text-sm font-bold uppercase tracking-[0.12em] text-gold-foreground transition hover:bg-gold/90"
            >
              Plan to Visit
            </button>
            <button
              onClick={() => {
                setOpen(false);
                openModal("prayer");
              }}
              className="rounded-full border-[1.5px] border-gold py-3 text-sm font-bold uppercase tracking-[0.12em] text-gold transition hover:bg-gold hover:text-gold-foreground"
            >
              Prayer Request
            </button>
          </div>
        </aside>
      </div>
    </header>
  );
}
