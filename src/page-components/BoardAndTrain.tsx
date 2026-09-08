"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  MapPin,
  Clock,
  Target,
  Shield,
  Users,
  CheckCircle,
  Sun,
  Moon,
  Coffee,
  Heart,
  Scale,
  BookOpen,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useBookingModal } from "@/contexts/BookingModalContext";
import Link from "next/link";

const BoardAndTrain = () => {
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
              Board & Train Dog Training Program
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2" data-testid="text-hero-subtitle">
              Intensive, Structured Training Designed for Real Results
            </p>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto px-2" data-testid="text-hero-description">
              Our Board & Train program is an immersive dog training experience where your dog stays with professional trainers and follows a structured, daily training routine.
            </p>
            <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14" onClick={openModal} data-testid="button-hero-book">
              Schedule Behavioral Evaluation
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* What Is Board & Train Section */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-what-is-label">
                About The Program
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6" data-testid="text-what-is-title">
                What Is a Board & Train Program?
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-muted-foreground">
                <p data-testid="text-what-is-description">
                  A Board & Train program is an intensive dog training solution where your dog lives and trains with our professional trainers for a defined period of time. During this stay, dogs participate in multiple daily training sessions focused on obedience commands, behavior improvement, and structured routines.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Target, title: "Controlled Environment", description: "Professional dog training in optimal conditions" },
                { icon: Clock, title: "Daily Sessions", description: "Consistent, structured training every day" },
                { icon: BookOpen, title: "Clear Communication", description: "Structured routines and expectations" },
                { icon: Sparkles, title: "Real-Life Application", description: "Training that translates to everyday situations" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-background p-4 sm:p-5 rounded-xl shadow-sm border border-border"
                  data-testid={`card-emphasis-${index}`}
                >
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Is Board & Train Right for Your Dog Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-right-fit-label">
              Is It Right For You?
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-right-fit-title">
              Is Board & Train Right for Your Dog?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-right-fit-subtitle">
              This program is <span className="font-semibold">not a one-size-fits-all solution</span>, which is why every dog starts with a professional behavioral evaluation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              { text: "Your dog struggles with obedience or impulse control" },
              { text: "Behavioral issues require consistency and structure" },
              { text: "You have limited time for daily training sessions" },
              { text: "Your dog needs a reset in routine and expectations" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4 bg-muted/30 p-5 sm:p-6 rounded-xl"
                data-testid={`card-fit-${index}`}
              >
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-base sm:text-lg">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Philosophy Section */}
      <section className="py-12 sm:py-20 bg-muted/30">
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-philosophy-title">
              Our Training Philosophy and Method
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-philosophy-description">
              Each Board & Train program is customized based on the dog's behavior, temperament, and learning style. Our trainers focus on long-term results—not quick fixes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: Users,
                title: "Experience & Guidance",
                description: "Professional trainers with extensive hands-on experience"
              },
              {
                icon: BookOpen,
                title: "Clear Communication",
                description: "Consistent messaging that dogs understand"
              },
              {
                icon: Scale,
                title: "Structure & Consistency",
                description: "Reliable routines that build lasting habits"
              },
              {
                icon: Shield,
                title: "Safety & Welfare",
                description: "Realistic expectations with your dog's wellbeing first"
              }
            ].map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background p-6 sm:p-8 rounded-xl shadow-sm border border-border"
                data-testid={`card-philosophy-${index}`}
              >
                <pillar.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-3">{pillar.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Typical Day Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-typical-day-label">
              Daily Routine
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-typical-day-title">
              What a Typical Day Looks Like
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-typical-day-description">
              This balance between training, structure, and rest helps dogs learn effectively without unnecessary stress.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              { icon: Sun, title: "Morning Training", description: "Obedience training sessions to start the day focused" },
              { icon: Target, title: "Controlled Walks", description: "Leash manners and structured outdoor time" },
              { icon: BookOpen, title: "Command Reinforcement", description: "Practice and reinforcement of obedience commands" },
              { icon: Heart, title: "Behavior Exercises", description: "Targeted exercises for specific behavioral goals" },
              { icon: Coffee, title: "Rest & Recovery", description: "Scheduled downtime to process learning" },
              { icon: Moon, title: "Evening Routine", description: "Calm activities and structured settling" }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4 bg-muted/30 p-5 sm:p-6 rounded-xl"
                data-testid={`card-activity-${index}`}
              >
                <activity.icon className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section Placeholder */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-video-label">
              See It In Action
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-video-title">
              Our Board & Train Program
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-video-description">
              Watch our trainers work with dogs in our facility to understand our approach and what to expect.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-video bg-background rounded-xl border-2 border-dashed border-border flex items-center justify-center"
            data-testid="video-placeholder"
          >
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-muted-foreground">Video coming soon</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expected Results Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-results-label">
                What To Expect
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6" data-testid="text-results-title">
                Expected Results and Owner Involvement
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-muted-foreground">
                <p data-testid="text-results-description">
                  Board & Train programs can deliver strong foundational results, but <span className="font-semibold text-foreground">long-term success depends on owner follow-through</span>.
                </p>
                <p>
                  Owners receive transition guidance and recommendations to ensure training continues successfully after the program.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {[
                { title: "Improved Obedience", description: "Better responsiveness to commands and cues" },
                { title: "Structure Awareness", description: "Your dog understands routines and expectations" },
                { title: "Clear Guidance", description: "Detailed recommendations for maintaining results at home" }
              ].map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-background p-5 sm:p-6 rounded-xl shadow-sm border border-border"
                  data-testid={`card-result-${index}`}
                >
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">{result.title}</h3>
                    <p className="text-sm text-muted-foreground">{result.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
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
              Board & Train FAQs
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Accordion type="single" collapsible className="w-full space-y-3">
              {[
                {
                  question: "How long does a board and train program last?",
                  answer: "Program length varies depending on the dog's needs and behavioral goals. This is discussed during the evaluation to create a customized timeline that works for your specific situation."
                },
                {
                  question: "Is board and train safe for dogs?",
                  answer: "Yes. Safety, welfare, and appropriate training intensity are top priorities throughout the program. We ensure your dog is comfortable, well-cared for, and never pushed beyond healthy limits."
                },
                {
                  question: "Does board and train work for aggressive dogs?",
                  answer: "Some behavioral issues may qualify, while others require specialized programs. A professional evaluation is required to determine the best approach for dogs with aggression or reactivity concerns."
                },
                {
                  question: "Will I receive follow-up training?",
                  answer: "Yes. Owner guidance and follow-up recommendations are provided to support long-term success. We work with you during transition sessions to ensure you can maintain all trained behaviors at home."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-muted/30 px-4 sm:px-6 rounded-lg border-none" data-testid={`accordion-faq-${index}`}>
                  <AccordionTrigger className="text-left text-base sm:text-lg font-medium hover:no-underline py-4 sm:py-5" data-testid={`trigger-faq-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-4 sm:pb-5" data-testid={`content-faq-${index}`}>
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
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-cta-description">
              Book a Behavioral Evaluation to see if Board & Train is right for your dog. Our evaluation helps determine the most effective training path for your dog's specific needs.
            </p>
            <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14" onClick={openModal} data-testid="button-cta-book">
              Schedule Your Evaluation Today
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Related Services Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-related-label">
              Explore More
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold px-2" data-testid="text-related-title">
              Related Training Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { title: "Aggression Management", href: "/aggression-management", description: "Specialized support for reactive or aggressive behaviors" },
              { title: "Obedience Training", href: "/obedience", description: "Foundation commands and everyday manners" },
              { title: "Puppy Training", href: "/puppy-training", description: "Early development and socialization" },
              { title: "Boot Camp Training", href: "/bootcamp", description: "Intensive immersive programs" }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={service.href} className="block" data-testid={`link-service-${index}`}>
                  <div className="bg-muted/30 p-5 sm:p-6 rounded-xl hover:bg-muted/50 transition-colors h-full">
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BoardAndTrain;
