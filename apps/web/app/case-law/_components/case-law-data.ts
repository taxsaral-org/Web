export type CaseCategory =
  | "Capital Gains"
  | "Charitable Trusts & NPOs"
  | "Transfer Pricing"
  | "International Tax"
  | "Business & Profession"
  | "Assessment & Reassessment"
  | "TDS & TCS"
  | "Penalties"
  | "Cash Credits & Unexplained Income"
  | "General Principles"
  | "Trusts, Funds & Pass-Through Vehicles"
  | "GAAR & Anti-Avoidance";

export const CASE_CATEGORIES: CaseCategory[] = [
  "Capital Gains",
  "Charitable Trusts & NPOs",
  "Transfer Pricing",
  "International Tax",
  "Business & Profession",
  "Assessment & Reassessment",
  "TDS & TCS",
  "Penalties",
  "Cash Credits & Unexplained Income",
  "General Principles",
  "Trusts, Funds & Pass-Through Vehicles",
  "GAAR & Anti-Avoidance",
];

export type Court =
  | "Supreme Court"
  | "Privy Council"
  | "Bombay High Court"
  | "Delhi High Court"
  | "Madras High Court"
  | "Karnataka High Court"
  | "Andhra Pradesh High Court"
  | "Telangana High Court";

export interface CaseLaw {
  slug: string;
  caseName: string;
  citation: string;
  court: Court;
  year: number;
  category: CaseCategory;
  /** Provision(s) the case was decided under, in IT Act 1961 terms. */
  section1961: string;
  /** Corresponding provision(s) under IT Act 2025. */
  section2025: string;
  /** Plain-language label for the 2025 section. */
  sectionTopic: string;
  /** The question that came before the court. */
  issue: string;
  /** The ratio, in one or two sentences. */
  held: string;
  /** Factual background — parties, transaction, amounts, what the Revenue did. */
  facts: string;
  /** How the matter travelled through the appellate hierarchy. */
  proceduralHistory?: string;
  /** The competing contentions of the parties. */
  contentions?: { assessee: string; revenue: string };
  /** The court's reasoning, in full. */
  summary: string;
  /** Distilled propositions the case is authority for. */
  principles: string[];
  /** Why a practitioner should care under the IT Act 2025 regime. */
  relevance: string;
  keywords: string[];
}

/**
 * The subset of a judgment shown on the listing page.
 *
 * The listing is a client component, so whatever it imports is shipped to the
 * browser. Sending only these fields keeps the full facts, reasoning and
 * principles of 100+ judgments on the server, where the detail pages render
 * them. Build this with `toCaseIndex` in a server component and pass it down.
 */
export interface CaseIndexEntry {
  slug: string;
  caseName: string;
  citation: string;
  court: Court;
  year: number;
  category: CaseCategory;
  section1961: string;
  section2025: string;
  held: string;
  keywords: string[];
}

export function toCaseIndex(cases: CaseLaw[]): CaseIndexEntry[] {
  return cases.map((c) => ({
    slug: c.slug,
    caseName: c.caseName,
    citation: c.citation,
    court: c.court,
    year: c.year,
    category: c.category,
    section1961: c.section1961,
    section2025: c.section2025,
    held: c.held,
    keywords: c.keywords,
  }));
}

export const CASE_LAWS: CaseLaw[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // CAPITAL GAINS
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "bc-srinivasa-setty",
    caseName: "CIT v. B.C. Srinivasa Setty",
    citation: "(1981) 128 ITR 294 (SC)",
    court: "Supreme Court",
    year: 1981,
    category: "Capital Gains",
    section1961: "Sections 45 & 48",
    section2025: "Sections 67 & 72",
    sectionTopic: "Capital gains — charging section; mode of computation",
    issue:
      "Can capital gains be charged on the transfer of self-generated goodwill, where the asset has no ascertainable cost of acquisition?",
    held:
      "No. The charging section and the computation provisions together form an integrated code. Where the computation provision cannot apply because no cost of acquisition is identifiable, the charge itself fails.",
    facts:
      "The assessee was a registered firm dealing in iron, steel and hardware. On its reconstitution, the old firm's assets — including its goodwill — passed to a newly constituted firm. The goodwill had not been purchased from anyone; it had accreted over the years of the firm's own trading, and no amount had ever been paid for it or entered in the books as its cost. The Income Tax Officer took the view that the transfer of goodwill on dissolution attracted capital gains, and since nothing had been paid to acquire it, treated the cost of acquisition as nil and brought the entire value to tax.",
    proceduralHistory:
      "The Appellate Assistant Commissioner and the Tribunal both ruled in the assessee's favour. The Karnataka High Court answered the reference against the Revenue. The Revenue appealed to the Supreme Court, where the question was heard together with connected appeals raising the same point.",
    contentions: {
      assessee:
        "Goodwill generated in the course of one's own business has no cost of acquisition at all. The computation provision in Section 48 proceeds on the footing that a cost exists and can be deducted; where none does, the section simply cannot be worked. A nil cost cannot be assumed, because the statute nowhere says so, and a charge cannot be raised by supplying words the legislature omitted.",
      revenue:
        "Section 45 is a charging provision of wide import covering the transfer of any capital asset. Goodwill is indisputably a capital asset. Where nothing was paid to acquire it, the cost is properly taken as nil, with the result that the whole of the consideration represents the gain. Any other reading would let a valuable asset escape tax entirely.",
    },
    summary:
      "Justice Pathak, delivering the judgment, began from the proposition that a charging section and the corresponding computation provisions together constitute an integrated code. When there is a case to which the computation provisions cannot apply at all, it is evident that such a case was not intended to fall within the charging section. The Court examined the structure of Section 48, which contemplates deducting from the full value of the consideration the cost of acquisition and the cost of improvement. That structure presupposes an asset in whose acquisition it is possible to envisage a cost. Goodwill generated in a business of one's own making is different in kind: it arises gradually, cannot be traced to any point of outlay, and its value fluctuates with the reputation and conduct of the business. The Court declined to treat 'no cost' as equivalent to 'nil cost', observing that it is not open to the Court to supply a deemed cost the legislature had not provided. Because the machinery failed, the asset fell outside the charge altogether, and the transfer of self-generated goodwill was not exigible to capital gains tax.",
    principles: [
      "A charging section and its computation provisions form an integrated code; if the machinery fails, the charge fails with it.",
      "A case to which the computation provisions cannot apply was not intended by Parliament to fall within the charge.",
      "The absence of a cost of acquisition is not the same as a nil cost — courts will not supply a deeming fiction the statute omits.",
      "Self-generated goodwill is a capital asset, but one in whose acquisition no cost can be envisaged.",
    ],
    relevance:
      "The integrated-code principle survives under Sections 67 and 72. Its practical reach is now much narrower, because Section 90 expressly assigns a nil cost of acquisition to self-generated assets such as goodwill, tenancy rights and route permits — precisely the deeming fiction whose absence decided this case. Srinivasa Setty therefore remains the authority to invoke only for assets for which the statute still prescribes no cost mechanism, and it continues to be cited across the Act wherever a charge is sought to be raised on a computation that cannot be worked.",
    keywords: [
      "goodwill",
      "self-generated asset",
      "cost of acquisition",
      "computation machinery",
      "integrated code",
      "charging section",
    ],
  },
  {
    slug: "kp-varghese",
    caseName: "K.P. Varghese v. Income Tax Officer",
    citation: "(1981) 131 ITR 597 (SC)",
    court: "Supreme Court",
    year: 1981,
    category: "Capital Gains",
    section1961: "Section 52(2) (since omitted); relevant to Section 50C",
    section2025: "Sections 72, 78 & 91",
    sectionTopic:
      "Mode of computation; full value of consideration for immovable property; reference to Valuation Officer",
    issue:
      "May the Assessing Officer substitute fair market value for the consideration actually declared, without any evidence that the taxpayer understated the price?",
    held:
      "No. The burden lies on the Revenue to establish that the consideration was in fact understated. A provision aimed at tax evasion cannot be turned on an honest transaction merely because market value exceeds the stated price.",
    facts:
      "The assessee had purchased a house in Ernakulam in 1958 for ₹16,500. In 1965 he sold it to his daughter-in-law and five children for the same sum of ₹16,500. The Income Tax Officer formed the view that the fair market value of the property at the date of sale was ₹65,000, and invoked Section 52(2) — which permitted the full value of the consideration to be taken at fair market value where that value exceeded the declared consideration by more than fifteen per cent — to assess the difference of ₹48,500 as capital gains. There was no allegation, and no material, to suggest that the assessee had in fact received anything more than the ₹16,500 recorded.",
    proceduralHistory:
      "The assessee challenged the assessment by writ petition before the Kerala High Court, which dismissed it. A Full Bench of the same High Court subsequently took the view that the sub-section applied on its literal terms wherever the fifteen per cent threshold was crossed. The matter reached the Supreme Court on appeal.",
    contentions: {
      assessee:
        "The sub-section is directed at understatement of consideration. Read literally it would tax an amount never received, which is beyond the legislative competence to tax 'income' and produces manifestly unjust results in honest transactions. The provision should be read as requiring the Revenue to show that the declared consideration was understated and that the assessee actually received more.",
      revenue:
        "The language is plain: where fair market value exceeds the declared consideration by more than fifteen per cent, the fair market value may be substituted. No further condition is written into the sub-section, and the Court should not add one. The objective test of the fifteen per cent margin is itself the safeguard Parliament chose.",
    },
    summary:
      "Justice Bhagwati held that a literal construction producing results the legislature could not have intended must yield to a purposive one. He traced the provision to its Budget Speech and Memorandum, which described it as a measure to counter understatement of consideration in transfers of property — an evasion device — rather than a charge on notional gains. The Court reasoned that 'full value of the consideration received or accruing' cannot mean an amount that was neither received nor accrued; to read it otherwise would tax a hypothetical receipt. It therefore held that two conditions must be satisfied before the sub-section can be applied: the consideration must in fact have been understated, and the onus of establishing that understatement rests on the Revenue. The Court accepted that direct proof of an under-the-table payment will rarely be available and that the Revenue may discharge its burden by circumstantial evidence, but it insisted that some material beyond the mere disparity in value is required. Since the Revenue had led nothing to show that the assessee received more than the recorded price, the assessment was quashed.",
    principles: [
      "A literal reading that produces absurd or unjust results yields to the purpose the legislature was pursuing.",
      "'Full value of the consideration received or accruing' cannot include an amount that was never received or accrued.",
      "An anti-evasion provision cannot be applied to an honest transaction merely because market value exceeds the stated price.",
      "The burden of proving understatement of consideration lies on the Revenue, though it may be discharged by circumstantial evidence.",
      "Speeches and memoranda explaining a provision are admissible to ascertain the mischief it was aimed at.",
    ],
    relevance:
      "Section 78 is a deeming provision — where the stamp duty value exceeds the declared consideration, the stamp duty value is taken as the full value. To that extent the statute now does expressly what K.P. Varghese would not allow to be done by construction, and the case no longer prevents the substitution itself. What survives is the safeguard: where the stamp duty value is disputed as exceeding true market value, the matter can be referred to the Valuation Officer under Section 91, and the assessee is entitled to have the genuineness of the transaction considered rather than assumed away. The interpretive method — purpose over literalism where the literal result is absurd — is cited across the whole Act.",
    keywords: [
      "understatement of consideration",
      "burden of proof",
      "fair market value",
      "stamp duty value",
      "50C",
      "valuation officer",
      "purposive construction",
    ],
  },
  {
    slug: "balbir-singh-maini",
    caseName: "CIT v. Balbir Singh Maini",
    citation: "(2017) 398 ITR 531 (SC)",
    court: "Supreme Court",
    year: 2017,
    category: "Capital Gains",
    section1961: "Sections 2(47)(v) & 45",
    section2025: "Section 2 (definition of transfer); Section 67",
    sectionTopic: "Meaning of transfer; capital gains — charging section",
    issue:
      "Does an unregistered Joint Development Agreement, under which possession is said to be handed over, constitute a transfer giving rise to capital gains?",
    held:
      "No. After the 2001 amendment to the Registration Act, an unregistered agreement has no effect in law for the purposes of Section 53A of the Transfer of Property Act. There is therefore no transfer, and no capital gain arises.",
    facts:
      "Members of a cooperative house building society in Punjab entered into a tripartite Joint Development Agreement with two developers for the development of land held by the society. Consideration was to comprise a cash component and built-up flats. The agreement was not registered. The project required permissions from the competent authorities, which were never granted — a change in policy intervened — with the result that the development never proceeded and the bulk of the consideration was never received. The Assessing Officer nonetheless assessed capital gains in the hands of the members in the year the agreement was entered into, treating the arrangement as a transfer by way of part performance.",
    proceduralHistory:
      "The Commissioner (Appeals) and the Tribunal took differing views across the connected matters. The Punjab and Haryana High Court decided in favour of the assessees, holding that no transfer had taken place. The Revenue appealed to the Supreme Court.",
    contentions: {
      assessee:
        "Section 2(47)(v) is attracted only where a transaction answers the description in Section 53A of the Transfer of Property Act. Since 2001 that section requires the contract to be registered; an unregistered agreement has no legal effect. Separately, no income ever accrued: the permissions failed, the project collapsed, and no enforceable right to receive the consideration ever arose.",
      revenue:
        "Possession had been made over to the developers under the agreement and substantial rights had been conferred, which is what Section 2(47)(v) is concerned with. The statutory definition of transfer is extended and should not be confined by the technical requirements of the Registration Act. The consideration had become due under the contract, whether or not it was actually received.",
    },
    summary:
      "Justice Nariman decided the appeal on two independent grounds. On the first, the Court traced the 2001 amendment to Section 53A of the Transfer of Property Act, which deleted the words 'the contract, though required to be registered, has not been registered', and the corresponding amendment to Section 17(1A) of the Registration Act. The combined effect is that a contract of the nature referred to in Section 53A has no effect unless registered. Since Section 2(47)(v) of the Income Tax Act incorporates Section 53A by reference, an unregistered joint development agreement cannot satisfy it, and no transfer arises. On the second ground, the Court held that even setting the registration point aside, income must accrue in the real sense before it can be taxed. The agreement was contingent on permissions that were never obtained; no right to receive the consideration had crystallised; and what was recorded was at best a hypothetical accrual. Applying the settled principle that income tax is levied on real income and not on a notional entitlement, the Court held there was nothing to tax. The appeals of the Revenue were accordingly dismissed.",
    principles: [
      "Section 2(47)(v) incorporates Section 53A of the Transfer of Property Act; after 2001 that requires a registered instrument.",
      "An unregistered joint development agreement does not effect a transfer, whatever possession may have been given.",
      "Income must accrue in the real sense; a contingent or hypothetical entitlement is not taxable.",
      "Where consideration is dependent on permissions that never materialise, no enforceable right to receive it arises.",
      "The extended definition of transfer does not dispense with the statutory conditions each of its clauses imports.",
    ],
    relevance:
      "The timing of capital gains on development agreements remains among the most litigated questions in practice. Both limbs of the decision — registration as a precondition, and real accrual of income — carry directly into Section 67 under the IT Act 2025 and into the definition of transfer in Section 2. Practitioners should note that the separate regime for individuals and HUFs deferring tax on development agreements to the year of completion addresses only part of the field; where that regime does not apply, Maini continues to govern.",
    keywords: [
      "joint development agreement",
      "JDA",
      "unregistered agreement",
      "section 53A",
      "possession",
      "accrual of income",
      "real income",
      "transfer",
    ],
  },
  {
    slug: "sanjeev-lal",
    caseName: "Sanjeev Lal v. CIT",
    citation: "(2014) 365 ITR 389 (SC)",
    court: "Supreme Court",
    year: 2014,
    category: "Capital Gains",
    section1961: "Sections 2(47) & 54",
    section2025: "Section 2 (definition of transfer); Section 82",
    sectionTopic:
      "Meaning of transfer; exemption on profit from sale of residential house",
    issue:
      "For the time limit under Section 54, does the clock run from the agreement to sell or from the later execution of the sale deed?",
    held:
      "The agreement to sell itself created a right in favour of the buyer and extinguished a corresponding right of the seller. That date can be treated as the date of transfer for applying the Section 54 time limit.",
    facts:
      "The assessee became entitled to a house under a will. An agreement to sell the property was executed on 27 December 2002 for ₹1.32 crore, and earnest money of ₹15 lakh was received. Before the sale could be completed, another person claiming under the will instituted a suit and obtained an injunction, which halted the transaction. The litigation was resolved and the sale deed was finally executed on 24 September 2004. In the meantime, the assessee had purchased a new residential house on 30 April 2003 — within one year of the agreement to sell, but more than one year before the sale deed. The Assessing Officer computed the period from the date of the sale deed and denied the exemption, holding the new purchase to be outside the permitted window.",
    proceduralHistory:
      "The assessment was upheld in appeal, and the High Court also decided against the assessee, taking the date of the registered sale deed as the date of transfer. The assessee appealed to the Supreme Court.",
    contentions: {
      assessee:
        "Some right in the property passed to the intending buyer on the date of the agreement, when earnest money was paid; to that extent the assessee's own rights stood extinguished, which falls within the extended definition of transfer. The delay in executing the sale deed was caused entirely by litigation beyond the assessee's control, and Section 54 being a beneficial provision should not be read so as to defeat a bona fide reinvestment.",
      revenue:
        "Title to immovable property passes only on execution and registration of the conveyance. An agreement to sell creates no interest in the property. The date of transfer is therefore the date of the sale deed, and the new house having been bought more than a year earlier, the statutory condition was not met.",
    },
    summary:
      "The Court accepted that, as a matter of general property law, an agreement to sell does not itself convey title. But it emphasised that the Income Tax Act defines transfer in extended terms which include the extinguishment of any rights in a capital asset. On execution of the agreement and receipt of earnest money, the intending buyer acquired an enforceable right to obtain a conveyance, and correspondingly the assessee's right to deal freely with the property was curtailed. That, the Court held, amounted to an extinguishment of rights sufficient to constitute a transfer on the statutory definition. The Court laid weight on the practical reality that the assessee could not have completed the sale earlier because of the injunction, and that he had done everything within his power to comply. It invoked the settled approach that a provision granting relief to a taxpayer, where two views are reasonably possible, should be construed in the manner that advances the relief. Reading the agreement date as the date of transfer, the purchase of the new house fell within time and the exemption was allowed.",
    principles: [
      "The statutory definition of transfer includes extinguishment of rights, which is wider than the passing of title under property law.",
      "An agreement to sell coupled with receipt of earnest money can extinguish rights sufficiently to constitute a transfer.",
      "Section 54 is a beneficial provision and, where two views are possible, the construction favouring relief is preferred.",
      "A taxpayer prevented from completing a transaction by circumstances beyond their control should not lose relief on that account.",
    ],
    relevance:
      "Directly relevant to Section 82 under the IT Act 2025. Where a sale deed is delayed by litigation, regulatory clearance or buyer default, this remains the leading authority for computing the reinvestment window from the agreement date. It should be pleaded on its facts — the presence of earnest money and of an external impediment to completion were both material to the outcome.",
    keywords: [
      "agreement to sell",
      "date of transfer",
      "section 54",
      "reinvestment",
      "residential house",
      "extinguishment of rights",
      "beneficial provision",
    ],
  },
  {
    slug: "ace-builders",
    caseName: "CIT v. Ace Builders (P) Ltd",
    citation: "(2006) 281 ITR 210 (Bom)",
    court: "Bombay High Court",
    year: 2006,
    category: "Capital Gains",
    section1961: "Sections 50 & 54EC",
    section2025: "Sections 74 & 85",
    sectionTopic:
      "Computation for depreciable assets; exemption on investment in specified bonds",
    issue:
      "Where gain on a depreciable asset is deemed short-term under Section 50, is the taxpayer still entitled to the exemption available for long-term capital gains?",
    held:
      "Yes. Section 50 creates a deeming fiction only for the purpose of computation. It does not convert a long-term asset into a short-term one for every purpose of the Act, so the exemption remains available.",
    facts:
      "The assessee transferred a depreciable capital asset — a flat forming part of a block of assets on which depreciation had been claimed — which had been held for well beyond the period that would ordinarily make the gain long-term. Because the asset was depreciable, Section 50 applied and the resulting gain was computed and deemed to be a short-term capital gain. The assessee invested the gain in specified bonds and claimed exemption under Section 54EC, which by its terms is available in respect of long-term capital gains. The Assessing Officer denied the exemption on the ground that the gain, being deemed short-term under Section 50, could not qualify.",
    proceduralHistory:
      "The Commissioner (Appeals) and the Tribunal decided in favour of the assessee. The Revenue appealed to the Bombay High Court.",
    contentions: {
      assessee:
        "Section 50 is confined to the computation of the gain on depreciable assets within the block-of-assets scheme. It does not alter the period for which the asset was actually held, nor does it recharacterise the asset itself. The exemption provision is keyed to the asset being a long-term capital asset, a condition that was satisfied on the facts.",
      revenue:
        "Section 50 expressly deems the gain arising on transfer of a depreciable asset to be a short-term capital gain. An exemption available only for long-term capital gains cannot be claimed in respect of a gain the statute itself characterises as short-term.",
    },
    summary:
      "The Court applied the settled rule that a legal fiction is to be limited to the purpose for which it was created and is not to be extended beyond that purpose by importing consequences the statute did not intend. Section 50, it observed, appears within the group of provisions dealing with the mode of computation, and operates as a special rule for assets forming part of a block on which depreciation has been allowed. Its function is to compute the gain by reference to the written down value of the block rather than by the ordinary method. Nothing in it addresses the period of holding, and nothing in it declares the asset itself to be a short-term capital asset. The exemption provision, by contrast, is engaged where the asset transferred is a long-term capital asset, which depends on how long it was in fact held. Since the asset had been held beyond the statutory period, the condition was met, and the fiction in Section 50 could not be carried across to defeat a relief located elsewhere in the Act. The exemption was therefore available.",
    principles: [
      "A legal fiction must be confined to the purpose for which it is created and not extended to other provisions.",
      "Section 50 governs computation only; it does not alter the period of holding or the character of the asset.",
      "Reliefs keyed to a long-term capital asset remain available where the asset was in fact held for the requisite period.",
      "Deemed short-term treatment of the gain does not deem the underlying asset to be short-term.",
    ],
    relevance:
      "The same structure is carried into the IT Act 2025 — Section 74 computes gains on depreciable assets and Section 85 gives the bond exemption. The reasoning applies unchanged, and this remains the standard authority where the Revenue resists a reinvestment exemption on depreciable-asset gains. The principle has been followed widely and applied by analogy to other reliefs that turn on long-term character.",
    keywords: [
      "depreciable asset",
      "block of assets",
      "deeming fiction",
      "54EC",
      "specified bonds",
      "short-term capital gain",
      "period of holding",
    ],
  },
  {
    slug: "chaturbhuj-dwarkadas-kapadia",
    caseName: "Chaturbhuj Dwarkadas Kapadia v. CIT",
    citation: "(2003) 260 ITR 491 (Bom)",
    court: "Bombay High Court",
    year: 2003,
    category: "Capital Gains",
    section1961: "Section 2(47)(v)",
    section2025: "Section 2 (definition of transfer); Section 67",
    sectionTopic: "Meaning of transfer; capital gains — charging section",
    issue:
      "In a development agreement, in which year does the transfer occur for capital gains purposes?",
    held:
      "Transfer occurs in the year in which the developer becomes willing to perform its part of the contract and possession is handed over in part performance, even if the conveyance is executed later.",
    facts:
      "The assessee, owner of immovable property in Mumbai, entered into a development agreement with a developer. The agreement conferred extensive rights on the developer, including the right to enter upon the property, construct, and deal with the constructed area, with consideration payable in instalments linked to milestones. A power of attorney was executed in the developer's favour. The conveyance was executed only in a later year. The dispute concerned the year in which the capital gains arose — the assessee contending for the later year of conveyance, the Revenue for the earlier year in which the arrangement took effect.",
    proceduralHistory:
      "The matter came before the Bombay High Court on appeal from the Tribunal, in a context where no settled test existed for identifying the year of transfer in development agreements.",
    contentions: {
      assessee:
        "Title passed only on conveyance; until then the developer held under a contractual licence and the owner remained the legal owner. Instalments received in the interim were advances, not consideration for a completed transfer, and the gain should be assessed in the year of conveyance.",
      revenue:
        "The agreement read with the power of attorney conferred on the developer substantially all the rights of an owner, including possession and the right to construct and sell. That is precisely the situation Section 2(47)(v) was enacted to catch, and the transfer occurred when those rights were made over.",
    },
    summary:
      "The Court set out to supply a workable test, observing that development agreements had become common and that the year of chargeability could not be left to turn on the form of the documentation. It held that Section 2(47)(v) was introduced to cover arrangements which confer privileges of ownership without conveying title, and that the decisive question is whether the transaction falls within Section 53A of the Transfer of Property Act. On that footing, the year of transfer is the year in which the contract, read as a whole, indicates that the developer is willing to perform its obligations and possession has been handed over in part performance. The Court expressly held that it is not necessary for the entire consideration to have been received, nor for a formal conveyance to have been executed, before the transfer is complete for tax purposes. It cautioned that the substance of the arrangement governs, and that the presence of a power of attorney conferring wide dealing rights is a strong indicator. Applying the test to the agreement before it, the Court identified the year in which the developer's willingness and possession coincided as the year of chargeability.",
    principles: [
      "Section 2(47)(v) targets arrangements conferring the privileges of ownership without a conveyance.",
      "The year of transfer is the year in which the developer is willing to perform and possession is given in part performance.",
      "Neither receipt of the whole consideration nor execution of a conveyance is necessary to complete the transfer.",
      "The substance of the arrangement prevails over its form; wide powers of attorney are a strong indicator of transfer.",
    ],
    relevance:
      "Read together with Balbir Singh Maini, this sets the framework for taxing development agreements under Section 67. Kapadia supplies the willingness-and-possession test; Maini adds the prior requirement that the instrument be registered before the test can be reached at all. In practice both must be addressed — an unregistered agreement fails at the threshold, and a registered one is then dated by the Kapadia test.",
    keywords: [
      "development agreement",
      "willingness to perform",
      "part performance",
      "possession",
      "year of taxability",
      "power of attorney",
      "transfer",
    ],
  },
  {
    slug: "fibre-boards",
    caseName: "Fibre Boards (P) Ltd v. CIT",
    citation: "(2015) 376 ITR 596 (SC)",
    court: "Supreme Court",
    year: 2015,
    category: "Capital Gains",
    section1961: "Section 54G",
    section2025: "Section 87",
    sectionTopic:
      "Capital gains on shifting an industrial undertaking out of an urban area",
    issue:
      "Does 'utilisation' of the capital gain require completed purchases, or do advances paid towards acquiring the new assets qualify?",
    held:
      "Advances paid towards the purchase of land, building and plant amount to utilisation of the capital gain. Completion of the purchase within the period is not required.",
    facts:
      "The assessee shifted its industrial undertaking out of an urban area and realised capital gains on the sale of its existing assets. Within the statutory period, it paid substantial advances to various persons towards the acquisition of land, buildings, plant and machinery at the new location. The acquisitions were not completed within that period. The assessee claimed exemption under Section 54G on the footing that the gains had been utilised. The Assessing Officer denied the claim, holding that mere advances did not amount to utilisation and that the assets had to be acquired within the time allowed.",
    proceduralHistory:
      "The claim was rejected in the assessment and through the appellate stages, and the High Court decided against the assessee. A further question arose as to whether the relief survived the notification of a successor provision. The assessee appealed to the Supreme Court.",
    contentions: {
      assessee:
        "The statute requires the capital gain to be 'utilised' for specified purposes within the period. Paying advances earmarks the funds irrevocably for those purposes and is utilisation in the ordinary sense of the word. Relocation of an industrial undertaking is necessarily a protracted exercise, and a construction requiring completed acquisitions would render the relief largely illusory.",
      revenue:
        "The relief is granted for the purchase of new assets. Until the purchase is effected, there is no asset and no compliance with the condition. Advances are revocable in principle and cannot be equated with acquisition.",
    },
    summary:
      "The Supreme Court held that the word 'utilised' must be given its plain and ordinary meaning, and that there is a deliberate distinction between a requirement to 'purchase' and a requirement to 'utilise' the gain for the purpose of purchasing. Once the assessee has paid advances towards the identified purposes, the amount has been applied to that end and is no longer available for other use; that is utilisation. The Court also placed weight on the purpose of the provision, which is to facilitate the shifting of industrial undertakings away from congested urban areas. Relocation involves acquiring land, constructing premises and installing plant, a process that cannot realistically be completed within a short window, and a narrow construction would defeat the object Parliament had in mind. On the subsidiary question, the Court held that the repeal or supersession of a notification does not extinguish a right that had already accrued, applying the General Clauses Act. The exemption was accordingly allowed.",
    principles: [
      "'Utilised' bears its ordinary meaning and is distinct from a requirement that the purchase be completed.",
      "Payment of advances towards identified assets constitutes utilisation of the capital gain.",
      "A relief must be construed so as to advance, not defeat, the object for which it was enacted.",
      "Rights that have already accrued survive the supersession of the notification under which they arose.",
    ],
    relevance:
      "Section 87 carries the relief forward under the IT Act 2025. The decision is the standard answer where relief is disallowed because the new asset was not fully acquired within the window, and its reasoning on 'utilisation' is frequently applied by analogy to other reinvestment reliefs, including those for residential property.",
    keywords: [
      "54G",
      "shifting industrial undertaking",
      "utilisation",
      "advance payment",
      "relocation",
      "reinvestment",
      "accrued rights",
    ],
  },
  {
    slug: "tn-aravinda-reddy",
    caseName: "CIT v. T.N. Aravinda Reddy",
    citation: "(1979) 120 ITR 46 (SC)",
    court: "Supreme Court",
    year: 1979,
    category: "Capital Gains",
    section1961: "Section 54",
    section2025: "Section 82",
    sectionTopic: "Exemption on profit from sale of residential house property",
    issue:
      "Does 'purchase' in Section 54 cover the acquisition of a co-owner's share in a jointly held house, by way of a release deed on partition?",
    held:
      "Yes. 'Purchase' bears its ordinary meaning of acquiring for a price, and includes acquiring a share from co-owners. A narrow, technical construction is not warranted.",
    facts:
      "On the partition of a Hindu undivided family, the assessee and his three brothers became entitled to shares in family residential property. The assessee paid each of his brothers a sum of money, and they executed release deeds in his favour relinquishing their interests in one of the houses, so that he became its sole owner. Having earlier sold another residential house and realised capital gains, he claimed exemption under Section 54 on the footing that he had purchased a residential house with the gain. The Revenue denied the claim, contending that a release on partition is not a purchase.",
    proceduralHistory:
      "The Tribunal allowed the assessee's claim and the High Court agreed. The Revenue appealed to the Supreme Court.",
    contentions: {
      assessee:
        "Money was paid and property was acquired in return. That is a purchase in the ordinary sense in which the word is used in commercial life, and the section uses no technical expression requiring a formal sale deed.",
      revenue:
        "A release deed executed on partition operates as a relinquishment of a pre-existing right, not as a conveyance on sale. What the assessee received was his own share adjusted on partition, and no purchase took place.",
    },
    summary:
      "Justice Krishna Iyer declined to read the word 'purchase' narrowly. He observed that the section does not employ the expression in any technical sense drawn from the law of conveyancing, and that its ordinary meaning is to acquire property for a price paid in money. On the facts, the brothers had each received a sum and had in return given up their interests in the house, leaving the assessee its full owner. The transaction therefore had every commercial characteristic of a purchase, whatever the label on the instrument. The Court rejected the suggestion that a release deed executed in the course of partition is incapable of amounting to a purchase, pointing out that the form chosen by the parties cannot govern the substance of what occurred. It added that the provision is intended to relieve an assessee who reinvests the proceeds of one residence in another, and that construing it restrictively would frustrate that object without serving any discernible purpose of the statute.",
    principles: [
      "'Purchase' in the exemption provision carries its ordinary meaning of acquiring for a price, not a conveyancing meaning.",
      "The label on the instrument does not govern; the substance of the transaction controls.",
      "Acquiring a co-owner's share for consideration, including by release on partition, qualifies as a purchase.",
      "Reinvestment reliefs are to be construed so as to give effect to their evident purpose.",
    ],
    relevance:
      "The liberal reading of 'purchase' carries into Section 82 and is routinely relied on for family settlements, partitions and buy-outs of co-owners' shares, where the Revenue seeks to deny relief on the form of the instrument rather than its substance. It is among the most frequently cited decisions on residential property reinvestment relief.",
    keywords: [
      "purchase",
      "co-owner",
      "release deed",
      "partition",
      "section 54",
      "beneficial construction",
      "substance over form",
    ],
  },
  {
    slug: "dp-sandu-brothers",
    caseName: "CIT v. D.P. Sandu Bros Chembur (P) Ltd",
    citation: "(2005) 273 ITR 1 (SC)",
    court: "Supreme Court",
    year: 2005,
    category: "Capital Gains",
    section1961: "Sections 45 & 55; Section 56",
    section2025: "Sections 67 & 90",
    sectionTopic:
      "Capital gains — charging section; meaning of cost of acquisition",
    issue:
      "Is a payment received for surrendering tenancy rights taxable as capital gains, or can it be assessed as income from other sources?",
    held:
      "A tenancy right is a capital asset, so the consideration falls to be dealt with under the capital gains provisions. If it is not chargeable there, it cannot be assessed under the residuary head instead.",
    facts:
      "The assessee company was the tenant of premises. It surrendered its tenancy rights and received a substantial sum from the landlord as consideration for giving up possession. On the law as it then stood, the tenancy had been acquired without any identifiable cost, so following the reasoning in B.C. Srinivasa Setty the receipt escaped the charge to capital gains because the computation provisions could not be applied. The Revenue, faced with that difficulty, sought instead to bring the amount to tax under the residuary head as income from other sources.",
    proceduralHistory:
      "The Tribunal held in favour of the assessee. The High Court agreed that the amount was not assessable, and the Revenue appealed to the Supreme Court.",
    contentions: {
      assessee:
        "A tenancy right is a capital asset and its surrender is a transfer. The receipt therefore belongs to the head of capital gains. Since no cost of acquisition could be identified, the charge failed on the Srinivasa Setty principle, and the Revenue cannot fall back on the residuary head to tax what a specific head has failed to reach.",
      revenue:
        "If the amount is not chargeable as capital gains, it remains a receipt of an income nature in the assessee's hands and is squarely within the residuary head, which exists precisely to bring to tax income not chargeable under any other head.",
    },
    summary:
      "The Court confirmed that a tenancy right is a capital asset and that its surrender for consideration is a transfer, so the receipt falls to be considered under the head of capital gains. It then addressed the Revenue's alternative case. The heads of income, it held, are mutually exclusive: income that is appropriate to a specific head must be considered under that head alone, and the residuary head applies only to income that does not fall under any of the preceding heads at all. The residuary head is not a safety net permitting the Revenue to tax under a general provision what a specific provision has failed to capture. Because the receipt was in its nature a capital gain, the fact that the computation machinery could not be worked meant it escaped tax altogether; it did not thereby become income from other sources. The Court accordingly upheld the High Court and dismissed the Revenue's appeal.",
    principles: [
      "A tenancy right is a capital asset and its surrender for consideration is a transfer.",
      "The heads of income are mutually exclusive; income appropriate to a specific head is considered only under that head.",
      "The residuary head cannot be used to tax a receipt that a specific head has failed to reach.",
      "Failure of the computation machinery under one head does not shift the receipt to another head.",
    ],
    relevance:
      "The head-exclusivity principle is the lasting value of this case and applies generally under the IT Act 2025. The specific outcome no longer follows, however — Section 90 now prescribes a nil cost of acquisition for tenancy rights, so the computation machinery works and such receipts are today chargeable as capital gains under Section 67. Cite it for the structural proposition, not for the conclusion on taxability.",
    keywords: [
      "tenancy rights",
      "surrender",
      "heads of income",
      "mutually exclusive",
      "income from other sources",
      "nil cost",
      "residuary head",
    ],
  },
  {
    slug: "vodafone-international",
    caseName: "Vodafone International Holdings BV v. Union of India",
    citation: "(2012) 341 ITR 1 (SC)",
    court: "Supreme Court",
    year: 2012,
    category: "Capital Gains",
    section1961: "Sections 9(1)(i) & 45",
    section2025: "Sections 9 & 67",
    sectionTopic:
      "Income deemed to accrue or arise in India; capital gains — charging section",
    issue:
      "Is the sale of shares of a foreign company, whose value derives from underlying Indian assets, chargeable to tax in India?",
    held:
      "On the law as it then stood, no. The transaction was a bona fide offshore transfer of a foreign company's shares, and the Indian authorities had no jurisdiction to tax it.",
    facts:
      "Vodafone International Holdings BV, a Netherlands company, acquired from Hutchison Telecommunications International the entire share capital of CGP Investments, a company incorporated in the Cayman Islands, for approximately USD 11.08 billion. CGP held, through a chain of intermediate companies, a controlling interest of about 67 per cent in an Indian telecom operator. The share purchase was executed outside India between two non-residents. The Indian tax authorities issued a notice treating Vodafone as an assessee in default for failing to withhold tax on the consideration, on the footing that the transaction in substance transferred a capital asset situated in India.",
    proceduralHistory:
      "Vodafone challenged the jurisdiction of the tax authorities before the Bombay High Court, which upheld the Revenue. On appeal, the Supreme Court set aside that decision. Parliament subsequently enacted retrospective amendments to reverse the outcome, and those amendments were themselves withdrawn in 2021 for transactions before that date.",
    contentions: {
      assessee:
        "What was sold was a single share of a Cayman Islands company between two non-residents, outside India. A share is a distinct asset from the underlying assets of the company or its subsidiaries, and the Act as then framed contained no provision taxing an indirect transfer. The holding structure had existed for many years for commercial reasons and was not a device created for the transaction.",
      revenue:
        "The share in the offshore company was merely a device; what was really transferred was the controlling interest in the Indian business, together with a bundle of rights over the Indian operations. The substance of the transaction was the transfer of a capital asset situated in India, and the consideration reflected the value of the Indian business.",
    },
    summary:
      "The Court held that the enquiry must proceed by looking at the transaction as a whole rather than by dissecting it in search of an Indian element. It drew a distinction between a preordained scheme inserted with no commercial purpose other than tax avoidance, which may be disregarded, and a genuine long-standing structure through which investment has been routed, which must be respected. On the facts, the Cayman holding structure had been in place for years, had substance, and had not been created for the purpose of the sale. The Court held that a share in a company is property distinct from the assets of the company, that control is not by itself a capital asset separable from the shareholding, and that the extra-territorial reach asserted by the Revenue was not supported by the language of the deeming provision as it then stood. It also held that the withholding obligation presupposes a sum chargeable to tax and, there being no chargeability, could not be enforced against the buyer. The demand was accordingly quashed and the deposit directed to be refunded.",
    principles: [
      "A transaction is to be viewed as a whole; the 'look at' approach is preferred over dissecting it to find an Indian element.",
      "A genuine, long-standing holding structure with commercial substance is to be respected and not treated as a device.",
      "A share is property distinct from the underlying assets of the company whose share it is.",
      "Legitimate tax planning is permissible; only preordained schemes lacking commercial purpose may be disregarded.",
      "The withholding obligation presupposes that the sum is chargeable to tax in India.",
    ],
    relevance:
      "The decision prompted the indirect-transfer rules, which now sit in Section 9 of the IT Act 2025, so the case no longer decides the taxability question it addressed. Its enduring value lies in the approach to substance and form, the respect accorded to genuine holding structures, and the confirmation that withholding follows chargeability — each of which continues to be argued in cross-border disputes and in general anti-avoidance matters.",
    keywords: [
      "indirect transfer",
      "offshore transaction",
      "substance over form",
      "holding structure",
      "cross-border",
      "look at not look through",
      "tax avoidance",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CHARITABLE TRUSTS & NPOs
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "ahmedabad-urban-development-authority",
    caseName: "ACIT (Exemptions) v. Ahmedabad Urban Development Authority",
    citation: "(2022) 449 ITR 1 (SC)",
    court: "Supreme Court",
    year: 2022,
    category: "Charitable Trusts & NPOs",
    section1961: "Sections 2(15), 11 & 13",
    section2025: "Sections 346 & 355",
    sectionTopic:
      "Restriction on commercial activities by NPOs pursuing general public utility objects; interpretations",
    issue:
      "When does a charity pursuing an object of general public utility cross into 'trade, commerce or business' and lose its exemption?",
    held:
      "A GPU charity may charge fees and generate surplus, but only where the activity is undertaken in the actual course of advancing its object and the receipts stay within the statutory quantitative ceiling. Charging a markedly higher-than-cost price indicates business.",
    facts:
      "The Supreme Court heard a very large batch of appeals, grouped by the character of the assessee. The groups comprised statutory development authorities and improvement trusts constituted under state town planning legislation; statutory regulators such as bodies governing professions and certification; trade promotion councils and export promotion bodies; non-statutory organisations such as chambers of commerce; and private trusts running activities incidentally yielding receipts. Each had been denied exemption, or had it questioned, on the footing that its fee income or sale proceeds meant it was engaged in trade, commerce or business and so fell foul of the proviso to the definition of charitable purpose.",
    proceduralHistory:
      "The appeals came from several High Courts which had reached divergent conclusions on the scope of the proviso introduced in 2008 and amended thereafter. The Court took the opportunity to restate the law comprehensively and to lay down tests applicable across the categories before it.",
    contentions: {
      assessee:
        "The bodies existed to discharge public functions or advance public objects, and any receipts were incidental to that purpose and applied back to it. Recovering cost, or even a modest margin required for viability, does not convert a public object into a trade. Statutory authorities in particular act under compulsion of statute and have no profit motive.",
      revenue:
        "The proviso is plain: where a GPU body carries on any activity in the nature of trade, commerce or business, or renders services in relation thereto for a fee, the purpose ceases to be charitable, irrespective of the application of income. The quantitative relaxation is the only concession, and once receipts cross it, exemption is lost for that year.",
    },
    summary:
      "Chief Justice Chandrachud's judgment restated the law across the categories. The Court held that the proviso does not bar a GPU charity from receiving consideration; what matters is whether the activity is essentially charitable with cost recovery, or is in truth a business. The governing test has two limbs: the activity must be undertaken in the actual course of achieving the GPU object, and the receipts from it must not exceed the quantitative limit prescribed. On the categories, the Court held that statutory corporations, boards and authorities discharging essential public functions on a cost basis, without a profit motive and with their surpluses committed by statute to public purposes, are generally not carrying on business, even though they charge for services. Regulators performing statutory functions stand similarly. Trade promotion bodies and chambers rendering services for fees are, by contrast, within the proviso and must satisfy the quantitative limit, which is to be tested year by year rather than once and for all. The Court emphasised that charging significantly above cost is a strong indicator of business, and that the enquiry is fact-specific; it therefore remitted a number of matters for application of the tests it had laid down, and directed that its interpretation operate prospectively so as not to unsettle concluded assessments.",
    principles: [
      "A GPU charity may charge for services; receipt of consideration does not by itself defeat charitable purpose.",
      "Two limbs must both be satisfied: the activity must advance the GPU object in its actual course, and receipts must stay within the statutory ceiling.",
      "Charging substantially above cost indicates trade, commerce or business; cost recovery does not.",
      "Statutory authorities and regulators discharging public functions on a non-profit basis are generally outside the proviso.",
      "The quantitative limit is applied year by year, so status can change between years.",
      "The enquiry is fact-specific; no single category is exempt or disqualified as a class.",
    ],
    relevance:
      "This is the leading authority on the commercial-activity restriction, which the IT Act 2025 now codifies in Section 346, with the interpretive provisions in Section 355. Any advice on whether a GPU organisation's receipts jeopardise its registration starts here. Note that the Court's year-by-year approach means annual monitoring of the receipts ratio is now a compliance necessity, not merely a planning point.",
    keywords: [
      "general public utility",
      "GPU",
      "trade commerce business",
      "cost recovery",
      "quantitative limit",
      "statutory authority",
      "2(15) proviso",
      "year by year",
    ],
  },
  {
    slug: "new-noble-educational-society",
    caseName: "New Noble Educational Society v. Chief CIT",
    citation: "(2022) 448 ITR 594 (SC)",
    court: "Supreme Court",
    year: 2022,
    category: "Charitable Trusts & NPOs",
    section1961: "Sections 10(23C)(vi) & 11",
    section2025: "Sections 332 & 335",
    sectionTopic:
      "Application for registration of charitable trusts and NPOs; regular income of a registered NPO",
    issue:
      "Does an educational institution seeking exemption have to exist 'solely' for education, and must it comply with other applicable laws to be approved?",
    held:
      "'Solely' means exclusively. An institution with objects extending beyond education does not qualify, even if education is its predominant activity. Compliance with applicable state and regulatory law is also relevant to approval.",
    facts:
      "A number of educational societies in Andhra Pradesh and Telangana applied for approval as institutions existing solely for educational purposes and not for purposes of profit. Their memoranda and trust deeds contained objects extending well beyond education — including relief of the poor, medical relief and other charitable and religious activities — even though in practice they ran educational institutions. Approval was refused, partly on the ground that the objects were not confined to education and partly on the footing that the societies had not established compliance with the state legislation governing educational institutions.",
    proceduralHistory:
      "The Andhra Pradesh High Court upheld the refusals. The societies appealed to the Supreme Court, which considered the correctness of an earlier line of authority — including American Hotel and Queen's Educational Society — that had been read as endorsing a predominant object approach.",
    contentions: {
      assessee:
        "Earlier decisions of the Court had accepted that an institution whose predominant activity is education qualifies, and that incidental objects do not disqualify it. The institutions were in fact running only educational activities, and the wider objects in the deeds were dormant. Registration under other statutes is a separate matter and cannot govern approval under the tax legislation.",
      revenue:
        "The provision confers exemption on an institution existing 'solely' for educational purposes. Where the constitutive document permits a range of non-educational activities, the institution does not exist solely for education, whatever it may currently be doing. The authority is also entitled to satisfy itself that the applicant is genuine and lawfully operating.",
    },
    summary:
      "The Court undertook a detailed review of the authorities and departed from the more permissive approach. It held that where Parliament has used the word 'solely', it must be given full effect: the institution must exist only for education and for no other substantial object. A predominant object test, which suffices under the general definition of charitable purpose, does not satisfy a provision framed in exclusive terms. The Court reasoned that the exemption in question is a distinct and more generous code than the general provisions for charitable trusts, and the stricter threshold is the price of that generosity. Objects clauses permitting the trust to undertake relief of the poor, medical relief or religious activity therefore disqualify the institution, even if unexercised. On the second question, the Court held that the approving authority may require the applicant to demonstrate compliance with the regulatory and state law framework governing educational institutions, since genuineness cannot be assessed in isolation from lawfulness. Conscious of the disruption a change of this magnitude would cause, the Court expressly directed that its interpretation would apply prospectively.",
    principles: [
      "'Solely' means exclusively; a predominant object test does not satisfy a provision framed in exclusive terms.",
      "Objects clauses permitting substantial non-educational activity disqualify the institution, even if those objects are dormant.",
      "The approving authority may examine compliance with the regulatory and state law framework as part of assessing genuineness.",
      "A stricter threshold attaches to the more generous exemption code for specified institutions.",
      "A judicial change of this magnitude was directed to operate prospectively.",
    ],
    relevance:
      "Directly affects registration under Section 332 of the IT Act 2025. In practice it means object clauses need auditing: a widely drafted trust deed is now a live risk at registration or renewal, even where the organisation's actual activity is narrowly educational. Many institutions have responded by amending their constitutive documents to confine the objects, which remains the practical answer.",
    keywords: [
      "solely for education",
      "educational institution",
      "object clause",
      "registration",
      "10(23C)",
      "prospective application",
      "predominant object",
    ],
  },
  {
    slug: "surat-art-silk",
    caseName: "CIT v. Surat Art Silk Cloth Manufacturers Association",
    citation: "(1980) 121 ITR 1 (SC)",
    court: "Supreme Court",
    year: 1980,
    category: "Charitable Trusts & NPOs",
    section1961: "Section 2(15)",
    section2025: "Sections 346 & 355",
    sectionTopic:
      "Restriction on commercial activities by GPU NPOs; interpretations",
    issue:
      "Does an organisation lose charitable status because one of its activities yields profit?",
    held:
      "No. Apply the predominant object test: if the dominant purpose is charitable and profit-making is merely ancillary or incidental to achieving it, the organisation remains charitable.",
    facts:
      "The assessee was an association formed to promote commerce in art silk, silk, cotton and other textiles. Its objects included carrying on activities for the promotion of trade, obtaining import licences and export quotas for members, and allied purposes. It derived income from activities connected with the allotment of quotas and licences. The Revenue denied exemption on the ground that the objects involved the carrying on of an activity for profit, which the then definition of charitable purpose excluded in the case of an object of general public utility.",
    proceduralHistory:
      "The matter was decided by a Bench of five judges of the Supreme Court, which considered and settled a conflict in earlier decisions on the meaning of the restrictive words in the definition.",
    contentions: {
      assessee:
        "The dominant purpose was the promotion of trade and commerce, an object of general public utility. Income arose incidentally from activities undertaken to further that object, and the memorandum prohibited distribution of profits to members. The restrictive words are directed at bodies whose real object is profit-making dressed up as a public purpose.",
      revenue:
        "The definition excludes an object of general public utility which involves the carrying on of any activity for profit. The association's activities in fact generated profit, and the words of the exclusion are attracted regardless of what is done with that profit.",
    },
    summary:
      "The majority held that the correct enquiry is into the dominant or primary purpose for which the body exists, not the incidental generation of surplus. The restrictive words qualify the object, not the activity: they apply where the purpose itself is the carrying on of an activity for profit. Where the primary purpose is the advancement of an object of general public utility, and any profit arises as a by-product of activities undertaken to achieve it and is applied back to that object, the body remains charitable. The Court laid weight on the absence of any right in the members to share in the profits, treating that as strong evidence that profit-making was not an end in itself. It rejected the argument that the mere presence of profit is decisive, observing that many charitable activities necessarily generate receipts and that a contrary construction would deny exemption to bodies plainly pursuing public objects. The test was framed as asking whether, on a fair reading of the constitutive document and the actual activities, the body exists to serve the public object or to make profit.",
    principles: [
      "The dominant or primary purpose of the body governs, not the incidental generation of surplus.",
      "The restrictive words qualify the object, not the activity: they bite where profit-making is itself the purpose.",
      "Profit applied back to the public object, with no right in members to share it, indicates a charitable purpose.",
      "Constitutive documents and actual activities are read together to identify the real object.",
    ],
    relevance:
      "The predominant object test remains the analytical starting point and was expressly considered in the Ahmedabad Urban Development Authority decision. Under the IT Act 2025 it must now be read subject to the codified quantitative restriction in Section 346: satisfying the object test is necessary but no longer sufficient, because receipts from commercial activity must additionally stay within the statutory ceiling.",
    keywords: [
      "predominant object test",
      "profit motive",
      "incidental profit",
      "general public utility",
      "charitable purpose",
      "trade association",
      "dominant purpose",
    ],
  },
  {
    slug: "loka-shikshana-trust",
    caseName: "Sole Trustee, Loka Shikshana Trust v. CIT",
    citation: "(1975) 101 ITR 234 (SC)",
    court: "Supreme Court",
    year: 1975,
    category: "Charitable Trusts & NPOs",
    section1961: "Section 2(15)",
    section2025: "Section 355",
    sectionTopic: "Interpretations for the charitable organisations chapter",
    issue:
      "What does 'education' mean for the purposes of the definition of charitable purpose?",
    held:
      "'Education' means systematic instruction, schooling or training — the process of training and developing knowledge and skill by normal schooling. It does not extend to every activity that spreads knowledge.",
    facts:
      "The trust was established with objects that included educating the people of India generally, and in particular the people of Karnataka, by establishing and running newspapers and journals. Its principal activity was the publication of newspapers, from which it derived income. It claimed exemption on the footing that the dissemination of news and views constituted education, and alternatively that its object was one of general public utility not involving an activity for profit.",
    proceduralHistory:
      "The claim was rejected by the Revenue and through the appellate stages, and the High Court answered against the trust. The matter came to the Supreme Court, where the meaning of 'education' in the statutory definition fell for detailed consideration.",
    contentions: {
      assessee:
        "Newspapers inform and instruct the public and thereby educate them. The word 'education' in the definition is not confined to formal schooling and should be given the wide meaning it bears in ordinary speech, encompassing the spread of knowledge and the shaping of public opinion.",
      revenue:
        "Education in the statutory sense connotes systematic instruction. If any activity that adds to a person's knowledge were education, the word would have almost no limit and the concession would extend to every publisher, broadcaster and entertainer. The trust's real activity was a newspaper business carried on for profit.",
    },
    summary:
      "Justice Khanna held that the word 'education' in the definition is used in the sense of systematic instruction, schooling or training given to the young in preparation for the work of life, and by extension to the development of knowledge and skill by normal schooling. It does not comprehend every acquisition of knowledge, however valuable. The Court observed that travelling, reading newspapers and conversing with others all add to a person's knowledge, but that no one would describe those activities as education in the sense the statute intends. Giving the word its wider colloquial meaning would strip the concession of any discernible boundary. The Court also examined the alternative claim under general public utility and considered whether the activity was carried on for profit, noting the absence of any restriction in the trust deed preventing the trustee from conducting the newspaper as a commercial venture. The claim to exemption accordingly failed.",
    principles: [
      "'Education' in the statutory definition means systematic instruction or schooling, not the general spread of knowledge.",
      "Activities that incidentally increase knowledge — reading newspapers, travel, conversation — are not education.",
      "A construction that leaves a statutory concession without discernible limits is to be rejected.",
      "The absence of any bar on conducting the activity commercially is relevant to whether it is carried on for profit.",
    ],
    relevance:
      "Still the authority on the boundary of 'education' under the IT Act 2025, where the interpretive provisions sit in Section 355. It matters for bodies running seminars, publications, awareness programmes, coaching or online content that assert an educational object, and it should be read with New Noble, which addresses the separate requirement that such an institution exist solely for education.",
    keywords: [
      "education",
      "systematic instruction",
      "newspaper",
      "dissemination of knowledge",
      "charitable purpose",
      "schooling",
      "coaching",
    ],
  },
  {
    slug: "queens-educational-society",
    caseName: "Queen's Educational Society v. CIT",
    citation: "(2015) 372 ITR 699 (SC)",
    court: "Supreme Court",
    year: 2015,
    category: "Charitable Trusts & NPOs",
    section1961: "Section 10(23C)(iiiad)",
    section2025: "Sections 332 & 335",
    sectionTopic:
      "Application for registration of NPOs; regular income of a registered NPO",
    issue:
      "Does an educational institution that generates a surplus thereby exist 'for purposes of profit' and lose its exemption?",
    held:
      "No. Where the surplus arises incidentally and is ploughed back into the educational activity, the institution does not exist for profit. Generating a surplus is not the same as having a profit motive.",
    facts:
      "The societies ran schools and recorded surpluses of receipts over expenditure across the relevant years. The surpluses were applied towards the construction of school buildings and the acquisition of educational infrastructure; nothing was distributed to members. Exemption was denied on the ground that the systematic generation of surplus showed that the institutions existed for purposes of profit rather than solely for education.",
    proceduralHistory:
      "The Uttarakhand High Court decided against the societies, relying on the existence of surpluses. Conflicting approaches had been taken by different High Courts. The Supreme Court took up the matter to resolve the position and reviewed the earlier authorities on the point.",
    contentions: {
      assessee:
        "Every institution must generate some surplus to remain viable, to maintain its plant and to expand. What matters is not whether a surplus arises but what becomes of it. Here it was entirely reinvested in the educational activity and no member benefited, so no profit motive existed.",
      revenue:
        "Substantial and recurring surpluses demonstrate that fees were fixed at a level designed to yield profit. An institution that consistently makes money from its activity cannot be said to exist solely for education and not for purposes of profit.",
    },
    summary:
      "The Court held that the approach taken below was wrong in principle. The correct test looks to the purpose for which the institution exists and to the destination of any surplus, not to the arithmetical fact that receipts exceeded expenditure. An institution that must generate a surplus to remain solvent, to maintain its facilities and to expand its activity, and that applies that surplus to its own educational infrastructure rather than distributing it, does not thereby exist for purposes of profit. The Court reviewed the earlier decisions and disapproved those which had treated the mere existence of a surplus as disqualifying, restoring the position that the predominant object of the activity governs. It cautioned that the position would differ if the surplus were diverted to the benefit of members or applied to non-educational ends, and that the enquiry remains one of fact in each case.",
    principles: [
      "The existence of a surplus is not the same as a profit motive; the destination of the surplus is what matters.",
      "Surplus reinvested in the institution's own educational infrastructure is consistent with existing solely for education.",
      "An institution may generate surplus to remain viable and to expand without losing its character.",
      "Diversion of surplus to members or to non-educational ends would change the analysis.",
    ],
    relevance:
      "Frequently needed under the IT Act 2025 where an Assessing Officer points to accumulated surpluses as evidence of commerciality. It must now be read alongside New Noble, which tightened the 'solely' requirement at the level of objects, and alongside the Section 346 restriction on commercial activity — Queen's answers the surplus point but does not cure a defectively drafted objects clause.",
    keywords: [
      "surplus",
      "profit motive",
      "ploughed back",
      "educational institution",
      "exemption",
      "viability",
      "destination of surplus",
    ],
  },
  {
    slug: "thanthi-trust",
    caseName: "CIT v. Thanthi Trust",
    citation: "(2001) 247 ITR 785 (SC)",
    court: "Supreme Court",
    year: 2001,
    category: "Charitable Trusts & NPOs",
    section1961: "Sections 11(4) & 11(4A)",
    section2025: "Section 344",
    sectionTopic: "Business undertaking held as property of an NPO",
    issue:
      "Can a trust that runs a business claim exemption where the business income is applied to its charitable objects?",
    held:
      "Yes. Where the business is held under trust, or is incidental to attaining the trust's objectives, and separate books are maintained, the income is eligible for exemption provided it is applied to the charitable purpose.",
    facts:
      "The trust owned and published a well-known Tamil daily newspaper. Its objects, as amended, were to devote the income of the newspaper business to the establishment and support of educational institutions. The newspaper business was substantial and was itself trust property. The Revenue denied exemption on the ground that the trust was carrying on a business, relying on the successive statutory provisions restricting exemption for business income of charitable trusts.",
    proceduralHistory:
      "The matter had a long history through the appellate hierarchy and turned on the effect of amendments made to the governing provisions in 1984 and 1992, which altered the conditions attaching to business income of charitable trusts. The Supreme Court examined the position across the different statutory regimes.",
    contentions: {
      assessee:
        "The newspaper business was itself held under trust, so its income is income derived from property held under trust and falls within the exemption. After the 1992 amendment, exemption is available where the business is incidental to the attainment of the objectives and separate books are kept, both of which conditions were satisfied.",
      revenue:
        "The provisions were amended to curtail exemption for trusts carrying on business. A newspaper business of this scale is not incidental to educational objects; it is a substantial commercial undertaking in its own right, and the exemption should not extend to it.",
    },
    summary:
      "The Court traced the statutory history in detail and held that the answer differed across the periods. Under the regime in which exemption attached to income derived from property held under trust, a business itself held under trust qualified, because the business was the trust property from which the income was derived. Following the 1992 amendment, the governing condition became whether the business is incidental to the attainment of the objectives of the trust and whether separate books of account are maintained. The Court held that a business whose income is applied to the trust's charitable objects is incidental to the attainment of those objects; the word does not require the business to be small or ancillary in scale, but looks to the relationship between the business and the purposes served. Since the newspaper's income was devoted to education, and separate books were kept, the conditions were met. What mattered was the destination of the income and compliance with the record-keeping requirement, not the fact that a commercial activity was being carried on.",
    principles: [
      "A business held under trust is itself trust property, and its income is income derived from property held under trust.",
      "A business whose income is applied to the trust's objects is 'incidental to the attainment of the objectives'.",
      "Incidental refers to the relationship between business and purpose, not to the scale of the business.",
      "Separate books of account for the business are a mandatory condition of exemption.",
    ],
    relevance:
      "Section 344 of the IT Act 2025 deals with a business undertaking held as property of an NPO. The decision remains the principal authority on when trust-held business income retains exemption, subject now to the commercial-activity ceiling in Section 346 for organisations whose object is general public utility — a restriction that did not apply on these facts, the objects being educational.",
    keywords: [
      "business held in trust",
      "incidental business",
      "separate books",
      "application of income",
      "newspaper",
      "11(4A)",
      "destination of income",
    ],
  },
  {
    slug: "programme-for-community-organisation",
    caseName: "CIT v. Programme for Community Organisation",
    citation: "(2001) 248 ITR 1 (SC)",
    court: "Supreme Court",
    year: 2001,
    category: "Charitable Trusts & NPOs",
    section1961: "Section 11(1)(a)",
    section2025: "Sections 341 & 342",
    sectionTopic:
      "Application of income by a charitable trust; accumulated income",
    issue:
      "Is the permitted accumulation computed on gross receipts, or only on the net income remaining after application?",
    held:
      "On gross receipts. The trust is entitled to accumulate the statutory percentage of the total income derived from property held under trust, not of the balance left over.",
    facts:
      "The trust received donations of approximately ₹2.57 lakh in the relevant year and applied about ₹1.70 lakh to its charitable objects, leaving a balance of roughly ₹87,000. It claimed accumulation of twenty-five per cent — the percentage then permitted — computed on the gross receipts of ₹2.57 lakh, which came to about ₹64,000. The Assessing Officer took the view that the permitted accumulation should be computed on the unapplied balance of ₹87,000 rather than on the gross figure, producing a much smaller allowance and bringing the difference to tax.",
    proceduralHistory:
      "The Kerala High Court decided in favour of the trust, holding that the accumulation was to be computed on gross receipts. The Revenue appealed to the Supreme Court, which disposed of the matter by a short judgment affirming the High Court.",
    contentions: {
      assessee:
        "The provision permits accumulation of a specified percentage of the income derived from property held under trust. That income is the gross receipts of the trust. Nothing in the language directs the percentage to be applied to a residue computed after deducting amounts already spent on the objects.",
      revenue:
        "Accumulation is concerned with what remains unspent. Allowing the percentage on gross receipts, when a large part has already been applied, over-compensates the trust and permits a larger sum to escape tax than the provision intends.",
    },
    summary:
      "The Court took the straightforward view that the statutory language governs. The provision entitles the trust to accumulate or set apart a specified percentage of the income derived from property held under trust, and on the facts that income was the gross donations received, namely ₹2.57 lakh. Twenty-five per cent of that figure was accordingly available for accumulation, and the assessment computing it on the unapplied residue was wrong. The judgment is brief and does not elaborate at length, but it settled a point on which differing approaches had been taken, and it has been consistently applied since. The effect is that the trust first determines the permitted accumulation on gross receipts, and the requirement to apply income to charitable purposes operates on the remainder.",
    principles: [
      "Permitted accumulation is computed on the gross income derived from property held under trust.",
      "The percentage is not applied to the residue remaining after amounts have been spent on the objects.",
      "The statutory language governs the computation base; no netting-off is to be read into it.",
    ],
    relevance:
      "The accumulation mechanism now sits in Sections 341 and 342 of the IT Act 2025. The computation base continues to matter in every trust assessment, and this remains the authority for taking gross receipts rather than a post-application residue. It is a short judgment but a decisive one, and is routinely cited in trust computations.",
    keywords: [
      "accumulation",
      "15 per cent",
      "gross receipts",
      "application of income",
      "set apart",
      "11(1)(a)",
      "computation base",
    ],
  },
  {
    slug: "dawoodi-bohara-jamat",
    caseName: "CIT v. Dawoodi Bohara Jamat",
    citation: "(2014) 364 ITR 31 (SC)",
    court: "Supreme Court",
    year: 2014,
    category: "Charitable Trusts & NPOs",
    section1961: "Sections 12AA & 13(1)(b)",
    section2025: "Sections 332 & 351",
    sectionTopic:
      "Application for registration; specified violation by a charitable organisation",
    issue:
      "Can a trust with both religious and charitable objects be refused registration on the ground that it benefits a particular religious community?",
    held:
      "No. A composite religious and charitable trust is entitled to registration. The restriction concerning benefit to a particular community goes to the allowance of exemption at assessment, not to the grant of registration.",
    facts:
      "The trust's objects included maintaining places of worship and religious institutions of the Dawoodi Bohara community, providing religious instruction, and also a range of charitable activities such as assistance to the poor, medical relief and education, some of which were expressed to be for the benefit of members of that community. Registration was refused on the footing that the trust existed for the benefit of a particular religious community, which the statute treats as disentitling.",
    proceduralHistory:
      "The Tribunal directed registration and the High Court upheld that direction. The Revenue appealed to the Supreme Court, which examined both the nature of composite trusts and the stage at which the community-benefit restriction operates.",
    contentions: {
      assessee:
        "The trust pursues both religious and charitable objects, a composite character long recognised in Indian law. At the registration stage the authority is confined to examining the objects and the genuineness of the activities. Whether a particular receipt or application attracts the community-benefit restriction is a matter for assessment, when actual activities can be examined.",
      revenue:
        "The restriction denies the benefit of the exemption provisions to a trust established for the benefit of any particular religious community. If the trust is so established, registration serves no purpose and should be refused at the threshold.",
    },
    summary:
      "The Court held the refusal misconceived on two counts. First, it confirmed that Indian law recognises trusts established for composite religious and charitable purposes, and that the statutory scheme accommodates them; a trust does not lose its entitlement merely because its objects span both. Second, and more importantly for practice, the Court held that the registration enquiry is confined to the objects of the trust and the genuineness of its activities. The community-benefit restriction is a provision governing the allowance of exemption in the course of assessment; it determines what income escapes tax, not whether the trust may be registered. The authority cannot at the threshold conduct the enquiry that the assessment provisions contemplate. The Court also observed that objects benefiting a religious community may nonetheless include activities open to the public at large, and that the matter cannot be determined in the abstract before activities have been examined. Registration was accordingly upheld.",
    principles: [
      "Indian law recognises composite trusts pursuing both religious and charitable purposes.",
      "The registration enquiry is confined to the objects of the trust and the genuineness of its activities.",
      "The community-benefit restriction operates at the assessment stage, governing exemption rather than registration.",
      "Grounds that belong to assessment cannot be deployed to refuse registration at the threshold.",
    ],
    relevance:
      "Maps onto the IT Act 2025 split between registration under Section 332 and specified violations under Section 351. The case is the standard answer where registration is refused or cancelled on grounds that properly belong to the assessment stage, and it is often paired with American Hotel, which draws the same threshold-versus-monitoring distinction.",
    keywords: [
      "composite trust",
      "religious and charitable",
      "particular community",
      "registration stage",
      "12AA",
      "13(1)(b)",
      "genuineness",
    ],
  },
  {
    slug: "andhra-chamber-of-commerce",
    caseName: "CIT v. Andhra Chamber of Commerce",
    citation: "(1965) 55 ITR 722 (SC)",
    court: "Supreme Court",
    year: 1965,
    category: "Charitable Trusts & NPOs",
    section1961: "Section 2(15)",
    section2025: "Sections 346 & 355",
    sectionTopic:
      "Restriction on commercial activities by GPU NPOs; interpretations",
    issue:
      "Is the promotion of trade and commerce an object of general public utility, where the members of the body also benefit?",
    held:
      "Yes. Promoting and protecting trade and industry serves the public interest. That members derive an incidental benefit does not deprive the object of its public character.",
    facts:
      "The chamber was established with objects directed at promoting and protecting trade, commerce and industry in India, and at aiding and stimulating the development of the country's resources. Its memorandum prohibited the distribution of profits to members. It derived income including rent from property it owned. The Revenue denied exemption, contending that the objects were directed at the benefit of its trader members rather than the public, and therefore did not constitute an object of general public utility.",
    proceduralHistory:
      "The matter came before the Supreme Court on appeal, and the Court examined what is required for a purpose to qualify as being of general public utility and how incidental benefit to members affects that characterisation.",
    contentions: {
      assessee:
        "The promotion and protection of trade, commerce and industry benefits the community at large by stimulating economic activity. Members cannot take profits, and any advantage they obtain is a consequence of the public object rather than its purpose.",
      revenue:
        "The chamber existed to serve the interests of its own members, who were traders. A body advancing the interests of a defined group of businessmen is not advancing an object of general public utility.",
    },
    summary:
      "The Court held that the promotion and protection of trade, commerce and industry is an object of general public utility. It explained that the section of the community sought to be benefited need not be the whole of mankind or even the whole population of the country; it is enough that the class is defined by reference to a quality of a public nature, rather than being constituted by a personal relationship such as descent from a common ancestor or employment by a particular employer. Traders and industrialists engaged in the country's commerce form such a class. The Court held further that an object may be of general public utility even though advancing it incidentally benefits those who belong to the class, and that the absence of any right in members to participate in profits was significant. It also addressed the treatment of the chamber's property income, holding that income from property held under trust for such purposes fell within the exemption.",
    principles: [
      "The section of the public benefited need not be the whole community; a class defined by a public quality suffices.",
      "A class constituted by personal relationship — common descent, or a common employer — is not a section of the public.",
      "Incidental benefit to members does not convert a public object into a private one.",
      "Promotion and protection of trade, commerce and industry is an object of general public utility.",
    ],
    relevance:
      "Long-standing authority for trade bodies, chambers and industry associations. Under the IT Act 2025 the object question it answers is only the first step: such bodies must additionally satisfy the commercial-activity restriction in Section 346, and the Ahmedabad Urban Development Authority decision applies that restriction squarely to fee-charging trade associations. Andhra Chamber establishes entitlement in principle; Section 346 now governs whether it survives in a given year.",
    keywords: [
      "chamber of commerce",
      "trade association",
      "general public utility",
      "section of the public",
      "incidental benefit to members",
      "class of public",
    ],
  },
  {
    slug: "american-hotel-lodging",
    caseName:
      "American Hotel & Lodging Association Educational Institute v. CBDT",
    citation: "(2008) 301 ITR 86 (SC)",
    court: "Supreme Court",
    year: 2008,
    category: "Charitable Trusts & NPOs",
    section1961: "Section 10(23C)(vi)",
    section2025: "Sections 332 & 348",
    sectionTopic:
      "Application for registration; audit of accounts of charitable organisations",
    issue:
      "What may the prescribed authority examine when granting approval, and can approval be refused for anticipated non-application of income?",
    held:
      "At the threshold the authority examines the objects and the genuineness of the institution. Application of income is a matter for monitoring afterwards through the statutory conditions, not a ground for refusing approval at the outset.",
    facts:
      "The applicant was a foreign educational institute conducting hospitality and lodging education, which sought approval as an institution existing solely for educational purposes. Approval was declined on the footing that the institute had not applied, and was not shown likely to apply, its income to educational purposes in India, part of its surplus being remitted abroad to its parent body.",
    proceduralHistory:
      "The refusal was challenged and the matter reached the Supreme Court, which examined the structure of the approval provision and the distinction between the conditions governing entry and those governing continued entitlement.",
    contentions: {
      assessee:
        "The provision requires the applicant to exist solely for educational purposes and not for profit. Those are the threshold conditions. The obligations concerning the application and accumulation of income are conditions of continued entitlement, enforceable by withdrawal of approval if breached, and cannot be converted into grounds for refusing entry.",
      revenue:
        "The authority is entitled to satisfy itself that the exemption will not be misused. If the institution's pattern of dealing with its income shows that it will not be applied to educational purposes in India, approval may properly be refused at the outset.",
    },
    summary:
      "The Court drew a clear line between threshold conditions and monitoring conditions. At the stage of approval, the prescribed authority is concerned with whether the applicant genuinely exists for the stated educational purpose and not for profit; that is an enquiry into objects and genuineness. The provisions requiring income to be applied or accumulated in a particular manner operate thereafter, and compliance with them is to be checked in the ordinary course of assessment, with the sanction of withdrawal of approval available on breach. The Court held that the authority may, when granting approval, impose stipulations of that monitoring character — requiring the institution to apply its income in the prescribed manner and to furnish accounts — but may not refuse approval by anticipating a future failure. It remitted the matter for reconsideration on that footing, directing that approval be considered in the light of the distinction it had drawn.",
    principles: [
      "Threshold conditions concern the objects and genuineness of the institution; they govern entry.",
      "Conditions on application and accumulation of income are monitoring conditions, enforced after approval.",
      "Approval cannot be refused by anticipating future non-compliance with monitoring conditions.",
      "The authority may attach stipulations of a monitoring character when granting approval.",
      "Breach of monitoring conditions is met by withdrawal of approval, not by refusal at the threshold.",
    ],
    relevance:
      "The threshold-versus-monitoring distinction continues to apply to registration under Section 332 of the IT Act 2025, with the audit and reporting obligations in Sections 347 to 349 serving the monitoring function. Useful wherever registration is refused on grounds relating to future conduct. Note that New Noble has since tightened what the threshold enquiry itself involves, so this case governs the stage of the enquiry rather than its stringency.",
    keywords: [
      "approval stage",
      "threshold conditions",
      "monitoring conditions",
      "genuineness",
      "application of income",
      "withdrawal of approval",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TRANSFER PRICING
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "sap-labs-india",
    caseName: "SAP Labs India Pvt Ltd v. Income Tax Officer",
    citation: "(2023) 454 ITR 121 (SC)",
    court: "Supreme Court",
    year: 2023,
    category: "Transfer Pricing",
    section1961: "Sections 92C & 92CA",
    section2025: "Sections 165 & 166",
    sectionTopic:
      "Determination of arm's length price; reference to the Transfer Pricing Officer",
    issue:
      "Can a High Court examine the determination of the arm's length price in appeal, or is the selection of comparables always a question of fact beyond its jurisdiction?",
    held:
      "High Courts can and must examine whether the arm's length price was determined in accordance with the statute and the Rules. Transfer pricing appeals are not immune from scrutiny merely because they involve comparables.",
    facts:
      "A very large batch of appeals reached the Supreme Court in which High Courts — following the Karnataka High Court's decision in Softbrands India — had declined to entertain Revenue and taxpayer appeals against Tribunal orders on transfer pricing. The consistent reasoning below was that the selection and rejection of comparable companies, the application of filters such as turnover and related-party transaction thresholds, and the making of economic adjustments were all matters of fact, so no substantial question of law arose and the appeals were not maintainable. The effect was that Tribunal determinations of arm's length price had become effectively final, whatever their reasoning.",
    proceduralHistory:
      "The lead matters came from the Karnataka High Court, with connected appeals from several other High Courts which had adopted the same approach. The Supreme Court heard them together to settle the maintainability question across the country.",
    contentions: {
      assessee:
        "In many of the matters the taxpayers themselves supported appellate scrutiny, since the reasoning below cut both ways: Tribunal orders adverse to taxpayers were equally insulated from review. The statutory methods and the Rules are binding, and whether they have been followed is a question of law.",
      revenue:
        "Chapter X prescribes methods, and the Rules prescribe how comparability is to be judged. A determination made without following the prescribed method, or by ignoring relevant material, or on a perverse view of the evidence, raises a substantial question of law which the High Court is bound to consider under Section 260A.",
    },
    summary:
      "The Court disapproved the blanket approach that had developed. It held that in each case the High Court must examine whether the Tribunal, while determining the arm's length price, followed the guidelines laid down under the Act and the Rules — namely Chapter X and Rules 10A to 10E. Where the determination has been made without adhering to the prescribed methods, or by disregarding relevant considerations, or on the basis of irrelevant material, or where the exercise is otherwise perverse, a substantial question of law arises and the appeal is maintainable. The Court was careful to state that it was not opening every comparability dispute to fresh argument: findings reached after a proper application of the statutory method remain findings of fact. What it rejected was the proposition that transfer pricing determinations are, as a class, beyond the appellate jurisdiction of the High Court. It accordingly remitted the large batch of appeals to the respective High Courts for consideration on the merits in the light of these observations.",
    principles: [
      "Transfer pricing determinations are not, as a class, immune from High Court scrutiny under Section 260A.",
      "Whether the Tribunal followed the prescribed methods and Rules in determining the arm's length price is a question of law.",
      "Determinations made on irrelevant material, ignoring relevant considerations, or perversely, raise a substantial question of law.",
      "Findings reached after a proper application of the statutory method remain findings of fact and are not reopened.",
    ],
    relevance:
      "The single most consequential recent transfer pricing decision. It reopened High Court scrutiny of Tribunal orders on arm's length pricing, which now sits in Sections 165 and 166 of the IT Act 2025. In practice it means the statutory method and the Rules must be visibly applied in the order itself, with reasons, because appellate review is now available where they are not. It cuts both ways — taxpayers and the Revenue alike can pursue appeals that would previously have been dismissed at the threshold.",
    keywords: [
      "arm's length price",
      "substantial question of law",
      "comparables",
      "appeal maintainability",
      "Softbrands",
      "TPO",
      "section 260A",
    ],
  },
  {
    slug: "sony-ericsson-amp",
    caseName: "Sony Ericsson Mobile Communications India Pvt Ltd v. CIT",
    citation: "(2015) 374 ITR 118 (Del)",
    court: "Delhi High Court",
    year: 2015,
    category: "Transfer Pricing",
    section1961: "Sections 92B & 92C",
    section2025: "Sections 163 & 165",
    sectionTopic:
      "Meaning of international transaction; determination of arm's length price",
    issue:
      "Can advertisement, marketing and promotion expenditure incurred by an Indian distributor be treated as a separate international transaction benefiting the foreign brand owner, using a 'bright line' of comparable spending?",
    held:
      "The bright line test has no statutory basis and cannot be used to carve out a notional international transaction. Where the distributor is adequately compensated overall, no separate adjustment for marketing spend is warranted.",
    facts:
      "The appellants were Indian subsidiaries and distributors of well-known multinational consumer brands. Each incurred substantial expenditure on advertisement, marketing and promotion in India. The Transfer Pricing Officer compared that expenditure, as a proportion of sales, with the corresponding ratio for selected comparable companies. The excess over the comparables' ratio — the so-called bright line — was treated as expenditure incurred not for the Indian company's own business but for building the foreign associated enterprise's brand in India. That excess was characterised as a separate international transaction and an adjustment was made, often with a mark-up added on the footing that the Indian company had rendered a brand-building service.",
    proceduralHistory:
      "The approach had been adopted by a Special Bench of the Tribunal in the LG Electronics case, and a batch of appeals against it came before the Delhi High Court, which considered the question for the group of distributors together.",
    contentions: {
      assessee:
        "Marketing expenditure is incurred to sell the taxpayer's own products and earn its own revenue. Any benefit to the brand owner is incidental. Neither the Act nor the Rules contemplate a bright line, and there is no provision permitting a notional transaction to be constructed from a comparison of expenditure ratios. Where the overall margin earned by the distributor is at arm's length, the functions performed — including the marketing — have been remunerated.",
      revenue:
        "Excessive marketing spend enhances a brand owned by the foreign parent, creating a marketing intangible in the parent's hands at the Indian company's cost. That is a benefit conferred on an associated enterprise which must be compensated, and the bright line supplies a workable means of quantifying the uncompensated portion.",
    },
    summary:
      "The Court held that the bright line test had no foundation in the statute or the Rules. Chapter X requires the price of an actual international transaction to be determined at arm's length; it does not authorise the construction of a notional transaction by reference to how much comparables happen to spend. Segregating expenditure into a portion said to benefit the taxpayer and a portion said to benefit the brand owner was an exercise the legislation nowhere contemplates. The Court accepted that marketing expenditure can be relevant where an international transaction genuinely exists — for instance where the foreign enterprise has agreed to reimburse or has directed the spend — but held that the existence of such a transaction must be established rather than inferred from a ratio. It endorsed the use of bundled or aggregated benchmarking where distribution and marketing functions are closely interlinked, holding that if the net margin earned by the distributor compares favourably with comparables performing similar functions, the marketing function stands remunerated and no separate adjustment arises. It also cautioned against mechanically adding a mark-up on the supposed brand-building service.",
    principles: [
      "The bright line test has no statutory basis and cannot be used to quantify a transfer pricing adjustment.",
      "Chapter X prices actual transactions; it does not permit a notional transaction to be constructed.",
      "Marketing expenditure benefiting the brand owner incidentally is not by that fact a service rendered to it.",
      "Bundled benchmarking is appropriate where distribution and marketing functions are interlinked.",
      "An adequate overall net margin indicates that all functions performed, including marketing, have been remunerated.",
    ],
    relevance:
      "Still the governing authority on marketing expenditure adjustments, which continue under Sections 163 and 165 of the IT Act 2025. The threshold question it settles — whether an international transaction exists at all before pricing is considered — remains the first line of defence for Indian distributors of foreign brands, and the endorsement of bundled benchmarking is regularly relied on in practice.",
    keywords: [
      "AMP expenses",
      "bright line test",
      "brand building",
      "distributor",
      "bundled transaction",
      "marketing intangible",
      "LG Electronics",
    ],
  },
  {
    slug: "maruti-suzuki-amp",
    caseName: "Maruti Suzuki India Ltd v. CIT",
    citation: "(2016) 381 ITR 117 (Del)",
    court: "Delhi High Court",
    year: 2016,
    category: "Transfer Pricing",
    section1961: "Sections 92B & 92C",
    section2025: "Sections 163 & 165",
    sectionTopic:
      "Meaning of international transaction; determination of arm's length price",
    issue:
      "In the absence of any agreement or arrangement with the foreign associated enterprise regarding marketing spend, can an international transaction be inferred from the quantum of that spend alone?",
    held:
      "No. The existence of an international transaction must be established as a fact before any pricing exercise begins. It cannot be inferred merely because the Indian entity's marketing expenditure is high.",
    facts:
      "The taxpayer, a well-known Indian automobile manufacturer with a foreign parent, incurred substantial advertisement, marketing and promotion expenditure in India in relation to vehicles it manufactured and sold on its own account. There was no agreement with the foreign associated enterprise requiring it to incur that expenditure, no reimbursement arrangement, and no provision obliging it to promote the foreign brand as such. The Transfer Pricing Officer nonetheless applied the bright line approach, treated the excess spend as a transaction with the associated enterprise, and made an adjustment with a mark-up for the brand-promotion service said to have been rendered.",
    proceduralHistory:
      "The matter came before the Delhi High Court after Sony Ericsson, which had addressed the quantification of such adjustments in the context of distributors. Here the Court was concerned with a manufacturer and, more fundamentally, with the anterior question of whether a transaction existed at all.",
    contentions: {
      assessee:
        "Chapter X applies to an international transaction, which the statute defines as a transaction between associated enterprises. A transaction requires an arrangement, understanding or action in concert. None existed. The taxpayer spent its own money to sell its own products in its own market, and any benefit to the brand owner was incidental to that commercial activity.",
      revenue:
        "The disproportionate level of expenditure is itself evidence that the Indian company was acting in the interest of the foreign brand owner. Where spending so far exceeds that of comparables, an arrangement may be inferred, and the definition of international transaction is wide enough to cover it.",
    },
    summary:
      "The Court addressed the question that logically precedes quantification: whether there is an international transaction at all. It held that the existence of such a transaction is a jurisdictional fact which the Revenue must establish, and cannot be assumed from the magnitude of expenditure. A transaction, even on the extended statutory definition, presupposes an arrangement, understanding or action in concert between the associated enterprises in relation to the expenditure in question. The Court held that no such arrangement could be inferred simply because the Indian company spent more than comparables; businesses spend what they judge necessary to sell their products, and the fact that a brand owner derives incidental benefit from successful marketing of its products in India does not convert the expenditure into a service rendered to it. It also observed that the machinery provisions offer no means of determining the price of a transaction whose very terms have never been identified, which itself indicates that no such transaction was contemplated. Absent a transaction, there was nothing to benchmark, and the adjustment was deleted.",
    principles: [
      "The existence of an international transaction is a jurisdictional fact the Revenue must establish.",
      "A transaction presupposes an arrangement, understanding or action in concert between associated enterprises.",
      "High expenditure relative to comparables does not by itself permit an arrangement to be inferred.",
      "Incidental benefit to a brand owner is not a service rendered to it.",
      "Where the terms of the supposed transaction cannot be identified, the pricing machinery cannot operate.",
    ],
    relevance:
      "Read with Sony Ericsson, this sets the two-stage analysis that still applies under Sections 163 and 165 — first whether an international transaction exists, and only then how it should be priced. It is the leading authority where an adjustment is proposed on marketing spend with no underlying agreement, and the jurisdictional-fact framing makes it a stronger defence than arguments directed only at quantification.",
    keywords: [
      "AMP expenses",
      "existence of international transaction",
      "arrangement",
      "action in concert",
      "incidental benefit",
      "burden on revenue",
      "jurisdictional fact",
    ],
  },
  {
    slug: "vodafone-india-services",
    caseName: "Vodafone India Services Pvt Ltd v. Union of India",
    citation: "(2014) 368 ITR 1 (Bom)",
    court: "Bombay High Court",
    year: 2014,
    category: "Transfer Pricing",
    section1961: "Sections 92 & 92B",
    section2025: "Sections 161 & 163",
    sectionTopic:
      "Computation of income from an international transaction having regard to arm's length price; meaning of international transaction",
    issue:
      "Where shares are issued to a foreign associated enterprise at a premium said to be below fair value, can the shortfall be treated as income and subjected to transfer pricing adjustment?",
    held:
      "No. The issue of shares at a premium is a capital account transaction that gives rise to no income. Transfer pricing provisions are machinery for computing income and cannot create income where none arises.",
    facts:
      "The Indian company issued equity shares to its non-resident group holding company at a premium, valuing the shares on a stated basis. The Transfer Pricing Officer took the view that the shares had been undervalued, computed what he regarded as the correct arm's length value, and treated the shortfall between that value and the issue price as a transfer of value to the associated enterprise. He then treated the shortfall as a deemed loan advanced by the Indian company to its parent and imputed interest on it, making adjustments on both counts.",
    proceduralHistory:
      "The taxpayer challenged the jurisdiction by writ petition before the Bombay High Court, contending that the entire exercise was without authority of law. The Court decided the matter on the fundamental question of chargeability, and the Union subsequently accepted the decision and directed that it not be appealed.",
    contentions: {
      assessee:
        "Chapter X is a machinery provision for computing income arising from an international transaction. The issue of shares is a transaction on capital account: the premium received is a capital receipt, and no income arises from it. Where there is no income, there is nothing for the machinery to compute, and a shortfall in premium cannot be converted into taxable income by the transfer pricing provisions.",
      revenue:
        "The transaction is between associated enterprises and falls within the wide definition of international transaction, which includes capital financing. The failure to charge full value transferred an economic benefit abroad, and the provisions exist precisely to neutralise such transfers.",
    },
    summary:
      "The Court held the entire exercise to be without jurisdiction. It reasoned that Chapter X does not contain a charging provision; it supplies machinery for computing income that arises from an international transaction, having regard to the arm's length price. The foundational requirement is therefore that income must arise. The issue of shares at a premium is a transaction on capital account between a company and its subscriber: the amount received, including the premium, is capital and is not income. It followed that even if the shares had been issued at less than fair value, the shortfall was not income but at most a lesser receipt of capital. The Court held that neither the residual clause of the definition of international transaction nor the reference to capital financing could convert a capital receipt into income, since the definition operates within Chapter X and is subject to the same requirement of income arising. The consequential treatment of the shortfall as a deemed loan, and the imputation of interest upon it, fell away with the primary adjustment, being founded on a transaction the Court had held did not give rise to income.",
    principles: [
      "Chapter X is machinery for computing income; it is not a charging provision.",
      "Income must arise from an international transaction before the arm's length machinery can operate.",
      "Issue of shares at a premium is a capital account transaction producing no income.",
      "A shortfall in share premium cannot be recharacterised as a deemed loan attracting notional interest.",
      "The width of the definition of international transaction does not dispense with the requirement that income arise.",
    ],
    relevance:
      "The income-first principle carries directly into Sections 161 and 163 of the IT Act 2025, which remain computation provisions rather than charging ones. The decision was accepted by the Government and continues to govern capital-account dealings with associated enterprises, including share issues, conversions and similar capital restructurings.",
    keywords: [
      "share premium",
      "capital account",
      "no income no TP",
      "computation machinery",
      "chapter X",
      "deemed loan",
      "notional interest",
    ],
  },
  {
    slug: "ekl-appliances",
    caseName: "CIT v. EKL Appliances Ltd",
    citation: "(2012) 345 ITR 241 (Del)",
    court: "Delhi High Court",
    year: 2012,
    category: "Transfer Pricing",
    section1961: "Sections 92C & 92CA",
    section2025: "Sections 165 & 166",
    sectionTopic:
      "Determination of arm's length price; reference to the Transfer Pricing Officer",
    issue:
      "May the Transfer Pricing Officer disallow a payment to an associated enterprise on the ground that the taxpayer derived no benefit, or that the expenditure was commercially unnecessary?",
    held:
      "No. The officer's mandate is to determine the price of the transaction, not to sit in judgment on whether the taxpayer should have entered into it. Commercial expediency is for the businessman to decide.",
    facts:
      "The taxpayer paid brand fee and royalty to its foreign associated enterprise for the use of technology and trademarks in manufacturing. It had incurred losses over a number of years. The Transfer Pricing Officer reasoned that a company making continuous losses could not be said to have derived any benefit from the technology or the brand, and determined the arm's length price of the royalty and brand fee at nil, disallowing the payments in their entirety rather than adjusting their quantum.",
    proceduralHistory:
      "The Tribunal deleted the adjustment, holding that the officer had exceeded his function. The Revenue appealed to the Delhi High Court, which considered the scope of the power to determine arm's length price and the circumstances in which a transaction may be disregarded.",
    contentions: {
      assessee:
        "The function of the officer is to determine the price at which the transaction would have been entered into between unrelated parties, not to ask whether it should have been entered into at all. Whether the expenditure yielded a benefit, and whether it was commercially prudent, are matters for the businessman. Continuing losses may have many causes and do not establish that the technology was worthless.",
      revenue:
        "If no benefit was received, an independent enterprise would not have paid anything, so the arm's length price of the payment is nil. Determining that price at nil is an exercise of the pricing function, not a disallowance on grounds of expediency.",
    },
    summary:
      "The Court held that the transfer pricing provisions permit the price of a transaction to be adjusted to arm's length, but do not permit the transaction itself to be disregarded or recharacterised, save in exceptional situations. Drawing on the OECD Transfer Pricing Guidelines, it identified two such situations: where the economic substance of a transaction differs from its form, and where the arrangements, viewed in their totality, differ from those which independent enterprises behaving in a commercially rational manner would have adopted, and the actual structure practically impedes the determination of an appropriate price. Outside those circumstances, the transaction as structured by the parties must be respected. The Court held that it is not for the Revenue to question the commercial expediency of expenditure, a principle long established in the general law of deductions and equally applicable here. Whether a benefit resulted, and whether the taxpayer's judgment in incurring the expenditure was sound, are not the officer's concern. Losses may result from market conditions, pricing, competition or many other causes, and do not demonstrate that technology or brand rights conferred no value. The determination of nil was accordingly set aside.",
    principles: [
      "The transfer pricing power is to adjust price, not to disregard or recharacterise the transaction.",
      "Recharacterisation is permissible only in the two exceptional situations recognised in the OECD Guidelines.",
      "Commercial expediency of expenditure is for the businessman, not the Revenue, to judge.",
      "Continuing losses do not establish that intra-group technology or brand rights conferred no benefit.",
      "A benefit test or need test is not a substitute for a pricing exercise.",
    ],
    relevance:
      "Frequently invoked under Sections 165 and 166 whenever an adjustment is framed as a benefit test or a need test rather than a pricing exercise. It remains the principal authority limiting recharacterisation of intra-group service, royalty and management fee arrangements, and its adoption of the OECD recharacterisation threshold continues to be cited.",
    keywords: [
      "commercial expediency",
      "benefit test",
      "recharacterisation",
      "royalty",
      "intra-group services",
      "OECD guidelines",
      "nil ALP",
    ],
  },
  {
    slug: "li-and-fung",
    caseName: "Li & Fung India Pvt Ltd v. CIT",
    citation: "(2014) 361 ITR 85 (Del)",
    court: "Delhi High Court",
    year: 2014,
    category: "Transfer Pricing",
    section1961: "Section 92C",
    section2025: "Section 165",
    sectionTopic: "Determination of arm's length price",
    issue:
      "Can a mark-up be applied to the value of goods sourced by third-party vendors, where the taxpayer is a service provider that neither purchases nor bears risk on those goods?",
    held:
      "No. The mark-up must be applied to the taxpayer's own cost base. Costs not incurred by the taxpayer, and risks it does not assume, cannot be brought into the computation.",
    facts:
      "The taxpayer provided sourcing support services to its overseas group company, assisting it in identifying Indian vendors, monitoring quality and coordinating delivery. It was remunerated on a cost-plus basis at a mark-up on its own operating costs. It did not purchase the goods, did not take title to them, held no inventory, and bore no credit or product risk; the goods were exported by unrelated Indian vendors directly to the overseas customers. The Transfer Pricing Officer accepted the cost-plus method but applied the mark-up to the free-on-board value of the goods exported by those third-party vendors, reasoning that the taxpayer's efforts had generated that value and that an independent enterprise would have earned a commission on the full value.",
    proceduralHistory:
      "The Tribunal substantially upheld the approach of the Transfer Pricing Officer. The taxpayer appealed to the Delhi High Court.",
    contentions: {
      assessee:
        "A cost-plus determination operates on the costs the tested party actually incurs. The value of goods bought and exported by unrelated vendors is not the taxpayer's cost, and it assumed none of the risks associated with those goods. Expanding the cost base in this way attributes to a limited-risk service provider a return appropriate to an entrepreneur bearing inventory and market risk.",
      revenue:
        "The taxpayer's work was the reason the overseas group could source from India at all, and the economic value it created is reflected in the value of the goods sourced. Confining the return to a mark-up on its small operating cost base under-rewards the functions it performs.",
    },
    summary:
      "The Court held that a transfer pricing adjustment must respect the functional and risk profile actually borne by the tested party. The exercise under Chapter X involves a functions, assets and risks analysis, and the remuneration determined must correspond to what the tested party does and what it bears. The taxpayer performed a support function on a limited-risk basis; it did not trade in the goods, take title, hold stock or bear credit risk. Applying a mark-up to the free-on-board value of goods traded by unrelated parties attributed to the taxpayer a cost base it never incurred and a risk profile it never assumed, which is a departure from the prescribed method and has no statutory support. The Court observed that if the Revenue considered the taxpayer to be performing entrepreneurial functions, the proper course was to establish that through a functional analysis, not to expand the cost base by assertion. It also rejected the suggestion that the presence of location savings or a cost advantage in India justified attributing the vendors' turnover to the taxpayer.",
    principles: [
      "A cost-plus determination operates on the costs the tested party actually incurs.",
      "Remuneration must correspond to the functions performed, assets employed and risks assumed.",
      "Third-party costs and risks not borne by the taxpayer cannot be imported into the cost base.",
      "A limited-risk service provider is not to be remunerated as though it were an entrepreneur.",
      "Any claim that the taxpayer performs entrepreneurial functions must be established by functional analysis.",
    ],
    relevance:
      "Directly relevant under Section 165 for captive service providers, sourcing offices, procurement support entities and global capability centres. It remains the standard authority where the Revenue seeks to expand the cost base beyond expenditure the taxpayer actually incurred, or to attribute third-party turnover to a support entity.",
    keywords: [
      "cost base",
      "cost plus",
      "FOB value",
      "limited risk service provider",
      "functional analysis",
      "sourcing support",
      "location savings",
    ],
  },
  {
    slug: "kusum-health-care",
    caseName: "PCIT v. Kusum Health Care Pvt Ltd",
    citation: "(2018) 99 taxmann.com 431 (Del)",
    court: "Delhi High Court",
    year: 2018,
    category: "Transfer Pricing",
    section1961: "Sections 92B & 92C",
    section2025: "Sections 163 & 165",
    sectionTopic:
      "Meaning of international transaction; determination of arm's length price",
    issue:
      "Does every delay in realising receivables from an associated enterprise constitute a separate international transaction requiring an interest adjustment?",
    held:
      "No. Where the working capital position is already factored into the margins of the tested party, a further adjustment for outstanding receivables amounts to double counting.",
    facts:
      "The taxpayer had outstanding trade receivables from its associated enterprises which remained unrealised beyond the credit period stipulated in the intercompany arrangements. Following the 2012 amendment which inserted an explanation clarifying that capital financing, including any receivable or other debt arising during the course of business, falls within the definition of international transaction, the Transfer Pricing Officer treated the delayed realisation as a separate international transaction and imputed interest on the outstanding balances. The taxpayer had benchmarked its principal transactions on a net margin basis, and its working capital position had been taken into account in that analysis.",
    proceduralHistory:
      "The Tribunal deleted the adjustment, holding that a separate benchmarking of receivables was unwarranted on the facts. The Revenue appealed to the Delhi High Court.",
    contentions: {
      assessee:
        "The impact of extended credit is already absorbed in the net margin earned, which had been compared with comparables after a working capital adjustment. Imputing interest separately taxes the same economic effect twice. The taxpayer was not a debt-free entity funding its associated enterprises, and the delays were commercially explicable.",
      revenue:
        "The explanation inserted in 2012 places receivables expressly within the definition of international transaction. Once a receivable remains outstanding beyond the agreed period, it is in substance a loan to the associated enterprise and must be benchmarked independently.",
    },
    summary:
      "The Court accepted that receivables can fall within the definition of international transaction following the amendment, but held that it does not follow that an adjustment is automatic in every case where a balance is outstanding. The correct approach requires an examination of the facts, in particular whether the working capital impact of the extended credit has already been captured in the benchmarking of the principal transaction. Where the taxpayer's margins have been compared with comparables on a basis that takes account of working capital, the cost of carrying receivables is already embedded in the comparison, and a separate interest imputation would count the same effect twice. The Court emphasised that the Revenue must demonstrate, on the facts of the particular case, that the outstanding receivables constitute a separate international transaction requiring independent benchmarking, rather than applying the amendment mechanically to every unrealised balance. It noted that the position may differ where an entity is debt-free and is in substance funding its associated enterprise, and declined to lay down a rule applicable irrespective of circumstances.",
    principles: [
      "Receivables can constitute an international transaction, but an adjustment does not follow automatically.",
      "Where working capital impact is already absorbed in the benchmarked margin, separate interest imputation is double counting.",
      "The Revenue must show on the facts that the receivable requires independent benchmarking.",
      "The position may differ for a debt-free entity in substance funding its associated enterprise.",
    ],
    relevance:
      "A recurring issue in practice, now under Sections 163 and 165 of the IT Act 2025. The decision remains the principal authority for resisting mechanical interest adjustments on intercompany receivables where a working capital adjustment has been made, and it makes the working capital adjustment itself an important element of the benchmarking documentation.",
    keywords: [
      "outstanding receivables",
      "interest imputation",
      "working capital adjustment",
      "credit period",
      "double counting",
      "deferred receivables",
      "debt free entity",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // INTERNATIONAL TAXATION
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "engineering-analysis-software-royalty",
    caseName: "Engineering Analysis Centre of Excellence Pvt Ltd v. CIT",
    citation: "(2021) 432 ITR 471 (SC)",
    court: "Supreme Court",
    year: 2021,
    category: "International Tax",
    section1961: "Sections 9(1)(vi), 90 & 195",
    section2025: "Sections 9, 159 & 393",
    sectionTopic:
      "Income deemed to accrue or arise in India; double taxation relief; TDS on specified payments",
    issue:
      "Are payments by Indian resellers and end users to non-resident suppliers for shrink-wrapped or licensed computer software in the nature of royalty, attracting withholding tax?",
    held:
      "No. What is transferred is a copyrighted article, not a right in the copyright. Such payments are business profits, not royalty, under the relevant treaties, and no tax need be withheld where the non-resident has no permanent establishment in India.",
    facts:
      "The Court heard a very large batch of appeals — over a hundred — which it grouped into four categories: software purchased directly by an Indian end user from a foreign supplier; software purchased by an Indian distributor or reseller from a foreign supplier for resale to Indian end users; software sold by a foreign supplier to a foreign distributor for onward resale into India; and software bundled with hardware sold as an integrated unit. In each case the Revenue treated the payment as royalty for the use of copyright, requiring withholding under Section 195, and treated the payers as assessees in default where no tax had been deducted. The licences involved permitted the licensee to use the software for its own business purposes but prohibited reverse engineering, commercial exploitation, sub-licensing and reproduction for distribution.",
    proceduralHistory:
      "Decisions of the Karnataka High Court had favoured the Revenue while the Delhi High Court had taken the contrary view, producing a sharp conflict. The Supreme Court resolved it across all four categories in a single judgment.",
    contentions: {
      assessee:
        "What the licensee acquires is a copy of a computer programme with a limited right to use it, not any interest in the copyright itself. Under the copyright legislation, a licence permitting use without the right to reproduce for sale or otherwise exploit the copyright transfers no part of the copyright. The treaty definition of royalty requires payment for the use of, or the right to use, a copyright, which is absent. Since the treaty definition is narrower than the domestic one, the treaty prevails.",
      revenue:
        "Payment is made for the right to use software in which copyright subsists, and the domestic definition of royalty, as expanded by the explanations inserted with retrospective effect, expressly covers consideration for the use of computer software. The transaction confers rights that would otherwise constitute infringement, which shows that copyright rights are being licensed.",
    },
    summary:
      "The Court drew the central distinction between the transfer of a right in the copyright and the sale of a copy of the copyrighted work. Under the Copyright Act, the exclusive rights comprising copyright are the rights to reproduce, issue copies, perform, adapt and translate the work. A licence that merely permits the licensee to use the software for its internal purposes, while prohibiting reproduction for distribution, commercial exploitation and sub-licensing, transfers none of those exclusive rights. What passes is a copyrighted article, and the payment for it is consideration for goods, not for the use of copyright. The Court held that the treaty definition of royalty, requiring payment for the use of or the right to use a copyright, was therefore not satisfied. It further held that where the treaty definition is narrower than the domestic one, the treaty prevails by virtue of Section 90(2), and that a retrospective amendment to the domestic definition cannot enlarge a term defined in a treaty — a treaty being a bilateral instrument that cannot be varied by unilateral domestic legislation. Finally, applying its earlier decision in GE India Technology Centre, the Court held that the obligation to withhold under Section 195 arises only where the sum is chargeable to tax, so no withholding was required. A very large volume of demands was accordingly set aside.",
    principles: [
      "A licence to use software without the right to exploit the copyright transfers a copyrighted article, not a right in the copyright.",
      "Payment for a copyrighted article is consideration for goods and is not royalty under the treaty definition.",
      "Where a treaty definition is narrower than the domestic one, the treaty prevails under Section 90(2).",
      "A unilateral retrospective domestic amendment cannot enlarge a term defined in a bilateral treaty.",
      "The withholding obligation arises only where the sum is chargeable to tax in India.",
    ],
    relevance:
      "The leading authority on cross-border software payments, and the reason a very large volume of withholding demands was set aside. Under the IT Act 2025 the analysis runs through Section 9, treaty relief under Section 159, and the consolidated withholding provision in Section 393. It is critical to note the decision turns on treaty protection: where no treaty applies, or where the counterparty is in a jurisdiction without a suitable treaty, the wider domestic definition can still operate. The reasoning has been extended in later cases to cloud services and database subscriptions, though each turns on the rights actually granted.",
    keywords: [
      "software royalty",
      "copyrighted article",
      "end user licence",
      "treaty override",
      "section 195",
      "shrink wrapped software",
      "business profits",
      "section 90(2)",
    ],
  },
  {
    slug: "nestle-mfn-clause",
    caseName: "Assessing Officer v. Nestle SA",
    citation: "(2023) 458 ITR 756 (SC)",
    court: "Supreme Court",
    year: 2023,
    category: "International Tax",
    section1961: "Section 90",
    section2025: "Section 159",
    sectionTopic:
      "Agreements with foreign countries for double taxation relief (DTAA)",
    issue:
      "Does a most-favoured-nation clause in a tax treaty operate automatically when India later agrees a lower rate with another country, or must the benefit be separately notified?",
    held:
      "A separate notification under Section 90(1) is required. The MFN clause is not self-operational, and the third country must have been a member of the OECD at the time the treaty with India was entered into.",
    facts:
      "Taxpayers resident in the Netherlands, France and Switzerland claimed reduced rates of withholding on dividends received from Indian companies. Their treaties with India contained most-favoured-nation clauses in protocols, under which India undertook to extend more favourable treatment in respect of specified income if it subsequently agreed such treatment with a third state that is a member of the OECD. India had later concluded treaties with Slovenia, Lithuania and Colombia providing lower rates. Those states were not members of the OECD when their treaties with India were signed, but became members afterwards. No notification had been issued extending the lower rates to the Netherlands, France or Switzerland.",
    proceduralHistory:
      "The Delhi High Court had accepted the taxpayers' claims, holding the MFN clauses to be self-operational and the later OECD membership sufficient. A large batch of appeals by the Revenue came before the Supreme Court, which reversed.",
    contentions: {
      assessee:
        "The protocol forms an integral part of the treaty, which has already been notified. The clause operates of its own force when the trigger occurs, and no further notification is needed. The requirement of OECD membership should be tested when the benefit is claimed, and the practice of certain treaty partners, which had issued decrees extending the benefit, supports that reading.",
      revenue:
        "India follows a dualist system in which a treaty acquires domestic force only through notification under Section 90(1). Extending a more favourable rate alters the incidence of tax and therefore requires a notification. In any event the words of the protocol require the third state to be an OECD member at the time India entered into the treaty with it, not at some later date.",
    },
    summary:
      "The Court decided both questions in the Revenue's favour. On the first, it held that India's constitutional arrangement is dualist: a treaty does not by itself operate in domestic law, and Section 90(1) supplies the mechanism by which it is given effect. It follows that a modification of the treatment accorded under a treaty — which is what invoking the MFN clause achieves — requires a notification in the same manner. The Court observed that the consistent practice of the Indian executive had been to issue such notifications, and that the absence of one is significant. On the second question, the Court construed the words of the protocol, which refer to a state that 'is a member of the OECD', as directed to the position when India entered into the treaty with that third state. A state joining the OECD subsequently does not retrospectively bring earlier treaties within the clause. The Court acknowledged that some treaty partners had taken a different view in their own domestic decrees, but held that the interpretation of the clause in India must follow Indian constitutional requirements and the ordinary meaning of the words. It expressly noted that its ruling would affect a substantial number of pending claims.",
    principles: [
      "India follows a dualist system; a treaty takes effect domestically only through notification under Section 90(1).",
      "An MFN clause is not self-operational; a separate notification is required to extend the more favourable treatment.",
      "The third state must have been an OECD member when India entered into its treaty with that state.",
      "Later accession to the OECD does not retrospectively trigger MFN clauses in earlier treaties.",
      "The practice of the treaty partner's own authorities does not govern the position in Indian law.",
    ],
    relevance:
      "Directly affects treaty positions on dividends, interest, royalties and fees for technical services, and unsettled a substantial number of refund and withholding claims made on the strength of the Delhi High Court's view. Under the IT Act 2025 the enabling provision is Section 159. Any MFN-based rate claim now needs a notification to point to, and positions taken in earlier years on the contrary view may require review.",
    keywords: [
      "most favoured nation",
      "MFN clause",
      "notification",
      "OECD membership",
      "dividend withholding",
      "protocol",
      "dualist",
      "treaty interpretation",
    ],
  },
  {
    slug: "formula-one-pe",
    caseName: "Formula One World Championship Ltd v. CIT",
    citation: "(2017) 394 ITR 80 (SC)",
    court: "Supreme Court",
    year: 2017,
    category: "International Tax",
    section1961: "Sections 9 & 90",
    section2025: "Sections 9 & 159",
    sectionTopic:
      "Income deemed to accrue or arise in India; double taxation relief",
    issue:
      "Did a motor racing circuit, made available to a foreign company for a few days each year, constitute a fixed place permanent establishment in India?",
    held:
      "Yes. The circuit was at the company's disposal and its commercially significant activity was carried on through it. A permanent establishment does not require a long or continuous presence where the activity is by nature short and recurring.",
    facts:
      "The taxpayer, a UK resident company, held the commercial rights to the Formula One World Championship. It entered into a Race Promotion Contract with an Indian company, granting it the right to host and promote the Indian Grand Prix at the Buddh International Circuit for a consideration of USD 40 million. Associated agreements granted the taxpayer and its affiliates extensive rights over the circuit — including access for the race weekend and the days surrounding it, control over paddock and pit areas, media and broadcasting rights, and the ability to dictate arrangements at the venue. The race occupied a few days each year. The question was whether the taxpayer had a permanent establishment in India through which its income was taxable.",
    proceduralHistory:
      "The Authority for Advance Rulings and the Delhi High Court reached differing conclusions on aspects of the arrangement. The matter came to the Supreme Court, which examined the disposal test in detail.",
    contentions: {
      assessee:
        "The circuit was owned and operated by the Indian promoter. The taxpayer merely licensed commercial rights and had access for a few days a year, which lacks the permanence a fixed place of business requires. Income from licensing rights is business income not attributable to any Indian fixed place.",
      revenue:
        "The taxpayer and its affiliates had complete control of the circuit during the event and dictated how it was used. The championship is the taxpayer's business and it was conducted through the circuit. Permanence must be judged against the nature of the activity, which consists of discrete race events.",
    },
    summary:
      "The Court applied the disposal test: whether the foreign enterprise had a place at its disposal through which its business was carried on. Examining the web of agreements, it found that the taxpayer and its affiliates had effective control of the circuit during the relevant period — access to the whole venue, control over the paddock, pit lane and media facilities, the right to exclude others, and the ability to direct how the event was conducted. The Indian promoter's role was to make the circuit available on the taxpayer's terms. On the question of permanence, the Court held that the requirement is relative to the nature of the business: where the commercial activity consists of a handful of race days a year, a presence coinciding with those days is sufficient, and the recurring annual nature of the arrangement reinforced rather than undermined that conclusion. It rejected the argument that a short duration is fatal, observing that the test asks whether the place was at the enterprise's disposal for the conduct of its business, not for how many days in the calendar. Having found a fixed place permanent establishment, the Court held that income attributable to it was taxable in India and left quantification to the assessment process.",
    principles: [
      "The disposal test asks whether a place was at the foreign enterprise's disposal for carrying on its business.",
      "Permanence is judged relative to the nature of the business; short recurring events can suffice.",
      "Control over the venue, including the right to exclude others and direct its use, indicates disposal.",
      "A permanent establishment may exist even though the premises are owned and operated by another party.",
      "Once a permanent establishment is found, attribution of profits follows on the facts.",
    ],
    relevance:
      "The leading Indian authority on the disposal test for a fixed place permanent establishment, still applied under Section 9 and the treaty relief framework of Section 159. It is regularly cited for events, exhibitions, tournaments, concerts and other short-duration commercial activity in India, and its treatment of permanence is the aspect most often relied on.",
    keywords: [
      "permanent establishment",
      "fixed place PE",
      "disposal test",
      "degree of permanence",
      "attribution of profits",
      "virtual projection",
      "events",
    ],
  },
  {
    slug: "e-funds-pe",
    caseName: "ADIT v. E-Funds IT Solution Inc",
    citation: "(2018) 399 ITR 34 (SC)",
    court: "Supreme Court",
    year: 2018,
    category: "International Tax",
    section1961: "Sections 9 & 90",
    section2025: "Sections 9 & 159",
    sectionTopic:
      "Income deemed to accrue or arise in India; double taxation relief",
    issue:
      "Does outsourcing work to an Indian group company, which is remunerated at arm's length, create a permanent establishment of the foreign entity in India?",
    held:
      "No. A permanent establishment requires a fixed place at the foreign enterprise's disposal through which it carries on its own business. Close commercial dependence between group companies does not by itself create one.",
    facts:
      "Two US companies carried on business in data processing and electronic payment services for customers outside India. They had an Indian subsidiary which performed back-office and support functions for them, including data processing and software development, and which was remunerated on a cost-plus basis that had been accepted as being at arm's length in the transfer pricing assessment. The Revenue contended that the Indian subsidiary's premises and personnel constituted a fixed place permanent establishment of the US companies, and alternatively a service permanent establishment and a dependent agent permanent establishment, and sought to attribute profits accordingly.",
    proceduralHistory:
      "The Tribunal found a permanent establishment on certain grounds. The Delhi High Court reversed in substantial part, holding that no permanent establishment existed. The Revenue appealed to the Supreme Court.",
    contentions: {
      assessee:
        "The Indian subsidiary carried on its own business of providing services to the US companies and was fully remunerated for it at arm's length. The US companies had no place at their disposal in India and carried on no business of their own through the subsidiary's premises. Dependence of the subsidiary on group business does not convert its premises into the parent's place of business.",
      revenue:
        "The Indian company existed solely to service the US companies, was assigned business by them, used their software and hardware, and was economically wholly dependent on them. Its employees effectively carried on the US companies' business, and its premises amounted to a fixed place of the US companies in India.",
    },
    summary:
      "The Court held that the enquiry must focus on whether the foreign enterprise carried on its own business through a place at its disposal in India. It found that the Indian subsidiary was performing its own contracted activity — rendering services to the US companies — and was compensated for doing so. The fact that it depended on the group for its business, that assets or software were made available to it, or that the arrangement was close and continuous, did not convert the subsidiary's premises into a place of business of the US companies. The Court emphasised that a subsidiary is a distinct legal entity, and that the existence of a parent-subsidiary relationship does not create a permanent establishment. On the service permanent establishment limb, it held that the requirement is that the foreign enterprise furnish services in India through employees or other personnel, and there was no finding that the US companies' own employees had rendered services in India in the relevant sense. On the agency limb, it held that the subsidiary had no authority to conclude contracts on behalf of the US companies and did not habitually do so. The Court also observed that where the Indian entity is remunerated at arm's length for the functions it performs, nothing further remains to be attributed even if a permanent establishment were found.",
    principles: [
      "A permanent establishment requires a place at the foreign enterprise's disposal through which it carries on its own business.",
      "A subsidiary is a distinct entity; the parent-subsidiary relationship does not itself create a permanent establishment.",
      "Economic dependence, assignment of work and provision of assets do not convert a subsidiary's premises into the parent's place of business.",
      "A service permanent establishment requires the foreign enterprise's own personnel to furnish services in India.",
      "Arm's length remuneration of the Indian entity leaves nothing further to attribute.",
    ],
    relevance:
      "Central to the Indian outsourcing and global capability centre model, and still the answer under Section 9 where the Revenue seeks to find a permanent establishment in a captive subsidiary that is separately remunerated at arm's length. The final observation on attribution is frequently as important as the finding on existence.",
    keywords: [
      "outsourcing",
      "captive subsidiary",
      "fixed place PE",
      "service PE",
      "agency PE",
      "arm's length remuneration",
      "BPO",
      "GCC",
    ],
  },
  {
    slug: "uae-exchange-centre",
    caseName: "Union of India v. UAE Exchange Centre",
    citation: "(2020) 425 ITR 30 (SC)",
    court: "Supreme Court",
    year: 2020,
    category: "International Tax",
    section1961: "Sections 9 & 90",
    section2025: "Sections 9 & 159",
    sectionTopic:
      "Income deemed to accrue or arise in India; double taxation relief",
    issue:
      "Does a liaison office that merely downloads remittance particulars and forwards instruments to beneficiaries in India constitute a permanent establishment?",
    held:
      "No. The activity was preparatory or auxiliary in character and fell within the exclusion in the treaty. No part of the business profits was therefore taxable in India.",
    facts:
      "The taxpayer was a UAE company carrying on the business of remitting money from non-resident Indians in the Gulf to beneficiaries in India. Contracts with remitters were concluded in the UAE and the consideration was received there. The company had obtained Reserve Bank of India approval to open liaison offices in India, subject to conditions expressly prohibiting any trading, commercial or industrial activity and requiring the offices to be maintained out of inward remittances. The Indian offices downloaded particulars of remittances from the UAE servers, printed cheques or drafts, and dispatched them to the beneficiaries named by the remitters. No fee was charged in India and no contracts were concluded there.",
    proceduralHistory:
      "The Authority for Advance Rulings held against the taxpayer. The Delhi High Court reversed, holding the activity preparatory or auxiliary. The Revenue appealed to the Supreme Court.",
    contentions: {
      assessee:
        "The entire substantive business — soliciting customers, contracting, and receiving consideration — took place in the UAE. The Indian offices performed a mechanical follow-through step in aid of that business, generating no income of their own and charging nothing. That is precisely what the preparatory or auxiliary exclusion in the treaty is directed at.",
      revenue:
        "Delivering the remitted funds to the beneficiary is the completion of the service the customer paid for, and is therefore a core activity rather than a subsidiary one. The liaison offices were the means by which the taxpayer performed its contractual obligation in India.",
    },
    summary:
      "The Court accepted that the liaison offices constituted a fixed place, but held that the decisive question was whether the activity carried on there fell within the treaty exclusion for activities of a preparatory or auxiliary character. It examined the sequence of the business and found that the contract, the consideration and the substantive service all occurred outside India; what happened in India was the downloading of information and the physical dispatch of instruments to give effect to instructions already received and paid for abroad. That, the Court held, was a subsidiary step in aid of the main business rather than the business itself. It laid weight on the Reserve Bank's conditions prohibiting any commercial activity, observing that while regulatory permission is not by itself decisive of the tax question, the offices had in fact operated within those limits and had earned nothing in India. Because the activity fell within the exclusion, no permanent establishment arose and no part of the business profits was taxable in India.",
    principles: [
      "A fixed place does not create a permanent establishment where the activity carried on is preparatory or auxiliary.",
      "Where contract, consideration and substantive service occur abroad, Indian follow-through steps are subsidiary.",
      "Operating within Reserve Bank conditions barring commercial activity supports, without conclusively establishing, that characterisation.",
      "An office that earns nothing and charges nothing in India is unlikely to be carrying on the core business there.",
    ],
    relevance:
      "The reference point for liaison and representative offices under Section 9 and Section 159. The decision confirms that operating strictly within Reserve Bank conditions, while not decisive on its own, strongly supports a preparatory-or-auxiliary characterisation — which makes adherence to those conditions a tax matter as well as a regulatory one.",
    keywords: [
      "liaison office",
      "preparatory or auxiliary",
      "permanent establishment exclusion",
      "money transfer",
      "RBI approval",
      "representative office",
    ],
  },
  {
    slug: "samsung-heavy-industries",
    caseName: "DIT v. Samsung Heavy Industries Co Ltd",
    citation: "(2020) 426 ITR 1 (SC)",
    court: "Supreme Court",
    year: 2020,
    category: "International Tax",
    section1961: "Sections 9 & 90",
    section2025: "Sections 9 & 159",
    sectionTopic:
      "Income deemed to accrue or arise in India; double taxation relief",
    issue:
      "Does a project office opened for a turnkey contract automatically become a permanent establishment to which the profits of the whole contract can be attributed?",
    held:
      "No. The burden is on the Revenue to show that the office carried on the core business rather than acting as a communication channel. Attribution must reflect the functions actually performed in India.",
    facts:
      "A Korean company, in consortium with an Indian company, was awarded a turnkey contract by an Indian oil company for the development of an offshore facility. The contract covered design, engineering, procurement, fabrication, installation and commissioning, with substantial elements performed outside India. The Korean company opened a project office in Mumbai, described in its Reserve Bank application as a communication channel between the company and the Indian oil company. The office had two personnel, neither of whom was shown to be engaged in the core design or fabrication work, and its accounts showed no significant activity. The Assessing Officer treated the project office as a permanent establishment and attributed a fixed percentage of the total contract revenue — covering both offshore and onshore elements — to it.",
    proceduralHistory:
      "The Tribunal upheld the existence of a permanent establishment. The Uttarakhand High Court took a different view on aspects of the matter. The appeal came before the Supreme Court, which addressed both the existence of a permanent establishment and the basis of attribution.",
    contentions: {
      assessee:
        "The project office was a liaison and coordination facility, as its own Reserve Bank application and its accounts showed. The design and fabrication work was carried on in Korea. No core business was conducted through the Mumbai office, so it was not a permanent establishment; and in any event a percentage of global contract revenue is not a permissible measure of what an office of that character could have earned.",
      revenue:
        "The project office was opened specifically for this contract and existed throughout its performance. Its purpose was to enable the contract to be executed in India, which is the taxpayer's business, and the profits of the contract are therefore attributable to it.",
    },
    summary:
      "The Court held that the burden of establishing a permanent establishment rests on the Revenue, and that it had not been discharged. It examined the material and found that the project office's role was coordination and communication; the accounts disclosed no meaningful trading activity, only two personnel were stationed there, and nothing showed that the core activities of design, engineering or fabrication had been carried out through it. A description in the Reserve Bank application as a communication channel, while not conclusive, was consistent with the other evidence. The Court reiterated that a fixed place becomes a permanent establishment only where the business of the enterprise is carried on wholly or partly through it, and an office performing auxiliary coordination does not meet that description. On attribution, the Court held separately that profits may be attributed to a permanent establishment only for the activities genuinely carried out through it, and that adopting an ad hoc percentage of total contract revenue — embracing offshore supply and offshore services having no connection with the Indian office — was without basis. Both the finding of a permanent establishment and the attribution were accordingly set aside.",
    principles: [
      "The burden of establishing a permanent establishment lies on the Revenue.",
      "A fixed place is a permanent establishment only where the enterprise's business is carried on through it.",
      "An office performing coordination and communication functions does not carry on the core business.",
      "Profits are attributable only for activities genuinely carried out through the permanent establishment.",
      "An ad hoc percentage of global contract revenue is not a permissible basis of attribution.",
    ],
    relevance:
      "Important for turnkey and EPC contracts split between offshore supply and onshore services, which continue to be tested under Section 9 of the IT Act 2025. It constrains both the finding of a permanent establishment and the quantum of any attribution, and the burden-of-proof holding is frequently decisive where the Revenue relies on the mere existence of a project office.",
    keywords: [
      "project office",
      "turnkey contract",
      "EPC",
      "attribution of profits",
      "offshore supply",
      "burden of proof",
      "core activity",
      "coordination office",
    ],
  },
  {
    slug: "ge-india-technology-195",
    caseName: "GE India Technology Centre Pvt Ltd v. CIT",
    citation: "(2010) 327 ITR 456 (SC)",
    court: "Supreme Court",
    year: 2010,
    category: "International Tax",
    section1961: "Section 195",
    section2025: "Section 393",
    sectionTopic: "TDS on specified payments including non-resident remittances",
    issue:
      "Must tax be withheld on every payment to a non-resident, or only where the sum is chargeable to tax in India?",
    held:
      "Only where the sum is chargeable to tax. The obligation to withhold arises on 'any sum chargeable under the provisions of this Act', and the words cannot be read out of the section.",
    facts:
      "The appellants made payments to non-residents — including for the purchase of software and for various other supplies and services — without deducting tax at source, taking the view that the sums were not chargeable to tax in India. The Revenue proceeded against them as assessees in default, contending that the obligation to withhold attaches to every remittance to a non-resident, and that the payer's only recourse is to apply to the Assessing Officer for a determination, failing which it must deduct and leave the recipient to claim a refund.",
    proceduralHistory:
      "The Karnataka High Court decided against the taxpayers, holding that the obligation to deduct was unqualified. The matter came to the Supreme Court, where the construction of the words 'any sum chargeable under the provisions of this Act' fell for decision.",
    contentions: {
      assessee:
        "The section obliges deduction from 'any other sum chargeable under the provisions of this Act'. Those words qualify the obligation and cannot be ignored. If Parliament had intended deduction from every remittance, it would have said so. Requiring deduction from sums plainly outside the Indian tax net would compel withholding on, for instance, payments for goods imported on principal-to-principal terms.",
      revenue:
        "The scheme is designed to secure collection from non-residents who may be beyond the reach of recovery once funds have left India. The payer should deduct and, if it considers the sum not chargeable, apply for a determination; the recipient can claim a refund if too much has been withheld.",
    },
    summary:
      "The Court held that the words 'any other sum chargeable under the provisions of this Act' are words of limitation and must be given effect. The withholding provision is integrated with the charging sections and the machinery of assessment; it is not a free-standing obligation to deduct from every remittance abroad. If the payer genuinely takes the view that no part of the payment bears tax in India, it is not obliged to deduct, though it carries the risk of being treated as an assessee in default if that view proves wrong, and it may protect itself by applying to the Assessing Officer for a determination. The Court noted that the contrary construction would produce results Parliament plainly did not intend — requiring deduction on payments for goods bought abroad and on other remittances wholly outside the Indian tax net — and would convert the provision into a mechanism for collecting tax that is not due, leaving recipients to pursue refunds. The application for a determination was held to be an option available to the payer, not a precondition of not deducting.",
    principles: [
      "The withholding obligation attaches only to sums chargeable to tax under the Act.",
      "The words of limitation in the section must be given effect and cannot be read out.",
      "A payer taking a bona fide view that no tax is due need not deduct, but bears the risk if wrong.",
      "Applying to the Assessing Officer for a determination is an option, not a precondition.",
      "The provision is not a mechanism for collecting tax that is not ultimately due.",
    ],
    relevance:
      "Foundational for every cross-border remittance and for Form 15CA and 15CB practice. The withholding provisions are consolidated in Section 393 of the IT Act 2025, and the chargeability precondition continues to govern. It underpins the outcome in Engineering Analysis and is cited in virtually every dispute about withholding on foreign payments.",
    keywords: [
      "section 195",
      "chargeable to tax",
      "withholding obligation",
      "remittance",
      "15CA 15CB",
      "payer risk",
      "assessee in default",
    ],
  },
  {
    slug: "azadi-bachao-andolan",
    caseName: "Union of India v. Azadi Bachao Andolan",
    citation: "(2003) 263 ITR 706 (SC)",
    court: "Supreme Court",
    year: 2003,
    category: "International Tax",
    section1961: "Section 90",
    section2025: "Section 159",
    sectionTopic:
      "Agreements with foreign countries for double taxation relief (DTAA)",
    issue:
      "Is a tax residency certificate issued by a treaty partner conclusive of residence and beneficial ownership, and is treaty shopping impermissible?",
    held:
      "The certificate is to be accepted as evidence of residence for treaty purposes. Treaty shopping is not by itself unlawful, and a treaty benefit cannot be denied merely because the structure was chosen for its tax advantages.",
    facts:
      "The Central Board of Direct Taxes had issued a circular directing that a certificate of residence issued by the Mauritius authorities would constitute sufficient evidence of residence and beneficial ownership for the purpose of applying the India–Mauritius treaty. Assessing Officers had begun to look behind such certificates, examining whether the Mauritius entities had real substance or were conduits for investors resident elsewhere, and denying treaty benefits on capital gains. The circular was challenged by public interest litigants as being beyond the Board's powers and as facilitating avoidance.",
    proceduralHistory:
      "The Delhi High Court struck down the circular. The Union appealed to the Supreme Court, which reversed and upheld the circular.",
    contentions: {
      assessee:
        "The Board is empowered to issue circulars for the proper administration of the Act, and such circulars bind the Revenue. The treaty allocates taxing rights between the two states as a matter of negotiated bargain, and residents of the treaty partner holding valid certificates are entitled to its benefits. The motive for choosing a jurisdiction does not defeat an entitlement conferred by the treaty.",
      revenue:
        "Entities with no real presence in Mauritius were being interposed purely to obtain treaty benefits on Indian capital gains, which amounts to abuse. The circular prevented Assessing Officers from examining the true position and effectively surrendered the revenue base.",
    },
    summary:
      "The Court upheld the circular. It held that the Board has statutory authority to issue directions for the proper administration of the Act, that such circulars are binding on the Revenue, and that the direction to accept residence certificates was within that authority. On the wider question, it held that a double taxation treaty represents a negotiated allocation of taxing rights between sovereign states, and that developing countries may consciously accept a degree of treaty shopping as the price of attracting foreign investment and technology. The Court declined to import a general anti-abuse doctrine into the treaty in the absence of a provision to that effect, observing that it is for the contracting states to negotiate limitation of benefits provisions if they wish to restrict access. It held that the motive of a taxpayer in selecting a jurisdiction through which to invest does not by itself disentitle it from a benefit the treaty confers, and that so long as the entity is a resident of the treaty partner as certified, the benefit follows.",
    principles: [
      "Board circulars issued for the administration of the Act bind the Revenue.",
      "A residence certificate issued by the treaty partner is to be accepted as evidence of residence for treaty purposes.",
      "A treaty is a negotiated allocation of taxing rights; abuse doctrines are not implied into it.",
      "Treaty shopping is not by itself unlawful; restricting access requires a limitation of benefits provision.",
      "Motive in selecting an investment jurisdiction does not defeat an entitlement the treaty confers.",
    ],
    relevance:
      "Still the starting point for treaty entitlement, now under Section 159 of the IT Act 2025. Its reach has narrowed considerably since — through renegotiation of the Mauritius and Singapore treaties, the insertion of limitation of benefits provisions, the multilateral instrument's principal purpose test, and the general anti-avoidance rules. Read it as establishing the baseline entitlement rather than as the complete answer in any current dispute.",
    keywords: [
      "tax residency certificate",
      "TRC",
      "treaty shopping",
      "Mauritius",
      "beneficial ownership",
      "limitation of benefits",
      "CBDT circular",
      "GAAR",
    ],
  },
  {
    slug: "blackstone-capital-trc",
    caseName:
      "Blackstone Capital Partners (Singapore) VI FDI Three Pte Ltd v. ACIT",
    citation: "(2023) 452 ITR 111 (Del)",
    court: "Delhi High Court",
    year: 2023,
    category: "International Tax",
    section1961: "Sections 90 & 147",
    section2025: "Sections 159 & 279",
    sectionTopic: "Double taxation relief; income escaping assessment",
    issue:
      "Can the Assessing Officer go behind a valid tax residency certificate to question residence, beneficial ownership and the commercial substance of the holding structure?",
    held:
      "No. A validly issued residency certificate is sufficient evidence of residence, beneficial ownership and legal ownership for treaty purposes, and reassessment cannot be founded on looking behind it.",
    facts:
      "The petitioner, a Singapore resident company, sold shares of an Indian company and claimed exemption from capital gains tax under the India–Singapore treaty, relying on the grandfathering of investments made before the treaty was amended. It held a valid tax residency certificate issued by the Singapore authorities. The Assessing Officer initiated reassessment on the footing that the petitioner was a conduit lacking commercial substance, that its beneficial owners were elsewhere, and that the structure had been interposed to obtain treaty benefits, contending that the residency certificate did not preclude an enquiry into these matters.",
    proceduralHistory:
      "The petitioner challenged the reassessment notice and the order rejecting its objections by writ petition before the Delhi High Court, which quashed the proceedings.",
    contentions: {
      assessee:
        "The residency certificate is conclusive of residence for treaty purposes, and the Board's circulars and press releases confirm that it is sufficient evidence of beneficial ownership and legal ownership. The investments predated the treaty amendment and were expressly grandfathered. Reassessment cannot be founded on a ground the law forecloses.",
      revenue:
        "The entity had no employees, no independent decision-making and negligible presence in Singapore. Treaty benefits are intended for genuine residents, and the Assessing Officer is entitled to examine whether the claimed residence is real before allowing an exemption of this magnitude.",
    },
    summary:
      "The Court held that the Assessing Officer could not go behind the residency certificate. It relied on the line of authority beginning with Azadi Bachao Andolan, on the Board's circular treating such a certificate as sufficient evidence of residence and beneficial ownership, and on the press release issued when the Singapore treaty was amended, which reiterated that position. Circulars of that kind are binding on the Revenue, and an Assessing Officer cannot act contrary to them. The Court further held that the grandfathering of investments made before the specified date was a deliberate feature of the renegotiated treaty and had to be given effect according to its terms; permitting the Revenue to defeat it by questioning substance would undermine the certainty the provision was designed to confer. Since the reassessment rested entirely on grounds that were not open to the Assessing Officer, there could be no valid reason to believe income had escaped assessment, and the proceedings were quashed at the threshold.",
    principles: [
      "A validly issued tax residency certificate is sufficient evidence of residence, beneficial ownership and legal ownership.",
      "The Assessing Officer cannot go behind the certificate to examine substance where circulars bind him not to.",
      "Board circulars and official press releases on treaty administration bind the Revenue.",
      "Grandfathering provisions in a renegotiated treaty must be given effect according to their terms.",
      "Reassessment founded on a ground the law forecloses cannot supply a valid reason to believe.",
    ],
    relevance:
      "A recent and frequently cited application of the residency certificate principle to private equity and fund structures in the era of grandfathered investments. It sits at the intersection of treaty relief under Section 159 and the reassessment framework in Section 279 of the IT Act 2025. Its reach should be assessed against the general anti-avoidance rules, which operate on a different footing and were not in issue.",
    keywords: [
      "tax residency certificate",
      "beneficial ownership",
      "Singapore treaty",
      "grandfathering",
      "private equity",
      "reassessment",
      "substance",
      "binding circular",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // BUSINESS & PROFESSION
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "checkmate-services-pf-esi",
    caseName: "Checkmate Services Pvt Ltd v. CIT",
    citation: "(2022) 448 ITR 518 (SC)",
    court: "Supreme Court",
    year: 2022,
    category: "Business & Profession",
    section1961: "Sections 36(1)(va) & 43B",
    section2025: "Sections 29 & 37",
    sectionTopic:
      "Deductions related to employee welfare and benefits; deductions allowed only on actual payment",
    issue:
      "If an employer deposits employees' provident fund and insurance contributions after the due date under those laws but before the income tax return is filed, is the deduction allowed?",
    held:
      "No. Employees' contributions are held in trust by the employer and must be deposited by the due date under the governing welfare legislation. The relaxation for payments made before the return due date applies only to the employer's own contributions.",
    facts:
      "The appellant deducted employees' contributions to provident fund and employees' state insurance from their wages, but deposited the amounts with the respective authorities after the due dates prescribed under the Provident Funds Act and the Employees' State Insurance Act. The deposits were, however, made before the due date for filing the income tax return. The Assessing Officer disallowed the deduction on the footing that the condition attaching to employees' contributions had not been met. Large numbers of similar assessments across the country turned on the same point, with High Courts divided on whether the relaxation in Section 43B — permitting deduction where payment is made before the return due date — extended to employees' contributions.",
    proceduralHistory:
      "High Courts had taken conflicting positions, several holding that Section 43B cured a delayed deposit of employees' contributions. The Supreme Court took up the question to resolve the conflict, and its decision governs a very large volume of assessments.",
    contentions: {
      assessee:
        "Both categories of contribution are deductible business expenditure, and Section 43B operates on a non obstante basis allowing deduction where payment is actually made before the return due date. There is no warrant for treating the two categories differently once payment has in fact been made, and the deduction should follow.",
      revenue:
        "The two contributions differ fundamentally in character. The employer's contribution is its own liability. The employees' share is money deducted from wages, deemed to be the employer's income on receipt, and allowed as a deduction only if credited to the employees' account by the due date under the relevant welfare statute. Section 43B addresses liabilities of the employer, not sums held on behalf of employees.",
    },
    summary:
      "The Court drew a firm distinction between the two kinds of contribution and held it to be fundamental to the scheme. The employer's own contribution is a liability it incurs, and Section 43B permits deduction on actual payment, including payment made after the year end but before the return due date. The employees' share is different in character: it is money deducted from the employees' wages, which the statute treats as the employer's income upon receipt and permits as a deduction only if it is credited to the employees' account within the time fixed by the governing welfare legislation. The Court emphasised that the employer holds that money in a fiduciary capacity — it is the employees' money, deducted from their earnings, and the welfare statutes fix strict timelines precisely because delayed deposit prejudices the employees' entitlements. The condition is therefore not a mere procedural requirement but the very basis on which the deduction is granted. Missing the deadline extinguishes the deduction permanently, and a later deposit does not revive it. The Court held that Section 43B, which is concerned with deductions otherwise allowable in respect of the assessee's own liabilities, cannot be read as dispensing with a condition attaching to a different category of sum altogether.",
    principles: [
      "The employer's contribution and the employees' contribution are fundamentally different in character.",
      "Employees' contributions are held in a fiduciary capacity and are the employees' money, not the employer's.",
      "Deduction for employees' contributions is allowed only if deposited by the due date under the welfare statute.",
      "The relaxation permitting payment before the return due date applies only to the employer's own contributions.",
      "Missing the welfare statute deadline extinguishes the deduction permanently; later deposit does not revive it.",
    ],
    relevance:
      "One of the most practically significant recent decisions, affecting a very large number of assessments and closing off a position many taxpayers had relied on. The same architecture appears in the IT Act 2025 — Section 29 governs employee welfare deductions and imposes the deposit condition, while Section 37 carries the actual-payment rule. The distinction between the two contributions survives intact, so payroll compliance calendars remain directly tax-relevant.",
    keywords: [
      "employees contribution",
      "provident fund",
      "ESI",
      "due date",
      "43B",
      "held in trust",
      "employer contribution",
      "fiduciary",
    ],
  },
  {
    slug: "maxopp-investment",
    caseName: "Maxopp Investment Ltd v. CIT",
    citation: "(2018) 402 ITR 640 (SC)",
    court: "Supreme Court",
    year: 2018,
    category: "Business & Profession",
    section1961: "Section 14A",
    section2025: "Section 14",
    sectionTopic: "Heads of income; expenditure relating to exempt income",
    issue:
      "Where shares are acquired to obtain control rather than to earn dividends, does the dominant purpose of the investment take the expenditure outside the disallowance for exempt income?",
    held:
      "No. The dominant purpose of holding the shares is irrelevant. Once exempt dividend income is in fact earned, expenditure relatable to it must be disallowed. The disallowance must, however, be computed on a proper basis with recorded satisfaction.",
    facts:
      "The appeals covered two situations. In the first, companies had acquired shares in group companies to secure or retain controlling interest, funding the acquisition partly through borrowings, and received dividends which were exempt. In the second, banks and share dealers held shares as stock in trade in the course of their trading business and received dividends incidentally while holding the stock. In both, the Revenue disallowed a portion of the interest and administrative expenditure as relatable to the exempt dividend income, applying the prescribed formula.",
    proceduralHistory:
      "The Delhi High Court had accepted a dominant purpose approach in the controlling-interest cases, while the Punjab and Haryana High Court had taken a different view in the stock-in-trade cases. The Supreme Court heard the matters together and resolved the conflict.",
    contentions: {
      assessee:
        "Shares were acquired to obtain control, or were held as trading stock with a view to profit on sale. In neither case was the objective to earn dividend, which arose incidentally and without any expenditure being incurred to produce it. The disallowance is directed at expenditure incurred in relation to exempt income, which presupposes that earning the exempt income was the purpose of the outlay.",
      revenue:
        "The provision is triggered by the earning of exempt income and the incurring of expenditure in relation to it. It contains no exception based on the taxpayer's motive in acquiring the asset. Dividends were in fact received and were exempt, and the funds deployed in the shares carried a cost.",
    },
    summary:
      "The Court rejected the dominant purpose theory. It held that the provision is engaged where exempt income is earned and expenditure is incurred in relation to it, and that the taxpayer's motive in acquiring the shares is not a criterion the section recognises. Whether shares are held for control or as trading stock, the dividend they yield is exempt, and expenditure attributable to earning it must be disallowed; a contrary reading would introduce an exception the legislature did not provide. In the stock-in-trade cases the Court acknowledged the practical difficulty that the dominant purpose is to trade, but held that the apportionment must still be made in respect of the exempt dividend actually received. At the same time the Court gave full weight to the statutory safeguard: the Assessing Officer must, having regard to the accounts, record objective satisfaction that the taxpayer's own computation of expenditure relatable to exempt income is incorrect, and must do so with reasons, before invoking the prescribed formula. The formula cannot be applied mechanically or as a matter of course, and a disallowance made without that recorded satisfaction is bad.",
    principles: [
      "The dominant purpose in acquiring shares is irrelevant to the disallowance for expenditure relating to exempt income.",
      "The provision is triggered by exempt income being earned together with expenditure incurred in relation to it.",
      "Shares held as stock in trade are not outside the provision where exempt dividends are received.",
      "The Assessing Officer must record objective satisfaction, with reasons, before applying the prescribed formula.",
      "The formula cannot be applied mechanically; the safeguard is mandatory, not procedural.",
    ],
    relevance:
      "The disallowance now sits within Section 14 of the IT Act 2025, which absorbs the former standalone provision. Both halves of the ruling continue to matter — the rejection of dominant purpose, which favours the Revenue, and the mandatory recorded satisfaction, which remains the most common ground on which such disallowances are set aside.",
    keywords: [
      "section 14A",
      "exempt income",
      "dominant purpose",
      "strategic investment",
      "recorded satisfaction",
      "Rule 8D",
      "stock in trade",
      "apportionment",
    ],
  },
  {
    slug: "south-indian-bank",
    caseName: "South Indian Bank Ltd v. CIT",
    citation: "(2021) 438 ITR 1 (SC)",
    court: "Supreme Court",
    year: 2021,
    category: "Business & Profession",
    section1961: "Section 14A",
    section2025: "Section 14",
    sectionTopic: "Heads of income; expenditure relating to exempt income",
    issue:
      "Where a taxpayer has both interest-free funds and borrowings, and its own funds exceed the tax-free investments, can interest expenditure still be disallowed as relatable to exempt income?",
    held:
      "No. A presumption arises that the investments were made out of the taxpayer's own funds where those funds exceed the investments, and proportionate disallowance of interest is not warranted.",
    facts:
      "The appellants were banks which held investments in tax-free bonds and securities yielding exempt income. They also accepted deposits and incurred substantial interest expenditure in the ordinary course of banking. Their own funds — share capital, reserves and surplus, and current account deposits not bearing interest — exceeded the value of the investments yielding exempt income. The Revenue disallowed a proportionate part of the interest expenditure on the footing that borrowed funds must have been deployed, at least in part, in acquiring the tax-free investments, without establishing any direct link between particular borrowings and particular investments.",
    proceduralHistory:
      "The Kerala High Court decided against the banks. Conflicting views existed among the High Courts, with the Bombay High Court having adopted the own-funds presumption in earlier decisions. The Supreme Court resolved the conflict in the banks' favour.",
    contentions: {
      assessee:
        "Where a taxpayer's interest-free funds exceed the investments yielding exempt income, the presumption is that those investments came from its own funds, and no interest disallowance arises. Funds in a banking business are held in a common pool and cannot be traced item by item; the Revenue established no nexus between any borrowing and any tax-free investment.",
      revenue:
        "A bank funds its operations substantially from interest-bearing deposits. Where such funds are part of the pool from which investments are made, a proportionate part of the interest cost is necessarily referable to the exempt income, and apportionment is appropriate.",
    },
    summary:
      "The Court approved the presumption that had been developed in earlier High Court decisions. Where a taxpayer's own interest-free funds — comprising capital, reserves, surplus and non-interest-bearing deposits — exceed the value of the investments yielding exempt income, it is to be presumed that the investments were made from those own funds, and a proportionate disallowance of interest is not justified. The Court reasoned that in a business where funds are held in a common pool, tracing particular rupees to particular investments is impossible, and in the absence of any material establishing a direct nexus between specific borrowings and the tax-free investments, the Revenue cannot simply assume one. The burden of demonstrating such a nexus rests on the Revenue, and it had not been discharged. The Court was careful to confine its holding to the interest component: the presumption addresses interest expenditure and does not exclude disallowance of administrative or other expenditure genuinely relatable to earning the exempt income.",
    principles: [
      "Where own interest-free funds exceed tax-free investments, a presumption arises that the investments came from own funds.",
      "In a common pool of funds, tracing particular borrowings to particular investments is not possible.",
      "The burden of establishing a nexus between specific borrowings and tax-free investments lies on the Revenue.",
      "The presumption addresses the interest component; administrative expenditure may still be disallowed.",
    ],
    relevance:
      "Read together with Maxopp, this gives the practical framework under Section 14 of the IT Act 2025: exempt income triggers disallowance, but the interest component falls away where own funds comfortably cover the investments. It is the standard authority for banks, non-banking financial companies, insurers and any taxpayer with mixed funding, and makes the own-funds-to-investments comparison a routine part of the computation.",
    keywords: [
      "section 14A",
      "own funds presumption",
      "interest disallowance",
      "mixed funds",
      "nexus",
      "tax free investments",
      "banks",
      "common pool",
    ],
  },
  {
    slug: "shree-choudhary-transport",
    caseName: "Shree Choudhary Transport Co v. ITO",
    citation: "(2020) 426 ITR 289 (SC)",
    court: "Supreme Court",
    year: 2020,
    category: "Business & Profession",
    section1961: "Section 40(a)(ia)",
    section2025: "Section 35",
    sectionTopic: "Amounts not deductible in certain circumstances",
    issue:
      "Does the disallowance for failure to withhold tax apply only to amounts remaining payable at the year end, or also to amounts already paid during the year?",
    held:
      "It applies to both. The provision covers sums on which tax was deductible and was not deducted, whether or not they remain outstanding at the close of the year.",
    facts:
      "The appellant was a transport contractor which had undertaken to transport cement for a manufacturer. It engaged individual truck operators to perform the carriage and made payments to them during the year without deducting tax at source. The Assessing Officer disallowed the payments for failure to withhold. The appellant contended that it had not entered into any sub-contract with the truck operators, that the payments were made during the year and nothing remained payable at the year end, and that the disallowance provision applied only to amounts outstanding on the last day of the year.",
    proceduralHistory:
      "The disallowance was upheld through the appellate stages and by the Rajasthan High Court. A conflict existed among the High Courts on the paid-versus-payable question, the Allahabad and Gujarat High Courts having taken the wider view and a Special Bench of the Tribunal having earlier taken the narrower one. The Supreme Court settled the question.",
    contentions: {
      assessee:
        "The provision uses the word 'payable', which denotes an amount outstanding and not yet discharged. Amounts already paid during the year are not payable at the year end and fall outside the disallowance. Separately, there was no sub-contract with the truck operators, who were engaged on an ad hoc basis, so no withholding obligation arose at all.",
      revenue:
        "The provision is directed at securing compliance with the withholding obligations. Reading it as confined to amounts outstanding at the year end would allow a taxpayer who failed to withhold to escape disallowance simply by settling the dues before the year closed, which would defeat its purpose entirely.",
    },
    summary:
      "The Court held that the disallowance applies to both paid and payable amounts. It reasoned that the provision is intended to enforce the withholding obligations, and that a construction confining it to sums outstanding at the year end would produce an irrational result: a taxpayer who failed to deduct but paid the amount before the year closed would escape, while one who failed to deduct and left the amount outstanding would be penalised, though the default in each case is identical. The purpose being to secure deduction, the disallowance must attach to the failure to deduct rather than to the accident of when payment was made. On the facts, the Court also held that the arrangement with the truck operators amounted to a sub-contract for the carriage the appellant had undertaken, so the withholding obligation clearly arose. It further confirmed that the later amendment moderating the disallowance to a proportion of the sum operates prospectively and did not assist the appellant for the year in question.",
    principles: [
      "The disallowance applies to sums paid during the year as well as to sums payable at the year end.",
      "A construction that lets a defaulter escape by settling dues before year end would defeat the provision's purpose.",
      "Engaging others to perform work one has contracted to do constitutes a sub-contract attracting withholding.",
      "The amendment moderating the quantum of disallowance operates prospectively.",
    ],
    relevance:
      "Settled a long-running conflict among the High Courts. The disallowance is carried into Section 35 of the IT Act 2025, and the paid-versus-payable argument is no longer available. The sub-contract finding is also useful in the transport, logistics and construction sectors, where work is routinely passed on to smaller operators.",
    keywords: [
      "40(a)(ia)",
      "TDS disallowance",
      "paid versus payable",
      "sub-contract",
      "transport operators",
      "prospective amendment",
      "purposive construction",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ASSESSMENT & REASSESSMENT
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "ashish-agarwal-reassessment",
    caseName: "Union of India v. Ashish Agarwal",
    citation: "(2022) 444 ITR 1 (SC)",
    court: "Supreme Court",
    year: 2022,
    category: "Assessment & Reassessment",
    section1961: "Sections 147, 148 & 148A",
    section2025: "Sections 279, 280 & 281",
    sectionTopic:
      "Income escaping assessment; issue of reassessment notice; inquiry and opportunity before notice",
    issue:
      "What becomes of the very large number of reassessment notices issued in the old form after the new procedure, with its inquiry and opportunity safeguards, had already come into force?",
    held:
      "Rather than quash them, the notices are deemed to be notices under the new inquiry provision. The Revenue must supply the underlying material and follow the new procedure, and the taxpayer's objections are preserved.",
    facts:
      "The Finance Act 2021 substituted the reassessment provisions with effect from 1 April 2021, introducing a mandatory preliminary inquiry under Section 148A under which the taxpayer must be given the information relied on and an opportunity to respond before a reassessment notice may issue. Relying on notifications issued under a relaxation statute extending various time limits during the pandemic, the Revenue issued approximately ninety thousand reassessment notices after that date in the old, pre-amendment form, without following the new inquiry procedure. Taxpayers across the country challenged them.",
    proceduralHistory:
      "High Courts including Allahabad, Rajasthan, Delhi, Bombay and Calcutta quashed the notices, holding that the substituted provisions applied from 1 April 2021 and that delegated legislation could not defer the operation of a statutory amendment. The Revenue appealed to the Supreme Court, which was faced with the prospect of tens of thousands of notices failing on a procedural footing.",
    contentions: {
      assessee:
        "The substituted provisions took effect from 1 April 2021. Notifications issued under a relaxation statute could extend time limits but could not keep the repealed provisions alive or defer Parliament's amendment. Notices issued in the old form after that date were without jurisdiction and had to be quashed.",
      revenue:
        "The notifications were issued in a genuine belief that the pre-amendment provisions continued to apply to the extended periods, and officers acted bona fide. Quashing every notice would cause a substantial loss of revenue in cases where escapement was genuinely suspected, and the defect was procedural in nature.",
    },
    summary:
      "The Court agreed with the High Courts that the substituted provisions applied from 1 April 2021 and that the notices, as issued, did not comply with them. But it declined to leave the matter there. Exercising its plenary power under Article 142 to do complete justice, it fashioned a nationwide remedy applying to all such notices, including those not before it. The notices were deemed to be show cause notices issued under the new inquiry provision. The Assessing Officers were directed to furnish to the taxpayers, within thirty days, the information and material relied on in support of the allegation that income had escaped assessment. Taxpayers were given two weeks to reply, and the officers were then to pass orders under the inquiry provision in the ordinary way before deciding whether to issue a reassessment notice. The Court expressly preserved all defences available to the taxpayer, including those relating to limitation and the merits, and barred only the objection that the old procedure had been followed. It noted that the Revenue could not be left remediless where officers had acted bona fide on a genuine interpretation, while taxpayers would receive the full benefit of the new safeguards.",
    principles: [
      "The substituted reassessment provisions applied from 1 April 2021; delegated legislation could not defer them.",
      "Article 142 may be used to fashion a remedy balancing bona fide Revenue action against taxpayer safeguards.",
      "Notices issued in the old form were deemed to be show cause notices under the new inquiry provision.",
      "The Revenue must supply the material relied on before proceeding to a reassessment notice.",
      "All defences including limitation are preserved; only the objection to the procedure followed is barred.",
    ],
    relevance:
      "The reference point for the entire block of transitional reassessment litigation, and still generating disputes over limitation in individual cases, particularly on how the extended periods interact with the ordinary time limits. The corresponding provisions in the IT Act 2025 are Sections 279 to 281, so the procedural safeguards the judgment enforced carry forward in substance.",
    keywords: [
      "reassessment",
      "148A",
      "transitional notices",
      "Article 142",
      "show cause",
      "limitation",
      "TOLA",
      "complete justice",
    ],
  },
  {
    slug: "abhisar-buildwell",
    caseName: "PCIT v. Abhisar Buildwell Pvt Ltd",
    citation: "(2023) 454 ITR 212 (SC)",
    court: "Supreme Court",
    year: 2023,
    category: "Assessment & Reassessment",
    section1961: "Sections 153A & 147",
    section2025: "Sections 285 & 279",
    sectionTopic: "Assessment in case of search; income escaping assessment",
    issue:
      "In a search assessment for a year that was already completed and not pending, can additions be made without any incriminating material found during the search?",
    held:
      "No. For completed or unabated assessments, additions must rest on incriminating material found in the search. The Revenue's remedy in such cases is to reopen under the reassessment provisions, if otherwise available.",
    facts:
      "Searches were conducted on various taxpayers, and assessments were framed under the search provisions for the six preceding years. In a number of those years, the original assessments had already been completed and no proceedings were pending on the date of the search, so those assessments did not abate. The Assessing Officers nonetheless made additions in those years on the basis of material already on record or on general grounds, without any incriminating material having been found during the search itself.",
    proceduralHistory:
      "The Delhi High Court in the Kabul Chawla line of cases had held that additions in unabated years require incriminating material, while the Allahabad High Court had taken a contrary view. The Supreme Court resolved the conflict and, in doing so, clarified the Revenue's alternative remedy.",
    contentions: {
      assessee:
        "The search assessment provision is triggered by a search and is intended to bring to tax undisclosed income unearthed by it. Where an assessment stood completed and did not abate, the officer does not acquire a general power to reassess the year afresh; the jurisdiction to make additions depends on something incriminating having been found.",
      revenue:
        "The provision requires the total income of each of the six years to be assessed or reassessed, without limiting the assessment to material found in the search. Once a search occurs, the officer may examine all aspects of those years.",
    },
    summary:
      "The Court distinguished between assessments pending on the date of search, which abate and may be framed afresh on all material, and assessments already completed, which do not abate. For the latter, it held that the jurisdiction to make additions depends on incriminating material unearthed during the search. The search provision, it reasoned, is directed at bringing to tax income disclosed by the search; it does not confer a general power to review concluded assessments in the absence of anything found. To hold otherwise would allow a search in relation to one year to reopen years in which nothing had been discovered, which the scheme does not contemplate. Having decided the principal question against the Revenue, the Court was careful to preserve its position: it held expressly that in cases where no incriminating material is found, the ordinary reassessment powers remain available, subject to their own conditions as to reason to believe, limitation and approval. It therefore saved the Revenue's alternative remedy while confining the search assessment power to its proper scope.",
    principles: [
      "Assessments pending on the date of search abate and may be framed afresh on all material.",
      "Completed assessments do not abate; additions in those years require incriminating material found in the search.",
      "The search assessment power is not a general power to review concluded assessments.",
      "Where no incriminating material is found, the ordinary reassessment route remains available subject to its own conditions.",
    ],
    relevance:
      "Governs a large volume of search assessment appeals. The search assessment provision is Section 285 in the IT Act 2025 and the reassessment trigger is Section 279, so both the limitation on additions and the preserved alternative remedy continue to apply. The practical consequence is that the abated-versus-unabated status of each year must be established at the outset of any search assessment dispute.",
    keywords: [
      "search assessment",
      "153A",
      "incriminating material",
      "unabated assessment",
      "completed assessment",
      "abatement",
      "Kabul Chawla",
    ],
  },
  {
    slug: "maruti-suzuki-amalgamation",
    caseName: "PCIT v. Maruti Suzuki India Ltd",
    citation: "(2019) 416 ITR 613 (SC)",
    court: "Supreme Court",
    year: 2019,
    category: "Assessment & Reassessment",
    section1961: "Sections 143(3) & 170",
    section2025: "Assessment provisions; succession on amalgamation",
    sectionTopic: "Assessment framed on a non-existent entity",
    issue:
      "Is an assessment made in the name of a company that has already been dissolved on amalgamation valid, where the Revenue was informed of the amalgamation?",
    held:
      "No. An assessment on a non-existent entity is a jurisdictional defect that goes to the root of the matter. It is void, and cannot be cured as a mere procedural irregularity.",
    facts:
      "A company amalgamated with the respondent under a scheme sanctioned by the High Court, and on the scheme taking effect the amalgamating company ceased to exist. The fact of the amalgamation was intimated to the Assessing Officer during the course of the assessment proceedings. Notwithstanding that intimation, the assessment order was passed in the name of the amalgamating company, which by then had no legal existence. The successor participated in the proceedings.",
    proceduralHistory:
      "The Tribunal and the Delhi High Court held the assessment void. The Revenue appealed to the Supreme Court, relying on the provision curing defects of form and on the successor's participation.",
    contentions: {
      assessee:
        "On amalgamation the transferor company ceased to exist. An order cannot be made against a person who does not exist, and the defect is jurisdictional rather than formal. The Revenue had been told of the amalgamation and proceeded regardless. Participation by the successor cannot confer a jurisdiction the statute does not give.",
      revenue:
        "The successor had participated throughout and suffered no prejudice; the error was one of description only. The provision curing defects in the form of proceedings, where they are in substance in conformity with the Act, saves the assessment, and the successor is in any event liable for the predecessor's tax.",
    },
    summary:
      "The Court held that upon the sanctioned scheme taking effect, the amalgamating company's corporate existence came to an end, and there was no person in respect of whom an assessment order could be made. It characterised the defect as jurisdictional, going to the root of the assessment, and not as an irregularity of form capable of being cured by the saving provision, which is confined to defects of form where the proceeding is in substance in conformity with the Act. The Court further held that participation by the successor in the proceedings could not confer jurisdiction, since jurisdiction is conferred by statute and cannot be created by acquiescence or consent. It laid weight on the fact that the Revenue had been expressly informed of the amalgamation and had nonetheless framed the assessment in the name of a company it knew no longer existed. The provision dealing with succession, the Court held, addresses who is liable for the tax of a predecessor; it does not authorise an assessment to be framed on a dissolved entity.",
    principles: [
      "On amalgamation taking effect the transferor company ceases to exist and cannot be assessed.",
      "An assessment on a non-existent entity is a jurisdictional defect, not a curable irregularity of form.",
      "Participation by the successor cannot confer jurisdiction; jurisdiction is conferred by statute alone.",
      "Provisions on succession govern liability for tax, not the validity of an assessment on a dissolved entity.",
      "Intimation of the amalgamation to the Revenue is material to the outcome.",
    ],
    relevance:
      "Regularly decisive in post-merger disputes. It must now be read with Mahagun Realtors, where the Court declined to apply it on facts involving non-disclosure of the amalgamation, so the outcome turns closely on what was disclosed to the Revenue and when. The practical lesson is that intimation of the amalgamation, in writing and on record, is what preserves the objection.",
    keywords: [
      "amalgamation",
      "non-existent entity",
      "jurisdictional defect",
      "void assessment",
      "successor company",
      "section 292B",
      "intimation",
    ],
  },
  {
    slug: "mahagun-realtors",
    caseName: "PCIT v. Mahagun Realtors Pvt Ltd",
    citation: "(2022) 443 ITR 194 (SC)",
    court: "Supreme Court",
    year: 2022,
    category: "Assessment & Reassessment",
    section1961: "Sections 143(3) & 170",
    section2025: "Assessment provisions; succession on amalgamation",
    sectionTopic:
      "Assessment following amalgamation where the fact was not disclosed",
    issue:
      "Does the rule invalidating assessments on amalgamated companies apply where the taxpayer did not disclose the amalgamation and continued to deal with the Revenue in the old name?",
    held:
      "No. The invalidity rule is not absolute. Where the amalgamation was concealed, returns were filed in the old name and the conduct of the assessee contributed to the error, the assessment is not void.",
    facts:
      "The amalgamation had taken effect some years before the assessment proceedings, but was not brought to the notice of the Assessing Officer. A search was conducted, and a return for the relevant year was filed in the name of the amalgamating company, signed on its behalf. The proceedings were conducted throughout on the footing that the company continued to exist, and the amalgamation was raised only later as a ground for challenging the assessment. The business of the amalgamating company had also continued to be carried on.",
    proceduralHistory:
      "The Delhi High Court, applying Maruti Suzuki, held the assessment void. The Revenue appealed to the Supreme Court, which reversed and distinguished its earlier decision.",
    contentions: {
      assessee:
        "The amalgamating company had ceased to exist before the assessment, and on the authority of Maruti Suzuki an assessment framed in its name is a nullity regardless of the circumstances. The defect is jurisdictional and cannot be waived.",
      revenue:
        "Unlike Maruti Suzuki, the Revenue was never informed of the amalgamation. The return itself was filed in the amalgamating company's name, and the assessee conducted itself throughout as though the company subsisted. A party cannot rely on a defect that its own suppression produced.",
    },
    summary:
      "The Court held that whether an assessment framed on an amalgamated entity is a nullity is not a question admitting of a single answer in every case; it depends on the facts, and in particular on the conduct of the assessee. It distinguished Maruti Suzuki on the footing that there the Revenue had been duly informed of the amalgamation and had proceeded in the old name with full knowledge. Here the amalgamation had been suppressed, the return for the year had been filed in the name of the amalgamating company, and the proceedings had been conducted on that basis throughout with the assessee's participation. In those circumstances the Court held that the assessee could not take advantage of a defect that its own non-disclosure had produced, and that the assessment was not void. It observed that the business had continued and that the conduct of the parties, the scheme of amalgamation and the surrounding facts must all be examined rather than a mechanical rule applied. The appeal of the Revenue was accordingly allowed.",
    principles: [
      "Whether an assessment on an amalgamated entity is a nullity depends on the facts and the conduct of the assessee.",
      "Where the amalgamation was not disclosed, the assessee cannot rely on the resulting defect.",
      "Filing a return in the name of the amalgamating company is material conduct.",
      "Maruti Suzuki applies where the Revenue was duly informed and proceeded regardless.",
      "The scheme of amalgamation and the conduct of the parties must be examined rather than a mechanical rule applied.",
    ],
    relevance:
      "The necessary counterweight to Maruti Suzuki. Together the two decisions establish that the outcome depends on disclosure: intimate the amalgamation and an assessment in the old name is void; suppress it and the objection is unlikely to succeed. Under the IT Act 2025 the assessment machinery is recast but the principle, resting on jurisdiction and conduct rather than on a specific numbered provision, continues to apply.",
    keywords: [
      "amalgamation",
      "non-disclosure",
      "conduct of assessee",
      "nullity",
      "distinguished Maruti Suzuki",
      "search assessment",
      "suppression",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TDS & TCS
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "itc-tips-tds-salary",
    caseName: "ITC Ltd v. CIT (TDS)",
    citation: "(2016) 384 ITR 14 (SC)",
    court: "Supreme Court",
    year: 2016,
    category: "TDS & TCS",
    section1961: "Sections 15, 17 & 192",
    section2025: "Sections 15, 16, 18 & 392",
    sectionTopic:
      "Salaries — charging section; definition of salary and profits in lieu of salary; TDS on salaries",
    issue:
      "Where a hotel collects tips from customers on credit card bills and disburses them to its staff, is the employer obliged to deduct tax at source as though the tips were salary?",
    held:
      "No. Tips are payments voluntarily made by customers, not by the employer, and do not arise from the contract of employment. They are not salary, so the withholding obligation on salary is not attracted. The employer acts only as a conduit.",
    facts:
      "ITC Ltd operated hotels at which customers frequently added a tip when settling their bills by credit card. Because the amount reached the hotel through the card settlement rather than the customer's hand, the hotel collected those sums and later distributed them among its staff. The Revenue treated the disbursements as salary paid by the employer, held the hotel to be an assessee in default for failing to deduct tax at source on them under Section 192, and raised demands for tax and interest across several years. The same pattern arose for a number of hotel companies and the appeals were heard together.",
    proceduralHistory:
      "The Assessing Officer's orders were confirmed in part through the appellate stages, and the Delhi High Court decided against the hotels, holding the tips to be income under the head salary in the employees' hands with a consequent obligation to withhold. The hotels appealed to the Supreme Court.",
    contentions: {
      assessee:
        "The tips were paid by customers, not by the employer, out of their own volition and in recognition of service. They form no part of the contract of employment, the employee has no enforceable right against the employer to receive them, and the hotel merely collects and passes them on. Since the sums are not paid by the employer as salary, the obligation to deduct under Section 192 cannot arise. At most the receipt is income in the employee's hands from another source, on which the employee is assessable.",
      revenue:
        "The money reached the employees through the employer, who determined how it was apportioned and disbursed it with the wages. The definition of salary is wide and includes profits in lieu of salary and any payment received from an employer in connection with employment. Once the amounts pass through the employer's hands to the employee, the withholding obligation attaches.",
    },
    summary:
      "The Court examined the source and character of the payment rather than the route it travelled. It held that a tip is a voluntary payment by a customer, made out of the customer's own satisfaction with the service, and is in no sense a payment by the employer. The contract of employment creates no right in the employee to receive tips and imposes no obligation on the employer to pay them; whether any tip is received at all depends entirely on the customer. The employer, in collecting amounts settled by credit card and distributing them, performs the function of a conduit or trustee for money that was never its own. Since the charge under the head of salary, and the corresponding withholding obligation, rest on a payment made by the employer to the employee arising out of the employment relationship, neither was attracted. The Court was careful to add that its conclusion did not place the receipt outside the tax net altogether: the tips remain income in the hands of the employees, chargeable under the appropriate head, and the employees are assessable on them in the ordinary way. What fails is the attempt to cast the collection burden on the employer. The orders treating the hotels as assessees in default were accordingly set aside.",
    principles: [
      "A tip is a voluntary payment by the customer, not a payment by the employer.",
      "Salary presupposes a payment arising out of the contract of employment; tips create no such entitlement.",
      "An employer who collects and passes on customer tips acts as a conduit, not as a payer of salary.",
      "The withholding obligation on salary is not attracted where the sum is not salary in the recipient's hands.",
      "The tips remain taxable in the employees' own hands under the appropriate head.",
    ],
    relevance:
      "The leading authority on service charges, tips and similar customer-funded payments routed through an employer, now falling under Sections 15 to 18 for the charge and Section 392 for salary withholding under the IT Act 2025. It is directly relevant to hotels, restaurants, salons and delivery platforms wherever customer gratuities are pooled and distributed. Note the distinction the case turns on: a mandatory service charge levied by the establishment and paid to staff out of its own funds stands on a different footing from a voluntary tip, and this decision should not be read as covering it.",
    keywords: [
      "tips",
      "service charge",
      "salary",
      "section 192",
      "assessee in default",
      "hotel industry",
      "conduit",
      "voluntary payment",
    ],
  },
  {
    slug: "tata-chemicals-refund-interest",
    caseName: "Union of India v. Tata Chemicals Ltd",
    citation: "(2014) 363 ITR 658 (SC)",
    court: "Supreme Court",
    year: 2014,
    category: "TDS & TCS",
    section1961: "Sections 195, 240 & 244A",
    section2025: "Sections 393 & 437",
    sectionTopic:
      "TDS on specified payments; interest on delayed refund of excess tax",
    issue:
      "Where a resident deductor withholds and deposits tax on a payment to a non-resident, and that tax is later found not to have been payable, is the deductor entitled to interest on the refund?",
    held:
      "Yes. The State, having received and retained money without right, must refund it with interest. Interest under Section 244A is payable to the deductor from the date the tax was paid to the date of refund.",
    facts:
      "The respondent had made payments to a non-resident and, acting on a determination by the Assessing Officer as to the rate at which tax should be withheld, deducted and deposited tax accordingly. In subsequent proceedings it was established that the sums were not chargeable to the extent assumed, and the tax deducted had therefore been deposited in excess of what was due. The deductor sought refund of the excess together with interest. The Revenue refunded the principal but declined interest, contending that the statutory provision for interest on refunds applies to an assessee who has paid tax on its own account and not to a deductor recovering tax it had withheld on another's behalf.",
    proceduralHistory:
      "The claim to interest was rejected by the Revenue and the matter travelled through the appellate stages to the High Court, which decided in favour of the deductor. The Union appealed to the Supreme Court, where the question was whether the refund provisions extend to a deductor at all.",
    contentions: {
      assessee:
        "The money was collected by the State without authority of law, since the underlying sum was not chargeable to the extent assumed. A person who has been deprived of the use of money that the State had no right to retain is entitled to be compensated for that deprivation. The refund and interest provisions are general in their terms and are not confined to tax paid by an assessee on its own income.",
      revenue:
        "The interest provision is framed by reference to an assessee and to tax paid by way of advance tax, self-assessment tax or tax deducted on the assessee's own income. A deductor is not the assessee in respect of the deducted sum; it pays over money belonging to the payee. There is no express provision entitling a deductor to interest, and interest cannot be awarded in the absence of a statutory foundation.",
    },
    summary:
      "The Court proceeded from the principle that the State may retain money only under authority of law. Where tax has been collected without such authority, the obligation to refund carries with it an obligation to compensate the person from whom it was taken for the period during which the State had the use of the money. The Court held that the refund provisions are not confined to an assessee paying tax on its own income: the expression must be read in the context of a scheme that contemplates refund to the person who paid, and a deductor who has deposited tax out of its own funds on a determination later found to be wrong is such a person. It rejected the argument that the absence of an express provision was fatal, observing that the obligation to pay interest on money wrongly retained is not a matter of concession but flows from the character of the receipt. The Court held that interest runs from the date on which the tax was paid to the State until the date on which the refund is granted, and that the resident deductor was entitled to it accordingly. It emphasised that this is compensation for deprivation of the use of money rather than a penalty on the Revenue.",
    principles: [
      "The State may retain money only under authority of law; tax collected without such authority must be refunded.",
      "An obligation to refund carries with it an obligation to compensate for the period the money was retained.",
      "The refund and interest provisions are not confined to tax paid by an assessee on its own income.",
      "A resident deductor who deposits excess tax out of its own funds is entitled to interest on the refund.",
      "Interest runs from the date of payment to the State until the date of refund.",
    ],
    relevance:
      "Governs every claim for interest on refund of excess withholding, a recurring issue where tax is deducted on a conservative view of chargeability and the position is later resolved in the payer's favour. Under the IT Act 2025 the withholding provisions are consolidated in Section 393 and interest on delayed refund sits in Section 437. Read alongside GE India Technology, which establishes that withholding is required only where the sum is chargeable, this decision supplies the remedy when tax has nonetheless been deducted and deposited.",
    keywords: [
      "interest on refund",
      "244A",
      "excess TDS",
      "resident deductor",
      "unjust retention",
      "compensation",
      "section 195",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TATA — BUSINESS, TRANSFER PRICING AND SOFTWARE
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "tata-iron-steel-actual-cost",
    caseName: "Tata Iron & Steel Co Ltd v. CIT",
    citation: "(1998) 231 ITR 285 (SC)",
    court: "Supreme Court",
    year: 1998,
    category: "Business & Profession",
    section1961: "Sections 43(1) & 43A",
    section2025: "Sections 39 & 42",
    sectionTopic:
      "Computation of actual cost of assets; capitalising the impact of change in foreign exchange rates",
    issue:
      "Does a loss arising on repayment of a foreign currency loan, taken to acquire plant, increase the actual cost of that plant for depreciation and related purposes?",
    held:
      "No. The cost of an asset and the manner in which the purchase price is raised and repaid are two distinct matters. Fluctuation in the exchange rate on repaying the loan does not alter the actual cost of the asset.",
    facts:
      "The company had acquired plant and machinery, funding the acquisition through borrowings denominated in foreign currency. The rupee subsequently depreciated, so that repaying the loan required a larger rupee outlay than the amount originally reflected when the asset was acquired. The company sought to add that additional rupee burden to the actual cost of the plant, which would have increased the base on which depreciation and other allowances were computed. The Revenue declined, holding that the cost of the asset was fixed at acquisition and that the terms on which the purchase price had been financed were a separate matter.",
    proceduralHistory:
      "The claim was rejected in assessment and the matter proceeded by reference to the High Court, which decided against the company. The appeal came before the Supreme Court, which considered the relationship between the cost of an asset and the financing arrangements used to acquire it.",
    contentions: {
      assessee:
        "The true economic cost of acquiring the plant is what the company ultimately had to part with, and that figure was increased by the exchange movement on the borrowing raised for the purchase. Confining the cost to the rupee figure recorded at acquisition understates what the asset actually cost the business.",
      revenue:
        "The cost of an asset is what the assessee paid to acquire it. How that payment was funded — from reserves, from a rupee loan, or from a foreign currency loan — is a matter between the assessee and its lenders. A loss on repaying a loan is a consequence of the financing arrangement, not an addition to the price of the asset.",
    },
    summary:
      "The Court held that the cost of an asset and the liability to repay the money borrowed to acquire it are distinct and must not be conflated. When the plant was acquired, the price was ascertained and the asset entered the business at that cost. The loan raised to fund the purchase created a separate obligation between the company and its lender, and the rupee burden of discharging that obligation varied with the exchange rate. That variation affected the cost of servicing the borrowing; it did not retrospectively change what the plant had cost. The Court observed that the position would be otherwise only where the statute expressly so provides — as the legislature had done by enacting a specific provision dealing with the capitalisation of exchange differences on liabilities incurred for acquiring assets from outside India — and that such a provision, being a departure from the general principle, operates within its own terms and cannot be extended by analogy. Absent such a provision applying on the facts, the general rule governed and the actual cost stood unchanged.",
    principles: [
      "The cost of an asset and the liability to repay borrowings used to acquire it are distinct matters.",
      "Exchange fluctuation on repaying a loan does not retrospectively alter the actual cost of the asset.",
      "The manner of financing an acquisition is a matter between the assessee and its lender.",
      "A statutory provision capitalising exchange differences is a departure from the general rule and operates within its own terms.",
    ],
    relevance:
      "The IT Act 2025 continues the same structure: Section 39 computes the actual cost of assets and Section 42 provides expressly for capitalising the impact of exchange rate changes, with Section 43 governing foreign exchange fluctuation gains and losses more generally. This decision remains the statement of the general principle against which those specific provisions operate, and is the starting point whenever a taxpayer seeks to build financing costs into the cost base of an asset.",
    keywords: [
      "actual cost",
      "foreign exchange fluctuation",
      "depreciation base",
      "43A",
      "capitalisation",
      "financing cost",
      "plant and machinery",
    ],
  },
  {
    slug: "tata-autocomp-libor",
    caseName: "CIT v. Tata Autocomp Systems Ltd",
    citation: "(2015) 374 ITR 516 (Bom)",
    court: "Bombay High Court",
    year: 2015,
    category: "Transfer Pricing",
    section1961: "Sections 92B & 92C",
    section2025: "Sections 163 & 165",
    sectionTopic:
      "Meaning of international transaction; determination of arm's length price",
    issue:
      "When an Indian company lends in foreign currency to its overseas associated enterprise, should the arm's length interest rate be the Indian lending rate or the rate prevailing in the country where the loan is received?",
    held:
      "The rate prevailing where the loan is received and used. Benchmarking a foreign currency loan against Indian rupee lending rates is inappropriate, because the two are not comparable.",
    facts:
      "The Indian company advanced a loan in foreign currency to its wholly owned subsidiary in Germany, charging interest at a rate that reflected European market conditions. The Transfer Pricing Officer rejected that rate and substituted the Indian prime lending rate, which was substantially higher, on the footing that the funds had been provided by an Indian enterprise and that the opportunity cost to be measured was what the Indian company could have earned by lending in India. An adjustment was made for the difference.",
    proceduralHistory:
      "The Tribunal held that the comparable rate was the one prevailing in the country where the loan was received, following the approach taken in other cases involving foreign currency advances to overseas subsidiaries. The Revenue appealed to the Bombay High Court.",
    contentions: {
      assessee:
        "The comparison required is with what an independent lender would have charged the borrower for a loan of the same currency, tenor and risk in the market where the borrower operates. A loan denominated in euros and used in Germany bears European rates. The Indian prime lending rate reflects rupee lending in Indian conditions and has no bearing on the pricing of a euro loan abroad.",
      revenue:
        "The lender is an Indian enterprise which has parted with funds it could otherwise have deployed in India. The appropriate measure of what the transaction should have yielded is the return available domestically, and the domestic prime lending rate supplies that measure.",
    },
    summary:
      "The Court upheld the Tribunal. It held that the arm's length enquiry asks what independent parties would have agreed for a comparable transaction, and comparability must be judged by reference to the currency in which the loan is denominated, the market in which it is placed, the tenor and the credit risk. A loan advanced and repayable in foreign currency, made available to a borrower operating abroad, is comparable to other foreign currency lending in that market, and its price is set by the interest rates prevailing there. The Indian prime lending rate reflects an entirely different set of conditions — rupee funding, Indian inflation and Indian credit conditions — and provides no proper comparison. The Court rejected the opportunity cost argument, observing that the transfer pricing provisions ask what price the transaction would have commanded between independent parties, not what alternative return the taxpayer might have earned by doing something else with its money. The adjustment founded on the domestic rate was accordingly deleted.",
    principles: [
      "Comparability for a loan is judged by currency, market, tenor and credit risk.",
      "A foreign currency loan to an overseas associated enterprise is benchmarked against rates prevailing in the borrower's market.",
      "The domestic prime lending rate is not a comparable for foreign currency lending abroad.",
      "The arm's length enquiry asks what the transaction would have commanded, not what alternative return was forgone.",
    ],
    relevance:
      "The settled position on outbound intra-group lending, applying under Sections 163 and 165 of the IT Act 2025. It governs the choice of benchmark for foreign currency loans to overseas subsidiaries and is routinely applied to guarantee fees and other cross-border financing arrangements. The reference rate itself has moved on with the retirement of LIBOR in favour of successor rates, but the principle — benchmark in the currency and market of the loan — is unaffected.",
    keywords: [
      "outbound loan",
      "LIBOR",
      "interest benchmarking",
      "foreign currency loan",
      "overseas subsidiary",
      "prime lending rate",
      "comparability",
    ],
  },
  {
    slug: "tcs-software-goods",
    caseName: "Tata Consultancy Services v. State of Andhra Pradesh",
    citation: "(2005) 271 ITR 401 (SC)",
    court: "Supreme Court",
    year: 2005,
    category: "International Tax",
    section1961:
      "Andhra Pradesh General Sales Tax Act — applied to Sections 9(1)(vi) & 90",
    section2025: "Sections 9 & 159 (by application)",
    sectionTopic:
      "Income deemed to accrue or arise in India; double taxation relief — software characterisation",
    issue:
      "Is packaged or canned computer software sold on a medium 'goods', or is it intangible property outside the concept of goods?",
    held:
      "Canned software sold off the shelf is goods. Once a programme is put on a medium and marketed, it becomes a marketable commodity capable of being bought, sold, transmitted and stored, notwithstanding that copyright subsists in the underlying programme.",
    facts:
      "The appellant sold both software developed to a customer's specification and standardised packaged software supplied on discs and similar media. The State treated the packaged software as goods liable to sales tax on its full value. The appellant contended that what the customer paid for was intellectual property and the right to use it, and that an intangible of that kind could not answer the description of goods, the medium being merely incidental. The dispute therefore turned on the characterisation of software supplied in standardised form.",
    proceduralHistory:
      "The Andhra Pradesh High Court held the software to be goods. The matter came before the Supreme Court, which examined the concept of goods and its application to a copyrighted work supplied on a medium. Although decided under sales tax legislation, the judgment is reported in the income tax reports and has been relied on extensively in income tax disputes over software payments.",
    contentions: {
      assessee:
        "What is supplied is the intellectual content of a programme in which copyright subsists. The disc is a mere vehicle. Intellectual property is not a tangible commodity and cannot be goods; the transaction is properly characterised as the grant of a right to use, not a sale of an article.",
      revenue:
        "Once a programme is recorded on a medium and offered for sale over the counter, it has all the attributes of merchandise — it can be bought, sold, transferred, delivered, stored and possessed. The presence of copyright in the underlying work does not prevent the copy from being a marketable commodity.",
    },
    summary:
      "The Court held that a computer programme recorded on a medium and marketed in standardised form is goods. It reasoned that the test is whether the item has the attributes of utility, capability of being bought and sold, and capability of being transmitted, transferred, delivered, stored and possessed. Canned software satisfies each of these: it is produced, packaged, priced and sold like any other article of commerce. The Court held that the subsistence of copyright in the underlying programme does not alter the character of the copy that changes hands, drawing the distinction between the intellectual property itself and the medium-borne copy in which it is embodied. It acknowledged that software developed specifically for a customer may stand differently, since what passes there may be the fruit of a service rather than a commodity off the shelf. The judgment thus separated the copyrighted work from the copy of it that is sold — the very distinction later carried into income tax law.",
    principles: [
      "Canned or packaged software supplied on a medium is goods, having the attributes of a marketable commodity.",
      "Subsistence of copyright in the underlying programme does not prevent the copy from being goods.",
      "The intellectual property and the medium-borne copy embodying it are distinct.",
      "Software written to a customer's specification may stand on a different footing from off-the-shelf software.",
    ],
    relevance:
      "Decided under sales tax legislation rather than the Income Tax Act, so it determines no income tax question directly. Its importance here is the distinction it draws between a copyright and a copy of the copyrighted work — the reasoning the Supreme Court carried into Engineering Analysis to hold that payments for software licences are not royalty. Where a cross-border software payment is characterised under Section 9 and treaty relief under Section 159 of the IT Act 2025, this is the foundation on which that analysis rests.",
    keywords: [
      "canned software",
      "packaged software",
      "goods",
      "copyright",
      "copyrighted article",
      "software characterisation",
      "sales tax",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CAPITAL GAINS — further judgments
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "mansukh-dyeing-revaluation",
    caseName: "CIT v. Mansukh Dyeing and Printing Mills",
    citation: "(2022) 449 ITR 439 (SC)",
    court: "Supreme Court",
    year: 2022,
    category: "Capital Gains",
    section1961: "Section 45(4)",
    section2025: "Section 67",
    sectionTopic: "Capital gains — charging section",
    issue:
      "On reconstitution of a firm, where assets are revalued and the enhanced value is credited to the partners' capital accounts, does a transfer arise attracting capital gains?",
    held:
      "Yes. Crediting the revaluation surplus to partners' capital accounts, which they are then entitled to draw, amounts to a distribution of assets and attracts the charge — even though no asset physically leaves the firm.",
    facts:
      "A partnership firm admitted new partners. Around the same time it revalued its land and building substantially above book value, and credited the resulting surplus to the capital accounts of the existing partners in their profit-sharing ratio. No asset was physically transferred out of the firm and no dissolution occurred. The Assessing Officer treated the credit of the revaluation surplus as a distribution of capital assets to partners on reconstitution and brought the amount to tax as capital gains in the firm's hands.",
    proceduralHistory:
      "The Tribunal and the Bombay High Court decided in the firm's favour, holding that a mere book revaluation on reconstitution was not a transfer. The Revenue appealed to the Supreme Court, which reversed.",
    contentions: {
      assessee:
        "Nothing left the firm. The land and building continued to be owned and used by the firm, and the revaluation was an accounting entry reflecting current worth. A distribution requires assets actually to pass to the partners, which did not happen; the provision is directed at dissolution or a genuine handing over of assets.",
      revenue:
        "By crediting the enhanced value to the partners' capital accounts, the firm conferred on them an immediate and enforceable entitlement to that amount, which they could withdraw. In substance the partners received the benefit of the appreciation, and the incoming partners obtained an interest in assets carrying that uplift. That is a distribution in all but name.",
    },
    summary:
      "The Court held that the provision is not confined to dissolution but extends to a transfer of capital assets by way of distribution on the reconstitution of a firm. It looked to the substance of what the entries achieved. On revaluation, the surplus was credited to the existing partners' capital accounts, which meant they became entitled to draw those amounts from the firm; correspondingly, the incoming partners acquired rights in assets whose recorded value had been stepped up. The benefit of the appreciation in the land and building therefore passed to the partners, and the firm parted with it. The Court held that it would defeat the provision to require a physical handing over of the asset, since the very purpose of the amendment was to catch arrangements by which appreciation is passed to partners without a conventional transfer. It accordingly held that capital gains arose in the hands of the firm in the year of revaluation and credit.",
    principles: [
      "The charge on distribution applies to reconstitution of a firm, not only to dissolution.",
      "Crediting a revaluation surplus to partners' capital accounts is a distribution in substance.",
      "A physical handing over of the asset is not required for the charge to arise.",
      "Substance governs over the form of the accounting entries.",
    ],
    relevance:
      "Capital gains are charged under Section 67 of the IT Act 2025. The decision governs firm and LLP restructurings where revaluation precedes the admission or retirement of partners, a common step in succession planning and in bringing in investors. It makes the timing and accounting treatment of revaluation a live tax question rather than a book entry.",
    keywords: [
      "revaluation",
      "reconstitution of firm",
      "partners capital account",
      "distribution of assets",
      "45(4)",
      "LLP restructuring",
    ],
  },
  {
    slug: "sunil-siddharthbhai",
    caseName: "Sunil Siddharthbhai v. CIT",
    citation: "(1985) 156 ITR 509 (SC)",
    court: "Supreme Court",
    year: 1985,
    category: "Capital Gains",
    section1961: "Sections 45 & 48",
    section2025: "Sections 67 & 72",
    sectionTopic: "Capital gains — charging section; mode of computation",
    issue:
      "When a partner contributes a personal capital asset to a firm as capital contribution, does a taxable capital gain arise, and what is the consideration?",
    held:
      "A transfer does occur, but on the law as it then stood the consideration was not ascertainable — the credit to the capital account is a notional figure whose real worth depends on future events — so no computable gain arose.",
    facts:
      "The assessee, a partner, brought shares held by him personally into the partnership as his capital contribution. The value at which the shares were credited to his capital account was higher than his cost of acquiring them. The Revenue treated the difference as a capital gain, arguing that the credit to the capital account represented the consideration received for parting with the shares. The assessee contended that on entering the firm he did not receive any determinate sum, since what he obtained was a right to share in future profits and in the net assets on dissolution.",
    proceduralHistory:
      "The matter reached the Supreme Court, which examined both whether a transfer occurred and whether any consideration capable of computation had accrued.",
    contentions: {
      assessee:
        "On contributing the asset, the partner's exclusive interest is replaced by a right to a share in the firm, which is neither a definite sum nor capable of valuation at that date. The amount credited to the capital account is a notional entry that may be wholly eroded by losses, drawings or the firm's liabilities. Without an ascertainable consideration, Section 48 cannot operate.",
      revenue:
        "The asset passed from the partner's exclusive ownership to the firm, which is a transfer. The figure at which it was credited to his capital account is the value the partners themselves placed on it, and there is no reason not to treat that agreed figure as the full value of the consideration.",
    },
    summary:
      "The Court held that when a partner brings a personal asset into a partnership, the exclusive interest he had is reduced to a shared interest and the asset becomes property of the firm; that satisfies the extended meaning of transfer. But the charge failed on the computation limb. What the partner receives in exchange is a right during the subsistence of the firm to share profits, and on dissolution a share in the net assets after satisfying liabilities — an entitlement whose value cannot be determined at the date of contribution. The credit in the capital account is only a notional figure entered for the purpose of adjusting rights between partners; it does not represent money or money's worth received, since it may be diminished or extinguished by the firm's trading. The consideration therefore being incapable of ascertainment, the computation provisions could not be applied and no chargeable gain arose. The Court added the important qualification that where the transaction is a device or a sham — where the firm is a mere pretext for converting an asset into money without tax — the Revenue may lift the veil and tax the real transaction.",
    principles: [
      "Contribution of a personal asset to a firm is a transfer, the exclusive interest becoming a shared one.",
      "The credit to the partner's capital account is notional and does not by itself constitute consideration received.",
      "Where the consideration is incapable of ascertainment, the computation provisions fail and no gain is chargeable.",
      "A sham or device dressed up as a capital contribution may be looked through and taxed on its real character.",
    ],
    relevance:
      "The statutory position has since been overtaken for this specific transaction by provisions deeming the amount recorded in the firm's books to be the full value of consideration, so the result no longer follows. What endures is the reasoning: the analysis of what a partner actually receives, the distinction between a notional book credit and real consideration, and the express reservation permitting a sham arrangement to be looked through. Read it for the principle, and check the current deeming provisions for the outcome.",
    keywords: [
      "capital contribution",
      "partnership",
      "notional consideration",
      "ascertainable consideration",
      "device or sham",
      "shared interest",
    ],
  },
  {
    slug: "george-henderson",
    caseName: "CIT v. George Henderson & Co Ltd",
    citation: "(1967) 66 ITR 622 (SC)",
    court: "Supreme Court",
    year: 1967,
    category: "Capital Gains",
    section1961: "Section 48",
    section2025: "Section 72",
    sectionTopic: "Mode of computation of capital gains",
    issue:
      "Does 'full value of the consideration' mean the market value of the asset transferred, or the consideration actually agreed between the parties?",
    held:
      "The consideration actually agreed. 'Full value of the consideration' means the whole price received or receivable for the transfer, and is not the same thing as the fair market value of the asset.",
    facts:
      "The assessee company transferred shares to another company at a price lower than the market quotation on the date of transfer. The Revenue computed the capital gain by substituting the market value of the shares for the price actually agreed, on the footing that 'full value of the consideration' must mean the true worth of what was given up. The assessee contended that the expression refers to the entirety of the price agreed between the parties and that the statute, as it then stood, contained no power to substitute market value in an ordinary transaction.",
    proceduralHistory:
      "The matter came before the Supreme Court by reference, the question being the correct construction of the words 'full value of the consideration' in the computation provision.",
    contentions: {
      assessee:
        "The words describe the consideration for the transfer, and the adjective 'full' requires the whole of it to be brought in rather than a part. It does not convert the consideration into something else. Where Parliament intended market value to be substituted, it said so expressly in specific provisions dealing with particular transactions.",
      revenue:
        "Capital gains are meant to tax the accretion in the value of an asset. If a taxpayer can transfer at an undervalue and be assessed only on the stated price, the charge is easily defeated. 'Full value' should therefore be read as the true or market value of the asset.",
    },
    summary:
      "The Court held that the expression 'full value of the consideration' means the whole price received or receivable by the transferor in exchange for the asset. The word 'full' is used in contradistinction to a part of the consideration: it directs that the entire amount agreed be taken, including any part paid in kind or deferred, and precludes deducting from it anything other than what the provision allows. It does not mean market value, which is a distinct concept the statute employs elsewhere in express terms. The Court pointed to provisions in which Parliament had specifically directed that fair market value be substituted in defined circumstances, and reasoned that the existence of those provisions shows that the general computation provision does not itself carry that meaning. Consideration is what the transferor receives; market value is what the asset is worth, and the two need not coincide. Absent a specific provision permitting substitution, the price actually agreed governs the computation.",
    principles: [
      "'Full value of the consideration' means the whole price received or receivable, not the market value of the asset.",
      "'Full' is used in contrast to a part of the consideration, requiring the entirety to be brought in.",
      "Market value may be substituted only where a specific provision expressly so directs.",
      "Consideration received and value of the asset are distinct concepts under the Act.",
    ],
    relevance:
      "The general rule in Section 72 of the IT Act 2025 remains that the consideration agreed governs. The practical significance now lies in how extensively that rule has been displaced by specific deeming provisions — Section 78 for immovable property by reference to stamp duty value, Section 79 for unquoted shares, and Section 80 where consideration is not ascertainable. George Henderson identifies the default; those sections mark out where the default no longer applies.",
    keywords: [
      "full value of consideration",
      "market value",
      "computation",
      "understatement",
      "deeming provision",
      "price agreed",
    ],
  },
  {
    slug: "dhun-dadabhoy-kapadia",
    caseName: "Miss Dhun Dadabhoy Kapadia v. CIT",
    citation: "(1967) 63 ITR 651 (SC)",
    court: "Supreme Court",
    year: 1967,
    category: "Capital Gains",
    section1961: "Sections 48 & 55",
    section2025: "Sections 72 & 90",
    sectionTopic:
      "Mode of computation; meaning of cost of acquisition and improvement",
    issue:
      "On sale of a rights entitlement, may the shareholder deduct the fall in value of the original shares caused by the rights issue in computing the gain?",
    held:
      "Yes. The rights entitlement comes into existence at the cost of a depreciation in the value of the original holding, and that diminution is the real cost the shareholder incurred to acquire it.",
    facts:
      "The assessee held shares in a company which made a rights issue. She did not subscribe but sold her rights entitlement in the market and realised a sum. Because the rights issue diluted the company's shares, the market value of her original holding fell appreciably once the shares went ex-rights. The Revenue assessed the whole of the sale proceeds of the rights entitlement as a capital gain, on the footing that the entitlement had cost her nothing. She contended that it had cost her the fall in value of the shares she already held.",
    proceduralHistory:
      "The assessment was upheld through the appellate stages and the High Court answered the reference against her. She appealed to the Supreme Court.",
    contentions: {
      assessee:
        "The rights entitlement did not arrive free. It came into being by diminishing the value of the existing holding, the total value of the holding plus the entitlement immediately after the issue being no more than the value of the holding before it. The depreciation in the original shares is therefore the price paid for the entitlement and must be brought into the computation.",
      revenue:
        "The assessee paid nothing for the entitlement, which accrued to her by virtue of her existing shareholding. A notional fall in the market value of shares she continued to hold is not expenditure and cannot be deducted; she may realise that value if and when she sells those shares.",
    },
    summary:
      "The Court approached the question by asking what the shareholder had actually given up in order to obtain the thing she sold. It observed that immediately before the rights issue her holding had a certain market value, and immediately afterwards the shares stood at a lower quotation precisely because of the dilution the issue caused. The entitlement she was able to sell was carved out of the value that had previously resided in her shares. In a commercial sense, therefore, she acquired the entitlement at the cost of that depreciation, and the computation must reflect it if the exercise is to capture her real gain rather than an inflated figure. The Court held that the diminution in the value of the original shares, measured by the difference in quotation before and after the shares went ex-rights, is to be deducted in computing the gain on the sale of the rights entitlement. Any other approach would tax as profit an amount that was matched by a real fall in the value of what she continued to hold.",
    principles: [
      "A rights entitlement is acquired at the cost of the depreciation it causes in the original holding.",
      "The fall in market value of the existing shares on going ex-rights is deductible in computing the gain on the entitlement.",
      "The computation must capture the real commercial gain rather than an inflated figure.",
      "Cost of acquisition is not confined to a cash outlay.",
    ],
    relevance:
      "Cost of acquisition is dealt with in Section 90 of the IT Act 2025, which prescribes specific rules for rights entitlements and bonus shares. Those provisions now largely govern the computation, so the outcome should be checked against them. The reasoning retains value wherever a new asset is carved out of an existing holding and the statute leaves the cost to be determined on general principles.",
    keywords: [
      "rights entitlement",
      "renunciation",
      "cost of acquisition",
      "ex-rights",
      "dilution",
      "real gain",
      "bonus shares",
    ],
  },
  {
    slug: "grace-collis",
    caseName: "CIT v. Grace Collis",
    citation: "(2001) 248 ITR 323 (SC)",
    court: "Supreme Court",
    year: 2001,
    category: "Capital Gains",
    section1961: "Sections 2(47) & 45",
    section2025: "Section 2 (definition of transfer); Section 67",
    sectionTopic: "Meaning of transfer; capital gains — charging section",
    issue:
      "Does the extinguishment of rights in a capital asset amount to a transfer only where it accompanies a transfer of the asset to someone else, or is extinguishment an independent head?",
    held:
      "Extinguishment is an independent limb. Rights in a capital asset may be extinguished without any corresponding transfer to another person, and such extinguishment is itself a transfer for capital gains purposes.",
    facts:
      "Shareholders held shares in a company which amalgamated with another. On the amalgamation taking effect, the amalgamating company ceased to exist and the shares held in it were extinguished, the shareholders receiving shares in the amalgamated company. The question was whether the extinguishment of the original shareholding constituted a transfer, an earlier line of authority having suggested that extinguishment counted only where it was accompanied by a transfer of the asset to another party.",
    proceduralHistory:
      "The matter came before the Supreme Court, which reconsidered the narrower reading of the extinguishment limb adopted in an earlier decision and departed from it.",
    contentions: {
      assessee:
        "On the earlier view, extinguishment qualifies only where rights pass to another person; here the shares in the amalgamating company simply ceased to exist on its dissolution, with nothing passing to anyone, so there was no transfer and no chargeable gain.",
      revenue:
        "The definition lists sale, exchange, relinquishment and the extinguishment of any rights as separate limbs. Reading extinguishment as requiring a correlative transfer would make the limb redundant, since a transfer to another is already covered by the earlier words.",
    },
    summary:
      "The Court examined the structure of the definition and held that its several limbs are disjunctive. Sale, exchange and relinquishment each involve the asset or rights in it passing to another. If the extinguishment limb were also confined to cases where rights pass, it would add nothing to what precedes it, and a construction rendering statutory words superfluous is to be avoided. The Court therefore held that the extinguishment of any rights in a capital asset is an independent limb, which may be satisfied whether or not there is a corresponding acquisition by anyone else. To the extent that an earlier decision had held that extinguishment must be accompanied by a transfer of the asset to another person, the Court held that view to be erroneous. Applying that construction, the shares in the amalgamating company were extinguished on amalgamation, and that extinguishment was a transfer within the definition.",
    principles: [
      "The limbs of the definition of transfer are disjunctive and each must be given independent meaning.",
      "Extinguishment of rights in a capital asset is a transfer whether or not anyone else acquires them.",
      "A construction rendering statutory words superfluous is to be avoided.",
      "Extinguishment of shares on amalgamation falls within the definition.",
    ],
    relevance:
      "The extinguishment limb carries into the definition of transfer under the IT Act 2025, with the charge in Section 67. It underpins the treatment of amalgamations, reduction of share capital, surrender of rights, and the buyback analysis. Note that exemptions for qualifying amalgamations operate separately — establishing that a transfer occurred is the first step, not the last.",
    keywords: [
      "extinguishment of rights",
      "transfer",
      "amalgamation",
      "disjunctive limbs",
      "reduction of capital",
      "surrender",
    ],
  },
  {
    slug: "vania-silk-mills",
    caseName: "Vania Silk Mills (P) Ltd v. CIT",
    citation: "(1991) 191 ITR 647 (SC)",
    court: "Supreme Court",
    year: 1991,
    category: "Capital Gains",
    section1961: "Sections 2(47) & 45",
    section2025: "Section 2 (definition of transfer); Section 67",
    sectionTopic: "Meaning of transfer; capital gains — charging section",
    issue:
      "Where an asset is destroyed and the owner receives insurance money, does the destruction amount to a transfer giving rise to capital gains?",
    held:
      "No, on the law as it then stood. Destruction of an asset is not a transfer; the asset ceases to exist rather than passing to anyone, and insurance money is paid under the policy rather than as consideration for a transfer.",
    facts:
      "Machinery belonging to the assessee was destroyed by fire. The insurer paid a sum under the policy which exceeded the written down value of the machinery. The Revenue treated the receipt as consideration arising from a transfer of the asset and assessed the excess as a capital gain, reasoning that the owner's rights in the machinery had been extinguished and money had been received in their place.",
    proceduralHistory:
      "The matter reached the Supreme Court, where the scope of the extinguishment limb of the definition of transfer fell for consideration in the context of destruction of an asset.",
    contentions: {
      assessee:
        "A transfer contemplates the asset passing from one person to another. Where property is destroyed, nothing passes; it simply ceases to exist. The insurance money is paid under a contract of indemnity because the insured event occurred, not as the price of the asset.",
      revenue:
        "The owner's rights in the machinery were extinguished by the fire, and extinguishment of rights falls within the definition of transfer. Money was received in consequence, and the excess over written down value represents a gain.",
    },
    summary:
      "The Court held that the extinguishment contemplated by the definition is extinguishment that results from a transfer — that is, where rights come to an end because the asset or rights in it pass to another. Destruction of an asset is different in kind: the subject matter ceases to exist altogether and no person acquires anything. The Court reasoned that the words defining transfer, read as a whole, are concerned with transactions by which property moves between persons, and that an event such as fire is not a transaction at all. As to the insurance money, it held that the payment is made because the contingency insured against occurred and is measured by the indemnity the policy provides; it is not consideration for parting with the asset, there being no counterparty acquiring it. The receipt accordingly fell outside the charge.",
    principles: [
      "Transfer contemplates property passing between persons; destruction involves nothing passing.",
      "The extinguishment limb, in this view, addresses extinguishment resulting from a transfer.",
      "Insurance money is paid under the contract of indemnity, not as consideration for the asset.",
      "An event such as fire is not a transaction within the definition of transfer.",
    ],
    relevance:
      "The outcome was specifically reversed by Parliament, which introduced a provision deeming money or assets received from an insurer on damage or destruction to give rise to capital gains in the year of receipt. That deeming treatment continues under the IT Act 2025, so an insurance receipt on destruction is chargeable today. Read Vania Silk Mills as the reason that provision exists, and for its analysis of the extinguishment limb, which Grace Collis later revisited.",
    keywords: [
      "destruction of asset",
      "insurance claim",
      "extinguishment",
      "transfer",
      "indemnity",
      "45(1A)",
      "legislative reversal",
    ],
  },
  {
    slug: "jupiter-capital-reduction",
    caseName: "PCIT v. Jupiter Capital Pvt Ltd",
    citation: "(2025) 302 Taxman 3 (SC)",
    court: "Supreme Court",
    year: 2025,
    category: "Capital Gains",
    section1961: "Sections 2(47) & 45",
    section2025: "Section 2 (definition of transfer); Section 67",
    sectionTopic: "Meaning of transfer; capital gains — charging section",
    issue:
      "Does a reduction of share capital, under which the number of shares held is cut down while the shareholder's proportionate interest is unchanged, amount to a transfer?",
    held:
      "Yes. Reduction of capital extinguishes the shareholder's rights in the shares cancelled, and that extinguishment is a transfer. The resulting loss is a capital loss available for set off.",
    facts:
      "The assessee held shares in a company which carried out a reduction of its share capital sanctioned by the court. The number of shares held by the assessee was reduced substantially, with consideration paid on the cancelled shares, although the assessee's percentage shareholding in the company remained the same because the reduction applied across the board. The assessee claimed a capital loss, being the difference between the cost of the cancelled shares and the amount received. The Revenue disallowed the claim, contending that since the proportionate holding was unchanged, nothing had in substance been transferred.",
    proceduralHistory:
      "The Tribunal and the High Court allowed the assessee's claim, holding that a reduction of capital extinguishes rights and is therefore a transfer. The Revenue appealed to the Supreme Court, which affirmed.",
    contentions: {
      assessee:
        "On reduction, the shares cancelled cease to exist and all rights attaching to them are extinguished. Extinguishment of rights in a capital asset is expressly a transfer, and the loss suffered on the cancelled shares is a capital loss. That the percentage holding is unchanged is immaterial, because the asset transferred is the shares themselves, not a percentage.",
      revenue:
        "Because the reduction applied uniformly, the assessee's proportionate stake in the company was exactly what it had been before. Nothing of substance changed hands and no real loss was suffered; permitting a loss on a transaction that leaves the shareholder in the same relative position would create an artificial deduction.",
    },
    summary:
      "The Court held that a reduction of share capital involves the extinguishment of the rights attached to the shares that are cancelled, and that extinguishment is expressly within the definition of transfer. It reasoned that the capital asset in question is the shares held, and when a portion of them is cancelled the holder's rights in those shares come to an end; the fact that the reduction is proportionate across all shareholders does not alter that. The Court declined to treat an unchanged percentage interest as decisive, observing that a shareholder's rights are embodied in the shares held and that cancelling shares necessarily destroys rights that previously existed. Having held that a transfer occurred, it followed that the difference between the cost of the cancelled shares and the consideration received was a capital loss, which the assessee was entitled to carry forward and set off in the ordinary way.",
    principles: [
      "Reduction of share capital extinguishes rights in the cancelled shares and is a transfer.",
      "An unchanged proportionate shareholding does not prevent a transfer from arising.",
      "The capital asset is the shares held, not the percentage interest they represent.",
      "A loss arising on reduction of capital is a capital loss available for set off.",
    ],
    relevance:
      "A recent affirmation that the extinguishment limb, established in Grace Collis, reaches capital reduction. Under the IT Act 2025 the charge is in Section 67 and the definition of transfer in Section 2. The decision matters for corporate restructurings and for loss planning, and should be read alongside the provisions treating distributions on reduction as deemed dividend to the extent of accumulated profits — the two operate on different parts of the same payment.",
    keywords: [
      "reduction of share capital",
      "extinguishment",
      "capital loss",
      "proportionate shareholding",
      "restructuring",
      "deemed dividend",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // BUSINESS & PROFESSION — further judgments
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "empire-jute-loom-hours",
    caseName: "Empire Jute Co Ltd v. CIT",
    citation: "(1980) 124 ITR 1 (SC)",
    court: "Supreme Court",
    year: 1980,
    category: "Business & Profession",
    section1961: "Section 37(1)",
    section2025: "Section 34",
    sectionTopic:
      "General conditions — revenue expenditure laid out wholly and exclusively for business",
    issue:
      "Is payment made to acquire additional loom hours capital expenditure because it yields an enduring advantage, or revenue expenditure because it merely enables more profitable working?",
    held:
      "Revenue. An enduring advantage is not decisive. Where the advantage is in the revenue-earning sphere — facilitating trading operations or enabling more efficient conduct of business without touching the fixed capital — the expenditure is revenue in nature.",
    facts:
      "The assessee was a member of an association of jute mills which, to limit production, restricted the number of hours each mill could work its looms. Members were permitted to transfer their allotment of loom hours among themselves. The assessee purchased loom hours from other mills so that it could work its own looms for longer, and claimed the payment as revenue expenditure. The Revenue disallowed it as capital, reasoning that the right to work additional hours was an advantage of an enduring nature which augmented the assessee's profit-making apparatus.",
    proceduralHistory:
      "The disallowance was sustained through the appellate stages and by the High Court, which applied the enduring benefit test. The assessee appealed to the Supreme Court.",
    contentions: {
      assessee:
        "No new asset was acquired and the fixed capital was untouched — the number of looms remained the same. What was bought was the ability to operate the existing plant more intensively for a period, which goes to the profitability of trading operations and is therefore on revenue account.",
      revenue:
        "The right to work additional loom hours enhanced the assessee's productive capacity and conferred a benefit that endured beyond the year. Expenditure bringing into existence an advantage of enduring benefit to the trade is capital expenditure.",
    },
    summary:
      "Justice Bhagwati held that the enduring benefit test, though useful, is not to be applied mechanically and does not yield a universal rule. What matters is the nature of the advantage in a commercial sense. If the advantage consists of facilitating the assessee's trading operations, or enabling the management and conduct of business to be carried on more efficiently or more profitably, while leaving the fixed capital untouched, the expenditure is on revenue account even though the advantage may endure for an indefinite future. The Court drew the distinction between the profit-earning apparatus itself and the process of earning profits: expenditure that adds to or augments the former is capital, while expenditure that merely improves the latter is revenue. On the facts, the loom hours purchased did not add to the assessee's plant or fixed capital; the number of looms was unchanged, and all that was obtained was the right to operate them for longer during a limited period. The advantage therefore lay in the revenue field, and the payment was deductible.",
    principles: [
      "The enduring benefit test is not decisive and must not be applied mechanically.",
      "Expenditure facilitating trading operations or enabling more efficient conduct of business is revenue, even if the advantage endures.",
      "The distinction is between augmenting the profit-earning apparatus (capital) and improving the process of earning profits (revenue).",
      "Expenditure leaving the fixed capital untouched points towards revenue treatment.",
    ],
    relevance:
      "The leading Indian authority on the capital–revenue divide, applied under Section 34 of the IT Act 2025 and cited across the whole field of business deductions. It governs recurring modern questions — software licences, market access payments, non-compete fees, and spectrum or franchise charges — wherever the Revenue relies on enduring benefit alone to characterise a payment as capital.",
    keywords: [
      "capital versus revenue",
      "enduring benefit",
      "profit earning apparatus",
      "loom hours",
      "fixed capital",
      "business efficiency",
    ],
  },
  {
    slug: "madras-industrial-debenture-discount",
    caseName: "Madras Industrial Investment Corporation Ltd v. CIT",
    citation: "(1997) 225 ITR 802 (SC)",
    court: "Supreme Court",
    year: 1997,
    category: "Business & Profession",
    section1961: "Sections 37(1) & 145",
    section2025: "Sections 34 & 272",
    sectionTopic:
      "General conditions for revenue expenditure; method of accounting",
    issue:
      "Where debentures are issued at a discount, is the whole discount deductible in the year of issue, or must it be spread over the life of the debentures?",
    held:
      "It must be spread. The discount is the price of obtaining the use of money over the debenture's term, so the liability is to be allocated over that period rather than deducted entirely in the year of issue.",
    facts:
      "The assessee issued debentures at a discount to face value, receiving less than the amount it would ultimately have to repay. It claimed the entire discount as a deduction in the year of issue, treating it as expenditure incurred in raising the loan. The Revenue took the view that the discount represented a cost of borrowing referable to the whole term of the debentures and allowed only the proportion relating to the year in question.",
    proceduralHistory:
      "The dispute proceeded through the appellate stages to the High Court, which upheld the spreading. The assessee appealed to the Supreme Court.",
    contentions: {
      assessee:
        "The liability to pay the discount arose in the year of issue, when the debentures were allotted at less than face value. Ordinarily a liability is deductible in the year it is incurred, and there is no provision requiring the deduction to be deferred or apportioned across future years.",
      revenue:
        "The discount is in substance additional interest, being the consideration for having the use of the money for the debenture's term. Allowing the whole of it in the first year would distort the profits of that year and of the years that follow, each of which enjoys the benefit of the borrowing.",
    },
    summary:
      "The Court accepted that the liability had been incurred in the year of issue, but held that the year in which a liability is incurred does not invariably determine the year of deduction. Where an expenditure is incurred for the purpose of securing a benefit that is spread over a number of years, it may properly be spread over those years. It characterised the discount as the cost of obtaining the use of the borrowed funds, no different in substance from interest: a company that issues at a discount pays for the loan in that form rather than by a higher coupon. Since the benefit of the borrowing extends over the whole term of the debentures, matching the cost to that period gives a truer picture of the profits of each year. The Court held that the assessee was entitled to deduct a proportionate part of the discount in each year over which the liability was spread, and it noted that the assessee had itself written off the discount over the term in its books, which was consistent with the commercial reality of the transaction.",
    principles: [
      "The year in which a liability is incurred does not always determine the year of deduction.",
      "Expenditure securing a benefit spread over several years may be allocated across those years.",
      "Discount on debentures is in substance the cost of obtaining the use of money over the term.",
      "Matching the cost to the period benefited gives a truer picture of each year's profits.",
    ],
    relevance:
      "Applied under Section 34 of the IT Act 2025, with the method of accounting governed by Section 272. The matching approach it endorses is routinely applied to upfront borrowing costs, premium on redemption, and lease premia. It should be read alongside Taparia Tools, which confirms that spreading is not compulsory where the assessee has actually paid the sum and claims it in that year.",
    keywords: [
      "debenture discount",
      "deferred revenue expenditure",
      "matching principle",
      "spreading",
      "borrowing cost",
      "year of deduction",
    ],
  },
  {
    slug: "taparia-tools",
    caseName: "Taparia Tools Ltd v. JCIT",
    citation: "(2015) 372 ITR 605 (SC)",
    court: "Supreme Court",
    year: 2015,
    category: "Business & Profession",
    section1961: "Sections 36(1)(iii) & 37(1)",
    section2025: "Sections 32 & 34",
    sectionTopic:
      "Other specified deductions allowable; general conditions for revenue expenditure",
    issue:
      "Where a taxpayer actually pays upfront the entire interest on a debenture issue, must the deduction nonetheless be spread over the debenture's term because the books show it being amortised?",
    held:
      "No. Where the liability has been incurred and the sum actually paid in the year, the whole of it is deductible in that year. The treatment adopted in the books does not govern, and there is no concept of deferred revenue expenditure in the Act absent a specific provision.",
    facts:
      "The assessee issued debentures and offered subscribers a choice: receive interest periodically over the term, or take a discounted lump sum of the entire interest upfront. Some subscribers chose the upfront option and were paid accordingly during the year. In its books, the assessee amortised that upfront payment over the life of the debentures, but in its return it claimed the whole amount as a deduction in the year of payment. The Revenue allowed only the proportion charged in the books, relying on the assessee's own accounting treatment and on the spreading approach.",
    proceduralHistory:
      "The disallowance was upheld by the Tribunal and the Bombay High Court, which considered that the assessee's own amortisation in the books reflected the correct position. The assessee appealed to the Supreme Court.",
    contentions: {
      assessee:
        "The liability to pay the interest arose and was discharged entirely in the year in question; nothing remained outstanding. Under the mercantile system a liability incurred and paid is deductible in that year. Entries in the books do not create or destroy a right to a deduction, which depends on the provisions of the Act.",
      revenue:
        "The assessee itself treated the payment as relating to future years by spreading it in its accounts, and consistency requires the same treatment for tax. Allowing the whole in one year distorts the profits of that year and departs from the matching approach approved in Madras Industrial.",
    },
    summary:
      "The Court held that the entries an assessee makes in its books are not determinative of its entitlement to a deduction; the question is governed by the provisions of the Act applied to the facts. Where the liability has been definitely incurred and the sum has actually been paid in the relevant year, the ordinary rule is that the deduction is allowable in that year in full. The Court distinguished Madras Industrial on an important footing: there the assessee had itself claimed the deduction over the term and the issue was whether spreading was permissible, whereas here the assessee had paid the entire amount and claimed it in the year of payment. It held that Madras Industrial gives the assessee an option to spread where the expenditure relates to future years, but does not compel spreading where the sum has been paid outright. The Court emphasised that there is no general concept of deferred revenue expenditure in the Act, and that in the absence of a specific provision requiring deferral, an actual payment discharging an incurred liability is deductible when made.",
    principles: [
      "Book entries do not determine entitlement to a deduction; the Act and the facts govern.",
      "A liability definitely incurred and actually paid in the year is deductible in full in that year.",
      "Spreading under Madras Industrial is an option available to the assessee, not a compulsion.",
      "There is no general concept of deferred revenue expenditure in the Act absent a specific provision.",
    ],
    relevance:
      "Applied under Sections 32 and 34 of the IT Act 2025. Read with Madras Industrial it produces a workable rule: an assessee that has actually paid may claim in full in the year of payment, while an assessee that has incurred a liability relating to future years may spread it. The rejection of book entries as determinative is relied on far beyond this context, including in disputes over provisions and accounting standards.",
    keywords: [
      "upfront interest",
      "deferred revenue expenditure",
      "book entries",
      "matching",
      "debentures",
      "actual payment",
      "mercantile system",
    ],
  },
  {
    slug: "woodward-governor",
    caseName: "CIT v. Woodward Governor India (P) Ltd",
    citation: "(2009) 312 ITR 254 (SC)",
    court: "Supreme Court",
    year: 2009,
    category: "Business & Profession",
    section1961: "Sections 37(1) & 43A",
    section2025: "Sections 34, 42 & 43",
    sectionTopic:
      "General conditions for revenue expenditure; capitalising exchange rate changes; taxation of foreign exchange fluctuation",
    issue:
      "Is an unrealised loss arising on restating foreign currency liabilities at the year-end rate deductible, or must the loss be realised before it can be claimed?",
    held:
      "Deductible, where the liability is on revenue account. Under the mercantile system a loss arising from restating a revenue liability at the closing rate is an accrued liability, not a contingent one, and realisation is not a precondition.",
    facts:
      "The assessee had liabilities denominated in foreign currency arising from its trading operations. At the year end, in accordance with the applicable accounting standard, it restated those liabilities at the exchange rate prevailing on the balance sheet date and charged the resulting increase to the profit and loss account, claiming it as a deduction. No payment had yet been made and the loss was therefore unrealised. The Revenue disallowed the claim, characterising it as a notional or contingent loss that could be recognised only on actual payment.",
    proceduralHistory:
      "The claim was allowed by the appellate authorities and the High Court. The Revenue appealed to the Supreme Court, which considered both revenue-account liabilities and liabilities incurred for acquiring capital assets.",
    contentions: {
      assessee:
        "Under the mercantile system, a liability that has accrued is deductible whether or not it has been discharged. Once the exchange rate has moved, the rupee amount required to settle the liability has increased, and that increase is a present liability rather than a contingency. The accounting treatment follows a mandatory standard and reflects commercial reality.",
      revenue:
        "Until the liability is actually discharged, the rate may move back and no loss may ever eventuate. What is claimed is a notional figure based on a hypothetical settlement at the balance sheet date, and a deduction cannot be founded on an event that has not occurred.",
    },
    summary:
      "The Court held that the mercantile system requires expenditure and losses to be recognised when the liability arises, not when it is discharged. Where a trading liability is denominated in foreign currency and the rupee has depreciated by the balance sheet date, the amount the assessee must find in order to settle has increased; that increase is an accrued liability, and the fact that the rate might subsequently move the other way does not make it contingent. The Court examined the accounting framework, noted that restatement at the closing rate was mandated by the applicable standard, and held that where accounts are maintained on the mercantile basis in accordance with recognised standards and are not shown to present a distorted picture, the loss so recognised is allowable. It drew a firm distinction, however, between liabilities on revenue account and liabilities incurred for acquiring capital assets: for the latter, the statutory provision dealing with capitalisation of exchange differences governs and the difference adjusts the cost of the asset rather than being deducted.",
    principles: [
      "Under the mercantile system a liability is recognised when it accrues, not when it is discharged.",
      "An exchange loss on restating a revenue liability at the closing rate is accrued, not contingent.",
      "Accounts maintained on a recognised accounting standard, absent distortion, support the claim.",
      "Liabilities incurred for acquiring capital assets are governed by the capitalisation provision instead.",
    ],
    relevance:
      "The IT Act 2025 addresses this expressly: Section 43 governs the taxation of foreign exchange fluctuation gains and losses, and Section 42 the capitalisation of exchange differences on liabilities for acquiring assets, with the general deduction in Section 34. The revenue–capital distinction the Court drew remains the organising principle, and the case should be read with Tata Iron & Steel on the capital side.",
    keywords: [
      "foreign exchange loss",
      "mark to market",
      "unrealised loss",
      "mercantile system",
      "accrued liability",
      "43A",
      "accounting standard",
    ],
  },
  {
    slug: "excel-industries-real-income",
    caseName: "CIT v. Excel Industries Ltd",
    citation: "(2013) 358 ITR 295 (SC)",
    court: "Supreme Court",
    year: 2013,
    category: "Business & Profession",
    section1961: "Sections 28 & 145",
    section2025: "Sections 26 & 272",
    sectionTopic:
      "Profits and gains of business — charging section; method of accounting",
    issue:
      "Does the benefit of advance licences and duty entitlement passbook entitlements accrue as income in the year the licences are granted, or in the year they are actually used to import goods free of duty?",
    held:
      "In the year of utilisation. Income accrues only when a right to receive it becomes vested and enforceable; until the licence is used, the benefit is contingent and no real income has arisen.",
    facts:
      "The assessee exported goods and became entitled, under export promotion schemes, to advance licences and passbook credits permitting duty-free import of raw materials. The Revenue sought to tax the face value of these entitlements as income in the year the licences were granted, treating them as a benefit arising from business that had accrued on grant. The assessee recognised the benefit only in the year in which the licences were actually utilised to import materials free of duty, on the footing that until then nothing had crystallised.",
    proceduralHistory:
      "The appellate authorities and the High Court accepted the assessee's treatment, noting that the Revenue had consistently accepted the same treatment in other years. The Revenue appealed to the Supreme Court.",
    contentions: {
      assessee:
        "The entitlement is a right to import without duty at some future time. Whether any benefit is ever obtained depends on whether imports are made, whether the licence is used within its validity, and on the duty rates then prevailing. Income accrues when the right to receive becomes enforceable, which is on utilisation, not on grant.",
      revenue:
        "The licences had a market value on grant and could in principle be dealt with. A benefit arising from business is income when it arises, and deferring recognition to utilisation postpones tax without warrant.",
    },
    summary:
      "The Court applied the settled principle that income accrues when a right to receive it becomes vested, and that a mere expectation or a contingent entitlement is not income. It held that on the grant of an advance licence the assessee obtained no enforceable right to any sum; what it had was the possibility of saving duty if and when it imported materials, which depended on future trading decisions and on circumstances outside its control. Until the licence was actually used, no real income had arisen, and taxing the face value of the entitlement would be taxing a hypothetical benefit. The Court laid emphasis on the concept of real income, observing that the Act taxes income that has actually accrued and not income that may never materialise. It also relied on consistency: the Revenue had accepted the assessee's treatment over many years and there was no justification for departing from it in the years under appeal, particularly where the dispute concerned only the year of taxability and the revenue effect was neutral over time.",
    principles: [
      "Income accrues when the right to receive becomes vested and enforceable, not on a mere expectation.",
      "A contingent entitlement dependent on future events is not income.",
      "The Act taxes real income, not a hypothetical or notional benefit.",
      "Where only the year of taxability is in dispute and the effect is revenue neutral, consistency carries weight.",
    ],
    relevance:
      "Business income is charged under Section 26 of the IT Act 2025 with the method of accounting in Section 272. The real income principle it applies is invoked wherever the Revenue seeks to tax an entitlement, incentive, subsidy or credit before it has been realised, and is frequently paired with Balbir Singh Maini, which applies the same principle to capital gains.",
    keywords: [
      "real income",
      "accrual",
      "advance licence",
      "DEPB",
      "export incentive",
      "contingent right",
      "consistency",
      "year of taxability",
    ],
  },
  {
    slug: "bharat-earth-movers-leave-encashment",
    caseName: "Bharat Earth Movers v. CIT",
    citation: "(2000) 245 ITR 428 (SC)",
    court: "Supreme Court",
    year: 2000,
    category: "Business & Profession",
    section1961: "Section 37(1)",
    section2025: "Section 34",
    sectionTopic:
      "General conditions — revenue expenditure laid out wholly and exclusively for business",
    issue:
      "Is a provision for the liability to pay leave encashment to employees deductible, when the actual payment will fall due only in future years and its amount is not precisely known?",
    held:
      "Yes. A liability that has definitely arisen in the year is deductible even though it will be discharged in future and its quantification requires estimation. Only a contingent liability is excluded.",
    facts:
      "The assessee operated a leave scheme under which employees accumulated leave and were entitled to encash it, either during service or on retirement. In accordance with actuarial estimates it created a provision in its accounts for the liability accruing in respect of leave earned during the year, and claimed the provision as a deduction. The Revenue disallowed it, taking the view that no liability to pay had yet arisen, that the payment might never be made if an employee left in circumstances that forfeited the entitlement, and that the amount was in any event an estimate.",
    proceduralHistory:
      "The disallowance was confirmed through the appellate stages and by the High Court, which regarded the liability as contingent. The assessee appealed to the Supreme Court.",
    contentions: {
      assessee:
        "The entitlement to encash leave arises as the leave is earned during the year of service; the employer's obligation is therefore present, though its discharge lies in the future. Difficulty in quantifying a liability does not make it contingent, and the estimate had been made on an actuarial basis.",
      revenue:
        "Whether any payment will be made, to whom and in what amount depends on future events — continued service, the manner of cessation, and the employee's choices. A liability of that character is contingent, and a provision for it is not an expenditure incurred.",
    },
    summary:
      "The Court restated the distinction between an accrued liability and a contingent one. A liability is accrued where the obligation has definitely arisen in the year, even though it is to be discharged at a future date; it is contingent only where the very existence of the obligation depends on an event that may or may not happen. Applying that test, the Court held that the employer's obligation to pay leave encashment arises as and when the employee renders service and earns leave, because it is that service that creates the entitlement. The obligation is therefore present, and what lies in the future is only its discharge. The Court held that the need to estimate the amount does not convert an accrued liability into a contingent one: if the liability can be quantified with reasonable certainty, a provision made on a proper basis is deductible. It added that the possibility of some employees forfeiting the benefit affects the estimate rather than the existence of the liability, and can be built into the actuarial calculation.",
    principles: [
      "A liability definitely arising in the year is deductible even though discharge lies in the future.",
      "A liability is contingent only where its very existence depends on an uncertain event.",
      "Difficulty in quantification does not make an accrued liability contingent.",
      "A provision quantified with reasonable certainty on a proper basis is allowable.",
    ],
    relevance:
      "Applied under Section 34 of the IT Act 2025 and central to the treatment of provisions generally — leave encashment, warranty, and other estimated obligations. Note the important qualification: Parliament subsequently introduced a provision requiring leave encashment specifically to be allowed only on actual payment, so for that item the statutory rule now displaces the general principle. The reasoning continues to govern other provisions, as Rotork Controls illustrates.",
    keywords: [
      "provision",
      "leave encashment",
      "accrued liability",
      "contingent liability",
      "actuarial estimate",
      "43B",
      "quantification",
    ],
  },
  {
    slug: "rotork-controls-warranty",
    caseName: "Rotork Controls India (P) Ltd v. CIT",
    citation: "(2009) 314 ITR 62 (SC)",
    court: "Supreme Court",
    year: 2009,
    category: "Business & Profession",
    section1961: "Section 37(1)",
    section2025: "Section 34",
    sectionTopic:
      "General conditions — revenue expenditure laid out wholly and exclusively for business",
    issue:
      "Is a provision for warranty obligations on goods sold during the year an allowable deduction, or a contingent liability disallowable until claims are actually made?",
    held:
      "Allowable, where it is based on a reliable estimate grounded in historical experience. A warranty provision meets the recognition tests for a liability; a provision made on an ad hoc or arbitrary basis does not.",
    facts:
      "The assessee manufactured valve actuators sold with a standard warranty under which defects arising within the warranty period would be remedied free of charge. Experience showed that a proportion of units sold would require attention. The assessee made a provision each year for the estimated cost of meeting warranty obligations on the goods sold in that year, computed by reference to its actual historical experience of defect rates and repair costs, and adjusted the provision as claims materialised or lapsed. The Revenue disallowed the provision as a contingent liability, since no claim had yet been made on any particular unit.",
    proceduralHistory:
      "The disallowance was upheld by the High Court. The assessee appealed to the Supreme Court, which examined the accounting recognition criteria for provisions and their application in tax.",
    contentions: {
      assessee:
        "The obligation arises on the sale itself, because the warranty is part of the bargain and the price charged reflects it. Recognising the associated cost in the same year matches expense to revenue. The provision is not arbitrary: it is derived from actual defect experience and is trued up against outcomes.",
      revenue:
        "Until a customer makes a claim there is no liability to anyone in any amount. The provision is an estimate of something that may never occur in respect of any given unit, and a deduction cannot be granted for a liability that is contingent on a future event.",
    },
    summary:
      "The Court adopted the recognition tests for a provision: there must be a present obligation arising from a past event, a probable outflow of resources to settle it, and a reliable estimate of the amount. Applying them, it held that the sale of a product carrying a warranty is the past event, and the obligation to rectify defects arises on that sale rather than when a customer complains. Where historical data establish that a proportion of units will require attention, an outflow is probable even though it cannot be attributed to identified units in advance. The Court held that a provision computed on that footing satisfies the third test and is deductible. It emphasised that the quality of the estimate is decisive: a provision built on a sensible basis, derived from actual experience of defect rates and costs and reversed or adjusted as outcomes become known, is allowable, whereas one made on an ad hoc percentage without historical support is not. It also noted that where excess provisions are reversed and offered to tax in later years, the revenue effect over time is neutral.",
    principles: [
      "A provision requires a present obligation from a past event, a probable outflow, and a reliable estimate.",
      "The sale of goods under warranty is the past event creating the obligation.",
      "Probability is assessed across the population of goods sold, not unit by unit.",
      "A provision grounded in historical experience and trued up against outcomes is allowable; an ad hoc provision is not.",
    ],
    relevance:
      "Applied under Section 34 of the IT Act 2025 and the leading authority on provisions for warranty, product support, service obligations and similar estimated liabilities. The practical lesson is evidential: the deduction turns on the documentation supporting the estimate, so defect history, the basis of computation and the reversal workings should be capable of production.",
    keywords: [
      "warranty provision",
      "present obligation",
      "reliable estimate",
      "historical experience",
      "contingent liability",
      "matching",
      "reversal",
    ],
  },
  {
    slug: "alom-extrusions-43b",
    caseName: "CIT v. Alom Extrusions Ltd",
    citation: "(2009) 319 ITR 306 (SC)",
    court: "Supreme Court",
    year: 2009,
    category: "Business & Profession",
    section1961: "Section 43B",
    section2025: "Section 37",
    sectionTopic: "Deductions allowed only on actual payment",
    issue:
      "Where the employer's contribution to provident fund is paid after the statutory due date but before the return is filed, is the deduction allowable — and does the amendment removing the earlier restriction operate retrospectively?",
    held:
      "Yes to both. The employer's contribution is deductible if paid by the return due date, and the amendment deleting the restrictive proviso is curative and applies retrospectively.",
    facts:
      "The assessee paid its own contributions to provident fund and similar welfare funds after the due dates prescribed under the relevant welfare legislation, but before the due date for filing its income tax return. Under the provision as originally enacted, a second proviso had required such contributions to be paid by the due date under the welfare statute, and only other categories of payment enjoyed the relaxation allowing payment up to the return due date. That second proviso was subsequently deleted, placing employer contributions on the same footing as other payments. The question was whether the deletion applied to earlier years.",
    proceduralHistory:
      "High Courts had divided on the retrospectivity of the deletion. The Supreme Court took up the question to settle the position.",
    contentions: {
      assessee:
        "The deletion of the restrictive proviso removed an anomaly under which employers' welfare contributions were treated worse than taxes, duties and other statutory dues. An amendment that cures a defect and removes unintended hardship is curative in nature and should be read as operating from the inception of the provision.",
      revenue:
        "The amendment was expressed to take effect from a specified date, and a fiscal provision is presumed to operate prospectively. Applying it to earlier years would reopen concluded positions and confer a benefit Parliament did not extend to those years.",
    },
    summary:
      "The Court examined the legislative history and the purpose of the provision, which was to ensure that statutory dues were actually paid rather than merely provided for, while allowing a reasonable window running to the filing of the return. It found that the original scheme created an unintended discrimination: employers who paid their welfare fund contributions shortly after the welfare statute's due date but well before filing lost the deduction permanently, whereas the same delay in paying taxes or duties was forgiven. The deletion of the second proviso removed that discrimination and brought employer contributions into line with other categories. The Court held that an amendment of this character is curative — it remedies an unintended consequence rather than conferring a new benefit — and that such amendments are to be read as operating retrospectively from the date the provision was introduced. It followed that the employer's contributions paid before the return due date were deductible in the earlier years as well.",
    principles: [
      "The purpose of the provision is to secure actual payment, with a window running to the return due date.",
      "Employer contributions to welfare funds are deductible if paid by the return due date.",
      "An amendment removing an unintended discrimination is curative in nature.",
      "A curative amendment operates retrospectively from the inception of the provision it corrects.",
    ],
    relevance:
      "Carried into Section 37 of the IT Act 2025, which retains the actual-payment rule. Read this case strictly alongside Checkmate Services: Alom Extrusions concerns the employer's own contribution and permits payment up to the return due date, while Checkmate holds that the employees' contribution is different in character and must reach the fund by the welfare statute's deadline. Conflating the two is the most common error in this area.",
    keywords: [
      "43B",
      "employer contribution",
      "provident fund",
      "return due date",
      "curative amendment",
      "retrospective",
      "second proviso",
    ],
  },
  {
    slug: "sa-builders-commercial-expediency",
    caseName: "S.A. Builders Ltd v. CIT (Appeals)",
    citation: "(2007) 288 ITR 1 (SC)",
    court: "Supreme Court",
    year: 2007,
    category: "Business & Profession",
    section1961: "Section 36(1)(iii)",
    section2025: "Section 32",
    sectionTopic: "Other specified deductions allowable — interest on borrowed capital",
    issue:
      "Where a company borrows at interest and advances funds interest-free to its subsidiary, is the interest on the borrowing deductible?",
    held:
      "Yes, if the advance was made as a measure of commercial expediency. The test is whether the funds were advanced for the assessee's own business purposes, not whether the assessee earned a direct return.",
    facts:
      "The assessee had borrowed money on which it paid interest, and in the same period advanced sums to its subsidiary company without charging interest. The Assessing Officer disallowed a proportion of the interest on the borrowings, reasoning that to the extent borrowed funds had been diverted to an interest-free advance, the interest could not be said to have been incurred for the purposes of the assessee's business. The assessee maintained that the subsidiary's operations were closely connected with its own and that supporting it served its business interests.",
    proceduralHistory:
      "The disallowance was sustained by the appellate authorities and the High Court, which considered that an interest-free advance could not be for the purposes of the lender's business. The assessee appealed to the Supreme Court.",
    contentions: {
      assessee:
        "The expression 'for the purposes of business' is wider than earning income directly from the sum advanced. Assistance to a subsidiary whose activities support or complement the assessee's own business is a legitimate business purpose, and it is for the businessman to judge what his interests require.",
      revenue:
        "Interest is deductible where capital is borrowed for the purposes of business. Money lent on without charge produces nothing for the lender, so the borrowing to that extent cannot be said to serve the business, and the interest must be apportioned and disallowed.",
    },
    summary:
      "The Court held that the correct question is not whether the assessee earned a return on the amount advanced, but whether the advance was made as a measure of commercial expediency — an expression covering expenditure a prudent businessman incurs for the purposes of the business, even though not under legal compulsion and even though no immediate return results. Where a holding company advances funds to a subsidiary for the subsidiary's business, and there is a nexus between that assistance and the holding company's own business interests, the interest on borrowings deployed for that purpose is deductible. The Court cautioned that the mere existence of a subsidiary relationship is not enough: the Revenue and the appellate authorities must examine whether the advance genuinely served the assessee's business, and an advance made for the personal benefit of directors or for purposes unconnected with the business would stand on a different footing. It remitted the matter for that enquiry to be made on the facts.",
    principles: [
      "Interest is deductible where borrowed capital is used for the purposes of the business.",
      "'For the purposes of business' is wider than directly earning income from the sum advanced.",
      "Commercial expediency covers what a prudent businessman does for the business, without legal compulsion or immediate return.",
      "A nexus between the advance and the assessee's own business must be established on the facts.",
      "An advance for personal benefit or unconnected purposes is not protected.",
    ],
    relevance:
      "Applied under Section 32 of the IT Act 2025. The leading authority on interest-free advances within groups, and the standard answer to proportionate interest disallowances. It should be read with South Indian Bank, which supplies the complementary presumption that investments are made from own funds where those exceed the advances — together they cover most interest disallowance disputes.",
    keywords: [
      "interest on borrowed capital",
      "commercial expediency",
      "interest free advance",
      "subsidiary",
      "36(1)(iii)",
      "nexus",
      "proportionate disallowance",
    ],
  },
  {
    slug: "malayalam-plantations",
    caseName: "CIT v. Malayalam Plantations Ltd",
    citation: "(1964) 53 ITR 140 (SC)",
    court: "Supreme Court",
    year: 1964,
    category: "Business & Profession",
    section1961: "Section 37(1)",
    section2025: "Section 34",
    sectionTopic:
      "General conditions — revenue expenditure laid out wholly and exclusively for business",
    issue:
      "How wide is the expression 'for the purpose of the business' — is it confined to expenditure incurred in earning profits?",
    held:
      "It is wider. The expression covers not merely the earning of profits but the many acts incidental to carrying on a business, including protecting and preserving it, provided the expenditure is not of a personal or capital character.",
    facts:
      "The assessee company, which carried on plantation business in India, paid estate duty arising on the death of non-resident shareholders in respect of shares they held in the company. Under the governing legislation the company was liable to pay that duty. It claimed the payment as a deduction in computing its business profits. The Revenue disallowed it on the footing that the liability arose from the death of shareholders and had nothing to do with earning the company's profits.",
    proceduralHistory:
      "The matter came before the Supreme Court, which took the opportunity to expound the scope of the phrase 'for the purpose of the business' in the general deduction provision.",
    contentions: {
      assessee:
        "The company was under a statutory obligation to make the payment by reason of its own position, and discharging a liability imposed on it in its character as a company carrying on business is expenditure for the purposes of that business. The phrase is not limited to outlays that directly generate receipts.",
      revenue:
        "The duty was occasioned by the death of shareholders and related to their estates, not to the company's trading. An expenditure must have some connection with the earning of profits before it can be deducted in computing them.",
    },
    summary:
      "The Court held that the expression 'for the purpose of the business' is wider in scope than the expression 'for the purpose of earning profits'. It comprehends many acts incidental to the carrying on of a business: the payment of statutory dues and taxes imposed as a precondition of trading, the protection and preservation of the assets and the business itself, the discharge of obligations imposed by law on the trader in that capacity, and expenditure incurred in the ordinary course by a prudent businessman for the advantage of the business. The Court cautioned that the range is not unlimited — the expenditure must be incurred in the assessee's capacity as a person carrying on the business, must not be personal, and must not be capital in nature. Applying that test, it examined whether the estate duty had been paid by the company in its character as a trader or in some other capacity, and held that a payment which the company was obliged to make by reason of the shareholding of deceased members did not satisfy the requirement. The principle it laid down, however, has proved far more significant than the outcome on the facts.",
    principles: [
      "'For the purpose of the business' is wider than 'for the purpose of earning profits'.",
      "It covers acts incidental to carrying on the business, including protecting and preserving it.",
      "Statutory obligations imposed on the trader in that capacity may qualify.",
      "The expenditure must not be personal or capital in nature, and must arise in the trading capacity.",
    ],
    relevance:
      "One of the foundational statements on the general deduction provision, now Section 34 of the IT Act 2025. It is cited wherever the Revenue argues that an expenditure has no direct link to revenue — litigation costs, regulatory penalties and settlements, business protection expenditure, and group support costs. Read with S.A. Builders on commercial expediency and Empire Jute on the capital–revenue divide, it forms the core framework for business deductions.",
    keywords: [
      "purpose of business",
      "wholly and exclusively",
      "incidental to business",
      "protection of business",
      "statutory liability",
      "general deduction",
    ],
  },
  {
    slug: "godrej-boyce-14a",
    caseName: "Godrej & Boyce Manufacturing Co Ltd v. DCIT",
    citation: "(2017) 394 ITR 449 (SC)",
    court: "Supreme Court",
    year: 2017,
    category: "Business & Profession",
    section1961: "Section 14A",
    section2025: "Section 14",
    sectionTopic: "Heads of income; expenditure relating to exempt income",
    issue:
      "Does the disallowance for expenditure relating to exempt income apply to dividends on which the company has already paid distribution tax, and from when does the prescribed computation method operate?",
    held:
      "The disallowance applies, because the dividend is exempt in the shareholder's hands whatever tax the company has paid. The prescribed method operates prospectively, and before it the Assessing Officer must determine the disallowance on a reasonable basis.",
    facts:
      "The assessee received dividend income which was exempt in its hands, the distributing companies having paid dividend distribution tax. It contended that no disallowance of related expenditure should be made because the income had already borne tax at the company level, so it was not truly exempt in an economic sense. A second question concerned the years before the prescribed computation method was notified, and whether that method could be applied to them.",
    proceduralHistory:
      "The Bombay High Court decided the principal question against the assessee while holding the prescribed method to be prospective. The matter came before the Supreme Court on appeal.",
    contentions: {
      assessee:
        "Dividend distribution tax is a charge on the same income, collected at the company's end for administrative convenience. To disallow expenditure on the footing that the dividend is exempt, when tax has in fact been paid on it, produces double taxation in substance. In any event the prescribed formula cannot be applied to years before it was brought into force.",
      revenue:
        "The statute exempts the dividend in the shareholder's hands, and the disallowance is triggered by that exemption. The incidence of distribution tax on the company is a separate charge on a different person and does not alter the character of the receipt in the recipient's hands.",
    },
    summary:
      "The Court held that the disallowance turns on whether the income does not form part of the total income of the assessee, and dividend income falling within the exemption satisfies that test regardless of the distribution tax borne by the company. The charge on the distributing company is a distinct levy on a different taxable person; it does not convert an exempt receipt in the shareholder's hands into a taxable one, and the argument based on economic double taxation could not displace the statutory language. On the second question, the Court confirmed that the prescribed computation method operates prospectively from the date it was brought into force and cannot be applied to earlier years. For those earlier years the Assessing Officer must determine the amount of expenditure relatable to exempt income on a reasonable basis, having regard to the accounts, and must record reasons for rejecting the assessee's own computation before doing so. The Court reiterated that the disallowance cannot exceed what is genuinely relatable to the exempt income.",
    principles: [
      "The disallowance applies wherever the income does not form part of the assessee's total income.",
      "Dividend distribution tax paid by the company does not make the dividend taxable in the shareholder's hands.",
      "The prescribed computation method operates prospectively from its introduction.",
      "For earlier years the disallowance must be determined on a reasonable basis with recorded reasons.",
    ],
    relevance:
      "The disallowance now sits in Section 14 of the IT Act 2025. Note that the dividend regime has since changed fundamentally — dividends are taxable in the shareholder's hands rather than subjected to distribution tax — so the specific controversy is largely spent for current years. The case remains important for older assessments and for its insistence that any disallowance be confined to expenditure genuinely relatable to exempt income, read with Maxopp and South Indian Bank.",
    keywords: [
      "section 14A",
      "dividend distribution tax",
      "exempt income",
      "Rule 8D prospective",
      "reasonable basis",
      "recorded reasons",
      "double taxation",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TDS & TCS — further judgments
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "hindustan-coca-cola-beverage",
    caseName: "Hindustan Coca Cola Beverage (P) Ltd v. CIT",
    citation: "(2007) 293 ITR 226 (SC)",
    court: "Supreme Court",
    year: 2007,
    category: "TDS & TCS",
    section1961: "Sections 194-I & 201",
    section2025: "Sections 393 & 399",
    sectionTopic:
      "TDS on specified payments; consequences of failure to deduct or pay",
    issue:
      "Where a payer fails to deduct tax at source but the recipient has already paid tax on that income, can the tax again be recovered from the payer?",
    held:
      "No. Once the recipient has discharged the tax on the income, the same tax cannot be collected a second time from the deductor. The deductor remains liable for interest for the period of default and for any penalty.",
    facts:
      "The assessee had made payments in respect of the use of warehousing facilities. It treated the arrangement as one for services and deducted tax at the lower rate applicable to contractual payments rather than the higher rate applicable to rent. The Assessing Officer held that the payments were rent, treated the assessee as an assessee in default for the shortfall, and raised a demand for the tax itself. The recipient had, however, already filed its return disclosing the receipts and had paid the tax due on them.",
    proceduralHistory:
      "The demand was upheld through the appellate stages. The assessee appealed to the Supreme Court, relying on a long-standing Board circular which directed that tax should not be recovered from the deductor where the recipient had paid it.",
    contentions: {
      assessee:
        "The object of the withholding machinery is to collect tax on the recipient's income. Once that tax has been paid by the recipient, the objective is fulfilled, and recovering the same amount again from the payer would collect the tax twice on a single income. The Board had itself directed as much in a circular binding on the Revenue.",
      revenue:
        "The obligation to deduct is independent, and a person who fails to comply is by statute an assessee in default in respect of the tax not deducted. The recipient's conduct in paying its own tax does not discharge the payer's separate statutory obligation.",
    },
    summary:
      "The Court accepted that the deductor's obligation is independent and that a failure to deduct attracts the consequences the statute prescribes, but held that the character of those consequences must be kept in view. The withholding machinery exists to collect, at source, tax that is ultimately due on the recipient's income. Where the recipient has filed a return and paid the tax on that very income, the sum has been collected and there is no further tax outstanding to be recovered. Permitting the Revenue to demand it again from the payer would result in the same tax being collected twice on one income, which the scheme does not contemplate. The Court relied on the Board's circular to the same effect, noting that such circulars bind the Revenue. It was careful, however, to confine the relief: the deductor is not absolved altogether. It remains liable to interest from the date the tax ought to have been deducted until the date the recipient paid, compensating the Revenue for the delay, and it remains exposed to penalty for the failure to deduct.",
    principles: [
      "The withholding machinery collects tax ultimately due on the recipient's income.",
      "Where the recipient has paid the tax, the same tax cannot be recovered again from the deductor.",
      "The deductor remains liable to interest for the period between the default and the recipient's payment.",
      "Liability to penalty for failure to deduct is unaffected.",
      "Board circulars directing this approach bind the Revenue.",
    ],
    relevance:
      "Withholding is consolidated in Section 393 of the IT Act 2025, with the consequences of default in Section 399. This remains the primary defence to a demand for tax raised on a deductor, though it requires evidence that the recipient returned the income and paid the tax — typically a certificate from the payee's accountant, which the statute now contemplates in terms. Interest exposure survives, so the relief is partial.",
    keywords: [
      "assessee in default",
      "short deduction",
      "recipient paid tax",
      "double recovery",
      "interest liability",
      "194-I",
      "CBDT circular",
    ],
  },
  {
    slug: "eli-lilly-expatriate-salary",
    caseName: "CIT v. Eli Lilly & Co (India) P Ltd",
    citation: "(2009) 312 ITR 225 (SC)",
    court: "Supreme Court",
    year: 2009,
    category: "TDS & TCS",
    section1961: "Sections 192 & 201",
    section2025: "Sections 392 & 399",
    sectionTopic:
      "TDS on salaries; consequences of failure to deduct or pay",
    issue:
      "Must an Indian entity deduct tax on salary paid abroad by a foreign parent to expatriates working in India, where no part of that salary is paid by the Indian entity itself?",
    held:
      "Yes, where the payment abroad is for services rendered in India. The withholding obligation attaches to the salary as a whole, not merely to the component routed through the Indian payroll.",
    facts:
      "The assessee was an Indian joint venture to which expatriate employees were seconded by the foreign participant. The expatriates worked wholly for the Indian entity and were paid partly in India, on which tax was duly deducted, and partly abroad by the foreign company in home currency. The Indian entity deducted tax only on the Indian component, taking the view that it could not be required to withhold on amounts it neither paid nor controlled. The Assessing Officer held it to be an assessee in default in respect of the home-country component and raised demands for tax and interest.",
    proceduralHistory:
      "The matter travelled through the appellate stages with differing outcomes and reached the Supreme Court, which considered both the extent of the obligation and the consequences where the expatriates had themselves paid tax.",
    contentions: {
      assessee:
        "The obligation to deduct arises on payment of salary by the payer. The Indian entity made no payment of the home-country component; that was paid abroad by a different company out of its own funds. An obligation to withhold cannot attach to a payment the assessee neither makes nor is in a position to control.",
      revenue:
        "The expatriates rendered their services entirely in India for the Indian entity, and the salary in both its components was consideration for that work. Splitting the payment between two jurisdictions cannot reduce the withholding obligation, or the machinery would be defeated by simple structuring.",
    },
    summary:
      "The Court held that the withholding obligation on salary attaches to the income chargeable under that head in the employee's hands, and where services are rendered in India the whole of the salary referable to those services is chargeable, wherever it is paid. The division of the remuneration between an Indian and an overseas component was an arrangement between the group companies and could not curtail the obligation, since the Indian entity was the economic employer for whose benefit the services were rendered. The Court rejected the contention that the obligation is confined to sums physically disbursed by the Indian entity, observing that such a reading would permit the machinery to be circumvented by routing part of the remuneration offshore. It went on to address the consequences. Applying the principle in Hindustan Coca Cola, it held that where the expatriates had filed returns and paid tax on the full salary, the tax could not be recovered a second time from the Indian entity, though interest for the period of default remained payable. On penalty, the Court held that a bona fide belief, in a field where the position had not been settled, could constitute reasonable cause.",
    principles: [
      "Withholding on salary attaches to the whole salary chargeable for services rendered in India, wherever paid.",
      "Splitting remuneration across jurisdictions does not reduce the Indian entity's obligation.",
      "The entity for whose benefit the services are rendered carries the obligation as economic employer.",
      "Where employees have paid the tax, it cannot be recovered again from the deductor, but interest remains.",
      "A bona fide belief on an unsettled question may constitute reasonable cause against penalty.",
    ],
    relevance:
      "Salary withholding sits in Section 392 of the IT Act 2025, with default consequences in Section 399. The decision governs secondment and expatriate arrangements, which remain common in multinational groups, and is closely connected with the separate question whether a secondment creates a service permanent establishment or a taxable service fee — issues that are analysed together in practice.",
    keywords: [
      "expatriate salary",
      "secondment",
      "economic employer",
      "home country payroll",
      "section 192",
      "assessee in default",
      "reasonable cause",
    ],
  },
  {
    slug: "transmission-corporation-ap",
    caseName: "Transmission Corporation of AP Ltd v. CIT",
    citation: "(1999) 239 ITR 587 (SC)",
    court: "Supreme Court",
    year: 1999,
    category: "TDS & TCS",
    section1961: "Sections 195 & 195(2)",
    section2025: "Section 393",
    sectionTopic: "TDS on specified payments including non-resident remittances",
    issue:
      "Where a composite payment to a non-resident includes elements that are not chargeable to tax, must the payer withhold on the gross sum, or only on the taxable portion?",
    held:
      "Withholding attaches to the sum chargeable, and where a payment is composite the payer must apply to the Assessing Officer for a determination of the appropriate proportion rather than deciding unilaterally.",
    facts:
      "The assessee made payments to non-resident contractors under composite contracts which covered both the supply of equipment from outside India and services rendered within India. It took the view that a substantial part of the consideration related to offshore supply and was not chargeable in India, and deducted tax only on a portion. It did not apply to the Assessing Officer for a determination of the proportion on which tax should be withheld. The Revenue held the assessee in default in respect of the balance.",
    proceduralHistory:
      "The matter came before the Supreme Court, which examined the interaction between the general withholding obligation and the machinery permitting a payer to obtain a determination of the proportion chargeable.",
    contentions: {
      assessee:
        "The obligation extends only to sums chargeable to tax. Where a payment is plainly composite and part of it represents consideration for something not taxable in India, requiring deduction on the gross amount would collect tax on a receipt outside the charge.",
      revenue:
        "The statute provides a specific mechanism for precisely this situation: a payer who considers that only a proportion is chargeable may apply for a determination. A payer who bypasses that mechanism and makes its own apportionment does so at its own risk and cannot complain of being held in default.",
    },
    summary:
      "The Court confirmed that the withholding obligation is confined to sums chargeable to tax, but held that where the payment is composite and the chargeable proportion is not self-evident, the payer is not at liberty to determine that proportion for itself and withhold accordingly. The statute supplies a mechanism for the purpose, permitting the payer to apply to the Assessing Officer for a determination of the appropriate proportion, and that mechanism exists because the payer is not the appropriate authority to adjudicate the extent of a non-resident's Indian tax liability. The Court held that a payer who makes its own apportionment without obtaining a determination assumes the risk that the apportionment will be found wrong, and may be treated as in default to the extent of the shortfall. It emphasised that the decision does not require withholding on sums that are not chargeable at all; the obligation remains tied to chargeability, and the determination procedure is the route by which a disputed apportionment is resolved.",
    principles: [
      "The withholding obligation extends only to sums chargeable to tax.",
      "Where a payment is composite, the payer should apply for a determination of the chargeable proportion.",
      "A payer making its own apportionment without a determination assumes the risk of being held in default.",
      "The payer is not the appropriate authority to adjudicate a non-resident's tax liability.",
    ],
    relevance:
      "Withholding is consolidated in Section 393 of the IT Act 2025. Read this case with GE India Technology, which clarified that where the payer's view is that no part of the sum is chargeable, no deduction is required and an application is optional rather than mandatory. Transmission Corporation governs the different situation of a composite payment with a disputed taxable proportion, where obtaining a determination is the prudent course.",
    keywords: [
      "composite payment",
      "offshore supply",
      "chargeable proportion",
      "section 195(2)",
      "determination",
      "non-resident contractor",
      "apportionment",
    ],
  },
  {
    slug: "japan-airlines-landing-charges",
    caseName: "CIT v. Japan Airlines Co Ltd",
    citation: "(2015) 377 ITR 372 (SC)",
    court: "Supreme Court",
    year: 2015,
    category: "TDS & TCS",
    section1961: "Section 194-I",
    section2025: "Section 393",
    sectionTopic: "TDS on specified payments — rent",
    issue:
      "Are landing and parking charges paid by airlines to the airports authority 'rent' attracting withholding at the rate applicable to rent, or fees for a composite package of services?",
    held:
      "They are rent. The definition of rent in the withholding provision is very wide and covers any payment for the use of land, whatever the arrangement is called and whether or not the payee owns the property.",
    facts:
      "The appellant airlines paid landing and parking charges to the Airports Authority of India in respect of their aircraft. They deducted tax at the lower rate applicable to payments to contractors, on the footing that the charges were for a bundle of services — provision of runway lighting, navigational aids, ground safety, air traffic services and technical support — rather than for the use of land as such. The Revenue took the view that the charges were rent for the use of the runway and parking areas and that tax ought to have been withheld at the higher rate applicable to rent.",
    proceduralHistory:
      "High Courts had reached opposing conclusions, the Delhi High Court treating the charges as rent and the Madras High Court taking the contrary view. The Supreme Court resolved the conflict.",
    contentions: {
      assessee:
        "What the airline pays for is a comprehensive package enabling safe landing and take-off, of which the physical use of the tarmac is only one element. The charges are calculated by reference to aircraft weight rather than area or duration of occupation, which shows that the payment is for services and not for occupying land.",
      revenue:
        "The expression rent is defined in the provision in the widest terms, extending to any payment under any arrangement for the use of land or a building. An aircraft landing on and parking on the runway and apron is using land, and the label attached to the charge is immaterial.",
    },
    summary:
      "The Court examined the definition of rent in the withholding provision and held it to be markedly wider than the ordinary or general law meaning of the term. The definition extends to any payment, by whatever name called, under any lease, tenancy or any other agreement or arrangement, for the use of land or a building. The Court held that each element of that definition was satisfied: the aircraft physically use the runway to land and take off, and the apron to park, so there is use of land; the payment is made under an arrangement with the authority; and the wide words 'by whatever name called' prevent the characterisation adopted by the parties from governing. It rejected the argument that the services bundled with the facility take the payment outside the definition, holding that the provision of ancillary services alongside the use of land does not convert a payment for that use into something else. The basis on which the charge is computed, whether by weight or by area, was held to be a matter of pricing mechanics and not determinative of character.",
    principles: [
      "The statutory definition of rent for withholding purposes is far wider than its general law meaning.",
      "It extends to any payment under any arrangement for the use of land or a building.",
      "The words 'by whatever name called' prevent the parties' characterisation from governing.",
      "Ancillary services provided alongside the use of land do not alter the character of the payment.",
      "The basis of computing the charge is a pricing matter and not determinative.",
    ],
    relevance:
      "Withholding provisions are consolidated in Section 393 of the IT Act 2025 and the wide definition of rent carries forward. The decision governs payments for the use of infrastructure and facilities generally — port and terminal charges, warehousing, shared premises, data centre and co-location fees — wherever a payment for the use of land is presented as a service fee.",
    keywords: [
      "rent",
      "landing charges",
      "parking charges",
      "194-I",
      "use of land",
      "by whatever name called",
      "composite services",
    ],
  },
  {
    slug: "bharti-cellular-human-intervention",
    caseName: "CIT v. Bharti Cellular Ltd",
    citation: "(2011) 330 ITR 239 (SC)",
    court: "Supreme Court",
    year: 2011,
    category: "TDS & TCS",
    section1961: "Sections 194J & 9(1)(vii)",
    section2025: "Sections 393 & 9",
    sectionTopic:
      "TDS on specified payments — professional or technical services; income deemed to accrue in India",
    issue:
      "Do interconnect and port access charges paid for the use of another operator's network constitute fees for technical services, requiring withholding at the rate applicable to such fees?",
    held:
      "Technical services connote a human element. Where a facility operates automatically without human intervention, the payment is for the use of a facility rather than for technical services — but the question requires expert evidence on the facts.",
    facts:
      "The assessee, a cellular operator, paid interconnect usage and port access charges to another operator for routing calls across its network. Tax was not deducted at the rate applicable to fees for technical services, on the basis that the interconnection was effected by automated switching equipment without any human involvement. The Revenue held that the charges were for technical services, given the sophisticated technology involved in establishing and maintaining the connection, and raised demands.",
    proceduralHistory:
      "The Delhi High Court held that the services were rendered without human intervention and therefore fell outside the definition. The Revenue appealed to the Supreme Court, which agreed with the legal test but found the factual foundation inadequate.",
    contentions: {
      assessee:
        "Once interconnection is established, calls are routed automatically by switching equipment. No person applies technical skill to any individual call. The expression technical services, read with the words that accompany it in the definition, connotes services involving a human element rather than the automatic functioning of machinery.",
      revenue:
        "The network is highly technical and its design, installation and continuous monitoring require substantial expertise. A service does not cease to be technical because the equipment operates automatically once configured, and the charges are consideration for access to that technical capability.",
    },
    summary:
      "The Court accepted the legal test that had been applied below, namely that technical services within the definition connote services involving a human element, applying the principle that words take colour from those with which they are associated — the term appearing alongside managerial and consultancy services, both of which necessarily involve human agency. A facility that functions automatically, without a person applying skill to the particular transaction, is therefore not the rendering of technical services, and payment for its use is not a fee for such services. The Court held, however, that whether human intervention is in fact involved in interconnection and port access is a technical question that cannot be answered by assumption. It criticised the absence of any expert evidence on the point in the proceedings below and observed that neither the Revenue nor the Tribunal had examined a technical witness on how the interconnection actually operates and what human involvement, if any, it entails. It accordingly set aside the orders and remitted the matter, directing that technical evidence be obtained before the question is decided.",
    principles: [
      "Technical services within the definition connote a human element.",
      "The term takes colour from managerial and consultancy services, which necessarily involve human agency.",
      "Payment for a facility that operates automatically is not a fee for technical services.",
      "Whether human intervention exists is a technical question requiring expert evidence, not assumption.",
    ],
    relevance:
      "The human intervention test continues to govern the characterisation of automated services under Sections 9 and 393 of the IT Act 2025, and is central to disputes over cloud computing, data processing, software as a service, payment gateways and platform fees. The Court's insistence on expert evidence is as important as the test itself: in practice these disputes turn on the technical record assembled at the assessment stage.",
    keywords: [
      "fees for technical services",
      "human intervention",
      "interconnect charges",
      "194J",
      "automated services",
      "noscitur a sociis",
      "expert evidence",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TRANSFER PRICING — further judgments
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "cotton-naturals-currency",
    caseName: "CIT v. Cotton Naturals (I) Pvt Ltd",
    citation: "(2015) 276 CTR 445 (Del)",
    court: "Delhi High Court",
    year: 2015,
    category: "Transfer Pricing",
    section1961: "Sections 92B & 92C",
    section2025: "Sections 163 & 165",
    sectionTopic:
      "Meaning of international transaction; determination of arm's length price",
    issue:
      "Which currency determines the arm's length interest rate on a loan to an overseas associated enterprise — the lender's home currency or the currency in which the loan is denominated and repayable?",
    held:
      "The currency in which the loan is denominated and repayable. The interest rate applicable to that currency in the borrower's market governs, and the lender's domestic rates are irrelevant.",
    facts:
      "The assessee advanced a loan in foreign currency to its wholly owned subsidiary abroad, charging interest at a rate reflecting conditions in the currency and market concerned. The Transfer Pricing Officer substituted a rate derived from Indian lending conditions, reasoning that the funds originated in India and that the appropriate comparison was with what the assessee could have obtained by lending domestically. A substantial adjustment followed.",
    proceduralHistory:
      "The Tribunal held in favour of the assessee on the choice of benchmark. The Revenue appealed to the Delhi High Court, which delivered a detailed judgment on the principles governing the pricing of cross-border intra-group loans.",
    contentions: {
      assessee:
        "Interest compensates the lender for the use of money in a particular currency over a period, and different currencies carry different rates because they carry different inflation and monetary conditions. A loan denominated and repayable in foreign currency must be compared with foreign currency lending; the rupee rate reflects an entirely different economic environment.",
      revenue:
        "The lender is an Indian enterprise that has deployed Indian funds abroad. The arm's length exercise should measure what those funds would have earned had they been lent in India, and the domestic rate supplies that measure.",
    },
    summary:
      "The Court held that the currency in which the loan is to be repaid is the determining factor in fixing the applicable interest rate. It reasoned that interest rates are not universal but are specific to currencies, reflecting the inflation, monetary policy and credit conditions attaching to each. A loan advanced and repayable in a foreign currency therefore has to be benchmarked against the rates at which comparable foreign currency loans are made in the relevant market, and the domestic prime lending rate has no application. The Court rejected the opportunity cost approach, holding that the transfer pricing exercise asks what price the transaction itself would have commanded between independent parties, not what the taxpayer might have earned from an alternative deployment of its funds. It went on to identify the factors relevant to comparability in such lending — the currency, the tenor, the credit rating of the borrower, the security offered and the prevailing conditions in the borrower's market — and held that an appropriate benchmark rate in that currency, suitably adjusted for risk, is the correct starting point.",
    principles: [
      "The currency in which the loan is denominated and repayable determines the applicable interest rate.",
      "Interest rates are currency-specific, reflecting the monetary conditions attaching to each currency.",
      "The domestic prime lending rate is irrelevant to pricing a foreign currency loan abroad.",
      "The arm's length enquiry concerns the price of the transaction, not the taxpayer's forgone alternatives.",
      "Comparability turns on currency, tenor, credit rating, security and market conditions.",
    ],
    relevance:
      "Read with Tata Autocomp, this settles the approach to outbound intra-group lending under Sections 163 and 165 of the IT Act 2025. The detailed comparability factors it identifies are used in practice to construct the benchmark, and the analysis extends to guarantee fees and other cross-border financing. The specific reference rates have moved on with the replacement of LIBOR, but the currency principle is unaffected.",
    keywords: [
      "interest benchmarking",
      "currency of loan",
      "outbound lending",
      "credit rating",
      "opportunity cost",
      "comparability factors",
      "LIBOR",
    ],
  },
  {
    slug: "cushman-wakefield-tpo-role",
    caseName: "CIT v. Cushman and Wakefield (India) Pvt Ltd",
    citation: "(2014) 367 ITR 730 (Del)",
    court: "Delhi High Court",
    year: 2014,
    category: "Transfer Pricing",
    section1961: "Sections 37(1), 92C & 92CA",
    section2025: "Sections 34, 165 & 166",
    sectionTopic:
      "General conditions for revenue expenditure; determination of arm's length price; reference to the Transfer Pricing Officer",
    issue:
      "May the Transfer Pricing Officer determine the arm's length price of intra-group services at nil on the ground that no benefit was received, and does that determination dispose of the deductibility of the payment?",
    held:
      "No to both. The officer's role is to price the transaction, not to decide whether the expenditure should be allowed. Deductibility is for the Assessing Officer to determine separately under the ordinary provisions.",
    facts:
      "The assessee reimbursed its overseas group companies for the cost of regional and global support services — including management, marketing and administrative support — on a cost allocation basis. The Transfer Pricing Officer took the view that the assessee had not demonstrated any tangible benefit from the services, determined the arm's length price at nil, and the entire payment was disallowed in consequence. The assessee contended that the officer had confused two distinct enquiries: what the services should have cost, and whether the expenditure was allowable.",
    proceduralHistory:
      "The matter came before the Delhi High Court from the Tribunal, and the Court took the opportunity to delineate the respective functions of the Transfer Pricing Officer and the Assessing Officer.",
    contentions: {
      assessee:
        "The transfer pricing provisions supply machinery for determining whether the price charged between associated enterprises is at arm's length. Whether an expenditure was incurred for the purposes of the business and is therefore deductible is a separate question arising under the ordinary deduction provisions, on which the Assessing Officer must apply his own mind.",
      revenue:
        "If no benefit was derived, an independent enterprise would not have paid anything for the services, so nil is the correct arm's length price. Determining the price at nil disposes of the matter and no separate enquiry into deductibility is required.",
    },
    summary:
      "The Court held that the two enquiries are distinct and must not be collapsed into one. The Transfer Pricing Officer's mandate is to determine the arm's length price of an international transaction by applying the prescribed methods; it is not to assess whether the expenditure satisfies the conditions for deduction. Conversely, the Assessing Officer retains the jurisdiction to examine whether a payment was laid out wholly and exclusively for the purposes of the business, and that examination is not concluded by the transfer pricing determination. The Court held that a finding of nil arm's length price founded solely on the absence of demonstrable benefit is in substance a disallowance dressed up as a pricing exercise, and is beyond the officer's function. It accepted that the benefit question is not wholly irrelevant — evidence that services were actually rendered bears on comparability and on the pricing analysis — but held that it cannot be used to determine the price at nil without a proper application of the prescribed methods. The Court also observed that cost allocation without mark-up may itself be an arm's length outcome where the services are of a shareholder or stewardship character.",
    principles: [
      "Determining the arm's length price and determining deductibility are distinct enquiries.",
      "The Transfer Pricing Officer prices the transaction; the Assessing Officer decides allowability.",
      "A nil price founded solely on absence of benefit is a disallowance beyond the officer's function.",
      "Evidence that services were rendered bears on comparability but cannot substitute for the prescribed methods.",
      "Cost allocation without mark-up may be an arm's length outcome for stewardship services.",
    ],
    relevance:
      "Applied under Sections 165 and 166 of the IT Act 2025 for pricing, and Section 34 for deductibility. Together with EKL Appliances it forms the principal defence to nil adjustments on intra-group service and management fee arrangements, which remain among the most frequently litigated transfer pricing issues. The separation of functions it insists on also affects procedure, since each determination must be challenged on its own footing.",
    keywords: [
      "intra-group services",
      "management fee",
      "nil ALP",
      "benefit test",
      "TPO jurisdiction",
      "cost allocation",
      "stewardship",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // INTERNATIONAL TAXATION — further judgments
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "ishikawajima-harima",
    caseName: "Ishikawajima-Harima Heavy Industries Ltd v. DIT",
    citation: "(2007) 288 ITR 408 (SC)",
    court: "Supreme Court",
    year: 2007,
    category: "International Tax",
    section1961: "Sections 9(1)(vii) & 5",
    section2025: "Sections 9 & 5",
    sectionTopic:
      "Income deemed to accrue or arise in India; scope of total income",
    issue:
      "In a turnkey contract split between offshore supply, offshore services and onshore work, is the consideration for the offshore elements taxable in India?",
    held:
      "No. Territorial nexus is essential. Offshore supply where title passes outside India, and services rendered wholly outside India, are not chargeable merely because the project is located in India or the payment is made by an Indian party.",
    facts:
      "A Japanese company, as part of a consortium, contracted with an Indian company to build a liquefied natural gas facility. The contract was a turnkey arrangement covering offshore supply of equipment, offshore services such as design and engineering performed in Japan, and onshore supply, services, construction and commissioning in India. The price was allocated between these components. Title to the offshore equipment passed outside India and payment for it was received abroad. The Revenue sought to tax the consideration attributable to the offshore supply and offshore services, on the footing that the contract was a composite whole to be performed in India.",
    proceduralHistory:
      "The Authority for Advance Rulings decided substantially against the taxpayer, treating the contract as indivisible. The matter came before the Supreme Court, which examined the divisibility of the contract and the nexus required before income may be deemed to arise in India.",
    contentions: {
      assessee:
        "The contract itself apportioned the price among distinct components. Property in the offshore equipment passed outside India, and the design and engineering services were performed entirely in Japan. Neither the location of the project nor the residence of the payer supplies a territorial connection sufficient to bring offshore activity within the Indian charge.",
      revenue:
        "The contract was a single turnkey obligation to deliver a working facility in India, and it cannot be dismembered for tax purposes. The entire consideration relates to a project in India, and the services were utilised in India even if performed abroad.",
    },
    summary:
      "The Court held that the contract, having itself allocated consideration among identifiable components, was divisible and could be examined component by component. On offshore supply, it held that where property in the goods passes outside India and payment is received abroad, the transaction is completed outside India and the resulting income does not accrue here; the fact that the equipment is destined for an Indian site does not create a taxable nexus. On offshore services, the Court held that for fees for technical services to be taxable there must be sufficient territorial nexus, and that the services must be both rendered in India and utilised in India. Services performed wholly abroad therefore fell outside the charge, notwithstanding that their benefit was enjoyed in India. The Court emphasised that a deeming provision must be construed strictly and cannot be extended to create a charge on income lacking any real connection with India, and that the principle of territorial nexus underlies the scheme. It accordingly held the offshore supply and offshore service consideration not chargeable.",
    principles: [
      "A turnkey contract that apportions consideration among components may be examined component by component.",
      "Offshore supply where title passes and payment is received abroad does not give rise to Indian income.",
      "Sufficient territorial nexus is required before income may be deemed to arise in India.",
      "A deeming provision is construed strictly and cannot reach income lacking real connection with India.",
      "The location of the project and the residence of the payer do not by themselves create nexus.",
    ],
    relevance:
      "Foundational for cross-border EPC and turnkey contracts under Section 9 of the IT Act 2025. Its holding on the rendered-and-utilised requirement for technical service fees was subsequently displaced by an amendment providing that such income is taxable whether or not the services are rendered in India, so that limb must be checked against the current provision and against any applicable treaty. The reasoning on divisibility and on offshore supply remains good and is applied routinely, and should be read with Samsung Heavy Industries on attribution.",
    keywords: [
      "offshore supply",
      "offshore services",
      "territorial nexus",
      "turnkey contract",
      "EPC",
      "divisible contract",
      "fees for technical services",
    ],
  },
  {
    slug: "morgan-stanley-service-pe",
    caseName: "DIT v. Morgan Stanley & Co Inc",
    citation: "(2007) 292 ITR 416 (SC)",
    court: "Supreme Court",
    year: 2007,
    category: "International Tax",
    section1961: "Sections 9 & 90",
    section2025: "Sections 9 & 159",
    sectionTopic:
      "Income deemed to accrue or arise in India; double taxation relief",
    issue:
      "Does a captive back-office subsidiary create a permanent establishment of its foreign parent, and if so, what further profits may be attributed once the subsidiary is remunerated at arm's length?",
    held:
      "Outsourcing to a captive performing support functions does not create a fixed place or agency permanent establishment, though deputation of the parent's employees can create a service permanent establishment. Where the captive is remunerated at arm's length, nothing further is attributable.",
    facts:
      "A United States investment bank outsourced certain back-office and support functions — data processing, research support and account reconciliation — to its Indian group company, which was remunerated on a cost-plus basis. The US entity also deputed some of its own personnel to India as stewards to protect its interests and monitor quality, and seconded others who worked under the Indian company's control. The question arose whether these arrangements created a permanent establishment in India and, if so, what profits were attributable to it.",
    proceduralHistory:
      "The matter came to the Supreme Court from the Authority for Advance Rulings, and was decided together with issues concerning the attribution of profits where transfer pricing had already been applied.",
    contentions: {
      assessee:
        "The Indian company performs its own business of providing support services and is separately compensated at arm's length. The US entity has no place at its disposal and conducts no business of its own through the Indian premises. Stewardship activity undertaken to protect its own interest as a customer does not amount to carrying on business in India.",
      revenue:
        "The Indian entity works exclusively for the group, using its systems and performing functions integral to the parent's business, and the presence of the parent's personnel in India reinforces the connection. A permanent establishment exists and a share of the global profits attributable to the Indian operations should be taxed.",
    },
    summary:
      "The Court addressed the three limbs separately. On fixed place, it held that the Indian company carried on its own business of rendering outsourced services and the US entity had no premises at its disposal through which it conducted business, so no fixed place permanent establishment arose from the outsourcing itself. On agency, it held that the Indian company had no authority to conclude contracts binding the parent and did not habitually do so. On service permanent establishment, the Court drew an important distinction: employees deputed purely as stewards, to protect the parent's interest in the quality of work done for it, do not render services to the Indian entity and do not create a permanent establishment; but employees seconded to work under the Indian entity's control, contributing to its operations, can constitute a service permanent establishment because the parent is thereby furnishing services in India through personnel. On attribution, the Court held that where the associated enterprise has been remunerated at an arm's length price that properly reflects the functions performed, assets used and risks assumed, the transfer pricing analysis exhausts the profits attributable to the permanent establishment and nothing further falls to be taxed.",
    principles: [
      "Outsourcing to a captive subsidiary does not by itself create a fixed place permanent establishment.",
      "Stewardship activity to protect the parent's own interest does not create a permanent establishment.",
      "Deputation of employees working under the Indian entity's control can create a service permanent establishment.",
      "Where the associated enterprise is remunerated at arm's length reflecting functions, assets and risks, no further profits are attributable.",
    ],
    relevance:
      "Central to India's outsourcing and global capability centre model under Sections 9 and 159 of the IT Act 2025. The attribution holding is the more valuable half in practice: it means a robust transfer pricing position operates as a defence on attribution even where a permanent establishment is found. Read with E-Funds on existence and Samsung Heavy Industries on the burden of proof.",
    keywords: [
      "service PE",
      "stewardship",
      "deputation",
      "secondment",
      "captive subsidiary",
      "attribution of profits",
      "arm's length remuneration",
    ],
  },
  {
    slug: "gvk-industries-nexus",
    caseName: "GVK Industries Ltd v. ITO",
    citation: "(2011) 332 ITR 130 (SC)",
    court: "Supreme Court",
    year: 2011,
    category: "International Tax",
    section1961: "Section 9(1)(vii)",
    section2025: "Section 9",
    sectionTopic: "Income deemed to accrue or arise in India",
    issue:
      "Can Parliament tax income of a non-resident arising from services rendered entirely outside India, and does a success fee for arranging foreign finance fall within the charge?",
    held:
      "Parliament may legislate in respect of extra-territorial acts provided there is a real connection with India. A success fee for advisory services used in an Indian project has such a connection and is taxable as fees for technical services.",
    facts:
      "The assessee, an Indian company setting up a power project, engaged a non-resident financial adviser to assist in structuring and arranging the finance required for the project, including loans from foreign lenders. The adviser worked from outside India, and on successful completion of the financing the assessee paid it a success fee. The assessee applied for a no-deduction certificate, contending that the adviser had rendered no services in India and that the payment was not chargeable. The Revenue held the fee to be fees for technical services deemed to arise in India.",
    proceduralHistory:
      "The High Court decided against the assessee. On appeal, a Constitution Bench of the Supreme Court first addressed the question of legislative competence to tax extra-territorial acts, and a subsequent Bench then applied that framework to the facts.",
    contentions: {
      assessee:
        "The adviser had no presence in India and performed all its work abroad. Taxing income arising from acts performed wholly outside the country exceeds Parliament's competence, which is confined to the territory of India, and in any event the services were not utilised in a business carried on outside India so as to fall within the charge.",
      revenue:
        "The advisory services were commissioned by an Indian company, related to a project situated in India, were used to raise finance deployed in India, and were paid for out of Indian resources. The connection with India is substantial, and the deeming provision applies to fees for services utilised in a business carried on in India.",
    },
    summary:
      "The Constitution Bench held that Parliament is not disabled from legislating in respect of extra-territorial aspects or causes, provided those aspects or causes have a real and not illusory connection with India and are expected to have an impact on or effect in the country. Purely extra-territorial legislation lacking any nexus with India would be beyond competence, but a provision that reaches foreign acts having a genuine Indian connection is valid. Applying that framework, the Court examined the character of the success fee. The adviser had been engaged by an Indian company for the specific purpose of arranging finance for a project to be established in India, and its advice was used in a business carried on in India. The consideration was therefore for services utilised in India in the relevant sense, and the fee answered the description of fees for technical services within the deeming provision. The Court distinguished payments made for earning income from a source outside India, which the provision expressly excludes. The success fee was accordingly held chargeable and subject to withholding.",
    principles: [
      "Parliament may legislate for extra-territorial aspects having a real, not illusory, connection with India.",
      "Legislation lacking any nexus with India would exceed legislative competence.",
      "Fees for services utilised in a business carried on in India fall within the deeming provision.",
      "Payments for earning income from a source outside India are excluded by the provision itself.",
    ],
    relevance:
      "The constitutional foundation for India's deeming provisions, now in Section 9 of the IT Act 2025, and the authority relied on whenever the reach of those provisions over foreign activity is challenged. It applies directly to advisory, arranging and structuring fees paid to non-residents, and should be read with Ishikawajima-Harima and the subsequent amendment concerning services rendered outside India, as well as any applicable treaty definition.",
    keywords: [
      "success fee",
      "fees for technical services",
      "extra-territorial operation",
      "real connection",
      "legislative competence",
      "9(1)(vii)",
      "source rule",
    ],
  },
  {
    slug: "hyundai-heavy-industries",
    caseName: "CIT v. Hyundai Heavy Industries Co Ltd",
    citation: "(2007) 291 ITR 482 (SC)",
    court: "Supreme Court",
    year: 2007,
    category: "International Tax",
    section1961: "Sections 9 & 90",
    section2025: "Sections 9 & 159",
    sectionTopic:
      "Income deemed to accrue or arise in India; double taxation relief",
    issue:
      "Where an installation permanent establishment comes into existence only when erection work begins in India, can profits from the earlier offshore fabrication and supply be attributed to it?",
    held:
      "No. A permanent establishment cannot be attributed profits from activities completed before it came into existence. Only the income arising from the Indian installation activity is taxable, computed as though the permanent establishment were a distinct enterprise.",
    facts:
      "A Korean company contracted to fabricate and install an offshore platform for an Indian oil company. The fabrication was carried out entirely in Korea and the completed structure was delivered to the Indian company, with title passing outside India. Thereafter the Korean company carried out installation and commissioning at the Indian site, for which it established a presence in India that constituted an installation permanent establishment under the treaty. The Revenue attributed a share of the profits on the entire contract, including the offshore fabrication and supply, to the Indian permanent establishment.",
    proceduralHistory:
      "The matter proceeded through the appellate stages to the High Court and came before the Supreme Court, which addressed the point in time at which such a permanent establishment comes into existence and the consequences for attribution.",
    contentions: {
      assessee:
        "The permanent establishment came into existence only when the installation activity began in India. The fabrication had by then been completed abroad and title to the platform had already passed outside India. Profits earned before the permanent establishment existed cannot be attributed to it, since it played no part in earning them.",
      revenue:
        "The contract was a single obligation to deliver an installed platform, and the profit on it should be apportioned to the Indian operations. The fabrication was undertaken for the purpose of the Indian project and its profit is properly connected with the Indian presence.",
    },
    summary:
      "The Court held that an installation permanent establishment comes into being only when the installation activity commences in India, and that profits cannot be attributed to it in respect of a period before it existed. It emphasised that the attribution exercise proceeds on the hypothesis that the permanent establishment is a distinct and separate enterprise dealing independently with the head office: on that footing, one asks what profits the Indian establishment would have earned for the functions it performed. The offshore fabrication had been carried out by the head office in Korea and completed before the Indian activity began, with title passing outside India; the Indian establishment contributed nothing to it and would have earned nothing from it as an independent enterprise. Only the installation and commissioning carried out in India fell to be attributed, and the profit on that activity was to be computed by reference to the functions performed, assets used and risks assumed in India. The Court rejected a global apportionment of contract profits as inconsistent with the separate enterprise hypothesis.",
    principles: [
      "An installation permanent establishment comes into existence when installation activity begins in India.",
      "No profits may be attributed to a permanent establishment for a period before it existed.",
      "Attribution proceeds on the hypothesis of a distinct and separate enterprise dealing independently with the head office.",
      "Global apportionment of contract profits is inconsistent with the separate enterprise hypothesis.",
    ],
    relevance:
      "Governs the taxation of composite offshore and onshore contracts under Sections 9 and 159 of the IT Act 2025, alongside Ishikawajima-Harima on divisibility and Samsung Heavy Industries on the burden of establishing a permanent establishment and the impermissibility of ad hoc attribution. The temporal point — that the permanent establishment must exist before profits can be attributed to it — is distinctive to this case.",
    keywords: [
      "installation PE",
      "offshore fabrication",
      "attribution of profits",
      "separate enterprise hypothesis",
      "turnkey contract",
      "period of existence",
    ],
  },
  {
    slug: "ap-moller-maersk-reimbursement",
    caseName: "DIT v. A.P. Moller Maersk A/S",
    citation: "(2017) 392 ITR 186 (SC)",
    court: "Supreme Court",
    year: 2017,
    category: "International Tax",
    section1961: "Sections 9(1)(vi), 9(1)(vii) & 90",
    section2025: "Sections 9 & 159",
    sectionTopic:
      "Income deemed to accrue or arise in India; double taxation relief",
    issue:
      "Are amounts recovered from group agents as their share of the cost of a common communication system in the nature of royalty or fees for technical services?",
    held:
      "No. A pro-rata recovery of the actual cost of a shared facility, without any mark-up or profit element, is a reimbursement and not income. It is neither royalty nor a fee for technical services.",
    facts:
      "The assessee, a Danish shipping company, operated a global telecommunication and tracking system that its agents worldwide, including agents in India, used to book cargo, track containers and communicate within the network. The cost of maintaining the system was shared among the agents in proportion to their use, and the Indian agents were charged their pro-rata share of the actual cost with no mark-up. The Revenue treated these recoveries as fees for technical services or royalty for the use of a system and process, and sought to tax them in the assessee's hands.",
    proceduralHistory:
      "The Bombay High Court held the recoveries to be reimbursements not chargeable to tax. The Revenue appealed to the Supreme Court, which affirmed.",
    contentions: {
      assessee:
        "The shipping income itself was exempt under the treaty, and the communication system was an integral part of conducting that shipping business rather than a separate service offered for profit. What was recovered was the actual cost apportioned among users, with no element of income, and a recovery of cost cannot be income at all.",
      revenue:
        "The agents obtained the use of a sophisticated system and paid for it. Payment for the use of a process or for services of a technical nature falls within the definitions of royalty and fees for technical services, and the absence of a mark-up does not change the character of the receipt.",
    },
    summary:
      "The Court held that no income arose at all. It found as a fact that the system was maintained for the purpose of the assessee's own shipping business and that its cost was simply distributed among the agents who used it, without any mark-up or profit element. A payment that does no more than restore to the payee the expenditure it has incurred on the payer's behalf is a reimbursement; there is no profit, and therefore no income, embedded in it. The Court held that since the receipts contained no income element, the characterisation debate over royalty and fees for technical services did not arise. It further observed that the system was an integral part of the shipping operation whose profits were protected by the treaty, so recoveries connected with that operation could not be carved out and taxed separately under a different article. The Court also relied on consistency, noting that the position had been accepted in earlier years without challenge.",
    principles: [
      "A pro-rata recovery of actual cost without mark-up is a reimbursement and contains no income element.",
      "Where no income arises, questions of characterisation as royalty or technical service fees do not arise.",
      "A facility integral to an operation protected by a treaty article cannot be carved out and taxed under another.",
      "Consistency of treatment across years carries weight where facts are unchanged.",
    ],
    relevance:
      "Applied under Sections 9 and 159 of the IT Act 2025, and the leading authority on cost-sharing and reimbursement arrangements within multinational groups — shared IT systems, global communication platforms, centralised services and cost contribution arrangements. The decisive facts are the absence of mark-up and clear evidence of actual cost, which makes contemporaneous allocation documentation essential in practice.",
    keywords: [
      "reimbursement",
      "cost sharing",
      "no mark-up",
      "royalty",
      "fees for technical services",
      "shipping",
      "global system",
    ],
  },
  {
    slug: "new-skies-satellite",
    caseName: "DIT v. New Skies Satellite BV",
    citation: "(2016) 382 ITR 114 (Del)",
    court: "Delhi High Court",
    year: 2016,
    category: "International Tax",
    section1961: "Sections 9(1)(vi) & 90",
    section2025: "Sections 9 & 159",
    sectionTopic:
      "Income deemed to accrue or arise in India; double taxation relief",
    issue:
      "Can a retrospective amendment widening the domestic definition of royalty alter the meaning of that term in a tax treaty?",
    held:
      "No. A treaty is a bilateral instrument and its terms cannot be amended by unilateral domestic legislation. Where the treaty definition is narrower, it prevails regardless of a later domestic expansion.",
    facts:
      "The assessees were foreign satellite operators which provided transponder capacity to Indian broadcasters and telecom companies. The Revenue sought to tax the payments as royalty, relying on explanations inserted into the domestic definition with retrospective effect, which expanded the concept of royalty to cover consideration for the use of transmission by satellite and for a process whether or not it is secret or the payer has possession or control of it. The applicable treaties contained their own, narrower, definitions of royalty which had not been amended.",
    proceduralHistory:
      "The matter came before the Delhi High Court, which had earlier held on the unamended law that such payments were not royalty. The Revenue contended that the retrospective explanations altered the position, including for treaty purposes.",
    contentions: {
      assessee:
        "A treaty represents a bargain between two sovereign states and its terms can be altered only by agreement between them or by the procedure the treaty itself provides. A domestic amendment, however worded and whatever its retrospective reach, binds only domestic law and cannot rewrite a defined term in a bilateral instrument.",
      revenue:
        "The explanations were declaratory of what the law had always meant and merely clarified the existing definition. Where the treaty does not itself define a term exhaustively, the domestic meaning may be imported, and the clarified domestic meaning should therefore apply.",
    },
    summary:
      "The Court held that a treaty cannot be amended unilaterally. The definitions contained in a treaty are the product of negotiation between two states, and altering the domestic statute does not and cannot alter what the parties agreed. Where the treaty supplies its own definition of royalty, that definition governs for the purpose of applying the treaty, and the domestic definition is not imported. The Court rejected the characterisation of the explanations as merely clarificatory, observing that they substantially expanded the concept and that a real change in the law cannot be given effect in the treaty sphere by labelling it a clarification. It held that if a state wishes to enlarge a treaty term it must renegotiate the treaty or follow the amendment procedure the treaty prescribes. Applying the unamended treaty definition, payments for transponder capacity did not constitute royalty, since what the customer obtained was a standard service using the operator's equipment rather than the use of, or the right to use, any secret process or equipment placed at its disposal.",
    principles: [
      "A treaty is a bilateral instrument and cannot be amended by unilateral domestic legislation.",
      "Where a treaty supplies its own definition of a term, that definition governs its application.",
      "An amendment that substantially expands a concept is not clarificatory merely because it is so described.",
      "Enlarging a treaty term requires renegotiation or the amendment procedure the treaty provides.",
    ],
    relevance:
      "The reasoning was expressly approved by the Supreme Court in Engineering Analysis, which applied the same principle to software payments. Under the IT Act 2025 the analysis runs through Section 9 for the domestic charge and Section 159 for treaty relief. It is directly relevant to satellite, bandwidth, transponder and data transmission payments, and more broadly to any case where a retrospective domestic amendment is invoked against a treaty-protected taxpayer.",
    keywords: [
      "royalty",
      "transponder",
      "retrospective amendment",
      "treaty override",
      "bilateral instrument",
      "process",
      "satellite",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ASSESSMENT & REASSESSMENT — further judgments
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "gkn-driveshafts-objections",
    caseName: "GKN Driveshafts (India) Ltd v. ITO",
    citation: "(2003) 259 ITR 19 (SC)",
    court: "Supreme Court",
    year: 2003,
    category: "Assessment & Reassessment",
    section1961: "Sections 147 & 148",
    section2025: "Sections 279 & 280",
    sectionTopic:
      "Income escaping assessment; issue of reassessment notice",
    issue:
      "What procedure must be followed when a taxpayer objects to a reassessment notice — is it obliged to litigate immediately, or may it require the Assessing Officer to deal with its objections first?",
    held:
      "On receiving a notice the taxpayer may seek the reasons recorded, which the officer is bound to furnish. The taxpayer may then file objections, and the officer must dispose of them by a speaking order before proceeding with the reassessment.",
    facts:
      "The assessee received a notice reopening a completed assessment. It was not told the basis on which the officer had formed the belief that income had escaped assessment, and it challenged the notice directly by writ petition. The High Court declined to entertain the challenge, leaving the assessee to participate in the reassessment and pursue its remedies afterwards. The assessee appealed, and the Supreme Court took the opportunity to lay down the procedure to be followed in such cases generally.",
    proceduralHistory:
      "The appeal was disposed of by a short but consequential order which has governed reassessment practice throughout the country ever since.",
    contentions: {
      assessee:
        "A taxpayer cannot meaningfully contest a reopening without knowing the grounds on which it rests. Requiring it to undergo a full reassessment before learning the reasons, and only then to challenge the jurisdictional foundation, is both unfair and wasteful of everyone's time.",
      revenue:
        "The recorded reasons are an internal record supporting the formation of belief, and the statute does not require them to be supplied at the notice stage. The taxpayer's remedies lie in the appellate process once the reassessment has been completed.",
    },
    summary:
      "The Court laid down a clear sequence. When a notice is issued, the taxpayer should file its return and may then seek the reasons recorded for reopening; the Assessing Officer is bound to furnish them within a reasonable time. On receiving the reasons, the taxpayer is entitled to file objections to the issuance of the notice, and the officer is obliged to dispose of those objections by passing a speaking order before proceeding with the reassessment. The rationale is that the existence of a valid reason to believe is a jurisdictional precondition: if that foundation is absent, the entire proceeding is without authority, and it is in everyone's interest for the point to be addressed at the threshold rather than after a complete reassessment. The requirement of a speaking order ensures that the officer applies his mind to the objections and creates a record capable of review. Although expressed briefly, the direction has been treated as mandatory, and reassessments completed without disposing of objections by a separate reasoned order are routinely set aside.",
    principles: [
      "The taxpayer is entitled to the reasons recorded for reopening, and the officer must furnish them.",
      "The taxpayer may file objections to the issuance of the notice.",
      "The officer must dispose of the objections by a speaking order before proceeding with the reassessment.",
      "A valid reason to believe is a jurisdictional precondition to be addressed at the threshold.",
    ],
    relevance:
      "The procedure was subsequently given statutory form in the inquiry provision introduced in 2021, now reflected in Sections 279 to 281 of the IT Act 2025, under which the material relied on must be supplied and the taxpayer heard before a reassessment notice issues. GKN Driveshafts remains the source of the principle and is still invoked wherever objections are not disposed of by a separate reasoned order, a failure that continues to vitiate reassessments.",
    keywords: [
      "reassessment procedure",
      "reasons recorded",
      "objections",
      "speaking order",
      "jurisdictional precondition",
      "148",
      "writ remedy",
    ],
  },
  {
    slug: "kelvinator-change-of-opinion",
    caseName: "CIT v. Kelvinator of India Ltd",
    citation: "(2010) 320 ITR 561 (SC)",
    court: "Supreme Court",
    year: 2010,
    category: "Assessment & Reassessment",
    section1961: "Sections 147 & 148",
    section2025: "Sections 279 & 280",
    sectionTopic:
      "Income escaping assessment; issue of reassessment notice",
    issue:
      "After the 1989 amendment, may an Assessing Officer reopen a completed assessment simply because he takes a different view of material already on record?",
    held:
      "No. Reopening requires tangible material indicating escapement of income. A mere change of opinion confers no power to reassess, which would amount to a power of review the statute does not grant.",
    facts:
      "A regular assessment had been completed after scrutiny, in which the material relevant to the issue in question had been placed before the Assessing Officer and considered. The officer subsequently formed a different view on the same material and issued a notice reopening the assessment. The Revenue contended that the 1989 amendment, which replaced the earlier requirement of failure to disclose with the simpler formulation of reason to believe that income had escaped assessment, had widened the power and removed the change of opinion restriction.",
    proceduralHistory:
      "The Delhi High Court, sitting in a Full Bench, held that a mere change of opinion did not justify reopening. The Revenue appealed to the Supreme Court, which affirmed.",
    contentions: {
      assessee:
        "The amended provision still requires a reason to believe that income has escaped assessment, which imports an objective foundation. Where all material was disclosed and considered, nothing has escaped; the officer has simply changed his mind, and permitting reopening on that basis would make every completed assessment permanently vulnerable.",
      revenue:
        "The amendment deliberately removed the precondition of failure to disclose, leaving the officer free to reopen whenever he has reason to believe income has escaped assessment. The formation of that belief is a subjective matter, and the fact that the material was previously on record does not preclude it.",
    },
    summary:
      "The Court traced the legislative history and held that the 1989 amendment did not confer an unfettered power. Although the precondition of failure to disclose was removed for certain situations, the requirement of a reason to believe was retained, and that expression imports an objective foundation rather than a mere subjective satisfaction. The Court held that the officer must have tangible material coming to his notice which indicates that income has escaped assessment; reopening cannot rest on a reappraisal of material already considered. It emphasised that the distinction between the power to reassess and the power to review is fundamental: the statute confers the former and not the latter, and permitting reopening on a change of opinion would collapse the distinction and confer review powers by the back door. The Court also referred to the Board's own circular explaining the amendment, which stated that the object was to remove ambiguity and not to enable reopening on the basis of a mere change of opinion. Since the material had been before the officer at the original assessment and no fresh tangible material had come to light, the reopening was held bad.",
    principles: [
      "Reason to believe imports an objective foundation, not mere subjective satisfaction.",
      "Reopening requires tangible material coming to the officer's notice indicating escapement.",
      "A mere change of opinion on material already considered does not justify reopening.",
      "The power to reassess is distinct from a power to review, which the statute does not confer.",
    ],
    relevance:
      "The single most cited authority on reassessment, applying to Sections 279 and 280 of the IT Act 2025. The statutory framework has since been recast to require an inquiry and information-based trigger before a notice issues, which in substance codifies the tangible material requirement. Kelvinator remains the reference point for the change of opinion objection, particularly where the issue was examined in the original scrutiny.",
    keywords: [
      "change of opinion",
      "tangible material",
      "reason to believe",
      "power of review",
      "reopening",
      "147",
      "scrutiny assessment",
    ],
  },
  {
    slug: "rajesh-jhaveri-intimation",
    caseName: "ACIT v. Rajesh Jhaveri Stock Brokers (P) Ltd",
    citation: "(2007) 291 ITR 500 (SC)",
    court: "Supreme Court",
    year: 2007,
    category: "Assessment & Reassessment",
    section1961: "Sections 143(1) & 147",
    section2025: "Sections 277 & 279",
    sectionTopic:
      "Summary processing of return — intimation; income escaping assessment",
    issue:
      "Where a return has only been processed summarily and an intimation issued, does the change of opinion bar apply to prevent reopening?",
    held:
      "No. An intimation on summary processing is not an assessment and involves no formation of opinion, so there is no opinion capable of being changed. Reopening remains subject to the reason to believe requirement.",
    facts:
      "The assessee's return was processed summarily and an intimation was issued accepting the return as filed, without any scrutiny. The Assessing Officer subsequently issued a notice reopening the matter in respect of a claim made in that return. The assessee resisted, contending that since the return had been accepted, reopening amounted to a change of opinion which Kelvinator forbids.",
    proceduralHistory:
      "The High Court decided in the assessee's favour, treating the intimation as equivalent to an assessment. The Revenue appealed to the Supreme Court.",
    contentions: {
      assessee:
        "An intimation accepting the return determines the tax payable and is appealable. It should be treated as an assessment, with the consequence that reopening to re-examine the same claim is a change of opinion and impermissible.",
      revenue:
        "Summary processing is a mechanical exercise involving arithmetical checks and prima facie adjustments. No officer applies his mind to the merits of any claim, so no opinion is formed. Treating the intimation as an assessment would confer immunity on returns that were never examined at all.",
    },
    summary:
      "The Court drew a sharp distinction between an intimation on summary processing and an assessment made after scrutiny. Summary processing, it held, is essentially a mechanical exercise: the return is checked for arithmetical accuracy and prima facie adjustments, and an intimation follows. No enquiry is made into the correctness of any claim, no material is examined, and the officer forms no opinion on the merits. An intimation is therefore not an assessment, and the expressions are not interchangeable even though an intimation is deemed to be a notice of demand for recovery purposes. Since no opinion was formed, there is no opinion capable of being changed, and the change of opinion bar has no application. The Court was careful to add that this does not leave the power at large: reopening in such a case still requires a reason to believe that income has escaped assessment, founded on some material, and the officer cannot issue a notice on mere suspicion or to make a fishing enquiry. The safeguard is the reason to believe requirement, not the change of opinion doctrine.",
    principles: [
      "Summary processing is mechanical and involves no application of mind to the merits.",
      "An intimation is not an assessment, and the two are not interchangeable.",
      "Where no opinion has been formed, the change of opinion bar cannot apply.",
      "Reopening still requires a reason to believe founded on material; suspicion is not enough.",
    ],
    relevance:
      "Summary processing is Section 277 and the reassessment trigger Section 279 under the IT Act 2025. The distinction remains important because most returns are processed summarily rather than scrutinised, so the change of opinion defence is unavailable in the majority of reopenings — the taxpayer must instead attack the sufficiency of the material, which the current inquiry procedure now requires to be disclosed.",
    keywords: [
      "intimation",
      "143(1)",
      "summary processing",
      "change of opinion",
      "assessment distinguished",
      "reason to believe",
      "fishing enquiry",
    ],
  },
  {
    slug: "calcutta-discount",
    caseName: "Calcutta Discount Co Ltd v. ITO",
    citation: "(1961) 41 ITR 191 (SC)",
    court: "Supreme Court",
    year: 1961,
    category: "Assessment & Reassessment",
    section1961: "Section 147 (and its predecessor)",
    section2025: "Section 279",
    sectionTopic: "Income escaping assessment",
    issue:
      "How far does a taxpayer's duty of disclosure extend — must it disclose only the primary facts, or also the inferences the Assessing Officer should draw from them?",
    held:
      "The duty is to disclose fully and truly all primary facts. Drawing inferences from those facts is the officer's function, and a failure by him to draw the correct inference does not constitute a failure to disclose by the taxpayer.",
    facts:
      "The assessee had disclosed in its returns and accompanying accounts the particulars of transactions in shares, including the relevant entries and figures. The Assessing Officer completed the assessments on the footing that these were capital transactions. He subsequently formed the view that the transactions were in the nature of trade and that the profits should have been taxed as business income, and sought to reopen the assessments on the ground that there had been a failure to disclose fully and truly all material facts.",
    proceduralHistory:
      "The assessee challenged the reopening by writ petition. The matter reached the Supreme Court, which examined both the scope of the disclosure obligation and the availability of writ relief against a notice issued without jurisdiction.",
    contentions: {
      assessee:
        "Every primary fact concerning the transactions had been placed before the officer. The characterisation of those transactions as trading or investment is an inference of law and fact to be drawn by the officer from the material before him. A change in the inference he chooses to draw is not a failure of disclosure by the taxpayer.",
      revenue:
        "The assessee, knowing the true nature of its activity, ought to have disclosed that the transactions were in the nature of trade. Withholding that characterisation deprived the officer of a material fact and justified reopening.",
    },
    summary:
      "The Court held that the taxpayer's duty is to disclose fully and truly all primary facts — the raw material relevant to the assessment. Once those facts are placed before the officer, it is for him to decide what inferences of fact and law should be drawn from them; that is the essence of the assessing function. The taxpayer is under no obligation to instruct the officer on the conclusions he ought to reach, and a failure by the officer to draw the correct inference from facts fully disclosed cannot be converted into a failure to disclose by the taxpayer. The Court held that any other view would allow every assessment to be reopened whenever the Revenue later formed a different opinion, which the provision does not permit. On the procedural question, it held that where the jurisdictional precondition is absent, the taxpayer is not confined to the statutory appellate route: a writ may issue to restrain proceedings founded on a notice issued without jurisdiction, since requiring the taxpayer to undergo the entire process first is no adequate remedy.",
    principles: [
      "The duty of disclosure extends to primary facts, not to the inferences to be drawn from them.",
      "Drawing inferences of fact and law from disclosed material is the assessing officer's function.",
      "A failure by the officer to draw the correct inference is not a failure to disclose by the taxpayer.",
      "Where the jurisdictional precondition is absent, a writ may issue against the notice itself.",
    ],
    relevance:
      "The foundational authority on the disclosure obligation, applying to reopening under Section 279 of the IT Act 2025. It continues to govern reopenings beyond the ordinary period, which typically require a failure to disclose fully and truly, and its holding on writ jurisdiction underpins the practice of challenging reassessment notices directly rather than waiting for the assessment to be completed.",
    keywords: [
      "primary facts",
      "full and true disclosure",
      "inference",
      "jurisdictional fact",
      "writ jurisdiction",
      "reopening",
      "extended period",
    ],
  },
  {
    slug: "lakhmani-mewal-das",
    caseName: "ITO v. Lakhmani Mewal Das",
    citation: "(1976) 103 ITR 437 (SC)",
    court: "Supreme Court",
    year: 1976,
    category: "Assessment & Reassessment",
    section1961: "Sections 147 & 148",
    section2025: "Sections 279 & 280",
    sectionTopic:
      "Income escaping assessment; issue of reassessment notice",
    issue:
      "What connection must exist between the material relied on and the belief that income has escaped assessment?",
    held:
      "There must be a live link or close nexus between the material and the formation of belief. The belief must be that of a reasonable person acting on relevant grounds, and cannot rest on vague, remote or irrelevant material.",
    facts:
      "An assessment was reopened on the basis of information said to have been received that a creditor appearing in the assessee's books was a name-lender who had confessed to lending his name for accommodation entries. The recorded reasons referred to the confession in general terms, without indicating that it related to the particular loan transaction with the assessee or to the relevant year, and without linking the material to the specific entries in the assessee's accounts.",
    proceduralHistory:
      "The Calcutta High Court quashed the reopening for want of a proper foundation. The Revenue appealed to the Supreme Court, which affirmed and laid down the test governing the formation of belief.",
    contentions: {
      assessee:
        "The reasons must disclose a rational connection between the material and the conclusion that income has escaped assessment in the assessee's case for the year in question. A general confession by a third party, not tied to the particular transaction, provides no such connection and amounts to suspicion.",
      revenue:
        "The sufficiency of the material is not for the court to examine. Once the officer has recorded that he has reason to believe, the court's enquiry is at an end, and the correctness of the belief can be tested only in the reassessment itself.",
    },
    summary:
      "The Court accepted that it is not for the court to sit in judgment on the sufficiency of the material or to substitute its own view for that of the officer. But it held that the existence of a belief founded on relevant material is a jurisdictional requirement, and the court may examine whether there was material on which a reasonable person could have formed that belief and whether the material bears a rational connection to it. There must be, in the Court's words, a live link or close nexus between the material before the officer and the belief that income has escaped assessment. A belief founded on material that is vague, indefinite, remote or irrelevant, or that does not relate to the assessee or to the year in question, is no belief at all in the sense the statute requires. Applying that test, the Court found that the recorded reasons did not show that the confession related to the particular transaction with this assessee or to the relevant year, and the necessary link was therefore missing. The reopening was accordingly bad in law.",
    principles: [
      "The court does not examine the sufficiency of the material, but may examine whether relevant material existed.",
      "There must be a live link or close nexus between the material and the belief formed.",
      "Material that is vague, remote or irrelevant cannot found a valid belief.",
      "The material must relate to the particular assessee and the particular year.",
    ],
    relevance:
      "Applied to reopening under Sections 279 and 280 of the IT Act 2025. The live link test remains the standard against which recorded reasons are tested, and is particularly important where reopening rests on third-party information, search material or data from external databases — situations in which the connection to the specific taxpayer and year is often the weakest point in the Revenue's case.",
    keywords: [
      "live link",
      "close nexus",
      "reason to believe",
      "borrowed satisfaction",
      "third party information",
      "recorded reasons",
      "accommodation entries",
    ],
  },
  {
    slug: "ndtv-reassessment",
    caseName: "New Delhi Television Ltd v. DCIT",
    citation: "(2020) 424 ITR 607 (SC)",
    court: "Supreme Court",
    year: 2020,
    category: "Assessment & Reassessment",
    section1961: "Sections 147, 148 & 149",
    section2025: "Sections 279, 280 & 282",
    sectionTopic:
      "Income escaping assessment; reassessment notice; time limit for notice",
    issue:
      "May the Revenue support a reassessment notice on a ground not stated in it, in order to bring the case within an extended limitation period?",
    held:
      "No. The taxpayer must be told the provision and the basis on which the extended period is invoked. A notice cannot be sustained on a ground never put to the taxpayer, though on the facts the reopening survived within the ordinary period.",
    facts:
      "The assessee had raised funds through a step-down subsidiary incorporated abroad, and the Revenue formed the view that the arrangement had been used to bring undisclosed funds into the group. A reassessment notice was issued beyond the ordinary period. In the proceedings the Revenue sought to justify the notice by reference to the extended limitation available where income in relation to an asset located outside India has escaped assessment, although the notice itself had not invoked that provision or put the taxpayer on notice of it.",
    proceduralHistory:
      "The Delhi High Court upheld the reopening. The assessee appealed to the Supreme Court, which examined both the validity of the reasons and the Revenue's attempt to rely on the extended period.",
    contentions: {
      assessee:
        "A notice invoking an extended limitation period must say so and must state the basis, because the taxpayer must know the case it has to meet on limitation, which is a jurisdictional matter. Permitting the Revenue to invoke a different provision for the first time in argument deprives the taxpayer of the opportunity to respond.",
      revenue:
        "The material disclosed that income relating to an asset abroad had escaped assessment, and the extended period was available on the facts. A notice ought not to fail merely because the provision was not expressly cited, where the substance is made out.",
    },
    summary:
      "The Court examined the recorded reasons and held that they disclosed sufficient material for the officer to form the belief that income had escaped assessment, so the reopening was valid within the ordinary period. On the attempt to rely on the extended limitation, however, it held firmly against the Revenue. Limitation is a jurisdictional matter, and a taxpayer is entitled to know not merely that its assessment is being reopened but the period relied on and the basis for invoking it. The notice and the reasons had not put the assessee on notice that the extended period relating to foreign assets was being invoked, and the Revenue could not supply that foundation for the first time in argument. The Court held that the assessee must be given an opportunity to meet the case on that footing, and that a notice cannot be sustained by reference to a ground never communicated. It accordingly upheld the reopening only to the extent it was sustainable on the grounds actually stated.",
    principles: [
      "Limitation in reassessment is a jurisdictional matter, not a procedural formality.",
      "A taxpayer must be told the period relied on and the basis for invoking an extended period.",
      "A notice cannot be sustained on a ground never communicated to the taxpayer.",
      "Reasons disclosing sufficient material may sustain reopening within the ordinary period.",
    ],
    relevance:
      "Applies to Sections 279, 280 and 282 of the IT Act 2025. The procedural protection it insists on has been reinforced by the inquiry procedure, under which the information relied on must be supplied to the taxpayer before a notice issues. The decision is regularly invoked where the Revenue seeks to justify a time-barred notice on grounds developed after the event.",
    keywords: [
      "extended limitation",
      "foreign asset",
      "16 years",
      "jurisdictional fact",
      "grounds not stated",
      "opportunity to meet",
      "recorded reasons",
    ],
  },
  {
    slug: "malabar-industrial-revision",
    caseName: "Malabar Industrial Co Ltd v. CIT",
    citation: "(2000) 243 ITR 83 (SC)",
    court: "Supreme Court",
    year: 2000,
    category: "Assessment & Reassessment",
    section1961: "Section 263",
    section2025: "Section 377",
    sectionTopic:
      "Revision of orders by the Principal Commissioner or Commissioner",
    issue:
      "What must be established before an assessment order may be revised — is it enough that the order is erroneous, or that it is prejudicial to the Revenue?",
    held:
      "Both conditions must be satisfied cumulatively. The order must be erroneous and prejudicial to the interests of the Revenue. Where the officer has taken one of two views permissible in law, the order is not erroneous merely because the Commissioner prefers the other.",
    facts:
      "The Assessing Officer had accepted the assessee's treatment of a receipt after considering the matter in the assessment. The Commissioner, taking a different view of the character of the receipt, invoked the revisionary power, set aside the assessment and directed that the amount be brought to tax. The assessee contended that the officer's view was a legally permissible one reached after enquiry, and that a difference of opinion does not make an order erroneous.",
    proceduralHistory:
      "The Tribunal and the High Court differed in their approach to the revisionary power. The Supreme Court settled the test to be applied.",
    contentions: {
      assessee:
        "The revisionary power requires two conditions, each of which must be independently satisfied. An order passed after enquiry, adopting a view that the law permits, is not erroneous. If it were otherwise, the Commissioner could substitute his opinion for that of the officer in every case and the power would become one of general supervision.",
      revenue:
        "The receipt was taxable and the officer's failure to tax it caused a loss to the exchequer. An order that results in tax not being collected that ought to have been collected is both erroneous and prejudicial.",
    },
    summary:
      "The Court held that the revisionary power is conditioned on the satisfaction of two requirements which must co-exist: the order must be erroneous, and it must be prejudicial to the interests of the Revenue. An order is not erroneous merely because it results in a lower tax, and it is not open to revision merely because the Commissioner would have reached a different conclusion. The Court identified the situations in which an order will be erroneous — where it proceeds on an incorrect assumption of fact or an incorrect application of law, where it is passed without applying the mind, or where it is made in breach of the principles of natural justice. Crucially, it held that where two views are possible on the point and the Assessing Officer has adopted one of them after due consideration, the order cannot be treated as erroneous simply because the Commissioner prefers the other view. As to prejudice, the Court explained that the expression means prejudice to the interests of the Revenue in the sense of a lawful loss of tax; every loss of revenue is not prejudicial if the officer's view is sustainable in law.",
    principles: [
      "The two conditions — erroneous and prejudicial to the interests of the Revenue — must both be satisfied.",
      "An order is erroneous where it rests on incorrect facts or law, lacks application of mind, or breaches natural justice.",
      "Where two views are possible and the officer adopts one, the order is not erroneous.",
      "Every loss of revenue is not prejudicial where the officer's view is sustainable in law.",
    ],
    relevance:
      "Revision is dealt with in Section 377 of the IT Act 2025. The twin-condition test is the first line of defence in every revision proceeding, and the two-views principle is the most frequently invoked limb. Note that the statute has since been supplemented by a deeming explanation treating certain orders passed without enquiry as erroneous, so the current provision must be read alongside this decision rather than in place of it.",
    keywords: [
      "revision",
      "263",
      "erroneous and prejudicial",
      "twin conditions",
      "two views possible",
      "application of mind",
      "lack of enquiry",
    ],
  },
  {
    slug: "amitabh-bachchan-revision",
    caseName: "CIT v. Amitabh Bachchan",
    citation: "(2016) 384 ITR 200 (SC)",
    court: "Supreme Court",
    year: 2016,
    category: "Assessment & Reassessment",
    section1961: "Section 263",
    section2025: "Section 377",
    sectionTopic:
      "Revision of orders by the Principal Commissioner or Commissioner",
    issue:
      "In exercising the revisionary power, must the Commissioner confine himself to the grounds set out in the show cause notice, and is a separate opportunity of hearing required on each ground?",
    held:
      "The Commissioner is not confined to the grounds in the notice and may consider other aspects that emerge, provided the assessee is given a reasonable opportunity of being heard on them. What is required is opportunity, not a separate notice for every ground.",
    facts:
      "The assessee had filed a revised return withdrawing a claim for expenses that had been made in the original return. The Assessing Officer completed the assessment without making enquiries into certain aspects of the claim and the circumstances of its withdrawal. The Commissioner initiated revision proceedings, issued a show cause notice, and in the course of the proceedings examined aspects beyond those specifically enumerated in the notice, ultimately setting aside the assessment for lack of enquiry.",
    proceduralHistory:
      "The Tribunal and the High Court held the revision bad, partly on the footing that the Commissioner had travelled beyond the show cause notice. The Revenue appealed to the Supreme Court, which reversed.",
    contentions: {
      assessee:
        "Revision is a serious power with significant consequences, and its exercise must be confined to the case put to the assessee. Considering grounds outside the notice denies the assessee the opportunity to meet them and offends the principles of natural justice.",
      revenue:
        "The revisionary jurisdiction is directed at the correctness of the assessment as a whole. The statute requires the assessee to be given an opportunity of being heard, which was done; it does not require a fresh notice each time a further aspect of the same assessment comes under consideration.",
    },
    summary:
      "The Court held that the statute requires the Commissioner to give the assessee an opportunity of being heard and to make or cause to be made such enquiry as he considers necessary, but does not confine him to the grounds stated in the show cause notice. The revisionary jurisdiction is concerned with the correctness of the assessment order, and it would be artificial to prevent the Commissioner from considering an aspect that emerges during the proceedings merely because it was not enumerated at the outset. What the principles of natural justice require is that the assessee should have a reasonable opportunity to meet whatever is being held against it; they do not require a particular form or a fresh notice for each ground. The Court therefore held that the test is whether the assessee was in fact given an opportunity to respond to the matters on which the order was ultimately founded, and that prejudice must be shown rather than assumed. On the merits, the Court held that the failure of the Assessing Officer to make enquiries that the circumstances plainly called for rendered the assessment erroneous and prejudicial, and the revision was upheld.",
    principles: [
      "The Commissioner is not confined to the grounds enumerated in the show cause notice.",
      "What is required is a reasonable opportunity of being heard, not a fresh notice for each ground.",
      "Natural justice requires opportunity in substance; prejudice must be shown, not assumed.",
      "Failure to make enquiries the circumstances plainly call for renders an assessment erroneous and prejudicial.",
    ],
    relevance:
      "Applies to revision under Section 377 of the IT Act 2025. Read with Malabar Industrial it marks the boundaries of the revisionary power: the twin conditions and the two-views principle constrain it, while this decision confirms that procedural objections based on the scope of the notice will rarely succeed absent demonstrated prejudice. The lack of enquiry ground it endorses is now the most common basis on which revision is exercised.",
    keywords: [
      "revision",
      "263",
      "show cause notice",
      "scope of grounds",
      "opportunity of hearing",
      "lack of enquiry",
      "natural justice",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CHARITABLE TRUSTS & NPOs — further judgments
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "gujarat-maritime-board",
    caseName: "CIT v. Gujarat Maritime Board",
    citation: "(2007) 295 ITR 561 (SC)",
    court: "Supreme Court",
    year: 2007,
    category: "Charitable Trusts & NPOs",
    section1961: "Sections 2(15) & 12A",
    section2025: "Sections 332, 346 & 355",
    sectionTopic:
      "Registration of NPOs; restriction on commercial activities by GPU NPOs; interpretations",
    issue:
      "Is a statutory port authority, constituted to develop and manage ports and required to apply its income to those purposes, entitled to registration as a charitable institution?",
    held:
      "Yes. Developing and managing ports for the benefit of trade and the public is an object of general public utility, and a body whose income is statutorily committed to those purposes and cannot be distributed qualifies.",
    facts:
      "The assessee was a board constituted under state legislation to administer, control and manage minor ports in the state. Its functions included developing port infrastructure and regulating port activity, and it levied charges for the use of port facilities. The governing statute required its funds to be applied to the purposes of the Act and made no provision for distributing any surplus to the state or to any private person. It applied for registration as a charitable institution, which the Revenue refused on the footing that it was engaged in commercial port operations from which it derived substantial receipts.",
    proceduralHistory:
      "The Tribunal and the Gujarat High Court held the board entitled to registration. The Revenue appealed to the Supreme Court, which affirmed.",
    contentions: {
      assessee:
        "The board exists to discharge a public function entrusted by statute — the development and management of ports — which benefits trade, commerce and the public at large. Its income is committed by law to those purposes and no part of it can reach any private hand. Charging for the use of facilities is the means by which the function is discharged, not a commercial object.",
      revenue:
        "The board earns substantial revenue from port charges and operates in a manner indistinguishable from a commercial port operator. An entity carrying on activity of that scale and character is not a charitable institution merely because it was created by statute.",
    },
    summary:
      "The Court held that the development and maintenance of ports, and the regulation of port activity, are objects of general public utility: they serve trade and commerce and through them the community at large, and the benefit is not confined to any private group. It laid weight on the statutory framework governing the board's funds, under which the income was required to be applied to the purposes of the Act and could not be distributed as profit to the state or to any individual. That commitment of income, the Court held, distinguishes such a body from a commercial undertaking, since the absence of any profit motive and of any beneficiary entitled to the surplus is the hallmark of a charitable purpose. Charging for the use of port facilities was held to be the means by which the statutory function was performed rather than evidence of a business object. The Court accordingly upheld the grant of registration, noting that registration concerns the objects and genuineness of the institution and that questions about particular receipts fall to be examined in assessment.",
    principles: [
      "Development and management of ports is an object of general public utility benefiting trade and the public.",
      "Statutory commitment of income to public purposes, with no distributable surplus, indicates charitable purpose.",
      "Charging for the use of facilities may be the means of discharging a statutory function rather than a business object.",
      "Registration concerns objects and genuineness; particular receipts are examined in assessment.",
    ],
    relevance:
      "Registration is Section 332 of the IT Act 2025, with the commercial activity restriction in Section 346 and interpretations in Section 355. This decision was considered at length in Ahmedabad Urban Development Authority, which affirmed the position of statutory bodies discharging public functions on a cost basis while subjecting fee-charging activity to the quantitative ceiling. Read the two together: Gujarat Maritime Board establishes entitlement in principle, and the later decision governs how far receipts may go before it is imperilled.",
    keywords: [
      "statutory authority",
      "port trust",
      "general public utility",
      "no distributable surplus",
      "registration",
      "12A",
      "public function",
    ],
  },
  {
    slug: "rajasthan-gujarati-charitable-depreciation",
    caseName: "CIT v. Rajasthan & Gujarati Charitable Foundation",
    citation: "(2018) 402 ITR 441 (SC)",
    court: "Supreme Court",
    year: 2018,
    category: "Charitable Trusts & NPOs",
    section1961: "Sections 11 & 32",
    section2025: "Sections 335, 341 & 33",
    sectionTopic:
      "Regular income of a registered NPO; application of income; depreciation on assets",
    issue:
      "Where a charitable trust has treated the cost of a capital asset as an application of income, may it also claim depreciation on that asset in later years?",
    held:
      "Yes, on the law as it stood. Claiming the acquisition cost as application and claiming depreciation are not double deduction: the first determines whether income was applied in the year of acquisition, the second is a step in computing income in later years.",
    facts:
      "The assessee trusts had acquired capital assets and, in the year of acquisition, treated the cost as an application of income towards their charitable objects, which is how the statutory scheme requires capital expenditure by trusts to be dealt with. In subsequent years they claimed depreciation on the same assets in computing their income. The Revenue disallowed the depreciation, contending that since the entire cost had already been allowed as application, permitting depreciation as well amounted to a double deduction of the same expenditure.",
    proceduralHistory:
      "High Courts across the country had overwhelmingly decided in favour of the trusts. The Revenue's appeals were heard together by the Supreme Court, which affirmed the High Court view and noted the number of decisions taking the same position.",
    contentions: {
      assessee:
        "The two claims operate at different levels and serve different purposes. Application of income is a test of whether the trust has spent its income on its objects in the year of acquisition. Depreciation is a step in computing the income of later years, recognising the consumption of the asset. Neither claim duplicates the other.",
      revenue:
        "The whole cost of the asset has already been allowed once, as application in the year of acquisition. Allowing depreciation on the same cost in later years permits the trust to deduct the same expenditure twice, which no scheme of taxation contemplates.",
    },
    summary:
      "The Court held that the two claims are conceptually distinct and do not overlap. The computation of income and the application of income are separate exercises in the scheme governing charitable trusts: income is first computed on commercial principles, and the question of whether it has been applied to charitable purposes is then addressed. Depreciation belongs to the first exercise, being a charge recognising the consumption of a capital asset in the course of the trust's activities, while treating the acquisition cost as application belongs to the second, testing whether the trust spent its income on its objects in the year it was acquired. Because the two operate at different stages and answer different questions, allowing both does not result in the same expenditure being deducted twice in the sense that the double deduction doctrine forbids. The Court noted that almost every High Court to consider the question had reached the same conclusion, and it declined to disturb that settled position.",
    principles: [
      "Computation of income and application of income are distinct exercises for charitable trusts.",
      "Depreciation belongs to the computation of income; capital cost as application belongs to the second stage.",
      "Allowing both does not amount to a double deduction of the same expenditure.",
      "A long-settled position accepted by nearly every High Court will not lightly be disturbed.",
    ],
    relevance:
      "Important to note the sequel: Parliament enacted a provision expressly denying depreciation on an asset whose acquisition cost has been claimed as application, so for years governed by that provision the outcome no longer follows. The IT Act 2025 regime for NPOs lies in Sections 332 to 355, with depreciation generally in Section 33. Read this case for the conceptual distinction between computation and application, which remains sound and matters elsewhere in the scheme, and check the current provision for the depreciation entitlement itself.",
    keywords: [
      "depreciation",
      "application of income",
      "double deduction",
      "charitable trust",
      "computation of income",
      "legislative reversal",
      "capital asset",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PENALTIES
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "reliance-petroproducts-penalty",
    caseName: "CIT v. Reliance Petroproducts Pvt Ltd",
    citation: "(2010) 322 ITR 158 (SC)",
    court: "Supreme Court",
    year: 2010,
    category: "Penalties",
    section1961: "Section 271(1)(c)",
    section2025: "Sections 439 & 440",
    sectionTopic:
      "Penalty for under-reporting and misreporting; penalty for concealment and other failures",
    issue:
      "Does the disallowance of a claim, made openly in the return and supported by full disclosure, by itself attract penalty for furnishing inaccurate particulars of income?",
    held:
      "No. A claim that is not sustainable in law does not amount to furnishing inaccurate particulars. Penalty requires the particulars supplied to be inaccurate — a wrong claim, fully disclosed, is not the same thing.",
    facts:
      "The assessee had borrowed funds and used them to acquire shares in another company by way of investment. It claimed a deduction for the interest on that borrowing. All the relevant facts were set out in the return and the accompanying accounts, and nothing was concealed or misstated. The Assessing Officer disallowed the interest on the footing that the borrowing had been applied to acquire an investment yielding exempt dividend, and proceeded to levy penalty for furnishing inaccurate particulars of income.",
    proceduralHistory:
      "The Commissioner (Appeals), the Tribunal and the High Court all deleted the penalty. The Revenue appealed to the Supreme Court, which affirmed and took the opportunity to state the principle generally.",
    contentions: {
      assessee:
        "Every particular furnished in the return was accurate. The dispute concerned the legal characterisation of the interest, on which the assessee took a view that the Assessing Officer did not accept. A difference of legal opinion, on facts fully disclosed, cannot amount to furnishing inaccurate particulars.",
      revenue:
        "The claim was not sustainable, and a return carrying an unsustainable claim contains particulars that are inaccurate. Otherwise a taxpayer could advance any claim without risk, leaving the Revenue to detect and disallow it with no consequence.",
    },
    summary:
      "The Court approached the question through the language of the provision, which requires either concealment of particulars of income or the furnishing of inaccurate particulars of income. It held that 'inaccurate particulars' means details supplied in the return that are not accurate, not exact or correct, or that are erroneous or false. Where every detail is truthfully stated and the only issue is whether a claim founded on those details is sustainable in law, the particulars are not inaccurate. The Court held that merely because a claim is not accepted, or is not accepted in law, penalty does not follow — otherwise every disallowance would automatically attract a penalty, which is plainly not the scheme. It emphasised that a penalty provision must be construed strictly and cannot be extended by implication, and that the assessee must not be visited with a penalty merely for taking a legal position that fails. The Court did note that the position would differ if the claim rested on facts that were themselves false or concealed.",
    principles: [
      "Penalty requires concealment of particulars or the furnishing of inaccurate particulars.",
      "'Inaccurate particulars' means details that are not accurate, exact, correct, or that are erroneous or false.",
      "A claim that is unsustainable in law, made on fully disclosed facts, is not inaccurate particulars.",
      "Disallowance of a claim does not automatically attract penalty.",
      "Penalty provisions are construed strictly and not extended by implication.",
    ],
    relevance:
      "The penalty regime has been restructured — Section 439 of the IT Act 2025 deals with under-reporting and misreporting, with Section 440 covering concealment and other failures — and the new framework turns on defined categories rather than the older concealment language. The underlying principle, that a bona fide claim on disclosed facts is not penal, carries forward through the exclusions for bona fide explanations, and this remains the most cited authority against penalty founded on a mere disallowance.",
    keywords: [
      "penalty",
      "inaccurate particulars",
      "concealment",
      "unsustainable claim",
      "full disclosure",
      "271(1)(c)",
      "strict construction",
    ],
  },
  {
    slug: "dharamendra-textile-penalty",
    caseName: "Union of India v. Dharamendra Textile Processors",
    citation: "(2008) 306 ITR 277 (SC)",
    court: "Supreme Court",
    year: 2008,
    category: "Penalties",
    section1961: "Section 271(1)(c)",
    section2025: "Sections 439 & 440",
    sectionTopic:
      "Penalty for under-reporting and misreporting; penalty for concealment and other failures",
    issue:
      "Must the Revenue establish a guilty mind before a penalty for concealment may be imposed, or is the liability civil in character?",
    held:
      "The liability is civil. Penalty is a statutory consequence of the conditions in the provision being met, and mens rea in the criminal sense need not be established.",
    facts:
      "The question arose in the context of statutory penalties in the indirect tax field, with the Court considering the nature of penalty provisions generally and the extent to which principles drawn from criminal law apply to them. Earlier authority had suggested that a penalty could not be imposed unless the authority found a deliberate defiance of law or contumacious conduct, importing a requirement akin to mens rea, and the correctness of that approach was referred to a larger Bench.",
    proceduralHistory:
      "The matter was heard by a larger Bench of the Supreme Court to resolve the conflict on whether mens rea is an essential ingredient of a statutory penalty, and its reasoning was applied to income tax penalty provisions.",
    contentions: {
      assessee:
        "A penalty is a punitive imposition and should not be visited on a person who has acted without any intention to evade. Absent deliberate or contumacious conduct, the imposition is disproportionate and the authority should retain a discretion to decline it.",
      revenue:
        "The provision sets out objective conditions. Where those conditions are satisfied the penalty follows as a statutory consequence, and importing a requirement of guilty intent would add an ingredient the legislature did not enact and would make enforcement impracticable.",
    },
    summary:
      "The Court held that the object of a penalty of this character is to provide a remedy for loss of revenue, and that such a penalty is a civil liability rather than a criminal sanction. Where a statute imposes a penalty on the satisfaction of specified conditions, those conditions govern, and the authority is not required to find a guilty mind in the sense criminal law requires. The Court held that the earlier line of authority requiring deliberate defiance or contumacious conduct did not correctly state the position for a provision framed in these terms, and that wilful concealment is not an essential ingredient where the statute does not make it one. It reasoned that importing mens rea into a civil penalty would add an element the legislature had not enacted. The decision was subsequently read in a measured way: later authority, including Reliance Petroproducts and Price Waterhouse Coopers, confirmed that it does not make penalty automatic on every addition, since the statutory conditions must still be satisfied and any statutory explanation or defence remains available.",
    principles: [
      "A penalty of this character is a civil liability, not a criminal sanction.",
      "Where the statutory conditions are satisfied the penalty follows as a statutory consequence.",
      "Mens rea in the criminal sense need not be established unless the statute requires it.",
      "The decision does not make penalty automatic; the statutory conditions and defences still apply.",
    ],
    relevance:
      "Under the IT Act 2025 penalties are dealt with in Sections 439 and 440, with under-reporting and misreporting distinguished and carrying different rates. That structure makes the character of the default central once more, since misreporting attracts a substantially higher penalty. Dharamendra Textile continues to be cited for the civil nature of the liability, but must be read with Reliance Petroproducts and Price Waterhouse Coopers, which preserve the bona fide explanation defence.",
    keywords: [
      "civil liability",
      "mens rea",
      "strict liability",
      "concealment penalty",
      "statutory consequence",
      "271(1)(c)",
      "misreporting",
    ],
  },
  {
    slug: "mak-data-surrender",
    caseName: "MAK Data P Ltd v. CIT",
    citation: "(2013) 358 ITR 593 (SC)",
    court: "Supreme Court",
    year: 2013,
    category: "Penalties",
    section1961: "Section 271(1)(c)",
    section2025: "Sections 439 & 440",
    sectionTopic:
      "Penalty for under-reporting and misreporting; penalty for concealment and other failures",
    issue:
      "Does a surrender of income made during assessment, said to be voluntary and to buy peace, preclude the levy of penalty?",
    held:
      "No. A surrender made after the Revenue has confronted the taxpayer with incriminating material is not voluntary. The statutory presumption applies unless the taxpayer offers a bona fide explanation, and a plea of buying peace is not such an explanation.",
    facts:
      "During assessment proceedings the Assessing Officer came into possession of documents, found in the course of a survey on another entity, which indicated that share application money recorded in the assessee's books did not represent genuine subscriptions. When confronted with this material, the assessee offered an additional sum to tax, stating that the surrender was made voluntarily to buy peace and to avoid protracted litigation, and on the express condition that no penalty be levied. The Assessing Officer accepted the surrender and levied penalty.",
    proceduralHistory:
      "The penalty was upheld by the appellate authorities and the Delhi High Court. The assessee appealed to the Supreme Court.",
    contentions: {
      assessee:
        "The additional income was offered voluntarily and in good faith to end the dispute and cooperate with the Department. Where a taxpayer comes forward and offers income, penalising it discourages settlement and cooperation. The surrender was made on the footing that no penalty would follow.",
      revenue:
        "The offer came only after the assessee was confronted with material showing the entries to be bogus. A surrender extracted in those circumstances is not voluntary in any meaningful sense, and the assessee never explained the source of the money or the nature of the entries.",
    },
    summary:
      "The Court held that the surrender was not voluntary. The assessee had offered the amount only when confronted with material gathered by the Department indicating that the share application money was not genuine, and an offer made at that stage is a response to detection rather than a voluntary disclosure. The Court held that the statute raises a presumption against the assessee once an addition is made, and that the burden lies on the assessee to offer an explanation that is bona fide and to substantiate it. A statement that the amount is offered to buy peace or to avoid litigation is not an explanation at all: it says nothing about the source of the money or the nature of the entries, and leaves the material unanswered. The Court rejected the suggestion that the Assessing Officer must establish concealment independently, holding that the statutory presumption operates unless displaced. It also held that a condition attached by the assessee that no penalty should be levied has no legal effect, since the levy is governed by statute and cannot be bargained away.",
    principles: [
      "A surrender made after being confronted with incriminating material is not voluntary.",
      "The statutory presumption operates once an addition is made, and the burden lies on the assessee.",
      "An explanation must be bona fide and substantiated; buying peace is not an explanation.",
      "A condition that no penalty be levied has no legal effect on a statutory levy.",
    ],
    relevance:
      "Under the IT Act 2025 the penalty structure in Sections 439 and 440 distinguishes under-reporting from misreporting, and a surrender following detection will ordinarily fall on the misreporting side with its higher rate. The practical lesson survives the restructuring: an offer of additional income should be accompanied by a substantiated explanation of the source and circumstances, since a bare surrender leaves the taxpayer without a defence.",
    keywords: [
      "voluntary surrender",
      "buy peace",
      "bona fide explanation",
      "statutory presumption",
      "share application money",
      "detection",
      "burden of proof",
    ],
  },
  {
    slug: "pwc-inadvertent-error",
    caseName: "Price Waterhouse Coopers Pvt Ltd v. CIT",
    citation: "(2012) 348 ITR 306 (SC)",
    court: "Supreme Court",
    year: 2012,
    category: "Penalties",
    section1961: "Section 271(1)(c)",
    section2025: "Sections 439 & 440",
    sectionTopic:
      "Penalty for under-reporting and misreporting; penalty for concealment and other failures",
    issue:
      "Does a genuine clerical oversight in preparing the return, apparent from the accompanying documents, attract penalty for furnishing inaccurate particulars?",
    held:
      "No. Where the error is inadvertent and the correct position is apparent from the audited accounts and the tax audit report filed with the return, the mistake is bona fide and penalty is not warranted.",
    facts:
      "The assessee, a firm of chartered accountants, claimed a deduction for a provision for leave encashment in computing its income. The tax audit report filed with the return correctly recorded that the provision was not allowable, and the audited accounts disclosed the provision clearly. Through an oversight in preparing the computation, the amount was not added back. The Assessing Officer disallowed the provision and levied penalty, observing pointedly that the assessee was a firm of accountants from whom such an error was not to be expected.",
    proceduralHistory:
      "The penalty was upheld by the appellate authorities and the Calcutta High Court, which laid weight on the professional standing of the assessee. The assessee appealed to the Supreme Court.",
    contentions: {
      assessee:
        "The tax audit report accompanying the return itself stated that the provision was not allowable. No attempt was made to conceal anything; had there been an intention to claim the deduction improperly, the accompanying report would not have disclosed the contrary position. The error was a human oversight in transcription and was bona fide.",
      revenue:
        "A firm of chartered accountants is expected to know that a provision of this kind is not deductible. Claiming it in the return furnished inaccurate particulars, and the professional standing of the assessee makes the error less excusable rather than more.",
    },
    summary:
      "The Court held that the assessee had committed an inadvertent and bona fide error rather than furnished inaccurate particulars in the sense the provision requires. It laid decisive weight on the fact that the tax audit report filed along with the return itself stated that the provision was not allowable: an assessee intending to make a false claim would hardly file, with the very same return, a document contradicting it. That circumstance demonstrated that there was no intention to conceal and that the mistake was one of transcription in preparing the computation. The Court declined to treat the assessee's professional standing as an aggravating factor, observing that the assessee is a large company and that such an error can occur in any organisation notwithstanding its expertise; the calibre of the taxpayer does not convert an inadvertent mistake into a deliberate one. It held that the imposition of penalty was not justified and deleted it, while making clear that the conclusion rested on the particular facts and the disclosure made in the accompanying documents.",
    principles: [
      "An inadvertent and bona fide error is not the furnishing of inaccurate particulars.",
      "Disclosure of the correct position in accompanying documents negates an intention to conceal.",
      "The professional standing of the taxpayer does not convert an oversight into a deliberate act.",
      "The conclusion is fact-specific and turns on what was disclosed with the return.",
    ],
    relevance:
      "Under Sections 439 and 440 of the IT Act 2025 the distinction between under-reporting and misreporting makes the character of the error decisive, since misreporting attracts a materially higher penalty. This remains the leading authority for resisting penalty on a genuine computational oversight, and it underscores a practical point: the tax audit report and accompanying schedules are the evidence on which the bona fide defence is built.",
    keywords: [
      "inadvertent error",
      "bona fide mistake",
      "tax audit report",
      "leave encashment provision",
      "no intention to conceal",
      "computation error",
      "misreporting",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CASH CREDITS & UNEXPLAINED INCOME
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "sumati-dayal-human-probabilities",
    caseName: "Sumati Dayal v. CIT",
    citation: "(1995) 214 ITR 801 (SC)",
    court: "Supreme Court",
    year: 1995,
    category: "Cash Credits & Unexplained Income",
    section1961: "Section 68",
    section2025: "Section 102",
    sectionTopic: "Unexplained cash credits",
    issue:
      "May the Revenue reject an explanation supported by documents where the surrounding circumstances make the story inherently improbable?",
    held:
      "Yes. The taxing authorities are entitled to look at the surrounding circumstances and apply the test of human probabilities, and are not obliged to accept an explanation merely because it is supported by documents.",
    facts:
      "The assessee claimed to have won substantial sums in a series of horse race jackpots over a short period, and produced winning tickets and certificates from the race clubs in support. The amounts had been credited in her books as racing winnings, which at the relevant time were exempt. The Revenue found the pattern improbable — an extraordinary run of wins across different races and clubs by a person with no history of racing activity and no record of losing bets — and treated the credits as undisclosed income from other sources.",
    proceduralHistory:
      "The Settlement Commission rejected the explanation, drawing on the improbability of the claimed pattern. The matter reached the Supreme Court, where the question was whether the authorities could go behind apparently genuine documents.",
    contentions: {
      assessee:
        "The winnings were evidenced by tickets and by certificates issued by the race clubs themselves. Unless those documents are shown to be forged or the issuing bodies are discredited, the explanation stands proved, and the authorities cannot substitute suspicion for evidence.",
      revenue:
        "The documents establish at most that the tickets were presented and paid. They do not establish that the assessee placed the bets or that the winnings were hers. The pattern claimed is so improbable that it cannot be accepted at face value, and the surrounding circumstances point to the purchase of winning tickets to launder undisclosed money.",
    },
    summary:
      "The Court held that the question whether an explanation is satisfactory is one of fact, to be decided on a consideration of all the material and not by mechanically accepting documents produced. It endorsed the approach that the authorities are entitled to consider the surrounding circumstances and to apply the test of human probabilities: an apparent state of affairs may be rejected where the totality of circumstances makes it inherently improbable. On the facts, the Court considered the claimed run of jackpot wins, the absence of any evidence of losing bets or of habitual racing activity, and the concentration of the wins in a short period, and held that the Commission was entitled to conclude that the explanation was not genuine. It emphasised that this does not permit the Revenue to act on suspicion alone; the conclusion must be drawn from the material as a whole, and the taxpayer must be given an opportunity to meet the circumstances relied on. But where the material, viewed realistically, does not support the story, documentary formality will not save it.",
    principles: [
      "Whether an explanation is satisfactory is a question of fact decided on all the material.",
      "Authorities may consider surrounding circumstances and apply the test of human probabilities.",
      "Documentary support does not compel acceptance where the story is inherently improbable.",
      "The conclusion must rest on the material as a whole, not on suspicion, with opportunity to the taxpayer.",
    ],
    relevance:
      "Unexplained cash credits are dealt with in Section 102 of the IT Act 2025, taxed at the special rate in Section 195. The human probabilities test is the Revenue's principal answer to formally documented but commercially implausible transactions, and is central to disputes over accommodation entries, bogus capital gains from penny stocks, and share capital from shell entities. Read with Durga Prasad More, which supplies the apparent-versus-real framing.",
    keywords: [
      "human probabilities",
      "surrounding circumstances",
      "cash credit",
      "68",
      "apparent state of affairs",
      "racing winnings",
      "accommodation entries",
    ],
  },
  {
    slug: "durga-prasad-more",
    caseName: "CIT v. Durga Prasad More",
    citation: "(1971) 82 ITR 540 (SC)",
    court: "Supreme Court",
    year: 1971,
    category: "Cash Credits & Unexplained Income",
    section1961: "Section 68",
    section2025: "Section 102",
    sectionTopic: "Unexplained cash credits",
    issue:
      "Where a transaction is recorded in formal documents, is the taxing authority bound by the apparent state of affairs those documents disclose?",
    held:
      "No. Though an apparent state of affairs is to be treated as real unless shown otherwise, the onus of showing that the apparent is not the real lies on the party asserting it, and the authorities may test the story against ordinary human conduct.",
    facts:
      "The assessee claimed that property standing in his name had in fact been purchased with funds belonging to his wife, which she was said to have received from a trust and held in cash over a long period. Formal documents were produced in support of the claimed arrangement. The Revenue did not accept the account, considering it improbable that funds of that magnitude would have been held in cash for years and that the arrangement was in substance a means of explaining the assessee's own money.",
    proceduralHistory:
      "The matter reached the Supreme Court, which considered how far the taxing authorities may go behind documents in assessing the genuineness of a claimed state of affairs.",
    contentions: {
      assessee:
        "The transactions were evidenced by documents which the Revenue had not shown to be fabricated. In the absence of evidence displacing them, the apparent state of affairs must be taken as real and the authorities cannot proceed on conjecture.",
      revenue:
        "Documents record what the parties chose to record. The account given was contrary to ordinary human conduct, and the authorities are entitled to examine whether the recitals reflect reality rather than accepting them because they exist.",
    },
    summary:
      "The Court accepted the general proposition that an apparent state of affairs is to be treated as the real state of affairs, but held that the party asserting that the apparent is not the real bears the onus of establishing it — and that the Revenue may discharge that onus by reference to the improbability of the account rather than by direct evidence, which will rarely be available. It held that taxing authorities are not required to put on blinkers and look only at the documents produced; they are entitled to look into the surrounding circumstances to find out the reality, and must act on a test of human probabilities. The Court observed that self-serving recitals in documents are of limited value where the story they support runs contrary to ordinary conduct, and that an assessee who advances an improbable account must expect it to be scrutinised. It cautioned that the authorities must not act on mere suspicion and must confront the assessee with the circumstances relied on, but held that a claim which no reasonable person would accept does not become acceptable because it has been reduced to writing.",
    principles: [
      "An apparent state of affairs is treated as real, but the onus of showing otherwise may be discharged by improbability.",
      "Taxing authorities may look into surrounding circumstances to find the reality behind documents.",
      "Self-serving recitals carry limited weight where the account runs contrary to ordinary conduct.",
      "Authorities must not act on suspicion alone and must confront the assessee with the circumstances relied on.",
    ],
    relevance:
      "Applied under Section 102 of the IT Act 2025 and across the Act wherever genuineness is in issue. Together with Sumati Dayal it forms the evidentiary framework for cash credit and unexplained income disputes, and the reasoning extends well beyond that context — to sham transactions, benami arrangements and the substance-over-form analysis in avoidance cases.",
    keywords: [
      "apparent versus real",
      "surrounding circumstances",
      "human probabilities",
      "self-serving recitals",
      "genuineness",
      "onus",
      "benami",
    ],
  },
  {
    slug: "nra-iron-steel-share-capital",
    caseName: "PCIT v. NRA Iron & Steel Pvt Ltd",
    citation: "(2019) 412 ITR 161 (SC)",
    court: "Supreme Court",
    year: 2019,
    category: "Cash Credits & Unexplained Income",
    section1961: "Section 68",
    section2025: "Section 102",
    sectionTopic: "Unexplained cash credits",
    issue:
      "What must a company establish to discharge its burden in respect of share capital received at a premium from investor entities?",
    held:
      "Identity alone is not enough. The company must establish the identity of the investors, their creditworthiness, and the genuineness of the transaction. Where investors are non-existent or lack means, the credits may be assessed as the company's income.",
    facts:
      "The assessee company received substantial share capital at a high premium from a number of investor companies. It produced their names, addresses, permanent account numbers, incorporation particulars, bank statements showing the payments, and confirmations. On enquiry the Assessing Officer found that several investors could not be located at the addresses given, that others had negligible income and no creditworthiness to support investments of the size claimed, and that in some cases funds had been deposited in the investors' accounts immediately before being transferred to the assessee. No justification was offered for the high premium at which shares in a company of the assessee's standing had been subscribed.",
    proceduralHistory:
      "The Commissioner (Appeals), the Tribunal and the High Court all decided in the assessee's favour, holding the initial burden discharged by the documents produced. The Revenue appealed to the Supreme Court, which reversed.",
    contentions: {
      assessee:
        "The identity of each investor was established by incorporation and tax records, and the payments were made through banking channels and confirmed. Once that material is produced the initial burden is discharged, and if the Revenue doubts the investors it must proceed against them rather than against the recipient company.",
      revenue:
        "Producing names and bank entries establishes only that money moved. Where investors cannot be found, have no means to invest, and their accounts are funded immediately before the transfer, the material does not establish creditworthiness or genuineness, which the provision separately requires.",
    },
    summary:
      "The Court restated the three requirements the assessee must satisfy: the identity of the creditor or investor, the creditworthiness of that person, and the genuineness of the transaction. It held that these are cumulative, and that establishing identity through incorporation and tax records does not by itself discharge the burden. On creditworthiness, the Court held that the assessee must show that the investors had the financial capacity to make investments of the size in question, and that entities with negligible income or assets do not acquire capacity merely because money passed through their accounts. On genuineness, it held that routing funds through banking channels is not conclusive, particularly where accounts are credited immediately before the transfer in a manner suggesting that the source lies elsewhere. The Court laid weight on the failure to explain the high premium, observing that an unexplained premium in a company without a commensurate record is itself a circumstance calling for scrutiny. It held that the appellate authorities had erred in treating the documentary material as sufficient without examining these elements, and restored the addition.",
    principles: [
      "The assessee must establish identity, creditworthiness and genuineness cumulatively.",
      "Incorporation and tax records establish identity but not creditworthiness.",
      "Payment through banking channels is not conclusive of genuineness.",
      "Investors with negligible means do not acquire capacity because funds passed through their accounts.",
      "An unexplained share premium is a circumstance calling for scrutiny.",
    ],
    relevance:
      "Unexplained credits are dealt with in Section 102 of the IT Act 2025 and taxed at the special rate in Section 195, without the benefit of any deduction or set off. Note that the statutory burden in relation to share capital received by a closely held company has been tightened, requiring the source of the investor's own funds to be explained as well. NRA Iron & Steel is the leading authority on the standard of proof and is applied extensively to share capital, premium and unsecured loan additions.",
    keywords: [
      "share capital",
      "share premium",
      "creditworthiness",
      "genuineness",
      "identity",
      "68",
      "shell companies",
      "source of source",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // GENERAL PRINCIPLES
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "vatika-township-retrospectivity",
    caseName: "CIT v. Vatika Township Pvt Ltd",
    citation: "(2014) 367 ITR 466 (SC)",
    court: "Supreme Court",
    year: 2014,
    category: "General Principles",
    section1961: "Principle of statutory interpretation — applies across the Act",
    section2025: "Applies across the IT Act 2025",
    sectionTopic:
      "Prospective and retrospective operation of fiscal legislation",
    issue:
      "When does an amendment to a fiscal statute operate retrospectively, and who bears the burden of showing that it does?",
    held:
      "The presumption is against retrospectivity. An amendment imposing a new burden operates prospectively unless the legislature clearly provides otherwise; only a clarificatory or beneficial provision that creates no new liability may be applied to earlier periods.",
    facts:
      "The dispute concerned whether a surcharge introduced by an amendment applied to a period before the amendment took effect. The Revenue contended that the amendment merely clarified the existing position and therefore governed earlier years. Because conflicting approaches to retrospectivity had emerged in a number of decisions, the matter was placed before a Constitution Bench, which took the opportunity to restate the governing principles comprehensively.",
    proceduralHistory:
      "A five-judge Constitution Bench of the Supreme Court heard the matter and reconsidered an earlier decision that had been read as supporting retrospective application.",
    contentions: {
      assessee:
        "Legislation is presumed to operate prospectively. A provision that increases the burden on the taxpayer cannot be applied to transactions already completed, since taxpayers arrange their affairs by reference to the law in force at the time. Describing an amendment as clarificatory does not make it so.",
      revenue:
        "The amendment did not create a new levy but removed doubt about what the law had always required. A clarificatory provision is declaratory in nature and takes effect from the date the provision it clarifies was introduced.",
    },
    summary:
      "The Constitution Bench grounded the presumption against retrospectivity in fairness. Legislation that affects vested rights or imposes new obligations is presumed to be prospective because people regulate their affairs on the basis of the law as it stands, and it would be unjust to alter the consequences of completed transactions after the event. The Court held that this presumption is displaced only where the legislature has made its intention clear, either expressly or by necessary implication, and that the burden of establishing retrospective operation lies on the party asserting it. It drew a distinction between two categories: provisions that impose a new liability or enlarge an existing one, which must be prospective unless clearly stated otherwise; and provisions that are genuinely clarificatory or that confer a benefit while creating no new burden, which may be applied to earlier periods. Crucially, the Court held that the label the legislature or the Revenue attaches is not decisive — whether a provision is clarificatory is determined by examining what it actually does, and a provision that changes the law cannot be made retrospective by calling it a clarification.",
    principles: [
      "Legislation is presumed to operate prospectively; the presumption rests on fairness.",
      "A provision imposing or enlarging a liability operates prospectively unless clearly stated otherwise.",
      "The burden of establishing retrospective operation lies on the party asserting it.",
      "A genuinely clarificatory or beneficial provision creating no new burden may apply to earlier periods.",
      "The label attached is not decisive; what the provision actually does determines its character.",
    ],
    relevance:
      "A principle of general application rather than a provision-specific holding, and directly relevant to the transition to the IT Act 2025, where the characterisation of changes as clarifying or altering the earlier position will arise repeatedly. It is the authority relied on in every dispute over retrospective amendments, and it underpins decisions such as New Skies Satellite, which refused to let a retrospective domestic amendment rewrite a treaty term.",
    keywords: [
      "retrospectivity",
      "prospective operation",
      "clarificatory amendment",
      "declaratory provision",
      "vested rights",
      "Constitution Bench",
      "fairness",
    ],
  },
  {
    slug: "mcdowell-colourable-device",
    caseName: "McDowell & Co Ltd v. Commercial Tax Officer",
    citation: "(1985) 154 ITR 148 (SC)",
    court: "Supreme Court",
    year: 1985,
    category: "GAAR & Anti-Avoidance",
    section1961: "Principle concerning tax avoidance — applies across the Act",
    section2025: "Applies across the IT Act 2025",
    sectionTopic: "Tax planning, avoidance and colourable devices",
    issue:
      "How far may a taxpayer arrange its affairs to reduce tax, and when will the courts decline to give effect to the arrangement?",
    held:
      "Legitimate tax planning within the law is permissible, but colourable devices and dubious methods adopted to avoid tax are not. The substance of an arrangement may be examined rather than accepting its form.",
    facts:
      "The case arose in the context of excise duty on liquor and whether duty paid directly by buyers to the authorities formed part of the assessee manufacturer's turnover for sales tax. The arrangement had been structured so that the duty was discharged by purchasers rather than by the manufacturer, with the object of keeping it outside the taxable turnover. The Court considered the arrangement and, in doing so, addressed the broader question of how the law should regard schemes designed to reduce tax.",
    proceduralHistory:
      "The matter was decided by a Constitution Bench of the Supreme Court. The leading judgment and a separate concurring judgment expressed the position on avoidance in different terms, which has shaped the debate ever since.",
    contentions: {
      assessee:
        "A taxpayer is entitled to arrange its affairs so that the tax attaching is less than it otherwise would be, and there is no obligation to structure transactions so as to maximise the revenue. So long as the arrangement is lawful, the authorities must give effect to it as made.",
      revenue:
        "The arrangement had no commercial purpose beyond reducing the tax burden, and its form did not reflect its substance. The authorities should be entitled to look at what was actually achieved rather than the structure adopted to describe it.",
    },
    summary:
      "The Court held that the arrangement in question did not succeed on its own terms, and went on to address avoidance more broadly. The leading judgment held that tax planning may be legitimate provided it is within the framework of the law, but that colourable devices cannot be part of tax planning, and it is wrong to encourage the belief that it is honourable to avoid payment of tax by resorting to dubious methods. The separate concurring judgment went further in criticising avoidance schemes and urged that they be judged by their substance rather than their form. The relationship between the two judgments, and the extent to which they displaced the older principle that a taxpayer may lawfully arrange its affairs, generated extensive debate in later cases. That debate was substantially settled in Vodafone, where the Court clarified that McDowell does not condemn legitimate tax planning: the distinction is between a genuine arrangement having commercial substance, which must be respected, and a preordained scheme inserted with no purpose other than avoidance, which may be disregarded.",
    principles: [
      "Legitimate tax planning within the framework of the law is permissible.",
      "Colourable devices and dubious methods adopted to avoid tax are not tax planning.",
      "The substance of an arrangement may be examined rather than its form accepted at face value.",
      "As clarified in Vodafone, genuine arrangements with commercial substance are respected; preordained schemes without purpose are not.",
    ],
    relevance:
      "The foundation of India's judicial approach to avoidance, and the backdrop against which the general anti-avoidance rules were enacted. Those statutory rules now supply the operative test — impermissible avoidance arrangements, main purpose, lack of commercial substance — so McDowell is the origin of the doctrine rather than the current mechanism. It must be read with Vodafone and Azadi Bachao, which mark the boundary between planning and avoidance.",
    keywords: [
      "tax avoidance",
      "tax planning",
      "colourable device",
      "substance over form",
      "GAAR",
      "commercial substance",
      "preordained scheme",
    ],
  },
  {
    slug: "radhasoami-satsang-consistency",
    caseName: "Radhasoami Satsang v. CIT",
    citation: "(1992) 193 ITR 321 (SC)",
    court: "Supreme Court",
    year: 1992,
    category: "General Principles",
    section1961: "Principle of consistency — applies across the Act",
    section2025: "Applies across the IT Act 2025",
    sectionTopic:
      "Consistency of treatment across assessment years",
    issue:
      "Where a fundamental position has been accepted by the Revenue over many years, may it be departed from in a later year without any change in facts or law?",
    held:
      "Ordinarily not. Although each assessment year is a separate unit and res judicata does not strictly apply, a fundamental aspect permeating different years that has been accepted should not be changed absent a material alteration in facts or law.",
    facts:
      "The assessee was a religious institution whose income had been treated as exempt for a long series of assessment years, the Revenue having accepted in earlier proceedings that the properties were held under trust for religious and charitable purposes. In the years in question the Revenue sought to depart from that settled treatment and tax the income, without pointing to any change in the constitution of the institution, the nature of its activities, or the governing law.",
    proceduralHistory:
      "The matter reached the Supreme Court, which examined how far the principle that each assessment year is a separate unit permits the Revenue to unsettle a position consistently accepted.",
    contentions: {
      assessee:
        "The character of the institution and the basis on which its income was held exempt had been examined and accepted, and nothing had changed. Reopening a settled foundational position after many years, without any alteration in facts or law, produces uncertainty and is unfair to a taxpayer who has ordered its affairs accordingly.",
      revenue:
        "Each assessment year is a separate unit of assessment and the doctrine of res judicata does not apply to tax proceedings. An erroneous view taken in earlier years cannot bind the authorities for all time, and they are entitled to apply the correct legal position in any year.",
    },
    summary:
      "The Court accepted the settled proposition that each assessment year is a separate unit and that the strict rule of res judicata does not apply to income tax proceedings, so a decision in one year does not operate as a binding adjudication for another. It held, however, that this does not mean that a position may be unsettled at will. Where a fundamental aspect permeating through different assessment years has been found as a fact one way or the other, and parties have allowed that position to be sustained by not challenging it over a period, it is not appropriate to allow the position to be changed in a subsequent year unless there is a material change in the facts or in the law. The Court reasoned that consistency and certainty are values of importance in the administration of a fiscal statute, and that taxpayers order their affairs on the footing of positions the Revenue has accepted. It confined the principle carefully: it does not prevent the Revenue from correcting its approach where circumstances have altered or where a superior court has laid down a different legal position, and it operates on fundamental aspects rather than on every item of computation.",
    principles: [
      "Each assessment year is a separate unit and res judicata does not strictly apply.",
      "A fundamental aspect permeating different years, once accepted, should not be changed without cause.",
      "A material change in facts or law is required before a settled position is departed from.",
      "Consistency and certainty are values of importance in administering a fiscal statute.",
      "The principle applies to fundamental aspects, not to every item of computation.",
    ],
    relevance:
      "A principle of general application, invoked across the IT Act 2025 wherever the Revenue departs from a treatment it has long accepted — the characterisation of an activity, the head under which income falls, the status of an entity, or the method of accounting followed. It carries particular weight in transfer pricing and in charitable trust matters, where the same fundamental characterisation recurs year after year, and it was applied in Excel Industries to resist a change in the year of taxability.",
    keywords: [
      "consistency",
      "res judicata",
      "fundamental aspect",
      "separate assessment year",
      "settled position",
      "certainty",
      "change in facts or law",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TRUSTS, FUNDS & PASS-THROUGH VEHICLES
  //
  // Business trusts (REITs and InvITs), investment funds (AIFs),
  // securitisation trusts and venture capital funds are taxed under a
  // statutory pass-through regime — Sections 221 to 224 of the IT Act 2025.
  // That regime is recent and has attracted little direct litigation. The
  // judgments below supply the trust-taxation law on which these vehicles
  // are built, and which continues to govern questions the pass-through
  // provisions do not answer.
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "nizam-family-trust-representative",
    caseName:
      "CWT v. Trustees of HEH Nizam's Family (Remainder Wealth) Trust",
    citation: "(1977) 108 ITR 555 (SC)",
    court: "Supreme Court",
    year: 1977,
    category: "Trusts, Funds & Pass-Through Vehicles",
    section1961: "Sections 160 & 161 (and the wealth tax analogue)",
    section2025: "Sections 303 & 304",
    sectionTopic:
      "Representative assessees; liability of a representative assessee",
    issue:
      "When a trustee is assessed in respect of trust property, is the assessment made on the trustee in its own right, or in a representative capacity standing in the shoes of the beneficiary?",
    held:
      "In a representative capacity. The liability of the trustee is coextensive with, and no greater or less than, that of the beneficiary. The trustee is assessed in the same manner and to the same extent as the person represented.",
    facts:
      "Trusts had been created by the Nizam under which trustees held property for the benefit of identified beneficiaries whose interests arose at different times, some being in possession and others holding remainder interests. The Revenue assessed the trustees, and questions arose as to the basis on which that assessment should proceed — in particular whether the trustees were to be taxed as a separate taxable entity on the whole of the trust property, or whether the assessment had to be made by reference to the individual beneficiaries and their respective interests.",
    proceduralHistory:
      "The matter reached the Supreme Court, which examined the scheme of representative assessment and its application where multiple beneficiaries hold interests of differing character in the same trust property.",
    contentions: {
      assessee:
        "A trustee holds property for others and has no beneficial interest of its own. The statutory scheme makes the trustee a representative assessee, and an assessment in that capacity must mirror what could have been made on the beneficiary — same measure, same rate, same exemptions. It cannot become a means of taxing the fund as a single entity at a higher burden than the beneficiaries would bear.",
      revenue:
        "The trustees hold and manage the property as a single fund and are the persons in whom it is vested. Assessing them on the fund as a whole is administratively straightforward and is what the charging provisions contemplate where the property is held by them.",
    },
    summary:
      "The Court held that the scheme of representative assessment does not create a new or independent charge. A trustee assessed in respect of trust property is assessed in a representative capacity, standing in the place of the beneficiary, and the assessment must be made in the same manner and to the same extent as it would be on the beneficiary directly. The liability of the representative assessee is therefore coextensive with that of the person represented — neither greater nor less. It follows that the character of the beneficiary's interest, the exemptions and reliefs available to that beneficiary, and the rate applicable to that beneficiary all carry through to the assessment on the trustee. The Court held that where several beneficiaries hold distinct interests, the assessment must reflect those separate interests rather than treating the fund as a single undifferentiated whole, because each assessment on the trustee is in substance an assessment referable to a particular beneficiary. The representative machinery is a means of collection directed at the person in whose hands the property lies; it is not a device for taxing the fund as an entity in its own right.",
    principles: [
      "A trustee assessed in respect of trust property is assessed in a representative capacity.",
      "The liability of a representative assessee is coextensive with that of the person represented.",
      "The assessment must be made in the same manner and to the same extent as on the beneficiary.",
      "Exemptions, reliefs and rates available to the beneficiary carry through to the representative assessment.",
      "Representative assessment is a mode of collection, not a separate charge on the fund as an entity.",
    ],
    relevance:
      "The foundation of the pass-through concept, now in Sections 303 and 304 of the IT Act 2025. The statutory regimes for business trusts, investment funds, securitisation trusts and venture capital funds in Sections 221 to 224 codify a similar idea — that income is taxed in the hands of the unit holder or contributor rather than being trapped in the vehicle. Where those provisions leave a gap, this coextensive-liability principle is the default against which the position is assessed.",
    keywords: [
      "representative assessee",
      "trustee",
      "coextensive liability",
      "pass-through",
      "beneficiary",
      "160",
      "161",
    ],
  },
  {
    slug: "marsons-beneficiary-trust",
    caseName: "Marsons Beneficiary Trust v. CIT",
    citation: "(1990) 188 ITR 224 (Bom)",
    court: "Bombay High Court",
    year: 1990,
    category: "Trusts, Funds & Pass-Through Vehicles",
    section1961: "Sections 161 & 164",
    section2025: "Sections 304 & 307",
    sectionTopic:
      "Liability of a representative assessee; charge of tax where the share of beneficiaries is unknown",
    issue:
      "When is a trust determinate, so that income is taxed at the rates applicable to the beneficiaries, rather than indeterminate and taxed at the maximum marginal rate?",
    held:
      "A trust is determinate where the beneficiaries and their shares are capable of being ascertained from the trust deed at the date it takes effect. It is not necessary that they be named, nor that the shares be quantified in money terms.",
    facts:
      "The trust deed identified the persons who were to benefit and set out the basis on which the trust fund and its income were to be divided among them. The beneficiaries were described by reference to a class and a formula rather than being individually named with rupee amounts against each. The Revenue took the view that because the deed did not name each beneficiary and specify a fixed share, the shares were indeterminate or unknown, and assessed the trust at the maximum marginal rate under the provision applicable to such trusts.",
    proceduralHistory:
      "The matter came before the Bombay High Court, which examined what degree of specificity the statutory test requires before a trust will be treated as determinate.",
    contentions: {
      assessee:
        "The deed enabled the beneficiaries and their respective shares to be worked out with certainty. The law requires that the shares be capable of being ascertained, not that they be spelled out in figures. A requirement of individual naming and rupee quantification would defeat the ordinary working of trusts, where beneficiaries are commonly described by class and shares by proportion.",
      revenue:
        "The provision charging tax at the maximum marginal rate applies wherever the individual shares of the beneficiaries are indeterminate or unknown. Unless the deed identifies each beneficiary and states that beneficiary's share, the condition is satisfied and the higher rate follows.",
    },
    summary:
      "The Court held that the statutory question is whether the beneficiaries and their shares are capable of being ascertained, not whether the trust deed happens to state them expressly. If the deed supplies the material from which the beneficiaries can be identified and their shares worked out — by describing a class with sufficient precision, or by prescribing a formula or proportion — the trust is determinate, and the fact that ascertainment requires a computation does not make the shares unknown. The Court emphasised that certainty is tested as at the date the trust deed takes effect, by reference to the deed itself, and that a trust does not become indeterminate merely because the identity of the persons falling within a described class may change over time or because the monetary value of a share depends on the size of the fund. It held that the provision charging the maximum marginal rate is directed at genuinely discretionary or unascertainable arrangements, where it cannot be said who is entitled to what, and is not to be applied to a trust whose terms permit the entitlements to be determined.",
    principles: [
      "The test is whether beneficiaries and their shares are capable of being ascertained, not whether they are expressly stated.",
      "Beneficiaries may be described by class and shares by proportion or formula.",
      "Certainty is tested as at the date the trust deed takes effect, by reference to the deed.",
      "A need to compute the share does not make it unknown.",
      "The maximum marginal rate is directed at genuinely discretionary or unascertainable arrangements.",
    ],
    relevance:
      "The determinate-versus-indeterminate distinction, now reflected in Sections 304 and 307 of the IT Act 2025, is the central question for every pooled vehicle constituted as a trust. Venture capital funds, alternative investment funds and securitisation trusts are routinely tested against it, since a finding that the trust is indeterminate would tax the fund at the maximum marginal rate and defeat the pass-through. Fund documentation is drafted with this test squarely in view.",
    keywords: [
      "determinate trust",
      "indeterminate trust",
      "maximum marginal rate",
      "beneficiaries ascertainable",
      "164",
      "trust deed",
      "class of beneficiaries",
    ],
  },
  {
    slug: "kamalini-khatau-discretionary-trust",
    caseName: "CIT v. Kamalini Khatau",
    citation: "(1994) 209 ITR 101 (SC)",
    court: "Supreme Court",
    year: 1994,
    category: "Trusts, Funds & Pass-Through Vehicles",
    section1961: "Sections 161 & 164",
    section2025: "Sections 304 & 307",
    sectionTopic:
      "Liability of a representative assessee; charge of tax where the share of beneficiaries is unknown",
    issue:
      "Where a discretionary trust distributes income to a beneficiary, may the Revenue assess that beneficiary, or must it assess the trustee alone?",
    held:
      "The Revenue may assess either. Where income of a discretionary trust has in fact been distributed to a beneficiary, it may be assessed in that beneficiary's hands, and the provision charging the trustee does not confer immunity on the recipient.",
    facts:
      "Income arising to a discretionary trust was distributed by the trustees to a beneficiary in exercise of their discretion. The Revenue assessed the beneficiary on the amount received. The beneficiary contended that the statutory scheme for discretionary trusts places the charge on the trustee, to be levied at the maximum marginal rate, and that once the statute has designated the trustee as the person chargeable, the same income cannot be assessed in the hands of the recipient.",
    proceduralHistory:
      "The question reached the Supreme Court, which decided it by majority, with a dissenting opinion taking the view that the charge on the trustee was exclusive.",
    contentions: {
      assessee:
        "The provision dealing with trusts whose beneficiaries' shares are unknown makes the tax leviable on the trustee, and prescribes the rate. That is a complete code for discretionary trusts. Permitting assessment of the beneficiary as well leaves the taxpayer exposed to assessment at two ends on the same income and is not what the scheme contemplates.",
      revenue:
        "The representative assessment provisions are machinery for collecting tax from the person in whose hands income lies; they do not displace the ordinary charge on the person who actually receives and enjoys the income. Where a beneficiary has in fact received a distribution, that receipt is income in the beneficiary's hands and is chargeable.",
    },
    summary:
      "The majority held that the provisions dealing with representative assessment are machinery provisions and do not exhaust the Revenue's power to assess the person who actually receives the income. Where the trustees of a discretionary trust have exercised their discretion and distributed income to a beneficiary, that beneficiary has received income which is chargeable in the ordinary way, and the existence of a provision permitting the trustee to be assessed does not confer immunity on the recipient. The Court reasoned that the representative machinery exists for the Revenue's benefit, to enable collection where income is held by one person for another, and that it would be an odd result if machinery designed to assist collection operated to exclude assessment of the person who has actually enjoyed the income. The majority accordingly held that the Revenue has an option in such a case. It was careful to record that the same income cannot be taxed twice: assessment of one forecloses recovery from the other, and the option is as to whom the Revenue proceeds against, not a licence to collect the tax twice over.",
    principles: [
      "Representative assessment provisions are machinery and do not displace the ordinary charge on the recipient.",
      "Income of a discretionary trust actually distributed may be assessed in the beneficiary's hands.",
      "The provision charging the trustee does not confer immunity on the recipient.",
      "The Revenue has an option as to whom it assesses, but the same income cannot be taxed twice.",
    ],
    relevance:
      "Relevant to Sections 304 and 307 of the IT Act 2025 and to every discretionary pooling structure. Read against Ch. Atchaiah, which holds that the Assessing Officer must tax the right person and has no general option: the two are reconciled on the footing that the representative provisions create a specific statutory alternative for trusts, which the general rule does not override. Where a fund's documentation confers genuine discretion on the manager, this line of authority governs who bears the charge.",
    keywords: [
      "discretionary trust",
      "option to assess",
      "trustee or beneficiary",
      "machinery provision",
      "distribution",
      "164",
      "double taxation",
    ],
  },
  {
    slug: "ch-atchaiah-right-person",
    caseName: "ITO v. Ch. Atchaiah",
    citation: "(1996) 218 ITR 239 (SC)",
    court: "Supreme Court",
    year: 1996,
    category: "Trusts, Funds & Pass-Through Vehicles",
    section1961: "Sections 4 & 160",
    section2025: "Sections 4 & 303",
    sectionTopic:
      "Charge of income-tax; representative assessees",
    issue:
      "Where income may arguably be assessed either in the hands of an association or in the hands of its members, does the Assessing Officer have an option as to whom to tax?",
    held:
      "No. Under the 1961 Act the Assessing Officer must tax the right person, and only the right person. The option that existed under the 1922 Act was deliberately removed, so an assessment on the wrong person is not saved by the availability of an alternative.",
    facts:
      "Income had arisen from an activity carried on jointly by several persons. The question was whether it fell to be assessed in the hands of the association formed by them or in the hands of the individual members according to their shares. Under the predecessor legislation the Assessing Officer had an express option to assess either the association or its members. The successor legislation did not carry that language forward, and the Revenue nonetheless proceeded on the footing that the option survived.",
    proceduralHistory:
      "The matter came before the Supreme Court, which compared the language of the two statutes and resolved a conflict on whether the option had been preserved by implication.",
    contentions: {
      assessee:
        "The words conferring an option in the earlier statute were dropped when the present Act was enacted. That omission must be given effect: Parliament having removed a power expressly conferred earlier, it cannot be read back in. The officer must determine who is properly chargeable and assess that person.",
      revenue:
        "The change in language was not intended to alter the substance. Where income is genuinely capable of being assessed in either set of hands, the officer should retain the flexibility to choose, and nothing in the new Act expressly forbids it.",
    },
    summary:
      "The Court compared the two statutes and held that the omission of the words conferring an option was deliberate and decisive. Under the earlier Act the Assessing Officer was expressly empowered to assess either the association or its members; the present Act contains no such words, and the Court held that the power cannot be restored by construction. The officer is therefore required to determine who is the right person to be taxed in respect of the income in question, and to assess that person and no other. The Court held that assessing the wrong person is not cured by the fact that the income was in some sense assessable elsewhere; an assessment on a person not properly chargeable is simply bad. It observed that the scheme requires the officer to apply his mind to the correct identification of the taxable entity rather than to choose whichever assessment is administratively convenient or produces more revenue, and that this discipline is an important protection for taxpayers where income passes through intermediate entities.",
    principles: [
      "The Assessing Officer must tax the right person and only the right person.",
      "The option expressly conferred by the earlier statute was deliberately omitted and cannot be read back.",
      "An assessment on the wrong person is not saved because the income was assessable elsewhere.",
      "The officer must identify the correct taxable entity rather than choose for convenience.",
    ],
    relevance:
      "Directly relevant to pooled vehicles, where the recurring question is whether income is chargeable in the vehicle or in the hands of unit holders and contributors. Under the IT Act 2025 that question is largely answered by the pass-through regime in Sections 221 to 224, which designates who is chargeable. Where a vehicle falls outside those provisions — a fund not registered in the required category, for instance — this decision requires the correct person to be identified rather than the more convenient one assessed. Reconcile with Kamalini Khatau, which recognises a specific statutory alternative for trusts.",
    keywords: [
      "right person",
      "no option",
      "association of persons",
      "members",
      "correct taxable entity",
      "wrong assessment",
      "pass-through",
    ],
  },
  {
    slug: "india-advantage-fund-vcf",
    caseName: "CIT v. India Advantage Fund-VII",
    citation: "Karnataka High Court (2015)",
    court: "Karnataka High Court",
    year: 2015,
    category: "Trusts, Funds & Pass-Through Vehicles",
    section1961: "Sections 10(23FB), 115U, 161 & 164",
    section2025: "Sections 222, 304 & 307",
    sectionTopic:
      "Tax on income in the case of a venture capital undertaking; liability of a representative assessee; charge where shares are unknown",
    issue:
      "Is a SEBI-registered venture capital fund constituted as a trust, whose contributors are identifiable from its records, a determinate trust whose income is taxable in the contributors' hands?",
    held:
      "Yes. Where the contributors and their proportionate interests can be ascertained, the trust is determinate. Income is assessable in the contributors' hands and the fund is not chargeable at the maximum marginal rate.",
    facts:
      "The assessee was a venture capital fund registered with the securities regulator and constituted as a contributory trust. Investors subscribed to units and their contributions, and the proportion each bore to the total, were recorded in the fund's registers and in the contribution agreements, though the trust deed itself did not name them. The Revenue took the view that because the beneficiaries were not named in the deed and could change as units were issued and transferred, their shares were indeterminate, and assessed the fund at the maximum marginal rate as an indeterminate trust rather than treating the income as passing through to the contributors.",
    proceduralHistory:
      "The Tribunal decided in the fund's favour, holding the trust to be determinate. The Revenue appealed to the Karnataka High Court, which affirmed. Similar questions arose across a number of funds in the same group and were decided on the same reasoning.",
    contentions: {
      assessee:
        "Every contributor was identifiable and each one's proportionate interest in the fund was ascertainable from the contribution agreements and the register of unit holders. The statutory test asks whether the beneficiaries and their shares are capable of being ascertained, and they plainly were. The regulatory framework governing venture capital funds and the pass-through provision both proceed on the footing that income reaches the investors.",
      revenue:
        "The trust deed did not name the beneficiaries or state their shares, and the composition of the investor body could change over the life of the fund. On the face of the constituting instrument, therefore, the shares were indeterminate, and the provision charging the maximum marginal rate applied.",
    },
    summary:
      "The Court applied the settled test of whether the beneficiaries and their shares were capable of being ascertained, and held that they were. The contributors were identified in the contribution agreements and the fund's records, and the proportion of each investor's interest followed arithmetically from the amount contributed relative to the total. That the trust deed did not name them individually was held not to matter, since the deed together with the documents it contemplated supplied the means of ascertainment. The Court held that the possibility of the investor body changing over time does not render a trust indeterminate, because the test is one of ascertainability rather than immutability, and at any given time the entitlements could be worked out with precision. It also had regard to the statutory and regulatory scheme for venture capital funds, which is built on the premise that income earned by the fund is passed through to and taxed in the hands of investors, and held that treating such a fund as an indeterminate trust would be inconsistent with that premise. The income was accordingly assessable in the contributors' hands.",
    principles: [
      "Contributors identifiable from contribution agreements and registers satisfy the ascertainability test.",
      "Beneficiaries need not be named in the trust deed itself if the deed supplies the means of ascertainment.",
      "A changing investor body does not make a trust indeterminate; the test is ascertainability, not immutability.",
      "The statutory pass-through scheme for venture capital funds assumes income is taxed in investors' hands.",
    ],
    relevance:
      "The most directly relevant judicial authority on pooled fund vehicles, applying to Section 222 of the IT Act 2025 for venture capital undertakings and, by the same reasoning, to investment funds under Section 224 and business trusts under Section 223. The statutory pass-through provisions have since reduced the scope for this dispute by designating who is chargeable, but the determinate-trust analysis remains the fallback wherever a vehicle falls outside the conditions those provisions impose. Verify the precise citation before relying on it in a filing.",
    keywords: [
      "venture capital fund",
      "VCF",
      "determinate trust",
      "contributors",
      "pass-through",
      "maximum marginal rate",
      "115U",
      "AIF",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // INTERNATIONAL TAXATION — indirect transfers, treaty benefits and PE
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "tiger-global-mauritius-grandfathering",
    caseName:
      "Tiger Global International II Holdings v. Authority for Advance Rulings",
    citation: "(2024) 464 ITR 1 (Del)",
    court: "Delhi High Court",
    year: 2024,
    category: "International Tax",
    section1961: "Sections 9(1)(i), 90 & 96",
    section2025: "Sections 9, 159 & 178",
    sectionTopic:
      "Income deemed to accrue or arise in India; double taxation relief; applicability of the General Anti-Avoidance Rule",
    issue:
      "Can treaty grandfathering for investments made before 1 April 2017 be denied on the footing that the Mauritius holding structure was designed to obtain treaty benefits, and may the authority look behind a valid tax residency certificate to do so?",
    held:
      "No. Grandfathering under the protocol protects investments acquired before the cut-off date and cannot be withheld by characterising the structure as designed for treaty benefit. A valid residency certificate cannot be brushed aside, and avoidance must be established through the proper statutory route.",
    facts:
      "Mauritius-incorporated entities within the Tiger Global group held shares in a Singapore company which in turn held the Indian operating business. In 2018 those shares were sold as part of the acquisition of the group by a large retailer. The entities applied to the Authority for Advance Rulings for a determination that the gains were exempt, relying on the capital gains article of the India–Mauritius treaty together with the protocol grandfathering investments acquired before 1 April 2017. They held valid tax residency certificates issued by the Mauritius authorities. The Authority declined relief, taking the view that the Mauritius entities were interposed without commercial substance, that real control lay with the group's United States management, and that the arrangement was designed prima facie for the avoidance of tax.",
    proceduralHistory:
      "The applicants challenged the Authority's ruling by writ petition before the Delhi High Court, which set the ruling aside and held the applicants entitled to the treaty benefit.",
    contentions: {
      assessee:
        "The shares had been acquired well before the cut-off date and the protocol expressly grandfathers such investments; that protection was the very assurance on which the investment was made. Valid residency certificates had been issued, and the Board's own circulars direct that such certificates be accepted. If the Revenue considers the arrangement abusive, the statute supplies a general anti-avoidance mechanism with its own safeguards and approval process, which was not invoked.",
      revenue:
        "The Mauritius entities had no employees, no independent decision-making and negligible presence, and every commercial decision was taken by the group's principals abroad. Treaty benefits are intended for genuine residents, and an arrangement whose only purpose is to access the treaty may be denied relief on the footing that it is prima facie designed for avoidance.",
    },
    summary:
      "The Court held that the Authority had approached the matter incorrectly at several levels. On grandfathering, it held that the protocol's protection for investments acquired before the cut-off date is a deliberate and negotiated assurance, extended so that investors who committed capital under the earlier regime would not be affected by the renegotiation. To deny that protection by reasoning that the structure exists to obtain treaty benefits would deprive the grandfathering clause of content, since every investment it protects was made through the treaty jurisdiction. On the residency certificate, the Court applied the established line of authority holding that such a certificate is sufficient evidence of residence and beneficial ownership, that Board circulars to that effect bind the Revenue, and that an authority cannot go behind it on an impressionistic assessment of substance. On avoidance, the Court held that where the Revenue considers an arrangement impermissible, the statute provides a general anti-avoidance mechanism subject to defined conditions, a specified approval process and prescribed safeguards; a finding of avoidance cannot be arrived at outside that framework merely by invoking the language of design and purpose. The ruling was accordingly quashed.",
    principles: [
      "Treaty grandfathering for pre-cut-off investments is a negotiated assurance and cannot be withheld by characterising the structure as treaty-motivated.",
      "A valid tax residency certificate is sufficient evidence of residence and beneficial ownership and binds the Revenue through its own circulars.",
      "Substance cannot be assessed impressionistically to defeat an express treaty protection.",
      "Where avoidance is alleged, the general anti-avoidance mechanism with its conditions and safeguards is the route, not a finding made outside it.",
    ],
    relevance:
      "The leading recent authority on Mauritius and Singapore treaty structures holding grandfathered investments, which remain substantial in Indian private equity and venture capital. Under the IT Act 2025 the analysis runs through Section 9 for the indirect transfer charge, Section 159 for treaty relief, and Sections 178 to 184 for the general anti-avoidance rule. Its most practically important holding is the insistence that avoidance be pursued through the statutory anti-avoidance machinery rather than asserted at large. Read with Azadi Bachao and Blackstone Capital on residency certificates.",
    keywords: [
      "Tiger Global",
      "Mauritius treaty",
      "grandfathering",
      "tax residency certificate",
      "GAAR",
      "indirect transfer",
      "private equity",
      "advance ruling",
    ],
  },
  {
    slug: "hyatt-international-fixed-place-pe",
    caseName: "Hyatt International Southwest Asia Ltd v. ADIT",
    citation: "Supreme Court (2025)",
    court: "Supreme Court",
    year: 2025,
    category: "International Tax",
    section1961: "Sections 9 & 90",
    section2025: "Sections 9 & 159",
    sectionTopic:
      "Income deemed to accrue or arise in India; double taxation relief",
    issue:
      "Does a foreign hotel operator providing strategic oversight and operational services to Indian hotels have a fixed place permanent establishment, and can profits be attributed to it where the enterprise as a whole is loss-making?",
    held:
      "Yes on both counts. Continuous and pervasive operational control exercised through the hotel premises establishes a fixed place permanent establishment, and attribution to a profitable Indian establishment does not depend on the global profitability of the enterprise.",
    facts:
      "A UAE-resident company within an international hotel group entered into strategic oversight services agreements with Indian hotel owners. Under those agreements it was responsible for the strategic planning and operational policy of the hotels, including brand standards, pricing policy, marketing, procurement norms and the appointment and supervision of key personnel, in return for fees linked to revenue and profit. Its personnel visited India regularly and had access to the hotel premises in performing these functions, though the hotels themselves were owned by the Indian parties. The Revenue held that the company had a permanent establishment in India and attributed profits to it; the company contended that it merely rendered advisory services from abroad and that, in any event, it had incurred losses at the enterprise level.",
    proceduralHistory:
      "The matter was considered by a Full Bench of the Delhi High Court, which held that a permanent establishment existed, and came before the Supreme Court on appeal. The Supreme Court affirmed.",
    contentions: {
      assessee:
        "The hotels were owned and operated by the Indian parties, and the company had no premises of its own in India and no right of occupation. Its role was to provide strategic advice and brand standards, largely from outside India. Visits by personnel were periodic rather than continuous. Separately, where the enterprise as a whole has incurred a loss, there is no profit capable of being attributed to any establishment.",
      revenue:
        "The agreements gave the company pervasive control over how the hotels were run — from pricing and personnel to operating standards — and its personnel had continuous access to the premises to exercise that control. That is carrying on business through a place at its disposal. Attribution concerns the profits of the Indian operations, which were profitable, and is not governed by results elsewhere in the group.",
    },
    summary:
      "The Court examined the substance of the arrangements rather than their description as advisory services. It found that the agreements conferred on the company comprehensive authority over the conduct of the hotels — control over strategic and operational policy, the ability to direct staffing and standards, and a continuing right of access exercised by its personnel — and that the company earned its remuneration by reference to the revenues and profits generated. On that footing the hotel premises were a place through which the company carried on its own business, satisfying the disposal test for a fixed place permanent establishment. The Court held that the regularity and continuity of the presence, taken with the degree of control, was sufficient, and that the absence of exclusive possession or ownership of premises does not preclude a permanent establishment. On attribution, the Court held that once a permanent establishment exists and the Indian operations are profitable, the profits attributable to that establishment are taxable in India irrespective of losses incurred by the enterprise globally. The permanent establishment is treated as a distinct and separate enterprise, and its results are not netted against the worldwide position of the head office.",
    principles: [
      "Pervasive control over operations, exercised through premises with continuing access, establishes a fixed place permanent establishment.",
      "Exclusive possession or ownership of premises is not required for the disposal test to be satisfied.",
      "Regularity and continuity of presence, taken with the degree of control, may suffice even without a permanent office.",
      "Profits attributable to a profitable permanent establishment are taxable regardless of losses at the enterprise level globally.",
      "The permanent establishment is treated as a distinct and separate enterprise for attribution.",
    ],
    relevance:
      "A recent and significant addition to permanent establishment law under Sections 9 and 159 of the IT Act 2025, and the natural counterpoint to E-Funds and Morgan Stanley, where outsourcing and stewardship arrangements were held not to create one. The distinction lies in the degree of operational control: advisory input does not create a permanent establishment, but directing how a business is run, from premises to which the foreign enterprise has continuing access, does. It bears directly on hotel, retail and franchise management arrangements. Verify the citation before relying on it, as the decision is very recent.",
    keywords: [
      "fixed place PE",
      "hotel management",
      "strategic oversight",
      "operational control",
      "disposal test",
      "attribution",
      "global losses",
    ],
  },
  {
    slug: "sanofi-pasteur-indirect-transfer",
    caseName: "Sanofi Pasteur Holding SA v. Department of Revenue",
    citation: "(2013) 354 ITR 316 (AP)",
    court: "Andhra Pradesh High Court",
    year: 2013,
    category: "International Tax",
    section1961: "Sections 9(1)(i) & 90",
    section2025: "Sections 9 & 159",
    sectionTopic:
      "Income deemed to accrue or arise in India; double taxation relief",
    issue:
      "Where a French company acquires another French company whose principal asset is shares in an Indian company, is the gain taxable in India, and do retrospective amendments override the treaty?",
    held:
      "Not taxable in India. Under the treaty, gains from the alienation of shares are taxable only in the state of residence of the transferor. A genuine holding company with real investment purpose is not a device, and retrospective domestic amendments cannot override a treaty.",
    facts:
      "Two French shareholders held the entire capital of a French company which had been incorporated as a vehicle to hold and develop an investment in an Indian vaccine manufacturer. They sold their shares in the French holding company to another French pharmaceutical group. The Revenue treated the sale as an indirect transfer of the underlying Indian company, asserting that the French holding vehicle was interposed without substance and that the real subject matter of the sale was the Indian business. It relied additionally on retrospective amendments enacted after the Vodafone decision, which extended the deeming provision to shares deriving their value substantially from Indian assets.",
    proceduralHistory:
      "The transaction was challenged by writ petition before the High Court, which examined both the treaty position and the effect of the retrospective amendments, and decided in the taxpayer's favour.",
    contentions: {
      assessee:
        "What was sold was shares in a French company by French residents to a French buyer. The treaty allocates the right to tax gains from the alienation of shares to the state of residence of the transferor, so the gains were taxable in France alone. The holding company had been established years earlier for genuine investment reasons, had made and managed the investment, and was not a shell inserted for the transaction.",
      revenue:
        "The value of the French holding company lay wholly in the Indian business, and the commercial reality of the transaction was the acquisition of that business. The retrospective amendments placed such indirect transfers expressly within the deeming provision, and the treaty does not prevent India from taxing what its own law deems to arise here.",
    },
    summary:
      "The Court examined the genesis and conduct of the French holding company and found it to be a genuine investment vehicle rather than a device: it had been incorporated well before the sale, for the purpose of making and holding the investment, and had functioned as an investment holding company with real decision-making. There being no artificiality, there was no basis to disregard its separate existence and treat the transaction as a transfer of the Indian shares. On the treaty, the Court held that the capital gains article allocated the right to tax gains from the alienation of shares to the state of residence of the alienator, which was France, and that India therefore had no taxing right over the gain. On the retrospective amendments, it held that a unilateral change to domestic law cannot alter the allocation of taxing rights agreed in a bilateral treaty; the treaty prevails where it is more favourable, and an amendment to the deeming provision does not amend the treaty. The Court also observed that the arrangement predated the transaction by years and could not be characterised as a scheme to avoid Indian tax.",
    principles: [
      "A genuine holding company with real investment purpose is not to be disregarded as a device.",
      "Where the treaty allocates taxing rights over share alienation to the state of residence, India has no taxing right.",
      "Retrospective domestic amendments cannot alter the allocation of taxing rights agreed in a treaty.",
      "The longevity and commercial function of a holding structure are material to whether it is genuine.",
    ],
    relevance:
      "Part of the post-Vodafone indirect transfer story. The retrospective amendments it declined to apply through the treaty were themselves withdrawn for pre-2021 transactions by later legislation, following adverse investment treaty arbitration awards. Under the IT Act 2025 the indirect transfer charge sits in Section 9 and treaty relief in Section 159, so the treaty-prevails reasoning continues to govern where a favourable treaty applies. Read with Vodafone, Copal Research and Tiger Global.",
    keywords: [
      "indirect transfer",
      "France treaty",
      "holding company",
      "retrospective amendment",
      "treaty override",
      "alienation of shares",
      "genuine structure",
    ],
  },
  {
    slug: "copal-research-indirect-transfer-threshold",
    caseName: "DIT v. Copal Research Ltd",
    citation: "(2014) 371 ITR 114 (Del)",
    court: "Delhi High Court",
    year: 2014,
    category: "International Tax",
    section1961: "Section 9(1)(i)",
    section2025: "Section 9",
    sectionTopic: "Income deemed to accrue or arise in India",
    issue:
      "Does the indirect transfer provision reach every transfer of foreign shares that derive some value from Indian assets, or only those where the Indian element is substantial?",
    held:
      "Only where the Indian element is substantial. Shares must derive their value substantially from assets in India, which the Court read as requiring the Indian assets to represent at least half of the total value.",
    facts:
      "Shares of foreign companies within a research services group were transferred as part of a global acquisition. The group had Indian subsidiaries, so a portion of the value of the shares transferred was referable to Indian assets, but that portion fell well short of half the total. The Revenue contended that the deeming provision, as extended by the retrospective amendments following Vodafone, applied to any transfer of foreign shares deriving value from assets situated in India, without any threshold, and sought to tax a proportionate part of the gain.",
    proceduralHistory:
      "The matter came before the Delhi High Court, which considered the meaning of the word 'substantially' in the amended deeming provision at a time when the statute itself prescribed no numerical threshold.",
    contentions: {
      assessee:
        "The provision applies where shares derive their value substantially from Indian assets. 'Substantially' imports a requirement of predominance, and on any view the Indian component here was a minority of the total value. Reading the provision without a threshold would bring within the Indian charge every global transaction involving a group with any Indian presence, which cannot have been intended.",
      revenue:
        "The amendment deliberately used broad language to capture indirect transfers of Indian assets. No threshold is prescribed in the provision, and the Court should not read one in. Where value is derived from Indian assets, a proportionate part of the gain is chargeable.",
    },
    summary:
      "The Court held that the word 'substantially' must be given meaning and cannot be treated as surplusage. Examining international practice and the material explaining the amendment, including the recommendations of expert committees that had considered the provision and the approach taken in other jurisdictions and in model conventions, it concluded that a share derives its value substantially from assets in India where those assets represent the principal part of its value. It adopted a threshold of at least half the total value, holding that where the Indian assets account for less than that, the provision is not attracted at all. The Court reasoned that an unlimited reading would expose every cross-border transaction involving a group with any Indian operations to Indian tax, producing results that would be unworkable in practice and inconsistent with the evident purpose of the amendment, which was to reach transactions whose real subject matter is an Indian business. Since the Indian component fell below the threshold, the gains were held not chargeable.",
    principles: [
      "'Substantially' in the indirect transfer provision imports a requirement of predominance and cannot be ignored.",
      "Shares derive value substantially from Indian assets where those assets are at least half the total value.",
      "Below that threshold the deeming provision is not attracted at all.",
      "An unlimited reading would reach every cross-border transaction involving any Indian presence and is not the purpose of the provision.",
    ],
    relevance:
      "The threshold this decision read into the provision was subsequently adopted in the statute itself, together with valuation rules and reporting obligations, and carries into the indirect transfer regime in Section 9 of the IT Act 2025. The case therefore explains where the current threshold came from and remains useful on the interpretive approach. Read with Vodafone, Sanofi Pasteur and Tiger Global for the full arc of the indirect transfer story.",
    keywords: [
      "indirect transfer",
      "substantially",
      "50 per cent threshold",
      "value derived from Indian assets",
      "retrospective amendment",
      "cross-border acquisition",
    ],
  },
  {
    slug: "linde-ag-consortium-aop",
    caseName: "Linde AG v. DIT",
    citation: "(2014) 365 ITR 1 (Del)",
    court: "Delhi High Court",
    year: 2014,
    category: "International Tax",
    section1961: "Sections 2(31), 4 & 9",
    section2025: "Sections 2, 4 & 9",
    sectionTopic:
      "Definition of person; charge of income-tax; income deemed to accrue or arise in India",
    issue:
      "Does a consortium formed by two companies to bid jointly for and execute a single turnkey project constitute an association of persons assessable as a separate taxable entity?",
    held:
      "No, where the scope of work, responsibilities and remuneration of each member are separate and each bears its own risk and earns its own profit. A joint bid and joint liability to the customer do not by themselves create an association of persons.",
    facts:
      "A German company and a Korean company formed a consortium to bid for a large turnkey project for an Indian public sector undertaking. The consortium submitted a single bid and the members accepted joint and several liability to the customer for performance of the contract as a whole. Internally, however, the contract and the consortium agreement divided the work between them: each member was responsible for a defined and separate scope, was remunerated separately for that scope, executed its portion with its own resources, and bore its own costs, risks and profit or loss. The Revenue assessed the consortium as an association of persons, which would have taxed the combined profits as those of a single entity.",
    proceduralHistory:
      "The matter came before the Delhi High Court, which examined what is required before parties who cooperate on a project are treated as a single taxable association.",
    contentions: {
      assessee:
        "An association of persons requires the members to join in a common purpose to produce income jointly, sharing in the venture's overall result. Here the members simply divided the work and each earned its own remuneration for its own scope, with no pooling of profit and no joint management. Joint and several liability was assumed for the customer's protection and says nothing about how the members related to each other.",
      revenue:
        "The members bid jointly, contracted jointly, assumed joint liability for the whole and cooperated in delivering a single integrated facility. That is a common enterprise carried on together, and the profits of that enterprise should be assessed in the hands of the association rather than divided between the members.",
    },
    summary:
      "The Court held that the essential element of an association of persons is that two or more persons join in a common purpose or common action with the object of producing income jointly, in which each has an interest in the combined result. Where parties come together only to the extent of presenting a single face to the customer, while internally dividing the work so that each performs a separate scope for separate remuneration and bears its own risk, they are not carrying on a joint enterprise for profit in the relevant sense. The Court held that joint and several liability to the employer is a feature commonly required in large infrastructure contracts for the customer's protection and does not convert separate performances into a common venture. Nor does the existence of coordination between members, which any integrated project requires. It examined the consortium agreement and the division of scope and consideration, found that each member's profit depended on its own performance and costs alone, and held that the consortium was not an association of persons. The members were therefore assessable separately on their own income, with their treaty positions determined individually.",
    principles: [
      "An association of persons requires a common purpose to produce income jointly, with each member interested in the combined result.",
      "Dividing scope and consideration so that each member bears its own risk and earns its own profit negates a joint enterprise.",
      "Joint and several liability to the customer does not by itself create an association of persons.",
      "Coordination necessary to deliver an integrated project is not evidence of a common venture.",
      "Where no association exists, members are assessed separately and their treaty positions determined individually.",
    ],
    relevance:
      "Governs consortium bidding on infrastructure, energy and engineering projects, which is the standard structure for large Indian contracts. The question matters a great deal in practice: association status would consolidate the members' profits, disturb their separate treaty entitlements and alter the permanent establishment analysis for each. Under the IT Act 2025 the definition of person is in Section 2 and the deeming provisions in Section 9. Read with Ishikawajima-Harima and Hyundai Heavy Industries on splitting offshore and onshore elements of the same project.",
    keywords: [
      "consortium",
      "association of persons",
      "AOP",
      "turnkey project",
      "joint and several liability",
      "separate scope",
      "EPC",
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // GAAR & ANTI-AVOIDANCE
  //
  // The General Anti-Avoidance Rule became operative only from assessment
  // year 2018-19, and invoking it requires clearance through a three-tier
  // process ending with an Approving Panel chaired by a High Court judge.
  // Very few matters have been invoked, and fewer still have reached
  // judgment, so the jurisprudence is nascent. The judgments here trace the
  // line from the judicial doctrine that preceded the rule, through the gaps
  // that made a general rule necessary, to its first significant application.
  // Tiger Global, Vodafone and Azadi Bachao, filed under other heads, carry
  // closely related holdings.
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: "walfort-dividend-stripping",
    caseName: "CIT v. Walfort Share and Stock Brokers P Ltd",
    citation: "(2010) 326 ITR 1 (SC)",
    court: "Supreme Court",
    year: 2010,
    category: "GAAR & Anti-Avoidance",
    section1961: "Sections 14A & 94(7)",
    section2025: "Sections 14 & 175",
    sectionTopic:
      "Expenditure relating to exempt income; avoidance of tax by certain transactions in securities",
    issue:
      "Where a taxpayer buys mutual fund units cum-dividend, receives a tax-free dividend and sells the units ex-dividend at a loss, may the loss be disallowed in the absence of a provision saying so?",
    held:
      "No. The loss was real and arose on an actual transaction. The disallowance for expenditure relating to exempt income does not reach a loss on sale, and the court will not supply an anti-avoidance provision the legislature has not enacted.",
    facts:
      "The assessee purchased units of a mutual fund shortly before the record date at a price that reflected the dividend about to be declared. It received the dividend, which was exempt from tax, and then sold the units shortly afterwards at the reduced ex-dividend price, realising a loss roughly equal to the dividend received. It claimed that loss in computing its business income. The Revenue disallowed it, contending that the loss was in substance the cost of obtaining exempt income and fell within the provision disallowing expenditure incurred in relation to income not forming part of total income. The transaction took place before the specific provision addressing dividend stripping was enacted.",
    proceduralHistory:
      "The Tribunal and the Bombay High Court decided in the assessee's favour. The Revenue appealed to the Supreme Court, which affirmed and examined the scope of the disallowance provision as well as the significance of the later anti-stripping amendment.",
    contentions: {
      assessee:
        "The disallowance provision speaks of expenditure incurred in relation to exempt income. A loss suffered on the sale of an asset is not expenditure; it is the result of a real purchase and a real sale at market prices. The price paid for the units was for the units themselves, not for the dividend, and the whole of it was applied in acquiring a capital asset that was subsequently sold.",
      revenue:
        "Viewed commercially, the assessee laid out money and got back the same money in two parts — an exempt dividend and a reduced sale price. The loss is the price of obtaining the exempt dividend and is expenditure in relation to it. Allowing the loss lets the taxpayer convert exempt income into a deduction.",
    },
    summary:
      "The Court held that the disallowance provision is directed at expenditure, and that the words used cannot be stretched to cover a loss arising on the sale of an asset. Expenditure implies a paying out or away of money; the assessee had paid for units and received units, and the subsequent fall in their value on going ex-dividend produced a loss, not an outgoing referable to the dividend. The Court further held that the purchase price was applied wholly to acquiring the units, and that it could not be dissected into a component attributable to the dividend and a component attributable to the units themselves. On the wider point, the Court observed that Parliament had subsequently enacted a specific provision to deal with dividend stripping, restricting the loss to the extent of the exempt dividend, and that the enactment of that provision was itself an indication that no such restriction existed before. Where the legislature has identified a form of avoidance and legislated against it prospectively, the court will not achieve the same result for earlier years by straining the language of a different provision. The loss was accordingly allowable.",
    principles: [
      "The disallowance for expenditure relating to exempt income does not extend to a loss on the sale of an asset.",
      "Expenditure implies a paying out; a fall in the value of an asset acquired is not expenditure.",
      "The purchase price of a security is not dissected between the asset and the income it carries.",
      "Enactment of a specific anti-avoidance provision indicates the restriction did not exist before.",
      "Courts will not supply an anti-avoidance provision the legislature has not enacted.",
    ],
    relevance:
      "The reason the specific anti-stripping rule exists, now in Section 175 of the IT Act 2025, with the exempt income disallowance in Section 14. Its wider importance is as the counterpoint to a general anti-avoidance rule: for as long as India relied on specific provisions alone, a form of avoidance not yet legislated against succeeded, and the courts declined to fill the gap. That limitation is what the general rule in Sections 178 to 184 was designed to overcome, and Ayodhya Rami Reddy Alla shows the general rule being used to reach precisely the kind of stripping arrangement a specific provision had left uncovered.",
    keywords: [
      "dividend stripping",
      "94(7)",
      "section 14A",
      "expenditure versus loss",
      "specific anti-avoidance rule",
      "legislative gap",
      "mutual fund units",
    ],
  },
  {
    slug: "ayodhya-rami-reddy-gaar",
    caseName: "Ayodhya Rami Reddy Alla v. PCIT",
    citation: "Telangana High Court (2024)",
    court: "Telangana High Court",
    year: 2024,
    category: "GAAR & Anti-Avoidance",
    section1961: "Sections 95 to 102 and 94(8)",
    section2025: "Sections 178, 181, 183, 184 and 175",
    sectionTopic:
      "Applicability of the General Anti-Avoidance Rule; consequences of an impermissible avoidance arrangement; avoidance of tax by certain transactions in securities",
    issue:
      "Can the general anti-avoidance rule be invoked against a bonus stripping arrangement, where the specific anti-avoidance provision then in force did not cover shares, and may the taxpayer challenge the invocation by writ before the Approving Panel has ruled?",
    held:
      "Yes to the first and no to the second. A specific anti-avoidance provision does not oust the general rule; where the specific provision does not cover the arrangement, the general rule may still apply. The statutory process must run its course before the court will interfere.",
    facts:
      "The assessee held shares in a company. A scheme of amalgamation was carried through, followed by the issue of bonus shares. The original shares, whose market value had fallen because of the bonus issue, were then sold at a substantial loss, while the bonus shares carrying the value were retained. The short-term capital loss so generated was set off against a large long-term capital gain arising from an unrelated transaction. The Assessing Officer took the view that the steps together constituted an impermissible avoidance arrangement whose main purpose was to obtain a tax benefit, and initiated the general anti-avoidance procedure by making a reference for approval. At the relevant time the specific provision addressing stripping applied to units of mutual funds and not to shares.",
    proceduralHistory:
      "The assessee challenged the invocation by writ petition before the Telangana High Court, before the Approving Panel had considered the reference. The High Court declined to interfere and dismissed the petition.",
    contentions: {
      assessee:
        "Parliament had enacted a specific provision to deal with stripping and had deliberately confined it to units, leaving shares outside. Where the legislature has addressed a subject and drawn the boundary, the general rule cannot be used to extend that boundary; to do so would rewrite the specific provision. Each step in the arrangement was lawful and independently valid, and the general rule cannot be applied to a series of lawful transactions merely because their combined effect is a reduced tax liability.",
      revenue:
        "The general rule was enacted precisely because specific provisions cannot anticipate every device. It operates where an arrangement's main purpose is to obtain a tax benefit and it lacks commercial substance or is not at arm's length, and nothing in it is displaced by the existence of a specific provision covering a different situation. The steps here produced a loss that was wholly artificial, the value having simply migrated to the bonus shares that were retained.",
    },
    summary:
      "The Court held that the general and specific anti-avoidance provisions operate in different registers and can coexist. A specific provision addresses a defined transaction on defined conditions; the general rule addresses arrangements whose main purpose is a tax benefit and which bear the hallmarks the statute identifies. The existence of the former does not, by implication, immunise everything falling outside it, and the Court declined to read the confinement of the stripping provision to units as a legislative decision that stripping through shares should be permitted. It held that the general rule is available where the specific provision does not apply, and that this is the very function a general rule performs. On the arrangement itself, the Court noted that each step viewed alone was lawful but that the general rule directs attention to the arrangement as a whole and its main purpose, and that the Revenue was entitled to form a prima facie view that the steps together produced an artificial loss. On the procedural challenge, the Court held that the statute establishes a graded process culminating in an Approving Panel headed by a judge, that the assessee would be heard at that stage, and that it was not appropriate to short-circuit the process by writ before the Panel had applied its mind.",
    principles: [
      "The general anti-avoidance rule and specific anti-avoidance provisions can coexist.",
      "A specific provision does not by implication immunise arrangements falling outside its boundary.",
      "The general rule may be invoked where the specific provision does not cover the arrangement.",
      "The enquiry is directed at the arrangement as a whole and its main purpose, not at the legality of each step.",
      "The statutory approval process, ending with the Approving Panel, must run before a court will interfere by writ.",
    ],
    relevance:
      "The first significant Indian judgment applying the general anti-avoidance rule, now in Sections 178 to 184 of the IT Act 2025, with the specific securities provision in Section 175. Its holding that the general rule survives alongside specific provisions is the most consequential point, since the contrary view would have confined it to ground no specific provision had reached. Read with Walfort, which shows what happened before a general rule existed, and with Tiger Global, which holds that where avoidance is alleged the statutory machinery is the route rather than an assertion made outside it. Verify the citation before relying on it; the decision is recent and the reported reference should be checked.",
    keywords: [
      "GAAR",
      "bonus stripping",
      "impermissible avoidance arrangement",
      "main purpose test",
      "SAAR and GAAR",
      "Approving Panel",
      "writ jurisdiction",
      "commercial substance",
    ],
  },
];
