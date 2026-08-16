"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Compass, Sprout, LayoutDashboard, LogOut, User } from "lucide-react";
import { Button } from "./ui/Button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Meet Your Advisors", href: "/advisors" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, farm, signOut } = useAuth();

  const isDashboardRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding");

  return (
    <header className="sticky top-0 z-50 bg-[#F5F0E6]/95 backdrop-blur-sm border-b border-parchment-300 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Wordmark Logo */}
          <Link
            href={user && farm ? "/dashboard" : "/"}
            className="flex items-center space-x-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 rounded-md p-1"
          >
            <div className="w-10 h-10 rounded-lg bg-forest-800 flex items-center justify-center text-parchment-50 shadow-sm border border-forest-900 group-hover:bg-forest-900 transition-colors">
              <Sprout className="w-5 h-5 text-gold-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-forest-900 leading-none">
                Steward
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-terracotta-700 mt-1">
                Farming Advisory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Shown when not on dashboard shell) */}
          {!isDashboardRoute && (
            <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors py-1 relative",
                      isActive
                        ? "text-forest-900 font-semibold"
                        : "text-charcoal-700 hover:text-forest-800"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-terracotta-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Action CTAs / User Auth State */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-forest-900 bg-parchment-200/80 hover:bg-parchment-300 px-3.5 py-2 rounded-md border border-parchment-400 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-forest-800" />
                  <span>{farm ? farm.name : "My Dashboard"}</span>
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="p-2 text-charcoal-600 hover:text-terracotta-700 hover:bg-parchment-200 rounded-md transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-charcoal-700 hover:text-forest-900 px-3 py-2"
                >
                  Sign In
                </Link>
                <Button href="/signup" variant="primary" size="md">
                  Start Free Trial
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-charcoal-800 hover:bg-parchment-200 focus:outline-none focus:ring-2 focus:ring-forest-700"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-parchment-300 bg-parchment-100 px-4 pt-2 pb-6 space-y-3 shadow-warm-lg">
          <nav className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-md text-base font-medium transition-colors",
                  pathname === link.href
                    ? "bg-parchment-200 text-forest-900 font-semibold"
                    : "text-charcoal-700 hover:bg-parchment-200 hover:text-forest-900"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-parchment-300 flex flex-col space-y-2">
            {user ? (
              <>
                <Button
                  href="/dashboard"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Go to Farm Dashboard
                </Button>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="text-center text-sm font-medium text-terracotta-700 py-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Button
                  href="/signup"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Free Trial
                </Button>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-sm font-medium text-charcoal-700 py-2"
                >
                  Already registered? Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
