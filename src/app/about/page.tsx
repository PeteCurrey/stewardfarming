import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { ShieldCheck, HeartHandshake, MapPin, Users, Award, Sprout, Lock, FileCheck, Terminal, Cpu } from "lucide-react";
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
    <div className="flex flex-col bg-obsidian-950 text-obsidian-100 min-h-screen">
      {/* Header */}
      <section className="relative pt-32 pb-20 border-b border-obsidian-800 bg-tactical-grid overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-950/80 to-obsidian-950 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2">
            <Badge variant="gold">[HERITAGE // MISSION STATEMENT]</Badge>
            <span className="text-[11px] font-mono text-obsidian-400 uppercase tracking-wider hidden sm:inline-block">
              // FOUNDATIONAL COVENANT
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-obsidian-50 tracking-tight leading-[1.1]">
            Traditional agricultural stewardship, engineered with{" "}
            <span className="italic text-volt-400 font-sans font-medium">machine precision</span>.
          </h1>

          <p className="text-base sm:text-lg text-obsidian-300 leading-relaxed max-w-2xl mx-auto">
            We founded Steward on a non-negotiable conviction: modern British agriculture demands the generational wisdom of traditional husbandry, accelerated by machine-grade data density and safeguarded by accredited human professionals.
          </p>
        </div>
      </section>

      {/* Story */}
      <Section variant="obsidian">
        <div className="max-w-4xl mx-auto space-y-8 leading-relaxed">
          <div className="hud-panel p-8 sm:p-10 border border-obsidian-700 bg-obsidian-900/90 shadow-hud space-y-6">
            <div className="flex items-center justify-between border-b border-obsidian-800 pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-volt-400 font-semibold">
                [EXECUTIVE_MEMORANDUM // ORIGIN]
              </span>
              <span className="font-mono text-xs text-obsidian-400">EST. 2026 // UK SOVEREIGN</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-obsidian-50 tracking-tight">
              Why We Built Steward
            </h2>

            <div className="space-y-5 text-sm sm:text-base text-obsidian-300 font-sans leading-relaxed">
              <p>
                For generations, British farm enterprises relied on long-term relationships with trusted local land agents, agronomists, and livestock vets who knew every field, hedge, and ditch on a holding.
              </p>
              <p>
                In recent years, the explosion of regulatory complexity — from the phased abolition of BPS in favor of complex SFI tiers, to extreme weather volatility and intricate NVZ closed periods — has buried generational farm businesses under administrative paralysis.
              </p>
              <p>
                Steward was engineered to restore that dedicated, proactive command center back to every agricultural holding across England, Scotland, Wales, and Northern Ireland — running continuously in your pocket, with the industrial reliability of a John Deere cab and the fiduciary protection of a private bank.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Human Network */}
      <section id="network" className="py-20 bg-obsidian-900 border-y border-obsidian-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <Badge variant="volt">[HUMAN-IN-THE-LOOP]</Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-obsidian-50 tracking-tight">
              The Accredited Human Specialist Network
            </h2>
            <p className="text-obsidian-300 max-w-2xl mx-auto text-sm sm:text-base">
              Machine intelligence should never replace clinical judgment in the yard or accredited legal advocacy. Steward partners directly with statutory UK professional bodies:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="hud-panel p-6 space-y-3 border border-obsidian-700 bg-obsidian-950/80">
              <Award className="w-8 h-8 text-gold-400 mx-auto" />
              <div className="font-mono text-xs text-gold-400 uppercase font-semibold">[CLINICAL]</div>
              <h3 className="font-serif font-medium text-obsidian-100 text-lg">RCVS Farm Vets</h3>
              <p className="text-xs text-obsidian-400 font-mono">Herd health reviews, disease outbreak triage &amp; statutory export certification.</p>
            </div>

            <div className="hud-panel p-6 space-y-3 border border-obsidian-700 bg-obsidian-950/80">
              <Sprout className="w-8 h-8 text-volt-400 mx-auto" />
              <div className="font-mono text-xs text-volt-400 uppercase font-semibold">[AGRONOMIC]</div>
              <h3 className="font-serif font-medium text-obsidian-100 text-lg">BASIS / FACTS</h3>
              <p className="text-xs text-obsidian-400 font-mono">Certified crop protection, herbicide resistance strategy &amp; RB209 nutrient budgets.</p>
            </div>

            <div className="hud-panel p-6 space-y-3 border border-obsidian-700 bg-obsidian-950/80">
              <ShieldCheck className="w-8 h-8 text-gold-400 mx-auto" />
              <div className="font-mono text-xs text-gold-400 uppercase font-semibold">[FIDUCIARY]</div>
              <h3 className="font-serif font-medium text-obsidian-100 text-lg">ICAEW Accountants</h3>
              <p className="text-xs text-obsidian-400 font-mono">Agricultural Property Relief (APR), inheritance structuring &amp; capital allowances.</p>
            </div>

            <div className="hud-panel p-6 space-y-3 border border-obsidian-700 bg-obsidian-950/80">
              <Users className="w-8 h-8 text-volt-400 mx-auto" />
              <div className="font-mono text-xs text-volt-400 uppercase font-semibold">[SURVEYING]</div>
              <h3 className="font-serif font-medium text-obsidian-100 text-lg">CAAV Surveyors</h3>
              <p className="text-xs text-obsidian-400 font-mono">Tenancy renewals, easement negotiations &amp; RPA spatial boundary disputes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Data Ethics */}
      <section id="security" className="py-20 bg-obsidian-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="gold">[DATA SOVEREIGNTY VAULT]</Badge>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-obsidian-50 tracking-tight">
            Your Farm. Your Data. Non-Negotiable Fiduciary Integrity.
          </h2>
          <div className="hud-panel p-6 sm:p-8 border border-obsidian-700 bg-obsidian-900/80 text-left space-y-4 max-w-3xl mx-auto">
            <div className="flex items-center space-x-3 text-volt-400 font-mono text-xs font-semibold">
              <Lock className="w-4 h-4" />
              <span>UK-RESTRICTED ENCRYPTION &amp; DATA PRIVILEGE</span>
            </div>
            <p className="text-sm text-obsidian-300 font-sans leading-relaxed">
              Steward operates on strict UK data residency standards. We never monetize, aggregate, or distribute your harvest yield logs, stocking counts, input costs, or subsidy grant awards to grain trading desks, chemical conglomerates, or supply chain aggregators.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-obsidian-400 border-t border-obsidian-800">
              <span className="flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-volt-400" />
                Data Protection Act 2018
              </span>
              <span className="flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-volt-400" />
                UK GDPR Compliant
              </span>
              <span className="flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-volt-400" />
                Zero Commercial Brokering
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
