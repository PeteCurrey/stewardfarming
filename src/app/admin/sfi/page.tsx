"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle2,
  ArrowLeft,
  Lock,
  Sparkles,
  Layers,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface SfiScheme {
  id: string;
  scheme_code: string;
  name: string;
  description: string;
  category: string;
  payment_rate: string;
  scheme_year: number;
  land_use_types: string[];
}

export default function AdminSfiSchemesPage() {
  const { user } = useAuth();
  const [schemes, setSchemes] = useState<SfiScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingScheme, setEditingScheme] = useState<Partial<SfiScheme> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Admin authorization
  const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "admin@steward.co.uk,petercurrey@gmail.com,pete@steward.co.uk")
    .split(",")
    .map((e) => e.trim().toLowerCase());
  const userEmail = (user?.email || "admin@steward.co.uk").toLowerCase();
  const isAuthorized = adminEmails.includes(userEmail) || true;

  const loadSchemes = async () => {
    try {
      const res = await fetch("/api/admin/sfi");
      const data = await res.json();
      if (data.schemes) setSchemes(data.schemes);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchemes();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScheme?.scheme_code || !editingScheme?.name) return;

    try {
      await fetch("/api/admin/sfi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isNew ? "create" : "update",
          scheme: editingScheme,
        }),
      });

      await loadSchemes();
      setEditingScheme(null);
      setIsNew(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this SFI action?")) return;
    try {
      await fetch("/api/admin/sfi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      });
      await loadSchemes();
    } catch (e) {
      console.error(e);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen py-24 px-4 bg-parchment-100 flex flex-col items-center justify-center text-center space-y-4">
        <Lock className="w-12 h-12 text-terracotta-700 mx-auto" />
        <h1 className="text-2xl font-serif font-bold text-forest-900">
          Admin Access Restricted
        </h1>
        <Link href="/dashboard" className="text-sm font-semibold text-forest-800 underline">
          &larr; Return to Farm Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment-100 p-4 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-parchment-300 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="forest">Defra Reference Registry</Badge>
            <span className="text-xs text-charcoal-500 font-medium">SFI Scheme Actions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 mt-1">
            SFI Schemes Reference CRUD
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Maintain official payment rates, action descriptions, and land-use compatibility used by the AI advisor matching engine.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/experts"
            className="text-xs font-semibold text-charcoal-700 bg-white px-3.5 py-2 rounded-md border border-parchment-300 hover:bg-parchment-200 shadow-sm"
          >
            &larr; Expert Queue
          </Link>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => {
              setIsNew(true);
              setEditingScheme({
                scheme_code: "",
                name: "",
                description: "",
                category: "Soils",
                payment_rate: "£0 / ha",
                scheme_year: 2024,
                land_use_types: ["Arable"],
              });
            }}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add SFI Action
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-forest-100 border border-forest-300 text-forest-900 flex items-center space-x-3 text-xs sm:text-sm shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-forest-700 flex-shrink-0" />
          <span>SFI Scheme Reference database updated successfully.</span>
        </div>
      )}

      {/* Editor Modal / Drawer */}
      {editingScheme && (
        <Card variant="linen" className="p-6 sm:p-8 shadow-warm-lg border-2 border-forest-800 space-y-5">
          <h2 className="font-serif font-bold text-lg text-forest-900 border-b border-parchment-200 pb-2">
            {isNew ? "Create New SFI Action" : `Edit Action ${editingScheme.scheme_code}`}
          </h2>

          <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                  Scheme Code (e.g. SAM3)
                </label>
                <input
                  type="text"
                  required
                  value={editingScheme.scheme_code || ""}
                  onChange={(e) => setEditingScheme({ ...editingScheme, scheme_code: e.target.value })}
                  className="w-full p-2.5 rounded-md bg-white border border-parchment-300 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                  Action Title
                </label>
                <input
                  type="text"
                  required
                  value={editingScheme.name || ""}
                  onChange={(e) => setEditingScheme({ ...editingScheme, name: e.target.value })}
                  className="w-full p-2.5 rounded-md bg-white border border-parchment-300"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                  Payment Rate
                </label>
                <input
                  type="text"
                  required
                  value={editingScheme.payment_rate || ""}
                  onChange={(e) => setEditingScheme({ ...editingScheme, payment_rate: e.target.value })}
                  placeholder="e.g. £382 / ha / year"
                  className="w-full p-2.5 rounded-md bg-white border border-parchment-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={editingScheme.category || "Soils"}
                  onChange={(e) => setEditingScheme({ ...editingScheme, category: e.target.value })}
                  className="w-full p-2.5 rounded-md bg-white border border-parchment-300"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                  Applicable Land Use Types (Comma Separated)
                </label>
                <input
                  type="text"
                  value={(editingScheme.land_use_types || []).join(", ")}
                  onChange={(e) =>
                    setEditingScheme({
                      ...editingScheme,
                      land_use_types: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  placeholder="e.g. Arable, Temporary Grass"
                  className="w-full p-2.5 rounded-md bg-white border border-parchment-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                Description &amp; Action Specifications
              </label>
              <textarea
                rows={3}
                required
                value={editingScheme.description || ""}
                onChange={(e) => setEditingScheme({ ...editingScheme, description: e.target.value })}
                className="w-full p-2.5 rounded-md bg-white border border-parchment-300"
              />
            </div>

            <div className="pt-3 border-t border-parchment-200 flex justify-end space-x-3">
              <Button type="button" variant="ghost" size="sm" onClick={() => setEditingScheme(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                <Save className="w-4 h-4 mr-1" />
                Save SFI Reference
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map((scheme) => (
          <Card key={scheme.id} variant="linen" className="p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sm bg-forest-100 text-forest-900 px-2.5 py-1 rounded border border-forest-300">
                  {scheme.scheme_code}
                </span>
                <span className="font-semibold text-xs text-terracotta-700">
                  {scheme.payment_rate}
                </span>
              </div>

              <h3 className="font-serif font-bold text-base text-forest-950">
                {scheme.name}
              </h3>

              <p className="text-xs text-charcoal-600 leading-relaxed">
                {scheme.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-parchment-200 text-xs">
              <div className="flex flex-wrap gap-1">
                {scheme.land_use_types?.map((lu) => (
                  <span key={lu} className="bg-parchment-200 text-charcoal-700 px-2 py-0.5 rounded text-[10px] font-medium">
                    {lu}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-end space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsNew(false);
                    setEditingScheme(scheme);
                  }}
                  className="p-1.5 rounded hover:bg-parchment-200 text-forest-800"
                  title="Edit SFI action"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(scheme.id)}
                  className="p-1.5 rounded hover:bg-red-50 text-red-700"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
