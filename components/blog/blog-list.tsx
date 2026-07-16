"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, ArrowUpRight, CalendarDays } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  author: string;
  publishedAt: string;
  tags: readonly string[];
  readMins: number;
};

export function BlogList({ posts }: { posts: PostCard[] }) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("All");

  const categories = React.useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );

  const filtered = posts.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const q = query.toLowerCase();
    const matchQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchQ;
  });

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                category === c
                  ? "bg-ink text-white shadow-soft"
                  : "border border-line bg-white text-ink/70 hover:border-primary/40 hover:text-primary-dark"
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
            className="h-12 w-full rounded-full border border-line bg-white pl-11 pr-4 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted">
          No articles match your search. Try another keyword.
        </p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.slug} className="group flex h-full flex-col">
              <Link
                href={`/blog/${p.slug}`}
                className="relative block aspect-[16/10] overflow-hidden rounded-3xl shadow-soft"
              >
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4">
                  <Badge variant="dark">{p.category}</Badge>
                </span>
              </Link>
              <div className="flex flex-1 flex-col px-1 pt-5">
                <div className="mb-3 flex items-center gap-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" /> {formatDate(p.publishedAt)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" /> {p.readMins} min read
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-primary-dark">
                  <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {p.excerpt}
                </p>
                <Link
                  href={`/blog/${p.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-dark"
                >
                  Read article
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
