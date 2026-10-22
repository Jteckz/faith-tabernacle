/**
 * SITE CONFIG — every replaceable piece of content lives here.
 * REPLACE: swap any image by changing its import below (same file name works too:
 * overwrite src/assets/hero-1.jpg etc. and styling is applied automatically).
 */
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import church from "@/assets/church.jpg";
import logo from "@/assets/eagt-logo.png";

export const images = {
  logo,
  hero: [hero1, hero2, hero3],
  pastor: null as string | null, // REPLACE: pastor photo (import it and set here)
  history: church, // REPLACE: church history photo
  contact: church, // REPLACE: contact page photo
};

export const church_info = {
  short: "EAGT – SINZA",
  full: "Evangelistic Assemblies of God Tanzania",
  pastor: "Pastor Chubwa Vitus",
  address: "Sinza, Dar es Salaam, Tanzania", // REPLACE: full street address
  phone: "+255 700 000 000", // REPLACE: phone
  email: "info@eagtsinza.org", // REPLACE: email
  // REPLACE: paste your Google Maps embed URL (Maps → Share → Embed a map → copy src)
  mapEmbed: "https://www.google.com/maps?q=Sinza,+Dar+es+Salaam&output=embed",
  socials: { facebook: "#", instagram: "#", youtube: "#" }, // REPLACE: social links
};

// REPLACE: service times
export const services = [
  { name: "Sunday School", day: "Sunday", time: "8:00 AM – 9:00 AM" },
  { name: "Sunday Service", day: "Sunday", time: "9:30 AM – 12:30 PM" },
  { name: "Midweek Prayer", day: "Wednesday", time: "5:30 PM – 7:30 PM" },
];

/** Plug a real form endpoint here (e.g. Formspree URL). Empty = demo mode. */
export const FORM_ENDPOINT = "";

export async function submitForm(kind: string, data: Record<string, string>) {
  if (!FORM_ENDPOINT) {
    await new Promise((r) => setTimeout(r, 600));
    return;
  }
  const res = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ kind, ...data }),
  });
  if (!res.ok) throw new Error("Failed to send");
}
