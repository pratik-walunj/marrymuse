import Image from "next/image";
import { Instagram } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { SocialLink } from "@/components/shared/social-link";
import { Stagger, StaggerItem } from "@/components/shared/motion";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  instagram?: string | null;
};

export function TeamSection({
  team,
  className,
}: {
  team: TeamMember[];
  className?: string;
}) {
  return (
    <section className={className ?? "bg-white py-24 md:py-32"}>
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Meet the Atelier"
          title="The people behind the magic"
          description="A close-knit team of planners, designers and storytellers devoted to your day."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <StaggerItem key={m.slug}>
              <div className="group text-center">
                <div className="relative mx-auto aspect-[3/4] overflow-hidden rounded-3xl shadow-soft">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <SocialLink
                    href={m.instagram}
                    label={`${m.name} on Instagram`}
                    className="absolute bottom-4 left-1/2 grid size-10 -translate-x-1/2 translate-y-3 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition-all duration-500 hover:bg-primary hover:text-white group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <Instagram className="size-4" />
                  </SocialLink>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                  {m.name}
                </h3>
                <p className="text-sm font-medium uppercase tracking-wider text-primary-dark">
                  {m.role}
                </p>
                {m.bio && (
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">
                    {m.bio}
                  </p>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
