export interface TrafficSource {
  source: string;
  medium: string;
  campaign: string | null;
  landingPage: string;
  firstVisit: Date;
  utmContent: string | null;
  utmTerm: string | null;
}

const STORAGE_KEY = 'initialTrafficSource';
const SEARCH_ENGINES = [
  { domain: 'google.', name: 'google' },
  { domain: 'bing.com', name: 'bing' },
  { domain: 'yahoo.com', name: 'yahoo' },
  { domain: 'duckduckgo.com', name: 'duckduckgo' },
  { domain: 'yandex.', name: 'yandex' },
  { domain: 'baidu.com', name: 'baidu' },
];

export function getTrafficSource(): TrafficSource {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    return {
      ...parsed,
      firstVisit: new Date(parsed.firstVisit),
    };
  }

  const referrer = document.referrer;
  const urlParams = new URLSearchParams(window.location.search);
  
  let source = 'direct';
  let medium = 'none';
  let campaign: string | null = null;
  let utmContent: string | null = null;
  let utmTerm: string | null = null;

  // Priority 1: UTM parameters (highest priority - explicit tracking)
  if (urlParams.get('utm_source')) {
    source = urlParams.get('utm_source') || 'unknown';
    medium = urlParams.get('utm_medium') || 'unknown';
    campaign = urlParams.get('utm_campaign');
    utmContent = urlParams.get('utm_content');
    utmTerm = urlParams.get('utm_term');
  }
  // Priority 2: Organic search engines
  else if (referrer) {
    const isOrganic = SEARCH_ENGINES.some(engine => {
      if (referrer.includes(engine.domain)) {
        source = engine.name;
        medium = 'organic';
        return true;
      }
      return false;
    });
    
    // Priority 3: Referral
    if (!isOrganic) {
      try {
        const url = new URL(referrer);
        source = url.hostname.replace('www.', '');
        medium = 'referral';
      } catch (e) {
        // Invalid URL, keep as direct
      }
    }
  }

  const trafficData: TrafficSource = {
    source,
    medium,
    campaign,
    landingPage: window.location.pathname,
    firstVisit: new Date(),
    utmContent,
    utmTerm,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(trafficData));
  
  return trafficData;
}

export function getStoredTrafficSource(): TrafficSource | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  
  try {
    const parsed = JSON.parse(stored);
    return {
      ...parsed,
      firstVisit: new Date(parsed.firstVisit),
    };
  } catch {
    return null;
  }
}

export function clearTrafficSource(): void {
  localStorage.removeItem(STORAGE_KEY);
}
