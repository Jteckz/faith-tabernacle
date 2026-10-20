import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { images, church_info } from "@/lib/site";
import { useRequestModal } from "./RequestModal";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
] as const;

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

  const linkCls =
    "relative py-2 text-sm font-medium text-deep after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100";

  return (
    <header className={cn("sticky top-0 z-40 bg-background/95 backdrop-blur transition-shadow", scrolled && "shadow-soft")}>
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img src={images.logo} alt="EAGT logo" width={52} height={56} className="h-14 w-auto shrink-0" />
          <span className="min-w-0">
            <span className="block truncate font-display text-2xl font-bold leading-none text-deep">{church_info.short}</span>
            <span className="mt-1 hidden truncate text-xs text-muted-foreground sm:block">{church_info.full}</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className={linkCls} activeProps={{ className: "after:scale-x-100" }} activeOptions={{ exact: true }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <button onClick={() => openModal("prayer")} className="rounded-full border-2 border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground">
              Prayer Request
            </button>
            <button onClick={() => openModal("visit")} className="rounded-full bg-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground transition hover:-translate-y-0.5 hover:shadow-lift">
              Plan to Visit
            </button>
          </div>
          <button onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} className="flex items-center gap-2 text-sm font-semibold text-deep lg:hidden">
            <Menu className="h-6 w-6" /> MENU
          </button>
        </div>
      </div>

      {/* Mobile slide-in panel */}
      <div className={cn("fixed inset-0 z-50 bg-deep/60 transition-opacity lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")} onClick={() => setOpen(false)} aria-hidden={!open}>
        <aside
          onClick={(e) => e.stopPropagation()}
          className={cn("bg-pattern absolute right-0 top-0 flex h-full w-80 max-w-[85%] flex-col bg-deep p-6 text-deep-foreground transition-transform duration-300", open ? "translate-x-0" : "translate-x-full")}
        >
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="self-end">
            <X className="h-7 w-7" />
          </button>
          <nav aria-label="Mobile" className="mt-8 flex flex-col gap-2">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b border-deep-foreground/10 py-3 font-display text-2xl" activeProps={{ className: "text-gold" }} activeOptions={{ exact: true }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <button onClick={() => { setOpen(false); openModal("visit"); }} className="rounded-full bg-gold py-3 font-semibold text-gold-foreground">Plan to Visit</button>
            <button onClick={() => { setOpen(false); openModal("prayer"); }} className="rounded-full border-2 border-gold py-3 font-semibold text-gold">Prayer Request</button>
          </div>
        </aside>
      </div>
    </header>
  );
}
