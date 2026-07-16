import Link from "next/link";
import { Home, MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";

export default function NotFound() {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-ink px-6 text-center">
      <div aria-hidden className="absolute inset-0 bg-radial-gold opacity-70" />
      <div className="relative">
        <div className="mb-10 flex justify-center">
          <Logo light />
        </div>
        <p className="font-display text-8xl font-bold text-gradient-gold md:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-white md:text-4xl">
          This page has eloped
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">
          The page you&apos;re looking for can&apos;t be found. Let&apos;s get you
          back to planning your perfect day.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="size-4" /> Back home
            </Link>
          </Button>
          <Button asChild size="lg" variant="glass">
            <Link href="/contact">
              <MessageCircle className="size-4" /> Contact us
            </Link>
          </Button>
        </div>
        <Link
          href="/gallery"
          className="mt-8 inline-flex items-center gap-2 text-sm text-white/60 hover:text-primary-light"
        >
          <ArrowLeft className="size-4" /> Explore our gallery instead
        </Link>
      </div>
    </div>
  );
}
