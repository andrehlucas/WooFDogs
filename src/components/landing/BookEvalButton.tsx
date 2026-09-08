"use client";

import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useBookingModal } from "@/contexts/BookingModalContext";

interface BookEvalButtonProps extends Omit<ButtonProps, "onClick"> {
  children: ReactNode;
}

export function BookEvalButton({ children, ...props }: BookEvalButtonProps) {
  const { openModal } = useBookingModal();
  return (
    <Button {...props} onClick={openModal}>
      {children}
    </Button>
  );
}
