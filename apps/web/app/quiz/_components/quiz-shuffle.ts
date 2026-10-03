// Per-attempt shuffling for the quiz runner, so a returning student never
// meets the questions — or the answer positions — in a familiar order.

import type { QuizQuestion } from "./quiz-data";

// Options that point at other options ("All of the above", "Both A and B")
// only make sense in their written order, so such questions keep it.
const ORDER_BOUND =
  /\b(all|none|both|neither) of (the )?(above|these|them)\b|\b(options?|choices?)\s+\(?[a-d]\)?(?![\w(])|^\s*\(?[a-d]\)?\s*(and|&|or)\s*\(?[a-d]\)?\s*$/i;

export function shuffled<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

/** The questions in a new random order, each with its options reshuffled. */
export function newAttempt(
  questions: readonly QuizQuestion[],
  random: () => number = Math.random,
): QuizQuestion[] {
  return shuffled(questions, random).map((q) => {
    if (q.options.some((o) => ORDER_BOUND.test(o))) return q;
    const order = shuffled([0, 1, 2, 3], random);
    return {
      ...q,
      options: order.map((i) => q.options[i]!) as QuizQuestion["options"],
      correct: order.indexOf(q.correct) as QuizQuestion["correct"],
    };
  });
}
