import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ArrowLeft, TrendingDown, TrendingUp, UserMinus, DollarSign, Calendar, AlertCircle, MapPin, Users, Phone, Building2, Activity, Smartphone, Wifi, Server } from 'lucide-react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { ProductOverviewCard } from './ProductOverviewCard';
import { TerminatedCustomersTable } from './TerminatedCustomersTable';
import searchSvgPaths from '../imports/svg-qqb0x6d05m';

interface TerminationDetailsPageProps {
  onBack: () => void;
  comparisonMode?: boolean;
}

// Mock termination data - in production this would come from your data service
const generateTerminationData = () => {
  const customers = [
    { id: 'TERM001', company: 'Al Khuwair Trading Co', segment: 'Medium Business', vertical: 'Retail & Services', kam: 'Ahmed Al-Rashid', terminationDate: '2024-01-20', mobile: 45000, fixed: 38000, ict: 42000, reason: 'Moved to competitor' },
    { id: 'TERM002', company: 'Quriyat Manufacturing', segment: 'SME', vertical: 'Manufacturing', kam: 'Fatima Al-Zahra', terminationDate: '2024-02-15', mobile: 28000, fixed: 22000, ict: 18000, reason: 'Business closure' },
    { id: 'TERM003', company: 'Madinat Sultan Qaboos IT', segment: 'Large Business', vertical: 'Technology', kam: 'Mohamed Al-Balushi', terminationDate: '2024-03-08', mobile: 95000, fixed: 118000, ict: 142000, reason: 'Price concerns' },
    { id: 'TERM004', company: 'Al Ghubra Healthcare', segment: 'Medium Business', vertical: 'Healthcare', kam: 'Sarah Al-Kindi', terminationDate: '2024-04-22', mobile: 52000, fixed: 48000, ict: 55000, reason: 'Service quality' },
    { id: 'TERM005', company: 'Seeb Logistics Ltd', segment: 'SME', vertical: 'Transportation', kam: 'Layla Al-Zahra', terminationDate: '2024-05-10', mobile: 32000, fixed: 28000, ict: 24000, reason: 'Business closure' },
    { id: 'TERM006', company: 'Muttrah Finance Group', segment: 'Large Business', vertical: 'Finance & Insurance', kam: 'Omar Al-Rashid', terminationDate: '2024-06-05', mobile: 88000, fixed: 95000, ict: 105000, reason: 'Moved to competitor' },
    { id: 'TERM007', company: 'Ruwi Construction', segment: 'Medium Business', vertical: 'Real Estate & Construction', kam: 'Aisha Al-Balushi', terminationDate: '2024-07-18', mobile: 58000, fixed: 62000, ict: 48000, reason: 'Price concerns' },
    { id: 'TERM008', company: 'Azaiba Retail Chain', segment: 'SME', vertical: 'Retail & Services', kam: 'Hassan Al-Kindi', terminationDate: '2024-08-25', mobile: 35000, fixed: 28000, ict: 22000, reason: 'Service quality' },
  ];

  return customers.map(c => ({
    ...c,
    totalRevenue: c.mobile + c.fixed + c.ict,
    trend: -5 - Math.random() * 10, // Terminations show negative impact
  }));
};

export function TerminationDetailsPage({ onBack, comparisonMode = false }: TerminationDetailsPageProps) {
  const terminatedCustomers = generateTerminationData();
  const [activeService, setActiveService] = useState<'all' | 'mobile' | 'fixed' | 'ict'>('all');
  
  // CR Search state
  const [crSearch, setCrSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedCustomer, setSelectedCustomer] = useState<typeof terminatedCustomers[0] | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Filter suggestions based on search
  const suggestions = useMemo(() => {
    if (!crSearch.trim()) return [];
    const searchLower = crSearch.toLowerCase();
    return terminatedCustomers.filter(
      customer => 
        customer.id.toLowerCase().includes(searchLower) || 
        customer.company.toLowerCase().includes(searchLower)
    );
  }, [crSearch, terminatedCustomers]);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCrSearch(e.target.value);
    setShowDropdown(true);
    setSelectedIndex(-1);
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      selectCustomer(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setSelectedIndex(-1);
    }
  };
  
  // Select a customer from dropdown
  const selectCustomer = (customer: typeof terminatedCustomers[0]) => {
    setSelectedCustomer(customer);
    setCrSearch(customer.id);
    setShowDropdown(false);
    setSelectedIndex(-1);
  };
  
  // Clear customer filter
  const clearCustomerFilter = () => {
    setSelectedCustomer(null);
    setCrSearch('');
    setShowDropdown(false);
    setSelectedIndex(-1);
  };
  
  // Calculate aggregate metrics (current year) - filtered or all
  const totalTerminations = selectedCustomer ? 1 : terminatedCustomers.length;
  const totalRevenueLoss = selectedCustomer ? selectedCustomer.totalRevenue : terminatedCustomers.reduce((sum, c) => sum + c.totalRevenue, 0);
  const avgLossPerTermination = totalRevenueLoss / totalTerminations;
  
  // Previous year metrics for comparison (8.3% worse than current, so better performance this year)
  const prevTotalTerminations = 9;
  const prevTotalRevenueLoss = totalRevenueLoss * 1.083; // 8.3% more loss last year
  const prevAvgLossPerTermination = prevTotalRevenueLoss / prevTotalTerminations;
  
  const mobileLoss = terminatedCustomers.reduce((sum, c) => sum + c.mobile, 0);
  const fixedLoss = terminatedCustomers.reduce((sum, c) => sum + c.fixed, 0);
  const ictLoss = terminatedCustomers.reduce((sum, c) => sum + c.ict, 0);

  // Generate monthly termination trend with previous year data
  const monthlyTrend = [
    { month: 'Jan', count: 1, revenue: 125000, prevCount: 1, prevRevenue: 135000, customers: ['Al Khuwair Trading Co'] },
    { month: 'Feb', count: 1, revenue: 68000, prevCount: 1, prevRevenue: 75000, customers: ['Quriyat Manufacturing'] },
    { month: 'Mar', count: 1, revenue: 355000, prevCount: 2, prevRevenue: 385000, customers: ['Madinat Sultan Qaboos IT'] },
    { month: 'Apr', count: 1, revenue: 155000, prevCount: 1, prevRevenue: 168000, customers: ['Al Ghubra Healthcare'] },
    { month: 'May', count: 1, revenue: 84000, prevCount: 1, prevRevenue: 92000, customers: ['Seeb Logistics Ltd'] },
    { month: 'Jun', count: 1, revenue: 288000, prevCount: 1, prevRevenue: 312000, customers: ['Muttrah Finance Group'] },
    { month: 'Jul', count: 1, revenue: 168000, prevCount: 1, prevRevenue: 182000, customers: ['Ruwi Construction'] },
    { month: 'Aug', count: 1, revenue: 85000, prevCount: 1, prevRevenue: 92000, customers: ['Azaiba Retail Chain'] },
    { month: 'Sep', count: 0, revenue: 0, prevCount: 0, prevRevenue: 0, customers: [] },
    { month: 'Oct', count: 0, revenue: 0, prevCount: 0, prevRevenue: 0, customers: [] },
  ];

  // Termination reasons breakdown
  const reasonsData = [
    { name: 'Moved to competitor', count: 2, percentage: 25, color: '#ef4444' },
    { name: 'Price concerns', count: 2, percentage: 25, color: '#f97316' },
    { name: 'Service quality', count: 2, percentage: 25, color: '#f59e0b' },
    { name: 'Business closure', count: 2, percentage: 25, color: '#6b7280' },
  ];

  // Product revenue loss breakdown
  const productData = [
    { name: 'Mobile', revenue: mobileLoss, color: '#a855f7', percentage: ((mobileLoss / totalRevenueLoss) * 100).toFixed(1) },
    { name: 'Fixed', revenue: fixedLoss, color: '#3b82f6', percentage: ((fixedLoss / totalRevenueLoss) * 100).toFixed(1) },
    { name: 'ICT', revenue: ictLoss, color: '#6366f1', percentage: ((ictLoss / totalRevenueLoss) * 100).toFixed(1) }
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M OMR`;
    }
    return `${(value / 1000).toFixed(0)}K OMR`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <div className="space-y-6 overflow-visible">
      {/* 1. Page Header */}
      <div data-section="header" className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#07112F] border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-[#0a1425] transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Back</span>
          </button>
          
          {/* CR Search */}
          <div ref={searchRef} className="relative flex items-center shrink-0" style={{ width: '167.705px', height: '31.485px' }}>
            <div className="absolute inset-0 bg-[#f3f3f5] dark:bg-gray-800/50 rounded-[6.75px] transition-colors duration-300" />
            <div className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10">
              <svg className="block" width="14" height="14" fill="none" viewBox="0 0 14 14">
                <path d={searchSvgPaths.p1d4cac00} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16546" />
                <path d={searchSvgPaths.p15a39800} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16546" />
              </svg>
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by CR or name"
              value={crSearch}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={() => crSearch && setShowDropdown(true)}
              aria-label="Search terminated customers by CR or name"
              className="relative w-full h-full bg-transparent border-0 outline-none pl-[35px] pr-[10.5px] py-[3.5px] font-['Arial',sans-serif] font-normal text-[12.25px] text-gray-900 dark:text-gray-100 placeholder:text-[#717182] placeholder:font-normal dark:placeholder:text-gray-500 rounded-[6.75px] transition-colors duration-300"
            />
            
            {/* Autocomplete Dropdown */}
            {showDropdown && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto"
              >
                {suggestions.map((customer, index) => (
                  <div
                    key={customer.id}
                    className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                      index === selectedIndex
                        ? 'bg-orange-50 dark:bg-orange-900/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    } ${index !== suggestions.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}
                    onClick={() => selectCustomer(customer)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-['Roboto',sans-serif] font-semibold text-sm text-gray-900 dark:text-gray-100">
                          {customer.company}
                        </div>
                        <div className="font-['Roboto',sans-serif] text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {customer.id} • {customer.segment}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-semibold text-red-600 dark:text-red-400">
                          -{formatCurrency(customer.totalRevenue)}
                        </div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400">
                          {customer.terminationDate}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Termination Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-orange-50/80 via-red-50/60 to-rose-50/40 dark:from-orange-950/30 dark:via-red-950/20 dark:to-rose-950/10 rounded-xl p-6 border border-orange-200/60 dark:border-orange-800/30"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <UserMinus className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Terminations</h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/40">
                    YTD 2024
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Detailed analysis of customer terminations and revenue impact
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Customer Filter Badge */}
        {selectedCustomer && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-between gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-700/40 rounded-lg"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="p-1.5 bg-orange-500/10 dark:bg-orange-400/10 rounded-md">
                <svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                  Filtered by Customer
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-['Roboto',sans-serif] font-semibold text-[13px] text-gray-900 dark:text-gray-100 truncate">
                    {selectedCustomer.company}
                  </span>
                  <span className="font-['Roboto',sans-serif] font-normal text-[11px] text-gray-500 dark:text-gray-400">
                    ({selectedCustomer.id})
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={clearCustomerFilter}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 shrink-0"
            >
              <svg className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300">Clear</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* 2. KPI Cards */}
      <div data-section="overview-cards" className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Terminations Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="group relative bg-orange-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-orange-200/50 dark:border-white/[0.08] hover:border-orange-300/60 dark:hover:border-orange-500/40 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col gap-[11px] relative z-10">
            <div className="size-[31.5px] shrink-0 bg-orange-100 dark:bg-orange-500/10 rounded-[8.75px] flex items-center justify-center">
              <UserMinus className="w-[14px] h-[14px] text-orange-600 dark:text-orange-400" />
            </div>
            
            <div className="flex gap-[11px] items-start">
              <div className="flex-1 flex flex-col gap-[7px]">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">TOTAL TERMINATIONS</p>
                <div className="flex flex-col gap-[1.75px]">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                    {formatNumber(totalTerminations)}
                  </p>
                  {comparisonMode ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 leading-[15px]">
                        vs {formatNumber(prevTotalTerminations)}
                      </span>
                      <div className="flex items-center gap-0.5">
                        <TrendingDown className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          {(((totalTerminations - prevTotalTerminations) / prevTotalTerminations) * 100).toFixed(1)}% Better
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[10px] text-orange-600 dark:text-orange-400 leading-[15px]">
                      Lost Customers
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Revenue Impact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="group relative bg-red-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-red-200/50 dark:border-white/[0.08] hover:border-red-300/60 dark:hover:border-red-500/40 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col gap-[11px] relative z-10">
            <div className="size-[31.5px] shrink-0 bg-red-100 dark:bg-red-500/10 rounded-[8.75px] flex items-center justify-center">
              <TrendingDown className="w-[14px] h-[14px] text-red-600 dark:text-red-400" />
            </div>
            
            <div className="flex gap-[11px] items-start">
              <div className="flex-1 flex flex-col gap-[7px]">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">REVENUE IMPACT</p>
                <div className="flex flex-col gap-[1.75px]">
                  <p className="text-sm sm:text-base font-semibold text-red-600 dark:text-red-400 leading-tight">
                    -{formatCurrency(totalRevenueLoss)}
                  </p>
                  {comparisonMode ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 leading-[15px]">
                        vs -{formatCurrency(prevTotalRevenueLoss)}
                      </span>
                      <div className="flex items-center gap-0.5">
                        <TrendingDown className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          {(((prevTotalRevenueLoss - totalRevenueLoss) / prevTotalRevenueLoss) * 100).toFixed(1)}% Better
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">
                      Lost Revenue
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Avg Loss per Termination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="group relative bg-amber-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-amber-200/50 dark:border-white/[0.08] hover:border-amber-300/60 dark:hover:border-amber-500/40 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col gap-[11px] relative z-10">
            <div className="size-[31.5px] shrink-0 bg-amber-100 dark:bg-amber-500/10 rounded-[8.75px] flex items-center justify-center">
              <DollarSign className="w-[14px] h-[14px] text-amber-600 dark:text-amber-400" />
            </div>
            
            <div className="flex gap-[11px] items-start">
              <div className="flex-1 flex flex-col gap-[7px]">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">AVG PER CUSTOMER</p>
                <div className="flex flex-col gap-[1.75px]">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                    {formatCurrency(avgLossPerTermination)}
                  </p>
                  {comparisonMode ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 leading-[15px]">
                        vs {formatCurrency(prevAvgLossPerTermination)}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {avgLossPerTermination <= prevAvgLossPerTermination ? (
                          <>
                            <TrendingDown className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                              {(((prevAvgLossPerTermination - avgLossPerTermination) / prevAvgLossPerTermination) * 100).toFixed(1)}% Better
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="w-2.5 h-2.5 text-red-600 dark:text-red-400 rotate-180" />
                            <span className="text-[10px] font-bold text-red-600 dark:text-red-400">
                              +{(((avgLossPerTermination - prevAvgLossPerTermination) / prevAvgLossPerTermination) * 100).toFixed(1)}% Worse
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">
                      Avg Loss
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Termination Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="group relative bg-rose-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-rose-200/50 dark:border-white/[0.08] hover:border-rose-300/60 dark:hover:border-rose-500/40 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col gap-[11px] relative z-10">
            <div className="size-[31.5px] shrink-0 bg-rose-100 dark:bg-rose-500/10 rounded-[8.75px] flex items-center justify-center">
              <AlertCircle className="w-[14px] h-[14px] text-rose-600 dark:text-rose-400" />
            </div>
            
            <div className="flex gap-[11px] items-start">
              <div className="flex-1 flex flex-col gap-[7px]">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">TERMINATION RATE</p>
                <div className="flex flex-col gap-[1.75px]">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                    -8.3%
                  </p>
                  {comparisonMode ? (
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 leading-[15px]">
                      2024 vs 2023
                    </p>
                  ) : (
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 leading-[15px]">
                      vs Last Year
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Monthly Termination Trend Chart - Full Width */}
      <div data-section="termination-trend" className="overflow-visible">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white dark:bg-[#07112F] rounded-xl p-4 sm:p-6 border border-[#E2E8F0] dark:border-[#E2E8F0]/20 overflow-visible"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
              Monthly Termination Trend
            </h3>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6 mb-4 sm:mb-6">
            <div className="flex-1 flex flex-col gap-1.5 bg-gradient-to-br from-gray-50/80 to-gray-100/40 dark:from-gray-800/30 dark:to-gray-800/10 rounded-lg p-2.5 sm:p-3 border border-gray-200/60 dark:border-gray-700/30">
                <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                Revenue Impact
                </p>
                <p className="text-xs sm:text-[14px] font-semibold text-red-600 dark:text-red-400 leading-tight whitespace-nowrap">
                -{formatCurrency(totalRevenueLoss)}
                </p>
            </div>
            
            <div className="flex-1 flex flex-col gap-1.5 bg-gradient-to-br from-gray-50/80 to-gray-100/40 dark:from-gray-800/30 dark:to-gray-800/10 rounded-lg p-2.5 sm:p-3 border border-gray-200/60 dark:border-gray-700/30">
                <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                Terminations
                </p>
                <p className="text-xs sm:text-[14px] font-semibold text-gray-900 dark:text-white leading-tight whitespace-nowrap">
                {totalTerminations} Customers
                </p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              YoY Change
            </span>
            <div className="flex items-center gap-1.5">
              <TrendingDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500" />
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                -8.3% Better
              </span>
            </div>
          </div>

          <div className="space-y-2 mt-4 overflow-visible">
            {(() => {
              const maxValue = Math.max(...monthlyTrend.map(d => Math.max(d.revenue, comparisonMode ? d.prevRevenue : 0)));
              
              return (
                <>
                  <div className="relative w-full pb-2 scrollbar-hide" style={{ overflowX: 'auto', overflowY: 'visible' }}>
                    <div className="flex items-end justify-between gap-1 sm:gap-2 bg-gray-50/50 dark:bg-gray-800/20 rounded-lg pt-9 pb-2 px-1 sm:px-2 border border-gray-200 dark:border-gray-700/30 h-[250px] sm:h-[320px] min-w-[320px] sm:min-w-0 relative overflow-visible">
                      {monthlyTrend.map((monthData, monthIndex) => {
                        const revenueHeight = Math.max((monthData.revenue / maxValue) * 100, 8);
                        const prevRevenueHeight = comparisonMode ? Math.max((monthData.prevRevenue / maxValue) * 100, 8) : 0;
                        
                        // Calculate YoY growth for comparison mode (negative is better for terminations)
                        const yoyGrowth = comparisonMode && monthData.prevRevenue > 0 
                          ? (((monthData.revenue - monthData.prevRevenue) / monthData.prevRevenue) * 100).toFixed(1) 
                          : '0.0';
                        const isYoyPositive = parseFloat(yoyGrowth) >= 0;
                        
                        return (
                          <div key={monthIndex} className="flex-1 flex flex-col items-center gap-1 sm:gap-1.5 group/month relative h-full justify-end min-w-[20px] sm:min-w-0" style={{ zIndex: 1 }}>
                            {/* YoY Growth Indicator or Count Badge */}
                            {comparisonMode ? (
                              monthData.revenue > 0 && (
                                <motion.div
                                  className="absolute -top-6 left-1/2 -translate-x-1/2 z-20"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: monthIndex * 0.05 + 0.4 }}
                                >
                                  <div className={`flex items-center gap-0.5 px-1 sm:px-1.5 py-0.5 rounded-md ${
                                    isYoyPositive 
                                      ? 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
                                      : 'bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700'
                                  }`}>
                                    {isYoyPositive ? (
                                      <TrendingDown className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-red-600 dark:text-red-400" />
                                    ) : (
                                      <TrendingDown className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-emerald-600 dark:text-emerald-400" />
                                    )}
                                    <span className={`font-['Roboto',sans-serif] font-bold text-[7px] sm:text-[8px] whitespace-nowrap ${
                                      isYoyPositive 
                                        ? 'text-red-700 dark:text-red-400' 
                                        : 'text-emerald-700 dark:text-emerald-400'
                                    }`}>
                                      {isYoyPositive ? '+' : ''}{yoyGrowth}%
                                    </span>
                                  </div>
                                </motion.div>
                              )
                            ) : (
                              monthData.count > 0 && (
                                <motion.div
                                  className="absolute -top-6 left-1/2 -translate-x-1/2 z-20"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: monthIndex * 0.05 + 0.4 }}
                                >
                                  <div className="flex items-center gap-0.5 px-1 sm:px-1.5 py-0.5 rounded-md bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700">
                                    <span className="font-['Roboto',sans-serif] font-bold text-[7px] sm:text-[8px] whitespace-nowrap text-orange-600 dark:text-orange-400">
                                      {monthData.count}
                                    </span>
                                  </div>
                                </motion.div>
                              )
                            )}
                            
                            <div className="w-full relative flex items-end justify-center gap-0.5 h-full group-hover/month:z-[99999]">
                              {/* Previous Year Bar (Comparison Mode) */}
                              {comparisonMode && (
                                <div className="relative flex-1 flex items-end h-full">
                                  <motion.div
                                    className="relative w-full flex justify-center items-end bg-gray-300 dark:bg-gray-600 rounded-t-sm sm:rounded-t-md shadow-sm hover:shadow-lg transition-shadow"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${prevRevenueHeight}%` }}
                                    transition={{ duration: 0.6, delay: monthIndex * 0.05, ease: "easeOut" }}
                                  >
                                    {/* Tooltip on hover */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[99999]">
                                      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg p-4 min-w-[200px] transition-colors duration-300">
                                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">{monthData.month} 2023</h4>
                                        <div className="space-y-2">
                                          <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Terminated</span>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">{monthData.prevCount}</span>
                                          </div>
                                          <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Impact</span>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(monthData.prevRevenue)}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                </div>
                              )}
                              
                              {/* Current Year Bar */}
                              <div className="relative flex-1 flex items-end h-full">
                                <motion.div
                                  className="relative w-full flex justify-center items-end"
                                  initial={{ height: 0 }}
                                  animate={{ height: `${revenueHeight}%` }}
                                  transition={{ duration: 0.6, delay: monthIndex * 0.05, ease: "easeOut" }}
                                >
                                  <div className="w-full h-full bg-gradient-to-t from-orange-500 to-red-500 rounded-t-sm sm:rounded-t-md shadow-sm relative group-hover/month:shadow-lg transition-shadow">
                                    {/* Tooltip on hover */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/month:opacity-100 transition-opacity pointer-events-none z-[99999]">
                                      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg p-4 min-w-[200px] transition-colors duration-300">
                                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">{monthData.month} 2024</h4>
                                        <div className="space-y-2 mb-3">
                                          <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Terminated</span>
                                            <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{monthData.count}</span>
                                          </div>
                                          <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Impact</span>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(monthData.revenue)}</span>
                                          </div>
                                        </div>
                                        {monthData.customers && monthData.customers.length > 0 && (
                                          <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                                            <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Customers:</div>
                                            <div className="space-y-1">
                                              {monthData.customers.map((customer, idx) => (
                                                <div key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5">
                                                  <span className="text-orange-500 mt-0.5">•</span>
                                                  <span className="flex-1">{customer}</span>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              </div>
                            </div>
                            
                            {/* Month label */}
                            <motion.span 
                              className="text-[8px] sm:text-[10px] font-medium text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: monthIndex * 0.05 + 0.6 }}
                            >
                              {monthData.month}
                            </motion.span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700/30">
            {comparisonMode && (
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-gray-300 dark:bg-gray-600"></div>
                <span className="text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-400">
                  Previous Year (2023)
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-gradient-to-t from-orange-500 to-red-500"></div>
              <span className="text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-400">
                Current Year (2024)
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4. Monthly Impact by Service */}
      <div data-section="monthly-impact-by-service">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="bg-white dark:bg-[#07112F] rounded-xl p-4 sm:p-6 border border-[#E2E8F0] dark:border-[#E2E8F0]/20"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
              Monthly Impact by Service
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { 
                name: 'Mobile', 
                revenue: mobileLoss, 
                color: '#a855f7', 
                Icon: Smartphone,
                bgClass: 'bg-purple-50 dark:bg-purple-500/10',
                textClass: 'text-purple-600 dark:text-purple-400',
                borderClass: 'border-purple-200 dark:border-purple-700/50 hover:border-purple-300/60 dark:hover:border-purple-400/60'
              },
              { 
                name: 'Fixed', 
                revenue: fixedLoss, 
                color: '#06b6d4', 
                Icon: Wifi,
                bgClass: 'bg-blue-50 dark:bg-blue-500/10',
                textClass: 'text-blue-600 dark:text-blue-400',
                borderClass: 'border-blue-200 dark:border-blue-700/50 hover:border-blue-300/60 dark:hover:border-blue-400/60'
              },
              { 
                name: 'ICT', 
                revenue: ictLoss, 
                color: '#6366f1', 
                Icon: Server,
                bgClass: 'bg-indigo-50 dark:bg-indigo-500/10',
                textClass: 'text-indigo-600 dark:text-indigo-400',
                borderClass: 'border-indigo-200 dark:border-indigo-700/50 hover:border-indigo-300/60 dark:hover:border-indigo-400/60'
              }
            ].map((service, index) => {
              const serviceMonthlyData = monthlyTrend.map((m) => ({
                month: m.month,
                revenue: Math.round((m.revenue * service.revenue) / totalRevenueLoss),
                prevRevenue: Math.round((m.prevRevenue * service.revenue * 1.083) / (totalRevenueLoss * 1.083))
              }));

              const maxValue = Math.max(
                ...serviceMonthlyData.map(d => Math.max(d.revenue, comparisonMode ? d.prevRevenue : 0))
              );

              const { Icon } = service;

              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 + 0.4 }}
                  className={`group relative rounded-xl border transition-all duration-300 bg-white dark:bg-[#07112F] hover:shadow-md ${service.borderClass}`}
                >
                  <div className="p-5 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg ${service.bgClass}`}>
                          <Icon className={`w-5 h-5 ${service.textClass}`} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                            {service.name}
                          </h4>
                          <p className="text-xs text-red-600 dark:text-red-400">
                            -{formatCurrency(service.revenue)} Impact
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingDown className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          -8.3%
                        </span>
                      </div>
                    </div>

                    {/* Mini Area Chart */}
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={serviceMonthlyData}>
                          <defs>
                            <linearGradient id={`gradient-term-${service.name}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={service.color} stopOpacity={0.3}/>
                              <stop offset="95%" stopColor={service.color} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                          <XAxis 
                            dataKey="month" 
                            tick={{ fill: '#9ca3af', fontSize: 10 }}
                            axisLine={{ stroke: '#e5e7eb' }}
                          />
                          <YAxis 
                            tick={{ fill: '#9ca3af', fontSize: 10 }}
                            axisLine={{ stroke: '#e5e7eb' }}
                            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#1f2937',
                              border: 'none',
                              borderRadius: '8px',
                              fontSize: '11px',
                              color: '#fff'
                            }}
                            formatter={(value: number) => formatCurrency(value)}
                          />
                          {comparisonMode && (
                            <Area
                              type="monotone"
                              dataKey="prevRevenue"
                              stroke={service.color}
                              strokeWidth={1.5}
                              strokeOpacity={0.4}
                              fill="none"
                              strokeDasharray="5 5"
                            />
                          )}
                          <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke={service.color}
                            strokeWidth={2}
                            fill={`url(#gradient-term-${service.name})`}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Legend */}
                    {comparisonMode && (
                      <div className="flex items-center justify-center gap-4 pt-2 text-[10px] text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-0.5 border-t-2 border-dashed" style={{ borderColor: service.color, opacity: 0.4 }} />
                          <span>2023</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-0.5" style={{ backgroundColor: service.color }} />
                          <span>2024</span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* 5. Revenue Impact by Product */}
      <div data-section="product-breakdown" className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
              Revenue Impact by Product
            </h3>
            
            {/* Service Tabs */}
            <div className="flex items-center gap-1.5 bg-gray-100/80 dark:bg-gray-800/50 rounded-lg p-1 border border-gray-200/60 dark:border-gray-700/30">
              <button
                onClick={() => setActiveService('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  activeService === 'all'
                    ? 'bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveService('mobile')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  activeService === 'mobile'
                    ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Mobile
              </button>
              <button
                onClick={() => setActiveService('fixed')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  activeService === 'fixed'
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Fixed
              </button>
              <button
                onClick={() => setActiveService('ict')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  activeService === 'ict'
                    ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                ICT
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {(() => {
              // Filter product data based on active service
              const allProductData = [
                { name: 'Mobile', revenue: mobileLoss, color: '#a855f7', Icon: Smartphone },
                { name: 'Fixed', revenue: fixedLoss, color: '#06b6d4', Icon: Wifi },
                { name: 'ICT', revenue: ictLoss, color: '#6366f1', Icon: Server }
              ];
              
              const filteredProductData = activeService === 'all' 
                ? allProductData 
                : allProductData.filter(p => p.name.toLowerCase() === activeService);

              return filteredProductData.map((product, index) => {
                // Generate mock monthly data for the product based on its current revenue
                const productMonthlyData = monthlyTrend.map((m, i) => {
                  const monthRevenue = (m.revenue * product.revenue) / totalRevenueLoss;
                  const monthPrevRevenue = (m.prevRevenue * product.revenue * 1.083) / (totalRevenueLoss * 1.083);
                  return {
                    month: m.month,
                    revenue: Math.round(monthRevenue),
                    prevRevenue: Math.round(monthPrevRevenue)
                  };
                });

                const { Icon } = product;

                return (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 + 0.4 }}
                    className="group relative rounded-xl border transition-all duration-300 bg-white dark:bg-[#07112F] hover:shadow-md border-gray-200 dark:border-gray-700/50 hover:border-orange-300/60 dark:hover:border-orange-400/60"
                  >
                    <div className="p-6 space-y-5">
                      {/* Header */}
                      <div className="flex items-start gap-3 w-full">
                        <div className={`p-3 rounded-xl shrink-0 ${
                          [
                            'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400',
                            'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
                            'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                          ][index % 3]
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-base font-semibold text-gray-800 dark:text-gray-100 leading-tight tracking-tight truncate">
                              Product Name
                            </h4>
                            <div className="flex flex-col items-end bg-red-50 dark:bg-red-800/30 rounded-lg px-3 py-1.5 border border-red-200 dark:border-red-700/50">
                              <span className="text-[10px] font-semibold text-red-500 dark:text-red-400 uppercase tracking-wider">
                                Revenue Impact
                              </span>
                              <span className="text-sm font-bold text-red-600 dark:text-red-400">
                                -{formatCurrency(product.revenue)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Monthly Performance Trend */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            YoY Change
                          </span>
                          <div className="flex items-center gap-1.5">
                            <TrendingDown className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              -8.3% Better
                            </span>
                          </div>
                        </div>
                        
                        {/* Vertical Bar Chart (Mini Version) */}
                        <div className="space-y-2">
                          {(() => {
                            const maxValue = Math.max(
                              ...productMonthlyData.map(d => Math.max(d.revenue, comparisonMode ? d.prevRevenue : 0))
                            );
                            
                            // Helper to lighten color
                            const lightenColor = (hex: string, percent: number) => {
                              const num = parseInt(hex.replace('#', ''), 16);
                              const r = Math.min(255, ((num >> 16) + Math.round((255 - (num >> 16)) * percent / 100)));
                              const g = Math.min(255, (((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * percent / 100)));
                              const b = Math.min(255, ((num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * percent / 100)));
                              return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
                            };

                            const colors = { 
                              solid: product.color
                            };
                            
                            return (
                              <>
                                <div className="flex items-end justify-between gap-2 bg-gray-50/50 dark:bg-gray-800/20 rounded-lg pt-9 pb-2 px-2 border border-gray-200 dark:border-gray-700/30">
                                  {productMonthlyData.map((monthData, monthIndex) => {
                                    const revenueHeight = Math.max((monthData.revenue / maxValue) * 100, 8);
                                    const prevRevenueHeight = comparisonMode ? Math.max((monthData.prevRevenue / maxValue) * 100, 8) : 0;

                                    // Calculate YoY
                                    const yoyGrowth = comparisonMode && monthData.prevRevenue > 0 
                                      ? (((monthData.revenue - monthData.prevRevenue) / monthData.prevRevenue) * 100).toFixed(1) 
                                      : '0.0';
                                    const isYoyPositive = parseFloat(yoyGrowth) >= 0;

                                    return (
                                      <div key={monthIndex} className="flex-1 flex flex-col items-center gap-1.5 group/month relative hover:z-50">
                                        {/* YoY Growth Indicator */}
                                        {comparisonMode && monthData.revenue > 0 && (
                                          <motion.div
                                            className="absolute -top-6 left-1/2 -translate-x-1/2 z-20"
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: monthIndex * 0.05 + 0.4 }}
                                          >
                                            <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-md ${
                                              isYoyPositive 
                                                ? 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700' 
                                                : 'bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700'
                                            }`}>
                                              {isYoyPositive ? (
                                                <TrendingDown className="w-2 h-2 text-red-600 dark:text-red-400 rotate-180" />
                                              ) : (
                                                <TrendingDown className="w-2 h-2 text-emerald-600 dark:text-emerald-400" />
                                              )}
                                              <span className={`font-['Roboto',sans-serif] font-bold text-[8px] whitespace-nowrap ${
                                                isYoyPositive 
                                                  ? 'text-red-700 dark:text-red-400' 
                                                  : 'text-emerald-700 dark:text-emerald-400'
                                              }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                                                {isYoyPositive ? '+' : ''}{yoyGrowth}%
                                              </span>
                                            </div>
                                          </motion.div>
                                        )}

                                        <div className="w-full relative flex items-end justify-center gap-0.5 h-32">
                                          {/* Comparison Bar */}
                                          {comparisonMode && (
                                            <div className="relative flex-1 flex items-end h-full group/comp z-30">
                                              <motion.div
                                                className="relative w-full rounded-t-[4px] transition-all duration-200 min-h-[12px] flex items-end justify-center pb-1 cursor-pointer hover:brightness-110"
                                                style={{ 
                                                  height: `${prevRevenueHeight}%`,
                                                  backgroundColor: lightenColor(colors.solid, 40)
                                                }}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${prevRevenueHeight}%` }}
                                                transition={{ duration: 0.6, delay: monthIndex * 0.05 }}
                                              >
                                                {prevRevenueHeight > 15 && (
                                                  <span className="text-[9px] font-bold text-white whitespace-nowrap mb-1">
                                                    {(monthData.prevRevenue / 1000).toFixed(0)}K
                                                  </span>
                                                )}
                                                
                                                <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover/comp:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                                  <div className="bg-gray-900 dark:bg-gray-800 text-white px-2.5 py-1.5 rounded-lg shadow-xl border border-gray-700 dark:border-gray-600 whitespace-nowrap">
                                                    <div className="text-[9px] font-medium text-gray-400 mb-0.5">{monthData.month} 2023</div>
                                                    <div className="text-[11px] font-bold">{formatCurrency(monthData.prevRevenue)}</div>
                                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 border-r border-b border-gray-700 dark:border-gray-600 rotate-45" />
                                                  </div>
                                                </div>
                                              </motion.div>
                                            </div>
                                          )}

                                          {/* Main Bar */}
                                          <div className="relative flex-1 flex items-end h-full group/main z-30">
                                            <motion.div
                                              className="relative w-full rounded-t-[4px] transition-all duration-200 min-h-[12px] flex items-end justify-center pb-1 cursor-pointer hover:brightness-110"
                                              style={{ 
                                                height: `${revenueHeight}%`,
                                                backgroundColor: colors.solid
                                              }}
                                              initial={{ height: 0 }}
                                              animate={{ height: `${revenueHeight}%` }}
                                              transition={{ duration: 0.6, delay: monthIndex * 0.05 + 0.1 }}
                                            >
                                              {revenueHeight > 15 && (
                                                <span className="text-[10px] font-bold text-white whitespace-nowrap mb-1">
                                                  {(monthData.revenue / 1000).toFixed(0)}K
                                                </span>
                                              )}
                                              
                                              <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover/main:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                                <div className="bg-gray-900 dark:bg-gray-800 text-white px-2.5 py-1.5 rounded-lg shadow-xl border border-gray-700 dark:border-gray-600 whitespace-nowrap">
                                                  <div className="text-[9px] font-medium text-gray-400 mb-0.5">{monthData.month} 2024</div>
                                                  <div className="text-[11px] font-bold">{formatCurrency(monthData.revenue)}</div>
                                                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 border-r border-b border-gray-700 dark:border-gray-600 rotate-45" />
                                                </div>
                                              </div>
                                            </motion.div>
                                          </div>
                                        </div>
                                        
                                        {/* Baseline */}
                                        <div className="w-full h-[2px] bg-gray-300 dark:bg-gray-600/50 rounded-full" />
                                        
                                        {/* Month Label */}
                                        <div className="text-[9px] font-medium text-gray-500 dark:text-gray-400">
                                          {monthData.month}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                                
                                {/* Legend */}
                                <div className="flex items-center justify-center gap-3 pt-1 text-[10px] text-gray-600 dark:text-gray-400">
                                  {comparisonMode && (
                                    <div className="flex items-center gap-1.5">
                                      <div 
                                        className="w-2.5 h-2.5 rounded-sm" 
                                        style={{ 
                                          backgroundColor: lightenColor(colors.solid, 40)
                                        }} 
                                      />
                                      <span>2023 Impact</span>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: colors.solid }} />
                                    <span>2024 Impact</span>
                                  </div>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              });
            })()}
          </div>
      </div>

      {/* Customer List Table */}
      <TerminatedCustomersTable customers={terminatedCustomers} formatCurrency={formatCurrency} />
    </div>
  );
}