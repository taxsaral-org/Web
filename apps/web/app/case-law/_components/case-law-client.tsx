"use client";

import { useState, useMemo } from "react";
import { Search, X, Scale, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CASE_LAWS, CASE_CATEGORIES } from "./case-law-data";
import type { CaseCategory } from "./case-law-data";

const CATEGORY_BADGE: Record<CaseCategory, string> = {
  "Capital Gains": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  "Charitable Trusts & NPOs": "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  "Transfer Pricing": "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  "International Tax": "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
  "Business & Profession": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "Assessment & Reassessment": "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  "TDS & TCS": "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
};

const CATEGORY_ACCENT: Record<CaseCategory, string> = {
  "Capital Gains": "border-l-yellow-400",
  "Charitable Trusts & NPOs": "border-l-teal-400",
  "Transfer Pricing": "border-l-violet-400",
  "International Tax": "border-l-sky-400",
  "Business & Profession": "border-l-amber-400",
  "Assessment & Reassessment": "border-l-rose-400",
  "TDS & TCS": "border-l-pink-400",
};

const CATEGORY_FILTER_ACTIVE: Record<CaseCategory, string> = {
  "Capital Gains": "bg-yellow-100 text-yellow-800 border-yellow-300",
  "Charitable Trusts & NPOs": "bg-teal-100 text-teal-800 border-teal-300",
  "Transfer Pricing": "bg-violet-100 text-violet-800 border-violet-300",
  "International Tax": "bg-sky-100 text-sky-800 border-sky-300",
  "Business & Profession": "bg-amber-100 text-amber-800 border-amber-300",
  "Assessment & Reassessment": "bg-rose-100 text-rose-800 border-rose-300",
  "TDS & TCS": "bg-pink-100 text-pink-800 border-pink-300",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function CaseLawClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CaseCategory | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return CASE_LAWS.filter((c) => {
      if (activeCategory && c.category !== activeCategory) return false;
      if (!q) return true;
      return (
        c.caseName.toLowerCase().includes(q) ||
        c.citation.toLowerCase().includes(q) ||
        c.issue.toLowerCase().includes(q) ||
        c.held.toLowerCase().includes(q) ||
        c.facts.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.principles.some((p) => p.toLowerCase().includes(q)) ||
        c.section1961.toLowerCase().includes(q) ||
        c.section2025.toLowerCase().includes(q) ||
        c.sectionTopic.toLowerCase().includes(q) ||
        String(c.year).includes(q) ||
        c.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }).sort((a, b) => b.year - a.year);
  }, [query, activeCategory]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search case name, section, or issue… e.g. "goodwill", "Section 346", "general public utility"'
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
          All ({CASE_LAWS.length})
        </button>
        {CASE_CATEGORIES.map((cat) => {
          const count = CASE_LAWS.filter((c) => c.category === cat).length;
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
            {CASE_LAWS.length} judgments
          </p>

          {filtered.map((c) => {
            const isOpen = expanded === c.slug;
            return (
              <div
                key={c.slug}
                id={c.slug}
                className={cn(
                  "rounded-xl border border-l-4 bg-card transition-all scroll-mt-20",
                  CATEGORY_ACCENT[c.category],
                  isOpen ? "shadow-md" : "hover:shadow-md hover:bg-muted/10"
                )}
              >
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : c.slug)}
                  aria-expanded={isOpen}
                  className="w-full p-5 text-left"
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
                  <h2 className="text-base font-semibold leading-snug text-foreground">
                    {c.caseName}
                  </h2>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">{c.citation}</p>

                  {/* Section mapping — the headline feature */}
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

                  {/* Held — always visible */}
                  <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                    <span className="font-semibold">Held: </span>
                    {c.held}
                  </p>

                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary">
                    {isOpen ? "Show less" : "Read full summary"}
                    <ChevronDown
                      className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")}
                    />
                  </div>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="space-y-5 border-t px-5 pb-5 pt-4">
                    <Section title="Issue before the court">
                      <p className="text-sm leading-relaxed text-foreground/90">{c.issue}</p>
                    </Section>

                    <Section title="Facts">
                      <p className="text-sm leading-relaxed text-foreground/90">{c.facts}</p>
                    </Section>

                    {c.proceduralHistory && (
                      <Section title="How the matter reached the court">
                        <p className="text-sm leading-relaxed text-foreground/90">
                          {c.proceduralHistory}
                        </p>
                      </Section>
                    )}

                    {c.contentions && (
                      <Section title="Arguments">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-4 py-3 dark:border-emerald-900 dark:bg-emerald-950/20">
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                              For the assessee
                            </p>
                            <p className="text-sm leading-relaxed text-foreground/90">
                              {c.contentions.assessee}
                            </p>
                          </div>
                          <div className="rounded-lg border border-rose-200 bg-rose-50/60 px-4 py-3 dark:border-rose-900 dark:bg-rose-950/20">
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                              For the Revenue
                            </p>
                            <p className="text-sm leading-relaxed text-foreground/90">
                              {c.contentions.revenue}
                            </p>
                          </div>
                        </div>
                      </Section>
                    )}

                    <Section title="The court's reasoning">
                      <p className="text-sm leading-relaxed text-foreground/90">{c.summary}</p>
                    </Section>

                    <Section title="Principles established">
                      <ul className="space-y-2">
                        {c.principles.map((p, i) => (
                          <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground/90">
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </Section>

                    <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-800 dark:bg-blue-950/30">
                      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                        Position under the IT Act 2025
                      </h3>
                      <p className="text-sm leading-relaxed text-blue-900 dark:text-blue-100">
                        {c.relevance}
                      </p>
                      <p className="mt-2 text-xs text-blue-800/80 dark:text-blue-200/80">
                        <span className="font-semibold">{c.section2025}</span> — {c.sectionTopic}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {c.keywords.map((k) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => { setQuery(k); setExpanded(null); }}
                          className="rounded-full border bg-muted/30 px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
