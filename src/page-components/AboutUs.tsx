"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  MapPin,
  Heart,
  Award,
  Users,
  Target,
  CheckCircle2,
  Shield,
  Sparkles,
  Brain,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { TrainersSection } from "@/components/TrainersSection";

const AboutUs = () => {
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
              Professional Dog Trainers Serving Palm Beach County
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2" data-testid="text-hero-subtitle">
              Building stronger bonds between dogs and their families through expert training, compassion, and proven methods.
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


      {/* Our Story Section */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-story-label">
              Our Story
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-story-title">
              How Woof Dogs Began
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 text-base sm:text-lg text-muted-foreground"
            >
              <p data-testid="text-story-paragraph-0">
                Woof Dogs was founded with a simple yet powerful mission: to help dogs and their owners build lasting, positive relationships through effective, science-based training methods.
              </p>
              <p data-testid="text-story-paragraph-1">
                What started as a passion for understanding canine behavior has grown into a comprehensive training program serving the South Florida community. We've helped hundreds of families transform their dogs from reactive and unruly to calm, confident, and obedient companions.
              </p>
              <p data-testid="text-story-paragraph-2">
                Our approach combines proven positive reinforcement techniques with clear communication and consistency. We believe every dog deserves the opportunity to succeed, and every owner deserves the support and guidance to help their dog thrive.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-background p-6 rounded-xl shadow-sm border border-border text-center" data-testid="card-stat-0">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2" data-testid="text-stat-value-0">2000+</div>
                <div className="text-sm text-muted-foreground" data-testid="text-stat-label-0">Dogs Trained</div>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-sm border border-border text-center" data-testid="card-stat-1">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2" data-testid="text-stat-value-1">15+</div>
                <div className="text-sm text-muted-foreground" data-testid="text-stat-label-1">Years Experience</div>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-sm border border-border text-center" data-testid="card-stat-2">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2" data-testid="text-stat-value-2">98%</div>
                <div className="text-sm text-muted-foreground" data-testid="text-stat-label-2">Success Rate</div>
              </div>
              <div className="bg-background p-6 rounded-xl shadow-sm border border-border text-center" data-testid="card-stat-3">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2" data-testid="text-stat-value-3">Certified</div>
                <div className="text-sm text-muted-foreground" data-testid="text-stat-label-3">Trainers</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-mission-label">
              Our Mission & Values
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-mission-title">
              What Drives Us
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-mission-subtitle">
              Our core values guide every training session, every interaction, and every decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Heart,
                title: "Compassion First",
                description: "Every dog is unique, and we approach training with empathy, patience, and understanding. We never use punishment-based methods."
              },
              {
                icon: Award,
                title: "Excellence in Training",
                description: "Our trainers are certified, experienced professionals who stay current with the latest science-based training techniques."
              },
              {
                icon: Users,
                title: "Family-Centered",
                description: "We train both dogs and their owners, ensuring everyone in the household can maintain positive behaviors long-term."
              },
              {
                icon: Target,
                title: "Results-Driven",
                description: "We set clear goals and measure progress, ensuring your dog achieves real, lasting behavioral change."
              },
              {
                icon: Shield,
                title: "Safety & Trust",
                description: "Your dog's safety and well-being are paramount. We create a secure, positive environment for learning."
              },
              {
                icon: Sparkles,
                title: "Positive Methods",
                description: "We believe in building confidence through reward-based training that strengthens the bond between you and your dog."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background p-6 rounded-xl shadow-sm border border-border"
                data-testid={`card-value-${index}`}
              >
                <value.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4" data-testid={`icon-value-${index}`} />
                <h3 className="text-lg sm:text-xl font-semibold mb-2" data-testid={`text-value-title-${index}`}>
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground" data-testid={`text-value-description-${index}`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-why-label">
              Why Choose Woof Dogs
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-why-title">
              The Woof Dogs Difference
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Brain,
                title: "Science-Based Methods",
                description: "Our training techniques are backed by modern behavioral science and proven to create lasting change without stress or fear."
              },
              {
                icon: CheckCircle2,
                title: "Customized Programs",
                description: "Every dog gets a personalized training plan based on their unique temperament, history, and your specific goals."
              },
              {
                icon: Users,
                title: "Ongoing Support",
                description: "We don't disappear after training ends. Our team provides continued guidance to ensure long-term success."
              },
              {
                icon: Award,
                title: "Certified Professionals",
                description: "Our trainers hold professional certifications and undergo regular continuing education to stay at the forefront of the field."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-4 items-start bg-background p-6 rounded-xl shadow-sm border border-border"
                data-testid={`card-why-${index}`}
              >
                <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary flex-shrink-0" data-testid={`icon-why-${index}`} />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2" data-testid={`text-why-title-${index}`}>
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground" data-testid={`text-why-description-${index}`}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TrainersSection 
        label="Meet Our Trainers"
        title="Expert Training, Proven Results"
        subtitle="Our certified trainers bring decades of combined experience to help you and your dog succeed."
        backgroundColor="default"
      />

      {/* Support Staff Section */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-team-label">
              Our Support Team
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-team-title">
              The People Behind the Scenes
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-team-subtitle">
              Our dedicated support staff ensures every aspect of Woof Dogs runs smoothly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                name: "Erica V",
                role: "General Manager",
                description: "Erica oversees all operations and ensures every aspect of Woof Dogs runs smoothly, delivering an exceptional experience for every client."
              },
              {
                name: "Melissa Z",
                role: "Office Manager",
                description: "Melissa keeps everything organized behind the scenes, coordinating scheduling and ensuring seamless communication with all our clients."
              },
              {
                name: "Grant",
                role: "Trainee",
                description: "Grant is developing his skills under our experienced trainers, bringing fresh energy and dedication to the Woof Dogs team."
              },
              {
                name: "Ruben",
                role: "Kennel Tech and Groundskeeper",
                description: "Ruben ensures our facilities are clean, safe, and welcoming for every dog in our care, maintaining the highest standards."
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background p-6 rounded-xl shadow-sm border border-border text-center"
                data-testid={`card-staff-${index}`}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center" data-testid={`avatar-staff-${index}`}>
                    <User className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1" data-testid={`text-staff-name-${index}`}>
                  {member.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-3" data-testid={`text-staff-role-${index}`}>
                  {member.role}
                </p>
                <p className="text-sm sm:text-base text-muted-foreground" data-testid={`text-staff-description-${index}`}>
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
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
              Ready to Start Your Training Journey?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2" data-testid="text-cta-subtitle">
              Join the hundreds of satisfied families who've transformed their dogs' behavior with Woof Dogs.
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

export default AboutUs;
