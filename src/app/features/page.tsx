import type { Metadata } from "next";
import { FeaturesClient } from "./FeaturesClient";

export const metadata: Metadata = {
  title: "Complete Farming Advisory Features — Crop, Livestock, SFI Subsidies & Compliance",
  description:
    "Explore Steward's complete agricultural feature suite: DEFRA 2024/2025 SFI subsidy tracking, NVZ risk maps, RB209 soil nutrition, Red Tractor compliance packs, livestock medicine books, and machinery telematics.",
  openGraph: {
    title: "Steward Platform Features — AI-Powered UK Farm Management",
    description:
      "From daily spray windows to multi-year SFI subsidy planning, discover how Steward unifies your holding.",
    url: "https://steward.co.uk/features",
  },
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
