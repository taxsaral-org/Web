import type { Metadata } from "next";
import Link from "next/link";
import { Brain, BookOpen, GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import { QUIZ_CHAPTERS } from "./_components/quiz-data";

const BASE     = "https://taxsaral.org";
const PAGE_URL = `${BASE}/quiz`;

export const metadata: Metadata = {
  title: "Income Tax Quiz — Test Your IT Act 2025 Knowledge | TaxSaral",
  description:
    "Two tracks: concept-check quizzes linked to each Detailed Explainer, and advanced ICAI study-material case studies. IT Act 2025, Tax Year 2026-27.",
  keywords: [
    "income tax quiz 2025",
    "CA final tax quiz",
    "IT Act 2025 MCQ",
    "ICAI study material quiz",
    "PGBP quiz",
    "income tax practice questions",
    "CA exam preparation",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Income Tax Quiz — IT Act 2025 | TaxSaral",
    description: "Concept-check quizzes from Detailed Explainers + ICAI case studies. IT Act 2025.",
    url: PAGE_URL, type: "website", siteName: "TaxSaral",
  },
  twitter: {
    card: "summary",
    title: "Income Tax Quiz — IT Act 2025 | TaxSaral",
    description: "Concept-check quizzes from Detailed Explainers + ICAI case studies.",
  },
};

const explainerChapters = QUIZ_CHAPTERS.filter((c) => c.source === "detailed-explainer");
const icaiChapters      = QUIZ_CHAPTERS.filter((c) => c.source === "icai");

export default function QuizPage() {
  const totalQuestions = QUIZ_CHAPTERS.reduce((s, c) => s + c.questions.length, 0);

  return (
    <main>
      {/* Hero */}
      <section className="border-b bg-gradient-to-br from-violet-50/70 via-indigo-50/40 to-background dark:from-violet-950/20">
        <div className="container mx-auto max-w-4xl px-4 py-10">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-200 bg-violet-100 dark:border-violet-800 dark:bg-violet-900/40">
              <Brain className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-500">
                IT Act 2025 · Practice Quiz
              </p>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Test Your Knowledge
              </h1>
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground mb-5">
            Choose a track based on where you are in your preparation — concept-check questions
            paired with each Detailed Explainer, or harder ICAI case studies for exam practice.
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-900/40 dark:text-violet-300">
              {QUIZ_CHAPTERS.length} quiz sets
            </span>
            <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-900/40 dark:text-violet-300">
              {totalQuestions} questions total
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              <CheckCircle2 className="h-3 w-3" />
              Explained answers
            </span>
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="container mx-auto max-w-4xl px-4 py-10">
        <div className="grid gap-5 sm:grid-cols-2">

          {/* Detailed Explainer track */}
          <Link
            href="/quiz/detailed-explainer"
            className="group flex flex-col gap-4 rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-500 dark:text-blue-400">
                  Track 1
                </p>
                <h2 className="text-base font-bold leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Detailed Explainer
                </h2>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Concept-check questions paired with each Detailed Explainer. Start here right after
              reading a topic to confirm you have absorbed the key rules.
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {explainerChapters.length} quiz sets
              </span>
              <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {explainerChapters.reduce((s, c) => s + c.questions.length, 0)} questions
              </span>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 font-semibold text-amber-700 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                Medium
              </span>
            </div>

            <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
              Browse quizzes
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* ICAI track */}
          <Link
            href="/quiz/icai"
            className="group flex flex-col gap-4 rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-700"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/30 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/50 transition-colors">
                <GraduationCap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-500 dark:text-orange-400">
                  Track 2
                </p>
                <h2 className="text-base font-bold leading-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  ICAI Study Material
                </h2>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Harder, scenario-based questions drawn from ICAI study material and past exam problems.
              Attempt these once you are comfortable with the underlying concepts.
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 font-semibold text-orange-700 dark:border-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                {icaiChapters.length} quiz set{icaiChapters.length !== 1 ? "s" : ""}
              </span>
              <span className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 font-semibold text-orange-700 dark:border-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                {icaiChapters.reduce((s, c) => s + c.questions.length, 0)} questions
              </span>
              <span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 font-semibold text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
                Hard
              </span>
            </div>

            <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-orange-600 dark:text-orange-400">
              Browse quizzes
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}
