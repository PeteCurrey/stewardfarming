import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "volt" | "gold" | "forest" | "terracotta" | "obsidian" | "outline" | "parchment" | "charcoal";
  size?: "sm" | "md";
  pulse?: boolean;
}

export function Badge({
  className,
  variant = "volt",
  size = "md",
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-mono tracking-wider uppercase transition-colors rounded-tech border select-none";

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 font-semibold",
    md: "text-xs px-2.5 py-1 font-semibold",
  };

  const variantStyles = {
    // High-Octane Agro Volt HUD badge
    volt: "bg-volt/10 text-volt border-volt/30 shadow-[0_0_8px_rgba(0,230,118,0.15)]",

    // Coutts Gold badge
    gold: "bg-gold-coutts/15 text-gold-300 border-gold-coutts/40 shadow-[0_0_8px_rgba(212,175,55,0.15)]",

    // Racing Green telemetry badge
    forest: "bg-forest-800/80 text-parchment-100 border-forest-600/70",

    // Terracotta Alert badge
    terracotta: "bg-terracotta-900/60 text-terracotta-300 border-terracotta-600/60",

    // Matte Obsidian chassis badge
    obsidian: "bg-obsidian-850 text-parchment-300 border-white/10",

    // Subtle Outline
    outline: "bg-transparent text-parchment-200 border-white/20",

    // Light theme backwards compatibility
    parchment: "bg-parchment-200 text-charcoal-800 border-parchment-400",
    charcoal: "bg-charcoal-100 text-charcoal-900 border-charcoal-300",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {pulse && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse",
            variant === "volt"
              ? "bg-volt"
              : variant === "gold"
              ? "bg-gold-coutts"
              : variant === "terracotta"
              ? "bg-terracotta-400"
              : "bg-emerald-400"
          )}
        />
      )}
      {children}
    </span>
  );
}
