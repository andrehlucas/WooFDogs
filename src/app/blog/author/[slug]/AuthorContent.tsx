"use client";

import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Award } from "lucide-react";
import { AUTHOR_PROFILES, type AuthorProfile } from "@/lib/blogAuthors";
import type { BlogPost, BlogCategory } from "../../../../../shared/blogTypes";

interface AuthorContentProps {
  slug: string;
  initialPosts: BlogPost[];
  initialCategories?: BlogCategory[];
  initialRecentPosts?: BlogPost[];
}

export default function AuthorContent({ slug, initialPosts, initialCategories, initialRecentPosts }: AuthorContentProps) {
  const profile: AuthorProfile | null = AUTHOR_PROFILES[slug] || null;

  const displayName = profile?.displayName || slug
    .replace(/-woof-dogs$/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());

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

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border-2 border-primary/20">
              <User className="h-9 w-9 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-1">Author</p>
              <h1
                className="text-3xl md:text-4xl font-bold mb-2 tracking-tight"
                data-testid="text-author-name"
              >
                {displayName}
              </h1>
              {profile?.title && (
                <p className="text-base text-muted-foreground font-medium mb-3">{profile.title}</p>
              )}
              {profile ? (
                <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                  {profile.longBio || profile.bio}
                </p>
              ) : null}

              {profile?.credentials && profile.credentials.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.credentials.map((cred, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Award className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>{cred}</span>
                    </div>
                  ))}
                </div>
              )}

              {profile?.specialties && profile.specialties.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.specialties.map(spec => (
                    <Badge key={spec} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="container py-10 flex-1">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-xl font-bold">Articles by {displayName}</h2>
          <Badge variant="outline" className="text-sm font-normal">
            {initialPosts.length} {initialPosts.length === 1 ? "article" : "articles"}
          </Badge>
          <div className="flex-1 h-px bg-border" />
        </div>

        {initialPosts.length === 0 ? (
          <div className="text-center py-16" data-testid="text-no-posts">
            <p className="text-muted-foreground mb-4 text-lg">No posts from this author yet.</p>
            <Link href="/blog">
              <Button data-testid="button-view-all-posts">View All Posts</Button>
            </Link>
          </div>
        ) : (
          <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            data-testid="grid-author-posts"
          >
            {initialPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      <div className="border-t bg-muted/30 py-10">
        <div className="container text-center">
          <h3 className="text-xl font-bold mb-2">Work with WooF Dogs</h3>
          <p className="text-muted-foreground mb-5 max-w-md mx-auto">
            Ready to start your dog&apos;s training journey? Book a behavioral evaluation with our team.
          </p>
          <Link href="/evaluation">
            <Button size="lg" className="bg-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,55%)]" data-testid="button-book-evaluation">
              Book Your Evaluation
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}
