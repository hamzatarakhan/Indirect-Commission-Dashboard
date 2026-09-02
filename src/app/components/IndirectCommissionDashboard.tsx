import React from "react";
import { motion } from "motion/react";
import {
  Target,
  Activity,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  Repeat,
  Wallet,
  Clock,
  Building2,
  Calendar,
  Search,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RevenueMatrix } from "./RevenueMatrix";
import { PARTNERS, COMMISSION_PLANS, getIndirectData } from "./indirectData";
import { useIsMobile } from "./ui/use-mobile";

// Formatting helpers (data itself lives in ./indirectData).

const fmtOMR = (n: number) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(2)}M OMR`
    : n >= 1_000
      ? `${(n / 1_000).toFixed(1)}K OMR`
      : `${n} OMR`;

const fmtNum = (n: number) => n.toLocaleString();

const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const fmtDay = (s: string) =>
  new Date(s).toLocaleDateString("en-US", { day: "numeric", month: "short" });

const daysUntil = (s: string) =>
  Math.round((new Date(s).getTime() - Date.now()) / 86_400_000);

const clampAch = (n: number) => Math.max(0, Math.min(180, Math.round(n)));


// Compact number for chart labels (no currency suffix): 1840 -> "1.8K", 900000 -> "0.9M"
const fmtShort = (n: number) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
      ? `${(n / 1_000).toFixed(1)}K`
      : `${n}`;

// ---------------------------------------------------------------------------

// Matches the widget container used across the Performance / Commission dashboards.
const cardShell =
  "bg-white dark:bg-[#07112F] rounded-xl border border-[#E2E8F0] dark:border-[#E2E8F0]/20";

function SectionCard({
  icon,
  title,
  children,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`${cardShell} p-4 sm:p-6`}
    >
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="shrink-0 rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">{icon}</div>
          <h2 className="text-[13px] font-medium text-gray-900 sm:text-[15px] dark:text-gray-100">
            {title}
          </h2>
        </div>
        {action && <div className="w-full shrink-0 lg:w-auto">{action}</div>}
      </div>
      {children}
    </motion.div>
  );
}

function StatTile({
  label,
  value,
  sub,
  tone = "neutral",
  progress,
  progressLabel,
}: {
  label: string;
  value: string;
  sub?: React.ReactNode;
  tone?: "neutral" | "good" | "bad";
  progress?: number;
  progressLabel?: string;
}) {
  const toneCls =
    tone === "good"
      ? "text-emerald-600 dark:text-emerald-400"
      : tone === "bad"
        ? "text-red-600 dark:text-red-400"
        : "text-gray-900 dark:text-gray-100";
  const barCls =
    tone === "good"
      ? "bg-emerald-500"
      : tone === "bad"
        ? "bg-amber-500"
        : "bg-blue-500";
  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-[#E2E8F0]/20 dark:bg-[#07112F]">
      <span className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-blue-400 dark:bg-blue-500" />
      <div className="flex-1 p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className={`text-2xl font-bold mt-1 ${toneCls}`}>{value}</p>
        {sub && <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{sub}</div>}
      </div>
      {typeof progress === "number" && (
        <div className="px-4 pt-2.5 pb-3 border-t border-gray-100 dark:border-white/[0.06]">
          <div className="flex items-center justify-between text-[10px] mb-1">
            <span className="text-gray-500 dark:text-gray-400">{progressLabel ?? "Progress"}</span>
            <span className="font-semibold text-gray-700 dark:text-gray-300">{progress.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-100 dark:bg-white/[0.06] overflow-hidden">
            <div
              className={`h-full rounded-full transition-[width] duration-700 ease-out ${barCls}`}
              style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Semicircle gauge — Actual vs Target achievement (KAM-dashboard style).
function GaugeTile({
  label,
  achievement,
  actual,
  target,
}: {
  label: string;
  achievement: number;
  actual: number;
  target: number;
}) {
  const LEN = Math.PI * 40;
  const p = Math.max(0, Math.min(100, achievement));
  const color =
    achievement >= 100 ? "#10b981" : achievement >= 90 ? "#f59e0b" : "#ef4444";
  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-[#E2E8F0]/20 dark:bg-[#07112F]">
      <span className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-blue-400 dark:bg-blue-500" />
      <div className="flex-1 p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <div className="mt-1 flex items-end gap-3">
          <svg viewBox="0 0 100 56" className="w-24 shrink-0">
            <path d="M 8 50 A 42 42 0 0 1 92 50" fill="none" strokeWidth="9" strokeLinecap="round" className="stroke-gray-100 dark:stroke-white/10" />
            <path
              d="M 8 50 A 42 42 0 0 1 92 50"
              fill="none"
              stroke={color}
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={LEN}
              strokeDashoffset={LEN * (1 - p / 100)}
              style={{ transition: "stroke-dashoffset .7s ease" }}
            />
          </svg>
          <div>
            <p className="text-2xl font-bold leading-none" style={{ color }}>
              {achievement}%
            </p>
            <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">achievement</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-100 px-4 pb-3 pt-2.5 text-[11px] dark:border-white/[0.06]">
        <span className="text-gray-500 dark:text-gray-400">
          Actual <b className="text-gray-900 dark:text-gray-100">{fmtOMR(actual)}</b>
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          Target <b className="text-gray-900 dark:text-gray-100">{fmtOMR(target)}</b>
        </span>
      </div>
    </div>
  );
}

// ---- Table primitives (match the app's data-table look) --------------------

function DataTable({ children, minWidth = 640 }: { children: React.ReactNode; minWidth?: number }) {
  return (
    <div className="scrollbar-thin overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700/60">
      <table className="w-full border-collapse" style={{ minWidth }}>
        {children}
      </table>
    </div>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function HeadRow({ children }: { children: React.ReactNode }) {
  return (
    <thead>
      <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700/60 dark:bg-white/[0.03]">
        {children}
      </tr>
    </thead>
  );
}

function Row({ children, i = 0 }: { children: React.ReactNode; i?: number }) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.3) }}
      className="transition-colors hover:bg-gray-50/70 dark:hover:bg-white/[0.03]"
    >
      {children}
    </motion.tr>
  );
}

function MiniBar({
  value,
  max = 100,
  tone = "blue",
}: {
  value: number;
  max?: number;
  tone?: "blue" | "green" | "amber" | "red";
}) {
  const pct = Math.max(2, Math.min(100, (value / max) * 100));
  const c =
    tone === "green"
      ? "bg-emerald-500"
      : tone === "amber"
        ? "bg-amber-500"
        : tone === "red"
          ? "bg-red-400"
          : "bg-blue-500";
  return (
    <div className="h-1.5 w-14 shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-white/[0.06]">
      <div className={`h-full rounded-full ${c}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function Pill({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "green" | "red" | "amber" | "blue" | "purple" | "gray";
}) {
  const map: Record<string, string> = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/25 dark:text-emerald-300 dark:border-emerald-800/60",
    red: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/25 dark:text-red-300 dark:border-red-800/60",
    amber: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/25 dark:text-amber-300 dark:border-amber-800/60",
    blue: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/25 dark:text-blue-300 dark:border-blue-800/60",
    purple: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/25 dark:text-purple-300 dark:border-purple-800/60",
    gray: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-white/[0.06] dark:text-gray-400 dark:border-white/10",
  };
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium ${map[tone]}`}>
      {children}
    </span>
  );
}

const td = "px-4 py-3 text-sm text-gray-700 dark:text-gray-300";
const tdR = `${td} text-right`;

function SearchInput({
  value,
  onChange,
  placeholder,
  width = "w-full sm:w-56",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  width?: string;
}) {
  return (
    <div className={`relative ${width}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-9 pr-8 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-gray-700/60 dark:bg-white/[0.04] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-500/60 dark:focus:bg-white/[0.06] dark:focus:ring-blue-900/30"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <XCircle className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function TableTools({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-wrap items-center gap-2 sm:gap-3 lg:w-auto lg:justify-end">
      {children}
    </div>
  );
}

function SegTabs<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="flex gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-white/[0.06]">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
            value === o.value
              ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

interface Props {
  period: string;
  quarter: string;
  year: string;
}

export function IndirectCommissionDashboard({ period, quarter, year }: Props) {
  const [granularity, setGranularity] = React.useState<"Month" | "Quarter" | "Year">("Quarter");
  const [partner, setPartner] = React.useState<string>(PARTNERS[0]);
  const [planFilter, setPlanFilter] = React.useState("All Plans");

  const isMobile = useIsMobile();

  // Performance Overview view + per-table search
  const [overviewView, setOverviewView] = React.useState<"charts" | "table">("charts");
  const [crSearch, setCrSearch] = React.useState("");
  const [atSearch, setAtSearch] = React.useState("");
  const [atSeg, setAtSeg] = React.useState<"all" | "Base" | "Other Segment">("all");
  const [hvSearch, setHvSearch] = React.useState("");
  const [hvStatus, setHvStatus] = React.useState<"all" | "eligible" | "hold">("all");
  const [planSearch, setPlanSearch] = React.useState("");

  // Everything the dashboard renders is derived here from the active filters.
  const D = React.useMemo(
    () => getIndirectData({ granularity, partner, quarter, year }),
    [granularity, partner, quarter, year],
  );

  const crRows = D.crPerformance.filter((c) => {
    const q = crSearch.trim().toLowerCase();
    return !q || c.cr.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
  });

  const atRows = D.activationTypeBreakdown.filter((r) => {
    const q = atSearch.trim().toLowerCase();
    const matchesQuery = !q || `${r.channel} ${r.segment}`.toLowerCase().includes(q);
    const matchesSeg = atSeg === "all" || r.segment === atSeg;
    return matchesQuery && matchesSeg;
  });

  const hvRows = D.huntingValidation.filter((h) => {
    const q = hvSearch.trim().toLowerCase();
    const matchesQuery =
      !q || h.cr.toLowerCase().includes(q) || h.customer.toLowerCase().includes(q);
    const matchesStatus =
      hvStatus === "all" || (hvStatus === "eligible" ? h.secondBill : !h.secondBill);
    return matchesQuery && matchesStatus;
  });

  const visibleRows = (
    planFilter === "All Plans" ? D.planRows : D.planRows.filter((r) => r.plan === planFilter)
  ).filter((r) => {
    const q = planSearch.trim().toLowerCase();
    return !q || r.plan.toLowerCase().includes(q);
  });

  const totalActual = D.activationByType.reduce((s, a) => s + a.actual, 0);
  const totalTarget = D.activationByType.reduce((s, a) => s + a.target, 0);
  const revenueActual = D.revenueActual;
  const revenueTarget = D.revenueTarget;

  const totalActivations = D.totalActivations;
  const totalTerminations = D.totalTerminations;
  const netActivations = D.netActivations;
  const inactiveCRs = D.inactiveCRs;
  const crBase = D.crBase;

  const revContribTotal = D.revenueContribution.reduce((s, r) => s + r.value, 0);
  const revContrib = D.revenueContribution.map((r) => ({
    ...r,
    pct: revContribTotal ? (r.value / revContribTotal) * 100 : 0,
  }));

  return (
    <div className="space-y-3">
      {/* Filters */}
      <div className={`${cardShell} p-4`}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-end sm:gap-4 lg:flex lg:flex-wrap">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 dark:text-gray-400">Period</label>
            <Select value={granularity} onValueChange={(v) => setGranularity(v as any)}>
              <SelectTrigger className="w-full lg:w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Month">Month</SelectItem>
                <SelectItem value="Quarter">Quarter</SelectItem>
                <SelectItem value="Year">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 dark:text-gray-400">Partner</label>
            <Select value={partner} onValueChange={setPartner}>
              <SelectTrigger className="w-full lg:w-[220px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PARTNERS.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
            <label className="text-xs text-gray-500 dark:text-gray-400">Commission Plan</label>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-full lg:w-[280px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Plans">All Plans</SelectItem>
                {COMMISSION_PLANS.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 sm:col-span-2 sm:self-center sm:text-right lg:ml-auto lg:col-span-1">
            {granularity === "Year"
              ? year
              : granularity === "Quarter"
                ? `${quarter} ${year}`
                : `${period} ${year}`}
          </div>
        </div>
      </div>

      <Tabs defaultValue="performance" className="space-y-3">
        <TabsList className="inline-flex h-auto gap-1 rounded-xl border border-slate-200 bg-slate-100/80 p-1 shadow-sm dark:border-gray-700/60 dark:bg-gray-800/50">
          {["performance", "commission"].map((v) => (
            <TabsTrigger
              key={v}
              value={v}
              className="rounded-lg border-0 px-6 py-1.5 text-[13px] font-medium capitalize text-[rgba(0,11,37,0.64)] transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-[#000b25] data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-slate-200 dark:text-gray-400 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100 dark:data-[state=active]:ring-gray-600/60 sm:px-10 sm:py-2"
            >
              {v}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ================= PERFORMANCE ================= */}
        <TabsContent value="performance" className="space-y-6">
          {/* Overview stat row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <GaugeTile
              label="Revenue — Actual vs Target"
              achievement={D.revenueAchievement}
              actual={revenueActual}
              target={revenueTarget}
            />
            <StatTile
              label="Activations — Actual vs Target"
              value={fmtNum(totalActual)}
              tone={totalActual >= totalTarget ? "good" : "bad"}
              sub={`Target ${fmtNum(totalTarget)}`}
              progress={(totalActual / totalTarget) * 100}
              progressLabel={`of target · ${fmtNum(totalTarget)}`}
            />
            <StatTile
              label="Net Activations"
              value={fmtNum(netActivations)}
              tone="good"
              sub={`${fmtNum(totalActivations)} activations − ${fmtNum(totalTerminations)} terminations`}
              progress={(netActivations / totalActivations) * 100}
              progressLabel="activation retention"
            />
            <StatTile
              label="Inactive CRs (2 yrs)"
              value={fmtNum(inactiveCRs)}
              tone="bad"
              sub="No activations recorded in last 24 months"
              progress={(inactiveCRs / crBase) * 100}
              progressLabel={`of ${fmtNum(crBase)} CRs`}
            />
          </div>

          {/* Performance Overview — Charts (gauges) / Table (by CR) */}
          {(() => {
            const viewToggle = (
              <SegTabs
                value={overviewView}
                onChange={setOverviewView}
                options={[
                  { value: "charts", label: "Charts" },
                  { value: "table", label: "Table" },
                ]}
              />
            );
            return overviewView === "charts" ? (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <RevenueMatrix
                  titleOverride="Performance Overview"
                  headerRight={viewToggle}
                  iconBoxed
                  userRole="General Manager"
                  period={period}
                  quarter={quarter}
                  year={year}
                  selectedSegments={["All"]}
                  selectedVerticals={["All Verticals"]}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`${cardShell} p-6`}
              >
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-[13px] font-medium text-gray-900 dark:text-gray-100 sm:text-[15px]">
                    Performance Overview
                  </h2>
                  <TableTools>
                    {viewToggle}
                    <SearchInput value={crSearch} onChange={setCrSearch} placeholder="Search CR or customer" />
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {crRows.length} of {D.crPerformance.length}
                    </span>
                  </TableTools>
                </div>
                {(() => {
              const tRevA = crRows.reduce((s, c) => s + c.revenueActual, 0);
              const tRevT = crRows.reduce((s, c) => s + c.revenueTarget, 0);
              const tAct = crRows.reduce((s, c) => s + c.activations, 0);
              return (
                <DataTable minWidth={880}>
                  <HeadRow>
                    <Th>CR</Th>
                    <Th>Customer</Th>
                    <Th>Partner</Th>
                    <Th align="right">Revenue</Th>
                    <Th align="right">Target</Th>
                    <Th align="right">Achievement</Th>
                    <Th align="right">Activations</Th>
                  </HeadRow>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                    {crRows.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-400 dark:text-gray-500">
                          No CRs match “{crSearch}”.
                        </td>
                      </tr>
                    )}
                    {crRows.map((c, i) => (
                      <Row key={c.cr} i={i}>
                        <td className={td}>
                          <span className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-600 dark:bg-white/[0.06] dark:text-gray-400">
                            {c.cr}
                          </span>
                        </td>
                        <td className={`${td} font-medium text-gray-900 dark:text-gray-100`}>{c.name}</td>
                        <td className={`${td} text-gray-500 dark:text-gray-400`}>{c.partner}</td>
                        <td className={`${tdR} font-semibold text-emerald-600 dark:text-emerald-400`}>{fmtOMR(c.revenueActual)}</td>
                        <td className={tdR}>{fmtOMR(c.revenueTarget)}</td>
                        <td className={tdR}>
                          <div className="flex items-center justify-end gap-2">
                            <span className={`font-semibold ${c.achievement >= 100 ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-gray-100"}`}>
                              {c.achievement}%
                            </span>
                            <MiniBar value={c.achievement} tone={c.achievement >= 100 ? "green" : c.achievement >= 90 ? "amber" : "red"} />
                          </div>
                        </td>
                        <td className={tdR}>
                          <span className="font-semibold text-gray-900 dark:text-gray-100">{fmtNum(c.activations)}</span>
                          <span className="ml-1 text-[10px] text-gray-400 dark:text-gray-500">
                            H{fmtNum(c.hunting)}·F{fmtNum(c.farming)}·P{fmtNum(c.portIn)}·U{fmtNum(c.upgrades)}
                          </span>
                        </td>
                      </Row>
                    ))}
                  </tbody>
                  {crRows.length > 0 && (
                    <tfoot className="border-t-2 border-gray-200 bg-gray-50/60 dark:border-gray-700/60 dark:bg-white/[0.03]">
                      <tr>
                        <td className={`${td} font-semibold text-gray-900 dark:text-gray-100`} colSpan={3}>
                          Total ({crRows.length} CRs)
                        </td>
                        <td className={`${tdR} font-bold text-emerald-600 dark:text-emerald-400`}>{fmtOMR(tRevA)}</td>
                        <td className={`${tdR} font-semibold`}>{fmtOMR(tRevT)}</td>
                        <td className={`${tdR} font-bold`}>{clampAch((tRevA / tRevT) * 100)}%</td>
                        <td className={`${tdR} font-bold text-gray-900 dark:text-gray-100`}>{fmtNum(tAct)}</td>
                      </tr>
                    </tfoot>
                  )}
                </DataTable>
                  );
                })()}
              </motion.div>
            );
          })()}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance by Activation type */}
            <SectionCard icon={<Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />} title="Performance by Activation Type">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={D.activationByType} margin={{ top: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <RTooltip formatter={(v: number) => fmtNum(v)} />
                  <Legend />
                  <Bar dataKey="target" name="Target" fill="#cbd5e1" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="target" position="top" formatter={fmtShort} className="fill-gray-500 text-[11px]" />
                  </Bar>
                  <Bar dataKey="actual" name="Actual" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="actual" position="top" formatter={fmtShort} className="fill-gray-900 dark:fill-gray-100 text-[11px] font-semibold" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </SectionCard>

            {/* Revenue contribution by activation type */}
            <SectionCard icon={<Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />} title="Revenue Contribution by Activation Type">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="relative">
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={revContrib}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        outerRadius={95}
                        paddingAngle={3}
                        labelLine={false}
                        label={({ pct }: any) => `${pct.toFixed(0)}%`}
                      >
                        {revContrib.map((e) => (
                          <Cell key={e.name} fill={e.color} />
                        ))}
                      </Pie>
                      <RTooltip formatter={(v: number) => fmtOMR(v)} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">Total</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {fmtOMR(revContribTotal)}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {revContrib.map((r) => (
                    <div key={r.name} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
                        <span className="text-gray-700 dark:text-gray-300">{r.name}</span>
                      </span>
                      <span className="text-right">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">{fmtOMR(r.value)}</span>
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{r.pct.toFixed(1)}%</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Activation Type Analysis — Base vs Other Segment */}
          <SectionCard
            icon={<Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            title="Activation Type Analysis (Base vs Other Segment)"
            action={
              <TableTools>
                <SegTabs
                  value={atSeg}
                  onChange={setAtSeg}
                  options={[
                    { value: "all", label: "All" },
                    { value: "Base", label: "Base" },
                    { value: "Other Segment", label: "Other Segment" },
                  ]}
                />
                <SearchInput value={atSearch} onChange={setAtSearch} placeholder="Filter channel" />
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {atRows.length} of {D.activationTypeBreakdown.length}
                </span>
              </TableTools>
            }
          >
            {(() => {
              const maxCount = Math.max(1, ...D.activationTypeBreakdown.map((r) => r.count));
              const totCount = atRows.reduce((s, r) => s + r.count, 0);
              const totRev = atRows.reduce((s, r) => s + r.revenue, 0);
              return (
                <DataTable minWidth={620}>
                  <HeadRow>
                    <Th>Channel</Th>
                    <Th>Segment</Th>
                    <Th align="right">Activations</Th>
                    <Th align="right">Revenue</Th>
                    <Th align="right">Avg / Activation</Th>
                  </HeadRow>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                    {atRows.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-10 text-center text-sm text-gray-400 dark:text-gray-500">
                          No rows match “{atSearch}”.
                        </td>
                      </tr>
                    )}
                    {atRows.map((r, i) => (
                      <Row key={`${r.channel}-${r.segment}`} i={i}>
                        <td className={`${td} font-medium text-gray-900 dark:text-gray-100`}>{r.channel}</td>
                        <td className={td}>
                          <Pill tone={r.segment === "Base" ? "blue" : "purple"}>{r.segment}</Pill>
                        </td>
                        <td className={tdR}>
                          <div className="flex items-center justify-end gap-2.5">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">{fmtNum(r.count)}</span>
                            <MiniBar value={r.count} max={maxCount} />
                          </div>
                        </td>
                        <td className={`${tdR} font-semibold text-emerald-600 dark:text-emerald-400`}>{fmtOMR(r.revenue)}</td>
                        <td className={tdR}>{fmtOMR(Math.round(r.revenue / r.count))}</td>
                      </Row>
                    ))}
                  </tbody>
                  {atRows.length > 0 && (
                    <tfoot className="border-t-2 border-gray-200 bg-gray-50/60 dark:border-gray-700/60 dark:bg-white/[0.03]">
                      <tr>
                        <td className={`${td} font-semibold text-gray-900 dark:text-gray-100`} colSpan={2}>Total</td>
                        <td className={`${tdR} font-bold text-gray-900 dark:text-gray-100`}>{fmtNum(totCount)}</td>
                        <td className={`${tdR} font-bold text-emerald-600 dark:text-emerald-400`}>{fmtOMR(totRev)}</td>
                        <td className={`${tdR} font-semibold`}>{fmtOMR(Math.round(totRev / totCount))}</td>
                      </tr>
                    </tfoot>
                  )}
                </DataTable>
              );
            })()}
          </SectionCard>

          {/* Hunting Validation */}
          <SectionCard
            icon={<CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            title="Hunting Validation — 2nd Bill / Payment"
            action={
              <TableTools>
                <SearchInput value={hvSearch} onChange={setHvSearch} placeholder="Search CR or customer" />
                <SegTabs
                  value={hvStatus}
                  onChange={setHvStatus}
                  options={[
                    { value: "all", label: "All" },
                    { value: "eligible", label: "Eligible" },
                    { value: "hold", label: "On hold" },
                  ]}
                />
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {hvRows.length} of {D.huntingValidation.length}
                </span>
              </TableTools>
            }
          >
            <DataTable minWidth={720}>
              <HeadRow>
                <Th>CR</Th>
                <Th>Customer</Th>
                <Th>Activated</Th>
                <Th>2nd Bill</Th>
                <Th>Commission Eligibility</Th>
              </HeadRow>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                {hvRows.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-sm text-gray-400 dark:text-gray-500">
                      No customers match “{hvSearch}”.
                    </td>
                  </tr>
                )}
                {hvRows.map((h, i) => (
                  <Row key={h.cr} i={i}>
                    <td className={td}>
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-600 dark:bg-white/[0.06] dark:text-gray-400">
                        {h.cr}
                      </span>
                    </td>
                    <td className={`${td} font-medium text-gray-900 dark:text-gray-100`}>
                      <span className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
                        {h.customer}
                      </span>
                    </td>
                    <td className={td}>
                      <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {fmtDate(h.activatedOn)}
                      </span>
                    </td>
                    <td className={td}>
                      {h.secondBill ? (
                        <Pill tone="green">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Generated
                        </Pill>
                      ) : (
                        <Pill tone="red">
                          <XCircle className="h-3.5 w-3.5" /> Pending
                        </Pill>
                      )}
                    </td>
                    <td className={td}>
                      <Pill tone={h.secondBill ? "green" : "amber"}>
                        {h.secondBill ? "Eligible for payment" : "On hold — awaiting 2nd bill"}
                      </Pill>
                    </td>
                  </Row>
                ))}
              </tbody>
            </DataTable>
          </SectionCard>

          {/* Net Activations & Terminations Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SectionCard icon={<Repeat className="w-5 h-5 text-blue-600 dark:text-blue-400" />} title="Net Activations (Activations vs Terminations)">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={D.netActivationsTrend} margin={{ top: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <RTooltip formatter={(v: number) => fmtNum(v)} />
                  <Legend />
                  <Bar dataKey="activations" name="Activations" fill="#10b981" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="activations" position="top" formatter={fmtShort} className="fill-gray-900 dark:fill-gray-100 text-[11px] font-semibold" />
                  </Bar>
                  <Bar dataKey="terminations" name="Terminations" fill="#ef4444" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="terminations" position="top" formatter={fmtShort} className="fill-gray-500 text-[11px]" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </SectionCard>

            <SectionCard icon={<TrendingDown className="w-5 h-5 text-blue-600 dark:text-blue-400" />} title="Terminations Analysis">
              <div className="flex flex-wrap gap-x-8 gap-y-3 mb-5">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Terminations</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{fmtNum(totalTerminations)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Termination Rate</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {((totalTerminations / totalActivations) * 100).toFixed(1)}%
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">of gross activations</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Within 2nd-bill window</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {fmtNum(D.terminationsByType.reduce((s, t) => s + t.within2ndBill, 0))}
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">commission at risk</p>
                </div>
              </div>

              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2.5">By activation type</p>
              <div className="space-y-3">
                {[...D.terminationsByType]
                  .sort((a, b) => b.count - a.count)
                  .map((t) => {
                    const share = (t.count / totalTerminations) * 100;
                    return (
                      <div key={t.type}>
                        <div className="flex items-baseline justify-between text-xs mb-1">
                          <span className="text-gray-700 dark:text-gray-300">{t.type}</span>
                          <span className="text-gray-500 dark:text-gray-400">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">{fmtNum(t.count)}</span>
                            {" · "}
                            {share.toFixed(0)}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100 dark:bg-white/[0.06] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-red-400 dark:bg-red-500 transition-[width] duration-700 ease-out"
                            style={{ width: `${share}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </SectionCard>
          </div>
        </TabsContent>

        {/* ================= COMMISSION ================= */}
        <TabsContent value="commission" className="space-y-6">
          {/* Achievement vs Payout by Plan */}
          <SectionCard
            icon={<Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            title="Achievement vs Payout by Plan"
            action={
              <TableTools>
                <SearchInput value={planSearch} onChange={setPlanSearch} placeholder="Search plan" />
                <Pill tone="gray">
                  {visibleRows.filter((r) => r.qualified).length}/{visibleRows.length} qualified
                </Pill>
              </TableTools>
            }
          >
            <DataTable minWidth={1200}>
              <HeadRow>
                <Th>Plan</Th>
                <Th align="right">Weight</Th>
                <Th align="right">Achievement</Th>
                <Th align="right">Eligible Achv.</Th>
                <Th align="right">Comm. %</Th>
                <Th align="right">Commission Paid</Th>
                <Th align="right">Activations</Th>
                <Th align="right">Eligible</Th>
                <Th>Status</Th>
                <Th>2nd Bill</Th>
                <Th>Termination Status</Th>
              </HeadRow>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                {visibleRows.length === 0 && (
                  <tr>
                    <td colSpan={11} className="px-4 py-10 text-center text-sm text-gray-400 dark:text-gray-500">
                      No plans match “{planSearch}”.
                    </td>
                  </tr>
                )}
                {visibleRows.map((r, i) => (
                  <Row key={r.plan} i={i}>
                    <td className={`${td} sticky left-0 bg-white font-medium text-gray-900 dark:bg-[#07112F] dark:text-gray-100`}>
                      {r.plan}
                    </td>
                    <td className={tdR}>{r.weight}%</td>
                    <td className={tdR}>
                      <div className="flex items-center justify-end gap-2">
                        <span className={`font-semibold ${r.achievement >= 100 ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-gray-100"}`}>
                          {r.achievement}%
                        </span>
                        <MiniBar value={r.achievement} tone={r.achievement >= 100 ? "green" : r.achievement >= 80 ? "amber" : "red"} />
                      </div>
                    </td>
                    <td className={tdR}>
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-gray-700 dark:text-gray-300">{r.eligibleAchievement}%</span>
                        <MiniBar value={r.eligibleAchievement} tone="blue" />
                      </div>
                    </td>
                    <td className={tdR}>{r.commissionPct}%</td>
                    <td className={`${tdR} font-semibold text-emerald-600 dark:text-emerald-400`}>{fmtOMR(r.commissionPaid)}</td>
                    <td className={tdR}>{fmtNum(r.activations)}</td>
                    <td className={tdR}>{fmtNum(r.eligibleActivations)}</td>
                    <td className={td}>
                      <Pill tone={r.qualified ? "green" : "red"}>{r.qualified ? "Qualified" : "Not Qualified"}</Pill>
                    </td>
                    <td className={td}>
                      <Pill
                        tone={
                          r.secondBillStatus === "Confirmed"
                            ? "green"
                            : r.secondBillStatus === "Pending"
                              ? "amber"
                              : "gray"
                        }
                      >
                        {r.secondBillStatus}
                      </Pill>
                    </td>
                    <td className={td}>
                      {r.terminated > 0 ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span className="text-xs text-gray-700 dark:text-gray-300">
                            {fmtNum(r.terminated)} terminated
                          </span>
                          <Pill tone={r.eligibilityImpact === "Reduced" ? "red" : "gray"}>
                            {r.eligibilityImpact === "Reduced" ? "eligibility reduced" : "no impact"}
                          </Pill>
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 dark:text-gray-500">None</span>
                      )}
                    </td>
                  </Row>
                ))}
              </tbody>
              {visibleRows.length > 0 && (
              <tfoot className="border-t-2 border-gray-200 bg-gray-50/60 dark:border-gray-700/60 dark:bg-white/[0.03]">
                <tr>
                  <td className={`${td} sticky left-0 bg-gray-50/60 font-semibold text-gray-900 dark:bg-[#0b1533] dark:text-gray-100`}>
                    Total ({visibleRows.length} plans)
                  </td>
                  <td className={tdR}>{visibleRows.reduce((s, r) => s + r.weight, 0)}%</td>
                  <td className={tdR} />
                  <td className={tdR} />
                  <td className={tdR} />
                  <td className={`${tdR} font-bold text-emerald-600 dark:text-emerald-400`}>
                    {fmtOMR(visibleRows.reduce((s, r) => s + r.commissionPaid, 0))}
                  </td>
                  <td className={`${tdR} font-semibold`}>{fmtNum(visibleRows.reduce((s, r) => s + r.activations, 0))}</td>
                  <td className={`${tdR} font-semibold`}>{fmtNum(visibleRows.reduce((s, r) => s + r.eligibleActivations, 0))}</td>
                  <td className={td} />
                  <td className={td} />
                  <td className={`${td} text-xs text-red-600 dark:text-red-400`}>
                    {fmtNum(visibleRows.reduce((s, r) => s + r.terminated, 0))} terminated
                  </td>
                </tr>
              </tfoot>
              )}
            </DataTable>
          </SectionCard>

          {/* Achievement vs Payout comparison chart */}
          <SectionCard icon={<TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />} title="Achievement % vs Commission Paid % by Plan">
            <ResponsiveContainer width="100%" height={isMobile ? 460 : 380}>
              <BarChart data={D.planRows} layout="vertical" margin={{ left: 4, right: isMobile ? 26 : 36 }} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 130]} />
                <YAxis
                  type="category"
                  dataKey="plan"
                  width={isMobile ? 92 : 180}
                  tick={{ fontSize: isMobile ? 9 : 10 }}
                  tickFormatter={(v: string) => (isMobile && v.length > 16 ? v.slice(0, 15) + "…" : v)}
                />
                <RTooltip />
                <Legend />
                <Bar dataKey="achievement" name="Achievement %" fill="#6366f1" radius={[0, 4, 4, 0]}>
                  <LabelList dataKey="achievement" position="right" formatter={(v: number) => `${v}%`} className="fill-gray-700 dark:fill-gray-300 text-[10px]" />
                </Bar>
                <Bar dataKey="commissionPct" name="Commission Paid %" fill="#10b981" radius={[0, 4, 4, 0]}>
                  <LabelList dataKey="commissionPct" position="right" formatter={(v: number) => `${v}%`} className="fill-gray-700 dark:fill-gray-300 text-[10px]" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>

          {/* Commission Cycle Status */}
          {(() => {
            const stages = D.commissionCycle.stages;
            const doneCount = stages.filter((s) => s.status === "done").length;
            const current = stages.find((s) => s.status === "current");
            const payout = stages[stages.length - 1];
            const toPayout = daysUntil(payout.date);
            const trackPct = ((doneCount + (current ? 0.5 : 0)) / stages.length) * 100;
            return (
              <SectionCard
                icon={<Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                title="Commission Cycle Status"
                action={
                  <TableTools>
                    <Pill tone={current ? "blue" : "green"}>{current ? "In progress" : "Complete"}</Pill>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      Payout {toPayout > 0 ? `in ${toPayout} days` : "due"}
                    </span>
                  </TableTools>
                }
              >
                {/* Summary strip */}
                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    { k: "Cycle", v: D.commissionCycle.period },
                    { k: "Stages complete", v: `${doneCount} of ${stages.length}` },
                    {
                      k: "Scheduled payout",
                      v: fmtOMR(D.commissionCycle.payoutAmount),
                      sub: fmtDay(payout.date),
                    },
                  ].map((x) => (
                    <div
                      key={x.k}
                      className="rounded-lg border border-gray-200/70 bg-gray-50/60 p-3 dark:border-gray-700/60 dark:bg-white/[0.03]"
                    >
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">{x.k}</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{x.v}</p>
                      {x.sub && <p className="text-[10px] text-gray-400 dark:text-gray-500">{x.sub}</p>}
                    </div>
                  ))}
                </div>

                {/* Stepper with a progress track */}
                <div className="relative">
                  <div className="absolute left-4 right-4 top-4 hidden h-0.5 bg-gray-200 dark:bg-gray-700 sm:block" />
                  <div
                    className="absolute left-4 top-4 hidden h-0.5 bg-emerald-500 transition-[width] duration-700 sm:block"
                    style={{ width: `calc(${trackPct}% - 2rem)` }}
                  />
                  <ol className="relative flex flex-col gap-5 sm:flex-row sm:justify-between sm:gap-0">
                    {stages.map((s, i) => (
                      <li
                        key={s.label}
                        className="flex items-start gap-3 sm:flex-1 sm:flex-col sm:items-center sm:gap-2 sm:px-1 sm:text-center"
                      >
                        <div
                          className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                            s.status === "done"
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : s.status === "current"
                                ? "border-blue-500 bg-blue-500 text-white ring-4 ring-blue-200 dark:ring-blue-900/40"
                                : "border-gray-300 bg-white text-gray-400 dark:border-gray-600 dark:bg-[#07112F] dark:text-gray-500"
                          }`}
                        >
                          {s.status === "done" ? "✓" : i + 1}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-900 dark:text-gray-100">{s.label}</p>
                          <p
                            className={`text-[10px] ${
                              s.status === "done"
                                ? "text-emerald-600 dark:text-emerald-400"
                                : s.status === "current"
                                  ? "font-medium text-blue-600 dark:text-blue-400"
                                  : "text-gray-400 dark:text-gray-500"
                            }`}
                          >
                            {s.status === "done"
                              ? `Done · ${fmtDay(s.date)}`
                              : s.status === "current"
                                ? `Due ${fmtDay(s.date)}`
                                : `Est. ${fmtDay(s.date)}`}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Current-stage callout */}
                {current && (
                  <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-800/50 dark:bg-blue-900/15">
                    <div className="mb-1 flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
                        Now: {current.label}
                      </p>
                      <span className="whitespace-nowrap text-xs text-blue-700 dark:text-blue-300">
                        {Math.max(0, daysUntil(current.date))} days left
                      </span>
                    </div>
                    <p className="mb-3 text-xs text-blue-800/80 dark:text-blue-300/80">{current.note}</p>
                    {current.progress && (
                      <>
                        <div className="mb-1 flex items-center justify-between text-[11px] text-blue-800 dark:text-blue-300">
                          <span>{current.progress.unit}</span>
                          <span className="font-semibold">
                            {fmtNum(current.progress.done)} / {fmtNum(current.progress.total)} (
                            {Math.round((current.progress.done / current.progress.total) * 100)}%)
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-blue-100 dark:bg-blue-900/40">
                          <div
                            className="h-full rounded-full bg-blue-500 transition-[width] duration-700"
                            style={{ width: `${(current.progress.done / current.progress.total) * 100}%` }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </SectionCard>
            );
          })()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
