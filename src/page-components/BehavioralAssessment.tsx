"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  MapPin,
  Brain,
  Target,
  Heart,
  CheckCircle2,
  TrendingUp,
  Zap,
  AlertTriangle,
  ShieldAlert,
  Eye,
  MessageSquare,
  ClipboardList,
  Search,
  Presentation,
  Star,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { FaqAccordion } from "@/components/ui/faq-accordion";

const BehavioralAssessment = () => {
  const { openModal } = useBookingModal();

  return (
    <div className="min-h-screen bg-background text-foreground">

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
              Behavioral Assessment: The Foundation for Lasting Results
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2" data-testid="text-hero-subtitle">
              Every program starts here. A professional evaluation of your dog's temperament, habits, and needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14" onClick={openModal} data-testid="button-hero-book">
                Book Your Assessment
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 sm:mb-8">
                <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-overview-label">
                  Why Assessment Matters
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" data-testid="text-overview-title">
                  Understanding Your Dog Is Step One
                </h2>
                <div className="space-y-4 text-base sm:text-lg text-muted-foreground">
                  <p data-testid="text-overview-paragraph-0">
                    Begin with a professional evaluation of your dog's temperament, habits, and needs. Our Lead trainer analyzes behavior patterns to design a personalized training plan that addresses your specific challenges and goals.
                  </p>
                  <p data-testid="text-overview-paragraph-1">
                    During the comprehensive assessment, we discuss your dog's reactions, communication style, motivations, and behavioral triggers. This allows us to identify the root causes of issues and create a targeted approach.
                  </p>
                  <p data-testid="text-overview-paragraph-2">
                    Every program starts here. This is the foundation for lasting results. You'll receive a clear roadmap with realistic timelines and expectations for your training journey.
                  </p>
                  <p data-testid="text-overview-paragraph-3">
                    Many dog owners try training techniques they find online, only to discover the real issue was misidentified from the start. A professional behavioral assessment eliminates guesswork. We observe how your dog responds to people, other animals, environmental stimuli, and everyday situations to build a complete picture before recommending any program.
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-primary/5 p-5 sm:p-6 rounded-xl border border-primary/20"
                data-testid="card-included"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-4" data-testid="text-included-title">
                  What's Included:
                </h3>
                <ul className="space-y-2">
                  {[
                    "Comprehensive temperament evaluation",
                    "Behavioral pattern analysis",
                    "Environmental assessment",
                    "Learning style identification",
                    "Personalized training recommendations",
                    "Written summary of findings",
                    "Program recommendations with timelines"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3" data-testid={`item-included-${index}`}>
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" data-testid={`icon-included-${index}`} />
                      <span className="text-sm sm:text-base" data-testid={`text-included-${index}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

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
                      Get Started
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3" data-testid="text-book-title">
                      Schedule Your Assessment
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground mb-6" data-testid="text-book-description">
                      Book your professional assessment and take the first step toward a well-trained, happy companion.
                    </p>
                  </div>
                  <Button 
                    onClick={openModal}
                    className="w-full h-11 text-base bg-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,55%)]" 
                    size="lg" 
                    data-testid="button-submit"
                  >
                    Book Assessment
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

      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-process-label">
              Our Process
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-process-title">
              What Happens During Your Assessment
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-process-subtitle">
              A professional behavioral consultation designed to understand your dog's history, identify the factors contributing to the behavior, and develop a realistic training and behavior-modification plan.
            </p>
          </motion.div>

          <div className="space-y-6 sm:space-y-8">
            {[
              {
                icon: ClipboardList,
                step: 1,
                title: "Behavioral History and Background Review",
                description: "We begin by gathering detailed information about your dog's history, household environment, daily routine, previous training, medical background, and the behavioral concerns you are experiencing. We will ask when the behavior started, how often it occurs, what typically happens before and after each incident, and whether the behavior has changed over time. This helps us identify patterns, possible triggers, and contributing factors that may not be visible during a single appointment."
              },
              {
                icon: MessageSquare,
                step: 2,
                title: "Owner and Handler Interview",
                description: "A significant part of the assessment is a detailed conversation with the owner or handler. You will be asked to describe specific incidents, including what the dog did, what was happening at the time, how people responded, and what happened afterward. Whenever possible, we recommend that all household members or handlers who regularly interact with the dog participate in the assessment. Different people may experience or interpret the behavior differently, and their input can provide valuable information."
              },
              {
                icon: Eye,
                step: 3,
                title: "Direct Behavioral Observation",
                description: "During the consultation, we observe your dog's behavior in the assessment environment. We evaluate body language, arousal level, confidence, social interaction, recovery from stress, response to handling, engagement with the handler, and ability to focus. We may also observe food motivation, toy interest, frustration tolerance, impulse control, and response to basic cues when appropriate and safe."
              },
              {
                icon: Target,
                step: 4,
                title: "Identification of Triggers and Behavioral Patterns",
                description: "In most cases, we do not intentionally expose the dog to a known trigger or attempt to provoke an aggressive, fearful, or reactive response. Instead, we identify likely triggers and behavioral patterns through the owner interview, incident history, available videos, and the dog's behavior during the assessment. This allows us to evaluate the concern without unnecessarily placing the dog, owner, staff, other animals, or members of the public at risk. Some triggers may require additional observation during future training sessions or in a controlled environment before a final conclusion can be made."
              },
              {
                icon: Brain,
                step: 5,
                title: "Behavioral Assessment and Training Recommendations",
                description: "Based on the information provided and our direct observations, we explain our assessment of the behavior, the likely factors contributing to it, and the level of concern involved. We discuss the training methods, management strategies, safety precautions, and behavior-modification approach that may be appropriate for your dog. We also explain what owner participation will be required and what realistic progress may look like. Because behavior is influenced by many factors, recommendations may be adjusted as training progresses and additional information becomes available."
              },
              {
                icon: Presentation,
                step: 6,
                title: "Customized Training Plan and Program Options",
                description: "Before the assessment concludes, we present a recommended training plan based on your dog's needs and your family's goals. This may include private training, a structured board-and-train program, behavior-modification sessions, owner coaching, management protocols, or a combination of services. We explain the recommended program, anticipated training priorities, estimated timeline, owner responsibilities, and applicable pricing so you can make an informed decision. Many clients choose a training option during the assessment. Others prefer to review the written report before making a final decision."
              },
              {
                icon: FileText,
                step: 7,
                title: "Written Assessment Report and Follow-Up",
                description: "Following the consultation, you will receive a written behavioral assessment and training recommendation by email. The report summarizes the concerns discussed, relevant behavioral history, observations, safety considerations, recommended training approach, and available program options. After the report has been sent, our office may contact you to answer questions, review the recommendations, and assist you with scheduling the appropriate training program."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="flex gap-4 sm:gap-6 items-start"
                data-testid={`card-process-${index}`}
              >
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center" data-testid={`icon-wrapper-${index}`}>
                    <step.icon className="w-6 h-6 text-primary" data-testid={`icon-process-${index}`} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full" data-testid={`text-process-step-number-${index}`}>
                      Step {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2" data-testid={`text-process-step-title-${index}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed" data-testid={`text-process-step-description-${index}`}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-issues-label">
              What We Assess
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-issues-title">
              Behavior Issues We Address
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-issues-subtitle">
              Our behavioral assessments help us understand the concerns you are experiencing, identify likely contributing factors, evaluate potential safety risks, and recommend an appropriate training and behavior-modification plan. The assessment combines a detailed owner or handler interview with professional observation of your dog during the consultation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                icon: ShieldAlert,
                title: "Aggression",
                description: "Aggressive behavior toward people or other animals is a serious concern that requires careful assessment, responsible management, and an individualized training plan. During the consultation, we review the dog's behavioral history, the circumstances surrounding previous incidents, warning signals, escalation patterns, and the owner's response. We also observe the dog's body language, arousal level, social behavior, and interaction with the handler. Based on the available information, we identify likely contributing factors and recommend appropriate safety measures, training methods, and behavior-modification strategies."
              },
              {
                icon: Heart,
                title: "Anxiety & Fear",
                description: "Fear and anxiety may appear as avoidance, trembling, excessive panting, pacing, vocalization, destructive behavior, difficulty settling, or attempts to escape. During the assessment, we review when and where the behavior occurs, how long it lasts, what appears to trigger it, and how the dog recovers afterward. We also observe the dog's body language and stress responses during the consultation. When separation-related behavior is reported, additional observation, video documentation, or veterinary consultation may be recommended."
              },
              {
                icon: Zap,
                title: "Reactivity",
                description: "Reactive behavior may include barking, lunging, pulling, freezing, avoidance, or difficulty disengaging from people, dogs, vehicles, bicycles, or other environmental stimuli. During the assessment, we review the situations in which the behavior occurs, the approximate distance at which the dog becomes concerned or loses focus, the intensity of the response, and how quickly the dog recovers. We do not intentionally provoke a reaction solely for testing purposes. When appropriate, thresholds and recovery patterns may be evaluated more precisely during future training sessions under controlled and safe conditions."
              },
              {
                icon: AlertTriangle,
                title: "Resource Guarding",
                description: "Resource guarding may involve food, toys, stolen objects, resting areas, personal space, or access to a particular person. During the assessment, we review the dog's history of guarding, the resources involved, warning signals, bite history, escalation pattern, and the circumstances surrounding previous incidents. We generally do not intentionally provoke guarding behavior during the consultation. Based on the reported history and our observations, we recommend immediate safety and management measures along with an individualized behavior-modification plan."
              }
            ].map((issue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background p-6 rounded-xl border border-border hover:shadow-lg transition-shadow"
                data-testid={`card-issue-${index}`}
              >
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4" data-testid={`icon-issue-${index}`}>
                  <issue.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2" data-testid={`text-issue-title-${index}`}>
                  {issue.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed" data-testid={`text-issue-description-${index}`}>
                  {issue.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-comparison-label">
              Know the Difference
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-comparison-title">
              Assessment vs. Training — What's the Difference?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-comparison-subtitle">
              Many dog owners wonder whether they need an assessment, training, or both. Here's a clear breakdown.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-primary/5 p-6 sm:p-8 rounded-xl border border-primary/20"
              data-testid="card-comparison-assessment"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4" data-testid="text-comparison-assessment-title">Behavioral Assessment</h3>
              <ul className="space-y-3">
                {[
                  "Diagnostic evaluation — identifies the root cause of behavior",
                  "40-minute one-on-one session with our Lead trainer",
                  "Observes temperament, triggers, thresholds, and drive levels",
                  "Produces a written report with findings and recommendations",
                  "Required before starting any training program",
                  "Helps you understand why your dog behaves the way they do",
                  "One-time session — no ongoing commitment"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3" data-testid={`item-comparison-assessment-${i}`}>
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background p-6 sm:p-8 rounded-xl border border-border"
              data-testid="card-comparison-training"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4" data-testid="text-comparison-training-title">Training Programs</h3>
              <ul className="space-y-3">
                {[
                  "Action phase — teaches new behaviors and modifies existing ones",
                  "Multiple sessions over weeks or months",
                  "Uses techniques matched to your dog's assessment results",
                  "Options include private lessons, board & train, and bootcamp",
                  "Builds on the assessment's findings and recommendations",
                  "Involves owner education and homework between sessions",
                  "Ongoing support until goals are achieved"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3" data-testid={`item-comparison-training-${i}`}>
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 bg-muted/50 p-5 sm:p-6 rounded-xl border border-border text-center"
            data-testid="card-comparison-summary"
          >
            <p className="text-base sm:text-lg text-muted-foreground" data-testid="text-comparison-summary">
              Think of it this way: the assessment is the diagnosis, and training is the treatment. You wouldn't start medication without a doctor's evaluation — and you shouldn't start a training program without understanding your dog's unique behavioral profile first.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="testimonials" className="py-12 sm:py-20">
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
              What Owners Say About Their Assessment
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-testimonials-description">
              Hear from dog owners in South Florida who started their journey with a behavioral assessment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                quote: "The assessment completely changed how I understood my dog's aggression. It wasn't dominance — it was fear. Once we knew that, the right training approach was obvious. I wish I'd done this a year earlier.",
                author: "Rachel K.",
                dog: "Duke, German Shepherd",
                source: "Google Review"
              },
              {
                quote: "I was skeptical about paying for an evaluation before training, but it saved us time and money. The trainer pinpointed exactly what was driving my dog's reactivity and gave us a clear plan. No guesswork.",
                author: "David P.",
                dog: "Scout, Australian Cattle Dog",
                source: "Google Review"
              },
              {
                quote: "Our rescue had severe anxiety and I had no idea where to start. The behavioral assessment gave us a roadmap — what to work on first, what to manage, and realistic expectations. We finally felt hopeful.",
                author: "Amanda T.",
                dog: "Penny, Pit Bull Mix",
                source: "Google Review"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background p-5 sm:p-6 rounded-xl shadow-sm border border-border"
                data-testid={`card-testimonial-${index}`}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" data-testid={`icon-star-${index}-${i}`} />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 italic leading-relaxed" data-testid={`text-testimonial-quote-${index}`}>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-sm sm:text-base" data-testid={`text-testimonial-author-${index}`}>
                    {testimonial.author}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground" data-testid={`text-testimonial-dog-${index}`}>
                    {testimonial.dog}
                  </p>
                  <p className="text-xs text-primary mt-1" data-testid={`text-testimonial-source-${index}`}>
                    {testimonial.source}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-faq-label">
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-faq-title">
              Common Questions About Behavioral Assessments
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2" data-testid="text-faq-subtitle">
              Everything you need to know before booking your dog's behavioral evaluation in South Florida.
            </p>
          </motion.div>

          <FaqAccordion
            faqs={[
              {
                question: "How long does a behavioral assessment take?",
                answer: "A typical behavioral assessment lasts about 40 minutes. This includes observation time, temperament testing, a discussion with you about your goals and concerns, and presentation of our findings and recommendations. We never rush — if your dog needs extra time to settle in, we accommodate that."
              },
              {
                question: "Do I need to bring my dog to the assessment?",
                answer: "Yes, your dog must be present for the assessment. We need to observe their behavior, body language, and responses to stimuli firsthand. We'll let you know ahead of time if there's anything specific to bring (favorite toy, treats, etc.) based on the concerns you've described."
              },
              {
                question: "Where does the assessment take place?",
                answer: "Assessments are conducted at our training facility in South Florida. We serve Boca Raton, Delray Beach, Wellington, West Palm Beach, Palm Beach Gardens, Loxahatchee, and surrounding areas. We may offer in-home assessments for puppies and mild behavior modification cases."
              },
              {
                question: "How much does a behavioral assessment cost?",
                answer: "Behavioral assessments done at the training center or virtually cost $50. In-home evaluations cost $100. If you enroll in a training program the day of your evaluation, the evaluation fee is credited toward your program cost."
              },
              {
                question: "What's the difference between an assessment and a training session?",
                answer: "An assessment is a diagnostic evaluation — we observe, test, and analyze your dog's behavior to understand what's driving it. A training session is where we actively work on changing behavior through exercises, drills, and repetition. The assessment always comes first because the right training approach depends on accurate diagnosis."
              },
              {
                question: "What should I do to prepare for the assessment?",
                answer: "Bring your dog on a standard leash and collar (no retractable leashes). Don't feed your dog a full meal right before the session — a slightly hungry dog is more responsive to food-based evaluations. Bring any treats or toys your dog particularly loves. Most importantly, come with a list of specific behaviors or situations that concern you."
              },
              {
                question: "What happens after the assessment?",
                answer: "After the assessment, you'll receive a written summary of our findings along with specific training program recommendations. We'll discuss which program best fits your dog's needs and your schedule — options include private lessons, board & train, bootcamp, and specialized programs for aggression or anxiety. There's no obligation to enroll."
              },
              {
                question: "Can you assess dogs with a bite history?",
                answer: "Yes, we regularly assess dogs with bite histories. Safety is our top priority. We may ask you to put a muzzle on your dog prior to arriving at the training center for the evaluation. Please disclose any bite history when booking so we can prepare appropriately."
              },
              {
                question: "Is one assessment enough, or will my dog need multiple evaluations?",
                answer: "The initial evaluation is sufficient; however, as training progresses, the trainer will continue to evaluate and make any necessary adjustments to the training plan."
              },
              {
                question: "Do you assess puppies, or is this only for dogs with behavior problems?",
                answer: "We assess dogs of all ages, including puppies. A puppy assessment helps identify early behavioral tendencies, set realistic training expectations, and prevent problems before they develop. It's actually one of the most valuable investments you can make — addressing potential issues at 4-6 months is far easier than correcting established patterns at 2 years."
              }
            ]}
            testIdPrefix="faq"
            data-testid="faq-accordion"
          />
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="text-xs sm:text-sm font-semibold text-primary mb-2 uppercase tracking-wide" data-testid="text-cta-label">
              Ready to Get Started?
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 px-2" data-testid="text-cta-title">
              Book Your Behavioral Assessment Today
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 px-2" data-testid="text-cta-description">
              Take the first step toward understanding your dog and building a customized training plan that delivers real results. Our professional assessment gives you the clarity and confidence to move forward.
            </p>
            <Button 
              onClick={openModal}
              size="lg" 
              className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 bg-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,55%)]"
              data-testid="button-cta-book"
            >
              Schedule Assessment
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BehavioralAssessment;
