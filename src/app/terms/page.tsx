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
    <div className="flex flex-col bg-obsidian-950 text-obsidian-100 min-h-screen">
      <section className="pt-32 pb-16 border-b border-obsidian-800 bg-tactical-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="gold">[STATUTORY COVENANT // LEGAL]</Badge>
          <h1 className="text-4xl font-serif font-normal text-obsidian-50 tracking-tight">Terms &amp; Conditions of Service</h1>
          <p className="text-xs font-mono text-obsidian-400">LAST RATIFIED: AUGUST 2026 // JURISDICTION: ENGLAND &amp; WALES</p>
        </div>
      </section>

      <Section variant="obsidian">
        <div className="max-w-3xl mx-auto space-y-8 text-sm text-obsidian-300 leading-relaxed font-sans">
          <div className="hud-panel p-6 border border-obsidian-800 bg-obsidian-900/80 space-y-4">
            <h2 className="text-lg font-serif font-medium text-obsidian-100">1. Introduction &amp; Service Scope</h2>
            <p>
              These Terms govern your use of the Steward platform provided by Steward Agricultural Technologies Ltd. Steward delivers decision support, predictive modelling, and administrative automation for UK agricultural businesses.
            </p>
          </div>

          <div className="hud-panel p-6 border border-obsidian-800 bg-obsidian-900/80 space-y-4">
            <h2 className="text-lg font-serif font-medium text-obsidian-100">2. Advisory Nature &amp; Farmer Final Approval Safeguards</h2>
            <p>
              Steward operates strictly as an intelligent decision-support system bounded by our Traffic-Light Autonomy framework. All statutory submissions (including Defra SFI applications, BCMS cattle movement logs, and Red Tractor audit filings) remain subject to final verification and formal 1-tap sign-off by the registered holding manager. Steward will never bind your farm legally or financially without explicit approval.
            </p>
          </div>

          <div className="hud-panel p-6 border border-obsidian-800 bg-obsidian-900/80 space-y-4">
            <h2 className="text-lg font-serif font-medium text-obsidian-100">3. Subscriptions &amp; Cancellation Freedom</h2>
            <p>
              Subscriptions are billed on a monthly rolling or discounted annual basis. You may cancel your subscription at any point with zero exit penalties, maintaining complete access until the end of your billing interval.
            </p>
          </div>

          <div className="hud-panel p-6 border border-obsidian-800 bg-obsidian-900/80 space-y-4">
            <h2 className="text-lg font-serif font-medium text-obsidian-100">4. Applicable Jurisdiction</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of England &amp; Wales.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
