export type CaseCategory =
  | "Capital Gains"
  | "Charitable Trusts & NPOs"
  | "Transfer Pricing"
  | "International Tax"
  | "Business & Profession"
  | "Assessment & Reassessment";

export const CASE_CATEGORIES: CaseCategory[] = [
  "Capital Gains",
  "Charitable Trusts & NPOs",
  "Transfer Pricing",
  "International Tax",
  "Business & Profession",
  "Assessment & Reassessment",
];

export type Court =
  | "Supreme Court"
  | "Bombay High Court"
  | "Delhi High Court"
  | "Madras High Court"
  | "Karnataka High Court";

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
];
