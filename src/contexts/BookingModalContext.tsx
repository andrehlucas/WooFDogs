"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface BookingModalContextType {
  isOpen: boolean;
  hasEverOpened: boolean;
  submittedFrom: string | null;
  openModal: () => void;
  closeModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasEverOpened, setHasEverOpened] = useState(false);
  const [submittedFrom, setSubmittedFrom] = useState<string | null>(null);

  const openModal = () => {
    if (typeof window !== 'undefined') {
      setSubmittedFrom(window.location.pathname);
    }
    setHasEverOpened(true);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSubmittedFrom(null);
  };

  return (
    <BookingModalContext.Provider value={{ isOpen, hasEverOpened, submittedFrom, openModal, closeModal }}>
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (context === undefined) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return context;
}
