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
  variant = "obsidian",
  containerSize = "lg",
  badge,
  title,
  subtitle,
  alignHeader = "center",
  children,
  ...props
}: SectionProps) {
  const variantStyles = {
    // High-precision dark obsidian
    obsidian: "bg-obsidian-950 text-parchment-100 border-y border-white/5",
    
    // Tactical radar grid
    grid: "bg-obsidian-950 bg-tactical-grid text-parchment-100 border-y border-white/5",

    // Deep British Racing Green
    forest: "bg-forest-950 text-parchment-100 border-y border-forest-800/80",
    
    dark: "bg-obsidian-900 text-parchment-100 border-y border-white/5",

    // Legacy light options with high-contrast upgrades
    parchment: "bg-obsidian-900 text-parchment-100 border-y border-white/5",
    white: "bg-obsidian-850 text-parchment-100 border-y border-white/10",
    pattern: "bg-obsidian-950 bg-tactical-grid text-parchment-100 border-y border-white/5",
    "terracotta-soft": "bg-obsidian-900 text-parchment-100 border-y border-terracotta-900/40",
  };

  const containerWidths = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-[1400px]",
    full: "max-w-full",
  };

  const hasHeader = badge || title || subtitle;

  return (
    <section className={cn("py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative", variantStyles[variant], className)} {...props}>
      <div className={cn("mx-auto relative z-10", containerWidths[containerSize])}>
        {hasHeader && (
          <div
            className={cn(
              "mb-14 md:mb-18",
              alignHeader === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"
            )}
          >
            {badge && <div className="mb-4">{badge}</div>}
            {title && (
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white mb-4 leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base sm:text-lg leading-relaxed text-parchment-300">
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
