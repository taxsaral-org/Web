"use client";

import { useState, useMemo } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SECTIONS, CATEGORIES } from "./sections-data";
import type { Category } from "./sections-data";

const CATEGORY_COLORS: Record<Category, string> = {
  "Residential Status": "bg-blue-100 text-blue-800",
  "Income Heads":       "bg-purple-100 text-purple-800",
  "House Property":     "bg-orange-100 text-orange-800",
  "Deductions":         "bg-green-100 text-green-800",
  "Tax Computation":    "bg-primary/10 text-primary",
  "Capital Gains":      "bg-yellow-100 text-yellow-800",
  "TDS":                "bg-pink-100 text-pink-800",
  "Advance Tax":        "bg-amber-100 text-amber-800",
  "Interest & Penalties": "bg-red-100 text-red-800",
  "Special Income":     "bg-cyan-100 text-cyan-800",
};

export function ExplainerClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return SECTIONS.filter(s => {
      const matchesCategory = !activeCategory || s.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        s.section2025.toLowerCase().includes(q) ||
        s.section1961.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        s.explanation.toLowerCase().includes(q) ||
        s.keywords.some(k => k.toLowerCase().includes(q))
      );
    });
  }, [query, activeCategory]);

  return (
    <div className="space-y-6">

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={'Search by section number, keyword, or topic… e.g. "80C", "HRA", "advance tax", "crypto"'}
          className="w-full rounded-xl border bg-background pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
          autoFocus
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
          All ({SECTIONS.length})
        </button>
        {CATEGORIES.map(cat => {
          const count = SECTIONS.filter(s => s.category === cat).length;
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

      {/* Results count */}
      <p className="text-xs text-muted-foreground">
        {filtered.length === SECTIONS.length
          ? `Showing all ${SECTIONS.length} sections`
          : `${filtered.length} of ${SECTIONS.length} sections match`}
        {query && <> for &ldquo;<strong className="text-foreground">{query}</strong>&rdquo;</>}
      </p>

      {/* Section cards */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border bg-muted/20 py-16 text-center">
          <p className="text-sm font-medium">No sections found</p>
          <p className="mt-1 text-xs text-muted-foreground">Try a different keyword or section number</p>
          <button
            type="button"
            onClick={() => { setQuery(""); setActiveCategory(null); }}
            className="mt-4 text-xs text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((s, i) => (
            <div key={i} className="rounded-xl border bg-card p-5 hover:border-primary/30 transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 text-sm font-mono font-semibold text-primary">
                    {s.section2025}
                  </span>
                  {s.section1961 && (
                    <span className="text-xs text-muted-foreground">
                      was <span className="font-medium text-foreground">{s.section1961}</span> in IT Act 1961
                    </span>
                  )}
                </div>
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium shrink-0", CATEGORY_COLORS[s.category])}>
                  {s.category}
                </span>
              </div>
              <p className="font-semibold text-sm mb-1.5">{s.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.explanation}</p>
            </div>
          ))}
        </div>
      )}

      {/* Footer CTA */}
      <div className="rounded-xl border bg-muted/30 p-5 text-center">
        <p className="text-sm font-medium mb-1">Have a question about a specific section?</p>
        <p className="text-xs text-muted-foreground mb-3">
          Our tax team can explain how a provision applies to your situation.
        </p>
        <Link
          href="/ask"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Ask our tax team
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
