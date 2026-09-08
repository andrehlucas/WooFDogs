import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { leads } from "@/lib/schema";
import { desc, eq, gte, lte, sql, and, or } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    if (!db) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const recoveryOnly = searchParams.get("recovery") === "true";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = (page - 1) * limit;

    const conditions = [];
    if (from) {
      conditions.push(gte(leads.createdAt, new Date(from)));
    }
    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      conditions.push(lte(leads.createdAt, toDate));
    }
    if (recoveryOnly) {
      conditions.push(
        or(
          eq(leads.syncedToCrm, "pending"),
          eq(leads.syncedToCrm, "fallback_sent"),
          eq(leads.syncedToCrm, "failed"),
        ),
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [submissions, countResult, dailyCounts, recoveryCountResult] = await Promise.all([
      db
        .select()
        .from(leads)
        .where(whereClause)
        .orderBy(desc(leads.createdAt))
        .limit(limit)
        .offset(offset),

      db
        .select({ count: sql<number>`count(*)::int` })
        .from(leads)
        .where(whereClause),

      db
        .select({
          date: sql<string>`DATE(created_at)::text`,
          count: sql<number>`count(*)::int`,
        })
        .from(leads)
        .where(whereClause)
        .groupBy(sql`DATE(created_at)`)
        .orderBy(desc(sql`DATE(created_at)`))
        .limit(30),

      db
        .select({ count: sql<number>`count(*)::int` })
        .from(leads)
        .where(
          or(
            eq(leads.syncedToCrm, "pending"),
            eq(leads.syncedToCrm, "fallback_sent"),
            eq(leads.syncedToCrm, "failed"),
          ),
        ),
    ]);

    const total = countResult[0]?.count || 0;

    return NextResponse.json({
      submissions,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      dailyCounts,
      recoveryCount: recoveryCountResult[0]?.count || 0,
    });
  } catch (error) {
    console.error("[Admin API] Error fetching leads:", error);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}
