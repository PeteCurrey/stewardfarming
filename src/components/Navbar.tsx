"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sprout, LayoutDashboard, LogOut, ShieldCheck, Activity } from "lucide-react";
import { Button } from "./ui/Button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Advisors", href: "/advisors" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Heritage", href: "/about" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, farm, signOut } = useAuth();

  const isHomePage = pathname === "/";
  const isDashboardRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding");

  // Do not render marketing navbar on dashboard or onboarding routes
  if (isDashboardRoute) {
    return null;
  }

  // Track scroll position
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isHomePage
          ? "bg-obsidian-950/90 backdrop-blur-md border-b border-white/10 shadow-2xl"
          : "bg-transparent border-b border-white/5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Wordmark Logo */}
          <Link
            href={user && farm ? "/dashboard" : "/"}
            className="flex items-center space-x-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt rounded-tech p-1"
          >
            <div className="w-10 h-10 rounded-tech bg-forest-900 flex items-center justify-center text-parchment-50 shadow-md border border-forest-600/80 group-hover:border-volt transition-colors relative">
              <Sprout className="w-5 h-5 text-volt" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-volt animate-ping" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-volt" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                  Steward
                </span>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-tech bg-volt/10 text-volt border border-volt/30 uppercase font-bold tracking-wider hidden sm:inline-block">
                  v2.6 PRO
                </span>
              </div>
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase font-semibold text-gold-coutts mt-1">
                FARMING ADVISORY &bull; UK
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xs uppercase font-mono tracking-wider transition-colors py-1 relative",
                    isActive
                      ? "text-volt font-bold"
                      : "text-parchment-300/80 hover:text-white"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-volt rounded-full shadow-[0_0_8px_rgba(0,230,118,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Live Telemetry Radar Blip */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-tech bg-obsidian-900 border border-white/10 text-[11px] font-mono text-parchment-300">
              <span className="w-2 h-2 rounded-full bg-volt animate-volt-pulse" />
              <span className="text-volt font-bold">RADAR: ACTIVE</span>
              <span className="text-white/20">&bull;</span>
              <span className="text-parchment-400">1.1KM MET OFFICE</span>
            </div>

            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider font-bold text-obsidian-950 bg-volt hover:bg-[#00FF85] px-4 py-2 rounded-tech shadow-[0_0_14px_rgba(0,230,118,0.3)] transition-all"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-obsidian-950" />
                  <span>{farm ? farm.name : "Dashboard"}</span>
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="p-2 rounded-tech text-parchment-400 hover:text-terracotta-400 hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs uppercase font-mono tracking-wider font-semibold text-parchment-300 hover:text-white px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
                <Button href="/signup" variant="volt" size="sm">
                  Start Free Trial &rarr;
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-tech text-parchment-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-volt transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-volt" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-obsidian-950/98 backdrop-blur-xl px-4 pt-4 pb-8 space-y-4 shadow-2xl">
          <nav className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-3 rounded-tech text-xs uppercase font-mono tracking-wider transition-colors",
                  pathname === link.href
                    ? "bg-volt/10 text-volt border border-volt/30 font-bold"
                    : "text-parchment-200 hover:bg-white/5 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/10 flex flex-col space-y-3">
            {user ? (
              <>
                <Button
                  href="/dashboard"
                  variant="volt"
                  size="lg"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Enter Farm Dashboard
                </Button>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="text-center text-xs font-mono uppercase tracking-wider text-terracotta-400 py-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Button
                  href="/signup"
                  variant="volt"
                  size="lg"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start 30-Day Free Trial
                </Button>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-xs font-mono uppercase tracking-wider text-parchment-400 hover:text-white py-2"
                >
                  Existing Subscriber? Sign In &rarr;
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
