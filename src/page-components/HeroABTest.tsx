"use client";

import { useState } from "react";
import HeroVariantA from "@/components/HeroVariantA";
import HeroVariantB from "@/components/HeroVariantB";
import { Button } from "@/components/ui/button";

const HeroABTest = () => {
  const [activeVariant, setActiveVariant] = useState<"A" | "B">("A");

  return (
    <div className="relative">
      <div className="fixed left-4 top-4 z-50 flex gap-2 rounded-lg border border-slate-300 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
        <Button
          size="sm"
          variant={activeVariant === "A" ? "default" : "outline"}
          onClick={() => setActiveVariant("A")}
          data-testid="button-select-variant-a"
        >
          Variant A (Bento Grid)
        </Button>
        <Button
          size="sm"
          variant={activeVariant === "B" ? "default" : "outline"}
          onClick={() => setActiveVariant("B")}
          data-testid="button-select-variant-b"
        >
          Variant B (Interactive)
        </Button>
      </div>

      {activeVariant === "A" ? <HeroVariantA /> : <HeroVariantB />}
    </div>
  );
};

export default HeroABTest;
