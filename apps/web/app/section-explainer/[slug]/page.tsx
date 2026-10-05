import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SECTIONS } from "../_components/sections-data";

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ slug: s.slug }));
}

const BASE = "https://taxsaral.org";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const section = SECTIONS.find((s) => s.slug === slug);
  if (!section) return {};
  const title = `${section.section2025} — ${section.title} | TaxSaral`;
  const description = section.explanation.slice(0, 160);
  const url = `${BASE}/section-explainer/${section.slug}`;
  return {
    title,
    description,
    keywords: section.keywords,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", siteName: "TaxSaral" },
    twitter: { card: "summary", title, description },
  };
}

export default async function SectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = SECTIONS.find((s) => s.slug === slug);
  if (!section) notFound();

  const related = section.relatedSlugs
    .map((rs) => SECTIONS.find((s) => s.slug === rs))
    .filter(Boolean);

  const pageUrl = `${BASE}/section-explainer/${section.slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Section Explainer", item: `${BASE}/section-explainer` },
      { "@type": "ListItem", position: 3, name: `${section.section2025} — ${section.title}`, item: pageUrl },
    ],
  };
  const faqSchema = section.examples.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: section.examples.map((ex) => ({
      "@type": "Question",
      name: ex.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${ex.scenario} ${ex.calculation} Result: ${ex.result}`,
      },
    })),
  } : null;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/section-explainer" className="underline-offset-4 hover:text-foreground hover:underline">
          Section Explainer
        </Link>
        {" / "}
        <span>{section.category}</span>
      </nav>

      <header className="mb-10">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-primary">{section.section2025}</span>
          {section.section1961 && (
            <> · was <span className="font-medium text-foreground">{section.section1961}</span> in the 1961 Act</>
          )}
        </p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">{section.title}</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-foreground/85">{section.explanation}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Who it applies to: </span>
          {section.whoItApplies}
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-semibold">Key points</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/85 marker:text-muted-foreground">
          {section.keyPoints.map((point, i) => (
            <li key={i} className="pl-1">{point}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold">
          Worked example{section.examples.length > 1 ? "s" : ""}
        </h2>
        <div className="mt-4 space-y-10">
          {section.examples.map((example, i) => (
            <div key={i}>
              <h3 className="text-lg font-semibold">
                {section.examples.length > 1 && <span className="text-muted-foreground">{i + 1}. </span>}
                {example.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">{example.scenario}</p>
              <pre className="mt-4 overflow-x-auto rounded-md border bg-card px-4 py-3 font-mono text-xs leading-relaxed text-foreground whitespace-pre-wrap break-words">
                {example.calculation}
              </pre>
              <p className="mt-4 border-l-2 border-primary pl-4 text-[15px] leading-relaxed">
                <span className="font-semibold">Result: </span>
                {example.result}
              </p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold">Related sections</h2>
          <ul className="mt-3 divide-y border-y">
            {related.map((rel) => rel && (
              <li key={rel.slug}>
                <Link href={`/section-explainer/${rel.slug}`} className="group flex items-baseline gap-4 py-3">
                  <span className="w-28 shrink-0 font-mono text-sm text-primary">{rel.section2025}</span>
                  <span className="font-medium group-hover:text-primary group-hover:underline underline-offset-4">{rel.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-[15px] text-muted-foreground">
        Not sure how {section.section2025} applies to you?{" "}
        <Link href="/ask" className="text-primary underline underline-offset-4">Ask a question</Link>
        {" "}or{" "}
        <Link href="/section-explainer" className="text-primary underline underline-offset-4">browse all sections</Link>.
      </p>

      <p className="mt-8 border-t pt-5 text-xs text-muted-foreground leading-relaxed">
        Section references are based on the Income Tax Act 2025 (Tax Year 2026-27). Examples are illustrative; verify with a Chartered Accountant before filing.
      </p>
    </div>
  );
}
