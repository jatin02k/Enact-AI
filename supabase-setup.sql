-- =====================================================
-- Enact AI - Supabase Storage Setup
-- =====================================================
-- This file contains SQL commands to set up your storage bucket
-- and Row Level Security (RLS) policies for the 'pages' bucket.
--
-- HOW TO USE:
-- 1. Go to your Supabase Dashboard
-- 2. Click on "SQL Editor" in the left sidebar
-- 3. Create a new query
-- 4. Copy and paste this entire file
-- 5. Click "Run" to execute
-- =====================================================

-- =====================================================
-- STEP 1: Create the Storage Bucket
-- =====================================================
-- Note: You can also create this via the Supabase Dashboard UI
-- Go to Storage > Create a new bucket > Name it 'pages'
-- Make it PUBLIC if you want images to be accessible without auth
-- Make it PRIVATE if you want only authenticated users to view

-- This creates a PUBLIC bucket (images are publicly accessible)
INSERT INTO storage.buckets (id, name, public)
VALUES ('pages', 'pages', true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- STEP 2: Enable Row Level Security (RLS)
-- =====================================================
-- RLS ensures users can only access their own files

-- Enable RLS on the storage.objects table (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 3: Create RLS Policies
-- =====================================================

-- Policy 1: Users can UPLOAD files to their own folder
-- This allows: INSERT operations
-- Condition: File path must start with user's ID
CREATE POLICY "Users can upload to their own folder"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'pages' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 2: Users can VIEW their own files
-- This allows: SELECT operations
-- Condition: File path must start with user's ID
CREATE POLICY "Users can view their own files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'pages' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 3: Users can UPDATE their own files
-- This allows: UPDATE operations (e.g., replacing an image)
-- Condition: File path must start with user's ID
CREATE POLICY "Users can update their own files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'pages' 
  AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'pages' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 4: Users can DELETE their own files
-- This allows: DELETE operations
-- Condition: File path must start with user's ID
CREATE POLICY "Users can delete their own files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'pages' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- =====================================================
-- OPTIONAL: Allow public READ access (if bucket is public)
-- =====================================================
-- Uncomment this if you want ANYONE (even non-logged-in users)
-- to be able to VIEW images via the public URL
-- This is useful for sharing task proofs publicly

-- CREATE POLICY "Public can view all files"
-- ON storage.objects
-- FOR SELECT
-- TO public
-- USING (bucket_id = 'pages');

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these to verify your setup worked correctly

-- Check if bucket was created
-- SELECT * FROM storage.buckets WHERE id = 'pages';

-- Check if policies were created
-- SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';

-- =====================================================
-- NOTES:
-- =====================================================
-- 1. The file path in your code MUST be: `${user.id}/${filename}`
--    This matches the RLS policy: (storage.foldername(name))[1] = auth.uid()::text
--
-- 2. If you get "new row violates row-level security policy" errors:
--    - Make sure the user is authenticated
--    - Make sure the file path starts with the user's ID
--    - Check that the bucket name is exactly 'pages'
--
-- 3. To test if RLS is working:
--    - Try uploading a file with a different user ID in the path
--    - It should fail with a policy violation error
--
-- 4. Storage limits:
--    - Free tier: 1GB storage
--    - Pro tier: 100GB storage
--    - You can set file size limits in the bucket settings
-- =====================================================
