CREATE TABLE "comeback_chat_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comeback_user_profiles" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"username" varchar(255),
	"name" varchar(255),
	"image" varchar(255),
	"bio" text,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "chat_messages_user_id_idx" ON "comeback_chat_messages" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "chat_messages_created_at_idx" ON "comeback_chat_messages" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "username_idx" ON "comeback_user_profiles" USING btree ("username");--> statement-breakpoint
CREATE INDEX "user_profiles_user_id_idx" ON "comeback_user_profiles" USING btree ("user_id");