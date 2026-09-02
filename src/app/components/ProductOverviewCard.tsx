import React from 'react';
import { TrendingUp, LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface MonthData {
  month: string;
  revenue: number;
  prevRevenue: number;
}

interface ProductOverviewCardProps {
  name: string;
  icon: LucideIcon;
  revenue: number;
  monthlyData: MonthData[];
  comparisonMode: boolean;
  color: string;
  index: number;
  formatCurrency: (value: number) => string;
  bgClass: string;
}

export function ProductOverviewCard({
  name,
  icon: Icon,
  revenue,
  monthlyData,
  comparisonMode,
  color,
  index,
  formatCurrency,
  bgClass
}: ProductOverviewCardProps) {
  const lightenColor = (hex: string, percent: number) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, ((num >> 16) + Math.round((255 - (num >> 16)) * percent / 100)));
    const g = Math.min(255, (((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * percent / 100)));
    const b = Math.min(255, ((num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * percent / 100)));
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  };

  const maxValue = Math.max(
    ...monthlyData.map(d => Math.max(d.revenue, comparisonMode ? d.prevRevenue : 0))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 + 0.5 }}
      className="group relative rounded-xl border transition-all duration-300 bg-white dark:bg-[#07112F] hover:shadow-md border-gray-200 dark:border-gray-700/50 hover:border-blue-300/60 dark:hover:border-blue-400/60"
    >
      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start gap-3 w-full">
          <div className={`p-3 rounded-xl shrink-0 ${bgClass}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-base font-semibold text-gray-800 dark:text-gray-100 leading-tight tracking-tight truncate">
                {name} Services
              </h4>
              <div className="flex flex-col items-end bg-slate-100 dark:bg-slate-800/50 rounded-lg px-3 py-1.5 border border-slate-200 dark:border-slate-700/50">
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Total Revenue YTD
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {formatCurrency(revenue)}
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
          
          {/* Vertical Bar Chart */}
          <div className="space-y-2">
            <>
              <div className="flex items-end justify-between gap-2 bg-gray-50/50 dark:bg-gray-800/20 rounded-lg pt-9 pb-2 px-2 border border-gray-200 dark:border-gray-700/30">
                {monthlyData.map((monthData, monthIndex) => {
                  const revenueHeight = Math.max((monthData.revenue / maxValue) * 100, 8);
                  const prevRevenueHeight = comparisonMode ? Math.max((monthData.prevRevenue / maxValue) * 100, 8) : 0;

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
                              <TrendingUp className="w-2 h-2 text-red-600 dark:text-red-400 rotate-180" />
                            )}
                            <span className={`font-['Roboto',sans-serif] font-bold text-[8px] whitespace-nowrap ${
                              isYoyPositive 
                                ? 'text-emerald-700 dark:text-emerald-400' 
                                : 'text-red-700 dark:text-red-400'
                            }`}>
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
                                backgroundColor: lightenColor(color, 40)
                              }}
                              initial={{ height: 0 }}
                              animate={{ height: `${prevRevenueHeight}%` }}
                              transition={{ duration: 0.6, delay: monthIndex * 0.05 }}
                            >
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
                              backgroundColor: color
                            }}
                            initial={{ height: 0 }}
                            animate={{ height: `${revenueHeight}%` }}
                            transition={{ duration: 0.6, delay: monthIndex * 0.05 + 0.1 }}
                          >
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
                      
                      {/* Month Label */}
                      <div className="text-[9px] font-medium text-gray-500 dark:text-gray-400">
                        {monthData.month}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Legend */}
              {comparisonMode && (
                <div className="flex items-center justify-center gap-3 pt-1 text-[10px] text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <div 
                      className="w-2.5 h-2.5 rounded-sm" 
                      style={{ 
                        backgroundColor: lightenColor(color, 40)
                      }} 
                    />
                    <span>2023 Revenue</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
                    <span>2024 Revenue</span>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
