"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DETAILED_ENTRIES, DETAILED_CATEGORIES } from "./detailed-data";
import type { DetailedCategory } from "./detailed-data";
import { BookmarkButton } from "@/components/bookmark-button";
import { RecentHistory } from "./recent-history";

export function DetailedListingClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<DetailedCategory | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return DETAILED_ENTRIES.filter((e) => {
      if (activeCategory && e.category !== activeCategory) return false;
      if (!q) return true;
      return (
        e.title.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q) ||
        e.section2025.toLowerCase().includes(q) ||
        e.section1961.toLowerCase().includes(q) ||
        e.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [query, activeCategory]);

  const visibleCategories = DETAILED_CATEGORIES.filter((cat) =>
    DETAILED_ENTRIES.some((e) => e.category === cat)
  );

  return (
    <div className="space-y-6">

      {/* Recently viewed */}
      <RecentHistory />

      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search by topic, section number, or keyword… e.g. "slump sale", "buyback", "agricultural"'
          className="w-full rounded-md border bg-card py-3 pl-10 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={cn(
            "shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            !activeCategory
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          All ({DETAILED_ENTRIES.length})
        </button>
        {visibleCategories.map((cat) => {
          const count = DETAILED_ENTRIES.filter((e) => e.category === cat).length;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(isActive ? null : cat)}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="border-y py-14 text-center">
          <p className="text-sm text-muted-foreground">
            No entries match{" "}
            <span className="font-medium text-foreground">&ldquo;{query}&rdquo;</span>.
          </p>
          <button
            type="button"
            onClick={() => { setQuery(""); setActiveCategory(null); }}
            className="mt-2 text-xs text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-3 text-xs text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
            {DETAILED_ENTRIES.length} analyses
          </p>

          <div className="divide-y border-y">
            {filtered.map((entry) => (
              <div key={entry.slug} className="group relative">
                <div className="absolute right-0 top-5 z-10">
                  <BookmarkButton
                    item={{
                      slug: entry.slug,
                      type: "detailed",
                      title: entry.title,
                      section: entry.section2025,
                      category: entry.category,
                    }}
                  />
                </div>

                <Link href={`/detailed-explainer/${entry.slug}`} className="block py-6 pr-14">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium text-primary">{entry.section2025}</span>
                    {entry.section1961 && (
                      <>
                        {" "}· was <span className="font-medium text-foreground">{entry.section1961}</span> in the 1961 Act
                      </>
                    )}
                    {" "}· {entry.category}
                  </p>
                  <h2 className="mt-1.5 text-lg font-semibold leading-snug group-hover:text-primary group-hover:underline underline-offset-4 decoration-1">
                    {entry.title}
                  </h2>
                  <p className="mt-1.5 line-clamp-2 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
                    {entry.summary}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
