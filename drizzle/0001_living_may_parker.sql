CREATE TABLE "comeback_accounts" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "comeback_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"post_id" integer NOT NULL,
	"author_id" varchar(255) NOT NULL,
	"parent_id" integer,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comeback_followers" (
	"id" serial PRIMARY KEY NOT NULL,
	"follower_id" varchar(255) NOT NULL,
	"following_id" varchar(255) NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comeback_post_tags" (
	"post_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "comeback_post_tags_post_id_tag_id_pk" PRIMARY KEY("post_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "comeback_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"author_id" varchar(255) NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"image_url" varchar(255),
	"tags" jsonb DEFAULT '[]'::jsonb,
	"category" varchar(100),
	"is_published" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "comeback_sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"session_token" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comeback_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comeback_users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp (3),
	"image" varchar(255),
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"username" varchar(255),
	"bio" text
);
--> statement-breakpoint
CREATE TABLE "comeback_verification_tokens" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp (3) NOT NULL,
	CONSTRAINT "comeback_verification_tokens_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE "comeback_votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"post_id" integer,
	"comment_id" integer,
	"value" integer NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "Meme" CASCADE;--> statement-breakpoint
DROP TABLE "Vote" CASCADE;--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_provider_account_id_key" ON "comeback_accounts" USING btree ("provider","provider_account_id");--> statement-breakpoint
CREATE INDEX "accounts_user_id_idx" ON "comeback_accounts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "comments_post_id_idx" ON "comeback_comments" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "comments_author_id_idx" ON "comeback_comments" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "comments_parent_id_idx" ON "comeback_comments" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "followers_follower_id_idx" ON "comeback_followers" USING btree ("follower_id");--> statement-breakpoint
CREATE INDEX "followers_following_id_idx" ON "comeback_followers" USING btree ("following_id");--> statement-breakpoint
CREATE UNIQUE INDEX "followers_unique_follow_idx" ON "comeback_followers" USING btree ("follower_id","following_id");--> statement-breakpoint
CREATE INDEX "post_tags_post_id_idx" ON "comeback_post_tags" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "post_tags_tag_id_idx" ON "comeback_post_tags" USING btree ("tag_id");--> statement-breakpoint
CREATE INDEX "posts_author_id_idx" ON "comeback_posts" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "posts_created_at_idx" ON "comeback_posts" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "sessions_token_key" ON "comeback_sessions" USING btree ("session_token");--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "comeback_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "tags_name_idx" ON "comeback_tags" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "comeback_users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "users_username_idx" ON "comeback_users" USING btree ("username");--> statement-breakpoint
CREATE INDEX "votes_user_id_idx" ON "comeback_votes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "votes_post_id_idx" ON "comeback_votes" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "votes_comment_id_idx" ON "comeback_votes" USING btree ("comment_id");--> statement-breakpoint
CREATE UNIQUE INDEX "votes_user_post_unique_idx" ON "comeback_votes" USING btree ("user_id","post_id");--> statement-breakpoint
CREATE UNIQUE INDEX "votes_user_comment_unique_idx" ON "comeback_votes" USING btree ("user_id","comment_id");