import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Users, DollarSign, Percent, Activity, ChevronDown, ChevronUp, Wifi, Smartphone, Server, MessageSquare, Network } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ComparisonIndicator } from './ComparisonIndicator';

// Segment to Verticals mapping
const SEGMENT_VERTICALS: Record<string, string[]> = {
  'All': [
    'All Verticals',
    'Business Centers',
    'Government & Financial Accounts',
    'Retail & Technology Accounts',
    'Services',
    'Medium Segment',
    'BMB',
    'Indirect Channel',
    'Manufacturing & Infrastructure Accounts',
    'Healthcare Education & Hospitality Accounts',
    'Key Government Accounts',
    'Dhofar',
    'Key Energy Accounts',
    'Key Financial Accounts',
    'Energy & Industrial Accounts',
    'Closed AC',
    'Dhofar-Retail'
  ],
  'Micro-Retail': [
    'All Verticals',
    'Retail & Technology Accounts',
    'Business Centers',
    'Indirect Channel',
    'Dhofar-Retail'
  ],
  'Large Business': [
    'All Verticals',
    'Manufacturing & Infrastructure Accounts',
    'Energy & Industrial Accounts',
    'Key Energy Accounts',
    'Services'
  ],
  'Medium Services': [
    'All Verticals',
    'Services',
    'Medium Segment',
    'Healthcare Education & Hospitality Accounts'
  ],
  'Medium Business': [
    'All Verticals',
    'Medium Segment',
    'Business Centers',
    'Services'
  ],
  'BMB': [
    'All Verticals',
    'BMB',
    'Business Centers',
    'Services',
    'Government & Financial Accounts'
  ],
  'Indirect-Small': [
    'All Verticals',
    'Indirect Channel',
    'Business Centers',
    'Retail & Technology Accounts'
  ],
  'Key Account': [
    'All Verticals',
    'Key Government Accounts',
    'Key Financial Accounts',
    'Key Energy Accounts',
    'Government & Financial Accounts'
  ],
  'Dhofar': [
    'All Verticals',
    'Dhofar',
    'Dhofar-Retail',
    'Healthcare Education & Hospitality Accounts'
  ],
  'Closed AC': [
    'All Verticals',
    'Closed AC',
    'Services'
  ],
  'SME Business': [
    'All Verticals',
    'Retail & Technology Accounts',
    'Business Centers',
    'Indirect Channel',
    'Dhofar-Retail',
    'Services',
    'Medium Segment',
    'Healthcare Education & Hospitality Accounts'
  ]
};

interface ServiceDetailsPageProps {
  serviceName: string;
  serviceColor: string;
  userRole: string;
  comparisonMode?: boolean;
  comparisonYear?: string;
  year?: string;
  onBack: () => void;
  onSegmentVerticalChange?: (segment: string, vertical: string) => void;
}

export function ServiceDetailsPage({
  serviceName,
  serviceColor,
  userRole,
  comparisonMode = false,
  comparisonYear = '2023',
  year = '2024',
  onBack,
  onSegmentVerticalChange
}: ServiceDetailsPageProps) {
  const [selectedSegment, setSelectedSegment] = useState('All');
  const [selectedVertical, setSelectedVertical] = useState('All Verticals');
  const [expandedSubProducts, setExpandedSubProducts] = useState(true);

  // Get verticals for the currently selected segment
  const currentVerticals = useMemo(() => {
    return SEGMENT_VERTICALS[selectedSegment] || SEGMENT_VERTICALS['All'];
  }, [selectedSegment]);

  // Reset vertical to "All Verticals" when segment changes if current vertical is not available
  useEffect(() => {
    if (!currentVerticals.includes(selectedVertical)) {
      setSelectedVertical('All Verticals');
    }
  }, [currentVerticals, selectedVertical]);

  // Notify parent of segment/vertical changes
  useEffect(() => {
    if (onSegmentVerticalChange) {
      onSegmentVerticalChange(selectedSegment, selectedVertical);
    }
  }, [selectedSegment, selectedVertical, onSegmentVerticalChange]);

  // Service icon mapping
  const getServiceIcon = () => {
    switch (serviceName) {
      case 'Fixed': return Wifi;
      case 'Mobile': return Smartphone;
      case 'ICT': return Server;
      case 'SMS': return MessageSquare;
      case 'Connectivity': return Network;
      default: return Server;
    }
  };

  const ServiceIcon = getServiceIcon();

  // Get segments based on role
  const getSegments = () => {
    const allSegments = [
      'All',
      'Micro-Retail',
      'Large Business',
      'Medium Business',
      'Medium Services',
      'BMB',
      'Indirect-Small',
      'Key Account',
      'Dhofar',
      'Closed AC'
    ];

    if (userRole === 'General Manager') return allSegments;
    if (userRole === 'Senior Manager') return allSegments.slice(0, 5); // Sample restriction
    if (userRole === 'Vertical Manager') return ['All'];
    return ['All'];
  };

  // Color configuration
  const getColorConfig = (color: string) => {
    const configs: Record<string, any> = {
      blue: {
        solid: '#3b82f6',
        light: '#93c5fd',
        bg: 'bg-blue-50',
        darkBg: 'dark:bg-blue-900/20',
        text: 'text-blue-700 dark:text-blue-400',
        border: 'border-blue-200 dark:border-blue-800/30'
      },
      purple: {
        solid: '#a855f7',
        light: '#c084fc',
        bg: 'bg-purple-50',
        darkBg: 'dark:bg-purple-900/20',
        text: 'text-purple-700 dark:text-purple-400',
        border: 'border-purple-200 dark:border-purple-800/30'
      },
      indigo: {
        solid: '#6366f1',
        light: '#a5b4fc',
        bg: 'bg-indigo-50',
        darkBg: 'dark:bg-indigo-900/20',
        text: 'text-indigo-700 dark:text-indigo-400',
        border: 'border-indigo-200 dark:border-indigo-800/30'
      },
      emerald: {
        solid: '#10b981',
        light: '#6ee7b7',
        bg: 'bg-emerald-50',
        darkBg: 'dark:bg-emerald-900/20',
        text: 'text-emerald-700 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-800/30'
      },
      orange: {
        solid: '#f97316',
        light: '#fdba74',
        bg: 'bg-orange-50',
        darkBg: 'dark:bg-orange-900/20',
        text: 'text-orange-700 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800/30'
      }
    };
    return configs[color] || configs.blue;
  };

  const colors = getColorConfig(serviceColor);

  // Sample data
  const kpiData = {
    totalRevenue: { current: 15600000, previous: 14800000 },
    subscribers: { current: 8543, previous: 7900 },
    arpu: { current: 182.5, previous: 187.3 },
    yoyGrowth: { value: 5.4 },
    newSubscribers: { current: 643, previous: 521 },
    churnedSubscribers: { current: 187, previous: 243 },
    churnRate: { current: 2.2, previous: 3.1 }
  };

  const monthlyData = [
    { month: 'Jan', revenue: 1250, prevRevenue: 1180, arpu: 175, prevArpu: 172, subscribers: 7143, prevSubscribers: 6800 },
    { month: 'Feb', revenue: 1180, prevRevenue: 1150, arpu: 178, prevArpu: 174, subscribers: 7321, prevSubscribers: 6950 },
    { month: 'Mar', revenue: 1350, prevRevenue: 1220, arpu: 182, prevArpu: 176, subscribers: 7412, prevSubscribers: 7100 },
    { month: 'Apr', revenue: 1420, prevRevenue: 1310, arpu: 180, prevArpu: 178, subscribers: 7654, prevSubscribers: 7250 },
    { month: 'May', revenue: 1290, prevRevenue: 1240, arpu: 179, prevArpu: 177, subscribers: 7789, prevSubscribers: 7400 },
    { month: 'Jun', revenue: 1480, prevRevenue: 1390, arpu: 185, prevArpu: 180, subscribers: 7998, prevSubscribers: 7550 },
    { month: 'Jul', revenue: 1390, prevRevenue: 1330, arpu: 183, prevArpu: 181, subscribers: 8123, prevSubscribers: 7700 },
    { month: 'Aug', revenue: 1550, prevRevenue: 1460, arpu: 188, prevArpu: 184, subscribers: 8234, prevSubscribers: 7800 },
    { month: 'Sep', revenue: 1490, prevRevenue: 1410, arpu: 186, prevArpu: 182, subscribers: 8412, prevSubscribers: 7850 },
    { month: 'Oct', revenue: 1420, prevRevenue: 1350, arpu: 184, prevArpu: 183, subscribers: 8543, prevSubscribers: 7900 }
  ];

  const subProducts = [
    { name: 'FBBILL-100', revenue: 450, ytd: 4500, subscribers: 2341, arpu: 192.1, growth: 8.3 },
    { name: 'FBBILL-200', revenue: 380, ytd: 3800, subscribers: 1987, arpu: 191.2, growth: 5.7 },
    { name: 'FBBILL-500', revenue: 320, ytd: 3200, subscribers: 1654, arpu: 193.4, growth: 12.4 },
    { name: 'FBBILL-1000', revenue: 280, ytd: 2800, subscribers: 1432, arpu: 195.5, growth: 6.8 },
    { name: 'FBBILL-PREMIUM', revenue: 210, ytd: 2100, subscribers: 1129, arpu: 186.0, growth: -2.3 }
  ];

  const formatCurrency = (value: number) => {
    return `${(value / 1000000).toFixed(1)}M OMR`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header (Service Name) */}
      <div data-section="header" className="space-y-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#07112F] border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-[#0a1425] transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Back</span>
          </button>
        </div>
      </div>

      {/* 2. Service Overview (KPI Cards with Sparklines) */}
      <div data-section="overview-cards" className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Revenue Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="group relative bg-[rgba(239,246,255,0.5)] dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-[rgba(190,219,255,0.5)] dark:border-white/[0.08] hover:border-blue-300/60 dark:hover:border-blue-500/40 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col gap-[11px] relative z-10">
            {/* Icon */}
            <div className="size-[31.5px] shrink-0 bg-blue-100 dark:bg-blue-500/10 rounded-[8.75px] flex items-center justify-center">
              <DollarSign className="w-[14px] h-[14px] text-blue-600 dark:text-blue-400" />
            </div>
            
            <div className="flex gap-[11px] items-start">
              {/* Left Column - Total Revenue */}
              <div className="flex-1 flex flex-col gap-[7px]">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">TOTAL REVENUE YTD</p>
                <div className="flex flex-col gap-[1.75px]">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                    {formatCurrency(kpiData.totalRevenue.current)}
                  </p>
                  {comparisonMode && (
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">
                      Prev: {formatCurrency(kpiData.totalRevenue.previous)}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Right Column - YoY Growth (Only visible in comparison mode) */}
              {comparisonMode && (
                <div className="flex-1 flex flex-col gap-[7px]">
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">YOY GROWTH</p>
                  <div className="flex flex-col gap-[1.75px]">
                    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md w-fit text-[10px] font-bold border ${
                      kpiData.yoyGrowth.value >= 0 
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30' 
                        : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800/30'
                    }`}>
                      {kpiData.yoyGrowth.value >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(kpiData.yoyGrowth.value)}%
                    </div>
                    <p className={`text-[10px] leading-[15px] ${kpiData.totalRevenue.current >= kpiData.totalRevenue.previous ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {kpiData.totalRevenue.current >= kpiData.totalRevenue.previous ? '+' : ''}
                      {formatCurrency(kpiData.totalRevenue.current - kpiData.totalRevenue.previous)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="h-[80px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 5, bottom: 0, left: 0, right: 0 }}>
                <defs>
                  <linearGradient id="gradientRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900/95 backdrop-blur border border-slate-700/50 p-2 rounded-lg shadow-xl min-w-[100px]">
                          <p className="text-[10px] text-slate-400 font-medium mb-1">{data.month}</p>
                          <div className="flex flex-col gap-0.5">
                            <div className="flex justify-between items-center gap-3">
                              <span className="text-[10px] text-blue-400 font-medium">Curr</span>
                              <span className="text-xs font-bold text-white">{formatCurrency(data.revenue)}</span>
                            </div>
                            {comparisonMode && data.prevRevenue !== undefined && (
                              <div className="flex justify-between items-center gap-3">
                                <span className="text-[10px] text-slate-500 font-medium">Prev</span>
                                <span className="text-xs font-medium text-slate-400">{formatCurrency(data.prevRevenue)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {comparisonMode && (
                  <Area 
                    type="monotone" 
                    dataKey="prevRevenue" 
                    stroke="#94a3b8" 
                    strokeWidth={2}
                    strokeDasharray="4 4" 
                    fill="transparent"
                  />
                )}
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  fill="url(#gradientRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Subscribers Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="group relative bg-purple-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-purple-200/50 dark:border-white/[0.08] hover:border-purple-300/60 dark:hover:border-purple-500/40 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col gap-[11px] relative z-10">
            {/* Icon */}
            <div className="size-[31.5px] shrink-0 bg-purple-100 dark:bg-purple-500/10 rounded-[8.75px] flex items-center justify-center">
              <Users className="w-[14px] h-[14px] text-purple-600 dark:text-purple-400" />
            </div>
            
            <div className="flex gap-[11px] items-start">
              {/* Left Column - Active Subscribers */}
              <div className="flex-1 flex flex-col gap-[7px]">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">ACTIVE SUBSCRIBERS</p>
                <div className="flex flex-col gap-[1.75px]">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                    {formatNumber(kpiData.subscribers.current)}
                  </p>
                  {comparisonMode && (
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">
                      Prev: {formatNumber(kpiData.subscribers.previous)}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Right Column - Changes based on mode */}
              <div className="flex-1 flex flex-col gap-[7px]">
                {comparisonMode ? (
                  <>
                    <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">YOY GROWTH</p>
                    <div className="flex flex-col gap-[1.75px]">
                      {(() => {
                        const diff = kpiData.subscribers.current - kpiData.subscribers.previous;
                        const pct = (diff / kpiData.subscribers.previous) * 100;
                        const isPositive = diff >= 0;
                        return (
                          <>
                            <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md w-fit text-[10px] font-bold border ${
                              isPositive
                                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30' 
                                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800/30'
                            }`}>
                              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {Math.abs(pct).toFixed(1)}%
                            </div>
                            <p className={`text-[10px] leading-[15px] ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                              {isPositive ? '+' : ''}{formatNumber(diff)}
                            </p>
                          </>
                        );
                      })()}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-[0.5px] leading-[15px]">SUBSCRIBER FLOW</p>
                    <div className="flex flex-col gap-[1.75px]">
                      <div className="flex items-center gap-[4px]">
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 leading-tight">+{kpiData.newSubscribers.current}</span>
                        <div className="h-[14px] w-0 flex items-center justify-center">
                          <div className="rotate-90">
                            <div className="h-0 w-[14px] border-t border-gray-300 dark:border-gray-600"></div>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-red-600 dark:text-red-400 leading-tight">-{kpiData.churnedSubscribers.current}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">
                        New vs Churned
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="h-[80px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 5, bottom: 0, left: 0, right: 0 }}>
                <defs>
                  <linearGradient id="gradientSubs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  cursor={{ stroke: '#a855f7', strokeWidth: 1, strokeDasharray: '4 4' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900/95 backdrop-blur border border-slate-700/50 p-2 rounded-lg shadow-xl min-w-[100px]">
                          <p className="text-[10px] text-slate-400 font-medium mb-1">{data.month}</p>
                          <div className="flex flex-col gap-0.5">
                            <div className="flex justify-between items-center gap-3">
                              <span className="text-[10px] text-purple-400 font-medium">Curr</span>
                              <span className="text-xs font-bold text-white">{formatNumber(data.subscribers)}</span>
                            </div>
                            {comparisonMode && data.prevSubscribers !== undefined && (
                              <div className="flex justify-between items-center gap-3">
                                <span className="text-[10px] text-slate-500 font-medium">Prev</span>
                                <span className="text-xs font-medium text-slate-400">{formatNumber(data.prevSubscribers)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {comparisonMode && (
                  <Area 
                    type="monotone" 
                    dataKey="prevSubscribers" 
                    stroke="#94a3b8" 
                    strokeWidth={2}
                    strokeDasharray="4 4" 
                    fill="transparent"
                  />
                )}
                <Area 
                  type="monotone" 
                  dataKey="subscribers" 
                  stroke="#a855f7" 
                  strokeWidth={2} 
                  fill="url(#gradientSubs)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ARPU Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="group relative bg-[#f6fefa] dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-[rgba(164,244,207,0.5)] dark:border-white/[0.08] hover:border-emerald-300/60 dark:hover:border-emerald-500/40 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col gap-[11px] relative z-10">
            {/* Icon */}
            <div className="size-[31.5px] shrink-0 bg-[#d0fae5] dark:bg-emerald-500/10 rounded-[8.75px] flex items-center justify-center">
              <Activity className="w-[14px] h-[14px] text-emerald-600 dark:text-emerald-400" />
            </div>
            
            <div className="flex gap-[11px] items-start">
              {/* Left Column - ARPU */}
              <div className="flex-1 flex flex-col gap-[7px]">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">ARPU</p>
                <div className="flex flex-col gap-[1.75px]">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                    {kpiData.arpu.current.toFixed(1)} OMR
                  </p>
                  {comparisonMode && (
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">
                      Prev: {kpiData.arpu.previous.toFixed(1)} OMR
                    </p>
                  )}
                </div>
              </div>
              
              {/* Right Column - Variance (Only visible in comparison mode) */}
              {comparisonMode && (
                <div className="flex-1 flex flex-col gap-[7px]">
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">YOY GROWTH</p>
                  <div className="flex flex-col gap-[1.75px]">
                    {(() => {
                      const diff = kpiData.arpu.current - kpiData.arpu.previous;
                      const pct = (diff / kpiData.arpu.previous) * 100;
                      const isPositive = diff >= 0;
                      return (
                        <>
                          <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md w-fit text-[10px] font-bold border ${
                            isPositive
                              ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30' 
                              : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800/30'
                          }`}>
                            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {Math.abs(pct).toFixed(1)}%
                          </div>
                          <p className={`text-[10px] leading-[15px] ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                            {isPositive ? '+' : ''}{diff.toFixed(1)} OMR
                          </p>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="h-[80px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 5, bottom: 0, left: 0, right: 0 }}>
                <defs>
                  <linearGradient id="gradientArpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '4 4' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900/95 backdrop-blur border border-slate-700/50 p-2 rounded-lg shadow-xl min-w-[100px]">
                          <p className="text-[10px] text-slate-400 font-medium mb-1">{data.month}</p>
                          <div className="flex flex-col gap-0.5">
                            <div className="flex justify-between items-center gap-3">
                              <span className="text-[10px] text-emerald-400 font-medium">Curr</span>
                              <span className="text-xs font-bold text-white">{data.arpu.toFixed(1)} OMR</span>
                            </div>
                            {comparisonMode && data.prevArpu !== undefined && (
                              <div className="flex justify-between items-center gap-3">
                                <span className="text-[10px] text-slate-500 font-medium">Prev</span>
                                <span className="text-xs font-medium text-slate-400">{data.prevArpu.toFixed(1)} OMR</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {comparisonMode && (
                  <Area 
                    type="monotone" 
                    dataKey="prevArpu" 
                    stroke="#94a3b8" 
                    strokeWidth={2}
                    strokeDasharray="4 4" 
                    fill="transparent"
                  />
                )}
                <Area 
                  type="monotone" 
                  dataKey="arpu" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  fill="url(#gradientArpu)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* 3. Monthly Revenue Trend Chart */}
      <div data-section="revenue-trend">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white dark:bg-[#07112F] rounded-xl p-4 sm:p-6 border border-[#E2E8F0] dark:border-[#E2E8F0]/20"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
              Monthly Revenue Trend
            </h3>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6 mb-4 sm:mb-6">
            <div className="flex-1 flex flex-col gap-1.5 bg-gradient-to-br from-gray-50/80 to-gray-100/40 dark:from-gray-800/30 dark:to-gray-800/10 rounded-lg p-2.5 sm:p-3 border border-gray-200/60 dark:border-gray-700/30">
                <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                Revenue
                </p>
                <p className="text-xs sm:text-[14px] font-semibold text-gray-900 dark:text-white leading-tight whitespace-nowrap">
                {formatCurrency(kpiData.totalRevenue.current)}
                </p>
            </div>
            
            <div className="flex-1 flex flex-col gap-1.5 bg-gradient-to-br from-gray-50/80 to-gray-100/40 dark:from-gray-800/30 dark:to-gray-800/10 rounded-lg p-2.5 sm:p-3 border border-gray-200/60 dark:border-gray-700/30">
                <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                Target
                </p>
                <p className="text-xs sm:text-[14px] font-semibold text-gray-900 dark:text-white leading-tight whitespace-nowrap">
                {formatCurrency(kpiData.totalRevenue.current * 1.05)}
                </p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              YoY Growth
            </span>
            <div className="flex items-center gap-1.5">
              {kpiData.yoyGrowth.value >= 0 ? (
                <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500" />
              ) : (
                <TrendingDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
              )}
              <span className={`text-xs font-bold ${kpiData.yoyGrowth.value >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                {kpiData.yoyGrowth.value >= 0 ? '+' : ''}{kpiData.yoyGrowth.value}%
              </span>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            {(() => {
              const maxValue = Math.max(
                ...monthlyData.map(d => Math.max(d.revenue, comparisonMode ? d.prevRevenue : 0))
              );
              
              // Helper function to create a lighter version of a color
              const lightenColor = (hex: string, percent: number = 40) => {
                const num = parseInt(hex.replace('#', ''), 16);
                const r = Math.min(255, ((num >> 16) + Math.round((255 - (num >> 16)) * percent / 100)));
                const g = Math.min(255, (((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * percent / 100)));
                const b = Math.min(255, ((num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * percent / 100)));
                return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
              };
              
              return (
                <>
                  <div className="relative w-full overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex items-end justify-between gap-1 sm:gap-2 bg-gray-50/50 dark:bg-gray-800/20 rounded-lg pt-9 pb-2 px-1 sm:px-2 border border-gray-200 dark:border-gray-700/30 h-[250px] sm:h-[320px] min-w-[320px] sm:min-w-0">
                      {monthlyData.map((monthData, monthIndex) => {
                        const revenueHeight = Math.max((monthData.revenue / maxValue) * 100, 8);
                        const prevRevenueHeight = comparisonMode ? Math.max((monthData.prevRevenue / maxValue) * 100, 8) : 0;
                        
                        // Calculate YoY growth for comparison mode
                        const yoyGrowth = comparisonMode && monthData.prevRevenue > 0 
                          ? (((monthData.revenue - monthData.prevRevenue) / monthData.prevRevenue) * 100).toFixed(1) 
                          : '0.0';
                        const isYoyPositive = parseFloat(yoyGrowth) >= 0;
                        
                        return (
                          <div key={monthIndex} className="flex-1 flex flex-col items-center gap-1 sm:gap-1.5 group/month relative h-full justify-end hover:z-50 min-w-[20px] sm:min-w-0">
                            {/* YoY Growth Indicator - Inside container above bars in comparison mode */}
                            {comparisonMode && (
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
                                    <TrendingDown className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-red-600 dark:text-red-400" />
                                  )}
                                  <span className={`font-['Roboto',sans-serif] font-bold text-[7px] sm:text-[8px] whitespace-nowrap ${
                                    isYoyPositive 
                                      ? 'text-emerald-700 dark:text-emerald-400' 
                                      : 'text-red-700 dark:text-red-400'
                                  }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                                    {isYoyPositive ? '+' : ''}{yoyGrowth}%
                                  </span>
                                </div>
                              </motion.div>
                            )}
                            
                            <div className="w-full relative flex items-end justify-center gap-0.5 h-full">
                              
                              {comparisonMode && (
                                <div className="relative flex-1 flex items-end h-full group/comp z-30">
                                  <motion.div
                                    className="relative w-full rounded-t-[2px] sm:rounded-t-[4px] transition-all duration-200 min-h-[8px] sm:min-h-[12px] flex items-end justify-center pb-0.5 sm:pb-1 cursor-pointer hover:brightness-110"
                                    style={{ 
                                      height: `${prevRevenueHeight}%`,
                                      backgroundColor: lightenColor(colors.solid, 40)
                                    }}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${prevRevenueHeight}%` }}
                                    transition={{ duration: 0.6, delay: monthIndex * 0.05 }}
                                  >
                                    {/* Value label inside bar - hidden if too small */}
                                    {prevRevenueHeight > 15 && (
                                      <span className="hidden sm:block text-[8px] sm:text-[10px] font-bold text-white whitespace-nowrap mb-0.5 sm:mb-1">
                                        {monthData.prevRevenue}M
                                      </span>
                                    )}
                                    
                                    {/* Tooltip for comparison bar */}
                                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover/comp:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                      <div className="bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg shadow-xl border border-gray-700 dark:border-gray-600 whitespace-nowrap">
                                        <div className="text-[10px] font-semibold mb-0.5">{monthData.month} {comparisonYear}</div>
                                        <div className="text-xs font-bold">{monthData.prevRevenue}K OMR</div>
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 border-r border-b border-gray-700 dark:border-gray-600 rotate-45" />
                                      </div>
                                    </div>
                                  </motion.div>
                                </div>
                              )}

                              <div className="relative flex-1 flex items-end h-full group/main z-30">
                                <motion.div
                                  className="relative w-full rounded-t-[2px] sm:rounded-t-[4px] transition-all duration-200 min-h-[8px] sm:min-h-[12px] flex items-end justify-center pb-0.5 sm:pb-1 cursor-pointer hover:brightness-110"
                                  style={{ 
                                    height: `${revenueHeight}%`,
                                    backgroundColor: colors.solid
                                  }}
                                  initial={{ height: 0 }}
                                  animate={{ height: `${revenueHeight}%` }}
                                  transition={{ duration: 0.6, delay: monthIndex * 0.05 + 0.1 }}
                                >
                                  {/* Value label inside bar */}
                                  {revenueHeight > 15 && (
                                    <span className="hidden sm:block text-[8px] sm:text-[10px] font-bold text-white whitespace-nowrap mb-0.5 sm:mb-1">
                                      {monthData.revenue}M
                                    </span>
                                  )}
                                  
                                  {/* Tooltip for main bar */}
                                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover/main:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                    <div className="bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg shadow-xl border border-gray-700 dark:border-gray-600 whitespace-nowrap">
                                      <div className="text-[10px] font-semibold mb-0.5">{monthData.month} {year}</div>
                                      <div className="text-xs font-bold">{monthData.revenue}K OMR</div>
                                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 border-r border-b border-gray-700 dark:border-gray-600 rotate-45" />
                                    </div>
                                  </div>
                                </motion.div>
                              </div>

                            </div>
                            
                            {/* Baseline */}
                            <div className="w-full h-[1px] sm:h-[2px] bg-gray-300 dark:bg-gray-600/50 rounded-full" />
                            
                            {/* Month Label */}
                            <span className="text-[8px] sm:text-[9px] font-medium text-gray-500 dark:text-gray-400">
                              {monthData.month}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="flex items-center justify-center gap-3 pt-1 text-[9px] sm:text-[10px] text-gray-600 dark:text-gray-400">
                    {comparisonMode && (
                      <div className="flex items-center gap-1.5">
                        <div 
                          className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm" 
                          style={{ 
                            backgroundColor: lightenColor(colors.solid, 40)
                          }} 
                        />
                        <span>{comparisonYear} Revenue</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm" style={{ backgroundColor: colors.solid }} />
                      <span>{year} Revenue</span>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </motion.div>
      </div>

      {/* 4. Products Grid (No Tables!) */}
      <div data-section="products-grid">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Product Performance
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {subProducts.map((product, index) => {
            // Calculate derived metrics to match Service Card UI
            const target = product.ytd * 1.1; // Simulated target
            const performance = Math.min(100, Math.round((product.ytd / target) * 100));
            const isYoyPositive = product.growth >= 0;
            
            // Generate mock monthly data for the product based on its current revenue
            // varying slightly to create a trend
            const productMonthlyData = Array.from({ length: 10 }, (_, i) => {
              const variance = 1 + (Math.random() * 0.4 - 0.2); // +/- 20%
              const value = (product.revenue * variance);
              return {
                month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][i],
                revenue: Math.round(value),
                prevRevenue: Math.round(value * (1 - (product.growth / 100))) // Derived previous year
              };
            });

            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 + 0.5 }}
                className={`group relative rounded-xl border transition-all duration-300 bg-white dark:bg-[#07112F] hover:shadow-md ${
                  index === -1 // Hack to keep consistent conditional styling structure if needed
                    ? `border-2 ${colors.border}` 
                    : 'border-gray-200 dark:border-gray-700/50 hover:border-blue-300/60 dark:hover:border-blue-400/60'
                }`}
              >
                <div className="p-6 space-y-5">
                  {/* Header */}
                  <div className="flex items-start gap-3 w-full">
                    <div className={`p-3 rounded-xl shrink-0 ${
                      [
                        'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
                        'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400',
                        'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                        'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
                        'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      ][index % 5]
                    }`}>
                       {/* Use generic icon or service icon */}
                      <Activity className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-base font-semibold text-gray-800 dark:text-gray-100 leading-tight tracking-tight truncate">
                          {['FBB', 'ILL', 'MPLS', 'SIP Trunking', 'Internet Leased Line'][index] || product.name}
                        </h4>
                        <div className="flex flex-col items-end bg-slate-100 dark:bg-slate-800/50 rounded-lg px-3 py-1.5 border border-slate-200 dark:border-slate-700/50">
                          <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Total Revenue YTD
                          </span>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">
                            {formatCurrency(product.ytd * 1000)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Revenue and Monthly Metrics (Styled as Gradient Blocks) */}


                  {/* Monthly Performance Trend */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        YoY Growth
                      </span>
                      <div className="flex items-center gap-1.5">
                        {isYoyPositive ? (
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                        )}
                        <span className={`text-xs font-bold ${isYoyPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                          {isYoyPositive ? '+' : ''}{product.growth.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    
                    {/* Vertical Bar Chart (Mini Version) */}
                    <div className="space-y-2">
                      {(() => {
                        const maxValue = Math.max(
                          ...productMonthlyData.map(d => Math.max(d.revenue, comparisonMode ? d.prevRevenue : 0))
                        );
                        
                        return (
                          <>
                            <div className="flex items-end justify-between gap-2 bg-gray-50/50 dark:bg-gray-800/20 rounded-lg pt-9 pb-2 px-2 border border-gray-200 dark:border-gray-700/30">
                              {productMonthlyData.map((monthData, monthIndex) => {
                                const revenueHeight = Math.max((monthData.revenue / maxValue) * 100, 8);
                                const prevRevenueHeight = comparisonMode ? Math.max((monthData.prevRevenue / maxValue) * 100, 8) : 0;
                                
                                // Helper to lighten color
                                const lightenColor = (hex: string, percent: number) => {
                                  const num = parseInt(hex.replace('#', ''), 16);
                                  const r = Math.min(255, ((num >> 16) + Math.round((255 - (num >> 16)) * percent / 100)));
                                  const g = Math.min(255, (((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * percent / 100)));
                                  const b = Math.min(255, ((num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * percent / 100)));
                                  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
                                };

                                // Calculate YoY
                                const yoyGrowth = comparisonMode && monthData.prevRevenue > 0 
                                  ? (((monthData.revenue - monthData.prevRevenue) / monthData.prevRevenue) * 100).toFixed(1) 
                                  : '0.0';
                                const isYoyPositive = parseFloat(yoyGrowth) >= 0;

                                return (
                                  <div key={monthIndex} className="flex-1 flex flex-col items-center gap-1.5 group/month relative hover:z-50">
                                    {/* YoY Growth Indicator */}
                                    {comparisonMode && (
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
                                                {monthData.prevRevenue}
                                              </span>
                                            )}
                                            
                                            <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover/comp:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                              <div className="bg-gray-900 dark:bg-gray-800 text-white px-2.5 py-1.5 rounded-lg shadow-xl border border-gray-700 dark:border-gray-600 whitespace-nowrap">
                                                <div className="text-[9px] font-medium text-gray-400 mb-0.5">{monthData.month} {comparisonYear}</div>
                                                <div className="text-[11px] font-bold">{monthData.prevRevenue}K OMR</div>
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
                                              {monthData.revenue}
                                            </span>
                                          )}
                                          
                                          <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover/main:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                            <div className="bg-gray-900 dark:bg-gray-800 text-white px-2.5 py-1.5 rounded-lg shadow-xl border border-gray-700 dark:border-gray-600 whitespace-nowrap">
                                              <div className="text-[9px] font-medium text-gray-400 mb-0.5">{monthData.month} {year}</div>
                                              <div className="text-[11px] font-bold">{monthData.revenue}K OMR</div>
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
                                      backgroundColor: (() => {
                                        const hex = colors.solid;
                                        const percent = 40;
                                        const num = parseInt(hex.replace('#', ''), 16);
                                        const r = Math.min(255, ((num >> 16) + Math.round((255 - (num >> 16)) * percent / 100)));
                                        const g = Math.min(255, (((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * percent / 100)));
                                        const b = Math.min(255, ((num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * percent / 100)));
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
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}