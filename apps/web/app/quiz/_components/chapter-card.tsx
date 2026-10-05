import Link from "next/link";
import type { QuizChapter } from "./quiz-data";

/** One quiz in a track listing. Rendered as a row inside a `divide-y` list. */
export function ChapterCard({ chapter }: { chapter: QuizChapter }) {
  return (
    <Link
      href={`/quiz/${chapter.slug}`}
      className="group grid gap-x-6 gap-y-1 py-5 sm:grid-cols-[1fr_auto]"
    >
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">
          {chapter.chapter} · {chapter.difficulty}
        </p>
        <h2 className="mt-1 text-lg font-semibold leading-snug group-hover:text-primary group-hover:underline underline-offset-4 decoration-1">
          {chapter.title}
        </h2>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {chapter.description}
        </p>
      </div>
      <p className="text-sm text-muted-foreground sm:self-center sm:text-right">
        <span className="font-medium text-foreground">{chapter.questions.length}</span> questions
      </p>
    </Link>
  );
}
