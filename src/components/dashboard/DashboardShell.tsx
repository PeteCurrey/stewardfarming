"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquareText,
  CheckSquare,
  Tractor,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Sprout,
  ShieldCheck,
  ChevronRight,
  Wrench,
  Layers,
  FileText,
  Leaf,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AdvisorPortrait } from "@/components/ui/AdvisorPortrait";
import { ADVISOR_PERSONAS } from "@/lib/types";
import { cn } from "@/lib/utils";

const DASHBOARD_LINKS = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Advisor Chat", href: "/dashboard/chat", icon: MessageSquareText },
  { name: "Tasks & Alerts", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "Subsidies & Grants", href: "/dashboard/subsidies", icon: FileText },
  { name: "Fields & Satellite", href: "/dashboard/fields", icon: Layers },
  { name: "Fleet & Machinery", href: "/dashboard/fleet", icon: Wrench },
  { name: "Market Intelligence", href: "/dashboard/market", icon: TrendingUp },
  { name: "Carbon & Soil", href: "/dashboard/carbon", icon: Leaf },
  { name: "Farm Profile", href: "/dashboard/profile", icon: Tractor },
  { name: "Ask an Expert", href: "/dashboard/expert", icon: HelpCircle },
  { name: "Billing & Plans", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { farm, signOut } = useAuth();

  const farmType = farm?.farm_type || "arable";
  const advisor = ADVISOR_PERSONAS[farmType];

  return (
    <div className="min-h-screen bg-parchment-100 flex flex-col md:flex-row">
      
      {/* Mobile top bar */}
      <div className="md:hidden bg-forest-900 text-parchment-100 px-4 py-3 flex items-center justify-between border-b border-forest-800 sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded bg-forest-800 flex items-center justify-center text-gold-400">
            <Sprout className="w-4 h-4" />
          </div>
          <span className="font-serif font-bold text-lg text-parchment-50">
            {farm?.name || "Steward Farm"}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md hover:bg-forest-800 text-parchment-200"
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-forest-950 text-parchment-200 flex flex-col justify-between border-r border-forest-800 transition-transform duration-200 ease-in-out md:static md:translate-x-0",
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        )}
      >
        <div className="p-6 space-y-6">
          
          {/* Farm Brand Header */}
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 group"
              onClick={() => setSidebarOpen(false)}
            >
              <div className="w-9 h-9 rounded-lg bg-forest-800 flex items-center justify-center text-parchment-50 border border-forest-700">
                <Sprout className="w-5 h-5 text-gold-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-parchment-50 leading-none">
                  Steward
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-terracotta-400 mt-1">
                  Farm Dashboard
                </span>
              </div>
            </Link>

            <div className="pt-3 border-t border-forest-900">
              <p className="text-xs font-serif font-bold text-parchment-50 truncate">
                {farm?.name || "Highfield Grange Farm"}
              </p>
              <p className="text-[11px] text-parchment-400">
                {farm?.size_hectares || 240} ha &bull; {farmType.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Dedicated Advisor Teaser Card in Sidebar */}
          <div className="p-3.5 rounded-xl bg-forest-900/80 border border-forest-800 space-y-2">
            <div className="flex items-center space-x-3">
              <AdvisorPortrait type={farmType} name={advisor.name} size="sm" />
              <div className="space-y-0.5">
                <p className="text-xs font-serif font-bold text-parchment-50 leading-none">
                  {advisor.name}
                </p>
                <p className="text-[10px] text-gold-400 font-medium">
                  {advisor.role.split("&")[0]}
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/chat"
              onClick={() => setSidebarOpen(false)}
              className="block text-center text-[11px] font-semibold text-parchment-200 hover:text-gold-300 bg-forest-800/80 hover:bg-forest-800 py-1.5 rounded transition-colors"
            >
              Ask {advisor.name.split(" ")[0]} a question &rarr;
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-0.5" aria-label="Dashboard Navigation">
            {DASHBOARD_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                    isActive
                      ? "bg-forest-800 text-parchment-50 font-semibold shadow-sm border border-forest-700"
                      : "text-parchment-300 hover:bg-forest-900 hover:text-parchment-100"
                  )}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon
                      className={cn(
                        "w-4 h-4",
                        isActive ? "text-gold-400" : "text-parchment-400"
                      )}
                    />
                    <span>{link.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-gold-400" />}
                </Link>
              );
            })}
          </nav>

        </div>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-forest-900 space-y-3">
          <div className="flex items-center space-x-2 text-[11px] text-parchment-400">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
            <span>UK Farm Data Sovereign</span>
          </div>

          <button
            type="button"
            onClick={signOut}
            className="flex items-center space-x-2 text-xs text-parchment-400 hover:text-terracotta-400 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>

    </div>
  );
}
