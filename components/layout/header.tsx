"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import { mainNav } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header({ phoneHref }: { phoneHref: string }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !isHome;
  const light = !solid;

  return (
    <header
      className={cn(
        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        solid
          ? "border-b border-line/70 bg-white/80 py-2 shadow-soft backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-4"
      )}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="container-luxe flex items-center justify-between gap-4">
        <Logo light={light} />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {mainNav.map((item) => {
            const hasChildren = !!item.children?.length;
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  setActiveMenu(hasChildren ? item.label : null)
                }
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    light
                      ? "text-white/90 hover:text-white"
                      : "text-ink/75 hover:text-primary-dark",
                    active && (light ? "text-white" : "text-primary-dark")
                  )}
                >
                  {item.label}
                  {hasChildren && (
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform duration-300",
                        activeMenu === item.label && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {hasChildren && (
                  <AnimatePresence>
                    {activeMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 top-full w-[30rem] -translate-x-1/2 pt-4"
                      >
                        <div className="overflow-hidden rounded-3xl border border-line bg-white p-3 shadow-luxe">
                          <div className="grid grid-cols-2 gap-1">
                            {item.children!.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="group/mm rounded-2xl p-3 transition-colors hover:bg-secondary"
                              >
                                <p className="text-sm font-semibold text-ink group-hover/mm:text-primary-dark">
                                  {child.label}
                                </p>
                                {child.description && (
                                  <p className="mt-0.5 text-xs leading-snug text-muted">
                                    {child.description}
                                  </p>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href={phoneHref}
            className={cn(
              "hidden items-center gap-2 text-sm font-medium transition-colors lg:flex",
              light ? "text-white/90 hover:text-white" : "text-ink/75 hover:text-primary-dark"
            )}
          >
            <Phone className="size-4" />
            <span className="hidden 2xl:inline">Call us</span>
          </a>
          <Button
            asChild
            size="sm"
            variant={light ? "white" : "primary"}
            className="hidden sm:inline-flex"
          >
            <Link href="/book">Book Consultation</Link>
          </Button>
          <MobileNav light={light} phoneHref={phoneHref} />
        </div>
      </div>
    </header>
  );
}
