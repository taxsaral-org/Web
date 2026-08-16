import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowLeft, CheckCircle2 } from "lucide-react";
import { QUIZ_CHAPTERS, DIFFICULTY_ORDER } from "../_components/quiz-data";
import { ChapterCard } from "../_components/chapter-card";

const BASE     = "https://taxsaral.org";
const PAGE_URL = `${BASE}/quiz/detailed-explainer`;

export const metadata: Metadata = {
  title: "Detailed Explainer — Concept Check Quizzes | TaxSaral",
  description:
    "Concept-check MCQs paired with each Detailed Explainer on TaxSaral. Test whether you've understood the key rules after reading — IT Act 2025, Tax Year 2026-27.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Detailed Explainer — Concept Check Quizzes | TaxSaral",
    description: "One quiz per Detailed Explainer topic. Medium-difficulty MCQs for IT Act 2025.",
    url: PAGE_URL, type: "website", siteName: "TaxSaral",
  },
};

const chapters = [...QUIZ_CHAPTERS.filter((c) => c.source === "detailed-explainer")].sort(
  (a, b) => DIFFICULTY_ORDER.indexOf(a.difficulty) - DIFFICULTY_ORDER.indexOf(b.difficulty)
);

export default function DetailedExplainerQuizPage() {
  const totalQuestions = chapters.reduce((s, c) => s + c.questions.length, 0);

  return (
    <main>
      {/* Header */}
      <section className="border-b bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-background dark:from-blue-950/20">
        <div className="container mx-auto max-w-4xl px-4 py-10">
          <Link
            href="/quiz"
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All quiz tracks
          </Link>

          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-200 bg-blue-100 dark:border-blue-800 dark:bg-blue-900/40">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                Track 1 · Concept Check
              </p>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Detailed Explainer Quizzes
              </h1>
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground mb-5">
            One quiz per Detailed Explainer topic. These questions test whether you have understood
            the key rules — thresholds, conditions, and exceptions — after reading the article.
            Start here if you are new to a topic.
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
              {chapters.length} quiz sets
            </span>
            <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
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
        <div className="space-y-3">
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.slug} chapter={chapter} />
          ))}
        </div>
      </section>
    </main>
  );
}
