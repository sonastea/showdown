import { drizzle } from "drizzle-orm/postgres-js";
import { meme, vote } from "drizzle/schema";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (typeof connectionString !== "string") {
  throw new Error(
    "DATABASE_URL environment variable is not defined or the string is wrong.",
  );
}

export type Meme = typeof meme.$inferInsert;
export type Vote = typeof vote.$inferInsert;

export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);
