import { describe, it, expect } from "vitest";
import { getRuleForYear, RULES_TY_2026_27 } from "../index";

// ─── helpers ─────────────────────────────────────────────────────────────────

function isContiguous(slabs: typeof RULES_TY_2026_27.defaultRegimeSlabs): boolean {
  for (let i = 1; i < slabs.length; i++) {
    if (slabs[i]!.from !== slabs[i - 1]!.to) return false;
  }
  return true;
}

// ─── tests ───────────────────────────────────────────────────────────────────

describe("getRuleForYear", () => {
  it("returns the TY-2026-27 rule object", () => {
    const rule = getRuleForYear("TY-2026-27");
    expect(rule).toBeDefined();
    expect(rule.taxYear).toBe("TY-2026-27");
  });

  it("throws a descriptive error for an unknown year", () => {
    expect(() => getRuleForYear("TY-2025-26")).toThrow(/TY-2025-26/);
    expect(() => getRuleForYear("TY-2025-26")).toThrow(/TY-2026-27/); // lists available
  });
});

describe("TY-2026-27 — required fields", () => {
  const rule = getRuleForYear("TY-2026-27");

  it("has all top-level required fields", () => {
    expect(rule.taxYear).toBeDefined();
    expect(rule.governingAct).toBeDefined();
    expect(rule.defaultRegimeSlabs).toBeDefined();
    expect(rule.optionalRegimeSlabs).toBeDefined();
    expect(rule.surchargeSlabs).toBeDefined();
    expect(rule.cess).toBeDefined();
    expect(rule.rebate).toBeDefined();
    expect(rule.standardDeduction).toBeDefined();
    expect(rule.deductions).toBeDefined();
    expect(rule.capitalGains).toBeDefined();
    expect(rule.hraMetroCities).toBeDefined();
    expect(rule.sections).toBeDefined();
    expect(rule.forms).toBeDefined();
  });

  it("governs the Income Tax Act 2025", () => {
    expect(rule.governingAct).toBe("2025");
  });
});

describe("TY-2026-27 — Section 156 rebate", () => {
  const { rebate } = getRuleForYear("TY-2026-27");

  it('uses section "156", NOT "158"', () => {
    expect(rebate.section).toBe("156");
    expect(rebate.section).not.toBe("158");
  });

  it("income limit is ₹12,00,000", () => {
    expect(rebate.limit).toBe(1_200_000);
  });

  it("maxRebate is Infinity (full tax rebate — no rupee cap)", () => {
    expect(rebate.maxRebate).toBe(Infinity);
  });
});

describe("TY-2026-27 — default regime slabs (Section 202)", () => {
  const { defaultRegimeSlabs: slabs } = getRuleForYear("TY-2026-27");

  it("has exactly 7 slabs", () => {
    expect(slabs).toHaveLength(7);
  });

  it("starts at ₹0 with nil rate", () => {
    expect(slabs[0]).toEqual({ from: 0, to: 400_000, rate: 0 });
  });

  it("has correct slab boundaries and rates", () => {
    expect(slabs[1]).toEqual({ from: 400_000,   to: 800_000,    rate: 0.05 });
    expect(slabs[2]).toEqual({ from: 800_000,   to: 1_200_000,  rate: 0.10 });
    expect(slabs[3]).toEqual({ from: 1_200_000, to: 1_600_000,  rate: 0.15 });
    expect(slabs[4]).toEqual({ from: 1_600_000, to: 2_000_000,  rate: 0.20 });
    expect(slabs[5]).toEqual({ from: 2_000_000, to: 2_400_000,  rate: 0.25 });
    expect(slabs[6]).toEqual({ from: 2_400_000, to: null,       rate: 0.30 });
  });

  it("slabs are contiguous — each 'from' equals the previous 'to'", () => {
    expect(isContiguous(slabs)).toBe(true);
  });

  it("last slab has no upper bound (to: null)", () => {
    expect(slabs.at(-1)!.to).toBeNull();
  });

  it("rates increase monotonically", () => {
    for (let i = 1; i < slabs.length; i++) {
      expect(slabs[i]!.rate).toBeGreaterThanOrEqual(slabs[i - 1]!.rate);
    }
  });
});

describe("TY-2026-27 — optional regime slabs", () => {
  const { optionalRegimeSlabs: slabs } = getRuleForYear("TY-2026-27");

  it("has exactly 4 slabs", () => {
    expect(slabs).toHaveLength(4);
  });

  it("has correct slab boundaries and rates", () => {
    expect(slabs[0]).toEqual({ from: 0,          to: 250_000,   rate: 0.00 });
    expect(slabs[1]).toEqual({ from: 250_000,     to: 500_000,   rate: 0.05 });
    expect(slabs[2]).toEqual({ from: 500_000,     to: 1_000_000, rate: 0.20 });
    expect(slabs[3]).toEqual({ from: 1_000_000,   to: null,      rate: 0.30 });
  });

  it("slabs are contiguous", () => {
    expect(isContiguous(slabs)).toBe(true);
  });

  it("last slab has no upper bound (to: null)", () => {
    expect(slabs.at(-1)!.to).toBeNull();
  });
});

describe("TY-2026-27 — surcharge slabs", () => {
  const { surchargeSlabs: slabs } = getRuleForYear("TY-2026-27");

  it("has exactly 5 slabs", () => {
    expect(slabs).toHaveLength(5);
  });

  it("nil surcharge up to ₹50 L", () => {
    expect(slabs[0]).toEqual({ from: 0, to: 5_000_000, rate: 0 });
  });

  it("top slab is 37% above ₹5 Cr", () => {
    expect(slabs.at(-1)).toEqual({ from: 50_000_000, to: null, rate: 0.37 });
  });

  it("slabs are contiguous", () => {
    expect(isContiguous(slabs)).toBe(true);
  });
});

describe("TY-2026-27 — cess", () => {
  it("is exactly 4%", () => {
    expect(getRuleForYear("TY-2026-27").cess).toBe(0.04);
  });
});

describe("TY-2026-27 — standard deduction", () => {
  const { standardDeduction } = getRuleForYear("TY-2026-27");

  it("is ₹75,000 for the default regime", () => {
    expect(standardDeduction.default).toBe(75_000);
  });

  it("is ₹50,000 for the optional regime", () => {
    expect(standardDeduction.optional).toBe(50_000);
  });
});

describe("TY-2026-27 — capital gains", () => {
  const { capitalGains } = getRuleForYear("TY-2026-27");

  it("STCG u/s 196 rate is 20%", () => {
    expect(capitalGains.stcg196).toBe(0.20);
  });

  it("LTCG u/s 197 (general) rate is 12.5%", () => {
    expect(capitalGains.ltcg197).toBe(0.125);
  });

  it("LTCG u/s 198 (equity STT) rate is 12.5%", () => {
    expect(capitalGains.ltcg198).toBe(0.125);
  });

  it("LTCG u/s 198 exemption is ₹1,25,000", () => {
    expect(capitalGains.ltcgExemption198).toBe(125_000);
  });

  it("capital gains surcharge is capped at 25%", () => {
    expect(capitalGains.cgSurchargeCap).toBe(0.25);
  });
});

describe("TY-2026-27 — HRA metro cities", () => {
  const { hraMetroCities } = getRuleForYear("TY-2026-27");

  it("has exactly 8 metro cities", () => {
    expect(hraMetroCities).toHaveLength(8);
  });

  it("contains all 8 specified cities", () => {
    expect(hraMetroCities).toContain("Delhi");
    expect(hraMetroCities).toContain("Mumbai");
    expect(hraMetroCities).toContain("Kolkata");
    expect(hraMetroCities).toContain("Chennai");
    expect(hraMetroCities).toContain("Bangalore");
    expect(hraMetroCities).toContain("Pune");
    expect(hraMetroCities).toContain("Hyderabad");
    expect(hraMetroCities).toContain("Ahmedabad");
  });
});

describe("TY-2026-27 — sections map", () => {
  const { sections } = getRuleForYear("TY-2026-27");

  it("has all required section keys with correct values", () => {
    expect(sections["newRegime"]).toBe("202");
    expect(sections["rebate"]).toBe("156");
    expect(sections["s80C"]).toBe("123");
    expect(sections["tds"]).toBe("393");
    expect(sections["homeLoanInterest"]).toBe("71");
    expect(sections["capitalGainsSTCG"]).toBe("196");
    expect(sections["capitalGainsLTCG"]).toBe("197");
    expect(sections["capitalGainsLTCGEquity"]).toBe("198");
  });

  it("rebate section is 156, not 158", () => {
    expect(sections["rebate"]).toBe("156");
    expect(sections["rebate"]).not.toBe("158");
  });
});

describe("TY-2026-27 — forms map", () => {
  const { forms } = getRuleForYear("TY-2026-27");

  it("has all required form entries", () => {
    expect(forms["tdsCertificate"]).toBe("Form 130");
    expect(forms["taxCreditStatement"]).toBe("Form 168");
    expect(forms["taxAuditReport"]).toBe("Form 26");
  });
});

describe("TY-2026-27 — deductions", () => {
  const { deductions } = getRuleForYear("TY-2026-27");

  it("Section 123 (80C) limit is ₹1,50,000", () => {
    expect(deductions["section123"]).toBe(150_000);
  });

  it("Section 127 (NPS extra) limit is ₹50,000", () => {
    expect(deductions["section127"]).toBe(50_000);
  });

  it("Section 149 (savings interest) limit is ₹10,000", () => {
    expect(deductions["section149"]).toBe(10_000);
  });

  it("Section 150 (senior citizen interest) limit is ₹50,000", () => {
    expect(deductions["section150"]).toBe(50_000);
  });

  it("VDA/crypto rate is 30% with no set-off", () => {
    const vda = deductions["vda"] as { rate: number; setOffAllowed: boolean };
    expect(vda.rate).toBe(0.30);
    expect(vda.setOffAllowed).toBe(false);
  });
});
