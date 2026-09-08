import type { Metadata } from "next";
import { blogService } from "../../../server/services/blogService";
import BlogIndexContent from "./BlogIndexContent";

export const metadata: Metadata = {
  title: { absolute: "Dog Training Tips & Insights | WooF Dogs Blog" },
  description:
    "Tips, insights, and stories about dog training from our expert team. Learn how to build a happier, healthier relationship with your dog.",
  alternates: { canonical: "https://woofdogs.com/blog" },
  openGraph: {
    title: "Dog Training Tips & Insights | WooF Dogs Blog",
    description:
      "Tips, insights, and stories about dog training from our expert team. Learn how to build a happier, healthier relationship with your dog.",
    url: "https://woofdogs.com/blog",
    siteName: "WooF Dogs",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://woofdogs.com/trainers.webp", width: 800, height: 600, alt: "WooF Dogs Professional Dog Trainers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Training Tips & Insights | WooF Dogs Blog",
    description:
      "Tips, insights, and stories about dog training from our expert team. Learn how to build a happier, healthier relationship with your dog.",
  },
};

export default async function BlogPage() {
  const [{ posts }, categories] = await Promise.all([
    blogService.getPosts({ limit: 100 }),
    blogService.getCategories(),
  ]);
  const recentPosts = posts.slice(0, 5);
  return <BlogIndexContent initialPosts={posts} initialCategories={categories} initialRecentPosts={recentPosts} />;
}
