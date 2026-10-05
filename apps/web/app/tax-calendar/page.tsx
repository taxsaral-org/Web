import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CalendarClient } from "./_components/calendar-client";

export const metadata: Metadata = {
  title: "Income Tax Due Dates 2026-27 — Complete Tax Calendar | TaxSaral",
  description: "All income tax due dates for Tax Year 2026-27 (AY 2027-28) in one place — advance tax instalments, TDS/TCS returns, ITR filing deadlines (July 31, October 31), audit report dates, with live countdowns.",
  keywords: ["income tax due dates 2026-27", "ITR filing deadline 2027", "advance tax due dates", "TDS return due dates", "tax calendar 2026-27", "last date income tax return"],
  alternates: { canonical: "https://taxsaral.org/tax-calendar" },
  openGraph: { title: "Income Tax Due Dates 2026-27 — Tax Calendar | TaxSaral", description: "Complete income tax calendar for TY 2026-27 — ITR deadlines, advance tax, TDS returns with live countdowns.", url: "https://taxsaral.org/tax-calendar", type: "website", siteName: "TaxSaral" },
  twitter: { card: "summary", title: "Income Tax Due Dates 2026-27 | TaxSaral", description: "Complete income tax calendar — ITR deadlines, advance tax, TDS return dates with live countdowns." },
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
      <PageHeader
        kicker="Income Tax Act 2025 · Tax Year 2026-27"
        title="Tax calendar 2026-27"
        aside={
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            {LEGEND.map(({ label, dot }) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${dot}`} />
                {label}
              </span>
            ))}
            <span>A coloured left edge marks an important deadline.</span>
          </div>
        }
      >
        <p>
          Every income tax deadline for Tax Year 2026-27: advance tax instalments, TDS and
          TCS returns, ITR due dates, Form No. 130 (earlier Form 16), and audit reports.
          The countdowns update on their own.
        </p>
      </PageHeader>

      {/* Calendar */}
      <section className="container mx-auto max-w-4xl px-4 py-8">
        <CalendarClient />
      </section>
    </main>
  );
}
