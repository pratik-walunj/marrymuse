# MarryMuse — Project Documentation

> **A premium, high-converting luxury wedding-planner website** built with Next.js 16, Keystatic CMS, Tailwind CSS v4 and Framer Motion. Database-free, CMS-driven, SEO-complete and fully responsive.

- **Live (dev):** `http://localhost:3000`
- **CMS admin (dev):** `http://localhost:3000/keystatic`
- **Status:** Front-end + CMS complete and production-buildable. Back-end integrations (lead delivery, CMS auth, analytics, deploy) are the remaining "go-live" steps — see [Part B](#part-b--what-is-needed-for-a-complete-end-to-end-project).

---

## Table of Contents

1. [Part A — What Is Already Built](#part-a--what-is-already-built)
   - [Tech stack](#1-tech-stack)
   - [How it works (architecture)](#2-how-it-works-architecture)
   - [Folder structure](#3-folder-structure)
   - [Pages & routes](#4-pages--routes)
   - [CMS (Keystatic) content model](#5-cms-keystatic-content-model)
   - [Component library](#6-component-library)
   - [Design system](#7-design-system)
   - [Conversion features](#8-conversion-rate-optimization-features)
   - [SEO implementation](#9-seo-implementation)
   - [Animations](#10-animations)
   - [Responsiveness & accessibility](#11-responsiveness--accessibility)
2. [Part B — What Is Needed for a Complete End-to-End Project](#part-b--what-is-needed-for-a-complete-end-to-end-project)
3. [Running & building](#running--building-the-project)
4. [Content editing guide](#content-editing-guide)

---

# Part A — What Is Already Built

## 1. Tech Stack

| Layer | Technology | Version | Purpose |
| --- | --- | --- | --- |
| Framework | **Next.js** (App Router) | 16.2 | SSR/SSG, routing, image optimisation |
| Language | **TypeScript** | 5.7 | Type safety |
| UI runtime | **React** | 19.2 | Server + Client Components |
| Styling | **Tailwind CSS** | v4.3 | Utility-first CSS (CSS-first config) |
| CMS | **Keystatic** | 0.5.51 | Git/file-based headless CMS (no DB) |
| Content rendering | **Markdoc** | 0.4 | Rich blog content |
| Animation | **Framer Motion** | 12.42 | Scroll reveals, sliders, counters |
| UI primitives | **Radix UI** | latest | Accessible accordion, dialog, label, slot |
| Icons | **Lucide React** | 0.469 | Icon set |
| Utilities | clsx, tailwind-merge, class-variance-authority | — | Class composition & variants |

**No database. No external services required to run.** All content is stored as human-readable YAML / Markdoc files in `content/`.

---

## 2. How It Works (Architecture)

```
┌────────────────────┐      ┌──────────────────────┐      ┌───────────────────────┐
│  content/*.yaml     │      │  Keystatic Reader     │      │  Server Components     │
│  content/*.mdoc     │ ───► │  lib/reader.ts        │ ───► │  app/(site)/**/page.tsx│
│  (edited via /keystatic)   │  lib/content.ts (typed│      │  render HTML on server │
└────────────────────┘      │  helpers + fallbacks) │      └──────────┬────────────┘
                            └──────────────────────┘                 │
                                                                     ▼
                            ┌──────────────────────┐      ┌───────────────────────┐
                            │  Client Components     │◄────│  Interactive islands   │
                            │  (forms, sliders,      │      │  ("use client")        │
                            │   menus, animations)   │      └───────────────────────┘
                            └──────────────────────┘
```

- **Content** lives as flat files. Editors change them through the **Keystatic admin UI** at `/keystatic`, which reads/writes the files via the API route `app/api/keystatic/[[...params]]/route.ts`.
- **`lib/reader.ts`** creates a Keystatic `Reader` over `content/`.
- **`lib/content.ts`** wraps the reader with **typed, sorted helper functions** (`getServices()`, `getPackages()`, `getSettings()`, …) that also provide **safe fallbacks** so a page never crashes on missing content.
- **Pages are React Server Components** — they `await` those helpers and render fully on the server (fast, SEO-friendly). Only genuinely interactive pieces are Client Components (`"use client"`).
- A **route group `(site)`** wraps all marketing pages with the shared header/footer/widgets, while the `/keystatic` admin renders on its own without that chrome.

---

## 3. Folder Structure

```
marrymuse/
├── app/
│   ├── (site)/                      # Marketing pages (shared chrome via layout.tsx)
│   │   ├── layout.tsx               # Header + Footer + conversion widgets
│   │   ├── page.tsx                 # HOME
│   │   ├── about/ services/ packages/ destinations/
│   │   ├── gallery/ testimonials/ faq/ contact/ book/
│   │   ├── blog/ + blog/[slug]/     # Blog list + dynamic post (Markdoc)
│   │   └── privacy/ terms/          # Legal pages
│   ├── keystatic/                   # CMS admin SPA route
│   ├── api/keystatic/               # CMS read/write API handler
│   ├── layout.tsx                   # Root layout (fonts, <html>, org JSON-LD)
│   ├── globals.css                  # Design system (Tailwind v4 @theme + utilities)
│   ├── sitemap.ts / robots.ts       # SEO endpoints
│   └── loading.tsx / error.tsx / not-found.tsx
├── components/
│   ├── ui/          # 8 primitives: button, card, badge, accordion, input, textarea, label, dialog
│   ├── layout/      # header, mobile-nav, footer, logo
│   ├── sections/    # 12 reusable page sections (hero, services, packages, …)
│   ├── shared/      # motion, counters, page-hero, icons, conversion widgets, social-link
│   ├── forms/       # consultation-form, newsletter-form
│   └── blog/        # markdoc-content, blog-list, share-buttons
├── content/         # 87 CMS content files (see §5)
├── lib/             # utils, reader, content helpers, seo, site config, nav model
├── public/          # favicon.svg, site.webmanifest
├── keystatic.config.tsx             # CMS schema (collections + singletons)
├── next.config.ts / tsconfig.json / postcss.config.mjs
├── README.md / DOCUMENTATION.md
└── package.json
```

**Totals:** 23 route/handler files · 41 components · 6 lib modules · 87 content files.

---

## 4. Pages & Routes

| Route | Type | Description |
| --- | --- | --- |
| `/` | Static | Home — hero, trust bar, about, services, why-choose, packages, destinations, process, gallery preview, testimonials, team, FAQ, CTA |
| `/about` | Static | Founder story, mission/vision, stats, values, team, why-choose |
| `/services` | Static | 15+ services grid, planning process, Service JSON-LD |
| `/packages` | Static | Silver/Gold/Platinum/Royal cards + **comparison table** + pricing FAQ |
| `/destinations` | Static | 12 destination cards + process |
| `/gallery` | Static | Masonry gallery with **category filters + lightbox** |
| `/testimonials` | Static | Slider + review wall + video-review placeholders |
| `/blog` | Static | Post grid with **live search + category filter** |
| `/blog/[slug]` | **SSG** | Markdoc article, share buttons, tags, related posts, Article + Breadcrumb JSON-LD |
| `/faq` | Static | Accordion with category filter + **FAQPage JSON-LD** |
| `/contact` | Static | Contact cards, Google Map embed, message form, socials |
| `/book` | Static | Consultation lead form + trust panel |
| `/privacy`, `/terms` | Static | Legal pages |
| `/keystatic` | Dynamic | CMS admin UI |
| `/api/keystatic/*` | Dynamic | CMS read/write handler |
| `/sitemap.xml`, `/robots.txt` | Generated | SEO endpoints |
| `*` (404) | — | Branded not-found page |

Plus global **`loading.tsx`** (branded spinner) and **`error.tsx`** (error boundary).

---

## 5. CMS (Keystatic) Content Model

Defined in **`keystatic.config.tsx`**. Storage mode: **`local`** (files on disk).

### Collections (repeatable content)

| Collection | Count | Key fields |
| --- | --- | --- |
| **services** | 15 | title, icon, excerpt, featured, order |
| **packages** | 4 | name, tagline, price, features[], popular, accent |
| **destinations** | 12 | name, region, image, description, startingPrice, highlights[] |
| **process** | 7 | title, step, icon, description |
| **testimonials** | 6 | name, location, weddingType, rating, quote, image |
| **team** | 5 | name, role, image, bio, instagram |
| **faqs** | 20 | question, answer, category, order |
| **gallery** | 12 | title, image, category, size |
| **blog** | 4 | title, excerpt, cover, category, author, publishedAt, tags[], **content (Markdoc)** |

### Singletons (one-off content)

| Singleton | Manages |
| --- | --- |
| **home** | Hero (eyebrow/title/subtitle/image), stat counters, about intro, founder, trust badges |
| **settings** | Site name/tagline, default SEO meta, phone, WhatsApp, email, address, hours, social links, offer-banner text |

> **Images** use URL fields so the starter ships with real imagery out of the box. Social links default to `"#"` (rendered as disabled buttons) until real profiles are added.

---

## 6. Component Library

### UI primitives (`components/ui/`)
`button` (7 variants via CVA), `card`, `badge`, `accordion` (Radix), `dialog` (Radix), `input`, `textarea`, `label` (Radix). All accessible and theme-consistent.

### Layout (`components/layout/`)
- **header** — sticky, transparent-over-hero → solid-on-scroll, hover **mega menu**, gold logo.
- **mobile-nav** — labeled **"☰ Menu" pill** + animated slide-in drawer (body-scroll lock, closes on route change).
- **footer** — newsletter band, link columns, contact block, socials, legal bar.
- **logo** — interlocking-rings gold wordmark.

### Sections (`components/sections/`) — reusable across pages
`hero`, `trust-bar`, `about-section`, `services-section`, `why-choose`, `packages-section`, `destinations-section`, `process-section`, `gallery-grid`, `testimonials-section` (auto-slider), `team-section`, `faq-section`, `cta-band`.

### Shared (`components/shared/`)
`motion` (Reveal/Stagger/Floating wrappers), `animated-counter`, `section-heading`, `page-hero`, `star-rating`, `icon` (Lucide resolver), `social-link` (disable-until-live), and the conversion widgets below.

### Forms (`components/forms/`)
`consultation-form` (9 fields, validation, success animation), `newsletter-form`.

### Blog (`components/blog/`)
`markdoc-content` (renders CMS Markdoc → styled prose), `blog-list` (search/filter), `share-buttons`.

---

## 7. Design System

Defined in **`app/globals.css`** using Tailwind v4's `@theme`.

| Token | Value |
| --- | --- |
| Primary (Gold) | `#C89B3C` |
| Secondary (Cream) | `#F9F5EF` |
| Accent (Rose) | `#8E3B46` |
| Ink (Dark) | `#1C1C1C` |
| Background | `#FAFAFA` |

- **Fonts** (via `next/font`, zero layout shift): **Playfair Display** (headings), **Poppins** (body), **Inter** (UI).
- **Custom utilities:** `.glass` / `.glass-dark` (glassmorphism), `.text-gradient-gold` / `.text-gradient-rose`, `.shadow-soft/luxe/gold`, `.bg-radial-gold`, `.container-luxe`.
- **Keyframes:** float, shimmer, marquee, accordion, dialog transitions.
- Custom scrollbar, selection colour, focus-visible rings, reduced-motion support.

---

## 8. Conversion-Rate-Optimization Features

| Feature | Component | Behaviour |
| --- | --- | --- |
| Sticky header CTA | `header` | Always-visible "Book Consultation" |
| Floating WhatsApp + Call | `floating-actions` | Expandable FAB, pulse animation, back-to-top |
| Offer banner + countdown | `offer-banner` | Dismissible urgency bar with live daily countdown |
| Exit-intent popup | `exit-intent` | Fires on mouse-leave / dwell, once per session |
| Recent-bookings proof | `recent-bookings` | Rotating "just booked" social-proof toasts |
| Lead form | `consultation-form` | Validated, success animation, budget/guests selects |
| Trust badges / guarantee | multiple | Ratings, "5000+ couples", satisfaction promise |
| Testimonials everywhere | `testimonials-section` | Home, testimonials page, book page |

> All lead capture is **front-end only right now** — wiring it to a real destination is the #1 go-live task (see Part B).

---

## 9. SEO Implementation

- **Dynamic metadata** per page via `lib/seo.ts` (`buildMetadata()`): title template, description, canonical, robots, **Open Graph**, **Twitter cards**.
- **Structured data (JSON-LD):** `LocalBusiness` (root), `WebSite` + `SearchAction` (home), `Service`/`OfferCatalog` (services), `FAQPage` (faq), `BlogPosting` + `BreadcrumbList` (blog posts).
- **`sitemap.xml`** (static routes + blog posts) and **`robots.txt`** (blocks `/keystatic`, `/api`).
- **Image SEO:** `next/image` (AVIF/WebP, lazy loading, responsive `sizes`, alt text).
- **Metadata base URL / favicon / web manifest** configured.

---

## 10. Animations

Framer Motion throughout: scroll-reveal fades/slides (`Reveal`), staggered grids (`Stagger`), floating decorations, **number count-up** counters, parallax hero blobs, image hover-zoom, **auto-advancing testimonial slider**, animated mega-menu & mobile drawer, gallery **lightbox** with keyboard nav, animated hamburger↔close. All respect `prefers-reduced-motion`.

---

## 11. Responsiveness & Accessibility

- **Breakpoints verified 320 → 1920px** with **zero horizontal overflow** (grids use base `grid-cols-1`, buttons `max-w-full`).
- Touch-friendly targets; labeled "Menu" pill for mobile nav.
- **Accessibility:** semantic HTML, ARIA labels on icon buttons, `focus-visible` rings, alt text, keyboard-operable dialog/accordion/lightbox, `aria-expanded`/`aria-disabled` states, reduced-motion.

---

# Part B — What Is Needed for a Complete End-to-End Project

The site is a complete, buildable **front-end + CMS**. To turn it into a **fully operational, revenue-generating production system**, the following need to be added. Ordered by priority.

### 🔴 Priority 1 — Make it functional (required to launch)

| # | Task | Why / How |
| --- | --- | --- |
| 1 | **Lead form backend** | Forms currently only simulate submission. Create `app/api/lead/route.ts` that emails the team and/or writes to a CRM. Then `fetch()` it from `components/forms/consultation-form.tsx` (replace the `// Simulate a network request` block). Recommended: **[Resend](https://resend.com)** or Nodemailer for email; optionally push to HubSpot/Zoho/Google Sheets. |
| 2 | **Newsletter backend** | Wire `components/forms/newsletter-form.tsx` to Mailchimp / Brevo / ConvertKit API (or Resend audiences). |
| 3 | **CMS auth for production** | Local mode only writes files on the dev machine. For a hosted editor, switch `keystatic.config.tsx` `storage` to **`github`** (or `cloud`) mode so editors log in and commits are made via GitHub. [Docs](https://keystatic.com/docs/github-mode). Requires a GitHub App + env vars. |
| 4 | **Real content & imagery** | Replace placeholder Unsplash URLs, demo copy, testimonials, team, and pricing with the real business's assets. Consider switching image fields to Keystatic's `image()` uploader and hosting on the repo or a CDN. |
| 5 | **Environment variables** | Add `.env.local` for API keys (email, CRM, Keystatic GitHub, analytics). Document them and add `.env.example`. |
| 6 | **Deploy** | Recommended: **Vercel** (first-class Next.js support). Connect the repo, set env vars, deploy. Alternatives: Netlify, Cloudflare, self-hosted Node. |
| 7 | **Domain + DNS + HTTPS** | Point the real domain, set `siteConfig.url` in `lib/site.ts` (used by canonical URLs, sitemap, OG). |

### 🟠 Priority 2 — Trust, growth & correctness

| # | Task | Notes |
| --- | --- | --- |
| 8 | **Analytics** | Add Google Analytics 4 / Vercel Analytics / Plausible. Track CTA clicks, form submits, WhatsApp taps for CRO. |
| 9 | **Real social & WhatsApp** | Replace `"#"` social links in CMS settings with live profiles; confirm the **WhatsApp Business** number and pre-filled message. |
| 10 | **Google Maps** | The embed uses a keyless URL (fine for basic use). For interactive/branded maps use the **Maps Embed/JS API** with a key. |
| 11 | **Consent / cookie banner** | If adding analytics/marketing cookies, add a GDPR/DPDP-compliant consent banner. |
| 12 | **Legal review** | Have the Privacy Policy & Terms reviewed by a professional; update the business's real legal details. |
| 13 | **OG image** | Replace the placeholder social-share image with a branded 1200×630 asset (`siteConfig.ogImage`). |
| 14 | **Form spam protection** | Add a honeypot / **hCaptcha / Cloudflare Turnstile** to the lead form. |

### 🟡 Priority 3 — Hardening & scale

| # | Task | Notes |
| --- | --- | --- |
| 15 | **Error monitoring** | Add **Sentry** (or similar) for runtime error + performance tracking. |
| 16 | **Automated tests** | Unit (Vitest/Jest), component (Testing Library), E2E (**Playwright**) for the booking flow, nav, forms. |
| 17 | **CI/CD** | GitHub Actions: lint + typecheck + build on PR; auto-deploy on merge. |
| 18 | **Security headers** | Add CSP, HSTS, X-Frame-Options via `next.config.ts` `headers()` or middleware. |
| 19 | **Rate limiting** | Protect the lead/newsletter API routes (e.g. Upstash Ratelimit). |
| 20 | **Lighthouse / a11y audit** | Run Lighthouse + axe on the deployed site; fix the LCP image hint (mark above-the-fold images `priority`) and any a11y gaps. |
| 21 | **Blog authoring polish** | Optional: add Markdoc custom tags (callouts, image galleries), an author collection, and category/tag archive pages. |
| 22 | **Internationalisation** | If needed, add `next-intl` for multi-language (₹ pricing already India-localised). |
| 23 | **Sitemap for images / news** | Extend sitemap with image entries if image SEO is a priority. |

### 📦 Suggested production dependencies (when implementing Part B)

```
resend                 # transactional email for lead form
@upstash/ratelimit     # API route rate limiting (optional)
@sentry/nextjs         # error monitoring (optional)
zod                    # server-side form validation (optional but recommended)
```

---

## Running & Building the Project

```bash
npm install      # install dependencies
npm run dev      # dev server → http://localhost:3000  (CMS at /keystatic)
npm run build    # production build (type-checked, all routes)
npm run start    # serve the production build
npm run lint     # lint
```

No environment variables are required to run the starter as-is.

---

## Content Editing Guide

1. Run `npm run dev` and open **`http://localhost:3000/keystatic`**.
2. Edit any collection or singleton — changes save to files under `content/`.
3. **Add a blog post:** Blog → Create, fill fields, write the body (Markdoc), Save.
4. **Change contact details / SEO / offer banner:** Site Settings & SEO singleton.
5. **Update hero, stats, about, trust badges:** Home Page singleton.
6. **Activate social links:** paste real URLs into Settings (and Team) — they auto-enable (a value starting with `http` becomes a live link; `"#"` stays a disabled button).

---

*Document generated for the MarryMuse project. Last updated: January 2026.*
