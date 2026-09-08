import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | WooF Dogs",
  description: "WooF Dogs privacy policy — how we collect, use, and protect your personal information.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="container mx-auto px-4 max-w-3xl py-24 sm:py-32">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: August 2026</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Information We Collect</h2>
          <p>
            When you contact us, book an evaluation, or submit a form on this website, we collect the information
            you provide — such as your name, email address, phone number, and details about your dog. We may also
            collect standard server log data (IP address, browser type, pages visited) to maintain the security
            and performance of this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">How We Use Your Information</h2>
          <p>We use the information you provide to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Respond to your inquiries and schedule evaluations or training sessions.</li>
            <li>Send appointment confirmations and follow-up communications.</li>
            <li>Improve our services and website experience.</li>
          </ul>
          <p className="mt-3">We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Cookies</h2>
          <p>
            This website may use cookies and similar technologies to improve your browsing experience and analyze
            site traffic. You can disable cookies in your browser settings, though some features of the site may
            not function correctly without them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Data Retention</h2>
          <p>
            We retain your information only for as long as necessary to provide our services and comply with
            applicable legal obligations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of any personal information we hold about you
            by contacting us at{" "}
            <a href="mailto:office@woofdogs.com" className="text-primary underline">
              office@woofdogs.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Contact</h2>
          <p>
            If you have questions about this privacy policy, please contact us at{" "}
            <a href="mailto:office@woofdogs.com" className="text-primary underline">
              office@woofdogs.com
            </a>{" "}
            or call{" "}
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
