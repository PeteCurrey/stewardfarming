import type { Metadata } from "next";
import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Terms & Conditions of Service",
  description:
    "Terms governing the use of Steward's UK farming advisory platform, decision-support boundaries, and farmer approval requirements.",
  openGraph: {
    title: "Terms of Service — Steward UK Farming Advisory",
    description: "Terms and conditions for Steward agricultural decision-support software.",
    url: "https://steward.co.uk/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col">
      <section className="pt-16 pb-12 bg-parchment-100 border-b border-parchment-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="forest">Terms of Service</Badge>
          <h1 className="text-4xl font-serif font-bold text-forest-900">Terms &amp; Conditions</h1>
          <p className="text-sm text-charcoal-600">Last updated: August 2026</p>
        </div>
      </section>

      <Section variant="white">
        <div className="max-w-3xl mx-auto space-y-6 text-sm text-charcoal-700 leading-relaxed">
          <h2 className="text-xl font-serif font-bold text-forest-900">1. Introduction &amp; Service Scope</h2>
          <p>
            These Terms govern your use of the Steward platform provided by Steward Agricultural Technologies Ltd. Steward delivers decision support, predictive modelling, and administrative automation for UK agricultural businesses.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest-900">2. Advisory Nature &amp; Farmer Final Approval</h2>
          <p>
            Steward acts as an intelligent decision-support tool. All regulatory submissions (including Defra SFI applications, BCMS movement records, and Red Tractor audit filings) remain subject to final verification and formal approval by the designated farm holding manager.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest-900">3. Subscription &amp; Cancellation</h2>
          <p>
            Subscriptions are billed on a monthly rolling basis. You may cancel your subscription at any time with no penalty, with service continuing until the end of your current billing cycle.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest-900">4. Applicable Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of England &amp; Wales.
          </p>
        </div>
      </Section>
    </div>
  );
}
