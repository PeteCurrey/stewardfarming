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
      borderColor: "border-slate-200 group-hover:border-forest-700",
      icon: Wheat,
      iconBg: "bg-forest-900 text-white border-white",
      subtitle: "Arable & Agronomy Specialist",
      code: "Arable",
    },
    livestock: {
      image: "/images/advisors/fiona-macleod.jpg",
      borderColor: "border-slate-200 group-hover:border-forest-700",
      icon: Footprints,
      iconBg: "bg-forest-900 text-white border-white",
      subtitle: "Livestock & Herd Husbandry",
      code: "Livestock",
    },
    mixed: {
      image: "/images/advisors/alistair-reid.jpg",
      borderColor: "border-slate-200 group-hover:border-forest-700",
      icon: Trees,
      iconBg: "bg-forest-900 text-white border-white",
      subtitle: "Mixed Farm Systems",
      code: "Mixed",
    },
    dairy: {
      image: "/images/advisors/eleanor-wright.jpg",
      borderColor: "border-slate-200 group-hover:border-forest-700",
      icon: Milk,
      iconBg: "bg-forest-900 text-white border-white",
      subtitle: "Dairy Systems & Nutrition",
      code: "Dairy",
    },
  };

  const config = configs[type] || configs.arable;
  const Icon = config.icon;

  const sizeClasses = {
    sm: "w-12 h-12 min-w-[3rem] min-h-[3rem] rounded-full",
    md: "w-24 h-24 sm:w-28 sm:h-28 min-w-[6rem] min-h-[6rem] rounded-2xl",
    lg: "w-44 h-44 sm:w-48 sm:h-48 min-w-[11rem] min-h-[11rem] rounded-2xl",
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
          "relative overflow-hidden border bg-slate-100 shadow-sm transition-all duration-200",
          config.borderColor,
          sizeClasses[size]
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={config.image}
          alt={`Portrait of ${displayName}, ${config.subtitle}`}
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Specialty icon corner badge */}
      {showBadge && (
        <div
          className={cn(
            "absolute rounded-full flex items-center justify-center shadow border-2",
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
