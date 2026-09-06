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
    <div className="flex flex-col bg-white text-slate-900">
      <section className="pt-32 pb-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <Badge variant="forest">Legal &amp; Governance</Badge>
          <h1 className="text-4xl font-serif font-medium text-slate-900 tracking-tight">
            Terms &amp; Conditions of Service
          </h1>
          <p className="text-xs text-slate-500">Last updated: August 2026 &bull; Jurisdiction: England &amp; Wales</p>
        </div>
      </section>

      <Section variant="white">
        <div className="max-w-3xl mx-auto space-y-6 text-sm text-slate-600 leading-relaxed">
          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h2 className="text-base font-semibold text-slate-900">1. Introduction &amp; Service Scope</h2>
            <p>
              These Terms govern your use of the Steward platform provided by Steward Agricultural Technologies Ltd. Steward delivers decision support, predictive modelling, and administrative automation for UK agricultural businesses.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h2 className="text-base font-semibold text-slate-900">2. Advisory Nature &amp; Farmer Final Approval Safeguards</h2>
            <p>
              Steward operates strictly as an intelligent decision-support system bounded by our Traffic-Light Autonomy framework. All statutory submissions (including Defra SFI applications, BCMS cattle movement logs, and Red Tractor audit filings) remain subject to final verification and formal 1-tap sign-off by the registered holding manager. Steward will never bind your farm legally or financially without explicit approval.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h2 className="text-base font-semibold text-slate-900">3. Subscriptions &amp; Cancellation</h2>
            <p>
              Subscriptions are billed on a monthly rolling or discounted annual basis. You may cancel your subscription at any point with zero exit penalties, maintaining complete access until the end of your billing interval.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h2 className="text-base font-semibold text-slate-900">4. Applicable Jurisdiction</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of England &amp; Wales.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
