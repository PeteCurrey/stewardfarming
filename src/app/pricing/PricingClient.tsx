"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Plus,
  Check,
  Info,
  Truck,
  Camera,
  Headphones,
  Leaf,
  TrendingUp,
  Award,
  Lock,
  ChevronDown,
  ChevronUp,
  Cpu,
  Landmark,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface AddonItem {
  id: string;
  name: string;
  category: string;
  description: string;
  monthlyPrice: number;
  icon: React.ElementType;
}

const BASE_PLAN = {
  name: "Steward Core Command",
  tagline: "The complete autonomous agronomy core for your holding.",
  monthlyPrice: 79,
  features: [
    "Full AI advisor access across all 4 domains (Arable, Livestock, Mixed, Dairy)",
    "Met Office 1.1km spot radar telemetry & low-drift spray window calculations",
    "Low-risk task automation & pre-populated chemical/medicine logs",
    "Defra SFI Scheme deadline & multi-action parcel stacking solver",
    "RPA parcel boundary synchronization & soil series mapping",
    "One-tap routing to accredited RCVS farm vets, BASIS agronomists & accountants",
    "Unlimited user seats for farm partners, managers, and family members",
    "100% sovereign UK agricultural data protection & zero lock-in contract",
  ],
};

const ADDONS: AddonItem[] = [
  {
    id: "machinery",
    name: "Fleet & Machinery Management",
    category: "Operations",
    description:
      "Tractor & combine service intervals, MOT/LOLER certificates, telematics sync, and diesel fuel tracking.",
    monthlyPrice: 29,
    icon: Truck,
  },
  {
    id: "satellite",
    name: "Sentinel-2 10m Multispectral Imagery",
    category: "Telemetry",
    description:
      "Weekly NDVI vegetation health scans, chlorophyll reflectance indices, and variable-rate spreading exports.",
    monthlyPrice: 39,
    icon: Camera,
  },
  {
    id: "subsidy",
    name: "SFI & Grant Concierge Drafting",
    category: "Subsidies",
    description:
      "AI drafted grant applications (FETF, Slurry Infrastructure, CS) pre-checked against RPA parcel boundaries.",
    monthlyPrice: 49,
    icon: Landmark,
  },
  {
    id: "carbon",
    name: "Carbon & Soil Sustainability Audits",
    category: "Compliance",
    description:
      "IPCC Tier 1 farm greenhouse gas accounting, hedgerow biomass calculations, and supply-chain ESG reporting.",
    monthlyPrice: 35,
    icon: Leaf,
  },
  {
    id: "market",
    name: "Grain & Livestock Market Intelligence",
    category: "Trading",
    description:
      "Live LIFFE wheat futures, deadweight beef/lamb regional benchmarks, and fertilizer price monitors.",
    monthlyPrice: 19,
    icon: TrendingUp,
  },
  {
    id: "priority_expert",
    name: "Priority Human Specialist SLA",
    category: "Network",
    description:
      "Guaranteed 2-hour callback SLA from our accredited UK agricultural specialist network for urgent matters.",
    monthlyPrice: 45,
    icon: Headphones,
  },
];

const FAQS = [
  {
    q: "How does the 30-day free trial work?",
    a: "You get full, unrestricted access to the complete Steward Advisor core and any add-on modules you select. No credit card is required to start. You can import your RPA land parcels, test spray window forecasting, and run full SFI eligibility checks with zero obligation.",
  },
  {
    q: "Can I add or remove add-on modules later?",
    a: "Yes. All add-ons are completely modular and can be activated or paused directly from your holding settings at any time without penalty.",
  },
  {
    q: "Who owns my farm data?",
    a: "You own 100% of your data. Steward will never sell, lease, or monetize your field maps, crop yields, herd medicine books, or financial records. Your data is stored on sovereign UK infrastructure in compliance with UK GDPR and agricultural data standards.",
  },
  {
    q: "Does Steward automatically submit grant applications to Defra or the RPA?",
    a: "Never without your explicit approval. Steward operates under a strict Traffic-Light Autonomy framework. SFI applications, financial commitments, and statutory reports are prepared as drafts (Amber Tier) requiring your deliberate 1-tap review before any official submission.",
  },
  {
    q: "Are all four specialist advisors included in the base plan?",
    a: "Yes. Your base subscription includes full access to all four advisor specialisms (Tom Campbell for arable, Fiona MacLeod for livestock, Alistair Reid for mixed farms, and Eleanor Wright for dairy). You can consult all of them freely across your different fields and enterprises without any extra charge.",
  },
];

export function PricingClient() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["satellite"]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const baseMonthly = BASE_PLAN.monthlyPrice;
  const addonsTotal = selectedAddons.reduce((acc, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    return acc + (addon?.monthlyPrice || 0);
  }, 0);

  const totalMonthlyRaw = baseMonthly + addonsTotal;
  const finalPrice = isAnnual
    ? Math.round(totalMonthlyRaw * 0.85)
    : totalMonthlyRaw;

  const signupUrl = `/signup?addons=${selectedAddons.join(",")}&billing=${isAnnual ? "annual" : "monthly"}`;

  return (
    <div className="flex flex-col bg-obsidian-950 text-parchment-100">
      
      {/* HEADER */}
      <section className="pt-32 pb-16 bg-obsidian-950 bg-tactical-grid border-b border-white/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <Badge variant="gold" pulse>Transparent Institutional Pricing</Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight tracking-tight">
            One Core Subscription Per Holding.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-coutts via-gold-300 to-gold-brass">
              Add Only What You Deploy.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-parchment-300 leading-relaxed max-w-2xl mx-auto font-sans">
            Every holding receives the full autonomous advisory core. Configure bespoke precision telemetry add-ons tailored to your machinery, imagery, and grant needs.
          </p>

          {/* Billing Interval Switcher */}
          <div className="pt-6 flex items-center justify-center space-x-4 font-mono text-xs uppercase tracking-wider">
            <span className={cn(!isAnnual ? "text-white font-bold" : "text-parchment-400")}>
              Monthly Rolling
            </span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className={cn(
                "relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-white/20 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-volt",
                isAnnual ? "bg-volt" : "bg-obsidian-800"
              )}
              role="switch"
              aria-checked={isAnnual}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-obsidian-950 shadow-md transition duration-150",
                  isAnnual ? "translate-x-7" : "translate-x-0"
                )}
              />
            </button>
            <div className="flex items-center space-x-2">
              <span className={cn(isAnnual ? "text-white font-bold" : "text-parchment-400")}>
                Annual Agreement
              </span>
              <span className="text-[10px] uppercase font-bold bg-volt/15 text-volt px-2 py-0.5 rounded-tech border border-volt/30">
                15% Savings
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* BASE SUBSCRIPTION CARD */}
      <Section variant="grid" containerSize="lg">
        <div className="max-w-4xl mx-auto">
          <Card
            variant="hud-gold"
            cornerTicks
            className="p-8 sm:p-10 shadow-2xl relative overflow-hidden space-y-6"
          >
            <div className="absolute top-0 right-0 bg-gold-coutts text-obsidian-950 px-4 py-1 text-[11px] font-mono font-bold uppercase tracking-wider rounded-bl-panel">
              [CORE HOLDING PLAN]
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4">
                <Badge variant="gold" size="sm">The Complete Foundation</Badge>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                  {BASE_PLAN.name}
                </h2>
                <p className="text-sm text-parchment-300 leading-relaxed font-sans">
                  {BASE_PLAN.tagline}
                </p>

                <div className="pt-4 space-y-2.5">
                  <p className="text-xs font-mono uppercase font-bold text-white tracking-wider">
                    INCLUDED IN CORE SUBSCRIPTION:
                  </p>
                  <ul className="grid grid-cols-1 gap-2 text-xs sm:text-sm text-parchment-200 font-sans">
                    {BASE_PLAN.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 text-volt mr-2.5 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price Callout */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-obsidian-950 p-6 rounded-panel border border-white/10 space-y-6 text-center">
                <div className="space-y-2 font-mono">
                  <span className="text-[11px] text-parchment-400 uppercase tracking-widest block">
                    BASE HOLDING SUBSCRIPTION
                  </span>
                  <div>
                    <span className="text-4xl sm:text-5xl font-bold text-gold-coutts">
                      £{isAnnual ? Math.round(BASE_PLAN.monthlyPrice * 0.85) : BASE_PLAN.monthlyPrice}
                    </span>
                    <span className="text-xs text-parchment-400 block sm:inline sm:ml-1">
                      / MONTH
                    </span>
                  </div>
                  <p className="text-[10px] text-parchment-400 italic font-sans">
                    *Flat pricing per holding regardless of acreage size
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10 text-xs font-mono text-parchment-300">
                  <div className="flex items-center justify-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-volt" />
                    <span>30-Day Free Holding Trial</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Check className="w-4 h-4 text-volt" />
                    <span>No upfront credit card required</span>
                  </div>
                </div>

                <Button href={signupUrl} variant="volt" size="lg" className="w-full shadow-hud">
                  Start Free Trial &rarr;
                </Button>
              </div>

            </div>
          </Card>
        </div>
      </Section>

      {/* INTERACTIVE ADD-ON CONFIGURATOR */}
      <Section
        variant="obsidian"
        badge={<Badge variant="volt">Modular Architecture</Badge>}
        title="Customise Your Telemetry: Select Optional Add-ons."
        subtitle="Only deploy the specialized systems your holding requires. Toggle add-ons below for real-time price updates."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Add-ons List */}
          <div className="lg:col-span-8 space-y-4">
            {ADDONS.map((addon) => {
              const Icon = addon.icon;
              const isChecked = selectedAddons.includes(addon.id);
              const price = isAnnual
                ? Math.round(addon.monthlyPrice * 0.85)
                : addon.monthlyPrice;

              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={cn(
                    "p-5 rounded-panel border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm",
                    isChecked
                      ? "bg-obsidian-900 border-volt shadow-hud"
                      : "bg-obsidian-900/60 border-white/10 hover:border-white/30"
                  )}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-tech border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                        isChecked
                          ? "bg-volt border-volt text-obsidian-950"
                          : "bg-obsidian-950 border-white/20"
                      )}
                    >
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-serif font-bold text-white text-base">
                          {addon.name}
                        </span>
                        <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-parchment-300 bg-obsidian-950 px-2 py-0.5 rounded-tech border border-white/10">
                          {addon.category}
                        </span>
                      </div>
                      <p className="text-xs text-parchment-300 leading-relaxed max-w-xl font-sans">
                        {addon.description}
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right pl-10 sm:pl-0 flex-shrink-0 font-mono">
                    <span className="text-lg font-bold text-gold-coutts">
                      +£{price}
                    </span>
                    <span className="text-xs text-parchment-400 block">/ MONTH</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Summary Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <Card variant="hud-gold" cornerTicks className="shadow-2xl p-6 space-y-6">
              
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-serif font-bold text-xl text-white">
                  Holding Specification
                </h3>
                <p className="text-xs font-mono text-parchment-400 mt-0.5">
                  {isAnnual ? "Annual agreement (15% savings)" : "Monthly rolling agreement"}
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-xs font-mono text-parchment-300">
                <div className="flex justify-between items-center py-1">
                  <span>Steward Core Command</span>
                  <span className="text-white font-bold">
                    £{isAnnual ? Math.round(baseMonthly * 0.85) : baseMonthly}/mo
                  </span>
                </div>

                {selectedAddons.length > 0 ? (
                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    <span className="text-gold-coutts text-[11px] uppercase tracking-wider block font-bold">
                      ACTIVE ADD-ONS ({selectedAddons.length}):
                    </span>
                    {selectedAddons.map((id) => {
                      const addon = ADDONS.find((a) => a.id === id);
                      if (!addon) return null;
                      const price = isAnnual
                        ? Math.round(addon.monthlyPrice * 0.85)
                        : addon.monthlyPrice;
                      return (
                        <div key={id} className="flex justify-between items-center text-parchment-400 pl-2">
                          <span className="truncate max-w-[180px]">&bull; {addon.name}</span>
                          <span className="text-white">+£{price}/mo</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-2 text-[11px] text-parchment-400 italic font-sans">
                    No optional add-ons selected.
                  </div>
                )}

                <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-xs uppercase text-white block">
                      TOTAL MONTHLY:
                    </span>
                    <span className="text-[10px] text-parchment-400">
                      Billed {isAnnual ? "annually" : "monthly"} &bull; Excl. VAT
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-gold-coutts">
                      £{finalPrice}
                    </span>
                    <span className="text-xs text-parchment-400 block">/ MONTH</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-2">
                <Button href={signupUrl} variant="volt" size="lg" className="w-full shadow-hud">
                  Start 30-Day Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-[10px] font-mono text-parchment-400 text-center">
                  Includes full add-on access during 30-day trial.
                </p>
              </div>

            </Card>
          </div>

        </div>
      </Section>

      {/* FAQ SECTION */}
      <Section
        variant="grid"
        badge={<Badge variant="gold">Fiduciary Clarity</Badge>}
        title="Frequently Asked Questions"
        subtitle="Direct answers on telemetry boundaries, data sovereignty, and commercial agreements."
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-panel border border-white/10 bg-obsidian-900 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between space-x-4 focus:outline-none focus:ring-2 focus:ring-volt"
                >
                  <span className="font-serif font-bold text-base text-white">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-volt flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-parchment-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-parchment-300 leading-relaxed border-t border-white/10 bg-obsidian-950 font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center text-xs font-mono text-parchment-400 space-y-2">
          <p>
            Operating an estate structure or complex partnership holding?
          </p>
          <a
            href="mailto:enquiries@steward.co.uk"
            className="text-gold-coutts hover:text-white font-bold"
          >
            Consult our agricultural executive team &rarr;
          </a>
        </div>
      </Section>
    </div>
  );
}
