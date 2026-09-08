"use client";

import { motion } from "framer-motion";
import { Award, Shield } from "lucide-react";
import Image from "next/image";
import shayImageImport from "@/assets/shay-maimoni-lead-dog-trainer.webp";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Trainer {
  name: string;
  role: string;
  credentials: string[];
}

const supportTrainers: Trainer[] = [
  {
    name: "Tomas",
    role: "Second Trainer & On-Site Training Manager",
    credentials: [
      "Expertise in obedience training",
      "On-site program management",
      "Relationship-based training methods"
    ]
  },
  {
    name: "Charles (Charlie)",
    role: "In-Home Trainer",
    credentials: [
      "Personalized in-home sessions",
      "Behavioral challenge specialist",
      "Family environment training"
    ]
  }
];

interface TrainersSectionProps {
  label?: string;
  title?: string;
  subtitle?: string;
  backgroundColor?: "default" | "muted";
}

export function TrainersSection({
  label = "Our Trainers",
  title = "Certified Professionals, Real-World Expertise",
  subtitle = "Meet the team dedicated to helping dogs and owners thrive together.",
  backgroundColor = "muted"
}: TrainersSectionProps) {
  const bgClass = backgroundColor === "muted" ? "bg-muted/30" : "bg-background";
  const { openModal } = useBookingModal();

  return (
    <section id="trainers" className={`py-12 sm:py-20 ${bgClass}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-trainers-label">
            {label}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-trainers-title">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-trainers-intro">
            {subtitle}
          </p>
        </motion.div>

        {/* Featured — Shay Maimoni */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-background rounded-2xl shadow-sm border border-border overflow-hidden mb-10 sm:mb-14"
          data-testid="card-trainer-shay"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-0">

            {/* Photo side — left on large screens, top on mobile */}
            <div className="relative h-80 sm:h-96 lg:h-auto min-h-[380px] overflow-hidden bg-primary/10">
              <Image
                src={shayImageImport}
                alt="Shay Maimoni, founder and lead dog trainer at Woof Dogs"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
                loading="lazy"
              />
              {/* Gradient overlay with name/role badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <div className="inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground mb-2 backdrop-blur-sm">
                  Lead Trainer &amp; Founder
                </div>
                <h3 className="text-white text-xl sm:text-2xl font-bold leading-tight drop-shadow" data-testid="text-trainer-name-shay">
                  Shay Maimoni
                </h3>
                <p className="text-white/80 text-sm mt-0.5">Leading Canine Behavior Consultant</p>
              </div>
            </div>

            {/* Content side — right on large screens, bottom on mobile */}
            <div className="p-7 sm:p-10 flex flex-col justify-center space-y-5">
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base" data-testid="text-trainer-bio-shay-1">
                Shay Maimoni is a professional canine behavior consultant, trainer, and educator with decades of experience helping dogs and the people who love them build clear communication, trust, and lasting results. His passion for working dogs began during his service in the Israel Defense Forces (IDF), where he was first introduced to Military Working Dogs. That experience sparked an intensive, lifelong study of canine behavior, learning theory, communication, and the unique bond between dogs and humans.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base" data-testid="text-trainer-bio-shay-2">
                As the founder of WooF Dogs, Shay specializes in behavior modification, obedience, puppy development, service dog training, and complex behavioral cases using practical, science-informed training methods. Beyond working with family dogs, he has trained and lectured for law enforcement, military, and government K9 handlers and is recognized for his expertise in canine behavior, body language, and working-dog performance. His mission is simple: to help people truly understand their dogs and build calm, confident, and reliable companions—because at WooF Dogs, We Speak Your Dog's Language.
              </p>

              {/* Credential badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 text-sm font-medium shadow-sm">
                  <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>IDF Military Background</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 text-sm font-medium shadow-sm">
                  <Award className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Decades of Experience</span>
                </div>
              </div>

              <hr className="border-border" />

              {/* Professional Memberships — certification cards */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                  Professional Memberships
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card px-5 py-4 shadow-sm min-w-[120px] max-w-[160px]">
                    <img
                      src="/APDT-LOGO.svg"
                      alt="APDT — Association of Professional Dog Trainers member"
                      className="object-contain w-full"
                      style={{ maxHeight: "64px" }}
                    />
                    <span className="text-xs font-medium text-muted-foreground text-center leading-tight">APDT Member</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card px-5 py-4 shadow-sm min-w-[120px] max-w-[160px]">
                    <img
                      src="/IACP-LOGO.svg"
                      alt="IACP — International Association of Canine Professionals member"
                      className="object-contain w-full"
                      style={{ maxHeight: "64px" }}
                    />
                    <span className="text-xs font-medium text-muted-foreground text-center leading-tight">IACP Member</span>
                  </div>
                </div>
              </div>

              <div>
                <Button
                  size="lg"
                  onClick={openModal}
                  data-testid="button-book-eval-shay"
                >
                  Book Evaluation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Supporting trainers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {supportTrainers.map((trainer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-background p-6 sm:p-8 rounded-xl shadow-sm border border-border"
              data-testid={`card-trainer-${index}`}
            >
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 mb-4 sm:mb-6 mx-auto">
                <Award className="w-8 h-8 sm:w-10 sm:h-10 text-primary" data-testid={`icon-trainer-${index}`} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center" data-testid={`text-trainer-name-${index}`}>
                {trainer.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 text-center" data-testid={`text-trainer-role-${index}`}>
                {trainer.role}
              </p>
              <ul className="space-y-2">
                {trainer.credentials.map((credential, credIndex) => (
                  <li key={credIndex} className="flex items-start gap-2 text-xs sm:text-sm" data-testid={`text-trainer-credential-${index}-${credIndex}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>{credential}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
