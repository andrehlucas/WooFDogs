"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "../../shared/blogTypes";

function decodeEntities(text: string): string {
  return text
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(text: string): string {
  return (text || "").replace(/<[^>]*>/g, "").trim();
}

function readingTime(post: BlogPost): string {
  const source = post.content || post.excerpt || "";
  const words = stripHtml(source).split(/\s+/).filter(Boolean).length;
  const mins = Math.max(2, Math.ceil(words / 220));
  return `${mins} min read`;
}

function formatDate(date: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Date(date).toLocaleDateString(
    "en-US",
    opts ?? { month: "short", day: "numeric", year: "numeric" }
  );
}

export function HomepageBlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts?limit=5")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!loading && posts.length === 0) return null;

  const featured = posts[0];
  const recent = posts.slice(1, 5);

  return (
    <section
      id="blog"
      className="w-full py-8 md:py-14 lg:py-18 bg-white dark:bg-black"
      aria-label="Latest from the blog"
    >
      <div className="container">
        {/* Header — matches homepage pattern */}
        <div className="flex flex-col space-y-4 mb-12">
          <div className="space-y-3">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary w-fit">
              Training Journal
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Insights From the Dog Yard
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Real lessons, real cases, real dogs — written by the WooF training team.
            </p>
          </div>
        </div>

        {loading ? (
          <BlogSkeleton />
        ) : (
          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            {/* Featured */}
            {featured && (
              <div className="col-span-12 lg:col-span-7 transition-transform duration-300 hover:-translate-y-2 motion-reduce:hover:translate-y-0">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group block h-full"
                  data-testid={`card-blog-featured-${featured.slug}`}
                >
                  <article
                    className="relative aspect-[16/11] overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-xl"
                    style={{ contain: "layout paint" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-foreground" />
                    {featured.featuredImageUrl && (
                      <img
                        src={featured.featuredImageUrl}
                        alt={
                          featured.featuredImageAlt ||
                          `Featured Woof Dogs training article: ${decodeEntities(featured.title)}`
                        }
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        width={1200}
                        height={825}
                      />
                    )}

                    {/* Featured badge */}
                    <div className="absolute top-6 left-6 z-10">
                      <span className="inline-block rounded-full bg-primary/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-sm font-medium text-white">
                        {featured.categories[0]?.name || "Featured"}
                      </span>
                    </div>

                    {/* Bottom overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/85 via-black/45 to-transparent">
                      <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-white mb-3 group-hover:underline decoration-2 underline-offset-4">
                        {decodeEntities(featured.title)}
                      </h3>
                      <p className="text-white/85 md:text-lg leading-relaxed mb-5 max-w-xl line-clamp-2">
                        {stripHtml(featured.excerpt).slice(0, 180)}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/80 font-medium">
                        <span data-testid={`text-author-${featured.slug}`}>
                          {featured.authorName}
                        </span>
                        <span aria-hidden className="h-1 w-1 rounded-full bg-white/40" />
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {formatDate(featured.date)}
                        </span>
                        <span aria-hidden className="h-1 w-1 rounded-full bg-white/40" />
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {readingTime(featured)}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            )}

            {/* Recent list */}
            <div className="col-span-12 lg:col-span-5 flex flex-col">
              <div className="rounded-2xl border bg-card shadow-sm p-6 md:p-7 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold tracking-tight">
                    Latest Articles
                  </h3>
                  {recent.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {recent.length} new
                    </span>
                  )}
                </div>
                <div className="flex-1 flex flex-col">
                  {recent.map((post) => {
                    const cat = post.categories[0];
                    return (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex items-start gap-4 py-5 border-t border-border hover:pl-2 transition-all"
                        data-testid={`link-blog-recent-${post.slug}`}
                      >
                        <span
                          className="mt-1.5 shrink-0 h-2 w-2 rounded-full bg-primary"
                          aria-hidden
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 text-xs font-medium uppercase tracking-wider">
                            {cat && (
                              <>
                                <span className="text-primary">{cat.name}</span>
                                <span aria-hidden className="text-muted-foreground/50">•</span>
                              </>
                            )}
                            <span className="text-muted-foreground">
                              {formatDate(post.date, {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <h4 className="font-semibold leading-snug group-hover:text-primary transition-colors mb-1.5 line-clamp-2">
                            {decodeEntities(post.title)}
                          </h4>
                          <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" /> {readingTime(post)}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all mt-1.5 shrink-0" />
                      </Link>
                    );
                  })}
                </div>
                <div className="pt-6 mt-2">
                  <Link href="/blog" className="block">
                    <Button
                      size="lg"
                      className="w-full"
                      data-testid="button-browse-all-articles"
                    >
                      Browse All Articles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom link, mirrors testimonials "See more reviews" pattern */}
        {!loading && (
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              data-testid="link-view-all-blog-posts"
            >
              See all training articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function BlogSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-8">
      <div className="col-span-12 lg:col-span-7">
        <div className="aspect-[16/11] rounded-2xl border bg-muted animate-pulse" />
      </div>
      <div className="col-span-12 lg:col-span-5">
        <div className="rounded-2xl border bg-card shadow-sm p-6 md:p-7">
          <div className="h-5 w-40 bg-muted rounded animate-pulse mb-5" />
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-4 py-5 border-t border-border first:border-t-0"
            >
              <span className="mt-1.5 h-2 w-2 rounded-full bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-3 w-16 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
          <div className="h-11 w-full bg-muted rounded-md animate-pulse mt-6" />
        </div>
      </div>
    </div>
  );
}
