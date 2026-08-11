import { cn } from "@/lib/cn";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          {
            primary:
              "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-lg shadow-[var(--primary)]/25 hover:shadow-xl hover:shadow-[var(--primary)]/30",
            secondary:
              "bg-[var(--accent)] text-white hover:brightness-110 shadow-lg shadow-[var(--accent)]/25",
            outline:
              "border-2 border-[var(--border)] hover:border-[var(--primary)] text-[var(--foreground)] hover:bg-[var(--surface)]",
            ghost:
              "text-[var(--foreground)] hover:bg-[var(--surface)]",
          }[variant],
          {
            sm: "text-sm px-4 py-2 gap-1.5",
            md: "text-base px-6 py-3 gap-2",
            lg: "text-lg px-8 py-4 gap-2.5",
          }[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
