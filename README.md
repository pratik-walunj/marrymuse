# MarryMuse — Luxury Wedding Planner Website

A **premium, high-converting, fully-functional** wedding planning website built with a modern, production-ready stack. Content is managed entirely through a **database-free CMS (Keystatic)** — edit everything from a beautiful admin UI, no code required.

![Made with Next.js](https://img.shields.io/badge/Next.js-16-black) ![Keystatic](https://img.shields.io/badge/CMS-Keystatic-c89b3c) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)

---

## ✨ Highlights

- **Ultra-premium luxury design** — glassmorphism, gold gradients, soft shadows, elegant typography.
- **Next.js 16 App Router** + TypeScript + **Tailwind CSS v4**.
- **Keystatic CMS** — no database. All content lives as human-readable files in `content/`.
- **Framer Motion** animations — scroll reveals, staggered grids, parallax, counters, sliders.
- **Conversion-focused** — sticky CTAs, floating WhatsApp/Call, exit-intent popup, countdown offer banner, recent-bookings social proof, lead form with validation & success animation.
- **SEO-complete** — dynamic metadata, Open Graph, Twitter cards, JSON-LD (LocalBusiness, Service, FAQ, BlogPosting, Breadcrumb), `sitemap.xml`, `robots.txt`, canonical URLs.
- **Accessible (WCAG-AA aware)** — keyboard nav, focus states, ARIA labels, alt text, reduced-motion support.
- **Fully responsive** — 320px → 1920px, no horizontal overflow, touch-friendly.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** for the website
and **[http://localhost:3000/keystatic](http://localhost:3000/keystatic)** for the CMS admin.

That's it — no environment variables, no database, no extra configuration required.

### Production build

```bash
npm run build
npm run start
```

---

## 🗂 Project Structure

```
marrymuse/
├── app/
│   ├── (site)/                # Marketing pages (shared header/footer/widgets)
│   │   ├── page.tsx           # Home
│   │   ├── about/  services/  packages/  destinations/
│   │   ├── gallery/  testimonials/  faq/  contact/  book/
│   │   ├── blog/  blog/[slug]/
│   │   └── privacy/  terms/
│   ├── keystatic/             # CMS admin route
│   ├── api/keystatic/         # CMS API route handler
│   ├── layout.tsx             # Root layout (fonts, org schema)
│   ├── globals.css            # Design system (Tailwind v4)
│   ├── sitemap.ts  robots.ts
│   └── loading.tsx  error.tsx  not-found.tsx
├── components/
│   ├── ui/                    # Primitives (button, card, accordion, dialog…)
│   ├── layout/                # Header, mega menu, mobile nav, footer, logo
│   ├── sections/              # Reusable page sections (hero, services, packages…)
│   ├── shared/                # Motion, counters, page hero, conversion widgets
│   ├── forms/                 # Consultation, contact, newsletter forms
│   └── blog/                  # Markdoc renderer, blog list, share buttons
├── content/                   # ← All CMS content (YAML + Markdoc)
│   ├── home/  settings/
│   ├── services/  packages/  destinations/  process/
│   ├── testimonials/  team/  gallery/  faqs/
│   └── blog/
├── lib/                       # utils, content readers, SEO, site config, nav
├── keystatic.config.tsx       # CMS schema (collections & singletons)
└── public/                    # Static assets (favicon, manifest)
```

---

## 🧑‍💼 Managing Content (Keystatic CMS)

Go to **`/keystatic`** to manage everything through a friendly admin UI:

| Collection / Singleton | Manages |
| --- | --- |
| **Home Page** | Hero, stats/counters, about intro, trust badges |
| **Site Settings & SEO** | Contact info, socials, default meta, offer banner |
| **Services** | 15+ wedding services with icons |
| **Wedding Packages** | Silver / Gold / Platinum / Royal tiers & features |
| **Destinations** | Destination wedding locations |
| **Process Steps** | The step-by-step planning journey |
| **Testimonials** | Couple reviews & ratings |
| **Team Members** | The atelier team |
| **Gallery** | Portfolio images with categories |
| **FAQs** | Questions with categories (powers FAQ schema) |
| **Blog Posts** | Rich Markdoc articles with tags & categories |

Content saves directly to files under `content/` in local mode. To enable
cloud/GitHub-based editing, switch `storage` in
[`keystatic.config.tsx`](./keystatic.config.tsx) to `{ kind: 'github', ... }` —
see the [Keystatic docs](https://keystatic.com/docs/github-mode).

### Images

Image fields accept a **URL** so the starter ships with beautiful imagery out of
the box (via Unsplash). Swap in your own CDN URLs from the admin, or switch the
fields to Keystatic's `image()` uploader for local assets. Remote image hosts are
allow-listed in [`next.config.ts`](./next.config.ts) — add yours there.

---

## 🎨 Design System

Brand tokens live in [`app/globals.css`](./app/globals.css) under `@theme`:

| Token | Value |
| --- | --- |
| Primary (Gold) | `#C89B3C` |
| Secondary (Cream) | `#F9F5EF` |
| Accent (Rose) | `#8E3B46` |
| Ink (Dark) | `#1C1C1C` |
| Background | `#FAFAFA` |

Fonts: **Playfair Display** (headings), **Poppins** (body), **Inter** (UI) — loaded
via `next/font` for zero layout shift.

---

## 🛠 Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, React 19)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Keystatic](https://keystatic.com) (headless, file-based CMS)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com) primitives
- [Lucide Icons](https://lucide.dev)

---

## 📈 Wiring Up the Lead Form

The consultation & contact forms currently simulate submission client-side.
To capture real leads, add a route handler (e.g. `app/api/lead/route.ts`) that
sends an email (Resend, Nodemailer) or writes to your CRM, then `fetch` it from
`components/forms/consultation-form.tsx` where the `// Simulate a network request`
comment is.

---

## 📄 License

Provided as a starter for your wedding-planning business. Replace placeholder
imagery and copy with your own before going live.


