"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cityPages = [
  {
    name: "Boca Raton",
    href: "/dog-training-boca-raton",
    description: "In-home and facility-based training for Boca Raton families.",
  },
  {
    name: "Delray Beach",
    href: "/dog-training-delray-beach",
    description: "Expert dog training throughout Delray Beach and nearby areas.",
  },
  {
    name: "Wellington",
    href: "/dog-training-wellington",
    description: "Serving Wellington's equestrian community and neighborhoods.",
  },
  {
    name: "West Palm Beach",
    href: "/dog-training-west-palm-beach",
    description: "Professional training for urban and suburban West Palm Beach dogs.",
  },
  {
    name: "Loxahatchee",
    href: "/dog-training-loxahatchee",
    description: "Our home base — facility and in-home training in Loxahatchee.",
  },
];

interface ServiceAreasSectionProps {
  variant?: "full" | "compact";
}

export function ServiceAreasSection({ variant = "full" }: ServiceAreasSectionProps) {
  if (variant === "compact") {
    return (
      <section className="py-8 sm:py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-6"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-2" data-testid="text-where-we-work-title">
              Where We Work
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              We provide this training service across Palm Beach County
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {cityPages.map((city, index) => (
              <motion.div key={index} variants={itemFadeIn}>
                <Link
                  href={city.href}
                  className="inline-flex items-center gap-2 rounded-full bg-background border border-border px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                  data-testid={`link-service-area-compact-${index}`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  {city.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-20 bg-muted/30" id="service-areas">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            Service Areas
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-service-areas-title">
            Dog Training Across Palm Beach County
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            We bring professional dog training to your neighborhood. Serving these communities and beyond.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {cityPages.map((city, index) => (
            <motion.div key={index} variants={itemFadeIn}>
              <Link
                href={city.href}
                className="group flex items-start gap-4 bg-background p-5 sm:p-6 rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all"
                data-testid={`link-service-area-${index}`}
              >
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                    Dog Training in {city.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{city.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
