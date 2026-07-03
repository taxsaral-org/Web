import type { TaxRule } from "@taxsaral/types";
import { RULES_TY_2026_27 } from "./ty-2026-27";

export { RULES_TY_2026_27 } from "./ty-2026-27";
export { TAX_YEAR, GOVERNING_ACT } from "./ty-2026-27";
export type { TaxYear } from "./ty-2026-27";

// Registry of all supported tax years. Add a new entry for each future year.
const RULES_BY_YEAR: Record<string, TaxRule> = {
  "TY-2026-27": RULES_TY_2026_27,
};

export function getRuleForYear(year: string): TaxRule {
  const rule = RULES_BY_YEAR[year];
  if (!rule) {
    const available = Object.keys(RULES_BY_YEAR).join(", ");
    throw new Error(
      `No tax rules configured for year: "${year}". Available: ${available}`
    );
  }
  return rule;
}
