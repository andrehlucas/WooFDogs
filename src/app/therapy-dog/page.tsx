import TherapyDog from "@/page-components/TherapyDog";
import { FaqSchema } from "@/components/FaqSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Therapy Dog Training & Certification in Florida",
  description: "Therapy dog training in South Florida—AKC Canine Good Citizen preparation, temperament assessment, and certification coaching. Start with an evaluation today.",
  alternates: {
    canonical: "https://woofdogs.com/therapy-dog",
  },
  openGraph: {
    title: "Therapy Dog Training & Certification in Florida | WooF Dogs",
    description: "Therapy dog training in South Florida—AKC Canine Good Citizen preparation, temperament assessment, and certification coaching. Start with an evaluation today.",
    url: "https://woofdogs.com/therapy-dog",
    siteName: "WooF Dogs",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://woofdogs.com/trainers.webp", width: 800, height: 600, alt: "WooF Dogs Professional Dog Trainers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Therapy Dog Training & Certification in Florida | WooF Dogs",
    description: "Therapy dog training in South Florida—AKC Canine Good Citizen preparation, temperament assessment, and certification coaching. Start with an evaluation today.",
  },
};

const faqs = [
  {
    question: "What's the difference between a therapy dog and a service dog?",
    answer: "Service dogs are individually trained to perform specific tasks for a person with a disability and have legal public access rights. Therapy dogs provide comfort and emotional support to multiple people in various settings (hospitals, schools, etc.) but do not have the same legal access rights. Therapy dogs work with their handler to visit others, while service dogs accompany their owner everywhere.",
  },
  {
    question: "Does my dog need to be a specific breed or age?",
    answer: "Therapy dogs can be any breed, size, or mix. What matters most is temperament, sociability, and training. Dogs must typically be at least one year old to be certified, as they need to be mature enough to handle the demands of therapy work. We assess each dog individually during the evaluation process.",
  },
  {
    question: "How long does therapy dog training and certification take?",
    answer: "The complete training and certification process typically takes 7-12 weeks, depending on your dog's starting skill level and how quickly they progress through each phase. Dogs with solid obedience foundations may complete training faster.",
  },
  {
    question: "What certifications do you prepare dogs for?",
    answer: "We prepare dogs for certification through major therapy dog organizations including Pet Partners, Therapy Dogs International (TDI), and Alliance of Therapy Dogs. Each organization has specific requirements, and we tailor our training to meet those standards.",
  },
  {
    question: "Can I train my dog to be a therapy dog if they're shy or anxious?",
    answer: "It depends on the severity and nature of the anxiety. Therapy dogs need to be naturally confident and enjoy interacting with strangers in unpredictable environments. During the initial evaluation, we'll assess whether your dog has the right temperament for therapy work or would be better suited to other types of training.",
  },
  {
    question: "What happens after my dog is certified?",
    answer: "After certification, you'll register with a therapy dog organization and receive identification, insurance coverage, and access to volunteer opportunities. You can then begin visiting facilities and participating in therapy dog programs in your community.",
  },
];

export default function TherapyDogPage() {
  return (
    <>
      <BreadcrumbSchema
        pageName="Therapy Dog Training"
        pageUrl="https://woofdogs.com/therapy-dog"
      />
      <ServiceSchema
        serviceType="Therapy Dog Training"
        name="Therapy Dog Training & Certification in South Florida"
        url="https://woofdogs.com/therapy-dog"
        description="AKC Canine Good Citizen preparation, temperament assessment, and full certification coaching for Pet Partners, Therapy Dogs International (TDI), and Alliance of Therapy Dogs. 7-12 week program."
      />
      <FaqSchema faqs={faqs} />
      <TherapyDog />
    </>
  );
}
