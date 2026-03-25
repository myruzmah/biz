CREATE TABLE `cohort_modules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cohortId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`weekNumber` int NOT NULL DEFAULT 1,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `cohort_modules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cohorts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`program` enum('skills_intensive','executive','it_internship','ai_course') NOT NULL,
	`pathway` enum('virtual','physical','ridi_scholarship') NOT NULL DEFAULT 'virtual',
	`description` text,
	`startDate` varchar(10) NOT NULL,
	`endDate` varchar(10) NOT NULL,
	`enrollDeadline` varchar(10),
	`maxSeats` int NOT NULL DEFAULT 30,
	`enrolledCount` int NOT NULL DEFAULT 0,
	`earlyBirdPrice` decimal(12,2),
	`standardPrice` decimal(12,2),
	`cohortStatus` enum('draft','enrolling','in_progress','completed','cancelled') NOT NULL DEFAULT 'draft',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cohorts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `live_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cohortId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`sessionDate` varchar(10) NOT NULL,
	`sessionTime` varchar(20) NOT NULL,
	`meetingUrl` text,
	`sessionType` enum('live_qa','peer_review','workshop','guest_speaker') NOT NULL DEFAULT 'live_qa',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `live_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `skills_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ref` varchar(30) NOT NULL,
	`cohortId` int,
	`program` varchar(100) NOT NULL,
	`pathway` varchar(50),
	`businessDescription` text,
	`biggestChallenge` text,
	`heardFrom` varchar(100),
	`canCommitTime` boolean DEFAULT false,
	`hasEquipment` boolean DEFAULT false,
	`willingToExecute` boolean DEFAULT false,
	`fullName` varchar(255) NOT NULL,
	`phone` varchar(50),
	`email` varchar(320),
	`pricingTier` varchar(20) DEFAULT 'early_bird',
	`agreedToTerms` boolean DEFAULT false,
	`agreedToEffort` boolean DEFAULT false,
	`appStatus` enum('submitted','under_review','accepted','waitlisted','rejected') NOT NULL DEFAULT 'submitted',
	`reviewedBy` int,
	`reviewNotes` text,
	`appPaymentStatus` enum('pending','paid','waived','refunded') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `skills_applications_id` PRIMARY KEY(`id`),
	CONSTRAINT `skills_applications_ref_unique` UNIQUE(`ref`)
);
--> statement-breakpoint
CREATE TABLE `student_assignments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`applicationId` int NOT NULL,
	`moduleId` int,
	`title` varchar(255) NOT NULL,
	`description` text,
	`dueDate` varchar(10),
	`assignmentStatus` enum('pending','submitted','graded') NOT NULL DEFAULT 'pending',
	`submittedAt` timestamp,
	`grade` varchar(10),
	`feedback` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `student_assignments_id` PRIMARY KEY(`id`)
);
