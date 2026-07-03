import { describe, it, expect } from "vitest";
import { getRuleForYear } from "@taxsaral/tax-rules";
import { computeIncomeTax } from "../compute-income-tax";
import { computeSurcharge } from "../compute-surcharge";
import { applyRebate } from "../apply-rebate";
import { computeTaxResult } from "../compute-tax-result";
import { compareRegimes } from "../compare-regimes";

const rule = getRuleForYear("TY-2026-27");
const defSlabs = rule.defaultRegimeSlabs;
const optSlabs = rule.optionalRegimeSlabs;

// ─── helpers ────────────────────────────────────────────────────────────────

/** Returns total tax rounded to nearest rupee. */
function totalTax(income: number, deductions: number, regime: "default" | "optional"): number {
  return Math.round(computeTaxResult(income, deductions, regime, rule).totalTax);
}

// ─── computeIncomeTax ───────────────────────────────────────────────────────

describe("computeIncomeTax — default regime slabs", () => {
  it("returns 0 for zero income", () => {
    expect(computeIncomeTax(0, defSlabs)).toBe(0);
  });

  it("returns 0 for negative income", () => {
    expect(computeIncomeTax(-1000, defSlabs)).toBe(0);
  });

  // ── slab boundaries ──

  it("4 L exactly: nil slab, tax = 0", () => {
    expect(computeIncomeTax(400_000, defSlabs)).toBe(0);
  });

  it("4 L + 1: first rupee of 5% slab", () => {
    expect(computeIncomeTax(400_001, defSlabs)).toBeCloseTo(0.05, 1);
  });

  it("8 L exactly: 5% on 4 L = 20,000", () => {
    expect(computeIncomeTax(800_000, defSlabs)).toBe(20_000);
  });

  it("12 L exactly: 20,000 + 40,000 = 60,000", () => {
    expect(computeIncomeTax(1_200_000, defSlabs)).toBe(60_000);
  });

  it("16 L exactly: 60,000 + 60,000 = 1,20,000", () => {
    expect(computeIncomeTax(1_600_000, defSlabs)).toBe(120_000);
  });

  it("20 L exactly: 1,20,000 + 80,000 = 2,00,000", () => {
    expect(computeIncomeTax(2_000_000, defSlabs)).toBe(200_000);
  });

  it("24 L exactly: 2,00,000 + 1,00,000 = 3,00,000", () => {
    expect(computeIncomeTax(2_400_000, defSlabs)).toBe(300_000);
  });

  it("50 L (5 Cr threshold): 3,00,000 + 26 L × 30% = 10,80,000", () => {
    expect(computeIncomeTax(5_000_000, defSlabs)).toBe(1_080_000);
  });

  it("1 Cr: 10,80,000 + 76 L × 30% = 25,80,000", () => {
    expect(computeIncomeTax(10_000_000, defSlabs)).toBe(2_580_000);
  });
});

describe("computeIncomeTax — optional regime slabs", () => {
  it("2.5 L exactly: nil slab, tax = 0", () => {
    expect(computeIncomeTax(250_000, optSlabs)).toBe(0);
  });

  it("5 L exactly: 5% on 2.5 L = 12,500", () => {
    expect(computeIncomeTax(500_000, optSlabs)).toBe(12_500);
  });

  it("10 L exactly: 12,500 + 20% on 5 L = 1,12,500", () => {
    expect(computeIncomeTax(1_000_000, optSlabs)).toBe(112_500);
  });

  it("15 L: 1,12,500 + 30% on 5 L = 2,62,500", () => {
    expect(computeIncomeTax(1_500_000, optSlabs)).toBe(262_500);
  });
});

// ─── computeSurcharge ───────────────────────────────────────────────────────

describe("computeSurcharge", () => {
  it("income ≤ 50 L: no surcharge", () => {
    const tax = computeIncomeTax(5_000_000, defSlabs); // 10,80,000
    expect(computeSurcharge(tax, 5_000_000, rule, defSlabs)).toBe(0);
  });

  it("income = 49,99,999 (just below 50 L): no surcharge", () => {
    const tax = computeIncomeTax(4_999_999, defSlabs);
    expect(computeSurcharge(tax, 4_999_999, rule, defSlabs)).toBe(0);
  });

  it("income = 50 L + 1 rupee: marginal relief caps surcharge to ~₹0.70", () => {
    const tax = computeIncomeTax(5_000_001, defSlabs); // ≈ 10,80,000.30
    const sc = computeSurcharge(tax, 5_000_001, rule, defSlabs);
    // Total tax with surcharge should not exceed IT(50L) + 1 = 10,80,001
    expect(tax + sc).toBeCloseTo(1_080_001, 0);
    expect(sc).toBeLessThan(1); // marginal relief → very small surcharge
  });

  it("income = 51 L: marginal relief reduces surcharge below raw 10%", () => {
    const income = 5_100_000;
    const tax = computeIncomeTax(income, defSlabs); // 11,10,000
    const sc = computeSurcharge(tax, income, rule, defSlabs);
    const rawSc = tax * 0.10; // 1,11,000

    // Marginal relief: total tax ≤ IT(50L) + 1L = 10,80,000 + 1,00,000 = 11,80,000
    expect(tax + sc).toBeCloseTo(1_180_000, 0);
    expect(sc).toBe(70_000); // 11,80,000 − 11,10,000
    expect(sc).toBeLessThan(rawSc);
  });

  it("income = 52 L: beyond marginal-relief zone, full 10% surcharge applies", () => {
    const income = 5_200_000;
    const tax = computeIncomeTax(income, defSlabs); // 11,40,000
    const sc = computeSurcharge(tax, income, rule, defSlabs);
    expect(tax).toBe(1_140_000);
    expect(sc).toBe(114_000); // 10% of 11,40,000 — no marginal relief
  });

  it("income = 1 Cr (exactly): 10% surcharge slab, no marginal relief", () => {
    const tax = computeIncomeTax(10_000_000, defSlabs); // 25,80,000
    const sc = computeSurcharge(tax, 10_000_000, rule, defSlabs);
    expect(sc).toBe(258_000);
  });

  it("income just above 1 Cr: 15% slab with marginal relief", () => {
    const income = 10_000_001;
    const tax = computeIncomeTax(income, defSlabs);
    const sc = computeSurcharge(tax, income, rule, defSlabs);
    // total tax ≤ tax_at_1Cr_with_10% + 1 = 28,38,000 + 1 = 28,38,001
    expect(tax + sc).toBeCloseTo(2_838_001, 0);
  });

  it("income = zero tax: returns 0", () => {
    expect(computeSurcharge(0, 6_000_000, rule)).toBe(0);
  });
});

// ─── applyRebate ────────────────────────────────────────────────────────────

describe("applyRebate — Section 156", () => {
  it("income < 12 L: full rebate (returns entire tax)", () => {
    const tax = 52_500;
    expect(applyRebate(tax, 1_125_000, rule)).toBe(52_500);
  });

  it("income = 12 L exactly: full rebate", () => {
    const tax = 60_000;
    expect(applyRebate(tax, 1_200_000, rule)).toBe(60_000);
  });

  it("income = 12.1 L: marginal relief (rebate = tax − excess)", () => {
    // excess = 10,000, tax = 61,500
    // rebate = 61,500 − 10,000 = 51,500
    expect(applyRebate(61_500, 1_210_000, rule)).toBe(51_500);
  });

  it("income well above 12 L (tax < excess): rebate = 0", () => {
    // At 20 L taxable: tax ≈ 2,00,000; excess = 8,00,000 → rebate = 0
    const tax = computeIncomeTax(2_000_000, defSlabs); // 2,00,000
    const excess = 2_000_000 - 1_200_000; // 8,00,000
    expect(tax).toBeLessThan(excess); // confirm precondition
    expect(applyRebate(tax, 2_000_000, rule)).toBe(0);
  });

  it("with specialRateIncome > 0: no rebate", () => {
    const tax = 52_500;
    expect(applyRebate(tax, 1_125_000, rule, 100_000)).toBe(0);
  });

  it("zero tax: rebate = 0", () => {
    expect(applyRebate(0, 500_000, rule)).toBe(0);
  });
});

// ─── computeTaxResult ───────────────────────────────────────────────────────

describe("computeTaxResult — rebate & marginal relief", () => {
  it("Rs 12 L income, no deductions, default → total tax = 0 (full rebate)", () => {
    const r = computeTaxResult(1_200_000, 0, "default", rule);
    expect(r.totalTax).toBe(0);
    expect(r.rebateApplied).toBe(60_000);
    expect(r.cess).toBe(0);
    expect(r.taxableIncome).toBe(1_200_000);
  });

  it("Rs 12 L income, std deduction 75 K, default → total tax = 0", () => {
    // taxable = 11.25 L ≤ 12 L → full rebate
    const r = computeTaxResult(1_200_000, 75_000, "default", rule);
    expect(r.totalTax).toBe(0);
    expect(r.taxableIncome).toBe(1_125_000);
    expect(r.rebateApplied).toBe(52_500);
  });

  it("Rs 12.1 L income, no deductions, default → marginal relief → total = Rs 10,400", () => {
    const r = computeTaxResult(1_210_000, 0, "default", rule);
    // tax = 61,500; rebate = 51,500; net = 10,000; cess = 400; total = 10,400
    expect(r.taxableIncome).toBe(1_210_000);
    expect(r.taxBeforeCess).toBe(10_000);
    expect(r.cess).toBe(400);
    expect(r.totalTax).toBe(10_400);
    expect(r.rebateApplied).toBe(51_500);
  });

  it("optional regime does NOT apply Section 156 rebate", () => {
    // At taxable < 12 L, optional should still have tax
    const r = computeTaxResult(1_200_000, 0, "optional", rule);
    expect(r.rebateApplied).toBe(0);
    expect(r.totalTax).toBeGreaterThan(0);
  });
});

describe("computeTaxResult — surcharge triggers", () => {
  it("income = 50 L, no deductions, default → no surcharge (at threshold)", () => {
    const r = computeTaxResult(5_000_000, 0, "default", rule);
    expect(r.surcharge).toBe(0);
    expect(r.totalTax).toBe(Math.round(1_080_000 * 1.04));
  });

  it("income = 50 L, 75 K deductions, default → taxable 49.25 L → no surcharge", () => {
    const r = computeTaxResult(5_000_000, 75_000, "default", rule);
    expect(r.surcharge).toBe(0);
    expect(r.taxableIncome).toBe(4_925_000);
  });

  it("income = 51 L, no deductions, default → marginal-relief surcharge = 70,000", () => {
    const r = computeTaxResult(5_100_000, 0, "default", rule);
    expect(r.surcharge).toBe(70_000);
    expect(r.taxBeforeCess).toBe(1_180_000); // 11,10,000 + 70,000
    expect(r.totalTax).toBe(Math.round(1_180_000 * 1.04));
  });

  it("income = 1 Cr, no deductions, default → 10% surcharge = 2,58,000", () => {
    const r = computeTaxResult(10_000_000, 0, "default", rule);
    expect(r.taxableIncome).toBe(10_000_000);
    expect(r.surcharge).toBe(258_000);
    expect(r.taxBeforeCess).toBe(2_838_000);
    expect(r.cess).toBe(113_520);
    expect(r.totalTax).toBe(2_951_520);
    expect(r.effectiveRate).toBeCloseTo(29.5152, 2);
  });

  it("income = 1 Cr, 75 K deductions, default → taxable 99.25 L → 10% surcharge", () => {
    const r = computeTaxResult(10_000_000, 75_000, "default", rule);
    expect(r.taxableIncome).toBe(9_925_000);
    expect(r.surcharge).toBe(255_750); // 25,57,500 × 10%
    expect(r.totalTax).toBe(Math.round(2_813_250 * 1.04));
  });
});

describe("computeTaxResult — regime comparison at fixed income", () => {
  it("at 10 L, zero deductions: default tax = 0 (rebate), optional > 0", () => {
    const def = computeTaxResult(1_000_000, 0, "default", rule);
    const opt = computeTaxResult(1_000_000, 0, "optional", rule);
    expect(def.totalTax).toBe(0);
    expect(opt.totalTax).toBeGreaterThan(0);
  });

  it("at 20 L, max deductions (425 K optional): default still cheaper", () => {
    // Optional: std (50K) + s123 (150K) + s127 (50K) + s130-self (25K) + s71 (200K) = 475K
    const totalOptional = rule.standardDeduction.optional + 150_000 + 50_000 + 25_000 + 200_000;

    const def = computeTaxResult(2_000_000, 75_000, "default", rule);
    const opt = computeTaxResult(2_000_000, totalOptional, "optional", rule);
    // Default slab progression (5/10/15/20/25/30%) is gentler than optional (5/20/30%)
    expect(def.totalTax).toBeLessThan(opt.totalTax);
  });

  it("effectiveRate is between 0 and 100", () => {
    const r = computeTaxResult(5_000_000, 0, "default", rule);
    expect(r.effectiveRate).toBeGreaterThan(0);
    expect(r.effectiveRate).toBeLessThan(100);
  });

  it("zero income: total tax = 0, effective rate = 0", () => {
    const r = computeTaxResult(0, 0, "default", rule);
    expect(r.totalTax).toBe(0);
    expect(r.effectiveRate).toBe(0);
  });

  it("TaxResult has all required fields populated", () => {
    const r = computeTaxResult(5_000_000, 75_000, "default", rule);
    expect(typeof r.grossIncome).toBe("number");
    expect(typeof r.taxableIncome).toBe("number");
    expect(typeof r.taxBeforeCess).toBe("number");
    expect(typeof r.cess).toBe("number");
    expect(typeof r.totalTax).toBe("number");
    expect(typeof r.surcharge).toBe("number");
    expect(typeof r.rebateApplied).toBe("number");
    expect(typeof r.effectiveRate).toBe("number");
    expect(r.regime).toBe("default");
  });
});

// ─── compareRegimes ─────────────────────────────────────────────────────────

describe("compareRegimes", () => {
  it("zero deductions: recommends default at all income levels", () => {
    for (const income of [500_000, 1_000_000, 5_000_000, 10_000_000]) {
      const result = compareRegimes(income, {}, rule);
      expect(result.recommendation).toBe("default");
    }
  });

  it("zero deductions at 10 L: default saves vs optional", () => {
    const result = compareRegimes(1_000_000, {}, rule);
    expect(result.saving).toBeGreaterThan(0); // positive → optional costs more
    expect(result.default.totalTax).toBe(0);
    expect(result.optional.totalTax).toBeGreaterThan(0);
  });

  it("saving = default.totalTax − optional.totalTax", () => {
    const income = 3_000_000;
    const deductions = { section123: 150_000, section127: 50_000 };
    const result = compareRegimes(income, deductions, rule);
    expect(result.saving).toBeCloseTo(
      result.default.totalTax - result.optional.totalTax,
      1
    );
  });

  it("recommendation is whichever regime has lower total tax", () => {
    const result = compareRegimes(10_000_000, {}, rule);
    const cheapest =
      result.default.totalTax <= result.optional.totalTax ? "default" : "optional";
    expect(result.recommendation).toBe(cheapest);
  });

  it("both TaxResult objects have correct regime labels", () => {
    const result = compareRegimes(1_000_000, {}, rule);
    expect(result.default.regime).toBe("default");
    expect(result.optional.regime).toBe("optional");
  });

  it("breakeven is -1 when default is always better (zero deductions)", () => {
    const result = compareRegimes(1_000_000, {}, rule);
    // With zero optional deductions, optional regime is always more expensive
    // due to narrower slabs (5/20/30 vs 5/10/15/20/25/30)
    expect(result.breakeven).toBe(-1);
  });

  it("grossIncome matches income input in both results", () => {
    const income = 2_500_000;
    const result = compareRegimes(income, {}, rule);
    expect(result.default.grossIncome).toBe(income);
    expect(result.optional.grossIncome).toBe(income);
  });
});
