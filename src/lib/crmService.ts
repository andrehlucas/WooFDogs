import type { InsertLead } from "./schema";
import { sendFallbackEmail } from "./emailFallbackService";

export interface CRMConfig {
  type: 'hubspot' | 'perfex' | 'none';
  apiKey?: string;
  baseUrl?: string;
}

export type CrmSyncStatus = "synced" | "fallback_sent" | "failed";

export interface CrmSyncResult {
  status: CrmSyncStatus;
  attempts: number;
  crmRecordId?: string;
  failureReason?: string;
  fallbackEmailSent: boolean;
}

export interface CRMService {
  syncLead(lead: InsertLead): Promise<CrmSyncResult>;
}

const MAX_SYNC_ATTEMPTS = 3;
const RETRY_DELAYS_MS = [250, 750];
const CRM_REQUEST_TIMEOUT_MS = 30_000;
const FALLBACK_EMAIL_TIMEOUT_MS = 3_000;

type AttemptResult = {
  success: boolean;
  retryable: boolean;
  crmRecordId?: string;
  failureReason?: string;
};

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function truncateReason(value: unknown) {
  const message = typeof value === "string" ? value : "CRM returned an unrecognized error.";
  return message.replace(/\s+/g, " ").trim().slice(0, 500);
}

class ExternalServiceTimeoutError extends Error {
  constructor(service: string, timeoutMs: number) {
    super(`${service} timed out after ${timeoutMs}ms.`);
    this.name = "ExternalServiceTimeoutError";
  }
}

function isTimeoutError(error: unknown) {
  return error instanceof ExternalServiceTimeoutError ||
    (error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError"));
}

async function fetchJsonWithTimeout<T>(
  input: string,
  init: RequestInit,
  service: string,
): Promise<{ response: Response; payload: T | null }> {
  const controller = new AbortController();
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const request = (async () => {
    const response = await fetch(input, { ...init, signal: controller.signal });
    const payload = await response.json().catch(() => null) as T | null;
    return { response, payload };
  })();
  const deadline = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => {
      controller.abort();
      reject(new ExternalServiceTimeoutError(service, CRM_REQUEST_TIMEOUT_MS));
    }, CRM_REQUEST_TIMEOUT_MS);
  });

  try {
    return await Promise.race([request, deadline]);
  } catch (error) {
    if (controller.signal.aborted || isTimeoutError(error)) {
      throw new ExternalServiceTimeoutError(service, CRM_REQUEST_TIMEOUT_MS);
    }
    throw error;
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

async function waitForFallbackEmail(lead: InsertLead) {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      sendFallbackEmail(lead),
      new Promise<never>((_, reject) => {
        timeout = setTimeout(
          () => reject(new ExternalServiceTimeoutError("Recovery email", FALLBACK_EMAIL_TIMEOUT_MS)),
          FALLBACK_EMAIL_TIMEOUT_MS,
        );
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

async function sendFallbackResult(
  lead: InsertLead,
  attempts: number,
  failureReason: string,
): Promise<CrmSyncResult> {
  try {
    const fallbackEmailSent = await waitForFallbackEmail(lead);
    if (fallbackEmailSent) {
      console.warn("[CRM] Lead not synced; recovery email sent.", { email: lead.email, attempts });
      return { status: "fallback_sent", attempts, failureReason, fallbackEmailSent: true };
    }
  } catch (error) {
    console.error("[CRM] Fallback email threw an error:", error);
    const fallbackFailure = isTimeoutError(error)
      ? "Recovery email did not confirm delivery before its timeout."
      : "Recovery email could not be sent.";
    return {
      status: "failed",
      attempts,
      failureReason: `${failureReason} ${fallbackFailure}`,
      fallbackEmailSent: false,
    };
  }

  return { status: "failed", attempts, failureReason, fallbackEmailSent: false };
}

class HubSpotService implements CRMService {
  constructor(private apiKey: string) {}

  async syncLead(lead: InsertLead): Promise<CrmSyncResult> {
    let failureReason = "HubSpot did not confirm lead creation.";
    let attempts = 0;

    for (let attempt = 1; attempt <= MAX_SYNC_ATTEMPTS; attempt++) {
      attempts = attempt;
      const result = await this.attemptSync(lead);
      if (result.success) {
        console.log("Lead synced to HubSpot:", lead.email);
        return {
          status: "synced",
          attempts: attempt,
          crmRecordId: result.crmRecordId,
          fallbackEmailSent: false,
        };
      }

      failureReason = result.failureReason || failureReason;
      if (!result.retryable || attempt === MAX_SYNC_ATTEMPTS) break;
      await wait(RETRY_DELAYS_MS[attempt - 1] || RETRY_DELAYS_MS.at(-1) || 750);
    }

    return sendFallbackResult(lead, attempts, failureReason);
  }

  private async attemptSync(lead: InsertLead): Promise<AttemptResult> {
    try {
      const adClickInfo = [
        lead.gclid ? `gclid: ${lead.gclid}` : null,
        lead.wbraid ? `wbraid: ${lead.wbraid}` : null,
        lead.gbraid ? `gbraid: ${lead.gbraid}` : null,
        lead.msclkid ? `msclkid: ${lead.msclkid}` : null,
      ].filter(Boolean).join(', ');

      const { response, payload } = await fetchJsonWithTimeout<{ id?: string; message?: string }>(
        'https://api.hubapi.com/crm/v3/objects/contacts',
        {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            email: lead.email,
            firstname: lead.name.split(' ')[0],
            lastname: lead.name.split(' ').slice(1).join(' ') || '',
            phone: lead.phone || '',
            lifecyclestage: 'lead',
            hs_analytics_source: lead.source,
            hs_analytics_source_data_1: lead.medium,
            hs_analytics_source_data_2: lead.campaign || '',
            hs_content_membership_notes: [
              lead.utmContent ? `UTM Content: ${lead.utmContent}` : null,
              lead.utmTerm ? `UTM Term: ${lead.utmTerm}` : null,
              adClickInfo ? `Ad Click IDs: ${adClickInfo}` : null,
              lead.landingPage ? `Landing Page: ${lead.landingPage}` : null,
            ].filter(Boolean).join(' | '),
            lead_tags: buildLeadTags(lead),
          }
        }),
        },
        "HubSpot",
      );

      if (!response.ok) {
        return {
          success: false,
          retryable: response.status === 408 || response.status === 429 || response.status >= 500,
          failureReason: `HubSpot returned HTTP ${response.status}${payload?.message ? `: ${truncateReason(payload.message)}` : ""}`,
        };
      }

      if (!payload?.id) {
        return {
          success: false,
          retryable: false,
          failureReason: "HubSpot returned HTTP success without a contact ID.",
        };
      }

      return { success: true, retryable: false, crmRecordId: payload.id };
    } catch (error) {
      console.error("Failed to sync to HubSpot:", error);
      if (isTimeoutError(error)) {
        return {
          success: false,
          retryable: false,
          failureReason: "HubSpot did not confirm the lead before the request timeout.",
        };
      }
      return { success: false, retryable: true, failureReason: `HubSpot connection error: ${truncateReason(error instanceof Error ? error.message : error)}` };
    }
  }
}

function buildLeadTags(lead: InsertLead): string {
  const PAID_MEDIUMS = new Set(['cpc', 'ppc', 'paid', 'paid_search', 'paid-search', 'paid_social', 'paid-social', 'display', 'cpm', 'retargeting']);
  const isPaid =
    PAID_MEDIUMS.has((lead.medium || '').toLowerCase()) ||
    !!(lead.gclid || lead.wbraid || lead.gbraid || lead.msclkid);

  const tags: string[] = [];

  if (isPaid) {
    tags.push('paidLead');
    const adGroup = lead.utmContent || lead.campaign;
    if (adGroup) tags.push(adGroup);
  } else {
    tags.push('organicLead');
  }

  return tags.join(',');
}

class PerfexService implements CRMService {
  constructor(
    private apiKey: string,
    private baseUrl: string
  ) {}

  async syncLead(lead: InsertLead): Promise<CrmSyncResult> {
    let failureReason = "Perfex did not confirm lead creation.";
    let attempts = 0;

    for (let attempt = 1; attempt <= MAX_SYNC_ATTEMPTS; attempt++) {
      attempts = attempt;
      const result = await this.attemptSync(lead);
      if (result.success) {
        console.log("Lead synced to Perfex:", lead.email);
        return {
          status: "synced",
          attempts: attempt,
          crmRecordId: result.crmRecordId,
          fallbackEmailSent: false,
        };
      }

      failureReason = result.failureReason || failureReason;
      if (!result.retryable || attempt === MAX_SYNC_ATTEMPTS) break;

      console.warn("[CRM] Retrying Perfex lead sync.", { email: lead.email, attempt, failureReason });
      await wait(RETRY_DELAYS_MS[attempt - 1] || RETRY_DELAYS_MS.at(-1) || 750);
    }

    return sendFallbackResult(lead, attempts, failureReason);
  }

  private async attemptSync(lead: InsertLead): Promise<AttemptResult> {
    try {
      const strangerReactionLabel = lead.strangerReaction 
        ? this.getStrangerReactionLabel(lead.strangerReaction)
        : null;
      
      const adIds = [
        lead.gclid ? `gclid: ${lead.gclid}` : null,
        lead.wbraid ? `wbraid: ${lead.wbraid}` : null,
        lead.gbraid ? `gbraid: ${lead.gbraid}` : null,
        lead.msclkid ? `msclkid: ${lead.msclkid}` : null,
      ].filter(Boolean).join(', ');

      const description = [
        lead.message || '',
        strangerReactionLabel ? `\nStranger Reaction: ${strangerReactionLabel}` : '',
        `\nSource: ${lead.source}`,
        `Medium: ${lead.medium}`,
        `Campaign: ${lead.campaign || 'N/A'}`,
        lead.utmContent ? `UTM Content: ${lead.utmContent}` : null,
        lead.utmTerm ? `UTM Term: ${lead.utmTerm}` : null,
        adIds ? `Ad Click IDs: ${adIds}` : null,
        `Landing Page: ${lead.landingPage || 'N/A'}`,
      ].filter(line => line).join('\n');

      const { response, payload } = await fetchJsonWithTimeout<{
        status?: boolean;
        message?: string;
        record_id?: string | number;
      }>(
        `${this.baseUrl.replace(/\/+$/, "")}/api/leads`,
        {
        method: 'POST',
        headers: {
          'authtoken': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          phonenumber: lead.phone || '',
          zip: lead.zipCode || '',
          description: description,
          source: parseInt(process.env.PERFEX_SOURCE_ID || '1'),
          status: parseInt(process.env.PERFEX_LEAD_STATUS_ID || '1'),
          assigned: parseInt(process.env.PERFEX_ASSIGNED_STAFF_ID || '2'),
          tags: buildLeadTags(lead),
          company: lead.dogName || '',
        }),
        },
        "Perfex",
      );

      if (!response.ok) {
        return {
          success: false,
          retryable: response.status === 408 || response.status === 429 || response.status >= 500,
          failureReason: `Perfex returned HTTP ${response.status}${payload?.message ? `: ${truncateReason(payload.message)}` : ""}`,
        };
      }

      if (payload?.status !== true) {
        return {
          success: false,
          retryable: false,
          failureReason: `Perfex did not accept the lead${payload?.message ? `: ${truncateReason(payload.message)}` : "."}`,
        };
      }

      if (!payload.record_id) {
        return {
          success: false,
          retryable: false,
          failureReason: "Perfex returned a successful status without a lead record ID.",
        };
      }

      return { success: true, retryable: false, crmRecordId: String(payload.record_id) };
    } catch (error) {
      console.error("Failed to sync to Perfex:", error);
      if (isTimeoutError(error)) {
        return {
          success: false,
          retryable: false,
          failureReason: "Perfex did not confirm the lead before the request timeout.",
        };
      }
      return {
        success: false,
        retryable: true,
        failureReason: `Perfex connection error: ${truncateReason(error instanceof Error ? error.message : error)}`,
      };
    }
  }

  private getStrangerReactionLabel(value: string): string {
    const labels: Record<string, string> = {
      'friendly-welcoming': 'Friendly and welcoming',
      'excited-jumps': 'Excited and jumps on them',
      'barks-calm': 'Barks but stays calm',
      'barks-aggressively': 'Barks aggressively',
      'hides-runs': 'Hides or runs away',
      'indifferent': 'Indifferent/ignores them',
      'nervous-shy': 'Nervous and/or Shy',
      'growls-teeth': 'Growls or shows teeth',
      'protective-controlled': 'Protective but controlled',
    };
    return labels[value] || value;
  }
}

class NoOpService implements CRMService {
  async syncLead(lead: InsertLead): Promise<CrmSyncResult> {
    console.error("CRM not configured; sending the lead through the recovery channel.", { email: lead.email });
    return sendFallbackResult(lead, 0, "CRM is not configured.");
  }
}

export function createCRMService(config: CRMConfig): CRMService {
  switch (config.type) {
    case 'hubspot':
      if (!config.apiKey) throw new Error('HubSpot API key required');
      return new HubSpotService(config.apiKey);
    
    case 'perfex':
      if (!config.apiKey || !config.baseUrl) {
        throw new Error('Perfex API key and base URL required');
      }
      return new PerfexService(config.apiKey, config.baseUrl);
    
    case 'none':
    default:
      return new NoOpService();
  }
}

export function getCRMService(): CRMService {
  const crmType = process.env.CRM_TYPE as CRMConfig['type'] || 'none';
  
  if (crmType === 'perfex' && (!process.env.CRM_API_KEY || !process.env.PERFEX_BASE_URL)) {
    console.warn('[CRM] Perfex configured but missing CRM_API_KEY or PERFEX_BASE_URL, using no-op service');
    return new NoOpService();
  }
  
  if (crmType === 'hubspot' && !process.env.CRM_API_KEY) {
    console.warn('[CRM] HubSpot configured but missing CRM_API_KEY, using no-op service');
    return new NoOpService();
  }
  
  const config: CRMConfig = {
    type: crmType,
    apiKey: process.env.CRM_API_KEY,
    baseUrl: process.env.PERFEX_BASE_URL,
  };
  
  return createCRMService(config);
}
