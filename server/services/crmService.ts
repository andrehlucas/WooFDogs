import type { Lead } from "../../shared/schema";
import { sendFallbackEmail } from "./emailFallbackService";

export interface CRMConfig {
  type: 'hubspot' | 'perfex' | 'none';
  apiKey?: string;
  baseUrl?: string;
}

export interface CRMService {
  syncLead(lead: Lead): Promise<boolean>;
}

class HubSpotService implements CRMService {
  constructor(private apiKey: string) {}

  async syncLead(lead: Lead): Promise<boolean> {
    try {
      const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
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
            
            // Custom properties for source tracking
            hs_analytics_source: lead.source,
            hs_analytics_source_data_1: lead.medium,
            hs_analytics_source_data_2: lead.campaign || '',
          }
        })
      });

      if (response.ok) {
        console.log('Lead synced to HubSpot:', lead.email);
        return true;
      } else {
        const error = await response.text();
        console.error('HubSpot API error:', error);
        return false;
      }
    } catch (error) {
      console.error('Failed to sync to HubSpot:', error);
      return false;
    }
  }
}

function buildLeadTags(lead: Lead): string {
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

  async syncLead(lead: Lead): Promise<boolean> {
    try {
      // Build description with stranger reaction
      const strangerReactionLabel = lead.strangerReaction 
        ? this.getStrangerReactionLabel(lead.strangerReaction)
        : null;
      
      const description = [
        lead.message || '',
        strangerReactionLabel ? `\nStranger Reaction: ${strangerReactionLabel}` : '',
        `\nSource: ${lead.source}`,
        `Medium: ${lead.medium}`,
        `Campaign: ${lead.campaign || 'N/A'}`,
        `Landing Page: ${lead.landingPage || 'N/A'}`,
      ].filter(line => line).join('\n');

      const response = await fetch(`${this.baseUrl}/api/leads`, {
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
          source: parseInt(process.env.PERFEX_SOURCE_ID || '1'), // Lead Source ID from Perfex
          status: parseInt(process.env.PERFEX_LEAD_STATUS_ID || '1'), // Status ID for "Lead" in Perfex
          assigned: parseInt(process.env.PERFEX_ASSIGNED_STAFF_ID || '2'), // Staff ID to assign leads to
          tags: buildLeadTags(lead),
          company: lead.dogName || '',
        })
      });

      if (response.ok) {
        console.log('Lead synced to Perfex:', lead.email);
        return true;
      } else {
        const error = await response.text();
        console.error('Perfex API error:', error);
        
        // Trigger email fallback
        console.log('[FALLBACK] Triggering email fallback for lead:', lead.email);
        try {
          const emailSent = await sendFallbackEmail(lead);
          if (emailSent) {
            console.log('[FALLBACK] Email sent successfully');
          } else {
            console.error('[FALLBACK] Email send returned false');
          }
        } catch (emailError) {
          console.error('[FALLBACK] Email exception:', emailError);
          console.error('[FALLBACK] Lead data for manual recovery:', JSON.stringify(lead));
        }
        
        return false;
      }
    } catch (error) {
      console.error('Failed to sync to Perfex:', error);
      
      // Trigger email fallback on exception
      console.log('[FALLBACK] Triggering email fallback for lead:', lead.email);
      try {
        const emailSent = await sendFallbackEmail(lead);
        if (emailSent) {
          console.log('[FALLBACK] Email sent successfully');
        } else {
          console.error('[FALLBACK] Email send returned false');
        }
      } catch (emailError) {
        console.error('[FALLBACK] Email exception:', emailError);
        console.error('[FALLBACK] Lead data for manual recovery:', JSON.stringify(lead));
      }
      
      return false;
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
  async syncLead(lead: Lead): Promise<boolean> {
    console.log('CRM not configured, lead stored locally:', lead.email);
    return true;
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

// Configure CRM based on environment variables
export function getCRMService(): CRMService {
  const crmType = process.env.CRM_TYPE as CRMConfig['type'] || 'none';
  
  const config: CRMConfig = {
    type: crmType,
    apiKey: process.env.CRM_API_KEY,
    baseUrl: process.env.PERFEX_BASE_URL,
  };
  
  return createCRMService(config);
}
