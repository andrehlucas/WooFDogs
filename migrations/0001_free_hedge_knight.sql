ALTER TABLE "leads" ADD COLUMN "crm_record_id" varchar(100);--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "crm_failure_reason" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "crm_sync_attempts" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "crm_last_attempt_at" timestamp;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "crm_fallback_email_sent_at" timestamp;