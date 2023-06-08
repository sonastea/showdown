import {
  mysqlTable,
  uniqueIndex,
  index,
  int,
  varchar,
  datetime,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const meme = mysqlTable(
  "Meme",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    assetId: varchar("asset_id", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    url: varchar("url", { length: 191 }).notNull(),
  },
  (table) => {
    return {
      assetIdKey: uniqueIndex("Meme_asset_id_key").on(table.assetId),
      idIdx: index("Meme_id_idx").on(table.id),
    };
  }
);

export const vote = mysqlTable(
  "Vote",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    createdAt: datetime("createdAt", { mode: "string", fsp: 3 })
      .default(sql`(CURRENT_TIMESTAMP(3))`)
      .notNull(),
    votedForId: int("votedForId").notNull(),
  },
  (table) => {
    return {
      votedForIdIdx: index("Vote_votedForId_idx").on(table.votedForId),
    };
  }
);
