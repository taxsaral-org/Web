import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen, ArrowRight, AlertTriangle, CheckCircle2,
  FileText, Lightbulb, RefreshCw, IndianRupee, Users, Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Income Tax Act 2025 — Complete Guide for Taxpayers | TaxSaral",
  description:
    "Understand India's Income Tax Act 2025 before meeting your CA. Covers the Tax Year concept, two regimes, new section numbers, key deductions, TDS, advance tax, and what to bring to your tax consultant.",
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
    <h2 className="mt-10 mb-3 text-xl font-bold tracking-tight first:mt-0">{children}</h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-6 mb-2 text-base font-semibold">{children}</h3>;
}

function Callout({
  icon: Icon,
  variant = "info",
  title,
  children,
}: {
  icon?: React.ElementType;
  variant?: "info" | "tip" | "warn" | "success";
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    info: "border-blue-200 bg-blue-50 text-blue-900",
    tip: "border-emerald-200 bg-emerald-50 text-emerald-900",
    warn: "border-amber-200 bg-amber-50 text-amber-900",
    success: "border-emerald-300 bg-emerald-50 text-emerald-800",
  };
  const iconStyles = {
    info: "text-blue-500",
    tip: "text-emerald-600",
    warn: "text-amber-600",
    success: "text-emerald-600",
  };
  return (
    <div className={`flex gap-3 rounded-lg border p-4 my-4 text-sm leading-relaxed ${styles[variant]}`}>
      {Icon && <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${iconStyles[variant]}`} />}
      <div>
        {title && <p className="font-semibold mb-0.5">{title}</p>}
        {children}
      </div>
    </div>
  );
}

function Tr({ cells, header }: { cells: string[]; header?: boolean }) {
  const Tag = header ? "th" : "td";
  return (
    <tr className={header ? "bg-muted/50" : "border-t"}>
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
    <div className="my-4 overflow-x-auto rounded-lg border">
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
    <div className="container mx-auto max-w-6xl px-4 py-10">
      {/* Hero */}
      <div className="mb-10 max-w-3xl">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
            IT Act 2025
          </span>
          <span>·</span>
          <span>Tax Year 2026-27</span>
          <span>·</span>
          <span>For individual taxpayers</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Understanding the Income Tax Act 2025
        </h1>
        <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
          India replaced its 60-year-old tax law with a completely restructured Act effective from Tax Year 2026-27.
          This guide explains what changed, what stayed the same, and what you need to know before talking to your CA.
        </p>
        <Callout icon={AlertTriangle} variant="warn" title="For reference only">
          This is an educational guide — not tax advice. Every taxpayer&apos;s situation is different.
          Verify with a Chartered Accountant before filing your return.
        </Callout>
      </div>

      {/* Body: TOC sidebar + content */}
      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">

        {/* ── Sticky TOC (desktop only) ── */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 rounded-xl border bg-muted/30 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              On this page
            </p>
            <nav className="space-y-1">
              {TOC.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="block rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── Main content ── */}
        <article className="min-w-0 space-y-2 text-sm leading-relaxed">

          {/* ── 1. What is IT Act 2025 ── */}
          <SectionAnchor id="what-is-it-act-2025" />
          <SectionHeading>What is the Income Tax Act 2025?</SectionHeading>
          <p className="text-muted-foreground">
            The Income Tax Act 2025 is India&apos;s new tax law that replaces the Income Tax Act 1961.
            The 1961 Act had accumulated over six decades of amendments, making it dense and difficult to navigate.
            The 2025 Act is a <strong>clean rewrite</strong> — same core principles, reorganized structure, simplified language, and new section numbers throughout.
          </p>

          <div className="my-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: RefreshCw, label: "Same principles", body: "Tax on income, TDS, advance tax, deductions — all the core concepts are unchanged." },
              { icon: BookOpen, label: "New structure", body: "Provisions are reorganized into logical chapters. Section numbers changed significantly." },
              { icon: FileText, label: "Effective from", body: "Tax Year 2026-27 (April 1, 2026 onwards). The 1961 Act governs prior years." },
            ].map(({ icon: Icon, label, body }) => (
              <div key={label} className="rounded-lg border bg-card p-4">
                <Icon className="mb-2 h-4 w-4 text-primary" />
                <p className="font-semibold text-sm mb-1">{label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <Callout icon={Lightbulb} variant="tip" title="Why this matters to you">
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
            <div className="rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Old IT Act 1961</p>
              <p className="font-medium mb-1">Two separate years</p>
              <p className="text-xs text-muted-foreground mb-2">April 2025 – March 2026 = <strong>Previous Year</strong> (when income is earned)</p>
              <p className="text-xs text-muted-foreground">April 2026 – March 2027 = <strong>Assessment Year</strong> (when you file ITR and pay tax)</p>
              <p className="text-xs text-muted-foreground mt-2 italic">Confusing: income of PY 2025-26 is filed in AY 2026-27</p>
            </div>
            <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">New IT Act 2025</p>
              <p className="font-medium mb-1">One unified term: <span className="text-primary">Tax Year</span></p>
              <p className="text-xs text-muted-foreground mb-2">April 2026 – March 2027 = <strong>Tax Year 2026-27</strong></p>
              <p className="text-xs text-muted-foreground">You earn income in TY 2026-27 and file your return for TY 2026-27 after March 31, 2027</p>
              <p className="text-xs text-emerald-700 mt-2 font-medium">Clear: same year label for income and filing</p>
            </div>
          </div>

          <Callout icon={Lightbulb} variant="tip">
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

          <div className="my-4 space-y-2">
            {[
              { icon: IndianRupee, head: "Salaries", who: "Employees and pensioners", note: "Includes basic pay, allowances, perquisites, and retirement benefits. Standard deduction of ₹75,000 (default) or ₹50,000 (optional) is deducted." },
              { icon: Building2, head: "Income from House Property", who: "Property owners", note: "Self-occupied: nil annual value (up to 2 properties). Let-out: taxed on Net Annual Value after 30% standard deduction and home loan interest." },
              { icon: RefreshCw, head: "Profits & Gains of Business or Profession (PGBP)", who: "Business owners, freelancers, professionals", note: "Income from running a business or practising a profession. Complex head with many allowable expenses. Typically requires a CA." },
              { icon: FileText, head: "Capital Gains", who: "Anyone who sells property, shares, MFs, gold, etc.", note: "Short-term and long-term gains taxed at different rates. Listed equity LTCG above ₹1.25L taxed at 12.5% (Section 198). Listed equity STCG at 20% (Section 196)." },
              { icon: BookOpen, head: "Income from Other Sources", who: "Everyone — catch-all head", note: "Bank interest (FD, savings), dividend income, gifts above ₹50,000, online gaming winnings, and income not covered by other heads." },
            ].map(({ icon: Icon, head, who, note }) => (
              <div key={head} className="flex gap-4 rounded-lg border bg-card p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{head}</p>
                  <p className="text-xs text-muted-foreground">{who}</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{note}</p>
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
            <div className="rounded-xl border-2 border-primary/30 p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-bold">Default Regime</p>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Section 202</span>
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
            <div className="rounded-xl border p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-bold">Optional Regime</p>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">Old slabs</span>
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

          <Callout icon={Lightbulb} variant="tip" title="Which regime should you choose?">
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
              ["Standard deduction", "—", "Section 16", "₹50,000", "Auto-deducted from salary — no receipts needed"],
              ["ELSS / PPF / EPF / LIC / principal repayment", "Section 123", "Section 80C", "₹1,50,000", "Tax-saving investments and instruments"],
              ["Additional NPS contribution", "Section 127", "Section 80CCD(1B)", "₹50,000", "Voluntary contribution to NPS Tier-I"],
              ["Health insurance premium", "Section 130", "Section 80D", "₹25,000–₹75,000", "Premium for self, family, and parents; higher limit for senior citizens"],
              ["Home loan interest (self-occupied)", "Section 71", "Section 24(b)", "₹2,00,000", "Aggregate cap across all self-occupied properties"],
              ["Education loan interest", "Section 133", "Section 80E", "Full interest, 8 years", "Interest portion only; for higher education abroad or in India"],
              ["HRA exemption", "Schedule III", "Section 10(13A)", "Minimum of 3 conditions", "Must actually pay rent; only under optional regime"],
              ["Savings account interest", "Section 149", "Section 80TTA", "₹10,000", "Interest from savings bank accounts (non-senior citizens)"],
              ["Deposit interest (senior citizens)", "Section 150", "Section 80TTB", "₹50,000", "All deposit interest for taxpayers aged 60+"],
            ]}
          />

          <Callout icon={AlertTriangle} variant="warn">
            Deductions require <strong>proper documentation</strong>: investment receipts, premium payment proofs, loan certificates, and rent receipts. Your CA will ask for these. Keep documents from April 1, 2026 to March 31, 2027 for TY 2026-27 claims.
          </Callout>

          {/* ── 6. How TDS works ── */}
          <SectionAnchor id="how-tds-works" />
          <SectionHeading>How TDS Works</SectionHeading>
          <p className="text-muted-foreground">
            Tax Deducted at Source (TDS) is the mechanism by which tax is collected at the point of income — before you receive it. For salaried employees, your employer is legally required to deduct TDS monthly from your salary.
          </p>

          <SubHeading>How your employer calculates TDS</SubHeading>
          <div className="my-3 space-y-2">
            {[
              "At the start of the year, you declare your estimated income, regime choice, and deductions (HRA, investments, loans) to your employer.",
              "Your employer annualises your salary, applies the regime you chose, deducts eligible claims, and computes estimated annual tax.",
              "This annual tax is divided by 12 and deducted from your monthly salary.",
              "If you don't declare anything, your employer defaults to the default regime — only ₹75,000 standard deduction applied.",
              "At year-end, your employer issues Form 16 — a TDS certificate showing total salary paid and TDS deducted.",
            ].map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                <p className="text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>

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

          <Callout icon={Lightbulb} variant="tip" title="Check your Form 26AS / AIS">
            The Annual Information Statement (AIS) on the income tax portal (incometax.gov.in) shows all income and TDS reported against your PAN by banks, employers, brokers, and others. Review it before filing — it&apos;s what the tax department sees.
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
              <ul className="space-y-1.5 text-muted-foreground">
                {[
                  "Freelancers, consultants, and professionals with no TDS",
                  "Salaried employees who switched jobs mid-year (TDS may fall short)",
                  "Anyone with significant interest income from FDs",
                  "Individuals who sold property, shares, or made capital gains",
                  "Rental income earners with insufficient TDS deduction",
                ].map((item) => (
                  <li key={item} className="flex gap-2 items-start">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SubHeading>Who is exempt</SubHeading>
              <ul className="space-y-1.5 text-muted-foreground">
                {[
                  "Salaried employees whose employer deducts correct TDS (net liability ≤ ₹10,000)",
                  "Senior citizens (age 60+) with no business or professional income — Section 403",
                  "Taxpayers under the presumptive taxation scheme (Section 58) who pay entire liability by March 15",
                ].map((item) => (
                  <li key={item} className="flex gap-2 items-start">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 mt-1.5" />
                    <span>{item}</span>
                  </li>
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

          <Callout icon={AlertTriangle} variant="warn">
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
              ["Standard deduction from salary", "Section 16(ia)", "Section 17"],
              ["Home loan interest deduction", "Section 24(b)", "Section 71"],
              ["Chapter VI-A deductions (investments, 80C etc.)", "Part C of Chapter VI-A", "Chapter IV-F"],
              ["Investments: EPF, PPF, ELSS, LIC principal", "Section 80C", "Section 123"],
              ["Additional NPS contribution", "Section 80CCD(1B)", "Section 127"],
              ["Health insurance premium", "Section 80D", "Section 130"],
              ["Education loan interest", "Section 80E", "Section 133"],
              ["Savings account interest exemption", "Section 80TTA", "Section 149"],
              ["Senior citizen deposit interest exemption", "Section 80TTB", "Section 150"],
              ["House Property charging section", "Section 22", "Section 20"],
              ["Annual value of house property", "Section 23", "Section 21"],
              ["Deductions from HP income", "Section 24", "Section 22"],
              ["Arrears / unrealised rent recovered", "Section 25B", "Section 23"],
              ["Co-owned properties", "Section 26", "Section 24"],
              ["Deemed ownership", "Section 27", "Section 25"],
              ["TDS on salary", "Section 192", "Section 392 / 393"],
              ["TDS — multiple employers (Form 12B)", "Section 192(2)", "Section 392"],
              ["HRA exemption", "Section 10(13A)", "Schedule III"],
              ["Advance tax obligation / instalment schedule", "Sections 208–211", "Sections 403–408"],
              ["Interest — default in advance tax payment", "Section 234B", "Section 424"],
              ["Interest — deferment of instalment", "Section 234C", "Section 425"],
              ["Interest — late filing of return", "Section 234A", "Section 423"],
              ["Capital gains — listed equity STCG (STT paid)", "Section 111A", "Section 196"],
              ["Capital gains — LTCG (general)", "Section 112", "Section 197"],
              ["Capital gains — listed equity LTCG (STT paid)", "Section 112A", "Section 198"],
              ["VDA / crypto tax", "Section 115BBH", "Section 171"],
            ]}
          />

          <Callout icon={Lightbulb} variant="tip">
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
                icon: FileText,
                items: [
                  "Form 16 (Part A and Part B) from every employer you worked for in TY 2026-27",
                  "Bank statements showing FD interest credited (or Form 16A from the bank)",
                  "Form 26AS and Annual Information Statement (AIS) downloaded from incometax.gov.in",
                  "Home loan interest certificate from your bank (for the period April 2026 – March 2027)",
                  "Property tax payment receipts (if you own let-out property)",
                  "Rent receipts and rent agreement (if claiming HRA under optional regime)",
                  "Landlord&apos;s PAN (mandatory if annual rent exceeds ₹1 lakh)",
                  "Investment proofs: PPF passbook, ELSS statements, LIC premium receipts, EPF statement",
                  "Health insurance premium payment receipts (for Section 130 deduction)",
                  "Capital gains statements from your broker or demat provider (if you sold equity/MF/property)",
                  "Salary slips or letters confirming salary from any employer not issuing Form 16",
                ],
              },
              {
                heading: "Questions to answer / know in advance",
                icon: Lightbulb,
                items: [
                  "Do you want to file under the default regime or optional regime for TY 2026-27?",
                  "How many properties do you own? Which are self-occupied, let-out, or vacant?",
                  "Did you switch employers during the year? Did you submit Form 12B to the new employer?",
                  "Do you have any income not reflected in Form 16 — freelance, interest, dividends, rent?",
                  "Did you sell any asset — property, shares, mutual funds, gold — during the year?",
                  "Did you receive any gifts above ₹50,000 from non-relatives?",
                  "Do you have any losses from previous years to carry forward?",
                  "Do you or your parents have health insurance (for Section 130 deduction)?",
                ],
              },
              {
                heading: "Common mistakes to avoid",
                icon: AlertTriangle,
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
            ].map(({ heading, icon: Icon, items }) => (
              <div key={heading} className="rounded-lg border bg-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="h-4 w-4 text-primary" />
                  <p className="font-semibold text-sm">{heading}</p>
                </div>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2 items-start text-xs text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA to calculators */}
          <div className="mt-10 rounded-xl border bg-muted/30 p-6 text-center">
            <p className="font-semibold text-base mb-1">Ready to calculate your tax?</p>
            <p className="text-sm text-muted-foreground mb-4">
              Use our free calculators — built on the IT Act 2025 — to get your numbers before meeting your CA.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/calculators/regime-optimizer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Regime Optimizer <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/calculators/advance-tax"
                className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                Advance Tax <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/calculators/house-property-income"
                className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                House Property <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 rounded-lg border bg-muted/20 p-4 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Disclaimer: </span>
            This guide is for educational purposes only and does not constitute legal or tax advice.
            The Income Tax Act 2025 is a complex legislation and individual circumstances vary significantly.
            Always consult a qualified Chartered Accountant before filing your return or making financial decisions based on tax considerations.
            Section numbers and provisions are cited as per the Income Tax Act 2025 applicable to Tax Year 2026-27 (AY 2027-28).
          </div>

        </article>
      </div>
    </div>
  );
}
