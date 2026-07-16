import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { GalleryGrid, type GalleryItem } from "@/components/sections/gallery-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { getGallery, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio & Gallery",
  description:
    "Browse our portfolio of luxury weddings — ceremonies, receptions, haldi, mehendi, sangeet and more, captured in stunning detail.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const [gallery, settings] = await Promise.all([getGallery(), getSettings()]);
  const phoneHref = `tel:${settings.phone.replace(/\s/g, "")}`;
  const items = gallery as unknown as GalleryItem[];

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Moments We've Crafted"
        description="A curated collection of celebrations — every image a memory, every memory a masterpiece."
        image="https://images.unsplash.com/photo-1460978812857-470ed1c77af0?auto=format&fit=crop&w=1920&q=80"
        crumbs={[{ label: "Gallery" }]}
      />

      <section className="bg-canvas py-20 md:py-28">
        <div className="container-luxe">
          <GalleryGrid items={items} />
        </div>
      </section>

      <CtaBand phoneHref={phoneHref} />
    </>
  );
}
