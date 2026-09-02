import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BarChart3, Info, DollarSign, TrendingUp, Target, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface RevenueData {
  name: string;
  value: number;
  revenue: number;
  color: string;
  description: string;
  icon: React.ReactNode;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: RevenueData;
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-3 max-w-[280px] transition-colors duration-300">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <span className="font-semibold text-gray-900 dark:text-white text-sm transition-colors duration-300">
            {data.name}
          </span>
        </div>
        <div className="text-lg font-bold mb-1" style={{ color: data.color }}>
          {data.revenue}K OMR — {data.value}%
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
          {data.description}
        </p>
      </div>
    );
  }
  
  return null;
};

export function ImprovedScoreDistribution({
  selectedTeamMember,
  showCaretaker = false,
  period = 'Quarterly',
  quarter = 'Q3',
  year = '2024',
  revenuePct = 92.1,
  strategicPct = 85.8,
  cxPct = 78.2
}: {
  selectedTeamMember?: string;
  showCaretaker?: boolean;
  period?: string;
  quarter?: string;
  year?: string;
  revenuePct?: number;
  strategicPct?: number;
  cxPct?: number;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Generate seasonal variation
  const generateSeasonalVariation = (base: number): number => {
    let seasonalMultiplier = 1;
    
    switch (quarter) {
      case 'Q1':
        seasonalMultiplier = 0.88;
        break;
      case 'Q2':
        seasonalMultiplier = 0.94;
        break;
      case 'Q3':
        seasonalMultiplier = 1.0;
        break;
      case 'Q4':
        seasonalMultiplier = 1.10;
        break;
    }
    
    if (period === 'Monthly') {
      seasonalMultiplier *= 0.92;
    } else if (period === 'Yearly') {
      seasonalMultiplier *= 1.08;
    }
    
    const randomVariation = 0.98 + (Math.random() * 0.04);
    return base * seasonalMultiplier * randomVariation;
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use KPI Values passed from parent (MetricsCards) - ensures perfect synchronization
  const kpiValues = {
    strategic: strategicPct,      // Strategic Priorities KPI card value
    cx: cxPct,                    // CX/VOC KPI card value  
    revenue: revenuePct,          // Revenue Performance KPI card value
    overall: (revenuePct * 50 + strategicPct * 30 + cxPct * 20) / 100  // Overall Achievement using weighted formula (50/30/20)
  };

  // Calculate OMR amounts using EXACT same formulas as MetricsCards.tsx (lines 764-766)
  // This ensures perfect synchronization without prop-passing
  const strategicOMR = (kpiValues.strategic / 100) * 34000; // ~29.17K OMR
  const cxOMR = (kpiValues.cx / 100) * 38000; // ~29.72K OMR  
  const revenueOMR = (kpiValues.revenue / 100) * 97000; // ~89.37K OMR
  
  // Total commission = sum of all three KPI OMR values
  const totalCommissionOMR = strategicOMR + cxOMR + revenueOMR; // ~148.26K OMR

  // Format OMR helper function
  const formatOMR = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K OMR`;
    }
    return `${value.toFixed(0)} OMR`;
  };

  // Commission Distribution Data - Bound to KPI card calculations
  const data: RevenueData[] = [
    {
      name: 'Revenue Performance',
      value: kpiValues.revenue, // 92.1% achievement
      revenue: revenueOMR / 1000, // Convert to K for display (89.3)
      color: '#15B79E', // Green - updated to match spec
      description: 'Reflects the revenue contribution across commission categories',
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      name: 'Strategic Priorities',
      value: kpiValues.strategic, // 85.8% achievement
      revenue: strategicOMR / 1000, // Convert to K for display (29.2)
      color: '#7C4DFF', // Violet - updated to match spec
      description: 'Linked to strategic initiatives completion',
      icon: <Target className="w-4 h-4" />
    },
    {
      name: 'CX/VOC',
      value: kpiValues.cx, // 78.2% achievement
      revenue: cxOMR / 1000, // Convert to K for display (29.7)
      color: '#F43F87', // Pink - updated to match spec
      description: 'Tied to client satisfaction and experience metrics',
      icon: <Heart className="w-4 h-4" />
    }
  ];

  // Calculate total commission for verification
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 overflow-hidden dark:border-gray-700/40 transition-colors duration-300">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50/80 dark:bg-purple-900/25 rounded-lg border border-purple-200/70 dark:border-purple-700/50 hover:bg-purple-50 dark:hover:bg-purple-900/35 hover:border-[#EAE5FD] dark:hover:border-[#EAE5FD]/80 transition-colors duration-300">
              <DollarSign className="w-5 h-5 text-[#8B5CF6] dark:text-purple-400 transition-colors duration-300" />
            </div>
            <div>
              <CardTitle className="widget-title text-gray-900 dark:text-gray-100 transition-colors duration-300">Commission Distribution</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300">Commission breakdown by KPI area</p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Note about commission distribution */}
        <div className="mb-3 p-3 bg-green-50/50 dark:bg-green-900/20 rounded-lg border border-green-200/50 dark:border-green-700/30 flex-shrink-0 transition-colors duration-300">
          <p className="text-sm text-green-800 dark:text-green-200 transition-colors duration-300">
            <span className="font-medium">Note:</span> Values synced directly from KPI cards above - {(totalCommissionOMR / 1000).toFixed(1)}K OMR total commission.
          </p>
        </div>

        {/* Vertical Layout: Optimized Chart with Cards Below */}
        <div className="flex-1 flex flex-col gap-2 min-h-0 chart-section">
          {/* Top: Enlarged Donut Chart - Takes 50% of available space */}
          <div className="flex-[50] flex justify-center items-center min-h-[220px] mb-6">
            {/* Chart Container - Enlarged for better readability */}
            <div 
              ref={chartContainerRef}
              className="relative h-full w-full max-w-[300px] max-h-[300px] aspect-square flex-shrink-0 p-2 donut-chart"
              style={{
                margin: '0 auto',
                contain: 'layout style paint',
                isolation: 'isolate',
                willChange: 'auto',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
              }}
            >
              <div className="absolute inset-0">
                <ResponsiveContainer 
                  width="100%" 
                  height="100%"
                  debounceMs={50}
                >
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={screenWidth < 640 ? 45 : screenWidth < 1024 ? 55 : 65}
                      outerRadius={screenWidth < 640 ? 90 : screenWidth < 1024 ? 105 : 115}
                      paddingAngle={2}
                      dataKey="revenue"
                      onMouseEnter={onPieEnter}
                      onMouseLeave={onPieLeave}
                      animationBegin={0}
                      animationDuration={300}
                      isAnimationActive={true}
                    >
                      {data.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          stroke={activeIndex === index ? '#ffffff' : 'transparent'}
                          strokeWidth={activeIndex === index ? 2 : 0}
                          style={{
                            filter: activeIndex === index ? 'brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.1))' : 'brightness(1)',
                            cursor: 'default',
                            transition: 'all 0.2s ease-in-out'
                          }}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      content={<CustomTooltip />}
                      wrapperStyle={{ zIndex: 1000 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Center Label - Commission Total - Synced to KPI Cards */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center chart-center-text flex flex-col items-center justify-center" style={{ transform: 'translateY(-5%)' }}>
                  <div className="percentage text-[1.75rem] font-bold leading-[1.2] text-gray-900 dark:text-white transition-colors duration-300">{kpiValues.overall}%</div>
                  <div className="label text-[0.875rem] leading-[1.2] text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300">Total Commission</div>
                  <div className="value text-[1.25rem] font-semibold leading-[1.2] text-green-600 dark:text-green-400 mt-1 transition-colors duration-300">{(totalCommissionOMR / 1000).toFixed(1)}K OMR</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Commission Cards - Takes 50% of available space */}
          <div className="flex-[50] flex flex-col min-h-0 card-grid" style={{ marginTop: '24px' }}>
            {/* Commission Cards Grid - Full width equal layout */}
            <div className={`grid h-auto card-grid ${screenWidth < 640 ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-4'}`} style={{ display: 'grid', gridTemplateColumns: screenWidth < 640 ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
              {data.map((item, index) => {
                const isRevenue = item.name === 'Revenue Performance';
                const isStrategic = item.name === 'Strategic Priorities';
                const isCX = item.name === 'CX/VOC';
                
                const getBackgroundClasses = () => {
                  if (isRevenue) {
                    return activeIndex === index 
                      ? 'bg-green-50 dark:bg-green-900/40 shadow-green-100/50 dark:shadow-green-500/20' 
                      : 'bg-green-50/80 dark:bg-green-900/25 hover:bg-green-50 dark:hover:bg-green-900/35 hover:shadow-green-100/40 dark:hover:shadow-green-500/15';
                  } else if (isStrategic) {
                    return activeIndex === index 
                      ? 'bg-purple-50 dark:bg-purple-900/40 shadow-purple-100/50 dark:shadow-purple-500/20' 
                      : 'bg-purple-50/80 dark:bg-purple-900/25 hover:bg-purple-50 dark:hover:bg-purple-900/35 hover:shadow-purple-100/40 dark:hover:shadow-purple-500/15';
                  } else if (isCX) {
                    return activeIndex === index 
                      ? 'bg-pink-50 dark:bg-pink-900/40 shadow-pink-100/50 dark:shadow-pink-500/20' 
                      : 'bg-pink-50/80 dark:bg-pink-900/25 hover:bg-pink-50 dark:hover:bg-pink-900/35 hover:shadow-pink-100/40 dark:hover:shadow-pink-500/15';
                  }
                  return 'bg-white dark:bg-[#0F172A]';
                };

                const getBorderClasses = () => {
                  if (isRevenue) return 'border-green-200/70 dark:border-green-700/50 hover:border-[#CFF4EC] dark:hover:border-[#CFF4EC]/80';
                  if (isStrategic) return 'border-purple-200/70 dark:border-purple-700/50 hover:border-[#EAE5FD] dark:hover:border-[#EAE5FD]/80';
                  if (isCX) return 'border-pink-200/70 dark:border-pink-700/50 hover:border-[#FDE9F0] dark:hover:border-[#FDE9F0]/80';
                  return 'border-slate-200 dark:border-slate-700';
                };
                
                return (
                <div
                  key={`legend-${index}`}
                  className={`p-4 rounded-xl border-2 ${getBorderClasses()} ${getBackgroundClasses()} ${
                    activeIndex === index 
                      ? 'shadow-lg' 
                      : 'hover:shadow-md'
                  } transition-all duration-150 ease-in-out cursor-default kpi-card ${
                    isRevenue 
                      ? 'hover:shadow-green-200/30 dark:hover:shadow-green-500/20' 
                      : isStrategic 
                        ? 'hover:shadow-purple-200/30 dark:hover:shadow-purple-500/20'
                        : isCX 
                          ? 'hover:shadow-pink-200/30 dark:hover:shadow-pink-500/20'
                          : ''
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {/* Header with colored indicator and title */}
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-3 h-3 rounded transition-colors duration-300 flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <h4 className={`${screenWidth < 768 ? 'text-xs' : 'text-sm'} font-semibold text-gray-900 dark:text-white transition-colors duration-300 leading-tight`}>
                      {item.name === 'CX/VOC' ? 'Customer Satisfaction' : item.name}
                    </h4>
                  </div>
                  
                  {/* Commission amount */}
                  <div className="mb-2">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1 transition-colors duration-300">
                      Commission:
                    </div>
                    <div 
                      className={`${screenWidth < 768 ? 'text-sm' : 'text-base'} font-bold transition-colors duration-300 leading-none revenue`}
                      style={{ color: item.color }}
                    >
                      {item.revenue.toFixed(1)}K OMR
                    </div>
                  </div>
                  
                  {/* Share percentage */}
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1 transition-colors duration-300">
                      KPI Performance:
                    </div>
                    <div className={`${screenWidth < 768 ? 'text-xs' : 'text-sm'} font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300 leading-none share`} style={{ fontSize: '13px', color: '#4B5563' }}>
                      {item.value}% Achievement
                    </div>
                  </div>
                </div>
                );
              })}
            </div>

            {/* Commission Insights Panel - Enhanced Card Style - Updated with exact KPI values */}
            <div 
              className="p-5 bg-gradient-to-br from-blue-50/80 to-indigo-50/60 dark:from-blue-900/20 dark:to-indigo-900/15 rounded-xl border border-blue-200/50 dark:border-blue-500/20 shadow-sm hover:shadow-md flex-shrink-0 transition-all duration-300 commission-insights backdrop-blur-sm"
              style={{ 
                marginTop: '16px', 
                width: '100%'
              }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100/80 dark:bg-blue-800/40 rounded-lg border border-blue-200/50 dark:border-blue-600/30 flex-shrink-0 transition-colors duration-300">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-colors duration-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-base font-semibold text-blue-900 dark:text-blue-100 transition-colors duration-300">🧠 Commission Insights</h4>
                  </div>
                  <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed transition-colors duration-300">
                    Revenue Performance contributes {data[0].revenue.toFixed(1)}K OMR ({data[0].value}% achievement) of total commission. 
                    Strategic Priorities contributes {data[1].revenue.toFixed(1)}K OMR ({data[1].value}% achievement). 
                    CX/VOC contributes {data[2].revenue.toFixed(1)}K OMR ({data[2].value}% achievement).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}