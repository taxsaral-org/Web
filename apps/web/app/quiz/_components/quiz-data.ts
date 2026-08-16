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

  {
    slug: "basic-concepts-chapter-1",
    title: "Basic Concepts — Case Studies",
    chapter: "Chapter 1 — Basic Concepts",
    topic: "Basic Concepts",
    description:
      "Case-study MCQs from ICAI study material. Apply the concepts of diversion vs. application of income, HUF status, Hundi borrowings (Section 106), and unexplained expenditure (Section 105) to real-world scenarios.",
    difficulty: "Hard",
    questions: [
      {
        id: "bc-01",
        question:
          "Mr. Bhargava, a leading advocate, agreed to appear for a company in the Supreme Court on the condition that ₹5 lakhs be paid for a public charitable trust he would create. The company paid the sum; Mr. Bhargava created the trust. Is the ₹5 lakhs assessable in his hands as income from profession?",
        options: [
          "No — it is diversion of income by overriding title; the trust obligation was imposed before income arose, so the amount never reached Mr. Bhargava as income",
          "Yes — it is application of income; the money first reached Mr. Bhargava as professional fees and he then chose to apply it to create the trust",
          "No — amounts donated to a charitable trust are wholly exempt under the Income Tax Act",
          "Yes — but only 50% is taxable since the balance was paid to charity",
        ],
        correct: 1,
        explanation:
          "The client (company) did not impose any binding trust obligation on Mr. Bhargava before the fees were earned. The trust was created by Mr. Bhargava himself out of his professional income. This is application of income, not diversion by overriding title. The entire ₹5 lakhs is chargeable to tax under 'Profits and Gains of Business or Profession'.",
        section: "Diversion vs. Application of Income",
      },
      {
        id: "bc-02",
        question:
          "XYZ Ltd. bought a running business from a sole-proprietor. The sale deed required XYZ Ltd. to pay ₹15,000 p.a. to the sole-proprietor's wife, charged specifically on XYZ's net profits — an obligation accepted as a condition of purchasing the going concern. Is this payment a diversion of income or application of income?",
        options: [
          "Application of income — XYZ Ltd. voluntarily agreed to pay from its profits; the obligation arose after income was earned",
          "Diversion of income by an overriding charge — the charge was attached to the very source (the going concern) at the time of purchase, before income arose in XYZ's hands",
          "Neither — since the payment is to a third party (the wife), it is simply a business expense deductible under PGBP",
          "Application of income — because the charge is on net profits (post-tax income), not on gross receipts",
        ],
        correct: 1,
        explanation:
          "Per the Allahabad High Court in Jit & Pal X-Rays (P.) Ltd. v. CIT (2004) 267 ITR 370, the overriding charge was an integral part of the sale deed by which the going concern was transferred. The obligation was attached to the very source of income — before net profits could arise in XYZ's hands. This is a clear case of diversion of income by overriding charge, not mere application of income.",
        section: "Diversion vs. Application of Income",
      },
      {
        id: "bc-03",
        question:
          "MKG Agency is a partnership firm. The partnership deed provided that after the death of Mr. Mohan (a partner), 20% of profits shall be paid to his widow Lakshmi. In Tax Year 2026-27 the firm paid ₹1 lakh (20% of profits) to Lakshmi and claimed it as a deduction. Is the firm's claim correct?",
        options: [
          "No — payment to the widow of a deceased partner is personal expenditure; it is not deductible as a business expense",
          "No — such payments are allowable only if Lakshmi is an employee or partner of the firm",
          "Yes — it is a diversion of income by overriding title; the charge on profits existed before income reached the firm, so ₹1 lakh stands excluded from the firm's income",
          "Yes — it is deductible as salary paid to a legal heir under the head 'Salaries'",
        ],
        correct: 2,
        explanation:
          "The partnership deed created a charge in Lakshmi's favour on the firm's profits — established before the income reached the firm. As confirmed in CIT v. Nariman B. Bharucha & Sons (1981) 130 ITR 863 (Bom), amounts diverted at source by a superior title do not form part of the assessee's income. The income stood diverted to Lakshmi before it ever accrued to the firm. The firm's claim to exclude ₹1 lakh is correct.",
        section: "Diversion vs. Application of Income",
      },
      {
        id: "bc-04",
        question:
          "Anand was the Karta of an HUF. He died leaving behind his major son Prem, his widow, his grandmother, and his brother's wife. Can the HUF retain its status as a taxable entity, or do the surviving persons become mere co-owners?",
        options: [
          "The HUF dissolves — a valid HUF requires at least two male coparceners; with only Prem, it ceases to exist",
          "The surviving persons become co-owners only — the HUF loses its status as a separate taxable entity after the death of the Karta",
          "The HUF retains its status — a single male coparcener with female members of the joint family still constitutes a valid HUF under the IT Act, 2025",
          "The HUF retains its status only if Prem formally registers a new HUF deed within 6 months of Anand's death",
        ],
        correct: 2,
        explanation:
          "The Supreme Court in Gowli Buddanna v. CIT (1966) 60 ITR 293 held that there need not be more than one male member to form a HUF as a taxable entity. Under Hindu personal law, a joint family can consist of a single male member and the widows of deceased male members. The IT Act, 2025 uses 'HUF' in its personal-law sense. Therefore, the HUF retains its status — Prem is the new Karta.",
        section: "HUF — Taxable Entity",
      },
      {
        id: "bc-05",
        question:
          "Mr. C borrowed ₹25,000 on a Hundi by way of bearer cheque on 11.09.2026 and repaid ₹30,000 (principal + interest) by account payee cheque on 12.10.2026. The Assessing Officer wants to treat the ₹25,000 borrowed as income for Tax Year 2026-27. Is the AO's action valid?",
        options: [
          "No — borrowed money is a liability, not income; no provision of the IT Act can treat it as income",
          "Yes — Section 106 deems the amount borrowed on a Hundi by bearer cheque to be income of the borrower; since repayment was by account payee cheque, Section 106 does not apply again to the repayment",
          "No — Section 106 applies only to repayment, not to the act of borrowing on a Hundi",
          "Yes — but only the interest component of ₹5,000 is taxable; the principal of ₹25,000 cannot be treated as income",
        ],
        correct: 1,
        explanation:
          "Section 106 of the IT Act, 2025 provides that any amount borrowed on a Hundi (or repaid) otherwise than by account payee cheque drawn on a bank shall be deemed to be income of the borrower/repayer for that Tax Year. Mr. C borrowed ₹25,000 by bearer cheque — this triggers Section 106; the ₹25,000 is deemed income for Tax Year 2026-27. The repayment of ₹30,000 was by account payee cheque, so Section 106 does not apply to the repayment. The AO's action is valid.",
        section: "Section 106 — Hundi Transactions",
      },
      {
        id: "bc-06",
        question:
          "During assessment of a firm, the AO found that the firm paid ₹60,000 as rent for business premises but did not debit it in its books of account for the year ending 31.3.2027. The firm could not explain the source of payment. The AO added ₹60,000 as income under Section 105. The firm now claims the ₹60,000 should be allowed as a deduction in computing business income since it was a genuine business expense. Is the firm's claim tenable?",
        options: [
          "Yes — since rent is an allowable business expense, it should be deducted even if the source is unexplained",
          "Yes — the AO cannot both add it as income and deny the deduction; that leads to double taxation",
          "No — Section 105(2) expressly provides that unexplained expenditure deemed as income shall not be allowed as a deduction under any provision of the Act",
          "No — rent not debited in the books is simply disregarded; the AO's addition is itself legally incorrect",
        ],
        correct: 2,
        explanation:
          "Under Section 105 of the IT Act, 2025 (equivalent to Section 69C of the IT Act, 1961), unexplained expenditure is deemed to be the assessee's income. Section 105(2) further provides that irrespective of any other provision of the Act, such deemed income shall NOT be allowed as a deduction. Once ₹60,000 is treated as unexplained expenditure and added as deemed income, the firm loses the right to claim any deduction for it. The firm's claim is not tenable.",
        section: "Section 105 — Unexplained Expenditure",
      },
    ],
    lastUpdated: "2026-08-16",
  },
];

export const DIFFICULTY_ORDER: Difficulty[] = ["Easy", "Medium", "Hard"];
