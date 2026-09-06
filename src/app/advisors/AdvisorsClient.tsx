"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wheat,
  Footprints,
  Trees,
  Milk,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Clock,
  Compass,
  Radio,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { AdvisorPortrait } from "@/components/ui/AdvisorPortrait";
import { cn } from "@/lib/utils";

interface ChatMessage {
  sender: "farmer" | "advisor";
  text: string;
  time: string;
  badge?: string;
  actionNote?: string;
}

interface AdvisorData {
  id: string;
  key: "arable" | "livestock" | "mixed" | "dairy";
  name: string;
  role: string;
  badgeText: string;
  badgeVariant: "gold" | "forest" | "terracotta" | "volt";
  farmTypeLabel: string;
  tagline: string;
  about: string;
  specialisms: string[];
  monitoringItems: { title: string; detail: string }[];
  chatPreview: ChatMessage[];
  ctaText: string;
}

const ADVISORS: AdvisorData[] = [
  {
    id: "arable",
    key: "arable",
    name: "Tom Campbell",
    role: "Arable & Combinable Crops Specialist",
    badgeText: "BASIS & FACTS Certified",
    badgeVariant: "forest",
    farmTypeLabel: "Arable",
    tagline: "Focused on clean rotations, spray timing, and SFI margins per hectare.",
    about:
      "Tom is calibrated specifically for UK arable enterprises. From combinable cereals (winter wheat, spring barley) to oilseeds, pulses, and cover crops, Tom evaluates daily Met Office spray windows, disease thresholds (Septoria, rusts), soil moisture deficits, and SFI stackability.",
    specialisms: [
      "Combinable crop rotations & gross margin optimization",
      "Met Office 1.1km spray drift micro-window forecasting",
      "Defra SFI IPM1, NUM1, and SAM3 herbal ley stackability",
      "RB209 nutrient management & variable-rate spreading",
      "Red Tractor combinable crops audit record compilation",
      "Grain storage moisture telemetry and LIFFE futures hedges",
    ],
    monitoringItems: [
      {
        title: "Spray Window Opportunities",
        detail: "Ingests Met Office hourly spot forecasts to identify sub-7mph wind windows with humidity above 60%.",
      },
      {
        title: "SFI Parcel Allocation",
        detail: "Tracks land parcel rules, rotation history, and soil type to suggest maximum stackable payments.",
      },
      {
        title: "Crop Growth Stages (Zadoks)",
        detail: "Tracks T0 through T3 fungicide timing against local degree-day models and weather forecasts.",
      },
      {
        title: "NVZ Closed Periods",
        detail: "Alerts on statutory chemical and organic nitrogen application limits for your specific soil type.",
      },
    ],
    chatPreview: [
      {
        sender: "farmer",
        text: "Thinking about spraying the winter wheat in North Field with the T1 fungicide. What's the window looking like today?",
        time: "07:15",
      },
      {
        sender: "advisor",
        text: "Good morning. Met Office radar shows current wind at 13mph with gusts to 19mph in your parish — too high for standard drift limits.",
        time: "07:16",
        badge: "Spray Window Alert",
      },
      {
        sender: "advisor",
        text: "However, a clean 4-hour window opens from 14:00 to 18:00 today when wind drops to 5-6mph and relative humidity settles at 65%. Ground temp is 9.8°C. I've prepared your draft spray log with your last batch of prothioconazole ready for your 1-tap sign-off.",
        time: "07:17",
        actionNote: "Draft spray record prepared: North Field (14.2ha) — pending approval.",
      },
    ],
    ctaText: "Start Arable Trial with Tom",
  },
  {
    id: "livestock",
    key: "livestock",
    name: "Fiona MacLeod",
    role: "Livestock & Upland Systems Specialist",
    badgeText: "RCVS Partner",
    badgeVariant: "forest",
    farmTypeLabel: "Livestock",
    tagline: "Prioritising herd health records, grazing efficiency, and market timing.",
    about:
      "Fiona is calibrated for UK beef suckler, finishing, and commercial sheep enterprises across both lowland and upland systems. She focuses on grazing budgets, liveweight gain trajectories, statutory movement reporting, veterinary medicine compliance, and deadweight market averages.",
    specialisms: [
      "BCMS cattle movement & ScotEID statutory reporting compliance",
      "Veterinary medicine book recording & withdrawal period clocks",
      "Rotational grazing sward budgets (plate meter dry matter targets)",
      "UK deadweight beef and lamb auction mart price benchmarking",
      "Red Tractor livestock audit compliance & casualty log management",
      "SFI livestock actions: herbal leys, rough grazing, and low inputs",
    ],
    monitoringItems: [
      {
        title: "Medicine Withdrawal Clocks",
        detail: "Tracks active meat and milk withdrawal countdowns per individual ear-tag or management group.",
      },
      {
        title: "Statutory Reporting Windows",
        detail: "Notifies before the statutory 3-day (birth) or 7-day (movement) BCMS registration deadlines expire.",
      },
      {
        title: "Grassland Growth Curves",
        detail: "Models daily grass growth (kg DM/ha/day) against herd stocking rates to plan paddock moves.",
      },
      {
        title: "Auction Mart Deadweight Benchmarks",
        detail: "Compares local mart quotes against regional averages to identify optimal sale windows.",
      },
    ],
    chatPreview: [
      {
        sender: "farmer",
        text: "We treated two steers in Pen 3 with Micotil on Tuesday. When can they safely go to the abattoir?",
        time: "08:42",
      },
      {
        sender: "advisor",
        text: "Micotil 300 (tilmicosin) has a strict statutory 60-day meat withdrawal period under UK veterinary regulations.",
        time: "08:43",
        badge: "Statutory Medicine Rule",
      },
      {
        sender: "advisor",
        text: "Treated Tuesday 25th August means their withdrawal ends at 23:59 on Saturday 24th October. Ear tags UK 124892 400192 and 400193 are locked in your herd register and cannot be drafted into a slaughter consignment before Sunday 25th October.",
        time: "08:44",
        actionNote: "Herd Register Updated: Withdrawal countdown active (60 days remaining).",
      },
    ],
    ctaText: "Start Livestock Trial with Fiona",
  },
  {
    id: "mixed",
    key: "mixed",
    name: "Alistair Reid",
    role: "Mixed Farming & Whole-Farm Systems Specialist",
    badgeText: "Whole-Farm SFI",
    badgeVariant: "gold",
    farmTypeLabel: "Mixed",
    tagline: "Unifying combinable cropping with livestock foraging and soil biology.",
    about:
      "Alistair is calibrated for diversified UK holdings balancing combinable cereals with beef or sheep enterprises. He specializes in whole-farm nutrient recycling (FYM/slurry into arable soils), dual-purpose cover crops, Countryside Stewardship and SFI scheme stacking, and gross margin balance across arable and stock.",
    specialisms: [
      "Whole-holding SFI stacking & Countryside Stewardship coordination",
      "Livestock manure nutrient budgeting (RB209 phosphate & potash credits)",
      "Forage break crops: stubble turnips, forage rape, and winter grazing",
      "Cross-enterprise labour planning during harvest and lambing/calving",
      "Soil organic matter (SOM) tracking and cover crop biomass modeling",
      "Farm business resilience & CAP-to-ELMs transition modelling",
    ],
    monitoringItems: [
      {
        title: "Nutrient Recycling Credits",
        detail: "Calculates replacement fertilizer value of applied FYM and slurry to reduce chemical NPK bills.",
      },
      {
        title: "Break-Crop Grazing Windows",
        detail: "Flags when cover crops or stubble turnips have sufficient biomass for overwintering hoggs.",
      },
      {
        title: "Enterprise Margin Allocation",
        detail: "Compares gross margin per hectare between arable cash crops and forage livestock enterprises.",
      },
      {
        title: "Audit Trail Harmonisation",
        detail: "Maintains unified field logs so arable and livestock evidence never conflicts during inspections.",
      },
    ],
    chatPreview: [
      {
        sender: "farmer",
        text: "Planning our spring break crop on Long Meadow. Should we put in spring beans or establish a 3-year SFI herbal ley and graze the hoggs?",
        time: "11:05",
      },
      {
        sender: "advisor",
        text: "Let's run the gross margin comparison for Long Meadow (18.4ha, Sandy Silt Loam). Spring beans currently budget at roughly £480/ha gross margin with market volatility on pulse contracts.",
        time: "11:07",
        badge: "Margin Analysis",
      },
      {
        sender: "advisor",
        text: "SFI SAM3 (Herbal Ley) pays £382/ha guaranteed annual subsidy. Combined with 45 days of spring hogg grazing, you save approximately £1,200 in concentrate feed while fixing an estimated 85kg N/ha for the 2027 winter wheat crop. The 3-year herbal ley delivers higher net margin and superior soil resilience.",
        time: "11:07",
        actionNote: "Comparison report generated. SFI parcel allocation drafted.",
      },
    ],
    ctaText: "Start Mixed Farm Trial with Alistair",
  },
  {
    id: "dairy",
    key: "dairy",
    name: "Eleanor Wright",
    role: "Dairy Systems & Nutrition Specialist",
    badgeText: "Bovine Nutrition",
    badgeVariant: "gold",
    farmTypeLabel: "Dairy",
    tagline: "Maximising milk contract bonuses, herd longevity, and grassland forage quality.",
    about:
      "Eleanor is calibrated for modern UK dairy herds, whether high-input housed TMR systems or block-calving rotational grazing setups. She focuses on the metrics that drive the milk cheque: somatic cell count trends, butterfat and protein bonuses, silage dry matter intakes, and statutory slurry storage regulations.",
    specialisms: [
      "Milk contract bonus optimization (butterfat & protein %)",
      "Somatic cell count (SCC) & mastitis early warning trends",
      "First/second cut silage timing based on D-value modeling",
      "NVZ slurry storage capacity & statutory spreading limits",
      "Selective dry cow therapy (SDCT) protocol record keeping",
      "Carbon footprint per litre of milk (FPCM) benchmark tracking",
    ],
    monitoringItems: [
      {
        title: "Milk Quality Bonuses",
        detail: "Tracks bulk tank solids tests against your milk buyer's contract pricing schedule.",
      },
      {
        title: "Silage Cutting Windows",
        detail: "Correlates heat unit accumulation with forecast weather to target optimum 68+ D-value cuts.",
      },
      {
        title: "Slurry Lagoon Capacity",
        detail: "Monitors rainfall accumulation against storage volume to warn well ahead of winter closed periods.",
      },
      {
        title: "Somatic Cell Alerts",
        detail: "Flags upward SCC trends before clinical mastitis or milk contract penalties occur.",
      },
    ],
    chatPreview: [
      {
        sender: "farmer",
        text: "Bulk tank reading came in today: SCC bumped up to 195k from 140k last week. Butterfat is at 4.22%. Anything to adjust?",
        time: "14:15",
      },
      {
        sender: "advisor",
        text: "Good afternoon. Your contract penalty threshold sits at 200k, so you remain in bonus territory, but that 55k rise in 7 days warrants immediate targeted screening.",
        time: "14:16",
        badge: "Cell Count Advisory",
      },
      {
        sender: "advisor",
        text: "Given the recent humid spell, I recommend California Mastitis Testing (CMT) the fresh-calved heifers in Pen 2 today. I've reviewed your parlour wash records and plant sanitation looks normal. I have created an advisory task and flagged this for your vet if counts don't normalize within 48 hours.",
        time: "14:17",
        actionNote: "Amber Task: CMT screening protocol logged. Vet alert on standby.",
      },
    ],
    ctaText: "Start Dairy Trial with Eleanor",
  },
];

export function AdvisorsClient() {
  const [activeTab, setActiveTab] = useState<string>("arable");

  const scrollToAdvisor = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col bg-white text-slate-900">
      
      {/* HERO / INTRODUCTION HEADER — Full screen with British Agronomy background */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-900">
        {/* Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2560&q=85"
          alt="Golden British wheat fields at dawn representing agricultural advisory"
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
              <span>The Steward Advisory Team &bull; 4 Calibrated Disciplines</span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extralight text-white leading-[1.08] tracking-tight max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Specialist Farm Advisors. Calibrated to Your Exact Holding.
          </h1>

          <p className="text-base sm:text-xl font-sans font-light text-slate-100 max-w-2xl leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            British farming is never one-size-fits-all. Steward configures a dedicated specialist advisor around the specific seasonal rhythms, soils, crops, animals, and statutory schemes of your enterprise.
          </p>

          {/* Interactive Farm Type Selector */}
          <div className="pt-4 max-w-3xl">
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-300 mb-3">
              Select an advisor discipline to inspect credentials:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ADVISORS.map((advisor) => {
                const isActive = activeTab === advisor.id;
                return (
                  <button
                    key={advisor.id}
                    onClick={() => scrollToAdvisor(advisor.id)}
                    className={cn(
                      "p-3.5 rounded-xl border text-sm transition-all duration-150 flex flex-col items-start justify-center space-y-1 text-left backdrop-blur-md",
                      isActive
                        ? "bg-white text-slate-900 border-white shadow-lg font-semibold ring-2 ring-white/50"
                        : "bg-slate-900/70 text-white border-white/20 hover:bg-slate-900/90 hover:border-white/40"
                    )}
                  >
                    <span className="text-sm font-semibold">{advisor.farmTypeLabel}</span>
                    <span className={cn("text-xs", isActive ? "text-slate-600" : "text-slate-300")}>
                      {advisor.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ADVISOR PROFILES (4 FULL SECTIONS) */}
      <div className="divide-y divide-slate-200">
        {ADVISORS.map((advisor) => (
          <section
            key={advisor.id}
            id={advisor.id}
            className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white"
          >
            <div className="max-w-6xl mx-auto space-y-12">
              
              {/* Top Profile Header Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Portrait & Credentials */}
                <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
                  <AdvisorPortrait
                    type={advisor.key}
                    name={advisor.name}
                    size="lg"
                    className="shadow-sm"
                  />

                  <div className="space-y-1">
                    <Badge variant={advisor.badgeVariant} size="sm">
                      {advisor.badgeText}
                    </Badge>
                    <h2 className="text-2xl font-serif font-medium text-slate-900 pt-1">
                      {advisor.name}
                    </h2>
                    <p className="text-xs font-semibold uppercase tracking-wider text-forest-700">
                      {advisor.role}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 italic border-l-2 border-slate-300 pl-3 leading-relaxed">
                    &quot;{advisor.tagline}&quot;
                  </p>

                  <Button href="/signup" variant="primary" size="md" className="w-full sm:w-auto">
                    {advisor.ctaText} &rarr;
                  </Button>
                </div>

                {/* Right Column: Deep Profile & Core Specialisms */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-medium text-slate-900 flex items-center">
                      <Compass className="w-5 h-5 mr-2 text-forest-800" />
                      Specialist Profile
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {advisor.about}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-800">
                      Core Advisory Specialisms:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                      {advisor.specialisms.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-start space-x-2.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Row: Proactive Monitoring List & Sample Chat Mockup */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-t border-slate-200">
                
                {/* Proactive Monitoring Subsystems */}
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-serif font-medium text-slate-900">
                      What {advisor.name.split(" ")[0]} monitors on your holding:
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {advisor.monitoringItems.map((item, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-600" />
                          <h4 className="font-semibold text-xs text-slate-900">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed pl-4">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Mobile Interaction Preview */}
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-serif font-medium text-slate-900">
                      In-app advice &amp; approval sample:
                    </h3>
                  </div>

                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 shadow-sm space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs">
                      <div className="flex items-center space-x-2">
                        <AdvisorPortrait type={advisor.key} name={advisor.name} size="sm" />
                        <div>
                          <span className="font-semibold text-slate-900 block">{advisor.name}</span>
                          <span className="text-[11px] text-slate-500">{advisor.role}</span>
                        </div>
                      </div>
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-200">
                        Online
                      </span>
                    </div>

                    <div className="space-y-3 text-xs">
                      {advisor.chatPreview.map((msg, cIdx) => (
                        <div
                          key={cIdx}
                          className={cn(
                            "p-3 rounded-lg max-w-[90%]",
                            msg.sender === "farmer"
                              ? "ml-auto bg-slate-200 text-slate-900"
                              : "mr-auto bg-white border border-slate-200 text-slate-800 shadow-sm"
                          )}
                        >
                          {msg.badge && (
                            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200 mb-1">
                              {msg.badge}
                            </span>
                          )}
                          <p className="leading-relaxed">{msg.text}</p>
                          {msg.actionNote && (
                            <p className="mt-2 pt-2 border-t border-slate-100 text-[11px] font-medium text-emerald-800">
                              ✓ {msg.actionNote}
                            </p>
                          )}
                          <span className="text-[10px] text-slate-400 block text-right mt-1">
                            {msg.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
