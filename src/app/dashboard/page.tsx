"use client";

import React from "react";
import Link from "next/link";
import {
  Sprout,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CloudRain,
  MessageSquareText,
  HelpCircle,
  Tractor,
  Layers,
  Clock,
  Plus,
  Radio,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { AdvisorPortrait } from "@/components/ui/AdvisorPortrait";
import { MetOfficeWeatherWidget } from "@/components/dashboard/MetOfficeWeatherWidget";
import { useAuth } from "@/context/AuthContext";
import { ADVISOR_PERSONAS } from "@/lib/types";

export default function DashboardOverviewPage() {
  const { farm, user } = useAuth();
  const farmType = farm?.farm_type || "arable";
  const advisor = ADVISOR_PERSONAS[farmType];

  return (
    <div className="space-y-8 bg-obsidian-950 text-parchment-100">
      
      {/* 
        ========================================================================
        1. ADVISOR GREETING & OPERATIONAL COCKPIT BANNER
        ========================================================================
      */}
      <div className="bg-obsidian-900/90 rounded-panel p-6 sm:p-8 border border-gold-coutts/40 shadow-hud-gold flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        
        {/* Subtle background radar scanline */}
        <div className="absolute inset-0 bg-tactical-grid opacity-20 pointer-events-none" />

        <div className="flex items-start sm:items-center space-x-5 relative z-10">
          <AdvisorPortrait type={farmType} name={advisor.name} size="md" className="flex-shrink-0" />
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <Badge variant="volt" size="sm" pulse>
                LIVE ADVISORY
              </Badge>
              <span className="text-xs font-mono text-parchment-300 font-medium">
                {farm?.name || "Highfield Grange Farm"} &bull; {farm?.size_hectares || 240} HA
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Good day. {advisor.name} is on duty.
            </h1>
            <p className="text-xs sm:text-sm text-parchment-300 max-w-xl italic font-sans">
              &quot;{advisor.greeting}&quot;
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto relative z-10">
          <Button href="/dashboard/chat" variant="volt" size="md">
            Consult {advisor.name.split(" ")[0]} &rarr;
          </Button>
          <Button href="/dashboard/expert" variant="secondary" size="md">
            Ask an Expert
          </Button>
        </div>
      </div>

      {/* 
        ========================================================================
        2. MET OFFICE AGRICULTURAL SPOT FORECAST & SPRAY WINDOW TELEMETRY
        ========================================================================
      */}
      <MetOfficeWeatherWidget
        lat={farm?.location_lat || 54.23}
        lng={farm?.location_lng || -1.34}
        locationName={farm?.location_address || farm?.name || "Holding Coordinates"}
      />

      {/* 
        ========================================================================
        3. GETTING STARTED PIPELINE
        ========================================================================
      */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-wider font-bold text-white flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-volt" />
            <span>HOLDING SETUP PIPELINE</span>
          </h2>
          <span className="text-xs font-mono text-parchment-400 font-semibold">[PROGRESS: 1 OF 4 VERIFIED]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <Card variant="hud" cornerTicks className="p-5 space-y-3 border-l-4 border-l-volt">
            <div className="flex items-center justify-between font-mono">
              <span className="text-[10px] font-bold tracking-wider uppercase text-volt bg-volt/10 px-2 py-0.5 rounded-tech border border-volt/20">
                VERIFIED
              </span>
              <CheckCircle2 className="w-4 h-4 text-volt" />
            </div>
            <h3 className="font-serif font-bold text-base text-white">
              1. Farm Profile Baseline
            </h3>
            <p className="text-xs text-parchment-300 leading-relaxed font-sans">
              Enterprise configuration and initial holding boundaries locked into agronomy telemetry.
            </p>
          </Card>

          <Card variant="hud" hoverEffect cornerTicks className="p-5 space-y-3 border-l-4 border-l-gold-coutts">
            <div className="flex items-center justify-between font-mono">
              <span className="text-[10px] font-bold tracking-wider uppercase text-gold-300 bg-gold-coutts/15 px-2 py-0.5 rounded-tech border border-gold-coutts/30">
                RECOMMENDED
              </span>
              <Plus className="w-4 h-4 text-gold-coutts" />
            </div>
            <h3 className="font-serif font-bold text-base text-white">
              2. Link RPA Field Parcels
            </h3>
            <p className="text-xs text-parchment-300 leading-relaxed font-sans">
              Import digital field boundary shapefiles to activate automated SFI 2026.1 stacking calculations.
            </p>
            <Link href="/dashboard/profile" className="text-xs font-mono uppercase tracking-wider text-gold-coutts hover:text-white block pt-1">
              Add field parcels &rarr;
            </Link>
          </Card>

          <Card variant="hud" hoverEffect cornerTicks className="p-5 space-y-3 border-l-4 border-l-white/20">
            <div className="flex items-center justify-between font-mono">
              <span className="text-[10px] font-bold tracking-wider uppercase text-parchment-300 bg-white/5 px-2 py-0.5 rounded-tech border border-white/10">
                NEXT MILESTONE
              </span>
              <MessageSquareText className="w-4 h-4 text-parchment-400" />
            </div>
            <h3 className="font-serif font-bold text-base text-white">
              3. Initial Consultation
            </h3>
            <p className="text-xs text-parchment-300 leading-relaxed font-sans">
              Brief {advisor.name.split(" ")[0]} on current spray schedules or upcoming subsidy deadlines.
            </p>
            <Link href="/dashboard/chat" className="text-xs font-mono uppercase tracking-wider text-volt hover:text-white block pt-1">
              Open chat &rarr;
            </Link>
          </Card>

        </div>
      </div>

      {/* 
        ========================================================================
        4. TWO-COLUMN SPLIT: TASKS & ALERTS + ADVISOR CHAT PREVIEW
        ========================================================================
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Tasks & Compliance Alerts */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 font-mono">
              <Clock className="w-4 h-4 text-gold-coutts" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                ACTIVE TASKS &bull; COMPLIANCE QUEUE
              </h2>
            </div>
            <Link href="/dashboard/tasks" className="text-xs font-mono uppercase tracking-wider text-gold-coutts hover:text-white">
              View all tasks &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            
            {/* Amber Task Card */}
            <div className="p-4 rounded-panel bg-obsidian-900 border border-gold-coutts/40 shadow-sm space-y-2.5">
              <div className="flex items-start justify-between font-mono">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-gold-coutts animate-pulse" />
                  <span className="text-xs font-bold text-white">
                    Defra SFI Parcel Eligibility Review
                  </span>
                </div>
                <span className="text-[10px] text-gold-coutts bg-gold-coutts/10 px-2 py-0.5 rounded-tech border border-gold-coutts/30">
                  AMBER &bull; APPROVAL REQUIRED
                </span>
              </div>
              <p className="text-xs text-parchment-300 leading-relaxed font-sans">
                Steward has identified 3 eligible SFI actions (SAM3 Herbal Leys, NUM1 Legumes, IPM1) across your holding. Draft agreement is compiled for your 1-tap review.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                <span className="font-mono font-bold text-gold-coutts">POTENTIAL VALUE: £8,420/YR</span>
                <Button href="/dashboard/tasks" variant="gold" size="sm">
                  Review &amp; Approve
                </Button>
              </div>
            </div>

            {/* Green Task Card */}
            <div className="p-4 rounded-panel bg-obsidian-900 border border-white/10 shadow-sm space-y-2.5">
              <div className="flex items-start justify-between font-mono">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-volt" />
                  <span className="text-xs font-bold text-white">
                    Micro-Climate Weather Radar Sync
                  </span>
                </div>
                <span className="text-[10px] text-volt bg-volt/10 px-2 py-0.5 rounded-tech border border-volt/30">
                  GREEN &bull; AUTOMATED
                </span>
              </div>
              <p className="text-xs text-parchment-300 leading-relaxed font-sans">
                Local radar connected for {farm?.location_address || "North Yorkshire"}. 6-day spray window and soil moisture telemetry active.
              </p>
            </div>

          </div>
        </div>

        {/* Right Column: Advisor Briefing Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between font-mono">
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-volt" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                ADVISOR BRIEFING
              </h2>
            </div>
            <Link href="/dashboard/chat" className="text-xs uppercase tracking-wider text-volt hover:text-white">
              Open Consultation &rarr;
            </Link>
          </div>

          <div className="bg-obsidian-900 p-5 rounded-panel border border-white/10 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-white/10">
              <AdvisorPortrait type={farmType} name={advisor.name} size="sm" />
              <div>
                <p className="text-xs font-serif font-bold text-white">
                  {advisor.name}
                </p>
                <p className="text-[10px] font-mono text-gold-300">
                  Your Dedicated {advisor.role}
                </p>
              </div>
            </div>

            <p className="text-xs text-parchment-300 leading-relaxed italic bg-obsidian-950 p-4 rounded-tech border border-white/5 font-sans">
              &quot;Welcome to your new Steward dashboard. I have configured your holding baseline for {farmType} operations. You can ask me anything about break crops, NVZ rules, or grant applications whenever you need.&quot;
            </p>

            <Button href="/dashboard/chat" variant="volt" size="sm" className="w-full">
              Ask {advisor.name.split(" ")[0]} a question
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
}
