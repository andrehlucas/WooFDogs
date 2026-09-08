"use client";

import { ArrowRight } from "lucide-react";
import { useBookingModal } from "@/contexts/BookingModalContext";

export function BookEvalLink({
  testId,
  children = "Get help",
  "aria-label": ariaLabel,
}: {
  testId: string;
  children?: string;
  "aria-label"?: string;
}) {
  const { openModal } = useBookingModal();
  return (
    <button
      type="button"
      onClick={openModal}
      className="text-sm font-medium text-primary underline-offset-4 hover:underline inline-flex items-center"
      data-testid={testId}
      aria-label={ariaLabel}
    >
      {children}
      <ArrowRight className="ml-1 h-4 w-4" />
    </button>
  );
}
