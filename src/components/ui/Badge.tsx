import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "forest" | "terracotta" | "gold" | "parchment" | "charcoal" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "forest",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-medium tracking-wide uppercase transition-colors rounded-full border";

  const sizeStyles = {
    sm: "text-[10px] px-2.5 py-0.5 font-semibold",
    md: "text-xs px-3 py-1 font-semibold",
  };

  const variantStyles = {
    forest: "bg-forest-100 text-forest-900 border-forest-300",
    terracotta: "bg-terracotta-100 text-terracotta-900 border-terracotta-300",
    gold: "bg-gold-100 text-gold-900 border-gold-300",
    parchment: "bg-parchment-200 text-charcoal-800 border-parchment-400",
    charcoal: "bg-charcoal-100 text-charcoal-900 border-charcoal-300",
    outline: "bg-transparent text-forest-800 border-forest-600",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
