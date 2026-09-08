import { beforeEach, describe, expect, it, vi } from "vitest";
import { createCRMService } from "./crmService";
import { sendFallbackEmail } from "./emailFallbackService";
import type { InsertLead } from "./schema";

vi.mock("./emailFallbackService", () => ({
  sendFallbackEmail: vi.fn(),
}));

const lead: InsertLead = {
  name: "Test Owner",
  email: "test.owner@example.com",
  phone: "555-0100",
  zipCode: "33470",
  dogName: "Test Dog",
  source: "website",
  medium: "organic",
};

const mockedFallbackEmail = vi.mocked(sendFallbackEmail);

describe("Perfex CRM lead synchronization", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockedFallbackEmail.mockResolvedValue(false);
  });

  it("marks a lead synced only after Perfex confirms status and record ID", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ status: true, message: "Lead add successful.", record_id: 1234 }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    const result = await createCRMService({
      type: "perfex",
      apiKey: "test-key",
      baseUrl: "https://crm.example.com",
    }).syncLead(lead);

    expect(result).toEqual({
      status: "synced",
      attempts: 1,
      crmRecordId: "1234",
      fallbackEmailSent: false,
    });
    expect(mockedFallbackEmail).not.toHaveBeenCalled();
  });

  it("does not treat an HTTP 200 rejection as a CRM success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ status: false, message: "Email already exists." }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    mockedFallbackEmail.mockResolvedValue(true);

    const result = await createCRMService({
      type: "perfex",
      apiKey: "test-key",
      baseUrl: "https://crm.example.com",
    }).syncLead(lead);

    expect(result.status).toBe("fallback_sent");
    expect(result.attempts).toBe(1);
    expect(result.fallbackEmailSent).toBe(true);
    expect(result.failureReason).toContain("Email already exists.");
  });

  it("retries transient CRM failures before recording an unrecoverable failure", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: "Temporary service issue" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await createCRMService({
      type: "perfex",
      apiKey: "test-key",
      baseUrl: "https://crm.example.com",
    }).syncLead(lead);

    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(result.status).toBe("failed");
    expect(result.attempts).toBe(3);
    expect(result.fallbackEmailSent).toBe(false);
  });

  it("records an unconfirmed Perfex timeout for recovery without retrying an ambiguous create", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new DOMException("The operation was aborted.", "AbortError")),
    );
    mockedFallbackEmail.mockResolvedValue(true);

    const result = await createCRMService({
      type: "perfex",
      apiKey: "test-key",
      baseUrl: "https://crm.example.com/",
    }).syncLead(lead);

    expect(result).toMatchObject({
      status: "fallback_sent",
      attempts: 1,
      fallbackEmailSent: true,
    });
    expect(result.failureReason).toContain("request timeout");
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://crm.example.com/api/leads",
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it("keeps the deadline active while Perfex response JSON is still loading", async () => {
    vi.useFakeTimers();
    try {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          status: 200,
          json: () => new Promise(() => undefined),
        } as unknown as Response),
      );
      mockedFallbackEmail.mockResolvedValue(true);

      const resultPromise = createCRMService({
        type: "perfex",
        apiKey: "test-key",
        baseUrl: "https://crm.example.com",
      }).syncLead(lead);

      await vi.advanceTimersByTimeAsync(30_000);
      const result = await resultPromise;

      expect(result).toMatchObject({
        status: "fallback_sent",
        attempts: 1,
        fallbackEmailSent: true,
      });
      expect(result.failureReason).toContain("request timeout");
    } finally {
      vi.useRealTimers();
    }
  });
});