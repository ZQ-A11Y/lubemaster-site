"use client";

import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { useScrollReveal, useCountUp } from "@/hooks/use-scroll-reveal";

interface DataCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  className?: string;
  /** Visual variant */
  variant?: "default" | "hero-stat" | "stat" | "metric";
  /** Enable lift-on-hover */
  interactive?: boolean;
}

function AnimatedStat({
  value,
  variant,
}: {
  value: string;
  variant: "hero-stat" | "stat";
}) {
  const [ref, isVisible] = useScrollReveal();
  const displayValue = useCountUp(value, isVisible);

  return (
    <div
      ref={ref}
      className={cn(
        "display-stat",
        variant === "hero-stat"
          ? "text-2xl font-extrabold text-[var(--foreground)]"
          : "text-lg font-bold text-[var(--foreground)]"
      )}
    >
      {displayValue}
    </div>
  );
}

function DataCard({
  icon,
  label,
  value,
  className,
  variant = "default",
  interactive = false,
}: DataCardProps) {
  const showAnimated = variant === "hero-stat" || variant === "stat";

  const sizeClasses = cn({
    "gap-3 p-4 rounded-xl text-2xl": variant === "default",
    "gap-4 p-5 rounded-xl text-2xl": variant === "hero-stat",
    "gap-3 p-5 rounded-xl text-lg": variant === "stat",
    "gap-2 p-4 rounded-lg text-xl": variant === "metric",
  });

  const iconSizeClasses = cn({
    "w-10 h-10 rounded-lg": variant === "default" || variant === "hero-stat",
    "w-9 h-9 rounded-lg": variant === "stat" || variant === "metric",
  });

  return (
    <div
      className={cn(
        "flex items-center bg-[var(--surface)] border border-[var(--border)]",
        sizeClasses,
        interactive && "card-lift hover:shadow-lg hover:border-[var(--primary)]/20 cursor-pointer",
        variant === "hero-stat" && "shadow-sm hover:shadow-md",
        className
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]",
          iconSizeClasses
        )}
      >
        {icon}
      </div>
      <div className="min-w-0">
        {showAnimated ? (
          <AnimatedStat value={value} variant={variant as "hero-stat" | "stat"} />
        ) : (
          <div
            className={cn(
              "font-bold text-[var(--foreground)]",
              variant === "default" && "text-2xl",
              variant === "metric" && "text-xl"
            )}
          >
            {value}
          </div>
        )}
        <div className="text-sm text-[var(--muted)] leading-tight">{label}</div>
      </div>
    </div>
  );
}

export { DataCard };
export type { DataCardProps };
