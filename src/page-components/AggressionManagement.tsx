"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  MapPin,
  Home,
  Tent,
  Heart,
  Scale,
  BookOpen,
  Users,
  Shield,
  Brain,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { useBookingModal } from "@/contexts/BookingModalContext";

const AggressionManagement = () => {
  const { openModal } = useBookingModal();
  const [selectedAggressionType, setSelectedAggressionType] = useState(0);

  const aggressionTypes = [
    {
      type: "Dog-to-Dog Aggression",
      icon: "🐕",
      description: "Reactive or aggressive behavior toward other dogs during walks, at parks, or when visitors bring dogs to your home.",
      details: "We address leash reactivity, barrier frustration, and lack of socialization through controlled exposure, impulse control training, and teaching calm behavior around triggers. Success includes gradual desensitization and building positive associations."
    },
    {
      type: "Resource Guarding",
      icon: "🦴",
      description: "Guarding food, toys, beds, or even people from other dogs or family members. Often shown through growling, snapping, or biting.",
      details: "Our protocol helps teach your dog that humans approaching their resources is a positive event, not a threat. We use trading games, impulse control, and structured feeding routines to work toward reducing guarding behavior over time."
    },
    {
      type: "Fear-Based Aggression",
      icon: "😨",
      description: "Aggressive responses triggered by fear of strangers, new environments, loud noises, or past trauma. Often defensive in nature.",
      details: "We build confidence through gradual exposure, counter-conditioning, and safe retreat options. The goal is to change your dog's emotional response to triggers while teaching alternative coping behaviors."
    },
    {
      type: "Territorial Aggression",
      icon: "🏠",
      description: "Aggressive behavior when people or animals approach your property, doorbell rings, or someone enters the home or yard.",
      details: "Training focuses on teaching calm threshold behavior, place training, and impulse control. We establish clear boundaries and appropriate alert behavior without aggression, creating a calmer home environment."
    },
    {
      type: "Protective/Possessive Aggression",
      icon: "🛡️",
      description: "Aggression when guarding a specific person, often directed at family members, guests, or other pets who approach the protected individual.",
      details: "We reduce over-bonding and create structure where the dog learns to trust that family members are safe. Training includes confidence-building for the dog and leadership exercises for the protected person."
    },
    {
      type: "Predatory Aggression",
      icon: "🎯",
      description: "Chase and attack behavior toward small animals, cats, or fast-moving objects. Instinct-driven rather than emotional.",
      details: "Management is key for safety, combined with impulse control training, redirection exercises, and teaching a strong recall or emergency stop. We create protocols for safe coexistence and controlled exposure where appropriate."
    },
    {
      type: "Redirected Aggression",
      icon: "⚡",
      description: "When a dog is aroused by one trigger but cannot access it, they redirect frustration onto another dog, person, or object nearby.",
      details: "Training emphasizes arousal awareness, teaching calm-down protocols, and preventing trigger stacking. We help you recognize early warning signs and interrupt the cycle before redirection occurs."
    },
    {
      type: "Pain-Induced or Medical Aggression",
      icon: "🏥",
      description: "Aggression that appears suddenly or worsens due to underlying pain, injury, illness, or age-related conditions like arthritis.",
      details: "We always recommend a veterinary exam to rule out medical causes. If pain is identified, we work alongside your vet to create a training plan that respects your dog's physical limitations while addressing behavior."
    }
  ];

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
              <span className="text-xs sm:text-sm font-medium">Serving Boca Raton, Delray, Wellington, Palm Beach Gardens & More</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2" data-testid="text-hero-title">
              Expert Aggression Management & Behavior Modification
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2" data-testid="text-hero-subtitle">
              Safe, effective approaches for reactive and aggressive behavior. Every program starts with a professional behavioral evaluation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14" onClick={openModal} data-testid="button-hero-book">
                Book Evaluation
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14" data-testid="button-hero-learn">
                Learn About Our Approach
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
                  Program Overview
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-overview-title">
                  Specialized Behavior Modification for Aggressive Dogs
                </h2>
                <div className="space-y-4 text-base sm:text-lg text-muted-foreground">
                  <p data-testid="text-overview-paragraph-0">
                    Aggression is complex and requires specialized expertise. Our behavior modification programs address the root causes of reactive and aggressive behavior, creating lasting change through structured training and environmental management.
                  </p>
                  <p data-testid="text-overview-paragraph-1">
                    Every case begins with a comprehensive behavioral evaluation. We assess triggers, intensity, history, and safety factors to create a customized protocol that prioritizes your family's safety while rehabilitating your dog.
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  {
                    name: "In-Home Behavior Modification",
                    icon: Home,
                    description: "Private sessions in your environment where triggers occur. We teach you management skills and work directly with your dog's specific challenges."
                  },
                  {
                    name: "Intensive Rehabilitation (Board & Train)",
                    icon: Tent,
                    description: "Controlled, expert-led immersion for severe cases. Structured protocols in a safe environment with gradual reintegration and owner transition."
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
                All aggression cases are handled with science-based methods that prioritize safety, humane treatment, and measurable progress.
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
                      Start with an Evaluation
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground mb-6" data-testid="text-book-description">
                      Tell us about your dog's behavior and concerns. We'll confirm within 24 hours and schedule a professional evaluation.
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

      {/* Types of Aggression - Split Panel Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-aggression-types-label">
              Types We Address
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-aggression-types-title">
              Most Common Types of Aggression
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-aggression-types-subtitle">
              Each type requires a different approach. Our evaluation identifies the underlying cause and designs a specific protocol.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
            data-testid="split-panel-aggression-types"
          >
            {/* Left Panel - List of Aggression Types */}
            <div className="lg:col-span-4">
              <div className="bg-muted/30 rounded-xl p-4 sm:p-6 lg:sticky lg:top-24">
                <div className="space-y-2">
                  {aggressionTypes.map((item, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedAggressionType(index)}
                      className={`w-full text-left px-4 py-3 sm:py-4 rounded-lg transition-all duration-200 ${
                        selectedAggressionType === index
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'bg-background hover:bg-muted hover:shadow-sm'
                      }`}
                      data-testid={`button-aggression-type-${index}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl sm:text-2xl flex-shrink-0">{item.icon}</span>
                        <span className="text-sm sm:text-base font-semibold">{item.type}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Content Area */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedAggressionType}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-muted/30 rounded-xl overflow-hidden"
                  data-testid={`content-aggression-type-${selectedAggressionType}`}
                >
                  {/* Image Section */}
                  <div 
                    className="relative w-full h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-primary/20 via-primary/10 to-muted flex items-center justify-center"
                    data-testid={`image-aggression-type-${selectedAggressionType}`}
                  >
                    <div className="text-center">
                      <span className="text-6xl sm:text-7xl lg:text-8xl mb-2 block" data-testid={`icon-aggression-image`}>
                        {aggressionTypes[selectedAggressionType].icon}
                      </span>
                      <div className="text-xs sm:text-sm text-muted-foreground font-medium px-4">
                        Image placeholder for {aggressionTypes[selectedAggressionType].type}
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="flex items-start gap-4 mb-6">
                      <span className="text-4xl sm:text-5xl" data-testid={`icon-aggression-content`}>
                        {aggressionTypes[selectedAggressionType].icon}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold" data-testid={`text-aggression-content-title`}>
                        {aggressionTypes[selectedAggressionType].type}
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-base sm:text-lg font-medium text-foreground" data-testid={`text-aggression-content-description`}>
                        {aggressionTypes[selectedAggressionType].description}
                      </p>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed" data-testid={`text-aggression-content-details`}>
                        {aggressionTypes[selectedAggressionType].details}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
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
            Why Choose Us for Aggression Cases
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: "30 Years", description: "Behavior modification expertise" },
              { label: "300+ Cases", description: "Aggression successfully managed" },
              { label: "Safety First", description: "Humane, evidence-based protocols" },
              { label: "Customized", description: "Every dog is unique" }
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
              Our Approach
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold px-2" data-testid="text-philosophy-title">
              Safe, Scientific, and Compassionate
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: Shield,
                title: "Safety Priority",
                description: "Every protocol prioritizes the safety of your family, your dog, and the public."
              },
              {
                icon: Brain,
                title: "Root Cause Focus",
                description: "We identify why aggression occurs, not just suppress symptoms temporarily."
              },
              {
                icon: Heart,
                title: "Humane Methods",
                description: "Evidence-based behavior modification without punishment or force escalation."
              },
              {
                icon: Users,
                title: "Owner Education",
                description: "We teach you to read your dog, manage triggers, and maintain long-term progress."
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

      {/* Assessment & Safety Process Section */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-process-label">
              How We Work
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-process-title">
              Our Assessment & Safety Process
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-process-subtitle">
              Every aggression case follows a structured protocol to ensure safety and effectiveness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Eye,
                title: "Comprehensive Evaluation",
                description: "We assess triggers, intensity levels, bite history, body language, and environmental factors to understand the full picture."
              },
              {
                icon: AlertTriangle,
                title: "Risk Assessment",
                description: "We determine safety protocols, management strategies, and whether your case requires specialized handling or referrals."
              },
              {
                icon: CheckCircle2,
                title: "Custom Protocol",
                description: "You receive a detailed behavior modification plan with clear milestones, safety guidelines, and realistic timelines."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background p-6 sm:p-8 rounded-xl shadow-sm"
                data-testid={`card-process-${index}`}
              >
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 mb-4 sm:mb-6 mx-auto">
                  <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" data-testid={`icon-process-${index}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-center" data-testid={`text-process-step-title-${index}`}>
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground text-center" data-testid={`text-process-step-description-${index}`}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 sm:mt-12 bg-[hsl(0,84%,60%)] p-6 sm:p-8 rounded-xl text-white"
            data-testid="card-important-note"
          >
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 mt-1" data-testid="icon-important-note" />
              <div>
                <p className="text-sm sm:text-base text-white/90" data-testid="text-important-note-description">
                  Canine aggression is not a problem that yields to rapid solutions. It requires a structured, time-intensive approach, which hinges on multiple factors. These factors include the specific type of aggression, the dog's intrinsic capacity for behavioral modification, its motivational drivers, and numerous other variables. These elements collectively influence the timeline and complexity of achieving meaningful behavioral change.
                </p>
              </div>
            </div>
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
                  q: "Can all aggressive dogs be rehabilitated?",
                  a: "Most cases show significant improvement with proper training, but success depends on history, severity, consistency, and underlying causes. We provide honest assessments and realistic expectations during evaluation."
                },
                {
                  q: "How long does aggression training take?",
                  a: "Every dog is different. The timeline depends on the type and severity of the aggression, the dog's temperament, and the owner's consistency with training. Many dogs show improvement within a few weeks, but more serious cases may take several months. Aggression rehabilitation is a process, not a quick fix, and lasting results require commitment and consistency from the owner."
                },
                {
                  q: "Do you use shock collars or punishment?",
                  a: "We use humane, science-based methods tailored to each dog. Tools are introduced only when appropriate for safety and effectiveness, always with clear guidance and your informed consent."
                },
                {
                  q: "What if my dog has bitten someone?",
                  a: "Bite history is taken seriously. We assess the context, severity, and patterns to determine if training is safe and appropriate. Some cases may require veterinary behaviorist referral or specialized protocols."
                },
                {
                  q: "Will my dog ever be 'normal' around other dogs?",
                  a: "Goals are individualized. Some dogs achieve full social comfort; others learn controlled tolerance. We focus on safety, quality of life, and realistic outcomes based on your dog's specific triggers and history."
                },
                {
                  q: "Can I work with my dog myself, or do I need a trainer?",
                  a: "Aggression requires professional expertise for safety and effectiveness. DIY attempts often worsen the behavior or create dangerous situations. We teach you the skills to maintain progress after training ends."
                }
              ]}
              itemClassName="bg-muted/30 px-4 sm:px-6 rounded-lg border-none"
              triggerClassName="text-left text-sm sm:text-base font-semibold hover:no-underline py-4 sm:py-5"
              contentClassName="text-sm sm:text-base text-muted-foreground pb-4 sm:pb-5"
              data-testid="accordion-faq"
              testIdPrefix="accordion-faq"
            />
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AggressionManagement;
