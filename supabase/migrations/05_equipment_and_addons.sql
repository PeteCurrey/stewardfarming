-- ==============================================================================
-- EQUIPMENT TABLE & SUBSCRIPTION ENTITLEMENTS MIGRATION
-- ==============================================================================

-- 1. Create Equipment Table (Fleet & Machinery)
CREATE TABLE IF NOT EXISTS public.equipment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- e.g. "John Deere 6155R"
    type TEXT NOT NULL, -- e.g. "Tractor", "Combine", "Sprayer", "Drill", "Telehandler"
    purchase_date DATE,
    last_service_date DATE NOT NULL,
    service_interval_days INT NOT NULL DEFAULT 365,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_equipment_farm_id ON public.equipment(farm_id);

-- 2. Enable RLS
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
DROP POLICY IF EXISTS "Farmers can view own equipment" ON public.equipment;
CREATE POLICY "Farmers can view own equipment"
    ON public.equipment FOR SELECT
    USING (public.is_farm_owner(farm_id));

DROP POLICY IF EXISTS "Farmers can insert own equipment" ON public.equipment;
CREATE POLICY "Farmers can insert own equipment"
    ON public.equipment FOR INSERT
    WITH CHECK (public.is_farm_owner(farm_id));

DROP POLICY IF EXISTS "Farmers can update own equipment" ON public.equipment;
CREATE POLICY "Farmers can update own equipment"
    ON public.equipment FOR UPDATE
    USING (public.is_farm_owner(farm_id));

DROP POLICY IF EXISTS "Farmers can delete own equipment" ON public.equipment;
CREATE POLICY "Farmers can delete own equipment"
    ON public.equipment FOR DELETE
    USING (public.is_farm_owner(farm_id));

-- 4. Seed demo equipment
INSERT INTO public.equipment (farm_id, name, type, last_service_date, service_interval_days, notes)
VALUES
  ('demo-farm', 'John Deere 6155R (Front Loader)', 'Tractor', (CURRENT_DATE - INTERVAL '340 days')::DATE, 365, 'Main cultivation and yard tractor. 500-hour service due soon.'),
  ('demo-farm', 'Bateman RB35 Self-Propelled Sprayer', 'Sprayer', (CURRENT_DATE - INTERVAL '180 days')::DATE, 180, 'NSTSO annual test certified. Due 6-month hydraulic filter change.'),
  ('demo-farm', 'Claas Lexion 760 TT Combine', 'Combine', (CURRENT_DATE - INTERVAL '300 days')::DATE, 365, 'Pre-harvest cutterbar and drum inspection required.')
ON CONFLICT DO NOTHING;
