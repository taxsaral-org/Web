import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_LAWS } from "../_components/case-law-data";

const BASE = "https://taxsaral.org";

export function generateStaticParams() {
  return CASE_LAWS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = CASE_LAWS.find((x) => x.slug === slug);
  if (!c) return {};

  const url = `${BASE}/case-law/${c.slug}`;
  const title = `${c.caseName} ${c.citation} — Case Summary | TaxSaral`;
  const description = `${c.held.slice(0, 150)}… Decided under ${c.section1961}; now ${c.section2025} of the Income Tax Act 2025.`;

  return {
    title,
    description,
    keywords: [
      c.caseName,
      c.citation,
      ...c.keywords,
      c.category,
      "income tax case law",
      "IT Act 2025",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${c.caseName} — ${c.citation}`,
      description,
      url,
      type: "article",
      siteName: "TaxSaral",
    },
    twitter: {
      card: "summary",
      title: `${c.caseName} | TaxSaral`,
      description,
    },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-xl font-semibold text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function CaseLawDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = CASE_LAWS.find((x) => x.slug === slug);
  if (!c) notFound();

  const url = `${BASE}/case-law/${c.slug}`;

  // Other judgments in the same area, for onward navigation.
  const related = CASE_LAWS.filter(
    (x) => x.category === c.category && x.slug !== c.slug
  ).slice(0, 4);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${c.caseName} — ${c.citation}`,
    description: c.held,
    url,
    datePublished: String(c.year),
    about: `${c.section2025} — ${c.sectionTopic}`,
    keywords: c.keywords.join(", "),
    author: { "@type": "Organization", name: "TaxSaral", url: BASE },
    publisher: { "@type": "Organization", name: "TaxSaral", url: BASE },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Case Law", item: `${BASE}/case-law` },
      { "@type": "ListItem", position: 3, name: c.caseName, item: url },
    ],
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/case-law" className="underline-offset-4 hover:text-foreground hover:underline">
          Case law
        </Link>
        {" / "}
        <span>{c.category}</span>
      </nav>

      <header className="mb-8">
        <p className="text-sm text-muted-foreground">
          {c.court} · {c.year}
        </p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">
          {c.caseName}
        </h1>
        <p className="mt-2 font-mono text-sm text-muted-foreground">{c.citation}</p>

        <div className="mt-6 border-y py-3 text-[15px]">
          <p>
            <span className="text-muted-foreground">Decided under </span>
            <span className="font-medium">{c.section1961}</span>
            <span className="text-muted-foreground"> of the 1961 Act; now </span>
            <span className="font-medium text-primary">{c.section2025}</span>
            <span className="text-muted-foreground"> of the 2025 Act.</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{c.sectionTopic}</p>
        </div>
      </header>

      {/* Held — lead with the ratio */}
      <div className="mb-10 border-l-2 border-primary pl-5">
        <h2 className="text-xl font-semibold text-primary">Held</h2>
        <p className="mt-1 text-[17px] leading-relaxed text-foreground">{c.held}</p>
      </div>

      <div className="space-y-9 text-[15px] leading-relaxed text-foreground/85">
        <Section title="Issue before the court">
          <p>{c.issue}</p>
        </Section>

        <Section title="Facts">
          <p>{c.facts}</p>
        </Section>

        {c.proceduralHistory && (
          <Section title="How the matter reached the court">
            <p>{c.proceduralHistory}</p>
          </Section>
        )}

        {c.contentions && (
          <Section title="Arguments">
            <div className="grid gap-6 border-t pt-4 sm:grid-cols-2 sm:gap-0 sm:divide-x">
              <div className="sm:pr-6">
                <p className="mb-1 text-sm font-semibold text-emerald-800 dark:text-emerald-400">
                  For the assessee
                </p>
                <p>{c.contentions.assessee}</p>
              </div>
              <div className="sm:pl-6">
                <p className="mb-1 text-sm font-semibold text-rose-800 dark:text-rose-400">
                  For the Revenue
                </p>
                <p>{c.contentions.revenue}</p>
              </div>
            </div>
          </Section>
        )}

        <Section title="The court's reasoning">
          <p>{c.summary}</p>
        </Section>

        <Section title="Principles established">
          <ol className="list-decimal space-y-2 pl-5 marker:text-muted-foreground">
            {c.principles.map((p, i) => (
              <li key={i} className="pl-1">{p}</li>
            ))}
          </ol>
        </Section>

        <section className="rounded-md border bg-secondary/50 px-5 py-4">
          <h2 className="text-xl font-semibold text-foreground">
            Position under the IT Act 2025
          </h2>
          <p className="mt-2 text-foreground/90">{c.relevance}</p>
        </section>

        <p className="text-sm text-muted-foreground">
          <span className="text-foreground">Keywords:</span> {c.keywords.join(", ")}
        </p>
      </div>

      {/* Related judgments */}
      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-semibold">More on {c.category.toLowerCase()}</h2>
          <ul className="mt-3 divide-y border-y">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/case-law/${r.slug}`} className="group block py-3">
                  <span className="font-medium leading-snug group-hover:text-primary group-hover:underline underline-offset-4">
                    {r.caseName}
                  </span>
                  <span className="ml-2 font-mono text-xs text-muted-foreground">{r.citation}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">Note: </span>
        This is a summary prepared for study and reference. The citation is given so
        the full text of the judgment can be consulted, and it should be, before the
        case is relied on. Corresponding Income Tax Act 2025 sections are drawn from
        the section mapping used across this site; where a provision has been recast
        rather than renumbered, the note above explains how far the principle still
        applies. This page is not a substitute for professional advice.
      </p>

      <p className="mt-6 text-sm">
        <Link href="/case-law" className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          &larr; All judgments
        </Link>
      </p>
    </div>
  );
}
