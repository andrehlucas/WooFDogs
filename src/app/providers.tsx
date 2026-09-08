"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BookingModalProvider, useBookingModal } from "@/contexts/BookingModalContext";
import dynamic from "next/dynamic";
import { queryClient } from "@/lib/queryClient";
import { useEffect } from "react";

const BookingEvaluationModal = dynamic(
  () =>
    import("@/components/BookingEvaluationModal").then(
      (m) => m.BookingEvaluationModal
    ),
  { ssr: false }
);

function LazyBookingModal() {
  const { hasEverOpened } = useBookingModal();
  if (!hasEverOpened) return null;
  return <BookingEvaluationModal />;
}

function MarketingAttributionTracker() {
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (cancelled) return;
      const { captureMarketingAttribution } = await import("@/lib/marketingAttribution");
      if (!cancelled) captureMarketingAttribution();
    };
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(run, { timeout: 4000 });
    } else {
      setTimeout(run, 2500);
    }
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BookingModalProvider>
          <MarketingAttributionTracker />
          <Toaster />
          <Sonner />
          <LazyBookingModal />
          {children}
        </BookingModalProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
