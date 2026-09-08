# CRM Integration Setup Guide

This application supports both **HubSpot** and **Perfex CRM** for lead management. You can configure which CRM to use via environment variables.

## Quick Start (No CRM - Local Storage Only)

By default, all leads are stored in memory. No additional configuration is needed.

## HubSpot Integration

### Prerequisites
1. A HubSpot account
2. HubSpot Private App or OAuth access token

### Setup Steps

1. **Get Your HubSpot API Key**:
   - Go to HubSpot Settings → Integrations → Private Apps
   - Click "Create a private app"
   - Give it a name (e.g., "WoofDogs Lead Sync")
   - Under "Scopes", select:
     - `crm.objects.contacts.write`
     - `crm.objects.contacts.read`
   - Click "Create app" and copy your access token

2. **Configure Environment Variables**:
   In the Replit Secrets tab (or `.env` file), add:
   ```
   CRM_TYPE=hubspot
   CRM_API_KEY=your_hubspot_access_token_here
   ```

3. **Custom Properties (Optional)**:
   If you want to track UTM source data in HubSpot, create these custom contact properties:
   - `hs_analytics_source` (Traffic Source)
   - `hs_analytics_source_data_1` (Medium)
   - `hs_analytics_source_data_2` (Campaign)

### How It Works
- Leads are sent to HubSpot's `/crm/v3/objects/contacts` endpoint
- Email is used as the unique identifier (auto-deduplicates)
- Traffic source data is included in custom properties
- Lifecycle stage is automatically set to "lead"

---

## Perfex CRM Integration

### Prerequisites
1. A Perfex CRM installation
2. [REST API module](https://codecanyon.net/item/rest-api-for-perfex-crm/25278359) installed ($39)
3. API token generated in Perfex

### Setup Steps

1. **Install REST API Module**:
   - Purchase and install the Perfex REST API module
   - Activate it in your Perfex admin panel

2. **Generate API Token**:
   - Go to `Setup → API → API Management` in Perfex
   - Click "New Token"
   - Set permissions (enable "Leads Create")
   - Copy the generated API token

3. **Find Required IDs in Perfex**:
   To find these IDs in your Perfex admin panel:
   - **Lead Source ID**: Setup → Leads → Sources (note the ID number)
   - **Lead Status ID**: Setup → Leads → Statuses (find the "Lead" status ID)
   - **Staff ID**: Setup → Staff (note your user ID)

4. **Configure Environment Variables**:
   In the Replit Secrets tab (or `.env` file), add all required variables:
   ```
   CRM_TYPE=perfex
   CRM_API_KEY=your_perfex_api_token_here
   PERFEX_BASE_URL=https://your-perfex-domain.com
   PERFEX_SOURCE_ID=1
   PERFEX_LEAD_STATUS_ID=1
   PERFEX_ASSIGNED_STAFF_ID=2
   ```
   
   **Important**: Update `PERFEX_LEAD_STATUS_ID` to match the ID of your "Lead" status in Perfex. This ensures all form submissions are marked with the correct status.

### How It Works
- Leads are sent to Perfex's `/api/leads` endpoint
- Email is the unique identifier
- Traffic source data is included in the "description" field and as tags
- Tags: source name and medium (e.g., "google, organic")

---

## Testing Your Integration

1. **Start the application**:
   ```bash
   npm run dev
   ```

2. **Submit a test lead** through the booking form

3. **Check the console logs**:
   - Success: "Lead synced to [CRM]: email@example.com"
   - Error: Error details will be logged

4. **Verify in CRM**:
   - HubSpot: Go to Contacts and search for the email
   - Perfex: Go to Leads and check the latest entry

---

## Traffic Source Tracking

All leads automatically capture:
- **Source**: Where they came from (google, facebook, direct, etc.)
- **Medium**: How they arrived (organic, cpc, social, referral, none)
- **Campaign**: UTM campaign name (if present)
- **Landing Page**: First page visited
- **First Visit**: Timestamp of initial visit
- **UTM Content & Term**: Additional campaign tracking

### Testing Traffic Sources

**Direct Traffic** (no referrer):
```
https://yoursite.com/
→ Source: direct, Medium: none
```

**Google Organic**:
```
Click from Google search results
→ Source: google, Medium: organic
```

**Facebook Ad with UTM**:
```
https://yoursite.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=spring_promo
→ Source: facebook, Medium: cpc, Campaign: spring_promo
```

**Referral**:
```
Click from another website
→ Source: otherwebsite.com, Medium: referral
```

---

## Switching CRMs

To switch between CRMs, just update the `CRM_TYPE` environment variable:

```
CRM_TYPE=none       # Local storage only (default)
CRM_TYPE=hubspot    # Sync to HubSpot
CRM_TYPE=perfex     # Sync to Perfex
```

Restart the server after changing environment variables.

---

## Troubleshooting

### Leads Not Syncing
1. Check console logs for error messages
2. Verify environment variables are set correctly
3. Test API credentials manually (e.g., with Postman)
4. Ensure CRM API modules/permissions are active

### HubSpot Errors
- "Unauthorized": Check your access token is valid
- "Missing scopes": Add required scopes in Private App settings
- Rate limits: HubSpot allows 100 requests per 10 seconds

### Perfex Errors
- "Validation failed": Check required fields (source, status, assigned IDs)
- "Unauthorized": Verify API token and that REST API module is active
- Update source/status/assigned IDs to match your Perfex setup

---

## Data Privacy

- All traffic tracking is first-party (stored in localStorage)
- No third-party tracking cookies
- Traffic data is only sent to your configured CRM
- Leads are stored locally even if CRM sync fails

---

## Support

For questions about:
- **HubSpot API**: [HubSpot Developer Docs](https://developers.hubspot.com/docs/api/crm/contacts)
- **Perfex API**: [Perfex Support](https://perfexsupport.com)
