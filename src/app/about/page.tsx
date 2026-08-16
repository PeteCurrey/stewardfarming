import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { ShieldCheck, HeartHandshake, MapPin, Users, Award, Sprout } from "lucide-react";
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
    <div className="flex flex-col">
      {/* Header */}
      <section className="pt-16 pb-16 bg-parchment-100 border-b border-parchment-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="forest">Our Heritage &amp; Philosophy</Badge>
          <h1 className="text-4xl sm:text-5xl font-serif font-medium text-forest-900 leading-tight">
            Traditional agricultural stewardship, empowered by artificial intelligence.
          </h1>
          <p className="text-lg text-charcoal-700 leading-relaxed max-w-2xl mx-auto">
            We founded Steward on a simple conviction: modern British agriculture requires the wisdom of traditional husbandry combined with the speed and thoroughness of cutting-edge technology.
          </p>
        </div>
      </section>

      {/* Story */}
      <Section variant="white">
        <div className="max-w-4xl mx-auto space-y-8 text-charcoal-800 leading-relaxed">
          <h2 className="text-3xl font-serif font-bold text-forest-900">
            Why we built Steward
          </h2>
          <p className="text-base sm:text-lg">
            For generations, British farming relied on long-term relationships with trusted local land agents, agronomists, and livestock vets who knew every field, hedge, and ditch on a holding.
          </p>
          <p className="text-base sm:text-lg">
            In recent years, the explosion of regulatory complexity — from the dismantling of BPS in favor of SFI, to volatile commodity prices and complex NVZ rules — has buried farmers under endless administration.
          </p>
          <p className="text-base sm:text-lg">
            Steward was engineered to bring that dedicated, proactive advisory back to every farm holding in the country — available in your pocket 24 hours a day, whilst always remaining grounded in the practical realities of the British countryside.
          </p>
        </div>
      </Section>

      {/* Human Network */}
      <section id="network" className="py-20 bg-forest-900 text-parchment-100 border-y border-forest-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <Badge variant="gold">Human-in-the-Loop</Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-parchment-50">
              The Accredited Human Specialist Network
            </h2>
            <p className="text-parchment-300 max-w-2xl mx-auto text-sm sm:text-base">
              Artificial intelligence should never replace clinical judgment in the yard or expert legal advocacy. Steward partners with leading UK professional bodies:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 text-center">
            <div className="bg-forest-950 p-6 rounded-xl border border-forest-700 space-y-2">
              <Award className="w-8 h-8 text-gold-400 mx-auto" />
              <h3 className="font-serif font-bold text-parchment-50">RCVS Farm Vets</h3>
              <p className="text-xs text-parchment-300">Herd health reviews and diagnostic triage.</p>
            </div>

            <div className="bg-forest-950 p-6 rounded-xl border border-forest-700 space-y-2">
              <Sprout className="w-8 h-8 text-gold-400 mx-auto" />
              <h3 className="font-serif font-bold text-parchment-50">BASIS / FACTS</h3>
              <p className="text-xs text-parchment-300">Certified arable agronomy &amp; fertiliser advice.</p>
            </div>

            <div className="bg-forest-950 p-6 rounded-xl border border-forest-700 space-y-2">
              <ShieldCheck className="w-8 h-8 text-gold-400 mx-auto" />
              <h3 className="font-serif font-bold text-parchment-50">ICAEW Accountants</h3>
              <p className="text-xs text-parchment-300">Agricultural property relief (APR), restructuring, and machinery tax.</p>
            </div>

            <div className="bg-forest-950 p-6 rounded-xl border border-forest-700 space-y-2">
              <Users className="w-8 h-8 text-gold-400 mx-auto" />
              <h3 className="font-serif font-bold text-parchment-50">CAAV Surveyors</h3>
              <p className="text-xs text-parchment-300">Tenancy, easements &amp; rural valuation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Data Ethics */}
      <section id="security" className="py-16 bg-parchment-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="forest">Data Sovereignty</Badge>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900">
            Your Farm. Your Data. Unconditionally.
          </h2>
          <p className="text-sm sm:text-base text-charcoal-700 max-w-2xl mx-auto leading-relaxed">
            Steward operates on strict UK data residency standards. We never monetize, aggregate, or distribute your yield numbers, stocking densities, or subsidy payments to trading desks or supply chain aggregators.
          </p>
        </div>
      </section>
    </div>
  );
}
