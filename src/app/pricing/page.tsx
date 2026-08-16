import type { Metadata } from "next";
import { PricingClient } from "./PricingClient";

export const metadata: Metadata = {
  title: "Transparent Farm Pricing & Plan Configurator",
  description:
    "One transparent subscription per farm with no per-acre penalties. Configure your base AI advisor plan with optional modules (Satellite Imagery, Fleet Telematics, Subsidy Concierge) with a 30-day free trial.",
  openGraph: {
    title: "Steward Pricing — Simple, Fair Farm Subscriptions",
    description:
      "Configure your holding's plan: base AI advisor plus modular tools for telemetry, grants, and accredited expert access.",
    url: "https://steward.co.uk/pricing",
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
