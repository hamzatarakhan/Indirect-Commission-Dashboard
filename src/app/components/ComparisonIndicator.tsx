import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface ComparisonIndicatorProps {
  currentValue: number;
  previousValue: number;
  formatValue?: (val: number) => string;
  label?: string;
  additionalInfo?: Array<{
    label: string;
    current: number | string;
    previous: number | string;
  }>;
  showPercentage?: boolean;
}

export function ComparisonIndicator({
  currentValue,
  previousValue,
  formatValue = (val) => val.toLocaleString(),
  label = 'YoY Change',
  additionalInfo = [],
  showPercentage = true
}: ComparisonIndicatorProps) {
  const difference = currentValue - previousValue;
  const percentageChange = previousValue !== 0 ? ((difference / previousValue) * 100) : 0;
  const isIncrease = difference > 0;
  const isDecrease = difference < 0;
  
  // Format the difference value
  const formatDifference = (diff: number) => {
    const absDiff = Math.abs(diff);
    if (absDiff >= 1000000) {
      return `${(diff / 1000000).toFixed(1)}M`;
    } else if (absDiff >= 1000) {
      return `${(diff / 1000).toFixed(1)}k`;
    }
    return diff.toFixed(0);
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-200 cursor-help ${
            isIncrease 
              ? 'bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30' 
              : isDecrease 
              ? 'bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30'
              : 'bg-gray-50 dark:bg-gray-800/20 hover:bg-gray-100 dark:hover:bg-gray-800/30'
          }`}>
            {isIncrease ? (
              <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            ) : isDecrease ? (
              <TrendingDown className="w-3 h-3 text-red-600 dark:text-red-400" />
            ) : (
              <div className="w-3 h-3" />
            )}
            <span className={`text-[10px] font-semibold ${
              isIncrease 
                ? 'text-emerald-700 dark:text-emerald-400' 
                : isDecrease 
                ? 'text-red-700 dark:text-red-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {isIncrease ? '+' : ''}{formatDifference(difference)}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg p-3 min-w-[200px]"
          sideOffset={5}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{label}</span>
              {showPercentage && (
                <span className={`text-xs font-bold ${
                  isIncrease 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : isDecrease 
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {isIncrease ? '+' : ''}{percentageChange.toFixed(1)}%
                </span>
              )}
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-600 dark:text-gray-400">This Year:</span>
                <span className="text-[11px] font-semibold text-gray-900 dark:text-gray-100">{formatValue(currentValue)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-600 dark:text-gray-400">Last Year:</span>
                <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300">{formatValue(previousValue)}</span>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-gray-100 dark:border-gray-800">
                <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400">Difference:</span>
                <span className={`text-[11px] font-bold ${
                  isIncrease 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : isDecrease 
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {isIncrease ? '+' : ''}{formatValue(difference)}
                </span>
              </div>
            </div>

            {additionalInfo.length > 0 && (
              <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700 space-y-1.5">
                {additionalInfo.map((info, index) => (
                  <div key={index} className="space-y-1">
                    <div className="text-[10px] font-semibold text-gray-700 dark:text-gray-300">{info.label}</div>
                    <div className="flex items-center justify-between pl-2">
                      <span className="text-[10px] text-gray-600 dark:text-gray-400">Current:</span>
                      <span className="text-[10px] font-medium text-gray-900 dark:text-gray-100">{info.current}</span>
                    </div>
                    <div className="flex items-center justify-between pl-2">
                      <span className="text-[10px] text-gray-600 dark:text-gray-400">Previous:</span>
                      <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">{info.previous}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
