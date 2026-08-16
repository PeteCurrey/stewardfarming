import type { Metadata } from "next";
import React, { Suspense } from "react";
import { SignupClient } from "./SignupClient";

export const metadata: Metadata = {
  title: "Start Your 30-Day Free Trial — Set Up Your Farm Profile",
  description:
    "Register your holding with Steward in under 5 minutes. Connect with your personalised UK farming AI advisor, review your SFI eligibility forecast, and experience proactive field advice. No credit card required.",
  openGraph: {
    title: "Start Free Trial — Steward UK Farming Advisory",
    description: "Set up your farm profile in minutes. Free 30-day trial with full advisor access.",
    url: "https://steward.co.uk/signup",
  },
};

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-24 text-center text-charcoal-600 bg-parchment-100 font-serif">
          Loading farm registration...
        </div>
      }
    >
      <SignupClient />
    </Suspense>
  );
}
