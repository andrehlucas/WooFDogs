import type { Lead } from "../../shared/schema";
import { getUncachableGmailClient } from "./gmailClient";

const FALLBACK_RECIPIENTS = [
  'lucas1988melo@gmail.com',
  'office@woofdogs.com',
  'shay@woofdogs.com'
];

function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return text.replace(/[&<>"']/g, char => htmlEntities[char] || char);
}

function safeValue(value: string | null | undefined, fallback: string = 'Not provided'): string {
  return value ? escapeHtml(value) : fallback;
}

function getStrangerReactionLabel(value: string): string {
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
  return labels[value] || escapeHtml(value);
}

function formatLeadEmailContent(lead: Lead): string {
  const strangerReactionLabel = lead.strangerReaction 
    ? getStrangerReactionLabel(lead.strangerReaction)
    : 'Not provided';

  const safeName = safeValue(lead.name);
  const safeEmail = safeValue(lead.email);
  const safePhone = safeValue(lead.phone);
  const safeZipCode = safeValue(lead.zipCode);
  const safeDogName = safeValue(lead.dogName);
  const safeMessage = safeValue(lead.message);
  const safeSource = safeValue(lead.source);
  const safeMedium = safeValue(lead.medium);
  const safeCampaign = safeValue(lead.campaign, 'N/A');
  const safeLandingPage = safeValue(lead.landingPage, 'N/A');

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .alert-box { background-color: #ff6b6b; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .alert-box h1 { margin: 0 0 10px 0; font-size: 24px; }
    .lead-info { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .lead-info h2 { color: #2c3e50; margin-top: 0; }
    .field { margin-bottom: 10px; }
    .field-label { font-weight: bold; color: #555; }
    .field-value { color: #333; }
    .instructions { background-color: #e8f5e9; padding: 20px; border-radius: 8px; border-left: 4px solid #4caf50; }
    .instructions h2 { color: #2e7d32; margin-top: 0; }
    .instructions ol { margin: 0; padding-left: 20px; }
    .instructions li { margin-bottom: 8px; }
    .field-mapping { background-color: #fff3e0; padding: 15px; border-radius: 8px; margin-top: 15px; }
    .field-mapping h3 { color: #e65100; margin-top: 0; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background-color: #f5f5f5; }
  </style>
</head>
<body>
  <div class="alert-box">
    <h1>⚠️ ATTENTION: Perfex Integration Failed</h1>
    <p>The automatic lead sync to Perfex CRM did not work. Please manually create this lead in Perfex using the information below.</p>
    <p><strong>Technical team:</strong> Please investigate and fix the Perfex API integration.</p>
  </div>

  <div class="lead-info">
    <h2>📋 Lead Information</h2>
    
    <div class="field">
      <span class="field-label">Name:</span>
      <span class="field-value">${safeName}</span>
    </div>
    
    <div class="field">
      <span class="field-label">Email:</span>
      <span class="field-value">${safeEmail}</span>
    </div>
    
    <div class="field">
      <span class="field-label">Phone:</span>
      <span class="field-value">${safePhone}</span>
    </div>
    
    <div class="field">
      <span class="field-label">Zip Code:</span>
      <span class="field-value">${safeZipCode}</span>
    </div>
    
    <div class="field">
      <span class="field-label">Dog Name:</span>
      <span class="field-value">${safeDogName}</span>
    </div>
    
    <div class="field">
      <span class="field-label">Stranger Reaction:</span>
      <span class="field-value">${strangerReactionLabel}</span>
    </div>
    
    <div class="field">
      <span class="field-label">Message:</span>
      <span class="field-value">${safeMessage}</span>
    </div>
    
    <h3>📊 Marketing Attribution</h3>
    
    <div class="field">
      <span class="field-label">Source:</span>
      <span class="field-value">${safeSource}</span>
    </div>
    
    <div class="field">
      <span class="field-label">Medium:</span>
      <span class="field-value">${safeMedium}</span>
    </div>
    
    <div class="field">
      <span class="field-label">Campaign:</span>
      <span class="field-value">${safeCampaign}</span>
    </div>
    
    <div class="field">
      <span class="field-label">Landing Page:</span>
      <span class="field-value">${safeLandingPage}</span>
    </div>
    
    <div class="field">
      <span class="field-label">Lead Created:</span>
      <span class="field-value">${lead.createdAt ? new Date(lead.createdAt).toLocaleString() : new Date().toLocaleString()}</span>
    </div>
  </div>

  <div class="instructions">
    <h2>📝 Manual Entry Instructions for Perfex</h2>
    <ol>
      <li>Log in to Perfex CRM</li>
      <li>Go to <strong>Leads</strong> section in the sidebar</li>
      <li>Click <strong>"New Lead"</strong> button</li>
      <li>Fill in the fields as shown in the mapping table below</li>
      <li>Click <strong>"Save"</strong> to create the lead</li>
    </ol>
    
    <div class="field-mapping">
      <h3>Perfex Field Mapping</h3>
      <table>
        <tr>
          <th>Perfex Field</th>
          <th>Value to Enter</th>
        </tr>
        <tr>
          <td>Name</td>
          <td>${safeName}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>${safeEmail}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>${safePhone === 'Not provided' ? '' : safePhone}</td>
        </tr>
        <tr>
          <td>Zip</td>
          <td>${safeZipCode === 'Not provided' ? '' : safeZipCode}</td>
        </tr>
        <tr>
          <td>Company</td>
          <td>${safeDogName === 'Not provided' ? '' : safeDogName} <em>(Dog name goes here)</em></td>
        </tr>
        <tr>
          <td>Source</td>
          <td>Website (or select the appropriate source in Perfex)</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>Lead (or select the appropriate status in Perfex)</td>
        </tr>
        <tr>
          <td>Tags</td>
          <td>${safeSource}, ${safeMedium}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>
            ${safeMessage === 'Not provided' ? '' : safeMessage}<br>
            Stranger Reaction: ${strangerReactionLabel}<br>
            Source: ${safeSource}<br>
            Medium: ${safeMedium}<br>
            Campaign: ${safeCampaign}<br>
            Landing Page: ${safeLandingPage}
          </td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>
`;
}

function createEmailMessage(to: string[], subject: string, htmlContent: string): string {
  const boundary = 'boundary_' + Date.now();
  
  const messageParts = [
    `To: ${to.join(', ')}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(htmlContent).toString('base64'),
    `--${boundary}--`
  ];

  return Buffer.from(messageParts.join('\r\n'))
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function sendFallbackEmail(lead: Lead): Promise<boolean> {
  try {
    const gmail = await getUncachableGmailClient();
    
    const safeName = escapeHtml(lead.name || 'Unknown');
    const subject = `🚨 NEW LEAD (Perfex Failed) - ${safeName} - Action Required`;
    const htmlContent = formatLeadEmailContent(lead);
    
    const rawMessage = createEmailMessage(FALLBACK_RECIPIENTS, subject, htmlContent);

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: rawMessage
      }
    });

    console.log('Fallback email sent successfully to:', FALLBACK_RECIPIENTS.join(', '));
    return true;
  } catch (error) {
    console.error('CRITICAL: Failed to send fallback email:', error);
    console.error('LEAD DATA (for manual recovery):', JSON.stringify(lead, null, 2));
    return false;
  }
}
