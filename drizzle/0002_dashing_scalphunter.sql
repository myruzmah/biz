CREATE TABLE `attendance` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`date` varchar(10) NOT NULL,
	`checkIn` timestamp,
	`checkOut` timestamp,
	`attendanceStatus` enum('present','absent','late','leave') NOT NULL DEFAULT 'present',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `attendance_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`userName` varchar(255),
	`action` varchar(100) NOT NULL,
	`resource` varchar(100),
	`resourceId` int,
	`details` text,
	`ipAddress` varchar(45),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `commissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`taskId` int NOT NULL,
	`taskRef` varchar(20) NOT NULL,
	`clientName` varchar(255),
	`service` varchar(100),
	`quotedPrice` decimal(12,2) NOT NULL,
	`institutionalAmount` decimal(12,2) NOT NULL,
	`commissionPool` decimal(12,2) NOT NULL,
	`tierBreakdown` json,
	`commissionStatus` enum('pending','approved','paid') NOT NULL DEFAULT 'pending',
	`approvedBy` int,
	`approvedAt` timestamp,
	`paidAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `commissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `weekly_reports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`department` varchar(50) NOT NULL,
	`weekStart` varchar(10) NOT NULL,
	`summary` text NOT NULL,
	`completedTasks` int DEFAULT 0,
	`pendingTasks` int DEFAULT 0,
	`blockers` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `weekly_reports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `leads` ADD `source` varchar(50) DEFAULT 'chat';--> statement-breakpoint
ALTER TABLE `leads` ADD `assignedDepartment` varchar(50);--> statement-breakpoint
ALTER TABLE `leads` ADD `assignedBy` int;--> statement-breakpoint
ALTER TABLE `leads` ADD `assignedAt` timestamp;--> statement-breakpoint
ALTER TABLE `tasks` ADD `department` varchar(50) DEFAULT 'bizdoc';--> statement-breakpoint
ALTER TABLE `tasks` ADD `quotedPrice` decimal(12,2);--> statement-breakpoint
ALTER TABLE `tasks` ADD `completedAt` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `hamzuryRole` enum('founder','ceo','cso','finance','hr','bizdev','department_staff') DEFAULT 'department_staff';--> statement-breakpoint
ALTER TABLE `users` ADD `department` varchar(50);--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(50);