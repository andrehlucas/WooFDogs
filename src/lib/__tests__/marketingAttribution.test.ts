import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

const mockDocument = {
  cookie: '',
  referrer: '',
};

const mockWindow = {
  location: {
    search: '',
    pathname: '/',
  },
};

vi.stubGlobal('localStorage', mockLocalStorage);
vi.stubGlobal('document', mockDocument);
vi.stubGlobal('window', mockWindow);

import {
  captureMarketingAttribution,
  getStoredAttribution,
  clearAttribution,
  getAttributionForSubmission,
} from '../marketingAttribution';

describe('Marketing Attribution', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    mockDocument.cookie = '';
    mockDocument.referrer = '';
    mockWindow.location.search = '';
    mockWindow.location.pathname = '/';
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('captureMarketingAttribution', () => {
    it('captures UTM parameters from URL', () => {
      mockWindow.location.search = '?utm_source=google&utm_medium=cpc&utm_campaign=test';
      
      const attribution = captureMarketingAttribution();
      
      expect(attribution.utm_source).toBe('google');
      expect(attribution.utm_medium).toBe('cpc');
      expect(attribution.utm_campaign).toBe('test');
    });

    it('captures Google ad click IDs', () => {
      mockWindow.location.search = '?gclid=abc123&utm_source=google';
      
      const attribution = captureMarketingAttribution();
      
      expect(attribution.gclid).toBe('abc123');
    });

    it('captures wbraid and gbraid', () => {
      mockWindow.location.search = '?wbraid=web123&gbraid=app456';
      
      const attribution = captureMarketingAttribution();
      
      expect(attribution.wbraid).toBe('web123');
      expect(attribution.gbraid).toBe('app456');
    });

    it('captures Microsoft ad click ID', () => {
      mockWindow.location.search = '?msclkid=ms789&utm_source=bing';
      
      const attribution = captureMarketingAttribution();
      
      expect(attribution.msclkid).toBe('ms789');
    });

    it('infers source from Google referrer', () => {
      mockDocument.referrer = 'https://www.google.com/search?q=test';
      
      const attribution = captureMarketingAttribution();
      
      expect(attribution.utm_source).toBe('google');
      expect(attribution.utm_medium).toBe('organic');
    });

    it('infers source from Bing referrer', () => {
      mockDocument.referrer = 'https://www.bing.com/search?q=test';
      
      const attribution = captureMarketingAttribution();
      
      expect(attribution.utm_source).toBe('bing');
      expect(attribution.utm_medium).toBe('organic');
    });

    it('captures referral from unknown domain', () => {
      mockDocument.referrer = 'https://example.com/page';
      
      const attribution = captureMarketingAttribution();
      
      expect(attribution.utm_source).toBe('example.com');
      expect(attribution.utm_medium).toBe('referral');
    });

    it('defaults to direct when no referrer or UTM params', () => {
      const attribution = captureMarketingAttribution();
      
      expect(attribution.utm_source).toBe('direct');
      expect(attribution.utm_medium).toBe('none');
    });

    it('stores timestamps', () => {
      const attribution = captureMarketingAttribution();
      
      expect(attribution.firstCaptured).toBeDefined();
      expect(attribution.lastUpdated).toBeDefined();
      expect(new Date(attribution.firstCaptured).getTime()).toBeGreaterThan(0);
    });

    it('captures landing page with query string', () => {
      mockWindow.location.pathname = '/landing';
      mockWindow.location.search = '?utm_source=test';
      
      const attribution = captureMarketingAttribution();
      
      expect(attribution.landingPage).toBe('/landing?utm_source=test');
    });
  });

  describe('first-touch attribution (default)', () => {
    it('preserves existing meaningful attribution when new params arrive', () => {
      mockWindow.location.search = '?utm_source=first&utm_campaign=original';
      captureMarketingAttribution();
      
      mockWindow.location.search = '?utm_source=second&utm_campaign=new';
      const attribution = captureMarketingAttribution();
      
      expect(attribution.utm_source).toBe('first');
      expect(attribution.utm_campaign).toBe('original');
    });

    it('upgrades from direct visit when UTM params arrive later', () => {
      mockWindow.location.search = '';
      captureMarketingAttribution();
      
      const initial = getStoredAttribution();
      expect(initial?.utm_source).toBe('direct');
      expect(initial?.utm_medium).toBe('none');
      
      mockWindow.location.search = '?utm_source=google&utm_medium=cpc&gclid=test123';
      const upgraded = captureMarketingAttribution();
      
      expect(upgraded.utm_source).toBe('google');
      expect(upgraded.utm_medium).toBe('cpc');
      expect(upgraded.gclid).toBe('test123');
    });

    it('preserves original firstCaptured timestamp when upgrading', () => {
      mockWindow.location.search = '';
      const initial = captureMarketingAttribution();
      const originalTimestamp = initial.firstCaptured;
      
      mockWindow.location.search = '?utm_source=google&gclid=abc';
      const upgraded = captureMarketingAttribution();
      
      expect(upgraded.firstCaptured).toBe(originalTimestamp);
    });

    it('upgrades from direct visit when organic referrer arrives', () => {
      mockWindow.location.search = '';
      mockDocument.referrer = '';
      captureMarketingAttribution();
      
      const initial = getStoredAttribution();
      expect(initial?.utm_source).toBe('direct');
      
      mockDocument.referrer = 'https://www.google.com/search?q=test';
      const upgraded = captureMarketingAttribution();
      
      expect(upgraded.utm_source).toBe('google');
      expect(upgraded.utm_medium).toBe('organic');
    });
  });

  describe('last-touch attribution', () => {
    it('overwrites existing attribution when configured', () => {
      mockWindow.location.search = '?utm_source=first';
      captureMarketingAttribution();
      
      mockWindow.location.search = '?utm_source=second';
      const attribution = captureMarketingAttribution({ attributionMode: 'last-touch' });
      
      expect(attribution.utm_source).toBe('second');
    });

    it('preserves firstCaptured timestamp in last-touch mode', () => {
      mockWindow.location.search = '?utm_source=first';
      const firstAttribution = captureMarketingAttribution();
      const firstTimestamp = firstAttribution.firstCaptured;
      
      mockWindow.location.search = '?utm_source=second';
      const secondAttribution = captureMarketingAttribution({ attributionMode: 'last-touch' });
      
      expect(secondAttribution.firstCaptured).toBe(firstTimestamp);
    });
  });

  describe('clearAttribution', () => {
    it('removes stored attribution', () => {
      mockWindow.location.search = '?utm_source=test';
      captureMarketingAttribution();
      
      expect(getStoredAttribution()).not.toBeNull();
      
      clearAttribution();
      
      expect(getStoredAttribution()).toBeNull();
    });
  });

  describe('getAttributionForSubmission', () => {
    it('returns attribution data formatted for API submission', () => {
      mockWindow.location.search = '?utm_source=google&utm_medium=cpc&gclid=123';
      captureMarketingAttribution();
      
      const submission = getAttributionForSubmission();
      
      expect(submission.source).toBe('google');
      expect(submission.medium).toBe('cpc');
      expect(submission.gclid).toBe('123');
    });

    it('returns defaults when no attribution stored', () => {
      clearAttribution();
      
      const submission = getAttributionForSubmission();
      
      expect(submission.source).toBe('direct');
      expect(submission.medium).toBe('none');
    });
  });
});
