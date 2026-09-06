import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hud" | "hud-gold" | "hud-volt" | "linen" | "dark" | "terracotta-tint" | "gold-tint" | "coutts-light";
  hoverEffect?: boolean;
  cornerTicks?: boolean;
}

export function Card({
  className,
  variant = "hud",
  hoverEffect = false,
  cornerTicks = false,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    // Machine-grade dark HUD chassis (John Deere precision × Obsidian)
    hud: "bg-obsidian-900/90 border border-white/10 text-parchment-100 shadow-warm-md backdrop-blur-md",

    // Coutts Imperial Gold trim card
    "hud-gold":
      "bg-obsidian-900/90 border border-gold-coutts/35 text-parchment-100 shadow-hud-gold backdrop-blur-md",

    // High-Octane Agro Volt telemetry card
    "hud-volt":
      "bg-obsidian-900/90 border border-volt/35 text-parchment-100 shadow-hud backdrop-blur-md",

    // Coutts Private Bank luxury light card
    "coutts-light":
      "bg-[#FAF7F2] border border-[#DDD0BA] text-charcoal-800 shadow-coutts-card",

    // Backward compatibility variants
    default: "bg-obsidian-900/90 border border-white/10 text-parchment-100 shadow-warm-md",
    linen: "bg-obsidian-850/95 border border-white/10 text-parchment-100 shadow-warm",
    dark: "bg-obsidian-950 border border-forest-800/80 text-parchment-100 shadow-warm-md",
    "terracotta-tint": "bg-obsidian-900/90 border border-terracotta-600/40 text-parchment-100 shadow-warm",
    "gold-tint": "bg-obsidian-900/90 border border-gold-500/40 text-parchment-100 shadow-warm",
  };

  return (
    <div
      className={cn(
        "rounded-panel p-6 transition-all duration-200",
        variantStyles[variant],
        cornerTicks && "corner-ticks",
        hoverEffect && "hover:border-volt/60 hover:shadow-[0_4px_24px_-2px_rgba(0,230,118,0.18)] hover:-translate-y-[2px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-4 space-y-1.5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-xl font-serif font-bold text-parchment-50 tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-parchment-300 leading-relaxed", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      {children}
    </div>
  );
}
