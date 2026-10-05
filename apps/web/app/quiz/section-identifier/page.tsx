import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
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
      <PageHeader
        kicker={<><Link href="/quiz" className="underline-offset-4 hover:text-foreground hover:underline">Quiz</Link> / For CA Final</>}
        title="Section Identifier"
        stats={[
          { value: chapters.length, label: "quizzes across all 23 chapters" },
          { value: totalQuestions, label: "sections" },
        ]}
      >
        <p>
          Each question shows a section number of the Income Tax Act 2025 and you choose what
          it deals with. Work through the Act chapter by chapter, following its official
          chapters and parts. The wrong options come from neighbouring sections of the same
          chapter, so you learn to tell apart the ones that are easy to confuse. Every answer
          also gives the corresponding section of the Income Tax Act 1961.
        </p>
      </PageHeader>

      {/* Chapter list */}
      <section className="container mx-auto max-w-4xl py-8">
        <div className="grid border-t sm:grid-cols-2 sm:gap-x-10">
          {chapters.map((c) => {
            const cov = c.coverage;
            return (
              <Link
                key={c.slug}
                href={`/quiz/${c.slug}`}
                className="group block border-b py-4"
              >
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    {cov?.label}
                  </p>
                  <p className="mt-0.5 font-medium leading-snug group-hover:text-primary group-hover:underline underline-offset-4">
                    {cov?.title ?? c.topic}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Sections {cov?.from}–{cov?.to} · {c.questions.length} questions{cov?.set ? ` · ${cov.set}` : ""}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          Quizzes follow the official chapters and parts of the Income Tax Act 2025: small
          chapters are taken together and the longest are split into sets. Answers are the
          official section headings, and the old 1961 sections follow ICAI&rsquo;s tabular
          mapping — the same data as the{" "}
          <Link href="/section-mapping" className="text-primary hover:underline">
            1961 → 2025 section mapping
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
