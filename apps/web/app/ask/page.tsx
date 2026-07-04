import type { Metadata } from "next";
import { Lock, ShieldCheck, Clock, BookOpen } from "lucide-react";
import { AskClient } from "./_components/ask-client";

export const metadata: Metadata = {
  title: "Ask Our Tax Team — TaxSaral",
  description:
    "Have an Income Tax Act 2025 question? Submit your query and our team will email you a personalised response. Free, private, and confidential.",
};

const TRUST_POINTS = [
  {
    icon: Lock,
    title: "Completely private",
    body: "Your query and email are only seen by our tax team. We never share your information with any third party.",
  },
  {
    icon: ShieldCheck,
    title: "IT Act 2025 expertise",
    body: "All responses are based on the Income Tax Act 2025, applicable to Tax Year 2026-27 (AY 2027-28).",
  },
  {
    icon: Clock,
    title: "Reply within 2–3 days",
    body: "We review every query personally and send a detailed, personalised response to your email.",
  },
  {
    icon: BookOpen,
    title: "For guidance only",
    body: "Our responses are educational guidance. For decisions with significant financial impact, please consult a Chartered Accountant.",
  },
];

export default function AskPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      {/* Page header */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="mb-3 flex justify-center">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Tax Year 2026-27 · IT Act 2025
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ask Our Tax Team
        </h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Have a question about your income tax? Submit your query below and we&apos;ll send a detailed,
          personalised response to your email — usually within 2–3 business days.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">

        {/* ── Chat widget ── */}
        <div className="flex flex-col rounded-2xl border bg-card shadow-sm overflow-hidden" style={{ minHeight: "520px" }}>
          <AskClient />
        </div>

        {/* ── Trust sidebar ── */}
        <aside className="space-y-4">
          {TRUST_POINTS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-3 rounded-xl border bg-card p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{body}</p>
              </div>
            </div>
          ))}

          {/* Example topics */}
          <div className="rounded-xl border bg-muted/30 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Popular topics
            </p>
            <ul className="space-y-1.5">
              {[
                "Which tax regime saves more for my income?",
                "How is HRA calculated for metro cities?",
                "Am I an NR or RNOR this year?",
                "Do I need to pay advance tax?",
                "How to declare multiple employer income?",
                "What deductions can I claim under IT Act 2025?",
              ].map(t => (
                <li key={t} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-muted-foreground px-1 leading-relaxed">
            <strong className="text-foreground">Disclaimer:</strong> Responses are for educational guidance only and do not constitute legal or tax advice. Always consult a qualified CA before filing your return.
          </p>
        </aside>
      </div>
    </div>
  );
}
