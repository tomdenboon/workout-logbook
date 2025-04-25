CREATE INDEX `exercise_id_index` ON `exercise_groups` (`exercise_id`);--> statement-breakpoint
CREATE INDEX `workout_id_index` ON `exercise_groups` (`workout_id`);--> statement-breakpoint
CREATE INDEX `exercise_group_id_index` ON `exercise_rows` (`exercise_group_id`);--> statement-breakpoint
ALTER TABLE `measurement_points` DROP COLUMN `name`;