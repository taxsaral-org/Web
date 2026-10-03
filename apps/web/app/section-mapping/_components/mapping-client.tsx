"use client";

import { useState, useMemo } from "react";
import { Search, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MAPPINGS,
  CATEGORIES,
  QUICK_FILTERS,
  CHAPTER_TITLES,
  PART_TITLES,
  oldRefs,
  type MappingCategory,
  type SectionMap,
} from "./mapping-data";

const CATEGORY_COLORS: Record<MappingCategory, string> = {
  "Preliminary":              "bg-slate-100 text-slate-700",
  "Basis of Charge":          "bg-blue-100 text-blue-700",
  "Incomes Excluded":         "bg-green-100 text-green-700",
  "Heads of Income":          "bg-purple-100 text-purple-700",
  "Salaries":                 "bg-indigo-100 text-indigo-700",
  "House Property":           "bg-orange-100 text-orange-700",
  "Business & Profession":    "bg-amber-100 text-amber-700",
  "Capital Gains":            "bg-yellow-100 text-yellow-700",
  "Other Sources":            "bg-cyan-100 text-cyan-700",
  "Clubbing of Income":       "bg-fuchsia-100 text-fuchsia-700",
  "Aggregation":              "bg-rose-100 text-rose-700",
  "Set-off & Losses":         "bg-red-100 text-red-700",
  "Deductions":               "bg-emerald-100 text-emerald-700",
  "Rebates & Reliefs":        "bg-teal-100 text-teal-700",
  "Transfer Pricing":         "bg-blue-200 text-blue-800",
  "Anti-Avoidance":           "bg-purple-200 text-purple-800",
  "Mode of Payment":          "bg-stone-100 text-stone-700",
  "Special Tax Rates":        "bg-violet-100 text-violet-700",
  "NRI Provisions":           "bg-sky-200 text-sky-800",
  "Pass-through Entities":    "bg-teal-200 text-teal-800",
  "Tonnage Tax":              "bg-cyan-200 text-cyan-800",
  "Tax Authorities":          "bg-gray-100 text-gray-700",
  "Powers, Survey & Search":  "bg-orange-200 text-orange-800",
  "Return Filing":            "bg-sky-100 text-sky-700",
  "Assessment":               "bg-indigo-200 text-indigo-800",
  "Firms, AOPs & HUFs":       "bg-lime-200 text-lime-800",
  "Non-Profit Organisations": "bg-emerald-200 text-emerald-800",
  "Appeals, Revision & ADR":  "bg-zinc-100 text-zinc-700",
  "Collection & Recovery":    "bg-red-200 text-red-800",
  "TDS & TCS":                "bg-pink-100 text-pink-700",
  "Advance Tax":              "bg-lime-100 text-lime-700",
  "Interest & Fees":          "bg-amber-200 text-amber-800",
  "Refunds":                  "bg-green-200 text-green-800",
  "Penalties":                "bg-pink-200 text-pink-800",
  "Prosecution":              "bg-rose-200 text-rose-800",
  "Miscellaneous":            "bg-slate-200 text-slate-700",
};

/** Lower-case, without spaces or hyphens, so "80-IAC" finds "80IAC" and vice versa. */
const squash = (s: string) => s.toLowerCase().replace(/[\s\-–—]/g, "");

/** Lists longer than this are collapsed behind a "+n more" toggle. */
const LONG_LIST = 8;

function chapterLabel(m: SectionMap) {
  return m.part ? `Ch. ${m.chapter}-${m.part}` : `Ch. ${m.chapter}`;
}

function chapterTitle(m: SectionMap) {
  const chapter = `Chapter ${m.chapter}: ${CHAPTER_TITLES[m.chapter] ?? ""}`;
  const part = m.part ? PART_TITLES[`${m.chapter}-${m.part}`] : undefined;
  return part ? `${chapter} — Part ${m.part}: ${part}` : chapter;
}

function OldSection({ m }: { m: SectionMap }) {
  if (m.old === "—") {
    return <span className="italic">New provision</span>;
  }
  const refs = m.old.split(", ");
  const group = m.groupRef ? (
    <span
      className="ml-1 rounded bg-muted px-1 py-px font-sans text-[10px] uppercase tracking-wide"
      title="ICAI maps this group of sections together to these 1961 provisions"
    >
      group
    </span>
  ) : null;
  if (refs.length <= LONG_LIST) {
    return <>Sec. {m.old}{group}</>;
  }
  return (
    <details>
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        Sec. {refs.slice(0, 6).join(", ")}{" "}
        <span className="font-sans font-medium text-primary">+{refs.length - 6} more</span>
      </summary>
      <span>{refs.slice(6).join(", ")}</span>
      {group}
    </details>
  );
}

export function MappingClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<MappingCategory | "All">("All");
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const raw = query.trim().replace(/^(section|sec\.?|s\.)\s*/i, "");
    const q = squash(raw);
    const qfSections = activeQuickFilter && QUICK_FILTERS[activeQuickFilter]
      ? new Set(QUICK_FILTERS[activeQuickFilter]!.sections)
      : null;
    const rows = MAPPINGS.filter((m) => {
      const matchesCategory = activeCategory === "All" || m.category === activeCategory;
      if (!matchesCategory) return false;
      if (qfSections && !qfSections.has(m.new)) return false;
      if (!q) return true;
      return (
        squash(m.old).includes(q) ||
        squash(m.new).includes(q) ||
        squash(m.topic).includes(q) ||
        squash(m.category).includes(q)
      );
    });
    if (!q) return rows;
    // Exact section matches (old or new) first; otherwise keep the Act's order.
    const exact = (m: SectionMap) =>
      squash(m.new) === q || oldRefs(m.old).some((r) => squash(r) === q);
    return [...rows.filter(exact), ...rows.filter((m) => !exact(m))];
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
      <div className="mb-4 rounded-xl border bg-muted/30 px-4 py-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Quick Filters
        </p>
        <div className="flex gap-1.5 flex-wrap">
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
        {MAPPINGS.length} sections
        {activeQuickFilter && QUICK_FILTERS[activeQuickFilter] && (
          <> — <span className="font-semibold text-emerald-700 dark:text-emerald-400">{QUICK_FILTERS[activeQuickFilter]!.label}</span></>
        )}
        {activeCategory !== "All" && (
          <> in <span className="font-semibold text-foreground">{activeCategory}</span></>
        )}
      </p>

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
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground w-28">
                    2025 Act
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Section heading
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground w-44">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((m) => (
                  <tr key={m.new} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground w-48 max-w-[12rem] break-words">
                      <OldSection m={m} />
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
                      <span className="mt-1 block text-[11px] text-muted-foreground" title={chapterTitle(m)}>
                        {chapterLabel(m)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden space-y-2">
            {filtered.map((m) => (
              <div key={m.new} className="rounded-xl border bg-card p-4">
                <div className="mb-2 flex items-start gap-2">
                  <span className="min-w-0 break-words font-mono text-xs text-muted-foreground">
                    <OldSection m={m} />
                  </span>
                  <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
                  <span className="shrink-0 font-mono text-xs font-semibold text-primary">Sec. {m.new}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{m.topic}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", CATEGORY_COLORS[m.category])}>
                    {m.category}
                  </span>
                  <span className="text-[11px] text-muted-foreground" title={chapterTitle(m)}>
                    {chapterLabel(m)}
                  </span>
                </div>
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
