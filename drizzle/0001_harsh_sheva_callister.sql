CREATE TABLE `activity_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`taskId` int,
	`leadId` int,
	`userId` int,
	`action` varchar(100) NOT NULL,
	`details` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activity_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `checklist_templates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`phase` enum('pre','during','post') NOT NULL,
	`label` varchar(500) NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `checklist_templates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`taskId` int NOT NULL,
	`fileName` varchar(500) NOT NULL,
	`fileKey` varchar(1000) NOT NULL,
	`fileUrl` text NOT NULL,
	`mimeType` varchar(100),
	`fileSize` int,
	`uploadedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ref` varchar(20) NOT NULL,
	`name` varchar(255) NOT NULL,
	`businessName` varchar(255),
	`phone` varchar(50),
	`email` varchar(320),
	`service` varchar(100) NOT NULL,
	`context` text,
	`leadStatus` enum('new','contacted','converted','archived') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`),
	CONSTRAINT `leads_ref_unique` UNIQUE(`ref`)
);
--> statement-breakpoint
CREATE TABLE `task_checklist_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`taskId` int NOT NULL,
	`templateId` int,
	`itemPhase` enum('pre','during','post') NOT NULL,
	`label` varchar(500) NOT NULL,
	`checked` boolean NOT NULL DEFAULT false,
	`sortOrder` int NOT NULL DEFAULT 0,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `task_checklist_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ref` varchar(20) NOT NULL,
	`leadId` int,
	`clientName` varchar(255) NOT NULL,
	`businessName` varchar(255),
	`phone` varchar(50),
	`service` varchar(100) NOT NULL,
	`taskStatus` enum('Not Started','In Progress','Waiting on Client','Submitted','Completed') NOT NULL DEFAULT 'Not Started',
	`notes` text,
	`assignedTo` int,
	`deadline` varchar(20),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`),
	CONSTRAINT `tasks_ref_unique` UNIQUE(`ref`)
);
