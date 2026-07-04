"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/guide", label: "Guide" },
  { href: "/calculators/regime-optimizer", label: "Regime Optimizer" },
  { href: "/calculators/hra", label: "HRA" },
  { href: "/calculators/house-property-income", label: "House Property" },
  { href: "/calculators/multiple-employer", label: "Multiple Employer" },
  { href: "/calculators/advance-tax", label: "Advance Tax" },
  { href: "/calculators/residential-status", label: "Residential Status" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 shrink-0"
        >
          <span className="text-lg font-bold tracking-tight">TaxSaral</span>
          <span className="hidden rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary sm:inline">
            IT Act 2025
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-0.5">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                pathname === href
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Ask CTA — desktop only */}
        <Link
          href="/ask"
          className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors shrink-0"
        >
          Ask a Question
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="sm:hidden border-t bg-background px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-0.5">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/ask"
              onClick={() => setOpen(false)}
              className={cn(
                "mt-1 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
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
