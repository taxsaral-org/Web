export type EventCategory =
  | "Advance Tax"
  | "TDS / TCS"
  | "ITR Filing"
  | "Tax Audit"
  | "Other";

export interface CalendarEvent {
  id: string;
  date: string;        // "YYYY-MM-DD"
  title: string;
  description: string;
  category: EventCategory;
  section?: string;
  important?: boolean;
}

export const CATEGORY_COLORS: Record<EventCategory, string> = {
  "Advance Tax": "bg-blue-100 text-blue-700 border-blue-200",
  "TDS / TCS":   "bg-amber-100 text-amber-700 border-amber-200",
  "ITR Filing":  "bg-green-100 text-green-700 border-green-200",
  "Tax Audit":   "bg-purple-100 text-purple-700 border-purple-200",
  "Other":       "bg-gray-100 text-gray-600 border-gray-200",
};

export const CATEGORY_ACCENT: Record<EventCategory, string> = {
  "Advance Tax": "border-l-blue-400",
  "TDS / TCS":   "border-l-amber-400",
  "ITR Filing":  "border-l-green-400",
  "Tax Audit":   "border-l-purple-400",
  "Other":       "border-l-gray-300",
};

export const EVENTS: CalendarEvent[] = [

  // ── AY 2026-27 events (still open in Jul 2026) ──────────────────────────

  {
    id: "tds-return-q1-2627",
    date: "2026-07-31",
    title: "TDS / TCS Return — Q1 (Apr–Jun 2026)",
    description: "File quarterly TDS/TCS statement (Form 24Q / 26Q / 27Q / 27EQ) for deductions/collections during April–June 2026.",
    category: "TDS / TCS",
    section: "Section 392",
    important: true,
  },
  {
    id: "itr-non-audit-ay2627",
    date: "2026-07-31",
    title: "ITR Filing — Non-Audit Cases (AY 2026-27)",
    description: "Last date to file Income Tax Return for Tax Year 2025-26 for individuals, HUFs, and firms not subject to tax audit. Miss this and you pay late filing fees.",
    category: "ITR Filing",
    section: "Section 263",
    important: true,
  },
  {
    id: "tds-aug-2026",
    date: "2026-08-07",
    title: "TDS / TCS Payment — July 2026 Deductions",
    description: "Deposit TDS/TCS deducted/collected during July 2026 to the government account.",
    category: "TDS / TCS",
    section: "Section 392",
  },
  {
    id: "form16a-q1-2627",
    date: "2026-08-15",
    title: "Form 16A Issue — Q1 (Apr–Jun 2026)",
    description: "Issue Form 16A (non-salary TDS certificate) to deductees for Q1 of Tax Year 2026-27, within 15 days of the Q1 return due date.",
    category: "TDS / TCS",
    section: "Section 392",
  },
  {
    id: "tds-sep-2026",
    date: "2026-09-07",
    title: "TDS / TCS Payment — August 2026 Deductions",
    description: "Deposit TDS/TCS deducted/collected during August 2026.",
    category: "TDS / TCS",
    section: "Section 392",
  },
  {
    id: "adv-tax-q2-2627",
    date: "2026-09-15",
    title: "Advance Tax — 2nd Instalment (45% Cumulative)",
    description: "Total advance tax paid so far must be at least 45% of your estimated full-year tax liability. Shortfall attracts interest under Section 431.",
    category: "Advance Tax",
    section: "Section 425",
    important: true,
  },
  {
    id: "tax-audit-ay2627",
    date: "2026-09-30",
    title: "Tax Audit Report (AY 2026-27)",
    description: "Submit tax audit report (Form 3CA/3CB with 3CD annexure) for Tax Year 2025-26 on the income tax portal. Penalty for non-compliance: 0.5% of turnover (max ₹1.5L).",
    category: "Tax Audit",
    section: "Section 63",
    important: true,
  },
  {
    id: "tds-oct-2026",
    date: "2026-10-07",
    title: "TDS / TCS Payment — September 2026 Deductions",
    description: "Deposit TDS/TCS deducted/collected during September 2026.",
    category: "TDS / TCS",
    section: "Section 392",
  },
  {
    id: "itr-audit-ay2627",
    date: "2026-10-31",
    title: "ITR Filing — Audit Cases (AY 2026-27)",
    description: "Last date to file ITR for Tax Year 2025-26 for taxpayers whose accounts are required to be audited under the Income Tax Act or any other law.",
    category: "ITR Filing",
    section: "Section 263",
    important: true,
  },
  {
    id: "tds-return-q2-2627",
    date: "2026-10-31",
    title: "TDS / TCS Return — Q2 (Jul–Sep 2026)",
    description: "File quarterly TDS/TCS statement for deductions/collections during July–September 2026.",
    category: "TDS / TCS",
    section: "Section 392",
    important: true,
  },
  {
    id: "tds-nov-2026",
    date: "2026-11-07",
    title: "TDS / TCS Payment — October 2026 Deductions",
    description: "Deposit TDS/TCS deducted/collected during October 2026.",
    category: "TDS / TCS",
    section: "Section 392",
  },
  {
    id: "form16a-q2-2627",
    date: "2026-11-15",
    title: "Form 16A Issue — Q2 (Jul–Sep 2026)",
    description: "Issue Form 16A to deductees for Q2 of Tax Year 2026-27, within 15 days of the Q2 return due date.",
    category: "TDS / TCS",
    section: "Section 392",
  },
  {
    id: "tds-dec-2026",
    date: "2026-12-07",
    title: "TDS / TCS Payment — November 2026 Deductions",
    description: "Deposit TDS/TCS deducted/collected during November 2026.",
    category: "TDS / TCS",
    section: "Section 392",
  },
  {
    id: "adv-tax-q3-2627",
    date: "2026-12-15",
    title: "Advance Tax — 3rd Instalment (75% Cumulative)",
    description: "Total advance tax paid so far must be at least 75% of your estimated full-year tax liability. Three-quarters of the year has passed — check your liability carefully.",
    category: "Advance Tax",
    section: "Section 425",
    important: true,
  },
  {
    id: "belated-itr-ay2627",
    date: "2026-12-31",
    title: "Belated / Revised ITR — Last Date (AY 2026-27)",
    description: "Last chance to file a belated return (if the original was missed) or revise a filed return for Tax Year 2025-26. After this date, no belated or revised return can be filed.",
    category: "ITR Filing",
    section: "Section 263",
    important: true,
  },
  {
    id: "tds-jan-2027",
    date: "2027-01-07",
    title: "TDS / TCS Payment — December 2026 Deductions",
    description: "Deposit TDS/TCS deducted/collected during December 2026.",
    category: "TDS / TCS",
    section: "Section 392",
  },
  {
    id: "tds-return-q3-2627",
    date: "2027-01-31",
    title: "TDS / TCS Return — Q3 (Oct–Dec 2026)",
    description: "File quarterly TDS/TCS statement for deductions/collections during October–December 2026.",
    category: "TDS / TCS",
    section: "Section 392",
    important: true,
  },
  {
    id: "tds-feb-2027",
    date: "2027-02-07",
    title: "TDS / TCS Payment — January 2027 Deductions",
    description: "Deposit TDS/TCS deducted/collected during January 2027.",
    category: "TDS / TCS",
    section: "Section 392",
  },
  {
    id: "form16a-q3-2627",
    date: "2027-02-15",
    title: "Form 16A Issue — Q3 (Oct–Dec 2026)",
    description: "Issue Form 16A to deductees for Q3 of Tax Year 2026-27, within 15 days of the Q3 return due date.",
    category: "TDS / TCS",
    section: "Section 392",
  },
  {
    id: "tds-mar-2027",
    date: "2027-03-07",
    title: "TDS / TCS Payment — February 2027 Deductions",
    description: "Deposit TDS/TCS deducted/collected during February 2027.",
    category: "TDS / TCS",
    section: "Section 392",
  },
  {
    id: "adv-tax-q4-2627",
    date: "2027-03-15",
    title: "Advance Tax — 4th & Final Instalment (100%)",
    description: "All remaining advance tax must be paid in full. 100% of estimated tax liability must be deposited. Also the single-instalment due date for taxpayers under the presumptive taxation scheme.",
    category: "Advance Tax",
    section: "Section 425",
    important: true,
  },
  {
    id: "updated-itr-ay2526",
    date: "2027-03-31",
    title: "Updated ITR (ITR-U) — Last Date for AY 2025-26",
    description: "Last date to file an Updated Return for Tax Year 2024-25 (AY 2025-26). Updated returns attract an additional tax of 25%–50% on the tax payable but allow disclosure of omitted income.",
    category: "ITR Filing",
    section: "Section 263",
  },

  // ── AY 2027-28 — TY 2026-27 filing events ────────────────────────────────

  {
    id: "tds-extended-mar-2027",
    date: "2027-04-30",
    title: "TDS / TCS Payment — March 2027 (Extended Deadline)",
    description: "Extended deadline for depositing TDS/TCS on deductions/collections made during March 2027. Regular 7th-of-month rule is relaxed for March deductions.",
    category: "TDS / TCS",
    section: "Section 392",
    important: true,
  },
  {
    id: "tds-return-q4-2627",
    date: "2027-05-31",
    title: "TDS / TCS Return — Q4 (Jan–Mar 2027)",
    description: "File the final quarterly TDS/TCS statement for January–March 2027. This is the last return for Tax Year 2026-27.",
    category: "TDS / TCS",
    section: "Section 392",
    important: true,
  },
  {
    id: "sft-2027",
    date: "2027-05-31",
    title: "SFT Filing — Statement of Financial Transactions",
    description: "File Statement of Financial Transactions for high-value transactions during Tax Year 2026-27. Applicable to banks, mutual funds, registrars of property, and other specified entities.",
    category: "Other",
    section: "Section 471",
  },
  {
    id: "form16-ay2728",
    date: "2027-06-15",
    title: "Form 16 Issue to Employees (TY 2026-27)",
    description: "Employers must issue Form 16 (Parts A & B — annual salary TDS certificate) to all employees for Tax Year 2026-27. Employees need this to file their ITR.",
    category: "TDS / TCS",
    section: "Section 392",
    important: true,
  },
  {
    id: "form16a-q4-2627",
    date: "2027-06-15",
    title: "Form 16A Issue — Q4 (Jan–Mar 2027)",
    description: "Issue Form 16A to deductees for Q4 of Tax Year 2026-27. This is the final quarterly TDS certificate for TY 2026-27.",
    category: "TDS / TCS",
    section: "Section 392",
  },
  {
    id: "itr-non-audit-ay2728",
    date: "2027-07-31",
    title: "ITR Filing — Non-Audit Cases (TY 2026-27)",
    description: "Primary ITR filing deadline for Tax Year 2026-27 (AY 2027-28). Covers salaried individuals, non-audit businesses, capital gains, house property income. File by this date to avoid late fee of ₹5,000.",
    category: "ITR Filing",
    section: "Section 263",
    important: true,
  },
  {
    id: "tax-audit-ay2728",
    date: "2027-09-30",
    title: "Tax Audit Report (TY 2026-27)",
    description: "Submit tax audit report for Tax Year 2026-27 on the income tax portal. Required if turnover exceeds ₹1 crore (business) or ₹50 lakh (profession), or where audit is mandated under the Act.",
    category: "Tax Audit",
    section: "Section 63",
    important: true,
  },
  {
    id: "itr-audit-ay2728",
    date: "2027-10-31",
    title: "ITR Filing — Audit & Transfer Pricing Cases (TY 2026-27)",
    description: "Last date to file ITR for Tax Year 2026-27 for taxpayers subject to tax audit or transfer pricing documentation requirements.",
    category: "ITR Filing",
    section: "Section 263",
    important: true,
  },
  {
    id: "belated-itr-ay2728",
    date: "2027-12-31",
    title: "Belated / Revised ITR — Last Date (TY 2026-27)",
    description: "Last chance to file a belated return (if the original was missed) or revise an already-filed return for Tax Year 2026-27. After this date the window closes permanently.",
    category: "ITR Filing",
    section: "Section 263",
    important: true,
  },
  {
    id: "updated-itr-ay2728",
    date: "2029-03-31",
    title: "Updated ITR (ITR-U) — Last Date for TY 2026-27",
    description: "Last date to file an Updated Return for Tax Year 2026-27. ITR-U can be filed up to 2 years from the end of the Assessment Year, with additional tax of 25–50% on incremental liability.",
    category: "ITR Filing",
    section: "Section 263",
  },
];
