import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { SocialLink } from "@/components/shared/social-link";
import { Reveal } from "@/components/shared/motion";
import { getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with MarryMuse. Call, WhatsApp or email us, or visit our Pune studio. We'd love to hear about your wedding.",
  path: "/contact",
});

export default async function ContactPage() {
  const s = await getSettings();
  const phoneClean = s.phone.replace(/\s/g, "");

  const cards = [
    { icon: MapPin, title: "Visit Us", value: s.address, href: `https://maps.google.com/?q=${encodeURIComponent(s.address)}`, cta: "Get directions" },
    { icon: Phone, title: "Call Us", value: s.phone, href: `tel:${phoneClean}`, cta: "Call now" },
    { icon: MessageCircle, title: "WhatsApp", value: "Chat with our team", href: `https://wa.me/${s.whatsapp}`, cta: "Start chat" },
    { icon: Mail, title: "Email Us", value: s.email, href: `mailto:${s.email}`, cta: "Send email" },
  ];

  const socials = [
    { icon: Instagram, href: s.instagram, label: "Instagram" },
    { icon: Facebook, href: s.facebook, label: "Facebook" },
    { icon: Youtube, href: s.youtube, label: "YouTube" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Let's Talk Weddings"
        description="Have a question or ready to begin? We'd love to hear from you. Reach out any way you like."
        crumbs={[{ label: "Contact" }]}
      />

      {/* Contact cards */}
      <section className="bg-canvas py-20 md:py-24">
        <div className="container-luxe grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Ic, title, value, href, cta }) => (
            <Reveal key={title}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-soft transition-all hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-luxe"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary-dark transition-colors group-hover:bg-primary group-hover:text-white">
                  <Ic className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-1 flex-1 text-sm text-muted">{value}</p>
                <span className="mt-4 text-sm font-medium text-primary-dark">{cta} →</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form + map */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container-luxe grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Send a Message"
              title="Tell us about your day"
              align="left"
            />
            <div className="mt-8 rounded-[2rem] border border-line bg-white p-6 shadow-luxe md:p-8">
              <ConsultationForm compact />
            </div>
          </div>

          <div className="flex flex-col">
            <SectionHeading eyebrow="Find Us" title="Our Pune studio" align="left" />
            <div className="mt-8 flex-1 overflow-hidden rounded-[2rem] border border-line shadow-luxe">
              <iframe
                title="MarryMuse studio location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.contact.mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                className="h-full min-h-[360px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <Clock className="size-5 text-primary-dark" />
                <div>
                  <p className="text-sm font-semibold text-ink">Business hours</p>
                  <p className="text-sm text-muted">{s.hours}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {socials.map(({ icon: Ic, href, label }) => (
                  <SocialLink
                    key={label}
                    href={href}
                    label={label}
                    className="grid size-10 place-items-center rounded-full border border-line text-ink transition-all hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <Ic className="size-4" />
                  </SocialLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
