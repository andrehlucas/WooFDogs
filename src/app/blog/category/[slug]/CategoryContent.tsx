"use client";

import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Folder } from "lucide-react";
import type { BlogPost, BlogCategory } from "../../../../../shared/blogTypes";

interface CategoryContentProps {
  slug: string;
  initialPosts: BlogPost[];
  initialCategory: BlogCategory | null;
  initialCategories?: BlogCategory[];
  initialRecentPosts?: BlogPost[];
}

export default function CategoryContent({ slug, initialPosts, initialCategory, initialCategories, initialRecentPosts }: CategoryContentProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">

      <div className="bg-gradient-to-b from-muted/60 to-background border-b border-border/40">
        <div className="container py-10 md:py-14">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 group transition-colors"
            data-testid="link-back-to-blog"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Folder className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Category
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-2 tracking-tight"
            data-testid="text-category-title"
          >
            {initialCategory?.name || "Category"}
          </h1>
          {initialCategory?.description && (
            <p
              className="text-lg text-muted-foreground max-w-2xl"
              data-testid="text-category-description"
            >
              {initialCategory.description}
            </p>
          )}
        </div>
      </div>

      <main className="container py-10 flex-1">
        <div className="grid lg:grid-cols-[1fr_300px] gap-10">
          <div>
            {initialPosts.length === 0 ? (
              <div className="text-center py-16" data-testid="text-no-posts">
                <p className="text-muted-foreground mb-4 text-lg">No posts in this category yet.</p>
                <Link href="/blog">
                  <Button data-testid="button-view-all-posts">View All Posts</Button>
                </Link>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-lg font-semibold text-muted-foreground">
                    {initialPosts.length} {initialPosts.length === 1 ? "article" : "articles"}
                  </h2>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div
                  className="grid gap-6 md:grid-cols-2"
                  data-testid="grid-category-posts"
                >
                  {initialPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <BlogSidebar currentCategory={slug} initialCategories={initialCategories} initialRecentPosts={initialRecentPosts} />
        </div>
      </main>

    </div>
  );
}
