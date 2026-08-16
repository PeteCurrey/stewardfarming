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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-parchment-100 flex flex-col justify-center">
      <div className="max-w-2xl mx-auto w-full space-y-8">
        
        {/* Progress header */}
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center space-x-2">
            <Badge variant="forest">Fast Farm Setup</Badge>
            <span className="text-xs text-charcoal-600 font-medium">Step {step} of 4</span>
          </div>

          <div className="w-full bg-parchment-300 h-1.5 rounded-full overflow-hidden max-w-xs mx-auto">
            <div
              className="bg-forest-800 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Farm Type */}
        {step === 1 && (
          <Card variant="linen" className="p-8 space-y-6 shadow-warm-lg border border-parchment-300">
            <div className="space-y-2 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900">
                1. What type of farm do you run?
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-600">
                This determines which dedicated advisor persona leads your daily briefings and decision support.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                {
                  id: "arable" as FarmType,
                  label: "Arable & Combinable",
                  icon: Wheat,
                  desc: "Cereals, oilseeds, break crops, spray windows & SFI IPM.",
                  advisor: "Tom Campbell",
                },
                {
                  id: "livestock" as FarmType,
                  label: "Livestock (Beef & Sheep)",
                  icon: Footprints,
                  desc: "Herds, grazing rotation, medicine withdrawal & mart prices.",
                  advisor: "Fiona MacLeod",
                },
                {
                  id: "mixed" as FarmType,
                  label: "Mixed Enterprise",
                  icon: Trees,
                  desc: "Arable rotations, livestock recycling & whole-farm SFI.",
                  advisor: "Alistair Reid",
                },
                {
                  id: "dairy" as FarmType,
                  label: "Dairy Holding",
                  icon: Milk,
                  desc: "Milk solids, somatic cell counts, silage D-values & leys.",
                  advisor: "Eleanor Wright",
                },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = farmType === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => setFarmType(item.id)}
                    className={cn(
                      "p-5 rounded-xl border-2 transition-all cursor-pointer space-y-2 flex flex-col justify-between",
                      isSelected
                        ? "bg-white border-forest-800 shadow-warm ring-2 ring-forest-800/20"
                        : "bg-parchment-50 border-parchment-300 hover:border-forest-400"
                    )}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div
                          className={cn(
                            "p-2.5 rounded-lg border",
                            isSelected
                              ? "bg-forest-800 text-parchment-50 border-forest-900"
                              : "bg-parchment-200 text-forest-900 border-parchment-300"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-forest-800" />}
                      </div>
                      <h3 className="font-serif font-bold text-base text-forest-950">
                        {item.label}
                      </h3>
                      <p className="text-xs text-charcoal-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-parchment-200 text-[11px] font-semibold text-terracotta-700">
                      Advisor: {item.advisor} &rarr;
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="button" variant="primary" size="lg" onClick={() => setStep(2)}>
                Continue to Holding Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 2: Farm Name, Location, Size */}
        {step === 2 && (
          <Card variant="linen" className="p-8 space-y-6 shadow-warm-lg border border-parchment-300">
            <div className="space-y-2 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900">
                2. Holding name, location &amp; acreage
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-600">
                We use this to pull regional weather radars, RPA boundary registries, and NVZ zones.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                  Farm / Holding Name
                </label>
                <input
                  type="text"
                  required
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  placeholder="e.g. Highfield Grange Farm"
                  className="w-full px-3.5 py-2.5 rounded-md bg-white border border-parchment-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                    Location / Parish
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-charcoal-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={locationAddress}
                      onChange={(e) => setLocationAddress(e.target.value)}
                      placeholder="e.g. Thirsk, North Yorkshire"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-md bg-white border border-parchment-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                    Approximate Size (Hectares)
                  </label>
                  <input
                    type="number"
                    required
                    value={sizeHectares}
                    onChange={(e) => setSizeHectares(e.target.value)}
                    placeholder="e.g. 240"
                    className="w-full px-3.5 py-2.5 rounded-md bg-white border border-parchment-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                  Single Business Identifier / SBI (Optional)
                </label>
                <input
                  type="text"
                  value={sbiNumber}
                  onChange={(e) => setSbiNumber(e.target.value)}
                  placeholder="e.g. 108492019"
                  className="w-full px-3.5 py-2.5 rounded-md bg-white border border-parchment-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
                />
                <p className="text-[11px] text-charcoal-500 mt-1">
                  Enables automatic import of parcel boundary maps from the Rural Payments Agency.
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-parchment-200">
              <Button type="button" variant="ghost" size="md" onClick={() => setStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button type="button" variant="primary" size="lg" onClick={() => setStep(3)}>
                Configure Enterprises
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 3: Core Enterprises */}
        {step === 3 && (
          <Card variant="linen" className="p-8 space-y-6 shadow-warm-lg border border-parchment-300">
            <div className="space-y-2 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900">
                3. Select your core enterprises
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-600">
                Just enough to calibrate your advisor&apos;s alerts. You can add specific parcels and stock counts later.
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
                      "p-3 rounded-lg border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between",
                      isSelected
                        ? "bg-forest-800 text-parchment-50 border-forest-900 shadow-sm"
                        : "bg-white text-charcoal-700 border-parchment-300 hover:bg-parchment-200"
                    )}
                  >
                    <span>{item}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-gold-400 ml-2" />}
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-lg bg-parchment-50 border border-parchment-300 text-xs text-charcoal-600 flex items-start space-x-3">
              <Compass className="w-5 h-5 text-forest-800 flex-shrink-0 mt-0.5" />
              <p>
                Steward will never ask you to sit and type for hours. Your advisor will prompt you with gentle, contextual questions during the season.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-parchment-200">
              <Button type="button" variant="ghost" size="md" onClick={() => setStep(2)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button type="button" variant="primary" size="lg" onClick={() => setStep(4)}>
                Meet Your Advisor
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 4: Confirmation & Persona Reveal */}
        {step === 4 && (
          <Card variant="linen" className="p-8 space-y-6 shadow-warm-lg border-2 border-forest-800 text-center sm:text-left">
            <div className="text-center space-y-2">
              <Badge variant="gold" size="md">Advisory Pairing Complete</Badge>
              <h1 className="text-3xl font-serif font-bold text-forest-900">
                Meet {currentPersona.name}, your {farmType} advisor.
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto">
                Configured for {farmName} ({sizeHectares} ha in {locationAddress}).
              </p>
            </div>

            <div className="bg-parchment-50 p-6 rounded-2xl border border-parchment-300 flex flex-col sm:flex-row items-center gap-6">
              <AdvisorPortrait
                type={farmType}
                name={currentPersona.name}
                size="lg"
                className="shadow-warm flex-shrink-0"
              />

              <div className="space-y-3 text-left">
                <div>
                  <h3 className="font-serif font-bold text-xl text-forest-900">
                    {currentPersona.name}
                  </h3>
                  <p className="text-xs font-semibold text-terracotta-700">
                    {currentPersona.role}
                  </p>
                </div>

                <p className="text-xs text-charcoal-700 italic border-l-2 border-gold-500 pl-3 leading-relaxed">
                  &quot;{currentPersona.greeting}&quot;
                </p>

                <p className="text-xs text-charcoal-600">
                  {currentPersona.specialism}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-parchment-200">
              <div className="flex items-center space-x-2 text-xs text-charcoal-600">
                <ShieldCheck className="w-4 h-4 text-forest-700" />
                <span>Farm profile ready &bull; Access dashboard immediately</span>
              </div>

              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={handleComplete}
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading ? "Initializing Dashboard..." : "Enter Farm Dashboard"}
                {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </Card>
        )}

      </div>
    </div>
  );
}
