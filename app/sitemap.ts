import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getPosts } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const routes = [
    "",
    "/about",
    "/services",
    "/packages",
    "/destinations",
    "/gallery",
    "/testimonials",
    "/blog",
    "/faq",
    "/contact",
    "/book",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const posts = await getPosts();
  const postRoutes = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...postRoutes];
}
