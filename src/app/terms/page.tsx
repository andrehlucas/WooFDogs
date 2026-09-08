import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | WooF Dogs",
  description: "WooF Dogs terms of service — the conditions under which we provide dog training services.",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <main id="main-content" className="container mx-auto px-4 max-w-3xl py-24 sm:py-32">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: August 2026</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Services</h2>
          <p>
            WooF Dogs provides professional dog training services, including evaluations, private lessons,
            board-and-train programs, dog boarding, and related services to clients in Palm Beach County, Florida.
            All services are subject to availability and require a completed evaluation or intake assessment prior
            to enrollment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Bookings and Cancellations</h2>
          <p>
            Appointments may be rescheduled or cancelled with at least 24 hours&apos; notice. Late cancellations or
            no-shows may be subject to a cancellation fee at our discretion. Payment terms and deposit requirements
            will be communicated at the time of booking.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Client Responsibilities</h2>
          <p>Clients agree to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide accurate information about their dog&apos;s health, behavior history, and vaccination status.</li>
            <li>Ensure their dog is current on required vaccinations before any in-facility service.</li>
            <li>Follow trainer guidance and recommended protocols between sessions.</li>
            <li>Disclose any known aggressive behaviors or incidents prior to enrollment.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Limitation of Liability</h2>
          <p>
            WooF Dogs is not liable for any injury, loss, or damage resulting from a dog&apos;s behavior during or
            after training. Training outcomes depend on consistent application of techniques by the client and
            are not guaranteed. Results may vary based on the individual dog and owner commitment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Intellectual Property</h2>
          <p>
            All content on this website — including text, images, videos, and training materials — is the
            property of WooF Dogs and may not be reproduced without written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of Florida. Any disputes arising from services
            provided by WooF Dogs shall be subject to the exclusive jurisdiction of courts in Palm Beach County,
            Florida.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Contact</h2>
          <p>
            Questions about these terms may be directed to{" "}
            <a href="mailto:office@woofdogs.com" className="text-primary underline">
              office@woofdogs.com
            </a>{" "}
            or{" "}
            <a href="tel:+15615944111" className="text-primary underline">
              (561) 594-4111
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
