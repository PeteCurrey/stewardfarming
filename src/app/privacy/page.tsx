import type { Metadata } from "next";
import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Privacy Policy & Agricultural Data Protection",
  description:
    "Steward's commitment to UK farm data sovereignty. We operate under UK GDPR and Data Protection Act 2018 with zero commercial sharing of yield or financial records.",
  openGraph: {
    title: "Privacy Policy — Steward UK Farming Advisory",
    description: "Agricultural data sovereignty and protection policies for UK farm holdings.",
    url: "https://steward.co.uk/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col bg-obsidian-950 text-obsidian-100 min-h-screen">
      <section className="pt-32 pb-16 border-b border-obsidian-800 bg-tactical-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="gold">[DATA SOVEREIGNTY // LEGAL]</Badge>
          <h1 className="text-4xl font-serif font-normal text-obsidian-50 tracking-tight">Privacy &amp; Data Protection Policy</h1>
          <p className="text-xs font-mono text-obsidian-400">LAST RATIFIED: AUGUST 2026 // UK GDPR COMPLIANT</p>
        </div>
      </section>

      <Section variant="obsidian">
        <div className="max-w-3xl mx-auto space-y-8 text-sm text-obsidian-300 leading-relaxed font-sans">
          <div className="hud-panel p-6 border border-obsidian-800 bg-obsidian-900/80 space-y-4">
            <h2 className="text-lg font-serif font-medium text-obsidian-100">1. Our Commitment to UK Agricultural Sovereignty</h2>
            <p>
              Steward Agricultural Technologies Ltd is registered in England &amp; Wales. We respect your privacy and are committed to protecting your personal and agricultural holding data under the UK GDPR and the Data Protection Act 2018.
            </p>
          </div>

          <div className="hud-panel p-6 border border-obsidian-800 bg-obsidian-900/80 space-y-4">
            <h2 className="text-lg font-serif font-medium text-obsidian-100">2. Holding Data We Collect &amp; Ingest</h2>
            <p>
              When you initialize a holding, we collect your farm name, SBI number, land parcel identifiers, livestock holdings, and contact details solely for the purpose of delivering proactive agricultural advisory services and regulatory synchronization.
            </p>
          </div>

          <div className="hud-panel p-6 border border-obsidian-800 bg-obsidian-900/80 space-y-4">
            <h2 className="text-lg font-serif font-medium text-obsidian-100">3. Absolute Zero Commercialization Guarantee</h2>
            <p>
              Your holding data is processed solely to provide proactive farm alerts, SFI calculations, and compliance audit exports. We strictly never sell, rent, monetize, or commercialize your field yields, input costs, or livestock records to third-party manufacturers, chemical suppliers, or commodity trading desks.
            </p>
          </div>

          <div className="hud-panel p-6 border border-obsidian-800 bg-obsidian-900/80 space-y-4">
            <h2 className="text-lg font-serif font-medium text-obsidian-100">4. Human Expert Disclosures</h2>
            <p>
              If you request human triage with an accredited agronomist, vet, or accountant via our platform, relevant case records are shared strictly under confidential professional privilege.
            </p>
          </div>

          <div className="hud-panel p-6 border border-obsidian-800 bg-obsidian-900/80 space-y-4">
            <h2 className="text-lg font-serif font-medium text-obsidian-100">5. Contact Data Protection Officer</h2>
            <p className="font-mono text-xs text-volt-400">
              Direct inquiries to: privacy@steward.co.uk // Fiduciary Vault Officer
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
