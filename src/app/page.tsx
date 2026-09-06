import React from "react";
import Link from "next/link";
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
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
  Clock,
  Landmark,
  CloudSun,
  Radio,
  Cpu,
  Activity,
  ChevronRight,
  Shield,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { AdvisorPortrait } from "@/components/ui/AdvisorPortrait";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-obsidian-950 text-parchment-100">
      {/*
        ========================================================================
        1. HERO SECTION — High-Octane Ag Precision & Fiduciary Heritage
        ========================================================================
        Visual: Golden-hour rolling English wheat fields with cinematic dark 
        obsidian vignette, John Deere telemetry HUD, and Coutts Bank typography.
        ========================================================================
      */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-obsidian-950">

        {/* Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2560&q=85"
          alt="Rolling British farmland at golden hour"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-45 scale-105 transition-transform duration-1000"
          fetchPriority="high"
        />

        {/* Multi-layered cinematic gradient chassis */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950/80 via-obsidian-950/60 to-obsidian-950 pointer-events-none" />
        <div className="absolute inset-0 bg-tactical-grid opacity-30 pointer-events-none" />

        {/* Hero content container */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 sm:pt-44 sm:pb-32 text-center space-y-8">

          {/* Precision Monospace Status Pill */}
          <div className="inline-flex items-center justify-center">
            <div className="inline-flex items-center space-x-2.5 bg-obsidian-900/90 backdrop-blur-md border border-volt/40 text-parchment-50 text-xs font-mono px-4 py-2 rounded-tech shadow-hud">
              <span className="w-2 h-2 rounded-full bg-volt animate-volt-pulse" />
              <span className="text-volt font-bold tracking-wider">[SYS: OPERATIONAL]</span>
              <span className="text-white/20">&bull;</span>
              <span className="text-parchment-200 tracking-wide font-sans">Autonomous UK Agricultural Advisory</span>
            </div>
          </div>

          {/* Authoritative Coutts Serif Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white leading-[1.05] tracking-tight max-w-5xl mx-auto">
            The Autonomous Agronomy OS for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-coutts via-gold-300 to-gold-brass">
              British Agriculture.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-parchment-300/90 leading-relaxed max-w-3xl mx-auto font-sans">
            Personalised to your exact holding, acreage, and RPA field boundaries. From real-time Met Office spray drift telemetry and SFI subsidy stacking to automated Red Tractor audit compliance — backed by accredited human agronomists and vets.
          </p>

          {/* High-Voltage CTA Cluster */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Button href="/signup" variant="volt" size="xl" className="w-full sm:w-auto shadow-hud group">
              <span>Initiate 30-Day Holding Trial</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              href="/how-it-works"
              variant="secondary"
              size="xl"
              className="w-full sm:w-auto"
            >
              Explore Architecture
            </Button>
          </div>

          {/* John Deere Style Live Telemetry HUD Bar */}
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left font-mono">
            
            <div className="p-4 rounded-panel bg-obsidian-900/80 border border-white/10 backdrop-blur-md space-y-1">
              <div className="flex items-center justify-between text-[11px] text-parchment-400">
                <span>MET OFFICE SPOT RADAR</span>
                <Radio className="w-3.5 h-3.5 text-volt" />
              </div>
              <div className="text-base font-bold text-white flex items-center space-x-1.5">
                <span className="text-volt font-mono">1.1km</span>
                <span className="text-xs text-parchment-300 font-sans">Micro-Window Sync</span>
              </div>
              <span className="text-[10px] text-volt block">OPTIMAL SPRAY WINDOW ACTIVE</span>
            </div>

            <div className="p-4 rounded-panel bg-obsidian-900/80 border border-white/10 backdrop-blur-md space-y-1">
              <div className="flex items-center justify-between text-[11px] text-parchment-400">
                <span>DEFRA SFI 2026.1 ENGINE</span>
                <Landmark className="w-3.5 h-3.5 text-gold-coutts" />
              </div>
              <div className="text-base font-bold text-white flex items-center space-x-1.5">
                <span className="text-gold-coutts font-mono">100%</span>
                <span className="text-xs text-parchment-300 font-sans">Stackability Checked</span>
              </div>
              <span className="text-[10px] text-gold-300 block">ZERO CLAWBACK GUARANTEE</span>
            </div>

            <div className="p-4 rounded-panel bg-obsidian-900/80 border border-white/10 backdrop-blur-md space-y-1">
              <div className="flex items-center justify-between text-[11px] text-parchment-400">
                <span>HUMAN SPECIALIST ROUTING</span>
                <ShieldCheck className="w-3.5 h-3.5 text-volt" />
              </div>
              <div className="text-base font-bold text-white flex items-center space-x-1.5">
                <span className="text-volt font-mono">RCVS &bull; BASIS</span>
                <span className="text-xs text-parchment-300 font-sans">Accredited</span>
              </div>
              <span className="text-[10px] text-parchment-300 block">1-TAP EXPERT ESCALATION</span>
            </div>

          </div>

        </div>

        {/* Scroll Cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-50">
          <ChevronRight className="w-6 h-6 text-volt rotate-90" />
        </div>

      </section>

      {/*
        ========================================================================
        2. SPECIALIST ADVISORY ROSTER (MEET THE EXPERTS)
        ========================================================================
        Visual: Coutts executive dossiers with precision metallic frames.
        ========================================================================
      */}
      <Section
        variant="grid"
        badge={<Badge variant="gold" pulse>Executive Advisory Dossiers</Badge>}
        title="Dedicated Intelligence. Calibrated to Your Exact Farm Type."
        subtitle="An upland beef suckler holding in Northumberland demands fundamentally different models to a precision arable enterprise in Lincolnshire. Steward pairs your holding with a dedicated specialist."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Arable: Tom Campbell */}
          <Card variant="hud-gold" hoverEffect cornerTicks className="flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-[10px] text-gold-coutts border-b border-white/10 pb-2">
                <span>[AG-01 // ARABLE]</span>
                <span className="bg-gold-coutts/20 px-1.5 py-0.5 rounded-tech">BASIS / FACTS</span>
              </div>
              
              <div className="flex justify-center pt-2">
                <AdvisorPortrait type="arable" name="Tom Campbell" size="md" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-serif text-xl font-bold text-white">Tom Campbell</h3>
                <p className="text-xs font-mono text-gold-300">Cereals, Oilseeds &amp; SFI Actions</p>
              </div>

              <p className="text-xs text-parchment-300 leading-relaxed text-center font-sans">
                Optimises multi-year combinable rotations, fungicide threshold timing, variable-rate nitrogen, and SFI SAM3 herbal ley compliance.
              </p>
            </div>

            <Link
              href="/advisors#arable"
              className="mt-6 pt-3 block text-center text-xs font-mono uppercase tracking-wider text-gold-300 hover:text-white border-t border-white/10 transition-colors"
            >
              Examine Profile &rarr;
            </Link>
          </Card>

          {/* Livestock: Fiona MacLeod */}
          <Card variant="hud-volt" hoverEffect cornerTicks className="flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-[10px] text-volt border-b border-white/10 pb-2">
                <span>[LS-02 // LIVESTOCK]</span>
                <span className="bg-volt/20 px-1.5 py-0.5 rounded-tech">RCVS PARTNER</span>
              </div>
              
              <div className="flex justify-center pt-2">
                <AdvisorPortrait type="livestock" name="Fiona MacLeod" size="md" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-serif text-xl font-bold text-white">Fiona MacLeod</h3>
                <p className="text-xs font-mono text-volt">Beef Herds &amp; Upland Flocks</p>
              </div>

              <p className="text-xs text-parchment-300 leading-relaxed text-center font-sans">
                Tracks statutory medicine books, withdrawal countdowns, pasture plate-meter budgeting, BCMS movements, and livestock mart benchmarks.
              </p>
            </div>

            <Link
              href="/advisors#livestock"
              className="mt-6 pt-3 block text-center text-xs font-mono uppercase tracking-wider text-volt hover:text-white border-t border-white/10 transition-colors"
            >
              Examine Profile &rarr;
            </Link>
          </Card>

          {/* Mixed: Alistair Reid */}
          <Card variant="hud" hoverEffect cornerTicks className="flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-[10px] text-terracotta-400 border-b border-white/10 pb-2">
                <span>[MX-03 // MIXED]</span>
                <span className="bg-terracotta-900/60 px-1.5 py-0.5 rounded-tech">WHOLE-FARM</span>
              </div>
              
              <div className="flex justify-center pt-2">
                <AdvisorPortrait type="mixed" name="Alistair Reid" size="md" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-serif text-xl font-bold text-white">Alistair Reid</h3>
                <p className="text-xs font-mono text-terracotta-300">Integrated Farm Systems</p>
              </div>

              <p className="text-xs text-parchment-300 leading-relaxed text-center font-sans">
                Balances combinable break crops with home-grown forage, organic FYM nutrient recycling, and whole-farm Countryside Stewardship integration.
              </p>
            </div>

            <Link
              href="/advisors#mixed"
              className="mt-6 pt-3 block text-center text-xs font-mono uppercase tracking-wider text-terracotta-300 hover:text-white border-t border-white/10 transition-colors"
            >
              Examine Profile &rarr;
            </Link>
          </Card>

          {/* Dairy: Eleanor Wright */}
          <Card variant="hud" hoverEffect cornerTicks className="flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-[10px] text-sky-400 border-b border-white/10 pb-2">
                <span>[DY-04 // DAIRY]</span>
                <span className="bg-sky-950 px-1.5 py-0.5 rounded-tech">BOVINE NUTRITION</span>
              </div>
              
              <div className="flex justify-center pt-2">
                <AdvisorPortrait type="dairy" name="Eleanor Wright" size="md" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-serif text-xl font-bold text-white">Eleanor Wright</h3>
                <p className="text-xs font-mono text-sky-300">Dairy Systems &amp; Yield</p>
              </div>

              <p className="text-xs text-parchment-300 leading-relaxed text-center font-sans">
                Monitors somatic cell count curves, silage D-value ration balances, milk contract bonus benchmarks, and multi-species grazing swards.
              </p>
            </div>

            <Link
              href="/advisors#dairy"
              className="mt-6 pt-3 block text-center text-xs font-mono uppercase tracking-wider text-sky-300 hover:text-white border-t border-white/10 transition-colors"
            >
              Examine Profile &rarr;
            </Link>
          </Card>

        </div>
      </Section>

      {/*
        ========================================================================
        3. JOHN DEERE STYLE COMMAND CENTER & AUTONOMY TIERS
        ========================================================================
      */}
      <Section
        variant="forest"
        badge={<Badge variant="volt" pulse>Operational Guardrails</Badge>}
        title="Autonomous Action. With Uncompromising Farmer Control."
        subtitle="Steward acts without prompting on routine background mechanics, but enforces an ironclad Traffic-Light Autonomy framework for any statutory declaration or financial decision."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Green Tier */}
          <Card variant="hud" cornerTicks className="space-y-4 border-l-4 border-l-emerald-500">
            <div className="flex items-center justify-between font-mono">
              <Badge variant="volt" size="sm">Green Tier</Badge>
              <span className="text-[10px] text-parchment-400">100% AUTOMATED</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-white">
              Autonomous Background Sync
            </h3>
            <p className="text-xs text-parchment-300 leading-relaxed">
              Continuous weather radar ingestion, satellite NDVI biomass tracking, daily price feed caching, and equipment service countdown tracking. Zero friction, fully transparent logs.
            </p>
            <div className="pt-2 font-mono text-[11px] text-volt bg-obsidian-950 p-3 rounded-tech border border-white/5">
              &gt; [AUTO_LOG: MET_OFFICE 1.1KM SPOT SYNCED]
            </div>
          </Card>

          {/* Amber Tier */}
          <Card variant="hud" cornerTicks className="space-y-4 border-l-4 border-l-gold-coutts">
            <div className="flex items-center justify-between font-mono">
              <Badge variant="gold" size="sm">Amber Tier</Badge>
              <span className="text-[10px] text-gold-300">1-TAP SIGN-OFF</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-white">
              AI Prepared &bull; Farmer Approved
            </h3>
            <p className="text-xs text-parchment-300 leading-relaxed">
              SFI grant application drafts, spray recommendation sheets, contractor schedules, and NVZ fertilizer records are prepared in full by Claude, requiring your explicit 1-tap approval before filing.
            </p>
            <div className="pt-2 font-mono text-[11px] text-gold-300 bg-obsidian-950 p-3 rounded-tech border border-white/5">
              &gt; [DRAFT: SAM3 AGREEMENT READY FOR REVIEW]
            </div>
          </Card>

          {/* Red Tier */}
          <Card variant="hud" cornerTicks className="space-y-4 border-l-4 border-l-terracotta-500">
            <div className="flex items-center justify-between font-mono">
              <Badge variant="terracotta" size="sm">Red Tier</Badge>
              <span className="text-[10px] text-terracotta-300">ADVISORY ONLY</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-white">
              Strict Human Boundaries
            </h3>
            <p className="text-xs text-parchment-300 leading-relaxed">
              Clinical livestock diagnoses, grain contract hedges, tax declarations, and legal agreements are strictly advisory. Steward proactively routes you to verified RCVS vets and BASIS agronomists.
            </p>
            <div className="pt-2 font-mono text-[11px] text-terracotta-300 bg-obsidian-950 p-3 rounded-tech border border-white/5">
              &gt; [ESCALATE: ROUTE TO RCVS ACCREDITED VET]
            </div>
          </Card>

        </div>
      </Section>

      {/*
        ========================================================================
        4. 10-PILLAR AGRONOMIC ENGINEERING MATRIX
        ========================================================================
      */}
      <Section
        variant="grid"
        badge={<Badge variant="volt">High-Density Ag-Tech</Badge>}
        title="Everything Your Holding Requires. Unified Into One Instrument."
        subtitle="Designed to replace the chaos of fragmented apps, lost paper records, and disparate telematics portals."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Card variant="hud" hoverEffect className="space-y-3">
            <div className="flex items-center space-x-3 text-volt">
              <CloudSun className="w-5 h-5" />
              <CardTitle className="text-lg text-white">Met Office Spot Radar &amp; Spray Windows</CardTitle>
            </div>
            <CardDescription className="text-parchment-300 text-xs leading-relaxed">
              Direct 1.1km high-resolution spot forecast ingestion. Evaluates wind shear, inversion layers, and humidity against the UK Plant Protection Code of Practice.
            </CardDescription>
          </Card>

          <Card variant="hud-gold" hoverEffect className="space-y-3">
            <div className="flex items-center space-x-3 text-gold-coutts">
              <Landmark className="w-5 h-5" />
              <CardTitle className="text-lg text-white">Defra SFI Subsidy Stacking Solver</CardTitle>
            </div>
            <CardDescription className="text-parchment-300 text-xs leading-relaxed">
              Automated parcel matching across SAM3, NUM1, IPM1, and HRW1. Flags stackable revenue opportunities while eliminating double-funding clawback risks.
            </CardDescription>
          </Card>

          <Card variant="hud" hoverEffect className="space-y-3">
            <div className="flex items-center space-x-3 text-volt">
              <Layers className="w-5 h-5" />
              <CardTitle className="text-lg text-white">Sentinel-2 10m Multispectral NDVI</CardTitle>
            </div>
            <CardDescription className="text-parchment-300 text-xs leading-relaxed">
              Weekly satellite canopy density scans, chlorophyll reflectance indices, weed patch detection, and variable-rate nitrogen application mapping.
            </CardDescription>
          </Card>

          <Card variant="hud" hoverEffect className="space-y-3">
            <div className="flex items-center space-x-3 text-volt">
              <Footprints className="w-5 h-5" />
              <CardTitle className="text-lg text-white">Livestock Medicine &amp; Statutory Books</CardTitle>
            </div>
            <CardDescription className="text-parchment-300 text-xs leading-relaxed">
              Automated herd movement registers, BCMS/ScotEID sync, withdrawal period countdown clocks, and Red Tractor assurance record compilation.
            </CardDescription>
          </Card>

          <Card variant="hud" hoverEffect className="space-y-3">
            <div className="flex items-center space-x-3 text-volt">
              <Wrench className="w-5 h-5" />
              <CardTitle className="text-lg text-white">Fleet Telematics &amp; Service Countdown</CardTitle>
            </div>
            <CardDescription className="text-parchment-300 text-xs leading-relaxed">
              Tracks engine hours, service intervals, MOT/LOLER certificates, and sprayer testing records for John Deere, Claas, Case IH, and Fendt machinery.
            </CardDescription>
          </Card>

          <Card variant="hud" hoverEffect className="space-y-3">
            <div className="flex items-center space-x-3 text-volt">
              <TrendingUp className="w-5 h-5" />
              <CardTitle className="text-lg text-white">Live UK Grain &amp; Mart Intelligence</CardTitle>
            </div>
            <CardDescription className="text-parchment-300 text-xs leading-relaxed">
              UK feed wheat futures (LIFFE), deadweight beef and lamb regional averages, farmgate milk benchmarks, and fertilizer price tracking.
            </CardDescription>
          </Card>

        </div>
      </Section>

      {/*
        ========================================================================
        5. HUMAN SPECIALIST NETWORK (COUTTS FIDUCIARY STANDARD)
        ========================================================================
      */}
      <section className="py-20 bg-obsidian-900 border-y border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-12 rounded-panel bg-obsidian-950 border border-gold-coutts/40 shadow-hud-gold flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <Badge variant="gold" pulse>Coutts-Grade Fiduciary Network</Badge>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                When Clinical or Legal Judgments Arise, Verified Human Specialists Take the Wheel.
              </h2>
              <p className="text-sm sm:text-base text-parchment-300 leading-relaxed font-sans">
                Steward is engineered to know its boundaries. When complex veterinary diagnoses, statutory tax audits, or specialist crop pathology require accredited human oversight, Steward compiles your full telemetry dossier and routes you to verified UK professionals.
              </p>
              <div className="flex flex-wrap gap-3 pt-2 text-xs font-mono">
                <span className="bg-obsidian-900 px-3 py-1.5 rounded-tech border border-white/10 text-parchment-200">
                  &bull; RCVS Accredited Farm Vets
                </span>
                <span className="bg-obsidian-900 px-3 py-1.5 rounded-tech border border-white/10 text-parchment-200">
                  &bull; BASIS &amp; FACTS Certified Agronomists
                </span>
                <span className="bg-obsidian-900 px-3 py-1.5 rounded-tech border border-white/10 text-parchment-200">
                  &bull; ICAEW Agricultural Accountants
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
        6. FINAL HIGH-VOLTAGE CALL TO ACTION
        ========================================================================
      */}
      <section className="py-24 sm:py-32 bg-obsidian-950 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-tactical-grid opacity-25 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <Badge variant="volt" pulse>Operational Readiness</Badge>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight">
            Equip Your Holding with Sovereign Agricultural Intelligence.
          </h2>

          <p className="text-base sm:text-lg text-parchment-300 max-w-2xl mx-auto font-sans leading-relaxed">
            Start your 30-day trial with full access to all 4 advisor specialisms, Met Office spot radar telemetry, and Defra SFI parcel matching.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button href="/signup" variant="volt" size="xl" className="shadow-hud w-full sm:w-auto">
              Initiate Free 30-Day Holding Trial &rarr;
            </Button>
            <Button href="/pricing" variant="outline" size="xl" className="w-full sm:w-auto">
              View Tier Pricing
            </Button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-8 text-xs font-mono text-parchment-400">
            <span className="flex items-center">
              <ShieldCheck className="w-4 h-4 text-volt mr-1.5" />
              Zero Lock-in Contract
            </span>
            <span className="flex items-center">
              <Lock className="w-4 h-4 text-volt mr-1.5" />
              100% Farmer-Owned Data
            </span>
            <span className="flex items-center">
              <Cpu className="w-4 h-4 text-volt mr-1.5" />
              Instant RPA Parcel Import
            </span>
          </div>

        </div>
      </section>

    </div>
  );
}
