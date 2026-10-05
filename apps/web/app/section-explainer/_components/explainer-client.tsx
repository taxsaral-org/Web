"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SECTIONS, CATEGORIES } from "./sections-data";
import type { Category } from "./sections-data";

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
          className="w-full rounded-md border bg-card pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
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
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={cn(
            "shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-colors",
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
                "shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-colors",
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
        <div className="border-y py-16 text-center">
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
        <div className="divide-y border-y">
          {filtered.map((s, i) => (
            <Link
              key={i}
              href={`/section-explainer/${s.slug}`}
              className="group grid gap-x-6 gap-y-1 py-5 sm:grid-cols-[8.5rem_1fr]"
            >
              <div>
                <p className="font-mono text-sm font-medium text-primary">{s.section2025}</p>
                {s.section1961 && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    was <span className="font-mono">{s.section1961}</span>
                  </p>
                )}
              </div>
              <div>
                <h2 className="text-base font-semibold leading-snug group-hover:text-primary group-hover:underline underline-offset-4 decoration-1">
                  {s.title}
                </h2>
                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">{s.explanation}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{s.category}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Footer CTA */}
      <p className="text-sm text-muted-foreground">
        Want to know how a provision applies to your own situation?{" "}
        <Link href="/ask" className="text-primary underline underline-offset-4">
          Ask a question
        </Link>
        .
      </p>
    </div>
  );
}
