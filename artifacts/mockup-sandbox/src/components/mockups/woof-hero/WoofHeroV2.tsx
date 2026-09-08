import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// V2 — Stronger visual hierarchy. Same structure, bigger headline, stats inline,
// right column replaced with a social-proof testimonial card.
// Cards get an accent left border instead of category badge.

const programs = [
  { icon: "🐾", title: "Private Training", blurb: "One-on-one sessions at your home, fully customized.", meta: "Custom" },
  { icon: "🏠", title: "Board & Train", blurb: "Full immersion over 2–4 weeks with our lead trainer.", meta: "Immersive" },
  { icon: "🐶", title: "Puppy Program", blurb: "Socialization, bite inhibition, and essential commands.", meta: "Foundation" },
  { icon: "🦮", title: "Leash Reactivity", blurb: "End pulling and lunging with our structured protocol.", meta: "Behavior" },
  { icon: "🎯", title: "Off-Leash Freedom", blurb: "Reliable voice commands in any real-world environment.", meta: "Advanced" },
  { icon: "👥", title: "Group Classes", blurb: "6-week courses. Small groups, proven results.", meta: "Social" },
  { icon: "🛡️", title: "Aggression Mgmt", blurb: "Behavioral rehab through psychology and calm leadership.", meta: "Expertise" },
  { icon: "🌟", title: "Service Dogs", blurb: "ADA-aligned programs for support and assistance roles.", meta: "Purpose" },
];

const duplicated = [...programs, ...programs];

const stats = [
  { value: "500+", label: "Dogs Trained" },
  { value: "10+", label: "Years Active" },
  { value: "98%", label: "Satisfaction" },
];

const reviews = [
  { name: "Maria T.", location: "Wellington, FL", text: "Our reactive German Shepherd is a completely different dog. The transformation is unreal." },
  { name: "James R.", location: "Boca Raton, FL", text: "Best investment we made for our family. The board & train program exceeded all expectations." },
];

function ProgramCard({ program }: { program: (typeof programs)[0] }) {
  return (
    <div className="flex-shrink-0 w-60 rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md group">
      <div className="h-1 w-full bg-primary/20 group-hover:bg-primary transition-colors duration-300" />
      <div className="p-5">
        <div className="text-2xl mb-3">{program.icon}</div>
        <h3 className="text-neutral-900 font-bold text-sm mb-1.5 leading-snug">{program.title}</h3>
        <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2">{program.blurb}</p>
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary transition-transform duration-200 group-hover:translate-x-1">
          <span>Explore</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
}

function ScrollingCarousel() {
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
  const cardWidth = 256;

  useEffect(() => {
    const totalWidth = cardWidth * programs.length;
    const animate = () => {
      if (!isHovered) {
        posRef.current -= 0.5;
        if (posRef.current <= -totalWidth) posRef.current = 0;
        x.set(posRef.current);
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isHovered, x]);

  return (
    <div className="overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <motion.div style={{ x }} className="flex gap-4">
        {duplicated.map((p, i) => <ProgramCard key={i} program={p} />)}
      </motion.div>
    </div>
  );
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
const fadeUp = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.45 } } };

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex gap-0.5 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
        ))}
      </div>
      <p className="text-neutral-700 text-xs leading-relaxed mb-3 italic">"{review.text}"</p>
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
          {review.name[0]}
        </div>
        <div>
          <p className="text-neutral-900 text-xs font-semibold leading-none">{review.name}</p>
          <p className="text-neutral-400 text-xs">{review.location}</p>
        </div>
      </div>
    </div>
  );
}

export function WoofHeroV2() {
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveReview((p) => (p + 1) % reviews.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-white text-neutral-900 overflow-hidden flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 75% at 5% 0%, hsla(0,85%,55%,0.08), transparent 60%), radial-gradient(ellipse 40% 60% at 95% 0%, hsla(0,60%,70%,0.04), transparent 65%), #fff" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, rgba(17,17,17,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.05) 1px, transparent 1px)", backgroundSize: "20px 20px", maskImage: "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)", WebkitMaskImage: "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)", maskComposite: "intersect", WebkitMaskComposite: "source-in" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, transparent 55%, rgba(255,255,255,0.9) 100%)", filter: "blur(40px)", opacity: 0.6 }} />
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 pt-8 pb-6 max-w-6xl mx-auto w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="border-b border-neutral-200 pb-8 mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-10"
        >
          {/* Left — Bigger headline, inline stats */}
          <div className="flex flex-col gap-3 max-w-xl">
            <motion.div variants={fadeIn}>
              <span className="inline-block rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium">
                We Speak Your Dog's Language
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-[52px] font-black tracking-tighter leading-[1.02] text-neutral-900">
              Expert Dog Training<br />
              in <span className="text-primary">South Florida</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl font-medium text-neutral-500 tracking-tight">
              Obedience, Behavior & Service Dogs — Palm Beach County
            </motion.p>

            <motion.div variants={fadeUp} className="mt-1 flex flex-wrap gap-3 items-center">
              <Button size="lg" className="rounded-full px-7">
                Book a Free Evaluation
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-7">
                See All Programs
              </Button>
            </motion.div>

            {/* Stats inline — horizontal strip */}
            <motion.div variants={fadeUp} className="mt-2 flex items-center gap-0 divide-x divide-neutral-200">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col pr-6 first:pl-0 pl-6">
                  <span className="text-xl font-black text-primary tabular-nums">{s.value}</span>
                  <span className="text-neutral-400 text-xs">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Rotating testimonials */}
          <motion.div variants={fadeUp} className="flex flex-col gap-3 max-w-xs w-full self-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">
              What clients say
            </p>
            <div className="relative min-h-[120px]">
              {reviews.map((r, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{ opacity: activeReview === i ? 1 : 0, y: activeReview === i ? 0 : 6 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className={`${activeReview === i ? "relative" : "absolute inset-0"}`}
                >
                  <ReviewCard review={r} />
                </motion.div>
              ))}
            </div>
            <div className="flex gap-1.5 mt-1">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveReview(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${activeReview === i ? "w-6 bg-primary" : "w-1.5 bg-neutral-200"}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 whitespace-nowrap">
              Training Programs
            </p>
            <a href="#" className="text-sm font-semibold text-primary hover:opacity-75 transition-opacity flex items-center gap-1">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <ScrollingCarousel />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
