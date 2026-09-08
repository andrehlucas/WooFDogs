import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { z } from "zod";

export * from "./blogTypes";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  zipCode: varchar("zip_code", { length: 20 }).notNull(),
  dogName: varchar("dog_name", { length: 255 }).notNull(),
  strangerReaction: varchar("stranger_reaction", { length: 100 }),
  preferredDate: varchar("preferred_date", { length: 100 }),
  message: text("message"),
  source: varchar("source", { length: 100 }).notNull(),
  medium: varchar("medium", { length: 100 }).notNull(),
  campaign: varchar("campaign", { length: 255 }),
  landingPage: text("landing_page"),
  firstVisit: timestamp("first_visit"),
  utmContent: varchar("utm_content", { length: 255 }),
  utmTerm: varchar("utm_term", { length: 255 }),
  gclid: varchar("gclid", { length: 255 }),
  wbraid: varchar("wbraid", { length: 255 }),
  gbraid: varchar("gbraid", { length: 255 }),
  msclkid: varchar("msclkid", { length: 255 }),
  submittedFrom: text("submitted_from"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  syncedToCrm: varchar("synced_to_crm", { length: 50 }),
  crmRecordId: varchar("crm_record_id", { length: 100 }),
  crmFailureReason: text("crm_failure_reason"),
  crmSyncAttempts: integer("crm_sync_attempts").notNull().default(0),
  crmLastAttemptAt: timestamp("crm_last_attempt_at"),
  crmFallbackEmailSentAt: timestamp("crm_fallback_email_sent_at"),
});

export const insertLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  dogName: z.string().min(1, "Dog name is required"),
  strangerReaction: z.string().nullable().optional(),
  preferredDate: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  source: z.string().min(1, "Source is required"),
  medium: z.string().min(1, "Medium is required"),
  campaign: z.string().nullable().optional(),
  landingPage: z.string().nullable().optional(),
  firstVisit: z.coerce.date().nullable().optional(),
  utmContent: z.string().nullable().optional(),
  utmTerm: z.string().nullable().optional(),
  gclid: z.string().max(255).nullable().optional(),
  wbraid: z.string().max(255).nullable().optional(),
  gbraid: z.string().max(255).nullable().optional(),
  msclkid: z.string().max(255).nullable().optional(),
  submittedFrom: z.string().nullable().optional(),
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
