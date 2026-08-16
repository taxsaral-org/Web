import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QUIZ_CHAPTERS } from "../_components/quiz-data";
import { QuizRunner } from "../_components/quiz-runner";

const BASE = "https://taxsaral.org";

export function generateStaticParams() {
  return QUIZ_CHAPTERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = QUIZ_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) return {};
  const url = `${BASE}/quiz/${chapter.slug}`;
  return {
    title: `${chapter.title} Quiz — IT Act 2025 | TaxSaral`,
    description: chapter.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${chapter.title} — Practice Quiz | TaxSaral`,
      description: chapter.description,
      url, type: "website", siteName: "TaxSaral",
    },
    twitter: {
      card: "summary",
      title: `${chapter.title} Quiz | TaxSaral`,
      description: chapter.description,
    },
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = QUIZ_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) notFound();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <QuizRunner chapter={chapter} />
    </div>
  );
}
