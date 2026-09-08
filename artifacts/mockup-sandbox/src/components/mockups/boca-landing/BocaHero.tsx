import './_group.css';
import { ArrowRight, MapPin, Phone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ─── Service data ─────────────────────────────────────────────────────────────
const services = [
  {
    id: "obedience",
    title: "Obedience Training",
    titleLines: ["Obedience", "Training"],
    blurb: "From sit and stay to full off-leash control. In-home sessions across Boca Raton or immersive Board & Train at our Loxahatchee facility.",
    image: "/__mockup/images/obedience.png",
    overlayGradient: "linear-gradient(110deg, rgba(18,10,4,0.93) 0%, rgba(28,18,8,0.86) 30%, rgba(50,32,15,0.72) 48%, rgba(95,65,35,0.32) 68%, transparent 90%)",
    lightText: true,
    options: ["In-Home Training", "Board & Train"],
    path: "/obedience",
  },
  {
    id: "evaluation",
    title: "Evaluation",
    blurb: "Start with a professional assessment of your dog's temperament and training needs. Every WooF Dogs program begins with a personalised evaluation.",
    image: "/__mockup/images/assessment.webp",
    imageOpacity: "opacity-20" as const,
    lightText: false,
    path: "/behavioral-assessment",
    bg: "hsl(var(--muted))",
  },
  {
    id: "puppy",
    title: "Puppy Training",
    blurb: "Early learning shapes lifelong habits. Potty training, bite inhibition, socialization, and crate training from 8 weeks old.",
    image: "/__mockup/images/puppy.webp",
    overlayGradient: "linear-gradient(135deg, rgba(50,35,14,0.88) 0%, rgba(70,50,20,0.65) 52%, rgba(100,75,35,0.16) 100%)",
    lightText: true,
    path: "/puppy-training",
  },
  {
    id: "service",
    title: "Service Animal Training",
    blurb: "ADA-aligned task training for emotional support, mobility, and psychiatric service roles. Boca Raton's trusted service dog specialists.",
    lightText: false,
    bg: "hsl(var(--muted))",
    path: "/service-animal-training",
  },
  {
    id: "aggression",
    title: "Aggression Management",
    blurb: "Behavioural rehabilitation for reactive, fearful, or aggressive dogs. Psychology-based methods, calm leadership, real results.",
    lightText: false,
    path: "/aggression-management",
  },
];

// Grid span classes — same pattern as homepage HeroVariantA
const spans = [
  "md:col-span-4 md:row-span-2",
  "md:col-span-2 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-3 md:row-span-1",
  "md:col-span-3 md:row-span-1",
];

// ─── Bento card ───────────────────────────────────────────────────────────────
function BentoCard({
  svc,
  span,
  isBig,
}: {
  svc: (typeof services)[0];
  span: string;
  isBig?: boolean;
}) {
  return (
    <a
      href={svc.path || "#"}
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border p-6 shadow-sm",
        "transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl motion-reduce:hover:translate-y-0",
        span,
      )}
      style={{ backgroundColor: svc.bg ?? "hsl(var(--card))" }}
    >
      {/* Photo layer */}
      {svc.image && (
        <div className="absolute inset-0">
          <img
            src={svc.image}
            alt=""
            className={cn(
              "h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105",
              svc.imageOpacity ?? "opacity-100",
            )}
          />
          {svc.overlayGradient ? (
            <div className="absolute inset-0" style={{ background: svc.overlayGradient }} />
          ) : isBig ? (
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, hsl(var(--card)) 30%, hsl(var(--card) / 0.85) 50%, hsl(var(--card) / 0.3) 70%, transparent 100%)" }}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, hsl(var(--card) / 0.95) 0%, hsl(var(--card) / 0.7) 50%, hsl(var(--card) / 0.3) 100%)" }}
            />
          )}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col gap-4">
        <div className="flex flex-col items-start gap-3">
          <h3
            className={cn(
              "font-bold text-left leading-[1.05]",
              isBig ? "text-5xl lg:text-6xl tracking-tight" : "text-4xl",
              svc.lightText ? "text-white drop-shadow-sm" : "text-foreground",
            )}
          >
            {isBig && svc.titleLines
              ? svc.titleLines.map((line) => <span key={line} className="block">{line}</span>)
              : svc.title}
          </h3>
          <p
            className={cn(
              "leading-relaxed text-left",
              isBig ? "text-lg lg:text-xl max-w-[55%]" : "text-base",
              svc.lightText ? "text-white/95 drop-shadow-sm" : "text-foreground/80",
            )}
          >
            {svc.blurb}
          </p>
          {svc.options && (
            <div className="flex flex-wrap gap-2 pt-1">
              {svc.options.map((opt) => (
                <span
                  key={opt}
                  className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm",
                    svc.lightText
                      ? "bg-white/15 text-white ring-1 ring-inset ring-white/30"
                      : "bg-foreground/5 text-foreground ring-1 ring-inset ring-foreground/15",
                  )}
                >
                  {opt}
                </span>
              ))}
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex items-center gap-2 text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1",
            isBig ? "mt-auto" : "",
            svc.lightText ? "text-white drop-shadow-sm" : "text-primary",
          )}
        >
          <span>Explore {svc.title}</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </a>
  );
}

// ─── Mobile card (stacked view) ───────────────────────────────────────────────
function MobileCard({ svc }: { svc: (typeof services)[0] }) {
  return (
    <a
      href={svc.path || "#"}
      className="group relative overflow-hidden rounded-2xl p-4 shadow-sm transition-all duration-300 ease-out min-h-[160px] flex flex-col justify-between"
      style={{ backgroundColor: svc.bg ?? "hsl(var(--card))" }}
    >
      {svc.image && (
        <div className="absolute inset-0">
          <img
            src={svc.image}
            alt=""
            className={cn("w-full h-full object-cover object-top", svc.imageOpacity ?? "opacity-20")}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, hsl(var(--card)/0.95) 0%, hsl(var(--card)/0.6) 55%, hsl(var(--card)/0.25) 100%)" }}
          />
        </div>
      )}
      <div className="relative z-10 flex flex-col gap-2">
        <h3 className={cn("text-2xl font-bold leading-tight", svc.lightText ? "text-white drop-shadow-sm" : "text-foreground")}>
          {svc.title}
        </h3>
        <p className={cn("text-sm leading-relaxed line-clamp-3", svc.lightText ? "text-white/90" : "text-foreground/80")}>
          {svc.blurb}
        </p>
      </div>
      <div className={cn("relative z-10 flex items-center gap-1.5 text-sm font-semibold mt-2", svc.lightText ? "text-white" : "text-primary")}>
        <span>Explore {svc.title}</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </a>
  );
}

// ─── Main hero ────────────────────────────────────────────────────────────────
export function BocaHero() {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground">

      {/* Aurora gradient — complex CSS, inline only */}
      <div
        aria-hidden
        className="absolute inset-0 -z-30 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 55% 100% at 12% 0%, rgba(148,163,184,0.15), transparent 65%), radial-gradient(ellipse 40% 80% at 88% 0%, rgba(148,163,184,0.10), transparent 70%), hsl(var(--background))",
        }}
      />

      {/* Dot grid — complex mask, inline only */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(17,17,17,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.07) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          maskImage:
            "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)",
          WebkitMaskImage:
            "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
          opacity: 0.9,
        }}
      />

      {/* Edge vignette — inline only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(circle at center, rgba(0,0,0,0) 55%, hsl(var(--background)) 100%)",
          filter: "blur(40px)",
          opacity: 0.75,
        }}
      />

      {/* ── Section ── */}
      <section className="relative container pt-12 pb-0 md:py-12 lg:py-16">

        {/* ── Split header ── */}
        <header className="mb-4 md:mb-10 flex flex-col gap-4 md:gap-6 border-b border-border pb-4 md:pb-6 transition-colors duration-500 md:flex-row md:items-start md:justify-between">

          {/* Left: eyebrow → h1 → subheadline → CTAs */}
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary w-fit">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              Dog Training · Boca Raton, FL
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-[52px] font-bold tracking-tighter leading-[1.02]">
              Expert Dog Training
              <br />
              in <span className="text-primary">Boca Raton</span>
            </h1>

            <p className="text-xl sm:text-2xl font-medium text-muted-foreground tracking-tight">
              Obedience · Puppy Training · Service Animals · Aggression
            </p>

            <div className="mt-3 md:mt-6 flex flex-wrap gap-3">
              <Button size="lg" className="text-base sm:text-lg px-8 h-14">
                Book Your Evaluation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-8 h-14" asChild>
                <a href="tel:+15615944111">
                  <Phone className="mr-2 h-5 w-5" />
                  (561) 594-4111
                </a>
              </Button>
            </div>
          </div>

          {/* Right: stars → trust copy → credential badges */}
          <div className="flex flex-col items-start gap-4 md:items-end">
            {/* Star rating */}
            <div className="flex flex-col gap-1 md:items-end">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
                <span className="ml-1.5 text-sm font-bold text-foreground">5.0</span>
              </div>
              <p className="text-sm text-muted-foreground">
                150+ Google Reviews · Trusted by Boca families since 2010
              </p>
            </div>

            {/* Trust copy */}
            <p className="max-w-sm text-muted-foreground md:text-base md:text-right">
              With 30+ years of combined experience, our certified trainers serve East Boca, West Boca, Boca West communities, and all surrounding neighborhoods — in your home or at our facility.
            </p>

            {/* Credential badges — matching TrainersSection style */}
            <div className="flex flex-wrap gap-2 md:justify-end">
              {["APDT Member", "IACP Member", "30+ Yrs Experience", "In-Home Available"].map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 text-sm font-medium shadow-sm"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ── Bento grid (desktop) ── */}
        <div className="hidden md:grid md:auto-rows-[minmax(160px,auto)] md:grid-cols-6 gap-3">
          {services.map((svc, i) => (
            <BentoCard key={svc.id} svc={svc} span={spans[i]} isBig={i === 0} />
          ))}
        </div>

        {/* ── Mobile stack ── */}
        <div className="flex flex-col gap-2 pb-4 md:hidden">
          {services.map((svc) => (
            <MobileCard key={svc.id} svc={svc} />
          ))}
        </div>

      </section>
    </div>
  );
}
