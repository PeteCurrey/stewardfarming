"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sprout, LayoutDashboard, LogOut } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, farm, signOut } = useAuth();

  const isHomePage = pathname === "/";
  const isDashboardRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding");

  // Track scroll position to transition from transparent → frosted on scroll
  useEffect(() => {
    if (!isHomePage) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomePage]);

  // On non-home pages (or dashboard) always show the solid parchment bar
  const isTransparent = isHomePage && !scrolled && !mobileMenuOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent border-b border-transparent"
          : "bg-[#F5F0E6]/95 backdrop-blur-md border-b border-parchment-300 shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Wordmark Logo */}
          <Link
            href={user && farm ? "/dashboard" : "/"}
            className="flex items-center space-x-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 rounded-md p-1"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center shadow-sm border transition-colors",
                isTransparent
                  ? "bg-white/20 backdrop-blur-sm border-white/30 group-hover:bg-white/30"
                  : "bg-forest-800 border-forest-900 group-hover:bg-forest-900"
              )}
            >
              <Sprout
                className={cn(
                  "w-5 h-5",
                  isTransparent ? "text-white" : "text-gold-400"
                )}
              />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "font-serif text-2xl font-bold tracking-tight leading-none transition-colors",
                  isTransparent ? "text-white drop-shadow" : "text-forest-900"
                )}
              >
                Steward
              </span>
              <span
                className={cn(
                  "text-[10px] tracking-[0.2em] uppercase font-semibold mt-1 transition-colors",
                  isTransparent
                    ? "text-white/80 drop-shadow"
                    : "text-terracotta-700"
                )}
              >
                Farming Advisory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {!isDashboardRoute && (
            <nav
              className="hidden md:flex items-center space-x-8"
              aria-label="Main Navigation"
            >
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors py-1 relative",
                      isTransparent
                        ? isActive
                          ? "text-white font-semibold drop-shadow"
                          : "text-white/80 hover:text-white drop-shadow"
                        : isActive
                        ? "text-forest-900 font-semibold"
                        : "text-charcoal-700 hover:text-forest-800"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 w-full h-0.5 rounded-full",
                          isTransparent ? "bg-white" : "bg-terracotta-600"
                        )}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* CTA / Auth State */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/dashboard"
                  className={cn(
                    "inline-flex items-center space-x-2 text-sm font-semibold px-3.5 py-2 rounded-md border transition-colors",
                    isTransparent
                      ? "bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                      : "bg-parchment-200/80 border-parchment-400 text-forest-900 hover:bg-parchment-300"
                  )}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{farm ? farm.name : "My Dashboard"}</span>
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    isTransparent
                      ? "text-white/80 hover:text-white hover:bg-white/20"
                      : "text-charcoal-600 hover:text-terracotta-700 hover:bg-parchment-200"
                  )}
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(
                    "text-sm font-medium px-3 py-2 transition-colors",
                    isTransparent
                      ? "text-white/90 hover:text-white drop-shadow"
                      : "text-charcoal-700 hover:text-forest-900"
                  )}
                >
                  Sign In
                </Link>
                <Button
                  href="/signup"
                  variant={isTransparent ? "gold" : "primary"}
                  size="md"
                >
                  Start Free Trial
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-forest-700 transition-colors",
                isTransparent
                  ? "text-white hover:bg-white/20"
                  : "text-charcoal-800 hover:bg-parchment-200"
              )}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
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
