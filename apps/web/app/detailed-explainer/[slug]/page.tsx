import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Info, AlertTriangle, Lightbulb } from "lucide-react";
import { DETAILED_ENTRIES } from "../_components/detailed-data";
import type { ContentBlock } from "../_components/detailed-data";
import { getDiagram } from "../_components/diagrams";
import { cn } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  "Capital Gains":          "bg-yellow-100 text-yellow-800",
  "Corporate Tax":          "bg-violet-100 text-violet-800",
  "TDS & TCS":              "bg-pink-100 text-pink-800",
  "Business & Profession":  "bg-amber-100 text-amber-800",
  "Deductions":             "bg-green-100 text-green-800",
  "International Tax":      "bg-sky-100 text-sky-800",
  "Special Income":         "bg-cyan-100 text-cyan-800",
  "Charitable Trusts & NPOs": "bg-teal-100 text-teal-800",
};

export function generateStaticParams() {
  return DETAILED_ENTRIES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = DETAILED_ENTRIES.find((e) => e.slug === slug);
  if (!entry) return {};
  return {
    title: `${entry.section2025} — ${entry.title} | TaxSaral Detailed Explainer`,
    description: entry.summary.slice(0, 155),
  };
}

function RenderBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "diagram":
      return <>{getDiagram(block.id)}</>;

    case "heading":
      return (
        <div className="mt-8 mb-3 first:mt-0">
          <h2 className="text-lg font-semibold text-foreground">{block.text}</h2>
          <div className="mt-1.5 h-px bg-border" />
        </div>
      );

    case "subheading":
      return (
        <h3 className="mt-5 mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {block.text}
        </h3>
      );

    case "paragraph":
      return (
        <p className="text-sm leading-relaxed text-foreground/90">{block.text}</p>
      );

    case "bullets":
      return (
        <ul className="space-y-1.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground/90">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <ol className="space-y-1.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground/90">
              <span className="shrink-0 font-mono text-xs font-semibold text-primary mt-0.5">
                {i + 1}.
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className={cn(
                      "px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
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
        <div className="overflow-x-auto rounded-xl border bg-muted/10">
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
        info: {
          bg: "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800",
          text: "text-blue-800 dark:text-blue-200",
          icon: <Info className="h-4 w-4 shrink-0 mt-0.5 text-blue-500" />,
        },
        warning: {
          bg: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800",
          text: "text-amber-800 dark:text-amber-200",
          icon: <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" />,
        },
        tip: {
          bg: "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800",
          text: "text-emerald-800 dark:text-emerald-200",
          icon: <Lightbulb className="h-4 w-4 shrink-0 mt-0.5 text-emerald-500" />,
        },
      };
      const v = variants[block.variant];
      return (
        <div className={cn("flex gap-2.5 rounded-lg border px-4 py-3", v.bg)}>
          {v.icon}
          <p className={cn("text-sm leading-relaxed", v.text)}>{block.text}</p>
        </div>
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

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Link
          href="/detailed-explainer"
          className="hover:text-foreground transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="h-3 w-3" />
          Detailed Explainer
        </Link>
        <span>/</span>
        <span className="truncate font-medium text-foreground">{entry.section2025}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-primary/10 px-2.5 py-1 font-mono text-sm font-semibold text-primary">
            {entry.section2025}
          </span>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              CATEGORY_COLORS[entry.category] ?? "bg-muted text-muted-foreground"
            )}
          >
            {entry.category}
          </span>
          {entry.section1961 && (
            <span className="text-xs text-muted-foreground">
              was{" "}
              <span className="font-medium text-foreground">{entry.section1961}</span> in IT Act 1961
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
          {entry.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-2xl">
          {entry.summary}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Last updated:{" "}
          {new Date(entry.lastUpdated).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Content blocks */}
      <div className="space-y-4">
        {entry.content.map((block, i) => (
          <RenderBlock key={i} block={block} />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-10 rounded-xl border bg-muted/20 px-5 py-4 text-xs text-muted-foreground leading-relaxed">
        <span className="font-medium text-foreground">Disclaimer: </span>
        This analysis is based on the Income Tax Act 2025 (Tax Year 2026-27) and is for educational
        purposes only. Tax laws are subject to change. Always verify with a Chartered Accountant or
        tax advisor before making decisions.
      </div>

      <div className="mt-4 flex justify-start">
        <Link
          href="/detailed-explainer"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to all analyses
        </Link>
      </div>
    </div>
  );
}
