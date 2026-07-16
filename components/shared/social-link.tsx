import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Renders a social icon link. Until an account is live, its stored value is
 * "#" (or empty) — in that case we render a non-navigating button so there is
 * no redirect / new tab. Swap the value for a real URL in the CMS to activate.
 */
export function SocialLink({
  href,
  label,
  className,
  children,
}: {
  href?: string | null;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const isLive = !!href && /^https?:\/\//i.test(href);

  if (!isLive) {
    return (
      <button
        type="button"
        aria-label={`${label} (coming soon)`}
        aria-disabled="true"
        title="Coming soon"
        className={cn("cursor-default", className)}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      href={href!}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={className}
    >
      {children}
    </a>
  );
}
