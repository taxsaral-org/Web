// Section mapping — Income Tax Act 2025 ↔ Income Tax Act 1961.
//
// Built from two authoritative sources and checked against each other:
//   • The Income-tax Act, 2025 (No. 30 of 2025) as published in the Gazette of
//     India — section numbers, chapters, parts and headings.
//   • ICAI, "Income-tax Act, 2025 including Tabular Mapping of Sections vis-à-vis
//     Income-tax Act, 1961" (first edition, September 2025) — the corresponding
//     1961 provisions.
// Both reflect the Act as enacted; later amendments (e.g. by the Finance Act,
// 2026) are not folded in.
//
// `topic` is the section's official heading. `old` is ICAI's corresponding
// 1961 reference ("—" where the provision is new). Where ICAI maps a whole group
// of sections to one set of 1961 provisions (the non-profit chapter), every
// section of the group carries that reference and `groupRef` is true.

export type MappingCategory =
  | "Preliminary"
  | "Basis of Charge"
  | "Incomes Excluded"
  | "Heads of Income"
  | "Salaries"
  | "House Property"
  | "Business & Profession"
  | "Capital Gains"
  | "Other Sources"
  | "Clubbing of Income"
  | "Aggregation"
  | "Set-off & Losses"
  | "Deductions"
  | "Rebates & Reliefs"
  | "Transfer Pricing"
  | "Anti-Avoidance"
  | "Mode of Payment"
  | "Special Tax Rates"
  | "NRI Provisions"
  | "Pass-through Entities"
  | "Tonnage Tax"
  | "Tax Authorities"
  | "Powers, Survey & Search"
  | "Return Filing"
  | "Assessment"
  | "Firms, AOPs & HUFs"
  | "Non-Profit Organisations"
  | "Appeals, Revision & ADR"
  | "Collection & Recovery"
  | "TDS & TCS"
  | "Advance Tax"
  | "Interest & Fees"
  | "Refunds"
  | "Penalties"
  | "Prosecution"
  | "Miscellaneous";

export const CATEGORIES: MappingCategory[] = [
  "Preliminary",
  "Basis of Charge",
  "Incomes Excluded",
  "Heads of Income",
  "Salaries",
  "House Property",
  "Business & Profession",
  "Capital Gains",
  "Other Sources",
  "Clubbing of Income",
  "Aggregation",
  "Set-off & Losses",
  "Deductions",
  "Rebates & Reliefs",
  "Transfer Pricing",
  "Anti-Avoidance",
  "Mode of Payment",
  "Special Tax Rates",
  "NRI Provisions",
  "Pass-through Entities",
  "Tonnage Tax",
  "Tax Authorities",
  "Powers, Survey & Search",
  "Return Filing",
  "Assessment",
  "Firms, AOPs & HUFs",
  "Non-Profit Organisations",
  "Appeals, Revision & ADR",
  "Collection & Recovery",
  "TDS & TCS",
  "Advance Tax",
  "Interest & Fees",
  "Refunds",
  "Penalties",
  "Prosecution",
  "Miscellaneous",
];

/** Chapter titles of the Income Tax Act 2025, keyed by chapter number. */
export const CHAPTER_TITLES: Record<string, string> = {
  I:      "Preliminary",
  II:     "Basis of charge",
  III:    "Incomes which do not form part of total income",
  IV:     "Computation of total income",
  V:      "Income of other persons included in total income of assessee",
  VI:     "Aggregation of income",
  VII:    "Set off, or carry forward and set off of losses",
  VIII:   "Deductions to be made in computing total income",
  IX:     "Rebates and reliefs",
  X:      "Special provisions relating to avoidance of tax",
  XI:     "General anti-avoidance rule",
  XII:    "Mode of payment in certain cases, etc.",
  XIII:   "Determination of tax in special cases",
  XIV:    "Tax administration",
  XV:     "Return of income",
  XVI:    "Procedure for assessment",
  XVII:   "Special provisions relating to certain persons",
  XVIII:  "Appeals, revisions and alternate dispute resolutions",
  XIX:    "Collection and recovery of tax",
  XX:     "Refunds",
  XXI:    "Penalties",
  XXII:   "Offences and prosecution",
  XXIII:  "Miscellaneous",
};

/** Part titles within chapters, keyed "IV-B" etc. */
export const PART_TITLES: Record<string, string> = {
  "III-A":   "Incomes not to be included in total income",
  "III-B":   "Incomes not to be included in total income of political parties and electoral trusts",
  "IV-A":    "Heads of income",
  "IV-B":    "Salaries",
  "IV-C":    "Income from house property",
  "IV-D":    "Profits and gains of business or profession",
  "IV-E":    "Capital gains",
  "IV-F":    "Income from other sources",
  "VIII-A":  "General",
  "VIII-B":  "Deductions in respect of certain payments",
  "VIII-C":  "Deductions in respect of certain incomes",
  "VIII-D":  "Deductions in respect of other incomes",
  "VIII-E":  "Other deductions",
  "IX-A":    "Rebates and reliefs",
  "IX-B":    "Double taxation relief",
  "XIII-A":  "Determination of tax in certain special cases",
  "XIII-B":  "Special provisions relating to tax on capital gains",
  "XIII-C":  "New tax regime",
  "XIII-D":  "Special provisions relating to minimum alternate tax and alternate minimum tax",
  "XIII-E":  "Special provisions relating to non-residents and foreign companies",
  "XIII-F":  "Special provisions relating to pass-through entities",
  "XIII-G":  "Special provisions relating to income of shipping companies",
  "XIV-A":   "Authorities, jurisdiction and functions",
  "XIV-B":   "Powers",
  "XV-A":    "Allotment of Permanent Account Number",
  "XV-B":    "Filing of return of income",
  "XVI-A":   "Procedure for assessment",
  "XVI-B":   "Special procedure for assessment of search cases",
  "XVII-A":  "Association of persons, firm, Hindu undivided family, etc.",
  "XVII-B":  "Special provisions for registered non-profit organisation",
  "XVIII-A": "Appeals",
  "XVIII-B": "Special provisions for avoiding repetitive appeals",
  "XVIII-C": "Revision by the Principal Chief Commissioner or Chief Commissioner or Principal Commissioner or Commissioner",
  "XVIII-D": "Alternate dispute resolutions",
  "XIX-A":   "General",
  "XIX-B":   "Deduction and collection at source",
  "XIX-C":   "Advance payment of tax",
  "XIX-D":   "Collection and recovery",
  "XIX-E":   "Interest chargeable in certain cases",
  "XIX-F":   "Levy of fee in certain cases",
};

export interface SectionMap {
  /** Section of the Income Tax Act 2025. */
  new: string;
  /** Corresponding provision(s) of the Income Tax Act 1961, per ICAI. */
  old: string;
  /** Official heading of the 2025 section. */
  topic: string;
  category: MappingCategory;
  /** Chapter of the 2025 Act (roman numeral). */
  chapter: string;
  /** Part letter within the chapter, where the chapter has parts. */
  part?: string;
  /** `old` is ICAI's reference for a whole group of sections, not this one alone. */
  groupRef?: true;
}

export const MAPPINGS: SectionMap[] = [
  // ── Chapter I: Preliminary ────────────────────────────────────────────────
  { new: "1",   old: "1", topic: "Short title, extent and commencement", category: "Preliminary", chapter: "I" },
  { new: "2",   old: "2", topic: "Definitions", category: "Preliminary", chapter: "I" },
  { new: "3",   old: "3", topic: "Definition of “tax year”", category: "Preliminary", chapter: "I" },

  // ── Chapter II: Basis of charge ───────────────────────────────────────────
  { new: "4",   old: "4", topic: "Charge of income-tax", category: "Basis of Charge", chapter: "II" },
  { new: "5",   old: "5", topic: "Scope of total income", category: "Basis of Charge", chapter: "II" },
  { new: "6",   old: "6", topic: "Residence in India", category: "Basis of Charge", chapter: "II" },
  { new: "7",   old: "7, 8", topic: "Income deemed to be received and dividend deemed to be income in a tax year", category: "Basis of Charge", chapter: "II" },
  { new: "8",   old: "9B", topic: "Income on receipt of capital asset or stock-in-trade by specified person from specified entity", category: "Basis of Charge", chapter: "II" },
  { new: "9",   old: "9, 9A", topic: "Income deemed to accrue or arise in India (read with Schedule I)", category: "Basis of Charge", chapter: "II" },
  { new: "10",  old: "5A", topic: "Apportionment of income between spouses governed by Portuguese Civil Code", category: "Basis of Charge", chapter: "II" },

  // ── Chapter III: Incomes which do not form part of total income ───────────
  { new: "11",  old: "10", topic: "Incomes not included in total income (read with Schedules II to VII)", category: "Incomes Excluded", chapter: "III", part: "A" },
  { new: "12",  old: "13A, 13B", topic: "Incomes not included in total income of political parties and electoral trusts (read with Schedule VIII)", category: "Incomes Excluded", chapter: "III", part: "B" },

  // ── Chapter IV: Computation of total income ───────────────────────────────
  { new: "13",  old: "14", topic: "Heads of Income", category: "Heads of Income", chapter: "IV", part: "A" },
  { new: "14",  old: "14A", topic: "Income not forming part of total income and expenditure in relation to such income", category: "Heads of Income", chapter: "IV", part: "A" },
  { new: "15",  old: "15", topic: "Salaries", category: "Salaries", chapter: "IV", part: "B" },
  { new: "16",  old: "17", topic: "Income from salary", category: "Salaries", chapter: "IV", part: "B" },
  { new: "17",  old: "17", topic: "Perquisite", category: "Salaries", chapter: "IV", part: "B" },
  { new: "18",  old: "17", topic: "Profits in lieu of salary", category: "Salaries", chapter: "IV", part: "B" },
  { new: "19",  old: "10(10), 10(10A), 10(10AA), 10(10B), 10(10C), 16", topic: "Deductions from salaries", category: "Salaries", chapter: "IV", part: "B" },
  { new: "20",  old: "22", topic: "Income from house property", category: "House Property", chapter: "IV", part: "C" },
  { new: "21",  old: "23, 27", topic: "Determination of annual value", category: "House Property", chapter: "IV", part: "C" },
  { new: "22",  old: "24, 25", topic: "Deductions from income from house property", category: "House Property", chapter: "IV", part: "C" },
  { new: "23",  old: "25A", topic: "Arrears of rent and unrealised rent received subsequently", category: "House Property", chapter: "IV", part: "C" },
  { new: "24",  old: "26", topic: "Property owned by co-owners", category: "House Property", chapter: "IV", part: "C" },
  { new: "25",  old: "27", topic: "Interpretation", category: "House Property", chapter: "IV", part: "C" },
  { new: "26",  old: "28", topic: "Income under head “Profits and gains of business or profession”", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "27",  old: "29", topic: "Manner of computing profits and gains of business or profession", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "28",  old: "30, 31, 38", topic: "Rent, rates, taxes, repairs and insurance", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "29",  old: "36, 40A", topic: "Deductions related to employee welfare", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "30",  old: "36", topic: "Deduction on certain premium", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "31",  old: "36", topic: "Deduction for bad debt and provision for bad and doubtful debt", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "32",  old: "36", topic: "Other deductions", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "33",  old: "32, 38", topic: "Deduction for depreciation", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "34",  old: "37", topic: "General conditions for allowable deductions", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "35",  old: "40", topic: "Amounts not deductible in certain circumstances", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "36",  old: "40A", topic: "Expenses or payments not deductible in certain circumstances", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "37",  old: "43B", topic: "Certain deductions allowed on actual payment basis only", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "38",  old: "41", topic: "Certain sums deemed as profits and gains of business or profession", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "39",  old: "43", topic: "Computation of actual cost", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "40",  old: "43C", topic: "Special provision for computation of cost of acquisition of certain assets", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "41",  old: "43", topic: "Written down value of depreciable asset", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "42",  old: "43A", topic: "Capitalising impact of foreign exchange fluctuation", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "43",  old: "43AA", topic: "Taxation of foreign exchange fluctuation", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "44",  old: "35D", topic: "Amortisation of certain preliminary expenses", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "45",  old: "35", topic: "Expenditure on scientific research (read with Schedule XIII)", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "46",  old: "35AD", topic: "Capital expenditure of specified business", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "47",  old: "35CCC, 35CCD", topic: "Expenditure on agricultural extension project and skill development project", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "48",  old: "33AB", topic: "Tea development account, coffee development account and rubber development account (read with Schedule IX)", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "49",  old: "33ABA", topic: "Site Restoration Fund (read with Schedule X)", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "50",  old: "44A", topic: "Special provision in case of trade, profession or similar association", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "51",  old: "35E", topic: "Amortisation of expenditure for prospecting certain minerals (read with Schedule XII)", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "52",  old: "35ABA, 35ABB, 35DD, 35DDA", topic: "Amortisation of expenditure for telecommunications services, amalgamation, demerger, scheme of voluntary retirement, etc", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "53",  old: "43CA", topic: "Full value of consideration for transfer of assets other than capital assets in certain cases", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "54",  old: "42", topic: "Business of prospecting for mineral oils", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "55",  old: "44", topic: "Insurance business (read with Schedule XIV)", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "56",  old: "43D", topic: "Special provision in case of interest income of specified financial institutions", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "57",  old: "43CB", topic: "Revenue recognition for construction and service contracts", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "58",  old: "44AD, 44ADA, 44AE", topic: "Special provision for computing profits and gains of business or profession on presumptive basis in case of certain residents", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "59",  old: "44DA", topic: "Computation of royalty and fee for technical services in hands of non-residents", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "60",  old: "44C", topic: "Deduction of head office expenditure in case of non-residents", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "61",  old: "44B, 44BB, 44BBA, 44BBB, 44BBC, 44BBD", topic: "Special provision for computation of income on presumptive basis in respect of certain business activities of certain non-residents", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "62",  old: "44AA", topic: "Maintenance of books of account", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "63",  old: "44AB", topic: "Tax audit", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "64",  old: "44DB", topic: "Special provision for computing deductions in case of business reorganisation of co-operative banks", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "65",  old: "44DB", topic: "Interpretation for purposes of section 64", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "66",  old: "28 to 44DA", topic: "Interpretation", category: "Business & Profession", chapter: "IV", part: "D" },
  { new: "67",  old: "45", topic: "Capital gains", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "68",  old: "46", topic: "Capital gains on distribution of assets by companies in liquidation", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "69",  old: "46A", topic: "Capital gains on purchase by company of its own shares or other specified securities", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "70",  old: "47", topic: "Transactions not regarded as transfer", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "71",  old: "47A", topic: "Withdrawal of exemption in certain cases", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "72",  old: "48", topic: "Mode of computation of capital gains", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "73",  old: "49", topic: "Cost with reference to certain modes of acquisition", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "74",  old: "50", topic: "Special provision for computation of capital gains in case of depreciable assets", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "75",  old: "50A", topic: "Special provision for cost of acquisition in case of depreciable asset", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "76",  old: "50AA", topic: "Special provision for computation of capital gains in case of Market Linked Debenture", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "77",  old: "50B", topic: "Special provision for computation of capital gains in case of slump sale", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "78",  old: "50C", topic: "Special provision for full value of consideration in certain cases", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "79",  old: "50CA", topic: "Special provision for full value of consideration for transfer of share other than quoted share", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "80",  old: "50D", topic: "Fair market value deemed to be full value of consideration in certain cases", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "81",  old: "51", topic: "Advance money received", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "82",  old: "54", topic: "Profit on sale of property used for residence", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "83",  old: "54B", topic: "Capital gains on transfer of land used for agricultural purposes not to be charged in certain cases", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "84",  old: "54D", topic: "Capital gains on compulsory acquisition of lands and buildings not to be charged in certain cases", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "85",  old: "54EC", topic: "Capital gains not to be charged on investment in certain bonds", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "86",  old: "54F", topic: "Capital gains on transfer of certain capital assets not to be charged in case of investment in residential house", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "87",  old: "54G", topic: "Exemption of capital gains on transfer of assets in cases of shifting of industrial undertaking from urban area", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "88",  old: "54GA", topic: "Exemption of capital gains on transfer of assets in cases of shifting of industrial undertaking from urban area to any Special Economic Zone", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "89",  old: "54H", topic: "Extension of time for acquiring new asset or depositing or investing amount of capital gains", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "90",  old: "55", topic: "Meaning of “adjusted”, “cost of improvement” and “cost of acquisition”", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "91",  old: "55A", topic: "Reference to Valuation Officer", category: "Capital Gains", chapter: "IV", part: "E" },
  { new: "92",  old: "56", topic: "Income from other sources", category: "Other Sources", chapter: "IV", part: "F" },
  { new: "93",  old: "57", topic: "Deductions", category: "Other Sources", chapter: "IV", part: "F" },
  { new: "94",  old: "58", topic: "Amounts not deductible", category: "Other Sources", chapter: "IV", part: "F" },
  { new: "95",  old: "59", topic: "Profits chargeable to tax", category: "Other Sources", chapter: "IV", part: "F" },

  // ── Chapter V: Income of other persons included in total income of assessee ──
  { new: "96",  old: "60", topic: "Transfer of income without transfer of assets", category: "Clubbing of Income", chapter: "V" },
  { new: "97",  old: "61, 62", topic: "Chargeability of income in transfer of assets", category: "Clubbing of Income", chapter: "V" },
  { new: "98",  old: "63", topic: "“Transfer” and “revocable transfer” defined", category: "Clubbing of Income", chapter: "V" },
  { new: "99",  old: "64", topic: "Income of individual to include income of spouse, minor child, etc", category: "Clubbing of Income", chapter: "V" },
  { new: "100", old: "65", topic: "Liability of person in respect of income included in income of another person", category: "Clubbing of Income", chapter: "V" },

  // ── Chapter VI: Aggregation of income ─────────────────────────────────────
  { new: "101", old: "66", topic: "Total income", category: "Aggregation", chapter: "VI" },
  { new: "102", old: "68", topic: "Unexplained credits", category: "Aggregation", chapter: "VI" },
  { new: "103", old: "69, 69B", topic: "Unexplained investment", category: "Aggregation", chapter: "VI" },
  { new: "104", old: "69A, 69B", topic: "Unexplained asset", category: "Aggregation", chapter: "VI" },
  { new: "105", old: "69C", topic: "Unexplained expenditure", category: "Aggregation", chapter: "VI" },
  { new: "106", old: "69D", topic: "Amount borrowed or repaid through negotiable instrument, hundi, etc", category: "Aggregation", chapter: "VI" },
  { new: "107", old: "—", topic: "Charge of tax", category: "Aggregation", chapter: "VI" },

  // ── Chapter VII: Set off, or carry forward and set off of losses ──────────
  { new: "108", old: "70", topic: "Set off of losses under same head of income", category: "Set-off & Losses", chapter: "VII" },
  { new: "109", old: "71", topic: "Set off of losses under any other head of income", category: "Set-off & Losses", chapter: "VII" },
  { new: "110", old: "71B", topic: "Carry forward and set off of loss from house property", category: "Set-off & Losses", chapter: "VII" },
  { new: "111", old: "74", topic: "Carry forward and set off of loss from Capital gains", category: "Set-off & Losses", chapter: "VII" },
  { new: "112", old: "72", topic: "Carry forward and set off of business loss", category: "Set-off & Losses", chapter: "VII" },
  { new: "113", old: "73", topic: "Set off and carry forward of losses computed in respect of speculation business", category: "Set-off & Losses", chapter: "VII" },
  { new: "114", old: "73A", topic: "Set off and carry forward of losses computed in respect of specified business", category: "Set-off & Losses", chapter: "VII" },
  { new: "115", old: "74A", topic: "Set off and carry forward of losses from specified activity", category: "Set-off & Losses", chapter: "VII" },
  { new: "116", old: "72A", topic: "Treatment of accumulated losses and unabsorbed depreciation in amalgamation or demerger, etc", category: "Set-off & Losses", chapter: "VII" },
  { new: "117", old: "72AA", topic: "Treatment of accumulated losses and unabsorbed depreciation in scheme of amalgamation in certain cases", category: "Set-off & Losses", chapter: "VII" },
  { new: "118", old: "72AB", topic: "Carry forward and set off of losses and unabsorbed depreciation in business reorganisation of co-operative banks", category: "Set-off & Losses", chapter: "VII" },
  { new: "119", old: "78, 79", topic: "Carry forward and set off of losses not permissible in certain cases", category: "Set-off & Losses", chapter: "VII" },
  { new: "120", old: "79A", topic: "No set off of losses against undisclosed income consequent to search, requisition and survey", category: "Set-off & Losses", chapter: "VII" },
  { new: "121", old: "80", topic: "Submission of return for losses", category: "Set-off & Losses", chapter: "VII" },

  // ── Chapter VIII: Deductions to be made in computing total income ─────────
  { new: "122", old: "80A, 80AB, 80AC, 80B", topic: "Deductions to be made in computing total income", category: "Deductions", chapter: "VIII", part: "A" },
  { new: "123", old: "80C, 80CCC, 80CCE", topic: "Deduction for life insurance premia, deferred annuity, contributions to provident fund, etc (read with Schedule XV)", category: "Deductions", chapter: "VIII", part: "B" },
  { new: "124", old: "80CCD", topic: "Deduction in respect of employer and assessee contribution to pension scheme of Central Government (read with Schedule XV)", category: "Deductions", chapter: "VIII", part: "B" },
  { new: "125", old: "80CCH", topic: "Deduction in respect of contribution to Agnipath Scheme", category: "Deductions", chapter: "VIII", part: "B" },
  { new: "126", old: "80D", topic: "Deduction in respect of health insurance premia", category: "Deductions", chapter: "VIII", part: "B" },
  { new: "127", old: "80DD", topic: "Deduction in respect of maintenance including medical treatment of a dependant who is a person with disability", category: "Deductions", chapter: "VIII", part: "B" },
  { new: "128", old: "80DDB", topic: "Deduction in respect of medical treatment, etc", category: "Deductions", chapter: "VIII", part: "B" },
  { new: "129", old: "80E", topic: "Deduction in respect of interest on loan taken for higher education", category: "Deductions", chapter: "VIII", part: "B" },
  { new: "130", old: "80EE", topic: "Deduction in respect of interest on loan taken for residential house property", category: "Deductions", chapter: "VIII", part: "B" },
  { new: "131", old: "80EEA", topic: "Deduction in respect of interest on loan taken for certain house property", category: "Deductions", chapter: "VIII", part: "B" },
  { new: "132", old: "80EEB", topic: "Deduction in respect of purchase of electric vehicle", category: "Deductions", chapter: "VIII", part: "B" },
  { new: "133", old: "80G", topic: "Deduction in respect of donations to certain funds, charitable institutions, etc", category: "Deductions", chapter: "VIII", part: "B" },
  { new: "134", old: "80GG", topic: "Deductions in respect of rents paid", category: "Deductions", chapter: "VIII", part: "B" },
  { new: "135", old: "80GGA", topic: "Deduction in respect of certain donations for scientific research or rural development", category: "Deductions", chapter: "VIII", part: "B" },
  { new: "136", old: "80GGB", topic: "Deduction in respect of contributions given by companies to political parties", category: "Deductions", chapter: "VIII", part: "B" },
  { new: "137", old: "80GGC", topic: "Deduction in respect of contributions given by any person to political parties", category: "Deductions", chapter: "VIII", part: "B" },
  { new: "138", old: "80-IA", topic: "Deductions in respect of profits and gains from industrial undertakings or enterprises engaged in infrastructure development, etc", category: "Deductions", chapter: "VIII", part: "C" },
  { new: "139", old: "80-IAB", topic: "Deductions in respect of profits and gains by an undertaking or enterprise engaged in development of Special Economic Zone", category: "Deductions", chapter: "VIII", part: "C" },
  { new: "140", old: "80-IAC", topic: "Special provision in respect of specified business", category: "Deductions", chapter: "VIII", part: "C" },
  { new: "141", old: "80-IB", topic: "Deduction in respect of profits and gains from certain industrial undertakings", category: "Deductions", chapter: "VIII", part: "C" },
  { new: "142", old: "80-IBA", topic: "Deductions in respect of profits and gains from housing projects", category: "Deductions", chapter: "VIII", part: "C" },
  { new: "143", old: "80-IE", topic: "Special provisions in respect of certain undertakings in North-Eastern States", category: "Deductions", chapter: "VIII", part: "C" },
  { new: "144", old: "10AA", topic: "Special provisions in respect of newly established Units in Special Economic Zones", category: "Deductions", chapter: "VIII", part: "C" },
  { new: "145", old: "80JJA", topic: "Deduction for businesses engaged in collecting and processing of bio-degradable waste", category: "Deductions", chapter: "VIII", part: "C" },
  { new: "146", old: "80JJAA", topic: "Deduction in respect of additional employee cost", category: "Deductions", chapter: "VIII", part: "C" },
  { new: "147", old: "80LA", topic: "Deductions for income of Offshore Banking Units and Units of International Financial Services Centre", category: "Deductions", chapter: "VIII", part: "C" },
  { new: "148", old: "80M", topic: "Deduction in respect of certain inter-corporate dividends", category: "Deductions", chapter: "VIII", part: "C" },
  { new: "149", old: "80P", topic: "Deduction in respect of income of co-operative societies", category: "Deductions", chapter: "VIII", part: "C" },
  { new: "150", old: "80P", topic: "Interpretation for purposes of section 149", category: "Deductions", chapter: "VIII", part: "C" },
  { new: "151", old: "80QQB", topic: "Deduction in respect of royalty income, etc., of authors of certain books other than text-books", category: "Deductions", chapter: "VIII", part: "C" },
  { new: "152", old: "80RRB", topic: "Deduction in respect of royalty on patents", category: "Deductions", chapter: "VIII", part: "C" },
  { new: "153", old: "80TTA, 80TTB", topic: "Deduction for interest on deposits", category: "Deductions", chapter: "VIII", part: "D" },
  { new: "154", old: "80U", topic: "Deduction in case of a person with disability", category: "Deductions", chapter: "VIII", part: "E" },

  // ── Chapter IX: Rebates and reliefs ───────────────────────────────────────
  { new: "155", old: "87", topic: "Rebate to be allowed in computing income-tax", category: "Rebates & Reliefs", chapter: "IX", part: "A" },
  { new: "156", old: "87A", topic: "Rebate of income-tax in case of certain individuals", category: "Rebates & Reliefs", chapter: "IX", part: "A" },
  { new: "157", old: "89", topic: "Relief when salary, etc., is paid in arrears or in advance", category: "Rebates & Reliefs", chapter: "IX", part: "A" },
  { new: "158", old: "89A", topic: "Relief from taxation in income from retirement benefit account maintained in a notified country", category: "Rebates & Reliefs", chapter: "IX", part: "A" },
  { new: "159", old: "90, 90A", topic: "Agreement with foreign countries or specified territories and adoption by Central Government of agreement between specified associations for double taxation relief", category: "Rebates & Reliefs", chapter: "IX", part: "B" },
  { new: "160", old: "91", topic: "Countries with which no agreement exists", category: "Rebates & Reliefs", chapter: "IX", part: "B" },

  // ── Chapter X: Special provisions relating to avoidance of tax ────────────
  { new: "161", old: "92", topic: "Computation of income from international transaction and specified domestic transaction having regard to arm’s length price", category: "Transfer Pricing", chapter: "X" },
  { new: "162", old: "92A", topic: "Meaning of associated enterprise", category: "Transfer Pricing", chapter: "X" },
  { new: "163", old: "92B", topic: "Meaning of international transaction", category: "Transfer Pricing", chapter: "X" },
  { new: "164", old: "92BA", topic: "Meaning of specified domestic transaction", category: "Transfer Pricing", chapter: "X" },
  { new: "165", old: "92C", topic: "Determination of arm’s length price", category: "Transfer Pricing", chapter: "X" },
  { new: "166", old: "92CA", topic: "Reference to Transfer Pricing Officer", category: "Transfer Pricing", chapter: "X" },
  { new: "167", old: "92CB", topic: "Power of Board to make safe harbour rules", category: "Transfer Pricing", chapter: "X" },
  { new: "168", old: "92CC", topic: "Advance pricing agreement", category: "Transfer Pricing", chapter: "X" },
  { new: "169", old: "92CD", topic: "Effect to advance pricing agreement", category: "Transfer Pricing", chapter: "X" },
  { new: "170", old: "92CE", topic: "Secondary adjustment in certain cases", category: "Transfer Pricing", chapter: "X" },
  { new: "171", old: "92D", topic: "Maintenance, keeping and furnishing of information and document by certain persons", category: "Transfer Pricing", chapter: "X" },
  { new: "172", old: "92E", topic: "Report from an accountant to be furnished by persons entering into international transaction or specified domestic transaction", category: "Transfer Pricing", chapter: "X" },
  { new: "173", old: "92F", topic: "Definitions of certain terms relevant to determination of arm’s length price, etc", category: "Transfer Pricing", chapter: "X" },
  { new: "174", old: "93", topic: "Avoidance of income-tax by transactions resulting in transfer of income to non-residents", category: "Anti-Avoidance", chapter: "X" },
  { new: "175", old: "94", topic: "Avoidance of tax by certain transactions in securities", category: "Anti-Avoidance", chapter: "X" },
  { new: "176", old: "94A", topic: "Special measures in respect of transactions with persons located in notified jurisdictional area", category: "Anti-Avoidance", chapter: "X" },
  { new: "177", old: "94B", topic: "Limitation on interest deduction in certain cases", category: "Anti-Avoidance", chapter: "X" },

  // ── Chapter XI: General anti-avoidance rule ───────────────────────────────
  { new: "178", old: "95", topic: "Applicability of General Anti-Avoidance Rule", category: "Anti-Avoidance", chapter: "XI" },
  { new: "179", old: "96", topic: "Impermissible avoidance arrangement", category: "Anti-Avoidance", chapter: "XI" },
  { new: "180", old: "97", topic: "Arrangement to lack commercial substance", category: "Anti-Avoidance", chapter: "XI" },
  { new: "181", old: "98", topic: "Consequences of impermissible avoidance arrangement", category: "Anti-Avoidance", chapter: "XI" },
  { new: "182", old: "99", topic: "Treatment of connected person and accommodating party", category: "Anti-Avoidance", chapter: "XI" },
  { new: "183", old: "100, 101", topic: "Application of this Chapter", category: "Anti-Avoidance", chapter: "XI" },
  { new: "184", old: "102", topic: "Interpretation", category: "Anti-Avoidance", chapter: "XI" },

  // ── Chapter XII: Mode of payment in certain cases, etc. ───────────────────
  { new: "185", old: "269SS", topic: "Mode of taking or accepting certain loans, deposits and specified sum", category: "Mode of Payment", chapter: "XII" },
  { new: "186", old: "269ST", topic: "Mode of undertaking transactions", category: "Mode of Payment", chapter: "XII" },
  { new: "187", old: "269SU", topic: "Acceptance of payment through prescribed electronic modes", category: "Mode of Payment", chapter: "XII" },
  { new: "188", old: "269T", topic: "Mode of repayment of certain loans or deposits or specified advances", category: "Mode of Payment", chapter: "XII" },
  { new: "189", old: "269SS, 269ST, 269T", topic: "Interpretation", category: "Mode of Payment", chapter: "XII" },

  // ── Chapter XIII: Determination of tax in special cases ───────────────────
  { new: "190", old: "110", topic: "Determination of tax where total income includes income on which no tax is payable", category: "Special Tax Rates", chapter: "XIII", part: "A" },
  { new: "191", old: "111", topic: "Tax on accumulated balance of recognised provident fund", category: "Special Tax Rates", chapter: "XIII", part: "A" },
  { new: "192", old: "113", topic: "Tax in case of block assessment of search cases", category: "Special Tax Rates", chapter: "XIII", part: "A" },
  { new: "193", old: "115ACA", topic: "Tax on income from Global Depository Receipts purchased in foreign currency or capital gains arising from their transfer", category: "Special Tax Rates", chapter: "XIII", part: "A" },
  { new: "194", old: "115B, 115BB, 115BBF, 115BBG, 115BBH, 115BBJ", topic: "Tax on certain incomes", category: "Special Tax Rates", chapter: "XIII", part: "A" },
  { new: "195", old: "115BBE", topic: "Tax on income referred to in sections 102 to 106", category: "Special Tax Rates", chapter: "XIII", part: "A" },
  { new: "196", old: "111A", topic: "Tax on short-term capital gains in certain cases", category: "Special Tax Rates", chapter: "XIII", part: "B" },
  { new: "197", old: "112", topic: "Tax on long-term capital gains", category: "Special Tax Rates", chapter: "XIII", part: "B" },
  { new: "198", old: "112A", topic: "Tax on long-term capital gains in certain cases", category: "Special Tax Rates", chapter: "XIII", part: "B" },
  { new: "199", old: "115BA", topic: "Tax on income of certain manufacturing domestic companies", category: "Special Tax Rates", chapter: "XIII", part: "C" },
  { new: "200", old: "115BAA", topic: "Tax on income of certain domestic companies", category: "Special Tax Rates", chapter: "XIII", part: "C" },
  { new: "201", old: "115BAB", topic: "Tax on income of new manufacturing domestic companies", category: "Special Tax Rates", chapter: "XIII", part: "C" },
  { new: "202", old: "115BAC", topic: "New tax regime for individuals, Hindu undivided family and others", category: "Special Tax Rates", chapter: "XIII", part: "C" },
  { new: "203", old: "115BAD", topic: "Tax on income of certain resident co-operative societies", category: "Special Tax Rates", chapter: "XIII", part: "C" },
  { new: "204", old: "115BAE", topic: "Tax on income of certain new manufacturing co-operative societies", category: "Special Tax Rates", chapter: "XIII", part: "C" },
  { new: "205", old: "115BA, 115BAA, 115BAB, 115BAD, 115BAE", topic: "Conditions for tax on income of certain companies and co-operative societies", category: "Special Tax Rates", chapter: "XIII", part: "C" },
  { new: "206", old: "115JAA, 115JB, 115JC, 115JD, 115JE, 115JEE, 115JF", topic: "Special provision for minimum alternate tax and alternate minimum tax", category: "Special Tax Rates", chapter: "XIII", part: "D" },
  { new: "207", old: "115A", topic: "Tax on dividends, royalty and fees for technical service in case of foreign companies", category: "NRI Provisions", chapter: "XIII", part: "E" },
  { new: "208", old: "115AB", topic: "Tax on income from units purchased in foreign currency or capital gains arising from their transfer", category: "NRI Provisions", chapter: "XIII", part: "E" },
  { new: "209", old: "115AC", topic: "Tax on income from bonds or Global Depository Receipts purchased in foreign currency or capital gains arising from their transfer", category: "NRI Provisions", chapter: "XIII", part: "E" },
  { new: "210", old: "115AD", topic: "Tax on income of Foreign Institutional Investors from securities or capital gains arising from their transfer", category: "NRI Provisions", chapter: "XIII", part: "E" },
  { new: "211", old: "115BBA", topic: "Tax on non-resident sportsmen or sports associations", category: "NRI Provisions", chapter: "XIII", part: "E" },
  { new: "212", old: "115C", topic: "Interpretation", category: "NRI Provisions", chapter: "XIII", part: "E" },
  { new: "213", old: "115D", topic: "Special provision for computation of total income of non-residents", category: "NRI Provisions", chapter: "XIII", part: "E" },
  { new: "214", old: "115E", topic: "Tax on investment income and long-term capital gains", category: "NRI Provisions", chapter: "XIII", part: "E" },
  { new: "215", old: "115F", topic: "Capital gains on transfer of foreign exchange assets not to be charged in certain cases", category: "NRI Provisions", chapter: "XIII", part: "E" },
  { new: "216", old: "115G", topic: "Return of income not to be furnished in certain cases", category: "NRI Provisions", chapter: "XIII", part: "E" },
  { new: "217", old: "115H", topic: "Benefit under Chapter to be available in certain cases even after assessee becomes resident", category: "NRI Provisions", chapter: "XIII", part: "E" },
  { new: "218", old: "115-I", topic: "Chapter not to apply if the assessee so chooses", category: "NRI Provisions", chapter: "XIII", part: "E" },
  { new: "219", old: "115JG", topic: "Conversion of an Indian branch of foreign company into subsidiary Indian company", category: "NRI Provisions", chapter: "XIII", part: "E" },
  { new: "220", old: "115JH", topic: "Foreign company said to be resident in India", category: "NRI Provisions", chapter: "XIII", part: "E" },
  { new: "221", old: "115TCA", topic: "Tax on income from securitisation trusts", category: "Pass-through Entities", chapter: "XIII", part: "F" },
  { new: "222", old: "115U", topic: "Tax on income in case of venture capital undertakings", category: "Pass-through Entities", chapter: "XIII", part: "F" },
  { new: "223", old: "115UA", topic: "Tax on income of unit holder and business trust", category: "Pass-through Entities", chapter: "XIII", part: "F" },
  { new: "224", old: "115UB", topic: "Tax on income of investment fund and its unit holders", category: "Pass-through Entities", chapter: "XIII", part: "F" },
  { new: "225", old: "115VA", topic: "Income from business of operating qualifying ships", category: "Tonnage Tax", chapter: "XIII", part: "G" },
  { new: "226", old: "115VB, 115VE, 115VF", topic: "Tonnage tax scheme", category: "Tonnage Tax", chapter: "XIII", part: "G" },
  { new: "227", old: "115VG, 115VH, 115VX", topic: "Computation of tonnage income", category: "Tonnage Tax", chapter: "XIII", part: "G" },
  { new: "228", old: "115V-I, 115VJ, 115V-O", topic: "Relevant shipping income and exclusion from book profit", category: "Tonnage Tax", chapter: "XIII", part: "G" },
  { new: "229", old: "115VK, 115VN", topic: "Depreciation and gains relating to tonnage tax assets", category: "Tonnage Tax", chapter: "XIII", part: "G" },
  { new: "230", old: "115VL, 115VM", topic: "Exclusion of deduction, loss, set off, etc", category: "Tonnage Tax", chapter: "XIII", part: "G" },
  { new: "231", old: "115VP, 115VQ, 115VR, 115VS", topic: "Method of opting of tonnage tax scheme and validity", category: "Tonnage Tax", chapter: "XIII", part: "G" },
  { new: "232", old: "115VT, 115VU, 115VV, 115VW, 115VZA", topic: "Certain conditions for applicability of tonnage tax scheme", category: "Tonnage Tax", chapter: "XIII", part: "G" },
  { new: "233", old: "115VY, 115VZ", topic: "Amalgamation and demerger", category: "Tonnage Tax", chapter: "XIII", part: "G" },
  { new: "234", old: "115VZB, 115VZC", topic: "Avoidance of tax and exclusion from tonnage tax scheme", category: "Tonnage Tax", chapter: "XIII", part: "G" },
  { new: "235", old: "115V, 115VC, 115VD", topic: "Interpretation", category: "Tonnage Tax", chapter: "XIII", part: "G" },

  // ── Chapter XIV: Tax administration ───────────────────────────────────────
  { new: "236", old: "116", topic: "Income-tax authorities", category: "Tax Authorities", chapter: "XIV", part: "A" },
  { new: "237", old: "117", topic: "Appointment of income-tax authorities", category: "Tax Authorities", chapter: "XIV", part: "A" },
  { new: "238", old: "118", topic: "Control of income-tax authorities", category: "Tax Authorities", chapter: "XIV", part: "A" },
  { new: "239", old: "119", topic: "Instructions to subordinate authorities", category: "Tax Authorities", chapter: "XIV", part: "A" },
  { new: "240", old: "119A", topic: "Taxpayer’s Charter", category: "Tax Authorities", chapter: "XIV", part: "A" },
  { new: "241", old: "120", topic: "Jurisdiction of income-tax authorities", category: "Tax Authorities", chapter: "XIV", part: "A" },
  { new: "242", old: "124", topic: "Jurisdiction of Assessing Officers", category: "Tax Authorities", chapter: "XIV", part: "A" },
  { new: "243", old: "127", topic: "Power to transfer cases", category: "Tax Authorities", chapter: "XIV", part: "A" },
  { new: "244", old: "129", topic: "Change of incumbent of an office", category: "Tax Authorities", chapter: "XIV", part: "A" },
  { new: "245", old: "130", topic: "Faceless jurisdiction of income-tax authorities", category: "Tax Authorities", chapter: "XIV", part: "A" },
  { new: "246", old: "131", topic: "Power regarding discovery, production of evidence, etc", category: "Powers, Survey & Search", chapter: "XIV", part: "B" },
  { new: "247", old: "132", topic: "Search and seizure", category: "Powers, Survey & Search", chapter: "XIV", part: "B" },
  { new: "248", old: "132A", topic: "Powers to requisition", category: "Powers, Survey & Search", chapter: "XIV", part: "B" },
  { new: "249", old: "132, 132A", topic: "Reasons not to be disclosed", category: "Powers, Survey & Search", chapter: "XIV", part: "B" },
  { new: "250", old: "132B", topic: "Application of seized or requisitioned assets", category: "Powers, Survey & Search", chapter: "XIV", part: "B" },
  { new: "251", old: "132 & 132A", topic: "Copying, extraction, retention and release of books of account and documents seized or requisitioned", category: "Powers, Survey & Search", chapter: "XIV", part: "B" },
  { new: "252", old: "133", topic: "Power to call for information", category: "Powers, Survey & Search", chapter: "XIV", part: "B" },
  { new: "253", old: "133A", topic: "Powers of survey", category: "Powers, Survey & Search", chapter: "XIV", part: "B" },
  { new: "254", old: "133B", topic: "Power to collect certain information", category: "Powers, Survey & Search", chapter: "XIV", part: "B" },
  { new: "255", old: "134", topic: "Power to inspect registers of companies", category: "Powers, Survey & Search", chapter: "XIV", part: "B" },
  { new: "256", old: "135", topic: "Power of certain income-tax authorities", category: "Powers, Survey & Search", chapter: "XIV", part: "B" },
  { new: "257", old: "136", topic: "Proceedings before income-tax authorities to be judicial proceedings", category: "Powers, Survey & Search", chapter: "XIV", part: "B" },
  { new: "258", old: "138", topic: "Disclosure of information relating to assessees", category: "Powers, Survey & Search", chapter: "XIV", part: "B" },
  { new: "259", old: "133C", topic: "Power to call for information by prescribed income-tax authority", category: "Powers, Survey & Search", chapter: "XIV", part: "B" },
  { new: "260", old: "135A", topic: "Faceless collection of information", category: "Powers, Survey & Search", chapter: "XIV", part: "B" },
  { new: "261", old: "131 to 135", topic: "Interpretation", category: "Powers, Survey & Search", chapter: "XIV", part: "B" },

  // ── Chapter XV: Return of income ──────────────────────────────────────────
  { new: "262", old: "139A, 139AA", topic: "Permanent Account Number", category: "Return Filing", chapter: "XV", part: "A" },
  { new: "263", old: "139, 139D, 194P", topic: "Return of income", category: "Return Filing", chapter: "XV", part: "B" },
  { new: "264", old: "139B", topic: "Scheme for submission of returns through tax return preparers", category: "Return Filing", chapter: "XV", part: "B" },
  { new: "265", old: "140", topic: "Return by whom to be verified", category: "Return Filing", chapter: "XV", part: "B" },
  { new: "266", old: "140A", topic: "Self-assessment", category: "Return Filing", chapter: "XV", part: "B" },
  { new: "267", old: "140B", topic: "Tax on updated return", category: "Return Filing", chapter: "XV", part: "B" },

  // ── Chapter XVI: Procedure for assessment ─────────────────────────────────
  { new: "268", old: "142", topic: "Inquiry before assessment", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "269", old: "142A", topic: "Estimation of value of assets by Valuation Officer", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "270", old: "143", topic: "Assessment", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "271", old: "144", topic: "Best judgment assessment", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "272", old: "144A", topic: "Power of Joint Commissioner to issue directions in certain cases", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "273", old: "144B", topic: "Faceless Assessment", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "274", old: "144BA", topic: "Reference to Principal Commissioner or Commissioner in certain cases", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "275", old: "144C", topic: "Reference to Dispute Resolution Panel", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "276", old: "145", topic: "Method of accounting", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "277", old: "145A", topic: "Method of accounting in certain cases", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "278", old: "145B", topic: "Taxability of certain income", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "279", old: "147", topic: "Income escaping assessment", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "280", old: "148", topic: "Issue of notice where income has escaped assessment", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "281", old: "148A", topic: "Procedure before issuance of notice under section 280", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "282", old: "149", topic: "Time limit for notices under sections 280 and 281", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "283", old: "150", topic: "Provision for cases where assessment is in pursuance of an order on appeal, etc", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "284", old: "151", topic: "Sanction for issue of notice", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "285", old: "152", topic: "Other provisions", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "286", old: "153", topic: "Time limit for completion of assessment, reassessment and recomputation", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "287", old: "154", topic: "Rectification of mistake", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "288", old: "155", topic: "Other amendments", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "289", old: "156", topic: "Notice of demand", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "290", old: "156A", topic: "Modification and revision of notice in certain cases", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "291", old: "157", topic: "Intimation of loss", category: "Assessment", chapter: "XVI", part: "A" },
  { new: "292", old: "158BA", topic: "Assessment of total undisclosed income as a result of search", category: "Assessment", chapter: "XVI", part: "B" },
  { new: "293", old: "158BB", topic: "Computation of total undisclosed income of block period", category: "Assessment", chapter: "XVI", part: "B" },
  { new: "294", old: "158BC", topic: "Procedure for block assessment", category: "Assessment", chapter: "XVI", part: "B" },
  { new: "295", old: "158BD", topic: "Undisclosed income of any other person", category: "Assessment", chapter: "XVI", part: "B" },
  { new: "296", old: "158BE", topic: "Time-limit for completion of block assessment", category: "Assessment", chapter: "XVI", part: "B" },
  { new: "297", old: "158BF", topic: "Certain interests and penalties not to be levied or imposed", category: "Assessment", chapter: "XVI", part: "B" },
  { new: "298", old: "158BFA", topic: "Levy of interest and penalty in certain cases", category: "Assessment", chapter: "XVI", part: "B" },
  { new: "299", old: "158BG", topic: "Authority competent to make assessment of block period", category: "Assessment", chapter: "XVI", part: "B" },
  { new: "300", old: "158BH", topic: "Application of other provisions of Act", category: "Assessment", chapter: "XVI", part: "B" },
  { new: "301", old: "158B", topic: "Interpretation", category: "Assessment", chapter: "XVI", part: "B" },

  // ── Chapter XVII: Special provisions relating to certain persons ──────────
  { new: "302", old: "159", topic: "Legal representative", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "303", old: "160", topic: "Representative assessee", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "304", old: "161, 165, 166, 167", topic: "Liability of representative assessee", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "305", old: "162", topic: "Right of representative assessee to recover tax paid", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "306", old: "163", topic: "Who may be regarded as agent", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "307", old: "164", topic: "Charge of tax where share of beneficiaries unknown", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "308", old: "164A", topic: "Charge of tax in case of oral trust", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "309", old: "67A", topic: "Method of computing a member's share in income of association of persons or body of individuals", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "310", old: "86", topic: "Share of member of association of persons or body of individuals in income of association or body", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "311", old: "167B", topic: "Charge of tax where shares of members in association of persons or body of individuals unknown, etc", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "312", old: "168, 169", topic: "Executor", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "313", old: "170", topic: "Succession to business or profession otherwise than on death", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "314", old: "170A", topic: "Effect of order of tribunal or court in respect of business reorganisation", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "315", old: "171", topic: "Assessment after partition of Hindu undivided family", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "316", old: "172", topic: "Shipping business of non-residents", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "317", old: "174", topic: "Assessment of persons leaving India", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "318", old: "174A", topic: "Assessment of association of persons or body of individuals or artificial juridical person formed for a particular event or purpose", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "319", old: "175", topic: "Assessment of persons likely to transfer property to avoid tax", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "320", old: "176", topic: "Discontinued business", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "321", old: "177", topic: "Association dissolved or business discontinued", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "322", old: "178", topic: "Company in liquidation", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "323", old: "179", topic: "Liability of directors of private company", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "324", old: "167A", topic: "Charge of tax in case of a firm", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "325", old: "184", topic: "Assessment as a firm", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "326", old: "185", topic: "Assessment when section 325 not complied with", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "327", old: "187", topic: "Change in constitution of a firm", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "328", old: "188", topic: "Succession of one firm by another firm", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "329", old: "188A", topic: "Joint and several liability of partners for tax payable by firm", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "330", old: "189", topic: "Firm dissolved or business discontinued", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "331", old: "167C", topic: "Liability of partners of limited liability partnership in liquidation", category: "Firms, AOPs & HUFs", chapter: "XVII", part: "A" },
  { new: "332", old: "11, 12A, 12AB, 80G", topic: "Application for registration", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "333", old: "11, 12A, 12AB, 80G", topic: "Switching over of regimes", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "334", old: "11, 12, 13, 115BBC, 115BBI", topic: "Tax on income of registered non-profit organisation", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "335", old: "11, 12, 13, 115BBC, 115BBI", topic: "Regular income", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "336", old: "11, 12, 13, 115BBC, 115BBI", topic: "Taxable regular income", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "337", old: "11, 12, 13, 115BBC, 115BBI", topic: "Specified income", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "338", old: "11, 12, 13, 115BBC, 115BBI", topic: "Income not to be included in regular income", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "339", old: "11, 12, 13, 115BBC, 115BBI", topic: "Corpus donation", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "340", old: "11, 12, 13, 115BBC, 115BBI", topic: "Deemed corpus donation", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "341", old: "11, 12, 13, 115BBC, 115BBI", topic: "Application of income", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "342", old: "11, 12, 13, 115BBC, 115BBI", topic: "Accumulated income", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "343", old: "11, 12, 13, 115BBC, 115BBI", topic: "Deemed accumulated income", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "344", old: "2(15) and 11", topic: "Business undertaking held as property", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "345", old: "2(15) and 11", topic: "Restriction on commercial activities by a registered non-profit organisation", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "346", old: "2(15) and 11", topic: "Restriction on commercial activities by registered non-profit organisation, carrying out advancement of any other object of general public utility", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "347", old: "11, 12A and 139", topic: "Books of account", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "348", old: "11, 12A and 139", topic: "Audit", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "349", old: "11, 12A and 139", topic: "Return of income", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "350", old: "11, 12A and 139", topic: "Permitted modes of investment", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "351", old: "12AB, 12AC, 13, 115BBI, 115TD to 115TF", topic: "Specified violation", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "352", old: "12AB, 12AC, 13, 115BBI, 115TD to 115TF", topic: "Tax on accreted income", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "353", old: "12AB, 12AC, 13, 115BBI, 115TD to 115TF", topic: "Other violations", category: "Non-Profit Organisations", chapter: "XVII", part: "B", groupRef: true },
  { new: "354", old: "80G", topic: "Application for approval for purpose of section 133(1)(b)(ii)", category: "Non-Profit Organisations", chapter: "XVII", part: "B" },
  { new: "355", old: "2(15), 11, 12, 13, 115BBC, 115TD to 115TF", topic: "Interpretation", category: "Non-Profit Organisations", chapter: "XVII", part: "B" },

  // ── Chapter XVIII: Appeals, revisions and alternate dispute resolutions ───
  { new: "356", old: "246", topic: "Appealable orders before Joint Commissioner (Appeals)", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "357", old: "246A", topic: "Appealable orders before Commissioner (Appeals)", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "358", old: "249", topic: "Form of appeal and limitation", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "359", old: "250", topic: "Procedure in appeal", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "360", old: "251", topic: "Powers of Joint Commissioner (Appeals) or Commissioner (Appeals)", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "361", old: "252, 252A", topic: "Appellate Tribunal", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "362", old: "253", topic: "Appeals to Appellate Tribunal", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "363", old: "254", topic: "Orders of Appellate Tribunal", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "364", old: "255", topic: "Procedure of Appellate Tribunal", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "365", old: "260A", topic: "Appeal to High Court", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "366", old: "260B", topic: "Case before High Court to be heard by not less than two Judges", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "367", old: "261", topic: "Appeal to Supreme Court", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "368", old: "262", topic: "Hearing before Supreme Court", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "369", old: "265", topic: "Tax to be paid irrespective of appeal, etc", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "370", old: "266", topic: "Execution for costs awarded by Supreme Court", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "371", old: "267", topic: "Amendment of assessment on appeal", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "372", old: "268", topic: "Exclusion of time taken for copy", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "373", old: "268A", topic: "Filing of appeal by income-tax authority", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "374", old: "269", topic: "Interpretation of “High Court”", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "A" },
  { new: "375", old: "158A", topic: "Procedure when assessee claims identical question of law is pending before High Court or Supreme Court", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "B" },
  { new: "376", old: "158AB", topic: "Procedure where an identical question of law is pending before High Courts or Supreme Court", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "B" },
  { new: "377", old: "263", topic: "Revision of orders prejudicial to revenue", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "C" },
  { new: "378", old: "264", topic: "Revision of other orders", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "C" },
  { new: "379", old: "245MA", topic: "Dispute Resolution Committee", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "D" },
  { new: "380", old: "245N", topic: "Interpretation", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "D" },
  { new: "381", old: "245-OB", topic: "Board for Advance Rulings", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "D" },
  { new: "382", old: "245P", topic: "Vacancies, etc., not to invalidate proceedings", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "D" },
  { new: "383", old: "245Q", topic: "Application for advance ruling", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "D" },
  { new: "384", old: "245R", topic: "Procedure on receipt of application", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "D" },
  { new: "385", old: "245RR", topic: "Appellate authority not to proceed in certain cases", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "D" },
  { new: "386", old: "245T", topic: "Advance ruling to be void in certain circumstances", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "D" },
  { new: "387", old: "245U", topic: "Powers of the Board for Advance Rulings", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "D" },
  { new: "388", old: "245V", topic: "Procedure of Board for Advance Rulings", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "D" },
  { new: "389", old: "245W", topic: "Appeal", category: "Appeals, Revision & ADR", chapter: "XVIII", part: "D" },

  // ── Chapter XIX: Collection and recovery of tax ───────────────────────────
  { new: "390", old: "190, 199, 206C", topic: "Deduction or collection at source and advance payment", category: "Collection & Recovery", chapter: "XIX", part: "A" },
  { new: "391", old: "191", topic: "Direct payment", category: "Collection & Recovery", chapter: "XIX", part: "A" },
  { new: "392", old: "192, 192A", topic: "Salary and accumulated balance due to an employee", category: "TDS & TCS", chapter: "XIX", part: "B" },
  { new: "393", old: "193, 194, 194A, 194B, 194BA, 194BB, 194C, 194D, 194DA, 194E, 194EE, 194G, 194H, 194-I, 194-IA, 194-IB, 194-IC, 194J, 194K, 194LA, 194LB, 194LBA, 194LBB, 194LBC, 194LC, 194M, 194N, 194-O, 194P, 194Q, 194R, 194S, 194T, 195, 195A, 196, 196A, 196B, 196C, 196D, 197A", topic: "Tax to be deducted at source", category: "TDS & TCS", chapter: "XIX", part: "B" },
  { new: "394", old: "206C", topic: "Collection of tax at source", category: "TDS & TCS", chapter: "XIX", part: "B" },
  { new: "395", old: "197, 195, 203, 206C", topic: "Certificates", category: "TDS & TCS", chapter: "XIX", part: "B" },
  { new: "396", old: "198", topic: "Tax deducted is income received", category: "TDS & TCS", chapter: "XIX", part: "B" },
  { new: "397", old: "203A, 206AA, 206CC, 200, 206A, 206C, 194-IA, 194-IB, 194M, 194S, 195", topic: "Compliance and reporting", category: "TDS & TCS", chapter: "XIX", part: "B" },
  { new: "398", old: "201, 206C", topic: "Consequences of failure to deduct or pay or, collect or pay", category: "TDS & TCS", chapter: "XIX", part: "B" },
  { new: "399", old: "200A, 206CB", topic: "Processing", category: "TDS & TCS", chapter: "XIX", part: "B" },
  { new: "400", old: "194A, 194BA, 194N, 194-O, 194Q, 194R, 194S, 195, 197, 197A, 206C", topic: "Power of Central Government to relax provisions of this Chapter", category: "TDS & TCS", chapter: "XIX", part: "B" },
  { new: "401", old: "205", topic: "Bar against direct demand on assessee", category: "TDS & TCS", chapter: "XIX", part: "B" },
  { new: "402", old: "192 to 206CB", topic: "Interpretation", category: "TDS & TCS", chapter: "XIX", part: "B" },
  { new: "403", old: "207", topic: "Liability for payment of advance tax", category: "Advance Tax", chapter: "XIX", part: "C" },
  { new: "404", old: "208", topic: "Conditions of liability to pay advance tax", category: "Advance Tax", chapter: "XIX", part: "C" },
  { new: "405", old: "209", topic: "Computation of advance tax", category: "Advance Tax", chapter: "XIX", part: "C" },
  { new: "406", old: "210", topic: "Payment of advance tax by assessee on his own accord", category: "Advance Tax", chapter: "XIX", part: "C" },
  { new: "407", old: "209, 210, 211", topic: "Payment of advance tax by assessee in pursuance of order of Assessing Officer", category: "Advance Tax", chapter: "XIX", part: "C" },
  { new: "408", old: "211", topic: "Instalments of advance tax and due dates", category: "Advance Tax", chapter: "XIX", part: "C" },
  { new: "409", old: "218", topic: "When assessee is deemed to be in default", category: "Advance Tax", chapter: "XIX", part: "C" },
  { new: "410", old: "219", topic: "Credit for advance tax", category: "Advance Tax", chapter: "XIX", part: "C" },
  { new: "411", old: "220", topic: "When tax payable and when assessee deemed in default", category: "Collection & Recovery", chapter: "XIX", part: "D" },
  { new: "412", old: "221", topic: "Penalty payable when tax in default", category: "Collection & Recovery", chapter: "XIX", part: "D" },
  { new: "413", old: "222, 224", topic: "Certificate by Tax Recovery Officer and validity thereof", category: "Collection & Recovery", chapter: "XIX", part: "D" },
  { new: "414", old: "223", topic: "Tax Recovery Officer by whom recovery is to be effected", category: "Collection & Recovery", chapter: "XIX", part: "D" },
  { new: "415", old: "225", topic: "Stay of proceedings in pursuance of certificate and amendment or cancellation thereof", category: "Collection & Recovery", chapter: "XIX", part: "D" },
  { new: "416", old: "226", topic: "Other modes of recovery", category: "Collection & Recovery", chapter: "XIX", part: "D" },
  { new: "417", old: "227", topic: "Recovery through State Government", category: "Collection & Recovery", chapter: "XIX", part: "D" },
  { new: "418", old: "228A", topic: "Recovery of tax in pursuance of agreements with foreign countries", category: "Collection & Recovery", chapter: "XIX", part: "D" },
  { new: "419", old: "229", topic: "Recovery of penalties, fine, interest and other sums", category: "Collection & Recovery", chapter: "XIX", part: "D" },
  { new: "420", old: "230", topic: "Tax clearance certificate", category: "Collection & Recovery", chapter: "XIX", part: "D" },
  { new: "421", old: "232", topic: "Recovery by suit or under other law not affected", category: "Collection & Recovery", chapter: "XIX", part: "D" },
  { new: "422", old: "173", topic: "Recovery of tax arrear in respect of non-resident from his assets", category: "Collection & Recovery", chapter: "XIX", part: "D" },
  { new: "423", old: "234A", topic: "Interest for defaults in furnishing return of income", category: "Interest & Fees", chapter: "XIX", part: "E" },
  { new: "424", old: "234B", topic: "Interest for defaults in payment of advance tax", category: "Interest & Fees", chapter: "XIX", part: "E" },
  { new: "425", old: "234C", topic: "Interest for deferment of advance tax", category: "Interest & Fees", chapter: "XIX", part: "E" },
  { new: "426", old: "234D", topic: "Interest on excess refund", category: "Interest & Fees", chapter: "XIX", part: "E" },
  { new: "427", old: "234E", topic: "Fee for default in furnishing statements", category: "Interest & Fees", chapter: "XIX", part: "F" },
  { new: "428", old: "234F", topic: "Fee for default in furnishing return of income", category: "Interest & Fees", chapter: "XIX", part: "F" },
  { new: "429", old: "234G", topic: "Fee for default relating to statement or certificate", category: "Interest & Fees", chapter: "XIX", part: "F" },
  { new: "430", old: "234H", topic: "Fee for default relating to intimation of Aadhaar number", category: "Interest & Fees", chapter: "XIX", part: "F" },

  // ── Chapter XX: Refunds ───────────────────────────────────────────────────
  { new: "431", old: "237", topic: "Refunds", category: "Refunds", chapter: "XX" },
  { new: "432", old: "238", topic: "Person entitled to claim refund in certain special cases", category: "Refunds", chapter: "XX" },
  { new: "433", old: "239", topic: "Form of claim for refund and limitation", category: "Refunds", chapter: "XX" },
  { new: "434", old: "239A", topic: "Refund for denying liability to deduct tax in certain cases", category: "Refunds", chapter: "XX" },
  { new: "435", old: "240", topic: "Refund on appeal, etc", category: "Refunds", chapter: "XX" },
  { new: "436", old: "242", topic: "Correctness of assessment not to be questioned", category: "Refunds", chapter: "XX" },
  { new: "437", old: "244A", topic: "Interest on refunds", category: "Refunds", chapter: "XX" },
  { new: "438", old: "245", topic: "Set off and withholding of refunds in certain cases", category: "Refunds", chapter: "XX" },

  // ── Chapter XXI: Penalties ────────────────────────────────────────────────
  { new: "439", old: "270A", topic: "Penalty for under-reporting and misreporting of income", category: "Penalties", chapter: "XXI" },
  { new: "440", old: "270AA", topic: "Immunity from imposition of penalty, etc", category: "Penalties", chapter: "XXI" },
  { new: "441", old: "271A", topic: "Failure to keep, maintain or retain books of account, documents, etc", category: "Penalties", chapter: "XXI" },
  { new: "442", old: "271AA", topic: "Penalty for failure to keep and maintain information and document, etc., in respect of certain transactions", category: "Penalties", chapter: "XXI" },
  { new: "443", old: "271AAC", topic: "Penalty in respect of certain income", category: "Penalties", chapter: "XXI" },
  { new: "444", old: "271AAD", topic: "Penalty for false entry, etc., in books of account", category: "Penalties", chapter: "XXI" },
  { new: "445", old: "271AAE", topic: "Benefits to related persons", category: "Penalties", chapter: "XXI" },
  { new: "446", old: "271B", topic: "Failure to get accounts audited", category: "Penalties", chapter: "XXI" },
  { new: "447", old: "271BA", topic: "Penalty for failure to furnish report under section 172", category: "Penalties", chapter: "XXI" },
  { new: "448", old: "271C", topic: "Penalty for failure to deduct tax at source", category: "Penalties", chapter: "XXI" },
  { new: "449", old: "271CA", topic: "Penalty for failure to collect tax at source", category: "Penalties", chapter: "XXI" },
  { new: "450", old: "271D", topic: "Penalty for failure to comply with provisions of section 185", category: "Penalties", chapter: "XXI" },
  { new: "451", old: "271DA", topic: "Penalty for failure to comply with provisions of section 186", category: "Penalties", chapter: "XXI" },
  { new: "452", old: "271DB", topic: "Penalty for failure to comply with provisions of section 187", category: "Penalties", chapter: "XXI" },
  { new: "453", old: "271E", topic: "Penalty for failure to comply with provisions of section 188", category: "Penalties", chapter: "XXI" },
  { new: "454", old: "271FA", topic: "Penalty for failure to furnish statement of financial transaction or reportable account", category: "Penalties", chapter: "XXI" },
  { new: "455", old: "271FAA", topic: "Penalty for furnishing inaccurate statement of financial transaction or reportable account", category: "Penalties", chapter: "XXI" },
  { new: "456", old: "271FAB", topic: "Penalty for failure to furnish statement or information or document by an eligible investment fund", category: "Penalties", chapter: "XXI" },
  { new: "457", old: "271G", topic: "Penalty for failure to furnish information or document under section 171", category: "Penalties", chapter: "XXI" },
  { new: "458", old: "271GA", topic: "Penalty for failure to furnish information or document under section 506", category: "Penalties", chapter: "XXI" },
  { new: "459", old: "271GB", topic: "Penalty for failure to furnish report or for furnishing inaccurate report under section 511", category: "Penalties", chapter: "XXI" },
  { new: "460", old: "271GC", topic: "Penalty for failure to submit statement under section 505", category: "Penalties", chapter: "XXI" },
  { new: "461", old: "271H", topic: "Penalty for failure to furnish statements, etc", category: "Penalties", chapter: "XXI" },
  { new: "462", old: "271-I", topic: "Penalty for failure to furnish information or furnishing inaccurate information under section 397(3)(d)", category: "Penalties", chapter: "XXI" },
  { new: "463", old: "271J", topic: "Penalty for furnishing incorrect information in reports or certificates", category: "Penalties", chapter: "XXI" },
  { new: "464", old: "271K", topic: "Penalty for failure to furnish statements, etc", category: "Penalties", chapter: "XXI" },
  { new: "465", old: "272A", topic: "Penalty for failure to answer questions, sign statements, furnish information, returns or statements, allow inspections, etc", category: "Penalties", chapter: "XXI" },
  { new: "466", old: "272AA", topic: "Penalty for failure to comply with the provisions of section 254", category: "Penalties", chapter: "XXI" },
  { new: "467", old: "272B", topic: "Penalty for failure to comply with the provisions of section 262", category: "Penalties", chapter: "XXI" },
  { new: "468", old: "272BB", topic: "Penalty for failure to comply with the provisions of section 397", category: "Penalties", chapter: "XXI" },
  { new: "469", old: "273A", topic: "Power to reduce or waive penalty, etc., in certain cases", category: "Penalties", chapter: "XXI" },
  { new: "470", old: "273B", topic: "Penalty not to be imposed in certain cases", category: "Penalties", chapter: "XXI" },
  { new: "471", old: "274", topic: "Procedure", category: "Penalties", chapter: "XXI" },
  { new: "472", old: "275", topic: "Bar of limitation for imposing penalties", category: "Penalties", chapter: "XXI" },

  // ── Chapter XXII: Offences and prosecution ────────────────────────────────
  { new: "473", old: "275A", topic: "Contravention of order made under section 247", category: "Prosecution", chapter: "XXII" },
  { new: "474", old: "275B", topic: "Failure to comply with section 247(1)(ii)", category: "Prosecution", chapter: "XXII" },
  { new: "475", old: "276", topic: "Removal, concealment, transfer or delivery of property to prevent tax recovery", category: "Prosecution", chapter: "XXII" },
  { new: "476", old: "276B", topic: "Failure to pay tax to credit of Central Government under Chapter XIX-B", category: "Prosecution", chapter: "XXII" },
  { new: "477", old: "276BB", topic: "Failure to pay tax collected at source", category: "Prosecution", chapter: "XXII" },
  { new: "478", old: "276C", topic: "Wilful attempt to evade tax, etc", category: "Prosecution", chapter: "XXII" },
  { new: "479", old: "276CC", topic: "Failure to furnish returns of income", category: "Prosecution", chapter: "XXII" },
  { new: "480", old: "276CCC", topic: "Failure to furnish return of income in search cases", category: "Prosecution", chapter: "XXII" },
  { new: "481", old: "276D", topic: "Failure to produce accounts and documents", category: "Prosecution", chapter: "XXII" },
  { new: "482", old: "277", topic: "False statement in verification, etc", category: "Prosecution", chapter: "XXII" },
  { new: "483", old: "277A", topic: "Falsification of books of account or document, etc", category: "Prosecution", chapter: "XXII" },
  { new: "484", old: "278", topic: "Abetment of false return, etc", category: "Prosecution", chapter: "XXII" },
  { new: "485", old: "278A", topic: "Punishment for second and subsequent offences", category: "Prosecution", chapter: "XXII" },
  { new: "486", old: "278AA", topic: "Punishment not to be imposed in certain cases", category: "Prosecution", chapter: "XXII" },
  { new: "487", old: "278B", topic: "Offences by companies", category: "Prosecution", chapter: "XXII" },
  { new: "488", old: "278C", topic: "Offences by Hindu undivided family", category: "Prosecution", chapter: "XXII" },
  { new: "489", old: "278D", topic: "Presumption as to assets, books of account, etc., in certain cases", category: "Prosecution", chapter: "XXII" },
  { new: "490", old: "278E", topic: "Presumption as to culpable mental state", category: "Prosecution", chapter: "XXII" },
  { new: "491", old: "279", topic: "Prosecution to be at instance of Principal Chief Commissioner or Chief Commissioner or Principal Commissioner or Commissioner", category: "Prosecution", chapter: "XXII" },
  { new: "492", old: "279A", topic: "Certain offences to be non-cognizable", category: "Prosecution", chapter: "XXII" },
  { new: "493", old: "279B", topic: "Proof of entries in records or documents", category: "Prosecution", chapter: "XXII" },
  { new: "494", old: "280", topic: "Disclosure of particulars by public servants", category: "Prosecution", chapter: "XXII" },
  { new: "495", old: "280A", topic: "Special Courts", category: "Prosecution", chapter: "XXII" },
  { new: "496", old: "280B", topic: "Offences triable by Special Court", category: "Prosecution", chapter: "XXII" },
  { new: "497", old: "280C", topic: "Trial of offences as summons case", category: "Prosecution", chapter: "XXII" },
  { new: "498", old: "280D", topic: "Application of Bharatiya Nagarik Suraksha Sanhita, 2023 to proceedings before Special Court", category: "Prosecution", chapter: "XXII" },

  // ── Chapter XXIII: Miscellaneous ──────────────────────────────────────────
  { new: "499", old: "281", topic: "Certain transfers to be void", category: "Miscellaneous", chapter: "XXIII" },
  { new: "500", old: "281B", topic: "Provisional attachment to protect revenue in certain cases", category: "Miscellaneous", chapter: "XXIII" },
  { new: "501", old: "282", topic: "Service of notice, generally", category: "Miscellaneous", chapter: "XXIII" },
  { new: "502", old: "282A", topic: "Authentication of notices and other documents", category: "Miscellaneous", chapter: "XXIII" },
  { new: "503", old: "283", topic: "Service of notice when family is disrupted or firm etc., is dissolved", category: "Miscellaneous", chapter: "XXIII" },
  { new: "504", old: "284", topic: "Service of notice in case of discontinued business", category: "Miscellaneous", chapter: "XXIII" },
  { new: "505", old: "285", topic: "Submission of statement by a non-resident having liaison office", category: "Miscellaneous", chapter: "XXIII" },
  { new: "506", old: "285A", topic: "Furnishing of information or documents by an Indian concern in certain cases", category: "Miscellaneous", chapter: "XXIII" },
  { new: "507", old: "285B", topic: "Submission of statements by producers of cinematograph films or persons engaged in specified activity", category: "Miscellaneous", chapter: "XXIII" },
  { new: "508", old: "285BA", topic: "Obligation to furnish statement of financial transaction or reportable account", category: "Miscellaneous", chapter: "XXIII" },
  { new: "509", old: "285BAA", topic: "Obligation to furnish information on transaction of crypto-asset", category: "Miscellaneous", chapter: "XXIII" },
  { new: "510", old: "285BB", topic: "Annual information statement", category: "Miscellaneous", chapter: "XXIII" },
  { new: "511", old: "286", topic: "Furnishing of report in respect of international group", category: "Miscellaneous", chapter: "XXIII" },
  { new: "512", old: "287", topic: "Publication of information respecting assessees in certain cases", category: "Miscellaneous", chapter: "XXIII" },
  { new: "513", old: "287A", topic: "Appearance by registered valuer in certain matters", category: "Miscellaneous", chapter: "XXIII" },
  { new: "514", old: "287A", topic: "Registration of valuers", category: "Miscellaneous", chapter: "XXIII" },
  { new: "515", old: "288", topic: "Appearance by authorised representative", category: "Miscellaneous", chapter: "XXIII" },
  { new: "516", old: "288A, 288B", topic: "Rounding off of amount of total income, or amount payable or refundable", category: "Miscellaneous", chapter: "XXIII" },
  { new: "517", old: "289", topic: "Receipt to be given", category: "Miscellaneous", chapter: "XXIII" },
  { new: "518", old: "290", topic: "Indemnity", category: "Miscellaneous", chapter: "XXIII" },
  { new: "519", old: "291", topic: "Power to tender immunity from prosecution", category: "Miscellaneous", chapter: "XXIII" },
  { new: "520", old: "292", topic: "Cognizance of offences", category: "Miscellaneous", chapter: "XXIII" },
  { new: "521", old: "292A", topic: "Probation of Offenders Act, 1958 and section 401 of Bharatiya Nagarik Suraksha Sanhita, 2023, not to apply", category: "Miscellaneous", chapter: "XXIII" },
  { new: "522", old: "292B", topic: "Return of income, etc., not to be invalid on certain grounds", category: "Miscellaneous", chapter: "XXIII" },
  { new: "523", old: "292BB", topic: "Notice deemed to be valid in certain circumstances", category: "Miscellaneous", chapter: "XXIII" },
  { new: "524", old: "292C", topic: "Presumption as to assets, books of account, etc", category: "Miscellaneous", chapter: "XXIII" },
  { new: "525", old: "292CC", topic: "Authorisation and assessment in case of search or requisition", category: "Miscellaneous", chapter: "XXIII" },
  { new: "526", old: "293", topic: "Bar of suits in civil courts", category: "Miscellaneous", chapter: "XXIII" },
  { new: "527", old: "293A", topic: "Power to make exemption, etc., in relation to participation in business of prospecting for, extraction, etc., of mineral oils", category: "Miscellaneous", chapter: "XXIII" },
  { new: "528", old: "293B", topic: "Power of Central Government or Board to condone delays in obtaining approval", category: "Miscellaneous", chapter: "XXIII" },
  { new: "529", old: "293C", topic: "Power to withdraw approval", category: "Miscellaneous", chapter: "XXIII" },
  { new: "530", old: "294", topic: "Act to have effect pending legislative provision for charge of tax", category: "Miscellaneous", chapter: "XXIII" },
  { new: "531", old: "294A", topic: "Power to rescind exemption in relation to certain Union territories already granted under section 294A of the Income-tax Act, 1961", category: "Miscellaneous", chapter: "XXIII" },
  { new: "532", old: "92CA, 142B, 144C, 151A, 157A, 231, 245MA, 245R, 245W, 250, 253, 255, 264A, 264B, 274, 279, 293D", topic: "Power to frame schemes", category: "Miscellaneous", chapter: "XXIII" },
  { new: "533", old: "295", topic: "Power to make rules", category: "Miscellaneous", chapter: "XXIII" },
  { new: "534", old: "139B, 296", topic: "Laying before Parliament", category: "Miscellaneous", chapter: "XXIII" },
  { new: "535", old: "298", topic: "Removal of difficulties", category: "Miscellaneous", chapter: "XXIII" },
  { new: "536", old: "297", topic: "Repeal and savings", category: "Miscellaneous", chapter: "XXIII" },
];

// ── Quick filters ──────────────────────────────────────────────────────────
// Each filter is defined by whole ranges of 2025 sections and/or by 1961
// sections, which are resolved to their 2025 counterparts through MAPPINGS —
// so a filter can never point at the wrong 2025 section.

export interface QuickFilter {
  label: string;
  description: string;
  sections: string[];
}

/** The 1961 references in an `old` string, normalised ("80-IAC" → "80IAC"). */
export function oldRefs(old: string): string[] {
  return old
    .split(/,|&|\band\b|\bto\b/)
    .map((t) => t.replace(/[\s-]/g, "").toUpperCase())
    .filter(Boolean);
}

interface FilterSpec {
  label: string;
  description: string;
  /** 2025 sections included whole, as inclusive ranges. */
  ranges?: [number, number][];
  /** 1961 sections whose 2025 counterparts are included. */
  old?: string[];
  /** 2025 sections that match only incidentally, e.g. as the end of a range of 1961 sections. */
  exclude?: string[];
}

function resolve({ label, description, ranges = [], old = [], exclude = [] }: FilterSpec): QuickFilter {
  const wanted = new Set(old.map((s) => s.replace(/[\s-]/g, "").toUpperCase()));
  const sections = MAPPINGS.filter((m) => {
    if (exclude.includes(m.new)) return false;
    const n = parseInt(m.new, 10);
    if (ranges.some(([a, b]) => n >= a && n <= b)) return true;
    return !m.groupRef && oldRefs(m.old).some((t) => wanted.has(t));
  }).map((m) => m.new);
  return { label, description, sections };
}

export const QUICK_FILTERS: Record<string, QuickFilter> = {
  NPO: resolve({
    label: "Non-Profit / Charitable Trust",
    description: "Registered non-profit organisations (Chapter XVII-B) and deductions for donations to them",
    ranges: [[332, 355]],
    old: ["80G", "80GGA"],
  }),
  Salaried: resolve({
    label: "Salaried Employees",
    description: "Salary income, deductions employees commonly claim, rebate, new tax regime, TDS on salary and return filing",
    ranges: [[15, 19]],
    old: ["80C", "80CCC", "80CCD", "80CCH", "80D", "80DD", "80DDB", "80E", "80EEA", "80EEB", "80G", "80GG", "80TTA", "80TTB", "80U", "87A", "89", "115BAC", "192", "203", "139"],
    exclude: ["354", "402"],
  }),
  NRI: resolve({
    label: "NRI / Non-Resident",
    description: "Residence, income deemed to accrue in India, double taxation relief, special provisions for non-residents and TDS on payments to them",
    ranges: [[159, 160], [207, 220]],
    old: ["6", "9", "9A", "44B", "44BB", "44BBA", "44BBB", "44DA", "195", "172"],
    exclude: ["66", "400"],
  }),
  RealEstate: resolve({
    label: "Real Estate / Property",
    description: "House property income, stamp duty value, capital gains exemptions on property (54, 54EC, 54F) and TDS on property purchase",
    ranges: [[20, 25]],
    old: ["43CA", "50C", "54", "54B", "54D", "54EC", "54F", "54G", "54GA", "55A", "80EE", "80EEA", "194IA", "194IB"],
  }),
  SeniorCitizen: resolve({
    label: "Senior Citizens",
    description: "Provisions with special benefits for senior citizens — health insurance, interest deduction, no advance tax, no return in specified cases",
    old: ["80D", "80DDB", "80TTB", "194P", "207", "197A"],
    exclude: ["400"],
  }),
  Startup: resolve({
    label: "Startups & New Business",
    description: "Eligible start-ups, new manufacturing companies, capital expenditure on specified business and employment incentives",
    old: ["80IAC", "79", "54GB", "115BAB", "35AD", "80JJAA"],
  }),
  Presumptive: resolve({
    label: "Presumptive Taxation",
    description: "Presumptive income schemes (44AD / 44ADA / 44AE and the non-resident schemes), books of account and tax audit",
    old: ["44AD", "44ADA", "44AE", "44B", "44BB", "44BBA", "44BBB", "44BBC", "44AA", "44AB"],
  }),
  Crypto: resolve({
    label: "Crypto / VDA",
    description: "Virtual digital assets — flat tax on transfer, TDS on payment for transfer and reporting of crypto-asset transactions",
    old: ["115BBH", "194S", "285BAA"],
    exclude: ["400"],
  }),
  SearchSeizure: resolve({
    label: "Search & Seizure",
    description: "Powers of search, requisition and survey, block assessment of search cases, and related prosecution",
    ranges: [[246, 251], [292, 301]],
    old: ["133A", "275A", "275B"],
  }),
};
