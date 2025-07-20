CREATE TABLE `exercise_groups` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`exercise_id` integer NOT NULL,
	`workout_id` integer NOT NULL,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`workout_id`) REFERENCES `workouts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `exercise_id_index` ON `exercise_groups` (`exercise_id`);--> statement-breakpoint
CREATE INDEX `workout_id_index` ON `exercise_groups` (`workout_id`);--> statement-breakpoint
CREATE TABLE `exercise_rows` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`exercise_group_id` integer NOT NULL,
	`is_lifted` integer NOT NULL,
	`reps` real,
	`weight` real,
	`time` real,
	`distance` real,
	`rpe` real,
	FOREIGN KEY (`exercise_group_id`) REFERENCES `exercise_groups`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `exercise_group_id_index` ON `exercise_rows` (`exercise_group_id`);--> statement-breakpoint
CREATE TABLE `exercises` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `measurement_points` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`measurement_id` integer NOT NULL,
	`date` integer NOT NULL,
	`date_key` text NOT NULL,
	`value` real NOT NULL,
	FOREIGN KEY (`measurement_id`) REFERENCES `measurements`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `measurement_points_date_key_unique` ON `measurement_points` (`date_key`);--> statement-breakpoint
CREATE TABLE `measurements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `settings_key_unique` ON `settings` (`key`);--> statement-breakpoint
CREATE TABLE `template_folders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `workouts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`started_at` integer,
	`completed_at` integer,
	`template_folder_id` integer,
	`photo` text,
	`note` text,
	FOREIGN KEY (`template_folder_id`) REFERENCES `template_folders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `started_at_index` ON `workouts` (`started_at`);--> statement-breakpoint
CREATE INDEX `completed_at_index` ON `workouts` (`completed_at`);