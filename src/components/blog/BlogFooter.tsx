"use client";

import Link from "next/link";
import CallLink from "@/components/CallLink";

export function BlogFooter() {
  return (
    <footer className="w-full border-t bg-muted/30 mt-16" data-testid="blog-footer">
      <div className="container py-10 grid gap-8 lg:grid-cols-4">
        <div className="space-y-3">
          <Link href="/" className="text-lg font-bold tracking-tight" data-testid="link-footer-home">
            Woof Dogs
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Building better relationships between dogs and their families through professional, balanced training.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-foreground">Services</h3>
          <nav className="flex flex-col space-y-2 text-sm">
            <Link href="/obedience-training" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-obedience">Obedience Training</Link>
            <Link href="/aggression-management" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-aggression">Aggression Management</Link>
            <Link href="/service-animal-training" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-service-animal">Service Animal Training</Link>
            <Link href="/board-and-train" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-board-train">Board &amp; Train</Link>
          </nav>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-foreground">Company</h3>
          <nav className="flex flex-col space-y-2 text-sm">
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-about">About Us</Link>
            <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-blog">Blog</Link>
            <Link href="/evaluation" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-evaluation">Book an Evaluation</Link>
          </nav>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-foreground">Contact</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>4200 Global Trail</p>
            <p>Loxahatchee, FL 33470</p>
            <CallLink
              href="tel:+15612933491"
              className="block text-primary hover:underline font-medium"
              data-testid="link-footer-phone"
            >
              (561) 293-3491
            </CallLink>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground" data-testid="text-footer-copyright">
            &copy; {new Date().getFullYear()} Woof Dogs. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground" data-testid="text-footer-areas">
            Serving Palm Beach County &bull; Boca Raton &bull; Delray Beach &bull; Wellington
          </p>
        </div>
      </div>
    </footer>
  );
}
