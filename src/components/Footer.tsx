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
    <footer className="bg-obsidian-950 text-parchment-200 border-t border-white/10 relative overflow-hidden">
      
      {/* Subtle background radar scanline */}
      <div className="absolute inset-0 bg-tactical-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        
        {/* Top Technical Assurance Banner */}
        <div className="mb-16 p-6 rounded-panel bg-obsidian-900 border border-white/10 grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-mono">
          <div className="flex items-center space-x-3">
            <Radio className="w-4 h-4 text-volt flex-shrink-0" />
            <div>
              <span className="text-white font-bold block">MET OFFICE DATAHUB</span>
              <span className="text-parchment-400 text-[11px]">1.1km Spot Radar Ingestion</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Globe className="w-4 h-4 text-gold-coutts flex-shrink-0" />
            <div>
              <span className="text-white font-bold block">SENTINEL-2 L2A</span>
              <span className="text-parchment-400 text-[11px]">10m Multispectral NDVI</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Lock className="w-4 h-4 text-volt flex-shrink-0" />
            <div>
              <span className="text-white font-bold block">SOVEREIGN UK DATA</span>
              <span className="text-parchment-400 text-[11px]">100% Farmer-Owned IP</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Cpu className="w-4 h-4 text-parchment-300 flex-shrink-0" />
            <div>
              <span className="text-white font-bold block">AUTONOMY GUARDRAILS</span>
              <span className="text-parchment-400 text-[11px]">Traffic-Light Tier Control</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* Col 1 & 2: Brand and Institutional Mission */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center space-x-3 group inline-block">
              <div className="w-10 h-10 rounded-tech bg-forest-900 flex items-center justify-center text-parchment-50 border border-forest-600/80 group-hover:border-volt transition-colors">
                <Sprout className="w-5 h-5 text-volt" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                  Steward
                </span>
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase font-semibold text-gold-coutts mt-1">
                  FARMING ADVISORY &bull; UK
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-parchment-300 leading-relaxed max-w-sm font-sans">
              The high-precision autonomous agronomy and fiduciary farm operating system for British agriculture. Built to executive standard, backed by accredited human specialists.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-parchment-400">
              <span className="flex items-center text-parchment-300">
                <ShieldCheck className="w-4 h-4 text-volt mr-1.5" />
                Defra SFI Compliant
              </span>
              <span className="flex items-center text-parchment-300">
                <MapPin className="w-4 h-4 text-gold-coutts mr-1.5" />
                United Kingdom Holding Registry
              </span>
            </div>
          </div>

          {/* Col 3: Advisory Personnel */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-gold-coutts">
              Specialist Roster
            </h3>
            <ul className="space-y-2.5 text-xs font-mono text-parchment-300">
              <li>
                <Link href="/advisors#arable" className="hover:text-volt transition-colors">
                  [AG-01] Arable &bull; Tom Campbell
                </Link>
              </li>
              <li>
                <Link href="/advisors#livestock" className="hover:text-volt transition-colors">
                  [LS-02] Livestock &bull; Fiona MacLeod
                </Link>
              </li>
              <li>
                <Link href="/advisors#mixed" className="hover:text-volt transition-colors">
                  [MX-03] Mixed &bull; Alistair Reid
                </Link>
              </li>
              <li>
                <Link href="/advisors#dairy" className="hover:text-volt transition-colors">
                  [DY-04] Dairy &bull; Eleanor Wright
                </Link>
              </li>
              <li>
                <Link href="/advisors" className="text-volt hover:underline flex items-center">
                  View Full Credentials &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Engine */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-gold-coutts">
              Platform Subsystems
            </h3>
            <ul className="space-y-2.5 text-xs font-mono text-parchment-300">
              <li>
                <Link href="/how-it-works" className="hover:text-volt transition-colors">
                  Autonomous Review Engine
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-volt transition-colors">
                  10-Pillar Agronomy Matrix
                </Link>
              </li>
              <li>
                <Link href="/features#sfi" className="hover:text-volt transition-colors">
                  Defra SFI Stacking Solver
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-volt transition-colors">
                  Enterprise Plans &amp; Add-ons
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-volt transition-colors">
                  Initiate 30-Day Holding Trial
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Security & Protocol */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-gold-coutts">
              Fiduciary Protocol
            </h3>
            <ul className="space-y-2.5 text-xs font-mono text-parchment-300">
              <li>
                <Link href="/about" className="hover:text-volt transition-colors">
                  Agricultural Pedigree
                </Link>
              </li>
              <li>
                <Link href="/about#network" className="hover:text-volt transition-colors">
                  RCVS &amp; BASIS Human Escalation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-volt transition-colors">
                  Data Sovereignty Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-volt transition-colors">
                  Commercial Terms
                </Link>
              </li>
              <li>
                <a href="mailto:enquiries@steward.co.uk" className="hover:text-volt transition-colors flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1 text-gold-coutts" />
                  Executive Desk
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-parchment-400 space-y-4 sm:space-y-0">
          <p>
            &copy; {new Date().getFullYear()} STEWARD AGRICULTURAL TECHNOLOGIES LTD &bull; REGISTERED IN ENGLAND &amp; WALES &bull; DATA PROTECTION REF: ZB481092
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-volt transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-volt transition-colors">
              Terms
            </Link>
            <Link href="/about#security" className="hover:text-volt transition-colors">
              ISO Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
