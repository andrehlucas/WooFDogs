/**
 * Shared placeholder blog post data for the homepage "Latest from the Blog"
 * section variants. Shape mirrors `BlogPost` from `shared/blogTypes.ts` so that
 * any chosen variant can be wired straight into the real homepage with minimal
 * mapping. The mockup sandbox doesn't expose the `@shared` alias, so the type
 * is duplicated here.
 *
 * The `_visual` field carries variant-only hints (gradient hue, accent color,
 * read time label) — these are display sugar, not part of the live data
 * contract.
 */

export type SampleCategory = { name: string; slug: string };

export type SamplePost = {
  // BlogPost-compatible fields
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string; // ISO date string
  featuredImageUrl?: string;
  featuredImageAlt?: string;
  authorName: string;
  authorSlug: string;
  authorAvatar?: string;
  categories: SampleCategory[];
  // Variant-only display hints
  _visual: {
    readTime: string;
    gradient: string;
    accentDot?: string;
    categoryPill?: string;
  };
};

export const samplePosts: SamplePost[] = [
  {
    id: "post-1",
    databaseId: 1,
    title: "How to Stop Leash Reactivity Before It Becomes a Daily Battle",
    slug: "stop-leash-reactivity",
    excerpt:
      "A 4-step protocol our trainers use with reactive dogs across South Florida — built on counter-conditioning, not corrections.",
    content: "",
    date: "2026-04-14",
    authorName: "Marcus Reyes",
    authorSlug: "marcus-reyes",
    categories: [{ name: "Behavior", slug: "behavior" }],
    featuredImageUrl: "https://picsum.photos/seed/woof-stop-leash-reactivity/960/640",
    featuredImageAlt: "Trainer working with a reactive dog on a loose leash on a quiet South Florida street",
    _visual: {
      readTime: "8 min",
      gradient: "from-red-500/90 via-rose-600/80 to-zinc-900",
      accentDot: "bg-red-600",
      categoryPill: "text-red-600 bg-red-50",
    },
  },
  {
    id: "post-2",
    databaseId: 2,
    title: "The First 16 Weeks: A Socialization Window You Can't Get Back",
    slug: "puppy-socialization-window",
    excerpt:
      "Why the early-puppy weeks shape every walk, vet visit, and guest interaction for life.",
    content: "",
    date: "2026-04-08",
    authorName: "Sarah Chen",
    authorSlug: "sarah-chen",
    categories: [{ name: "Puppy", slug: "puppy" }],
    featuredImageUrl: "https://picsum.photos/seed/woof-puppy-socialization-window/960/640",
    featuredImageAlt: "A young puppy meeting friendly adults during an early socialization session",
    _visual: {
      readTime: "6 min",
      gradient: "from-amber-300 via-amber-500 to-rose-600",
      accentDot: "bg-amber-500",
      categoryPill: "text-amber-700 bg-amber-50",
    },
  },
  {
    id: "post-3",
    databaseId: 3,
    title: "Board & Train vs. In-Home: Which Actually Works for Working Dogs?",
    slug: "board-train-vs-in-home",
    excerpt:
      "Cost, results, timelines — and which dogs respond best to each approach.",
    content: "",
    date: "2026-04-09",
    authorName: "Sarah Chen",
    authorSlug: "sarah-chen",
    categories: [{ name: "Boarding", slug: "boarding" }],
    featuredImageUrl: "https://picsum.photos/seed/woof-board-train-vs-in-home/960/640",
    featuredImageAlt: "Working dog completing focus drills in an outdoor training yard",
    _visual: {
      readTime: "11 min",
      gradient: "from-zinc-700 via-zinc-800 to-red-600",
      accentDot: "bg-emerald-600",
      categoryPill: "text-emerald-700 bg-emerald-50",
    },
  },
  {
    id: "post-4",
    databaseId: 4,
    title: "The Real Cost of Dog Training in South Florida (2026 Guide)",
    slug: "real-cost-dog-training-south-florida-2026",
    excerpt:
      "We broke down what actually drives pricing — from group classes at $40/session to full board & train programs above $5,000 — and what to look out for.",
    content: "",
    date: "2026-04-18",
    authorName: "Sarah Chen",
    authorSlug: "sarah-chen",
    categories: [{ name: "Owner Tips", slug: "owner-tips" }],
    featuredImageUrl: "https://picsum.photos/seed/woof-real-cost-dog-training-south-florida-2026/960/640",
    featuredImageAlt: "Trainer reviewing a dog training program plan with a client at a desk",
    _visual: {
      readTime: "12 min",
      gradient: "from-red-600 via-rose-700 to-zinc-900",
      accentDot: "bg-violet-600",
      categoryPill: "text-violet-700 bg-violet-50",
    },
  },
  {
    id: "post-5",
    databaseId: 5,
    title: "Crate Training Without the Crying: A Calm 7-Night Plan",
    slug: "crate-training-7-night-plan",
    excerpt:
      "A gentle, science-based protocol to help puppies settle in the crate by night seven.",
    content: "",
    date: "2026-04-16",
    authorName: "Sarah Chen",
    authorSlug: "sarah-chen",
    categories: [{ name: "Puppy", slug: "puppy" }],
    featuredImageUrl: "https://picsum.photos/seed/woof-crate-training-7-night-plan/960/640",
    featuredImageAlt: "Calm puppy resting on a soft mat next to an open training crate",
    _visual: {
      readTime: "5 min",
      gradient: "from-amber-400 to-rose-600",
      accentDot: "bg-amber-500",
      categoryPill: "text-amber-700 bg-amber-50",
    },
  },
  {
    id: "post-6",
    databaseId: 6,
    title: "Why Your Dog Jumps on Guests (And the Fix That Actually Sticks)",
    slug: "dog-jumps-on-guests",
    excerpt:
      "Why \"down\" fails — and the alternative behavior we teach instead.",
    content: "",
    date: "2026-04-12",
    authorName: "Marcus Reyes",
    authorSlug: "marcus-reyes",
    categories: [{ name: "Behavior", slug: "behavior" }],
    featuredImageUrl: "https://picsum.photos/seed/woof-dog-jumps-on-guests/960/640",
    featuredImageAlt: "Dog sitting politely as a guest enters the front door",
    _visual: {
      readTime: "7 min",
      gradient: "from-rose-500 to-red-700",
      accentDot: "bg-red-600",
      categoryPill: "text-red-600 bg-red-50",
    },
  },
  {
    id: "post-7",
    databaseId: 7,
    title: "Separation Anxiety: When It's Trainable vs. When You Need a Vet",
    slug: "separation-anxiety-trainable-or-vet",
    excerpt:
      "Departure cues, food puzzles, and the line where behavior work needs medical support.",
    content: "",
    date: "2026-04-09",
    authorName: "Sarah Chen",
    authorSlug: "sarah-chen",
    categories: [{ name: "Anxiety", slug: "anxiety" }],
    featuredImageUrl: "https://picsum.photos/seed/woof-separation-anxiety-trainable-or-vet/960/640",
    featuredImageAlt: "Dog calmly settled on a bed near a closed front door",
    _visual: {
      readTime: "9 min",
      gradient: "from-blue-500 to-indigo-700",
      accentDot: "bg-blue-600",
      categoryPill: "text-blue-700 bg-blue-50",
    },
  },
  {
    id: "post-8",
    databaseId: 8,
    title: "What to Pack (and What to Leave Home) for Board & Train",
    slug: "board-train-packing-list",
    excerpt:
      "A no-nonsense checklist from our boarding team — and the items owners always overpack.",
    content: "",
    date: "2026-04-05",
    authorName: "Marcus Reyes",
    authorSlug: "marcus-reyes",
    categories: [{ name: "Boarding", slug: "boarding" }],
    featuredImageUrl: "https://picsum.photos/seed/woof-board-train-packing-list/960/640",
    featuredImageAlt: "Open duffel bag packed with a leash, toys, and labeled food containers",
    _visual: {
      readTime: "4 min",
      gradient: "from-emerald-500 to-teal-700",
      accentDot: "bg-emerald-600",
      categoryPill: "text-emerald-700 bg-emerald-50",
    },
  },
  {
    id: "post-9",
    databaseId: 9,
    title: "Puppy Training in South Florida: Where to Actually Start",
    slug: "puppy-training-south-florida",
    excerpt: "Socialization windows, vaccine timing, and the first 6 weeks.",
    content: "",
    date: "2026-04-11",
    authorName: "Sarah Chen",
    authorSlug: "sarah-chen",
    categories: [{ name: "Puppy", slug: "puppy" }],
    featuredImageUrl: "https://picsum.photos/seed/woof-puppy-training-south-florida/960/640",
    featuredImageAlt: "Puppy class lined up on mats in a bright training studio",
    _visual: {
      readTime: "6 min",
      gradient: "from-amber-400 to-orange-600",
      accentDot: "bg-amber-500",
      categoryPill: "text-amber-700 bg-amber-50",
    },
  },
  {
    id: "post-10",
    databaseId: 10,
    title: "The 4am Crate Cry: A Puppy Sleep Plan",
    slug: "4am-crate-cry-puppy-sleep",
    excerpt:
      "What's actually happening at 4am — and the calm, consistent response that ends the cycle.",
    content: "",
    date: "2026-04-02",
    authorName: "Marcus Reyes",
    authorSlug: "marcus-reyes",
    categories: [{ name: "Puppy", slug: "puppy" }],
    featuredImageUrl: "https://picsum.photos/seed/woof-4am-crate-cry-puppy-sleep/960/640",
    featuredImageAlt: "Sleepy puppy yawning inside a cozy night-time crate setup",
    _visual: {
      readTime: "5 min",
      gradient: "from-amber-400 to-rose-600",
      accentDot: "bg-amber-500",
      categoryPill: "text-amber-700 bg-amber-50",
    },
  },
  {
    id: "post-12",
    databaseId: 12,
    title: "Hot Pavement, Cold Tile: Summer Paw Care for South Florida Dogs",
    slug: "summer-paw-care-south-florida",
    excerpt:
      "How to read pavement temperature, when to swap to grass routes, and the simple paw-balm routine our trainers use July through September.",
    content: "",
    date: "2026-04-01",
    featuredImageUrl: "https://picsum.photos/seed/woof-summer-paw-care-south-florida/960/640",
    featuredImageAlt: "Dog walking on a shaded grass path during a hot Florida afternoon",
    authorName: "Sarah Chen",
    authorSlug: "sarah-chen",
    categories: [{ name: "Health", slug: "health" }],
    _visual: {
      readTime: "5 min",
      gradient: "from-emerald-400 via-teal-500 to-cyan-700",
      accentDot: "bg-emerald-500",
      categoryPill: "text-emerald-700 bg-emerald-50",
    },
  },
  {
    id: "post-11",
    databaseId: 11,
    title: "From Service Dog Wash-out to Family Hero",
    slug: "service-dog-washout-family-hero",
    excerpt:
      "How a young lab who failed service training became the steadiest dog in his neighborhood.",
    content: "",
    date: "2026-03-28",
    authorName: "Marcus Reyes",
    authorSlug: "marcus-reyes",
    categories: [{ name: "Field Story", slug: "field-story" }],
    featuredImageUrl: "https://picsum.photos/seed/woof-service-dog-washout-family-hero/960/640",
    featuredImageAlt: "Young Labrador walking calmly beside a family on a neighborhood sidewalk",
    _visual: {
      readTime: "7 min",
      gradient: "from-zinc-700 to-red-700",
      accentDot: "bg-zinc-700",
      categoryPill: "text-zinc-700 bg-zinc-100",
    },
  },
];

export const sampleCategories: { label: string; count: number }[] = [
  { label: "All", count: 47 },
  { label: "Puppy", count: 12 },
  { label: "Behavior", count: 18 },
  { label: "Boarding", count: 6 },
  { label: "Health", count: 5 },
  { label: "Owner Tips", count: 6 },
];

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const FULL_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Format an ISO date string for display. `style` selects the format:
 *  - "short": "Apr 14"
 *  - "medium": "Apr 14, 2026"
 *  - "long":  "April 14, 2026"
 *
 * Returns an empty string for unparseable input so that variants render a
 * loading-safe placeholder instead of crashing.
 */
export function formatPostDate(
  iso: string,
  style: "short" | "medium" | "long" = "medium",
): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const month = style === "long" ? FULL_MONTHS[d.getUTCMonth()] : MONTHS[d.getUTCMonth()];
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  if (style === "short") return `${month} ${day}`;
  return `${month} ${day}, ${year}`;
}
