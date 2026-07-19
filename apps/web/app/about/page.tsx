import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Database, Lock, BookOpen, Calculator, Mail, Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "About TaxSaral — Built by Sriram Veeraraghavan | Free IT Act 2025 Tools",
  description:
    "TaxSaral is built by Sriram Veeraraghavan, CA Final student, to make India's Income Tax Act 2025 simple and accessible for everyone. Free calculators, plain-English explainers, no login.",
  alternates: { canonical: "https://taxsaral.org/about" },
  openGraph: { title: "About TaxSaral | Built by Sriram Veeraraghavan", description: "Free IT Act 2025 calculators and explainers built by a CA Final student to make tax simple for everyone.", url: "https://taxsaral.org/about", type: "website", siteName: "TaxSaral" },
  twitter: { card: "summary", title: "About TaxSaral | Built by Sriram Veeraraghavan", description: "Free IT Act 2025 tools built by a CA Final student to make tax simple for everyone." },
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

      {/* Builder Bio */}
      <section className="mb-10 rounded-2xl border bg-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">

          {/* Avatar placeholder */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary mx-auto sm:mx-0">
            SV
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h2 className="text-xl font-bold">Sriram Veeraraghavan</h2>
              <span className="rounded-full bg-amber-100 text-amber-800 px-2.5 py-0.5 text-xs font-medium">
                CA Final Student
              </span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
              <a
                href="https://www.linkedin.com/in/vsriram1008"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5" />
                linkedin.com/in/vsriram1008
              </a>
              <span className="text-border">·</span>
              <a
                href="mailto:vsriram1008@gmail.com"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                vsriram1008@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-muted-foreground leading-relaxed mt-2">
          <p>
            Hey, I&apos;m Sriram — and I built this site because I was frustrated. The Income Tax
            Act 2025 came out and suddenly everything changed — new section numbers, new rules, new
            everything. But the resources out there were either too dry, too technical, or just plain
            confusing. I figured if I was struggling to make sense of it as someone studying this
            full time, regular taxpayers must be completely lost.
          </p>
          <p>
            So I built TaxSaral. No jargon. No paywalls. No login required. Just honest,
            plain-English explanations of what the law actually says — and calculators that do the
            math for you.
          </p>
          <p>
            I did my articleship in <strong className="text-foreground">Internal Audit and Forensic
            Audit</strong> at <strong className="text-foreground">SPR &amp; Co</strong> — which gave
            me a deep appreciation for how businesses actually work from the inside, how financial
            irregularities hide in plain sight, and why getting the numbers right matters more than
            most people think. After that, I had the opportunity to do my Industrial Training at{" "}
            <strong className="text-foreground">IIM Bangalore</strong>, which pushed me to think
            bigger about how finance and tax education can be made truly accessible.
          </p>
          <p>
            TaxSaral is still growing. More sections, more calculators, more explainers — all
            coming. If you&apos;re a CA student, a tax professional, or just someone who got a weird
            notice from the IT department and has no idea what it means — you&apos;re in the right
            place.
          </p>
          <p className="font-medium text-foreground">
            Tax doesn&apos;t have to be hard. That&apos;s the whole point.
          </p>
        </div>
      </section>

      {/* What we offer */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">What&apos;s on TaxSaral</h2>
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
        <h2 className="text-xl font-bold mb-4">How we operate</h2>
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
      <section className="mb-10 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-5">
        <h2 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2">Important disclaimer</h2>
        <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
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
          Have a tax question, feedback, or just want to say hi?
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
          <a
            href="https://www.linkedin.com/in/vsriram1008"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
