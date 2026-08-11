"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger children with nth-child delays */
  stagger?: boolean;
  /** Add delay class (reveal-delay-1 through 5) */
  delay?: 1 | 2 | 3 | 4 | 5;
  /** Wrapper element tag */
  as?: "div" | "section";
}

export function ScrollReveal({
  children,
  className,
  stagger,
  delay,
  as: Tag = "div",
}: ScrollRevealProps) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={cn(
        "reveal",
        stagger && "stagger-children",
        delay && `reveal-delay-${delay}`,
        isVisible && "visible",
        className
      )}
    >
      {children}
    </Tag>
  );
}
