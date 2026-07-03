const ROUTES = {
  "regime-optimizer": "/calculators/regime-optimizer",
  hra: "/calculators/hra",
  "multiple-employer": "/calculators/multiple-employer",
  "advance-tax": "/calculators/advance-tax",
  "house-property-income": "/calculators/house-property-income",
} as const;

type CalcName = keyof typeof ROUTES;

/**
 * Builds an internal calculator URL with optional numeric query params.
 * Params with value 0 or undefined are omitted so the URL stays clean.
 * Negative values (e.g. HP losses) are preserved as-is.
 */
export function calcUrl(
  calc: CalcName,
  params?: Record<string, number | undefined>
): string {
  const base = ROUTES[calc];
  if (!params) return base;
  const pairs = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== 0
  ) as [string, number][];
  if (pairs.length === 0) return base;
  const qs = pairs.map(([k, v]) => `${k}=${Math.round(v)}`).join("&");
  return `${base}?${qs}`;
}

/** Safely parse a numeric search-param value. Returns 0 if absent or NaN.
 *  Pass allowNegative=true for params that legitimately carry negative values
 *  (e.g. hpIncome when house property generates a loss). */
export function parseParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string,
  allowNegative = false
): number {
  const raw = searchParams[key];
  if (typeof raw !== "string") return 0;
  const n = Number(raw);
  if (!isFinite(n)) return 0;
  if (!allowNegative && n < 0) return 0;
  return Math.trunc(n);
}
