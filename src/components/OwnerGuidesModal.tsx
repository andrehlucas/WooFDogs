"use client";

import { useState } from "react";
import { Eye, Home, FileText, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const guides = [
  {
    id: "eye-contact",
    title: "Establishing Eye Contact",
    description:
      "A step-by-step daily guide to building focus and eye contact with your dog using treats and positive reinforcement.",
    icon: Eye,
    url: "/guides/eye-contact-guide.pdf",
  },
  {
    id: "housetraining",
    title: "Tips for Housetraining",
    description:
      "Comprehensive tips for housetraining puppies and dogs, including crate training, feeding schedules, and more.",
    icon: Home,
    url: "/guides/housetraining-tips.html",
  },
];

interface OwnerGuidesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OwnerGuidesModal({ open, onOpenChange }: OwnerGuidesModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Owner Guides
          </DialogTitle>
          <DialogDescription>
            Select a guide to open it in a new tab.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pt-2">
          {guides.map((guide) => (
            <a
              key={guide.id}
              href={guide.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onOpenChange(false)}
              className="group flex items-start gap-4 rounded-lg border border-border p-4 transition-all hover:border-primary hover:bg-primary hover:shadow-md"
              data-testid={`link-guide-${guide.id}`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-white/20 group-hover:text-white">
                <guide.icon className="h-6 w-6" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold leading-tight transition-colors group-hover:text-white">{guide.title}</h3>
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-white/70" />
                </div>
                <p className="text-sm text-muted-foreground leading-snug transition-colors group-hover:text-white/80">
                  {guide.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function useOwnerGuidesModal() {
  const [open, setOpen] = useState(false);
  return { open, setOpen, openGuides: () => setOpen(true) };
}
