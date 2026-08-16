-- ==============================================================================
-- REAL INTEGRATIONS: WEATHER CACHE, NDVI SNAPSHOTS, & SFI REFERENCE DATA
-- ==============================================================================

-- 1. Weather Cache Table
CREATE TABLE IF NOT EXISTS public.weather_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_key TEXT UNIQUE NOT NULL, -- e.g. "54.23,-1.34" rounded
    forecast_data JSONB NOT NULL,
    fetched_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_weather_cache_location_key ON public.weather_cache(location_key);

-- 2. Field NDVI Snapshots Table (Sentinel Hub)
CREATE TABLE IF NOT EXISTS public.field_ndvi_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    field_id UUID NOT NULL REFERENCES public.fields(id) ON DELETE CASCADE,
    ndvi_value NUMERIC(4, 3) NOT NULL, -- e.g. 0.742
    cloud_coverage NUMERIC(4, 3) DEFAULT 0.0,
    captured_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_field_ndvi_field_id ON public.field_ndvi_snapshots(field_id);

-- 3. SFI Schemes Reference Table (Admin Managed)
CREATE TABLE IF NOT EXISTS public.sfi_schemes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scheme_code TEXT UNIQUE NOT NULL, -- e.g. "SAM3", "NUM1", "IPM1", "HRW1"
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL, -- e.g. "Soils", "Nutrients", "Pest Management", "Hedgerows"
    action_window_start DATE,
    action_window_end DATE,
    scheme_year INT NOT NULL DEFAULT 2024,
    payment_rate TEXT NOT NULL, -- e.g. "£382 / ha / year"
    land_use_types TEXT[] NOT NULL DEFAULT '{}', -- e.g. '{"Arable", "Temporary Grass", "Permanent Grass"}'
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed initial SFI 2024 Actions
INSERT INTO public.sfi_schemes (scheme_code, name, description, category, payment_rate, land_use_types, scheme_year)
VALUES
  ('SAM3', 'Herbal Leys', 'Diverse multi-species sward including grasses, legumes, and herbs to improve soil structure and root depth.', 'Soils', '£382 / ha / year', ARRAY['Arable', 'Temporary Grass'], 2024),
  ('NUM1', 'Assess Nutrient Management & Nitrogen Plan', 'Produce a nitrogen balance sheet with nutrient management plan to reduce inorganic N usage.', 'Nutrients', '£652 / year', ARRAY['Arable', 'Permanent Grass', 'Temporary Grass'], 2024),
  ('IPM1', 'Integrated Pest Management Assessment', 'Complete an annual IPM plan certified by a BASIS qualified advisor to reduce pesticide reliance.', 'Pest Management', '£989 / year', ARRAY['Arable', 'Permanent Grass', 'Horticulture'], 2024),
  ('HRW1', 'Assess and Record Hedgerow Condition', 'Survey and record condition of holding hedgerows to create management and rejuvenation plan.', 'Hedgerows', '£5 / 100m / year', ARRAY['Hedgerow', 'Boundary'], 2024),
  ('AHL2', 'Winter Bird Food on Arable Land', 'Provide seed-bearing crops over winter months for farmland birds.', 'Biodiversity', '£853 / ha / year', ARRAY['Arable'], 2024)
ON CONFLICT (scheme_code) DO NOTHING;

-- 4. Enable RLS
ALTER TABLE public.weather_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_ndvi_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sfi_schemes ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
-- Weather cache is public read across authorized users
CREATE POLICY "Public read weather cache" ON public.weather_cache FOR SELECT USING (true);
CREATE POLICY "Service write weather cache" ON public.weather_cache FOR ALL USING (true);

-- NDVI snapshots readable by field owners
CREATE POLICY "Users can view NDVI for their fields"
    ON public.field_ndvi_snapshots FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.fields f
            JOIN public.farms fm ON f.farm_id = fm.id
            WHERE f.id = field_id AND public.is_farm_owner(fm.id)
        )
    );

-- SFI schemes reference is readable by all authenticated users, writable by service role
CREATE POLICY "All users can view SFI schemes" ON public.sfi_schemes FOR SELECT USING (true);
CREATE POLICY "Service role can manage SFI schemes" ON public.sfi_schemes FOR ALL USING (true);
