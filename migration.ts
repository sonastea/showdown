import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const dbMigration = async () => {
  const connectionString = process.env.DATABASE_URL;

  if (typeof connectionString !== "string") {
    throw new Error(
      "DATABASE_URL environment variable is wrong or not defined.",
    );
  }

  const sql = postgres(connectionString, {
    max: 1,
    onnotice: (notice) => {
      if (notice.message.includes("already exists, exists")) return;
    },
  });

  const db = drizzle(sql);

  await migrate(db, { migrationsFolder: "drizzle" });

  await sql.end();
};

void dbMigration();
