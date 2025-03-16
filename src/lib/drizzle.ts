import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "../../drizzle/schema";

const connectionString = process.env.DATABASE_URL;

if (typeof connectionString !== "string") {
  throw new Error(
    "DATABASE_URL environment variable is not defined or the string is wrong."
  );
}

const pool = new Pool({ connectionString });
export const db = drizzle({ client: pool, schema });
export * from "../../drizzle/schema";
