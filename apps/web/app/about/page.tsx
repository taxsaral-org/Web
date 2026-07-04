import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Database, Lock, BookOpen, Calculator, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "About TaxSaral — Free IT Act 2025 Tax Calculators",
  description:
    "Learn about TaxSaral — who we are, why we built free Income Tax Act 2025 calculators, and our commitment to privacy and accuracy.",
};

const OFFERINGS = [
  { icon: Calculator, title: "6 Free Calculators", body: "Regime Optimizer, HRA Exemption, House Property Income, Multiple Employer, Advance Tax, and Residential Status — all built on IT Act 2025." },
  { icon: BookOpen, title: "IT Act 2025 Guide", body: "A plain-language guide covering the new Act, updated section numbers, the two tax regimes, deductions, TDS, and advance tax basics." },
  { icon: Mail, title: "Ask Our Tax Team", body: "Submit your income tax question and receive a personalised, email-based reply from our team — usually within 2–3 business days." },
];

const PRINCIPLES = [
  { icon: Lock, title: "No login required", body: "Every calculator and guide page is fully accessible without creating an account." },
  { icon: Database, title: "No data stored", body: "All calculations run entirely in your browser. We never send your financial figures to any server." },
  { icon: ShieldCheck, title: "IT Act 2025 only", body: "Every section reference, slab rate, and form number on this site is sourced from the Income Tax Act 2025 as applicable to Tax Year 2026-27." },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">

      {/* Hero */}
      <div className="mb-10 text-center">
        <div className="mb-3 flex justify-center">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            IT Act 2025 · Tax Year 2026-27
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About TaxSaral</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          TaxSaral is a free, independent resource that helps Indian individual taxpayers understand
          and apply the <strong className="text-foreground">Income Tax Act 2025</strong> — the law
          that replaced the 60-year-old IT Act 1961 effective from Tax Year 2026-27.
        </p>
      </div>

      {/* Why we built this */}
      <section className="mb-10 rounded-2xl border bg-card p-6 sm:p-8">
        <h2 className="text-xl font-bold mb-3">Why we built TaxSaral</h2>
        <div className="space-y-3 text-muted-foreground leading-relaxed">
          <p>
            The Income Tax Act 2025 introduced entirely new section numbers throughout the law.
            Familiar references — like Section 80C, 234B, 234C — no longer exist under the new Act.
            This created genuine confusion for taxpayers and even for tax professionals navigating
            the transition.
          </p>
          <p>
            Most existing tax tools and guides online still reference the old Act. TaxSaral was built
            specifically to fill that gap: accurate, jargon-free calculators and explanations grounded
            entirely in the <strong className="text-foreground">IT Act 2025</strong>, with no legacy
            content mixing in references to repealed law.
          </p>
          <p>
            Our goal is simple — give every Indian taxpayer access to reliable, free tools so they can
            understand their tax position before speaking to a Chartered Accountant.
          </p>
        </div>
      </section>

      {/* What we offer */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">What we offer</h2>
        <div className="space-y-4">
          {OFFERINGS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4 rounded-xl border bg-card p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our principles */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">Our principles</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PRINCIPLES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl border bg-card p-4 text-center">
              <div className="flex justify-center mb-2">
                <Icon className="h-6 w-6 text-emerald-600" />
              </div>
              <p className="font-semibold text-sm">{title}</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mb-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-sm font-semibold text-amber-900 mb-2">Important disclaimer</h2>
        <p className="text-sm text-amber-800 leading-relaxed">
          TaxSaral provides educational information and calculation estimates only. Nothing on this
          site constitutes tax advice, legal advice, or a substitute for professional consultation.
          Indian income tax law involves individual circumstances that cannot all be captured in a
          general-purpose calculator.{" "}
          <strong>Always verify with a Chartered Accountant before filing your return or making
          advance tax payments.</strong>
        </p>
      </section>

      {/* Contact */}
      <section className="rounded-xl border bg-card p-6 text-center">
        <h2 className="text-lg font-bold mb-2">Get in touch</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Have a tax question, feedback, or partnership enquiry?
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/ask"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Mail className="h-4 w-4" />
            Ask a tax question
          </Link>
          <a
            href="mailto:vsriram1008@gmail.com"
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            vsriram1008@gmail.com
          </a>
        </div>
      </section>
    </div>
  );
}
