// Shared TypeScript interfaces — Income Tax Act 2025, TY 2026-27

export interface TaxSlab {
  from: number;
  to: number | null;
  rate: number;
}

export interface TaxRule {
  taxYear: string;
  governingAct: "2025";
  defaultRegimeSlabs: TaxSlab[];
  optionalRegimeSlabs: TaxSlab[];
  surchargeSlabs: TaxSlab[];
  cess: number;
  rebate: { section: string; limit: number; maxRebate: number };
  standardDeduction: { default: number; optional: number };
  deductions: Record<string, number | object>;
  capitalGains: {
    stcg196: number;
    ltcg197: number;
    ltcg198: number;
    ltcgExemption198: number;
    /** Surcharge on capital gains income is capped at this rate (25%), even above 5 Cr */
    cgSurchargeCap: number;
  };
  hra: {
    metroRate: number;    // fraction, e.g. 0.50
    nonMetroRate: number; // fraction, e.g. 0.40
  };
  advanceTax: {
    threshold: number;    // net liability above which advance tax is due
    installments: ReadonlyArray<{
      label: string;      // "Q1" … "Q4"
      dueDate: string;    // display string, e.g. "Jun 15, 2026"
      cumulative: number; // fraction of total liability, e.g. 0.15
    }>;
  };
  houseProperty: {
    standardDeductionRate: number;           // 0.30
    maxSelfOccupied: number;                 // 2
    selfOccupiedInterestCapOptional: number; // 200_000
    selfOccupiedInterestCapDefault: number;  // 0
    builderInventoryWindowYears: number;     // 2
    lossSetOffCapOptional: number;           // 200_000
    lossCarryForwardYears: number;           // 8
    arrearsDeductionRate: number;            // 0.30
  };
  hraMetroCities: string[];
  sections: Record<string, string>;
  forms: Record<string, string>;
  residentialStatus: {
    deemedResidentIncomeThreshold: number; // Rs 15,00,000 — Secs 6(5), 6(7), 6(13)(b)
    daysThresholdResident: number;         // 182 — Sec 6(2)(a)
    daysThresholdStandard: number;         // 60  — Sec 6(2)(b) default
    daysThresholdHighIncome: number;       // 120 — Sec 6(5) modified threshold
    prior4YearsMinDays: number;            // 365 — Sec 6(2)(b) cumulative test
    norMaxDaysIn7Years: number;            // 729 — Sec 6(13)(a)(ii) "729 or less"
    norMinNrYearsIn10Preceding: number;    // 9   — Sec 6(13)(a)(i) "9 out of 10"
  };
}

export interface TaxResult {
  grossIncome: number;
  taxableIncome: number;
  taxBeforeCess: number;
  cess: number;
  totalTax: number;
  regime: "default" | "optional";
  rebateApplied: number;
  surcharge: number;
  effectiveRate: number;
}
