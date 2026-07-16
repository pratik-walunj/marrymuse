import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyChoose } from "@/components/sections/why-choose";
import { PackagesSection } from "@/components/sections/packages-section";
import { DestinationsSection } from "@/components/sections/destinations-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TeamSection } from "@/components/sections/team-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import {
  getHome,
  getSettings,
  getFeaturedServices,
  getPackages,
  getDestinations,
  getProcessSteps,
  getTestimonials,
  getTeam,
  getFaqs,
  getGallery,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { jsonLd } from "@/lib/seo";

export default async function HomePage() {
  const [
    home,
    settings,
    services,
    packages,
    destinations,
    steps,
    testimonials,
    team,
    faqs,
    gallery,
  ] = await Promise.all([
    getHome(),
    getSettings(),
    getFeaturedServices(),
    getPackages(),
    getDestinations(),
    getProcessSteps(),
    getTestimonials(),
    getTeam(),
    getFaqs(),
    getGallery(),
  ]);

  const phoneHref = `tel:${settings.phone.replace(/\s/g, "")}`;

  const stats = (home?.stats ?? []).map((s) => ({
    value: s.value ?? 0,
    suffix: s.suffix ?? "+",
    label: s.label ?? "",
  }));

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(websiteSchema)}
      />

      <Hero
        eyebrow={home?.heroEyebrow ?? "Bespoke Luxury Weddings"}
        title={home?.heroTitle ?? "Crafting Timeless Weddings Filled with Love & Luxury"}
        subtitle={home?.heroSubtitle ?? siteConfig.description}
        image={
          home?.heroImage ??
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80"
        }
        stats={stats}
      />

      <TrustBar brands={home?.trustBrands ?? []} />

      <AboutSection
        title={home?.aboutTitle ?? "A wedding atelier devoted to love & luxury"}
        body={home?.aboutBody ?? ""}
        image={
          home?.aboutImage ??
          "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80"
        }
        founderName={home?.founderName ?? "Aanya Kapoor"}
        founderRole={home?.founderRole ?? "Founder & Creative Director"}
      />

      <ServicesSection services={services} limit={6} />

      <WhyChoose />

      <PackagesSection packages={packages} />

      <DestinationsSection destinations={destinations} limit={6} />

      <ProcessSection steps={steps} />

      {/* Gallery preview */}
      <section className="bg-canvas py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Portfolio"
            title="A glimpse into our celebrations"
            description="Every frame tells a love story. Explore moments from weddings we've had the honour to design."
          />
          <div className="mt-14">
            <GalleryGrid items={gallery.slice(0, 8)} withFilter={false} />
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      <TeamSection team={team.slice(0, 4)} />

      <FaqSection faqs={faqs} limit={6} withFilter={false} />

      <CtaBand phoneHref={phoneHref} />
    </>
  );
}
