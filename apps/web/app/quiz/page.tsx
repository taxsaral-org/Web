import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
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
const sectionChapters   = QUIZ_CHAPTERS.filter((c) => c.source === "section-identifier");
const timeLimitChapters = QUIZ_CHAPTERS.filter((c) => c.source === "time-limits");

const count = (chapters: typeof QUIZ_CHAPTERS) => chapters.reduce((s, c) => s + c.questions.length, 0);

const TRACKS = [
  {
    href: "/quiz/section-identifier",
    title: "Section Identifier",
    level: "For CA Final",
    meta: `${sectionChapters.length} quizzes · ${count(sectionChapters)} sections`,
    description:
      "See a section number, pick what it deals with, chapter by chapter through the whole Act. Built for getting to grips with the new numbering. Every answer shows the old 1961 section too.",
    cta: "Start drilling",
  },
  {
    href: "/quiz/time-limits",
    title: "Time Limits",
    level: "For CA Final",
    meta: `${timeLimitChapters.length} quiz sets · ${count(timeLimitChapters)} questions`,
    description:
      "The key time limits for assessment, reassessment, appeals, revision and the Dispute Resolution Committee, taken from the text of the Act as amended by the Finance Act, 2026. The wrong options are other real time limits, so you learn to tell them apart.",
    cta: "Start drilling",
  },
  {
    href: "/quiz/detailed-explainer",
    title: "Detailed Explainer",
    level: "Medium",
    meta: `${explainerChapters.length} quiz sets · ${count(explainerChapters)} questions`,
    description:
      "Concept-check questions paired with each Detailed Explainer. Take one right after reading a topic to confirm the key rules have stuck.",
    cta: "Browse quizzes",
  },
  {
    href: "/quiz/icai",
    title: "ICAI Study Material",
    level: "Hard",
    meta: `${icaiChapters.length} quiz set${icaiChapters.length !== 1 ? "s" : ""} · ${count(icaiChapters)} questions`,
    description:
      "Harder, scenario-based questions drawn from ICAI study material and past exam problems. Attempt these once the underlying concepts are comfortable.",
    cta: "Browse quizzes",
  },
];

export default function QuizPage() {
  return (
    <main>
      <PageHeader
        kicker="Income Tax Act 2025 · Practice"
        title="Quiz"
        stats={[
          { value: QUIZ_CHAPTERS.length, label: "quiz sets" },
          { value: count(QUIZ_CHAPTERS), label: "questions" },
        ]}
      >
        <p>
          Pick a track based on where you are in your preparation. Every answer comes with an
          explanation, and questions are shuffled on each attempt so you learn the content, not
          the order.
        </p>
      </PageHeader>

      <section className="container mx-auto max-w-4xl py-10">
        <ol className="divide-y border-y">
          {TRACKS.map(({ href, title, level, meta, description, cta }, i) => (
            <li key={href}>
              <Link href={href} className="group grid gap-x-8 gap-y-2 py-7 sm:grid-cols-[2.5rem_1fr_auto]">
                <span className="font-serif text-2xl text-muted-foreground">{i + 1}</span>
                <div>
                  <h2 className="text-xl font-semibold group-hover:text-primary group-hover:underline underline-offset-4 decoration-1">
                    {title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {level} · {meta}
                  </p>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{description}</p>
                </div>
                <span className="self-center text-sm font-medium text-primary">{cta} →</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
