CREATE TABLE `exercise` (
	`id` text(24) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`has_repetitions` integer DEFAULT false NOT NULL,
	`has_weight` integer DEFAULT false NOT NULL,
	`has_time` integer DEFAULT false NOT NULL,
	`has_distance` integer DEFAULT false NOT NULL,
	`muscle` text,
	`is_cardio` integer DEFAULT false NOT NULL,
	`is_machine` integer DEFAULT false NOT NULL,
	`is_dumbbell` integer DEFAULT false NOT NULL,
	`is_barbell` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `exercise_name_unique` ON `exercise` (`name`);--> statement-breakpoint
CREATE TABLE `workout_set` (
	`id` text(24) PRIMARY KEY NOT NULL,
	`repetitions` integer,
	`weight` real,
	`time` text,
	`distance` real,
	`notes` text,
	`executed_at` integer NOT NULL,
	`exercise_id` text(24) NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "positive_repetitions" CHECK("workout_set"."repetitions" > 0),
	CONSTRAINT "positive_distance" CHECK("workout_set"."distance" >= 0),
	CONSTRAINT "positive_weight" CHECK("workout_set"."weight" >= 0),
	CONSTRAINT "time_format" CHECK("workout_set"."time" IS strftime('%H:%M:%S', time))
);
