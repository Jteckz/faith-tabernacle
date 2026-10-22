import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { images, church_info, services } from "@/lib/site";

export function Socials({ className = "" }: { className?: string }) {
  const items = [
    { href: church_info.socials.facebook, Icon: Facebook, label: "Facebook" },
    { href: church_info.socials.instagram, Icon: Instagram, label: "Instagram" },
    { href: church_info.socials.youtube, Icon: Youtube, label: "YouTube" },
  ];
  return (
    <div className={`flex gap-3 ${className}`}>
      {items.map(({ href, Icon, label }) => (
        <a key={label} href={href} aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold transition hover:bg-burgundy hover:text-burgundy-foreground">
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-deep text-deep-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-background p-1.5">
              <img
                src={images.logo}
                alt="EAGT logo"
                width={217}
                height={217}
                className="h-12 w-auto"
                loading="lazy"
              />
            </span>
            <span className="font-display text-2xl font-bold">{church_info.short}</span>
          </div>
          <p className="mt-4 text-sm text-deep-foreground/75">{church_info.full}. A family of believers in Sinza, Dar es Salaam.</p>
          <Socials className="mt-5" />
        </div>
        <div>
          <h3 className="font-display text-xl text-gold">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-xl text-gold">Service Times</h3>
          <ul className="mt-4 space-y-2 text-sm text-deep-foreground/85">
            {services.map((s) => (
              <li key={s.name}><span className="font-semibold">{s.name}</span> — {s.day}, {s.time}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-xl text-gold">Visit Us</h3>
          <ul className="mt-4 space-y-3 text-sm text-deep-foreground/85">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-gold" />{church_info.address}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-gold" />{church_info.phone}</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-gold" />{church_info.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-deep-foreground/10 py-5 text-center text-xs text-deep-foreground/60">
        © {new Date().getFullYear()} EAGT Sinza. All rights reserved.
      </div>
    </footer>
  );
}
