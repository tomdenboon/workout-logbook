DROP INDEX `measurement_points_date_key_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `measurement_points_measurement_id_date_key_unique` ON `measurement_points` (`measurement_id`,`date_key`);