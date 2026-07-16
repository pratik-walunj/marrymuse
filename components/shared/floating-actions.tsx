"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X, ChevronUp } from "lucide-react";

/**
 * Floating conversion cluster: WhatsApp + Call quick actions and a
 * back-to-top button that appears after scrolling.
 */
export function FloatingActions({
  whatsapp,
  phoneHref,
}: {
  whatsapp: string;
  phoneHref: string;
}) {
  const [showTop, setShowTop] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waHref = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    "Hi MarryMuse! I'd love to book a wedding consultation."
  )}`;

  return (
    <div className="fixed bottom-5 right-4 z-[70] flex flex-col items-end gap-3 md:bottom-7 md:right-6">
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="grid size-11 place-items-center rounded-full border border-line bg-white text-ink shadow-luxe transition-colors hover:bg-secondary"
          >
            <ChevronUp className="size-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="flex flex-col items-end gap-2.5"
          >
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white shadow-luxe transition-transform hover:scale-105"
            >
              <MessageCircle className="size-4" /> WhatsApp
            </a>
            <a
              href={phoneHref}
              className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-luxe transition-transform hover:scale-105"
            >
              <Phone className="size-4" /> Call Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        aria-expanded={open}
        className="relative grid size-14 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-gold transition-transform hover:scale-105"
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/50" />
        )}
        <span className="relative">
          {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
        </span>
      </button>
    </div>
  );
}
