import React from "react";
import { Wheat, ShieldAlert, Footprints, Milk, Trees, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AdvisorPortraitProps {
  type: "arable" | "livestock" | "mixed" | "dairy";
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function AdvisorPortrait({
  type,
  name,
  className,
  size = "md",
}: AdvisorPortraitProps) {
  // Visual placeholder metadata for real hand-drawn / linocut illustration
  const configs = {
    arable: {
      bg: "bg-[#EAE4D3]",
      border: "border-[#C9A227]",
      accent: "#B5651D",
      icon: Wheat,
      iconBg: "bg-gold-100 text-gold-900",
      caption: "Crops & Agronomy",
      initials: "TC",
      subtitle: "Arable Specialist",
      landscapeColor: "#8D9B6A",
    },
    livestock: {
      bg: "bg-[#E3E8DE]",
      border: "border-[#4A6E58]",
      accent: "#2C4A3B",
      icon: Footprints,
      iconBg: "bg-forest-100 text-forest-900",
      caption: "Herds & Flocks",
      initials: "FM",
      subtitle: "Livestock Specialist",
      landscapeColor: "#6B8E70",
    },
    mixed: {
      bg: "bg-[#EFE8DE]",
      border: "border-[#B5651D]",
      accent: "#B5651D",
      icon: Trees,
      iconBg: "bg-terracotta-100 text-terracotta-900",
      caption: "Whole-Farm Systems",
      initials: "AR",
      subtitle: "Mixed Farm Specialist",
      landscapeColor: "#A38F70",
    },
    dairy: {
      bg: "bg-[#DEE7E8]",
      border: "border-[#3A6A75]",
      accent: "#2C4A3B",
      icon: Milk,
      iconBg: "bg-forest-100 text-forest-900",
      caption: "Ruminant & Milk Yield",
      initials: "EW",
      subtitle: "Dairy Specialist",
      landscapeColor: "#64858C",
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "w-16 h-16 text-lg",
    md: "w-28 h-28 text-2xl",
    lg: "w-40 h-40 md:w-48 md:h-48 text-4xl",
  };

  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden flex flex-col items-center justify-center border-2 shadow-inner select-none",
        config.bg,
        config.border,
        sizeClasses[size],
        className
      )}
      role="img"
      aria-label={`Illustrated portrait placeholder for ${name}, ${config.subtitle}`}
    >
      {/* 
        ========================================================================
        VISUAL PLACEHOLDER: Replace with commissioned editorial/linocut 
        portrait illustration in production (e.g. SVG or WebP hand-drawn artwork)
        ========================================================================
      */}
      
      {/* Background countryside landscape subtle hills */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M0 70 Q 25 50 50 65 T 100 55 L 100 100 L 0 100 Z" fill={config.landscapeColor} />
        <path d="M0 80 Q 40 68 70 78 T 100 72 L 100 100 L 0 100 Z" fill="#2C4A3B" />
        <circle cx="82" cy="22" r="9" fill="#C9A227" opacity="0.6" />
      </svg>

      {/* Center avatar representation */}
      <div className="relative z-10 flex flex-col items-center text-center p-2">
        <div className={cn("p-2.5 rounded-full mb-1 shadow-sm border border-black/5", config.iconBg)}>
          <Icon className={cn(size === "lg" ? "w-8 h-8" : size === "md" ? "w-5 h-5" : "w-4 h-4")} />
        </div>
        {size !== "sm" && (
          <span className="font-serif font-bold tracking-wider text-charcoal-800 text-xs md:text-sm">
            {name}
          </span>
        )}
      </div>

      {/* Linocut/Woodblock texture border overlay */}
      <div className="absolute inset-0 border border-black/5 pointer-events-none rounded-lg" />
    </div>
  );
}
