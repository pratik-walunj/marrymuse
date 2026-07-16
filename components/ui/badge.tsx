import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        gold: "bg-primary/10 text-primary-dark border border-primary/20",
        accent: "bg-accent/10 text-accent border border-accent/20",
        dark: "bg-ink text-white",
        soft: "bg-secondary text-ink/70 border border-line",
        outline: "border border-primary/30 text-ink/70",
      },
      size: {
        sm: "px-3 py-1 text-[11px]",
        md: "px-4 py-1.5 text-xs",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props} />
  );
}
