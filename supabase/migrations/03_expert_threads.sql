-- ==============================================================================
-- EXPERT ROUTING & THREADED MESSAGES SCHEMA
-- ==============================================================================

-- 1. Create Sender Enum if not exists
DO $$ BEGIN
    CREATE TYPE expert_sender AS ENUM ('farmer', 'team');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Add resolved_at to expert_requests if missing
DO $$ BEGIN
    ALTER TABLE public.expert_requests ADD COLUMN resolved_at TIMESTAMPTZ;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- 3. Create expert_request_messages Table
CREATE TABLE IF NOT EXISTS public.expert_request_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    expert_request_id UUID NOT NULL REFERENCES public.expert_requests(id) ON DELETE CASCADE,
    sender expert_sender NOT NULL DEFAULT 'farmer',
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Enable RLS on expert_request_messages
ALTER TABLE public.expert_request_messages ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
DROP POLICY IF EXISTS "Farmers can view messages for their requests" ON public.expert_request_messages;
CREATE POLICY "Farmers can view messages for their requests"
    ON public.expert_request_messages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.expert_requests er
            WHERE er.id = expert_request_id
            AND public.is_farm_owner(er.farm_id)
        )
    );

DROP POLICY IF EXISTS "Farmers can insert messages for their requests" ON public.expert_request_messages;
CREATE POLICY "Farmers can insert messages for their requests"
    ON public.expert_request_messages FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.expert_requests er
            WHERE er.id = expert_request_id
            AND public.is_farm_owner(er.farm_id)
        )
    );

DROP POLICY IF EXISTS "Service role has full access to expert_request_messages" ON public.expert_request_messages;
CREATE POLICY "Service role has full access to expert_request_messages"
    ON public.expert_request_messages FOR ALL
    USING (true)
    WITH CHECK (true);
