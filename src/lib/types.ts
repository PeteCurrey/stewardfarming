export type FarmType = "arable" | "livestock" | "mixed" | "dairy";
export type TaskStatus = "pending" | "approved" | "completed" | "dismissed";
export type AutonomyTier = "green" | "amber" | "red";
export type ExpertType = "vet" | "agronomist" | "accountant" | "broker";
export type ExpertStatus = "open" | "routed" | "resolved";

export type AlertSeverity = "info" | "warning" | "urgent";

export interface Alert {
  id: string;
  farm_id: string;
  message: string;
  severity: AlertSeverity;
  read: boolean;
  created_at: string;
}

export interface Farm {
  id: string;
  owner_id: string;
  name: string;
  farm_type: FarmType;
  location_address?: string | null;
  location_lat?: number | null;
  location_lng?: number | null;
  size_hectares: number;
  last_reviewed_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface FarmEnterprise {
  id: string;
  farm_id: string;
  enterprise_type: string;
  details: Record<string, any>;
  created_at: string;
}

export interface Field {
  id: string;
  farm_id: string;
  name: string;
  boundary?: any | null;
  area_hectares: number;
  current_use?: string | null;
  notes?: string | null;
  created_at: string;
}

export interface LivestockGroup {
  id: string;
  farm_id: string;
  species: string;
  breed?: string | null;
  headcount: number;
  notes?: string | null;
  created_at: string;
}

export interface Conversation {
  id: string;
  farm_id: string;
  title: string;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface Task {
  id: string;
  farm_id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  autonomy_tier: AutonomyTier;
  due_date?: string | null;
  created_by: "ai" | "user";
  created_at: string;
}

export type ExpertMessageSender = "farmer" | "team";

export interface ExpertRequestMessage {
  id: string;
  expert_request_id: string;
  sender: ExpertMessageSender;
  content: string;
  created_at: string;
}

export interface ExpertRequest {
  id: string;
  farm_id: string;
  expert_type: ExpertType;
  message: string;
  status: ExpertStatus;
  priority?: boolean;
  resolved_at?: string | null;
  created_at: string;
  messages?: ExpertRequestMessage[];
  farm?: Farm;
}

export type SubscriptionAddon =
  | "fleet_management"
  | "satellite_imagery"
  | "subsidy_concierge"
  | "carbon_reporting"
  | "market_intelligence"
  | "priority_expert";

export interface Equipment {
  id: string;
  farm_id: string;
  name: string;
  type: string;
  purchase_date?: string | null;
  last_service_date: string;
  service_interval_days: number;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  farm_id: string;
  tier: string;
  addons: SubscriptionAddon[];
  status: string;
  created_at: string;
}

export interface AdvisorPersona {
  key: FarmType;
  name: string;
  role: string;
  specialism: string;
  greeting: string;
  avatarInitials: string;
}

export const ADVISOR_PERSONAS: Record<FarmType, AdvisorPersona> = {
  arable: {
    key: "arable",
    name: "Tom Campbell",
    role: "Arable & Agronomy Specialist",
    specialism: "Cereal rotations, spray micro-windows, and SFI IPM/SAM3 payment tracking.",
    greeting: "Good day. I'm keeping an eye on your local spray windows, NVZ limits, and crop development.",
    avatarInitials: "TC",
  },
  livestock: {
    key: "livestock",
    name: "Fiona MacLeod",
    role: "Livestock & Herd Husbandry Specialist",
    specialism: "Pasture rotation, medicine withdrawal dates, welfare logs, and mart prices.",
    greeting: "Hello. I'm tracking your herd medicine records, grazing rotations, and statutory movement dates.",
    avatarInitials: "FM",
  },
  mixed: {
    key: "mixed",
    name: "Alistair Reid",
    role: "Mixed Farm Systems Specialist",
    specialism: "Integrated forage budgeting, FYM nutrient recycling, and whole-farm SFI.",
    greeting: "Good morning. I'm balancing your arable break-crops, livestock manure recycling, and grant deadlines.",
    avatarInitials: "AR",
  },
  dairy: {
    key: "dairy",
    name: "Eleanor Wright",
    role: "Dairy Systems & Nutrition Specialist",
    specialism: "Milk contract bonuses, somatic cell counts, silage D-values, and herbal leys.",
    greeting: "Welcome. I'm monitoring your daily milk solids, somatic cell trends, and grassland actions.",
    avatarInitials: "EW",
  },
};
