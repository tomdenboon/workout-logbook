CREATE TABLE `measurement_points` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`measurement_id` integer NOT NULL,
	`name` text NOT NULL,
	`date` integer NOT NULL,
	`value` real NOT NULL,
	FOREIGN KEY (`measurement_id`) REFERENCES `measurements`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `measurements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `template_folders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_exercise_rows` (
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
INSERT INTO `__new_exercise_rows`("id", "exercise_group_id", "is_lifted", "reps", "weight", "time", "distance", "rpe") SELECT "id", "exercise_group_id", "is_lifted", "reps", "weight", "time", "distance", "rpe" FROM `exercise_rows`;--> statement-breakpoint
DROP TABLE `exercise_rows`;--> statement-breakpoint
ALTER TABLE `__new_exercise_rows` RENAME TO `exercise_rows`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `workouts` ADD `template_folder_id` integer REFERENCES template_folders(id);