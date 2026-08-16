import Link from "next/link";
import { Brain, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizChapter } from "./quiz-data";

const DIFFICULTY_STYLE = {
  Easy:   "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300",
  Medium: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
  Hard:   "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300",
};

export function ChapterCard({ chapter }: { chapter: QuizChapter }) {
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
