"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizChapter, QuizQuestion, QuizSource } from "./quiz-data";
import { newAttempt } from "./quiz-shuffle";

const OPTION_LABELS = ["A", "B", "C", "D"] as const;

const TRACKS: Record<QuizSource, { href: string; label: string }> = {
  "section-identifier": { href: "/quiz/section-identifier", label: "Section Identifier" },
  "detailed-explainer": { href: "/quiz/detailed-explainer", label: "Detailed Explainer" },
  icai:                 { href: "/quiz/icai", label: "ICAI Study Material" },
};

type Phase = "start" | "question" | "results";

interface Answer { selected: number; correct: boolean }

interface Props { chapter: QuizChapter }

export function QuizRunner({ chapter }: Props) {
  const [phase, setPhase]           = useState<Phase>("start");
  const [index, setIndex]           = useState(0);
  const [selected, setSelected]     = useState<number | null>(null);
  const [answers, setAnswers]       = useState<Answer[]>([]);
  // Reshuffled on every Start / Retry. The click happens in the browser, so
  // the server-rendered start screen never depends on the random order.
  const [deck, setDeck]             = useState<QuizQuestion[]>(chapter.questions);

  const q   = deck[index]!;
  const total = deck.length;
  const score = answers.filter((a) => a.correct).length;
  const track = TRACKS[chapter.source];

  function start() {
    setDeck(newAttempt(chapter.questions));
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

  const crumbs = (
    <p className="text-sm text-muted-foreground">
      <Link href="/quiz" className="underline-offset-4 hover:text-foreground hover:underline">Quiz</Link>
      {" / "}
      <Link href={track.href} className="underline-offset-4 hover:text-foreground hover:underline">{track.label}</Link>
    </p>
  );

  // ── Start screen ────────────────────────────────────────────────────────
  if (phase === "start") {
    return (
      <div className="mx-auto max-w-2xl">
        {crumbs}
        <h1 className="mt-3 text-3xl font-semibold leading-tight">{chapter.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{chapter.chapter}</p>

        <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
          {chapter.description}
        </p>

        <p className="mt-6 text-sm text-foreground">
          {total} questions · {chapter.difficulty} · no time limit · every answer explained
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Questions and answer options are shuffled every time you start.
        </p>

        <button
          type="button"
          onClick={start}
          className="mt-8 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Start the quiz
        </button>
      </div>
    );
  }

  // ── Results screen ──────────────────────────────────────────────────────
  if (phase === "results") {
    const pct = Math.round((score / total) * 100);
    const verdict =
      pct >= 80 ? "A strong result."
      : pct >= 60 ? "A good result, with a few sections worth another look."
      : "Worth another attempt once you have gone over the missed ones below.";

    return (
      <div className="mx-auto max-w-2xl">
        {crumbs}
        <h1 className="mt-3 text-3xl font-semibold leading-tight">
          {score} of {total} correct{" "}
          <span className="ml-1 text-xl font-normal text-muted-foreground">({pct}%)</span>
        </h1>
        <p className="mt-2 text-[15px] text-muted-foreground">{verdict}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={start}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Retry in a new order
          </button>
          <Link
            href={track.href}
            className="rounded-md border px-4 py-2 text-sm hover:bg-muted transition-colors"
          >
            Other {track.label} quizzes
          </Link>
        </div>

        <h2 className="mt-12 text-xl font-semibold">Every question, with the answer</h2>
        <ol className="mt-4 divide-y border-y">
          {deck.map((question, i) => {
            const ans = answers[i];
            const isCorrect = ans?.correct ?? false;
            return (
              <li key={question.id} className="flex items-start gap-3 py-4">
                {isCorrect
                  ? <CheckCircle2 aria-label="Correct" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  : <XCircle aria-label="Incorrect" className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                }
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-snug">{question.question}</p>
                  {!isCorrect && ans && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      You chose{" "}
                      <span className="text-red-700 dark:text-red-400">{question.options[ans.selected]}</span>
                      {". "}Answer:{" "}
                      <span className="text-emerald-700 dark:text-emerald-400">{question.options[question.correct]}</span>
                    </p>
                  )}
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {question.explanation}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  // ── Question screen ─────────────────────────────────────────────────────
  const answered = selected !== null;
  const progress = ((index) / total) * 100;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Question {index + 1} of {total}</span>
          <span>{score} correct so far</span>
        </div>
        <div className="h-1 w-full bg-border/60">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {q.section && (
        <p className="mb-2 text-sm text-muted-foreground">{q.section}</p>
      )}
      <p data-quiz="question" className="font-serif text-xl font-semibold leading-snug sm:text-2xl">{q.question}</p>

      {/* Options */}
      <div data-quiz="options" className="mt-6 space-y-2">
        {q.options.map((opt, i) => {
          const isSelected  = selected === i;
          const isCorrect   = i === q.correct;

          let style = "border-border bg-card text-foreground hover:border-foreground/40 cursor-pointer";
          if (answered && isCorrect)
            style = "border-emerald-600 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100";
          else if (answered && isSelected)
            style = "border-red-600 bg-red-50 text-red-950 dark:bg-red-950/30 dark:text-red-100";
          else if (answered)
            style = "border-border bg-transparent text-muted-foreground";

          return (
            <button
              key={i}
              type="button"
              disabled={answered}
              onClick={() => pick(i)}
              className={cn(
                "flex w-full items-start gap-3 rounded-md border px-4 py-3 text-left text-[15px] transition-colors",
                style
              )}
            >
              <span className="w-4 shrink-0 font-medium text-muted-foreground">{OPTION_LABELS[i]}</span>
              <span data-quiz="option-text" className="flex-1 leading-snug">{opt}</span>
              {answered && isCorrect && (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              )}
              {answered && isSelected && !isCorrect && (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation + Next */}
      {answered && (
        <div className="mt-6 space-y-5">
          <div
            data-quiz="verdict"
            className={cn(
              "border-l-2 pl-4",
              selected === q.correct ? "border-emerald-600" : "border-red-600"
            )}
          >
            <p className={cn(
              "text-sm font-semibold",
              selected === q.correct ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"
            )}>
              {selected === q.correct ? "Correct." : `Not quite. The answer is ${OPTION_LABELS[q.correct]}.`}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{q.explanation}</p>
          </div>

          <button
            type="button"
            onClick={next}
            className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {index + 1 >= total ? "See your results" : "Next question"}
          </button>
        </div>
      )}

      <p className="mt-12 text-xs text-muted-foreground">
        <Link href={track.href} className="underline-offset-4 hover:text-foreground hover:underline">
          Leave this quiz
        </Link>
      </p>
    </div>
  );
}
