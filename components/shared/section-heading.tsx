import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/motion";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
};

/** Consistent luxury section header — eyebrow, display title, description. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  light = false,
}: Props) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-4 flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-8 bg-primary" />
          <span
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.25em]",
              light ? "text-primary-light" : "text-primary-dark"
            )}
          >
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-primary" />
        </div>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-semibold leading-tight text-balance sm:text-4xl md:text-[2.75rem]",
          light ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            light ? "text-white/75" : "text-muted"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
