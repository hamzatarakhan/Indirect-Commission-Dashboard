import React, { useState } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useAnimatedPercentage, useAnimatedCurrency } from '../hooks/useAnimatedCounter';
import { useDashboardData } from '../hooks/useDashboardData';
import { motion } from 'motion/react';

// Same helper functions as MetricsCards to ensure consistency
type PctLike = number | string | { value?: number | string };
type MoneyLike = number | string | { value?: number | string };

const toNum = (v: PctLike | MoneyLike): number => {
  const x = typeof v === "object" && v !== null ? (v as any).value : v;
  if (typeof x === "number") return x;
  if (typeof x === "string") return parseFloat(x.replace(/[^\d.-]/g, "")) || 0;
  return 0;
};

const FRACTION_INPUT = false;

const normalizePct = (v: PctLike): number => {
  const n = toNum(v);
  return FRACTION_INPUT ? n * 100 : n;
};

const formatPct = (n: number, digits = 1) => `${n.toFixed(digits)}%`;

// Caretaker Chip Component for Payout rows
function CaretakerChip({ value }: { value: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="inline-flex items-center px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-full border border-orange-200 dark:border-orange-700/50 cursor-help ml-2 text-xs font-medium"
          >
            {value}
          </motion.span>
        </TooltipTrigger>
        <TooltipContent>
          <p>This portion of the payout is earned as a caretaker for another role.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function PayoutCalculation({ 
  selectedTeamMember, 
  period = 'Quarterly', 
  quarter = 'Q3',
  showCaretaker = false
}: { 
  selectedTeamMember?: string; 
  period?: string; 
  quarter?: string; 
  showCaretaker?: boolean;
}) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const dashboardData = useDashboardData(period, quarter, selectedTeamMember);
  
  // Use the EXACT same values as the KPI cards at the top of the dashboard
  const strategicPct = normalizePct(85.8);
  const cxPct = normalizePct(78.2);
  const revenuePct = normalizePct(92.1);

  // Use the same weights as KPI cards (must total 100)
  const w = { strategic: 40, cx: 30, revenue: 30 };

  // Calculate overall percentage using the same formula as KPI cards
  const overallPct = (strategicPct * w.strategic + cxPct * w.cx + revenuePct * w.revenue) / 100;

  const basePayout = 1000;
  const calculatedPayout = basePayout * (overallPct / 100);
  
  // Caretaker contributions (example values - would come from data source)
  const caretakerContributions = showCaretaker ? {
    strategic: 600,
    cx: 400,
    revenue: 500,
  } : {
    strategic: 0,
    cx: 0,
    revenue: 0,
  };
  
  const totalCaretakerPayout = caretakerContributions.strategic + caretakerContributions.cx + caretakerContributions.revenue;
  const totalPayoutWithCaretaker = calculatedPayout + totalCaretakerPayout;
  
  // Animated counters
  const animatedTotal = useAnimatedPercentage(overallPct, { duration: 2200 });
  const animatedPayout = useAnimatedCurrency(showCaretaker ? totalPayoutWithCaretaker : calculatedPayout, { duration: 2500, prefix: '', suffix: ' OMR' });
  const animatedRevenue = useAnimatedPercentage(revenuePct, { duration: 1800 });
  const animatedCX = useAnimatedPercentage(cxPct, { duration: 2000 });
  const animatedStrategic = useAnimatedPercentage(strategicPct, { duration: 2100 });

  const categories = [
    {
      name: 'Revenue Performance',
      weight: 30, // Updated to match KPI card weights
      achievement: revenuePct,
      animatedValue: animatedRevenue.value,
      isAnimating: animatedRevenue.isAnimating,
      calculation: formatPct(revenuePct),
      weightedScore: revenuePct * 0.3, // Updated weight
      color: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      caretakerAmount: caretakerContributions.revenue
    },
    {
      name: 'Customer Experience',
      weight: 30,
      achievement: cxPct,
      animatedValue: animatedCX.value,
      isAnimating: animatedCX.isAnimating,
      calculation: formatPct(cxPct),
      weightedScore: cxPct * 0.3,
      color: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
      caretakerAmount: caretakerContributions.cx
    },
    {
      name: 'Strategic Priorities',
      weight: 40, // Updated to match KPI card weights
      achievement: strategicPct,
      animatedValue: animatedStrategic.value,
      isAnimating: animatedStrategic.isAnimating,
      calculation: formatPct(strategicPct),
      weightedScore: strategicPct * 0.4, // Updated weight
      color: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
      caretakerAmount: caretakerContributions.strategic
    }
  ];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      <CardHeader className="pb-0 pt-[21px] pr-[21px] pl-[21px]">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30 transition-colors duration-300">
            <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-colors duration-300" />
          </div>
          <span className="widget-title">Payout Calculation</span>
          <div className="ml-auto">
            <motion.span 
              className="text-xl font-bold text-green-600 dark:text-green-400"
              animate={animatedTotal.isAnimating ? {
                scale: [1, 1.05, 1],
                color: ["#16a34a", "#22c55e", "#16a34a"]
              } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {animatedTotal.value}
            </motion.span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 flex-1 flex flex-col pt-0">
        <div className="flex flex-col gap-3 flex-1">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              className={`w-full rounded-lg flex-1 flex items-center ${category.color}`}
              style={{ border: "1px solid transparent" }}
              initial={{ borderColor: "rgba(59, 130, 246, 0)" }}
              whileHover={{ 
                borderColor: "rgba(59, 130, 246, 0.2)",
                boxShadow: "0 0 0 1px rgba(59, 130, 246, 0.2), 0 8px 25px rgba(59, 130, 246, 0.1)",
                transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
              }}
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
              animate={category.isAnimating ? {
                scale: [0.98, 1, 0.98],
                borderColor: [undefined, '#3b82f6', undefined]
              } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="flex justify-between items-center w-full px-4 py-3">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 text-base transition-colors duration-300">{category.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">({category.weight}% weight)</p>
                </div>
                <div className="text-right">
  
                  <div className="flex items-center justify-end">
                    <motion.span 
                      className="font-medium text-gray-900 dark:text-gray-100 text-lg transition-colors duration-300"
                      animate={category.isAnimating ? {
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 1]
                      } : {}}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      {category.animatedValue}
                    </motion.span>
                    {showCaretaker && category.caretakerAmount > 0 && (
                      <CaretakerChip value={`+${category.caretakerAmount} OMR`} />
                    )}
                  </div>
                  <div className={`text-sm font-medium ${category.textColor} transition-colors duration-300`}>
                    = {category.weightedScore.toFixed(1)}%
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="border-t pt-3 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-900 dark:text-gray-100 text-base transition-colors duration-300">Total Achievement</span>
            <div className="flex items-center">
              <motion.span 
                className="text-xl font-bold text-green-600 dark:text-green-400"
                animate={animatedTotal.isAnimating ? {
                  scale: [1, 1.05, 1],
                  color: ["#16a34a", "#22c55e", "#16a34a"]
                } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {animatedTotal.value}
              </motion.span>
              {showCaretaker && totalCaretakerPayout > 0 && (
                <CaretakerChip value={`+${totalCaretakerPayout} OMR`} />
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300 text-base transition-colors duration-300">Base Payout</span>
            <span className="font-medium text-gray-900 dark:text-gray-100 text-base transition-colors duration-300">1000 OMR</span>
          </div>
          
          <motion.div 
            className="bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-800/50 dark:to-green-900/20 p-4 rounded-lg border-2 border-gray-300/40 dark:border-gray-600/40 transition-all duration-300 ease-out hover:bg-green-50 dark:hover:bg-green-900/30 hover:border-green-300/60 dark:hover:border-green-600/50 hover:shadow-lg hover:shadow-green-200/30 dark:hover:shadow-green-500/20"
            animate={animatedPayout.isAnimating ? {
              boxShadow: [
                "0 0 0 rgba(34, 197, 94, 0)", 
                "0 0 15px rgba(34, 197, 94, 0.3)", 
                "0 0 0 rgba(34, 197, 94, 0)"
              ]
            } : {}}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg transition-colors duration-300">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 transition-colors duration-300" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-100 text-base transition-colors duration-300">Calculated Payout</span>
              </div>
              <div className="text-right">
                <motion.span 
                  className="text-xl font-bold text-green-600 dark:text-green-400 block"
                  animate={animatedPayout.isAnimating ? {
                    scale: [1, 1.1, 1],
                    color: ["#16a34a", "#22c55e", "#16a34a"]
                  } : {}}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {animatedPayout.value}
                </motion.span>
                {showCaretaker && totalCaretakerPayout > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="text-sm font-medium text-orange-600 dark:text-orange-400 mt-1"
                  >
                    +{totalCaretakerPayout} OMR (Caretaker)
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}