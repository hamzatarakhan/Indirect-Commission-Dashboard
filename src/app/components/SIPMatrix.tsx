import React, { useState, useMemo } from 'react';
import { DollarSign, Heart, Target, Trophy, ChevronRight, Award, Layers, PieChart, Users, Building2, Info, TrendingUp, TrendingDown, Search, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { PercentageBadge } from './PerformanceTooltip';
import { ComparisonIndicator } from './ComparisonIndicator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface SIPMatrixProps {
  userRole: string;
  compareMode?: boolean;
  selectedVertical?: string | null;
  onVerticalSelect?: (vertical: string) => void;
}

export function SIPMatrix({ userRole, compareMode, selectedVertical, onVerticalSelect }: SIPMatrixProps) {
  const [sortBy, setSortBy] = useState('Achievement %');
  const [filterView, setFilterView] = useState<'all' | 'top5' | 'bottom5'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('All Segments');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [selectedKpi, setSelectedKpi] = useState<string | null>(null);
  const [drilldownService, setDrilldownService] = useState<string | null>(null);

  const productHierarchy: Record<string, string[]> = {
    'Mobile': ['Postpaid Voice', 'Prepaid Voice', 'Mobile Data', 'Roaming'],
    'Fixed': ['Business Broadband', 'Fixed Voice', 'Dedicated Internet', 'Leased Lines'],
    'ICT': ['Cloud Computing', 'Managed Security', 'Data Center', 'Professional Services'],
    'SMS': ['Bulk SMS', 'A2P SMS', 'Transactional SMS', 'Marketing SMS']
  };

  const services = Object.keys(productHierarchy);

  // Verticals data with expanded dummy data for pagination
  const verticalsData = {
    kpis: {
      contribution: { value: 32.6, previousValue: 30.3, trend: 2.3, target: 35.0, previousTarget: 32.0 },
      achievement: { value: 94.8, previousValue: 93.6, trend: 1.2, target: 100.0, previousTarget: 100.0 },
      staffCount: { value: 256, previousValue: 242, trend: 5.8, target: 275, previousTarget: 250 },
      customerCount: { value: 8543, previousValue: 7900, trend: 8.2, target: 9000, previousTarget: 8000 },
      badDebt: { value: 1850000, previousValue: 1760000, trend: 5.1 },
      adjustment: { value: 320000, previousValue: 327600, trend: -2.3 }
    },
    segments: [
      // Large Business segment
      { name: 'Manufacturing & Infrastructure Accounts', abbreviation: 'MIA', segmentName: 'Large Business', contribution: 32.6, previousContribution: 30.1, achievement: 97.2, previousAchievement: 93.7, customers: 1987, previousCustomers: 1821, staff: 42, previousStaff: 39, color: 'blue', target: 100, revenue: 8.5, previousRevenue: 7.8 },
      { name: 'Energy & Industrial Accounts', abbreviation: 'EIA', segmentName: 'Large Business', contribution: 28.4, previousContribution: 26.8, achievement: 96.8, previousAchievement: 93.3, customers: 1823, previousCustomers: 1687, staff: 38, previousStaff: 36, color: 'indigo', target: 100, revenue: 7.2, previousRevenue: 6.6 },
      { name: 'Key Energy Accounts', abbreviation: 'KEA', segmentName: 'Large Business', contribution: 24.1, previousContribution: 22.5, achievement: 95.5, previousAchievement: 90.0, customers: 1654, previousCustomers: 1532, staff: 35, previousStaff: 33, color: 'purple', target: 100, revenue: 6.1, previousRevenue: 5.5 },
      
      // BMB segment
      { name: 'BMB', abbreviation: 'BMB', segmentName: 'BMB', contribution: 26.3, previousContribution: 24.1, achievement: 95.8, previousAchievement: 90.6, customers: 1654, previousCustomers: 1521, staff: 35, previousStaff: 33, color: 'purple', target: 100, revenue: 6.7, previousRevenue: 6.1 },
      { name: 'Business Centers', abbreviation: 'BC', segmentName: 'BMB', contribution: 22.7, previousContribution: 20.9, achievement: 94.9, previousAchievement: 89.7, customers: 1521, previousCustomers: 1398, staff: 32, previousStaff: 30, color: 'emerald', target: 100, revenue: 5.8, previousRevenue: 5.3 },
      { name: 'Government & Financial Accounts', abbreviation: 'GFA', segmentName: 'BMB', contribution: 20.8, previousContribution: 19.3, achievement: 93.6, previousAchievement: 88.3, customers: 1432, previousCustomers: 1321, staff: 29, previousStaff: 27, color: 'teal', target: 100, revenue: 5.3, previousRevenue: 4.9 },
      
      // Medium Services segment
      { name: 'Services', abbreviation: 'SRV', segmentName: 'Medium Services', contribution: 19.4, previousContribution: 18.1, achievement: 94.3, previousAchievement: 88.8, customers: 1342, previousCustomers: 1243, staff: 26, previousStaff: 24, color: 'emerald', target: 100, revenue: 4.9, previousRevenue: 4.5 },
      { name: 'Medium Segment', abbreviation: 'MS', segmentName: 'Medium Services', contribution: 17.2, previousContribution: 16.0, achievement: 93.1, previousAchievement: 87.9, customers: 1198, previousCustomers: 1109, staff: 24, previousStaff: 23, color: 'cyan', target: 100, revenue: 4.4, previousRevenue: 4.0 },
      { name: 'Healthcare Education & Hospitality Accounts', abbreviation: 'HEH', segmentName: 'Medium Services', contribution: 15.6, previousContribution: 14.4, achievement: 92.4, previousAchievement: 87.1, customers: 1087, previousCustomers: 1001, staff: 21, previousStaff: 20, color: 'blue', target: 100, revenue: 4.0, previousRevenue: 3.7 },
      
      // Medium Business segment
      { name: 'Medium Segment', abbreviation: 'MS', segmentName: 'Medium Business', contribution: 12.8, previousContribution: 11.3, achievement: 92.5, previousAchievement: 87.3, customers: 876, previousCustomers: 798, staff: 15, previousStaff: 14, color: 'orange', target: 100, revenue: 3.3, previousRevenue: 3.0 },
      { name: 'Business Centers', abbreviation: 'BC', segmentName: 'Medium Business', contribution: 11.3, previousContribution: 10.1, achievement: 91.8, previousAchievement: 86.6, customers: 798, previousCustomers: 723, staff: 14, previousStaff: 13, color: 'amber', target: 100, revenue: 2.9, previousRevenue: 2.6 },
      { name: 'Services', abbreviation: 'SRV', segmentName: 'Medium Business', contribution: 9.7, previousContribution: 8.8, achievement: 90.6, previousAchievement: 85.4, customers: 723, previousCustomers: 652, staff: 12, previousStaff: 11, color: 'yellow', target: 100, revenue: 2.5, previousRevenue: 2.2 },
      
      // Micro-Retail segment
      { name: 'Retail & Technology Accounts', abbreviation: 'RTA', segmentName: 'Micro-Retail', contribution: 6.2, previousContribution: 5.5, achievement: 91.7, previousAchievement: 86.5, customers: 567, previousCustomers: 512, staff: 8, previousStaff: 7, color: 'indigo', target: 100, revenue: 1.6, previousRevenue: 1.4 },
      { name: 'Business Centers', abbreviation: 'BC', segmentName: 'Micro-Retail', contribution: 5.4, previousContribution: 4.8, achievement: 89.9, previousAchievement: 84.7, customers: 512, previousCustomers: 462, staff: 7, previousStaff: 7, color: 'violet', target: 100, revenue: 1.4, previousRevenue: 1.2 },
      { name: 'Dhofar-Retail', abbreviation: 'DR', segmentName: 'Micro-Retail', contribution: 4.8, previousContribution: 4.2, achievement: 88.7, previousAchievement: 83.5, customers: 467, previousCustomers: 421, staff: 6, previousStaff: 6, color: 'fuchsia', target: 100, revenue: 1.2, previousRevenue: 1.0 },
      
      // Indirect-Small segment
      { name: 'Indirect Channel', abbreviation: 'IC', segmentName: 'Indirect-Small', contribution: 2.7, previousContribution: 2.3, achievement: 88.4, previousAchievement: 83.2, customers: 234, previousCustomers: 210, staff: 2, previousStaff: 2, color: 'pink', target: 100, revenue: 0.7, previousRevenue: 0.6 },
      { name: 'Business Centers', abbreviation: 'BC', segmentName: 'Indirect-Small', contribution: 2.1, previousContribution: 1.9, achievement: 87.2, previousAchievement: 82.0, customers: 198, previousCustomers: 182, staff: 2, previousStaff: 2, color: 'rose', target: 100, revenue: 0.5, previousRevenue: 0.5 },
      { name: 'Retail & Technology Accounts', abbreviation: 'RTA', segmentName: 'Indirect-Small', contribution: 1.8, previousContribution: 1.6, achievement: 86.5, previousAchievement: 81.3, customers: 176, previousCustomers: 161, staff: 1, previousStaff: 1, color: 'red', target: 100, revenue: 0.5, previousRevenue: 0.4 },
      
      // Key Account segment
      { name: 'Key Government Accounts', abbreviation: 'KGA', segmentName: 'Key Account', contribution: 35.8, previousContribution: 33.2, achievement: 98.1, previousAchievement: 94.8, customers: 2143, previousCustomers: 1987, staff: 48, previousStaff: 45, color: 'blue', target: 100, revenue: 9.1, previousRevenue: 8.4 },
      { name: 'Key Financial Accounts', abbreviation: 'KFA', segmentName: 'Key Account', contribution: 29.7, previousContribution: 27.5, achievement: 97.5, previousAchievement: 94.2, customers: 1921, previousCustomers: 1776, staff: 41, previousStaff: 38, color: 'indigo', target: 100, revenue: 7.6, previousRevenue: 7.0 },
      { name: 'Key Energy Accounts', abbreviation: 'KEA', segmentName: 'Key Account', contribution: 25.4, previousContribution: 23.6, achievement: 96.9, previousAchievement: 93.6, customers: 1734, previousCustomers: 1602, staff: 37, previousStaff: 34, color: 'violet', target: 100, revenue: 6.5, previousRevenue: 6.0 },
      
      // Dhofar segment
      { name: 'Dhofar', abbreviation: 'DHO', segmentName: 'Dhofar', contribution: 16.2, previousContribution: 14.8, achievement: 93.4, previousAchievement: 88.9, customers: 1176, previousCustomers: 1087, staff: 23, previousStaff: 21, color: 'green', target: 100, revenue: 4.1, previousRevenue: 3.8 },
      { name: 'Dhofar-Retail', abbreviation: 'DR', segmentName: 'Dhofar', contribution: 13.5, previousContribution: 12.3, achievement: 92.1, previousAchievement: 87.5, customers: 987, previousCustomers: 912, staff: 19, previousStaff: 18, color: 'teal', target: 100, revenue: 3.4, previousRevenue: 3.1 },
      { name: 'Healthcare Education & Hospitality Accounts', abbreviation: 'HEH', segmentName: 'Dhofar', contribution: 10.8, previousContribution: 9.9, achievement: 90.8, previousAchievement: 86.2, customers: 812, previousCustomers: 751, staff: 16, previousStaff: 15, color: 'cyan', target: 100, revenue: 2.8, previousRevenue: 2.5 },
      
      // Closed AC segment
      { name: 'Closed AC', abbreviation: 'CAC', segmentName: 'Closed AC', contribution: 8.2, previousContribution: 7.5, achievement: 85.6, previousAchievement: 80.3, customers: 623, previousCustomers: 576, staff: 12, previousStaff: 11, color: 'gray', target: 100, revenue: 2.1, previousRevenue: 1.9 },
      { name: 'Services', abbreviation: 'SRV', segmentName: 'Closed AC', contribution: 5.9, previousContribution: 5.4, achievement: 82.4, previousAchievement: 77.8, customers: 487, previousCustomers: 451, staff: 9, previousStaff: 8, color: 'slate', target: 100, revenue: 1.5, previousRevenue: 1.4 },
      { name: 'Business Centers', abbreviation: 'BC', segmentName: 'Closed AC', contribution: 3.6, previousContribution: 3.3, achievement: 79.2, previousAchievement: 74.9, customers: 341, previousCustomers: 316, staff: 6, previousStaff: 6, color: 'zinc', target: 100, revenue: 0.9, previousRevenue: 0.8 },
      
      // Additional verticals across segments
      { name: 'Services', abbreviation: 'SRV', segmentName: 'Large Business', contribution: 21.5, previousContribution: 19.8, achievement: 95.1, previousAchievement: 89.9, customers: 1567, previousCustomers: 1445, staff: 31, previousStaff: 29, color: 'sky', target: 100, revenue: 5.5, previousRevenue: 5.0 },
      { name: 'Services', abbreviation: 'SRV', segmentName: 'BMB', contribution: 18.9, previousContribution: 17.5, achievement: 92.8, previousAchievement: 87.6, customers: 1289, previousCustomers: 1189, staff: 27, previousStaff: 25, color: 'lime', target: 100, revenue: 4.8, previousRevenue: 4.4 },
      { name: 'Healthcare Education & Hospitality Accounts', abbreviation: 'HEH', segmentName: 'Medium Services', contribution: 14.3, previousContribution: 13.2, achievement: 91.5, previousAchievement: 86.3, customers: 998, previousCustomers: 921, staff: 19, previousStaff: 18, color: 'green', target: 100, revenue: 3.6, previousRevenue: 3.3 },
      { name: 'Services', abbreviation: 'SRV', segmentName: 'Medium Business', contribution: 8.5, previousContribution: 7.6, achievement: 89.4, previousAchievement: 84.2, customers: 654, previousCustomers: 602, staff: 11, previousStaff: 10, color: 'orange', target: 100, revenue: 2.2, previousRevenue: 2.0 },
      { name: 'Indirect Channel', abbreviation: 'IC', segmentName: 'Micro-Retail', contribution: 3.9, previousContribution: 3.4, achievement: 87.8, previousAchievement: 82.6, customers: 423, previousCustomers: 391, staff: 5, previousStaff: 5, color: 'purple', target: 100, revenue: 1.0, previousRevenue: 0.9 },
      { name: 'Retail & Technology Accounts', abbreviation: 'RTA', segmentName: 'Indirect-Small', contribution: 1.5, previousContribution: 1.3, achievement: 85.9, previousAchievement: 80.7, customers: 145, previousCustomers: 134, staff: 1, previousStaff: 1, color: 'pink', target: 100, revenue: 0.4, previousRevenue: 0.3 }
    ]
  };

  // Get unique segment names for filter
  const segmentNames = ['All Segments', ...Array.from(new Set(verticalsData.segments.map(s => s.segmentName)))];

  // Apply segment filter
  let segmentFilteredItems = verticalsData.segments;
  if (segmentFilter !== 'All Segments') {
    segmentFilteredItems = verticalsData.segments.filter(segment => segment.segmentName === segmentFilter);
  }

  // Sort items
  const sortedItems = [...segmentFilteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'Achievement %':
        return b.achievement - a.achievement;
      case 'Contribution %':
        return b.contribution - a.contribution;
      case 'Customer Count':
        return b.customers - a.customers;
      case 'Staff Count':
        return b.staff - a.staff;
      default:
        return 0;
    }
  });

  // Apply search filter
  let searchFilteredSegments = sortedItems;
  if (searchQuery.trim()) {
    searchFilteredSegments = sortedItems.filter(segment =>
      segment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      segment.abbreviation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      segment.segmentName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply view filter (all/top5/bottom5)
  const filteredSegments = filterView === 'all' 
    ? searchFilteredSegments 
    : filterView === 'top5' 
      ? searchFilteredSegments.slice(0, 5) 
      : searchFilteredSegments.slice(-5).reverse();

  const getSegmentColor = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
      blue: { bg: 'bg-blue-500', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-500', gradient: 'from-blue-500 to-blue-600' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-500', gradient: 'from-purple-500 to-purple-600' },
      emerald: { bg: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-500', gradient: 'from-emerald-500 to-emerald-600' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-500', gradient: 'from-orange-500 to-orange-600' },
      indigo: { bg: 'bg-indigo-500', text: 'text-indigo-700 dark:text-indigo-400', border: 'border-indigo-500', gradient: 'from-indigo-500 to-indigo-600' },
      pink: { bg: 'bg-pink-500', text: 'text-pink-700 dark:text-pink-400', border: 'border-pink-500', gradient: 'from-pink-500 to-pink-600' },
      sky: { bg: 'bg-sky-500', text: 'text-sky-700 dark:text-sky-400', border: 'border-sky-500', gradient: 'from-sky-500 to-sky-600' },
      lime: { bg: 'bg-lime-500', text: 'text-lime-700 dark:text-lime-400', border: 'border-lime-500', gradient: 'from-lime-500 to-lime-600' },
      green: { bg: 'bg-green-500', text: 'text-green-700 dark:text-green-400', border: 'border-green-500', gradient: 'from-green-500 to-green-600' },
      amber: { bg: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-500', gradient: 'from-amber-500 to-amber-600' },
      yellow: { bg: 'bg-yellow-500', text: 'text-yellow-700 dark:text-yellow-400', border: 'border-yellow-500', gradient: 'from-yellow-500 to-yellow-600' },
      cyan: { bg: 'bg-cyan-500', text: 'text-cyan-700 dark:text-cyan-400', border: 'border-cyan-500', gradient: 'from-cyan-500 to-cyan-600' },
      violet: { bg: 'bg-violet-500', text: 'text-violet-700 dark:text-violet-400', border: 'border-violet-500', gradient: 'from-violet-500 to-violet-600' },
      fuchsia: { bg: 'bg-fuchsia-500', text: 'text-fuchsia-700 dark:text-fuchsia-400', border: 'border-fuchsia-500', gradient: 'from-fuchsia-500 to-fuchsia-600' },
      rose: { bg: 'bg-rose-500', text: 'text-rose-700 dark:text-rose-400', border: 'border-rose-500', gradient: 'from-rose-500 to-rose-600' },
      red: { bg: 'bg-red-500', text: 'text-red-700 dark:text-red-400', border: 'border-red-500', gradient: 'from-red-500 to-red-600' },
      gray: { bg: 'bg-gray-500', text: 'text-gray-700 dark:text-gray-400', border: 'border-gray-500', gradient: 'from-gray-500 to-gray-600' },
      slate: { bg: 'bg-slate-500', text: 'text-slate-700 dark:text-slate-400', border: 'border-slate-500', gradient: 'from-slate-500 to-slate-600' },
      zinc: { bg: 'bg-zinc-500', text: 'text-zinc-700 dark:text-zinc-400', border: 'border-zinc-500', gradient: 'from-zinc-500 to-zinc-600' }
    };
    return colors[color] || colors.blue;
  };

  const formatCurrency = (value: number) => {
    return `${(value / 1000000).toFixed(2)}M OMR`;
  };

  const totalPages = Math.ceil(filteredSegments.length / itemsPerPage);
  const currentItems = filteredSegments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-3 sm:space-y-4 h-full">
      {/* Segment / Vertical Matrix Widget */}
      {userRole !== 'KAM' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-[#07112F] rounded-xl p-4 sm:p-5 md:p-6 border border-[#E2E8F0] dark:border-[#E2E8F0]/20 transition-all duration-200 flex flex-col h-full"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-100/60 to-blue-50/30 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-sm sm:text-[15px] font-medium text-gray-900 dark:text-gray-100">
                My Segments/Verticals
              </h2>
            </div>
          </div>

          {/* Top KPI Cards - Fully Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6 flex-shrink-0">
            {/* 
              CARD 1: CONTRIBUTION %
              
              What it represents:
              - This vertical's revenue as a percentage of total EBU revenue
              - Example: If Education vertical made 15M OMR and total EBU made 100M OMR, contribution = 15%
              
              Data source formula:
              - Current Value = (Vertical Revenue / Total EBU Revenue) × 100
              - Previous Value = (Vertical Revenue in comparison period / Total EBU Revenue in comparison period) × 100
              - Target = Expected contribution percentage for this vertical
              - Trend = Change in contribution percentage from previous period
              
              API fields needed:
              - verticalsData.kpis.contribution.value (current contribution %)
              - verticalsData.kpis.contribution.previousValue (comparison period contribution %)
              - verticalsData.kpis.contribution.target (target contribution %)
              - verticalsData.kpis.contribution.previousTarget (comparison period target %)
              - verticalsData.kpis.contribution.trend (percentage point change)
            */}
            <div 
              onClick={() => setSelectedKpi('Contribution')}
              className="group cursor-pointer relative bg-gradient-to-br from-blue-50/80 to-blue-100/40 dark:from-blue-950/20 dark:to-blue-900/10 rounded-xl p-4 border border-gray-200/60 dark:border-white/[0.08] hover:border-blue-400/60 dark:hover:border-blue-500/40 hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
            >
              {/* Comparison Indicator - Top Right */}
              {compareMode && (
                <div className="absolute top-3 right-3">
                  <ComparisonIndicator
                    currentValue={verticalsData.kpis.contribution.value}
                    previousValue={verticalsData.kpis.contribution.previousValue}
                    formatValue={(val) => `${val.toFixed(1)}%`}
                    label="Contribution % YoY"
                    showPercentage={false}
                  />
                </div>
              )}
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-blue-100/80 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
                  <PieChart className="w-5 h-5 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                </div>
                {!compareMode && (
                  <PercentageBadge
                    current={verticalsData.kpis.contribution.value}
                    previous={verticalsData.kpis.contribution.value - verticalsData.kpis.contribution.trend}
                    formatValue={(val) => `${val.toFixed(1)}%`}
                    currentTarget={verticalsData.kpis.contribution.target}
                    previousTarget={verticalsData.kpis.contribution.previousTarget}
                    formatTarget={(val) => `${val.toFixed(1)}%`}
                  />
                )}
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Contribution %</p>
              <div className="flex items-baseline gap-2">
                <p className="font-semibold text-gray-900 dark:text-gray-100" style={{ fontSize: '16px' }}>{verticalsData.kpis.contribution.value}%</p>
                <ChevronRight className="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Share of total revenue</p>
            </div>

            {/* 
              CARD 2: ACHIEVEMENT %
              
              What it represents:
              - How much of the revenue target has been achieved
              - Example: If target was 20M OMR and actual revenue is 18M OMR, achievement = 90%
              
              Data source formula:
              - Current Value = (Actual Revenue / Target Revenue) × 100
              - Previous Value = (Actual Revenue in comparison period / Target Revenue in comparison period) × 100
              - Target = Expected achievement % (usually 100% or higher for stretch goals)
              - Trend = Change in achievement percentage from previous period
              
              API fields needed:
              - verticalsData.kpis.achievement.value (current achievement %)
              - verticalsData.kpis.achievement.previousValue (comparison period achievement %)
              - verticalsData.kpis.achievement.target (target achievement %, usually 100%)
              - verticalsData.kpis.achievement.previousTarget (comparison period target achievement %)
              - verticalsData.kpis.achievement.trend (percentage point change)
              
              Note: To calculate this, you need both actual revenue and target revenue from your revenue tables
            */}
            <div 
              onClick={() => setSelectedKpi('Achievement')}
              className="group cursor-pointer relative bg-gradient-to-br from-purple-50/80 to-purple-100/40 dark:from-purple-950/20 dark:to-purple-900/10 rounded-xl p-4 border border-gray-200/60 dark:border-white/[0.08] hover:border-purple-400/60 dark:hover:border-purple-500/40 hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
            >
              {/* Comparison Indicator - Top Right */}
              {compareMode && (
                <div className="absolute top-3 right-3">
                  <ComparisonIndicator
                    currentValue={verticalsData.kpis.achievement.value}
                    previousValue={verticalsData.kpis.achievement.previousValue}
                    formatValue={(val) => `${val.toFixed(1)}%`}
                    label="Achievement % YoY"
                    showPercentage={false}
                  />
                </div>
              )}
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-purple-100/80 dark:bg-purple-900/30 rounded-lg group-hover:scale-110 transition-transform">
                  <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                {!compareMode && (
                  <PercentageBadge
                    current={verticalsData.kpis.achievement.value}
                    previous={verticalsData.kpis.achievement.value - verticalsData.kpis.achievement.trend}
                    formatValue={(val) => `${val.toFixed(1)}%`}
                    currentTarget={verticalsData.kpis.achievement.target}
                    previousTarget={verticalsData.kpis.achievement.previousTarget}
                    formatTarget={(val) => `${val.toFixed(1)}%`}
                  />
                )}
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Achievement %</p>
              <div className="flex items-baseline gap-2">
                <p className="font-semibold text-gray-900 dark:text-gray-100" style={{ fontSize: '16px' }}>{verticalsData.kpis.achievement.value}%</p>
                <ChevronRight className="w-3.5 h-3.5 text-purple-400 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Target completion</p>
            </div>

            {/* Staff & Customer Count - Merged - HIDDEN */}
            <div className="hidden bg-gradient-to-br from-teal-50/80 to-teal-100/40 dark:from-teal-950/20 dark:to-teal-900/10 rounded-xl p-4 border border-gray-200/60 dark:border-white/[0.08] hover:border-teal-300/60 dark:hover:border-teal-500/40 hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-teal-100/80 dark:bg-teal-900/30 rounded-lg">
                  <Users className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Staff & Customers</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <p className="font-semibold text-gray-900 dark:text-gray-100" style={{ fontSize: '16px' }}>{verticalsData.kpis.staffCount.value}</p>
                </div>
                <div className="h-4 w-px bg-teal-300 dark:bg-teal-700"></div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <p className="font-semibold text-gray-900 dark:text-gray-100" style={{ fontSize: '16px' }}>{verticalsData.kpis.customerCount.value.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Active staff & customers</p>
            </div>

            {/* 
              CARD 3: BAD DEBT & ADJUSTMENTS
              
              What it represents:
              - Bad Debt: Revenue that was recorded but cannot be collected (customers who won't pay)
              - Adjustments: Revenue corrections or write-offs (billing errors, discounts, refunds)
              
              Data source:
              - Bad Debt comes from accounts receivable/collections system
              - Adjustments come from billing/finance system for revenue corrections
              
              Business logic:
              - Bad Debt: Sum of all invoices marked as uncollectible for this vertical in the period
              - Adjustments: Sum of all revenue adjustments (credits, corrections) for this vertical in the period
              
              API fields needed:
              - verticalsData.kpis.badDebt.value (total bad debt amount in OMR)
              - verticalsData.kpis.badDebt.previousValue (comparison period bad debt in OMR)
              - verticalsData.kpis.adjustment.value (total adjustments amount in OMR)
              - verticalsData.kpis.adjustment.previousValue (comparison period adjustments in OMR)
              
              Note: These are absolute amounts in OMR, not percentages. Lower is better for both metrics.
            */}
            <div 
              onClick={() => setSelectedKpi('Bad Debt')}
              className="group cursor-pointer relative bg-gradient-to-br from-orange-50/80 to-red-50/40 dark:from-orange-950/20 dark:to-red-900/10 rounded-xl p-4 border border-gray-200/60 dark:border-white/[0.08] hover:border-orange-400/60 dark:hover:border-orange-500/40 hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
            >
              {/* Comparison Indicator - Top Right */}
              {compareMode && (
                <div className="absolute top-3 right-3">
                  <ComparisonIndicator
                    currentValue={verticalsData.kpis.badDebt.value}
                    previousValue={verticalsData.kpis.badDebt.previousValue}
                    formatValue={formatCurrency}
                    label="Bad Debt YoY"
                    additionalInfo={[
                      {
                        label: 'Adjustments',
                        current: formatCurrency(verticalsData.kpis.adjustment.value),
                        previous: formatCurrency(verticalsData.kpis.adjustment.previousValue)
                      }
                    ]}
                  />
                </div>
              )}
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-orange-100/80 dark:bg-orange-900/30 rounded-lg group-hover:scale-110 transition-transform">
                  <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Bad Debt & Adjustments</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 dark:text-red-400" />
                  <p className="text-[11px] sm:text-xs font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(verticalsData.kpis.badDebt.value)}</p>
                </div>
                <div className="h-4 w-px bg-orange-300 dark:bg-orange-700"></div>
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 dark:text-indigo-400" />
                  <p className="text-[11px] sm:text-xs font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(verticalsData.kpis.adjustment.value)}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Debt & adjusted amounts</p>
                <ChevronRight className="w-3.5 h-3.5 text-orange-400 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all" />
              </div>
            </div>

            {/* Drilldown Popup */}
            <Dialog open={!!selectedKpi} onOpenChange={(open) => {
              if (!open) {
                setSelectedKpi(null);
                setDrilldownService(null);
              }
            }}>
              <DialogContent 
                aria-describedby={undefined}
                className="sm:max-w-[500px] bg-white dark:bg-[#07112F] border border-gray-200 dark:border-white/[0.08] shadow-2xl p-0 overflow-hidden outline-none"
              >
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle className="flex items-center gap-2">
                    <AnimatePresence mode="wait">
                      {drilldownService ? (
                        <motion.button
                          key="back-button"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          onClick={() => setDrilldownService(null)}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors mr-1"
                        >
                          <ArrowLeft className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </motion.button>
                      ) : (
                        <motion.div
                          key="icon"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="p-2 bg-blue-100/60 dark:bg-blue-900/20 rounded-lg mr-1"
                        >
                          {selectedKpi === 'Contribution' && <PieChart className="w-4 h-4 text-blue-600" />}
                          {selectedKpi === 'Achievement' && <Target className="w-4 h-4 text-purple-600" />}
                          {selectedKpi === 'Bad Debt' && <AlertCircle className="w-4 h-4 text-orange-600" />}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {drilldownService || `${selectedKpi} Details`}
                    </span>
                  </DialogTitle>
                </DialogHeader>

                <div className="p-6 pt-4">
                  <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10">
                    <AnimatePresence mode="wait">
                      {!drilldownService ? (
                        <motion.div
                          key="services-list"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="grid grid-cols-1 gap-3"
                        >
                          {services.map((service, index) => (
                            <div
                              key={service}
                              onClick={() => setDrilldownService(service)}
                              className="group cursor-pointer p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/[0.05] hover:border-blue-300/60 dark:hover:border-blue-500/40 hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{service}</span>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                                    {selectedKpi === 'Contribution' && `${(25 + index * 5).toFixed(1)}%`}
                                    {selectedKpi === 'Achievement' && `${(92 + index).toFixed(1)}%`}
                                    {selectedKpi === 'Bad Debt' && (
                                      <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5">
                                          <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                                          <span>{formatCurrency(150000 + index * 50000)}</span>
                                        </div>
                                        <div className="h-4 w-px bg-gray-200 dark:bg-gray-700"></div>
                                        <div className="flex items-center gap-1.5 text-indigo-500">
                                          <RefreshCw className="w-3.5 h-3.5" />
                                          <span>{formatCurrency(25000 + index * 10000)}</span>
                                        </div>
                                      </div>
                                    )}
                                    {selectedKpi === 'Churn' && `${(1.2 + index * 0.2).toFixed(1)}%`}
                                  </span>
                                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="products-list"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="grid grid-cols-1 gap-3"
                        >
                          {productHierarchy[drilldownService].map((product, index) => (
                            <div
                              key={product}
                              className="group p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/[0.05] hover:border-blue-300/60 dark:hover:border-blue-500/40 hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">{product}</span>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                                    {selectedKpi === 'Contribution' && `${(8 + index * 2).toFixed(1)}%`}
                                    {selectedKpi === 'Achievement' && `${(94 + index).toFixed(1)}%`}
                                    {selectedKpi === 'Bad Debt' && (
                                      <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5">
                                          <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                                          <span>{formatCurrency(45000 + index * 12000)}</span>
                                        </div>
                                        <div className="h-4 w-px bg-gray-200 dark:bg-gray-700"></div>
                                        <div className="flex items-center gap-1.5 text-indigo-500">
                                          <RefreshCw className="w-3.5 h-3.5" />
                                          <span>{formatCurrency(8000 + index * 3000)}</span>
                                        </div>
                                      </div>
                                    )}
                                    {selectedKpi === 'Churn' && `${(0.8 + index * 0.1).toFixed(1)}%`}
                                  </span>
                                </div>
                              </div>

                              {selectedKpi === 'Achievement' && (
                                <div className="mt-3">
                                  <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${94 + index}%` }}
                                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="p-4 bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-white/[0.05] flex justify-between items-center">
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 italic">
                    {drilldownService ? `Showing products for ${drilldownService}` : 'Click a service to view product level data'}
                  </p>
                  <Button 
                    variant="ghost" 
                    size="default" 
                    onClick={() => {
                      setSelectedKpi(null);
                      setDrilldownService(null);
                    }}
                    className="text-xs h-10 px-6 font-medium bg-gray-100/50 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10"
                  >
                    Close
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Sort & Filter Controls - Fully Responsive */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-4 flex-shrink-0">
            {/* Left: Filter Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 flex-1">
              {/* Filter Tabs */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 p-[3px]">
                <button
                  onClick={() => setFilterView('all')}
                  className={`flex-1 min-h-[44px] sm:min-h-0 px-3 py-2 rounded text-xs font-medium transition-all duration-200 ${
                    filterView === 'all'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterView('top5')}
                  className={`flex-1 min-h-[44px] sm:min-h-0 px-3 py-2 rounded text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                    filterView === 'top5'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  Top 5
                </button>
                <button
                  onClick={() => setFilterView('bottom5')}
                  className={`flex-1 min-h-[44px] sm:min-h-0 px-3 py-2 rounded text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                    filterView === 'bottom5'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  Bottom 5
                </button>
              </div>

              {/* Dropdowns Row */}
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full min-h-[44px] sm:min-h-0 sm:h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Achievement %">Achievement</SelectItem>
                    <SelectItem value="Contribution %">Contribution</SelectItem>
                    <SelectItem value="Customer Count">Customers</SelectItem>
                    <SelectItem value="Staff Count">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right: Search Input */}
            <div className="w-full lg:w-[30%] relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-400 transition-colors duration-300 pointer-events-none" />
              <Input
                placeholder="Search verticals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full min-h-[44px] sm:min-h-0 sm:h-9 focus:ring-0 focus:border-blue-100/30 dark:focus:border-blue-400/15 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Segment List */}
          <div className="flex-1 overflow-y-auto p-[0px] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full">
            <div className="space-y-3">
            {currentItems.length > 0 ? (
              currentItems.map((segment, index) => {
                const segmentColor = getSegmentColor(segment.color);
                const isSelected = selectedVertical === segment.name;
                
                // Calculate additional metrics
                const churnRate = (Math.random() * 5 + 1).toFixed(1); // Random churn rate between 1-6%
                const adjustmentAmount = Math.floor(Math.random() * 100000) - 50000; // Random adjustment between -50K and +50K
                const revenueChange = (segment.revenue - segment.previousRevenue) * 1000000; // Convert to actual value
                const previousAchievement = segment.previousAchievement || segment.achievement - 2;
                
                return (
                  <motion.div
                    key={`${segment.segmentName}-${segment.name}-${index}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                      isSelected 
                        ? 'bg-blue-50/60 dark:bg-blue-950/20 border-blue-300/60 dark:border-blue-700/50' 
                        : 'bg-slate-50/80 dark:bg-slate-800/30 border-slate-200/60 dark:border-slate-700/40 hover:border-blue-300/70 dark:hover:border-blue-600/60 hover:shadow-lg hover:shadow-blue-100/30 dark:hover:shadow-blue-900/20'
                    }`}
                    style={{ minHeight: '88px' }}
                    onClick={() => onVerticalSelect?.(segment.name)}
                  >
                    <div className="flex items-center justify-between">
                      {/* Left: Avatar + Segment Info */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="relative">
                          <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                            <span className="text-white font-medium">{segment.abbreviation}</span>
                          </div>
                          {index === 0 && (
                            <div className="hidden absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                              <Trophy className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <h4 className="font-medium text-gray-900 dark:text-white truncate transition-colors duration-300">
                            {segment.name}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            <span className="truncate">{segment.segmentName}</span>
                            <span>•</span>
                            <span className="truncate">Contribution {segment.contribution}%</span>
                            <span>•</span>
                            <span className="whitespace-nowrap">{segment.customers.toLocaleString()} customers</span>
                          </div>
                          
                          {/* New Metrics Row */}
                          <div className="flex items-center gap-2 flex-wrap">
                            {/* Churn Rate */}
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800/40">
                              <TrendingDown className="w-3 h-3 text-red-600 dark:text-red-400" />
                              <span className="text-xs font-medium text-red-700 dark:text-red-300">
                                Churn {churnRate}%
                              </span>
                            </div>
                            
                            {/* Adjustment Amount */}
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800/40">
                              <TrendingDown className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                              <span className="text-xs font-medium text-orange-700 dark:text-orange-300">
                                Adj {adjustmentAmount < 0 ? '-' : '+'}{Math.abs(adjustmentAmount / 1000).toFixed(0)}K
                              </span>
                            </div>
                            
                            {/* Revenue Change */}
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800/40">
                              <TrendingUp className="w-3 h-3 text-green-600 dark:text-green-400" />
                              <span className="text-xs font-medium text-green-700 dark:text-green-300">
                                +{(revenueChange / 1000).toFixed(0)}K
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right: Achievement Badge + Circular Progress Ring + Arrow */}
                      <div className="flex items-center gap-3">
                        {/* Achievement QoQ Badge */}
                        <div className="hidden sm:block">
                          <PercentageBadge
                            current={segment.achievement}
                            previous={previousAchievement}
                            formatValue={(val) => `${val.toFixed(1)}%`}
                          />
                        </div>
                        
                        {/* Circular Progress Ring */}
                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="none"
                              className="text-gray-200 dark:text-gray-700 transition-colors duration-300"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={`${segment.achievement * 2.83} 283`}
                              strokeLinecap="round"
                              className="text-blue-600 dark:text-blue-400 transition-all duration-500"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-blue-600 dark:text-blue-400 font-medium text-xs sm:text-sm transition-colors duration-300">
                              {segment.achievement}%
                            </span>
                          </div>
                        </div>
                        
                        {/* Chevron Arrow */}
                        <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 transition-colors duration-300" />
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p className="text-sm">
                  {searchQuery ? `No segments found matching "${searchQuery}"` : 'No segment data found for current filters.'}
                </p>
              </div>
            )}
            </div>
          </div>

          {/* Clean Pagination - Fixed at bottom */}
          {totalPages > 1 && (
            <div className="flex-shrink-0 pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <div className="flex items-center justify-between">
                {/* Results Info */}
                <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredSegments.length)} of {filteredSegments.length} results
                </div>
                
                {/* Clean Pagination Controls */}
                <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0 px-[10px] py-[0px]">
                  {/* First Page Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                    className={`flex-shrink-0 hidden sm:flex w-9 h-9 p-0 rounded-lg border-gray-300/60 dark:border-gray-600/50 transition-all duration-300 ${
                      currentPage === 1 
                        ? 'opacity-40 cursor-not-allowed' 
                        : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:scale-105'
                    }`}
                    title="First page"
                  >
                    <span className="text-sm font-medium">««</span>
                  </Button>
                  
                  {/* Previous Page Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className={`flex-shrink-0 w-9 h-9 p-0 rounded-lg border-gray-300/60 dark:border-gray-600/50 transition-all duration-300 ${
                      currentPage === 1 
                        ? 'opacity-40 cursor-not-allowed' 
                        : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:scale-105'
                    }`}
                    title="Previous page"
                  >
                    <span className="text-sm font-medium">‹</span>
                  </Button>
                  
                  {/* Smart page number display */}
                  <div className="flex items-center gap-1">
                    {/* Mobile: Enhanced current/total display */}
                    <div className="sm:hidden flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-gray-900/40 rounded-lg border border-gray-200/50 dark:border-gray-600/30 backdrop-blur-sm">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors duration-300">
                        Page
                      </span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md transition-colors duration-300">
                        {currentPage}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                        of {totalPages}
                      </span>
                    </div>
                    
                    {/* Desktop: Enhanced page numbers */}
                    <div className="hidden sm:flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page => {
                          // Show first page, last page, current page, and adjacent pages
                          if (page === 1 || page === totalPages) return true;
                          if (Math.abs(page - currentPage) <= 1) return true;
                          return false;
                        })
                        .map((page, index, array) => {
                          const prevPage = array[index - 1];
                          const showEllipsis = prevPage && page - prevPage > 1;
                          
                          return (
                            <span key={page} className="contents">
                              {showEllipsis && (
                                <span className="px-2 py-1 text-gray-400 dark:text-gray-500 text-sm font-medium transition-colors duration-300 select-none">
                                  •••
                                </span>
                              )}
                              <Button
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className={`flex-shrink-0 w-9 h-9 p-0 rounded-lg font-medium transition-all duration-300 ${
                                  currentPage === page 
                                    ? 'bg-blue-500 dark:bg-blue-600 text-white border-blue-500 dark:border-blue-600 shadow-lg shadow-blue-500/25 scale-105 ring-2 ring-blue-200 dark:ring-blue-400/30' 
                                    : 'border-gray-300/60 dark:border-gray-600/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:scale-105'
                                }`}
                                title={`Go to page ${page}`}
                              >
                                <span className="text-sm">{page}</span>
                              </Button>
                            </span>
                          );
                        })}
                    </div>
                  </div>
                  
                  {/* Next Page Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className={`flex-shrink-0 w-9 h-9 p-0 rounded-lg border-gray-300/60 dark:border-gray-600/50 transition-all duration-300 ${
                      currentPage === totalPages 
                        ? 'opacity-40 cursor-not-allowed' 
                        : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:scale-105'
                    }`}
                    title="Next page"
                  >
                    <span className="text-sm font-medium">›</span>
                  </Button>
                  
                  {/* Last Page Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    className={`flex-shrink-0 hidden sm:flex w-9 h-9 p-0 rounded-lg border-gray-300/60 dark:border-gray-600/50 transition-all duration-300 ${
                      currentPage === totalPages 
                        ? 'opacity-40 cursor-not-allowed' 
                        : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:scale-105'
                    }`}
                    title="Last page"
                  >
                    <span className="text-sm font-medium">»»</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-[#07112F] rounded-xl p-6 border border-[#E2E8F0] dark:border-[#E2E8F0]/20 transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-100/60 to-blue-50/30 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg">
                <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-[13px] sm:text-[15px] font-medium text-gray-900 dark:text-gray-100">
                My Segments/Verticals
              </h2>
            </div>
          </div>

          {/* Top KPI Cards - 4 cards in a row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 flex-shrink-0">
            {/* Contribution % */}
            <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 dark:from-blue-950/20 dark:to-blue-900/10 rounded-xl p-4 border border-gray-200/60 dark:border-white/[0.08] hover:border-blue-300/60 dark:hover:border-blue-500/40 hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-blue-100/80 dark:bg-blue-900/30 rounded-lg">
                  <PieChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <PercentageBadge
                  current={verticalsData.kpis.contribution.value}
                  previous={verticalsData.kpis.contribution.value - verticalsData.kpis.contribution.trend}
                  formatValue={(val) => `${val.toFixed(1)}%`}
                  currentTarget={verticalsData.kpis.contribution.target}
                  previousTarget={verticalsData.kpis.contribution.previousTarget}
                  formatTarget={(val) => `${val.toFixed(1)}%`}
                />
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Contribution %</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100" style={{ fontSize: '16px' }}>{verticalsData.kpis.contribution.value}%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Share of total revenue</p>
            </div>

            {/* Achievement % */}
            <div className="bg-gradient-to-br from-purple-50/80 to-purple-100/40 dark:from-purple-950/20 dark:to-purple-900/10 rounded-xl p-4 border border-gray-200/60 dark:border-white/[0.08] hover:border-purple-300/60 dark:hover:border-purple-500/40 hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-purple-100/80 dark:bg-purple-900/30 rounded-lg">
                  <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <PercentageBadge
                  current={verticalsData.kpis.achievement.value}
                  previous={verticalsData.kpis.achievement.value - verticalsData.kpis.achievement.trend}
                  formatValue={(val) => `${val.toFixed(1)}%`}
                  currentTarget={verticalsData.kpis.achievement.target}
                  previousTarget={verticalsData.kpis.achievement.previousTarget}
                  formatTarget={(val) => `${val.toFixed(1)}%`}
                />
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Achievement %</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100" style={{ fontSize: '16px' }}>{verticalsData.kpis.achievement.value}%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Target completion</p>
            </div>

            {/* Staff Count */}
            <div className="bg-gradient-to-br from-teal-50/80 to-teal-100/40 dark:from-teal-950/20 dark:to-teal-900/10 rounded-xl p-4 border border-gray-200/60 dark:border-white/[0.08] hover:border-teal-300/60 dark:hover:border-teal-500/40 hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-teal-100/80 dark:bg-teal-900/30 rounded-lg">
                  <Users className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <PercentageBadge
                  current={verticalsData.kpis.staffCount.value}
                  previous={Math.round(verticalsData.kpis.staffCount.value / (1 + verticalsData.kpis.staffCount.trend / 100))}
                  formatValue={(val) => val.toLocaleString()}
                  currentTarget={verticalsData.kpis.staffCount.target}
                  previousTarget={verticalsData.kpis.staffCount.previousTarget}
                  formatTarget={(val) => val.toLocaleString()}
                />
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Staff Count</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100" style={{ fontSize: '16px' }}>{verticalsData.kpis.staffCount.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Active Sales Staff</p>
            </div>

            {/* Customer Count */}
            <div className="bg-gradient-to-br from-green-50/80 to-green-100/40 dark:from-green-950/20 dark:to-green-900/10 rounded-xl p-4 border border-gray-200/60 dark:border-white/[0.08] hover:border-green-300/60 dark:hover:border-green-500/40 hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-green-100/80 dark:bg-green-900/30 rounded-lg">
                  <Building2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <PercentageBadge
                  current={verticalsData.kpis.customerCount.value}
                  previous={Math.round(verticalsData.kpis.customerCount.value / (1 + verticalsData.kpis.customerCount.trend / 100))}
                  formatValue={(val) => val.toLocaleString()}
                  currentTarget={verticalsData.kpis.customerCount.target}
                  previousTarget={verticalsData.kpis.customerCount.previousTarget}
                  formatTarget={(val) => val.toLocaleString()}
                />
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Customer Count</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100" style={{ fontSize: '16px' }}>{verticalsData.kpis.customerCount.value.toLocaleString()}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Active Customers</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}