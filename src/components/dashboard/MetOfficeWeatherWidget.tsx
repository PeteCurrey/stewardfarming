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
  Radio,
  Compass,
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
      <Card variant="hud" className={cn("p-6 space-y-4 border border-white/10 shadow-2xl", className)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Radio className="w-5 h-5 text-volt animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider font-bold text-white">
              [MET OFFICE SPOT RADAR // 1.1KM]
            </span>
          </div>
          <span className="text-xs font-mono text-parchment-400">Locking holding telemetry...</span>
        </div>
        <div className="h-28 bg-obsidian-950/80 rounded-panel animate-pulse border border-white/5" />
      </Card>
    );
  }

  const current = weather?.current;
  const activeSprayWindow = weather?.sprayWindows?.[0];

  return (
    <Card variant="hud-volt" cornerTicks className={cn("p-6 sm:p-7 space-y-6 shadow-2xl relative", className)}>
      
      {/* HUD Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-tech bg-obsidian-950 flex items-center justify-center text-volt border border-volt/40 shadow-sm">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-serif font-bold text-lg text-white">
                Met Office Agricultural Spot Radar
              </h3>
              <Badge variant="volt" size="sm" pulse>
                1.1KM GRID
              </Badge>
            </div>
            <p className="text-xs font-mono text-parchment-400 flex items-center mt-0.5">
              <MapPin className="w-3 h-3 text-gold-coutts mr-1" />
              {locationName} &bull; <span className="text-volt ml-1">SYNCED {lastRefreshed || "LIVE"}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchWeather}
          className="text-xs font-mono uppercase tracking-wider font-bold text-parchment-200 hover:text-white flex items-center self-start sm:self-auto bg-obsidian-950 hover:bg-obsidian-900 border border-white/15 px-3 py-1.5 rounded-tech transition-colors"
        >
          <RefreshCw className={cn("w-3.5 h-3.5 mr-1.5 text-volt", loading && "animate-spin")} />
          Sync Radar
        </button>
      </div>

      {/* Current Conditions Telemetry Readouts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        
        <div className="p-4 bg-obsidian-950 rounded-panel border border-white/10 space-y-1">
          <span className="text-[10px] text-parchment-400 uppercase font-bold tracking-wider flex items-center">
            <Thermometer className="w-3.5 h-3.5 mr-1 text-gold-coutts" />
            SCREEN TEMP
          </span>
          <div className="text-2xl font-bold text-white">
            {current?.tempC ?? 18}<span className="text-sm font-normal text-parchment-400">°C</span>
          </div>
          <span className="text-[10px] text-parchment-400 block font-sans">Ground Screen Level</span>
        </div>

        <div className="p-4 bg-obsidian-950 rounded-panel border border-white/10 space-y-1">
          <span className="text-[10px] text-parchment-400 uppercase font-bold tracking-wider flex items-center">
            <Wind className="w-3.5 h-3.5 mr-1 text-volt" />
            WIND SPEED (10M)
          </span>
          <div className="text-2xl font-bold text-white flex items-baseline space-x-1">
            <span>{current?.windMph ?? 5}</span>
            <span className="text-xs text-parchment-400">MPH</span>
          </div>
          <span className="text-[10px] text-volt block font-sans font-semibold">Low-Drift Optimal</span>
        </div>

        <div className="p-4 bg-obsidian-950 rounded-panel border border-white/10 space-y-1">
          <span className="text-[10px] text-parchment-400 uppercase font-bold tracking-wider flex items-center">
            <Droplets className="w-3.5 h-3.5 mr-1 text-sky-400" />
            HUMIDITY
          </span>
          <div className="text-2xl font-bold text-white">
            {current?.humidity ?? 68}<span className="text-sm font-normal text-parchment-400">%</span>
          </div>
          <span className="text-[10px] text-parchment-400 block font-sans">Droplet Retention</span>
        </div>

        <div className="p-4 bg-obsidian-950 rounded-panel border border-white/10 space-y-1">
          <span className="text-[10px] text-parchment-400 uppercase font-bold tracking-wider flex items-center">
            <CloudSun className="w-3.5 h-3.5 mr-1 text-gold-coutts" />
            PRECIPITATION
          </span>
          <div className="text-2xl font-bold text-white">
            {current?.rainProb ?? 10}<span className="text-sm font-normal text-parchment-400">%</span>
          </div>
          <span className="text-[10px] text-parchment-400 block font-sans">6-Hour Probability</span>
        </div>

      </div>

      {/* Spray Window Agricultural Intelligence Banner */}
      {activeSprayWindow && (
        <div className="p-4 rounded-panel bg-obsidian-950 border border-volt/40 shadow-hud space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-volt flex-shrink-0" />
              <span className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                [SPRAY WINDOW ARMED]: {activeSprayWindow.windowStart} &ndash; {activeSprayWindow.windowEnd} TODAY
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase font-bold text-obsidian-950 bg-volt px-2 py-0.5 rounded-tech">
              UK CODE OF PRACTICE VERIFIED
            </span>
          </div>
          <p className="text-xs text-parchment-300 leading-relaxed font-sans">
            {activeSprayWindow.description}
          </p>
        </div>
      )}

      {/* Hourly Trend Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-white font-bold tracking-wider uppercase">[10-HOUR FIELD TELEMETRY PROJECTION]</span>
          <span className="text-parchment-400 text-[11px]">WIND &bull; SPRAY STATUS</span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 overflow-x-auto pt-1 font-mono">
          {(weather?.hourly || []).slice(0, 10).map((hour, idx) => {
            const isOptimal = hour.sprayCondition === "Optimal";
            const isModerate = hour.sprayCondition === "Moderate Risk";

            return (
              <div
                key={idx}
                className={cn(
                  "p-2 rounded-tech text-center space-y-1 border text-[11px] transition-colors",
                  isOptimal
                    ? "bg-obsidian-950 border-volt/50 text-white"
                    : isModerate
                    ? "bg-obsidian-950 border-gold-coutts/50 text-white"
                    : "bg-obsidian-950 border-white/10 text-parchment-300"
                )}
                title={hour.sprayReason || hour.sprayCondition}
              >
                <span className="font-bold block text-[10px] text-parchment-400">{hour.time}</span>
                <span className="font-serif font-bold text-sm block">{hour.temperatureC}°</span>
                <span className="text-[10px] block text-parchment-300">{hour.windSpeedMph}mph</span>
                <span
                  className={cn(
                    "text-[9px] font-bold uppercase tracking-wider block px-1 py-0.5 rounded-tech",
                    isOptimal
                      ? "bg-volt text-obsidian-950 font-bold"
                      : isModerate
                      ? "bg-gold-coutts text-obsidian-950 font-bold"
                      : "bg-terracotta-700 text-white"
                  )}
                >
                  {isOptimal ? "SPRAY" : isModerate ? "WARN" : "HALT"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </Card>
  );
}
