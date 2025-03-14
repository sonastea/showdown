import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (typeof connectionString !== "string") {
  throw new Error(
    "DATABASE_URL environment variable is not defined or the string is wrong.",
  );
}

export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);
