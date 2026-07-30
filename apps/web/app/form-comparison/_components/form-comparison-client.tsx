"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { FORMS, FORM_CATEGORIES, type FormCategory, type FormStatus } from "./form-data";

const STATUS_STYLES: Record<FormStatus, string> = {
  "Same":          "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  "Renamed":       "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "New in 2025":   "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  "Discontinued":  "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  "Merged":        "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
};

export function FormComparisonClient() {
  const [query, setQuery]       = useState("");
  const [category, setCategory] = useState<FormCategory | "All">("All");
  const [status, setStatus]     = useState<FormStatus | "All">("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return FORMS.filter((f) => {
      const matchesCategory = category === "All" || f.category === category;
      const matchesStatus   = status   === "All" || f.status   === status;
      const matchesQuery    = !q ||
        f.oldForm.toLowerCase().includes(q) ||
        f.newForm.toLowerCase().includes(q) ||
        f.purpose.toLowerCase().includes(q) ||
        f.oldSection.toLowerCase().includes(q) ||
        f.newSection.toLowerCase().includes(q) ||
        (f.notes ?? "").toLowerCase().includes(q);
      return matchesCategory && matchesStatus && matchesQuery;
    });
  }, [query, category, status]);

  const grouped = useMemo(() => {
    const map = new Map<FormCategory, typeof filtered>();
    for (const f of filtered) {
      if (!map.has(f.category)) map.set(f.category, []);
      map.get(f.category)!.push(f);
    }
    return map;
  }, [filtered]);

  return (
    <div>
      {/* ── Filters ─────────────────────────────────────────────────── */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="search"
            placeholder="Search forms, sections, or purpose…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border bg-background py-2 pl-9 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Status filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as FormStatus | "All")}
          className="rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          <option value="All">All statuses</option>
          <option value="Same">Same</option>
          <option value="Renamed">Renamed</option>
          <option value="New in 2025">New in 2025</option>
          <option value="Discontinued">Discontinued</option>
          <option value="Merged">Merged</option>
        </select>
      </div>

      {/* ── Category tabs ────────────────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory("All")}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            category === "All"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-muted-foreground hover:text-foreground"
          }`}
        >
          All categories
        </button>
        {FORM_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              category === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Result count ─────────────────────────────────────────────── */}
      <p className="mb-5 text-xs text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {FORMS.length} forms
      </p>

      {/* ── Tables grouped by category ───────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          No forms match your filters. Try adjusting your search or category.
        </div>
      ) : (
        <div className="space-y-10">
          {FORM_CATEGORIES.filter((cat) => grouped.has(cat)).map((cat) => (
            <section key={cat}>
              <h2 className="mb-3 text-base font-bold">{cat}</h2>

              {/* Desktop table */}
              <div className="hidden overflow-hidden rounded-xl border sm:block">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/40 text-xs text-muted-foreground">
                        <th className="px-4 py-3 text-left font-semibold w-[180px]">IT Act 1961 (Old)</th>
                        <th className="px-4 py-3 text-left font-semibold w-[180px]">IT Act 2025 (New)</th>
                        <th className="px-4 py-3 text-left font-semibold">Purpose</th>
                        <th className="px-4 py-3 text-left font-semibold w-[100px]">Status</th>
                        <th className="px-4 py-3 text-left font-semibold w-[130px]">Old Section</th>
                        <th className="px-4 py-3 text-left font-semibold w-[130px]">New Section</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grouped.get(cat)!.map((f, i) => (
                        <tr
                          key={i}
                          className="border-b last:border-0 hover:bg-muted/20 transition-colors"
                        >
                          <td className="px-4 py-3 font-medium">{f.oldForm}</td>
                          <td className="px-4 py-3 font-medium">{f.newForm}</td>
                          <td className="px-4 py-3 text-muted-foreground leading-snug">
                            {f.purpose}
                            {f.notes && (
                              <p className="mt-1 text-xs italic text-muted-foreground/70">{f.notes}</p>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[f.status]}`}>
                              {f.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{f.oldSection}</td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{f.newSection}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile cards */}
              <div className="space-y-3 sm:hidden">
                {grouped.get(cat)!.map((f, i) => (
                  <div key={i} className="rounded-xl border bg-card p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Old: <span className="font-semibold text-foreground">{f.oldForm}</span></p>
                        <p className="text-xs text-muted-foreground">New: <span className="font-semibold text-foreground">{f.newForm}</span></p>
                      </div>
                      <span className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[f.status]}`}>
                        {f.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-snug mb-2">{f.purpose}</p>
                    {f.notes && (
                      <p className="text-xs italic text-muted-foreground/70 mb-2">{f.notes}</p>
                    )}
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span><span className="font-medium text-foreground">Old §</span> {f.oldSection}</span>
                      <span><span className="font-medium text-foreground">New §</span> {f.newSection}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
