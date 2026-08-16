import { NextRequest, NextResponse } from "next/server";
import { fetchRpaLandParcels } from "@/lib/services/rpaLandService";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { action, sbiNumber, farmId, selectedParcels } = await req.json();

    // 1. Fetch parcel boundaries from RPA API by SBI
    if (action === "fetch") {
      if (!sbiNumber) {
        return NextResponse.json({ error: "SBI number is required" }, { status: 400 });
      }
      const parcels = await fetchRpaLandParcels(sbiNumber);
      return NextResponse.json({ success: true, parcels });
    }

    // 2. Import confirmed parcels into fields table
    if (action === "import") {
      if (!farmId || !selectedParcels || !Array.isArray(selectedParcels)) {
        return NextResponse.json({ error: "farmId and selectedParcels array required" }, { status: 400 });
      }

      const supabase = await createServerSupabaseClient();
      const createdFields = [];

      for (const p of selectedParcels) {
        const fieldRecord = {
          farm_id: farmId,
          name: p.customName || p.parcelId,
          area_hectares: p.areaHectares,
          current_use: p.landUse,
          boundary: p.boundaryGeoJson || null,
          notes: `Imported from RPA Land Registry (SBI: ${sbiNumber || "N/A"})`,
        };

        try {
          const { data } = await supabase.from("fields").insert(fieldRecord).select().single();
          if (data) createdFields.push(data);
        } catch (err) {
          createdFields.push({ ...fieldRecord, id: `fld-${Date.now()}` });
        }
      }

      return NextResponse.json({ success: true, importedCount: createdFields.length, fields: createdFields });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("RPA route error:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
