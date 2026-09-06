"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Wheat,
  Footprints,
  Trees,
  Milk,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Compass,
  Sparkles,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AdvisorPortrait } from "@/components/ui/AdvisorPortrait";
import { useAuth } from "@/context/AuthContext";
import { FarmType, ADVISOR_PERSONAS } from "@/lib/types";
import { cn } from "@/lib/utils";

const ENTERPRISE_OPTIONS: Record<FarmType, string[]> = {
  arable: [
    "Winter Milling Wheat",
    "Winter Feed Barley",
    "Oilseed Rape",
    "Spring Malting Barley",
    "Field Beans & Pulses",
    "Sugar Beet",
    "Cover Crops & Herbal Leys",
  ],
  livestock: [
    "Commercial Suckler Beef",
    "Store Cattle",
    "Breeding Ewe Flock",
    "Store Lambs",
    "Pedigree Breeding Stock",
    "Pasture / Silage Leys",
  ],
  mixed: [
    "Combinable Cereals",
    "Suckler Herd / Fattening Cattle",
    "Lowland / Upland Sheep",
    "Break Crops & Legumes",
    "Forage Maize / Wholecrop",
    "Diverse SFI Herbal Leys",
  ],
  dairy: [
    "Holstein / Friesian Milking Herd",
    "Crossbred Grazing Herd",
    "Calf & Heifer Rearing",
    "Multi-cut Grass Silage",
    "Forage Maize / Wholecrop",
    "SFI Grassland Legumes",
  ],
};

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [farmType, setFarmType] = useState<FarmType>("arable");
  const [farmName, setFarmName] = useState("Highfield Grange Farm");
  const [locationAddress, setLocationAddress] = useState("Thirsk, North Yorkshire");
  const [sizeHectares, setSizeHectares] = useState("240");
  const [sbiNumber, setSbiNumber] = useState("108492019");
  const [selectedEnterprises, setSelectedEnterprises] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { saveFarmOnboarding } = useAuth();
  const router = useRouter();

  const currentPersona = ADVISOR_PERSONAS[farmType];

  const handleToggleEnterprise = (item: string) => {
    setSelectedEnterprises((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleComplete = async () => {
    setLoading(true);
    await saveFarmOnboarding({
      name: farmName,
      farm_type: farmType,
      location_address: locationAddress,
      location_lat: 54.232,
      location_lng: -1.341,
      size_hectares: parseFloat(sizeHectares) || 150,
      enterprises: selectedEnterprises,
    });
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-obsidian-950 text-obsidian-100 flex flex-col justify-center bg-tactical-grid">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        
        {/* Progress header */}
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center space-x-2">
            <Badge variant="volt">[HOLDING_INITIALISATION // SEQUENCE]</Badge>
            <span className="text-xs font-mono text-obsidian-400">PHASE {step} OF 4</span>
          </div>

          <div className="w-full bg-obsidian-900 h-1.5 rounded-full overflow-hidden max-w-xs mx-auto border border-obsidian-800">
            <div
              className="bg-volt-400 h-full transition-all duration-300 shadow-[0_0_8px_#00E676]"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Farm Type */}
        {step === 1 && (
          <div className="hud-panel p-8 space-y-6 shadow-hud border border-obsidian-700 bg-obsidian-900/95">
            <div className="space-y-2 text-center sm:text-left">
              <span className="font-mono text-xs text-volt-400 uppercase font-semibold">
                [STEP 01 // ENTERPRISE PROFILE]
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-normal text-obsidian-50 tracking-tight">
                Select Your Primary Agricultural Enterprise
              </h1>
              <p className="text-xs sm:text-sm text-obsidian-300 font-mono">
                Determines which accredited specialist persona leads your daily briefings and decision support algorithms.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                {
                  id: "arable" as FarmType,
                  label: "Arable & Combinable",
                  icon: Wheat,
                  desc: "Cereals, oilseeds, break crops, spray radar windows & SFI IPM.",
                  advisor: "Tom Campbell [AG-01]",
                },
                {
                  id: "livestock" as FarmType,
                  label: "Livestock (Beef & Sheep)",
                  icon: Footprints,
                  desc: "Herds, rotational grazing, medicine withdrawal & mart prices.",
                  advisor: "Fiona MacLeod [LS-02]",
                },
                {
                  id: "mixed" as FarmType,
                  label: "Mixed Enterprise",
                  icon: Trees,
                  desc: "Arable rotations, livestock recycling & whole-farm SFI.",
                  advisor: "Alistair Reid [MX-03]",
                },
                {
                  id: "dairy" as FarmType,
                  label: "Dairy Holding",
                  icon: Milk,
                  desc: "Milk solids, somatic cell counts, silage D-values & leys.",
                  advisor: "Eleanor Wright [DY-04]",
                },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = farmType === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => setFarmType(item.id)}
                    className={cn(
                      "p-5 rounded-tech border transition-all cursor-pointer space-y-3 flex flex-col justify-between",
                      isSelected
                        ? "bg-obsidian-950 border-volt-400 shadow-[0_0_12px_rgba(0,230,118,0.2)]"
                        : "bg-obsidian-950/60 border-obsidian-800 hover:border-obsidian-700"
                    )}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div
                          className={cn(
                            "p-2.5 rounded-tech border",
                            isSelected
                              ? "bg-volt-500/10 text-volt-400 border-volt-500/30"
                              : "bg-obsidian-900 text-obsidian-400 border-obsidian-800"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-volt-400" />}
                      </div>
                      <h3 className="font-serif font-medium text-base text-obsidian-100">
                        {item.label}
                      </h3>
                      <p className="text-xs text-obsidian-400 leading-relaxed font-mono">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-obsidian-800 text-[11px] font-mono text-gold-400">
                      LEAD: {item.advisor} &rarr;
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="button" variant="volt" size="lg" onClick={() => setStep(2)}>
                Continue to Holding Geometry
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Farm Name, Location, Size */}
        {step === 2 && (
          <div className="hud-panel p-8 space-y-6 shadow-hud border border-obsidian-700 bg-obsidian-900/95">
            <div className="space-y-2 text-center sm:text-left">
              <span className="font-mono text-xs text-volt-400 uppercase font-semibold">
                [STEP 02 // HOLDING GEOMETRY]
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-normal text-obsidian-50 tracking-tight">
                Holding Name, Location &amp; Extent
              </h1>
              <p className="text-xs sm:text-sm text-obsidian-300 font-mono">
                Used to lock 1.1km Met Office radar beacons, RPA Ordnance Survey parcels, and NVZ catchment rules.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-mono font-bold text-obsidian-300 uppercase tracking-wider mb-1">
                  Holding / Farm Name
                </label>
                <input
                  type="text"
                  required
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  placeholder="e.g. Highfield Grange Farm"
                  className="w-full px-3.5 py-2.5 rounded-tech bg-obsidian-950 border border-obsidian-800 text-sm text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:border-volt-400 focus:ring-1 focus:ring-volt-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-obsidian-300 uppercase tracking-wider mb-1">
                    Parish / Postal Code
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-obsidian-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={locationAddress}
                      onChange={(e) => setLocationAddress(e.target.value)}
                      placeholder="e.g. Thirsk, North Yorkshire"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-tech bg-obsidian-950 border border-obsidian-800 text-sm text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:border-volt-400 focus:ring-1 focus:ring-volt-400 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-obsidian-300 uppercase tracking-wider mb-1">
                    Holding Extent (Hectares)
                  </label>
                  <input
                    type="number"
                    required
                    value={sizeHectares}
                    onChange={(e) => setSizeHectares(e.target.value)}
                    placeholder="e.g. 240"
                    className="w-full px-3.5 py-2.5 rounded-tech bg-obsidian-950 border border-obsidian-800 text-sm text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:border-volt-400 focus:ring-1 focus:ring-volt-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-obsidian-300 uppercase tracking-wider mb-1">
                  Single Business Identifier / SBI (Optional)
                </label>
                <input
                  type="text"
                  value={sbiNumber}
                  onChange={(e) => setSbiNumber(e.target.value)}
                  placeholder="e.g. 108492019"
                  className="w-full px-3.5 py-2.5 rounded-tech bg-obsidian-950 border border-obsidian-800 text-sm text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:border-volt-400 focus:ring-1 focus:ring-volt-400 font-mono"
                />
                <p className="text-[11px] font-mono text-obsidian-400 mt-1">
                  Enables zero-friction ingestion of boundary coordinates and historical land use from the Rural Payments Agency.
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-obsidian-800">
              <Button type="button" variant="outline" size="md" onClick={() => setStep(1)} className="border-obsidian-700 text-obsidian-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button type="button" variant="volt" size="lg" onClick={() => setStep(3)}>
                Configure Enterprise Matrix
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Core Enterprises */}
        {step === 3 && (
          <div className="hud-panel p-8 space-y-6 shadow-hud border border-obsidian-700 bg-obsidian-900/95">
            <div className="space-y-2 text-center sm:text-left">
              <span className="font-mono text-xs text-volt-400 uppercase font-semibold">
                [STEP 03 // ENTERPRISE MATRIX]
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-normal text-obsidian-50 tracking-tight">
                Select Active Cropping &amp; Stock Sub-Enterprises
              </h1>
              <p className="text-xs sm:text-sm text-obsidian-300 font-mono">
                Calibrates sensor sensitivity, spray window thresholds, and statutory reporting chronometers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {ENTERPRISE_OPTIONS[farmType].map((item) => {
                const isSelected = selectedEnterprises.includes(item);

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleToggleEnterprise(item)}
                    className={cn(
                      "p-3 rounded-tech border text-left text-xs sm:text-sm font-mono transition-all flex items-center justify-between",
                      isSelected
                        ? "bg-obsidian-950 text-volt-400 border-volt-400 shadow-[0_0_10px_rgba(0,230,118,0.2)]"
                        : "bg-obsidian-950/60 text-obsidian-300 border-obsidian-800 hover:border-obsidian-700 hover:text-obsidian-100"
                    )}
                  >
                    <span>{item}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-volt-400 ml-2" />}
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-tech bg-obsidian-950 border border-obsidian-800 text-xs font-mono text-obsidian-300 flex items-start space-x-3">
              <Compass className="w-5 h-5 text-volt-400 flex-shrink-0 mt-0.5" />
              <p>
                Steward will never ask you to sit and type for hours. Your advisor prompts you with concise, situational queries as seasonal operations develop.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-obsidian-800">
              <Button type="button" variant="outline" size="md" onClick={() => setStep(2)} className="border-obsidian-700 text-obsidian-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button type="button" variant="volt" size="lg" onClick={() => setStep(4)}>
                Meet Assigned Advisor
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: Confirmation & Persona Reveal */}
        {step === 4 && (
          <div className="hud-panel p-8 space-y-6 shadow-hud border border-volt-500/40 bg-obsidian-900/95 text-center sm:text-left">
            <div className="text-center space-y-2">
              <Badge variant="volt" size="md">[ADVISORY PAIRING CONFIRMED]</Badge>
              <h1 className="text-3xl font-serif font-normal text-obsidian-50 tracking-tight">
                Meet {currentPersona.name}, your {farmType} specialist.
              </h1>
              <p className="text-xs sm:text-sm text-obsidian-300 max-w-md mx-auto font-mono">
                Calibrated for {farmName} ({sizeHectares} ha in {locationAddress}).
              </p>
            </div>

            <div className="bg-obsidian-950 p-6 rounded-tech border border-obsidian-800 flex flex-col sm:flex-row items-center gap-6">
              <AdvisorPortrait
                type={farmType}
                name={currentPersona.name}
                size="lg"
                className="flex-shrink-0 shadow-hud"
              />

              <div className="space-y-3 text-left">
                <div>
                  <h3 className="font-serif font-medium text-xl text-obsidian-100">
                    {currentPersona.name}
                  </h3>
                  <p className="text-xs font-mono text-volt-400 uppercase tracking-wider">
                    {currentPersona.role}
                  </p>
                </div>

                <p className="text-xs font-mono text-obsidian-300 italic border-l-2 border-gold-400 pl-3 leading-relaxed">
                  &quot;{currentPersona.greeting}&quot;
                </p>

                <p className="text-xs font-mono text-obsidian-400">
                  {currentPersona.specialism}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-obsidian-800">
              <div className="flex items-center space-x-2 text-xs font-mono text-obsidian-400">
                <ShieldCheck className="w-4 h-4 text-volt-400" />
                <span>Spatial telemetry active &bull; Cockpit ready for launch</span>
              </div>

              <Button
                type="button"
                variant="volt"
                size="lg"
                onClick={handleComplete}
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading ? "INITIALISING COCKPIT..." : "Launch Holding Cockpit"}
                {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
