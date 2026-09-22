import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://taxsaral.org"),
  // No title.template here: pages already carry "| TaxSaral" in their own
  // titles, so a template would brand them twice.
  title: "TaxSaral — Income Tax Act 2025: Case Law, Guide & Calculators",
  description:
    "Everything on the Income Tax Act 2025 in one place — 112 landmark judgments mapped to the new sections, a 536-section guide, 1961-to-2025 section mapping, detailed explainers, practice quizzes and free calculators for Tax Year 2026-27.",
  applicationName: "TaxSaral",
  authors: [{ name: "TaxSaral" }],
  creator: "TaxSaral",
  publisher: "TaxSaral",
  category: "Finance",
  keywords: [
    "Income Tax Act 2025",
    "IT Act 2025 sections",
    "income tax case law India",
    "1961 to 2025 section mapping",
    "tax year 2026-27",
    "income tax calculator India",
    "regime optimizer",
    "HRA calculator",
    "section explainer IT Act 2025",
    "CA final direct tax",
  ],
  verification: {
    google: "TG2OfaxVEkco3BQJd7LcvLPlLYT8fXHqE2P1WO_ENz8",
  },
  // Let Google show full-length previews and large image thumbnails.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    siteName: "TaxSaral",
    type: "website",
    locale: "en_IN",
    title: "TaxSaral — Income Tax Act 2025: Case Law, Guide & Calculators",
    description:
      "112 landmark judgments mapped to IT Act 2025 sections, a 536-section guide, detailed explainers, quizzes and free calculators. No login, no ads.",
    url: "https://taxsaral.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaxSaral — Income Tax Act 2025",
    description:
      "Landmark case law mapped to the new sections, a full section guide, explainers and free calculators. No login, no ads.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent dark-mode flash before React hydrates */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(t===null&&d)){document.documentElement.classList.add('dark');}}catch(e){}})();` }} />
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
