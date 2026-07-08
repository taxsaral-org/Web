"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, FileText, BookOpen, Calculator, ArrowRight } from "lucide-react";
import { SECTIONS } from "@/app/section-explainer/_components/sections-data";
import { DETAILED_ENTRIES } from "@/app/detailed-explainer/_components/detailed-data";
import { cn } from "@/lib/utils";

const CALC_DATA = [
  { title: "Regime Optimizer",     href: "/calculators/regime-optimizer",      badge: "Section 202",     desc: "Compare default vs optional tax regime" },
  { title: "HRA Exemption",        href: "/calculators/hra",                   badge: "Schedule III",    desc: "House Rent Allowance exemption calculator" },
  { title: "House Property Income",href: "/calculators/house-property-income",  badge: "Sections 20–25", desc: "Rental income and loan interest deductions" },
  { title: "Multiple Employer",    href: "/calculators/multiple-employer",      badge: "Section 392",    desc: "Form 12B & TDS reconciliation" },
  { title: "Advance Tax",          href: "/calculators/advance-tax",            badge: "Section 425",    desc: "Quarterly advance tax instalments" },
  { title: "Residential Status",   href: "/calculators/residential-status",     badge: "Section 6",      desc: "ROR, RNOR or Non-Resident determination" },
];

type ResultItem = {
  type: "detailed" | "section" | "calculator";
  title: string;
  href: string;
  description: string;
  badge: string;
};

function runSearch(query: string): ResultItem[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];

  const all: ResultItem[] = [];

  for (const e of DETAILED_ENTRIES) {
    if (
      e.title.toLowerCase().includes(q) ||
      e.section2025.toLowerCase().includes(q) ||
      e.section1961.toLowerCase().includes(q) ||
      e.summary.toLowerCase().includes(q) ||
      e.keywords.some(k => k.toLowerCase().includes(q))
    ) {
      all.push({
        type: "detailed",
        title: e.title,
        href: `/detailed-explainer/${e.slug}`,
        description: e.summary.slice(0, 95),
        badge: e.section2025,
      });
    }
  }

  let sectionCount = 0;
  for (const s of SECTIONS) {
    if (sectionCount >= 7) break;
    if (
      s.title.toLowerCase().includes(q) ||
      s.section2025.toLowerCase().includes(q) ||
      s.section1961.toLowerCase().includes(q) ||
      s.explanation.toLowerCase().includes(q) ||
      s.keywords.some(k => k.toLowerCase().includes(q))
    ) {
      all.push({
        type: "section",
        title: s.title,
        href: `/section-explainer/${s.slug}`,
        description: s.explanation.slice(0, 95),
        badge: s.section2025,
      });
      sectionCount++;
    }
  }

  for (const c of CALC_DATA) {
    if (
      c.title.toLowerCase().includes(q) ||
      c.badge.toLowerCase().includes(q) ||
      c.desc.toLowerCase().includes(q)
    ) {
      all.push({
        type: "calculator",
        title: c.title,
        href: c.href,
        description: c.desc,
        badge: c.badge,
      });
    }
  }

  return all;
}

const TYPE_META = {
  detailed:   { label: "Detailed Explainers", Icon: BookOpen,   color: "text-yellow-600" },
  section:    { label: "Section Explainers",  Icon: FileText,   color: "text-blue-600"   },
  calculator: { label: "Calculators",          Icon: Calculator, color: "text-emerald-600" },
} as const;

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = runSearch(query);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(v => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => { setActiveIndex(0); }, [query]);

  const close = useCallback(() => setOpen(false), []);

  const navigate = useCallback((href: string) => {
    close();
    router.push(href);
  }, [close, router]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results.length > 0) {
      const target = results[activeIndex];
      if (target) navigate(target.href);
    }
  };

  const grouped = (["detailed", "section", "calculator"] as const)
    .map(type => ({ type, items: results.filter(r => r.type === type) }))
    .filter(g => g.items.length > 0);

  return (
    <>
      {/* Desktop trigger */}
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-1.5 text-sm text-muted-foreground shadow-sm hover:bg-muted/80 hover:border-primary/30 hover:text-foreground transition-colors"
        aria-label="Open search"
      >
        <Search className="h-3.5 w-3.5 shrink-0" />
        <span className="text-xs">Search...</span>
        <kbd className="hidden lg:inline rounded border bg-background px-1.5 py-0.5 font-mono text-xs leading-none">⌘K</kbd>
      </button>

      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        className="sm:hidden rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        aria-label="Open search"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Command palette */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[8vh]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={close}
          />

          {/* Panel */}
          <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border bg-background shadow-2xl">

            {/* Input */}
            <div className="flex items-center gap-3 border-b px-4 py-3.5">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search sections, calculators, topics…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {query ? (
                <button
                  onClick={() => setQuery("")}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Clear"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                  Esc
                </kbd>
              )}
            </div>

            {/* Body */}
            <div className="max-h-[60vh] overflow-y-auto">
              {!query && (
                <div className="px-4 py-10 text-center">
                  <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground/25" />
                  <p className="text-sm text-muted-foreground">
                    Search across{" "}
                    <span className="font-medium text-foreground">536+ sections</span>,{" "}
                    <span className="font-medium text-foreground">detailed analyses</span>, and{" "}
                    <span className="font-medium text-foreground">calculators</span>
                  </p>
                </div>
              )}

              {query.length >= 2 && results.length === 0 && (
                <div className="px-4 py-10 text-center">
                  <p className="text-sm text-muted-foreground">
                    No results for{" "}
                    <span className="font-medium text-foreground">&ldquo;{query}&rdquo;</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Try a section number, topic, or keyword
                  </p>
                </div>
              )}

              {grouped.map(({ type, items }) => {
                const { label, Icon, color } = TYPE_META[type];
                return (
                  <div key={type} className="py-1">
                    <div className="flex items-center gap-2 px-4 pb-1 pt-2">
                      <Icon className={cn("h-3.5 w-3.5", color)} />
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {label}
                      </span>
                    </div>
                    {items.map(item => {
                      const globalIndex = results.indexOf(item);
                      const isActive = globalIndex === activeIndex;
                      return (
                        <button
                          key={item.href}
                          onClick={() => navigate(item.href)}
                          onMouseEnter={() => setActiveIndex(globalIndex)}
                          className={cn(
                            "flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors",
                            isActive ? "bg-primary/10" : "hover:bg-muted/60"
                          )}
                        >
                          <span className="mt-0.5 shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-xs font-semibold text-muted-foreground">
                            {item.badge}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium leading-snug">
                              {item.title}
                            </p>
                            {item.description && (
                              <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            )}
                          </div>
                          <ArrowRight
                            className={cn(
                              "mt-0.5 h-3.5 w-3.5 shrink-0 transition-opacity",
                              isActive ? "text-primary opacity-100" : "opacity-0"
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Footer hints */}
            {results.length > 0 && (
              <div className="flex items-center gap-4 border-t bg-muted/20 px-4 py-2 text-xs text-muted-foreground">
                <span>
                  <kbd className="font-mono">↑↓</kbd> navigate
                </span>
                <span>
                  <kbd className="font-mono">↵</kbd> open
                </span>
                <span>
                  <kbd className="font-mono">Esc</kbd> close
                </span>
                <span className="ml-auto">
                  {results.length} result{results.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
