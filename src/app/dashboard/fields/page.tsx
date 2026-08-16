"use client";

import React, { useState } from "react";
import {
  Layers,
  MapPin,
  TrendingUp,
  CloudSun,
  Sparkles,
  Calendar,
  Compass,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { AddonUpsellCard } from "@/components/dashboard/AddonUpsellCard";
import { cn } from "@/lib/utils";

interface FieldParcelView {
  id: string;
  name: string;
  areaHectares: number;
  landUse: string;
  ndviCurrent: number;
  ndviPrevious: number;
  trend: "improving" | "stable" | "declining";
  summary: string;
  history: { date: string; ndvi: number }[];
}

const DEMO_FIELDS: FieldParcelView[] = [
  {
    id: "fld-1",
    name: "Home 40ha (Winter Milling Wheat)",
    areaHectares: 40.2,
    landUse: "Combinable Wheat",
    ndviCurrent: 0.78,
    ndviPrevious: 0.73,
    trend: "improving",
    summary: "Vegetation canopy density has improved by +6.8% over the past 21 days following the T2 fungicide application. Chlorophyll reflectance indicates robust flag leaf retention across the central clay basin.",
    history: [
      { date: "01 Jul", ndvi: 0.65 },
      { date: "15 Jul", ndvi: 0.71 },
      { date: "28 Jul", ndvi: 0.73 },
      { date: "12 Aug", ndvi: 0.78 },
    ],
  },
  {
    id: "fld-2",
    name: "Valley Meadow (SFI SAM3 Herbal Ley)",
    areaHectares: 18.5,
    landUse: "Temporary Grassland",
    ndviCurrent: 0.72,
    ndviPrevious: 0.71,
    trend: "stable",
    summary: "Canopy biomass is holding steady post-grazing. Diverse legumes (red & white clover, chicory, plantain) exhibit deep taproot moisture resilience.",
    history: [
      { date: "01 Jul", ndvi: 0.74 },
      { date: "15 Jul", ndvi: 0.68 },
      { date: "28 Jul", ndvi: 0.71 },
      { date: "12 Aug", ndvi: 0.72 },
    ],
  },
  {
    id: "fld-3",
    name: "High Hill (Spring Malting Barley)",
    areaHectares: 32.1,
    landUse: "Spring Cereals",
    ndviCurrent: 0.58,
    ndviPrevious: 0.64,
    trend: "declining",
    summary: "Expected natural crop senescence as barley grains ripen toward 15% harvest moisture. No anomalous stress patterns detected on chalk ridge boundaries.",
    history: [
      { date: "01 Jul", ndvi: 0.75 },
      { date: "15 Jul", ndvi: 0.72 },
      { date: "28 Jul", ndvi: 0.64 },
      { date: "12 Aug", ndvi: 0.58 },
    ],
  },
];

export default function FieldsSatellitePage() {
  const { farm } = useAuth();
  const [hasEntitlement, setHasEntitlement] = useState(true);
  const [selectedField, setSelectedField] = useState<FieldParcelView>(DEMO_FIELDS[0]);

  if (!hasEntitlement) {
    return (
      <div className="space-y-6">
        <div className="border-b border-parchment-300 pb-4">
          <h1 className="text-2xl font-serif font-bold text-forest-900">
            Registered Field Parcels
          </h1>
          <p className="text-xs text-charcoal-600">
            Viewing standard field list. Upgrade to unlock Sentinel-2 10m multispectral satellite imagery.
          </p>
        </div>

        {/* Basic fields list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DEMO_FIELDS.map((f) => (
            <Card key={f.id} variant="linen" className="p-4 space-y-1">
              <h3 className="font-serif font-bold text-sm text-forest-900">{f.name}</h3>
              <p className="text-xs text-charcoal-500">{f.areaHectares} ha &bull; {f.landUse}</p>
            </Card>
          ))}
        </div>

        <AddonUpsellCard addonKey="satellite_imagery" farmName={farm?.name} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-parchment-300 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="gold">Sentinel-2 L2A Multispectral</Badge>
            <span className="text-xs text-charcoal-500 font-medium">10m Ground Resolution</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 mt-1">
            Fields &amp; Satellite NDVI Surface
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Track vegetative vigor, biomass distribution, and SFI green cover compliance across your holding.
          </p>
        </div>

        <div className="text-xs text-charcoal-500 bg-white px-3 py-2 rounded-lg border border-parchment-300 shadow-sm flex items-center space-x-2">
          <CloudSun className="w-4 h-4 text-gold-600" />
          <span>Latest Pass: 12 Aug 2026 (2% Cloud Cover)</span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Field Parcel Selector & Map Visual */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="font-serif font-bold text-base text-forest-900">
            Holding Parcels ({DEMO_FIELDS.length})
          </h2>

          <div className="space-y-2.5">
            {DEMO_FIELDS.map((field) => {
              const isSelected = selectedField.id === field.id;

              return (
                <div
                  key={field.id}
                  onClick={() => setSelectedField(field)}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all cursor-pointer space-y-2",
                    isSelected
                      ? "bg-white border-forest-800 shadow-md ring-1 ring-forest-800/20"
                      : "bg-parchment-50 border-parchment-300 hover:border-forest-400"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-forest-950">
                      {field.name}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded",
                        field.trend === "improving"
                          ? "bg-emerald-100 text-emerald-800"
                          : field.trend === "stable"
                          ? "bg-forest-100 text-forest-800"
                          : "bg-amber-100 text-amber-800"
                      )}
                    >
                      NDVI {field.ndviCurrent} ({field.trend})
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-charcoal-500">
                    <span>{field.areaHectares} ha &bull; {field.landUse}</span>
                    <span className="text-forest-800 font-semibold flex items-center">
                      View NDVI &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Simple Leaflet/OSM map placeholder */}
          <div className="p-4 rounded-xl bg-forest-900 text-parchment-100 space-y-3 shadow-warm">
            <div className="flex items-center justify-between text-xs border-b border-forest-800 pb-2">
              <span className="font-serif font-bold text-parchment-50">
                Holding Boundary Map
              </span>
              <span className="font-mono text-gold-400">OS OpenSpace Tiles</span>
            </div>
            <div className="h-44 rounded-lg bg-forest-950/80 border border-forest-700 flex flex-col items-center justify-center text-center p-4 space-y-2">
              <Compass className="w-8 h-8 text-gold-400 animate-pulse" />
              <p className="text-xs text-parchment-200">
                Centred on {selectedField.name}
              </p>
              <span className="text-[10px] text-parchment-400">
                54.232° N, 1.341° W &bull; RPA Digital Parcel Shape Linked
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Field Deep Dive & NDVI Trend */}
        <div className="lg:col-span-7 space-y-6">
          <Card variant="linen" className="p-6 sm:p-8 shadow-warm space-y-6">
            
            {/* Header for selected field */}
            <div className="border-b border-parchment-200 pb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
                  Multispectral Crop Analysis
                </span>
                <Badge variant="forest">Active Sentinel-2 Pass</Badge>
              </div>
              <h2 className="text-2xl font-serif font-bold text-forest-900">
                {selectedField.name}
              </h2>
              <p className="text-xs text-charcoal-500">
                {selectedField.areaHectares} ha &bull; Enterprise: {selectedField.landUse}
              </p>
            </div>

            {/* Plain language summary box */}
            <div className="bg-white p-5 rounded-xl border border-parchment-300 shadow-sm space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-forest-900">
                <Sparkles className="w-4 h-4 text-gold-500" />
                <span>Advisor Canopy Interpretation</span>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed italic">
                &quot;{selectedField.summary}&quot;
              </p>
            </div>

            {/* Simulated NDVI Trend Chart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-forest-950">
                  4-Week NDVI Biomass Progression
                </span>
                <span className="font-mono text-forest-800 font-semibold">
                  Latest: {selectedField.ndviCurrent} / 1.00
                </span>
              </div>

              {/* Bar visualization */}
              <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-parchment-300 text-center">
                {selectedField.history.map((pt, i) => (
                  <div key={i} className="space-y-2 flex flex-col items-center justify-end h-32">
                    <div
                      className="w-full bg-forest-700 rounded-t transition-all"
                      style={{ height: `${pt.ndvi * 100}%` }}
                    />
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold font-mono text-forest-950 block">
                        {pt.ndvi}
                      </span>
                      <span className="text-[10px] text-charcoal-500 block">
                        {pt.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Variable Rate N Advice footer */}
            <div className="pt-3 border-t border-parchment-200 flex items-center justify-between text-xs text-charcoal-600">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-forest-700" />
                <span>Compatible with Claas Telematics &amp; John Deere Operations Center</span>
              </div>
            </div>

          </Card>
        </div>

      </div>
    </div>
  );
}
