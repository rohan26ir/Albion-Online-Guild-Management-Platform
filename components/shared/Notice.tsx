"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { IconBell, IconX, IconAlertCircle, IconCheck } from "@tabler/icons-react";

interface NoticeProps {
  details: {
    title: string;
    urlText: string;
    url: string;
    type?: "info" | "warning" | "success" | "error";
    id?: string;
  };
}

export default function Notice({ details }: NoticeProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  const { title, urlText, url, type = "info", id = "default-notice" } = details;

  // Check localStorage on mount - using a separate function to avoid setState in effect
  useEffect(() => {
    const checkDismissedStatus = () => {
      const dismissedNotices = localStorage.getItem("dismissedNotices");
      if (dismissedNotices) {
        const dismissed: string[] = JSON.parse(dismissedNotices);
        if (dismissed.includes(id)) {
          setIsVisible(false);
        }
      }
    };
    
    checkDismissedStatus();
  }, [id]);

  const handleClose = () => {
    setIsVisible(false);
    const dismissedNotices = localStorage.getItem("dismissedNotices");
    const dismissed: string[] = dismissedNotices ? JSON.parse(dismissedNotices) : [];
    
    if (!dismissed.includes(id)) {
      const updatedDismissed = [...dismissed, id];
      localStorage.setItem("dismissedNotices", JSON.stringify(updatedDismissed));
    }
  };

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "warning":
        return "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400";
      case "success":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400";
      case "error":
        return "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400";
      default:
        return "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-400";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "warning":
        return <IconAlertCircle size={18} />;
      case "success":
        return <IconCheck size={18} />;
      case "error":
        return <IconAlertCircle size={18} />;
      default:
        return <IconBell size={18} />;
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4">
      <div className={`
        w-full rounded-lg border ${getTypeStyles()}
        transition-all duration-300 animate-in slide-in-from-top-2
      `}>
        <div className="flex items-center gap-3 px-4 py-2.5">
          {/* Icon */}
          <div className="flex-shrink-0">
            {getIcon()}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-wrap items-center gap-2 sm:gap-3">
            <p className="text-sm font-medium text-foreground">
              {title}
            </p>
            <Link 
              href={url}
              className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-background/80 hover:bg-background border border-border transition-all hover:scale-105"
            >
              {urlText}
            </Link>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-all hover:scale-110 active:scale-95"
            aria-label="Close notice"
          >
            <IconX size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}