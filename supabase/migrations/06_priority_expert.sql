-- ==============================================================================
-- PRIORITY EXPERT ACCESS SCHEMA MIGRATION
-- ==============================================================================

-- Add priority boolean column to expert_requests
DO $$ BEGIN
    ALTER TABLE public.expert_requests ADD COLUMN priority BOOLEAN NOT NULL DEFAULT false;
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;
