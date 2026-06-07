'use client';

import { useState, useRef } from "react";
import { IconX, IconCloudUpload } from "@tabler/icons-react";
import Image from "next/image";

interface ImageUploadProps {
  onUploadComplete: (url: string) => void;
  onError?: (error: string) => void;
  folder?: string;
  className?: string;
  maxSizeMB?: number;
  label?: string;
  value?: string;
  quality?: number;
}

interface ImgBBErrorResponse {
  message?: string;
}

interface ImgBBSuccessResponse {
  success: boolean;
  data: {
    url: string;
  };
  error?: ImgBBErrorResponse;
}

export default function ImageUpload({
  onUploadComplete,
  onError,
  folder = "uploads",
  className = "",
  maxSizeMB = 5,
  label = "Upload Image",
  value,
  quality = 80,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [fileName, setFileName] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!IMGBB_API_KEY && typeof window !== 'undefined') {
    console.warn("NEXT_PUBLIC_IMGBB_API_KEY is not set in .env.local");
  }

  // Convert image to WebP
  const convertToWebP = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }
          
          ctx.drawImage(img, 0, 0);
          
          // Convert to WebP
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
                  type: 'image/webp',
                  lastModified: Date.now(),
                });
                resolve(webpFile);
              } else {
                reject(new Error('WebP conversion failed'));
              }
            },
            'image/webp',
            quality / 100
          );
        };
        img.onerror = () => reject(new Error('Failed to load image'));
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
    });
  };

  // Optimize image before conversion (resize if too large)
  const optimizeImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target?.result as string;
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          
          // Max dimensions (optional - resize if image is too large)
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1080;
          
          if (width > MAX_WIDTH || height > MAX_HEIGHT) {
            const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
            width = width * ratio;
            height = height * ratio;
          }
          
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }
          
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const optimizedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                });
                resolve(optimizedFile);
              } else {
                reject(new Error('Image optimization failed'));
              }
            },
            file.type,
            0.9
          );
        };
        img.onerror = () => reject(new Error('Failed to load image'));
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      onError?.("Please upload a valid image file (PNG, JPG, JPEG, GIF, WEBP)");
      return;
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      onError?.(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Show preview with original file
      const originalPreviewReader = new FileReader();
      originalPreviewReader.onloadend = () => {
        setPreview(originalPreviewReader.result as string);
      };
      originalPreviewReader.readAsDataURL(file);
      setFileName(file.name);

      // Update progress for optimization
      setUploadProgress(20);

      // Step 1: Optimize image (resize if needed)
      const optimizedFile = await optimizeImage(file);
      setUploadProgress(40);

      // Step 2: Convert to WebP
      const webpFile = await convertToWebP(optimizedFile);
      setUploadProgress(60);
      
      // Update preview and filename for WebP version
      const webpPreviewReader = new FileReader();
      webpPreviewReader.onloadend = () => {
        setPreview(webpPreviewReader.result as string);
      };
      webpPreviewReader.readAsDataURL(webpFile);
      setFileName(webpFile.name);
      setUploadProgress(70);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 5;
        });
      }, 100);

      // Step 3: Upload to ImgBB
      const formData = new FormData();
      formData.append("image", webpFile);
      
      const timestamp = Date.now();
      const sanitizedFileName = webpFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      formData.append("name", `${folder}/${timestamp}-${sanitizedFileName}`);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data: ImgBBSuccessResponse = await response.json();

      if (data.success) {
        const imageUrl = data.data.url;
        onUploadComplete(imageUrl);
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to upload image. Please try again.";
      onError?.(errorMessage);
      setPreview(null);
      setFileName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-white/70 mb-2">
          {label}
        </label>
      )}

      <div
        className={`relative group border-2 border-dashed rounded-3xl p-6 transition-all cursor-pointer ${
          preview 
            ? "border-cyan-400 bg-cyan-500/5" 
            : "border-white/30 hover:border-cyan-400 bg-white/5 hover:bg-white/10"
        } ${isUploading ? "pointer-events-none opacity-70" : ""}`}
        onClick={triggerFileInput}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />

        {preview ? (
          <div className="relative">
            <div className="relative mx-auto max-h-60 overflow-hidden rounded-2xl">
              <Image
                src={preview}
                alt="Preview"
                width={300}
                height={200}
                className="max-h-60 w-auto object-contain"
                unoptimized={preview.startsWith('data:')}
              />
            </div>
            {fileName && (
              <p className="text-center text-xs text-white/60 mt-3 truncate px-4">
                {fileName}
              </p>
            )}
            <button
              type="button"
              onClick={(e) => { 
                e.stopPropagation(); 
                removeImage(); 
              }}
              className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-colors shadow-lg"
              aria-label="Remove image"
            >
              <IconX size={16} />
            </button>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <IconCloudUpload size={40} className="text-white/50 group-hover:text-cyan-400 transition-colors" />
            </div>
            <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">
              {label}
            </p>
            <p className="text-white/50 text-sm mt-1">
              Click or drag to upload
            </p>
            <p className="text-white/30 text-xs mt-2">
              PNG, JPG, GIF, WEBP up to {maxSizeMB}MB
            </p>
            <p className="text-white/20 text-[10px] mt-1">
              Images will be converted to WebP format for optimal performance
            </p>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-3xl backdrop-blur-sm">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-cyan-400" />
                <span className="text-sm text-white">
                  {uploadProgress < 40 && "Optimizing image..."}
                  {uploadProgress >= 40 && uploadProgress < 60 && "Converting to WebP..."}
                  {uploadProgress >= 60 && "Uploading to ImgBB..."}
                </span>
              </div>
              {uploadProgress > 0 && (
                <div className="w-48 mt-2">
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-linear-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-white/50 mt-1">{uploadProgress}%</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}