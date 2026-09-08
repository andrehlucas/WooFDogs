import './_group.css';
import { motion } from 'framer-motion';
import {
  ArrowRight, MapPin, Phone, Mail, Heart, Award, Users, Shield,
  Brain, BookOpen, Scale, Target, ClipboardList, CheckCircle2,
  Star, ChevronRight, Dog, Baby, ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// ─── Boca Raton data (inlined) ────────────────────────────────────────────────
const data = {
  cityName: 'Boca Raton',
  heroTagline: 'Trusted by Boca Raton families for over a decade',
  introText:
    'Boca Raton dog owners expect the best for their pets, and WooF Dogs delivers. Whether you live near Mizner Park, West Boca, or the Boca West communities, our certified trainers come to you for personalized in-home sessions or welcome your dog to our training facility in nearby Loxahatchee.',
  localDescription:
    'From the bustling sidewalks of Palmetto Park Road to the dog-friendly trails at Patch Reef Park and Sugar Sand Park, Boca Raton offers plenty of environments where a well-trained dog can truly shine. Our programs prepare your dog to be calm, confident, and well-mannered in every setting — from outdoor dining at Royal Palm Place to walks along the Intracoastal.',
  nearbyAreas: ['Deerfield Beach', 'Delray Beach', 'Coconut Creek', 'Parkland', 'Highland Beach'],
  testimonials: [
    {
      quote: "We live in East Boca and our Golden was a handful on walks near the Intracoastal. After just 6 sessions with WooF Dogs, she heels perfectly and ignores distractions. Neighbors keep asking what changed!",
      author: 'Rachel S.',
      dog: 'Sunny, Golden Retriever',
      source: 'Google Review',
    },
    {
      quote: "Our rescue had severe anxiety living in our Boca condo. Shay's patience and expertise gave our dog confidence we didn't think was possible. Truly life-changing for our whole family.",
      author: 'David & Maria L.',
      dog: 'Coco, Mixed Breed',
      source: 'Google Review',
    },
    {
      quote: "We needed service animal training for our son's support dog. The professionalism, knowledge, and genuine care from the WooF Dogs team exceeded every expectation.",
      author: 'Jennifer K.',
      dog: 'Scout, Labrador',
      source: 'Google Review',
    },
  ],
  faqs: [
    { question: 'Do you offer in-home dog training in Boca Raton?', answer: 'Yes! We provide in-home training throughout Boca Raton, including East Boca, West Boca, Boca Falls, Boca Bridges, and all surrounding neighborhoods.' },
    { question: 'How much does dog training cost in Boca Raton?', answer: 'Our programs vary depending on goals, training modality, and the number of sessions. Every journey begins with a professional evaluation. Contact us for a free phone consultation to discuss pricing.' },
    { question: 'What types of dog training do you offer in Boca Raton?', answer: 'We offer obedience training, puppy training, service animal training, therapy dog preparation, aggression management, and board-and-train programs.' },
    { question: 'How long does it take to train a dog in Boca Raton?', answer: 'Most families see significant progress within 4–8 weeks of consistent training. Puppies may need a longer foundation period, while behavioral issues may require ongoing support.' },
    { question: 'Do you train aggressive dogs in Boca Raton?', answer: 'Yes, aggression management is one of our specialties. Our lead trainer Shay Maimoni has over 30 years of experience working with reactive and aggressive dogs.' },
    { question: 'Can you train my puppy in Boca Raton?', answer: 'Absolutely! We start puppy training as early as 8 weeks old. Our curriculum covers potty training, bite inhibition, socialization, crate training, and foundational obedience.' },
    { question: 'What areas near Boca Raton do you serve?', answer: 'We also serve Deerfield Beach, Delray Beach, Coconut Creek, Parkland, Highland Beach, and the greater South Palm Beach County area.' },
    { question: 'Do you offer board-and-train programs for Boca Raton dogs?', answer: 'Yes! Our board-and-train program takes place at our facility in Loxahatchee. Your dog stays with our trainers for an immersive experience, then we transfer all skills back to you.' },
  ],
  napStatement: 'WooF Dogs is located at 4200 Global Trail, Loxahatchee, FL 33470. We proudly serve Boca Raton and all of Palm Beach County. Call us at (561) 594-4111 or email office@woofdogs.com.',
};

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemFadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

// ─── Inlined FaqAccordion ─────────────────────────────────────────────────────
function FaqAccordion({ faqs, className, itemClassName, triggerClassName, contentClassName, testIdPrefix = 'accordion' }: {
  faqs: { question: string; answer: string }[];
  className?: string; itemClassName?: string; triggerClassName?: string; contentClassName?: string; testIdPrefix?: string;
}) {
  return (
    <div className={cn('space-y-3 sm:space-y-4', className)}>
      {faqs.map((faq, index) => (
        <details key={index} className={cn('group border-b', itemClassName)}>
          <summary className={cn('flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline cursor-pointer list-none [&::-webkit-details-marker]:hidden', triggerClassName)}>
            {faq.question}
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="grid grid-rows-[0fr] group-open:grid-rows-[1fr] transition-[grid-template-rows] duration-200 overflow-hidden">
            <div className="overflow-hidden">
              <div className={cn('text-sm pb-4 pt-0 text-muted-foreground', contentClassName)}>
                {faq.answer}
              </div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

// ─── Stub Navbar ──────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/90 backdrop-blur border-b border-border flex items-center px-6">
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl tracking-tight">WooF Dogs</span>
        <span className="text-xs text-muted-foreground hidden sm:block">We Speak Your Dog's Language</span>
      </div>
      <nav className="ml-auto flex items-center gap-6 text-sm font-medium">
        <a href="#" className="text-muted-foreground hover:text-foreground">About</a>
        <a href="#" className="text-muted-foreground hover:text-foreground">Services</a>
        <a href="#" className="text-muted-foreground hover:text-foreground">Contact</a>
        <Button size="sm" className="bg-[hsl(0,85%,55%)] hover:bg-[hsl(0,85%,50%)] text-white">
          Get Started
        </Button>
      </nav>
    </header>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export function Current() {
  const openModal = () => {};

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full mb-4 sm:mb-6">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">{data.heroTagline}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              Dog Training in {data.cityName}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
              {data.introText}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 bg-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,55%)]" onClick={openModal}>
                Book a Consultation
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14" asChild>
                <a href="tel:+15615944111">
                  <Phone className="mr-2" size={20} />
                  (561) 594-4111
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-8 sm:mb-12">
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Our Services</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2">Training Programs in {data.cityName}</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Comprehensive training solutions tailored for {data.cityName} dog owners
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ClipboardList, title: `Obedience Training in ${data.cityName}`, description: 'From basic commands to expert off-leash control. Our structured obedience program builds clear communication, focus, and real-world reliability — in your home or at our facility.', href: '/obedience', linkText: 'Learn about obedience training' },
              { icon: Baby, title: `Puppy Training in ${data.cityName}`, description: 'Start your puppy\'s journey right with age-appropriate training. We cover potty training, bite inhibition, socialization, crate training, and foundational obedience from 8 weeks old.', href: '/puppy-training', linkText: 'Learn about puppy training' },
              { icon: Dog, title: `Service Animal Training in ${data.cityName}`, description: 'Specialized training for service dogs providing life-changing support. Task-specific training, public access preparation, and full certification guidance for individuals with disabilities.', href: '/service-animal-training', linkText: 'Learn about service animal training' },
            ].map((service, index) => (
              <motion.div key={index} variants={itemFadeIn} className="bg-background p-6 sm:p-8 rounded-xl shadow-sm border border-border hover:shadow-lg transition-all">
                <service.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">{service.description}</p>
                <a href={service.href} className="text-sm font-medium text-primary hover:underline inline-flex items-center">
                  {service.linkText}<ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-8 sm:mb-12">
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Why Choose Us</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2">Why Dog Owners in {data.cityName} Choose WooF Dogs</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Shield, title: '30+ Years Experience', description: 'Our lead trainer Shay Maimoni brings military K9, police, and civilian dog training expertise spanning three decades.' },
              { icon: Scale, title: 'Balanced Methods', description: 'We use reward-focused, science-based techniques with clear, humane structure that dogs understand and respond to.' },
              { icon: Award, title: 'Certified Professionals', description: 'Every trainer on our team is professionally certified and experienced with all breeds, temperaments, and behavioral challenges.' },
              { icon: Users, title: 'Owner Coaching', description: 'We don\'t just train your dog — we coach you with the skills and knowledge to maintain results for life.' },
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="bg-muted/30 p-6 sm:p-8 rounded-xl">
                <item.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Common Issues ── */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-8 sm:mb-12">
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Common Challenges</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2">Issues We Solve for {data.cityName} Dog Owners</h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {['Leash pulling and lunging on walks','Reactivity toward other dogs or people','Jumping on guests and family members','Separation anxiety and destructive behavior','Excessive barking and whining','Ignoring commands and selective listening','Counter-surfing and door dashing','Aggression toward people or animals','Fear-based behaviors and nervousness'].map((issue, index) => (
              <motion.div key={index} variants={itemFadeIn} className="flex items-start gap-3 bg-background p-4 sm:p-5 rounded-lg border border-border">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base">{issue}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-8 sm:mb-12">
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Our Process</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2">How Training Works in {data.cityName}</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">A proven, step-by-step approach that delivers lasting results</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
            {[
              { step: '1', title: 'Free Phone Consult', description: 'Tell us about your dog and your goals. We\'ll answer questions and determine if we\'re the right fit.' },
              { step: '2', title: 'Professional Evaluation', description: 'We assess your dog\'s temperament, behavior, motivation, and current skill level in person.' },
              { step: '3', title: 'Custom Training Plan', description: 'Based on the evaluation, we design a personalized plan with clear milestones and realistic timelines.' },
              { step: '4', title: 'Training Sessions', description: 'Structured sessions (in-home or at our facility) with consistent practice and homework between visits.' },
              { step: '5', title: 'Follow-Up Support', description: 'Ongoing guidance, refresher sessions, and owner coaching to maintain results long-term.' },
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="text-center p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4">{item.step}</div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-8 sm:mb-12">
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Testimonials</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2">What {data.cityName} Families Say</h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-6 lg:grid-cols-3">
            {data.testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemFadeIn} className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm hover:shadow-lg transition-all">
                <div>
                  <div className="flex gap-0.5 text-primary mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <blockquote className="text-sm leading-relaxed text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                </div>
                <div className="mt-6 border-t pt-4">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.dog}</p>
                  <p className="text-xs text-primary mt-1">{testimonial.source}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing + CTA ── */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Pricing</div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">Training Packages & Pricing</h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6">Every dog is different, so every training plan is customized. Here&apos;s what to expect:</p>
              <div className="space-y-4">
                {[
                  { title: 'Professional Evaluation', detail: 'In-home or facility-based assessment of your dog\'s behavior, temperament, and training needs.' },
                  { title: 'Private Training Sessions', detail: 'One-on-one in-home sessions with a certified trainer.' },
                  { title: 'Board & Train Bootcamp', detail: 'Immersive training at our Loxahatchee facility. 2-week minimum with review/owner transfer sessions included.' },
                  { title: 'Puppy Program', detail: 'Age-appropriate curriculum for puppies 8 weeks and older. In-home or VIP board & train options.' },
                ].map((pkg, index) => (
                  <div key={index} className="bg-muted/30 p-5 rounded-xl">
                    <h3 className="font-semibold mb-1">{pkg.title}</h3>
                    <p className="text-sm text-muted-foreground">{pkg.detail}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-6 italic">Contact us for current pricing. Every program starts with a professional evaluation.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="sticky top-24">
                <div className="bg-background p-6 sm:p-8 rounded-xl shadow-lg border-2 border-primary/20">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3">Ready to Get Started in {data.cityName}?</h3>
                  <p className="text-muted-foreground mb-6">Book a phone consultation or schedule your evaluation today. We&apos;ll create a customized plan for your dog.</p>
                  <div className="space-y-3">
                    <Button onClick={openModal} className="w-full h-12 text-base bg-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,55%)]" size="lg">
                      Schedule Your Evaluation
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                    <Button variant="outline" className="w-full h-12 text-base" size="lg" asChild>
                      <a href="tel:+15615944111"><Phone className="mr-2" size={20} />Call (561) 594-4111</a>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-4">Free phone consultations available. No obligation.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Local + FAQ ── */}
      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <p className="text-base sm:text-lg text-muted-foreground mb-8">{data.localDescription}</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2">Dog Training FAQ — {data.cityName}</h2>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            <FaqAccordion faqs={data.faqs} className="space-y-3" itemClassName="border rounded-lg bg-background px-4 sm:px-6" triggerClassName="text-left text-sm sm:text-base font-medium py-4 hover:no-underline" contentClassName="text-sm sm:text-base text-muted-foreground pb-4" testIdPrefix="accordion-city-faq" />
          </div>
        </div>
      </section>

      {/* ── NAP + Final CTA ── */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2">Serving {data.cityName} & Surrounding Areas</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">{data.napStatement}</p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {data.nearbyAreas.map((area, index) => (
                <span key={index} className="inline-block rounded-full bg-primary/10 px-3 py-1.5 text-xs sm:text-sm font-medium text-primary">{area}</span>
              ))}
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto mb-8">
            <div className="text-center p-4 sm:p-6 bg-muted/30 rounded-xl">
              <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">4200 Global Trail</p>
              <p className="text-sm text-muted-foreground">Loxahatchee, FL 33470</p>
              <a href="https://maps.google.com/?q=4200+Global+Trail,+Loxahatchee,+FL+33470" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-medium">Get Directions</a>
            </div>
            <div className="text-center p-4 sm:p-6 bg-muted/30 rounded-xl">
              <Phone className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Call Us</p>
              <a href="tel:+15615944111" className="text-sm text-muted-foreground hover:text-primary">(561) 594-4111</a>
            </div>
            <div className="text-center p-4 sm:p-6 bg-muted/30 rounded-xl">
              <Mail className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Email Us</p>
              <a href="mailto:office@woofdogs.com" className="text-sm text-muted-foreground hover:text-primary">office@woofdogs.com</a>
            </div>
          </div>
          <div className="text-center">
            <Button size="lg" className="text-base sm:text-lg px-8 h-12 sm:h-14 bg-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,55%)]" onClick={openModal}>
              Book Your Consultation Today
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
