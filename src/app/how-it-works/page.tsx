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
  Sparkles,
  Users,
  Award,
  Lock,
  Layers,
  Calendar,
  AlertTriangle,
  HelpCircle,
  Wheat,
  Activity,
  Zap,
  Terminal,
  Cpu,
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
    <div className="flex flex-col bg-obsidian-950 text-obsidian-100 min-h-screen">
      {/* 
        ========================================================================
        HEADER
        ========================================================================
      */}
      <section className="relative pt-32 pb-20 border-b border-obsidian-800 bg-tactical-grid overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-950/80 to-obsidian-950 pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2">
            <Badge variant="volt">[SYS: ARCHITECTURE // OPERATIONAL]</Badge>
            <span className="text-[11px] font-mono text-obsidian-400 uppercase tracking-wider hidden sm:inline-block">
              // TELEMETRY REVISION 2026.4
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-obsidian-50 tracking-tight leading-[1.1]">
            Engineering the boundary between{" "}
            <span className="italic text-volt-400 font-sans font-medium">autonomous precision</span>{" "}
            and fiduciary control.
          </h1>

          <p className="text-base sm:text-lg text-obsidian-300 leading-relaxed max-w-3xl mx-auto">
            Grounded in traditional British agricultural husbandry, powered by millimetre radar and machine intelligence, and strictly bounded by Coutts-grade fiduciary governance.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-obsidian-400">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-tech bg-obsidian-900/80 border border-obsidian-800">
              <span className="w-1.5 h-1.5 rounded-full bg-volt-400 animate-volt-pulse" />
              RPA OS Parcel Ingestion
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-tech bg-obsidian-900/80 border border-obsidian-800">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              Strict Traffic-Light Autonomy
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-tech bg-obsidian-900/80 border border-obsidian-800">
              <span className="w-1.5 h-1.5 rounded-full bg-volt-400" />
              BASIS / RCVS In-Loop Triage
            </span>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 1: SETUP
        ========================================================================
      */}
      <Section
        variant="obsidian"
        badge={<Badge variant="forest">[PHASE 01 // ONBOARDING]</Badge>}
        title="Holding Initialisation: Operational in 300 Seconds."
        subtitle="Zero 40-page legacy spreadsheets. Enter your holding fundamentals, and Steward ingests your spatial parcels and calibrates your enterprise profile autonomously."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5 text-obsidian-300 text-sm sm:text-base leading-relaxed">
            <p>
              Legacy farm management systems require weeks of tedious manual entry before generating their first insight. Steward bypasses the friction through spatial government data integration.
            </p>
            <p>
              By providing your Single Business Identifier (SBI) or postcode, Steward pulls your holding boundaries, soil survey classifications, and catchment NVZ regulations directly from the Rural Payments Agency registry.
            </p>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3 p-3 rounded-tech bg-obsidian-900/60 border border-obsidian-800">
                <CheckCircle2 className="w-5 h-5 text-volt-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs sm:text-sm">
                  <strong className="text-obsidian-100 font-mono">Automated Ordnance Survey Parcel Ingestion:</strong>
                  <p className="text-obsidian-400 mt-0.5">
                    Instantly overlays parcel IDs, hectarage, and slope topology without manual digitization.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-tech bg-obsidian-900/60 border border-obsidian-800">
                <CheckCircle2 className="w-5 h-5 text-volt-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs sm:text-sm">
                  <strong className="text-obsidian-100 font-mono">Context-Aware Micro-Interviews:</strong>
                  <p className="text-obsidian-400 mt-0.5">
                    Rather than demand complete 5-year rotation records on day one, Steward queries 1–2 crucial points as seasonal operational windows open.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-tech bg-obsidian-900/60 border border-obsidian-800">
                <CheckCircle2 className="w-5 h-5 text-volt-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs sm:text-sm">
                  <strong className="text-obsidian-100 font-mono">Dedicated Advisor Assignment:</strong>
                  <p className="text-obsidian-400 mt-0.5">
                    Matches your holding immediately with Tom (Arable), Fiona (Livestock), Alistair (Mixed), or Eleanor (Dairy).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="hud-panel p-6 space-y-4 relative border border-obsidian-700 bg-obsidian-900/90 shadow-hud">
              <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-volt-400" />
                  <span className="font-mono text-xs uppercase tracking-wider text-obsidian-200">
                    HOLDING_INIT // TELEMETRY_PROFILE
                  </span>
                </div>
                <Badge variant="volt" size="sm">INIT: 4.8m</Badge>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex justify-between items-center p-2.5 rounded-tech bg-obsidian-950/80 border border-obsidian-800">
                  <span className="text-obsidian-400">ENTERPRISE_CLASS:</span>
                  <span className="text-volt-300 font-semibold">MIXED (ARABLE &amp; FLOCK)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-tech bg-obsidian-950/80 border border-obsidian-800">
                  <span className="text-obsidian-400">PARISH_COORD:</span>
                  <span className="text-obsidian-200">54.232° N, 1.341° W (THIRSK)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-tech bg-obsidian-950/80 border border-obsidian-800">
                  <span className="text-obsidian-400">HOLDING_EXTENT:</span>
                  <span className="text-obsidian-200">420.4 HA // 18 RPA PARCELS</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-tech bg-obsidian-950/80 border border-obsidian-800">
                  <span className="text-obsidian-400">RADAR_BEACON:</span>
                  <span className="text-volt-400">MET OFFICE LEEMING (1.1KM GRID)</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-tech bg-obsidian-950/80 border border-gold-500/30">
                  <span className="text-gold-400">SPECIALIST_CORE:</span>
                  <span className="text-gold-300 font-semibold">ALISTAIR REID [AG-03]</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] font-mono text-obsidian-400 border-t border-obsidian-800 flex items-center justify-between">
                <span>[SYNC: RPA SOVEREIGN LINK]</span>
                <span className="text-volt-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-volt-400 animate-volt-pulse" />
                  LIVE
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
        variant="grid"
        badge={<Badge variant="gold">[PHASE 02 // PROACTIVE SURVEILLANCE]</Badge>}
        title="Continuous Radar &amp; Telemetry Surveillance"
        subtitle="You shouldn't have to navigate five fragmented apps before sunrise. Steward correlates multi-spectral radar, regulatory calendars, and market feeds continuously."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variant="hud" hoverEffect>
            <div className="p-2.5 rounded-tech bg-volt-500/10 text-volt-400 border border-volt-500/30 w-fit mb-3">
              <CloudRain className="w-5 h-5" />
            </div>
            <CardTitle className="text-base font-serif text-obsidian-100">1.1km Weather Radar</CardTitle>
            <CardDescription className="text-xs text-obsidian-300">
              Correlates ground moisture deficit, wind shear at boom height, and surface temp to calculate ultra-precise 4-hour chemical application windows.
            </CardDescription>
          </Card>

          <Card variant="hud" hoverEffect>
            <div className="p-2.5 rounded-tech bg-gold-500/10 text-gold-400 border border-gold-500/30 w-fit mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <CardTitle className="text-base font-serif text-obsidian-100">Statutory Chronometers</CardTitle>
            <CardDescription className="text-xs text-obsidian-300">
              Calculates NVZ closed spreading periods, SFI multi-year agreement anniversary filings, BCMS movement deadlines, and Red Tractor renewals.
            </CardDescription>
          </Card>

          <Card variant="hud" hoverEffect>
            <div className="p-2.5 rounded-tech bg-volt-500/10 text-volt-400 border border-volt-500/30 w-fit mb-3">
              <Wheat className="w-5 h-5" />
            </div>
            <CardTitle className="text-base font-serif text-obsidian-100">Sentinel-2 NDVI Telemetry</CardTitle>
            <CardDescription className="text-xs text-obsidian-300">
              Evaluates 5-day multi-spectral biomass decline, canopy nitrogen uptake curves, somatically elevated herd risks, and silage clamp D-values.
            </CardDescription>
          </Card>

          <Card variant="hud" hoverEffect>
            <div className="p-2.5 rounded-tech bg-gold-500/10 text-gold-400 border border-gold-500/30 w-fit mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <CardTitle className="text-base font-serif text-obsidian-100">Commodity Matrix</CardTitle>
            <CardDescription className="text-xs text-obsidian-300">
              Pushes immediate alerts when ICE/LIFFE feed wheat futures breach your calculated break-even margins or regional deadweight lamb bids peak.
            </CardDescription>
          </Card>
        </div>

        {/* Morning Field Briefing Mockup */}
        <div className="mt-12 hud-panel p-6 sm:p-8 max-w-3xl mx-auto space-y-4 border border-obsidian-700 bg-obsidian-900/90 shadow-hud">
          <div className="flex items-center justify-between border-b border-obsidian-800 pb-3">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-volt-400" />
              <span className="font-mono font-bold text-xs text-obsidian-200 uppercase tracking-wider">
                TACTICAL_DISPATCH // 06:30 MORNING BRIEFING
              </span>
            </div>
            <span className="text-[11px] font-mono text-volt-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-volt-400 animate-volt-pulse" />
              SMS / ENCRYPTED APN
            </span>
          </div>
          
          <div className="font-mono text-xs sm:text-sm text-obsidian-200 leading-relaxed bg-obsidian-950 p-4 rounded-tech border border-obsidian-800">
            <span className="text-volt-400 font-bold">[ALISTAIR REID // 06:30 GMT]</span>
            <br />
            &quot;Morning Peter. Three items for today:
            <br />
            <span className="text-obsidian-300">1) Spray Window:</span> Lower 30ha opens at 14:00 (wind shear drops below 5mph; ground temp stable at 9.4°C).
            <br />
            <span className="text-obsidian-300">2) SFI SAM3:</span> Herbal ley seed delivery confirmed for tomorrow 09:00; parcel evidence log pre-filled.
            <br />
            <span className="text-obsidian-300">3) Livestock:</span> Deadweight lamb at York Mart climbed 18p/kg yesterday; recommend drafting Pen 2 for Tuesday auction.&quot;
          </div>
        </div>
      </Section>

      {/* 
        ========================================================================
        SECTION 3: AGENTIC AUTONOMY (TRAFFIC LIGHT FRAMEWORK)
        ========================================================================
      */}
      <Section
        variant="obsidian"
        badge={<Badge variant="volt">[PHASE 03 // TRAFFIC-LIGHT AUTONOMY]</Badge>}
        title="Honest Autonomy: What Steward Executes vs. What You Sign Off"
        subtitle="No hallucinated actions. A strict, legally-bounded framework engineered with machine-grade discipline and Coutts-level risk governance."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* GREEN TIER */}
          <div className="hud-panel p-6 space-y-4 border border-volt-500/30 bg-obsidian-900/90 shadow-hud flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-obsidian-800 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-volt-400 animate-volt-pulse shadow-[0_0_8px_#00E676]" />
                  <span className="font-mono font-bold text-sm text-volt-400">TIER 01: GREEN</span>
                </div>
                <Badge variant="volt" size="sm">AUTONOMOUS</Badge>
              </div>

              <h3 className="font-serif font-medium text-obsidian-100 text-lg">
                Continuous Telemetry Sync
              </h3>
              
              <p className="text-xs text-obsidian-300 leading-relaxed font-mono">
                Low-risk sensory feeds and passive computational tasks executed automatically without distracting the farmer:
              </p>

              <ul className="space-y-2 text-xs text-obsidian-300 pt-2 border-t border-obsidian-800 font-mono">
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-volt-400 mr-2 mt-0.5 flex-shrink-0" />
                  Hourly 1.1km Met Office radar sync
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-volt-400 mr-2 mt-0.5 flex-shrink-0" />
                  Machinery service countdown logging
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-volt-400 mr-2 mt-0.5 flex-shrink-0" />
                  Veterinary medicine withdrawal countdowns
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-volt-400 mr-2 mt-0.5 flex-shrink-0" />
                  Defra SFI payment rate indexation
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-obsidian-800 text-[11px] font-mono text-volt-400 flex items-center justify-between">
              <span>[EXECUTION: ZERO FRICTION]</span>
              <span>100% PASSIVE</span>
            </div>
          </div>

          {/* AMBER TIER */}
          <div className="hud-panel p-6 space-y-4 border border-gold-500/40 bg-obsidian-900/90 shadow-hud flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-obsidian-800 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-400 shadow-[0_0_8px_#D4AF37]" />
                  <span className="font-mono font-bold text-sm text-gold-400">TIER 02: AMBER</span>
                </div>
                <Badge variant="gold" size="sm">SUPERVISED</Badge>
              </div>

              <h3 className="font-serif font-medium text-obsidian-100 text-lg">
                Steward Drafts, You Sign Off
              </h3>

              <p className="text-xs text-obsidian-300 leading-relaxed font-mono">
                Steward pre-compiles full compliance dossiers and field calculations, presenting a 1-tap review dialog:
              </p>

              <ul className="space-y-2 text-xs text-obsidian-300 pt-2 border-t border-obsidian-800 font-mono">
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 mr-2 mt-0.5 flex-shrink-0" />
                  SFI &amp; CS scheme application drafts
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 mr-2 mt-0.5 flex-shrink-0" />
                  Field spray logs &amp; NVZ fertiliser budgets
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 mr-2 mt-0.5 flex-shrink-0" />
                  Contractor dispatch notifications
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 mr-2 mt-0.5 flex-shrink-0" />
                  Herd ration &amp; mineral adjustments
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-obsidian-800 text-[11px] font-mono text-gold-400 flex items-center justify-between">
              <span>[GATEWAY: EXPLICIT CONFIRM]</span>
              <span>1-TAP APPROVAL</span>
            </div>
          </div>

          {/* RED TIER */}
          <div className="hud-panel p-6 space-y-4 border border-rose-500/40 bg-obsidian-900/90 shadow-hud flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-obsidian-800 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#F43F5E]" />
                  <span className="font-mono font-bold text-sm text-rose-400">TIER 03: RED</span>
                </div>
                <Badge variant="outline" size="sm" className="border-rose-500 text-rose-400">LOCKED</Badge>
              </div>

              <h3 className="font-serif font-medium text-obsidian-100 text-lg">
                Strictly Non-Autonomous
              </h3>

              <p className="text-xs text-obsidian-300 leading-relaxed font-mono">
                High-stakes financial and legal transactions that Steward is hardcoded <strong>never to execute</strong> automatically:
              </p>

              <ul className="space-y-2 text-xs text-obsidian-300 pt-2 border-t border-obsidian-800 font-mono">
                <li className="flex items-start">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 mr-2 mt-0.5 flex-shrink-0" />
                  Direct legal filings to Defra, RPA or HMRC
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 mr-2 mt-0.5 flex-shrink-0" />
                  Direct fund transfers or chemical purchase orders
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 mr-2 mt-0.5 flex-shrink-0" />
                  Grain forward contracts or tenancy signatures
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 mr-2 mt-0.5 flex-shrink-0" />
                  Autonomous veterinary diagnostic prescriptions
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-obsidian-800 text-[11px] font-mono text-rose-400 flex items-center justify-between">
              <span>[FIDUCIARY HARD LOCK]</span>
              <span>100% FARMER CONTROL</span>
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
        variant="grid"
        badge={<Badge variant="gold">[PHASE 04 // SPECIALIST ESCALATION]</Badge>}
        title="Accredited UK Human Specialist Escalation"
        subtitle="AI has clinical limits. When complex veterinary pathologies, statutory appeals, or high-value tenancy restructuring arise, verified UK professionals are one tap away."
      >
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="hud-panel p-6 space-y-2 border border-obsidian-700 bg-obsidian-900/80">
              <Award className="w-8 h-8 text-gold-400 mx-auto" />
              <h3 className="font-serif font-medium text-obsidian-100 text-base">RCVS Farm Vets</h3>
              <p className="text-xs text-obsidian-400 font-mono">Complex herd pathologies, disease outbreaks &amp; biosecurity plans.</p>
            </div>

            <div className="hud-panel p-6 space-y-2 border border-obsidian-700 bg-obsidian-900/80">
              <Wheat className="w-8 h-8 text-volt-400 mx-auto" />
              <h3 className="font-serif font-medium text-obsidian-100 text-base">BASIS Agronomists</h3>
              <p className="text-xs text-obsidian-400 font-mono">Herbicide resistance, rare fungal disease &amp; nitrogen audits.</p>
            </div>

            <div className="hud-panel p-6 space-y-2 border border-obsidian-700 bg-obsidian-900/80">
              <ShieldCheck className="w-8 h-8 text-gold-400 mx-auto" />
              <h3 className="font-serif font-medium text-obsidian-100 text-base">ICAEW Accountants</h3>
              <p className="text-xs text-obsidian-400 font-mono">Agricultural Property Relief (APR), machinery tax &amp; restructuring.</p>
            </div>

            <div className="hud-panel p-6 space-y-2 border border-obsidian-700 bg-obsidian-900/80">
              <Users className="w-8 h-8 text-volt-400 mx-auto" />
              <h3 className="font-serif font-medium text-obsidian-100 text-base">CAAV Surveyors</h3>
              <p className="text-xs text-obsidian-400 font-mono">RPA dispute mitigation, tenancy agreements &amp; environmental covenants.</p>
            </div>
          </div>

          {/* Flow Visual */}
          <div className="hud-panel p-8 space-y-6 border border-obsidian-700 bg-obsidian-900/90 shadow-hud">
            <h3 className="text-xl font-serif font-normal text-obsidian-100 text-center tracking-tight">
              Pre-Packaged Specialist Escalation Flow
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-obsidian-300">
              <div className="space-y-2 p-4 rounded-tech bg-obsidian-950/80 border border-obsidian-800">
                <div className="font-mono text-xs text-volt-400 font-semibold uppercase">[STEP 01 // DISPATCH]</div>
                <span className="font-serif font-medium text-obsidian-100 text-sm">One-Tap In-App Triage</span>
                <p className="text-xs leading-relaxed text-obsidian-400">
                  Tap &quot;Escalate to Agronomist&quot; or &quot;Escalate to Vet&quot; directly from any field record, spray sheet, or diagnostic screen.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-tech bg-obsidian-950/80 border border-obsidian-800">
                <div className="font-mono text-xs text-gold-400 font-semibold uppercase">[STEP 02 // DOSSIER]</div>
                <span className="font-serif font-medium text-obsidian-100 text-sm">Context Pre-Packaging</span>
                <p className="text-xs leading-relaxed text-obsidian-400">
                  Steward automatically packages relevant soil tests, historical chemical applications, and NDVI imagery so the specialist starts with complete clarity.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-tech bg-obsidian-950/80 border border-obsidian-800">
                <div className="font-mono text-xs text-volt-400 font-semibold uppercase">[STEP 03 // RESOLUTION]</div>
                <span className="font-serif font-medium text-obsidian-100 text-sm">Direct Professional Callback</span>
                <p className="text-xs leading-relaxed text-obsidian-400">
                  An accredited UK specialist contacts you directly via secure call or written advisory note, directly bound to your holding records.
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
      <section className="py-24 bg-obsidian-950 text-obsidian-100 border-t border-obsidian-800 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <Badge variant="volt">[DEPLOYMENT READY]</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-obsidian-50 tracking-tight">
            Deploy machine precision to your holding today.
          </h2>
          <p className="text-base sm:text-lg text-obsidian-300 max-w-xl mx-auto font-mono text-sm">
            Experience complete agricultural intelligence risk-free for 30 days. No long-term lock-in, zero external hardware required.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/signup" variant="volt" size="lg">
              Start 30-Day Free Trial
            </Button>
            <Button href="/advisors" variant="outline" size="lg" className="border-obsidian-700 text-obsidian-200 hover:bg-obsidian-900">
              Meet Your Advisor
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
