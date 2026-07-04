import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Users, CheckCircle } from "lucide-react";
import { SECTIONS } from "../_components/sections-data";
import { cn } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  "Residential Status": "bg-blue-100 text-blue-800",
  "Income Heads":       "bg-purple-100 text-purple-800",
  "House Property":     "bg-orange-100 text-orange-800",
  "Deductions":         "bg-green-100 text-green-800",
  "Tax Computation":    "bg-primary/10 text-primary",
  "Capital Gains":      "bg-yellow-100 text-yellow-800",
  "TDS":                "bg-pink-100 text-pink-800",
  "Advance Tax":        "bg-amber-100 text-amber-800",
  "Interest & Penalties": "bg-red-100 text-red-800",
  "Special Income":     "bg-cyan-100 text-cyan-800",
};

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const section = SECTIONS.find((s) => s.slug === slug);
  if (!section) return {};
  return {
    title: `${section.section2025} — ${section.title} | TaxSaral Section Explainer`,
    description: section.explanation.slice(0, 155),
  };
}

export default async function SectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = SECTIONS.find((s) => s.slug === slug);
  if (!section) notFound();

  const related = section.relatedSlugs
    .map((rs) => SECTIONS.find((s) => s.slug === rs))
    .filter(Boolean);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/section-explainer" className="hover:text-foreground transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          Section Explainer
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate">{section.section2025}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-primary/10 px-2.5 py-1 text-sm font-mono font-semibold text-primary">
            {section.section2025}
          </span>
          <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", CATEGORY_COLORS[section.category])}>
            {section.category}
          </span>
          {section.section1961 && (
            <span className="text-xs text-muted-foreground">
              was <span className="font-medium text-foreground">{section.section1961}</span> in IT Act 1961
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{section.title}</h1>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">{section.explanation}</p>
      </div>

      {/* Who it applies to */}
      <section className="mb-6 rounded-xl border bg-blue-50/50 dark:bg-blue-950/20 p-5">
        <div className="flex items-center gap-2 mb-2">
          <Users className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-semibold text-blue-900 dark:text-blue-100">Who this applies to</h2>
        </div>
        <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">{section.whoItApplies}</p>
      </section>

      {/* Key Points */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-4 w-4 text-primary" />
          <h2 className="text-base font-semibold">Key Points</h2>
        </div>
        <ul className="space-y-3">
          {section.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Worked Examples */}
      <section className="mb-8">
        <h2 className="text-base font-semibold mb-4">
          Worked Example{section.examples.length > 1 ? "s" : ""}
        </h2>
        <div className="space-y-5">
          {section.examples.map((example, i) => (
            <div key={i} className="rounded-xl border bg-card overflow-hidden">
              {/* Example header */}
              <div className="border-b bg-muted/30 px-5 py-3 flex items-center gap-2">
                <span className="rounded-full bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center text-xs font-semibold shrink-0">
                  {i + 1}
                </span>
                <h3 className="text-sm font-semibold">{example.title}</h3>
              </div>

              <div className="p-5 space-y-4">
                {/* Scenario */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Scenario</p>
                  <p className="text-sm text-foreground leading-relaxed">{example.scenario}</p>
                </div>

                {/* Calculation */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Calculation</p>
                  <div className="rounded-lg bg-muted/50 border px-4 py-3">
                    <pre className="text-xs font-mono leading-relaxed text-foreground whitespace-pre-wrap break-words">
                      {example.calculation}
                    </pre>
                  </div>
                </div>

                {/* Result */}
                <div className="rounded-lg border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">Result</p>
                  <p className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">{example.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Sections */}
      {related.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-semibold mb-3">Related Sections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {related.map((rel) => rel && (
              <Link
                key={rel.slug}
                href={`/section-explainer/${rel.slug}`}
                className="flex items-start justify-between gap-3 rounded-xl border bg-card p-4 hover:border-primary/30 transition-colors group"
              >
                <div className="min-w-0">
                  <span className="block text-xs font-mono text-primary mb-1">{rel.section2025}</span>
                  <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">{rel.title}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5 group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="rounded-xl border bg-muted/30 p-5 text-center">
        <p className="text-sm font-medium mb-1">Still have questions about {section.section2025}?</p>
        <p className="text-xs text-muted-foreground mb-4">Our tax team can explain how this provision applies to your specific situation.</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/ask"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Ask our tax team
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/section-explainer"
            className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            Browse all sections
          </Link>
        </div>
      </div>

      <p className="mt-8 text-xs text-muted-foreground text-center leading-relaxed">
        Section references are based on the Income Tax Act 2025 (Tax Year 2026-27). Examples are illustrative — verify with a Chartered Accountant before filing.
      </p>
    </div>
  );
}
