// ---------------------------------------------------------------------------
// Indirect Commission Dashboard — data layer.
//
// Everything the dashboard shows comes from getIndirectData(filters). Today it
// derives numbers from a deterministic mock model so the Period / Partner /
// Commission-Plan filters are all live. To go to production, replace the body of
// getIndirectData() with a call to the Indirect Channel feed — the return shape
// is the contract the UI depends on.
// ---------------------------------------------------------------------------

export const PARTNERS = [
  "All Partners",
  "Al Tijaria Telecom",
  "Muscat Connect LLC",
  "Gulf Dealers Group",
  "Nizwa Mobile Traders",
  "Salalah Comms Partners",
] as const;

export const COMMISSION_PLANS = [
  "Hunting - Base",
  "Port-in - Base",
  "Upgrade - Base",
  "Hunting - Other Segment",
  "Port-in - Other Segment",
  "Upgrade - Other Segment",
  "Booster Campaign",
  "Booster Campaign BAQATI Gold - 12 Months",
  "Farming",
  "Farming VOC",
] as const;

export interface IndirectFilters {
  granularity: "Month" | "Quarter" | "Year";
  partner: string;
  quarter: string; // Q1..Q4
  year: string; // "2024".."2026"
}

// ---- deterministic model knobs --------------------------------------------

// Share of channel volume per partner (sums to 1). Also carries a performance
// bias so partners visibly over / under-achieve their targets.
const PARTNER_MODEL: Record<string, { share: number; bias: number }> = {
  "Al Tijaria Telecom": { share: 0.28, bias: 1.06 },
  "Muscat Connect LLC": { share: 0.22, bias: 0.98 },
  "Gulf Dealers Group": { share: 0.19, bias: 1.03 },
  "Nizwa Mobile Traders": { share: 0.16, bias: 0.9 },
  "Salalah Comms Partners": { share: 0.15, bias: 0.95 },
};

const QUARTER_VAR: Record<string, number> = { Q1: 0.92, Q2: 0.97, Q3: 1.06, Q4: 1.05 };
const GRANULARITY_FACTOR: Record<IndirectFilters["granularity"], number> = {
  Month: 0.34,
  Quarter: 1,
  Year: 3.92,
};

const yearVar = (year: string) => 1 + (Number(year) - 2026) * 0.08;

function factors(f: IndirectFilters) {
  const partner = PARTNER_MODEL[f.partner];
  const volume =
    GRANULARITY_FACTOR[f.granularity] *
    (QUARTER_VAR[f.quarter] ?? 1) *
    yearVar(f.year) *
    (partner ? partner.share : 1);
  const perf = (partner ? partner.bias : 1) * (QUARTER_VAR[f.quarter] ?? 1) ** 0.4;
  return { volume, perf, partnerName: f.partner };
}

const r = (n: number) => Math.round(n);
const clampPct = (n: number) => Math.max(0, Math.min(180, Math.round(n)));

// ---- base figures (Quarter · All Partners · Q3 2026) ----------------------

const BASE = {
  revenueActual: 2_611_000,
  revenueTarget: 2_850_000,
  inactiveCRs: 342,
  crBase: 4180,
  activationByType: [
    { type: "Hunting", actual: 1840, target: 2000 },
    { type: "Farming", actual: 960, target: 850 },
    { type: "Port-in", actual: 1210, target: 1400 },
    { type: "Upgrades", actual: 2350, target: 2200 },
  ],
  activationTypeBreakdown: [
    { channel: "Hunting", segment: "Base", count: 1120, revenue: 512_000 },
    { channel: "Port-in", segment: "Base", count: 780, revenue: 341_000 },
    { channel: "Upgrade", segment: "Base", count: 1540, revenue: 402_000 },
    { channel: "Hunting", segment: "Other Segment", count: 720, revenue: 388_000 },
    { channel: "Port-in", segment: "Other Segment", count: 430, revenue: 205_000 },
    { channel: "Upgrade", segment: "Other Segment", count: 810, revenue: 233_000 },
  ],
  netActivationsTrend: [
    { period: "Apr", activations: 1980, terminations: 410 },
    { period: "May", activations: 2140, terminations: 380 },
    { period: "Jun", activations: 2260, terminations: 520 },
    { period: "Jul", activations: 2410, terminations: 470 },
    { period: "Aug", activations: 2530, terminations: 610 },
  ],
  terminationsByType: [
    { type: "Hunting", count: 780, within2ndBill: 92 },
    { type: "Farming", count: 340, within2ndBill: 8 },
    { type: "Port-in", count: 620, within2ndBill: 71 },
    { type: "Upgrades", count: 650, within2ndBill: 44 },
  ],
  revenueContribution: [
    { name: "Hunting", value: 900_000, color: "#3b82f6" },
    { name: "Farming", value: 430_000, color: "#8b5cf6" },
    { name: "Port-in", value: 546_000, color: "#10b981" },
    { name: "Upgrades", value: 635_000, color: "#f59e0b" },
  ],
};

// Hunting activations awaiting / cleared for the 2nd bill.
const HUNTING_VALIDATION = [
  { cr: "C-20455", customer: "Bahwan Trading Co", partner: "Al Tijaria Telecom", activatedOn: "2026-06-14", secondBill: true },
  { cr: "C-20461", customer: "Oman Flour Mills", partner: "Muscat Connect LLC", activatedOn: "2026-07-02", secondBill: true },
  { cr: "C-20470", customer: "Al Madina Logistics", partner: "Gulf Dealers Group", activatedOn: "2026-07-19", secondBill: false },
  { cr: "C-20488", customer: "Renaissance Services", partner: "Nizwa Mobile Traders", activatedOn: "2026-08-05", secondBill: false },
  { cr: "C-20491", customer: "Sohar Aluminium", partner: "Al Tijaria Telecom", activatedOn: "2026-08-22", secondBill: true },
  { cr: "C-20502", customer: "Muscat Pharmacy", partner: "Salalah Comms Partners", activatedOn: "2026-08-28", secondBill: false },
  { cr: "C-20514", customer: "Al Hassan Engineering", partner: "Gulf Dealers Group", activatedOn: "2026-09-01", secondBill: false },
];

// Per-CR performance (the "Performance by CR" table).
const CR_PERFORMANCE = [
  { cr: "C-31001", name: "Bahwan Trading Co", partner: "Al Tijaria Telecom", revenueActual: 268_000, revenueTarget: 250_000, hunting: 90, farming: 40, portIn: 55, upgrades: 120 },
  { cr: "C-31002", name: "Oman Flour Mills", partner: "Muscat Connect LLC", revenueActual: 176_000, revenueTarget: 200_000, hunting: 40, farming: 60, portIn: 30, upgrades: 80 },
  { cr: "C-31003", name: "Sohar Aluminium", partner: "Al Tijaria Telecom", revenueActual: 322_000, revenueTarget: 300_000, hunting: 110, farming: 25, portIn: 70, upgrades: 140 },
  { cr: "C-31004", name: "Renaissance Services", partner: "Nizwa Mobile Traders", revenueActual: 138_000, revenueTarget: 180_000, hunting: 30, farming: 20, portIn: 25, upgrades: 60 },
  { cr: "C-31005", name: "Al Madina Logistics", partner: "Gulf Dealers Group", revenueActual: 205_000, revenueTarget: 190_000, hunting: 65, farming: 35, portIn: 45, upgrades: 95 },
  { cr: "C-31006", name: "Muscat Pharmacy", partner: "Salalah Comms Partners", revenueActual: 121_000, revenueTarget: 150_000, hunting: 28, farming: 22, portIn: 18, upgrades: 44 },
  { cr: "C-31007", name: "Al Hassan Engineering", partner: "Gulf Dealers Group", revenueActual: 189_000, revenueTarget: 175_000, hunting: 58, farming: 30, portIn: 40, upgrades: 88 },
  { cr: "C-31008", name: "National Gas Co", partner: "Muscat Connect LLC", revenueActual: 214_000, revenueTarget: 230_000, hunting: 48, farming: 52, portIn: 34, upgrades: 76 },
  { cr: "C-31009", name: "Towell Auto", partner: "Al Tijaria Telecom", revenueActual: 243_000, revenueTarget: 220_000, hunting: 82, farming: 28, portIn: 60, upgrades: 110 },
  { cr: "C-31010", name: "Oman Cables", partner: "Nizwa Mobile Traders", revenueActual: 152_000, revenueTarget: 195_000, hunting: 34, farming: 18, portIn: 28, upgrades: 58 },
];

// Commission plans — base figures + explicit 2nd-bill and termination fields.
export interface PlanRow {
  plan: string;
  weight: number;
  achievement: number;
  eligibleAchievement: number;
  commissionPct: number;
  commissionPaid: number;
  activations: number;
  eligibleActivations: number;
  qualified: boolean;
  secondBillStatus: "Confirmed" | "Pending" | "Not required";
  terminated: number; // terminated activations attributed to this plan
  eligibilityImpact: "Reduced" | "None";
}

const BASE_PLANS: PlanRow[] = [
  { plan: "Hunting - Base", weight: 20, achievement: 92, eligibleAchievement: 84, commissionPct: 16.8, commissionPaid: 42_800, activations: 1120, eligibleActivations: 1030, qualified: true, secondBillStatus: "Confirmed", terminated: 24, eligibilityImpact: "Reduced" },
  { plan: "Port-in - Base", weight: 15, achievement: 86, eligibleAchievement: 80, commissionPct: 12.0, commissionPaid: 28_400, activations: 780, eligibleActivations: 712, qualified: true, secondBillStatus: "Not required", terminated: 12, eligibilityImpact: "Reduced" },
  { plan: "Upgrade - Base", weight: 15, achievement: 104, eligibleAchievement: 99, commissionPct: 14.9, commissionPaid: 31_900, activations: 1540, eligibleActivations: 1488, qualified: true, secondBillStatus: "Not required", terminated: 8, eligibilityImpact: "None" },
  { plan: "Hunting - Other Segment", weight: 12, achievement: 71, eligibleAchievement: 64, commissionPct: 7.7, commissionPaid: 15_200, activations: 720, eligibleActivations: 615, qualified: false, secondBillStatus: "Pending", terminated: 31, eligibilityImpact: "Reduced" },
  { plan: "Port-in - Other Segment", weight: 8, achievement: 78, eligibleAchievement: 70, commissionPct: 5.6, commissionPaid: 9_100, activations: 430, eligibleActivations: 372, qualified: false, secondBillStatus: "Not required", terminated: 15, eligibilityImpact: "Reduced" },
  { plan: "Upgrade - Other Segment", weight: 8, achievement: 90, eligibleAchievement: 85, commissionPct: 6.8, commissionPaid: 11_300, activations: 810, eligibleActivations: 761, qualified: true, secondBillStatus: "Not required", terminated: 9, eligibilityImpact: "None" },
  { plan: "Booster Campaign", weight: 8, achievement: 118, eligibleAchievement: 112, commissionPct: 9.0, commissionPaid: 18_700, activations: 640, eligibleActivations: 602, qualified: true, secondBillStatus: "Confirmed", terminated: 5, eligibilityImpact: "None" },
  { plan: "Booster Campaign BAQATI Gold - 12 Months", weight: 4, achievement: 96, eligibleAchievement: 88, commissionPct: 3.5, commissionPaid: 7_400, activations: 210, eligibleActivations: 188, qualified: true, secondBillStatus: "Confirmed", terminated: 3, eligibilityImpact: "None" },
  { plan: "Farming", weight: 6, achievement: 82, eligibleAchievement: 79, commissionPct: 4.7, commissionPaid: 10_600, activations: 540, eligibleActivations: 511, qualified: true, secondBillStatus: "Not required", terminated: 6, eligibilityImpact: "None" },
  { plan: "Farming VOC", weight: 4, achievement: 68, eligibleAchievement: 61, commissionPct: 2.4, commissionPaid: 4_200, activations: 190, eligibleActivations: 148, qualified: false, secondBillStatus: "Pending", terminated: 11, eligibilityImpact: "Reduced" },
];

// ---- the one entry point -------------------------------------------------

export function getIndirectData(f: IndirectFilters) {
  const { volume, perf, partnerName } = factors(f);
  const scaleV = (n: number) => r(n * volume); // volume / money
  const scaleP = (n: number) => clampPct(n * perf); // achievement %
  const isPartner = partnerName !== "All Partners";

  const revenueActual = scaleV(BASE.revenueActual);
  const revenueTarget = scaleV(BASE.revenueTarget * (isPartner ? 0.98 : 1));

  const activationByType = BASE.activationByType.map((a) => ({
    type: a.type,
    actual: scaleV(a.actual),
    target: scaleV(a.target),
  }));

  const activationTypeBreakdown = BASE.activationTypeBreakdown.map((a) => ({
    ...a,
    count: scaleV(a.count),
    revenue: scaleV(a.revenue),
  }));

  const netActivationsTrend = BASE.netActivationsTrend.map((m) => ({
    period: m.period,
    activations: scaleV(m.activations),
    terminations: scaleV(m.terminations),
  }));

  const terminationsByType = BASE.terminationsByType.map((t) => ({
    ...t,
    count: scaleV(t.count),
    within2ndBill: scaleV(t.within2ndBill),
  }));

  const revenueContribution = BASE.revenueContribution.map((c) => ({
    ...c,
    value: scaleV(c.value),
  }));

  const huntingValidation = HUNTING_VALIDATION.filter(
    (h) => !isPartner || h.partner === partnerName,
  );

  const crPerformance = CR_PERFORMANCE.filter(
    (c) => !isPartner || c.partner === partnerName,
  ).map((c) => {
    const revenueActualS = scaleV(c.revenueActual);
    const revenueTargetS = scaleV(c.revenueTarget);
    return {
      ...c,
      revenueActual: revenueActualS,
      revenueTarget: revenueTargetS,
      achievement: clampPct((revenueActualS / revenueTargetS) * 100),
      hunting: scaleV(c.hunting),
      farming: scaleV(c.farming),
      portIn: scaleV(c.portIn),
      upgrades: scaleV(c.upgrades),
      activations: scaleV(c.hunting + c.farming + c.portIn + c.upgrades),
    };
  });

  const planRows: PlanRow[] = BASE_PLANS.map((p) => {
    const achievement = scaleP(p.achievement);
    const eligibleAchievement = Math.min(achievement, scaleP(p.eligibleAchievement));
    return {
      ...p,
      achievement,
      eligibleAchievement,
      commissionPaid: scaleV(p.commissionPaid),
      activations: scaleV(p.activations),
      eligibleActivations: scaleV(p.eligibleActivations),
      terminated: scaleV(p.terminated),
      qualified: eligibleAchievement >= 80 && p.secondBillStatus !== "Pending",
    };
  });

  const inactiveCRs = isPartner ? r(BASE.inactiveCRs * volume * 1.2) : BASE.inactiveCRs;
  const crBase = isPartner ? r(BASE.crBase * (PARTNER_MODEL[partnerName]?.share ?? 1)) : BASE.crBase;

  const payoutAmount = planRows.reduce((s, p) => s + p.commissionPaid, 0);
  const totalActivations = netActivationsTrend.reduce((s, m) => s + m.activations, 0);
  const totalTerminations = netActivationsTrend.reduce((s, m) => s + m.terminations, 0);
  const validationDone = scaleV(428);
  const validationTotal = scaleV(640);

  const commissionCycle = {
    period: `${f.granularity === "Year" ? "" : f.quarter + " "}${f.year}`.trim(),
    payoutAmount,
    stages: [
      { label: "Data Cut-off", date: "2026-08-31", status: "done" as const, note: "Activation & billing data frozen" },
      { label: "Calculation", date: "2026-09-01", status: "done" as const, note: "Achievement & commission computed for all 10 plans" },
      {
        label: "Validation (2nd Bill)",
        date: "2026-09-08",
        status: "current" as const,
        note: "Confirming hunting activations against 2nd bill / payment",
        progress: { done: validationDone, total: validationTotal, unit: "activations checked" },
      },
      { label: "Approval", date: "2026-09-12", status: "upcoming" as const, note: "Finance sign-off on payout schedule" },
      { label: "Payout", date: "2026-09-18", status: "upcoming" as const, note: "Commission released to partner accounts" },
    ],
  };

  return {
    revenueActual,
    revenueTarget,
    revenueAchievement: clampPct((revenueActual / revenueTarget) * 100),
    inactiveCRs,
    crBase,
    activationByType,
    activationTypeBreakdown,
    netActivationsTrend,
    terminationsByType,
    revenueContribution,
    huntingValidation,
    crPerformance,
    planRows,
    commissionCycle,
    totalActivations,
    totalTerminations,
    netActivations: totalActivations - totalTerminations,
  };
}

export type IndirectData = ReturnType<typeof getIndirectData>;
