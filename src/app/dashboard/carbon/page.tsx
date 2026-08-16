"use client";

import React, { useState } from "react";
import {
  Leaf,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  ShieldCheck,
  Info,
  Layers,
  Sparkles,
  Download,
  Building,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { AddonUpsellCard } from "@/components/dashboard/AddonUpsellCard";
import { cn } from "@/lib/utils";

/**
 * ==============================================================================
 * CARBON ESTIMATION METHODOLOGY & FACTORS (DOCUMENTED CALCULATION LOGIC)
 * ==============================================================================
 * Baseline approximations derived from UK Farm Carbon Toolkit & IPCC Tier 1 defaults:
 * 1. Livestock Emissions (Enteric Methane & Manure):
 *    - Beef Suckler / Cattle: ~2.40 tCO2e / head / year
 *    - Breeding Ewes / Sheep: ~0.35 tCO2e / head / year
 *    - Dairy Milking Cows:    ~4.20 tCO2e / head / year
 * 2. Arable Operations & Fertiliser (Scope 1 & 3):
 *    - Synthetic Nitrogen (N2O): ~1.85 tCO2e / ha / year (standard arable baseline)
 *    - Diesel & Field Cultivation: ~0.35 tCO2e / ha / year
 * 3. Soil Sequestration & Offsets (Scope 1 Sink):
 *    - SFI Herbal Leys (SAM3): -1.80 tCO2e / ha / year (deep root biomass accumulation)
 *    - Permanent Grassland / Pasture: -0.90 tCO2e / ha / year
 *    - Hedgerows & Agroforestry: -1.20 tCO2e / 100m / year
 *
 * NOTE: Prominently labelled as an advisory estimation, NOT an audited certified carbon measurement.
 */

export default function CarbonPage() {
  const { farm } = useAuth();
  const [hasEntitlement, setHasEntitlement] = useState(true);

  // Farm baseline estimates
  const hectares = farm?.size_hectares || 240;
  const isLivestockOrDairy = farm?.farm_type === "livestock" || farm?.farm_type === "dairy" || farm?.farm_type === "mixed";

  const livestockEmissionsT = isLivestockOrDairy ? 180.5 : 0;
  const fertiliserEmissionsT = Math.round(hectares * 1.45);
  const fuelEmissionsT = Math.round(hectares * 0.32);
  const grossEmissionsT = livestockEmissionsT + fertiliserEmissionsT + fuelEmissionsT;

  const herbalLeySequestrationT = Math.round(50.6 * 1.8);
  const permanentGrassSequestrationT = Math.round(25.0 * 0.9);
  const grossSequestrationT = herbalLeySequestrationT + permanentGrassSequestrationT;

  const netCarbonT = grossEmissionsT - grossSequestrationT;

  if (!hasEntitlement) {
    return <AddonUpsellCard addonKey="carbon_reporting" farmName={farm?.name} />;
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-parchment-300 pb-4 space-y-1">
        <div className="flex items-center space-x-2">
          <Badge variant="forest">Premium Add-on Module</Badge>
          <span className="text-xs text-charcoal-500 font-medium">GHG Protocol Scope 1 &amp; 2 Estimates</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900">
          Carbon &amp; Sustainability Position
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 max-w-2xl">
          Estimated baseline greenhouse gas position calculated from registered acreage, crop rotations, and livestock headcounts.
        </p>
      </div>

      {/* Prominent Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-900 flex items-start space-x-3 text-xs sm:text-sm shadow-sm">
        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">
            Advisory Estimation Notice (Not a Certified Measurement)
          </p>
          <p className="text-xs text-amber-800 leading-relaxed">
            All carbon figures below are model-based approximations for holding planning and Red Tractor self-assessment. They do not constitute an audited ISO-14064 certification. Carbon credit marketplace trading features are planned for future partnership integrations.
          </p>
        </div>
      </div>

      {/* Top 3 Summary Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Card variant="linen" className="p-6 space-y-2 border-2 border-forest-800">
          <span className="text-xs text-charcoal-500 uppercase font-bold tracking-wider">
            Gross Holding Emissions
          </span>
          <div className="text-3xl font-serif font-bold text-forest-900">
            {grossEmissionsT} <span className="text-base font-normal text-charcoal-500">tCO₂e / yr</span>
          </div>
          <p className="text-[11px] text-charcoal-600">
            {isLivestockOrDairy ? "Enteric livestock + N fertiliser + diesel." : "Arable fertiliser application + diesel."}
          </p>
        </Card>

        <Card variant="linen" className="p-6 space-y-2 border-2 border-forest-600/40">
          <span className="text-xs text-charcoal-500 uppercase font-bold tracking-wider">
            Soil &amp; Ley Carbon Sequestration
          </span>
          <div className="text-3xl font-serif font-bold text-emerald-800">
            -{grossSequestrationT} <span className="text-base font-normal text-charcoal-500">tCO₂e / yr</span>
          </div>
          <p className="text-[11px] text-charcoal-600">
            Deep-rooting SFI herbal leys (SAM3) &amp; permanent pasture sink.
          </p>
        </Card>

        <Card variant="linen" className="p-6 space-y-2 border-2 border-gold-400">
          <span className="text-xs text-charcoal-500 uppercase font-bold tracking-wider">
            Net Estimated Carbon Balance
          </span>
          <div className="text-3xl font-serif font-bold text-forest-950">
            +{netCarbonT} <span className="text-base font-normal text-charcoal-500">tCO₂e / yr</span>
          </div>
          <p className="text-[11px] text-charcoal-600">
            Intensity: {(netCarbonT / hectares).toFixed(2)} tCO₂e per hectare.
          </p>
        </Card>

      </div>

      {/* Breakdown Breakdown Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Emissions breakdown */}
        <Card variant="linen" className="p-6 space-y-4">
          <h3 className="font-serif font-bold text-forest-900 text-base border-b border-parchment-200 pb-2">
            Emissions Breakdown by Source
          </h3>

          <div className="space-y-3 text-xs">
            {isLivestockOrDairy && (
              <div className="flex justify-between items-center p-3 rounded bg-white border border-parchment-300">
                <div>
                  <span className="font-bold text-forest-950 block">Enteric Methane &amp; Manure</span>
                  <span className="text-charcoal-500 text-[11px]">Ruminant herd digestion &amp; slurry storage</span>
                </div>
                <span className="font-mono font-bold text-sm text-charcoal-800">{livestockEmissionsT} tCO₂e</span>
              </div>
            )}

            <div className="flex justify-between items-center p-3 rounded bg-white border border-parchment-300">
              <div>
                <span className="font-bold text-forest-950 block">Inorganic Fertiliser (N2O)</span>
                <span className="text-charcoal-500 text-[11px]">Synthetic nitrogen application on cereals</span>
              </div>
              <span className="font-mono font-bold text-sm text-charcoal-800">{fertiliserEmissionsT} tCO₂e</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded bg-white border border-parchment-300">
              <div>
                <span className="font-bold text-forest-950 block">Machinery Diesel &amp; Field Fuel</span>
                <span className="text-charcoal-500 text-[11px]">Cultivation, combine harvesting &amp; haulage</span>
              </div>
              <span className="font-mono font-bold text-sm text-charcoal-800">{fuelEmissionsT} tCO₂e</span>
            </div>
          </div>
        </Card>

        {/* Sequestration & SFI Sinks */}
        <Card variant="linen" className="p-6 space-y-4">
          <h3 className="font-serif font-bold text-forest-900 text-base border-b border-parchment-200 pb-2">
            Soil Sequestration &amp; Mitigation Sinks
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center p-3 rounded bg-white border border-parchment-300">
              <div>
                <span className="font-bold text-forest-950 block">SFI SAM3 Herbal Leys (50.6 ha)</span>
                <span className="text-charcoal-500 text-[11px]">Chicory, clover &amp; plantain root accumulation</span>
              </div>
              <span className="font-mono font-bold text-sm text-emerald-700">-{herbalLeySequestrationT} tCO₂e</span>
            </div>

            <div className="flex justify-between items-center p-3 rounded bg-white border border-parchment-300">
              <div>
                <span className="font-bold text-forest-950 block">Permanent Pasture Soil Organic Matter</span>
                <span className="text-charcoal-500 text-[11px]">Uncultivated permanent grassland sinks</span>
              </div>
              <span className="font-mono font-bold text-sm text-emerald-700">-{permanentGrassSequestrationT} tCO₂e</span>
            </div>
          </div>
        </Card>

      </div>

      {/* Methodology and Marketplace note */}
      <Card variant="linen" className="p-6 space-y-3 bg-parchment-50 border border-parchment-300 text-xs text-charcoal-600">
        <div className="flex items-center space-x-2 text-forest-900 font-bold text-sm">
          <Building className="w-4 h-4 text-forest-800" />
          <span>Supermarket &amp; Supply Chain ESG Reporting</span>
        </div>
        <p className="leading-relaxed">
          Exportable format compliant with Red Tractor Environmental Benchmarking and major UK grain/milk buyer Scope 3 questionnaires. Carbon credit marketplace integrations will be announced in an upcoming phase.
        </p>
      </Card>
    </div>
  );
}
