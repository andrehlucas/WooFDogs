"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  MapPin,
  Heart,
  Sparkles,
  BookOpen,
  Users,
  Home,
  Building2,
  Shield,
  Brain,
  HandHeart,
  Smile,
  GraduationCap,
  Baby,
  Hospital,
  School,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useBookingModal } from "@/contexts/BookingModalContext";

const TherapyDog = () => {
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
              Therapy Dog Certification Training
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2" data-testid="text-hero-subtitle">
              Prepare your dog to bring comfort, joy, and healing to those in need through professional therapy dog training and certification.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14" onClick={openModal} data-testid="button-hero-book">
                Book Evaluation
                <ArrowRight className="ml-2" size={20} />
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
                  Therapy Dog Training & Certification
                </h2>
                <div className="space-y-4 text-base sm:text-lg text-muted-foreground">
                  <p data-testid="text-overview-paragraph-0">
                    Our Therapy Dog Training program prepares dogs and handlers to make a meaningful difference in the lives of others. Therapy dogs visit hospitals, schools, nursing homes, and community centers, providing emotional support and comfort to people facing challenging situations.
                  </p>
                  <p data-testid="text-overview-paragraph-1">
                    We work with you through the entire certification process, from initial temperament assessment to advanced training and official therapy dog testing. Your dog will learn to remain calm, gentle, and focused in unpredictable environments while interacting with diverse populations.
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  {
                    name: "Temperament & Behavior Assessment",
                    icon: Heart,
                    description: "Comprehensive evaluation of your dog's temperament, social skills, and readiness for therapy work in various settings."
                  },
                  {
                    name: "Certification Preparation",
                    icon: GraduationCap,
                    description: "Structured training to meet therapy dog certification standards, including obedience, handling, and environmental exposure."
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
            </motion.div>

            {/* Right Column - Booking CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-24 h-fit"
            >
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 rounded-2xl p-6 sm:p-8 shadow-lg">
                <div className="text-center mb-6">
                  <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-4" data-testid="icon-booking-main" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-3" data-testid="text-booking-title">
                    Start Your Therapy Dog Journey
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6" data-testid="text-booking-description">
                    Begin with a professional evaluation to assess your dog's suitability for therapy work and create a personalized training plan.
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    "Temperament assessment",
                    "Certification pathway guidance",
                    "Customized training plan",
                    "Handler coaching included"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3" data-testid={`item-booking-benefit-${index}`}>
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-sm sm:text-base">{item}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  size="lg" 
                  className="w-full text-base sm:text-lg h-12 sm:h-14"
                  onClick={openModal}
                  data-testid="button-booking-cta"
                >
                  Book Your Evaluation
                  <ArrowRight className="ml-2" size={20} />
                </Button>

                <p className="text-xs sm:text-sm text-center text-muted-foreground mt-4" data-testid="text-booking-note">
                  Professional evaluation required for all therapy dog candidates
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Makes a Great Therapy Dog */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-qualities-label">
              Essential Qualities
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-qualities-title">
              What Makes a Great Therapy Dog
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-qualities-subtitle">
              Successful therapy dogs possess a unique combination of temperament, training, and social skills that enable them to provide comfort in any environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Smile,
                title: "Calm & Gentle Temperament",
                description: "Naturally friendly, patient, and comfortable with being touched, petted, and handled by strangers of all ages."
              },
              {
                icon: Shield,
                title: "Solid Obedience Foundation",
                description: "Reliable response to basic commands and excellent impulse control in distracting environments."
              },
              {
                icon: Brain,
                title: "Confidence in New Settings",
                description: "Adaptable and unbothered by unusual sounds, medical equipment, wheelchairs, walkers, and unpredictable movements."
              },
              {
                icon: Users,
                title: "Exceptional Social Skills",
                description: "Enjoys meeting new people and remains calm and friendly around other animals in shared spaces."
              },
              {
                icon: HandHeart,
                title: "Desire to Comfort",
                description: "Naturally seeks out and enjoys human interaction with a gentle, intuitive approach to people in need."
              },
              {
                icon: Sparkles,
                title: "Handler Bond & Focus",
                description: "Strong connection with handler and ability to maintain focus on work despite environmental distractions."
              }
            ].map((quality, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow"
                data-testid={`card-quality-${index}`}
              >
                <quality.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4" data-testid={`icon-quality-${index}`} />
                <h3 className="text-lg sm:text-xl font-semibold mb-3" data-testid={`text-quality-title-${index}`}>
                  {quality.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground" data-testid={`text-quality-description-${index}`}>
                  {quality.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Program Phases */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-phases-label">
              Training Journey
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-phases-title">
              Your Path to Certification
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-phases-subtitle">
              A structured, step-by-step approach to prepare your dog for therapy work and official certification testing.
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background rounded-xl p-6 sm:p-8 shadow-sm border border-border"
              data-testid="card-phase-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-primary" data-testid="icon-phase-0" />
                </div>
                <div className="flex-1">
                  <div className="text-xs sm:text-sm font-semibold text-primary mb-1" data-testid="text-phase-number-0">Step 1</div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3" data-testid="text-phase-title-0">Evaluation &amp; Obedience Training at Woof Dogs</h3>
                  <p className="text-sm sm:text-base text-muted-foreground" data-testid="text-phase-description-0">
                    We start with an evaluation. Then the dog is required to undergo basic and advanced obedience training at Woof Dogs.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-background rounded-xl p-6 sm:p-8 shadow-sm border border-border"
              data-testid="card-phase-1"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 text-primary" data-testid="icon-phase-1" />
                </div>
                <div className="flex-1">
                  <div className="text-xs sm:text-sm font-semibold text-primary mb-1" data-testid="text-phase-number-1">Step 2</div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3" data-testid="text-phase-title-1">Certification with Certified Therapy Dog, Inc. (CTD)</h3>
                  <div className="space-y-3 text-sm sm:text-base text-muted-foreground" data-testid="text-phase-description-1">
                    <p>
                      Woof Dogs will refer the client to Certified Therapy Dog, Inc (CTD) for therapy dog certification. CTD will charge Woof Dogs' clients $350 (please note this fee may have changed) for the following services that CTD will provide: the CGC test, the CGCA test, the CGCU test, the therapy dog test, safety classes, and group orientation, which will take place in the different locations where the therapy dogs will be working. $50 of the $350 mentioned above will be for insurance.
                    </p>
                    <p>
                      Upon graduation, CTD members will have full access to the vast array of visiting opportunities CTD has available throughout Palm Beach and Broward counties.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AKC Canine Good Citizen Certifications */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-cgc-label">
              AKC Certifications
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-cgc-title">
              Canine Good Citizen Program
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-cgc-subtitle">
              Our therapy dog training includes all three progressive levels of the AKC Canine Good Citizen certification, the gold standard for dog behavior and a prerequisite for most therapy dog work.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-10">
            {[
              {
                level: "CGC",
                title: "Canine Good Citizen",
                icon: Award,
                description: "The foundation certification covering 10 essential behavioral skills",
                skills: [
                  "Accepting a friendly stranger",
                  "Sitting politely for petting",
                  "Allowing basic grooming",
                  "Walking on a loose lead",
                  "Walking through a crowd",
                  "Sit, down, and stay on command",
                  "Coming when called",
                  "Appropriate reaction to another dog",
                  "Appropriate reaction to distractions",
                  "Supervised separation"
                ]
              },
              {
                level: "CGCA",
                title: "Community Canine",
                icon: Users,
                description: "Advanced real-world testing in public settings and community environments",
                skills: [
                  "Dog stands, sits, or lies down and waits",
                  "Walks on leash through a crowd",
                  "Walks past distractions on leash",
                  "Walks past another dog (3-4 feet)",
                  "Sit-stay in small group (3 dogs)",
                  "Allows petting while handler talks",
                  "Leaves food/treat when told",
                  "Down or sit stay (distance)",
                  "Recall with distractions present",
                  "Dog ignores distractions (visual/sound)"
                ]
              },
              {
                level: "CGCU",
                title: "Urban Canine Good Citizen",
                icon: Building2,
                description: "The highest level for urban environments with traffic, noise, and complex distractions",
                skills: [
                  "Exit/enter doorway or gate calmly",
                  "Walks through crowd (on leash)",
                  "Walks past busy street/traffic",
                  "Walks past café/restaurant seating",
                  "Walks through door/narrow passage",
                  "Sits politely near outdoor café",
                  "Ignores food on sidewalk",
                  "Down (handler goes 20 feet away)",
                  "Ignores dog across street",
                  "Supervised separation in public"
                ]
              }
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
                data-testid={`card-cgc-${index}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <cert.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary" data-testid={`icon-cgc-${index}`} />
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-primary" data-testid={`text-cgc-level-${index}`}>
                      {cert.level}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold" data-testid={`text-cgc-title-${index}`}>
                      {cert.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-4" data-testid={`text-cgc-description-${index}`}>
                  {cert.description}
                </p>
                <ul className="space-y-2">
                  {cert.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex items-start gap-2 text-sm" data-testid={`text-cgc-skill-${index}-${skillIndex}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                      <span className="text-muted-foreground">{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary/5 rounded-xl p-6 sm:p-8 border border-primary/20"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-shrink-0">
                <Award className="w-12 h-12 sm:w-16 sm:h-16 text-primary" data-testid="icon-cgc-badge" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold mb-2" data-testid="text-cgc-why-title">
                  Why CGC Matters for Therapy Dogs
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4" data-testid="text-cgc-why-description">
                  The Canine Good Citizen certification is recognized in 48 U.S. states and is often a prerequisite for therapy dog work. It demonstrates that your dog has the temperament, training, and reliability needed to interact safely with the public. A fee of $350 covers all testing and certification as a therapy dog with Certified Therapy Dog, Inc.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-start gap-2" data-testid="benefit-cgc-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span>Nationally recognized certification</span>
                  </div>
                  <div className="flex items-start gap-2" data-testid="benefit-cgc-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span>Required by most therapy organizations</span>
                  </div>
                  <div className="flex items-start gap-2" data-testid="benefit-cgc-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                    <span>Valid for life once earned</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Therapy Dog Settings & Opportunities */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-settings-label">
              Where Therapy Dogs Serve
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-settings-title">
              Make a Difference in Your Community
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-settings-subtitle">
              Certified therapy dogs provide comfort and support in a wide range of settings, each offering unique opportunities to help others.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Hospital,
                setting: "Hospitals & Healthcare",
                description: "Visit patients, provide comfort during recovery, and support healthcare workers in medical facilities."
              },
              {
                icon: Home,
                setting: "Nursing Homes & Assisted Living",
                description: "Bring joy to elderly residents and provide companionship to those in long-term care facilities."
              },
              {
                icon: School,
                setting: "Schools & Universities",
                description: "Support students during stressful times, participate in reading programs, and help create calm learning environments."
              },
              {
                icon: Building2,
                setting: "Libraries & Community Centers",
                description: "Participate in literacy programs. Children practice reading aloud to the certified, calm dogs in a safe, non-judgmental environment, which builds confidence, reduces anxiety, and improves reading skills."
              },
              {
                icon: Shield,
                setting: "Crisis Response & Disaster Relief",
                description: "Provide emotional support during emergencies, natural disasters, and community crises."
              },
              {
                icon: BookOpen,
                setting: "Special Needs Programs",
                description: "Work with individuals with autism, developmental disabilities, and therapeutic programs."
              }
            ].map((setting, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-all hover:border-primary/30"
                data-testid={`card-setting-${index}`}
              >
                <setting.icon className="w-10 h-10 text-primary mb-4" data-testid={`icon-setting-${index}`} />
                <h3 className="text-lg font-semibold mb-2" data-testid={`text-setting-title-${index}`}>
                  {setting.setting}
                </h3>
                <p className="text-sm text-muted-foreground" data-testid={`text-setting-description-${index}`}>
                  {setting.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-faq-label">
              Common Questions
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-faq-title">
              Therapy Dog Training FAQs
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                question: "What's the difference between a therapy dog and a service dog?",
                answer: "Service dogs are individually trained to perform specific tasks for a person with a disability and have legal public access rights. Therapy dogs provide comfort and emotional support to multiple people in various settings (hospitals, schools, etc.) but do not have the same legal access rights. Therapy dogs work with their handler to visit others, while service dogs accompany their owner everywhere."
              },
              {
                question: "Does my dog need to be a specific breed or age?",
                answer: "Therapy dogs can be any breed, size, or mix. What matters most is temperament, sociability, and training. Dogs must typically be at least one year old to be certified, as they need to be mature enough to handle the demands of therapy work. We assess each dog individually during the evaluation process."
              },
              {
                question: "How long does therapy dog training and certification take?",
                answer: "The complete training and certification process typically takes 7-12 weeks, depending on your dog's starting skill level and how quickly they progress through each phase. Dogs with solid obedience foundations may complete training faster. After training, you'll schedule an official certification test with a recognized therapy dog organization."
              },
              {
                question: "What certifications do you prepare dogs for?",
                answer: "We prepare dogs for certification through major therapy dog organizations including Pet Partners, Therapy Dogs International (TDI), and Alliance of Therapy Dogs. Each organization has specific requirements, and we tailor our training to meet those standards. We'll help you choose the best certification path for your goals."
              },
              {
                question: "Can I train my dog to be a therapy dog if they're shy or anxious?",
                answer: "It depends on the severity and nature of the anxiety. Therapy dogs need to be naturally confident and enjoy interacting with strangers in unpredictable environments. During the initial evaluation, we'll assess whether your dog has the right temperament for therapy work or would be better suited to other types of training. Some shy dogs can build confidence, but therapy work requires a genuinely social and stable temperament."
              },
              {
                question: "What happens after my dog is certified?",
                answer: "After certification, you'll register with a therapy dog organization and receive identification, insurance coverage, and access to volunteer opportunities. You can then begin visiting facilities and participating in therapy dog programs in your community. Many handlers visit regularly (weekly or monthly) at their chosen locations. We offer ongoing support and guidance as you begin your therapy work."
              }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} data-testid={`accordion-faq-${index}`}>
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold" data-testid={`button-faq-trigger-${index}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground" data-testid={`text-faq-answer-${index}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 rounded-2xl p-8 sm:p-12 text-center"
          >
            <Heart className="w-16 h-16 text-primary mx-auto mb-6" data-testid="icon-cta-main" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-cta-title">
              Ready to Begin Your Therapy Dog Journey?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-cta-description">
              Take the first step toward making a meaningful difference in your community. Schedule a professional evaluation to see if your dog has what it takes to become a certified therapy dog.
            </p>
            <Button 
              size="lg" 
              className="text-base sm:text-lg px-8 h-14"
              onClick={openModal}
              data-testid="button-cta-final"
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

export default TherapyDog;
