CREATE TABLE `exercise_groups` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`exercise_id` integer NOT NULL,
	`workout_id` integer NOT NULL,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`workout_id`) REFERENCES `workouts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `exercise_rows` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`exercise_group_id` integer NOT NULL,
	`is_lifted` integer NOT NULL,
	`reps` integer,
	`weight` integer,
	`time` integer,
	`distance` integer,
	`rpe` integer,
	FOREIGN KEY (`exercise_group_id`) REFERENCES `exercise_groups`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `exercises` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `workouts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`started_at` integer,
	`completed_at` integer
);
