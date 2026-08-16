"use client";

import React, { useState } from "react";
import {
  Tractor,
  Plus,
  MapPin,
  Layers,
  Save,
  CheckCircle2,
  Edit2,
  Compass,
  Download,
  Check,
  Sparkles,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { FarmType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ParcelPreview {
  parcelId: string;
  parcelNumber: string;
  areaHectares: number;
  landUse: string;
  customName?: string;
  selected: boolean;
}

export default function FarmProfilePage() {
  const { farm, updateFarm } = useAuth();

  const [name, setName] = useState(farm?.name || "Highfield Grange Farm");
  const [locationAddress, setLocationAddress] = useState(farm?.location_address || "Thirsk, North Yorkshire");
  const [sizeHectares, setSizeHectares] = useState(farm?.size_hectares?.toString() || "240");
  const [farmType, setFarmType] = useState<FarmType>(farm?.farm_type || "arable");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  // RPA Land Import state
  const [sbiInput, setSbiInput] = useState("108492019");
  const [fetchingRpa, setFetchingRpa] = useState(false);
  const [importingParcels, setImportingParcels] = useState(false);
  const [rpaParcels, setRpaParcels] = useState<ParcelPreview[]>([]);
  const [rpaImportSuccess, setRpaImportSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateFarm({
      name,
      location_address: locationAddress,
      size_hectares: parseFloat(sizeHectares) || 100,
      farm_type: farmType,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Fetch RPA Parcels by SBI
  const handleFetchRpaParcels = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sbiInput.trim() || fetchingRpa) return;

    setFetchingRpa(true);
    setRpaImportSuccess(false);

    try {
      const res = await fetch("/api/rpa/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "fetch", sbiNumber: sbiInput }),
      });
      const data = await res.json();
      if (data.parcels) {
        setRpaParcels(
          data.parcels.map((p: any) => ({
            ...p,
            customName: `Field ${p.parcelNumber} (${p.landUse.split(" ")[0]})`,
            selected: true,
          }))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingRpa(false);
    }
  };

  // Confirm and Import selected parcels into fields table
  const handleImportSelectedParcels = async () => {
    const selected = rpaParcels.filter((p) => p.selected);
    if (selected.length === 0 || importingParcels) return;

    setImportingParcels(true);

    try {
      await fetch("/api/rpa/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "import",
          farmId: farm?.id || "demo-farm",
          sbiNumber: sbiInput,
          selectedParcels: selected,
        }),
      });

      setRpaImportSuccess(true);
      setRpaParcels([]);
      setTimeout(() => setRpaImportSuccess(false), 6000);
    } catch (err) {
      console.error(err);
    } finally {
      setImportingParcels(false);
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-parchment-300 pb-4">
        <div>
          <Badge variant="forest">Holding Master Data &amp; Land Registry</Badge>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 mt-1">
            Farm Profile &amp; Land Parcels
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Manage your holding acreage, coordinates, and link digital boundary shapes from the Rural Payments Agency.
          </p>
        </div>

        {saved && (
          <div className="flex items-center space-x-2 text-xs font-semibold text-forest-800 bg-forest-100 px-3 py-1.5 rounded-md border border-forest-200 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-forest-700" />
            <span>Profile Updated Successfully</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 
          ======================================================================
          1. HOLDING INFORMATION FORM
          ======================================================================
        */}
        <div className="lg:col-span-7 space-y-6">
          <Card variant="linen" className="p-6 sm:p-8 shadow-warm space-y-6">
            <form onSubmit={handleSave} className="space-y-5">
              <h2 className="font-serif font-bold text-lg text-forest-900 border-b border-parchment-200 pb-2">
                Holding Records
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                    Holding / Farm Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md bg-white border border-parchment-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                    Primary Enterprise Type
                  </label>
                  <select
                    value={farmType}
                    onChange={(e) => setFarmType(e.target.value as FarmType)}
                    className="w-full px-3.5 py-2.5 rounded-md bg-white border border-parchment-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700 font-medium"
                  >
                    <option value="arable">Arable &amp; Combinable (Advisor: Tom)</option>
                    <option value="livestock">Livestock Beef &amp; Sheep (Advisor: Fiona)</option>
                    <option value="mixed">Mixed Farm (Advisor: Alistair)</option>
                    <option value="dairy">Dairy Holding (Advisor: Eleanor)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                    Location / Parish Address
                  </label>
                  <input
                    type="text"
                    required
                    value={locationAddress}
                    onChange={(e) => setLocationAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md bg-white border border-parchment-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                    Total Acreage (Hectares)
                  </label>
                  <input
                    type="number"
                    required
                    value={sizeHectares}
                    onChange={(e) => setSizeHectares(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md bg-white border border-parchment-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-parchment-200 flex justify-end">
                <Button type="submit" variant="primary" size="md" disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Saving Changes..." : "Save Profile Updates"}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* 
          ======================================================================
          2. RPA LAND REGISTRY & SBI SYNC SECTION
          ======================================================================
        */}
        <div className="lg:col-span-5 space-y-6">
          <Card variant="linen" className="p-6 space-y-5 border-2 border-forest-600/30">
            <div className="flex items-center justify-between border-b border-parchment-200 pb-2">
              <div className="flex items-center space-x-2">
                <Compass className="w-5 h-5 text-forest-800" />
                <h3 className="font-serif font-bold text-base text-forest-900">
                  Link Your Land (RPA Sync)
                </h3>
              </div>
              <Badge variant="gold" size="sm">Public API</Badge>
            </div>

            <p className="text-xs text-charcoal-600 leading-relaxed">
              Connect your Rural Payments Agency (RPA) Single Business Identifier to fetch official OS parcel polygons, acreage measurements, and registered land-use types.
            </p>

            <form onSubmit={handleFetchRpaParcels} className="space-y-3">
              <div>
                <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                  Single Business Identifier (SBI)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    required
                    value={sbiInput}
                    onChange={(e) => setSbiInput(e.target.value)}
                    placeholder="e.g. 108492019"
                    className="flex-1 px-3 py-2 rounded-md bg-white border border-parchment-300 text-sm font-mono text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                  <Button type="submit" variant="secondary" size="sm" disabled={fetchingRpa || !sbiInput.trim()}>
                    {fetchingRpa ? <Loader2 className="w-4 h-4 animate-spin" /> : "Fetch Parcels"}
                  </Button>
                </div>
              </div>
            </form>

            {rpaImportSuccess && (
              <div className="p-3 rounded-lg bg-forest-100 border border-forest-300 text-forest-900 flex items-center space-x-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-forest-700 flex-shrink-0" />
                <span>RPA Field Parcels imported and bound to farm profile.</span>
              </div>
            )}

            {/* RPA Parcel Preview & Confirmation Drawer */}
            {rpaParcels.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-parchment-200">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-xs text-forest-950">
                    Found {rpaParcels.length} Land Parcels
                  </span>
                  <span className="text-[10px] text-charcoal-500">Confirm &amp; Name Below</span>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {rpaParcels.map((parcel, idx) => (
                    <div
                      key={parcel.parcelId}
                      className="p-3 rounded-lg bg-white border border-parchment-300 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 font-mono font-bold text-forest-900 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={parcel.selected}
                            onChange={(e) =>
                              setRpaParcels((prev) =>
                                prev.map((p, i) => (i === idx ? { ...p, selected: e.target.checked } : p))
                              )
                            }
                            className="rounded text-forest-800"
                          />
                          <span>{parcel.parcelId}</span>
                        </label>
                        <span className="font-mono text-charcoal-600">{parcel.areaHectares} ha</span>
                      </div>

                      <input
                        type="text"
                        value={parcel.customName || ""}
                        onChange={(e) =>
                          setRpaParcels((prev) =>
                            prev.map((p, i) => (i === idx ? { ...p, customName: e.target.value } : p))
                          )
                        }
                        placeholder="Friendly field name..."
                        className="w-full px-2.5 py-1.5 rounded bg-parchment-50 border border-parchment-200 text-xs"
                      />
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  className="w-full"
                  disabled={importingParcels || rpaParcels.filter((p) => p.selected).length === 0}
                  onClick={handleImportSelectedParcels}
                >
                  {importingParcels ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  ) : (
                    <Download className="w-3.5 h-3.5 mr-1" />
                  )}
                  Import {rpaParcels.filter((p) => p.selected).length} Fields into Holding
                </Button>
              </div>
            )}

          </Card>
        </div>

      </div>

      {/* 
        ========================================================================
        3. ADVISORY SFI ACTIONS CROSS-REFERENCE (SURFACED ADVISORY-ONLY)
        ========================================================================
      */}
      <section className="space-y-4 pt-4 border-t border-parchment-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-gold-600" />
            <h2 className="font-serif font-bold text-xl text-forest-900">
              SFI Actions Land Compatibility Matrix
            </h2>
          </div>
          <span className="text-xs text-charcoal-500 font-medium">Advisory Only &bull; Confirm on GOV.UK</span>
        </div>

        <p className="text-xs text-charcoal-600 max-w-3xl">
          Based on your registered parcel boundaries and crop rotations, Steward cross-references official Defra Defra SFI specifications to highlight potential action stacks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <Card variant="linen" className="p-5 space-y-2.5 border-2 border-forest-600/30">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs bg-forest-100 text-forest-900 px-2 py-0.5 rounded">
                SAM3 &bull; Herbal Leys
              </span>
              <span className="font-semibold text-xs text-forest-800">£382 / ha / yr</span>
            </div>
            <h3 className="font-serif font-bold text-sm text-forest-950">
              Valley Meadow &amp; High Hill (50.6 ha)
            </h3>
            <p className="text-[11px] text-charcoal-600 leading-relaxed">
              Compatible with Temporary Grass &amp; Arable parcels. Improves soil organic matter and nitrogen fixation while securing predictable SFI income.
            </p>
            <div className="pt-2 text-[10px] text-charcoal-500 italic">
              Estimated Value: £19,329 / yr
            </div>
          </Card>

          <Card variant="linen" className="p-5 space-y-2.5 border-2 border-forest-600/30">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs bg-forest-100 text-forest-900 px-2 py-0.5 rounded">
                NUM1 &bull; Nutrient Plan
              </span>
              <span className="font-semibold text-xs text-forest-800">£652 / yr</span>
            </div>
            <h3 className="font-serif font-bold text-sm text-forest-950">
              Whole Farm Holding Baseline
            </h3>
            <p className="text-[11px] text-charcoal-600 leading-relaxed">
              Assessment and nitrogen balance sheet for inorganic fertiliser reduction across all 240 hectares.
            </p>
            <div className="pt-2 text-[10px] text-charcoal-500 italic">
              Estimated Value: £652 / yr
            </div>
          </Card>

          <Card variant="linen" className="p-5 space-y-2.5 border-2 border-forest-600/30">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs bg-forest-100 text-forest-900 px-2 py-0.5 rounded">
                IPM1 &bull; Integrated Pest Plan
              </span>
              <span className="font-semibold text-xs text-forest-800">£989 / yr</span>
            </div>
            <h3 className="font-serif font-bold text-sm text-forest-950">
              Home 40ha &amp; Arable Blocks
            </h3>
            <p className="text-[11px] text-charcoal-600 leading-relaxed">
              Annual BASIS-certified pest management review. Integrates companion cropping and threshold spray decisions.
            </p>
            <div className="pt-2 text-[10px] text-charcoal-500 italic">
              Estimated Value: £989 / yr
            </div>
          </Card>
        </div>
      </section>

    </div>
  );
}
