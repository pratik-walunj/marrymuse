import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/motion";

type Crumb = { label: string; href?: string };

/** Interior page header with breadcrumb — includes top padding to clear the fixed nav. */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  crumbs?: Crumb[];
}) {
  const dark = !!image;

  return (
    <section
      className={cn(
        "relative overflow-hidden pb-16 pt-36 md:pb-20 md:pt-44",
        dark ? "text-white" : "bg-secondary text-ink"
      )}
    >
      {dark ? (
        <>
          <Image src={image!} alt="" fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink/85" />
        </>
      ) : (
        <div aria-hidden className="absolute inset-0 bg-radial-gold opacity-70" />
      )}

      <div className="container-luxe relative text-center">
        <Reveal>
          <nav
            aria-label="Breadcrumb"
            className={cn(
              "mb-5 flex items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-wider",
              dark ? "text-white/70" : "text-muted"
            )}
          >
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5 opacity-60" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-primary">
                    {c.label}
                  </Link>
                ) : (
                  <span className={dark ? "text-primary-light" : "text-primary-dark"}>
                    {c.label}
                  </span>
                )}
              </span>
            ))}
          </nav>

          {eyebrow && (
            <p
              className={cn(
                "mb-3 text-xs font-semibold uppercase tracking-[0.25em]",
                dark ? "text-primary-light" : "text-primary-dark"
              )}
            >
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-4xl font-bold leading-tight text-balance sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                "mx-auto mt-5 max-w-2xl text-lg leading-relaxed",
                dark ? "text-white/75" : "text-muted"
              )}
            >
              {description}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
