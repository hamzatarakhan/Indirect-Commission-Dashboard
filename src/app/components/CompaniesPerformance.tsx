import React, { useState, useMemo } from 'react';
import { Building2, Search, TrendingUp, TrendingDown, ChevronDown, ChevronUp, ArrowRight, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface ServiceBreakdown {
  ict: number;
  mobile: number;
  fixed: number;
}

interface CompanyData {
  id: string;
  name: string;
  q1Revenue: number;
  q2Revenue: number;
  performance: number;
  isNew?: boolean;
  serviceBreakdown: ServiceBreakdown;
}

interface ServiceRevenue {
  service: string;
  revenue2024: number;
  revenue2025: number;
  color: string;
  growth: number;
}

const mockCompanies: CompanyData[] = [
  {
    id: '1',
    name: 'Tech Innovators',
    q1Revenue: 512349.50,
    q2Revenue: 637229.30,
    performance: 24.3,
    serviceBreakdown: { ict: 45, mobile: 35, fixed: 20 }
  },
  {
    id: '2',
    name: 'Green Solutions',
    q1Revenue: 378254.32,
    q2Revenue: 452732.42,
    performance: 19.7,
    serviceBreakdown: { ict: 30, mobile: 50, fixed: 20 }
  },
  {
    id: '3',
    name: 'Creative Agency',
    q1Revenue: 610128.90,
    q2Revenue: 808470.79,
    performance: 32.5,
    isNew: true,
    serviceBreakdown: { ict: 40, mobile: 30, fixed: 30 }
  },
  {
    id: '4',
    name: 'HealthTech',
    q1Revenue: 489675.00,
    q2Revenue: 350570.00,
    performance: -28.4,
    serviceBreakdown: { ict: 35, mobile: 45, fixed: 20 }
  },
  {
    id: '5',
    name: 'Finance Group',
    q1Revenue: 750000.00,
    q2Revenue: 867000.00,
    performance: 15.6,
    serviceBreakdown: { ict: 50, mobile: 30, fixed: 20 }
  },
  {
    id: '6',
    name: 'Retail Solutions',
    q1Revenue: 425000.00,
    q2Revenue: 408500.00,
    performance: -3.9,
    serviceBreakdown: { ict: 25, mobile: 55, fixed: 20 }
  },
  {
    id: '7',
    name: 'Education Platform',
    q1Revenue: 335000.00,
    q2Revenue: 371650.00,
    performance: 10.9,
    isNew: true,
    serviceBreakdown: { ict: 60, mobile: 25, fixed: 15 }
  },
  {
    id: '8',
    name: 'Logistics Express',
    q1Revenue: 580000.00,
    q2Revenue: 696000.00,
    performance: 20.0,
    serviceBreakdown: { ict: 30, mobile: 40, fixed: 30 }
  },
  {
    id: '9',
    name: 'Manufacturing Inc',
    q1Revenue: 920000.00,
    q2Revenue: 890400.00,
    performance: -3.2,
    serviceBreakdown: { ict: 45, mobile: 30, fixed: 25 }
  },
  {
    id: '10',
    name: 'Media Networks',
    q1Revenue: 445000.00,
    q2Revenue: 534000.00,
    performance: 20.0,
    serviceBreakdown: { ict: 35, mobile: 45, fixed: 20 }
  },
  {
    id: '11',
    name: 'Smart Automation',
    q1Revenue: 675000.00,
    q2Revenue: 823500.00,
    performance: 22.0,
    serviceBreakdown: { ict: 55, mobile: 25, fixed: 20 }
  },
  {
    id: '12',
    name: 'Digital Marketing Pro',
    q1Revenue: 390000.00,
    q2Revenue: 366300.00,
    performance: -6.1,
    serviceBreakdown: { ict: 40, mobile: 40, fixed: 20 }
  },
  {
    id: '13',
    name: 'Cloud Services Ltd',
    q1Revenue: 820000.00,
    q2Revenue: 975800.00,
    performance: 19.0,
    isNew: true,
    serviceBreakdown: { ict: 70, mobile: 20, fixed: 10 }
  },
  {
    id: '14',
    name: 'Construction Plus',
    q1Revenue: 560000.00,
    q2Revenue: 504000.00,
    performance: -10.0,
    serviceBreakdown: { ict: 30, mobile: 40, fixed: 30 }
  },
  {
    id: '15',
    name: 'Food Distribution Co',
    q1Revenue: 425000.00,
    q2Revenue: 519250.00,
    performance: 22.2,
    serviceBreakdown: { ict: 25, mobile: 50, fixed: 25 }
  },
  {
    id: '16',
    name: 'Energy Systems',
    q1Revenue: 1200000.00,
    q2Revenue: 1380000.00,
    performance: 15.0,
    serviceBreakdown: { ict: 50, mobile: 30, fixed: 20 }
  },
  {
    id: '17',
    name: 'Travel Booking Hub',
    q1Revenue: 310000.00,
    q2Revenue: 282100.00,
    performance: -9.0,
    serviceBreakdown: { ict: 45, mobile: 40, fixed: 15 }
  },
  {
    id: '18',
    name: 'Security Solutions',
    q1Revenue: 645000.00,
    q2Revenue: 793350.00,
    performance: 23.0,
    serviceBreakdown: { ict: 60, mobile: 25, fixed: 15 }
  },
  {
    id: '19',
    name: 'Pharma Direct',
    q1Revenue: 890000.00,
    q2Revenue: 969300.00,
    performance: 8.9,
    isNew: true,
    serviceBreakdown: { ict: 40, mobile: 35, fixed: 25 }
  },
  {
    id: '20',
    name: 'Real Estate Group',
    q1Revenue: 720000.00,
    q2Revenue: 648000.00,
    performance: -10.0,
    serviceBreakdown: { ict: 35, mobile: 40, fixed: 25 }
  },
  {
    id: '21',
    name: 'Sports Equipment Inc',
    q1Revenue: 380000.00,
    q2Revenue: 456000.00,
    performance: 20.0,
    serviceBreakdown: { ict: 30, mobile: 50, fixed: 20 }
  },
  {
    id: '22',
    name: 'Legal Services Pro',
    q1Revenue: 510000.00,
    q2Revenue: 484500.00,
    performance: -5.0,
    serviceBreakdown: { ict: 50, mobile: 30, fixed: 20 }
  },
  {
    id: '23',
    name: 'Architecture Studio',
    q1Revenue: 455000.00,
    q2Revenue: 564550.00,
    performance: 24.1,
    serviceBreakdown: { ict: 55, mobile: 25, fixed: 20 }
  },
  {
    id: '24',
    name: 'Insurance Partners',
    q1Revenue: 935000.00,
    q2Revenue: 1000700.00,
    performance: 7.0,
    serviceBreakdown: { ict: 45, mobile: 35, fixed: 20 }
  },
  {
    id: '25',
    name: 'Gaming Studios',
    q1Revenue: 625000.00,
    q2Revenue: 781250.00,
    performance: 25.0,
    isNew: true,
    serviceBreakdown: { ict: 65, mobile: 25, fixed: 10 }
  },
  {
    id: '26',
    name: 'Fashion Retail',
    q1Revenue: 340000.00,
    q2Revenue: 313800.00,
    performance: -7.7,
    serviceBreakdown: { ict: 20, mobile: 60, fixed: 20 }
  },
  {
    id: '27',
    name: 'Hospitality Services',
    q1Revenue: 580000.00,
    q2Revenue: 667400.00,
    performance: 15.1,
    serviceBreakdown: { ict: 40, mobile: 40, fixed: 20 }
  },
  {
    id: '28',
    name: 'Automotive Parts',
    q1Revenue: 780000.00,
    q2Revenue: 710400.00,
    performance: -8.9,
    serviceBreakdown: { ict: 35, mobile: 40, fixed: 25 }
  },
  {
    id: '29',
    name: 'Publishing House',
    q1Revenue: 420000.00,
    q2Revenue: 504000.00,
    performance: 20.0,
    serviceBreakdown: { ict: 50, mobile: 30, fixed: 20 }
  },
  {
    id: '30',
    name: 'Consulting Experts',
    q1Revenue: 690000.00,
    q2Revenue: 848700.00,
    performance: 23.0,
    serviceBreakdown: { ict: 60, mobile: 25, fixed: 15 }
  },
  {
    id: '31',
    name: 'Data Analytics Pro',
    q1Revenue: 540000.00,
    q2Revenue: 680400.00,
    performance: 26.0,
    serviceBreakdown: { ict: 70, mobile: 20, fixed: 10 }
  },
  {
    id: '32',
    name: 'Telecom Solutions',
    q1Revenue: 820000.00,
    q2Revenue: 754400.00,
    performance: -8.0,
    serviceBreakdown: { ict: 35, mobile: 45, fixed: 20 }
  },
  {
    id: '33',
    name: 'E-Commerce Hub',
    q1Revenue: 670000.00,
    q2Revenue: 829700.00,
    performance: 23.8,
    isNew: true,
    serviceBreakdown: { ict: 50, mobile: 40, fixed: 10 }
  },
  {
    id: '34',
    name: 'Supply Chain Global',
    q1Revenue: 950000.00,
    q2Revenue: 1102500.00,
    performance: 16.1,
    serviceBreakdown: { ict: 40, mobile: 35, fixed: 25 }
  },
  {
    id: '35',
    name: 'Research Labs',
    q1Revenue: 430000.00,
    q2Revenue: 387000.00,
    performance: -10.0,
    serviceBreakdown: { ict: 65, mobile: 20, fixed: 15 }
  },
  {
    id: '36',
    name: 'Event Management Plus',
    q1Revenue: 290000.00,
    q2Revenue: 355800.00,
    performance: 22.7,
    serviceBreakdown: { ict: 40, mobile: 45, fixed: 15 }
  },
  {
    id: '37',
    name: 'Agricultural Tech',
    q1Revenue: 610000.00,
    q2Revenue: 708600.00,
    performance: 16.2,
    serviceBreakdown: { ict: 55, mobile: 30, fixed: 15 }
  },
  {
    id: '38',
    name: 'Aerospace Components',
    q1Revenue: 1100000.00,
    q2Revenue: 1023000.00,
    performance: -7.0,
    serviceBreakdown: { ict: 50, mobile: 25, fixed: 25 }
  },
  {
    id: '39',
    name: 'Wellness Centers',
    q1Revenue: 380000.00,
    q2Revenue: 464600.00,
    performance: 22.3,
    isNew: true,
    serviceBreakdown: { ict: 30, mobile: 50, fixed: 20 }
  },
  {
    id: '40',
    name: 'Urban Development Co',
    q1Revenue: 870000.00,
    q2Revenue: 1000500.00,
    performance: 15.0,
    serviceBreakdown: { ict: 45, mobile: 30, fixed: 25 }
  },
  {
    id: '41',
    name: 'Renewable Energy Inc',
    q1Revenue: 740000.00,
    q2Revenue: 900600.00,
    performance: 21.7,
    serviceBreakdown: { ict: 55, mobile: 25, fixed: 20 }
  },
  {
    id: '42',
    name: 'Software Development',
    q1Revenue: 520000.00,
    q2Revenue: 473200.00,
    performance: -9.0,
    serviceBreakdown: { ict: 75, mobile: 15, fixed: 10 }
  },
  {
    id: '43',
    name: 'Furniture Design',
    q1Revenue: 350000.00,
    q2Revenue: 420000.00,
    performance: 20.0,
    serviceBreakdown: { ict: 25, mobile: 50, fixed: 25 }
  },
  {
    id: '44',
    name: 'Banking Solutions',
    q1Revenue: 1050000.00,
    q2Revenue: 1218000.00,
    performance: 16.0,
    isNew: true,
    serviceBreakdown: { ict: 60, mobile: 25, fixed: 15 }
  },
  {
    id: '45',
    name: 'Transport Systems',
    q1Revenue: 680000.00,
    q2Revenue: 626800.00,
    performance: -7.8,
    serviceBreakdown: { ict: 30, mobile: 45, fixed: 25 }
  },
  {
    id: '46',
    name: 'Beauty & Cosmetics',
    q1Revenue: 410000.00,
    q2Revenue: 508400.00,
    performance: 24.0,
    serviceBreakdown: { ict: 20, mobile: 60, fixed: 20 }
  },
  {
    id: '47',
    name: 'Marine Services',
    q1Revenue: 590000.00,
    q2Revenue: 671100.00,
    performance: 13.7,
    serviceBreakdown: { ict: 40, mobile: 35, fixed: 25 }
  },
  {
    id: '48',
    name: 'Printing & Graphics',
    q1Revenue: 320000.00,
    q2Revenue: 294400.00,
    performance: -8.0,
    serviceBreakdown: { ict: 45, mobile: 35, fixed: 20 }
  },
  {
    id: '49',
    name: 'Robotics Engineering',
    q1Revenue: 880000.00,
    q2Revenue: 1144000.00,
    performance: 30.0,
    isNew: true,
    serviceBreakdown: { ict: 80, mobile: 15, fixed: 5 }
  },
  {
    id: '50',
    name: 'Chemical Industries',
    q1Revenue: 960000.00,
    q2Revenue: 864000.00,
    performance: -10.0,
    serviceBreakdown: { ict: 40, mobile: 35, fixed: 25 }
  }
];

const serviceRevenueData: ServiceRevenue[] = [
  { service: 'Fixed Services', revenue2024: 5460000, revenue2025: 55000000, color: '#38BDF8', growth: 907.7 },
  { service: 'Mobile Services', revenue2024: 8200000, revenue2025: 72000000, color: '#15B79E', growth: 778.0 },
  { service: 'ICT Services', revenue2024: 6800000, revenue2025: 64000000, color: '#6366F1', growth: 841.2 },
  { service: 'Device', revenue2024: 3200000, revenue2025: 28000000, color: '#F59E0B', growth: 775.0 },
  { service: 'SMS', revenue2024: 1500000, revenue2025: 12000000, color: '#F43F5E', growth: 700.0 }
];

const formatCurrency = (value: number): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const formatCompactCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
};

const getPerformanceColor = (performance: number): string => {
  if (performance >= 10) return '#15B79E';
  if (performance > 0) return '#94A3B8';
  return '#F44336';
};

const getPerformanceIcon = (performance: number) => {
  if (performance > 0) return <TrendingUp className="w-4 h-4" />;
  if (performance < 0) return <TrendingDown className="w-4 h-4" />;
  return <Minus className="w-4 h-4" />;
};

type FilterType = 'all' | 'top' | 'low' | 'new';

interface CompaniesPerformanceProps {
  period?: string;
  quarter?: string;
  year?: string;
}

export function CompaniesPerformance({ period = 'Quarterly', quarter = 'Q3', year = '2024' }: CompaniesPerformanceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null);
  const rowsPerPage = 10;

  // Filter companies
  const filteredCompanies = useMemo(() => {
    let filtered = mockCompanies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesFilter = true;
      if (activeFilter === 'top') matchesFilter = company.performance >= 20;
      if (activeFilter === 'low') matchesFilter = company.performance < 0;
      if (activeFilter === 'new') matchesFilter = company.isNew === true;
      
      return matchesSearch && matchesFilter;
    });
    
    return filtered;
  }, [searchQuery, activeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredCompanies.length / rowsPerPage);
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Find top and bottom performers
  const topPerformer = useMemo(() => {
    return filteredCompanies.reduce((max, company) => 
      company.performance > max.performance ? company : max
    , filteredCompanies[0]);
  }, [filteredCompanies]);

  const bottomPerformer = useMemo(() => {
    return filteredCompanies.reduce((min, company) => 
      company.performance < min.performance ? company : min
    , filteredCompanies[0]);
  }, [filteredCompanies]);

  // Calculate summary statistics
  const avgGrowth = useMemo(() => {
    if (filteredCompanies.length === 0) return 0;
    const sum = filteredCompanies.reduce((acc, c) => acc + c.performance, 0);
    return sum / filteredCompanies.length;
  }, [filteredCompanies]);

  const declineCount = useMemo(() => {
    return filteredCompanies.filter(c => c.performance < 0).length;
  }, [filteredCompanies]);

  const topService = 'Mobile'; // Could be calculated based on data

  const toggleRowExpansion = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Calculate company-specific service revenue data
  const companyServiceRevenue = useMemo((): ServiceRevenue[] => {
    if (!selectedCompany) return [];

    // Calculate service-specific revenues based on breakdown percentages
    const q1Total = selectedCompany.q1Revenue;
    const q2Total = selectedCompany.q2Revenue;
    
    return [
      { 
        service: 'ICT Services', 
        revenue2024: q1Total * (selectedCompany.serviceBreakdown.ict / 100), 
        revenue2025: q2Total * (selectedCompany.serviceBreakdown.ict / 100), 
        color: '#6366F1', 
        growth: ((q2Total * (selectedCompany.serviceBreakdown.ict / 100) - q1Total * (selectedCompany.serviceBreakdown.ict / 100)) / (q1Total * (selectedCompany.serviceBreakdown.ict / 100))) * 100
      },
      { 
        service: 'Mobile Services', 
        revenue2024: q1Total * (selectedCompany.serviceBreakdown.mobile / 100), 
        revenue2025: q2Total * (selectedCompany.serviceBreakdown.mobile / 100), 
        color: '#15B79E', 
        growth: ((q2Total * (selectedCompany.serviceBreakdown.mobile / 100) - q1Total * (selectedCompany.serviceBreakdown.mobile / 100)) / (q1Total * (selectedCompany.serviceBreakdown.mobile / 100))) * 100
      },
      { 
        service: 'Fixed Services', 
        revenue2024: q1Total * (selectedCompany.serviceBreakdown.fixed / 100), 
        revenue2025: q2Total * (selectedCompany.serviceBreakdown.fixed / 100), 
        color: '#38BDF8', 
        growth: ((q2Total * (selectedCompany.serviceBreakdown.fixed / 100) - q1Total * (selectedCompany.serviceBreakdown.fixed / 100)) / (q1Total * (selectedCompany.serviceBreakdown.fixed / 100))) * 100
      }
    ];
  }, [selectedCompany]);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col dark:border-gray-700/40 transition-colors duration-300">
      <CardContent className="flex-1 flex flex-col p-3 sm:p-4">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Title */}
          <div>
            <h3 className="text-[17px] sm:text-[19px] font-medium text-[#000b25] dark:text-[#F8FAFC]">
              Companies Performance
            </h3>
          </div>

          {/* Top/Bottom Performers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(() => {
              const topPerformer = mockCompanies.reduce((max, company) => 
                company.performance > max.performance ? company : max
              );
              const bottomPerformer = mockCompanies.reduce((min, company) => 
                company.performance < min.performance ? company : min
              );
              
              return (
                <>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 border border-green-200 dark:border-green-700/50">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="text-xs text-green-600 dark:text-green-400">Top Performer</p>
                        <p className="text-sm font-semibold text-green-900 dark:text-green-100">{topPerformer.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-2 border border-slate-200 dark:border-slate-600/40">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Needs Support</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{bottomPerformer.name}</p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>

          {/* Controls Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#1E293B] rounded-lg overflow-x-auto w-full sm:w-auto">
              <button
                onClick={() => {
                  setActiveFilter('all');
                  setCurrentPage(1);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded text-xs font-medium transition-all whitespace-nowrap ${
                  activeFilter === 'all'
                    ? 'bg-white dark:bg-[#334155] text-gray-900 dark:text-[#F8FAFC] shadow-sm'
                    : 'text-gray-600 dark:text-[#94A3B8] hover:text-gray-900 dark:hover:text-[#E2E8F0]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setActiveFilter('top');
                  setCurrentPage(1);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded text-xs font-medium transition-all whitespace-nowrap ${
                  activeFilter === 'top'
                    ? 'bg-white dark:bg-[#15B79E] text-green-700 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-[#94A3B8] hover:text-gray-900 dark:hover:text-[#E2E8F0]'
                }`}
              >
                Top Performers
              </button>
              <button
                onClick={() => {
                  setActiveFilter('low');
                  setCurrentPage(1);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded text-xs font-medium transition-all whitespace-nowrap ${
                  activeFilter === 'low'
                    ? 'bg-white dark:bg-[#334155] text-slate-700 dark:text-[#F8FAFC] shadow-sm'
                    : 'text-gray-600 dark:text-[#94A3B8] hover:text-gray-900 dark:hover:text-[#E2E8F0]'
                }`}
              >
                Low Performers
              </button>
              <button
                onClick={() => {
                  setActiveFilter('new');
                  setCurrentPage(1);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded text-xs font-medium transition-all whitespace-nowrap ${
                  activeFilter === 'new'
                    ? 'bg-white dark:bg-[#38BDF8] text-blue-700 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-[#94A3B8] hover:text-gray-900 dark:hover:text-[#E2E8F0]'
                }`}
              >
                Newly Added
              </button>
            </div>

            {/* Search Field */}
            <div className="w-full sm:w-[30%] sm:ml-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-400 transition-colors duration-300" />
              <Input
                type="text"
                placeholder="Search by company name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 w-full h-9 focus:ring-0 focus:border-blue-100/30 dark:focus:border-blue-400/15 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-[420px]">
          {/* Left Panel - Table */}
          <div className="w-full lg:w-1/2 flex flex-col gap-[4px]">
            {/* Table */}
            <div className="flex flex-col gap-[4px] overflow-x-auto">
              {/* Table Header */}
              <div className="bg-slate-50 dark:bg-transparent flex rounded-[4px] flex-shrink-0 min-w-[600px] border-b border-transparent dark:border-[#1E293B]">
                {/* Companies Column */}
                <div className="w-[185px] shrink-0 px-4 py-2 flex items-center gap-1">
                  <p className="text-[13px] font-semibold text-[#000b25] dark:text-[#94A3B8]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Companies
                  </p>
                </div>
                {/* Period-based Revenue Column 1 */}
                <div className="flex-1 px-4 py-2 flex items-center gap-1">
                  <p className="text-[13px] font-semibold text-[#000b25] dark:text-[#94A3B8]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {period === 'Yearly' ? `${parseInt(year) - 1} Revenue` : 'Q1 Revenue'}
                  </p>
                </div>
                {/* Period-based Revenue Column 2 */}
                <div className="flex-1 px-4 py-2 flex items-center gap-1">
                  <p className="text-[13px] font-semibold text-[#000b25] dark:text-[#94A3B8]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {period === 'Yearly' ? `${year} Revenue` : 'Q2 Revenue'}
                  </p>
                </div>
                {/* Performance Column */}
                <div className="flex-1 px-4 py-2 flex items-center justify-center gap-1">
                  <p className="text-[13px] font-semibold text-[#000b25] dark:text-[#94A3B8]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Performance
                  </p>
                </div>
              </div>

              {/* Table Rows Container with Fixed Height */}
              <div className="overflow-y-auto">
                {paginatedCompanies.length === 0 ? (
                  <div className="flex items-center justify-center h-full min-w-[600px]">
                    <div className="text-center">
                      <Building2 className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                      <p className="text-gray-500 dark:text-gray-400">No companies found</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 w-full">
                    {paginatedCompanies.map((company, index) => {
                  const isSelected = selectedCompany?.id === company.id;
                  const isPositive = company.performance >= 0;

                  return (
                    <div
                      key={company.id}
                      onClick={() => setSelectedCompany(company)}
                      className={`flex rounded-[4px] relative cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#e6f1fa] dark:bg-blue-900/20'
                          : 'bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-[#1E293B]'
                      }`}
                    >
                      <div 
                        className={`absolute inset-0 border border-solid rounded-[4px] pointer-events-none ${
                          isSelected
                            ? 'border-[#0071cd] dark:border-blue-500'
                            : 'border-[#e1e1e1] dark:border-[#1E293B]'
                        }`}
                      />
                      
                      {/* Company Name */}
                      <div className="w-[185px] shrink-0 px-4 py-2 flex items-center">
                        <p 
                          className={`text-[14px] font-medium overflow-ellipsis overflow-hidden whitespace-nowrap ${
                            isSelected ? 'text-[#0071cd] dark:text-blue-400' : 'text-[rgba(0,11,37,0.64)] dark:text-[#F8FAFC]'
                          }`}
                          style={{ fontVariationSettings: "'wdth' 100" }}
                        >
                          {company.name}
                        </p>
                      </div>

                      {/* Q1 Revenue */}
                      <div className="flex-1 px-4 py-2 flex items-center">
                        <p className="text-[14px] font-normal text-[rgba(0,11,37,0.64)] dark:text-[#94A3B8]" style={{ fontVariationSettings: "'wdth' 100" }}>
                          {formatCurrency(company.q1Revenue)}
                        </p>
                      </div>

                      {/* Q2 Revenue */}
                      <div className="flex-1 px-4 py-2 flex items-center">
                        <p className="text-[14px] font-normal text-[rgba(0,11,37,0.64)] dark:text-[#94A3B8]" style={{ fontVariationSettings: "'wdth' 100" }}>
                          {formatCurrency(company.q2Revenue)}
                        </p>
                      </div>

                      {/* Performance */}
                      <div className="flex-1 px-4 py-1 flex items-center justify-center">
                        <div 
                          className={`flex items-center justify-center gap-1 p-1 rounded-[4px] text-[10px] font-medium text-center ${
                            isPositive ? 'bg-[rgba(34,197,94,0.15)] dark:bg-[#15B79E]/20 text-green-500 dark:text-[#15B79E]' : 'bg-[rgba(239,68,68,0.15)] dark:bg-[#F43F5E]/20 text-red-500 dark:text-[#F43F5E]'
                          }`}
                          style={{ fontVariationSettings: "'wdth' 100", width: '52px' }}
                        >
                          <p style={{ fontVariationSettings: "'wdth' 100" }}>
                            {Math.abs(company.performance).toFixed(1)}%
                          </p>
                          {isPositive ? (
                            <TrendingUp className="w-3 h-3 shrink-0" />
                          ) : (
                            <TrendingDown className="w-3 h-3 shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-1 flex-shrink-0 pt-3 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
                {/* Results Info */}
                <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, filteredCompanies.length)} of {filteredCompanies.length} results
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
                            <React.Fragment key={page}>
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
                            </React.Fragment>
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
            )}
          </div>

          {/* Right Panel - Revenue Insights */}
          <div className="content-stretch flex flex-col gap-[4px] items-start justify-center w-full lg:w-1/2 shrink-0">
            {selectedCompany ? (
              <>
                {/* Company Name Header */}

                
                {/* Table Header */}
                <div className="box-border content-stretch flex gap-[12px] sm:gap-[16px] items-center justify-center px-0 py-[4px] w-full shrink-0 p-[0px] bg-[rgba(142,93,93,0)]">
                  {/* Period Cell 1 */}
                  <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="box-border content-stretch flex gap-[8px] sm:gap-[12px] items-center justify-center px-[8px] sm:px-[16px] py-0 relative w-full">
                        <div className="bg-slate-50 dark:bg-transparent box-border content-stretch flex gap-[8px] sm:gap-[10px] items-center justify-center px-[8px] sm:px-[12px] py-[4px] relative rounded-[4px] shrink-0">
                          <div aria-hidden="true" className="absolute border border-slate-200 dark:border-[#1E293B] border-solid inset-0 pointer-events-none rounded-[4px]" />
                          <p className="font-medium leading-[1.2] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] sm:text-[16px] text-[rgba(0,11,37,0.64)] dark:text-[#94A3B8] text-center text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                            {period === 'Yearly' ? parseInt(year) - 1 : 'Q1'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Icon Spacer */}
                  <div className="h-[14px] rounded-[35px] shrink-0 w-[30px] sm:w-[40px]" />

                  {/* Period Cell 2 */}
                  <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                    <div className="flex flex-row items-center justify-center size-full">
                      <div className="box-border content-stretch flex gap-[8px] sm:gap-[12px] items-center justify-center px-[8px] sm:px-[16px] py-0 relative w-full">
                        <div className="bg-slate-50 dark:bg-transparent box-border content-stretch flex gap-[8px] sm:gap-[10px] items-center justify-center px-[8px] sm:px-[12px] py-[4px] relative rounded-[4px] shrink-0">
                          <div aria-hidden="true" className="absolute border border-slate-200 dark:border-[#1E293B] border-solid inset-0 pointer-events-none rounded-[4px]" />
                          <p className="font-medium leading-[1.2] overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] sm:text-[16px] text-[rgba(0,11,37,0.64)] dark:text-[#94A3B8] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                            {period === 'Yearly' ? year : 'Q2'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Comparison */}
                <div className="basis-0 content-stretch flex gap-[12px] sm:gap-[16px] grow items-center min-h-px min-w-px relative shrink-0 w-full">
                  {/* Q1 Column */}
                  <div className="basis-0 content-stretch flex flex-col gap-[6px] sm:gap-[8px] grow h-full items-start min-h-px min-w-px relative shrink-0">
                    {companyServiceRevenue.map((service) => (
                      <div
                        key={`q1-${service.service}`}
                        className="basis-0 bg-[#fff8e6] dark:bg-yellow-900/20 grow min-h-px min-w-px relative rounded-[4px] shrink-0 w-full overflow-hidden cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-[#ffb500] dark:hover:border-yellow-500"
                      >
                        <div className="flex flex-col items-center justify-center size-full">
                          <div className="box-border content-stretch flex flex-col font-medium gap-[3px] sm:gap-[4px] items-center justify-center leading-[1.2] px-[8px] sm:px-[16px] py-[16px] sm:py-[24px] relative w-full text-nowrap whitespace-pre">
                            <p className="relative shrink-0 text-[#ffb500] dark:text-yellow-500 text-[15px] sm:text-[17px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
                              {formatCompactCurrency(service.revenue2024)}
                            </p>
                            <p className="relative shrink-0 text-[#ffc433] dark:text-yellow-400 text-[12px] sm:text-[14px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
                              Revenue from {service.service}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Arrow Icon */}
                  <div className="relative rounded-[35px] shrink-0 w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]">
                    <div className="box-border content-stretch flex flex-col items-center justify-center overflow-clip px-[6px] sm:px-[8px] py-0 relative rounded-[inherit] w-full h-full">
                      <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-[rgba(0,11,37,0.64)] dark:text-gray-400" />
                    </div>
                    <div aria-hidden="true" className="absolute border border-[#e1e1e1] dark:border-gray-600 border-solid inset-0 pointer-events-none rounded-[35px]" />
                  </div>

                  {/* Q2 Column */}
                  <div className="basis-0 content-stretch flex flex-col gap-[6px] sm:gap-[8px] grow h-full items-start min-h-px min-w-px relative shrink-0">
                    {companyServiceRevenue.map((service) => {
                      const growth = ((service.revenue2025 - service.revenue2024) / service.revenue2024) * 100;
                      const isPositive = growth >= 0;
                      const isNeutral = Math.abs(growth) < 2;
                      
                      return (
                        <div
                          key={`q2-${service.service}`}
                          className="basis-0 bg-[#e6f3fa] dark:bg-blue-900/20 grow min-h-px min-w-px relative rounded-[4px] shrink-0 w-full overflow-hidden cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-[#0085ca] dark:hover:border-blue-400"
                        >
                          <div className="flex flex-col items-center justify-center size-full">
                            <div className="box-border content-stretch flex flex-col font-medium gap-[3px] sm:gap-[4px] items-center justify-center leading-[1.2] px-[8px] sm:px-[16px] py-[16px] sm:py-[24px] relative w-full text-nowrap whitespace-pre">
                              <div className="content-stretch flex gap-[3px] items-center justify-center relative">
                                <div className="content-stretch flex items-center justify-center relative shrink-0">
                                  {isNeutral ? (
                                    <ArrowRight className="w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] text-slate-500 flex-shrink-0" />
                                  ) : isPositive ? (
                                    <TrendingUp className="w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] text-green-500 flex-shrink-0" />
                                  ) : (
                                    <TrendingDown className="w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] text-red-500 flex-shrink-0" />
                                  )}
                                </div>
                                <p className="relative shrink-0 text-[#0085ca] dark:text-blue-400 text-[15px] sm:text-[17px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
                                  {formatCompactCurrency(service.revenue2025)}
                                </p>
                              </div>
                              <p className="relative shrink-0 text-[#339dd5] dark:text-blue-300 text-[12px] sm:text-[14px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
                                Revenue from {service.service}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <div className="text-center px-4">
                  <Building2 className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                  <p className="text-[12px] text-gray-500 dark:text-gray-400">Select a company to view revenue breakdown</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
