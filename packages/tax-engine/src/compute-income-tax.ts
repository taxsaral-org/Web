import type { TaxSlab } from "@taxsaral/types";

/**
 * Applies progressive income tax slabs and returns tax before surcharge and cess.
 * Handles the nil-slab correctly — only income above each slab.from is taxed.
 */
export function computeIncomeTax(taxableIncome: number, slabs: TaxSlab[]): number {
  if (taxableIncome <= 0) return 0;

  let tax = 0;
  for (const slab of slabs) {
    if (taxableIncome <= slab.from) break; // no income falls in this or later slabs
    const ceiling = slab.to ?? taxableIncome;
    const amountInSlab = Math.min(taxableIncome, ceiling) - slab.from;
    tax += amountInSlab * slab.rate;
  }

  return round2(tax);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
