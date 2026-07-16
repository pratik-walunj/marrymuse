import { Icon } from "@/components/shared/icon";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/motion";

export type ProcessStep = {
  slug: string;
  title: string;
  step: number;
  icon: string;
  description: string;
};

export function ProcessSection({
  steps,
  className,
}: {
  steps: ProcessStep[];
  className?: string;
}) {
  return (
    <section className={className ?? "bg-white py-24 md:py-32"}>
      <div className="container-luxe">
        <SectionHeading
          eyebrow="How It Works"
          title="Your journey to the perfect day"
          description="A calm, guided process — so all you have to do is dream, decide and enjoy."
        />

        <Stagger className="relative mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block"
          />
          {steps.map((s) => (
            <StaggerItem key={s.slug} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <span className="grid size-16 place-items-center rounded-2xl border border-line bg-white text-primary-dark shadow-soft">
                    <Icon name={s.icon} className="size-7" />
                  </span>
                  <span className="absolute -right-2 -top-2 grid size-7 place-items-center rounded-full bg-primary text-xs font-bold text-white shadow-gold">
                    {s.step}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-14 text-center text-sm text-muted">
          Every step is handled by your dedicated planner — start to unforgettable finish.
        </Reveal>
      </div>
    </section>
  );
}
