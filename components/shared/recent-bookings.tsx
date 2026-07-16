"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

const bookings = [
  { name: "Priya & Arjun", city: "Udaipur", ago: "2 hours ago" },
  { name: "Sara & Rohan", city: "Goa", ago: "5 hours ago" },
  { name: "Meera & Karan", city: "Bali", ago: "yesterday" },
  { name: "Nisha & Aditya", city: "Dubai", ago: "yesterday" },
  { name: "Tara & Dev", city: "Kerala", ago: "2 days ago" },
];

/** Rotating social-proof toast (bottom-left) to build trust & FOMO. */
export function RecentBookings() {
  const [index, setIndex] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    if (dismissed) return;
    let i = 0;
    const start = setTimeout(function loop() {
      setIndex(i % bookings.length);
      setShow(true);
      i += 1;
      setTimeout(() => setShow(false), 5000);
      setTimeout(loop, 12000);
    }, 6000);
    return () => clearTimeout(start);
  }, [dismissed]);

  if (dismissed) return null;
  const b = bookings[index];

  return (
    <div className="pointer-events-none fixed bottom-24 left-4 z-[65] md:bottom-7 md:left-6">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, x: -30, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex max-w-[19rem] items-center gap-3 rounded-2xl border border-line bg-white/95 p-3 pr-9 shadow-luxe backdrop-blur"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary-dark">
              <CheckCircle2 className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{b.name}</p>
              <p className="text-xs text-muted">
                Booked a {b.city} wedding · {b.ago}
              </p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="absolute right-2 top-2 text-muted/60 hover:text-ink"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
