import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "linen" | "dark" | "terracotta-tint" | "gold-tint";
  hoverEffect?: boolean;
}

export function Card({
  className,
  variant = "default",
  hoverEffect = false,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    default: "bg-white border border-parchment-300 shadow-warm text-charcoal-800",
    linen: "bg-parchment-50 border border-parchment-300 shadow-warm text-charcoal-800",
    dark: "bg-forest-900 border border-forest-700 text-parchment-100 shadow-warm-md",
    "terracotta-tint": "bg-[#fdfaf7] border border-terracotta-200 text-charcoal-800 shadow-warm",
    "gold-tint": "bg-[#fdfcf6] border border-gold-300/80 text-charcoal-800 shadow-warm",
  };

  return (
    <div
      className={cn(
        "rounded-lg p-6 transition-all duration-200",
        variantStyles[variant],
        hoverEffect && "hover:shadow-warm-md hover:border-forest-400 hover:-translate-y-[2px]",
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
      className={cn("text-xl font-serif font-medium text-forest-800", className)}
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
    <p className={cn("text-sm text-charcoal-600 leading-relaxed", className)} {...props}>
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
