export type DetailedCategory =
  | "Capital Gains"
  | "Corporate Tax"
  | "TDS & TCS"
  | "Business & Profession"
  | "Deductions"
  | "International Tax"
  | "Special Income"
  | "Charitable Trusts & NPOs"
  | "Agricultural Income";

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
  "Agricultural Income",
];

export const DETAILED_ENTRIES: DetailedEntry[] = [
  {
    slug: "buyback-of-securities",
    section2025: "Sections 69 & 196",
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

  {
    slug: "agricultural-income",
    section2025: "Section 2(5) & Rules 270–271",
    section1961: "Section 2(1A)",
    title: "Agricultural Income — Exemption, Bifurcation & Partial Integration",
    summary:
      "What qualifies as agricultural income under Section 2(5), how Rule 270 splits field-to-factory income at the FMV pivot, how Rule 271 handles Tea/Coffee/Rubber with fixed percentage splits, and how partial integration raises the effective tax rate on non-agricultural income.",
    category: "Agricultural Income",
    keywords: [
      "agricultural income",
      "section 2(5)",
      "section 2(1A)",
      "rule 270",
      "rule 271",
      "partial integration",
      "tea coffee rubber",
      "nursery income",
      "agricultural land rent",
      "FMV farm gate",
      "cultivation cost",
      "Mr Arjun case study",
      "basic exemption limit",
      "field to factory",
      "sugarcane sugar",
    ],
    lastUpdated: "2026-07-08",
    content: [
      {
        type: "heading",
        text: "What Qualifies as Agricultural Income — Section 2(5)",
      },
      {
        type: "paragraph",
        text: "Agricultural income is fully exempt from income tax. Section 2(5) of the IT Act 2025 recognises four categories of income as agricultural — each with its own qualifying conditions:",
      },
      {
        type: "table",
        headers: ["Category", "What Qualifies", "Key Condition"],
        rows: [
          {
            cells: [
              "Agricultural Produce",
              "Income from sale of produce grown on agricultural land",
              "Processing must stay within the limits prescribed by Rule 270; excess processing income becomes PGBP",
            ],
          },
          {
            cells: [
              "Nursery Income",
              "Income from growing seedlings, saplings, or plants in nurseries",
              "Qualifies in full — no processing limit applies",
            ],
          },
          {
            cells: [
              "Agricultural Land Rent",
              "Rent received for letting out agricultural land",
              "Qualifies for both rural and urban agricultural land",
            ],
          },
          {
            cells: [
              "Dwelling & Warehouse Rent",
              "Rent for a house or godown situated on agricultural land",
              "Qualifies only if the land is rural AND the premises are used for agricultural purposes",
            ],
          },
        ],
      },
      {
        type: "callout",
        variant: "warning",
        text: "Rent from a dwelling house or warehouse on urban agricultural land does NOT qualify as agricultural income — only rural land qualifies for this sub-category.",
      },
      {
        type: "heading",
        text: "Rule 270 — Bifurcation at the Factory Gate",
      },
      {
        type: "paragraph",
        text: "When a farmer processes agricultural produce in their own business before selling it (e.g., converting sugarcane into sugar, cotton into yarn), Rule 270 splits the resulting profit into an agricultural component (exempt) and a manufacturing/business component (taxable as PGBP). The pivot point is the Fair Market Value (FMV) of the raw produce at the farm gate.",
      },
      {
        type: "subheading",
        text: "Scenario A — Raw Produce Sold Directly",
      },
      {
        type: "calculation",
        rows: [
          { label: "Sale Proceeds of Raw Agricultural Produce", amount: "XXX" },
          { label: "Less: Cost of Cultivation", amount: "(XXX)", negative: true },
          { label: "Agricultural Income (100% Exempt)", amount: "XXX", total: true },
        ],
      },
      {
        type: "subheading",
        text: "Scenario B — Produce Processed in Own Business Before Sale",
      },
      {
        type: "table",
        headers: ["Step", "Formula", "Head of Income"],
        rows: [
          {
            cells: [
              "Step 1 — Agricultural Profit",
              "FMV of Raw Produce at Farm Gate − Cost of Cultivation",
              "Agricultural Income (Exempt)",
            ],
          },
          {
            cells: [
              "Step 2 — Business Profit",
              "Sale Price of Processed Goods − FMV of Raw Produce − Cost of Processing/Manufacturing",
              "PGBP (Taxable)",
            ],
          },
        ],
      },
      {
        type: "callout",
        variant: "info",
        text: "The FMV at the farm gate is the pivot — it separates what the land produced (agricultural income) from what the factory added (business income). Everything up to FMV is exempt; everything beyond is taxable.",
      },
      {
        type: "subheading",
        text: "Illustration — Mr. Amar's Sugarcane",
      },
      {
        type: "paragraph",
        text: "Mr. Amar grows sugarcane. He sells 40% as raw cane (proceeds ₹12L, cultivation cost ₹6L) and processes the remaining 60% in his own sugar factory (FMV of raw cane ₹25L, cultivation cost ₹15L, manufacturing cost ₹1.5L, sugar sale proceeds ₹30L).",
      },
      {
        type: "diagram",
        id: "sugarcane-split",
      },
      {
        type: "table",
        headers: ["Stream", "Calculation", "Head", "Amount"],
        rows: [
          {
            cells: [
              "40% — Direct Sale",
              "₹12,00,000 − ₹6,00,000",
              "Agricultural Income",
              "₹6,00,000",
            ],
          },
          {
            cells: [
              "60% — Factory (Agri portion)",
              "FMV ₹25,00,000 − Cultivation ₹15,00,000",
              "Agricultural Income",
              "₹10,00,000",
            ],
          },
          {
            cells: [
              "60% — Factory (Business portion)",
              "₹30,00,000 − ₹25,00,000 − ₹1,50,000",
              "PGBP (Taxable)",
              "₹3,50,000",
            ],
          },
          {
            cells: ["Total Agricultural Income (Exempt)", "", "", "₹16,00,000"],
            bold: true,
          },
          {
            cells: ["Total Business Income (Taxable)", "", "", "₹3,50,000"],
            bold: true,
          },
        ],
      },
      {
        type: "heading",
        text: "Rule 271 — Statutory Splits for Tea, Coffee & Rubber",
      },
      {
        type: "paragraph",
        text: "For three specified crops — Tea, Coffee, and Rubber — Rule 271 bypasses the FMV calculation entirely and instead mandates a fixed percentage split between agricultural income (exempt) and business income (taxable as PGBP). The split depends on both the crop and the level of processing:",
      },
      {
        type: "table",
        headers: ["Crop & Process", "Agricultural Income (Exempt)", "Business Income / PGBP (Taxable)"],
        rows: [
          { cells: ["Tea — grown and manufactured", "60%", "40%"] },
          { cells: ["Coffee — grown and cured", "75%", "25%"] },
          { cells: ["Coffee — grown, cured, roasted and grounded", "60%", "40%"] },
          { cells: ["Rubber — grown and manufactured", "65%", "35%"] },
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "Rule 271 applies only when the same person both grows and processes the specified crop. If the grower sells raw produce and a separate entity processes it, Rule 271 does not apply — the grower's income is 100% agricultural under Scenario A of Rule 270.",
      },
      {
        type: "heading",
        text: "Partial Integration — How Agricultural Income Affects Your Tax Rate",
      },
      {
        type: "paragraph",
        text: "Although agricultural income is exempt from tax, it is not ignored when computing the rate of tax on non-agricultural income. The partial integration mechanism includes agricultural income in the rate computation — effectively pushing the non-agricultural income into higher slab brackets and raising the effective tax rate.",
      },
      {
        type: "subheading",
        text: "Who Is Subject to Partial Integration?",
      },
      {
        type: "paragraph",
        text: "All three conditions must be satisfied simultaneously:",
      },
      {
        type: "bullets",
        items: [
          "The taxpayer is an Individual, HUF, AOP, BOI, or Artificial Juridical Person (AJP)",
          "Net agricultural income exceeds ₹5,000 during the Tax Year",
          "Total non-agricultural income exceeds the applicable basic exemption limit",
        ],
      },
      {
        type: "callout",
        variant: "info",
        text: "Companies, LLPs, and partnership firms are never subject to partial integration — the mechanism applies only to individuals and individual-like entities.",
      },
      {
        type: "heading",
        text: "The 4-Step Partial Integration Calculation",
      },
      {
        type: "numbered",
        items: [
          "Step 1: Compute tax on (Non-agricultural income + Net agricultural income) using the applicable slab rates — as if both were taxable income.",
          "Step 2: Compute tax on (Basic exemption limit + Net agricultural income) using the same slab rates.",
          "Step 3: Base tax liability = Step 1 tax − Step 2 tax. This strips out the slab relief from the basic exemption and isolates the marginal tax pushed onto the non-agricultural income by the agricultural income.",
          "Step 4: Add applicable Surcharge + Health & Education Cess (4%) to the Step 3 base liability to arrive at the final tax payable.",
        ],
      },
      {
        type: "subheading",
        text: "Case Study — Mr. Arjun (Tax Year 2026-27)",
      },
      {
        type: "table",
        headers: ["Particulars", "Amount"],
        rows: [
          { cells: ["Non-agricultural income (salary, business, etc.)", "₹7,30,000"] },
          { cells: ["Net agricultural income", "₹5,20,000"] },
          { cells: ["Basic exemption limit (Individual — old regime)", "₹2,50,000"] },
        ],
      },
      {
        type: "subheading",
        text: "Step 1 — Tax on ₹12,50,000 (₹7,30,000 + ₹5,20,000)",
      },
      {
        type: "calculation",
        rows: [
          { label: "Nil on ₹0 to ₹2,50,000", amount: "₹0" },
          { label: "5% on ₹2,50,001–₹5,00,000 (₹2,50,000)", amount: "₹12,500" },
          { label: "20% on ₹5,00,001–₹10,00,000 (₹5,00,000)", amount: "₹1,00,000" },
          { label: "30% on ₹10,00,001–₹12,50,000 (₹2,50,000)", amount: "₹75,000" },
          { label: "Step 1 Tax", amount: "₹1,87,500", total: true },
        ],
      },
      {
        type: "subheading",
        text: "Step 2 — Tax on ₹7,70,000 (₹2,50,000 basic + ₹5,20,000 agri)",
      },
      {
        type: "calculation",
        rows: [
          { label: "Nil on ₹0 to ₹2,50,000", amount: "₹0" },
          { label: "5% on ₹2,50,001–₹5,00,000 (₹2,50,000)", amount: "₹12,500" },
          { label: "20% on ₹5,00,001–₹7,70,000 (₹2,70,000)", amount: "₹54,000" },
          { label: "Step 2 Tax", amount: "₹66,500", total: true },
        ],
      },
      {
        type: "subheading",
        text: "Steps 3 & 4 — Final Tax Liability",
      },
      {
        type: "calculation",
        rows: [
          { label: "Step 3 — Base liability (Step 1 − Step 2): ₹1,87,500 − ₹66,500", amount: "₹1,21,000" },
          { label: "Step 4 — Health & Education Cess (4% on ₹1,21,000)", amount: "₹4,840" },
          { label: "Total Tax Payable by Mr. Arjun", amount: "₹1,25,840", total: true },
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "Without partial integration, Mr. Arjun's non-agricultural income of ₹7,30,000 would have attracted tax of only ₹46,000 (after deducting exemption and cess). Partial integration raises this to ₹1,25,840 — a ₹79,840 increase in effective tax — solely because his agricultural income pushed his non-agri income into higher slabs.",
      },
      {
        type: "heading",
        text: "Decision Tree — How to Tax Agricultural Income",
      },
      {
        type: "diagram",
        id: "agricultural-decision-tree",
      },
    ],
  },
];
