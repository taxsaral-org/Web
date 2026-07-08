"use client";

import { useState, useMemo } from "react";
import { Search, X, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DETAILED_ENTRIES, DETAILED_CATEGORIES } from "./detailed-data";
import type { DetailedCategory } from "./detailed-data";

const CATEGORY_COLORS: Record<DetailedCategory, string> = {
  "Capital Gains":          "bg-yellow-100 text-yellow-800",
  "Corporate Tax":          "bg-violet-100 text-violet-800",
  "TDS & TCS":              "bg-pink-100 text-pink-800",
  "Business & Profession":  "bg-amber-100 text-amber-800",
  "Deductions":             "bg-green-100 text-green-800",
  "International Tax":      "bg-sky-100 text-sky-800",
  "Special Income":         "bg-cyan-100 text-cyan-800",
  "Charitable Trusts & NPOs": "bg-teal-100 text-teal-800",
};

export function DetailedListingClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<DetailedCategory | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return DETAILED_ENTRIES.filter((e) => {
      const matchesCategory = !activeCategory || e.category === activeCategory;
      if (!matchesCategory) return false;
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

  return (
    <div className="space-y-6">

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search by topic, section number, or keyword… e.g. "buyback", "ESOP", "80G"'
          className="w-full rounded-xl border bg-background pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
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
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-colors",
            !activeCategory
              ? "bg-primary text-primary-foreground"
              : "border hover:bg-muted text-muted-foreground"
          )}
        >
          All ({DETAILED_ENTRIES.length})
        </button>
        {DETAILED_CATEGORIES.filter((cat) =>
          DETAILED_ENTRIES.some((e) => e.category === cat)
        ).map((cat) => {
          const count = DETAILED_ENTRIES.filter((e) => e.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "border hover:bg-muted text-muted-foreground"
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
              className="group block rounded-xl border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-sm"
            >
              <div className="mb-2.5 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary">
                  {entry.section2025}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    CATEGORY_COLORS[entry.category]
                  )}
                >
                  {entry.category}
                </span>
                {entry.section1961 && (
                  <span className="text-xs text-muted-foreground">
                    was{" "}
                    <span className="font-medium text-foreground">
                      {entry.section1961}
                    </span>{" "}
                    in IT Act 1961
                  </span>
                )}
              </div>
              <h2 className="mb-1.5 text-base font-semibold leading-snug group-hover:text-primary transition-colors">
                {entry.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {entry.summary}
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
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
