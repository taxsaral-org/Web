import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { ResidentialStatusClient } from "./_components/rs-client";

const BASE = "https://taxsaral.org";
const PAGE_URL = `${BASE}/calculators/residential-status`;

export const metadata: Metadata = {
  title: "Residential Status Calculator 2026-27 — ROR / RNOR / NR | TaxSaral",
  description: "Determine your Indian tax residential status under IT Act 2025 — Resident (ROR), Resident Not Ordinarily Resident (RNOR), or Non-Resident (NR). Covers NRI, PIO, foreign nationals.",
  keywords: ["residential status calculator", "ROR RNOR NRI", "section 6 IT Act 2025", "non resident India tax", "NRI residential status", "182 days rule", "PIO tax status"],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "Residential Status Calculator 2026-27 | TaxSaral", description: "Free ROR / RNOR / NR residential status calculator under IT Act 2025.", url: PAGE_URL, type: "website", siteName: "TaxSaral" },
  twitter: { card: "summary", title: "Residential Status Calculator 2026-27 | TaxSaral", description: "Free residential status calculator — ROR, RNOR, NR under IT Act 2025." },
};

const KEY_POINTS = [
  {
    label: "Three possible statuses",
    desc: "Resident and Ordinarily Resident (ROR), Resident but Not Ordinarily Resident (RNOR), or Non-Resident — each with different tax implications on foreign income.",
  },
  {
    label: "182-day primary test",
    desc: "You are Resident if physically present in India ≥ 182 days in the tax year [Section 6(2)(a)]. If that fails, a secondary 60-day test applies — subject to exceptions for Indian citizens and PIOs.",
  },
  {
    label: "Anti-avoidance: Section 6(7)",
    desc: "High-income Indian citizens (> ₹15 lakh, excl. foreign sources) who are not liable to tax anywhere are deemed Resident under Section 6(7) — always RNOR, never ROR.",
  },
];

const FAQS = [
  {
    q: "Why does residential status matter — aren't I already paying tax in India?",
    a: "Residential status determines the SCOPE of what is taxable in India, not just the rate. A Non-Resident pays tax only on India-source income. An RNOR pays tax on India-source income plus income from India-controlled businesses, but foreign income is exempt. An ROR pays tax on worldwide income. This distinction is critical if you have salary, investments, property, or bank accounts outside India.",
  },
  {
    q: "What is the difference between a 'visit' and being resident? Can I be a tourist and still be taxed as Resident?",
    a: "Yes. Residential status is determined purely by the number of days physically present in India — your intent (tourist vs. working) does not matter. If you spend 182 or more days in India in a tax year, you are Resident regardless of the purpose of your stay.",
  },
  {
    q: "I am an Indian citizen living abroad. I visited India for 90 days. Am I Resident?",
    a: "Not necessarily. Section 6(4) says that an Indian citizen or PIO who is ordinarily resident abroad and comes on a visit to India is Resident only if they exceed the 182-day threshold (6(2)(a)). The 60-day shortcut (6(2)(b)) is disabled. Exception: if your total income excluding foreign sources exceeds ₹15 lakh, Section 6(5) applies — you can become Resident if you exceed 120 days this year AND 365+ days over the prior 4 years.",
  },
  {
    q: "What does 'Person of Indian Origin (PIO)' mean for tax purposes?",
    a: "A PIO is a foreign citizen (i.e., not an Indian citizen) whose parents or grandparents were born in undivided India or who was themselves born in undivided India. PIOs are treated like Indian citizens for the purpose of Sections 6(4) and 6(5) — the 60-day shortcut is similarly restricted for them.",
  },
  {
    q: "What does RNOR mean practically, and how long does it last?",
    a: "An RNOR (Resident but Not Ordinarily Resident) is taxable on India-source income and income from businesses/professions controlled or set up in India — but foreign income remains exempt. This is especially beneficial for returning NRIs. The RNOR window typically lasts 2–3 years depending on your prior residency history (Sections 6(13)(a)(i) and (a)(ii)).",
  },
  {
    q: "What is the Section 6(7) deemed resident provision, and am I at risk?",
    a: "Section 6(7) is an anti-avoidance provision. It deems an Indian citizen as Resident (and RNOR) if: (1) they are a citizen of India, (2) they are NOT liable to tax in any country/territory by reason of domicile or residence, AND (3) their total income excluding foreign sources exceeds ₹15 lakh. Essentially, this targets high-income Indian citizens who have no tax home anywhere in the world — it prevents them from having no country claim their income. If you pay tax in another country as a resident, 6(7) does not apply to you.",
  },
];

const RS_JSONLD_APP = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Residential Status Calculator 2026-27",
  url: PAGE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  description: "Free ROR / RNOR / Non-Resident status calculator under IT Act 2025 Section 6 for Tax Year 2026-27.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  provider: { "@type": "Organization", name: "TaxSaral", url: BASE },
};

export default function ResidentialStatusPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(RS_JSONLD_APP) }} />
      {/* Page header */}
      <div className="mb-8">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Tax Year 2026-27
          </span>
          <span>·</span>
          <span>Income Tax Act 2025</span>
          <span>·</span>
          <span>Section 6(1)–6(14)</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Residential Status Calculator</h1>
        <p className="mt-2 text-muted-foreground">
          Determine whether you are Resident and Ordinarily Resident (ROR), Resident but Not Ordinarily Resident (RNOR), or Non-Resident under the Income Tax Act 2025. Answer one question at a time.
        </p>
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm dark:border-amber-700 dark:bg-amber-950">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-amber-800 dark:text-amber-200">
            <span className="font-semibold">For individuals only.</span> HUF, companies, and other entities (Sections 6(9)–6(11)) are out of scope. Verify with a CA before filing, especially for complex cross-border situations.
          </p>
        </div>
      </div>

      {/* Interactive wizard */}
      <ResidentialStatusClient />

      {/* Educational content */}
      <div className="mt-16 space-y-10">
        <hr />

        <div>
          <h2 className="mb-1 text-xl font-semibold">Understanding Residential Status</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Section 6 of the Income Tax Act 2025 is identical in structure to Section 6 of the 1961 Act — the section numbers referenced in legal documents, court orders, and professional advice remain Section 6.
            The critical concept is that your residential status determines the <em>scope</em> of what India can tax, not just the rate.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {KEY_POINTS.map(({ label, desc }) => (
              <div key={label} className="rounded-lg border bg-card p-4">
                <p className="mb-1 text-sm font-semibold">{label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Status comparison table */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">What income is taxable under each status?</h2>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Income type</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">ROR</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">RNOR</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Non-Resident</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["India-source income (salary, house property, etc.)", "✓ Taxable", "✓ Taxable", "✓ Taxable"],
                  ["Business income from India-controlled business", "✓ Taxable", "✓ Taxable", "✓ Taxable"],
                  ["Profession income from India-set-up profession", "✓ Taxable", "✓ Taxable", "✓ Taxable"],
                  ["Foreign salary / pension", "✓ Taxable", "✗ Exempt", "✗ Exempt"],
                  ["Foreign bank interest / dividends", "✓ Taxable", "✗ Exempt", "✗ Exempt"],
                  ["Capital gains on foreign assets", "✓ Taxable", "✗ Exempt", "✗ Exempt"],
                  ["Foreign rental income", "✓ Taxable", "✗ Exempt", "✗ Exempt"],
                ].map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className={`px-4 py-2.5 text-sm align-top ${j === 0 ? "text-muted-foreground" : cell.startsWith("✓") ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            DTAA (Double Taxation Avoidance Agreement) relief may apply to reduce or eliminate tax on income that is taxable in both India and another country.
          </p>
        </div>

        {/* Determination flowchart in text */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">How status is determined — computation order (Section 6)</h2>
          <div className="space-y-3">
            {[
              {
                step: "1",
                title: "Primary test: Section 6(2)",
                body: "Resident if ≥ 182 days in India [6(2)(a)], OR if ≥ 60 days this year AND ≥ 365 days over the prior 4 years [6(2)(b)]. The 60-day test is raised to 120 days for high-income citizen/PIO visitors [6(5)] and disabled entirely for others [6(3), 6(4)].",
              },
              {
                step: "2",
                title: "Anti-avoidance: Section 6(7) — only if NOT resident under Step 1",
                body: "Section 6(8) mandates this step is skipped if already resident under 6(2)–6(6). If not resident: an Indian citizen with income > ₹15 lakh and no foreign tax domicile is DEEMED Resident — always RNOR per 6(13)(c).",
              },
              {
                step: "3",
                title: "ROR vs RNOR: Section 6(13) — only for Residents",
                body: "A Resident is RNOR if: (a)(i) was NR in 9+ of last 10 years; OR (a)(ii) spent ≤ 729 days in India over last 7 years; OR (b) citizen/PIO visitor with income > ₹15L and 120–181 days; OR (c) deemed resident under 6(7). Otherwise: ROR.",
              },
              {
                step: "4",
                title: "Non-Resident: Section 6(1)",
                body: "If neither Step 1 nor Step 2 apply, the individual is Non-Resident for the tax year.",
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex gap-4 rounded-lg border bg-card p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {step}
                </div>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Common questions</h2>
          <div className="space-y-2">
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group rounded-lg border bg-card">
                <summary className="flex cursor-pointer select-none list-none items-center justify-between px-5 py-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="ml-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45 text-lg leading-none">+</span>
                </summary>
                <div className="border-t px-5 py-4 text-sm text-muted-foreground leading-relaxed">{a}</div>
              </details>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Legal reference: </span>
          Section 6 (Residential Status), Income Tax Act 2025 (equivalent to Section 6, IT Act 1961).
          Sub-sections 6(1)–6(14) verified verbatim against official gazette text.
          Tax Year 2026-27 (AY 2027-28).
        </div>
      </div>
    </div>
  );
}
