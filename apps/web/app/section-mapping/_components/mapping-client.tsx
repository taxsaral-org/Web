"use client";

import { useState, useMemo, useEffect } from "react";
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

const AMENDMENT_LABEL: Record<NonNullable<SectionMap["amended"]>, string> = {
  substituted: "Substituted",
  inserted: "Inserted",
  heading: "Heading amended",
  omitted: "Omitted",
};

/** The section heading, with a note where the Finance Act, 2026 changed it. */
function Topic({ m }: { m: SectionMap }) {
  return (
    <>
      <span className={cn(m.amended === "omitted" && "text-muted-foreground line-through")}>{m.topic}</span>
      {m.amended && (
        <span
          className="ml-2 inline-block whitespace-nowrap rounded bg-amber-100 px-1.5 py-px align-middle text-[10px] font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
          title={m.asEnacted ? `Heading as enacted: ${m.asEnacted}` : "Finance Act, 2026"}
        >
          {AMENDMENT_LABEL[m.amended]} · Finance Act 2026
        </span>
      )}
    </>
  );
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
  // Set when the visitor arrives from the homepage lookup, which asks for an
  // old (1961) section: matches on the old number are then listed first.
  const [preferOld, setPreferOld] = useState(false);

  // The homepage lookup links here as /section-mapping?q=80C&by=old.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) setQuery(q);
    if (params.get("by") === "old") setPreferOld(true);
  }, []);

  const { rows: filtered, fellBackTo } = useMemo(() => {
    const raw = query.trim().replace(/^(section|sec\.?|s\.)\s*/i, "");
    const q = squash(raw);
    // Sub-sections are mapped at section level ("143(3)" is listed under 143),
    // so a sub-section with no entry of its own falls back to its section.
    const base = q.replace(/\(.*$/, "");
    const qfSections = activeQuickFilter && QUICK_FILTERS[activeQuickFilter]
      ? new Set(QUICK_FILTERS[activeQuickFilter]!.sections)
      : null;
    const inScope = MAPPINGS.filter((m) => {
      const matchesCategory = activeCategory === "All" || m.category === activeCategory;
      if (!matchesCategory) return false;
      if (qfSections && !qfSections.has(m.new)) return false;
      return true;
    });
    if (!q) return { rows: inScope, fellBackTo: null };

    const textMatch = (m: SectionMap, s: string) =>
      squash(m.old).includes(s) ||
      squash(m.new).includes(s) ||
      squash(m.topic).includes(s) ||
      (m.asEnacted !== undefined && squash(m.asEnacted).includes(s)) ||
      squash(m.category).includes(s);
    let rows = inScope.filter((m) => textMatch(m, q));
    let key = q;
    let fell: string | null = null;
    if (rows.length === 0 && base && base !== q) {
      key = base;
      fell = base.toUpperCase();
      rows = inScope.filter((m) => squash(m.new) === base || oldRefs(m.old).some((r) => squash(r) === base));
    }

    // Exact section matches first (old-number matches first when asked for);
    // otherwise keep the Act's order.
    const exactOld = (m: SectionMap) => oldRefs(m.old).some((r) => squash(r) === key);
    const exactNew = (m: SectionMap) => squash(m.new) === key;
    const rank = (m: SectionMap) =>
      preferOld
        ? exactOld(m) ? 0 : exactNew(m) ? 1 : 2
        : exactOld(m) || exactNew(m) ? 0 : 2;
    return { rows: [...rows].sort((a, b) => rank(a) - rank(b)), fellBackTo: fell };
  }, [query, activeCategory, activeQuickFilter, preferOld]);

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
          className="w-full rounded-md border bg-card pl-9 pr-9 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
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

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 border-b pb-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-sm text-muted-foreground">Situations</span>
          {Object.entries(QUICK_FILTERS).map(([key, { label, description }]) => (
            <button
              key={key}
              type="button"
              title={description}
              aria-pressed={activeQuickFilter === key}
              onClick={() => setActiveQuickFilter(activeQuickFilter === key ? null : key)}
              className={cn(
                "rounded-md border px-2.5 py-1 text-xs transition-colors",
                activeQuickFilter === key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:border-foreground/30"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
          Category
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value as MappingCategory | "All")}
            className="rounded-md border bg-card px-2 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
          >
            <option value="All">All categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Results count */}
      <p className="mb-3 text-xs text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
        {MAPPINGS.length} entries
        {activeQuickFilter && QUICK_FILTERS[activeQuickFilter] && (
          <> for <span className="font-semibold text-foreground">{QUICK_FILTERS[activeQuickFilter]!.label}</span></>
        )}
        {activeCategory !== "All" && (
          <> in <span className="font-semibold text-foreground">{activeCategory}</span></>
        )}
        {fellBackTo && (
          <>. Sub-sections are mapped at section level, so these are the entries for section{" "}
            <span className="font-semibold text-foreground">{fellBackTo}</span></>
        )}
      </p>

      {filtered.length > 0 ? (
        <>
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto rounded-md border bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground w-48 max-w-[12rem]">
                    1961 Act
                  </th>
                  <th className="px-2 py-3 text-center w-8" aria-hidden />
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground w-28">
                    2025 Act
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                    Section heading
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground w-44">
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
                      <Topic m={m} />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-foreground/80">{m.category}</span>
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
          <div className="sm:hidden divide-y border-y">
            {filtered.map((m) => (
              <div key={m.new} className="py-4">
                <div className="mb-2 flex items-start gap-2">
                  <span className="min-w-0 break-words font-mono text-xs text-muted-foreground">
                    <OldSection m={m} />
                  </span>
                  <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
                  <span className="shrink-0 font-mono text-xs font-semibold text-primary">Sec. {m.new}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed"><Topic m={m} /></p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{m.category} ·</span>
                  <span className="text-[11px] text-muted-foreground" title={chapterTitle(m)}>
                    {chapterLabel(m)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="border-y py-12 text-center">
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
