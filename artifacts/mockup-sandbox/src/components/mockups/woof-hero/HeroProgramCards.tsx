import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// WooF Dogs design tokens
const tokens = {
  bg: "hsl(0, 0%, 98%)",           // --background
  fg: "hsl(0, 0%, 15%)",           // --foreground
  primary: "hsl(0, 85%, 55%)",     // --primary  (red)
  primaryFg: "#fff",               // --primary-foreground
  muted: "hsl(0, 10%, 94%)",       // --muted
  mutedFg: "hsl(0, 0%, 45%)",      // --muted-foreground
  border: "hsl(0, 10%, 88%)",      // --border
  radius: "1rem",                  // --radius (16px)
  card: "#fff",                    // --card
};

// hsl(0,85%,55%) → approximate hex for inline use
const RED = "hsl(0,85%,55%)";

const programs = [
  {
    id: "obedience",
    tag: "All Ages",
    level: "Foundation",
    name: "Obedience\nTraining",
    description:
      "From basic commands to advanced voice control. In-home sessions or intensive Board & Train.",
    image: "/__mockup/images/obedience.png",
  },
  {
    id: "service",
    tag: "ADA Aligned",
    level: "Specialized",
    name: "Service\nAnimal",
    description:
      "Precision task training for emotional support, mobility, and psychiatric service roles.",
    image: "/__mockup/images/advanced.jpg",
  },
  {
    id: "puppy",
    tag: "8–16 Weeks",
    level: "For Puppies",
    name: "Puppy\nProgram",
    description:
      "Socialization, bite inhibition, crate training, and the building blocks of great behavior.",
    image: "/__mockup/images/puppy.webp",
  },
  {
    id: "aggression",
    tag: "All Levels",
    level: "Behavior",
    name: "Aggression\nManagement",
    description:
      "Psychology-based rehabilitation for reactivity, resource guarding, and complex cases.",
    image: "/__mockup/images/assessment.webp",
  },
  {
    id: "therapy",
    tag: "Certified Path",
    level: "Advanced",
    name: "Therapy\nDog Training",
    description:
      "Prepare your dog for therapy work in hospitals, schools, and care facilities.",
    image: "/__mockup/images/therapy.webp",
  },
];

function ProgramCard({ program }: { program: (typeof programs)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: 355,
        borderRadius: tokens.radius,
        overflow: "hidden",
        backgroundColor: tokens.fg,
        cursor: "pointer",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s",
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.18)"
          : "0 2px 16px rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top red accent bar */}
      <div
        style={{
          height: 3,
          width: "100%",
          backgroundColor: hovered ? RED : "rgba(255,255,255,0.12)",
          transition: "background-color 0.3s",
        }}
      />

      {/* Meta row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "19px 22px 0",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {/* Primary badge — uses brand red */}
          <span
            style={{
              backgroundColor: RED,
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              padding: "5px 13px",
              borderRadius: 999,
              letterSpacing: "0.01em",
            }}
          >
            {program.tag}
          </span>
          <span
            style={{
              backgroundColor: "rgba(255,255,255,0.10)",
              color: "rgba(255,255,255,0.65)",
              fontSize: 12,
              fontWeight: 600,
              padding: "5px 13px",
              borderRadius: 999,
            }}
          >
            {program.level}
          </span>
        </div>
        {/* Arrow icon */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: hovered ? RED : "rgba(255,255,255,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.25s",
          }}
        >
          <ArrowRight size={14} color="#fff" />
        </div>
      </div>

      {/* Program name */}
      <div style={{ padding: "17px 22px 0" }}>
        <h3
          style={{
            fontSize: 31,
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#fff",
            letterSpacing: "-0.025em",
            whiteSpace: "pre-line",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {program.name}
        </h3>
      </div>

      {/* Description */}
      <div style={{ padding: "12px 22px 0" }}>
        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.55,
            fontFamily: "Inter, sans-serif",
          }}
        >
          {program.description}
        </p>
      </div>

      {/* Photo */}
      <div
        style={{
          margin: "17px 22px 22px",
          borderRadius: "calc(1rem - 4px)",
          overflow: "hidden",
          flexShrink: 0,
          height: 240,
          position: "relative",
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
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        {/* Bottom gradient */}
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
            bottom: 12,
            left: 12,
            display: "flex",
            alignItems: "center",
            gap: 5,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(5px)",
            transition: "opacity 0.28s, transform 0.28s",
          }}
        >
          <span
            style={{
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.01em",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Learn More
          </span>
          <ArrowRight size={12} color="#fff" />
        </div>
      </div>
    </div>
  );
}

export function HeroProgramCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 375 * 2 : -375 * 2, behavior: "smooth" });
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
        backgroundColor: tokens.bg,
        fontFamily: "Inter, -apple-system, sans-serif",
        padding: "60px 48px 64px",
        boxSizing: "border-box",
      }}
    >
      {/* Eyebrow */}
      <p
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: RED,
          marginBottom: 16,
        }}
      >
        South Florida's Premier Dog Training
      </p>

      {/* Headline + arrows */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 36,
          gap: 24,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              color: tokens.fg,
              margin: 0,
            }}
          >
            Comprehensive Dog
            <br />
            Training for Everyone
          </h1>
          <p
            style={{
              marginTop: 14,
              fontSize: 16,
              color: tokens.mutedFg,
              fontWeight: 400,
              lineHeight: 1.5,
              maxWidth: 520,
            }}
          >
            With 30+ years of combined experience, we specialize in balanced
            training and service dog programs across Palm Beach County.
          </p>
        </div>

        {/* Nav arrows */}
        <div style={{ display: "flex", gap: 10, flexShrink: 0, paddingBottom: 4 }}>
          <button
            onClick={() => scroll("left")}
            disabled={atStart}
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              border: `1.5px solid ${atStart ? tokens.border : tokens.fg}`,
              backgroundColor: atStart ? tokens.muted : tokens.fg,
              color: atStart ? tokens.mutedFg : "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: atStart ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            <ArrowLeft size={17} />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={atEnd}
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              border: "none",
              backgroundColor: atEnd ? tokens.muted : RED,
              color: atEnd ? tokens.mutedFg : "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: atEnd ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display: "flex",
          gap: 20,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingBottom: 4,
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
  );
}
