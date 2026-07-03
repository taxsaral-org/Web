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
