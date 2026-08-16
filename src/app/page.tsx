import React from "react";
import Link from "next/link";
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileText,
  Wheat,
  Footprints,
  Trees,
  Milk,
  TrendingUp,
  Wrench,
  Users,
  HeartHandshake,
  Leaf,
  Layers,
  PhoneCall,
  Lock,
  Sparkles,
  HelpCircle,
  Clock,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { AdvisorPortrait } from "@/components/ui/AdvisorPortrait";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 
        ========================================================================
        1. HERO SECTION
        ========================================================================
      */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 bg-parchment-100 overflow-hidden border-b border-parchment-300">
        {/* Subtle background terrain contour lines */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#2C4A3B_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2">
                <Badge variant="forest" size="md">
                  <span className="w-2 h-2 rounded-full bg-forest-600 mr-1.5 animate-pulse" />
                  Purpose-Built for UK Agriculture
                </Badge>
                <span className="text-xs text-charcoal-600 hidden sm:inline-block font-medium">
                  2024/2025 SFI & Defra Ready
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-forest-900 leading-[1.12] tracking-tight">
                One AI advisor, personalised to your farm, that{" "}
                <span className="italic font-normal text-terracotta-700 underline decoration-gold-400 decoration-wavy decoration-1 underline-offset-4">
                  actually acts
                </span>{" "}
                on your behalf.
              </h1>

              <p className="text-lg sm:text-xl text-charcoal-700 leading-relaxed max-w-2xl">
                From optimising spray windows and livestock rations to submitting complex SFI
                applications and Red Tractor records — Steward stays two steps ahead of your season,
                backed by accredited human agronomists and vets.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Button href="/signup" variant="primary" size="lg" className="group">
                  Start 30-Day Free Trial
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button href="/how-it-works" variant="secondary" size="lg">
                  See How It Works
                </Button>
              </div>

              {/* Trust badges */}
              <div className="pt-6 border-t border-parchment-300/80 grid grid-cols-3 gap-4 max-w-xl text-xs text-charcoal-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-700 flex-shrink-0" />
                  <span>No long contracts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-forest-700 flex-shrink-0" />
                  <span>You own 100% of data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-forest-700 flex-shrink-0" />
                  <span>Vets & agronomists on call</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Area */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Visual Placeholder container */}
                <div className="relative rounded-2xl bg-gradient-to-b from-[#FAF6EE] to-[#EAE0CD] p-6 border-2 border-parchment-300 shadow-warm-xl overflow-hidden">
                  
                  {/*
                    ========================================================================
                    VISUAL PLACEHOLDER: Hero Image Area
                    Replace with commissioned British landscape linocut or advisor montage
                    ========================================================================
                  */}
                  <div className="mb-4 flex items-center justify-between border-b border-parchment-300/80 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-forest-700 inline-block" />
                      <span className="text-xs font-serif font-semibold text-forest-900">
                        Steward Morning Field Briefing
                      </span>
                    </div>
                    <Badge variant="gold" size="sm">Live Advisory</Badge>
                  </div>

                  {/* Simulated proactive card inside placeholder */}
                  <div className="space-y-3 text-left">
                    <div className="bg-white/90 p-4 rounded-lg border border-parchment-300 shadow-sm space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-terracotta-600 mt-0.5" />
                          <span className="text-xs font-semibold text-charcoal-800">
                            SFI SAM3 Herbal Leys — 12 Days Remaining
                          </span>
                        </div>
                        <span className="text-[10px] text-charcoal-500">07:45</span>
                      </div>
                      <p className="text-xs text-charcoal-600 leading-relaxed">
                        &quot;Field 4 &amp; 7 seedbed conditions are optimal today. I have drafted your compliance log entry for Defra and verified non-overlapping payment codes with your CS agreement.&quot;
                      </p>
                      <div className="flex items-center space-x-2 pt-1">
                        <span className="text-[11px] font-semibold text-forest-800 bg-forest-50 px-2 py-0.5 rounded border border-forest-200">
                          Ready to approve
                        </span>
                        <span className="text-[11px] text-charcoal-500">
                          Estimated value: £4,180/yr
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/90 p-4 rounded-lg border border-parchment-300 shadow-sm space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-forest-900 flex items-center">
                          <Wheat className="w-3.5 h-3.5 mr-1.5 text-gold-600" />
                          Spray Window Window Alert: Winter Wheat T1
                        </span>
                        <span className="text-[10px] text-forest-700 bg-forest-100 px-1.5 py-0.2 rounded font-medium">
                          Favourable
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-600">
                        Wind drops below 7mph between 14:00 and 19:30 today. Rain forecast Thursday.
                      </p>
                    </div>
                  </div>

                  {/* Advisor banner badge */}
                  <div className="mt-4 pt-3 border-t border-parchment-300/80 flex items-center justify-between text-xs text-charcoal-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-forest-800 text-parchment-50 flex items-center justify-center font-serif text-xs">
                        TC
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal-900 leading-none">Tom Campbell</p>
                        <p className="text-[10px] text-charcoal-500">Your Arable Advisor</p>
                      </div>
                    </div>
                    <Link href="/advisors" className="text-terracotta-700 font-semibold hover:underline flex items-center text-xs">
                      Switch farm type &rarr;
                    </Link>
                  </div>

                </div>

                {/* Subtle vintage stamp accent */}
                <div className="absolute -bottom-4 -right-4 bg-terracotta-600 text-parchment-50 px-3 py-1.5 rounded-md shadow-warm-md text-xs font-serif font-medium tracking-wide rotate-2 border border-terracotta-700">
                  Defra 2024/25 Ready
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        2. THE PROBLEM SECTION
        ========================================================================
      */}
      <Section
        variant="white"
        badge={<Badge variant="terracotta">The Reality of Modern UK Farming</Badge>}
        title="Farming today is five full-time jobs at once."
        subtitle="You are managing weather extremes, shifting subsidy regimes, compliance inspections, livestock health, volatile input costs, and machinery repairs — usually scattered across five apps, emails, or notes in the Land Rover."
        alignHeader="center"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card variant="linen" className="relative">
            <div className="w-10 h-10 rounded-lg bg-terracotta-100 text-terracotta-800 flex items-center justify-center mb-4 font-serif font-bold text-lg border border-terracotta-200">
              1
            </div>
            <CardTitle className="text-lg mb-2">Subsidy Rules Shift Every Season</CardTitle>
            <CardDescription>
              Basic Payment delinking and SFI action additions mean leaving money on the table or risking clawbacks because nobody has time to read 180-page Defra technical guidance.
            </CardDescription>
          </Card>

          <Card variant="linen" className="relative">
            <div className="w-10 h-10 rounded-lg bg-terracotta-100 text-terracotta-800 flex items-center justify-center mb-4 font-serif font-bold text-lg border border-terracotta-200">
              2
            </div>
            <CardTitle className="text-lg mb-2">Paperwork Pulls You Off the Land</CardTitle>
            <CardDescription>
              NVZ records, veterinary medicine logs, Red Tractor evidence, and waste exemptions turn evenings into administrative headaches after 14-hour days in the field.
            </CardDescription>
          </Card>

          <Card variant="linen" className="relative">
            <div className="w-10 h-10 rounded-lg bg-terracotta-100 text-terracotta-800 flex items-center justify-center mb-4 font-serif font-bold text-lg border border-terracotta-200">
              3
            </div>
            <CardTitle className="text-lg mb-2">Advisors Are Expensive &amp; Reactive</CardTitle>
            <CardDescription>
              Agronomists and consultants visit once a fortnight. You need daily, proactive guidance on the ground — and expert human validation only when high-stakes decisions arise.
            </CardDescription>
          </Card>
        </div>

        {/* Steward Solution Highlight */}
        <div className="mt-12 p-8 rounded-xl bg-forest-900 text-parchment-100 border border-forest-800 shadow-warm-lg text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2 justify-center md:justify-start">
              <Sprout className="w-5 h-5 text-gold-400" />
              <span className="font-serif text-xl font-medium text-parchment-50">
                Steward unifies your entire holding.
              </span>
            </div>
            <p className="text-sm text-parchment-300 leading-relaxed">
              We connect your field parcels, stock registries, weather forecast, input invoices, and Defra entitlements into a single, proactive brain that works for you 24/7.
            </p>
          </div>
          <Button href="/advisors" variant="gold" size="lg" className="whitespace-nowrap">
            Meet Your Advisor &rarr;
          </Button>
        </div>
      </Section>

      {/* 
        ========================================================================
        3. MEET YOUR ADVISOR (TEASER)
        ========================================================================
      */}
      <Section
        variant="parchment"
        badge={<Badge variant="forest">Personalised Intelligence</Badge>}
        title="Not a generic bot. A specialist for your exact farm type."
        subtitle="An upland suckler herd in Northumberland has entirely different demands to an arable enterprise in the Cambridgeshire Fens. Steward configures a dedicated specialist around your acreage and enterprise."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Arable Card */}
          <Card variant="default" hoverEffect className="flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <AdvisorPortrait type="arable" name="Tom Campbell" size="md" className="mx-auto" />
              </div>
              <div className="text-center mb-3">
                <Badge variant="gold" size="sm" className="mb-2">Arable Specialist</Badge>
                <h3 className="font-serif text-xl font-semibold text-forest-900">Tom Campbell</h3>
                <p className="text-xs text-charcoal-500 mt-0.5">Focus: Cereals, Oilseeds &amp; SFI</p>
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed text-center mb-4">
                Optimises rotation margins, disease thresholds, variable rate nitrogen, and soil organic carbon compliance.
              </p>
            </div>
            <Link
              href="/advisors#arable"
              className="mt-auto block text-center text-sm font-semibold text-forest-800 hover:text-terracotta-700 py-2 border-t border-parchment-200 transition-colors"
            >
              Meet Tom &rarr;
            </Link>
          </Card>

          {/* Livestock Card */}
          <Card variant="default" hoverEffect className="flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <AdvisorPortrait type="livestock" name="Fiona MacLeod" size="md" className="mx-auto" />
              </div>
              <div className="text-center mb-3">
                <Badge variant="forest" size="sm" className="mb-2">Livestock Specialist</Badge>
                <h3 className="font-serif text-xl font-semibold text-forest-900">Fiona MacLeod</h3>
                <p className="text-xs text-charcoal-500 mt-0.5">Focus: Beef &amp; Sheep Flocks</p>
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed text-center mb-4">
                Tracks breeding cycles, pasture grazing plate metrics, medicine withdrawal dates, and livestock mart pricing.
              </p>
            </div>
            <Link
              href="/advisors#livestock"
              className="mt-auto block text-center text-sm font-semibold text-forest-800 hover:text-terracotta-700 py-2 border-t border-parchment-200 transition-colors"
            >
              Meet Fiona &rarr;
            </Link>
          </Card>

          {/* Mixed Card */}
          <Card variant="default" hoverEffect className="flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <AdvisorPortrait type="mixed" name="Alistair Reid" size="md" className="mx-auto" />
              </div>
              <div className="text-center mb-3">
                <Badge variant="terracotta" size="sm" className="mb-2">Mixed Farm Specialist</Badge>
                <h3 className="font-serif text-xl font-semibold text-forest-900">Alistair Reid</h3>
                <p className="text-xs text-charcoal-500 mt-0.5">Focus: Integrated Enterprises</p>
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed text-center mb-4">
                Balances forage budgeting with combinable crops, organic manure transfer, and multi-tier Countryside Stewardship.
              </p>
            </div>
            <Link
              href="/advisors#mixed"
              className="mt-auto block text-center text-sm font-semibold text-forest-800 hover:text-terracotta-700 py-2 border-t border-parchment-200 transition-colors"
            >
              Meet Alistair &rarr;
            </Link>
          </Card>

          {/* Dairy Card */}
          <Card variant="default" hoverEffect className="flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <AdvisorPortrait type="dairy" name="Eleanor Wright" size="md" className="mx-auto" />
              </div>
              <div className="text-center mb-3">
                <Badge variant="forest" size="sm" className="mb-2">Dairy Specialist</Badge>
                <h3 className="font-serif text-xl font-semibold text-forest-900">Eleanor Wright</h3>
                <p className="text-xs text-charcoal-500 mt-0.5">Focus: Herd Yield &amp; Ruminant</p>
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed text-center mb-4">
                Monitors somatic cell counts, dry-off scheduling, milk contracts, and SFI grassland herbal ley payments.
              </p>
            </div>
            <Link
              href="/advisors#dairy"
              className="mt-auto block text-center text-sm font-semibold text-forest-800 hover:text-terracotta-700 py-2 border-t border-parchment-200 transition-colors"
            >
              Meet Eleanor &rarr;
            </Link>
          </Card>
        </div>

        <div className="mt-10 text-center">
          <Button href="/advisors" variant="outline" size="md">
            Explore All 4 Full Advisor Profiles &amp; Chat Previews &rarr;
          </Button>
        </div>
      </Section>

      {/* 
        ========================================================================
        4. HOW IT WORKS
        ========================================================================
      */}
      <Section
        variant="white"
        badge={<Badge variant="gold">Simple &amp; Trustworthy</Badge>}
        title="How Steward works alongside your daily routine."
        subtitle="Designed for quick mobile updates in the yard and rigorous financial & regulatory planning at your desk."
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {/* Step 1 */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-forest-800 text-parchment-50 flex items-center justify-center font-serif text-xl font-bold shadow-warm border border-forest-900">
              01
            </div>
            <h3 className="font-serif text-xl font-semibold text-forest-900">
              Set Up Your Farm Profile
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Enter your SBI number, upload field maps (or let us pull them automatically from RPA), and note your current stock, cropping rotation, and existing scheme agreements.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-forest-800 text-parchment-50 flex items-center justify-center font-serif text-xl font-bold shadow-warm border border-forest-900">
              02
            </div>
            <h3 className="font-serif text-xl font-semibold text-forest-900">
              Steward Learns &amp; Monitors
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Our models integrate local weather radars, Defra SFI policy updates, grain/livestock markets, and your soil tests to track every moving piece of your season.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-forest-800 text-parchment-50 flex items-center justify-center font-serif text-xl font-bold shadow-warm border border-forest-900">
              03
            </div>
            <h3 className="font-serif text-xl font-semibold text-forest-900">
              Get Proactive Guidance
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              No need to prompt: Steward pings you before critical spray windows, warns when silage cuts are at peak D-value, and notifies you when grant windows open.
            </p>
          </div>

          {/* Step 4 */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-forest-800 text-parchment-50 flex items-center justify-center font-serif text-xl font-bold shadow-warm border border-forest-900">
              04
            </div>
            <h3 className="font-serif text-xl font-semibold text-forest-900">
              Safe, Approved Action
            </h3>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Steward prepares routine logs automatically, but <strong>always asks your explicit approval</strong> before submitting any grant, financial commitment, or statutory declaration.
            </p>
          </div>
        </div>

        {/* Human-in-the-loop Trust Point Banner */}
        <div className="mt-16 bg-[#FAF2EB] border-2 border-terracotta-300/80 rounded-2xl p-8 shadow-warm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-5 h-5 text-terracotta-700" />
                <span className="font-serif text-lg font-bold text-terracotta-900">
                  Human-in-the-Loop: Steward knows what it doesn&apos;t know.
                </span>
              </div>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                When complex veterinary diagnostics, specialized arable agronomy issues, farm inheritance tax reviews, or insurance claim arbitrations arise, Steward connects you directly to qualified UK human specialists with one tap.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-charcoal-800 pt-1">
                <span className="bg-white px-3 py-1 rounded-md border border-terracotta-200">
                  &bull; RCVS Accredited Farm Vets
                </span>
                <span className="bg-white px-3 py-1 rounded-md border border-terracotta-200">
                  &bull; BASIS &amp; FACTS Certified Agronomists
                </span>
                <span className="bg-white px-3 py-1 rounded-md border border-terracotta-200">
                  &bull; ICAEW Agricultural Accountants
                </span>
                <span className="bg-white px-3 py-1 rounded-md border border-terracotta-200">
                  &bull; Chartered Rural Surveyors
                </span>
              </div>
            </div>
            <Button href="/about#network" variant="secondary" size="md" className="whitespace-nowrap">
              Meet Human Network
            </Button>
          </div>
        </div>
      </Section>

      {/* 
        ========================================================================
        5. FULL-BREADTH FEATURES GRID
        ========================================================================
      */}
      <Section
        variant="parchment"
        badge={<Badge variant="forest">Comprehensive Farm Management</Badge>}
        title="Everything your holding requires. In one coherent system."
        subtitle="Designed to eliminate the clutter of single-purpose apps, spreadsheets, and lost paperwork."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Crop Planning */}
          <Card variant="linen" hoverEffect>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2.5 rounded-lg bg-forest-100 text-forest-900 border border-forest-200">
                <Wheat className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Crop Planning &amp; Agronomy</CardTitle>
            </div>
            <CardDescription>
              Field-by-field gross margins, 5-year break-crop rotations, soil nutrient mapping, variable-rate P&amp;K, and proactive disease threshold alerts.
            </CardDescription>
          </Card>

          {/* 2. Livestock Health */}
          <Card variant="linen" hoverEffect>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2.5 rounded-lg bg-forest-100 text-forest-900 border border-forest-200">
                <Footprints className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Livestock Health &amp; Welfare</CardTitle>
            </div>
            <CardDescription>
              Automated herd/flock movement records, medicine book compliance, withdrawal period countdowns, grazing rotation schedules, and ration balancing.
            </CardDescription>
          </Card>

          {/* 3. Financials & Cash Flow */}
          <Card variant="linen" hoverEffect>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2.5 rounded-lg bg-forest-100 text-forest-900 border border-forest-200">
                <TrendingUp className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Financials &amp; Cash Flow</CardTitle>
            </div>
            <CardDescription>
              Enterprise-level profit forecasting, live fuel/fertiliser price tracking, grain contract hedges, and invoice receipt matching for your bookkeeper.
            </CardDescription>
          </Card>

          {/* 4. Grants & Subsidies (SFI Highlight) */}
          <Card variant="gold-tint" hoverEffect className="border-2 border-gold-400">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-gold-200 text-gold-900 border border-gold-400">
                  <Landmark className="w-5 h-5" />
                </div>
                <CardTitle className="text-lg text-forest-950">Grants &amp; SFI Subsidies</CardTitle>
              </div>
              <Badge variant="gold" size="sm">Key Focus</Badge>
            </div>
            <CardDescription className="text-charcoal-800">
              Live Defra &amp; SFI rules engine. Automatically scans your RPA field parcels, flags stackable actions, calculates annual payouts, and generates audit evidence.
            </CardDescription>
          </Card>

          {/* 5. Compliance & Red Tractor */}
          <Card variant="linen" hoverEffect>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2.5 rounded-lg bg-forest-100 text-forest-900 border border-forest-200">
                <FileText className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Compliance &amp; Inspections</CardTitle>
            </div>
            <CardDescription>
              One-click audit packs for Red Tractor, NVZ risk maps, soil management plans, waste exemptions, and EA inspections with zero midnight panics.
            </CardDescription>
          </Card>

          {/* 6. Machinery & Fleet */}
          <Card variant="linen" hoverEffect>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2.5 rounded-lg bg-forest-100 text-forest-900 border border-forest-200">
                <Wrench className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Machinery &amp; Fleet</CardTitle>
            </div>
            <CardDescription>
              Service intervals, MOT/LOLER certification logs, telematics integration, diesel consumption tracking, and dealer parts availability.
            </CardDescription>
          </Card>

          {/* 7. Labour & Contractors */}
          <Card variant="linen" hoverEffect>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2.5 rounded-lg bg-forest-100 text-forest-900 border border-forest-200">
                <Users className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Labour &amp; Contractors</CardTitle>
            </div>
            <CardDescription>
              Silage contractor booking schedules, casual harvest worker hours, timesheets, and HSE farm safety briefing confirmations.
            </CardDescription>
          </Card>

          {/* 8. Market Prices */}
          <Card variant="linen" hoverEffect>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2.5 rounded-lg bg-forest-100 text-forest-900 border border-forest-200">
                <Landmark className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Market Prices &amp; Trading</CardTitle>
            </div>
            <CardDescription>
              UK feed wheat futures (LIFFE), live deadweight beef/lamb averages, milk contract penalties, and regional hay/straw benchmarks.
            </CardDescription>
          </Card>

          {/* 9. Sustainability & Carbon */}
          <Card variant="linen" hoverEffect>
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2.5 rounded-lg bg-forest-100 text-forest-900 border border-forest-200">
                <Leaf className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Sustainability &amp; Carbon</CardTitle>
            </div>
            <CardDescription>
              Defra-compliant carbon footprint auditing, hedgerow biomass calculations, woodland grant applications, and biodiversity net gain tracking.
            </CardDescription>
          </Card>

          {/* 10. Farmer Wellbeing */}
          <Card variant="terracotta-tint" hoverEffect className="md:col-span-2 lg:col-span-3 border border-terracotta-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-terracotta-200 text-terracotta-900 border border-terracotta-300">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg text-charcoal-900">Farmer Wellbeing &amp; Lone Worker Safety</CardTitle>
                  <p className="text-xs text-charcoal-600 mt-0.5">
                    Farming can be isolating. Steward includes lone worker check-ins and confidential links to RABI &amp; FCN rural support networks.
                  </p>
                </div>
              </div>
              <Badge variant="terracotta" size="sm">Always Included</Badge>
            </div>
          </Card>

        </div>
      </Section>

      {/* 
        ========================================================================
        6. UK SUBSIDY CALLOUT (SFI / DEFRA)
        ========================================================================
      */}
      <section className="py-20 md:py-28 bg-forest-900 text-parchment-100 border-y border-forest-800 relative overflow-hidden">
        {/* Subtle decorative background watermarks */}
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-12 translate-y-12">
          <Landmark className="w-96 h-96 text-parchment-100" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2">
                <Badge variant="gold">UK Agricultural Transition Specialism</Badge>
                <span className="text-xs text-parchment-300 font-medium">Defra / RPA Compliant</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-parchment-50 leading-tight">
                UK farming policy changes every year.{" "}
                <span className="text-gold-400 font-normal italic">
                  Steward guarantees you never miss a pound.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-parchment-200 leading-relaxed">
                Navigating the Sustainable Farming Incentive (SFI), Countryside Stewardship (CS), and Landscape Recovery shouldn&apos;t require hiring a full-time consultant. Steward continuously monitors Defra updates against your specific RPA parcel maps.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-parchment-200">
                    <strong className="text-parchment-50">Stackability Engine:</strong> Prevents dual-funding clawbacks while maximising payment per hectare across SAM3, NUM1, IPM1, and AHL2.
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-parchment-200">
                    <strong className="text-parchment-50">Automated Audit Evidence:</strong> Timestamped geotagged field photos, seed invoices, and grazing records compiled directly into RPA-ready PDFs.
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-parchment-200">
                    <strong className="text-parchment-50">Application Window Alerts:</strong> Proactive alerts 60 days before new capital grants, slurry infrastructure, and equipment schemes open.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Button href="/signup" variant="gold" size="lg">
                  Run Free SFI Eligibility Scan
                </Button>
                <Button href="/features#sfi" variant="outline" size="lg" className="border-parchment-300 text-parchment-100 hover:bg-forest-800">
                  Read SFI Guide
                </Button>
              </div>
            </div>

            {/* SFI Live Card Mockup */}
            <div className="lg:col-span-5">
              <div className="bg-forest-950/80 border border-forest-700 rounded-2xl p-6 shadow-warm-xl space-y-5 text-parchment-100">
                <div className="flex items-center justify-between border-b border-forest-800 pb-4">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-parchment-50">
                      Estimated SFI Annual Payout
                    </h3>
                    <p className="text-xs text-parchment-400">Based on 340 ha Mixed Farm (Yorkshire)</p>
                  </div>
                  <span className="text-2xl font-serif font-bold text-gold-400">
                    £28,450<span className="text-xs font-sans text-parchment-300">/yr</span>
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded bg-forest-900/60 border border-forest-800">
                    <span className="font-medium">SAM3 Herbal Leys (45 ha)</span>
                    <span className="font-mono text-gold-300">£17,190</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded bg-forest-900/60 border border-forest-800">
                    <span className="font-medium">IPM1 Integrated Pest Plan</span>
                    <span className="font-mono text-gold-300">£989</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded bg-forest-900/60 border border-forest-800">
                    <span className="font-medium">HRW1 Hedgerow Assessment (12 km)</span>
                    <span className="font-mono text-gold-300">£3,240</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded bg-forest-900/60 border border-forest-800">
                    <span className="font-medium">SOH1 Soil Management Plan</span>
                    <span className="font-mono text-gold-300">£5,800</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-parchment-400 flex items-center justify-between">
                  <span>✓ 100% compliant with existing CS</span>
                  <span className="text-gold-400 font-semibold">Ready to submit</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        7. PRICING TEASER
        ========================================================================
      */}
      <Section
        variant="parchment"
        badge={<Badge variant="forest">Simple, Fair Subscription</Badge>}
        title="One subscription per farm. Add only what you need."
        subtitle="No per-acre penalty pricing or hidden advisory fees. Clear monthly plans with 30-day trials."
        alignHeader="center"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Card variant="linen" className="text-center flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-lg font-semibold text-forest-900 mb-1">Starter Farm</h3>
              <p className="text-xs text-charcoal-500 mb-4">Smallholdings &amp; Under 150 Acres</p>
              <div className="mb-4">
                <span className="text-3xl font-serif font-bold text-forest-900">£49</span>
                <span className="text-xs text-charcoal-500"> / month</span>
              </div>
              <ul className="text-xs text-charcoal-600 space-y-2 text-left mb-6">
                <li className="flex items-center">&bull; 1 Farm Advisor Persona</li>
                <li className="flex items-center">&bull; SFI &amp; Grant Tracker</li>
                <li className="flex items-center">&bull; Weather &amp; Spray Windows</li>
                <li className="flex items-center">&bull; Standard Email Support</li>
              </ul>
            </div>
            <Button href="/signup" variant="outline" size="sm" className="w-full">
              Start Free Trial
            </Button>
          </Card>

          <Card variant="linen" className="text-center relative border-2 border-forest-700 shadow-warm-lg flex flex-col justify-between">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-forest-800 text-parchment-50 text-[10px] uppercase font-bold tracking-widest px-3 py-0.5 rounded-full border border-forest-900">
              Most Popular
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-forest-900 mb-1">Commercial Farm</h3>
              <p className="text-xs text-charcoal-500 mb-4">150 to 1,500 Acres (Arable/Livestock/Mixed)</p>
              <div className="mb-4">
                <span className="text-3xl font-serif font-bold text-forest-900">£129</span>
                <span className="text-xs text-charcoal-500"> / month</span>
              </div>
              <ul className="text-xs text-charcoal-600 space-y-2 text-left mb-6">
                <li className="flex items-center font-medium text-forest-900">&bull; All 4 Specialist Advisors</li>
                <li className="flex items-center font-medium text-forest-900">&bull; Full SFI Stack &amp; RPA Sync</li>
                <li className="flex items-center">&bull; Red Tractor Audit Prep</li>
                <li className="flex items-center">&bull; Priority Human Expert Triage</li>
              </ul>
            </div>
            <Button href="/signup" variant="primary" size="sm" className="w-full">
              Start 30-Day Trial
            </Button>
          </Card>

          <Card variant="linen" className="text-center flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-lg font-semibold text-forest-900 mb-1">Estate &amp; Group</h3>
              <p className="text-xs text-charcoal-500 mb-4">1,500+ Acres or Multi-Holding Estates</p>
              <div className="mb-4">
                <span className="text-3xl font-serif font-bold text-forest-900">£249</span>
                <span className="text-xs text-charcoal-500"> / month</span>
              </div>
              <ul className="text-xs text-charcoal-600 space-y-2 text-left mb-6">
                <li className="flex items-center">&bull; Multi-Holding Aggregation</li>
                <li className="flex items-center">&bull; Dedicated Agronomist Link</li>
                <li className="flex items-center">&bull; Direct Telematics &amp; ERP Sync</li>
                <li className="flex items-center">&bull; On-Farm Onboarding Call</li>
              </ul>
            </div>
            <Button href="/signup" variant="outline" size="sm" className="w-full">
              Contact Sales
            </Button>
          </Card>

        </div>

        <div className="mt-10 text-center">
          <Link href="/pricing" className="text-sm font-semibold text-terracotta-700 hover:text-terracotta-800 underline underline-offset-4">
            See full pricing breakdown, add-ons, and payment options &rarr;
          </Link>
        </div>
      </Section>

      {/* 
        ========================================================================
        8. TESTIMONIAL / TRUST SECTION
        ========================================================================
      */}
      <Section
        variant="white"
        badge={<Badge variant="terracotta">Trusted Across the UK</Badge>}
        title="Grounded in the realities of British fields and barns."
        subtitle="What early pilot farmers say about pairing traditional husbandry with proactive intelligence."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Testimonial 1 */}
          <Card variant="linen" className="flex flex-col justify-between relative">
            <div className="space-y-4">
              <div className="flex text-gold-500 space-x-1 text-sm">
                {"★".repeat(5)}
              </div>
              <p className="text-sm text-charcoal-700 italic leading-relaxed">
                &quot;The SFI paperwork was giving me sleepless nights. Tom Campbell ran our parcel numbers through the stackability checker and identified £14,200 in annual herbal ley and IPM payments we had missed.&quot;
              </p>
            </div>
            <div className="pt-6 border-t border-parchment-200 mt-6 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-forest-800 text-parchment-50 flex items-center justify-center font-serif text-sm font-semibold">
                RH
              </div>
              <div>
                <p className="text-sm font-serif font-bold text-forest-900">Richard Hartley</p>
                <p className="text-xs text-charcoal-500">620 ha Arable &bull; Lincolnshire</p>
              </div>
            </div>
            {/* Note placeholder marker */}
            <span className="sr-only">Placeholder testimonial to be verified</span>
          </Card>

          {/* Testimonial 2 */}
          <Card variant="linen" className="flex flex-col justify-between relative">
            <div className="space-y-4">
              <div className="flex text-gold-500 space-x-1 text-sm">
                {"★".repeat(5)}
              </div>
              <p className="text-sm text-charcoal-700 italic leading-relaxed">
                &quot;When we had a strange respiratory flare in the winter store lambs, Fiona flagged early withdrawal period conflicts before we treated, and put us straight through to our vet. That saved us thousands.&quot;
              </p>
            </div>
            <div className="pt-6 border-t border-parchment-200 mt-6 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-forest-800 text-parchment-50 flex items-center justify-center font-serif text-sm font-semibold">
                GD
              </div>
              <div>
                <p className="text-sm font-serif font-bold text-forest-900">Gareth Davies</p>
                <p className="text-xs text-charcoal-500">850 Ewes &bull; Powys, Wales</p>
              </div>
            </div>
            <span className="sr-only">Placeholder testimonial to be verified</span>
          </Card>

          {/* Testimonial 3 */}
          <Card variant="linen" className="flex flex-col justify-between relative">
            <div className="space-y-4">
              <div className="flex text-gold-500 space-x-1 text-sm">
                {"★".repeat(5)}
              </div>
              <p className="text-sm text-charcoal-700 italic leading-relaxed">
                &quot;Most software wants me to sit at a computer entering data for two hours. Steward sends me two quick text queries in the morning, tracks our milk margins, and handles Red Tractor compliance silently.&quot;
              </p>
            </div>
            <div className="pt-6 border-t border-parchment-200 mt-6 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-forest-800 text-parchment-50 flex items-center justify-center font-serif text-sm font-semibold">
                EB
              </div>
              <div>
                <p className="text-sm font-serif font-bold text-forest-900">Emma Butterworth</p>
                <p className="text-xs text-charcoal-500">220 Holstein Herd &bull; Cheshire</p>
              </div>
            </div>
            <span className="sr-only">Placeholder testimonial to be verified</span>
          </Card>

        </div>
      </Section>

      {/* 
        ========================================================================
        9. FINAL CTA SECTION
        ========================================================================
      */}
      <section className="py-20 md:py-28 bg-[#FAF5EC] border-t border-parchment-300 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <Badge variant="forest" size="md">
            Start Your 30-Day Free Trial
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-forest-900 leading-tight">
            Put a tireless, qualified advisory team in your pocket today.
          </h2>

          <p className="text-base sm:text-lg text-charcoal-700 max-w-2xl mx-auto leading-relaxed">
            Set up your farm profile in under five minutes. Connect your RPA parcels, review your SFI eligibility forecast, and experience proactive advice tailored to your land.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button href="/signup" variant="primary" size="lg" className="w-full sm:w-auto">
              Get Started for Free
            </Button>
            <Button href="/advisors" variant="secondary" size="lg" className="w-full sm:w-auto">
              Meet Your Advisor First
            </Button>
          </div>

          <p className="text-xs text-charcoal-500 pt-2">
            No payment details required &bull; Cancel anytime &bull; 100% UK farm data residency
          </p>

        </div>
      </section>
    </div>
  );
}
