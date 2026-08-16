import { SubscriptionAddon } from "@/lib/types";

export interface AddonMetadata {
  key: SubscriptionAddon;
  title: string;
  priceMonthly: number;
  description: string;
  tagline: string;
  features: string[];
}

export const ADDON_CATALOG: Record<SubscriptionAddon, AddonMetadata> = {
  fleet_management: {
    key: "fleet_management",
    title: "Fleet & Machinery Management",
    priceMonthly: 35,
    tagline: "Preventive maintenance telemetry & statutory inspection logs.",
    description: "Track service intervals, fuel efficiency benchmarks, NSTSO sprayer certificates, and automated 14-day service reminders.",
    features: [
      "Digital equipment register & hours logging",
      "Automated 14-day service countdowns",
      "Statutory NSTSO & LOLER audit exports",
      "Direct integration into AI daily reviews",
    ],
  },
  satellite_imagery: {
    key: "satellite_imagery",
    title: "Satellite & Drone NDVI Imagery",
    priceMonthly: 45,
    tagline: "Sentinel-2 10m multispectral biomass & canopy variation analysis.",
    description: "Weekly high-resolution NDVI vegetation health indexing, soil brightness maps, and AI canopy trend interpretations.",
    features: [
      "Weekly Sentinel-2 10m NDVI passes",
      "Interactive field parcel boundary overlays",
      "Plain-language biomass trend commentary",
      "Variable-rate nitrogen zone export",
    ],
  },
  subsidy_concierge: {
    key: "subsidy_concierge",
    title: "Subsidy & Grant Concierge",
    priceMonthly: 55,
    tagline: "Full-service Defra SFI & Countryside Stewardship filing support.",
    description: "Auto-drafted parcel applications, scheme stacking calculations, and pre-submission audit reviews.",
    features: [
      "SFI 2024 / 2025 multi-tier stacking",
      "Automated evidence bundle compilation",
      "Priority Defra query resolution",
    ],
  },
  carbon_reporting: {
    key: "carbon_reporting",
    title: "Carbon & Sustainability Reporting",
    priceMonthly: 30,
    tagline: "GHG Protocol & GGL compliant farm carbon accounting.",
    description: "Scope 1 & 2 emissions accounting, soil carbon sequestration modeling, and supply chain ESG compliance.",
    features: [
      "Farm carbon footprint calculation",
      "Soil organic matter sequestration curves",
      "Supermarket assurance exports",
    ],
  },
  market_intelligence: {
    key: "market_intelligence",
    title: "Grain & Livestock Market Intelligence",
    priceMonthly: 25,
    tagline: "Real-time LIFFE futures & AHDB deadweight price benchmarks.",
    description: "Targeted crop contract pricing alerts, local auction mart deadweight averages, and forward cost predictions.",
    features: [
      "Live LIFFE wheat & feed barley quotes",
      "Regional livestock mart deadweight averages",
      "Input cost inflation forecasting",
    ],
  },
  priority_expert: {
    key: "priority_expert",
    title: "Priority Expert Access",
    priceMonthly: 60,
    tagline: "Guaranteed 1-hour response SLA from accredited specialists.",
    description: "Direct fast-track phone & video consults with RCVS farm vets and BASIS senior agronomists.",
    features: [
      "Under 1-hour callback guarantee",
      "Direct phone & video conferencing",
      "Unlimited diagnostic photo triage",
    ],
  },
};
