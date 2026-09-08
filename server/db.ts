import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

export async function ensureTablesExist() {
  let client;
  try {
    console.log('[DB] Connecting to database...');
    client = await pool.connect();
    console.log('[DB] Connected, checking/creating leads table...');
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        zip_code VARCHAR(20) NOT NULL,
        dog_name VARCHAR(255) NOT NULL,
        stranger_reaction VARCHAR(100),
        preferred_date VARCHAR(100),
        message TEXT,
        source VARCHAR(100) NOT NULL,
        medium VARCHAR(100) NOT NULL,
        campaign VARCHAR(255),
        landing_page TEXT,
        first_visit TIMESTAMP,
        utm_content VARCHAR(255),
        utm_term VARCHAR(255),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        synced_to_crm VARCHAR(50)
      );
    `);
    console.log('[DB] Database tables verified/created successfully');
  } catch (error) {
    console.error('[DB] Error ensuring tables exist:', error);
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}
