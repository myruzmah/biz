# BizDoc Consult - Project TODO

- [x] Global theming: BizDoc brand colors (dark #0A1F1C, milk #F8F5F0, gold #C9A97E, charcoal #2C2C2C), Inter font
- [x] Database schema: leads, tasks, checklist_templates, task_checklist_items, activity_logs, documents
- [x] Public landing page: hero section, services showcase, process timeline, footer
- [x] Navigation: public nav with brand logo, staff access button, dashboard exit
- [x] AI chat widget: conversational intake flow for lead capture on public page
- [x] Lead capture: save to database with unique BZ-2026-XXXX reference numbers
- [x] Automatic task creation: new lead → new task with default SOP checklist
- [x] Staff authentication: Manus OAuth login for staff, protected dashboard routes
- [x] Staff dashboard: active task queue sidebar, task detail view
- [x] Task status management: Not Started, In Progress, Waiting on Client, Submitted, Completed
- [x] SOP execution checklist: Pre-Task, Execution, Post-Task phases with toggle items
- [x] Task notes editing: editable notes field persisted to database
- [x] Public reference tracking: client enters BZ-2026-XXXX, sees real status from database
- [x] WhatsApp messaging integration: automated notifications for file creation, status updates, document pickup
- [x] Staff document upload: attach client documents to tasks with S3 cloud storage
- [x] AI compliance assistant: answers Nigerian compliance questions, suggests next steps, drafts communications
- [x] Mobile responsive: dashboard usable on mobile/tablet
- [x] Loading, empty, and error states throughout the app
- [x] Vitest tests for core backend procedures (35 tests passing)

## HAMZURY Institutional Operating System Upgrade

- [x] HAMZURY main hub page (/) with department portals and staff role navigation
- [x] Extended database schema: assignments, commissions, attendance, audit_logs, departments, weekly_reports
- [x] Commission logic utility (40/60 split, 5 tiers) hardcoded in utils
- [x] RBAC middleware: Founder, CEO, CSO, BizDev, Finance, HR, Department Staff roles
- [x] CSO Dashboard: lead pipeline, assignment panel, department update log, attendance
- [x] Finance Dashboard: commission calculator with live preview, payout management, institutional allocation
- [x] Federal Hub: CEO/Founder/HR/BizDev combined oversight dashboard with overview, staff management, audit log, reports
- [x] BizDoc refactored as department portal under /bizdoc/* route
- [x] Department portal task queue receives assignments from CSO
- [x] Audit logging for sensitive actions (commission creation, lead assignment, role changes)
- [x] Weekly reports submission and history
- [x] Staff directory with role and department management
- [x] Vitest tests for HAMZURY institutional features (66 total tests passing)

## Systemise Department Portal

- [x] Extend database schema for Systemise (checkup_data JSON, appointments table, join_us_applications table, payment_status on leads)
- [x] Systemise public portal page (/systemise) with deep blue branding, hero, services grid, why we exist, how we work
- [x] Systemise Clarity Desk chat drawer with Path A (know what I need), Path B (explain directly), Path C (8-area checkup), Path D (schedule call)
- [x] Systemise FAQs flow in chat
- [x] Systemise Track flow in chat (reference lookup with HZ-XXXX format)
- [x] Systemise Join Us recruitment flow in chat
- [x] Systemise 8-area business diagnostic checkup with halfway bailout
- [x] Growth Positioning Report payment flow (₦5,000)
- [x] Systemise contact collection and lead persistence to database
- [x] Systemise service card → direct chat bridge
- [x] App.tsx routing for /systemise
- [x] Backend routes for Systemise leads, appointments, and applications
- [x] Tests for Systemise features (79 total tests passing across 4 files)

## Skills Department Portal

- [x] Extend database schema for Skills (skills_applications, cohorts, cohort_modules, student_assignments, live_sessions)
- [x] Skills public portal page (/skills) with gold/yellow branding, hero, launch spotlight, core programs, AI courses
- [x] RIDI Partnership section on Skills portal
- [x] Calendar page with upcoming events and deadlines
- [x] Multi-step Apply Flow (Program → Context → Commitment → Payment → Confirmation with ref code)
- [x] Student Portal dashboard with modules, assignments tracker, live sessions, cohort network, business wins
- [x] Admin Portal dashboard with stats, cohort management, today's priorities, application review
- [x] Backend routes for Skills applications, cohorts, and student management
- [x] App.tsx routing for /skills, /skills/student, /skills/admin
- [x] Update HAMZURY hub to activate Skills department card
- [x] Tests for Skills features (91 total tests passing across 5 files)
