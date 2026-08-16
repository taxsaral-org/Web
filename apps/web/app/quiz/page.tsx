import type { Metadata } from "next";
import Link from "next/link";
import { Brain, ArrowRight, BookOpen, GraduationCap, CheckCircle2 } from "lucide-react";
import { QUIZ_CHAPTERS, DIFFICULTY_ORDER } from "./_components/quiz-data";
import { cn } from "@/lib/utils";

const BASE     = "https://taxsaral.org";
const PAGE_URL = `${BASE}/quiz`;

export const metadata: Metadata = {
  title: "Income Tax Quiz — Test Your IT Act 2025 Knowledge | TaxSaral",
  description:
    "Chapter-wise multiple choice quizzes on the Income Tax Act 2025. Concept-check questions from our Detailed Explainers plus advanced case studies from ICAI study material.",
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

const DIFFICULTY_STYLE = {
  Easy:   "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300",
  Medium: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
  Hard:   "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300",
};

const explainerChapters = [...QUIZ_CHAPTERS.filter((c) => c.source === "detailed-explainer")].sort(
  (a, b) => DIFFICULTY_ORDER.indexOf(a.difficulty) - DIFFICULTY_ORDER.indexOf(b.difficulty)
);

const icaiChapters = [...QUIZ_CHAPTERS.filter((c) => c.source === "icai")].sort(
  (a, b) => DIFFICULTY_ORDER.indexOf(a.difficulty) - DIFFICULTY_ORDER.indexOf(b.difficulty)
);

function ChapterCard({ chapter }: { chapter: (typeof QUIZ_CHAPTERS)[0] }) {
  return (
    <Link
      href={`/quiz/${chapter.slug}`}
      className="group flex items-start gap-4 rounded-xl border bg-card p-5 transition-all hover:shadow-md hover:bg-muted/10"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
        <Brain className="h-5 w-5 text-primary" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {chapter.chapter}
          </span>
          <span className={cn(
            "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold",
            DIFFICULTY_STYLE[chapter.difficulty]
          )}>
            {chapter.difficulty}
          </span>
        </div>

        <h2 className="text-base font-semibold leading-snug group-hover:text-primary transition-colors">
          {chapter.title}
        </h2>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {chapter.description}
        </p>

        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span>
            <span className="font-semibold text-foreground">{chapter.questions.length}</span> questions
          </span>
          <span>No time limit</span>
          <span>Explained answers</span>
        </div>
      </div>

      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
    </Link>
  );
}

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
            Two tracks to choose from — concept-check quizzes linked directly to each Detailed
            Explainer, and advanced application-level case studies from ICAI study material.
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

      <div className="container mx-auto max-w-4xl px-4 py-10 space-y-12">

        {/* ── Section 1: Detailed Explainer Quizzes ────────────────────── */}
        <section>
          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/30">
              <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Detailed Explainer — Concept Check</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                One quiz per topic, paired with the Detailed Explainer for that section. Start here
                if you just finished reading — these questions test whether you absorbed the key rules.
              </p>
            </div>
          </div>

          {explainerChapters.length === 0 ? (
            <p className="text-sm text-muted-foreground">No chapters yet.</p>
          ) : (
            <div className="space-y-3">
              {explainerChapters.map((chapter) => (
                <ChapterCard key={chapter.slug} chapter={chapter} />
              ))}
            </div>
          )}
        </section>

        {/* ── Section 2: ICAI Study Material ────────────────────────────── */}
        <section>
          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/30">
              <GraduationCap className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold">ICAI Study Material — Application Level</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Harder, scenario-based questions drawn directly from ICAI study material and past
                exam problems. Attempt these once you are comfortable with the underlying concepts.
              </p>
            </div>
          </div>

          {icaiChapters.length === 0 ? (
            <p className="text-sm text-muted-foreground">ICAI chapters coming soon.</p>
          ) : (
            <div className="space-y-3">
              {icaiChapters.map((chapter) => (
                <ChapterCard key={chapter.slug} chapter={chapter} />
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
