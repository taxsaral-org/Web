// Section 6, Income Tax Act 2025 — Residential Status Determination
// Covers sub-sections 6(1)–6(14) for individuals only.
// HUF, companies, and other persons (6(9)–6(11)) are out of scope.

import type { TaxRule } from "@taxsaral/types";

// ── Public types ──────────────────────────────────────────────────────────────

export type Citizenship = "indian" | "pio" | "foreign";
export type ResidentialStatus = "ROR" | "RNOR" | "Non-Resident";

export interface ResidentialStatusInput {
  citizenship: Citizenship;
  daysInIndiaThisYear: number;
  daysInIndiaPrior4Years: number;          // sum of the 4 preceding tax years — 6(2)(b)
  leftAsIndianShipCrew?: boolean;          // 6(3)(a): crew of an Indian ship (MSA 1958 s.3(18))
  leftForEmploymentAbroad?: boolean;       // 6(3)(b): employment outside India
  isCrewOfForeignBoundShip?: boolean;      // 6(6): crew of outbound foreign ship (day-count note)
  isVisitorFromAbroad?: boolean;           // 6(4)/(5): citizen/PIO coming on a visit
  totalIncomeExclForeignSources?: number;  // 6(5), 6(7), 6(13)(b): Rs 15 lakh threshold
  liableToTaxInAnotherCountry?: boolean;   // 6(7)(b): tax home elsewhere
  yearsNonResidentIn10Preceding?: number;  // 6(13)(a)(i): 0–10
  daysInIndiaOver7PrecedingYears?: number; // 6(13)(a)(ii): cumulative days in prior 7 years
}

export interface ResidentialStatusTrailEntry {
  subsection: string;
  description: string;
  result: "met" | "not-met" | "disabled" | "note";
}

export interface ResidentialStatusResult {
  status: ResidentialStatus;
  determinativeSubsection: string;
  isDeemedResident: boolean;              // true when resident via 6(7) only
  trail: ResidentialStatusTrailEntry[];
  notes: string[];                        // informational notes (e.g. 6(6))
}

// ── Main determination function ───────────────────────────────────────────────

export function determineResidentialStatus(
  input: ResidentialStatusInput,
  rule: TaxRule
): ResidentialStatusResult {
  const {
    citizenship,
    daysInIndiaThisYear: days,
    daysInIndiaPrior4Years: prior4,
    leftAsIndianShipCrew = false,
    leftForEmploymentAbroad = false,
    isCrewOfForeignBoundShip = false,
    isVisitorFromAbroad = false,
    totalIncomeExclForeignSources: income = 0,
    liableToTaxInAnotherCountry = false,
    yearsNonResidentIn10Preceding = 0,
    daysInIndiaOver7PrecedingYears = 0,
  } = input;

  const rs = rule.residentialStatus;
  const trail: ResidentialStatusTrailEntry[] = [];
  const notes: string[] = [];

  // ── STEP 1: Section 6(2) — Primary residential test ──────────────────────
  //
  // An individual is RESIDENT if EITHER 6(2)(a) OR 6(2)(b) is satisfied.

  // 6(2)(a): physically present in India for 182 days or more in the tax year
  const s62a_met = days >= rs.daysThresholdResident;
  trail.push({
    subsection: "6(2)(a)",
    description: `${days} day${days !== 1 ? "s" : ""} in India this tax year — threshold ≥ ${rs.daysThresholdResident}`,
    result: s62a_met ? "met" : "not-met",
  });

  // Determine 6(2)(b) availability and the effective day-count threshold.
  // Default threshold is 60 days; 6(5) can raise this to 120 for high-income visitors.
  let s62b_disabled = false;
  let s62b_threshold = rs.daysThresholdStandard; // 60

  // 6(3): Disables 6(2)(b) for Indian citizens who left as crew OR for employment.
  // Does NOT apply to PIOs or foreign nationals.
  if (citizenship === "indian" && (leftAsIndianShipCrew || leftForEmploymentAbroad)) {
    s62b_disabled = true;
    const sub = leftAsIndianShipCrew ? "6(3)(a)" : "6(3)(b)";
    trail.push({
      subsection: sub,
      description: leftAsIndianShipCrew
        ? "Indian citizen left as crew of an Indian ship (MSA 1958 s.3(18)) — 6(2)(b) disabled; resident only via 6(2)(a)"
        : "Indian citizen left for employment outside India — 6(2)(b) disabled; resident only via 6(2)(a)",
      result: "disabled",
    });
  }

  // 6(4)/(5): Citizen or PIO who comes to India on a visit from abroad.
  // 6(4): Disables 6(2)(b) entirely if income ≤ Rs 15 lakh.
  // 6(5): If income > Rs 15 lakh, re-enables 6(2)(b) with 120-day threshold.
  if (!s62b_disabled && (citizenship === "indian" || citizenship === "pio") && isVisitorFromAbroad) {
    if (income > rs.deemedResidentIncomeThreshold) {
      // 6(5): 6(2)(b) applies but with 120 days instead of 60
      s62b_threshold = rs.daysThresholdHighIncome; // 120
      trail.push({
        subsection: "6(4)",
        description: "Citizen/PIO visitor from abroad — 6(2)(b) would normally be disabled by 6(4)",
        result: "disabled",
      });
      trail.push({
        subsection: "6(5)",
        description: `Income ₹${income.toLocaleString("en-IN")} exceeds ₹${rs.deemedResidentIncomeThreshold.toLocaleString("en-IN")} — 6(5) re-enables 6(2)(b) with ${rs.daysThresholdHighIncome}-day threshold`,
        result: "met",
      });
    } else {
      // 6(4): 6(2)(b) disabled; only 6(2)(a) can make this person resident
      s62b_disabled = true;
      trail.push({
        subsection: "6(4)",
        description: `Citizen/PIO visitor from abroad, income ≤ ₹${rs.deemedResidentIncomeThreshold.toLocaleString("en-IN")} — 6(2)(b) disabled; resident only via 6(2)(a)`,
        result: "disabled",
      });
    }
  }

  // 6(6): Crew of a foreign-bound ship leaving India — informational note only.
  // The number of days in India for the voyage follows CBDT-prescribed rules.
  if (citizenship === "indian" && isCrewOfForeignBoundShip) {
    notes.push(
      "Section 6(6): You are crew of a foreign-bound ship leaving India. " +
      "Voyage-day computation follows specific CBDT-prescribed conditions — " +
      "consult a CA for the exact day-counting."
    );
    trail.push({
      subsection: "6(6)",
      description: "Crew of outbound foreign ship — voyage-day computation per CBDT rules (see note below)",
      result: "note",
    });
  }

  // 6(2)(b): days this year ≥ threshold AND cumulative prior-4-year days ≥ 365
  let s62b_met = false;
  if (!s62b_disabled) {
    s62b_met = days >= s62b_threshold && prior4 >= rs.prior4YearsMinDays;
    trail.push({
      subsection: "6(2)(b)",
      description:
        `${days} days this year (need ≥ ${s62b_threshold}) AND ` +
        `${prior4} days over prior 4 years (need ≥ ${rs.prior4YearsMinDays})`,
      result: s62b_met ? "met" : "not-met",
    });
  }

  const isResidentUnder62 = s62a_met || s62b_met;

  if (isResidentUnder62) {
    // 6(8) carve-out: 6(7) does NOT apply when resident under 6(2)–6(6).
    // We proceed directly to the 6(13) NOR check.
    const baseSubsection = s62a_met ? "6(2)(a)" : "6(2)(b)";
    const nor = checkNOR(
      { citizenship, days, income, yearsNonResidentIn10Preceding, daysInIndiaOver7PrecedingYears },
      rs,
      trail
    );
    return {
      status: nor.isNOR ? "RNOR" : "ROR",
      determinativeSubsection: nor.isNOR ? nor.subsection : baseSubsection,
      isDeemedResident: false,
      trail,
      notes,
    };
  }

  // ── STEP 2: Section 6(7) — Deemed resident (anti-avoidance) ──────────────
  //
  // 6(8): This section applies ONLY when the individual is NOT resident under
  // 6(2)–6(6). The carve-out is satisfied implicitly by reaching this point.
  //
  // 6(7): Deemed resident if ALL THREE hold:
  //   (a) citizen of India, AND
  //   (b) NOT liable to tax in any other country by domicile/residence/similar, AND
  //   (c) total income (excl. foreign sources) > Rs 15 lakh.

  if (citizenship === "indian") {
    if (!liableToTaxInAnotherCountry && income > rs.deemedResidentIncomeThreshold) {
      trail.push({
        subsection: "6(7)",
        description:
          `Indian citizen, not liable to tax in any other country/territory, ` +
          `income ₹${income.toLocaleString("en-IN")} > ₹${rs.deemedResidentIncomeThreshold.toLocaleString("en-IN")} — DEEMED RESIDENT`,
        result: "met",
      });
      // 6(13)(c): Deemed resident under 6(7) is ALWAYS RNOR — never ROR.
      trail.push({
        subsection: "6(13)(c)",
        description: "Deemed resident under Section 6(7) → always RNOR per Section 6(13)(c)",
        result: "met",
      });
      return {
        status: "RNOR",
        determinativeSubsection: "6(7)",
        isDeemedResident: true,
        trail,
        notes,
      };
    }

    const reason = liableToTaxInAnotherCountry
      ? "liable to tax in another country/territory by reason of domicile/residence"
      : `income ₹${income.toLocaleString("en-IN")} does not exceed ₹${rs.deemedResidentIncomeThreshold.toLocaleString("en-IN")}`;
    trail.push({
      subsection: "6(7)",
      description: `Deemed resident conditions not met — ${reason}`,
      result: "not-met",
    });
  }

  // ── STEP 4: Non-Resident ─────────────────────────────────────────────────
  //
  // None of Section 6(2)–6(7) satisfied.
  trail.push({
    subsection: "6(1)",
    description: "None of Section 6(2)–6(7) conditions satisfied — Non-Resident",
    result: "not-met",
  });
  return {
    status: "Non-Resident",
    determinativeSubsection: "6(1)",
    isDeemedResident: false,
    trail,
    notes,
  };
}

// ── 6(13): Not Ordinarily Resident (NOR) check ───────────────────────────────

interface NORCheckInput {
  citizenship: Citizenship;
  days: number;
  income: number;
  yearsNonResidentIn10Preceding: number;
  daysInIndiaOver7PrecedingYears: number;
}

interface NORCheckResult {
  isNOR: boolean;
  subsection: string;
}

function checkNOR(
  { citizenship, days, income, yearsNonResidentIn10Preceding, daysInIndiaOver7PrecedingYears }: NORCheckInput,
  rs: TaxRule["residentialStatus"],
  trail: ResidentialStatusTrailEntry[]
): NORCheckResult {
  // 6(13)(a)(i): was Non-Resident in 9 or more of the 10 preceding tax years
  if (yearsNonResidentIn10Preceding >= rs.norMinNrYearsIn10Preceding) {
    trail.push({
      subsection: "6(13)(a)(i)",
      description:
        `Non-Resident in ${yearsNonResidentIn10Preceding} of the last 10 tax years ` +
        `(need ≥ ${rs.norMinNrYearsIn10Preceding}) — RNOR`,
      result: "met",
    });
    return { isNOR: true, subsection: "6(13)(a)(i)" };
  }
  trail.push({
    subsection: "6(13)(a)(i)",
    description:
      `Non-Resident in ${yearsNonResidentIn10Preceding} of the last 10 tax years — condition not met`,
    result: "not-met",
  });

  // 6(13)(a)(ii): 729 days or less in India over the 7 preceding tax years
  if (daysInIndiaOver7PrecedingYears <= rs.norMaxDaysIn7Years) {
    trail.push({
      subsection: "6(13)(a)(ii)",
      description:
        `${daysInIndiaOver7PrecedingYears} days in the last 7 tax years ` +
        `(≤ ${rs.norMaxDaysIn7Years} means RNOR) — RNOR`,
      result: "met",
    });
    return { isNOR: true, subsection: "6(13)(a)(ii)" };
  }
  trail.push({
    subsection: "6(13)(a)(ii)",
    description:
      `${daysInIndiaOver7PrecedingYears} days in the last 7 tax years — above ${rs.norMaxDaysIn7Years}, condition not met`,
    result: "not-met",
  });

  // 6(13)(b): Citizen/PIO with income > Rs 15 lakh AND 120 ≤ days < 182
  if (
    (citizenship === "indian" || citizenship === "pio") &&
    income > rs.deemedResidentIncomeThreshold &&
    days >= rs.daysThresholdHighIncome &&
    days < rs.daysThresholdResident
  ) {
    trail.push({
      subsection: "6(13)(b)",
      description:
        `Citizen/PIO, income ₹${income.toLocaleString("en-IN")} > ₹${rs.deemedResidentIncomeThreshold.toLocaleString("en-IN")}, ` +
        `${days} days (≥ ${rs.daysThresholdHighIncome} and < ${rs.daysThresholdResident}) — RNOR`,
      result: "met",
    });
    return { isNOR: true, subsection: "6(13)(b)" };
  }
  if (citizenship === "indian" || citizenship === "pio") {
    trail.push({
      subsection: "6(13)(b)",
      description: "Citizen/PIO high-income short-visit check — conditions not met",
      result: "not-met",
    });
  }

  // No RNOR condition met → Resident and Ordinarily Resident
  trail.push({
    subsection: "6(13)",
    description: "No RNOR condition satisfied — Resident and Ordinarily Resident (ROR)",
    result: "not-met",
  });
  return { isNOR: false, subsection: "" };
}
