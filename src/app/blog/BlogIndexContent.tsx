"use client";

import { useState, useMemo } from "react";
import { PostCard } from "@/components/blog/PostCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, X } from "lucide-react";
import type { BlogPost, BlogCategory } from "../../../shared/blogTypes";

const POSTS_PER_PAGE = 6;

function decodeHtmlEntitiesSimple(text: string): string {
  return text
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

interface BlogIndexContentProps {
  initialPosts: BlogPost[];
  initialCategories?: BlogCategory[];
  initialRecentPosts?: BlogPost[];
}

export default function BlogIndexContent({ initialPosts, initialCategories, initialRecentPosts }: BlogIndexContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return initialPosts;
    const q = searchQuery.toLowerCase();
    return initialPosts.filter(post => {
      const title = decodeHtmlEntitiesSimple(post.title).toLowerCase();
      const excerpt = (post.excerpt || "").replace(/<[^>]*>/g, "").toLowerCase();
      const categories = post.categories.map(c => c.name.toLowerCase()).join(" ");
      return title.includes(q) || excerpt.includes(q) || categories.includes(q);
    });
  }, [initialPosts, searchQuery]);

  const featuredPost = filteredPosts.length > 0 && !searchQuery ? filteredPosts[0] : null;
  const gridPosts = searchQuery ? filteredPosts : filteredPosts.slice(1);
  const visibleGridPosts = gridPosts.slice(0, visibleCount);
  const hasMore = visibleCount < gridPosts.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + POSTS_PER_PAGE);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(POSTS_PER_PAGE);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setVisibleCount(POSTS_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">

      <div className="bg-gradient-to-b from-muted/60 to-background border-b border-border/40">
        <div className="container py-12 md:py-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider" data-testid="text-blog-label">
              Woof Dogs Blog
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-3 tracking-tight"
            data-testid="text-blog-title"
          >
            Training Tips &amp; Insights
          </h1>
          <p
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-6"
            data-testid="text-blog-description"
          >
            Tips, insights, and stories about dog training from our expert team. Learn how to build a happier, healthier relationship with your dog.
          </p>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-9 pr-9 bg-background/80"
              data-testid="input-blog-search"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-clear-search"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="container py-10 flex-1">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16" data-testid="text-no-posts">
            {searchQuery ? (
              <>
                <p className="text-muted-foreground text-lg mb-4">
                  No articles found for &ldquo;<strong>{searchQuery}</strong>&rdquo;
                </p>
                <Button variant="outline" onClick={handleClearSearch} data-testid="button-clear-search-empty">
                  Clear search
                </Button>
              </>
            ) : (
              <p className="text-muted-foreground text-lg">No posts available yet.</p>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            {featuredPost && !searchQuery && (
              <section data-testid="section-featured-post">
                <PostCard post={featuredPost} featured />
              </section>
            )}

            <div className="grid lg:grid-cols-[1fr_300px] gap-10">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-xl font-semibold" data-testid="text-latest-articles">
                    {searchQuery
                      ? `${filteredPosts.length} result${filteredPosts.length !== 1 ? "s" : ""} for "${searchQuery}"`
                      : "Latest Articles"}
                  </h2>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="grid gap-6 md:grid-cols-2" data-testid="grid-posts">
                  {visibleGridPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-10 flex justify-center">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleLoadMore}
                      data-testid="button-load-more"
                      className="min-w-[160px]"
                    >
                      Load More Articles
                    </Button>
                  </div>
                )}
              </div>

              <BlogSidebar initialCategories={initialCategories} initialRecentPosts={initialRecentPosts} />
            </div>
          </div>
        )}
      </main>

    </div>
  );
}
