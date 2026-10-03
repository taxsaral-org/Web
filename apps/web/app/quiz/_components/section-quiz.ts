// Section Identifier quizzes — "Section 271 deals with…?" — generated from the
// section mapping, which carries the official headings and chapter structure
// of the Income Tax Act 2025, so the quizzes always match the rest of the site.
//
// Quizzes follow the chapters of the Act. Every unit below covers whole
// chapters or whole lettered parts of a chapter: small chapters are taken
// together with their neighbours, large ones part by part, and a unit that is
// still long is split into sets. The build fails if a unit starts or ends in
// the middle of a chapter or part, or if any section is left uncovered.

import { MAPPINGS, type SectionMap } from "@/app/section-mapping/_components/mapping-data";
import type { QuizChapter, QuizQuestion } from "./quiz-data";

interface Unit {
  from: number;
  to: number;
  title: string;
  /** Completes the sentence "Covers sections a to b of the Income Tax Act 2025 — ___." */
  covers: string;
  /** Split into this many sets of near-equal size. */
  sets?: number;
}

const UNITS: Unit[] = [
  { from: 1,   to: 12,  title: "Preliminary, Basis of Charge & Excluded Incomes", covers: "definitions and the tax year, the charge of income-tax, scope of total income, residence, income deemed to accrue in India, and incomes that do not form part of total income" },
  { from: 13,  to: 25,  title: "Heads of Income, Salaries & House Property", covers: "the heads of income, expenditure relating to exempt income, salary, perquisites and deductions from salary, and income from house property" },
  { from: 26,  to: 66,  title: "Profits and Gains of Business or Profession", sets: 2, covers: "the charge on business income, allowable deductions, depreciation, disallowances, deemed profits, presumptive taxation, books of account and tax audit" },
  { from: 67,  to: 95,  title: "Capital Gains & Income from Other Sources", covers: "the charge on capital gains, transactions not regarded as transfer, computation, special valuation rules, exemptions on reinvestment, and income from other sources" },
  { from: 96,  to: 121, title: "Clubbing, Aggregation & Set-off of Losses", covers: "income of other persons included in total income, unexplained credits, investments and expenditure, and set-off and carry forward of losses" },
  { from: 122, to: 137, title: "Deductions in respect of Certain Payments", covers: "the general rules for deductions, and deductions for payments such as insurance premia, provident and pension contributions, health insurance, interest on loans and donations" },
  { from: 138, to: 154, title: "Deductions in respect of Certain Incomes", covers: "profit-linked deductions for undertakings and enterprises, deductions for other incomes such as interest on deposits, and other deductions" },
  { from: 155, to: 177, title: "Rebates, Double Taxation Relief & Avoidance of Tax", covers: "rebates and reliefs, double taxation relief, transfer pricing, and the specific anti-avoidance provisions" },
  { from: 178, to: 189, title: "GAAR & Mode of Payment", covers: "the general anti-avoidance rule, and the modes of taking or accepting and repaying loans, deposits and other sums" },
  { from: 190, to: 206, title: "Special Rates, New Tax Regimes, MAT & AMT", covers: "tax on certain incomes at special rates, special rates on capital gains, the new tax regimes, and minimum alternate tax and alternate minimum tax" },
  { from: 207, to: 235, title: "Non-Residents, Pass-through Entities & Tonnage Tax", covers: "special provisions for non-residents and foreign companies, pass-through entities, and the tonnage tax scheme for shipping companies" },
  { from: 236, to: 261, title: "Tax Administration", covers: "income-tax authorities, their jurisdiction and functions, and their powers, including search, requisition and survey" },
  { from: 262, to: 291, title: "Return of Income & Assessment", covers: "PAN, filing of returns, inquiry before assessment, assessment, best judgment assessment, income escaping assessment and time limits" },
  { from: 292, to: 301, title: "Assessment of Search Cases", covers: "block assessment of undisclosed income found as a result of a search" },
  { from: 302, to: 331, title: "AOPs, Firms, HUFs & Other Persons", covers: "legal representatives, representative assessees, associations of persons, executors, succession to business, partition, firms, private companies and other special cases" },
  { from: 332, to: 355, title: "Registered Non-Profit Organisations", covers: "registration, income and its application, commercial activities, compliances and violations of registered non-profit organisations" },
  { from: 356, to: 374, title: "Appeals", covers: "appeals to the Joint Commissioner (Appeals) and Commissioner (Appeals), the Appellate Tribunal, the High Court and the Supreme Court" },
  { from: 375, to: 389, title: "Repetitive Appeals, Revision & Dispute Resolution", covers: "avoiding repetitive appeals, revision of orders by the Commissioner, the Dispute Resolution Committee and advance rulings" },
  { from: 390, to: 410, title: "TDS, TCS & Advance Tax", covers: "deduction and collection of tax at source, and advance payment of tax" },
  { from: 411, to: 438, title: "Recovery, Interest, Fees & Refunds", covers: "collection and recovery of tax, interest and fees for defaults, and refunds" },
  { from: 439, to: 472, title: "Penalties", sets: 2, covers: "penalties for under-reporting and misreporting of income and for other defaults" },
  { from: 473, to: 498, title: "Offences and Prosecution", covers: "offences and prosecution" },
  { from: 499, to: 536, title: "Miscellaneous", sets: 2, covers: "miscellaneous provisions such as void transfers and provisional attachment, service of notices, reporting of financial and crypto-asset transactions, the annual information statement, the powers to frame schemes and make rules, and the repeal of the Income Tax Act 1961" },
];

/** Headings used more than once in the Act, told apart so every answer is distinct. */
const QUIZ_HEADINGS: Record<string, string> = {
  "25":  "Interpretation — income from house property",
  "66":  "Interpretation — profits and gains of business or profession",
  "184": "Interpretation — general anti-avoidance rule",
  "189": "Interpretation — mode of payment in certain cases",
  "212": "Interpretation — investment income of non-resident Indians",
  "235": "Interpretation — tonnage tax scheme for shipping companies",
  "261": "Interpretation — powers of income-tax authorities",
  "301": "Interpretation — assessment of search cases",
  "349": "Return of income — registered non-profit organisation",
  "355": "Interpretation — registered non-profit organisations",
  "380": "Interpretation — advance rulings",
  "402": "Interpretation — collection and recovery of tax, including TDS and TCS",
  "461": "Penalty for failure to furnish statements, etc — TDS and TCS statements",
  "464": "Penalty for failure to furnish statements, etc — research associations and approved institutions or funds",
};

const LAST_UPDATED = "2026-10-02";

interface Row {
  n: number;
  old: string;
  topic: string;
  chapter: string;
  part: string;
  groupRef: boolean;
}

// Small seeded PRNG so options and their order are identical on every build.
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const toRow = (m: SectionMap): Row => ({
  n: parseInt(m.new, 10),
  old: m.old,
  topic: QUIZ_HEADINGS[m.new] ?? m.topic,
  chapter: m.chapter,
  part: m.part ?? "",
  groupRef: m.groupRef === true,
});

const ROWS: Row[] = MAPPINGS.map(toRow).sort((a, b) => a.n - b.n);

function earlierReference(row: Row): string {
  const o = row.old.trim();
  if (!o || o === "—" || o === "-") {
    return "It is a new provision with no direct equivalent in the Income Tax Act 1961.";
  }
  const plural = /[,&]|\band\b|\bto\b/.test(o);
  const refs = `${plural ? "Sections" : "Section"} ${o}`;
  if (row.groupRef) {
    // ICAI maps the whole group to these provisions together.
    const group = ROWS.filter((r) => r.groupRef && r.old === row.old);
    const first = group[0]!.n;
    const last = group[group.length - 1]!.n;
    return `Sections ${first} to ${last} of the 2025 Act together correspond to ${refs} of the Income Tax Act 1961.`;
  }
  return `Under the Income Tax Act 1961 this was ${refs}.`;
}

function buildQuestion(row: Row, pool: Row[], label: string): QuizQuestion {
  const rand = rng(row.n * 2654435761);

  // Distractors come from the same unit, two of them from the nearest
  // sections — the ones genuinely confused in an exam — and one from further
  // away, so options are plausible without being uniform.
  const others = pool
    .filter((p) => p.topic !== row.topic)
    .sort((a, b) => Math.abs(a.n - row.n) - Math.abs(b.n - row.n));

  const near = others.slice(0, 6);
  const far = others.slice(6);
  const picked: string[] = [];
  const take = (from: Row[]) => {
    const left = from.filter((p) => !picked.includes(p.topic));
    const choice = left[Math.floor(rand() * left.length)];
    if (choice) picked.push(choice.topic);
  };
  take(near);
  take(near);
  take(far.length ? far : near);
  while (picked.length < 3) take(others);

  const options = [row.topic, ...picked.slice(0, 3)];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = options[i]!;
    options[i] = options[j]!;
    options[j] = tmp;
  }

  return {
    id: `sec-${row.n}`,
    question: `What does Section ${row.n} of the Income Tax Act 2025 deal with?`,
    options: options as [string, string, string, string],
    correct: options.indexOf(row.topic) as 0 | 1 | 2 | 3,
    explanation: `Section ${row.n} deals with: ${row.topic}. ${earlierReference(row)}`,
    section: label,
  };
}

const startsBlock = (i: number) => {
  const prev = ROWS[i - 1];
  const cur = ROWS[i]!;
  return !prev || prev.chapter !== cur.chapter || prev.part !== cur.part;
};
const endsBlock = (i: number) => {
  const next = ROWS[i + 1];
  const cur = ROWS[i]!;
  return !next || next.chapter !== cur.chapter || next.part !== cur.part;
};

/** "Chapter IV, Part D", "Chapters V–VII", "Chapter XV and Chapter XVI, Part A". */
function coverageLabel(members: Row[]): string {
  const chapters = members.map((r) => r.chapter).filter((c, i, a) => a.indexOf(c) === i);
  const segments = chapters.map((ch) => {
    const mine = members.filter((r) => r.chapter === ch);
    const whole = mine.length === ROWS.filter((r) => r.chapter === ch).length;
    if (whole) return { ch, whole, text: `Chapter ${ch}` };
    const parts = mine.map((r) => r.part).filter((p, i, a) => a.indexOf(p) === i);
    const p = parts.length === 1 ? `Part ${parts[0]}` : `Parts ${parts[0]}–${parts[parts.length - 1]}`;
    return { ch, whole, text: `Chapter ${ch}, ${p}` };
  });
  if (segments.length > 1 && segments.every((s) => s.whole)) {
    return `Chapters ${segments[0]!.ch}–${segments[segments.length - 1]!.ch}`;
  }
  return segments.map((s) => s.text).join(" and ");
}

function buildChapters(): QuizChapter[] {
  // Units must tile the Act exactly, each on chapter or part boundaries, so a
  // change to the mapping can never silently drop or misfile a section.
  let expected = ROWS[0]!.n;
  for (const u of UNITS) {
    const i = ROWS.findIndex((r) => r.n === u.from);
    const j = ROWS.findIndex((r) => r.n === u.to);
    if (u.from !== expected || i < 0 || j < i) {
      throw new Error(`section-quiz: unit ${u.from}–${u.to} does not continue from section ${expected}`);
    }
    if (!startsBlock(i) || !endsBlock(j)) {
      throw new Error(`section-quiz: unit ${u.from}–${u.to} is not on chapter or part boundaries`);
    }
    expected = u.to + 1;
  }
  if (expected !== ROWS[ROWS.length - 1]!.n + 1) {
    throw new Error(`section-quiz: sections from ${expected} onwards are not covered by any unit`);
  }

  const chapters: QuizChapter[] = [];

  for (const u of UNITS) {
    const members = ROWS.filter((r) => r.n >= u.from && r.n <= u.to);
    const label = coverageLabel(members);
    const sets = u.sets ?? 1;
    const base = Math.floor(members.length / sets);
    const extra = members.length % sets;

    let cursor = 0;
    for (let s = 0; s < sets; s++) {
      const size = base + (s < extra ? 1 : 0);
      const slice = members.slice(cursor, cursor + size);
      cursor += size;

      const first = slice[0];
      const last = slice[slice.length - 1];
      if (!first || !last) continue;
      const a = first.n;
      const b = last.n;
      const set = sets > 1 ? `Set ${s + 1} of ${sets}` : undefined;

      chapters.push({
        slug: `sections-${a}-${b}`,
        source: "section-identifier",
        title: `${label}: ${u.title}${set ? ` — ${set}` : ""}`,
        chapter: `Section Identifier · Sections ${a}–${b}`,
        topic: u.title,
        description: `See the section number, pick what it deals with. Covers sections ${a} to ${b} of the Income Tax Act 2025 (${label}) — ${u.covers}. Every answer also shows the corresponding Income Tax Act 1961 section.`,
        difficulty: "Medium",
        questions: slice.map((r) => buildQuestion(r, members, label)),
        lastUpdated: LAST_UPDATED,
        coverage: { label, title: u.title, from: a, to: b, set },
      });
    }
  }

  return chapters;
}

export const SECTION_QUIZ_CHAPTERS: QuizChapter[] = buildChapters();
