"use client";

import { useState, useMemo } from "react";
import { Search, X, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DETAILED_ENTRIES, DETAILED_CATEGORIES } from "./detailed-data";
import type { DetailedCategory } from "./detailed-data";

// Pill badge on the card
const CATEGORY_BADGE: Record<DetailedCategory, string> = {
  "Capital Gains":            "bg-yellow-100 text-yellow-800",
  "Corporate Tax":            "bg-violet-100 text-violet-800",
  "TDS & TCS":                "bg-pink-100 text-pink-800",
  "Business & Profession":    "bg-amber-100 text-amber-800",
  "Deductions":               "bg-green-100 text-green-800",
  "International Tax":        "bg-sky-100 text-sky-800",
  "Special Income":           "bg-cyan-100 text-cyan-800",
  "Charitable Trusts & NPOs": "bg-teal-100 text-teal-800",
  "Agricultural Income":      "bg-lime-100 text-lime-800",
};

// Left border accent on each card
const CATEGORY_ACCENT: Record<DetailedCategory, string> = {
  "Capital Gains":            "border-l-yellow-400",
  "Corporate Tax":            "border-l-violet-400",
  "TDS & TCS":                "border-l-pink-400",
  "Business & Profession":    "border-l-amber-400",
  "Deductions":               "border-l-green-400",
  "International Tax":        "border-l-sky-400",
  "Special Income":           "border-l-cyan-400",
  "Charitable Trusts & NPOs": "border-l-teal-400",
  "Agricultural Income":      "border-l-lime-400",
};

// Active filter pill colour (category-matched, not generic primary)
const CATEGORY_FILTER_ACTIVE: Record<DetailedCategory, string> = {
  "Capital Gains":            "bg-yellow-100 text-yellow-800 border-yellow-300",
  "Corporate Tax":            "bg-violet-100 text-violet-800 border-violet-300",
  "TDS & TCS":                "bg-pink-100 text-pink-800 border-pink-300",
  "Business & Profession":    "bg-amber-100 text-amber-800 border-amber-300",
  "Deductions":               "bg-green-100 text-green-800 border-green-300",
  "International Tax":        "bg-sky-100 text-sky-800 border-sky-300",
  "Special Income":           "bg-cyan-100 text-cyan-800 border-cyan-300",
  "Charitable Trusts & NPOs": "bg-teal-100 text-teal-800 border-teal-300",
  "Agricultural Income":      "bg-lime-100 text-lime-800 border-lime-300",
};

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

      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search by topic, section number, or keyword… e.g. "slump sale", "buyback", "agricultural"'
          className="w-full rounded-xl border bg-background py-3 pl-10 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
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

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
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
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                isActive
                  ? CATEGORY_FILTER_ACTIVE[cat]
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
        <div className="rounded-xl border bg-muted/20 py-14 text-center">
          <BookOpen className="mx-auto mb-3 h-8 w-8 text-muted-foreground/40" />
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
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
            {DETAILED_ENTRIES.length} analyses
          </p>

          {filtered.map((entry) => (
            <Link
              key={entry.slug}
              href={`/detailed-explainer/${entry.slug}`}
              className={cn(
                "group block rounded-xl border border-l-4 bg-card p-5 transition-all",
                "hover:shadow-md hover:bg-muted/10",
                CATEGORY_ACCENT[entry.category]
              )}
            >
              {/* Top row: section + category + old section */}
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary">
                  {entry.section2025}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    CATEGORY_BADGE[entry.category]
                  )}
                >
                  {entry.category}
                </span>
                {entry.section1961 && (
                  <span className="text-xs text-muted-foreground">
                    was{" "}
                    <span className="font-medium text-foreground">{entry.section1961}</span>{" "}
                    in IT Act 1961
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="mb-1.5 text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                {entry.title}
              </h2>

              {/* Summary */}
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {entry.summary}
              </p>

              {/* CTA */}
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary opacity-70 transition-all group-hover:opacity-100">
                Read full analysis
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
