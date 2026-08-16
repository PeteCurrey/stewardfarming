"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Award,
  Wheat,
  PhoneCall,
  Send,
  CheckCircle2,
  Clock,
  ChevronRight,
  ArrowLeft,
  Mail,
  Loader2,
  Lock,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { ExpertRequest, ExpertStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

// Mock requests across multiple holdings for the internal admin team
const ADMIN_REQUESTS: ExpertRequest[] = [
  {
    id: "req-101",
    farm_id: "farm-1",
    expert_type: "agronomist",
    message: "Yellow rust patches identified on Flag-2 in late-sown winter wheat parcel (Valley Meadow). Requesting targeted triazole/strobilurin mix recommendation.",
    status: "open",
    created_at: "2026-08-16T14:30:00Z",
    farm: {
      id: "farm-1",
      owner_id: "usr-1",
      name: "Highfield Grange Farm",
      farm_type: "arable",
      location_address: "Thirsk, North Yorkshire",
      size_hectares: 240,
      created_at: "",
      updated_at: "",
    },
    messages: [
      {
        id: "m-1",
        expert_request_id: "req-101",
        sender: "farmer",
        content: "Yellow rust patches identified on Flag-2 in late-sown winter wheat parcel (Valley Meadow). Requesting targeted triazole/strobilurin mix recommendation.",
        created_at: "2026-08-16T14:30:00Z",
      },
    ],
  },
  {
    id: "req-102",
    farm_id: "farm-2",
    expert_type: "vet",
    message: "Two cows in third lactation presenting elevated Somatic Cell Count (>400k) with sudden drop in butterfat percentage. Need herd vet review.",
    status: "routed",
    created_at: "2026-08-15T09:15:00Z",
    farm: {
      id: "farm-2",
      owner_id: "usr-2",
      name: "Meadowlands Dairy Holding",
      farm_type: "dairy",
      location_address: "Whitchurch, Shropshire",
      size_hectares: 180,
      created_at: "",
      updated_at: "",
    },
    messages: [
      {
        id: "m-2",
        expert_request_id: "req-102",
        sender: "farmer",
        content: "Two cows in third lactation presenting elevated Somatic Cell Count (>400k) with sudden drop in butterfat percentage. Need herd vet review.",
        created_at: "2026-08-15T09:15:00Z",
      },
      {
        id: "m-3",
        expert_request_id: "req-102",
        sender: "team",
        content: "Routed to Dr. Sarah Davies MRCVS (Midland Ruminant Health). She will contact you directly.",
        created_at: "2026-08-15T11:00:00Z",
      },
    ],
  },
  {
    id: "req-103",
    farm_id: "farm-3",
    expert_type: "accountant",
    message: "Guidance on Capital Allowances treatment for SFI slurry infrastructure grant claim ahead of tax year end.",
    status: "resolved",
    resolved_at: "2026-08-14T17:00:00Z",
    created_at: "2026-08-12T10:00:00Z",
    farm: {
      id: "farm-3",
      owner_id: "usr-3",
      name: "Blackford Moor Holding",
      farm_type: "mixed",
      location_address: "Hexham, Northumberland",
      size_hectares: 310,
      created_at: "",
      updated_at: "",
    },
    messages: [
      {
        id: "m-4",
        expert_request_id: "req-103",
        sender: "farmer",
        content: "Guidance on Capital Allowances treatment for SFI slurry infrastructure grant claim ahead of tax year end.",
        created_at: "2026-08-12T10:00:00Z",
      },
      {
        id: "m-5",
        expert_request_id: "req-103",
        sender: "team",
        content: "ICAEW agricultural tax partner confirmed 100% FYA treatment. Tax guidance note emailed to farmer.",
        created_at: "2026-08-14T17:00:00Z",
      },
    ],
  },
];

export default function AdminExpertsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<ExpertRequest[]>(ADMIN_REQUESTS);
  const [selectedReqId, setSelectedReqId] = useState<string>("req-101");
  const [teamReply, setTeamReply] = useState("");
  const [sending, setSending] = useState(false);

  // Admin access check (fallback to authorized in demo mode)
  const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "admin@steward.co.uk,petercurrey@gmail.com,pete@steward.co.uk,demo@steward.co.uk")
    .split(",")
    .map((e) => e.trim().toLowerCase());

  const userEmail = (user?.email || "admin@steward.co.uk").toLowerCase();
  const isAuthorizedAdmin = adminEmails.includes(userEmail) || true; // Demo permissive

  const selectedRequest = requests.find((r) => r.id === selectedReqId) || requests[0];

  const sortedRequests = [...requests].sort((a, b) => {
    if (a.priority && !b.priority) return -1;
    if (!a.priority && b.priority) return 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const handleStatusChange = async (newStatus: ExpertStatus) => {
    try {
      await fetch("/api/expert/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_status",
          requestId: selectedRequest.id,
          status: newStatus,
          farmerEmail: "farmer@holding.co.uk",
          farmName: selectedRequest.farm?.name || "Holding",
          expertType: selectedRequest.expert_type,
        }),
      });

      setRequests((prev) =>
        prev.map((r) => (r.id === selectedRequest.id ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendTeamReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamReply.trim() || sending) return;

    setSending(true);
    const newMsg = {
      id: `msg-${Date.now()}`,
      expert_request_id: selectedRequest.id,
      sender: "team" as const,
      content: teamReply,
      created_at: new Date().toISOString(),
    };

    try {
      await fetch("/api/expert/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reply",
          requestId: selectedRequest.id,
          sender: "team",
          message: teamReply,
          farmerEmail: "farmer@holding.co.uk",
          farmName: selectedRequest.farm?.name || "Holding",
          expertType: selectedRequest.expert_type,
        }),
      });

      setRequests((prev) =>
        prev.map((r) =>
          r.id === selectedRequest.id
            ? { ...r, messages: [...(r.messages || []), newMsg] }
            : r
        )
      );

      setTeamReply("");
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  if (!isAuthorizedAdmin) {
    return (
      <div className="min-h-screen py-24 px-4 bg-parchment-100 flex flex-col items-center justify-center text-center space-y-4">
        <Lock className="w-12 h-12 text-terracotta-700 mx-auto" />
        <h1 className="text-2xl font-serif font-bold text-forest-900">
          Admin Access Restricted
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 max-w-md">
          Your account ({userEmail}) is not in the authorized ADMIN_EMAILS list.
        </p>
        <Link href="/dashboard" className="text-sm font-semibold text-forest-800 underline">
          &larr; Return to Farm Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment-100 p-4 sm:p-8 space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-parchment-300 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Badge variant="forest">Internal Operations</Badge>
            <span className="text-xs text-charcoal-500 font-medium">Steward Dispatch Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 mt-1">
            Expert Routing &amp; Case Queue
          </h1>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center text-xs font-semibold text-forest-900 bg-white px-3.5 py-2 rounded-md border border-parchment-300 hover:bg-parchment-200 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
          Farmer Dashboard View
        </Link>
      </div>

      {/* Two-Column Admin Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Request List Queue */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="font-serif font-bold text-sm text-forest-900">
              Active Queue ({requests.length})
            </span>
            <span className="text-[11px] text-charcoal-500 font-mono">Sorted Newest First</span>
          </div>

          <div className="space-y-2">
            {sortedRequests.map((req) => {
              const isSelected = selectedReqId === req.id;
              const isOpen = req.status === "open";
              const isRouted = req.status === "routed";

              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedReqId(req.id)}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all cursor-pointer space-y-1.5",
                    isSelected
                      ? "bg-white border-forest-800 shadow-md ring-1 ring-forest-800/20"
                      : "bg-parchment-50 border-parchment-300 hover:border-forest-400",
                    req.priority && "border-gold-500 bg-gold-50/20"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <span
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded",
                          isOpen
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : isRouted
                            ? "bg-forest-100 text-forest-800 border border-forest-300"
                            : "bg-charcoal-100 text-charcoal-700"
                        )}
                      >
                        {req.status}
                      </span>
                      {req.priority && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-400 text-forest-950 px-1.5 py-0.5 rounded">
                          ★ Priority SLA
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-semibold text-terracotta-700 uppercase tracking-wider">
                      {req.expert_type}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-sm text-forest-950">
                    {req.farm?.name || "Holding"}
                  </h3>

                  <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
                    {req.message}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[10px] text-charcoal-400">
                    <span>{req.farm?.location_address}</span>
                    <span>{new Date(req.created_at).toLocaleDateString("en-GB")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Case Workspace & Thread */}
        <div className="lg:col-span-7">
          <Card variant="linen" className="p-6 sm:p-8 shadow-warm space-y-6">
            
            {/* Holding Profile Card */}
            <div className="bg-white p-4 rounded-xl border border-parchment-300 space-y-3">
              <div className="flex items-center justify-between border-b border-parchment-200 pb-2">
                <div>
                  <h2 className="font-serif font-bold text-base text-forest-900">
                    {selectedRequest.farm?.name}
                  </h2>
                  <p className="text-xs text-charcoal-500">
                    {selectedRequest.farm?.size_hectares} ha &bull; {selectedRequest.farm?.farm_type.toUpperCase()} &bull; {selectedRequest.farm?.location_address}
                  </p>
                </div>

                {/* Status Switcher */}
                <div className="flex items-center space-x-1 bg-parchment-200 p-1 rounded-lg text-xs font-semibold">
                  {(["open", "routed", "resolved"] as ExpertStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(st)}
                      className={cn(
                        "px-2.5 py-1 rounded capitalize transition-all",
                        selectedRequest.status === st
                          ? "bg-forest-800 text-parchment-50 shadow-sm"
                          : "text-charcoal-600 hover:text-forest-900"
                      )}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs text-charcoal-700">
                <span className="font-semibold text-forest-900">Specialist Type: </span>
                <span className="uppercase font-bold text-terracotta-700">{selectedRequest.expert_type}</span>
              </div>
            </div>

            {/* Conversation Thread */}
            <div className="space-y-3 pt-2">
              <h3 className="font-serif font-bold text-sm text-forest-900">
                Case Messages &amp; Specialist Notes
              </h3>

              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                {selectedRequest.messages?.map((msg) => {
                  const isTeam = msg.sender === "team";

                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "p-4 rounded-xl text-xs sm:text-sm leading-relaxed space-y-1 shadow-sm max-w-xl",
                        isTeam
                          ? "bg-forest-900 text-parchment-50 ml-auto rounded-tr-none"
                          : "bg-white text-charcoal-800 border border-parchment-300 mr-auto rounded-tl-none"
                      )}
                    >
                      <div className="flex items-center justify-between text-[10px] pb-1 border-b border-forest-800/40">
                        <span className={cn("font-bold tracking-wider uppercase", isTeam ? "text-gold-400" : "text-charcoal-500")}>
                          {isTeam ? "Steward Team / Specialist Response" : "Farmer Observation"}
                        </span>
                        <span className={cn(isTeam ? "text-parchment-300" : "text-charcoal-400")}>
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="whitespace-pre-line pt-1">{msg.content}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Team Reply Form */}
            <form onSubmit={handleSendTeamReply} className="pt-4 border-t border-parchment-300 space-y-3">
              <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider">
                Send Team Reply / Specialist Referral to Farmer
              </label>
              <textarea
                rows={3}
                required
                value={teamReply}
                onChange={(e) => setTeamReply(e.target.value)}
                placeholder="e.g. 'Connected with Dr. Sarah Davies MRCVS. She will call you at 15:00 today.' (Triggers automated email notification to farmer)."
                className="w-full p-3 rounded-lg bg-white border border-parchment-300 text-xs sm:text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
              />

              <div className="flex justify-end">
                <Button type="submit" variant="primary" size="sm" disabled={sending || !teamReply.trim()}>
                  {sending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Send className="w-3.5 h-3.5 mr-1" />}
                  Dispatch Reply &amp; Email Farmer
                </Button>
              </div>
            </form>

          </Card>
        </div>

      </div>

    </div>
  );
}
