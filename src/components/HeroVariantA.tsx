import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { HeroBookEvalButton } from "@/components/landing/HeroBookEvalButton";
import trainersImageImport from "@/assets/trainers.webp";
import obedienceBgImg from "@/assets/obedience-bg.png";
import puppyTrainingBgImg from "@/assets/puppy-training-bg.webp";
import behavioralAssessmentBgImg from "@/assets/behavioral-assessment-bg.webp";

type HeroImage = string | StaticImageData;
const trainersImage: HeroImage = trainersImageImport;
const obedienceBg: HeroImage = obedienceBgImg;
const puppyTrainingBg: HeroImage = puppyTrainingBgImg;
const behavioralAssessmentBg: HeroImage = behavioralAssessmentBgImg;

function HeroVariantA() {
  const features = [
    {
      title: "Obedience Training",
      titleLines: ["Obedience", "Training"],
      blurb:
        "From basic commands to advanced control, obedience builds the foundation for confidence, trust, and reliable communication.",
      bgColor: "white",
      backgroundImage: obedienceBg,
      imageOpacity: "opacity-100" as const,
      overlayGradient: "linear-gradient(110deg, rgba(18, 10, 4, 0.94) 0%, rgba(28, 18, 8, 0.88) 30%, rgba(50, 32, 15, 0.78) 45%, rgba(95, 65, 35, 0.40) 65%, rgba(140, 100, 60, 0.10) 80%, transparent 95%)",
      invertText: true as const,
      trainingOptions: ["In-Home Training", "Board & Train"],
      path: "/obedience",
    },
    {
      title: "Evaluation",
      blurb:
        "Start with a professional evaluation of your dog's temperament, habits, and needs. Our lead trainer designs a personalized plan. Every program begins here.",
      bgColor: "hsl(var(--muted))",
      backgroundImage: behavioralAssessmentBg,
      backgroundPosition: "right top",
      path: "/behavioral-assessment",
    },
    {
      title: "Puppy Training",
      blurb:
        "Early learning shapes lifelong habits. Teaching focus, boundaries, and social manners in a safe, nurturing way.",
      bgColor: "white",
      backgroundImage: puppyTrainingBg,
      imageOpacity: "opacity-100" as const,
      overlayGradient: "linear-gradient(135deg, rgba(50, 35, 14, 0.90) 0%, rgba(70, 50, 20, 0.70) 50%, rgba(100, 75, 35, 0.20) 100%)",
      invertText: true as const,
      path: "/puppy-training",
    },
    {
      title: "Service Animal Training",
      blurb:
        "Tailored programs preparing dogs to support, guide, and respond with precision. Aligned to ADA-compliant standards.",
      bgColor: "hsl(var(--muted))",
      path: "/service-animal-training",
    },
    {
      title: "Aggression Management",
      blurb:
        "Behavioral rehabilitation grounded in psychology, structure, and calm leadership. Transforming stress into stability.",
      bgColor: "white",
      path: "/aggression-management",
    },
  ];

  const spans = [
    "md:col-span-4 md:row-span-2",
    "md:col-span-2 md:row-span-1",
    "md:col-span-2 md:row-span-1",
    "md:col-span-3 md:row-span-1",
    "md:col-span-3 md:row-span-1",
  ];

  return (
    <div className="relative min-h-screen w-full bg-white text-neutral-900 transition-colors duration-500 dark:bg-black dark:text-white">
      <div className="absolute inset-0 -z-30 overflow-hidden">
        <div
          className="absolute inset-0 [--aurora-base:#ffffff] [--aurora-accent:rgba(148,163,184,0.15)] dark:[--aurora-base:#040404] dark:[--aurora-accent:rgba(59,130,246,0.15)]"
          style={{
            background:
              "radial-gradient(ellipse 55% 100% at 12% 0%, var(--aurora-accent), transparent 65%), radial-gradient(ellipse 40% 80% at 88% 0%, rgba(148,163,184,0.1), transparent 70%), var(--aurora-base)",
          }}
        />
        <div
          className="absolute inset-0 [--grid-color:rgba(17,17,17,0.08)] dark:[--grid-color:rgba(255,255,255,0.06)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage:
              "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)",
            WebkitMaskImage:
              "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
            opacity: 0.9,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 [--edge-color:rgba(255,255,255,1)] dark:[--edge-color:rgba(0,0,0,1)]"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0) 55%, var(--edge-color) 100%)",
            filter: "blur(40px)",
            opacity: 0.75,
          }}
        />
      </div>

      <section className="relative container  pt-12 pb-0  md:py-12 lg:py-16">
        <header className="mb-4 md:mb-10 flex flex-col gap-4 md:gap-6 border-b pb-4 md:pb-6 transition-colors duration-500 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary w-fit" data-testid="text-section-label">
              We Speak Your Dog&apos;s Language
            </span>
            <h1
              className="text-4xl sm:text-5xl md:text-[48px] lg:text-[48px] font-bold tracking-tighter"
              data-testid="text-hero-heading"
            >
              Expert Dog Training in Boca Raton, West Palm Beach &amp; Nearby
            </h1>
            <p
              className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground tracking-tight"
              data-testid="text-hero-subheadline"
            >
              Obedience, Service Dogs and Aggression Management
            </p>

            <div className="mt-3 md:mt-6">
              <HeroBookEvalButton />
            </div>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="max-w-sm text-muted-foreground md:text-lg" data-testid="text-hero-description">
              With 30+ years of combined experience, we specialize in balanced training and service dog programs that build a happy, obedient companion.
            </p>
          </div>
        </header>

        {/* Mobile: Single-column Stack */}
        <div className="md:hidden flex flex-col gap-2 pb-4">
          {features.map((feature, index) => (
            <MobileServiceCard
              key={feature.title}
              feature={feature}
              index={index}
              spanFull={false}
            />
          ))}
        </div>

        {/* Desktop: Bento Grid */}
        <div className="hidden md:grid md:auto-rows-[minmax(160px,auto)] md:grid-cols-6 gap-3">
          {features.map((feature, index) => (
            <BentoItem
              key={feature.title}
              span={spans[index]}
              feature={feature}
              index={index}
            />
          ))}
        </div>

      </section>
    </div>
  );
}

function MobileServiceCard({
  feature,
  index,
  spanFull = false,
}: {
  feature: { title: string; blurb: string; bgColor?: string; backgroundImage?: HeroImage; backgroundPosition?: string; imageOpacity?: string; overlayGradient?: string; invertText?: boolean; trainingOptions?: string[]; path?: string };
  index: number;
  spanFull?: boolean;
}) {
  const { title, blurb, bgColor, backgroundImage, backgroundPosition, imageOpacity, overlayGradient, invertText, trainingOptions, path } = feature;
  const isRedBg = bgColor?.includes("--primary");
  const lightText = invertText || isRedBg;

  return (
    <Link
      href={path || "#"}
      className={`group relative overflow-hidden rounded-2xl p-4 shadow-sm transition-all duration-300 ease-out active:scale-[0.98] ${spanFull ? "col-span-2 min-h-[200px]" : "min-h-[160px]"}`}
      style={{ backgroundColor: bgColor || "hsl(var(--card))" }}
      data-testid={`mobile-card-${index}`}
    >
      {/* Background image layer */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            loading="lazy"
            sizes="280px"
            className={`object-cover ${imageOpacity ?? "opacity-20"}`}
            style={{ objectPosition: backgroundPosition || "center" }}
          />
          {overlayGradient ? (
            <div className="absolute inset-0" style={{ background: overlayGradient }} />
          ) : index === 0 ? (
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, hsl(var(--card)) 20%, hsl(var(--card)/0.6) 60%, transparent 100%)" }}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, hsl(var(--card)/0.95) 0%, hsl(var(--card)/0.6) 55%, hsl(var(--card)/0.25) 100%)" }}
            />
          )}
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full justify-between gap-3">
        <div className="flex flex-col gap-2">
          <h3
            className={`text-2xl font-bold leading-tight ${lightText ? "text-white drop-shadow-sm" : "text-foreground"}`}
            data-testid={`mobile-card-title-${index}`}
          >
            {title}
          </h3>
          <p className={`text-sm leading-relaxed line-clamp-3 ${lightText ? "text-white/90 drop-shadow-sm" : "text-foreground/80"}`}>
            {blurb}
          </p>
          {trainingOptions && trainingOptions.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {trainingOptions.map((option) => (
                <span
                  key={option}
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    lightText
                      ? "bg-white/15 text-white ring-1 ring-inset ring-white/30"
                      : "bg-foreground/5 text-foreground ring-1 ring-inset ring-foreground/15"
                  }`}
                >
                  {option}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className={`flex items-center gap-1.5 text-sm font-semibold transition-transform duration-300 group-active:translate-x-1 ${lightText ? "text-white drop-shadow-sm" : "text-primary"}`}>
          <span>Explore {title}</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

function BentoItem({
  feature,
  span = "",
  index = 0,
}: {
  feature: { title: string; titleLines?: string[]; blurb: string; bgColor?: string; backgroundImage?: HeroImage; backgroundPosition?: string; imageOpacity?: string; overlayGradient?: string; invertText?: boolean; trainingOptions?: string[]; path?: string };
  span?: string;
  index?: number;
}) {
  const { title, titleLines, blurb, bgColor, backgroundImage, backgroundPosition, imageOpacity, overlayGradient, invertText, trainingOptions, path } = feature;

  const isRedBg = bgColor?.includes("--primary");
  const lightText = invertText || isRedBg;

  return (
    <Link
      href={path || "#"}
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl motion-reduce:hover:translate-y-0 ${span}`}
      style={{
        backgroundColor: bgColor || "hsl(var(--card))",
      }}
      data-testid={`card-feature-${index}`}
    >
      {/* Background image layer */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : "lazy"}
            sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${imageOpacity ?? (index === 0 ? "opacity-100" : "opacity-20")}`}
            style={{
              objectPosition: backgroundPosition || "center",
            }}
          />
          {/* Gradient overlay for readability */}
          {overlayGradient ? (
            /* Custom diagonal overlay */
            <div className="absolute inset-0" style={{ background: overlayGradient }} />
          ) : index === 0 ? (
            /* Large card: solid on left, fades to transparent revealing image on right */
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, hsl(var(--card)) 30%, hsl(var(--card) / 0.85) 50%, hsl(var(--card) / 0.3) 70%, transparent 100%)",
              }}
            />
          ) : (
            /* Small cards: subtle gradient from bottom for text clarity */
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, hsl(var(--card) / 0.95) 0%, hsl(var(--card) / 0.7) 50%, hsl(var(--card) / 0.3) 100%)",
              }}
            />
          )}
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col gap-4">
        <div className="flex flex-col items-start gap-3">
          <header className="flex items-center justify-between w-full">
            <h3
              className={`font-bold text-left leading-[1.05] ${index === 0 ? "text-5xl lg:text-6xl tracking-tight" : "text-4xl"} ${lightText ? "text-white drop-shadow-sm" : "text-foreground"}`}
              data-testid={`text-feature-title-${index}`}
            >
              {titleLines ? (
                titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))
              ) : (
                title
              )}
            </h3>
          </header>
          <p
            className={`leading-relaxed text-left ${index === 0 ? "text-lg lg:text-xl max-w-[55%]" : "text-base"} ${lightText ? "text-white/95 drop-shadow-sm" : "text-foreground/80"}`}
            data-testid={`text-feature-description-${index}`}
          >
            {blurb}
          </p>
          {trainingOptions && trainingOptions.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1" data-testid={`training-options-${index}`}>
              {trainingOptions.map((option) => (
                <span
                  key={option}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${
                    lightText
                      ? "bg-white/15 text-white ring-1 ring-inset ring-white/30"
                      : "bg-foreground/5 text-foreground ring-1 ring-inset ring-foreground/15"
                  }`}
                  data-testid={`training-option-${index}-${option}`}
                >
                  {option}
                </span>
              ))}
            </div>
          )}
        </div>
        <div
          className={`flex items-center gap-2 text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1 ${
            index === 0 ? "mt-auto" : ""
          } ${lightText ? "text-white drop-shadow-sm" : "text-primary"}`}
        >
          <span>Explore {title}</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className={`absolute inset-0 rounded-xl md:rounded-2xl border transition-colors duration-500 ${isRedBg ? "border-white/20" : "border-neutral-900/10 dark:border-white/10"}`}
          style={{
            maskImage:
              "radial-gradient(220px_220px_at_var(--x,50%)_var(--y,50%), black, transparent)",
            WebkitMaskImage:
              "radial-gradient(220px_220px_at_var(--x,50%)_var(--y,50%), black, transparent)",
          }}
        />
      </div>
    </Link>
  );
}

export default HeroVariantA;
