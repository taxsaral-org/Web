// Section Identifier quizzes — "Section 67 deals with…?" — generated from the
// 1961→2025 section mapping so they always match the rest of the site.
//
// Chapters are defined by contiguous section ranges, in the order the sections
// appear in the Income Tax Act 2025. The mapping's own category labels are not
// used for grouping because a few are misfiled (191–198 sit in the special
// rates block but are labelled Capital Gains; 332–355 are the non-profit
// sections but are labelled Collection & Recovery). Ranges follow the Act.

import { MAPPINGS } from "@/app/section-mapping/_components/mapping-data";
import type { QuizChapter, QuizQuestion } from "./quiz-data";

interface ChapterGroup {
  from: number;
  to: number;
  title: string;
  /** Completes the sentence "…of the Income Tax Act 2025 — ___." */
  covers: string;
}

const GROUPS: ChapterGroup[] = [
  { from: 1,   to: 14,  title: "Preliminary, Charge & Scope of Income", covers: "definitions, the charge of tax, residence, income deemed to accrue in India and exempt income" },
  { from: 15,  to: 25,  title: "Salaries & House Property", covers: "the charge on salary, perquisites and deductions from salary, and income from house property" },
  { from: 26,  to: 66,  title: "Profits & Gains of Business or Profession", covers: "the charging provision, allowable deductions, depreciation, disallowances and special computation rules" },
  { from: 67,  to: 91,  title: "Capital Gains", covers: "the charge, transactions not regarded as transfer, computation, special valuation rules and reinvestment exemptions" },
  { from: 92,  to: 107, title: "Other Sources, Clubbing & Aggregation", covers: "income from other sources, income of others included in the assessee's income, and unexplained credits, investments and expenditure" },
  { from: 108, to: 121, title: "Set-off & Carry Forward of Losses", covers: "set-off of losses within and across heads and their carry forward" },
  { from: 122, to: 154, title: "Deductions from Gross Total Income", covers: "the deductions allowed from gross total income" },
  { from: 155, to: 160, title: "Rebates & Double Taxation Relief", covers: "rebates, relief for arrears and treaty and unilateral double taxation relief" },
  { from: 161, to: 173, title: "Transfer Pricing", covers: "arm's length pricing, associated enterprises, safe harbours, advance pricing agreements and documentation" },
  { from: 174, to: 206, title: "Anti-Avoidance, Special Rates, MAT & AMT", covers: "specific anti-avoidance rules, GAAR, special tax rates, concessional regimes, MAT and AMT" },
  { from: 207, to: 235, title: "Non-Residents, Special Entities & Tonnage Tax", covers: "special rates for non-residents, the NRI provisions, pass-through vehicles and the tonnage tax scheme" },
  { from: 236, to: 261, title: "Income-tax Authorities, Survey & Search", covers: "the authorities and their jurisdiction, powers, search and seizure, and survey" },
  { from: 262, to: 301, title: "Returns & Assessment", covers: "filing of returns, scrutiny, reassessment, rectification, and search and block assessments" },
  { from: 302, to: 310, title: "Representative Assessees & Special Cases", covers: "legal representatives, representative assessees, trusts and members of associations" },
  { from: 311, to: 331, title: "Collection & Recovery of Tax", covers: "collection and recovery of tax and the liability of particular persons" },
  { from: 332, to: 355, title: "Registered Non-Profit Organisations", covers: "registration, income, application and accumulation, and violations by registered NPOs" },
  { from: 356, to: 389, title: "Appeals, Revision, Settlement & Advance Rulings", covers: "appeals to the Commissioner (Appeals) and Tribunal, revision, settlement and advance rulings" },
  { from: 390, to: 407, title: "Deduction & Collection at Source", covers: "TDS and TCS" },
  { from: 408, to: 418, title: "Advance Tax", covers: "liability for, computation of and instalments of advance tax" },
  { from: 419, to: 437, title: "Refunds, Interest & Fees", covers: "refunds, and interest and fees for defaults" },
  { from: 438, to: 472, title: "Penalties", covers: "penalties for under-reporting, misreporting and other defaults" },
  { from: 473, to: 498, title: "Offences & Prosecution", covers: "offences and prosecution" },
  { from: 499, to: 536, title: "Miscellaneous Provisions", covers: "miscellaneous and procedural provisions" },
];

/** A group larger than this is split into parts so no single quiz is a slog. */
const MAX_WHOLE = 30;
const PART_SIZE = 25;
const LAST_UPDATED = "2026-10-02";

interface Row {
  n: number;
  label: string;
  old: string;
  topic: string;
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

// "11 / Sch. II" → "11 (read with Schedule II)"; plain numbers pass through.
function displayLabel(raw: string): string {
  const m = raw.match(/^(\d+)\s*\/\s*Sch\.\s*(\w+)$/i);
  return m ? `${m[1]} (read with Schedule ${m[2]})` : raw;
}

function earlierReference(old: string): string {
  const o = old.trim();
  if (!o || o === "—" || o === "-") {
    return "It has no direct equivalent in the Income Tax Act 1961.";
  }
  if (/^\d/.test(o)) {
    const plural = /[/,&]|\band\b/.test(o);
    return `Under the Income Tax Act 1961 this was ${plural ? "Sections" : "Section"} ${o}.`;
  }
  return `Corresponding earlier reference: ${o}.`;
}

function buildQuestion(row: Row, pool: Row[], groupTitle: string): QuizQuestion {
  const rand = rng(row.n * 2654435761);

  // Distractors come from the same chapter, two of them from the nearest
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
    question: `What does Section ${row.label} of the Income Tax Act 2025 deal with?`,
    options: options as [string, string, string, string],
    correct: options.indexOf(row.topic) as 0 | 1 | 2 | 3,
    explanation: `Section ${row.label} deals with: ${row.topic}. ${earlierReference(row.old)}`,
    section: groupTitle,
  };
}

function buildChapters(): QuizChapter[] {
  const rows: Row[] = MAPPINGS.map((m) => ({
    n: parseInt(m.new, 10),
    label: displayLabel(m.new),
    old: m.old,
    topic: m.topic,
  }))
    .filter((r) => !Number.isNaN(r.n))
    .sort((a, b) => a.n - b.n);

  // Fail the build loudly if the mapping ever gains a section no group covers,
  // rather than silently dropping it from the quiz.
  const uncovered = rows.filter((r) => !GROUPS.some((g) => r.n >= g.from && r.n <= g.to));
  if (uncovered.length) {
    throw new Error(
      `section-quiz: sections not covered by any chapter group: ${uncovered.map((r) => r.n).join(", ")}`
    );
  }

  const chapters: QuizChapter[] = [];

  for (const g of GROUPS) {
    const members = rows.filter((r) => r.n >= g.from && r.n <= g.to);
    if (members.length === 0) continue;

    const parts = members.length > MAX_WHOLE ? Math.ceil(members.length / PART_SIZE) : 1;
    const base = Math.floor(members.length / parts);
    const extra = members.length % parts;

    let cursor = 0;
    for (let p = 0; p < parts; p++) {
      const size = base + (p < extra ? 1 : 0);
      const slice = members.slice(cursor, cursor + size);
      cursor += size;

      const first = slice[0];
      const last = slice[slice.length - 1];
      if (!first || !last) continue;
      const a = first.n;
      const b = last.n;
      const partLabel = parts > 1 ? ` — Part ${p + 1} of ${parts}` : "";

      chapters.push({
        slug: `sections-${a}-${b}`,
        source: "section-identifier",
        title: `Sections ${a}–${b}: ${g.title}${partLabel}`,
        chapter: "Section Identifier",
        topic: g.title,
        description: `See the section number, pick what it deals with. Covers sections ${a} to ${b} of the Income Tax Act 2025 — ${g.covers}. Every answer also shows the corresponding Income Tax Act 1961 section.`,
        difficulty: "Medium",
        questions: slice.map((r) => buildQuestion(r, members, g.title)),
        lastUpdated: LAST_UPDATED,
      });
    }
  }

  return chapters;
}

export const SECTION_QUIZ_CHAPTERS: QuizChapter[] = buildChapters();
