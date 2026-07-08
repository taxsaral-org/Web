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
              "LTCG under Section 196 arising out of transfer of securities via buyback",
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
];
