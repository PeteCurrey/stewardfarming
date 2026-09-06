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
  Radio,
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
    <div className="min-h-screen bg-obsidian-950 text-parchment-100 flex flex-col md:flex-row">
      
      {/* Mobile top bar */}
      <div className="md:hidden bg-obsidian-900 text-parchment-100 px-4 py-3 flex items-center justify-between border-b border-white/10 sticky top-0 z-40">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-tech bg-forest-900 flex items-center justify-center text-volt border border-forest-600/80">
            <Sprout className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base text-white truncate max-w-[200px]">
              {farm?.name || "Steward Farm"}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-volt">
              [HUD // ACTIVE]
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-tech hover:bg-white/10 text-parchment-200"
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <X className="w-6 h-6 text-volt" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-obsidian-950 text-parchment-200 flex flex-col justify-between border-r border-white/10 transition-transform duration-200 ease-in-out md:static md:translate-x-0 shadow-2xl",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 space-y-6">
          
          {/* Farm Brand Header */}
          <div className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 group"
              onClick={() => setSidebarOpen(false)}
            >
              <div className="w-10 h-10 rounded-tech bg-forest-900 flex items-center justify-center text-parchment-50 border border-forest-600/80 group-hover:border-volt transition-colors relative">
                <Sprout className="w-5 h-5 text-volt" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-volt" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-serif text-xl font-bold tracking-tight text-white leading-none">
                    Steward
                  </span>
                  <span className="font-mono text-[8px] px-1 py-0.5 rounded-tech bg-volt/10 text-volt border border-volt/30 font-bold uppercase">
                    PRO
                  </span>
                </div>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase font-semibold text-gold-coutts mt-1">
                  COMMAND CENTER
                </span>
              </div>
            </Link>

            <div className="pt-3 border-t border-white/10 space-y-0.5">
              <p className="text-xs font-serif font-bold text-white truncate">
                {farm?.name || "Highfield Grange Farm"}
              </p>
              <p className="text-[11px] font-mono text-parchment-400">
                {farm?.size_hectares || 240} HA &bull; {farmType.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Dedicated Advisor HUD Teaser Card in Sidebar */}
          <div className="p-3.5 rounded-panel bg-obsidian-900 border border-white/10 space-y-2.5">
            <div className="flex items-center space-x-3">
              <AdvisorPortrait type={farmType} name={advisor.name} size="sm" />
              <div className="space-y-0.5">
                <p className="text-xs font-serif font-bold text-white leading-none">
                  {advisor.name}
                </p>
                <p className="text-[10px] font-mono text-gold-300">
                  {advisor.role.split("&")[0]}
                </p>
                <div className="flex items-center space-x-1 text-[9px] font-mono text-volt">
                  <span className="w-1.5 h-1.5 rounded-full bg-volt animate-volt-pulse" />
                  <span>ON DUTY</span>
                </div>
              </div>
            </div>
            <Link
              href="/dashboard/chat"
              onClick={() => setSidebarOpen(false)}
              className="block text-center text-[10px] font-mono uppercase tracking-wider font-bold text-obsidian-950 bg-volt hover:bg-[#00FF85] py-1.5 rounded-tech shadow-sm transition-colors"
            >
              Consult {advisor.name.split(" ")[0]} &rarr;
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1" aria-label="Dashboard Navigation">
            {DASHBOARD_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-tech text-xs font-mono uppercase tracking-wider transition-colors",
                    isActive
                      ? "bg-volt/15 text-volt font-bold border border-volt/30 shadow-[0_0_12px_rgba(0,230,118,0.15)]"
                      : "text-parchment-300/80 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon
                      className={cn(
                        "w-4 h-4",
                        isActive ? "text-volt" : "text-parchment-400"
                      )}
                    />
                    <span>{link.name}</span>
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-volt" />}
                </Link>
              );
            })}
          </nav>

        </div>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-white/10 space-y-3">
          <div className="flex items-center space-x-2 text-[10px] font-mono text-parchment-400">
            <Radio className="w-3.5 h-3.5 text-volt flex-shrink-0" />
            <span>RADAR: 1.1KM MET OFFICE</span>
          </div>

          <button
            type="button"
            onClick={signOut}
            className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-parchment-400 hover:text-terracotta-400 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-obsidian-950">
        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>

    </div>
  );
}
