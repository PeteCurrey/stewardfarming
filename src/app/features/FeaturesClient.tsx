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
  Sparkles,
  Camera,
  Layers,
  Activity,
  Calendar,
  AlertCircle,
  Truck,
  ArrowRight,
  Headphones,
  Scale,
  DollarSign,
  CloudRain,
  Radio,
  FileSpreadsheet,
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
        title: "Micro-Climate Spray Window Forecasting",
        description: "Hourly field-level wind speed, inversion layer, and dew point alerts to prevent spray drift and ensure chemical efficacy.",
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
        description: "Plate meter growth curves, stocking density calculations, and rotational grazing moves to prevent sward compaction.",
        icon: Footprints,
      },
      {
        title: "BCMS & ScotEID Holding Movement Sync",
        description: "Automated ear tag register, birth notifications, off-holding movement declarations, and casualty logs.",
        icon: FileSpreadsheet,
      },
      {
        title: "TMR Ration Balancing & Feed Conversion",
        description: "Formulates winter rations based on forage analysis (D-value, ME, crude protein) to maximise liveweight gain or milk yield.",
        icon: Scale,
      },
      {
        title: "Breeding Cycles, Tupping & Calving Calendar",
        description: "Tracks service dates, predicted calving/lambing windows, scanning percentages, and colostrum supplies.",
        icon: Calendar,
      },
    ],
  },
  {
    id: "financial-grants",
    name: "Financial & Grants",
    shortDesc: "Cash flow forecasts, input cost tracking, grain hedging, and capital grants.",
    icon: TrendingUp,
    features: [
      {
        title: "Enterprise-Level Profit & Loss Modelling",
        description: "Tracks individual gross margins across wheat, barley, suckler beef, sheep, and contract farming agreements.",
        icon: TrendingUp,
      },
      {
        title: "Input Inflation & Fuel/Fertiliser Tracker",
        description: "Live UK red diesel, ammonium nitrate, and feed price monitoring with forward purchasing advice.",
        icon: DollarSign,
      },
      {
        title: "Farming Equipment & Technology Fund (FETF) Alerts",
        description: "Proactive notifications 60 days before Defra capital grant windows open for direct drills, slurry scrapers, and GPS units.",
        icon: Landmark,
      },
      {
        title: "Invoice & Delivery Note OCR Capture",
        description: "Snap a photo of seed, spray, or feed dockets in the yard; Steward logs the inventory and preps your VAT ledger.",
        icon: FileText,
      },
      {
        title: "Subsidy & Grant Concierge",
        description: "Dedicated specialist review of bespoke capital grant applications, Slurry Infrastructure Grants, and Woodland Creation agreements.",
        icon: Headphones,
        isAddon: true,
      },
    ],
  },
  {
    id: "compliance-subsidies",
    name: "Compliance & Subsidies",
    shortDesc: "SFI 2024/2025 engine, Red Tractor audits, NVZ risk maps, and RPA parcel sync.",
    icon: FileText,
    features: [
      {
        title: "UK SFI & Countryside Stewardship Maximiser",
        description: "Live Defra rules engine. Maps eligible actions (SAM3 Herbal leys, NUM1 Legume fallow, IPM1, HRW1 Hedgerows) to your RPA parcels and calculates maximum annual payments.",
        icon: Landmark,
      },
      {
        title: "SFI Stackability & Clawback Prevention",
        description: "Prevents double-funding disqualifications by cross-referencing parcel histories and active legacy CS agreements against new SFI options.",
        icon: ShieldCheck,
      },
      {
        title: "One-Click Red Tractor & Farm Assurance Packs",
        description: "Compiles all required spray records, livestock medicine sheets, rodent control logs, and grain store clean-down audits into a single PDF.",
        icon: FileText,
      },
      {
        title: "NVZ Risk Mapping & Slurry Closed Periods",
        description: "Automated calculations for 170kg N/ha holding limits, field N-Max budgets, and alerts during autumn/winter spreading bans.",
        icon: AlertCircle,
      },
      {
        title: "Waste Exemptions & Environmental Permitting",
        description: "Tracks U1, D7, and S2 agricultural waste exemption renewals with the Environment Agency.",
        icon: CheckCircle2,
      },
    ],
  },
  {
    id: "machinery-labour",
    name: "Machinery & Labour",
    shortDesc: "Fleet maintenance, telematics, contractor booking, and lone worker safety.",
    icon: Wrench,
    features: [
      {
        title: "Contractor Booking & Silage Scheduling",
        description: "Coordinates forage harvesting, hedge cutting, and combining contractor availability against weather windows.",
        icon: Users,
      },
      {
        title: "HSE Farm Safety Briefings & Lone Worker Check-in",
        description: "Automated SMS lone-worker safety check-ins when working alone in remote fields, plus quick safety induction forms for seasonal staff.",
        icon: HeartHandshake,
      },
      {
        title: "Fleet & Machinery Telematics Hub",
        description: "Direct telematics sync with John Deere, Case IH, New Holland, and Fendt for live fuel consumption, engine hours, and fault codes.",
        icon: Truck,
        isAddon: true,
      },
      {
        title: "MOT, LOLER & Sprayer Testing Logs (NSTC)",
        description: "Maintains inspection records for telehandlers, trailers, and mandatory 3-year National Sprayer Testing Scheme certificates.",
        icon: Wrench,
        isAddon: true,
      },
    ],
  },
  {
    id: "market-sustainability",
    name: "Market & Sustainability",
    shortDesc: "LIFFE futures, mart prices, carbon footprinting, and biodiversity metrics.",
    icon: Leaf,
    features: [
      {
        title: "Defra-Compliant Whole-Farm Carbon Footprint",
        description: "Calculates baseline emissions per tonne of grain or kg of liveweight to meet supply chain Scope 3 carbon auditing requirements.",
        icon: Leaf,
      },
      {
        title: "Hedgerow Biomass & BNG Calculator",
        description: "Estimates hedgerow structure, tree canopy carbon, and Biodiversity Net Gain (BNG) units for potential local authority offset sales.",
        icon: Layers,
      },
      {
        title: "Live UK Market Intelligence & Futures Feed",
        description: "Real-time feed wheat futures (LIFFE/Euronext), AHDB regional livestock deadweight prices, and ex-farm straw indexes.",
        icon: TrendingUp,
        isAddon: true,
      },
      {
        title: "Priority Accredited Expert Access",
        description: "Guaranteed 2-hour callback SLA from BASIS agronomists, RCVS farm vets, and rural tax accountants for emergency advice.",
        icon: Headphones,
        isAddon: true,
      },
    ],
  },
];

export function FeaturesClient() {
  const [activeTab, setActiveTab] = useState<string>("compliance-subsidies");

  const currentCategory = CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];

  return (
    <div className="flex flex-col">
      {/* HEADER */}
      <section className="pt-28 pb-16 bg-parchment-100 border-b border-parchment-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="forest">The Full Steward Platform</Badge>
          <h1 className="text-4xl sm:text-5xl font-serif font-medium text-forest-900 leading-tight">
            Comprehensive capabilities, tailored to British fields.
          </h1>
          <p className="text-lg text-charcoal-700 leading-relaxed max-w-2xl mx-auto">
            From daily spray window forecasting to multi-year SFI subsidy planning, explore the full breadth of Steward’s agricultural intelligence suite.
          </p>
        </div>
      </section>

      {/* TABBED CATEGORY BROWSER */}
      <Section variant="white" containerSize="lg">
        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-parchment-300 pb-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-forest-700",
                  isActive
                    ? "bg-forest-800 text-parchment-50 shadow-warm font-serif font-semibold"
                    : "bg-parchment-50 text-charcoal-700 hover:bg-parchment-200 border border-parchment-300"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-gold-400" : "text-forest-800")} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900">
            {currentCategory.name}
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600">
            {currentCategory.shortDesc}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCategory.features.map((feature, idx) => {
            const Icon = feature.icon;
            const isHighlight = feature.title.includes("SFI");

            return (
              <Card
                key={idx}
                variant={isHighlight ? "gold-tint" : "linen"}
                hoverEffect
                className={cn("flex flex-col justify-between relative", isHighlight && "border-2 border-gold-400")}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={cn(
                        "p-2.5 rounded-lg border",
                        isHighlight
                          ? "bg-gold-200 text-gold-950 border-gold-400"
                          : "bg-forest-100 text-forest-900 border-forest-200"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {feature.isAddon ? (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-terracotta-800 bg-terracotta-100 border border-terracotta-300 px-2 py-0.5 rounded-full">
                        Add-on
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-forest-800 bg-forest-100 border border-forest-200 px-2 py-0.5 rounded-full">
                        Core Plan
                      </span>
                    )}
                  </div>

                  <CardTitle className="text-base sm:text-lg font-serif">
                    {feature.title}
                  </CardTitle>

                  <CardDescription className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </div>

                {isHighlight && (
                  <div className="mt-4 pt-3 border-t border-gold-300/80 flex items-center justify-between text-xs text-forest-900 font-semibold">
                    <span>Defra 2024/2025 SFI Handbook Ready</span>
                    <span className="text-terracotta-700">Auto-Drafting &rarr;</span>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Subscription vs Add-On Note */}
        <div className="mt-14 p-6 rounded-xl bg-parchment-50 border border-parchment-300 max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-charcoal-700">
          <div className="space-y-1">
            <p className="font-serif font-bold text-forest-900 text-sm">
              Modular UK Subscription Structure
            </p>
            <p className="text-charcoal-600">
              All core advisory, SFI subsidy tracking, and compliance logs are included in your standard plan. Specialised add-on modules (Satellite Imagery, Fleet Telematics, Concierge Grant Service) can be added as needed.
            </p>
          </div>
          <Button href="/pricing" variant="outline" size="sm" className="whitespace-nowrap">
            View Plan Details &rarr;
          </Button>
        </div>
      </Section>

      {/* CALLOUT BANNER */}
      <section className="py-16 bg-forest-900 text-parchment-100 border-t border-forest-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="gold">Ready to explore?</Badge>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-parchment-50">
            See how these features connect on your own farm.
          </h2>
          <p className="text-sm sm:text-base text-parchment-200 max-w-xl mx-auto">
            Take a 30-day free trial. Link your RPA parcels and experience proactive advice tailored to your acreage.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button href="/signup" variant="gold" size="lg">
              Start 30-Day Free Trial
            </Button>
            <Button href="/advisors" variant="outline" size="lg" className="border-parchment-300 text-parchment-100 hover:bg-forest-800">
              Meet Your Advisor
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
