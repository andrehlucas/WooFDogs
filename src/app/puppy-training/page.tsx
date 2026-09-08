import PuppyTraining from "@/page-components/PuppyTraining";
import { FaqSchema } from "@/components/FaqSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
import { RelatedBlogPosts } from "@/components/blog/RelatedBlogPosts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Puppy Training in Palm Beach County, FL",
  description: "Puppy training in South Florida with age-appropriate structure, socialization guidance, and manners at home. Start with an evaluation—book today.",
  alternates: {
    canonical: "https://woofdogs.com/puppy-training",
  },
  openGraph: {
    title: "Puppy Training in Palm Beach County, FL | WooF Dogs",
    description: "Puppy training in South Florida with age-appropriate structure, socialization guidance, and manners at home. Start with an evaluation—book today.",
    url: "https://woofdogs.com/puppy-training",
    siteName: "WooF Dogs",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://woofdogs.com/trainers.webp", width: 800, height: 600, alt: "WooF Dogs Professional Dog Trainers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Puppy Training in Palm Beach County, FL | WooF Dogs",
    description: "Puppy training in South Florida with age-appropriate structure, socialization guidance, and manners at home. Start with an evaluation—book today.",
  },
};

const faqs = [
  {
    question: "How early can I start training my puppy?",
    answer: "We begin puppy training as early as 8 weeks old. Early socialization and foundational obedience during the critical development window sets your puppy up for lifelong success.",
  },
  {
    question: "What does a puppy training session look like?",
    answer: "Sessions are tailored to your puppy's age and development stage. We cover potty training, crate training, bite inhibition, basic commands, leash manners, and structured socialization — all in short, age-appropriate segments.",
  },
  {
    question: "Should I wait until my puppy has all vaccinations before training?",
    answer: "No. The critical socialization window closes around 16 weeks. Waiting too long can lead to fear and behavioral issues later. We use safe, controlled environments for early training while respecting vaccination schedules.",
  },
  {
    question: "How long does puppy training take?",
    answer: "Most puppies show significant progress within 4-8 weeks with consistent practice. The exact timeline depends on your puppy's age, breed, temperament, and your training goals. We set clear milestones during the evaluation.",
  },
  {
    question: "Do you offer in-home puppy training?",
    answer: "Yes! In-home sessions let us address real-world behaviors in the environment where they happen most — your home. We also offer board-and-train programs at our facility in Loxahatchee for immersive training.",
  },
];

export default function PuppyTrainingPage() {
  return (
    <>
      <BreadcrumbSchema
        pageName="Puppy Training"
        pageUrl="https://woofdogs.com/puppy-training"
      />
      <ServiceSchema
        serviceType="Puppy Training"
        name="Puppy Training in South Florida"
        url="https://woofdogs.com/puppy-training"
        description="Age-appropriate puppy training covering potty training, crate training, bite inhibition, basic commands, leash manners, and socialization. Programs start at 8 weeks old — in-home and board-and-train options available."
      />
      <FaqSchema faqs={faqs} />
      <PuppyTraining />
      <RelatedBlogPosts
        postSlugs={["puppy-training-south-florida", "dog-training-cost-south-florida"]}
        heading="From the WooF Dogs Blog"
      />
    </>
  );
}
