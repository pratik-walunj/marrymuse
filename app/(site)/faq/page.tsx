import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";
import { getFaqs, getSettings } from "@/lib/content";
import { buildMetadata, jsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about our wedding planning services, pricing, destination weddings and process.",
  path: "/faq",
});

export default async function FaqPage() {
  const [faqs, settings] = await Promise.all([getFaqs(), getSettings()]);
  const phoneHref = `tel:${settings.phone.replace(/\s/g, "")}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      <PageHero
        eyebrow="Help Centre"
        title="Frequently Asked Questions"
        description="Everything you need to know before planning your celebration with MarryMuse."
        crumbs={[{ label: "FAQ" }]}
      />

      <FaqSection faqs={faqs} withFilter className="bg-canvas py-20 md:py-28" />
      <CtaBand phoneHref={phoneHref} />
    </>
  );
}
