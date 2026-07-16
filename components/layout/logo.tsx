import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="MarryMuse home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative grid size-9 shrink-0 place-items-center">
        <svg viewBox="0 0 40 40" className="size-9" aria-hidden="true">
          <circle
            cx="16"
            cy="20"
            r="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-primary"
          />
          <circle
            cx="24"
            cy="20"
            r="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-primary-dark"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl font-bold tracking-tight transition-colors",
            light ? "text-white" : "text-ink"
          )}
        >
          Marry<span className="text-gradient-gold">Muse</span>
        </span>
        <span
          className={cn(
            "text-[9px] font-medium uppercase tracking-[0.3em] transition-colors",
            light ? "text-white/70" : "text-muted"
          )}
        >
          Luxury Weddings
        </span>
      </span>
    </Link>
  );
}
