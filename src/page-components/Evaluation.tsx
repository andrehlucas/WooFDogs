"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  MapPin,
  Home,
  Building2,
  Video,
  ClipboardCheck,
  Brain,
  Target,
  Heart,
  TrendingUp,
  Users,
  CheckCircle2,
  Calendar,
  FileText,
  MessageSquare,
  ChevronDown,
  Clock,
  DollarSign,
  PackageCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useBookingModal } from "@/contexts/BookingModalContext";

const Evaluation = () => {
  const [expandedLocation, setExpandedLocation] = useState<number | null>(null);
  const { openModal } = useBookingModal();

  const scrollToLocations = () => {
    const locationsSection = document.getElementById('location-options');
    if (locationsSection) {
      locationsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
              Professional Behavioral Evaluation
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2" data-testid="text-hero-subtitle">
              Every successful training journey starts here. A comprehensive assessment of your dog's temperament, skills, and needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14" onClick={openModal} data-testid="button-hero-book">
                Schedule Evaluation
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14" onClick={scrollToLocations} data-testid="button-hero-locations">
                View Location Options
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview & Booking Section */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 sm:mb-8">
                <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-overview-label">
                  Why Evaluation Matters
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-overview-title">
                  Understanding Your Dog Is Step One
                </h2>
                <div className="space-y-4 text-base sm:text-lg text-muted-foreground">
                  <p data-testid="text-overview-paragraph-0">
                    No two dogs are alike. Our professional evaluation assesses your dog's unique personality, current skills, motivation style, and behavioral challenges to create a training plan that actually works.
                  </p>
                  <p data-testid="text-overview-paragraph-1">
                    During the evaluation (approximately 40 minutes), we'll discuss your dog's behavior in their environment, review your goals, and identify the best path forward, whether that's obedience training, behavioral modification, or puppy development.
                  </p>
                  <p data-testid="text-overview-paragraph-2">
                    You'll walk away with clarity, a customized roadmap, and realistic expectations for your training journey.
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-primary/5 p-5 sm:p-6 rounded-xl border border-primary/20"
                data-testid="card-included"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-4" data-testid="text-included-title">
                  What's Included:
                </h3>
                <ul className="space-y-2">
                  {[
                    "Comprehensive temperament assessment",
                    "Current skill level evaluation",
                    "Behavioral pattern analysis",
                    "Learning style identification",
                    "Personalized training recommendations"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3" data-testid={`item-included-${index}`}>
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid={`icon-included-${index}`} />
                      <span className="text-sm sm:text-base" data-testid={`text-included-${index}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
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
                      Get Started
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3" data-testid="text-book-title">
                      Book Your Evaluation
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground mb-6" data-testid="text-book-description">
                      Choose your preferred location and time. We'll confirm within 24 hours.
                    </p>
                  </div>
                  <Button 
                    onClick={openModal}
                    className="w-full h-11 text-base bg-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,55%)]" 
                    size="lg" 
                    data-testid="button-submit"
                  >
                    Schedule Now
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

      {/* Location Options Section */}
      <section id="location-options" className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-locations-label">
              Evaluation Locations
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-locations-title">
              Choose Where You'd Like to Meet
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-locations-subtitle">
              We offer three convenient ways to complete your evaluation based on your preferences and needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Home,
                title: "In-Home Evaluation",
                description: "We come to you and assess your dog in their natural environment.",
                benefits: [
                  "See behavior in familiar setting",
                  "Address household-specific issues",
                  "Include family members easily",
                  "In-home evaluations are for non-aggression cases only.",
                  "No travel stress for your dog"
                ],
                ideal: "Best for dogs with minor obedience issues that do not involve aggression.",
                color: "primary"
              },
              {
                icon: Building2,
                title: "Training Center Evaluation",
                description: "Visit our professional training facility in a controlled environment.",
                benefits: [
                  "Neutral, distraction-controlled space",
                  "Access to training equipment",
                  "Assess behavior in new environment",
                  "Meet our team and facility",
                  "Structured evaluation setting"
                ],
                ideal: "Required for dogs with aggression concerns. Also ideal for those considering board & train.",
                color: "primary"
              },
              {
                icon: Video,
                title: "Virtual Evaluation",
                description: "Connect with our trainer via video call for remote assessment and guidance.",
                benefits: [
                  "Convenient from anywhere",
                  "Flexible scheduling",
                  "Perfect for distance clients",
                  "Review video footage together",
                  "Get expert guidance remotely"
                ],
                ideal: "Best for follow-ups, basic evaluations, or clients outside our service area.",
                color: "primary"
              }
            ].map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background rounded-xl border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-lg overflow-hidden"
                data-testid={`card-location-${index}`}
              >
                <div className="p-6 sm:p-8">
                  <location.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4" data-testid={`icon-location-${index}`} />
                  <h3 className="text-lg sm:text-xl font-semibold mb-3" data-testid={`text-location-title-${index}`}>
                    {location.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4" data-testid={`text-location-description-${index}`}>
                    {location.description}
                  </p>

                  <Button 
                    variant="ghost" 
                    className="w-full mb-3 justify-between"
                    onClick={() => setExpandedLocation(expandedLocation === index ? null : index)}
                    data-testid={`button-learn-more-${index}`}
                  >
                    View Benefits
                    <motion.div
                      animate={{ rotate: expandedLocation === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </Button>

                  <AnimatePresence>
                    {expandedLocation === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                        data-testid={`expanded-content-${index}`}
                      >
                        <div className="pt-4 border-t space-y-4">
                          <div>
                            <h4 className="font-semibold text-sm mb-2" data-testid={`text-benefits-title-${index}`}>Benefits:</h4>
                            <ul className="space-y-2">
                              {location.benefits.map((benefit, bIndex) => (
                                <li key={bIndex} className="flex items-start gap-2 text-sm text-muted-foreground" data-testid={`item-benefit-${index}-${bIndex}`}>
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                  <span data-testid={`text-benefit-${index}-${bIndex}`}>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="pt-3 border-t">
                            <p className="text-xs sm:text-sm text-primary font-medium" data-testid={`text-ideal-${index}`}>
                              {location.ideal}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Assess Section */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-assess-label">
              Assessment Components
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold px-2" data-testid="text-assess-title">
              What We Evaluate
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: Brain,
                title: "Temperament",
                description: "Confidence level, social comfort, stress signals, and overall disposition."
              },
              {
                icon: ClipboardCheck,
                title: "Current Skills",
                description: "Existing obedience commands, response reliability, and foundation behaviors."
              },
              {
                icon: Target,
                title: "Behavioral Patterns",
                description: "Leash reactivity, anxiety triggers, aggression indicators, and problem behaviors."
              },
              {
                icon: Heart,
                title: "Motivation Style",
                description: "What drives your dog (food, toys, praise, or play) and how to leverage it."
              },
              {
                icon: TrendingUp,
                title: "Learning Readiness",
                description: "Focus ability, distraction threshold, and cognitive engagement capacity."
              },
              {
                icon: Users,
                title: "Social Dynamics",
                description: "Interaction with family members, other pets, and household routines."
              }
            ].map((component, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background p-6 sm:p-8 rounded-xl"
                data-testid={`card-component-${index}`}
              >
                <component.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4" data-testid={`icon-component-${index}`} />
                <h3 className="text-lg sm:text-xl font-semibold mb-3" data-testid={`text-component-title-${index}`}>
                  {component.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground" data-testid={`text-component-description-${index}`}>
                  {component.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process Timeline */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-process-label">
              The Process
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-process-title">
              How the Evaluation Works
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-process-subtitle">
              A simple, stress-free process designed to give you clarity and direction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
            {[
              {
                icon: Calendar,
                number: "1",
                title: "Schedule",
                description: "Book your preferred date, time, and location option."
              },
              {
                icon: ClipboardCheck,
                number: "2",
                title: "Evaluation",
                description: "Up to 40 minutes — a professional assessment with your dog."
              },
              {
                icon: FileText,
                number: "3",
                title: "Analysis",
                description: "We analyze findings and develop a customized plan."
              },
              {
                icon: MessageSquare,
                number: "4",
                title: "Recommendations",
                description: "Review your written summary and training roadmap."
              },
              {
                icon: ArrowRight,
                number: "5",
                title: "Next Steps",
                description: "Choose your program and start your training journey."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
                data-testid={`card-step-${index}`}
              >
                <div className="bg-muted/30 p-6 rounded-xl h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold" data-testid={`number-step-${index}`}>
                      {step.number}
                    </div>
                    <step.icon className="w-6 h-6 text-primary" data-testid={`icon-step-${index}`} />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2" data-testid={`text-step-title-${index}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-step-description-${index}`}>
                    {step.description}
                  </p>
                </div>
                {index < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10" data-testid={`arrow-step-${index}`}>
                    <ArrowRight className="w-5 h-5 text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Benefits Section */}
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
            Why Start with an Evaluation
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Clock, label: "up to 40 minutes", description: "Professional assessment" },
              { icon: PackageCheck, label: "Personalized", description: "Custom training plan" },
              { icon: DollarSign, label: "Transparent", description: "Clear pricing & options" },
              { icon: CheckCircle2, label: "Expert", description: "Certified trainers" }
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
                <badge.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary mx-auto mb-3" />
                <div className="text-lg sm:text-xl font-bold text-primary mb-1" data-testid={`text-badge-label-${index}`}>
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

      {/* FAQ Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-faq-label">
              Questions
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold px-2" data-testid="text-faq-title">
              Evaluation FAQs
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full" data-testid="accordion-faq">
              {[
                {
                  question: "How long does the evaluation take?",
                  answer: "The evaluation is up to 40 minutes. This includes observing your dog, discussing your goals and challenges, demonstrating assessment exercises, and reviewing our recommendations."
                },
                {
                  question: "What should I prepare before the evaluation?",
                  answer: "Have your dog's vaccination records handy, make a list of specific behaviors or goals you'd like to address, and gather any training tools you currently use (leash, collar, treats). For in-home evaluations, just ensure we have space to work safely with your dog."
                },
                {
                  question: "How much does an evaluation cost?",
                  answer: "In-home evaluations are $100, virtual and training center evaluations are $50."
                },
                {
                  question: "Is the evaluation required before training?",
                  answer: "Yes, we require an evaluation for all new clients. This ensures we fully understand your dog's needs and can recommend the right program level and format. It also gives you a chance to meet us and ask questions before committing to training."
                },
                {
                  question: "What happens after the evaluation?",
                  answer: "Within 24-48 hours, you'll receive a written evaluation summary including our findings, behavioral observations, and personalized training recommendations. We'll outline the best program options for your dog and provide clear next steps to get started."
                },
                {
                  question: "Can I bring family members to the evaluation?",
                  answer: "Absolutely! We encourage all household members who interact with the dog to attend. This helps us understand family dynamics and ensures everyone is on the same page with training goals and techniques."
                },
                {
                  question: "What if my dog has aggression or severe anxiety?",
                  answer: "We work with dogs of all temperaments, including those with aggression, reactivity, or anxiety. Please inform us of any behavioral concerns when booking so we can prepare appropriately and ensure everyone's safety during the evaluation."
                },
                {
                  question: "Do you offer evaluations for puppies?",
                  answer: "Yes! Puppy evaluations focus on early development, socialization needs, and foundation training. We assess temperament, bite inhibition, house training progress, and create a customized plan for your puppy's critical early months."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-item-${index}`}>
                  <AccordionTrigger className="text-left" data-testid={`faq-question-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground" data-testid={`faq-answer-${index}`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-20 bg-primary/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-cta-title">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2" data-testid="text-cta-subtitle">
              Book your evaluation today and take the first step toward a better-behaved, happier dog.
            </p>
            <Button 
              size="lg" 
              className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14"
              onClick={openModal}
              data-testid="button-cta-book"
            >
              Schedule Your Evaluation
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Evaluation;
