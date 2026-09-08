"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/contexts/BookingModalContext";

export function HeroBookEvalButton() {
  const { openModal } = useBookingModal();
  return (
    <Button
      size="lg"
      className="bg-primary hover:bg-primary/90 text-white"
      onClick={openModal}
      data-testid="button-schedule-evaluation"
    >
      Book an Evaluation
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}
