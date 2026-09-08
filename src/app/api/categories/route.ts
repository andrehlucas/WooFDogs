import { NextResponse } from "next/server";
import { blogService } from "../../../../server/services/blogService";

export async function GET() {
  try {
    const categories = await blogService.getCategories();
    // Exclude zero-count categories — they have no posts and add no value
    // to the sidebar widget or to crawlers.
    const nonEmpty = categories.filter(c => (c.count ?? 0) > 0);
    return NextResponse.json(nonEmpty);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
