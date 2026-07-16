"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-screen place-items-center bg-canvas px-6">
      <div className="max-w-md text-center">
        <p className="font-display text-7xl font-bold text-gradient-gold">Oops</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink">
          Something went wrong
        </h1>
        <p className="mt-3 text-muted">
          We&apos;ve hit an unexpected snag. Please try again — or return home and
          we&apos;ll get you back on track.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={reset}>
            <RefreshCw className="size-4" /> Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="size-4" /> Back home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
