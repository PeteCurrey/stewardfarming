import React from "react";
import Image from "next/image";
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
      border: "border-[#C9A227]",
      accentBg: "bg-gold-500",
      icon: Wheat,
      iconBg: "bg-gold-100 text-gold-900 border-gold-300",
      subtitle: "Arable & Agronomy Specialist",
    },
    livestock: {
      image: "/images/advisors/fiona-macleod.jpg",
      border: "border-[#4A6E58]",
      accentBg: "bg-forest-700",
      icon: Footprints,
      iconBg: "bg-forest-100 text-forest-900 border-forest-300",
      subtitle: "Livestock & Herd Husbandry",
    },
    mixed: {
      image: "/images/advisors/alistair-reid.jpg",
      border: "border-[#B5651D]",
      accentBg: "bg-terracotta-700",
      icon: Trees,
      iconBg: "bg-terracotta-100 text-terracotta-900 border-terracotta-300",
      subtitle: "Mixed Farm Systems",
    },
    dairy: {
      image: "/images/advisors/eleanor-wright.jpg",
      border: "border-[#3A6A75]",
      accentBg: "bg-forest-800",
      icon: Milk,
      iconBg: "bg-forest-100 text-forest-900 border-forest-300",
      subtitle: "Dairy Systems & Nutrition",
    },
  };

  const config = configs[type] || configs.arable;
  const Icon = config.icon;

  const sizeClasses = {
    sm: "w-14 h-14 min-w-[3.5rem] min-h-[3.5rem]",
    md: "w-24 h-24 sm:w-28 sm:h-28 min-w-[6rem] min-h-[6rem]",
    lg: "w-44 h-44 sm:w-52 sm:h-52 min-w-[11rem] min-h-[11rem]",
  };

  const badgeSizes = {
    sm: "w-5 h-5 -bottom-1 -right-1 p-0.5",
    md: "w-7 h-7 -bottom-1.5 -right-1.5 p-1",
    lg: "w-9 h-9 -bottom-2 -right-2 p-1.5",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className={cn("relative inline-block select-none", className)}>
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden border-2 shadow-warm bg-parchment-200",
          config.border,
          sizeClasses[size]
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={config.image}
          alt={`Portrait of ${displayName}, ${config.subtitle}`}
          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Subtle inner vignette for photo depth */}
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none" />
      </div>

      {/* Specialty icon corner badge */}
      {showBadge && (
        <div
          className={cn(
            "absolute rounded-full flex items-center justify-center shadow-md border",
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
