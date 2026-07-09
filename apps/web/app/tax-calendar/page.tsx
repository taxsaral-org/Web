import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { CalendarClient } from "./_components/calendar-client";

export const metadata: Metadata = {
  title: "Tax Calendar 2026-27 — All Due Dates & Deadlines | TaxSaral",
  description:
    "Complete income tax due dates for Tax Year 2026-27 (AY 2027-28). Advance tax instalments, TDS/TCS return dates, ITR filing deadlines, audit report submissions, and more — with live countdowns.",
};

const LEGEND = [
  { label: "Advance Tax",  dot: "bg-blue-500"   },
  { label: "TDS / TCS",   dot: "bg-amber-500"  },
  { label: "ITR Filing",  dot: "bg-green-500"  },
  { label: "Tax Audit",   dot: "bg-purple-500" },
  { label: "Other",       dot: "bg-gray-400"   },
];

export default function TaxCalendarPage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b bg-gradient-to-br from-blue-50/60 via-background to-background">
        <div className="container mx-auto max-w-4xl px-4 py-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 border border-blue-200">
              <CalendarDays className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Income Tax Act 2025 · Tax Year 2026-27
              </p>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Tax Calendar 2026-27
              </h1>
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Every income tax deadline for Tax Year 2026-27 in one place — advance tax
            instalments, TDS/TCS return dates, ITR filing deadlines, Form 16 issuance,
            and audit report submissions. Countdowns update automatically.
          </p>

          {/* Legend */}
          <div className="mt-5 flex flex-wrap gap-4">
            {LEGEND.map(({ label, dot }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className={`h-2 w-2 rounded-full ${dot}`} />
                {label}
              </span>
            ))}
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="inline-block h-3 w-1 rounded bg-blue-400" />
              Bold left border = important deadline
            </span>
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="container mx-auto max-w-4xl px-4 py-8">
        <CalendarClient />
      </section>
    </main>
  );
}
