import { z } from "zod";

// WPGraphQL-compatible Blog Types
// These mirror the structure returned by WordPress GraphQL API

export interface WPMediaItem {
  node: {
    sourceUrl: string;
    altText: string;
    mediaDetails?: {
      width: number;
      height: number;
    };
  };
}

export interface WPAuthor {
  node: {
    id: string;
    databaseId: number;
    name: string;
    slug: string;
    description?: string;
    avatar?: {
      url: string;
    };
  };
}

export interface WPCategory {
  node: {
    id: string;
    databaseId: number;
    name: string;
    slug: string;
    description?: string;
    count?: number;
  };
}

export interface WPPost {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  uri: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  status: 'publish' | 'draft' | 'pending';
  featuredImage?: WPMediaItem;
  author: WPAuthor;
  categories: {
    nodes: WPCategory['node'][];
  };
}

// Connection types (Relay-style pagination used by WPGraphQL)
export interface WPPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface WPPostConnection {
  nodes: WPPost[];
  pageInfo: WPPageInfo;
}

export interface WPCategoryConnection {
  nodes: WPCategory['node'][];
}

export interface WPAuthorConnection {
  nodes: WPAuthor['node'][];
}

// Simplified DTOs for frontend consumption
export interface BlogPost {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  modifiedDate?: string;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
  authorName: string;
  authorSlug: string;
  authorAvatar?: string;
  categories: { name: string; slug: string }[];
  sourceType?: "mdx" | "html";
  rawMdxSource?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count: number;
}

export interface BlogAuthor {
  id: string;
  name: string;
  slug: string;
  description?: string;
  avatar?: string;
}

// Zod schemas for API validation
export const blogPostQuerySchema = z.object({
  category: z.string().optional(),
  limit: z.coerce.number().optional().default(10),
  cursor: z.string().optional(),
});

export type BlogPostQuery = z.infer<typeof blogPostQuerySchema>;
