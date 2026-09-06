import React from "react";
import { Lock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SubscriptionAddon } from "@/lib/types";
import { ADDON_CATALOG } from "@/lib/constants/addons";

interface AddonUpsellCardProps {
  addonKey: SubscriptionAddon;
  farmName?: string;
}

export function AddonUpsellCard({ addonKey, farmName = "your holding" }: AddonUpsellCardProps) {
  const addon = ADDON_CATALOG[addonKey];
  if (!addon) return null;

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="p-8 sm:p-10 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div className="space-y-3">
              <Badge variant="forest" size="md">
                <Lock className="w-3 h-3 mr-1.5" />
                Premium Add-on
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                {addon.title}
              </h2>
              <p className="text-sm text-slate-500 max-w-xl leading-relaxed">
                {addon.description}
              </p>
            </div>

            <div className="flex-shrink-0 text-right bg-slate-50 px-6 py-4 rounded-xl border border-slate-200 min-w-[140px]">
              <span className="text-3xl font-bold text-slate-900">
                £{addon.priceMonthly}
              </span>
              <span className="text-xs text-slate-400 block mt-1 font-medium">
                per month
              </span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="p-8 sm:p-10 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Included with this add-on
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {addon.features.map((feat, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-700">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-8 sm:px-10 pb-8 sm:pb-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-400">
            No long-term commitment · Cancel any time · Immediate activation
          </p>
          <Button href="/dashboard/billing" variant="primary" size="lg">
            Activate for {farmName}
          </Button>
        </div>

      </div>
    </div>
  );
}
