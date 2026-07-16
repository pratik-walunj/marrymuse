import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, Clock, Sparkles, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { StarRating } from "@/components/shared/star-rating";
import { Reveal } from "@/components/shared/motion";
import { getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Book a Free Consultation",
  description:
    "Book your complimentary, no-obligation wedding consultation with MarryMuse. Limited 2026 & 2027 dates available.",
  path: "/book",
});

const perks = [
  "A complimentary 45-minute design session",
  "Personalised concept & mood direction",
  "Transparent budget guidance",
  "No obligation, no pressure — ever",
];

export default async function BookPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHero
        eyebrow="Let's Begin"
        title="Book Your Free Consultation"
        description="Tell us about your dream wedding and our team will craft a bespoke plan just for you — within 24 hours."
        crumbs={[{ label: "Book Consultation" }]}
      />

      <section className="bg-canvas py-20 md:py-28">
        <div className="container-luxe grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Left: reassurance */}
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-dark">
              <Sparkles className="size-4" /> Free & No Obligation
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold text-ink md:text-4xl">
              Your dream wedding starts with a conversation
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Share a few details and we&apos;ll be in touch within 24 hours to
              begin designing a celebration that&apos;s unmistakably yours.
            </p>

            <ul className="mt-8 space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary-dark" />
                  <span className="text-ink/80">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-3 gap-4 rounded-3xl border border-line bg-white p-5 shadow-soft">
              {[
                { icon: ShieldCheck, label: "Trusted", value: "5000+" },
                { icon: Clock, label: "Response", value: "< 24h" },
                { icon: Sparkles, label: "Rating", value: "4.9★" },
              ].map(({ icon: Ic, label, value }) => (
                <div key={label} className="text-center">
                  <Ic className="mx-auto size-6 text-primary-dark" />
                  <p className="mt-2 font-display text-xl font-bold text-ink">{value}</p>
                  <p className="text-xs text-muted">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-secondary p-4">
              <StarRating rating={5} />
              <p className="text-sm text-ink/70">
                “Best decision of our wedding.” — 5,000+ couples
              </p>
            </div>

            <a
              href={`tel:${settings.phone.replace(/\s/g, "")}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary-dark hover:underline"
            >
              <Phone className="size-4" /> Prefer to talk? Call {settings.phone}
            </a>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.1}>
            <div className="rounded-[2rem] border border-line bg-white p-6 shadow-luxe md:p-9">
              <ConsultationForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
