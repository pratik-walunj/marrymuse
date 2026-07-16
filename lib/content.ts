import "server-only";
import { reader } from "@/lib/reader";
import { siteConfig } from "@/lib/site";

/**
 * Typed, sorted data-access helpers over the Keystatic reader.
 * These are `cache`-friendly async functions used by server components.
 */

const byOrder = <T extends { order?: number | null }>(a: T, b: T) =>
  (a.order ?? 999) - (b.order ?? 999);

export async function getServices() {
  const items = await reader.collections.services.all();
  return items
    .map((i) => ({ slug: i.slug, ...i.entry }))
    .sort(byOrder);
}

export async function getFeaturedServices() {
  return (await getServices()).filter((s) => s.featured);
}

export async function getPackages() {
  const items = await reader.collections.packages.all();
  return items.map((i) => ({ slug: i.slug, ...i.entry })).sort(byOrder);
}

export async function getDestinations() {
  const items = await reader.collections.destinations.all();
  return items.map((i) => ({ slug: i.slug, ...i.entry })).sort(byOrder);
}

export async function getProcessSteps() {
  const items = await reader.collections.process.all();
  return items
    .map((i) => ({
      slug: i.slug,
      title: i.entry.title,
      icon: i.entry.icon,
      step: i.entry.step ?? 0,
      description: i.entry.description ?? "",
    }))
    .sort((a, b) => a.step - b.step);
}

export async function getTestimonials() {
  const items = await reader.collections.testimonials.all();
  return items.map((i) => ({
    slug: i.slug,
    name: i.entry.name,
    location: i.entry.location,
    weddingType: i.entry.weddingType,
    quote: i.entry.quote,
    image: i.entry.image,
    featured: i.entry.featured,
    rating: i.entry.rating ?? 5,
  }));
}

export async function getTeam() {
  const items = await reader.collections.team.all();
  return items.map((i) => ({ slug: i.slug, ...i.entry })).sort(byOrder);
}

export async function getFaqs() {
  const items = await reader.collections.faqs.all();
  return items.map((i) => ({ slug: i.slug, ...i.entry })).sort(byOrder);
}

export async function getGallery() {
  const items = await reader.collections.gallery.all();
  return items.map((i) => ({ slug: i.slug, ...i.entry })).sort(byOrder);
}

export async function getPosts() {
  const items = await reader.collections.blog.all();
  return items
    .map((i) => ({ slug: i.slug, ...i.entry }))
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? 0).getTime() -
        new Date(a.publishedAt ?? 0).getTime()
    );
}

export async function getPost(slug: string) {
  const entry = await reader.collections.blog.read(slug);
  if (!entry) return null;
  return { slug, ...entry };
}

export async function getHome() {
  return reader.singletons.home.read();
}

/** Site settings singleton merged with static fallbacks so pages never break. */
export async function getSettings() {
  const s = await reader.singletons.settings.read();
  return {
    siteName: s?.siteName || siteConfig.name,
    tagline: s?.tagline || siteConfig.tagline,
    metaTitle: s?.metaTitle || `${siteConfig.name} — ${siteConfig.tagline}`,
    metaDescription: s?.metaDescription || siteConfig.description,
    phone: s?.phone || siteConfig.contact.phone,
    whatsapp: s?.whatsapp || siteConfig.contact.whatsapp,
    email: s?.email || siteConfig.contact.email,
    address: s?.address || siteConfig.contact.address,
    hours: s?.hours || siteConfig.contact.hours,
    instagram: s?.instagram || siteConfig.socials.instagram,
    facebook: s?.facebook || siteConfig.socials.facebook,
    pinterest: s?.pinterest || siteConfig.socials.pinterest,
    youtube: s?.youtube || siteConfig.socials.youtube,
    offerBanner:
      s?.offerBanner ||
      "Limited 2026 dates open — book a complimentary consultation this month.",
  };
}
