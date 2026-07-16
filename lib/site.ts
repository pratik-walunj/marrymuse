/**
 * Central site configuration. Values here are used as sensible defaults and
 * are complemented / overridden by the Keystatic "settings" singleton at runtime.
 */
export const siteConfig = {
  name: "MarryMuse",
  tagline: "Luxury Wedding Planners",
  description:
    "MarryMuse crafts timeless, luxury weddings filled with love — from intimate ceremonies to grand destination celebrations across India & beyond.",
  url: "https://www.marrymuse.com",
  locale: "en_IN",
  ogImage:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  contact: {
    phone: "+91 99180 01088",
    phoneHref: "tel:+919918001088",
    whatsapp: "919918001088",
    email: "hello@marrymuse.com",
    address:
      "Branch Office, Shop No-4, Chaudhari Heights, Above Swarna Hotel, Warje, Pune",
    mapQuery: "Warje, Pune",
    hours: "Mon – Sat · 10:00 AM – 8:00 PM",
  },
  // Social accounts are not live yet — links are disabled (see components).
  // Replace "#" with the real profile URLs once the accounts are created.
  socials: {
    instagram: "#",
    facebook: "#",
    pinterest: "#",
    youtube: "#",
  },
} as const;

export type SiteConfig = typeof siteConfig;
