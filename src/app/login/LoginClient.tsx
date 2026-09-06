"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sprout, ShieldCheck, Mail, Lock, ArrowRight, Sparkles, CheckCircle2, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";

export function LoginClient() {
  const [isMagicLink, setIsMagicLink] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { signInWithPassword, signInWithMagicLink, farm } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || (farm ? "/dashboard" : "/onboarding");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isMagicLink) {
      const res = await signInWithMagicLink(email);
      if (res.error) {
        setError(res.error);
      } else {
        setMagicLinkSent(true);
      }
      setLoading(false);
      return;
    }

    const res = await signInWithPassword(email, password);
    if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push(redirectTo);
    }
  };

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-obsidian-950 text-obsidian-100 flex flex-col justify-center bg-tactical-grid">
      <div className="max-w-md mx-auto w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-tech bg-obsidian-900 flex items-center justify-center text-volt-400 border border-obsidian-800 mx-auto shadow-hud">
            <Terminal className="w-6 h-6 text-volt-400" />
          </div>
          <Badge variant="volt">[HOLDING GATEWAY // AUTH]</Badge>
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-obsidian-50 tracking-tight">
            Sign In to Farm Cockpit
          </h1>
          <p className="text-xs sm:text-sm text-obsidian-300 font-mono">
            Access holding telemetry, autonomous approvals &amp; SFI audits.
          </p>
        </div>

        {magicLinkSent ? (
          <div className="hud-panel p-8 text-center space-y-4 border border-volt-500/40 bg-obsidian-900/95 shadow-hud">
            <div className="w-12 h-12 rounded-full bg-volt-500/10 text-volt-400 border border-volt-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 text-volt-400" />
            </div>
            <h2 className="text-xl font-serif font-medium text-obsidian-100">
              Magic Link Dispatched
            </h2>
            <p className="text-xs text-obsidian-300 leading-relaxed font-mono">
              Secure authentication token delivered to <strong className="text-volt-400">{email}</strong>. Select the token in your inbox to authenticate immediately.
            </p>
            <div className="pt-2">
              <Button
                type="button"
                variant="volt"
                size="sm"
                onClick={() => router.push("/dashboard")}
              >
                Proceed to Dashboard (Demo) &rarr;
              </Button>
            </div>
          </div>
        ) : (
          <div className="hud-panel p-6 sm:p-8 shadow-hud border border-obsidian-700 bg-obsidian-900/95 space-y-6">
            
            {/* Auth Method Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-tech bg-obsidian-950 border border-obsidian-800 text-xs font-mono">
              <button
                type="button"
                onClick={() => setIsMagicLink(false)}
                className={`py-2 rounded-tech transition-all uppercase tracking-wider ${
                  !isMagicLink
                    ? "bg-obsidian-850 text-volt-400 border border-obsidian-700 shadow-sm"
                    : "text-obsidian-400 hover:text-obsidian-200"
                }`}
              >
                Password Key
              </button>
              <button
                type="button"
                onClick={() => setIsMagicLink(true)}
                className={`py-2 rounded-tech transition-all uppercase tracking-wider ${
                  isMagicLink
                    ? "bg-obsidian-850 text-volt-400 border border-obsidian-700 shadow-sm"
                    : "text-obsidian-400 hover:text-obsidian-200"
                }`}
              >
                Magic Link
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-tech bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 font-mono">
                [AUTH_FAULT]: {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-obsidian-300 uppercase tracking-wider mb-1">
                  Holding Email Identifier
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-obsidian-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farmer@holding.co.uk"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-tech bg-obsidian-950 border border-obsidian-800 text-sm text-obsidian-100 placeholder:text-obsidian-500 focus:outline-none focus:border-volt-400 focus:ring-1 focus:ring-volt-400 font-mono"
                  />
                </div>
              </div>

              {!isMagicLink && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-mono font-bold text-obsidian-300 uppercase tracking-wider">
                      Password Secret
                    </label>
                    <span className="text-[11px] font-mono text-volt-400 hover:underline cursor-pointer">
                      Reset?
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-obsidian-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-tech bg-obsidian-950 border border-obsidian-800 text-sm text-obsidian-100 placeholder:text-obsidian-500 focus:outline-none focus:border-volt-400 focus:ring-1 focus:ring-volt-400 font-mono"
                    />
                  </div>
                </div>
              )}

              <div className="pt-2">
                <Button type="submit" variant="volt" size="lg" className="w-full" disabled={loading}>
                  {loading
                    ? "Authenticating Holding..."
                    : isMagicLink
                    ? "Dispatch Magic Token"
                    : "Sign In to Farm Holding"}
                  {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>

              <div className="pt-3 flex items-center justify-center space-x-3 text-xs font-mono text-obsidian-400 border-t border-obsidian-800">
                <ShieldCheck className="w-4 h-4 text-volt-400" />
                <span>UK Sovereignty &bull; 256-Bit TLS Fiduciary Vault</span>
              </div>
            </form>
          </div>
        )}

        <div className="text-center text-xs font-mono text-obsidian-400">
          Unregistered holding?{" "}
          <Link href="/signup" className="text-volt-400 hover:underline">
            Initialize 30-Day Free Trial &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
