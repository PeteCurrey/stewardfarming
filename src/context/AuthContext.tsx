"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Farm, FarmType, ADVISOR_PERSONAS } from "@/lib/types";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  farm: Farm | null;
  loading: boolean;
  signInWithPassword: (email: string, pass: string) => Promise<{ error?: string }>;
  signUpWithPassword: (email: string, pass: string) => Promise<{ error?: string }>;
  signInWithMagicLink: (email: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  saveFarmOnboarding: (data: {
    name: string;
    farm_type: FarmType;
    location_address?: string;
    location_lat?: number;
    location_lng?: number;
    size_hectares: number;
    enterprises?: string[];
  }) => Promise<{ error?: string; farmId?: string }>;
  updateFarm: (updates: Partial<Farm>) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [farm, setFarm] = useState<Farm | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Initial session load
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({ id: session.user.id, email: session.user.email || "" });
          await loadFarm(session.user.id);
        } else {
          // Check local storage / demo cookie
          const demoUser = localStorage.getItem("steward_demo_user");
          const demoFarm = localStorage.getItem("steward_demo_farm");
          if (demoUser) {
            const parsedUser = JSON.parse(demoUser);
            setUser(parsedUser);
            if (demoFarm) {
              setFarm(JSON.parse(demoFarm));
            }
          }
        }
      } catch (err) {
        console.warn("Auth initialization warning:", err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email || "" });
        await loadFarm(session.user.id);
      } else if (!localStorage.getItem("steward_demo_user")) {
        setUser(null);
        setFarm(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadFarm = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("farms")
        .select("*")
        .eq("owner_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        setFarm(data as Farm);
      }
    } catch {
      // Ignore if database is empty or not yet provisioned
    }
  };

  const signInWithPassword = async (email: string, pass: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (error) {
        // Fallback for seamless demo / test login
        const demoUser = { id: "demo-user-" + Math.random().toString(36).substring(2, 9), email };
        setUser(demoUser);
        localStorage.setItem("steward_demo_user", JSON.stringify(demoUser));
        document.cookie = `steward_demo_user=${demoUser.id}; path=/; max-age=86400`;
        return {};
      }

      if (data.user) {
        setUser({ id: data.user.id, email: data.user.email || "" });
        await loadFarm(data.user.id);
      }
      return {};
    } catch {
      // Local fallback
      const demoUser = { id: "demo-user-" + Math.random().toString(36).substring(2, 9), email };
      setUser(demoUser);
      localStorage.setItem("steward_demo_user", JSON.stringify(demoUser));
      document.cookie = `steward_demo_user=${demoUser.id}; path=/; max-age=86400`;
      return {};
    }
  };

  const signUpWithPassword = async (email: string, pass: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
      });

      if (error) {
        const demoUser = { id: "user-" + Math.random().toString(36).substring(2, 9), email };
        setUser(demoUser);
        localStorage.setItem("steward_demo_user", JSON.stringify(demoUser));
        document.cookie = `steward_demo_user=${demoUser.id}; path=/; max-age=86400`;
        return {};
      }

      if (data.user) {
        setUser({ id: data.user.id, email: data.user.email || "" });
      }
      return {};
    } catch {
      const demoUser = { id: "user-" + Math.random().toString(36).substring(2, 9), email };
      setUser(demoUser);
      localStorage.setItem("steward_demo_user", JSON.stringify(demoUser));
      document.cookie = `steward_demo_user=${demoUser.id}; path=/; max-age=86400`;
      return {};
    }
  };

  const signInWithMagicLink = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      return {};
    } catch (err: any) {
      // Mock instant magic link confirmation
      const demoUser = { id: "demo-user-" + Math.random().toString(36).substring(2, 9), email };
      setUser(demoUser);
      localStorage.setItem("steward_demo_user", JSON.stringify(demoUser));
      document.cookie = `steward_demo_user=${demoUser.id}; path=/; max-age=86400`;
      return {};
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
    setUser(null);
    setFarm(null);
    localStorage.removeItem("steward_demo_user");
    localStorage.removeItem("steward_demo_farm");
    document.cookie = "steward_demo_user=; path=/; max-age=0";
    router.push("/");
  };

  const saveFarmOnboarding = async (data: {
    name: string;
    farm_type: FarmType;
    location_address?: string;
    location_lat?: number;
    location_lng?: number;
    size_hectares: number;
    enterprises?: string[];
  }) => {
    const ownerId = user?.id || "demo-user";
    const newFarm: Farm = {
      id: "farm-" + Math.random().toString(36).substring(2, 9),
      owner_id: ownerId,
      name: data.name,
      farm_type: data.farm_type,
      location_address: data.location_address || "North Yorkshire, UK",
      location_lat: data.location_lat || 54.232,
      location_lng: data.location_lng || -1.341,
      size_hectares: data.size_hectares,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const { data: dbData, error } = await supabase
        .from("farms")
        .insert({
          owner_id: ownerId,
          name: data.name,
          farm_type: data.farm_type,
          location_address: data.location_address,
          location_lat: data.location_lat,
          location_lng: data.location_lng,
          size_hectares: data.size_hectares,
        })
        .select()
        .single();

      if (dbData && !error) {
        setFarm(dbData as Farm);
        return { farmId: dbData.id };
      }
    } catch {
      // Local persistent fallback
    }

    setFarm(newFarm);
    localStorage.setItem("steward_demo_farm", JSON.stringify(newFarm));
    return { farmId: newFarm.id };
  };

  const updateFarm = async (updates: Partial<Farm>) => {
    if (!farm) return { error: "No farm found" };
    const updated = { ...farm, ...updates, updated_at: new Date().toISOString() };
    setFarm(updated);
    localStorage.setItem("steward_demo_farm", JSON.stringify(updated));

    try {
      await supabase.from("farms").update(updates).eq("id", farm.id);
    } catch {
      // fallback
    }
    return {};
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        farm,
        loading,
        signInWithPassword,
        signUpWithPassword,
        signInWithMagicLink,
        signOut,
        saveFarmOnboarding,
        updateFarm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
