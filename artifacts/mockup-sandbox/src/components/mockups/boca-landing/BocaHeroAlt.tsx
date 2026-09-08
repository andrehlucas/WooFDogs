import './_group.css';
import { useState } from 'react';
import { ArrowRight, Check, MapPin, Phone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ─── Problems owners self-identify with ──────────────────────────────────────
const problems = [
  { id: "pulling",    label: "Pulling & lunging on walks" },
  { id: "barking",    label: "Barking at everything" },
  { id: "jumping",    label: "Jumping on guests" },
  { id: "recall",     label: "Won't come when called" },
  { id: "reactive",   label: "Reactive to other dogs" },
  { id: "alone",      label: "Destructive when alone" },
  { id: "counter",    label: "Counter-surfing & door dashing" },
  { id: "aggression", label: "Aggression or snapping" },
  { id: "fear",       label: "Fear & nervousness" },
];

// ─── Problem chip ─────────────────────────────────────────────────────────────
function Chip({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex items-center gap-2.5 w-full rounded-xl px-4 py-3.5 text-left text-sm font-medium",
        "border transition-all duration-200 cursor-pointer select-none",
        "hover:shadow-sm active:scale-[0.98]",
        checked
          ? "bg-primary border-primary text-primary-foreground shadow-sm"
          : "bg-background border-border text-foreground hover:border-primary/40 hover:bg-primary/5",
      )}
    >
      {/* Checkbox circle */}
      <span
        className={cn(
          "flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150",
          checked
            ? "border-white/80 bg-white/20"
            : "border-border",
        )}
      >
        {checked && <Check className="h-3 w-3 stroke-[3]" />}
      </span>
      {label}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function BocaHeroAlt() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const count = selected.size;
  const hasSelection = count > 0;

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden">

      {/* Subtle warm tint in top-right corner — different visual signature from BocaHero */}
      <div
        aria-hidden
        className="absolute top-0 right-0 -z-10 h-[60%] w-[45%] opacity-30"
        style={{
          background: "radial-gradient(ellipse at top right, hsl(var(--primary) / 0.12), transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-12 pt-14 pb-0 flex flex-col">

        {/* ── Top: question + eyebrow ── */}
        <div className="mb-10">
          {/* Location eyebrow */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-5">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            Dog Training · Boca Raton, FL
          </span>

          {/* H1 — question format, speaks to the owner's frustration */}
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter leading-[1.02] mb-4">
            Does your dog make
            <br />
            <span className="text-primary">Boca Raton</span> walks stressful?
          </h1>

          <p className="text-lg text-muted-foreground font-medium">
            Check everything that sounds familiar — we'll show you how we can help.
          </p>
        </div>

        {/* ── Problem chip grid ── */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {problems.map((p) => (
            <Chip
              key={p.id}
              label={p.label}
              checked={selected.has(p.id)}
              onToggle={() => toggle(p.id)}
            />
          ))}
        </div>

        {/* Selection count nudge */}
        <div className="flex items-center gap-2 mb-6 min-h-[24px]">
          {hasSelection ? (
            <>
              <span className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold w-6 h-6">
                {count}
              </span>
              <span className="text-sm font-medium text-foreground">
                {count === 1 ? "problem identified" : "problems identified"}
                {" "}— our trainers have seen this hundreds of times.
              </span>
            </>
          ) : (
            <span className="text-sm text-muted-foreground">
              Select the behaviors you're dealing with above
            </span>
          )}
        </div>

        {/* ── CTA block ── */}
        <div
          className={cn(
            "rounded-2xl border p-7 transition-all duration-300",
            hasSelection
              ? "bg-foreground border-foreground text-background"
              : "bg-muted/40 border-border",
          )}
        >
          <div className="flex items-start justify-between gap-10">
            {/* Left: proof + CTA */}
            <div className="flex-1">
              {/* Stars */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      hasSelection
                        ? "fill-white text-white"
                        : "fill-primary text-primary",
                    )}
                  />
                ))}
                <span className={cn("ml-1.5 text-sm font-bold", hasSelection ? "text-white/90" : "text-foreground")}>
                  150+ Boca families helped
                </span>
              </div>

              <p
                className={cn(
                  "text-xl font-semibold tracking-tight mb-5",
                  hasSelection ? "text-white" : "text-foreground",
                )}
              >
                {hasSelection
                  ? `We've solved ${count === 1 ? "this" : "all of these"} for hundreds of Boca Raton dogs.`
                  : "WooF Dogs has trained 150+ Boca Raton families."}
              </p>

              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className={cn(
                    "text-base px-8 h-14 transition-all",
                    hasSelection
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "",
                  )}
                  variant={hasSelection ? "default" : "default"}
                >
                  {hasSelection ? "Book Your Free Evaluation" : "Book Your Evaluation"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={cn(
                    "text-base px-8 h-14",
                    hasSelection
                      ? "border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-white"
                      : "",
                  )}
                  asChild
                >
                  <a href="tel:+15615944111">
                    <Phone className="mr-2 h-5 w-5" />
                    (561) 594-4111
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: trainer credibility */}
            <div
              className={cn(
                "flex-shrink-0 max-w-[220px] text-right",
                hasSelection ? "text-white/70" : "text-muted-foreground",
              )}
            >
              <p className={cn("text-sm font-semibold mb-1", hasSelection ? "text-white/90" : "text-foreground")}>
                Lead Trainer: Shay Maimoni
              </p>
              <p className="text-sm leading-relaxed">
                30+ years · Military K9 · Police training · Certified APDT & IACP
              </p>
              <p className={cn("text-xs mt-2 font-medium", hasSelection ? "text-white/60" : "text-muted-foreground/70")}>
                In-home training available throughout Boca Raton
              </p>
            </div>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="h-10" />
      </div>
    </div>
  );
}
