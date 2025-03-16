import { db } from "@/lib/drizzle";

import { insertUsersData } from "./seed/users";
import { insertTagsData } from "./seed/tags";
import { insertPostsData } from "./seed/posts";
import { insertPostTagsData } from "./seed/post-tags";
import { insertCommentsData } from "./seed/comments";
import { insertPostVotesData } from "./seed/post-votes";
import { insertCommentVotesData } from "./seed/comment-votes";

const seed = async () => {
  try {
    console.log("Starting database seeding...");

    await insertUsersData(db);
    await insertTagsData(db);
    await insertPostsData(db);
    await insertPostTagsData(db);
    await insertCommentsData(db);
    await insertPostVotesData(db);
    await insertCommentVotesData(db);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

seed();
