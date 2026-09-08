"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Folder, Clock3 } from "lucide-react";
import { BlogCta } from "@/components/blog/BlogCta";
import type { BlogCategory, BlogPost } from "../../../shared/blogTypes";

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

interface BlogSidebarProps {
  currentCategory?: string;
  initialCategories?: BlogCategory[];
  initialRecentPosts?: BlogPost[];
}

export function BlogSidebar({ currentCategory, initialCategories, initialRecentPosts }: BlogSidebarProps) {
  const hasInitialData = initialCategories !== undefined && initialRecentPosts !== undefined;
  const [categories, setCategories] = useState<BlogCategory[]>(initialCategories ?? []);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>(initialRecentPosts ?? []);
  const [loading, setLoading] = useState(!hasInitialData);

  useEffect(() => {
    if (hasInitialData) return;
    Promise.all([
      fetch("/api/categories").then(res => res.json()),
      fetch("/api/posts?limit=5").then(res => res.json())
    ]).then(([cats, postsData]) => {
      setCategories(cats);
      setRecentPosts(postsData.posts);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [hasInitialData]);

  return (
    <aside className="space-y-6">
      <BlogCta variant="sidebar" />

      <Card className="overflow-hidden" data-testid="sidebar-categories">
        <div className="px-5 py-4 border-b bg-muted/30">
          <div className="flex items-center gap-2">
            <Folder className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Categories</h3>
          </div>
        </div>
        <div className="p-2">
          {loading ? (
            <div className="space-y-1 p-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-9 w-full rounded-md" />
              ))}
            </div>
          ) : (
            <nav>
              <Link
                href="/blog"
                data-testid="link-category-all"
                className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-colors ${
                  !currentCategory
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span data-testid="badge-category-all">All Posts</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/blog/category/${category.slug}`}
                  data-testid={`link-sidebar-category-${category.slug}`}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-colors ${
                    currentCategory === category.slug
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <span data-testid={`sidebar-category-${category.slug}`}>{category.name}</span>
                  {category.count != null && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      currentCategory === category.slug
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {category.count}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </Card>

      <Card className="overflow-hidden" data-testid="sidebar-recent-posts">
        <div className="px-5 py-4 border-b bg-muted/30">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Recent Posts</h3>
          </div>
        </div>
        <div className="p-4">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-14 w-14 rounded-md shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-3">
              {recentPosts.slice(0, 5).map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex gap-3 p-1.5 -m-1.5 rounded-md hover:bg-muted/50 transition-colors"
                    data-testid={`link-sidebar-post-${post.slug}`}
                  >
                    {post.featuredImageUrl ? (
                      <div className="h-14 w-14 rounded-md overflow-hidden shrink-0 bg-muted">
                        <img
                          src={post.featuredImageUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-14 w-14 rounded-md shrink-0 bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground text-xs">No img</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {decodeHtmlEntities(post.title)}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>
    </aside>
  );
}
