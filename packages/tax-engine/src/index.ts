// Tax computation engine — Income Tax Act 2025, TY 2026-27
// Zero UI imports. All rule values sourced from @taxsaral/tax-rules only.

export { computeIncomeTax } from "./compute-income-tax";
export { computeSurcharge } from "./compute-surcharge";
export { applyRebate } from "./apply-rebate";
export { computeTaxResult } from "./compute-tax-result";
export { compareRegimes } from "./compare-regimes";
export type { CompareResult } from "./compare-regimes";
export { computeHousePropertyIncome } from "./house-property";
export type {
  HpPropertyType,
  HpPropertyInput,
  HpArrearsInput,
  HpPropertyResult,
  HpSummary,
} from "./house-property";
export { determineResidentialStatus } from "./residential-status";
export type {
  Citizenship,
  ResidentialStatus,
  ResidentialStatusInput,
  ResidentialStatusTrailEntry,
  ResidentialStatusResult,
} from "./residential-status";
