import {
  boolean,
  index,
  integer,
  jsonb,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const pgTable = pgTableCreator((name) => `comeback_${name}`);

export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("email_verified", {
      mode: "date",
      precision: 3,
    }),
    image: varchar("image", { length: 255 }),
    createdAt: timestamp("created_at", {
      mode: "date",
      precision: 3,
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      precision: 3,
    })
      .defaultNow()
      .notNull(),
    username: varchar("username", { length: 255 }),
    bio: text("bio"),
  },
  (table) => [
    uniqueIndex("email_idx").on(table.email),
    uniqueIndex("username_idx").on(table.username),
  ]
);

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
  votes: many(votes),
}));

export const accounts = pgTable(
  "accounts",
  {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    idToken: text("id_token"),
    sessionState: varchar("session_state", { length: 255 }),
  },
  (table) => [
    uniqueIndex("provider_provider_account_id_key").on(
      table.provider,
      table.providerAccountId
    ),
    index("user_id_idx").on(table.userId),
  ]
);

export const sessions = pgTable(
  "sessions",
  {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    sessionToken: varchar("session_token", { length: 255 }).notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date", precision: 3 }).notNull(),
  },
  (table) => [
    uniqueIndex("session_token_key").on(table.sessionToken),
    index("user_id_idx").on(table.userId),
  ]
);

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date", precision: 3 }).notNull(),
  },
  (table) => [primaryKey({ columns: [table.identifier, table.token] })]
);

export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    authorId: varchar("author_id", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", {
      mode: "date",
      precision: 3,
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      precision: 3,
    })
      .defaultNow()
      .notNull(),
    imageUrl: varchar("image_url", { length: 255 }),
    tags: jsonb("tags").default([]),
    category: varchar("category", { length: 100 }),
    isPublished: boolean("is_published").default(true),
  },
  (table) => [
    index("author_id_idx").on(table.authorId),
    index("created_at_idx").on(table.createdAt),
  ]
);

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
  votes: many(votes),
  tags: many(postTags),
}));

export const comments = pgTable(
  "comments",
  {
    id: serial("id").primaryKey(),
    content: text("content").notNull(),
    postId: integer("post_id").notNull(),
    authorId: varchar("author_id", { length: 255 }).notNull(),
    parentId: integer("parent_id"),
    createdAt: timestamp("created_at", {
      mode: "date",
      precision: 3,
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      precision: 3,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("post_id_idx").on(table.postId),
    index("author_id_idx").on(table.authorId),
    index("parent_id_idx").on(table.parentId),
  ]
);

export const commentsRelations = relations(comments, ({ one, many }) => ({
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
  }),
  replies: many(comments, { relationName: "parent_child" }),
  votes: many(votes),
}));

export const votes = pgTable(
  "votes",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    postId: integer("post_id"),
    commentId: integer("comment_id"),
    value: integer("value").notNull(),
    createdAt: timestamp("created_at", {
      mode: "date",
      precision: 3,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("user_id_idx").on(table.userId),
    index("post_id_idx").on(table.postId),
    index("comment_id_idx").on(table.commentId),
    uniqueIndex("user_post_unique_idx").on(table.userId, table.postId),
    uniqueIndex("user_comment_unique_idx").on(table.userId, table.commentId),
  ]
);

export const votesRelations = relations(votes, ({ one }) => ({
  user: one(users, {
    fields: [votes.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [votes.postId],
    references: [posts.id],
  }),
  comment: one(comments, {
    fields: [votes.commentId],
    references: [comments.id],
  }),
}));

export const followers = pgTable(
  "followers",
  {
    id: serial("id").primaryKey(),
    followerId: varchar("follower_id", { length: 255 }).notNull(),
    followingId: varchar("following_id", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", {
      mode: "date",
      precision: 3,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("follower_id_idx").on(table.followerId),
    index("following_id_idx").on(table.followingId),
    uniqueIndex("unique_follow_idx").on(table.followerId, table.followingId),
  ]
);

export const tags = pgTable(
  "tags",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    createdAt: timestamp("created_at", {
      mode: "date",
      precision: 3,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [uniqueIndex("name_idx").on(table.name)]
);

export const tagsRelations = relations(tags, ({ many }) => ({
  posts: many(postTags),
}));

export const postTags = pgTable(
  "post_tags",
  {
    postId: integer("post_id").notNull(),
    tagId: integer("tag_id").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.postId, table.tagId] }),
    index("post_id_idx").on(table.postId),
    index("tag_id_idx").on(table.tagId),
  ]
);

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, {
    fields: [postTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id],
  }),
}));
