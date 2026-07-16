import Link from "next/link";
import {
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { footerNav } from "@/lib/nav";
import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { SocialLink } from "@/components/shared/social-link";
import { getSettings } from "@/lib/content";

export async function Footer() {
  const s = await getSettings();
  const year = new Date().getFullYear();

  const socials = [
    { icon: Instagram, href: s.instagram, label: "Instagram" },
    { icon: Facebook, href: s.facebook, label: "Facebook" },
    { icon: Youtube, href: s.youtube, label: "YouTube" },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden bg-ink text-white/70">
      <div className="pointer-events-none absolute inset-0 bg-radial-gold opacity-60" />
      <div className="relative">
        {/* Newsletter band */}
        <div className="border-b border-white/10">
          <div className="container-luxe grid grid-cols-1 gap-8 py-14 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold text-white text-balance md:text-4xl">
                Let&apos;s plan something unforgettable.
              </h2>
              <p className="mt-3 max-w-md text-white/60">
                Join our list for wedding inspiration, planning tips and
                exclusive seasonal offers.
              </p>
            </div>
            <div className="md:justify-self-end md:w-full md:max-w-sm">
              <NewsletterForm />
              <p className="mt-3 text-xs text-white/40">
                No spam, ever. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="container-luxe grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              {s.tagline}. Crafting timeless weddings filled with love & luxury
              across India and the world since 2011.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Ic, href, label }) => (
                <SocialLink
                  key={label}
                  href={href}
                  label={label}
                  className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition-all hover:border-primary hover:bg-primary hover:text-white"
                >
                  <Ic className="size-4" />
                </SocialLink>
              ))}
            </div>
          </div>

          <FooterColumn title="Explore" links={footerNav.explore} />
          <FooterColumn title="Services" links={footerNav.services} />

          <div>
            <h3 className="mb-4 font-display text-lg font-semibold text-white">
              Get in touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-white/60">{s.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="size-4 shrink-0 text-primary" />
                <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {s.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="size-4 shrink-0 text-primary" />
                <a href={`mailto:${s.email}`} className="hover:text-white">
                  {s.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="size-4 shrink-0 text-primary" />
                <span className="text-white/60">{s.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="container-luxe flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/45 sm:flex-row">
            <p>
              © {year} {s.siteName}. All rights reserved. Crafted with love.
            </p>
            <div className="flex gap-6">
              {footerNav.legal.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 font-display text-lg font-semibold text-white">
        {title}
      </h3>
      <ul className="space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-white/60 transition-colors hover:text-primary-light"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
