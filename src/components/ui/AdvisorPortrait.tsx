import React from "react";
import { Wheat, Footprints, Trees, Milk } from "lucide-react";
import { cn } from "@/lib/utils";
import { ADVISOR_PERSONAS, FarmType } from "@/lib/types";

export interface AdvisorPortraitProps {
  type: FarmType;
  name?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showBadge?: boolean;
}

export function AdvisorPortrait({
  type,
  name,
  className,
  size = "md",
  showBadge = true,
}: AdvisorPortraitProps) {
  const advisor = ADVISOR_PERSONAS[type] || ADVISOR_PERSONAS.arable;
  const displayName = name || advisor.name;

  const configs = {
    arable: {
      image: "/images/advisors/tom-campbell.jpg",
      border: "border-gold-coutts/40 group-hover:border-gold-coutts",
      accentBg: "bg-gold-coutts",
      icon: Wheat,
      iconBg: "bg-obsidian-900 text-gold-300 border-gold-coutts/50",
      subtitle: "Arable & Agronomy Specialist",
      code: "AG-01 // ARABLE",
    },
    livestock: {
      image: "/images/advisors/fiona-macleod.jpg",
      border: "border-forest-500/50 group-hover:border-volt",
      accentBg: "bg-volt",
      icon: Footprints,
      iconBg: "bg-obsidian-900 text-volt border-volt/50",
      subtitle: "Livestock & Herd Husbandry",
      code: "LS-02 // LIVESTOCK",
    },
    mixed: {
      image: "/images/advisors/alistair-reid.jpg",
      border: "border-terracotta-600/50 group-hover:border-terracotta-400",
      accentBg: "bg-terracotta-600",
      icon: Trees,
      iconBg: "bg-obsidian-900 text-terracotta-300 border-terracotta-500/50",
      subtitle: "Mixed Farm Systems",
      code: "MX-03 // MIXED",
    },
    dairy: {
      image: "/images/advisors/eleanor-wright.jpg",
      border: "border-sky-500/50 group-hover:border-sky-400",
      accentBg: "bg-sky-500",
      icon: Milk,
      iconBg: "bg-obsidian-900 text-sky-300 border-sky-400/50",
      subtitle: "Dairy Systems & Nutrition",
      code: "DY-04 // DAIRY",
    },
  };

  const config = configs[type] || configs.arable;
  const Icon = config.icon;

  const sizeClasses = {
    sm: "w-12 h-12 min-w-[3rem] min-h-[3rem] rounded-tech",
    md: "w-24 h-24 sm:w-28 sm:h-28 min-w-[6rem] min-h-[6rem] rounded-panel",
    lg: "w-44 h-44 sm:w-52 sm:h-52 min-w-[11rem] min-h-[11rem] rounded-card",
  };

  const badgeSizes = {
    sm: "w-4 h-4 -bottom-1 -right-1 p-0.5",
    md: "w-6 h-6 -bottom-1.5 -right-1.5 p-1",
    lg: "w-8 h-8 -bottom-2 -right-2 p-1.5",
  };

  const iconSizes = {
    sm: "w-2.5 h-2.5",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };

  return (
    <div className={cn("relative inline-block select-none group", className)}>
      <div
        className={cn(
          "relative overflow-hidden border-2 shadow-2xl bg-obsidian-950 transition-all duration-300",
          config.border,
          sizeClasses[size]
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={config.image}
          alt={`Portrait of ${displayName}, ${config.subtitle}`}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Tactical vignette and scanline sheen */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
      </div>

      {/* Specialty icon corner badge */}
      {showBadge && (
        <div
          className={cn(
            "absolute rounded-full flex items-center justify-center shadow-lg border",
            config.iconBg,
            badgeSizes[size]
          )}
          title={config.subtitle}
        >
          <Icon className={iconSizes[size]} />
        </div>
      )}
    </div>
  );
}
