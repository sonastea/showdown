import { votes } from "@/db/schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "@/db/schema";

type PostVoteData = {
  id?: number;
  userId: string;
  postId: number;
  value: number;
  createdAt: Date;
};

export const postVotesData: PostVoteData[] = [
  // Votes for Post 1
  {
    userId: "1",
    postId: 1,

    value: 1,
    createdAt: new Date("2025-03-10T10:05:00Z"),
  },
  {
    userId: "2",
    postId: 1,

    value: 1,
    createdAt: new Date("2025-03-10T10:10:00Z"),
  },
  {
    userId: "3",
    postId: 1,

    value: 1,
    createdAt: new Date("2025-03-10T10:15:00Z"),
  },
  {
    userId: "5",
    postId: 1,

    value: 1,
    createdAt: new Date("2025-03-10T10:20:00Z"),
  },

  // Votes for Post 2
  {
    userId: "1",
    postId: 2,

    value: 1,
    createdAt: new Date("2025-03-08T15:05:00Z"),
  },
  {
    userId: "2",
    postId: 2,

    value: -1,
    createdAt: new Date("2025-03-08T15:10:00Z"),
  },
  {
    userId: "4",
    postId: 2,

    value: -1,
    createdAt: new Date("2025-03-08T15:15:00Z"),
  },

  // Votes for Post 3
  {
    userId: "1",
    postId: 3,

    value: 1,
    createdAt: new Date("2025-03-05T19:05:00Z"),
  },
  {
    userId: "2",
    postId: 3,

    value: 1,
    createdAt: new Date("2025-03-05T19:10:00Z"),
  },
  {
    userId: "3",
    postId: 3,

    value: 1,
    createdAt: new Date("2025-03-05T19:15:00Z"),
  },
  {
    userId: "5",
    postId: 3,

    value: 1,
    createdAt: new Date("2025-03-05T19:20:00Z"),
  },

  // Votes for Post 4
  {
    userId: "2",
    postId: 4,

    value: 1,
    createdAt: new Date("2025-03-01T11:30:00Z"),
  },
  {
    userId: "3",
    postId: 4,

    value: 1,
    createdAt: new Date("2025-03-01T11:35:00Z"),
  },
  {
    userId: "4",
    postId: 4,

    value: 1,
    createdAt: new Date("2025-03-01T11:40:00Z"),
  },

  // Votes for Post 5
  {
    userId: "1",
    postId: 5,

    value: 1,
    createdAt: new Date("2025-02-28T10:30:00Z"),
  },
  {
    userId: "2",
    postId: 5,

    value: 1,
    createdAt: new Date("2025-02-28T10:35:00Z"),
  },
  {
    userId: "4",
    postId: 5,

    value: 1,
    createdAt: new Date("2025-02-28T10:40:00Z"),
  },

  // Votes for Post 6
  {
    userId: "2",
    postId: 6,

    value: 1,
    createdAt: new Date("2025-02-25T16:40:00Z"),
  },
  {
    userId: "3",
    postId: 6,

    value: 1,
    createdAt: new Date("2025-02-25T16:45:00Z"),
  },
  {
    userId: "4",
    postId: 6,

    value: 1,
    createdAt: new Date("2025-02-25T16:50:00Z"),
  },

  // Votes for Post 7
  {
    userId: "1",
    postId: 7,

    value: 1,
    createdAt: new Date("2025-02-20T14:00:00Z"),
  },
  {
    userId: "4",
    postId: 7,

    value: 1,
    createdAt: new Date("2025-02-20T14:05:00Z"),
  },
  {
    userId: "5",
    postId: 7,

    value: 1,
    createdAt: new Date("2025-02-20T14:10:00Z"),
  },

  // Votes for Post 8
  {
    userId: "1",
    postId: 8,

    value: 1,
    createdAt: new Date("2025-02-15T09:40:00Z"),
  },
  {
    userId: "3",
    postId: 8,

    value: 1,
    createdAt: new Date("2025-02-15T09:45:00Z"),
  },
  {
    userId: "5",
    postId: 8,

    value: 1,
    createdAt: new Date("2025-02-15T09:50:00Z"),
  },

  // Votes for Post 9
  {
    userId: "1",
    postId: 9,

    value: 1,
    createdAt: new Date("2025-02-10T14:30:00Z"),
  },
  {
    userId: "2",
    postId: 9,

    value: 1,
    createdAt: new Date("2025-02-10T14:35:00Z"),
  },
  {
    userId: "3",
    postId: 9,

    value: -1,
    createdAt: new Date("2025-02-10T14:40:00Z"),
  },

  // Votes for Post 10
  {
    userId: "2",
    postId: 10,

    value: 1,
    createdAt: new Date("2025-02-05T11:20:00Z"),
  },
  {
    userId: "3",
    postId: 10,

    value: 1,
    createdAt: new Date("2025-02-05T11:25:00Z"),
  },
  {
    userId: "4",
    postId: 10,

    value: 1,
    createdAt: new Date("2025-02-05T11:30:00Z"),
  },

  // Votes for other posts
  {
    userId: "1",
    postId: 11,

    value: 1,
    createdAt: new Date("2025-01-30T15:50:00Z"),
  },
  {
    userId: "2",
    postId: 11,

    value: 1,
    createdAt: new Date("2025-01-30T15:55:00Z"),
  },

  {
    userId: "3",
    postId: 12,

    value: 1,
    createdAt: new Date("2025-01-25T12:40:00Z"),
  },
  {
    userId: "4",
    postId: 12,

    value: 1,
    createdAt: new Date("2025-01-25T12:45:00Z"),
  },

  {
    userId: "1",
    postId: 13,

    value: 1,
    createdAt: new Date("2025-01-20T10:30:00Z"),
  },
  {
    userId: "2",
    postId: 13,

    value: 1,
    createdAt: new Date("2025-01-20T10:35:00Z"),
  },

  {
    userId: "1",
    postId: 14,

    value: 1,
    createdAt: new Date("2025-01-15T17:00:00Z"),
  },
  {
    userId: "2",
    postId: 14,

    value: 1,
    createdAt: new Date("2025-01-15T17:05:00Z"),
  },

  {
    userId: "1",
    postId: 15,

    value: 1,
    createdAt: new Date("2025-01-10T09:25:00Z"),
  },
  {
    userId: "3",
    postId: 15,

    value: 1,
    createdAt: new Date("2025-01-10T09:30:00Z"),
  },
  {
    userId: "4",
    postId: 15,

    value: 1,
    createdAt: new Date("2025-01-10T09:35:00Z"),
  },

  {
    userId: "1",
    postId: 16,

    value: 1,
    createdAt: new Date("2025-01-05T14:40:00Z"),
  },
  {
    userId: "2",
    postId: 16,

    value: 1,
    createdAt: new Date("2025-01-05T14:45:00Z"),
  },

  {
    userId: "1",
    postId: 17,

    value: 1,
    createdAt: new Date("2024-12-30T11:35:00Z"),
  },
  {
    userId: "3",
    postId: 17,

    value: 1,
    createdAt: new Date("2024-12-30T11:40:00Z"),
  },

  {
    userId: "2",
    postId: 18,

    value: 1,
    createdAt: new Date("2024-12-25T17:50:00Z"),
  },
  {
    userId: "4",
    postId: 18,

    value: 1,
    createdAt: new Date("2024-12-25T17:55:00Z"),
  },

  {
    userId: "1",
    postId: 19,

    value: 1,
    createdAt: new Date("2024-12-20T13:20:00Z"),
  },
  {
    userId: "2",
    postId: 19,

    value: 1,
    createdAt: new Date("2024-12-20T13:25:00Z"),
  },

  {
    userId: "1",
    postId: 20,

    value: 1,
    createdAt: new Date("2024-12-15T10:15:00Z"),
  },
  {
    userId: "3",
    postId: 20,

    value: 1,
    createdAt: new Date("2024-12-15T10:20:00Z"),
  },
  {
    userId: "4",
    postId: 20,

    value: 1,
    createdAt: new Date("2024-12-15T10:25:00Z"),
  },
  {
    userId: "5",
    postId: 20,

    value: 1,
    createdAt: new Date("2024-12-15T10:30:00Z"),
  },
];

export const insertPostVotesData = async (db: NodePgDatabase<typeof schema>) => {
  console.log("Seeding post votes...");

  for (const vote of postVotesData) {
    await db.insert(votes).values({
      id: vote.id,
      userId: vote.userId,
      postId: vote.postId,
      commentId: null,
      value: vote.value,
      createdAt: vote.createdAt,
    });
  }

  console.log("Post votes seeded successfully!");
};
