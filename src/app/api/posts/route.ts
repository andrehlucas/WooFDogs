import { NextRequest, NextResponse } from "next/server";
import { blogPostQuerySchema } from "../../../../shared/blogTypes";
import { blogService } from "../../../../server/services/blogService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = blogPostQuerySchema.parse({
      category: searchParams.get("category") || undefined,
      limit: searchParams.get("limit") || undefined,
      cursor: searchParams.get("cursor") || undefined,
    });
    
    const result = await blogService.getPosts(query);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
