import React, { useState, useRef, useEffect } from 'react';
import { Wifi, Smartphone, Server, MessageSquare, Network, MoreHorizontal, TrendingUp, TrendingDown, LayoutGrid, BarChart3, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { PercentageBadge } from './PerformanceTooltip';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import searchSvgPaths from '../imports/svg-qqb0x6d05m';

interface ServiceMatrixProps {
  userRole: string;
  comparisonMode?: boolean;
  comparisonYear?: string;
  year?: string;
  onServiceSelect?: (serviceName: string, serviceColor: string) => void;
}

export function ServiceMatrix({ userRole, comparisonMode = false, comparisonYear = '2023', year = '2024', onServiceSelect }: ServiceMatrixProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'chart'>('cards');
  const [selectedServiceTab, setSelectedServiceTab] = useState<string>('All');
  const [serviceSearch, setServiceSearch] = useState('');
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(-1);
  const [selectedCustomer, setSelectedCustomer] = useState<typeof allCustomersData[0] | null>(null);
  const serviceSearchRef = useRef<HTMLDivElement>(null);
  const serviceInputRef = useRef<HTMLInputElement>(null);

  // Customer data for CR search (same as Performance Overview)
  const allCustomersData = [
    { cr: 'C-10001', name: 'Oman Oil Company', actual: 12500000, target: 11500000, achievement: 108.7 },
    { cr: 'C-10002', name: 'PDO', actual: 11200000, target: 10200000, achievement: 109.8 },
    { cr: 'C-10003', name: 'Oman Gas Company', actual: 8900000, target: 8100000, achievement: 109.9 },
    { cr: 'C-10004', name: 'Sohar Port', actual: 7200000, target: 6800000, achievement: 105.9 },
    { cr: 'C-10005', name: 'Omantel', actual: 6000000, target: 5400000, achievement: 111.1 },
    { cr: 'C-10006', name: 'Bank Muscat', actual: 5500000, target: 5200000, achievement: 105.8 },
    { cr: 'C-10007', name: 'Ooredoo', actual: 4800000, target: 4500000, achievement: 106.7 },
    { cr: 'C-10008', name: 'National Bank of Oman', actual: 4200000, target: 4000000, achievement: 105.0 },
  ];

  // Customer-specific service data - maps CR to their service usage
  const customerServiceData: Record<string, any> = {
    'C-10001': { // Oman Oil Company
      Fixed: { value: 2100000, target: 2200000, performance: 95.5 },
      Mobile: { value: 1800000, target: 1950000, performance: 92.3 },
      ICT: { value: 3200000, target: 3000000, performance: 106.7 },
      SMS: { value: 450000, target: 600000, performance: 75.0 },
      Connectivity: { value: 950000, target: 900000, performance: 105.6 }
    },
    'C-10002': { // PDO
      Fixed: { value: 3200000, target: 3100000, performance: 103.2 },
      Mobile: { value: 2100000, target: 2300000, performance: 91.3 },
      ICT: { value: 2800000, target: 2600000, performance: 107.7 },
      SMS: { value: 380000, target: 500000, performance: 76.0 },
      Connectivity: { value: 720000, target: 700000, performance: 102.9 }
    },
    'C-10003': { // Oman Gas Company
      Fixed: { value: 1950000, target: 1900000, performance: 102.6 },
      Mobile: { value: 1600000, target: 1750000, performance: 91.4 },
      ICT: { value: 2400000, target: 2200000, performance: 109.1 },
      SMS: { value: 320000, target: 450000, performance: 71.1 },
      Connectivity: { value: 630000, target: 600000, performance: 105.0 }
    },
    'C-10004': { // Sohar Port
      Fixed: { value: 1600000, target: 1550000, performance: 103.2 },
      Mobile: { value: 1100000, target: 1200000, performance: 91.7 },
      ICT: { value: 1850000, target: 1700000, performance: 108.8 },
      SMS: { value: 280000, target: 400000, performance: 70.0 },
      Connectivity: { value: 470000, target: 450000, performance: 104.4 }
    },
    'C-10005': { // Omantel
      Fixed: { value: 1350000, target: 1300000, performance: 103.8 },
      Mobile: { value: 950000, target: 1050000, performance: 90.5 },
      ICT: { value: 1500000, target: 1400000, performance: 107.1 },
      SMS: { value: 240000, target: 350000, performance: 68.6 },
      Connectivity: { value: 360000, target: 340000, performance: 105.9 }
    },
    'C-10006': { // Bank Muscat
      Fixed: { value: 1200000, target: 1180000, performance: 101.7 },
      Mobile: { value: 850000, target: 920000, performance: 92.4 },
      ICT: { value: 1300000, target: 1250000, performance: 104.0 },
      SMS: { value: 210000, target: 300000, performance: 70.0 },
      Connectivity: { value: 290000, target: 280000, performance: 103.6 }
    },
    'C-10007': { // Ooredoo
      Fixed: { value: 1050000, target: 1020000, performance: 102.9 },
      Mobile: { value: 720000, target: 800000, performance: 90.0 },
      ICT: { value: 1100000, target: 1050000, performance: 104.8 },
      SMS: { value: 180000, target: 260000, performance: 69.2 },
      Connectivity: { value: 250000, target: 240000, performance: 104.2 }
    },
    'C-10008': { // National Bank of Oman
      Fixed: { value: 950000, target: 920000, performance: 103.3 },
      Mobile: { value: 680000, target: 730000, performance: 93.2 },
      ICT: { value: 980000, target: 950000, performance: 103.2 },
      SMS: { value: 160000, target: 240000, performance: 66.7 },
      Connectivity: { value: 230000, target: 220000, performance: 104.5 }
    }
  };

  // Filter customers based on search
  const customerSuggestions = serviceSearch
    ? allCustomersData.filter(customer => 
        customer.name.toLowerCase().includes(serviceSearch.toLowerCase()) ||
        customer.cr.toLowerCase().includes(serviceSearch.toLowerCase())
      ).slice(0, 5)
    : [];

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setServiceSearch(value);
    setSelectedServiceIndex(-1);
    if (value) {
      setShowServiceDropdown(true);
    } else {
      setShowServiceDropdown(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showServiceDropdown || customerSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedServiceIndex(prev => 
          prev < customerSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedServiceIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedServiceIndex >= 0 && customerSuggestions[selectedServiceIndex]) {
          selectCustomer(customerSuggestions[selectedServiceIndex]);
        }
        break;
      case 'Escape':
        setShowServiceDropdown(false);
        setSelectedServiceIndex(-1);
        break;
    }
  };

  // Select customer from dropdown
  const selectCustomer = (customer: typeof allCustomersData[0]) => {
    setSelectedCustomer(customer);
    setServiceSearch('');
    setShowServiceDropdown(false);
    setSelectedServiceIndex(-1);
  };

  // Clear customer filter
  const clearCustomerFilter = () => {
    setSelectedCustomer(null);
    setServiceSearch('');
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (serviceSearchRef.current && !serviceSearchRef.current.contains(event.target as Node)) {
        setShowServiceDropdown(false);
        setSelectedServiceIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const services = [
    {
      name: 'Fixed',
      value: 15600000,
      previous: 14800000,
      performance: 94,
      target: 16500000,
      previousTarget: 15700000,
      icon: Wifi,
      color: 'blue',
      trend: 5.2,
      status: 'excellent',
      monthlyData: [
        { month: 'Jan', revenue: 50, compRevenue: 48 },
        { month: 'Feb', revenue: 47, compRevenue: 45 },
        { month: 'Mar', revenue: 52, compRevenue: 49 },
        { month: 'Apr', revenue: 55, compRevenue: 51 },
        { month: 'May', revenue: 49, compRevenue: 47 },
        { month: 'Jun', revenue: 58, compRevenue: 54 },
        { month: 'Jul', revenue: 53, compRevenue: 50 },
        { month: 'Aug', revenue: 61, compRevenue: 57 },
        { month: 'Sep', revenue: 59, compRevenue: 55 },
        { month: 'Oct', revenue: 56, compRevenue: 52 }
      ]
    },
    {
      name: 'Mobile',
      value: 12800000,
      previous: 12330000,
      performance: 89,
      target: 14400000,
      previousTarget: 13800000,
      icon: Smartphone,
      color: 'purple',
      trend: 3.8,
      status: 'excellent',
      monthlyData: [
        { month: 'Jan', revenue: 42, compRevenue: 40 },
        { month: 'Feb', revenue: 45, compRevenue: 42 },
        { month: 'Mar', revenue: 39, compRevenue: 37 },
        { month: 'Apr', revenue: 48, compRevenue: 45 },
        { month: 'May', revenue: 44, compRevenue: 41 },
        { month: 'Jun', revenue: 51, compRevenue: 48 },
        { month: 'Jul', revenue: 46, compRevenue: 43 },
        { month: 'Aug', revenue: 54, compRevenue: 50 },
        { month: 'Sep', revenue: 52, compRevenue: 49 },
        { month: 'Oct', revenue: 49, compRevenue: 46 }
      ]
    },
    {
      name: 'ICT',
      value: 10200000,
      previous: 9400000,
      performance: 96,
      target: 10600000,
      previousTarget: 9800000,
      icon: Server,
      color: 'indigo',
      trend: 8.5,
      status: 'excellent',
      monthlyData: [
        { month: 'Jan', revenue: 35, compRevenue: 32 },
        { month: 'Feb', revenue: 38, compRevenue: 35 },
        { month: 'Mar', revenue: 33, compRevenue: 30 },
        { month: 'Apr', revenue: 41, compRevenue: 38 },
        { month: 'May', revenue: 37, compRevenue: 34 },
        { month: 'Jun', revenue: 44, compRevenue: 41 },
        { month: 'Jul', revenue: 40, compRevenue: 37 },
        { month: 'Aug', revenue: 47, compRevenue: 43 },
        { month: 'Sep', revenue: 45, compRevenue: 42 },
        { month: 'Oct', revenue: 43, compRevenue: 40 }
      ]
    },
    {
      name: 'SMS',
      value: 3800000,
      previous: 3845000,
      performance: 73,
      target: 5200000,
      previousTarget: 5100000,
      icon: MessageSquare,
      color: 'emerald',
      trend: -1.2,
      status: 'good',
      monthlyData: [
        { month: 'Jan', revenue: 15, compRevenue: 16 },
        { month: 'Feb', revenue: 18, compRevenue: 19 },
        { month: 'Mar', revenue: 14, compRevenue: 15 },
        { month: 'Apr', revenue: 20, compRevenue: 21 },
        { month: 'May', revenue: 17, compRevenue: 18 },
        { month: 'Jun', revenue: 22, compRevenue: 23 },
        { month: 'Jul', revenue: 19, compRevenue: 20 },
        { month: 'Aug', revenue: 24, compRevenue: 25 },
        { month: 'Sep', revenue: 21, compRevenue: 22 },
        { month: 'Oct', revenue: 20, compRevenue: 21 }
      ]
    },
    {
      name: 'Connectivity',
      value: 2100000,
      previous: 2057000,
      performance: 84,
      target: 2500000,
      previousTarget: 2400000,
      icon: Network,
      color: 'orange',
      trend: 2.1,
      status: 'excellent',
      monthlyData: [
        { month: 'Jan', revenue: 28, compRevenue: 26 },
        { month: 'Feb', revenue: 31, compRevenue: 29 },
        { month: 'Mar', revenue: 26, compRevenue: 24 },
        { month: 'Apr', revenue: 34, compRevenue: 32 },
        { month: 'May', revenue: 30, compRevenue: 28 },
        { month: 'Jun', revenue: 37, compRevenue: 35 },
        { month: 'Jul', revenue: 33, compRevenue: 31 },
        { month: 'Aug', revenue: 40, compRevenue: 37 },
        { month: 'Sep', revenue: 38, compRevenue: 36 },
        { month: 'Oct', revenue: 35, compRevenue: 33 }
      ]
    }
  ];

  const formatCurrency = (value: number) => {
    return `${(value / 1000000).toFixed(1)}M OMR`;
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { 
      bg: string; 
      text: string; 
      icon: string; 
      bar: string;
      gradient: string;
      glow: string;
      border: string;
      borderHover: string;
      iconBg: string;
      cardBg: string;
      gradientColors: { start: string; end: string };
      solid: string;
    }> = {
      blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-700 dark:text-blue-400',
        icon: 'text-blue-600 dark:text-blue-400',
        bar: 'bg-blue-500',
        gradient: 'from-blue-500 to-cyan-500',
        glow: 'shadow-blue-500/50',
        border: 'border-blue-500',
        borderHover: 'border-blue-300 dark:border-blue-400',
        iconBg: 'bg-blue-100/80 dark:bg-blue-900/20',
        cardBg: 'bg-blue-50/30 dark:bg-blue-950/20',
        gradientColors: { start: '#3b82f6', end: '#06b6d4' },
        solid: '#3b82f6'
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        text: 'text-purple-700 dark:text-purple-400',
        icon: 'text-purple-600 dark:text-purple-400',
        bar: 'bg-purple-500',
        gradient: 'from-purple-500 to-pink-500',
        glow: 'shadow-purple-500/50',
        border: 'border-purple-500',
        borderHover: 'border-purple-300 dark:border-purple-400',
        iconBg: 'bg-purple-100/80 dark:bg-purple-900/20',
        cardBg: 'bg-purple-50/30 dark:bg-purple-950/20',
        gradientColors: { start: '#a855f7', end: '#ec4899' },
        solid: '#a855f7'
      },
      indigo: {
        bg: 'bg-indigo-50 dark:bg-indigo-900/20',
        text: 'text-indigo-700 dark:text-indigo-400',
        icon: 'text-indigo-600 dark:text-indigo-400',
        bar: 'bg-indigo-500',
        gradient: 'from-indigo-500 to-purple-500',
        glow: 'shadow-indigo-500/50',
        border: 'border-indigo-500',
        borderHover: 'border-indigo-300 dark:border-indigo-400',
        iconBg: 'bg-indigo-100/80 dark:bg-indigo-900/20',
        cardBg: 'bg-indigo-50/30 dark:bg-indigo-950/20',
        gradientColors: { start: '#6366f1', end: '#a855f7' },
        solid: '#6366f1'
      },
      emerald: {
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        text: 'text-emerald-700 dark:text-emerald-400',
        icon: 'text-emerald-600 dark:text-emerald-400',
        bar: 'bg-emerald-500',
        gradient: 'from-emerald-500 to-teal-500',
        glow: 'shadow-emerald-500/50',
        border: 'border-emerald-500',
        borderHover: 'border-emerald-300 dark:border-emerald-400',
        iconBg: 'bg-emerald-100/80 dark:bg-emerald-900/20',
        cardBg: 'bg-emerald-50/30 dark:bg-emerald-950/20',
        gradientColors: { start: '#10b981', end: '#14b8a6' },
        solid: '#10b981'
      },
      orange: {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        text: 'text-orange-700 dark:text-orange-400',
        icon: 'text-orange-600 dark:text-orange-400',
        bar: 'bg-orange-500',
        gradient: 'from-orange-500 to-amber-500',
        glow: 'shadow-orange-500/50',
        border: 'border-orange-500',
        borderHover: 'border-orange-300 dark:border-orange-400',
        iconBg: 'bg-orange-100/80 dark:bg-orange-900/20',
        cardBg: 'bg-orange-50/30 dark:bg-orange-950/20',
        gradientColors: { start: '#f97316', end: '#f59e0b' },
        solid: '#f97316'
      }
    };
    return colors[color];
  };

  return (
    <div className="space-y-4" style={{ overflow: 'visible' }}>
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white dark:bg-[#07112F] rounded-xl p-6 border border-[#E2E8F0] dark:border-[#E2E8F0]/20"
          style={{ overflow: 'visible' }}
        >
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-[13px] sm:text-[15px] font-medium text-gray-900 dark:text-gray-100">
                {userRole === 'General Manager' ? 'Services' : 'My Services'}
              </h2>
            </div>
            
            <div className="flex-1 flex items-center justify-center hidden">
              {comparisonMode && (
                <motion.div 
                  className="flex items-center justify-center gap-6 py-2.5 px-4 bg-gradient-to-r from-orange-50/50 via-blue-50/30 to-orange-50/50 dark:from-orange-900/10 dark:via-blue-900/10 dark:to-orange-900/10 rounded-lg border border-orange-100/50 dark:border-orange-800/30"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-[#FB923C] dark:bg-[#f97316]" />
                    <span className="font-['Roboto',sans-serif] font-semibold text-[11px] sm:text-[12px] text-gray-700 dark:text-gray-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Primary ({year})
                    </span>
                  </div>
                  <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-[#93C5FD] dark:bg-[#60a5fa]" />
                    <span className="font-['Roboto',sans-serif] font-semibold text-[11px] sm:text-[12px] text-gray-700 dark:text-gray-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Comparison ({comparisonYear})
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              {/* Service Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 flex-wrap">
                {['All', 'Fixed', 'Mobile', 'ICT', 'SMS', 'Connectivity'].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setSelectedServiceTab(tab)}
                    className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      selectedServiceTab === tab
                        ? 'bg-[#EEF7FF] dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/30'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>

              {/* CR Search Input */}
              <div ref={serviceSearchRef} className="relative flex items-center shrink-0" style={{ width: '167.705px', height: '31.485px' }}>
                <div className="absolute inset-0 bg-[#f3f3f5] dark:bg-gray-800/50 rounded-[6.75px] transition-colors duration-300" />
                <div className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10">
                  <svg className="block" width="14" height="14" fill="none" viewBox="0 0 14 14">
                    <path d={searchSvgPaths.p1d4cac00} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16546" />
                    <path d={searchSvgPaths.p15a39800} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16546" />
                  </svg>
                </div>
                <input
                  ref={serviceInputRef}
                  type="text"
                  placeholder="Search by name or CR number"
                  value={serviceSearch}
                  onChange={handleSearchChange}
                  onFocus={() => serviceSearch && setShowServiceDropdown(true)}
                  aria-label="Search customers by name or CR number"
                  className="relative w-full h-full bg-transparent border-0 outline-none pl-[35px] pr-[10.5px] py-[3.5px] font-['Arial',sans-serif] font-normal text-[12.25px] text-gray-900 dark:text-gray-100 placeholder:text-[#717182] placeholder:font-normal dark:placeholder:text-gray-500 rounded-[6.75px] transition-colors duration-300"
                  style={{ zIndex: 1 }}
                  autoComplete="off"
                  onKeyDown={handleKeyDown}
                />

                {/* Autocomplete Dropdown - Now shows customers */}
                {showServiceDropdown && customerSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                    style={{ minWidth: '200px' }}
                  >
                    <div className="max-h-[240px] overflow-y-auto">
                      {customerSuggestions.map((customer, index) => (
                        <div
                          key={customer.cr}
                          onClick={() => selectCustomer(customer)}
                          className={`px-3 py-2 cursor-pointer transition-colors duration-150 ${
                            index === selectedServiceIndex
                              ? 'bg-blue-50 dark:bg-blue-900/30'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="font-['Roboto',sans-serif] font-semibold text-[11px] text-gray-900 dark:text-gray-100 truncate">
                                {customer.name}
                              </div>
                              <div className="font-['Roboto',sans-serif] font-normal text-[10px] text-gray-500 dark:text-gray-400">
                                {customer.cr}
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="font-['Roboto',sans-serif] font-bold text-[10px] text-blue-600 dark:text-blue-400">
                                {customer.achievement.toFixed(1)}%
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6" style={{ overflow: 'visible' }}>
            {/* Customer Filter Badge */}
            {selectedCustomer && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700/40 rounded-lg"
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

            {viewMode === 'cards' && (
              <div 
                className={`grid gap-4 ${
                  comparisonMode
                    ? 'grid-cols-1'
                    : selectedServiceTab === 'All' 
                      ? 'grid-cols-1 lg:grid-cols-2' 
                      : 'grid-cols-1'
                }`} 
                style={{ overflow: 'visible' }}
              >
                {services
                  .filter(service => service.name !== 'Connectivity') // Hide Connectivity service
                  .filter(service => selectedServiceTab === 'All' || service.name === selectedServiceTab)
                  .map((service, index) => {
                  const colors = getColorClasses(service.color);
                  const Icon = service.icon;
                  const isHovered = hoveredSegment === index;
                  
                  // Override service data if customer is selected
                  let displayValue = service.value;
                  let displayTarget = service.target;
                  let displayPerformance = service.performance;
                  
                  if (selectedCustomer && customerServiceData[selectedCustomer.cr]) {
                    const customerData = customerServiceData[selectedCustomer.cr][service.name];
                    if (customerData) {
                      displayValue = customerData.value;
                      displayTarget = customerData.target;
                      displayPerformance = customerData.performance;
                    }
                  }
                  
                  const getPerformanceColor = (score: number) => {
                    if (score >= 90) return {
                      bg: 'bg-emerald-50/50 dark:bg-emerald-900/10',
                      text: 'text-emerald-600 dark:text-emerald-300',
                      label: 'Excellent',
                      barColor: '#86efac',
                      ringColor: 'ring-emerald-500/10'
                    };
                    if (score >= 75) return {
                      bg: 'bg-blue-50/50 dark:bg-blue-900/10',
                      text: 'text-blue-600 dark:text-blue-300',
                      label: 'Good',
                      barColor: '#93c5fd',
                      ringColor: 'ring-blue-500/10'
                    };
                    if (score >= 60) return {
                      bg: 'bg-amber-50/50 dark:bg-amber-900/10',
                      text: 'text-amber-600 dark:text-amber-300',
                      label: 'Fair',
                      barColor: '#fcd34d',
                      ringColor: 'ring-amber-500/10'
                    };
                    return {
                      bg: 'bg-red-50/50 dark:bg-red-900/10',
                      text: 'text-red-600 dark:text-red-300',
                      label: 'Needs Attention',
                      barColor: '#fca5a5',
                      ringColor: 'ring-red-500/10'
                    };
                  };
                  
                  const performanceStatus = getPerformanceColor(displayPerformance);
                  
                  const currentYearTotal = service.monthlyData.reduce((sum, bar) => sum + bar.revenue, 0);
                  const previousYearTotal = service.monthlyData.reduce((sum, bar) => sum + bar.compRevenue, 0);
                  const yoyChange = previousYearTotal > 0 ? (((currentYearTotal - previousYearTotal) / previousYearTotal) * 100) : 0;
                  const isYoyPositive = yoyChange >= 0;
                  
                  return (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onMouseEnter={() => setHoveredSegment(index)}
                      onMouseLeave={() => setHoveredSegment(null)}
                      className={`group relative rounded-xl border transition-all duration-300 bg-white dark:bg-[#07112F] hover:shadow-md ${
                        isHovered 
                          ? `border ${colors.border} border-opacity-60 dark:border-opacity-60` 
                          : 'border-gray-200 dark:border-gray-700/50'
                      }`}
                    >
                      <div className="p-5 space-y-4">
                        {/* Header */}
                        <div className="flex items-start gap-2.5 w-full">
                          <div className={`p-2.5 rounded-xl shrink-0 ${colors.iconBg}`}>
                            <Icon className={`w-5 h-5 ${colors.icon}`} />
                          </div>
                          <div className="flex-1 min-w-0 space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="text-[14px] font-semibold text-gray-800 dark:text-gray-100 leading-tight tracking-[-0.01em]">
                                {service.name}
                              </h3>
                              <span className={`text-[11px] font-bold shrink-0 ${performanceStatus.text}`}>
                                {displayPerformance}%
                              </span>
                            </div>
                            <div className="relative h-[7px] bg-gray-100 dark:bg-gray-800/50 rounded-full overflow-hidden w-full">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: colors.solid }}
                                initial={{ width: 0 }}
                                animate={{ width: `${displayPerformance}%` }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Revenue and Target */}
                        <div className="flex gap-3">
                          <div className="flex-1 flex flex-col gap-1.5 bg-gradient-to-br from-gray-50/80 to-gray-100/40 dark:from-gray-800/30 dark:to-gray-800/10 rounded-lg p-3 border border-gray-200/60 dark:border-gray-700/30">
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                              Revenue
                            </p>
                            <p className="text-[14px] font-semibold text-gray-900 dark:text-white leading-tight whitespace-nowrap">
                              {formatCurrency(displayValue)}
                            </p>
                          </div>
                          
                          <div className="flex-1 flex flex-col gap-1.5 bg-gradient-to-br from-gray-50/80 to-gray-100/40 dark:from-gray-800/30 dark:to-gray-800/10 rounded-lg p-3 border border-gray-200/60 dark:border-gray-700/30">
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                              Target
                            </p>
                            <p className="text-[14px] font-semibold text-gray-900 dark:text-white leading-tight whitespace-nowrap">
                              {formatCurrency(displayTarget)}
                            </p>
                          </div>
                        </div>

                        {/* YoY Growth */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              YoY Growth
                            </span>
                            <div className="flex items-center gap-1">
                              {isYoyPositive ? (
                                <TrendingUp className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <TrendingDown className="w-3 h-3 text-red-400" />
                              )}
                              <span className={`text-xs font-semibold ${isYoyPositive ? 'text-emerald-500 dark:text-emerald-300' : 'text-red-500 dark:text-red-300'}`}>
                                {isYoyPositive ? '+' : ''}{yoyChange.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          
                          {/* Vertical Bar Chart */}
                          <div className="space-y-2">
                            {(() => {
                              const maxValue = Math.max(
                                ...service.monthlyData.map(d => Math.max(d.revenue, d.compRevenue || 0))
                              );
                              
                              return (
                                <span className="contents">
                                  <div className="relative w-full overflow-x-auto pb-2 scrollbar-hide">
                                    <div className="flex items-end justify-between gap-0.5 sm:gap-2 bg-gray-50/50 dark:bg-gray-800/20 rounded-lg pt-9 pb-2 px-1 sm:px-2 border border-gray-200 dark:border-gray-700/30 w-full">
                                      {service.monthlyData.map((monthData, monthIndex) => {
                                        const revenueHeight = Math.max((monthData.revenue / maxValue) * 100, 8);
                                        const compRevenueHeight = comparisonMode ? Math.max((monthData.compRevenue / maxValue) * 100, 8) : 0;
                                        
                                        // Helper function to create a lighter version of a color
                                        const lightenColor = (hex: string, percent: number = 40) => {
                                          const num = parseInt(hex.replace('#', ''), 16);
                                          const r = Math.min(255, ((num >> 16) + Math.round((255 - (num >> 16)) * percent / 100)));
                                          const g = Math.min(255, (((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * percent / 100)));
                                          const b = Math.min(255, ((num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * percent / 100)));
                                          return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
                                        };
                                        
                                        // Calculate YoY growth for comparison mode
                                        const yoyGrowth = comparisonMode && monthData.compRevenue > 0 
                                          ? (((monthData.revenue - monthData.compRevenue) / monthData.compRevenue) * 100).toFixed(1) 
                                          : '0.0';
                                        const isYoyPositive = parseFloat(yoyGrowth) >= 0;
                                        
                                        return (
                                          <div key={monthIndex} className="flex-1 flex flex-col items-center gap-0.5 sm:gap-1.5 group/month relative hover:z-50 min-w-0">
                                            {/* YoY Growth Indicator - Inside container above bars in comparison mode */}
                                            {comparisonMode && (
                                              <motion.div
                                                className="absolute -top-6 left-1/2 -translate-x-1/2 z-20"
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 + monthIndex * 0.05 + 0.4 }}
                                              >
                                                <div className={`flex items-center gap-0.5 px-1 sm:px-1.5 py-0.5 rounded-md ${
                                                  isYoyPositive 
                                                    ? 'bg-emerald-50/80 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-700/40' 
                                                    : 'bg-red-50/80 dark:bg-red-900/20 border border-red-200/60 dark:border-red-700/40'
                                                }`}>
                                                  {isYoyPositive ? (
                                                    <TrendingUp className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-emerald-500 dark:text-emerald-300" />
                                                  ) : (
                                                    <TrendingDown className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-red-500 dark:text-red-300" />
                                                  )}
                                                  <span className={`font-['Roboto',sans-serif] font-bold text-[7px] sm:text-[8px] whitespace-nowrap ${
                                                    isYoyPositive 
                                                      ? 'text-emerald-600 dark:text-emerald-300' 
                                                      : 'text-red-600 dark:text-red-300'
                                                  }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                                                    {isYoyPositive ? '+' : ''}{yoyGrowth}%
                                                  </span>
                                                </div>
                                              </motion.div>
                                            )}
                                            
                                            <div className="w-full relative flex items-end justify-center gap-0.5 h-32 sm:h-44">
                                              
                                              {comparisonMode && (
                                                <div className="relative flex-1 flex items-end h-full group/comp z-30">
                                                  <motion.div
                                                    className="relative w-full rounded-t-[2px] sm:rounded-t-[4px] transition-all duration-200 min-h-[8px] sm:min-h-[12px] flex items-end justify-center pb-0.5 sm:pb-1 cursor-pointer hover:brightness-110"
                                                    style={{ 
                                                      height: `${compRevenueHeight}%`,
                                                      backgroundColor: lightenColor(colors.solid, 40)
                                                    }}
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${compRevenueHeight}%` }}
                                                    transition={{ duration: 0.6, delay: index * 0.1 + monthIndex * 0.05 }}
                                                  >
                                                    {/* Value label inside bar */}
                                                    <span className="hidden sm:block text-[8px] sm:text-[10px] font-bold text-white whitespace-nowrap">
                                                      {monthData.compRevenue}M
                                                    </span>
                                                    
                                                    {/* Tooltip for comparison bar */}
                                                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover/comp:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                                      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-2 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 whitespace-nowrap">
                                                        <div className="text-[10px] font-semibold mb-0.5 text-gray-600 dark:text-gray-400">{monthData.month} {comparisonYear}</div>
                                                        <div className="text-xs font-bold">{monthData.compRevenue}M OMR</div>
                                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-600 rotate-45" />
                                                      </div>
                                                    </div>
                                                  </motion.div>
                                                </div>
                                              )}
                                              
                                              <div className="relative flex-1 flex items-end h-full group/primary z-30">
                                                <motion.div
                                                  className="relative w-full rounded-t-[2px] sm:rounded-t-[4px] transition-all duration-200 min-h-[8px] sm:min-h-[12px] flex items-end justify-center pb-0.5 sm:pb-1 cursor-pointer hover:brightness-110"
                                                  style={{ 
                                                    height: `${revenueHeight}%`,
                                                    backgroundColor: colors.solid
                                                  }}
                                                  initial={{ height: 0 }}
                                                  animate={{ height: `${revenueHeight}%` }}
                                                  transition={{ duration: 0.6, delay: index * 0.1 + monthIndex * 0.05 }}
                                                >
                                                  {/* Value label inside bar */}
                                                  <span className="hidden sm:block text-[8px] sm:text-[10px] font-bold text-white whitespace-nowrap">
                                                    {monthData.revenue}M
                                                  </span>
                                                  
                                                  {/* Tooltip for primary bar */}
                                                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover/primary:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                                    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-3 py-2 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 whitespace-nowrap">
                                                      <div className="text-[10px] font-semibold mb-0.5 text-gray-600 dark:text-gray-400">{monthData.month} {year}</div>
                                                      <div className="text-xs font-bold">{monthData.revenue}M OMR</div>
                                                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-600 rotate-45" />
                                                    </div>
                                                  </div>
                                                </motion.div>
                                              </div>
                                            </div>
                                            
                                            {/* Baseline */}
                                            <div className="w-full h-[1px] sm:h-[2px] bg-gray-300 dark:bg-gray-600/50 rounded-full" />
                                            
                                            <div className="text-[8px] sm:text-[9px] font-medium text-gray-500 dark:text-gray-400">
                                              {monthData.month}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  
                                  {/* Legend */}
                                  <div className="flex items-center justify-center gap-3 pt-1 text-[10px] text-gray-600 dark:text-gray-400">
                                    {comparisonMode && (
                                      <div className="flex items-center gap-1.5">
                                        <div 
                                          className="w-2.5 h-2.5 rounded-sm" 
                                          style={{ 
                                            backgroundColor: (() => {
                                              const num = parseInt(colors.solid.replace('#', ''), 16);
                                              const r = Math.min(255, ((num >> 16) + Math.round((255 - (num >> 16)) * 40 / 100)));
                                              const g = Math.min(255, (((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * 40 / 100)));
                                              const b = Math.min(255, ((num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * 40 / 100)));
                                              return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
                                            })()
                                          }} 
                                        />
                                        <span>{comparisonYear} Revenue</span>
                                      </div>
                                    )}
                                    <div className="flex items-center gap-1.5">
                                      <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: colors.solid }} />
                                      <span>{year} Revenue</span>
                                    </div>
                                  </div>
                                </span>
                              );
                            })()}
                          </div>
                        </div>

                        {/* View Details */}
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-700/50">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onServiceSelect) {
                                onServiceSelect(service.name, service.color);
                              }
                            }}
                            className="w-full flex items-center justify-center gap-[7px] bg-slate-50 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700 rounded-[4px] px-1 py-[5px] text-[10.5px] text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700/50 hover:border-slate-300 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 cursor-pointer"
                          >
                            <span className="font-['Arial',sans-serif]">View Details</span>
                            <ExternalLink className="w-[10.5px] h-[10.5px]" strokeWidth={0.874} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
    </div>
  );
}