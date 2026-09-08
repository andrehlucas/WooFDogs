"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogCta } from "@/components/blog/BlogCta";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Check,
  ChevronDown,
  ChevronUp,
  Share2,
  Home,
} from "lucide-react";
import type { BlogPost, BlogCategory } from "../../../../shared/blogTypes";

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

const AUTHOR_BIOS: Record<string, string> = {
  default:
    "Professional dog trainer and behavior specialist based in South Florida with over 20 years of experience. Shay Maimoni and the WooF Dogs team use evidence-based, balanced training methods to help dogs and their owners build lasting behavioral change.",
  "shay-maimoni-woof-dogs":
    "Shay Maimoni is the founder of WooF Dogs and a certified dog trainer with over 20 years of behavioral case experience in South Florida. He specializes in obedience, aggression management, and board-and-train programs for dogs of all breeds and behavioral histories.",
  "lucas-barreto-woof-dogs":
    "Lucas Barreto is a certified trainer with WooF Dogs specializing in behavioral modification and in-home private training across Palm Beach and Broward Counties.",
};

function getAuthorBio(authorSlug: string): string {
  return AUTHOR_BIOS[authorSlug] || AUTHOR_BIOS["default"];
}

function decodeHtmlEntities(text: string): string {
  const textarea = typeof document !== "undefined" ? document.createElement("textarea") : null;
  if (textarea) {
    textarea.innerHTML = text;
    return textarea.value;
  }
  return text
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]*>/g, "");
  const wordCount = textContent.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

function decodeEntitiesSimple(text: string): string {
  return text
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
}

function processContentWithToc(content: string): { toc: TableOfContentsItem[]; processedContent: string } {
  const items: TableOfContentsItem[] = [];
  let index = 0;

  const processedContent = content.replace(
    /<h([2-4])([^>]*)>(.*?)<\/h[2-4]>/gi,
    (match, level, attrs, text) => {
      const levelNum = parseInt(level);
      const textContent = decodeEntitiesSimple(text.replace(/<[^>]*>/g, "").trim());

      const existingIdMatch = attrs.match(/id="([^"]*)"/);
      const existingId = existingIdMatch ? existingIdMatch[1] : null;

      const id = existingId || `heading-${index}`;
      items.push({ id, text: textContent, level: levelNum });
      index++;

      if (existingId) {
        return match;
      }
      return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
    }
  );

  return { toc: items, processedContent };
}

function injectInlineCta(html: string): string {
  const h2Matches = [...html.matchAll(/<h2[^>]*>/gi)];
  if (h2Matches.length < 3) return html;
  const thirdH2 = h2Matches[2];
  const insertAt = thirdH2.index!;
  const ctaHtml = `<div class="inline-cta-placeholder" data-cta="true"></div>`;
  return html.slice(0, insertAt) + ctaHtml + html.slice(insertAt);
}

function buildBlogPostingSchema(post: BlogPost, url: string): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt?.replace(/<[^>]*>/g, "").slice(0, 200),
    image: post.featuredImageUrl || "https://woofdogs.com/og-default.jpg",
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.authorName.replace(" — WooF Dogs", "").replace(" - WooF Dogs", ""),
      worksFor: { "@type": "Organization", name: "WooF Dogs", url: "https://woofdogs.com" },
    },
    publisher: {
      "@type": "Organization",
      name: "WooF Dogs",
      url: "https://woofdogs.com",
      logo: { "@type": "ImageObject", url: "https://woofdogs.com/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  return JSON.stringify(schema);
}

function buildBreadcrumbSchema(post: BlogPost, url: string): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://woofdogs.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://woofdogs.com/blog/" },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };
  return JSON.stringify(schema);
}

function extractFaqSchema(html: string): string | null {
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

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map(p => ({
      "@type": "Question",
      name: p.question,
      acceptedAnswer: { "@type": "Answer", text: p.answer },
    })),
  };
  return JSON.stringify(schema);
}

const HOWTO_SCHEMAS: Record<string, () => object> = {
  "how-to-stop-dog-jumping": () => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Stop Your Dog From Jumping on People",
    description: "A four-part protocol to eliminate jumping behavior using attention removal, incompatible behavior training, controlled setups, and leash management.",
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
    description: "The WooF Dogs week-by-week puppy training framework covering the critical socialization and foundation building period from 8 to 20 weeks.",
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

interface BlogPostContentProps {
  slug: string;
  initialPost?: BlogPost | null;
  initialAllPosts?: BlogPost[];
  initialCategories?: BlogCategory[];
  initialRecentPosts?: BlogPost[];
}

export default function BlogPostContent({ slug, initialPost = null, initialAllPosts = [], initialCategories, initialRecentPosts }: BlogPostContentProps) {
  const [post, setPost] = useState<BlogPost | null>(initialPost);
  const [allPosts, setAllPosts] = useState<BlogPost[]>(initialAllPosts);
  const [loading, setLoading] = useState(!initialPost);
  const [error, setError] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState(`https://woofdogs.com/blog/${slug}`);
  const [featuredImageLoaded, setFeaturedImageLoaded] = useState(!!initialPost);

  const canonicalUrl = `https://woofdogs.com/blog/${slug}`;

  const relatedPosts = post
    ? allPosts
        .filter((p) => p.slug !== slug)
        .filter((p) =>
          p.categories.some((cat) =>
            post.categories.some((postCat) => postCat.slug === cat.slug)
          )
        )
        .slice(0, 3)
    : [];

  const articleRef = useRef<HTMLElement>(null);
  const { toc: tocItems, processedContent: rawProcessedContent } = post
    ? processContentWithToc(post.content)
    : { toc: [], processedContent: "" };

  const processedContent = rawProcessedContent ? injectInlineCta(rawProcessedContent) : "";

  useEffect(() => {
    if (!slug) return;
    if (initialPost) return;
    setFeaturedImageLoaded(false);

    Promise.all([
      fetch(`/api/posts/${slug}`).then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      }),
      fetch("/api/posts?limit=20").then(res => res.json()),
    ])
      .then(([postData, allPostsData]) => {
        setPost(postData);
        setAllPosts(allPostsData.posts || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug, initialPost]);

  const handleScroll = useCallback(() => {
    if (!articleRef.current) return;

    const article = articleRef.current;
    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    const progress = Math.min(
      100,
      Math.max(0, ((scrollTop - articleTop + windowHeight * 0.3) / articleHeight) * 100)
    );
    setReadingProgress(progress);

    const headings = article.querySelectorAll("h2, h3, h4");
    let currentHeading = "";
    headings.forEach(heading => {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 150) {
        currentHeading = heading.id;
      }
    });
    setActiveHeading(currentHeading);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const formattedDate = post
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : "";

  const readingTime = post ? estimateReadingTime(post.content) : 0;

  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const shareTitle = post ? decodeHtmlEntities(post.title) : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  // Belt-and-suspenders: if a client-side fetch fails on a page that SSR'd correctly,
  // prevent Google from indexing a "Post Not Found" heading on a 200-status page.
  useEffect(() => {
    if (!error) return;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex,nofollow";
    meta.setAttribute("data-dynamic-noindex", "1");
    document.head.appendChild(meta);
    return () => {
      document.head.querySelector('meta[data-dynamic-noindex="1"]')?.remove();
    };
  }, [error]);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <main className="container px-4 sm:px-6 lg:px-8 py-12 flex-1">
          <div className="text-center py-16" data-testid="text-post-error">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The post you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link href="/blog">
              <Button data-testid="button-back-to-blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* JSON-LD schemas moved to page.tsx (server component) for crawler visibility */}

      <div
        className="reading-progress"
        style={{ width: `${readingProgress}%` }}
        data-testid="reading-progress-bar"
      />


      <main className="container px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1">
        {post && !loading && (
          <nav
            className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6"
            aria-label="Breadcrumb"
            data-testid="breadcrumbs"
          >
            <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Home className="h-3 w-3" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-xs">
              {decodeHtmlEntities(post.title)}
            </span>
          </nav>
        )}

        {!post && !loading && !error && (
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 group transition-colors"
            data-testid="link-back-to-blog"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        )}

        <div className="grid lg:grid-cols-[1fr_280px] gap-10">
          <article ref={articleRef}>
            {loading ? (
              <div className="space-y-6">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-12 w-3/4" />
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <Skeleton className="aspect-video w-full rounded-xl" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ) : post ? (
              <>
                <header className="mb-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(post.categories || []).map(category => (
                      <Link key={category.slug} href={`/blog/category/${category.slug}`}>
                        <Badge
                          variant="secondary"
                          className="hover:bg-primary hover:text-primary-foreground transition-colors"
                          data-testid={`badge-post-category-${category.slug}`}
                        >
                          {category.name}
                        </Badge>
                      </Link>
                    ))}
                  </div>

                  <h1
                    className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold mb-5 leading-tight tracking-tight"
                    data-testid="text-post-title"
                  >
                    {decodeHtmlEntities(post.title)}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-11 w-11 ring-2 ring-background shadow-sm">
                        <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                        <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <Link
                          href={`/blog/author/${post.authorSlug}`}
                          className="font-semibold text-foreground block text-base hover:text-primary transition-colors"
                          data-testid="text-post-author"
                        >
                          {post.authorName.replace(" — WooF Dogs", "").replace(" - WooF Dogs", "")}
                        </Link>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1" data-testid="text-post-date">
                            <Calendar className="h-3 w-3" />
                            {formattedDate}
                          </span>
                          <span className="flex items-center gap-1" data-testid="text-reading-time">
                            <Clock className="h-3 w-3" />
                            {readingTime} min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {post.featuredImageUrl && (
                    <figure className="mb-10">
                      <div className="aspect-video overflow-hidden rounded-xl shadow-lg relative">
                        {!featuredImageLoaded && (
                          <Skeleton className="absolute inset-0 w-full h-full rounded-xl" />
                        )}
                        <img
                          src={post.featuredImageUrl}
                          alt={post.featuredImageAlt || decodeHtmlEntities(post.title)}
                          className={`w-full h-full object-cover transition-opacity duration-300 ${featuredImageLoaded ? "opacity-100" : "opacity-0"}`}
                          data-testid="img-post-featured"
                          onLoad={() => setFeaturedImageLoaded(true)}
                          onError={() => setFeaturedImageLoaded(true)}
                        />
                      </div>
                      {post.featuredImageAlt && (
                        <figcaption
                          className="mt-3 text-center text-sm italic text-muted-foreground"
                          data-testid="text-image-caption"
                        >
                          {post.featuredImageAlt}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </header>

                {tocItems.length > 3 && (
                  <div className="lg:hidden mb-8" data-testid="mobile-toc">
                    <button
                      onClick={() => setMobileTocOpen(!mobileTocOpen)}
                      className="w-full flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/50 text-left"
                      data-testid="button-toggle-toc"
                    >
                      <span className="font-semibold text-sm">Table of Contents</span>
                      {mobileTocOpen ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                    {mobileTocOpen && (
                      <nav className="mt-1 p-4 bg-muted/30 rounded-b-lg border border-t-0 border-border/50">
                        <ul className="space-y-2 text-sm">
                          {tocItems.map(item => (
                            <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 16}px` }}>
                              <a
                                href={`#${item.id}`}
                                onClick={() => setMobileTocOpen(false)}
                                className="text-muted-foreground hover:text-primary transition-colors block py-1"
                                data-testid={`link-toc-mobile-${item.id}`}
                              >
                                {item.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    )}
                  </div>
                )}

                <div
                  className="blog-content"
                  data-testid="content-post-body"
                >
                  {processedContent.split('<div class="inline-cta-placeholder" data-cta="true"></div>').map((part, i, arr) => (
                    <div key={i}>
                      <div dangerouslySetInnerHTML={{ __html: part }} />
                      {i < arr.length - 1 && (
                        <BlogCta
                          variant="inline"
                          heading="Ready to get your dog on track?"
                          subtext="Book a behavioral evaluation with WooF Dogs. We'll assess your dog and recommend the right program — board-and-train or private sessions."
                        />
                      )}
                    </div>
                  ))}
                </div>

                <Separator className="my-10" />

                <div className="flex flex-wrap items-center gap-3 mb-10">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mr-1">
                    <Share2 className="h-4 w-4" />
                    <span>Share:</span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"
                    onClick={shareOnFacebook}
                    data-testid="button-share-facebook"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all"
                    onClick={shareOnTwitter}
                    data-testid="button-share-twitter"
                    aria-label="Share on X (Twitter)"
                  >
                    <Twitter className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all"
                    onClick={shareOnLinkedIn}
                    data-testid="button-share-linkedin"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all"
                    onClick={handleCopyLink}
                    data-testid="button-copy-link"
                    aria-label={copied ? "Link copied" : "Copy link to clipboard"}
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
                  </Button>
                </div>

                <Card className="mb-10 border-0 bg-muted/40" data-testid="card-author-bio">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row gap-5">
                      <Avatar className="h-20 w-20 ring-4 ring-background shadow-md">
                        <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                        <AvatarFallback className="text-2xl">{post.authorName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Written by</p>
                        <Link href={`/blog/author/${post.authorSlug}`} className="hover:text-primary transition-colors">
                          <h3 className="font-bold text-xl mb-2">
                            {post.authorName.replace(" — WooF Dogs", "").replace(" - WooF Dogs", "")}
                          </h3>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {getAuthorBio(post.authorSlug)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {previousPost ? (
                    <Link href={`/blog/${previousPost.slug}`} className="group" data-testid="link-previous-post">
                      <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all duration-200">
                        <CardContent className="p-5 flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                            <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs text-muted-foreground uppercase tracking-wide">Previous</span>
                            <p className="font-medium text-sm truncate mt-0.5">{decodeHtmlEntities(previousPost.title)}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextPost ? (
                    <Link href={`/blog/${nextPost.slug}`} className="group" data-testid="link-next-post">
                      <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all duration-200">
                        <CardContent className="p-5 flex items-center gap-3">
                          <div className="flex-1 min-w-0 text-right">
                            <span className="text-xs text-muted-foreground uppercase tracking-wide">Next</span>
                            <p className="font-medium text-sm truncate mt-0.5">{decodeHtmlEntities(nextPost.title)}</p>
                          </div>
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>

                {relatedPosts.length > 0 && (
                  <section className="pt-10 border-t" data-testid="section-related-posts">
                    <div className="flex items-center gap-3 mb-8">
                      <h2 className="text-2xl font-bold">Related Articles</h2>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {relatedPosts.map(relatedPost => (
                        <Link
                          key={relatedPost.slug}
                          href={`/blog/${relatedPost.slug}`}
                          className="group"
                          data-testid={`card-related-post-${relatedPost.slug}`}
                        >
                          <Card className="h-full overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-border/50">
                            {relatedPost.featuredImageUrl && (
                              <div className="aspect-video overflow-hidden">
                                <img
                                  src={relatedPost.featuredImageUrl}
                                  alt={relatedPost.featuredImageAlt || decodeHtmlEntities(relatedPost.title)}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            )}
                            <CardContent className="p-4">
                              <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                                {decodeHtmlEntities(relatedPost.title)}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                {relatedPost.excerpt?.replace(/<[^>]*>/g, "")}
                              </p>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                <div className="mt-10 pt-10 border-t">
                  <BlogCta
                    variant="inline"
                    heading="Have a question about your dog's behavior?"
                    subtext="WooF Dogs offers behavioral evaluations for dogs of all breeds and histories throughout South Florida. Get a clear, honest recommendation — no package pitch."
                  />
                </div>
              </>
            ) : null}
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {tocItems.length > 0 && post && (
                <Card className="overflow-hidden" data-testid="desktop-toc">
                  <div className="px-4 py-3 border-b bg-muted/30">
                    <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      On This Page
                    </h3>
                  </div>
                  <nav className="p-3">
                    <ul className="space-y-0.5 text-sm">
                      {tocItems.map(item => (
                        <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
                          <a
                            href={`#${item.id}`}
                            className={`block py-1.5 px-2 rounded-md transition-all text-[13px] leading-snug ${
                              activeHeading === item.id
                                ? "text-primary font-medium bg-primary/5"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            }`}
                            data-testid={`link-toc-desktop-${item.id}`}
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </Card>
              )}

              <BlogSidebar initialCategories={initialCategories} initialRecentPosts={initialRecentPosts} />
            </div>
          </aside>
        </div>
      </main>

    </div>
  );
}
