"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sprout, ShieldCheck, Mail, MapPin, Radio, Lock, Cpu, Globe } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const isDashboardRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding");

  if (isDashboardRoute) {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Top Technical Assurance Banner */}
        <div className="mb-14 p-6 rounded-xl bg-slate-850/60 border border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          <div className="flex items-start space-x-3">
            <Radio className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-medium block">Met Office DataHub</span>
              <span className="text-slate-400 text-xs">1.1km Spot Radar Ingestion</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Globe className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-medium block">Sentinel-2 L2A</span>
              <span className="text-slate-400 text-xs">10m Multispectral NDVI</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Lock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-medium block">Sovereign UK Data</span>
              <span className="text-slate-400 text-xs">100% Farmer-Owned IP</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-medium block">Autonomy Guardrails</span>
              <span className="text-slate-400 text-xs">Traffic-Light Human Control</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand and Institutional Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group inline-block">
              <div className="w-9 h-9 rounded-lg bg-forest-900 flex items-center justify-center text-white border border-forest-700">
                <Sprout className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                  Steward
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-amber-400 mt-0.5">
                  Agricultural Advisory &bull; UK
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Proactive farm intelligence and decision-support for British agriculture. Combining machine-grade spatial monitoring with accredited UK human specialists.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-slate-400">
              <span className="flex items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mr-2" />
                Defra SFI 2026 Compatible
              </span>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 text-amber-400 mr-2" />
                Ordnance Survey &amp; RPA Parcel Integration
              </span>
            </div>
          </div>

          {/* Col 3: Advisory Personnel */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Specialist Advisors
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/advisors" className="hover:text-white transition-colors">
                  Tom Campbell &bull; Arable
                </Link>
              </li>
              <li>
                <Link href="/advisors" className="hover:text-white transition-colors">
                  Fiona MacLeod &bull; Livestock
                </Link>
              </li>
              <li>
                <Link href="/advisors" className="hover:text-white transition-colors">
                  Alistair Reid &bull; Mixed Systems
                </Link>
              </li>
              <li>
                <Link href="/advisors" className="hover:text-white transition-colors">
                  Eleanor Wright &bull; Dairy Systems
                </Link>
              </li>
              <li>
                <Link href="/advisors" className="text-emerald-400 hover:underline">
                  Meet the Advisory Team &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Engine */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Feature Matrix
                </Link>
              </li>
              <li>
                <Link href="/features#sfi" className="hover:text-white transition-colors">
                  SFI Scheme Calculator
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing &amp; Modules
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-white transition-colors">
                  30-Day Free Trial
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Security & Protocol */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Governance &amp; Trust
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Steward
                </Link>
              </li>
              <li>
                <Link href="/about#network" className="hover:text-white transition-colors">
                  Accredited Specialist Network
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Data Sovereignty Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:enquiries@steward.co.uk" className="hover:text-white transition-colors flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <p>
            &copy; {new Date().getFullYear()} Steward Agricultural Technologies Ltd. Registered in England &amp; Wales.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Terms
            </Link>
            <Link href="/about#security" className="hover:text-slate-400 transition-colors">
              Data Protection
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
