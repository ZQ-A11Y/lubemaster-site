import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "accent" | "outline";
  size?: "sm" | "md";
}

function Badge({
  className,
  variant = "default",
  size = "sm",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        {
          default: "bg-[var(--surface-alt)] text-[var(--foreground)]",
          primary:
            "bg-[var(--primary)]/10 text-[var(--primary)]",
          accent:
            "bg-[var(--accent)]/10 text-[var(--accent)]",
          outline:
            "border border-[var(--border)] text-[var(--muted)]",
        }[variant],
        {
          sm: "text-xs px-2.5 py-0.5",
          md: "text-sm px-3.5 py-1",
        }[size],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
export type { BadgeProps };
