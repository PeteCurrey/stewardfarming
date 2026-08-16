"use client";

import React, { useState } from "react";
import {
  Award,
  Wheat,
  ShieldCheck,
  Users,
  Send,
  CheckCircle2,
  Clock,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  PhoneCall,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { ExpertType, ExpertStatus, ExpertRequest, ExpertRequestMessage } from "@/lib/types";
import { cn } from "@/lib/utils";

const EXPERT_SPECIALISTS = [
  {
    type: "vet" as ExpertType,
    title: "RCVS Accredited Farm Vet",
    icon: Award,
    description: "Clinical diagnoses, herd health reviews, statutory TB plans, and prescription antibiotic protocol audits.",
  },
  {
    type: "agronomist" as ExpertType,
    title: "BASIS & FACTS Agronomist",
    icon: Wheat,
    description: "Specialist arable disease identification, blackgrass herbicide resistance, and bespoke seed mixes.",
  },
  {
    type: "accountant" as ExpertType,
    title: "ICAEW Rural Tax Accountant",
    icon: ShieldCheck,
    description: "Agricultural Property Relief (APR), partnership restructuring, capital allowances, and grant tax planning.",
  },
  {
    type: "broker" as ExpertType,
    title: "Agricultural Insurance Broker",
    icon: Users,
    description: "Hailstorm crop damage claim advocacy, livestock mortality disputes, and public liability valuation.",
  },
];

const INITIAL_REQUESTS: ExpertRequest[] = [
  {
    id: "req-101",
    farm_id: "demo-farm",
    expert_type: "agronomist",
    message: "Yellow rust patches identified on Flag-2 in late-sown winter wheat parcel (Valley Meadow). Requesting targeted triazole/strobilurin mix recommendation.",
    status: "routed",
    created_at: "2026-08-14T09:30:00Z",
    messages: [
      {
        id: "m-1",
        expert_request_id: "req-101",
        sender: "farmer",
        content: "Yellow rust patches identified on Flag-2 in late-sown winter wheat parcel (Valley Meadow). Requesting targeted triazole/strobilurin mix recommendation.",
        created_at: "2026-08-14T09:30:00Z",
      },
      {
        id: "m-2",
        expert_request_id: "req-101",
        sender: "team",
        content: "Hello John, we have packaged your field soil history and connected with Robert Taylor (BASIS #48291, Yorkshire Agronomy). He has scheduled a field visit for Tuesday morning.",
        created_at: "2026-08-14T11:45:00Z",
      },
    ],
  },
  {
    id: "req-102",
    farm_id: "demo-farm",
    expert_type: "accountant",
    message: "Need review on SFI capital item grant tax treatment regarding farm partnership inheritance structuring.",
    status: "resolved",
    resolved_at: "2026-08-10T16:00:00Z",
    created_at: "2026-08-08T14:15:00Z",
    messages: [
      {
        id: "m-3",
        expert_request_id: "req-102",
        sender: "farmer",
        content: "Need review on SFI capital item grant tax treatment regarding farm partnership inheritance structuring.",
        created_at: "2026-08-08T14:15:00Z",
      },
      {
        id: "m-4",
        expert_request_id: "req-102",
        sender: "team",
        content: "Clarified with ICAEW agricultural tax partner. Capital item grants are treated under Section 102 capital allowances with APR preservation. Summary memorandum sent to your email.",
        created_at: "2026-08-10T16:00:00Z",
      },
    ],
  },
];

export default function AskAnExpertPage() {
  const { farm, user } = useAuth();
  const [selectedType, setSelectedType] = useState<ExpertType>("agronomist");
  const [query, setQuery] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [requests, setRequests] = useState<ExpertRequest[]>(INITIAL_REQUESTS);
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>("req-101");
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [sendingReply, setSendingReply] = useState<string | null>(null);

  const [hasPriorityAddon, setHasPriorityAddon] = useState(true);

  // Submit new specialist consultation request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || submitting) return;

    setSubmitting(true);

    const newReqObj: ExpertRequest = {
      id: `req-${Date.now()}`,
      farm_id: farm?.id || "demo-farm",
      expert_type: selectedType,
      message: query,
      status: "open",
      priority: hasPriorityAddon,
      created_at: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          expert_request_id: `req-${Date.now()}`,
          sender: "farmer",
          content: query,
          created_at: new Date().toISOString(),
        },
      ],
    };

    try {
      await fetch("/api/expert/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          farmId: farm?.id || "demo-farm",
          farmName: farm?.name || "Highfield Grange Farm",
          farmType: farm?.farm_type || "arable",
          farmerEmail: user?.email || "farmer@holding.co.uk",
          expertType: selectedType,
          message: query,
          priority: hasPriorityAddon,
        }),
      });

      setRequests((prev) => [newReqObj, ...prev]);
      setExpandedRequestId(newReqObj.id);
      setQuery("");
      setSubmittedSuccess(true);
      setTimeout(() => setSubmittedSuccess(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Farmer sends follow-up reply in thread
  const handleSendFollowUp = async (requestId: string) => {
    const text = replyText[requestId];
    if (!text || !text.trim() || sendingReply) return;

    setSendingReply(requestId);

    const newMsg: ExpertRequestMessage = {
      id: `msg-${Date.now()}`,
      expert_request_id: requestId,
      sender: "farmer",
      content: text,
      created_at: new Date().toISOString(),
    };

    try {
      await fetch("/api/expert/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reply",
          requestId,
          farmName: farm?.name || "Highfield Grange Farm",
          farmType: farm?.farm_type || "arable",
          farmerEmail: user?.email || "farmer@holding.co.uk",
          sender: "farmer",
          message: text,
        }),
      });

      setRequests((prev) =>
        prev.map((r) =>
          r.id === requestId
            ? { ...r, messages: [...(r.messages || []), newMsg] }
            : r
        )
      );

      setReplyText((prev) => ({ ...prev, [requestId]: "" }));
    } catch (err) {
      console.error(err);
    } finally {
      setSendingReply(null);
    }
  };

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="border-b border-parchment-300 pb-4 space-y-1">
        <Badge variant="gold">Human-in-the-Loop Specialist Routing</Badge>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900">
          Ask an Accredited Specialist
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 max-w-2xl">
          Connect directly with accredited UK farm vets, agronomists, rural accountants, and insurance brokers. Our internal advisory team reviews every request and packages your field history for the right specialist.
        </p>
      </div>

      {/* Success Banner */}
      {submittedSuccess && (
        <div className="p-4 rounded-xl bg-forest-100 border border-forest-300 text-forest-900 flex items-center space-x-3 text-xs sm:text-sm shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-forest-700 flex-shrink-0" />
          <div>
            <p className="font-semibold">Specialist Request Dispatched</p>
            <p className="text-forest-800 text-xs">
              Our team has been alerted. We will connect you with a qualified specialist shortly and notify you via email.
            </p>
          </div>
        </div>
      )}

      {/* 
        ========================================================================
        1. SUBMIT NEW REQUEST FORM
        ========================================================================
      */}
      <Card variant="linen" className="p-6 sm:p-8 shadow-warm space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-2">
              1. Select Specialist Discipline
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXPERT_SPECIALISTS.map((item) => {
                const Icon = item.icon;
                const isSelected = selectedType === item.type;

                return (
                  <div
                    key={item.type}
                    onClick={() => setSelectedType(item.type)}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all cursor-pointer space-y-1.5",
                      isSelected
                        ? "bg-white border-forest-800 shadow-sm ring-1 ring-forest-800/20"
                        : "bg-parchment-50 border-parchment-300 hover:border-forest-400"
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className={cn("w-4 h-4", isSelected ? "text-forest-800" : "text-charcoal-500")} />
                      <h3 className="font-serif font-bold text-xs sm:text-sm text-forest-950">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[11px] text-charcoal-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
              2. Describe the Situation or Case Details
            </label>
            <textarea
              rows={4}
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Provide field parcel names, stock ID numbers, symptoms, or legal/tax concerns. Steward will automatically bundle relevant soil/spray logs."
              className="w-full p-3.5 rounded-lg bg-white border border-parchment-300 text-xs sm:text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
            />
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-parchment-200">
            <div className="flex items-center space-x-2 text-xs text-charcoal-500">
              <ShieldCheck className="w-4 h-4 text-forest-700" />
              <span>Holding context pre-attached &bull; Direct email notification on reply</span>
            </div>

            <Button type="submit" variant="primary" size="md" disabled={submitting || !query.trim()}>
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Routing Request...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit to Specialist Network
                </>
              )}
            </Button>
          </div>

        </form>
      </Card>

      {/* 
        ========================================================================
        2. CONSULTATION THREADS (PAST & OPEN)
        ========================================================================
      */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-forest-800" />
            <h2 className="font-serif font-bold text-xl text-forest-900">
              Your Specialist Consultations
            </h2>
          </div>
          <span className="text-xs text-charcoal-500 font-medium">
            {requests.length} Requests on Record
          </span>
        </div>

        <div className="space-y-4">
          {requests.map((req) => {
            const isExpanded = expandedRequestId === req.id;
            const isOpen = req.status === "open";
            const isRouted = req.status === "routed";
            const isResolved = req.status === "resolved";

            return (
              <Card
                key={req.id}
                variant="linen"
                className={cn(
                  "border transition-all overflow-hidden shadow-sm",
                  isOpen ? "border-amber-300" : isRouted ? "border-forest-400" : "border-parchment-300 opacity-90"
                )}
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedRequestId(isExpanded ? null : req.id)}
                  className="p-5 cursor-pointer flex items-center justify-between gap-4 hover:bg-parchment-50 transition-colors"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center space-x-2.5">
                      <span
                        className={cn(
                          "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded",
                          isOpen
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : isRouted
                            ? "bg-forest-100 text-forest-800 border border-forest-300"
                            : "bg-charcoal-100 text-charcoal-700"
                        )}
                      >
                        {req.status}
                      </span>
                      <span className="text-xs font-serif font-bold text-forest-950 uppercase tracking-wider">
                        {req.expert_type} Consultation
                      </span>
                      <span className="text-[11px] text-charcoal-400 font-mono">
                        &bull; {new Date(req.created_at).toLocaleDateString("en-GB")}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-charcoal-700 line-clamp-1">
                      {req.message}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-semibold text-forest-800 hidden sm:inline">
                      {req.messages?.length || 1} {req.messages?.length === 1 ? "message" : "messages"}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-charcoal-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-charcoal-500" />
                    )}
                  </div>
                </div>

                {/* Expanded Thread */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-parchment-200 space-y-4 bg-white/50">
                    
                    {/* Thread Messages */}
                    <div className="space-y-3 pt-2">
                      {req.messages?.map((msg) => {
                        const isTeam = msg.sender === "team";

                        return (
                          <div
                            key={msg.id}
                            className={cn(
                              "p-4 rounded-xl text-xs sm:text-sm leading-relaxed space-y-1 shadow-sm max-w-2xl",
                              isTeam
                                ? "bg-forest-900 text-parchment-50 ml-auto rounded-tr-none"
                                : "bg-white text-charcoal-800 border border-parchment-300 mr-auto rounded-tl-none"
                            )}
                          >
                            <div className="flex items-center justify-between text-[10px] pb-1 border-b border-forest-800/40">
                              <span className={cn("font-bold tracking-wider uppercase", isTeam ? "text-gold-400" : "text-charcoal-500")}>
                                {isTeam ? "Steward Advisory Team / Specialist" : "You (Holding Note)"}
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

                    {/* Follow-up reply input */}
                    {req.status !== "resolved" ? (
                      <div className="pt-3 border-t border-parchment-200 flex items-center space-x-2">
                        <input
                          type="text"
                          value={replyText[req.id] || ""}
                          onChange={(e) =>
                            setReplyText((prev) => ({ ...prev, [req.id]: e.target.value }))
                          }
                          placeholder="Add a follow-up observation or document note..."
                          className="flex-1 px-3.5 py-2.5 rounded-md bg-white border border-parchment-300 text-xs sm:text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
                        />
                        <Button
                          type="button"
                          variant="primary"
                          size="sm"
                          disabled={sendingReply === req.id || !replyText[req.id]?.trim()}
                          onClick={() => handleSendFollowUp(req.id)}
                        >
                          {sendingReply === req.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5 mr-1" />
                              Reply
                            </>
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded bg-parchment-100 border border-parchment-300 text-center text-xs text-charcoal-600 font-medium">
                        ✓ This consultation thread has been marked resolved. You can submit a new request if further issues arise.
                      </div>
                    )}

                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </section>

    </div>
  );
}
