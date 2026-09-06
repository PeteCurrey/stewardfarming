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
  ({ className, variant = "volt", size = "md", href, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-semibold tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-tech select-none active:translate-y-[1px]";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 font-mono tracking-wider uppercase",
      md: "text-xs sm:text-sm px-5 py-2.5",
      lg: "text-sm sm:text-base px-6 py-3.5 shadow-md",
      xl: "text-base sm:text-lg px-8 py-4 font-bold tracking-tight shadow-lg",
    };

    const variantStyles = {
      // High-Octane Agro Volt (Monster Energy electric punch on dark surfaces)
      volt:
        "bg-volt text-obsidian-950 hover:bg-[#00FF85] border border-volt-neon/80 shadow-[0_0_16px_rgba(0,230,118,0.35)] hover:shadow-[0_0_24px_rgba(0,230,118,0.5)] focus-visible:ring-volt font-bold",
      
      // Coutts Bank Sovereign Gold (Imperial heritage luxury)
      gold:
        "bg-gold-coutts text-obsidian-950 hover:bg-[#E5BE48] border border-gold-300 shadow-[0_0_16px_rgba(212,175,55,0.3)] hover:shadow-[0_0_24px_rgba(212,175,55,0.45)] focus-visible:ring-gold-400 font-bold",

      // John Deere British Racing Green
      primary:
        "bg-forest-800 text-parchment-50 hover:bg-forest-700 border border-forest-600/80 shadow-precision-sm hover:border-volt/50 focus-visible:ring-forest-500",

      // Precision Dark Chassis Wireframe
      secondary:
        "bg-obsidian-800/90 text-parchment-100 hover:bg-obsidian-700 border border-white/15 hover:border-volt/40 backdrop-blur-sm focus-visible:ring-white/30",

      // Precision Outline Wireframe
      outline:
        "border border-white/25 text-parchment-100 bg-black/20 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm focus-visible:ring-white",

      // White Contrast Button
      white:
        "bg-white text-obsidian-950 hover:bg-parchment-100 border border-white shadow-md focus-visible:ring-white",

      // Dark Matte Chassis
      dark:
        "bg-obsidian-900 text-parchment-200 hover:bg-obsidian-800 border border-white/10 hover:border-gold-coutts/40 focus-visible:ring-gold-coutts",

      ghost:
        "text-parchment-200 hover:text-volt hover:bg-white/5 focus-visible:ring-volt",
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
