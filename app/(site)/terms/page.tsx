import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "The terms and conditions governing the use of MarryMuse services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Last updated: January 2026"
        crumbs={[{ label: "Terms & Conditions" }]}
      />
      <section className="bg-canvas py-20 md:py-24">
        <div className="container-luxe">
          <div className="prose prose-lg mx-auto max-w-3xl prose-headings:font-display prose-headings:text-ink prose-p:text-muted prose-li:text-muted prose-a:text-primary-dark">
            <p>
              Welcome to {siteConfig.name}. By accessing our website and engaging
              our services, you agree to the following terms and conditions.
            </p>
            <h2>Services</h2>
            <p>
              {siteConfig.name} provides luxury wedding planning, design and
              coordination services. The specific scope of work is defined in
              your individual service agreement.
            </p>
            <h2>Bookings & Payments</h2>
            <ul>
              <li>A signed agreement and deposit confirm your booking.</li>
              <li>Payments follow the milestone schedule in your agreement.</li>
              <li>All quoted prices are subject to your final scope of work.</li>
            </ul>
            <h2>Cancellations</h2>
            <p>
              Cancellation and refund terms are outlined in your service
              agreement. Deposits are generally non-refundable as they secure
              your date and our team.
            </p>
            <h2>Third-Party Vendors</h2>
            <p>
              While we partner with a trusted vendor network, third-party
              services are subject to their own terms. We coordinate on your
              behalf but are not liable for independent vendor conduct.
            </p>
            <h2>Intellectual Property</h2>
            <p>
              All content on this website — including imagery, design and text —
              is the property of {siteConfig.name} and may not be reproduced
              without permission.
            </p>
            <h2>Contact</h2>
            <p>
              For any questions regarding these terms, contact us at{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
