"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Sprout, CheckCircle2, ShieldCheck, ArrowRight, Wheat, Footprints, Trees, Milk, Cpu, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function SignupClient() {
  const searchParams = useSearchParams();
  const initialAddons = searchParams.get("addons")?.split(",").filter(Boolean) || [];

  const [farmType, setFarmType] = useState("arable");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-obsidian-950 text-obsidian-100 flex flex-col justify-center bg-tactical-grid">
      <div className="max-w-xl mx-auto w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2">
            <Badge variant="volt">[30-DAY PILOT // FULL SPECIFICATION]</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-obsidian-50 tracking-tight">
            Initialise Farm Profile
          </h1>
          <p className="text-xs sm:text-sm text-obsidian-300 font-mono">
            Connect your holding with your dedicated specialist advisor in under 300 seconds.
          </p>
          {initialAddons.length > 0 && (
            <div className="pt-1">
              <span className="text-xs font-mono font-semibold text-gold-400 bg-gold-500/10 px-3 py-1 rounded-tech border border-gold-500/30 inline-block">
                Configured with {initialAddons.length} premium enterprise modules
              </span>
            </div>
          )}
        </div>

        {submitted ? (
          <div className="hud-panel p-8 text-center space-y-4 border border-volt-500/40 bg-obsidian-900/95 shadow-hud">
            <div className="w-12 h-12 rounded-full bg-volt-500/10 text-volt-400 border border-volt-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 text-volt-400" />
            </div>
            <h2 className="text-2xl font-serif font-medium text-obsidian-100">
              Holding Profile Initialised
            </h2>
            <p className="text-sm text-obsidian-300 leading-relaxed max-w-md mx-auto font-mono text-xs">
              Your farm profile has been initiated. Ingesting regional RPA Ordnance Survey parcels and preparing baseline SFI 2026 eligibility metrics.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href="/dashboard" variant="volt" size="md">
                Launch Command Cockpit &rarr;
              </Button>
              <Button href="/advisors" variant="outline" size="md" className="border-obsidian-700 text-obsidian-300 hover:bg-obsidian-850">
                View Assigned Advisor
              </Button>
            </div>
          </div>
        ) : (
          <div className="hud-panel p-6 sm:p-8 shadow-hud border border-obsidian-700 bg-obsidian-900/95">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Farm Type Selection */}
              <div>
                <label className="block text-xs font-mono font-bold text-obsidian-300 uppercase tracking-wider mb-2">
                  Select Primary Enterprise
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "arable", label: "Arable", icon: Wheat },
                    { id: "livestock", label: "Livestock", icon: Footprints },
                    { id: "mixed", label: "Mixed", icon: Trees },
                    { id: "dairy", label: "Dairy", icon: Milk },
                  ].map((type) => {
                    const Icon = type.icon;
                    const isSelected = farmType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFarmType(type.id)}
                        className={cn(
                          "p-2.5 rounded-tech border text-xs font-mono flex flex-col items-center justify-center space-y-1 transition-all uppercase tracking-wider",
                          isSelected
                            ? "bg-obsidian-950 text-volt-400 border-volt-400 shadow-[0_0_10px_rgba(0,230,118,0.2)]"
                            : "bg-obsidian-950/60 text-obsidian-400 border-obsidian-800 hover:border-obsidian-700 hover:text-obsidian-200"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Farm Name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-obsidian-300 uppercase tracking-wider mb-1">
                    Holding / Farm Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Highfield Grange Farm"
                    className="w-full px-3.5 py-2.5 rounded-tech bg-obsidian-950 border border-obsidian-800 text-sm text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:border-volt-400 focus:ring-1 focus:ring-volt-400 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-obsidian-300 uppercase tracking-wider mb-1">
                    Postcode / Parish
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. LN4 2AX"
                    className="w-full px-3.5 py-2.5 rounded-tech bg-obsidian-950 border border-obsidian-800 text-sm text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:border-volt-400 focus:ring-1 focus:ring-volt-400 font-mono text-xs"
                  />
                </div>
              </div>

              {/* SBI & Acreage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-obsidian-300 uppercase tracking-wider mb-1">
                    SBI Identifier (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 106789421"
                    className="w-full px-3.5 py-2.5 rounded-tech bg-obsidian-950 border border-obsidian-800 text-sm text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:border-volt-400 focus:ring-1 focus:ring-volt-400 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-obsidian-300 uppercase tracking-wider mb-1">
                    Acreage / Hectares
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 450 ha"
                    className="w-full px-3.5 py-2.5 rounded-tech bg-obsidian-950 border border-obsidian-800 text-sm text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:border-volt-400 focus:ring-1 focus:ring-volt-400 font-mono text-xs"
                  />
                </div>
              </div>

              {/* Farmer Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-obsidian-300 uppercase tracking-wider mb-1">
                    Principal Operator Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Peter Currey"
                    className="w-full px-3.5 py-2.5 rounded-tech bg-obsidian-950 border border-obsidian-800 text-sm text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:border-volt-400 focus:ring-1 focus:ring-volt-400 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-obsidian-300 uppercase tracking-wider mb-1">
                    Email Telemetry Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="peter@curreyfarming.co.uk"
                    className="w-full px-3.5 py-2.5 rounded-tech bg-obsidian-950 border border-obsidian-800 text-sm text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:border-volt-400 focus:ring-1 focus:ring-volt-400 font-mono text-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="volt" size="lg" className="w-full">
                  Deploy 30-Day Holding Pilot
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="pt-2 flex items-center justify-center space-x-4 text-xs font-mono text-obsidian-400">
                <span className="flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-volt-400 mr-1" />
                  Zero Card Required
                </span>
                <span>&bull;</span>
                <span>Cancel Anytime</span>
                <span>&bull;</span>
                <span>UK GDPR Sovereign</span>
              </div>
            </form>
          </div>
        )}

        <div className="text-center text-xs font-mono text-obsidian-400">
          Existing registered holding?{" "}
          <Link href="/login" className="text-volt-400 hover:underline">
            Sign in to farm cockpit &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
