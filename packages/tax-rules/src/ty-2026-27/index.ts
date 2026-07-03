// TY 2026-27 (April 2026 – March 2027)
// Governing Act: Income Tax Act 2025
//
// ALL tax rates, slabs, deduction limits, section numbers, and form names
// for this tax year must be defined here and only here.
// UI and calculation code must import from this package — never hardcode values.

export const TAX_YEAR = "TY-2026-27" as const;
export const GOVERNING_ACT = "Income Tax Act 2025" as const;

export type TaxYear = typeof TAX_YEAR;
