// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { getAllPosts } from "../../../lib/posts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const date = searchParams.get("date");

  if (!slug || !date) {
    return NextResponse.json(
      { error: "Missing slug or date" },
      { status: 400 }
    );
  }

  const allPosts = await getAllPosts();
  const post = allPosts.find((p) => p.slug === slug && p.date === date);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}
