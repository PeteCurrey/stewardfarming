import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { sendTeamNewRequestEmail, sendFarmerExpertUpdateEmail } from "@/lib/email/expertNotifications";
import { ExpertType, ExpertStatus } from "@/lib/types";

// POST /api/expert/request — Submit a new expert request or add a message to an existing thread
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, requestId, farmId, expertType, message, sender } = body;

    const supabase = await createServerSupabaseClient();

    // 1. Action: Create brand new request
    if (action === "create") {
      if (!expertType || !message) {
        return NextResponse.json({ error: "expertType and message are required" }, { status: 400 });
      }

      let createdRequest: any = null;
      const isPriority = body.priority || false;

      try {
        const { data, error } = await supabase
          .from("expert_requests")
          .insert({
            farm_id: farmId || "demo-farm",
            expert_type: expertType as ExpertType,
            message,
            status: "open",
            priority: isPriority,
          })
          .select()
          .single();

        if (error) throw error;
        createdRequest = data;

        // Insert initial message
        await supabase.from("expert_request_messages").insert({
          expert_request_id: createdRequest.id,
          sender: "farmer",
          content: message,
        });
      } catch (err) {
        // Fallback for demo mode
        createdRequest = {
          id: `req-${Date.now()}`,
          farm_id: farmId || "demo-farm",
          expert_type: expertType,
          message,
          status: "open",
          created_at: new Date().toISOString(),
        };
      }

      // Notify internal Steward team
      await sendTeamNewRequestEmail({
        requestId: createdRequest.id,
        farmName: body.farmName || "Highfield Grange Farm",
        farmType: body.farmType || "arable",
        farmerEmail: body.farmerEmail || "farmer@holding.co.uk",
        expertType,
        initialMessage: message,
      });

      return NextResponse.json({ success: true, request: createdRequest });
    }

    // 2. Action: Reply to existing request thread
    if (action === "reply") {
      if (!requestId || !message) {
        return NextResponse.json({ error: "requestId and message are required" }, { status: 400 });
      }

      const msgSender = sender || "farmer";

      try {
        await supabase.from("expert_request_messages").insert({
          expert_request_id: requestId,
          sender: msgSender,
          content: message,
        });
      } catch (err) {
        // demo fallback
      }

      if (msgSender === "farmer") {
        // Notify team of farmer follow-up
        await sendTeamNewRequestEmail({
          requestId,
          farmName: body.farmName || "Highfield Grange Farm",
          farmType: body.farmType || "arable",
          farmerEmail: body.farmerEmail || "farmer@holding.co.uk",
          expertType: expertType || "Specialist",
          initialMessage: `[Follow-up Note] ${message}`,
        });
      } else {
        // Team replied -> Notify farmer
        await sendFarmerExpertUpdateEmail({
          toEmail: body.farmerEmail || "farmer@holding.co.uk",
          farmName: body.farmName || "Holding",
          expertType: expertType || "Specialist",
          teamReply: message,
        });
      }

      return NextResponse.json({ success: true, message: "Reply logged" });
    }

    // 3. Action: Update status (Open / Routed / Resolved)
    if (action === "update_status") {
      const { status } = body;
      if (!requestId || !status) {
        return NextResponse.json({ error: "requestId and status are required" }, { status: 400 });
      }

      try {
        const updatePayload: any = { status };
        if (status === "resolved") {
          updatePayload.resolved_at = new Date().toISOString();
        }
        await supabase
          .from("expert_requests")
          .update(updatePayload)
          .eq("id", requestId);
      } catch (err) {}

      // Notify farmer of status change
      await sendFarmerExpertUpdateEmail({
        toEmail: body.farmerEmail || "farmer@holding.co.uk",
        farmName: body.farmName || "Holding",
        expertType: expertType || "Specialist",
        newStatus: status,
      });

      return NextResponse.json({ success: true, status });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Expert API error:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
