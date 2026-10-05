"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookmarkX } from "lucide-react";
import { useBookmarks } from "@/hooks/use-bookmarks";
import type { BookmarkItem } from "@/hooks/use-bookmarks";

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
    <div className="container mx-auto max-w-3xl py-10 sm:py-12">
      <p className="text-sm text-muted-foreground">Saved in this browser only</p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Bookmarks</h1>

      {!mounted ? null : bookmarks.length === 0 ? (
        <div className="mt-8 border-y py-12">
          <p className="font-medium">Nothing saved yet.</p>
          <p className="mt-1 text-[15px] text-muted-foreground">
            Use the bookmark button on any detailed explainer to keep it here for later.{" "}
            <Link href="/detailed-explainer" className="text-primary underline underline-offset-4">
              Browse the analyses
            </Link>
            .
          </p>
        </div>
      ) : (
        <>
          <p className="mt-2 text-sm text-muted-foreground">
            {bookmarks.length} saved item{bookmarks.length !== 1 ? "s" : ""}
          </p>
          <ul className="mt-6 divide-y border-y">
            {bookmarks.map((item) => (
              <li key={`${item.type}-${item.slug}`} className="flex items-start gap-4 py-4">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-primary">{item.section}</span>
                    {" · "}{item.category}{" · "}
                    <span className="capitalize">{item.type}</span> explainer
                  </p>
                  <Link
                    href={hrefFor(item)}
                    className="mt-1 block font-serif text-lg font-semibold leading-snug hover:text-primary hover:underline underline-offset-4"
                  >
                    {item.title}
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
                  aria-label={`Remove ${item.title} from bookmarks`}
                  className="shrink-0 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-colors"
                >
                  <BookmarkX className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
