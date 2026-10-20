import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";
import { PageBanner, Reveal, SectionTitle } from "@/components/site/Reveal";
import { fieldCls } from "@/components/site/RequestModal";
import { Socials } from "@/components/site/SiteFooter";
import { church_info, images, services, submitForm } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — EAGT Sinza" },
      { name: "description", content: "Get in touch with EAGT Sinza in Dar es Salaam: address, phone, email, service times and map." },
      { property: "og:title", content: "Contact Us — EAGT Sinza" },
      { property: "og:description", content: "Visit or reach out to EAGT Sinza." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!d.name?.trim()) return setError("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(d.email ?? "")) return setError("Please enter a valid email.");
    if (!d.message?.trim()) return setError("Please write a message.");
    setError("");
    setBusy(true);
    try {
      await submitForm("contact", d);
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const cards = [
    { Icon: MapPin, title: "Address", lines: [church_info.address] },
    { Icon: Phone, title: "Phone", lines: [church_info.phone] },
    { Icon: Mail, title: "Email", lines: [church_info.email] },
    { Icon: Clock, title: "Service Times", lines: services.map((s) => `${s.name}: ${s.day} ${s.time}`) },
  ];

  return (
    <>
      <PageBanner title="Contact Us" subtitle="We'd love to hear from you" />

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2">
          <Reveal>
            <SectionTitle eyebrow="Get in touch" title="Reach out to us" />
            <div className="grid gap-4 sm:grid-cols-2">
              {cards.map(({ Icon, title, lines }) => (
                <div key={title} className="rounded-xl bg-deep p-6 text-deep-foreground shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
                  <Icon className="h-6 w-6 text-gold" />
                  <h3 className="mt-3 text-xl font-semibold text-gold">{title}</h3>
                  {lines.map((l) => <p key={l} className="mt-1 text-sm text-deep-foreground/85">{l}</p>)}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <p className="eyebrow mb-3 text-burgundy">Follow us</p>
              <div className="inline-block rounded-full bg-deep p-2"><Socials /></div>
            </div>
          </Reveal>

          <Reveal className="rounded-2xl border-t-4 border-gold bg-card p-8 shadow-lift">
            {done ? (
              <div className="py-16 text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
                <h3 className="mt-4 text-3xl font-semibold text-deep">Message sent!</h3>
                <p className="mt-2 text-muted-foreground">Thank you for reaching out. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <h3 className="text-3xl font-semibold text-deep">Send us a message</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="name" placeholder="Full name" aria-label="Full name" className={fieldCls} />
                  <input name="email" type="email" placeholder="Email" aria-label="Email" className={fieldCls} />
                  <input name="phone" type="tel" placeholder="Phone" aria-label="Phone" className={fieldCls} />
                  <input name="subject" placeholder="Subject" aria-label="Subject" className={fieldCls} />
                </div>
                <textarea name="message" rows={6} placeholder="Your message" aria-label="Message" className={fieldCls} />
                {error && <p role="alert" className="text-sm text-burgundy">{error}</p>}
                <button disabled={busy} className="rounded-full bg-gold px-8 py-3.5 font-semibold text-gold-foreground transition hover:-translate-y-0.5 hover:shadow-lift disabled:opacity-60">
                  {busy ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-2">
          <Reveal>
            {/* REPLACE: contact page photo */}
            <img src={images.contact} alt="EAGT Sinza church building" loading="lazy" width={1600} height={1008} className="brand-img h-full min-h-80 w-full" />
          </Reveal>
          <Reveal>
            {/* REPLACE: map — paste your Google Maps embed URL into church_info.mapEmbed */}
            <iframe title="Map to EAGT Sinza" src={church_info.mapEmbed} loading="lazy" className="brand-img h-full min-h-80 w-full" referrerPolicy="no-referrer-when-downgrade" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
