import React from "react";
import Link from "next/link";
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Wheat,
  Footprints,
  Trees,
  Milk,
  TrendingUp,
  Wrench,
  Users,
  Layers,
  PhoneCall,
  Lock,
  CloudSun,
  Radio,
  Landmark,
  ChevronRight,
  Shield,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { AdvisorPortrait } from "@/components/ui/AdvisorPortrait";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-white text-slate-900">
      {/*
        ========================================================================
        1. HERO SECTION — Clean Modern Corporate
        ========================================================================
      */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-900">

        {/* Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2560&q=85"
          alt="British farmland at sunrise"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-40 scale-100"
          fetchPriority="high"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/80 pointer-events-none" />

        {/* Hero content container — matches navbar max-w-7xl + padding for logo alignment */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 sm:pt-40 sm:pb-28 text-left space-y-8">

          {/* Clean Corporate Pill */}
          <div className="inline-flex items-center">
            <span className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>British Agricultural Advisory &bull; Defra SFI 2026 Ready</span>
            </span>
          </div>

          {/* Authoritative Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extralight text-white leading-[1.08] tracking-tight max-w-3xl">
            Agricultural Intelligence for British Farming Enterprises.
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl font-normal">
            Personalised to your holding, acreage, and RPA field boundaries. Real-time Met Office spray radar, SFI subsidy optimization, and automated compliance — supported by accredited UK agronomists and vets.
          </p>

          {/* CTA Cluster — left-aligned, smaller */}
          <div className="pt-2 flex flex-col sm:flex-row items-start gap-3">
            <Button href="/signup" variant="white" size="md" className="font-semibold">
              <span>Start 30-Day Free Trial</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              href="/how-it-works"
              variant="outline"
              size="md"
              className="text-white border-white/30 hover:bg-white/10 hover:border-white"
            >
              How It Works
            </Button>
          </div>

          {/* 3 Core Trust Pillars */}
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl text-left">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-sm space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Met Office Spot Radar</span>
                <Radio className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-base font-semibold text-white">
                1.1km Resolution
              </div>
              <span className="text-xs text-emerald-400 block font-medium">Real-time spray window tracking</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-sm space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Defra SFI 2026 Engine</span>
                <Landmark className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-base font-semibold text-white">
                Full Parcel Stacking
              </div>
              <span className="text-xs text-amber-300 block font-medium">Zero double-funding risk</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-sm space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Accredited Specialists</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-base font-semibold text-white">
                BASIS &bull; RCVS &bull; ICAEW
              </div>
              <span className="text-xs text-slate-300 block font-medium">1-tap professional callback</span>
            </div>
          </div>

        </div>
      </section>

      {/*
        ========================================================================
        2. SPECIALIST ADVISORY TEAM
        ========================================================================
      */}
      <Section
        variant="parchment"
        badge={<Badge variant="forest">Specialist Farm Advisory</Badge>}
        title="Dedicated Advisors Calibrated to Your Farming System."
        subtitle="An upland sheep holding in Cumbria demands fundamentally different agronomic expertise to an arable enterprise in East Anglia. Steward matches your holding with a dedicated specialist advisor."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Arable: Tom Campbell */}
          <Card className="flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex justify-center pt-2">
                <AdvisorPortrait type="arable" name="Tom Campbell" size="md" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-serif text-xl font-medium text-slate-900">Tom Campbell</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-forest-700">Arable &amp; Agronomy</p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed text-center">
                Optimises combinable rotations, fungicide timing, nitrogen budgets, and SFI SAM3 herbal ley compliance.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500">BASIS / FACTS</span>
              <Link href="/advisors#arable" className="font-semibold text-forest-800 hover:text-forest-950 flex items-center">
                View Bio &rarr;
              </Link>
            </div>
          </Card>

          {/* Livestock: Fiona MacLeod */}
          <Card className="flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex justify-center pt-2">
                <AdvisorPortrait type="livestock" name="Fiona MacLeod" size="md" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-serif text-xl font-medium text-slate-900">Fiona MacLeod</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-forest-700">Livestock &amp; Herds</p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed text-center">
                Tracks statutory medicine books, withdrawal countdowns, rotational grazing, and deadweight market benchmarks.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500">RCVS Partner</span>
              <Link href="/advisors#livestock" className="font-semibold text-forest-800 hover:text-forest-950 flex items-center">
                View Bio &rarr;
              </Link>
            </div>
          </Card>

          {/* Mixed: Alistair Reid */}
          <Card className="flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex justify-center pt-2">
                <AdvisorPortrait type="mixed" name="Alistair Reid" size="md" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-serif text-xl font-medium text-slate-900">Alistair Reid</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-forest-700">Mixed Enterprise</p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed text-center">
                Integrates combinable cropping with livestock foraging, manure nutrient cycling, and whole-farm SFI schemes.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500">Whole-Farm SFI</span>
              <Link href="/advisors#mixed" className="font-semibold text-forest-800 hover:text-forest-950 flex items-center">
                View Bio &rarr;
              </Link>
            </div>
          </Card>

          {/* Dairy: Eleanor Wright */}
          <Card className="flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex justify-center pt-2">
                <AdvisorPortrait type="dairy" name="Eleanor Wright" size="md" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-serif text-xl font-medium text-slate-900">Eleanor Wright</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-forest-700">Dairy Systems</p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed text-center">
                Monitors somatic cell counts, silage D-value ration balancing, milk solids incentives, and multi-species grazing swards.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500">Bovine Nutrition</span>
              <Link href="/advisors#dairy" className="font-semibold text-forest-800 hover:text-forest-950 flex items-center">
                View Bio &rarr;
              </Link>
            </div>
          </Card>

        </div>
      </Section>

      {/*
        ========================================================================
        3. TRAFFIC LIGHT AUTONOMY FRAMEWORK
        ========================================================================
      */}
      <Section
        variant="white"
        badge={<Badge variant="forest">Autonomy Guardrails</Badge>}
        title="Proactive Advisory with Uncompromising Farmer Control."
        subtitle="Steward eliminates tedious administrative legwork while enforcing strict boundaries: low-risk monitoring runs automatically, while financial commitments and statutory submissions always require your explicit approval."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Green Tier */}
          <div className="p-6 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="forest" size="sm">Green Tier</Badge>
              <span className="text-xs text-emerald-800 font-medium">Fully Automated</span>
            </div>
            <h3 className="font-serif text-xl font-medium text-slate-900">
              Routine Background Sync
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Continuous weather radar ingestion, satellite NDVI biomass tracking, daily market price monitoring, and machinery service countdowns.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-emerald-200/80">
              <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0" /> Hourly Met Office 1.1km radar</li>
              <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0" /> Medicine withdrawal countdowns</li>
              <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0" /> NVZ closed period tracking</li>
            </ul>
          </div>

          {/* Amber Tier */}
          <div className="p-6 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="gold" size="sm">Amber Tier</Badge>
              <span className="text-xs text-amber-800 font-medium">Drafted for Approval</span>
            </div>
            <h3 className="font-serif text-xl font-medium text-slate-900">
              Steward Prepares, You Sign Off
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              SFI grant drafts, spray recommendation sheets, contractor schedules, and field records are pre-compiled in full, awaiting your 1-tap review.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-amber-200/80">
              <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mr-2 flex-shrink-0" /> SFI grant application dossiers</li>
              <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mr-2 flex-shrink-0" /> Chemical spray recommendations</li>
              <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mr-2 flex-shrink-0" /> Contractor appointment briefings</li>
            </ul>
          </div>

          {/* Red Tier */}
          <div className="p-6 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="terracotta" size="sm">Red Tier</Badge>
              <span className="text-xs text-rose-800 font-medium">Strictly Farmer Controlled</span>
            </div>
            <h3 className="font-serif text-xl font-medium text-slate-900">
              Human-in-the-Loop Only
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Legal filings to Defra/RPA, chemical purchase orders, grain sales agreements, and veterinary diagnoses are never executed autonomously.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2 border-t border-rose-200/80">
              <li className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 text-rose-700 mr-2 flex-shrink-0" /> Formal RPA / Defra submissions</li>
              <li className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 text-rose-700 mr-2 flex-shrink-0" /> Financial and contractual commitments</li>
              <li className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 text-rose-700 mr-2 flex-shrink-0" /> Direct RCVS veterinary escalation</li>
            </ul>
          </div>

        </div>
      </Section>

      {/*
        ========================================================================
        4. PLATFORM CAPABILITIES MATRIX
        ========================================================================
      */}
      <Section
        variant="parchment"
        badge={<Badge variant="forest">Platform Capabilities</Badge>}
        title="Everything Your Farm Holding Requires in One Place."
        subtitle="Designed to replace fragmented apps, lost paper records, and separate telematic dashboards with unified intelligence."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <CloudSun className="w-5 h-5" />
            </div>
            <CardTitle className="text-lg">Met Office Spot Radar &amp; Spray Windows</CardTitle>
            <CardDescription className="text-xs leading-relaxed">
              High-resolution 1.1km spot forecasts evaluate wind shear, inversion layers, and humidity against the UK Code of Practice for Plant Protection.
            </CardDescription>
          </Card>

          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <Landmark className="w-5 h-5" />
            </div>
            <CardTitle className="text-lg">Defra SFI Subsidy Stacking Solver</CardTitle>
            <CardDescription className="text-xs leading-relaxed">
              Automated parcel matching across SAM3, NUM1, IPM1, and HRW1. Flags stackable revenue opportunities while eliminating double-funding clawback risks.
            </CardDescription>
          </Card>

          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <CardTitle className="text-lg">Sentinel-2 10m Multispectral NDVI</CardTitle>
            <CardDescription className="text-xs leading-relaxed">
              Regular satellite canopy density scans, chlorophyll reflectance indices, weed patch detection, and variable-rate nitrogen application mapping.
            </CardDescription>
          </Card>

          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Footprints className="w-5 h-5" />
            </div>
            <CardTitle className="text-lg">Livestock Medicine &amp; Statutory Registers</CardTitle>
            <CardDescription className="text-xs leading-relaxed">
              Automated herd movement registers, withdrawal period countdown clocks, and Red Tractor assurance record compilation.
            </CardDescription>
          </Card>

          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <CardTitle className="text-lg">Fleet Telematics &amp; Service Countdown</CardTitle>
            <CardDescription className="text-xs leading-relaxed">
              Tracks engine hours, service intervals, MOT/LOLER certificates, and sprayer testing records for John Deere, Claas, Case IH, and Fendt machinery.
            </CardDescription>
          </Card>

          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <CardTitle className="text-lg">Live UK Grain &amp; Mart Intelligence</CardTitle>
            <CardDescription className="text-xs leading-relaxed">
              UK feed wheat futures (LIFFE), deadweight beef and lamb regional averages, farmgate milk benchmarks, and fertilizer price tracking.
            </CardDescription>
          </Card>

        </div>
      </Section>

      {/*
        ========================================================================
        5. ACCREDITED HUMAN SPECIALIST NETWORK (HERITAGE FOREST ANCHOR)
        ========================================================================
      */}
      <section className="py-20 bg-forest-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-2xl bg-forest-950/60 border border-forest-700/80 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <Badge variant="gold">Accredited Professional Network</Badge>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white leading-tight">
                When Clinical or Legal Judgments Arise, Verified Human Specialists Take Over.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Steward knows its boundaries. When complex veterinary pathologies, statutory tax reviews, or tenancy reorganisations require accredited human oversight, Steward compiles your full field dossier and routes you to verified UK specialists.
              </p>
              <div className="flex flex-wrap gap-3 pt-2 text-xs text-slate-200">
                <span className="bg-forest-850 px-3 py-1.5 rounded-md border border-forest-700">
                  &bull; RCVS Accredited Farm Vets
                </span>
                <span className="bg-forest-850 px-3 py-1.5 rounded-md border border-forest-700">
                  &bull; BASIS &amp; FACTS Certified Agronomists
                </span>
                <span className="bg-forest-850 px-3 py-1.5 rounded-md border border-forest-700">
                  &bull; ICAEW Agricultural Accountants
                </span>
                <span className="bg-forest-850 px-3 py-1.5 rounded-md border border-forest-700">
                  &bull; CAAV Rural Surveyors
                </span>
              </div>
            </div>

            <Button href="/about#network" variant="gold" size="lg" className="whitespace-nowrap">
              Explore Specialist Network &rarr;
            </Button>
          </div>
        </div>
      </section>

      {/*
        ========================================================================
        6. FINAL CALL TO ACTION
        ========================================================================
      */}
      <section className="py-20 sm:py-28 bg-slate-50 text-center border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Badge variant="forest">30-Day Pilot</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-slate-900 tracking-tight">
            Put Steward to Work on Your Holding Today.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            Experience complete agricultural intelligence risk-free for 30 days. No long-term lock-in, zero hardware installation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button href="/signup" variant="primary" size="lg">
              Start 30-Day Free Trial
            </Button>
            <Button href="/pricing" variant="secondary" size="lg">
              View Plans &amp; Modules
            </Button>
          </div>

          <div className="pt-6 flex flex-wrap justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5" />
              Zero Lock-in Contract
            </span>
            <span className="flex items-center">
              <Lock className="w-4 h-4 text-emerald-600 mr-1.5" />
              100% Farmer-Owned Data
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" />
              Instant RPA Parcel Import
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
