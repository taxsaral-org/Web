import type { Metadata } from "next";
import { BookOpen, FlaskConical, FileText, Lightbulb } from "lucide-react";
import { DetailedListingClient } from "./_components/detailed-listing-client";
import { DETAILED_ENTRIES } from "./_components/detailed-data";

export const metadata: Metadata = {
  title: "Detailed Tax Explainer — In-Depth IT Act 2025 Analysis | TaxSaral",
  description: "Deep-dive analyses of Income Tax Act 2025 provisions — full tax treatment, worked examples, case laws, computation tables, and step-by-step calculation walk-throughs in plain English.",
  keywords: ["income tax act 2025 analysis", "detailed tax explainer", "IT Act 2025 provisions", "capital gains tax India", "business deduction analysis", "TDS detailed guide"],
  alternates: { canonical: "https://taxsaral.org/detailed-explainer" },
  openGraph: { title: "Detailed IT Act 2025 Explainer | TaxSaral", description: "Deep-dive analyses of IT Act 2025 sections — worked examples, case laws, and computation tables.", url: "https://taxsaral.org/detailed-explainer", type: "website", siteName: "TaxSaral" },
  twitter: { card: "summary", title: "Detailed IT Act 2025 Explainer | TaxSaral", description: "In-depth analyses of IT Act 2025 provisions with worked examples." },
};

const HIGHLIGHTS = [
  { icon: FlaskConical, label: "Worked examples",     color: "bg-violet-100 text-violet-600 border-violet-200" },
  { icon: FileText,    label: "Section refs cited",   color: "bg-blue-100 text-blue-600 border-blue-200"   },
  { icon: Lightbulb,  label: "Plain-English language",color: "bg-amber-100 text-amber-600 border-amber-200" },
];

export default function DetailedExplainerPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="border-b bg-gradient-to-br from-violet-50/70 via-indigo-50/40 to-background">
        <div className="container mx-auto max-w-4xl px-4 py-10">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-200 bg-violet-100">
              <BookOpen className="h-6 w-6 text-violet-600" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-500">
                IT Act 2025 · Tax Year 2026-27
              </p>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Detailed Explainer
              </h1>
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            In-depth analyses of specific Income Tax Act 2025 provisions — complete tax
            treatment with tables, calculation walk-throughs, diagrams, and worked examples
            all in plain English.
          </p>

          {/* Stats + highlights */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
              {DETAILED_ENTRIES.length} analyses
            </span>
            {HIGHLIGHTS.map(({ icon: Icon, label, color }) => (
              <span
                key={label}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${color}`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Listing ──────────────────────────────────────────────────── */}
      <section className="container mx-auto max-w-4xl px-4 py-8">
        <DetailedListingClient />

        <p className="mt-10 text-center text-xs leading-relaxed text-muted-foreground">
          Based on the Income Tax Act 2025 for Tax Year 2026-27. Educational reference only —
          verify with a Chartered Accountant before filing.
        </p>
      </section>
    </main>
  );
}
