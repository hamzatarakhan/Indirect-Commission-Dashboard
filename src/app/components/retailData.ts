// ---------------------------------------------------------------------------
// Retail Outlet Performance & Commission Dashboard — data layer.
//
// Everything the dashboard shows comes from getRetailData(filters). Today it
// derives numbers from a deterministic mock model so the Period / Region /
// Outlet / Plan / Staff-Type filters are all live. To go to production, replace
// the body of getRetailData() with a call to the Retail feed — the return shape
// is the contract the UI depends on.
// ---------------------------------------------------------------------------

export const REGIONS = [
  "All Regions",
  "Muscat",
  "Dhofar",
  "North Batinah",
  "South Batinah",
  "Ad Dakhiliyah",
  "Ash Sharqiyah",
] as const;

export const RETAIL_PLANS = [
  "Retail Mobile Activations",
  "Retail A'amali",
  "Retail Upgrade",
  "Retail Fixed Activations",
] as const;

export const STAFF_TYPES = ["All Staff", "Managed", "Unmanaged"] as const;

export type AccountType = "Managed" | "Unmanaged";

export interface RetailFilters {
  granularity: "Month" | "Quarter" | "Year";
  region: string;
  outlet: string; // "All Outlets" | outlet name
  plan: string; // "All Plans" | plan name
  staffType: string; // "All Staff" | "Managed" | "Unmanaged"
  quarter: string; // Q1..Q4
  year: string;
}

// ---- deterministic model -------------------------------------------------

// Outlet book — base activations at Quarter · Q3 2026.
const OUTLETS_BASE: {
  outlet: string;
  region: string;
  account: AccountType;
  staff: number;
  base: number;
  bias: number; // performance bias
}[] = [
  { outlet: "Muscat Grand Mall", region: "Muscat", account: "Managed", staff: 9, base: 1180, bias: 1.08 },
  { outlet: "Qurum City Centre", region: "Muscat", account: "Managed", staff: 8, base: 1020, bias: 1.04 },
  { outlet: "Al Mouj Marina", region: "Muscat", account: "Unmanaged", staff: 5, base: 540, bias: 0.92 },
  { outlet: "Ruwi High Street", region: "Muscat", account: "Unmanaged", staff: 6, base: 690, bias: 0.97 },
  { outlet: "Seeb Souq", region: "Muscat", account: "Managed", staff: 7, base: 820, bias: 1.01 },
  { outlet: "Salalah Gardens Mall", region: "Dhofar", account: "Managed", staff: 8, base: 940, bias: 1.05 },
  { outlet: "Salalah Central", region: "Dhofar", account: "Unmanaged", staff: 5, base: 470, bias: 0.9 },
  { outlet: "Sohar City Centre", region: "North Batinah", account: "Managed", staff: 7, base: 880, bias: 1.03 },
  { outlet: "Sohar Corniche", region: "North Batinah", account: "Unmanaged", staff: 4, base: 380, bias: 0.88 },
  { outlet: "Barka Outlet", region: "South Batinah", account: "Unmanaged", staff: 4, base: 410, bias: 0.94 },
  { outlet: "Rustaq Plaza", region: "South Batinah", account: "Managed", staff: 6, base: 620, bias: 0.99 },
  { outlet: "Nizwa Grand Mall", region: "Ad Dakhiliyah", account: "Managed", staff: 6, base: 700, bias: 1.0 },
  { outlet: "Bahla Outlet", region: "Ad Dakhiliyah", account: "Unmanaged", staff: 3, base: 250, bias: 0.85 },
  { outlet: "Sur Waterfront", region: "Ash Sharqiyah", account: "Unmanaged", staff: 4, base: 360, bias: 0.91 },
  { outlet: "Ibra Central", region: "Ash Sharqiyah", account: "Managed", staff: 5, base: 520, bias: 0.96 },
];

// Plan mix — share of an outlet's activations that land on each plan (sums ~1).
const PLAN_MIX: Record<string, number> = {
  "Retail Mobile Activations": 0.46,
  "Retail A'amali": 0.19,
  "Retail Upgrade": 0.24,
  "Retail Fixed Activations": 0.11,
};

// Commission rate & eligibility per plan.
const PLAN_MODEL: Record<
  string,
  { commissionPct: number; ratePerActivation: number; eligibleRate: number }
> = {
  "Retail Mobile Activations": { commissionPct: 14.5, ratePerActivation: 6.2, eligibleRate: 0.93 },
  "Retail A'amali": { commissionPct: 9.0, ratePerActivation: 4.0, eligibleRate: 0.88 },
  "Retail Upgrade": { commissionPct: 11.8, ratePerActivation: 5.1, eligibleRate: 0.95 },
  "Retail Fixed Activations": { commissionPct: 17.0, ratePerActivation: 9.4, eligibleRate: 0.9 },
};

const QUARTER_VAR: Record<string, number> = { Q1: 0.9, Q2: 0.98, Q3: 1.07, Q4: 1.04 };
const GRAN: Record<RetailFilters["granularity"], number> = { Month: 0.34, Quarter: 1, Year: 3.9 };
const yearVar = (y: string) => 1 + (Number(y) - 2026) * 0.07;
const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug"];

const r = (n: number) => Math.round(n);
const clampPct = (n: number) => Math.max(0, Math.min(180, Math.round(n)));
const fmtOMR0 = (n: number) => Math.round(n);

// Deterministic staff roster for an outlet (used by the drill-through).
function staffRoster(o: (typeof OUTLETS_BASE)[number], scale: number) {
  const first = ["Ahmed", "Fatma", "Salim", "Mariam", "Yousef", "Aisha", "Khalid", "Noor", "Hamed", "Layla"];
  const last = ["Al Balushi", "Al Hinai", "Al Rawahi", "Al Amri", "Al Maskari", "Al Zadjali", "Al Harthy"];
  const seed = o.outlet.length + o.region.length;
  return Array.from({ length: o.staff }, (_, i) => {
    const name = `${first[(seed + i * 3) % first.length]} ${last[(seed + i * 2) % last.length]}`;
    const share = 0.6 + (((seed + i * 7) % 9) / 10); // 0.6..1.5 spread
    const acts = r(((o.base * scale) / o.staff) * share * o.bias);
    return {
      staff: name,
      staffType: (i % 3 === 0 ? "Unmanaged" : "Managed") as AccountType,
      activations: acts,
    };
  });
}

// ---- the one entry point ------------------------------------------------

export function getRetailData(f: RetailFilters) {
  const scale = GRAN[f.granularity] * (QUARTER_VAR[f.quarter] ?? 1) * yearVar(f.year);
  const isRegion = f.region !== "All Regions";
  const isOutlet = f.outlet !== "All Outlets";
  const isPlan = f.plan !== "All Plans";
  const isStaffType = f.staffType !== "All Staff";

  // outlets in scope
  const outlets = OUTLETS_BASE.filter(
    (o) => (!isRegion || o.region === f.region) && (!isOutlet || o.outlet === f.outlet),
  );

  // staff-type factor: Managed outlets carry ~70% of volume.
  const staffFactor =
    f.staffType === "Managed" ? 0.72 : f.staffType === "Unmanaged" ? 0.28 : 1;
  // plan factor
  const planFactor = isPlan ? PLAN_MIX[f.plan] ?? 1 : 1;

  const outletActs = outlets.map((o) => {
    const activations = r(o.base * scale * o.bias * staffFactor * planFactor);
    const staff = isStaffType
      ? Math.max(1, Math.round(o.staff * (f.staffType === "Managed" ? 0.66 : 0.34)))
      : o.staff;
    return { ...o, activations, staffScoped: staff };
  });

  const totalActivations = outletActs.reduce((s, o) => s + o.activations, 0);
  const staffCount = outletActs.reduce((s, o) => s + o.staffScoped, 0);
  const activeOutlets = outletActs.length;
  const avgPerOutlet = activeOutlets ? r(totalActivations / activeOutlets) : 0;

  // 6-month spark trend for a given total (deterministic, gentle upward drift).
  const spark = (base: number, seed = 0) =>
    MONTHS.map((_, i) => r((base / MONTHS.length) * (0.78 + i * 0.1) * (1 + Math.sin(i + seed) * 0.05)));

  // ---- outlet ranking ----
  const outletRanking = [...outletActs]
    .sort((a, b) => b.activations - a.activations)
    .map((o, i) => ({
      rank: i + 1,
      outlet: o.outlet,
      region: o.region,
      account: o.account,
      staff: o.staffScoped,
      activations: o.activations,
      share: totalActivations ? (o.activations / totalActivations) * 100 : 0,
      trend: spark(o.activations, o.outlet.length),
    }));

  // ---- activations by plan (counts + product mix) ----
  const activationsByPlan = RETAIL_PLANS.map((plan) => ({
    plan,
    activations: isPlan
      ? plan === f.plan
        ? totalActivations
        : 0
      : r(totalActivations * (PLAN_MIX[plan] ?? 0)),
  }))
    .filter((p) => !isPlan || p.plan === f.plan)
    .map((p) => ({ ...p, share: totalActivations ? (p.activations / totalActivations) * 100 : 0 }));

  // ---- activation performance by plan (volume table) ----
  const PLAN_MOM: Record<string, number> = {
    "Retail Mobile Activations": 7.4,
    "Retail A'amali": 3.1,
    "Retail Upgrade": 5.8,
    "Retail Fixed Activations": -2.2,
  };
  const activationPerfByPlan = RETAIL_PLANS.filter((p) => !isPlan || p === f.plan).map((plan) => {
    const acts = isPlan && plan === f.plan ? totalActivations : r(totalActivations * (PLAN_MIX[plan] ?? 0));
    return {
      plan,
      activations: acts,
      eligible: r(acts * PLAN_MODEL[plan].eligibleRate),
      share: totalActivations ? (acts / totalActivations) * 100 : 0,
      momPct: PLAN_MOM[plan] ?? 0,
      trend: spark(acts, plan.length),
    };
  });

  // ---- region performance ----
  const byRegion = new Map<string, { activations: number; outlets: number }>();
  for (const o of outletActs) {
    const cur = byRegion.get(o.region) ?? { activations: 0, outlets: 0 };
    cur.activations += o.activations;
    cur.outlets += 1;
    byRegion.set(o.region, cur);
  }
  const regionPerformance = [...byRegion.entries()]
    .map(([region, v]) => ({
      region,
      outlets: v.outlets,
      activations: v.activations,
      share: totalActivations ? (v.activations / totalActivations) * 100 : 0,
      trend: spark(v.activations, region.length),
    }))
    .sort((a, b) => b.activations - a.activations);

  // ---- monthly trend ----
  const monthlyTrend = MONTHS.map((period, i) => ({
    period,
    activations: r(
      (totalActivations / MONTHS.length) * (0.82 + i * 0.09) * (1 + Math.sin(i) * 0.04),
    ),
  }));

  // ---- target vs achievement (targets not yet provided) ----
  const targetView = {
    hasTargets: false as const,
    note: "Retail Outlets do not have activation targets yet. This view activates automatically once targets are provided.",
    rows: outletRanking.map((o) => ({
      scope: o.outlet,
      region: o.region,
      target: null as number | null,
      actual: o.activations,
      achievementPct: null as number | null,
      gap: null as number | null,
      rank: o.rank,
      trend: o.trend,
    })),
  };

  // ---- commission by plan ----
  const commissionByPlanRaw = RETAIL_PLANS.filter((p) => !isPlan || p === f.plan).map((plan) => {
    const acts = isPlan && plan === f.plan
      ? totalActivations
      : r(totalActivations * (PLAN_MIX[plan] ?? 0));
    const m = PLAN_MODEL[plan];
    const eligible = r(acts * m.eligibleRate);
    const achievementPct = clampPct(88 + (m.commissionPct - 12) * 1.5 + (QUARTER_VAR[f.quarter] ?? 1) * 6);
    const totalPaid = fmtOMR0(eligible * m.ratePerActivation);
    const planStaff = Math.max(1, r(staffCount * (PLAN_MIX[plan] ?? 0) + staffCount * 0.15));
    return {
      plan,
      activations: acts,
      eligibleActivations: eligible,
      achievementPct,
      commissionPct: m.commissionPct,
      totalPaid,
      staffCount: planStaff,
      avgPerStaff: planStaff ? fmtOMR0(totalPaid / planStaff) : 0,
      contributionPct: 0,
    };
  });
  const paidTotal = commissionByPlanRaw.reduce((s, p) => s + p.totalPaid, 0);
  const commissionByPlan = commissionByPlanRaw.map((p) => ({
    ...p,
    contributionPct: paidTotal ? (p.totalPaid / paidTotal) * 100 : 0,
  }));
  const blendedCommPct = totalActivations
    ? commissionByPlan.reduce((s, p) => s + p.commissionPct * (p.activations / totalActivations), 0)
    : 13;
  const blendedRate = 5.9;

  // ---- commission by OUTLET (outlet-level visibility + Outlet Contribution %) ----
  const commissionByOutletRaw = outletActs.map((o) => {
    const eligible = r(o.activations * 0.92);
    const totalPaid = fmtOMR0(eligible * blendedRate * o.bias);
    const achievementPct = clampPct(90 + (o.bias - 1) * 45 + ((QUARTER_VAR[f.quarter] ?? 1) - 1) * 30);
    return {
      outlet: o.outlet,
      region: o.region,
      account: o.account,
      activations: o.activations,
      eligibleActivations: eligible,
      achievementPct,
      commissionPct: Math.round(blendedCommPct * 10) / 10,
      totalPaid,
      staffCount: o.staffScoped,
      avgPerStaff: o.staffScoped ? fmtOMR0(totalPaid / o.staffScoped) : 0,
      contributionPct: 0,
    };
  });
  const outletPaidTotal = commissionByOutletRaw.reduce((s, o) => s + o.totalPaid, 0);
  const commissionByOutlet = commissionByOutletRaw
    .map((o) => ({ ...o, contributionPct: outletPaidTotal ? (o.totalPaid / outletPaidTotal) * 100 : 0 }))
    .sort((a, b) => b.totalPaid - a.totalPaid);

  // ---- achievement vs payout analysis ----
  const achievementVsPayout = commissionByPlan.map((p) => ({
    plan: p.plan,
    activationsAchieved: p.activations,
    eligibleActivations: p.eligibleActivations,
    commissionEarned: fmtOMR0(p.totalPaid * 1.06), // earned before clawback / holds
    commissionPaid: p.totalPaid,
  }));

  // ---- commission cycle status ----
  const commissionCycle = {
    period: `${f.granularity === "Year" ? "" : f.quarter + " "}${f.year}`.trim(),
    payoutAmount: paidTotal,
    stages: [
      { label: "Activation Cut-off", date: "2026-08-31", status: "done" as const },
      { label: "Eligibility Check", date: "2026-09-02", status: "done" as const },
      { label: "Commission Calc", date: "2026-09-05", status: "current" as const, progress: { done: r(paidTotal * 0.55), total: paidTotal, unit: "OMR computed" } },
      { label: "Outlet Approval", date: "2026-09-10", status: "upcoming" as const },
      { label: "Payout", date: "2026-09-16", status: "upcoming" as const },
    ],
  };

  // ---- drill-through: outlets in a region (Region → Outlet) ----
  const regionOutlets = (regionName: string) =>
    commissionByOutlet
      .filter((o) => o.region === regionName)
      .map((o) => ({
        outlet: o.outlet,
        account: o.account,
        activations: o.activations,
        totalPaid: o.totalPaid,
        staff: o.staffCount,
      }))
      .sort((a, b) => b.activations - a.activations);

  // ---- drill-through: staff per outlet ----
  const staffByOutlet = (outletName: string) => {
    const o = OUTLETS_BASE.find((x) => x.outlet === outletName);
    if (!o) return [];
    return staffRoster(o, scale * o.bias * planFactor)
      .filter((s) => !isStaffType || s.staffType === f.staffType)
      .sort((a, b) => b.activations - a.activations);
  };

  // ---- drill-through: activation details for a staff member ----
  const activationsForStaff = (outletName: string, staffName: string) => {
    const roster = staffByOutlet(outletName);
    const s = roster.find((x) => x.staff === staffName);
    const n = Math.min(12, s ? Math.max(3, Math.round(s.activations / 40)) : 6);
    return Array.from({ length: n }, (_, i) => {
      const plan = RETAIL_PLANS[(outletName.length + i) % RETAIL_PLANS.length];
      const day = 2 + i * 2;
      return {
        ref: `RA-${(outletName.length * 137 + i * 31) % 90000 + 10000}`,
        plan,
        account: (i % 2 === 0 ? "Managed" : "Unmanaged") as AccountType,
        date: `2026-08-${String(day).padStart(2, "0")}`,
        eligible: i % 5 !== 0,
      };
    });
  };

  return {
    filters: f,
    totalActivations,
    activeOutlets,
    staffCount,
    avgPerOutlet,
    outletRanking,
    activationsByPlan,
    activationPerfByPlan,
    regionPerformance,
    monthlyTrend,
    targetView,
    months: MONTHS,
    commissionByPlan,
    commissionByOutlet,
    achievementVsPayout,
    commissionCycle,
    paidTotal,
    eligibleTotal: commissionByPlan.reduce((s, p) => s + p.eligibleActivations, 0),
    // drill-through helpers
    regionOutlets,
    staffByOutlet,
    activationsForStaff,
    // lists for filters
    outletsInRegion: OUTLETS_BASE.filter((o) => f.region === "All Regions" || o.region === f.region).map((o) => o.outlet),
  };
}

export type RetailData = ReturnType<typeof getRetailData>;
