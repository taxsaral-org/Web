export type CaseCategory = "Capital Gains" | "Charitable Trusts & NPOs";

export const CASE_CATEGORIES: CaseCategory[] = [
  "Capital Gains",
  "Charitable Trusts & NPOs",
];

export type Court =
  | "Supreme Court"
  | "Bombay High Court"
  | "Delhi High Court"
  | "Madras High Court";

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
  /** Fuller discussion of the reasoning. */
  summary: string;
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
    summary:
      "A firm transferred its goodwill, which had been built up over years of trading rather than purchased. The Revenue sought to tax the entire consideration as capital gains on the footing that the cost was nil. The Supreme Court rejected this. It reasoned that Section 45 is not a standalone charge — it operates only where Section 48 can meaningfully compute the gain. Self-generated goodwill has no cost that can be identified, and a nil cost cannot simply be assumed where the statute does not say so. Since the computation machinery broke down, the asset fell outside the charge altogether.",
    relevance:
      "The integrated-code principle survives under Sections 67 and 72. Its practical reach is now much narrower, because Section 90 expressly assigns a nil cost of acquisition to self-generated assets such as goodwill, tenancy rights and route permits. Srinivasa Setty therefore remains the authority to invoke only for assets for which the statute still prescribes no cost mechanism.",
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
    summary:
      "The taxpayer sold property at a price below market value in a genuine transaction. The Revenue invoked the then Section 52(2) to substitute the higher market value. The Supreme Court held that the provision was directed at concealment, not at honest bargains, and that a literal reading producing absurd results must yield to the legislative purpose. Two conditions had to be satisfied: the consideration must be understated, and the Revenue must prove it. Without proof of extra consideration actually passing, the declared price stands.",
    relevance:
      "Section 78 is a deeming provision — where the stamp duty value exceeds the declared consideration, the stamp duty value is taken. To that extent the statute now does what K.P. Varghese would not allow. But the case still underpins the taxpayer's remedy: where the stamp duty value is disputed as exceeding true market value, the matter can be referred to the Valuation Officer under Section 91, and the taxpayer is entitled to have genuineness considered rather than assumed away.",
    keywords: [
      "understatement of consideration",
      "burden of proof",
      "fair market value",
      "stamp duty value",
      "50C",
      "valuation officer",
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
    summary:
      "Members of a housing society entered a Joint Development Agreement with developers. Necessary permissions were never obtained and the project collapsed, so no consideration was ever received. The Revenue nonetheless assessed capital gains in the year of the agreement. The Supreme Court held that Section 2(47)(v) is attracted only where a transaction qualifies under Section 53A of the Transfer of Property Act, which after 2001 requires a registered instrument. The agreement being unregistered, the clause could not apply. The Court added a second, independent ground: income must accrue in the real sense, and no enforceable right to receive the consideration ever arose, so there was no income to tax.",
    relevance:
      "The timing of capital gains on development agreements remains one of the most litigated questions in practice. Both limbs of the decision — registration as a precondition, and real accrual of income — carry directly into Section 67 under the IT Act 2025.",
    keywords: [
      "joint development agreement",
      "JDA",
      "unregistered agreement",
      "section 53A",
      "possession",
      "accrual of income",
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
    summary:
      "The taxpayer executed an agreement to sell and received earnest money, but the sale deed followed only after litigation over the property was resolved. Measured from the sale deed, the purchase of the new house fell outside the Section 54 window; measured from the agreement, it was within time. The Supreme Court took a purposive view. It held that the agreement created rights in the buyer, so some right in the capital asset stood extinguished on that date, which is enough to constitute a transfer on the extended statutory definition. It also stressed that Section 54 is a beneficial provision and should not be construed so as to defeat a taxpayer who was prevented from completing the sale by circumstances beyond their control.",
    relevance:
      "Directly relevant to Section 82 under the IT Act 2025. Where a sale deed is delayed by litigation, regulatory clearance or buyer default, this remains the leading authority for computing the reinvestment window from the agreement date.",
    keywords: [
      "agreement to sell",
      "date of transfer",
      "section 54",
      "reinvestment",
      "residential house",
      "extinguishment of rights",
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
    summary:
      "The taxpayer sold a depreciable asset held for more than the long-term threshold and invested the gain in specified bonds. The Revenue denied the exemption on the footing that Section 50 deemed the gain short-term. The Court held that a legal fiction must be confined to the purpose for which it is created. Section 50 is a computation provision within the block-of-assets scheme; nothing in it alters the character of the asset or the period for which it was held. Since the exemption provision turns on the asset being long-term held, and the asset genuinely was, the exemption applied.",
    relevance:
      "The same structure is carried into the IT Act 2025 — Section 74 computes gains on depreciable assets, and Section 85 gives the bond exemption. The reasoning applies unchanged, and this remains the standard authority when the Revenue resists the exemption on depreciable-asset gains.",
    keywords: [
      "depreciable asset",
      "block of assets",
      "deeming fiction",
      "54EC",
      "specified bonds",
      "short-term capital gain",
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
    summary:
      "The Court laid down a working test for development agreements: the determining date is when the contract read as a whole shows the developer is willing to perform, and possession has been given under Section 53A of the Transfer of Property Act. It is not necessary that the entire consideration be received or that a formal conveyance be executed. The judgment cautioned that the date is to be found from the substance of the arrangement rather than its label.",
    relevance:
      "Read together with Balbir Singh Maini, this sets the framework for taxing development agreements under Section 67. Kapadia supplies the willingness-and-possession test; Maini adds that the instrument must be registered before the test can be reached at all.",
    keywords: [
      "development agreement",
      "willingness to perform",
      "part performance",
      "possession",
      "year of taxability",
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
    summary:
      "The taxpayer shifted its undertaking from an urban area and, within the statutory period, paid substantial advances towards new assets, though the acquisitions were not complete. The Revenue read 'utilised' as requiring finished purchases. The Supreme Court disagreed, holding that the word must be given its ordinary meaning and that earmarking the funds by paying advances is utilisation. The Court noted that the provision is intended to facilitate relocation, a process that necessarily takes time, and a narrow reading would frustrate that purpose.",
    relevance:
      "Section 87 carries the relief forward under the IT Act 2025. The decision is the standard answer where the Revenue disallows relief because the new asset was not fully acquired within the window, and the reasoning is frequently applied by analogy to other reinvestment reliefs.",
    keywords: [
      "54G",
      "shifting industrial undertaking",
      "utilisation",
      "advance payment",
      "relocation",
      "reinvestment",
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
    summary:
      "On a partition, the taxpayer paid his brothers to release their shares in a house and claimed the Section 54 exemption. The Revenue argued that a release on partition is not a 'purchase'. The Supreme Court rejected the distinction, holding that the word should be understood in its ordinary commercial sense — acquiring property by paying a price. Since consideration passed and the taxpayer thereby obtained ownership of the shares, the requirement was met.",
    relevance:
      "The liberal reading of 'purchase' carries into Section 82 and is routinely relied on for family settlements, partitions and buy-outs of co-owners' shares, where the Revenue seeks to deny relief on the form of the instrument rather than its substance.",
    keywords: [
      "purchase",
      "co-owner",
      "release deed",
      "partition",
      "section 54",
      "beneficial construction",
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
    summary:
      "The taxpayer received a sum for giving up tenancy rights. On the law as it then stood, no cost of acquisition was identifiable, so following Srinivasa Setty the receipt escaped capital gains. The Revenue then sought to bring it to tax as income from other sources. The Supreme Court held this impermissible: where a receipt falls within a specific head, the residuary head cannot be used as a fallback merely because the specific head yields no tax. The heads of income are mutually exclusive.",
    relevance:
      "The head-exclusivity principle is the lasting value of this case and applies generally under the IT Act 2025. The specific outcome no longer follows, however — Section 90 now prescribes a nil cost of acquisition for tenancy rights, so such receipts are today chargeable as capital gains under Section 67.",
    keywords: [
      "tenancy rights",
      "surrender",
      "heads of income",
      "mutually exclusive",
      "income from other sources",
      "nil cost",
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
    summary:
      "A Netherlands company acquired a Cayman Islands company that indirectly held a controlling interest in an Indian telecom business. The Revenue sought to tax the gain in India and to treat the buyer as an assessee in default for not withholding tax. The Supreme Court held that the sale was of a single share of an offshore company; the Act as then framed did not reach an indirect transfer. It emphasised looking at the transaction as a whole rather than dissecting it, and distinguished legitimate tax planning through a long-standing holding structure from a sham arrangement.",
    relevance:
      "The decision prompted the indirect-transfer rules, which now sit in Section 9 of the IT Act 2025. The case therefore no longer decides the taxability question, but its reasoning on substance over form and on respecting genuine holding structures continues to be cited in cross-border disputes.",
    keywords: [
      "indirect transfer",
      "offshore transaction",
      "substance over form",
      "holding structure",
      "cross-border",
      "look at not look through",
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
    summary:
      "The Supreme Court decided a large batch of appeals covering statutory development authorities, regulatory bodies, trade promotion councils, and private trusts. It restated the law comprehensively. A charity whose object is general public utility is not barred from receiving consideration; the question is whether the activity is essentially charitable with cost recovery, or is really a business. Statutory corporations and regulators discharging public functions on a cost basis are generally not carrying on business. Bodies charging significantly above cost, and trade bodies rendering services for fees, are subject to the quantitative limit, which must be tested year by year.",
    relevance:
      "This is the leading authority on the commercial-activity restriction, which the IT Act 2025 now codifies in Section 346, with the interpretive provisions in Section 355. Any advice on whether a GPU organisation's receipts jeopardise its registration starts here.",
    keywords: [
      "general public utility",
      "GPU",
      "trade commerce business",
      "cost recovery",
      "quantitative limit",
      "statutory authority",
      "2(15) proviso",
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
    summary:
      "The Supreme Court departed from the more permissive approach of earlier decisions. It held that where the statute grants exemption to an institution existing 'solely' for educational purposes, the word must be given full effect — a predominant-object test is not enough. Trust deeds containing a spread of unrelated objects therefore fail, notwithstanding that only education is actually pursued. The Court also held that the approving authority may require the institution to demonstrate compliance with the regulatory framework governing it, and it directed that the stricter reading operate prospectively.",
    relevance:
      "Directly affects registration under Section 332 of the IT Act 2025. In practice this means object clauses need auditing: a widely drafted trust deed is now a live risk at registration or renewal, even where the organisation's actual activity is narrowly educational.",
    keywords: [
      "solely for education",
      "educational institution",
      "object clause",
      "registration",
      "10(23C)",
      "prospective application",
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
    summary:
      "The association promoted trade in art silk cloth and carried on activities that produced income. The Supreme Court held that the correct enquiry is into the dominant or primary purpose for which the body exists, not the incidental generation of profit. If the real object is the advancement of an object of general public utility, and any profit is a by-product applied back to that object rather than an end in itself, charitable status stands. The Court emphasised that the purpose must not involve the carrying on of an activity for profit as its own objective.",
    relevance:
      "The predominant object test remains the analytical starting point, and it was expressly considered in the Ahmedabad Urban Development Authority decision. Under the IT Act 2025 it must now be read subject to the codified quantitative restriction in Section 346 — the object test alone no longer decides the matter.",
    keywords: [
      "predominant object test",
      "profit motive",
      "incidental profit",
      "general public utility",
      "charitable purpose",
      "trade association",
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
    summary:
      "A trust publishing newspapers and journals claimed its object was educational because it disseminated knowledge. The Supreme Court rejected the claim, holding that the word 'education' in the definition is used in the sense of formal, systematic instruction. The travel of knowledge through newspapers, however informative, is not education in that sense; otherwise almost any publisher or broadcaster could claim charitable status. The Court also examined whether the activity was carried on for profit.",
    relevance:
      "Still the authority on the boundary of 'education' under the IT Act 2025, where the interpretive provisions sit in Section 355. It matters for bodies running seminars, publications, awareness programmes or online content that assert an educational object.",
    keywords: [
      "education",
      "systematic instruction",
      "newspaper",
      "dissemination of knowledge",
      "charitable purpose",
      "schooling",
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
    summary:
      "The institutions had recorded surpluses which the Revenue treated as proof of a profit motive. The Supreme Court held the approach wrong in principle. The correct test looks at the purpose for which the institution exists and what becomes of the surplus. An institution that must generate some surplus to remain viable, and that applies it to its own educational infrastructure rather than distributing it, remains eligible. The Court disapproved decisions that had treated the mere existence of a surplus as disqualifying.",
    relevance:
      "Frequently needed under the IT Act 2025 where an Assessing Officer points to accumulated surpluses as evidence of commerciality. It should now be read alongside New Noble on the 'solely' requirement and the Section 346 restriction on commercial activity.",
    keywords: [
      "surplus",
      "profit motive",
      "ploughed back",
      "educational institution",
      "exemption",
      "viability",
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
    summary:
      "The trust published a newspaper and applied the profits to educational objects. The Supreme Court traced the successive amendments governing business income of charities and held that the statutory scheme permits exemption where the business is itself trust property or is incidental to the attainment of the objectives. What matters is the destination of the income and compliance with the record-keeping condition, not that a commercial activity is being carried on as such.",
    relevance:
      "Section 344 of the IT Act 2025 deals with a business undertaking held as property of an NPO. The decision remains the principal authority on when trust-held business income retains exemption, subject now to the commercial-activity ceiling in Section 346 for GPU organisations.",
    keywords: [
      "business held in trust",
      "incidental business",
      "separate books",
      "application of income",
      "newspaper",
      "11(4A)",
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
    summary:
      "The Revenue computed the permitted accumulation on the income remaining after the trust had applied funds to its objects, producing a much smaller allowance. The Supreme Court affirmed the straightforward reading: the statute allows accumulation of a percentage of the income derived from property held under trust, and that figure is the gross receipts. The concise judgment settled a point that had produced conflicting approaches.",
    relevance:
      "The accumulation mechanism now sits in Sections 341 and 342 of the IT Act 2025. The computation base continues to matter in every trust assessment, and this remains the authority for taking gross receipts rather than a post-application residue.",
    keywords: [
      "accumulation",
      "15 per cent",
      "gross receipts",
      "application of income",
      "set apart",
      "11(1)(a)",
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
    summary:
      "Registration was refused to a trust serving the Dawoodi Bohara community on the footing that its objects benefited one community. The Supreme Court held the refusal misconceived. At the registration stage the authority examines the objects and the genuineness of activities. Whether a particular receipt or application attracts the restriction on community-specific benefit is a question for assessment, when actual activities can be examined. The Court also confirmed that Indian law recognises composite trusts pursuing both religious and charitable purposes.",
    relevance:
      "Maps onto the IT Act 2025 split between registration under Section 332 and specified violations under Section 351. The case is the standard answer where registration is refused or cancelled on grounds that properly belong to the assessment stage.",
    keywords: [
      "composite trust",
      "religious and charitable",
      "particular community",
      "registration stage",
      "12AA",
      "13(1)(b)",
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
    summary:
      "A chamber of commerce claimed charitable status for objects directed at promoting and protecting trade, commerce and industry. The Supreme Court held these to be objects of general public utility. The section of the public benefited need not be the whole community, provided the class is defined by reference to a quality of public nature rather than by a personal relationship. Incidental benefit to members does not convert a public object into a private one.",
    relevance:
      "Long-standing authority for trade bodies, chambers and industry associations. Under the IT Act 2025 the object question it answers is only the first step: such bodies must additionally satisfy the commercial-activity restriction in Section 346, which the Ahmedabad Urban Development Authority decision applies squarely to fee-charging trade associations.",
    keywords: [
      "chamber of commerce",
      "trade association",
      "general public utility",
      "section of the public",
      "incidental benefit to members",
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
    summary:
      "Approval was declined on the basis that the institution had not applied its income to educational purposes in India. The Supreme Court distinguished the threshold conditions from the monitoring conditions. At the approval stage the authority is concerned with whether the applicant genuinely exists for the stated purpose. Compliance with requirements on application and accumulation of income falls to be checked in the ordinary course, with the approval capable of being withdrawn on breach. The authority may impose stipulations of that monitoring character when granting approval.",
    relevance:
      "The threshold-versus-monitoring distinction continues to apply to registration under Section 332 of the IT Act 2025, with the audit and reporting obligations in Sections 347 to 349 serving the monitoring function. Useful wherever registration is refused on grounds relating to future conduct.",
    keywords: [
      "approval stage",
      "threshold conditions",
      "monitoring conditions",
      "genuineness",
      "application of income",
      "withdrawal of approval",
    ],
  },
];
