import React from "react";
import Link from "next/link";
import { Sprout, ShieldCheck, HelpCircle, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-forest-950 text-parchment-200 border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-forest-800">
          
          {/* Col 1 & 2: Brand and Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group inline-block">
              <div className="w-9 h-9 rounded-lg bg-forest-800 flex items-center justify-center text-parchment-50 border border-forest-700">
                <Sprout className="w-5 h-5 text-gold-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-parchment-50 leading-none">
                  Steward
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-terracotta-400 mt-1">
                  Farming Advisory
                </span>
              </div>
            </Link>

            <p className="text-sm text-parchment-300 leading-relaxed max-w-sm">
              The proactive AI advisor built specifically for UK farmers. Bridging everyday agronomy,
              livestock management, Defra SFI compliance, and human specialist expertise into one trusted platform.
            </p>

            <div className="pt-2 flex items-center space-x-4 text-xs text-parchment-400">
              <span className="flex items-center">
                <ShieldCheck className="w-4 h-4 text-gold-400 mr-1.5" />
                UK Farm Data Compliant
              </span>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 text-terracotta-400 mr-1.5" />
                United Kingdom
              </span>
            </div>
          </div>

          {/* Col 3: Advisory Areas */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-semibold text-parchment-50 tracking-wide">
              Advisors
            </h3>
            <ul className="space-y-2 text-sm text-parchment-300">
              <li>
                <Link href="/advisors#arable" className="hover:text-gold-300 transition-colors">
                  Arable Advisor (Tom)
                </Link>
              </li>
              <li>
                <Link href="/advisors#livestock" className="hover:text-gold-300 transition-colors">
                  Livestock Advisor (Fiona)
                </Link>
              </li>
              <li>
                <Link href="/advisors#mixed" className="hover:text-gold-300 transition-colors">
                  Mixed Farm (Alistair)
                </Link>
              </li>
              <li>
                <Link href="/advisors#dairy" className="hover:text-gold-300 transition-colors">
                  Dairy Specialist (Eleanor)
                </Link>
              </li>
              <li>
                <Link href="/advisors" className="hover:text-gold-300 transition-colors text-gold-400">
                  Meet All Advisors &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Defra */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-semibold text-parchment-50 tracking-wide">
              Platform & Schemes
            </h3>
            <ul className="space-y-2 text-sm text-parchment-300">
              <li>
                <Link href="/how-it-works" className="hover:text-gold-300 transition-colors">
                  How Steward Works
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-gold-300 transition-colors">
                  All 10 Core Features
                </Link>
              </li>
              <li>
                <Link href="/features#sfi" className="hover:text-gold-300 transition-colors">
                  SFI & Defra Grant Tracker
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-gold-300 transition-colors">
                  Pricing & Subscriptions
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-gold-300 transition-colors">
                  Start 30-Day Free Trial
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Human Network */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-semibold text-parchment-50 tracking-wide">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-parchment-300">
              <li>
                <Link href="/about" className="hover:text-gold-300 transition-colors">
                  About Our Heritage
                </Link>
              </li>
              <li>
                <Link href="/about#network" className="hover:text-gold-300 transition-colors">
                  Human Expert Network
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gold-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:enquiries@steward.co.uk" className="hover:text-gold-300 transition-colors flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1 text-gold-400" />
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-parchment-400 space-y-4 sm:space-y-0">
          <p>
            &copy; {new Date().getFullYear()} Steward Advisory Ltd. Registered in England & Wales. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-parchment-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-parchment-200">
              Terms & Conditions
            </Link>
            <Link href="/about#security" className="hover:text-parchment-200">
              Data Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
