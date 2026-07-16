"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/utils";

export type GalleryItem = {
  slug: string;
  title: string;
  image: string;
  category: string;
  size: "standard" | "tall" | "wide";
};

const sizeClass: Record<string, string> = {
  tall: "row-span-2",
  wide: "sm:col-span-2",
  standard: "",
};

export function GalleryGrid({
  items,
  withFilter = true,
}: {
  items: GalleryItem[];
  withFilter?: boolean;
}) {
  const categories = React.useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category)))],
    [items]
  );
  const [active, setActive] = React.useState("All");
  const [lightbox, setLightbox] = React.useState<number | null>(null);

  const filtered =
    active === "All" ? items : items.filter((i) => i.category === active);

  const openAt = (slug: string) =>
    setLightbox(filtered.findIndex((i) => i.slug === slug));
  const move = (dir: number) =>
    setLightbox((cur) =>
      cur === null ? null : (cur + dir + filtered.length) % filtered.length
    );

  React.useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, filtered.length]);

  return (
    <div>
      {withFilter && (
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                active === c
                  ? "bg-primary text-white shadow-gold"
                  : "border border-line bg-white text-ink/70 hover:border-primary/40 hover:text-primary-dark"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <motion.div
        layout
        className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.button
              layout
              key={item.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => openAt(item.slug)}
              className={cn(
                "group relative overflow-hidden rounded-2xl shadow-soft",
                sizeClass[item.size]
              )}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="flex items-center gap-2 text-sm font-medium text-white">
                  <Expand className="size-4" /> {item.category}
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/95 p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              aria-label="Close"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="size-6" />
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                move(-1);
              }}
              className="absolute left-3 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-8"
            >
              <ChevronLeft className="size-6" />
            </button>
            <motion.div
              key={filtered[lightbox].slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[3/2] w-full max-w-4xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].image}
                alt={filtered[lightbox].title}
                fill
                sizes="90vw"
                className="object-cover"
              />
            </motion.div>
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                move(1);
              }}
              className="absolute right-3 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-8"
            >
              <ChevronRight className="size-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
