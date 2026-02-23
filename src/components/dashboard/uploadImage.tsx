'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Upload, ImageIcon, X, Loader2, Sparkles, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Image from 'next/image'

interface UploadImageProps {
  onTaskExtracted?: () => void
}

export function UploadImage({ onTaskExtracted }: UploadImageProps) {
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [extractedTask, setExtractedTask] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be less than 10MB')
      return
    }

    setSelectedFile(file)
    setExtractedTask(null)
    setUploadedImageUrl(null)

    // Create instant local preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        toast.error('Please sign in to upload images')
        return
      }

      // Generate unique file path
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${crypto.randomUUID()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('pages')
        .upload(filePath, selectedFile)

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`)
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('pages')
        .getPublicUrl(filePath)

      setUploadedImageUrl(publicUrl)
      toast.success('Image uploaded! Extracting task...')

      // Now extract task using AI
      setIsUploading(false)
      setIsExtracting(true)

      const response = await fetch('/api/extract-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: publicUrl }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to extract task')
      }

      const data = await response.json()
      setExtractedTask(data.task)
      toast.success('Task extracted successfully! 🎯')

      // Notify parent to refresh task list
      if (onTaskExtracted) {
        onTaskExtracted()
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsUploading(false)
      setIsExtracting(false)
    }
  }

  const handleClear = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setUploadedImageUrl(null)
    setExtractedTask(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const isLoading = isUploading || isExtracting

  return (
    <div className="bg-white rounded-2xl border border-soft-sand p-6 space-y-5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-coral" />
        </div>
        <div>
          <h3 className="font-semibold text-deep-brown text-sm">Extract a Task</h3>
          <p className="text-xs text-warm-gray">Upload a book page to get your action</p>
        </div>
      </div>

      {/* Upload Area */}
      {!previewUrl ? (
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-soft-sand rounded-xl cursor-pointer hover:border-coral/50 hover:bg-coral/5 transition-all group"
        >
          <div className="flex flex-col items-center gap-2 text-center px-4">
            <div className="w-10 h-10 rounded-xl bg-warm-cream flex items-center justify-center group-hover:bg-coral/10 transition-colors">
              <Upload className="w-5 h-5 text-warm-gray group-hover:text-coral transition-colors" />
            </div>
            <div>
              <p className="text-sm font-medium text-deep-brown">Click to upload a book page</p>
              <p className="text-xs text-warm-gray mt-0.5">JPG, PNG, WEBP up to 10MB</p>
            </div>
          </div>
          <input
            id="image-upload"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </label>
      ) : (
        <div className="space-y-3">
          {/* Image Preview */}
          <div className="relative w-full h-48 rounded-xl overflow-hidden border border-soft-sand">
            <Image
              src={uploadedImageUrl || previewUrl}
              alt="Book page preview"
              fill
              className="object-cover"
              unoptimized={!uploadedImageUrl} // Only optimize Supabase URLs
            />
            {!isLoading && (
              <button
                onClick={handleClear}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
              >
                <X className="w-4 h-4 text-deep-brown" />
              </button>
            )}
          </div>

          {/* Upload Button */}
          {!extractedTask && (
            <Button
              onClick={handleUpload}
              disabled={isLoading}
              className="w-full h-11 bg-coral hover:bg-coral/90 text-white font-medium rounded-xl text-sm transition-all"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Uploading image...
                </>
              ) : isExtracting ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                  AI is reading the page...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Upload &amp; Extract Task
                </>
              )}
            </Button>
          )}
        </div>
      )}

      {/* Extracted Task Result */}
      {extractedTask && (
        <div className="bg-warm-cream rounded-xl p-4 border border-warm-gold/30">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-sage" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-warm-gray mb-1">Your task for today:</p>
              <p className="text-sm font-semibold text-deep-brown leading-relaxed">{extractedTask}</p>
            </div>
          </div>
          <button
            onClick={handleClear}
            className="mt-3 text-xs text-warm-gray hover:text-coral transition-colors flex items-center gap-1"
          >
            <ImageIcon className="w-3 h-3" />
            Upload another page
          </button>
        </div>
      )}
    </div>
  )
}
