import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, User, ArrowLeft, Tag } from "lucide-react";
import { getPost, getPosts, getSettings } from "@/lib/content";
import { buildMetadata, jsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { MarkdocContent } from "@/components/blog/markdoc-content";
import { ShareButtons } from "@/components/blog/share-buttons";
import { Badge } from "@/components/ui/badge";
import { CtaBand } from "@/components/sections/cta-band";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return buildMetadata({ title: "Article not found", noIndex: true });
  return buildMetadata({
    title: post.title,
    description: post.excerpt ?? undefined,
    path: `/blog/${slug}`,
    image: post.cover ?? undefined,
    type: "article",
    publishedTime: post.publishedAt ?? undefined,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const [allPosts, settings] = await Promise.all([getPosts(), getSettings()]);
  const phoneHref = `tel:${settings.phone.replace(/\s/g, "")}`;
  const node = await post.content();
  const readMins = 4 + (post.title.length % 5);

  const related = allPosts
    .filter((p) => p.slug !== slug)
    .filter((p) => p.category === post.category)
    .concat(allPosts.filter((p) => p.slug !== slug && p.category !== post.category))
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author ?? siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/favicon.svg` },
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${siteConfig.url}/blog/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />

      <article>
        {/* Header */}
        <header className="relative overflow-hidden pb-12 pt-36 text-white md:pt-44">
          {post.cover && (
            <>
              <Image src={post.cover} alt="" fill sizes="100vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/65 to-ink/90" />
            </>
          )}
          <div className="container-luxe relative">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="gold" className="bg-primary/20 text-primary-light">
                {post.category}
              </Badge>
              <h1 className="mt-5 font-display text-3xl font-bold leading-tight text-balance sm:text-4xl md:text-5xl">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/75">
                <span className="inline-flex items-center gap-1.5">
                  <User className="size-4" /> {post.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-4" /> {formatDate(post.publishedAt ?? "")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4" /> {readMins} min read
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="bg-canvas py-16 md:py-20">
          <div className="container-luxe">
            <div className="mx-auto max-w-3xl">
              <MarkdocContent node={node} />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-line pt-8">
                  <Tag className="size-4 text-primary-dark" />
                  {post.tags.map((t) => (
                    <Badge key={t} variant="soft" size="sm">
                      {t}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-dark hover:underline"
                >
                  <ArrowLeft className="size-4" /> Back to all articles
                </Link>
                <ShareButtons title={post.title} path={`/blog/${slug}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="bg-secondary py-20">
            <div className="container-luxe">
              <h2 className="mb-10 text-center font-display text-3xl font-semibold text-ink">
                You might also love
              </h2>
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={p.cover ?? ""}
                        alt={p.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <Badge variant="soft" size="sm">
                        {p.category}
                      </Badge>
                      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink group-hover:text-primary-dark">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CtaBand phoneHref={phoneHref} />
    </>
  );
}
