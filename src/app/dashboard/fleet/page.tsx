"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Calendar,
  Layers,
  Edit2,
  Trash2,
  Save,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { Equipment } from "@/lib/types";
import { AddonUpsellCard } from "@/components/dashboard/AddonUpsellCard";
import { cn } from "@/lib/utils";

const INITIAL_FLEET: Equipment[] = [
  {
    id: "eq-1",
    farm_id: "demo-farm",
    name: "John Deere 6155R (Front Loader)",
    type: "Tractor",
    purchase_date: "2021-03-15",
    last_service_date: "2025-09-10",
    service_interval_days: 365,
    notes: "Main arable workhorse. 500-hour engine oil and transmission filter service.",
    created_at: "",
    updated_at: "",
  },
  {
    id: "eq-2",
    farm_id: "demo-farm",
    name: "Bateman RB35 Self-Propelled Sprayer",
    type: "Sprayer",
    purchase_date: "2020-05-20",
    last_service_date: "2026-03-01",
    service_interval_days: 180,
    notes: "NSTSO certified boom. 6-month hydraulic fluid and nozzle flow test.",
    created_at: "",
    updated_at: "",
  },
  {
    id: "eq-3",
    farm_id: "demo-farm",
    name: "Claas Lexion 760 TT Combine",
    type: "Combine",
    purchase_date: "2019-07-10",
    last_service_date: "2025-08-15",
    service_interval_days: 365,
    notes: "Pre-harvest cutterbar and drum inspection.",
    created_at: "",
    updated_at: "",
  },
];

export default function FleetPage() {
  const { farm } = useAuth();
  
  // Entitlement check (mock active for demo unless toggled in billing)
  const [hasEntitlement, setHasEntitlement] = useState(true);
  const [fleet, setFleet] = useState<Equipment[]>(INITIAL_FLEET);
  const [editingItem, setEditingItem] = useState<Partial<Equipment> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Calculate service due metrics
  const getServiceStatus = (lastDateStr: string, intervalDays: number) => {
    const lastDate = new Date(lastDateStr).getTime();
    const nextDue = new Date(lastDate + intervalDays * 86400000);
    const now = Date.now();
    const diffDays = Math.round((nextDue.getTime() - now) / 86400000);

    if (diffDays < 0) {
      return {
        status: "overdue",
        label: `Overdue by ${Math.abs(diffDays)} days`,
        color: "text-red-700 bg-red-100 border-red-300",
        nextDueDate: nextDue.toLocaleDateString("en-GB"),
      };
    } else if (diffDays <= 14) {
      return {
        status: "due_soon",
        label: `Service due in ${diffDays} days`,
        color: "text-amber-800 bg-amber-100 border-amber-300",
        nextDueDate: nextDue.toLocaleDateString("en-GB"),
      };
    }
    return {
      status: "ok",
      label: `Service due in ${diffDays} days`,
      color: "text-forest-800 bg-forest-100 border-forest-300",
      nextDueDate: nextDue.toLocaleDateString("en-GB"),
    };
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.name || !editingItem?.type) return;

    if (isNew) {
      const newEq: Equipment = {
        id: `eq-${Date.now()}`,
        farm_id: farm?.id || "demo-farm",
        name: editingItem.name,
        type: editingItem.type,
        purchase_date: editingItem.purchase_date || null,
        last_service_date: editingItem.last_service_date || new Date().toISOString().split("T")[0],
        service_interval_days: Number(editingItem.service_interval_days) || 365,
        notes: editingItem.notes || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setFleet([newEq, ...fleet]);
    } else {
      setFleet(fleet.map((item) => (item.id === editingItem.id ? { ...item, ...editingItem } as Equipment : item)));
    }

    setEditingItem(null);
    setIsNew(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this machine from holding records?")) return;
    setFleet(fleet.filter((f) => f.id !== id));
  };

  if (!hasEntitlement) {
    return <AddonUpsellCard addonKey="fleet_management" farmName={farm?.name} />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-parchment-300 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="forest">Premium Add-on Module</Badge>
            <span className="text-xs text-charcoal-500 font-medium">NSTSO &amp; Maintenance Logs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 mt-1">
            Fleet &amp; Machinery Management
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Keep heavy equipment audit-ready. Proactive service reminders are automatically created 14 days before inspection deadlines.
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => {
            setIsNew(true);
            setEditingItem({
              name: "",
              type: "Tractor",
              last_service_date: new Date().toISOString().split("T")[0],
              service_interval_days: 365,
              notes: "",
            });
          }}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Machine / Implement
        </Button>
      </div>

      {saveSuccess && (
        <div className="p-3 rounded-lg bg-forest-100 border border-forest-300 text-forest-900 flex items-center space-x-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-forest-700 flex-shrink-0" />
          <span>Equipment records updated and synced with proactive maintenance engine.</span>
        </div>
      )}

      {/* Add / Edit Machine Form */}
      {editingItem && (
        <Card variant="linen" className="p-6 sm:p-8 border-2 border-forest-800 shadow-warm space-y-5">
          <h2 className="font-serif font-bold text-lg text-forest-900 border-b border-parchment-200 pb-2">
            {isNew ? "Register New Machine" : `Edit ${editingItem.name}`}
          </h2>

          <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                  Machine Make &amp; Model
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="e.g. John Deere 6155R"
                  className="w-full p-2.5 rounded-md bg-white border border-parchment-300"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                  Equipment Category
                </label>
                <select
                  value={editingItem.type || "Tractor"}
                  onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                  className="w-full p-2.5 rounded-md bg-white border border-parchment-300 font-medium"
                >
                  <option value="Tractor">Tractor</option>
                  <option value="Combine">Combine Harvester</option>
                  <option value="Sprayer">Self-Propelled / Trailed Sprayer</option>
                  <option value="Drill">Cultivator &amp; Seed Drill</option>
                  <option value="Telehandler">Telehandler / Yard Loader</option>
                  <option value="Trailer">Silage / Grain Trailer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                  Service Interval (Days)
                </label>
                <input
                  type="number"
                  required
                  value={editingItem.service_interval_days || 365}
                  onChange={(e) => setEditingItem({ ...editingItem, service_interval_days: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-md bg-white border border-parchment-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                  Last Service / MOT Date
                </label>
                <input
                  type="date"
                  required
                  value={editingItem.last_service_date || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, last_service_date: e.target.value })}
                  className="w-full p-2.5 rounded-md bg-white border border-parchment-300"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                  Purchase Date (Optional)
                </label>
                <input
                  type="date"
                  value={editingItem.purchase_date || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, purchase_date: e.target.value })}
                  className="w-full p-2.5 rounded-md bg-white border border-parchment-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                Maintenance Notes &amp; Statutory Certifications
              </label>
              <textarea
                rows={2}
                value={editingItem.notes || ""}
                onChange={(e) => setEditingItem({ ...editingItem, notes: e.target.value })}
                placeholder="e.g. NSTSO annual test certificate #8291. Replace fuel filters at next 500h."
                className="w-full p-2.5 rounded-md bg-white border border-parchment-300"
              />
            </div>

            <div className="pt-3 border-t border-parchment-200 flex justify-end space-x-3">
              <Button type="button" variant="ghost" size="sm" onClick={() => setEditingItem(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                <Save className="w-4 h-4 mr-1" />
                Save Equipment
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Machinery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fleet.map((machine) => {
          const service = getServiceStatus(machine.last_service_date, machine.service_interval_days);

          return (
            <Card key={machine.id} variant="linen" className="p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-parchment-200 text-charcoal-700 px-2 py-0.5 rounded">
                    {machine.type}
                  </span>
                  <span className={cn("text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border", service.color)}>
                    {service.label}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-base text-forest-950">
                    {machine.name}
                  </h3>
                  <p className="text-xs text-charcoal-500 pt-0.5">
                    Next Due: {service.nextDueDate} (Every {machine.service_interval_days} days)
                  </p>
                </div>

                {machine.notes && (
                  <p className="text-xs text-charcoal-600 leading-relaxed italic bg-parchment-50 p-2.5 rounded border border-parchment-200">
                    &quot;{machine.notes}&quot;
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-parchment-200 flex items-center justify-between text-xs">
                <span className="text-charcoal-400">
                  Last serviced: {new Date(machine.last_service_date).toLocaleDateString("en-GB")}
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsNew(false);
                      setEditingItem(machine);
                    }}
                    className="p-1 rounded hover:bg-parchment-200 text-forest-800"
                    title="Edit machine"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(machine.id)}
                    className="p-1 rounded hover:bg-red-50 text-red-700"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
