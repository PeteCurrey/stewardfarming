import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hud" | "hud-gold" | "hud-volt" | "linen" | "dark" | "terracotta-tint" | "gold-tint" | "coutts-light";
  hoverEffect?: boolean;
  cornerTicks?: boolean;
}

export function Card({
  className,
  variant = "default",
  hoverEffect = false,
  cornerTicks = false,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    // Clean corporate white card (Default)
    default: "bg-white border border-slate-200 text-slate-900 shadow-sm",

    // Backward-compatibility: clean modern white card
    hud: "bg-white border border-slate-200 text-slate-900 shadow-sm",

    // Coutts Gold trim card
    "hud-gold":
      "bg-white border border-amber-200 text-slate-900 shadow-sm",

    // Clean green trim card
    "hud-volt":
      "bg-white border border-emerald-200 text-slate-900 shadow-sm",

    // Coutts luxury light card
    "coutts-light":
      "bg-stone-50/70 border border-stone-200 text-slate-900 shadow-sm",

    // Clean subtle linen
    linen: "bg-white border border-slate-200 text-slate-900 shadow-sm",

    // Anchor dark corporate card
    dark: "bg-slate-900 border border-slate-800 text-white shadow-md",

    "terracotta-tint": "bg-rose-50/50 border border-rose-200 text-slate-900 shadow-sm",
    "gold-tint": "bg-amber-50/50 border border-amber-200 text-slate-900 shadow-sm",
  };

  return (
    <div
      className={cn(
        "rounded-xl p-6 transition-all duration-200",
        variantStyles[variant],
        hoverEffect && "hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5",
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
      className={cn("text-xl font-serif font-medium text-slate-900 tracking-tight", className)}
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
    <p className={cn("text-sm text-slate-600 leading-relaxed", className)} {...props}>
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
