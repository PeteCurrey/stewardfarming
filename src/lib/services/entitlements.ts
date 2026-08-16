import { createServerSupabaseClient } from "@/lib/supabase/server";
import { SubscriptionAddon } from "@/lib/types";

export * from "@/lib/constants/addons";

/**
 * Server-side entitlement check for a farm holding
 */
export async function hasAddon(farmId: string, addonKey: SubscriptionAddon): Promise<boolean> {
  // If in demo environment without active DB, fallback to stored cookie/localStorage or demo state
  if (!farmId || farmId === "demo-farm") {
    return true; // Active for demo testing
  }

  const supabase = await createServerSupabaseClient();
  try {
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("addons, status")
      .eq("farm_id", farmId)
      .single();

    if (!sub || sub.status === "cancelled") return false;
    const addons = (sub.addons as SubscriptionAddon[]) || [];
    return addons.includes(addonKey);
  } catch (err) {
    return false;
  }
}
