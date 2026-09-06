"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sprout, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "./ui/Button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Advisors", href: "/advisors" },
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

  const isDarkNav = isHomePage && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled || !isHomePage
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3"
          : "bg-transparent border-b border-white/10 py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Wordmark Logo */}
          <Link
            href={user && farm ? "/dashboard" : "/"}
            className="flex items-center space-x-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 rounded-lg p-1"
          >
            <div className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center transition-colors shadow-sm",
              isDarkNav
                ? "bg-white/10 text-white border border-white/20"
                : "bg-forest-900 text-white"
            )}>
              <Sprout className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-sans text-2xl font-extralight tracking-wider leading-none",
                isDarkNav ? "text-white" : "text-slate-900"
              )}>
                Steward
              </span>
              <span className={cn(
                "text-[9px] tracking-[0.2em] uppercase font-semibold mt-0.5",
                isDarkNav ? "text-slate-300" : "text-slate-500"
              )}>
                Agricultural Intelligence
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
                    "text-sm font-medium transition-colors py-1 relative",
                    isDarkNav
                      ? isActive
                        ? "text-white font-semibold"
                        : "text-slate-200 hover:text-white"
                      : isActive
                        ? "text-forest-900 font-semibold"
                        : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className={cn(
                      "absolute bottom-0 left-0 w-full h-[2px] rounded-full",
                      isDarkNav ? "bg-white" : "bg-forest-900"
                    )} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center space-x-2 text-sm font-medium text-white bg-forest-900 hover:bg-forest-800 px-4 py-2 rounded-lg shadow-sm transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{farm ? farm.name : "Dashboard"}</span>
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    isDarkNav
                      ? "text-slate-300 hover:text-white hover:bg-white/10"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
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
                    isDarkNav ? "text-white hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  Sign In
                </Link>
                <Button
                  href="/signup"
                  variant={isDarkNav ? "white" : "primary"}
                  size="sm"
                >
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
              className={cn(
                "p-2 rounded-lg transition-colors",
                isDarkNav ? "text-white hover:bg-white/10" : "text-slate-700 hover:bg-slate-100"
              )}
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
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-4 pb-8 space-y-4 shadow-xl">
          <nav className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-slate-100 text-forest-900 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-slate-200 flex flex-col space-y-3">
            {user ? (
              <>
                <Button
                  href="/dashboard"
                  variant="primary"
                  size="md"
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
                  className="text-center text-sm text-slate-600 hover:text-slate-900 py-1"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Button
                  href="/signup"
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start 30-Day Free Trial
                </Button>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-sm text-slate-600 hover:text-slate-900 py-1"
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
