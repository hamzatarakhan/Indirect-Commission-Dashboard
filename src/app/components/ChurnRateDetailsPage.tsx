import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Users, DollarSign, Building2, Smartphone, Wifi, Server, MessageSquare, Package, Layers, Activity, Calendar, ChevronRight, ChevronDown, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import searchSvgPaths from '../imports/svg-qqb0x6d05m';

interface ChurnRateDetailsPageProps {
  onBack: () => void;
  comparisonMode?: boolean;
  periodType?: string; // "Yearly", "Quarterly", "Monthly"
  year?: string; // "2024"
  quarter?: string; // "Q1", "Q2", "Q3", "Q4"
  month?: string; // "January", "February", ...
  comparisonPeriod?: string; // Comparison Year
}

// Enhanced mock churn data
const generateChurnData = (period: string = '2024') => {
  const segments = ['Large Business', 'Medium Business', 'SME'];
  const verticals = ['Technology', 'Transportation', 'Finance & Insurance', 'Retail & Services', 'Energy & Utilities', 'Manufacturing', 'Healthcare', 'Government & Public Sector', 'Real Estate & Construction'];
  const reasons = ['Competitor Offer', 'Service Quality', 'Price', 'Relocation', 'Contract End'];
  
  const customers = Array.from({ length: 60 }).map((_, i) => {
    const id = `CH${String(i + 1).padStart(3, '0')}`;
    const segment = segments[i % segments.length];
    const vertical = verticals[i % verticals.length];
    
    const rand = (offset: number) => Math.abs(Math.sin(i + offset));
    
    // Generate revenue loss
    const mobile = Math.round(5000 + rand(1) * 20000);
    const fixed = Math.round(4000 + rand(2) * 15000);
    const ict = Math.round(3000 + rand(3) * 25000);
    const sms = Math.round(1000 + rand(4) * 5000);
    
    // Generate Churn Date
    const year = (i % 4 === 0) ? '2024' : '2023'; 
    const month = Math.floor(rand(6) * 12); // 0-11
    const day = Math.floor(rand(7) * 28) + 1;
    const churnDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
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
      churnDate,
      reason: reasons[i % reasons.length],
      kam: `KAM ${String.fromCharCode(65 + (i % 10))}`
    };
  });

  const cutoffYear = parseInt(period);
  return customers.filter(c => parseInt(c.churnDate.split('-')[0]) <= cutoffYear);
};

type ViewMode = 'segments' | 'services';
type Granularity = 'yearly' | 'quarterly' | 'monthly';

export function ChurnRateDetailsPage({ 
  onBack, 
  comparisonMode = false,
  periodType = 'Yearly',
  year = '2024',
  quarter = 'Q3',
  month = 'January',
  comparisonPeriod = '2023'
}: ChurnRateDetailsPageProps) {
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
  const currentData = useMemo(() => generateChurnData(year), [year]);
  const comparisonData = useMemo(() => comparisonMode ? generateChurnData(comparisonPeriod) : [], [comparisonMode, comparisonPeriod]);
  
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

  // Sync with main dashboard metrics (simulated sync)
  const totalChurnedCount = 1523; 
  const prevTotalChurnedCount = 1661; 
  const totalRevenueImpact = 4200000;
  const prevTotalRevenueImpact = 4580000;
  const churnRate = 3.32;
  const prevChurnRate = 3.36;
  const avgLoss = totalRevenueImpact / totalChurnedCount;
  const prevAvgLoss = prevTotalRevenueImpact / prevTotalChurnedCount;

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

  const serviceConfig = {
    Mobile: { icon: Smartphone, color: 'purple', field: 'mobile' as const },
    Fixed: { icon: Wifi, color: 'blue', field: 'fixed' as const },
    ICT: { icon: Server, color: 'indigo', field: 'ict' as const },
    SMS: { icon: MessageSquare, color: 'emerald', field: 'sms' as const }
  };

  const getPeriodLabel = () => {
    if (granularity === 'yearly') return year;
    if (granularity === 'quarterly') return `${quarter} ${year}`;
    return `${month} ${year}`;
  };

  const isCustomerChurnedInPeriod = (churnDate: string, checkYear: string, checkGranularity: Granularity, subValue: number, isComparison: boolean = false) => {
    const [y, m] = churnDate.split('-').map(Number);
    const targetYear = isComparison ? parseInt(comparisonPeriod) : parseInt(checkYear);
    
    if (y > targetYear) return false;
    if (y < targetYear) return true;
    
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

  const isCustomerChurnedInExactPeriod = (churnDate: string, checkYear: string, checkGranularity: Granularity, subValue: number) => {
    const [y, m] = churnDate.split('-').map(Number);
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

  const getMonthlyChurnTrend = (customers: any[], targetYear: string) => {
    const monthlyCounts = Array(12).fill(0);
    customers.forEach(c => {
      const [y, m] = c.churnDate.split('-');
      if (y === targetYear) {
        monthlyCounts[parseInt(m) - 1]++;
      }
    });
    return monthlyCounts.map((count, i) => ({
      month: new Date(parseInt(targetYear), i, 1).toLocaleString('default', { month: 'short' }),
      count
    }));
  };

  const getTableData = () => {
    const targetYear = year;
    const getFilteredData = (data: any[], isPrev: boolean = false) => {
      return data.filter(c => isCustomerChurnedInPeriod(c.churnDate, targetYear, granularity, selectedSubPeriod, isPrev));
    };

    const currentFiltered = getFilteredData(currentData);
    const prevFiltered = getFilteredData(comparisonData, true);

    const processItem = (item: any, currList: any[], prevList: any[]) => {
      const churnedCount = currList.filter(c => isCustomerChurnedInExactPeriod(c.churnDate, year, granularity, selectedSubPeriod)).length;
      const prevChurnedCount = prevList.filter(c => isCustomerChurnedInExactPeriod(c.churnDate, comparisonPeriod, granularity, selectedSubPeriod)).length;
      
      return {
        ...item,
        count: currList.length,
        churnedCount,
        prevChurnedCount,
        prevCount: prevList.length,
        revenue: currList.reduce((sum, c) => sum + (item.field ? c[item.field as keyof typeof c] : c.totalRevenue), 0),
        trendData: getMonthlyChurnTrend(currList, year)
      };
    };

    if (viewMode === 'segments') {
      const segments = ['Large Business', 'Medium Business', 'SME'];
      return segments.map(seg => {
        const segCurr = currentFiltered.filter(c => c.segment === seg);
        const segPrev = prevFiltered.filter(c => c.segment === seg);
        const item = processItem({ id: seg, label: seg, subLabel: 'Business Segment', icon: Building2, color: 'blue' }, segCurr, segPrev);
        
        const verticals = [...new Set(currentData.filter(c => c.segment === seg).map(c => c.vertical))];
        item.children = verticals.map(vert => {
          const vertCurr = segCurr.filter(c => c.vertical === vert);
          const vertPrev = segPrev.filter(c => c.vertical === vert);
          return processItem({ id: `${seg}-${vert}`, label: vert, subLabel: 'Industry Vertical', icon: Layers, color: 'indigo' }, vertCurr, vertPrev);
        });
        return item;
      });
    } else {
      return Object.entries(serviceConfig).map(([name, config]) => {
        const itemCurr = currentFiltered;
        const itemPrev = prevFiltered;
        const item = processItem({ id: name, label: name, subLabel: 'Core Service', icon: config.icon, color: config.color, field: config.field }, itemCurr, itemPrev);
        
        const subProducts = {
          Mobile: ['Postpaid', 'Prepaid', 'Data Plans'],
          Fixed: ['Broadband', 'Leased Lines', 'MPLS'],
          ICT: ['Cloud Services', 'Security', 'Data Center'],
          SMS: ['Bulk SMS', 'A2P SMS']
        };
        
        item.children = subProducts[name as keyof typeof subProducts].map(prod => {
          // Mock product-level churn (randomly distribute for visual variety)
          const prodCurr = itemCurr.filter((_, idx) => (idx % 3) === 0);
          const prodPrev = itemPrev.filter((_, idx) => (idx % 3) === 0);
          return processItem({ id: `${name}-${prod}`, label: prod, subLabel: 'Product Category', icon: Package, color: config.color }, prodCurr, prodPrev);
        });
        return item;
      });
    }
  };

  const tableData = useMemo(() => getTableData(), [viewMode, currentData, comparisonData, granularity, selectedSubPeriod]);

  return (
    <div className="w-full mx-auto space-y-6 p-0">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#07112F] border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-[#0a1425] transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Back to Dashboard</span>
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Churn Rate Analysis</h1>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {/* Churned Customers */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.3 }}
           className="group relative bg-red-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-red-200/50 dark:border-white/[0.08] hover:border-red-300/60 dark:hover:border-red-500/40 hover:shadow-md transition-all duration-300"
         >
           <div className="flex flex-col gap-[11px] relative z-10">
             <div className="size-[31.5px] shrink-0 bg-red-100 dark:bg-red-500/10 rounded-[8.75px] flex items-center justify-center">
               <TrendingDown className="w-[14px] h-[14px] text-red-600 dark:text-red-400" />
             </div>
             
             <div className="flex gap-[11px] items-start">
               <div className="flex-1 flex flex-col gap-[7px]">
                 <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">Churned Customers</p>
                 <div className="flex flex-col gap-[1.75px]">
                   <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                     {formatNumber(totalChurnedCount)}
                   </p>
                   {comparisonMode && (
                      <div className="flex items-center gap-1">
                        {calculateChange(totalChurnedCount, prevTotalChurnedCount) <= 0 ? (
                          <TrendingDown className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <TrendingUp className="w-3 h-3 text-red-500" />
                        )}
                        <span className={`text-[10px] font-semibold ${calculateChange(totalChurnedCount, prevTotalChurnedCount) <= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {calculateChange(totalChurnedCount, prevTotalChurnedCount) <= 0 ? '' : '+'}{calculateChange(totalChurnedCount, prevTotalChurnedCount).toFixed(1)}%
                        </span>
                      </div>
                   )}
                 </div>
               </div>
             </div>
           </div>
         </motion.div>

         {/* Revenue Loss */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.3, delay: 0.1 }}
           className="group relative bg-orange-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-orange-200/50 dark:border-white/[0.08] hover:border-orange-300/60 dark:hover:border-orange-500/40 hover:shadow-md transition-all duration-300"
         >
            <div className="flex flex-col gap-[11px] relative z-10">
               <div className="size-[31.5px] shrink-0 bg-orange-100 dark:bg-orange-500/10 rounded-[8.75px] flex items-center justify-center">
                  <DollarSign className="w-[14px] h-[14px] text-orange-600 dark:text-orange-400" />
               </div>
               
               <div className="flex gap-[11px] items-start">
                  <div className="flex-1 flex flex-col gap-[7px]">
                     <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">Revenue Impact</p>
                     <div className="flex flex-col gap-[1.75px]">
                        <p className="text-sm sm:text-base font-semibold text-red-600 dark:text-red-400 leading-tight">
                           -{formatCurrency(totalRevenueImpact)}
                        </p>
                        {comparisonMode && (
                           <div className="flex items-center gap-1">
                              {calculateChange(totalRevenueImpact, prevTotalRevenueImpact) <= 0 ? (
                                 <TrendingDown className="w-3 h-3 text-emerald-500" />
                              ) : (
                                 <TrendingUp className="w-3 h-3 text-red-500" />
                              )}
                              <span className={`text-[10px] font-semibold ${calculateChange(totalRevenueImpact, prevTotalRevenueImpact) <= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                 {calculateChange(totalRevenueImpact, prevTotalRevenueImpact).toFixed(1)}%
                              </span>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </motion.div>

         {/* Churn Rate % */}
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
                     <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">Churn Rate</p>
                     <div className="flex flex-col gap-[1.75px]">
                        <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                           {churnRate}%
                        </p>
                        {comparisonMode && (
                           <div className="flex items-center gap-1">
                              {churnRate <= prevChurnRate ? (
                                 <TrendingDown className="w-3 h-3 text-emerald-500" />
                              ) : (
                                 <TrendingUp className="w-3 h-3 text-red-500" />
                              )}
                              <span className={`text-[10px] font-semibold ${churnRate <= prevChurnRate ? 'text-emerald-600' : 'text-red-600'}`}>
                                 {churnRate <= prevChurnRate ? '-' : '+'}{Math.abs(calculateChange(churnRate, prevChurnRate)).toFixed(1)}%
                              </span>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </motion.div>

         {/* Avg Loss/Customer */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.3, delay: 0.3 }}
           className="group relative bg-indigo-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-indigo-200/50 dark:border-white/[0.08] hover:border-indigo-300/60 dark:hover:border-indigo-500/40 hover:shadow-md transition-all duration-300"
         >
            <div className="flex flex-col gap-[11px] relative z-10">
               <div className="size-[31.5px] shrink-0 bg-indigo-100 dark:bg-indigo-500/10 rounded-[8.75px] flex items-center justify-center">
                  <AlertTriangle className="w-[14px] h-[14px] text-indigo-600 dark:text-indigo-400" />
               </div>
               
               <div className="flex gap-[11px] items-start">
                  <div className="flex-1 flex flex-col gap-[7px]">
                     <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">Avg Loss / Customer</p>
                     <div className="flex flex-col gap-[1.75px]">
                        <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                           {formatCurrency(avgLoss)}
                        </p>
                        {comparisonMode && (
                           <div className="flex items-center gap-1">
                              {avgLoss <= prevAvgLoss ? (
                                 <TrendingDown className="w-3 h-3 text-emerald-500" />
                              ) : (
                                 <TrendingUp className="w-3 h-3 text-red-500" />
                              )}
                              <span className={`text-[10px] font-semibold ${avgLoss <= prevAvgLoss ? 'text-emerald-600' : 'text-red-600'}`}>
                                 {Math.abs(calculateChange(avgLoss, prevAvgLoss)).toFixed(1)}%
                              </span>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </motion.div>
      </div>

      {/* Unified Table View */}
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
                     className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${viewMode === mode ? 'border-purple-600 text-purple-600 dark:text-purple-400' : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
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
                          <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Churned Customers</th>
                          <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Churned in {getPeriodLabel()}</th>
                          <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase min-w-[140px]">Churn Trend</th>
                          <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Revenue Impact</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                      {tableData.map((item) => {
                         const isExpanded = expandedRows.has(item.id);
                         
                         return (
                           <React.Fragment key={item.id}>
                             <tr 
                               className={`group transition-colors cursor-pointer ${isExpanded ? 'bg-purple-50/30 dark:bg-purple-500/5' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
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
                                       <div className={`text-[10px] font-medium ${calculateChange(item.count, item.prevCount) <= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                         {calculateChange(item.count, item.prevCount) <= 0 ? '↓' : '↑'} {Math.abs(calculateChange(item.count, item.prevCount)).toFixed(1)}%
                                       </div>
                                     )}
                                 </td>
                                 <td className="px-6 py-4 text-center">
                                     <div className="flex flex-col items-center gap-1">
                                        <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${item.churnedCount <= item.prevChurnedCount ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                            {item.churnedCount}
                                        </div>
                                        {comparisonMode && (
                                          <div className={`text-[10px] font-semibold ${item.churnedCount <= item.prevChurnedCount ? 'text-emerald-600' : 'text-red-600'}`}>
                                            vs {item.prevChurnedCount}
                                          </div>
                                        )}
                                     </div>
                                 </td>
                                 <td className="px-6 py-4 text-center">
                                     <div className="h-[24px] w-[120px] mx-auto opacity-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                          <BarChart data={item.trendData}>
                                            <Tooltip 
                                              cursor={{ fill: 'transparent' }}
                                              content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                  return (
                                                    <div className="bg-slate-900/95 backdrop-blur border border-slate-700/50 p-2 rounded text-[10px] text-white">
                                                      <span className="font-semibold">{payload[0].payload.month}:</span> {payload[0].value}
                                                    </div>
                                                  );
                                                }
                                                return null;
                                              }}
                                            />
                                            <Bar dataKey="count" fill={item.color === 'emerald' ? '#10b981' : item.color === 'indigo' ? '#6366f1' : item.color === 'purple' ? '#a855f7' : '#ef4444'} radius={[1, 1, 0, 0]} />
                                          </BarChart>
                                        </ResponsiveContainer>
                                     </div>
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                     <div className="text-sm font-bold text-red-600 dark:text-red-400">-{formatCurrency(item.revenue)}</div>
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
                                   </td>
                                   <td className="px-6 py-3 text-center">
                                     <span className={`text-[10px] font-medium ${child.churnedCount <= child.prevChurnedCount ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                                       {child.churnedCount}
                                     </span>
                                   </td>
                                   <td className="px-6 py-3 text-center">
                                     <div className="flex flex-col items-center gap-1 group/mini-chart">
                                       <div className="h-[24px] w-[110px] mx-auto opacity-60 group-hover/mini-chart:opacity-100 transition-all duration-300 transform group-hover/mini-chart:scale-110">
                                         <ResponsiveContainer width="100%" height="100%">
                                           <BarChart data={child.trendData}>
                                             <Tooltip 
                                               cursor={{ fill: 'rgba(239, 68, 68, 0.05)' }}
                                               content={({ active, payload }) => {
                                                 if (active && payload && payload.length) {
                                                   return (
                                                     <div className="bg-slate-900/95 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md shadow-xl ring-1 ring-black/5">
                                                       <div className="flex items-center gap-1.5">
                                                         <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{payload[0].payload.month}</span>
                                                         <div className="h-2 w-[1px] bg-white/20" />
                                                         <span className="text-[10px] font-black text-white">{payload[0].value} churned</span>
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
                                                     fill={isPeak ? '#ef4444' : (child.color === 'emerald' ? '#10b981' : child.color === 'indigo' ? '#6366f1' : child.color === 'purple' ? '#a855f7' : '#ef4444')} 
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
                                         Peak: {Math.max(0, ...child.trendData.map((d: any) => d.count))}
                                       </span>
                                     </div>
                                   </td>
                                   <td className="px-6 py-3 text-right">
                                     <div className="text-sm text-red-500 dark:text-red-400/80">-{formatCurrency(child.revenue)}</div>
                                   </td>
                                 </tr>
                               );
                             })}
                           </React.Fragment>
                         );
                      })}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
}