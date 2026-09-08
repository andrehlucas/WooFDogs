"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ClipboardList, 
  MapPin,
  Home,
  Tent,
  Heart,
  Scale,
  BookOpen,
  Users,
  Award,
  ChevronDown,
  Baby,
  GraduationCap,
  Trophy,
  CalendarCheck,
  Eye,
  Dog,
  Shield,
  Target,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useBookingModal } from "@/contexts/BookingModalContext";

const Bootcamp = () => {
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);
  const { openModal } = useBookingModal();
  
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full mb-4 sm:mb-6" data-testid="tag-location">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">Serving Wellington, Westlake, Royal Palm Beach, West Palm Beach, Loxahatchee & More</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2" data-testid="text-hero-title">
              Bootcamp Programs: Intensive Board & Train
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2" data-testid="text-hero-subtitle">
              Accelerated learning with full-time reinforcement. From puppy foundations to advanced off-leash reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14" onClick={openModal} data-testid="button-hero-book">
                Book Evaluation
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14" data-testid="button-hero-compare">
                Compare Programs
              </Button>
            </div>
          </motion.div>
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
                  Board & Train Programs
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-overview-title">
                  Intensive Training for Faster, Lasting Results
                </h2>
                <div className="space-y-4 text-base sm:text-lg text-muted-foreground">
                  <p data-testid="text-overview-paragraph-0">
                    Our bootcamp programs provide immersive, full-time training where your dog stays with our professional trainers. This format accelerates learning through consistent daily practice, structured routines, and intensive reinforcement.
                  </p>
                  <p data-testid="text-overview-paragraph-1">
                    We offer three distinct bootcamp levels to match your dog's age, experience, and training goals:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Puppy Education Bootcamp (6 months and under)</li>
                    <li>Basic Bootcamp (6 months and older)</li>
                    <li>Advanced Bootcamp (builds on Basic foundations)</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  {
                    name: "Full-Time Immersion",
                    icon: Tent,
                    description: "Your dog lives with our trainers, receiving structured training sessions throughout the day with consistent reinforcement."
                  },
                  {
                    name: "Review/Owner Transfer Sessions",
                    icon: Users,
                    description: "Before pickup, we work directly with you to transfer all commands and handling techniques for seamless transition home."
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
                All bootcamp programs use balanced, reward-focused methods with trainer-approved equipment.
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
                      Start Your Bootcamp Journey
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground mb-6" data-testid="text-book-description">
                      Tell us about your dog and we'll recommend the right bootcamp level. Evaluation scheduled within 24 hours.
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

      {/* What We Work On Section */}
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
              Marker System
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 px-2" data-testid="text-problems-title">
              Clear Communication Through Markers
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto"
          >
            {[
              { marker: "Yes", description: "Positive marker - marks the exact moment of correct behavior" },
              { marker: "No", description: "Negative marker - communicates incorrect choice" },
              { marker: "Good", description: "Sustained positive behavior - encourages ongoing action" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-muted/30 p-4 sm:p-5 rounded-lg text-center"
                data-testid={`item-marker-${index}`}
              >
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-2" data-testid={`text-marker-${index}`}>
                  "{item.marker}"
                </div>
                <span className="text-sm sm:text-base text-muted-foreground">{item.description}</span>
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
            Why Choose Bootcamp
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: "Accelerated", description: "Faster results through immersion" },
              { label: "Consistent", description: "Daily structured training" },
              { label: "Professional", description: "Expert handlers 24/7" },
              { label: "Transferable", description: "Skills that stick at home" }
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
              Structured, Balanced, Effective
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: Heart,
                title: "Reward-Focused",
                description: "Positive reinforcement builds confidence and motivation throughout the program."
              },
              {
                icon: Scale,
                title: "Clear Boundaries",
                description: "Fair, consistent feedback so dogs understand exactly what's expected."
              },
              {
                icon: BookOpen,
                title: "Marker System",
                description: "Precise communication using Yes, No, and Good markers for clear learning."
              },
              {
                icon: Users,
                title: "Review/Owner Transfer",
                description: "Dedicated sessions to ensure you can maintain all trained behaviors at home."
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

      {/* Bootcamp Programs Section */}
      <section id="bootcamp-programs" className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-programs-label">
              Bootcamp Programs
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-programs-title">
              Choose Your Bootcamp Level
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-programs-subtitle">
              Each level builds progressively. Not sure where to start? Book an evaluation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                icon: Baby,
                title: "Puppy Education Bootcamp",
                description: "Foundation training for puppies 6 months and under. Indoor training only with age-appropriate methods.",
                meta: "Ages 6 months and under",
                commands: [
                  "Eye contact & focus",
                  "Sit",
                  "Sit & Wait at doors",
                  "Down (luring method)",
                  "Come",
                  "Stay (introduced through continuous reinforcement)",
                  "Let's-Go (loose leash walking using treats)"
                ],
                equipment: "6-foot leash, slip lead, and trainer-approved tools. Indoor training only, no distractions.",
                isEvaluationCard: false
              },
              {
                icon: GraduationCap,
                title: "Basic Bootcamp",
                description: "Core obedience for dogs 6 months and older. Establishes marker system and essential commands.",
                meta: "Ages 6 months and older",
                commands: [
                  "Sit",
                  "Down",
                  "Down-stay",
                  "Calm command",
                  "Heel",
                  "Let's Go",
                  "Wait at the door",
                  "Eye contact & focus"
                ],
                equipment: "6-foot leash, prong collar or slip lead. No distractions. Marker system: Yes (positive), No (negative), Good (sustained positive).",
                isEvaluationCard: false
              },
              {
                icon: Trophy,
                title: "Advanced Bootcamp",
                description: "Builds on Basic with the 3Ds: Duration, Distance, and Distraction. Introduces Place command and outdoor training.",
                meta: "Prerequisite: Basic Bootcamp foundation",
                commands: [
                  "Duration (longer stays)",
                  "Distance (handler moves farther away)",
                  "Distraction (controlled environmental challenges)",
                  "Place command",
                  "Recall on long line (up to 30 feet)",
                  "All Basic commands with increased reliability"
                ],
                equipment: "20-foot long line, prong collar. Outdoor training with controlled distractions. Dog must hold Stay while other dogs are present.",
                behaviorFocus: ["Reactivity", "Dog-dog aggression", "Jumping", "Barking"],
                isEvaluationCard: false
              },
              {
                icon: CalendarCheck,
                title: "Start with an Evaluation",
                description: "Every bootcamp begins with understanding your dog's temperament, current skills, and training goals.",
                meta: "Professional assessment, personalized plan",
                commands: [
                  "Behavioral assessment",
                  "Temperament evaluation",
                  "Current skill level review",
                  "Motivation and drive analysis",
                  "Training history discussion",
                  "Goal setting and timeline"
                ],
                equipment: "What to expect: 45-60 minute in-home evaluation where we meet your dog, discuss your goals, and recommend the right bootcamp level.",
                isEvaluationCard: true
              }
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={program.isEvaluationCard 
                  ? "bg-[hsl(0,84%,60%)] rounded-xl border-2 border-[hsl(0,84%,50%)] hover:border-[hsl(0,84%,45%)] transition-all duration-300 hover:shadow-2xl overflow-hidden"
                  : "bg-background rounded-xl border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-lg overflow-hidden"
                }
                data-testid={`card-program-${index}`}
              >
                <div className="p-6 sm:p-8">
                  <program.icon className={program.isEvaluationCard 
                    ? "w-10 h-10 sm:w-12 sm:h-12 text-white mb-4" 
                    : "w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4"
                  } data-testid={`icon-program-${index}`} />
                  <h3 className={program.isEvaluationCard 
                    ? "text-lg sm:text-xl font-semibold mb-3 text-white" 
                    : "text-lg sm:text-xl font-semibold mb-3"
                  } data-testid={`text-program-title-${index}`}>
                    {program.title}
                  </h3>
                  <p className={program.isEvaluationCard 
                    ? "text-sm sm:text-base text-white/90 mb-4" 
                    : "text-sm sm:text-base text-muted-foreground mb-4"
                  } data-testid={`text-program-description-${index}`}>
                    {program.description}
                  </p>
                  <p className={program.isEvaluationCard 
                    ? "text-xs sm:text-sm text-white font-medium mb-6" 
                    : "text-xs sm:text-sm text-primary font-medium mb-6"
                  } data-testid={`text-program-meta-${index}`}>
                    {program.meta}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    className={program.isEvaluationCard 
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
                        <div className={program.isEvaluationCard 
                          ? "pt-4 border-t border-white/20 space-y-4" 
                          : "pt-4 border-t space-y-4"
                        }>
                          <div>
                            <h4 className={program.isEvaluationCard 
                              ? "font-semibold text-sm mb-2 text-white" 
                              : "font-semibold text-sm mb-2"
                            }>{program.isEvaluationCard ? "What's Included:" : "Commands Covered:"}</h4>
                            <ul className="space-y-1.5">
                              {program.commands.map((command, cmdIndex) => (
                                <li key={cmdIndex} className={program.isEvaluationCard 
                                  ? "flex items-start gap-2 text-xs sm:text-sm text-white/90" 
                                  : "flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                                }>
                                  <div className={program.isEvaluationCard 
                                    ? "w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0" 
                                    : "w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"
                                  } />
                                  <span>{command}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className={program.isEvaluationCard 
                              ? "font-semibold text-sm mb-2 text-white" 
                              : "font-semibold text-sm mb-2"
                            }>{program.isEvaluationCard ? "Details:" : "Equipment & Environment:"}</h4>
                            <p className={program.isEvaluationCard 
                              ? "text-xs sm:text-sm text-white/90" 
                              : "text-xs sm:text-sm text-muted-foreground"
                            }>{program.equipment}</p>
                          </div>
                          {program.behaviorFocus && (
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Behavior Modification Focus:</h4>
                              <ul className="space-y-1.5">
                                {program.behaviorFocus.map((behavior, behIndex) => (
                                  <li key={behIndex} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                    <span>{behavior}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button 
                    variant={program.isEvaluationCard ? "secondary" : "outline"} 
                    className={program.isEvaluationCard 
                      ? "w-full mt-3 bg-white text-[hsl(0,84%,60%)] hover:bg-white/90 font-semibold" 
                      : "w-full mt-3"
                    } 
                    onClick={openModal} 
                    data-testid={`button-program-book-${index}`}
                  >
                    {program.isEvaluationCard ? "Book Your Evaluation" : "Book Evaluation"}
                    {program.isEvaluationCard && <ArrowRight className="ml-2" size={18} />}
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
              How Bootcamp Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: ClipboardList,
                title: "1) Evaluation",
                description: "Professional assessment to determine the right bootcamp level for your dog."
              },
              {
                icon: Home,
                title: "2) Drop-Off",
                description: "Your dog stays with our trainers for the full bootcamp duration."
              },
              {
                icon: Target,
                title: "3) Training",
                description: "Daily structured sessions with consistent reinforcement and progress tracking."
              },
              {
                icon: Users,
                title: "4) Transfer",
                description: "Owner coaching sessions to ensure you can maintain all trained behaviors."
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
            Follow-up sessions and refresher training are available to maintain long-term results.
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 sm:py-20 bg-muted/30">
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
            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4" data-testid="accordion-faq">
              {[
                {
                  q: "How long is each bootcamp program?",
                  a: "Program length varies based on your dog's needs and goals. Duration is determined during the evaluation and customized to ensure lasting results."
                },
                {
                  q: "What equipment do you use?",
                  a: "We use slip leads, prong collars (for Basic and Advanced), and long lines up to 30 feet. All equipment is trainer-approved and introduced with proper conditioning."
                },
                {
                  q: "What's the difference between Basic and Advanced Bootcamp?",
                  a: "Basic establishes core commands and the marker system in a distraction-free environment. Advanced builds on this with the 3Ds (Duration, Distance, Distraction), adds the Place command, and includes outdoor training with controlled challenges."
                },
                {
                  q: "Can my puppy do bootcamp?",
                  a: "Yes! Our Puppy Education Bootcamp is designed for puppies 6 months and under, using age-appropriate methods and indoor-only training."
                },
                {
                  q: "What happens when my dog comes home?",
                  a: "Before pickup, we conduct review/owner transfer sessions where you learn all commands and handling techniques. This ensures you can maintain trained behaviors at home."
                },
                {
                  q: "Do you address behavioral issues during bootcamp?",
                  a: "Yes, especially in Advanced Bootcamp. We focus on behavior modification including reactivity, dog-dog aggression, jumping, and barking. Severe aggression cases are evaluated individually."
                }
              ].map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="bg-background px-4 sm:px-6 rounded-lg border-none"
                  data-testid={`accordion-item-${index}`}
                >
                  <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:no-underline py-4 sm:py-5" data-testid={`accordion-trigger-${index}`}>
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-4 sm:pb-5" data-testid={`accordion-content-${index}`}>
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 px-2" data-testid="text-final-cta-title">
              Ready to Transform Your Dog's Behavior?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2" data-testid="text-final-cta-description">
              Schedule your evaluation today and discover which bootcamp level is right for your dog.
            </p>
            <Button 
              size="lg" 
              className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 bg-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,55%)]" 
              onClick={openModal}
              data-testid="button-final-cta"
            >
              Book Your Evaluation
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Bootcamp;
