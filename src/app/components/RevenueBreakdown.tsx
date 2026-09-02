import React, { useState } from 'react';
import { DollarSign, TrendingUp, Smartphone, Phone, MessageSquare, Monitor, Server, PieChart, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { motion } from 'motion/react';
import type { UserScope } from '../utils/scopeResolver';

// Shared KPI Data Tokens - Centralized source of truth (MUST match Revenue Performance KPI Card)
const KpiData = {
  revenue: {
    percent: 92.1,      // Revenue Performance KPI percentage
    amount: 89337       // Revenue Performance KPI amount in OMR (92.1% × 97000 = ~89.3K OMR) - Source: MetricsCards.tsx line 766
  }
};

// Helper formatting functions
const fmt = {
  percent: (value: number) => `${value}%`,
  omr: (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K OMR`;
    }
    return `${value} OMR`;
  }
};

// Create the composite KPI display string
const getKpiDisplayValue = () => {
  return `${fmt.percent(KpiData.revenue.percent)} | ${fmt.omr(KpiData.revenue.amount)}`;
};

export function RevenueBreakdown({ selectedTeamMember, hideChart = false, period, quarter }: { 
  selectedTeamMember?: string; 
  hideChart?: boolean;
  period?: string;
  quarter?: string;
}) {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('revenue');
  
  // Simple dark mode detection
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  React.useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark') || 
                     window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);
    
    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', checkDarkMode);
    };
  }, []);

  const getServiceIcon = (serviceName: string) => {
    const normalized = serviceName.toLowerCase();
    if (normalized.includes('invoice')) {
      return DollarSign;
    }
    if (normalized.includes('mobile')) {
      return Smartphone;
    }
    if (normalized.includes('fixed')) {
      return Phone;
    }
    if (normalized.includes('ict')) {
      return Monitor;
    }
    if (normalized.includes('device')) {
      return Monitor;
    }
    if (normalized.includes('sms')) {
      return MessageSquare;
    }
    if (normalized.includes('inmarsat')) {
      return Server;
    }
    if (normalized.includes('adjustment')) {
      return TrendingUp;
    }
    return DollarSign;
  };

  const getServiceColors = (serviceName: string) => {
    const normalized = serviceName.toLowerCase();
    
    // Mobile - Blue
    if (normalized.includes('mobile')) {
      return { 
        primary: '#3B82F6', 
        primaryDark: '#A5B4FC',
        light: '#DBEAFE', 
        text: 'text-blue-600 dark:text-blue-400',
        textHover: 'text-blue-700 dark:text-blue-300',
        bg: 'bg-blue-50 dark:bg-blue-900/10',
        border: 'border-blue-200 dark:border-blue-800/30',
        borderColor: '#60A5FA',
        iconBg: 'bg-blue-100/80 dark:bg-blue-900/20',
        hoverBorder: 'border-blue-400/60 dark:border-blue-500/40',
        hoverBg: 'bg-blue-50/30 dark:bg-blue-900/20',
        cardBg: 'bg-blue-50/30 dark:bg-blue-950/20',
        hoverGlow: 'shadow-blue-500/20 dark:shadow-blue-400/20',
        progressBg: 'bg-blue-100/40 dark:bg-blue-900/30',
        progressFill: 'bg-blue-500 dark:bg-blue-400'
      };
    }
    
    // Fixed - Indigo
    if (normalized.includes('fixed')) {
      return { 
        primary: '#6366F1', 
        primaryDark: '#A5B4FC',
        light: '#E0E7FF', 
        text: 'text-indigo-600 dark:text-indigo-400',
        textHover: 'text-indigo-700 dark:text-indigo-300',
        bg: 'bg-indigo-50 dark:bg-indigo-900/10',
        border: 'border-indigo-200 dark:border-indigo-800/30',
        borderColor: '#818CF8',
        iconBg: 'bg-indigo-100/80 dark:bg-indigo-900/20',
        hoverBorder: 'border-indigo-400/60 dark:border-indigo-500/40',
        hoverBg: 'bg-indigo-50/30 dark:bg-indigo-900/20',
        cardBg: 'bg-indigo-50/30 dark:bg-indigo-950/20',
        hoverGlow: 'shadow-indigo-500/20 dark:shadow-indigo-400/20',
        progressBg: 'bg-indigo-100/40 dark:bg-indigo-900/30',
        progressFill: 'bg-indigo-500 dark:bg-indigo-400'
      };
    }
    
    // ICT - Purple
    if (normalized.includes('ict')) {
      return { 
        primary: '#9333EA', 
        primaryDark: '#D8B4FE',
        light: '#F3E8FF', 
        text: 'text-purple-600 dark:text-purple-400',
        textHover: 'text-purple-700 dark:text-purple-300',
        bg: 'bg-purple-50 dark:bg-purple-900/10',
        border: 'border-purple-200 dark:border-purple-800/30',
        borderColor: '#A78BFA',
        iconBg: 'bg-purple-100/80 dark:bg-purple-900/20',
        hoverBorder: 'border-purple-400/60 dark:border-purple-500/40',
        hoverBg: 'bg-purple-50/30 dark:bg-purple-900/20',
        cardBg: 'bg-purple-50/30 dark:bg-purple-950/20',
        hoverGlow: 'shadow-purple-500/20 dark:shadow-purple-400/20',
        progressBg: 'bg-purple-100/40 dark:bg-purple-900/30',
        progressFill: 'bg-purple-500 dark:bg-purple-400'
      };
    }
    
    // Invoice - Blue (fallback, shouldn't be used after split)
    if (normalized.includes('invoice')) {
      return { 
        primary: '#3B82F6', 
        primaryDark: '#A5B4FC',
        light: '#DBEAFE', 
        text: 'text-blue-600 dark:text-blue-400',
        textHover: 'text-blue-700 dark:text-blue-300',
        bg: 'bg-blue-50 dark:bg-blue-900/10',
        border: 'border-blue-200 dark:border-blue-800/30',
        borderColor: '#60A5FA',
        iconBg: 'bg-blue-100/80 dark:bg-blue-900/20',
        hoverBorder: 'border-blue-400/60 dark:border-blue-500/40',
        hoverBg: 'bg-blue-50/30 dark:bg-blue-900/20',
        cardBg: 'bg-blue-50/30 dark:bg-blue-950/20',
        hoverGlow: 'shadow-blue-500/20 dark:shadow-blue-400/20',
        progressBg: 'bg-blue-100/40 dark:bg-blue-900/30',
        progressFill: 'bg-blue-500 dark:bg-blue-400'
      };
    }
    
    // Device - Violet
    if (normalized.includes('device')) {
      return { 
        primary: '#8B5CF6', 
        primaryDark: '#C4B5FD',
        light: '#EDE9FE', 
        text: 'text-violet-600 dark:text-violet-400',
        textHover: 'text-violet-700 dark:text-violet-300',
        bg: 'bg-violet-50 dark:bg-violet-900/10',
        border: 'border-violet-200 dark:border-violet-800/30',
        borderColor: '#A78BFA',
        iconBg: 'bg-violet-100/80 dark:bg-violet-900/20',
        hoverBorder: 'border-violet-400/60 dark:border-violet-500/40',
        hoverBg: 'bg-violet-50/30 dark:bg-violet-900/20',
        cardBg: 'bg-violet-50/30 dark:bg-violet-950/20',
        hoverGlow: 'shadow-violet-500/20 dark:shadow-violet-400/20',
        progressBg: 'bg-violet-100/40 dark:bg-violet-900/30',
        progressFill: 'bg-violet-500 dark:bg-violet-400'
      };
    }
    
    // SMS - Teal
    if (normalized.includes('sms')) {
      return { 
        primary: '#15B79E', 
        primaryDark: '#5EEAD4',
        light: '#CCFBF1', 
        text: 'text-teal-600 dark:text-teal-400',
        textHover: 'text-teal-700 dark:text-teal-300',
        bg: 'bg-teal-50 dark:bg-teal-900/10',
        border: 'border-teal-200 dark:border-teal-800/30',
        borderColor: '#2DD4BF',
        iconBg: 'bg-teal-100/80 dark:bg-teal-900/20',
        hoverBorder: 'border-teal-400/60 dark:border-teal-500/40',
        hoverBg: 'bg-teal-50/30 dark:bg-teal-900/20',
        cardBg: 'bg-teal-50/30 dark:bg-teal-950/20',
        hoverGlow: 'shadow-teal-500/20 dark:shadow-teal-400/20',
        progressBg: 'bg-teal-100/40 dark:bg-teal-900/30',
        progressFill: 'bg-teal-500 dark:bg-teal-400'
      };
    }
    
    // Inmarsat - Green
    if (normalized.includes('inmarsat')) {
      return { 
        primary: '#22C55E', 
        primaryDark: '#86EFAC',
        light: '#DCFCE7', 
        text: 'text-green-600 dark:text-green-400',
        textHover: 'text-green-700 dark:text-green-300',
        bg: 'bg-green-50 dark:bg-green-900/10',
        border: 'border-green-200 dark:border-green-800/30',
        borderColor: '#4ADE80',
        iconBg: 'bg-green-100/80 dark:bg-green-900/20',
        hoverBorder: 'border-green-400/60 dark:border-green-500/40',
        hoverBg: 'bg-green-50/30 dark:bg-green-900/20',
        cardBg: 'bg-green-50/30 dark:bg-green-950/20',
        hoverGlow: 'shadow-green-500/20 dark:shadow-green-400/20',
        progressBg: 'bg-green-100/40 dark:bg-green-900/30',
        progressFill: 'bg-green-500 dark:bg-green-400'
      };
    }
    
    // Adjustments - Red (negative/deduction indicator)
    if (normalized.includes('adjustment')) {
      return { 
        primary: '#EF4444', 
        primaryDark: '#F87171',
        light: '#FEE2E2', 
        text: 'text-red-600 dark:text-red-400',
        textHover: 'text-red-700 dark:text-red-300',
        bg: 'bg-red-50 dark:bg-red-900/10',
        border: 'border-red-200 dark:border-red-800/30',
        borderColor: '#F87171',
        iconBg: 'bg-red-100/80 dark:bg-red-900/20',
        hoverBorder: 'border-red-400/60 dark:border-red-500/40',
        hoverBg: 'bg-red-50/30 dark:bg-red-900/20',
        cardBg: 'bg-red-50/30 dark:bg-red-950/20',
        hoverGlow: 'shadow-red-500/20 dark:shadow-red-400/20',
        progressBg: 'bg-red-100/40 dark:bg-red-900/30',
        progressFill: 'bg-red-500 dark:bg-red-400'
      };
    }
    
    // Default - Gray
    return { 
      primary: '#6B7280', 
      primaryDark: '#9CA3AF',
      light: '#F3F4F6', 
      text: 'text-gray-600 dark:text-gray-300',
      textHover: 'text-gray-700 dark:text-gray-200',
      bg: 'bg-gray-50 dark:bg-gray-800/10',
      border: 'border-gray-200 dark:border-gray-700/30',
      borderColor: '#9CA3AF',
      iconBg: 'bg-gray-100/80 dark:bg-gray-800/20',
      hoverBorder: 'border-gray-400/60 dark:border-gray-600/40',
      hoverBg: 'bg-gray-50/30 dark:bg-gray-800/20',
      cardBg: 'bg-gray-50/30 dark:bg-gray-900/20',
      hoverGlow: 'shadow-gray-500/20 dark:shadow-gray-400/20',
      progressBg: 'bg-gray-100/40 dark:bg-gray-800/30',
      progressFill: 'bg-gray-500 dark:bg-gray-400'
    };
  };

  // Revenue breakdown data - new structure
  const getRevenueData = () => {
    if (selectedTeamMember === 'Ahmed Al-Rashid') {
      return {
        services: [
          { name: 'Invoice Amount', value: '3.07M OMR', actualValue: 3072, share: 0 }, // Mobile (1728) + Fixed (1344)
          { name: 'ICT', value: '768K OMR', actualValue: 768, share: 0 },
          { name: 'Device', value: '2.20M OMR', actualValue: 2200, share: 0 },
          { name: 'InfoCom Bulk SMS', value: '1.03M OMR', actualValue: 1030, share: 0 },
          { name: 'Inmarsat', value: '720K OMR', actualValue: 720, share: 0 },
          { name: 'Adjustments', value: '-540K OMR', actualValue: -540, share: 0 }
        ],
        totalRevenue: '7.25M OMR',
        totalValue: 7.25,
        servicesCount: 6
      };
    } else if (selectedTeamMember === 'Fatima Al-Zahra') {
      return {
        services: [
          { name: 'Invoice Amount', value: '2.56M OMR', actualValue: 2560, share: 0 }, // Mobile (1440) + Fixed (1120)
          { name: 'ICT', value: '640K OMR', actualValue: 640, share: 0 },
          { name: 'Device', value: '1.85M OMR', actualValue: 1850, share: 0 },
          { name: 'InfoCom Bulk SMS', value: '890K OMR', actualValue: 890, share: 0 },
          { name: 'Inmarsat', value: '580K OMR', actualValue: 580, share: 0 },
          { name: 'Adjustments', value: '-450K OMR', actualValue: -450, share: 0 }
        ],
        totalRevenue: '6.07M OMR',
        totalValue: 6.07,
        servicesCount: 6
      };
    } else if (selectedTeamMember === 'Mohamed Al-Balushi') {
      return {
        services: [
          { name: 'Invoice Amount', value: '2.36M OMR', actualValue: 2360, share: 0 }, // Mobile (1327.5) + Fixed (1032.5)
          { name: 'ICT', value: '590K OMR', actualValue: 590, share: 0 },
          { name: 'Device', value: '1.60M OMR', actualValue: 1600, share: 0 },
          { name: 'InfoCom Bulk SMS', value: '750K OMR', actualValue: 750, share: 0 },
          { name: 'Inmarsat', value: '480K OMR', actualValue: 480, share: 0 },
          { name: 'Adjustments', value: '-380K OMR', actualValue: -380, share: 0 }
        ],
        totalRevenue: '5.40M OMR',
        totalValue: 5.40,
        servicesCount: 6
      };
    } else {
      // Overall/default view
      return {
        services: [
          { name: 'Invoice Amount', value: '2.78M OMR', actualValue: 2784, share: 0 }, // Mobile (1566) + Fixed (1218)
          { name: 'ICT', value: '696K OMR', actualValue: 696, share: 0 },
          { name: 'Device', value: '1.95M OMR', actualValue: 1950, share: 0 },
          { name: 'InfoCom Bulk SMS', value: '920K OMR', actualValue: 920, share: 0 },
          { name: 'Inmarsat', value: '650K OMR', actualValue: 650, share: 0 },
          { name: 'Adjustments', value: '-485K OMR', actualValue: -485, share: 0 }
        ],
        totalRevenue: '6.52M OMR',
        totalValue: 6.52,
        servicesCount: 6
      };
    }
  };

  const revenueData = getRevenueData();

  // Process data based on sorting
  const processedServices = React.useMemo(() => {
    let services = [...revenueData.services];
    
    // Apply sorting
    switch (sortBy) {
      case 'share':
        services.sort((a, b) => b.share - a.share);
        break;
      case 'name':
        services.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'revenue':
      default:
        services.sort((a, b) => b.actualValue - a.actualValue);
        break;
    }
    
    return services;
  }, [revenueData.services, sortBy]);

  // Calculate cumulative percentages for donut chart
  let cumulativePercentage = 0;
  const servicesWithAngles = revenueData.services.map((service) => {
    const startAngle = cumulativePercentage;
    cumulativePercentage += service.share;
    return {
      ...service,
      startAngle,
      endAngle: cumulativePercentage
    };
  });

  // SVG Donut Chart Component
  const DonutChart = () => {
    const size = 160;
    const strokeWidth = 24;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200 dark:text-gray-700 transition-colors duration-300"
          />
          
          {/* Service segments - Show all or focused service only */}
          {hoveredService ? (
            // Show only the hovered service, filling the entire circle
            (() => {
              const service = processedServices.find(s => s.name === hoveredService);
              if (!service) return null;
              
              const colors = getServiceColors(service.name);
              
              return (
                <motion.circle
                  key={`focused-${service.name}`}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={isDarkMode ? colors.primaryDark : colors.primary}
                  strokeWidth={strokeWidth + 3}
                  fill="none"
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={0}
                  className="transition-all duration-300 cursor-pointer"
                  style={{
                    filter: 'brightness(1.15) saturate(1.2)',
                  }}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{ strokeDasharray: `${circumference} ${circumference}` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              );
            })()
          ) : (
            // Show all services with their proportional segments
            servicesWithAngles.map((service, index) => {
              const colors = getServiceColors(service.name);
              const segmentLength = (service.share / 100) * circumference;
              const segmentOffset = (service.startAngle / 100) * circumference;
              
              return (
                <motion.circle
                  key={service.name}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={isDarkMode ? colors.primaryDark : colors.primary}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={`${segmentLength} ${circumference}`}
                  strokeDashoffset={-segmentOffset}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredService(service.name)}
                  onMouseLeave={() => setHoveredService(null)}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{ strokeDasharray: `${segmentLength} ${circumference}` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              );
            })
          )}
        </svg>
        
        {/* Center content - Dynamic based on hover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center transition-all duration-300">
            {hoveredService ? (
              // Show specific service data when hovering
              (() => {
                const service = processedServices.find(s => s.name === hoveredService);
                const colors = getServiceColors(hoveredService);
                return service ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                  >
                    <div className={`text-lg font-bold ${colors.text} mb-1`}>
                      {service.value}
                    </div>
                    <div className={`text-xs ${colors.text} font-medium`}>
                      {service.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300">
                      {service.share}% of total
                    </div>
                  </motion.div>
                ) : null;
              })()
            ) : (
              // Show total revenue when not hovering
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="text-center"
              >
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">{revenueData.totalRevenue}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">Total Revenue</div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      <CardHeader className={`${hideChart ? 'pb-0 pt-3 px-4' : 'pb-0 pt-3 px-4'} flex-shrink-0`}>
        <CardTitle className="flex items-center justify-between min-h-[32px]">
          {/* Left: Icon + Title */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800/30 transition-colors duration-300">
              <PieChart className="w-5 h-5 text-amber-600 dark:text-amber-400 transition-colors duration-300" />
            </div>
            <span className="widget-title whitespace-nowrap">Revenue Summary</span>
          </div>
          
          {/* Right: Filter + KPI Synced Total - Horizontally Aligned */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="hidden h-8 px-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400 outline-none font-medium text-gray-700 dark:text-gray-200 min-w-0"
              style={{
                colorScheme: 'light dark',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6,9 12,15 18,9\'%3e%3c/polyline%3e%3c/svg%3e")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 6px center',
                backgroundSize: '10px',
                paddingRight: '22px',
                minWidth: 'auto'
              }}
            >
              <option value="revenue" className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">Revenue</option>
              <option value="share" className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">Share %</option>
              <option value="name" className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">Name</option>
            </select>
            
            {/* KPI Synced Total (Source of Truth from Revenue Performance KPI) */}
            <div className="text-lg font-bold whitespace-nowrap transition-colors duration-300 flex items-center gap-1">
              {/* Percentage with conditional coloring */}
              <span className={`transition-colors duration-300 ${
                KpiData.revenue.percent >= 90 
                  ? 'text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300' 
                  : 'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300'
              }`}>
                {fmt.percent(KpiData.revenue.percent)}
              </span>
              {/* Separator and KPI total in original amber color */}
              <span className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors duration-300">
                | {fmt.omr(KpiData.revenue.amount)}
              </span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className={`flex-1 flex flex-col px-4 ${hideChart ? '-mt-3 pt-0 pb-3 space-y-2' : '-mt-3 pt-0 pb-3 space-y-4'}`}>
        {/* Main Content: Donut Chart + Service List */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Donut Chart Section - Conditionally rendered */}
          {!hideChart && (
            <div className="flex-shrink-0 flex items-center justify-center">
              <DonutChart />
            </div>
          )}

          {/* Services Grid - 2-Column Compact Layout */}
          <div className={`flex-1 grid ${hideChart ? 'gap-2.5' : 'gap-3'} ${hideChart ? 'grid-cols-2 auto-rows-fr' : 'grid-cols-1 md:grid-cols-2 auto-rows-fr'}`}>
            {(() => {
              // Get raw values from processedServices
              const invoiceVal = processedServices.find(s => s.name === 'Invoice Amount')?.actualValue || 0;
              const ictVal = processedServices.find(s => s.name === 'ICT')?.actualValue || 0;
              const deviceVal = processedServices.find(s => s.name === 'Device')?.actualValue || 0;
              const smsVal = processedServices.find(s => s.name === 'InfoCom Bulk SMS')?.actualValue || 0;
              const inmarsatVal = processedServices.find(s => s.name === 'Inmarsat')?.actualValue || 0;
              const adjustmentVal = processedServices.find(s => s.name.toLowerCase().includes('adjustment'))?.actualValue || 0;

              // Calculate raw sum positive items
              const sum_raw_positive = invoiceVal + ictVal + deviceVal + smsVal + inmarsatVal;
              
              // Calculate raw sum (net revenue before scaling)
              const sum_raw_net = sum_raw_positive - Math.abs(adjustmentVal);
              
              // Get KPI total (source of truth)
              const total_revenue_omr = KpiData.revenue.amount;
              
              // Calculate scale factor to match KPI total
              const scale_factor = sum_raw_net > 0 ? total_revenue_omr / sum_raw_net : 0;
              
              // If no data, show zeros
              if (sum_raw_net <= 0 || scale_factor === 0) {
                const scaledServices = processedServices.map(service => ({
                  ...service,
                  scaledValue: 0,
                  scaledDisplay: fmt.omr(0)
                }));
                
                return scaledServices.map((service, index) => {
                  const IconComponent = getServiceIcon(service.name);
                  const colors = getServiceColors(service.name);
                  const isHovered = hoveredService === service.name;
                  const isAdjustment = service.name.toLowerCase().includes('adjustment');
                  
                  return (
                    <motion.div
                      key={service.name}
                      className={`relative rounded-lg w-full border-2 transition-all duration-300 ease-in-out cursor-default ${
                        isHovered 
                          ? `${colors.hoverBorder} dark:shadow-lg ${colors.hoverGlow}` 
                          : 'border-gray-200/60 dark:border-gray-700/40'
                      } ${colors.cardBg} dark:shadow-sm dark:shadow-gray-900/20 ${
                        isAdjustment ? 'col-span-2 bg-red-50/30 dark:bg-red-950/20' : ''
                      }`}
                      style={{ minHeight: '46px' }}
                      onMouseEnter={() => setHoveredService(service.name)}
                      onMouseLeave={() => setHoveredService(null)}
                      role="listitem"
                      aria-label={`${service.name}: ${isAdjustment ? '-' : ''}${service.scaledDisplay}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between h-full px-3">
                        <div className="flex items-center gap-2.5 flex-shrink-0">
                          <div className={`p-1.5 rounded-lg transition-all duration-300 flex items-center justify-center ${colors.iconBg} ${isHovered ? 'shadow-sm' : ''}`}>
                            <IconComponent className={`w-4 h-4 transition-all duration-300 ${isHovered ? colors.textHover : colors.text} ${isHovered ? 'drop-shadow-sm scale-110' : ''}`} />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-gray-200 transition-colors duration-300 text-sm">
                            {service.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`font-semibold transition-colors duration-300 text-sm ${
                            isAdjustment 
                              ? 'text-red-600 dark:text-red-400' 
                              : 'text-gray-900 dark:text-gray-200'
                          }`}>
                            {isAdjustment ? '-' : ''}{service.scaledDisplay}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                });
              }
              
              // Scale each item proportionally
              let invoice_scaled = invoiceVal * scale_factor;
              let ict_scaled = ictVal * scale_factor;
              let device_scaled = deviceVal * scale_factor;
              let sms_scaled = smsVal * scale_factor;
              let inmarsat_scaled = inmarsatVal * scale_factor;
              let adjustment_scaled = Math.abs(adjustmentVal) * scale_factor;

              // Calculate current sum after scaling
              let sum_scaled = invoice_scaled + ict_scaled + device_scaled + sms_scaled + inmarsat_scaled - adjustment_scaled;

              // Reconciliation: Add delta to largest positive item
              const delta = total_revenue_omr - sum_scaled;
              if (Math.abs(delta) > 0.01) {
                const items = [
                  { name: 'invoice', value: invoice_scaled },
                  { name: 'ict', value: ict_scaled },
                  { name: 'device', value: device_scaled },
                  { name: 'sms', value: sms_scaled },
                  { name: 'inmarsat', value: inmarsat_scaled }
                ];
                const largest = items.reduce((max, item) =>
                  Math.abs(item.value) > Math.abs(max.value) ? item : max
                );

                // Apply delta to largest item
                if (largest.name === 'invoice') invoice_scaled += delta;
                else if (largest.name === 'ict') ict_scaled += delta;
                else if (largest.name === 'device') device_scaled += delta;
                else if (largest.name === 'sms') sms_scaled += delta;
                else if (largest.name === 'inmarsat') inmarsat_scaled += delta;
              }

              // Create scaled services array with reconciled values
              const scaledServicesMap = new Map([
                ['Invoice Amount', invoice_scaled],
                ['ICT', ict_scaled],
                ['Device', device_scaled],
                ['InfoCom Bulk SMS', sms_scaled],
                ['Inmarsat', inmarsat_scaled],
                ['Adjustments', -adjustment_scaled]
              ]);
              
              // Calculate percentages for each service
              const scaledServices = processedServices.map(service => {
                const scaledValue = scaledServicesMap.get(service.name) || 0;
                const percentage = total_revenue_omr > 0 ? (Math.abs(scaledValue) / total_revenue_omr) * 100 : 0;
                return {
                  ...service,
                  scaledValue: scaledValue,
                  scaledDisplay: fmt.omr(Math.abs(scaledValue)),
                  percentage: percentage
                };
              });
              
              return scaledServices.map((service, index) => {
                const IconComponent = getServiceIcon(service.name);
                const colors = getServiceColors(service.name);
                const isHovered = hoveredService === service.name;
                const isAdjustment = service.name.toLowerCase().includes('adjustment');
                
                return (
                  <motion.div
                    key={service.name}
                    className={`relative rounded-lg w-full border-2 transition-all duration-300 ease-in-out cursor-default overflow-hidden ${
                      isHovered 
                        ? `${colors.hoverBorder} dark:shadow-lg ${colors.hoverGlow} scale-[1.02]` 
                        : 'border-gray-200/60 dark:border-gray-700/40'
                    } ${colors.cardBg} dark:shadow-sm dark:shadow-gray-900/20 ${
                      isAdjustment ? 'col-span-2 bg-red-50/30 dark:bg-red-950/20' : ''
                    }`}
                    style={{ minHeight: '46px' }}
                    onMouseEnter={() => setHoveredService(service.name)}
                    onMouseLeave={() => setHoveredService(null)}
                    role="listitem"
                    aria-label={`${service.name}: ${isAdjustment ? '-' : ''}${service.scaledDisplay}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {/* Colored left accent bar */}
                    <div 
                      className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                        isHovered ? 'w-1.5' : 'w-1'
                      }`}
                      style={{ 
                        background: isAdjustment 
                          ? 'linear-gradient(to bottom, #EF4444, #DC2626)' 
                          : `linear-gradient(to bottom, ${colors.primary}, ${colors.primaryDark})`
                      }}
                    />
                    
                    <div className="flex items-center justify-between h-full pl-3.5 pr-3 gap-2">
                      {/* Left Section: Icon + Service Name */}
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div className={`p-1.5 rounded-lg transition-all duration-300 flex items-center justify-center flex-shrink-0 ${colors.iconBg} ${isHovered ? 'shadow-md scale-110' : 'shadow-sm'}`}>
                          <IconComponent className={`w-4 h-4 transition-all duration-300 ${isHovered ? colors.textHover : colors.text}`} />
                        </div>
                        <TooltipProvider delayDuration={300}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="font-medium text-[rgba(16,24,40,0.85)] dark:text-gray-200 transition-colors duration-300 text-sm truncate">
                                {service.name}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1">
                              {service.name}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      
                      {/* Right Section: Amount Only */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`font-semibold transition-colors duration-300 text-sm whitespace-nowrap ${
                          isAdjustment 
                            ? 'text-red-600 dark:text-red-400' 
                            : 'text-gray-900 dark:text-gray-200'
                        }`}>
                          {isAdjustment ? '-' : ''}{service.scaledDisplay}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              });
            })()}
          </div>

          {/* Commission Calculation Formula - KPI Synced with Scaled Values */}
          {hideChart && (() => {
            // Get raw values
            const invoiceVal = processedServices.find(s => s.name === 'Invoice Amount')?.actualValue || 0;
            const ictVal = processedServices.find(s => s.name === 'ICT')?.actualValue || 0;
            const deviceVal = processedServices.find(s => s.name === 'Device')?.actualValue || 0;
            const smsVal = processedServices.find(s => s.name === 'InfoCom Bulk SMS')?.actualValue || 0;
            const inmarsatVal = processedServices.find(s => s.name === 'Inmarsat')?.actualValue || 0;
            const adjustmentVal = processedServices.find(s => s.name.toLowerCase().includes('adjustment'))?.actualValue || 0;

            // Calculate raw sums
            const sum_raw_positive = invoiceVal + ictVal + deviceVal + smsVal + inmarsatVal;
            const sum_raw_net = sum_raw_positive - Math.abs(adjustmentVal);
            
            // Get KPI total (source of truth)
            const total_revenue_omr = KpiData.revenue.amount;
            
            // Calculate scale factor
            const scale_factor = sum_raw_net > 0 ? total_revenue_omr / sum_raw_net : 0;
            
            // Check if we have data
            const hasData = sum_raw_net > 0 && scale_factor > 0;
            
            if (!hasData) {
              return (
                <div className="pt-0 mt-0 border-t transition-colors duration-300" style={{ borderColor: '#E2E8F0' }}>
                  <div className="px-4 py-2">
                    <p className="text-xs italic font-medium whitespace-nowrap transition-colors duration-300" style={{ color: '#475569' }}>
                      <span className="text-slate-700 dark:text-slate-300">Net Revenue = </span>
                      <span style={{ color: '#F59E0B' }}>• awaiting data</span>
                    </p>
                  </div>
                </div>
              );
            }
            
            // Calculate scaled values for formula display with reconciliation
            let invoice_scaled = invoiceVal * scale_factor;
            let ict_scaled = ictVal * scale_factor;
            let device_scaled = deviceVal * scale_factor;
            let sms_scaled = smsVal * scale_factor;
            let inmarsat_scaled = inmarsatVal * scale_factor;
            let adjustment_scaled = Math.abs(adjustmentVal) * scale_factor;

            // Calculate current sum
            let sum_scaled = invoice_scaled + ict_scaled + device_scaled + sms_scaled + inmarsat_scaled - adjustment_scaled;

            // Reconciliation: Add delta to largest positive item
            const delta = total_revenue_omr - sum_scaled;
            if (Math.abs(delta) > 0.01) {
              const items = [
                { name: 'invoice', value: invoice_scaled },
                { name: 'ict', value: ict_scaled },
                { name: 'device', value: device_scaled },
                { name: 'sms', value: sms_scaled },
                { name: 'inmarsat', value: inmarsat_scaled }
              ];
              const largest = items.reduce((max, item) =>
                Math.abs(item.value) > Math.abs(max.value) ? item : max
              );

              if (largest.name === 'invoice') invoice_scaled += delta;
              else if (largest.name === 'ict') ict_scaled += delta;
              else if (largest.name === 'device') device_scaled += delta;
              else if (largest.name === 'sms') sms_scaled += delta;
              else if (largest.name === 'inmarsat') inmarsat_scaled += delta;
            }

            // Recalculate sum after reconciliation
            const net_revenue_scaled = invoice_scaled + ict_scaled + device_scaled + sms_scaled + inmarsat_scaled - adjustment_scaled;
            
            // Final validation check (should be nearly zero after reconciliation)
            const finalDelta = Math.abs(total_revenue_omr - net_revenue_scaled);
            const hasMismatch = finalDelta > 0.5;
            
            return (
              <div className="pt-0 mt-0">
                <div className="py-3 overflow-x-auto scrollbar-hide bg-gradient-to-r from-blue-50/80 to-indigo-50/60 dark:from-blue-900/20 dark:to-indigo-900/15 rounded-lg border-2 border-blue-200/60 dark:border-blue-500/30 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm">
                  <p className="text-xs italic font-medium transition-colors duration-300 text-center break-words leading-relaxed" style={{ color: '#475569' }}>
                    <span className="text-slate-700 dark:text-slate-300">Net Revenue = </span>
                    <span className="text-slate-600 dark:text-slate-400">(</span>

                    <span style={{ color: '#3B82F6' }}>{fmt.omr(invoice_scaled)}</span>

                    <span className="text-slate-600 dark:text-slate-400"> + </span>

                    <span style={{ color: '#9333EA' }}>{fmt.omr(ict_scaled)}</span>

                    <span className="text-slate-600 dark:text-slate-400"> + </span>

                    <span style={{ color: '#8B5CF6' }}>{fmt.omr(device_scaled)}</span>

                    <span className="text-slate-600 dark:text-slate-400"> + </span>

                    <span style={{ color: '#15B79E' }}>{fmt.omr(sms_scaled)}</span>

                    <span className="text-slate-600 dark:text-slate-400"> + </span>

                    <span style={{ color: '#22C55E' }}>{fmt.omr(inmarsat_scaled)}</span>

                    <span className="text-slate-600 dark:text-slate-400">) − </span>
                    
                    <span style={{ color: '#F44336' }}>{fmt.omr(adjustment_scaled)}</span>
                    
                    <span className="text-slate-600 dark:text-slate-400"> = </span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">{fmt.omr(total_revenue_omr)}</span>
                    
                    {hasMismatch && (
                      <span className="ml-2" style={{ color: '#F59E0B' }}>• totals out of sync, refresh</span>
                    )}
                  </p>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Bottom Summary - Only show when chart is visible */}
        {!hideChart && (
          <motion.div 
            className="border-t pt-4 mt-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-700/50 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg transition-colors duration-300">
                    <DollarSign className="w-5 h-5 text-amber-600 dark:text-amber-400 transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">Total Portfolio Revenue</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Combined revenue across all service categories</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 transition-colors duration-300">{revenueData.totalRevenue}</div>
                  <div className="text-sm text-amber-500 dark:text-amber-400 transition-colors duration-300">{revenueData.servicesCount} active services</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}