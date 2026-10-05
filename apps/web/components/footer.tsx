import Link from "next/link";

const COLUMNS = [
  {
    heading: "Reference",
    links: [
      { href: "/case-law", label: "Case Law" },
      { href: "/section-mapping", label: "1961 → 2025 Mapping" },
      { href: "/section-explainer", label: "Section Explainer" },
      { href: "/detailed-explainer", label: "Detailed Explainer" },
      { href: "/form-comparison", label: "Form Comparison" },
      { href: "/tax-calendar", label: "Tax Calendar" },
    ],
  },
  {
    heading: "Calculators",
    links: [
      { href: "/calculators/regime-optimizer", label: "Regime Optimizer" },
      { href: "/calculators/hra", label: "HRA Exemption" },
      { href: "/calculators/house-property-income", label: "House Property Income" },
      { href: "/calculators/multiple-employer", label: "Multiple Employer" },
      { href: "/calculators/advance-tax", label: "Advance Tax" },
      { href: "/calculators/residential-status", label: "Residential Status" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { href: "/guide", label: "Beginner's Guide" },
      { href: "/quiz", label: "Quiz" },
      { href: "/ask", label: "Ask a Question" },
      { href: "/about", label: "About" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms of Use" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="container mx-auto max-w-5xl py-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-lg font-semibold">TaxSaral</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A free reference to the Income Tax Act, 2025, with the 1961 Act
              alongside. No ads, no sign-up, and calculator inputs never leave
              your browser.
            </p>
          </div>

          {COLUMNS.map(({ heading, links }) => (
            <div key={heading}>
              <p className="text-sm font-medium">{heading}</p>
              <ul className="mt-3 space-y-2">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t pt-6 text-xs leading-relaxed text-muted-foreground">
          <p className="max-w-3xl">
            Calculations are estimates for information only and are not tax advice.
            Verify with a Chartered Accountant before filing a return or paying
            advance tax. Rates and rules are those of the Income Tax Act 2025 for
            Tax Year 2026-27 (AY 2027-28).
          </p>
          <p className="mt-3">© 2026 TaxSaral.org</p>
        </div>
      </div>
    </footer>
  );
}
