import DogObedience from "@/page-components/DogObedience";
import { FaqSchema } from "@/components/FaqSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
import { RelatedBlogPosts } from "@/components/blog/RelatedBlogPosts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dog Obedience Training in South Florida",
  description: "Obedience training in South Florida for real-life manners—loose leash walking, recall, and impulse control. Personalized plan—schedule an evaluation.",
  alternates: {
    canonical: "https://woofdogs.com/obedience",
  },
  openGraph: {
    title: "Dog Obedience Training in South Florida | WooF Dogs",
    description: "Obedience training in South Florida for real-life manners—loose leash walking, recall, and impulse control. Personalized plan—schedule an evaluation.",
    url: "https://woofdogs.com/obedience",
    siteName: "WooF Dogs",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://woofdogs.com/trainers.webp", width: 800, height: 600, alt: "WooF Dogs Professional Dog Trainers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Obedience Training in South Florida | WooF Dogs",
    description: "Obedience training in South Florida for real-life manners—loose leash walking, recall, and impulse control. Personalized plan—schedule an evaluation.",
  },
};

const faqs = [
  {
    question: "How old should my dog be to start obedience training?",
    answer: "We begin foundation training as early as 8 weeks with age-appropriate sessions. Adult dogs can start at any time.",
  },
  {
    question: "What tools do you use for training?",
    answer: "We use a balanced, reward-focused approach with tools selected based on your dog's needs and trainer recommendations.",
  },
  {
    question: "How long does training take?",
    answer: "Timelines vary based on goals and consistency. Initial expectations and milestones are discussed during the Evaluation.",
  },
  {
    question: "Bootcamp vs In-Home: which should I choose?",
    answer: "Bootcamp accelerates foundation and consistency. In-Home maximizes owner participation in your real environment. The best option for your dog is recommended during the Evaluation.",
  },
  {
    question: "What happens after I book an Evaluation?",
    answer: "We confirm your appointment and documentation needed, meet with our Evaluator for an evaluation session, define goals and expectations, and provide a tailored treatment and training plan.",
  },
];

export default function ObediencePage() {
  return (
    <>
      <BreadcrumbSchema
        pageName="Dog Obedience Training"
        pageUrl="https://woofdogs.com/obedience"
      />
      <ServiceSchema
        serviceType="Dog Obedience Training"
        name="Dog Obedience Training in South Florida"
        url="https://woofdogs.com/obedience"
        description="Professional obedience training from basic commands to advanced off-leash reliability. Personalized plans covering loose-leash walking, recall, impulse control, and real-world manners."
      />
      <FaqSchema faqs={faqs} />
      <DogObedience />
      <RelatedBlogPosts
        postSlugs={["how-to-stop-dog-jumping", "dog-training-cost-south-florida"]}
        heading="From the WooF Dogs Blog"
      />
    </>
  );
}
