// Feature toggles for the Indirect Commission Dashboard.
// Everything here is built and working — flip a value to `true` to re-show a
// piece of UI that is temporarily hidden. Keep the comment for each so we
// remember what it controls.

export const FEATURES = {
  /**
   * Top-header "Compare" button. Turns on period-over-period comparison across
   * every KPI, table and chart (delta chips, prior-period bars, prior gauge arc,
   * old-vs-new target & achievement). Not part of the client brief.
   */
  compareMode: false,

  /**
   * Handshake icon in the top header (beside the $ icon) that navigates to the
   * Indirect Commission Dashboard.
   */
  headerIndirectNavIcon: false,

  /**
   * "Charts / Table" toggle on the Performance Overview section. When off, only
   * the Charts (KAM-style) view renders; the per-CR Table view is unreachable.
   */
  performanceOverviewViewToggle: false,

  /**
   * Standalone "Inactive CRs — no activation in the last 24 months" table
   * section on the Performance tab (search + pagination). The same data is
   * always reachable via the "Inactive CRs (2 yrs)" tile → detail popup, so
   * requirement 1.5 is covered even with this off.
   */
  inactiveCRsSection: false,

  /**
   * "Commission Cycle Status" section (stepper + summary strip).
   * NOTE: this maps to requirement 2.2 — it should be `true` for final delivery.
   */
  commissionCycleStatus: false,

  /**
   * "Avg / Activation" column (Revenue ÷ Activations) in the Activation Type
   * Analysis table. Not in the brief — a derived metric we added.
   */
  activationTypeAvgColumn: false,
} as const;
