import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Scale } from "lucide-react";
import { CASE_LAWS } from "../_components/case-law-data";
import type { CaseCategory } from "../_components/case-law-data";
import { cn } from "@/lib/utils";

const BASE = "https://taxsaral.org";

const CATEGORY_BADGE: Record<CaseCategory, string> = {
  "Capital Gains": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  "Charitable Trusts & NPOs": "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  "Transfer Pricing": "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  "International Tax": "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
  "Business & Profession": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "Assessment & Reassessment": "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  "TDS & TCS": "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  "Penalties": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "Cash Credits & Unexplained Income":
    "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300",
  "General Principles": "bg-slate-200 text-slate-800 dark:bg-slate-700/40 dark:text-slate-200",
  "Trusts, Funds & Pass-Through Vehicles":
    "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
};

export function generateStaticParams() {
  return CASE_LAWS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = CASE_LAWS.find((x) => x.slug === slug);
  if (!c) return {};

  const url = `${BASE}/case-law/${c.slug}`;
  const title = `${c.caseName} ${c.citation} — Case Summary | TaxSaral`;
  const description = `${c.held.slice(0, 150)}… Decided under ${c.section1961}; now ${c.section2025} of the Income Tax Act 2025.`;

  return {
    title,
    description,
    keywords: [
      c.caseName,
      c.citation,
      ...c.keywords,
      c.category,
      "income tax case law",
      "IT Act 2025",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${c.caseName} — ${c.citation}`,
      description,
      url,
      type: "article",
      siteName: "TaxSaral",
    },
    twitter: {
      card: "summary",
      title: `${c.caseName} | TaxSaral`,
      description,
    },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function CaseLawDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = CASE_LAWS.find((x) => x.slug === slug);
  if (!c) notFound();

  const url = `${BASE}/case-law/${c.slug}`;

  // Other judgments in the same area, for onward navigation.
  const related = CASE_LAWS.filter(
    (x) => x.category === c.category && x.slug !== c.slug
  ).slice(0, 4);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${c.caseName} — ${c.citation}`,
    description: c.held,
    url,
    datePublished: String(c.year),
    about: `${c.section2025} — ${c.sectionTopic}`,
    keywords: c.keywords.join(", "),
    author: { "@type": "Organization", name: "TaxSaral", url: BASE },
    publisher: { "@type": "Organization", name: "TaxSaral", url: BASE },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Case Law", item: `${BASE}/case-law` },
      { "@type": "ListItem", position: 3, name: c.caseName, item: url },
    ],
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Link
          href="/case-law"
          className="flex shrink-0 items-center gap-1 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          Case Law
        </Link>
        <span>/</span>
        <span className="truncate font-medium text-foreground">{c.category}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              CATEGORY_BADGE[c.category]
            )}
          >
            {c.category}
          </span>
          <span className="rounded-md border px-2 py-0.5 text-xs text-muted-foreground">
            {c.court}
          </span>
          <span className="text-xs font-medium text-muted-foreground">{c.year}</span>
        </div>

        <h1 className="text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
          {c.caseName}
        </h1>
        <p className="mt-1 font-mono text-sm text-muted-foreground">{c.citation}</p>

        {/* Section mapping */}
        <div className="mt-5 rounded-xl border bg-muted/30 px-5 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Decided under</span>
            <span className="font-mono text-sm font-semibold text-foreground">
              {c.section1961}
            </span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">now</span>
            <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-sm font-semibold text-primary">
              {c.section2025}
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{c.sectionTopic}</p>
        </div>
      </header>

      {/* Held — lead with the ratio */}
      <div className="mb-8 rounded-xl border-l-4 border-l-primary bg-primary/5 px-5 py-4">
        <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
          Held
        </h2>
        <p className="text-sm leading-relaxed text-foreground">{c.held}</p>
      </div>

      <div className="space-y-7">
        <Section title="Issue before the court">
          <p className="text-sm leading-relaxed text-foreground/90">{c.issue}</p>
        </Section>

        <Section title="Facts">
          <p className="text-sm leading-relaxed text-foreground/90">{c.facts}</p>
        </Section>

        {c.proceduralHistory && (
          <Section title="How the matter reached the court">
            <p className="text-sm leading-relaxed text-foreground/90">
              {c.proceduralHistory}
            </p>
          </Section>
        )}

        {c.contentions && (
          <Section title="Arguments">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-4 py-3 dark:border-emerald-900 dark:bg-emerald-950/20">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  For the assessee
                </p>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {c.contentions.assessee}
                </p>
              </div>
              <div className="rounded-lg border border-rose-200 bg-rose-50/60 px-4 py-3 dark:border-rose-900 dark:bg-rose-950/20">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                  For the Revenue
                </p>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {c.contentions.revenue}
                </p>
              </div>
            </div>
          </Section>
        )}

        <Section title="The court's reasoning">
          <p className="text-sm leading-relaxed text-foreground/90">{c.summary}</p>
        </Section>

        <Section title="Principles established">
          <ul className="space-y-2">
            {c.principles.map((p, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-sm leading-relaxed text-foreground/90"
              >
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Section>

        <div className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 dark:border-blue-800 dark:bg-blue-950/30">
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            Position under the IT Act 2025
          </h2>
          <p className="text-sm leading-relaxed text-blue-900 dark:text-blue-100">
            {c.relevance}
          </p>
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap gap-1.5">
          {c.keywords.map((k) => (
            <span
              key={k}
              className="rounded-full border bg-muted/30 px-2 py-0.5 text-xs text-muted-foreground"
            >
              {k}
            </span>
          ))}
        </div>
      </div>

      {/* Related judgments */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <Scale className="h-4 w-4 text-muted-foreground" />
            More on {c.category}
          </h2>
          <div className="space-y-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/case-law/${r.slug}`}
                className="group flex items-start justify-between gap-4 rounded-lg border bg-card px-4 py-3 transition-colors hover:bg-muted/20"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-snug transition-colors group-hover:text-primary">
                    {r.caseName}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {r.citation}
                  </p>
                </div>
                <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-10 rounded-xl border bg-muted/20 px-5 py-4 text-xs leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">Note: </span>
        This is a summary prepared for study and reference. The citation is given so
        the full text of the judgment can be consulted, and it should be, before the
        case is relied on. Corresponding Income Tax Act 2025 sections are drawn from
        the section mapping used across this site; where a provision has been recast
        rather than renumbered, the note above explains how far the principle still
        applies. This page is not a substitute for professional advice.
      </div>

      <div className="mt-4">
        <Link
          href="/case-law"
          className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to all judgments
        </Link>
      </div>
    </div>
  );
}
