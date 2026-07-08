export type DetailedCategory =
  | "Capital Gains"
  | "Corporate Tax"
  | "TDS & TCS"
  | "Business & Profession"
  | "Deductions"
  | "International Tax"
  | "Special Income"
  | "Charitable Trusts & NPOs";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "numbered"; items: string[] }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "callout"; variant: "info" | "warning" | "tip"; text: string }
  | { type: "diagram"; id: string }
  | {
      type: "table";
      headers: string[];
      rows: { cells: string[]; bold?: boolean }[];
    }
  | {
      type: "calculation";
      rows: {
        label: string;
        amount: string;
        indent?: boolean;
        total?: boolean;
        negative?: boolean;
      }[];
    };

export interface DetailedEntry {
  slug: string;
  section2025: string;
  section1961: string;
  title: string;
  summary: string;
  category: DetailedCategory;
  keywords: string[];
  lastUpdated: string;
  content: ContentBlock[];
}

export const DETAILED_CATEGORIES: DetailedCategory[] = [
  "Capital Gains",
  "Corporate Tax",
  "TDS & TCS",
  "Business & Profession",
  "Deductions",
  "International Tax",
  "Special Income",
  "Charitable Trusts & NPOs",
];

export const DETAILED_ENTRIES: DetailedEntry[] = [
  {
    slug: "buyback-of-securities",
    section2025: "Sections 68–69 & 196",
    section1961: "Section 46A & 115QA",
    title: "Taxation in Case of Buyback of Securities",
    summary:
      "Complete tax treatment of share buybacks — both in the hands of the company and the shareholder, including the special additional tax that applies when the seller is a promoter.",
    category: "Capital Gains",
    keywords: [
      "buyback",
      "share buyback",
      "section 69",
      "section 68 companies act",
      "section 196",
      "promoter buyback",
      "LTCG buyback",
      "STCG buyback",
      "115QA",
      "46A",
      "extinguishment of rights",
    ],
    lastUpdated: "2026-07-08",
    content: [
      {
        type: "heading",
        text: "Tax Treatment in the Hands of the Company",
      },
      {
        type: "paragraph",
        text: "No tax is applicable on the company when it buys back its own shares or specified securities.",
      },
      {
        type: "heading",
        text: "Tax Treatment in the Hands of the Shareholder",
      },
      {
        type: "paragraph",
        text: "Under Section 69 of the Income Tax Act 2025, any capital gain arising out of a buyback is taxable in the hands of the shareholders.",
      },
      {
        type: "bullets",
        items: [
          "Buyback of shares is treated as extinguishment of rights — hence taxed under Capital Gains and not as dividend",
          "The buyback price is treated as the Fair Value of Consideration for computing the capital gain",
          "The cost of acquisition is the price at which the shares or securities were originally purchased",
          "The period of holding runs from the date of purchase of the share/security until the buyback date",
        ],
      },
      {
        type: "subheading",
        text: "Capital Gain Computation",
      },
      {
        type: "table",
        headers: ["Particulars", "Amount"],
        rows: [
          { cells: ["Fair Value of Consideration (Buy Back Price)", "XXX"] },
          { cells: ["Less: Cost of Acquisition (Cost of Purchase)", "(XXX)"] },
          { cells: ["LTCG / STCG", "XXX"], bold: true },
        ],
      },
      {
        type: "callout",
        variant: "info",
        text: "Whether the gain is LTCG or STCG depends on the holding period. Listed equity shares held for more than 12 months qualify as LTCG; unlisted shares/securities require 24 months.",
      },
      {
        type: "heading",
        text: "Additional Tax When Seller is a Promoter",
      },
      {
        type: "paragraph",
        text: "If the buyback is made under Section 68 of the Companies Act, 2013 and the holder of the share/specified securities is a promoter of the company, an additional income tax under Section 196 of the IT Act 2025 is levied on top of the regular capital gains tax.",
      },
      {
        type: "table",
        headers: [
          "Particulars",
          "Additional Rate — Domestic Company Promoter",
          "Additional Rate — Other than Domestic Company",
        ],
        rows: [
          {
            cells: [
              "STCG under Section 196 arising out of transfer of securities via buyback",
              "2%",
              "10%",
            ],
          },
          {
            cells: [
              "LTCG under Sections 197 & 198 arising out of transfer of securities via buyback",
              "9.5%",
              "17.5%",
            ],
          },
        ],
      },
      {
        type: "bullets",
        items: [
          "Surcharge @ flat 12% and Health & Education Cess @ 4% are applicable on the additional tax computed above",
          "Effective additional tax rates (excluding surcharge and cess): Domestic Company — 22%; Other than Domestic Company — 30%",
        ],
      },
      {
        type: "callout",
        variant: "warning",
        text: "The additional tax under Section 196 is over and above the regular capital gains tax rate applicable to the promoter on the STCG or LTCG. It is not a replacement — both apply.",
      },
      {
        type: "heading",
        text: "Who Qualifies as a 'Promoter'?",
      },
      {
        type: "paragraph",
        text: "A person is considered a 'promoter' for this purpose if they fall under any of the following definitions:",
      },
      {
        type: "bullets",
        items: [
          "Any person defined under Section 2(k) of SEBI (Issue of Capital and Disclosure Requirements) Regulations, 2018",
          "Any person who is directly or indirectly holding more than 10% of the shareholding in the company",
          "Persons defined in Section 2(69) of the Companies Act, 2013",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "Even if a person is not formally declared as a promoter in SEBI filings, holding more than 10% of shares (directly or indirectly) triggers the promoter-level additional tax under Section 196.",
      },
    ],
  },

  {
    slug: "deemed-dividend-closely-held-companies",
    section2025: "Section 2(40)(e)",
    section1961: "Section 2(22)(e)",
    title: "Deemed Dividend — Loans or Advances by Closely Held Companies",
    summary:
      "When an unlisted closely held company gives loans or advances to certain shareholders or related concerns, those loans are treated as 'deemed dividend' in the hands of the recipient — even if no actual dividend is declared.",
    category: "Special Income",
    keywords: [
      "deemed dividend",
      "section 2(40)(e)",
      "section 2(22)(e)",
      "closely held company",
      "unlisted company loan",
      "loan to shareholder",
      "substantial interest",
      "10 percent shareholder",
      "20 percent voting power",
      "accumulated book profit",
      "CBDT circular 19/2017",
    ],
    lastUpdated: "2026-07-08",
    content: [
      {
        type: "heading",
        text: "When Does a Loan Become a Deemed Dividend?",
      },
      {
        type: "paragraph",
        text: "Under Section 2(40)(e) of the Income Tax Act 2025, any loan or advance given by a closely held (unlisted) company is treated as a deemed dividend in the hands of the recipient if any of the following conditions are met:",
      },
      {
        type: "table",
        headers: ["Scenario", "Trigger Condition", "Result"],
        rows: [
          {
            cells: [
              "Loan to a concern (company, firm, AOP/BOI/HUF)",
              "The concern holds 20% or more voting power OR 20% or more profit-sharing ratio in the closely held company at any time during the Tax Year",
              "Deemed Dividend",
            ],
          },
          {
            cells: [
              "Loan directly to an equity shareholder",
              "The shareholder holds 10% or more voting power in the closely held company",
              "Deemed Dividend",
            ],
          },
          {
            cells: [
              "Loan to any other person on behalf of a shareholder",
              "The shareholder on whose behalf the loan is made holds 10% or more voting power",
              "Deemed Dividend",
            ],
          },
        ],
      },
      {
        type: "diagram",
        id: "deemed-dividend-flow",
      },
      {
        type: "callout",
        variant: "info",
        text: "This provision applies only to closely held companies — i.e., unlisted companies where the public are not substantially interested. Listed companies and companies in which the public are substantially interested are outside the scope of Section 2(40)(e).",
      },
      {
        type: "heading",
        text: "How Much is Treated as Deemed Dividend?",
      },
      {
        type: "paragraph",
        text: "Not the entire loan amount — only the portion up to the accumulated book profits (Reserves & Surplus) of the company is treated as deemed dividend.",
      },
      {
        type: "table",
        headers: ["Particulars", "Amount"],
        rows: [
          { cells: ["Loan / Advance given", "XXX"] },
          { cells: ["Accumulated Book Profits (Reserves & Surplus)", "YYY"] },
          {
            cells: ["Deemed Dividend = Lower of the two above", "Min(XXX, YYY)"],
            bold: true,
          },
        ],
      },
      {
        type: "subheading",
        text: "Illustration",
      },
      {
        type: "calculation",
        rows: [
          { label: "Accumulated book profits (Reserves & Surplus)", amount: "₹15,00,000" },
          { label: "Loan given to shareholder (10%+ voting power)", amount: "₹20,00,000" },
          {
            label: "Deemed Dividend (lower of loan vs. book profits)",
            amount: "₹15,00,000",
            total: true,
          },
          {
            label: "Balance of loan NOT treated as deemed dividend",
            amount: "₹ 5,00,000",
          },
        ],
      },
      {
        type: "heading",
        text: "Key Points to Note",
      },
      {
        type: "bullets",
        items: [
          "Repayment does NOT cure deemed dividend status — even if the loan is fully repaid and the interest charged is at market rate, the original loan amount is still treated as deemed dividend in the year it was given",
          "Trade advances given in the ordinary course of commercial transactions are NOT treated as deemed dividend, as clarified by CBDT Circular 19/2017",
          "The deemed dividend is taxed in the hands of the recipient shareholder (or concern) as 'Income from Other Sources'",
          "The closely held company does not get a deduction for the loan treated as deemed dividend",
        ],
      },
      {
        type: "heading",
        text: "Transactions NOT Treated as Deemed Dividend",
      },
      {
        type: "numbered",
        items: [
          "Actual dividend declared and paid by the company that is set off against a loan already treated as deemed dividend under Section 2(40)(e) — to the extent of such set-off, the actual dividend is not taxed again",
          "Loans or advances given by a company whose substantial business is money lending — the term 'substantial' is not defined in the Act and must be assessed case-by-case based on revenue contribution, profit contribution, and nature of operations",
        ],
      },
      {
        type: "subheading",
        text: "Set-Off Example — SV Pvt. Ltd.",
      },
      {
        type: "paragraph",
        text: "SV Pvt. Ltd. has Reserves & Surplus of ₹15 lakh. It gives a loan of ₹5 lakh to DP (a 10%+ shareholder) on 17/07/2026 — this ₹5 lakh is immediately treated as deemed dividend. Later, on 10/12/2026, SV declares an actual dividend of ₹10 lakh.",
      },
      {
        type: "table",
        headers: ["Shareholder", "Actual Dividend Received", "Treatment"],
        rows: [
          {
            cells: [
              "SV (other shareholder)",
              "₹5,00,000",
              "Taxable as actual dividend ✓",
            ],
          },
          {
            cells: [
              "DP (loan recipient)",
              "₹5,00,000",
              "Set off against the earlier loan (already taxed as deemed dividend) → NOT taxed again ✗",
            ],
          },
        ],
      },
      {
        type: "diagram",
        id: "sv-pvt-ltd-setoff",
      },
      {
        type: "callout",
        variant: "tip",
        text: "The set-off rule prevents double taxation — DP was already taxed on ₹5 lakh as deemed dividend when the loan was given. When the actual dividend of ₹5 lakh is later declared, it wipes out the loan and is not taxed again in DP's hands.",
      },
      {
        type: "callout",
        variant: "warning",
        text: "Directors and shareholders of closely held companies often take loans from the company for personal expenses. Under Section 2(40)(e), such loans are immediately taxable as deemed dividend in the Tax Year they are received — they cannot be deferred by showing them as 'repayable loans' in the company's books.",
      },
    ],
  },
];
