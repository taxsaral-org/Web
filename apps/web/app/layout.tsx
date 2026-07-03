import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaxSaral — Income Tax Calculator & Guide (IT Act 2025)",
  description:
    "India's most comprehensive income tax calculator and section-by-section guide for the Income Tax Act 2025, Tax Year 2026-27.",
};

const NAV_LINKS = [
  { href: "/calculators/regime-optimizer", label: "Regime Optimizer" },
  { href: "/calculators/hra", label: "HRA" },
  { href: "/calculators/house-property-income", label: "House Property" },
  { href: "/calculators/multiple-employer", label: "Multiple Employer" },
  { href: "/calculators/advance-tax", label: "Advance Tax" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* ── Top nav ─────────────────────────────────────────────── */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
          <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight">TaxSaral</span>
              <span className="hidden rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary sm:inline">
                IT Act 2025
              </span>
            </Link>

            <nav className="flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {/* ── Page content ─────────────────────────────────────────── */}
        <div className="min-h-[calc(100vh-3.5rem)]">{children}</div>
      </body>
    </html>
  );
}
