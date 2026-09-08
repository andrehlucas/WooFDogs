import { leads, type InsertLead, type Lead } from "../shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  getLeadById(id: number): Promise<Lead | undefined>;
  updateLeadSyncStatus(id: number, crmType: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db
      .insert(leads)
      .values({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        zipCode: lead.zipCode,
        dogName: lead.dogName,
        strangerReaction: lead.strangerReaction || null,
        preferredDate: lead.preferredDate || null,
        message: lead.message || null,
        source: lead.source,
        medium: lead.medium,
        campaign: lead.campaign || null,
        landingPage: lead.landingPage || null,
        firstVisit: lead.firstVisit || null,
        utmContent: lead.utmContent || null,
        utmTerm: lead.utmTerm || null,
        syncedToCrm: null,
      })
      .returning();
    return newLead;
  }

  async getLeads(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLeadById(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead || undefined;
  }

  async updateLeadSyncStatus(id: number, crmType: string): Promise<void> {
    await db.update(leads).set({ syncedToCrm: crmType }).where(eq(leads.id, id));
  }
}

export const storage = new DatabaseStorage();
