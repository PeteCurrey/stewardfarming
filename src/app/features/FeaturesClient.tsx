"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wheat,
  Footprints,
  TrendingUp,
  Landmark,
  FileText,
  Wrench,
  Users,
  Leaf,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Camera,
  Layers,
  Calendar,
  Truck,
  ArrowRight,
  Headphones,
  Scale,
  CloudRain,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ElementType;
  isAddon?: boolean;
}

interface FeatureCategory {
  id: string;
  name: string;
  shortDesc: string;
  icon: React.ElementType;
  features: FeatureItem[];
}

const CATEGORIES: FeatureCategory[] = [
  {
    id: "crop-land",
    name: "Crop & Land",
    shortDesc: "Soil nutrition, field parcel rotations, spray windows, and drone imagery.",
    icon: Wheat,
    features: [
      {
        title: "5-Year Break Crop Rotation Planner",
        description: "Models multi-year combinable rotations, nitrogen carry-over, break crops, and gross margin optimization per hectare.",
        icon: Wheat,
      },
      {
        title: "Met Office DataHub Spray Window Telemetry",
        description: "1.1km high-resolution spot forecasts, 10m wind speed, humidity, and inversion drift alerts evaluated against the UK Plant Protection Code of Practice.",
        icon: CloudRain,
      },
      {
        title: "RB209 Soil Nutrition & Variable Rate Plans",
        description: "Standardised P, K, Mg, and pH recommendations aligned with Defra RB209 guidelines and variable-rate spreading files.",
        icon: Layers,
      },
      {
        title: "Cover Crop & Soil Organic Matter Tracker",
        description: "Monitors species mixes, root depth benefits, and calculates green manure nitrogen contributions for following crops.",
        icon: Leaf,
      },
      {
        title: "Satellite & Drone Multispectral Imagery",
        description: "NDVI vegetation index scans, weed patch detection, and drainage tile blockage alerts updated weekly via satellite feeds.",
        icon: Camera,
        isAddon: true,
      },
    ],
  },
  {
    id: "livestock",
    name: "Livestock & Welfare",
    shortDesc: "Herd movements, medicine records, pasture budgeting, and breeding cycles.",
    icon: Footprints,
    features: [
      {
        title: "Statutory Medicine Book & Withdrawal Tracker",
        description: "Automated treatment logging with strict countdown timers on statutory meat and milk withdrawal periods.",
        icon: ShieldCheck,
      },
      {
        title: "Grazing Paddock & Dry Matter Budgeting",
        description: "Calculates pasture covers, stocking rate days per paddock, and forage deficits based on grass growth curves.",
        icon: Footprints,
      },
      {
        title: "BCMS & ScotEID Movement Sync",
        description: "Pre-fills statutory birth, movement, and mortality records to eliminate late registration fines.",
        icon: Calendar,
      },
      {
        title: "Livestock Weight Gain Benchmarks",
        description: "Tracks average daily liveweight gain (DLWG) against slaughter contract target specifications.",
        icon: Scale,
      },
    ],
  },
  {
    id: "subsidies",
    name: "Subsidies & SFI",
    shortDesc: "SFI action stackability, payment modeling, and compliance audits.",
    icon: Landmark,
    features: [
      {
        title: "Defra SFI Action Stacking Solver",
        description: "Maps parcel eligibility across SAM3, NUM1, IPM1, and HRW1 actions, maximizing revenue per hectare while avoiding clawback risks.",
        icon: Landmark,
      },
      {
        title: "Statutory SFI Photo Evidence Vault",
        description: "Geotagged photographic records with timestamp verification to satisfy RPA inspection requirements.",
        icon: Camera,
      },
      {
        title: "Countryside Stewardship Anniversary Alerts",
        description: "Reminders for mid-tier declarations, capital claim submissions, and educational visit logs.",
        icon: Calendar,
      },
      {
        title: "Subsidy & Grant Concierge Drafting",
        description: "Claude-powered preparation of FETF and slurry infrastructure grant forms ready for your review.",
        icon: FileText,
        isAddon: true,
      },
    ],
  },
  {
    id: "compliance",
    name: "Compliance & Audits",
    shortDesc: "NVZ records, Red Tractor evidence packs, and machinery LOLER certificates.",
    icon: ShieldCheck,
    features: [
      {
        title: "Red Tractor One-Click Audit Pack Export",
        description: "Compiles field logs, chemical registers, machinery test certs, and training records into an organized PDF bundle.",
        icon: FileText,
      },
      {
        title: "NVZ Nitrogen Spreading Closed Period Engine",
        description: "Statutory countdowns and rainfall-triggered spreading ground condition warnings.",
        icon: ShieldCheck,
      },
      {
        title: "Farm Safety & COSHH Assessment Generator",
        description: "Standard risk assessment templates for grain stores, livestock handling, and chemical storage.",
        icon: HeartHandshake,
      },
      {
        title: "Fleet & Sprayer NSTS Certification Tracking",
        description: "Service intervals, engine hour logs, and annual testing countdowns for tractors and boom sprayers.",
        icon: Wrench,
      },
    ],
  },
  {
    id: "markets",
    name: "Markets & Carbon",
    shortDesc: "Futures prices, deadweight livestock averages, and carbon footprint audits.",
    icon: TrendingUp,
    features: [
      {
        title: "UK Feed Wheat Futures & Margin Tracking",
        description: "Real-time LIFFE feed wheat quotes with automated cost-of-production break-even alerts.",
        icon: TrendingUp,
      },
      {
        title: "Auction Mart Deadweight Averages",
        description: "Regional beef and lamb price trends across key UK livestock markets.",
        icon: Scale,
      },
      {
        title: "Cool Farm Tool Carbon Footprint Reporting",
        description: "Auditable carbon and sustainability metrics to satisfy supply chain demands.",
        icon: Leaf,
        isAddon: true,
      },
      {
        title: "Weekly Commodity & Input Market Intelligence",
        description: "Executive grain, fertilizer, and feed market briefings prepared by agricultural economists.",
        icon: FileText,
        isAddon: true,
      },
    ],
  },
];

export function FeaturesClient() {
  const [activeTab, setActiveTab] = useState<string>("crop-land");

  const currentCategory = CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];

  return (
    <div className="flex flex-col bg-white text-slate-900">
      
      {/* Header — Full Screen Hero with Modern Agricultural Technology Background */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-900">
        {/* Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=2560&q=85"
          alt="Modern agricultural machinery harvesting grain fields under dramatic sky"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-85 scale-100"
          fetchPriority="high"
        />

        {/* Directional Soft Overlays for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-slate-900/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30 pointer-events-none" />

        {/* Content Container — Left-aligned matching navbar logo */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 sm:pb-28 text-left space-y-8">
          <div className="inline-flex items-center">
            <span className="inline-flex items-center space-x-2 bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>The Feature Matrix &bull; Sovereign UK Agricultural Systems</span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extralight text-white leading-[1.08] tracking-tight max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Engineered for Modern British Agriculture.
          </h1>

          <p className="text-base sm:text-xl font-sans font-light text-slate-100 max-w-2xl leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            Every feature in Steward is grounded in UK agricultural practice, statutory compliance rules, and field-tested farm management workflows.
          </p>

          <div className="pt-4 flex flex-wrap gap-2 max-w-3xl">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm transition-all backdrop-blur-md border",
                    isActive
                      ? "bg-white text-slate-900 border-white font-semibold shadow-lg ring-2 ring-white/50"
                      : "bg-slate-900/70 text-white border-white/20 hover:bg-slate-900/90 hover:border-white/40"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-emerald-700" : "text-emerald-400")} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tabs & Grid */}
      <Section variant="white">
        
        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-forest-900 text-white font-semibold shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-emerald-400" : "text-slate-500")} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Header */}
        <div className="mb-8 text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl font-serif font-medium text-slate-900">
            {currentCategory.name}
          </h2>
          <p className="text-sm text-slate-600">
            {currentCategory.shortDesc}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCategory.features.map((feature, idx) => {
            const Icon = feature.icon;

            return (
              <Card
                key={idx}
                className="flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
                      <Icon className="w-5 h-5" />
                    </div>

                    {feature.isAddon ? (
                      <span className="text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                        Optional Add-on
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                        Core Plan
                      </span>
                    )}
                  </div>

                  <CardTitle className="text-base sm:text-lg font-serif">
                    {feature.title}
                  </CardTitle>

                  <CardDescription className="text-xs text-slate-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Note */}
        <div className="mt-12 p-6 rounded-xl bg-slate-50 border border-slate-200 max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600">
          <div>
            <p className="font-semibold text-slate-900 text-sm">
              Modular Enterprise Architecture
            </p>
            <p className="mt-0.5">
              Core agronomy, Met Office radar integration, and Defra SFI tracking are included standard. Premium modules activate with a single click.
            </p>
          </div>
          <Button href="/pricing" variant="secondary" size="sm" className="whitespace-nowrap">
            View Pricing &rarr;
          </Button>
        </div>
      </Section>

      {/* Callout */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Badge variant="gold">30-Day Free Pilot</Badge>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white">
            Experience These Capabilities on Your Holding.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Connect your RPA field parcels and start testing proactive daily briefings tailored to your acreage today.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/signup" variant="white" size="lg">
              Start 30-Day Free Trial
            </Button>
            <Button href="/advisors" variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10">
              Meet the Advisory Team
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
