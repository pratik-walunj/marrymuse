import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye, Heart, Sparkles } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/motion";
import { TeamSection } from "@/components/sections/team-section";
import { WhyChoose } from "@/components/sections/why-choose";
import { CtaBand } from "@/components/sections/cta-band";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { getHome, getTeam, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us — Our Story",
  description:
    "Meet MarryMuse — a luxury wedding atelier founded in 2011, devoted to crafting timeless celebrations across India and the world.",
  path: "/about",
});

const values = [
  { icon: Heart, title: "Love-Led", desc: "Every decision serves your love story, first and always." },
  { icon: Sparkles, title: "Detail-Obsessed", desc: "The magic is in the details others overlook." },
  { icon: Target, title: "Reliable", desc: "We do what we say — calmly, precisely, on time." },
  { icon: Eye, title: "Visionary", desc: "We see what your wedding could be, then make it real." },
];

export default async function AboutPage() {
  const [home, team, settings] = await Promise.all([
    getHome(),
    getTeam(),
    getSettings(),
  ]);
  const phoneHref = `tel:${settings.phone.replace(/\s/g, "")}`;

  return (
    <>
      <PageHero
        eyebrow="About MarryMuse"
        title="Where Love Meets Artistry"
        description="A luxury wedding atelier crafting once-in-a-lifetime celebrations since 2011."
        image="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1920&q=80"
        crumbs={[{ label: "About" }]}
      />

      {/* Founder story */}
      <section className="bg-canvas py-24 md:py-32">
        <div className="container-luxe grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-luxe">
              <Image
                src={home?.aboutImage ?? "https://images.unsplash.com/photo-1519657337289-077653f724ed?auto=format&fit=crop&w=1200&q=80"}
                alt="MarryMuse founder"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow="Our Story" title={home?.aboutTitle ?? "A love letter to weddings"} align="left" />
            <Reveal delay={0.1}>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
                <p>{home?.aboutBody}</p>
                <p>
                  What began as one woman&apos;s passion has grown into a
                  full-service house of planners, designers and artisans — yet
                  our promise remains unchanged: to make your wedding feel as
                  extraordinary as your love.
                </p>
              </div>
              <div className="mt-8">
                <p className="font-display text-3xl text-gradient-rose">
                  {home?.founderName ?? "Aanya Kapoor"}
                </p>
                <p className="text-sm uppercase tracking-wider text-muted">
                  {home?.founderRole ?? "Founder & Creative Director"}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-ink py-16">
        <div className="container-luxe grid grid-cols-2 gap-8 md:grid-cols-4">
          {(home?.stats ?? []).map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl font-bold text-gradient-gold">
                <AnimatedCounter value={s.value ?? 0} suffix={s.suffix ?? "+"} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="container-luxe grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            { icon: Target, title: "Our Mission", body: "To design and deliver flawless, deeply personal weddings that let couples be fully present — free of stress, rich in joy — on the most important day of their lives." },
            { icon: Eye, title: "Our Vision", body: "To be India's most loved luxury wedding house, known worldwide for artistry, integrity and celebrations that feel like living works of art." },
          ].map(({ icon: Ic, title, body }) => (
            <Reveal key={title}>
              <div className="h-full rounded-3xl border border-line bg-white p-9 shadow-soft">
                <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary-dark">
                  <Ic className="size-7" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-canvas py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading eyebrow="What We Stand For" title="Our values" description="The principles behind every wedding we touch." />
          <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Ic, title, desc }) => (
              <StaggerItem key={title}>
                <div className="group h-full rounded-3xl border border-line bg-white p-7 text-center shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-luxe">
                  <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary-dark transition-colors group-hover:from-primary group-hover:to-primary-dark group-hover:text-white">
                    <Ic className="size-7" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <TeamSection team={team} />
      <WhyChoose />
      <CtaBand phoneHref={phoneHref} />
    </>
  );
}
