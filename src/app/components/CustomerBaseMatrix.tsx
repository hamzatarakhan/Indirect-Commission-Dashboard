import React, { useState, useMemo, useRef, useEffect } from 'react';
import { UserPlus, UserMinus, Users, TrendingDown, AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PercentageBadge } from './PerformanceTooltip';
import { ComparisonIndicator } from './ComparisonIndicator';
import searchSvgPaths from '../imports/svg-qqb0x6d05m';

interface CustomerBaseMatrixProps {
  userRole: string;
  compareMode?: boolean;
  onActivationClick?: () => void;
  onTerminationClick?: () => void;
  onCustomerBaseClick?: () => void;
  onChurnRateClick?: () => void;
}

export function CustomerBaseMatrix({ userRole, compareMode, onActivationClick, onTerminationClick, onCustomerBaseClick, onChurnRateClick }: CustomerBaseMatrixProps) {
  const [crSearch, setCrSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedCustomer, setSelectedCustomer] = useState<typeof allCustomersData[0] | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Customer-level data
  const allCustomersData = [
    { 
      cr: 'C-10001', 
      name: 'Oman Oil Company', 
      activeBase: 1,
      activation: { count: 1, value: 850000 },
      termination: { count: 0, value: 0 },
      churn: { count: 0, value: 0, percentage: 0 }
    },
    { 
      cr: 'C-10002', 
      name: 'PDO', 
      activeBase: 1,
      activation: { count: 0, value: 0 },
      termination: { count: 0, value: 0 },
      churn: { count: 0, value: 0, percentage: 0 }
    },
    { 
      cr: 'C-10003', 
      name: 'Oman Gas Company', 
      activeBase: 1,
      activation: { count: 1, value: 540000 },
      termination: { count: 0, value: 0 },
      churn: { count: 0, value: 0, percentage: 0 }
    },
    { 
      cr: 'C-10004', 
      name: 'Sohar Port', 
      activeBase: 1,
      activation: { count: 0, value: 0 },
      termination: { count: 1, value: 320000 },
      churn: { count: 1, value: 320000, percentage: 100 }
    },
    { 
      cr: 'C-10005', 
      name: 'Omantel', 
      activeBase: 1,
      activation: { count: 1, value: 420000 },
      termination: { count: 0, value: 0 },
      churn: { count: 0, value: 0, percentage: 0 }
    },
  ];
  
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
    return allCustomersData.filter(
      customer => 
        customer.cr.toLowerCase().includes(searchLower) || 
        customer.name.toLowerCase().includes(searchLower)
    );
  }, [crSearch]);
  
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
  const selectCustomer = (customer: typeof allCustomersData[0]) => {
    setSelectedCustomer(customer);
    setCrSearch(customer.cr);
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
  
  // Calculate customer-filtered data or use default aggregated data
  const customerData = useMemo(() => {
    if (selectedCustomer) {
      return {
        activation: {
          count: selectedCustomer.activation.count,
          previousCount: 0,
          value: selectedCustomer.activation.value,
          previousValue: 0,
          trend: 0
        },
        termination: {
          count: selectedCustomer.termination.count,
          previousCount: 0,
          value: selectedCustomer.termination.value,
          previousValue: 0,
          trend: 0
        },
        activeBase: {
          count: selectedCustomer.activeBase,
          previousCount: 1,
          trend: 0,
          newThisYear: selectedCustomer.activation.count,
          newThisYearValue: selectedCustomer.activation.value
        },
        churn: {
          count: selectedCustomer.churn.count,
          previousCount: 0,
          value: selectedCustomer.churn.value,
          previousValue: 0,
          percentage: selectedCustomer.churn.percentage,
          previousPercentage: 0,
          trend: 0,
          sparkline: [0, 0, 0, 0, 0, selectedCustomer.churn.percentage]
        },
        badDebt: {
          value: 0,
          previousValue: 0,
          trend: 0
        },
        adjustment: {
          value: 0,
          previousValue: 0,
          trend: 0
        }
      };
    }
    
    // Default aggregated data
    return {
      activation: {
        count: 2847,
        previousCount: 2534,
        value: 8500000,
        previousValue: 7548000,
        trend: 12.5
      },
      termination: {
        count: 1523,
        previousCount: 1661,
        value: 4200000,
        previousValue: 4580000,
        trend: -8.3
      },
      activeBase: {
        count: 45892,
        previousCount: 44042,
        trend: 4.2,
        newThisYear: 892,
        newThisYearValue: 500000
      },
      churn: {
        count: 1523,
        previousCount: 1661,
        value: 4200000,
        previousValue: 4580000,
        percentage: 3.32,
        previousPercentage: 3.36,
        trend: -1.2,
        sparkline: [3.5, 3.6, 3.4, 3.5, 3.3, 3.32]
      },
      badDebt: {
        value: 1850000,
        previousValue: 1760000,
        trend: 5.1
      },
      adjustment: {
        value: 320000,
        previousValue: 327600,
        trend: -2.3
      }
    };
  }, [selectedCustomer]);
  
  const formatCurrency = (value: number) => {
    return `${(value / 1000000).toFixed(2)}M OMR`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <div className="space-y-5">
      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-[#07112F] rounded-xl p-6 border border-[#E2E8F0] dark:border-[#E2E8F0]/20"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-[13px] sm:text-[15px] font-medium text-gray-900 dark:text-gray-100">
              {userRole === 'General Manager' ? 'Customer Base' : 'My Customer Base'}
            </h2>
          </div>
          
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
              placeholder="Search by name or CR number"
              value={crSearch}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onFocus={() => crSearch && setShowDropdown(true)}
              aria-label="Search customers by name or CR number"
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
                    key={customer.cr}
                    className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                      index === selectedIndex
                        ? 'bg-blue-50 dark:bg-blue-900/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    } ${index !== suggestions.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}
                    onClick={() => selectCustomer(customer)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-['Roboto',sans-serif] font-semibold text-sm text-gray-900 dark:text-gray-100">
                          {customer.name}
                        </div>
                        <div className="font-['Roboto',sans-serif] text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {customer.cr}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Customer Filter Badge */}
        {selectedCustomer && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-between gap-3 p-3 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700/40 rounded-lg"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="p-1.5 bg-blue-500/10 dark:bg-blue-400/10 rounded-md">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                  Filtered by Customer
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-['Roboto',sans-serif] font-semibold text-[13px] text-gray-900 dark:text-gray-100 truncate">
                    {selectedCustomer.name}
                  </span>
                  <span className="font-['Roboto',sans-serif] font-normal text-[11px] text-gray-500 dark:text-gray-400">
                    ({selectedCustomer.cr})
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

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Active Customer Base */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onCustomerBaseClick}
            className="group relative bg-[rgba(239,246,255,0.5)] dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-[rgba(190,219,255,0.5)] dark:border-white/[0.08] hover:border-blue-300/60 dark:hover:border-blue-500/40 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            {/* Clickable Indicator - Bottom Right */}
            <div className="absolute bottom-3 right-3 opacity-40 group-hover:opacity-100 transition-opacity duration-200">
              <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            
            {/* Comparison Indicator - Top Right */}
            {compareMode && (
              <div className="absolute top-3 right-3">
                <ComparisonIndicator
                  currentValue={customerData.activeBase.count}
                  previousValue={customerData.activeBase.previousCount}
                  formatValue={formatNumber}
                  label="Customer Base YoY"
                />
              </div>
            )}
            <div className="flex flex-col gap-[11px]">
              {/* Icon */}
              <div className="size-[31.5px] shrink-0 bg-blue-100 dark:bg-blue-500/10 rounded-[8.75px] flex items-center justify-center">
                <Users className="w-[14px] h-[14px] text-blue-600 dark:text-blue-400" />
              </div>
              
              {/* Two Column Layout */}
              <div className="flex gap-[11px] items-start">
                {/* Left Column - Total Customer Base */}
                <div className="flex-1 flex flex-col gap-[7px]">
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">TOTAL CUSTOMER BASE</p>
                  <div className="flex flex-col gap-[1.75px]">
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">{formatNumber(customerData.activeBase.count)}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">Total Customers</p>
                  </div>
                </div>
                
                {/* Right Column - New This Year */}
                <div className="flex-1 flex flex-col gap-[7px]">
                  <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.5px] leading-[15px]">NEW THIS YEAR</p>
                  <div className="flex flex-col gap-[1.75px]">
                    <div className="flex items-center gap-[4px]">
                      <p className="text-sm sm:text-base font-semibold text-emerald-700 dark:text-emerald-400 leading-tight">{formatNumber(customerData.activeBase.newThisYear)}</p>
                      <div className="h-[19px] w-0 flex items-center justify-center">
                        <div className="rotate-90">
                          <div className="h-0 w-[19px] border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-emerald-700 dark:text-emerald-400 leading-tight">{formatCurrency(customerData.activeBase.newThisYearValue)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Activation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            onClick={onActivationClick}
            className="group relative bg-[#f6fefa] dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-[rgba(164,244,207,0.5)] dark:border-white/[0.08] hover:border-emerald-300/60 dark:hover:border-emerald-500/40 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            {/* Clickable Indicator - Bottom Right */}
            <div className="absolute bottom-3 right-3 opacity-40 group-hover:opacity-100 transition-opacity duration-200">
              <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            
            {/* Comparison Indicator - Top Right */}
            {compareMode && (
              <div className="absolute top-3 right-3">
                <ComparisonIndicator
                  currentValue={customerData.activation.count}
                  previousValue={customerData.activation.previousCount}
                  formatValue={formatNumber}
                  label="Activation YoY"
                  additionalInfo={[
                    {
                      label: 'Revenue',
                      current: formatCurrency(customerData.activation.value),
                      previous: formatCurrency(customerData.activation.previousValue)
                    }
                  ]}
                />
              </div>
            )}
            <div className="flex flex-col gap-[11px]">
              {/* Icon */}
              <div className="size-[31.5px] shrink-0 bg-[#d0fae5] dark:bg-emerald-500/10 rounded-[8.75px] flex items-center justify-center">
                <UserPlus className="w-[14px] h-[14px] text-emerald-600 dark:text-emerald-400" />
              </div>
              
              {/* Two Column Layout */}
              <div className="flex gap-[11px] items-start">
                {/* Left Column - Activation */}
                <div className="flex-1 flex flex-col gap-[7px]">
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">ACTIVATION</p>
                  <div className="flex flex-col gap-[1.75px]">
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">{formatNumber(customerData.activation.count)}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">{formatCurrency(customerData.activation.value)}</p>
                  </div>
                </div>
                
                {/* Right Column - New This Year */}
                <div className="flex-1 flex flex-col gap-[7px]">
                  <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.5px] leading-[15px]">NEW THIS YEAR</p>
                  <div className="flex flex-col gap-[1.75px]">
                    <div className="flex items-center gap-[4px]">
                      <p className="text-sm sm:text-base font-semibold text-emerald-700 dark:text-emerald-400 leading-tight">{formatNumber(customerData.activation.count - customerData.activation.previousCount)}</p>
                      <div className="h-[19px] w-0 flex items-center justify-center">
                        <div className="rotate-90">
                          <div className="h-0 w-[19px] border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-emerald-700 dark:text-emerald-400 leading-tight">{formatCurrency(customerData.activation.value - customerData.activation.previousValue)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Termination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onClick={onTerminationClick}
            className="group relative bg-orange-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-orange-200/50 dark:border-white/[0.08] hover:border-orange-300/60 dark:hover:border-orange-500/40 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            {/* Clickable Indicator - Bottom Right */}
            <div className="absolute bottom-3 right-3 opacity-40 group-hover:opacity-100 transition-opacity duration-200">
              <ArrowRight className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            
            {/* Comparison Indicator - Top Right */}
            {compareMode && (
              <div className="absolute top-3 right-3">
                <ComparisonIndicator
                  currentValue={customerData.termination.count}
                  previousValue={customerData.termination.previousCount}
                  formatValue={formatNumber}
                  label="Termination YoY"
                  additionalInfo={[
                    {
                      label: 'Revenue Impact',
                      current: formatCurrency(customerData.termination.value),
                      previous: formatCurrency(customerData.termination.previousValue)
                    }
                  ]}
                />
              </div>
            )}
            <div className="flex flex-col gap-[11px]">
              {/* Icon */}
              <div className="size-[31.5px] shrink-0 bg-orange-100 dark:bg-orange-500/10 rounded-[8.75px] flex items-center justify-center">
                <UserMinus className="w-[14px] h-[14px] text-orange-600 dark:text-orange-400" />
              </div>
              
              {/* Two Column Layout */}
              <div className="flex gap-[11px] items-start">
                {/* Left Column - Termination */}
                <div className="flex-1 flex flex-col gap-[7px]">
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">TERMINATION</p>
                  <div className="flex flex-col gap-[1.75px]">
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">{formatNumber(customerData.termination.count)}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">{formatCurrency(customerData.termination.value)}</p>
                  </div>
                </div>
                
                {/* Right Column - New This Year */}
                <div className="flex-1 flex flex-col gap-[7px]">
                  <p className="text-[10px] font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-[0.5px] leading-[15px]">NEW THIS YEAR</p>
                  <div className="flex flex-col gap-[1.75px]">
                    <div className="flex items-center gap-[4px]">
                      <p className="text-sm sm:text-base font-semibold text-orange-700 dark:text-orange-400 leading-tight">{formatNumber(customerData.termination.count - customerData.termination.previousCount)}</p>
                      <div className="h-[19px] w-0 flex items-center justify-center">
                        <div className="rotate-90">
                          <div className="h-0 w-[19px] border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-orange-700 dark:text-orange-400 leading-tight">{formatCurrency(customerData.termination.value - customerData.termination.previousValue)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Churn Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            onClick={onChurnRateClick}
            className="group relative bg-purple-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-purple-200/50 dark:border-white/[0.08] hover:border-purple-300/60 dark:hover:border-purple-500/40 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            {/* Clickable Indicator - Bottom Right */}
            <div className="absolute bottom-3 right-3 opacity-40 group-hover:opacity-100 transition-opacity duration-200">
              <ArrowRight className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            
            {/* Comparison Indicator - Top Right */}
            {compareMode && (
              <div className="absolute top-3 right-3">
                <ComparisonIndicator
                  currentValue={customerData.churn.count}
                  previousValue={customerData.churn.previousCount}
                  formatValue={formatNumber}
                  label="Churn YoY"
                  additionalInfo={[
                    {
                      label: 'Churn Rate',
                      current: `${customerData.churn.percentage}%`,
                      previous: `${customerData.churn.previousPercentage}%`
                    },
                    {
                      label: 'Revenue Impact',
                      current: formatCurrency(customerData.churn.value),
                      previous: formatCurrency(customerData.churn.previousValue)
                    }
                  ]}
                />
              </div>
            )}
            <div className="flex flex-col gap-[11px]">
              {/* Icon */}
              <div className="size-[31.5px] shrink-0 bg-purple-100 dark:bg-purple-500/10 rounded-[8.75px] flex items-center justify-center">
                <TrendingDown className="w-[14px] h-[14px] text-purple-600 dark:text-purple-400" />
              </div>
              
              {/* Two Column Layout */}
              <div className="flex gap-[11px] items-start">
                {/* Left Column - Churn Rate */}
                <div className="flex-1 flex flex-col gap-[7px]">
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">CHURN RATE ({customerData.churn.percentage}%)</p>
                  <div className="flex flex-col gap-[1.75px]">
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">{formatNumber(customerData.churn.count)}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">{formatCurrency(customerData.churn.value)}</p>
                  </div>
                </div>
                
                {/* Right Column - New This Year */}
                <div className="flex-1 flex flex-col gap-[7px]">
                  <p className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-[0.5px] leading-[15px]">NEW THIS YEAR</p>
                  <div className="flex flex-col gap-[1.75px]">
                    <div className="flex items-center gap-[4px]">
                      <p className="text-sm sm:text-base font-semibold text-purple-700 dark:text-purple-400 leading-tight">{formatNumber(customerData.churn.count - customerData.churn.previousCount)}</p>
                      <div className="h-[19px] w-0 flex items-center justify-center">
                        <div className="rotate-90">
                          <div className="h-0 w-[19px] border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-purple-700 dark:text-purple-400 leading-tight">{formatCurrency(customerData.churn.value - customerData.churn.previousValue)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}