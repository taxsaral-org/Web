export type Category =
  | "Income Heads"
  | "House Property"
  | "Deductions"
  | "Tax Computation"
  | "Capital Gains"
  | "TDS"
  | "Advance Tax"
  | "Interest & Penalties"
  | "Special Income"
  | "Agricultural Income"
  | "Charitable Trusts & NPOs";

export interface Example {
  title: string;
  scenario: string;
  calculation: string;
  result: string;
}

export interface SectionEntry {
  slug: string;
  section2025: string;
  section1961: string;
  title: string;
  explanation: string;
  category: Category;
  keywords: string[];
  whoItApplies: string;
  keyPoints: string[];
  examples: Example[];
  relatedSlugs: string[];
}

export const CATEGORIES: Category[] = [
  "Income Heads",
  "House Property",
  "Deductions",
  "Tax Computation",
  "Capital Gains",
  "TDS",
  "Advance Tax",
  "Interest & Penalties",
  "Special Income",
  "Agricultural Income",
  "Charitable Trusts & NPOs",
];

export const SECTIONS: SectionEntry[] = [
  // ── Income Heads ──────────────────────────────────────────────────────────
  {
    slug: "heads-of-income",
    section2025: "Section 14",
    section1961: "Section 14",
    title: "Heads of Income",
    explanation:
      "Total income is classified under five heads: (A) Salaries, (B) Income from House Property, (C) Profits and Gains of Business or Profession, (D) Capital Gains, and (E) Income from Other Sources.",
    category: "Income Heads",
    keywords: [
      "heads of income",
      "five heads",
      "salary",
      "house property",
      "capital gains",
      "other sources",
      "PGBP",
    ],
    whoItApplies: "Every taxpayer — all income must be classified into one of these five heads.",
    keyPoints: [
      "Income cannot be taxed under more than one head — it must fall under the most specific head.",
      "Each head has its own computation rules, allowed deductions, and loss set-off restrictions.",
      "Losses from one head can generally be set off against gains from another head, with important exceptions (e.g., capital gains losses can only be set off against capital gains).",
      "After computing income under each head, all five are added to arrive at Gross Total Income.",
    ],
    examples: [
      {
        title: "Salaried employee with multiple income streams",
        scenario:
          "Priya earns a salary, has a rented flat, received dividends and FD interest, and sold mutual fund units. How is her income classified?",
        calculation:
          "Head A – Salaries: ₹15,00,000 gross salary\nHead B – House Property: ₹2,40,000 net rental income (after interest deduction)\nHead C – PGBP: Nil (no business)\nHead D – Capital Gains: ₹80,000 LTCG on equity MF units\nHead E – Other Sources: ₹50,000 (dividends ₹30K + FD interest ₹20K)\n\nGross Total Income = 15,00,000 + 2,40,000 + 80,000 + 50,000 = ₹17,70,000",
        result:
          "Each head is computed separately before they are summed. Priya can claim deductions (like standard deduction from salary) before arriving at Total Income.",
      },
    ],
    relatedSlugs: [
      "salaries-charging",
      "house-property-charging",
      "stcg-listed-equity-20",
    ],
  },
  {
    slug: "salaries-charging",
    section2025: "Section 15",
    section1961: "Section 15",
    title: "Salaries — Charging Section",
    explanation:
      "Salary income is taxable in the year it is due, paid, or whichever is earlier. Covers basic pay, dearness allowance, bonus, commission, allowances, and perquisites.",
    category: "Income Heads",
    keywords: [
      "salary",
      "wages",
      "basic pay",
      "allowances",
      "perquisites",
      "employer",
    ],
    whoItApplies:
      "All employees — both government and private sector — who receive compensation from an employer.",
    keyPoints: [
      "Tax is on the amount that is 'due' OR 'paid', whichever comes first — arrears are taxed when due.",
      "Salary from a former employer (arrears, gratuity top-ups) is still taxable under this head.",
      "Perquisites like rent-free accommodation, ESOP vesting, and company car are also salary income.",
      "Use Form 12BA (perquisite statement) and Form 16 to reconcile all salary components.",
    ],
    examples: [
      {
        title: "Delayed salary — which year is it taxable?",
        scenario:
          "Arun's company runs into a cash crunch and delays paying December 2026 salary. It is actually paid on January 15, 2027. When is it taxed?",
        calculation:
          "Taxable in the earlier of 'due' or 'paid':\n  Due date: December 31, 2026 (end of payroll month) → TY 2026-27\n  Payment date: January 15, 2027 → TY 2027-28\nEarlier = Due date (December 31, 2026)\n→ Taxable in TY 2026-27",
        result:
          "The December salary is taxable in TY 2026-27 even though it was physically received in January 2027. Arun's employer should include it in the TY 2026-27 TDS computation and Form 16.",
      },
      {
        title: "Bonus taxed in the year received, not the year earned",
        scenario:
          "Shalini's performance bonus for FY 2025-26 is approved and paid in May 2026. When is it taxed?",
        calculation:
          "Bonus becomes 'due' when the employer approves and commits to paying it.\nIf the employer's approval (and hence obligation) arises in May 2026 → TY 2026-27.",
        result:
          "The bonus is taxable in TY 2026-27 (the year it became due and was paid), not TY 2025-26. This is correct — Shalini's Form 16 for TY 2026-27 will include this bonus.",
      },
    ],
    relatedSlugs: [
      "standard-deduction-salary",
      "tds-on-salary",
      "heads-of-income",
      "hra-exemption",
    ],
  },
  {
    slug: "standard-deduction-salary",
    section2025: "Section 17",
    section1961: "Section 16(ia)",
    title: "Standard Deduction from Salary",
    explanation:
      "A flat deduction from salary income — ₹75,000 under the default regime, ₹50,000 under the optional regime. No receipts needed; applied automatically by your employer.",
    category: "Income Heads",
    keywords: [
      "standard deduction",
      "75000",
      "50000",
      "salary",
      "salaried",
    ],
    whoItApplies:
      "All salaried individuals and pensioners. Pensioners also get this deduction from pension income.",
    keyPoints: [
      "No documents, no proof required — it is a flat deduction applied automatically.",
      "Default regime: ₹75,000. Optional (old) regime: ₹50,000.",
      "Pensioners can claim standard deduction from their pension income.",
      "Cannot be claimed on perquisites or allowances — only on salary/pension.",
    ],
    examples: [
      {
        title: "Comparing standard deduction under both regimes",
        scenario:
          "Sunita earns ₹10,00,000 gross salary. How does standard deduction affect her taxable income under each regime?",
        calculation:
          "Default regime:\n  Gross salary:          ₹10,00,000\n  Standard deduction:   – ₹75,000\n  Taxable income:        ₹9,25,000\n\nOptional regime:\n  Gross salary:          ₹10,00,000\n  Standard deduction:   – ₹50,000\n  Taxable income:        ₹9,50,000 (before other deductions like 80C)",
        result:
          "Sunita saves ₹75,000 of taxable income under the default regime vs ₹50,000 under the optional regime. The default regime gives an extra ₹25,000 deduction — worth ₹2,500–₹7,500 in tax savings depending on her slab.",
      },
      {
        title: "Pensioner claiming standard deduction",
        scenario:
          "Retired Krishnamurthy receives ₹6L annual pension from his former employer. He has no other income.",
        calculation:
          "Pension income:        ₹6,00,000\nStandard deduction:  – ₹75,000 (default regime)\nTaxable income:        ₹5,25,000\n\nTax under default regime:\n  ₹0–4L: Nil\n  ₹4L–5.25L: 5% × ₹1,25,000 = ₹6,250\nTotal tax before cess: ₹6,250",
        result:
          "Without the standard deduction, taxable income would be ₹6L and tax would be ₹10,000 (5% on ₹2L). Standard deduction saves him ₹3,750 in tax.",
      },
    ],
    relatedSlugs: [
      "salaries-charging",
      "default-tax-regime-slabs",
      "tax-rebate-12-lakh",
    ],
  },
  // ── House Property ────────────────────────────────────────────────────────
  {
    slug: "house-property-charging",
    section2025: "Section 20",
    section1961: "Section 22",
    title: "House Property — Charging Section",
    explanation:
      "Income from buildings or land appurtenant to them, of which the taxpayer is the owner, is taxed under this head based on the annual value of the property.",
    category: "House Property",
    keywords: [
      "house property",
      "property income",
      "rental income",
      "owner",
      "building",
    ],
    whoItApplies:
      "Owners of residential or commercial property who receive rent or have a deemed rental income.",
    keyPoints: [
      "Only the owner is taxed — even if a co-owner receives the rent, each co-owner is taxed on their proportionate share.",
      "If you own more than 2 self-occupied properties, only 2 can have nil annual value; additional properties are taxed as let-out.",
      "Deemed rent (annual value) applies even to vacant properties (other than the ones declared self-occupied).",
      "The actual rent is not always the taxable figure — see Section 21 for how annual value is computed.",
    ],
    examples: [
      {
        title: "Owner with one rented and one self-occupied flat",
        scenario:
          "Ananya owns two flats. Flat A in Mumbai (she lives in it), Flat B in Pune (rented at ₹25,000/month). How is each taxed?",
        calculation:
          "Flat A (self-occupied):\n  Annual value = Nil (self-occupied)\n  No income, no tax\n\nFlat B (let out):\n  Gross annual value = ₹25,000 × 12 = ₹3,00,000\n  Less: Municipal taxes paid = ₹15,000\n  Net annual value (NAV) = ₹2,85,000\n  Less: 30% standard deduction (Sec 22) = ₹85,500\n  Less: Home loan interest (if any)\n  Income from House Property = ₹1,99,500 (before loan interest)",
        result:
          "Ananya pays zero tax on her self-occupied flat in Mumbai. She pays tax on ₹1,99,500 from the Pune flat (at her slab rate), reduced further by any home loan interest on that flat.",
      },
    ],
    relatedSlugs: [
      "annual-value-house-property",
      "deductions-house-property",
      "home-loan-interest-limit",
    ],
  },
  {
    slug: "annual-value-house-property",
    section2025: "Section 21",
    section1961: "Section 23",
    title: "Annual Value of House Property",
    explanation:
      "The annual value is the amount the property can reasonably be expected to fetch as annual rent. For a self-occupied property (up to 2), the annual value is nil. For let-out property, it is the higher of actual rent or expected market rent.",
    category: "House Property",
    keywords: [
      "annual value",
      "self-occupied",
      "let out",
      "nil annual value",
      "expected rent",
      "actual rent",
    ],
    whoItApplies: "All property owners — relevant for computing taxable income from house property.",
    keyPoints: [
      "Annual value = higher of (a) actual rent received/receivable, or (b) fair market rent (municipal value or standard rent, whichever is higher).",
      "If actual rent < fair market rent (e.g., property rented to family at below-market rate), you are taxed on the fair market rent anyway.",
      "Self-occupied properties (up to 2): annual value is nil regardless of market rent.",
      "Municipal taxes paid by the owner are deducted from annual value to arrive at Net Annual Value (NAV).",
    ],
    examples: [
      {
        title: "Property rented below market rate",
        scenario:
          "Suresh rents his flat to his brother at ₹8,000/month. The market rent for similar flats in the area is ₹20,000/month.",
        calculation:
          "Actual rent received: ₹8,000 × 12 = ₹96,000\nFair market rent:     ₹20,000 × 12 = ₹2,40,000\n\nAnnual value = Higher of (actual rent, market rent)\n             = ₹2,40,000\n\nNet annual value after municipal taxes (say ₹12,000):\n= ₹2,40,000 – ₹12,000 = ₹2,28,000",
        result:
          "Suresh is taxed on ₹2,28,000 (market rent basis), not on ₹96,000 (actual rent). The below-market rental to a family member does not reduce his tax.",
      },
    ],
    relatedSlugs: [
      "house-property-charging",
      "deductions-house-property",
      "home-loan-interest-limit",
    ],
  },
  {
    slug: "deductions-house-property",
    section2025: "Section 22",
    section1961: "Section 24",
    title: "Deductions from House Property Income",
    explanation:
      "Two deductions from annual value: (a) 30% standard deduction for let-out properties, and (b) interest on housing loan — up to ₹2 lakh for self-occupied; no cap for let-out.",
    category: "House Property",
    keywords: [
      "30% deduction",
      "home loan interest",
      "housing loan",
      "deduction from HP",
      "self-occupied interest",
    ],
    whoItApplies:
      "Property owners — the 30% deduction applies only to let-out properties, not self-occupied ones.",
    keyPoints: [
      "The 30% deduction is automatic — no receipts for repairs or maintenance needed.",
      "30% is applied on Net Annual Value (after municipal taxes), not on gross rent.",
      "Home loan interest for let-out property: fully deductible with no cap (subject to set-off limits).",
      "Total loss from house property that can be set off against other income is capped at ₹2,00,000 per year (excess carried forward for 8 years).",
    ],
    examples: [
      {
        title: "Let-out flat with home loan",
        scenario:
          "Reena's rented flat has NAV of ₹3,00,000 (after municipal taxes). She pays ₹2,40,000 per year in home loan interest on this property.",
        calculation:
          "Net Annual Value (NAV):       ₹3,00,000\nLess: 30% standard deduction: – ₹90,000\nLess: Home loan interest:      – ₹2,40,000\nIncome from House Property:    – ₹30,000 (a loss)\n\nThis ₹30,000 loss can be set off against her salary income.",
        result:
          "Reena has a ₹30,000 house property loss, which reduces her total taxable income. If the interest were higher (say ₹3,50,000), the loss would be ₹1,40,000 — still within the ₹2L set-off cap.",
      },
    ],
    relatedSlugs: [
      "home-loan-interest-limit",
      "annual-value-house-property",
      "house-property-charging",
    ],
  },
  {
    slug: "home-loan-interest-limit",
    section2025: "Section 71",
    section1961: "Section 24(b)",
    title: "Home Loan Interest — Deduction Limit",
    explanation:
      "Interest on housing loan is deductible — capped at ₹2,00,000 for self-occupied property; unlimited for let-out property (subject to the ₹2L overall loss set-off cap).",
    category: "House Property",
    keywords: [
      "home loan interest",
      "housing loan",
      "24b",
      "2 lakh",
      "self-occupied",
      "let out",
      "interest on loan",
    ],
    whoItApplies:
      "Anyone who has taken a home loan for purchase, construction, repair, or renovation of a house property.",
    keyPoints: [
      "For self-occupied property: maximum ₹2,00,000 deduction per year regardless of actual interest paid.",
      "Pre-construction interest: deductible in 5 equal instalments from the year construction is completed.",
      "The ₹2L cap applies to the aggregate across all self-occupied properties — not ₹2L each.",
      "Under the default (new) regime, this deduction is NOT available for self-occupied property.",
    ],
    examples: [
      {
        title: "Self-occupied home loan — cap in action",
        scenario:
          "Vikram bought a flat worth ₹80L with a ₹60L loan at 9% interest. Annual interest in TY 2026-27 = ₹5,20,000. He lives in the flat (self-occupied). He uses the optional regime.",
        calculation:
          "Annual interest paid:       ₹5,20,000\nMaximum deduction allowed: ₹2,00,000 (self-occupied cap)\nDeduction claimed:         ₹2,00,000\n\nHouse property income:\n  Annual value (self-occupied): Nil\n  Less: Home loan interest:     – ₹2,00,000\n  Income from HP:               – ₹2,00,000 (loss)\n\nThis ₹2L loss is set off against Vikram's salary income.",
        result:
          "Vikram can only deduct ₹2L even though he paid ₹5.2L in interest. The remaining ₹3.2L is lost (not carried forward for self-occupied property). This is why the optional regime still appeals to high-loan borrowers.",
      },
      {
        title: "Let-out property — full interest deductible",
        scenario:
          "Same flat but now rented at ₹25,000/month. NAV = ₹2,85,000. Loan interest = ₹5,20,000.",
        calculation:
          "NAV:                        ₹2,85,000\nLess: 30% standard deduction: – ₹85,500\nLess: Home loan interest:      – ₹5,20,000\nHouse property income:         – ₹3,20,500 (loss)\n\nSet-off against salary: only ₹2,00,000 can be set off this year.\nBalance ₹1,20,500 carried forward for up to 8 years.",
        result:
          "For let-out property there is no ₹2L cap on interest, but total house property loss that can be set off against other income is capped at ₹2L per year. The excess is carried forward.",
      },
    ],
    relatedSlugs: [
      "deductions-house-property",
      "annual-value-house-property",
      "house-property-charging",
    ],
  },

  // ── Deductions ────────────────────────────────────────────────────────────
  {
    slug: "investments-insurance-80c",
    section2025: "Section 123",
    section1961: "Section 80C",
    title: "Investments & Insurance Premium (₹1.5L limit)",
    explanation:
      "Deduction up to ₹1,50,000 for specified investments: EPF, PPF, ELSS, Life Insurance premiums, home loan principal, NSC, Sukanya Samriddhi, 5-year tax-saving FD, and tuition fees. Only under the optional regime.",
    category: "Deductions",
    keywords: [
      "80C",
      "PPF",
      "EPF",
      "ELSS",
      "LIC",
      "mutual fund",
      "tax saving",
      "1.5 lakh",
      "150000",
      "NSC",
      "investment",
      "deduction",
    ],
    whoItApplies:
      "Salaried individuals and self-employed persons using the optional (old) tax regime.",
    keyPoints: [
      "₹1,50,000 is the combined cap — all qualifying investments together cannot exceed this.",
      "EPF (employee contribution) counts automatically — if your EPF contribution exceeds ₹1.5L, the rest does not give extra benefit.",
      "ELSS mutual funds have a 3-year lock-in — shortest among all Section 123 instruments.",
      "This deduction is NOT available under the default (new) tax regime.",
    ],
    examples: [
      {
        title: "Maximising the ₹1.5L limit",
        scenario:
          "Sanjay earns ₹12L salary. His EPF (employee share) = ₹72,000. He also pays ₹60,000 LIC premium and ₹40,000 into PPF. He uses the optional regime.",
        calculation:
          "EPF employee contribution: ₹72,000\nLIC premium:               ₹60,000\nPPF contribution:          ₹40,000\nTotal eligible:            ₹1,72,000\n\nCap under Section 123:     ₹1,50,000\nDeduction allowed:         ₹1,50,000 (excess ₹22,000 gives no benefit)\n\nTax saving (30% slab):\n  ₹1,50,000 × 30% = ₹45,000\n  Plus 4% cess: ₹45,000 × 1.04 ≈ ₹46,800 saved",
        result:
          "Sanjay saves ₹46,800 in tax by utilising the full ₹1.5L deduction. The ₹22,000 excess investment (PPF) has no additional tax benefit but still builds his wealth.",
      },
      {
        title: "ELSS vs PPF — same tax benefit, different lock-in",
        scenario:
          "Radha wants to invest ₹50,000 purely for Section 123 benefit. Should she choose ELSS or PPF?",
        calculation:
          "ELSS: Lock-in = 3 years, Market returns (historical 12-15% p.a.), Returns taxable as LTCG above ₹1.25L\nPPF: Lock-in = 15 years, Fixed ~7.1% p.a., Returns fully tax-free\n\nBoth give same Section 123 deduction: ₹50,000 × 30% = ₹15,000 tax saving",
        result:
          "The Section 123 tax saving is identical for both. Choose based on risk appetite and liquidity needs: ELSS for wealth creation with shorter lock-in, PPF for guaranteed returns and complete tax-free maturity.",
      },
    ],
    relatedSlugs: [
      "nps-additional-contribution",
      "health-insurance-premium",
      "default-tax-regime-slabs",
      "tax-rebate-12-lakh",
    ],
  },
  {
    slug: "nps-additional-contribution",
    section2025: "Section 127",
    section1961: "Section 80CCD(1B)",
    title: "Additional NPS Contribution (₹50,000)",
    explanation:
      "An additional deduction of up to ₹50,000 for voluntary contributions to NPS Tier-I account, over and above the ₹1.5L limit under Section 123. Only under the optional regime.",
    category: "Deductions",
    keywords: [
      "NPS",
      "national pension",
      "80CCD",
      "50000",
      "additional deduction",
      "pension",
    ],
    whoItApplies:
      "Individuals in the optional regime who want to save additional tax and build a retirement corpus through NPS.",
    keyPoints: [
      "This ₹50,000 is SEPARATE from the ₹1.5L cap of Section 123 — you get a total of ₹2L in deductions if you max both.",
      "Only NPS Tier-I contributions qualify — Tier-II is a flexible savings account and not eligible.",
      "NPS withdrawals at maturity are partially taxable: 60% is tax-free, 40% must be invested in an annuity.",
      "Employer's NPS contribution on your behalf (up to 10% of salary) is separately deductible under a different provision.",
    ],
    examples: [
      {
        title: "Stacking Section 123 + Section 127 for maximum benefit",
        scenario:
          "Preethi earns ₹20L salary and is in the 30% slab. She maxes out Section 123 (₹1.5L) and also contributes ₹50,000 to NPS Tier-I voluntarily.",
        calculation:
          "Section 123 deduction:  ₹1,50,000\nSection 127 deduction:  ₹50,000\nTotal deductions:       ₹2,00,000\n\nTax saved at 30% slab:\n  ₹2,00,000 × 30% = ₹60,000\n  Add 4% cess: ₹60,000 × 1.04 = ₹62,400 total tax saved",
        result:
          "Preethi saves ₹62,400 in taxes by investing ₹2L across Section 123 instruments and NPS. The NPS also builds a retirement corpus she cannot touch prematurely — ensuring disciplined retirement savings.",
      },
    ],
    relatedSlugs: [
      "investments-insurance-80c",
      "health-insurance-premium",
      "default-tax-regime-slabs",
    ],
  },
  {
    slug: "pension-fund-premium",
    section2025: "Section 128",
    section1961: "Section 80CCC",
    title: "Pension Fund Premium",
    explanation:
      "Deduction for premium paid toward any annuity plan of LIC or other insurer for receiving pension. The deduction is included within the overall ₹1.5L limit of Section 123.",
    category: "Deductions",
    keywords: [
      "pension fund",
      "annuity",
      "LIC",
      "80CCC",
      "pension premium",
    ],
    whoItApplies:
      "Individuals who pay premiums for pension/annuity plans from LIC or other approved insurers.",
    keyPoints: [
      "This deduction counts within the ₹1.5L limit of Section 123 — it does not give an extra ₹1.5L.",
      "Pension received from such annuity plans is taxable as salary in the year of receipt.",
      "Surrender of the policy or maturity amount is taxable — only the pension annuity itself is the intended outcome.",
      "Not available under the default (new) regime.",
    ],
    examples: [
      {
        title: "LIC pension plan premium contributing to ₹1.5L limit",
        scenario:
          "Sunder pays ₹60,000/year premium for an LIC Jeevan Shanti pension plan. He also contributes ₹1,10,000 to EPF.",
        calculation:
          "EPF contribution:       ₹1,10,000\nLIC pension premium:    ₹60,000\nTotal eligible:         ₹1,70,000\n\nCap under Section 123: ₹1,50,000\nDeduction allowed:     ₹1,50,000\n\n(Section 128 premium is absorbed within the same ₹1.5L limit — no additional benefit)",
        result:
          "Sunder gets ₹1.5L deduction, not ₹2.1L. His LIC pension plan is counted toward the 80C bucket, not separately. He should verify whether redirecting the LIC premium to Section 127 (NPS — which gives a separate ₹50,000) would be more tax efficient.",
      },
    ],
    relatedSlugs: [
      "investments-insurance-80c",
      "nps-additional-contribution",
    ],
  },
  {
    slug: "health-insurance-premium",
    section2025: "Section 130",
    section1961: "Section 80D",
    title: "Health Insurance Premium",
    explanation:
      "Deduction for medical insurance premium for self, spouse, children (₹25,000) and separately for parents (₹25,000; ₹50,000 if parents are senior citizens). Maximum combined ₹75,000.",
    category: "Deductions",
    keywords: [
      "health insurance",
      "medical insurance",
      "80D",
      "25000",
      "50000",
      "senior citizen",
      "parents",
      "mediclaim",
    ],
    whoItApplies:
      "Anyone who pays health insurance premiums for themselves, their family, or their parents under the optional regime.",
    keyPoints: [
      "Two separate pools: self + family (up to ₹25,000) and parents (up to ₹25,000 or ₹50,000 for seniors).",
      "If you are a senior citizen yourself, your own-insurance limit rises to ₹50,000.",
      "Preventive health check-up costs (up to ₹5,000) are included within the above limits — not additional.",
      "Premium must be paid by any mode other than cash to claim the deduction.",
    ],
    examples: [
      {
        title: "Family policy + senior citizen parents policy",
        scenario:
          "Kavya (aged 38) pays ₹22,000 for a family floater (covering herself, husband, and kids) and ₹45,000 for a policy covering her parents (both aged 65+).",
        calculation:
          "Self + family premium: ₹22,000 (limit ₹25,000) → ₹22,000 claimed\nParents premium: ₹45,000 (limit ₹50,000 for senior citizen parents) → ₹45,000 claimed\n\nTotal deduction: ₹22,000 + ₹45,000 = ₹67,000\n\nTax saved at 20% slab:\n  ₹67,000 × 20% = ₹13,400\n  Plus cess: ₹13,400 × 1.04 ≈ ₹13,936",
        result:
          "Kavya saves nearly ₹14,000 in tax. If she increased her family premium to ₹25,000 (the maximum), she would get the full ₹25,000 + ₹45,000 = ₹70,000 deduction — saving even more.",
      },
      {
        title: "Self aged 60+ with no parents",
        scenario:
          "Retired Nalini (aged 62) pays ₹48,000 for her own health insurance. She has no parents to cover.",
        calculation:
          "Nalini is a senior citizen — her own-coverage limit is ₹50,000\nPremium paid: ₹48,000 ≤ ₹50,000\nDeduction: ₹48,000\n\nParents pool: not applicable\n\nTax saved at 5% slab: ₹48,000 × 5% = ₹2,400",
        result:
          "Nalini claims ₹48,000 deduction. Her being a senior citizen doubles the limit from ₹25,000 to ₹50,000 for her own health coverage.",
      },
    ],
    relatedSlugs: [
      "investments-insurance-80c",
      "senior-citizen-deposit-interest",
      "default-tax-regime-slabs",
    ],
  },
  {
    slug: "education-loan-interest",
    section2025: "Section 133",
    section1961: "Section 80E",
    title: "Education Loan Interest",
    explanation:
      "Full deduction of interest paid on education loan for higher education in India or abroad. Available for 8 years (year repayment starts + 7 following years). No cap on amount — only interest qualifies, not principal.",
    category: "Deductions",
    keywords: [
      "education loan",
      "student loan",
      "80E",
      "higher education",
      "interest",
      "8 years",
    ],
    whoItApplies:
      "The individual who took the education loan — either the student themselves or a parent/spouse who borrowed for the student's education.",
    keyPoints: [
      "No upper limit on the deduction — 100% of interest paid is deductible.",
      "Time-limited: only for 8 consecutive years starting from the year you begin repayment.",
      "Applies to courses in India and abroad — graduation, post-graduation, vocational courses.",
      "The loan must be from a bank, financial institution, or approved charitable institution — not from family or friends.",
    ],
    examples: [
      {
        title: "MBA abroad with high interest deduction",
        scenario:
          "Anand took a ₹30L education loan for his MBA in the UK. Repayment started in TY 2025-26. In TY 2026-27 (year 2 of repayment), he paid ₹2,80,000 in interest and ₹1,20,000 in principal.",
        calculation:
          "Interest component: ₹2,80,000 → Fully deductible under Section 133\nPrincipal component: ₹1,20,000 → NOT deductible\n\nDeduction in TY 2026-27: ₹2,80,000\n\nTax saved at 30% slab:\n  ₹2,80,000 × 30% = ₹84,000\n  Plus cess: ₹84,000 × 1.04 ≈ ₹87,360",
        result:
          "Anand saves ₹87,360 in tax purely from his education loan interest — with no cap. He can continue claiming this deduction for 6 more years (TY 2027-28 through 2032-33).",
      },
    ],
    relatedSlugs: [
      "investments-insurance-80c",
      "rent-paid-no-hra",
    ],
  },
  {
    slug: "rent-paid-no-hra",
    section2025: "Section 134",
    section1961: "Section 80GG",
    title: "Rent Paid (No HRA received)",
    explanation:
      "Deduction for rent paid when you do not receive HRA from your employer. Limited to the least of: ₹5,000/month, 25% of total income, or actual rent minus 10% of total income.",
    category: "Deductions",
    keywords: [
      "rent paid",
      "80GG",
      "no HRA",
      "self-employed",
      "rent deduction",
      "5000 per month",
    ],
    whoItApplies:
      "Self-employed individuals, freelancers, or salaried people who do not receive HRA as part of their salary.",
    keyPoints: [
      "You must not own any residential property at the place where you live or work.",
      "Maximum deduction: lowest of three limits — ₹5,000/month (₹60,000/year), 25% of total income, or actual rent minus 10% of total income.",
      "You cannot claim both Section 134 and HRA exemption (Schedule III) simultaneously.",
      "Not available under the default regime.",
    ],
    examples: [
      {
        title: "Freelancer claiming rent deduction",
        scenario:
          "Ritu is a freelance consultant with total income of ₹8L. She pays ₹12,000/month rent and does not own any property.",
        calculation:
          "Limit 1: ₹5,000/month × 12 = ₹60,000/year\nLimit 2: 25% of total income = 25% × ₹8,00,000 = ₹2,00,000\nLimit 3: Actual rent – 10% of income = ₹1,44,000 – ₹80,000 = ₹64,000\n\nDeduction = Lowest of the three = ₹60,000",
        result:
          "Ritu can deduct ₹60,000 (₹5,000/month limit is the binding constraint). Tax saved at 10% slab: ₹6,000. Despite paying ₹1.44L in rent, only ₹60K qualifies — this section is modest compared to HRA exemption.",
      },
    ],
    relatedSlugs: [
      "hra-exemption",
      "investments-insurance-80c",
    ],
  },
  {
    slug: "savings-account-interest",
    section2025: "Section 149",
    section1961: "Section 80TTA",
    title: "Savings Account Interest (₹10,000)",
    explanation:
      "Deduction up to ₹10,000 on interest earned from savings bank accounts with banks, co-operative societies, and post offices. Not for FDs. Not available to senior citizens (use Section 150 instead).",
    category: "Deductions",
    keywords: [
      "savings account interest",
      "80TTA",
      "10000",
      "bank interest",
      "savings interest",
    ],
    whoItApplies:
      "Non-senior-citizen taxpayers who earn savings account interest and use the optional regime.",
    keyPoints: [
      "Only savings account interest qualifies — FD, RD, and other deposit interest do NOT.",
      "Deduction is up to ₹10,000 — even if your savings interest is ₹25,000, only ₹10,000 is deducted.",
      "Senior citizens (60+) should use Section 150 instead — it covers all deposits and gives up to ₹50,000.",
      "Not available under the default (new) regime.",
    ],
    examples: [
      {
        title: "Savings interest just over the limit",
        scenario:
          "Aryan has ₹15,000 savings bank interest and ₹45,000 FD interest in TY 2026-27. He is in the 10% slab and uses the optional regime.",
        calculation:
          "Savings interest: ₹15,000 → deduction capped at ₹10,000\nFD interest: ₹45,000 → NOT covered by Section 149, fully taxable\n\nDeduction under Section 149: ₹10,000\nTaxable interest income:\n  Savings: ₹15,000 – ₹10,000 = ₹5,000\n  FD: ₹45,000\n  Total taxable: ₹50,000\n\nTax at 10%: ₹5,000",
        result:
          "Aryan saves ₹1,000 in tax (₹10,000 × 10%) from Section 149. His FD interest remains fully taxable. Senior citizens are better served by Section 150 which covers FD interest too.",
      },
    ],
    relatedSlugs: [
      "senior-citizen-deposit-interest",
      "investments-insurance-80c",
    ],
  },
  {
    slug: "senior-citizen-deposit-interest",
    section2025: "Section 150",
    section1961: "Section 80TTB",
    title: "Senior Citizen Deposit Interest (₹50,000)",
    explanation:
      "For taxpayers aged 60+, deduction up to ₹50,000 on interest from all deposits — savings accounts, FDs, and RDs — with banks and post offices. Replaces Section 149 for senior citizens.",
    category: "Deductions",
    keywords: [
      "senior citizen",
      "80TTB",
      "50000",
      "FD interest",
      "deposit interest",
      "60 years",
    ],
    whoItApplies:
      "Resident individuals aged 60 years or above using the optional tax regime.",
    keyPoints: [
      "Covers ALL bank deposits — savings, FD, RD — unlike Section 149 which is savings-only.",
      "Maximum deduction ₹50,000 per year regardless of actual interest earned.",
      "Senior citizens cannot claim Section 149 — Section 150 replaces it entirely.",
      "Post office savings deposits also qualify. This gives significant relief to retirees living on FD income.",
    ],
    examples: [
      {
        title: "Retired couple maximising deposit interest deduction",
        scenario:
          "Retired couple (both aged 68) have FDs totalling ₹50L earning ₹3.5L in annual interest. They file separately.",
        calculation:
          "Per taxpayer deduction limit: ₹50,000\n\nHusband:\n  FD interest income: ₹1,75,000 (50% of joint FD)\n  Section 150 deduction: ₹50,000\n  Taxable interest: ₹1,25,000\n\nWife (same structure):\n  FD interest income: ₹1,75,000\n  Section 150 deduction: ₹50,000\n  Taxable interest: ₹1,25,000\n\nTax on ₹1,25,000 at 5% slab (after ₹4L nil slab): Nil (income below ₹4L threshold for each)",
        result:
          "By splitting FDs between husband and wife and each claiming ₹50,000 deduction, the couple eliminates their interest income tax entirely (both have total income ≤ ₹4L nil slab). Strategic joint deposit allocation is a key retirement tax planning tool.",
      },
    ],
    relatedSlugs: [
      "savings-account-interest",
      "advance-tax-instalments",
      "senior-citizen-advance-tax-exempt",
      "health-insurance-premium",
    ],
  },

  // ── Tax Computation ───────────────────────────────────────────────────────
  {
    slug: "default-tax-regime-slabs",
    section2025: "Section 202",
    section1961: "Section 115BAC",
    title: "Default Tax Regime — Slabs",
    explanation:
      "The default tax regime applies automatically. Slabs: Nil up to ₹4L; 5% (₹4L–8L); 10% (₹8L–12L); 15% (₹12L–16L); 20% (₹16L–20L); 25% (₹20L–24L); 30% above ₹24L. Standard deduction ₹75,000. Zero tax if income ≤ ₹12L.",
    category: "Tax Computation",
    keywords: [
      "default regime",
      "new regime",
      "slabs",
      "tax rates",
      "115BAC",
      "4 lakh",
      "12 lakh",
      "rebate",
    ],
    whoItApplies:
      "All individuals — it is the default unless you actively opt for the optional (old) regime.",
    keyPoints: [
      "Default regime: no major deductions (no 80C, 80D, HRA) but lower slab rates and higher standard deduction (₹75,000).",
      "Tax is computed on the remaining income after the standard deduction and any allowed deductions.",
      "4% Health & Education Cess is added on the final tax amount.",
      "Surcharge applies if total income exceeds ₹50L — additional 10%, 15%, 25%, or 37% depending on income level.",
    ],
    examples: [
      {
        title: "Salaried employee earning ₹18 lakh",
        scenario:
          "Rahul earns ₹18,00,000 gross salary under the default regime. He has no other income.",
        calculation:
          "Gross salary:            ₹18,00,000\nStandard deduction:     – ₹75,000\nTotal income:            ₹17,25,000\n\nSlab-wise tax:\n  ₹0–4L      → Nil\n  ₹4L–8L     → 5% × ₹4,00,000 = ₹20,000\n  ₹8L–12L    → 10% × ₹4,00,000 = ₹40,000\n  ₹12L–16L   → 15% × ₹4,00,000 = ₹60,000\n  ₹16L–17.25L → 20% × ₹1,25,000 = ₹25,000\nTotal tax:               ₹1,45,000\nAdd 4% cess:             ₹5,800\nFinal tax:               ₹1,50,800",
        result:
          "Rahul pays ₹1,50,800 in tax — an effective rate of ~8.4% on gross salary. If he had opted for the optional regime (with 80C investments etc.), his deductions could lower this further.",
      },
      {
        title: "Income just at the ₹12L rebate cliff",
        scenario:
          "Compare a person earning ₹12L vs ₹12,00,001 (just ₹1 above ₹12L) under the default regime.",
        calculation:
          "At ₹12,00,000 (after standard deduction from salary of ₹12.75L):\n  Tax on ₹12L = 0 + 20K + 40K + 0 = ₹60,000\n  Rebate under Section 156: – ₹60,000\n  Net tax: ₹0\n\nAt ₹12,00,001 (just ₹1 above ₹12L):\n  Tax: ₹60,000 + negligible\n  No rebate (income > ₹12L)\n  Add 4% cess: ₹60,000 × 1.04 = ₹62,400\n  Net tax: ₹62,400",
        result:
          "Earning ₹1 more than ₹12L costs you ₹62,400 in tax — the famous 'cliff effect'. This is why structuring income to stay at or below ₹12L is crucial for salaried employees near this range.",
      },
    ],
    relatedSlugs: [
      "tax-rebate-12-lakh",
      "standard-deduction-salary",
      "investments-insurance-80c",
      "interest-advance-tax-default",
    ],
  },
  {
    slug: "tax-rebate-12-lakh",
    section2025: "Section 156",
    section1961: "Section 87A",
    title: "Tax Rebate — Zero Tax up to ₹12 Lakh",
    explanation:
      "Under the default regime, if total income does not exceed ₹12,00,000, a rebate equal to the full tax liability is allowed — resulting in zero tax. Applies to resident individuals only.",
    category: "Tax Computation",
    keywords: [
      "rebate",
      "87A",
      "zero tax",
      "12 lakh",
      "12 lakhs",
      "nil tax",
      "tax free income",
    ],
    whoItApplies:
      "Resident individuals under the default regime whose total income (after all deductions) is ₹12L or below.",
    keyPoints: [
      "The ₹12L threshold is on 'total income' — gross salary minus standard deduction, not gross salary.",
      "Above ₹12L, there is NO rebate — the full tax applies on the entire income.",
      "Gross salary of ₹12,75,000 – ₹75,000 standard deduction = ₹12,00,000 → zero tax.",
      "Special rate incomes (STCG, LTCG on equity) may not benefit from this rebate — they are taxed separately.",
    ],
    examples: [
      {
        title: "Exactly at the ₹12L threshold",
        scenario:
          "Neha earns ₹12,75,000 gross salary. After standard deduction of ₹75,000, her total income is exactly ₹12,00,000.",
        calculation:
          "Gross salary:        ₹12,75,000\nStandard deduction: – ₹75,000\nTotal income:        ₹12,00,000\n\nTax computation:\n  ₹0–4L:  Nil\n  ₹4L–8L: 5% × ₹4L = ₹20,000\n  ₹8L–12L: 10% × ₹4L = ₹40,000\n  Total tax:           ₹60,000\n\nSection 156 rebate: – ₹60,000\nFinal tax payable:   ₹0",
        result:
          "Neha pays zero income tax on ₹12.75L gross salary. This is the maximum salary at which the rebate gives complete zero-tax benefit under the default regime.",
      },
      {
        title: "Planning salary components to stay under ₹12L",
        scenario:
          "Vivek's CTC is ₹13.5L. His HR offers to restructure: ₹12,75,000 salary + ₹75,000 non-taxable components (mobile reimbursement, meal vouchers). Should he take it?",
        calculation:
          "Option A — No restructuring:\n  Total income: ₹13,50,000 – ₹75,000 SD = ₹12,75,000\n  Tax: ₹60,000 (0–12L) + 15% × ₹75,000 = ₹60,000 + ₹11,250 = ₹71,250\n  Plus cess: ₹74,100\n\nOption B — With restructuring:\n  Taxable salary: ₹12,75,000; non-taxable: ₹75,000\n  Total income after SD: ₹12,00,000\n  Rebate applies → ₹0 tax\n  Savings: ₹74,100",
        result:
          "Vivek saves ₹74,100 by restructuring his CTC to bring taxable income to ₹12L. The ₹75,000 in non-taxable components is worth ₹74,100 in tax savings — making them effectively cash-equivalent.",
      },
    ],
    relatedSlugs: [
      "default-tax-regime-slabs",
      "standard-deduction-salary",
      "advance-tax-instalments",
    ],
  },

  // ── Capital Gains ─────────────────────────────────────────────────────────
  {
    slug: "stcg-listed-equity-20",
    section2025: "Section 196",
    section1961: "Section 111A",
    title: "STCG on Listed Equity (STT paid) — 20%",
    explanation:
      "Short-term capital gains on listed equity shares or equity-oriented MF units where STT has been paid are taxed at 20%. Gains are short-term if the asset is held for 12 months or less.",
    category: "Capital Gains",
    keywords: [
      "STCG",
      "short term capital gains",
      "equity",
      "shares",
      "mutual fund",
      "111A",
      "20%",
      "STT",
    ],
    whoItApplies:
      "Investors who sell listed shares or equity mutual funds held for 12 months or less.",
    keyPoints: [
      "Holding period: ≤ 12 months → short-term; > 12 months → long-term (taxed under Section 198).",
      "STCG rate of 20% is FLAT — not the slab rate — regardless of your income level.",
      "STT (Securities Transaction Tax) must have been paid — OTC unlisted share sales do not qualify.",
      "Short-term capital losses can be set off against STCG or LTCG but not against salary/other income.",
    ],
    examples: [
      {
        title: "Quick trade on listed shares",
        scenario:
          "Nisha buys 100 shares of TCS at ₹3,500 each in September 2026 and sells in February 2027 at ₹4,200 each. Holding period = ~5 months (STT paid on exchange).",
        calculation:
          "Purchase: 100 × ₹3,500 = ₹3,50,000\nSale: 100 × ₹4,200 = ₹4,20,000\nSTCG = ₹4,20,000 – ₹3,50,000 = ₹70,000\n\nTax: ₹70,000 × 20% = ₹14,000\nAdd 4% cess: ₹14,560\n\n(No threshold exemption for STCG unlike LTCG)",
        result:
          "Nisha pays ₹14,560 tax on her ₹70,000 short-term gain. If she had waited 7 more months to cross 12 months, the gains would have been LTCG taxed at 12.5% with ₹1.25L exemption — potentially zero tax.",
      },
    ],
    relatedSlugs: [
      "ltcg-listed-equity-12-5",
      "ltcg-assets-12-5",
      "heads-of-income",
    ],
  },
  {
    slug: "ltcg-assets-12-5",
    section2025: "Section 197",
    section1961: "Section 112",
    title: "LTCG on Assets (General) — 12.5%",
    explanation:
      "Long-term capital gains on sale of assets (other than listed equity) are taxed at 12.5% without indexation. Covers unlisted shares, property, gold, and debt mutual funds held for 24+ months (36+ for immovable property).",
    category: "Capital Gains",
    keywords: [
      "LTCG",
      "long term capital gains",
      "property",
      "gold",
      "unlisted",
      "debt fund",
      "112",
      "12.5%",
    ],
    whoItApplies:
      "Individuals who sell property, gold, debt mutual funds, or unlisted shares after the required holding period.",
    keyPoints: [
      "Holding periods: Property — 24 months (changed from 36 months in 2024 Budget, verify current rules); Gold/jewellery — 24 months; Debt MFs — 24 months.",
      "Indexation benefit was removed from July 2024 — cost of acquisition is taken as-is, no inflation adjustment.",
      "No threshold exemption like LTCG on equity (Section 198's ₹1.25L). Full gain is taxable at 12.5%.",
      "LTCG from property sale can be reinvested in another property (Section 54) or specified bonds to claim exemption.",
    ],
    examples: [
      {
        title: "Sale of a flat bought 3 years ago",
        scenario:
          "Suresh bought a flat in Bangalore in 2022 for ₹60L. He sells it in 2026 for ₹90L after living in it. Brokerage and registration fees: ₹2L.",
        calculation:
          "Sale consideration:     ₹90,00,000\nLess: Transfer costs:  – ₹2,00,000\nNet sale consideration: ₹88,00,000\n\nCost of acquisition:    ₹60,00,000\n(No indexation benefit post 2024)\n\nLTCG = ₹88,00,000 – ₹60,00,000 = ₹28,00,000\n\nTax at 12.5%: ₹28,00,000 × 12.5% = ₹3,50,000\nAdd 4% cess: ₹3,64,000",
        result:
          "Suresh pays ₹3,64,000 in tax on his property sale profit. He can avoid this entirely by reinvesting the ₹28L LTCG into another residential property (Section 54) within 2 years, or into specified bonds within 6 months.",
      },
      {
        title: "Sale of inherited gold jewellery",
        scenario:
          "Anita inherited gold jewellery (valued at ₹3L at time of inheritance in 2018) and sells it for ₹8L in 2026. Held for 8 years — long-term.",
        calculation:
          "Sale price:                ₹8,00,000\nCost (inheritor's cost      \n= previous owner's cost):  ₹3,00,000\nLTCG:                      ₹5,00,000\n\nTax: ₹5,00,000 × 12.5% = ₹62,500\nAdd cess: ₹65,000",
        result:
          "Anita pays ₹65,000 on the gold sale. For inherited assets, the cost to the original purchaser (not the market value at inheritance) is used as the base cost — which can sometimes be very low for old gold.",
      },
    ],
    relatedSlugs: [
      "ltcg-listed-equity-12-5",
      "stcg-listed-equity-20",
      "heads-of-income",
    ],
  },
  {
    slug: "ltcg-listed-equity-12-5",
    section2025: "Section 198",
    section1961: "Section 112A",
    title: "LTCG on Listed Equity (STT paid) — 12.5% above ₹1.25L",
    explanation:
      "Long-term capital gains on listed equity shares or equity MF units (with STT) are taxed at 12.5%. The first ₹1,25,000 of such gains per year is exempt. Must be held for more than 12 months.",
    category: "Capital Gains",
    keywords: [
      "LTCG",
      "long term",
      "equity",
      "shares",
      "mutual fund",
      "112A",
      "12.5%",
      "1.25 lakh",
      "125000",
      "STT",
      "listed",
    ],
    whoItApplies:
      "Long-term investors in listed equity shares and equity-oriented mutual funds.",
    keyPoints: [
      "The ₹1,25,000 exemption is per year per person — families can multiply this by holding in different names.",
      "Gains above ₹1,25,000 are taxed at 12.5% — much lower than the 20% STCG rate.",
      "Grandfathering: shares held before January 31, 2018 use the higher of actual cost or price on that date as base cost.",
      "Planning tip: 'Harvesting' LTCG up to ₹1.25L/year (selling and re-buying) resets cost base at zero tax.",
    ],
    examples: [
      {
        title: "Long-term equity mutual fund redemption",
        scenario:
          "Priya bought ₹1,00,000 of an equity mutual fund in 2023. She redeems it in 2026 for ₹3,00,000 after holding for 36 months.",
        calculation:
          "Purchase price: ₹1,00,000\nRedemption:     ₹3,00,000\nLTCG:           ₹2,00,000\n\nExempt LTCG: ₹1,25,000 (threshold per year)\nTaxable LTCG: ₹2,00,000 – ₹1,25,000 = ₹75,000\n\nTax: ₹75,000 × 12.5% = ₹9,375\nAdd 4% cess: ₹9,750",
        result:
          "Priya pays only ₹9,750 tax on a ₹2L profit. If she had redeemed just enough (₹2.25L) to limit LTCG to ₹1.25L, she would pay zero tax. She can 'harvest' the ₹1.25L each year by redeeming and reinvesting.",
      },
      {
        title: "LTCG tax harvesting — zero tax strategy",
        scenario:
          "Arun has an equity portfolio worth ₹30L with accumulated gains of ₹12L. He wants to reduce future LTCG liability systematically.",
        calculation:
          "Strategy: Each year, sell equity to realise exactly ₹1,25,000 LTCG → zero tax\nReinvest immediately at the new (higher) market price\nThis resets the cost base for that portion\n\nYear 1: Realise ₹1.25L LTCG → ₹0 tax, new cost base established at current price\nYear 2: Same → ₹0 tax\n...\nOver 9+ years, can cycle through ₹12L+ of embedded gains at zero tax",
        result:
          "Tax harvesting is perfectly legal and widely used. By selling and re-buying systematically, Arun shifts his tax liability forward and eventually to zero (if done consistently) without changing his investment exposure.",
      },
    ],
    relatedSlugs: [
      "stcg-listed-equity-20",
      "ltcg-assets-12-5",
      "tax-rebate-12-lakh",
    ],
  },

  // ── TDS ───────────────────────────────────────────────────────────────────
  {
    slug: "tds-on-salary",
    section2025: "Section 392",
    section1961: "Section 192",
    title: "TDS on Salary",
    explanation:
      "Your employer deducts TDS from salary every month. The employer estimates your total annual income, applies the regime and deductions you declared, computes annual tax, and divides by 12. Form 16 is issued as the TDS certificate.",
    category: "TDS",
    keywords: [
      "TDS",
      "salary",
      "employer",
      "Form 16",
      "192",
      "tax deducted at source",
      "monthly deduction",
    ],
    whoItApplies:
      "All salaried employees whose annual income attracts tax — the employer deducts and deposits TDS on their behalf.",
    keyPoints: [
      "You must declare your chosen regime (default or optional) and planned deductions (80C, 80D, HRA) to your employer each year.",
      "If you don't declare investments, employer deducts TDS assuming no deductions — you then claim refund at filing.",
      "If you switch jobs mid-year, submit Form 12B to the new employer to avoid TDS shortfall.",
      "Form 16 Part A shows TDS deducted; Part B shows salary computation — essential for filing ITR.",
    ],
    examples: [
      {
        title: "Monthly TDS computation",
        scenario:
          "Kavya earns ₹10L annual salary. She declares ₹1L in 80C investments and pays ₹22K in health insurance premium (80D). She uses the optional regime. How much TDS does her employer deduct each month?",
        calculation:
          "Gross salary:            ₹10,00,000\nStandard deduction:     – ₹50,000 (optional regime)\nSection 123 (80C):      – ₹1,00,000 (declared)\nSection 130 (80D):      – ₹22,000\nTotal income:            ₹8,28,000\n\nTax on ₹8,28,000 (old regime slabs):\n  ₹0–2.5L: Nil\n  ₹2.5L–5L: 5% × ₹2.5L = ₹12,500\n  ₹5L–8.28L: 20% × ₹3.28L = ₹65,600\n  Total: ₹78,100\n  Add 4% cess: ₹81,224\n\nMonthly TDS: ₹81,224 ÷ 12 ≈ ₹6,769/month",
        result:
          "Kavya's employer deducts ₹6,769 per month. If Kavya forgets to declare her 80C investments, employer would deduct based on ₹9,50,000 income (no 80C deduction) — a higher TDS. She would get a refund after filing, but cash flow suffers.",
      },
    ],
    relatedSlugs: [
      "multiple-employers-form-12b",
      "salaries-charging",
      "standard-deduction-salary",
    ],
  },
  {
    slug: "multiple-employers-form-12b",
    section2025: "Section 392 / Form 12B",
    section1961: "Section 192(2)",
    title: "Multiple Employers — Form 12B",
    explanation:
      "If you change jobs during the year, you must submit Form 12B to your new employer disclosing salary and TDS from your previous employer, ensuring correct aggregate TDS.",
    category: "TDS",
    keywords: [
      "multiple employers",
      "Form 12B",
      "job change",
      "previous employer",
      "TDS shortfall",
      "192(2)",
    ],
    whoItApplies: "Employees who switch jobs during a financial year.",
    keyPoints: [
      "Without Form 12B, each employer computes TDS independently on their portion — the aggregate TDS may be too low.",
      "If the total tax at year-end exceeds TDS deducted, you must pay the shortfall as self-assessment tax + interest.",
      "The new employer needs: salary paid by old employer, any perquisites, and TDS deducted — use your old Form 16 or salary slips.",
      "Filing Form 12B is your legal obligation — concealing previous salary to reduce TDS is not permitted.",
    ],
    examples: [
      {
        title: "Job change mid-year and TDS shortfall",
        scenario:
          "Rajan leaves Company A after 6 months (April–September 2026) with salary ₹6L and TDS of ₹15,000. He joins Company B at a higher CTC. Company B pays ₹7L for October–March 2027. Rajan does NOT submit Form 12B.",
        calculation:
          "Company A (Apr–Sep): Salary ₹6L, computed tax on ₹12L annualised → deducted ₹15,000\nCompany B (Oct–Mar): Sees only ₹7L, annualises to ₹14L → deducts ₹42,000\n\nActual total salary: ₹6L + ₹7L = ₹13L\nActual tax on ₹13L: approx ₹1,19,600 (incl cess)\nTotal TDS deducted: ₹15,000 + ₹42,000 = ₹57,000\nShortfall: ₹1,19,600 – ₹57,000 = ₹62,600\n\n+ Section 234B interest on shortfall",
        result:
          "Rajan owes ₹62,600 more in tax plus interest for not paying advance tax. If he had submitted Form 12B to Company B, they would have computed TDS on the combined ₹13L and deducted the correct amount throughout.",
      },
    ],
    relatedSlugs: [
      "tds-on-salary",
      "interest-advance-tax-default",
      "salaries-charging",
    ],
  },

  // ── Advance Tax ───────────────────────────────────────────────────────────
  {
    slug: "advance-tax-instalments",
    section2025: "Sections 403–408",
    section1961: "Sections 208–211",
    title: "Advance Tax — Obligation and Instalments",
    explanation:
      "If net tax liability (after TDS) exceeds ₹10,000, you must pay advance tax in four instalments: 15% by June 15; 45% by September 15; 75% by December 15; 100% by March 15.",
    category: "Advance Tax",
    keywords: [
      "advance tax",
      "quarterly",
      "15% June",
      "45% September",
      "75% December",
      "100% March",
      "instalments",
      "10000",
    ],
    whoItApplies:
      "Self-employed individuals, freelancers, investors, and salaried people with large non-salary income where TDS doesn't cover the full liability.",
    keyPoints: [
      "The ₹10,000 threshold is on 'net tax liability after TDS' — if your employer deducts sufficient TDS, you may owe nothing.",
      "Percentages are cumulative: 45% by September means total paid (including June) must be 45%.",
      "Missing or underpaying an instalment attracts interest under Section 425 (3 months per missed instalment).",
      "Paying less than 90% of the total tax as advance tax attracts Section 424 interest from April 1 of the assessment year.",
    ],
    examples: [
      {
        title: "Freelancer estimating and paying advance tax",
        scenario:
          "Suchitra is a freelance designer. She estimates her TY 2026-27 tax liability at ₹1,80,000 after accounting for client TDS deductions of ₹20,000. Net advance tax needed = ₹1,80,000 – ₹20,000 = ₹1,60,000.",
        calculation:
          "Total advance tax: ₹1,60,000\n\nInstalment schedule:\n  By June 15, 2026:      15% = ₹24,000\n  By September 15, 2026: 45% = ₹72,000 (cumulative)\n  By December 15, 2026:  75% = ₹1,20,000 (cumulative)\n  By March 15, 2027:    100% = ₹1,60,000 (cumulative)\n\nAmounts due each period:\n  Jun 15: ₹24,000\n  Sep 15: ₹48,000\n  Dec 15: ₹48,000\n  Mar 15: ₹40,000",
        result:
          "Suchitra pays in four tranches. If she misses the June instalment and pays ₹72,000 in September instead (entire first and second instalment together), she owes Section 425 interest on the June shortfall for 3 months.",
      },
    ],
    relatedSlugs: [
      "senior-citizen-advance-tax-exempt",
      "interest-advance-tax-default",
      "interest-advance-tax-deferment",
      "tax-rebate-12-lakh",
    ],
  },
  {
    slug: "senior-citizen-advance-tax-exempt",
    section2025: "Section 403",
    section1961: "Section 207",
    title: "Senior Citizens Exempt from Advance Tax",
    explanation:
      "A resident individual aged 60+ with no business/profession income is not required to pay advance tax. Their full tax liability can be paid as self-assessment tax at the time of filing.",
    category: "Advance Tax",
    keywords: [
      "senior citizen",
      "advance tax",
      "exempt",
      "60 years",
      "no business",
      "207",
    ],
    whoItApplies:
      "Resident individuals aged 60 years or above who have only salary, pension, rent, or investment income — no business income.",
    keyPoints: [
      "The exemption is unconditional for qualifying senior citizens — even if the tax liability is ₹5L or more.",
      "If a senior citizen has ANY business income (even a small commission or consultancy), they lose this exemption.",
      "Self-assessment tax is paid along with the ITR — no penalty for not paying advance tax if you qualify.",
      "The interest saving can be significant: no Section 234B or 234C interest applies.",
    ],
    examples: [
      {
        title: "Retired couple with large FD and dividend income",
        scenario:
          "Rajesh (68) and his wife Shobha (65) are retired. Their income: pension ₹3L each, FD interest ₹2L each, dividends ₹1L each. Total: ₹6L each. No business income.",
        calculation:
          "Both qualify for senior citizen advance tax exemption (no business income, both 60+).\n\nFor each of them:\n  Total income (before deductions): ₹6,00,000\n  Section 150 deduction: – ₹50,000 (FD interest)\n  Net taxable income: ₹5,50,000\n  Tax: 5% × ₹1,50,000 = ₹7,500 (above ₹4L nil slab)\n  Plus cess: ₹7,800\n\nThey pay ₹7,800 each as self-assessment tax at ITR filing.\nNo quarterly payments, no Section 234B/234C interest.",
        result:
          "Rajesh and Shobha have no quarterly advance tax obligations. They simply pay ₹7,800 each when filing their ITR, typically by July 31. The exemption eliminates the cash flow burden of quarterly tax payments.",
      },
    ],
    relatedSlugs: [
      "advance-tax-instalments",
      "interest-advance-tax-default",
      "senior-citizen-deposit-interest",
    ],
  },

  // ── Interest & Penalties ──────────────────────────────────────────────────
  {
    slug: "interest-late-filing",
    section2025: "Section 423",
    section1961: "Section 234A",
    title: "Interest for Late Filing of Return",
    explanation:
      "If you file your ITR after the due date (typically July 31), simple interest at 1% per month is charged on the unpaid tax amount, from the due date to the actual date of filing.",
    category: "Interest & Penalties",
    keywords: [
      "late filing",
      "234A",
      "interest",
      "penalty",
      "July 31",
      "due date",
      "1% per month",
    ],
    whoItApplies:
      "Anyone who files their Income Tax Return after the due date with tax still outstanding.",
    keyPoints: [
      "Interest is on unpaid tax — if all tax was paid via TDS and advance tax, Section 423 interest is zero even if you file late.",
      "1% per month (or part of a month) — even one day late in August counts as a full month.",
      "Filing after December 31 also attracts a late filing fee under Section 234F: ₹5,000 (₹1,000 if income < ₹5L).",
      "Late filing also forfeits the right to carry forward certain losses (except house property losses).",
    ],
    examples: [
      {
        title: "ITR filed in October with outstanding tax",
        scenario:
          "Mohit has a tax liability of ₹80,000 for TY 2026-27. He paid ₹60,000 via TDS and advance tax but forgot to pay the remaining ₹20,000. He files his ITR on October 20, 2027 (due date was July 31, 2027).",
        calculation:
          "Unpaid tax: ₹20,000\nDue date: July 31, 2027\nActual filing: October 20, 2027\n\nMonths of delay: August (1), September (1), October (1 — partial month counts) = 3 months\n\nSection 423 interest: ₹20,000 × 1% × 3 = ₹600\n\nSection 234F late filing fee: ₹5,000 (income > ₹5L)\n\nTotal additional payment: ₹20,000 + ₹600 + ₹5,000 = ₹25,600",
        result:
          "Mohit pays ₹600 in Section 423 interest and ₹5,000 in late filing fee. The late filing fee applies regardless of the unpaid tax amount — filing by July 31 is always advisable.",
      },
    ],
    relatedSlugs: [
      "interest-advance-tax-default",
      "interest-advance-tax-deferment",
      "advance-tax-instalments",
    ],
  },
  {
    slug: "interest-advance-tax-default",
    section2025: "Section 424",
    section1961: "Section 234B",
    title: "Interest for Default in Advance Tax",
    explanation:
      "If you paid less than 90% of your assessed tax as advance tax, interest at 1% per month is charged from April 1 of the assessment year to the date of actual payment.",
    category: "Interest & Penalties",
    keywords: [
      "234B",
      "advance tax default",
      "90%",
      "interest",
      "April 1",
      "shortfall",
    ],
    whoItApplies:
      "Taxpayers who underpaid advance tax — paid less than 90% of their total assessed tax liability.",
    keyPoints: [
      "90% threshold: if your total advance tax paid is less than 90% of the total tax, Section 424 kicks in.",
      "Interest is calculated on the shortfall (assessed tax minus advance tax paid) from April 1 of the AY to the date you pay.",
      "Even if you pay all four advance tax instalments, you may face Section 424 interest if total was under 90%.",
      "TDS deducted by employer counts as advance tax — if TDS covers 90%+, you may be safe.",
    ],
    examples: [
      {
        title: "Investor who underestimated capital gains",
        scenario:
          "Leena estimated her tax at ₹80,000 and paid ₹72,000 as advance tax by March 15, 2027. After final computation, her assessed tax is ₹1,20,000 (she had unexpected capital gains). She pays the balance ₹48,000 on June 30, 2027.",
        calculation:
          "Assessed tax:               ₹1,20,000\nAdvance tax paid:           ₹72,000 (60%)\n90% threshold:             ₹1,08,000\n\nSince 60% < 90%, Section 424 applies.\nShortfall (assessed tax – advance tax): ₹1,20,000 – ₹72,000 = ₹48,000\n\nPeriod: April 1, 2027 to June 30, 2027 = 3 months\nInterest: ₹48,000 × 1% × 3 = ₹1,440",
        result:
          "Leena pays ₹1,440 in Section 424 interest in addition to the ₹48,000 tax shortfall. Had she paid ₹1,08,000 (90%) as advance tax, she would have owed only Section 234B interest on the remaining 10% from April 1, not on the full gap.",
      },
    ],
    relatedSlugs: [
      "interest-late-filing",
      "interest-advance-tax-deferment",
      "advance-tax-instalments",
    ],
  },
  {
    slug: "interest-advance-tax-deferment",
    section2025: "Section 425",
    section1961: "Section 234C",
    title: "Interest for Deferment of Advance Tax Instalment",
    explanation:
      "If you miss or underpay an advance tax instalment, interest at 1% per month for 3 months is charged on the shortfall for each instalment.",
    category: "Interest & Penalties",
    keywords: [
      "234C",
      "deferment",
      "instalment",
      "1%",
      "3 months",
      "quarterly",
      "advance tax interest",
    ],
    whoItApplies:
      "Taxpayers who miss or underpay any of the four advance tax instalments during the year.",
    keyPoints: [
      "Charged per instalment — each missed due date triggers a separate 3-month interest charge.",
      "Unlike Section 424 (which runs from April 1 to payment date), Section 425 is always exactly 3 months per shortfall.",
      "Self-employed individuals under presumptive taxation (Section 58) pay advance tax as one instalment by March 15 — Section 425 applies only if that is missed.",
      "If you discover additional income mid-year, pay extra advance tax immediately to minimise Section 425 interest.",
    ],
    examples: [
      {
        title: "Missing the June 15 instalment",
        scenario:
          "Farhan has advance tax liability of ₹2,00,000 for TY 2026-27. He pays nothing by June 15 (15% due = ₹30,000) and then pays the full ₹90,000 (45% cumulative) by September 15.",
        calculation:
          "June 15 shortfall:\n  Required: 15% × ₹2,00,000 = ₹30,000\n  Paid by June 15: ₹0\n  Shortfall: ₹30,000\n\nSection 425 interest on June shortfall:\n  ₹30,000 × 1% × 3 months = ₹900\n\n(September payment covers June shortfall too,\nbut Section 425 still charges 3 months interest\non the amount that should have been paid in June)",
        result:
          "Farhan pays ₹900 in Section 425 interest for the June deferment. Even though he paid all the catch-up amount by September, the 3-month penalty for the June shortfall is unavoidable. This is separate from any Section 424 interest at year-end.",
      },
    ],
    relatedSlugs: [
      "interest-advance-tax-default",
      "interest-late-filing",
      "advance-tax-instalments",
    ],
  },

  // ── Special Income ────────────────────────────────────────────────────────
  {
    slug: "virtual-digital-assets-crypto",
    section2025: "Section 194",
    section1961: "Section 115BBH",
    title: "Virtual Digital Assets (Crypto) — 30%",
    explanation:
      "Income from transfer of Virtual Digital Assets (VDA) — including cryptocurrency, NFTs, and digital tokens — is taxed at a flat 30% with no expense deductions (except cost of acquisition). VDA losses cannot be set off against any other income.",
    category: "Special Income",
    keywords: [
      "crypto",
      "cryptocurrency",
      "VDA",
      "NFT",
      "bitcoin",
      "digital asset",
      "30%",
      "115BBH",
      "virtual digital",
    ],
    whoItApplies:
      "Anyone who buys and sells cryptocurrency, NFTs, or other digital tokens on Indian or international exchanges.",
    keyPoints: [
      "Flat 30% rate — no slab rates, no basic exemption benefit regardless of your income level.",
      "Only the cost of acquisition can be deducted — trading fees, platform fees, and other costs are not deductible.",
      "VDA losses cannot be set off against salary, business income, or any other income — not even against other VDA gains in the same year.",
      "1% TDS is deducted by Indian exchanges (Section 194S) on each sale — acts as an advance tax credit.",
    ],
    examples: [
      {
        title: "Crypto profit and loss in the same year",
        scenario:
          "Tanmay bought Bitcoin for ₹5L (profit: sold for ₹8L) and Ethereum for ₹3L (loss: sold for ₹1L) in TY 2026-27.",
        calculation:
          "Bitcoin gain: ₹8L – ₹5L = ₹3,00,000\nEthereum loss: ₹1L – ₹3L = –₹2,00,000\n\nVDA losses CANNOT be set off against VDA gains under IT Act 2025.\n\nTax on Bitcoin gain:\n  ₹3,00,000 × 30% = ₹90,000\n  Add 4% cess: ₹93,600\n\nEthereum loss: No benefit this year, cannot carry forward",
        result:
          "Tanmay pays ₹93,600 tax on the Bitcoin profit despite a ₹2L loss on Ethereum. The Ethereum loss is permanently lost — it cannot be used to offset other income or future crypto gains. This asymmetry makes crypto tax particularly harsh.",
      },
      {
        title: "1% TDS credit at year-end",
        scenario:
          "Priya sells ₹10L worth of crypto on an Indian exchange. The exchange deducts 1% TDS = ₹10,000. Her actual profit was ₹2L.",
        calculation:
          "VDA income: ₹2,00,000\nTax at 30%: ₹60,000\nAdd 4% cess: ₹62,400\n\nLess TDS credit: – ₹10,000\nBalance payable: ₹52,400",
        result:
          "Priya has already 'pre-paid' ₹10,000 via TDS. She owes ₹52,400 more as advance/self-assessment tax. The TDS is visible in her Form 26AS / AIS for verification at ITR filing.",
      },
    ],
    relatedSlugs: [
      "ltcg-listed-equity-12-5",
      "stcg-listed-equity-20",
    ],
  },
  {
    slug: "presumptive-taxation",
    section2025: "Section 58",
    section1961: "Section 44AD / 44ADA",
    title: "Presumptive Taxation — Small Business & Professionals",
    explanation:
      "Small businesses (turnover ≤ ₹3 crore) and professionals (receipts ≤ ₹75 lakh) can declare income at a deemed rate without detailed books of accounts.",
    category: "Special Income",
    keywords: [
      "presumptive taxation",
      "44AD",
      "44ADA",
      "small business",
      "freelancer",
      "professional",
      "3 crore",
      "50%",
    ],
    whoItApplies:
      "Small traders, shopkeepers, and self-employed professionals (doctors, lawyers, engineers, consultants) with income below the turnover threshold.",
    keyPoints: [
      "Business: declare 8% of gross turnover as income (6% if receipts are digital/banking-based) — no need to prove actual profit.",
      "Professionals: declare 50% of gross receipts as income — the presumed profit rate.",
      "No need to maintain detailed books of accounts, balance sheets, or get accounts audited.",
      "If you opt for presumptive taxation, you must continue for 5 consecutive years — switching back early has consequences.",
    ],
    examples: [
      {
        title: "Freelance consultant under presumptive taxation",
        scenario:
          "Rekha is a freelance HR consultant with annual billings of ₹60L (all via bank transfers). She opts for presumptive taxation under Section 58 (professionals — 50% rate).",
        calculation:
          "Gross receipts: ₹60,00,000\nPresumed income: 50% × ₹60L = ₹30,00,000\n\nTax on ₹30L (default regime):\n  ₹0–4L: Nil\n  ₹4L–8L: 5% = ₹20,000\n  ₹8L–12L: 10% = ₹40,000\n  ₹12L–16L: 15% = ₹60,000\n  ₹16L–20L: 20% = ₹80,000\n  ₹20L–24L: 25% = ₹1,00,000\n  ₹24L–30L: 30% = ₹1,80,000\n  Total: ₹4,80,000\n  Plus 4% cess: ₹4,99,200",
        result:
          "Rekha pays tax on ₹30L deemed income without proving her actual expenses. If her real expenses are less than 50% of billings (e.g., she works from home with minimal overhead), presumptive taxation is disadvantageous. If expenses exceed 50%, she should consider detailed accounting instead.",
      },
      {
        title: "Small shopkeeper — digital payments benefit",
        scenario:
          "Vinod runs a hardware store with ₹1.5 crore annual turnover — 80% via UPI/card (digital), 20% cash. He opts for presumptive taxation.",
        calculation:
          "Digital receipts (80%): ₹1,20,00,000 → presumed income @ 6% = ₹7,20,000\nCash receipts (20%):   ₹30,00,000 → presumed income @ 8% = ₹2,40,000\nTotal presumed income: ₹9,60,000\n\nTax on ₹9,60,000 (default regime):\n  ₹0–4L: Nil\n  ₹4L–8L: 5% × ₹4L = ₹20,000\n  ₹8L–9.6L: 10% × ₹1.6L = ₹16,000\n  Total: ₹36,000 + 4% cess = ₹37,440",
        result:
          "Vinod pays ₹37,440 tax on ₹1.5 crore turnover — without audited accounts or detailed books. Encouraging customers to pay digitally lowers his presumed income rate from 8% to 6%, saving him tax.",
      },
    ],
    relatedSlugs: [
      "heads-of-income",
      "advance-tax-instalments",
      "default-tax-regime-slabs",
    ],
  },
  {
    slug: "hra-exemption",
    section2025: "Schedule III",
    section1961: "Section 10(13A)",
    title: "HRA Exemption",
    explanation:
      "House Rent Allowance received from employer is exempt up to the least of: (a) actual HRA received, (b) rent paid minus 10% of basic salary, or (c) 50%/40% of basic salary (metro/non-metro).",
    category: "Deductions",
    keywords: [
      "HRA",
      "house rent allowance",
      "10(13A)",
      "rent",
      "metro",
      "non-metro",
      "50%",
      "40%",
      "Schedule III",
    ],
    whoItApplies:
      "Salaried employees who receive HRA as part of their pay structure and actually pay rent for accommodation. Only under the optional regime.",
    keyPoints: [
      "All three limits must be computed — the LOWEST of the three is the exempt amount.",
      "Metro cities: Delhi (NCR), Mumbai (MMR), Chennai, Kolkata — 50% of basic salary applies.",
      "Non-metro cities (Bangalore, Hyderabad, Pune, etc.) — 40% of basic salary applies.",
      "Rent must actually be paid; living in a parent's house and paying them rent is allowed only if properly documented.",
    ],
    examples: [
      {
        title: "IT employee in Bangalore (non-metro)",
        scenario:
          "Arun earns ₹8L basic salary and receives ₹2.4L HRA from his employer in Bangalore. He pays ₹25,000/month rent (₹3L/year).",
        calculation:
          "Limit 1: Actual HRA received          = ₹2,40,000\nLimit 2: Rent paid – 10% of basic     = ₹3,00,000 – ₹80,000 = ₹2,20,000\nLimit 3: 40% of basic (non-metro)     = 40% × ₹8,00,000 = ₹3,20,000\n\nExempt HRA = Lowest of three = ₹2,20,000\n\nTaxable HRA = ₹2,40,000 – ₹2,20,000 = ₹20,000",
        result:
          "₹2,20,000 of Arun's HRA is exempt from tax. Only ₹20,000 is taxable. To maximise exemption, he should document rent receipts and landlord PAN (required if annual rent exceeds ₹1L).",
      },
      {
        title: "Employee in Delhi (metro) with high rent",
        scenario:
          "Preethi earns ₹12L basic salary and gets ₹4L HRA in Delhi. She pays ₹40,000/month rent (₹4.8L/year).",
        calculation:
          "Limit 1: Actual HRA received          = ₹4,00,000\nLimit 2: Rent paid – 10% of basic     = ₹4,80,000 – ₹1,20,000 = ₹3,60,000\nLimit 3: 50% of basic (metro)          = 50% × ₹12,00,000 = ₹6,00,000\n\nExempt HRA = Lowest = ₹3,60,000\n\nTaxable HRA = ₹4,00,000 – ₹3,60,000 = ₹40,000",
        result:
          "₹3,60,000 is exempt; only ₹40,000 is taxable. Limit 2 (rent minus 10% of basic) is usually the binding constraint for most employees — paying higher rent directly improves this limit.",
      },
    ],
    relatedSlugs: [
      "rent-paid-no-hra",
      "salaries-charging",
      "standard-deduction-salary",
      "investments-insurance-80c",
    ],
  },

  // ── Agricultural Income ───────────────────────────────────────────────────
  {
    slug: "agricultural-income-definition",
    section2025: "Section 2(5) + Section 11",
    section1961: "Section 2(1A) + Section 10(1)",
    title: "Agricultural Income — Definition & Full Exemption",
    explanation:
      "Agricultural income is completely exempt from income tax under Section 11 read with Schedule 2. To qualify, income must fall within one of the four categories defined in Section 2(5): agricultural produce, nursery income, agricultural land rent, or rural dwelling/warehouse rent used for agricultural purposes.",
    category: "Agricultural Income",
    keywords: [
      "agricultural income",
      "farm income",
      "agri exempt",
      "nursery",
      "land rent",
      "Section 2(5)",
      "Section 11",
      "10(1)",
      "farmer",
      "crop",
    ],
    whoItApplies:
      "Farmers, landowners renting agricultural land, nursery operators, and any individual or HUF earning rural land-based income.",
    keyPoints: [
      "Nursery income — growing and selling plants — qualifies 100% as agricultural income with no bifurcation required.",
      "Rent from agricultural land qualifies regardless of whether the land is in a rural or urban location.",
      "Rent from a dwelling house or warehouse qualifies ONLY if the unit is in a Rural Area AND is used for agricultural purposes.",
      "Agricultural produce sold directly (unprocessed) is fully exempt. If you process it in your own factory, Rule 270 bifurcation is required to separate the farming and manufacturing portions.",
    ],
    examples: [
      {
        title: "Nursery vs. processed produce — two different treatments",
        scenario:
          "Padma runs a plant nursery (sells seedlings and potted plants — ₹8L/year) and also grows sugarcane which she processes into jaggery in her own unit (total sale ₹20L).",
        calculation:
          "Nursery income: ₹8,00,000\n  → 100% agricultural income, fully exempt\n  → No bifurcation required\n\nSugarcane (processed into jaggery):\n  → Rule 270 bifurcation required\n  → FMV of raw sugarcane − cultivation cost = Agri income (exempt)\n  → Jaggery sale − FMV of cane − processing cost = Business income (taxable)\n  (see Rule 270 entry for detailed calculation)",
        result:
          "Padma's nursery income (₹8L) is entirely exempt — no rule needed. Her jaggery business requires Rule 270 bifurcation because she processes her own produce. The two activities are treated completely differently.",
      },
      {
        title: "Agricultural land rent — urban vs. rural",
        scenario:
          "Rajan owns two parcels. Parcel A: farmland on the outskirts of Pune city limits, rented at ₹3L/year for cultivation. Parcel B: a godown in his village rented to a grocery store at ₹1.2L/year.",
        calculation:
          "Parcel A (agricultural land rent):\n  → Qualifies under Section 2(5) regardless of urban location\n  → ₹3,00,000 fully exempt\n\nParcel B (village godown, rented to grocery store):\n  → Dwelling/warehouse rent qualifies ONLY if used for agricultural purposes\n  → Grocery store is not agricultural use → does NOT qualify\n  → ₹1,20,000 taxable as House Property income",
        result:
          "Rajan's urban farmland rent (₹3L) is fully exempt. His village godown rent (₹1.2L) is taxable because the tenant uses it commercially, not agriculturally. The use of the building matters, not its rural location alone.",
      },
    ],
    relatedSlugs: [
      "rule-270-field-to-factory",
      "rule-271-tea-coffee-rubber",
      "partial-integration-agricultural",
      "heads-of-income",
    ],
  },
  {
    slug: "rule-270-field-to-factory",
    section2025: "Rule 270",
    section1961: "Rules 7 / 7A / 7B / 8",
    title: "Rule 270 — Separating Farm Income from Factory Profit",
    explanation:
      "When a farmer processes their own agricultural produce in their own business (e.g., sugarcane → sugar, groundnuts → oil), income must be split using Rule 270. The farming portion — Fair Market Value (FMV) of raw produce minus cultivation cost — remains exempt agricultural income. The processing profit — sale price minus FMV minus manufacturing cost — is taxable business income.",
    category: "Agricultural Income",
    keywords: [
      "Rule 270",
      "FMV",
      "fair market value",
      "agricultural produce",
      "processing",
      "bifurcation",
      "sugarcane",
      "agro-processing",
      "cultivation cost",
      "field to factory",
    ],
    whoItApplies:
      "Farmers or agro-processors who grow produce and also manufacture it into a finished product in their own unit (sugarcane → sugar, groundnuts → oil, cotton → yarn, etc.).",
    keyPoints: [
      "The Fair Market Value (FMV) of raw produce at the farm gate is the dividing line between exempt agri income and taxable business income.",
      "Exempt agri income = FMV of raw produce − cultivation cost.",
      "Taxable business income = Sale price of processed product − FMV of raw produce − cost of processing.",
      "If you sell produce raw (without processing), the full profit is agricultural income — Rule 270 only applies when you process in your own factory.",
    ],
    examples: [
      {
        title: "The Sugarcane Split — Mr. Amar's crop",
        scenario:
          "Mr. Amar grows sugarcane. 40% of his crop (worth ₹12L at market) is sold raw to traders. 60% is sent to his own sugar factory where cane (FMV ₹25L) is converted into sugar (sold for ₹30L). Cultivation costs: ₹6L for direct-sale portion, ₹15L for factory portion. Manufacturing expenses: ₹1.5L.",
        calculation:
          "── 40% DIRECT SALE (raw) ──────────────────────\nSale proceeds:          ₹12,00,000\nLess cultivation cost: – ₹6,00,000\nAgri income (exempt):   ₹6,00,000 ✓\n\n── 60% FACTORY PROCESSING ────────────────────\nStep A — Farming portion (Rule 270):\n  FMV of raw sugarcane:   ₹25,00,000\n  Less cultivation cost: – ₹15,00,000\n  Agri income (exempt):   ₹10,00,000 ✓\n\nStep B — Manufacturing portion:\n  Sugar sale proceeds:    ₹30,00,000\n  Less FMV of cane:      – ₹25,00,000\n  Less mfg expenses:     – ₹1,50,000\n  Business income (taxable): ₹3,50,000\n\n──────────────────────────────────────────────\nTotal Agri Income (exempt): ₹16,00,000\nTotal Business Income (taxable): ₹3,50,000",
        result:
          "Mr. Amar's ₹16L farming income is completely exempt. Only his ₹3.5L manufacturing profit is taxable as business income. Without Rule 270, the entire ₹42L receipts could be taxed — Rule 270 protects the genuine agricultural value at each stage.",
      },
    ],
    relatedSlugs: [
      "agricultural-income-definition",
      "rule-271-tea-coffee-rubber",
      "partial-integration-agricultural",
    ],
  },
  {
    slug: "rule-271-tea-coffee-rubber",
    section2025: "Rule 271",
    section1961: "Rules 7A / 7B / 8",
    title: "Rule 271 — Fixed Splits for Tea, Coffee & Rubber",
    explanation:
      "For Tea, Coffee, and Rubber — crops where growing and manufacturing are inseparably intertwined — the law prescribes fixed statutory percentage splits instead of requiring individual FMV calculations. This removes the need to determine a 'farm gate price' for these complex crops.",
    category: "Agricultural Income",
    keywords: [
      "Rule 271",
      "tea",
      "coffee",
      "rubber",
      "statutory split",
      "percentage",
      "bifurcation",
      "plantation",
      "agri percentage",
    ],
    whoItApplies:
      "Tea, coffee, and rubber plantation owners and manufacturers who grow and process their own crop.",
    keyPoints: [
      "Tea (grown and manufactured): 60% of income is agricultural (exempt), 40% is business income (taxable).",
      "Coffee (grown and cured only): 75% agricultural, 25% business.",
      "Coffee (grown, cured, roasted AND grounded): 60% agricultural, 40% business — the extra processing shifts 15% from exempt to taxable.",
      "Rubber (growing and manufacturing): 65% agricultural, 35% business.",
    ],
    examples: [
      {
        title: "Tea estate — 60/40 split",
        scenario:
          "A tea estate in Assam earns ₹1,00,00,000 (₹1 crore) in total income from growing and manufacturing tea bags. What portion is taxable?",
        calculation:
          "Total income: ₹1,00,00,000\n\nRule 271 split for Tea (grown & manufactured):\n  Agricultural income (60%): ₹60,00,000 → Exempt\n  Business income (40%):     ₹40,00,000 → Taxable PGBP\n\nTax on ₹40L business income (default regime):\n  ₹0–4L:    Nil\n  ₹4L–8L:   5%  = ₹20,000\n  ₹8L–12L:  10% = ₹40,000\n  ₹12L–16L: 15% = ₹60,000\n  ₹16L–20L: 20% = ₹80,000\n  ₹20L–24L: 25% = ₹1,00,000\n  ₹24L–40L: 30% = ₹4,80,000\n  Total tax: ₹7,80,000 + 4% cess = ₹8,11,200\n\n(Plus partial integration if there is other non-agri income)",
        result:
          "The estate pays tax on ₹40L (40% of revenue) — ₹60L is permanently exempt. No FMV calculations are needed; the 60/40 rule is applied mechanically to the total income.",
      },
      {
        title: "Coffee — curing vs. roasting makes a difference",
        scenario:
          "A Karnataka coffee grower earns ₹50L. Compare: (A) selling cured coffee beans vs. (B) selling roasted and ground coffee.",
        calculation:
          "Option A — Grown and Cured only:\n  Agricultural (75%): ₹37,50,000 → Exempt\n  Business (25%):     ₹12,50,000 → Taxable\n\nOption B — Grown, Cured, Roasted & Grounded:\n  Agricultural (60%): ₹30,00,000 → Exempt\n  Business (40%):     ₹20,00,000 → Taxable\n\nExtra processing (roasting + grinding) shifts:\n  Additional taxable income: ₹20L – ₹12.5L = ₹7,50,000\n  Additional tax (approx.): ₹7.5L × 20% = ₹1,50,000",
        result:
          "Adding a roasting and grinding unit increases taxable business income by ₹7.5L — the extra processing reduces the agricultural exemption from 75% to 60%. The decision to add a roastery has a direct, quantifiable tax cost that must be weighed against the higher sale price of finished coffee.",
      },
    ],
    relatedSlugs: [
      "agricultural-income-definition",
      "rule-270-field-to-factory",
      "partial-integration-agricultural",
    ],
  },
  {
    slug: "partial-integration-agricultural",
    section2025: "Schedule 2 + IT Rules (Partial Integration)",
    section1961: "Section 2(1A) + Section 10(1) — Partial Integration Method",
    title: "Partial Integration — How Agricultural Income Raises Your Tax Bracket",
    explanation:
      "Although agricultural income is fully exempt from tax, it is added to your non-agricultural income to determine the tax rate on that non-agricultural income. This '4-step staircase' method ensures exempt agri income pushes your taxable income into higher slabs — a silent rate hike even though the agri income itself is never taxed.",
    category: "Agricultural Income",
    keywords: [
      "partial integration",
      "agricultural income tax",
      "rate uplift",
      "agri slab",
      "4-step method",
      "HUF",
      "AOP",
      "agri threshold",
      "5000",
      "non-agri",
    ],
    whoItApplies:
      "Individuals, HUFs, AOPs, BOIs, and AJPs who have both agricultural income exceeding ₹5,000 AND non-agricultural income exceeding the basic exemption limit.",
    keyPoints: [
      "Three conditions must ALL be met for partial integration to apply: (1) taxpayer is an Individual / HUF / AOP / BOI / AJP, (2) net agricultural income > ₹5,000, and (3) non-agricultural income exceeds the basic exemption limit.",
      "The 4-step method: compute tax on (non-agri + agri), subtract tax on (basic exemption + agri), add surcharge and cess on the result.",
      "Agricultural income itself is never directly taxed — but it occupies the lowest slabs, forcing your non-agri income to be taxed at the marginal (higher) rates.",
      "Companies, LLPs, and firms are NOT subject to partial integration — only the entity types listed above.",
    ],
    examples: [
      {
        title: "Farmer with salary income — the bracket uplift",
        scenario:
          "Suresh is a farmer with net agricultural income of ₹6,00,000 and non-agricultural income (salary) of ₹9,00,000 in TY 2026-27. He uses the default regime. Basic exemption limit = ₹4,00,000.",
        calculation:
          "CONDITIONS CHECK:\n  Suresh is an Individual ✓\n  Agri income ₹6L > ₹5,000 ✓\n  Non-agri income ₹9L > ₹4L basic exemption ✓\n  → Partial integration applies\n\nSTEP 1 — Tax on total (non-agri + agri):\n  Total: ₹9L + ₹6L = ₹15,00,000\n  ₹0–4L:    Nil\n  ₹4L–8L:   5%  × ₹4L = ₹20,000\n  ₹8L–12L:  10% × ₹4L = ₹40,000\n  ₹12L–15L: 15% × ₹3L = ₹45,000\n  Step 1 tax:          ₹1,05,000\n\nSTEP 2 — Tax on (basic exemption + agri):\n  Total: ₹4L + ₹6L = ₹10,00,000\n  ₹0–4L:   Nil\n  ₹4L–8L:  5%  × ₹4L = ₹20,000\n  ₹8L–10L: 10% × ₹2L = ₹20,000\n  Step 2 tax:          ₹40,000\n\nSTEP 3 — Base liability:\n  ₹1,05,000 – ₹40,000 = ₹65,000\n\nSTEP 4 — Add 4% Health & Education Cess:\n  ₹65,000 × 1.04 = ₹67,600\n\n────────────────────────────────────\nFINAL TAX PAYABLE: ₹67,600",
        result:
          "Suresh pays ₹67,600 tax on his ₹9L salary. Without any agricultural income, his salary tax would be only ₹31,200 (tax on ₹9L alone at slab rates + cess). The ₹6L exempt agri income costs him an extra ₹36,400 in tax on his salary — because it fills the lower slabs and pushes his salary into the 15% bracket instead of 10%.",
      },
      {
        title: "When partial integration does NOT apply",
        scenario:
          "Geeta has agricultural income of ₹3,000 (below ₹5,000 threshold) and salary of ₹8L. Does partial integration apply?",
        calculation:
          "CONDITIONS CHECK:\n  Geeta is an Individual ✓\n  Agri income ₹3,000 > ₹5,000? ✗ (FAILS)\n  → Partial integration does NOT apply\n\nTax is computed only on non-agri income ₹8L:\n  ₹0–4L:  Nil\n  ₹4L–8L: 5% × ₹4L = ₹20,000\n  + 4% cess: ₹20,800",
        result:
          "Geeta's small agri income (₹3,000) is simply exempt — no rate uplift, no 4-step calculation. The ₹5,000 threshold is a meaningful carve-out for subsistence farmers with minimal agri earnings.",
      },
    ],
    relatedSlugs: [
      "agricultural-income-definition",
      "rule-270-field-to-factory",
      "rule-271-tea-coffee-rubber",
      "default-tax-regime-slabs",
    ],
  },

  // ── Charitable Trusts & NPOs ─────────────────────────────────────────────

  {
    slug: "political-parties-electoral-trusts",
    section2025: "Section 12",
    section1961: "Sections 13A & 13B",
    title: "Exemption for Political Parties and Electoral Trusts",
    explanation:
      "Income of registered political parties — from membership fees, voluntary contributions, and property — and approved electoral trusts distributing funds to political parties is fully exempt from income tax, subject to audit and return filing compliance.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "political party",
      "electoral trust",
      "13A",
      "13B",
      "section 12",
      "donation to political party",
      "exempt income political",
      "Representation of People Act",
    ],
    whoItApplies:
      "Registered political parties under the Representation of the People Act, 1951, and approved electoral trusts receiving and distributing donations to political parties.",
    keyPoints: [
      "All income of a registered political party — membership fees, voluntary contributions, property income — is fully exempt from tax",
      "Electoral trusts that distribute received funds to registered political parties also get full exemption",
      "Books of accounts must be maintained and audited by a Chartered Accountant",
      "Return of income must be filed even though total income is zero (exempt)",
      "Cash donations of ₹2,000 or more are NOT eligible — must be by cheque, draft, or electoral bond",
    ],
    examples: [
      {
        title: "Regional Political Party Tax Computation",
        scenario:
          "A registered state-level political party receives ₹3 crore in voluntary contributions, ₹25 lakh membership fees, and ₹15 lakh rent from a party-owned building during TY 2026-27.",
        calculation:
          "Voluntary contributions:          ₹3,00,00,000\nMembership fees:                  ₹  25,00,000\nRental income:                    ₹  15,00,000\n──────────────────────────────────────────────\nTotal income:                     ₹3,40,00,000\nExemption under Section 12:       ₹3,40,00,000\n──────────────────────────────────────────────\nTaxable income:                   ₹          0\nTax payable:                      ₹          0",
        result:
          "Zero tax liability. The party must still file a return, maintain audited books, and ensure no single cash donation is ₹2,000 or more to preserve the exemption.",
      },
    ],
    relatedSlugs: ["donations-80g", "npo-registration-12a-12ab"],
  },

  {
    slug: "donations-80g",
    section2025: "Section 133",
    section1961: "Section 80G",
    title: "Deduction for Donations to Charitable Institutions (80G)",
    explanation:
      "Donors can claim deductions of 50% or 100% of amounts donated to approved funds and charitable institutions under Section 133. Certain institutions qualify for 100% deduction without any cap, while donations to most others allow only 50% deduction, capped at 10% of adjusted Gross Total Income.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "80G",
      "donation deduction",
      "section 133",
      "charitable donation",
      "PM relief fund",
      "100 percent deduction",
      "50 percent deduction",
      "qualifying limit",
      "PM CARES",
    ],
    whoItApplies:
      "All taxpayers — individuals, HUFs, firms and companies — who donate to funds, trusts, or charitable institutions approved under Section 354 of the IT Act 2025.",
    keyPoints: [
      "100% deduction, no qualifying limit: PM National Relief Fund, PM CARES, National Defence Fund, National Children's Fund",
      "50% deduction, no qualifying limit: Jawaharlal Nehru Memorial Fund, Prime Minister's Drought Relief Fund",
      "100% deduction with qualifying limit (10% of adjusted GTI): government-approved research associations and institutions",
      "50% deduction with qualifying limit (10% of adjusted GTI): most registered charitable trusts and institutions",
      "Cash donations above ₹2,000 are NOT eligible — must be by cheque, draft, or electronic transfer",
      "Obtain a stamped 80G receipt showing the institution's PAN and valid registration number",
    ],
    examples: [
      {
        title: "Individual Claiming Multiple 80G Deductions",
        scenario:
          "Ramesh has Gross Total Income of ₹12 lakh in TY 2026-27. He donates ₹60,000 to PM CARES Fund (100%, no limit) and ₹1,20,000 to a local orphanage trust (50%, with qualifying limit).",
        calculation:
          "Gross Total Income (GTI):              ₹12,00,000\n\nDonation 1 — PM CARES Fund:\n  Amount:                              ₹   60,000\n  Deduction (100%, no limit):          ₹   60,000\n\nDonation 2 — Orphanage Trust (50%, with limit):\n  Amount donated:                      ₹ 1,20,000\n  Qualifying limit (10% of GTI):       ₹ 1,20,000\n  Eligible (lower of two):             ₹ 1,20,000\n  Deduction at 50%:                    ₹   60,000\n\nTotal 80G deduction:                   ₹ 1,20,000\nAdjusted Gross Total Income:           ₹10,80,000",
        result:
          "Ramesh saves approximately ₹37,440 in tax (at 30% + 4% cess) by claiming ₹1.20 lakh in 80G deductions. The orphanage must have valid 80G approval under Section 354 for the deduction to be valid.",
      },
    ],
    relatedSlugs: [
      "npo-80g-approval",
      "donations-80gga-scientific-rural",
      "npo-registration-12a-12ab",
    ],
  },

  {
    slug: "donations-80gga-scientific-rural",
    section2025: "Section 135",
    section1961: "Section 80GGA",
    title: "Deduction for Donations for Scientific Research and Rural Development (80GGA)",
    explanation:
      "Section 135 provides a 100% deduction — with no qualifying income ceiling — on donations made to approved scientific research associations, universities, rural development institutions, and national bodies for poverty eradication. This section is exclusively available to taxpayers who have no income from business or profession.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "80GGA",
      "section 135",
      "scientific research donation",
      "rural development",
      "100 percent no limit",
      "research institution",
      "poverty fund",
    ],
    whoItApplies:
      "Individuals, HUFs and other taxpayers whose total income does NOT include any income from business or profession (i.e., salaried employees, pensioners, investors).",
    keyPoints: [
      "100% deduction with no qualifying limit — the entire donated amount is deductible",
      "Eligible recipients: approved scientific research associations, universities for scientific research, rural development institutions, National Urban Poverty Eradication Fund",
      "NOT available to taxpayers with business or professional income — they must use Section 133 (80G) instead",
      "Donation must be by cheque, draft or electronic transfer; cash above ₹2,000 is disqualified",
      "The donor institution must have valid approval under the relevant research/rural development provisions",
    ],
    examples: [
      {
        title: "Salaried Professional Donating to Research Body",
        scenario:
          "Dr. Priya, a hospital-employed doctor (salary only, no business income), donates ₹2 lakh to an IIT-affiliated approved scientific research association in TY 2026-27. Her GTI is ₹20 lakh.",
        calculation:
          "Gross Total Income:                    ₹20,00,000\nDonation (via bank transfer):          ₹ 2,00,000\nDeduction rate (Section 135):          100%, no limit\nDeduction allowed:                     ₹ 2,00,000\n──────────────────────────────────────────────────\nAdjusted Total Income:                 ₹18,00,000\nTax saved (at 30% + 4% cess):          ₹   62,400",
        result:
          "Dr. Priya saves ₹62,400 in tax. If she had used Section 133 (80G) at 50% for the same institution, her deduction would be only ₹1 lakh — Section 135 is more beneficial for non-business taxpayers.",
      },
    ],
    relatedSlugs: ["donations-80g", "npo-80g-approval", "npo-registration-12a-12ab"],
  },

  {
    slug: "anonymous-donations-30-percent",
    section2025: "Section 188",
    section1961: "Section 115BBC",
    title: "Tax on Anonymous Donations Received by Charitable Trusts — 30%",
    explanation:
      "Registered charitable trusts and NPOs must pay 30% tax on 'anonymous donations' — contributions where the donor's name and address are not recorded. A basic exemption applies: tax kicks in only beyond the higher of ₹1 lakh or 5% of total anonymous donations. Wholly religious trusts are fully exempt from this provision.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "anonymous donation",
      "section 188",
      "115BBC",
      "30 percent tax",
      "charitable trust donation",
      "unknown donor",
      "religious trust",
      "hundi",
      "donation box",
    ],
    whoItApplies:
      "Charitable trusts and NPOs registered under Section 332. Does NOT apply to purely religious trusts (temples, mosques, churches, gurudwaras serving exclusively religious purposes).",
    keyPoints: [
      "30% flat tax on anonymous donations exceeding the basic threshold — no slab benefit applies",
      "Anonymous donation = any voluntary contribution where the donor's name AND address are not recorded",
      "Threshold: tax applies only on amounts above the HIGHER of ₹1 lakh or 5% of total anonymous donations",
      "Purely religious trusts (no charitable objects) are completely exempt from this section",
      "Mixed trusts with both charitable and religious objects are subject to this provision",
      "This prevents charitable trust structures from being used to launder unaccounted cash",
    ],
    examples: [
      {
        title: "Education Trust with Donation Boxes",
        scenario:
          "Gyan Charitable Trust (education) receives ₹40 lakh from donation boxes without recording donor details in TY 2026-27. It also receives ₹3 crore in identified donations.",
        calculation:
          "Total anonymous donations:             ₹40,00,000\n\nBasic exemption — higher of:\n  ₹1,00,000  OR  5% of ₹40L (= ₹2,00,000)\n  → Exemption:                         ₹ 2,00,000\n\nTaxable anonymous donations:           ₹38,00,000\nTax at 30%:                            ₹11,40,000\nAdd: 4% health & education cess:       ₹   45,600\nTotal tax on anonymous donations:      ₹11,85,600\n\nNamed ₹3 crore donations: Eligible for Section 335 exemption",
        result:
          "The trust pays ₹11.86 lakh on anonymous donations. Best practice: always record donor name, address, and PAN for donations above ₹50,000 to avoid this tax entirely.",
      },
    ],
    relatedSlugs: [
      "npo-registration-12a-12ab",
      "npo-regular-income",
      "npo-specified-violations",
    ],
  },

  {
    slug: "npo-registration-12a-12ab",
    section2025: "Section 332",
    section1961: "Sections 12A, 12AB, 80G",
    title: "Registration of Charitable Trusts and NPOs",
    explanation:
      "All charitable trusts, religious institutions, educational societies, hospitals, and non-profit bodies must register under Section 332 to claim income tax exemption. Without registration, the trust's entire income is taxable at the Maximum Marginal Rate (MMR). New trusts get provisional registration valid for 3 years; thereafter, regular 5-year registration must be obtained.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "12A",
      "12AB",
      "registration",
      "section 332",
      "charitable trust registration",
      "NPO registration",
      "form 10A",
      "form 10AB",
      "provisional registration",
      "5 year registration",
    ],
    whoItApplies:
      "All charitable trusts, religious organisations, educational institutions, hospitals, and non-profit bodies seeking income tax exemption under IT Act 2025.",
    keyPoints: [
      "New trusts: apply for provisional registration (Form 10A) BEFORE starting activities — valid for 3 years",
      "After 3 years: apply for regular registration (Form 10AB) — valid for 5 years, renewable",
      "Existing 12A/12AB registered trusts must re-register every 5 years under the new scheme",
      "Without registration: entire income taxable at MMR (~30% + surcharge + cess)",
      "80G approval (for donors to get deduction) is a separate application but usually filed alongside",
      "Application is filed online on the Income Tax e-filing portal; approval typically within 1–3 months",
    ],
    examples: [
      {
        title: "New Trust — Impact of Registration vs. No Registration",
        scenario:
          "Seva Foundation (newly formed, runs free medical camps) earns ₹80 lakh in donations and interest in TY 2026-27. It applied for and received provisional registration before starting activities.",
        calculation:
          "WITH Registration (Section 332):\n  Income:                              ₹80,00,000\n  Applied to medical activities (87%): ₹69,60,000  → Exempt\n  Accumulated (13%, with filing):      ₹10,40,000  → Exempt\n  Tax liability:                       ₹         0\n\nWITHOUT Registration:\n  Total income:                        ₹80,00,000\n  Tax at MMR (30% + surcharge + cess): ₹25,04,000\n  ──────────────────────────────────────────────\n  Tax saved by registering:            ₹25,04,000",
        result:
          "Registration saves over ₹25 lakh in tax. Any trust or NPO should file for registration as its very first compliance action — even before receiving its first donation.",
      },
    ],
    relatedSlugs: [
      "application-of-income-85-percent",
      "npo-regular-income",
      "npo-80g-approval",
      "npo-audit-accounts",
      "npo-return-of-income",
    ],
  },

  {
    slug: "npo-regime-switching",
    section2025: "Section 333",
    section1961: "Section 11",
    title: "Switching Regimes for Charitable Organisations",
    explanation:
      "A registered NPO that voluntarily surrenders its exemption status or gets converted into a taxable entity is treated as having dissolved, triggering accreted income exit tax under Section 352. This section prevents NPOs from accumulating assets tax-free and then converting to taxable commercial entities.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "regime switching",
      "section 333",
      "exit from NPO",
      "charitable trust conversion",
      "accreted income",
      "115TD",
      "NPO exit",
    ],
    whoItApplies:
      "Registered NPOs that choose to surrender their exempt status or convert into a non-charitable taxable entity.",
    keyPoints: [
      "Surrendering NPO registration triggers the accreted income exit tax under Section 352",
      "The trust is treated as dissolved on the date it exits the exempt regime",
      "Assets transferred to another registered NPO within the prescribed period avoid exit tax",
      "This provision cannot be bypassed — there is no grandfathering of accumulated assets",
      "Trusts should carefully evaluate before making any structural change that affects exemption status",
    ],
    examples: [
      {
        title: "Trust Surrendering Exemption Status",
        scenario:
          "An NPO with ₹10 crore FMV assets and ₹1 crore liabilities decides to surrender its Section 332 registration and operate as a regular private limited company.",
        calculation:
          "FMV of assets on exit date:            ₹10,00,00,000\nLess: Total liabilities:               ₹ 1,00,00,000\nAccreted income (Section 352):         ₹ 9,00,00,000\nTax at 30%:                            ₹ 2,70,00,000\nAdd: 4% cess:                          ₹   10,80,000\nTotal exit tax:                        ₹ 2,80,80,000\n\nAlternative — Transfer to another NPO:\n  Exit tax:                            ₹           0",
        result:
          "Surrendering registration triggers ₹2.81 crore in exit tax. Transferring assets to another registered charitable trust is always the better alternative.",
      },
    ],
    relatedSlugs: [
      "npo-accreted-income-exit-tax",
      "npo-registration-12a-12ab",
      "npo-specified-violations",
    ],
  },

  {
    slug: "tax-on-npo-income",
    section2025: "Section 334",
    section1961: "Sections 11, 115BBC, 115BBI",
    title: "Overall Tax Framework for Registered NPOs",
    explanation:
      "Section 334 is the master charging provision for registered NPOs. It classifies an NPO's income into three streams — regular income (mostly exempt), specified income (taxable if misused), and anonymous donations (taxed at 30%) — and specifies the tax treatment for each stream.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 334",
      "NPO tax framework",
      "115BBI",
      "charitable trust tax",
      "registered NPO income",
      "trust income computation",
    ],
    whoItApplies:
      "All organisations registered under Section 332 — charitable trusts, religious organisations, educational institutions, hospitals, and other NPOs.",
    keyPoints: [
      "Regular income (Section 335): exempt if 85% is applied to charitable objects and proper filing is done",
      "Specified income (Section 337): taxed at MMR if applied for non-charitable purposes or to benefit specified persons",
      "Anonymous donations: excess over threshold taxed at flat 30% under Section 188",
      "If registration is cancelled: ALL income of that year becomes taxable at MMR",
      "Total tax liability is the sum across all three income streams",
    ],
    examples: [
      {
        title: "Composite Tax Computation for an NPO",
        scenario:
          "Hope Hospital Trust (registered) — TY 2026-27: Regular income ₹2 crore (applied ₹1.87 crore, accumulated ₹13 lakh). Anonymous donations ₹8 lakh. A trustee received ₹5 lakh personal benefit.",
        calculation:
          "1. REGULAR INCOME (Section 335)\n   Total income:               ₹2,00,00,000\n   Applied (≥85%):             ₹1,87,00,000 → Exempt\n   Accumulated (with filing):  ₹  13,00,000 → Exempt\n   Tax:                        ₹           0\n\n2. ANONYMOUS DONATIONS (Section 188)\n   Received:                   ₹   8,00,000\n   Exemption (5% of ₹8L):      ₹     40,000\n   Taxable:                    ₹   7,60,000\n   Tax @ 30%:                  ₹   2,28,000\n\n3. SPECIFIED INCOME (Section 337)\n   Trustee personal benefit:   ₹   5,00,000\n   Tax @ MMR (30%):            ₹   1,50,000\n\nTotal before cess:             ₹   3,78,000\nCess (4%):                     ₹     15,120\nTotal tax:                     ₹   3,93,120",
        result:
          "The trust pays ₹3.93 lakh. Better governance — no personal benefits to trustees, recording all donors — would reduce this to zero.",
      },
    ],
    relatedSlugs: [
      "npo-regular-income",
      "npo-specified-income",
      "anonymous-donations-30-percent",
      "npo-specified-violations",
    ],
  },

  {
    slug: "npo-regular-income",
    section2025: "Section 335",
    section1961: "Sections 11 & 12",
    title: "Regular Income of Registered NPO — The Exemption Provision",
    explanation:
      "The primary exemption provision for charitable trusts: if at least 85% of the trust's 'regular income' is applied (spent) for charitable or religious objects in the same year, the entire income qualifies for exemption. The remaining 15% can be accumulated and still claimed as exempt if proper Form 10 filing is done before the ITR due date.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 335",
      "section 11 income",
      "85 percent rule",
      "application of income",
      "regular income NPO",
      "charitable expenditure",
      "trust exemption",
    ],
    whoItApplies:
      "All registered NPOs under Section 332 — any income from property held under trust for charitable or religious purposes.",
    keyPoints: [
      "85% of regular income must be APPLIED (actually spent) for charitable objects in the SAME financial year",
      "Regular income includes: donations, grants, fees, interest, rent — any income from trust property",
      "The remaining 15% can be accumulated (retained) without losing exemption if Form 10 is filed",
      "Capital gains on sale of trust assets: exempt only if sale proceeds are reinvested in another capital asset within 1 year before or 3 years after the sale",
      "Income applied abroad (outside India) is NOT treated as applied to charitable objects (with narrow exceptions)",
    ],
    examples: [
      {
        title: "Education Trust Testing the 85% Rule",
        scenario:
          "Gyan Education Trust (registered) receives ₹1.5 crore in income during TY 2026-27 — ₹1.2 crore in donations and ₹30 lakh in interest. It spends ₹1.32 crore on school operations and accumulates ₹18 lakh.",
        calculation:
          "Total regular income:                  ₹1,50,00,000\n85% threshold:                         ₹1,27,50,000\n\nActual expenditure on objects:         ₹1,32,00,000  ✓ (88% > 85%)\n\nShortfall from 85%:                    NIL\nEntire ₹1.5 crore income:             EXEMPT\nTax liability:                         ₹          0\n\n──── What if they spent only ₹1.20 crore? ────\nShortfall (₹1.27L − ₹1.20L):          ₹   7,50,000\nThis shortfall becomes TAXABLE at MMR\nTax on shortfall (30%):                ₹   2,25,000",
        result:
          "Gyan Trust's actual spending of 88% keeps it fully exempt. Trusts should monitor their application ratio quarterly to avoid a year-end shortfall.",
      },
    ],
    relatedSlugs: [
      "application-of-income-85-percent",
      "accumulated-income-charitable-trust",
      "npo-registration-12a-12ab",
      "corpus-donation",
    ],
  },

  {
    slug: "npo-taxable-regular-income",
    section2025: "Section 336",
    section1961: "IT Rules 2026 (Rule 182)",
    title: "What Counts as Taxable Regular Income for an NPO",
    explanation:
      "Section 336 defines the components of an NPO's regular income that become subject to tax — essentially the portion that fails to meet the 85% application test or is applied for non-exempt purposes. This provision bridges Section 335 and Section 337 by specifying the taxable base calculation.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 336",
      "taxable regular income NPO",
      "rule 182",
      "IT Rules 2026",
      "trust taxable income",
      "NPO income computation",
    ],
    whoItApplies:
      "Registered NPOs whose income application falls below the 85% threshold or which apply income for disallowed purposes.",
    keyPoints: [
      "Taxable regular income = total regular income minus 85% applied to objects minus amounts accumulated with Form 10",
      "Any shortfall in the 85% application directly becomes taxable at MMR",
      "Administrative expenses of the trust are counted as applied to objects — but excessive admin costs attract scrutiny",
      "Deemed application rules allow certain set-asides to be treated as applied (e.g., repairs to trust property)",
      "This computation is done annually and reported in the ITR filed by the trust",
    ],
    examples: [
      {
        title: "Computing Taxable Regular Income",
        scenario:
          "A charitable trust has regular income of ₹50 lakh. It spends ₹38 lakh on programs, ₹3 lakh on admin, files Form 10 for ₹6 lakh accumulation, and retains ₹3 lakh without Form 10.",
        calculation:
          "Regular income:                        ₹50,00,000\nRequired 85%:                          ₹42,50,000\n\nActual application to objects:\n  Program expenses:                    ₹38,00,000\n  Admin expenses:                      ₹ 3,00,000\nAccumulated with Form 10:              ₹ 6,00,000\nTotal treated as applied:              ₹47,00,000  ✓ (94% > 85%)\n\nRetained without Form 10:              ₹ 3,00,000\n  → NOT treated as applied or accumulated\n  → Taxable at MMR\n  Tax (30%):                           ₹   90,000",
        result:
          "The ₹3 lakh retained without Form 10 is taxable even though the overall 85% test is met. Filing Form 10 for that amount would have saved ₹93,600 in tax (including cess).",
      },
    ],
    relatedSlugs: [
      "npo-regular-income",
      "application-of-income-85-percent",
      "npo-specified-income",
      "accumulated-income-charitable-trust",
    ],
  },

  {
    slug: "npo-specified-income",
    section2025: "Section 337",
    section1961: "Sections 11, 12, 13, 115BBC, 115BBI",
    title: "Specified Income — When NPO Funds Are Misused",
    explanation:
      "Section 337 identifies categories of income that lose exemption and are taxed at the Maximum Marginal Rate — primarily when a trust's income benefits trustees, founders, or their relatives personally, or when funds are invested in prohibited modes, or when the trust violates registration conditions.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 337",
      "specified income NPO",
      "trustee benefit",
      "prohibited benefit",
      "MMR tax trust",
      "related party benefit",
      "section 13",
      "13(1)(c)",
    ],
    whoItApplies:
      "Registered NPOs where income is applied for the personal benefit of specified persons (trustees, authors of trust, relatives) or where conditions of registration are violated.",
    keyPoints: [
      "Income is 'specified' (taxable) if it benefits: the author, trustee, founder, or their relatives or associated concerns",
      "Interest-free or below-market loans to specified persons make the income taxable",
      "Trust property used for private benefit of any specified person renders that income taxable at MMR",
      "If SOME income is specified, only that portion is taxable — the rest remains exempt",
      "Charitable activity for 'a section of the public' must truly be public — not just for a small private group",
    ],
    examples: [
      {
        title: "Trustee Receiving Free Use of Trust Property",
        scenario:
          "A registered charitable trust has regular income of ₹60 lakh. A managing trustee is given use of a trust-owned flat worth ₹25 lakh annual rental value without paying any rent.",
        calculation:
          "Total regular income:                  ₹60,00,000\n\nSpecified income (benefit to trustee):\n  Rental value of flat given free:     ₹25,00,000\n  Tax at MMR (30%):                    ₹ 7,50,000\n\nRemaining income (₹35 lakh):\n  Applied to objects (>85%):           → Exempt\n\nTotal before cess:                     ₹ 7,50,000\nCess (4%):                             ₹   30,000\nTotal tax:                             ₹ 7,80,000",
        result:
          "The trust pays ₹7.80 lakh because of the trustee's personal benefit. All trustees should pay fair market rent for any trust property they use — even nominal amounts matter legally.",
      },
    ],
    relatedSlugs: [
      "npo-regular-income",
      "npo-specified-violations",
      "npo-other-violations",
      "tax-on-npo-income",
    ],
  },

  {
    slug: "npo-income-excluded-from-regular",
    section2025: "Section 338",
    section1961: "Section 11",
    title: "Income Excluded from Regular Income of an NPO",
    explanation:
      "Section 338 lists specific receipts that are NOT included in an NPO's regular income computation — primarily corpus donations, deemed corpus amounts, and certain capital receipts. This ensures that structural funding (corpus) is not confused with operational income and is not subjected to the 85% application test.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 338",
      "excluded income NPO",
      "corpus excluded",
      "capital receipt trust",
      "regular income exclusion",
    ],
    whoItApplies:
      "Registered NPOs that receive corpus donations, endowments, or other capital receipts to be maintained as the trust's permanent fund.",
    keyPoints: [
      "Corpus donations (Section 339) are completely excluded from regular income — not subject to the 85% rule",
      "Capital gains on sale of corpus assets are excluded IF reinvested in another capital asset within the prescribed period",
      "Voluntary contributions specifically earmarked as 'corpus' by the donor in writing are excluded",
      "Excluded income still needs to be tracked and reported in the trust's ITR",
      "If corpus funds are later spent on non-corpus purposes, they become taxable at MMR",
    ],
    examples: [
      {
        title: "Separating Corpus and Regular Income",
        scenario:
          "A hospital trust receives ₹1.5 crore in regular operational donations and ₹50 lakh as corpus donation (donor wrote: 'for permanent endowment fund') during TY 2026-27.",
        calculation:
          "Regular donations:                     ₹1,50,00,000\n  Subject to 85% application test ✓\n  Required application (85%):          ₹1,27,50,000\n\nCorpus donation (excluded):            ₹  50,00,000\n  NOT subject to 85% rule\n  Must be invested in Section 350 permitted modes\n\nInvestment in government bonds (6%)\nInterest earned annually:              ₹   3,00,000\n  This interest IS regular income → Subject to 85% rule",
        result:
          "The ₹50 lakh corpus is protected from the application test. However, the ₹3 lakh annual interest it earns is regular income — the trust must apply ₹2.55 lakh (85%) of that to charitable activities.",
      },
    ],
    relatedSlugs: [
      "corpus-donation",
      "deemed-corpus-donation",
      "npo-regular-income",
      "npo-permitted-investment-modes",
    ],
  },

  {
    slug: "corpus-donation",
    section2025: "Section 339",
    section1961: "Section 11",
    title: "Corpus Donations — Permanent Fund Contributions",
    explanation:
      "A corpus donation is a voluntary contribution made to a registered NPO with a specific written direction from the donor that it should form part of the 'corpus' (permanent fund) of the trust. Such donations are excluded from regular income and are not subject to the 85% application test — they must be kept invested in permitted modes.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "corpus donation",
      "section 339",
      "permanent fund",
      "endowment",
      "corpus fund",
      "written direction",
      "corpus contribution",
    ],
    whoItApplies:
      "Registered NPOs receiving contributions that donors specifically designate as corpus (permanent endowment) in writing.",
    keyPoints: [
      "Must have a WRITTEN direction from the donor specifying it as 'corpus' — oral directions are not valid",
      "Corpus donations are excluded from regular income and NOT subject to the 85% application requirement",
      "Must be invested only in the permitted modes specified in Section 350",
      "Income earned ON corpus investments (interest, rent) IS regular income subject to the 85% test",
      "Corpus cannot be spent on day-to-day charitable activities — it must be maintained as permanent capital",
      "Misuse of corpus (spending on non-corpus purposes) triggers taxability at MMR",
    ],
    examples: [
      {
        title: "Building a Corpus Fund for Scholarships",
        scenario:
          "An alumnus donates ₹1 crore to his college alumni charitable trust with a written letter: 'This donation is specifically for the trust's permanent corpus fund to generate income for student scholarships.'",
        calculation:
          "Corpus donation received:              ₹1,00,00,000\nWritten direction provided:            ✓\n\nTreatment:\n  Included in regular income?           NO\n  Subject to 85% application test?      NO\n  Taxable as donation received?         NO\n  Must be invested in:                  Section 350 permitted modes\n\nInvestment: Nationalised bank FD @ 7%\nInterest earned annually:              ₹   7,00,000\n  → This IS regular income → Subject to 85% rule\n  Required application (85%):          ₹   5,95,000 to scholarships",
        result:
          "The ₹1 crore corpus is protected permanently. Each year ₹7 lakh in interest is generated, of which ₹5.95 lakh must go to scholarships. The corpus itself never needs to be spent.",
      },
    ],
    relatedSlugs: [
      "deemed-corpus-donation",
      "npo-income-excluded-from-regular",
      "npo-permitted-investment-modes",
      "npo-regular-income",
    ],
  },

  {
    slug: "deemed-corpus-donation",
    section2025: "Section 340",
    section1961: "Section 11",
    title: "Deemed Corpus Donations",
    explanation:
      "Section 340 specifies circumstances where certain receipts are treated as corpus donations even without a written donor direction — for example, capital grants from government specifically for asset creation, contributions for construction of buildings, and legacy bequests. This protects infrastructure funding from being treated as operational income.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 340",
      "deemed corpus",
      "government grant corpus",
      "capital grant",
      "bequest corpus",
      "infrastructure grant NPO",
    ],
    whoItApplies:
      "Registered NPOs receiving capital grants from government authorities, bequests (inheritances), or contributions specifically for creating or acquiring fixed assets.",
    keyPoints: [
      "Government grants specifically for capital asset creation are deemed corpus — not regular income",
      "Bequests (inheritances) received by an NPO are treated as corpus donations",
      "Contributions received for construction of a building or purchase of specific capital assets are deemed corpus",
      "Deemed corpus amounts must be credited to a separate corpus fund in the accounts",
      "Income earned on deemed corpus investments is regular income subject to the 85% rule",
    ],
    examples: [
      {
        title: "Government Grant for School Building",
        scenario:
          "A state government gives a charitable school trust a grant of ₹2 crore specifically to construct a new school building. No written 'corpus' direction is given.",
        calculation:
          "Grant for building construction:       ₹2,00,00,000\n\nWritten corpus direction from government? NO\nDeemed corpus under Section 340?         YES\n  (specifically for capital asset creation)\n\nTreatment:\n  Regular income?                        NO (deemed corpus)\n  Subject to 85% rule?                   NO\n  Usage restriction?                     YES — must be used for the building\n\nIf grant is diverted to salary expenses:\n  Loses deemed corpus status\n  → Becomes regular income → 85% test applies retroactively",
        result:
          "The ₹2 crore grant is protected as deemed corpus and need not meet the 85% test. However, it MUST be used for the school building — diverting it to other purposes removes the protection.",
      },
    ],
    relatedSlugs: [
      "corpus-donation",
      "npo-income-excluded-from-regular",
      "npo-regular-income",
    ],
  },

  {
    slug: "application-of-income-85-percent",
    section2025: "Section 341",
    section1961: "Section 11",
    title: "Application of Income — The 85% Charitable Spending Rule",
    explanation:
      "Section 341 contains the heart of charitable trust exemption: at least 85% of a trust's regular income must be 'applied' (actually spent or incurred) for its charitable or religious objects during the year. Failure to meet this threshold makes the shortfall taxable at MMR.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 341",
      "85 percent rule",
      "application of income",
      "charitable expenditure",
      "trust spending",
      "form 9A",
      "accumulation of income",
      "85% charitable",
    ],
    whoItApplies:
      "All registered NPOs. This is the fundamental compliance requirement every charitable trust must satisfy every financial year.",
    keyPoints: [
      "85% of regular income must be APPLIED (spent) for charitable/religious objects in the SAME year",
      "'Applied' means actually paid or incurred — amounts payable but not yet paid may qualify if incurred during the year",
      "The 15% balance can be accumulated (retained) without tax by filing Form 10 before the ITR due date",
      "If Form 10 is not filed and less than 85% is spent: the shortfall is taxed at MMR",
      "Both revenue expenses AND capital expenditure on charitable objects count as 'applied'",
      "Voluntary donations given by the trust to other registered NPOs also count as application",
    ],
    examples: [
      {
        title: "Trust Just Below the 85% Threshold",
        scenario:
          "Asha Foundation (registered) has regular income of ₹60 lakh in TY 2026-27. It spends ₹49 lakh on programs and ₹3 lakh on admin, retaining ₹8 lakh. It did NOT file Form 10.",
        calculation:
          "Regular income:                        ₹60,00,000\n85% threshold:                         ₹51,00,000\n\nActual application:\n  Program expenses:                    ₹49,00,000\n  Admin expenses:                      ₹ 3,00,000\n  Total applied:                       ₹52,00,000  ✓ (86.7% > 85%)\n\nRetained (₹8 lakh) — No Form 10 filed:\n  Treated as unapplied income\n  Tax at MMR:                          ₹ 2,40,000\n\nIf Form 10 filed on time:\n  ₹8L accumulated → Exempt\n  Tax:                                 ₹         0",
        result:
          "Asha Foundation met the 85% test (86.7%) but still faces ₹2.49 lakh in tax on the ₹8 lakh retained — because it forgot to file Form 10. Setting a calendar reminder for Form 10 before 31 October every year prevents this.",
      },
    ],
    relatedSlugs: [
      "npo-regular-income",
      "accumulated-income-charitable-trust",
      "npo-books-of-accounts",
      "npo-return-of-income",
    ],
  },

  {
    slug: "accumulated-income-charitable-trust",
    section2025: "Section 342",
    section1961: "Sections 11 & 13",
    title: "Accumulation of Income — Beyond the 15%",
    explanation:
      "Section 342 allows a registered NPO to accumulate (retain without spending) up to 15% of its regular income without losing exemption. For higher accumulations, the trust must file Form 10 before the ITR due date, specifying the purpose and time period (maximum 5 years). Unspent accumulated income after 5 years becomes taxable.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 342",
      "accumulation of income",
      "form 10",
      "form 9A",
      "15 percent retention",
      "5 year accumulation",
      "set aside income",
      "charitable trust accumulation",
    ],
    whoItApplies:
      "Registered NPOs that wish to retain more than 15% of their income for future charitable projects or building reserves.",
    keyPoints: [
      "Up to 15% of regular income can always be retained — no Form 10 filing needed",
      "For more than 15%: file Form 10 BEFORE the ITR due date, specifying purpose and period (max 5 years)",
      "Accumulated amounts must be invested only in permitted modes (Section 350) — FDs, govt securities, etc.",
      "If not spent within the 5-year period: the unspent accumulated amount is taxed at MMR in Year 6",
      "Form 10 must state a specific charitable purpose (e.g., 'to construct a library') — it is not a blank cheque",
      "Income accumulated for purchasing a capital asset is also eligible",
    ],
    examples: [
      {
        title: "Trust Planning a Major Capital Project",
        scenario:
          "Navjeevan Trust (income ₹1 crore in TY 2026-27) plans to build a community hospital costing ₹5 crore over 5 years. It spends ₹88 lakh this year and wants to save ₹12 lakh for the project.",
        calculation:
          "Regular income:                        ₹1,00,00,000\nApplied to current activities:         ₹  88,00,000  (88% > 85%) ✓\nWanted to accumulate:                  ₹  12,00,000\n\nAutomatic 15% retention allowed:       ₹  15,00,000\nSince ₹12L < ₹15L → Form 10 NOT needed\n\nAlternative scenario (accumulating ₹20L):\n  Automatic limit:                     ₹  15,00,000\n  Additional requiring Form 10:        ₹   5,00,000\n  Form 10 must state:\n    Purpose: Community hospital construction\n    Period: 5 years (by TY 2031-32)\n  Invested in: Nationalised bank FD",
        result:
          "Filing Form 10 each year allows the trust to systematically build towards ₹5 crore over 5 years without any tax. Failure to spend by TY 2031-32 would make the unspent amount taxable at MMR with interest.",
      },
    ],
    relatedSlugs: [
      "application-of-income-85-percent",
      "npo-permitted-investment-modes",
      "npo-return-of-income",
      "npo-regular-income",
    ],
  },

  {
    slug: "deemed-accumulated-income",
    section2025: "Section 343",
    section1961: "IT Rules 2026 (Rule 186, Forms 110/111)",
    title: "Deemed Accumulated Income — When Accumulation Goes Wrong",
    explanation:
      "Section 343 specifies situations where income previously accumulated under Form 10 is retrospectively treated as income of an earlier year — triggering tax plus interest. This happens when accumulated funds are applied for purposes other than stated in Form 10, or remain unapplied after the 5-year period.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 343",
      "deemed accumulated income",
      "form 10 violation",
      "accumulation misuse",
      "5 year limit",
      "rule 186",
      "trust income taxable",
    ],
    whoItApplies:
      "Registered NPOs that filed Form 10 for accumulation but did not use the funds as specified, or used them for a different purpose.",
    keyPoints: [
      "Accumulated income applied for a different purpose than stated in Form 10 becomes taxable in the year of mis-application",
      "Accumulated income not spent within the 5-year period is taxable in Year 6 at MMR",
      "The tax is charged as if the income was received in the year when the Form 10 accumulation was made",
      "Interest under Section 423 also applies from the original year of accumulation",
      "Genuine changes in project scope can be declared to the Assessing Officer with proper justification",
    ],
    examples: [
      {
        title: "Accumulated Income Used for Wrong Purpose",
        scenario:
          "In TY 2026-27, a trust accumulated ₹20 lakh via Form 10 for 'building a computer lab.' In TY 2028-29, the trust spends this ₹20 lakh on salaries instead.",
        calculation:
          "TY 2026-27: Accumulated ₹20L for computer lab → Exempt at that time\n\nTY 2028-29: ₹20L spent on salaries (wrong purpose)\n\nDeemed income for TY 2026-27:          ₹20,00,000\nTax at MMR (30%):                      ₹ 6,00,000\nInterest u/s 423 (approx. 2 years):    ₹ 1,44,000\nTotal dues:                            ₹ 7,44,000",
        result:
          "The ₹20 lakh is retroactively taxed in TY 2026-27 with interest. The trust should either maintain purpose discipline or formally amend the Form 10 with AO approval before changing the application.",
      },
    ],
    relatedSlugs: [
      "accumulated-income-charitable-trust",
      "application-of-income-85-percent",
      "npo-return-of-income",
    ],
  },

  {
    slug: "npo-business-undertaking",
    section2025: "Section 344",
    section1961: "IT Rules 2026 (Rule 182)",
    title: "Business Undertaking Held as Property of an NPO",
    explanation:
      "When a business undertaking is part of the trust's assets — typically received through a bequest or donation — Section 344 governs how income from that business is treated. Profits from business undertakings incidental to charitable objects can remain exempt; purely commercial unconnected businesses lose the exemption.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 344",
      "NPO business property",
      "trust business undertaking",
      "business held by trust",
      "charitable trust business",
      "rule 182",
    ],
    whoItApplies:
      "Registered NPOs that hold or operate business undertakings as part of their trust corpus — typically received through inheritances, donations, or as part of their charitable objects.",
    keyPoints: [
      "A charitable trust can hold a business undertaking only if it is not operated for profit as the primary goal",
      "Profits from business undertakings incidental to charitable activity are included in regular income and eligible for exemption",
      "If the business is incidental to the main charitable activity (e.g., a hospital's pharmacy), profits are fully eligible for exemption",
      "If the business is purely commercial and unconnected to charitable objects, it loses exempt status",
      "Separate books of accounts must be maintained for each business undertaking",
    ],
    examples: [
      {
        title: "Hospital Trust Operating an In-House Pharmacy",
        scenario:
          "Healing Hearts Charitable Hospital Trust runs an in-house pharmacy as part of its medical services. The pharmacy earns ₹40 lakh profit, entirely used for patient welfare.",
        calculation:
          "Pharmacy profit (incidental to hospital objects): ₹40,00,000\n\nIncidental to charitable objects? → YES ✓\n  (pharmacy directly serves hospital patients)\n\nTreatment: Part of regular income (Section 335)\n  Subject to 85% application rule\n  Applied to patient care: ₹40L → EXEMPT\n\nIf pharmacy sells to general public (not patients):\n  Excess profits → NOT incidental → Taxable at MMR",
        result:
          "The pharmacy profit is fully exempt as it is incidental to the hospital's charitable activity. If the pharmacy opens to the general public, that portion of income loses the exemption.",
      },
    ],
    relatedSlugs: [
      "npo-commercial-activities-restriction",
      "general-public-utility-commercial-limit",
      "npo-regular-income",
      "npo-specified-income",
    ],
  },

  {
    slug: "npo-commercial-activities-restriction",
    section2025: "Section 345",
    section1961: "Section 11",
    title: "Restriction on Commercial Activities by Registered NPOs",
    explanation:
      "Section 345 restricts registered NPOs from carrying out commercial activities that are not incidental to their charitable objects. Trusts that engage in substantial commercial activities — beyond what is needed for their charitable purposes — risk losing their tax-exempt status on the commercial income.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 345",
      "commercial activities NPO",
      "trust commercial restriction",
      "incidental business",
      "charitable object restriction",
    ],
    whoItApplies:
      "All registered NPOs — especially those tempted to run revenue-generating commercial ventures under the shield of charitable trust status.",
    keyPoints: [
      "Commercial activity is allowed ONLY if it is incidental to the main charitable object",
      "Allowed example: a blind school selling items made by students — directly serves the charitable object",
      "Not allowed example: a charitable trust running a hotel for the general public to generate revenue",
      "The test is: is the commercial activity a MEANS to achieve the charitable object, or an END in itself?",
      "General Public Utility trusts face an additional stricter cap on commercial receipts under Section 346",
    ],
    examples: [
      {
        title: "Allowed vs. Disallowed Commercial Activity",
        scenario:
          "Trust A: An artisan training trust sells handicrafts made by trainees — earns ₹15 lakh. Trust B: An environment trust runs a commercial parking lot to fund tree-planting — earns ₹20 lakh.",
        calculation:
          "TRUST A (Artisan trust selling handicrafts):\n  Charitable object: Skill training of artisans\n  Selling their output: Incidental and integral ✓\n  ₹15 lakh: Regular income → Exempt if 85% applied\n\nTRUST B (Environment trust with parking lot):\n  Charitable object: Environment protection\n  Parking lot: NOT incidental to environment ✗\n  ₹20 lakh: Taxable commercial income at MMR\n  Tax @ 30%:                           ₹ 6,00,000",
        result:
          "Trust A's activity is validly incidental. Trust B's parking lot is pure commercial activity unrelated to environment protection — ₹20 lakh is fully taxable. Trust B should receive donations instead of running commercial ventures.",
      },
    ],
    relatedSlugs: [
      "general-public-utility-commercial-limit",
      "npo-business-undertaking",
      "npo-specified-income",
      "npo-registration-12a-12ab",
    ],
  },

  {
    slug: "general-public-utility-commercial-limit",
    section2025: "Section 346",
    section1961: "Section 2(15)",
    title: "General Public Utility Trusts — 20% Commercial Receipts Cap",
    explanation:
      "Trusts registered under the 'General Public Utility' (GPU) object — the broadest charitable category — face a specific restriction: if receipts from commercial activities exceed 20% of total receipts during the year, the GPU object loses its charitable status for that year, making all income taxable.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 346",
      "general public utility",
      "2(15)",
      "20 percent cap",
      "GPU trust",
      "charitable definition",
      "commercial receipts limit",
    ],
    whoItApplies:
      "Trusts and institutions registered under the 'Advancement of any other object of general public utility' category — chambers of commerce, bar associations, trade bodies, and similar organisations.",
    keyPoints: [
      "GPU is the residual charitable category: trusts not fitting relief of poverty, education, medical relief, environment, or yoga",
      "Commercial receipts (fees, subscriptions for services, trade fair revenues) must not exceed 20% of total gross receipts",
      "If 20% limit is breached: GPU object is NOT a charitable purpose for that year → ALL income becomes taxable",
      "The 20% limit is tested EVERY YEAR — a one-time breach can be corrected the following year",
      "Education, medical relief, relief of poverty, environment, and yoga trusts are NOT subject to this 20% cap",
    ],
    examples: [
      {
        title: "Chamber of Commerce Breaching the 20% Limit",
        scenario:
          "A city Chamber of Commerce (GPU trust, registered under Section 332) has total receipts of ₹1 crore — ₹75 lakh from membership fees and ₹25 lakh from organising a trade exhibition.",
        calculation:
          "Total gross receipts:                  ₹1,00,00,000\nCommercial receipts (exhibition):      ₹  25,00,000\n\n20% of total receipts:                 ₹  20,00,000\nActual commercial receipts:            ₹  25,00,000  ← EXCEEDS 20%!\n\nConsequence: GPU object fails charitable test\nALL ₹1 crore income taxable at MMR:\nTax @ 30%:                             ₹  30,00,000\n\nIf commercial receipts were ₹18 lakh (18%):\n  GPU object remains charitable ✓\n  Income exempt if 85% applied\n  Tax:                                 ₹           0",
        result:
          "Exceeding the 20% cap by just ₹5 lakh costs the Chamber ₹30 lakh in tax. GPU trusts must monitor commercial revenue monthly and restructure events if they risk crossing this threshold.",
      },
    ],
    relatedSlugs: [
      "npo-commercial-activities-restriction",
      "npo-registration-12a-12ab",
      "npo-specified-violations",
    ],
  },

  {
    slug: "npo-books-of-accounts",
    section2025: "Section 347",
    section1961: "Section 12A, Rule 187 (IT Rules 2026)",
    title: "Books of Accounts — Mandatory for All Charitable Organisations",
    explanation:
      "Every registered NPO must maintain prescribed books of accounts including cash books, ledgers, journals, and statements of receipts and payments. The books must be maintained at the trust's principal office and preserved for at least 10 years. Poor record-keeping is a common reason for loss of exemption during assessments.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 347",
      "NPO books of accounts",
      "charitable trust accounts",
      "rule 187",
      "receipt payment statement",
      "trust records",
      "10 year preservation",
    ],
    whoItApplies:
      "All registered NPOs without exception — from small village charities to large hospital trusts.",
    keyPoints: [
      "Mandatory books: cash book, ledger, journal, and receipts-and-payments account",
      "Books must be maintained at the registered office or principal place of activity",
      "Preservation period: minimum 10 years from the end of the relevant financial year",
      "Failure to maintain proper books can result in cancellation of registration",
      "For trusts with gross receipts above ₹2.5 crore: additional prescribed records are required as per Rules",
      "Electronic records are acceptable provided they can be converted to printed form and verified",
    ],
    examples: [
      {
        title: "Minimum Books Required for a Small Trust",
        scenario:
          "A small charitable trust runs a free coaching centre with annual receipts of ₹15 lakh. What minimum books must it maintain?",
        calculation:
          "Required books for EVERY registered NPO:\n\n1. Cash Book: All cash receipts (donations, fees)\n   and payments (salaries, rent, supplies)\n   Updated: Daily\n\n2. Ledger: Separate accounts for donors, expenses,\n   assets, corpus fund, accumulated funds\n\n3. Receipts & Payments Account:\n   Summary at year end of all money inflows/outflows\n\n4. Income & Expenditure Account:\n   (Like P&L — distinguishes capital and revenue)\n\n5. Balance Sheet:\n   Assets: Fixed assets + Corpus + Reserves\n   Liabilities: Creditors + Grants payable\n\nPreservation: 10 years minimum",
        result:
          "A small trust can use free accounting software — manual books are also valid. These records allow the trust to prepare its ITR (ITR-7) and audit report (Form 10B) and respond to any assessment queries.",
      },
    ],
    relatedSlugs: [
      "npo-audit-accounts",
      "npo-return-of-income",
      "npo-registration-12a-12ab",
      "application-of-income-85-percent",
    ],
  },

  {
    slug: "npo-audit-accounts",
    section2025: "Section 348",
    section1961: "Section 12A, Rule 188, Form 112 (IT Rules 2026)",
    title: "Audit of Accounts — Mandatory for NPOs above ₹2.5 Lakh",
    explanation:
      "Every registered NPO whose total income (before claiming exemption) exceeds ₹2.5 lakh in a year must get its accounts audited by a Chartered Accountant. The audit report in Form 10B (or 10BB for larger trusts) must be filed along with the income tax return.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 348",
      "NPO audit",
      "form 10B",
      "form 10BB",
      "charitable trust audit",
      "CA audit NPO",
      "rule 188",
      "2.5 lakh threshold",
    ],
    whoItApplies:
      "All registered NPOs whose gross receipts exceed ₹2.5 lakh in the year — effectively all active trusts.",
    keyPoints: [
      "Threshold: audit mandatory if total income BEFORE exemption > ₹2.5 lakh",
      "Audit must be conducted by a practicing Chartered Accountant",
      "Form 10B: standard audit report for most NPOs; Form 10BB: for trusts with receipts above ₹5 crore",
      "Audit report must be filed BEFORE the return due date (typically 31 October for trusts with mandatory audit)",
      "Filing audit report after the return due date attracts late fees under Section 427",
      "The auditor verifies: proper books maintained, 85% application met, corpus properly invested, no benefit to specified persons",
    ],
    examples: [
      {
        title: "Consequences of Not Getting Accounts Audited",
        scenario:
          "A charitable trust with income of ₹80 lakh skips the audit (Form 10B) and files its ITR claiming full exemption. The Assessing Officer notices the missing audit report.",
        calculation:
          "Trust income:                          ₹80,00,000\nClaiming exemption (Section 335):      ₹80,00,000\nAudit report (Form 10B):               NOT FILED ✗\n\nConsequences:\n1. Exemption DISALLOWED\n2. Income taxable at MMR (30%):         ₹24,00,000\n   Cess (4%):                           ₹    96,000\n   Total tax:                           ₹24,96,000\n3. Late fee:                            ₹     5,000\n4. Interest u/s 423/424:                ₹ 2,00,000+\n\nIf audit was done and Form 10B filed:\n  Tax:                                  ₹          0",
        result:
          "Skipping the audit costs the trust ₹25+ lakh. The CA's audit fee (typically ₹15,000–₹1 lakh depending on trust size) is negligible compared to the tax and penalty exposure.",
      },
    ],
    relatedSlugs: [
      "npo-return-of-income",
      "npo-books-of-accounts",
      "npo-registration-12a-12ab",
      "application-of-income-85-percent",
    ],
  },

  {
    slug: "npo-return-of-income",
    section2025: "Section 349",
    section1961: "Sections 12A & 139",
    title: "Filing Income Tax Return for Charitable Organisations",
    explanation:
      "Every registered NPO must file an income tax return even if its total tax liability is zero. The return must be filed by 31 October of the assessment year, along with Form 10B (audit report). A late return leads to loss of accumulation benefits and penalties.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 349",
      "NPO return filing",
      "charitable trust ITR",
      "trust return 31 october",
      "form 10",
      "form 10B",
      "ITR-7",
      "NPO ITR filing",
    ],
    whoItApplies:
      "All registered NPOs — filing is mandatory regardless of whether there is any tax payable.",
    keyPoints: [
      "Form ITR-7 is the applicable return form for trusts, NPOs, and political parties",
      "Due date: 31 October of the assessment year (for trusts with mandatory audit)",
      "Form 10 (for accumulation beyond 15%) must be filed BEFORE the return due date",
      "Late filing leads to: loss of Form 10 accumulation benefit (the accumulated amount becomes taxable)",
      "Penalty for late filing: up to ₹5,000 under Section 428 (equivalent to old 234F)",
      "Even zero-tax returns are mandatory — failure to file attracts notices and potential penalties",
    ],
    examples: [
      {
        title: "Impact of Late Return on Accumulation Benefit",
        scenario:
          "A trust with ₹1 crore income wants to accumulate ₹13 lakh via Form 10. The CA audit is done on time. However, the trust misses the 31 October due date and files on 15 December.",
        calculation:
          "Income:                                ₹1,00,00,000\nApplied to objects (87%):              ₹  87,00,000 → Exempt ✓\nWanted to accumulate (Form 10):        ₹  13,00,000\n\nReturn filed: 15 December — LATE\nForm 10 filed: 15 December — LATE\n\nConsequence of late Form 10:\n  ₹13L accumulation DISALLOWED\n  Treated as unapplied income\n  Tax at MMR (30%):                    ₹ 3,90,000\n  Late fee (Section 428):              ₹     5,000\n  Interest (Section 423):              ₹    23,400\n  Total additional cost:               ₹ 4,18,400",
        result:
          "Missing the 31 October deadline cost the trust ₹4.18 lakh. Set a calendar reminder for early October every year — file Form 10 at least two weeks before the return to avoid last-minute issues.",
      },
    ],
    relatedSlugs: [
      "npo-audit-accounts",
      "npo-books-of-accounts",
      "accumulated-income-charitable-trust",
      "application-of-income-85-percent",
    ],
  },

  {
    slug: "npo-permitted-investment-modes",
    section2025: "Section 350",
    section1961: "Section 11(5)",
    title: "Permitted Modes of Investment for Charitable Trusts",
    explanation:
      "Section 350 specifies the 'permitted modes' in which a charitable trust must invest its funds — particularly corpus and accumulated income. Investing in non-permitted modes makes the income attributable to such investments taxable, and can trigger registration cancellation in serious cases.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 350",
      "permitted investment modes",
      "section 11(5)",
      "trust investment",
      "charitable trust FD",
      "government securities",
      "allowed investment NPO",
    ],
    whoItApplies:
      "All registered NPOs — applies specifically to corpus funds, accumulated income set aside via Form 10, and any funds not immediately required for charitable activities.",
    keyPoints: [
      "Permitted modes: government securities, post office deposits, nationalised bank FDs, public financial institutions, listed debentures",
      "NOT permitted: shares of private companies, personal loans, speculative derivatives, unlisted securities",
      "Corpus and Form 10 accumulations MUST be in permitted modes — violation makes income taxable",
      "Day-to-day working funds (to be spent within the year) are NOT required to be in permitted modes",
      "Trust can hold immovable property for use in charitable activities — not treated as 'investment' for this purpose",
      "Existing non-permitted investments must be converted within 1 year of the violation being noticed",
    ],
    examples: [
      {
        title: "Trust Investing Corpus in Non-Permitted Mode",
        scenario:
          "A charitable trust has a corpus fund of ₹80 lakh. The trustee invests ₹50 lakh in shares of a private limited company and ₹30 lakh in a nationalised bank FD.",
        calculation:
          "Corpus fund:                           ₹80,00,000\n\nInvestment 1: Private company shares   ₹50,00,000\n  → NOT a permitted mode ✗\n\nInvestment 2: Nationalised bank FD     ₹30,00,000\n  → Permitted mode ✓\n\nConsequence for ₹50L non-permitted investment:\n  Income attributable (6% on ₹50L):    ₹ 3,00,000\n  Taxable at MMR (30%):                ₹   90,000\n  Plus: registration cancellation risk",
        result:
          "The ₹50 lakh must be immediately moved to a permitted mode. The trust should create a written investment policy listing only government securities, nationalised bank FDs, and public financial institutions to prevent such errors.",
      },
    ],
    relatedSlugs: [
      "corpus-donation",
      "accumulated-income-charitable-trust",
      "npo-registration-12a-12ab",
      "npo-specified-violations",
    ],
  },

  {
    slug: "npo-specified-violations",
    section2025: "Section 351",
    section1961: "Sections 12AB & 13",
    title: "Specified Violations — When NPO Registration is Cancelled",
    explanation:
      "Section 351 lists specific violations that can lead to cancellation of an NPO's registration — the most severe outcome for a charitable trust. Key violations include applying income for non-charitable purposes, benefiting specified persons, issuing fake donation receipts, not maintaining books, and deliberate non-compliance.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 351",
      "NPO violations",
      "registration cancellation",
      "12AB cancellation",
      "charitable trust violation",
      "fake receipt",
      "trustee benefit",
      "specified violation",
    ],
    whoItApplies:
      "All registered NPOs — any trust can face registration cancellation if it commits a specified violation.",
    keyPoints: [
      "Applying income for non-charitable purposes or personal benefit of trustees — specified violation",
      "Investing in non-permitted modes — specified violation",
      "Applying funds outside India without approval — specified violation",
      "Issuing false donation receipts or claiming receipts without actually receiving donations — specified violation",
      "Carrying on commercial activities beyond the permitted threshold — specified violation",
      "On cancellation: trust's income for that year is FULLY taxable at MMR with no exemption",
    ],
    examples: [
      {
        title: "Fake Donation Receipts — Worst Case Consequence",
        scenario:
          "A registered education trust issues ₹50 lakh worth of fake 80G receipts to donors who made no actual donations. The AO discovers this during assessment.",
        calculation:
          "Specified violation: Issuing false receipts ✓\n\nConsequences:\n1. Registration CANCELLED under Section 351\n\n2. Trust income for violation year:\n   Income:                              ₹40,00,000\n   Exemption: DISALLOWED\n   Tax at MMR (30%):                    ₹12,00,000\n\n3. Accreted income tax (Section 352):\n   FMV of all assets (say ₹2 crore):\n   Exit tax (30%):                      ₹60,00,000\n\n4. Prosecution risk:\n   Criminal liability for trustees\n\n5. For donors:\n   80G claims disallowed + interest",
        result:
          "Fake donation receipts trigger registration cancellation, ₹72 lakh+ in tax, and criminal prosecution for trustees. This is one of the most serious offences under the IT Act.",
      },
    ],
    relatedSlugs: [
      "npo-accreted-income-exit-tax",
      "npo-other-violations",
      "npo-registration-12a-12ab",
      "npo-specified-income",
    ],
  },

  {
    slug: "npo-accreted-income-exit-tax",
    section2025: "Section 352",
    section1961: "Sections 12AC, 115TD, 115TE, 115TF",
    title: "Exit Tax on Accreted Income — NPO Dissolution or Conversion",
    explanation:
      "When a registered NPO converts to a non-charitable entity, merges with a non-NPO, or has its registration cancelled, a 30% 'exit tax' is levied on its 'accreted income' — the excess of FMV of all assets over total liabilities on the date of conversion or cancellation. This prevents charities from accumulating tax-free assets and then converting to commercial entities.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 352",
      "accreted income",
      "exit tax NPO",
      "115TD",
      "115TE",
      "115TF",
      "30 percent exit tax",
      "NPO dissolution",
      "trust conversion",
      "trust winding up",
    ],
    whoItApplies:
      "Registered NPOs whose registration is cancelled, who convert to a non-charitable entity, or who merge with a non-NPO body.",
    keyPoints: [
      "Exit tax = 30% of (FMV of all assets − Total liabilities) on the date of conversion/cancellation",
      "Triggered by: registration cancellation, voluntary winding up, conversion to company/firm, merger with non-NPO",
      "NOT triggered if assets are transferred to ANOTHER registered NPO — this is the escape route",
      "Tax must be paid within 14 days of the conversion or cancellation date",
      "Failure to pay attracts recovery proceedings and interest from the due date",
      "Even trustees can be held personally liable for payment in case of trust default",
    ],
    examples: [
      {
        title: "Trust Converting to Private Limited Company",
        scenario:
          "Sunrise Education Trust (registered NPO) converts to Sunrise Education Pvt. Ltd. on 1 April 2027. On that date: FMV of assets = ₹8 crore, liabilities = ₹1.5 crore.",
        calculation:
          "Date of conversion:                    1 April 2027\n\nFMV of all assets:                     ₹8,00,00,000\nLess: Total liabilities:               ₹1,50,00,000\nAccreted income:                       ₹6,50,00,000\n\nExit tax @ 30%:                        ₹1,95,00,000\nAdd: 4% cess:                          ₹    7,80,000\nTotal exit tax payable:                ₹2,02,80,000\nDue date:                              15 April 2027\n\nAlternative — Transfer to another NPO:\n  Exit tax:                            ₹           0",
        result:
          "Converting to a company triggers ₹2.03 crore in exit tax. The trust should instead merge with another charitable education trust — this avoids exit tax entirely and preserves assets for charitable purposes.",
      },
    ],
    relatedSlugs: [
      "npo-regime-switching",
      "npo-specified-violations",
      "npo-registration-12a-12ab",
      "corpus-donation",
    ],
  },

  {
    slug: "npo-other-violations",
    section2025: "Section 353",
    section1961: "Sections 13 & 115BI",
    title: "Other Violations by Charitable Organisations",
    explanation:
      "Section 353 covers violations by NPOs that are less severe than Section 351 specified violations but still result in partial or full loss of exemption. These include failure to comply with audit requirements, missing return deadlines, applying income for purposes outside the trust deed, and other procedural non-compliance.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 353",
      "NPO other violations",
      "115BI",
      "section 13 violation",
      "trust non-compliance",
      "minor violation NPO",
    ],
    whoItApplies:
      "Registered NPOs that commit procedural non-compliance or apply funds for purposes not strictly within their trust deed objects.",
    keyPoints: [
      "Applying income for objects not stated in the trust deed — the relevant income becomes taxable",
      "Failure to file audit report or return by due date — accumulation benefits under Form 10 are lost",
      "Using trust funds for activities in a different geographic area not covered by the trust deed — scrutiny risk",
      "Unlike specified violations (Section 351), these do not automatically cancel registration",
      "The AO can issue show-cause notices and give the trust an opportunity to rectify before imposing tax",
    ],
    examples: [
      {
        title: "Trust Spending on Activity Outside Its Trust Deed",
        scenario:
          "A trust registered to 'provide medical relief in District X' spends ₹10 lakh on medical camps in District Y. Total income: ₹50 lakh.",
        calculation:
          "Trust deed object: Medical relief in District X\n\nExpenditure in District Y:             ₹10,00,000\n  → NOT within stated objects ✗\n\nShortfall calculation:\n  Required application (85% of ₹50L): ₹42,50,000\n  Applied to District X:               ₹35,00,000\n  Applied to District Y (not counted): ₹10,00,000\n\nShortfall (₹42.5L − ₹35L):            ₹ 7,50,000\nTaxable at MMR (30%):                  ₹ 2,25,000",
        result:
          "The trust faces ₹2.33 lakh in tax (including cess) plus scrutiny risk. Fix: Amend the trust deed to include all districts/geographies where the trust operates, or obtain CIT approval before expanding geographic coverage.",
      },
    ],
    relatedSlugs: [
      "npo-specified-violations",
      "npo-registration-12a-12ab",
      "npo-return-of-income",
      "npo-audit-accounts",
    ],
  },

  {
    slug: "npo-80g-approval",
    section2025: "Section 354",
    section1961: "Section 80G",
    title: "80G Approval — Enabling Tax Deduction for Donors",
    explanation:
      "Section 354 governs the application by a registered NPO to get its donations approved under Section 133 (80G), which allows donors to claim tax deductions. 80G approval is separate from the NPO's own registration under Section 332 — it benefits the DONOR, not the NPO itself.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 354",
      "80G approval",
      "donor deduction",
      "form 10A 80G",
      "form 10AB 80G",
      "section 133 approval",
      "donation receipt validity",
      "trust 80G registration",
    ],
    whoItApplies:
      "Registered NPOs that wish to issue 80G receipts to donors, enabling those donors to claim tax deductions on their contributions.",
    keyPoints: [
      "80G approval must be separately applied for — Section 332 registration alone does NOT give donors the 80G benefit",
      "Application for 80G is typically filed simultaneously with Section 332 registration (Form 10A includes both)",
      "Valid for 5 years and must be renewed along with the Section 332 registration renewal",
      "NPO must issue stamped receipts with its PAN and 80G registration number for each donation",
      "Cash donations above ₹2,000 cannot be accepted and still be eligible for 80G deduction by donors",
      "If 80G approval lapses: donations received during the lapsed period are NOT eligible for donor deduction",
    ],
    examples: [
      {
        title: "Donor Verifying 80G Approval Before Donating",
        scenario:
          "Ashok wants to donate ₹2 lakh to Hope Charitable Trust in November 2026 and claim 80G deduction. How does he verify the trust's approval status?",
        calculation:
          "Step 1: Request stamped receipt showing:\n  Trust PAN:            AAATH1234X\n  80G Reg No:           AAATH1234XE20240\n  Valid from/to:        1 Apr 2024 – 31 Mar 2029\n\nStep 2: Verify on IT e-filing portal:\n  Search by PAN → Confirm 80G status is active ✓\n\nStep 3: Claim in ITR:\n  Donation:                            ₹2,00,000\n  Category: 50% deduction with limit\n  GTI:                                 ₹15,00,000\n  Qualifying limit (10%):              ₹1,50,000\n  Eligible (lower):                    ₹1,50,000\n  Deduction (50%):                     ₹   75,000\n  Tax saved (30% + cess):              ₹   23,400",
        result:
          "Always verify 80G status on the IT portal before donating large amounts. If a trust's 80G approval has lapsed, the donor gets no deduction. The trust must renew its 80G approval BEFORE accepting donations to keep the benefit alive for donors.",
      },
    ],
    relatedSlugs: [
      "donations-80g",
      "npo-registration-12a-12ab",
      "donations-80gga-scientific-rural",
      "npo-specified-violations",
    ],
  },

  {
    slug: "npo-chapter-interpretations",
    section2025: "Section 355",
    section1961: "Sections 2(15), 11, 12, 13, 115BBC, 115TD–115TF",
    title: "Key Definitions for the Charitable Trust Chapter",
    explanation:
      "Section 355 consolidates the definitions of key terms used throughout the NPO/charitable trust chapter — including 'charitable purpose', 'author of the trust', 'specified person', 'regular income', and 'voluntary contribution'. Understanding these definitions is essential for correctly applying all other sections in this chapter.",
    category: "Charitable Trusts & NPOs",
    keywords: [
      "section 355",
      "charitable purpose definition",
      "specified person definition",
      "author of trust",
      "voluntary contribution",
      "2(15) definition",
      "NPO definitions",
      "religious trust definition",
    ],
    whoItApplies:
      "Relevant to all registered NPOs and their advisors when interpreting and applying the provisions of the charitable trust chapter.",
    keyPoints: [
      "'Charitable purpose' includes: relief of poor, education, yoga, medical relief, environment preservation, preservation of monuments, and General Public Utility (GPU)",
      "'Specified person' = author of trust, trustee, person making a substantial contribution (>₹50,000), and their relatives",
      "'Voluntary contribution' = any donation made without any service or goods in return",
      "'Author of trust' = the person who originally created the trust deed and contributed the initial assets",
      "Definition of 'relative' is broad — includes spouse, children, siblings, parents, and their spouses",
    ],
    examples: [
      {
        title: "Testing Whether a Payment is to a Specified Person",
        scenario:
          "A charitable trust pays ₹3 lakh to a CA firm for audit services. The CA is the son-in-law of one of the trustees. Is this a benefit to a 'specified person'?",
        calculation:
          "Trustee's son-in-law = 'relative' of trustee\nRelative of trustee = 'specified person' under Section 355\n\nPayment of ₹3L to CA firm (son-in-law's firm):\n  Nature: Professional fee for audit service\n\nIs it at arm's length rate?\n  If market rate is ₹2.5L but paid ₹3L:\n    Excess ₹50,000 = Benefit to specified person ✗\n    → Specified income (Section 337)\n    Tax at MMR (30%):                    ₹   15,000\n\n  If ₹3L IS the fair market rate:\n    No excess benefit → Not specified income ✓\n    Tax:                                 ₹         0",
        result:
          "All transactions with relatives of trustees must be at arm's length market rates and documented with quotes from at least two other comparable service providers. Overpaying a related party — even for genuine services — creates a tax liability for the trust.",
      },
    ],
    relatedSlugs: [
      "npo-specified-income",
      "npo-specified-violations",
      "npo-registration-12a-12ab",
      "general-public-utility-commercial-limit",
    ],
  },
];
