// Section 6, Income Tax Act 2025 — Residential Status unit tests
// 17 test cases verifying final status AND determinative sub-section.

import { describe, it, expect } from "vitest";
import { getRuleForYear } from "@taxsaral/tax-rules";
import { determineResidentialStatus } from "../residential-status";
import type { ResidentialStatusInput } from "../residential-status";

const rule = getRuleForYear("TY-2026-27");

// Helper: builds an input with safe NOR defaults (won't trigger RNOR) unless overridden.
function make(overrides: Partial<ResidentialStatusInput>): ResidentialStatusInput {
  return {
    citizenship: "indian",
    daysInIndiaThisYear: 0,
    daysInIndiaPrior4Years: 0,
    leftAsIndianShipCrew: false,
    leftForEmploymentAbroad: false,
    isCrewOfForeignBoundShip: false,
    isVisitorFromAbroad: false,
    totalIncomeExclForeignSources: 0,
    liableToTaxInAnotherCountry: false,
    // Safe defaults: long-term resident history — won't trigger any 6(13) RNOR conditions
    yearsNonResidentIn10Preceding: 0,   // < 9 → 6(13)(a)(i) not met
    daysInIndiaOver7PrecedingYears: 1000, // > 729 → 6(13)(a)(ii) not met
    ...overrides,
  };
}

describe("Section 6 — Residential Status", () => {

  // ── TC1 ──────────────────────────────────────────────────────────────────
  // Foreign national, 200 days → 6(2)(a) met → ROR (long residency history)
  it("TC1: foreign national, 200 days → ROR [6(2)(a)]", () => {
    const r = determineResidentialStatus(
      make({ citizenship: "foreign", daysInIndiaThisYear: 200 }),
      rule
    );
    expect(r.status).toBe("ROR");
    expect(r.determinativeSubsection).toBe("6(2)(a)");
  });

  // ── TC2 ──────────────────────────────────────────────────────────────────
  // Foreign national, 100 days, 400 over prior 4 → 6(2)(b) met (60+365) → ROR
  it("TC2: foreign national, 100 days, 400 prior-4 → ROR [6(2)(b)]", () => {
    const r = determineResidentialStatus(
      make({ citizenship: "foreign", daysInIndiaThisYear: 100, daysInIndiaPrior4Years: 400 }),
      rule
    );
    expect(r.status).toBe("ROR");
    expect(r.determinativeSubsection).toBe("6(2)(b)");
  });

  // ── TC3 ──────────────────────────────────────────────────────────────────
  // Foreign national, 100 days, 300 prior-4 → 6(2)(a) fails, 6(2)(b) fails → Non-Resident
  it("TC3: foreign national, 100 days, 300 prior-4 → Non-Resident", () => {
    const r = determineResidentialStatus(
      make({ citizenship: "foreign", daysInIndiaThisYear: 100, daysInIndiaPrior4Years: 300 }),
      rule
    );
    expect(r.status).toBe("Non-Resident");
  });

  // ── TC4 ──────────────────────────────────────────────────────────────────
  // Indian citizen, 50 days, crew of Indian ship, 500 prior-4
  // 6(3)(a) disables 6(2)(b); 50 < 182 fails 6(2)(a) → Non-Resident
  it("TC4: Indian citizen, 50 days, left as crew of Indian ship, 500 prior-4 → Non-Resident [6(3)(a)]", () => {
    const r = determineResidentialStatus(
      make({
        citizenship: "indian",
        daysInIndiaThisYear: 50,
        leftAsIndianShipCrew: true,
        daysInIndiaPrior4Years: 500,
      }),
      rule
    );
    expect(r.status).toBe("Non-Resident");
    // Trail must include 6(3)(a)
    expect(r.trail.some(e => e.subsection === "6(3)(a)" && e.result === "disabled")).toBe(true);
  });

  // ── TC5 ──────────────────────────────────────────────────────────────────
  // Indian citizen, 50 days, left for employment abroad, 500 prior-4
  // 6(3)(b) disables 6(2)(b); 50 < 182 → Non-Resident
  it("TC5: Indian citizen, 50 days, left for employment abroad, 500 prior-4 → Non-Resident [6(3)(b)]", () => {
    const r = determineResidentialStatus(
      make({
        citizenship: "indian",
        daysInIndiaThisYear: 50,
        leftForEmploymentAbroad: true,
        daysInIndiaPrior4Years: 500,
      }),
      rule
    );
    expect(r.status).toBe("Non-Resident");
    expect(r.trail.some(e => e.subsection === "6(3)(b)" && e.result === "disabled")).toBe(true);
  });

  // ── TC6 ──────────────────────────────────────────────────────────────────
  // PIO visitor, 100 days, income < Rs 15L, 400 prior-4
  // 6(4) disables 6(2)(b); 100 < 182 → Non-Resident
  it("TC6: PIO visitor, 100 days, income < 15L, 400 prior-4 → Non-Resident [6(4)]", () => {
    const r = determineResidentialStatus(
      make({
        citizenship: "pio",
        isVisitorFromAbroad: true,
        daysInIndiaThisYear: 100,
        totalIncomeExclForeignSources: 1_000_000, // < 15L
        daysInIndiaPrior4Years: 400,
      }),
      rule
    );
    expect(r.status).toBe("Non-Resident");
    expect(r.trail.some(e => e.subsection === "6(4)" && e.result === "disabled")).toBe(true);
  });

  // ── TC7 ──────────────────────────────────────────────────────────────────
  // PIO visitor, 130 days, income > Rs 15L, 400 prior-4
  // 6(5): 130 ≥ 120 AND 400 ≥ 365 → Resident; 6(13)(b): 120 ≤ 130 < 182 AND income > 15L → RNOR
  it("TC7: PIO visitor, 130 days, income > 15L, 400 prior-4 → RNOR [6(13)(b) via 6(5)]", () => {
    const r = determineResidentialStatus(
      make({
        citizenship: "pio",
        isVisitorFromAbroad: true,
        daysInIndiaThisYear: 130,
        totalIncomeExclForeignSources: 2_000_000, // > 15L
        daysInIndiaPrior4Years: 400,
        yearsNonResidentIn10Preceding: 0,
        daysInIndiaOver7PrecedingYears: 1000,
      }),
      rule
    );
    expect(r.status).toBe("RNOR");
    expect(r.trail.some(e => e.subsection === "6(5)" && e.result === "met")).toBe(true);
    expect(r.determinativeSubsection).toBe("6(13)(b)");
  });

  // ── TC8 ──────────────────────────────────────────────────────────────────
  // PIO visitor, 100 days, income > Rs 15L, 400 prior-4
  // 6(5) sets threshold to 120; 100 < 120 fails 6(2)(b); 100 < 182 fails 6(2)(a) → Non-Resident
  it("TC8: PIO visitor, 100 days, income > 15L, 400 prior-4 → Non-Resident [6(5): 100 < 120]", () => {
    const r = determineResidentialStatus(
      make({
        citizenship: "pio",
        isVisitorFromAbroad: true,
        daysInIndiaThisYear: 100,
        totalIncomeExclForeignSources: 2_000_000, // > 15L
        daysInIndiaPrior4Years: 400,
      }),
      rule
    );
    expect(r.status).toBe("Non-Resident");
  });

  // ── TC9 ──────────────────────────────────────────────────────────────────
  // Indian citizen, 30 days, income Rs 20L, not liable to tax anywhere
  // Not resident under 6(2); 6(7) applies → Deemed Resident → RNOR per 6(13)(c)
  it("TC9: Indian citizen, 30 days, income Rs 20L, not liable abroad → RNOR [6(7) deemed]", () => {
    const r = determineResidentialStatus(
      make({
        citizenship: "indian",
        daysInIndiaThisYear: 30,
        daysInIndiaPrior4Years: 0,
        totalIncomeExclForeignSources: 2_000_000,
        liableToTaxInAnotherCountry: false,
      }),
      rule
    );
    expect(r.status).toBe("RNOR");
    expect(r.determinativeSubsection).toBe("6(7)");
    expect(r.isDeemedResident).toBe(true);
    expect(r.trail.some(e => e.subsection === "6(13)(c)")).toBe(true);
  });

  // ── TC10 ─────────────────────────────────────────────────────────────────
  // Indian citizen, 200 days, NR in 9 of last 10 years
  // 6(2)(a) → Resident; 6(13)(a)(i) → RNOR
  it("TC10: Indian citizen, 200 days, NR in 9 of 10 → RNOR [6(13)(a)(i)]", () => {
    const r = determineResidentialStatus(
      make({
        citizenship: "indian",
        daysInIndiaThisYear: 200,
        yearsNonResidentIn10Preceding: 9,
        daysInIndiaOver7PrecedingYears: 1000, // (a)(ii) not triggered
      }),
      rule
    );
    expect(r.status).toBe("RNOR");
    expect(r.determinativeSubsection).toBe("6(13)(a)(i)");
  });

  // ── TC11 ─────────────────────────────────────────────────────────────────
  // Indian citizen, 200 days, Resident in 9 of last 10, 800 days in last 7
  // 6(2)(a) → Resident; all 6(13) conditions fail → ROR
  it("TC11: Indian citizen, 200 days, long residency history → ROR", () => {
    const r = determineResidentialStatus(
      make({
        citizenship: "indian",
        daysInIndiaThisYear: 200,
        yearsNonResidentIn10Preceding: 1,  // < 9
        daysInIndiaOver7PrecedingYears: 800, // > 729
      }),
      rule
    );
    expect(r.status).toBe("ROR");
  });

  // ── TC12 ─────────────────────────────────────────────────────────────────
  // Indian citizen, 200 days, 700 days over last 7 years
  // 6(2)(a) → Resident; 6(13)(a)(ii): 700 ≤ 729 → RNOR
  it("TC12: Indian citizen, 200 days, 700 days in last 7 years → RNOR [6(13)(a)(ii)]", () => {
    const r = determineResidentialStatus(
      make({
        citizenship: "indian",
        daysInIndiaThisYear: 200,
        yearsNonResidentIn10Preceding: 0,
        daysInIndiaOver7PrecedingYears: 700,
      }),
      rule
    );
    expect(r.status).toBe("RNOR");
    expect(r.determinativeSubsection).toBe("6(13)(a)(ii)");
  });

  // ── TC13 ─────────────────────────────────────────────────────────────────
  // Indian citizen, 250 days, liable to tax in USA, income Rs 20L
  // 6(2)(a) → Resident; 6(7) N/A (liable abroad); all 6(13) fail → ROR
  it("TC13: Indian citizen, 250 days, liable to tax in USA, income Rs 20L → ROR", () => {
    const r = determineResidentialStatus(
      make({
        citizenship: "indian",
        daysInIndiaThisYear: 250,
        liableToTaxInAnotherCountry: true,
        totalIncomeExclForeignSources: 2_000_000,
        yearsNonResidentIn10Preceding: 0,
        daysInIndiaOver7PrecedingYears: 1000,
      }),
      rule
    );
    expect(r.status).toBe("ROR");
    // 6(7) must be absent from trail (6(8) carve-out means we never reach 6(7))
    expect(r.trail.some(e => e.subsection === "6(7)")).toBe(false);
  });

  // ── TC14 — Edge case ─────────────────────────────────────────────────────
  // Exactly 182 days → "182 or more" means resident [6(2)(a)]
  it("TC14: exactly 182 days → Resident via 6(2)(a)", () => {
    const r = determineResidentialStatus(
      make({ citizenship: "foreign", daysInIndiaThisYear: 182 }),
      rule
    );
    expect(r.status).not.toBe("Non-Resident");
    expect(r.trail.some(e => e.subsection === "6(2)(a)" && e.result === "met")).toBe(true);
  });

  // ── TC15 — Edge case ─────────────────────────────────────────────────────
  // PIO visitor, exactly 120 days, income > Rs 15L, 365 prior-4
  // 6(5): 120 ≥ 120 AND 365 ≥ 365 → Resident; 6(13)(b): 120 ≤ 120 < 182, income > 15L → RNOR
  it("TC15: PIO visitor, exactly 120 days, income > 15L, 365 prior-4 → RNOR [6(5) + 6(13)(b)]", () => {
    const r = determineResidentialStatus(
      make({
        citizenship: "pio",
        isVisitorFromAbroad: true,
        daysInIndiaThisYear: 120,
        totalIncomeExclForeignSources: 2_000_000,
        daysInIndiaPrior4Years: 365,
        yearsNonResidentIn10Preceding: 0,
        daysInIndiaOver7PrecedingYears: 1000,
      }),
      rule
    );
    expect(r.status).toBe("RNOR");
    expect(r.trail.some(e => e.subsection === "6(5)" && e.result === "met")).toBe(true);
    expect(r.determinativeSubsection).toBe("6(13)(b)");
  });

  // ── TC16 — Edge case ─────────────────────────────────────────────────────
  // Resident, exactly 729 days over last 7 years → "729 or less" → RNOR [6(13)(a)(ii)]
  it("TC16: Resident (200 days), exactly 729 days in last 7 years → RNOR [6(13)(a)(ii)]", () => {
    const r = determineResidentialStatus(
      make({
        citizenship: "indian",
        daysInIndiaThisYear: 200,
        yearsNonResidentIn10Preceding: 0,
        daysInIndiaOver7PrecedingYears: 729, // exactly 729 — triggers "729 or less"
      }),
      rule
    );
    expect(r.status).toBe("RNOR");
    expect(r.determinativeSubsection).toBe("6(13)(a)(ii)");
  });

  // ── TC17 — Critical 6(8) carve-out ────────────────────────────────────────
  // Indian citizen, 200 days, income Rs 20L, not liable abroad.
  // 6(2)(a) → Resident → 6(8) means 6(7) does NOT apply (already resident under 6(2)).
  // NOR conditions all fail → ROR.
  // This test MUST FAIL if 6(8) is not implemented (6(7) would incorrectly make RNOR).
  it("TC17: 6(8) carve-out — already resident via 6(2)(a), 6(7) must not apply → ROR", () => {
    const r = determineResidentialStatus(
      make({
        citizenship: "indian",
        daysInIndiaThisYear: 200,
        totalIncomeExclForeignSources: 2_000_000,
        liableToTaxInAnotherCountry: false,
        yearsNonResidentIn10Preceding: 0,
        daysInIndiaOver7PrecedingYears: 1000,
      }),
      rule
    );
    expect(r.status).toBe("ROR");
    expect(r.isDeemedResident).toBe(false);
    // 6(7) must NOT appear in trail — 6(8) prevents it from being evaluated
    expect(r.trail.some(e => e.subsection === "6(7)")).toBe(false);
  });

});
