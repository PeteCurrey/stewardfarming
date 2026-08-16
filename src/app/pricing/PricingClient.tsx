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
  name: "Steward Advisor",
  tagline: "The complete proactive intelligence core for your holding.",
  monthlyPrice: 79, // Placeholder price marked for customisation
  pricePlaceholderLabel: "£79/month per farm (Placeholder)",
  features: [
    "Full AI advisor access across all 4 domains (Arable, Livestock, Mixed, Dairy)",
    "Proactive morning briefings via mobile app & SMS (weather radar, spray windows)",
    "Low-risk task automation & pre-populated field/medicine logs",
    "Defra SFI & Countryside Stewardship deadline & eligibility tracking",
    "RPA parcel boundary synchronization & soil series mapping",
    "One-tap routing to accredited human vets, agronomists & accountants",
    "Unlimited user seats for family members, farm managers & staff",
    "100% UK agricultural data sovereignty guarantee",
  ],
};

const ADDONS: AddonItem[] = [
  {
    id: "machinery",
    name: "Fleet & Machinery Management",
    category: "Operations",
    description: "Telematics sync (John Deere, Case IH, Fendt), fuel usage, and LOLER/NSTC sprayer test logs.",
    monthlyPrice: 29,
    icon: Truck,
  },
  {
    id: "satellite",
    name: "Satellite & Drone Imagery",
    category: "Agronomy",
    description: "Weekly NDVI crop vigor scans, weed hotspot detection, and drainage tile blockage mapping.",
    monthlyPrice: 35,
    icon: Camera,
  },
  {
    id: "concierge",
    name: "Subsidy & Grant Concierge",
    category: "Subsidies",
    description: "Dedicated specialist review of complex SFI, Landscape Recovery, and Slurry Infrastructure applications.",
    monthlyPrice: 45,
    icon: Award,
  },
  {
    id: "carbon",
    name: "Carbon & Sustainability Reporting",
    category: "Compliance",
    description: "Defra-compliant whole-farm carbon auditing and Scope 3 supply chain greenhouse gas certification.",
    monthlyPrice: 25,
    icon: Leaf,
  },
  {
    id: "market",
    name: "Live Market Intelligence Feed",
    category: "Trading",
    description: "Real-time LIFFE feed wheat futures, regional mart livestock reports, and forward contract target alerts.",
    monthlyPrice: 19,
    icon: TrendingUp,
  },
  {
    id: "expert-priority",
    name: "Priority Accredited Expert Access",
    category: "Human Network",
    description: "Guaranteed 2-hour callback SLA from BASIS agronomists, RCVS farm vets, and rural accountants.",
    monthlyPrice: 39,
    icon: Headphones,
  },
];

const FAQS = [
  {
    q: "Can I cancel or change my plan anytime?",
    a: "Yes. Steward operates on a simple, transparent monthly rolling subscription with no long-term lock-in. You can upgrade, downgrade, add/remove modules, or cancel your subscription at any point directly from your farm settings.",
  },
  {
    q: "Does Steward ever submit regulatory forms without my approval?",
    a: "Never. Under our strict Agentic Autonomy framework, Steward only acts autonomously on low-risk background reminders. All statutory declarations (Defra SFI claims, BCMS livestock movements, Red Tractor audit exports) are drafted for you, and require your explicit one-tap review and approval before submission.",
  },
  {
    q: "What if I farm more than one type of enterprise (e.g. arable and sheep)?",
    a: "Your base subscription includes full access to all four advisor specialisms (Tom Campbell for arable, Fiona MacLeod for livestock, Alistair Reid for mixed farms, and Eleanor Wright for dairy). You can consult all of them freely across your different fields and enterprises without any extra charge.",
  },
  {
    q: "Is my farm data secure and private?",
    a: "Absolutely. You own 100% of your farm data. We operate under strict UK GDPR standards and host all data within secure UK data centres. We will never sell or monetise your yield numbers, stocking densities, or subsidy payments to grain traders, chemical suppliers, or machinery manufacturers.",
  },
  {
    q: "How does billing work if I manage multiple holdings or separate SBIs?",
    a: "Each standard subscription covers a primary farm holding and its associated parcels. If you manage multiple distinct holdings under separate Single Business Identifiers (SBIs) or manage client farms as a contractor, we offer multi-holding estate discounts. Contact our team for multi-holding pricing.",
  },
  {
    q: "What happens when my 30-day free trial ends?",
    a: "During your 30-day trial, you have complete access to the full advisor suite and your selected add-ons. No credit card is required to start. When the trial concludes, you can choose to enter payment details to continue, or your account will gently pause without any surprise charges.",
  },
];

export function PricingClient() {
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["concierge"]);
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addonsTotalMonthly = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.monthlyPrice : 0);
  }, 0);

  const baseMonthly = BASE_PLAN.monthlyPrice;
  const rawTotalMonthly = baseMonthly + addonsTotalMonthly;
  
  // 15% discount on annual
  const finalPrice = isAnnual
    ? Math.round(rawTotalMonthly * 0.85)
    : rawTotalMonthly;

  const signupUrl = `/signup?plan=advisor&annual=${isAnnual}&addons=${selectedAddons.join(",")}`;

  return (
    <div className="flex flex-col">
      {/* HEADER */}
      <section className="pt-28 pb-14 bg-parchment-100 border-b border-parchment-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="forest">Transparent Farm Pricing</Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-forest-900 leading-tight">
            One subscription per farm.{" "}
            <span className="italic font-normal text-terracotta-700 underline decoration-gold-400 decoration-1 underline-offset-4">
              Add only what you need.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-charcoal-700 leading-relaxed max-w-2xl mx-auto">
            Every farm gets our complete core advisory suite. Configure your bespoke plan with optional modules tailored to your machinery, imagery, and specialist support needs.
          </p>

          {/* Billing Interval Switcher */}
          <div className="pt-6 flex items-center justify-center space-x-4">
            <span className={cn("text-sm font-medium", !isAnnual ? "text-forest-900 font-bold" : "text-charcoal-600")}>
              Monthly Billing
            </span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className={cn(
                "relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-forest-700",
                isAnnual ? "bg-forest-800" : "bg-parchment-300"
              )}
              role="switch"
              aria-checked={isAnnual}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out",
                  isAnnual ? "translate-x-7" : "translate-x-0"
                )}
              />
            </button>
            <div className="flex items-center space-x-1.5">
              <span className={cn("text-sm font-medium", isAnnual ? "text-forest-900 font-bold" : "text-charcoal-600")}>
                Annual Billing
              </span>
              <span className="text-[10px] uppercase tracking-wider font-bold bg-gold-200 text-gold-900 px-2 py-0.5 rounded-full border border-gold-400">
                Save 15%
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* BASE SUBSCRIPTION CARD */}
      <Section variant="white" containerSize="lg">
        <div className="max-w-4xl mx-auto">
          <Card
            variant="linen"
            className="p-8 sm:p-10 border-2 border-forest-800 shadow-warm-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-forest-800 text-parchment-50 px-5 py-1 text-xs font-serif font-bold uppercase tracking-widest rounded-bl-lg border-l border-b border-forest-900 shadow-sm">
              Core Holding Plan
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center space-x-2">
                  <Badge variant="forest" size="sm">The Complete Foundation</Badge>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-900">
                  {BASE_PLAN.name}
                </h2>
                <p className="text-sm text-charcoal-700 leading-relaxed">
                  {BASE_PLAN.tagline}
                </p>

                <div className="pt-4 space-y-2.5">
                  <p className="text-xs uppercase font-serif font-bold text-charcoal-900 tracking-wider">
                    Included in your base subscription:
                  </p>
                  <ul className="grid grid-cols-1 gap-2 text-xs sm:text-sm text-charcoal-800">
                    {BASE_PLAN.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 text-forest-700 mr-2.5 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price Callout */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-parchment-50 p-6 rounded-xl border border-parchment-300 space-y-6 text-center">
                <div className="space-y-2">
                  <span className="text-xs text-charcoal-500 uppercase tracking-widest font-serif font-semibold">
                    Base Farm Subscription
                  </span>
                  <div>
                    <span className="text-4xl sm:text-5xl font-serif font-bold text-forest-900">
                      £{isAnnual ? Math.round(BASE_PLAN.monthlyPrice * 0.85) : BASE_PLAN.monthlyPrice}
                    </span>
                    <span className="text-xs text-charcoal-600 block sm:inline sm:ml-1">
                      / month per farm
                    </span>
                  </div>
                  <p className="text-[11px] text-charcoal-500 italic">
                    *Placeholder pricing for demonstration — adjustable per farm size
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-parchment-300 text-xs text-charcoal-600">
                  <div className="flex items-center justify-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-forest-700" />
                    <span>30-Day Free Trial</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Check className="w-4 h-4 text-forest-700" />
                    <span>No credit card required upfront</span>
                  </div>
                </div>

                <Button href={signupUrl} variant="primary" size="lg" className="w-full">
                  Start Free Trial &rarr;
                </Button>
              </div>

            </div>
          </Card>
        </div>
      </Section>

      {/* INTERACTIVE ADD-ON CONFIGURATOR */}
      <Section
        variant="parchment"
        badge={<Badge variant="terracotta">Customise Your Setup</Badge>}
        title="Build your plan: Select optional add-ons."
        subtitle="Only pay for the specialized tools and workflows your holding requires. Toggle add-ons below to see live price adjustments."
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
                    "p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm",
                    isChecked
                      ? "bg-white border-forest-700 ring-1 ring-forest-700/20"
                      : "bg-[#FDFCF9] border-parchment-300 hover:border-forest-400 opacity-90"
                  )}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                        isChecked
                          ? "bg-forest-800 border-forest-900 text-parchment-50"
                          : "bg-white border-parchment-400"
                      )}
                    >
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-serif font-bold text-forest-950 text-base">
                          {addon.name}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-600 bg-parchment-200 px-2 py-0.5 rounded">
                          {addon.category}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-600 leading-relaxed max-w-xl">
                        {addon.description}
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right pl-10 sm:pl-0 flex-shrink-0">
                    <span className="text-lg font-serif font-bold text-forest-900">
                      +£{price}
                    </span>
                    <span className="text-xs text-charcoal-500 block">/ month</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Summary Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <Card variant="linen" className="border-2 border-parchment-300 shadow-warm-lg p-6 space-y-6">
              
              <div className="border-b border-parchment-300 pb-4">
                <h3 className="font-serif font-bold text-xl text-forest-900">
                  Your Configured Plan
                </h3>
                <p className="text-xs text-charcoal-600 mt-0.5">
                  {isAnnual ? "Annual billing (15% savings applied)" : "Monthly rolling subscription"}
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-xs text-charcoal-700">
                <div className="flex justify-between items-center py-1">
                  <span className="font-medium">Steward Advisor Core Plan</span>
                  <span className="font-mono font-semibold">
                    £{isAnnual ? Math.round(baseMonthly * 0.85) : baseMonthly}/mo
                  </span>
                </div>

                {selectedAddons.length > 0 ? (
                  <div className="space-y-1.5 pt-2 border-t border-parchment-200">
                    <span className="font-serif font-bold text-charcoal-900 text-[11px] uppercase tracking-wider block">
                      Selected Add-ons ({selectedAddons.length}):
                    </span>
                    {selectedAddons.map((id) => {
                      const addon = ADDONS.find((a) => a.id === id);
                      if (!addon) return null;
                      const price = isAnnual
                        ? Math.round(addon.monthlyPrice * 0.85)
                        : addon.monthlyPrice;
                      return (
                        <div key={id} className="flex justify-between items-center text-charcoal-600 pl-2">
                          <span className="truncate max-w-[180px]">&bull; {addon.name}</span>
                          <span className="font-mono">+£{price}/mo</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-2 text-[11px] text-charcoal-500 italic">
                    No optional add-ons selected.
                  </div>
                )}

                <div className="pt-4 border-t-2 border-forest-800 flex justify-between items-baseline">
                  <div>
                    <span className="font-serif font-bold text-base text-forest-900 block">
                      Total Monthly Investment:
                    </span>
                    <span className="text-[10px] text-charcoal-500">
                      Billed {isAnnual ? "annually" : "monthly"} &bull; Excl. VAT
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-serif font-bold text-forest-900">
                      £{finalPrice}
                    </span>
                    <span className="text-xs text-charcoal-600 block">/ month</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-2">
                <Button href={signupUrl} variant="gold" size="lg" className="w-full">
                  Start 30-Day Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-[10px] text-charcoal-500 text-center">
                  Includes full access to selected add-ons during trial period.
                </p>
              </div>

            </Card>
          </div>

        </div>
      </Section>

      {/* FAQ SECTION */}
      <Section
        variant="white"
        badge={<Badge variant="forest">Common Questions</Badge>}
        title="Frequently Asked Questions"
        subtitle="Clear answers on subscriptions, autonomy boundaries, and farm data security."
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-parchment-300 bg-parchment-50 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between space-x-4 focus:outline-none focus:ring-2 focus:ring-forest-700"
                >
                  <span className="font-serif font-bold text-base text-forest-900">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-forest-700 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-charcoal-500 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-charcoal-700 leading-relaxed border-t border-parchment-300/80 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center text-xs text-charcoal-600 space-y-2">
          <p>
            Have a custom estate structure or partnership holding?
          </p>
          <a
            href="mailto:enquiries@steward.co.uk"
            className="text-terracotta-700 font-semibold hover:underline"
          >
            Speak with our agricultural onboarding team &rarr;
          </a>
        </div>
      </Section>
    </div>
  );
}
