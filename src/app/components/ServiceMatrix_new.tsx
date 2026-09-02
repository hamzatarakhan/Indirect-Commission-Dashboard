import React, { useState } from 'react';
import { Wifi, Smartphone, Server, MessageSquare, Network, MoreHorizontal, TrendingUp, TrendingDown, LayoutGrid, BarChart3, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { PercentageBadge } from './PerformanceTooltip';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

interface ServiceMatrixProps {
  userRole: string;
  comparisonMode?: boolean;
  comparisonYear?: string;
  year?: string;
}

export function ServiceMatrix({ userRole, comparisonMode = false, comparisonYear = '2023', year = '2024' }: ServiceMatrixProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'chart'>('cards');
  const [selectedServiceTab, setSelectedServiceTab] = useState<string>('All');

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
        { month: 'Jan', revenue: 1.2, target: 1.3, compRevenue: 1.1, compTarget: 1.2 },
        { month: 'Feb', revenue: 1.4, target: 1.4, compRevenue: 1.2, compTarget: 1.3 },
        { month: 'Mar', revenue: 1.1, target: 1.3, compRevenue: 1.0, compTarget: 1.2 },
        { month: 'Apr', revenue: 1.5, target: 1.4, compRevenue: 1.3, compTarget: 1.3 },
        { month: 'May', revenue: 1.3, target: 1.4, compRevenue: 1.2, compTarget: 1.3 },
        { month: 'Jun', revenue: 1.6, target: 1.5, compRevenue: 1.4, compTarget: 1.4 },
        { month: 'Jul', revenue: 1.4, target: 1.5, compRevenue: 1.3, compTarget: 1.4 },
        { month: 'Aug', revenue: 1.7, target: 1.6, compRevenue: 1.5, compTarget: 1.5 },
        { month: 'Sep', revenue: 1.8, target: 1.7, compRevenue: 1.6, compTarget: 1.6 },
        { month: 'Oct', revenue: 1.6, target: 1.6, compRevenue: 1.4, compTarget: 1.5 }
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
        { month: 'Jan', revenue: 1.0, target: 1.2, compRevenue: 0.9, compTarget: 1.1 },
        { month: 'Feb', revenue: 1.2, target: 1.2, compRevenue: 1.0, compTarget: 1.1 },
        { month: 'Mar', revenue: 0.9, target: 1.1, compRevenue: 0.8, compTarget: 1.0 },
        { month: 'Apr', revenue: 1.3, target: 1.3, compRevenue: 1.1, compTarget: 1.2 },
        { month: 'May', revenue: 1.1, target: 1.2, compRevenue: 1.0, compTarget: 1.1 },
        { month: 'Jun', revenue: 1.4, target: 1.4, compRevenue: 1.2, compTarget: 1.3 },
        { month: 'Jul', revenue: 1.2, target: 1.3, compRevenue: 1.1, compTarget: 1.2 },
        { month: 'Aug', revenue: 1.5, target: 1.5, compRevenue: 1.3, compTarget: 1.4 },
        { month: 'Sep', revenue: 1.4, target: 1.5, compRevenue: 1.2, compTarget: 1.4 },
        { month: 'Oct', revenue: 1.3, target: 1.4, compRevenue: 1.1, compTarget: 1.3 }
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
        { month: 'Jan', revenue: 0.8, target: 0.9, compRevenue: 0.7, compTarget: 0.8 },
        { month: 'Feb', revenue: 0.9, target: 0.9, compRevenue: 0.8, compTarget: 0.8 },
        { month: 'Mar', revenue: 0.7, target: 0.8, compRevenue: 0.6, compTarget: 0.7 },
        { month: 'Apr', revenue: 1.0, target: 1.0, compRevenue: 0.9, compTarget: 0.9 },
        { month: 'May', revenue: 0.9, target: 0.9, compRevenue: 0.8, compTarget: 0.8 },
        { month: 'Jun', revenue: 1.1, target: 1.0, compRevenue: 1.0, compTarget: 0.9 },
        { month: 'Jul', revenue: 1.0, target: 1.0, compRevenue: 0.9, compTarget: 0.9 },
        { month: 'Aug', revenue: 1.2, target: 1.1, compRevenue: 1.1, compTarget: 1.0 },
        { month: 'Sep', revenue: 1.3, target: 1.2, compRevenue: 1.2, compTarget: 1.1 },
        { month: 'Oct', revenue: 1.2, target: 1.1, compRevenue: 1.1, compTarget: 1.0 }
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
        { month: 'Jan', revenue: 0.3, target: 0.4, compRevenue: 0.28, compTarget: 0.38 },
        { month: 'Feb', revenue: 0.35, target: 0.42, compRevenue: 0.32, compTarget: 0.40 },
        { month: 'Mar', revenue: 0.28, target: 0.40, compRevenue: 0.26, compTarget: 0.38 },
        { month: 'Apr', revenue: 0.38, target: 0.45, compRevenue: 0.35, compTarget: 0.42 },
        { month: 'May', revenue: 0.32, target: 0.43, compRevenue: 0.30, compTarget: 0.40 },
        { month: 'Jun', revenue: 0.40, target: 0.48, compRevenue: 0.37, compTarget: 0.45 },
        { month: 'Jul', revenue: 0.36, target: 0.46, compRevenue: 0.33, compTarget: 0.43 },
        { month: 'Aug', revenue: 0.42, target: 0.50, compRevenue: 0.39, compTarget: 0.47 },
        { month: 'Sep', revenue: 0.39, target: 0.52, compRevenue: 0.36, compTarget: 0.49 },
        { month: 'Oct', revenue: 0.38, target: 0.50, compRevenue: 0.35, compTarget: 0.47 }
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
        { month: 'Jan', revenue: 0.18, target: 0.20, compRevenue: 0.16, compTarget: 0.19 },
        { month: 'Feb', revenue: 0.20, target: 0.21, compRevenue: 0.18, compTarget: 0.20 },
        { month: 'Mar', revenue: 0.16, target: 0.19, compRevenue: 0.15, compTarget: 0.18 },
        { month: 'Apr', revenue: 0.22, target: 0.23, compRevenue: 0.20, compTarget: 0.21 },
        { month: 'May', revenue: 0.19, target: 0.22, compRevenue: 0.17, compTarget: 0.20 },
        { month: 'Jun', revenue: 0.23, target: 0.24, compRevenue: 0.21, compTarget: 0.22 },
        { month: 'Jul', revenue: 0.21, target: 0.23, compRevenue: 0.19, compTarget: 0.21 },
        { month: 'Aug', revenue: 0.24, target: 0.25, compRevenue: 0.22, compTarget: 0.23 },
        { month: 'Sep', revenue: 0.25, target: 0.26, compRevenue: 0.23, compTarget: 0.24 },
        { month: 'Oct', revenue: 0.22, target: 0.25, compRevenue: 0.20, compTarget: 0.23 }
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
        gradientColors: { start: '#3b82f6', end: '#06b6d4' }
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
        gradientColors: { start: '#a855f7', end: '#ec4899' }
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
        gradientColors: { start: '#6366f1', end: '#a855f7' }
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
        gradientColors: { start: '#10b981', end: '#14b8a6' }
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
        gradientColors: { start: '#f97316', end: '#f59e0b' }
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
        <div className="flex items-center mb-6">
          <div className="flex items-center gap-2.5">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-[13px] sm:text-[15px] font-medium text-gray-900 dark:text-gray-100">
              {userRole === 'General Manager' ? 'Services' : 'My Services'}
            </h2>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
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
        </div>

        <div className="space-y-6" style={{ overflow: 'visible' }}>
          {viewMode === 'cards' && (
            <div 
              className={`grid gap-4 ${
                comparisonMode
                  ? 'grid-cols-1'
                  : selectedServiceTab === 'All' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
              }`} 
              style={{ overflow: 'visible' }}
            >
              {services
                .filter(service => selectedServiceTab === 'All' || service.name === selectedServiceTab)
                .map((service, index) => {
                const colors = getColorClasses(service.color);
                const Icon = service.icon;
                const isHovered = hoveredSegment === index;
                
                const getPerformanceColor = (score: number) => {
                  if (score >= 90) return {
                    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
                    text: 'text-emerald-700 dark:text-emerald-400',
                    label: 'Excellent',
                    barColor: '#34d399',
                    ringColor: 'ring-emerald-500/20'
                  };
                  if (score >= 75) return {
                    bg: 'bg-blue-50 dark:bg-blue-900/20',
                    text: 'text-blue-700 dark:text-blue-400',
                    label: 'Good',
                    barColor: '#60a5fa',
                    ringColor: 'ring-blue-500/20'
                  };
                  if (score >= 60) return {
                    bg: 'bg-amber-50 dark:bg-amber-900/20',
                    text: 'text-amber-700 dark:text-amber-400',
                    label: 'Fair',
                    barColor: '#fbbf24',
                    ringColor: 'ring-amber-500/20'
                  };
                  return {
                    bg: 'bg-red-50 dark:bg-red-900/20',
                    text: 'text-red-700 dark:text-red-400',
                    label: 'Needs Attention',
                    barColor: '#f87171',
                    ringColor: 'ring-red-500/20'
                  };
                };
                
                const performanceStatus = getPerformanceColor(service.performance);
                
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
                    className={`group relative rounded-xl border transition-all duration-300 cursor-pointer bg-white dark:bg-[#07112F] hover:shadow-lg ${
                      isHovered 
                        ? `border-2 ${colors.border}` 
                        : 'border-gray-200 dark:border-gray-700/50'
                    }`}
                    onClick={() => {
                      console.log(`Navigate to ${service.name} details page`);
                    }}
                  >
                    <div className="p-5 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`p-2.5 rounded-xl transition-all duration-300 ${colors.iconBg}`}>
                            <Icon className={`w-5 h-5 ${colors.icon}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                              {service.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              Service Revenue
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <div className={`flex items-center justify-center w-14 h-14 rounded-full ${performanceStatus.bg} ring-4 ${performanceStatus.ringColor}`}>
                            <span className={`font-bold text-lg ${performanceStatus.text}`}>
                              {service.performance}
                            </span>
                          </div>
                          <span className={`text-[10px] font-medium mt-1 ${performanceStatus.text}`}>
                            {performanceStatus.label}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Revenue
                          </p>
                          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            {formatCurrency(service.value)}
                          </p>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Target
                          </p>
                          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            {formatCurrency(service.target)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600 dark:text-gray-400">Target Achievement</span>
                          <span className={`font-semibold ${performanceStatus.text}`}>
                            {service.performance}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-800/50 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: performanceStatus.barColor }}
                            initial={{ width: 0 }}
                            animate={{ width: `${service.performance}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200 dark:border-gray-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            10-Month Trend
                          </span>
                          <div className="flex items-center gap-1">
                            {isYoyPositive ? (
                              <TrendingUp className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-red-500" />
                            )}
                            <span className={`text-xs font-semibold ${isYoyPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                              {isYoyPositive ? '+' : ''}{yoyChange.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="h-12">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={service.monthlyData}>
                              <Line 
                                type="monotone" 
                                dataKey="revenue" 
                                stroke={performanceStatus.barColor}
                                strokeWidth={2}
                                dot={false}
                                animationDuration={800}
                                animationBegin={index * 100}
                              />
                              {comparisonMode && (
                                <Line 
                                  type="monotone" 
                                  dataKey="compRevenue" 
                                  stroke="#93C5FD"
                                  strokeWidth={2}
                                  strokeDasharray="3 3"
                                  dot={false}
                                  animationDuration={800}
                                  animationBegin={index * 100}
                                />
                              )}
                              <Tooltip 
                                contentStyle={{
                                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                  border: '1px solid #e5e7eb',
                                  borderRadius: '8px',
                                  fontSize: '12px',
                                  padding: '8px'
                                }}
                                formatter={(value: any) => [`${value.toFixed(2)}M`, '']}
                                labelFormatter={(label, payload) => {
                                  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
                                  return months[label as number] || '';
                                }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {comparisonMode && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-3 border-t border-gray-200 dark:border-gray-700/50">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">
                                {year}
                              </p>
                              <p className="text-sm font-bold text-orange-600 dark:text-orange-400">
                                {currentYearTotal.toFixed(1)}M
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">
                                {comparisonYear}
                              </p>
                              <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                {previousYearTotal.toFixed(1)}M
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">
                                Change
                              </p>
                              <p className={`text-sm font-bold ${isYoyPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                                {isYoyPositive ? '+' : ''}{yoyChange.toFixed(1)}%
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div className="flex items-center justify-center gap-2 pt-2 text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <span>View Details</span>
                        <ExternalLink className="w-3 h-3" />
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
