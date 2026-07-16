import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex max-w-full items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white shadow-gold hover:shadow-luxe hover:-translate-y-0.5",
        accent:
          "bg-accent text-white shadow-soft hover:bg-accent-light hover:-translate-y-0.5",
        dark: "bg-ink text-white shadow-soft hover:bg-ink/90 hover:-translate-y-0.5",
        outline:
          "border border-primary/40 bg-transparent text-ink hover:border-primary hover:bg-primary/5",
        white:
          "bg-white text-ink shadow-soft hover:shadow-luxe hover:-translate-y-0.5",
        ghost: "bg-transparent text-ink hover:bg-ink/5",
        glass:
          "glass text-ink hover:bg-white/80 hover:-translate-y-0.5 shadow-soft",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-7 text-sm",
        lg: "h-14 px-9 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
