-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Meme` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`asset_id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`url` varchar(191) NOT NULL);

CREATE TABLE `Vote` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP(3)),
	`votedForId` int NOT NULL);

CREATE TABLE `_prisma_migrations` (
	`id` varchar(36) PRIMARY KEY NOT NULL,
	`checksum` varchar(64) NOT NULL,
	`finished_at` datetime(3),
	`migration_name` varchar(255) NOT NULL,
	`logs` text,
	`rolled_back_at` datetime(3),
	`started_at` datetime(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP(3)),
	`applied_steps_count` int unsigned NOT NULL DEFAULT 0);

CREATE UNIQUE INDEX `Meme_asset_id_key` ON `Meme` (`asset_id`);
CREATE INDEX `Meme_id_idx` ON `Meme` (`id`);
CREATE INDEX `Vote_votedForId_idx` ON `Vote` (`votedForId`);
*/