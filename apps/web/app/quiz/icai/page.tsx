import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
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
      <PageHeader
        kicker={<><Link href="/quiz" className="underline-offset-4 hover:text-foreground hover:underline">Quiz</Link> / Application level</>}
        title="ICAI study material quizzes"
        stats={[
          { value: chapters.length, label: `quiz set${chapters.length !== 1 ? "s" : ""}` },
          { value: totalQuestions, label: "questions" },
        ]}
      >
        <p>
          Scenario-based questions drawn from ICAI study material and past CA exam problems.
          Each one asks you to apply several concepts to a set of facts, so attempt these
          once the underlying rules are comfortable.
        </p>
      </PageHeader>

      {/* Chapter list */}
      <section className="container mx-auto max-w-4xl py-8">
        {chapters.length === 0 ? (
          <div className="rounded-md border border-dashed py-16 text-center text-sm text-muted-foreground">
            ICAI chapters coming soon.
          </div>
        ) : (
          <div className="divide-y border-y">
            {chapters.map((chapter) => (
              <ChapterCard key={chapter.slug} chapter={chapter} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
