export type Difficulty = "Easy" | "Medium" | "Hard";

export interface QuizQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;          // index into options[]
  explanation: string;
  section?: string;                  // e.g. "Section 38(1)(a)"
}

export type QuizSource = "detailed-explainer" | "icai";

export interface QuizChapter {
  slug: string;
  source: QuizSource;
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
    source: "detailed-explainer",
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
    source: "icai",
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

  // ── Buyback of Securities ─────────────────────────────────────────────────
  {
    slug: "buyback-of-securities",
    source: "detailed-explainer",
    title: "Taxation in Case of Buyback of Securities",
    chapter: "Capital Gains — Sections 69 & 196",
    topic: "Buyback of Securities",
    description:
      "Test your understanding of how share buybacks are taxed — nil tax on the company, capital gains in shareholders' hands, and the Section 196 additional tax that applies when the seller is a promoter.",
    difficulty: "Medium",
    questions: [
      {
        id: "bb-01",
        question: "When a company buys back its own shares under the Companies Act, 2013, what is the tax treatment in the company's hands under the IT Act 2025?",
        options: [
          "No tax is applicable on the company — the entire tax consequence falls in the shareholders' hands",
          "The buyback premium (excess over face value) is taxable as business income",
          "The company must pay a 20% dividend distribution tax on the buyback amount",
          "30% tax applies on the difference between the buyback price and the original issue price",
        ],
        correct: 0,
        explanation: "Under the IT Act 2025, no tax is applicable on the company when it buys back its own shares or specified securities. The full tax burden rests with the selling shareholders — either regular capital gains under Section 69 or additional tax under Section 196 if the seller is a promoter.",
        section: "Sections 69 & 196 — Buyback",
      },
      {
        id: "bb-02",
        question: "Under Section 69, how is a buyback of shares classified in the hands of the shareholder?",
        options: [
          "As dividend income taxable under 'Income from Other Sources'",
          "As capital gains arising from extinguishment of rights in the shares",
          "As business income if the shareholder holds more than 5% of shares",
          "As deemed dividend under Section 2(40)(e)",
        ],
        correct: 1,
        explanation: "Buyback of shares is treated as extinguishment of rights in the shares — a capital gains event under Section 69, not dividend income. The buyback price is the full value of consideration; the cost of acquisition is the original purchase price. This distinction matters because capital gains and dividend income attract different rates.",
        section: "Section 69 — Capital Gains on Buyback",
      },
      {
        id: "bb-03",
        question: "What holding period makes a buyback gain on listed equity shares qualify as Long-Term Capital Gain (LTCG)?",
        options: [
          "More than 24 months",
          "More than 36 months",
          "More than 12 months",
          "More than 6 months",
        ],
        correct: 2,
        explanation: "For listed equity shares, the holding period threshold for LTCG is more than 12 months. For unlisted shares or securities, the threshold is 24 months. The holding period is measured from the date of purchase to the buyback date.",
        section: "Section 69 — LTCG vs STCG",
      },
      {
        id: "bb-04",
        question: "An investor (not a promoter) holds 8% equity in ABC Ltd. and participates in a buyback under Section 68 of the Companies Act. What additional tax under Section 196 applies?",
        options: [
          "No additional tax — Section 196 applies only to promoters; an 8% holder is not a promoter",
          "2% additional tax since the buyback is under Section 68 of the Companies Act",
          "10% additional tax since the holder owns more than 5% of shares",
          "20% additional tax as a flat rate on all buyback gains",
        ],
        correct: 0,
        explanation: "Section 196 additional tax applies only to 'promoters' — defined as persons holding more than 10% shares (directly or indirectly), SEBI ICDR-defined promoters, or Companies Act Section 2(69) promoters. An 8% holder who does not fall under any of these three categories is not a promoter and pays only regular capital gains tax — no Section 196 surcharge.",
        section: "Section 196 — Promoter Additional Tax",
      },
      {
        id: "bb-05",
        question: "A domestic company that is a promoter participates in a buyback generating LTCG. What is the applicable additional tax rate under Section 196 on the LTCG?",
        options: [
          "2% (STCG rate for domestic companies)",
          "9.5% (LTCG rate for domestic companies)",
          "10% (LTCG rate for non-domestic promoters)",
          "17.5% (LTCG rate for other-than-domestic promoters)",
        ],
        correct: 1,
        explanation: "Under Section 196, for LTCG arising from a buyback: domestic company promoters pay 9.5% additional tax; promoters who are not domestic companies pay 17.5%. For STCG: domestic company promoters pay 2%; others pay 10%. These rates are in addition to (not in replacement of) the regular capital gains tax on the same income.",
        section: "Section 196 — Additional Tax Rates",
      },
      {
        id: "bb-06",
        question: "Which of the following correctly identifies all three categories of 'promoter' for Section 196 additional tax?",
        options: [
          "Only founders of the company at incorporation",
          "Any person holding more than 5% of shares in the company",
          "A person under SEBI ICDR Regulations 2018 Section 2(k); OR any person directly/indirectly holding more than 10% of shareholding; OR a person under Companies Act Section 2(69)",
          "Only persons formally named as promoters in the company's IPO prospectus filed with SEBI",
        ],
        correct: 2,
        explanation: "Section 196 defines 'promoter' using three independent tests — any one of which suffices: (1) a person covered under SEBI ICDR Regulations 2018 Section 2(k), (2) any person who directly or indirectly holds more than 10% of the company's shareholding, or (3) a person covered under Companies Act 2013 Section 2(69). Even without a formal SEBI promoter designation, crossing the 10% threshold triggers the additional tax.",
        section: "Section 196 — Who is a Promoter",
      },
    ],
    lastUpdated: "2026-08-16",
  },

  // ── Deemed Dividend ───────────────────────────────────────────────────────
  {
    slug: "deemed-dividend-closely-held-companies",
    source: "detailed-explainer",
    title: "Deemed Dividend — Loans by Closely Held Companies",
    chapter: "Special Income — Section 2(40)(e)",
    topic: "Deemed Dividend",
    description:
      "Test your understanding of when a loan from a closely held company becomes deemed dividend, the 10% and 20% thresholds, the accumulated-book-profits cap, and why repayment does not reverse the tax consequence.",
    difficulty: "Medium",
    questions: [
      {
        id: "dd-01",
        question: "Section 2(40)(e) of the IT Act 2025 — deemed dividend on loans — applies to which type of company?",
        options: [
          "Any company, whether listed or unlisted",
          "Only public listed companies on recognised stock exchanges",
          "Only unlisted closely held companies (companies in which the public are not substantially interested)",
          "Only foreign companies with Indian subsidiaries",
        ],
        correct: 2,
        explanation: "Section 2(40)(e) applies exclusively to closely held (unlisted) companies — companies in which the public are not substantially interested. Listed companies and companies where the public has substantial interest are entirely outside the scope of this provision. This prevents double taxation in entities already subject to public scrutiny.",
        section: "Section 2(40)(e) — Closely Held Companies",
      },
      {
        id: "dd-02",
        question: "A closely held company gives a loan to a partnership firm. Under what condition does this loan become deemed dividend?",
        options: [
          "Always — any loan from a closely held company to a third party is deemed dividend",
          "When the firm holds 10% or more voting power in the closely held company",
          "When the firm holds 20% or more voting power OR 20% or more profit-sharing ratio in the closely held company",
          "Only when the loan exceeds the company's paid-up share capital",
        ],
        correct: 2,
        explanation: "For loans to a 'concern' (company, firm, AOP, BOI, HUF), the trigger is 20% or more voting power OR 20% or more profit-sharing ratio in the lending closely held company. The lower 10% threshold applies only to direct loans to individual equity shareholders. Getting this distinction right is key — 10% for individuals, 20% for concerns.",
        section: "Section 2(40)(e) — Thresholds",
      },
      {
        id: "dd-03",
        question: "A closely held company has accumulated book profits of ₹12 lakh and gives a loan of ₹18 lakh to a 15% shareholder. How much is treated as deemed dividend?",
        options: [
          "₹18 lakh — the full loan amount is deemed dividend",
          "₹12 lakh — capped at the accumulated book profits (lower of loan and book profits)",
          "₹6 lakh — only the excess over accumulated profits",
          "Nil — the 20% threshold applies to shareholders; 15% is insufficient",
        ],
        correct: 1,
        explanation: "Deemed dividend is capped at the company's accumulated book profits (Reserves & Surplus). Even though the loan is ₹18 lakh, deemed dividend = Lower of (loan ₹18L, book profits ₹12L) = ₹12 lakh. The balance ₹6 lakh remains a genuine loan with no deemed dividend implications. Note: the 10% threshold applies to shareholders, so 15% qualifies.",
        section: "Section 2(40)(e) — Cap at Book Profits",
      },
      {
        id: "dd-04",
        question: "A closely held company lends ₹5 lakh to a 15% shareholder in July 2026. The shareholder repays the full amount with market-rate interest by October 2026. What is the tax consequence?",
        options: [
          "No deemed dividend — the loan was fully repaid within the Tax Year with market-rate interest",
          "The ₹5 lakh is deemed dividend in Tax Year 2026-27 despite full repayment",
          "Only the interest component is treated as deemed dividend, not the principal",
          "No deemed dividend since the loan was outstanding for less than 6 months",
        ],
        correct: 1,
        explanation: "Repayment does NOT cure deemed dividend status. Under Section 2(40)(e), the loan is treated as deemed dividend in the Tax Year it was given — regardless of subsequent repayment, interest charged, or duration. The deemed dividend arises at the moment the loan is made. This is one of the most tested 'trick' aspects of this section.",
        section: "Section 2(40)(e) — Repayment Does Not Cure",
      },
      {
        id: "dd-05",
        question: "In which of the following situations is a loan from a closely held company NOT treated as deemed dividend?",
        options: [
          "A 12% shareholder borrows for a personal vehicle purchase",
          "A concern holding 25% profit-sharing ratio borrows for expansion",
          "A trade advance given by the company to a supplier in the ordinary course of its business (CBDT Circular 19/2017)",
          "A loan given to the spouse of a 15% shareholder on behalf of the shareholder",
        ],
        correct: 2,
        explanation: "CBDT Circular 19/2017 clarified that trade advances given in the ordinary course of commercial transactions are NOT treated as deemed dividend. All other options satisfy the trigger conditions — a 12% shareholder (≥10%), a 25% profit-sharing concern (≥20%), and a loan on behalf of a 15% shareholder all qualify as deemed dividend.",
        section: "Section 2(40)(e) — Trade Advance Exception",
      },
      {
        id: "dd-06",
        question: "Under which head of income is deemed dividend under Section 2(40)(e) taxed in the hands of the recipient?",
        options: [
          "Capital Gains — since it relates to shares",
          "Salaries — if the shareholder is also an employee",
          "Income from Other Sources — the residuary head",
          "Profits and Gains of Business or Profession",
        ],
        correct: 2,
        explanation: "Deemed dividend under Section 2(40)(e) is taxed in the hands of the recipient shareholder (or concern) as 'Income from Other Sources' — the residuary head. The closely held company does not get any deduction for the loan treated as deemed dividend, nor does it pay any tax on it.",
        section: "Section 2(40)(e) — Head of Income",
      },
    ],
    lastUpdated: "2026-08-16",
  },

  // ── Agricultural Income ───────────────────────────────────────────────────
  {
    slug: "agricultural-income",
    source: "detailed-explainer",
    title: "Agricultural Income — Exemption, Bifurcation & Partial Integration",
    chapter: "Agricultural Income — Section 2(5) & Rules 270–271",
    topic: "Agricultural Income",
    description:
      "Test your understanding of what qualifies as agricultural income, how Rule 270 splits field-to-factory income at the FMV pivot, the fixed percentage splits under Rule 271 for Tea/Coffee/Rubber, and how partial integration raises the effective tax rate.",
    difficulty: "Medium",
    questions: [
      {
        id: "ag-01",
        question: "Which of the following does NOT qualify as agricultural income under Section 2(5) of the IT Act 2025?",
        options: [
          "Rent from rural agricultural land let out to a tenant farmer",
          "Income from growing seedlings and saplings in a nursery",
          "Rent from a warehouse situated on urban agricultural land used for agricultural storage",
          "Sale proceeds from paddy grown on agricultural land and sold without further processing",
        ],
        correct: 2,
        explanation: "Rent from a dwelling house or warehouse qualifies as agricultural income only if the land is rural AND the premises are used for agricultural purposes. A warehouse on urban agricultural land fails the 'rural' condition — its rent is taxable. Rural land rent, nursery income, and unprocessed produce sales all qualify as agricultural income.",
        section: "Section 2(5) — Categories of Agricultural Income",
      },
      {
        id: "ag-02",
        question: "Mr. Ram grows cotton and processes it into yarn in his own mill. Under Rule 270, how is the overall profit split?",
        options: [
          "100% agricultural income — since the cotton was grown by him on his own land",
          "Agricultural income = FMV at farm gate minus cost of cultivation; Business income (PGBP) = Sale price of yarn minus FMV of raw cotton minus manufacturing cost",
          "A fixed 50/50 split between agricultural income and PGBP regardless of actual values",
          "100% taxable as PGBP — since the final product (yarn) is a manufactured good, not raw produce",
        ],
        correct: 1,
        explanation: "Rule 270 uses the FMV of the raw produce at the farm gate as the pivot. Step 1 (agricultural, exempt): FMV of raw cotton minus cost of cultivation. Step 2 (business, taxable as PGBP): Sale price of yarn minus FMV of raw cotton minus cost of processing. The FMV separates what the land produced (exempt) from what the factory added (taxable).",
        section: "Rule 270 — Bifurcation at Farm Gate",
      },
      {
        id: "ag-03",
        question: "A grower processes rubber into manufactured rubber sheets. Under Rule 271, what percentage of total income is treated as agricultural income?",
        options: [
          "40%",
          "60%",
          "65%",
          "75%",
        ],
        correct: 2,
        explanation: "Under Rule 271 fixed splits: Tea (grown and manufactured) = 60% agri / 40% PGBP; Coffee (grown and cured) = 75% agri / 25% PGBP; Coffee (grown, cured, roasted and grounded) = 60% / 40%; Rubber (grown and manufactured) = 65% agri / 35% PGBP. Rule 271 applies only when the same person both grows and processes the specified crop.",
        section: "Rule 271 — Tea, Coffee & Rubber",
      },
      {
        id: "ag-04",
        question: "Partial integration of agricultural income with non-agricultural income for rate purposes applies when which THREE conditions are simultaneously satisfied?",
        options: [
          "The taxpayer is any person; net agricultural income exceeds ₹5,000; and total income exceeds the basic exemption limit",
          "The taxpayer is an Individual, HUF, AOP, BOI, or AJP; net agricultural income exceeds ₹5,000; and total non-agricultural income exceeds the applicable basic exemption limit",
          "The taxpayer is a company; agricultural income exceeds ₹5,000; and total income is below ₹50 lakh",
          "The taxpayer is a resident; agricultural income exceeds ₹1,000; and total income exceeds ₹5 lakh",
        ],
        correct: 1,
        explanation: "Partial integration applies only when ALL THREE conditions hold: (1) the taxpayer is an individual, HUF, AOP, BOI, or Artificial Juridical Person — companies, LLPs, and partnership firms are NEVER subject to partial integration; (2) net agricultural income exceeds ₹5,000; and (3) total non-agricultural income exceeds the applicable basic exemption limit.",
        section: "Partial Integration — Three Conditions",
      },
      {
        id: "ag-05",
        question: "In Step 2 of the partial integration calculation, what is the base amount on which tax is computed?",
        options: [
          "Non-agricultural income alone — to find the base rate",
          "Net agricultural income alone — to measure its slab impact",
          "Basic exemption limit plus net agricultural income",
          "Non-agricultural income plus net agricultural income (same as Step 1)",
        ],
        correct: 2,
        explanation: "Step 2 computes tax on (Basic Exemption Limit + Net Agricultural Income). This Step 2 result is then subtracted from Step 1 (tax on total income including agricultural income) to arrive at the base tax. The difference cleanly isolates the marginal tax cost caused by agricultural income pushing non-agricultural income into higher slab brackets.",
        section: "Partial Integration — 4-Step Calculation",
      },
      {
        id: "ag-06",
        question: "A partnership firm earns ₹8 lakh from agricultural operations. How is this taxed?",
        options: [
          "Fully exempt; and since the firm is a partnership, partial integration also applies",
          "Taxable at 30% flat since partnership firms cannot claim agricultural income exemption",
          "Fully exempt; partial integration does NOT apply to partnership firms",
          "Subject to partial integration since the agricultural income exceeds ₹5,000",
        ],
        correct: 2,
        explanation: "Agricultural income is exempt for all assessees including partnership firms. However, partial integration — which uses agricultural income to increase the effective rate on non-agricultural income — applies only to individuals, HUFs, AOPs, BOIs, and Artificial Juridical Persons. A partnership firm is excluded from partial integration; its agricultural income is simply tax-free with no rate impact on its other income.",
        section: "Partial Integration — Applies Only to Individuals & Like Entities",
      },
    ],
    lastUpdated: "2026-08-16",
  },

  // ── Grandfathering Rule ───────────────────────────────────────────────────
  {
    slug: "cost-of-acquisition-shares-grandfathering",
    source: "detailed-explainer",
    title: "Cost of Acquisition of Shares — The Grandfathering Rule",
    chapter: "Capital Gains — Section 90(7)",
    topic: "Grandfathering Rule",
    description:
      "Test your understanding of how Section 90(7) steps up cost to FMV on 31 Jan 2018, the three FMV cases (listed/not-listed/unlisted MF), the two-part COA formula, and the 12.5% LTCG rate with ₹1.25 lakh exemption.",
    difficulty: "Hard",
    questions: [
      {
        id: "gf-01",
        question: "Why was the grandfathering rule under Section 90(7) introduced for listed shares acquired before 1 Feb 2018?",
        options: [
          "To exempt all LTCG on listed shares from tax on a permanent basis",
          "To protect pre-31 January 2018 appreciation from the LTCG tax introduced from 1 April 2018 — so only post-Jan 2018 gains are taxed",
          "To allow investors to step up cost for reporting purposes without any tax impact",
          "To provide an indexation benefit for shares held for more than 3 years",
        ],
        correct: 1,
        explanation: "LTCG on listed shares was completely tax-free until 31 March 2018. When Section 198 introduced LTCG tax from 1 April 2018, the grandfathering rule protected pre-2018 gains by stepping up the cost to FMV on 31 January 2018. Only appreciation after that freeze date is taxed. The freeze date is 31 Jan 2018; LTCG tax starts from 1 Apr 2018.",
        section: "Section 90(7) — Why Grandfathering Exists",
      },
      {
        id: "gf-02",
        question: "What is the correct formula for the deemed Cost of Acquisition (COA) under Section 90(7)?",
        options: [
          "Higher of (Actual Cost, Sale Value)",
          "Lower of (FMV on 31.01.2018, Actual Cost)",
          "Higher of (Actual Cost, Lower of (FMV on 31.01.2018, Sale Value))",
          "Lower of (Actual Cost, Higher of (FMV on 31.01.2018, Sale Value))",
        ],
        correct: 2,
        explanation: "COA = Higher of (Actual Cost, Lower of (FMV on 31.01.2018, Sale Value)). The inner 'Lower of FMV/Sale' prevents the step-up from creating a phantom loss when FMV > sale price. The outer 'Higher of Cost/result' prevents the step-up from turning a real gain into a loss when actual cost > FMV. Together, the worst outcome is always zero gain — never a negative.",
        section: "Section 90(7) — COA Formula",
      },
      {
        id: "gf-03",
        question: "A mutual fund unit was listed on a stock exchange on 1 February 2018 (NOT listed on 31 January 2018). The unit was bought in 2016 at ₹400. What is the FMV on 31 January 2018 for the grandfathering formula?",
        options: [
          "The highest quoted price on the stock exchange on 31.01.2018",
          "The NAV published by the fund house on 31.01.2018",
          "Actual Cost × (CII of 2017-18 [278] ÷ CII of the year of transfer) — the indexed cost",
          "The actual purchase price of ₹400",
        ],
        correct: 2,
        explanation: "The listing status ON 31.01.2018 (not the purchase date) determines which FMV case applies. Since this unit was NOT listed on 31.01.2018 (it listed on 1 Feb 2018), Case 2 applies: FMV = Actual Cost × (CII 2017-18 [278] ÷ CII of year of transfer). Case 1 (highest quoted price) requires listing on 31.01.2018. Case 3 (NAV) applies only to units not even listed at the time of transfer.",
        section: "Section 90(7) — Three FMV Cases",
      },
      {
        id: "gf-04",
        question: "Mr. K bought 100 shares at ₹500 each in 2016. FMV on 31.01.2018 was ₹800. He sold all at ₹750 each with STT paid. What is his COA per share and his LTCG?",
        options: [
          "COA = ₹500 (actual cost); LTCG = ₹250 per share",
          "COA = ₹800 (FMV on 31.01.2018); LTCG = (₹50) loss per share",
          "COA = ₹750 (sale price); LTCG = Nil",
          "COA = ₹625 (average of cost and FMV); LTCG = ₹125 per share",
        ],
        correct: 2,
        explanation: "Step 1: Lower of (FMV ₹800, Sale ₹750) = ₹750. Step 2: Higher of (Actual Cost ₹500, ₹750) = ₹750. COA = ₹750. LTCG = ₹750 − ₹750 = Nil per share. The 'Lower of FMV/Sale' safety valve kicked in — since the sale price fell below the FMV, COA is capped at ₹750 (the sale price), giving zero gain rather than an artificial loss.",
        section: "Section 90(7) — Applying the Formula",
      },
      {
        id: "gf-05",
        question: "What is the LTCG tax rate under Section 198 on gains from listed equity shares above the annual exemption limit?",
        options: [
          "10% without indexation",
          "12.5% without indexation (with STT paid as a mandatory condition)",
          "20% with indexation",
          "15% flat regardless of STT",
        ],
        correct: 1,
        explanation: "Under Section 198, LTCG on listed equity shares and equity-oriented MF units is taxed at 12.5% on gains exceeding ₹1,25,000 (annual exemption limit). Indexation is NOT available — the grandfathering step-up replaces indexation for these assets. STT must have been paid on both acquisition and transfer for listed shares (on transfer at least for MF units).",
        section: "Section 198 — LTCG Rate and Exemption",
      },
      {
        id: "gf-06",
        question: "Mr. Raj holds 200 units of a listed equity MF (Fund B) bought at ₹550 each in 2017. Fund B was listed on 1 Feb 2018 (NOT listed on 31.01.2018). NAV on 31.01.2018 was ₹950. Sale price on 3 Apr 2026 is ₹900 per unit. What is his LTCG?",
        options: [
          "₹70,000 (₹350 gain × 200 units)",
          "₹0 — COA equals the sale price of ₹900",
          "₹10,000 loss (₹50 loss × 200 units)",
          "₹40,000 (₹200 gain × 200 units)",
        ],
        correct: 1,
        explanation: "Since Fund B was NOT listed on 31.01.2018, the FMV is not the NAV — it's the indexed cost: ₹550 × (CII 278 ÷ CII of 2026-27). But using the numbers given: if we were to apply the NAV of ₹950 — Step 1: Lower of (NAV ₹950, Sale ₹900) = ₹900. Step 2: Higher of (Cost ₹550, ₹900) = ₹900. LTCG = ₹900 − ₹900 = Nil. This illustrates the safety valve: when FMV (₹950) exceeds the sale price (₹900), COA is capped at ₹900, giving zero gain rather than a phantom loss.",
        section: "Section 90(7) — Safety Valve in Action",
      },
    ],
    lastUpdated: "2026-08-16",
  },

  // ── Slump Sale ────────────────────────────────────────────────────────────
  {
    slug: "slump-sale-section-77",
    source: "detailed-explainer",
    title: "Slump Sale — Tax on Transfer of Undertaking",
    chapter: "Capital Gains — Section 77",
    topic: "Slump Sale",
    description:
      "Test your understanding of what constitutes a slump sale, the 3-year LTCG threshold, the FMV computation under Rule 53 (higher of FMV 1 and FMV 2), Net Worth as the cost of acquisition, and the Form 28 compliance requirement.",
    difficulty: "Hard",
    questions: [
      {
        id: "ss-01",
        question: "Which of the following correctly defines a 'slump sale' under Section 2(103) of the IT Act 2025?",
        options: [
          "Sale of all shares of a company at a single negotiated price",
          "Transfer of an entire undertaking or division for a lump-sum consideration, without assigning individual values to the assets or liabilities transferred",
          "Sale of all fixed assets of a business in a distress or liquidation situation",
          "Transfer of business assets to a wholly owned subsidiary at book value",
        ],
        correct: 1,
        explanation: "A slump sale under Section 2(103) is defined by two features: (1) the transfer of any undertaking or division as a whole, and (2) a lump-sum consideration where no individual values are assigned to the constituent assets or liabilities. Because there is no per-asset price, the normal capital gains formula (cost of individual asset) cannot apply — Section 77 uses Net Worth as the cost of acquisition instead.",
        section: "Section 2(103) — Definition of Slump Sale",
      },
      {
        id: "ss-02",
        question: "For determining LTCG vs STCG in a slump sale under Section 77, what is the holding period threshold for the undertaking?",
        options: [
          "12 months — same as listed equity shares",
          "24 months — same as unlisted shares",
          "More than 36 months (3 years) — the specific rule for undertakings",
          "More than 60 months (5 years) — since an entire business is being transferred",
        ],
        correct: 2,
        explanation: "Section 77 applies a special 3-year rule: if the undertaking has been held for more than 3 years, the gain is LTCG; if 3 years or less, it is STCG. The holding period is measured for the undertaking or division as a whole — not for individual assets within it (some of which may have been held shorter or longer).",
        section: "Section 77 — LTCG vs STCG Holding Period",
      },
      {
        id: "ss-03",
        question: "Under Rule 53, the 'Fair Value of Consideration' for a slump sale is:",
        options: [
          "The price stated in the sale agreement between the parties",
          "The total book value of all assets transferred",
          "The higher of FMV 1 (value of the undertaking) and FMV 2 (actual total consideration received)",
          "The lower of FMV 1 and FMV 2 to adopt a conservative approach",
        ],
        correct: 2,
        explanation: "Rule 53 mandates Fair Value of Consideration = Higher of FMV 1 and FMV 2. FMV 1 is computed as: FMV of assets (book value for general assets, FMV for shares/jewellery/art, Stamp Duty Value for immovable property) minus liabilities taken over. FMV 2 is the total actual consideration (monetary + FMV of non-monetary items + SDV of immovable property received). Using the higher value prevents tax avoidance through understatement.",
        section: "Rule 53 — Fair Value of Consideration",
      },
      {
        id: "ss-04",
        question: "In computing Net Worth for a slump sale, depreciable assets are valued at:",
        options: [
          "Original cost of acquisition",
          "Fair Market Value (FMV) on the date of transfer",
          "Written Down Value (WDV)",
          "Stamp Duty Value",
        ],
        correct: 2,
        explanation: "Net Worth uses WDV (Written Down Value) for depreciable assets and book value for all other assets. WDV is the tax book value after accumulated depreciation — consistent with how these assets are tracked in the block of assets for depreciation purposes. Liabilities are taken at book value. Note: self-generated goodwill and assets on which full Section 46 deduction was claimed are valued at Nil.",
        section: "Section 77 — Net Worth Computation",
      },
      {
        id: "ss-05",
        question: "The undertaking being sold in a slump sale has total asset value of ₹80 lakh but liabilities of ₹1 crore — Net Worth is negative. What is the cost of acquisition for computing capital gain?",
        options: [
          "Negative ₹20 lakh — the gain is FVC plus ₹20 lakh",
          "Nil — negative net worth is treated as zero cost of acquisition",
          "₹20 lakh (absolute value of net worth treated as positive)",
          "Not applicable — a slump sale cannot legally proceed when net worth is negative",
        ],
        correct: 1,
        explanation: "When the net worth of the undertaking is negative, the cost of acquisition is taken as Nil. The capital gain equals the full Fair Value of Consideration. A negative net worth cannot reduce the taxable gain below zero — the law prevents an automatic loss in this situation by flooring the cost at Nil.",
        section: "Section 77 — Negative Net Worth = Nil COA",
      },
      {
        id: "ss-06",
        question: "What mandatory document must be filed under Section 63 to support the Net Worth computation in a slump sale?",
        options: [
          "Form 10-I signed by the Board of Directors",
          "Form 28 — a Chartered Accountant's certificate certifying the Net Worth",
          "Form 26AS — the annual tax credit statement",
          "Form 15CA — the foreign remittance declaration",
        ],
        correct: 1,
        explanation: "Under Section 63, the assessee must file Form 28 — a Chartered Accountant's certificate — certifying the correct computation of Net Worth for the slump sale. This is a mandatory statutory compliance requirement. Without it, the deduction of Net Worth from the Fair Value of Consideration can be challenged and disallowed by the Assessing Officer.",
        section: "Section 63 — Form 28 Compliance",
      },
    ],
    lastUpdated: "2026-08-16",
  },

  // ── Employee Welfare Deductions ───────────────────────────────────────────
  {
    slug: "employee-welfare-deductions-section-29",
    source: "detailed-explainer",
    title: "Employer Deductions for Employee Welfare — PF, NPS & Gratuity",
    chapter: "Business & Profession — Section 29",
    topic: "Employee Welfare Deductions",
    description:
      "Test your understanding of Section 29 — NPS deduction limit (raised to 14%), the fund-approval condition for PF and gratuity, the strict ITR-due-date rule for employee contributions, and the Section 29(3) bar on informal fund creation.",
    difficulty: "Medium",
    questions: [
      {
        id: "ew-01",
        question: "Under Section 29(1)(b) of the IT Act 2025, what is the maximum employer contribution to NPS that can be deducted from business income?",
        options: [
          "10% of Basic Salary + DA (same as under IT Act 1961 for private sector)",
          "12% of Basic Salary + DA",
          "Lower of: 14% of Basic Salary + DA, or actual contribution made",
          "20% of total cost-to-company (CTC) of the employee",
        ],
        correct: 2,
        explanation: "The IT Act 2025 raised the NPS employer deduction limit to 14% of (Basic + DA as per employment contract), up from 10% that applied to private-sector employers under IT Act 1961 (Section 36(1)(iva)). Government employers already had 14% — the IT Act 2025 standardised this for all employers. The deduction is the lower of 14% of Basic+DA or the actual contribution.",
        section: "Section 29(1)(b) — NPS Deduction",
      },
      {
        id: "ew-02",
        question: "An employer contributes ₹10 lakh to an unapproved gratuity fund for its employees. Is this deductible under Section 29?",
        options: [
          "Yes — all employer gratuity contributions are deductible regardless of fund status",
          "No — Section 29 requires the fund to be approved or recognised; contributions to unapproved funds are expressly disallowed",
          "Yes — but capped at 10% of total wages paid during the year",
          "No — gratuity contributions are never deductible; only the actual gratuity payment upon retirement qualifies",
        ],
        correct: 1,
        explanation: "Section 29(1)(a)/(c) explicitly requires the fund to be approved or recognised for deductibility. Unapproved provident funds, unapproved superannuation funds, and unapproved gratuity funds are all excluded. Qualifying funds include: Statutory PF, Recognised PF, Approved Superannuation Fund, and Approved Gratuity Fund. The 'actually paid' condition must also be met.",
        section: "Section 29(1)(a)/(c) — Approved Fund Condition",
      },
      {
        id: "ew-03",
        question: "An employer deducts ₹3 lakh from employees' salaries as PF contributions but fails to deposit this to the PF authority by the ITR due date. What is the tax consequence under Section 29(1)(e)?",
        options: [
          "A 10% interest penalty is charged on ₹3 lakh; the deduction is allowed after paying the penalty",
          "The ₹3 lakh is added back as the employer's taxable PGBP income under Section 2(49)(o)",
          "The deduction is deferred — it will be allowed in the next Tax Year when the deposit is made",
          "No tax consequence for the employer — only the employees face penalties",
        ],
        correct: 1,
        explanation: "Section 29(1)(e) imposes a harsh consequence for late deposit of employee contributions: the entire amount collected but not deposited by the ITR due date under Section 263(1) is deemed to be the employer's PGBP income under Section 2(49)(o). There is no grace period, no interest-and-deduction remedy, and no deferral — the full ₹3 lakh becomes immediately taxable.",
        section: "Section 29(1)(e) — Late Deposit = Employer Income",
      },
      {
        id: "ew-04",
        question: "Which of the following gratuity situations qualifies for a deduction under Section 29(1)(d)?",
        options: [
          "A general provision created at year-end for estimated future gratuity over the next 10 years",
          "Gratuity that has become legally payable because the employee completed the minimum qualifying service (liability crystallised)",
          "A provision for an employee who has been with the company for 3 years (below the 5-year minimum service threshold)",
          "Contributions to an informal internal gratuity pool not approved under any law",
        ],
        correct: 1,
        explanation: "Under Section 29(1)(d), gratuity is deductible when: (a) payment is made to an approved gratuity fund, or (b) the liability has crystallised — i.e., it became legally enforceable because the employee completed the minimum qualifying service (typically 5 years). A general un-crystallised provision or a provision for an employee below the qualifying threshold does not qualify.",
        section: "Section 29(1)(d) — Crystallised Gratuity",
      },
      {
        id: "ew-05",
        question: "An employer wants to create an informal internal employee welfare corpus and contribute ₹10 lakh. The fund has no formal approval. Is the contribution deductible?",
        options: [
          "Yes — employer welfare expenditure is always deductible as a business expense",
          "No — Section 29(3) bars deductions for contributions to any fund or trust unless specifically permitted by the IT Act or applicable law",
          "Yes — up to ₹5 lakh per year is deductible as a discretionary welfare expense",
          "No — only listed companies may create welfare funds; private companies cannot",
        ],
        correct: 1,
        explanation: "Section 29(3) is a blanket bar: no deduction is allowed for employer contributions made to set up or fund any fund, trust, or institution unless the contribution is specifically permitted under the IT Act 2025 or other applicable law. Only contributions to legally recognised structures — Statutory PF, Recognised PF, NPS, Approved Gratuity Fund — pass this filter. Informal welfare pools get no deduction.",
        section: "Section 29(3) — Bar on Fund Creation",
      },
      {
        id: "ew-06",
        question: "Under the IT Act 2025, the NPS employer contribution deduction limit for private sector employers was standardised at 14%. What was the previous limit under IT Act 1961 for private sector employers?",
        options: [
          "12% of Basic + DA",
          "10% of Basic + DA under Section 36(1)(iva)",
          "20% of total CTC",
          "There was no limit — full actual contribution was deductible",
        ],
        correct: 1,
        explanation: "Under IT Act 1961, private sector employers were capped at 10% of (Basic + DA) under Section 36(1)(iva) for NPS contributions. Government employers had a 14% limit. The IT Act 2025 removed this disparity and standardised the deduction at 14% for all employers — a meaningful upgrade for private sector companies with high NPS contribution policies.",
        section: "Section 29(1)(b) — Upgrade from 10% to 14%",
      },
    ],
    lastUpdated: "2026-08-16",
  },

  // ── Specified Business Deduction ──────────────────────────────────────────
  {
    slug: "specified-business-deduction-section-46",
    source: "detailed-explainer",
    title: "Specified Business Deduction — 100% Capital Expenditure Write-Off",
    chapter: "Business & Profession — Section 46",
    topic: "Specified Business Deduction",
    description:
      "Test your understanding of Section 46 — the 14 eligible businesses, excluded expenditures (land, goodwill, financial instruments, cash payments), the no-depreciation trade-off, 8-year lock-in, loss set-off rules, and the claw-back formula.",
    difficulty: "Hard",
    questions: [
      {
        id: "sb-01",
        question: "Section 46 allows a 100% deduction on eligible capital expenditure. Which of the following is expressly EXCLUDED from eligible expenditure?",
        options: [
          "Plant and machinery installed in a cold chain facility",
          "Construction cost of a hospital building (100+ beds)",
          "Land acquired for the hospital",
          "Electrical installation in a warehousing facility",
        ],
        correct: 2,
        explanation: "Section 46 expressly excludes four categories: (a) Land, (b) Goodwill, (c) Financial Instruments, and (d) Capital expenditure where any payment exceeds ₹10,000 in cash. Land cost is never eligible for the 100% deduction regardless of how it is used. The construction, plant, and electrical installation costs are eligible (subject to other conditions).",
        section: "Section 46 — Excluded Expenditure",
      },
      {
        id: "sb-02",
        question: "A company claimed 100% deduction under Section 46 for capital expenditure of ₹80 lakh on machinery for a cold chain facility. Can it also claim depreciation on this machinery in subsequent years?",
        options: [
          "Yes — Section 46 deduction is for the current year; depreciation reverts to normal in future years",
          "No — once Section 46 deduction is claimed, depreciation on that expenditure is permanently disallowed for the entire life of the asset",
          "Yes — but reduced to 50% depreciation from Year 2 onwards",
          "Yes — depreciation becomes available again after the 8-year lock-in period expires",
        ],
        correct: 1,
        explanation: "Section 46 deduction and depreciation are permanently mutually exclusive. Once the 100% deduction is claimed on an asset, depreciation is disallowed — not just for that year, but for every subsequent year for the entire life of that asset. This is the key trade-off: instant 100% write-off now, but zero depreciation ever after. This is a permanent restriction, not a deferral.",
        section: "Section 46 — No Depreciation After Claim",
      },
      {
        id: "sb-03",
        question: "XYZ Ltd. operates two hotels — a new 3-star hotel (specified business) with a loss of ₹75 lakh after Section 46 deduction, and an existing 4-star hotel with profits of ₹120 lakh. How is the loss treated?",
        options: [
          "The ₹75 lakh loss must be carried forward — it cannot be set off in the same year against any income",
          "The ₹75 lakh can be set off only against the 4-star hotel profits since both are specified businesses under Section 46 (Section 114)",
          "The ₹75 lakh can be set off against any business income including non-hotel PGBP",
          "The ₹75 lakh loss from the specified business first reduces salary income, then PGBP",
        ],
        correct: 1,
        explanation: "Under Section 114, a loss from a specified business can only be set off against profit from another specified business — not general PGBP or other heads. Since both hotels (new 3-star and existing 4-star) are specified businesses under Section 46, the ₹75 lakh loss can be set off against the ₹120 lakh 4-star hotel profit. The net taxable profit = ₹120L − ₹75L = ₹45L.",
        section: "Section 114 — Loss Set-Off for Specified Business",
      },
      {
        id: "sb-04",
        question: "An assessee claimed Section 46 deduction of ₹50 lakh on machinery. In Year 4 (before the 8-year lock-in expires), the machinery is diverted to a non-specified business. The notional depreciation had Section 46 not been claimed = ₹15 lakh. What amount is taxed as PGBP in Year 4?",
        options: [
          "₹50 lakh — the full Section 46 deduction is reversed",
          "₹35 lakh — deduction claimed (₹50L) minus notional depreciation (₹15L)",
          "₹15 lakh — only the notional depreciation is taxed",
          "Nil — no claw-back because at least 3 years have passed",
        ],
        correct: 1,
        explanation: "Early diversion before the 8-year lock-in triggers a partial claw-back. Taxable amount = Section 46 deduction claimed (₹50L) minus notional depreciation (₹15L) = ₹35 lakh, taxed as PGBP in Year 4. The remaining ₹35 lakh also becomes the cost of acquisition of the asset in the non-specified business going forward. The full ₹50L is NOT reversed — only the net excess.",
        section: "Section 46 — 8-Year Lock-In Claw-Back",
      },
      {
        id: "sb-05",
        question: "Which of the following is a 'specified business' eligible for Section 46 deduction?",
        options: [
          "A software development company",
          "A hospital with 80 beds in a tier-2 city (commenced in 2020)",
          "Production of fertilizers in India (commenced on or after 01-04-2011)",
          "An e-commerce retail platform",
        ],
        correct: 2,
        explanation: "Production of fertilizers in India (commencing on or after 01-04-2011) is one of the 14 specified businesses explicitly listed under Section 46. A hospital must have 100 or more beds to qualify — 80 beds falls short. Software development and e-commerce are not among the 14 specified businesses. Always verify both the business type AND the commencement date.",
        section: "Section 46 — List of Specified Businesses",
      },
      {
        id: "sb-06",
        question: "What mandatory compliance condition must be satisfied before an assessee can claim the Section 46 deduction?",
        options: [
          "Filing Form 15CA with the Income Tax portal within 30 days",
          "Obtaining prior approval from CBDT before incurring the capital expenditure",
          "Getting accounts audited under Section 63 — a mandatory audit requirement",
          "Filing Form 28 (Net Worth Certificate) with the Assessing Officer",
        ],
        correct: 2,
        explanation: "Audit under Section 63 is mandatory for claiming deduction under Section 46. Without the Section 63 audit, the deduction claim can be rejected. Form 28 is for slump sales (Section 77), not Section 46. No prior CBDT approval is required. Form 15CA is for foreign remittances. The audit ensures the capital expenditure is properly documented and conditions are verified.",
        section: "Section 46 — Mandatory Audit under Section 63",
      },
    ],
    lastUpdated: "2026-08-16",
  },

  // ── Preliminary Expenses ──────────────────────────────────────────────────
  {
    slug: "preliminary-expenses-section-44",
    source: "detailed-explainer",
    title: "Preliminary Expenses — Amortisation of Pre-Commencement Expenditure",
    chapter: "Business & Profession — Section 44",
    topic: "Preliminary Expenses",
    description:
      "Test your understanding of Section 44 — what qualifies as a preliminary expense, amortisation over 5 years, the 5% cap (cost of project vs capital employed), why share premium is excluded (Berger Paints SC ruling), and the Form 5/Form 6 compliance requirements.",
    difficulty: "Medium",
    questions: [
      {
        id: "pe-01",
        question: "Over how many years are qualifying preliminary expenses deducted under Section 44 of the IT Act 2025?",
        options: [
          "The full amount is deductible in the year of commencement of business",
          "3 equal annual instalments over 3 successive Tax Years",
          "5 equal annual instalments over 5 successive Tax Years, starting from the year of commencement",
          "10 equal annual instalments over 10 successive Tax Years",
        ],
        correct: 2,
        explanation: "Under Section 44, qualifying preliminary expenses are divided into 5 equal annual instalments and deducted over 5 successive Tax Years. The deduction starts from the Tax Year in which the business commences or the extension/new unit is completed. A ₹30 lakh qualifying deduction = ₹6 lakh per year for 5 years.",
        section: "Section 44 — 5-Year Amortisation",
      },
      {
        id: "pe-02",
        question: "Which of the following qualifies as a 'preliminary expense' under Section 44?",
        options: [
          "Salary paid to the CEO during the pre-commencement phase",
          "Land acquisition cost for the new project",
          "Preparation of a feasibility report and project report",
          "Advance tax paid before the business commences",
        ],
        correct: 2,
        explanation: "Section 44 defines preliminary expenses to include: preparation of feasibility report and project report, marketing survey, engineering survey, drafting and printing of MOA/AOA, public issue expenses, and other CBDT-notified expenses. CEO salary, land cost, and advance tax do not fall within this definition.",
        section: "Section 44 — Meaning of Preliminary Expenses",
      },
      {
        id: "pe-03",
        question: "Berger Paints India Ltd. has actual preliminary expenses of ₹42 lakh, Cost of Project ₹400 lakh, and Capital Employed ₹700 lakh (including ₹100 lakh share premium). Per the Supreme Court's ruling, what is the annual Section 44 deduction?",
        options: [
          "₹7 lakh per year (1/5 of 5% × ₹700 lakh including share premium)",
          "₹6 lakh per year (1/5 of 5% × ₹600 lakh, excluding share premium)",
          "₹8.4 lakh per year (1/5 of actual ₹42 lakh)",
          "₹4 lakh per year (1/5 of 5% × ₹400 lakh cost of project)",
        ],
        correct: 1,
        explanation: "The Supreme Court in Berger Paints India Ltd. [2017] held that share premium is NOT part of 'capital employed' for Section 44. Eligible capital employed = ₹700L − ₹100L share premium = ₹600L. Deduction ceiling = 5% of higher of (Cost of Project ₹400L, Capital Employed ₹600L) = 5% × ₹600L = ₹30L. Actual ₹42L > ₹30L → qualifying amount = ₹30L → annual instalment = ₹6L (₹30L ÷ 5).",
        section: "Section 44 — Berger Paints SC Ruling on Share Premium",
      },
      {
        id: "pe-04",
        question: "For an Indian company, what is the ceiling on deductible preliminary expenses under Section 44?",
        options: [
          "Lower of actual expenses or 5% of Cost of Project",
          "Lower of actual expenses or 5% of Capital Employed",
          "Lower of actual expenses or 5% of the higher of (Cost of Project, Capital Employed)",
          "100% of actual preliminary expenses — no cap applies to companies",
        ],
        correct: 2,
        explanation: "For an Indian company: deduction ceiling = 5% of the higher of (Cost of Project, Capital Employed). For a non-company resident assessee: ceiling = 5% of Cost of Project only (Capital Employed is not used). This is a critical distinction — companies get the benefit of choosing the higher base, non-companies are limited to cost of project.",
        section: "Section 44 — Cap for Indian Companies vs Non-Companies",
      },
      {
        id: "pe-05",
        question: "A resident individual incurs preliminary expenses of ₹8 lakh. Cost of Project = ₹100 lakh; Capital Employed = ₹150 lakh. What is the annual deduction allowable under Section 44?",
        options: [
          "₹1.5 lakh per year (1/5 of 5% × ₹150 lakh capital employed)",
          "₹1 lakh per year (1/5 of 5% × ₹100 lakh cost of project, applicable to non-companies)",
          "₹1.6 lakh per year (1/5 of actual ₹8 lakh)",
          "₹5 lakh per year (5% of ₹100 lakh in the first year only)",
        ],
        correct: 1,
        explanation: "For non-company resident assessees (individuals, firms, etc.), the cap is 5% of Cost of Project only — Capital Employed is not considered. 5% × ₹100L = ₹5L ceiling. Actual expenses ₹8L > ₹5L → qualifying deduction = ₹5L → annual instalment = ₹5L ÷ 5 = ₹1 lakh per year for 5 years. Capital Employed of ₹150L is irrelevant for non-companies.",
        section: "Section 44 — Non-Company Resident: Cost of Project Only",
      },
      {
        id: "pe-06",
        question: "In which form and by when must an assessee furnish details of preliminary expenses to claim the Section 44 deduction?",
        options: [
          "Form 6 — at the time of filing the Return of Income",
          "Form 5 — one month prior to the date of filing the Return of Income under Section 263(1)",
          "Form 28 — within 30 days of the commencement of business",
          "Form 5 — within 30 days of the end of the Tax Year",
        ],
        correct: 1,
        explanation: "The assessee must furnish details of preliminary expenses in Form 5, one month prior to the date of filing the Return of Income under Section 263(1). This is a pre-filing requirement. Form 6 is the audit report filed under Section 63 for non-company and non-cooperative society assessees. Missing the Form 5 deadline can result in disallowance of the deduction.",
        section: "Section 44 — Form 5 Compliance",
      },
    ],
    lastUpdated: "2026-08-16",
  },
];

export const DIFFICULTY_ORDER: Difficulty[] = ["Easy", "Medium", "Hard"];
