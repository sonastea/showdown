import { votes } from "@/db/schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "@/db/schema";

type CommentVoteData = {
  id: number;
  userId: string;
  commentId: number;
  value: number;
  createdAt: Date;
};

export const commentVotesData: CommentVoteData[] = [
  // Votes for comments on Post 1
  {
    id: 1,
    userId: "2",
    commentId: 1,
    value: 1,
    createdAt: new Date("2025-03-10T10:45:00Z"),
  },
  {
    id: 2,
    userId: "4",
    commentId: 1,
    value: 1,
    createdAt: new Date("2025-03-10T11:00:00Z"),
  },
  {
    id: 3,
    userId: "1",
    commentId: 2,
    value: 1,
    createdAt: new Date("2025-03-10T11:30:00Z"),
  },
  {
    id: 4,
    userId: "4",
    commentId: 2,
    value: 1,
    createdAt: new Date("2025-03-10T11:45:00Z"),
  },
  {
    id: 5,
    userId: "1",
    commentId: 3,
    value: 1,
    createdAt: new Date("2025-03-10T13:00:00Z"),
  },
  {
    id: 6,
    userId: "2",
    commentId: 3,
    value: 1,
    createdAt: new Date("2025-03-10T13:15:00Z"),
  },
  {
    id: 7,
    userId: "3",
    commentId: 37,
    value: 1,
    createdAt: new Date("2025-03-10T14:40:00Z"),
  },
  {
    id: 8,
    userId: "1",
    commentId: 37,
    value: 1,
    createdAt: new Date("2025-03-10T14:55:00Z"),
  },
  {
    id: 9,
    userId: "3",
    commentId: 38,
    value: 1,
    createdAt: new Date("2025-03-10T15:55:00Z"),
  },
  {
    id: 10,
    userId: "5",
    commentId: 38,
    value: 1,
    createdAt: new Date("2025-03-10T16:10:00Z"),
  },
  {
    id: 11,
    userId: "1",
    commentId: 39,
    value: 1,
    createdAt: new Date("2025-03-10T16:35:00Z"),
  },
  {
    id: 12,
    userId: "4",
    commentId: 39,
    value: 1,
    createdAt: new Date("2025-03-10T16:50:00Z"),
  },

  // Votes for comments on Post 2
  {
    id: 13,
    userId: "2",
    commentId: 4,
    value: 1,
    createdAt: new Date("2025-03-08T15:35:00Z"),
  },
  {
    id: 14,
    userId: "5",
    commentId: 4,
    value: 1,
    createdAt: new Date("2025-03-08T15:50:00Z"),
  },
  {
    id: 15,
    userId: "1",
    commentId: 5,
    value: -1,
    createdAt: new Date("2025-03-08T16:25:00Z"),
  },
  {
    id: 16,
    userId: "3",
    commentId: 5,
    value: 1,
    createdAt: new Date("2025-03-08T16:40:00Z"),
  },
  {
    id: 17,
    userId: "1",
    commentId: 6,
    value: 1,
    createdAt: new Date("2025-03-08T17:20:00Z"),
  },
  {
    id: 18,
    userId: "4",
    commentId: 6,
    value: 1,
    createdAt: new Date("2025-03-08T17:35:00Z"),
  },
  {
    id: 19,
    userId: "1",
    commentId: 7,
    value: 1,
    createdAt: new Date("2025-03-08T18:45:00Z"),
  },
  {
    id: 20,
    userId: "3",
    commentId: 7,
    value: 1,
    createdAt: new Date("2025-03-08T19:00:00Z"),
  },

  // Votes for comments on Post 3
  {
    id: 21,
    userId: "2",
    commentId: 8,
    value: 1,
    createdAt: new Date("2025-03-05T19:35:00Z"),
  },
  {
    id: 22,
    userId: "3",
    commentId: 8,
    value: 1,
    createdAt: new Date("2025-03-05T19:50:00Z"),
  },
  {
    id: 23,
    userId: "1",
    commentId: 9,
    value: 1,
    createdAt: new Date("2025-03-05T20:30:00Z"),
  },
  {
    id: 24,
    userId: "2",
    commentId: 9,
    value: 1,
    createdAt: new Date("2025-03-05T20:45:00Z"),
  },
  {
    id: 25,
    userId: "1",
    commentId: 10,
    value: 1,
    createdAt: new Date("2025-03-05T21:55:00Z"),
  },
  {
    id: 26,
    userId: "3",
    commentId: 10,
    value: 1,
    createdAt: new Date("2025-03-05T22:10:00Z"),
  },
  {
    id: 27,
    userId: "1",
    commentId: 11,
    value: 1,
    createdAt: new Date("2025-03-05T22:25:00Z"),
  },
  {
    id: 28,
    userId: "2",
    commentId: 11,
    value: 1,
    createdAt: new Date("2025-03-05T22:40:00Z"),
  },
  {
    id: 29,
    userId: "3",
    commentId: 11,
    value: 1,
    createdAt: new Date("2025-03-05T22:55:00Z"),
  },

  // Votes for comments on Post 4
  {
    id: 30,
    userId: "1",
    commentId: 12,
    value: 1,
    createdAt: new Date("2025-03-01T12:45:00Z"),
  },
  {
    id: 31,
    userId: "2",
    commentId: 12,
    value: 1,
    createdAt: new Date("2025-03-01T13:00:00Z"),
  },
  {
    id: 32,
    userId: "4",
    commentId: 12,
    value: 1,
    createdAt: new Date("2025-03-01T13:15:00Z"),
  },
  {
    id: 33,
    userId: "1",
    commentId: 13,
    value: 1,
    createdAt: new Date("2025-03-01T14:00:00Z"),
  },
  {
    id: 34,
    userId: "2",
    commentId: 13,
    value: 1,
    createdAt: new Date("2025-03-01T14:15:00Z"),
  },
  {
    id: 35,
    userId: "3",
    commentId: 13,
    value: 1,
    createdAt: new Date("2025-03-01T14:30:00Z"),
  },
  {
    id: 36,
    userId: "2",
    commentId: 40,
    value: 1,
    createdAt: new Date("2025-03-01T17:20:00Z"),
  },
  {
    id: 37,
    userId: "3",
    commentId: 40,
    value: 1,
    createdAt: new Date("2025-03-01T17:35:00Z"),
  },

  // Votes for comments on Post 5
  {
    id: 38,
    userId: "2",
    commentId: 14,
    value: 1,
    createdAt: new Date("2025-02-28T11:35:00Z"),
  },
  {
    id: 39,
    userId: "3",
    commentId: 14,
    value: 1,
    createdAt: new Date("2025-02-28T11:50:00Z"),
  },
  {
    id: 40,
    userId: "1",
    commentId: 15,
    value: 1,
    createdAt: new Date("2025-02-28T12:55:00Z"),
  },
  {
    id: 41,
    userId: "3",
    commentId: 15,
    value: 1,
    createdAt: new Date("2025-02-28T13:10:00Z"),
  },
  {
    id: 42,
    userId: "1",
    commentId: 36,
    value: 1,
    createdAt: new Date("2025-02-28T13:25:00Z"),
  },
  {
    id: 43,
    userId: "2",
    commentId: 36,
    value: 1,
    createdAt: new Date("2025-02-28T13:40:00Z"),
  },

  // Votes for other comments
  {
    id: 44,
    userId: "2",
    commentId: 16,
    value: 1,
    createdAt: new Date("2025-02-25T17:30:00Z"),
  },
  {
    id: 45,
    userId: "4",
    commentId: 16,
    value: 1,
    createdAt: new Date("2025-02-25T17:45:00Z"),
  },

  {
    id: 46,
    userId: "1",
    commentId: 17,
    value: 1,
    createdAt: new Date("2025-02-20T14:45:00Z"),
  },
  {
    id: 47,
    userId: "3",
    commentId: 17,
    value: 1,
    createdAt: new Date("2025-02-20T15:00:00Z"),
  },

  {
    id: 48,
    userId: "1",
    commentId: 18,
    value: 1,
    createdAt: new Date("2025-02-15T10:35:00Z"),
  },
  {
    id: 49,
    userId: "2",
    commentId: 18,
    value: 1,
    createdAt: new Date("2025-02-15T10:50:00Z"),
  },
  {
    id: 50,
    userId: "2",
    commentId: 19,
    value: 1,
    createdAt: new Date("2025-02-15T11:20:00Z"),
  },
  {
    id: 51,
    userId: "3",
    commentId: 19,
    value: 1,
    createdAt: new Date("2025-02-15T11:35:00Z"),
  },

  {
    id: 52,
    userId: "1",
    commentId: 20,
    value: 1,
    createdAt: new Date("2025-02-10T15:25:00Z"),
  },
  {
    id: 53,
    userId: "3",
    commentId: 20,
    value: 1,
    createdAt: new Date("2025-02-10T15:40:00Z"),
  },

  {
    id: 54,
    userId: "1",
    commentId: 21,
    value: 1,
    createdAt: new Date("2025-02-05T12:40:00Z"),
  },
  {
    id: 55,
    userId: "2",
    commentId: 21,
    value: 1,
    createdAt: new Date("2025-02-05T12:55:00Z"),
  },

  {
    id: 56,
    userId: "1",
    commentId: 22,
    value: 1,
    createdAt: new Date("2025-01-30T16:30:00Z"),
  },
  {
    id: 57,
    userId: "3",
    commentId: 22,
    value: 1,
    createdAt: new Date("2025-01-30T16:45:00Z"),
  },

  {
    id: 58,
    userId: "1",
    commentId: 23,
    value: 1,
    createdAt: new Date("2025-01-25T13:55:00Z"),
  },
  {
    id: 59,
    userId: "2",
    commentId: 23,
    value: 1,
    createdAt: new Date("2025-01-25T14:10:00Z"),
  },

  {
    id: 60,
    userId: "2",
    commentId: 24,
    value: 1,
    createdAt: new Date("2025-01-20T11:45:00Z"),
  },
  {
    id: 61,
    userId: "3",
    commentId: 24,
    value: 1,
    createdAt: new Date("2025-01-20T12:00:00Z"),
  },

  {
    id: 62,
    userId: "1",
    commentId: 25,
    value: 1,
    createdAt: new Date("2025-01-15T17:40:00Z"),
  },
  {
    id: 63,
    userId: "3",
    commentId: 25,
    value: 1,
    createdAt: new Date("2025-01-15T17:55:00Z"),
  },

  {
    id: 64,
    userId: "1",
    commentId: 26,
    value: 1,
    createdAt: new Date("2025-01-10T10:20:00Z"),
  },
  {
    id: 65,
    userId: "2",
    commentId: 26,
    value: 1,
    createdAt: new Date("2025-01-10T10:35:00Z"),
  },
  {
    id: 66,
    userId: "1",
    commentId: 35,
    value: 1,
    createdAt: new Date("2025-01-10T11:30:00Z"),
  },
  {
    id: 67,
    userId: "2",
    commentId: 35,
    value: 1,
    createdAt: new Date("2025-01-10T11:45:00Z"),
  },

  {
    id: 68,
    userId: "1",
    commentId: 27,
    value: 1,
    createdAt: new Date("2025-01-05T15:35:00Z"),
  },
  {
    id: 69,
    userId: "2",
    commentId: 27,
    value: 1,
    createdAt: new Date("2025-01-05T15:50:00Z"),
  },
  {
    id: 70,
    userId: "3",
    commentId: 27,
    value: 1,
    createdAt: new Date("2025-01-05T16:05:00Z"),
  },

  {
    id: 71,
    userId: "1",
    commentId: 28,
    value: 1,
    createdAt: new Date("2024-12-30T12:30:00Z"),
  },
  {
    id: 72,
    userId: "2",
    commentId: 28,
    value: 1,
    createdAt: new Date("2024-12-30T12:45:00Z"),
  },

  {
    id: 73,
    userId: "2",
    commentId: 29,
    value: 1,
    createdAt: new Date("2024-12-25T18:45:00Z"),
  },
  {
    id: 74,
    userId: "3",
    commentId: 29,
    value: 1,
    createdAt: new Date("2024-12-25T19:00:00Z"),
  },

  {
    id: 75,
    userId: "1",
    commentId: 30,
    value: 1,
    createdAt: new Date("2024-12-20T14:20:00Z"),
  },
  {
    id: 76,
    userId: "3",
    commentId: 30,
    value: 1,
    createdAt: new Date("2024-12-20T14:35:00Z"),
  },

  {
    id: 77,
    userId: "1",
    commentId: 31,
    value: 1,
    createdAt: new Date("2024-12-15T11:35:00Z"),
  },
  {
    id: 78,
    userId: "2",
    commentId: 31,
    value: 1,
    createdAt: new Date("2024-12-15T11:50:00Z"),
  },
  {
    id: 79,
    userId: "1",
    commentId: 32,
    value: 1,
    createdAt: new Date("2024-12-15T12:25:00Z"),
  },
  {
    id: 80,
    userId: "3",
    commentId: 32,
    value: 1,
    createdAt: new Date("2024-12-15T12:40:00Z"),
  },
  {
    id: 81,
    userId: "1",
    commentId: 33,
    value: 1,
    createdAt: new Date("2024-12-15T14:00:00Z"),
  },
  {
    id: 82,
    userId: "2",
    commentId: 33,
    value: 1,
    createdAt: new Date("2024-12-15T14:15:00Z"),
  },
  {
    id: 83,
    userId: "2",
    commentId: 34,
    value: 1,
    createdAt: new Date("2024-12-15T14:45:00Z"),
  },
  {
    id: 84,
    userId: "3",
    commentId: 34,
    value: 1,
    createdAt: new Date("2024-12-15T15:00:00Z"),
  },
];

export const insertCommentVotesData = async (db: NodePgDatabase<typeof schema>) => {
  console.log("Seeding comment votes...");

  for (const vote of commentVotesData) {
    await db.insert(votes).values({
      id: vote.id,
      userId: vote.userId,
      commentId: vote.commentId,
      postId: null,
      value: vote.value,
      createdAt: vote.createdAt,
    });
  }

  console.log("Comment votes seeded successfully!");
};
