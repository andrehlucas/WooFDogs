"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  MapPin,
  Heart,
  Scale,
  BookOpen,
  Users,
  Award,
  Home,
  Tent,
  Shield,
  Brain,
  HandHeart,
  Video,
  Play,
  ClipboardCheck,
  FileText,
  GraduationCap,
  CheckCircle2,
  Target,
  BadgeCheck,
  RefreshCw,
  AlertTriangle,
  Stethoscope,
  Dog
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { ServiceAreasSection } from "@/components/ServiceAreasSection";

const ServiceAnimalTraining = () => {
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
              <span className="text-xs sm:text-sm font-medium">Serving Boca Raton, Delray, Wellington, Palm Beach Gardens & More</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2" data-testid="text-hero-title">
              Professional Service Animal Training
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2" data-testid="text-hero-subtitle">
              Specialized training for service dogs that provide life-changing support to individuals with disabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14" onClick={openModal} data-testid="button-hero-book">
                Book Evaluation
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14" data-testid="button-hero-learn">
                Learn More
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
                  Task Training, Public Access Skills & Handler Coaching
                </h2>
                <div className="space-y-4 text-base sm:text-lg text-muted-foreground">
                  <p data-testid="text-overview-paragraph-0">
                    Our Service Animal Training program is designed to prepare dogs for critical support roles. We specialize in training dogs to assist individuals with physical disabilities, PTSD, anxiety disorders, and other conditions requiring dedicated canine support.
                  </p>
                  <p data-testid="text-overview-paragraph-1">
                    Every service dog candidate undergoes a comprehensive behavioral and temperament assessment. We evaluate stability, trainability, focus, and handler bonding to ensure the dog has the foundation needed for advanced service work.
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  {
                    name: "Task-Specific Training",
                    icon: Shield,
                    description: "Customized training for specific tasks such as mobility assistance, medical alerts, psychiatric support, and more."
                  },
                  {
                    name: "Public Access Training",
                    icon: Users,
                    description: "Advanced socialization and behavior standards to ensure reliable, calm performance in all public environments."
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
                All service animal training follows ADA standards and evidence-based methods.
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
                      Start Your Journey
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground mb-6" data-testid="text-book-description">
                      Schedule an evaluation to assess your dog's suitability for service work and discuss your specific needs.
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

      {/* Path to Certification Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-certification-label">
              Your Roadmap
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-certification-title">
              Path to Service Animal Certification
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-2" data-testid="text-certification-description">
              Here's what the journey looks like from your first visit to a fully certified Woof Dogs service animal.
            </p>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/60 to-primary/20 hidden sm:block" aria-hidden="true" />

            {[
              {
                step: 1,
                title: "Initial Consultation & Evaluation",
                description: "All service animals must have an initial consultation with a certified Woof Dogs service animal evaluator. We'll discuss your goals, the specific tasks you need, and evaluate your dog's behavior, temperament, and previous training. Not every dog is suited for service work — this step helps us determine the best path forward.",
                icon: ClipboardCheck,
              },
              {
                step: 2,
                title: "Doctor's Letter",
                description: "A letter from a licensed medical professional verifying the need for a service animal is required as part of the certification process.",
                icon: Stethoscope,
              },
              {
                step: 3,
                title: "Obedience Training",
                description: "Your dog will undergo foundational obedience training to build reliable responses to commands, impulse control, and calm behavior — the building blocks for all advanced service work.",
                icon: GraduationCap,
              },
              {
                step: 4,
                title: "Pass the CGC & CGCA Tests",
                description: "Your dog must pass the Canine Good Citizen (CGC) and Canine Good Citizen Advanced (CGCA) tests, demonstrating solid manners and dependable behavior in everyday situations.",
                icon: CheckCircle2,
              },
              {
                step: 5,
                title: "Public Access Training",
                description: "Advanced training to ensure your dog remains calm, focused, and well-behaved in all public environments — including stores, restaurants, airports, and busy streets.",
                icon: Users,
              },
              {
                step: 6,
                title: "Specific Task Training",
                description: "Your dog will be trained in two or more specific tasks tailored to your needs, such as mobility assistance, medical alerts, anxiety interruption, or other disability-related support.",
                icon: Target,
              },
              {
                step: 7,
                title: "Pass the WDSAT1 & WDSAT2 Tests",
                description: "Your dog must pass the Woof Dogs Service Animal Tests (WDSAT1 & WDSAT2), our comprehensive evaluations that verify your dog can reliably perform trained tasks and meet all required standards.",
                icon: Award,
              },
              {
                step: 8,
                title: "Certified Service Animal",
                description: "Upon successful completion of all tests, your dog becomes a Woof Dogs Certified Service Animal and receives a service animal identification card valid for one year.",
                icon: BadgeCheck,
              },
              {
                step: 9,
                title: "Yearly Renewal",
                description: "Certification must be renewed annually. Each year, your dog is retested to ensure they can still perform required tasks and meet Woof Dogs standards. Woof Dogs will not verify certification past the expiration date.",
                icon: RefreshCw,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative flex gap-4 sm:gap-6 mb-6 sm:mb-8 last:mb-0"
                data-testid={`step-certification-${item.step}`}
              >
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                    <item.icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                </div>
                <div className="flex-1 bg-background border border-border rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full" data-testid={`badge-step-${item.step}`}>
                      Step {item.step}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2" data-testid={`text-step-title-${item.step}`}>
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed" data-testid={`text-step-description-${item.step}`}>
                    {item.description}
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
            className="max-w-3xl mx-auto mt-8 sm:mt-10"
          >
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-5 sm:p-6" data-testid="card-certification-disclaimers">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm sm:text-base text-amber-900 dark:text-amber-200" data-testid="text-disclaimer-title">
                    Important Information
                  </h4>
                  <ul className="space-y-2 text-sm sm:text-base text-amber-800 dark:text-amber-300">
                    <li className="flex items-start gap-2" data-testid="text-disclaimer-timeline">
                      <span className="font-bold mt-0.5">•</span>
                      <span><strong>No fixed timeline:</strong> Training programs do not follow a specific timeline. Every client and service animal candidate trains at a different level and schedule.</span>
                    </li>
                    <li className="flex items-start gap-2" data-testid="text-disclaimer-order">
                      <span className="font-bold mt-0.5">•</span>
                      <span><strong>Flexible step order:</strong> While all steps must be completed, the order may change or steps may overlap at the trainer's discretion based on each dog's progress.</span>
                    </li>
                    <li className="flex items-start gap-2" data-testid="text-disclaimer-guarantee">
                      <span className="font-bold mt-0.5">•</span>
                      <span><strong>No guarantee of passing:</strong> Training a dog for service work is an extensive process with many factors involved. We cannot guarantee that any dog will pass all required tests. Even very well-behaved dogs may not meet the standards needed for service work.</span>
                    </li>
                    <li className="flex items-start gap-2" data-testid="text-disclaimer-handler">
                      <span className="font-bold mt-0.5">•</span>
                      <span><strong>Handler participation required:</strong> Clients and family members must follow the instructions of the Woof Dogs certified trainer and consistently reinforce training between sessions.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-videos-label">
              Success Stories
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-videos-title">
              Real Service Dogs, Real Impact
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-videos-description">
              Watch our service animal training success stories and see the life-changing results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "PTSD Service Dog - Max",
                description: "Trained for veteran support and anxiety alerts",
                thumbnail: "video-thumbnail-1"
              },
              {
                title: "Mobility Assistance - Bella",
                description: "Helping with daily tasks and balance support",
                thumbnail: "video-thumbnail-2"
              },
              {
                title: "Medical Alert Dog - Luna",
                description: "Diabetes alert and emergency response training",
                thumbnail: "video-thumbnail-3"
              }
            ].map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-muted/30 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                data-testid={`card-video-${index}`}
              >
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-primary ml-1" data-testid={`icon-play-${index}`} />
                    </div>
                  </div>
                  <Video className="w-16 h-16 text-primary/30" />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold mb-2" data-testid={`text-video-title-${index}`}>
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-video-description-${index}`}>
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-base text-muted-foreground text-center mt-8 italic"
            data-testid="text-videos-note"
          >
            Note: Video content coming soon. These represent our successful service dog training cases.
          </motion.p>
        </div>
      </section>

      {/* As Seen On Section */}
      <section className="py-12 sm:py-16 bg-primary/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl font-bold text-center mb-8 sm:mb-10 px-2"
            data-testid="text-media-title"
          >
            As Seen On
          </motion.h2>

          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            {[
              { name: "CBS", width: "w-20 sm:w-24" },
              { name: "WPBTV", width: "w-24 sm:w-28" },
              { name: "Local News", width: "w-28 sm:w-32" },
              { name: "South Florida Times", width: "w-32 sm:w-36" }
            ].map((outlet, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`${outlet.width} h-12 sm:h-16 flex items-center justify-center`}
                data-testid={`media-outlet-${index}`}
              >
                <div className="w-full h-full bg-muted/40 rounded-lg flex items-center justify-center border border-border/50">
                  <span className="text-xs sm:text-sm font-bold text-muted-foreground" data-testid={`text-outlet-${index}`}>
                    {outlet.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Approach Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-approach-label">
              Training Approach
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold px-2" data-testid="text-approach-title">
              Our Service Dog Training Philosophy
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: Heart,
                title: "Handler-Focused",
                description: "We train the dog-handler team as a unit, building trust and clear communication."
              },
              {
                icon: Brain,
                title: "Task Precision",
                description: "Every behavior is shaped to meet exact service requirements and reliability standards."
              },
              {
                icon: Shield,
                title: "ADA Compliant",
                description: "All training follows ADA guidelines for service animal behavior and public access rights."
              },
              {
                icon: HandHeart,
                title: "Ongoing Support",
                description: "Continued guidance to maintain skills and address challenges as they arise."
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
              Life-Changing Partnerships
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-testimonials-description">
              Hear from handlers whose lives have been transformed by their service dogs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                quote: "My service dog has given me independence I never thought possible. The training was thorough and life-changing.",
                author: "David Martinez",
                dog: "Max, PTSD Service Dog"
              },
              {
                quote: "The team understood exactly what I needed. My mobility assistance dog is well-trained and so well-behaved in public.",
                author: "Jennifer Williams",
                dog: "Bella, Mobility Assistance"
              },
              {
                quote: "Having a medical alert dog has literally saved my life multiple times. The training quality is exceptional.",
                author: "Robert Chen",
                dog: "Luna, Diabetic Alert Dog"
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
                </div>
              </motion.div>
            ))}
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
                  q: "What types of service dogs do you train?",
                  a: "We train service dogs for PTSD, anxiety disorders, mobility assistance, medical alerts (diabetes, seizures), autism support, and other ADA-recognized disabilities."
                },
                {
                  q: "How long does service dog training take?",
                  a: "Training programs do not follow a specific timeline — every client and service animal candidate trains at a different level and schedule. The steps may also change order or overlap at the trainer's discretion. Our goal is to complete a successful training program to the best of our abilities."
                },
                {
                  q: "Can any dog become a service dog?",
                  a: "Not every dog is suited for service work. During the initial consultation, our evaluator will assess your dog's behavior, temperament, and previous training. Training a dog for service work is an extensive process with many factors involved, and we cannot guarantee that any dog will pass all the required tests."
                },
                {
                  q: "What certification do you provide?",
                  a: "Upon passing the CGC, CGCA, and Woof Dogs Service Animal Tests (WDSAT1 & WDSAT2), your dog becomes a Woof Dogs Certified Service Animal and receives a service animal identification card valid for one year. Certification must be renewed yearly by retesting."
                },
                {
                  q: "What happens during the initial evaluation?",
                  a: "A certified Woof Dogs evaluator will discuss your goals for the service animal, the specific tasks you'd like the animal to perform, your dog's behavior and temperament, and any previous obedience training. We'll also run preliminary assessments to help determine your dog's suitability for service work."
                },
                {
                  q: "What is my responsibility as a handler?",
                  a: "You and any family members must follow the instructions of the Woof Dogs certified trainer and consistently reinforce training between sessions. Training may occur in various locations including your home, our training center, airports, and malls."
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

export default ServiceAnimalTraining;
