export type Difficulty = "Easy" | "Medium" | "Hard";

export interface QuizQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;          // index into options[]
  explanation: string;
  section?: string;                  // e.g. "Section 38(1)(a)"
}

export interface QuizChapter {
  slug: string;
  title: string;
  chapter: string;                   // e.g. "Chapter 4 — PGBP"
  topic: string;                     // short topic label
  description: string;
  difficulty: Difficulty;
  questions: QuizQuestion[];
  lastUpdated: string;               // ISO date
}

// ─── Chapters ────────────────────────────────────────────────────────────────

export const QUIZ_CHAPTERS: QuizChapter[] = [
  {
    slug: "deemed-pgbp-income-section-38",
    title: "Deemed Profits and Gains of Business or Profession",
    chapter: "PGBP — Section 38",
    topic: "Deemed PGBP Income",
    description:
      "Test your understanding of Section 38 of the IT Act 2025 — covering balancing charges, recovery of bad debts, scientific research assets, loan waivers, and withdrawals from special reserves.",
    difficulty: "Medium",
    lastUpdated: "2026-08-08",
    questions: [
      {
        id: "s38-01",
        section: "Section 38(1)(a)",
        question:
          "Under Section 38(1)(a), if an assessee obtained a refund in the current year of an expenditure claimed as a deduction in an earlier year, how is the refund treated?",
        options: [
          "Capital receipt, not taxable",
          "Deemed Profits and Gains of Business or Profession",
          "Exempt income under Section 10",
          "Income from Other Sources",
        ],
        correct: 1,
        explanation:
          "Section 38(1)(a) provides that if a deduction was allowed in an earlier tax year and the assessee subsequently recovers or receives a refund of the same amount, it is deemed to be PGBP income in the year of recovery. The law ensures no double benefit — you cannot permanently enjoy both the deduction and the recovery tax-free.",
      },
      {
        id: "s38-02",
        section: "Section 38(1)(b)",
        question:
          "The Balancing Charge concept under Section 38(1)(b) is applicable only to undertakings that follow which method of depreciation?",
        options: [
          "Written Down Value (WDV) / block-of-assets method",
          "Straight Line Method (SLM)",
          "Both WDV and SLM methods equally",
          "Units of production method",
        ],
        correct: 1,
        explanation:
          "Balancing charge applies exclusively to the Straight Line Method (SLM) of depreciation. Under SLM, depreciation is tracked asset-wise, so the WDV of each individual asset is available and can be compared with its sale consideration. Under the block-of-assets (WDV) method, individual assets lose their separate identity and a balancing charge cannot be computed.",
      },
      {
        id: "s38-03",
        section: "Section 38(1)(b)",
        question:
          "An SLM-depreciated asset has a cost of ₹1,10,000 and a WDV of ₹80,000. It is sold for ₹1,00,000. What is the tax treatment?",
        options: [
          "Balancing charge of ₹30,000 as PGBP income",
          "Balancing charge of ₹20,000 as PGBP income",
          "Terminal depreciation of ₹20,000 allowed as deduction",
          "Capital gain of ₹20,000",
        ],
        correct: 1,
        explanation:
          "Since the sale value (₹1,00,000) exceeds the WDV (₹80,000) but does not exceed the actual cost (₹1,10,000), a Balancing Charge arises. Balancing Charge = Sale Value − WDV = ₹1,00,000 − ₹80,000 = ₹20,000. This represents excess depreciation previously claimed and is taxable as PGBP income.",
      },
      {
        id: "s38-04",
        section: "Section 38(1)(b)",
        question:
          "An SLM-depreciated asset (cost ₹1,10,000, WDV ₹80,000) is sold for ₹60,000. What is the correct tax treatment?",
        options: [
          "Balancing charge of ₹20,000 taxable as PGBP",
          "Capital loss of ₹50,000",
          "Terminal depreciation of ₹20,000 allowed as a deduction",
          "No tax consequence",
        ],
        correct: 2,
        explanation:
          "When the sale value (₹60,000) is below the WDV (₹80,000), Terminal Depreciation arises — not a Balancing Charge. Terminal Depreciation = WDV − Sale Value = ₹80,000 − ₹60,000 = ₹20,000. This unrecovered cost is allowed as an additional depreciation deduction in the year of sale.",
      },
      {
        id: "s38-05",
        section: "Section 38(1)(b)",
        question:
          "An SLM-depreciated asset (cost ₹1,10,000, WDV ₹80,000) is sold for ₹1,20,000. What is the capital gain on this transaction?",
        options: [
          "₹40,000",
          "₹30,000",
          "₹20,000",
          "₹10,000",
        ],
        correct: 3,
        explanation:
          "When the sale value exceeds the original cost, the tax treatment is split: (1) Balancing Charge = depreciation already claimed = ₹1,10,000 − ₹80,000 = ₹30,000, taxable as PGBP; and (2) Capital Gain = sale value − original cost = ₹1,20,000 − ₹1,10,000 = ₹10,000, taxable under Capital Gains. The capital gain is only the amount received over and above the original cost.",
      },
      {
        id: "s38-06",
        section: "Section 38(1)(c)",
        question:
          "Under Section 38(1)(c), when a scientific research asset is sold without being put to business use, the amount deemed as PGBP income is:",
        options: [
          "The full sale consideration",
          "The deduction claimed under Section 51 in full",
          "The lower of (i) sale consideration or (ii) deduction claimed under Section 51",
          "The higher of (i) sale consideration or (ii) deduction claimed under Section 51",
        ],
        correct: 2,
        explanation:
          "Section 38(1)(c) deems PGBP income equal to the lower of (i) the selling price of the asset or (ii) the deduction claimed under Section 51. Any excess of the sale price over the original cost is separately taxable as capital gain (long-term or short-term depending on the holding period).",
      },
      {
        id: "s38-07",
        section: "Section 38(1)(c)",
        question:
          "XYZ Ltd. acquired a scientific research asset on 1 April 2023 for ₹15,00,000 and claimed the full deduction under Section 51. The asset was sold on 30 September 2026 for ₹18,50,000. What is the PGBP income under Section 38(1)(c)?",
        options: [
          "₹18,50,000",
          "₹15,00,000",
          "₹3,50,000",
          "₹12,00,000",
        ],
        correct: 1,
        explanation:
          "PGBP income = Lower of (i) Sale consideration ₹18,50,000 or (ii) Deduction claimed ₹15,00,000 = ₹15,00,000. The remaining ₹3,50,000 (₹18,50,000 − ₹15,00,000) is taxable as Long-Term Capital Gain since the asset was held for more than 24 months.",
      },
      {
        id: "s38-08",
        section: "Section 38(1)(d)",
        question:
          "Under Section 38(1)(d), recovery of bad debts is taxable as PGBP income even if:",
        options: [
          "A fresh bad debt has arisen in the same year",
          "The business has been discontinued or the provision no longer exists",
          "The recovery is made by a different assessee",
          "The bad debt was only partially written off",
        ],
        correct: 1,
        explanation:
          "Section 38(1)(d) specifically provides that the recovery of bad debts is taxable in the year of recovery even if the business or provision for doubtful debts is no longer in existence in that year. The key trigger is that a deduction was allowed under Section 31 in a prior year and a recovery has now been made.",
      },
      {
        id: "s38-09",
        section: "Section 38(1)(d)",
        question:
          "A company claimed ₹60,000 as bad debt deduction under Section 31. Of this, ₹40,000 was disallowed by the AO. Subsequently, ₹70,000 is recovered. What amount is taxable under Section 38(1)(d)?",
        options: [
          "₹70,000",
          "₹60,000",
          "₹40,000",
          "₹30,000",
        ],
        correct: 3,
        explanation:
          "Only the portion corresponding to the deduction actually allowed is taxable. Deduction allowed = ₹60,000 − ₹40,000 (disallowed) = ₹20,000. But the recovery is ₹70,000. Taxable amount = Recovery − Disallowed amount = ₹70,000 − ₹40,000 = ₹30,000. The ₹40,000 that was previously disallowed is not brought back into income.",
      },
      {
        id: "s38-10",
        section: "Section 38(1)(d)",
        question:
          "A firm claimed a bad debt deduction under Section 31 and was subsequently dissolved. The partners later recovered the bad debt. Section 38(1)(d) applies to:",
        options: [
          "The dissolved firm",
          "The partners, in proportion to their profit-sharing ratio",
          "Neither — Section 38(1)(d) does not apply as the firm and partners are different persons",
          "Both the firm and partners jointly",
        ],
        correct: 2,
        explanation:
          "Section 38(1)(d) requires that the same assessee who claimed the deduction also makes the recovery. Since the firm (which claimed the deduction) and the partners (who recover the bad debt after dissolution) are different persons, Section 38(1)(d) cannot apply to the partners. The recovery is therefore not taxable in the partners' hands under this provision.",
      },
      {
        id: "s38-11",
        section: "Section 38(1)(a)",
        question:
          "Under Section 38(1)(a), which of the following loan waivers is treated as deemed PGBP income?",
        options: [
          "Waiver of a capital loan by the lender",
          "Waiver of the interest portion of a working capital loan",
          "Waiver of the principal portion of a working capital loan",
          "Waiver of a loan used to purchase a fixed asset",
        ],
        correct: 2,
        explanation:
          "Only the principal portion of a working capital loan waiver is taxable under Section 38(1)(a). This is because the assessee would have incurred revenue expenditure (funded from the working capital loan) that was already deducted. The interest portion is not taxable since interest is deductible only when actually paid — unpaid interest was never deducted, so its waiver is not a reversal of any prior benefit.",
      },
      {
        id: "s38-12",
        section: "Section 38(1)(a)",
        question:
          "If an assessee writes off a time-barred liability in the books of account, the treatment under the Income Tax Act, 2025 is:",
        options: [
          "Allowed as a deduction in the year of write-off",
          "Treated as deemed PGBP income under Section 38(1)(a)",
          "Treated as a long-term capital gain",
          "No tax consequence — it is a book entry only",
        ],
        correct: 1,
        explanation:
          "Writing off a time-barred liability is treated as deemed PGBP income under Section 38(1)(a). The logic is that the liability was originally claimed as an expense (giving a tax deduction), and by writing it off without actually paying it, the assessee obtains a permanent benefit — the law taxes this as income in the year of write-off.",
      },
      {
        id: "s38-13",
        section: "Section 38(1)(e)",
        question:
          "Any withdrawal from special reserves created under Section 32(e) is taxable under which head of income?",
        options: [
          "Income from Other Sources",
          "Capital Gains",
          "Profits and Gains of Business or Profession",
          "The withdrawal is exempt from tax",
        ],
        correct: 2,
        explanation:
          "Section 38(1)(e) provides that any withdrawal from special reserves created and deducted under Section 32(e) is taxable as PGBP income in the year of withdrawal. This mirrors the Section 38 anti-double-benefit principle — since a deduction was allowed when the reserve was created, any reversal is brought back to tax as business income.",
      },
      {
        id: "s38-14",
        section: "Section 38",
        question:
          "What is the underlying principle behind all five limbs of Section 38?",
        options: [
          "All receipts from business are taxable regardless of their nature",
          "A taxpayer cannot permanently retain a benefit from a deduction that has since been reversed by events",
          "Deemed income is always taxed at a higher rate than regular income",
          "Business losses must be set off against deemed income under Section 38 first",
        ],
        correct: 1,
        explanation:
          "Section 38 is the Income Tax Act's anti-double-benefit mechanism. In each of the five scenarios — recovery of expenses, balancing charge, sale of scientific research assets, recovery of bad debts, and withdrawal from special reserves — the common thread is that the assessee previously received a deduction or tax benefit, and the law ensures that any reversal or windfall is brought back into income. You cannot permanently benefit from a deduction that events have since reversed.",
      },
    ],
  },
];

export const DIFFICULTY_ORDER: Difficulty[] = ["Easy", "Medium", "Hard"];
