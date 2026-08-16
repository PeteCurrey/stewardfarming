"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sprout, ShieldCheck, Mail, Lock, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
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
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-parchment-100 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-forest-800 flex items-center justify-center text-parchment-50 shadow-sm border border-forest-900 mx-auto">
            <Sprout className="w-6 h-6 text-gold-400" />
          </div>
          <Badge variant="forest">Farm Account Access</Badge>
          <h1 className="text-3xl font-serif font-bold text-forest-900">
            Sign in to Steward
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-700">
            Access your personalized agricultural advisor, field logs, and SFI trackers.
          </p>
        </div>

        {magicLinkSent ? (
          <Card variant="linen" className="text-center p-8 space-y-4 border-2 border-forest-600 shadow-warm-lg">
            <div className="w-12 h-12 rounded-full bg-forest-800 text-parchment-50 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-gold-400" />
            </div>
            <h2 className="text-xl font-serif font-bold text-forest-900">
              Magic Link Sent
            </h2>
            <p className="text-xs text-charcoal-700 leading-relaxed">
              We&apos;ve sent a secure login link to <strong>{email}</strong>. Check your inbox to sign in with one tap.
            </p>
            <div className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => router.push("/dashboard")}
              >
                Proceed to Dashboard (Demo) &rarr;
              </Button>
            </div>
          </Card>
        ) : (
          <Card variant="linen" className="p-6 sm:p-8 shadow-warm-lg border border-parchment-300">
            
            {/* Auth Method Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-parchment-200 mb-6 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setIsMagicLink(false)}
                className={`py-2 rounded-md transition-all ${
                  !isMagicLink
                    ? "bg-white text-forest-900 shadow-sm"
                    : "text-charcoal-600 hover:text-forest-900"
                }`}
              >
                Password Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsMagicLink(true)}
                className={`py-2 rounded-md transition-all ${
                  isMagicLink
                    ? "bg-white text-forest-900 shadow-sm"
                    : "text-charcoal-600 hover:text-forest-900"
                }`}
              >
                Magic Link (Passwordless)
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-xs text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farmer@holding.co.uk"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-md bg-white border border-parchment-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
                  />
                </div>
              </div>

              {!isMagicLink && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-serif font-bold text-charcoal-900 uppercase tracking-wider">
                      Password
                    </label>
                    <span className="text-[11px] text-terracotta-700 hover:underline cursor-pointer">
                      Forgot password?
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-md bg-white border border-parchment-300 text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-forest-700"
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

              <div className="pt-3 flex items-center justify-center space-x-3 text-xs text-charcoal-500 border-t border-parchment-200">
                <ShieldCheck className="w-4 h-4 text-forest-700" />
                <span>Encrypted UK Cloud Infrastructure</span>
              </div>
            </form>
          </Card>
        )}

        <div className="text-center text-xs text-charcoal-600">
          Don&apos;t have an account yet?{" "}
          <Link href="/signup" className="text-forest-800 font-semibold underline">
            Start 30-Day Free Trial
          </Link>
        </div>

      </div>
    </div>
  );
}
