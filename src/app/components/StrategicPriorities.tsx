import React, { useState, useMemo, useEffect } from 'react';
import { 
  Target, 
  DollarSign,
  Server,
  BarChart3,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface StrategicPrioritiesProps {
  selectedTeamMember?: string;
  onAchievementChange?: (isAchieved: boolean, percentage: number) => void;
  period?: string;
  quarter?: string;
  userScope?: any;
  selectedVertical?: string | null;
  performanceLevel?: 'high' | 'low' | 'normal';
}

export function StrategicPriorities({ 
  selectedTeamMember, 
  onAchievementChange, 
  period = 'Quarterly', 
  quarter = 'Q3',
  performanceLevel = 'normal'
}: StrategicPrioritiesProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Generate seasonal variation for revenue values
  const generateSeasonalVariation = (base: number, period: string, quarter: string): number => {
    let seasonalMultiplier = 1;
    
    // Quarter-based variations
    switch (quarter) {
      case 'Q1':
        seasonalMultiplier = 0.88;
        break;
      case 'Q2':
        seasonalMultiplier = 0.93;
        break;
      case 'Q3':
        seasonalMultiplier = 1.0;
        break;
      case 'Q4':
        seasonalMultiplier = 1.12;
        break;
    }
    
    // Period-based variations
    if (period === 'Monthly') {
      seasonalMultiplier *= 0.35; // Monthly is roughly 1/3 of quarterly
    } else if (period === 'Yearly') {
      seasonalMultiplier *= 3.8; // Yearly is roughly 4x quarterly
    }
    
    // Add small random variation
    const randomVariation = 0.97 + (Math.random() * 0.06);
    
    return base * seasonalMultiplier * randomVariation;
  };

  // Helper: Parse OMR value string to number (handles K, M suffixes)
  const parseOMR = (value: string): number => {
    const cleaned = value.replace(/[^0-9.KM]/g, '');
    if (cleaned.includes('M')) {
      return parseFloat(cleaned.replace('M', '')) * 1000000;
    }
    if (cleaned.includes('K')) {
      return parseFloat(cleaned.replace('K', '')) * 1000;
    }
    return parseFloat(cleaned) || 0;
  };

  // Helper: Format OMR for tooltips
  const formatOMR = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M OMR`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K OMR`;
    }
    return `${value.toFixed(0)} OMR`;
  };

  // Strategic priorities revenue data - with seasonal variations
  const categories = useMemo(() => {
    // Base values for Q3 Quarterly view
    const invoiceQ1Base = 1800000; // 1.8M
    const invoiceQ2Base = 2100000; // 2.1M
    const ictQ1Base = 720000;      // 720K
    const ictQ2Base = 829000;      // 829K
    
    // Apply seasonal variations
    const invoiceQ1 = generateSeasonalVariation(invoiceQ1Base, period, quarter);
    const invoiceQ2 = generateSeasonalVariation(invoiceQ2Base, period, quarter);
    const ictQ1 = generateSeasonalVariation(ictQ1Base, period, quarter);
    const ictQ2 = generateSeasonalVariation(ictQ2Base, period, quarter);
    
    // Calculate QoQ changes
    const invoiceQoqChange = ((invoiceQ2 - invoiceQ1) / invoiceQ1) * 100;
    const ictQoqChange = ((ictQ2 - ictQ1) / ictQ1) * 100;
    
    // Calculate commissions (roughly 10% of Q2 revenue)
    const invoiceCommission = formatOMR(invoiceQ2 * 0.1);
    const ictCommission = formatOMR(ictQ2 * 0.1);
    
    return [
      {
        name: 'Rentals',
        icon: DollarSign,
        qoqChange: Math.round(invoiceQoqChange * 10) / 10,
        commission: invoiceCommission,
        q1Revenue: formatOMR(invoiceQ1),
        q2Revenue: formatOMR(invoiceQ2),
        color: 'text-emerald-600',
        darkColor: 'text-emerald-400',
        iconBg: 'bg-emerald-100/80',
        darkIconBg: 'bg-emerald-900/20',
      },
      {
        name: 'ICT',
        icon: Server,
        qoqChange: Math.round(ictQoqChange * 10) / 10,
        commission: ictCommission,
        q1Revenue: formatOMR(ictQ1),
        q2Revenue: formatOMR(ictQ2),
        color: 'text-red-600',
        darkColor: 'text-red-400',
        iconBg: 'bg-red-100/80',
        darkIconBg: 'bg-red-900/20',
      },
    ];
  }, [period, quarter]);

  // SP Logic: Simple Rule - (Invoice - ICT) Q2 > Q1 → Achieved
  const spLogic = useMemo(() => {
    const invoiceData = categories.find(c => c.name === 'Rentals');
    const ictData = categories.find(c => c.name === 'ICT');
    
    if (!invoiceData || !ictData) {
      return {
        q1Pass: false,
        q2Pass: false,
        spSuccess: false,
        spAchievement: 0,
        spStatus: 'Not Achieved',
        invoice_q1: 0,
        invoice_q2: 0,
        ict_q1: 0,
        ict_q2: 0,
        q1Delta: 0,
        q2Delta: 0,
        difference: 0,
        differenceDisplay: '0 OMR'
      };
    }
    
    // Parse all values
    const invoice_q1 = parseOMR(invoiceData.q1Revenue);
    const invoice_q2 = parseOMR(invoiceData.q2Revenue);
    const ict_q1 = parseOMR(ictData.q1Revenue);
    const ict_q2 = parseOMR(ictData.q2Revenue);
    
    // Calculate deltas (Invoice - ICT) for each quarter
    const q1Delta = invoice_q1 - ict_q1; // 1,080,000
    const q2Delta = invoice_q2 - ict_q2; // 1,271,000
    
    // Calculate difference (Q2 delta - Q1 delta)
    const difference = q2Delta - q1Delta; // 191,000
    
    // SP Rule: Achieved if Q2 delta > Q1 delta
    let spSuccess = q2Delta > q1Delta;
    let spAchievement = spSuccess ? 100 : 0;
    
    // Override based on performanceLevel if provided
    if (performanceLevel === 'high') {
      spSuccess = true;
      spAchievement = 100; // Binary: High performers achieve Strategic Priorities (100%)
    } else if (performanceLevel === 'low') {
      spSuccess = false;
      spAchievement = 0; // Binary: Low performers don't achieve Strategic Priorities (0%)
    }
    
    // Set both quarters as "achieved" if SP condition is met
    const q1Pass = spSuccess;
    const q2Pass = spSuccess;
    
    const spStatus = spSuccess ? 'Achieved' : 'Not Achieved';
    
    // Format difference for display
    const differenceDisplay = formatOMR(Math.abs(difference));
    
    return {
      q1Pass,
      q2Pass,
      spSuccess,
      spAchievement,
      spStatus,
      invoice_q1,
      invoice_q2,
      ict_q1,
      ict_q2,
      q1Delta,
      q2Delta,
      difference,
      differenceDisplay
    };
  }, [categories, performanceLevel]);

  // Notify parent component when achievement status changes
  useEffect(() => {
    if (onAchievementChange) {
      onAchievementChange(spLogic.spSuccess, spLogic.spAchievement);
    }
  }, [spLogic.spSuccess, spLogic.spAchievement, onAchievementChange]);

  // Calculate overall QoQ growth
  const overallQoQGrowth = Number((
    categories.reduce((acc, cat) => acc + cat.qoqChange, 0) / categories.length
  ).toFixed(1));

  // Sparkline data for Q1 vs Q2 comparison
  const sparklineData = [
    { name: 'Q1', invoice: 1.8, ict: 0.72 },
    { name: 'Q2', invoice: 2.1, ict: 0.829 }
  ];

  // Get service colors for consistent styling with Revenue Summary
  const getServiceColors = (serviceName: string) => {
    const normalized = serviceName.toLowerCase();
    if (normalized.includes('invoice')) {
      return {
        hoverBorder: 'border-emerald-400/60 dark:border-emerald-500/40',
        hoverGlow: 'shadow-emerald-500/20 dark:shadow-emerald-400/20',
        cardBg: 'bg-emerald-50/30 dark:bg-emerald-950/20',
      };
    }
    if (normalized.includes('ict')) {
      return {
        hoverBorder: 'border-red-400/60 dark:border-red-500/40',
        hoverGlow: 'shadow-red-500/20 dark:shadow-red-400/20',
        cardBg: 'bg-red-50/30 dark:bg-red-950/20',
      };
    }
    return {
      hoverBorder: 'border-gray-400/60 dark:border-gray-600/40',
      hoverGlow: 'shadow-gray-500/20 dark:shadow-gray-400/20',
      cardBg: 'bg-gray-50/30 dark:bg-gray-900/20',
    };
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col dark:border-gray-700/40 transition-colors duration-300 m-[0px]">
      <CardHeader className="pb-0 px-4 pt-3 flex-shrink-0">
        <CardTitle className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0 max-w-[60%]">
            <div className="p-1.5 bg-rose-50 dark:bg-rose-900/20 rounded-lg border border-rose-100 dark:border-rose-800/30 transition-colors duration-300 flex-shrink-0">
              <Target className="w-5 h-5 text-rose-600 dark:text-rose-400 transition-colors duration-300" />
            </div>
            <span className="widget-title overflow-hidden text-ellipsis whitespace-nowrap">Strategic Priorities</span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* SP Result Pill - Achieved/Not Achieved */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge 
                    className={`px-3 py-1 font-semibold transition-colors duration-300 cursor-help ${
                      spLogic.spSuccess
                        ? 'bg-[#DCFCE7] dark:bg-emerald-900/30 text-[#16A34A] dark:text-emerald-400 border-[#16A34A]/30 dark:border-emerald-600/40'
                        : 'bg-[#FEE2E2] dark:bg-red-900/30 text-[#F43F5E] dark:text-red-400 border-[#F43F5E]/30 dark:border-red-600/40'
                    }`}
                  >
                    {spLogic.spSuccess ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 inline" />
                        Achieved • {spLogic.spAchievement}%
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5 mr-1.5 inline" />
                        Not Achieved • {spLogic.spAchievement}%
                      </>
                    )}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs font-semibold mb-1">SP Rule:</p>
                  <p className="text-xs">Compute (Invoice − ICT) for Q1 and Q2.</p>
                  <p className="text-xs">If Q2 Δ &gt; Q1 Δ → Achieved (100%)</p>
                  <p className="text-xs">If Q1 Δ &gt; Q2 Δ → Not Achieved (0%)</p>
                  <p className="text-xs mt-1 text-gray-400">Difference: {spLogic.differenceDisplay}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-[0px] pt-[7px] pr-[14px] pl-[14px] -mt-3 flex flex-col">
        {/* Strategic Categories - Compact Layout */}
        <div className="flex-1 grid grid-cols-1 gap-1.5 auto-rows-fr mb-2.5">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            const isHovered = hoveredCategory === category.name;
            
            return (
              <motion.div
                key={index}
                className={`rounded-lg p-2.5 transition-all duration-300 ease-in-out bg-slate-50/80 dark:bg-slate-800/30 ${
                  isHovered 
                    ? 'border-2 border-blue-400/35 dark:border-blue-500/30 shadow-md shadow-blue-500/8 dark:shadow-blue-500/15' 
                    : 'border-2 border-slate-300/25 dark:border-slate-600/20 shadow-sm shadow-slate-500/3 dark:shadow-slate-700/5'
                } dark:shadow-sm dark:shadow-gray-900/20`}
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                role="listitem"
                aria-label={`${category.name}: ${category.qoqChange >= 0 ? 'growth' : 'decline'} of ${category.qoqChange}%`}
              >
                {/* Top Row: Icon + Service Name (Left) + Difference Badge (Right - Invoice Only) */}
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className={`p-1.5 rounded-lg transition-all duration-300 flex items-center justify-center ${
                        category.name === 'ICT'
                          ? 'bg-red-100/60 dark:bg-red-900/30 border border-red-200/50 dark:border-red-700/40'
                          : 'bg-green-100/60 dark:bg-green-900/30 border border-green-200/50 dark:border-green-700/40'
                      }`}
                    >
                      <IconComponent 
                        className={`w-4 h-4 transition-all duration-300 ${category.color} dark:${category.darkColor}`}
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300 text-sm">
                      {category.name}
                    </h4>
                  </div>
                  
                  {/* Difference Badge - Only for Rentals */}
                  {category.name === 'Rentals' && (
                    <Badge 
                      className={`px-2 py-0.5 text-[10px] font-semibold transition-colors duration-300 ${
                        spLogic.spSuccess
                          ? 'bg-[#DCFCE7] dark:bg-emerald-900/30 text-[#16A34A] dark:text-emerald-400 border-[#16A34A]/30 dark:border-emerald-600/40'
                          : 'bg-[#FEE2E2] dark:bg-red-900/30 text-[#F43F5E] dark:text-red-400 border-[#F43F5E]/30 dark:border-red-600/40'
                      }`}
                    >
                      {spLogic.difference >= 0 ? '+' : ''}{spLogic.differenceDisplay}
                    </Badge>
                  )}
                </div>
                
                {/* Visual Revenue Comparison */}
                <div className="space-y-2">
                  {/* Quarter Revenue Bars */}
                  <div className="space-y-1.5">
                    {/* Q1 Revenue Bar */}
                    <div className="relative">
                      <div className="flex items-center justify-between mb-1 px-0.5">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300 leading-tight transition-colors duration-300">Q1</span>
                        <span className="text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-200 leading-tight transition-colors duration-300">
                          {category.q1Revenue}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gray-400 dark:bg-gray-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '75%' }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                    
                    {/* Q2 Revenue Bar */}
                    <div className="relative">
                      <div className="flex items-center justify-between mb-1 px-0.5">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300 leading-tight transition-colors duration-300">Q2</span>
                        <span className={`text-sm font-semibold tracking-wide leading-tight transition-colors duration-300 ${category.color} dark:${category.darkColor}`}>
                          {category.q2Revenue}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full rounded-full transition-colors duration-300 ${
                            category.qoqChange >= 0 
                              ? 'bg-emerald-500 dark:bg-emerald-400' 
                              : 'bg-red-500 dark:bg-red-400'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ 
                            width: category.qoqChange >= 0 ? '85%' : '65%'
                          }}
                          transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                        />
                      </div>
                    </div>
                  </div>
                  

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quarter Summary Footer - Compact Single Line */}
        <div className="overflow-x-auto scrollbar-hide bg-gradient-to-r from-blue-50/80 to-indigo-50/60 dark:from-blue-900/20 dark:to-indigo-900/15 rounded-lg border-2 border-blue-200/60 dark:border-blue-500/30 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm py-3">
          <p className="text-xs text-gray-700 dark:text-gray-300 transition-colors duration-300 leading-relaxed text-center">
            <span className="font-medium">Total Q2 Growth Impact:</span> <span className={`font-semibold ${overallQoQGrowth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {overallQoQGrowth >= 0 ? '+' : ''}{overallQoQGrowth}%
            </span>
            <span className="mx-1.5 text-gray-400 dark:text-gray-500">•</span>
            <span className={`font-medium ${
              spLogic.spSuccess 
                ? 'text-[#16A34A] dark:text-emerald-400' 
                : 'text-[#F43F5E] dark:text-red-400'
            }`}>
              {spLogic.spSuccess 
                ? `SP condition achieved. Q2 delta increased vs Q1 by ${spLogic.differenceDisplay}.` 
                : `SP condition NOT achieved. Q2 delta decreased vs Q1 by ${spLogic.differenceDisplay}.`
              }
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}