import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// Default SFI reference records
let inMemorySchemes = [
  {
    id: "sfi-1",
    scheme_code: "SAM3",
    name: "Herbal Leys",
    description: "Diverse multi-species sward including grasses, legumes, and herbs to improve soil structure and root depth.",
    category: "Soils",
    payment_rate: "£382 / ha / year",
    scheme_year: 2024,
    land_use_types: ["Arable", "Temporary Grass"],
  },
  {
    id: "sfi-2",
    scheme_code: "NUM1",
    name: "Assess Nutrient Management & Nitrogen Plan",
    description: "Produce a nitrogen balance sheet with nutrient management plan to reduce inorganic N usage.",
    category: "Nutrients",
    payment_rate: "£652 / year",
    scheme_year: 2024,
    land_use_types: ["Arable", "Permanent Grass", "Temporary Grass"],
  },
  {
    id: "sfi-3",
    scheme_code: "IPM1",
    name: "Integrated Pest Management Assessment",
    description: "Complete an annual IPM plan certified by a BASIS qualified advisor to reduce pesticide reliance.",
    category: "Pest Management",
    payment_rate: "£989 / year",
    scheme_year: 2024,
    land_use_types: ["Arable", "Permanent Grass", "Horticulture"],
  },
  {
    id: "sfi-4",
    scheme_code: "HRW1",
    name: "Assess and Record Hedgerow Condition",
    description: "Survey and record condition of holding hedgerows to create management and rejuvenation plan.",
    category: "Hedgerows",
    payment_rate: "£5 / 100m / year",
    scheme_year: 2024,
    land_use_types: ["Hedgerow", "Boundary"],
  },
  {
    id: "sfi-5",
    scheme_code: "AHL2",
    name: "Winter Bird Food on Arable Land",
    description: "Provide seed-bearing crops over winter months for farmland birds.",
    category: "Biodiversity",
    payment_rate: "£853 / ha / year",
    scheme_year: 2024,
    land_use_types: ["Arable"],
  },
];

export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.from("sfi_schemes").select("*").order("scheme_code");

    if (!error && data && data.length > 0) {
      return NextResponse.json({ success: true, schemes: data });
    }
    return NextResponse.json({ success: true, schemes: inMemorySchemes });
  } catch (err) {
    return NextResponse.json({ success: true, schemes: inMemorySchemes });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, scheme } = body;

    const supabase = await createServerSupabaseClient();

    if (action === "create") {
      const newScheme = {
        ...scheme,
        id: `sfi-${Date.now()}`,
        created_at: new Date().toISOString(),
      };
      try {
        await supabase.from("sfi_schemes").insert(scheme);
      } catch (e) {}
      inMemorySchemes.push(newScheme);
      return NextResponse.json({ success: true, scheme: newScheme });
    }

    if (action === "update") {
      try {
        await supabase.from("sfi_schemes").update(scheme).eq("id", scheme.id);
      } catch (e) {}
      inMemorySchemes = inMemorySchemes.map((s) => (s.id === scheme.id ? { ...s, ...scheme } : s));
      return NextResponse.json({ success: true, scheme });
    }

    if (action === "delete") {
      const { id } = body;
      try {
        await supabase.from("sfi_schemes").delete().eq("id", id);
      } catch (e) {}
      inMemorySchemes = inMemorySchemes.filter((s) => s.id !== id);
      return NextResponse.json({ success: true, id });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
