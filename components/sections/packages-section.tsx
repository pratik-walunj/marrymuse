import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type PackageItem = {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  popular: boolean;
  accent: string;
  features: readonly string[];
};

export function PackagesSection({
  packages,
  withHeading = true,
  className,
}: {
  packages: PackageItem[];
  withHeading?: boolean;
  className?: string;
}) {
  return (
    <section className={className ?? "bg-canvas py-24 md:py-32"} id="packages">
      <div className="container-luxe">
        {withHeading && (
          <SectionHeading
            eyebrow="Wedding Packages"
            title="Curated collections for every celebration"
            description="Transparent, all-inclusive packages — each fully customisable to your guest list, guest experience and dreams."
          />
        )}

        <Stagger className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-4 md:grid-cols-2">
          {packages.map((pkg) => (
            <StaggerItem key={pkg.slug} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2",
                  pkg.popular
                    ? "border-primary bg-ink text-white shadow-luxe"
                    : "border-line bg-white shadow-soft hover:shadow-luxe"
                )}
              >
                {pkg.popular && (
                  <Badge
                    variant="gold"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white"
                  >
                    <Sparkles className="size-3" /> Most Popular
                  </Badge>
                )}

                <h3
                  className={cn(
                    "font-display text-2xl font-semibold",
                    pkg.popular ? "text-white" : "text-ink"
                  )}
                >
                  {pkg.name}
                </h3>
                <p
                  className={cn(
                    "mt-1.5 min-h-10 text-sm",
                    pkg.popular ? "text-white/60" : "text-muted"
                  )}
                >
                  {pkg.tagline}
                </p>

                <div className="mt-5 border-t border-dashed pt-5"
                  style={{ borderColor: pkg.popular ? "rgba(255,255,255,0.15)" : undefined }}
                >
                  <span
                    className={cn(
                      "text-[11px] uppercase tracking-wider",
                      pkg.popular ? "text-primary-light" : "text-muted"
                    )}
                  >
                    {pkg.priceNote}
                  </span>
                  <p
                    className={cn(
                      "font-display text-3xl font-bold",
                      pkg.popular ? "text-gradient-gold" : "text-ink"
                    )}
                  >
                    {pkg.price}
                  </p>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          pkg.popular ? "text-primary-light" : "text-primary-dark"
                        )}
                      />
                      <span className={pkg.popular ? "text-white/80" : "text-ink/75"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="mt-7 w-full"
                  variant={pkg.popular ? "primary" : "outline"}
                >
                  <Link href="/book">
                    Get Started <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-10 text-center text-sm text-muted">
          Need something bespoke?{" "}
          <Link href="/contact" className="font-medium text-primary-dark underline underline-offset-4">
            Talk to our team
          </Link>{" "}
          for a fully tailored proposal.
        </p>
      </div>
    </section>
  );
}
