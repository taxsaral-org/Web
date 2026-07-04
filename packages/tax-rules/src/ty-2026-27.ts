import type { TaxRule } from "@taxsaral/types";

export const TAX_YEAR = "TY-2026-27" as const;
export const GOVERNING_ACT = "Income Tax Act 2025" as const;

export type TaxYear = typeof TAX_YEAR;

// ─────────────────────────────────────────────────────────────────────────────
// Income Tax Act 2025 — Tax Year 2026-27 (April 2026 – March 2027)
//
// ALL tax rates, slabs, deduction limits, section numbers, and form names for
// this tax year are defined here and only here. UI code and the tax-engine must
// import from this package; no values may be hardcoded elsewhere.
// ─────────────────────────────────────────────────────────────────────────────

export const RULES_TY_2026_27: TaxRule = {
  taxYear: TAX_YEAR,
  governingAct: "2025",

  // ── Section 202: Default Regime slabs ──────────────────────────────────────
  defaultRegimeSlabs: [
    { from: 0,        to: 400_000,   rate: 0.00 }, // ₹0 – ₹4 L      : nil
    { from: 400_000,  to: 800_000,   rate: 0.05 }, // ₹4 L – ₹8 L    : 5%
    { from: 800_000,  to: 1_200_000, rate: 0.10 }, // ₹8 L – ₹12 L   : 10%
    { from: 1_200_000,to: 1_600_000, rate: 0.15 }, // ₹12 L – ₹16 L  : 15%
    { from: 1_600_000,to: 2_000_000, rate: 0.20 }, // ₹16 L – ₹20 L  : 20%
    { from: 2_000_000,to: 2_400_000, rate: 0.25 }, // ₹20 L – ₹24 L  : 25%
    { from: 2_400_000,to: null,      rate: 0.30 }, // above ₹24 L    : 30%
  ],

  // ── Optional Regime slabs ──────────────────────────────────────────────────
  optionalRegimeSlabs: [
    { from: 0,        to: 250_000,   rate: 0.00 }, // ₹0 – ₹2.5 L    : nil
    { from: 250_000,  to: 500_000,   rate: 0.05 }, // ₹2.5 L – ₹5 L  : 5%
    { from: 500_000,  to: 1_000_000, rate: 0.20 }, // ₹5 L – ₹10 L   : 20%
    { from: 1_000_000,to: null,      rate: 0.30 }, // above ₹10 L    : 30%
  ],

  // ── Surcharge slabs (applied on tax, based on total income) ───────────────
  // Capital gains surcharge is separately capped at 25% — see capitalGains.cgSurchargeCap
  surchargeSlabs: [
    { from: 0,           to: 5_000_000,  rate: 0.00 }, // up to ₹50 L   : nil
    { from: 5_000_000,   to: 10_000_000, rate: 0.10 }, // ₹50 L – ₹1 Cr : 10%
    { from: 10_000_000,  to: 20_000_000, rate: 0.15 }, // ₹1 Cr – ₹2 Cr : 15%
    { from: 20_000_000,  to: 50_000_000, rate: 0.25 }, // ₹2 Cr – ₹5 Cr : 25%
    { from: 50_000_000,  to: null,       rate: 0.37 }, // above ₹5 Cr   : 37%
  ],

  // 4% Health & Education Cess on (tax + surcharge), both regimes
  cess: 0.04,

  // ── Section 156: Tax Rebate ────────────────────────────────────────────────
  // Default regime only. Full tax rebate for total income ≤ ₹12,00,000.
  // Does NOT apply to: capital gains u/s 196, 197, 198 or VDA/crypto income.
  rebate: {
    section: "156",
    limit: 1_200_000, // ₹12,00,000
    maxRebate: Infinity, // entire tax liability is rebated (no fixed rupee cap)
  },

  standardDeduction: {
    default: 75_000,  // ₹75,000 under default regime
    optional: 50_000, // ₹50,000 under optional regime
  },

  // ── Deductions available under optional regime ─────────────────────────────
  deductions: {
    // Section 123 (was 80C): EPF, ELSS, LIC, PPF, NSC, home loan principal, etc.
    section123: 150_000,

    // Section 127 (was 80CCD(1B)): additional NPS Tier-I contribution
    section127: 50_000,

    // Section 130 (was 80D): health insurance premium
    section130: {
      self: 25_000,
      parents: 25_000,
      seniorParents: 50_000, // where insured parent is senior citizen
    },

    // Section 133 (was 80E): interest on education loan — full interest, max 8 years
    section133: {
      type: "fullInterest",
      maxYears: 8,
    },

    // Section 149 (was 80TTA): savings bank interest (non-senior citizens)
    section149: 10_000,

    // Section 150 (was 80TTB): interest from deposits (senior citizens only)
    section150: 50_000,

    // Section 71 (was 24(b)): home loan interest
    section71: {
      selfOccupied: 200_000, // ₹2,00,000 cap for self-occupied property
      letOut: null,          // no upper cap for let-out property
    },

    // VDA/Crypto: flat 30% tax, no set-off against any other income
    vda: {
      rate: 0.30,
      setOffAllowed: false,
    },
  },

  // ── Capital Gains ──────────────────────────────────────────────────────────
  capitalGains: {
    // Section 196: STCG on listed equity / equity-oriented MF where STT is paid
    stcg196: 0.20,

    // Section 197: LTCG (general — debt MF, bonds, property, gold, etc.)
    ltcg197: 0.125,

    // Section 198: LTCG on listed equity / equity-oriented MF where STT is paid
    // Taxable only on gains above ₹1,25,000 per year
    ltcg198: 0.125,
    ltcgExemption198: 125_000, // ₹1,25,000 annual exemption

    // Surcharge on capital gains income is capped at 25% regardless of total income
    cgSurchargeCap: 0.25,
  },

  // HRA exemption rates (optional regime, Schedule III — Table S.No. 11)
  hra: {
    metroRate: 0.50,    // 50% of basic for metro cities
    nonMetroRate: 0.40, // 40% of basic for non-metro cities
  },

  // Advance Tax (Sections 403-408): obligation, computation and instalment schedule
  advanceTax: {
    threshold: 10_000, // ₹10,000
    installments: [
      { label: "Q1", dueDate: "Jun 15, 2026", cumulative: 0.15 },
      { label: "Q2", dueDate: "Sep 15, 2026", cumulative: 0.45 },
      { label: "Q3", dueDate: "Dec 15, 2026", cumulative: 0.75 },
      { label: "Q4", dueDate: "Mar 15, 2027", cumulative: 1.00 },
    ],
  },

  // Income from House Property — Sections 20-25
  houseProperty: {
    standardDeductionRate: 0.30,            // 30% of Net Annual Value (Section 22)
    maxSelfOccupied: 2,                     // Section 21(6)-(7): max 2 SO properties
    selfOccupiedInterestCapOptional: 200_000, // ₹2L aggregate cap (Section 71, optional regime)
    selfOccupiedInterestCapDefault: 0,        // no SO interest deduction in default regime
    builderInventoryWindowYears: 2,           // Section 21(5): nil AV for 2 years from CC date
    lossSetOffCapOptional: 200_000,           // ₹2L max set-off against other income (optional)
    lossCarryForwardYears: 8,                 // carry forward up to 8 years
    arrearsDeductionRate: 0.30,               // 30% deduction on arrears (Section 23)
  },

  // HRA — 50% of basic salary for metro cities, 40% for non-metro
  hraMetroCities: [
    "Delhi",
    "Mumbai",
    "Kolkata",
    "Chennai",
    "Bangalore",
    "Pune",
    "Hyderabad",
    "Ahmedabad",
  ],

  sections: {
    newRegime: "202",
    rebate: "156",
    s80C: "123",
    tds: "393",
    homeLoanInterest: "71",
    capitalGainsSTCG: "196",
    capitalGainsLTCG: "197",
    capitalGainsLTCGEquity: "198",
    hra: "Schedule III",
    advanceTax: "403",              // Secs 403-408: advance tax obligation & instalment schedule
    advanceTaxInterestDefault: "424",    // Sec 424: interest for default in payment (old 234B)
    advanceTaxInterestDeferment: "425",  // Sec 425: interest for deferment of instalments (old 234C)
    multipleEmployerTds: "392",
    hpCharging: "20",
    hpAnnualValue: "21",
    hpDeductions: "22",
    hpArrears: "23",
    hpCoOwnership: "24",
    hpDeemedOwnership: "25",
  },

  forms: {
    tdsCertificate: "Form 130",
    taxCreditStatement: "Form 168",
    taxAuditReport: "Form 26",
  },

  // Section 6 — Residential Status (sub-sections 6(1)–6(14))
  residentialStatus: {
    deemedResidentIncomeThreshold: 1_500_000, // Rs 15,00,000 — Secs 6(5), 6(7), 6(13)(b)
    daysThresholdResident: 182,               // Sec 6(2)(a): 182 days or more
    daysThresholdStandard: 60,                // Sec 6(2)(b): 60 days (standard)
    daysThresholdHighIncome: 120,             // Sec 6(5): 120 days (modified for high-income visitor)
    prior4YearsMinDays: 365,                  // Sec 6(2)(b): 365 days over preceding 4 years
    norMaxDaysIn7Years: 729,                  // Sec 6(13)(a)(ii): "729 days or less"
    norMinNrYearsIn10Preceding: 9,            // Sec 6(13)(a)(i): NR in 9 of 10 preceding years
  },
};
