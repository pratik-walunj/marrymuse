import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";

export function CtaBand({ phoneHref }: { phoneHref: string }) {
  return (
    <section className="py-24 md:py-28">
      <div className="container-luxe">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-center shadow-luxe md:px-16 md:py-24">
            <Image
              src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1600&q=80"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-25"
            />
            <div aria-hidden className="absolute inset-0 bg-radial-gold" />
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary-light backdrop-blur">
                <ShieldCheck className="size-4" /> 100% Satisfaction Promise
              </span>
              <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-white text-balance md:text-5xl">
                Let&apos;s design the wedding you&apos;ve always imagined
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
                Book your complimentary, no-obligation consultation today. Limited
                2026 & 2027 dates remaining.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/book">
                    Book Free Consultation <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="glass">
                  <a href={phoneHref}>
                    <Phone className="size-4" /> Call Us Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
