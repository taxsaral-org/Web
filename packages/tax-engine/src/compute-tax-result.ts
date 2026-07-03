import type { TaxRule, TaxResult } from "@taxsaral/types";
import { computeIncomeTax } from "./compute-income-tax";
import { computeSurcharge } from "./compute-surcharge";
import { applyRebate } from "./apply-rebate";

/**
 * Full pipeline: gross income → taxable income → tax → surcharge →
 * rebate (default regime only) → cess → TaxResult.
 *
 * @param income      Gross income (salary, business, etc.) — excludes special-rate income
 * @param deductions  Total deductions to subtract (standard + itemised, already capped)
 * @param regime      "default" (Section 202) or "optional"
 * @param rule        Active TaxRule from @taxsaral/tax-rules
 * @param specialRateIncome  Capital gains / VDA income taxed at flat rates; disables rebate
 */
export function computeTaxResult(
  income: number,
  deductions: number,
  regime: "default" | "optional",
  rule: TaxRule,
  specialRateIncome = 0
): TaxResult {
  const taxableIncome = Math.max(0, income - deductions);
  const slabs = regime === "default" ? rule.defaultRegimeSlabs : rule.optionalRegimeSlabs;

  const baseTax = computeIncomeTax(taxableIncome, slabs);
  const surcharge = computeSurcharge(baseTax, taxableIncome, rule, slabs);
  const taxPlusSurcharge = round2(baseTax + surcharge);

  const rebateApplied =
    regime === "default"
      ? applyRebate(taxPlusSurcharge, taxableIncome, rule, specialRateIncome)
      : 0;

  const taxAfterRebate = Math.max(0, round2(taxPlusSurcharge - rebateApplied));
  const cess = round2(taxAfterRebate * rule.cess);
  const totalTax = round2(taxAfterRebate + cess);
  const effectiveRate = income > 0 ? round4((totalTax / income) * 100) : 0;

  return {
    grossIncome: income,
    taxableIncome,
    taxBeforeCess: taxAfterRebate,
    cess,
    totalTax,
    regime,
    rebateApplied: round2(rebateApplied),
    surcharge,
    effectiveRate,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}
