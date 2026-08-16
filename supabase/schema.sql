-- ============================================================================
-- STEWARD UK FARMING ADVISOR — POSTGRES SCHEMA WITH ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- 1. Farm Type Enum
CREATE TYPE farm_type_enum AS ENUM ('arable', 'livestock', 'mixed', 'dairy');

-- 2. Task Status & Autonomy Enums
CREATE TYPE task_status_enum AS ENUM ('pending', 'approved', 'completed', 'dismissed');
CREATE TYPE autonomy_tier_enum AS ENUM ('green', 'amber', 'red');
CREATE TYPE task_creator_enum AS ENUM ('ai', 'user');

-- 3. Expert Request Enums
CREATE TYPE expert_type_enum AS ENUM ('vet', 'agronomist', 'accountant', 'broker');
CREATE TYPE expert_status_enum AS ENUM ('open', 'routed', 'resolved');

-- 4. Message Role Enum
CREATE TYPE message_role_enum AS ENUM ('user', 'assistant');

-- ============================================================================
-- TABLES
-- ============================================================================

-- Farms table
CREATE TABLE IF NOT EXISTS public.farms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    farm_type farm_type_enum NOT NULL,
    location_address TEXT,
    location_lat NUMERIC(9,6),
    location_lng NUMERIC(9,6),
    size_hectares NUMERIC(10,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Farm Enterprises (Specific crops or livestock details in flexible JSONB)
CREATE TABLE IF NOT EXISTS public.farm_enterprises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    enterprise_type TEXT NOT NULL,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fields (Field parcels, boundaries, and soil records)
CREATE TABLE IF NOT EXISTS public.fields (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    boundary JSONB, -- GeoJSON representation
    area_hectares NUMERIC(10,2) NOT NULL DEFAULT 0,
    current_use TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Livestock Groups (Herds, flocks, breeds, headcounts)
CREATE TABLE IF NOT EXISTS public.livestock_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    species TEXT NOT NULL,
    breed TEXT,
    headcount INTEGER NOT NULL DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Conversations
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    title TEXT DEFAULT 'Advisor Consultation',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Messages
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    role message_role_enum NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tasks
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status task_status_enum NOT NULL DEFAULT 'pending',
    autonomy_tier autonomy_tier_enum NOT NULL DEFAULT 'amber',
    due_date TIMESTAMPTZ,
    created_by task_creator_enum NOT NULL DEFAULT 'ai',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Expert Requests
CREATE TABLE IF NOT EXISTS public.expert_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    expert_type expert_type_enum NOT NULL,
    message TEXT NOT NULL,
    status expert_status_enum NOT NULL DEFAULT 'open',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    tier TEXT NOT NULL DEFAULT 'advisor',
    addons JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Ensures each farmer can only read/write their own farm records
-- ============================================================================

-- Enable RLS across all tables
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farm_enterprises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.livestock_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if current authenticated user owns the given farm
CREATE OR REPLACE FUNCTION public.is_farm_owner(farm_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.farms
        WHERE id = farm_uuid AND owner_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Farms RLS
CREATE POLICY "Users can manage their own farms"
ON public.farms
FOR ALL
USING (auth.uid() = owner_id)
WITH CHECK (auth.uid() = owner_id);

-- 2. Farm Enterprises RLS
CREATE POLICY "Users can manage enterprises for their own farm"
ON public.farm_enterprises
FOR ALL
USING (public.is_farm_owner(farm_id))
WITH CHECK (public.is_farm_owner(farm_id));

-- 3. Fields RLS
CREATE POLICY "Users can manage fields for their own farm"
ON public.fields
FOR ALL
USING (public.is_farm_owner(farm_id))
WITH CHECK (public.is_farm_owner(farm_id));

-- 4. Livestock Groups RLS
CREATE POLICY "Users can manage livestock groups for their own farm"
ON public.livestock_groups
FOR ALL
USING (public.is_farm_owner(farm_id))
WITH CHECK (public.is_farm_owner(farm_id));

-- 5. Conversations RLS
CREATE POLICY "Users can manage conversations for their own farm"
ON public.conversations
FOR ALL
USING (public.is_farm_owner(farm_id))
WITH CHECK (public.is_farm_owner(farm_id));

-- 6. Messages RLS
CREATE POLICY "Users can manage messages in their farm conversations"
ON public.messages
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.conversations c
        WHERE c.id = messages.conversation_id AND public.is_farm_owner(c.farm_id)
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.conversations c
        WHERE c.id = messages.conversation_id AND public.is_farm_owner(c.farm_id)
    )
);

-- 7. Tasks RLS
CREATE POLICY "Users can manage tasks for their own farm"
ON public.tasks
FOR ALL
USING (public.is_farm_owner(farm_id))
WITH CHECK (public.is_farm_owner(farm_id));

-- 8. Expert Requests RLS
CREATE POLICY "Users can manage expert requests for their own farm"
ON public.expert_requests
FOR ALL
USING (public.is_farm_owner(farm_id))
WITH CHECK (public.is_farm_owner(farm_id));

-- 9. Subscriptions RLS
CREATE POLICY "Users can view subscriptions for their own farm"
ON public.subscriptions
FOR ALL
USING (public.is_farm_owner(farm_id))
WITH CHECK (public.is_farm_owner(farm_id));
