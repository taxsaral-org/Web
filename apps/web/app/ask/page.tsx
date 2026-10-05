import type { Metadata } from "next";
import { AskClient } from "./_components/ask-client";

export const metadata: Metadata = {
  title: "Ask Our Tax Team — TaxSaral",
  description:
    "Have an Income Tax Act 2025 question? Submit your query and our team will email you a personalised response. Free, private, and confidential.",
  alternates: { canonical: "https://taxsaral.org/ask" },
};

const NOTES = [
  "Your question and email address are seen only by the TaxSaral team and are never shared with anyone else.",
  "Answers are based on the Income Tax Act 2025 as it applies to Tax Year 2026-27 (AY 2027-28).",
  "Every question is read and answered personally, usually within 2–3 business days.",
  "Replies are educational guidance, not legal or tax advice. For decisions with real financial weight, consult a Chartered Accountant before you act or file.",
];

const EXAMPLES = [
  "Which tax regime saves more for my income?",
  "How is HRA calculated for metro cities?",
  "Am I an NR or RNOR this year?",
  "Do I need to pay advance tax?",
  "How to declare multiple employer income?",
  "What deductions can I claim under IT Act 2025?",
];

export default function AskPage() {
  return (
    <div className="container mx-auto max-w-5xl py-10 sm:py-12">
      <div className="max-w-2xl">
        <p className="text-sm text-muted-foreground">Income Tax Act 2025 · Tax Year 2026-27</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Ask a question</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          Stuck on something in your own return? Send the question with your email address and
          you&apos;ll get a written reply, usually within 2–3 business days.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
        <div className="flex flex-col overflow-hidden rounded-md border bg-card" style={{ minHeight: "520px" }}>
          <AskClient />
        </div>

        <aside className="text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-base font-semibold text-foreground">Good to know</h2>
          <ul className="mt-3 space-y-3">
            {NOTES.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>

          <h2 className="mt-8 text-base font-semibold text-foreground">The kind of thing people ask</h2>
          <ul className="mt-3 space-y-1.5">
            {EXAMPLES.map((t) => (
              <li key={t}>&ldquo;{t}&rdquo;</li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
