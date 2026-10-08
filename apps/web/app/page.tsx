import type { Metadata } from "next";
import Link from "next/link";
import { CASE_LAWS } from "./case-law/_components/case-law-data";
import { SECTIONS } from "./section-explainer/_components/sections-data";
import { DETAILED_ENTRIES } from "./detailed-explainer/_components/detailed-data";
import { MAPPINGS, SECTIONS_IN_FORCE, oldRefs } from "./section-mapping/_components/mapping-data";

export const metadata: Metadata = {
  title:
    "TaxSaral — Income Tax Act 2025: Case Law, Section Guide & Calculators",
  description:
    "The Income Tax Act 2025 in one place — 113 landmark judgments mapped to the new sections, a complete 1961-to-2025 section mapping, plain-language section explainers, in-depth analyses, practice quizzes and free calculators for Tax Year 2026-27. No login, no ads.",
  alternates: { canonical: "https://taxsaral.org" },
  openGraph: {
    title: "TaxSaral — Income Tax Act 2025: Case Law, Guide & Calculators",
    description:
      "113 landmark judgments mapped to IT Act 2025 sections, a complete 1961-to-2025 section mapping, explainers, quizzes and free calculators. No login, no ads.",
    url: "https://taxsaral.org",
    type: "website",
    siteName: "TaxSaral",
  },
};

// Old sections people search for most. The new number is looked up from the
// mapping data, so this list can never disagree with the mapping page.
const FAMILIAR: { old: string; label: string }[] = [
  { old: "80C",    label: "PF, life insurance and similar savings" },
  { old: "87A",    label: "Rebate for resident individuals" },
  { old: "115BAC", label: "New tax regime" },
  { old: "24",     label: "Home loan interest and house property deductions" },
  { old: "44AD",   label: "Presumptive taxation" },
  { old: "45",     label: "Capital gains" },
  { old: "139",    label: "Return of income" },
  { old: "148",    label: "Notice for escaped income" },
  { old: "192",    label: "TDS on salary" },
];

const FAMILIAR_ROWS = FAMILIAR.flatMap(({ old, label }) => {
  const row = MAPPINGS.find((m) => !m.groupRef && oldRefs(m.old).includes(old));
  return row ? [{ old, label, now: row.new }] : [];
});

// Counts are derived from the data at build time rather than hardcoded, so
// they cannot drift as content is added.
const STATS = [
  { value: CASE_LAWS.length,        label: "judgments, each mapped to its new section" },
  { value: SECTIONS_IN_FORCE,       label: "sections traced back to the 1961 Act" },
  { value: SECTIONS.length,         label: "sections explained in plain language" },
  { value: DETAILED_ENTRIES.length, label: "worked, in-depth explainers" },
];

const RESOURCES = [
  {
    href: "/case-law",
    title: "Case Law",
    meta: `${CASE_LAWS.length} judgments`,
    description:
      "Supreme Court and High Court judgments set out as facts, arguments, reasoning and principle, with a note on whether the principle survives the new Act.",
  },
  {
    href: "/section-mapping",
    title: "1961 → 2025 Mapping",
    meta: `${SECTIONS_IN_FORCE} sections`,
    description:
      "Every section of the new Act against its 1961 counterpart. Search by either number, or by topic.",
  },
  {
    href: "/section-explainer",
    title: "Section Explainer",
    meta: `${SECTIONS.length} sections`,
    description:
      "The provisions that come up most in practice: what each says, what changed from 1961, and how it applies.",
  },
  {
    href: "/detailed-explainer",
    title: "Detailed Explainer",
    meta: `${DETAILED_ENTRIES.length} analyses`,
    description:
      "Slump sale, buyback, deemed dividend, grandfathering and the other provisions that need a worked computation to make sense.",
  },
  {
    href: "/quiz",
    title: "Quiz",
    meta: "Chapter-wise",
    description:
      "Practise the new section numbers chapter by chapter, test yourself on the explainers, or work through ICAI case studies.",
  },
  {
    href: "/guide",
    title: "Beginner's Guide",
    meta: "Start here",
    description:
      "The two regimes, deductions, TDS and advance tax, explained from the beginning.",
  },
];

const CALCULATORS = [
  {
    href: "/calculators/regime-optimizer",
    title: "Regime Optimizer",
    section: "s. 202",
    description: "Default or optional regime: which costs you less, including the s. 156 rebate and marginal relief.",
  },
  {
    href: "/calculators/hra",
    title: "HRA Exemption",
    section: "Sch. III",
    description: "The least of the three limits, for metro and non-metro cities.",
  },
  {
    href: "/calculators/house-property-income",
    title: "House Property Income",
    section: "ss. 20–25",
    description: "Self-occupied, let-out and deemed let-out property, co-ownership, arrears and loss set-off.",
  },
  {
    href: "/calculators/multiple-employer",
    title: "Multiple Employer",
    section: "s. 392",
    description: "Changed jobs this year? Combine salary and TDS from each employer and see what is still owed.",
  },
  {
    href: "/calculators/advance-tax",
    title: "Advance Tax",
    section: "ss. 403–408",
    description: "Quarterly instalments, and whether you cross the ₹10,000 threshold at all.",
  },
  {
    href: "/calculators/residential-status",
    title: "Residential Status",
    section: "s. 6",
    description: "Resident, RNOR or non-resident, worked through question by question with the exceptions.",
  },
];

const FAQS = [
  {
    q: "Which income tax act does TaxSaral cover?",
    a: "The Income Tax Act 2025 exclusively — the new Act that replaces the Income Tax Act 1961 from Tax Year 2026-27 onwards. The section numbers are different throughout: the rebate is Section 156 (old 87A), the regime slabs sit in Section 202, and advance tax in Sections 403 to 410. Every calculator, explainer and judgment on the site cites the 2025 section, and the case law pages show the old provision alongside the new one.",
  },
  {
    q: "I know the old section number. How do I find the new one?",
    a: "Use the 1961 to 2025 Section Mapping. It is searchable by either number, so you can enter the provision you know — Section 45 for capital gains, say — and find its equivalent in the new Act, which is Section 67. Every case law entry on the site also displays the mapping for the provisions it was decided under, so you can see at a glance where a familiar judgment now sits.",
  },
  {
    q: "Does old case law still apply under the Income Tax Act 2025?",
    a: "Often yes, but not always, and that is exactly what the Case Law section is for. Where a provision has merely been renumbered, the earlier judgments continue to govern. Where it has been recast, the position can change — B.C. Srinivasa Setty, for instance, held that no capital gains arise where the cost of acquisition cannot be determined, but Section 90 of the new Act now assigns a nil cost to self-generated assets, so the outcome for goodwill no longer follows. Each judgment on the site carries a note explaining how far the principle still holds.",
  },
  {
    q: "Is my data private? Do you store anything?",
    a: "Nothing leaves your browser. All calculations run locally using JavaScript. We do not collect, transmit, or store any of the numbers you enter. There are no accounts, no cookies with personal data, and no analytics that track your inputs.",
  },
  {
    q: "Can I rely on these results to file my return?",
    a: "These calculators are designed to help you understand your approximate tax position and have an informed conversation with your Chartered Accountant. They do not account for every individual circumstance — carry-forward losses from prior years, exemptions specific to your employment, or special income types like ESOPs and foreign income may require separate treatment. Always verify with a CA before filing.",
  },
  {
    q: "What is the difference between the default and optional regime?",
    a: "Under IT Act 2025, the default regime has 7 slabs (0%–30%) with a full tax rebate up to ₹12 lakh income (Section 156) and a ₹75,000 standard deduction. Most deductions like 80C, HRA, and home loan interest are not available. The optional regime has 4 slabs (0%–30%) but allows most deductions — 80C (Section 123), HRA (Schedule III), home loan interest (Section 22), health insurance (Section 126), and more — with a ₹50,000 standard deduction. Use the Regime Optimizer above to compare both for your specific income.",
  },
  {
    q: "Do these calculators work for all income types?",
    a: "The current suite focuses on salaried income, house property income, and advance tax — the most common needs for individual taxpayers. Capital gains, business income (PGBP), and foreign income are not covered by the current calculators, though all three are covered in the Section Explainer and the Case Law section.",
  },
];

// Makes the answers below eligible for rich results in Google.
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      {/* ── Opening ──────────────────────────────────────────────────── */}
      <section className="border-b">
        <div className="container mx-auto grid max-w-5xl gap-12 py-14 md:grid-cols-[1.25fr_1fr] md:py-20">
          <div>
            <p className="text-sm text-muted-foreground">
              Income Tax Act, 2025 &middot; Tax Year 2026-27
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.1] sm:text-5xl">
              The section numbers you know changed on 1&nbsp;April 2026.
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
              TaxSaral keeps the old Act and the new one side by side. The
              judgments you rely on, mapped to their new sections. Plain
              explanations of the provisions that matter. Calculators for this
              tax year. Free to use, nothing to sign up for.
            </p>

            <form action="/section-mapping" method="get" className="mt-8 max-w-md">
              <input type="hidden" name="by" value="old" />
              <label htmlFor="old-section" className="text-sm font-medium">
                Know the old section? Find the new one.
              </label>
              <div className="mt-2 flex">
                <input
                  id="old-section"
                  name="q"
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  placeholder="80C, 54, 143(3)…"
                  className="min-w-0 flex-1 rounded-l-md border border-r-0 border-input bg-card px-3 py-2.5 font-mono text-sm placeholder:font-sans placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
                <button
                  type="submit"
                  className="rounded-r-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Look up
                </button>
              </div>
            </form>
            <p className="mt-4 text-sm text-muted-foreground">
              Or go straight to the{" "}
              <Link href="/case-law" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-primary">
                case law
              </Link>{" "}
              or the{" "}
              <Link href="/calculators/regime-optimizer" className="text-foreground underline decoration-border underline-offset-4 hover:decoration-primary">
                regime calculator
              </Link>
              .
            </p>
          </div>

          <div className="self-start md:pt-9">
            <p className="mb-3 text-sm font-medium">Ones you&apos;ll need often</p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="pb-2 pr-3 font-normal">1961</th>
                  <th className="pb-2 pr-3 font-normal">2025</th>
                  <th className="pb-2 font-normal">What it covers</th>
                </tr>
              </thead>
              <tbody>
                {FAMILIAR_ROWS.map(({ old, now, label }) => (
                  <tr key={old} className="border-b border-border/60 last:border-0">
                    <td className="py-2 pr-3 font-mono text-muted-foreground">{old}</td>
                    <td className="py-2 pr-3 font-mono font-medium text-primary">
                      <Link href={`/section-mapping?q=${encodeURIComponent(old)}&by=old`} className="hover:underline underline-offset-4">
                        {now}
                      </Link>
                    </td>
                    <td className="py-2 text-muted-foreground">{label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Numbers ──────────────────────────────────────────────────── */}
      <section className="border-b bg-secondary/40">
        <dl className="container mx-auto grid max-w-5xl grid-cols-2 md:grid-cols-4">
          {STATS.map(({ value, label }, i) => (
            <div
              key={label}
              className={`py-6 pr-4 ${i % 2 === 1 ? "pl-4 border-l md:pl-6" : ""} ${i === 2 ? "md:border-l md:pl-6" : ""} ${i >= 2 ? "border-t md:border-t-0" : ""}`}
            >
              <dt className="sr-only">{label}</dt>
              <dd className="font-serif text-3xl font-semibold">{value}</dd>
              <dd className="mt-1 text-sm leading-snug text-muted-foreground">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Contents ─────────────────────────────────────────────────── */}
      <section className="container mx-auto max-w-5xl py-14">
        <h2 className="text-2xl font-semibold">What&apos;s on the site</h2>
        <ul className="mt-6 grid gap-x-12 md:grid-cols-2">
          {RESOURCES.map(({ href, title, meta, description }) => (
            <li key={href} className="border-t">
              <Link href={href} className="group block py-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-semibold group-hover:text-primary group-hover:underline underline-offset-4 decoration-1">
                    {title}
                  </h3>
                  <span className="shrink-0 text-xs text-muted-foreground">{meta}</span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Calculators ──────────────────────────────────────────────── */}
      <section className="border-t">
        <div className="container mx-auto max-w-5xl py-14">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold">Calculators</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Each one works out a single part of your tax and shows the section
              behind every figure. Results from the HRA and house property
              calculators carry over into the regime comparison.
            </p>
          </div>
          <ul className="mt-6 divide-y border-y">
            {CALCULATORS.map(({ href, title, section, description }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group grid gap-1 py-4 sm:grid-cols-[13rem_6.5rem_1fr] sm:items-baseline sm:gap-4"
                >
                  <span className="font-medium group-hover:text-primary group-hover:underline underline-offset-4">
                    {title}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{section}</span>
                  <span className="text-sm text-muted-foreground">{description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How it's made ────────────────────────────────────────────── */}
      <section className="border-t bg-secondary/40">
        <div className="container mx-auto grid max-w-5xl gap-10 py-14 md:grid-cols-[1fr_2fr]">
          <h2 className="text-2xl font-semibold">How the site is put together</h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Rates, slabs, limits and section numbers come from the text of the
              Income Tax Act, 2025 itself, not from summaries or articles. The
              section is printed next to every figure, so you can check it
              yourself.
            </p>
            <p>
              The calculators run entirely in your browser. What you type is
              never sent anywhere or stored, and there is no account to create.
            </p>
            <p>
              It is a reference and a way to understand your own position. It
              is not a substitute for a Chartered Accountant who knows your full
              circumstances, especially before you file.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="border-t">
        <div className="container mx-auto max-w-3xl py-14">
          <h2 className="text-2xl font-semibold">Questions people ask</h2>
          <div className="mt-6 divide-y border-y">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group">
                <summary className="flex cursor-pointer select-none list-none items-baseline justify-between gap-6 py-4 font-medium [&::-webkit-details-marker]:hidden">
                  {q}
                  <span aria-hidden className="shrink-0 text-sm text-muted-foreground group-open:hidden">Show</span>
                  <span aria-hidden className="hidden shrink-0 text-sm text-muted-foreground group-open:inline">Hide</span>
                </summary>
                <p className="pb-5 pr-10 text-[15px] leading-relaxed text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            For guidance only. Verify with a CA before filing. All calculators use
            Income Tax Act 2025 rates for Tax Year 2026-27 (AY 2027-28).
          </p>
        </div>
      </section>
    </main>
  );
}
