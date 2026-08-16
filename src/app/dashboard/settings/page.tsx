"use client";

import React, { useState } from "react";
import { Settings, ShieldCheck, User, Bell, Key, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { user, farm, signOut } = useAuth();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="border-b border-parchment-300 pb-4 space-y-1">
        <Badge variant="forest">Account &amp; Holding Preferences</Badge>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600">
          Manage notifications, security credentials, and data residency settings for {farm?.name || "your farm"}.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Account Info */}
        <Card variant="linen" className="p-6 space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-parchment-200">
            <User className="w-5 h-5 text-forest-800" />
            <h2 className="font-serif font-bold text-base text-forest-950">
              User Profile
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-charcoal-700">
            <div>
              <span className="text-charcoal-500 block text-xs">Email Address:</span>
              <span className="font-semibold">{user?.email || "farmer@holding.co.uk"}</span>
            </div>
            <div>
              <span className="text-charcoal-500 block text-xs">Active Subscription:</span>
              <span className="font-semibold text-forest-800">Steward Advisor Core Plan</span>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card variant="linen" className="p-6 space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-parchment-200">
            <Bell className="w-5 h-5 text-forest-800" />
            <h2 className="font-serif font-bold text-base text-forest-950">
              Notification Channels
            </h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-charcoal-700">
            <div className="flex items-center justify-between p-3 rounded bg-white border border-parchment-300">
              <div>
                <span className="font-semibold block text-forest-950">06:30 Morning SMS Briefing</span>
                <span className="text-xs text-charcoal-500">Daily micro-weather and spray window notifications.</span>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 text-forest-800 rounded border-parchment-400 focus:ring-forest-700"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded bg-white border border-parchment-300">
              <div>
                <span className="font-semibold block text-forest-950">Defra SFI &amp; Statutory Deadline Emails</span>
                <span className="text-xs text-charcoal-500">Alerts for opening/closing grant application windows.</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-forest-800 rounded border-parchment-400 focus:ring-forest-700"
              />
            </div>
          </div>
        </Card>

        {/* Data Security & Sign Out */}
        <Card variant="linen" className="p-6 space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-parchment-200">
            <ShieldCheck className="w-5 h-5 text-forest-800" />
            <h2 className="font-serif font-bold text-base text-forest-950">
              Data Sovereignty
            </h2>
          </div>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            All holding data, soil tests, and telemetry are hosted strictly in encrypted UK data facilities.
          </p>
          <div className="pt-2 flex justify-between items-center border-t border-parchment-200">
            <span className="text-xs text-charcoal-500">Session ID: active</span>
            <Button type="button" variant="outline" size="sm" onClick={signOut} className="text-terracotta-700">
              <LogOut className="w-3.5 h-3.5 mr-1" />
              Sign Out of Holding
            </Button>
          </div>
        </Card>

      </div>
    </div>
  );
}
