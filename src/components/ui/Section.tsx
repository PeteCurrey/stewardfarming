import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  variant?: "obsidian" | "grid" | "forest" | "dark" | "parchment" | "white" | "pattern" | "terracotta-soft";
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  badge?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  alignHeader?: "left" | "center";
}

export function Section({
  className,
  variant = "white",
  containerSize = "lg",
  badge,
  title,
  subtitle,
  alignHeader = "center",
  children,
  ...props
}: SectionProps) {
  const variantStyles = {
    // Pure clean white section
    white: "bg-white text-slate-900 border-b border-slate-100",

    // Soft executive light gray
    parchment: "bg-slate-50/70 text-slate-900 border-y border-slate-200/80",
    "terracotta-soft": "bg-slate-50 text-slate-900 border-y border-slate-200",
    pattern: "bg-slate-50/50 text-slate-900 border-y border-slate-200",

    // Deep Heritage British Racing Green (Hero & Anchor Sections)
    forest: "bg-forest-900 text-white border-y border-forest-950",
    
    // Executive Slate (Corporate Dark Anchor)
    dark: "bg-slate-900 text-white border-y border-slate-950",
    obsidian: "bg-slate-900 text-white border-y border-slate-950",
    grid: "bg-slate-50 text-slate-900 border-y border-slate-200",
  };

  const isDarkVariant = variant === "forest" || variant === "dark" || variant === "obsidian";

  const containerWidths = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-[1400px]",
    full: "max-w-full",
  };

  const hasHeader = badge || title || subtitle;

  return (
    <section className={cn("py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative", variantStyles[variant], className)} {...props}>
      <div className={cn("mx-auto relative z-10", containerWidths[containerSize])}>
        {hasHeader && (
          <div
            className={cn(
              "mb-12 md:mb-16",
              alignHeader === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"
            )}
          >
            {badge && <div className="mb-4">{badge}</div>}
            {title && (
              <h2
                className={cn(
                  "text-3xl sm:text-4xl font-serif font-medium tracking-tight mb-3 leading-tight",
                  isDarkVariant ? "text-white" : "text-slate-900"
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "text-base sm:text-lg leading-relaxed",
                  isDarkVariant ? "text-slate-300" : "text-slate-600"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
