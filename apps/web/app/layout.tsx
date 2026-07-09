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
  verification: {
    google: "TG2OfaxVEkco3BQJd7LcvLPlLYT8fXHqE2P1WO_ENz8",
  },
  openGraph: {
    siteName: "TaxSaral",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
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
