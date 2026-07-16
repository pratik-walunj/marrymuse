import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How MarryMuse collects, uses and protects your personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: January 2026"
        crumbs={[{ label: "Privacy Policy" }]}
      />
      <section className="bg-canvas py-20 md:py-24">
        <div className="container-luxe">
          <div className="prose prose-lg mx-auto max-w-3xl prose-headings:font-display prose-headings:text-ink prose-p:text-muted prose-li:text-muted prose-a:text-primary-dark">
            <p>
              At {siteConfig.name}, your privacy matters to us. This policy
              explains what information we collect and how we use it when you
              interact with our website and services.
            </p>
            <h2>Information We Collect</h2>
            <p>
              When you book a consultation or contact us, we may collect your
              name, email address, phone number, wedding date, location and any
              details you share about your celebration.
            </p>
            <h2>How We Use Your Information</h2>
            <ul>
              <li>To respond to your enquiries and consultation requests.</li>
              <li>To provide, personalise and improve our wedding services.</li>
              <li>To send you relevant updates, only where you&apos;ve opted in.</li>
            </ul>
            <h2>Data Protection</h2>
            <p>
              We implement appropriate security measures to protect your
              personal information. We never sell your data to third parties.
            </p>
            <h2>Cookies</h2>
            <p>
              Our website uses essential cookies to function and optional
              analytics cookies to help us understand how visitors use the site.
            </p>
            <h2>Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal data at any time by emailing{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              .
            </p>
            <h2>Contact</h2>
            <p>
              Questions about this policy? Reach us at{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>{" "}
              or {siteConfig.contact.phone}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
