import { NextRequest, NextResponse } from "next/server";
import { insertLeadSchema, leads } from "@/lib/schema";
import { getCRMService } from "@/lib/crmService";
import { getDb } from "@/lib/db";
import { ZodError } from "zod";
import { eq } from "drizzle-orm";

async function createLeadRecord(validatedData: Record<string, unknown>) {
  const db = getDb();
  if (!db) {
    throw new Error("Lead recovery database is unavailable.");
  }

  const [lead] = await db.insert(leads).values({
    ...validatedData,
    syncedToCrm: "pending",
  } as typeof leads.$inferInsert).returning();

  if (!lead) {
    throw new Error("Lead recovery record could not be created.");
  }

  return lead;
}

async function updateLeadSyncStatus(
  leadId: number,
  result: {
    status: "synced" | "fallback_sent" | "failed";
    attempts: number;
    crmRecordId?: string;
    failureReason?: string;
    fallbackEmailSent: boolean;
  },
) {
  const db = getDb();
  if (!db) {
    throw new Error("Lead recovery database is unavailable during sync update.");
  }

  await db
    .update(leads)
    .set({
      syncedToCrm: result.status,
      crmRecordId: result.crmRecordId || null,
      crmFailureReason: result.failureReason || null,
      crmSyncAttempts: result.attempts,
      crmLastAttemptAt: new Date(),
      crmFallbackEmailSentAt: result.fallbackEmailSent ? new Date() : null,
    })
    .where(eq(leads.id, leadId));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('[API] Received lead data:', JSON.stringify(body, null, 2));
    
    const validatedData = insertLeadSchema.parse(body);
    console.log('[API] Validation passed');
    
    // Persist first. A CRM outage must never be able to discard a completed form.
    const storedLead = await createLeadRecord(validatedData);
    console.log("[DB] Lead stored for recovery before CRM sync.", { leadId: storedLead.id });
    
    const crmService = getCRMService();
    const crmResult = await crmService.syncLead(validatedData);
    await updateLeadSyncStatus(storedLead.id, crmResult);

    if (crmResult.status === "synced") {
      console.log("[API] Lead synced to CRM successfully.", {
        leadId: storedLead.id,
        crmRecordId: crmResult.crmRecordId,
        attempts: crmResult.attempts,
      });
      return NextResponse.json({ 
        success: true, 
        message: 'Your request has been submitted successfully!' 
      }, { status: 201 });
    }

    console.warn("[API] CRM sync needs recovery.", {
      leadId: storedLead.id,
      attempts: crmResult.attempts,
      fallbackEmailSent: crmResult.fallbackEmailSent,
      reason: crmResult.failureReason,
    });
    return NextResponse.json({
      success: true,
      recoveryPending: true,
      recoveryEmailSent: crmResult.fallbackEmailSent,
      message: "We received your request and our team will follow up shortly.",
    }, { status: 202 });
    
  } catch (error) {
    console.error('[API] Lead submission error:', error);
    
    if (error instanceof ZodError) {
      const fieldErrors = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      console.error('[API] Validation errors:', fieldErrors);
      return NextResponse.json({ error: 'Please check your form inputs and try again.' }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Leads are managed through CRM. Access your CRM dashboard to view leads.' 
  });
}
