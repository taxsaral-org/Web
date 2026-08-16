import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, ArrowLeft, CheckCircle2 } from "lucide-react";
import { QUIZ_CHAPTERS, DIFFICULTY_ORDER } from "../_components/quiz-data";
import { ChapterCard } from "../_components/chapter-card";

const BASE     = "https://taxsaral.org";
const PAGE_URL = `${BASE}/quiz/icai`;

export const metadata: Metadata = {
  title: "ICAI Study Material — Application Level Quizzes | TaxSaral",
  description:
    "Hard, scenario-based MCQs drawn from ICAI study material and past exam problems. IT Act 2025, Tax Year 2026-27. Attempt after mastering the underlying concepts.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "ICAI Study Material Quizzes | TaxSaral",
    description: "Advanced scenario-based MCQs from ICAI study material. IT Act 2025.",
    url: PAGE_URL, type: "website", siteName: "TaxSaral",
  },
};

const chapters = [...QUIZ_CHAPTERS.filter((c) => c.source === "icai")].sort(
  (a, b) => DIFFICULTY_ORDER.indexOf(a.difficulty) - DIFFICULTY_ORDER.indexOf(b.difficulty)
);

export default function IcaiQuizPage() {
  const totalQuestions = chapters.reduce((s, c) => s + c.questions.length, 0);

  return (
    <main>
      {/* Header */}
      <section className="border-b bg-gradient-to-br from-orange-50/70 via-amber-50/30 to-background dark:from-orange-950/20">
        <div className="container mx-auto max-w-4xl px-4 py-10">
          <Link
            href="/quiz"
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All quiz tracks
          </Link>

          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-200 bg-orange-100 dark:border-orange-800 dark:bg-orange-900/40">
              <GraduationCap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                Track 2 · Application Level
              </p>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                ICAI Study Material Quizzes
              </h1>
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground mb-5">
            Scenario-based questions drawn directly from ICAI study material and past CA exam problems.
            These questions require you to apply multiple concepts to a given fact pattern —
            attempt after you are comfortable with the underlying rules.
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 dark:border-orange-800 dark:bg-orange-900/40 dark:text-orange-300">
              {chapters.length} quiz set{chapters.length !== 1 ? "s" : ""}
            </span>
            <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 dark:border-orange-800 dark:bg-orange-900/40 dark:text-orange-300">
              {totalQuestions} questions
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              <CheckCircle2 className="h-3 w-3" />
              Explained answers
            </span>
          </div>
        </div>
      </section>

      {/* Chapter list */}
      <section className="container mx-auto max-w-4xl px-4 py-8">
        {chapters.length === 0 ? (
          <div className="rounded-xl border border-dashed py-16 text-center text-sm text-muted-foreground">
            ICAI chapters coming soon.
          </div>
        ) : (
          <div className="space-y-3">
            {chapters.map((chapter) => (
              <ChapterCard key={chapter.slug} chapter={chapter} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
