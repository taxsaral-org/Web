"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlobalSearch } from "./global-search";
import { ThemeToggle } from "./theme-toggle";

interface NavItem {
  href: string;
  label: string;
  desc?: string;
}

const EXPLAINERS: NavItem[] = [
  { href: "/section-explainer", label: "Section Explainer", desc: "Key sections in plain language" },
  { href: "/detailed-explainer", label: "Detailed Explainer", desc: "Worked analyses of the hard provisions" },
  { href: "/guide", label: "Beginner's Guide", desc: "Regimes, deductions and TDS from scratch" },
];

const CALCULATORS: NavItem[] = [
  { href: "/calculators/regime-optimizer", label: "Regime Optimizer", desc: "Find your best tax regime" },
  { href: "/calculators/hra", label: "HRA Exemption", desc: "Calculate HRA tax exemption" },
  { href: "/calculators/house-property-income", label: "House Property", desc: "Rental income & loan interest" },
  { href: "/calculators/multiple-employer", label: "Multiple Employer", desc: "Form 122 (12B) & TDS reconciliation" },
  { href: "/calculators/advance-tax", label: "Advance Tax", desc: "Quarterly installment amounts" },
  { href: "/calculators/residential-status", label: "Residential Status", desc: "ROR, RNOR or Non-Resident" },
];

const LINKS_BEFORE: NavItem[] = [
  { href: "/case-law", label: "Case Law" },
  { href: "/section-mapping", label: "Mapping" },
];

const LINKS_AFTER: NavItem[] = [
  { href: "/form-comparison", label: "Forms" },
  { href: "/tax-calendar", label: "Calendar" },
  { href: "/quiz", label: "Quiz" },
];

const MOBILE_LINKS: NavItem[] = [
  { href: "/case-law", label: "Case Law" },
  { href: "/section-mapping", label: "1961 → 2025 Mapping" },
  ...EXPLAINERS,
  { href: "/form-comparison", label: "Form Comparison" },
  { href: "/tax-calendar", label: "Tax Calendar" },
  { href: "/quiz", label: "Quiz" },
];

function isActive(pathname: string | null, href: string) {
  return pathname === href || !!pathname?.startsWith(href + "/");
}

const linkClass = (active: boolean) =>
  cn(
    "relative px-2.5 py-1.5 text-sm transition-colors",
    active
      ? "text-foreground after:absolute after:inset-x-2.5 after:-bottom-[13px] after:h-0.5 after:bg-primary"
      : "text-muted-foreground hover:text-foreground"
  );

function Dropdown({
  label,
  items,
  pathname,
  open,
  onToggle,
}: {
  label: string;
  items: NavItem[];
  pathname: string | null;
  open: boolean;
  onToggle: () => void;
}) {
  const active = items.some((i) => isActive(pathname, i.href));
  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className={cn(linkClass(active), "flex items-center gap-1")}
      >
        {label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-2 w-72 rounded-md border bg-popover p-1 shadow-md">
          {items.map(({ href, label, desc }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "block rounded px-3 py-2 hover:bg-muted",
                pathname === href && "bg-muted"
              )}
            >
              <span className={cn("block text-sm", pathname === href ? "font-medium text-primary" : "text-foreground")}>
                {label}
              </span>
              {desc && <span className="block text-xs text-muted-foreground">{desc}</span>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  const toggle = (name: string) => setOpenMenu((m) => (m === name ? null : name));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="shrink-0 font-serif text-xl font-semibold tracking-tight">
          TaxSaral
        </Link>

        {/* Desktop nav */}
        <nav ref={navRef} className="hidden lg:flex items-center">
          {LINKS_BEFORE.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(isActive(pathname, href))}>
              {label}
            </Link>
          ))}
          <Dropdown
            label="Explainers"
            items={EXPLAINERS}
            pathname={pathname}
            open={openMenu === "explainers"}
            onToggle={() => toggle("explainers")}
          />
          <Dropdown
            label="Calculators"
            items={CALCULATORS}
            pathname={pathname}
            open={openMenu === "calculators"}
            onToggle={() => toggle("calculators")}
          />
          {LINKS_AFTER.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(isActive(pathname, href))}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side — search, theme, bookmarks, ask (desktop) / hamburger (mobile) */}
        <div className="flex items-center gap-1 shrink-0">
          <GlobalSearch />
          <ThemeToggle />
          <Link
            href="/bookmarks"
            aria-label="My Bookmarks"
            title="My Bookmarks"
            className={cn(
              "hidden sm:flex h-8 w-8 items-center justify-center rounded-md transition-colors",
              pathname === "/bookmarks"
                ? "text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Bookmark className="h-4 w-4" />
          </Link>
          <Link
            href="/ask"
            className="hidden lg:inline-flex ml-1 rounded-md border px-3 py-1.5 text-sm text-foreground hover:border-foreground/30 hover:bg-muted transition-colors"
          >
            Ask a question
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-background">
          <nav className="container mx-auto grid max-w-6xl gap-x-8 py-4 sm:grid-cols-2">
            <div className="flex flex-col">
              {MOBILE_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "border-b border-border/60 py-2.5 text-[15px]",
                    isActive(pathname, href) ? "font-medium text-primary" : "text-foreground"
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="mt-5 flex flex-col sm:mt-0">
              <p className="pb-1 text-sm text-muted-foreground">Calculators</p>
              {CALCULATORS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "border-b border-border/60 py-2.5 text-[15px]",
                    pathname === href ? "font-medium text-primary" : "text-foreground"
                  )}
                >
                  {label}
                </Link>
              ))}
              <div className="mt-4 flex gap-4 text-[15px]">
                <Link href="/bookmarks" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground">
                  My bookmarks
                </Link>
                <Link href="/ask" onClick={() => setMobileOpen(false)} className="text-primary">
                  Ask a question
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
