import type { TaxRule, TaxResult } from "@taxsaral/types";
import { computeTaxResult } from "./compute-tax-result";

export interface CompareResult {
  default: TaxResult;
  optional: TaxResult;
  /** Positive: optional saves money vs default. Negative: default saves money. */
  saving: number;
  recommendation: "default" | "optional";
  /** Income at which the two regimes produce equal tax; -1 if no crossover exists. */
  breakeven: number;
}

/**
 * Computes tax under both regimes and returns a comparison with recommendation.
 *
 * `deductions` should contain itemised optional-regime deduction amounts keyed by
 * section (e.g. { section123: 150000, section130: 25000 }). Standard deduction
 * for each regime is added automatically.
 *
 * @param income      Gross income (excluding special-rate income)
 * @param deductions  Itemised optional-regime deductions (beyond standard deduction)
 * @param rule        Active TaxRule
 */
export function compareRegimes(
  income: number,
  deductions: Record<string, number>,
  rule: TaxRule
): CompareResult {
  const totalItemised = Object.values(deductions).reduce((s, v) => s + v, 0);

  const defaultResult = computeTaxResult(
    income,
    rule.standardDeduction.default,
    "default",
    rule
  );

  const optionalResult = computeTaxResult(
    income,
    rule.standardDeduction.optional + totalItemised,
    "optional",
    rule
  );

  const saving = defaultResult.totalTax - optionalResult.totalTax;
  const recommendation: "default" | "optional" =
    defaultResult.totalTax <= optionalResult.totalTax ? "default" : "optional";
  const breakeven = findBreakeven(totalItemised, rule);

  return { default: defaultResult, optional: optionalResult, saving, recommendation, breakeven };
}

/**
 * Finds the income level at which default and optional regime taxes are equal.
 * Uses a coarse scan (10 L steps) then binary-searches within the crossing interval.
 * Returns -1 if no crossover is found up to ₹10 Cr.
 */
function findBreakeven(totalItemised: number, rule: TaxRule): number {
  const MAX = 100_000_000; // 10 Cr
  const SCAN_STEP = 1_000_000; // 10 L

  function diff(income: number): number {
    const d = computeTaxResult(income, rule.standardDeduction.default, "default", rule);
    const o = computeTaxResult(
      income,
      rule.standardDeduction.optional + totalItemised,
      "optional",
      rule
    );
    return d.totalTax - o.totalTax; // positive → default costs more → optional better
  }

  // Coarse scan to find the interval where sign flips
  let crossLo = -1;
  let crossHi = -1;
  let prevD = diff(0);

  for (let income = SCAN_STEP; income <= MAX; income += SCAN_STEP) {
    const d = diff(income);
    if (prevD * d < 0) {
      crossLo = income - SCAN_STEP;
      crossHi = income;
      break;
    }
    prevD = d;
  }

  if (crossLo < 0) return -1; // no crossover found

  // Binary search within [crossLo, crossHi]
  for (let i = 0; i < 40; i++) {
    const mid = Math.floor((crossLo + crossHi) / 2);
    if (diff(mid) > 0) {
      crossHi = mid; // default more expensive above mid → crossover is lower
    } else {
      crossLo = mid;
    }
  }

  return Math.round((crossLo + crossHi) / 2);
}
