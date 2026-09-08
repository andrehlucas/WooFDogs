import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const RED     = "hsl(0,85%,55%)";
const RED_DIM = "rgba(220,58,58,0.12)";
const FG      = "hsl(0,0%,15%)";
const MUTED   = "hsl(0,0%,46%)";
const BG      = "hsl(0,0%,98%)";
const BORDER  = "hsl(0,10%,88%)";
const MUTED_BG = "hsl(0,10%,94%)";

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
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: FG,
        cursor: "pointer",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        transition: "transform 0.38s cubic-bezier(0.22,1,0.36,1), box-shadow 0.38s",
        boxShadow: hovered
          ? "0 28px 72px rgba(0,0,0,0.22)"
          : "0 2px 12px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top accent bar — always visible at low opacity, red on hover */}
      <div
        style={{
          height: 3,
          width: "100%",
          background: hovered
            ? RED
            : `linear-gradient(to right, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)`,
          transition: "background 0.3s",
        }}
      />

      {/* Meta row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 22px 0",
        }}
      >
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span
            style={{
              backgroundColor: RED,
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: 999,
              letterSpacing: "0.02em",
            }}
          >
            {program.tag}
          </span>
          <span
            style={{
              backgroundColor: "rgba(255,255,255,0.13)",
              color: "rgba(255,255,255,0.72)",
              fontSize: 11,
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: 999,
              letterSpacing: "0.01em",
            }}
          >
            {program.level}
          </span>
        </div>

        {/* Arrow — gets a subtle ring + red fill on hover */}
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            border: `1.5px solid ${hovered ? RED : "rgba(255,255,255,0.18)"}`,
            backgroundColor: hovered ? RED : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.25s, border-color 0.25s",
            flexShrink: 0,
          }}
        >
          <ArrowRight size={14} color="#fff" />
        </div>
      </div>

      {/* Program name */}
      <div style={{ padding: "16px 22px 0" }}>
        <h3
          style={{
            fontSize: 30,
            fontWeight: 800,
            lineHeight: 1.08,
            color: "#fff",
            letterSpacing: "-0.03em",
            whiteSpace: "pre-line",
            fontFamily: "Inter, sans-serif",
            margin: 0,
          }}
        >
          {program.name}
        </h3>
      </div>

      {/* Description */}
      <div style={{ padding: "10px 22px 0" }}>
        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.48)",
            lineHeight: 1.6,
            fontFamily: "Inter, sans-serif",
            margin: 0,
          }}
        >
          {program.description}
        </p>
      </div>

      {/* Photo */}
      <div
        style={{
          margin: "18px 20px 20px",
          borderRadius: 12,
          overflow: "hidden",
          flexShrink: 0,
          height: 238,
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
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        {/* Deeper gradient for legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.12) 50%, transparent 100%)",
          }}
        />

        {/* "Learn More" — now with a semi-transparent pill bg */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            backgroundColor: "rgba(0,0,0,0.38)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            padding: "5px 10px",
            borderRadius: 999,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(4px)",
            transition: "opacity 0.25s, transform 0.25s",
          }}
        >
          <span
            style={{
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.02em",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Learn More
          </span>
          <ArrowRight size={11} color="#fff" />
        </div>
      </div>
    </div>
  );
}

export function HeroProgramCardsV2() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 375 * 2 : -375 * 2, behavior: "smooth" });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setScrollPos(el.scrollLeft);
    setScrollWidth(el.scrollWidth);
    setClientWidth(el.clientWidth);
  };

  const maxScroll = scrollWidth - clientWidth || 1;
  const progress = Math.min(scrollPos / maxScroll, 1);
  const atStart = scrollPos <= 10;
  const atEnd = scrollRef.current
    ? scrollPos >= scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
    : false;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: BG,
        fontFamily: "Inter, -apple-system, sans-serif",
        padding: "60px 48px 0",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Eyebrow pill */}
      <div
        style={{
          display: "inline-flex",
          alignSelf: "flex-start",
          alignItems: "center",
          gap: 6,
          backgroundColor: RED_DIM,
          color: RED,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          padding: "6px 14px",
          borderRadius: 999,
          marginBottom: 20,
        }}
      >
        South Florida&apos;s Premier Dog Training
      </div>

      {/* Headline row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 32,
          marginBottom: 40,
        }}
      >
        {/* Left: headline + sub */}
        <div style={{ flex: "1 1 auto", maxWidth: 580 }}>
          <h1
            style={{
              fontSize: "clamp(40px, 5vw, 62px)",
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              color: FG,
              margin: "0 0 14px",
            }}
          >
            Expert Dog Training,
            <br />
            <span style={{ color: RED }}>South Florida.</span>
          </h1>
          <p
            style={{
              fontSize: 16,
              color: MUTED,
              lineHeight: 1.55,
              margin: 0,
              maxWidth: 460,
            }}
          >
            With 30+ years of combined experience, we specialize in balanced
            training and service dog programs across Palm Beach County.
          </p>
        </div>

        {/* Right: CTA + arrows stacked */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 16,
            flexShrink: 0,
            paddingBottom: 4,
          }}
        >
          {/* CTA button */}
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: RED,
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              padding: "12px 22px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.01em",
              boxShadow: "0 4px 18px rgba(220,58,58,0.28)",
              whiteSpace: "nowrap",
            }}
          >
            Book Your Evaluation
            <ArrowRight size={15} />
          </button>

          {/* Nav arrows */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => scroll("left")}
              disabled={atStart}
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                border: `1.5px solid ${atStart ? BORDER : FG}`,
                backgroundColor: atStart ? MUTED_BG : FG,
                color: atStart ? MUTED : "#fff",
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
                backgroundColor: atEnd ? MUTED_BG : RED,
                color: atEnd ? MUTED : "#fff",
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
      </div>

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display: "flex",
          gap: 18,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingBottom: 52,
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

      {/* Scroll progress bar */}
      <div
        style={{
          position: "relative",
          height: 2,
          backgroundColor: BORDER,
          borderRadius: 999,
          margin: "0 0 32px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${progress * 100}%`,
            backgroundColor: RED,
            borderRadius: 999,
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
}
