import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";
import CallLink from "@/components/CallLink";

const woofDogsLogo = "/woof-dogs-logo.webp";

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30">
      <div className="container grid gap-8 py-10 lg:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src={woofDogsLogo}
              alt="Woof Dogs — Professional Dog Training in South Florida"
              className="h-10 w-auto transition-transform duration-200 hover:scale-105"
              width={120}
              height={40}
              loading="lazy"
            />
          </Link>
          <p className="text-sm font-semibold text-foreground/80 italic">
            We Speak Your Dog&apos;s Language
          </p>
          <p className="text-sm text-muted-foreground">
            Building better relationships between dogs and their families through professional, balanced training.
          </p>
          <div className="flex space-x-4">
            {[
              { icon: <Instagram className="h-5 w-5" />, label: "Instagram", href: "https://www.instagram.com/woofdogs" },
              { icon: <Facebook className="h-5 w-5" />, label: "Facebook", href: "https://www.facebook.com/woofdogs" },
            ].map((social) => (
              <div key={social.label} className="transition-transform duration-200 hover:-translate-y-1 hover:scale-110 active:scale-90 motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100">
                <a href={social.href} className="text-muted-foreground hover:text-foreground active:scale-95 inline-block transition-all duration-200">
                  {social.icon}
                  <span className="sr-only">{social.label}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <nav className="flex flex-col space-y-2 text-sm">
            <Link href="/puppy-training" className="text-muted-foreground hover:text-foreground">Puppy Training</Link>
            <Link href="/obedience" className="text-muted-foreground hover:text-foreground">Obedience Training</Link>
            <Link href="/aggression-management" className="text-muted-foreground hover:text-foreground">Aggression Management</Link>
            <Link href="/service-animal-training" className="text-muted-foreground hover:text-foreground">Service Animal Training</Link>
            <Link href="/board-and-train" className="text-muted-foreground hover:text-foreground">Board &amp; Train</Link>
            <Link href="/dog-boarding" className="text-muted-foreground hover:text-foreground">Dog Boarding</Link>
          </nav>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <nav className="flex flex-col space-y-2 text-sm">
            <Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link>
            <Link href="/evaluation" className="text-muted-foreground hover:text-foreground">Book an Evaluation</Link>
            <Link href="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link>
          </nav>
          <h3 className="text-lg font-semibold mb-4 mt-6">Service Areas</h3>
          <nav className="flex flex-col space-y-2 text-sm">
            <Link href="/dog-training-boca-raton" className="text-muted-foreground hover:text-foreground">Boca Raton</Link>
            <Link href="/dog-training-delray-beach" className="text-muted-foreground hover:text-foreground">Delray Beach</Link>
            <Link href="/dog-training-wellington" className="text-muted-foreground hover:text-foreground">Wellington</Link>
            <Link href="/dog-training-west-palm-beach" className="text-muted-foreground hover:text-foreground">West Palm Beach</Link>
            <Link href="/dog-training-loxahatchee" className="text-muted-foreground hover:text-foreground">Loxahatchee</Link>
          </nav>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div>
              <p>4200 Global Trail</p>
              <p>Loxahatchee, FL 33470</p>
              <a
                href="https://maps.google.com/?q=4200+Global+Trail,+Loxahatchee,+FL+33470"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
                data-testid="link-get-directions"
              >
                Get Directions
              </a>
            </div>
            <CallLink
              href="tel:+15615944111"
              className="hover:text-primary block"
              data-testid="link-footer-call"
            >
              (561) 594-4111
            </CallLink>
            <p>office@woofdogs.com</p>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <p className="text-sm text-muted-foreground" data-testid="text-footer-copyright">
              &copy; {new Date().getFullYear()} Woof Dogs. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Website by{" "}
              <a
                href="https://insightcreativeai.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground underline"
                data-testid="link-insight-creative"
              >
                inSight Creative AI
              </a>
            </p>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="/privacy" className="hover:text-foreground">Privacy Policy</a>
            <a href="/terms" className="hover:text-foreground">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
