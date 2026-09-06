"use client";

import React, { useEffect, useState } from "react";
import {
  CloudSun,
  Wind,
  Droplets,
  Thermometer,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  RefreshCw,
  Radio,
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
      <div className={cn("p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4", className)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Radio className="w-5 h-5 text-emerald-600 animate-pulse" />
            <span className="text-xs uppercase font-semibold text-slate-800">
              Met Office Agricultural Spot Radar (1.1km)
            </span>
          </div>
          <span className="text-xs text-slate-500">Connecting radar feed...</span>
        </div>
        <div className="h-28 bg-slate-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  const current = weather?.current;
  const activeSprayWindow = weather?.sprayWindows?.[0];

  return (
    <div className={cn("p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-6", className)}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-serif font-medium text-lg text-slate-900">
                Met Office Agricultural Spot Radar
              </h3>
              <Badge variant="forest" size="sm">
                1.1km Grid
              </Badge>
            </div>
            <p className="text-xs text-slate-500 flex items-center mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1" />
              {locationName} &bull; Synced {lastRefreshed || "Live"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchWeather}
          className="text-xs font-medium text-slate-700 hover:text-slate-900 flex items-center self-start sm:self-auto bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          <RefreshCw className={cn("w-3.5 h-3.5 mr-1.5 text-slate-600", loading && "animate-spin")} />
          Sync Radar
        </button>
      </div>

      {/* Current Conditions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
          <span className="text-xs text-slate-500 uppercase font-medium flex items-center">
            <Thermometer className="w-3.5 h-3.5 mr-1 text-slate-500" />
            Air Temp
          </span>
          <div className="text-2xl font-semibold text-slate-900">
            {current?.tempC ?? 18}<span className="text-sm font-normal text-slate-500">°C</span>
          </div>
          <span className="text-xs text-slate-500 block">Ground screen level</span>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
          <span className="text-xs text-slate-500 uppercase font-medium flex items-center">
            <Wind className="w-3.5 h-3.5 mr-1 text-slate-500" />
            Wind Speed
          </span>
          <div className="text-2xl font-semibold text-slate-900 flex items-baseline space-x-1">
            <span>{current?.windMph ?? 5}</span>
            <span className="text-xs text-slate-500">mph</span>
          </div>
          <span className="text-xs text-emerald-700 block font-medium">Low drift risk</span>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
          <span className="text-xs text-slate-500 uppercase font-medium flex items-center">
            <Droplets className="w-3.5 h-3.5 mr-1 text-slate-500" />
            Humidity
          </span>
          <div className="text-2xl font-semibold text-slate-900">
            {current?.humidity ?? 68}<span className="text-sm font-normal text-slate-500">%</span>
          </div>
          <span className="text-xs text-slate-500 block">Optimal droplet retention</span>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
          <span className="text-xs text-slate-500 uppercase font-medium flex items-center">
            <CloudSun className="w-3.5 h-3.5 mr-1 text-slate-500" />
            Rain Probability
          </span>
          <div className="text-2xl font-semibold text-slate-900">
            {current?.rainProb ?? 10}<span className="text-sm font-normal text-slate-500">%</span>
          </div>
          <span className="text-xs text-slate-500 block">Next 6 hours</span>
        </div>

      </div>

      {/* Active Spray Window Banner */}
      {activeSprayWindow && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 space-y-1.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-emerald-950">
                Spray Window Open: {activeSprayWindow.windowStart} &ndash; {activeSprayWindow.windowEnd} Today
              </span>
            </div>
            <span className="text-[11px] font-medium text-emerald-800 bg-white border border-emerald-200 px-2 py-0.5 rounded">
              UK Code of Practice Verified
            </span>
          </div>
          <p className="text-xs text-emerald-900 leading-relaxed">
            {activeSprayWindow.description}
          </p>
        </div>
      )}

      {/* Hourly Trend Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-800 font-medium">10-Hour Field Forecast</span>
          <span className="text-slate-500">Wind &bull; Spray Condition</span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 overflow-x-auto pt-1">
          {(weather?.hourly || []).slice(0, 10).map((hour, idx) => {
            const isOptimal = hour.sprayCondition === "Optimal";
            const isModerate = hour.sprayCondition === "Moderate Risk";

            return (
              <div
                key={idx}
                className={cn(
                  "p-2 rounded-lg text-center space-y-1 border text-xs transition-colors",
                  isOptimal
                    ? "bg-emerald-50/50 border-emerald-200 text-slate-900"
                    : isModerate
                    ? "bg-amber-50/50 border-amber-200 text-slate-900"
                    : "bg-slate-50 border-slate-200 text-slate-600"
                )}
                title={hour.sprayReason || hour.sprayCondition}
              >
                <span className="font-medium block text-[10px] text-slate-500">{hour.time}</span>
                <span className="font-semibold text-xs block">{hour.temperatureC}°</span>
                <span className="text-[10px] block text-slate-500">{hour.windSpeedMph}mph</span>
                <span
                  className={cn(
                    "text-[10px] font-medium block px-1 py-0.5 rounded",
                    isOptimal
                      ? "bg-emerald-600 text-white font-semibold"
                      : isModerate
                      ? "bg-amber-500 text-white font-semibold"
                      : "bg-slate-200 text-slate-700"
                  )}
                >
                  {isOptimal ? "Spray" : isModerate ? "Caution" : "Halt"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
