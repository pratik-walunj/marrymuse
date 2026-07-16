import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { PackagesSection } from "@/components/sections/packages-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/shared/motion";
import { getPackages, getFaqs, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Wedding Packages & Pricing",
  description:
    "Transparent luxury wedding packages — Silver, Gold, Platinum & Royal. Compare inclusions and find the perfect fit for your celebration.",
  path: "/packages",
});

const compareRows: { label: string; values: (string | boolean)[] }[] = [
  { label: "Guest capacity", values: ["150", "350", "600", "Unlimited"] },
  { label: "Events managed", values: ["1", "3", "5", "Multi-day"] },
  { label: "Dedicated planner", values: [true, true, true, true] },
  { label: "Venue management", values: [true, true, true, true] },
  { label: "Décor & design", values: ["Essential", "Premium", "Couture", "Bespoke"] },
  { label: "Photography", values: [true, true, true, true] },
  { label: "Cinematic film", values: [false, true, true, true] },
  { label: "Entertainment", values: [false, true, true, "Headline"] },
  { label: "Guest accommodation", values: [false, true, true, true] },
  { label: "Honeymoon planning", values: [false, false, true, true] },
];

const tiers = ["Silver", "Gold", "Platinum", "Royal"];

export default async function PackagesPage() {
  const [packages, faqs, settings] = await Promise.all([
    getPackages(),
    getFaqs(),
    getSettings(),
  ]);
  const phoneHref = `tel:${settings.phone.replace(/\s/g, "")}`;
  const pricingFaqs = faqs.filter((f) => f.category === "Pricing");

  return (
    <>
      <PageHero
        eyebrow="Wedding Packages"
        title="Find Your Perfect Package"
        description="Transparent, all-inclusive collections — each fully customisable to your dreams and budget."
        image="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80"
        crumbs={[{ label: "Packages" }]}
      />

      <PackagesSection packages={packages} withHeading className="bg-canvas py-24 md:py-32" />

      {/* Comparison table */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Compare"
            title="Compare our packages"
            description="A side-by-side look at what's included in each collection."
          />
          <Reveal className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[720px] overflow-hidden rounded-3xl border border-line bg-white text-left shadow-soft">
              <thead>
                <tr className="border-b border-line bg-secondary/60">
                  <th className="p-5 font-display text-lg font-semibold text-ink">
                    Features
                  </th>
                  {tiers.map((t) => (
                    <th
                      key={t}
                      className="p-5 text-center font-display text-lg font-semibold text-ink"
                    >
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 ? "bg-secondary/30" : "bg-white"}
                  >
                    <td className="p-5 text-sm font-medium text-ink">{row.label}</td>
                    {row.values.map((v, j) => (
                      <td key={j} className="p-5 text-center text-sm text-ink/80">
                        {typeof v === "boolean" ? (
                          v ? (
                            <Check className="mx-auto size-5 text-primary-dark" />
                          ) : (
                            <Minus className="mx-auto size-5 text-line" />
                          )
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {pricingFaqs.length > 0 && (
        <FaqSection
          faqs={pricingFaqs}
          withFilter={false}
          className="bg-canvas py-24 md:py-32"
        />
      )}

      <CtaBand phoneHref={phoneHref} />
    </>
  );
}
