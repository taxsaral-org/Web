import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://taxsaral.org"),
  title: "TaxSaral — Income Tax Calculators & Guide (IT Act 2025)",
  description:
    "Free Indian income tax calculators for Tax Year 2026-27 built on the Income Tax Act 2025. Regime optimizer, HRA, house property, advance tax — no login, no data stored.",
  keywords: [
    "income tax calculator India 2025",
    "IT Act 2025 calculator",
    "tax year 2026-27",
    "regime optimizer",
    "HRA calculator",
    "advance tax calculator",
    "section explainer IT Act 2025",
    "income tax India free",
  ],
  verification: {
    google: "TG2OfaxVEkco3BQJd7LcvLPlLYT8fXHqE2P1WO_ENz8",
  },
  openGraph: {
    siteName: "TaxSaral",
    type: "website",
    locale: "en_IN",
    title: "TaxSaral — Income Tax Calculators & Guide (IT Act 2025)",
    description:
      "Free Indian income tax calculators for Tax Year 2026-27 built on the Income Tax Act 2025. No login, no data stored.",
    url: "https://taxsaral.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaxSaral — Income Tax Calculators (IT Act 2025)",
    description:
      "Free Indian income tax calculators built on the Income Tax Act 2025. No login, no data stored.",
  },
  alternates: {
    canonical: "https://taxsaral.org",
  },
};

const SCHEMA_ORG = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://taxsaral.org/#organization",
      name: "TaxSaral",
      url: "https://taxsaral.org",
      description:
        "Free Indian income tax calculators and section-by-section guide for the Income Tax Act 2025.",
    },
    {
      "@type": "WebSite",
      "@id": "https://taxsaral.org/#website",
      url: "https://taxsaral.org",
      name: "TaxSaral",
      publisher: { "@id": "https://taxsaral.org/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://taxsaral.org/section-explainer?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ORG) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QYG1D8TTGS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QYG1D8TTGS');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <SiteHeader />
        <div className="min-h-[calc(100vh-3.5rem)]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
