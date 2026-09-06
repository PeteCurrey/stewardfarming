"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Calendar,
  ArrowRight,
  CloudRain,
  MessageSquareText,
  Clock,
  Plus,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
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

      {/* ── Advisor greeting banner ─────────────────────────────── */}
      <div className="bg-forest-900 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center space-x-5">
          <AdvisorPortrait type={farmType} name={advisor.name} size="md" className="flex-shrink-0" />
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="inline-flex items-center space-x-1.5 text-xs font-medium text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live advisory</span>
              </span>
              <span className="text-xs text-white/50">
                {farm?.name || "Highfield Grange Farm"} · {farm?.size_hectares || 240} ha
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Good day. {advisor.name} is on duty.
            </h1>
            <p className="text-sm text-white/60 max-w-xl italic">
              &quot;{advisor.greeting}&quot;
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <Button href="/dashboard/chat" variant="white" size="md">
            Consult {advisor.name.split(" ")[0]} <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
          <Button href="/dashboard/expert" variant="outline" size="md" className="border-white/20 text-white hover:bg-white/10">
            Ask an Expert
          </Button>
        </div>
      </div>

      {/* ── Met Office weather ───────────────────────────────────── */}
      <MetOfficeWeatherWidget
        lat={farm?.location_lat || 54.23}
        lng={farm?.location_lng || -1.34}
        locationName={farm?.location_address || farm?.name || "Your Holding"}
      />

      {/* ── Getting started checklist ────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Getting started</h2>
            <p className="text-sm text-slate-500">Complete your farm profile to unlock full advisory capabilities</p>
          </div>
          <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
            1 of 4 complete
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Step 1 — done */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 border-l-4 border-l-emerald-500">
            <div className="flex items-center justify-between">
              <Badge variant="forest" size="sm">Complete</Badge>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-slate-900">1. Farm Profile</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Enterprise configuration and initial holding boundaries saved.
            </p>
          </div>

          {/* Step 2 — recommended */}
          <Link href="/dashboard/profile" className="block group">
            <div className="bg-white rounded-xl border border-amber-200 p-5 space-y-3 border-l-4 border-l-amber-400 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <Badge variant="gold" size="sm">Recommended</Badge>
                <Plus className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="font-semibold text-slate-900">2. Link RPA Field Parcels</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Import digital field boundaries to activate SFI 2026.1 stacking calculations.
              </p>
              <span className="text-xs font-medium text-amber-600 group-hover:text-amber-700 flex items-center">
                Add field parcels <ArrowRight className="w-3 h-3 ml-1" />
              </span>
            </div>
          </Link>

          {/* Step 3 */}
          <Link href="/dashboard/chat" className="block group">
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <Badge variant="outline" size="sm">Next</Badge>
                <MessageSquareText className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-900">3. Initial Consultation</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Brief {advisor.name.split(" ")[0]} on spray schedules or upcoming subsidy deadlines.
              </p>
              <span className="text-xs font-medium text-forest-700 group-hover:text-forest-900 flex items-center">
                Open chat <ArrowRight className="w-3 h-3 ml-1" />
              </span>
            </div>
          </Link>

        </div>
      </div>

      {/* ── Two-column: Tasks + Advisor panel ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Tasks & alerts */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <h2 className="text-base font-semibold text-slate-900">Active tasks</h2>
            </div>
            <Link href="/dashboard/tasks" className="text-xs font-medium text-forest-700 hover:text-forest-900 flex items-center">
              View all <ChevronRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>

          <div className="space-y-3">

            {/* Amber: SFI review */}
            <div className="bg-white rounded-xl border border-amber-200 p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
                  <span className="text-sm font-semibold text-slate-900">
                    Defra SFI Parcel Eligibility Review
                  </span>
                </div>
                <Badge variant="gold" size="sm">Awaiting approval</Badge>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Steward has identified 3 eligible SFI actions (SAM3 Herbal Leys, NUM1 Legumes, IPM1) across your holding. Draft agreement compiled for your review.
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <span className="text-sm font-semibold text-emerald-700">Potential value: £8,420/yr</span>
                <Button href="/dashboard/tasks" variant="primary" size="sm">
                  Review &amp; Approve
                </Button>
              </div>
            </div>

            {/* Green: Weather sync */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-semibold text-slate-900">
                    Micro-Climate Weather Radar Sync
                  </span>
                </div>
                <Badge variant="forest" size="sm">Automated</Badge>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Local radar connected for {farm?.location_address || "North Yorkshire"}. 6-day spray window and soil moisture data active.
              </p>
            </div>

          </div>
        </div>

        {/* Advisor briefing */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Your advisor</h2>
            <Link href="/dashboard/chat" className="text-xs font-medium text-forest-700 hover:text-forest-900 flex items-center">
              Open consultation <ChevronRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
              <AdvisorPortrait type={farmType} name={advisor.name} size="sm" />
              <div>
                <p className="text-sm font-semibold text-slate-900">{advisor.name}</p>
                <p className="text-xs text-slate-400">Your {advisor.role}</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed italic bg-slate-50 p-4 rounded-lg border border-slate-100">
              &quot;Welcome to your new Steward dashboard. I have configured your holding baseline for {farmType} operations. You can ask me anything about break crops, NVZ rules, or grant applications whenever you need.&quot;
            </p>

            <Button href="/dashboard/chat" variant="primary" size="sm" className="w-full">
              Ask {advisor.name.split(" ")[0]} a question
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
}
