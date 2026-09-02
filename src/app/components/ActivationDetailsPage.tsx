import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, UserPlus, DollarSign, Calendar, Activity, MapPin, Users, Phone, Building2, Smartphone, Wifi, Server, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ProductRevenueCard } from './ProductRevenueCard';
import { ProductOverviewCard } from './ProductOverviewCard';
import { ActivatedCustomersTable } from './ActivatedCustomersTable';
import searchSvgPaths from '../imports/svg-qqb0x6d05m';

interface ActivationDetailsPageProps {
  onBack: () => void;
  comparisonMode?: boolean;
}

// Mock activation data - in production this would come from your data service
const generateActivationData = () => {
  const customers = [
    { id: 'ACT001', company: 'Muscat Tech Solutions', segment: 'Large Business', vertical: 'Technology', kam: 'Ahmed Al-Rashid', activationDate: '2024-01-15', mobile: 120000, fixed: 85000, ict: 145000, sms: 12000 },
    { id: 'ACT002', company: 'Sohar Industrial Corp', segment: 'Large Business', vertical: 'Manufacturing', kam: 'Fatima Al-Zahra', activationDate: '2024-02-03', mobile: 95000, fixed: 110000, ict: 88000, sms: 15000 },
    { id: 'ACT003', company: 'Salalah Healthcare Group', segment: 'Medium Business', vertical: 'Healthcare', kam: 'Mohamed Al-Balushi', activationDate: '2024-02-20', mobile: 78000, fixed: 92000, ict: 105000, sms: 8000 },
    { id: 'ACT004', company: 'Nizwa Retail Chain', segment: 'Medium Business', vertical: 'Retail & Services', kam: 'Sarah Al-Kindi', activationDate: '2024-03-10', mobile: 65000, fixed: 48000, ict: 52000, sms: 25000 },
    { id: 'ACT005', company: 'Barka Energy Solutions', segment: 'Large Business', vertical: 'Energy & Utilities', kam: 'Ahmed Al-Rashid', activationDate: '2024-03-25', mobile: 142000, fixed: 168000, ict: 195000, sms: 18000 },
    { id: 'ACT006', company: 'Sur Maritime Services', segment: 'SME', vertical: 'Transportation', kam: 'Layla Al-Zahra', activationDate: '2024-04-12', mobile: 42000, fixed: 35000, ict: 28000, sms: 5000 },
    { id: 'ACT007', company: 'Al Buraimi Logistics', segment: 'Medium Business', vertical: 'Transportation', kam: 'Omar Al-Rashid', activationDate: '2024-05-05', mobile: 88000, fixed: 75000, ict: 82000, sms: 11000 },
    { id: 'ACT008', company: 'Ibra Education Services', segment: 'SME', vertical: 'Government & Public Sector', kam: 'Aisha Al-Balushi', activationDate: '2024-06-18', mobile: 38000, fixed: 42000, ict: 55000, sms: 4000 },
    { id: 'ACT009', company: 'Rustaq Finance Group', segment: 'Large Business', vertical: 'Finance & Insurance', kam: 'Hassan Al-Kindi', activationDate: '2024-07-22', mobile: 135000, fixed: 148000, ict: 172000, sms: 32000 },
    { id: 'ACT010', company: 'Bahla Construction Ltd', segment: 'Medium Business', vertical: 'Real Estate & Construction', kam: 'Maryam Al-Said', activationDate: '2024-08-08', mobile: 92000, fixed: 105000, ict: 88000, sms: 14000 },
  ];

  return customers.map(c => ({
    ...c,
    totalRevenue: c.mobile + c.fixed + c.ict + c.sms,
    trend: 5 + Math.random() * 15, // New activations typically show growth
  }));
};

export function ActivationDetailsPage({ onBack, comparisonMode = false }: ActivationDetailsPageProps) {
  const activatedCustomers = generateActivationData();
  const [activeService, setActiveService] = useState<'all' | 'mobile' | 'fixed' | 'ict'>('all');
  
  // CR Search state
  const [crSearch, setCrSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Calculate aggregate metrics (current year)
  const totalActivations = activatedCustomers.length;
  const totalRevenue = activatedCustomers.reduce((sum, c) => sum + c.totalRevenue, 0);
  const avgRevenuePerActivation = totalRevenue / totalActivations;
  
  // Previous year metrics for comparison
  const prevTotalActivations = 9;
  const prevTotalRevenue = totalRevenue * 0.889; // 12.5% less than current
  const prevAvgRevenuePerActivation = prevTotalRevenue / prevTotalActivations;
  
  const mobileRevenue = activatedCustomers.reduce((sum, c) => sum + c.mobile, 0);
  const fixedRevenue = activatedCustomers.reduce((sum, c) => sum + c.fixed, 0);
  const ictRevenue = activatedCustomers.reduce((sum, c) => sum + c.ict, 0);
  const smsRevenue = activatedCustomers.reduce((sum, c) => sum + c.sms, 0);

  // Generate monthly activation trend with previous year data
  const monthlyTrend = [
    { month: 'Jan', count: 1, revenue: 350000, prevCount: 1, prevRevenue: 320000, customers: ['Muscat Tech Solutions'] },
    { month: 'Feb', count: 2, revenue: 568000, prevCount: 2, prevRevenue: 495000, customers: ['Sohar Industrial Corp', 'Salalah Healthcare Group'] },
    { month: 'Mar', count: 2, revenue: 670000, prevCount: 1, prevRevenue: 580000, customers: ['Nizwa Retail Chain', 'Barka Energy Solutions'] },
    { month: 'Apr', count: 1, revenue: 105000, prevCount: 1, prevRevenue: 95000, customers: ['Sur Maritime Services'] },
    { month: 'May', count: 1, revenue: 245000, prevCount: 1, prevRevenue: 215000, customers: ['Al Buraimi Logistics'] },
    { month: 'Jun', count: 1, revenue: 135000, prevCount: 1, prevRevenue: 125000, customers: ['Ibra Education Services'] },
    { month: 'Jul', count: 1, revenue: 455000, prevCount: 1, prevRevenue: 405000, customers: ['Rustaq Finance Group'] },
    { month: 'Aug', count: 1, revenue: 285000, prevCount: 1, prevRevenue: 248000, customers: ['Bahla Construction Ltd'] },
    { month: 'Sep', count: 0, revenue: 0, prevCount: 0, prevRevenue: 0, customers: [] },
    { month: 'Oct', count: 0, revenue: 0, prevCount: 0, prevRevenue: 0, customers: [] },
  ];

  // Product revenue breakdown
  const productData = [
    { name: 'Mobile', revenue: mobileRevenue, color: '#a855f7', percentage: ((mobileRevenue / totalRevenue) * 100).toFixed(1) },
    { name: 'Fixed', revenue: fixedRevenue, color: '#3b82f6', percentage: ((fixedRevenue / totalRevenue) * 100).toFixed(1) },
    { name: 'ICT', revenue: ictRevenue, color: '#6366f1', percentage: ((ictRevenue / totalRevenue) * 100).toFixed(1) },
    { name: 'SMS', revenue: smsRevenue, color: '#10b981', percentage: ((smsRevenue / totalRevenue) * 100).toFixed(1) }
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

  // Search suggestions
  const suggestions = crSearch.trim() 
    ? activatedCustomers.filter(customer =>
        customer.company.toLowerCase().includes(crSearch.toLowerCase()) ||
        customer.id.toLowerCase().includes(crSearch.toLowerCase())
      ).slice(0, 5)
    : [];

  // Search handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCrSearch(value);
    setShowDropdown(value.trim().length > 0);
    setSelectedIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (suggestions[selectedIndex]) {
          selectCustomer(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        break;
    }
  };

  const selectCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setCrSearch(customer.company);
    setShowDropdown(false);
  };

  const clearSearch = () => {
    setCrSearch('');
    setSelectedCustomer(null);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

          {/* CR Search Field */}
          <div className="flex items-center gap-3">
            {/* Selected Customer Badge */}
            {selectedCustomer && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg"
              >
                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                  Viewing: {selectedCustomer.company}
                </span>
                <button
                  onClick={clearSearch}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                  aria-label="Clear search"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </motion.div>
            )}

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
                  style={{ minWidth: '300px' }}
                >
                  {suggestions.map((customer, index) => (
                    <div
                      key={customer.id}
                      className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                        index === selectedIndex
                          ? 'bg-blue-50 dark:bg-blue-900/20'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      } ${index !== suggestions.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}`}
                      onClick={() => selectCustomer(customer)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                            {customer.company}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {customer.id} • {customer.segment}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(customer.totalRevenue)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Activation Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-emerald-50/80 via-green-50/60 to-teal-50/40 dark:from-emerald-950/30 dark:via-green-950/20 dark:to-teal-950/10 rounded-xl p-6 border border-emerald-200/60 dark:border-emerald-800/30"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Activations</h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                    YTD 2024
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Detailed view of all newly activated customers and their revenue contribution
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2. KPI Cards */}
      <div data-section="overview-cards" className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Activations Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="group relative bg-[#f6fefa] dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-[rgba(164,244,207,0.5)] dark:border-white/[0.08] hover:border-emerald-300/60 dark:hover:border-emerald-500/40 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col gap-[11px] relative z-10">
            <div className="size-[31.5px] shrink-0 bg-[#d0fae5] dark:bg-emerald-500/10 rounded-[8.75px] flex items-center justify-center">
              <UserPlus className="w-[14px] h-[14px] text-emerald-600 dark:text-emerald-400" />
            </div>
            
            <div className="flex gap-[11px] items-start">
              <div className="flex-1 flex flex-col gap-[7px]">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">TOTAL ACTIVATIONS</p>
                <div className="flex flex-col gap-[1.75px]">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                    {formatNumber(totalActivations)}
                  </p>
                  {comparisonMode ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 leading-[15px]">
                        vs {formatNumber(prevTotalActivations)}
                      </span>
                      <div className="flex items-center gap-0.5">
                        <TrendingUp className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          +{(((totalActivations - prevTotalActivations) / prevTotalActivations) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 leading-[15px]">
                      New Customers
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Total Revenue Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="group relative bg-[rgba(239,246,255,0.5)] dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-[rgba(190,219,255,0.5)] dark:border-white/[0.08] hover:border-blue-300/60 dark:hover:border-blue-500/40 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col gap-[11px] relative z-10">
            <div className="size-[31.5px] shrink-0 bg-blue-100 dark:bg-blue-500/10 rounded-[8.75px] flex items-center justify-center">
              <DollarSign className="w-[14px] h-[14px] text-blue-600 dark:text-blue-400" />
            </div>
            
            <div className="flex gap-[11px] items-start">
              <div className="flex-1 flex flex-col gap-[7px]">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">TOTAL REVENUE</p>
                <div className="flex flex-col gap-[1.75px]">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                    {formatCurrency(totalRevenue)}
                  </p>
                  {comparisonMode ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 leading-[15px]">
                        vs {formatCurrency(prevTotalRevenue)}
                      </span>
                      <div className="flex items-center gap-0.5">
                        <TrendingUp className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          +{(((totalRevenue - prevTotalRevenue) / prevTotalRevenue) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">
                      From Activations
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Avg Revenue per Activation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="group relative bg-purple-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-purple-200/50 dark:border-white/[0.08] hover:border-purple-300/60 dark:hover:border-purple-500/40 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col gap-[11px] relative z-10">
            <div className="size-[31.5px] shrink-0 bg-purple-100 dark:bg-purple-500/10 rounded-[8.75px] flex items-center justify-center">
              <Activity className="w-[14px] h-[14px] text-purple-600 dark:text-purple-400" />
            </div>
            
            <div className="flex gap-[11px] items-start">
              <div className="flex-1 flex flex-col gap-[7px]">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">AVG PER CUSTOMER</p>
                <div className="flex flex-col gap-[1.75px]">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                    {formatCurrency(avgRevenuePerActivation)}
                  </p>
                  {comparisonMode ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 leading-[15px]">
                        vs {formatCurrency(prevAvgRevenuePerActivation)}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {avgRevenuePerActivation >= prevAvgRevenuePerActivation ? (
                          <>
                            <TrendingUp className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                              +{(((avgRevenuePerActivation - prevAvgRevenuePerActivation) / prevAvgRevenuePerActivation) * 100).toFixed(1)}%
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingUp className="w-2.5 h-2.5 text-red-600 dark:text-red-400 rotate-180" />
                            <span className="text-[10px] font-bold text-red-600 dark:text-red-400">
                              {(((avgRevenuePerActivation - prevAvgRevenuePerActivation) / prevAvgRevenuePerActivation) * 100).toFixed(1)}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">
                      Avg Revenue
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Activation Rate Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="group relative bg-indigo-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-indigo-200/50 dark:border-white/[0.08] hover:border-indigo-300/60 dark:hover:border-indigo-500/40 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col gap-[11px] relative z-10">
            <div className="size-[31.5px] shrink-0 bg-indigo-100 dark:bg-indigo-500/10 rounded-[8.75px] flex items-center justify-center">
              <TrendingUp className="w-[14px] h-[14px] text-indigo-600 dark:text-indigo-400" />
            </div>
            
            <div className="flex gap-[11px] items-start">
              <div className="flex-1 flex flex-col gap-[7px]">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">ACTIVATION RATE</p>
                <div className="flex flex-col gap-[1.75px]">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                    +12.5%
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

      {/* 3. Monthly Activation Trend Chart - Full Width */}
      <div data-section="activation-trend" className="overflow-visible">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white dark:bg-[#07112F] rounded-xl p-4 sm:p-6 border border-[#E2E8F0] dark:border-[#E2E8F0]/20 overflow-visible"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
              Monthly Activation Trend
            </h3>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6 mb-4 sm:mb-6">
            <div className="flex-1 flex flex-col gap-1.5 bg-gradient-to-br from-gray-50/80 to-gray-100/40 dark:from-gray-800/30 dark:to-gray-800/10 rounded-lg p-2.5 sm:p-3 border border-gray-200/60 dark:border-gray-700/30">
                <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                Revenue Generated
                </p>
                <p className="text-xs sm:text-[14px] font-semibold text-emerald-600 dark:text-emerald-400 leading-tight whitespace-nowrap">
                {formatCurrency(totalRevenue)}
                </p>
            </div>
            
            <div className="flex-1 flex flex-col gap-1.5 bg-gradient-to-br from-gray-50/80 to-gray-100/40 dark:from-gray-800/30 dark:to-gray-800/10 rounded-lg p-2.5 sm:p-3 border border-gray-200/60 dark:border-gray-700/30">
                <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                Activations
                </p>
                <p className="text-xs sm:text-[14px] font-semibold text-gray-900 dark:text-white leading-tight whitespace-nowrap">
                {totalActivations} Customers
                </p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              YoY Growth
            </span>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500" />
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                +12.5%
              </span>
            </div>
          </div>

          <div className="space-y-2 mt-4 overflow-visible">
            {(() => {
              const maxValue = Math.max(...monthlyTrend.map(d => Math.max(d.revenue, comparisonMode ? d.prevRevenue : 0)));
              
              return (
                <>
                  <div className="relative w-full pb-2 scrollbar-hide" style={{ overflowX: 'auto', overflowY: 'visible' }}>
                    <div className="flex items-end justify-between gap-1 sm:gap-2 bg-gray-50/50 dark:bg-gray-800/20 rounded-lg pt-9 pb-2 px-1 sm:px-2 border border-gray-200 dark:border-gray-700/30 h-[250px] sm:h-[320px] min-w-[320px] sm:min-w-0 overflow-visible">
                      {monthlyTrend.map((monthData, monthIndex) => {
                        const revenueHeight = Math.max((monthData.revenue / maxValue) * 100, 8);
                        const prevRevenueHeight = comparisonMode ? Math.max((monthData.prevRevenue / maxValue) * 100, 8) : 0;
                        
                        // Calculate YoY growth for comparison mode
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
                                      ? 'bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700' 
                                      : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
                                  }`}>
                                    {isYoyPositive ? (
                                      <TrendingUp className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-emerald-600 dark:text-emerald-400" />
                                    ) : (
                                      <TrendingUp className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-red-600 dark:text-red-400" />
                                    )}
                                    <span className={`font-['Roboto',sans-serif] font-bold text-[7px] sm:text-[8px] whitespace-nowrap ${
                                      isYoyPositive 
                                        ? 'text-emerald-700 dark:text-emerald-400' 
                                        : 'text-red-700 dark:text-red-400'
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
                                  <div className="flex items-center gap-0.5 px-1 sm:px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700">
                                    <span className="font-['Roboto',sans-serif] font-bold text-[7px] sm:text-[8px] whitespace-nowrap text-emerald-600 dark:text-emerald-400">
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
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Activations</span>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">{monthData.prevCount}</span>
                                          </div>
                                          <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
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
                                  <div className="w-full h-full bg-gradient-to-t from-emerald-500 to-green-500 rounded-t-sm sm:rounded-t-md shadow-sm relative group-hover/month:shadow-lg transition-shadow">
                                    {/* Tooltip on hover */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover/month:opacity-100 transition-opacity pointer-events-none z-[99999]">
                                      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg p-4 min-w-[200px] transition-colors duration-300">
                                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">{monthData.month} 2024</h4>
                                        <div className="space-y-2 mb-3">
                                          <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Activations</span>
                                            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{monthData.count}</span>
                                          </div>
                                          <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(monthData.revenue)}</span>
                                          </div>
                                        </div>
                                        {monthData.customers && monthData.customers.length > 0 && (
                                          <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                                            <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Customers:</div>
                                            <div className="space-y-1">
                                              {monthData.customers.map((customer, idx) => (
                                                <div key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5">
                                                  <span className="text-emerald-500 mt-0.5">•</span>
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
              <div className="w-3 h-3 rounded bg-gradient-to-t from-emerald-500 to-green-500"></div>
              <span className="text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-400">
                Current Year (2024)
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4. Monthly Trend by Service */}
      <div data-section="monthly-trend-by-service">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="bg-white dark:bg-[#07112F] rounded-xl p-4 sm:p-6 border border-[#E2E8F0] dark:border-[#E2E8F0]/20"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
              Monthly Trend by Service
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              { 
                name: 'Mobile', 
                revenue: mobileRevenue, 
                color: '#a855f7', 
                Icon: Smartphone,
                bgClass: 'bg-purple-50 dark:bg-purple-500/10',
                textClass: 'text-purple-600 dark:text-purple-400',
                borderClass: 'border-purple-200 dark:border-purple-700/50 hover:border-purple-300/60 dark:hover:border-purple-400/60'
              },
              { 
                name: 'Fixed', 
                revenue: fixedRevenue, 
                color: '#06b6d4', 
                Icon: Wifi,
                bgClass: 'bg-blue-50 dark:bg-blue-500/10',
                textClass: 'text-blue-600 dark:text-blue-400',
                borderClass: 'border-blue-200 dark:border-blue-700/50 hover:border-blue-300/60 dark:hover:border-blue-400/60'
              },
              { 
                name: 'ICT', 
                revenue: ictRevenue, 
                color: '#6366f1', 
                Icon: Server,
                bgClass: 'bg-indigo-50 dark:bg-indigo-500/10',
                textClass: 'text-indigo-600 dark:text-indigo-400',
                borderClass: 'border-indigo-200 dark:border-indigo-700/50 hover:border-indigo-300/60 dark:hover:border-indigo-400/60'
              },
              { 
                name: 'SMS', 
                revenue: smsRevenue, 
                color: '#10b981', 
                Icon: MessageSquare,
                bgClass: 'bg-emerald-50 dark:bg-emerald-500/10',
                textClass: 'text-emerald-600 dark:text-emerald-400',
                borderClass: 'border-emerald-200 dark:border-emerald-700/50 hover:border-emerald-300/60 dark:hover:border-emerald-400/60'
              }
            ].map((service, index) => {
              const serviceMonthlyData = monthlyTrend.map((m) => ({
                month: m.month,
                revenue: Math.round((m.revenue * service.revenue) / totalRevenue),
                prevRevenue: Math.round((m.prevRevenue * service.revenue * 0.889) / (totalRevenue * 0.889))
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
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatCurrency(service.revenue)} YTD
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          +12.5%
                        </span>
                      </div>
                    </div>

                    {/* Mini Area Chart */}
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={serviceMonthlyData}>
                          <defs>
                            <linearGradient id={`gradient-${service.name}`} x1="0" y1="0" x2="0" y2="1">
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
                            fill={`url(#gradient-${service.name})`}
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

      {/* 5. Revenue by Product */}
      <div data-section="product-breakdown" className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
              Revenue by Product
            </h3>
            
            {/* Service Tabs */}
            <div className="flex items-center gap-1.5 bg-gray-100/80 dark:bg-gray-800/50 rounded-lg p-1 border border-gray-200/60 dark:border-gray-700/30">
              <button
                onClick={() => setActiveService('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  activeService === 'all'
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
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
                { name: 'Mobile', revenue: mobileRevenue, color: '#a855f7', Icon: Smartphone },
                { name: 'Fixed', revenue: fixedRevenue, color: '#06b6d4', Icon: Wifi },
                { name: 'ICT', revenue: ictRevenue, color: '#6366f1', Icon: Server }
              ];
              
              const filteredProductData = activeService === 'all' 
                ? allProductData 
                : allProductData.filter(p => p.name.toLowerCase() === activeService);

              return filteredProductData.map((product, index) => {
                // Generate mock monthly data for the product based on its current revenue
                const productMonthlyData = monthlyTrend.map((m, i) => {
                  const monthRevenue = (m.revenue * product.revenue) / totalRevenue;
                  const monthPrevRevenue = (m.prevRevenue * product.revenue * 0.889) / (totalRevenue * 0.889);
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
                    className="group relative rounded-xl border transition-all duration-300 bg-white dark:bg-[#07112F] hover:shadow-md border-gray-200 dark:border-gray-700/50 hover:border-blue-300/60 dark:hover:border-blue-400/60"
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
                            <div className="flex flex-col items-end bg-slate-100 dark:bg-slate-800/50 rounded-lg px-3 py-1.5 border border-slate-200 dark:border-slate-700/50">
                              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Total Revenue YTD
                              </span>
                              <span className="text-sm font-bold text-slate-900 dark:text-white">
                                {formatCurrency(product.revenue)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Monthly Performance Trend */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            YoY Growth
                          </span>
                          <div className="flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              +12.5%
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
                                                ? 'bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700' 
                                                : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
                                            }`}>
                                              {isYoyPositive ? (
                                                <TrendingUp className="w-2 h-2 text-emerald-600 dark:text-emerald-400" />
                                              ) : (
                                                <TrendingDown className="w-2 h-2 text-red-600 dark:text-red-400" />
                                              )}
                                              <span className={`font-['Roboto',sans-serif] font-bold text-[8px] whitespace-nowrap ${
                                                isYoyPositive 
                                                  ? 'text-emerald-700 dark:text-emerald-400' 
                                                  : 'text-red-700 dark:text-red-400'
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
                                      <span>2023 Revenue</span>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: colors.solid }} />
                                    <span>2024 Revenue</span>
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
      <ActivatedCustomersTable customers={activatedCustomers} formatCurrency={formatCurrency} />
    </div>
  );
}