/*
  # Add granular subscription tracking fields

  1. New Columns
    - `score_checks_used` (integer, default 0)
    - `score_checks_total` (integer, default 0)
    - `linkedin_messages_used` (integer, default 0)
    - `linkedin_messages_total` (integer, default 0)
    - `guided_builds_used` (integer, default 0)
    - `guided_builds_total` (integer, default 0)

  2. Indexes
    - Add indexes for performance on usage tracking queries

  3. Constraints
    - Ensure used counts don't exceed total counts
    - Ensure non-negative values
*/

-- Add new columns for granular subscription tracking
ALTER TABLE public.subscriptions
ADD COLUMN IF NOT EXISTS score_checks_used INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS score_checks_total INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS linkedin_messages_used INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS linkedin_messages_total INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS guided_builds_used INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS guided_builds_total INTEGER DEFAULT 0 NOT NULL;

-- Add indexes for performance
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'subscriptions' AND indexname = 'idx_subscriptions_usage_tracking'
  ) THEN
    CREATE INDEX idx_subscriptions_usage_tracking ON public.subscriptions 
    (user_id, status, score_checks_used, linkedin_messages_used, guided_builds_used);
  END IF;
END $$;

-- Add check constraints to ensure data integrity
DO $$
BEGIN
  -- Check if constraint doesn't already exist before adding
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'check_score_checks_usage' AND table_name = 'subscriptions'
  ) THEN
    ALTER TABLE public.subscriptions 
    ADD CONSTRAINT check_score_checks_usage CHECK (score_checks_used <= score_checks_total);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'check_linkedin_messages_usage' AND table_name = 'subscriptions'
  ) THEN
    ALTER TABLE public.subscriptions 
    ADD CONSTRAINT check_linkedin_messages_usage CHECK (linkedin_messages_used <= linkedin_messages_total);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'check_guided_builds_usage' AND table_name = 'subscriptions'
  ) THEN
    ALTER TABLE public.subscriptions 
    ADD CONSTRAINT check_guided_builds_usage CHECK (guided_builds_used <= guided_builds_total);
  END IF;

  -- Ensure non-negative values
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'check_non_negative_usage' AND table_name = 'subscriptions'
  ) THEN
    ALTER TABLE public.subscriptions 
    ADD CONSTRAINT check_non_negative_usage CHECK (
      score_checks_used >= 0 AND score_checks_total >= 0 AND
      linkedin_messages_used >= 0 AND linkedin_messages_total >= 0 AND
      guided_builds_used >= 0 AND guided_builds_total >= 0
    );
  END IF;
END $$;