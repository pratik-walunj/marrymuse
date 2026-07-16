import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/shared/icon";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";

export type ServiceItem = {
  slug: string;
  title: string;
  icon: string;
  excerpt: string;
};

export function ServicesSection({
  services,
  limit,
  withCta = true,
  className,
}: {
  services: ServiceItem[];
  limit?: number;
  withCta?: boolean;
  className?: string;
}) {
  const items = limit ? services.slice(0, limit) : services;

  return (
    <section className={className ?? "bg-secondary py-24 md:py-32"} id="planning">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="What We Do"
          title="A full suite of luxury wedding services"
          description="From the first spark of an idea to the final farewell, every detail is designed, sourced and delivered by our specialist team."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => (
            <StaggerItem key={service.slug}>
              <Link
                href="/services"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-luxe"
              >
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 size-28 rounded-full bg-primary/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-primary/10"
                />
                <span className="relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary-dark transition-colors group-hover:from-primary group-hover:to-primary-dark group-hover:text-white">
                  <Icon name={service.icon} className="size-7" />
                </span>
                <h3 className="relative mt-6 font-display text-xl font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {service.excerpt}
                </p>
                <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary-dark">
                  Learn more
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        {withCta && (
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/services">Explore All Services</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
