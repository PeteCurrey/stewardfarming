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
  Sparkles,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Info,
  Clock,
  Compass,
  FileCheck,
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
  badgeVariant: "gold" | "forest" | "terracotta";
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
    badgeVariant: "gold",
    farmTypeLabel: "Arable",
    tagline: "Focused on margins per hectare, soil structure, and chemical timing.",
    about:
      "Tom looks at your farm through the combined lens of a BASIS-qualified agronomist and a seasoned grain trader. He understands that a 4-day delay in spraying T1 fungicide or missing the optimal nitrogen application window costs real yield. Rather than giving textbook agronomy advice, Tom synthesises local radar weather, soil moisture models, and Defra SFI herbal ley rules to protect your soil health and your bottom line.",
    specialisms: [
      "5-year combinable crop rotation planning & break crops",
      "SFI IPM1 (Integrated Pest Management) and SAM3 Herbal Leys",
      "Local spray window micro-forecasting (wind, temp, humidity)",
      "Variable-rate fertiliser budgeting and NVZ N-max records",
      "UK grain futures (LIFFE feed wheat) hedging triggers",
    ],
    monitoringItems: [
      {
        title: "Micro-Climate Spray Opportunities",
        detail: "Tracks hourly wind gusts, dew point, and inversion layers across your parcel boundaries so you never waste chemical.",
      },
      {
        title: "SFI Arable Actions & Non-Overlap Rules",
        detail: "Continuously checks payment stacking across SAM1, NUM1, AHL2, and IPM1 to ensure full Defra compliance without clawback risk.",
      },
      {
        title: "Soil Moisture & Nitrogen Timing",
        detail: "Models soil temperature thresholds and rainfall wash-through risk before you send the spreader out.",
      },
      {
        title: "Grain Market Price Thresholds",
        detail: "Watches ex-farm and futures pricing benchmarks to alert you when your target contract margins are hit.",
      },
      {
        title: "Statutory NVZ Field Limit Books",
        detail: "Pre-populates your annual N-Max and organic manure records ready for RPA / Environment Agency inspection.",
      },
      {
        title: "Break-Crop & Cover Crop Sowing Windows",
        detail: "Monitors declining soil temperatures in autumn to ensure seed germination before soil consolidation.",
      },
    ],
    chatPreview: [
      {
        sender: "advisor",
        time: "06:45",
        text: "Morning, John. Wind in the Valley field will drop below 6mph between 13:30 and 18:00 today before rain arrives on Thursday. Ideal window for your Winter Wheat T1 spray. I've cross-referenced with your remaining Revystar inventory.",
        badge: "Proactive Field Alert",
      },
      {
        sender: "farmer",
        time: "07:10",
        text: "Thanks Tom. What about the 12 ha buffer strip along the brook under the SFI agreement?",
      },
      {
        sender: "advisor",
        time: "07:11",
        text: "Good catch. That parcel is registered under SFI IPM2 (Flower-rich grass margin). Keep a minimum 6m spray drift buffer. I've updated your spray log sheet with the geotagged exclusion zone ready for audit.",
        actionNote: "Field log #402 drafted for your approval",
      },
    ],
    ctaText: "Set Up Your Arable Farm",
  },
  {
    id: "livestock",
    key: "livestock",
    name: "Fiona MacLeod",
    role: "Beef, Sheep & Upland Husbandry Advisor",
    badgeText: "Livestock Specialist",
    badgeVariant: "forest",
    farmTypeLabel: "Livestock",
    tagline: "Deep knowledge of herd health, grazing budgeting, and welfare compliance.",
    about:
      "Fiona brings the steady, watchful eye of a hill farmer with decades of livestock experience. She knows that keeping sheep and cattle profitable in the UK means balancing liveweight gains, forage dry matter, and stringent veterinary medicine logs without drowning in red tape. Fiona keeps your movement records pristine, alerts you to withdrawal dates before sale days, and helps you capture every upland stewardship grant available.",
    specialisms: [
      "Grazing plate meters & rotational paddock budgeting",
      "Veterinary medicine books & statutory withdrawal countdowns",
      "Breeding cycle tracking, tupping schedules & scanning rates",
      "Livestock mart price trends (deadweight beef & store lambs)",
      "Red Tractor livestock standards & annual vet review prep",
    ],
    monitoringItems: [
      {
        title: "Statutory Medicine Withdrawal Deadlines",
        detail: "Tracks exact withdrawal windows for antibiotics, flukicides, and wormers so stock are never moved to mart prematurely.",
      },
      {
        title: "Pasture Growth & Grazing Budgets",
        detail: "Estimates pasture dry matter growth curves (kg DM/ha) and recommends rotation moves before swards are overgrazed.",
      },
      {
        title: "Livestock Mart & Deadweight Price Benchmarks",
        detail: "Monitors weekly AHDB deadweight lamb and R4L steer prices across northern and Welsh auction marts.",
      },
      {
        title: "Lambing & Calving Welfare Prep",
        detail: "Schedules colostrum supply checks, iodine supplies, and synchronisation protocols ahead of seasonal peaks.",
      },
      {
        title: "Defra Animal Health & Welfare Pathway Grants",
        detail: "Alerts you to funded annual vet reviews and biosecurity equipment grant application windows.",
      },
      {
        title: "Red Tractor & APHA Movement Registries",
        detail: "Maintains ear tag replacement logs, casualty records, and automated holding movement books.",
      },
    ],
    chatPreview: [
      {
        sender: "farmer",
        time: "14:20",
        text: "Fiona, planning to send 40 store bullocks to mart on Tuesday. Can you confirm medicine clearance?",
      },
      {
        sender: "advisor",
        time: "14:22",
        text: "Looking at your holding log: 38 head are completely clear. However, tag UK120984-600214 received Ivomec Super on the 4th; withdrawal period ends this Thursday at midnight. Leave that single beast in pen 3 until next week's sale.",
        badge: "Welfare & Compliance Check",
        actionNote: "APHA movement manifest drafted for 38 beasts",
      },
      {
        sender: "farmer",
        time: "14:35",
        text: "Spot on. Almost missed that one. Update the movement document for 38.",
      },
    ],
    ctaText: "Set Up Your Livestock Farm",
  },
  {
    id: "mixed",
    key: "mixed",
    name: "Alistair Reid",
    role: "Mixed Enterprise & Whole-Farm Systems Advisor",
    badgeText: "Mixed Farm Specialist",
    badgeVariant: "terracotta",
    farmTypeLabel: "Mixed Farm",
    tagline: "Connecting arable rotations, livestock fertility, and multi-tier stewardship.",
    about:
      "Alistair specialises in the complex interplay of mixed UK holdings where arable crops feed livestock and livestock return fertility to the soil. He understands the juggling act of managing combining alongside silage cuts, calculating FYM nutrient values for NVZ plans, and maximising both arable and grassland SFI payment tiers without creating administrative chaos.",
    specialisms: [
      "Integrated enterprise gross margin balancing",
      "Farmyard manure (FYM) & slurry nutrient budgeting",
      "Multi-tier SFI & Countryside Stewardship cross-matching",
      "Forage cover crop grazing strategies after cereals",
      "Labour and machinery sharing between arable & stock tasks",
    ],
    monitoringItems: [
      {
        title: "Whole-Farm Nutrient Recycling (RB209)",
        detail: "Credits the nitrogen, phosphate, and potash in your livestock manure directly against your fertiliser orders.",
      },
      {
        title: "Harvest vs. Silage Scheduling Conflicts",
        detail: "Balances contractor availability, machinery hours, and crop moisture windows across both sides of the business.",
      },
      {
        title: "Catch Crop & Winter Grazing Planning",
        detail: "Identifies fields suitable for stubble turnips or diverse brassicas following winter barley harvest.",
      },
      {
        title: "Combined SFI Arable & Grassland Stack",
        detail: "Tracks both SAM3 herbal leys and IPM1 arable actions under a single unified Defra agreement.",
      },
      {
        title: "Storage & Slurry Capacity Regulations",
        detail: "Monitors winter slurry storage capacity against rainfall to ensure compliance with 5-month NVZ closed periods.",
      },
      {
        title: "Enterprise Profitability Analysis",
        detail: "Compares the return on capital between your livestock enterprise and combinable crop acreage.",
      },
    ],
    chatPreview: [
      {
        sender: "advisor",
        time: "08:15",
        text: "Alistair here. Following your winter barley combining on the Home 40 ha parcel, we have a prime 70-day window to drill a rapid brassica mix before October sheep turn-in. This also qualifies for SFI SAM2 (Winter cover crop @ £129/ha).",
        badge: "Enterprise Synergy",
      },
      {
        sender: "farmer",
        time: "09:02",
        text: "Will that interfere with our Spring Wheat plan next February?",
      },
      {
        sender: "advisor",
        time: "09:04",
        text: "Not if we graze it off by January 15th. The sheep will recycle approximately 45kg N/ha into the soil, reducing your artificial spring fertiliser requirement by £38/ha while earning £5,160 in SFI cover crop payments.",
        actionNote: "Seed mix spec and SFI parcel log ready for review",
      },
    ],
    ctaText: "Set Up Your Mixed Farm",
  },
  {
    id: "dairy",
    key: "dairy",
    name: "Eleanor Wright",
    role: "Dairy Systems & Ruminant Nutrition Specialist",
    badgeText: "Dairy Specialist",
    badgeVariant: "forest",
    farmTypeLabel: "Dairy",
    tagline: "Obsessed with milk margins, cell counts, forage quality, and cow comfort.",
    about:
      "Eleanor is tuned directly into the daily rhythms of the parlour and the feed passage. She understands that dairy margins live and die on feed conversion efficiency, dry cow management, milk contract solids incentives, and mastitis prevention. Eleanor keeps a watchful eye on your somatic cell count trends, advises on herbal leys under SFI grassland options, and ensures your compliance with dairy hygiene regulations.",
    specialisms: [
      "Milk contract pricing, butterfat & protein solids bonuses",
      "Somatic Cell Count (SCC) & mastitis early warning trends",
      "Forage D-value tracking and silage cut timing",
      "Selective dry cow therapy & antibiotic stewardship records",
      "SFI Grassland actions (SAM3 Herbal leys & legume mixes)",
    ],
    monitoringItems: [
      {
        title: "Daily Milk Yield & Solids Benchmarking",
        detail: "Tracks butterfat and protein percentages against your milk buyer contract parameters to maximise pence-per-litre.",
      },
      {
        title: "Bulk Tank Somatic Cell Count (SCC) Trends",
        detail: "Detects creeping sub-clinical mastitis patterns early to prevent bulk tank penalty thresholds from triggering.",
      },
      {
        title: "Silage Clamp Quality & D-Value Curves",
        detail: "Advises on optimal multi-cut silage harvesting dates based on grass sugars and weather windows.",
      },
      {
        title: "SFI Herbal Leys on Grazing Platforms",
        detail: "Integrates deep-rooting chicory, plantain, and red clover to reduce bloat, cut N fertiliser, and secure £382/ha.",
      },
      {
        title: "Calving & Transition Cow Scheduling",
        detail: "Monitors dry period lengths, mineral supplementation, and calving interval targets for the milking herd.",
      },
      {
        title: "Clean Water & Slurry Infrastructure Rules",
        detail: "Assists with EA agricultural diffuse pollution audits and Slurry Infrastructure Grant calculations.",
      },
    ],
    chatPreview: [
      {
        sender: "advisor",
        time: "07:30",
        text: "Eleanor here. Yesterday evening's bulk tank report showed butterfat dipped to 3.82% while protein held steady at 3.35%. With your First Milk contract, lifting butterfat above 4.0% adds 1.4p/litre across your daily 6,500L shipment.",
        badge: "Contract Margin Alert",
      },
      {
        sender: "farmer",
        time: "07:50",
        text: "The cows switched to the lower clamp on Saturday. Might be lower structural fibre?",
      },
      {
        sender: "advisor",
        time: "07:52",
        text: "Exactly. The lower clamp test showed 38% NDF versus 44% previously. Adding 0.75kg chopped straw per head into the TMR will restore rumen cud-chewing and bring butterfat back within 72 hours. I have updated the mixer wagon sheet.",
        actionNote: "TMR ration adjustment drafted for wagon operator",
      },
    ],
    ctaText: "Set Up Your Dairy Farm",
  },
];

export function AdvisorsClient() {
  const [activeTab, setActiveTab] = useState<string>("arable");

  const scrollToAdvisor = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col">
      {/* HERO / INTRODUCTION HEADER */}
      <section className="pt-28 pb-14 bg-parchment-100 border-b border-parchment-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="forest" size="md">
            The Steward Advisory Team
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-forest-900 leading-tight max-w-4xl mx-auto">
            Meet the advisor who understands{" "}
            <span className="italic text-terracotta-700 font-normal underline decoration-gold-400 decoration-1 underline-offset-4">
              your exact kind
            </span>{" "}
            of farm.
          </h1>

          <p className="text-lg sm:text-xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed">
            Farming in the UK is never one-size-fits-all. Steward pairs your holding with a dedicated,
            deeply trained advisor persona built around the specific rhythms, crops, animals, and
            compliance requirements of your enterprise.
          </p>

          {/* Interactive Farm Type Selector */}
          <div className="pt-8 max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-widest font-serif font-semibold text-charcoal-600 mb-3">
              Select your farm enterprise to view your advisor:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ADVISORS.map((advisor) => {
                const isActive = activeTab === advisor.id;
                return (
                  <button
                    key={advisor.id}
                    onClick={() => scrollToAdvisor(advisor.id)}
                    className={cn(
                      "p-3 rounded-lg border text-sm font-medium transition-all duration-200 flex flex-col items-center justify-center space-y-1 focus:outline-none focus:ring-2 focus:ring-forest-700",
                      isActive
                        ? "bg-forest-800 text-parchment-50 border-forest-900 shadow-warm-md scale-[1.02]"
                        : "bg-white text-charcoal-800 border-parchment-300 hover:bg-parchment-200/80 hover:border-forest-400"
                    )}
                  >
                    <span className="font-serif font-semibold text-base">{advisor.farmTypeLabel}</span>
                    <span
                      className={cn(
                        "text-[11px]",
                        isActive ? "text-gold-300 font-medium" : "text-charcoal-500"
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
      <div className="divide-y divide-parchment-300">
        {ADVISORS.map((advisor, index) => {
          const isEven = index % 2 === 0;

          return (
            <section
              key={advisor.id}
              id={advisor.id}
              className={cn(
                "py-20 md:py-28 px-4 sm:px-6 lg:px-8 transition-colors",
                isEven ? "bg-white" : "bg-parchment-100"
              )}
            >
              <div className="max-w-7xl mx-auto space-y-16">
                
                {/* Top Profile Header Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  
                  {/* Left Column: Portrait & Quick Stats */}
                  <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-6">
                    <div className="relative">
                      <AdvisorPortrait
                        type={advisor.key}
                        name={advisor.name}
                        size="lg"
                        className="shadow-warm-lg"
                      />
                      <div className="absolute -bottom-3 -right-3 bg-forest-800 text-parchment-50 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider border border-forest-900 shadow-sm">
                        Verified AI Advisor
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Badge variant={advisor.badgeVariant} size="md">
                        {advisor.badgeText}
                      </Badge>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 pt-1">
                        {advisor.name}
                      </h2>
                      <p className="text-sm font-medium text-terracotta-700">
                        {advisor.role}
                      </p>
                    </div>

                    <p className="text-sm text-charcoal-700 italic border-l-2 border-gold-500 pl-3 leading-relaxed">
                      &quot;{advisor.tagline}&quot;
                    </p>

                    <Button href="/signup" variant="primary" size="lg" className="w-full sm:w-auto">
                      {advisor.ctaText} &rarr;
                    </Button>
                  </div>

                  {/* Right Column: Deep About & Core Specialisms */}
                  <div className="lg:col-span-8 space-y-8">
                    <div className="space-y-4">
                      <h3 className="font-serif text-xl sm:text-2xl font-semibold text-forest-900 flex items-center">
                        <Compass className="w-5 h-5 mr-2 text-terracotta-700" />
                        About Your Advisor
                      </h3>
                      <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed">
                        {advisor.about}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <h4 className="font-serif text-base font-semibold text-charcoal-900">
                        Key Advisory Specialisms:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-charcoal-700">
                        {advisor.specialisms.map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-start space-x-2 bg-parchment-50 p-2.5 rounded-md border border-parchment-300/80">
                            <CheckCircle2 className="w-4 h-4 text-forest-700 mt-0.5 flex-shrink-0" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Proactive Monitoring List & Sample Chat Mockup */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-6 border-t border-parchment-300">
                  
                  {/* Proactive Monitoring */}
                  <div className="lg:col-span-6 space-y-6">
                    <div>
                      <div className="inline-flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-terracotta-700" />
                        <span className="text-xs uppercase font-serif tracking-widest font-semibold text-terracotta-800">
                          Continuous Intelligence
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-serif font-semibold text-forest-900">
                        What {advisor.name.split(" ")[0]} keeps an eye on for you:
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {advisor.monitoringItems.map((item, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-3.5 rounded-lg bg-parchment-50 border border-parchment-300 hover:border-forest-400 transition-colors"
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-forest-700" />
                            <h4 className="font-serif font-bold text-sm text-forest-950">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-xs text-charcoal-600 leading-relaxed pl-4">
                            {item.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sample Interaction Preview */}
                  <div className="lg:col-span-6 space-y-6">
                    <div>
                      <div className="inline-flex items-center space-x-2 mb-2">
                        <Sparkles className="w-4 h-4 text-gold-600" />
                        <span className="text-xs uppercase font-serif tracking-widest font-semibold text-forest-900">
                          Sample Exchange
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-serif font-semibold text-forest-900">
                        How daily advice feels on your phone:
                      </h3>
                    </div>

                    <div className="rounded-2xl bg-[#FAF8F3] border-2 border-parchment-300 p-5 shadow-warm-md space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-parchment-300/80">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-8 h-8 rounded-full bg-forest-800 text-parchment-50 flex items-center justify-center font-serif text-xs font-bold">
                            {advisor.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-xs font-serif font-bold text-charcoal-900 leading-none">
                              {advisor.name}
                            </p>
                            <p className="text-[10px] text-forest-700 font-medium">
                              {advisor.badgeText} &bull; Online
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-parchment-300 text-charcoal-500 font-mono">
                          Steward Mobile
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
                                  "max-w-[88%] p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed shadow-sm space-y-1.5",
                                  isAdvisor
                                    ? "bg-white text-charcoal-800 border border-parchment-300 rounded-tl-none"
                                    : "bg-forest-800 text-parchment-50 rounded-tr-none"
                                )}
                              >
                                {msg.badge && (
                                  <div className="inline-block text-[10px] uppercase font-bold tracking-wider text-terracotta-700 bg-terracotta-50 px-2 py-0.5 rounded border border-terracotta-200">
                                    {msg.badge}
                                  </div>
                                )}
                                <p>{msg.text}</p>
                                {msg.actionNote && (
                                  <div className="pt-1.5 border-t border-parchment-200 flex items-center text-[11px] font-medium text-forest-800">
                                    <FileCheck className="w-3.5 h-3.5 mr-1 text-forest-700" />
                                    {msg.actionNote}
                                  </div>
                                )}
                              </div>
                              <span className="text-[10px] text-charcoal-400 mt-1 px-1">
                                {msg.time}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-3 border-t border-parchment-300/80 flex items-center justify-between text-xs text-charcoal-500">
                        <span className="italic">Type a question or tap voice message...</span>
                        <div className="w-7 h-7 rounded-md bg-forest-800 text-parchment-50 flex items-center justify-center">
                          &uarr;
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-between items-center text-xs text-charcoal-600">
                      <span className="flex items-center">
                        <ShieldCheck className="w-4 h-4 text-forest-700 mr-1" />
                        Human specialist review 1-tap away
                      </span>
                      <Button href="/signup" variant="primary" size="sm">
                        {advisor.ctaText}
                      </Button>
                    </div>
                  </div>

                </div>

              </div>
            </section>
          );
        })}
      </div>

      {/* HUMAN EXPERT ESCALATION CALLOUT */}
      <section className="py-16 bg-forest-900 text-parchment-100 border-t border-forest-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="gold">Uncompromising Trust</Badge>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-parchment-50">
            Backed by accredited British agricultural professionals.
          </h2>
          <p className="text-base sm:text-lg text-parchment-200 max-w-2xl mx-auto leading-relaxed">
            Your Steward advisor knows its boundaries. Whenever an unusual clinical presentation,
            contested tenancy dispute, or complex drainage claim occurs, you are immediately routed
            to real human professionals on our network.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button href="/signup" variant="gold" size="lg">
              Start Free 30-Day Trial
            </Button>
            <Button href="/about#network" variant="outline" size="lg" className="border-parchment-300 text-parchment-100 hover:bg-forest-800">
              Learn About Human Network
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
