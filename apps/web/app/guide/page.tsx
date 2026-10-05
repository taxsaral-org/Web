import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Income Tax Act 2025 — Complete Beginner's Guide | TaxSaral",
  description: "Understand India's Income Tax Act 2025 from scratch. Learn the Tax Year concept, two tax regimes, new section numbers vs old 1961 Act, key deductions, TDS, advance tax, and how to prepare for your CA.",
  keywords: ["income tax act 2025 guide", "IT Act 2025 explained", "income tax India beginners", "old vs new tax regime", "income tax 2026-27 guide", "income tax for salaried", "what is income tax"],
  alternates: { canonical: "https://taxsaral.org/guide" },
  openGraph: { title: "Income Tax Act 2025 — Complete Beginner's Guide | TaxSaral", description: "Understand IT Act 2025 from scratch — two regimes, deductions, TDS, and advance tax explained simply.", url: "https://taxsaral.org/guide", type: "website", siteName: "TaxSaral" },
  twitter: { card: "summary", title: "Income Tax Act 2025 Beginner's Guide | TaxSaral", description: "Understand IT Act 2025 — two regimes, deductions, TDS, and advance tax explained simply." },
};

// ── Table of contents ─────────────────────────────────────────────────────────

const TOC = [
  { id: "what-is-it-act-2025",  label: "What is the IT Act 2025?" },
  { id: "tax-year",             label: "Tax Year — the biggest change" },
  { id: "heads-of-income",      label: "Five Heads of Income" },
  { id: "two-regimes",          label: "The Two Tax Regimes" },
  { id: "key-deductions",       label: "Key Deductions" },
  { id: "how-tds-works",        label: "How TDS Works" },
  { id: "advance-tax",          label: "Advance Tax Basics" },
  { id: "section-numbers",      label: "New Section Numbers" },
  { id: "ca-checklist",         label: "Checklist for Your CA" },
];

// ── Reusable primitives ───────────────────────────────────────────────────────

function SectionAnchor({ id }: { id: string }) {
  return <div id={id} className="scroll-mt-20" />;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 mb-3 text-2xl font-semibold first:mt-0">{children}</h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-6 mb-2 text-lg font-semibold">{children}</h3>;
}

function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: "info" | "tip" | "warn" | "success";
  title?: string;
  children: React.ReactNode;
}) {
  const rule = {
    info: "border-sky-600",
    tip: "border-primary",
    warn: "border-amber-500",
    success: "border-emerald-600",
  };
  return (
    <div className={`my-5 border-l-2 pl-4 leading-relaxed text-foreground/85 ${rule[variant]}`}>
      {title && <p className="font-semibold text-foreground">{title}</p>}
      {children}
    </div>
  );
}

function Tr({ cells, header }: { cells: string[]; header?: boolean }) {
  const Tag = header ? "th" : "td";
  return (
    <tr className={header ? "bg-secondary/60" : "border-t"}>
      {cells.map((c, i) => (
        <Tag key={i} className="px-4 py-2.5 text-left text-sm font-normal align-top">
          {c}
        </Tag>
      ))}
    </tr>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-4 overflow-x-auto rounded-md border bg-card">
      <table className="w-full">
        <thead><Tr cells={headers} header /></thead>
        <tbody>{rows.map((r, i) => <Tr key={i} cells={r} />)}</tbody>
      </table>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GuidePage() {
  return (
    <div className="container mx-auto max-w-6xl py-10 sm:py-12">
      {/* Hero */}
      <div className="mb-10 max-w-3xl">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="text-foreground">
            IT Act 2025
          </span>
          <span>·</span>
          <span>Tax Year 2026-27</span>
          <span>·</span>
          <span>For individual taxpayers</span>
        </div>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Understanding the Income Tax Act 2025
        </h1>
        <p className="mt-4 text-[17px] text-muted-foreground leading-relaxed">
          India replaced its 60-year-old tax law with a completely restructured Act effective from Tax Year 2026-27.
          This guide explains what changed, what stayed the same, and what you need to know before talking to your CA.
        </p>
        <Callout variant="warn" title="For reference only">
          This is an educational guide — not tax advice. Every taxpayer&apos;s situation is different.
          Verify with a Chartered Accountant before filing your return.
        </Callout>
      </div>

      {/* Body: TOC sidebar + content */}
      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">

        {/* ── Sticky TOC (desktop only) ── */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 border-l pl-4">
            <p className="mb-2 text-sm font-medium">
              On this page
            </p>
            <nav className="space-y-0.5">
              {TOC.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── Main content ── */}
        <article className="min-w-0 space-y-2 text-[15px] leading-relaxed">

          {/* ── 1. What is IT Act 2025 ── */}
          <SectionAnchor id="what-is-it-act-2025" />
          <SectionHeading>What is the Income Tax Act 2025?</SectionHeading>
          <p className="text-muted-foreground">
            The Income Tax Act 2025 is India&apos;s new tax law that replaces the Income Tax Act 1961.
            The 1961 Act had accumulated over six decades of amendments, making it dense and difficult to navigate.
            The 2025 Act is a <strong>clean rewrite</strong> — same core principles, reorganized structure, simplified language, and new section numbers throughout.
          </p>

          <dl className="my-5 divide-y border-y">
            {[
              { label: "Same principles", body: "Tax on income, TDS, advance tax, deductions — all the core concepts are unchanged." },
              { label: "New structure", body: "Provisions are reorganized into logical chapters. Section numbers changed significantly." },
              { label: "Effective from", body: "Tax Year 2026-27 (April 1, 2026 onwards). The 1961 Act governs prior years." },
            ].map(({ label, body }) => (
              <div key={label} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="font-medium">{label}</dt>
                <dd className="text-muted-foreground">{body}</dd>
              </div>
            ))}
          </dl>

          <Callout variant="tip" title="Why this matters to you">
            If you search for tax help online and find references to Section 80C, Section 24, Section 87A, or Section 234B — those are
            the <em>old</em> 1961 Act section numbers. The 2025 Act has different numbers for the same provisions.
            TaxSaral always cites the new 2025 Act sections so you can verify with the actual law.
          </Callout>

          {/* ── 2. Tax Year ── */}
          <SectionAnchor id="tax-year" />
          <SectionHeading>Tax Year — the biggest terminology change</SectionHeading>
          <p className="text-muted-foreground">
            The most confusing aspect of the old 1961 Act was the two-year system: the &ldquo;Previous Year&rdquo; (when you earned the income) and the &ldquo;Assessment Year&rdquo; (when you file and pay tax). Most taxpayers found this split deeply confusing.
          </p>

          <div className="my-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-md border bg-card p-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Old IT Act 1961</p>
              <p className="font-medium mb-1">Two separate years</p>
              <p className="text-xs text-muted-foreground mb-2">April 2025 – March 2026 = <strong>Previous Year</strong> (when income is earned)</p>
              <p className="text-xs text-muted-foreground">April 2026 – March 2027 = <strong>Assessment Year</strong> (when you file ITR and pay tax)</p>
              <p className="text-xs text-muted-foreground mt-2 italic">Confusing: income of PY 2025-26 is filed in AY 2026-27</p>
            </div>
            <div className="rounded-md border border-primary/40 bg-card p-4">
              <p className="text-sm font-semibold text-primary mb-2">New IT Act 2025</p>
              <p className="font-medium mb-1">One unified term: <span className="text-primary">Tax Year</span></p>
              <p className="text-xs text-muted-foreground mb-2">April 2026 – March 2027 = <strong>Tax Year 2026-27</strong></p>
              <p className="text-xs text-muted-foreground">You earn income in TY 2026-27 and file your return for TY 2026-27 after March 31, 2027</p>
              <p className="text-xs text-emerald-700 mt-2 font-medium">Clear: same year label for income and filing</p>
            </div>
          </div>

          <Callout variant="tip">
            <strong>Practical rule:</strong> When someone says &ldquo;Tax Year 2026-27,&rdquo; they mean income earned between April 1, 2026 and March 31, 2027.
            Your ITR for this period will be filed after March 31, 2027 (typically by July 31, 2027 for non-audit cases).
            Some government forms and challans still use &ldquo;Assessment Year 2027-28&rdquo; — that refers to the same period.
          </Callout>

          <Table
            headers={["Term", "What it means", "Example"]}
            rows={[
              ["Tax Year (TY)", "The 12-month period you earned income in (Apr–Mar)", "TY 2026-27 = Apr 1, 2026 – Mar 31, 2027"],
              ["Assessment Year (AY)", "Still used in some forms/challans — one year after the Tax Year", "AY 2027-28 = challan year for TY 2026-27 income"],
              ["Financial Year (FY)", "Informal term; same as Tax Year in common usage", "FY 2026-27 = TY 2026-27"],
              ["Previous Year (PY)", "Old 1961 Act term — replaced by Tax Year", "No longer used in the 2025 Act"],
            ]}
          />

          {/* ── 3. Heads of Income ── */}
          <SectionAnchor id="heads-of-income" />
          <SectionHeading>Five Heads of Income</SectionHeading>
          <p className="text-muted-foreground">
            The 2025 Act retains the same five heads of income. Your total income is the sum of income under each head (after set-offs) and determines your tax liability.
          </p>

          <div className="my-5 divide-y border-y">
            {[
              { head: "Salaries", who: "Employees and pensioners", note: "Includes basic pay, allowances, perquisites, and retirement benefits. Standard deduction of ₹75,000 (default) or ₹50,000 (optional) is deducted." },
              { head: "Income from House Property", who: "Property owners", note: "Self-occupied: nil annual value (up to 2 properties). Let-out: taxed on Net Annual Value after 30% standard deduction and home loan interest." },
              { head: "Profits & Gains of Business or Profession (PGBP)", who: "Business owners, freelancers, professionals", note: "Income from running a business or practising a profession. Complex head with many allowable expenses. Typically requires a CA." },
              { head: "Capital Gains", who: "Anyone who sells property, shares, MFs, gold, etc.", note: "Short-term and long-term gains taxed at different rates. Listed equity LTCG above ₹1.25L taxed at 12.5% (Section 198). Listed equity STCG at 20% (Section 196)." },
              { head: "Income from Other Sources", who: "Everyone — catch-all head", note: "Bank interest (FD, savings), dividend income, gifts above ₹50,000, online gaming winnings, and income not covered by other heads." },
            ].map(({ head, who, note }, i) => (
              <div key={head} className="flex gap-4 py-4">
                <span className="w-5 shrink-0 font-serif text-lg text-muted-foreground">{i + 1}</span>
                <div>
                  <p className="font-semibold">{head}</p>
                  <p className="text-sm text-muted-foreground">{who}</p>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── 4. Two Regimes ── */}
          <SectionAnchor id="two-regimes" />
          <SectionHeading>The Two Tax Regimes</SectionHeading>
          <p className="text-muted-foreground">
            Under the IT Act 2025, every individual taxpayer chooses between two parallel tax systems each year. The regimes differ in their slab rates and the deductions they allow.
          </p>

          <div className="my-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Default regime */}
            <div className="rounded-md border border-primary/40 bg-card p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-serif text-lg font-semibold">Default regime</p>
                <span className="font-mono text-xs text-primary">s. 202</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">New slabs, fewer deductions, powerful ₹12L rebate</p>
              <Table
                headers={["Income Slab", "Rate"]}
                rows={[
                  ["₹0 – ₹4,00,000", "Nil"],
                  ["₹4L – ₹8L", "5%"],
                  ["₹8L – ₹12L", "10%"],
                  ["₹12L – ₹16L", "15%"],
                  ["₹16L – ₹20L", "20%"],
                  ["₹20L – ₹24L", "25%"],
                  ["Above ₹24L", "30%"],
                ]}
              />
              <p className="text-xs text-emerald-700 font-medium mt-1">
                Section 156 rebate: zero tax if total income ≤ ₹12 lakh
              </p>
              <p className="text-xs text-muted-foreground mt-1">Standard deduction: ₹75,000</p>
            </div>

            {/* Optional regime */}
            <div className="rounded-md border bg-card p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-serif text-lg font-semibold">Optional regime</p>
                <span className="text-xs text-muted-foreground">Old slabs</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Fewer slabs, but most deductions available</p>
              <Table
                headers={["Income Slab", "Rate"]}
                rows={[
                  ["₹0 – ₹2,50,000", "Nil"],
                  ["₹2.5L – ₹5L", "5%"],
                  ["₹5L – ₹10L", "20%"],
                  ["Above ₹10L", "30%"],
                ]}
              />
              <p className="text-xs text-muted-foreground mt-1">Standard deduction: ₹50,000</p>
              <p className="text-xs text-emerald-700 font-medium mt-1">
                Allows: 80C (Sec 123), HRA, home loan interest, 80D, and more
              </p>
            </div>
          </div>

          <Callout variant="tip" title="Which regime should you choose?">
            If your total eligible deductions (Sec 123/80C, HRA, home loan interest, health insurance) are small — the default regime often wins, especially with the zero-tax rebate up to ₹12 lakh.
            If you have significant deductions, the optional regime may save more. Use the{" "}
            <Link href="/calculators/regime-optimizer" className="font-medium underline underline-offset-4 hover:text-primary">
              Regime Optimizer calculator
            </Link>{" "}
            to compare your exact numbers.
          </Callout>

          <p className="text-muted-foreground mt-3">
            <strong>Can you switch every year?</strong> Yes — salaried individuals (no business income) can choose a different regime when filing each year&apos;s return. Your employer may ask for a preference at the start of the year for TDS purposes, but the final choice is made when you file.
          </p>

          {/* ── 5. Key Deductions ── */}
          <SectionAnchor id="key-deductions" />
          <SectionHeading>Key Deductions — Optional Regime Only</SectionHeading>
          <p className="text-muted-foreground mb-3">
            These deductions reduce your taxable income and are <strong>only available under the optional regime</strong>. Under the default regime, only the ₹75,000 standard deduction applies.
          </p>

          <Table
            headers={["Deduction", "IT Act 2025", "Old 1961 Act", "Limit", "What qualifies"]}
            rows={[
              ["Standard deduction", "Section 19", "Section 16(ia)", "₹50,000", "Auto-deducted from salary — no receipts needed"],
              ["ELSS / PPF / EPF / LIC / principal repayment", "Section 123", "Section 80C", "₹1,50,000", "Tax-saving investments and instruments"],
              ["Additional NPS contribution", "Section 124", "Section 80CCD(1B)", "₹50,000", "Voluntary contribution to NPS Tier-I"],
              ["Health insurance premium", "Section 126", "Section 80D", "₹25,000–₹75,000", "Premium for self, family, and parents; higher limit for senior citizens"],
              ["Home loan interest (self-occupied)", "Section 22", "Section 24(b)", "₹2,00,000", "Aggregate cap across all self-occupied properties"],
              ["Education loan interest", "Section 129", "Section 80E", "Full interest, 8 years", "Interest portion only; for higher education abroad or in India"],
              ["HRA exemption", "Schedule III", "Section 10(13A)", "Minimum of 3 conditions", "Must actually pay rent; only under optional regime"],
              ["Savings account interest", "Section 153", "Section 80TTA", "₹10,000", "Interest from savings bank accounts (non-senior citizens)"],
              ["Deposit interest (senior citizens)", "Section 153", "Section 80TTB", "₹50,000", "All deposit interest for taxpayers aged 60+"],
            ]}
          />

          <Callout variant="warn">
            Deductions require <strong>proper documentation</strong>: investment receipts, premium payment proofs, loan certificates, and rent receipts. Your CA will ask for these. Keep documents from April 1, 2026 to March 31, 2027 for TY 2026-27 claims.
          </Callout>

          {/* ── 6. How TDS works ── */}
          <SectionAnchor id="how-tds-works" />
          <SectionHeading>How TDS Works</SectionHeading>
          <p className="text-muted-foreground">
            Tax Deducted at Source (TDS) is the mechanism by which tax is collected at the point of income — before you receive it. For salaried employees, your employer is legally required to deduct TDS monthly from your salary.
          </p>

          <SubHeading>How your employer calculates TDS</SubHeading>
          <ol className="my-3 list-decimal space-y-2 pl-5 text-muted-foreground marker:text-foreground">
            {[
              "At the start of the year, you declare your estimated income, regime choice, and deductions (HRA, investments, loans) to your employer.",
              "Your employer annualises your salary, applies the regime you chose, deducts eligible claims, and computes estimated annual tax.",
              "This annual tax is divided by 12 and deducted from your monthly salary.",
              "If you don't declare anything, your employer defaults to the default regime — only ₹75,000 standard deduction applied.",
              "At year-end, your employer issues Form 130 (earlier Form 16) — a TDS certificate showing total salary paid and TDS deducted.",
            ].map((step, i) => (
              <li key={i} className="pl-1">{step}</li>
            ))}
          </ol>

          <SubHeading>TDS on other income</SubHeading>
          <Table
            headers={["Income type", "TDS rate", "Triggered when"]}
            rows={[
              ["Bank FD interest", "10%", "Annual interest > ₹40,000 (₹50,000 for seniors)"],
              ["Rent received", "2%", "Monthly rent > ₹50,000"],
              ["Professional fees", "10%", "Payment > ₹30,000"],
              ["Capital gains (equity)", "15% / 12.5%", "At point of sale by broker"],
              ["Dividend", "10%", "Dividend > ₹5,000 from a company"],
            ]}
          />

          <Callout variant="tip" title="Check your Annual Information Statement (Form 168)">
            The Annual Information Statement — Form 168 from Tax Year 2026-27, replacing Form 26AS — on the income tax portal (incometax.gov.in) shows all income and TDS reported against your PAN by banks, employers, brokers, and others. Review it before filing — it&apos;s what the tax department sees.
          </Callout>

          {/* ── 7. Advance Tax ── */}
          <SectionAnchor id="advance-tax" />
          <SectionHeading>Advance Tax Basics</SectionHeading>
          <p className="text-muted-foreground">
            If your net tax liability after TDS exceeds ₹10,000 in a year, you must pay advance tax in four instalments during the year itself — not at filing time.
          </p>

          <div className="my-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <SubHeading>Who typically needs to pay advance tax</SubHeading>
              <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                {[
                  "Freelancers, consultants, and professionals with no TDS",
                  "Salaried employees who switched jobs mid-year (TDS may fall short)",
                  "Anyone with significant interest income from FDs",
                  "Individuals who sold property, shares, or made capital gains",
                  "Rental income earners with insufficient TDS deduction",
                ].map((item) => (
                  <li key={item} className="pl-1">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <SubHeading>Who is exempt</SubHeading>
              <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                {[
                  "Salaried employees whose employer deducts correct TDS (net liability ≤ ₹10,000)",
                  "Senior citizens (age 60+) with no business or professional income — Section 403",
                  "Taxpayers under the presumptive taxation scheme (Section 58) who pay entire liability by March 15",
                ].map((item) => (
                  <li key={item} className="pl-1">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <Table
            headers={["Instalment", "Due Date", "Cumulative % of liability", "Interest if missed"]}
            rows={[
              ["Q1", "June 15, 2026", "15%", "Section 425 — 1%/month for 3 months"],
              ["Q2", "September 15, 2026", "45%", "Section 425 — 1%/month for 3 months"],
              ["Q3", "December 15, 2026", "75%", "Section 425 — 1%/month for 3 months"],
              ["Q4", "March 15, 2027", "100%", "Section 424 — 1%/month from April 1"],
            ]}
          />

          <Callout variant="warn">
            If you miss advance tax instalments or pay too little, interest accrues at 1% per month under
            Sections 424 and 425 of the IT Act 2025. Use the{" "}
            <Link href="/calculators/advance-tax" className="font-medium underline underline-offset-4 hover:text-primary">
              Advance Tax calculator
            </Link>{" "}
            to estimate your instalments.
          </Callout>

          {/* ── 8. Section numbers ── */}
          <SectionAnchor id="section-numbers" />
          <SectionHeading>New Section Numbers — Quick Reference</SectionHeading>
          <p className="text-muted-foreground mb-4">
            Most online resources, CA guides, and even older tax software still use IT Act 1961 section numbers. Here is the mapping you need to cross-reference them with the 2025 Act.
          </p>

          <Table
            headers={["Topic", "IT Act 1961 (old)", "IT Act 2025 (new)"]}
            rows={[
              ["Tax regime slabs (new/default)", "115BAC", "Section 202"],
              ["Tax rebate (zero tax up to ₹12L)", "Section 87A", "Section 156"],
              ["Standard deduction from salary", "Section 16(ia)", "Section 19"],
              ["Home loan interest deduction", "Section 24(b)", "Section 22"],
              ["Chapter VI-A deductions (investments, 80C etc.)", "Chapter VI-A, Part B", "Chapter VIII, Part B"],
              ["Investments: EPF, PPF, ELSS, LIC principal", "Section 80C", "Section 123"],
              ["Additional NPS contribution", "Section 80CCD(1B)", "Section 124"],
              ["Health insurance premium", "Section 80D", "Section 126"],
              ["Education loan interest", "Section 80E", "Section 129"],
              ["Savings account interest deduction", "Section 80TTA", "Section 153"],
              ["Senior citizen deposit interest deduction", "Section 80TTB", "Section 153"],
              ["House Property charging section", "Section 22", "Section 20"],
              ["Annual value of house property", "Section 23", "Section 21"],
              ["Deductions from HP income", "Section 24", "Section 22"],
              ["Arrears / unrealised rent recovered", "Section 25A", "Section 23"],
              ["Co-owned properties", "Section 26", "Section 24"],
              ["Deemed ownership", "Section 27", "Section 25"],
              ["TDS on salary", "Section 192", "Section 392"],
              ["TDS — multiple employers (Form 12B → Form 122)", "Section 192(2)", "Section 392(4)"],
              ["HRA exemption", "Section 10(13A)", "Schedule III"],
              ["Advance tax obligation / instalment schedule", "Sections 207–211", "Sections 403–408"],
              ["Interest — default in advance tax payment", "Section 234B", "Section 424"],
              ["Interest — deferment of instalment", "Section 234C", "Section 425"],
              ["Interest — late filing of return", "Section 234A", "Section 423"],
              ["Capital gains — listed equity STCG (STT paid)", "Section 111A", "Section 196"],
              ["Capital gains — LTCG (general)", "Section 112", "Section 197"],
              ["Capital gains — listed equity LTCG (STT paid)", "Section 112A", "Section 198"],
              ["VDA / crypto tax", "Section 115BBH", "Section 194"],
            ]}
          />

          <Callout variant="tip">
            The 2025 Act is available on the official Income Tax India website at incometaxindia.gov.in. When verifying a provision, always search by the new section number if using the 2025 Act text.
          </Callout>

          {/* ── 9. CA Checklist ── */}
          <SectionAnchor id="ca-checklist" />
          <SectionHeading>What to Prepare Before Meeting Your CA</SectionHeading>
          <p className="text-muted-foreground mb-4">
            Going prepared to your CA&apos;s office saves time and money. Here is what you should gather and know before your appointment for TY 2026-27.
          </p>

          <div className="space-y-4">
            {[
              {
                heading: "Documents to collect",
                items: [
                  "Form 130 (earlier Form 16) from every employer you worked for in TY 2026-27",
                  "Bank statements showing FD interest credited (or Form 131, earlier Form 16A, from the bank)",
                  "Annual Information Statement — Form 168 (earlier Form 26AS) — downloaded from incometax.gov.in",
                  "Home loan interest certificate from your bank (for the period April 2026 – March 2027)",
                  "Property tax payment receipts (if you own let-out property)",
                  "Rent receipts and rent agreement (if claiming HRA under optional regime)",
                  "Landlord's PAN (mandatory if annual rent exceeds ₹1 lakh)",
                  "Investment proofs: PPF passbook, ELSS statements, LIC premium receipts, EPF statement",
                  "Health insurance premium payment receipts (for Section 126 deduction)",
                  "Capital gains statements from your broker or demat provider (if you sold equity/MF/property)",
                  "Salary slips or letters confirming salary from any employer not issuing Form 130",
                ],
              },
              {
                heading: "Questions to answer / know in advance",
                items: [
                  "Do you want to file under the default regime or optional regime for TY 2026-27?",
                  "How many properties do you own? Which are self-occupied, let-out, or vacant?",
                  "Did you switch employers during the year? Did you submit Form 122 (earlier Form 12B) to the new employer?",
                  "Do you have any income not reflected in Form 130 — freelance, interest, dividends, rent?",
                  "Did you sell any asset — property, shares, mutual funds, gold — during the year?",
                  "Did you receive any gifts above ₹50,000 from non-relatives?",
                  "Do you have any losses from previous years to carry forward?",
                  "Do you or your parents have health insurance (for Section 126 deduction)?",
                ],
              },
              {
                heading: "Common mistakes to avoid",
                items: [
                  "Assuming your TDS covers all your tax — it may not if you have additional income",
                  "Missing advance tax instalments because you thought only businesses need to pay",
                  "Not declaring previous employer salary to new employer — leads to shortfall",
                  "Forgetting FD interest income — banks report this to the tax department automatically",
                  "Claiming HRA without actual rent receipts or when you own the home you live in",
                  "Filing in the wrong regime — once filed, switching regimes after the due date may not be possible",
                  "Missing the ITR filing deadline (typically July 31) — attracts late filing fees and interest",
                ],
              },
            ].map(({ heading, items }) => (
              <div key={heading}>
                <SubHeading>{heading}</SubHeading>
                <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                  {items.map((item) => (
                    <li key={item} className="pl-1">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="!mt-10 border-t pt-6 text-muted-foreground">
            Ready to work out your own numbers? Start with the{" "}
            <Link href="/calculators/regime-optimizer" className="text-primary underline underline-offset-4">Regime Optimizer</Link>, then the{" "}
            <Link href="/calculators/advance-tax" className="text-primary underline underline-offset-4">Advance Tax</Link> and{" "}
            <Link href="/calculators/house-property-income" className="text-primary underline underline-offset-4">House Property</Link> calculators.
          </p>

          <p className="!mt-6 text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Disclaimer: </span>
            This guide is for educational purposes only and does not constitute legal or tax advice.
            The Income Tax Act 2025 is a complex legislation and individual circumstances vary significantly.
            Always consult a qualified Chartered Accountant before filing your return or making financial decisions based on tax considerations.
            Section numbers and provisions are cited as per the Income Tax Act 2025 applicable to Tax Year 2026-27 (AY 2027-28).
          </p>

        </article>
      </div>
    </div>
  );
}
