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
    <div className="flex flex-col">
      {/* 
        ========================================================================
        HEADER
        ========================================================================
      */}
      <section className="pt-28 pb-16 bg-parchment-100 border-b border-parchment-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="forest">The Architecture of Trust</Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-forest-900 leading-tight">
            How Steward works alongside your daily farming routine.
          </h1>
          <p className="text-lg sm:text-xl text-charcoal-700 leading-relaxed max-w-2xl mx-auto">
            Grounded in traditional British agricultural expertise, powered by proactive intelligence, and safeguarded by real accredited professionals.
          </p>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 1: SETUP
        ========================================================================
      */}
      <Section
        variant="white"
        badge={<Badge variant="forest">Phase 1: Frictionless Onboarding</Badge>}
        title="1. Setup: Up and running in under five minutes."
        subtitle="No tedious 40-page questionnaires. Tell Steward the basics, and it learns your farm progressively as you use it."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5 text-charcoal-700 text-sm sm:text-base leading-relaxed">
            <p>
              Most farm management software demands weeks of manual data entry before offering any value. Steward is built differently.
            </p>
            <p>
              You start with a four-field summary: your primary enterprise type (Arable, Livestock, Mixed, Dairy), approximate acreage, location/postcode, and optional Single Business Identifier (SBI).
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-forest-700 mt-0.5 flex-shrink-0" />
                <p className="text-sm">
                  <strong>Automatic RPA Parcel Fetching:</strong> Link your SBI or drop field coordinates to pull in field boundary shapes, soil series, and NVZ zones automatically.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-forest-700 mt-0.5 flex-shrink-0" />
                <p className="text-sm">
                  <strong>Progressive Context Learning:</strong> Rather than demanding all your records on day one, Steward asks 1–2 smart questions as relevant seasonal moments arise (e.g. &quot;Did you undersow Field 3 with clover this spring?&quot;).
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-forest-700 mt-0.5 flex-shrink-0" />
                <p className="text-sm">
                  <strong>Dedicated Advisor Persona:</strong> Instantly matches you with Tom, Fiona, Alistair, or Eleanor based on your exact enterprise configuration.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <Card variant="linen" className="border-2 border-parchment-300 shadow-warm-lg p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-parchment-300 pb-3">
                <span className="font-serif font-bold text-forest-900 text-sm">Farm Setup Summary</span>
                <Badge variant="gold" size="sm">5 Mins</Badge>
              </div>
              <div className="space-y-2.5 text-xs text-charcoal-700">
                <div className="flex justify-between p-2 rounded bg-parchment-50 border border-parchment-300">
                  <span className="font-medium text-charcoal-500">Enterprise:</span>
                  <span className="font-semibold text-forest-900">Mixed (Arable &amp; Sheep)</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-parchment-50 border border-parchment-300">
                  <span className="font-medium text-charcoal-500">Location:</span>
                  <span className="font-semibold text-forest-900">North Yorkshire (Parish of Thirsk)</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-parchment-50 border border-parchment-300">
                  <span className="font-medium text-charcoal-500">Holding Size:</span>
                  <span className="font-semibold text-forest-900">420 ha (18 RPA Parcels)</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-parchment-50 border border-parchment-300">
                  <span className="font-medium text-charcoal-500">Assigned Advisor:</span>
                  <span className="font-semibold text-terracotta-700">Alistair Reid</span>
                </div>
              </div>
              <div className="pt-2 text-[11px] text-charcoal-500 text-center italic">
                Steward will refine holding parameters over time through conversational voice or text prompts.
              </div>
            </Card>
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
        badge={<Badge variant="terracotta">Phase 2: Continuous Vigilance</Badge>}
        title="2. Proactive Monitoring: Watching the moving pieces."
        subtitle="You shouldn't have to remember to check five different apps. Steward continuously tracks external conditions against your holding."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <Card variant="linen" hoverEffect>
            <div className="p-2.5 rounded-lg bg-forest-100 text-forest-900 w-fit mb-3">
              <CloudRain className="w-5 h-5" />
            </div>
            <CardTitle className="text-base font-serif">Field-Level Weather Radar</CardTitle>
            <CardDescription className="text-xs">
              Tracks micro-climates, wind gusts, soil moisture deficits, and ground temperature to identify 4-hour spray windows and optimal haymaking days.
            </CardDescription>
          </Card>

          <Card variant="linen" hoverEffect>
            <div className="p-2.5 rounded-lg bg-forest-100 text-forest-900 w-fit mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <CardTitle className="text-base font-serif">Statutory Deadlines</CardTitle>
            <CardDescription className="text-xs">
              Monitors NVZ closed spreading periods, SFI multi-year agreement anniversary filings, BCMS movement windows, and Red Tractor renewal dates.
            </CardDescription>
          </Card>

          <Card variant="linen" hoverEffect>
            <div className="p-2.5 rounded-lg bg-forest-100 text-forest-900 w-fit mb-3">
              <Wheat className="w-5 h-5" />
            </div>
            <CardTitle className="text-base font-serif">Herd &amp; Crop Telemetry</CardTitle>
            <CardDescription className="text-xs">
              Watches silage clamp dry-matter decline, somatically elevated milk cell counts, grazing pasture recovery rates, and winter crop growth stages.
            </CardDescription>
          </Card>

          <Card variant="linen" hoverEffect>
            <div className="p-2.5 rounded-lg bg-forest-100 text-forest-900 w-fit mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <CardTitle className="text-base font-serif">Commodity Markets</CardTitle>
            <CardDescription className="text-xs">
              Alerts you when LIFFE feed wheat futures reach your target cost-of-production margin or when local mart deadweight beef prices peak.
            </CardDescription>
          </Card>

        </div>

        {/* Morning Field Briefing Mockup */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-parchment-300 shadow-warm-md max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-between border-b border-parchment-200 pb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-gold-600" />
              <span className="font-serif font-bold text-sm text-forest-900">
                Sample Steward 06:30 Morning Briefing (SMS / Push)
              </span>
            </div>
            <span className="text-[11px] text-charcoal-500 font-mono">Today 06:30</span>
          </div>
          <p className="text-sm text-charcoal-700 leading-relaxed italic bg-parchment-50 p-4 rounded-lg border border-parchment-300/80">
            &quot;Morning, Alistair here. Three items for today: 1) Spray window in Lower 30ha opens at 14:00 (wind drops to 5mph). 2) SFI SAM3 herbal ley seed delivery confirmed for tomorrow; parcel log pre-filled. 3) Deadweight lamb at York Mart was up 18p/kg yesterday — consider drafting pen 2 for Tuesday.&quot;
          </p>
        </div>
      </Section>

      {/* 
        ========================================================================
        SECTION 3: AGENTIC AUTONOMY (TRAFFIC LIGHT FRAMEWORK)
        ========================================================================
      */}
      <Section
        variant="white"
        badge={<Badge variant="gold">Phase 3: Honest Autonomy Framework</Badge>}
        title="3. Agentic Autonomy: What Steward does vs. what you approve."
        subtitle="A clear, uncompromising framework. Steward takes away tedious administrative legwork, but will never spend money or submit legal documents without your explicit sign-off."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* GREEN TIER */}
          <div className="rounded-2xl bg-[#F4F9F5] border-2 border-forest-600/60 p-6 space-y-4 shadow-warm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-full bg-emerald-600 inline-block shadow-sm" />
                <span className="font-serif font-bold text-lg text-forest-900">GREEN</span>
              </div>
              <Badge variant="forest" size="sm">Fully Automated</Badge>
              <h3 className="font-serif font-bold text-forest-900 text-base">
                Routine Background Work
              </h3>
              <p className="text-xs text-charcoal-700 leading-relaxed">
                Low-risk tasks that Steward handles continuously in the background without needing your daily attention:
              </p>
              <ul className="space-y-2 text-xs text-charcoal-700 pt-2 border-t border-forest-200">
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-forest-700 mr-2 mt-0.5" /> Hourly weather &amp; spray radar sync</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-forest-700 mr-2 mt-0.5" /> Machinery service countdown reminders</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-forest-700 mr-2 mt-0.5" /> Medicine withdrawal date calculations</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-forest-700 mr-2 mt-0.5" /> Ingestion of Defra scheme updates</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-forest-200 text-[11px] font-semibold text-forest-800">
              ✓ Requires zero manual intervention
            </div>
          </div>

          {/* AMBER TIER */}
          <div className="rounded-2xl bg-[#FEFBF2] border-2 border-gold-500 p-6 space-y-4 shadow-warm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-full bg-amber-500 inline-block shadow-sm" />
                <span className="font-serif font-bold text-lg text-charcoal-900">AMBER</span>
              </div>
              <Badge variant="gold" size="sm">Drafted For Your Approval</Badge>
              <h3 className="font-serif font-bold text-charcoal-900 text-base">
                Steward Drafts, You Sign Off
              </h3>
              <p className="text-xs text-charcoal-700 leading-relaxed">
                Steward prepares the full paperwork or plan, then presents it with a single &quot;Approve / Adjust&quot; button:
              </p>
              <ul className="space-y-2 text-xs text-charcoal-700 pt-2 border-t border-gold-300">
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mr-2 mt-0.5" /> SFI &amp; Countryside Stewardship application drafts</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mr-2 mt-0.5" /> Field spray records and NVZ fertilizer plans</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mr-2 mt-0.5" /> Routine contractor bookings &amp; schedules</li>
                <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 text-amber-700 mr-2 mt-0.5" /> Herd diet/ration adjustments</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-gold-300 text-[11px] font-semibold text-amber-900">
              ⚠️ Nothing sent without your 1-tap review
            </div>
          </div>

          {/* RED TIER */}
          <div className="rounded-2xl bg-[#FDF6F4] border-2 border-terracotta-500 p-6 space-y-4 shadow-warm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-full bg-red-600 inline-block shadow-sm" />
                <span className="font-serif font-bold text-lg text-terracotta-900">RED</span>
              </div>
              <Badge variant="terracotta" size="sm">Always Requires Farmer</Badge>
              <h3 className="font-serif font-bold text-terracotta-900 text-base">
                Strictly Non-Autonomous
              </h3>
              <p className="text-xs text-charcoal-700 leading-relaxed">
                High-stakes financial and legal transactions that Steward will <strong>never execute</strong> automatically:
              </p>
              <ul className="space-y-2 text-xs text-charcoal-700 pt-2 border-t border-terracotta-300">
                <li className="flex items-start"><AlertTriangle className="w-3.5 h-3.5 text-terracotta-700 mr-2 mt-0.5" /> Final legal submission to RPA, Defra or HMRC</li>
                <li className="flex items-start"><AlertTriangle className="w-3.5 h-3.5 text-terracotta-700 mr-2 mt-0.5" /> Spending money or placing chemical purchase orders</li>
                <li className="flex items-start"><AlertTriangle className="w-3.5 h-3.5 text-terracotta-700 mr-2 mt-0.5" /> Signing grain sales or tenancy agreements</li>
                <li className="flex items-start"><AlertTriangle className="w-3.5 h-3.5 text-terracotta-700 mr-2 mt-0.5" /> Complex veterinary diagnoses without vet review</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-terracotta-300 text-[11px] font-semibold text-terracotta-900">
              🛑 100% human control guaranteed
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
        badge={<Badge variant="forest">Phase 4: Accredited Professional Network</Badge>}
        title="4. Human-in-the-Loop: Seamless specialist escalation."
        subtitle="Steward knows what it doesn't know. When clinical biological problems, statutory disputes, or complex tax questions arise, real UK experts are one tap away."
      >
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl border border-parchment-300 space-y-2 shadow-sm">
              <Award className="w-8 h-8 text-forest-800 mx-auto" />
              <h3 className="font-serif font-bold text-forest-900 text-base">RCVS Farm Vets</h3>
              <p className="text-xs text-charcoal-600">Complex herd pathologies, disease outbreaks, and biosecurity plans.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-parchment-300 space-y-2 shadow-sm">
              <Wheat className="w-8 h-8 text-forest-800 mx-auto" />
              <h3 className="font-serif font-bold text-forest-900 text-base">BASIS Agronomists</h3>
              <p className="text-xs text-charcoal-600">Difficult weed resistance, rare fungal disease, and seed rate reviews.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-parchment-300 space-y-2 shadow-sm">
              <ShieldCheck className="w-8 h-8 text-forest-800 mx-auto" />
              <h3 className="font-serif font-bold text-forest-900 text-base">ICAEW Accountants</h3>
              <p className="text-xs text-charcoal-600">Agricultural property relief (APR), restructuring, and machinery tax.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-parchment-300 space-y-2 shadow-sm">
              <Users className="w-8 h-8 text-forest-800 mx-auto" />
              <h3 className="font-serif font-bold text-forest-900 text-base">Rural Insurance Brokers</h3>
              <p className="text-xs text-charcoal-600">Harvest storm damage claims, livestock mortality, and public liability.</p>
            </div>
          </div>

          {/* Flow Visual */}
          <div className="bg-white p-8 rounded-2xl border border-parchment-300 shadow-warm space-y-6">
            <h3 className="text-xl font-serif font-bold text-forest-900 text-center">
              The &quot;Ask an Expert&quot; In-App Request Flow
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-charcoal-700 relative">
              <div className="space-y-2 p-4 rounded-lg bg-parchment-50 border border-parchment-300">
                <span className="font-serif font-bold text-forest-900 text-sm">Step 1: One-Tap In-App Request</span>
                <p className="text-xs leading-relaxed">
                  Tap &quot;Ask an Agronomist&quot; or &quot;Ask a Vet&quot; from any field record or chat screen. Attach a photo or voice note.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-parchment-50 border border-parchment-300">
                <span className="font-serif font-bold text-forest-900 text-sm">Step 2: Context Pre-Packaged</span>
                <p className="text-xs leading-relaxed">
                  Steward compiles all relevant soil tests, historical spray sheets, and parcel boundary maps so the expert doesn&apos;t ask basic questions.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-lg bg-parchment-50 border border-parchment-300">
                <span className="font-serif font-bold text-forest-900 text-sm">Step 3: Direct Professional Callback</span>
                <p className="text-xs leading-relaxed">
                  An accredited UK specialist responds directly via call or in-app note within your plan&apos;s SLA, with advice linked directly to your holding.
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
      <section className="py-20 bg-forest-900 text-parchment-100 border-t border-forest-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Badge variant="gold">Experience the difference</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-parchment-50">
            Put Steward to work on your holding today.
          </h2>
          <p className="text-base sm:text-lg text-parchment-200 max-w-xl mx-auto">
            Try all features free for 30 days. No long-term lock-in, no hardware installation.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button href="/signup" variant="gold" size="lg">
              Start 30-Day Free Trial
            </Button>
            <Button href="/advisors" variant="outline" size="lg" className="border-parchment-300 text-parchment-100 hover:bg-forest-800">
              Meet Your Advisor
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
