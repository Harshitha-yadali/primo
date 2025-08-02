/*
  # Add granular subscription tracking fields

  1. New Columns
    - `score_checks_used` (integer) - Number of score checks used
    - `score_checks_total` (integer) - Total score checks available
    - `linkedin_messages_used` (integer) - Number of LinkedIn messages used
    - `linkedin_messages_total` (integer) - Total LinkedIn messages available
    - `guided_builds_used` (integer) - Number of guided builds used
    - `guided_builds_total` (integer) - Total guided builds available

  2. Purpose
    - Enable granular tracking of different subscription features
    - Support feature-specific usage limits and availability checks
    - Provide detailed analytics for subscription usage
*/

-- Add new columns to subscriptions table
ALTER TABLE public.subscriptions
ADD COLUMN IF NOT EXISTS score_checks_used INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS score_checks_total INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS linkedin_messages_used INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS linkedin_messages_total INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS guided_builds_used INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN IF NOT EXISTS guided_builds_total INTEGER DEFAULT 0 NOT NULL;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_score_checks ON public.subscriptions(score_checks_used, score_checks_total);
CREATE INDEX IF NOT EXISTS idx_subscriptions_linkedin_messages ON public.subscriptions(linkedin_messages_used, linkedin_messages_total);
CREATE INDEX IF NOT EXISTS idx_subscriptions_guided_builds ON public.subscriptions(guided_builds_used, guided_builds_total);

-- Add check constraints to ensure used counts don't exceed totals
ALTER TABLE public.subscriptions
ADD CONSTRAINT check_score_checks_usage CHECK (score_checks_used <= score_checks_total),
ADD CONSTRAINT  check_linkedin_messages_usage CHECK (linkedin_messages_used <= linkedin_messages_total),
ADD CONSTRAINT  check_guided_builds_usage CHECK (guided_builds_used <= guided_builds_total);

-- Add check constraints to ensure non-negative values
ALTER TABLE public.subscriptions
ADD CONSTRAINT check_score_checks_non_negative CHECK (score_checks_used >= 0 AND score_checks_total >= 0),
ADD CONSTRAINT IF NOT EXISTS check_linkedin_messages_non_negative CHECK (linkedin_messages_used >= 0 AND linkedin_messages_total >= 0),
ADD CONSTRAINT IF NOT EXISTS check_guided_builds_non_negative CHECK (guided_builds_used >= 0 AND guided_builds_total >= 0);