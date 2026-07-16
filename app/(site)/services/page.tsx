import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Icon } from "@/components/shared/icon";
import { Stagger, StaggerItem } from "@/components/shared/motion";
import { ProcessSection } from "@/components/sections/process-section";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";
import { getServices, getProcessSteps, getSettings } from "@/lib/content";
import { buildMetadata, jsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Our Wedding Services",
  description:
    "Explore 15+ luxury wedding services — from full planning and destination weddings to décor, photography, catering and guest hospitality.",
  path: "/services",
});

export default async function ServicesPage() {
  const [services, steps, settings] = await Promise.all([
    getServices(),
    getProcessSteps(),
    getSettings(),
  ]);
  const phoneHref = `tel:${settings.phone.replace(/\s/g, "")}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Luxury Wedding Planning",
    provider: { "@type": "LocalBusiness", name: siteConfig.name, url: siteConfig.url },
    areaServed: "IN",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wedding Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.excerpt },
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(serviceSchema)} />

      <PageHero
        eyebrow="Our Services"
        title="Every Detail, Beautifully Handled"
        description="A complete suite of luxury wedding services under one roof — so nothing is left to chance and nothing is left to you."
        image="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1920&q=80"
        crumbs={[{ label: "Services" }]}
      />

      <section className="bg-canvas py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="What We Offer"
            title="15+ services, one seamless experience"
            description="Mix and match, or let us handle it all. Every service is delivered by specialists who live and breathe weddings."
          />

          <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <StaggerItem key={service.slug} className="h-full">
                <div
                  id={service.slug}
                  className="group flex h-full scroll-mt-32 flex-col rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-luxe"
                >
                  <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary-dark transition-colors group-hover:from-primary group-hover:to-primary-dark group-hover:text-white">
                    <Icon name={service.icon} className="size-7" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {service.excerpt}
                  </p>
                  <Link
                    href="/book"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary-dark"
                  >
                    Enquire now <ArrowRight className="size-4" />
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-14 text-center">
            <Button asChild size="lg">
              <Link href="/book">Book a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <ProcessSection steps={steps} className="bg-secondary py-24 md:py-32" />
      <CtaBand phoneHref={phoneHref} />
    </>
  );
}
