import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Users, DollarSign, Building2, Smartphone, Wifi, Server, MessageSquare, Package, Layers, Activity, Calendar, ChevronRight, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import searchSvgPaths from '../imports/svg-qqb0x6d05m';

interface CustomerBaseDetailsPageProps {
  onBack: () => void;
  comparisonMode?: boolean;
  periodType?: string; // "Yearly", "Quarterly", "Monthly"
  year?: string; // "2024"
  quarter?: string; // "Q1", "Q2", "Q3", "Q4"
  month?: string; // "January", "February", ...
  comparisonPeriod?: string; // Comparison Year
}

// Enhanced mock customer data with historical periods
const generateCustomerBaseData = (period: string = '2024') => {
  // We will generate a consistent set of 50 customers
  const segments = ['Large Business', 'Medium Business', 'SME'];
  const verticals = ['Technology', 'Transportation', 'Finance & Insurance', 'Retail & Services', 'Energy & Utilities', 'Manufacturing', 'Healthcare', 'Government & Public Sector', 'Real Estate & Construction'];
  
  const customers = Array.from({ length: 60 }).map((_, i) => {
    const id = `CB${String(i + 1).padStart(3, '0')}`;
    const segment = segments[i % segments.length];
    const vertical = verticals[i % verticals.length];
    
    // Deterministic random generator based on index
    const rand = (offset: number) => Math.abs(Math.sin(i + offset));
    
    // Generate revenue
    const mobile = Math.round(50000 + rand(1) * 200000);
    const fixed = Math.round(40000 + rand(2) * 150000);
    const ict = Math.round(30000 + rand(3) * 250000);
    const sms = Math.round(10000 + rand(4) * 50000);
    
    // Generate Join Date
    // Distribute join dates: 
    // 60% before 2024 (e.g., 2022-2023)
    // 40% in 2024 (Jan-Dec)
    let joinDate;
    const isNew = rand(5) > 0.4; // 60% chance to be new if we treat rand as uniform, but sin is -1 to 1. abs(sin) is 0 to 1.
    // Let's explicitly set some as 2024 and some as 2023
    const year = (i % 3 === 0) ? '2024' : '2023'; 
    const month = Math.floor(rand(6) * 12); // 0-11
    const day = Math.floor(rand(7) * 28) + 1;
    joinDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    return {
      id,
      company: `Company ${String.fromCharCode(65 + (i % 26))}${i}`,
      segment,
      vertical,
      mobile,
      fixed,
      ict,
      sms,
      totalRevenue: mobile + fixed + ict + sms,
      joinDate,
      mobileProducts: ['Postpaid', 'Data Plans'], 
      fixedProducts: ['Broadband', 'MPLS'], 
      ictProducts: ['Cloud Services', 'Security'], 
      smsProducts: ['Bulk SMS']
    };
  });

  // Filter based on period (cumulative)
  // If period is 2024, return all customers joined on or before 2024
  // If period is 2023, return all customers joined on or before 2023
  const cutoffYear = parseInt(period);
  
  return customers.filter(c => parseInt(c.joinDate.split('-')[0]) <= cutoffYear).map(c => {
    // Apply some year-over-year growth simulation if needed, but keeping it simple for now
    return c;
  });
};

type ViewMode = 'segments' | 'services';
type Granularity = 'yearly' | 'quarterly' | 'monthly';

export function CustomerBaseDetailsPage({ 
  onBack, 
  comparisonMode = false,
  periodType = 'Yearly',
  year = '2024',
  quarter = 'Q3',
  month = 'January',
  comparisonPeriod = '2023'
}: CustomerBaseDetailsPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('segments');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Derive granularity and sub-period from props
  const granularity = periodType.toLowerCase() as Granularity;
  const selectedSubPeriod = useMemo(() => {
    if (granularity === 'quarterly') {
      return parseInt(quarter.replace('Q', ''));
    }
    if (granularity === 'monthly') {
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return months.indexOf(month);
    }
    return 0; // yearly
  }, [granularity, quarter, month]);

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };
  
  // Get data for both periods
  const currentData = useMemo(() => generateCustomerBaseData(year), [year]);
  const comparisonData = useMemo(() => comparisonMode ? generateCustomerBaseData(comparisonPeriod) : [], [comparisonMode, comparisonPeriod]);
  
  // CR Search state
  const [crSearch, setCrSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M OMR`;
    }
    return `${(value / 1000).toFixed(0)}K OMR`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Calculate total metrics
  // Override total count to match main dashboard summary card (45,892)
  const totalCustomers = 45892; 
  const totalRevenue = currentData.reduce((sum, c) => sum + c.totalRevenue, 0);
  const prevTotalCustomers = 44042; // Matches previousCount from dashboard
  const prevTotalRevenue = comparisonData.reduce((sum, c) => sum + c.totalRevenue, 0);

  // Search suggestions
  const suggestions = crSearch.trim() 
    ? currentData.filter(customer =>
        customer.company.toLowerCase().includes(crSearch.toLowerCase()) ||
        customer.id.toLowerCase().includes(crSearch.toLowerCase())
      ).slice(0, 5)
    : [];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showDropdown || suggestions.length === 0) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % suggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (suggestions[selectedIndex]) {
          setSelectedCustomer(suggestions[selectedIndex]);
          setCrSearch('');
          setShowDropdown(false);
        }
      } else if (e.key === 'Escape') {
        setShowDropdown(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showDropdown, suggestions, selectedIndex]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get unique values
  const segments = ['Large Business', 'Medium Business', 'SME'];
  const verticals = [...new Set(currentData.map(c => c.vertical))];
  const services = ['Mobile', 'Fixed', 'ICT', 'SMS'];

  const serviceConfig = {
    Mobile: { icon: Smartphone, color: 'purple', field: 'mobile' as const },
    Fixed: { icon: Wifi, color: 'blue', field: 'fixed' as const },
    ICT: { icon: Server, color: 'indigo', field: 'ict' as const },
    SMS: { icon: MessageSquare, color: 'emerald', field: 'sms' as const }
  };

  const products = {
    Mobile: ['Postpaid', 'Prepaid', 'Data Plans'],
    Fixed: ['Broadband', 'Leased Lines', 'MPLS'],
    ICT: ['Cloud Services', 'Security', 'Data Center', 'Managed Services'],
    SMS: ['Bulk SMS', 'A2P SMS', 'Marketing SMS']
  };

  const getPeriodLabel = () => {
    if (granularity === 'yearly') return year;
    if (granularity === 'quarterly') return `${quarter} ${year}`;
    return `${month} ${year}`;
  };

  const isCustomerInPeriod = (joinDate: string, checkYear: string, checkGranularity: Granularity, subValue: number, isComparison: boolean = false) => {
    const [y, m] = joinDate.split('-').map(Number);
    const targetYear = isComparison ? parseInt(comparisonPeriod) : parseInt(checkYear);
    
    if (y > targetYear) return false;
    if (y < targetYear) return true;
    
    // If same year, check granularity
    if (checkGranularity === 'yearly') return true;
    
    if (checkGranularity === 'quarterly') {
      const q = Math.ceil(m / 3);
      return q <= subValue;
    }
    
    if (checkGranularity === 'monthly') {
      return (m - 1) <= subValue;
    }
    
    return true;
  };

  const isCustomerAddedInExactPeriod = (joinDate: string, checkYear: string, checkGranularity: Granularity, subValue: number) => {
    const [y, m] = joinDate.split('-').map(Number);
    const targetYear = parseInt(checkYear);
    
    if (y !== targetYear) return false;
    
    if (checkGranularity === 'yearly') return true;
    
    if (checkGranularity === 'quarterly') {
      const q = Math.ceil(m / 3);
      return q === subValue;
    }
    
    if (checkGranularity === 'monthly') {
      return (m - 1) === subValue;
    }
    
    return false;
  };

  // Helper to get monthly additions for trend
  const getMonthlyAdditions = (customers: any[], targetYear: string) => {
    const monthlyCounts = Array(12).fill(0);
    customers.forEach(c => {
      const [y, m] = c.joinDate.split('-');
      if (y === targetYear) {
        monthlyCounts[parseInt(m) - 1]++;
      }
    });
    return monthlyCounts.map((count, i) => ({
      month: new Date(parseInt(targetYear), i, 1).toLocaleString('default', { month: 'short' }),
      count
    }));
  };

  // Helper to get unified table data
  const getTableData = () => {
    const targetYear = year;

    // Filter data based on granularity
    const getFilteredData = (data: any[], isPrev: boolean = false) => {
      // For "Total", we show cumulative up to the end of the selected sub-period
      return data.filter(c => isCustomerInPeriod(c.joinDate, targetYear, granularity, selectedSubPeriod, isPrev));
    };

    const currentFiltered = getFilteredData(currentData);
    const prevFiltered = getFilteredData(comparisonData, true);

    const processItem = (item: any, currList: any[], prevList: any[]) => {
      // Exact additions in the selected period (Year, Q, or M)
      const addedCount = currList.filter(c => isCustomerAddedInExactPeriod(c.joinDate, year, granularity, selectedSubPeriod)).length;
      const prevAddedCount = prevList.filter(c => isCustomerAddedInExactPeriod(c.joinDate, comparisonPeriod, granularity, selectedSubPeriod)).length;
      
      return {
        ...item,
        count: currList.length,
        addedCount,
        prevAddedCount,
        prevCount: prevList.length,
        revenue: currList.reduce((sum, c) => sum + (item.field ? c[item.field] : c.totalRevenue), 0)
      };
    };

    if (viewMode === 'segments') {
      return segments.map(segment => {
        const curr = currentFiltered.filter(c => c.segment === segment);
        const prev = prevFiltered.filter(c => c.segment === segment);
        const trendData = getMonthlyAdditions(currentData.filter(c => c.segment === segment), year);
        
        const segmentVerticals = [...new Set(currentData.filter(c => c.segment === segment).map(c => c.vertical))];
        const children = segmentVerticals.map(vertical => {
          const vCurr = curr.filter(c => c.vertical === vertical);
          const vPrev = prev.filter(c => c.vertical === vertical);
          const vAddedCount = vCurr.filter(c => isCustomerAddedInExactPeriod(c.joinDate, year, granularity, selectedSubPeriod)).length;
          const vPrevAddedCount = vPrev.filter(c => isCustomerAddedInExactPeriod(c.joinDate, comparisonPeriod, granularity, selectedSubPeriod)).length;
          
          return {
            id: `${segment}-${vertical}`,
            label: vertical,
            subLabel: 'Vertical',
            count: vCurr.length,
            addedCount: vAddedCount,
            prevAddedCount: vPrevAddedCount,
            revenue: vCurr.reduce((sum, c) => sum + c.totalRevenue, 0),
            icon: Layers,
            color: 'indigo' as const,
            trendData: getMonthlyAdditions(currentData.filter(c => c.segment === segment && c.vertical === vertical), year),
            isChild: true
          };
        }).sort((a, b) => b.count - a.count);

        return processItem({
          id: segment,
          label: segment,
          subLabel: 'Segment',
          icon: Building2,
          color: 'blue' as const,
          trendData,
          children
        }, curr, prev);
      });
    } else {
      return services.map(service => {
        const config = serviceConfig[service as keyof typeof serviceConfig];
        const curr = currentFiltered.filter(c => c[config.field] > 0);
        const prev = prevFiltered.filter(c => c[config.field] > 0);
        
        const serviceProducts = products[service as keyof typeof products] || [];
        const children = serviceProducts.map(product => {
          const productField = `${service.toLowerCase()}Products` as any;
          const pCurr = curr.filter(c => c[productField]?.includes(product));
          const pPrev = prev.filter(c => c[productField]?.includes(product));
          const pAddedCount = pCurr.filter(c => isCustomerAddedInExactPeriod(c.joinDate, year, granularity, selectedSubPeriod)).length;
          const pPrevAddedCount = pPrev.filter(c => isCustomerAddedInExactPeriod(c.joinDate, comparisonPeriod, granularity, selectedSubPeriod)).length;

          return {
            id: `${service}-${product}`,
            label: product,
            subLabel: 'Product',
            count: pCurr.length,
            addedCount: pAddedCount,
            prevAddedCount: pPrevAddedCount,
            revenue: pCurr.reduce((sum, c) => sum + c[config.field], 0),
            icon: Package,
            color: config.color,
            trendData: getMonthlyAdditions(currentData.filter(c => c[config.field] > 0 && c[productField]?.includes(product)), year),
            isChild: true
          };
        }).sort((a, b) => b.count - a.count);

        return processItem({
          id: service,
          label: service,
          field: config.field,
          icon: config.icon,
          color: config.color,
          trendData: getMonthlyAdditions(currentData.filter(c => c[config.field] > 0), year),
          children
        }, curr, prev);
      });
    }
  };

  const tableData = getTableData();
  const addedCustomers = tableData.reduce((sum, item) => sum + (item.addedCount || 0), 0);
  const prevAddedCustomers = tableData.reduce((sum, item) => sum + (item.prevAddedCount || 0), 0);

  return (
    <div className="min-h-screen p-0">
      <div className="w-full mx-auto space-y-6 p-0">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#07112F] border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-[#0a1425] transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Back to Dashboard</span>
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Customer Base Analysis</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Granularity and Sub-period controls removed as they depend on the top header selection */}

            {/* CR Search Placeholder */}
            <div className="relative" ref={searchRef}>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="block" width="14" height="14" fill="none" viewBox="0 0 14 14">
                    <path d={searchSvgPaths.p1d4cac00} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16546" />
                    <path d={searchSvgPaths.p15a39800} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16546" />
                  </svg>
                </div>
                {/* Search input hidden as requested */}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Customer Banner */}
        {selectedCustomer && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedCustomer.company}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{selectedCustomer.id} • {selectedCustomer.segment} • {selectedCustomer.vertical}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear filter
              </button>
            </div>
          </motion.div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           {/* Total Customers */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.3 }}
             className="group relative bg-[rgba(239,246,255,0.5)] dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-[rgba(190,219,255,0.5)] dark:border-white/[0.08] hover:border-blue-300/60 dark:hover:border-blue-500/40 hover:shadow-md transition-all duration-300"
           >
             <div className="flex flex-col gap-[11px] relative z-10">
               <div className="size-[31.5px] shrink-0 bg-blue-100 dark:bg-blue-500/10 rounded-[8.75px] flex items-center justify-center">
                 <Users className="w-[14px] h-[14px] text-blue-600 dark:text-blue-400" />
               </div>
               
               <div className="flex gap-[11px] items-start">
                 <div className="flex-1 flex flex-col gap-[7px]">
                   <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">Total Customer Base</p>
                   <div className="flex flex-col gap-[1.75px]">
                     <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                       {formatNumber(totalCustomers)}
                     </p>
                     {comparisonMode && (
                        <div className="flex items-center gap-1">
                          {calculateChange(totalCustomers, prevTotalCustomers) >= 0 ? (
                            <TrendingUp className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-500" />
                          )}
                          <span className={`text-[10px] font-semibold ${calculateChange(totalCustomers, prevTotalCustomers) >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                            {calculateChange(totalCustomers, prevTotalCustomers) >= 0 ? '+' : ''}{calculateChange(totalCustomers, prevTotalCustomers).toFixed(1)}%
                          </span>
                        </div>
                     )}
                   </div>
                 </div>
               </div>
             </div>
           </motion.div>

           {/* Added Customers */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.3, delay: 0.1 }}
             className="group relative bg-emerald-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-emerald-200/50 dark:border-white/[0.08] hover:border-emerald-300/60 dark:hover:border-emerald-500/40 hover:shadow-md transition-all duration-300"
           >
              <div className="flex flex-col gap-[11px] relative z-10">
                 <div className="size-[31.5px] shrink-0 bg-emerald-100 dark:bg-emerald-500/10 rounded-[8.75px] flex items-center justify-center">
                    <Activity className="w-[14px] h-[14px] text-emerald-600 dark:text-emerald-400" />
                 </div>
                 
                 <div className="flex gap-[11px] items-start">
                    <div className="flex-1 flex flex-col gap-[7px]">
                       <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">Newly Added</p>
                       <div className="flex flex-col gap-[1.75px]">
                          <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                             {addedCustomers > 0 ? `+${addedCustomers}` : addedCustomers}
                          </p>
                          {comparisonMode && (
                             <div className="flex items-center gap-1">
                                {calculateChange(addedCustomers, prevAddedCustomers) >= 0 ? (
                                   <TrendingUp className="w-3 h-3 text-emerald-500" />
                                ) : (
                                   <TrendingDown className="w-3 h-3 text-red-500" />
                                )}
                                <span className={`text-[10px] font-semibold ${calculateChange(addedCustomers, prevAddedCustomers) >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                                   {calculateChange(addedCustomers, prevAddedCustomers) >= 0 ? '+' : ''}{calculateChange(addedCustomers, prevAddedCustomers).toFixed(1)}%
                                </span>
                             </div>
                          )}
                          {!comparisonMode && (
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">
                               In selected period
                            </p>
                          )}
                       </div>
                    </div>
                 </div>
              </div>
           </motion.div>

           {/* Segments */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.3, delay: 0.2 }}
             className="group relative bg-purple-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-purple-200/50 dark:border-white/[0.08] hover:border-purple-300/60 dark:hover:border-purple-500/40 hover:shadow-md transition-all duration-300"
           >
              <div className="flex flex-col gap-[11px] relative z-10">
                 <div className="size-[31.5px] shrink-0 bg-purple-100 dark:bg-purple-500/10 rounded-[8.75px] flex items-center justify-center">
                    <Building2 className="w-[14px] h-[14px] text-purple-600 dark:text-purple-400" />
                 </div>
                 
                 <div className="flex gap-[11px] items-start">
                    <div className="flex-1 flex flex-col gap-[7px]">
                       <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">Active Segments</p>
                       <div className="flex flex-col gap-[1.75px]">
                          <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                             {segments.length}
                          </p>
                          {comparisonMode && (
                             <div className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-emerald-500" />
                                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                   +0%
                                </span>
                             </div>
                          )}
                          {!comparisonMode && (
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">
                               Business types
                            </p>
                          )}
                       </div>
                    </div>
                 </div>
              </div>
           </motion.div>

           {/* Verticals */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.3, delay: 0.3 }}
             className="group relative bg-indigo-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-indigo-200/50 dark:border-white/[0.08] hover:border-indigo-300/60 dark:hover:border-indigo-500/40 hover:shadow-md transition-all duration-300"
           >
              <div className="flex flex-col gap-[11px] relative z-10">
                 <div className="size-[31.5px] shrink-0 bg-indigo-100 dark:bg-indigo-500/10 rounded-[8.75px] flex items-center justify-center">
                    <Layers className="w-[14px] h-[14px] text-indigo-600 dark:text-indigo-400" />
                 </div>
                 
                 <div className="flex gap-[11px] items-start">
                    <div className="flex-1 flex flex-col gap-[7px]">
                       <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">Active Verticals</p>
                       <div className="flex flex-col gap-[1.75px]">
                          <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                             {verticals.length}
                          </p>
                          {comparisonMode && (
                             <div className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-emerald-500" />
                                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                   +0%
                                </span>
                             </div>
                          )}
                          {!comparisonMode && (
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">
                               Industries
                            </p>
                          )}
                       </div>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>

        {/* Unified View Section */}
        <div className="bg-white dark:bg-[#07112F] rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-white/10 overflow-x-auto">
                {['segments', 'services'].map(mode => (
                    <button 
                       key={mode}
                       onClick={() => {
                         setViewMode(mode as ViewMode);
                         setExpandedRows(new Set());
                       }}
                       className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${viewMode === mode ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                    >
                       {mode === 'segments' ? 'Segments & Verticals' : 'Services & Products'}
                    </button>
                ))}
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-white/5">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Category</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Total Customers</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Added in {getPeriodLabel()}</th>
                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[140px]">Acquisition Trend</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Revenue</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                        {tableData.map((item) => {
                           const isExpanded = expandedRows.has(item.id);
                           
                           return (
                             <React.Fragment key={item.id}>
                               <tr 
                                 className={`group transition-colors cursor-pointer ${isExpanded ? 'bg-blue-50/30 dark:bg-blue-500/5' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
                                 onClick={() => toggleRow(item.id)}
                               >
                                   <td className="px-6 py-4">
                                       <div className="flex items-center gap-3">
                                           <div className="w-5 h-5 flex items-center justify-center">
                                              {isExpanded ? (
                                                <ChevronDown className="w-4 h-4 text-gray-400" />
                                              ) : (
                                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                              )}
                                           </div>
                                           <div className={`p-2 rounded-lg bg-${item.color}-100 dark:bg-${item.color}-900/20`}>
                                               <item.icon className={`w-4 h-4 text-${item.color}-600 dark:text-${item.color}-400`} />
                                           </div>
                                           <div>
                                               <div className="text-sm font-bold text-gray-900 dark:text-white">{item.label}</div>
                                               <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">{item.subLabel}</div>
                                           </div>
                                       </div>
                                   </td>
                                   <td className="px-6 py-4 text-center">
                                       <span className="text-sm font-bold text-gray-900 dark:text-white">{formatNumber(item.count)}</span>
                                       {comparisonMode && (
                                         <div className={`text-[10px] font-medium ${calculateChange(item.count, item.prevCount) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                           {calculateChange(item.count, item.prevCount) >= 0 ? '↑' : '↓'} {Math.abs(calculateChange(item.count, item.prevCount)).toFixed(1)}%
                                         </div>
                                       )}
                                   </td>
                                   <td className="px-6 py-4 text-center">
                                       <div className="flex flex-col items-center gap-1">
                                          <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${item.addedCount >= 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                              {item.addedCount >= 0 ? '+' : ''}{item.addedCount}
                                          </div>
                                          {comparisonMode && (
                                            <div className={`text-[10px] font-semibold ${calculateChange(item.addedCount, item.prevAddedCount) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                              vs {item.prevAddedCount} ({calculateChange(item.addedCount, item.prevAddedCount) >= 0 ? '+' : ''}{calculateChange(item.addedCount, item.prevAddedCount).toFixed(0)}%)
                                            </div>
                                          )}
                                       </div>
                                   </td>
                                   <td className="px-6 py-4 text-center">
                                       <div className="flex flex-col items-center gap-1 group/mini-chart">
                                          <div className="h-[24px] w-[120px] mx-auto opacity-70 group-hover/mini-chart:opacity-100 transition-all duration-300 transform group-hover/mini-chart:scale-105">
                                             <ResponsiveContainer width="100%" height="100%">
                                               <BarChart data={item.trendData}>
                                                 <Tooltip 
                                                   cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                                                   content={({ active, payload }) => {
                                                     if (active && payload && payload.length) {
                                                       return (
                                                         <div className="bg-slate-900/95 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded-md shadow-2xl ring-1 ring-black/10 z-50">
                                                           <div className="flex items-center gap-2">
                                                             <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{payload[0].payload.month}</span>
                                                             <div className="h-2.5 w-[1px] bg-white/20" />
                                                             <span className="text-[10px] font-black text-white">+{payload[0].value} customers</span>
                                                           </div>
                                                         </div>
                                                       );
                                                     }
                                                     return null;
                                                   }}
                                                   position={{ y: -35 }}
                                                 />
                                                 <Bar dataKey="count" radius={[1, 1, 0, 0]}>
                                                   {item.trendData?.map((entry: any, index: number) => {
                                                     const counts = item.trendData.map((d: any) => d.count);
                                                     const max = Math.max(...counts);
                                                     const isPeak = entry.count === max && max > 0;
                                                     return (
                                                       <Cell 
                                                         key={`cell-${index}`} 
                                                         fill={isPeak ? '#3b82f6' : (item.color === 'emerald' ? '#10b981' : item.color === 'indigo' ? '#6366f1' : item.color === 'purple' ? '#a855f7' : '#3b82f6')} 
                                                         fillOpacity={isPeak ? 1 : 0.4}
                                                         className="transition-all duration-300 cursor-pointer hover:fill-opacity-100"
                                                       />
                                                     );
                                                   })}
                                                 </Bar>
                                               </BarChart>
                                             </ResponsiveContainer>
                                          </div>
                                          <span className="text-[7px] font-bold text-gray-400/0 group-hover/mini-chart:text-gray-400/100 transition-all duration-500 uppercase tracking-widest leading-none">
                                            Peak: +{Math.max(0, ...item.trendData.map((d: any) => d.count))}
                                          </span>
                                       </div>
                                   </td>
                                   <td className="px-6 py-4 text-right">
                                       <div className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(item.revenue)}</div>
                                   </td>
                               </tr>
                               
                               {/* Child Rows */}
                               {isExpanded && item.children?.map(child => {
                                 return (
                                   <tr key={child.id} className="bg-gray-50/30 dark:bg-white/[0.02] border-l-4 border-l-transparent hover:bg-gray-50/50 dark:hover:bg-white/[0.04] transition-colors">
                                     <td className="px-6 py-3 pl-16">
                                       <div className="flex items-center gap-3">
                                         <div className={`p-1.5 rounded-lg bg-${child.color}-50 dark:bg-${child.color}-900/10`}>
                                           <child.icon className={`w-3.5 h-3.5 text-${child.color}-500 dark:text-${child.color}-400/70`} />
                                         </div>
                                         <div>
                                           <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{child.label}</div>
                                           <div className="text-[10px] text-gray-400 dark:text-gray-500">{child.subLabel}</div>
                                         </div>
                                       </div>
                                     </td>
                                     <td className="px-6 py-3 text-center">
                                       <span className="text-sm text-gray-600 dark:text-gray-400">{formatNumber(child.count)}</span>
                                       {comparisonMode && (
                                         <div className={`text-[9px] font-medium ${calculateChange(child.count, child.prevCount) >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                           {calculateChange(child.count, child.prevCount) >= 0 ? '+' : ''}{calculateChange(child.count, child.prevCount).toFixed(0)}%
                                         </div>
                                       )}
                                     </td>
                                     <td className="px-6 py-3 text-center">
                                       <div className="flex flex-col items-center gap-1">
                                          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold ${child.addedCount >= 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'}`}>
                                              {child.addedCount >= 0 ? '+' : ''}{child.addedCount}
                                          </div>
                                          {comparisonMode && (
                                            <div className={`text-[9px] font-semibold ${calculateChange(child.addedCount, child.prevAddedCount) >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                              vs {child.prevAddedCount} ({calculateChange(child.addedCount, child.prevAddedCount) >= 0 ? '+' : ''}{calculateChange(child.addedCount, child.prevAddedCount).toFixed(0)}%)
                                            </div>
                                          )}
                                       </div>
                                     </td>
                                     <td className="px-6 py-3 text-center">
                                       <div className="flex flex-col items-center gap-1 group/mini-chart">
                                         <div className="h-[24px] w-[110px] mx-auto opacity-60 group-hover/mini-chart:opacity-100 transition-all duration-300 transform group-hover/mini-chart:scale-110">
                                           <ResponsiveContainer width="100%" height="100%">
                                             <BarChart data={child.trendData}>
                                               <Tooltip 
                                                 cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                                                 content={({ active, payload }) => {
                                                   if (active && payload && payload.length) {
                                                     return (
                                                       <div className="bg-slate-900/95 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md shadow-xl ring-1 ring-black/5 z-50">
                                                         <div className="flex items-center gap-1.5">
                                                           <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{payload[0].payload.month}</span>
                                                           <div className="h-2 w-[1px] bg-white/20" />
                                                           <span className="text-[10px] font-black text-white">+{payload[0].value} customers</span>
                                                         </div>
                                                       </div>
                                                     );
                                                   }
                                                   return null;
                                                 }}
                                                 position={{ y: -30 }}
                                               />
                                               <Bar dataKey="count" radius={[1, 1, 0, 0]}>
                                                 {child.trendData.map((entry: any, index: number) => {
                                                   const counts = child.trendData.map((d: any) => d.count);
                                                   const max = Math.max(...counts);
                                                   const isPeak = entry.count === max && max > 0;
                                                   return (
                                                     <Cell 
                                                       key={`child-cell-${index}`} 
                                                       fill={isPeak ? '#3b82f6' : (child.color === 'emerald' ? '#10b981' : child.color === 'indigo' ? '#6366f1' : child.color === 'purple' ? '#a855f7' : '#3b82f6')} 
                                                       fillOpacity={isPeak ? 1 : 0.4}
                                                       className="transition-all duration-300 cursor-pointer hover:fill-opacity-100"
                                                     />
                                                   );
                                                 })}
                                               </Bar>
                                             </BarChart>
                                           </ResponsiveContainer>
                                         </div>
                                         <span className="text-[7px] font-bold text-gray-400/0 group-hover/mini-chart:text-gray-400/100 transition-all duration-500 uppercase tracking-widest leading-none">
                                           Peak: +{Math.max(0, ...child.trendData.map((d: any) => d.count))}
                                         </span>
                                       </div>
                                     </td>
                                     <td className="px-6 py-3 text-right">
                                       <div className="text-sm text-gray-600 dark:text-gray-400">{formatCurrency(child.revenue)}</div>
                                     </td>
                                   </tr>
                                 );
                               })}
                             </React.Fragment>
                           );
                        })}
                        {tableData.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                              No data available for this view.
                            </td>
                          </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
}