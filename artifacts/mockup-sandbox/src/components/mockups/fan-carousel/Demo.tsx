import SocialCards from "./CardFanCarousel";
import "./fan-carousel.css";

const DEMO_CARDS = [
  {
    imgUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=700&fit=crop",
    alt: "Golden retriever training",
    title: "Obedience Training",
    ctaText: "Book Now",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1534361960057-19f4434a0d6b?w=400&h=700&fit=crop",
    alt: "Dog obedience session",
    title: "Puppy Program",
    ctaText: "Get Started",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=700&fit=crop",
    alt: "Two dogs playing",
    title: "Board & Train",
    ctaText: "Learn More",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=700&fit=crop",
    alt: "Friendly dog portrait",
    title: "Free Evaluation",
    ctaText: "Book Free Eval",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=700&fit=crop",
    alt: "Dog at training class",
    title: "Dog Bootcamp",
    ctaText: "Get In Touch",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=400&h=700&fit=crop",
    alt: "Puppy learning commands",
    title: "Puppy Classes",
    ctaText: "Enroll Today",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1612535316692-b1d29e949e7e?w=400&h=700&fit=crop",
    alt: "Happy dog outdoors",
    title: "Aggression Help",
    ctaText: "Get Help Now",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1601758125954-f5b35f5e9b97?w=400&h=700&fit=crop",
    alt: "Dog boarding facility",
    title: "Dog Boarding",
    ctaText: "View Rooms",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1605897472359-85e4b94d685d?w=400&h=700&fit=crop",
    alt: "Dogs socializing",
    title: "Group Classes",
    ctaText: "See Schedule",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&h=700&fit=crop",
    alt: "Dog with trainer",
    title: "Private Sessions",
    ctaText: "Book a Session",
  },
];

export default function Demo() {
  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col items-center justify-center gap-6 py-12">
      <div className="text-center px-4 max-w-xl">
        <p className="text-xs font-semibold tracking-widest text-amber-600 uppercase mb-3">
          South Florida's #1 Dog Training
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Real dogs. Real results.
        </h1>
        <p className="text-gray-500 text-lg">
          Hundreds of happy dogs and their owners — see what's possible.
        </p>
      </div>

      <SocialCards cards={DEMO_CARDS} />
    </div>
  );
}
