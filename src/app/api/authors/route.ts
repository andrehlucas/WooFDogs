import { NextResponse } from "next/server";
import { blogService } from "../../../../server/services/blogService";

export async function GET() {
  try {
    const authors = await blogService.getAuthors();
    return NextResponse.json(authors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch authors" }, { status: 500 });
  }
}
