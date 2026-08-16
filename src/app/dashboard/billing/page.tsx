"use client";

import React, { useState } from "react";
import {
  CreditCard,
  CheckCircle2,
  Lock,
  Plus,
  ShieldCheck,
  Zap,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { ADDON_CATALOG } from "@/lib/constants/addons";
import { SubscriptionAddon } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function BillingPage() {
  const { farm } = useAuth();
  const [activeAddons, setActiveAddons] = useState<SubscriptionAddon[]>([
    "fleet_management",
    "satellite_imagery",
  ]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const basePrice = 89; // £89/mo base advisor
  const addonsTotal = activeAddons.reduce(
    (sum, key) => sum + (ADDON_CATALOG[key]?.priceMonthly || 0),
    0
  );
  const monthlyTotal = basePrice + addonsTotal;

  const handleToggleAddon = (key: SubscriptionAddon) => {
    setActiveAddons((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="border-b border-parchment-300 pb-4 space-y-1">
        <Badge variant="forest">Subscription &amp; Premium Modules</Badge>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900">
          Billing &amp; Add-on Entitlements
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600">
          Manage your holding&apos;s subscription plan, activate à la carte modules, and download VAT receipts.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-lg bg-forest-100 border border-forest-300 text-forest-900 flex items-center space-x-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-forest-700 flex-shrink-0" />
          <span>Subscription entitlements updated. Features active immediately.</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Add-ons List */}
        <div className="lg:col-span-8 space-y-4">
          <h2 className="font-serif font-bold text-lg text-forest-900">
            Available À La Carte Add-ons
          </h2>

          <div className="space-y-3">
            {(Object.keys(ADDON_CATALOG) as SubscriptionAddon[]).map((key) => {
              const addon = ADDON_CATALOG[key];
              const isActive = activeAddons.includes(key);

              return (
                <div
                  key={key}
                  className={cn(
                    "p-5 rounded-xl border-2 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
                    isActive
                      ? "bg-white border-forest-800 shadow-sm"
                      : "bg-parchment-50 border-parchment-300 opacity-80 hover:opacity-100"
                  )}
                >
                  <div className="space-y-1 max-w-md">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-serif font-bold text-sm sm:text-base text-forest-950">
                        {addon.title}
                      </h3>
                      {isActive && (
                        <span className="text-[10px] uppercase font-bold tracking-wider bg-forest-100 text-forest-800 px-2 py-0.5 rounded">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-charcoal-600 leading-relaxed">
                      {addon.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-parchment-200">
                    <div className="text-left sm:text-right">
                      <span className="font-serif font-bold text-sm text-forest-900 block">
                        £{addon.priceMonthly}
                      </span>
                      <span className="text-[10px] text-charcoal-400">/month</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleAddon(key)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-md text-xs font-semibold transition-colors",
                        isActive
                          ? "bg-parchment-200 text-charcoal-700 hover:bg-red-50 hover:text-red-700"
                          : "bg-forest-800 text-parchment-50 hover:bg-forest-900"
                      )}
                    >
                      {isActive ? "Deactivate" : "Activate Add-on"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sticky Summary & Checkout Stub */}
        <div className="lg:col-span-4 space-y-6">
          <Card variant="linen" className="p-6 space-y-5 shadow-warm border-2 border-forest-800">
            <h3 className="font-serif font-bold text-forest-900 text-base border-b border-parchment-200 pb-2">
              Subscription Summary
            </h3>

            <div className="space-y-2.5 text-xs text-charcoal-700">
              <div className="flex justify-between">
                <span>Steward Advisor Core Plan:</span>
                <span className="font-semibold">£{basePrice}/mo</span>
              </div>

              {activeAddons.map((key) => (
                <div key={key} className="flex justify-between text-forest-800">
                  <span className="truncate max-w-[170px]">&bull; {ADDON_CATALOG[key].title}</span>
                  <span className="font-semibold">+£{ADDON_CATALOG[key].priceMonthly}</span>
                </div>
              ))}

              <div className="pt-3 border-t border-parchment-300 flex justify-between text-sm font-serif font-bold text-forest-950">
                <span>Monthly Investment:</span>
                <span className="text-base">£{monthlyTotal} + VAT</span>
              </div>
            </div>

            <Button
              type="button"
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => alert("Stripe Billing Portal: Payment method active. Invoices billed monthly on 1st.")}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Manage Stripe Billing
            </Button>

            <div className="pt-2 text-[11px] text-charcoal-500 space-y-1.5 border-t border-parchment-200">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-forest-700 flex-shrink-0" />
                <span>Billed in GBP via Stripe Payments UK</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 flex-shrink-0" />
                <span>HMRC compliant VAT invoice on file</span>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
