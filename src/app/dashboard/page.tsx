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
    <div className="space-y-8">
      
      {/* 
        ========================================================================
        1. ADVISOR GREETING & STATUS BANNER
        ========================================================================
      */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-parchment-300 shadow-warm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center space-x-4">
          <AdvisorPortrait type={farmType} name={advisor.name} size="md" className="flex-shrink-0" />
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Badge variant="forest" size="sm">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-600 mr-1.5 animate-pulse" />
                Live Advisory
              </Badge>
              <span className="text-xs text-charcoal-500 font-medium">
                {farm?.name || "Highfield Grange Farm"} ({farm?.size_hectares || 240} ha)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900">
              Good day. {advisor.name} is on duty.
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 max-w-xl italic">
              &quot;{advisor.greeting}&quot;
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
          <Button href="/dashboard/chat" variant="primary" size="md">
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
        2. GETTING STARTED CARDS (EMPTY-STATE FRIENDLY)
        ========================================================================
      */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif font-bold text-lg text-forest-900">
            Getting Started with Steward
          </h2>
          <span className="text-xs text-charcoal-500 font-medium">Progress: 1 of 4 Completed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <Card variant="linen" className="p-5 space-y-3 border-2 border-forest-600/40">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider uppercase text-forest-800 bg-forest-100 px-2 py-0.5 rounded">
                Completed
              </span>
              <CheckCircle2 className="w-4 h-4 text-forest-700" />
            </div>
            <h3 className="font-serif font-bold text-base text-forest-950">
              1. Farm Profile Setup
            </h3>
            <p className="text-xs text-charcoal-600">
              Enterprise configuration and initial holding boundaries established.
            </p>
          </Card>

          <Card variant="linen" hoverEffect className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider uppercase text-terracotta-800 bg-terracotta-100 px-2 py-0.5 rounded">
                Recommended
              </span>
              <Plus className="w-4 h-4 text-terracotta-700" />
            </div>
            <h3 className="font-serif font-bold text-base text-forest-950">
              2. Link RPA Field Parcels
            </h3>
            <p className="text-xs text-charcoal-600">
              Import digital field boundary shapes to activate automated SFI action calculations.
            </p>
            <Link href="/dashboard/profile" className="text-xs font-semibold text-terracotta-700 hover:underline block pt-1">
              Add field parcels &rarr;
            </Link>
          </Card>

          <Card variant="linen" hoverEffect className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider uppercase text-charcoal-600 bg-parchment-200 px-2 py-0.5 rounded">
                Next Step
              </span>
              <MessageSquareText className="w-4 h-4 text-charcoal-500" />
            </div>
            <h3 className="font-serif font-bold text-base text-forest-950">
              3. First Advisor Consultation
            </h3>
            <p className="text-xs text-charcoal-600">
              Ask {advisor.name.split(" ")[0]} about spray conditions or upcoming SFI funding opportunities.
            </p>
            <Link href="/dashboard/chat" className="text-xs font-semibold text-forest-800 hover:underline block pt-1">
              Open chat &rarr;
            </Link>
          </Card>

        </div>
      </div>

      {/* 
        ========================================================================
        3. TWO-COLUMN SPLIT: TASKS & ALERTS (EMPTY STATE) + ADVISOR CHAT PREVIEW
        ========================================================================
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Tasks & Alerts */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-terracotta-700" />
              <h2 className="font-serif font-bold text-lg text-forest-900">
                Active Tasks &amp; Compliance Alerts
              </h2>
            </div>
            <Link href="/dashboard/tasks" className="text-xs font-semibold text-terracotta-700 hover:underline">
              View all tasks &rarr;
            </Link>
          </div>

          {/* Simulated Initial Tasks */}
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white border border-parchment-300 shadow-sm space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-xs font-bold text-charcoal-900">
                    Defra SFI Parcel Eligibility Review
                  </span>
                </div>
                <span className="text-[10px] font-mono text-charcoal-500">Amber &bull; Action Required</span>
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Steward has identified 3 eligible SFI actions (SAM3 Herbal Leys, NUM1 Legumes, IPM1) across your holding. Draft agreement is ready for your review.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-parchment-200 text-xs">
                <span className="font-semibold text-forest-800">Potential value: £8,420/yr</span>
                <Button href="/dashboard/tasks" variant="outline" size="sm">
                  Review &amp; Approve
                </Button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-parchment-300 shadow-sm space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span className="text-xs font-bold text-charcoal-900">
                    Micro-Climate Weather Radar Sync
                  </span>
                </div>
                <span className="text-[10px] font-mono text-forest-700">Green &bull; Automated</span>
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Local radar connected for {farm?.location_address || "North Yorkshire"}. 6-day spray window and soil moisture telemetry active.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Advisor Activity */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-gold-600" />
              <h2 className="font-serif font-bold text-lg text-forest-900">
                Advisor Notes
              </h2>
            </div>
            <Link href="/dashboard/chat" className="text-xs font-semibold text-forest-800 hover:underline">
              Open Consultation &rarr;
            </Link>
          </div>

          <div className="bg-white p-5 rounded-xl border border-parchment-300 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-parchment-200">
              <div className="w-8 h-8 rounded-full bg-forest-800 text-parchment-50 flex items-center justify-center font-serif text-xs font-bold">
                {advisor.avatarInitials}
              </div>
              <div>
                <p className="text-xs font-serif font-bold text-forest-950">
                  {advisor.name}
                </p>
                <p className="text-[10px] text-charcoal-500">
                  Your Dedicated {advisor.role}
                </p>
              </div>
            </div>

            <p className="text-xs text-charcoal-700 leading-relaxed italic bg-parchment-50 p-3.5 rounded-lg border border-parchment-300/80">
              &quot;Welcome to your new Steward dashboard. I have configured your holding baseline for {farmType} operations. You can ask me anything about break crops, NVZ rules, or grant applications whenever you need.&quot;
            </p>

            <Button href="/dashboard/chat" variant="outline" size="sm" className="w-full">
              Ask {advisor.name.split(" ")[0]} a question
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
}
