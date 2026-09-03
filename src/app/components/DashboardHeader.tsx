import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, Briefcase, BarChart3, GitCompare, Info, DollarSign, Handshake } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { DarkModeToggle } from './DarkModeToggle';
import { VerticalSelector } from './VerticalSelector';
import { FEATURES } from './featureFlags';
import { toast } from 'sonner';
import type { UserScope } from '../utils/scopeResolver';

interface DashboardHeaderProps {
  period: string;
  setPeriod: (period: string) => void;
  quarter: string;
  setQuarter: (quarter: string) => void;
  month?: string;
  setMonth?: (month: string) => void;
  year?: string;
  setYear?: (year: string) => void;
  showCaretaker?: boolean;
  setShowCaretaker?: (show: boolean) => void;
  userScope?: UserScope;
  setUserScope?: (scope: UserScope) => void;
  selectedVertical?: string | null;
  onVerticalSelect?: (vertical: string | null) => void;
  viewingAsSM?: UserScope | null; // When GM views a SM's dashboard
  viewingAsVM?: UserScope | null; // When SM or GM views a VM's dashboard
  viewingAsKAM?: any; // KAM view data
  onNavigateToPerformance?: () => void; // Navigate to performance dashboard
  onNavigateToCommission?: () => void; // Navigate to commission dashboard
  onNavigateToIndirectCommission?: () => void; // Toggle Indirect Commission dashboard
  activeDashboard?: 'commission' | 'performance' | 'indirect-commission'; // Current active dashboard
  // Comparison props
  comparisonMode?: boolean;
  setComparisonMode?: (enabled: boolean) => void;
  comparisonPeriod?: string;
  setComparisonPeriod?: (period: string) => void;
  comparisonQuarter?: string;
  setComparisonQuarter?: (quarter: string) => void;
  comparisonMonth?: string;
  setComparisonMonth?: (month: string) => void;
  comparisonYear?: string;
  setComparisonYear?: (year: string) => void;
  // Service Details props
  selectedServiceDetails?: { serviceName: string; serviceColor: string } | null;
  serviceDetailsSegment?: string;
  serviceDetailsVertical?: string;
  // Global Filter props
  selectedSegments?: string[];
  selectedVerticals?: string[];
}

export function DashboardHeader({ 
  period, 
  setPeriod, 
  quarter, 
  setQuarter, 
  month = 'January',
  setMonth = () => {},
  year = '2024', 
  setYear = () => {},
  showCaretaker = false,
  setShowCaretaker = () => {},
  userScope,
  setUserScope = () => {},
  selectedVertical,
  onVerticalSelect,
  viewingAsSM,
  viewingAsVM,
  viewingAsKAM,
  onNavigateToPerformance,
  onNavigateToCommission,
  onNavigateToIndirectCommission,
  activeDashboard = 'commission',
  comparisonMode = false,
  setComparisonMode = () => {},
  comparisonPeriod = 'Quarterly',
  setComparisonPeriod = () => {},
  comparisonQuarter = 'Q3',
  setComparisonQuarter = () => {},
  comparisonMonth = 'January',
  setComparisonMonth = () => {},
  comparisonYear = '2024',
  setComparisonYear = () => {},
  selectedServiceDetails = null,
  serviceDetailsSegment = '',
  serviceDetailsVertical = '',
  selectedSegments = ['All'],
  selectedVerticals = ['All Verticals']
}: DashboardHeaderProps) {
  // Priority: viewingAsVM > viewingAsSM > userScope
  const displayScope = viewingAsVM || viewingAsSM || userScope;
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Granularity sync state
  const [syncGranularity, setSyncGranularity] = useState(true);
  const [granularityMismatch, setGranularityMismatch] = useState(false);

  // Helper function to get previous period
  const getPreviousPeriod = (granularity: string, currentPeriod: string, currentYear: string) => {
    if (granularity === 'Quarterly') {
      const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
      const currentIndex = quarters.indexOf(currentPeriod);
      
      if (currentIndex > 0) {
        // Same year, previous quarter
        return { period: quarters[currentIndex - 1], year: currentYear };
      } else {
        // Q1 → Q4 of previous year
        const prevYear = String(Number(currentYear) - 1);
        return { period: 'Q4', year: prevYear };
      }
    } else if (granularity === 'Yearly') {
      // Previous year
      const prevYear = String(Number(currentYear) - 1);
      return { period: prevYear, year: prevYear };
    }
    
    return { period: currentPeriod, year: currentYear };
  };

  // Auto-sync granularity when primary changes
  useEffect(() => {
    if (syncGranularity && comparisonMode && (activeDashboard === 'performance' || activeDashboard === 'indirect-commission')) {
      if (period !== comparisonPeriod) {
        // Sync granularity
        setComparisonPeriod(period);
        
        // Calculate previous period
        const { period: prevPeriod, year: prevYear } = getPreviousPeriod(
          period,
          period === 'Yearly' ? year : quarter,
          year
        );
        
        if (period === 'Yearly') {
          setComparisonYear(prevPeriod);
        } else {
          setComparisonQuarter(prevPeriod);
          setComparisonYear(prevYear);
        }
        
        // Show toast notification
        toast.info(`Granularity synced to ${period} for a valid comparison.`, {
          duration: 2500,
        });
      }
    }
  }, [period, quarter, year, syncGranularity, comparisonMode, activeDashboard]);

  // Check for granularity mismatch when sync is OFF
  useEffect(() => {
    if (!syncGranularity && comparisonMode && (activeDashboard === 'performance' || activeDashboard === 'indirect-commission')) {
      setGranularityMismatch(period !== comparisonPeriod);
    } else {
      setGranularityMismatch(false);
    }
  }, [period, comparisonPeriod, syncGranularity, comparisonMode, activeDashboard]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Make header sticky when scrolled down more than 100px
      const shouldBeSticky = scrollTop > 100;
      
      if (shouldBeSticky !== isSticky) {
        setIsSticky(shouldBeSticky);
        
        // Update body padding when sticky state changes
        if (shouldBeSticky && headerRef.current) {
          const headerHeight = headerRef.current.offsetHeight;
          document.body.style.paddingTop = `${headerHeight}px`;
        } else {
          document.body.style.paddingTop = '0px';
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.paddingTop = '0px';
    };
  }, [isSticky]);

  return (
    <div 
      ref={headerRef}
      className={`
        transition-all duration-300 ease-out
        ${isSticky 
          ? 'fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#081028]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-gray-700/50 shadow-lg shadow-black/5 dark:shadow-black/20' 
          : 'bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-700 shadow-sm'
        }
      `}
    >
      <div 
        className={`
          flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 sm:px-6 gap-4 transition-all duration-300
          ${isSticky ? 'py-3' : 'py-4'}
        `}
      >
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-7 w-7 sm:h-8 sm:w-8 bg-blue-600 dark:bg-blue-500 rounded flex items-center justify-center flex-shrink-0 transition-colors duration-300">
              <span className="text-white font-bold text-xs sm:text-sm">E</span>
            </div>
            
            {/* Title and Subtitle Container */}
            <div className="min-w-0 flex-shrink">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">
                  <span className="hidden sm:inline text-base sm:text-lg">
                    {activeDashboard === 'commission'
                      ? 'Commission Dashboard'
                      : activeDashboard === 'indirect-commission'
                      ? 'Indirect Commission Dashboard'
                      : 'Performance Dashboard'}
                  </span>
                  <span className="sm:hidden">EBU Dashboard</span>
                </h1>
                
                {/* Global Filter Badges - Show on main dashboard and service details */}
                {activeDashboard !== 'indirect-commission' && !viewingAsSM && !viewingAsVM && !viewingAsKAM && (
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-xs sm:text-sm">
                    {/* Display all selected segments */}
                    {selectedSegments.map((segment, idx) => (
                      <span key={`segment-${segment}`} className="contents">
                        {idx > 0 && <span className="text-gray-400 dark:text-gray-500 text-xs">+</span>}
                        <Badge className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60 shadow-sm font-semibold">
                          {segment === 'All' ? 'All Segments' : segment}
                        </Badge>
                      </span>
                    ))}
                    
                    <span className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm">›</span>
                    
                    {/* Display all selected verticals */}
                    {selectedVerticals.map((vertical, idx) => (
                      <span key={`vertical-${vertical}`} className="contents">
                        {idx > 0 && <span className="text-gray-400 dark:text-gray-500 text-xs">+</span>}
                        <Badge className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/40 dark:to-purple-800/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/60 shadow-sm font-semibold">
                          {vertical === 'All Verticals' ? 'All Verticals' : vertical}
                        </Badge>
                      </span>
                    ))}
                    
                    {/* Service Details Badge - Show after verticals when viewing service details */}
                    {selectedServiceDetails && (
                      <span className="contents">
                        <span className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm">›</span>
                        <Badge className={`px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold shadow-sm border ${
                          selectedServiceDetails.serviceColor === 'blue' 
                            ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700/60' 
                            : selectedServiceDetails.serviceColor === 'purple'
                            ? 'bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/40 dark:to-purple-800/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700/60'
                            : 'bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/60'
                        }`}>
                          {selectedServiceDetails.serviceName}
                        </Badge>
                      </span>
                    )}
                  </div>
                )}
                
                {/* Segment Badge - Show for SM, VM, and KAM views */}
                {!selectedServiceDetails && (viewingAsSM || viewingAsVM || viewingAsKAM) && (
                  <span className="contents">
                    {viewingAsKAM && viewingAsKAM.segment && (
                      <Badge className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60 shadow-sm font-semibold">
                        {viewingAsKAM.segment}
                      </Badge>
                    )}
                    {viewingAsVM && !viewingAsKAM && viewingAsVM.segment && (
                      <Badge className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60 shadow-sm font-semibold">
                        {viewingAsVM.segment}
                      </Badge>
                    )}
                    {viewingAsSM && !viewingAsVM && !viewingAsKAM && viewingAsSM.segment && (
                      <Badge className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/60 shadow-sm font-semibold">
                        {viewingAsSM.segment}
                      </Badge>
                    )}
                    
                    {/* Vertical Badge - Show for VM and KAM views */}
                    {viewingAsKAM && viewingAsKAM.vertical && (
                      <span className="contents">
                        <span className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm">›</span>
                        <Badge className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/40 dark:to-purple-800/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/60 shadow-sm font-semibold">
                          {viewingAsKAM.vertical}
                        </Badge>
                      </span>
                    )}
                    {viewingAsVM && !viewingAsKAM && viewingAsVM.verticals && Array.isArray(viewingAsVM.verticals) && viewingAsVM.verticals.length > 0 && (
                      <span className="contents">
                        <span className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm">›</span>
                        <Badge className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/40 dark:to-purple-800/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/60 shadow-sm font-semibold">
                          {viewingAsVM.verticals.length === 1 ? viewingAsVM.verticals[0] : `${viewingAsVM.verticals.length} Verticals`}
                        </Badge>
                      </span>
                    )}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate transition-colors duration-300">
                <span className="sm:hidden">Performance Analytics</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Filter Controls & Profile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
          {/* Top Controls Row (Mobile & Desktop) */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide w-full sm:w-auto">
            {/* Period Type Selector */}
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[110px] sm:w-[130px] min-w-[90px] flex-shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="YTD">YTD</SelectItem> */}
                <SelectItem value="Yearly">Yearly</SelectItem>
                <SelectItem value="Quarterly">Quarterly</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>

            {/* Period Comparison Toggle — controlled by FEATURES.compareMode */}
            {FEATURES.compareMode && (
            <Button
              onClick={() => setComparisonMode(!comparisonMode)}
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 px-3 py-1.5 transition-all duration-300 flex-shrink-0 ${
                comparisonMode
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700/60'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              <span className="text-sm whitespace-nowrap">Compare</span>
            </Button>
            )}

            {/* Comparison Period Selectors - Show when comparison mode is active */}
            {comparisonMode && (
              <span className="contents">
                {/* Comparison Quarter - Show for Quarterly period */}
                {period === 'Quarterly' && (
                  <Select value={comparisonQuarter} onValueChange={setComparisonQuarter}>
                    <SelectTrigger className="w-[90px] sm:w-[100px] min-w-[75px] border-indigo-200 dark:border-indigo-700/60 flex-shrink-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Q1">Q1</SelectItem>
                      <SelectItem value="Q2">Q2</SelectItem>
                      <SelectItem value="Q3">Q3</SelectItem>
                      <SelectItem value="Q4">Q4</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {/* Comparison Month - Show for Monthly period */}
                {period === 'Monthly' && (
                  <Select value={comparisonMonth} onValueChange={setComparisonMonth}>
                    <SelectTrigger className="w-[110px] sm:w-[130px] min-w-[90px] border-indigo-200 dark:border-indigo-700/60 flex-shrink-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="January">January</SelectItem>
                      <SelectItem value="February">February</SelectItem>
                      <SelectItem value="March">March</SelectItem>
                      <SelectItem value="April">April</SelectItem>
                      <SelectItem value="May">May</SelectItem>
                      <SelectItem value="June">June</SelectItem>
                      <SelectItem value="July">July</SelectItem>
                      <SelectItem value="August">August</SelectItem>
                      <SelectItem value="September">September</SelectItem>
                      <SelectItem value="October">October</SelectItem>
                      <SelectItem value="November">November</SelectItem>
                      <SelectItem value="December">December</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {/* Comparison Year */}
                <Select value={comparisonYear} onValueChange={setComparisonYear}>
                  <SelectTrigger className="w-[90px] sm:w-[100px] min-w-[75px] border-indigo-200 dark:border-indigo-700/60 flex-shrink-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
              </span>
            )}

            {/* "vs" label - Only show when comparison mode is active */}
            {comparisonMode && (
              <span className="text-gray-400 dark:text-gray-500 font-medium flex-shrink-0">vs</span>
            )}

            {/* Primary Period Selectors */}
            {/* Quarter Selector - Show for Quarterly period */}
            {period === 'Quarterly' && (
              <Select value={quarter} onValueChange={setQuarter}>
                <SelectTrigger className="w-[90px] sm:w-[100px] min-w-[75px] flex-shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Q1">Q1</SelectItem>
                  <SelectItem value="Q2">Q2</SelectItem>
                  <SelectItem value="Q3">Q3</SelectItem>
                  <SelectItem value="Q4">Q4</SelectItem>
                </SelectContent>
              </Select>
            )}

            {/* Month Selector - Show for Monthly period */}
            {period === 'Monthly' && (
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger className="w-[110px] sm:w-[130px] min-w-[90px] flex-shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="January">January</SelectItem>
                  <SelectItem value="February">February</SelectItem>
                  <SelectItem value="March">March</SelectItem>
                  <SelectItem value="April">April</SelectItem>
                  <SelectItem value="May">May</SelectItem>
                  <SelectItem value="June">June</SelectItem>
                  <SelectItem value="July">July</SelectItem>
                  <SelectItem value="August">August</SelectItem>
                  <SelectItem value="September">September</SelectItem>
                  <SelectItem value="October">October</SelectItem>
                  <SelectItem value="November">November</SelectItem>
                  <SelectItem value="December">December</SelectItem>
                </SelectContent>
              </Select>
            )}

            {/* Primary Year Selection */}
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[90px] sm:w-[100px] min-w-[75px] flex-shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>

            {/* Caretaker Toggle - Only show in Commission Dashboard */}
            {activeDashboard === 'commission' && (
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 transition-colors duration-300 flex-shrink-0">
                <Briefcase className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <Label 
                  htmlFor="caretaker-toggle" 
                  className="hidden sm:inline-block text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap cursor-pointer"
                >
                  Show Caretaker
                </Label>
                <Switch
                  id="caretaker-toggle"
                  checked={showCaretaker}
                  onCheckedChange={setShowCaretaker}
                  className="ml-0 sm:ml-1"
                />
              </div>
            )}
          </div>

          {/* Profile & Actions Section */}
          <div className="flex items-stretch gap-2 sm:gap-3">
            {/* Profile Section */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700/50 transition-colors duration-300 flex-shrink-0 flex-1 sm:flex-initial">
              {/* Avatar - Always show logged-in user */}
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 rounded-full flex items-center justify-center ring-2 ring-blue-200/50 dark:ring-blue-400/30 flex-shrink-0">
                <span className="text-white font-medium text-xs">
                  {userScope?.name?.charAt(0) || 'K'}
                </span>
              </div>
              
              {/* Info - Always show logged-in user */}
              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {userScope?.name || 'Khalid Al-Maamari'}
                  </span>
                  <Badge className="text-[10px] px-1.5 py-0.5 bg-blue-100 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700/50 hover:bg-blue-100 dark:hover:bg-blue-800/50 whitespace-nowrap hidden sm:inline-flex">
                    {userScope?.role === 'General Manager' ? 'General Manager' : userScope?.role === 'Senior Manager' ? 'Senior Manager' : 'Vertical Manager'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-gray-400 truncate">
                  <span>34928</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline truncate">khalid.almaamari@omantel.om</span>
                </div>
              </div>
            </div>

            {/* Action Buttons - Commission & Dark Mode */}
            <div className="flex items-stretch gap-2 sm:gap-3 flex-shrink-0">
              {/* Navigate to Indirect Commission Dashboard — controlled by FEATURES.headerIndirectNavIcon */}
              {FEATURES.headerIndirectNavIcon && onNavigateToIndirectCommission && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={onNavigateToIndirectCommission}
                        variant="outline"
                        size="sm"
                        className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 transition-all duration-300 flex-shrink-0 ${
                          activeDashboard === 'indirect-commission'
                            ? 'bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700/60'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 dark:hover:from-purple-950/40 dark:hover:to-indigo-950/40 hover:border-purple-300 dark:hover:border-purple-700/60'
                        }`}
                      >
                        <Handshake className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{activeDashboard === 'indirect-commission' ? 'Back to Performance Dashboard' : 'Go to Indirect Commission Dashboard'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {/* Navigate to Commission Dashboard - Only show when on Performance Dashboard */}
              {activeDashboard === 'performance' && onNavigateToPerformance && (
                <span className="contents">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={onNavigateToPerformance}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 transition-all duration-300 flex-shrink-0 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-950/40 dark:hover:to-emerald-950/40 hover:border-green-300 dark:hover:border-green-700/60"
                        >
                          <DollarSign className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Go to Commission Dashboard</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div className="hidden sm:block h-6 w-px bg-gray-200 dark:bg-gray-700 transition-colors duration-300" />
                </span>
              )}

              {/* Navigate to Performance Dashboard - Only show when on Commission Dashboard */}
              {activeDashboard === 'commission' && onNavigateToCommission && (
                <span className="contents">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={onNavigateToCommission}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 transition-all duration-300 flex-shrink-0 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950/40 dark:hover:to-indigo-950/40 hover:border-blue-300 dark:hover:border-blue-700/60"
                        >
                          <BarChart3 className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Go to Performance Dashboard</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div className="hidden sm:block h-6 w-px bg-gray-200 dark:bg-gray-700 transition-colors duration-300" />
                </span>
              )}
              
              <DarkModeToggle className="h-full min-h-[2.25rem] w-9" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}