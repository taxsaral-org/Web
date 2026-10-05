"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CASE_CATEGORIES } from "./case-law-data";
import type { CaseCategory, CaseIndexEntry } from "./case-law-data";

export function CaseLawClient({ index }: { index: CaseIndexEntry[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CaseCategory | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return index
      .filter((c) => {
        if (activeCategory && c.category !== activeCategory) return false;
        if (!q) return true;
        return (
          c.caseName.toLowerCase().includes(q) ||
          c.citation.toLowerCase().includes(q) ||
          c.held.toLowerCase().includes(q) ||
          c.section1961.toLowerCase().includes(q) ||
          c.section2025.toLowerCase().includes(q) ||
          c.court.toLowerCase().includes(q) ||
          String(c.year).includes(q) ||
          c.keywords.some((k) => k.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => b.year - a.year);
  }, [index, query, activeCategory]);

  const visibleCategories = CASE_CATEGORIES.filter((cat) =>
    index.some((c) => c.category === cat)
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
          placeholder='Search case name, section, or issue… e.g. "goodwill", "Section 346", "permanent establishment"'
          className="w-full rounded-md border bg-background py-3 pl-10 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
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
          All ({index.length})
        </button>
        {visibleCategories.map((cat) => {
          const count = index.filter((c) => c.category === cat).length;
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
            No judgments match{" "}
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
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
            {index.length} judgments
          </p>

          <div className="divide-y border-y">
            {filtered.map((c) => (
              <Link key={c.slug} href={`/case-law/${c.slug}`} className="group block py-6">
                <p className="text-xs text-muted-foreground">
                  {c.category} · {c.court} · {c.year}
                </p>
                <h2 className="mt-1.5 text-lg font-semibold leading-snug text-foreground group-hover:text-primary group-hover:underline underline-offset-4 decoration-1">
                  {c.caseName}
                </h2>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{c.citation}</p>

                <p className="mt-3 text-sm text-muted-foreground">
                  Decided under <span className="font-medium text-foreground">{c.section1961}</span>
                  {" "}&rarr; now{" "}
                  <span className="font-medium text-primary">{c.section2025}</span>
                </p>

                <p className="mt-2 line-clamp-3 max-w-3xl text-[15px] leading-relaxed text-foreground/85">
                  <span className="font-semibold">Held: </span>
                  {c.held}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
