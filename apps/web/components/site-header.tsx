"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const CALCULATORS = [
  { href: "/calculators/regime-optimizer", label: "Regime Optimizer", desc: "Find your best tax regime" },
  { href: "/calculators/hra", label: "HRA Exemption", desc: "Calculate HRA tax exemption" },
  { href: "/calculators/house-property-income", label: "House Property", desc: "Rental income & loan interest" },
  { href: "/calculators/multiple-employer", label: "Multiple Employer", desc: "Form 12B & TDS reconciliation" },
  { href: "/calculators/advance-tax", label: "Advance Tax", desc: "Quarterly installment amounts" },
  { href: "/calculators/residential-status", label: "Residential Status", desc: "ROR, RNOR or Non-Resident" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const isCalculatorActive = CALCULATORS.some(c => pathname === c.href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-lg font-bold tracking-tight">TaxSaral</span>
          <span className="hidden rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-xs font-semibold text-blue-700 sm:inline">
            IT Act 2025
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-0.5">

          {/* Guide link */}
          <Link
            href="/guide"
            className={cn(
              "rounded-md px-3 py-1.5 text-sm transition-colors",
              pathname === "/guide"
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Guide
          </Link>

          {/* Section Explainer link */}
          <Link
            href="/section-explainer"
            className={cn(
              "rounded-md px-3 py-1.5 text-sm transition-colors",
              pathname === "/section-explainer"
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Sections
          </Link>

          {/* Calculators dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(v => !v)}
              className={cn(
                "flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors",
                isCalculatorActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              Calculators
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", dropdownOpen && "rotate-180")} />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-1 w-72 rounded-xl border bg-background shadow-lg ring-1 ring-black/5">
                <div className="p-1.5">
                  {CALCULATORS.map(({ href, label, desc }) => (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        "flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors",
                        pathname === href
                          ? "bg-primary/10"
                          : "hover:bg-muted"
                      )}
                    >
                      <span className={cn(
                        "text-sm font-medium",
                        pathname === href ? "text-primary" : "text-foreground"
                      )}>
                        {label}
                      </span>
                      <span className="text-xs text-muted-foreground">{desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Ask CTA — desktop */}
        <Link
          href="/ask"
          className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors shrink-0"
        >
          Ask a Question
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(v => !v)}
          className="sm:hidden rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t bg-background px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-0.5">
            <Link
              href="/guide"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === "/guide"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              Guide
            </Link>
            <Link
              href="/section-explainer"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === "/section-explainer"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              Section Explainer
            </Link>

            {/* Calculators section */}
            <p className="mt-2 px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Calculators
            </p>
            {CALCULATORS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  pathname === href
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {label}
              </Link>
            ))}

            <Link
              href="/ask"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "mt-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === "/ask"
                  ? "bg-primary/10 text-primary"
                  : "text-primary hover:bg-primary/10"
              )}
            >
              Ask a Question
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
