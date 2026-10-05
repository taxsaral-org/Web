import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
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
      <PageHeader
        kicker={<><Link href="/quiz" className="underline-offset-4 hover:text-foreground hover:underline">Quiz</Link> / Concept check</>}
        title="Detailed Explainer quizzes"
        stats={[
          { value: chapters.length, label: "quiz sets" },
          { value: totalQuestions, label: "questions" },
        ]}
      >
        <p>
          One quiz per Detailed Explainer topic. The questions test whether the key rules
          (thresholds, conditions and exceptions) have stuck after reading the article.
          Start here if a topic is new to you.
        </p>
      </PageHeader>

      {/* Chapter list */}
      <section className="container mx-auto max-w-4xl py-8">
        <div className="divide-y border-y">
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.slug} chapter={chapter} />
          ))}
        </div>
      </section>
    </main>
  );
}
