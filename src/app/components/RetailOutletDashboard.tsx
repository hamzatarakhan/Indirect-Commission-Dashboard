import React from "react";
import { motion } from "motion/react";
import {
  Store,
  MapPin,
  Users,
  Activity,
  TrendingUp,
  Wallet,
  Clock,
  Target,
  Search,
  ChevronRight,
  XCircle,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { useIsMobile } from "./ui/use-mobile";
import { REGIONS, RETAIL_PLANS, STAFF_TYPES, getRetailData } from "./retailData";
import type { RetailData } from "./retailData";
import { FEATURES } from "./featureFlags";

// ---- formatting --------------------------------------------------------------
const fmtNum = (n: number) => Math.round(n).toLocaleString();
const fmtOMR = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(2)}M OMR` : n >= 1_000 ? `${(n / 1_000).toFixed(1)}K OMR` : `${Math.round(n)} OMR`;
const fmtShort = (n: number) => (n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(1)}K` : `${Math.round(n)}`);
const fmtDate = (s: string) => new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtDay = (s: string) => new Date(s).toLocaleDateString("en-US", { day: "numeric", month: "short" });
const daysUntil = (s: string) => Math.round((new Date(s).getTime() - Date.now()) / 86_400_000);

// ---- shared visual primitives (mirror the Indirect Commission dashboard) -----
const cardShell = "bg-white dark:bg-[#07112F] rounded-xl border border-[#E2E8F0] dark:border-[#E2E8F0]/20";

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
          <h2 className="text-[13px] font-medium text-gray-900 sm:text-[15px] dark:text-gray-100">{title}</h2>
        </div>
        {action && <div className="w-full shrink-0 lg:w-auto">{action}</div>}
      </div>
      {children}
    </motion.div>
  );
}

function Delta({ current, prev, fmt = (n: number) => fmtShort(Math.abs(n)), invert = false }: { current: number; prev: number; fmt?: (n: number) => string; invert?: boolean }) {
  const diff = current - prev;
  const pct = prev ? (diff / prev) * 100 : 0;
  const flat = Math.abs(pct) < 0.5;
  const good = invert ? diff < 0 : diff > 0;
  const cls = flat ? "text-gray-400 dark:text-gray-500" : good ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400";
  const Icon = flat ? Minus : diff > 0 ? ArrowUp : ArrowDown;
  return (
    <span className={`inline-flex items-center gap-0.5 whitespace-nowrap text-[11px] font-medium ${cls}`}>
      <Icon className="h-3 w-3" />
      {fmt(diff)}
      <span className="opacity-70">({pct >= 0 ? "+" : ""}{pct.toFixed(0)}%)</span>
    </span>
  );
}

function StatTile({
  label,
  value,
  sub,
  tone = "neutral",
  progress,
  progressLabel,
  onClick,
}: {
  label: string;
  value: string;
  sub?: React.ReactNode;
  tone?: "neutral" | "good" | "bad";
  progress?: number;
  progressLabel?: string;
  onClick?: () => void;
}) {
  const toneCls = tone === "good" ? "text-emerald-600 dark:text-emerald-400" : tone === "bad" ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-gray-100";
  return (
    <div
      {...(onClick ? { role: "button", tabIndex: 0, onClick, onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } } } : {})}
      className={`relative flex w-full flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white dark:border-[#E2E8F0]/20 dark:bg-[#07112F] ${onClick ? "cursor-pointer transition-colors hover:border-blue-300 hover:bg-blue-50/30 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/[0.06]" : ""}`}
    >
      <span className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-blue-400 dark:bg-blue-500" />
      <div className="flex-1 p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className={`mt-1 text-2xl font-bold ${toneCls}`}>{value}</p>
        {sub && <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{sub}</div>}
      </div>
      {typeof progress === "number" && (
        <div className="border-t border-gray-100 px-4 pb-3 pt-2.5 dark:border-white/[0.06]">
          <div className="mb-1 flex items-center justify-between text-[10px]">
            <span className="text-gray-500 dark:text-gray-400">{progressLabel ?? "Progress"}</span>
            <span className="font-semibold text-gray-700 dark:text-gray-300">{progress.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-white/[0.06]">
            <div className="h-full rounded-full bg-blue-500" style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}

function DataTable({ children, minWidth = 640, footer }: { children: React.ReactNode; minWidth?: number; footer?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700/60">
      <div className="scrollbar-thin overflow-x-auto rounded-xl">
        <table className="w-full border-collapse" style={{ minWidth }}>{children}</table>
      </div>
      {footer}
    </div>
  );
}

function usePaged<T>(rows: T[], pageSize = 10, resetKey?: unknown) {
  const [page, setPage] = React.useState(1);
  React.useEffect(() => setPage(1), [resetKey]);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const p = Math.min(page, pageCount);
  return {
    pageRows: rows.slice((p - 1) * pageSize, p * pageSize),
    page: p, setPage, pageCount, total: rows.length,
    from: rows.length === 0 ? 0 : (p - 1) * pageSize + 1,
    to: Math.min(p * pageSize, rows.length),
  };
}

function Pager({ page, pageCount, from, to, total, onPage }: { page: number; pageCount: number; from: number; to: number; total: number; onPage: (p: number) => void }) {
  if (pageCount <= 1) return null;
  const btn = "rounded-md border border-gray-200 px-2 py-1 font-medium text-gray-600 transition-colors enabled:hover:bg-gray-50 disabled:opacity-40 dark:border-gray-700/60 dark:text-gray-300 dark:enabled:hover:bg-white/[0.04]";
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-2.5 text-xs text-gray-500 dark:border-gray-800/60 dark:text-gray-400">
      <span>Showing <b className="text-gray-700 dark:text-gray-200">{from}–{to}</b> of {total}</span>
      <div className="flex items-center gap-1.5">
        <button className={btn} onClick={() => onPage(page - 1)} disabled={page <= 1}>Prev</button>
        <span className="px-1 tabular-nums">{page} / {pageCount}</span>
        <button className={btn} onClick={() => onPage(page + 1)} disabled={page >= pageCount}>Next</button>
      </div>
    </div>
  );
}

function Th({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
  return <th className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ${align === "right" ? "text-right" : "text-left"}`}>{children}</th>;
}
function HeadRow({ children }: { children: React.ReactNode }) {
  return <thead><tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700/60 dark:bg-white/[0.03]">{children}</tr></thead>;
}
function Row({ children, i = 0, onClick }: { children: React.ReactNode; i?: number; onClick?: () => void }) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.3) }}
      {...(onClick ? { onClick, role: "button", tabIndex: 0 } : {})}
      className={`transition-colors hover:bg-gray-50/70 dark:hover:bg-white/[0.03] ${onClick ? "cursor-pointer" : ""}`}
    >
      {children}
    </motion.tr>
  );
}
const td = "px-4 py-3 text-sm text-gray-700 dark:text-gray-300";
const tdR = `${td} text-right`;

function MiniBar({ value, max = 100, tone = "blue" }: { value: number; max?: number; tone?: "blue" | "green" | "amber" | "red" }) {
  const pct = Math.max(2, Math.min(100, (value / max) * 100));
  const c = tone === "green" ? "bg-emerald-500" : tone === "amber" ? "bg-amber-500" : tone === "red" ? "bg-red-400" : "bg-blue-500";
  return (
    <div className="h-1.5 w-14 shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-white/[0.06]">
      <div className={`h-full rounded-full ${c}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function Pill({ children, tone }: { children: React.ReactNode; tone: "green" | "red" | "amber" | "blue" | "purple" | "gray" }) {
  const map: Record<string, string> = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/25 dark:text-emerald-300 dark:border-emerald-800/60",
    red: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/25 dark:text-red-300 dark:border-red-800/60",
    amber: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/25 dark:text-amber-300 dark:border-amber-800/60",
    blue: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/25 dark:text-blue-300 dark:border-blue-800/60",
    purple: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/25 dark:text-purple-300 dark:border-purple-800/60",
    gray: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-white/[0.06] dark:text-gray-400 dark:border-white/10",
  };
  return <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium ${map[tone]}`}>{children}</span>;
}

function SearchInput({ value, onChange, placeholder, width = "w-full sm:w-56", light = false }: { value: string; onChange: (v: string) => void; placeholder: string; width?: string; light?: boolean }) {
  return (
    <div className={`relative ${width}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={`h-9 w-full rounded-lg border border-gray-200 pl-9 pr-8 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-gray-700/60 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-500/60 dark:focus:bg-white/[0.06] dark:focus:ring-blue-900/30 ${light ? "bg-white dark:bg-[#07112F]" : "bg-gray-50 dark:bg-white/[0.04]"}`}
      />
      {value && (
        <button onClick={() => onChange("")} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <XCircle className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function TableTools({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full flex-wrap items-center gap-2 sm:gap-3 lg:w-auto lg:justify-end">{children}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-500 dark:text-gray-400">{label}</label>
      {children}
    </div>
  );
}

function Dropdown({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
      <SelectContent>
        {options.map((o) => (<SelectItem key={o} value={o}>{o}</SelectItem>))}
      </SelectContent>
    </Select>
  );
}

function SegTabs<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <div className="flex h-9 items-stretch gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-white/[0.06]">
      {options.map((o) => (
        <button key={o.value} onClick={() => onChange(o.value)} className={`flex items-center rounded-md px-3 text-xs font-medium transition-colors ${value === o.value ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ---- dialog kit -----------------------------------------------------------
function StatBox({ label, value, sub, tone = "neutral" }: { label: string; value: React.ReactNode; sub?: React.ReactNode; tone?: "neutral" | "good" | "bad" | "warn" }) {
  const cls = tone === "good" ? "text-emerald-600 dark:text-emerald-400" : tone === "bad" ? "text-red-600 dark:text-red-400" : tone === "warn" ? "text-amber-600 dark:text-amber-400" : "text-gray-900 dark:text-gray-100";
  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-2.5 dark:border-gray-700/60 dark:bg-[#07112F]">
      <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">{label}</p>
      <p className={`mt-auto flex flex-wrap items-baseline gap-x-1.5 text-base font-bold leading-tight ${cls}`}>
        <span>{value}</span>
        {sub && <span className="text-[10px] font-normal text-gray-400 dark:text-gray-500">{sub}</span>}
      </p>
    </div>
  );
}
function DlgLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 mt-5 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">{children}</p>;
}
function DlgTable({ head, children, footer }: { head: React.ReactNode; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700/60 dark:bg-[#07112F]">
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-white text-[10px] uppercase tracking-wide text-gray-400 dark:border-gray-700/60 dark:bg-[#07112F] dark:text-gray-500">{head}</thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">{children}</tbody>
        </table>
      </div>
      {footer}
    </div>
  );
}
const dlgTh = "px-3 py-2 text-left font-semibold";
const dlgThR = "px-3 py-2 text-right font-semibold";
const dlgTd = "px-3 py-2 text-gray-700 dark:text-gray-300";
const dlgTdR = "px-3 py-2 text-right tabular-nums text-gray-700 dark:text-gray-300";

// Tiny inline trend line for table cells.
function Sparkline({ points, tone = "#3b82f6" }: { points: number[]; tone?: string }) {
  if (!points || points.length < 2) return <span className="text-gray-300 dark:text-gray-600">—</span>;
  const w = 56, h = 16, max = Math.max(...points), min = Math.min(...points);
  const span = max - min || 1;
  const d = points
    .map((p, i) => `${(i / (points.length - 1)) * w},${h - ((p - min) / span) * (h - 2) - 1}`)
    .join(" ");
  const up = points[points.length - 1] >= points[0];
  return (
    <svg width={w} height={h} className="inline-block align-middle">
      <polyline points={d} fill="none" stroke={up ? "#10b981" : "#ef4444"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={tone ? 1 : 1} />
    </svg>
  );
}

// ---------------------------------------------------------------------------

interface Props {
  period: string;
  quarter: string;
  year: string;
}

type DrillRegion = { kind: "region"; region: string };
type DrillOutlet = { kind: "outlet"; outlet: string; region: string };
type DrillStaff = { kind: "staff"; outlet: string; staff: string };
type Drill = DrillRegion | DrillOutlet | DrillStaff | null;

const PLAN_COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];

export function RetailOutletDashboard({ period, quarter, year }: Props) {
  const granularity: "Month" | "Quarter" | "Year" = period === "Yearly" ? "Year" : period === "Monthly" ? "Month" : "Quarter";
  const isMobile = useIsMobile();

  const [region, setRegion] = React.useState<string>(REGIONS[0]);
  const [outlet, setOutlet] = React.useState<string>("All Outlets");
  const [plan, setPlan] = React.useState<string>("All Plans");
  const [staffType, setStaffType] = React.useState<string>(STAFF_TYPES[0]);

  const [rankSearch, setRankSearch] = React.useState("");
  const [rankScope, setRankScope] = React.useState<"all" | "Managed" | "Unmanaged">("all");
  const [overviewLevel, setOverviewLevel] = React.useState<"region" | "outlet">("region");
  const [commLevel, setCommLevel] = React.useState<"plan" | "outlet">("plan");
  const [drill, setDrill] = React.useState<Drill>(null);

  const D: RetailData = React.useMemo(
    () => getRetailData({ granularity, region, outlet, plan, staffType, quarter, year }),
    [granularity, region, outlet, plan, staffType, quarter, year],
  );

  // keep the outlet filter valid when region changes
  React.useEffect(() => {
    if (outlet !== "All Outlets" && !D.outletsInRegion.includes(outlet)) setOutlet("All Outlets");
  }, [region]); // eslint-disable-line react-hooks/exhaustive-deps

  const rankRows = D.outletRanking.filter((o) => {
    const q = rankSearch.trim().toLowerCase();
    const matchesQ = !q || o.outlet.toLowerCase().includes(q) || o.region.toLowerCase().includes(q);
    const matchesScope = rankScope === "all" || o.account === rankScope;
    return matchesQ && matchesScope;
  });
  const rankPage = usePaged(rankRows, 10, rankSearch + rankScope + region + outlet + plan + staffType);
  const rankMax = Math.max(1, ...D.outletRanking.map((o) => o.activations));

  const overviewRegionPage = usePaged(D.regionPerformance, 10, D);
  const overviewOutletPage = usePaged(D.outletRanking, 10, D);
  const targetPage = usePaged(D.targetView.rows, 10, D);
  const commOutletPage = usePaged(D.commissionByOutlet, 10, D);

  const planChartData = D.activationsByPlan.map((p) => ({ ...p, short: p.plan.replace("Retail ", "") }));
  const cmPaidTotal = D.commissionByPlan.reduce((s, p) => s + p.totalPaid, 0);
  const cmActs = D.commissionByPlan.reduce((s, p) => s + p.activations, 0);
  const cmEligible = D.commissionByPlan.reduce((s, p) => s + p.eligibleActivations, 0);
  const cmEarned = D.achievementVsPayout.reduce((s, p) => s + p.commissionEarned, 0);

  return (
    <div className="space-y-3">
      {/* ===== filter card ===== */}
      <div className={`${cardShell} p-4`}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
          <Field label="Region">
            <Dropdown value={region} onChange={setRegion} options={REGIONS} />
          </Field>
          <Field label="Outlet">
            <Dropdown value={outlet} onChange={setOutlet} options={["All Outlets", ...D.outletsInRegion]} />
          </Field>
          <Field label="Commission Plan">
            <Dropdown value={plan} onChange={setPlan} options={["All Plans", ...RETAIL_PLANS]} />
          </Field>
          <Field label="Staff Type">
            <Dropdown value={staffType} onChange={setStaffType} options={STAFF_TYPES} />
          </Field>
        </div>
      </div>

      <Tabs defaultValue="performance" className="space-y-3">
        <TabsList className="inline-flex h-auto gap-1 rounded-xl border border-slate-200 bg-white p-1 dark:border-gray-700/60 dark:bg-[#07112F]">
          {["performance", "commission"].map((v) => (
            <TabsTrigger
              key={v}
              value={v}
              className="rounded-lg border-0 px-6 py-1.5 text-[13px] font-medium capitalize text-[rgba(0,11,37,0.64)] transition-all duration-300 hover:text-[#000b25] data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm dark:text-gray-400 dark:hover:text-gray-200 dark:data-[state=active]:bg-blue-600 dark:data-[state=active]:text-white sm:px-10 sm:py-2"
            >
              {v}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ================= PERFORMANCE ================= */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="Total Activations" value={fmtNum(D.totalActivations)} tone="good" sub={`across ${D.activeOutlets} outlet${D.activeOutlets === 1 ? "" : "s"}`} onClick={() => D.outletRanking[0] && setDrill({ kind: "outlet", outlet: D.outletRanking[0].outlet, region: D.outletRanking[0].region })} />
            <StatTile label="Active Outlets" value={fmtNum(D.activeOutlets)} sub={`${D.regionPerformance.length} region${D.regionPerformance.length === 1 ? "" : "s"}`} />
            <StatTile label="Staff" value={fmtNum(D.staffCount)} sub="engaged in retail activations" />
            <StatTile label="Avg / Outlet" value={fmtNum(D.avgPerOutlet)} sub="activations per outlet" />
          </div>

          {/* Outlet Ranking (covers Total Activations by Outlet + Outlet Ranking) */}
          <SectionCard
            icon={<Store className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
            title="Outlet Ranking — activations"
            action={
              <TableTools>
                <SegTabs
                  value={rankScope}
                  onChange={setRankScope}
                  options={[
                    { value: "all", label: "All" },
                    { value: "Managed", label: "Managed" },
                    { value: "Unmanaged", label: "Unmanaged" },
                  ]}
                />
                <SearchInput value={rankSearch} onChange={setRankSearch} placeholder="Search outlet / region" />
                <span className="text-xs text-gray-400 dark:text-gray-500">{rankRows.length} of {D.outletRanking.length}</span>
              </TableTools>
            }
          >
            <DataTable minWidth={760} footer={<Pager {...rankPage} onPage={rankPage.setPage} />}>
              <HeadRow>
                <Th>#</Th>
                <Th>Outlet</Th>
                <Th>Region</Th>
                <Th>Account</Th>
                <Th align="right">Staff</Th>
                <Th align="right">Activations</Th>
                <Th align="right">Share</Th>
                <Th>{""}</Th>
              </HeadRow>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                {rankRows.length === 0 && (
                  <tr><td colSpan={8} className="px-4 py-10 text-center text-sm text-gray-400 dark:text-gray-500">No outlets match “{rankSearch}”.</td></tr>
                )}
                {rankPage.pageRows.map((o, i) => (
                  <Row key={o.outlet} i={i} onClick={() => setDrill({ kind: "outlet", outlet: o.outlet, region: o.region })}>
                    <td className={`${td} font-mono text-xs text-gray-500 dark:text-gray-400`}>{o.rank}</td>
                    <td className={`${td} font-medium text-gray-900 dark:text-gray-100`}>{o.outlet}</td>
                    <td className={`${td} text-gray-500 dark:text-gray-400`}>{o.region}</td>
                    <td className={td}><Pill tone={o.account === "Managed" ? "blue" : "purple"}>{o.account}</Pill></td>
                    <td className={tdR}>{fmtNum(o.staff)}</td>
                    <td className={tdR}>
                      <div className="flex items-center justify-end gap-2.5">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">{fmtNum(o.activations)}</span>
                        <MiniBar value={o.activations} max={rankMax} />
                      </div>
                    </td>
                    <td className={tdR}>{o.share.toFixed(1)}%</td>
                    <td className={td}><ChevronRight className="h-4 w-4 text-gray-300 dark:text-gray-600" /></td>
                  </Row>
                ))}
              </tbody>
              {rankRows.length > 0 && (
                <tfoot className="border-t-2 border-gray-200 bg-white font-semibold text-gray-900 dark:border-gray-700 dark:bg-[#07112F] dark:text-gray-100">
                  <tr>
                    <td className={td} colSpan={4}>Total ({rankRows.length} outlets)</td>
                    <td className={tdR}>{fmtNum(rankRows.reduce((s, o) => s + o.staff, 0))}</td>
                    <td className={tdR}>{fmtNum(rankRows.reduce((s, o) => s + o.activations, 0))}</td>
                    <td className={tdR}>{rankRows.reduce((s, o) => s + o.share, 0).toFixed(0)}%</td>
                    <td className={td} />
                  </tr>
                </tfoot>
              )}
            </DataTable>
          </SectionCard>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Activations by Plan / Product Plan */}
            <SectionCard icon={<Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />} title="Activations by Plan">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={planChartData} margin={{ top: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="short" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} width={isMobile ? 34 : 44} />
                  <RTooltip formatter={(v: number) => fmtNum(v)} />
                  <Bar dataKey="activations" name="Activations" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="activations" position="top" formatter={fmtShort} className="fill-gray-900 dark:fill-gray-100 text-[11px] font-semibold" />
                    {planChartData.map((p, i) => (
                      <Cell key={p.plan} fill={PLAN_COLORS[i % PLAN_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </SectionCard>

            {/* Performance Trend by Month */}
            <SectionCard icon={<TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />} title="Performance Trend by Month">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={D.monthlyTrend} margin={{ top: 20 }}>
                  <defs>
                    <linearGradient id="retailTrend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} width={isMobile ? 34 : 44} />
                  <RTooltip formatter={(v: number) => fmtNum(v)} />
                  <Area type="monotone" dataKey="activations" name="Activations" stroke="#3b82f6" strokeWidth={2} fill="url(#retailTrend)" dot={{ r: 3, fill: "#fff", stroke: "#3b82f6" }} />
                </AreaChart>
              </ResponsiveContainer>
            </SectionCard>
          </div>

          {/* Activation Performance by Plan */}
          <SectionCard icon={<Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />} title="Activation Performance by Plan">
            <DataTable minWidth={620}>
              <HeadRow>
                <Th>Plan</Th>
                <Th align="right">Activations</Th>
                <Th align="right">Eligible</Th>
                <Th align="right">Share</Th>
                <Th align="right">MoM</Th>
                <Th align="right">Monthly Trend</Th>
              </HeadRow>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                {D.activationPerfByPlan.map((p, i) => (
                  <Row key={p.plan} i={i}>
                    <td className={`${td} font-medium text-gray-900 dark:text-gray-100`}>{p.plan}</td>
                    <td className={`${tdR} font-semibold text-gray-900 dark:text-gray-100`}>{fmtNum(p.activations)}</td>
                    <td className={tdR}>{fmtNum(p.eligible)}</td>
                    <td className={tdR}>{p.share.toFixed(1)}%</td>
                    <td className={tdR}>
                      <span className={`inline-flex items-center gap-0.5 text-[11px] font-medium ${p.momPct > 0.5 ? "text-emerald-600 dark:text-emerald-400" : p.momPct < -0.5 ? "text-red-600 dark:text-red-400" : "text-gray-400 dark:text-gray-500"}`}>
                        {p.momPct > 0.5 ? <ArrowUp className="h-3 w-3" /> : p.momPct < -0.5 ? <ArrowDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                        {p.momPct >= 0 ? "+" : ""}{p.momPct.toFixed(1)}%
                      </span>
                    </td>
                    <td className={tdR}><Sparkline points={p.trend} /></td>
                  </Row>
                ))}
              </tbody>
              <tfoot className="border-t-2 border-gray-200 bg-white font-semibold text-gray-900 dark:border-gray-700 dark:bg-[#07112F] dark:text-gray-100">
                <tr>
                  <td className={td}>Total</td>
                  <td className={tdR}>{fmtNum(D.activationPerfByPlan.reduce((s, p) => s + p.activations, 0))}</td>
                  <td className={tdR}>{fmtNum(D.activationPerfByPlan.reduce((s, p) => s + p.eligible, 0))}</td>
                  <td className={tdR}>100%</td>
                  <td className={tdR} />
                  <td className={tdR} />
                </tr>
              </tfoot>
            </DataTable>
          </SectionCard>

          {/* Performance Overview — Region / Outlet */}
          <SectionCard
            icon={<MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
            title="Performance Overview"
            action={
              <TableTools>
                <SegTabs
                  value={overviewLevel}
                  onChange={setOverviewLevel}
                  options={[
                    { value: "region", label: "By Region" },
                    { value: "outlet", label: "By Outlet" },
                  ]}
                />
              </TableTools>
            }
          >
            {overviewLevel === "region" ? (
              <DataTable minWidth={520} footer={<Pager {...overviewRegionPage} onPage={overviewRegionPage.setPage} />}>
                <HeadRow>
                  <Th>Region</Th>
                  <Th align="right">Outlets</Th>
                  <Th align="right">Activations</Th>
                  <Th align="right">Share</Th>
                  <Th align="right">Trend</Th>
                  <Th>{""}</Th>
                </HeadRow>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                  {overviewRegionPage.pageRows.map((rg, i) => (
                    <Row key={rg.region} i={i} onClick={() => setDrill({ kind: "region", region: rg.region })}>
                      <td className={`${td} font-medium text-gray-900 dark:text-gray-100`}>{rg.region}</td>
                      <td className={tdR}>{fmtNum(rg.outlets)}</td>
                      <td className={tdR}>
                        <div className="flex items-center justify-end gap-2.5">
                          <span className="font-semibold text-gray-900 dark:text-gray-100">{fmtNum(rg.activations)}</span>
                          <MiniBar value={rg.share} max={Math.max(1, ...D.regionPerformance.map((x) => x.share))} tone="green" />
                        </div>
                      </td>
                      <td className={tdR}>{rg.share.toFixed(1)}%</td>
                      <td className={tdR}><Sparkline points={rg.trend} /></td>
                      <td className={td}><ChevronRight className="h-4 w-4 text-gray-300 dark:text-gray-600" /></td>
                    </Row>
                  ))}
                </tbody>
              </DataTable>
            ) : (
              <DataTable minWidth={560} footer={<Pager {...overviewOutletPage} onPage={overviewOutletPage.setPage} />}>
                <HeadRow>
                  <Th>Outlet</Th>
                  <Th>Region</Th>
                  <Th align="right">Activations</Th>
                  <Th align="right">Share</Th>
                  <Th align="right">Trend</Th>
                  <Th>{""}</Th>
                </HeadRow>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                  {overviewOutletPage.pageRows.map((o, i) => (
                    <Row key={o.outlet} i={i} onClick={() => setDrill({ kind: "outlet", outlet: o.outlet, region: o.region })}>
                      <td className={`${td} font-medium text-gray-900 dark:text-gray-100`}>{o.outlet}</td>
                      <td className={`${td} text-gray-500 dark:text-gray-400`}>{o.region}</td>
                      <td className={tdR}>
                        <div className="flex items-center justify-end gap-2.5">
                          <span className="font-semibold text-gray-900 dark:text-gray-100">{fmtNum(o.activations)}</span>
                          <MiniBar value={o.activations} max={rankMax} />
                        </div>
                      </td>
                      <td className={tdR}>{o.share.toFixed(1)}%</td>
                      <td className={tdR}><Sparkline points={o.trend} /></td>
                      <td className={td}><ChevronRight className="h-4 w-4 text-gray-300 dark:text-gray-600" /></td>
                    </Row>
                  ))}
                </tbody>
              </DataTable>
            )}
            <p className="mt-2 text-[11px] text-gray-400 dark:text-gray-500">
              {overviewLevel === "region" ? "Tap a region to see its outlets." : "Tap an outlet to see its staff and activations."}
            </p>
          </SectionCard>

          {/* Target vs Achievement — future-ready */}
          <SectionCard icon={<Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />} title="Target vs Achievement">
            <div className="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-800/50 dark:bg-amber-900/20 dark:text-amber-200">
              {D.targetView.note}
            </div>
            <DataTable minWidth={760} footer={<Pager {...targetPage} onPage={targetPage.setPage} />}>
              <HeadRow>
                <Th>Outlet</Th>
                <Th>Region</Th>
                <Th align="right">Activation Target</Th>
                <Th align="right">Actual Activations</Th>
                <Th align="right">Achievement %</Th>
                <Th align="right">Gap to Target</Th>
                <Th align="right">Monthly Trend</Th>
                <Th align="right">Rank</Th>
              </HeadRow>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                {targetPage.pageRows.map((rw, i) => (
                  <Row key={rw.scope} i={i}>
                    <td className={`${td} font-medium text-gray-900 dark:text-gray-100`}>{rw.scope}</td>
                    <td className={`${td} text-gray-500 dark:text-gray-400`}>{rw.region}</td>
                    <td className={`${tdR} text-gray-400 dark:text-gray-500`}>—</td>
                    <td className={`${tdR} font-semibold text-gray-900 dark:text-gray-100`}>{fmtNum(rw.actual)}</td>
                    <td className={`${tdR} text-gray-400 dark:text-gray-500`}>—</td>
                    <td className={`${tdR} text-gray-400 dark:text-gray-500`}>—</td>
                    <td className={tdR}><Sparkline points={rw.trend} /></td>
                    <td className={tdR}>{rw.rank}</td>
                  </Row>
                ))}
              </tbody>
            </DataTable>
          </SectionCard>
        </TabsContent>

        {/* ================= COMMISSION ================= */}
        <TabsContent value="commission" className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="Total Commission Paid" value={fmtOMR(D.paidTotal)} tone="good" sub={`${D.filters.year}${granularity === "Year" ? "" : ` · ${quarter}`}`} />
            <StatTile label="Eligible Activations" value={fmtNum(D.eligibleTotal)} sub={`of ${fmtNum(cmActs)} total`} progress={cmActs ? (cmEligible / cmActs) * 100 : 0} progressLabel="eligibility rate" />
            <StatTile label="Staff Paid" value={fmtNum(D.commissionByPlan.reduce((s, p) => Math.max(s, p.staffCount), 0))} sub="unique staff across plans" />
            <StatTile label="Avg Commission / Staff" value={fmtOMR(D.paidTotal / Math.max(1, D.staffCount))} sub="blended across all plans" />
          </div>

          {/* Commission Overview — Plan / Outlet */}
          <SectionCard
            icon={<Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
            title="Commission Overview"
            action={
              <TableTools>
                <SegTabs
                  value={commLevel}
                  onChange={setCommLevel}
                  options={[
                    { value: "plan", label: "By Plan" },
                    { value: "outlet", label: "By Outlet" },
                  ]}
                />
              </TableTools>
            }
          >
            {commLevel === "plan" ? (
              <DataTable minWidth={1080}>
                <HeadRow>
                  <Th>Plan</Th>
                  <Th align="right"># Activations</Th>
                  <Th align="right">Eligible</Th>
                  <Th align="right">Achievement %</Th>
                  <Th align="right">Comm. %</Th>
                  <Th align="right">Total Paid</Th>
                  <Th align="right">Staff</Th>
                  <Th align="right">Avg / Staff</Th>
                  <Th align="right">Contribution</Th>
                </HeadRow>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                  {D.commissionByPlan.map((p, i) => (
                    <Row key={p.plan} i={i}>
                      <td className={`${td} font-medium text-gray-900 dark:text-gray-100`}>{p.plan}</td>
                      <td className={tdR}>{fmtNum(p.activations)}</td>
                      <td className={tdR}>{fmtNum(p.eligibleActivations)}</td>
                      <td className={tdR}>
                        <Pill tone={p.achievementPct >= 100 ? "green" : p.achievementPct >= 90 ? "amber" : "red"}>{p.achievementPct}%</Pill>
                      </td>
                      <td className={tdR}>{p.commissionPct}%</td>
                      <td className={`${tdR} font-semibold text-emerald-600 dark:text-emerald-400`}>{fmtOMR(p.totalPaid)}</td>
                      <td className={tdR}>{fmtNum(p.staffCount)}</td>
                      <td className={tdR}>{fmtOMR(p.avgPerStaff)}</td>
                      <td className={tdR}>
                        <div className="flex items-center justify-end gap-2.5">
                          <span>{p.contributionPct.toFixed(1)}%</span>
                          <MiniBar value={p.contributionPct} max={Math.max(1, ...D.commissionByPlan.map((x) => x.contributionPct))} />
                        </div>
                      </td>
                    </Row>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-gray-200 bg-white font-semibold text-gray-900 dark:border-gray-700 dark:bg-[#07112F] dark:text-gray-100">
                  <tr>
                    <td className={td}>Total</td>
                    <td className={tdR}>{fmtNum(cmActs)}</td>
                    <td className={tdR}>{fmtNum(cmEligible)}</td>
                    <td className={tdR} />
                    <td className={tdR} />
                    <td className={`${tdR} text-emerald-600 dark:text-emerald-400`}>{fmtOMR(cmPaidTotal)}</td>
                    <td className={tdR} />
                    <td className={tdR} />
                    <td className={tdR}>100%</td>
                  </tr>
                </tfoot>
              </DataTable>
            ) : (
              <DataTable minWidth={1080} footer={<Pager {...commOutletPage} onPage={commOutletPage.setPage} />}>
                <HeadRow>
                  <Th>Outlet</Th>
                  <Th>Region</Th>
                  <Th align="right"># Activations</Th>
                  <Th align="right">Eligible</Th>
                  <Th align="right">Achievement %</Th>
                  <Th align="right">Comm. %</Th>
                  <Th align="right">Total Paid</Th>
                  <Th align="right">Staff</Th>
                  <Th align="right">Avg / Staff</Th>
                  <Th align="right">Outlet Contribution</Th>
                  <Th>{""}</Th>
                </HeadRow>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                  {commOutletPage.pageRows.map((o, i) => (
                    <Row key={o.outlet} i={i} onClick={() => setDrill({ kind: "outlet", outlet: o.outlet, region: o.region })}>
                      <td className={`${td} font-medium text-gray-900 dark:text-gray-100`}>{o.outlet}</td>
                      <td className={`${td} text-gray-500 dark:text-gray-400`}>{o.region}</td>
                      <td className={tdR}>{fmtNum(o.activations)}</td>
                      <td className={tdR}>{fmtNum(o.eligibleActivations)}</td>
                      <td className={tdR}>
                        <Pill tone={o.achievementPct >= 100 ? "green" : o.achievementPct >= 90 ? "amber" : "red"}>{o.achievementPct}%</Pill>
                      </td>
                      <td className={tdR}>{o.commissionPct}%</td>
                      <td className={`${tdR} font-semibold text-emerald-600 dark:text-emerald-400`}>{fmtOMR(o.totalPaid)}</td>
                      <td className={tdR}>{fmtNum(o.staffCount)}</td>
                      <td className={tdR}>{fmtOMR(o.avgPerStaff)}</td>
                      <td className={tdR}>
                        <div className="flex items-center justify-end gap-2.5">
                          <span>{o.contributionPct.toFixed(1)}%</span>
                          <MiniBar value={o.contributionPct} max={Math.max(1, ...D.commissionByOutlet.map((x) => x.contributionPct))} />
                        </div>
                      </td>
                      <td className={td}><ChevronRight className="h-4 w-4 text-gray-300 dark:text-gray-600" /></td>
                    </Row>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-gray-200 bg-white font-semibold text-gray-900 dark:border-gray-700 dark:bg-[#07112F] dark:text-gray-100">
                  <tr>
                    <td className={td} colSpan={2}>Total ({D.commissionByOutlet.length} outlets)</td>
                    <td className={tdR}>{fmtNum(D.commissionByOutlet.reduce((s, o) => s + o.activations, 0))}</td>
                    <td className={tdR}>{fmtNum(D.commissionByOutlet.reduce((s, o) => s + o.eligibleActivations, 0))}</td>
                    <td className={tdR} />
                    <td className={tdR} />
                    <td className={`${tdR} text-emerald-600 dark:text-emerald-400`}>{fmtOMR(D.commissionByOutlet.reduce((s, o) => s + o.totalPaid, 0))}</td>
                    <td className={tdR} />
                    <td className={tdR} />
                    <td className={tdR}>100%</td>
                    <td className={td} />
                  </tr>
                </tfoot>
              </DataTable>
            )}
          </SectionCard>

          {/* Achievement vs Payout Analysis */}
          <SectionCard icon={<TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />} title="Achievement vs Payout Analysis">
            <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { k: "Activations Achieved", v: fmtNum(cmActs), tone: "text-gray-900 dark:text-gray-100" },
                { k: "Eligible Activations", v: fmtNum(cmEligible), tone: "text-gray-900 dark:text-gray-100" },
                { k: "Commission Earned", v: fmtOMR(cmEarned), tone: "text-blue-600 dark:text-blue-400" },
                { k: "Commission Paid", v: fmtOMR(cmPaidTotal), tone: "text-emerald-600 dark:text-emerald-400" },
              ].map((x) => (
                <div key={x.k} className="rounded-lg border border-gray-200/70 bg-gray-50/60 p-3 dark:border-gray-700/60 dark:bg-white/[0.03]">
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">{x.k}</p>
                  <p className={`text-lg font-bold ${x.tone}`}>{x.v}</p>
                </div>
              ))}
            </div>
            <DataTable minWidth={720}>
              <HeadRow>
                <Th>Plan</Th>
                <Th align="right">Activations Achieved</Th>
                <Th align="right">Eligible Activations</Th>
                <Th align="right">Commission Earned</Th>
                <Th align="right">Commission Paid</Th>
                <Th align="right">Paid / Earned</Th>
              </HeadRow>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                {D.achievementVsPayout.map((p, i) => {
                  const ratio = p.commissionEarned ? (p.commissionPaid / p.commissionEarned) * 100 : 0;
                  return (
                    <Row key={p.plan} i={i}>
                      <td className={`${td} font-medium text-gray-900 dark:text-gray-100`}>{p.plan}</td>
                      <td className={tdR}>{fmtNum(p.activationsAchieved)}</td>
                      <td className={tdR}>{fmtNum(p.eligibleActivations)}</td>
                      <td className={`${tdR} text-blue-600 dark:text-blue-400`}>{fmtOMR(p.commissionEarned)}</td>
                      <td className={`${tdR} font-semibold text-emerald-600 dark:text-emerald-400`}>{fmtOMR(p.commissionPaid)}</td>
                      <td className={tdR}>
                        <Pill tone={ratio >= 98 ? "green" : ratio >= 90 ? "amber" : "red"}>{ratio.toFixed(0)}%</Pill>
                      </td>
                    </Row>
                  );
                })}
              </tbody>
            </DataTable>
            <p className="mt-2 text-[11px] text-gray-400 dark:text-gray-500">
              "Paid / Earned" below 100% means eligibility holds or clawbacks are reducing payout vs the raw activation performance.
            </p>
          </SectionCard>

          {/* Commission Cycle Status */}
          {FEATURES.retailCommissionCycleStatus && (() => {
            const stages = D.commissionCycle.stages;
            const doneCount = stages.filter((s) => s.status === "done").length;
            const current = stages.find((s) => s.status === "current");
            const payout = stages[stages.length - 1];
            const toPayout = daysUntil(payout.date);
            const trackPct = ((doneCount + (current ? 0.5 : 0)) / stages.length) * 100;
            return (
              <SectionCard
                icon={<Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                title="Commission Cycle Status"
                action={
                  <TableTools>
                    <Pill tone={current ? "blue" : "green"}>{current ? "In progress" : "Complete"}</Pill>
                    <span className="text-xs text-gray-400 dark:text-gray-500">Payout {toPayout > 0 ? `in ${toPayout} days` : "due"}</span>
                  </TableTools>
                }
              >
                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    { k: "Cycle", v: D.commissionCycle.period },
                    { k: "Stages complete", v: `${doneCount} of ${stages.length}` },
                    { k: "Scheduled payout", v: fmtOMR(D.commissionCycle.payoutAmount), sub: fmtDay(payout.date) },
                  ].map((x) => (
                    <div key={x.k} className="rounded-lg border border-gray-200/70 bg-gray-50/60 p-3 dark:border-gray-700/60 dark:bg-white/[0.03]">
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">{x.k}</p>
                      <p className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                        <span>{x.v}</span>
                        {x.sub && (
                          <>
                            <span className="h-3.5 w-px bg-gray-300 dark:bg-gray-600" />
                            <span className="text-[11px] font-normal text-gray-400 dark:text-gray-500">{x.sub}</span>
                          </>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="relative">
                  <div className="absolute left-4 right-4 top-4 hidden h-0.5 bg-gray-200 dark:bg-gray-700 sm:block" />
                  <div className="absolute left-4 top-4 hidden h-0.5 bg-emerald-500 transition-[width] duration-700 sm:block" style={{ width: `calc(${trackPct}% - 2rem)` }} />
                  <ol className="relative flex flex-col gap-5 sm:flex-row sm:justify-between sm:gap-0">
                    {stages.map((s, i) => (
                      <li key={s.label} className="flex items-start gap-3 sm:flex-1 sm:flex-col sm:items-center sm:gap-2 sm:px-1 sm:text-center">
                        <div className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${s.status === "done" ? "border-emerald-500 bg-emerald-500 text-white" : s.status === "current" ? "border-blue-500 bg-blue-500 text-white ring-4 ring-blue-200 dark:ring-blue-900/40" : "border-gray-300 bg-white text-gray-400 dark:border-gray-600 dark:bg-[#07112F] dark:text-gray-500"}`}>
                          {s.status === "done" ? "✓" : i + 1}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-900 dark:text-gray-100">{s.label}</p>
                          <p className={`text-[10px] ${s.status === "done" ? "text-emerald-600 dark:text-emerald-400" : s.status === "current" ? "font-medium text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`}>
                            {s.status === "done" ? `Done · ${fmtDay(s.date)}` : s.status === "current" ? `Due ${fmtDay(s.date)}` : `Est. ${fmtDay(s.date)}`}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </SectionCard>
            );
          })()}
        </TabsContent>
      </Tabs>

      <DrillDialog
        drill={drill}
        onClose={() => setDrill(null)}
        onOpenStaff={(outletName, staffName) => setDrill({ kind: "staff", outlet: outletName, staff: staffName })}
        onOpenOutlet={(outletName, regionName) => setDrill({ kind: "outlet", outlet: outletName, region: regionName })}
        D={D}
      />
    </div>
  );
}

// ---- drill-through dialog: Outlet → Staff → Activation Details ---------------
function DrillDialog({
  drill,
  onClose,
  onOpenStaff,
  onOpenOutlet,
  D,
}: {
  drill: Drill;
  onClose: () => void;
  onOpenStaff: (outlet: string, staff: string) => void;
  onOpenOutlet: (outlet: string, region: string) => void;
  D: RetailData;
}) {
  const [q, setQ] = React.useState("");
  React.useEffect(() => setQ(""), [drill]);

  const regionName = drill?.kind === "region" ? drill.region : "";
  const regionOutletRows = React.useMemo(
    () => (regionName ? D.regionOutlets(regionName) : []),
    [regionName, D],
  );
  const filteredRegionOutlets = regionOutletRows.filter(
    (o) => !q.trim() || o.outlet.toLowerCase().includes(q.trim().toLowerCase()),
  );
  const outletName = drill?.kind === "outlet" || drill?.kind === "staff" ? drill.outlet : "";
  const staffRows = React.useMemo(() => (outletName ? D.staffByOutlet(outletName) : []), [outletName, D]);
  const activationRows = React.useMemo(
    () => (drill?.kind === "staff" ? D.activationsForStaff(drill.outlet, drill.staff) : []),
    [drill, D],
  );

  const filteredStaff = staffRows.filter((s) => !q.trim() || s.staff.toLowerCase().includes(q.trim().toLowerCase()));
  const staffPage = usePaged(filteredStaff, 10, `${outletName}|${q}`);
  const regionOutletsPage = usePaged(filteredRegionOutlets, 10, `${regionName}|${q}`);
  const activationPage = usePaged(activationRows, 10, drill?.kind === "staff" ? `${drill.outlet}|${drill.staff}` : "");
  const rankEntry = D.outletRanking.find((o) => o.outlet === outletName);
  const outletActs = rankEntry?.activations ?? staffRows.reduce((s, x) => s + x.activations, 0);

  return (
    <Dialog open={drill !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[85vh] gap-0 overflow-y-auto sm:max-w-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle>
            {drill?.kind === "staff" ? `${drill.staff}` : drill?.kind === "region" ? regionName : outletName}
          </DialogTitle>
          <DialogDescription className="sr-only">Drill-through</DialogDescription>
        </DialogHeader>

        {drill?.kind === "region" && (
          <div>
            <div className="grid grid-cols-3 gap-2">
              <StatBox label="Outlets" value={fmtNum(regionOutletRows.length)} tone="good" />
              <StatBox label="Activations" value={fmtNum(regionOutletRows.reduce((s, o) => s + o.activations, 0))} />
              <StatBox label="Commission" value={fmtOMR(regionOutletRows.reduce((s, o) => s + o.totalPaid, 0))} tone="warn" />
            </div>
            <div className="mb-2 mt-4">
              <SearchInput value={q} onChange={setQ} placeholder="Search outlet" width="w-full" light />
            </div>
            <DlgTable
              footer={<Pager {...regionOutletsPage} onPage={regionOutletsPage.setPage} />}
              head={
                <tr>
                  <th className={dlgTh}>Outlet</th>
                  <th className={dlgTh}>Account</th>
                  <th className={dlgThR}>Staff</th>
                  <th className={dlgThR}>Activations</th>
                  <th className={dlgThR}>Commission</th>
                  <th className={dlgTh}>{""}</th>
                </tr>
              }
            >
              {filteredRegionOutlets.length === 0 && (
                <tr><td colSpan={6} className="px-3 py-8 text-center text-sm text-gray-400 dark:text-gray-500">No outlets match “{q}”.</td></tr>
              )}
              {regionOutletsPage.pageRows.map((o) => (
                <tr key={o.outlet} onClick={() => onOpenOutlet(o.outlet, regionName)} className="cursor-pointer transition-colors hover:bg-gray-50/70 dark:hover:bg-white/[0.03]">
                  <td className={`${dlgTd} font-medium text-gray-900 dark:text-gray-100`}>{o.outlet}</td>
                  <td className={dlgTd}><Pill tone={o.account === "Managed" ? "blue" : "purple"}>{o.account}</Pill></td>
                  <td className={dlgTdR}>{fmtNum(o.staff)}</td>
                  <td className={`${dlgTdR} font-semibold text-gray-900 dark:text-gray-100`}>{fmtNum(o.activations)}</td>
                  <td className={`${dlgTdR} text-emerald-600 dark:text-emerald-400`}>{fmtOMR(o.totalPaid)}</td>
                  <td className={dlgTd}><ChevronRight className="h-4 w-4 text-gray-300 dark:text-gray-600" /></td>
                </tr>
              ))}
            </DlgTable>
          </div>
        )}

        {drill?.kind === "outlet" && (
          <div>
            <div className="grid grid-cols-3 gap-2">
              <StatBox label="Activations" value={fmtNum(outletActs)} tone="good" />
              <StatBox label="Staff" value={fmtNum(staffRows.length)} />
              <StatBox label="Rank" value={rankEntry ? `#${rankEntry.rank}` : "—"} sub={drill.region} tone="warn" />
            </div>
            <div className="mb-2 mt-4">
              <SearchInput value={q} onChange={setQ} placeholder="Search staff" width="w-full" light />
            </div>
            <DlgTable
              footer={<Pager {...staffPage} onPage={staffPage.setPage} />}
              head={
                <tr>
                  <th className={dlgTh}>Staff</th>
                  <th className={dlgTh}>Type</th>
                  <th className={dlgThR}>Activations</th>
                  <th className={dlgThR}>Share</th>
                  <th className={dlgTh}>{""}</th>
                </tr>
              }
            >
              {filteredStaff.length === 0 && (
                <tr><td colSpan={5} className="px-3 py-8 text-center text-sm text-gray-400 dark:text-gray-500">No staff match “{q}”.</td></tr>
              )}
              {staffPage.pageRows.map((s) => (
                <tr key={s.staff} onClick={() => onOpenStaff(outletName, s.staff)} className="cursor-pointer transition-colors hover:bg-gray-50/70 dark:hover:bg-white/[0.03]">
                  <td className={`${dlgTd} font-medium text-gray-900 dark:text-gray-100`}>{s.staff}</td>
                  <td className={dlgTd}><Pill tone={s.staffType === "Managed" ? "blue" : "purple"}>{s.staffType}</Pill></td>
                  <td className={`${dlgTdR} font-semibold text-gray-900 dark:text-gray-100`}>{fmtNum(s.activations)}</td>
                  <td className={dlgTdR}>{outletActs ? ((s.activations / outletActs) * 100).toFixed(0) : 0}%</td>
                  <td className={dlgTd}><ChevronRight className="h-4 w-4 text-gray-300 dark:text-gray-600" /></td>
                </tr>
              ))}
            </DlgTable>
          </div>
        )}

        {drill?.kind === "staff" && (
          <div>
            <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
              Activation details — <span className="font-medium text-gray-900 dark:text-gray-100">{drill.outlet}</span>
            </p>
            <DlgLabel>Activations</DlgLabel>
            <DlgTable
              footer={<Pager {...activationPage} onPage={activationPage.setPage} />}
              head={
                <tr>
                  <th className={dlgTh}>Ref</th>
                  <th className={dlgTh}>Plan</th>
                  <th className={dlgTh}>Account</th>
                  <th className={dlgTh}>Date</th>
                  <th className={dlgThR}>Eligible</th>
                </tr>
              }
            >
              {activationPage.pageRows.map((a) => (
                <tr key={a.ref}>
                  <td className={`${dlgTd} font-mono text-xs`}>{a.ref}</td>
                  <td className={`${dlgTd} font-medium text-gray-900 dark:text-gray-100`}>{a.plan}</td>
                  <td className={dlgTd}><Pill tone={a.account === "Managed" ? "blue" : "purple"}>{a.account}</Pill></td>
                  <td className={dlgTd}>{fmtDate(a.date)}</td>
                  <td className={dlgTdR}>{a.eligible ? <Pill tone="green">Eligible</Pill> : <Pill tone="gray">On hold</Pill>}</td>
                </tr>
              ))}
            </DlgTable>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
