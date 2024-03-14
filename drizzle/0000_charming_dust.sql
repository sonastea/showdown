CREATE TABLE IF NOT EXISTS "Meme" (
	"id" serial PRIMARY KEY NOT NULL,
	"asset_id" varchar(191) NOT NULL,
	"name" varchar(191) NOT NULL,
	"url" varchar(191) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Vote" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) with time zone DEFAULT now(),
	"votedForId" serial NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "asset_id_key" ON "Meme" ("asset_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "id_idx" ON "Meme" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "votedForId_idx" ON "Vote" ("votedForId");