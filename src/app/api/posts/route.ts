import { NextResponse } from "next/server";
import { db, posts, users, votes, comments } from "@/lib/drizzle";
import { eq, and, isNull, desc, sql, inArray } from "drizzle-orm";

export async function GET() {
  try {
    // Fetch posts with author information, vote count, and comment count
    const postsWithDetails = await db.query.posts.findMany({
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
      orderBy: [desc(posts.createdAt)],
    });

    // Get vote counts for each post
    const postIds = postsWithDetails.map((post) => post.id);

    // Get vote counts
    const voteCounts = await db
      .select({
        postId: votes.postId,
        count: sql<number>`count(*)`,
      })
      .from(votes)
      .where(and(isNull(votes.commentId), inArray(votes.postId, postIds)))
      .groupBy(votes.postId);

    // Get comment counts
    const commentCounts = await db
      .select({
        postId: comments.postId,
        count: sql<number>`count(*)`,
      })
      .from(comments)
      .where(inArray(comments.postId, postIds))
      .groupBy(comments.postId);

    // Create a map for easier lookup
    const voteCountMap = new Map(voteCounts.map((vc) => [vc.postId, vc.count]));

    const commentCountMap = new Map(
      commentCounts.map((cc) => [cc.postId, cc.count])
    );

    // Format the response
    const formattedPosts = postsWithDetails.map((post) => ({
      ...post,
      _count: {
        votes: voteCountMap.get(post.id) || 0,
        comments: commentCountMap.get(post.id) || 0,
      },
      userVote: null, // This will be filled in client-side based on the user session
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, authorId, tags, category } = await request.json();

    if (!title || !content || !authorId) {
      return NextResponse.json(
        { error: "Title, content, and authorId are required" },
        { status: 400 }
      );
    }

    // Check if the user exists
    const user = await db.query.users.findFirst({
      where: eq(users.id, authorId),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create the post
    const newPost = await db
      .insert(posts)
      .values({
        title,
        content,
        authorId,
        tags: tags || [],
        category: category || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(newPost[0]);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
