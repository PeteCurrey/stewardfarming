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
    <div className="flex flex-col bg-white text-slate-900">
      <section className="pt-32 pb-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <Badge variant="forest">Data Sovereignty &amp; Privacy</Badge>
          <h1 className="text-4xl font-serif font-medium text-slate-900 tracking-tight">
            Privacy &amp; Agricultural Data Protection Policy
          </h1>
          <p className="text-xs text-slate-500">Last updated: August 2026 &bull; UK GDPR Compliant</p>
        </div>
      </section>

      <Section variant="white">
        <div className="max-w-3xl mx-auto space-y-6 text-sm text-slate-600 leading-relaxed">
          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h2 className="text-base font-semibold text-slate-900">1. Our Commitment to UK Farm Holdings</h2>
            <p>
              Steward Agricultural Technologies Ltd is registered in England &amp; Wales. We respect your privacy and are committed to protecting your personal and agricultural holding data under the UK GDPR and the Data Protection Act 2018.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h2 className="text-base font-semibold text-slate-900">2. Farm Data We Ingest &amp; Process</h2>
            <p>
              When you register, we collect your farm name, SBI number, land parcel identifiers, livestock holdings, and contact details solely for the purpose of delivering personalised agricultural advisory services and regulatory synchronization.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h2 className="text-base font-semibold text-slate-900">3. Zero Commercialization Guarantee</h2>
            <p>
              Your holding data is processed solely to provide proactive farm alerts, SFI calculations, and compliance audit exports. We strictly never sell, rent, or commercialise your field yields, input costs, or livestock records to third-party chemical suppliers, machinery dealers, or grain aggregators.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h2 className="text-base font-semibold text-slate-900">4. Human Expert Disclosures</h2>
            <p>
              If you request human triage with an accredited agronomist, vet, or accountant via our platform, relevant case records are shared strictly under confidential professional privilege.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <h2 className="text-base font-semibold text-slate-900">5. Contact Our Data Protection Officer</h2>
            <p>
              For data requests or inquiries, please contact privacy@steward.co.uk.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
