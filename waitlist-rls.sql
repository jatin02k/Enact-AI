-- =====================================================
-- Waitlist Table RLS Policies
-- =====================================================
-- This allows anyone (even non-authenticated users) to 
-- submit their email to the waitlist, but prevents them
-- from viewing other people's emails.
-- =====================================================

-- Enable RLS on waitlist table
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Policy 1: Anyone can INSERT (submit email)
-- This allows public access to add emails to waitlist
CREATE POLICY "Anyone can join waitlist"
ON waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy 2: Only authenticated admins can SELECT (view emails)
-- Replace 'your-admin-user-id' with your actual user ID
-- Or create an admin role in Supabase
CREATE POLICY "Only admins can view waitlist"
ON waitlist
FOR SELECT
TO authenticated
USING (
  -- Option A: Specific user ID (replace with your ID)
  auth.uid() = 'your-admin-user-id'::uuid
  
  -- Option B: Check if user has admin role (recommended)
  -- auth.jwt() ->> 'role' = 'admin'
);

-- Policy 3: No one can UPDATE or DELETE
-- Waitlist emails should be permanent
-- (Remove these if you want to allow updates/deletes)

-- =====================================================
-- OPTIONAL: Get your user ID to use in the policy
-- =====================================================
-- Run this query to find your user ID:
-- SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';

-- =====================================================
-- ALTERNATIVE: Simple public read access
-- =====================================================
-- If you want to show "X people joined" counter publicly:
-- 
-- CREATE POLICY "Public can count waitlist"
-- ON waitlist
-- FOR SELECT
-- TO anon, authenticated
-- USING (true);
--
-- Then in your frontend:
-- const { count } = await supabase.from('waitlist').select('*', { count: 'exact', head: true });

-- =====================================================
-- VERIFICATION
-- =====================================================
-- Test the policies:
-- 1. Try inserting from unauthenticated user (should work)
-- 2. Try selecting from unauthenticated user (should fail)
-- 3. Try selecting as admin (should work)
