"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Check,
  Truck,
  Camera,
  Headphones,
  Leaf,
  TrendingUp,
  ChevronDown,
  ChevronUp,
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
  name: "Steward Core Holding",
  tagline: "The complete agricultural intelligence core for your farm holding.",
  monthlyPrice: 79,
  features: [
    "Full advisor access across all 4 domains (Arable, Livestock, Mixed, Dairy)",
    "Met Office 1.1km spot radar telemetry & low-drift spray window calculations",
    "Low-risk task automation & pre-populated chemical and veterinary logs",
    "Defra SFI Scheme deadline tracking & multi-action parcel stacking solver",
    "RPA parcel boundary synchronization & soil series classification",
    "One-tap escalation to accredited RCVS vets, BASIS agronomists & accountants",
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
    category: "Support",
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
    a: "You own 100% of your data. Steward will never sell, lease, or commercialise your field maps, crop yields, herd medicine books, or financial records. Your data is stored on sovereign UK infrastructure in compliance with UK GDPR and agricultural data standards.",
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
    <div className="flex flex-col bg-white text-slate-900">
      
      {/* HEADER — Full Screen Hero with British Farm Estate Background */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-900">
        {/* Background Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2560&q=85"
          alt="Panoramic British agricultural estate and fields at sunrise"
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
              <span>Transparent Sovereign Pricing &bull; Zero Contract Lock-In</span>
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extralight text-white leading-[1.08] tracking-tight max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            One Core Subscription. Add Only What You Need.
          </h1>

          <p className="text-base sm:text-xl font-sans font-light text-slate-100 max-w-2xl leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
            Every holding receives the full agricultural advisory core. Configure optional precision telemetry add-ons tailored to your machinery, imagery, and grant needs.
          </p>

          {/* Billing Interval Switcher */}
          <div className="pt-2 inline-flex items-center space-x-3 text-sm bg-slate-900/70 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl shadow-sm">
            <span className={cn(!isAnnual ? "text-white font-semibold" : "text-slate-300")}>
              Monthly Rolling
            </span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className={cn(
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                isAnnual ? "bg-emerald-500" : "bg-slate-600"
              )}
              role="switch"
              aria-checked={isAnnual}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out",
                  isAnnual ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
            <div className="flex items-center space-x-2">
              <span className={cn(isAnnual ? "text-white font-semibold" : "text-slate-300")}>
                Annual Billing
              </span>
              <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                Save 15%
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* BASE SUBSCRIPTION CARD */}
      <Section variant="white" containerSize="lg">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 sm:p-10 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4">
                <Badge variant="forest" size="sm">The Core Plan</Badge>
                <h2 className="text-3xl font-serif font-medium text-slate-900">
                  {BASE_PLAN.name}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {BASE_PLAN.tagline}
                </p>

                <div className="pt-2 space-y-2.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-800">
                    Included in Core Plan:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {BASE_PLAN.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2.5 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price Callout */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-6 text-center">
                <div className="space-y-1">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">
                    Holding Subscription
                  </span>
                  <div>
                    <span className="text-4xl sm:text-5xl font-serif font-bold text-slate-900">
                      £{isAnnual ? Math.round(BASE_PLAN.monthlyPrice * 0.85) : BASE_PLAN.monthlyPrice}
                    </span>
                    <span className="text-sm text-slate-500 ml-1">
                      / month
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 italic">
                    Flat fee per holding &bull; All 4 advisors included
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200 text-xs text-slate-600">
                  <div className="flex items-center justify-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>30-Day Free Holding Trial</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>No card required to start</span>
                  </div>
                </div>

                <Button href={signupUrl} variant="primary" size="lg" className="w-full">
                  Start Free Trial &rarr;
                </Button>
              </div>

            </div>
          </div>
        </div>
      </Section>

      {/* INTERACTIVE ADD-ON CONFIGURATOR */}
      <Section
        variant="parchment"
        badge={<Badge variant="forest">Optional Add-ons</Badge>}
        title="Customise Your Holding: Select Modular Upgrades"
        subtitle="Only deploy the modules your farm holding requires. Toggle add-ons below for real-time price updates."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Add-ons List */}
          <div className="lg:col-span-8 space-y-3">
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
                    "p-5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white",
                    isChecked
                      ? "border-forest-800 shadow-sm ring-1 ring-forest-800"
                      : "border-slate-200 hover:border-slate-300"
                  )}
                >
                  <div className="flex items-start space-x-3.5">
                    <div
                      className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                        isChecked
                          ? "bg-forest-900 border-forest-900 text-white"
                          : "bg-white border-slate-300"
                      )}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-slate-900 text-sm sm:text-base">
                          {addon.name}
                        </span>
                        <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {addon.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                        {addon.description}
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right pl-8 sm:pl-0 flex-shrink-0">
                    <span className="text-base font-semibold text-slate-900">
                      +£{price}
                    </span>
                    <span className="text-xs text-slate-500 block">/ mo</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Summary Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-6 shadow-sm">
              
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-serif font-medium text-xl text-slate-900">
                  Plan Summary
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isAnnual ? "Annual agreement (15% savings applied)" : "Monthly rolling agreement"}
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span>Steward Core Holding</span>
                  <span className="font-semibold text-slate-900">
                    £{isAnnual ? Math.round(baseMonthly * 0.85) : baseMonthly}/mo
                  </span>
                </div>

                {selectedAddons.map((id) => {
                  const addon = ADDONS.find((a) => a.id === id);
                  if (!addon) return null;
                  const price = isAnnual
                    ? Math.round(addon.monthlyPrice * 0.85)
                    : addon.monthlyPrice;
                  return (
                    <div key={id} className="flex justify-between items-center py-0.5 text-slate-600">
                      <span className="truncate pr-2">{addon.name}</span>
                      <span className="font-medium text-slate-900">+£{price}/mo</span>
                    </div>
                  );
                })}

                <div className="pt-4 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-medium text-slate-900 text-sm">Total Monthly</span>
                  <div className="text-right">
                    <span className="text-2xl font-serif font-bold text-slate-900">
                      £{finalPrice}
                    </span>
                    <span className="text-slate-500 text-xs">/ month</span>
                  </div>
                </div>
              </div>

              <Button href={signupUrl} variant="primary" size="lg" className="w-full">
                Start 30-Day Free Trial
              </Button>

              <p className="text-[11px] text-center text-slate-500">
                Cancel anytime &bull; No hardware required &bull; UK GDPR compliant
              </p>
            </div>
          </div>

        </div>
      </Section>

      {/* FAQS */}
      <Section variant="white" containerSize="md">
        <div className="text-center space-y-3 mb-10">
          <Badge variant="forest">Frequently Asked Questions</Badge>
          <h2 className="text-3xl font-serif font-medium text-slate-900">
            Answers to Common Queries
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-medium text-sm sm:text-base text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0 ml-2" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

    </div>
  );
}
