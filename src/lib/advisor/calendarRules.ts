export interface SeasonalReferenceRule {
  month: number; // 1-12
  farmType: "arable" | "livestock" | "mixed" | "dairy" | "all";
  category: "Agronomy" | "Livestock" | "Compliance & Subsidies" | "Machinery";
  title: string;
  description: string;
  autonomyTier: "green" | "amber" | "red";
  actionCode?: string;
}

/**
 * Static reference data for UK Agricultural calendars & SFI / Statutory deadlines.
 * NOTE: Clearly marked as static reference data to be augmented with live Defra Land App / RPA data in later phases.
 */
export const UK_AGRICULTURAL_CALENDAR_RULES: SeasonalReferenceRule[] = [
  // Late Summer / Autumn (August - October)
  {
    month: 8,
    farmType: "arable",
    category: "Agronomy",
    title: "Oilseed Rape (OSR) Seeding Window & Moisture Check",
    description: "Target drilling before August 31st into conserved moisture to establish 4 true leaves ahead of Adult Cabbage Stem Flea Beetle (CSFB) migration.",
    autonomyTier: "amber",
  },
  {
    month: 8,
    farmType: "all",
    category: "Compliance & Subsidies",
    title: "SFI 2024 / 2025 Application Window Review",
    description: "Review current SFI rotational agreements (SAM3 Herbal Leys £382/ha, NUM1 Legume Fallow £593/ha). Ensure non-conflict with NVZ closed periods.",
    autonomyTier: "amber",
    actionCode: "SFI-SAM3-NUM1",
  },
  {
    month: 8,
    farmType: "livestock",
    category: "Livestock",
    title: "Pre-Breeding Tup & Ewe BCS Assessment",
    description: "Sort breeding ewes by Body Condition Score (BCS 3.0-3.5 target). Flush on fresh clover-grass leys 3 weeks prior to ram turnout.",
    autonomyTier: "amber",
  },
  {
    month: 8,
    farmType: "dairy",
    category: "Agronomy",
    title: "Third-Cut Grass Silage Timing & D-Value Analysis",
    description: "Assess grass regrowth in multicut systems. Target cut at 70+ D-value before stem elongation; test sugar/nitrate levels if applying slurry.",
    autonomyTier: "amber",
  },
  {
    month: 9,
    farmType: "all",
    category: "Compliance & Subsidies",
    title: "NVZ Closed Spreading Period Countdown",
    description: "Reminder: Closed periods for manufactured nitrogen fertiliser on grassland and arable land begin September 1st / September 15th under NVZ regulations.",
    autonomyTier: "red",
    actionCode: "NVZ-N-MAX",
  },
  {
    month: 9,
    farmType: "arable",
    category: "Agronomy",
    title: "Pre-Emergence Herbicide Strategy for Blackgrass Control",
    description: "Ensure stale seedbed flushes are sprayed off with glyphosate prior to drilling winter cereals. Prepare flufenacet + pendimethalin mixes within 48h of drilling.",
    autonomyTier: "amber",
  },
  {
    month: 10,
    farmType: "arable",
    category: "Agronomy",
    title: "Winter Wheat Drilling & SFI IPM1 Assessment",
    description: "Complete late October drilling on heavy ground to minimise blackgrass germination. Record IPM score under SFI IPM1 (£989 baseline).",
    autonomyTier: "amber",
    actionCode: "IPM1",
  },
  {
    month: 10,
    farmType: "livestock",
    category: "Livestock",
    title: "Fluke & Worm Dosing Strategy for Housed Cattle",
    description: "Plan housing parasite control (triclabendazole / ivermectin) in accordance with SCOPS / COWS guidelines and statutory withdrawal periods.",
    autonomyTier: "amber",
  },
  {
    month: 11,
    farmType: "dairy",
    category: "Livestock",
    title: "Winter Housing Cubicle Hygiene & SCC Telemetry",
    description: "Review winter housing ventilation, sawdust/lime bedding protocols, and milk buyer somatic cell count (SCC) bonus thresholds (<150k cells/ml).",
    autonomyTier: "green",
  },
  {
    month: 12,
    farmType: "all",
    category: "Compliance & Subsidies",
    title: "Annual Red Tractor Spray Docket & Medicine Book Audit Prep",
    description: "Consolidate chemical purchase receipts, NRoSO operator spray logs, and veterinary medicine register ahead of annual assurance inspections.",
    autonomyTier: "amber",
  },
];
