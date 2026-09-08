"use client";

import { useState } from "react";

export function useOwnerGuidesModal() {
  const [open, setOpen] = useState(false);
  return {
    open,
    setOpen,
    openGuides: () => setOpen(true),
  };
}
