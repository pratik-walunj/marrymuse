import { config, fields, collection, singleton } from "@keystatic/core";

/**
 * MarryMuse content model.
 *
 * Storage is `local` — all content lives as human-readable YAML / Markdoc files
 * inside the `content/` directory, so the site runs with zero database and
 * zero external configuration. Editors manage everything at `/keystatic`.
 *
 * Image fields use plain URLs so the starter ships with beautiful imagery out
 * of the box; swap them for uploaded assets any time from the admin UI.
 */

const imageUrl = (label: string, description?: string) =>
  fields.url({
    label,
    description: description ?? "Paste an image URL (Unsplash, CDN, etc.)",
    validation: { isRequired: true },
  });

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "MarryMuse Studio" },
    navigation: {
      "Site Content": ["home", "settings"],
      Weddings: ["services", "packages", "destinations", "process"],
      "Social Proof": ["testimonials", "team", "gallery"],
      Journal: ["blog", "faqs"],
    },
  },

  collections: {
    services: collection({
      label: "Services",
      path: "content/services/*",
      slugField: "title",
      format: { data: "yaml" },
      columns: ["title", "order"],
      schema: {
        title: fields.slug({ name: { label: "Service Name" } }),
        icon: fields.select({
          label: "Icon",
          description: "Lucide icon key",
          options: [
            { label: "Sparkles (Planning)", value: "Sparkles" },
            { label: "Plane (Destination)", value: "Plane" },
            { label: "MapPin (Venue)", value: "MapPin" },
            { label: "Flower2 (Décor)", value: "Flower2" },
            { label: "Camera (Photography)", value: "Camera" },
            { label: "Video (Videography)", value: "Video" },
            { label: "Music (Entertainment)", value: "Music" },
            { label: "Brush (Makeup)", value: "Brush" },
            { label: "Mail (Invitations)", value: "Mail" },
            { label: "UtensilsCrossed (Catering)", value: "UtensilsCrossed" },
            { label: "Users (Guest Mgmt)", value: "Users" },
            { label: "Hotel (Hospitality)", value: "Hotel" },
            { label: "Car (Transport)", value: "Car" },
            { label: "Heart (Honeymoon)", value: "Heart" },
            { label: "Building2 (Corporate)", value: "Building2" },
            { label: "Gem (Luxury)", value: "Gem" },
          ],
          defaultValue: "Sparkles",
        }),
        excerpt: fields.text({
          label: "Short Description",
          multiline: true,
          validation: { isRequired: true },
        }),
        featured: fields.checkbox({ label: "Feature on home page", defaultValue: false }),
        order: fields.integer({ label: "Sort order", defaultValue: 1 }),
      },
    }),

    packages: collection({
      label: "Wedding Packages",
      path: "content/packages/*",
      slugField: "name",
      format: { data: "yaml" },
      columns: ["name", "price", "order"],
      schema: {
        name: fields.slug({ name: { label: "Package Name" } }),
        tagline: fields.text({ label: "Tagline" }),
        price: fields.text({ label: "Price", description: "e.g. ₹8,50,000" }),
        priceNote: fields.text({ label: "Price note", defaultValue: "starting from" }),
        popular: fields.checkbox({ label: "Most popular", defaultValue: false }),
        accent: fields.select({
          label: "Accent",
          options: [
            { label: "Silver", value: "silver" },
            { label: "Gold", value: "gold" },
            { label: "Platinum", value: "platinum" },
            { label: "Royal", value: "royal" },
          ],
          defaultValue: "gold",
        }),
        features: fields.array(fields.text({ label: "Feature" }), {
          label: "Included Features",
          itemLabel: (props) => props.value,
        }),
        order: fields.integer({ label: "Sort order", defaultValue: 1 }),
      },
    }),

    destinations: collection({
      label: "Destinations",
      path: "content/destinations/*",
      slugField: "name",
      format: { data: "yaml" },
      columns: ["name", "region"],
      schema: {
        name: fields.slug({ name: { label: "Destination" } }),
        region: fields.text({ label: "Region", validation: { isRequired: true } }),
        image: imageUrl("Cover Image"),
        description: fields.text({ label: "Description", multiline: true }),
        startingPrice: fields.text({ label: "Starting Price", defaultValue: "₹12,00,000" }),
        highlights: fields.array(fields.text({ label: "Highlight" }), {
          label: "Highlights",
          itemLabel: (props) => props.value,
        }),
        popular: fields.checkbox({ label: "Popular", defaultValue: false }),
        order: fields.integer({ label: "Sort order", defaultValue: 1 }),
      },
    }),

    process: collection({
      label: "Process Steps",
      path: "content/process/*",
      slugField: "title",
      format: { data: "yaml" },
      columns: ["title", "step"],
      schema: {
        title: fields.slug({ name: { label: "Step Title" } }),
        step: fields.integer({ label: "Step number", defaultValue: 1 }),
        icon: fields.select({
          label: "Icon",
          options: [
            { label: "MessageCircle", value: "MessageCircle" },
            { label: "ClipboardList", value: "ClipboardList" },
            { label: "Wallet", value: "Wallet" },
            { label: "MapPin", value: "MapPin" },
            { label: "Palette", value: "Palette" },
            { label: "Sparkles", value: "Sparkles" },
            { label: "PartyPopper", value: "PartyPopper" },
          ],
          defaultValue: "Sparkles",
        }),
        description: fields.text({ label: "Description", multiline: true }),
      },
    }),

    testimonials: collection({
      label: "Testimonials",
      path: "content/testimonials/*",
      slugField: "name",
      format: { data: "yaml" },
      columns: ["name", "rating"],
      schema: {
        name: fields.slug({ name: { label: "Couple / Name" } }),
        location: fields.text({ label: "Location" }),
        weddingType: fields.text({ label: "Wedding Type", defaultValue: "Destination Wedding" }),
        rating: fields.integer({ label: "Rating (1-5)", defaultValue: 5 }),
        quote: fields.text({ label: "Quote", multiline: true, validation: { isRequired: true } }),
        image: imageUrl("Photo"),
        featured: fields.checkbox({ label: "Featured", defaultValue: false }),
      },
    }),

    team: collection({
      label: "Team Members",
      path: "content/team/*",
      slugField: "name",
      format: { data: "yaml" },
      columns: ["name", "role"],
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        role: fields.text({ label: "Role", validation: { isRequired: true } }),
        image: imageUrl("Photo"),
        bio: fields.text({ label: "Bio", multiline: true }),
        instagram: fields.text({
          label: "Instagram URL",
          description: 'Full profile URL, or "#" to disable.',
          defaultValue: "#",
        }),
        order: fields.integer({ label: "Sort order", defaultValue: 1 }),
      },
    }),

    faqs: collection({
      label: "FAQs",
      path: "content/faqs/*",
      slugField: "question",
      format: { data: "yaml" },
      columns: ["question", "category"],
      schema: {
        question: fields.slug({ name: { label: "Question" } }),
        answer: fields.text({ label: "Answer", multiline: true, validation: { isRequired: true } }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "General", value: "General" },
            { label: "Pricing", value: "Pricing" },
            { label: "Planning", value: "Planning" },
            { label: "Destination", value: "Destination" },
          ],
          defaultValue: "General",
        }),
        order: fields.integer({ label: "Sort order", defaultValue: 1 }),
      },
    }),

    gallery: collection({
      label: "Gallery",
      path: "content/gallery/*",
      slugField: "title",
      format: { data: "yaml" },
      columns: ["title", "category"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        image: imageUrl("Image"),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Wedding", value: "Wedding" },
            { label: "Reception", value: "Reception" },
            { label: "Engagement", value: "Engagement" },
            { label: "Haldi", value: "Haldi" },
            { label: "Mehendi", value: "Mehendi" },
            { label: "Sangeet", value: "Sangeet" },
            { label: "Bride", value: "Bride" },
            { label: "Groom", value: "Groom" },
          ],
          defaultValue: "Wedding",
        }),
        size: fields.select({
          label: "Tile size",
          options: [
            { label: "Standard", value: "standard" },
            { label: "Tall", value: "tall" },
            { label: "Wide", value: "wide" },
          ],
          defaultValue: "standard",
        }),
        order: fields.integer({ label: "Sort order", defaultValue: 1 }),
      },
    }),

    blog: collection({
      label: "Blog Posts",
      path: "content/blog/*",
      slugField: "title",
      format: { contentField: "content" },
      columns: ["title", "category", "publishedAt"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        excerpt: fields.text({ label: "Excerpt", multiline: true }),
        cover: imageUrl("Cover Image"),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Planning Tips", value: "Planning Tips" },
            { label: "Real Weddings", value: "Real Weddings" },
            { label: "Décor & Trends", value: "Décor & Trends" },
            { label: "Destinations", value: "Destinations" },
            { label: "Budgeting", value: "Budgeting" },
          ],
          defaultValue: "Planning Tips",
        }),
        author: fields.text({ label: "Author", defaultValue: "MarryMuse Studio" }),
        publishedAt: fields.date({ label: "Published date" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        featured: fields.checkbox({ label: "Featured", defaultValue: false }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
  },

  singletons: {
    settings: singleton({
      label: "Site Settings & SEO",
      path: "content/settings/index",
      format: { data: "yaml" },
      schema: {
        siteName: fields.text({ label: "Site name", defaultValue: "MarryMuse" }),
        tagline: fields.text({ label: "Tagline", defaultValue: "Luxury Wedding Planners" }),
        metaTitle: fields.text({ label: "Default SEO title" }),
        metaDescription: fields.text({ label: "Default SEO description", multiline: true }),
        phone: fields.text({ label: "Phone" }),
        whatsapp: fields.text({ label: "WhatsApp number (digits only)" }),
        email: fields.text({ label: "Email" }),
        address: fields.text({ label: "Address", multiline: true }),
        hours: fields.text({ label: "Business hours" }),
        instagram: fields.text({
          label: "Instagram URL",
          description: 'Full profile URL, or "#" to disable until live.',
          defaultValue: "#",
        }),
        facebook: fields.text({ label: "Facebook URL", defaultValue: "#" }),
        pinterest: fields.text({ label: "Pinterest URL", defaultValue: "#" }),
        youtube: fields.text({ label: "YouTube URL", defaultValue: "#" }),
        offerBanner: fields.text({ label: "Offer banner text" }),
      },
    }),

    home: singleton({
      label: "Home Page",
      path: "content/home/index",
      format: { data: "yaml" },
      schema: {
        heroEyebrow: fields.text({ label: "Hero eyebrow", defaultValue: "Bespoke Luxury Weddings" }),
        heroTitle: fields.text({
          label: "Hero headline",
          multiline: true,
          defaultValue: "Crafting Timeless Weddings Filled with Love & Luxury",
        }),
        heroSubtitle: fields.text({ label: "Hero subheadline", multiline: true }),
        heroImage: imageUrl("Hero background image"),
        stats: fields.array(
          fields.object({
            value: fields.integer({ label: "Value", defaultValue: 0 }),
            suffix: fields.text({ label: "Suffix", defaultValue: "+" }),
            label: fields.text({ label: "Label" }),
          }),
          { label: "Stats / Counters", itemLabel: (props) => props.fields.label.value || "Stat" }
        ),
        aboutTitle: fields.text({ label: "About title", multiline: true }),
        aboutBody: fields.text({ label: "About body", multiline: true }),
        aboutImage: imageUrl("About image"),
        founderName: fields.text({ label: "Founder name" }),
        founderRole: fields.text({ label: "Founder role" }),
        trustBrands: fields.array(fields.text({ label: "Brand / Award" }), {
          label: "Trust badges",
          itemLabel: (props) => props.value,
        }),
      },
    }),
  },
});
