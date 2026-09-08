"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Star } from "lucide-react";

interface BlogCtaProps {
  variant?: "inline" | "sidebar";
  heading?: string;
  subtext?: string;
}

export function BlogCta({
  variant = "inline",
  heading = "Not Sure Where to Start With Your Dog?",
  subtext = "Book a behavioral evaluation with WooF Dogs. We'll assess your dog, discuss your goals, and give you a clear, honest recommendation — no package pitch.",
}: BlogCtaProps) {
  if (variant === "sidebar") {
    return (
      <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-primary/10 to-primary/5" data-testid="sidebar-cta">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Behavioral Evaluation</span>
          </div>
          <h3 className="font-bold text-base leading-snug mb-2">
            Get a Personalized Training Plan
          </h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Shay will assess your dog and recommend the right path — private sessions or board-and-train.
          </p>
          <Link href="/behavioral-assessment" data-testid="link-sidebar-cta">
            <Button size="sm" className="w-full">
              Book Your Evaluation
            </Button>
          </Link>
          <p className="text-xs text-center text-muted-foreground mt-3 flex items-center justify-center gap-1">
            <Phone className="h-3 w-3" />
            South Florida · By appointment
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      className="my-10 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 p-6 md:p-8"
      data-testid="inline-cta"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Behavioral Evaluation
            </span>
          </div>
          <h3 className="font-bold text-xl md:text-2xl mb-2 leading-tight">{heading}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">{subtext}</p>
        </div>
        <div className="shrink-0">
          <Link href="/behavioral-assessment" data-testid="link-inline-cta">
            <Button size="lg" className="w-full sm:w-auto whitespace-nowrap">
              Book Your Evaluation
            </Button>
          </Link>
          <p className="text-xs text-center text-muted-foreground mt-2">
            WooF Dogs · South Florida
          </p>
        </div>
      </div>
    </div>
  );
}
