"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarks } from "@/hooks/use-bookmarks";
import type { BookmarkItem } from "@/hooks/use-bookmarks";
import { cn } from "@/lib/utils";

interface Props {
  item: Omit<BookmarkItem, "savedAt">;
  className?: string;
}

export function BookmarkButton({ item, className }: Props) {
  const { toggle, isBookmarked } = useBookmarks();
  const saved = isBookmarked(item.slug, item.type);

  return (
    <button
      type="button"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(item); }}
      aria-label={saved ? "Remove bookmark" : "Bookmark this section"}
      title={saved ? "Remove bookmark" : "Save to bookmarks"}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors",
        saved
          ? "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-primary",
        className
      )}
    >
      {saved
        ? <BookmarkCheck className="h-4 w-4" />
        : <Bookmark className="h-4 w-4" />
      }
    </button>
  );
}
