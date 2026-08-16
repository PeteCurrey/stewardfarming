import type { Metadata } from "next";
import { AdvisorsClient } from "./AdvisorsClient";

export const metadata: Metadata = {
  title: "Meet Your Personalised Farm Advisors — Arable, Livestock, Mixed & Dairy",
  description:
    "Meet your dedicated Steward AI advisor persona: Tom Campbell (Arable), Fiona MacLeod (Livestock), Alistair Reid (Mixed Farm), and Eleanor Wright (Dairy). Grounded in UK agronomy, DEFRA SFI compliance, and livestock husbandry.",
  openGraph: {
    title: "Meet Your Farm Advisor — Personalised Intelligence for UK Agriculture",
    description:
      "Steward pairs your holding with a dedicated specialist advisor tailored to your acreage, enterprise, and Defra scheme portfolio.",
    url: "https://steward.co.uk/advisors",
  },
};

export default function AdvisorsPage() {
  return <AdvisorsClient />;
}
