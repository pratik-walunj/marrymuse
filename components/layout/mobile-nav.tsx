"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import { mainNav } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";

export function MobileNav({
  light,
  phoneHref,
}: {
  light: boolean;
  phoneHref: string;
}) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className={cn(
          // Labeled pill so navigation is unmistakable and clearly tappable on
          // ANY background — dark hero, bright hero, or white header alike.
          "relative z-10 inline-flex h-11 items-center gap-2 rounded-full border-2 border-primary/60 bg-white pl-3.5 pr-4 text-ink shadow-luxe transition-colors hover:border-primary xl:hidden"
        )}
      >
        <span className="relative block h-3.5 w-5">
          <span
            className={cn(
              "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300",
              open && "top-1.5 rotate-45"
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition-all duration-300",
              open && "opacity-0"
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-3 h-0.5 w-5 rounded-full bg-current transition-all duration-300",
              open && "top-1.5 -rotate-45"
            )}
          />
        </span>
        <span className="text-sm font-semibold tracking-wide">
          {open ? "Close" : "Menu"}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm xl:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-canvas xl:hidden"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <Logo />
              </div>

              <nav className="flex-1 px-5 py-6" aria-label="Mobile">
                <ul className="space-y-1">
                  {mainNav.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-xl px-4 py-3 font-display text-lg font-medium text-ink transition-colors hover:bg-secondary",
                          pathname === item.href && "text-primary-dark"
                        )}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <ul className="ml-4 space-y-0.5 border-l border-line pl-3">
                          {item.children.slice(0, 4).map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                className="block rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:text-primary-dark"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="space-y-3 border-t border-line p-5">
                <Button asChild size="lg" className="w-full">
                  <Link href="/book">Book Consultation</Link>
                </Button>
                <a
                  href={phoneHref}
                  className="flex items-center justify-center gap-2 text-sm font-medium text-muted"
                >
                  <Phone className="size-4" /> Call us today
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
