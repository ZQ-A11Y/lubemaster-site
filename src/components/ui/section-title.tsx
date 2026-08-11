import { cn } from "@/lib/cn";
import { Badge } from "./badge";

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  /** A word in the title to highlight with gradient text */
  highlight?: string;
}

function SectionTitle({
  badge,
  title,
  subtitle,
  align = "center",
  className,
  highlight,
}: SectionTitleProps) {
  const titleContent = highlight
    ? title.split(highlight).map((part, i, arr) => {
        if (i === arr.length - 1) return part;
        return <>{part}<span className="gradient-text">{highlight}</span></>;
      })
    : title;

  return (
    <div
      className={cn(
        "max-w-3xl animate-fade-in-up",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {badge && (
        <Badge variant="primary" size="md" className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)]">
        {titleContent}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg sm:text-xl text-[var(--muted)] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export { SectionTitle };
export type { SectionTitleProps };
