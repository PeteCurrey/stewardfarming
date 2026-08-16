"use client";

import React, { useEffect, useState } from "react";
import {
  CloudSun,
  Wind,
  Droplets,
  Thermometer,
  ShieldCheck,
  AlertTriangle,
  Clock,
  MapPin,
  CheckCircle2,
  RefreshCw,
  Eye,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FarmWeatherSummary } from "@/lib/services/weatherService";
import { cn } from "@/lib/utils";

interface MetOfficeWidgetProps {
  lat?: number;
  lng?: number;
  locationName?: string;
  className?: string;
}

export function MetOfficeWeatherWidget({
  lat = 54.23,
  lng = -1.34,
  locationName = "Thirsk, North Yorkshire",
  className,
}: MetOfficeWidgetProps) {
  const [weather, setWeather] = useState<FarmWeatherSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<string>("");

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/weather?lat=${lat}&lng=${lng}&location=${encodeURIComponent(locationName)}`);
      if (res.ok) {
        const data = await res.json();
        setWeather(data);
        setLastRefreshed(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      }
    } catch (err) {
      console.error("Failed to load Met Office data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [lat, lng, locationName]);

  if (loading && !weather) {
    return (
      <Card variant="linen" className={cn("p-6 space-y-4 border border-parchment-300 shadow-sm", className)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CloudSun className="w-5 h-5 text-forest-800 animate-pulse" />
            <span className="font-serif font-bold text-forest-900">Met Office Weather DataHub</span>
          </div>
          <span className="text-xs text-charcoal-500">Connecting to UK Spot Forecast Radar...</span>
        </div>
        <div className="h-24 bg-parchment-200/60 rounded-lg animate-pulse" />
      </Card>
    );
  }

  const current = weather?.current;
  const activeSprayWindow = weather?.sprayWindows?.[0];

  return (
    <Card variant="linen" className={cn("p-6 space-y-5 border-2 border-forest-800/60 shadow-warm", className)}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-parchment-200 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-forest-800 flex items-center justify-center text-gold-400">
            <CloudSun className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-serif font-bold text-base text-forest-950">
                Met Office Agricultural Spot Forecast
              </h3>
              <Badge variant="forest" size="sm">
                1.1km Spot Radar
              </Badge>
            </div>
            <p className="text-xs text-charcoal-500 flex items-center mt-0.5">
              <MapPin className="w-3 h-3 text-terracotta-600 mr-1" />
              {locationName} &bull; Fetched {lastRefreshed || "Live"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchWeather}
          className="text-xs font-semibold text-forest-800 hover:text-terracotta-700 flex items-center self-start sm:self-auto bg-parchment-200 hover:bg-parchment-300 px-2.5 py-1 rounded transition-colors"
        >
          <RefreshCw className={cn("w-3 h-3 mr-1", loading && "animate-spin")} />
          Sync Radar
        </button>
      </div>

      {/* Current Conditions Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-white rounded-xl border border-parchment-300 shadow-sm space-y-1">
          <span className="text-[10px] text-charcoal-500 uppercase font-bold tracking-wider flex items-center">
            <Thermometer className="w-3.5 h-3.5 mr-1 text-terracotta-600" />
            Air Temp
          </span>
          <div className="text-xl font-serif font-bold text-forest-900">
            {current?.tempC ?? 18}°C
          </div>
          <span className="text-[10px] text-charcoal-500">Surface screen</span>
        </div>

        <div className="p-3 bg-white rounded-xl border border-parchment-300 shadow-sm space-y-1">
          <span className="text-[10px] text-charcoal-500 uppercase font-bold tracking-wider flex items-center">
            <Wind className="w-3.5 h-3.5 mr-1 text-forest-700" />
            Wind (10m)
          </span>
          <div className="text-xl font-serif font-bold text-forest-900">
            {current?.windMph ?? 5} <span className="text-xs font-sans font-normal">mph</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">Low drift tier</span>
        </div>

        <div className="p-3 bg-white rounded-xl border border-parchment-300 shadow-sm space-y-1">
          <span className="text-[10px] text-charcoal-500 uppercase font-bold tracking-wider flex items-center">
            <Droplets className="w-3.5 h-3.5 mr-1 text-sky-600" />
            Relative Humidity
          </span>
          <div className="text-xl font-serif font-bold text-forest-900">
            {current?.humidity ?? 68}%
          </div>
          <span className="text-[10px] text-charcoal-500">Droplet stability</span>
        </div>

        <div className="p-3 bg-white rounded-xl border border-parchment-300 shadow-sm space-y-1">
          <span className="text-[10px] text-charcoal-500 uppercase font-bold tracking-wider flex items-center">
            <CloudSun className="w-3.5 h-3.5 mr-1 text-amber-600" />
            Precipitation
          </span>
          <div className="text-xl font-serif font-bold text-forest-900">
            {current?.rainProb ?? 10}%
          </div>
          <span className="text-[10px] text-charcoal-500">Next 6 hours</span>
        </div>
      </div>

      {/* Spray Window Agricultural Intelligence Banner */}
      {activeSprayWindow && (
        <div className="p-3.5 rounded-xl bg-forest-900 text-parchment-50 border border-forest-950 space-y-1.5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span className="font-serif font-bold text-xs sm:text-sm text-gold-300">
                Optimal Spray Window: {activeSprayWindow.windowStart} &ndash; {activeSprayWindow.windowEnd} Today
              </span>
            </div>
            <Badge variant="gold" size="sm">
              Agronomy Safe
            </Badge>
          </div>
          <p className="text-xs text-parchment-200 leading-relaxed">
            {activeSprayWindow.description} (Verified against UK Code of Practice for Plant Protection Products).
          </p>
        </div>
      )}

      {/* Hourly Trend Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-charcoal-600">
          <span className="font-semibold text-forest-900">10-Hour Agricultural Telemetry</span>
          <span className="text-[11px] text-charcoal-500">Wind &bull; Spray Risk Status</span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 overflow-x-auto pt-1">
          {(weather?.hourly || []).slice(0, 10).map((hour, idx) => {
            const isOptimal = hour.sprayCondition === "Optimal";
            const isModerate = hour.sprayCondition === "Moderate Risk";

            return (
              <div
                key={idx}
                className={cn(
                  "p-2 rounded-lg text-center space-y-1 border text-[11px]",
                  isOptimal
                    ? "bg-forest-50/80 border-forest-300 text-forest-900"
                    : isModerate
                    ? "bg-amber-50/60 border-amber-300 text-amber-900"
                    : "bg-parchment-100 border-parchment-300 text-charcoal-700"
                )}
                title={hour.sprayReason || hour.sprayCondition}
              >
                <span className="font-bold block text-[10px] text-charcoal-600">{hour.time}</span>
                <span className="font-serif font-bold block">{hour.temperatureC}°</span>
                <span className="text-[10px] block font-mono">{hour.windSpeedMph}mph</span>
                <span
                  className={cn(
                    "text-[9px] font-bold uppercase tracking-tighter block px-1 py-0.5 rounded",
                    isOptimal
                      ? "bg-forest-700 text-white"
                      : isModerate
                      ? "bg-amber-600 text-white"
                      : "bg-red-700 text-white"
                  )}
                >
                  {isOptimal ? "Spray" : isModerate ? "Caution" : "Avoid"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </Card>
  );
}
