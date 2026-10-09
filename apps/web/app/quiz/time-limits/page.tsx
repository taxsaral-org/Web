import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { QUIZ_CHAPTERS } from "../_components/quiz-data";
import { ChapterCard } from "../_components/chapter-card";

const BASE     = "https://taxsaral.org";
const PAGE_URL = `${BASE}/quiz/time-limits`;

export const metadata: Metadata = {
  title: "Time Limits MCQs — Assessment, Appeals, Revision & DRC | IT Act 2025 | TaxSaral",
  description:
    "MCQs on the key time limits for assessment, reassessment, appeals, revision and the Dispute Resolution Committee under the Income-tax Act, 2025, as amended by the Finance Act, 2026. Built for CA Final students.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Time Limits MCQs — IT Act 2025 | TaxSaral",
    description: "Assessment, appeals, revision and DRC time limits under the IT Act 2025, as MCQs with explained answers.",
    url: PAGE_URL, type: "website", siteName: "TaxSaral",
  },
};

const chapters = QUIZ_CHAPTERS.filter((c) => c.source === "time-limits");
const totalQuestions = chapters.reduce((s, c) => s + c.questions.length, 0);

export default function TimeLimitsQuizPage() {
  return (
    <main>
      <PageHeader
        kicker={<><Link href="/quiz" className="underline-offset-4 hover:text-foreground hover:underline">Quiz</Link> / For CA Final</>}
        title="Time limits"
        stats={[
          { value: chapters.length, label: "quiz sets" },
          { value: totalQuestions, label: "questions" },
        ]}
      >
        <p>
          The time limits in the assessment, appeals and revision chapters are among the most
          examined and most easily confused parts of the Act. Each question here is taken from the
          text of the Income-tax Act, 2025 as amended by the Finance Act, 2026, and the wrong
          options are other genuine time limits from the same chapters. Watch whether a limit runs
          from a date, from the end of a month, a quarter or a financial year.
        </p>
      </PageHeader>

      <section className="container mx-auto max-w-4xl py-8">
        <div className="divide-y border-y">
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.slug} chapter={chapter} />
          ))}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          Sources: Income-tax Act, 2025 (Gazette of India, 21 August 2025), sections 268 to 296 and
          356 to 379, as amended by the Finance Act, 2026, which substituted sections 275(4) and
          (14), 280(1)(c), 283, 286(2) and 296(1); and rules 196 to 199 of the Income-tax Rules,
          2026 for the Dispute Resolution Committee. Questions and options are shuffled on every
          attempt.
        </p>
      </section>
    </main>
  );
}
