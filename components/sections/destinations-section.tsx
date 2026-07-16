import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";

export type DestinationItem = {
  slug: string;
  name: string;
  region: string;
  image: string;
  description: string;
  startingPrice: string;
  highlights?: readonly string[];
};

export function DestinationsSection({
  destinations,
  limit,
  withHeading = true,
  withCta = true,
  className,
}: {
  destinations: DestinationItem[];
  limit?: number;
  withHeading?: boolean;
  withCta?: boolean;
  className?: string;
}) {
  const items = limit ? destinations.slice(0, limit) : destinations;

  return (
    <section className={className ?? "bg-secondary py-24 md:py-32"}>
      <div className="container-luxe">
        {withHeading && (
          <SectionHeading
            eyebrow="Destination Weddings"
            title="Say “I do” somewhere breathtaking"
            description="From lakeside palaces to tropical shores, we plan seamless destination weddings at the world's most coveted venues."
          />
        )}

        <Stagger className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((d) => (
            <StaggerItem key={d.slug} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-3xl shadow-soft transition-all duration-500 hover:shadow-luxe">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={d.image}
                    alt={`${d.name} destination wedding`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary-light">
                    <MapPin className="size-3.5" /> {d.region}
                  </div>
                  <h3 className="font-display text-2xl font-semibold">{d.name}</h3>
                  <p className="mt-1 max-h-0 overflow-hidden text-sm text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                    {d.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm">
                      <span className="text-white/60">from </span>
                      <span className="font-semibold text-primary-light">
                        {d.startingPrice}
                      </span>
                    </span>
                    <span className="grid size-9 place-items-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-primary">
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {withCta && (
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="dark">
              <Link href="/destinations">Explore All Destinations</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
