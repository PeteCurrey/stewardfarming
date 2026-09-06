import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "volt" | "gold" | "primary" | "secondary" | "ghost" | "outline" | "white" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg select-none";

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5",
      md: "text-sm px-4 py-2",
      lg: "text-base px-5 py-2.5 shadow-sm",
      xl: "text-base sm:text-lg px-6 py-3 font-semibold shadow",
    };

    const variantStyles = {
      // Primary: Deep Heritage British Racing Forest
      primary:
        "bg-forest-900 text-white hover:bg-forest-800 border border-forest-950 shadow-sm focus-visible:ring-forest-800",

      // Clean corporate green (backward compatibility for volt)
      volt:
        "bg-forest-900 text-white hover:bg-forest-800 border border-forest-950 shadow-sm focus-visible:ring-forest-800",
      
      // Coutts Bank Sovereign Gold / Polished Brass
      gold:
        "bg-gold-500 text-slate-950 hover:bg-gold-600 border border-gold-600 font-semibold shadow-sm focus-visible:ring-gold-500",

      // Clean Crisp White Button with Slate Border
      secondary:
        "bg-white text-slate-800 hover:bg-slate-50 border border-slate-300 shadow-sm focus-visible:ring-slate-300",

      // Clean Slate Outline
      outline:
        "border border-slate-300 text-slate-700 bg-transparent hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-slate-300",

      // White Contrast
      white:
        "bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm focus-visible:ring-slate-400",

      // Executive Slate 900
      dark:
        "bg-slate-900 text-white hover:bg-slate-800 border border-slate-950 shadow-sm focus-visible:ring-slate-800",

      ghost:
        "text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-400",
    };

    const combinedClassName = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

    if (href) {
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
