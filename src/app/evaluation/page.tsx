import Evaluation from "@/page-components/Evaluation";
import { FaqSchema } from "@/components/FaqSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dog Behavioral Evaluation in South Florida",
  description: "Comprehensive behavioral evaluation to understand your dog's temperament, skills, and needs. In-home, training center, and virtual options available.",
  alternates: {
    canonical: "https://woofdogs.com/evaluation",
  },
  openGraph: {
    title: "Dog Behavioral Evaluation in South Florida | WooF Dogs",
    description: "Comprehensive behavioral evaluation to understand your dog's temperament, skills, and needs. In-home, training center, and virtual options available.",
    url: "https://woofdogs.com/evaluation",
    siteName: "WooF Dogs",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://woofdogs.com/trainers.webp", width: 800, height: 600, alt: "WooF Dogs Professional Dog Trainers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Behavioral Evaluation in South Florida | WooF Dogs",
    description: "Comprehensive behavioral evaluation to understand your dog's temperament, skills, and needs. In-home, training center, and virtual options available.",
  },
};

const faqs = [
  {
    question: "How long does the evaluation take?",
    answer: "The evaluation is up to 40 minutes. This includes observing your dog, discussing your goals and challenges, demonstrating assessment exercises, and reviewing our recommendations.",
  },
  {
    question: "What should I prepare before the evaluation?",
    answer: "Have your dog's vaccination records handy, make a list of specific behaviors or goals you'd like to address, and gather any training tools you currently use (leash, collar, treats). For in-home evaluations, just ensure we have space to work safely with your dog.",
  },
  {
    question: "How much does an evaluation cost?",
    answer: "In-home evaluations are $100, virtual and training center evaluations are $50.",
  },
  {
    question: "Is the evaluation required before training?",
    answer: "Yes, we require an evaluation for all new clients. This ensures we fully understand your dog's needs and can recommend the right program level and format. It also gives you a chance to meet us and ask questions before committing to training.",
  },
  {
    question: "What happens after the evaluation?",
    answer: "Within 24-48 hours, you'll receive a written evaluation summary including our findings, behavioral observations, and personalized training recommendations. We'll outline the best program options for your dog and provide clear next steps to get started.",
  },
  {
    question: "Can I bring family members to the evaluation?",
    answer: "Absolutely! We encourage all household members who interact with the dog to attend. This helps us understand family dynamics and ensures everyone is on the same page with training goals and techniques.",
  },
  {
    question: "What if my dog has aggression or severe anxiety?",
    answer: "We work with dogs of all temperaments, including those with aggression, reactivity, or anxiety. Please inform us of any behavioral concerns when booking so we can prepare appropriately and ensure everyone's safety during the evaluation.",
  },
  {
    question: "Do you offer evaluations for puppies?",
    answer: "Yes! Puppy evaluations focus on early development, socialization needs, and foundation training. We assess temperament, bite inhibition, house training progress, and create a customized plan for your puppy's critical early months.",
  },
];

export default function EvaluationPage() {
  return (
    <>
      <BreadcrumbSchema
        pageName="Professional Behavioral Evaluation"
        pageUrl="https://woofdogs.com/evaluation"
      />
      <ServiceSchema
        serviceType="Dog Behavioral Evaluation"
        name="Professional Dog Behavioral Evaluation"
        url="https://woofdogs.com/evaluation"
        description="Comprehensive in-person behavioral evaluation to assess your dog's temperament, habits, and training needs. Available in-home ($100), at our Loxahatchee training center, or virtually ($50). Required for all new training clients."
      />
      <FaqSchema faqs={faqs} />
      <Evaluation />
    </>
  );
}
