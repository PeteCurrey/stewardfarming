import { NextRequest, NextResponse } from "next/server";
import { Anthropic } from "@anthropic-ai/sdk";
import { buildSystemPrompt, FarmContextData } from "@/lib/advisor/prompts";
import { CLAUDE_TOOLS } from "@/lib/advisor/tools";
import { UK_AGRICULTURAL_CALENDAR_RULES } from "@/lib/advisor/calendarRules";
import { sendProactiveSummaryEmail } from "@/lib/email/summary";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ADVISOR_PERSONAS, FarmType } from "@/lib/types";

const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
const anthropic = anthropicApiKey ? new Anthropic({ apiKey: anthropicApiKey }) : null;

export async function GET(req: NextRequest) {
  return handleProactiveReview(req);
}

export async function POST(req: NextRequest) {
  return handleProactiveReview(req);
}

async function handleProactiveReview(req: NextRequest) {
  try {
    // 1. Authorization check: Validate CRON_SECRET header or query param
    const authHeader = req.headers.get("authorization");
    const cronSecretHeader = req.headers.get("x-cron-secret");
    const searchParams = req.nextUrl.searchParams;
    const querySecret = searchParams.get("secret");

    const expectedSecret = process.env.CRON_SECRET || "steward-cron-default-secret";

    const isAuthorized =
      authHeader === `Bearer ${expectedSecret}` ||
      cronSecretHeader === expectedSecret ||
      querySecret === expectedSecret;

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Unauthorized. Valid CRON_SECRET header or parameter required." },
        { status: 401 }
      );
    }

    const supabase = await createServerSupabaseClient();
    const currentMonth = new Date().getMonth() + 1; // 1-12

    // 2. Fetch all farms
    let farmsToReview: any[] = [];
    const { data: dbFarms, error: farmsError } = await supabase
      .from("farms")
      .select("*");

    if (farmsError || !dbFarms || dbFarms.length === 0) {
      // Fallback test holding for each farm type if testing locally without populated DB
      farmsToReview = [
        {
          id: "demo-farm-arable",
          name: "Highfield Grange Farm",
          farm_type: "arable",
          location_address: "Thirsk, North Yorkshire",
          size_hectares: 240,
          owner_email: "farmer.arable@holding.co.uk",
        },
        {
          id: "demo-farm-livestock",
          name: "Blackford Moor Holding",
          farm_type: "livestock",
          location_address: "Hexham, Northumberland",
          size_hectares: 310,
          owner_email: "farmer.livestock@holding.co.uk",
        },
      ];
    } else {
      farmsToReview = dbFarms;
    }

    const reviewResults = [];

    // 3. Run proactive review for each farm
    for (const farm of farmsToReview) {
      const farmType = (farm.farm_type || "arable") as FarmType;
      const advisor = ADVISOR_PERSONAS[farmType];

      // Fetch recent 14-day tasks & alerts to prevent duplicates
      const fourteenDaysAgo = new Date();
      fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

      let recentTasks: any[] = [];
      let recentAlerts: any[] = [];

      try {
        const [tasksRes, alertsRes] = await Promise.all([
          supabase
            .from("tasks")
            .select("*")
            .eq("farm_id", farm.id)
            .gte("created_at", fourteenDaysAgo.toISOString()),
          supabase
            .from("alerts")
            .select("*")
            .eq("farm_id", farm.id)
            .gte("created_at", fourteenDaysAgo.toISOString()),
        ]);

        recentTasks = tasksRes.data || [];
        recentAlerts = alertsRes.data || [];
      } catch (e) {
        // Fallback for demo
      }

      // Relevant seasonal rules for current month and farm type
      const applicableRules = UK_AGRICULTURAL_CALENDAR_RULES.filter(
        (r) =>
          r.month === currentMonth &&
          (r.farmType === farmType || r.farmType === "all")
      );

      const farmContext: FarmContextData = {
        farm,
        enterprises: [],
        fields: [],
        livestock_groups: [],
      };

      const systemPrompt = `
${buildSystemPrompt(farmType, farmContext)}

PROACTIVE DAILY REVIEW INSTRUCTIONS:
You are performing your automated 06:00 daily review for ${farm.name}.
Review this farm's current situation, seasonal timing (Month: ${currentMonth}), and past 14 days of activity.
Known UK agricultural calendar milestones for this period:
${JSON.stringify(applicableRules, null, 2)}

Tasks already recorded in the last 14 days (DO NOT recreate duplicates):
${JSON.stringify(recentTasks.map((t) => t.title), null, 2)}

Proactively flag anything the farmer should know about or act on. Use the tools available:
- create_task: for low-risk routine items (autonomy_tier="green") or medium-risk draft items requiring 1-tap review (autonomy_tier="amber").
- create_alert: for advisory-only Red-tier notices requiring the farmer's personal judgment/action (e.g. statutory NVZ deadlines, chemical closed periods).
- request_human_expert: if a professional examination or complex legal filing is imminent.
`;

      const tasksCreated: any[] = [];
      const alertsCreated: any[] = [];
      const expertRequestsCreated: any[] = [];

      if (anthropic) {
        const claudeRes = await anthropic.messages.create({
          model: "claude-3-7-sonnet-20250219",
          max_tokens: 1024,
          system: systemPrompt,
          messages: [
            {
              role: "user",
              content:
                "Perform your proactive morning review. Check our holding status and trigger any necessary tasks or alerts.",
            },
          ],
          tools: CLAUDE_TOOLS,
        });

        for (const block of claudeRes.content) {
          if (block.type === "tool_use") {
            if (block.name === "create_task") {
              const input = block.input as any;
              const taskObj = {
                farm_id: farm.id,
                title: input.title,
                description: input.description,
                autonomy_tier: input.autonomy_tier,
                status: input.autonomy_tier === "green" ? "approved" : "pending",
                due_date: input.due_date || new Date().toISOString().split("T")[0],
                created_by: "ai",
              };
              tasksCreated.push(taskObj);
              try {
                await supabase.from("tasks").insert(taskObj);
              } catch (err) {}
            } else if (block.name === "create_alert") {
              const input = block.input as any;
              const alertObj = {
                farm_id: farm.id,
                message: input.message,
                severity: input.severity || "info",
                read: false,
              };
              alertsCreated.push(alertObj);
              try {
                await supabase.from("alerts").insert(alertObj);
              } catch (err) {}
            } else if (block.name === "request_human_expert") {
              const input = block.input as any;
              const expertObj = {
                farm_id: farm.id,
                expert_type: input.expert_type,
                message: input.message,
                status: "open",
              };
              expertRequestsCreated.push(expertObj);
              try {
                await supabase.from("expert_requests").insert(expertObj);
              } catch (err) {}
            }
          }
        }
      } else {
        // Fallback simulation based on seasonal calendar reference rules
        for (const rule of applicableRules) {
          if (rule.autonomyTier === "red") {
            const alertObj = {
              farm_id: farm.id,
              message: `${rule.title}: ${rule.description}`,
              severity: "warning" as const,
              read: false,
            };
            alertsCreated.push(alertObj);
            try {
              await supabase.from("alerts").insert(alertObj);
            } catch (e) {}
          } else {
            const taskObj = {
              farm_id: farm.id,
              title: rule.title,
              description: rule.description,
              autonomy_tier: rule.autonomyTier,
              status: rule.autonomyTier === "green" ? "approved" : "pending",
              due_date: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
              created_by: "ai",
            };
            tasksCreated.push(taskObj);
            try {
              await supabase.from("tasks").insert(taskObj);
            } catch (e) {}
          }
        }
      }

      // Update farm last_reviewed_at timestamp
      try {
        await supabase
          .from("farms")
          .update({ last_reviewed_at: new Date().toISOString() })
          .eq("id", farm.id);
      } catch (e) {}

      // Send single summary email to farm owner if any items created
      const ownerEmail = farm.owner_email || "farmer@holding.co.uk";
      if (tasksCreated.length > 0 || alertsCreated.length > 0) {
        await sendProactiveSummaryEmail({
          toEmail: ownerEmail,
          farmName: farm.name,
          advisorName: advisor.name,
          farmType: farmType,
          tasksCreated,
          alertsCreated,
        });
      }

      reviewResults.push({
        farmId: farm.id,
        farmName: farm.name,
        farmType,
        advisor: advisor.name,
        tasksCount: tasksCreated.length,
        alertsCount: alertsCreated.length,
        expertRequestsCount: expertRequestsCreated.length,
      });
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      farmsReviewed: reviewResults.length,
      details: reviewResults,
    });
  } catch (error: any) {
    console.error("Proactive cron error:", error);
    return NextResponse.json(
      { error: "Proactive review failed", details: error?.message },
      { status: 500 }
    );
  }
}
