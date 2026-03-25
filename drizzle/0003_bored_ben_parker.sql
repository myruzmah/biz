CREATE TABLE `appointments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`leadId` int,
	`clientName` varchar(255) NOT NULL,
	`businessName` varchar(255),
	`phone` varchar(50),
	`email` varchar(320),
	`preferredDate` varchar(10) NOT NULL,
	`preferredTime` varchar(20) NOT NULL,
	`appointmentStatus` enum('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `join_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(255) NOT NULL,
	`roleInterest` varchar(255),
	`experience` text,
	`portfolioUrl` varchar(500),
	`phone` varchar(50),
	`email` varchar(320),
	`applicationStatus` enum('new','reviewed','interview','accepted','rejected') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `join_applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `systemise_leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ref` varchar(20) NOT NULL,
	`name` varchar(255) NOT NULL,
	`businessName` varchar(255),
	`phone` varchar(50),
	`email` varchar(320),
	`chosenPath` varchar(5),
	`serviceInterest` json,
	`businessType` varchar(255),
	`desiredOutcome` text,
	`freeTextNotes` text,
	`checkupData` json,
	`recommendedStep` varchar(50),
	`paymentStatus` enum('pending','claimed','verified','refunded') NOT NULL DEFAULT 'pending',
	`sysLeadStatus` enum('new','contacted','converted','archived') NOT NULL DEFAULT 'new',
	`appointmentId` int,
	`source` varchar(50) DEFAULT 'clarity_desk',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `systemise_leads_id` PRIMARY KEY(`id`),
	CONSTRAINT `systemise_leads_ref_unique` UNIQUE(`ref`)
);
