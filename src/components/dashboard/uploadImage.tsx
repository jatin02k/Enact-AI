'use client'

import { useRef, useState } from "react"
import { Button } from "../ui/button"
import { Upload, X } from "lucide-react"
import toast from "react-hot-toast"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"

export default function UploadImage() {
    const supabase = createClient();
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file size
        if (file.size > 10 * 1024 * 1024) {
            toast.error('Image size must be less than 10MB');
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        setSelectedFile(file);

        // Create local preview using FileReader
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    }

    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        try {
            // Get current user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                toast.error('You must be logged in to upload');
                return;
            }

            const fileExt = selectedFile.name.split('.').pop();
            const fileName = `${crypto.randomUUID()}.${fileExt}`;
            // Organize by user ID for better file management
            const filePath = `${user.id}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('pages')
                .upload(filePath, selectedFile);

            if (uploadError) {
                toast.error(uploadError.message);
                throw uploadError;
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('pages')
                .getPublicUrl(filePath);

            setPreviewUrl(publicUrl);
            toast.success('Image uploaded successfully');

            // TODO: Save to database (you'll do this in Week 2)
            // await saveTaskToDatabase(publicUrl);

        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error('upload error', errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsUploading(false);
        }
    }

    const clearImage = () => {
        setPreviewUrl(null);
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800">
                <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">Upload Book Page</h2>
                        <p className="text-zinc-400">Capture a page from your book to extract an actionable task</p>
                    </div>

                    {/* Image Preview */}
                    {previewUrl && (
                        <div className="relative w-full max-w-md">
                            <div className="relative aspect-square w-full rounded-lg overflow-hidden border-2 border-orange-500/50">
                                <Image
                                    src={previewUrl}
                                    alt="Book page preview"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <button
                                onClick={clearImage}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition"
                                disabled={isUploading}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {/* Upload Controls */}
                    <div className="flex flex-col items-center gap-4 w-full">
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="upload-image"
                        />

                        {!previewUrl ? (
                            <Button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white"
                            >
                                Choose Image
                                <Upload className="ml-2 w-4 h-4" />
                            </Button>
                        ) : (
                            <div className="flex gap-3 w-full sm:w-auto">
                                <Button
                                    type="button"
                                    onClick={handleUpload}
                                    disabled={isUploading}
                                    className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600 text-white"
                                >
                                    {isUploading ? "Uploading..." : "Upload & Extract Task"}
                                    <Upload className="ml-2 w-4 h-4" />
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    variant="ghost"
                                    className="border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                                >
                                    Change
                                </Button>
                            </div>
                        )}

                        <p className="text-xs text-zinc-500 text-center">
                            Recommended: Clear photo, JPG/PNG, Max 10 MB
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}