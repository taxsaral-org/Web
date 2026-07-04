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
  | "Special Tax Rates"
  | "TDS & TCS"
  | "Advance Tax"
  | "Return Filing"
  | "Appeals & Revision"
  | "Interest & Fees";

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
  "Special Tax Rates",
  "TDS & TCS",
  "Advance Tax",
  "Return Filing",
  "Appeals & Revision",
  "Interest & Fees",
];

export interface SectionMap {
  old: string;
  new: string;
  topic: string;
  category: MappingCategory;
}

export const MAPPINGS: SectionMap[] = [
  // ── Preliminary ──────────────────────────────────────────────
  { old: "1",          new: "1",       topic: "Short title, extent and commencement",                            category: "Preliminary" },
  { old: "2",          new: "2",       topic: "Definitions",                                                     category: "Preliminary" },
  { old: "3",          new: "3",       topic: "Definition of 'tax year' (replaces 'previous year')",             category: "Preliminary" },

  // ── Basis of Charge ──────────────────────────────────────────
  { old: "4",          new: "4",       topic: "Charge of income-tax",                                            category: "Basis of Charge" },
  { old: "5",          new: "5",       topic: "Scope of total income",                                           category: "Basis of Charge" },
  { old: "6",          new: "6",       topic: "Residence in India (ROR / RNOR / Non-Resident)",                  category: "Basis of Charge" },
  { old: "7",          new: "7",       topic: "Income deemed received; dividend deemed income",                  category: "Basis of Charge" },
  { old: "9B",         new: "8",       topic: "Income on receipt of capital asset by specified person",          category: "Basis of Charge" },
  { old: "9",          new: "9",       topic: "Income deemed to accrue or arise in India",                       category: "Basis of Charge" },
  { old: "5A",         new: "10",      topic: "Apportionment of income between spouses (Portuguese Civil Code)", category: "Basis of Charge" },

  // ── Incomes Excluded ─────────────────────────────────────────
  { old: "10",         new: "11 / Sch. II", topic: "Incomes not included in total income (exempt incomes)",     category: "Incomes Excluded" },
  { old: "13A / 13B",  new: "12",      topic: "Political parties and electoral trusts",                          category: "Incomes Excluded" },

  // ── Heads of Income ──────────────────────────────────────────
  { old: "13",         new: "13",      topic: "Amounts not deductible where income not includible",              category: "Heads of Income" },
  { old: "14",         new: "14",      topic: "Heads of income for computing total income",                      category: "Heads of Income" },
  { old: "14A",        new: "14",      topic: "Expenditure on income not forming part of total income (incorporated into Section 14)", category: "Heads of Income" },

  // ── Salaries ─────────────────────────────────────────────────
  { old: "15",         new: "15",      topic: "Salaries — charging section",                                     category: "Salaries" },
  { old: "17",         new: "16",      topic: "Definition of income from salary",                                category: "Salaries" },
  { old: "17",         new: "17",      topic: "Definition of perquisite",                                        category: "Salaries" },
  { old: "17",         new: "18",      topic: "Profits in lieu of salary",                                       category: "Salaries" },
  { old: "10(10) / 10(10A) / 10(10AA) / 10(10B) / 10(10C) / 16", new: "19", topic: "Deductions from salaries (standard deduction, entertainment allowance, professional tax, exemptions)", category: "Salaries" },

  // ── House Property ───────────────────────────────────────────
  { old: "22",         new: "20",      topic: "Income from house property — charging section",                   category: "House Property" },
  { old: "23 / 27",   new: "21",      topic: "Annual value of house property",                                  category: "House Property" },
  { old: "24 / 25",   new: "22",      topic: "Deductions from income from house property (30% + interest)",     category: "House Property" },
  { old: "25A",        new: "23",      topic: "Arrears of rent and unrealised rent received subsequently",       category: "House Property" },
  { old: "26",         new: "24",      topic: "Property owned by co-owners",                                     category: "House Property" },
  { old: "27",         new: "25",      topic: "Interpretation for house property",                               category: "House Property" },

  // ── Business & Profession ─────────────────────────────────────
  { old: "28",         new: "26",      topic: "Profits and gains of business or profession — charging section",  category: "Business & Profession" },
  { old: "29",         new: "27",      topic: "Computation of income under business/profession head",            category: "Business & Profession" },
  { old: "30 / 31 / 38", new: "28",   topic: "Rent, rates, taxes, repairs and insurance for buildings/plant",   category: "Business & Profession" },
  { old: "36 / 40A",  new: "29",      topic: "Deductions related to employee welfare and benefits",             category: "Business & Profession" },
  { old: "36",         new: "30",      topic: "Deduction for certain premiums paid",                             category: "Business & Profession" },
  { old: "36",         new: "31",      topic: "Deduction for bad debts and provisions",                          category: "Business & Profession" },
  { old: "36",         new: "32",      topic: "Other specified deductions",                                      category: "Business & Profession" },
  { old: "32 / 38",   new: "33",      topic: "Depreciation on assets used for business/profession",             category: "Business & Profession" },
  { old: "37",         new: "34",      topic: "General conditions for allowable deductions (revenue + wholly/exclusively for business)", category: "Business & Profession" },
  { old: "40",         new: "35",      topic: "Amounts not deductible in certain circumstances",                 category: "Business & Profession" },
  { old: "40A",        new: "36",      topic: "Expenses or payments not deductible (cash payments > ₹10,000)",  category: "Business & Profession" },
  { old: "43B",        new: "37",      topic: "Certain deductions allowed only on actual payment basis",         category: "Business & Profession" },
  { old: "41",         new: "38",      topic: "Certain sums deemed as profits and gains",                        category: "Business & Profession" },
  { old: "43",         new: "39",      topic: "Computation of actual cost of assets",                            category: "Business & Profession" },
  { old: "43C",        new: "40",      topic: "Special provision for cost of acquisition (certain modes)",       category: "Business & Profession" },
  { old: "43",         new: "41",      topic: "Written down value (WDV) of depreciable assets",                 category: "Business & Profession" },
  { old: "43A",        new: "42",      topic: "Capitalising impact of change in foreign exchange rates",         category: "Business & Profession" },
  { old: "43AA",       new: "43",      topic: "Taxation of foreign exchange fluctuation gains/losses",           category: "Business & Profession" },
  { old: "35D",        new: "44",      topic: "Amortisation of preliminary expenses (5 years)",                 category: "Business & Profession" },
  { old: "35",         new: "45",      topic: "Expenditure on scientific research (weighted deduction)",         category: "Business & Profession" },
  { old: "35AD",       new: "46",      topic: "Capital expenditure of specified business (100% deduction)",      category: "Business & Profession" },
  { old: "35CCC / 35CCD", new: "47",   topic: "Agricultural extension project and skill development project",    category: "Business & Profession" },
  { old: "33AB",       new: "48",      topic: "Tea, coffee and rubber development accounts",                     category: "Business & Profession" },
  { old: "33ABA",      new: "49",      topic: "Site Restoration Fund",                                           category: "Business & Profession" },
  { old: "44A",        new: "50",      topic: "Special provision for deduction of trade/professional association expenses", category: "Business & Profession" },
  { old: "35E",        new: "51",      topic: "Amortisation of mineral prospecting expenditure (10 years)",      category: "Business & Profession" },
  { old: "35ABA / 35ABB / 35DD / 35DDA", new: "52", topic: "Amortisation of telecom licence, amalgamation and demerger expenditure", category: "Business & Profession" },
  { old: "43CA",       new: "53",      topic: "Full value of consideration for transfer of land/building held as stock", category: "Business & Profession" },
  { old: "42",         new: "54",      topic: "Business of prospecting for mineral oils",                        category: "Business & Profession" },
  { old: "44",         new: "55",      topic: "Insurance business",                                              category: "Business & Profession" },
  { old: "43D",        new: "56",      topic: "Special provision for interest income of banks and financial institutions", category: "Business & Profession" },
  { old: "43CB",       new: "57",      topic: "Revenue recognition for construction and service contracts (POCM)", category: "Business & Profession" },
  { old: "44AD / 44ADA / 44AE", new: "58", topic: "Presumptive basis of computation (small businesses, professionals, goods carriers)", category: "Business & Profession" },
  { old: "44DA",       new: "59",      topic: "Royalty and fee for technical services received by non-residents", category: "Business & Profession" },
  { old: "44C",        new: "60",      topic: "Deduction of head office expenditure for non-residents",          category: "Business & Profession" },
  { old: "44B / 44BB / 44BBA / 44BBB / 44BBC / 44BBD", new: "61", topic: "Presumptive computation for non-resident shipping, oil exploration, and aircraft", category: "Business & Profession" },
  { old: "44AA",       new: "62",      topic: "Maintenance of books of account",                                 category: "Business & Profession" },
  { old: "44AB",       new: "63",      topic: "Tax audit (turnover > ₹1 crore / gross receipts > ₹50 lakh)",    category: "Business & Profession" },
  { old: "44DB",       new: "64",      topic: "Business reorganisation for co-operative banks",                  category: "Business & Profession" },
  { old: "44DB",       new: "65",      topic: "Interpretation for Section 64 (business reorganisation)",         category: "Business & Profession" },
  { old: "28 to 44DA", new: "66",      topic: "Interpretation of terms for business/profession head",           category: "Business & Profession" },

  // ── Capital Gains ─────────────────────────────────────────────
  { old: "45",         new: "67",      topic: "Capital gains — charging section",                                category: "Capital Gains" },
  { old: "46",         new: "68",      topic: "Capital gains on distribution of assets by company in liquidation", category: "Capital Gains" },
  { old: "46A",        new: "69",      topic: "Capital gains on company purchase of its own shares",             category: "Capital Gains" },
  { old: "47",         new: "70",      topic: "Transactions not regarded as transfer (gifts, inheritance, amalgamation, etc.)", category: "Capital Gains" },
  { old: "47A",        new: "71",      topic: "Withdrawal of exemption in certain cases",                        category: "Capital Gains" },
  { old: "48",         new: "72",      topic: "Mode of computation of capital gains (cost of acquisition + improvement)", category: "Capital Gains" },
  { old: "49",         new: "73",      topic: "Cost of acquisition in cases of certain modes of acquisition",    category: "Capital Gains" },
  { old: "50",         new: "74",      topic: "Special provision for computation — depreciable assets",          category: "Capital Gains" },
  { old: "50A",        new: "75",      topic: "Special provision for cost of depreciable assets in certain cases", category: "Capital Gains" },
  { old: "50AA",       new: "76",      topic: "Special provision for Market Linked Debentures",                  category: "Capital Gains" },
  { old: "50B",        new: "77",      topic: "Slump sale — special provision for computation",                  category: "Capital Gains" },
  { old: "50C",        new: "78",      topic: "Full value of consideration for transfer of immovable property",  category: "Capital Gains" },
  { old: "50CA",       new: "79",      topic: "Full value of consideration for transfer of unquoted shares",     category: "Capital Gains" },
  { old: "50D",        new: "80",      topic: "Fair market value deemed as full value of consideration",         category: "Capital Gains" },
  { old: "51",         new: "81",      topic: "Advance money received and forfeited from property sale",         category: "Capital Gains" },
  { old: "54",         new: "82",      topic: "Exemption on profit from sale of residential house property",     category: "Capital Gains" },
  { old: "54B",        new: "83",      topic: "Capital gains on transfer of agricultural land not charged",      category: "Capital Gains" },
  { old: "54D",        new: "84",      topic: "Capital gains on compulsory acquisition of industrial undertaking", category: "Capital Gains" },
  { old: "54EC",       new: "85",      topic: "Exemption on investment in specified bonds (NHAI/REC, ₹50L limit)", category: "Capital Gains" },
  { old: "54F",        new: "86",      topic: "Exemption on investment in new residential house property",        category: "Capital Gains" },
  { old: "54G",        new: "87",      topic: "Capital gains on shifting industrial undertaking from urban area", category: "Capital Gains" },
  { old: "54GA",       new: "88",      topic: "Capital gains on shifting undertaking to Special Economic Zone",  category: "Capital Gains" },
  { old: "54H",        new: "89",      topic: "Extension of time for acquiring new asset (compulsory acquisition)", category: "Capital Gains" },
  { old: "55",         new: "90",      topic: "Meaning of 'cost of improvement' and 'cost of acquisition'",     category: "Capital Gains" },
  { old: "55A",        new: "91",      topic: "Reference to Valuation Officer for fair market value",            category: "Capital Gains" },
  { old: "111A",       new: "196",     topic: "Tax on short-term capital gains on listed equity / equity MFs (STT paid) — 20%", category: "Capital Gains" },
  { old: "112",        new: "197",     topic: "Tax on long-term capital gains on all assets (general) — 12.5%", category: "Capital Gains" },
  { old: "112A",       new: "198",     topic: "Tax on long-term capital gains on listed equity / equity MFs (STT paid) — 12.5%", category: "Capital Gains" },

  // ── Other Sources ─────────────────────────────────────────────
  { old: "56",         new: "92",      topic: "Income from other sources — charging section",                    category: "Other Sources" },
  { old: "57",         new: "93",      topic: "Deductions allowable from income from other sources",             category: "Other Sources" },
  { old: "58",         new: "94",      topic: "Amounts not deductible from other sources income",                category: "Other Sources" },
  { old: "59",         new: "95",      topic: "Profits chargeable to tax (earlier allowed as deduction)",        category: "Other Sources" },

  // ── Clubbing of Income ────────────────────────────────────────
  { old: "60",         new: "96",      topic: "Transfer of income without transfer of assets",                   category: "Clubbing of Income" },
  { old: "61 / 62",   new: "97",      topic: "Chargeability of income arising from revocable transfer of assets", category: "Clubbing of Income" },
  { old: "63",         new: "98",      topic: "'Transfer' and 'revocable transfer' defined",                     category: "Clubbing of Income" },
  { old: "64",         new: "99",      topic: "Income includes income of spouse, minor child (clubbing rules)",  category: "Clubbing of Income" },
  { old: "65",         new: "100",     topic: "Liability of person in whose income another's income is included", category: "Clubbing of Income" },

  // ── Aggregation ──────────────────────────────────────────────
  { old: "66",         new: "101",     topic: "Total income",                                                    category: "Aggregation" },
  { old: "68",         new: "102",     topic: "Unexplained cash credits taxed at 60%",                          category: "Aggregation" },
  { old: "69 / 69B",  new: "103",     topic: "Unexplained investments taxed at 60%",                            category: "Aggregation" },
  { old: "69A / 69B", new: "104",     topic: "Unexplained money, jewellery or other assets taxed at 60%",       category: "Aggregation" },
  { old: "69C",        new: "105",     topic: "Unexplained expenditure taxed at 60%",                           category: "Aggregation" },
  { old: "69D",        new: "106",     topic: "Amount borrowed or repaid through hundi",                         category: "Aggregation" },

  // ── Set-off & Losses ─────────────────────────────────────────
  { old: "70",         new: "108",     topic: "Set off of loss from one source against income from another (same head)", category: "Set-off & Losses" },
  { old: "71",         new: "109",     topic: "Set off of loss under one head against income under another head", category: "Set-off & Losses" },
  { old: "71B",        new: "110",     topic: "Carry forward and set off of loss from house property (8 years)", category: "Set-off & Losses" },
  { old: "74",         new: "111",     topic: "Carry forward and set off of capital gains losses (8 years)",     category: "Set-off & Losses" },
  { old: "72",         new: "112",     topic: "Carry forward and set off of business losses (8 years)",          category: "Set-off & Losses" },
  { old: "73",         new: "113",     topic: "Set off and carry forward of speculation business loss (4 years)", category: "Set-off & Losses" },
  { old: "73A",        new: "114",     topic: "Set off and carry forward of specified business loss (unlimited years)", category: "Set-off & Losses" },
  { old: "74A",        new: "115",     topic: "Set off and carry forward of losses from owning horses/maintaining dogs", category: "Set-off & Losses" },
  { old: "72A",        new: "116",     topic: "Treatment of accumulated loss and unabsorbed depreciation in amalgamation", category: "Set-off & Losses" },
  { old: "72AA",       new: "117",     topic: "Treatment of accumulated losses in case of co-operative banks",  category: "Set-off & Losses" },
  { old: "72AB",       new: "118",     topic: "Carry forward in case of business reorganisation",                category: "Set-off & Losses" },
  { old: "78 / 79",   new: "119",     topic: "Carry forward not permissible in search/seizure and change of shareholding cases", category: "Set-off & Losses" },
  { old: "79A",        new: "120",     topic: "No set off of losses against undisclosed income",                 category: "Set-off & Losses" },
  { old: "80",         new: "121",     topic: "Submission of return for claiming losses",                        category: "Set-off & Losses" },

  // ── Deductions ────────────────────────────────────────────────
  { old: "80A / 80AB / 80AC / 80B", new: "122", topic: "General provisions for deductions in computing total income", category: "Deductions" },
  { old: "80C / 80CCC / 80CCE", new: "123", topic: "LIC premium, annuity, PF/PPF/ELSS contributions (₹1.5 lakh limit)", category: "Deductions" },
  { old: "80CCD",      new: "124",     topic: "Contribution to National Pension System (NPS) — employee and employer", category: "Deductions" },
  { old: "80CCH",      new: "125",     topic: "Contribution under Agnipath Scheme",                              category: "Deductions" },
  { old: "80D",        new: "126",     topic: "Health insurance premia (self + parents, additional for senior citizens)", category: "Deductions" },
  { old: "80DD",       new: "127",     topic: "Maintenance and medical treatment of disabled dependent",         category: "Deductions" },
  { old: "80DDB",      new: "128",     topic: "Medical treatment expenditure for specified diseases",            category: "Deductions" },
  { old: "80E",        new: "129",     topic: "Interest on loan taken for higher education (8 years)",           category: "Deductions" },
  { old: "80EE",       new: "130",     topic: "Interest on home loan for first-time buyers (₹50,000)",          category: "Deductions" },
  { old: "80EEA",      new: "131",     topic: "Interest on loan for affordable housing (stamp duty ≤ ₹45 lakh)", category: "Deductions" },
  { old: "80EEB",      new: "132",     topic: "Interest on loan for purchase of electric vehicle",               category: "Deductions" },
  { old: "80G",        new: "133",     topic: "Donations to charitable institutions and funds (50%/100%)",       category: "Deductions" },
  { old: "80GG",       new: "134",     topic: "Rent paid (where HRA is not received from employer)",             category: "Deductions" },
  { old: "80GGA",      new: "135",     topic: "Donations for scientific research or rural development",          category: "Deductions" },
  { old: "80GGB",      new: "136",     topic: "Contributions by companies to political parties",                 category: "Deductions" },
  { old: "80GGC",      new: "137",     topic: "Contributions by persons other than companies to political parties", category: "Deductions" },
  { old: "80-IA",      new: "138",     topic: "Profits from industrial undertakings in infrastructure development", category: "Deductions" },
  { old: "80-IAB",     new: "139",     topic: "Profits of developers of Special Economic Zones",                 category: "Deductions" },
  { old: "80-IAC",     new: "140",     topic: "Profits from eligible start-ups (tax holiday for 3 years)",       category: "Deductions" },
  { old: "80-IB",      new: "141",     topic: "Profits from certain industrial undertakings (ships, hotels, hospitals)", category: "Deductions" },
  { old: "80-IBA",     new: "142",     topic: "Profits from affordable housing projects",                        category: "Deductions" },
  { old: "80-IE",      new: "143",     topic: "Profits of certain undertakings in North-Eastern States",         category: "Deductions" },
  { old: "10AA",       new: "144",     topic: "Profits of newly established units in Special Economic Zones",    category: "Deductions" },
  { old: "80JJA",      new: "145",     topic: "Profits from collection, processing or treatment of biodegradable waste", category: "Deductions" },
  { old: "80JJAA",     new: "146",     topic: "Additional employee cost deduction (30% for new hires)",          category: "Deductions" },
  { old: "80LA",       new: "147",     topic: "Offshore Banking Units and International Financial Services Centre", category: "Deductions" },
  { old: "80M",        new: "148",     topic: "Deduction for inter-corporate dividends",                         category: "Deductions" },
  { old: "80P",        new: "149",     topic: "Income of co-operative societies",                                category: "Deductions" },
  { old: "80P",        new: "150",     topic: "Interpretation for Section 149 (co-operative society deduction)", category: "Deductions" },
  { old: "80QQB",      new: "151",     topic: "Royalty income of authors on books (₹3 lakh limit)",             category: "Deductions" },
  { old: "80RRB",      new: "152",     topic: "Royalty on patents registered under Patents Act (₹3 lakh limit)", category: "Deductions" },
  { old: "80TTA / 80TTB", new: "153",  topic: "Interest on savings account deposits and bank deposits (for senior citizens)", category: "Deductions" },
  { old: "80U",        new: "154",     topic: "Deduction for person with disability (₹75,000 / ₹1.25 lakh)",    category: "Deductions" },

  // ── Rebates & Reliefs ─────────────────────────────────────────
  { old: "87",         new: "155",     topic: "Rebate to be allowed in computing income-tax",                    category: "Rebates & Reliefs" },
  { old: "87A",        new: "156",     topic: "Rebate for resident individuals — zero tax up to ₹12 lakh income (default regime)", category: "Rebates & Reliefs" },
  { old: "89",         new: "157",     topic: "Relief when salary is paid in arrears or advance (Form 10E)",     category: "Rebates & Reliefs" },
  { old: "89A",        new: "158",     topic: "Relief from taxation on income from retirement benefit account maintained abroad", category: "Rebates & Reliefs" },
  { old: "90 / 90A",  new: "159",     topic: "Agreement with foreign countries or specified territories for double taxation relief (DTAA)", category: "Rebates & Reliefs" },
  { old: "91",         new: "160",     topic: "Countries with which no agreement exists — unilateral relief",    category: "Rebates & Reliefs" },

  // ── Special Tax Rates ─────────────────────────────────────────
  { old: "115BBH",     new: "171",     topic: "Tax on income from Virtual Digital Assets (Crypto / NFTs) — 30% flat", category: "Special Tax Rates" },
  { old: "115BAC",     new: "202",     topic: "Default (new) tax regime for individuals and HUFs — 7 slabs (0%–30%)", category: "Special Tax Rates" },

  // ── TDS & TCS ────────────────────────────────────────────────
  { old: "192",        new: "392",     topic: "TDS on salaries — employer deducts as per applicable slab",       category: "TDS & TCS" },
  { old: "194A",       new: "393",     topic: "TDS on interest other than on securities (banks, FDs, etc.)",     category: "TDS & TCS" },
  { old: "194B / 194BA", new: "393",   topic: "TDS on winnings from lotteries and online games",                 category: "TDS & TCS" },
  { old: "194BB",      new: "393",     topic: "TDS on winnings from horse races",                                category: "TDS & TCS" },
  { old: "194C",       new: "393",     topic: "TDS on payments to contractors and sub-contractors",              category: "TDS & TCS" },
  { old: "194D",       new: "393",     topic: "TDS on insurance commissions",                                    category: "TDS & TCS" },
  { old: "194DA",      new: "393",     topic: "TDS on maturity proceeds of life insurance policies",             category: "TDS & TCS" },
  { old: "194E",       new: "393",     topic: "TDS on payments to non-resident sportsmen and sports associations", category: "TDS & TCS" },
  { old: "194G",       new: "393",     topic: "TDS on commission on sale of lottery tickets",                    category: "TDS & TCS" },
  { old: "194H",       new: "393",     topic: "TDS on commission or brokerage",                                  category: "TDS & TCS" },
  { old: "194-I",      new: "393",     topic: "TDS on rent (land/building and plant/machinery)",                 category: "TDS & TCS" },
  { old: "194-IA",     new: "393",     topic: "TDS on transfer of immovable property (1% on sale > ₹50 lakh)",  category: "TDS & TCS" },
  { old: "194-IB",     new: "393",     topic: "TDS on rent paid by individuals/HUFs (5%)",                      category: "TDS & TCS" },
  { old: "194J",       new: "393",     topic: "TDS on fees for professional or technical services",              category: "TDS & TCS" },
  { old: "194K",       new: "393",     topic: "TDS on income from mutual fund units",                            category: "TDS & TCS" },
  { old: "194LA",      new: "393",     topic: "TDS on enhanced compensation from compulsory acquisition",        category: "TDS & TCS" },
  { old: "194LB",      new: "393",     topic: "TDS on interest from infrastructure debt fund (non-residents)",   category: "TDS & TCS" },
  { old: "194LC",      new: "393",     topic: "TDS on interest from Indian company (foreign currency borrowing)", category: "TDS & TCS" },
  { old: "194LD",      new: "393",     topic: "TDS on interest on rupee-denominated bond / government securities (FIIs)", category: "TDS & TCS" },
  { old: "194M",       new: "393",     topic: "TDS by individual/HUF on professional, commission and contract payments > ₹50 lakh", category: "TDS & TCS" },
  { old: "194N",       new: "393",     topic: "TDS on cash withdrawals above specified limits",                  category: "TDS & TCS" },
  { old: "194O",       new: "393",     topic: "TDS by e-commerce operators on payments to participants",         category: "TDS & TCS" },
  { old: "194Q",       new: "393",     topic: "TDS on purchase of goods (> ₹50 lakh from a single seller)",     category: "TDS & TCS" },
  { old: "194R",       new: "393",     topic: "TDS on benefits and perquisites arising from business or profession", category: "TDS & TCS" },
  { old: "194S",       new: "393",     topic: "TDS on transfer of Virtual Digital Assets (crypto/NFTs)",         category: "TDS & TCS" },
  { old: "194T",       new: "393",     topic: "TDS on payments by partnership firms to partners",                category: "TDS & TCS" },
  { old: "195",        new: "393",     topic: "TDS on payments made to non-residents / foreign remittances",     category: "TDS & TCS" },
  { old: "196A–196D",  new: "393",     topic: "TDS on income from units (offshore funds), bonds, foreign currency bonds and dividends for non-residents", category: "TDS & TCS" },
  { old: "206C",       new: "394",     topic: "Tax collection at source (TCS) on timber, liquor, scrap, motor vehicles, overseas remittances, etc.", category: "TDS & TCS" },

  // ── Advance Tax ───────────────────────────────────────────────
  { old: "207",        new: "403",     topic: "Liability for payment of advance tax; senior citizen exemption (no business income)", category: "Advance Tax" },
  { old: "208",        new: "404",     topic: "Conditions under which advance tax is payable (net tax liability > ₹10,000)", category: "Advance Tax" },
  { old: "209",        new: "405",     topic: "Computation of advance tax (estimated income method)",             category: "Advance Tax" },
  { old: "210",        new: "406",     topic: "Advance tax payment as directed by Assessing Officer",            category: "Advance Tax" },
  { old: "211",        new: "407",     topic: "Instalment amounts and due dates: Jun 15 (15%), Sep 15 (45%), Dec 15 (75%), Mar 15 (100%)", category: "Advance Tax" },
  { old: "219",        new: "408",     topic: "Credit for advance tax paid against regular assessment",           category: "Advance Tax" },

  // ── Return Filing ─────────────────────────────────────────────
  { old: "139A / 139AA", new: "262",   topic: "Permanent Account Number (PAN) — mandatory for specified transactions", category: "Return Filing" },
  { old: "139 / 139D / 194P", new: "263", topic: "Return of income — mandatory filing, belated return, updated return (ITR-U)", category: "Return Filing" },
  { old: "139B",       new: "264",     topic: "Scheme for filing return through Tax Return Preparers",           category: "Return Filing" },
  { old: "140",        new: "265",     topic: "Return to be verified by whom (individual, karta of HUF, MD of company, etc.)", category: "Return Filing" },
  { old: "140A",       new: "266",     topic: "Self-assessment — pay tax before filing return",                  category: "Return Filing" },
  { old: "140B",       new: "267",     topic: "Tax on updated return (ITR-U) — 25% or 50% additional tax",      category: "Return Filing" },

  // ── Appeals & Revision ────────────────────────────────────────
  { old: "246 / 246A", new: "356",     topic: "Appeals to Joint Commissioner (Appeals) / Commissioner (Appeals)", category: "Appeals & Revision" },
  { old: "247",        new: "357",     topic: "Form of appeal and limitation period before Commissioner (Appeals)", category: "Appeals & Revision" },
  { old: "248",        new: "358",     topic: "Appealable orders before Commissioner (Appeals)",                  category: "Appeals & Revision" },
  { old: "250",        new: "359",     topic: "Procedure on receipt of appeal by Commissioner (Appeals)",        category: "Appeals & Revision" },
  { old: "251",        new: "360",     topic: "Powers of Commissioner (Appeals) to confirm, reduce, enhance or annul",  category: "Appeals & Revision" },
  { old: "253",        new: "361",     topic: "Appeals to the Income Tax Appellate Tribunal (ITAT)",             category: "Appeals & Revision" },
  { old: "254",        new: "362",     topic: "Orders of the Appellate Tribunal",                                category: "Appeals & Revision" },
  { old: "255",        new: "363",     topic: "Procedure of Appellate Tribunal",                                 category: "Appeals & Revision" },
  { old: "256",        new: "364",     topic: "Statement of case to High Court (reference by ITAT)",             category: "Appeals & Revision" },
  { old: "260A",       new: "365",     topic: "Appeal to High Court on substantial question of law",             category: "Appeals & Revision" },
  { old: "260B",       new: "366",     topic: "Case before High Court",                                          category: "Appeals & Revision" },
  { old: "261",        new: "367",     topic: "Appeal to Supreme Court",                                         category: "Appeals & Revision" },
  { old: "262",        new: "368",     topic: "Hearing before Supreme Court",                                    category: "Appeals & Revision" },
  { old: "263",        new: "377",     topic: "Revision of orders by Commissioner (prejudicial to revenue)",     category: "Appeals & Revision" },
  { old: "264",        new: "378",     topic: "Revision of orders by Commissioner (at assessee's request)",      category: "Appeals & Revision" },
  { old: "245MA",      new: "379",     topic: "Dispute Resolution Committee (for small taxpayers)",              category: "Appeals & Revision" },

  // ── Interest & Fees ──────────────────────────────────────────
  { old: "234A",       new: "423",     topic: "Interest for default in furnishing return of income (1% per month)", category: "Interest & Fees" },
  { old: "234B",       new: "424",     topic: "Interest for default in payment of advance tax (< 90% paid — 1% per month)", category: "Interest & Fees" },
  { old: "234C",       new: "425",     topic: "Interest for deferment of advance tax instalments (1% per month on shortfall)", category: "Interest & Fees" },
];
