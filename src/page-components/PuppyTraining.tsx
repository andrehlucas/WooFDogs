"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  MapPin,
  Heart,
  Users,
  Baby,
  Dog,
  Shield,
  Brain,
  PawPrint,
  Eye,
  Ear,
  CheckCircle,
  AlertTriangle,
  FileCheck,
  Home,
  Search,
  HeartHandshake
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { ServiceAreasSection } from "@/components/ServiceAreasSection";

const PuppyTraining = () => {
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
              Puppy Training That Builds a Calm, Well-Behaved Adult Dog
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2" data-testid="text-hero-subtitle">
              Bringing a puppy home is an exciting moment—but it is also the most critical period in your dog's life. The decisions you make in the first weeks and months will directly shape your dog's behavior, confidence, and emotional stability for years to come.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto px-2" data-testid="text-hero-emphasis">
              Proper puppy training does not start after problems appear. It begins with understanding puppy development, selecting the right dog, and providing structured guidance from day one.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14" onClick={openModal} data-testid="button-hero-book">
                Schedule an Evaluation
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Puppy Stages Matter Section */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-stages-label">
              Development
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-stages-title">
              Why Puppy Stages Matter
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-2" data-testid="text-stages-subtitle">
              Puppies develop in clearly defined stages. Each stage influences how your dog will respond to people, environments, stress, and learning throughout adulthood.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                icon: Baby,
                title: "Birth to 2 Weeks – Neonatal Stage",
                description: "During this stage, puppies cannot see or hear, but gentle handling and early neurological stimulation help build resilience and stress tolerance later in life."
              },
              {
                icon: Ear,
                title: "2 to 4 Weeks – Transitional Stage",
                description: "As eyes and ears open, puppies begin interacting with littermates. This is where basic canine communication skills start to develop."
              },
              {
                icon: Heart,
                title: "3 to 12 Weeks – Critical Socialization Period",
                description: "This is the most important developmental window. Puppies learn what is safe, what is threatening, and how to form bonds with humans. Positive, controlled exposure during this time builds confidence and trust."
              },
              {
                icon: Brain,
                title: "12 Weeks to 6 Months – The Continuation Phase",
                description: "Socialization does not end at 12 weeks. Between 12 weeks and 6 months, a puppy remains highly impressionable. At this age, the puppy's brain is like a sponge—absorbing information from every interaction and experience."
              }
            ].map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background p-6 sm:p-8 rounded-xl shadow-sm border border-border"
                data-testid={`card-stage-${index}`}
              >
                <stage.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4" data-testid={`icon-stage-${index}`} />
                <h3 className="text-lg sm:text-xl font-semibold mb-3" data-testid={`text-stage-title-${index}`}>
                  {stage.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground" data-testid={`text-stage-description-${index}`}>
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Continuation Phase Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8 bg-primary/5 p-6 sm:p-8 rounded-xl"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-4" data-testid="text-continuation-title">
              It is crucial to continue structured exposure to:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
              {[
                "New environments and surfaces",
                "Other dogs and animals",
                "People of different ages and appearances",
                "Everyday sounds such as traffic, crowds, household noise, and unfamiliar settings"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3" data-testid={`item-exposure-${index}`}>
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-background p-4 sm:p-6 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-muted-foreground" data-testid="text-continuation-warning">
                  If the wrong message is delivered during this phase—through poor timing, pressure, or negative exposure—the puppy may learn behaviors very different from what the owner intends. Many cases of fear, reactivity, and insecurity originate during this stage due to improper exposure.
                </p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm sm:text-base font-medium mb-4" data-testid="text-professional-guidance">
                Professional guidance is essential during this period.
              </p>
              <Button onClick={openModal} data-testid="button-contact-guidance">
                Contact Us for Guidance
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Puppy Temperament Testing Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-temperament-label">
                Assessment
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-temperament-title">
                Puppy Temperament Testing
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6" data-testid="text-temperament-intro">
                At approximately 7 weeks of age, puppy temperament testing provides valuable insight into future behavior and suitability for different homes and lifestyles.
              </p>
              <h3 className="text-lg font-semibold mb-4" data-testid="text-temperament-subtitle">
                Testing can help identify:
              </h3>
              <div className="space-y-3 mb-6">
                {[
                  "Confidence versus sensitivity",
                  "Response to sound, touch, and new environments",
                  "Social engagement with humans",
                  "Potential for family life, service work, or working roles"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3" data-testid={`item-temperament-${index}`}>
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm sm:text-base text-muted-foreground italic" data-testid="text-temperament-note">
                Temperament testing is not about labeling puppies as "good" or "bad." It is about understanding natural tendencies and setting realistic expectations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-muted/30 p-6 sm:p-8 rounded-xl"
            >
              <Eye className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold mb-4" data-testid="text-ens-title">
                Early Neurological Stimulation and Puppy Exposure
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground" data-testid="text-ens-description">
                Early neurological stimulation, typically performed between days 3 and 16, helps improve stress tolerance, adaptability, and learning capacity. When done correctly, these early exercises contribute to stronger emotional stability and resilience throughout the dog's life.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Choosing the Right Puppy Section */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-choosing-label">
              Before You Commit
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-choosing-title">
              Choosing the Right Puppy: What You Must Know
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-2" data-testid="text-choosing-subtitle">
              Selecting the right puppy—or adult dog—is just as important as training. The foundation begins before the dog ever comes home.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                icon: Search,
                title: "Research the Breeder",
                content: "Do not rely solely on photos and videos. Responsible breeders are transparent, knowledgeable, and willing to answer detailed questions. Avoid breeders who rush the process or avoid accountability."
              },
              {
                icon: FileCheck,
                title: "Genetic Testing Is Essential",
                content: "Reputable breeders perform breed-specific genetic testing on both parents to reduce the risk of producing genetically unstable dogs. For example: German Shepherds and Labradors should have OFA hip and elbow certifications. Some breeds are prone to heart conditions. Others are at higher risk for inherited eye diseases. Each breed has specific health concerns. Proper testing should reflect those risks."
              },
              {
                icon: Dog,
                title: "Important Considerations for Doodles and Mixed Breeds",
                content: "All doodle mixes are not pure breeds, which makes careful screening even more important. Request genetic testing for both parents. Verify registration with reputable organizations such as: American Kennel Club (AKC), Fédération Cynologique Internationale (FCI), The Kennel Club (UK), or Canadian Kennel Club (CKC). If both parents are doodles, request AKC pedigree registration for the grandparents. Do not skip genetic testing based on assumptions or breed labels."
              },
              {
                icon: Users,
                title: "Meet the Puppy's Parents in Person",
                content: "Always insist on meeting both parents in person, not through videos. Interact with them directly. If you observe nervousness, aggression, or extreme shyness to people or sounds—walk away. These traits can have a genetic component. Breeders who avoid in-person meetings present a significant red flag."
              },
              {
                icon: HeartHandshake,
                title: "Match the Breed to Your Lifestyle",
                content: "Every breed has different physical, mental, and energy requirements. Make sure the dog's needs align with your family, schedule, and lifestyle. Most behavioral problems stem from poor matches—not bad dogs."
              },
              {
                icon: Home,
                title: "Adopting From a Shelter or Rescue",
                content: "If adopting a puppy or adult dog: Bring a professional to evaluate the dog when possible. Observe interactions with multiple dogs, not just kennel mates. If you have dogs, bring them along for proper introductions. If you have children, have them meet the dog before committing. These steps significantly reduce future behavioral and safety issues."
              }
            ].map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`choosing-${index}`} 
                className="bg-background rounded-xl border border-border px-6"
                data-testid={`accordion-choosing-${index}`}
              >
                <AccordionTrigger className="text-left py-6 hover:no-underline" data-testid={`accordion-trigger-choosing-${index}`}>
                  <div className="flex items-center gap-4">
                    <item.icon className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-base sm:text-lg font-semibold">{item.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-6" data-testid={`accordion-content-choosing-${index}`}>
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8 text-center"
          >
            <div className="bg-primary/5 p-6 sm:p-8 rounded-xl inline-block">
              <h3 className="text-lg sm:text-xl font-semibold mb-3" data-testid="text-consult-title">
                Consult a Professional Early
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 max-w-xl" data-testid="text-consult-description">
                The earlier you seek guidance, the better the outcome. Contact us as soon as you bring your new dog home. We can schedule an evaluation and guide you through the critical early stages to prevent problems before they begin.
              </p>
              <Button onClick={openModal} data-testid="button-consult-early">
                Schedule Early Consultation
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Socialization Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-socialization-label">
              Key to Success
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-socialization-title">
              Socialization: The Key to a Confident Dog
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-2" data-testid="text-socialization-subtitle">
              Proper socialization teaches puppies that the world is safe and predictable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: MapPin,
                title: "New Environments",
                description: "Exposure to different surfaces, locations, and settings"
              },
              {
                icon: Users,
                title: "People of All Ages",
                description: "Positive interactions with people of all ages and appearances"
              },
              {
                icon: PawPrint,
                title: "Stable, Friendly Dogs",
                description: "Safe introductions to well-mannered dogs"
              },
              {
                icon: Shield,
                title: "Handling & Grooming",
                description: "Tolerance for handling, grooming, and veterinary care"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-muted/30 p-6 rounded-xl text-center"
                data-testid={`card-socialization-${index}`}
              >
                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" data-testid={`icon-socialization-${index}`} />
                <h3 className="text-base sm:text-lg font-semibold mb-2" data-testid={`text-socialization-item-title-${index}`}>
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground" data-testid={`text-socialization-item-description-${index}`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-sm sm:text-base text-muted-foreground italic mt-8 max-w-2xl mx-auto"
            data-testid="text-socialization-note"
          >
            Socialization must always be positive, structured, and age-appropriate to build confidence without overwhelming the puppy.
          </motion.p>
        </div>
      </section>

      {/* Why Professional Training Matters Section */}
      <section className="py-12 sm:py-20 bg-primary/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-professional-label">
                Expert Guidance
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-professional-title">
                Why Professional Puppy Training Matters
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground">
                <p data-testid="text-professional-paragraph-0">
                  Every puppy is different. Some are naturally bold, others cautious. Knowing how to read your puppy and adjust training accordingly is the difference between long-term success and ongoing behavioral challenges.
                </p>
                <p data-testid="text-professional-paragraph-1">
                  With over 30 years of professional canine behavior and training experience, we help families raise stable, obedient, and confident dogs—whether as family companions, working dogs, or service animals.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background p-6 sm:p-8 rounded-xl shadow-sm border border-border"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "30+ Years", description: "Professional Experience" },
                  { label: "Family", description: "Companions & Working Dogs" },
                  { label: "Stable", description: "Obedient & Confident Dogs" },
                  { label: "Expert", description: "Canine Behavior Specialists" }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-muted/30 rounded-lg" data-testid={`stat-professional-${index}`}>
                    <div className="text-xl sm:text-2xl font-bold text-primary mb-1" data-testid={`text-stat-label-${index}`}>
                      {stat.label}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground" data-testid={`text-stat-description-${index}`}>
                      {stat.description}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-cta-title">
              Ready to Start Your Puppy's Journey the Right Way?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto px-2" data-testid="text-cta-subtitle">
              The choices you make today will define your dog's future. Don't guess—get expert guidance from the beginning.
            </p>
            <Button size="lg" className="text-base sm:text-lg px-8 h-14" onClick={openModal} data-testid="button-cta-book">
              Contact Us to Schedule an Evaluation
              <ArrowRight className="ml-2" size={20} />
            </Button>
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
            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4" data-testid="accordion-faq">
              {[
                {
                  q: "How early can I start training my puppy?",
                  a: "We begin puppy training as early as 8 weeks old. Early socialization and foundational obedience during the critical development window sets your puppy up for lifelong success."
                },
                {
                  q: "What does a puppy training session look like?",
                  a: "Sessions are tailored to your puppy's age and development stage. We cover potty training, crate training, bite inhibition, basic commands, leash manners, and structured socialization — all in short, age-appropriate segments."
                },
                {
                  q: "Should I wait until my puppy has all vaccinations before training?",
                  a: "No. The critical socialization window closes around 16 weeks. Waiting too long can lead to fear and behavioral issues later. We use safe, controlled environments for early training while respecting vaccination schedules."
                },
                {
                  q: "How long does puppy training take?",
                  a: "Most puppies show significant progress within 4-8 weeks with consistent practice. The exact timeline depends on your puppy's age, breed, temperament, and your training goals. We set clear milestones during the evaluation."
                },
                {
                  q: "Do you offer in-home puppy training?",
                  a: "Yes! In-home sessions let us address real-world behaviors in the environment where they happen most — your home. We also offer board-and-train programs at our facility in Loxahatchee for immersive training."
                }
              ].map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-muted/30 px-4 sm:px-6 rounded-lg border-none"
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

      <ServiceAreasSection variant="compact" />
    </div>
  );
};

export default PuppyTraining;
