export type Category =
  | "Residential Status"
  | "Income Heads"
  | "House Property"
  | "Deductions"
  | "Tax Computation"
  | "Capital Gains"
  | "TDS"
  | "Advance Tax"
  | "Interest & Penalties"
  | "Special Income";

export interface SectionEntry {
  section2025: string;
  section1961: string;
  title: string;
  explanation: string;
  category: Category;
  keywords: string[];
}

export const CATEGORIES: Category[] = [
  "Residential Status",
  "Income Heads",
  "House Property",
  "Deductions",
  "Tax Computation",
  "Capital Gains",
  "TDS",
  "Advance Tax",
  "Interest & Penalties",
  "Special Income",
];

export const SECTIONS: SectionEntry[] = [
  // ── Residential Status ──────────────────────────────────────────────────────
  {
    section2025: "Section 6(2)(a)",
    section1961: "Section 6(1)(a)",
    title: "Resident — 182-day test",
    explanation: "You are Resident in India if you are physically present in India for 182 or more days during the Tax Year. Both the day of arrival and departure count as full days.",
    category: "Residential Status",
    keywords: ["resident", "182 days", "residential status", "NRI", "6"],
  },
  {
    section2025: "Section 6(2)(b)",
    section1961: "Section 6(1)(c)",
    title: "Resident — 60/120-day + 365-day test",
    explanation: "You are also Resident if you are in India for 60+ days this year (120+ days for certain citizens/PIOs) AND were in India for 365+ days over the preceding 4 years. Several exceptions apply to Indian citizens leaving for employment or as ship crew.",
    category: "Residential Status",
    keywords: ["resident", "60 days", "120 days", "365 days", "prior years", "residential status"],
  },
  {
    section2025: "Section 6(5)",
    section1961: "Section 6(1) proviso",
    title: "120-day modified threshold for high-income visitors",
    explanation: "For Indian citizens or PIOs who visit India from abroad, if their income from Indian sources exceeds ₹15 lakh, the 60-day threshold in 6(2)(b) is raised to 120 days. Below ₹15 lakh, Section 6(4) applies instead and disables 6(2)(b) entirely.",
    category: "Residential Status",
    keywords: ["120 days", "high income", "15 lakh", "visitor", "NRI", "PIO", "residential status"],
  },
  {
    section2025: "Section 6(7)",
    section1961: "Section 6(1A)",
    title: "Deemed Resident — anti-avoidance",
    explanation: "An Indian citizen who is not resident under Sections 6(2)–6(6) but whose Indian income exceeds ₹15 lakh and who is not liable to tax in any other country is treated as a Deemed Resident. Deemed residents are always RNOR per Section 6(13)(c).",
    category: "Residential Status",
    keywords: ["deemed resident", "15 lakh", "anti-avoidance", "RNOR", "stateless"],
  },
  {
    section2025: "Section 6(13)",
    section1961: "Section 6(6)",
    title: "Not Ordinarily Resident (RNOR)",
    explanation: "A Resident is classified as RNOR if: (a)(i) they were Non-Resident in 9 of the preceding 10 years, OR (a)(ii) they were in India for 729 days or fewer over the preceding 7 years, OR (b) they are a citizen/PIO who spent 120–181 days in India this year with income above ₹15 lakh, OR (c) they are a Deemed Resident under Section 6(7).",
    category: "Residential Status",
    keywords: ["RNOR", "not ordinarily resident", "9 years", "729 days", "returning NRI"],
  },

  // ── Income Heads ───────────────────────────────────────────────────────────
  {
    section2025: "Section 14",
    section1961: "Section 14",
    title: "Heads of Income",
    explanation: "Total income is classified under five heads: (A) Salaries, (B) Income from House Property, (C) Profits and Gains of Business or Profession, (D) Capital Gains, and (E) Income from Other Sources. Tax is computed on the aggregate of all five heads after set-offs.",
    category: "Income Heads",
    keywords: ["heads of income", "five heads", "salary", "house property", "capital gains", "other sources", "PGBP"],
  },
  {
    section2025: "Section 15",
    section1961: "Section 15",
    title: "Salaries — Charging Section",
    explanation: "Salary income is taxable in the year it is due, paid, or whichever is earlier. This head covers basic pay, dearness allowance, bonus, commission, allowances, and perquisites from your employer.",
    category: "Income Heads",
    keywords: ["salary", "wages", "basic pay", "allowances", "perquisites", "employer"],
  },
  {
    section2025: "Section 17",
    section1961: "Section 16(ia)",
    title: "Standard Deduction from Salary",
    explanation: "A flat deduction from salary income — ₹75,000 under the default regime, ₹50,000 under the optional regime. No receipts needed; it is automatically applied by your employer when computing TDS.",
    category: "Income Heads",
    keywords: ["standard deduction", "75000", "50000", "salary", "salaried"],
  },
  {
    section2025: "Section 56",
    section1961: "Section 56",
    title: "Income from Other Sources",
    explanation: "Catch-all head for income not taxable under any other head. Includes bank FD interest, savings account interest, dividends, gifts above ₹50,000 from non-relatives, online gaming winnings, lottery, and crossword prize winnings.",
    category: "Income Heads",
    keywords: ["other sources", "interest", "dividend", "gift", "lottery", "FD interest", "online gaming"],
  },

  // ── House Property ─────────────────────────────────────────────────────────
  {
    section2025: "Section 20",
    section1961: "Section 22",
    title: "House Property — Charging Section",
    explanation: "Income from buildings or land appurtenant to them, of which the taxpayer is the owner, is taxed under this head. The annual value of the property forms the basis of computation.",
    category: "House Property",
    keywords: ["house property", "property income", "rental income", "owner", "building"],
  },
  {
    section2025: "Section 21",
    section1961: "Section 23",
    title: "Annual Value of House Property",
    explanation: "The annual value (AV) is the amount the property can reasonably be expected to fetch as annual rent. For a self-occupied property, the AV is nil (up to 2 self-occupied properties). For let-out property, it is the higher of actual rent or expected rent.",
    category: "House Property",
    keywords: ["annual value", "self-occupied", "let out", "nil annual value", "expected rent", "actual rent"],
  },
  {
    section2025: "Section 22",
    section1961: "Section 24",
    title: "Deductions from House Property Income",
    explanation: "Two deductions from annual value: (a) 30% standard deduction (for let-out properties only, covers repairs and maintenance without receipts), and (b) interest on housing loan — up to ₹2 lakh for self-occupied property; no cap for let-out property.",
    category: "House Property",
    keywords: ["30% deduction", "home loan interest", "housing loan", "deduction from HP", "self-occupied interest"],
  },
  {
    section2025: "Section 71",
    section1961: "Section 24(b)",
    title: "Home Loan Interest — Deduction Limit",
    explanation: "Interest paid on loan taken for construction, purchase, repair, renewal, or reconstruction of house property is deductible. For self-occupied property, the aggregate deduction is capped at ₹2,00,000 per year across all properties. For let-out property, the full interest is deductible (with set-off limit).",
    category: "House Property",
    keywords: ["home loan interest", "housing loan", "24b", "2 lakh", "self-occupied", "let out", "interest on loan"],
  },

  // ── Deductions ─────────────────────────────────────────────────────────────
  {
    section2025: "Section 123",
    section1961: "Section 80C",
    title: "Investments & Insurance Premium (₹1.5L limit)",
    explanation: "Deduction up to ₹1,50,000 for specified investments: Employee Provident Fund (EPF), Public Provident Fund (PPF), Equity Linked Savings Scheme (ELSS), Life Insurance premiums, principal repayment on home loan, NSC, Sukanya Samriddhi, 5-year tax-saving FD, and tuition fees for children. Only under the optional regime.",
    category: "Deductions",
    keywords: ["80C", "PPF", "EPF", "ELSS", "LIC", "mutual fund", "tax saving", "1.5 lakh", "150000", "NSC", "investment", "deduction"],
  },
  {
    section2025: "Section 127",
    section1961: "Section 80CCD(1B)",
    title: "Additional NPS Contribution (₹50,000)",
    explanation: "An additional deduction of up to ₹50,000 for voluntary contributions to National Pension System (NPS) Tier-I account. This is over and above the ₹1.5 lakh limit under Section 123. Only under the optional regime.",
    category: "Deductions",
    keywords: ["NPS", "national pension", "80CCD", "50000", "additional deduction", "pension"],
  },
  {
    section2025: "Section 128",
    section1961: "Section 80CCC",
    title: "Pension Fund Premium",
    explanation: "Deduction for premium paid toward any annuity plan of LIC or other insurer for receiving pension. The deduction is included within the overall ₹1.5 lakh limit of Section 123.",
    category: "Deductions",
    keywords: ["pension fund", "annuity", "LIC", "80CCC", "pension premium"],
  },
  {
    section2025: "Section 130",
    section1961: "Section 80D",
    title: "Health Insurance Premium",
    explanation: "Deduction for medical insurance premium paid for self, spouse, children (up to ₹25,000) and separately for parents (up to ₹25,000; ₹50,000 if parents are senior citizens). Aggregate maximum ₹75,000 if both self and senior-citizen parents are covered. Preventive health check-up: ₹5,000 within the limit.",
    category: "Deductions",
    keywords: ["health insurance", "medical insurance", "80D", "25000", "50000", "senior citizen", "parents", "mediclaim"],
  },
  {
    section2025: "Section 133",
    section1961: "Section 80E",
    title: "Education Loan Interest",
    explanation: "Full deduction of interest paid on education loan for higher education (in India or abroad) for self, spouse, or children. Applies for the year repayment begins and 7 immediately following years. No cap on amount, but only interest qualifies — not principal.",
    category: "Deductions",
    keywords: ["education loan", "student loan", "80E", "higher education", "interest", "8 years"],
  },
  {
    section2025: "Section 134",
    section1961: "Section 80GG",
    title: "Rent Paid (No HRA received)",
    explanation: "Deduction for rent paid when you do not receive HRA from your employer. Limited to the least of: (a) ₹5,000/month, (b) 25% of total income, or (c) actual rent minus 10% of total income. You must not own any residential property in the city where you live or work.",
    category: "Deductions",
    keywords: ["rent paid", "80GG", "no HRA", "self-employed", "rent deduction", "5000 per month"],
  },
  {
    section2025: "Section 149",
    section1961: "Section 80TTA",
    title: "Savings Account Interest (₹10,000)",
    explanation: "Deduction up to ₹10,000 on interest earned from savings bank accounts with banks, co-operative societies, and post offices. Not available to senior citizens (who get a higher deduction under Section 150 instead). Only under the optional regime.",
    category: "Deductions",
    keywords: ["savings account interest", "80TTA", "10000", "bank interest", "savings interest"],
  },
  {
    section2025: "Section 150",
    section1961: "Section 80TTB",
    title: "Senior Citizen Deposit Interest (₹50,000)",
    explanation: "For taxpayers aged 60 or above, deduction up to ₹50,000 on interest from all deposits — savings accounts, fixed deposits, and recurring deposits — with banks and post offices. Replaces Section 149 for senior citizens.",
    category: "Deductions",
    keywords: ["senior citizen", "80TTB", "50000", "FD interest", "deposit interest", "60 years"],
  },

  // ── Tax Computation ─────────────────────────────────────────────────────────
  {
    section2025: "Section 202",
    section1961: "Section 115BAC",
    title: "Default Tax Regime — Slabs",
    explanation: "The default tax regime applies automatically unless you opt out. Slabs: Nil up to ₹4L; 5% from ₹4L–8L; 10% from ₹8L–12L; 15% from ₹12L–16L; 20% from ₹16L–20L; 25% from ₹20L–24L; 30% above ₹24L. Standard deduction ₹75,000. Zero tax if income ≤ ₹12L (Section 156 rebate).",
    category: "Tax Computation",
    keywords: ["default regime", "new regime", "slabs", "tax rates", "115BAC", "4 lakh", "12 lakh", "rebate"],
  },
  {
    section2025: "Section 156",
    section1961: "Section 87A",
    title: "Tax Rebate — Zero Tax up to ₹12 Lakh",
    explanation: "Under the default regime, if your total income does not exceed ₹12,00,000, a rebate equal to your full tax liability is allowed, resulting in zero tax payable. This applies to resident individuals only. Income above ₹12L is taxed in full at slab rates with no rebate.",
    category: "Tax Computation",
    keywords: ["rebate", "87A", "zero tax", "12 lakh", "12 lakhs", "nil tax", "tax free income"],
  },

  // ── Capital Gains ───────────────────────────────────────────────────────────
  {
    section2025: "Section 196",
    section1961: "Section 111A",
    title: "STCG on Listed Equity (STT paid) — 20%",
    explanation: "Short-term capital gains on sale of equity shares or equity-oriented mutual fund units where Securities Transaction Tax (STT) has been paid are taxed at 20%. Gains are short-term if the asset is held for 12 months or less.",
    category: "Capital Gains",
    keywords: ["STCG", "short term capital gains", "equity", "shares", "mutual fund", "111A", "20%", "STT"],
  },
  {
    section2025: "Section 197",
    section1961: "Section 112",
    title: "LTCG on Assets (General) — 12.5%",
    explanation: "Long-term capital gains on sale of assets (other than listed equity covered by Section 198) are taxed at 12.5% without indexation. Covers unlisted shares, debt mutual funds, property, gold, and other capital assets held for more than 24 months (36 months for immovable property).",
    category: "Capital Gains",
    keywords: ["LTCG", "long term capital gains", "property", "gold", "unlisted", "debt fund", "112", "12.5%"],
  },
  {
    section2025: "Section 198",
    section1961: "Section 112A",
    title: "LTCG on Listed Equity (STT paid) — 12.5% above ₹1.25L",
    explanation: "Long-term capital gains on sale of listed equity shares or equity mutual fund units (with STT) are taxed at 12.5%. The first ₹1,25,000 of such gains per year is exempt. Equity assets must be held for more than 12 months to qualify as long-term.",
    category: "Capital Gains",
    keywords: ["LTCG", "long term", "equity", "shares", "mutual fund", "112A", "12.5%", "1.25 lakh", "125000", "STT", "listed"],
  },

  // ── TDS ─────────────────────────────────────────────────────────────────────
  {
    section2025: "Section 392",
    section1961: "Section 192",
    title: "TDS on Salary",
    explanation: "Your employer is required to deduct TDS from your salary every month. The employer estimates your total annual income, applies the regime and deductions you've declared, computes the annual tax, and divides it by 12. At year-end, Form 16 is issued as the TDS certificate.",
    category: "TDS",
    keywords: ["TDS", "salary", "employer", "Form 16", "192", "tax deducted at source", "monthly deduction"],
  },
  {
    section2025: "Section 392 / Form 12B",
    section1961: "Section 192(2)",
    title: "Multiple Employers — Form 12B",
    explanation: "If you change jobs during the year, you must submit Form 12B to your new employer disclosing the salary and TDS from your previous employer. This ensures the new employer deducts correct TDS on the aggregate income and avoids a shortfall at filing time.",
    category: "TDS",
    keywords: ["multiple employers", "Form 12B", "job change", "previous employer", "TDS shortfall", "192(2)"],
  },

  // ── Advance Tax ─────────────────────────────────────────────────────────────
  {
    section2025: "Sections 403–408",
    section1961: "Sections 208–211",
    title: "Advance Tax — Obligation and Instalments",
    explanation: "If your net tax liability (after TDS) exceeds ₹10,000, you must pay advance tax in four instalments: 15% by June 15; 45% by September 15; 75% by December 15; 100% by March 15. Failure to pay or underpayment attracts interest under Sections 424 and 425.",
    category: "Advance Tax",
    keywords: ["advance tax", "quarterly", "15% June", "45% September", "75% December", "100% March", "instalments", "10000"],
  },
  {
    section2025: "Section 403",
    section1961: "Section 207",
    title: "Senior Citizens Exempt from Advance Tax",
    explanation: "A resident individual aged 60 years or above who does not have any income from business or profession is not required to pay advance tax. Their entire tax liability can be paid through self-assessment tax at the time of filing.",
    category: "Advance Tax",
    keywords: ["senior citizen", "advance tax", "exempt", "60 years", "no business", "207"],
  },

  // ── Interest & Penalties ────────────────────────────────────────────────────
  {
    section2025: "Section 423",
    section1961: "Section 234A",
    title: "Interest for Late Filing of Return",
    explanation: "If you file your ITR after the due date (typically July 31), simple interest at 1% per month (or part of a month) is charged on the unpaid tax amount, from the due date to the actual date of filing. Filing after December 31 also attracts a late filing fee.",
    category: "Interest & Penalties",
    keywords: ["late filing", "234A", "interest", "penalty", "July 31", "due date", "1% per month"],
  },
  {
    section2025: "Section 424",
    section1961: "Section 234B",
    title: "Interest for Default in Advance Tax",
    explanation: "If you paid less than 90% of your assessed tax liability as advance tax (or paid nothing), interest at 1% per month is charged from April 1 of the assessment year to the date of actual payment. This applies even if you paid all advance tax instalments but the total was below 90%.",
    category: "Interest & Penalties",
    keywords: ["234B", "advance tax default", "90%", "interest", "April 1", "shortfall"],
  },
  {
    section2025: "Section 425",
    section1961: "Section 234C",
    title: "Interest for Deferment of Advance Tax Instalment",
    explanation: "If you miss or underpay an advance tax instalment (paying less than the required cumulative % by each due date), interest at 1% per month is charged for 3 months on the shortfall for each instalment. This is in addition to any Section 424 interest.",
    category: "Interest & Penalties",
    keywords: ["234C", "deferment", "instalment", "1%", "3 months", "quarterly", "advance tax interest"],
  },

  // ── Special Income ──────────────────────────────────────────────────────────
  {
    section2025: "Section 171",
    section1961: "Section 115BBH",
    title: "Virtual Digital Assets (Crypto) — 30%",
    explanation: "Income from transfer of Virtual Digital Assets (VDA) — including cryptocurrency, NFTs, and other digital tokens — is taxed at a flat 30% with no deduction for any expense (except cost of acquisition). Losses from VDA cannot be set off against any other income.",
    category: "Special Income",
    keywords: ["crypto", "cryptocurrency", "VDA", "NFT", "bitcoin", "digital asset", "30%", "115BBH", "virtual digital"],
  },
  {
    section2025: "Section 58",
    section1961: "Section 44AD / 44ADA",
    title: "Presumptive Taxation — Small Business & Professionals",
    explanation: "Small businesses with turnover up to ₹3 crore (₹2 crore for digital receipts) and professionals with receipts up to ₹75 lakh can declare income at a deemed rate (8% or 6% for business; 50% for professionals) without maintaining detailed books of accounts. Advance tax must be paid as one instalment by March 15.",
    category: "Special Income",
    keywords: ["presumptive taxation", "44AD", "44ADA", "small business", "freelancer", "professional", "3 crore", "50%"],
  },
  {
    section2025: "Schedule III",
    section1961: "Section 10(13A)",
    title: "HRA Exemption",
    explanation: "House Rent Allowance received from employer is exempt up to the least of: (a) actual HRA received, (b) rent paid minus 10% of basic salary, or (c) 50% of basic salary for metros (Delhi, Mumbai, Chennai, Kolkata) or 40% for non-metros. Only available under the optional regime and only if you actually pay rent.",
    category: "Deductions",
    keywords: ["HRA", "house rent allowance", "10(13A)", "rent", "metro", "non-metro", "50%", "40%", "Schedule III"],
  },
];
