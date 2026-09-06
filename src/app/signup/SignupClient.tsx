"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Sprout, CheckCircle2, ShieldCheck, ArrowRight, Wheat, Footprints, Trees, Milk } from "lucide-react";
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
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 flex flex-col justify-center">
      <div className="max-w-xl mx-auto w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2.5 mb-2">
            <div className="w-10 h-10 rounded-lg bg-forest-900 flex items-center justify-center text-white shadow-sm">
              <Sprout className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="font-serif text-2xl font-bold text-slate-900">Steward</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-slate-900">
            Start Your 30-Day Free Trial
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Connect your holding with your dedicated specialist advisor in under 5 minutes.
          </p>
          {initialAddons.length > 0 && (
            <div className="pt-1">
              <span className="text-xs font-medium text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block">
                Configured with {initialAddons.length} optional add-on modules
              </span>
            </div>
          )}
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-medium text-slate-900">
              Holding Profile Initialised
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Your farm profile has been initiated. Ingesting regional RPA Ordnance Survey parcels and preparing baseline SFI 2026 eligibility metrics.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href="/dashboard" variant="primary" size="md">
                Launch Dashboard &rarr;
              </Button>
              <Button href="/advisors" variant="secondary" size="md">
                View Assigned Advisor
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Farm Type Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
                  Select Primary Farm Type
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
                          "p-3 rounded-lg border text-xs font-medium flex flex-col items-center justify-center space-y-1 transition-all",
                          isSelected
                            ? "bg-forest-900 text-white border-forest-950 shadow-sm"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
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
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Holding / Farm Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Highfield Grange Farm"
                    className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-forest-700 focus:border-forest-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Postcode / Parish
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. LN4 2AX"
                    className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-forest-700 focus:border-forest-700"
                  />
                </div>
              </div>

              {/* SBI & Acreage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    SBI Number (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 106789421"
                    className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-forest-700 focus:border-forest-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Approximate Acreage
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 450 ha"
                    className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-forest-700 focus:border-forest-700"
                  />
                </div>
              </div>

              {/* Farmer Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Peter Currey"
                    className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-forest-700 focus:border-forest-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="peter@curreyfarming.co.uk"
                    className="w-full px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-forest-700 focus:border-forest-700"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Start 30-Day Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="pt-2 flex items-center justify-center space-x-4 text-xs text-slate-500">
                <span className="flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                  No card required
                </span>
                <span>&bull;</span>
                <span>Cancel anytime</span>
                <span>&bull;</span>
                <span>UK GDPR sovereign</span>
              </div>
            </form>
          </div>
        )}

        <div className="text-center text-xs text-slate-600">
          Already registered?{" "}
          <Link href="/login" className="text-forest-800 hover:underline font-semibold">
            Sign in to your holding &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
