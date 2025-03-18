import { sql } from "drizzle-orm";
import {
  index,
  pgSchema,
  pgTable,
  pgTableCreator,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Create table creator for comeback prefixed tables
const comebackTable = pgTableCreator((name) => `comeback_${name}`);

// Define the auth schema for Supabase
const authSchema = pgSchema("auth");

// Reference Supabase's existing auth.users table
export const users = authSchema.table("users", {
  id: uuid("id").primaryKey().notNull(),
  email: varchar("email", { length: 255 }),
  // Include other fields you need to reference from Supabase auth
  created_at: timestamp("created_at", { mode: "date", precision: 3 }),
  updated_at: timestamp("updated_at", { mode: "date", precision: 3 }),
});

// User profiles table to store additional user information
export const userProfiles = comebackTable(
  "user_profiles",
  {
    userId: uuid("user_id").primaryKey().notNull(),
    username: varchar("username", { length: 255 }),
    name: varchar("name", { length: 255 }),
    image: varchar("image", { length: 255 }),
    bio: text("bio"),
    createdAt: timestamp("created_at", { mode: "date", precision: 3 })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("username_idx").on(table.username),
    index("user_profiles_user_id_idx").on(table.userId),
  ]
);

// Chat messages table
export const chatMessages = comebackTable(
  "chat_messages",
  {
    id: serial("id").primaryKey(),
    content: text("content").notNull(),
    userId: uuid("user_id").notNull(),
    createdAt: timestamp("created_at", { mode: "date", precision: 3 })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("chat_messages_user_id_idx").on(table.userId),
    index("chat_messages_created_at_idx").on(table.createdAt),
  ]
);

// Original Meme table from migration
export const meme = pgTable(
  "Meme",
  {
    id: serial("id").primaryKey(),
    assetId: varchar("asset_id", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    url: varchar("url", { length: 191 }).notNull(),
  },
  (table) => [
    uniqueIndex("asset_id_key").on(table.assetId),
    index("id_idx").on(table.id),
  ]
);

// Original Vote table from migration
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
  (table) => [index("votedForId_idx").on(table.votedForId)]
);

// Relations
export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  user: one(users, {
    fields: [chatMessages.userId],
    references: [users.id],
  }),
}));

export const memeRelations = relations(meme, ({ many }) => ({
  votes: many(vote),
}));

export const voteRelations = relations(vote, ({ one }) => ({
  meme: one(meme, {
    fields: [vote.votedForId],
    references: [meme.id],
  }),
}));
