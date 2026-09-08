import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
  {
    icon: "🐾",
    title: "Private Training",
    blurb: "One-on-one coaching at your home, tailored to your dog's specific behaviors.",
    meta: "Custom",
  },
  {
    icon: "🏠",
    title: "Board & Train",
    blurb: "Full immersion over 2 to 4 weeks. Your dog lives and trains with us.",
    meta: "Immersive",
  },
  {
    icon: "🐶",
    title: "Puppy Program",
    blurb: "Socialization, bite inhibition, and essential commands from day one.",
    meta: "Foundation",
  },
  {
    icon: "🦮",
    title: "Leash Reactivity",
    blurb: "Science-based protocol to end pulling and lunging past dogs and distractions.",
    meta: "Behavior",
  },
  {
    icon: "🎯",
    title: "Off-Leash Freedom",
    blurb: "Voice command reliability and advanced control in any real-world environment.",
    meta: "Advanced",
  },
  {
    icon: "👥",
    title: "Group Classes",
    blurb: "Structured 6-week courses. Small groups, big results in socialization and obedience.",
    meta: "Social",
  },
  {
    icon: "🛡️",
    title: "Aggression Management",
    blurb: "Behavioral rehab grounded in psychology, structure, and calm leadership.",
    meta: "Expertise",
  },
  {
    icon: "🌟",
    title: "Service Animal Training",
    blurb: "Tailored programs preparing dogs to support and guide. ADA-aligned standards.",
    meta: "Purpose",
  },
];

const duplicated = [...programs, ...programs];

const stats = [
  { value: "500+", label: "Dogs Trained" },
  { value: "10+", label: "Yrs in South Florida" },
  { value: "98%", label: "Client Satisfaction" },
];

function ProgramCard({ program }: { program: (typeof programs)[0] }) {
  return (
    <div className="flex-shrink-0 w-56 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg group">
      <div className="text-2xl mb-3">{program.icon}</div>
      <div className="inline-block rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-semibold mb-2">
        {program.meta}
      </div>
      <h3 className="text-neutral-900 font-bold text-sm mb-1.5">{program.title}</h3>
      <p className="text-neutral-500 text-xs leading-relaxed">{program.blurb}</p>
      <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary transition-transform duration-300 group-hover:translate-x-0.5">
        <span>Learn more</span>
        <ArrowRight className="h-3 w-3" />
      </div>
    </div>
  );
}

function ScrollingCarousel() {
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
  const cardWidth = 240; // 224px + 16px gap

  useEffect(() => {
    const totalWidth = cardWidth * programs.length;
    const animate = () => {
      if (!isHovered) {
        posRef.current -= 0.45;
        if (posRef.current <= -totalWidth) posRef.current = 0;
        x.set(posRef.current);
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isHovered, x]);

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div style={{ x }} className="flex gap-4">
        {duplicated.map((p, i) => (
          <ProgramCard key={i} program={p} />
        ))}
      </motion.div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.10 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export function WoofHero() {
  return (
    <div className="relative min-h-screen w-full bg-white text-neutral-900 overflow-hidden flex flex-col">
      {/* Background: subtle dot grid + radial aurora – mirrors HeroVariantA */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 80% at 10% 0%, hsla(0,85%,55%,0.07), transparent 65%), radial-gradient(ellipse 40% 60% at 90% 10%, hsla(0,60%,70%,0.05), transparent 70%), #ffffff",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(17,17,17,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.06) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            maskImage:
              "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)",
            WebkitMaskImage:
              "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(0,0,0,0) 55%, rgba(255,255,255,1) 100%)",
            filter: "blur(40px)",
            opacity: 0.7,
          }}
        />
      </div>

      {/* Hero content */}
      <div className="flex-1 flex flex-col justify-center px-8 pt-10 pb-8 max-w-6xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="border-b border-neutral-200 pb-8 mb-10 flex flex-col md:flex-row md:items-start md:justify-between gap-8"
        >
          {/* Left: headline + CTA */}
          <div className="flex flex-col gap-3 max-w-xl">
            <motion.div variants={fadeIn}>
              <span className="inline-block rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium">
                We Speak Your Dog's Language
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-black tracking-tighter leading-[1.05] text-neutral-900"
            >
              Expert Dog Training in{" "}
              <span className="text-primary">South Florida</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl sm:text-2xl font-medium text-neutral-500 tracking-tight"
            >
              Obedience, Behavior & Service Dogs in Palm Beach County
            </motion.p>

            <motion.div variants={fadeUp} className="mt-2 flex flex-wrap gap-3">
              <Button size="lg">
                Book a Free Evaluation
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                See All Programs
              </Button>
            </motion.div>
          </div>

          {/* Right: description + stats */}
          <div className="flex flex-col gap-5 max-w-sm">
            <motion.p variants={fadeUp} className="text-neutral-500 leading-relaxed">
              Serving all of Palm Beach County including Boca Raton, Delray Beach,
              Wellington, and Loxahatchee with over 30 years of combined experience.
              Balanced, effective training that builds a happy, obedient companion.
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-primary">{s.value}</div>
                  <div className="text-neutral-400 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Program carousel */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Training Programs
            </p>
            <a href="#" className="text-sm font-semibold text-primary transition-colors hover:opacity-80">
              View all →
            </a>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <ScrollingCarousel />
          </div>
        </motion.div>
      </div>

    </div>
  );
}
