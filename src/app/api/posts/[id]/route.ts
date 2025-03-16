import { NextResponse } from "next/server";
import { comments, db, posts, votes } from "@/lib/drizzle";
import { eq, and, isNull, sql } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = parseInt(params.id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    // Fetch the post with author information
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
      with: {
        author: {
          columns: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Get vote count for the post
    const voteCount = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(votes)
      .where(and(isNull(votes.commentId), eq(votes.postId, postId)));

    // Get comment count for the post
    const commentCount = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(comments)
      .where(eq(comments.postId, postId));

    // Format the response
    const formattedPost = {
      ...post,
      _count: {
        votes: voteCount[0]?.count || 0,
        comments: commentCount[0]?.count || 0,
      },
      userVote: null, // This will be filled in client-side based on the user session
    };

    return NextResponse.json(formattedPost);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
