import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About TaxSaral — Built by Sriram Veeraraghavan | Free IT Act 2025 Tools",
  description:
    "TaxSaral is built by Sriram Veeraraghavan, CA Final student, to make India's Income Tax Act 2025 simple and accessible for everyone. Free calculators, plain-English explainers, no login.",
  alternates: { canonical: "https://taxsaral.org/about" },
  openGraph: { title: "About TaxSaral | Built by Sriram Veeraraghavan", description: "Free IT Act 2025 calculators and explainers built by a CA Final student to make tax simple for everyone.", url: "https://taxsaral.org/about", type: "website", siteName: "TaxSaral" },
  twitter: { card: "summary", title: "About TaxSaral | Built by Sriram Veeraraghavan", description: "Free IT Act 2025 tools built by a CA Final student to make tax simple for everyone." },
};

const OFFERINGS = [
  { href: "/case-law", title: "Case law", body: "Landmark judgments set out in full and mapped from the 1961 provision to the 2025 section." },
  { href: "/section-mapping", title: "1961 → 2025 mapping", body: "Every section of the new Act against its 1961 counterpart." },
  { href: "/section-explainer", title: "Explainers", body: "Plain-language notes on the key sections, and longer worked analyses of the difficult ones." },
  { href: "/quiz", title: "Quizzes", body: "Chapter-wise practice on the new section numbers, plus concept checks and ICAI case studies." },
  { href: "/calculators/regime-optimizer", title: "Six calculators", body: "Regime Optimizer, HRA Exemption, House Property Income, Multiple Employer, Advance Tax and Residential Status." },
  { href: "/ask", title: "Ask a question", body: "Send an income tax question and get a personal reply by email, usually within 2–3 business days." },
];

const PRINCIPLES = [
  { title: "No login required.", body: "Every calculator and guide page is fully accessible without creating an account." },
  { title: "No data stored.", body: "All calculations run entirely in your browser. We never send your financial figures to any server." },
  { title: "IT Act 2025 only.", body: "Every section reference, slab rate, and form number on this site is sourced from the Income Tax Act 2025 as applicable to Tax Year 2026-27." },
];

export default function AboutPage() {
  return (
    <article className="container mx-auto max-w-2xl py-12 sm:py-16">
      <p className="text-sm text-muted-foreground">About</p>
      <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">
        Why I built TaxSaral
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Sriram Veeraraghavan, CA Final student ·{" "}
        <a href="https://www.linkedin.com/in/vsriram1008" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground">
          LinkedIn
        </a>{" "}
        ·{" "}
        <a href="mailto:vsriram1008@gmail.com" className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground">
          vsriram1008@gmail.com
        </a>
      </p>

      <div className="mt-8 space-y-4 text-[17px] leading-[1.75] text-foreground/85">
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

      <section className="mt-14 border-t pt-8">
        <h2 className="text-2xl font-semibold">What&apos;s on the site</h2>
        <dl className="mt-5 divide-y border-y">
          {OFFERINGS.map(({ href, title, body }) => (
            <div key={title} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt>
                <Link href={href} className="font-medium hover:text-primary hover:underline underline-offset-4">
                  {title}
                </Link>
              </dt>
              <dd className="text-[15px] leading-relaxed text-muted-foreground">{body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">How it&apos;s run</h2>
        <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
          {PRINCIPLES.map(({ title, body }) => (
            <p key={title}>
              <span className="font-medium text-foreground">{title}</span> {body}
            </p>
          ))}
          <p>
            <span className="font-medium text-foreground">Not tax advice.</span> TaxSaral provides
            educational information and calculation estimates only. Indian income tax law involves
            individual circumstances that cannot all be captured in a general-purpose calculator.
            Always verify with a Chartered Accountant before filing your return or making advance
            tax payments.
          </p>
        </div>
      </section>

      <section className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-semibold">Get in touch</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          Have a tax question, feedback, or just want to say hi?{" "}
          <Link href="/ask" className="text-primary underline underline-offset-4">Ask a tax question</Link>, write to{" "}
          <a href="mailto:vsriram1008@gmail.com" className="text-primary underline underline-offset-4">vsriram1008@gmail.com</a>, or find me on{" "}
          <a href="https://www.linkedin.com/in/vsriram1008" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">LinkedIn</a>.
        </p>
      </section>
    </article>
  );
}
