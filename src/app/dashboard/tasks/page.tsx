"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Bell,
  Sparkles,
  ChevronRight,
  Info,
  Check,
  X,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { AutonomyTier, TaskStatus, AlertSeverity } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AmberTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  status: TaskStatus;
}

interface AdvisoryAlert {
  id: string;
  message: string;
  severity: AlertSeverity;
  read: boolean;
  timeAgo: string;
}

interface GreenTask {
  id: string;
  title: string;
  explanation: string;
  completedAt: string;
}

const INITIAL_AMBER_TASKS: AmberTask[] = [
  {
    id: "amb-1",
    title: "SFI SAM3 Herbal Leys 2024 Application Pack",
    description: "Defra action stack calculated for 32.5 ha across Valley & High Hill parcels. Estimated annual payment £12,415. Ready for single-tap submission to RPA.",
    dueDate: "Due in 14 days",
    category: "Subsidies & Grants",
    status: "pending",
  },
  {
    id: "amb-2",
    title: "Winter Wheat T1 Spray Docket Verification",
    description: "Optimal 4-hour low-drift spray window detected today between 13:30 and 17:30 (Wind 5mph, 68% RH). Pre-mixed fungicide recipe staged.",
    dueDate: "Today",
    category: "Agronomy",
    status: "pending",
  },
  {
    id: "amb-3",
    title: "Pre-Breeding Ewe & Tup Flushing Rotation",
    description: "Move breeding flock to fresh clover ley parcel ahead of autumn tupping. Targeted BCS improvement to 3.5.",
    dueDate: "Due in 7 days",
    category: "Livestock",
    status: "pending",
  },
];

const INITIAL_ALERTS: AdvisoryAlert[] = [
  {
    id: "alt-1",
    message: "Statutory NVZ closed period for manufactured nitrogen applications commences in 14 days (Sept 1st). Ensure all late-season grassland dressing records are completed.",
    severity: "urgent",
    read: false,
    timeAgo: "2 hours ago",
  },
  {
    id: "alt-2",
    message: "Defra announced updated payment rates for SFI IPM1 (£989/yr) and SFI NUM1 Legume Fallow (£593/ha). Reviewing potential allocation against your crop plan.",
    severity: "warning",
    read: false,
    timeAgo: "Yesterday",
  },
  {
    id: "alt-3",
    message: "Local rainfall radar indicates 14mm precipitation expected over Thursday night. Field cultivation in heavy clay parcels should precede this front.",
    severity: "info",
    read: true,
    timeAgo: "2 days ago",
  },
];

const INITIAL_GREEN_TASKS: GreenTask[] = [
  {
    id: "grn-1",
    title: "Automated Weather Radar & Micro-Climate Telemetry",
    explanation: "Steward monitors Met Office high-resolution models hourly to identify compliant spray windows automatically.",
    completedAt: "Updated 06:00 today",
  },
  {
    id: "grn-2",
    title: "RPA Digital Land Parcel Boundary Synchronization",
    explanation: "Holding boundary coordinates verified against Rural Payments Agency registries to prevent parcel overlap penalties.",
    completedAt: "Updated 3 days ago",
  },
  {
    id: "grn-3",
    title: "Soil Moisture Deficit & Field Capacity Monitoring",
    explanation: "Automatic calculation of soil compaction risk prior to heavy tractor operations.",
    completedAt: "Continuous background sync",
  },
];

export default function TasksAndAlertsPage() {
  const { farm } = useAuth();
  const [amberTasks, setAmberTasks] = useState<AmberTask[]>(INITIAL_AMBER_TASKS);
  const [alerts, setAlerts] = useState<AdvisoryAlert[]>(INITIAL_ALERTS);

  // 1-Tap Approve Amber Task
  const handleApprove = (id: string) => {
    setAmberTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "approved" as TaskStatus } : t))
    );
  };

  // 1-Tap Dismiss Amber Task
  const handleDismiss = (id: string) => {
    setAmberTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "dismissed" as TaskStatus } : t))
    );
  };

  // Toggle Alert Read Status
  const handleToggleAlertRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: !a.read } : a))
    );
  };

  const pendingAmberTasks = amberTasks.filter((t) => t.status === "pending");
  const processedAmberTasks = amberTasks.filter((t) => t.status !== "pending");

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="border-b border-parchment-300 pb-4 space-y-1">
        <Badge variant="forest">Proactive Task &amp; Compliance Hub</Badge>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900">
          Tasks &amp; Advisory Alerts
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 max-w-2xl">
          Everything prepared by your advisor for {farm?.name || "your holding"}. Medium-risk items require your single-tap signoff, while routine telemetry is handled quietly in the background.
        </p>
      </div>

      {/* 
        ========================================================================
        SECTION 1: NEEDS YOUR APPROVAL (AMBER TASKS)
        ========================================================================
      */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
            <h2 className="font-serif font-bold text-xl text-forest-900">
              Needs Your Approval
            </h2>
            <Badge variant="gold" size="sm">
              {pendingAmberTasks.length} Pending
            </Badge>
          </div>
        </div>

        {pendingAmberTasks.length === 0 ? (
          <div className="p-8 rounded-xl bg-white border border-parchment-300 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-forest-700 mx-auto" />
            <h3 className="font-serif font-bold text-forest-900 text-base">
              All Caught Up
            </h3>
            <p className="text-xs text-charcoal-600">
              No pending tasks require your confirmation right now. Your advisor will draft new actions during the next scheduled review.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingAmberTasks.map((task) => (
              <Card
                key={task.id}
                variant="linen"
                className="p-6 shadow-sm border-2 border-gold-400/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                      {task.category}
                    </span>
                    <span className="text-xs font-bold text-charcoal-500 font-mono">
                      &bull; {task.dueDate}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base sm:text-lg text-forest-950">
                    {task.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                    {task.description}
                  </p>
                </div>

                {/* 1-Tap Action Buttons */}
                <div className="flex items-center space-x-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-parchment-200">
                  <button
                    type="button"
                    onClick={() => handleDismiss(task.id)}
                    className="px-3 py-2 rounded-md text-xs font-semibold text-charcoal-600 hover:text-red-700 hover:bg-red-50 border border-parchment-300 transition-colors flex items-center space-x-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Dismiss</span>
                  </button>

                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={() => handleApprove(task.id)}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Approve Action
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Recently Approved / Dismissed */}
        {processedAmberTasks.length > 0 && (
          <div className="pt-2">
            <details className="text-xs text-charcoal-600 group">
              <summary className="cursor-pointer font-medium hover:text-forest-900 list-none flex items-center space-x-1">
                <span>View {processedAmberTasks.length} recently actioned items</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-open:rotate-90" />
              </summary>
              <div className="space-y-2 pt-3">
                {processedAmberTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 rounded-lg bg-parchment-50 border border-parchment-300 flex items-center justify-between text-xs"
                  >
                    <span className="font-medium text-charcoal-800">{task.title}</span>
                    <span
                      className={cn(
                        "font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded",
                        task.status === "approved"
                          ? "bg-forest-100 text-forest-800"
                          : "bg-charcoal-100 text-charcoal-600"
                      )}
                    >
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}
      </section>

      {/* 
        ========================================================================
        SECTION 2: ADVISORY ALERTS FEED
        ========================================================================
      */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-terracotta-700" />
            <h2 className="font-serif font-bold text-xl text-forest-900">
              Advisory Alerts Feed
            </h2>
          </div>
          <span className="text-xs text-charcoal-500">Advisory Only &bull; Farmer Judgment</span>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => {
            const isUrgent = alert.severity === "urgent";
            const isWarning = alert.severity === "warning";

            return (
              <div
                key={alert.id}
                className={cn(
                  "p-5 rounded-xl border transition-all flex items-start justify-between gap-4",
                  alert.read ? "bg-parchment-50 opacity-75 border-parchment-300" : "bg-white shadow-sm",
                  isUrgent
                    ? "border-l-4 border-l-red-600"
                    : isWarning
                    ? "border-l-4 border-l-amber-500"
                    : "border-l-4 border-l-forest-700"
                )}
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center space-x-2">
                    <span
                      className={cn(
                        "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded",
                        isUrgent
                          ? "bg-red-100 text-red-800"
                          : isWarning
                          ? "bg-amber-100 text-amber-800"
                          : "bg-forest-100 text-forest-800"
                      )}
                    >
                      {alert.severity}
                    </span>
                    <span className="text-[11px] text-charcoal-400 font-medium">
                      {alert.timeAgo}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-charcoal-800 leading-relaxed font-medium">
                    {alert.message}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleAlertRead(alert.id)}
                  className="text-xs text-charcoal-500 hover:text-forest-900 underline whitespace-nowrap pt-1"
                >
                  {alert.read ? "Mark unread" : "Mark as read"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 3: GREEN-TIER TASKS (STEWARD ALREADY HANDLED THIS)
        ========================================================================
      */}
      <section className="space-y-4 pt-4 border-t border-parchment-300">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-forest-700" />
          <h2 className="font-serif font-bold text-lg text-forest-900">
            Steward Already Handled This (Automated Green-Tier)
          </h2>
        </div>
        <p className="text-xs text-charcoal-600">
          Low-risk routine tasks and telemetry checks executed autonomously for transparency and peace of mind.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {INITIAL_GREEN_TASKS.map((task) => (
            <Card key={task.id} variant="linen" className="p-4 space-y-2 border border-forest-200">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800 bg-forest-100 px-2 py-0.5 rounded">
                  Automated
                </span>
                <span className="text-[10px] text-charcoal-500">{task.completedAt}</span>
              </div>
              <h3 className="font-serif font-bold text-xs sm:text-sm text-forest-950">
                {task.title}
              </h3>
              <p className="text-[11px] text-charcoal-600 leading-relaxed">
                {task.explanation}
              </p>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
}
