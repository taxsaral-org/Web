// House Property Income — Sections 20-25, Income Tax Act 2025
// All caps/rates from TaxRule config. Zero hardcoded tax values here.

import type { TaxRule } from "@taxsaral/types";

// ── Types ─────────────────────────────────────────────────────────────────────

export type HpPropertyType =
  | "self-occupied"          // Type A — nil AV, max 2
  | "let-out-full"           // Type B — full year let
  | "let-out-partial-vacant" // Type C — let then vacant (Section 21(2))
  | "partly-let-self-occ"   // Type D — different units, some let some SO
  | "partly-let-vacant"      // Type E — different periods, let then vacant
  | "deemed-let-out"         // Type F — 3rd+ property not let
  | "builder-inventory"      // Type G — unsold stock-in-trade
  | "business-use";          // Type H — excluded (Section 20(2))
// Type I (foreign) is `isForeign: boolean` flag on any type above

export interface HpPropertyInput {
  id: string;
  label: string;
  type: HpPropertyType;
  isForeign: boolean;

  // ── Rent inputs (Types B, C, D, E, F, G-expired) ──
  municipalValue: number;      // annual, from property tax bill
  fairMarketRent: number;      // annual, local market rate
  hasStandardRent: boolean;    // rent-control property?
  standardRent: number;        // annual standard rent if applicable
  actualRentReceived: number;  // Type D: from let-out units only; others: full
  unrealisedRent: number;      // rent due but not collected
  municipalTaxesPaid: number;  // paid by owner this year; Type D: whole property

  // ── Partial year (Types C, E) ──
  monthsLetOut: number;
  vacancyReason: string;

  // ── Unit split (Type D only) ──
  totalUnits: number;
  selfOccupiedUnits: number;

  // ── Interest ──
  homeLoanInterest: number;    // Type D: whole property, apportioned by engine

  // ── Co-ownership (Section 24) ──
  isCoOwned: boolean;
  ownershipSharePct: number;   // 1-99
  isDeedDocumented: boolean;

  // ── Deemed ownership (Section 25) ──
  isDeemedOwnership: boolean;
  isLiveApartTransfer: boolean;    // exception 1 — deemed ownership does NOT apply
  isMinorMarriedDaughter: boolean; // exception 2 — deemed ownership does NOT apply

  // ── Builder inventory (Type G) ──
  builderCompletionDate: string;   // ISO date
}

export interface HpArrearsInput {
  id: string;
  propertyReference: string; // property id or "" if property no longer owned
  stillOwner: boolean;       // informational only; taxable regardless
  amountReceived: number;
}

export interface HpPropertyResult {
  id: string;
  label: string;
  excluded: boolean;
  excludedReason?: string;
  effectiveType: HpPropertyType;
  sectionApplied: string;
  sectionLabel: string;
  isForeignProperty: boolean;
  isDeemedLetOutDueToSOCap: boolean;
  isDeemedOwnershipActive: boolean;
  vacancyReliefApplied: boolean;

  // ── Full GAV breakdown (stored for transparent display) ──
  municipalValue: number;
  fairMarketRent: number;
  hasStandardRent: boolean;
  standardRent: number;
  expectedRent: number;
  standardRentCapped: boolean;
  actualRentReceived: number;
  unrealisedRent: number;
  adjustedActualRent: number;
  grossAnnualValue: number;
  annualValueBasis: string;
  municipalTaxesDeducted: number;
  netAnnualValue: number;
  standardDeduction: number;

  // ── Type D (partly-let-self-occ) ──
  isPartlyLetSelfOcc: boolean;
  letOutFraction: number;             // portion that is let-out (0–1)
  soFraction: number;                 // portion that is self-occupied (0–1)
  soPortionForcedDeemedLetOut: boolean; // SO limit exceeded for this property

  // ── Interest ──
  homeLoanInterestFull: number;       // full property interest
  soInterestComponent: number;        // SO portion interest subject to aggregate cap

  isSelfOccupied: boolean;

  // ── Income (before aggregate SO cap and co-ownership share) ──
  rawIncomeDefault: number;
  rawIncomeOptional: number;

  // ── Co-ownership ──
  coOwnershipShare: number;           // fraction (0–1)
  yourShareRawDefault: number;
  yourShareRawOptional: number;
}

export interface HpSummary {
  propertyResults: HpPropertyResult[];
  selfOccupiedCount: number;
  totalSoInterestFull: number;
  soInterestAllowedOptional: number;
  soInterestAllowedDefault: number;
  totalYourShareDefault: number;
  totalYourShareOptional: number;
  totalIncomeDefault: number;
  totalIncomeOptional: number;
  arrearsItems: Array<{
    id: string;
    propertyReference: string;
    stillOwner: boolean;
    amountReceived: number;
    deduction: number;
    taxableAmount: number;
  }>;
  arrearsGross: number;
  arrearsDeduction: number;
  arrearsNet: number;
  lossSetOffDefault: number;
  lossSetOffOptional: number;
  lossCarryForwardDefault: number;
  lossCarryForwardOptional: number;
  hpContributionDefault: number;
  hpContributionOptional: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function computeExpectedRent(
  municipalValue: number,
  fairMarketRent: number,
  hasStandardRent: boolean,
  standardRent: number
): { expectedRent: number; standardRentCapped: boolean } {
  const base = Math.max(municipalValue, fairMarketRent);
  if (hasStandardRent && standardRent > 0 && standardRent < base) {
    return { expectedRent: standardRent, standardRentCapped: true };
  }
  return { expectedRent: base, standardRentCapped: false };
}

function withinBuilderWindow(
  dateStr: string,
  windowYears: number,
  asOf: Date
): boolean {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return false;
  const end = new Date(d);
  end.setFullYear(end.getFullYear() + windowYears);
  return asOf <= end;
}

const DEFAULT_TAX_YEAR_END = new Date("2027-03-31");

// ── Main computation ──────────────────────────────────────────────────────────

export function computeHousePropertyIncome(
  properties: HpPropertyInput[],
  arrears: HpArrearsInput[],
  rule: TaxRule,
  taxYearEnd: Date = DEFAULT_TAX_YEAR_END
): HpSummary {
  const hp = rule.houseProperty;
  let soCount = 0;

  const propertyResults: HpPropertyResult[] = properties.map((p) => {
    // Type H: business / profession use — excluded entirely
    if (p.type === "business-use") {
      return {
        id: p.id,
        label: p.label,
        excluded: true,
        excludedReason:
          "Used for own business or profession — excluded from Income from House Property under Section 20(2). Report under PGBP.",
        effectiveType: "business-use",
        sectionApplied: "20(2)",
        sectionLabel: "Section 20(2) — Business/profession use exclusion",
        isForeignProperty: p.isForeign,
        isDeemedLetOutDueToSOCap: false,
        isDeemedOwnershipActive: false,
        vacancyReliefApplied: false,
        municipalValue: 0,
        fairMarketRent: 0,
        hasStandardRent: false,
        standardRent: 0,
        expectedRent: 0,
        standardRentCapped: false,
        actualRentReceived: 0,
        unrealisedRent: 0,
        adjustedActualRent: 0,
        grossAnnualValue: 0,
        annualValueBasis: "Excluded — not taxable under house property",
        municipalTaxesDeducted: 0,
        netAnnualValue: 0,
        standardDeduction: 0,
        isPartlyLetSelfOcc: false,
        letOutFraction: 1,
        soFraction: 0,
        soPortionForcedDeemedLetOut: false,
        homeLoanInterestFull: p.homeLoanInterest,
        soInterestComponent: 0,
        isSelfOccupied: false,
        rawIncomeDefault: 0,
        rawIncomeOptional: 0,
        coOwnershipShare: 1,
        yourShareRawDefault: 0,
        yourShareRawOptional: 0,
      };
    }

    // Section 25: deemed ownership exceptions override
    const isDeemedOwnershipActive =
      p.isDeemedOwnership && !p.isLiveApartTransfer && !p.isMinorMarriedDaughter;

    const coOwnershipShare = p.isCoOwned ? p.ownershipSharePct / 100 : 1;
    const effectiveShare = isDeemedOwnershipActive ? 1 : coOwnershipShare;

    // Builder inventory: check nil window (Section 21(5))
    let effectiveType = p.type;
    let isBuilderNil = false;
    if (p.type === "builder-inventory") {
      isBuilderNil = withinBuilderWindow(
        p.builderCompletionDate,
        hp.builderInventoryWindowYears,
        taxYearEnd
      );
      if (!isBuilderNil) effectiveType = "deemed-let-out";
    }

    // SO limit enforcement
    let isDeemedLetOutDueToSOCap = false;
    let soPortionForcedDeemedLetOut = false;

    if (effectiveType === "self-occupied") {
      if (soCount < hp.maxSelfOccupied) {
        soCount++;
      } else {
        effectiveType = "deemed-let-out";
        isDeemedLetOutDueToSOCap = true;
      }
    } else if (effectiveType === "partly-let-self-occ") {
      if (soCount < hp.maxSelfOccupied) {
        soCount++;
      } else {
        soPortionForcedDeemedLetOut = true;
      }
    }

    const isSelfOccupied = effectiveType === "self-occupied" && !isDeemedLetOutDueToSOCap;
    const isNilAV = isSelfOccupied || isBuilderNil;

    // ── Type D: two-portion computation ──
    if (effectiveType === "partly-let-self-occ") {
      const totalUnits = Math.max(p.totalUnits, 1);
      const soUnits = Math.max(0, Math.min(p.selfOccupiedUnits, totalUnits - 1));
      const letUnits = totalUnits - soUnits;
      const letFrac = letUnits / totalUnits;
      const soFrac = soUnits / totalUnits;

      // Let-out portion
      const { expectedRent: letExpRent, standardRentCapped: letStdCapped } =
        computeExpectedRent(
          p.municipalValue * letFrac,
          p.fairMarketRent * letFrac,
          p.hasStandardRent,
          p.standardRent * letFrac
        );
      // actualRentReceived is already only the let-out units' rent
      const letAdjActual = Math.max(0, p.actualRentReceived - p.unrealisedRent);
      const letGAV = Math.max(letExpRent, letAdjActual);
      const letMunTaxes = p.municipalTaxesPaid * letFrac;
      const letNAV = Math.max(0, letGAV - letMunTaxes);
      const letStdDed = Math.floor(letNAV * hp.standardDeductionRate);
      const letInterest = p.homeLoanInterest * letFrac;
      const letIncome = letNAV - letStdDed - letInterest;

      // SO portion
      const soInterest = p.homeLoanInterest * soFrac;
      let soIncomeDef = 0;
      let soIncomeOpt = -soInterest; // uncapped, cap applied at summary level
      let soInterestComp = soInterest;
      let soGAV = 0;
      let soMunTaxes = 0;
      let soNAV = 0;
      let soStdDed = 0;

      if (soPortionForcedDeemedLetOut) {
        // SO portion becomes deemed let-out (SO limit exceeded)
        const { expectedRent: soExpRent } = computeExpectedRent(
          p.municipalValue * soFrac,
          p.fairMarketRent * soFrac,
          p.hasStandardRent,
          p.standardRent * soFrac
        );
        soGAV = soExpRent;
        soMunTaxes = p.municipalTaxesPaid * soFrac;
        soNAV = Math.max(0, soGAV - soMunTaxes);
        soStdDed = Math.floor(soNAV * hp.standardDeductionRate);
        soIncomeDef = soNAV - soStdDed - soInterest;
        soIncomeOpt = soIncomeDef; // no SO cap for forced deemed let-out portion
        soInterestComp = 0;
      }

      const rawIncomeDefault = letIncome + soIncomeDef;
      const rawIncomeOptional = letIncome + soIncomeOpt;

      return {
        id: p.id,
        label: p.label,
        excluded: false,
        effectiveType: "partly-let-self-occ",
        sectionApplied: "21(1)/(6)-(7)",
        sectionLabel: `Section 21(1)/(6)-(7) — Partly let-out (${letUnits}/${totalUnits} units), partly self-occupied`,
        isForeignProperty: p.isForeign,
        isDeemedLetOutDueToSOCap: false,
        isDeemedOwnershipActive,
        vacancyReliefApplied: false,
        municipalValue: p.municipalValue,
        fairMarketRent: p.fairMarketRent,
        hasStandardRent: p.hasStandardRent,
        standardRent: p.standardRent,
        expectedRent: letExpRent,
        standardRentCapped: letStdCapped,
        actualRentReceived: p.actualRentReceived,
        unrealisedRent: p.unrealisedRent,
        adjustedActualRent: letAdjActual,
        grossAnnualValue: letGAV + soGAV,
        annualValueBasis: `Let-out portion (${letUnits}/${totalUnits} units): higher of expected and actual rent`,
        municipalTaxesDeducted: letMunTaxes + soMunTaxes,
        netAnnualValue: letNAV + soNAV,
        standardDeduction: letStdDed + soStdDed,
        isPartlyLetSelfOcc: true,
        letOutFraction: letFrac,
        soFraction: soFrac,
        soPortionForcedDeemedLetOut,
        homeLoanInterestFull: p.homeLoanInterest,
        soInterestComponent: soInterestComp,
        isSelfOccupied: false,
        rawIncomeDefault,
        rawIncomeOptional,
        coOwnershipShare,
        yourShareRawDefault: rawIncomeDefault * effectiveShare,
        yourShareRawOptional: rawIncomeOptional * effectiveShare,
      };
    }

    // ── All other types ──
    const { expectedRent, standardRentCapped } = computeExpectedRent(
      p.municipalValue,
      p.fairMarketRent,
      p.hasStandardRent,
      p.standardRent
    );
    const adjustedActualRent = Math.max(0, p.actualRentReceived - p.unrealisedRent);

    let grossAnnualValue = 0;
    let annualValueBasis = "";
    let sectionApplied = "";
    let sectionLabel = "";
    let vacancyReliefApplied = false;

    if (isNilAV) {
      grossAnnualValue = 0;
      if (isSelfOccupied) {
        sectionApplied = "21(6)-(7)";
        sectionLabel = "Section 21(6)-(7) — Nil annual value (self-occupied)";
        annualValueBasis = `Nil — within the ${hp.maxSelfOccupied}-property self-occupied limit`;
      } else {
        sectionApplied = "21(5)";
        sectionLabel = "Section 21(5) — Nil annual value (builder inventory, within window)";
        annualValueBasis = `Nil — unsold stock-in-trade within ${hp.builderInventoryWindowYears} years of completion certificate`;
      }
    } else if (effectiveType === "let-out-full") {
      grossAnnualValue = Math.max(expectedRent, adjustedActualRent);
      sectionApplied = "21(1)";
      sectionLabel = "Section 21(1) — Let-out (full year)";
      annualValueBasis =
        adjustedActualRent > expectedRent
          ? "Adjusted actual rent is higher than expected rent"
          : "Expected rent is higher than adjusted actual rent";
    } else if (effectiveType === "let-out-partial-vacant") {
      grossAnnualValue = adjustedActualRent;
      vacancyReliefApplied = true;
      sectionApplied = "21(2)";
      sectionLabel = "Section 21(2) — Vacancy relief (let then vacant)";
      annualValueBasis = `Actual rent received (${p.monthsLetOut} month${p.monthsLetOut !== 1 ? "s" : ""}) — deeming fiction overridden by vacancy`;
    } else if (effectiveType === "partly-let-vacant") {
      grossAnnualValue = adjustedActualRent;
      vacancyReliefApplied = true;
      sectionApplied = "21(2)";
      sectionLabel = "Section 21(2) — Vacancy relief (partly let, partly vacant)";
      annualValueBasis = `Actual rent for ${p.monthsLetOut} month${p.monthsLetOut !== 1 ? "s" : ""} — lower than expected rent due to vacancy`;
    } else {
      // deemed-let-out (Type F, SO-cap overflow, or builder beyond window)
      grossAnnualValue = expectedRent;
      if (isDeemedLetOutDueToSOCap) {
        sectionApplied = "21(6)-(7)";
        sectionLabel = `Section 21(6)-(7) — Deemed let-out (exceeds ${hp.maxSelfOccupied}-property limit)`;
      } else {
        sectionApplied = "21";
        sectionLabel = "Section 21 — Deemed let-out (expected rent used as annual value)";
      }
      annualValueBasis =
        "Expected rent — higher of municipal value and fair market rent" +
        (standardRentCapped ? ", capped at standard rent" : "");
    }

    const municipalTaxesDeducted = isNilAV ? 0 : p.municipalTaxesPaid;
    const netAnnualValue = Math.max(0, grossAnnualValue - municipalTaxesDeducted);
    const standardDeduction = Math.floor(netAnnualValue * hp.standardDeductionRate);
    const homeLoanInterestFull = p.homeLoanInterest;

    let rawIncomeDefault: number;
    let rawIncomeOptional: number;
    let soInterestComponent: number;

    if (isSelfOccupied) {
      rawIncomeDefault = 0;
      rawIncomeOptional = -homeLoanInterestFull; // subject to aggregate cap at summary
      soInterestComponent = homeLoanInterestFull;
    } else {
      const base = netAnnualValue - standardDeduction;
      rawIncomeDefault = base - homeLoanInterestFull;
      rawIncomeOptional = base - homeLoanInterestFull;
      soInterestComponent = 0;
    }

    return {
      id: p.id,
      label: p.label,
      excluded: false,
      effectiveType,
      sectionApplied,
      sectionLabel,
      isForeignProperty: p.isForeign,
      isDeemedLetOutDueToSOCap,
      isDeemedOwnershipActive,
      vacancyReliefApplied,
      municipalValue: p.municipalValue,
      fairMarketRent: p.fairMarketRent,
      hasStandardRent: p.hasStandardRent,
      standardRent: p.standardRent,
      expectedRent,
      standardRentCapped,
      actualRentReceived: p.actualRentReceived,
      unrealisedRent: p.unrealisedRent,
      adjustedActualRent,
      grossAnnualValue,
      annualValueBasis,
      municipalTaxesDeducted,
      netAnnualValue,
      standardDeduction,
      isPartlyLetSelfOcc: false,
      letOutFraction: 1,
      soFraction: 0,
      soPortionForcedDeemedLetOut: false,
      homeLoanInterestFull,
      soInterestComponent,
      isSelfOccupied,
      rawIncomeDefault,
      rawIncomeOptional,
      coOwnershipShare,
      yourShareRawDefault: rawIncomeDefault * effectiveShare,
      yourShareRawOptional: rawIncomeOptional * effectiveShare,
    };
  });

  // ── Aggregate SO interest cap ─────────────────────────────────────────────
  const active = propertyResults.filter((r) => !r.excluded);

  // Sum user's share of all SO interest (including Type D SO portion)
  const totalSoInterestFull = active.reduce((sum, r) => {
    const share = r.isDeemedOwnershipActive ? 1 : r.coOwnershipShare;
    return sum + r.soInterestComponent * share;
  }, 0);

  const soInterestAllowedOptional = Math.min(
    totalSoInterestFull,
    hp.selfOccupiedInterestCapOptional
  );
  const soInterestAllowedDefault = hp.selfOccupiedInterestCapDefault; // 0
  const soExcessOptional = Math.max(0, totalSoInterestFull - soInterestAllowedOptional);

  const totalYourShareDefault = active.reduce((s, r) => s + r.yourShareRawDefault, 0);
  const totalYourShareOptional = active.reduce((s, r) => s + r.yourShareRawOptional, 0);

  const totalIncomeDefault = totalYourShareDefault;
  const totalIncomeOptional = totalYourShareOptional + soExcessOptional;

  // ── Arrears / recovered unrealised rent (Section 23) ─────────────────────
  const arrearsItems = arrears.map((a) => {
    const deduction = Math.floor(a.amountReceived * hp.arrearsDeductionRate);
    return {
      id: a.id,
      propertyReference: a.propertyReference,
      stillOwner: a.stillOwner,
      amountReceived: a.amountReceived,
      deduction,
      taxableAmount: a.amountReceived - deduction,
    };
  });
  const arrearsGross = arrearsItems.reduce((s, a) => s + a.amountReceived, 0);
  const arrearsDeduction = arrearsItems.reduce((s, a) => s + a.deduction, 0);
  const arrearsNet = arrearsItems.reduce((s, a) => s + a.taxableAmount, 0);

  // ── Loss set-off (regime-dependent) ──────────────────────────────────────
  const lossSetOffDefault = 0; // default regime: no set-off against other income
  const lossSetOffOptional =
    totalIncomeOptional < 0
      ? Math.min(Math.abs(totalIncomeOptional), hp.lossSetOffCapOptional)
      : 0;
  const lossCarryForwardDefault =
    totalIncomeDefault < 0 ? Math.abs(totalIncomeDefault) : 0;
  const lossCarryForwardOptional =
    totalIncomeOptional < 0
      ? Math.max(0, Math.abs(totalIncomeOptional) - lossSetOffOptional)
      : 0;

  // Arrears are non-offsettable — added after set-off computation
  const hpContributionDefault =
    totalIncomeDefault >= 0 ? totalIncomeDefault + arrearsNet : arrearsNet;
  const hpContributionOptional =
    totalIncomeOptional >= 0
      ? totalIncomeOptional + arrearsNet
      : -lossSetOffOptional + arrearsNet;

  return {
    propertyResults,
    selfOccupiedCount: soCount,
    totalSoInterestFull,
    soInterestAllowedOptional,
    soInterestAllowedDefault,
    totalYourShareDefault,
    totalYourShareOptional,
    totalIncomeDefault,
    totalIncomeOptional,
    arrearsItems,
    arrearsGross,
    arrearsDeduction,
    arrearsNet,
    lossSetOffDefault,
    lossSetOffOptional,
    lossCarryForwardDefault,
    lossCarryForwardOptional,
    hpContributionDefault,
    hpContributionOptional,
  };
}
