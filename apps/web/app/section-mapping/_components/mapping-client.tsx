"use client";

import { useState, useMemo } from "react";
import { Search, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MAPPINGS, CATEGORIES, QUICK_FILTERS, type MappingCategory } from "./mapping-data";

const CATEGORY_COLORS: Record<MappingCategory, string> = {
  "Preliminary":            "bg-slate-100 text-slate-700",
  "Basis of Charge":        "bg-blue-100 text-blue-700",
  "Incomes Excluded":       "bg-green-100 text-green-700",
  "Heads of Income":        "bg-purple-100 text-purple-700",
  "Salaries":               "bg-indigo-100 text-indigo-700",
  "House Property":         "bg-orange-100 text-orange-700",
  "Business & Profession":  "bg-amber-100 text-amber-700",
  "Capital Gains":          "bg-yellow-100 text-yellow-700",
  "Other Sources":          "bg-cyan-100 text-cyan-700",
  "Clubbing of Income":     "bg-fuchsia-100 text-fuchsia-700",
  "Aggregation":            "bg-rose-100 text-rose-700",
  "Set-off & Losses":       "bg-red-100 text-red-700",
  "Deductions":             "bg-emerald-100 text-emerald-700",
  "Rebates & Reliefs":      "bg-teal-100 text-teal-700",
  "Transfer Pricing":       "bg-blue-200 text-blue-800",
  "Special Tax Rates":      "bg-violet-100 text-violet-700",
  "NRI Provisions":         "bg-sky-200 text-sky-800",
  "Survey & Search":        "bg-orange-200 text-orange-800",
  "TDS & TCS":              "bg-pink-100 text-pink-700",
  "Advance Tax":            "bg-lime-100 text-lime-700",
  "Return Filing":          "bg-sky-100 text-sky-700",
  "Assessment":             "bg-indigo-200 text-indigo-800",
  "Collection & Recovery":  "bg-red-200 text-red-800",
  "Refunds":                "bg-green-200 text-green-800",
  "Interest & Fees":        "bg-amber-200 text-amber-800",
  "Penalties":              "bg-red-100 text-red-700",
  "Prosecution":            "bg-rose-200 text-rose-800",
  "Appeals & Revision":     "bg-zinc-100 text-zinc-700",
  "Miscellaneous":          "bg-slate-200 text-slate-700",
};

export function MappingClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<MappingCategory | "All">("All");
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const qfSections = activeQuickFilter && QUICK_FILTERS[activeQuickFilter]
      ? new Set(QUICK_FILTERS[activeQuickFilter]!.sections)
      : null;
    return MAPPINGS.filter((m) => {
      const matchesCategory = activeCategory === "All" || m.category === activeCategory;
      if (!matchesCategory) return false;
      if (qfSections && !qfSections.has(m.new)) return false;
      if (!q) return true;
      return (
        m.old.toLowerCase().includes(q) ||
        m.new.toLowerCase().includes(q) ||
        m.topic.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory, activeQuickFilter]);

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search by 1961 section, 2025 section, or topic…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border bg-background pl-9 pr-9 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Quick filters */}
      <div className="mb-3 flex gap-2 flex-wrap items-center">
        <span className="text-xs font-medium text-muted-foreground">Quick filter:</span>
        {Object.entries(QUICK_FILTERS).map(([key, { label, description }]) => (
          <button
            key={key}
            type="button"
            title={description}
            onClick={() => setActiveQuickFilter(activeQuickFilter === key ? null : key)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              activeQuickFilter === key
                ? "bg-emerald-600 text-white border-emerald-600"
                : "border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:border-emerald-700 dark:text-emerald-400 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Category filters */}
      <div className="mb-4 flex gap-1.5 flex-wrap">
        <button
          type="button"
          onClick={() => setActiveCategory("All")}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            activeCategory === "All"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-muted-foreground hover:bg-muted"
          )}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(activeCategory === cat ? "All" : cat)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground hover:bg-muted"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="mb-3 text-xs text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
        {MAPPINGS.length} section mappings
        {activeQuickFilter && QUICK_FILTERS[activeQuickFilter] && (
          <> — <span className="font-semibold text-emerald-700 dark:text-emerald-400">{QUICK_FILTERS[activeQuickFilter]!.label}</span></>
        )}
        {activeCategory !== "All" && (
          <> in <span className="font-semibold text-foreground">{activeCategory}</span></>
        )}
      </p>

      {/* Table — desktop */}
      {filtered.length > 0 ? (
        <>
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground w-48 max-w-[12rem]">
                    1961 Act
                  </th>
                  <th className="px-2 py-3 text-center w-8" aria-hidden />
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground w-36">
                    2025 Act
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Topic
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground w-40">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((m, i) => (
                  <tr key={i} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground w-48 max-w-[12rem] break-words">
                      Sec. {m.old}
                    </td>
                    <td className="px-2 py-3 text-center text-muted-foreground" aria-hidden>
                      <ArrowRight className="h-3 w-3 inline-block" />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-primary whitespace-nowrap">
                      Sec. {m.new}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground leading-relaxed">
                      {m.topic}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap", CATEGORY_COLORS[m.category])}>
                        {m.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden space-y-2">
            {filtered.map((m, i) => (
              <div key={i} className="rounded-xl border bg-card p-4">
                <div className="mb-2 flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs text-muted-foreground">Sec. {m.old}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <span className="font-mono text-xs font-semibold text-primary">Sec. {m.new}</span>
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium ml-auto", CATEGORY_COLORS[m.category])}>
                    {m.category}
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{m.topic}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-xl border bg-muted/20 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            No sections match <span className="font-medium text-foreground">&ldquo;{query}&rdquo;</span>.
          </p>
          <button
            type="button"
            onClick={() => { setQuery(""); setActiveCategory("All"); setActiveQuickFilter(null); }}
            className="mt-2 text-xs text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
