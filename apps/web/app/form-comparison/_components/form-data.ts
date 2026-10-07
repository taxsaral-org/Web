// Income-tax forms — Income-tax Rules, 1962 → Income-tax Rules, 2026.
//
// New form numbers, titles and rules come from the Income-tax Rules, 2026 as
// notified by CBDT (G.S.R. 198(E), 20 March 2026; forms in Appendix III), the
// official copy of which is published on the e-filing portal (RULES_2026_PDF).
// Old-to-new pairings follow the Income Tax Department's own form documents
// ("Form No. 130 … (Earlier Form No. 16/16A …)") and its Form Mapping Guide;
// where no pairing is published, the new form carrying the same subject matter
// under the corresponding section is used. `pdfPage` is the page of the official
// PDF on which the new form (or, for returns, rule 164) begins.

export const RULES_2026_PDF =
  "https://www.incometax.gov.in/iec/foportal/sites/default/files/2026-03/En-Notified-IT-Rules-2026-20-03-2026.pdf";

/** Income-tax (Fifth Amendment) Rules, 2026 — Notification No. 121/2026, in force 1 October 2026. */
const FIFTH_AMENDMENT = {
  label: "Amended w.e.f. 1 Oct 2026 — Notification No. 121/2026",
  url: "https://www.incometax.gov.in/iec/foportal/sites/default/files/2026-09/Notification-no-121-2026.pdf",
};

/** Income-tax (Third Amendment) Rules, 2026 — Notification No. 97/2026 (24 July 2026); Appendix IV is Form ITR-BN. */
export const THIRD_AMENDMENT_2026_PDF =
  "https://www.incometax.gov.in/iec/foportal/sites/default/files/2026-07/Notification-97-2026.pdf";

/** Link to the official Rules PDF, opened at the given page. */
export const formPdfUrl = (page: number) => `${RULES_2026_PDF}#page=${page}`;

/** Where a form's link points: its own notification if it has one, else the Rules PDF at `pdfPage`. */
export const formLink = (f: FormEntry) => f.pdfUrl ?? formPdfUrl(f.pdfPage);

/**
 * Same — the form keeps its name; Renumbered — one old form became one new form;
 * Merged — several old forms were combined into one new form; Renamed — the
 * form keeps its role under a new name (ITR-B → ITR-BN, ITR-U → ITR-UN).
 */
export type FormStatus = "Same" | "Renumbered" | "Merged" | "Renamed";

export type FormCategory =
  | "Returns of Income (ITR)"
  | "TDS / TCS Returns"
  | "TDS / TCS Certificates"
  | "Declarations & Undertakings"
  | "Audit Reports"
  | "Salary & Employer Forms"
  | "Deductions & Claims"
  | "Appeals"
  | "Other Procedural Forms";

export interface FormEntry {
  oldForm: string;      // Income-tax Rules, 1962
  newForm: string;      // Income-tax Rules, 2026
  purpose: string;      // What the form is for
  oldSection: string;   // Relevant section of the IT Act 1961
  newSection: string;   // Relevant section of the IT Act 2025
  /** Rule of the Income-tax Rules, 2026 that prescribes the new form. */
  newRule: string;
  /** Page of the official Rules PDF on which the new form begins. */
  pdfPage: number;
  /** A form notified separately (outside the Rules PDF) links here instead. */
  pdfUrl?: string;
  category: FormCategory;
  status: FormStatus;
  notes?: string;
  /** A later notification that amended the new form. */
  amendment?: { label: string; url: string };
}

export const FORM_CATEGORIES: FormCategory[] = [
  "Returns of Income (ITR)",
  "TDS / TCS Returns",
  "TDS / TCS Certificates",
  "Declarations & Undertakings",
  "Audit Reports",
  "Salary & Employer Forms",
  "Deductions & Claims",
  "Appeals",
  "Other Procedural Forms",
];

const RETURN_RULE = { newRule: "Rule 164", pdfPage: 130 } as const;

export const FORMS: FormEntry[] = [
  // ── Returns of Income ────────────────────────────────────────────────────
  {
    oldForm: "ITR-1 (Sahaj)",
    newForm: "ITR-1 (Sahaj)",
    purpose: "For resident individuals with income from salary, one house property, other sources (interest etc.) and total income up to ₹50 lakh",
    oldSection: "Section 139(1)",
    newSection: "Section 263(1)",
    ...RETURN_RULE,
    category: "Returns of Income (ITR)",
    status: "Same",
    notes: "Return forms keep their names under rule 164 of the Income-tax Rules, 2026; the link opens that rule.",
  },
  {
    oldForm: "ITR-2",
    newForm: "ITR-2",
    purpose: "For individuals and HUF not having income from profits and gains of business or profession",
    oldSection: "Section 139(1)",
    newSection: "Section 263(1)",
    ...RETURN_RULE,
    category: "Returns of Income (ITR)",
    status: "Same",
  },
  {
    oldForm: "ITR-3",
    newForm: "ITR-3",
    purpose: "For individuals and HUF having income from profits and gains of business or profession",
    oldSection: "Section 139(1)",
    newSection: "Section 263(1)",
    ...RETURN_RULE,
    category: "Returns of Income (ITR)",
    status: "Same",
  },
  {
    oldForm: "ITR-4 (Sugam)",
    newForm: "ITR-4 (Sugam)",
    purpose: "For individuals, HUF and firms (other than LLP) with presumptive income from business or profession",
    oldSection: "Sections 44AD / 44ADA / 44AE",
    newSection: "Section 58",
    ...RETURN_RULE,
    category: "Returns of Income (ITR)",
    status: "Same",
  },
  {
    oldForm: "ITR-5",
    newForm: "ITR-5",
    purpose: "For firms, LLPs, AOP, BOI, artificial juridical person, co-operative society",
    oldSection: "Section 139(1)",
    newSection: "Section 263(1)",
    ...RETURN_RULE,
    category: "Returns of Income (ITR)",
    status: "Same",
  },
  {
    oldForm: "ITR-6",
    newForm: "ITR-6",
    purpose: "For companies other than companies claiming exemption as a charitable or religious organisation",
    oldSection: "Section 139(1)",
    newSection: "Section 263(1)",
    ...RETURN_RULE,
    category: "Returns of Income (ITR)",
    status: "Same",
  },
  {
    oldForm: "ITR-7",
    newForm: "ITR-7",
    purpose: "For persons including companies required to furnish returns as registered non-profit organisations, political parties, electoral trusts, research associations and similar bodies",
    oldSection: "Section 139(4A)–(4D)",
    newSection: "Sections 263(1) & 349",
    ...RETURN_RULE,
    category: "Returns of Income (ITR)",
    status: "Same",
  },
  {
    oldForm: "ITR-U",
    newForm: "ITR-UN",
    purpose: "Updated return — to report omitted income or correct under-reporting after the time for a belated or revised return, on payment of additional tax",
    oldSection: "Sections 139(8A), 140B",
    newSection: "Sections 263(6), 267",
    newRule: "Rule 165",
    pdfPage: 132,
    category: "Returns of Income (ITR)",
    status: "Renamed",
    notes: "Rule 165 prescribes Form ITR-UN; the form layout itself had not been published when checked (October 2026), so the link opens rule 165. Updated returns for years up to Tax Year 2025-26 continue in ITR-U under the 1961 Act.",
  },
  {
    oldForm: "ITR-B",
    newForm: "ITR-BN",
    purpose: "Return of undisclosed income for the block period, furnished in response to a notice after a search or requisition (block assessment)",
    oldSection: "Section 158BC(1)(a)",
    newSection: "Section 294(1)(a)",
    newRule: "Rule 180",
    pdfPage: 139,
    pdfUrl: `${THIRD_AMENDMENT_2026_PDF}#page=1`,
    category: "Returns of Income (ITR)",
    status: "Renamed",
    notes: "Form ITR-BN was notified by the Income-tax (Third Amendment) Rules, 2026 (Notification No. 97/2026) for searches and requisitions on or after 1 April 2026; the link opens the notified form. ITR-B continues for searches under the 1961 Act from 1 September 2024.",
  },
  {
    oldForm: "ITR-V",
    newForm: "ITR-V",
    purpose: "Verification form for a return furnished electronically without a digital signature or electronic verification code",
    oldSection: "Section 139",
    newSection: "Section 263",
    ...RETURN_RULE,
    category: "Returns of Income (ITR)",
    status: "Same",
  },

  // ── TDS / TCS Returns ────────────────────────────────────────────────────
  {
    oldForm: "Form 24Q",
    newForm: "Form No. 138",
    purpose: "Quarterly statement of tax deducted at source from salary",
    oldSection: "Sections 192, 200(3)",
    newSection: "Sections 392, 397(3)(b)",
    newRule: "Rule 219(1)",
    pdfPage: 768,
    category: "TDS / TCS Returns",
    status: "Renumbered",
  },
  {
    oldForm: "Form 26Q",
    newForm: "Form No. 140",
    purpose: "Quarterly statement of tax deducted at source on payments other than salary to residents",
    oldSection: "Sections 193–196D, 200(3)",
    newSection: "Sections 393, 397(3)(b)",
    newRule: "Rule 219(1)",
    pdfPage: 778,
    category: "TDS / TCS Returns",
    status: "Renumbered",
  },
  {
    oldForm: "Form 27Q",
    newForm: "Form No. 144",
    purpose: "Quarterly statement of tax deducted at source on payments, other than salary, to non-residents",
    oldSection: "Sections 195, 200(3)",
    newSection: "Sections 393, 397(3)(b)",
    newRule: "Rule 219(1)",
    pdfPage: 797,
    category: "TDS / TCS Returns",
    status: "Renumbered",
  },
  {
    oldForm: "Form 27EQ",
    newForm: "Form No. 143",
    purpose: "Quarterly statement of tax collected at source",
    oldSection: "Section 206C",
    newSection: "Sections 394, 397(3)(b)",
    newRule: "Rule 219(1)",
    pdfPage: 792,
    category: "TDS / TCS Returns",
    status: "Renumbered",
  },

  // ── TDS / TCS Certificates ───────────────────────────────────────────────
  {
    oldForm: "Form 16",
    newForm: "Form No. 130",
    purpose: "Annual certificate of tax deducted at source on salary (and on pension or interest of specified senior citizens) — issued by the employer or bank",
    oldSection: "Section 203",
    newSection: "Section 395",
    newRule: "Rule 215(1)",
    pdfPage: 742,
    category: "TDS / TCS Certificates",
    status: "Renumbered",
  },
  {
    oldForm: "Form 16A",
    newForm: "Form No. 131",
    purpose: "Certificate of tax deducted at source on payments other than salary (interest, rent, professional fees, etc.)",
    oldSection: "Section 203",
    newSection: "Section 395(4)",
    newRule: "Rule 215(1)",
    pdfPage: 749,
    category: "TDS / TCS Certificates",
    status: "Renumbered",
  },
  {
    oldForm: "Form 16B",
    newForm: "Form No. 132",
    purpose: "Certificate of tax deducted at source on purchase of immovable property",
    oldSection: "Section 194-IA",
    newSection: "Sections 393, 395(4)",
    newRule: "Rule 215(1)",
    pdfPage: 751,
    category: "TDS / TCS Certificates",
    status: "Merged",
    notes: "Form No. 132 replaces Forms 16B, 16C, 16D and 16E.",
    amendment: FIFTH_AMENDMENT,
  },
  {
    oldForm: "Form 16C",
    newForm: "Form No. 132",
    purpose: "Certificate of tax deducted at source on rent paid by an individual or HUF",
    oldSection: "Section 194-IB",
    newSection: "Sections 393, 395(4)",
    newRule: "Rule 215(1)",
    pdfPage: 751,
    category: "TDS / TCS Certificates",
    status: "Merged",
    amendment: FIFTH_AMENDMENT,
  },
  {
    oldForm: "Form 27D",
    newForm: "Form No. 133",
    purpose: "Certificate of tax collected at source, issued by the seller to the buyer",
    oldSection: "Section 206C",
    newSection: "Section 395(4)",
    newRule: "Rule 215(1)",
    pdfPage: 753,
    category: "TDS / TCS Certificates",
    status: "Renumbered",
  },

  // ── Declarations & Undertakings ──────────────────────────────────────────
  {
    oldForm: "Form 15G",
    newForm: "Form No. 121",
    purpose: "Declaration that tax on estimated total income is nil — for receiving interest, dividend etc. without deduction of tax",
    oldSection: "Section 197A",
    newSection: "Section 393(6)",
    newRule: "Rule 211",
    pdfPage: 708,
    category: "Declarations & Undertakings",
    status: "Merged",
    notes: "Form No. 121 replaces both Form 15G and Form 15H.",
  },
  {
    oldForm: "Form 15H",
    newForm: "Form No. 121",
    purpose: "Declaration by a resident senior citizen that tax on estimated total income is nil",
    oldSection: "Section 197A(1C)",
    newSection: "Section 393(6)",
    newRule: "Rule 211",
    pdfPage: 708,
    category: "Declarations & Undertakings",
    status: "Merged",
  },
  {
    oldForm: "Form 27C",
    newForm: "Form No. 127",
    purpose: "Declaration by a buyer for obtaining goods without collection of tax, where goods are used for manufacturing, processing or generating power",
    oldSection: "Section 206C(1A)",
    newSection: "Section 394(2)",
    newRule: "Rule 212",
    pdfPage: 725,
    category: "Declarations & Undertakings",
    status: "Renumbered",
  },

  // ── Audit Reports ────────────────────────────────────────────────────────
  {
    oldForm: "Form 3CA",
    newForm: "Form No. 26",
    purpose: "Tax audit report where the accounts are already audited under another law (e.g. the Companies Act)",
    oldSection: "Section 44AB",
    newSection: "Section 63",
    newRule: "Rule 47",
    pdfPage: 343,
    category: "Audit Reports",
    status: "Merged",
    notes: "Form No. 26 combines the old Form 3CD (Parts A and B), 3CA (Part C) and 3CB (Part D).",
  },
  {
    oldForm: "Form 3CB",
    newForm: "Form No. 26",
    purpose: "Tax audit report where the accounts are not audited under any other law",
    oldSection: "Section 44AB",
    newSection: "Section 63",
    newRule: "Rule 47",
    pdfPage: 343,
    category: "Audit Reports",
    status: "Merged",
  },
  {
    oldForm: "Form 3CD",
    newForm: "Form No. 26",
    purpose: "Statement of particulars to be furnished with the tax audit report — disallowances, depreciation, payments and other details",
    oldSection: "Section 44AB",
    newSection: "Section 63",
    newRule: "Rule 47",
    pdfPage: 343,
    category: "Audit Reports",
    status: "Merged",
  },
  {
    oldForm: "Form 3AE",
    newForm: "Form No. 6",
    purpose: "Audit report for claiming deduction of preliminary expenses or of expenditure on prospecting for certain minerals",
    oldSection: "Sections 35D(4), 35E(6)",
    newSection: "Sections 44, 51",
    newRule: "Rule 28",
    pdfPage: 290,
    category: "Audit Reports",
    status: "Renumbered",
  },
  {
    oldForm: "Form 3AF",
    newForm: "Form No. 5",
    purpose: "Statement of preliminary expenses incurred, furnished one month before the due date of the return",
    oldSection: "Section 35D(2)",
    newSection: "Section 44(3)",
    newRule: "Rule 27",
    pdfPage: 288,
    category: "Audit Reports",
    status: "Renumbered",
  },
  {
    oldForm: "Form 3CEA",
    newForm: "Form No. 28",
    purpose: "Report of an accountant on the computation of capital gains (net worth) in a slump sale",
    oldSection: "Section 50B(3)",
    newSection: "Section 77(4)",
    newRule: "Rule 54",
    pdfPage: 374,
    category: "Audit Reports",
    status: "Renumbered",
  },
  {
    oldForm: "Form 3CEB",
    newForm: "Form No. 48",
    purpose: "Report from an accountant on international transactions and specified domestic transactions (transfer pricing)",
    oldSection: "Section 92E",
    newSection: "Section 172",
    newRule: "Rule 85",
    pdfPage: 432,
    category: "Audit Reports",
    status: "Renumbered",
  },
  {
    oldForm: "Form 10B",
    newForm: "Form No. 112",
    purpose: "Audit report of a charitable or religious trust or institution",
    oldSection: "Sections 12A(1)(b), 10(23C)",
    newSection: "Section 348",
    newRule: "Rule 188",
    pdfPage: 651,
    category: "Audit Reports",
    status: "Merged",
    notes: "Form No. 112 is the single audit report for registered non-profit organisations, replacing Forms 10B and 10BB.",
  },
  {
    oldForm: "Form 10BB",
    newForm: "Form No. 112",
    purpose: "Audit report of educational institutions, hospitals and other entities approved under section 10(23C)",
    oldSection: "Section 10(23C)",
    newSection: "Section 348",
    newRule: "Rule 188",
    pdfPage: 651,
    category: "Audit Reports",
    status: "Merged",
  },
  {
    oldForm: "Form 29B",
    newForm: "Form No. 66",
    purpose: "Report of an accountant on the computation of book profit for minimum alternate tax (MAT)",
    oldSection: "Section 115JB",
    newSection: "Section 206(1)",
    newRule: "Rule 137",
    pdfPage: 496,
    category: "Audit Reports",
    status: "Renumbered",
  },
  {
    oldForm: "Form 29C",
    newForm: "Form No. 67",
    purpose: "Report of an accountant on adjusted total income and alternate minimum tax (AMT)",
    oldSection: "Section 115JC",
    newSection: "Section 206(2)",
    newRule: "Rule 138",
    pdfPage: 501,
    category: "Audit Reports",
    status: "Renumbered",
    notes: "Form No. 67 is now the AMT report — the old Form 67 (foreign tax credit) is Form No. 44.",
  },

  // ── Salary & Employer Forms ──────────────────────────────────────────────
  {
    oldForm: "Form 12B",
    newForm: "Form No. 122",
    purpose: "Statement furnished by an employee to a new employer — salary received from previous employer(s) during the year",
    oldSection: "Section 192(2)",
    newSection: "Section 392(4)",
    newRule: "Rule 204(1)",
    pdfPage: 712,
    category: "Salary & Employer Forms",
    status: "Renumbered",
  },
  {
    oldForm: "Form 12BA",
    newForm: "Form No. 123",
    purpose: "Statement of perquisites, other fringe benefits or amenities and profits in lieu of salary",
    oldSection: "Section 192(2C)",
    newSection: "Section 392",
    newRule: "Rule 204(2)(b)",
    pdfPage: 716,
    category: "Salary & Employer Forms",
    status: "Renumbered",
  },
  {
    oldForm: "Form 12BB",
    newForm: "Form No. 124",
    purpose: "Statement by an employee of claims for deductions, exemptions and allowances (HRA, LTA, interest, investments) for computing TDS on salary",
    oldSection: "Section 192(2D)",
    newSection: "Section 392(5)(b)",
    newRule: "Rule 205",
    pdfPage: 719,
    category: "Salary & Employer Forms",
    status: "Renumbered",
  },
  {
    oldForm: "Form 10E",
    newForm: "Form No. 39",
    purpose: "Claim of relief where salary is received in arrears or in advance, or on gratuity, retrenchment compensation or commuted pension",
    oldSection: "Section 89(1)",
    newSection: "Section 157(1)",
    newRule: "Rule 73",
    pdfPage: 407,
    category: "Salary & Employer Forms",
    status: "Renumbered",
    notes: "Relief prevents higher tax from income of several years being taxed in one year.",
  },

  // ── Deductions & Claims ──────────────────────────────────────────────────
  {
    oldForm: "Form 10BA",
    newForm: "Form No. 31",
    purpose: "Declaration for claiming deduction for rent paid where no HRA is received",
    oldSection: "Section 80GG",
    newSection: "Section 134",
    newRule: "Rule 65",
    pdfPage: 381,
    category: "Deductions & Claims",
    status: "Renumbered",
  },
  {
    oldForm: "Form 67",
    newForm: "Form No. 44",
    purpose: "Statement of income from a country or region outside India and claim of foreign tax credit",
    oldSection: "Sections 90 / 91",
    newSection: "Sections 159 / 160",
    newRule: "Rule 76(10)",
    pdfPage: 420,
    category: "Deductions & Claims",
    status: "Renumbered",
    notes: "Do not confuse with the new Form No. 67, which is the AMT report.",
  },

  // ── Other Procedural Forms ───────────────────────────────────────────────
  {
    oldForm: "Form 26AS",
    newForm: "Form No. 168",
    purpose: "Annual Information Statement — TDS, TCS, tax payments, refunds and specified financial transactions linked to a PAN",
    oldSection: "Sections 203AA / 285BB",
    newSection: "Section 510",
    newRule: "Rule 245",
    pdfPage: 897,
    category: "Other Procedural Forms",
    status: "Renumbered",
    notes: "Applies from Tax Year 2026-27; Form 26AS continues for earlier years.",
  },
  {
    oldForm: "Form 26QB",
    newForm: "Form No. 141",
    purpose: "Challan-cum-statement for TDS on purchase of immovable property",
    oldSection: "Section 194-IA",
    newSection: "Section 393(1)",
    newRule: "Rules 218(3), 219(5)",
    pdfPage: 785,
    category: "Other Procedural Forms",
    status: "Merged",
    notes: "Form No. 141 replaces Forms 26QB, 26QC, 26QD and 26QE.",
    amendment: FIFTH_AMENDMENT,
  },
  {
    oldForm: "Form 26QC",
    newForm: "Form No. 141",
    purpose: "Challan-cum-statement for TDS on rent paid by an individual or HUF",
    oldSection: "Section 194-IB",
    newSection: "Section 393(1)",
    newRule: "Rules 218(3), 219(5)",
    pdfPage: 785,
    category: "Other Procedural Forms",
    status: "Merged",
    amendment: FIFTH_AMENDMENT,
  },
  {
    oldForm: "Form 13",
    newForm: "Form No. 128",
    purpose: "Application for a certificate for lower or nil deduction, or lower collection, of tax",
    oldSection: "Sections 197, 206C(9)",
    newSection: "Sections 395(1), 395(3)",
    newRule: "Rule 213",
    pdfPage: 728,
    category: "Other Procedural Forms",
    status: "Renumbered",
  },
  {
    oldForm: "Form 15CA",
    newForm: "Form No. 145",
    purpose: "Information to be furnished for payments to a non-resident (other than a company) or a foreign company",
    oldSection: "Section 195(6)",
    newSection: "Section 397(3)(d)",
    newRule: "Rule 220",
    pdfPage: 806,
    category: "Other Procedural Forms",
    status: "Renumbered",
  },
  {
    oldForm: "Form 15CB",
    newForm: "Form No. 146",
    purpose: "Certificate of an accountant for payments to a non-resident — nature of payment, rate and treaty position",
    oldSection: "Section 195(6)",
    newSection: "Section 397(3)(d)",
    newRule: "Rule 220(1)(c)",
    pdfPage: 823,
    category: "Other Procedural Forms",
    status: "Renumbered",
  },
  {
    oldForm: "Form 35",
    newForm: "Form No. 99",
    purpose: "Appeal to the Joint Commissioner (Appeals) — JCIT(A) — or the Commissioner of Income-tax (Appeals) — CIT(A)",
    oldSection: "Sections 246, 246A, 249",
    newSection: "Sections 356, 357, 358",
    newRule: "Rule 167",
    pdfPage: 592,
    category: "Appeals",
    status: "Renumbered",
    notes: "One form for both: rule 167 prescribes Form No. 99 for an appeal to the Joint Commissioner (Appeals) or the Commissioner (Appeals), filed electronically.",
  },
  {
    oldForm: "Form 36",
    newForm: "Form No. 115",
    purpose: "Appeal to the Income-tax Appellate Tribunal (ITAT)",
    oldSection: "Section 253",
    newSection: "Section 362",
    newRule: "Rule 193",
    pdfPage: 686,
    category: "Appeals",
    status: "Renumbered",
  },
  {
    oldForm: "Form 49A / 49AA",
    newForm: "Form Nos. 93–96",
    purpose: "Application for allotment of PAN — separate forms by type of applicant (Indian or foreign, individual or entity)",
    oldSection: "Section 139A",
    newSection: "Section 262",
    newRule: "Rule 158",
    pdfPage: 571,
    category: "Other Procedural Forms",
    status: "Renumbered",
  },
  {
    oldForm: "Form 49B",
    newForm: "Form Nos. 134 / 135",
    purpose: "Application for allotment of TAN (Tax Deduction and Collection Account Number)",
    oldSection: "Section 203A",
    newSection: "Section 397",
    newRule: "Rule 216(1)",
    pdfPage: 755,
    category: "Other Procedural Forms",
    status: "Renumbered",
  },
];
