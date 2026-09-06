import type { Metadata } from "next";
import Link from "next/link";
import {
  Sprout,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  CloudRain,
  TrendingUp,
  FileText,
  PhoneCall,
  ArrowRight,
  Users,
  Award,
  Lock,
  Calendar,
  AlertTriangle,
  Wheat,
  Activity,
  Compass,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "How It Works — Setup, Proactive Monitoring & Agentic Autonomy",
  description:
    "Learn how Steward connects your RPA field parcels, radar weather, and DEFRA rules into proactive daily briefings, protected by a strict Traffic-Light Autonomy framework and accredited UK human experts.",
  openGraph: {
    title: "How Steward Works — Proactive UK Agricultural Intelligence",
    description:
      "A transparent look at farm onboarding, proactive monitoring, our strict autonomy boundaries, and seamless human specialist triage.",
    url: "https://steward.co.uk/how-it-works",
  },
};

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col bg-white text-slate-900">
      {/* HEADER — Full Screen Hero with British Farm Operations Background */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-900">
        {/* Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=2560&q=85"
          alt="Tractor cultivating lush green British farmland in the morning light"
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
              <span>System Architecture &bull; Traffic-Light Autonomy</span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extralight text-white tracking-tight leading-[1.08] max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            How Steward Works Alongside Your Daily Routine.
          </h1>

          <p className="text-base sm:text-xl font-sans font-light text-slate-100 leading-relaxed max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            Grounded in traditional British agricultural husbandry, accelerated by machine-grade data integration, and governed by strict human control.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-start gap-3">
            <Button href="/signup" variant="white" size="md" className="font-semibold">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button href="/advisors" variant="outline" size="md" className="text-white border-white/30 hover:bg-white/10 hover:border-white">
              Meet Your Advisor
            </Button>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 1: SETUP
        ========================================================================
      */}
      <Section
        variant="white"
        badge={<Badge variant="forest">Phase 1: Setup</Badge>}
        title="1. Holding Setup: Operational in Under Five Minutes."
        subtitle="No 40-page spreadsheets. Enter your holding fundamentals, and Steward ingests your field boundaries and calibrates your enterprise profile automatically."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            <p>
              Legacy farm management systems demand weeks of manual data entry before generating their first insight. Steward connects directly with statutory data sources.
            </p>
            <p>
              By providing your Single Business Identifier (SBI) or postcode, Steward pulls your holding boundaries, soil classifications, and catchment NVZ regulations directly from the Rural Payments Agency registry.
            </p>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs sm:text-sm">
                  <strong className="text-slate-900 font-medium">Automatic RPA Parcel Boundary Import:</strong>
                  <p className="text-slate-600 mt-0.5">
                    Instantly overlays parcel IDs, hectarage, and slope topology without manual digitization.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs sm:text-sm">
                  <strong className="text-slate-900 font-medium">Context-Aware Progressive Learning:</strong>
                  <p className="text-slate-600 mt-0.5">
                    Rather than demand complete 5-year history on day one, Steward queries 1–2 key points as seasonal operational windows open.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs sm:text-sm">
                  <strong className="text-slate-900 font-medium">Dedicated Advisor Matching:</strong>
                  <p className="text-slate-600 mt-0.5">
                    Pairs your enterprise immediately with Tom (Arable), Fiona (Livestock), Alistair (Mixed), or Eleanor (Dairy).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="font-semibold text-sm text-slate-900">
                  Sample Holding Summary
                </span>
                <Badge variant="forest" size="sm">Setup: 5 Mins</Badge>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2.5 rounded bg-white border border-slate-200">
                  <span className="text-slate-500">Enterprise Class:</span>
                  <span className="text-slate-900 font-semibold">Mixed (Arable &amp; Sheep)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded bg-white border border-slate-200">
                  <span className="text-slate-500">Location:</span>
                  <span className="text-slate-900">North Yorkshire (Thirsk)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded bg-white border border-slate-200">
                  <span className="text-slate-500">Holding Size:</span>
                  <span className="text-slate-900">420.4 ha (18 RPA Parcels)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded bg-white border border-slate-200">
                  <span className="text-slate-500">Weather Station:</span>
                  <span className="text-emerald-700 font-medium">Met Office Leeming (1.1km Grid)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded bg-white border border-amber-200 bg-amber-50/40">
                  <span className="text-amber-900 font-medium">Assigned Advisor:</span>
                  <span className="text-amber-900 font-semibold">Alistair Reid (Mixed Specialist)</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-500 border-t border-slate-200 flex items-center justify-between">
                <span>RPA Ordnance Survey Synced</span>
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 
        ========================================================================
        SECTION 2: PROACTIVE MONITORING
        ========================================================================
      */}
      <Section
        variant="parchment"
        badge={<Badge variant="forest">Phase 2: Proactive Monitoring</Badge>}
        title="2. Continuous Weather &amp; Regulatory Surveillance"
        subtitle="You shouldn't have to check five separate apps before breakfast. Steward continuously correlates weather radars, regulatory calendars, and crop growth."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="space-y-2 hover:shadow-md transition-shadow">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 w-fit mb-2">
              <CloudRain className="w-5 h-5" />
            </div>
            <CardTitle className="text-base font-serif">1.1km Weather Radar</CardTitle>
            <CardDescription className="text-xs">
              Correlates ground moisture deficit, wind speed at boom height, and surface temp to calculate precise 4-hour chemical application windows.
            </CardDescription>
          </Card>

          <Card className="space-y-2 hover:shadow-md transition-shadow">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-100 w-fit mb-2">
              <Calendar className="w-5 h-5" />
            </div>
            <CardTitle className="text-base font-serif">Statutory Deadlines</CardTitle>
            <CardDescription className="text-xs">
              Calculates NVZ closed spreading dates, SFI agreement anniversary filings, BCMS cattle movement deadlines, and Red Tractor renewals.
            </CardDescription>
          </Card>

          <Card className="space-y-2 hover:shadow-md transition-shadow">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 w-fit mb-2">
              <Wheat className="w-5 h-5" />
            </div>
            <CardTitle className="text-base font-serif">Sentinel-2 NDVI</CardTitle>
            <CardDescription className="text-xs">
              Evaluates multi-spectral biomass decline, canopy nitrogen uptake curves, somatically elevated herd risks, and silage clamp D-values.
            </CardDescription>
          </Card>

          <Card className="space-y-2 hover:shadow-md transition-shadow">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-100 w-fit mb-2">
              <TrendingUp className="w-5 h-5" />
            </div>
            <CardTitle className="text-base font-serif">Commodity Markets</CardTitle>
            <CardDescription className="text-xs">
              Alerts you when LIFFE feed wheat futures breach your calculated cost-of-production break-even margins or regional livestock mart prices peak.
            </CardDescription>
          </Card>
        </div>

        {/* Morning Field Briefing Mockup */}
        <div className="mt-12 p-6 sm:p-8 rounded-xl border border-slate-200 bg-white shadow-sm max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-xs uppercase tracking-wider text-slate-800">
                Sample Morning Briefing (SMS / Push)
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Today 06:30 GMT
            </span>
          </div>
          
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200">
            <span className="text-slate-900 font-semibold">Alistair Reid:</span>
            <br />
            &quot;Morning Peter. Three items for today:
            <br />
            1) <strong>Spray Window:</strong> Lower 30ha opens at 14:00 (wind drops below 6mph; surface temp 9.4°C).
            <br />
            2) <strong>SFI SAM3:</strong> Herbal ley seed delivery confirmed for tomorrow 09:00; parcel evidence log pre-filled.
            <br />
            3) <strong>Livestock:</strong> Deadweight lamb at York Mart climbed 18p/kg yesterday; recommend drafting Pen 2 for Tuesday.&quot;
          </div>
        </div>
      </Section>

      {/* 
        ========================================================================
        SECTION 3: AGENTIC AUTONOMY (TRAFFIC LIGHT FRAMEWORK)
        ========================================================================
      */}
      <Section
        variant="white"
        badge={<Badge variant="forest">Phase 3: Autonomy Framework</Badge>}
        title="3. Traffic-Light Autonomy: What Steward Does vs. What You Sign Off"
        subtitle="A clear, legally bounded framework. Steward automates background record keeping, but never spends money or files official documents without your approval."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* GREEN TIER */}
          <div className="p-6 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                <span className="font-bold text-sm text-emerald-800">Green Tier</span>
                <Badge variant="forest" size="sm">Automated</Badge>
              </div>

              <h3 className="font-serif font-medium text-slate-900 text-lg">
                Continuous Background Sync
              </h3>
              
              <p className="text-xs text-slate-600 leading-relaxed">
                Low-risk sensory feeds and passive computational tasks executed automatically without distracting the farmer:
              </p>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-emerald-200/80">
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  Hourly 1.1km Met Office radar sync
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  Machinery service countdown logging
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  Veterinary medicine withdrawal countdowns
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  Defra SFI payment rate indexation
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-emerald-200 text-xs text-emerald-800 font-medium">
              ✓ 100% passive, zero manual friction
            </div>
          </div>

          {/* AMBER TIER */}
          <div className="p-6 rounded-xl border border-amber-200 bg-amber-50/40 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <span className="font-bold text-sm text-amber-900">Amber Tier</span>
                <Badge variant="gold" size="sm">Supervised</Badge>
              </div>

              <h3 className="font-serif font-medium text-slate-900 text-lg">
                Steward Drafts, You Sign Off
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                Steward pre-compiles full compliance dossiers and field calculations, presenting a 1-tap review dialog:
              </p>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-amber-200/80">
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mr-2 mt-0.5 flex-shrink-0" />
                  SFI &amp; CS scheme application drafts
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mr-2 mt-0.5 flex-shrink-0" />
                  Field spray logs &amp; NVZ fertiliser budgets
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mr-2 mt-0.5 flex-shrink-0" />
                  Contractor dispatch briefings
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mr-2 mt-0.5 flex-shrink-0" />
                  Herd ration &amp; mineral adjustments
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-amber-200 text-xs text-amber-900 font-medium">
              ⚠️ Nothing submitted without 1-tap review
            </div>
          </div>

          {/* RED TIER */}
          <div className="p-6 rounded-xl border border-rose-200 bg-rose-50/40 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-rose-200 pb-2">
                <span className="font-bold text-sm text-rose-900">Red Tier</span>
                <Badge variant="terracotta" size="sm">Restricted</Badge>
              </div>

              <h3 className="font-serif font-medium text-slate-900 text-lg">
                Strictly Non-Autonomous
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                High-stakes financial and statutory transactions that Steward will <strong>never execute</strong> automatically:
              </p>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-rose-200/80">
                <li className="flex items-start">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 mr-2 mt-0.5 flex-shrink-0" />
                  Direct legal filings to Defra, RPA or HMRC
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 mr-2 mt-0.5 flex-shrink-0" />
                  Direct fund transfers or purchase orders
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 mr-2 mt-0.5 flex-shrink-0" />
                  Grain forward contracts or tenancy agreements
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 mr-2 mt-0.5 flex-shrink-0" />
                  Autonomous veterinary diagnostic prescriptions
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-rose-200 text-xs text-rose-800 font-medium">
              🛑 100% farmer control guaranteed
            </div>
          </div>

        </div>
      </Section>

      {/* 
        ========================================================================
        SECTION 4: HUMAN-IN-THE-LOOP
        ========================================================================
      */}
      <Section
        variant="parchment"
        badge={<Badge variant="forest">Phase 4: Accredited Human Specialists</Badge>}
        title="4. Seamless Specialist Escalation"
        subtitle="AI has clear boundaries. When complex veterinary pathologies, statutory tax appeals, or tenancy restructuring arise, verified UK specialists are one tap away."
      >
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-2 shadow-sm">
              <Award className="w-8 h-8 text-forest-800 mx-auto" />
              <h3 className="font-serif font-medium text-slate-900 text-base">RCVS Farm Vets</h3>
              <p className="text-xs text-slate-600">Herd pathology, disease outbreak triage &amp; export certs.</p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-2 shadow-sm">
              <Wheat className="w-8 h-8 text-forest-800 mx-auto" />
              <h3 className="font-serif font-medium text-slate-900 text-base">BASIS Agronomists</h3>
              <p className="text-xs text-slate-600">Herbicide resistance, rare fungal disease &amp; nutrient budgets.</p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-2 shadow-sm">
              <ShieldCheck className="w-8 h-8 text-forest-800 mx-auto" />
              <h3 className="font-serif font-medium text-slate-900 text-base">ICAEW Accountants</h3>
              <p className="text-xs text-slate-600">Agricultural Property Relief (APR), machinery tax &amp; succession.</p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-2 shadow-sm">
              <Users className="w-8 h-8 text-forest-800 mx-auto" />
              <h3 className="font-serif font-medium text-slate-900 text-base">CAAV Surveyors</h3>
              <p className="text-xs text-slate-600">Tenancy renewals, easements &amp; RPA spatial boundary disputes.</p>
            </div>
          </div>

          {/* Flow Visual */}
          <div className="p-8 rounded-xl border border-slate-200 bg-white shadow-sm space-y-6">
            <h3 className="text-xl font-serif font-medium text-slate-900 text-center">
              Pre-Packaged Specialist Escalation Flow
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
              <div className="space-y-2 p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-medium text-slate-900 text-sm block">Step 1: One-Tap In-App Request</span>
                <p className="text-xs leading-relaxed">
                  Tap &quot;Ask an Agronomist&quot; or &quot;Ask a Vet&quot; from any field record, spray sheet, or health log.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-medium text-slate-900 text-sm block">Step 2: Context Pre-Packaged</span>
                <p className="text-xs leading-relaxed">
                  Steward compiles relevant soil tests, historical chemical applications, and NDVI imagery so the specialist starts with complete clarity.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-medium text-slate-900 text-sm block">Step 3: Direct Specialist Callback</span>
                <p className="text-xs leading-relaxed">
                  An accredited UK specialist responds directly via call or written advisory note, directly linked to your holding records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 
        ========================================================================
        FINAL CTA
        ========================================================================
      */}
      <section className="py-20 bg-forest-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Badge variant="gold">Get Started</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white">
            Put Steward to Work on Your Holding.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            Experience complete agricultural intelligence risk-free for 30 days. No long-term lock-in, zero hardware installation.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/signup" variant="white" size="lg">
              Start 30-Day Free Trial
            </Button>
            <Button href="/advisors" variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10">
              Meet Your Advisor
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
