import { sql } from "drizzle-orm";
import {
  index,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const meme = pgTable(
  "Meme",
  {
    id: serial("id").primaryKey(),
    assetId: varchar("asset_id", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    url: varchar("url", { length: 191 }).notNull(),
  },
  (table) => {
    return {
      assetIdKey: uniqueIndex("asset_id_key").on(table.assetId),
      idIdx: index("id_idx").on(table.id),
    };
  },
);

export const vote = pgTable(
  "Vote",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    createdAt: timestamp("createdAt", {
      mode: "string",
      precision: 3,
      withTimezone: true,
    }).default(sql`now()`),
    votedForId: serial("votedForId").notNull(),
  },
  (table) => {
    return {
      votedForIdIdx: index("votedForId_idx").on(table.votedForId),
    };
  },
);
