import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaxSaral — Income Tax Calculators & Guide (IT Act 2025)",
  description:
    "Free Indian income tax calculators for Tax Year 2026-27 built on the Income Tax Act 2025. Regime optimizer, HRA, house property, advance tax — no login, no data stored.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteHeader />
        <div className="min-h-[calc(100vh-3.5rem)]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
