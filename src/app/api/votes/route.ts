import { NextResponse } from "next/server";
import { db, votes } from "@/lib/drizzle";
import { eq, and, isNull } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { userId, postId, commentId, value } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (!postId && !commentId) {
      return NextResponse.json(
        { error: "Either postId or commentId is required" },
        { status: 400 }
      );
    }

    if (postId && commentId) {
      return NextResponse.json(
        { error: "Cannot vote on both post and comment at the same time" },
        { status: 400 }
      );
    }

    if (value !== 1 && value !== -1) {
      return NextResponse.json(
        { error: "Vote value must be 1 or -1" },
        { status: 400 }
      );
    }

    // Check if the user has already voted on this post/comment
    let existingVote;

    if (postId) {
      existingVote = await db.query.votes.findFirst({
        where: and(
          eq(votes.userId, userId),
          eq(votes.postId, postId),
          isNull(votes.commentId)
        ),
      });
    } else {
      existingVote = await db.query.votes.findFirst({
        where: and(
          eq(votes.userId, userId),
          eq(votes.commentId, commentId!),
          isNull(votes.postId)
        ),
      });
    }

    // If the user has already voted, update the vote
    if (existingVote) {
      // If the vote value is the same, remove the vote (toggle off)
      if (existingVote.value === value) {
        await db.delete(votes).where(eq(votes.id, existingVote.id));
        return NextResponse.json({ message: "Vote removed" });
      } else {
        // Otherwise, update the vote value
        await db
          .update(votes)
          .set({ value })
          .where(eq(votes.id, existingVote.id));
        return NextResponse.json({ message: "Vote updated" });
      }
    }

    // Otherwise, create a new vote
    await db.insert(votes).values({
      userId,
      postId: postId || null,
      commentId: commentId || null,
      value,
    });

    return NextResponse.json({ message: "Vote created" });
  } catch (error) {
    console.error("Error processing vote:", error);
    return NextResponse.json(
      { error: "Failed to process vote" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const postId = searchParams.get("postId");
    const commentId = searchParams.get("commentId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (!postId && !commentId) {
      return NextResponse.json(
        { error: "Either postId or commentId is required" },
        { status: 400 }
      );
    }

    let userVote;

    if (postId) {
      userVote = await db.query.votes.findFirst({
        where: and(
          eq(votes.userId, userId),
          eq(votes.postId, parseInt(postId)),
          isNull(votes.commentId)
        ),
      });
    } else {
      userVote = await db.query.votes.findFirst({
        where: and(
          eq(votes.userId, userId),
          eq(votes.commentId, parseInt(commentId!)),
          isNull(votes.postId)
        ),
      });
    }

    return NextResponse.json({ vote: userVote });
  } catch (error) {
    console.error("Error fetching vote:", error);
    return NextResponse.json(
      { error: "Failed to fetch vote" },
      { status: 500 }
    );
  }
}
