import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { BlogList, type PostCard } from "@/components/blog/blog-list";
import { getPosts, getSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Wedding Blog & Planning Journal",
  description:
    "Expert wedding planning tips, real weddings, décor trends and destination guides from the MarryMuse studio.",
  path: "/blog",
});

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([getPosts(), getSettings()]);
  const phoneHref = `tel:${settings.phone.replace(/\s/g, "")}`;

  const cards: PostCard[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    cover: p.cover ?? "",
    category: p.category,
    author: p.author ?? "MarryMuse Studio",
    publishedAt: p.publishedAt ?? "",
    tags: p.tags ?? [],
    readMins: 4 + (p.title.length % 5),
  }));

  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title="Wedding Wisdom & Inspiration"
        description="Planning tips, real weddings and design trends from our studio to help you create a celebration that's unmistakably yours."
        crumbs={[{ label: "Blog" }]}
      />

      <section className="bg-canvas py-20 md:py-28">
        <div className="container-luxe">
          {cards.length ? (
            <BlogList posts={cards} />
          ) : (
            <p className="text-center text-muted">No posts yet — check back soon.</p>
          )}
        </div>
      </section>

      <CtaBand phoneHref={phoneHref} />
    </>
  );
}
