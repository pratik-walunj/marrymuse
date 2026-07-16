"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { StarRating } from "@/components/shared/star-rating";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

export type Testimonial = {
  slug: string;
  name: string;
  location: string;
  weddingType: string;
  rating: number;
  quote: string;
  image: string;
};

export function TestimonialsSection({
  testimonials,
  className,
}: {
  testimonials: Testimonial[];
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [dir, setDir] = React.useState(1);
  const count = testimonials.length;

  const go = React.useCallback(
    (next: number) => {
      setDir(next > index || (index === count - 1 && next === 0) ? 1 : -1);
      setIndex((next + count) % count);
    },
    [index, count]
  );

  React.useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % count);
    }, 6000);
    return () => clearInterval(id);
  }, [count]);

  if (!count) return null;
  const t = testimonials[index];

  return (
    <section className={className ?? "bg-secondary py-24 md:py-32"}>
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Love Notes"
          title="Words from our couples"
          description="Nothing means more to us than the trust of the families we serve."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <Quote
            aria-hidden
            className="absolute -left-2 -top-6 size-16 text-primary/15 md:-left-8"
          />

          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white p-8 shadow-luxe md:p-12">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={t.slug}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center"
              >
                <StarRating rating={t.rating} size={20} />
                <blockquote className="mt-6 font-display text-xl leading-relaxed text-ink text-balance md:text-2xl">
                  “{t.quote}”
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <span className="relative size-14 overflow-hidden rounded-full ring-2 ring-primary/30">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </span>
                  <div className="text-left">
                    <p className="font-display text-lg font-semibold text-ink">
                      {t.name}
                    </p>
                    <p className="text-sm text-muted">
                      {t.weddingType} · {t.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="grid size-11 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-primary hover:text-primary-dark"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.slug}
                  onClick={() => go(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index ? "w-6 bg-primary" : "w-2 bg-line hover:bg-primary/40"
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="grid size-11 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-primary hover:text-primary-dark"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
