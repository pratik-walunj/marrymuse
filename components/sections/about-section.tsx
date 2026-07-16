import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  body: string;
  image: string;
  founderName: string;
  founderRole: string;
};

const pillars = [
  "Fully bespoke, end-to-end planning",
  "Award-winning in-house design studio",
  "A dedicated planner for every couple",
  "Transparent pricing, zero surprises",
];

export function AboutSection({
  title,
  body,
  image,
  founderName,
  founderRole,
}: Props) {
  return (
    <section className="bg-canvas py-24 md:py-32">
      <div className="container-luxe grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Images */}
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-luxe">
            <Image
              src={image}
              alt="MarryMuse founder and design team"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 w-52 rounded-2xl border border-line bg-white/90 p-5 shadow-luxe backdrop-blur md:-right-6">
            <p className="font-display text-4xl font-bold text-gradient-gold">15+</p>
            <p className="mt-1 text-sm font-medium text-ink">
              Years crafting dream weddings
            </p>
          </div>
          <div
            aria-hidden
            className="absolute -left-8 -top-8 -z-10 size-40 rounded-full bg-primary/10 blur-2xl"
          />
        </Reveal>

        {/* Copy */}
        <div>
          <SectionHeading
            eyebrow="About MarryMuse"
            title={title}
            align="left"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-muted">{body}</p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {pillars.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/15 text-primary-dark">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-sm text-ink/80">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Button asChild size="lg">
                <Link href="/about">
                  Our Story <ArrowRight className="size-4" />
                </Link>
              </Button>
              <div className="flex flex-col">
                <span className="font-display text-2xl text-gradient-rose">
                  {founderName}
                </span>
                <span className="text-xs uppercase tracking-wider text-muted">
                  {founderRole}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
