# TaxSaral

India's most comprehensive income tax calculator and section-by-section guide for the **Income Tax Act 2025** (Tax Year 2026-27).

> **Scope:** This project covers the Income Tax Act 2025 only. The old Income Tax Act 1961 is out of scope.

---

## Project Structure

```
taxsaral/
├── apps/
│   └── web/                    # Next.js 14 App Router (public website)
│       ├── app/                # App Router pages and layouts
│       ├── components/         # React components (shadcn/ui + custom)
│       │   └── ui/             # shadcn/ui primitive components
│       └── lib/                # Client-side utilities (cn, etc.)
├── packages/
│   ├── tax-engine/             # Pure TypeScript tax computation logic
│   │                           #   ↳ Zero UI imports allowed
│   ├── tax-rules/              # Versioned tax rule configs
│   │   └── src/ty-2026-27/    #   ↳ TY 2026-27 rates, slabs, limits
│   └── types/                  # Shared TypeScript interfaces
├── turbo.json                  # Turborepo pipeline
├── pnpm-workspace.yaml         # pnpm workspace config
├── tsconfig.json               # Base TypeScript config (extended by all packages)
└── .eslintrc.js                # Base ESLint config
```

---

## Critical Architecture Rule

**All tax rates, slabs, deduction limits, section numbers, and form names must live in `/packages/tax-rules` versioned config files only.**

Never hardcode any tax value in UI or calculation code. The `tax-engine` package reads from `tax-rules`; the `web` app reads from `tax-engine`. No exceptions.

---

## Tech Stack

| Layer       | Technology                                    |
|-------------|-----------------------------------------------|
| Frontend    | Next.js 14 (App Router), React 18, TypeScript |
| Styling     | Tailwind CSS, shadcn/ui                       |
| Tax Logic   | `@taxsaral/tax-engine` (pure TS, zero UI deps)|
| Tax Rules   | `@taxsaral/tax-rules` (versioned per TY)      |
| Database    | Supabase                                      |
| Hosting     | Vercel                                        |
| Monorepo    | pnpm workspaces + Turborepo                   |

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start all apps in development
pnpm dev

# Build all packages and apps
pnpm build

# Lint all packages
pnpm lint

# Type-check all packages
pnpm type-check

# Format all files
pnpm format
```

---

## Tax Year Support

| Tax Year   | Governing Act          | Status |
|------------|------------------------|--------|
| TY 2026-27 | Income Tax Act 2025    | Active |

---

## Package Dependency Graph

```
@taxsaral/web
  ├── @taxsaral/tax-engine
  │     ├── @taxsaral/tax-rules
  │     │     └── @taxsaral/types
  │     └── @taxsaral/types
  └── @taxsaral/types
```
