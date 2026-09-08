export interface MarketingAttribution {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  wbraid: string | null;
  gbraid: string | null;
  msclkid: string | null;
  landingPage: string;
  referrer: string | null;
  firstCaptured: string;
  lastUpdated: string;
}

interface AttributionConfig {
  attributionMode: 'first-touch' | 'last-touch';
  cookieExpirationDays: number;
  cookieName: string;
  localStorageKey: string;
}

const DEFAULT_CONFIG: AttributionConfig = {
  attributionMode: 'first-touch',
  cookieExpirationDays: 90,
  cookieName: 'mkt_attribution',
  localStorageKey: 'marketingAttribution',
};

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
const AD_ID_PARAMS = ['gclid', 'wbraid', 'gbraid', 'msclkid'] as const;
const ALL_PARAMS = [...UTM_PARAMS, ...AD_ID_PARAMS] as const;

const SEARCH_ENGINES = [
  { domain: 'google.', name: 'google' },
  { domain: 'bing.com', name: 'bing' },
  { domain: 'yahoo.com', name: 'yahoo' },
  { domain: 'duckduckgo.com', name: 'duckduckgo' },
  { domain: 'yandex.', name: 'yandex' },
  { domain: 'baidu.com', name: 'baidu' },
];

function setCookie(name: string, value: string, days: number): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  const sameSite = 'Lax';
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=${sameSite}`;
}

function getCookie(name: string): string | null {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

function parseQueryParams(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const result: Record<string, string> = {};
  
  ALL_PARAMS.forEach((param) => {
    const value = params.get(param);
    if (value) {
      result[param.toLowerCase()] = value.trim();
    }
  });
  
  return result;
}

function inferSourceFromReferrer(referrer: string): { source: string; medium: string } {
  if (!referrer) {
    return { source: 'direct', medium: 'none' };
  }
  
  for (const engine of SEARCH_ENGINES) {
    if (referrer.includes(engine.domain)) {
      return { source: engine.name, medium: 'organic' };
    }
  }
  
  try {
    const url = new URL(referrer);
    return { source: url.hostname.replace('www.', ''), medium: 'referral' };
  } catch {
    return { source: 'direct', medium: 'none' };
  }
}

function hasNewMarketingParams(params: Record<string, string>): boolean {
  return ALL_PARAMS.some((param) => params[param]);
}

function hasMeaningfulAttribution(attribution: MarketingAttribution): boolean {
  const hasUtmParams = attribution.utm_campaign || attribution.utm_content || attribution.utm_term;
  const hasAdIds = attribution.gclid || attribution.wbraid || attribution.gbraid || attribution.msclkid;
  const isNotDirect = attribution.utm_source !== 'direct' || attribution.utm_medium !== 'none';
  return Boolean(hasUtmParams || hasAdIds || isNotDirect);
}

function loadAttribution(config: AttributionConfig): MarketingAttribution | null {
  if (typeof window === 'undefined') return null;

  const cookieValue = getCookie(config.cookieName);
  if (cookieValue) {
    try {
      return JSON.parse(cookieValue);
    } catch {
      // Invalid JSON in cookie
    }
  }
  
  try {
    const localValue = localStorage.getItem(config.localStorageKey);
    if (localValue) {
      try {
        return JSON.parse(localValue);
      } catch {
        // Invalid JSON in localStorage
      }
    }
  } catch {
    // localStorage not available
  }
  
  return null;
}

function saveAttribution(attribution: MarketingAttribution, config: AttributionConfig): void {
  if (typeof window === 'undefined') return;
  const jsonValue = JSON.stringify(attribution);
  setCookie(config.cookieName, jsonValue, config.cookieExpirationDays);
  try {
    localStorage.setItem(config.localStorageKey, jsonValue);
  } catch {
    // localStorage not available
  }
}

export function captureMarketingAttribution(
  customConfig?: Partial<AttributionConfig>
): MarketingAttribution {
  if (typeof window === 'undefined') {
    return {
      utm_source: 'direct', utm_medium: 'none', utm_campaign: null,
      utm_term: null, utm_content: null, gclid: null, wbraid: null,
      gbraid: null, msclkid: null, landingPage: '/', referrer: null,
      firstCaptured: new Date().toISOString(), lastUpdated: new Date().toISOString(),
    };
  }

  const config = { ...DEFAULT_CONFIG, ...customConfig };
  
  const urlParams = parseQueryParams(window.location.search);
  const referrer = document.referrer || null;
  const now = new Date().toISOString();
  
  const existing = loadAttribution(config);
  
  if (existing) {
    if (config.attributionMode === 'first-touch') {
      const existingHasMeaningfulData = hasMeaningfulAttribution(existing);
      const newParamsAvailable = hasNewMarketingParams(urlParams);
      const { source: inferredSource, medium: inferredMedium } = inferSourceFromReferrer(referrer || '');
      const referrerProvidesBetterData = !existingHasMeaningfulData && 
        (inferredSource !== 'direct' || inferredMedium !== 'none');
      
      if (existingHasMeaningfulData) {
        return existing;
      }
      
      if (newParamsAvailable || referrerProvidesBetterData) {
        const upgraded: MarketingAttribution = {
          utm_source: urlParams.utm_source || inferredSource,
          utm_medium: urlParams.utm_medium || inferredMedium,
          utm_campaign: urlParams.utm_campaign || null,
          utm_term: urlParams.utm_term || null,
          utm_content: urlParams.utm_content || null,
          gclid: urlParams.gclid || null,
          wbraid: urlParams.wbraid || null,
          gbraid: urlParams.gbraid || null,
          msclkid: urlParams.msclkid || null,
          landingPage: window.location.pathname + window.location.search,
          referrer,
          firstCaptured: existing.firstCaptured,
          lastUpdated: now,
        };
        saveAttribution(upgraded, config);
        return upgraded;
      }
      
      return existing;
    }
    
    if (config.attributionMode === 'last-touch' && hasNewMarketingParams(urlParams)) {
      const { source, medium } = inferSourceFromReferrer(referrer || '');
      const updated: MarketingAttribution = {
        utm_source: urlParams.utm_source || source,
        utm_medium: urlParams.utm_medium || medium,
        utm_campaign: urlParams.utm_campaign || null,
        utm_term: urlParams.utm_term || null,
        utm_content: urlParams.utm_content || null,
        gclid: urlParams.gclid || null,
        wbraid: urlParams.wbraid || null,
        gbraid: urlParams.gbraid || null,
        msclkid: urlParams.msclkid || null,
        landingPage: window.location.pathname + window.location.search,
        referrer,
        firstCaptured: existing.firstCaptured,
        lastUpdated: now,
      };
      saveAttribution(updated, config);
      return updated;
    }
    
    return existing;
  }
  
  const { source, medium } = inferSourceFromReferrer(referrer || '');
  
  const newAttribution: MarketingAttribution = {
    utm_source: urlParams.utm_source || source,
    utm_medium: urlParams.utm_medium || medium,
    utm_campaign: urlParams.utm_campaign || null,
    utm_term: urlParams.utm_term || null,
    utm_content: urlParams.utm_content || null,
    gclid: urlParams.gclid || null,
    wbraid: urlParams.wbraid || null,
    gbraid: urlParams.gbraid || null,
    msclkid: urlParams.msclkid || null,
    landingPage: window.location.pathname + window.location.search,
    referrer,
    firstCaptured: now,
    lastUpdated: now,
  };
  
  saveAttribution(newAttribution, config);
  return newAttribution;
}

export function getStoredAttribution(): MarketingAttribution | null {
  return loadAttribution(DEFAULT_CONFIG);
}

export function clearAttribution(): void {
  if (typeof window === 'undefined') return;
  deleteCookie(DEFAULT_CONFIG.cookieName);
  try {
    localStorage.removeItem(DEFAULT_CONFIG.localStorageKey);
  } catch {
    // localStorage not available
  }
}

export function setAttributionMode(mode: 'first-touch' | 'last-touch'): void {
  const current = loadAttribution(DEFAULT_CONFIG);
  if (current) {
    saveAttribution(current, { ...DEFAULT_CONFIG, attributionMode: mode });
  }
}

export function debugAttribution(): void {
  if (typeof window === 'undefined') return;
  const attribution = getStoredAttribution();
  console.group('Marketing Attribution Debug');
  if (attribution) {
    console.table(attribution);
    console.log('First Captured:', new Date(attribution.firstCaptured).toLocaleString());
    console.log('Last Updated:', new Date(attribution.lastUpdated).toLocaleString());
  } else {
    console.log('No attribution data stored');
  }
  console.log('Current URL params:', window.location.search);
  console.log('Document referrer:', document.referrer);
  console.groupEnd();
}

export function getAttributionForSubmission(): Record<string, string | null> {
  const attribution = getStoredAttribution();
  if (!attribution) {
    return {
      source: 'direct',
      medium: 'none',
      campaign: null,
      landingPage: typeof window !== 'undefined' ? window.location.pathname : '/',
      firstVisit: new Date().toISOString(),
      utmContent: null,
      utmTerm: null,
      gclid: null,
      wbraid: null,
      gbraid: null,
      msclkid: null,
    };
  }
  
  return {
    source: attribution.utm_source || 'direct',
    medium: attribution.utm_medium || 'none',
    campaign: attribution.utm_campaign,
    landingPage: attribution.landingPage,
    firstVisit: attribution.firstCaptured,
    utmContent: attribution.utm_content,
    utmTerm: attribution.utm_term,
    gclid: attribution.gclid,
    wbraid: attribution.wbraid,
    gbraid: attribution.gbraid,
    msclkid: attribution.msclkid,
  };
}

if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).debugMktAttribution = debugAttribution;
}
