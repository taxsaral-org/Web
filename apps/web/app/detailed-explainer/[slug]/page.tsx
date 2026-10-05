import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DETAILED_ENTRIES } from "../_components/detailed-data";
import type { ContentBlock } from "../_components/detailed-data";
import { getDiagram } from "../_components/diagrams";
import { DetailedAskWidget } from "../_components/ask-widget";
import { DetailPageActions } from "../_components/detail-page-actions";
import { ReadingProgress } from "../_components/reading-progress";
import { AuthorCredit } from "../_components/author-credit";
import { QUIZ_CHAPTERS } from "@/app/quiz/_components/quiz-data";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return DETAILED_ENTRIES.map((e) => ({ slug: e.slug }));
}

const BASE = "https://taxsaral.org";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = DETAILED_ENTRIES.find((e) => e.slug === slug);
  if (!entry) return {};
  const title = `${entry.section2025} — ${entry.title} | TaxSaral`;
  const description = entry.summary.slice(0, 160);
  const url = `${BASE}/detailed-explainer/${entry.slug}`;
  return {
    title,
    description,
    keywords: entry.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      modifiedTime: entry.lastUpdated,
      siteName: "TaxSaral",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

function RenderBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "diagram":
      return <>{getDiagram(block.id)}</>;

    case "heading":
      return (
        <h2 className="!mt-10 text-xl font-semibold text-foreground first:!mt-0">{block.text}</h2>
      );

    case "subheading":
      return (
        <h3 className="!mt-7 text-lg font-semibold text-foreground">
          {block.text}
        </h3>
      );

    case "paragraph":
      return (
        <p className="text-[15px] leading-relaxed text-foreground/85">{block.text}</p>
      );

    case "bullets":
      return (
        <ul className="list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-foreground/85 marker:text-muted-foreground">
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">{item}</li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <ol className="list-decimal space-y-1.5 pl-5 text-[15px] leading-relaxed text-foreground/85 marker:text-muted-foreground">
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">{item}</li>
          ))}
        </ol>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-md border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className={cn(
                      "px-4 py-2.5 text-sm font-semibold text-muted-foreground",
                      i === 0 ? "text-left" : "text-center"
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {block.rows.map((row, i) => (
                <tr key={i} className={cn("hover:bg-muted/20", row.bold && "bg-muted/30")}>
                  {row.cells.map((cell, j) => (
                    <td
                      key={j}
                      className={cn(
                        "px-4 py-2.5",
                        j === 0 ? "text-left text-sm" : "text-center font-mono text-sm font-semibold",
                        row.bold && "font-bold"
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "calculation":
      return (
        <div className="overflow-x-auto rounded-md border bg-card">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-border/60">
              {block.rows.map((row, i) => (
                <tr
                  key={i}
                  className={cn(
                    row.total ? "border-t-2 border-border bg-muted/30" : "hover:bg-muted/10"
                  )}
                >
                  <td
                    className={cn(
                      "px-4 py-2 text-sm",
                      row.indent && "pl-8",
                      row.total && "font-bold"
                    )}
                  >
                    {row.label}
                  </td>
                  <td
                    className={cn(
                      "px-4 py-2 text-right font-mono text-sm",
                      row.negative ? "text-red-600 dark:text-red-400" : "",
                      row.total && "font-bold"
                    )}
                  >
                    {row.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "callout": {
      const variants = {
        info:    { label: "Note",      rule: "border-sky-600",     text: "text-sky-800 dark:text-sky-300" },
        warning: { label: "Watch out", rule: "border-amber-500",   text: "text-amber-800 dark:text-amber-300" },
        tip:     { label: "Tip",       rule: "border-emerald-600", text: "text-emerald-800 dark:text-emerald-300" },
      };
      const v = variants[block.variant];
      return (
        <p className={cn("border-l-2 pl-4 text-[15px] leading-relaxed text-foreground/85", v.rule)}>
          <span className={cn("font-semibold", v.text)}>{v.label}. </span>
          {block.text}
        </p>
      );
    }

    default:
      return null;
  }
}

export default async function DetailedEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = DETAILED_ENTRIES.find((e) => e.slug === slug);
  if (!entry) notFound();

  const pageUrl = `${BASE}/detailed-explainer/${entry.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.summary,
    url: pageUrl,
    dateModified: entry.lastUpdated,
    keywords: entry.keywords.join(", "),
    author: { "@type": "Organization", name: "TaxSaral", url: BASE },
    publisher: { "@type": "Organization", name: "TaxSaral", url: BASE },
    about: { "@type": "Legislation", name: `${entry.section2025} — Income Tax Act 2025`, jurisdiction: "India" },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Detailed Explainer", item: `${BASE}/detailed-explainer` },
      { "@type": "ListItem", position: 3, name: `${entry.section2025} — ${entry.title}`, item: pageUrl },
    ],
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mb-6 flex items-center justify-between gap-4">
        <nav className="min-w-0 truncate text-sm text-muted-foreground">
          <Link href="/detailed-explainer" className="underline-offset-4 hover:text-foreground hover:underline">
            Detailed Explainer
          </Link>
          {" / "}
          <span>{entry.category}</span>
        </nav>
        <DetailPageActions
          slug={entry.slug}
          title={entry.title}
          section={entry.section2025}
          category={entry.category}
        />
      </div>

      <header className="mb-10">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-primary">{entry.section2025}</span>
          {entry.section1961 && (
            <> · was <span className="font-medium text-foreground">{entry.section1961}</span> in the 1961 Act</>
          )}
        </p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">
          {entry.title}
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-foreground/85">
          {entry.summary}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Last updated{" "}
          {new Date(entry.lastUpdated).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </header>

      {/* Content blocks */}
      <div className="space-y-4">
        {entry.content.map((block, i) => (
          <RenderBlock key={i} block={block} />
        ))}
      </div>

      {/* Test Yourself */}
      {QUIZ_CHAPTERS.some((c) => c.slug === entry.slug) && (
        <div className="mt-10">
          <Link
            href={`/quiz/${entry.slug}`}
            className="group flex items-center justify-between gap-4 border-y py-5"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">
                  Test yourself
                </p>
                <p className="mt-0.5 font-serif text-lg font-semibold text-foreground leading-snug group-hover:text-primary group-hover:underline underline-offset-4 decoration-1">
                  {QUIZ_CHAPTERS.find((c) => c.slug === entry.slug)?.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {QUIZ_CHAPTERS.find((c) => c.slug === entry.slug)?.questions.length} MCQs · Check your understanding of this topic
                </p>
              </div>
            </div>
            <span className="shrink-0 text-sm font-medium text-primary">Take the quiz →</span>
          </Link>
        </div>
      )}

      {/* Ask a Question */}
      <DetailedAskWidget section2025={entry.section2025} />

      {/* Author credit */}
      {entry.author && (
        <AuthorCredit
          author={entry.author}
          authorLinkedIn={entry.authorLinkedIn}
          authorNote={entry.authorNote}
        />
      )}

      {/* Footer */}
      <div className="mt-8 border-t pt-5 text-xs text-muted-foreground leading-relaxed">
        <span className="font-medium text-foreground">Disclaimer: </span>
        This analysis is based on the Income Tax Act 2025 (Tax Year 2026-27) and is for educational
        purposes only. Tax laws are subject to change. Always verify with a Chartered Accountant or
        tax advisor before making decisions.
      </div>

      <p className="mt-6 text-sm">
        <Link
          href="/detailed-explainer"
          className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          &larr; All analyses
        </Link>
      </p>
    </div>
  );
}
