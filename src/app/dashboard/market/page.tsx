"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  DollarSign,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { AddonUpsellCard } from "@/components/dashboard/AddonUpsellCard";
import { cn } from "@/lib/utils";

/**
 * ==============================================================================
 * MARKET INTELLIGENCE DATA ADVISORY NOTE:
 * ==============================================================================
 * NOTE: AHDB & LIFFE market benchmark data is structured below as a placeholder.
 * Commercial deployment requires a direct licensed market data feed agreement
 * (e.g. Barchart / ICE Futures / AHDB Commercial Data License).
 *
 * All AI commentary is strictly framed as informational context (Red-tier notice),
 * never as a financial trade instruction or automated execution.
 */

interface CommodityQuote {
  symbol: string;
  name: string;
  category: "Arable" | "Livestock" | "Dairy" | "Inputs";
  price: string;
  unit: string;
  change: string;
  direction: "up" | "down";
  history: { month: string; value: number }[];
}

const COMMODITY_QUOTES: CommodityQuote[] = [
  {
    symbol: "W-NOV26",
    name: "UK Feed Wheat (LIFFE Nov 2026)",
    category: "Arable",
    price: "£198.50",
    unit: "per tonne",
    change: "+£3.25 (+1.7%)",
    direction: "up",
    history: [
      { month: "May", value: 188 },
      { month: "Jun", value: 192 },
      { month: "Jul", value: 195 },
      { month: "Aug", value: 198.5 },
    ],
  },
  {
    symbol: "OSR-NOV26",
    name: "Oilseed Rape (Matif Rapeseed)",
    category: "Arable",
    price: "£412.00",
    unit: "per tonne",
    change: "-£4.50 (-1.1%)",
    direction: "down",
    history: [
      { month: "May", value: 425 },
      { month: "Jun", value: 420 },
      { month: "Jul", value: 416 },
      { month: "Aug", value: 412 },
    ],
  },
  {
    symbol: "R3L-BEEF",
    name: "Deadweight Prime Cattle (R4L Base)",
    category: "Livestock",
    price: "492.4p",
    unit: "per kg deadweight",
    change: "+5.2p (+1.1%)",
    direction: "up",
    history: [
      { month: "May", value: 480 },
      { month: "Jun", value: 484 },
      { month: "Jul", value: 487 },
      { month: "Aug", value: 492.4 },
    ],
  },
  {
    symbol: "SQQ-LAMB",
    name: "New Season Lamb (SQQ Liveweight)",
    category: "Livestock",
    price: "318.0p",
    unit: "per kg liveweight",
    change: "-8.5p (-2.6%)",
    direction: "down",
    history: [
      { month: "May", value: 345 },
      { month: "Jun", value: 335 },
      { month: "Jul", value: 326 },
      { month: "Aug", value: 318 },
    ],
  },
  {
    symbol: "MILK-BASE",
    name: "UK Farmgate Milk Average (All Contracts)",
    category: "Dairy",
    price: "41.25p",
    unit: "per litre",
    change: "+0.80p (+2.0%)",
    direction: "up",
    history: [
      { month: "May", value: 39.5 },
      { month: "Jun", value: 40.1 },
      { month: "Jul", value: 40.45 },
      { month: "Aug", value: 41.25 },
    ],
  },
  {
    symbol: "FERT-AN",
    name: "UK Ammonium Nitrate (34.5% N Delivered)",
    category: "Inputs",
    price: "£335.00",
    unit: "per tonne",
    change: "-£12.00 (-3.5%)",
    direction: "down",
    history: [
      { month: "May", value: 360 },
      { month: "Jun", value: 352 },
      { month: "Jul", value: 347 },
      { month: "Aug", value: 335 },
    ],
  },
];

export default function MarketPage() {
  const { farm } = useAuth();
  const [hasEntitlement, setHasEntitlement] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const farmType = farm?.farm_type || "arable";

  const filteredQuotes = COMMODITY_QUOTES.filter((q) =>
    selectedCategory === "all" ? true : q.category.toLowerCase() === selectedCategory
  );

  if (!hasEntitlement) {
    return <AddonUpsellCard addonKey="market_intelligence" farmName={farm?.name} />;
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-parchment-300 pb-4 space-y-1">
        <div className="flex items-center space-x-2">
          <Badge variant="forest">Premium Add-on Module</Badge>
          <span className="text-xs text-charcoal-500 font-medium">LIFFE &amp; AHDB Benchmarks</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900">
          Grain &amp; Livestock Market Intelligence
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 max-w-2xl">
          Regional UK farmgate price trends, feed grain futures, and input price tracking tailored to your holding enterprises.
        </p>
      </div>

      {/* Red-Tier Advisory Disclaimer */}
      <div className="p-4 rounded-xl bg-parchment-50 border border-parchment-300 text-charcoal-700 flex items-start space-x-3 text-xs">
        <ShieldAlert className="w-4 h-4 text-terracotta-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold text-charcoal-900">
            Advisory Information Only &bull; Red-Tier Guidance
          </p>
          <p className="text-charcoal-600 leading-relaxed">
            Market commentaries and price indicators are provided for commercial planning only. They do not constitute financial advice or grain trading execution.
          </p>
        </div>
      </div>

      {/* AI Market Context Commentary Card */}
      <Card variant="linen" className="p-6 sm:p-8 border-2 border-forest-800 shadow-warm space-y-4">
        <div className="flex items-center space-x-2 text-forest-900 font-bold text-sm">
          <Sparkles className="w-4 h-4 text-gold-500" />
          <span>Advisor Market Context ({farmType.toUpperCase()} Focus)</span>
        </div>

        <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed italic bg-white p-4 rounded-xl border border-parchment-300">
          &quot;UK Feed Wheat futures (Nov 26) are firming toward £198.50/t driven by black sea export friction and delayed harvest reports across Central Europe. For your {farm?.size_hectares || 240} ha holding, current milling premiums (£32/t over feed) justify protecting grain quality during damp harvesting windows. Meanwhile, early autumn AN fertiliser quotes have softened to £335/t delivered, offering a favourable forward buying opportunity ahead of spring top-dressing.&quot;
        </p>
      </Card>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <h2 className="font-serif font-bold text-lg text-forest-900">
          Benchmark Price Trackers
        </h2>

        <div className="flex space-x-1 bg-parchment-200 p-1 rounded-lg text-xs font-semibold">
          {["all", "arable", "livestock", "dairy", "inputs"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-3 py-1 rounded capitalize transition-all",
                selectedCategory === cat
                  ? "bg-forest-800 text-parchment-50 shadow-sm"
                  : "text-charcoal-600 hover:text-forest-900"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Commodity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuotes.map((quote) => {
          const isUp = quote.direction === "up";

          return (
            <Card key={quote.symbol} variant="linen" className="p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-charcoal-500 bg-parchment-200 px-2 py-0.5 rounded">
                    {quote.symbol}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-semibold flex items-center",
                      isUp ? "text-emerald-700" : "text-amber-700"
                    )}
                  >
                    {isUp ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                    {quote.change}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-forest-950">
                  {quote.name}
                </h3>

                <div className="pt-1">
                  <span className="text-2xl font-serif font-bold text-forest-900 block">
                    {quote.price}
                  </span>
                  <span className="text-[11px] text-charcoal-400">
                    {quote.unit}
                  </span>
                </div>
              </div>

              {/* 4-Month Trend Bar */}
              <div className="pt-3 border-t border-parchment-200 space-y-1 text-xs">
                <span className="text-[10px] text-charcoal-400 block uppercase font-bold tracking-wider">
                  4-Month Trend
                </span>
                <div className="flex items-center justify-between text-[11px] text-charcoal-600 font-mono">
                  {quote.history.map((h, i) => (
                    <div key={i} className="text-center">
                      <span className="block font-bold">{h.value}</span>
                      <span className="text-[9px] text-charcoal-400">{h.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
