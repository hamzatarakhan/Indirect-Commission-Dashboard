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
  CalendarOff,
  Building2,
  Calendar,
  Search,
  GitCompare,
  ArrowUp,
  ArrowDown,
  Minus,
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
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
  delta,
  onClick,
}: {
  label: string;
  value: string;
  sub?: React.ReactNode;
  tone?: "neutral" | "good" | "bad";
  progress?: number;
  progressLabel?: string;
  delta?: { current: number; prev: number; fmt?: (n: number) => string; suffix?: string; invert?: boolean };
  onClick?: () => void;
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
    <div
      {...(onClick ? { role: "button", tabIndex: 0, onClick, onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } } } : {})}
      className={`relative flex w-full flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white dark:border-[#E2E8F0]/20 dark:bg-[#07112F] ${
        onClick ? "cursor-pointer transition-colors hover:border-blue-300 hover:bg-blue-50/30 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/[0.06]" : ""
      }`}
    >
      <span className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-blue-400 dark:bg-blue-500" />
      <div className="flex-1 p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
          <p className={`text-2xl font-bold ${toneCls}`}>{value}</p>
          {delta && <Delta {...delta} />}
        </div>
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

// Change vs the comparison period.
function Delta({
  current,
  prev,
  fmt = (n: number) => fmtShort(Math.abs(n)),
  suffix = "",
  invert = false,
}: {
  current: number;
  prev: number;
  fmt?: (n: number) => string;
  suffix?: string;
  invert?: boolean;
}) {
  const diff = current - prev;
  const pct = prev ? (diff / prev) * 100 : 0;
  const flat = Math.abs(pct) < 0.5;
  const good = invert ? diff < 0 : diff > 0;
  const cls = flat
    ? "text-gray-400 dark:text-gray-500"
    : good
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-red-600 dark:text-red-400";
  const Icon = flat ? Minus : diff > 0 ? ArrowUp : ArrowDown;
  return (
    <span className={`inline-flex items-center gap-0.5 whitespace-nowrap text-[11px] font-medium ${cls}`}>
      <Icon className="h-3 w-3" />
      {fmt(diff)}
      {suffix}
      <span className="opacity-70">
        ({pct >= 0 ? "+" : ""}
        {pct.toFixed(0)}%)
      </span>
    </span>
  );
}

// Semicircle gauge — Actual vs Target achievement (KAM-dashboard style).
function GaugeTile({
  label,
  achievement,
  actual,
  target,
  prevActual,
  prevAchievement,
  onClick,
}: {
  label: string;
  achievement: number;
  actual: number;
  target: number;
  prevActual?: number;
  prevAchievement?: number;
  onClick?: () => void;
}) {
  const LEN = Math.PI * 40;
  const INNER = Math.PI * 30;
  const p = Math.max(0, Math.min(100, achievement));
  const color =
    achievement >= 100 ? "#10b981" : achievement >= 90 ? "#f59e0b" : "#ef4444";
  const hasPrev = typeof prevActual === "number";
  const pp = typeof prevAchievement === "number" ? Math.max(0, Math.min(100, prevAchievement)) : null;
  return (
    <div
      {...(onClick ? { role: "button", tabIndex: 0, onClick, onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } } } : {})}
      className={`relative flex flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white dark:border-[#E2E8F0]/20 dark:bg-[#07112F] ${
        onClick ? "cursor-pointer transition-colors hover:border-blue-300 hover:bg-blue-50/30 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/[0.06]" : ""
      }`}
    >
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
            {pp !== null && (
              <>
                <path d="M 20 50 A 30 30 0 0 1 80 50" fill="none" strokeWidth="6" strokeLinecap="round" className="stroke-gray-100 dark:stroke-white/10" />
                <path
                  d="M 20 50 A 30 30 0 0 1 80 50"
                  fill="none"
                  stroke="#a5b4fc"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={INNER}
                  strokeDashoffset={INNER * (1 - pp / 100)}
                  style={{ transition: "stroke-dashoffset .7s ease" }}
                />
              </>
            )}
          </svg>
          <div className="flex flex-1 items-end justify-between gap-2">
            <div>
              <p className="text-2xl font-bold leading-none" style={{ color }}>
                {achievement}%
              </p>
              <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">achievement</p>
            </div>
            {(pp !== null || hasPrev) && (
              <div className="shrink-0 text-right">
                {pp !== null && (
                  <p className="flex items-center justify-end gap-1 text-[11px] text-indigo-500 dark:text-indigo-300">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#a5b4fc]" />
                    prior {Math.round(prevAchievement as number)}%
                  </p>
                )}
                {hasPrev && (
                  <div className="mt-0.5 flex justify-end">
                    <Delta current={actual} prev={prevActual as number} fmt={(n) => fmtShort(Math.abs(n))} />
                  </div>
                )}
              </div>
            )}
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
        className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-8 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-gray-700/60 dark:bg-white/[0.04] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-500/60 dark:focus:bg-white/[0.06] dark:focus:ring-blue-900/30"
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

// Compact dropdown filter for table toolbars.
function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-9 w-full text-xs sm:w-auto sm:min-w-[132px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// A labelled field for the filter card.
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-500 dark:text-gray-400">{label}</label>
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
    <div className="flex h-9 items-stretch gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-white/[0.06]">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`flex items-center rounded-md px-3 text-xs font-medium transition-colors ${
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

// ---- Stat-tile detail dialog ---------------------------------------------

type IndirectData = ReturnType<typeof getIndirectData>;

// KPI box for the dialog summary strip.
function StatBox({
  label,
  value,
  sub,
  tone = "neutral",
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  tone?: "neutral" | "good" | "bad" | "warn";
}) {
  const cls =
    tone === "good"
      ? "text-emerald-600 dark:text-emerald-400"
      : tone === "bad"
        ? "text-red-600 dark:text-red-400"
        : tone === "warn"
          ? "text-amber-600 dark:text-amber-400"
          : "text-gray-900 dark:text-gray-100";
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-2.5 dark:border-gray-700/60 dark:bg-[#07112F]">
      <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">{label}</p>
      <p className={`mt-0.5 text-base font-bold ${cls}`}>{value}</p>
      {sub && <p className="text-[10px] text-gray-400 dark:text-gray-500">{sub}</p>}
    </div>
  );
}

// Section label inside a dialog.
function DlgLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 mt-5 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
      {children}
    </p>
  );
}

// Styled table for dialogs.
function DlgTable({ head, children }: { head: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-700/60 dark:bg-[#07112F]">
      <table className="w-full text-sm">
        <thead className="border-b border-gray-200 bg-white text-[10px] uppercase tracking-wide text-gray-400 dark:border-gray-700/60 dark:bg-[#07112F] dark:text-gray-500">
          {head}
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">{children}</tbody>
      </table>
    </div>
  );
}
const dlgTh = "px-3 py-2 text-left font-semibold";
const dlgThR = "px-3 py-2 text-right font-semibold";
const dlgTd = "px-3 py-2 text-gray-700 dark:text-gray-300";
const dlgTdR = "px-3 py-2 text-right tabular-nums text-gray-700 dark:text-gray-300";

function StatDetailDialog({
  open,
  onClose,
  D,
  P,
  cmpLabel,
  quarter,
  year,
  comparisonQuarter,
  comparisonYear,
}: {
  open: "revenue" | "activations" | "net" | "inactive" | null;
  onClose: () => void;
  D: IndirectData;
  P: IndirectData | null;
  cmpLabel: string;
  quarter: string;
  year: string;
  comparisonQuarter: string;
  comparisonYear: string;
}) {
  const priorCol = `${comparisonQuarter} ${comparisonYear}`;
  const revTotal = D.revenueContribution.reduce((s, r) => s + r.value, 0);
  const actMax = Math.max(1, ...D.revenueContribution.map((r) => r.value));

  const totTarget = D.activationByType.reduce((s, a) => s + a.target, 0);
  const totActual = D.activationByType.reduce((s, a) => s + a.actual, 0);
  const termRate = D.totalActivations ? (D.totalTerminations / D.totalActivations) * 100 : 0;

  const [q, setQ] = React.useState("");
  React.useEffect(() => setQ(""), [open]);
  const inactiveRows = D.inactiveCRList.filter((c) => {
    const s = q.trim().toLowerCase();
    return !s || c.name.toLowerCase().includes(s) || c.partner.toLowerCase().includes(s) || c.cr.toLowerCase().includes(s);
  });

  const titles: Record<string, string> = {
    revenue: "Revenue — Actual vs Target",
    activations: "Activations by Type",
    net: "Net Activations",
    inactive: "Inactive CRs (24+ months)",
  };

  return (
    <Dialog open={open !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className={`max-h-[85vh] gap-0 overflow-y-auto ${open === "inactive" ? "sm:max-w-3xl" : "sm:max-w-2xl"}`}
      >
        <DialogHeader>
          <DialogTitle>{open ? titles[open] : ""}</DialogTitle>
          <DialogDescription>
            {P ? `${cmpLabel} — figures for the current period` : "Current period breakdown"}
          </DialogDescription>
        </DialogHeader>

        {open === "revenue" && (
          <div>
            <div className="grid grid-cols-3 gap-2">
              <StatBox label="Actual" value={fmtOMR(D.revenueActual)} tone={D.revenueAchievement >= 100 ? "good" : "warn"} />
              <StatBox label="Target" value={fmtOMR(D.revenueTarget)} />
              <StatBox
                label="Achievement"
                value={`${D.revenueAchievement}%`}
                sub={P ? `${priorCol}: ${P.revenueAchievement}%` : undefined}
                tone={D.revenueAchievement >= 100 ? "good" : "warn"}
              />
            </div>
            <DlgLabel>Revenue by activation type</DlgLabel>
            <DlgTable
              head={
                <tr>
                  <th className={dlgTh}>Channel</th>
                  <th className={dlgThR}>Revenue</th>
                  <th className={dlgThR}>Share</th>
                </tr>
              }
            >
              {D.revenueContribution.map((r) => (
                <tr key={r.name}>
                  <td className={dlgTd}>
                    <span className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: r.color }} />
                      <span className="font-medium text-gray-900 dark:text-gray-100">{r.name}</span>
                    </span>
                  </td>
                  <td className={`${dlgTdR} font-semibold text-gray-900 dark:text-gray-100`}>{fmtOMR(r.value)}</td>
                  <td className={dlgTdR}>
                    <span className="inline-flex items-center gap-2">
                      <span className="hidden h-1.5 w-14 overflow-hidden rounded-full bg-gray-100 sm:block dark:bg-white/[0.08]">
                        <span className="block h-full rounded-full" style={{ width: `${(r.value / actMax) * 100}%`, background: r.color }} />
                      </span>
                      {revTotal ? ((r.value / revTotal) * 100).toFixed(1) : 0}%
                    </span>
                  </td>
                </tr>
              ))}
            </DlgTable>
          </div>
        )}

        {open === "activations" && (
          <div>
            <div className="grid grid-cols-3 gap-2">
              <StatBox label="Actual" value={fmtNum(totActual)} tone={totActual >= totTarget ? "good" : "bad"} />
              <StatBox label="Target" value={fmtNum(totTarget)} />
              <StatBox
                label="Achievement"
                value={`${totTarget ? Math.round((totActual / totTarget) * 100) : 0}%`}
                tone={totActual >= totTarget ? "good" : "bad"}
              />
            </div>
            <DlgLabel>By activation type</DlgLabel>
            <DlgTable
              head={
                <tr>
                  <th className={dlgTh}>Type</th>
                  <th className={dlgThR}>Target</th>
                  <th className={dlgThR}>Actual</th>
                  <th className={dlgThR}>Achv.</th>
                  {P && <th className={dlgThR}>{priorCol}</th>}
                </tr>
              }
            >
              {D.activationByType.map((a, i) => {
                const prior = P?.activationByType[i]?.actual;
                const achv = a.target ? Math.round((a.actual / a.target) * 100) : 0;
                return (
                  <tr key={a.type}>
                    <td className={`${dlgTd} font-medium text-gray-900 dark:text-gray-100`}>{a.type}</td>
                    <td className={dlgTdR}>{fmtNum(a.target)}</td>
                    <td className={`${dlgTdR} font-semibold text-gray-900 dark:text-gray-100`}>{fmtNum(a.actual)}</td>
                    <td className={dlgTdR}>
                      <Pill tone={achv >= 100 ? "green" : achv >= 90 ? "amber" : "red"}>{achv}%</Pill>
                    </td>
                    {P && <td className={dlgTdR}>{prior != null ? fmtNum(prior) : "—"}</td>}
                  </tr>
                );
              })}
              <tr className="border-t-2 border-gray-200 bg-white font-semibold text-gray-900 dark:border-gray-700 dark:bg-[#07112F] dark:text-gray-100">
                <td className={dlgTd}>Total</td>
                <td className={dlgTdR}>{fmtNum(totTarget)}</td>
                <td className={dlgTdR}>{fmtNum(totActual)}</td>
                <td className={dlgTdR} />
                {P && <td className={dlgTdR}>{fmtNum(P.activationByType.reduce((s, a) => s + a.actual, 0))}</td>}
              </tr>
            </DlgTable>
          </div>
        )}

        {open === "net" && (
          <div>
            <div className="grid grid-cols-3 gap-2">
              <StatBox label="Activations" value={fmtNum(D.totalActivations)} tone="good" />
              <StatBox label="Terminations" value={fmtNum(D.totalTerminations)} tone="bad" />
              <StatBox label="Net" value={fmtNum(D.netActivations)} sub={`${termRate.toFixed(1)}% churn`} tone="good" />
            </div>
            <DlgLabel>Monthly trend</DlgLabel>
            <DlgTable
              head={
                <tr>
                  <th className={dlgTh}>Period</th>
                  <th className={dlgThR}>Activations</th>
                  <th className={dlgThR}>Terminations</th>
                  <th className={dlgThR}>Net</th>
                </tr>
              }
            >
              {D.netActivationsTrend.map((m) => (
                <tr key={m.period}>
                  <td className={`${dlgTd} font-medium text-gray-900 dark:text-gray-100`}>{m.period}</td>
                  <td className={`${dlgTdR} text-emerald-600 dark:text-emerald-400`}>{fmtNum(m.activations)}</td>
                  <td className={`${dlgTdR} text-red-600 dark:text-red-400`}>{fmtNum(m.terminations)}</td>
                  <td className={`${dlgTdR} font-semibold text-gray-900 dark:text-gray-100`}>{fmtNum(m.activations - m.terminations)}</td>
                </tr>
              ))}
            </DlgTable>
          </div>
        )}

        {open === "inactive" && (
          <div>
            <div className="grid grid-cols-3 gap-2">
              <StatBox label="Dormant CRs" value={fmtNum(D.inactiveCRs)} tone="bad" />
              <StatBox label="Showing" value={`${inactiveRows.length} / ${D.inactiveCRList.length}`} sub="sample" />
              <StatBox
                label="Avg dormant"
                value={`${Math.round(D.inactiveCRList.reduce((s, c) => s + c.monthsInactive, 0) / Math.max(1, D.inactiveCRList.length))} mo`}
                tone="warn"
              />
            </div>
            <div className="mb-2 mt-4">
              <SearchInput value={q} onChange={setQ} placeholder="Search company / partner / CR" width="w-full" />
            </div>
            <DlgTable
              head={
                <tr>
                  <th className={dlgTh}>Company</th>
                  <th className={dlgTh}>Partner</th>
                  <th className={dlgTh}>Last activation</th>
                  <th className={dlgThR}>Dormant</th>
                </tr>
              }
            >
              {inactiveRows.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
                    No companies match “{q}”.
                  </td>
                </tr>
              )}
              {inactiveRows.map((c) => (
                <tr key={c.cr}>
                  <td className={`${dlgTd} font-medium text-gray-900 dark:text-gray-100`}>{c.name}</td>
                  <td className={dlgTd}>{c.partner}</td>
                  <td className={dlgTd}>{fmtDate(c.lastActivation)}</td>
                  <td className={dlgTdR}>
                    <Pill tone={c.monthsInactive >= 30 ? "red" : "amber"}>{c.monthsInactive} mo</Pill>
                  </td>
                </tr>
              ))}
            </DlgTable>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface Props {
  period: string;
  quarter: string;
  year: string;
  comparisonMode?: boolean;
  comparisonQuarter?: string;
  comparisonYear?: string;
}

export function IndirectCommissionDashboard({
  period,
  quarter,
  year,
  comparisonMode = false,
  comparisonQuarter = "Q2",
  comparisonYear = "2024",
}: Props) {
  // Period comes from the top header (Yearly / Quarterly / Monthly).
  const granularity: "Month" | "Quarter" | "Year" =
    period === "Yearly" ? "Year" : period === "Monthly" ? "Month" : "Quarter";

  const [partner, setPartner] = React.useState<string>(PARTNERS[0]);
  const [planFilter, setPlanFilter] = React.useState("All Plans");

  const isMobile = useIsMobile();

  // Stat-tile detail dialog
  const [detail, setDetail] = React.useState<"revenue" | "activations" | "net" | "inactive" | null>(null);

  // Performance Overview view + per-table search
  const [overviewView, setOverviewView] = React.useState<"charts" | "table">("charts");
  const [crSearch, setCrSearch] = React.useState("");
  const [inactiveSearch, setInactiveSearch] = React.useState("");
  const [atSearch, setAtSearch] = React.useState("");
  const [atSeg, setAtSeg] = React.useState<"all" | "Base" | "Other Segment">("all");
  const [hvSearch, setHvSearch] = React.useState("");
  const [hvStatus, setHvStatus] = React.useState<"all" | "eligible" | "hold">("all");

  // Achievement vs Payout by Plan filters
  const [planSearch, setPlanSearch] = React.useState("");
  const [planStatus, setPlanStatus] = React.useState("All statuses");
  const [plan2ndBill, setPlan2ndBill] = React.useState("Any 2nd bill");
  const [planElig, setPlanElig] = React.useState("Any eligibility");

  // Everything the dashboard renders is derived here from the active filters.
  const D = React.useMemo(
    () => getIndirectData({ granularity, partner, quarter, year }),
    [granularity, partner, quarter, year],
  );

  // Comparison-period dataset (only used when Compare is on in the header).
  const P = React.useMemo(
    () =>
      comparisonMode
        ? getIndirectData({ granularity, partner, quarter: comparisonQuarter, year: comparisonYear })
        : null,
    [comparisonMode, granularity, partner, comparisonQuarter, comparisonYear],
  );

  const cmpLabel =
    granularity === "Year"
      ? `${year} vs ${comparisonYear}`
      : `${quarter} ${year} vs ${comparisonQuarter} ${comparisonYear}`;

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
    const matchesSearch = !q || r.plan.toLowerCase().includes(q);
    const matchesStatus =
      planStatus === "All statuses" ||
      (planStatus === "Qualified" ? r.qualified : !r.qualified);
    const matches2ndBill = plan2ndBill === "Any 2nd bill" || r.secondBillStatus === plan2ndBill;
    const matchesElig = planElig === "Any eligibility" || r.eligibilityImpact === planElig;
    return matchesSearch && matchesStatus && matches2ndBill && matchesElig;
  });

  const planFiltersActive =
    planStatus !== "All statuses" ||
    plan2ndBill !== "Any 2nd bill" ||
    planElig !== "Any eligibility" ||
    planFilter !== "All Plans" ||
    planSearch.trim() !== "";

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
    prevValue: P?.revenueContribution.find((x) => x.name === r.name)?.value,
  }));

  // Merge the comparison-period series into the chart data when Compare is on.
  const activationByTypeData = D.activationByType.map((a, i) => {
    const prior = P?.activationByType[i]?.actual;
    const priorTarget = P?.activationByType[i]?.target;
    return {
      ...a,
      prior,
      priorTarget,
      achv: a.target ? (a.actual / a.target) * 100 : 0,
      priorAchv: prior != null && priorTarget ? (prior / priorTarget) * 100 : null,
    };
  });
  const netActivationsData = D.netActivationsTrend.map((m, i) => ({
    ...m,
    priorActivations: P?.netActivationsTrend[i]?.activations,
    priorTerminations: P?.netActivationsTrend[i]?.terminations,
  }));
  const priorTotalActivations = P?.activationByType.reduce((s, a) => s + a.actual, 0) ?? 0;

  // % change vs prior, drawn above the "Actual" bar so this chart carries the
  // same delta cue as the tables/tiles.
  const renderTypeDelta = (props: any) => {
    const { x, y, width, index } = props;
    const row = activationByTypeData[index];
    if (!row || row.prior == null) return null;
    const diff = row.actual - row.prior;
    const pct = row.prior ? (diff / row.prior) * 100 : 0;
    const flat = Math.abs(pct) < 0.5;
    const color = flat ? "#9ca3af" : diff > 0 ? "#059669" : "#dc2626";
    const arrow = flat ? "→" : diff > 0 ? "▲" : "▼";
    return (
      <text x={x + width / 2} y={y - 15} textAnchor="middle" fill={color} fontSize={10} fontWeight={600}>
        {arrow} {pct >= 0 ? "+" : ""}{pct.toFixed(0)}%
      </text>
    );
  };
  // Achievement (% of target) as a small pill inside a bar (RevenueMatrix style).
  const renderAchvPill = (key: "achv" | "priorAchv") => (props: any) => {
    const { x, y, width, height, index } = props;
    const row = activationByTypeData[index];
    const v = row?.[key];
    if (v == null || height < 24 || width < 24) return null;
    const label = `${v.toFixed(0)}%`;
    const pw = label.length * 5.6 + 10;
    const ph = 14;
    const cx = x + width / 2;
    const py = y + height - ph - 4;
    const good = v >= 100;
    return (
      <g>
        <rect x={cx - pw / 2} y={py} width={pw} height={ph} rx={7} fill="#ffffff" opacity={0.92} />
        <text
          x={cx}
          y={py + ph - 4}
          textAnchor="middle"
          fill={good ? "#059669" : "#d97706"}
          fontSize={9}
          fontWeight={700}
        >
          {label}
        </text>
      </g>
    );
  };
  // Rich tooltip: old vs new target + achievement per activation type.
  const ActivationTypeTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const row = activationByTypeData.find((r) => r.type === label);
    if (!row) return null;
    const cell = "px-2 py-0.5 text-right tabular-nums";
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-2.5 text-[11px] shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <p className="mb-1 font-semibold text-gray-900 dark:text-gray-100">{row.type}</p>
        <table className="text-gray-600 dark:text-gray-300">
          <thead>
            <tr className="text-[10px] uppercase text-gray-400">
              <th className="pr-2 text-left font-medium"> </th>
              {row.prior != null && <th className={cell}>{`${comparisonQuarter} ${comparisonYear}`}</th>}
              <th className={cell}>{`${quarter} ${year}`}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pr-2 text-left">Activations</td>
              {row.prior != null && <td className={cell}>{fmtNum(row.prior)}</td>}
              <td className={`${cell} font-semibold text-gray-900 dark:text-gray-100`}>{fmtNum(row.actual)}</td>
            </tr>
            <tr>
              <td className="pr-2 text-left">Target</td>
              {row.prior != null && <td className={cell}>{row.priorTarget != null ? fmtNum(row.priorTarget) : "—"}</td>}
              <td className={cell}>{fmtNum(row.target)}</td>
            </tr>
            <tr>
              <td className="pr-2 text-left">Achievement</td>
              {row.prior != null && <td className={cell}>{row.priorAchv != null ? `${row.priorAchv.toFixed(0)}%` : "—"}</td>}
              <td className={`${cell} font-semibold ${row.achv >= 100 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                {row.achv.toFixed(0)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  const planCmpData = D.planRows.map((r) => {
    const pr = P?.planRows.find((x) => x.plan === r.plan);
    return { ...r, priorAch: pr?.achievement, priorPct: pr?.commissionPct };
  });

  return (
    <div className="space-y-3">
      {comparisonMode && (
        <div className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs text-indigo-800 dark:border-indigo-800/50 dark:bg-indigo-900/20 dark:text-indigo-200">
          <GitCompare className="h-4 w-4 shrink-0" />
          <span>
            Comparison mode — <span className="font-semibold">{cmpLabel}</span>. Figures below show the change vs the comparison period.
          </span>
        </div>
      )}

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
          {/* Overview stat row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <GaugeTile
              label="Revenue — Actual vs Target"
              achievement={D.revenueAchievement}
              actual={revenueActual}
              target={revenueTarget}
              prevActual={P?.revenueActual}
              prevAchievement={P?.revenueAchievement}
              onClick={() => setDetail("revenue")}
            />
            <StatTile
              label="Activations — Actual vs Target"
              value={fmtNum(totalActual)}
              tone={totalActual >= totalTarget ? "good" : "bad"}
              sub={`Target ${fmtNum(totalTarget)}`}
              progress={(totalActual / totalTarget) * 100}
              progressLabel={`of target · ${fmtNum(totalTarget)}`}
              delta={
                P
                  ? { current: totalActual, prev: P.activationByType.reduce((s, a) => s + a.actual, 0) }
                  : undefined
              }
              onClick={() => setDetail("activations")}
            />
            <StatTile
              label="Net Activations"
              value={fmtNum(netActivations)}
              tone="good"
              sub={`${fmtNum(totalActivations)} activations − ${fmtNum(totalTerminations)} terminations`}
              progress={(netActivations / totalActivations) * 100}
              progressLabel="activation retention"
              delta={P ? { current: netActivations, prev: P.netActivations } : undefined}
              onClick={() => setDetail("net")}
            />
            <StatTile
              label="Inactive CRs (2 yrs)"
              value={fmtNum(inactiveCRs)}
              tone="bad"
              sub="No activations in 24 months — tap for the list"
              progress={(inactiveCRs / crBase) * 100}
              progressLabel={`of ${fmtNum(crBase)} CRs`}
              delta={P ? { current: inactiveCRs, prev: P.inactiveCRs, fmt: (n) => fmtNum(Math.abs(Math.round(n))), invert: true } : undefined}
              onClick={() => setDetail("inactive")}
            />
          </div>

          <StatDetailDialog
            open={detail}
            onClose={() => setDetail(null)}
            D={D}
            P={P}
            cmpLabel={cmpLabel}
            quarter={quarter}
            year={year}
            comparisonQuarter={comparisonQuarter}
            comparisonYear={comparisonYear}
          />

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
                  comparisonMode={comparisonMode}
                  comparisonYear={comparisonYear}
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
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="shrink-0 rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                      <Target className="h-4 w-4 text-blue-600 dark:text-blue-400 sm:h-5 sm:w-5" />
                    </div>
                    <h2
                      className="min-w-0 font-['Roboto',sans-serif] text-[14px] font-medium text-[#000b25] dark:text-gray-100 sm:text-[17px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Performance Overview
                    </h2>
                  </div>
                  <TableTools>
                    {viewToggle}
                    <SearchInput value={crSearch} onChange={setCrSearch} placeholder="Search by name or CR number" />
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {crRows.length} of {D.crPerformance.length}
                    </span>
                  </TableTools>
                </div>
                {(() => {
              const tRevA = crRows.reduce((s, c) => s + c.revenueActual, 0);
              const tRevT = crRows.reduce((s, c) => s + c.revenueTarget, 0);
              const tAct = crRows.reduce((s, c) => s + c.activations, 0);
              const priorFor = (cr: string) => P?.crPerformance.find((x) => x.cr === cr);
              const pRevA = P ? crRows.reduce((s, c) => s + (priorFor(c.cr)?.revenueActual ?? 0), 0) : 0;
              const pAct = P ? crRows.reduce((s, c) => s + (priorFor(c.cr)?.activations ?? 0), 0) : 0;
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
                    {crRows.map((c, i) => {
                      const pc = priorFor(c.cr);
                      return (
                      <Row key={c.cr} i={i}>
                        <td className={td}>
                          <span className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-600 dark:bg-white/[0.06] dark:text-gray-400">
                            {c.cr}
                          </span>
                        </td>
                        <td className={`${td} font-medium text-gray-900 dark:text-gray-100`}>{c.name}</td>
                        <td className={`${td} text-gray-500 dark:text-gray-400`}>{c.partner}</td>
                        <td className={tdR}>
                          <div className="flex flex-col items-end">
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{fmtOMR(c.revenueActual)}</span>
                            {pc && <Delta current={c.revenueActual} prev={pc.revenueActual} fmt={(n) => fmtOMR(Math.abs(n))} />}
                          </div>
                        </td>
                        <td className={tdR}>{fmtOMR(c.revenueTarget)}</td>
                        <td className={tdR}>
                          <div className="flex flex-col items-end">
                            <div className="flex items-center justify-end gap-2">
                              <span className={`font-semibold ${c.achievement >= 100 ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-gray-100"}`}>
                                {c.achievement}%
                              </span>
                              <MiniBar value={c.achievement} tone={c.achievement >= 100 ? "green" : c.achievement >= 90 ? "amber" : "red"} />
                            </div>
                            {pc && <Delta current={c.achievement} prev={pc.achievement} fmt={(n) => Math.abs(Math.round(n)).toString()} suffix="pp" />}
                          </div>
                        </td>
                        <td className={tdR}>
                          <div className="flex flex-col items-end">
                            <span>
                              <span className="font-semibold text-gray-900 dark:text-gray-100">{fmtNum(c.activations)}</span>
                              <span className="ml-1 text-[10px] text-gray-400 dark:text-gray-500">
                                H{fmtNum(c.hunting)}·F{fmtNum(c.farming)}·P{fmtNum(c.portIn)}·U{fmtNum(c.upgrades)}
                              </span>
                            </span>
                            {pc && <Delta current={c.activations} prev={pc.activations} fmt={(n) => fmtNum(Math.abs(Math.round(n)))} />}
                          </div>
                        </td>
                      </Row>
                      );
                    })}
                  </tbody>
                  {crRows.length > 0 && (
                    <tfoot className="border-t-2 border-gray-200 bg-gray-50/60 dark:border-gray-700/60 dark:bg-white/[0.03]">
                      <tr>
                        <td className={`${td} font-semibold text-gray-900 dark:text-gray-100`} colSpan={3}>
                          Total ({crRows.length} CRs)
                        </td>
                        <td className={tdR}>
                          <div className="flex flex-col items-end">
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">{fmtOMR(tRevA)}</span>
                            {P && <Delta current={tRevA} prev={pRevA} fmt={(n) => fmtOMR(Math.abs(n))} />}
                          </div>
                        </td>
                        <td className={`${tdR} font-semibold`}>{fmtOMR(tRevT)}</td>
                        <td className={`${tdR} font-bold`}>{clampAch((tRevA / tRevT) * 100)}%</td>
                        <td className={tdR}>
                          <div className="flex flex-col items-end">
                            <span className="font-bold text-gray-900 dark:text-gray-100">{fmtNum(tAct)}</span>
                            {P && <Delta current={tAct} prev={pAct} fmt={(n) => fmtNum(Math.abs(Math.round(n)))} />}
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </DataTable>
                  );
                })()}
              </motion.div>
            );
          })()}

          {/* Inactive CRs — no activation in 24+ months. Hidden — surfaced via the tile's detail dialog. */}
          {false && (() => {
            const q = inactiveSearch.trim().toLowerCase();
            const rows = D.inactiveCRList.filter(
              (c) => !q || c.name.toLowerCase().includes(q) || c.cr.toLowerCase().includes(q) || c.partner.toLowerCase().includes(q),
            );
            return (
              <SectionCard
                icon={<CalendarOff className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                title="Inactive CRs — no activation in the last 24 months"
                action={
                  <TableTools>
                    <SearchInput value={inactiveSearch} onChange={setInactiveSearch} placeholder="Search company / CR / partner" />
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {rows.length} of {D.inactiveCRs} dormant CRs
                    </span>
                  </TableTools>
                }
              >
                <p className="mb-3 text-[11px] text-gray-400 dark:text-gray-500">
                  Sample of the {fmtNum(D.inactiveCRs)} CRs with no recorded activation in 24+ months — the accounts to target for re-engagement.
                </p>
                <DataTable minWidth={720}>
                  <HeadRow>
                    <Th>CR</Th>
                    <Th>Company</Th>
                    <Th>Partner</Th>
                    <Th>Last activation</Th>
                    <Th align="right">Dormant</Th>
                    <Th align="right">Last revenue</Th>
                  </HeadRow>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                    {rows.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-10 text-center text-sm text-gray-400 dark:text-gray-500">
                          No dormant CRs match “{inactiveSearch}”.
                        </td>
                      </tr>
                    )}
                    {rows.map((c, i) => (
                      <Row key={c.cr} i={i}>
                        <td className={td}>
                          <span className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-600 dark:bg-white/[0.06] dark:text-gray-400">
                            {c.cr}
                          </span>
                        </td>
                        <td className={`${td} font-medium text-gray-900 dark:text-gray-100`}>
                          <span className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
                            {c.name}
                          </span>
                        </td>
                        <td className={`${td} text-gray-500 dark:text-gray-400`}>{c.partner}</td>
                        <td className={td}>
                          <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3.5 w-3.5" />
                            {fmtDate(c.lastActivation)}
                          </span>
                        </td>
                        <td className={tdR}>
                          <Pill tone={c.monthsInactive >= 30 ? "red" : "amber"}>{c.monthsInactive} mo</Pill>
                        </td>
                        <td className={`${tdR} text-gray-600 dark:text-gray-300`}>{fmtOMR(c.lastRevenue)}</td>
                      </Row>
                    ))}
                  </tbody>
                </DataTable>
              </SectionCard>
            );
          })()}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance by Activation type */}
            <SectionCard
              icon={<Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
              title="Performance by Activation Type"
              action={
                P && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>Total activations · {cmpLabel}</span>
                    <Delta
                      current={totalActual}
                      prev={priorTotalActivations}
                      fmt={(n) => fmtNum(Math.abs(Math.round(n)))}
                    />
                  </div>
                )
              }
            >
              <ResponsiveContainer width="100%" height={comparisonMode ? 310 : 280}>
                <BarChart data={activationByTypeData} margin={{ top: comparisonMode ? 34 : 20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  {comparisonMode ? (
                    <RTooltip content={<ActivationTypeTooltip />} />
                  ) : (
                    <RTooltip formatter={(v: number) => fmtNum(v)} />
                  )}
                  <Legend />
                  {!comparisonMode && (
                    <Bar dataKey="target" name="Target" fill="#cbd5e1" radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="target" position="top" formatter={fmtShort} className="fill-gray-500 text-[11px]" />
                    </Bar>
                  )}
                  {comparisonMode && (
                    <Bar dataKey="prior" name={`Prior · ${comparisonQuarter} ${comparisonYear}`} fill="#a5b4fc" radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="prior" position="top" formatter={fmtShort} className="fill-indigo-400 text-[10px]" />
                      <LabelList dataKey="prior" content={renderAchvPill("priorAchv")} />
                    </Bar>
                  )}
                  <Bar dataKey="actual" name={comparisonMode ? `Now · ${quarter} ${year}` : "Actual"} fill="#3b82f6" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="actual" position="top" formatter={fmtShort} className="fill-gray-900 dark:fill-gray-100 text-[11px] font-semibold" />
                    {comparisonMode && <LabelList dataKey="actual" content={renderTypeDelta} />}
                    {comparisonMode && <LabelList dataKey="actual" content={renderAchvPill("achv")} />}
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
                <div className="mx-auto w-full max-w-[300px] space-y-2 sm:mx-0">
                  {revContrib.map((r) => (
                    <div key={r.name} className="flex items-center justify-between gap-3 text-sm">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
                        <span className="text-gray-700 dark:text-gray-300">{r.name}</span>
                      </span>
                      <span className="flex flex-col items-end">
                        <span className="whitespace-nowrap">
                          <span className="font-semibold text-gray-900 dark:text-gray-100">{fmtOMR(r.value)}</span>
                          <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">{r.pct.toFixed(1)}%</span>
                        </span>
                        {typeof r.prevValue === "number" && (
                          <Delta current={r.value} prev={r.prevValue} fmt={(n) => fmtOMR(Math.abs(n))} />
                        )}
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
                    {atRows.map((r, i) => {
                      const pr = P?.activationTypeBreakdown.find(
                        (x) => x.channel === r.channel && x.segment === r.segment,
                      );
                      return (
                      <Row key={`${r.channel}-${r.segment}`} i={i}>
                        <td className={`${td} font-medium text-gray-900 dark:text-gray-100`}>{r.channel}</td>
                        <td className={td}>
                          <Pill tone={r.segment === "Base" ? "blue" : "purple"}>{r.segment}</Pill>
                        </td>
                        <td className={tdR}>
                          <div className="flex flex-col items-end gap-0.5">
                            <div className="flex items-center gap-2.5">
                              <span className="font-semibold text-gray-900 dark:text-gray-100">{fmtNum(r.count)}</span>
                              <MiniBar value={r.count} max={maxCount} />
                            </div>
                            {pr && <Delta current={r.count} prev={pr.count} fmt={(n) => fmtNum(Math.abs(Math.round(n)))} />}
                          </div>
                        </td>
                        <td className={tdR}>
                          <div className="flex flex-col items-end">
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{fmtOMR(r.revenue)}</span>
                            {pr && <Delta current={r.revenue} prev={pr.revenue} fmt={(n) => fmtOMR(Math.abs(n))} />}
                          </div>
                        </td>
                        <td className={tdR}>{fmtOMR(Math.round(r.revenue / r.count))}</td>
                      </Row>
                      );
                    })}
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
                <SegTabs
                  value={hvStatus}
                  onChange={setHvStatus}
                  options={[
                    { value: "all", label: "All" },
                    { value: "eligible", label: "Eligible" },
                    { value: "hold", label: "On hold" },
                  ]}
                />
                <SearchInput value={hvSearch} onChange={setHvSearch} placeholder="Search CR or customer" />
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {hvRows.length} of {D.huntingValidation.length}
                </span>
              </TableTools>
            }
          >
            {comparisonMode && (
              <p className="mb-3 text-[11px] text-gray-400 dark:text-gray-500">
                Point-in-time roster — shows the current period only, no period-over-period change.
              </p>
            )}
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
            <SectionCard
              icon={<Repeat className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
              title="Net Activations (Activations vs Terminations)"
              action={
                P && (
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center gap-1">
                      Activations
                      <Delta current={totalActivations} prev={P.totalActivations} fmt={(n) => fmtNum(Math.abs(Math.round(n)))} />
                    </span>
                    <span className="inline-flex items-center gap-1">
                      Terminations
                      <Delta current={totalTerminations} prev={P.totalTerminations} fmt={(n) => fmtNum(Math.abs(Math.round(n)))} invert />
                    </span>
                    <span className="inline-flex items-center gap-1">
                      Net
                      <Delta current={netActivations} prev={P.netActivations} fmt={(n) => fmtNum(Math.abs(Math.round(n)))} />
                    </span>
                  </div>
                )
              }
            >
              <ResponsiveContainer width="100%" height={comparisonMode ? 300 : 280}>
                <BarChart data={netActivationsData} margin={{ top: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <RTooltip formatter={(v: number) => fmtNum(v)} />
                  <Legend />
                  {comparisonMode && (
                    <Bar dataKey="priorActivations" name={`Prior activations (${comparisonQuarter} ${comparisonYear})`} fill="#6ee7b7" radius={[4, 4, 0, 0]} />
                  )}
                  <Bar dataKey="activations" name="Activations" fill="#10b981" radius={[4, 4, 0, 0]}>
                    {!comparisonMode && (
                      <LabelList dataKey="activations" position="top" formatter={fmtShort} className="fill-gray-900 dark:fill-gray-100 text-[11px] font-semibold" />
                    )}
                  </Bar>
                  {comparisonMode && (
                    <Bar dataKey="priorTerminations" name={`Prior terminations (${comparisonQuarter} ${comparisonYear})`} fill="#fca5a5" radius={[4, 4, 0, 0]} />
                  )}
                  <Bar dataKey="terminations" name="Terminations" fill="#ef4444" radius={[4, 4, 0, 0]}>
                    {!comparisonMode && (
                      <LabelList dataKey="terminations" position="top" formatter={fmtShort} className="fill-gray-500 text-[11px]" />
                    )}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </SectionCard>

            <SectionCard icon={<TrendingDown className="w-5 h-5 text-blue-600 dark:text-blue-400" />} title="Terminations Analysis">
              <div className="flex flex-wrap gap-x-8 gap-y-3 mb-5">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Terminations</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{fmtNum(totalTerminations)}</p>
                  {P && (
                    <Delta
                      current={totalTerminations}
                      prev={P.totalTerminations}
                      fmt={(n) => fmtNum(Math.abs(Math.round(n)))}
                      invert
                    />
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Termination Rate</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {((totalTerminations / totalActivations) * 100).toFixed(1)}%
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">of gross activations</p>
                  {P && (
                    <Delta
                      current={(totalTerminations / totalActivations) * 100}
                      prev={(P.totalTerminations / P.totalActivations) * 100}
                      fmt={(n) => Math.abs(n).toFixed(1)}
                      suffix="pp"
                      invert
                    />
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Within 2nd-bill window</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {fmtNum(D.terminationsByType.reduce((s, t) => s + t.within2ndBill, 0))}
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">commission at risk</p>
                  {P && (
                    <Delta
                      current={D.terminationsByType.reduce((s, t) => s + t.within2ndBill, 0)}
                      prev={P.terminationsByType.reduce((s, t) => s + t.within2ndBill, 0)}
                      fmt={(n) => fmtNum(Math.abs(Math.round(n)))}
                      invert
                    />
                  )}
                </div>
              </div>

              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2.5">By activation type</p>
              <div className="space-y-3">
                {[...D.terminationsByType]
                  .sort((a, b) => b.count - a.count)
                  .map((t) => {
                    const share = (t.count / totalTerminations) * 100;
                    const pt = P?.terminationsByType.find((x) => x.type === t.type);
                    return (
                      <div key={t.type}>
                        <div className="flex items-baseline justify-between text-xs mb-1">
                          <span className="text-gray-700 dark:text-gray-300">{t.type}</span>
                          <span className="flex items-baseline gap-1.5 text-gray-500 dark:text-gray-400">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">{fmtNum(t.count)}</span>
                            {" · "}
                            {share.toFixed(0)}%
                            {pt && <Delta current={t.count} prev={pt.count} fmt={(n) => fmtNum(Math.abs(Math.round(n)))} invert />}
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
          {/* Commission filters */}
          <div className={`${cardShell} p-4`}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <Field label="Partner">
                <Select value={partner} onValueChange={setPartner}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PARTNERS.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Commission Plan">
                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Plans">All Plans</SelectItem>
                    {COMMISSION_PLANS.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </div>

          {/* Achievement vs Payout by Plan */}
          <SectionCard
            icon={<Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            title="Achievement vs Payout by Plan"
            action={
              <TableTools>
                <SearchInput value={planSearch} onChange={setPlanSearch} placeholder="Search plan" />
                <FilterSelect
                  value={planStatus}
                  onChange={setPlanStatus}
                  options={["All statuses", "Qualified", "Not Qualified"]}
                />
                <FilterSelect
                  value={plan2ndBill}
                  onChange={setPlan2ndBill}
                  options={["Any 2nd bill", "Confirmed", "Pending", "Not required"]}
                />
                <FilterSelect
                  value={planElig}
                  onChange={setPlanElig}
                  options={["Any eligibility", "Reduced", "None"]}
                />
                {planFiltersActive && (
                  <button
                    onClick={() => {
                      setPlanSearch("");
                      setPlanStatus("All statuses");
                      setPlan2ndBill("Any 2nd bill");
                      setPlanElig("Any eligibility");
                      setPlanFilter("All Plans");
                    }}
                    className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Clear filters
                  </button>
                )}
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
                      No plans match the current filters.
                    </td>
                  </tr>
                )}
                {visibleRows.map((r, i) => {
                  const pr = P?.planRows.find((x) => x.plan === r.plan);
                  return (
                  <Row key={r.plan} i={i}>
                    <td className={`${td} sticky left-0 bg-white font-medium text-gray-900 dark:bg-[#07112F] dark:text-gray-100`}>
                      {r.plan}
                    </td>
                    <td className={tdR}>{r.weight}%</td>
                    <td className={tdR}>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${r.achievement >= 100 ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-gray-100"}`}>
                            {r.achievement}%
                          </span>
                          <MiniBar value={r.achievement} tone={r.achievement >= 100 ? "green" : r.achievement >= 80 ? "amber" : "red"} />
                        </div>
                        {pr && <Delta current={r.achievement} prev={pr.achievement} fmt={(n) => Math.abs(Math.round(n)).toString()} suffix="pp" />}
                      </div>
                    </td>
                    <td className={tdR}>
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-gray-700 dark:text-gray-300">{r.eligibleAchievement}%</span>
                        <MiniBar value={r.eligibleAchievement} tone="blue" />
                      </div>
                    </td>
                    <td className={tdR}>{r.commissionPct}%</td>
                    <td className={`${tdR} font-semibold text-emerald-600 dark:text-emerald-400`}>
                      <div className="flex flex-col items-end">
                        <span>{fmtOMR(r.commissionPaid)}</span>
                        {pr && <Delta current={r.commissionPaid} prev={pr.commissionPaid} fmt={(n) => fmtOMR(Math.abs(n))} />}
                      </div>
                    </td>
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
                );
                })}
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
            <ResponsiveContainer
              width="100%"
              height={isMobile ? (comparisonMode ? 620 : 460) : comparisonMode ? 520 : 380}
            >
              <BarChart data={planCmpData} layout="vertical" margin={{ left: 4, right: isMobile ? 26 : 36 }} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis type="number" tick={{ fontSize: 11 }} domain={[0, 130]} />
                <YAxis
                  type="category"
                  dataKey="plan"
                  width={isMobile ? 92 : 180}
                  tick={{ fontSize: isMobile ? 9 : 10 }}
                  tickFormatter={(v: string) => (isMobile && v.length > 16 ? v.slice(0, 15) + "…" : v)}
                />
                <RTooltip formatter={(v: number) => `${v}%`} />
                <Legend />
                <Bar dataKey="achievement" name="Achievement %" fill="#6366f1" radius={[0, 4, 4, 0]}>
                  {!comparisonMode && (
                    <LabelList dataKey="achievement" position="right" formatter={(v: number) => `${v}%`} className="fill-gray-700 dark:fill-gray-300 text-[10px]" />
                  )}
                </Bar>
                {comparisonMode && (
                  <Bar dataKey="priorAch" name={`Prior Achv % (${comparisonQuarter} ${comparisonYear})`} fill="#c7d2fe" radius={[0, 4, 4, 0]} />
                )}
                <Bar dataKey="commissionPct" name="Commission Paid %" fill="#10b981" radius={[0, 4, 4, 0]}>
                  {!comparisonMode && (
                    <LabelList dataKey="commissionPct" position="right" formatter={(v: number) => `${v}%`} className="fill-gray-700 dark:fill-gray-300 text-[10px]" />
                  )}
                </Bar>
                {comparisonMode && (
                  <Bar dataKey="priorPct" name="Prior Comm %" fill="#a7f3d0" radius={[0, 4, 4, 0]} />
                )}
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
                {comparisonMode && (
                  <p className="mb-4 text-[11px] text-gray-400 dark:text-gray-500">
                    Live status of the current cycle — not a period-over-period comparison.
                  </p>
                )}
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
