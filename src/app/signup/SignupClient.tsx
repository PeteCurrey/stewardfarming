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
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-parchment-100 flex flex-col justify-center">
      <div className="max-w-xl mx-auto w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <Badge variant="forest">30-Day Free Trial</Badge>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-forest-900">
            Set up your farm profile.
          </h1>
          <p className="text-sm sm:text-base text-charcoal-700">
            Connect with your personalised AI advisor in under five minutes. No credit card required.
          </p>
          {initialAddons.length > 0 && (
            <div className="pt-1">
              <span className="text-xs font-serif font-semibold text-terracotta-700 bg-terracotta-50 px-3 py-1 rounded-full border border-terracotta-200 inline-block">
                Configured with {initialAddons.length} selected add-on modules
              </span>
            </div>
          )}
        </div>

        {submitted ? (
          <Card variant="linen" className="text-center p-8 space-y-4 border-2 border-forest-600 shadow-warm-lg">
            <div className="w-12 h-12 rounded-full bg-forest-800 text-parchment-50 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-gold-400" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-forest-900">
              Welcome to Steward
            </h2>
            <p className="text-sm text-charcoal-700 leading-relaxed max-w-md mx-auto">
              Your farm profile has been initiated. We are fetching your regional RPA parcel boundaries and preparing your initial SFI eligibility summary.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
              <Button href="/" variant="primary" size="md">
                Return to Homepage
              </Button>
              <Button href="/advisors" variant="outline" size="md">
                View Your Advisor
              </Button>
            </div>
          </Card>
        ) : (
          <Card variant="linen" className="p-6 sm:p-8 shadow-warm-lg border border-parchment-300">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Farm Type Selection */}
              <div>
                <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-2">
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
                          "p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center justify-center space-y-1 transition-all",
                          isSelected
                            ? "bg-forest-800 text-parchment-50 border-forest-900 shadow-sm"
                            : "bg-white text-charcoal-700 border-parchment-300 hover:bg-parchment-200"
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
                  <label className="block text-xs font-medium text-charcoal-700 mb-1">
                    Holding / Farm Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Highfield Grange Farm"
                    className="w-full px-3.5 py-2 rounded-md bg-white border border-parchment-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-charcoal-700 mb-1">
                    Postcode / Parish
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. LN4 2AX"
                    className="w-full px-3.5 py-2 rounded-md bg-white border border-parchment-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>
              </div>

              {/* SBI & Acreage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-charcoal-700 mb-1">
                    SBI Number (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 106789421"
                    className="w-full px-3.5 py-2 rounded-md bg-white border border-parchment-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-charcoal-700 mb-1">
                    Approximate Acreage
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 450 acres"
                    className="w-full px-3.5 py-2 rounded-md bg-white border border-parchment-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>
              </div>

              {/* Farmer Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-charcoal-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Campbell"
                    className="w-full px-3.5 py-2 rounded-md bg-white border border-parchment-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-charcoal-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@campbellfarming.co.uk"
                    className="w-full px-3.5 py-2 rounded-md bg-white border border-parchment-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Start 30-Day Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="pt-2 flex items-center justify-center space-x-4 text-xs text-charcoal-500">
                <span className="flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-forest-700 mr-1" />
                  No card required
                </span>
                <span>&bull;</span>
                <span>Cancel anytime</span>
                <span>&bull;</span>
                <span>UK GDPR Compliant</span>
              </div>
            </form>
          </Card>
        )}

        <div className="text-center text-xs text-charcoal-600">
          Already registered?{" "}
          <Link href="/signup" className="text-forest-800 font-semibold underline">
            Sign in to your farm holding
          </Link>
        </div>

      </div>
    </div>
  );
}
