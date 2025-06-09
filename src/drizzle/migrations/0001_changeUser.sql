ALTER TABLE `user` ADD `isActive` tinyint DEFAULT 1;--> statement-breakpoint
ALTER TABLE `user` ADD `isVerified` tinyint DEFAULT 0;--> statement-breakpoint
ALTER TABLE `user` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `user` ADD `updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;