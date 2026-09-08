import Image from "next/image";
import Link from "next/link";
import CallLink from "@/components/CallLink";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Heart,
  Award,
  BookOpen,
  Target,
  Shield,
  Handshake,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroVariantA from "@/components/HeroVariantA";
import { LazySection, SectionSkeleton } from "@/components/ui/lazy-section";
import { ServiceAreasSection } from "@/components/ServiceAreasSection";
import { HomepageBlogSection } from "@/components/HomepageBlogSection";
import { BookEvalButton } from "@/components/landing/BookEvalButton";
import { BookEvalLink } from "@/components/landing/BookEvalLink";
import teamImageImport from "@assets/training_session_900px_1784510758012.webp";
import shayImageImport from "@/assets/shay-maimoni-lead-dog-trainer.webp";
import separationAnxietyImgImport from "@assets/dog_with_separation_anxiety_1764105136713.webp";
import jumpingOnPeopleImgImport from "@assets/dog_jumping_on_person_1764105136713.webp";
import excessiveBarkingImgImport from "@assets/dog_barking_excessively_1764105136712.webp";
import leashPullingImgImport from "@assets/dog_pulling_on_leash_1764105136713.webp";
import aggressionIssuesImgImport from "@assets/dog_showing_protective_behaviorwebp_1764105136713.webp";
import destructiveChewingImgImport from "@assets/dog_chewing_inappropriate_items_1764105136712.webp";

type ImageImport = string | { src: string };

const getImageSrc = (img: ImageImport): string =>
  typeof img === "string" ? img : img.src;

const woofDogsLogo = "/woof-dogs-logo.webp";
const separationAnxietyImg = getImageSrc(separationAnxietyImgImport);
const jumpingOnPeopleImg = getImageSrc(jumpingOnPeopleImgImport);
const excessiveBarkingImg = getImageSrc(excessiveBarkingImgImport);
const leashPullingImg = getImageSrc(leashPullingImgImport);
const aggressionIssuesImg = getImageSrc(aggressionIssuesImgImport);
const destructiveChewingImg = getImageSrc(destructiveChewingImgImport);

const IMAGE_DIMENSIONS = {
  issue: { width: 400, height: 300 },
};

export function WoofDogsLanding() {
  return (
    <div className="flex min-h-screen flex-col bg-background">

      <main className="flex-1">
        {/* Hero Section - Variant A */}
        <HeroVariantA />

        {/* Lead Trainer Section */}
        <section id="lead-trainer" className="w-full py-10 md:py-16 lg:py-20 bg-muted/30">
          <div className="container">
            <div className="bg-background rounded-2xl shadow-sm border border-border overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-0">

                {/* Photo side — left on large screens, top on mobile */}
                <div className="relative h-80 sm:h-96 lg:h-auto min-h-[380px] overflow-hidden bg-primary/10">
                  <Image
                    src={shayImageImport}
                    alt="Shay Maimoni, founder and lead dog trainer at Woof Dogs, working with a dog at the Loxahatchee training facility"
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
                    <h2 className="text-white text-xl sm:text-2xl font-bold leading-tight drop-shadow">
                      Shay Maimoni
                    </h2>
                    <p className="text-white/80 text-sm mt-0.5">Leading Canine Behavior Consultant</p>
                  </div>
                </div>

                {/* Content side — right on large screens, bottom on mobile */}
                <div className="p-7 sm:p-10 flex flex-col justify-center space-y-5">
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    Shay Maimoni is a professional canine behavior consultant, trainer, and educator with decades of experience helping dogs and the people who love them build clear communication, trust, and lasting results. His passion for working dogs began during his service in the Israel Defense Forces (IDF), where he was first introduced to Military Working Dogs. That experience sparked an intensive, lifelong study of canine behavior, learning theory, communication, and the unique bond between dogs and humans.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
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
                    <BookEvalButton size="lg" data-testid="button-book-evaluation">
                      Book Evaluation
                    </BookEvalButton>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Behavior Issues Section */}
        <LazySection fallback={<SectionSkeleton height="2400px" />}>
          <section id="services" className="w-full py-8 md:py-14 lg:py-18 bg-white dark:bg-black">
            <div className="container">
              <div className="flex flex-col space-y-4 mb-12">
                <div className="space-y-3">
                  <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary w-fit">
                    Common Challenges We Help With
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Behavior Issues We Address
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Expert solutions for the most common dog behavior problems that affect your daily life
                </p>
              </div>
            </div>
            <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  image: separationAnxietyImg,
                  title: "Separation Anxiety",
                  description:
                    "Excessive whining, destructive behavior, or panic when left alone. We help your dog feel calm and confident when you're away.",
                },
                {
                  image: jumpingOnPeopleImg,
                  title: "Jumping on People",
                  description:
                    "Unwanted jumping on family members, guests, or strangers. Learn techniques to teach polite greetings and impulse control.",
                },
                {
                  image: excessiveBarkingImg,
                  title: "Excessive Barking",
                  description:
                    "Non-stop barking at sounds, people, or other dogs. Address the root cause and establish quiet, calm behavior.",
                },
                {
                  image: leashPullingImg,
                  title: "Leash Pulling",
                  description:
                    "Constant pulling that makes walks exhausting and stressful. Master loose-leash walking for enjoyable outdoor time together.",
                },
                {
                  image: aggressionIssuesImg,
                  title: "Aggression Issues",
                  description:
                    "Growling, snapping, or lunging at people or other dogs. Professional intervention to create a safer, more balanced companion.",
                },
                {
                  image: destructiveChewingImg,
                  title: "Destructive Chewing",
                  description:
                    "Chewing furniture, shoes, or household items. Redirect natural chewing instincts to appropriate outlets and toys.",
                },
              ].map((issue, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl motion-reduce:hover:translate-y-0"
                  data-testid={`card-behavior-issue-${index}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={issue.image}
                      alt={`${issue.title} in dogs — common behavior issue addressed by Woof Dogs trainers in South Florida`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      width={IMAGE_DIMENSIONS.issue.width}
                      height={IMAGE_DIMENSIONS.issue.height}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold" data-testid={`text-issue-title-${index}`}>{issue.title}</h3>
                    <p className="text-muted-foreground line-clamp-3" data-testid={`text-issue-description-${index}`}>{issue.description}</p>
                    <div className="pt-3">
                      <BookEvalLink
                        testId={`button-get-help-${index}`}
                        aria-label={`Get help with ${issue.title.toLowerCase()}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </LazySection>

        {/* About Section */}
        <LazySection fallback={<SectionSkeleton height="1200px" />}>
        <section id="about" className="w-full py-8 md:py-14 lg:py-18">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex items-center justify-center">
                <div className="relative h-[400px] w-full md:h-[500px] overflow-hidden rounded-3xl shadow-xl">
                  <Image
                    src={teamImageImport}
                    alt="Woof Dogs professional dog trainers working with client dogs during a group obedience session in South Florida"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="space-y-6 flex flex-col justify-center">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary w-fit">
                  About Woof Dogs
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Building Better Relationships Through Training
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  At Woof Dogs, we believe every dog can become a calm, confident companion — the eight-week-old puppy chewing your shoes, or the rescue who never learned to trust people. Our mission is to strengthen the bond between dogs and their South Florida families. We do it through balanced, real-world training that fits how you actually live in Palm Beach County.
                </p>
                <p className="text-muted-foreground md:text-lg">
                  Our certified trainers bring 30+ years of combined experience. We've helped hundreds of families across Boca Raton, Delray Beach, Wellington, West Palm Beach, and Loxahatchee. Our methods are science-based and reward-focused, paired with clear communication and fair consequences — the same balanced approach our lead trainer refined with military, service, and family dogs. Training becomes enjoyable, repeatable, and genuinely effective.
                </p>
                <p className="text-muted-foreground md:text-lg">
                  Every program begins with a one-on-one, in-person evaluation. You leave with a written, take-home training plan you can actually follow. The onboarding path is the same. It starts with an evaluation and a custom-built training plan. No cookie-cutter classes, no rushed appointments — just honest guidance and lasting results.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Certified Trainers</span>
                    </div>
                    <p className="text-sm text-muted-foreground">All trainers are handpicked and mentored by Shay Maimoni.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Balanced Methods</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Reward-based, humane training</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row pt-4">
                  <Button size="lg" asChild>
                    <Link href="/about">Meet Our Team</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        </LazySection>

        {/* Testimonials */}
        <LazySection fallback={<SectionSkeleton height="2400px" />}>
        <section id="testimonials" className="w-full py-8 md:py-14 lg:py-18 bg-white dark:bg-black">
          <div className="container">
            <div className="flex flex-col space-y-4 mb-12">
              <div className="space-y-3">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary w-fit">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Real Results From Real Families
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Hear from families who completed our training programs
                </p>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  quote:
                    "WooF Dogs does an amazing job helping both dogs and their owners understand each other better. I have trusted their services for years because of their extensive knowledge, practical recommendations, and ability to teach people how to communicate more effectively with their dogs.",
                  author: "James Levey",
                  source: "Google Review"
                },
                {
                  quote:
                    "Tomas was incredible! Our dog is now calmer, more obedient, and performing all her commands very well. He did an amazing job and approached the training with patience and a gentle spirit. We are extremely pleased with Tomas and the entire WooF Dogs team.",
                  author: "Nicole Rickard",
                  source: "Google Review"
                },
                {
                  quote:
                    "The results have been amazing. Kim was incredibly knowledgeable, and Hayley and Tomas were wonderful throughout the process. Our dog's behavior has improved significantly, and we look forward to continuing with additional training sessions. Thank you to the entire WooF Dogs team!",
                  author: "Terri Abrill",
                  source: "Google Review"
                },
                {
                  quote:
                    "WooF Dogs is an excellent place for training. We had concerns about jumping and pulling during walks, but the team made tremendous progress. The entire team was professional, caring, and attentive. We truly appreciate their hard work and highly recommend them.",
                  author: "Sonia Vasquez",
                  source: "Google Review"
                },
                {
                  quote:
                    "Shay took the time to understand our dog, our family, and the behaviors that concerned us most. His training was practical, personalized, and incredibly effective. By the end of our sessions, our biggest concerns were resolved, making everyday life much easier and more enjoyable.",
                  author: "Matthew Abers",
                  source: "Google Review"
                },
                {
                  quote:
                    "WooF Dogs and their trainers are amazing. After an aggression incident, we enrolled both dogs in Boot Camp and saw excellent results. Shay and John explained every step clearly and taught us how to continue the training at home. We highly recommend their team.",
                  author: "Carrie Wirth",
                  source: "Google Review"
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg motion-reduce:hover:translate-y-0"
                >
                  <div>
                    <div className="flex gap-0.5 text-primary mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-sm leading-relaxed text-muted-foreground">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                  </div>
                  <div className="mt-6 border-t pt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-xs text-primary mt-1">{testimonial.source}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <a
                href="https://www.google.com/search?q=Woof+Dogs+Training+Reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                See more reviews on Google
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
        </LazySection>

        {/* Service Areas Section */}
        <LazySection fallback={<SectionSkeleton height="1200px" />}>
          <ServiceAreasSection variant="full" />
        </LazySection>

        {/* Contact Section */}
        <LazySection fallback={<SectionSkeleton height="1200px" />}>
        <section id="contact" className="w-full py-8 md:py-14 lg:py-18">
          <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary w-fit">
                Contact Us
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Start Training?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-lg">
                Get in touch with us to schedule an evaluation or learn more about our training programs. We&apos;re here to help you and your dog succeed!
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 transition-transform duration-200 hover:translate-x-1 motion-reduce:hover:translate-x-0">
                  <div className="rounded-full bg-primary/10 p-3">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Visit Us</h3>
                    <p className="text-sm text-muted-foreground">4200 Global Trail, Loxahatchee FL, 33470</p>
                    <a
                      href="https://maps.google.com/?q=4200+Global+Trail,+Loxahatchee,+FL+33470"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline font-medium"
                      data-testid="link-contact-get-directions"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 transition-transform duration-200 hover:translate-x-1 motion-reduce:hover:translate-x-0">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <CallLink
                      href="tel:+15615944111"
                      className="text-sm text-muted-foreground hover:text-primary"
                      data-testid="link-contact-call"
                    >
                      (561) 594-4111
                    </CallLink>
                  </div>
                </div>
                <div className="flex items-start gap-4 transition-transform duration-200 hover:translate-x-1 motion-reduce:hover:translate-x-0">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-sm text-muted-foreground">office@woofdogs.com</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 pt-4">
                {[
                  { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
                  { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
                ].map((social, index) => (
                  <div key={index} className="transition-transform duration-200 hover:-translate-y-1 hover:scale-110 active:scale-90 motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100">
                    <a
                      href="#"
                      className="rounded-full border p-3 text-muted-foreground hover:text-foreground hover:border-primary transition-colors block"
                    >
                      {social.icon}
                      <span className="sr-only">{social.label}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border bg-card p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-2">Book Your Evaluation</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Tell us about your dog and preferred times. Our team will contact you back in the next business day.
              </p>
              <div className="space-y-6">
                <div className="rounded-lg bg-muted/30 p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Professional Assessment</h4>
                      <p className="text-sm text-muted-foreground">Get a comprehensive evaluation of your dog&apos;s behavior and temperament</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Customized Plan</h4>
                      <p className="text-sm text-muted-foreground">Receive a personalized training strategy tailored to your needs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                      <Handshake className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Expert Guidance</h4>
                      <p className="text-sm text-muted-foreground">Work with certified trainers who understand your goals</p>
                    </div>
                  </div>
                </div>
                <div className="transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] motion-reduce:hover:scale-100">
                  <BookEvalButton
                    type="button"
                    className="w-full h-12 text-base bg-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,55%)]"
                    size="lg"
                    data-testid="button-contact-book-evaluation"
                  >
                    Book Your Evaluation
                    <ArrowRight className="ml-2" size={20} />
                  </BookEvalButton>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  By booking, you agree to be contacted about scheduling. We never share your information.
                </p>
              </div>
            </div>
          </div>
        </section>
        </LazySection>

        <HomepageBlogSection />
      </main>

    </div>
  );
}
