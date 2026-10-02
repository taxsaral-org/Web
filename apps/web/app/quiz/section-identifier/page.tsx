import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Hash } from "lucide-react";
import { QUIZ_CHAPTERS } from "../_components/quiz-data";

const BASE = "https://taxsaral.org";
const PAGE_URL = `${BASE}/quiz/section-identifier`;

export const metadata: Metadata = {
  title: "Income Tax Act 2025 Section Number Quiz — Chapter-wise | TaxSaral",
  description:
    "Learn the new section numbers of the Income Tax Act 2025 chapter by chapter. See the section number, choose what it deals with — every answer also shows the old 1961 section. Free practice for CA Final students.",
  keywords: [
    "Income Tax Act 2025 sections quiz",
    "IT Act 2025 section numbers",
    "CA Final direct tax MCQ",
    "new income tax act section list",
    "1961 to 2025 section mapping quiz",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "IT Act 2025 Section Number Quiz — Chapter-wise | TaxSaral",
    description:
      "See the section number, pick what it deals with. Chapter-wise drills across the whole Income Tax Act 2025, with the old 1961 section in every answer.",
    url: PAGE_URL,
    type: "website",
    siteName: "TaxSaral",
  },
};

// Kept in the order generated, which follows the sequence of the Act.
const chapters = QUIZ_CHAPTERS.filter((c) => c.source === "section-identifier");

export default function SectionIdentifierPage() {
  const totalQuestions = chapters.reduce((s, c) => s + c.questions.length, 0);

  return (
    <main>
      {/* Header */}
      <section className="border-b bg-gradient-to-br from-emerald-50/70 via-teal-50/30 to-background dark:from-emerald-950/20">
        <div className="container mx-auto max-w-4xl px-4 py-10">
          <Link
            href="/quiz"
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All quiz tracks
          </Link>

          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/40">
              <Hash className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Track 3 · For CA Final
              </p>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Section Identifier
              </h1>
            </div>
          </div>

          <p className="mb-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Each question shows a section number of the Income Tax Act 2025 — you choose what it
            deals with. Work through the Act chapter by chapter, in the order the sections
            appear. The wrong options come from neighbouring sections in the same chapter, so
            you learn to tell apart the ones that are easy to confuse. Every answer also gives
            the corresponding section of the Income Tax Act 1961.
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              {chapters.length} chapters
            </span>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              {totalQuestions} sections covered
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              <CheckCircle2 className="h-3 w-3" />
              Old 1961 section in every answer
            </span>
          </div>
        </div>
      </section>

      {/* Chapter list */}
      <section className="container mx-auto max-w-4xl px-4 py-8">
        <div className="grid gap-3 sm:grid-cols-2">
          {chapters.map((c) => {
            // Title is "Sections 67–91: Capital Gains — Part 1 of 2".
            const [range, rest = ""] = c.title.split(": ");
            const [name, part] = rest.split(" — ");
            return (
              <Link
                key={c.slug}
                href={`/quiz/${c.slug}`}
                className="group flex items-center justify-between gap-3 rounded-xl border bg-card px-4 py-3.5 transition-all hover:border-emerald-300 hover:shadow-md dark:hover:border-emerald-700"
              >
                <div className="min-w-0">
                  <p className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    {range}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold leading-snug transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                    {name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {c.questions.length} questions{part ? ` · ${part}` : ""}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-600" />
              </Link>
            );
          })}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          Chapters follow the sequence of sections in the Income Tax Act 2025, grouped by
          subject; larger chapters are split into parts. Section descriptions are drawn from
          the{" "}
          <Link href="/section-mapping" className="text-primary hover:underline">
            1961 → 2025 section mapping
          </Link>{" "}
          used across this site.
        </p>
      </section>
    </main>
  );
}
