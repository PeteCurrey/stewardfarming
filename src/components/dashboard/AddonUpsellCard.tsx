import React from "react";
import Link from "next/link";
import { Lock, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
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
      <Card variant="hud-gold" cornerTicks className="p-8 sm:p-10 shadow-2xl space-y-6 text-center sm:text-left relative">
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 justify-center sm:justify-start">
              <Badge variant="gold" size="md">
                <Lock className="w-3.5 h-3.5 mr-1 text-gold-coutts" />
                PREMIUM SUBSYSTEM REQUIRED
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {addon.title}
            </h2>
            <p className="text-xs sm:text-sm text-parchment-300 max-w-xl font-sans leading-relaxed">
              {addon.description}
            </p>
          </div>

          <div className="text-center sm:text-right flex-shrink-0 bg-obsidian-950 p-4 rounded-panel border border-gold-coutts/30">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-gold-coutts">
              £{addon.priceMonthly}
            </span>
            <span className="text-[11px] font-mono text-parchment-400 block mt-0.5">/MONTH PER HOLDING</span>
          </div>
        </div>

        {/* Feature bullets */}
        <div className="space-y-3">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
            ENGINEERING CAPABILITIES INCLUDED:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-parchment-200 font-sans">
            {addon.features.map((feat, idx) => (
              <div key={idx} className="flex items-start space-x-2 bg-obsidian-950 p-3 rounded-tech border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-volt mt-0.5 flex-shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action button */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-mono text-parchment-400">
            Zero lock-in &bull; Instant holding telemetry activation
          </span>
          <Button href="/dashboard/billing" variant="gold" size="lg">
            Activate for {farmName} &rarr;
          </Button>
        </div>

      </Card>
    </div>
  );
}
