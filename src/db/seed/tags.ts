import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "@/db/schema";
import { tags } from "../schema";

export const tagsData = [
  { id: 1, name: "TWICE" },
  { id: 2, name: "BLACKPINK" },
  { id: 3, name: "BTS" },
  { id: 4, name: "NewJeans" },
  { id: 5, name: "aespa" },
  { id: 6, name: "RedVelvet" },
  { id: 7, name: "IVE" },
  { id: 8, name: "ITZY" },
  { id: 9, name: "StrayKids" },
  { id: 10, name: "SEVENTEEN" },
  { id: 11, name: "MusicVideo" },
  { id: 12, name: "Concert" },
  { id: 13, name: "Discussion" },
  { id: 14, name: "News" },
  { id: 15, name: "4thGen" },
  { id: 16, name: "3rdGen" },
  { id: 17, name: "StageTalk" },
  { id: 18, name: "Experience" },
  { id: 19, name: "TheFeels" },
  { id: 20, name: "Comeback" },
];

export const insertTagsData = async (db: NodePgDatabase<typeof schema>) => {
  console.log("Seeding tags...");

  for (const tag of tagsData) {
    await db.insert(tags).values(tag).onConflictDoNothing();
  }

  console.log("Tags seeded successfully!");
};
