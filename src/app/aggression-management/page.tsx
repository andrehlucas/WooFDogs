import AggressionManagement from "@/page-components/AggressionManagement";
import { FaqSchema } from "@/components/FaqSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dog Aggression Management South Florida",
  description: "Aggression management in South Florida for reactivity and bite-risk behaviors. Safety-first behavior plans and coaching—start with an assessment.",
  alternates: {
    canonical: "https://woofdogs.com/aggression-management",
  },
  openGraph: {
    title: "Dog Aggression Management South Florida | WooF Dogs",
    description: "Aggression management in South Florida for reactivity and bite-risk behaviors. Safety-first behavior plans and coaching—start with an assessment.",
    url: "https://woofdogs.com/aggression-management",
    siteName: "WooF Dogs",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://woofdogs.com/trainers.webp", width: 800, height: 600, alt: "WooF Dogs Professional Dog Trainers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Aggression Management South Florida | WooF Dogs",
    description: "Aggression management in South Florida for reactivity and bite-risk behaviors. Safety-first behavior plans and coaching—start with an assessment.",
  },
};

const faqs = [
  {
    question: "Can all aggressive dogs be rehabilitated?",
    answer: "Most cases show significant improvement with proper training, but success depends on history, severity, consistency, and underlying causes. We provide honest assessments and realistic expectations during evaluation.",
  },
  {
    question: "Is my dog dangerous, or can they be helped?",
    answer: "Aggression exists on a spectrum. Our evaluation determines severity, risk level, and whether behavior modification is appropriate. Some cases may require lifelong management rather than complete elimination of aggression.",
  },
  {
    question: "How long does aggression training take?",
    answer: "Timelines vary widely, from 8 weeks for mild reactivity to 6+ months for severe cases. Your trainer will outline realistic milestones after the evaluation based on your dog's specific situation.",
  },
  {
    question: "Do you use shock collars or punishment?",
    answer: "We use humane, science-based methods tailored to each dog. Tools are introduced only when appropriate for safety and effectiveness, always with clear guidance and your informed consent.",
  },
  {
    question: "What if my dog has bitten someone?",
    answer: "Bite history is taken seriously. We assess the context, severity, and patterns to determine if training is safe and appropriate. Some cases may require veterinary behaviorist referral or specialized protocols.",
  },
  {
    question: "Will my dog ever be 'normal' around other dogs?",
    answer: "Goals are individualized. Some dogs achieve full social comfort; others learn controlled tolerance. We focus on safety, quality of life, and realistic outcomes based on your dog's specific triggers and history.",
  },
  {
    question: "Can I work with my dog myself, or do I need a trainer?",
    answer: "Aggression requires professional expertise for safety and effectiveness. DIY attempts often worsen the behavior or create dangerous situations. We teach you the skills to maintain progress after training ends.",
  },
];

export default function AggressionManagementPage() {
  return (
    <>
      <BreadcrumbSchema
        pageName="Dog Aggression Management"
        pageUrl="https://woofdogs.com/aggression-management"
      />
      <ServiceSchema
        serviceType="Dog Aggression Management"
        name="Dog Aggression Management in South Florida"
        url="https://woofdogs.com/aggression-management"
        description="Safety-first behavior modification for reactive and aggressive dogs in South Florida. Shay Maimoni brings 30+ years of experience including military K9 work to address the root causes of aggression — not just the symptoms."
      />
      <FaqSchema faqs={faqs} />
      <AggressionManagement />
    </>
  );
}
