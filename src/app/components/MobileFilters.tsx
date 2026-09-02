import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface MobileFiltersProps {
  period: string;
  setPeriod: (value: string) => void;
  quarter: string;
  setQuarter: (value: string) => void;
}

export function MobileFilters({ period, setPeriod, quarter, setQuarter }: MobileFiltersProps) {
  return (
    <div className="sm:hidden px-6 pb-4">
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-gray-500/5 dark:shadow-gray-900/20">
        <div className="p-4 space-y-4">
          {/* Header with Update Badge */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Time Period</h3>
            <div className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200/50 dark:border-blue-700/50">
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300 whitespace-nowrap">
                Updated: <span className="font-normal">7/27/2025</span>
              </span>
            </div>
          </div>
          
          {/* Side-by-Side Filters */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block">Period</label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="h-11 w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 shadow-sm rounded-lg font-medium text-sm hover:border-blue-400 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block">Quarter</label>
              <Select value={quarter} onValueChange={setQuarter}>
                <SelectTrigger className="h-11 w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 shadow-sm rounded-lg font-medium text-sm hover:border-blue-400 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Q1">Q1</SelectItem>
                  <SelectItem value="Q2">Q2</SelectItem>
                  <SelectItem value="Q3">Q3</SelectItem>
                  <SelectItem value="Q4">Q4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}