import type { TaxRule } from "@taxsaral/types";

/**
 * Returns the rebate amount to be subtracted from (tax + surcharge).
 *
 * Section 156 — default regime only, does NOT apply when special-rate
 * income exists (capital gains u/s 196/197/198 or VDA/crypto income).
 *
 * Full rebate:      taxableIncome <= rule.rebate.limit  → entire tax is rebated
 * Marginal relief:  taxableIncome slightly above limit  → tax capped at excess income
 *                   i.e. rebate = max(0, tax − (taxableIncome − limit))
 *
 * @param tax               Tax + surcharge (before cess)
 * @param taxableIncome     Income after deductions
 * @param rule              Active TaxRule
 * @param specialRateIncome Total special-rate income (CG/VDA); defaults to 0
 */
export function applyRebate(
  tax: number,
  taxableIncome: number,
  rule: TaxRule,
  specialRateIncome = 0
): number {
  // No rebate when special-rate income is present
  if (specialRateIncome > 0) return 0;

  const { limit } = rule.rebate;

  // Full rebate: income within the Section 156 limit
  if (taxableIncome <= limit) return tax;

  // Marginal relief: post-rebate tax cannot exceed the excess above the limit
  const excessIncome = taxableIncome - limit;
  return Math.max(0, tax - excessIncome);
}
