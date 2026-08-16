import type { Metadata } from "next";
import React, { Suspense } from "react";
import { LoginClient } from "./LoginClient";

export const metadata: Metadata = {
  title: "Sign In to Your Farm Holding",
  description: "Sign in to your Steward agricultural advisor dashboard. Manage field logs, SFI compliance, and advisory consultations.",
  openGraph: {
    title: "Sign In — Steward UK Farming Advisory",
    description: "Access your personalised AI farm advisor.",
    url: "https://steward.co.uk/login",
  },
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-24 text-center text-charcoal-600 bg-parchment-100 font-serif">
          Loading sign in...
        </div>
      }
    >
      <LoginClient />
    </Suspense>
  );
}
