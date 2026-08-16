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
    <div className="flex flex-col">
      <section className="pt-28 pb-12 bg-parchment-100 border-b border-parchment-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="forest">Legal &amp; Privacy</Badge>
          <h1 className="text-4xl font-serif font-bold text-forest-900">Privacy Policy</h1>
          <p className="text-sm text-charcoal-600">Last updated: August 2026</p>
        </div>
      </section>

      <Section variant="white">
        <div className="max-w-3xl mx-auto space-y-6 text-sm text-charcoal-700 leading-relaxed">
          <h2 className="text-xl font-serif font-bold text-forest-900">1. Our Commitment to UK Farmers</h2>
          <p>
            Steward Agricultural Technologies Ltd is registered in England &amp; Wales. We respect your privacy and are committed to protecting your personal and agricultural holding data under the UK GDPR and the Data Protection Act 2018.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest-900">2. Farm Data We Collect</h2>
          <p>
            When you register, we collect your farm name, SBI number, land parcel identifiers, livestock holdings, and contact details solely for the purpose of delivering personalised agricultural advisory services.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest-900">3. How Your Data is Used</h2>
          <p>
            Your holding data is processed solely to provide proactive farm alerts, SFI calculations, and compliance audit exports. We never sell, rent, or commercialise your field yields, input costs, or livestock records to third-party manufacturers, chemical suppliers, or grain aggregators.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest-900">4. Human Expert Disclosures</h2>
          <p>
            If you request human triage with an accredited agronomist, vet, or accountant via our platform, relevant case records are shared strictly under confidential professional privilege.
          </p>

          <h2 className="text-xl font-serif font-bold text-forest-900">5. Contact Us</h2>
          <p>
            For any data requests or inquiries, please contact our Data Protection Officer at <strong>privacy@steward.co.uk</strong>.
          </p>
        </div>
      </Section>
    </div>
  );
}
