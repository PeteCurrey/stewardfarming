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
        description: "Gestation tracking, expected birth dates, scanning result records, and dry-off date scheduling.",
        icon: Calendar,
      },
    ],
  },
  {
    id: "compliance-subsidies",
    name: "Subsidies & Compliance",
    shortDesc: "Defra SFI Scheme engine, Red Tractor audits, NVZ risk maps, and RPA parcel sync.",
    icon: Landmark,
    features: [
      {
        title: "SFI Multi-Action Stacking Engine",
        description: "Identifies compatible Sustainable Farming Incentive actions per parcel, avoiding double-funding penalties.",
        icon: Landmark,
      },
      {
        title: "Red Tractor Audit Preparation Pack",
        description: "One-click export of chemical store records, staff training certifications, vermin logs, and health plans.",
        icon: FileText,
      },
      {
        title: "Nitrate Vulnerable Zone (NVZ) Risk Engine",
        description: "Calculates N-max limits, slurry storage capacity, closed spreading dates, and field risk map generation.",
        icon: AlertCircle,
      },
      {
        title: "RPA Digital Land Parcel Data Sync",
        description: "Imports official SBI parcel boundaries, permanent grassland codes, and hedgerow lengths directly.",
        icon: Layers,
      },
      {
        title: "Grant Application Concierge",
        description: "Drafts tailored grant application narratives for FETF, slurry infrastructure, and capital items.",
        icon: Sparkles,
        isAddon: true,
      },
    ],
  },
  {
    id: "financials-markets",
    name: "Financials & Markets",
    shortDesc: "Cash flow forecasting, grain futures, live deadweight prices, and machinery tracking.",
    icon: TrendingUp,
    features: [
      {
        title: "Enterprise Gross Margin Accounting",
        description: "Track seed, spray, fertiliser, and veterinary costs per hectare or per livestock head against sale revenues.",
        icon: DollarSign,
      },
      {
        title: "LIFFE Feed Wheat & Oilseed Futures Tracker",
        description: "Daily UK combinable commodity pricing, forward contract tracking, and historical basis comparisons.",
        icon: TrendingUp,
      },
      {
        title: "AHDB Deadweight Beef & Sheep Pricing",
        description: "Weekly regional auction mart reports, deadweight abattoir prices, and carcase grading distribution metrics.",
        icon: Scale,
      },
      {
        title: "Machinery Fleet Telematics & MOT Logs",
        description: "Tracks engine hours, service intervals, LOLER testing, and fuel consumption across tractors and combines.",
        icon: Wrench,
        isAddon: true,
      },
      {
        title: "Invoice Photo Match & Bookkeeper Export",
        description: "Snap paper receipts in the farm office; Steward extracts vendor, date, net amount, and VAT breakdown.",
        icon: Camera,
      },
    ],
  },
  {
    id: "human-network",
    name: "Human Specialist Network",
    shortDesc: "Direct escalation to accredited British vets, agronomists, accountants, and brokers.",
    icon: Users,
    features: [
      {
        title: "RCVS Accredited Farm Veterinary Escalation",
        description: "Direct handoff with holding telemetry dossier for clinical diagnosis and statutory prescription support.",
        icon: Activity,
      },
      {
        title: "BASIS & FACTS Certified Field Agronomists",
        description: "In-field inspection booking, weed resistance testing, and independent recommendation reviews.",
        icon: Wheat,
      },
      {
        title: "Agricultural Tax & Succession Accounting",
        description: "Capital allowances on agricultural machinery, APR/BPR inheritance review, and partnership structures.",
        icon: FileText,
      },
      {
        title: "Farm Insurance Broker Policy Audits",
        description: "Harvest fire coverage, environmental liability limits, and livestock disease indemnity valuations.",
        icon: ShieldCheck,
      },
      {
        title: "RABI & FCN Rural Wellbeing Confidential Check-ins",
        description: "Integrated links to Farming Community Network and RABI support hotlines for high-stress harvest and lambing seasons.",
        icon: HeartHandshake,
      },
    ],
  },
];

export function FeaturesClient() {
  const [activeTab, setActiveTab] = useState<string>("compliance-subsidies");

  const currentCategory = CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];

  return (
    <div className="flex flex-col bg-obsidian-950 text-parchment-100">
      
      {/* HEADER */}
      <section className="pt-32 pb-16 bg-obsidian-950 bg-tactical-grid border-b border-white/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <Badge variant="volt" pulse>Platform Subsystems</Badge>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white leading-tight">
            High-Density Agronomic Matrix. Precision Engineered for the UK.
          </h1>
          <p className="text-base sm:text-lg text-parchment-300 leading-relaxed max-w-2xl mx-auto font-sans">
            From Met Office spray window forecasting to multi-year SFI subsidy stacking, explore the full architectural breadth of Steward.
          </p>
        </div>
      </section>

      {/* TABBED CATEGORY BROWSER */}
      <Section variant="grid" containerSize="lg">
        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-white/10 pb-4 font-mono">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2.5 rounded-panel text-xs uppercase tracking-wider transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-volt",
                  isActive
                    ? "bg-obsidian-900 text-white border border-volt shadow-hud font-bold"
                    : "bg-obsidian-950 text-parchment-300 border border-white/10 hover:bg-obsidian-900 hover:border-white/30"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-volt" : "text-parchment-400")} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {currentCategory.name}
          </h2>
          <p className="text-sm sm:text-base text-parchment-300 font-sans">
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
                variant={isHighlight ? "hud-gold" : "hud"}
                hoverEffect
                cornerTicks
                className="flex flex-col justify-between relative space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={cn(
                        "p-2.5 rounded-tech border",
                        isHighlight
                          ? "bg-obsidian-950 text-gold-coutts border-gold-coutts/40"
                          : "bg-obsidian-950 text-volt border-volt/40"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {feature.isAddon ? (
                      <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-gold-coutts bg-gold-coutts/10 border border-gold-coutts/30 px-2 py-0.5 rounded-tech">
                        Add-on
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-volt bg-volt/10 border border-volt/30 px-2 py-0.5 rounded-tech">
                        Core Plan
                      </span>
                    )}
                  </div>

                  <CardTitle className="text-base sm:text-lg font-serif">
                    {feature.title}
                  </CardTitle>

                  <CardDescription className="text-xs text-parchment-300 leading-relaxed font-sans">
                    {feature.description}
                  </CardDescription>
                </div>

                {isHighlight && (
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gold-coutts font-semibold">
                    <span>Defra SFI Scheme Verified</span>
                    <span className="text-volt">Auto-Drafting &rarr;</span>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Subscription vs Add-On Note */}
        <div className="mt-14 p-6 rounded-panel bg-obsidian-900 border border-white/10 max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-parchment-300">
          <div className="space-y-1">
            <p className="font-bold text-white text-sm uppercase tracking-wider">
              [MODULAR UK HOLDING ARCHITECTURE]
            </p>
            <p className="font-sans text-parchment-400">
              Core agronomy, Met Office radar sync, and Defra SFI tracking are included standard. Premium telemetry add-ons (Satellite, Fleet, Concierge) activate with 1 click.
            </p>
          </div>
          <Button href="/pricing" variant="secondary" size="sm" className="whitespace-nowrap">
            View Plans &rarr;
          </Button>
        </div>
      </Section>

      {/* CALLOUT BANNER */}
      <section className="py-20 bg-obsidian-900 text-parchment-100 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="volt" pulse>Operational Readiness</Badge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Experience These Subsystems on Your Own Holding.
          </h2>
          <p className="text-sm sm:text-base text-parchment-300 max-w-xl mx-auto font-sans">
            Initiate your 30-day free trial. Link your RPA parcels and experience proactive advice tailored to your acreage.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/signup" variant="volt" size="lg">
              Start 30-Day Free Trial
            </Button>
            <Button href="/advisors" variant="secondary" size="lg">
              Inspect Advisory Roster
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
