import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { DestinationsSection } from "@/components/sections/destinations-section";
import { ProcessSection } from "@/components/sections/process-section";
import { CtaBand } from "@/components/sections/cta-band";
import { getDestinations, getProcessSteps, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Destination Weddings",
  description:
    "Plan a breathtaking destination wedding in Udaipur, Goa, Jaipur, Bali, Dubai and more. MarryMuse handles every detail, wherever you say 'I do'.",
  path: "/destinations",
});

export default async function DestinationsPage() {
  const [destinations, steps, settings] = await Promise.all([
    getDestinations(),
    getProcessSteps(),
    getSettings(),
  ]);
  const phoneHref = `tel:${settings.phone.replace(/\s/g, "")}`;

  return (
    <>
      <PageHero
        eyebrow="Destination Weddings"
        title="The World is Your Venue"
        description="From lakeside palaces to tropical shores, we design seamless destination weddings at the planet's most coveted locations."
        image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
        crumbs={[{ label: "Destinations" }]}
      />

      <DestinationsSection
        destinations={destinations}
        withHeading={false}
        withCta={false}
        className="bg-canvas py-24 md:py-32"
      />

      <ProcessSection steps={steps} className="bg-secondary py-24 md:py-32" />
      <CtaBand phoneHref={phoneHref} />
    </>
  );
}
