"use client";

import React, { useState } from "react";
import {
  FileText,
  Sparkles,
  CheckCircle2,
  Clock,
  Send,
  Edit3,
  Check,
  ExternalLink,
  Loader2,
  ShieldCheck,
  AlertCircle,
  Copy,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { AddonUpsellCard } from "@/components/dashboard/AddonUpsellCard";
import { cn } from "@/lib/utils";

interface RelevantScheme {
  code: string;
  name: string;
  rate: string;
  category: string;
  description: string;
  matchingParcels: { name: string; areaHectares: number }[];
  totalHa: number;
  estAnnualValue: string;
}

const RELEVANT_SCHEMES: RelevantScheme[] = [
  {
    code: "SAM3",
    name: "Herbal Leys Multi-Species Sward",
    rate: "£382 / ha / year",
    category: "Soils & Rotations",
    description: "Diverse multi-species sward including deep-rooting grasses, legumes, and herbs to improve soil structure, carbon retention, and drought resilience.",
    matchingParcels: [
      { name: "Valley Meadow", areaHectares: 18.5 },
      { name: "High Hill", areaHectares: 32.1 },
    ],
    totalHa: 50.6,
    estAnnualValue: "£19,329 / yr",
  },
  {
    code: "NUM1",
    name: "Assess Nutrient Management & Nitrogen Plan",
    rate: "£652 / year",
    category: "Nutrient Efficiency",
    description: "Produce a nitrogen balance sheet with nutrient management plan to reduce inorganic N usage across all registered parcels.",
    matchingParcels: [{ name: "Whole Holding Baseline", areaHectares: 240.0 }],
    totalHa: 240.0,
    estAnnualValue: "£652 / yr",
  },
  {
    code: "IPM1",
    name: "Integrated Pest Management Assessment",
    rate: "£989 / year",
    category: "Pest Management",
    description: "Annual IPM plan certified by a BASIS qualified advisor to reduce pesticide reliance through crop rotation, companion cropping, and threshold monitoring.",
    matchingParcels: [
      { name: "Home 40ha", areaHectares: 40.2 },
      { name: "High Hill", areaHectares: 32.1 },
    ],
    totalHa: 72.3,
    estAnnualValue: "£989 / yr",
  },
];

export default function SubsidiesPage() {
  const { farm } = useAuth();
  const [hasEntitlement, setHasEntitlement] = useState(true);
  const [draftingCode, setDraftingCode] = useState<string | null>(null);
  const [draftText, setDraftText] = useState<string | null>(null);
  const [draftingSchemeName, setDraftingSchemeName] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [approvedTaskNotice, setApprovedTaskNotice] = useState(false);

  const handleDraftApplication = async (scheme: RelevantScheme) => {
    setDraftingCode(scheme.code);
    setDraftingSchemeName(scheme.name);
    setDraftText(null);
    setApprovedTaskNotice(false);

    try {
      const res = await fetch("/api/subsidies/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          farmId: farm?.id || "demo-farm",
          farmName: farm?.name || "Highfield Grange Farm",
          schemeCode: scheme.code,
          schemeName: scheme.name,
          category: scheme.category,
          paymentRate: scheme.rate,
          fields: scheme.matchingParcels,
        }),
      });

      const data = await res.json();
      if (data.draftText) {
        setDraftText(data.draftText);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDraftingCode(null);
    }
  };

  const handleCopy = () => {
    if (!draftText) return;
    navigator.clipboard.writeText(draftText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!hasEntitlement) {
    return <AddonUpsellCard addonKey="subsidy_concierge" farmName={farm?.name} />;
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-parchment-300 pb-4 space-y-1">
        <div className="flex items-center space-x-2">
          <Badge variant="forest">Premium Add-on Module</Badge>
          <span className="text-xs text-charcoal-500 font-medium">Defra SFI Scheme</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900">
          Subsidy &amp; Grant Concierge
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 max-w-2xl">
          Auto-draft SFI agreement packs matched to your field parcels. Generated content is saved as an Amber-tier task for your review before you copy and submit to GOV.UK.
        </p>
      </div>

      {/* Draft Workspace Modal / Drawer */}
      {draftText && (
        <Card variant="linen" className="p-6 sm:p-8 border-2 border-forest-800 shadow-warm-lg space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-parchment-200 pb-3">
            <div>
              <span className="text-xs uppercase font-bold text-terracotta-700 tracking-wider">
                Amber-Tier Task Queued
              </span>
              <h2 className="text-xl font-serif font-bold text-forest-900">
                Draft Application: {draftingSchemeName}
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="w-3.5 h-3.5 mr-1" />
                {copied ? "Copied to Clipboard!" : "Copy Application Text"}
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => {
                  setApprovedTaskNotice(true);
                  setTimeout(() => setApprovedTaskNotice(false), 5000);
                }}
              >
                <Check className="w-3.5 h-3.5 mr-1" />
                Mark Reviewed
              </Button>
            </div>
          </div>

          {approvedTaskNotice && (
            <div className="p-3 rounded-lg bg-forest-100 border border-forest-300 text-forest-900 flex items-center space-x-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-forest-700 flex-shrink-0" />
              <span>Marked as reviewed in your Tasks queue. Proceed to the Rural Payments service on GOV.UK to submit.</span>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-charcoal-500">
              <span>Editable Draft Content:</span>
              <span>Review &amp; customise before official filing</span>
            </div>
            <textarea
              rows={12}
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              className="w-full p-4 rounded-lg bg-white border border-parchment-300 text-xs sm:text-sm text-charcoal-800 font-mono focus:outline-none focus:ring-2 focus:ring-forest-700 leading-relaxed"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-500 gap-2 border-t border-parchment-200">
            <span className="italic">
              *Steward prepares application content for your review; submission is executed by the farmer on GOV.UK.
            </span>
            <a
              href="https://www.gov.uk/guidance/sfi-actions-for-soils"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-forest-800 hover:underline flex items-center"
            >
              Open Rural Payments Portal (GOV.UK) &rarr;
            </a>
          </div>
        </Card>
      )}

      {/* Relevant Schemes List */}
      <div className="space-y-4">
        <h2 className="font-serif font-bold text-lg text-forest-900">
          Matched SFI Schemes for {farm?.name || "Your Holding"}
        </h2>

        <div className="space-y-4">
          {RELEVANT_SCHEMES.map((scheme) => (
            <Card
              key={scheme.code}
              variant="linen"
              className="p-6 shadow-sm border border-parchment-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-forest-600 transition-all"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center space-x-2.5">
                  <span className="font-mono font-bold text-xs bg-forest-100 text-forest-900 px-2.5 py-1 rounded border border-forest-300">
                    {scheme.code}
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-forest-950">
                    {scheme.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                  {scheme.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-charcoal-600">
                  <span className="font-medium text-forest-900">Matching Parcels:</span>
                  {scheme.matchingParcels.map((p, idx) => (
                    <span key={idx} className="bg-parchment-200 px-2 py-0.5 rounded text-[11px]">
                      {p.name} ({p.areaHectares} ha)
                    </span>
                  ))}
                  <span className="font-semibold text-terracotta-700 ml-1">
                    Total: {scheme.totalHa} ha
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-end justify-between gap-3 w-full lg:w-auto border-t lg:border-t-0 pt-3 lg:pt-0 border-parchment-200">
                <div className="text-right">
                  <span className="text-xs text-charcoal-500 block">Estimated Annual Value</span>
                  <span className="font-serif font-bold text-lg text-forest-900">
                    {scheme.estAnnualValue}
                  </span>
                </div>

                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  disabled={draftingCode === scheme.code}
                  onClick={() => handleDraftApplication(scheme)}
                >
                  {draftingCode === scheme.code ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                      Drafting with Claude...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 mr-1.5 text-gold-400" />
                      Draft My Application
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
