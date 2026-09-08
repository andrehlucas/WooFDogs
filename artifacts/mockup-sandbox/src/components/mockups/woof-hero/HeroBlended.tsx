import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const RED    = "hsl(0,85%,55%)";
const FG     = "hsl(0,0%,15%)";
const MUTED  = "hsl(0,0%,46%)";
const BORDER = "hsl(0,10%,88%)";
const DARK   = "hsl(0,0%,13%)";   // card background (dark)

// ─── Program data ─────────────────────────────────────────────────────────────
const programs = [
  {
    id: "obedience",
    tag: "All Ages",
    level: "Foundation",
    name: "Obedience\nTraining",
    description: "From basic commands to advanced voice control. In-home sessions or intensive Board & Train.",
    image: "/__mockup/images/obedience.png",
  },
  {
    id: "service",
    tag: "ADA Aligned",
    level: "Specialized",
    name: "Service\nAnimal",
    description: "Precision task training for emotional support, mobility, and psychiatric service roles.",
    image: "/__mockup/images/advanced.jpg",
  },
  {
    id: "puppy",
    tag: "8–16 Weeks",
    level: "For Puppies",
    name: "Puppy\nProgram",
    description: "Socialization, bite inhibition, crate training, and the building blocks of great behavior.",
    image: "/__mockup/images/puppy.webp",
  },
  {
    id: "aggression",
    tag: "All Levels",
    level: "Behavior",
    name: "Aggression\nManagement",
    description: "Psychology-based rehabilitation for reactivity, resource guarding, and complex cases.",
    image: "/__mockup/images/assessment.webp",
  },
  {
    id: "therapy",
    tag: "Certified Path",
    level: "Advanced",
    name: "Therapy\nDog Training",
    description: "Prepare your dog for therapy work in hospitals, schools, and care facilities.",
    image: "/__mockup/images/therapy.webp",
  },
];

// ─── Program card ─────────────────────────────────────────────────────────────
function ProgramCard({ program }: { program: (typeof programs)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: 310,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: DARK,
        cursor: "pointer",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s",
        boxShadow: hovered
          ? "0 24px 64px rgba(0,0,0,0.28)"
          : "0 4px 24px rgba(0,0,0,0.14)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Red accent bar */}
      <div
        style={{
          height: 3,
          width: "100%",
          backgroundColor: hovered ? RED : "rgba(255,255,255,0.08)",
          transition: "background-color 0.3s",
        }}
      />

      {/* Meta row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 20px 0",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          <span
            style={{
              backgroundColor: RED,
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 999,
              letterSpacing: "0.01em",
            }}
          >
            {program.tag}
          </span>
          <span
            style={{
              backgroundColor: "rgba(255,255,255,0.09)",
              color: "rgba(255,255,255,0.55)",
              fontSize: 11,
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: 999,
            }}
          >
            {program.level}
          </span>
        </div>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: hovered ? RED : "rgba(255,255,255,0.09)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.25s",
          }}
        >
          <ArrowRight size={13} color="#fff" />
        </div>
      </div>

      {/* Program name */}
      <div style={{ padding: "14px 20px 0" }}>
        <h3
          style={{
            fontSize: 27,
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#fff",
            letterSpacing: "-0.025em",
            whiteSpace: "pre-line",
            fontFamily: "inherit",
            margin: 0,
          }}
        >
          {program.name}
        </h3>
      </div>

      {/* Description */}
      <div style={{ padding: "10px 20px 0" }}>
        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          {program.description}
        </p>
      </div>

      {/* Photo */}
      <div
        style={{
          margin: "16px 20px 20px",
          borderRadius: 12,
          overflow: "hidden",
          height: 210,
          position: "relative",
          flexShrink: 0,
        }}
      >
        <img
          src={program.image}
          alt={program.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)",
          }}
        />
        {/* "Learn More" pill on hover */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            display: "flex",
            alignItems: "center",
            gap: 4,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(5px)",
            transition: "opacity 0.28s, transform 0.28s",
          }}
        >
          <span style={{ color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.01em" }}>
            Learn More
          </span>
          <ArrowRight size={11} color="#fff" />
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function HeroBlended() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 340 * 2 : -340 * 2, behavior: "smooth" });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (el) setScrollPos(el.scrollLeft);
  };

  const atStart = scrollPos <= 10;
  const atEnd = scrollRef.current
    ? scrollPos >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
    : false;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        fontFamily: "Inter, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#fafafa",
        boxSizing: "border-box",
      }}
    >
      {/* ── Aurora background (from HeroVariantA) ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(ellipse 55% 100% at 12% 0%, rgba(148,163,184,0.18), transparent 65%), " +
            "radial-gradient(ellipse 40% 80% at 88% 0%, rgba(148,163,184,0.10), transparent 70%), " +
            "#fafafa",
        }}
      />

      {/* ── Dot grid (from HeroVariantA) ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(17,17,17,0.07) 1px, transparent 1px), " +
            "linear-gradient(to bottom, rgba(17,17,17,0.07) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          WebkitMaskImage:
            "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), " +
            "repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)",
          WebkitMaskComposite: "source-in",
          maskImage:
            "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), " +
            "repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)",
          maskComposite: "intersect",
          opacity: 0.85,
        }}
      />

      {/* ── Edge vignette ── */}
      <div
        aria-hidden
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0) 55%, rgba(250,250,250,1) 100%)",
          filter: "blur(40px)",
          opacity: 0.7,
        }}
      />

      {/* ── Content ── */}
      <div style={{ position: "relative", zIndex: 2, padding: "52px 56px 0" }}>

        {/* ── Header (split layout from HeroVariantA) ── */}
        <header
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 32,
            paddingBottom: 32,
            marginBottom: 36,
            borderBottom: `1px solid ${BORDER}`,
          }}
        >
          {/* Left: label + headline + subheadline + CTA */}
          <div style={{ flex: "0 0 auto", maxWidth: 580 }}>
            {/* Eyebrow */}
            <div
              style={{
                display: "inline-block",
                backgroundColor: `${RED}18`,
                color: RED,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "6px 14px",
                borderRadius: 999,
                marginBottom: 18,
              }}
            >
              We Speak Your Dog&apos;s Language
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: 52,
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                color: FG,
                margin: "0 0 10px",
              }}
            >
              Expert Dog Training
              <br />
              <span style={{ color: RED }}>South Florida</span>
            </h1>

            {/* Subheadline */}
            <p
              style={{
                fontSize: 19,
                fontWeight: 500,
                color: MUTED,
                letterSpacing: "-0.01em",
                margin: "0 0 24px",
                lineHeight: 1.35,
              }}
            >
              Obedience · Service Dogs · Aggression Management
            </p>

            {/* CTA button */}
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: RED,
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                padding: "13px 26px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.01em",
                boxShadow: "0 4px 20px rgba(220,38,38,0.30)",
              }}
            >
              Book Your Evaluation
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right: description + trust badges */}
          <div
            style={{
              flex: "0 0 auto",
              maxWidth: 340,
              paddingTop: 8,
              display: "flex",
              flexDirection: "column",
              gap: 20,
              alignItems: "flex-end",
            }}
          >
            <p
              style={{
                fontSize: 15,
                color: MUTED,
                lineHeight: 1.6,
                textAlign: "right",
                margin: 0,
              }}
            >
              With 30+ years of combined experience, we specialize in balanced training and service dog programs that build a happy, obedient companion across Palm Beach County.
            </p>

            {/* Trust line */}
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              {[
                { num: "30+", label: "Years Experience" },
                { num: "500+", label: "Families Helped" },
              ].map(({ num, label }) => (
                <div key={num} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: FG,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    {num}
                  </div>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 2, fontWeight: 500 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ── Program deck label + nav arrows ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: RED,
              margin: 0,
            }}
          >
            Training Programs
          </p>

          {/* Scroll arrows */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => scroll("left")}
              disabled={atStart}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: `1.5px solid ${atStart ? BORDER : FG}`,
                backgroundColor: atStart ? "#f5f5f5" : FG,
                color: atStart ? MUTED : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: atStart ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              <ArrowLeft size={15} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={atEnd}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "none",
                backgroundColor: atEnd ? "#f5f5f5" : RED,
                color: atEnd ? MUTED : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: atEnd ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* ── Scrollable cards ── */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            display: "flex",
            gap: 16,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            paddingBottom: 48,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {programs.map((p) => (
            <div key={p.id} style={{ scrollSnapAlign: "start" }}>
              <ProgramCard program={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
