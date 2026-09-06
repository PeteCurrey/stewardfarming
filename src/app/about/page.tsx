import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { ShieldCheck, HeartHandshake, MapPin, Users, Award, Sprout, Lock, FileCheck, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About Our Heritage & Accredited Human Specialist Network",
  description:
    "Learn about Steward's founding mission: bridging traditional British agricultural husbandry with proactive artificial intelligence, supported by accredited RCVS farm vets, BASIS agronomists, and ICAEW rural accountants.",
  openGraph: {
    title: "About Steward — Traditional Stewardship, Empowered by AI",
    description:
      "Our founding story, agricultural philosophy, data sovereignty commitments, and accredited human specialist network.",
    url: "https://steward.co.uk/about",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-white text-slate-900">
      {/* Header — Full Screen Hero with British Countryside Heritage Background */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-900">
        {/* Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=2560&q=85"
          alt="Rolling green British countryside valley with traditional stone architecture"
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
              <span>Heritage &amp; Philosophy &bull; Sovereign British Advisory</span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extralight text-white tracking-tight leading-[1.08] max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            Traditional Husbandry. Engineered with Modern Precision.
          </h1>

          <p className="text-base sm:text-xl font-sans font-light text-slate-100 leading-relaxed max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            We founded Steward on an uncompromising conviction: modern British farming demands the generational wisdom of traditional husbandry, supported by real-time spatial data and accredited human specialists.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-start gap-3">
            <Button href="/advisors" variant="white" size="md" className="font-semibold">
              <span>Meet The Advisory Team</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button href="#network" variant="outline" size="md" className="text-white border-white/30 hover:bg-white/10 hover:border-white">
              Our Specialist Network
            </Button>
          </div>
        </div>
      </section>

      {/* Story */}
      <Section variant="white">
        <div className="max-w-3xl mx-auto space-y-8 leading-relaxed">
          <div className="p-8 sm:p-10 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-slate-900">
              Why We Built Steward
            </h2>

            <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              <p>
                For generations, British farming relied on long-term relationships with trusted local land agents, agronomists, and livestock vets who knew every field, hedge, and ditch on a holding.
              </p>
              <p>
                In recent years, the explosion of regulatory complexity — from the phased reduction of BPS in favor of complex SFI tiers, to extreme weather volatility and intricate NVZ rules — has buried farm managers under administrative paralysis.
              </p>
              <p>
                Steward was engineered to restore that dedicated, proactive advisory command back to every agricultural holding across the UK — available in your pocket 24 hours a day, whilst always remaining grounded in the practical realities of the British countryside.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Human Network */}
      <section id="network" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <Badge variant="forest">Human-in-the-Loop</Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-900">
              The Accredited Human Specialist Network
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              Artificial intelligence should never replace clinical judgment in the yard or expert legal advocacy. Steward partners directly with statutory UK professional bodies:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-3 shadow-sm">
              <Award className="w-8 h-8 text-forest-800 mx-auto" />
              <h3 className="font-serif font-medium text-slate-900 text-lg">RCVS Farm Vets</h3>
              <p className="text-xs text-slate-600">Herd health reviews, disease outbreak triage &amp; statutory export certification.</p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-3 shadow-sm">
              <Sprout className="w-8 h-8 text-forest-800 mx-auto" />
              <h3 className="font-serif font-medium text-slate-900 text-lg">BASIS / FACTS</h3>
              <p className="text-xs text-slate-600">Certified crop protection, herbicide resistance strategy &amp; RB209 nutrient budgets.</p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-3 shadow-sm">
              <ShieldCheck className="w-8 h-8 text-forest-800 mx-auto" />
              <h3 className="font-serif font-medium text-slate-900 text-lg">ICAEW Accountants</h3>
              <p className="text-xs text-slate-600">Agricultural Property Relief (APR), inheritance structuring &amp; capital allowances.</p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-3 shadow-sm">
              <Users className="w-8 h-8 text-forest-800 mx-auto" />
              <h3 className="font-serif font-medium text-slate-900 text-lg">CAAV Surveyors</h3>
              <p className="text-xs text-slate-600">Tenancy renewals, easement negotiations &amp; RPA spatial boundary disputes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Data Ethics */}
      <section id="security" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="forest">Data Sovereignty</Badge>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-900">
            Your Farm. Your Data. Non-Negotiable Fiduciary Integrity.
          </h2>
          <div className="p-6 sm:p-8 rounded-xl border border-slate-200 bg-slate-50 text-left space-y-4 max-w-3xl mx-auto shadow-sm">
            <div className="flex items-center space-x-2 text-forest-900 text-sm font-semibold">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>UK Data Residency &amp; Zero Commercialization Guarantee</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Steward operates under strict UK data residency standards. We never monetize, aggregate, or distribute your harvest yield logs, stocking counts, input costs, or subsidy grant awards to grain trading desks, chemical conglomerates, or supply chain aggregators.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-500 border-t border-slate-200">
              <span className="flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                Data Protection Act 2018
              </span>
              <span className="flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                UK GDPR Compliant
              </span>
              <span className="flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                Zero Third-Party Brokerage
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
