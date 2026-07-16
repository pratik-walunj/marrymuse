"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

export type Faq = {
  slug: string;
  question: string;
  answer: string;
  category: string;
};

export function FaqSection({
  faqs,
  limit,
  withHeading = true,
  withFilter = true,
  className,
}: {
  faqs: Faq[];
  limit?: number;
  withHeading?: boolean;
  withFilter?: boolean;
  className?: string;
}) {
  const categories = React.useMemo(
    () => ["All", ...Array.from(new Set(faqs.map((f) => f.category)))],
    [faqs]
  );
  const [active, setActive] = React.useState("All");

  let list = active === "All" ? faqs : faqs.filter((f) => f.category === active);
  if (limit) list = list.slice(0, limit);

  return (
    <section className={className ?? "bg-canvas py-24 md:py-32"}>
      <div className="container-luxe">
        {withHeading && (
          <SectionHeading
            eyebrow="Questions & Answers"
            title="Everything you need to know"
            description="Can't find your answer? Our team is always a quick message away."
          />
        )}

        {withFilter && (
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  active === c
                    ? "bg-ink text-white shadow-soft"
                    : "border border-line bg-white text-ink/70 hover:border-primary/40 hover:text-primary-dark"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {list.map((f) => (
              <AccordionItem key={f.slug} value={f.slug}>
                <AccordionTrigger>{f.question}</AccordionTrigger>
                <AccordionContent>{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-auto min-h-14 whitespace-normal py-3 text-center leading-snug"
          >
            <Link href="/contact">Still have questions? Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
