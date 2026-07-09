"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import {
  EVENTS,
  CATEGORY_COLORS,
  CATEGORY_ACCENT,
  type CalendarEvent,
  type EventCategory,
} from "./calendar-data";
import { cn } from "@/lib/utils";

const CATEGORIES: EventCategory[] = [
  "Advance Tax",
  "TDS / TCS",
  "ITR Filing",
  "Tax Audit",
  "Other",
];

function daysFrom(dateStr: string, today: Date): number {
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  const t = new Date(today);
  t.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - t.getTime()) / 86_400_000);
}

function monthKey(dateStr: string): string {
  return dateStr.slice(0, 7);
}

function formatMonth(key: string): string {
  const [y, m] = key.split("-");
  return new Date(Number(y), Number(m) - 1).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

function dayNum(dateStr: string): string {
  return String(new Date(dateStr).getDate());
}

function dayName(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", { weekday: "short" });
}

function currentMonthKey(today: Date): string {
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
}

export function CalendarClient() {
  const [today, setToday] = useState<Date | null>(null);
  const [filter, setFilter] = useState<EventCategory | null>(null);
  const [showPast, setShowPast] = useState(false);
  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

  const sorted = [...EVENTS].sort((a, b) => a.date.localeCompare(b.date));

  const filtered = sorted.filter((e) => {
    if (filter && e.category !== filter) return false;
    if (!showPast && today) {
      const d = daysFrom(e.date, today);
      if (d < -1) return false;
    }
    return true;
  });

  // Group by month
  const monthMap = new Map<string, CalendarEvent[]>();
  for (const e of filtered) {
    const k = monthKey(e.date);
    if (!monthMap.has(k)) monthMap.set(k, []);
    monthMap.get(k)!.push(e);
  }
  const months = Array.from(monthMap.keys()).sort();
  const curKey = today ? currentMonthKey(today) : null;

  // Count upcoming events (next 30 days)
  const upcomingCount = today
    ? EVENTS.filter((e) => {
        const d = daysFrom(e.date, today);
        return d >= 0 && d <= 30;
      }).length
    : 0;

  return (
    <div>
      {/* Upcoming alert */}
      {upcomingCount > 0 && today && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">{upcomingCount} deadline{upcomingCount !== 1 ? "s" : ""}</span>{" "}
            due in the next 30 days. Check dates marked in orange.
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {/* Category filters */}
        <button
          onClick={() => setFilter(null)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            !filter
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
          )}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(filter === cat ? null : cat)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              filter === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}

        {/* Toggle past */}
        <button
          onClick={() => setShowPast((v) => !v)}
          className={cn(
            "ml-auto flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            showPast
              ? "border-muted-foreground/30 bg-muted text-foreground"
              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
          )}
        >
          <Clock className="h-3 w-3" />
          {showPast ? "Hide past" : "Show past"}
        </button>

        {/* Jump to today */}
        <button
          onClick={() => currentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
        >
          <Calendar className="h-3 w-3" />
          Today
        </button>
      </div>

      {/* Timeline */}
      {months.length === 0 && (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No deadlines found for the selected filter.
        </p>
      )}

      <div className="space-y-10">
        {months.map((key) => {
          const events = monthMap.get(key) ?? [];
          const isCurrent = key === curKey;
          const isPast = curKey !== null && key < curKey;

          return (
            <div
              key={key}
              ref={isCurrent ? currentRef : undefined}
              className={cn(isPast && "opacity-55")}
            >
              {/* Month header */}
              <div className="mb-4 flex items-center gap-3">
                <h2
                  className={cn(
                    "text-base font-semibold",
                    isCurrent ? "text-primary" : "text-foreground"
                  )}
                >
                  {formatMonth(key)}
                </h2>
                {isCurrent && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    This month
                  </span>
                )}
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">
                  {events.length} deadline{events.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Events */}
              <div className="space-y-2.5">
                {events.map((event) => {
                  const diff = today ? daysFrom(event.date, today) : null;
                  const past = diff !== null && diff < 0;
                  const urgent = diff !== null && diff >= 0 && diff <= 7;
                  const soon = diff !== null && diff >= 0 && diff <= 30 && !urgent;

                  return (
                    <div
                      key={event.id}
                      className={cn(
                        "flex gap-4 rounded-xl border bg-card p-4 transition-colors",
                        "hover:border-primary/20 hover:bg-muted/20",
                        event.important && !past && "border-l-4",
                        event.important && !past && CATEGORY_ACCENT[event.category],
                        urgent && "border-red-200 bg-red-50/40"
                      )}
                    >
                      {/* Date column */}
                      <div className="w-9 shrink-0 text-center">
                        <div
                          className={cn(
                            "text-2xl font-bold leading-none tabular-nums",
                            urgent
                              ? "text-red-600"
                              : past
                              ? "text-muted-foreground"
                              : "text-foreground"
                          )}
                        >
                          {dayNum(event.date)}
                        </div>
                        <div className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                          {dayName(event.date)}
                        </div>
                      </div>

                      {/* Separator */}
                      <div
                        className={cn(
                          "w-px self-stretch rounded-full",
                          urgent ? "bg-red-200" : "bg-border"
                        )}
                      />

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-1.5">
                          {/* Category */}
                          <span
                            className={cn(
                              "rounded-full border px-2 py-0.5 text-xs font-medium",
                              CATEGORY_COLORS[event.category]
                            )}
                          >
                            {event.category}
                          </span>

                          {/* Section */}
                          {event.section && (
                            <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                              {event.section}
                            </span>
                          )}

                          {/* Status badge */}
                          {urgent && diff !== null && (
                            <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                              <AlertCircle className="h-3 w-3" />
                              {diff === 0 ? "Due today" : `${diff} day${diff !== 1 ? "s" : ""} left`}
                            </span>
                          )}
                          {soon && diff !== null && (
                            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                              {diff} days left
                            </span>
                          )}
                          {past && diff !== null && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <CheckCircle2 className="h-3 w-3" />
                              {Math.abs(diff)} days ago
                            </span>
                          )}
                        </div>

                        <p
                          className={cn(
                            "text-sm font-semibold leading-snug",
                            past ? "text-muted-foreground" : "text-foreground"
                          )}
                        >
                          {event.title}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-10 rounded-xl border bg-muted/20 px-5 py-4 text-xs text-muted-foreground leading-relaxed">
        <span className="font-medium text-foreground">Note: </span>
        Dates are based on IT Act 2025 and standard CBDT practice. CBDT may extend certain deadlines via circular
        — always verify on the official income tax portal before relying on a deadline. Consult a CA for
        audit-related compliance.
      </div>
    </div>
  );
}
