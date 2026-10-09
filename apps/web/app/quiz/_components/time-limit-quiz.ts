import type { QuizChapter } from "./quiz-data";

// Time limits under the Income-tax Act, 2025 for assessment procedure,
// appeals and revision, and the Dispute Resolution Committee.
//
// Every limit below is taken from the text of the Act as published in the
// Gazette, as amended by the Finance Act, 2026 (which substituted sections
// 275(4), 275(14), 280(1)(c), 283, 286(2) and 296(1)), and, for the Dispute
// Resolution Committee, from rules 196 to 199 of the Income-tax Rules, 2026.
// Wrong options are mostly other genuine time limits from the same chapters,
// so that a student has to tell similar limits apart.

const UPDATED = "2026-10-09";

export const TIME_LIMIT_CHAPTERS: QuizChapter[] = [
  // ── Assessment procedure ─────────────────────────────────────────────────
  {
    slug: "time-limits-assessment",
    source: "time-limits",
    title: "Time Limits: Assessment Procedure",
    chapter: "Chapter XVI · Sections 268 to 296",
    topic: "Assessment time limits",
    description:
      "Scrutiny notices, intimations, special audit, the Dispute Resolution Panel, reassessment, completion of assessment, rectification and block assessment, as amended by the Finance Act, 2026.",
    difficulty: "Medium",
    lastUpdated: UPDATED,
    questions: [
      {
        id: "tla-01",
        section: "Section 270(9)",
        question:
          "A return for Tax Year 2026-27 is furnished on 31 July 2027. What is the last date for serving a notice for scrutiny under section 270(8)?",
        options: ["30 June 2028", "31 March 2028", "31 December 2028", "31 March 2029"],
        correct: 0,
        explanation:
          "Section 270(9): no notice under section 270(8) can be served after three months from the end of the financial year in which the return is furnished. The return was furnished in FY 2027-28, which ends on 31 March 2028, so the notice must be served by 30 June 2028. This was section 143(2) of the 1961 Act.",
      },
      {
        id: "tla-02",
        section: "Section 270(4)",
        question: "The time limit for sending an intimation under section 270(1) after processing a return is:",
        options: [
          "Nine months from the end of the financial year in which the return is made",
          "Three months from the end of the financial year in which the return is made",
          "One year from the end of the relevant tax year",
          "Six months from the date on which the return is filed",
        ],
        correct: 0,
        explanation:
          "Section 270(4): no intimation under section 270(1) can be sent after nine months from the end of the financial year in which the return is made. Do not confuse it with the three-month limit for a scrutiny notice in section 270(9). Earlier section 143(1).",
      },
      {
        id: "tla-03",
        section: "Section 270(2)",
        question:
          "Before making an adjustment while processing a return, the assessee is sent a communication. If no response is received, how long after its issue is the adjustment made?",
        options: [
          "30 days of the issue of the communication",
          "15 days of the issue of the communication",
          "60 days of the issue of the communication",
          "Three months from the end of the month in which it is issued",
        ],
        correct: 0,
        explanation:
          "Section 270(2)(b): where no response is received within thirty days of the issue of the communication, the adjustments are made and the intimation under section 270(1)(d) is sent.",
      },
      {
        id: "tla-04",
        section: "Section 268(10)",
        question:
          "The maximum period allowed for furnishing a special audit or inventory valuation report directed under section 268(5), including all extensions, is:",
        options: [
          "Six months from the end of the month in which the direction is received",
          "120 days from the date on which the direction is received",
          "Three months from the end of the month in which the direction is received",
          "One year from the end of the financial year in which the direction is issued",
        ],
        correct: 0,
        explanation:
          "Section 268(10): the period originally fixed and all extensions together cannot exceed six months from the end of the month in which the direction under section 268(5) is received by the assessee. Earlier section 142(2A) to (2C).",
      },
      {
        id: "tla-05",
        section: "Section 268(2)(b)",
        question:
          "During an inquiry before assessment, how far back before the relevant tax year can the Assessing Officer require accounts to be produced?",
        options: ["Up to three years", "Up to four years and three months", "Up to six years", "Up to eight years"],
        correct: 0,
        explanation:
          "Section 268(2)(b): the Assessing Officer shall not require the production of any accounts relating to a period more than three years prior to the relevant tax year. Earlier section 142(1).",
      },
      {
        id: "tla-06",
        section: "Section 275(2)",
        question:
          "The time allowed to an eligible assessee to accept a draft assessment order under section 275(1), or to file objections, is:",
        options: [
          "30 days of receiving the draft order",
          "60 days of receiving the draft order",
          "One month from the end of the month in which it is received",
          "Two months from the end of the month in which it is received",
        ],
        correct: 0,
        explanation:
          "Section 275(2): within thirty days of receipt of the draft order, the eligible assessee either files acceptance of the variations with the Assessing Officer or files objections with the Dispute Resolution Panel and the Assessing Officer. Earlier section 144C.",
      },
      {
        id: "tla-07",
        section: "Section 275(4)",
        question:
          "Where the eligible assessee accepts the draft order, or files no objection in time, the time limit for passing the final assessment order is:",
        options: [
          "One month from the end of the month in which the acceptance is received or the time for objections expires",
          "30 days from the date of acceptance",
          "Two months from the end of the month in which the acceptance is received",
          "The normal time limit in section 286, without any separate limit",
        ],
        correct: 0,
        explanation:
          "Section 275(4), as substituted by the Finance Act, 2026: irrespective of section 286, the Assessing Officer passes the order within one month from the end of the month in which the acceptance is received or the period for filing objections expires.",
      },
      {
        id: "tla-08",
        section: "Section 275(13)",
        question: "The time limit for the Dispute Resolution Panel to issue its directions is:",
        options: [
          "Nine months from the end of the month in which the draft order is forwarded to the eligible assessee",
          "Nine months from the date on which the objections are filed",
          "Six months from the end of the month in which the objections are filed",
          "One year from the end of the financial year in which the draft order is forwarded",
        ],
        correct: 0,
        explanation:
          "Section 275(13): no direction can be issued after nine months from the end of the month in which the draft order is forwarded to the eligible assessee. Note that the clock runs from the draft order, not from the objections.",
      },
      {
        id: "tla-09",
        section: "Section 275(14)",
        question:
          "After receiving the directions of the Dispute Resolution Panel, the time limit for the Assessing Officer to complete the assessment is:",
        options: [
          "One month from the end of the month in which the directions are received",
          "30 days from the date on which the directions are received",
          "Two months from the end of the month in which the directions are received",
          "Three months from the end of the quarter in which the directions are received",
        ],
        correct: 0,
        explanation:
          "Section 275(14), as substituted by the Finance Act, 2026: irrespective of section 286, the Assessing Officer completes the assessment in conformity with the directions, without giving a further hearing, within one month from the end of the month in which the direction is received.",
      },
      {
        id: "tla-10",
        section: "Section 282(1)(a)",
        question:
          "What is the general time limit for issuing a notice under section 280 for reassessment, counted from the end of the relevant tax year?",
        options: ["Four years and three months", "Three years and three months", "Four years", "Six years and three months"],
        correct: 0,
        explanation:
          "Section 282(1)(a): no notice under section 280 can be issued if four years and three months have elapsed from the end of the relevant tax year, unless the case falls under clause (b). Earlier section 149.",
      },
      {
        id: "tla-11",
        section: "Section 282(1)(b)",
        question:
          "A notice under section 280 can be issued up to six years and three months from the end of the relevant tax year only where the escaped income, shown by books, documents or evidence, amounts to or is likely to amount to:",
        options: ["₹50 lakh or more", "₹1 crore or more", "₹25 lakh or more", "₹10 lakh or more"],
        correct: 0,
        explanation:
          "Section 282(1)(b): beyond four years and three months, and up to six years and three months, a notice can be issued only if the Assessing Officer has books of account, documents or evidence showing escaped income of fifty lakh rupees or more.",
      },
      {
        id: "tla-12",
        section: "Section 282(2)",
        question:
          "Where the escaped income is below ₹50 lakh, what is the time limit for issuing the show cause notice under section 281, counted from the end of the relevant tax year?",
        options: ["Four years", "Four years and three months", "Three years", "Six years"],
        correct: 0,
        explanation:
          "Section 282(2)(a): no show cause notice under section 281 can be issued if four years have elapsed from the end of the relevant tax year, extended to six years where the escaped income is fifty lakh rupees or more. The notice under section 280 itself gets an extra three months: four years three months, or six years three months.",
      },
      {
        id: "tla-13",
        section: "Section 282(3)",
        question: "Under section 282(3), for how long after the end of a tax year is the issue of a notice under section 280 or 281 barred?",
        options: ["One year", "Three months", "Two years", "Six months"],
        correct: 0,
        explanation:
          "Section 282(3): no notice under section 280 or 281 shall be issued within one year from the end of any tax year.",
      },
      {
        id: "tla-14",
        section: "Section 280(1)(c)",
        question: "The period allowed in a notice under section 280 for furnishing the return of income:",
        options: [
          "Must be at least 30 days from the date of the notice and cannot exceed three months from the end of the month in which it is issued",
          "Cannot exceed three months from the end of the month in which it is issued, with no minimum",
          "Must be exactly 30 days from the date of service of the notice",
          "Must be at least 15 days and cannot exceed 60 days from the date of the notice",
        ],
        correct: 0,
        explanation:
          "Section 280(1)(c), as substituted by the Finance Act, 2026: the period specified in the notice shall not be less than thirty days from the date of the notice and shall not exceed three months from the end of the month in which the notice is issued. As enacted, the clause had only the three-month ceiling. Earlier section 148.",
      },
      {
        id: "tla-15",
        section: "Section 283(3)",
        question:
          "The time limit for issuing a notice under section 280 to give effect to a finding or direction in an order of an appellate authority, Tribunal or court is:",
        options: [
          "Three months from the end of the quarter in which the jurisdictional Principal Commissioner or Commissioner receives the certified copy of the order",
          "One year from the end of the month in which the order is received",
          "Four years and three months from the end of the relevant tax year",
          "Any time, with no outer limit",
        ],
        correct: 0,
        explanation:
          "Section 283, as substituted by the Finance Act, 2026: sub-section (1) lets such a notice be issued irrespective of section 282, but sub-section (3) requires it within three months from the end of the quarter in which the certified copy of the order is received by the jurisdictional Principal Commissioner or Commissioner. Earlier section 150.",
      },
      {
        id: "tla-16",
        section: "Section 286(1), Table Sl. No. 1",
        question:
          "For Tax Year 2026-27, with no reference to the Transfer Pricing Officer, the last date for completing a regular assessment under section 270(10) or 271 is:",
        options: ["31 March 2029", "31 March 2028", "31 December 2028", "30 September 2029"],
        correct: 0,
        explanation:
          "Section 286(1), Table Sl. No. 1: one year from the end of the financial year succeeding the relevant tax year. Tax Year 2026-27 ends on 31 March 2027; the succeeding financial year ends on 31 March 2028; one year from then is 31 March 2029. Earlier section 153.",
      },
      {
        id: "tla-17",
        section: "Section 286(2)",
        question:
          "Where a reference is made to the Transfer Pricing Officer under section 166(1), the time limit for completing the assessment or reassessment is extended by:",
        options: ["12 months", "6 months", "18 months", "60 days"],
        correct: 0,
        explanation:
          "Section 286(2)(a), as substituted by the Finance Act, 2026: for Table Sl. Nos. 1 to 5, a reference to the Transfer Pricing Officer extends the time limit by an additional twelve months.",
      },
      {
        id: "tla-18",
        section: "Section 286(1), Table Sl. No. 2",
        question:
          "Where an updated return is furnished under section 263(6), the assessment must be completed within one year from:",
        options: [
          "The end of the financial year in which the updated return was furnished",
          "The end of the financial year succeeding the relevant tax year",
          "The date on which the updated return was furnished",
          "The end of the month in which the updated return was furnished",
        ],
        correct: 0,
        explanation:
          "Section 286(1), Table Sl. No. 2: an assessment where an updated return is furnished must be completed within one year from the end of the financial year in which the updated return was furnished.",
      },
      {
        id: "tla-19",
        section: "Section 286(1), Table Sl. No. 4",
        question: "An assessment, reassessment or recomputation under section 279 must be completed within one year from:",
        options: [
          "The end of the financial year in which the notice under section 280 was served",
          "The end of the month in which the notice under section 280 was served",
          "The date on which the return in response to the notice is furnished",
          "The end of the relevant tax year",
        ],
        correct: 0,
        explanation:
          "Section 286(1), Table Sl. No. 4: one year from the end of the financial year in which the notice under section 280 was served.",
      },
      {
        id: "tla-20",
        section: "Section 286(1), Table Sl. No. 10",
        question:
          "The time limit for an order merely giving effect to an appellate or revision order, with no fresh assessment, no verification and no hearing needed, is:",
        options: [
          "Six months from the end of the month in which the order is received or passed, extendable to nine months with approval",
          "One year from the end of the month in which the order is received or passed",
          "Two months from the end of the month in which the order is received or passed",
          "Three months from the end of the quarter in which the order is received or passed",
        ],
        correct: 0,
        explanation:
          "Section 286(1), Table Sl. No. 10: six months from the end of the month in which the order under section 359, 363, 365(10) or 368 is received, or the order under section 377 or 378 is passed, extendable to nine months with the approval of the authorities in section 2(62) and (64). Where verification or a hearing is needed, Sl. No. 9 allows one year.",
      },
      {
        id: "tla-21",
        section: "Section 286(1), Table Sl. No. 11",
        question:
          "The time limit for the Assessing Officer to modify the assessment to give effect to an order of the Transfer Pricing Officer under section 166 read with section 377 is:",
        options: [
          "Two months from the end of the month in which the order is received by the Assessing Officer",
          "One month from the end of the month in which the order is received by the Assessing Officer",
          "Six months from the end of the month in which the order is received by the Assessing Officer",
          "One year from the end of the financial year in which the order is received",
        ],
        correct: 0,
        explanation:
          "Section 286(1), Table Sl. No. 11: two months from the end of the month in which the order under section 166 is received by the Assessing Officer.",
      },
      {
        id: "tla-22",
        section: "Section 286(4)",
        question:
          "If, after excluding the periods listed in section 286(3), less than 60 days remain to complete an assessment, the remaining period is:",
        options: [
          "Extended to 60 days",
          "Extended to six months",
          "Extended to the end of the financial year",
          "Not extended, and the assessment becomes time-barred",
        ],
        correct: 0,
        explanation:
          "Section 286(4): where the remaining period is less than sixty days, it is extended to sixty days. The same 60-day rule appears for revision in sections 377(7) and 378(9).",
      },
      {
        id: "tla-23",
        section: "Section 286(3)(h)",
        question:
          "Time spent obtaining information from a foreign tax authority under an agreement referred to in section 159 is excluded from the assessment time limit, but only up to:",
        options: ["One year", "Six months", "180 days", "Two years"],
        correct: 0,
        explanation:
          "Section 286(3)(h): the period from the first reference for exchange of information to the date the information is last received by the jurisdictional Principal Commissioner or Commissioner, or one year, whichever is less, is excluded.",
      },
      {
        id: "tla-24",
        section: "Section 287(8)",
        question: "The time limit for rectifying a mistake apparent from the record under section 287 is:",
        options: [
          "Four years from the end of the financial year in which the order or intimation was passed",
          "Four years from the date of the order or intimation",
          "Six months from the end of the month in which the order was passed",
          "Two years from the end of the financial year in which the order was passed",
        ],
        correct: 0,
        explanation:
          "Section 287(8): no amendment, except as provided in section 288, can be made after four years from the end of the financial year in which the order or intimation sought to be amended was passed. Contrast the Tribunal's own rectification power in section 363(2), which is six months from the end of the month. Earlier section 154.",
      },
      {
        id: "tla-25",
        section: "Section 287(9)",
        question:
          "When an assessee applies for rectification under section 287, the time limit for passing an order allowing or refusing the claim is:",
        options: [
          "Six months from the end of the month in which the application is received",
          "30 days from the date on which the application is received",
          "One year from the end of the financial year in which the application is received",
          "Three months from the end of the quarter in which the application is received",
        ],
        correct: 0,
        explanation:
          "Section 287(9): subject to the four-year limit in sub-section (8), the order is passed within six months from the end of the month in which the application is received from the assessee, deductor or collector.",
      },
      {
        id: "tla-26",
        section: "Section 296(1)",
        question: "The time limit for passing an order of block assessment under section 294 in a search case is:",
        options: [
          "18 months from the end of the quarter in which the search was initiated or the requisition was made",
          "12 months from the end of the quarter in which the last of the authorisations for search was executed",
          "One year from the end of the financial year in which the search was initiated",
          "21 months from the end of the financial year in which the search was initiated",
        ],
        correct: 0,
        explanation:
          "Section 296(1), as substituted by the Finance Act, 2026: eighteen months from the end of the quarter in which the search was initiated or the requisition was made. As enacted, it was twelve months from the end of the quarter in which the last authorisation was executed, which is why that option looks familiar. Earlier section 158BE.",
      },
      {
        id: "tla-27",
        section: "Section 296(3)",
        question:
          "In computing the time limit for block assessment, the period from the start of the search to the handing over of seized assets and material to the jurisdictional Assessing Officer is excluded, up to a maximum of:",
        options: ["180 days", "60 days", "90 days", "One year"],
        correct: 0,
        explanation:
          "Section 296(3): the period, not exceeding one hundred and eighty days, from the date on which the search is initiated or requisition made to the date on which the seized assets and material are handed over to the Assessing Officer is excluded.",
      },
      {
        id: "tla-28",
        section: "Section 296(5)",
        question: "For the 'other person' referred to in section 295, the time limit for completing the block assessment is:",
        options: [
          "12 months from the end of the quarter in which the notice under section 294 is issued to that person",
          "18 months from the end of the quarter in which the search was initiated",
          "One year from the end of the financial year in which the notice is issued to that person",
          "Two years from the end of the quarter in which the notice is issued to that person",
        ],
        correct: 0,
        explanation:
          "Section 296(5): twelve months from the end of the quarter in which the notice under section 294, in pursuance of section 295, was issued to the other person. Under section 296(6), a reference to the Transfer Pricing Officer extends it by twelve months.",
      },
    ],
  },

  // ── Appeals and revision ─────────────────────────────────────────────────
  {
    slug: "time-limits-appeals-revision",
    source: "time-limits",
    title: "Time Limits: Appeals and Revision",
    chapter: "Chapter XVIII · Sections 358 to 378",
    topic: "Appeal and revision time limits",
    description:
      "Filing deadlines and disposal periods for appeals to the Joint Commissioner (Appeals) or Commissioner (Appeals), the Appellate Tribunal and the High Court, Tribunal stays and rectification, and revision under sections 377 and 378.",
    difficulty: "Medium",
    lastUpdated: UPDATED,
    questions: [
      {
        id: "tlr-01",
        section: "Section 358(3)(a)",
        question:
          "The time limit for presenting an appeal to the Joint Commissioner (Appeals) or Commissioner (Appeals) against an assessment order is:",
        options: [
          "30 days from the date of service of the notice of demand",
          "30 days from the date of the assessment order",
          "Two months from the end of the month in which the order is received",
          "60 days from the date of service of the notice of demand",
        ],
        correct: 0,
        explanation:
          "Section 358(3)(a): where the appeal relates to any assessment or penalty, it must be presented within thirty days from the date of service of the notice of demand. The appeal is filed in Form No. 99 (rule 167). Earlier section 249.",
      },
      {
        id: "tlr-02",
        section: "Section 358(3)(b)",
        question:
          "In an appeal to the Commissioner (Appeals) that does not relate to an assessment or penalty, the 30 days run from:",
        options: [
          "The date on which intimation of the order appealed against is served",
          "The date of service of the notice of demand",
          "The end of the month in which the order is passed",
          "The end of the financial year in which the order is passed",
        ],
        correct: 0,
        explanation:
          "Section 358(3)(b): in any other case, the thirty days run from the date on which intimation of the order sought to be appealed against is served.",
      },
      {
        id: "tlr-03",
        section: "Section 358(5)",
        question: "An appeal reaches the Commissioner (Appeals) after the 30 days have expired. The Commissioner (Appeals):",
        options: [
          "May admit it if satisfied that there was sufficient cause for the delay",
          "Must reject it as time-barred",
          "May admit it only if the delay is less than 30 days",
          "May admit it only on payment of an additional fee",
        ],
        correct: 0,
        explanation:
          "Section 358(5): the Joint Commissioner (Appeals) or Commissioner (Appeals) may admit an appeal after the expiry of the period if satisfied that the appellant had sufficient cause for not presenting it within that period. There is no fixed cap on the delay that may be condoned.",
      },
      {
        id: "tlr-04",
        section: "Section 358(4)",
        question:
          "An assessee applies under section 440(1) for waiver of penalty and immunity, and the application is rejected. In computing the 30-day appeal period:",
        options: [
          "The period from the date of the application to the date of service of the rejection order is excluded",
          "The 30 days start afresh from the date of the application",
          "No period is excluded",
          "The appeal period becomes 60 days",
        ],
        correct: 0,
        explanation:
          "Section 358(4): where an application under section 440(1) is rejected, the period from the date of the application to the date on which the rejection order is served is excluded in computing the period in section 358(3)(a). Section 440 corresponds to section 270AA of the 1961 Act.",
      },
      {
        id: "tlr-05",
        section: "Section 359(5)",
        question:
          "What period does the Act set for the Joint Commissioner (Appeals) or Commissioner (Appeals) to hear and decide an appeal, where it is possible?",
        options: [
          "One year from the end of the financial year in which the appeal is filed or transferred",
          "Four years from the end of the financial year in which the appeal is filed",
          "180 days from the date on which the appeal is filed",
          "Six months from the end of the month in which the appeal is filed",
        ],
        correct: 0,
        explanation:
          "Section 359(5): where it is possible, the appeal may be heard and decided within one year from the end of the financial year in which it is filed or transferred under section 356. It is a target, not a bar. The Tribunal's equivalent target is four years (section 363(5)). Earlier section 250.",
      },
      {
        id: "tlr-06",
        section: "Section 362(3)",
        question: "The time limit for filing an appeal to the Income-tax Appellate Tribunal is:",
        options: [
          "Two months from the end of the month in which the order is communicated",
          "60 days from the date on which the order is communicated",
          "30 days from the date of service of the notice of demand",
          "120 days from the date on which the order is received",
        ],
        correct: 0,
        explanation:
          "Section 362(3): every appeal must be filed within two months from the end of the month in which the order is communicated to the assessee or to the Principal Commissioner or Commissioner. The 1961 Act (section 253) allowed sixty days from the date of communication; the new Act counts from the end of the month.",
      },
      {
        id: "tlr-07",
        section: "Section 362(4)",
        question:
          "On receiving notice that the other party has appealed to the Appellate Tribunal, the time limit for filing a memorandum of cross-objections is:",
        options: [
          "30 days of receipt of the notice",
          "Two months from the end of the month in which the notice is received",
          "60 days of receipt of the notice",
          "15 days of receipt of the notice",
        ],
        correct: 0,
        explanation:
          "Section 362(4): the Assessing Officer or the assessee may file a memorandum of cross-objections within thirty days of receipt of the notice, even without having appealed. No fee is payable for cross-objections (section 362(7)).",
      },
      {
        id: "tlr-08",
        section: "Sections 358, 362, 365",
        question: "Which of these appeal time limits is counted from the end of a month rather than from a date?",
        options: [
          "Appeal to the Appellate Tribunal",
          "Appeal to the Commissioner (Appeals)",
          "Appeal to the High Court",
          "Cross-objections before the Appellate Tribunal",
        ],
        correct: 0,
        explanation:
          "Only the appeal to the Tribunal runs from the end of the month: two months from the end of the month in which the order is communicated (section 362(3)). The others run from a date: 30 days from service of the notice of demand or of the order (section 358(3)), 120 days from receipt of the order (section 365(2)(a)), and 30 days from receipt of the notice for cross-objections (section 362(4)).",
      },
      {
        id: "tlr-09",
        section: "Section 363(2)",
        question: "The time limit for the Appellate Tribunal to rectify a mistake apparent from the record in its order is:",
        options: [
          "Six months from the end of the month in which the order was passed",
          "Four years from the end of the financial year in which the order was passed",
          "Four years from the date of the order",
          "30 days from the date of the order",
        ],
        correct: 0,
        explanation:
          "Section 363(2): within six months from the end of the month in which the order was passed, if the mistake is brought to its notice by the assessee or the Assessing Officer. An assessee's application carries a fee of ₹50 (section 363(4)). Earlier section 254.",
      },
      {
        id: "tlr-10",
        section: "Section 363(5)",
        question: "What period does the Act set for the Appellate Tribunal to hear and decide an appeal, where it is possible?",
        options: [
          "Four years from the end of the financial year in which the appeal is filed",
          "One year from the end of the financial year in which the appeal is filed",
          "Two years from the end of the financial year in which the appeal is filed",
          "180 days from the date on which the appeal is filed",
        ],
        correct: 0,
        explanation:
          "Section 363(5): where it is possible, within four years from the end of the financial year in which the appeal is filed under section 362(1) or (2).",
      },
      {
        id: "tlr-11",
        section: "Section 363(6)",
        question: "The maximum period for which the Appellate Tribunal can initially grant a stay of demand is:",
        options: ["180 days from the date of the stay order", "365 days from the date of the stay order", "90 days from the date of the stay order", "One year from the end of the financial year"],
        correct: 0,
        explanation:
          "Section 363(6): the Tribunal may grant a stay for a period not exceeding one hundred and eighty days from the date of the order, and must dispose of the appeal within that period.",
      },
      {
        id: "tlr-12",
        section: "Section 363(6)",
        question: "What is the minimum the assessee must deposit, or furnish security for, to obtain a stay from the Appellate Tribunal?",
        options: ["20% of the amount payable", "10% of the amount payable", "15% of the amount payable", "50% of the amount payable"],
        correct: 0,
        explanation:
          "Section 363(6): the stay is subject to the assessee depositing not less than 20% of the tax, interest, fee, penalty or other sum payable, or furnishing security of an equal amount. An application for stay carries a fee of ₹500 (section 362(8)).",
      },
      {
        id: "tlr-13",
        section: "Section 363(7)",
        question: "What is the maximum total period of a stay granted by the Appellate Tribunal, including any extension?",
        options: ["365 days", "180 days", "Two years", "540 days"],
        correct: 0,
        explanation:
          "Section 363(7): an extension is possible only if the assessee applies, has met the deposit condition and the delay is not attributable to him, and the original and extended stay together cannot exceed three hundred and sixty-five days.",
      },
      {
        id: "tlr-14",
        section: "Section 363(8)",
        question: "If the Appellate Tribunal does not dispose of the appeal within the period of stay allowed:",
        options: [
          "The stay stands vacated, even if the delay is not attributable to the assessee",
          "The stay continues until the appeal is decided",
          "The stay continues only if the delay is not attributable to the assessee",
          "The demand under appeal stands cancelled",
        ],
        correct: 0,
        explanation:
          "Section 363(8): the order of stay stands vacated if the appeal is not disposed of within the period allowed under sub-section (6) or (7), even if the delay is not attributable to the assessee.",
      },
      {
        id: "tlr-15",
        section: "Section 365(2)(a)",
        question: "The time limit for filing an appeal to the High Court against an order of the Appellate Tribunal is:",
        options: [
          "120 days from the date on which the order is received",
          "60 days from the date on which the order is received",
          "Two months from the end of the month in which the order is received",
          "90 days from the date of the order",
        ],
        correct: 0,
        explanation:
          "Section 365(2)(a): within one hundred and twenty days from the date on which the order is received by the assessee or the Principal Chief Commissioner, Chief Commissioner, Principal Commissioner or Commissioner. The High Court may admit it later for sufficient cause (section 365(3)). Earlier section 260A.",
      },
      {
        id: "tlr-16",
        section: "Section 372",
        question: "In computing the period of limitation for an appeal or application under the Act, which of the following is excluded?",
        options: [
          "The day on which the order was served, and the time taken to obtain a copy if none was provided with the notice",
          "Only public holidays falling within the period",
          "The time taken by the department to issue the notice of demand",
          "The time taken to pay the appeal fee",
        ],
        correct: 0,
        explanation:
          "Section 372: the day on which the order complained of was served and, if the assessee was not given a copy of the order with the notice, the time required to obtain a copy are excluded. Earlier section 268.",
      },
      {
        id: "tlr-17",
        section: "Section 377(4)",
        question: "The time limit for revising an order prejudicial to the revenue under section 377 is:",
        options: [
          "Two years from the end of the financial year in which the order sought to be revised was passed",
          "Two years from the date of the order sought to be revised",
          "One year from the end of the financial year in which the order was passed",
          "Four years from the end of the financial year in which the order was passed",
        ],
        correct: 0,
        explanation:
          "Section 377(4): no order can be made after the expiry of two years from the end of the financial year in which the order sought to be revised was passed. Earlier section 263.",
      },
      {
        id: "tlr-18",
        section: "Section 377(5)",
        question:
          "Where the order being revised was passed to give effect to a finding or direction of the Appellate Tribunal, High Court or Supreme Court, what time limit applies to a revision order under section 377?",
        options: [
          "None; it may be passed at any time",
          "Within two years from the end of the financial year in which that order was passed",
          "Within one year from the end of the month in which the appellate order was received",
          "Within six months from the end of the month in which the appellate order was received",
        ],
        correct: 0,
        explanation:
          "Section 377(5): irrespective of sub-section (4), an order in revision may be passed at any time in the case of an order passed in consequence of, or to give effect to, any finding or direction of the Appellate Tribunal, the High Court or the Supreme Court.",
      },
      {
        id: "tlr-19",
        section: "Section 377(7)",
        question:
          "If, after excluding the periods in section 377(6) (rehearing and court stays), less than 60 days remain to pass a revision order, the remaining period is:",
        options: ["Extended to 60 days", "Extended to six months", "Extended to the end of the financial year", "Not extended"],
        correct: 0,
        explanation:
          "Section 377(7): where the remaining period is less than sixty days, it is extended to sixty days. Section 378(9) and section 286(4) contain the same rule.",
      },
      {
        id: "tlr-20",
        section: "Section 378(3)",
        question: "An assessee's application for revision under section 378 must be made within one year from:",
        options: [
          "The date the order was communicated, or the date the assessee otherwise came to know of it, whichever is earlier",
          "The date the order was communicated, or the date the assessee otherwise came to know of it, whichever is later",
          "The end of the financial year in which the order was passed",
          "The date of service of the notice of demand",
        ],
        correct: 0,
        explanation:
          "Section 378(3): within one year from the date on which the order was communicated to the assessee or the date on which he otherwise came to know of it, whichever is earlier. A later application may be admitted for sufficient cause (section 378(4)). Earlier section 264.",
      },
      {
        id: "tlr-21",
        section: "Section 378(2)",
        question:
          "What is the time limit for the Principal Commissioner or Commissioner to revise an order under section 378 on his own motion?",
        options: [
          "One year from the date of the order",
          "Two years from the end of the financial year in which the order was passed",
          "Six months from the date of the order",
          "Four years from the end of the financial year in which the order was passed",
        ],
        correct: 0,
        explanation:
          "Section 378(2): the Competent Authority shall not of his own motion revise any order under this section if the order has been made more than one year previously.",
      },
      {
        id: "tlr-22",
        section: "Section 378(7)",
        question: "The time limit for passing an order on an assessee's application for revision under section 378 is:",
        options: [
          "One year from the end of the financial year in which the application is made",
          "One year from the date on which the application is made",
          "Six months from the end of the month in which the application is made",
          "Two years from the end of the financial year in which the application is made",
        ],
        correct: 0,
        explanation:
          "Section 378(7): an order shall be passed within one year from the end of the financial year in which the application is made. Section 378(10) allows an order giving effect to a Tribunal or court finding to be passed at any time.",
      },
      {
        id: "tlr-23",
        section: "Section 378(5)(a)",
        question:
          "An order against which an appeal lies to the Commissioner (Appeals) or the Tribunal, but none has been filed, cannot be revised under section 378 if:",
        options: [
          "The time within which the appeal may be filed has not expired",
          "The assessee has paid the tax demanded",
          "The order was passed within the last six months",
          "The Commissioner has not issued a show cause notice",
        ],
        correct: 0,
        explanation:
          "Section 378(5)(a): no revision where an appeal lies but has not been made and the time for making it has not expired. Revision is also barred where the assessee has not waived the right of appeal, or the order is the subject of an appeal (section 378(5)(b) and (c)).",
      },
    ],
  },

  // ── Dispute Resolution Committee ─────────────────────────────────────────
  {
    slug: "time-limits-dispute-resolution-committee",
    source: "time-limits",
    title: "Dispute Resolution Committee: Time Limits and Conditions",
    chapter: "Chapter XVIII-D · Section 379 and Rules 196 to 199",
    topic: "Dispute Resolution Committee",
    description:
      "When the Dispute Resolution Committee is available, the monetary limits and exclusions, its constitution, the application, and the time the Assessing Officer has to give effect to its order.",
    difficulty: "Medium",
    lastUpdated: UPDATED,
    questions: [
      {
        id: "tld-01",
        section: "Section 379(3)",
        question:
          "After receiving the order of the Dispute Resolution Committee, the time limit for the Assessing Officer to pass or modify the assessment order is:",
        options: [
          "One month from the end of the month in which the order is received",
          "30 days from the date on which the order is received",
          "Two months from the end of the month in which the order is received",
          "Six months from the end of the month in which the order is received",
        ],
        correct: 0,
        explanation:
          "Section 379(3): irrespective of section 275, the Assessing Officer passes the order (where the specified order was a draft order under section 275(1)) or modifies the assessment, in conformity with the Committee's directions, within one month from the end of the month in which its order is received. Earlier section 245MA.",
      },
      {
        id: "tld-02",
        section: "Section 379(4)(i)",
        question: "What is the maximum aggregate of variations proposed or made for an order to be a 'specified order' that can go to the Dispute Resolution Committee?",
        options: ["₹10 lakh", "₹50 lakh", "₹25 lakh", "₹1 crore"],
        correct: 0,
        explanation:
          "Section 379(4)(i): the aggregate sum of variations proposed or made in the order must not exceed ten lakh rupees.",
      },
      {
        id: "tld-03",
        section: "Section 379(4)(iii)",
        question:
          "Where a return has been filed for the tax year, what is the maximum total income as per that return for the Dispute Resolution Committee to be available?",
        options: ["₹50 lakh", "₹10 lakh", "₹1 crore", "₹5 crore"],
        correct: 0,
        explanation:
          "Section 379(4)(iii): the total income as per the return must not exceed fifty lakh rupees. Remember the pair: variations up to ₹10 lakh, returned income up to ₹50 lakh.",
      },
      {
        id: "tld-04",
        section: "Section 379(4)(ii)",
        question: "Even within the monetary limits, which of these orders cannot be taken to the Dispute Resolution Committee?",
        options: [
          "An order based on information received under an agreement referred to in section 159",
          "A draft order under section 275(1)",
          "An intimation under section 270(1) to whose adjustments the assessee objects",
          "An order under section 287 that enhances the assessment",
        ],
        correct: 0,
        explanation:
          "Section 379(4)(ii) excludes orders based on a search under section 247, a requisition under section 248, a survey under section 253, or information received under a tax treaty or similar agreement referred to in section 159. Draft orders, intimations under section 270(1) with disputed adjustments and enhancing rectification orders are all specified orders under rule 199(a).",
      },
      {
        id: "tld-05",
        section: "Section 379(2)",
        question: "Besides modifying the variations in the specified order, the Dispute Resolution Committee may:",
        options: [
          "Reduce or waive any penalty imposed or imposable, or grant immunity from prosecution",
          "Enhance the assessment",
          "Set aside the order and direct a fresh assessment",
          "Extend the time limit for filing an appeal",
        ],
        correct: 0,
        explanation:
          "Section 379(2): the Committee may modify the variations, reduce or waive any penalty, or grant immunity from prosecution. The Finance Act, 2026 changed 'penalty imposable' to 'penalty imposed or imposable', so a penalty already levied can also be reduced or waived.",
      },
      {
        id: "tld-06",
        section: "Rule 196(3)",
        question: "Members of a Dispute Resolution Committee are appointed by the Central Government for a period of:",
        options: ["Three years", "Five years", "Two years", "One year"],
        correct: 0,
        explanation:
          "Rule 196(3) of the Income-tax Rules, 2026: the members are appointed for a period of three years.",
      },
      {
        id: "tld-07",
        section: "Rule 196(1) and (2)",
        question: "How is a Dispute Resolution Committee constituted?",
        options: [
          "One for every Principal Chief Commissioner region, with three members",
          "One for every Commissioner (Appeals), with two members",
          "A single national Committee with five members",
          "One for every State, with three members",
        ],
        correct: 0,
        explanation:
          "Rule 196: a Committee is constituted for every region of a Principal Chief Commissioner. It has three members: two retired Indian Revenue Service (Income-tax) officers who held the post of Commissioner or an equivalent or higher post for five years or more, and one ex-officio member, an officer not below the rank of Principal Commissioner or Commissioner as specified by the Board. Decisions are by majority.",
      },
      {
        id: "tld-08",
        section: "Rule 196(2)(a)",
        question:
          "What is the minimum period for which the two retired members of a Dispute Resolution Committee must have held the post of Commissioner of Income-tax, or an equivalent or higher post?",
        options: ["Five years", "Three years", "Seven years", "Ten years"],
        correct: 0,
        explanation:
          "Rule 196(2)(a): two members are retired officers of the Indian Revenue Service (Income-tax) who have held the post of Commissioner of Income-tax or any equivalent or higher post for five years or more.",
      },
      {
        id: "tld-09",
        section: "Rule 197",
        question: "An application to the Dispute Resolution Committee is made in:",
        options: [
          "Form No. 119, with a fee of ₹1,000",
          "Form No. 99, with a fee of ₹250",
          "Form No. 115, with a fee of ₹500",
          "Form No. 119, with no fee",
        ],
        correct: 0,
        explanation:
          "Rule 197: the application is made in Form No. 119 and must be accompanied by a fee of ₹1,000. Form No. 99 is the appeal to the Joint Commissioner (Appeals) or Commissioner (Appeals); Form No. 115 is the appeal to the Appellate Tribunal.",
      },
      {
        id: "tld-10",
        section: "Rule 198(2)",
        question: "The Dispute Resolution Committee cannot grant immunity from prosecution where:",
        options: [
          "Prosecution proceedings were initiated before the date of receipt of the application",
          "The total income as per the return exceeds ₹25 lakh",
          "The specified order is a draft order under section 275(1)",
          "The variation relates to tax deducted at source",
        ],
        correct: 0,
        explanation:
          "Rule 198(2): no immunity can be granted where proceedings for prosecution were initiated before the date of receipt of the application. The income limit is ₹50 lakh, not ₹25 lakh, and draft orders and TDS orders under section 398 can both be specified orders (rule 199).",
      },
    ],
  },
];
