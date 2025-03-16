import { NextResponse } from "next/server";
import { comments, db, users, votes } from "@/lib/drizzle";
import { eq, and, isNull, desc, sql, inArray } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = parseInt(params.id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    // Fetch top-level comments (where parentId is null)
    const topLevelComments = await db.query.comments.findMany({
      where: and(eq(comments.postId, postId), isNull(comments.parentId)),
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
      orderBy: [desc(comments.createdAt)],
    });

    // Get all comment IDs to fetch vote counts and replies
    const commentIds = topLevelComments.map((comment) => comment.id);

    // Get vote counts for each comment
    const voteCounts = await db
      .select({
        commentId: votes.commentId,
        count: sql<number>`count(*)`,
      })
      .from(votes)
      .where(and(isNull(votes.postId), inArray(votes.commentId, commentIds)))
      .groupBy(votes.commentId);

    // Create a map for easier lookup
    const voteCountMap = new Map(
      voteCounts.map((vc) => [vc.commentId, vc.count])
    );

    // Get replies for each comment
    const replies = await db.query.comments.findMany({
      where: and(eq(comments.postId, postId), inArray(comments.parentId, commentIds)),
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
      orderBy: [desc(comments.createdAt)],
    });

    // Group replies by parent comment ID
    const repliesMap = new Map();
    for (const reply of replies) {
      if (!repliesMap.has(reply.parentId)) {
        repliesMap.set(reply.parentId, []);
      }

      // Get vote count for this reply
      const replyVoteCount = await db
        .select({
          count: sql<number>`count(*)`,
        })
        .from(votes)
        .where(and(isNull(votes.postId), eq(votes.commentId, reply.id)));

      repliesMap.get(reply.parentId).push({
        ...reply,
        _count: {
          votes: replyVoteCount[0]?.count || 0,
        },
        userVote: null, // This will be filled in client-side based on the user session
      });
    }

    // Format the response
    const formattedComments = topLevelComments.map((comment) => ({
      ...comment,
      _count: {
        votes: voteCountMap.get(comment.id) || 0,
      },
      userVote: null, // This will be filled in client-side based on the user session
      replies: repliesMap.get(comment.id) || [],
    }));

    return NextResponse.json(formattedComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = parseInt(params.id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const { content, authorId, parentId } = await request.json();

    if (!content || !authorId) {
      return NextResponse.json(
        { error: "Content and authorId are required" },
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

    // Create the comment
    const newComment = await db
      .insert(comments)
      .values({
        content,
        postId,
        authorId,
        parentId: parentId || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    // Return the comment with author information
    const commentWithAuthor = {
      ...newComment[0],
      author: {
        id: user.id,
        name: user.name,
        username: user.username,
        image: user.image,
      },
      _count: {
        votes: 0,
      },
      userVote: null,
      replies: [],
    };

    return NextResponse.json(commentWithAuthor);
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
