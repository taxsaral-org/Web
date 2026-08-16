"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2, XCircle, ArrowRight, RotateCcw,
  BookOpen, Trophy, ChevronRight, ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizChapter } from "./quiz-data";

const OPTION_LABELS = ["A", "B", "C", "D"] as const;

const DIFFICULTY_STYLE = {
  Easy:   "bg-emerald-100 text-emerald-800 border-emerald-200",
  Medium: "bg-amber-100 text-amber-800 border-amber-200",
  Hard:   "bg-red-100 text-red-800 border-red-200",
};

type Phase = "start" | "question" | "results";

interface Answer { selected: number; correct: boolean }

interface Props { chapter: QuizChapter }

export function QuizRunner({ chapter }: Props) {
  const [phase, setPhase]           = useState<Phase>("start");
  const [index, setIndex]           = useState(0);
  const [selected, setSelected]     = useState<number | null>(null);
  const [answers, setAnswers]       = useState<Answer[]>([]);

  const q   = chapter.questions[index]!;
  const total = chapter.questions.length;
  const score = answers.filter((a) => a.correct).length;

  function start() {
    setPhase("question");
    setIndex(0);
    setSelected(null);
    setAnswers([]);
  }

  function pick(i: number) {
    if (selected !== null) return;
    setSelected(i);
    setAnswers((prev) => [...prev, { selected: i, correct: i === q.correct }]);
  }

  function next() {
    if (index + 1 >= total) {
      setPhase("results");
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  }

  // ── Start screen ────────────────────────────────────────────────────────
  if (phase === "start") {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </div>

          <span className={cn(
            "mb-3 inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold",
            DIFFICULTY_STYLE[chapter.difficulty]
          )}>
            {chapter.difficulty}
          </span>

          <h1 className="mt-2 text-xl font-bold leading-snug sm:text-2xl">
            {chapter.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{chapter.chapter}</p>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-md mx-auto">
            {chapter.description}
          </p>

          <div className="mt-6 flex justify-center gap-6 text-sm text-muted-foreground">
            <span><span className="font-semibold text-foreground">{total}</span> questions</span>
            <span><span className="font-semibold text-foreground">No time limit</span></span>
            <span><span className="font-semibold text-foreground">Explained</span> answers</span>
          </div>

          <button
            type="button"
            onClick={start}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Start Quiz
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // ── Results screen ──────────────────────────────────────────────────────
  if (phase === "results") {
    const pct = Math.round((score / total) * 100);
    const grade =
      pct >= 80 ? { label: "Excellent!", color: "text-emerald-600", icon: "🏆" }
      : pct >= 60 ? { label: "Good effort!", color: "text-blue-600", icon: "👍" }
      : { label: "Keep practising!", color: "text-amber-600", icon: "📖" };

    return (
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Score card */}
        <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
          <div className="mb-3 text-4xl">{grade.icon}</div>
          <h2 className={cn("text-2xl font-bold", grade.color)}>{grade.label}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            You scored <span className="font-semibold text-foreground">{score}</span> out of{" "}
            <span className="font-semibold text-foreground">{total}</span>
          </p>

          {/* Progress ring substitute — simple bar */}
          <div className="mt-5 flex items-center justify-center">
            <div className="relative h-28 w-28">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor"
                  strokeWidth="2" className="text-border" />
                <circle cx="18" cy="18" r="15.9" fill="none"
                  stroke={pct >= 80 ? "#10b981" : pct >= 60 ? "#3b82f6" : "#f59e0b"}
                  strokeWidth="2.5"
                  strokeDasharray={`${pct} ${100 - pct}`}
                  strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{pct}%</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Retry
            </button>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              All Quizzes
            </Link>
          </div>
        </div>

        {/* Answer breakdown */}
        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="border-b px-5 py-3 text-sm font-semibold">Answer breakdown</div>
          <div className="divide-y">
            {chapter.questions.map((question, i) => {
              const ans = answers[i];
              const isCorrect = ans?.correct ?? false;
              return (
                <div key={question.id} className="flex items-start gap-3 px-5 py-4">
                  {isCorrect
                    ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  }
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug">{question.question}</p>
                    {!isCorrect && ans && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Your answer:{" "}
                        <span className="text-red-500">{question.options[ans.selected]}</span>
                        {" · "}Correct:{" "}
                        <span className="text-emerald-600">{question.options[question.correct]}</span>
                      </p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── Question screen ─────────────────────────────────────────────────────
  const answered = selected !== null;
  const progress = ((index) / total) * 100;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Question {index + 1} of {total}</span>
          <span>{score} correct so far</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-border/40">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="rounded-2xl border bg-card shadow-sm">
        {/* Header */}
        <div className="border-b px-6 py-4">
          {q.section && (
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-primary/70">
              {q.section}
            </p>
          )}
          <p className="text-base font-semibold leading-snug sm:text-lg">{q.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-2.5 p-6">
          {q.options.map((opt, i) => {
            const isSelected  = selected === i;
            const isCorrect   = i === q.correct;
            const showResult  = answered;

            let style = "border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/5";
            if (showResult && isCorrect)
              style = "border-emerald-400 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200";
            else if (showResult && isSelected && !isCorrect)
              style = "border-red-400 bg-red-50 text-red-900 dark:bg-red-950/30 dark:text-red-200";
            else if (!showResult)
              style = "border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/5 cursor-pointer";
            else
              style = "border-border bg-muted/20 text-muted-foreground";

            return (
              <button
                key={i}
                type="button"
                disabled={answered}
                onClick={() => pick(i)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-colors",
                  style,
                  !answered && "active:scale-[0.99]"
                )}
              >
                <span className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                  showResult && isCorrect
                    ? "border-emerald-400 bg-emerald-400 text-white"
                    : showResult && isSelected && !isCorrect
                    ? "border-red-400 bg-red-400 text-white"
                    : "border-border bg-muted/40"
                )}>
                  {OPTION_LABELS[i]}
                </span>
                <span className="flex-1 leading-snug">{opt}</span>
                {showResult && isCorrect && (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation + Next */}
        {answered && (
          <div className="border-t px-6 pb-6 pt-4 space-y-4">
            <div className={cn(
              "rounded-xl border px-4 py-3",
              selected === q.correct
                ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/20"
                : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20"
            )}>
              <div className="flex items-center gap-2 mb-1.5">
                {selected === q.correct
                  ? <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  : <XCircle className="h-4 w-4 text-red-600" />
                }
                <span className={cn(
                  "text-xs font-semibold",
                  selected === q.correct ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"
                )}>
                  {selected === q.correct ? "Correct!" : `Incorrect — correct answer: ${OPTION_LABELS[q.correct]}`}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{q.explanation}</p>
            </div>

            <button
              type="button"
              onClick={next}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {index + 1 >= total ? (
                <><Trophy className="h-4 w-4" /> View Results</>
              ) : (
                <>Next Question <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Back link */}
      <div className="mt-6">
        <Link
          href="/quiz"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to all quizzes
        </Link>
      </div>
    </div>
  );
}
