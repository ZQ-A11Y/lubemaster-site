"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * IntersectionObserver-based scroll reveal.
 * Returns [ref, isVisible] — attach ref to the element,
 * isVisible becomes true when the element enters the viewport.
 * Automatically disconnects after first reveal for performance.
 */
export function useScrollReveal(
  options?: IntersectionObserverInit
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px", ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
}

/**
 * Animated number counter that counts from 0 to target when visible.
 * Runs exactly once per target — never re-triggers.
 * Handles formatted strings like "99.5%", "50,000h+", "-40~70°C".
 */
export function useCountUp(
  target: string,
  isVisible: boolean,
  duration: number = 1600
): string {
  const [display, setDisplay] = useState("0");
  const rafRef = useRef<number>(0);
  const hasRunRef = useRef(false);
  // Store parsed in ref so animate callback is stable
  const parsedRef = useRef(parseNumber(target));

  // Update parsed ref when target changes
  useEffect(() => {
    parsedRef.current = parseNumber(target);
    hasRunRef.current = false;
    setDisplay("0");
  }, [target]);

  useEffect(() => {
    if (!isVisible || hasRunRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setDisplay(target);
      hasRunRef.current = true;
      return;
    }

    hasRunRef.current = true;
    const parsed = parsedRef.current;
    const startTime = performance.now();

    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    }

    function frame(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = parsed.value * easedProgress;

      setDisplay(formatValue(currentValue, parsed));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame);
      }
    }

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible, target, duration]);

  return display;
}

interface ParsedNumber {
  value: number;
  prefix: string;
  suffix: string;
  hasComma: boolean;
}

function parseNumber(str: string): ParsedNumber {
  // Handle strings like "99.5%", "50,000h+", "-40~70°C", "15MPa", ">50,000h", "<0.5s", "1/3~1/2"
  // First, check for range patterns like "-40~70°C" or "1/3~1/2"
  const rangeMatch = str.match(/^([\d.]+)~([\d.]+)(.*)$/);
  if (rangeMatch) {
    // For ranges, animate the second number (the "to" value)
    return {
      value: parseFloat(rangeMatch[2].replace(/,/g, "")),
      prefix: rangeMatch[1] + "~",
      suffix: rangeMatch[3] || "",
      hasComma: false,
    };
  }

  // Check for ">50,000h+" or "<0.5s"
  const prefixMatch = str.match(/^([><])([\d,]+(?:\.\d+)?)(.*)$/);
  if (prefixMatch) {
    return {
      value: parseFloat(prefixMatch[2].replace(/,/g, "")),
      prefix: prefixMatch[1],
      suffix: prefixMatch[3] || "",
      hasComma: prefixMatch[2].includes(","),
    };
  }

  // Standard number with optional prefix/suffix: "99.5%", "72%", "15MPa", "50,000h+"
  const standardMatch = str.match(/^([\d,]+(?:\.\d+)?)(.*)$/);
  if (standardMatch) {
    return {
      value: parseFloat(standardMatch[1].replace(/,/g, "")),
      prefix: "",
      suffix: standardMatch[2] || "",
      hasComma: standardMatch[1].includes(","),
    };
  }

  // Fallback: treat as non-numeric
  return { value: 0, prefix: "", suffix: "", hasComma: false };
}

function formatValue(val: number, parsed: ParsedNumber): string {
  let numStr: string;

  if (Number.isInteger(val) && !parsed.suffix.startsWith(".")) {
    numStr = parsed.hasComma
      ? Math.round(val).toLocaleString("en-US")
      : Math.round(val).toString();
  } else {
    // Keep decimal places matching original precision
    const originalDecimals = parsed.value.toString().split(".")[1]?.length || 0;
    numStr = val.toFixed(originalDecimals);
    if (parsed.hasComma && Number.isInteger(val)) {
      numStr = Math.round(val).toLocaleString("en-US");
    }
  }

  return parsed.prefix + numStr + parsed.suffix;
}
