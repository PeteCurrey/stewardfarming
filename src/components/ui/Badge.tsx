import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "volt" | "gold" | "forest" | "terracotta" | "obsidian" | "outline" | "parchment" | "charcoal";
  size?: "sm" | "md";
  pulse?: boolean;
}

export function Badge({
  className,
  variant = "forest",
  size = "md",
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-sans tracking-tight transition-colors rounded-full border select-none font-medium";

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-0.5",
  };

  const variantStyles = {
    // Heritage Forest / Clean Agricultural Green
    forest: "bg-emerald-50 text-emerald-900 border-emerald-200/80",

    // Active Green / Operational
    volt: "bg-emerald-50 text-emerald-800 border-emerald-200",

    // Coutts Gold / Fiduciary Accent
    gold: "bg-amber-50/80 text-amber-900 border-amber-200",

    // Warning / Red Tier Alert
    terracotta: "bg-rose-50 text-rose-800 border-rose-200",

    // Executive Slate
    obsidian: "bg-slate-100 text-slate-800 border-slate-200",

    // Clean Corporate Outline
    outline: "bg-transparent text-slate-700 border-slate-300",

    // Warm Neutral
    parchment: "bg-stone-100 text-stone-800 border-stone-200",

    // Dark Solid Executive
    charcoal: "bg-slate-900 text-white border-slate-800",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {pulse && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full mr-1.5",
            variant === "terracotta"
              ? "bg-rose-600"
              : variant === "gold"
              ? "bg-amber-600"
              : "bg-emerald-600"
          )}
        />
      )}
      {children}
    </span>
  );
}
