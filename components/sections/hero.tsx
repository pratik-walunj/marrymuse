"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/shared/animated-counter";

type Stat = { value: number; suffix: string; label: string };

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero({
  eyebrow,
  title,
  subtitle,
  image,
  stats,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  stats: Stat[];
}) {
  const words = title.split(" ");

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="A luxury wedding celebration by MarryMuse"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 to-transparent" />
      </div>

      {/* Floating decorations */}
      <motion.div
        aria-hidden
        className="absolute -left-10 top-1/4 size-64 rounded-full bg-primary/20 blur-3xl"
        animate={{ y: [0, 30, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-1/4 right-0 size-72 rounded-full bg-accent/20 blur-3xl"
        animate={{ y: [0, -30, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="container-luxe relative z-10 pt-32 pb-16 md:pt-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur"
          >
            <Star className="size-4 fill-primary text-primary" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white">
              {eyebrow}
            </span>
          </motion.div>

          <h1 className="font-display text-4xl font-bold leading-[1.08] text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="mr-[0.25em] inline-block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.07 }}
              >
                {word === "Luxury" || word === "Love" ? (
                  <span className="text-gradient-gold">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/80"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button asChild size="lg">
              <Link href="/book">
                Book Consultation <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="glass">
              <Link href="/packages">
                <Play className="size-4" /> View Packages
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
          className="mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="p-5 text-center md:p-6">
              <p className="font-display text-3xl font-bold text-white md:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/70">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="size-6" />
      </motion.div>
    </section>
  );
}
