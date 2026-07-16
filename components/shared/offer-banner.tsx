"use client";

import * as React from "react";
import { X, Sparkles } from "lucide-react";
import Link from "next/link";

/** Dismissible promo banner with a live countdown to drive urgency. */
export function OfferBanner({ text }: { text: string }) {
  const [visible, setVisible] = React.useState(true);
  const [time, setTime] = React.useState({ h: 0, m: 0, s: 0 });

  React.useEffect(() => {
    // Countdown to the end of the current day (resets daily).
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const diff = Math.max(0, end.getTime() - now.getTime());
      setTime({
        h: Math.floor(diff / 3.6e6),
        m: Math.floor((diff % 3.6e6) / 6e4),
        s: Math.floor((diff % 6e4) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="relative z-[60] bg-ink text-white">
      <div className="container-luxe flex items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-xs sm:text-sm">
        <Sparkles className="hidden size-4 shrink-0 text-primary-light sm:block" />
        <p className="font-medium">
          <span className="hidden sm:inline">{text} </span>
          <Link href="/book" className="underline decoration-primary/60 underline-offset-2 hover:text-primary-light">
            Book now
          </Link>
        </p>
        <span className="hidden items-center gap-1 font-mono text-primary-light md:flex">
          <span className="rounded bg-white/10 px-1.5 py-0.5">{pad(time.h)}</span>:
          <span className="rounded bg-white/10 px-1.5 py-0.5">{pad(time.m)}</span>:
          <span className="rounded bg-white/10 px-1.5 py-0.5">{pad(time.s)}</span>
        </span>
        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss offer"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 transition-colors hover:text-white"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
