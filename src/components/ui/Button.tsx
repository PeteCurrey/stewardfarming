import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gold" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-2 tracking-wide font-semibold",
      md: "text-sm px-5 py-2.5 tracking-wide font-medium",
      lg: "text-base px-7 py-3.5 tracking-wide font-medium shadow-sm",
    };

    const variantStyles = {
      primary:
        "bg-forest-800 text-parchment-50 hover:bg-forest-900 border border-forest-900 shadow-sm focus-visible:ring-forest-700 active:translate-y-[1px]",
      secondary:
        "bg-parchment-200 text-charcoal-800 hover:bg-parchment-300 border border-parchment-400 focus-visible:ring-parchment-500",
      gold:
        "bg-gold-500 text-charcoal-900 hover:bg-gold-600 border border-gold-600 font-semibold shadow-sm focus-visible:ring-gold-400 active:translate-y-[1px]",
      ghost:
        "text-charcoal-800 hover:text-forest-800 hover:bg-parchment-200/60 focus-visible:ring-forest-700",
      outline:
        "border border-forest-800 text-forest-800 bg-transparent hover:bg-forest-800 hover:text-parchment-50 focus-visible:ring-forest-700",
      white:
        "bg-white text-forest-900 hover:bg-parchment-50 border border-parchment-300 shadow-sm focus-visible:ring-forest-700",
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
