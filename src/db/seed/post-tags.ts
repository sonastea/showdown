import { postTags } from "@/db/schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "@/db/schema";

type PostTagData = {
  id?: number;
  postId: number;
  tagId: number;
};

export const postTagsData: PostTagData[] = [
  // Post 1: TWICE's "The Feels" Reaches 300 Million Views!
  { postId: 1, tagId: 1 }, // TWICE
  { postId: 1, tagId: 19 }, // TheFeels
  { postId: 1, tagId: 11 }, // MusicVideo

  // Post 2: Unpopular Opinion: 4th Gen Stage Presence
  { postId: 2, tagId: 15 }, // 4thGen
  { postId: 2, tagId: 13 }, // Discussion
  { postId: 2, tagId: 17 }, // StageTalk

  // Post 3: My first BLACKPINK concert experience!
  { postId: 3, tagId: 2 }, // BLACKPINK
  { postId: 3, tagId: 12 }, // Concert
  { postId: 3, tagId: 18 }, // Experience

  // Post 4: NewJeans breaks another record with "OMG"
  { postId: 4, tagId: 4 }, // NewJeans
  { postId: 4, tagId: 14 }, // News
  { postId: 4, tagId: 15 }, // 4thGen

  // Post 5: Red Velvet's "Feel My Rhythm" is a masterpiece
  { postId: 5, tagId: 6 }, // RedVelvet
  { postId: 5, tagId: 16 }, // 3rdGen

  // Post 6: BTS Jin's military discharge countdown begins!
  { postId: 6, tagId: 3 }, // BTS
  { postId: 6, tagId: 14 }, // News

  // Post 7: ITZY's new concept photos for comeback
  { postId: 7, tagId: 8 }, // ITZY
  { postId: 7, tagId: 20 }, // Comeback

  // Post 8: Stray Kids world tour announcement!
  { postId: 8, tagId: 9 }, // StrayKids
  { postId: 8, tagId: 14 }, // News
  { postId: 8, tagId: 12 }, // Concert

  // Post 9: aespa's AI concept: Innovative or gimmicky?
  { postId: 9, tagId: 5 }, // aespa
  { postId: 9, tagId: 13 }, // Discussion

  // Post 10: SEVENTEEN's choreography evolution
  { postId: 10, tagId: 10 }, // SEVENTEEN
  { postId: 10, tagId: 17 }, // StageTalk

  // Post 11: IVE "I AM" dance practice hits 100M views
  { postId: 11, tagId: 7 }, // IVE
  { postId: 11, tagId: 14 }, // News

  // Post 12: K-pop songs that got you through tough times?
  { postId: 12, tagId: 3 }, // BTS
  { postId: 12, tagId: 1 }, // TWICE
  { postId: 12, tagId: 13 }, // Discussion

  // Post 13: Favorite B-sides that deserved to be title tracks?
  { postId: 13, tagId: 6 }, // RedVelvet
  { postId: 13, tagId: 1 }, // TWICE
  { postId: 13, tagId: 13 }, // Discussion

  // Post 14: NewJeans' impact on the fashion industry
  { postId: 14, tagId: 4 }, // NewJeans
  { postId: 14, tagId: 13 }, // Discussion

  // Post 15: TWICE Nayeon's solo comeback rumors
  { postId: 15, tagId: 1 }, // TWICE
  { postId: 15, tagId: 14 }, // News

  // Post 16: BLACKPINK Rosé's collaboration with IU?
  { postId: 16, tagId: 2 }, // BLACKPINK
  { postId: 16, tagId: 14 }, // News

  // Post 17: K-pop groups with the best discography consistency
  { postId: 17, tagId: 6 }, // RedVelvet
  { postId: 17, tagId: 13 }, // Discussion

  // Post 18: Stray Kids' rap line appreciation post
  { postId: 18, tagId: 9 }, // StrayKids

  // Post 19: aespa's "Supernova" live stages are incredible
  { postId: 19, tagId: 5 }, // aespa
  { postId: 19, tagId: 17 }, // StageTalk

  // Post 20: HYBE's new girl group debut announcement
  { postId: 20, tagId: 4 }, // NewJeans (mentioned in content)
  { postId: 20, tagId: 14 }, // News
];

export const insertPostTagsData = async (db: NodePgDatabase<typeof schema>) => {
  console.log("Seeding post tags...");

  for (const postTag of postTagsData) {
    await db.insert(postTags).values(postTag);
  }

  console.log("Post tags seeded successfully!");
};
