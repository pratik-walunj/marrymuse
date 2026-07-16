import type { Metadata } from "next";
import Image from "next/image";
import { Quote, PlayCircle } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CtaBand } from "@/components/sections/cta-band";
import { StarRating } from "@/components/shared/star-rating";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/motion";
import { getTestimonials, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Testimonials & Reviews",
  description:
    "Read heartfelt reviews from couples whose dream weddings we brought to life. 5,000+ happy couples and a 4.9★ rating.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const [testimonials, settings] = await Promise.all([
    getTestimonials(),
    getSettings(),
  ]);
  const phoneHref = `tel:${settings.phone.replace(/\s/g, "")}`;

  return (
    <>
      <PageHero
        eyebrow="Love Notes"
        title="Stories from Our Couples"
        description="Nothing means more to us than the trust of the families we serve. Here's what they say."
        image="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1920&q=80"
        crumbs={[{ label: "Testimonials" }]}
      />

      <TestimonialsSection testimonials={testimonials} className="bg-canvas py-24 md:py-32" />

      {/* Wall of reviews */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="More Reviews"
            title="A wall of happily-ever-afters"
            description="Real words from real couples across every kind of celebration."
          />
          <Stagger className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {testimonials.map((t) => (
              <StaggerItem key={t.slug} className="break-inside-avoid">
                <figure className="rounded-3xl border border-line bg-white p-7 shadow-soft">
                  <Quote className="size-8 text-primary/25" />
                  <StarRating rating={t.rating} className="mt-3" />
                  <blockquote className="mt-4 leading-relaxed text-ink/85">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="relative size-11 overflow-hidden rounded-full ring-2 ring-primary/20">
                      <Image src={t.image} alt={t.name} fill sizes="44px" className="object-cover" />
                    </span>
                    <div>
                      <p className="font-display font-semibold text-ink">{t.name}</p>
                      <p className="text-xs text-muted">
                        {t.weddingType} · {t.location}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Video reviews (placeholders) */}
      <section className="bg-canvas py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading eyebrow="In Their Words" title="Video reviews" description="Hear directly from the couples who trusted us with their day." />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <div
                key={t.slug}
                className="group relative aspect-video overflow-hidden rounded-3xl shadow-soft"
              >
                <Image src={t.image} alt={t.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-ink/40 transition-colors group-hover:bg-ink/30" />
                <div className="absolute inset-0 grid place-items-center">
                  <PlayCircle className="size-16 text-white/90 transition-transform group-hover:scale-110" />
                </div>
                <p className="absolute bottom-4 left-4 font-display text-lg font-semibold text-white">
                  {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand phoneHref={phoneHref} />
    </>
  );
}
