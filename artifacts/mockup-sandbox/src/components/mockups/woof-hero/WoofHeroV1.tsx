import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import dogHeroImg from "@/assets/dog-hero-studio.png";

const programs = [
  { icon: "🐾", title: "Private Training", blurb: "One-on-one coaching at your home, tailored to your dog's specific behaviors.", meta: "Custom" },
  { icon: "🏠", title: "Board & Train", blurb: "Full immersion over 2–4 weeks. Your dog lives and trains with us.", meta: "Immersive" },
  { icon: "🐶", title: "Puppy Program", blurb: "Socialization, bite inhibition, and essential commands from day one.", meta: "Foundation" },
  { icon: "🦮", title: "Leash Reactivity", blurb: "Science-based protocol to end pulling and lunging.", meta: "Behavior" },
  { icon: "🎯", title: "Off-Leash Freedom", blurb: "Voice command reliability in any real-world environment.", meta: "Advanced" },
  { icon: "👥", title: "Group Classes", blurb: "6-week structured courses. Small groups, big results.", meta: "Social" },
  { icon: "🛡️", title: "Aggression Mgmt", blurb: "Behavioral rehab grounded in psychology and calm leadership.", meta: "Expertise" },
  { icon: "🌟", title: "Service Dogs", blurb: "Tailored programs preparing dogs to support and guide.", meta: "Purpose" },
];

const duplicated = [...programs, ...programs];

const stats = [
  { value: "500+", label: "Dogs Trained" },
  { value: "10+", label: "Years Experience" },
  { value: "98%", label: "Satisfaction" },
];

function ProgramCard({ program }: { program: (typeof programs)[0] }) {
  return (
    <div className="flex-shrink-0 w-60 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md group">
      <div className="text-2xl mb-3">{program.icon}</div>
      <div className="inline-block rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-semibold mb-2.5">
        {program.meta}
      </div>
      <h3 className="text-neutral-900 font-bold text-sm mb-1.5 leading-snug">{program.title}</h3>
      <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2">{program.blurb}</p>
      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary transition-transform duration-200 group-hover:translate-x-1">
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
  const cardWidth = 256;

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
    <div className="overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <motion.div style={{ x }} className="flex gap-4">
        {duplicated.map((p, i) => <ProgramCard key={i} program={p} />)}
      </motion.div>
    </div>
  );
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.45 } } };

export function WoofHeroV1() {
  return (
    <div className="relative min-h-screen w-full bg-white text-neutral-900 overflow-hidden flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 80% at 8% 0%, hsla(0,85%,55%,0.07), transparent 60%), radial-gradient(ellipse 35% 55% at 92% 5%, hsla(0,60%,70%,0.04), transparent 65%), #fff" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, rgba(17,17,17,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.055) 1px, transparent 1px)", backgroundSize: "20px 20px", maskImage: "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)", WebkitMaskImage: "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px)", maskComposite: "intersect", WebkitMaskComposite: "source-in" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, transparent 55%, rgba(255,255,255,0.95) 100%)", filter: "blur(40px)", opacity: 0.65 }} />
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 pt-8 pb-6 max-w-6xl mx-auto w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="border-b border-neutral-200 pb-8 mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-10"
        >
          {/* Left — headline, description, CTAs */}
          <div className="flex flex-col gap-3 max-w-lg">
            <motion.div variants={fadeIn}>
              <span className="inline-block rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium">
                We Speak Your Dog's Language
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl font-black tracking-tighter leading-[1.04] text-neutral-900">
              Expert Dog Training<br />
              in <span className="text-primary">South Florida</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl font-medium text-neutral-500 tracking-tight">
              Obedience, Behavior & Service Dogs — Palm Beach County
            </motion.p>

            <motion.p variants={fadeUp} className="text-neutral-500 text-sm leading-relaxed max-w-sm">
              Serving Boca Raton, Delray Beach, Wellington, and Loxahatchee with over
              30 years of combined experience building happy, obedient companions.
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
          </div>

          {/* Right — Dog photo with floating stats card */}
          <motion.div
            variants={fadeUp}
            className="relative flex-shrink-0 self-start"
            style={{ width: 280 }}
          >
            {/* Photo */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl" style={{ aspectRatio: "3/4" }}>
              <img
                src={dogHeroImg}
                alt="Happy, well-trained dog — WooF Dogs South Florida"
                className="w-full h-full object-cover"
              />
              {/* Subtle gradient at bottom so the floating card reads cleanly */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating stats card — vertical, left side */}
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-1/2 -translate-y-1/2 -left-[76px] bg-white rounded-2xl border border-neutral-200 shadow-lg px-4 py-4 flex flex-col gap-0 divide-y divide-neutral-100"
            >
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col py-3 first:pt-0 last:pb-0">
                  <span className="text-xl font-black text-primary tabular-nums leading-none">{s.value}</span>
                  <span className="text-neutral-400 text-xs mt-1 leading-tight whitespace-nowrap">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Small trust badge top-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="absolute -top-3 -right-3 bg-white rounded-full border border-neutral-200 shadow-md px-3 py-1.5 flex items-center gap-1.5"
            >
              <span className="text-base">🏅</span>
              <span className="text-xs font-semibold text-neutral-700 whitespace-nowrap">Certified Trainer</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
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
