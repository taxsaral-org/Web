import { describe, it, expect } from "vitest";
import { getRuleForYear } from "@taxsaral/tax-rules";
import {
  computeHousePropertyIncome,
  type HpPropertyInput,
  type HpArrearsInput,
} from "../house-property";

const rule = getRuleForYear("TY-2026-27");
const hp = rule.houseProperty;
const TY_END = new Date("2027-03-31");

function makeProperty(
  overrides: Partial<HpPropertyInput> & Pick<HpPropertyInput, "type">
): HpPropertyInput {
  return {
    id: Math.random().toString(36).slice(2),
    label: "Test Property",
    isForeign: false,
    municipalValue: 0,
    fairMarketRent: 0,
    hasStandardRent: false,
    standardRent: 0,
    actualRentReceived: 0,
    unrealisedRent: 0,
    municipalTaxesPaid: 0,
    monthsLetOut: 12,
    vacancyReason: "",
    totalUnits: 2,
    selfOccupiedUnits: 1,
    homeLoanInterest: 0,
    isCoOwned: false,
    ownershipSharePct: 100,
    isDeedDocumented: false,
    isDeemedOwnership: false,
    isLiveApartTransfer: false,
    isMinorMarriedDaughter: false,
    builderCompletionDate: "",
    ...overrides,
  };
}

function makeArrear(
  overrides: Partial<HpArrearsInput> & Pick<HpArrearsInput, "amountReceived">
): HpArrearsInput {
  return {
    id: Math.random().toString(36).slice(2),
    propertyReference: "",
    stillOwner: true,
    ...overrides,
  };
}

// ── GAV: full year let-out ────────────────────────────────────────────────────

describe("GAV — let-out full year (Section 21(1))", () => {
  it("GAV = expected rent when expected > adjusted actual", () => {
    const p = makeProperty({
      type: "let-out-full",
      municipalValue: 400_000,
      fairMarketRent: 500_000,   // expected = max(400k,500k) = 500k
      actualRentReceived: 350_000, // adjusted actual < expected → GAV = 500k
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.expectedRent).toBe(500_000);
    expect(r.adjustedActualRent).toBe(350_000);
    expect(r.grossAnnualValue).toBe(500_000);
    expect(r.sectionApplied).toBe("21(1)");
  });

  it("GAV = adjusted actual rent when actual > expected", () => {
    const p = makeProperty({
      type: "let-out-full",
      municipalValue: 300_000,
      fairMarketRent: 350_000,   // expected = 350k
      actualRentReceived: 480_000, // > expected → GAV = 480k
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.expectedRent).toBe(350_000);
    expect(r.grossAnnualValue).toBe(480_000);
  });

  it("NAV = GAV − municipal taxes, stdDed = 30% of NAV", () => {
    const p = makeProperty({
      type: "let-out-full",
      municipalValue: 400_000,
      fairMarketRent: 400_000,
      actualRentReceived: 400_000,
      municipalTaxesPaid: 30_000,
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.grossAnnualValue).toBe(400_000);
    expect(r.municipalTaxesDeducted).toBe(30_000);
    expect(r.netAnnualValue).toBe(370_000);
    expect(r.standardDeduction).toBe(Math.floor(370_000 * 0.3)); // 111 000
  });
});

// ── GAV: vacancy relief (Section 21(2)) ──────────────────────────────────────

describe("GAV — vacancy relief, Section 21(2)", () => {
  it("Type C: GAV = adjusted actual rent, ignores expected rent", () => {
    const p = makeProperty({
      type: "let-out-partial-vacant",
      municipalValue: 500_000,
      fairMarketRent: 600_000,   // expected = 600k — overridden by vacancy
      actualRentReceived: 250_000,
      monthsLetOut: 5,
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.vacancyReliefApplied).toBe(true);
    expect(r.grossAnnualValue).toBe(250_000);
    expect(r.sectionApplied).toBe("21(2)");
  });

  it("Type E: partly let partly vacant — GAV = actual rent for let period", () => {
    const p = makeProperty({
      type: "partly-let-vacant",
      municipalValue: 480_000,
      fairMarketRent: 520_000,   // expected = 520k — overridden
      actualRentReceived: 240_000, // 6 months rent
      monthsLetOut: 6,
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.vacancyReliefApplied).toBe(true);
    expect(r.grossAnnualValue).toBe(240_000);
    expect(r.sectionApplied).toBe("21(2)");
  });
});

// ── GAV: standard rent cap ───────────────────────────────────────────────────

describe("GAV — standard rent cap (Type F deemed let-out)", () => {
  it("expected rent is capped at standard rent when standard rent < expected", () => {
    const p = makeProperty({
      type: "deemed-let-out",
      municipalValue: 500_000,
      fairMarketRent: 600_000,  // expected = max(500k,600k) = 600k
      hasStandardRent: true,
      standardRent: 450_000,   // cap → effective expected = 450k
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.expectedRent).toBe(450_000);
    expect(r.standardRentCapped).toBe(true);
    expect(r.grossAnnualValue).toBe(450_000);
  });

  it("standard rent > expected: cap does not apply", () => {
    const p = makeProperty({
      type: "deemed-let-out",
      municipalValue: 400_000,
      fairMarketRent: 420_000,  // expected = 420k
      hasStandardRent: true,
      standardRent: 500_000,   // > expected, so no cap
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.expectedRent).toBe(420_000);
    expect(r.standardRentCapped).toBe(false);
    expect(r.grossAnnualValue).toBe(420_000);
  });
});

// ── Unrealised rent ───────────────────────────────────────────────────────────

describe("Unrealised rent deduction from actual rent", () => {
  it("adjusted actual rent = actual − unrealised; affects GAV when actual is higher", () => {
    const p = makeProperty({
      type: "let-out-full",
      municipalValue: 400_000,
      fairMarketRent: 450_000,  // expected = 450k
      actualRentReceived: 500_000,
      unrealisedRent: 100_000,  // adjusted actual = 400k < expected
      // GAV = max(450k, 400k) = 450k
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.adjustedActualRent).toBe(400_000);
    expect(r.grossAnnualValue).toBe(450_000); // expected is now higher
  });

  it("unrealised rent brings adjusted actual below expected: GAV = expected", () => {
    const p = makeProperty({
      type: "let-out-full",
      municipalValue: 300_000,
      fairMarketRent: 300_000,  // expected = 300k
      actualRentReceived: 400_000,
      unrealisedRent: 200_000,  // adjusted = 200k < expected → GAV = 300k
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.adjustedActualRent).toBe(200_000);
    expect(r.grossAnnualValue).toBe(300_000);
  });
});

// ── Municipal taxes payment basis ─────────────────────────────────────────────

describe("Municipal taxes — payment basis deduction", () => {
  it("municipal taxes paid by owner deducted from GAV to derive NAV", () => {
    const p = makeProperty({
      type: "let-out-full",
      municipalValue: 400_000,
      fairMarketRent: 400_000,
      actualRentReceived: 400_000,
      municipalTaxesPaid: 25_000,
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.municipalTaxesDeducted).toBe(25_000);
    expect(r.netAnnualValue).toBe(375_000);
    expect(r.standardDeduction).toBe(Math.floor(375_000 * 0.3));
  });

  it("municipal taxes not deducted for self-occupied (nil AV)", () => {
    const p = makeProperty({ type: "self-occupied", municipalTaxesPaid: 20_000 });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.grossAnnualValue).toBe(0);
    expect(r.municipalTaxesDeducted).toBe(0);
  });
});

// ── Builder inventory (Section 21(5)) ────────────────────────────────────────

describe("Section 21(5) — builder inventory 2-year nil window", () => {
  it("within window: annual value = nil", () => {
    const ccDate = new Date(TY_END);
    ccDate.setFullYear(ccDate.getFullYear() - 1);
    const p = makeProperty({
      type: "builder-inventory",
      municipalValue: 400_000,
      fairMarketRent: 400_000,
      builderCompletionDate: ccDate.toISOString().slice(0, 10),
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.grossAnnualValue).toBe(0);
    expect(r.sectionApplied).toBe("21(5)");
  });

  it("beyond window: treated as deemed let-out using expected rent", () => {
    const ccDate = new Date(TY_END);
    ccDate.setFullYear(ccDate.getFullYear() - 3);
    const p = makeProperty({
      type: "builder-inventory",
      municipalValue: 300_000,
      fairMarketRent: 400_000,
      builderCompletionDate: ccDate.toISOString().slice(0, 10),
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.effectiveType).toBe("deemed-let-out");
    expect(r.grossAnnualValue).toBe(400_000);
  });
});

// ── 2-property self-occupied cap ─────────────────────────────────────────────

describe("Section 21(6)-(7) — self-occupied limit of 2 properties", () => {
  it("1 SO property: nil AV", () => {
    const p = makeProperty({ type: "self-occupied" });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.grossAnnualValue).toBe(0);
    expect(r.isSelfOccupied).toBe(true);
    expect(s.selfOccupiedCount).toBe(1);
  });

  it("2 SO properties: both get nil AV", () => {
    const p1 = makeProperty({ type: "self-occupied", label: "SO-1" });
    const p2 = makeProperty({ type: "self-occupied", label: "SO-2" });
    const s = computeHousePropertyIncome([p1, p2], [], rule, TY_END);
    expect(s.selfOccupiedCount).toBe(2);
    expect(s.propertyResults[0]!.isSelfOccupied).toBe(true);
    expect(s.propertyResults[1]!.isSelfOccupied).toBe(true);
  });

  it("3rd SO property forced to deemed let-out", () => {
    const p1 = makeProperty({ type: "self-occupied", label: "SO-1" });
    const p2 = makeProperty({ type: "self-occupied", label: "SO-2" });
    const p3 = makeProperty({
      type: "self-occupied",
      label: "SO-3",
      municipalValue: 300_000,
      fairMarketRent: 300_000,
    });
    const s = computeHousePropertyIncome([p1, p2, p3], [], rule, TY_END);
    expect(s.selfOccupiedCount).toBe(2);
    const r3 = s.propertyResults[2]!;
    expect(r3.isDeemedLetOutDueToSOCap).toBe(true);
    expect(r3.effectiveType).toBe("deemed-let-out");
    expect(r3.grossAnnualValue).toBe(300_000);
  });

  it("SO interest ≤ ₹2L: full allowed in optional regime", () => {
    const p = makeProperty({ type: "self-occupied", homeLoanInterest: 180_000 });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    expect(s.soInterestAllowedOptional).toBe(180_000);
    expect(s.totalIncomeOptional).toBe(-180_000);
    expect(s.totalIncomeDefault).toBe(0);
  });

  it("SO interest > ₹2L: capped at ₹2L aggregate in optional regime", () => {
    const p = makeProperty({ type: "self-occupied", homeLoanInterest: 300_000 });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    expect(s.soInterestAllowedOptional).toBe(hp.selfOccupiedInterestCapOptional);
    expect(s.totalIncomeOptional).toBe(-200_000);
  });

  it("two SO properties: aggregate ₹2L cap across both", () => {
    const p1 = makeProperty({ type: "self-occupied", homeLoanInterest: 150_000 });
    const p2 = makeProperty({ type: "self-occupied", homeLoanInterest: 150_000 });
    const s = computeHousePropertyIncome([p1, p2], [], rule, TY_END);
    expect(s.totalSoInterestFull).toBe(300_000);
    expect(s.soInterestAllowedOptional).toBe(200_000);
    expect(s.totalIncomeOptional).toBe(-200_000);
  });
});

// ── Co-ownership split (Section 24) ──────────────────────────────────────────

describe("Section 24 — co-ownership split", () => {
  it("60% share: income apportioned to user's share", () => {
    const p = makeProperty({
      type: "let-out-full",
      municipalValue: 600_000,
      fairMarketRent: 600_000,
      actualRentReceived: 600_000,
      isCoOwned: true,
      ownershipSharePct: 60,
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    // NAV=600k, stdDed=180k, rawIncome=420k, share=60% → 252k
    expect(r.coOwnershipShare).toBeCloseTo(0.6);
    expect(r.rawIncomeDefault).toBe(420_000);
    expect(r.yourShareRawDefault).toBeCloseTo(252_000);
  });

  it("100% share: full income (no co-ownership)", () => {
    const p = makeProperty({
      type: "let-out-full",
      municipalValue: 600_000,
      fairMarketRent: 600_000,
      actualRentReceived: 600_000,
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    expect(s.propertyResults[0]!.coOwnershipShare).toBe(1);
    expect(s.propertyResults[0]!.yourShareRawDefault).toBe(420_000);
  });
});

// ── Section 25: deemed ownership and exceptions ───────────────────────────────

describe("Section 25 — deemed ownership", () => {
  it("deemed ownership active: full income attributed despite lower legal title", () => {
    const p = makeProperty({
      type: "let-out-full",
      municipalValue: 600_000,
      fairMarketRent: 600_000,
      actualRentReceived: 600_000,
      isCoOwned: true,
      ownershipSharePct: 50,
      isDeemedOwnership: true,
      isLiveApartTransfer: false,
      isMinorMarriedDaughter: false,
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.isDeemedOwnershipActive).toBe(true);
    expect(r.yourShareRawDefault).toBe(420_000); // 100%, not 50%
  });

  it("exception 1: live-apart agreement — deemed ownership does NOT apply", () => {
    const p = makeProperty({
      type: "let-out-full",
      municipalValue: 600_000,
      fairMarketRent: 600_000,
      actualRentReceived: 600_000,
      isCoOwned: true,
      ownershipSharePct: 50,
      isDeemedOwnership: true,
      isLiveApartTransfer: true, // exception triggers
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.isDeemedOwnershipActive).toBe(false);
    expect(r.yourShareRawDefault).toBeCloseTo(210_000); // 50% of 420k
  });

  it("exception 2: minor married daughter — deemed ownership does NOT apply", () => {
    const p = makeProperty({
      type: "let-out-full",
      municipalValue: 600_000,
      fairMarketRent: 600_000,
      actualRentReceived: 600_000,
      isCoOwned: true,
      ownershipSharePct: 50,
      isDeemedOwnership: true,
      isMinorMarriedDaughter: true, // exception triggers
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.isDeemedOwnershipActive).toBe(false);
    expect(r.yourShareRawDefault).toBeCloseTo(210_000);
  });
});

// ── Section 23: arrears — non-offsettable ─────────────────────────────────────

describe("Section 23 — arrears and recovered unrealised rent", () => {
  it("30% deduction on each arrear item", () => {
    const a = makeArrear({ amountReceived: 200_000 });
    const s = computeHousePropertyIncome([], [a], rule, TY_END);
    expect(s.arrearsDeduction).toBe(60_000);
    expect(s.arrearsNet).toBe(140_000);
    expect(s.arrearsItems[0]!.taxableAmount).toBe(140_000);
  });

  it("multiple arrear entries: aggregate computation", () => {
    const a1 = makeArrear({ amountReceived: 100_000 });
    const a2 = makeArrear({ amountReceived: 50_000 });
    const s = computeHousePropertyIncome([], [a1, a2], rule, TY_END);
    expect(s.arrearsGross).toBe(150_000);
    expect(s.arrearsDeduction).toBe(Math.floor(100_000 * 0.3) + Math.floor(50_000 * 0.3));
    expect(s.arrearsNet).toBe(105_000);
  });

  it("arrears not offsettable against HP losses — added after set-off", () => {
    const so = makeProperty({ type: "self-occupied", homeLoanInterest: 200_000 });
    const a = makeArrear({ amountReceived: 100_000 });
    const s = computeHousePropertyIncome([so], [a], rule, TY_END);
    // HP loss (optional) = -200k; arrears = +70k; these are kept separate
    expect(s.totalIncomeOptional).toBe(-200_000);
    expect(s.arrearsNet).toBe(70_000);
    // hpContributionOptional = -min(200k, 2L cap) + arrears = -200k + 70k = -130k
    expect(s.hpContributionOptional).toBe(-200_000 + 70_000);
  });

  it("stillOwner flag is stored per item but does not affect computation", () => {
    const a1 = makeArrear({ amountReceived: 100_000, stillOwner: false });
    const a2 = makeArrear({ amountReceived: 100_000, stillOwner: true });
    const s = computeHousePropertyIncome([], [a1, a2], rule, TY_END);
    // Taxable regardless of ownership status
    expect(s.arrearsGross).toBe(200_000);
    expect(s.arrearsNet).toBe(140_000);
  });
});

// ── Regime-dependent loss set-off ─────────────────────────────────────────────

describe("Loss set-off — optional vs default regime", () => {
  it("optional: loss up to ₹2L set off; excess carried forward", () => {
    const p = makeProperty({ type: "self-occupied", homeLoanInterest: 350_000 });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    expect(s.totalIncomeOptional).toBe(-200_000); // after SO cap
    expect(s.lossSetOffOptional).toBe(200_000);
    expect(s.lossCarryForwardOptional).toBe(0);
  });

  it("default: full loss carried forward, no set-off", () => {
    const p = makeProperty({
      type: "let-out-full",
      municipalValue: 100_000,
      fairMarketRent: 100_000,
      actualRentReceived: 100_000,
      homeLoanInterest: 400_000,
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    // NAV=100k, stdDed=30k, income=70k−400k = -330k
    expect(s.totalIncomeDefault).toBe(-330_000);
    expect(s.lossSetOffDefault).toBe(0);
    expect(s.lossCarryForwardDefault).toBe(330_000);
    expect(s.hpContributionDefault).toBe(0); // loss not set off
  });

  it("income case: hpContribution = income + arrears", () => {
    const p = makeProperty({
      type: "let-out-full",
      municipalValue: 500_000,
      fairMarketRent: 500_000,
      actualRentReceived: 500_000,
    });
    const a = makeArrear({ amountReceived: 50_000 });
    const s = computeHousePropertyIncome([p], [a], rule, TY_END);
    // NAV=500k, stdDed=150k, income=350k; arrears net=35k
    expect(s.totalIncomeDefault).toBe(350_000);
    expect(s.hpContributionDefault).toBe(350_000 + 35_000);
  });
});

// ── Section 20(2): business use exclusion ────────────────────────────────────

describe("Section 20(2) — business/profession use exclusion", () => {
  it("excluded property contributes zero income", () => {
    const p = makeProperty({ type: "business-use", homeLoanInterest: 100_000 });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.excluded).toBe(true);
    expect(r.grossAnnualValue).toBe(0);
    expect(s.totalIncomeDefault).toBe(0);
    expect(s.totalIncomeOptional).toBe(0);
  });

  it("excluded property does not count toward SO limit", () => {
    const excl = makeProperty({ type: "business-use" });
    const so1 = makeProperty({ type: "self-occupied", label: "SO-1" });
    const so2 = makeProperty({ type: "self-occupied", label: "SO-2" });
    const so3 = makeProperty({
      type: "self-occupied",
      label: "SO-3",
      municipalValue: 200_000,
      fairMarketRent: 200_000,
    });
    const s = computeHousePropertyIncome([excl, so1, so2, so3], [], rule, TY_END);
    expect(s.selfOccupiedCount).toBe(2);
    expect(s.propertyResults[3]!.isDeemedLetOutDueToSOCap).toBe(true);
  });
});

// ── Type D: partly let, partly self-occupied ──────────────────────────────────

describe("Type D — partly let-out, partly self-occupied (different units)", () => {
  it("let-out portion income computed on let-out fraction of property", () => {
    // 2-unit property, 1 let out, 1 self-occupied; let fraction = 0.5
    const p = makeProperty({
      type: "partly-let-self-occ",
      totalUnits: 2,
      selfOccupiedUnits: 1,
      municipalValue: 600_000,    // per property → 300k for let-out portion
      fairMarketRent: 600_000,
      actualRentReceived: 200_000, // only from let-out unit
      municipalTaxesPaid: 40_000,  // total → 20k for let-out portion
      homeLoanInterest: 100_000,   // total → 50k each portion
    });
    const s = computeHousePropertyIncome([p], [], rule, TY_END);
    const r = s.propertyResults[0]!;
    expect(r.isPartlyLetSelfOcc).toBe(true);
    expect(r.letOutFraction).toBeCloseTo(0.5);
    // Let-out: expectedRent=300k, actual=200k → GAV=300k
    // NAV = 300k - 20k = 280k; stdDed=84k; interest=50k → income=146k
    expect(r.rawIncomeDefault).toBe(146_000);
    // Optional: also deducts SO interest (50k, subject to cap)
    expect(r.rawIncomeOptional).toBe(96_000); // 146k - 50k SO interest
    expect(r.soInterestComponent).toBe(50_000);
  });

  it("counts as 1 toward SO limit", () => {
    const typeD = makeProperty({ type: "partly-let-self-occ", totalUnits: 2, selfOccupiedUnits: 1 });
    const so = makeProperty({ type: "self-occupied", label: "SO-2" });
    const so3 = makeProperty({
      type: "self-occupied",
      label: "SO-3",
      municipalValue: 100_000,
      fairMarketRent: 100_000,
    });
    const s = computeHousePropertyIncome([typeD, so, so3], [], rule, TY_END);
    // typeD counts as 1 SO, so counts: 1 + 1 = 2; so3 exceeds limit
    expect(s.selfOccupiedCount).toBe(2);
    expect(s.propertyResults[2]!.isDeemedLetOutDueToSOCap).toBe(true);
  });
});
