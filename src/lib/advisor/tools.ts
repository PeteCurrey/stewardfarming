import { Anthropic } from "@anthropic-ai/sdk";

export const CLAUDE_TOOLS: Anthropic.Tool[] = [
  {
    name: "get_weather_forecast",
    description: "Get high-resolution UK agricultural weather forecast, spray drift risk index, and rain radar predictions for a specific holding location.",
    input_schema: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "Parish, county, or postcode in the UK (e.g. Thirsk, North Yorkshire).",
        },
        days: {
          type: "number",
          description: "Number of forecast days (1 to 7).",
        },
      },
      required: ["location"],
    },
  },
  {
    name: "get_field_ndvi",
    description: "Fetch the latest Sentinel-2 satellite NDVI vegetative index snapshot and multi-week canopy trend for a specific field parcel on the holding (Available for Satellite add-on subscribers).",
    input_schema: {
      type: "object",
      properties: {
        field_id: {
          type: "string",
          description: "UUID or identifier of the field parcel.",
        },
      },
      required: ["field_id"],
    },
  },
  {
    name: "create_task",
    description: "Create a proactive farm task, SFI grant deadline reminder, or field operation in the farmer's dashboard.",
    input_schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Clear, specific task title (e.g. 'Review SFI SAM3 Herbal Ley Application Pack').",
        },
        description: {
          type: "string",
          description: "Specific agronomic or compliance details including field names, action codes, or product guidelines.",
        },
        due_date: {
          type: "string",
          description: "ISO date or relative timeframe (e.g. '2026-08-30' or 'In 7 days').",
        },
        autonomy_tier: {
          type: "string",
          enum: ["green", "amber"],
          description: "'green' for automated background telemetry/logging tasks (marked approved immediately), 'amber' for tasks requiring 1-tap farmer confirmation.",
        },
      },
      required: ["title", "description", "autonomy_tier"],
    },
  },
  {
    name: "create_alert",
    description: "Raise an advisory-only notice or statutory alert requiring the farmer's personal attention, judgment, or physical action (Red-tier notice). Never auto-actions anything.",
    input_schema: {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "Clear, concise advisory note or compliance notice (e.g. 'NVZ closed period for organic manure with high readily available nitrogen begins in 14 days').",
        },
        severity: {
          type: "string",
          enum: ["info", "warning", "urgent"],
          description: "'urgent' for statutory regulatory deadlines or animal welfare/safety, 'warning' for financial/subsidy deadlines, 'info' for general seasonal observations.",
        },
      },
      required: ["message", "severity"],
    },
  },
  {
    name: "request_human_expert",
    description: "Escalate a situation to an accredited UK human specialist (Vet, Agronomist, Accountant, or Insurance Broker) when outside safe AI advice territory.",
    input_schema: {
      type: "object",
      properties: {
        expert_type: {
          type: "string",
          enum: ["vet", "agronomist", "accountant", "broker"],
          description: "The discipline of the required specialist.",
        },
        message: {
          type: "string",
          description: "Summary of the clinical, tax, agronomic, or insurance case requiring human escalation.",
        },
      },
      required: ["expert_type", "message"],
    },
  },
];
