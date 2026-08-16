import { NextRequest, NextResponse } from "next/server";
import { Anthropic } from "@anthropic-ai/sdk";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
const anthropic = anthropicApiKey ? new Anthropic({ apiKey: anthropicApiKey }) : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { farmId, farmName, schemeCode, schemeName, category, paymentRate, fields } = body;

    if (!schemeCode || !schemeName) {
      return NextResponse.json({ error: "Scheme details are required" }, { status: 400 });
    }

    const fieldNames = fields?.map((f: any) => `${f.name} (${f.areaHectares} ha)`).join(", ") || "Holding registered parcels";
    const totalHa = fields?.reduce((sum: number, f: any) => sum + (f.areaHectares || 0), 0) || 30;

    let draftApplicationText = "";

    if (anthropic) {
      const response = await anthropic.messages.create({
        model: "claude-3-7-sonnet-20250219",
        max_tokens: 1200,
        system: `You are an expert UK agricultural grant writer assisting a farmer in drafting content for their official Defra Sustainable Farming Incentive (SFI 2024) agreement application on GOV.UK.
Tone: Grounded, precise, compliant with Defra scheme standards.
IMPORTANT: You are producing a preparatory draft for the farmer to review and submit themselves via GOV.UK. Emphasize that Steward does not submit applications directly.`,
        messages: [
          {
            role: "user",
            content: `Draft a comprehensive SFI agreement application justification for:
- Holding: ${farmName || "Holding"} (ID: ${farmId || "demo"})
- Action: ${schemeName} (${schemeCode})
- Category: ${category}
- Rate: ${paymentRate}
- Target Parcels: ${fieldNames} (Total Area: ${totalHa} ha)

Include:
1. Parcel Allocation & Crop Rotation Alignment
2. Management Actions Plan (establishment, maintenance, record keeping)
3. SFI Standards & Red Tractor Cross-Compliance statement
4. Submission guidance reminder for the Rural Payments service.`,
          },
        ],
      });

      for (const block of response.content) {
        if (block.type === "text") {
          draftApplicationText += block.text;
        }
      }
    } else {
      // Deterministic UK Agricultural SFI Draft
      draftApplicationText = `### SFI 2024 Action Agreement Draft: ${schemeName} (${schemeCode})
**Holding:** ${farmName || "Highfield Grange Farm"}
**Target Parcels:** ${fieldNames} (${totalHa} hectares)
**Annual Value:** ${paymentRate}

#### 1. Action Specification & Objectives
Under action **${schemeCode}**, ${totalHa} hectares will be managed in accordance with Defra SFI 2024 standards. The objective is to enhance soil organic matter, root permeability, and nitrogen fixation while reducing reliance on inorganic N applications.

#### 2. Establishment & Field Management Protocol
- **Establishment:** Sward sown into clean stale seedbed using minimum-tillage or direct drilling. Mix comprises minimum 5 species of grass, 3 legumes (Red/White clover, Birdsfoot Trefoil), and 2 herbs (Chicory, Plantain).
- **Grazing & Cutting:** Low-intensity rotational grazing with statutory resting periods. No mechanical cutting between April 15th and July 15th to protect ground-nesting birds.
- **Fertiliser & Chemical Restrictions:** Zero inorganic nitrogen applications on target parcels. Spot-spraying of injurious weeds (docks, thistles) permitted only with handheld or targeted knapsack equipment.

#### 3. Evidence & Record Keeping
- Seed merchant invoices and seed certificate tags archived in holding audit file.
- Geotagged photographic records captured at establishment and mid-season flowering.
- Parcel rotation diary updated in Steward digital holding logs.

---
*Notice: This draft has been prepared by Steward Advisory for your review. Please review, edit as needed, and paste into the official Rural Payments service portal on GOV.UK.*`;
    }

    // Persist as Amber-tier task in database
    const supabase = await createServerSupabaseClient();
    const taskRecord = {
      farm_id: farmId || "demo-farm",
      title: `Review Draft SFI Application: ${schemeCode} (${schemeName})`,
      description: `Draft application pack prepared for ${totalHa} ha across ${fieldNames}. Review and confirm details before copying into GOV.UK portal.`,
      autonomy_tier: "amber",
      status: "pending",
      due_date: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
      created_by: "ai",
    };

    let createdTaskId = `task-${Date.now()}`;
    try {
      const { data } = await supabase.from("tasks").insert(taskRecord).select().single();
      if (data) createdTaskId = data.id;
    } catch (err) {}

    return NextResponse.json({
      success: true,
      taskId: createdTaskId,
      schemeCode,
      draftText: draftApplicationText,
    });
  } catch (error: any) {
    console.error("Subsidy draft error:", error);
    return NextResponse.json({ error: error?.message || "Failed to generate draft" }, { status: 500 });
  }
}
