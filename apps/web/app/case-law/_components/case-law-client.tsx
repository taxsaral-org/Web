"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, Scale, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CASE_CATEGORIES } from "./case-law-data";
import type { CaseCategory, CaseIndexEntry } from "./case-law-data";

const CATEGORY_BADGE: Record<CaseCategory, string> = {
  "Capital Gains": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  "Charitable Trusts & NPOs": "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  "Transfer Pricing": "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  "International Tax": "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
  "Business & Profession": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "Assessment & Reassessment": "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  "TDS & TCS": "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  "Penalties": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "Cash Credits & Unexplained Income":
    "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300",
  "General Principles": "bg-slate-200 text-slate-800 dark:bg-slate-700/40 dark:text-slate-200",
  "Trusts, Funds & Pass-Through Vehicles":
    "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
};

const CATEGORY_ACCENT: Record<CaseCategory, string> = {
  "Capital Gains": "border-l-yellow-400",
  "Charitable Trusts & NPOs": "border-l-teal-400",
  "Transfer Pricing": "border-l-violet-400",
  "International Tax": "border-l-sky-400",
  "Business & Profession": "border-l-amber-400",
  "Assessment & Reassessment": "border-l-rose-400",
  "TDS & TCS": "border-l-pink-400",
  "Penalties": "border-l-orange-400",
  "Cash Credits & Unexplained Income": "border-l-lime-400",
  "General Principles": "border-l-slate-400",
  "Trusts, Funds & Pass-Through Vehicles": "border-l-cyan-400",
};

const CATEGORY_FILTER_ACTIVE: Record<CaseCategory, string> = {
  "Capital Gains": "bg-yellow-100 text-yellow-800 border-yellow-300",
  "Charitable Trusts & NPOs": "bg-teal-100 text-teal-800 border-teal-300",
  "Transfer Pricing": "bg-violet-100 text-violet-800 border-violet-300",
  "International Tax": "bg-sky-100 text-sky-800 border-sky-300",
  "Business & Profession": "bg-amber-100 text-amber-800 border-amber-300",
  "Assessment & Reassessment": "bg-rose-100 text-rose-800 border-rose-300",
  "TDS & TCS": "bg-pink-100 text-pink-800 border-pink-300",
  "Penalties": "bg-orange-100 text-orange-800 border-orange-300",
  "Cash Credits & Unexplained Income": "bg-lime-100 text-lime-800 border-lime-300",
  "General Principles": "bg-slate-200 text-slate-800 border-slate-400",
  "Trusts, Funds & Pass-Through Vehicles": "bg-cyan-100 text-cyan-800 border-cyan-300",
};

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
          className="w-full rounded-xl border bg-background py-3 pl-10 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
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
          <Scale className="mx-auto mb-3 h-8 w-8 text-muted-foreground/40" />
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
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
            {index.length} judgments
          </p>

          {filtered.map((c) => (
            <Link
              key={c.slug}
              href={`/case-law/${c.slug}`}
              className={cn(
                "group block rounded-xl border border-l-4 bg-card p-5 transition-all hover:shadow-md hover:bg-muted/10",
                CATEGORY_ACCENT[c.category]
              )}
            >
              {/* Badges */}
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    CATEGORY_BADGE[c.category]
                  )}
                >
                  {c.category}
                </span>
                <span className="rounded-md border px-2 py-0.5 text-xs text-muted-foreground">
                  {c.court}
                </span>
                <span className="text-xs font-medium text-muted-foreground">{c.year}</span>
              </div>

              {/* Case name + citation */}
              <h2 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                {c.caseName}
              </h2>
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">{c.citation}</p>

              {/* Section mapping */}
              <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg bg-muted/40 px-3 py-2">
                <span className="text-xs text-muted-foreground">Decided under</span>
                <span className="font-mono text-xs font-semibold text-foreground">
                  {c.section1961}
                </span>
                <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">now</span>
                <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
                  {c.section2025}
                </span>
              </div>

              {/* Held */}
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/90">
                <span className="font-semibold">Held: </span>
                {c.held}
              </p>

              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary opacity-80 transition-opacity group-hover:opacity-100">
                Read the full case
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
