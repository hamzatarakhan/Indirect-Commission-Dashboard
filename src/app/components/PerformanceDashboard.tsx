import React from "react";
import { motion } from "motion/react";
import { RevenueMatrix } from "./RevenueMatrix";
import { ServiceMatrix } from "./ServiceMatrix";
import { CustomerBaseMatrix } from "./CustomerBaseMatrix";
import { SIPMatrix } from "./SIPMatrix";
import { CustomerRevenueMatrix } from "./CustomerRevenueMatrix";
import { TeamLeaderboard } from "./TeamLeaderboard";
import { GlobalFilters } from "./GlobalFilters";
import { Calendar } from "lucide-react";

import type { UserScope } from "../utils/scopeResolver";

interface PerformanceDashboardProps {
  period: string;
  quarter: string;
  year: string;
  userScope?: UserScope;
  viewingAsSM?: UserScope | null;
  viewingAsVM?: UserScope | null;
  viewingAsKAM?: any;
  isDataRefreshing?: boolean;
  comparisonMode?: boolean;
  comparisonYear?: string;
  selectedSegments?: string[];
  selectedVerticals?: string[];
  onSegmentsChange?: (segments: string[]) => void;
  onVerticalsChange?: (verticals: string[]) => void;
  onServiceSelect?: (serviceName: string, serviceColor: string) => void;
  onCustomerSelect?: (customer: any) => void;
  onActivationClick?: () => void;
  onTerminationClick?: () => void;
  onCustomerBaseClick?: () => void;
  onChurnRateClick?: () => void;
}

// Helper function to get current month info
const getCurrentMonthInfo = () => {
  const now = new Date();
  const monthNumber = now.getMonth() + 1; // 1-12
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonthName = monthNames[now.getMonth()];
  return { monthNumber, currentMonthName };
};

export function PerformanceDashboard({
  period,
  quarter,
  year,
  userScope,
  viewingAsSM,
  viewingAsVM,
  viewingAsKAM,
  isDataRefreshing = false,
  comparisonMode = false,
  comparisonYear = '2023',
  selectedSegments = ['All'],
  selectedVerticals = ['All Verticals'],
  onSegmentsChange = () => {},
  onVerticalsChange = () => {},
  onServiceSelect,
  onCustomerSelect,
  onActivationClick,
  onTerminationClick,
  onCustomerBaseClick,
  onChurnRateClick,
}: PerformanceDashboardProps) {
  const [isFiltersLoading, setIsFiltersLoading] = React.useState(false);
  const [teamSearchQuery, setTeamSearchQuery] = React.useState('');
  const [selectedTeamMember, setSelectedTeamMember] = React.useState('');

  // Determine current user role for display
  const currentRole = viewingAsKAM
    ? "KAM"
    : viewingAsVM
      ? "Vertical Manager"
      : viewingAsSM
        ? "Senior Manager"
        : userScope?.role || "General Manager";

  const getDashboardTitle = () => {
    if (viewingAsKAM) return "My Accounts Performance Overview";
    if (viewingAsVM) return "Vertical Performance Overview";
    if (viewingAsSM) return "My Segment Performance Overview";
    return "Business Unit Performance Overview";
  };

  // Get current month information
  const { monthNumber, currentMonthName } = getCurrentMonthInfo();

  return (
    <div className="space-y-6">
      {/* Period Comparison Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center"
      >
        <div className="fixed top-4 right-4 z-50 bg-slate-50 dark:bg-gray-900/80 rounded-[12.75px] border border-[rgba(59,130,246,0.3)] dark:border-gray-700/40">
          <div className="flex items-center pt-[8px] pr-[8px] pb-[8px] pl-[12px] px-[12px] py-[8px] bg-[rgba(255,255,255,0)]">
            <div className="flex items-center gap-[8.75px]">
              {/* Icon Container */}
              <div className="flex items-center justify-center size-[28px] rounded-[8.75px] bg-blue-50 dark:bg-blue-900/20">
                <svg className="block size-[14px]" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <path d="M4.66667 1.16667V3.5" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                  <path d="M9.33333 1.16667V3.5" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                  <path d="M11.0833 2.33333H2.91667C2.27233 2.33333 1.75 2.85567 1.75 3.5V11.6667C1.75 12.311 2.27233 12.8333 2.91667 12.8333H11.0833C11.7277 12.8333 12.25 12.311 12.25 11.6667V3.5C12.25 2.85567 11.7277 2.33333 11.0833 2.33333Z" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                  <path d="M1.75 5.83333H12.25" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                </svg>
              </div>
              
              {/* Text Container */}
              <div className="flex flex-col gap-[1.75px]">
                <p className="font-['Arial',sans-serif] text-[12.25px] leading-[17.5px] text-[#101828] dark:text-gray-100 whitespace-nowrap">
                  {comparisonMode 
                    ? `Comparing first ${monthNumber - 1} months of ${comparisonYear} vs ${year}`
                    : `Jan 1 – ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${year}`
                  }
                </p>
                <div className="flex items-center gap-[5.25px]">
                  <div className="size-[5.25px] bg-[#00c950] opacity-[0.51] rounded-full" />
                  <p className="font-['Arial',sans-serif] text-[10px] leading-[15px] text-[#6a7282] dark:text-gray-400 whitespace-nowrap">
                    {comparisonMode ? 'Live • Year-over-year comparison' : 'Live • Updates daily'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Global Filters - Two-Level Tab System */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <GlobalFilters
          selectedSegments={selectedSegments}
          selectedVerticals={selectedVerticals}
          onSegmentsChange={onSegmentsChange}
          onVerticalsChange={onVerticalsChange}
          onLoadingChange={setIsFiltersLoading}
        />
      </motion.div>

      {/* Filter Loading Indicator - Between tabs and dashboard sections */}
      {isFiltersLoading && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center justify-center gap-3 py-8 bg-white dark:bg-[#07112F] rounded-xl border border-[#E2E8F0] dark:border-[#E2E8F0]/20 shadow-sm"
        >
          <motion.div
            className="w-6 h-6 border-3 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">Loading data...</span>
        </motion.div>
      )}

      {/* Data Refreshing Indicator */}
      {isDataRefreshing && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-500/20"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-blue-700 dark:text-blue-300">
              Refreshing data...
            </span>
          </div>
        </motion.div>
      )}

      {/* Revenue Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isDataRefreshing ? 0.5 : 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <RevenueMatrix
          userRole={currentRole}
          period={period}
          quarter={quarter}
          year={year}
          comparisonMode={comparisonMode}
          comparisonYear={comparisonYear}
          selectedSegments={selectedSegments}
          selectedVerticals={selectedVerticals}
        />
      </motion.div>

      {/* Service Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isDataRefreshing ? 0.5 : 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <ServiceMatrix 
          userRole={currentRole} 
          comparisonMode={comparisonMode}
          comparisonYear={comparisonYear}
          year={year}
          onServiceSelect={onServiceSelect}
        />
      </motion.div>

      {/* Customer Base Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isDataRefreshing ? 0.5 : 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <CustomerBaseMatrix 
          userRole={currentRole} 
          compareMode={comparisonMode}
          onActivationClick={onActivationClick}
          onTerminationClick={onTerminationClick}
          onCustomerBaseClick={onCustomerBaseClick}
          onChurnRateClick={onChurnRateClick}
        />
      </motion.div>

      {/* Bottom Row: SIP Matrix and Customer Revenue Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isDataRefreshing ? 0.5 : 1,
            y: 0,
          }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="w-full h-full"
        >
          <SIPMatrix 
            userRole={currentRole} 
            compareMode={comparisonMode}
            selectedVertical={selectedVerticals[0] || null}
            onVerticalSelect={(vertical) => {
              // Toggle behavior: deselect if already selected, otherwise select
              if (selectedVerticals[0] === vertical) {
                onVerticalsChange([]); // Deselect - show all verticals
              } else {
                onVerticalsChange([vertical]); // Select this vertical
              }
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isDataRefreshing ? 0.5 : 1,
            y: 0,
          }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="w-full h-full"
        >
          <CustomerRevenueMatrix 
            userRole={currentRole} 
            compareMode={comparisonMode} 
            selectedVertical={selectedVerticals[0] || 'All Verticals'}
            onCustomerSelect={onCustomerSelect}
          />
        </motion.div>
      </div>

      {/* Team Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isDataRefreshing ? 0.5 : 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <TeamLeaderboard 
          searchQuery={teamSearchQuery}
          setSearchQuery={setTeamSearchQuery}
          selectedTeamMember={selectedTeamMember}
          onTeamMemberSelect={(data) => setSelectedTeamMember(data?.name || '')}
          userRole={currentRole}
          viewingAsSM={viewingAsSM}
          viewingAsVM={viewingAsVM}
          period={period}
          quarter={quarter}
          selectedSegments={selectedSegments}
          selectedVerticals={selectedVerticals}
          activeDashboard="performance"
        />
      </motion.div>
    </div>
  );
}