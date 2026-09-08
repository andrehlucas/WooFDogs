"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CallLink from "@/components/CallLink";
import { 
  ArrowRight, 
  MapPin,
  Home,
  Shield,
  Heart,
  Clock,
  CheckCircle,
  Syringe,
  Dog,
  Calendar,
  Sun,
  Moon,
  Phone,
  Star,
  Sparkles,
  ArrowUpCircle,
  Pill,
  Bath,
  PlayCircle,
  Footprints,
  Cookie,
  GraduationCap,
  DoorOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { MeetAndGreetModal } from "@/components/MeetAndGreetModal";

const accommodations = [
  {
    name: "Petite Comfort Suite",
    slug: "petite-comfort-suite",
    description: "Perfect for smaller dogs under 35 lbs, this cozy stainless steel suite features a soft comfort mat and a calm, secure environment. Ideal for pups who enjoy a quiet, restful stay.",
    price: "$55",
    priceNote: "per night",
    features: [
      "For dogs under 35 lbs",
      "Cozy stainless steel suite",
      "Soft comfort mat",
      "3 daily potty breaks",
      "24/7 calming music"
    ],
    popular: false
  },
  {
    name: "Signature Suite",
    slug: "signature-suite",
    description: "Our most common and most loved option. This spacious 24 sq ft private suite features tempered glass doors, soothing color tones, and premium bedding for a relaxing, resort-style experience.",
    price: "$75",
    priceNote: "per night",
    features: [
      "Spacious 24 sq ft private suite",
      "Tempered glass doors",
      "Soothing color tones",
      "Premium bedding",
      "3 daily potty breaks",
      "24/7 calming music"
    ],
    popular: true
  },
  {
    name: "Grand Suite",
    slug: "grand-suite",
    description: "Designed for multiple dogs from the same family or extra-large breeds, this expansive 32 sq ft suite offers all the comforts of our Signature Suite with even more room to stretch out and unwind.",
    price: "$85",
    priceNote: "per night",
    features: [
      "Expansive 32 sq ft suite",
      "Perfect for multiple dogs or large breeds",
      "All Signature Suite amenities",
      "Extra room to stretch out",
      "3 daily potty breaks",
      "24/7 calming music"
    ],
    popular: false
  },
  {
    name: "Private Bedroom Retreat",
    slug: "private-bedroom-retreat",
    description: "The ultimate luxury stay. Your dog enjoys a full private bedroom inside our home, complete with a human bed, picture window, TV, and 24/7 calming music, plus a complimentary welcome-day treat.",
    price: "$95",
    priceNote: "per night",
    features: [
      "Full private bedroom in our home",
      "Human bed for ultimate comfort",
      "Picture window views",
      "TV entertainment",
      "Complimentary welcome-day treat",
      "3 daily potty breaks",
      "24/7 calming music"
    ],
    popular: false,
    comingSoon: true
  }
];

const addons = [
  {
    icon: PlayCircle,
    slug: "playtime-plus",
    name: "Playtime Plus",
    description: "A personalized, one-on-one play session tailored to your dog's energy level and preferences. Includes supervised enrichment, gentle exercise, and a calm cool-down period.",
    price: "$28 (20 min)"
  },
  {
    icon: Footprints,
    slug: "extra-walk",
    name: "Extra Walk",
    description: "A private sniff & stroll experience. Perfect for more active dogs or dogs who need more potty breaks.",
    price: "$18 (15-20 min)"
  },
  {
    icon: Pill,
    slug: "medication",
    name: "Medication Administration & Monitoring",
    description: "Our trained care team ensures medications are administered accurately, on schedule, and documented daily for your dog's safety and comfort. Call for more information.",
    price: "Starts at $7/day"
  },
  {
    icon: Bath,
    slug: "bath-brush",
    name: "Signature Spa Bath",
    description: "Mandatory for stays of 3 nights or longer, or when a dog becomes excessively soiled during their stay. This ensures your dog goes home clean, comfortable, and fresh. Includes premium shampoo & conditioner, blow dry, brush-out, light face & paw tidy-up, coat & skin check.",
    price: "$35"
  },
  {
    icon: Cookie,
    slug: "special-treats",
    name: "Special Treats",
    description: "Gourmet doggie treats to make your pup's stay extra special.",
    price: "Call for pricing"
  },
  {
    icon: GraduationCap,
    slug: "refresher-training",
    name: "Refresher Training",
    description: "Available for dogs who have previously undergone training or are currently in a training program with WooF Dogs. 30 minutes of training reinforcement.",
    price: "$149"
  }
];

const requirements = [
  {
    icon: Syringe,
    slug: "vaccinations",
    title: "Required Vaccinations",
    items: [
      "Rabies (current)",
      "DHPP/DHLPP (within 1 year)",
      "Bordetella (within 1 year)"
    ]
  },
  {
    icon: Dog,
    slug: "behavioral-requirements",
    title: "Behavioral Requirements",
    items: [
      "Non-aggressive toward people",
      "Up-to-date on flea/tick prevention",
      "Completed Meet & Greet if first-time boarder or over 1 year since last stay"
    ]
  }
];

export const boardingFaqs = [
  {
    question: "What should I bring for my dog's stay?",
    answer: "We recommend bringing your dog's regular food to avoid digestive upset and any medications with clear instructions."
  },
  {
    question: "Can I visit my dog during their stay?",
    answer: "While we understand the desire to visit, we find that visits can sometimes cause anxiety for boarding dogs. We provide photos when possible and updates upon request."
  },
  {
    question: "What happens if my dog gets sick?",
    answer: "Your dog's health is our priority. We perform daily wellness checks and have relationships with local veterinarians. In case of emergency, we'll contact you immediately and seek veterinary care if needed. Emergency vet costs are the owner's responsibility."
  },
  {
    question: "Do dogs get to socialize with other dogs?",
    answer: "We do not promise group play. However, when the kennel techs have extra time and we have dogs of similar size and temperament, group play may be offered. If you want to ensure your dog has extra activity for the day, we offer one-on-one playtime, extra walks, and add-on training services for purchase."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Please refer to our boarding agreement."
  },
  {
    question: "Are there discounts for extended stays?",
    answer: "Yes! We offer a 10 night and 20 night package. Contact us for details on extended stay pricing."
  }
];

const Boarding = () => {
  const [isMeetGreetOpen, setIsMeetGreetOpen] = useState(false);
  
  const openMeetGreet = () => setIsMeetGreetOpen(true);
  const closeMeetGreet = () => setIsMeetGreetOpen(false);
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MeetAndGreetModal isOpen={isMeetGreetOpen} onClose={closeMeetGreet} />

      {/* Hero Section */}
      <section id="hero" className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full mb-4 sm:mb-6" data-testid="tag-location">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">Located in Loxahatchee, Conveniently Serving Wellington, Royal Palm Beach & Surrounding Communities</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 leading-tight px-2" data-testid="text-hero-title">
              Resort-Style Dog Boarding in South Florida
            </h1>
            <p className="text-lg sm:text-xl text-primary font-medium mb-4 sm:mb-6" data-testid="text-hero-tagline">
              A Hidden Gem in Busy South Florida
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2" data-testid="text-hero-subtitle">
              Nestled among horses, farms, and lush nurseries, our resort-style luxury dog boarding facility offers the perfect countryside retreat for your pup while you're away. Your fur baby will enjoy lots of cuddles, belly rubs, and ear scratches throughout the day—always included. Elevate their stay with customizable add-ons like extra playtime, gourmet doggie treats, additional walks, and more. At Woof Dogs, your pet is treated like family, because that's exactly what they are.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14" onClick={openMeetGreet} data-testid="button-hero-book">
                Book Boarding
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14" asChild data-testid="button-hero-call">
                <CallLink href="tel:+15615944111">
                  <Phone className="mr-2" size={20} />
                  (561) 594 - 4111
                </CallLink>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Facility Overview Section */}
      <section id="facilities" className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-facility-title">
              Premier Boarding Facilities — A Home Away From Home
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-facility-subtitle">
              Our thoughtfully designed boarding facility blends comfort, safety, and personalized care to create a truly stress-free experience for your dog. Every detail is intentionally planned so your pup feels relaxed, secure, and right at home during their stay.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: DoorOpen,
                title: "Private Suites",
                slug: "private-suites",
                description: "Spacious, individual accommodations thoughtfully designed with tempered glass doors and premium bedding for comfort and relaxation."
              },
              {
                icon: Home,
                title: "Climate Controlled Comfort",
                slug: "climate-controlled",
                description: "Year-round temperature control to keep your pup comfortable in every season."
              },
              {
                icon: Heart,
                title: "Experienced, Caring Staff",
                slug: "staff",
                description: "Trained professionals who genuinely love dogs and treat each guest like family."
              },
              {
                icon: Star,
                title: "Clean & Sanitized",
                slug: "clean-sanitized",
                description: "Strict cleaning protocols for a fresh, healthy environment."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                id={feature.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background p-6 rounded-xl shadow-sm border border-border text-center"
                data-testid={`card-facility-feature-${index}`}
              >
                <feature.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodations & Pricing Section */}
      <section id="pricing" className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-pricing-title">
              Dog Boarding Accommodations & Pricing
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-pricing-subtitle">
              Choose the perfect dog boarding package for your pup. All accommodations include fresh food, clean water, comfortable bedding, and lots of love.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {accommodations.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                id={option.slug}
                className={`relative bg-background p-6 sm:p-8 rounded-xl shadow-sm border ${option.popular ? 'border-primary border-2' : 'border-border'} ${option.comingSoon ? 'opacity-70' : ''}`}
                data-testid={`card-accommodation-${index}`}
              >
                {option.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                {option.comingSoon && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-muted-foreground text-background text-xs font-semibold px-3 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2" data-testid={`text-accommodation-name-${index}`}>{option.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl sm:text-4xl font-bold text-primary">{option.price}</span>
                    <span className="text-muted-foreground">{option.priceNote}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {option.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {option.comingSoon ? (
                  <Button
                    className="w-full"
                    variant="outline"
                    disabled
                    data-testid={`button-book-accommodation-${index}`}
                  >
                    Coming Soon
                  </Button>
                ) : (
                  <Button 
                    className="w-full" 
                    variant={option.popular ? "default" : "outline"}
                    onClick={openMeetGreet}
                    data-testid={`button-book-accommodation-${index}`}
                  >
                    Book {option.name}
                  </Button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Add-ons Subcards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 sm:mt-16"
          >
            <h3 id="addons" className="text-xl sm:text-2xl font-bold text-center mb-6" data-testid="text-addons-title">
              Enhance Your Dog's Stay
            </h3>
            <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto" data-testid="text-addons-subtitle">
              Add extra services to make your pup's boarding experience even better.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {addons.map((addon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  id={addon.slug}
                  className="bg-muted/50 p-4 rounded-lg border border-border text-center hover:border-primary/50 hover:bg-muted transition-colors"
                  data-testid={`card-addon-${index}`}
                >
                  <addon.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-sm mb-1">{addon.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{addon.description}</p>
                  <span className="text-sm font-bold text-primary">{addon.price}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Board & Train Upgrade Section */}
      <section id="board-and-train" className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-4">
                <ArrowUpCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Upgrade Available</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-upgrade-title">
                Combine Boarding with Training
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4" data-testid="text-upgrade-description">
                Why just board when your dog can learn too? Upgrade your boarding reservation to a Board & Train package and pick up a better-behaved pup. While you're away, our trainers work with your dog daily on obedience, manners, and behavior modification.
              </p>
              <p className="text-sm text-primary font-medium mb-6 bg-primary/10 p-3 rounded-lg" data-testid="text-upgrade-requirement">
                Note: A minimum 2-week stay and an evaluation are required for Board & Train programs.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Daily professional training sessions",
                  "Customized training plan for your dog's needs",
                  "Homework and video guides for continued success",
                  "Review/owner transfer session before pickup"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" onClick={openMeetGreet} data-testid="button-upgrade-book">
                Learn About Board & Train
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background p-6 sm:p-8 rounded-xl shadow-sm border border-border"
            >
              <h3 id="board-train-benefits" className="text-xl font-bold mb-4">Board & Train Benefits</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Faster Results",
                    description: "Full-time immersion means faster learning and stronger habits."
                  },
                  {
                    title: "Convenience",
                    description: "Your dog gets trained while you travel — no extra scheduling needed."
                  },
                  {
                    title: "Expert Handling",
                    description: "Professional trainers work with your dog multiple times daily."
                  },
                  {
                    title: "Smooth Transition",
                    description: "We teach you how to maintain training before you take your dog home."
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3" data-testid={`card-benefit-${index}`}>
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section id="requirements" className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-requirements-title">
              Dog Boarding Requirements
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-requirements-subtitle">
              For the safety and well-being of all dogs at our boarding facilities, we require the following before your dog's stay.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                id={req.slug}
                className="bg-background p-6 sm:p-8 rounded-xl shadow-sm border border-border"
                data-testid={`card-requirement-${index}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <req.icon className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-bold">{req.title}</h3>
                </div>
                <ul className="space-y-3">
                  {req.items.map((item, iIndex) => (
                    <li key={iIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm text-muted-foreground text-center mt-6 italic"
            data-testid="text-requirements-note"
          >
            All new dogs and dogs that haven't had a booking in over two years require a Meet & Greet. Contact us to schedule.
          </motion.p>
        </div>
      </section>

      {/* Drop-off & Pick-up Section */}
      <section id="dropoff-pickup" className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-dropoff-title">
              Drop-off & Pick-up
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-dropoff-subtitle">
              We make the process smooth and easy for both you and your pup.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background p-6 sm:p-8 rounded-xl shadow-sm border border-border"
              id="dropoff"
              data-testid="card-dropoff"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sun className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-bold">Drop-off</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong>Hours:</strong> 9 AM - 11:30 AM and 1:30 PM - 3 PM</span>
                </li>
                <li className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong>Check-in:</strong> Complete paperwork and hand-off belongings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong>Bring:</strong> Food and any medications with clear instructions</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background p-6 sm:p-8 rounded-xl shadow-sm border border-border"
              id="pickup"
              data-testid="card-pickup"
            >
              <div className="flex items-center gap-3 mb-4">
                <Moon className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-bold">Pick-up</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong>Hours:</strong> 9 AM - 11:30 AM and 1:30 PM - 3 PM</span>
                </li>
                <li className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong>Important:</strong> Pick up by 3 PM to avoid an additional night charge</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong>Receive:</strong> Report card with notes about your dog's stay</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground"><strong>Late pickup:</strong> Call ahead to arrange after-hours pickup (fee applies)</span>
                </li>
              </ul>
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
            className="text-center mb-10 sm:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-faq-title">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-faq-subtitle">
              Have questions? We've got answers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FaqAccordion
              faqs={boardingFaqs}
              className="w-full"
              triggerClassName="text-left"
              data-testid="accordion-faq"
              testIdPrefix="faq"
            />
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="py-12 sm:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-cta-title">
              Ready to Book Your Dog's Stay?
            </h2>
            <p className="text-base sm:text-lg opacity-90 mb-8 max-w-2xl mx-auto" data-testid="text-cta-subtitle">
              Give your pup the vacation they deserve while you enjoy peace of mind knowing they're in expert hands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base sm:text-lg px-8 h-14 bg-transparent border-white text-white hover:bg-white/10"
                onClick={openMeetGreet}
                data-testid="button-cta-book"
              >
                Book Boarding Now
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base sm:text-lg px-8 h-14 bg-transparent border-white text-white hover:bg-white/10"
                asChild
                data-testid="button-cta-call"
              >
                <CallLink href="tel:+15615944111">
                  <Phone className="mr-2" size={20} />
                  (561) 594 - 4111
                </CallLink>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Boarding;
