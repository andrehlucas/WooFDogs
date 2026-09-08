"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  ArrowRight, 
  ClipboardList, 
  Target, 
  Star, 
  FileText, 
  RotateCcw, 
  MapPin,
  Home,
  Tent,
  Heart,
  Scale,
  BookOpen,
  Users,
  Award,
  ChevronDown,
  Zap,
  Trophy,
  CalendarCheck,
  ExternalLink,
  Baby,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { TrainersSection } from "@/components/TrainersSection";
import { ServiceAreasSection } from "@/components/ServiceAreasSection";

const DogObedience = () => {
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);
  const { openModal } = useBookingModal();
  const trustLineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [cardsTop, setCardsTop] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      if (!trustLineRef.current || !sectionRef.current || !cardsRef.current) return;
      const trustRect = trustLineRef.current.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const cardsHeight = cardsRef.current.getBoundingClientRect().height;
      setCardsTop(trustRect.bottom - sectionRect.top - cardsHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Hero Section — Split Visual */}
      <section ref={sectionRef} className="relative flex flex-col lg:flex-row bg-white overflow-hidden" style={{ minHeight: "calc(100vh - 82px)" }}>

        {/* ── BACKGROUND: full-section image (desktop only) ── */}
        <div className="absolute inset-0 hidden lg:block pointer-events-none">
          <Image
            src="/dog-obedience-training.webp"
            alt=""
            fill
            aria-hidden
            className="object-contain"
            style={{ objectPosition: "right center" }}
            priority
            sizes="100vw"
          />
          {/* Gradient: solid white through content area, long fade into image */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #ffffff 0%, #ffffff 55%, rgba(255,255,255,0.9) 65%, rgba(255,255,255,0.25) 78%, transparent 90%)" }}
          />
        </div>

        {/* ── LEFT: Content ── */}
        <div className="relative z-10 flex flex-col justify-center items-start w-full lg:w-2/3 px-6 sm:px-10 lg:px-16 xl:px-20 py-16 pr-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            {/* Eyebrow pill */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border text-sm font-medium"
              style={{ backgroundColor: "#FDEAEA", borderColor: "#EF2B2D33", color: "#202124" }}
              data-testid="tag-location"
            >
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#EF2B2D" }} />
              Professional Dog Training in Palm Beach County
            </div>

            {/* H1 */}
            <h1
              className="font-bold leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2.25rem, 4.5vw, 4rem)", color: "#202124", maxWidth: "760px" }}
              data-testid="text-hero-title"
            >
              Dog Obedience Training That Helps Your Dog Listen in the Real World
            </h1>

            {/* Sub-headline */}
            <p
              className="mb-8 leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", color: "#6F6F73", maxWidth: "560px" }}
              data-testid="text-hero-subtitle"
            >
              From leash pulling and jumping to advanced off-leash reliability, every program starts with a professional evaluation and a plan built around your dog.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8" data-testid="hero-actions">
              <button
                onClick={openModal}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[14px] text-white font-semibold text-base transition-colors"
                style={{ backgroundColor: "#EF2B2D" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#D91F22")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#EF2B2D")}
                data-testid="button-hero-book"
              >
                Book Evaluation
                <ArrowRight size={18} />
              </button>
              <a
                href="#program-levels"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-[14px] font-semibold text-base border transition-colors bg-white"
                style={{ borderColor: "#E5E2E2", color: "#202124" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#202124")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#E5E2E2")}
                data-testid="button-hero-programs"
              >
                See Training Programs
              </a>
            </div>

            {/* Trust line */}
            <div ref={trustLineRef} className="flex flex-wrap items-center gap-x-2 gap-y-1" data-testid="hero-trust-line">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" style={{ color: "#EF2B2D" }} />
              {["Private training", "Real-world obedience", "Serving Boca Raton, Delray, Wellington & nearby areas"].map((item, i, arr) => (
                <span key={i} className="flex items-center gap-2">
                  <span style={{ color: "#6F6F73", fontSize: "0.875rem" }}>{item}</span>
                  {i < arr.length - 1 && <span style={{ color: "#6F6F73" }}>•</span>}
                </span>
              ))}
            </div>

          </motion.div>
        </div>

        {/* ── RIGHT: mobile image + proof cards ── */}
        <div className="relative w-full h-72 sm:h-96 lg:w-1/3 lg:h-auto z-10" style={{ minHeight: 0 }}>
          {/* Mobile-only image (desktop uses the section-level bg image) */}
          <div className="absolute inset-0 lg:hidden">
            <Image
              src="/dog-obedience-training.webp"
              alt="Dog trainer working with a calm golden retriever outdoors in South Florida"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </div>

          {/* Proof cards — bottom edge aligned with left-column trust line */}
          <div
            ref={cardsRef}
            className="absolute right-5 z-30 hidden lg:flex flex-col gap-3"
            style={cardsTop !== null ? { top: cardsTop } : { bottom: 80 }}
          >
            {/* Review summary */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-[18px] border shadow-lg"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E2E2" }}
              data-testid="card-proof-reviews"
            >
              <div className="flex -space-x-2 flex-shrink-0">
                {[
                  { bg: "#D97B6C", initials: "S" },
                  { bg: "#7C9D8E", initials: "M" },
                  { bg: "#8B7EC8", initials: "A" },
                ].map((av, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: av.bg }}
                  >
                    {av.initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]" />
                  ))}
                </div>
                <p className="text-xs font-semibold leading-tight" style={{ color: "#202124" }}>600+ 5-star reviews</p>
                <p className="text-xs leading-tight" style={{ color: "#6F6F73" }}>from happy dog parents</p>
              </div>
            </div>

            {/* Professional Evaluation */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-[18px] border shadow-lg"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E2E2" }}
              data-testid="card-proof-evaluation"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#FDEAEA" }}
              >
                <ClipboardList className="w-5 h-5" style={{ color: "#EF2B2D" }} />
              </div>
              <div>
                <p className="text-xs font-semibold leading-tight" style={{ color: "#202124" }}>Professional Evaluation</p>
                <p className="text-xs leading-tight" style={{ color: "#6F6F73" }}>Every program begins with a<br />one-on-one evaluation.</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Program Overview & Book Evaluation Section */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Program Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 sm:mb-8">
                <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-overview-label">
                  Program Overview
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-overview-title">
                  Personalized Obedience Training for Every Dog
                </h2>
                <div className="space-y-4 text-base sm:text-lg text-muted-foreground">
                  <p data-testid="text-overview-paragraph-0">
                    Our obedience training helps build clear communication, confidence, and calm behavior at home and in public. Whether you're starting foundations or aiming for off-leash reliability, our structured approach delivers lasting results.
                  </p>
                  <p data-testid="text-overview-paragraph-1">
                    Every dog begins with a professional behavioral evaluation where we assess:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Your dog's temperament, motivation, and current skills</li>
                    <li>Your needs, expectations, and lifestyle</li>
                    <li>Communication patterns between your dog and household</li>
                  </ul>
                  <p data-testid="text-overview-paragraph-2">
                    From there, we design a plan that fits your goals and your dog's unique learning style.
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  {
                    name: "In-Home Training",
                    icon: Home,
                    description: "Private, one-on-one coaching in your dog's everyday environment. Ideal for household routines and family involvement."
                  },
                  {
                    name: "Bootcamp (Board & Train)",
                    icon: Tent,
                    description: "An intensive stay with our trainers for accelerated learning and full-time reinforcement. Designed for faster progress and stronger consistency."
                  }
                ].map((modality, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-background p-5 sm:p-6 rounded-xl shadow-sm border border-border"
                    data-testid={`card-modality-${index}`}
                  >
                    <div className="flex items-start gap-4">
                      <modality.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary flex-shrink-0" data-testid={`icon-modality-${index}`} />
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-2" data-testid={`text-modality-name-${index}`}>
                          {modality.name}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground" data-testid={`text-modality-description-${index}`}>
                          {modality.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm sm:text-base text-muted-foreground italic"
                data-testid="text-modalities-note"
              >
                Both formats use balanced, reward-focused methods grounded in learning science.
              </motion.p>
            </motion.div>

            {/* Right Column - Book Evaluation CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="sticky top-24">
                <div className="bg-background p-6 sm:p-8 rounded-xl shadow-sm border border-border">
                  <div className="mb-6">
                    <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-book-label">
                      Book Evaluation
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3" data-testid="text-book-title">
                      Book Your Evaluation
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground mb-6" data-testid="text-book-description">
                      Tell us about your dog and preferred times. We'll confirm within 24 hours.
                    </p>
                  </div>
                  <Button 
                    onClick={openModal}
                    className="w-full h-11 text-base bg-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,55%)]" 
                    size="lg" 
                    data-testid="button-submit"
                  >
                    Schedule Evaluation
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                  <p className="text-xs sm:text-sm text-muted-foreground text-center mt-4" data-testid="text-privacy-note">
                    By submitting, you agree to be contacted about scheduling. We never share your information.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Behavior Problems Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-problems-label">
              What We Work On
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 px-2" data-testid="text-problems-title">
              Behaviors We Work On Through Structured Obedience Training
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-5xl mx-auto"
          >
            {[
              "Leash pulling and lunging",
              "Ignoring commands / selective listening",
              "Counter-surfing and door dashing",
              "Over-excitability and impulse control",
              "Jumping on people and guests",
              "Excessive barking",
              "Recall reliability and off-leash foundations",
              "Place command and calm behavior at home"
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-start gap-3 bg-muted/30 p-4 sm:p-5 rounded-lg"
                data-testid={`item-problem-${index}`}
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-sm sm:text-base" data-testid={`text-problem-${index}`}>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 sm:py-16 bg-primary/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 px-2"
            data-testid="text-trust-title"
          >
            Why Choose Us
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: "30 Years", description: "Combined professional experience" },
              { label: "3,000+ Dogs", description: "Successful graduates" },
              { label: "Balanced", description: "Evidence-based methods" },
              { label: "Family-Ready", description: "Kid & home friendly" }
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center p-4 sm:p-6 bg-background rounded-xl shadow-sm"
                data-testid={`badge-trust-${index}`}
              >
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-2" data-testid={`text-badge-label-${index}`}>
                  {badge.label}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground leading-tight" data-testid={`text-badge-description-${index}`}>
                  {badge.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-philosophy-label">
              Training Philosophy
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold px-2" data-testid="text-philosophy-title">
              Humane, Clear, and Consistent
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: Heart,
                title: "Reward-Focused",
                description: "We reinforce desired choices to build confidence and motivation."
              },
              {
                icon: Scale,
                title: "Balanced Structure",
                description: "Clear boundaries and fair feedback so dogs understand expectations."
              },
              {
                icon: BookOpen,
                title: "Science-Based",
                description: "Methods grounded in learning theory and real-world proofing."
              },
              {
                icon: Users,
                title: "Owner Coaching",
                description: "We teach you the skills to maintain results long after sessions end."
              }
            ].map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-muted/30 p-6 sm:p-8 rounded-xl"
                data-testid={`card-pillar-${index}`}
              >
                <pillar.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4" data-testid={`icon-pillar-${index}`} />
                <h3 className="text-lg sm:text-xl font-semibold mb-3" data-testid={`text-pillar-title-${index}`}>
                  {pillar.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground" data-testid={`text-pillar-description-${index}`}>
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Levels Section */}
      <section id="program-levels" className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-programs-label">
              Programs
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-programs-title">
              Obedience Levels
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-programs-subtitle">
              Choose the right level for your dog. Not sure? Start with an evaluation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: Baby,
                title: "Puppy Education (Under 6 Months)",
                description: "Foundation training for puppies with age-appropriate methods. Available as private sessions or V.I.P Board & Train at one of our trainer's residences.",
                meta: "Indoor training only, 6-foot leash, no distractions",
                commands: ["Eye Contact & Focus (private sessions)", "Sit", "Down", "Introduction to Stay", "Let's-Go (loose leash walking)", "Come", "Sit & Wait (before and after doors)"],
                distractions: "No distractions. Includes potty training, play-biting, and chewing guidance. Marker system: Yes (positive), No (negative), Good (sustained positive)."
              },
              {
                icon: ClipboardList,
                title: "Basic Obedience (6 Months & Older)",
                description: "Core commands and leash manners for dogs new to training.",
                meta: "Training on up to 6-foot leash, no distractions",
                commands: ["Eye Contact & Focus", "Sit", "Down", "Stay", "Heel", "Come", "Let's-Go (loose leash walking)", "Sit & Wait (before and after doors)"],
                distractions: "No distractions. Note: The Place command is not included in Basic Obedience."
              },
              {
                icon: Star,
                title: "Advanced Obedience",
                description: "Same core commands with the 3Ds: Duration, Distance, and Distraction.",
                meta: "Introduces Place command and 30-foot long line recall",
                commands: ["Duration (longer stays)", "Distance (handler moves farther away)", "Distraction (controlled environmental challenges)", "Place command", "Recall on long line (up to 30 feet)"],
                distractions: "Controlled environmental challenges. Training builds reliability through gradual exposure to real-world situations."
              },
              {
                icon: Zap,
                title: "Basic Off-Leash",
                description: "Introduction to off-leash control in controlled environments only.",
                meta: "Foundation for off-leash reliability",
                commands: ["Off-leash heel", "Off-leash recall"],
                distractions: "Controlled environments only. Training takes place in secure, enclosed areas."
              },
              {
                icon: Target,
                title: "Advanced Off-Leash",
                description: "Off-leash reliability in training centers and enclosed areas with distractions.",
                meta: "Training in enclosed areas only",
                commands: ["Off-leash heel (continued)", "Recall under increased distraction", "Distance commands", "Place with distractions", "Stay with temptation"],
                distractions: "Distractions may include other dogs, people, wildlife, and moving objects. Training in training centers or enclosed areas."
              },
              {
                icon: Trophy,
                title: "Expert Off-Leash",
                description: "Elite-level off-leash control with maximum reliability under heavy distraction.",
                meta: "Highest level of off-leash performance",
                commands: ["Emergency down with heavy distraction", "Stay when trainer leaves sight", "Recall from across property (including during play)", "Sit and down from a distance", "Emergency down while excited or highly distracted"],
                distractions: "Heavy distractions. Strong focus on emergency response and reliability in high-stimulation environments."
              },
              {
                icon: CalendarCheck,
                title: "Start with an Evaluation",
                description: "Every successful training journey begins with understanding your dog's unique needs, temperament, and learning style.",
                meta: "Professional assessment, personalized plan",
                commands: ["Behavioral assessment", "Temperament evaluation", "Current skill level review", "Motivation and drive analysis", "Training history discussion", "Goal setting and timeline"],
                distractions: "What to expect: 45-60 minute in-home evaluation where we meet your dog, discuss your goals, and create a customized training roadmap.",
                isEvaluationCard: true
              }
            ].map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={level.isEvaluationCard 
                  ? "bg-[hsl(0,84%,60%)] rounded-xl border-2 border-[hsl(0,84%,50%)] hover:border-[hsl(0,84%,45%)] transition-all duration-300 hover:shadow-2xl overflow-hidden"
                  : "bg-background rounded-xl border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-lg overflow-hidden"
                }
                data-testid={`card-level-${index}`}
              >
                <div className="p-6 sm:p-8">
                  <level.icon className={level.isEvaluationCard 
                    ? "w-10 h-10 sm:w-12 sm:h-12 text-white mb-4" 
                    : "w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4"
                  } data-testid={`icon-level-${index}`} />
                  <h3 className={level.isEvaluationCard 
                    ? "text-lg sm:text-xl font-semibold mb-3 text-white" 
                    : "text-lg sm:text-xl font-semibold mb-3"
                  } data-testid={`text-level-title-${index}`}>
                    {level.title}
                  </h3>
                  <p className={level.isEvaluationCard 
                    ? "text-sm sm:text-base text-white/90 mb-4" 
                    : "text-sm sm:text-base text-muted-foreground mb-4"
                  } data-testid={`text-level-description-${index}`}>
                    {level.description}
                  </p>
                  <p className={level.isEvaluationCard 
                    ? "text-xs sm:text-sm text-white font-medium mb-6" 
                    : "text-xs sm:text-sm text-primary font-medium mb-6"
                  } data-testid={`text-level-meta-${index}`}>
                    {level.meta}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    className={level.isEvaluationCard 
                      ? "w-full mb-3 justify-between text-white hover:bg-white/10" 
                      : "w-full mb-3 justify-between"
                    }
                    onClick={() => setExpandedLevel(expandedLevel === index ? null : index)}
                    data-testid={`button-learn-more-${index}`}
                  >
                    Learn more
                    <motion.div
                      animate={{ rotate: expandedLevel === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </Button>

                  <AnimatePresence>
                    {expandedLevel === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                        data-testid={`expanded-content-${index}`}
                      >
                        <div className={level.isEvaluationCard 
                          ? "pt-4 border-t border-white/20 space-y-4" 
                          : "pt-4 border-t space-y-4"
                        }>
                          <div>
                            <h4 className={level.isEvaluationCard 
                              ? "font-semibold text-sm mb-2 text-white" 
                              : "font-semibold text-sm mb-2"
                            }>{level.isEvaluationCard ? "What's Included:" : "Commands Covered:"}</h4>
                            <ul className="space-y-1.5">
                              {level.commands.map((command, cmdIndex) => (
                                <li key={cmdIndex} className={level.isEvaluationCard 
                                  ? "flex items-start gap-2 text-xs sm:text-sm text-white/90" 
                                  : "flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                                }>
                                  <div className={level.isEvaluationCard 
                                    ? "w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0" 
                                    : "w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"
                                  } />
                                  <span>{command}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className={level.isEvaluationCard 
                              ? "font-semibold text-sm mb-2 text-white" 
                              : "font-semibold text-sm mb-2"
                            }>{level.isEvaluationCard ? "Details:" : "Distraction Level:"}</h4>
                            <p className={level.isEvaluationCard 
                              ? "text-xs sm:text-sm text-white/90" 
                              : "text-xs sm:text-sm text-muted-foreground"
                            }>{level.distractions}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button 
                    variant={level.isEvaluationCard ? "secondary" : "outline"} 
                    className={level.isEvaluationCard 
                      ? "w-full mt-3 bg-white text-[hsl(0,84%,60%)] hover:bg-white/90 font-semibold" 
                      : "w-full mt-3"
                    } 
                    onClick={openModal} 
                    data-testid={`button-level-book-${index}`}
                  >
                    {level.isEvaluationCard ? "Book Your Evaluation" : "Book Evaluation"}
                    {level.isEvaluationCard && <ArrowRight className="ml-2" size={18} />}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-process-label">
              Process
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 px-2" data-testid="text-process-title">
              How It Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: ClipboardList,
                title: "1) Evaluation",
                description: "Professional evaluation to map goals and challenges."
              },
              {
                icon: FileText,
                title: "2) Custom Plan",
                description: "Level selection, sessions, homework, and milestones tailored to your dog."
              },
              {
                icon: RotateCcw,
                title: "3) Reinforcement",
                description: "Owner coaching, follow-ups, and real-world proofing for lasting results."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 sm:p-8 bg-muted/30 rounded-xl"
                data-testid={`card-step-${index}`}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 mb-4 sm:mb-6">
                  <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" data-testid={`icon-step-${index}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3" data-testid={`text-step-title-${index}`}>
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground" data-testid={`text-step-description-${index}`}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-sm sm:text-base text-muted-foreground mt-6 sm:mt-8 italic px-4"
            data-testid="text-process-note"
          >
            Your trainer recommends the optimal format (In-Home or Bootcamp) after the evaluation.
          </motion.p>
        </div>
      </section>

      <TrainersSection />

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-testimonials-label">
              Testimonials
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-testimonials-title">
              Real Results From Real Families
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-testimonials-description">
              Hear from families who completed our obedience programs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                quote: "We started with leash-pulling chaos. After training, walks are calm and enjoyable. It's night and day!",
                author: "Sarah M.",
                dog: "Luna, Golden Retriever",
                source: "Google Review"
              },
              {
                quote: "Our trainer customized every session for our anxious dog. Now she's confident and obedient even in public.",
                author: "Michael C.",
                dog: "Bella, Shepherd Mix",
                source: "Google Review"
              },
              {
                quote: "Best decision for our family. Consistent results and clearer communication with our dog.",
                author: "Jessica R.",
                dog: "Max, Labrador",
                source: "Google Review"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background p-5 sm:p-6 rounded-xl shadow-sm"
                data-testid={`card-testimonial-${index}`}
              >
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 italic leading-relaxed" data-testid={`text-testimonial-quote-${index}`}>
                  "{testimonial.quote}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-sm sm:text-base" data-testid={`text-testimonial-author-${index}`}>
                    {testimonial.author}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground" data-testid={`text-testimonial-dog-${index}`}>
                    {testimonial.dog}
                  </p>
                  <p className="text-xs text-primary mt-1" data-testid={`text-testimonial-source-${index}`}>
                    {testimonial.source}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8"
          >
            <a 
              href="https://www.google.com/search?q=Woof+Dogs+Training+Reviews" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              data-testid="link-google-reviews"
            >
              See more reviews on Google
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-faq-label">
              FAQ
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold px-2" data-testid="text-faq-title">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FaqAccordion
              faqs={[
                {
                  q: "How old should my dog be to start obedience training?",
                  a: "We begin foundation training as early as 8 weeks with age-appropriate sessions. Adult dogs can start at any time."
                },
                {
                  q: "What tools do you use for training?",
                  a: "We use a balanced, reward-focused approach with tools selected based on your dog's needs and trainer recommendations."
                },
                {
                  q: "How long does training take?",
                  a: "Timelines vary based on goals and consistency. Initial expectations and milestones are discussed during the Evaluation."
                },
                {
                  q: "Bootcamp vs In-Home: which should I choose?",
                  a: "Bootcamp accelerates foundation and consistency. In-Home maximizes owner participation in your real environment. The best option for your dog is recommended during the Evaluation."
                },
                {
                  q: "What happens after I book an Evaluation?",
                  a: "We confirm your appointment and documentation needed, meet with our Evaluator for an evaluation session, define goals and expectations, and provide a tailored treatment and training plan."
                }
              ]}
              itemClassName="bg-muted/30 px-4 sm:px-6 rounded-lg border-none"
              triggerClassName="text-left text-sm sm:text-base font-semibold hover:no-underline py-4 sm:py-5"
              contentClassName="text-sm sm:text-base text-muted-foreground pb-4 sm:pb-5"
              data-testid="accordion-faq"
              testIdPrefix="accordion"
            />
          </motion.div>
        </div>
      </section>

      <ServiceAreasSection variant="compact" />

    </div>
  );
};

export default DogObedience;
