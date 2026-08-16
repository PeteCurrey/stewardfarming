"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquareText,
  Send,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
  Wheat,
  Footprints,
  Trees,
  Milk,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AdvisorPortrait } from "@/components/ui/AdvisorPortrait";
import { useAuth } from "@/context/AuthContext";
import { ADVISOR_PERSONAS } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "advisor";
  text: string;
  time: string;
  badge?: string;
  taskNotification?: string;
  expertNotification?: string;
}

export default function AdvisorChatPage() {
  const { farm } = useAuth();
  const farmType = farm?.farm_type || "arable";
  const advisor = ADVISOR_PERSONAS[farmType];

  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize initial greeting calibrated to farm holding
  useEffect(() => {
    setMessages([
      {
        id: "msg-init",
        sender: "advisor",
        time: "07:30",
        text: `Good day. I am ${advisor.name}, your dedicated ${advisor.role}. I am calibrated with your ${farm?.size_hectares || 240} hectare holding in ${farm?.location_address || "Yorkshire"}. What would you like to review today?`,
        badge: "Holding Briefing",
      },
    ]);
  }, [farm, advisor, farmType]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userText = inputMessage;
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/advisor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          conversationId: "demo-conv",
          farmId: farm?.id || "demo-farm",
          farmProfile: farm,
        }),
      });

      const data = await res.json();

      let taskNotif: string | undefined;
      let expertNotif: string | undefined;

      if (data.tasksCreated && data.tasksCreated.length > 0) {
        taskNotif = `Queued task: "${data.tasksCreated[0].title}" (${data.tasksCreated[0].autonomy_tier.toUpperCase()} tier)`;
      }

      if (data.expertRequestsCreated && data.expertRequestsCreated.length > 0) {
        expertNotif = `Escalation logged: Routed to UK accredited ${data.expertRequestsCreated[0].expert_type.toUpperCase()}`;
      }

      const advisorMsg: ChatMessage = {
        id: `adv-${Date.now()}`,
        sender: "advisor",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: data.content || "Understood. I have recorded that note in your farm records.",
        taskNotification: taskNotif,
        expertNotification: expertNotif,
      };

      setMessages((prev) => [...prev, advisorMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "advisor",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: "I experienced a minor signal delay reaching the farm database. Please ask again in a moment.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-parchment-300 pb-4">
        <div className="flex items-center space-x-3">
          <AdvisorPortrait type={farmType} name={advisor.name} size="md" />
          <div>
            <div className="flex items-center space-x-2">
              <Badge variant="forest">{advisor.name}</Badge>
              <span className="text-xs text-charcoal-500 font-medium">
                {farm?.name || "Highfield Grange Farm"} ({farmType.toUpperCase()})
              </span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-forest-900 mt-0.5">
              Live Advisor Consultation
            </h1>
            <p className="text-xs text-charcoal-600">
              {advisor.specialism}
            </p>
          </div>
        </div>

        <Button href="/dashboard/expert" variant="secondary" size="sm">
          <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-terracotta-700" />
          Escalate to Human Specialist
        </Button>
      </div>

      {/* Chat Thread */}
      <Card variant="linen" className="p-4 sm:p-6 shadow-warm-lg border border-parchment-300 flex flex-col h-[600px] justify-between">
        
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg) => {
            const isAdvisor = msg.sender === "advisor";

            return (
              <div
                key={msg.id}
                className={cn("flex flex-col", isAdvisor ? "items-start" : "items-end")}
              >
                <div
                  className={cn(
                    "max-w-[88%] sm:max-w-[75%] p-4 rounded-xl text-xs sm:text-sm leading-relaxed shadow-sm space-y-2",
                    isAdvisor
                      ? "bg-white text-charcoal-800 border border-parchment-300 rounded-tl-none"
                      : "bg-forest-800 text-parchment-50 rounded-tr-none"
                  )}
                >
                  {msg.badge && (
                    <div className="inline-block text-[10px] uppercase font-bold tracking-wider text-forest-900 bg-forest-100 px-2 py-0.5 rounded border border-forest-200">
                      {msg.badge}
                    </div>
                  )}

                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Task Creation Pill if triggered by Claude tool */}
                  {msg.taskNotification && (
                    <div className="p-2 rounded bg-parchment-100 border border-gold-400/60 text-[11px] text-charcoal-800 flex items-center space-x-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span>{msg.taskNotification}</span>
                    </div>
                  )}

                  {/* Human Expert Escalation Pill if triggered */}
                  {msg.expertNotification && (
                    <div className="p-2 rounded bg-terracotta-50 border border-terracotta-300 text-[11px] text-terracotta-900 flex items-center space-x-1.5 font-medium">
                      <PhoneCall className="w-3.5 h-3.5 text-terracotta-700 flex-shrink-0" />
                      <span>{msg.expertNotification}</span>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-charcoal-400 mt-1 px-1">
                  {isAdvisor ? advisor.name : "You"} &bull; {msg.time}
                </span>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center space-x-2 text-xs text-charcoal-500 italic p-2 bg-white/60 rounded-lg max-w-xs">
              <Loader2 className="w-4 h-4 animate-spin text-forest-800" />
              <span>{advisor.name} is checking field records &amp; telemetry...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="pt-4 border-t border-parchment-300 flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={loading}
            placeholder={`Ask ${advisor.name.split(" ")[0]} about spray windows, SFI actions, rotation margins...`}
            className="flex-1 px-4 py-3 rounded-lg bg-white border border-parchment-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700 disabled:opacity-50"
          />
          <Button type="submit" variant="primary" size="md" disabled={loading || !inputMessage.trim()}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </form>

      </Card>
    </div>
  );
}
