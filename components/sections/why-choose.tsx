import {
  Award,
  Gem,
  BadgeIndianRupee,
  HandHeart,
  Users,
  Clock,
  ShieldCheck,
  Crown,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/motion";

const reasons = [
  { icon: Award, title: "15+ Years Experience", desc: "A decade and a half of flawlessly executed celebrations." },
  { icon: Gem, title: "Luxury Planning", desc: "Couture design and impeccable taste at every touchpoint." },
  { icon: BadgeIndianRupee, title: "Transparent Pricing", desc: "Clear, honest budgets with absolutely no hidden costs." },
  { icon: ShieldCheck, title: "Trusted Vendors", desc: "A hand-picked network of India's most reliable partners." },
  { icon: HandHeart, title: "Dedicated Planner", desc: "One expert who knows your vision inside out, start to finish." },
  { icon: Clock, title: "24×7 Support", desc: "We're a message away, whenever you need us." },
  { icon: Users, title: "Budget Friendly", desc: "Great design at every scale — tailored to your means." },
  { icon: Crown, title: "Premium Execution", desc: "Grand ambitions delivered with calm, precise perfection." },
];

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <div aria-hidden className="absolute inset-0 bg-radial-gold opacity-70" />
      <div className="container-luxe relative">
        <SectionHeading
          light
          eyebrow="Why Couples Choose Us"
          title="The MarryMuse difference"
          description="We don't just plan weddings — we protect your peace of mind and elevate every single moment."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Ic, title, desc }) => (
            <StaggerItem key={title}>
              <div className="group h-full rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:bg-white/10">
                <span className="grid size-12 place-items-center rounded-2xl bg-primary/15 text-primary-light transition-colors group-hover:bg-primary group-hover:text-white">
                  <Ic className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
