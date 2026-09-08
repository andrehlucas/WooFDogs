import ServiceAnimalTraining from "@/page-components/ServiceAnimalTraining";
import { FaqSchema } from "@/components/FaqSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Dog Training Palm Beach County",
  description: "Service dog training in South Florida focused on task work, public-access skills, and handler coaching. Start with an assessment—book today.",
  alternates: {
    canonical: "https://woofdogs.com/service-animal-training",
  },
  openGraph: {
    title: "Service Dog Training Palm Beach County | WooF Dogs",
    description: "Service dog training in South Florida focused on task work, public-access skills, and handler coaching. Start with an assessment—book today.",
    url: "https://woofdogs.com/service-animal-training",
    siteName: "WooF Dogs",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://woofdogs.com/trainers.webp", width: 800, height: 600, alt: "WooF Dogs Professional Dog Trainers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Dog Training Palm Beach County | WooF Dogs",
    description: "Service dog training in South Florida focused on task work, public-access skills, and handler coaching. Start with an assessment—book today.",
  },
};

const faqs = [
  {
    question: "What types of service dogs do you train?",
    answer: "We train service dogs for PTSD, anxiety disorders, mobility assistance, medical alerts (diabetes, seizures), autism support, and other ADA-recognized disabilities.",
  },
  {
    question: "How long does service dog training take?",
    answer: "Training programs do not follow a specific timeline — every client and service animal candidate trains at a different level and schedule. The steps may also change order or overlap at the trainer's discretion. Our goal is to complete a successful training program to the best of our abilities.",
  },
  {
    question: "Can any dog become a service dog?",
    answer: "Not every dog is suited for service work. During the initial consultation, our evaluator will assess your dog's behavior, temperament, and previous training. Training a dog for service work is an extensive process with many factors involved, and we cannot guarantee that any dog will pass all the required tests.",
  },
  {
    question: "What certification do you provide?",
    answer: "Upon passing the CGC, CGCA, and Woof Dogs Service Animal Tests (WDSAT1 & WDSAT2), your dog becomes a Woof Dogs Certified Service Animal and receives a service animal identification card valid for one year. Certification must be renewed yearly by retesting.",
  },
  {
    question: "What happens during the initial evaluation?",
    answer: "A certified Woof Dogs evaluator will discuss your goals for the service animal, the specific tasks you'd like the animal to perform, your dog's behavior and temperament, and any previous obedience training. We'll also run preliminary assessments to help determine your dog's suitability for service work.",
  },
  {
    question: "What is my responsibility as a handler?",
    answer: "You and any family members must follow the instructions of the Woof Dogs certified trainer and consistently reinforce training between sessions. Training may occur in various locations including your home, our training center, airports, and malls.",
  },
];

export default function ServiceAnimalTrainingPage() {
  return (
    <>
      <BreadcrumbSchema
        pageName="Service Dog Training"
        pageUrl="https://woofdogs.com/service-animal-training"
      />
      <ServiceSchema
        serviceType="Service Dog Training"
        name="Service Dog Training in Palm Beach County"
        url="https://woofdogs.com/service-animal-training"
        description="Specialized service dog training for PTSD, anxiety, mobility assistance, medical alerts, and autism support. Task-specific training, public access preparation, and WooF Dogs Certified Service Animal certification."
      />
      <FaqSchema faqs={faqs} />
      <ServiceAnimalTraining />
    </>
  );
}
