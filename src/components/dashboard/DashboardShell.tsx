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
  Wrench,
  Layers,
  FileText,
  Leaf,
  TrendingUp,
  CreditCard,
  Radio,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AdvisorPortrait } from "@/components/ui/AdvisorPortrait";
import { ADVISOR_PERSONAS } from "@/lib/types";
import { cn } from "@/lib/utils";

const DASHBOARD_LINKS = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Advisor Chat", href: "/dashboard/chat", icon: MessageSquareText },
  { name: "Tasks & Approvals", href: "/dashboard/tasks", icon: CheckSquare },
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row">
      
      {/* Mobile top bar */}
      <div className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-forest-900 flex items-center justify-center text-white border border-forest-700">
            <Sprout className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-medium text-base text-white truncate max-w-[200px]">
              {farm?.name || "Steward Farm"}
            </span>
            <span className="text-[10px] text-slate-400">
              {farmType.toUpperCase()} HOLDING
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-300"
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-200 ease-in-out md:static md:translate-x-0 shadow-xl",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-5 space-y-6">
          
          {/* Farm Brand Header */}
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2.5 group"
              onClick={() => setSidebarOpen(false)}
            >
              <div className="w-9 h-9 rounded-lg bg-forest-900 flex items-center justify-center text-white border border-forest-700">
                <Sprout className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-white leading-none">
                  Steward
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase font-semibold text-amber-400 mt-1">
                  Farm Cockpit
                </span>
              </div>
            </Link>

            <div className="pt-3 border-t border-slate-800 space-y-0.5">
              <p className="text-xs font-medium text-white truncate">
                {farm?.name || "Highfield Grange Farm"}
              </p>
              <p className="text-[11px] text-slate-400">
                {farm?.size_hectares || 240} ha &bull; {farmType.charAt(0).toUpperCase() + farmType.slice(1)}
              </p>
            </div>
          </div>

          {/* Dedicated Advisor in Sidebar */}
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2.5">
            <div className="flex items-center space-x-2.5">
              <AdvisorPortrait type={farmType} name={advisor.name} size="sm" />
              <div className="space-y-0.5 min-w-0">
                <p className="text-xs font-medium text-white leading-none truncate">
                  {advisor.name}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {advisor.role.split("&")[0]}
                </p>
                <div className="flex items-center space-x-1 text-[10px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Available</span>
                </div>
              </div>
            </div>
            <Link
              href="/dashboard/chat"
              onClick={() => setSidebarOpen(false)}
              className="block text-center text-xs font-medium text-white bg-forest-900 hover:bg-forest-800 py-1.5 rounded-lg shadow-sm transition-colors"
            >
              Consult {advisor.name.split(" ")[0]} &rarr;
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
                      ? "bg-forest-900 text-white font-semibold"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon
                      className={cn(
                        "w-4 h-4",
                        isActive ? "text-emerald-400" : "text-slate-400"
                      )}
                    />
                    <span>{link.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

        </div>

        {/* Sidebar Footer */}
        <div className="p-5 border-t border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-[11px] text-slate-400">
            <Radio className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>Met Office 1.1km Radar: Online</span>
          </div>

          <button
            type="button"
            onClick={signOut}
            className="flex items-center space-x-2 text-xs font-medium text-slate-400 hover:text-white transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area: Clean Light Slate Surface */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50">
        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>

    </div>
  );
}
