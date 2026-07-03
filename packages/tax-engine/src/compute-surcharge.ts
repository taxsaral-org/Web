import type { TaxSlab, TaxRule } from "@taxsaral/types";
import { computeIncomeTax } from "./compute-income-tax";

/**
 * Returns the surcharge amount on the given base tax.
 *
 * Surcharge rate is determined by totalIncome (after deductions).
 * Marginal relief is applied at each threshold so that crossing a surcharge
 * band never raises total tax by more than the additional income.
 *
 * Pass `slabs` (the same income slabs used to compute `tax`) to enable
 * marginal relief. Without slabs, raw surcharge is returned.
 */
export function computeSurcharge(
  tax: number,
  totalIncome: number,
  rule: TaxRule,
  slabs?: TaxSlab[]
): number {
  if (tax <= 0 || totalIncome <= 0) return 0;

  const { surchargeSlabs } = rule;
  const idx = findSurchargeSlabIndex(totalIncome, surchargeSlabs);

  if (idx < 0) return 0;

  const applicableSlab = surchargeSlabs[idx]!;
  if (applicableSlab.rate === 0) return 0;

  const rawSurcharge = tax * applicableSlab.rate;

  // Marginal relief requires the income slabs to compute tax at the threshold
  if (!slabs || idx === 0) return round2(rawSurcharge);

  const prevSlab = surchargeSlabs[idx - 1]!;
  const threshold = applicableSlab.from;

  // Total tax payable at the lower threshold (with previous slab's surcharge rate)
  const taxAtThreshold = computeIncomeTax(threshold, slabs);
  const totalTaxAtThreshold = taxAtThreshold * (1 + prevSlab.rate);

  const excessIncome = totalIncome - threshold;
  const totalTaxWithout = tax + rawSurcharge;
  const totalTaxCap = totalTaxAtThreshold + excessIncome;

  if (totalTaxWithout <= totalTaxCap) return round2(rawSurcharge);

  // Cap the total tax and derive effective surcharge
  const effectiveSurcharge = Math.max(0, totalTaxCap - tax);
  return round2(effectiveSurcharge);
}

/**
 * Finds which surcharge slab applies to `income`.
 *
 * Convention (mirrors Indian tax law "exceeds X"):
 *  - Lower bound: income > slab.from  (strictly greater, so 50 L exactly → 0% slab)
 *  - Upper bound: income <= slab.to   (inclusive, so 1 Cr exactly → 10% slab, not 15%)
 *  - First slab (from === 0): always qualifies at the lower bound
 */
function findSurchargeSlabIndex(income: number, slabs: TaxSlab[]): number {
  for (let i = 0; i < slabs.length; i++) {
    const slab = slabs[i]!;
    const meetsLower = slab.from === 0 ? true : income > slab.from;
    const meetsUpper = slab.to === null || income <= slab.to;
    if (meetsLower && meetsUpper) return i;
  }
  return -1;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
