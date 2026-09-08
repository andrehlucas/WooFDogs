/**
 * Pure schema-building functions for blog posts.
 * These run in the server component (page.tsx) so all JSON-LD is present
 * in the initial HTML — visible to non-JS crawlers (ClaudeBot, PerplexityBot, Applebot).
 */
import type { BlogPost } from "../../shared/blogTypes";

export function buildBlogPostingSchema(post: BlogPost, url: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt?.replace(/<[^>]*>/g, "").slice(0, 200),
    // Fall back to trainers.webp (which exists) rather than the missing og-default.jpg
    image: post.featuredImageUrl || "https://woofdogs.com/trainers.webp",
    datePublished: post.date,
    // Use actual modified date so Google sees freshness updates — falls back to published date
    dateModified: post.modifiedDate || post.date,
    author: {
      "@type": "Person",
      name: post.authorName.replace(" — WooF Dogs", "").replace(" - WooF Dogs", ""),
      worksFor: { "@type": "Organization", name: "WooF Dogs", url: "https://woofdogs.com" },
    },
    publisher: {
      "@type": "Organization",
      name: "WooF Dogs",
      url: "https://woofdogs.com",
      // woof-dogs-logo.png exists in public/; logo.png does not
      logo: {
        "@type": "ImageObject",
        url: "https://woofdogs.com/woof-dogs-logo.png",
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function buildBreadcrumbSchema(post: BlogPost, url: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://woofdogs.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://woofdogs.com/blog/" },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };
}

export function extractFaqSchema(html: string): object | null {
  const faqHeadingMatch = html.match(/<h2[^>]*>[\s\S]*?(?:frequently asked questions|faq)[\s\S]*?<\/h2>/i);
  if (!faqHeadingMatch || faqHeadingMatch.index === undefined) return null;

  const afterFaq = html.slice(faqHeadingMatch.index + faqHeadingMatch[0].length);
  const nextH2Match = afterFaq.match(/<h2[^>]*>/i);
  const faqSection = nextH2Match ? afterFaq.slice(0, nextH2Match.index) : afterFaq;

  const questionPattern = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3|$)/gi;
  const pairs: { question: string; answer: string }[] = [];
  let match;

  while ((match = questionPattern.exec(faqSection)) !== null) {
    const question = match[1].replace(/<[^>]*>/g, "").trim();
    const answerHtml = match[2];
    const answer = answerHtml
      .replace(/<[^>]*>/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim()
      .slice(0, 600);
    if (question && answer) {
      pairs.push({ question, answer });
    }
  }

  if (pairs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map((p) => ({
      "@type": "Question",
      name: p.question,
      acceptedAnswer: { "@type": "Answer", text: p.answer },
    })),
  };
}

export const HOWTO_SCHEMAS: Record<string, () => object> = {
  "how-to-stop-dog-jumping": () => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Stop Your Dog From Jumping on People",
    description:
      "A four-part protocol to eliminate jumping behavior using attention removal, incompatible behavior training, controlled setups, and leash management.",
    totalTime: "P3W",
    step: [
      {
        "@type": "HowToStep",
        name: "Complete Removal of Attention on the Jump",
        text: "The moment four paws leave the ground, go completely neutral. No eye contact, no verbal response, no hands. Turn your body 90 degrees away and do not look back until all four paws are on the floor.",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Mark and Reward the Incompatible Behavior",
        text: "When the dog has all four paws on the floor, mark it with a clicker or verbal marker and reward with a treat, praise, or the greeting your dog wanted. The dog learns: paws on the floor produces attention; paws off the floor produces nothing.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Control the Setup",
        text: "Practice at controlled, low-excitement greetings before attempting at the door or with guests. Build from low-excitement contexts to higher-excitement entrances progressively.",
        position: 3,
      },
      {
        "@type": "HowToStep",
        name: "Brief Leash Management at the Door",
        text: "Until the behavior is reliably trained, use a leash or gate at the door when guests arrive to prevent the dog from rehearsing the jumping behavior.",
        position: 4,
      },
    ],
  }),
  "puppy-training-south-florida": () => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Puppy Training Week-by-Week Framework (8–20 Weeks)",
    description:
      "The WooF Dogs week-by-week puppy training framework covering the critical socialization and foundation building period from 8 to 20 weeks.",
    totalTime: "P12W",
    step: [
      {
        "@type": "HowToStep",
        name: "Weeks 8–10: Foundation and Safety",
        text: "Build handling tolerance by touching paws, ears, mouth, and tail daily paired with high-value treats. Establish name recognition. Introduce crate training and a basic routine.",
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Weeks 10–12: Basic Commands and Socialization",
        text: "Teach sit, down, and stay using lure-reward methods. Begin controlled socialization with new people, sounds, and environments in low-stress settings.",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Weeks 12–16: Leash Manners and Impulse Control",
        text: "Introduce leash pressure and loose-leash walking. Begin threshold impulse control exercises. Expand socialization to higher-stimulus environments.",
        position: 3,
      },
      {
        "@type": "HowToStep",
        name: "Weeks 16–20: Proofing and Real-World Application",
        text: "Proof commands across different locations and distractions. Introduce recall training. Begin structured play sessions that reinforce boundaries.",
        position: 4,
      },
    ],
  }),
};
