import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { meme, vote } from "drizzle/schema";

const planetscaleClient = new Client({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
});

export type Meme = typeof meme.$inferInsert;
export type Vote = typeof vote.$inferInsert;

export const db = drizzle(planetscaleClient);
