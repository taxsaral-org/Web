"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bookmark, BookmarkX, ArrowRight, BookOpen } from "lucide-react";
import { useBookmarks } from "@/hooks/use-bookmarks";
import type { BookmarkItem } from "@/hooks/use-bookmarks";

const CATEGORY_COLORS: Record<string, string> = {
  "Capital Gains":            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  "Corporate Tax":            "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  "TDS & TCS":                "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  "Business & Profession":    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "Deductions":               "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "International Tax":        "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
  "Special Income":           "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  "Charitable Trusts & NPOs": "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  "Agricultural Income":      "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300",
};

function hrefFor(item: BookmarkItem) {
  return item.type === "detailed"
    ? `/detailed-explainer/${item.slug}`
    : `/section-explainer/${item.slug}`;
}

export default function BookmarksPage() {
  const { bookmarks, remove } = useBookmarks();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <Bookmark className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Bookmarks</h1>
          <p className="text-sm text-muted-foreground">
            Saved sections &amp; analyses — stored in your browser
          </p>
        </div>
      </div>

      {!mounted ? null : bookmarks.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-muted/20 py-16 text-center">
          <BookOpen className="mx-auto mb-4 h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm font-medium text-muted-foreground">No bookmarks yet</p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            Hit the bookmark icon on any detailed explainer to save it here.
          </p>
          <Link
            href="/detailed-explainer"
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Browse analyses
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-4 text-xs text-muted-foreground">
            {bookmarks.length} saved item{bookmarks.length !== 1 ? "s" : ""}
          </p>
          <div className="space-y-3">
            {bookmarks.map((item) => (
              <div
                key={`${item.type}-${item.slug}`}
                className="flex items-start gap-3 rounded-xl border bg-card p-4 hover:bg-muted/10 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
                      {item.section}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[item.category] ?? "bg-muted text-muted-foreground"}`}
                    >
                      {item.category}
                    </span>
                    <span className="text-xs text-muted-foreground capitalize">{item.type} explainer</span>
                  </div>
                  <Link
                    href={hrefFor(item)}
                    className="group flex items-center gap-1 text-sm font-semibold hover:text-primary transition-colors"
                  >
                    {item.title}
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Saved{" "}
                    {new Date(item.savedAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(item.slug, item.type)}
                  title="Remove bookmark"
                  className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-colors"
                >
                  <BookmarkX className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
