import React from "react";
import Link from "next/link";
import { Lock, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
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
    <div className="py-8 max-w-4xl mx-auto space-y-6">
      <Card variant="linen" className="p-8 sm:p-10 border-2 border-gold-400/80 shadow-warm-lg space-y-6 text-center sm:text-left">
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 border-b border-parchment-300 pb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 justify-center sm:justify-start">
              <Badge variant="gold" size="md">
                <Lock className="w-3.5 h-3.5 mr-1" />
                Premium Add-on Required
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900">
              {addon.title}
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 max-w-xl">
              {addon.description}
            </p>
          </div>

          <div className="text-center sm:text-right flex-shrink-0 bg-parchment-50 p-4 rounded-xl border border-parchment-300">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-forest-900">
              £{addon.priceMonthly}
            </span>
            <span className="text-xs text-charcoal-500 block">/month per farm</span>
          </div>
        </div>

        {/* Feature bullets */}
        <div className="space-y-3">
          <h3 className="font-serif font-bold text-sm text-forest-900">
            Included in this module:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-charcoal-700">
            {addon.features.map((feat, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-forest-700 mt-0.5 flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action button */}
        <div className="pt-4 border-t border-parchment-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-charcoal-500">
            No long contracts &bull; Cancel or change add-ons anytime in holding settings
          </span>
          <Button href="/dashboard/billing" variant="primary" size="lg">
            Activate for {farmName} &rarr;
          </Button>
        </div>

      </Card>
    </div>
  );
}
