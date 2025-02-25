CREATE TABLE `file` (
	`id_file` text(36) PRIMARY KEY NOT NULL,
	`id_folder` text(36),
	`file_name` text NOT NULL,
	`url` text NOT NULL,
	`aws_key` text NOT NULL,
	FOREIGN KEY (`id_folder`) REFERENCES `folder`(`id_folder`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `id_folder_idx` ON `file` (`id_folder`);--> statement-breakpoint
CREATE INDEX `file_name_idx` ON `file` (`file_name`);--> statement-breakpoint
CREATE TABLE `folder` (
	`id_folder` text(36) PRIMARY KEY NOT NULL,
	`id_parent` text(36) NOT NULL,
	`id_user` text(36) NOT NULL,
	`folder_name` text NOT NULL,
	FOREIGN KEY (`id_parent`) REFERENCES `folder`(`id_folder`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `id_parent_idx` ON `folder` (`id_parent`);--> statement-breakpoint
CREATE INDEX `folder_name_idx` ON `folder` (`folder_name`);--> statement-breakpoint
CREATE TABLE `user` (
	`id_user` text(36) PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password` text(60) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `user` (`email`);