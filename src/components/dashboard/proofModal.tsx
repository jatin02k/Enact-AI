'use client'

import { useRef, useState } from "react"
import { X, Upload, FileText, ImageIcon } from "lucide-react"
import Image from "next/image"

interface ProofModalProps {
  isOpen: boolean
  onClose: () => void
  taskTitle: string
  onSubmit: (data: { imageBase64: string | null; textProof: string }) => void
  isSubmitting?: boolean
}

export default function ProofModal({
  isOpen,
  onClose,
  taskTitle,
  onSubmit,
  isSubmitting = false,
}: ProofModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [textProof, setTextProof] = useState("")

  if (!isOpen) return null

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      alert("Image must be under 10MB")
      return
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const clearImage = () => {
    setPreviewUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = () => {
    if (!previewUrl && !textProof.trim()) {
      alert("Please provide image or text proof")
      return
    }
    onSubmit({ imageBase64: previewUrl, textProof })
  }

  return (
    /* Overlay — clicking it closes the modal */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal container — stop click from bubbling to overlay */}
      <div
        className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl border border-soft-sand overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-soft-sand">
          <div>
            <p className="text-xs font-medium text-coral uppercase tracking-widest mb-1">Upload Proof</p>
            <h2 className="text-lg font-bold text-deep-brown leading-snug max-w-sm">{taskTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-soft-sand/60 text-warm-gray hover:text-deep-brown transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body — two side by side panels */}
        <div className="flex gap-4 p-6">

          {/* Left — Image upload */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <ImageIcon className="w-4 h-4 text-coral" />
              <span className="text-sm font-semibold text-deep-brown">Image Proof</span>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {previewUrl ? (
              /* Image preview */
              <div className="relative flex-1 min-h-[180px] rounded-xl overflow-hidden border-2 border-coral/40">
                <Image
                  src={previewUrl}
                  alt="Proof preview"
                  fill
                  className="object-cover"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              /* Upload area */
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 min-h-[180px] rounded-xl border-2 border-dashed border-soft-sand hover:border-coral/50 hover:bg-coral/5 transition-all flex flex-col items-center justify-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-soft-sand group-hover:bg-coral/10 flex items-center justify-center transition">
                  <Upload className="w-5 h-5 text-warm-gray group-hover:text-coral transition" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-deep-brown">Click to upload</p>
                  <p className="text-xs text-warm-gray mt-0.5">JPG, PNG up to 10MB</p>
                </div>
              </button>
            )}

            {previewUrl && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 text-xs text-warm-gray hover:text-coral transition text-center"
              >
                Change image
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="flex-1 w-px bg-soft-sand" />
            <span className="text-xs font-bold text-warm-gray bg-white px-1">OR</span>
            <div className="flex-1 w-px bg-soft-sand" />
          </div>

          {/* Right — Text proof */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-coral" />
              <span className="text-sm font-semibold text-deep-brown">Text Proof</span>
            </div>

            <textarea
              value={textProof}
              onChange={(e) => setTextProof(e.target.value)}
              placeholder="Describe what you did, how you did it, and what you learned..."
              className="flex-1 min-h-[180px] w-full rounded-xl border-2 border-soft-sand hover:border-coral/40 focus:border-coral focus:outline-none p-4 text-sm text-deep-brown placeholder:text-warm-gray/60 resize-none transition"
            />

            <p className="text-xs text-warm-gray mt-2 text-right">
              {textProof.length} characters
            </p>
          </div>
        </div>

        {/* Footer — Submit button */}
        <div className="px-6 pb-6">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || (!previewUrl && !textProof.trim())}
            className="w-full py-3.5 rounded-xl bg-coral hover:bg-coral/90 disabled:bg-soft-sand disabled:text-warm-gray text-white font-semibold text-sm tracking-wide transition-all shadow-md hover:shadow-lg disabled:shadow-none"
          >
            {isSubmitting ? "Verifying your proof..." : "Submit Proof"}
          </button>
        </div>

      </div>
    </div>
  )
}