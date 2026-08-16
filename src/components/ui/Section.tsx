import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  variant?: "parchment" | "white" | "dark" | "pattern" | "terracotta-soft";
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  badge?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  alignHeader?: "left" | "center";
}

export function Section({
  className,
  variant = "parchment",
  containerSize = "lg",
  badge,
  title,
  subtitle,
  alignHeader = "center",
  children,
  ...props
}: SectionProps) {
  const variantStyles = {
    parchment: "bg-parchment-100 text-charcoal-800",
    white: "bg-white text-charcoal-800 border-y border-parchment-300/70",
    dark: "bg-forest-900 text-parchment-100",
    pattern: "paper-texture text-charcoal-800 border-y border-parchment-300/80",
    "terracotta-soft": "bg-[#FAF2EB] text-charcoal-800 border-y border-terracotta-200/60",
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
    <section className={cn("py-20 md:py-28 px-4 sm:px-6 lg:px-8", variantStyles[variant], className)} {...props}>
      <div className={cn("mx-auto", containerWidths[containerSize])}>
        {hasHeader && (
          <div
            className={cn(
              "mb-14 md:mb-18",
              alignHeader === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"
            )}
          >
            {badge && <div className="mb-4">{badge}</div>}
            {title && (
              <h2
                className={cn(
                  "text-3xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight mb-4",
                  variant === "dark" ? "text-parchment-50" : "text-forest-900"
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "text-base sm:text-lg leading-relaxed",
                  variant === "dark" ? "text-parchment-300" : "text-charcoal-600"
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
