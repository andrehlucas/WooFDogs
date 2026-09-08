import BoardAndTrain from "@/page-components/BoardAndTrain";
import { FaqSchema } from "@/components/FaqSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board & Train Dog Training in South Florida",
  description: "Board & Train program in South Florida—immersive dog training with professional trainers for obedience and behavior issues. Book an evaluation today.",
  alternates: {
    canonical: "https://woofdogs.com/board-and-train",
  },
  openGraph: {
    title: "Board & Train Dog Training in South Florida | WooF Dogs",
    description: "Board & Train program in South Florida—immersive dog training with professional trainers for obedience and behavior issues. Book an evaluation today.",
    url: "https://woofdogs.com/board-and-train",
    siteName: "WooF Dogs",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://woofdogs.com/trainers.webp", width: 800, height: 600, alt: "WooF Dogs Professional Dog Trainers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Board & Train Dog Training in South Florida | WooF Dogs",
    description: "Board & Train program in South Florida—immersive dog training with professional trainers for obedience and behavior issues. Book an evaluation today.",
  },
};

const faqs = [
  {
    question: "How long does a board and train program last?",
    answer: "Program length varies depending on the dog's needs and behavioral goals. This is discussed during the evaluation to create a customized timeline that works for your specific situation.",
  },
  {
    question: "Is board and train safe for dogs?",
    answer: "Yes. Safety, welfare, and appropriate training intensity are top priorities throughout the program. We ensure your dog is comfortable, well-cared for, and never pushed beyond healthy limits.",
  },
  {
    question: "Does board and train work for aggressive dogs?",
    answer: "Some behavioral issues may qualify, while others require specialized programs. A professional evaluation is required to determine the best approach for dogs with aggression or reactivity concerns.",
  },
  {
    question: "Will I receive follow-up training?",
    answer: "Yes. Owner guidance and follow-up recommendations are provided to support long-term success. We work with you during transition sessions to ensure you can maintain all trained behaviors at home.",
  },
];

export default function BoardAndTrainPage() {
  return (
    <>
      <BreadcrumbSchema
        pageName="Board & Train Dog Training"
        pageUrl="https://woofdogs.com/board-and-train"
      />
      <ServiceSchema
        serviceType="Board and Train Dog Training"
        name="Board & Train Dog Training in South Florida"
        url="https://woofdogs.com/board-and-train"
        description="Immersive board and train program where your dog stays with our professional trainers at our Loxahatchee facility. Accelerated obedience, behavioral correction, and owner coaching for lasting results."
      />
      <FaqSchema faqs={faqs} />
      <BoardAndTrain />
    </>
  );
}
