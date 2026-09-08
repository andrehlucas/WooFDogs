export interface AuthorProfile {
  slug: string;
  displayName: string;
  fullName: string;
  title: string;
  bio: string;
  longBio: string;
  avatar?: string;
  credentials: string[];
  specialties: string[];
}

export const AUTHOR_PROFILES: Record<string, AuthorProfile> = {
  "shay-maimoni-woof-dogs": {
    slug: "shay-maimoni-woof-dogs",
    displayName: "Shay Maimoni",
    fullName: "Shay Maimoni",
    title: "Founder & Lead Trainer, WooF Dogs",
    bio: "Shay Maimoni is the founder of WooF Dogs and a certified dog trainer with over 20 years of behavioral case experience in South Florida. He specializes in obedience, aggression management, and board-and-train programs for dogs of all breeds and behavioral histories.",
    longBio: "Shay Maimoni founded WooF Dogs after more than two decades working with dogs ranging from family pets to working-level dogs trained for service, therapy, and protection work. His background includes advanced training methodology rooted in applied behavior analysis and balanced training principles — a combination that produces reliable results across the full spectrum of behavioral presentations. Shay has worked with hundreds of South Florida families, helping dogs with issues ranging from basic manners to complex aggression cases. His training philosophy centers on clear communication, realistic expectations, and building behavioral change that holds up in the real world — not just in a training session.",
    credentials: [
      "20+ years professional dog training experience",
      "Balanced training specialist — obedience through behavior modification",
      "Board-and-train program director",
      "South Florida's leading private trainer for aggression cases",
    ],
    specialties: ["Obedience", "Aggression Management", "Board-and-Train", "Behavior Modification"],
  },
  "lucas-barreto-woof-dogs": {
    slug: "lucas-barreto-woof-dogs",
    displayName: "Lucas Barreto",
    fullName: "Lucas Barreto",
    title: "Certified Trainer, WooF Dogs",
    bio: "Lucas Barreto is a certified trainer with WooF Dogs specializing in behavioral modification and in-home private training across Palm Beach and Broward Counties.",
    longBio: "Lucas Barreto joined WooF Dogs after completing advanced certifications in behavioral modification and applied animal behavior. He works primarily with private training clients across Palm Beach and Broward Counties, focusing on in-home sessions that address real-world behavioral challenges in the environments where they actually occur. Lucas brings a detail-oriented approach to owner coaching — his sessions prioritize teaching the owner the mechanics of training as much as shaping the dog's behavior.",
    credentials: [
      "Certified professional dog trainer",
      "Behavioral modification specialist",
      "Private in-home training, Palm Beach & Broward Counties",
    ],
    specialties: ["In-Home Training", "Behavioral Modification", "Owner Coaching", "Leash Reactivity"],
  },
};

export function getAuthorProfile(slug: string): AuthorProfile | null {
  return AUTHOR_PROFILES[slug] || null;
}

export function getAuthorBio(slug: string): string {
  return AUTHOR_PROFILES[slug]?.bio || "Professional dog trainer and behavior specialist with WooF Dogs, South Florida.";
}
