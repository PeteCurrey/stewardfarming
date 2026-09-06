"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sprout, ShieldCheck, Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2.5 mb-2">
            <div className="w-10 h-10 rounded-lg bg-forest-900 flex items-center justify-center text-white shadow-sm">
              <Sprout className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="font-serif text-2xl font-bold text-slate-900">Steward</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-slate-900">
            Sign In to Your Holding
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Access your advisor dashboard, field logs, and SFI trackers.
          </p>
        </div>

        {magicLinkSent ? (
          <div className="p-8 text-center space-y-4 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-serif font-medium text-slate-900">
              Magic Link Sent
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              We&apos;ve sent a secure login link to <strong className="text-slate-900">{email}</strong>. Check your inbox to sign in with one click.
            </p>
            <div className="pt-2">
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => router.push("/dashboard")}
              >
                Proceed to Dashboard (Demo) &rarr;
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
            
            {/* Auth Method Switcher */}
            <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-slate-100 text-xs font-medium">
              <button
                type="button"
                onClick={() => setIsMagicLink(false)}
                className={cn(
                  "py-2 rounded-md transition-all",
                  !isMagicLink
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                Password Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsMagicLink(true)}
                className={cn(
                  "py-2 rounded-md transition-all",
                  isMagicLink
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                Magic Link
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farmer@holding.co.uk"
                    className="w-full pl-10 pr-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-forest-700 focus:border-forest-700"
                  />
                </div>
              </div>

              {!isMagicLink && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-medium text-slate-700">
                      Password
                    </label>
                    <span className="text-xs text-forest-800 hover:underline cursor-pointer">
                      Forgot password?
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-forest-700 focus:border-forest-700"
                    />
                  </div>
                </div>
              )}

              <div className="pt-2">
                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                  {loading
                    ? "Signing in..."
                    : isMagicLink
                    ? "Send Magic Login Link"
                    : "Sign In to Farm Holding"}
                  {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>

              <div className="pt-2 flex items-center justify-center space-x-2 text-xs text-slate-500 border-t border-slate-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Encrypted UK Sovereign Infrastructure</span>
              </div>
            </form>
          </div>
        )}

        <div className="text-center text-xs text-slate-600">
          Unregistered holding?{" "}
          <Link href="/signup" className="text-forest-800 hover:underline font-semibold">
            Start 30-Day Free Trial &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
