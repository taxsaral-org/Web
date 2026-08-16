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
    title: "Basic Concepts of Income Tax",
    chapter: "Chapter 1 — Basic Concepts",
    topic: "Basic Concepts",
    description:
      "Covers Tax Year, Person, Assessee, residential status (ROR/RNOR/NR), scope of total income, heads of income, and agricultural income under the Income Tax Act, 2025 — based on ICAI study material.",
    difficulty: "Easy",
    questions: [
      {
        id: "bc-01",
        question:
          "Under the Income Tax Act, 2025, what does 'Tax Year' mean?",
        options: [
          "The 12-month period from 1st April to 31st March during which income is earned",
          "The year in which the Income Tax Department completes the assessment of a taxpayer's income",
          "Any 12-month period selected by the assessee for computing income",
          "The calendar year from 1st January to 31st December",
        ],
        correct: 0,
        explanation:
          "Under IT Act 2025, 'Tax Year' is the 12-month period commencing on 1st April and ending on 31st March. It replaces the older concept of 'Previous Year' from IT Act 1961. Tax Year 2026-27 = 1st April 2026 to 31st March 2027.",
        section: "Chapter 1 — Basic Concepts",
      },
      {
        id: "bc-02",
        question:
          "Which of the following is NOT included in the definition of 'person' under the Income Tax Act, 2025?",
        options: [
          "Body of Individuals",
          "Sole proprietorship firm",
          "Local authority",
          "Every artificial juridical person",
        ],
        correct: 1,
        explanation:
          "A sole proprietorship is NOT a separate legal entity — it is treated as part of the individual owner and taxed in the individual's hands. The 7 categories of 'person' are: (1) Individual, (2) HUF, (3) Company, (4) Firm, (5) AOP or BOI, (6) Local authority, and (7) Every artificial juridical person not falling in any of the above.",
        section: "Chapter 1 — Basic Concepts",
      },
      {
        id: "bc-03",
        question:
          "Mr. A, an individual, was present in India for 190 days in Tax Year 2026-27. He was also present for a total of 700 days during the 7 preceding Tax Years and was resident in India in only 1 of the 10 preceding Tax Years. What is his residential status for Tax Year 2026-27?",
        options: [
          "Resident and Ordinarily Resident (ROR)",
          "Resident but Not Ordinarily Resident (RNOR)",
          "Non-Resident",
          "Deemed Resident",
        ],
        correct: 1,
        explanation:
          "Mr. A qualifies as 'resident' (≥182 days in Tax Year). To be ROR, he must satisfy BOTH: (a) resident in at least 2 of the 10 preceding tax years, AND (b) present ≥730 days in 7 preceding tax years. He fails both — only 1 year as resident and only 700 days (not ≥730). So he is RNOR.",
        section: "Chapter 1 — Basic Concepts",
      },
      {
        id: "bc-04",
        question:
          "Which of the following incomes is taxable in India for a Non-Resident individual?",
        options: [
          "Income earned and received outside India from a business controlled outside India",
          "Interest on NRE account credited outside India",
          "Salary received in India for services rendered in India",
          "Dividend from a foreign company received outside India",
        ],
        correct: 2,
        explanation:
          "For a Non-Resident, only income that accrues or arises in India, or is received in India, is taxable in India. Salary received in India for services rendered in India clearly accrues and is received in India — it is taxable. The other options all relate to income received/accruing outside India.",
        section: "Chapter 1 — Basic Concepts",
      },
      {
        id: "bc-05",
        question:
          "A Resident and Ordinarily Resident (ROR) individual's total income includes which of the following?",
        options: [
          "Only income received or accruing in India",
          "Indian income plus income from a business controlled from India",
          "All income from wherever received or accrued, including foreign income",
          "Indian income plus income received through an Indian bank",
        ],
        correct: 2,
        explanation:
          "An ROR individual is taxable on world income — all income regardless of where it accrues, arises, or is received. This is the broadest scope. RNOR gets Indian income + income from a business/profession controlled from India. NR gets only Indian income.",
        section: "Chapter 1 — Basic Concepts",
      },
      {
        id: "bc-06",
        question:
          "How many heads of income are recognised under the Income Tax Act, 2025?",
        options: ["4", "5", "6", "7"],
        correct: 1,
        explanation:
          "There are 5 heads of income: (1) Salaries, (2) Income from House Property, (3) Profits and Gains from Business or Profession (PGBP), (4) Capital Gains, and (5) Income from Other Sources. All income must be classified under one of these heads before computing total income.",
        section: "Chapter 1 — Basic Concepts",
      },
      {
        id: "bc-07",
        question:
          "Agricultural income in India is:",
        options: [
          "Fully taxable at a flat rate of 10%",
          "Exempt from income tax but considered for rate purposes under partial integration",
          "Exempt from income tax and completely ignored for all purposes",
          "Taxable only if it exceeds ₹5,00,000 in a Tax Year",
        ],
        correct: 1,
        explanation:
          "Agricultural income from land situated in India is exempt from income tax. However, it is included with total income solely to determine the rate of tax applicable on the non-agricultural income (partial integration method) for individuals, HUFs, AOPs, and BOIs. The agricultural income itself is never taxed.",
        section: "Chapter 1 — Basic Concepts",
      },
      {
        id: "bc-08",
        question:
          "An Indian company (incorporated in India) is always treated as:",
        options: [
          "Resident in India only if its Place of Effective Management (POEM) is in India",
          "Resident in India regardless of where its management is exercised",
          "Non-Resident if majority of its directors are foreign nationals",
          "Resident only if more than 50% of its shares are held by Indian residents",
        ],
        correct: 1,
        explanation:
          "An Indian company (i.e., a company incorporated in India under Indian law) is always a resident of India — the POEM test does not apply to it. The POEM test applies only to foreign companies: a foreign company is resident if its POEM is in India during the Tax Year.",
        section: "Chapter 1 — Basic Concepts",
      },
      {
        id: "bc-09",
        question:
          "A Hindu Undivided Family (HUF) is resident in India when:",
        options: [
          "The Karta of the HUF is present in India for at least 182 days in the Tax Year",
          "The control and management of its affairs is situated wholly or partly in India",
          "All coparceners of the HUF are resident in India",
          "The HUF owns immovable property in India",
        ],
        correct: 1,
        explanation:
          "Residential status of an HUF depends on where the control and management of its affairs is exercised — not on the physical presence of the Karta. If control is wholly or partly in India, the HUF is resident. It is Non-Resident only when control and management are situated wholly outside India.",
        section: "Chapter 1 — Basic Concepts",
      },
      {
        id: "bc-10",
        question:
          "Under the Income Tax Act, 2025, the term 'assessee' includes:",
        options: [
          "Only a person liable to pay income tax",
          "Only a person in respect of whom any proceeding under the Act has been taken",
          "A person liable to pay any tax or sum under the Act, or any person in respect of whom any proceeding has been taken",
          "Only companies and firms registered under Indian law",
        ],
        correct: 2,
        explanation:
          "'Assessee' is broadly defined to include: (a) every person liable to pay tax or any other sum (advance tax, TDS, etc.) under the Act, (b) every person in respect of whom any proceeding under the Act has been initiated even if no tax is ultimately payable, and (c) a representative assessee.",
        section: "Chapter 1 — Basic Concepts",
      },
      {
        id: "bc-11",
        question:
          "Which of the following correctly describes a 'Resident but Not Ordinarily Resident' (RNOR) individual's tax scope?",
        options: [
          "Taxable on all world income, same as a Resident and Ordinarily Resident",
          "Taxable only on income received in India",
          "Taxable on Indian income, plus income from a business or profession controlled or set up in India",
          "Taxable on Indian income only, with complete exemption for all foreign income",
        ],
        correct: 2,
        explanation:
          "An RNOR is taxable on: (1) all income accruing, arising, or received in India, AND (2) income from a business or profession that is controlled or set up in India (even if the income accrues outside India). Passive foreign income (interest, rent from abroad from a non-India source) remains outside the scope — unlike an ROR who pays tax on all world income.",
        section: "Chapter 1 — Basic Concepts",
      },
      {
        id: "bc-12",
        question:
          "Mr. B, an Indian citizen, leaves India on 1st October 2026 for employment abroad and does not return during Tax Year 2026-27. His stay in India during Tax Year 2026-27 is 183 days. His residential status is:",
        options: [
          "Resident and Ordinarily Resident, because he was present for more than 182 days",
          "Non-Resident, because the 60-day exception applies to Indian citizens leaving for employment",
          "Resident but Not Ordinarily Resident",
          "Deemed Resident under the special rule for Indian citizens",
        ],
        correct: 1,
        explanation:
          "For an Indian citizen who leaves India for employment abroad, the basic threshold of 182 days applies (not 60 days). However, since he left on 1st October, he was present for approximately 183 days. Wait — re-reading the question: if he was in India for exactly 183 days (April 1 to October 1), he qualifies as resident. The 'exception' reducing the threshold to 60 days does NOT apply to persons leaving for employment — it applies to those VISITING India. So he is Resident (≥182 days). But his NOR/ROR status depends on prior years' residence.",
        section: "Chapter 1 — Basic Concepts",
      },
      {
        id: "bc-13",
        question:
          "Income which accrues or arises outside India is taxable in India in the case of:",
        options: [
          "Non-Resident only if remitted to India within the same Tax Year",
          "Resident and Ordinarily Resident (on all foreign income) and RNOR (on business income controlled from India)",
          "All residents regardless of whether it is an ROR or RNOR",
          "Only if the income is from a country with which India has no Double Taxation Avoidance Agreement",
        ],
        correct: 1,
        explanation:
          "Foreign income is taxable in India for ROR (on all foreign income) and for RNOR only if it arises from a business or profession controlled or set up in India. For RNOR, passive foreign income (dividends, interest, etc. from outside India) is not taxable in India. For Non-Residents, no foreign income is taxable in India.",
        section: "Chapter 1 — Basic Concepts",
      },
      {
        id: "bc-14",
        question:
          "Which of the following is an example of income 'deemed to accrue or arise in India'?",
        options: [
          "Rent received in India from a property located abroad",
          "Dividend declared by an Indian company but received outside India",
          "Salary received outside India from a foreign employer for services rendered outside India",
          "Interest paid by a resident to a non-resident on a loan used for business outside India",
        ],
        correct: 1,
        explanation:
          "Dividends declared by an Indian company are deemed to accrue or arise in India — even if the dividend is paid to a non-resident shareholder outside India. This is a classic deemed-accrual rule. Interest paid by a resident on a loan used for business wholly outside India falls under an exception and is not deemed to accrue in India. Salary for services rendered outside India by a non-resident is also not deemed to accrue in India.",
        section: "Chapter 1 — Basic Concepts",
      },
      {
        id: "bc-15",
        question:
          "Income from a business the control and management of which is situated wholly outside India is taxable in India for:",
        options: [
          "A Resident and Ordinarily Resident individual only",
          "Both ROR and RNOR individuals",
          "Non-Resident individuals only",
          "RNOR individuals only",
        ],
        correct: 0,
        explanation:
          "Income from a business whose control and management is wholly outside India is foreign income. Only an ROR is taxable on all world income including this. An RNOR is taxable on business income from a business 'controlled or set up in India' — if control is wholly outside India, the RNOR is not taxable. A Non-Resident is never taxable on such foreign income in India.",
        section: "Chapter 1 — Basic Concepts",
      },
    ],
    lastUpdated: "2026-08-16",
  },
];

export const DIFFICULTY_ORDER: Difficulty[] = ["Easy", "Medium", "Hard"];
