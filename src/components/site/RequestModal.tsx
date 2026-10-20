import { createContext, useContext, useState, type ReactNode, type FormEvent } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { submitForm } from "@/lib/site";
import { CheckCircle2 } from "lucide-react";

type Kind = "prayer" | "visit";
const Ctx = createContext<(k: Kind) => void>(() => {});
export const useRequestModal = () => useContext(Ctx);

export const fieldCls =
  "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-gold/50";

export function RequestModalProvider({ children }: { children: ReactNode }) {
  const [kind, setKind] = useState<Kind | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const open = (k: Kind) => {
    setDone(false);
    setError("");
    setKind(k);
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!data.name?.trim() || !/^[+\d\s-]{9,}$/.test(data.phone ?? "")) {
      setError("Please enter your name and a valid phone number.");
      return;
    }
    if (kind === "prayer" && !data.message?.trim()) return setError("Please share your prayer request.");
    if (kind === "visit" && !data.date) return setError("Please choose a preferred date.");
    setBusy(true);
    try {
      await submitForm(kind!, data);
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const prayer = kind === "prayer";
  return (
    <Ctx.Provider value={open}>
      {children}
      <Dialog open={kind !== null} onOpenChange={(o) => !o && setKind(null)}>
        <DialogContent className="max-w-md border-t-4 border-t-gold">
          {done ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
              <h3 className="mt-4 text-3xl font-semibold text-deep">Thank you!</h3>
              <p className="mt-2 text-muted-foreground">
                {prayer ? "We have received your request and will be praying with you." : "We can't wait to welcome you. See you soon!"}
              </p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-3xl text-deep">{prayer ? "Prayer Request" : "Plan to Visit"}</DialogTitle>
                <DialogDescription>{prayer ? "Share your need — our prayer team will stand with you." : "Let us know when you're coming so we can welcome you."}</DialogDescription>
              </DialogHeader>
              <form onSubmit={onSubmit} noValidate className="space-y-3">
                <input name="name" placeholder="Full name" aria-label="Full name" className={fieldCls} />
                <input name="phone" type="tel" placeholder="Phone number" aria-label="Phone number" className={fieldCls} />
                {!prayer && <input name="date" type="date" aria-label="Preferred date" className={fieldCls} />}
                <textarea name="message" rows={4} placeholder={prayer ? "Your prayer request" : "Anything we should know? (optional)"} aria-label="Message" className={fieldCls} />
                {error && <p role="alert" className="text-sm text-burgundy">{error}</p>}
                <button disabled={busy} className="w-full rounded-full bg-gold px-6 py-3 font-semibold text-gold-foreground transition hover:-translate-y-0.5 hover:shadow-lift disabled:opacity-60">
                  {busy ? "Sending…" : "Send"}
                </button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}
