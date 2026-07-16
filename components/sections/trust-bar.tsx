import { Star, BadgeCheck, Heart, Users } from "lucide-react";
import { Reveal } from "@/components/shared/motion";

/** Social-proof strip: rating stats + scrolling partner/award marquee. */
export function TrustBar({ brands }: { brands: readonly string[] }) {
  const stats = [
    { icon: Star, value: "4.9/5", label: "Google Rating" },
    { icon: BadgeCheck, value: "WeddingWire", label: "Rated Vendor" },
    { icon: Heart, value: "5,000+", label: "Happy Couples" },
    { icon: Users, value: "180K+", label: "Instagram" },
  ];
  const loop = [...brands, ...brands];

  return (
    <section className="border-y border-line bg-white py-10">
      <div className="container-luxe">
        <Reveal className="mb-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {stats.map(({ icon: Ic, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary-dark">
                <Ic className="size-5" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold leading-none text-ink">
                  {value}
                </p>
                <p className="text-xs text-muted">{label}</p>
              </div>
            </div>
          ))}
        </Reveal>

        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted">
          Trusted by the finest venues & brands
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-12">
            {loop.map((brand, i) => (
              <span
                key={i}
                className="whitespace-nowrap font-display text-xl font-medium text-ink/40 transition-colors hover:text-primary-dark"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
