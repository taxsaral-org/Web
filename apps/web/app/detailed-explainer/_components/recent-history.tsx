"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { useHistory } from "@/hooks/use-history";

export function RecentHistory() {
  const { history, clear } = useHistory();

  if (history.length === 0) return null;

  return (
    <section className="mb-8 rounded-xl border bg-muted/30 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <Clock className="h-3.5 w-3.5" />
          Recently viewed
        </div>
        <button
          type="button"
          onClick={clear}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.slice(0, 6).map((item) => (
          <Link
            key={`${item.type}-${item.slug}`}
            href={`/detailed-explainer/${item.slug}`}
            className="flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
          >
            <span className="font-mono font-semibold text-primary">{item.section}</span>
            <span className="hidden sm:inline truncate max-w-[120px]">{item.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
