-- =====================================================
-- Tasks Table - Core Feature for Enact AI
-- =====================================================
-- This table stores AI-extracted tasks from book pages
-- Run this in Supabase SQL Editor
-- =====================================================

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Task data
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('Mindset', 'Productivity', 'Health', 'Finance')),
  estimated_xp INTEGER DEFAULT 10,
  
  -- Image references
  image_url TEXT NOT NULL,
  proof_image_url TEXT,
  
  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'failed')),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  verified_at TIMESTAMPTZ,
  
  -- Metadata
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard'))
);

-- =====================================================
-- Indexes for Performance
-- =====================================================

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_created_at ON tasks(created_at DESC);

-- =====================================================
-- Row Level Security (RLS) Policies
-- =====================================================

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Users can view their own tasks
CREATE POLICY "Users can view own tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own tasks
CREATE POLICY "Users can insert own tasks"
  ON tasks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own tasks
CREATE POLICY "Users can update own tasks"
  ON tasks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own tasks
CREATE POLICY "Users can delete own tasks"
  ON tasks FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- =====================================================
-- Verification
-- =====================================================
-- Run this to verify table was created:
-- SELECT * FROM tasks LIMIT 1;
