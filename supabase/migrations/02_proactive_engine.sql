-- ==============================================================================
-- PROACTIVE ENGINE DATABASE ADDITIONS
-- ==============================================================================

-- 1. Create Severity Enum
DO $$ BEGIN
    CREATE TYPE alert_severity AS ENUM ('info', 'warning', 'urgent');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create Alerts Table
CREATE TABLE IF NOT EXISTS public.alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    severity alert_severity NOT NULL DEFAULT 'info',
    read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Add last_reviewed_at to farms table if not present
DO $$ BEGIN
    ALTER TABLE public.farms ADD COLUMN last_reviewed_at TIMESTAMPTZ;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

-- 4. Enable RLS on alerts
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policy for alerts (users can only access alerts for farms they own)
DROP POLICY IF EXISTS "Users can view alerts for their farms" ON public.alerts;
CREATE POLICY "Users can view alerts for their farms"
    ON public.alerts FOR SELECT
    USING (public.is_farm_owner(farm_id));

DROP POLICY IF EXISTS "Users can update alerts for their farms" ON public.alerts;
CREATE POLICY "Users can update alerts for their farms"
    ON public.alerts FOR UPDATE
    USING (public.is_farm_owner(farm_id));

DROP POLICY IF EXISTS "Service role can insert alerts" ON public.alerts;
CREATE POLICY "Service role can insert alerts"
    ON public.alerts FOR INSERT
    WITH CHECK (true);
