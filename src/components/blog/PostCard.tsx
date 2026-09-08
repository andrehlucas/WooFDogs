"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "../../../shared/blogTypes";

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

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const readingTime = estimateReadingTime(post.content || post.excerpt || "");

  if (featured) {
    return (
      <Card 
        className="overflow-hidden group border-0 shadow-md hover:shadow-xl transition-all duration-300"
        data-testid={`card-post-featured-${post.slug}`}
      >
        <div className="grid md:grid-cols-2 gap-0">
          <Link 
            href={`/blog/${post.slug}`}
            data-testid={`link-post-image-${post.slug}`}
            className="block"
          >
            {post.featuredImageUrl && (
              <div className="aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
                <img
                  src={post.featuredImageUrl}
                  alt={post.featuredImageAlt || decodeHtmlEntities(post.title)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-testid={`img-post-${post.slug}`}
                />
              </div>
            )}
          </Link>
          <CardContent className="p-6 md:p-8 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
              {(post.categories || []).map((category) => (
                <Link 
                  key={category.slug} 
                  href={`/blog/category/${category.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  data-testid={`link-category-${category.slug}-${post.slug}`}
                >
                  <Badge 
                    variant="secondary" 
                    className="hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                    data-testid={`badge-category-${category.slug}`}
                  >
                    {category.name}
                  </Badge>
                </Link>
              ))}
            </div>
            
            <Link 
              href={`/blog/${post.slug}`}
              data-testid={`link-post-title-${post.slug}`}
            >
              <h2 
                className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-3"
                data-testid={`text-title-${post.slug}`}
              >
                {decodeHtmlEntities(post.title)}
              </h2>
            </Link>
            
            <p 
              className="text-muted-foreground mb-5 line-clamp-3 text-base leading-relaxed"
              data-testid={`text-excerpt-${post.slug}`}
            >
              {post.excerpt?.replace(/<[^>]*>/g, "")}
            </p>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 ring-2 ring-background">
                  <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                  <AvatarFallback className="text-xs">{post.authorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <span 
                    className="text-sm font-medium block"
                    data-testid={`text-author-${post.slug}`}
                  >
                    {post.authorName}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span data-testid={`text-date-${post.slug}`}>{formattedDate}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {readingTime} min
                    </span>
                  </div>
                </div>
              </div>
              <Link 
                href={`/blog/${post.slug}`}
                className="text-primary font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Read <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-border/50"
      data-testid={`card-post-${post.slug}`}
    >
      <Link 
        href={`/blog/${post.slug}`}
        data-testid={`link-post-image-${post.slug}`}
        className="block"
      >
        {post.featuredImageUrl ? (
          <div className="aspect-video overflow-hidden relative">
            <img
              src={post.featuredImageUrl}
              alt={post.featuredImageAlt || decodeHtmlEntities(post.title)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              data-testid={`img-post-${post.slug}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ) : (
          <div className="aspect-video bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-sm">No image</span>
          </div>
        )}
      </Link>
      <CardContent className="p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {(post.categories || []).slice(0, 2).map((category) => (
            <Link 
              key={category.slug} 
              href={`/blog/category/${category.slug}`}
              onClick={(e) => e.stopPropagation()}
              data-testid={`link-category-${category.slug}-${post.slug}`}
            >
              <Badge 
                variant="secondary" 
                className="hover:bg-primary hover:text-primary-foreground transition-colors text-[11px] px-2 py-0.5"
                data-testid={`badge-category-${category.slug}`}
              >
                {category.name}
              </Badge>
            </Link>
          ))}
          {readingTime > 0 && (
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground px-2 py-0.5">
              <Clock className="h-3 w-3" />
              {readingTime} min read
            </span>
          )}
        </div>
        
        <Link 
          href={`/blog/${post.slug}`}
          data-testid={`link-post-title-${post.slug}`}
        >
          <h3 
            className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug"
            data-testid={`text-title-${post.slug}`}
          >
            {decodeHtmlEntities(post.title)}
          </h3>
        </Link>
        
        <p 
          className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed"
          data-testid={`text-excerpt-${post.slug}`}
        >
          {post.excerpt?.replace(/<[^>]*>/g, "")}
        </p>
        
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarImage src={post.authorAvatar} alt={post.authorName} />
              <AvatarFallback className="text-[10px]">{post.authorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span 
              className="text-xs font-medium text-muted-foreground"
              data-testid={`text-author-${post.slug}`}
            >
              {post.authorName}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span data-testid={`text-date-${post.slug}`}>{formattedDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
