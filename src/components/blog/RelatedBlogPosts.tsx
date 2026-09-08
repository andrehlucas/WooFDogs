import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen } from "lucide-react";
import { blogService } from "../../../server/services/blogService";

interface RelatedBlogPostsProps {
  postSlugs: string[];
  heading?: string;
}

function decodeEntities(text: string): string {
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

export async function RelatedBlogPosts({
  postSlugs,
  heading = "Related Reading",
}: RelatedBlogPostsProps) {
  const posts = await Promise.all(
    postSlugs.map(slug => blogService.getPostBySlug(slug))
  );
  const validPosts = posts.filter(Boolean);

  if (validPosts.length === 0) return null;

  return (
    <section className="py-12 border-t bg-muted/30" aria-label="Related blog posts">
      <div className="container">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">{heading}</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {validPosts.map(post => (
            <Link
              key={post!.slug}
              href={`/blog/${post!.slug}`}
              className="group"
            >
              <Card className="h-full overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-border/50">
                {post!.featuredImageUrl && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post!.featuredImageUrl}
                      alt={post!.featuredImageAlt || decodeEntities(post!.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <CardContent className="p-5">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post!.categories.slice(0, 2).map(cat => (
                      <Badge key={cat.slug} variant="secondary" className="text-xs">
                        {cat.name}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {decodeEntities(post!.title)}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {(post!.excerpt || "").replace(/<[^>]*>/g, "").slice(0, 120)}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Read article
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
