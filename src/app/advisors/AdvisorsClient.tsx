"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wheat,
  Footprints,
  Trees,
  Milk,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Info,
  Clock,
  Compass,
  FileCheck,
  Radio,
  Lock,
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
  code: string;
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
    badgeText: "Arable Specialist",
    code: "AG-01 // ARABLE",
    badgeVariant: "gold",
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
        text: "Good morning. Looking at the Met Office spot radar for North Field (Clay Loam, 28ha), wind is currently 11mph from the SW with gusts up to 18mph — too high for safe drift compliance.",
        time: "07:16",
        badge: "Drift Advisory",
      },
      {
        sender: "advisor",
        text: "However, barometric stability improves significantly this afternoon. Between 14:00 and 19:30, wind drops below 6mph and humidity rises to 68%. That is your optimal low-drift window today. I have drafted your chemical application log with the statutory product details.",
        time: "07:16",
        actionNote: "Green Task logged: T1 Application record drafted for your approval",
      },
    ],
    ctaText: "Start Arable Trial with Tom",
  },
  {
    id: "livestock",
    key: "livestock",
    name: "Fiona MacLeod",
    role: "Livestock & Herd Husbandry Specialist",
    badgeText: "Livestock Specialist",
    code: "LS-02 // LIVESTOCK",
    badgeVariant: "volt",
    farmTypeLabel: "Livestock",
    tagline: "Dedicated to herd health, grazing rotations, and statutory movement compliance.",
    about:
      "Fiona is built around the daily realities of UK sheep, beef, and hill livestock production. She understands grazing plate meter curves, sward height management, statutory meat and milk withdrawal periods, BCMS/ScotEID movement notifications, and livestock mart pricing.",
    specialisms: [
      "Pasture allocation, plate meter calculations & DM budgeting",
      "Statutory medicine book & meat withdrawal countdowns",
      "BCMS cattle passport & ScotEID movement compliance",
      "Seasonal tupping, lambing, and calving calendar planning",
      "Forage D-value analysis and winter ration balancing",
      "AHDB regional deadweight beef and lamb auction pricing",
    ],
    monitoringItems: [
      {
        title: "Medicine Withdrawal Dates",
        detail: "Calculates statutory meat withholding periods for every treated group and flags clearance dates.",
      },
      {
        title: "Grazing Paddock Rotation",
        detail: "Estimates dry matter intake against sward heights to recommend ideal rest periods between moves.",
      },
      {
        title: "Movement Deadlines",
        detail: "Alerts you within 24 hours of stock movements to ensure BCMS/ScotEID reporting rules are satisfied.",
      },
      {
        title: "Flock Welfare Milestones",
        detail: "Tracks flystrike risk indices based on local humidity and temperature profiles.",
      },
    ],
    chatPreview: [
      {
        sender: "farmer",
        text: "Drenched the replacement ewe lambs with flukicide yesterday. When are they clear for the butcher if we decide to cull any?",
        time: "08:20",
      },
      {
        sender: "advisor",
        text: "Good morning. I've pulled up your treatment record: Group '2024 Ewe Lambs' (42 head) drenched with Fasinex 240 (Triclabendazole) on 12 August at 16:30.",
        time: "08:21",
        badge: "Statutory Withdrawal",
      },
      {
        sender: "advisor",
        text: "Statutory meat withdrawal for Fasinex 240 is 56 days. The clear-to-slaughter date is 7 October at 23:59. I have updated your permanent farm medicine book and set a reminder alert 3 days prior.",
        time: "08:21",
        actionNote: "Statutory medicine log recorded. Calendar countdown active.",
      },
    ],
    ctaText: "Start Livestock Trial with Fiona",
  },
  {
    id: "mixed",
    key: "mixed",
    name: "Alistair Reid",
    role: "Mixed Farm Systems Specialist",
    badgeText: "Mixed Farm Specialist",
    code: "MX-03 // MIXED",
    badgeVariant: "terracotta",
    farmTypeLabel: "Mixed",
    tagline: "Balancing whole-farm nutrient cycles, break crops, and multi-tier subsidies.",
    about:
      "Alistair represents the interconnected thinking required on mixed holdings. He looks at the entire farm ecosystem: how sheep grazing on herbal leys improves the following wheat crop's nitrogen index, how FYM from winter cattle housing reduces the synthetic P&K fertilizer bill, and how whole-farm SFI options stack seamlessly.",
    specialisms: [
      "Integrated crop-livestock rotation & fertility building",
      "Farmyard manure (FYM) & slurry nutrient budgeting",
      "Herbal ley establishment (SFI SAM3) with rotational grazing",
      "Cross-enterprise cash flow and working capital forecasting",
      "Whole-farm Defra Countryside Stewardship & SFI bundling",
      "Red Tractor multi-enterprise combined inspection audit packs",
    ],
    monitoringItems: [
      {
        title: "Manure Nutrient Value",
        detail: "Calculates available N, P, and K in your livestock dung heaps to offset synthetic fertilizer bills.",
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
    badgeText: "Dairy Specialist",
    code: "DY-04 // DAIRY",
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
        text: "Good afternoon. Your Arla contract penalty threshold sits at 200k, so you remain in bonus territory, but that 55k rise in 7 days warrants immediate targeted screening.",
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
    <div className="flex flex-col bg-obsidian-950 text-parchment-100">
      
      {/* HERO / INTRODUCTION HEADER */}
      <section className="pt-32 pb-16 bg-obsidian-950 bg-tactical-grid border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          
          <Badge variant="gold" pulse>
            The Steward Advisory Roster
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight max-w-4xl mx-auto tracking-tight">
            Specialised Agricultural Intelligence.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-coutts via-gold-300 to-gold-brass">
              Calibrated to Your Exact Holding.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-parchment-300 max-w-3xl mx-auto leading-relaxed font-sans">
            British farming is never one-size-fits-all. Steward configures a dedicated specialist advisor around the specific seasonal rhythms, soils, crops, animals, and statutory schemes of your enterprise.
          </p>

          {/* Interactive Farm Type Selector */}
          <div className="pt-8 max-w-3xl mx-auto">
            <p className="text-xs uppercase font-mono tracking-widest text-parchment-400 mb-3">
              [SELECT ENTERPRISE DOSSIER TO INSPECT]:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ADVISORS.map((advisor) => {
                const isActive = activeTab === advisor.id;
                return (
                  <button
                    key={advisor.id}
                    onClick={() => scrollToAdvisor(advisor.id)}
                    className={cn(
                      "p-3.5 rounded-panel border text-sm font-mono transition-all duration-150 flex flex-col items-center justify-center space-y-1 focus:outline-none focus:ring-2 focus:ring-volt",
                      isActive
                        ? "bg-obsidian-900 text-white border-volt shadow-hud scale-[1.02]"
                        : "bg-obsidian-950 text-parchment-300 border-white/10 hover:bg-obsidian-900 hover:border-white/30"
                    )}
                  >
                    <span className="font-bold text-sm uppercase tracking-wider">{advisor.farmTypeLabel}</span>
                    <span
                      className={cn(
                        "text-[11px]",
                        isActive ? "text-volt font-bold" : "text-parchment-400"
                      )}
                    >
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
      <div className="divide-y divide-white/10">
        {ADVISORS.map((advisor) => (
          <section
            key={advisor.id}
            id={advisor.id}
            className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-obsidian-950 relative"
          >
            <div className="max-w-7xl mx-auto space-y-16">
              
              {/* Top Profile Header Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left Column: Portrait & Credentials */}
                <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-6">
                  <div className="relative">
                    <AdvisorPortrait
                      type={advisor.key}
                      name={advisor.name}
                      size="lg"
                      className="shadow-2xl"
                    />
                    <div className="absolute -bottom-3 -right-3 bg-obsidian-950 text-gold-coutts px-3 py-1 rounded-tech text-[10px] uppercase font-mono font-bold tracking-wider border border-gold-coutts/40 shadow-sm">
                      VERIFIED ADVISOR
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2 justify-center sm:justify-start font-mono">
                      <Badge variant={advisor.badgeVariant} size="sm">
                        {advisor.code}
                      </Badge>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white pt-1">
                      {advisor.name}
                    </h2>
                    <p className="text-xs font-mono uppercase tracking-wider text-gold-coutts">
                      {advisor.role}
                    </p>
                  </div>

                  <p className="text-xs text-parchment-300 italic border-l-2 border-gold-coutts pl-3 leading-relaxed font-sans">
                    &quot;{advisor.tagline}&quot;
                  </p>

                  <Button href="/signup" variant="volt" size="lg" className="w-full sm:w-auto">
                    {advisor.ctaText} &rarr;
                  </Button>
                </div>

                {/* Right Column: Deep Profile & Core Specialisms */}
                <div className="lg:col-span-8 space-y-8">
                  <div className="space-y-4">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center">
                      <Compass className="w-5 h-5 mr-2 text-gold-coutts" />
                      Specialist Dossier
                    </h3>
                    <p className="text-base text-parchment-200 leading-relaxed font-sans">
                      {advisor.about}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                      CORE ADVISORY SPECIALISMS:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-parchment-200 font-sans">
                      {advisor.specialisms.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-start space-x-2.5 bg-obsidian-900 p-3 rounded-panel border border-white/10">
                          <CheckCircle2 className="w-4 h-4 text-volt mt-0.5 flex-shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Row: Proactive Monitoring List & Sample Chat Mockup */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-8 border-t border-white/10">
                
                {/* Proactive Monitoring Subsystems */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <div className="inline-flex items-center space-x-2 mb-2 font-mono">
                      <Radio className="w-4 h-4 text-volt" />
                      <span className="text-xs uppercase tracking-wider font-bold text-volt">
                        AUTONOMOUS MONITORING SUBSYSTEMS
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                      What {advisor.name.split(" ")[0]} monitors for your holding:
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {advisor.monitoringItems.map((item, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-4 rounded-panel bg-obsidian-900 border border-white/10 hover:border-volt/40 transition-colors"
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="w-2 h-2 rounded-full bg-volt" />
                          <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-white">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-xs text-parchment-300 leading-relaxed pl-4 font-sans">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Mobile Interaction Preview */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <div className="inline-flex items-center space-x-2 mb-2 font-mono">
                      <Clock className="w-4 h-4 text-gold-coutts" />
                      <span className="text-xs uppercase tracking-wider font-bold text-gold-coutts">
                        TELEMETRY EXCHANGE SAMPLE
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                      Real-time advice on your mobile or cab screen:
                    </h3>
                  </div>

                  <div className="rounded-panel bg-obsidian-900 border border-white/10 p-5 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono">
                      <div className="flex items-center space-x-2.5">
                        <AdvisorPortrait type={advisor.key} name={advisor.name} size="sm" />
                        <div>
                          <p className="text-xs font-serif font-bold text-white leading-none">
                            {advisor.name}
                          </p>
                          <p className="text-[10px] text-volt font-medium">
                            {advisor.code} &bull; ONLINE
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-obsidian-950 px-2 py-0.5 rounded-tech border border-white/10 text-parchment-400">
                        STEWARD TELEMETRY
                      </span>
                    </div>

                    <div className="space-y-3.5 pt-1">
                      {advisor.chatPreview.map((msg, cIdx) => {
                        const isAdvisor = msg.sender === "advisor";

                        return (
                          <div
                            key={cIdx}
                            className={cn(
                              "flex flex-col",
                              isAdvisor ? "items-start" : "items-end"
                            )}
                          >
                            <div
                              className={cn(
                                "max-w-[88%] p-3.5 rounded-panel text-xs leading-relaxed shadow-sm space-y-1.5",
                                isAdvisor
                                  ? "bg-obsidian-950 text-parchment-200 border border-white/10 rounded-tl-none"
                                  : "bg-forest-900 text-white border border-forest-700 rounded-tr-none"
                              )}
                            >
                              {msg.badge && (
                                <div className="inline-block text-[9px] uppercase font-mono font-bold tracking-wider text-gold-coutts bg-gold-coutts/10 px-2 py-0.5 rounded-tech border border-gold-coutts/30">
                                  {msg.badge}
                                </div>
                              )}
                              <p className="font-sans">{msg.text}</p>
                              {msg.actionNote && (
                                <div className="pt-1.5 border-t border-white/10 flex items-center text-[11px] font-mono text-volt">
                                  <FileCheck className="w-3.5 h-3.5 mr-1 text-volt flex-shrink-0" />
                                  <span>{msg.actionNote}</span>
                                </div>
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-parchment-400 mt-1 px-1">
                              {msg.time}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-parchment-400 font-mono">
                      <span className="italic">Type advisory query or initiate voice brief...</span>
                      <div className="w-7 h-7 rounded-tech bg-volt text-obsidian-950 flex items-center justify-center font-bold">
                        &uarr;
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-xs font-mono text-parchment-400">
                    <span className="flex items-center">
                      <ShieldCheck className="w-4 h-4 text-volt mr-1" />
                      RCVS &bull; BASIS Human Escalation 1-Tap
                    </span>
                    <Button href="/signup" variant="gold" size="sm">
                      {advisor.ctaText}
                    </Button>
                  </div>
                </div>

              </div>

            </div>
          </section>
        ))}
      </div>

      {/* HUMAN EXPERT ESCALATION CALLOUT */}
      <section className="py-20 bg-obsidian-900 text-parchment-100 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="gold" pulse>Accredited Specialist Protocol</Badge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Backed by Accredited British Agricultural Professionals.
          </h2>
          <p className="text-base sm:text-lg text-parchment-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Your Steward advisor knows its boundaries. Whenever an unusual clinical presentation,
            contested tenancy dispute, or complex drainage claim occurs, you are immediately routed
            to verified RCVS vets and BASIS agronomists.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/signup" variant="volt" size="lg">
              Start Free 30-Day Trial
            </Button>
            <Button href="/about#network" variant="secondary" size="lg">
              Examine Human Specialist Network
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
