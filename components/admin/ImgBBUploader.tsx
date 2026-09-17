"use client";

import React, { useState, useRef } from "react";
import { 
  IconCloudUpload, 
  IconPhoto, 
  IconCheck, 
  IconAlertCircle, 
  IconLoader2, 
  IconTrash, 
  IconExternalLink,
  IconCopy
} from "@tabler/icons-react";
import { uploadToImgBB } from "@/lib/admin/imgbb";

interface ImgBBUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
}

export default function ImgBBUploader({
  value,
  onChange,
  label = "Item Icon / Image (ImgBB)",
  helperText = "Upload high-res icon or item artwork directly to ImgBB cloud storage.",
}: ImgBBUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [customUrl, setCustomUrl] = useState(value);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WEBP, GIF).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size exceeds 10MB limit.");
      return;
    }

    setError(null);
    setUploading(true);
    setUploadProgress("Uploading to ImgBB...");

    try {
      const result = await uploadToImgBB(file);
      if (result.success && result.url) {
        onChange(result.url);
        setCustomUrl(result.url);
        setUploadProgress(null);
      } else {
        setError(result.error || "Failed to upload to ImgBB.");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred during upload.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleUrlSubmit = () => {
    if (!customUrl.trim()) {
      setError("Please enter a valid URL.");
      return;
    }
    setError(null);
    onChange(customUrl.trim());
  };

  const handleClear = () => {
    onChange("");
    setCustomUrl("");
    setError(null);
  };

  const copyUrl = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <IconPhoto className="w-4 h-4 text-primary" />
          {label}
        </label>
        <div className="flex items-center gap-1 text-[11px] bg-muted/60 border border-border rounded-md p-0.5">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2.5 py-0.5 rounded transition ${
              mode === "upload"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            ImgBB Upload
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2.5 py-0.5 rounded transition ${
              mode === "url"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Direct URL
          </button>
        </div>
      </div>

      {mode === "upload" ? (
        <div
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
            uploading
              ? "border-primary bg-primary/5 cursor-wait"
              : "border-border hover:border-primary/60 bg-muted/20 hover:bg-muted/40"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />

          {uploading ? (
            <div className="flex flex-col items-center justify-center py-2 space-y-2">
              <IconLoader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-sm font-medium text-primary">{uploadProgress}</p>
              <p className="text-xs text-muted-foreground">Processing image via ImgBB API</p>
            </div>
          ) : value ? (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-card border border-border p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={value}
                    alt="Preview"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="text-left overflow-hidden">
                  <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <IconCheck className="w-3.5 h-3.5" /> Hosted on ImgBB
                  </p>
                  <p className="text-xs text-foreground truncate max-w-xs font-mono">{value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Click to replace image</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={copyUrl}
                  title="Copy URL"
                  className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition"
                >
                  {copied ? <IconCheck className="w-4 h-4 text-emerald-400" /> : <IconCopy className="w-4 h-4" />}
                </button>
                <a
                  href={value}
                  target="_blank"
                  rel="noreferrer"
                  title="Open in new tab"
                  className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition"
                >
                  <IconExternalLink className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={handleClear}
                  title="Remove image"
                  className="p-1.5 rounded-lg bg-destructive/10 hover:bg-destructive text-destructive hover:text-destructive-foreground transition"
                >
                  <IconTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-2">
                <IconCloudUpload className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-foreground">
                Click or drag & drop to upload to <span className="text-primary font-semibold">ImgBB</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG, WEBP, or GIF up to 10MB (Direct image hosting)
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://i.ibb.co/... or https://render.albiononline.com/..."
              className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary font-mono"
            />
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs rounded-lg transition"
            >
              Apply
            </button>
          </div>
          {value && (
            <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt="Preview" className="w-10 h-10 object-contain rounded bg-card p-1" />
              <span className="text-xs text-foreground font-mono truncate flex-1">{value}</span>
              <button
                type="button"
                onClick={handleClear}
                className="text-destructive hover:underline text-xs px-2 py-1"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-destructive bg-destructive/10 border border-destructive/20 px-3 py-2 rounded-lg">
          <IconAlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {helperText && <p className="text-[11px] text-muted-foreground">{helperText}</p>}
    </div>
  );
}
