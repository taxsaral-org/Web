"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrefillBadgeProps {
  source: string;
  onDismiss: () => void;
  className?: string;
}

export function PrefillBadge({ source, onDismiss, className }: PrefillBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700 dark:bg-sky-900 dark:text-sky-300",
        className
      )}
    >
      Pre-filled from {source}
      <button
        type="button"
        onClick={onDismiss}
        aria-label={`Clear value pre-filled from ${source}`}
        className="ml-0.5 rounded-full hover:text-sky-900 dark:hover:text-sky-100"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}
