import type { 
  BlogPost, 
  BlogCategory, 
  BlogAuthor,
  BlogPostQuery 
} from "../../shared/blogTypes";
import type { IBlogDataSource } from "./blogService";

const WP_API_BASE = "https://cms.woofdogs.com/wp-json/wp/v2";

interface WPRestPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  acf: Record<string, unknown>;
  _embedded?: {
    author?: Array<{
      id: number;
      name: string;
      slug: string;
      description: string;
      avatar_urls: {
        "24"?: string;
        "48"?: string;
        "96"?: string;
      };
    }>;
    "wp:featuredmedia"?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
      media_details: {
        width: number;
        height: number;
      };
    }>;
    "wp:term"?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      description: string;
      count: number;
      taxonomy: string;
    }>>;
  };
}

interface WPRestCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

interface WPRestUser {
  id: number;
  name: string;
  slug: string;
  description: string;
  avatar_urls: {
    "24"?: string;
    "48"?: string;
    "96"?: string;
  };
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export class WordPressBlogService implements IBlogDataSource {
  private categoryCache: Map<number, WPRestCategory> = new Map();

  private async fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  private transformEmbeddedPost(post: WPRestPost): BlogPost {
    const embedded = post._embedded;
    const author = embedded?.author?.[0];
    const media = embedded?.["wp:featuredmedia"]?.[0];
    const terms = embedded?.["wp:term"] || [];
    const categories = terms.flat().filter(t => t.taxonomy === "category");

    return {
      id: `post_${post.id}`,
      databaseId: post.id,
      title: post.title.rendered,
      slug: post.slug,
      excerpt: stripHtmlTags(post.excerpt.rendered),
      content: post.content.rendered,
      date: post.date,
      modifiedDate: post.modified || undefined,
      featuredImageUrl: media?.source_url,
      featuredImageAlt: media?.alt_text,
      authorName: author?.name || "Unknown Author",
      authorSlug: author?.slug || "unknown",
      authorAvatar: author?.avatar_urls?.["96"] || author?.avatar_urls?.["48"],
      categories: categories.map(cat => ({
        name: cat.name,
        slug: cat.slug
      }))
    };
  }

  async getPosts(query?: BlogPostQuery): Promise<{ posts: BlogPost[]; hasMore: boolean }> {
    try {
      const limit = query?.limit || 10;
      const params = new URLSearchParams({
        per_page: String(limit + 1),
        status: "publish",
        _embed: "1",
        orderby: "date",
        order: "desc"
      });

      if (query?.category) {
        const allCategories = await this.getCategories();
        const category = allCategories.find(c => c.slug === query.category);
        if (category) {
          params.set("categories", category.id);
        }
      }

      const wpPosts = await this.fetchJson<WPRestPost[]>(`${WP_API_BASE}/posts?${params}`);
      
      const hasMore = wpPosts.length > limit;
      const postsToTransform = hasMore ? wpPosts.slice(0, limit) : wpPosts;
      
      const posts = postsToTransform.map(post => this.transformEmbeddedPost(post));

      return { posts, hasMore };
    } catch (error) {
      console.error("Error fetching posts from WordPress:", error);
      return { posts: [], hasMore: false };
    }
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const params = new URLSearchParams({
        slug,
        status: "publish",
        _embed: "1"
      });

      const posts = await this.fetchJson<WPRestPost[]>(`${WP_API_BASE}/posts?${params}`);
      
      if (posts.length === 0) {
        return null;
      }

      return this.transformEmbeddedPost(posts[0]);
    } catch (error) {
      console.error("Error fetching post by slug from WordPress:", error);
      return null;
    }
  }

  async getCategories(): Promise<BlogCategory[]> {
    try {
      const wpCategories = await this.fetchJson<WPRestCategory[]>(`${WP_API_BASE}/categories?per_page=100`);
      
      wpCategories.forEach(cat => this.categoryCache.set(cat.id, cat));

      return wpCategories.map(cat => ({
        id: String(cat.id),
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        count: cat.count
      }));
    } catch (error) {
      console.error("Error fetching categories from WordPress:", error);
      return [];
    }
  }

  async getAuthors(): Promise<BlogAuthor[]> {
    try {
      const wpAuthors = await this.fetchJson<WPRestUser[]>(`${WP_API_BASE}/users?per_page=100`);

      return wpAuthors.map(author => ({
        id: String(author.id),
        name: author.name,
        slug: author.slug,
        description: author.description,
        avatar: author.avatar_urls?.["96"] || author.avatar_urls?.["48"]
      }));
    } catch (error) {
      console.error("Error fetching authors from WordPress:", error);
      return [];
    }
  }

  async getPostsByCategory(categorySlug: string, limit: number = 10): Promise<BlogPost[]> {
    const { posts } = await this.getPosts({ category: categorySlug, limit });
    return posts;
  }
}
