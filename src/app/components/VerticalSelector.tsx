import React, { useState } from 'react';
import { ChevronDown, List, Check } from 'lucide-react';
import { Button } from './ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Badge } from './ui/badge';
import type { UserScope } from '../utils/scopeResolver';

interface VerticalSelectorProps {
  scope: UserScope;
  selectedVertical?: string | null;
  onVerticalSelect?: (vertical: string | null) => void;
}

export function VerticalSelector({ scope, selectedVertical, onVerticalSelect }: VerticalSelectorProps) {
  const [open, setOpen] = useState(false);

  const handleVerticalClick = (vertical: string) => {
    if (onVerticalSelect) {
      // If clicking the already selected vertical, deselect it (show all)
      if (selectedVertical === vertical) {
        onVerticalSelect(null);
      } else {
        onVerticalSelect(vertical);
      }
      setOpen(false);
    }
  };

  const displayText = selectedVertical 
    ? selectedVertical 
    : `${scope.verticals.length} Vertical${scope.verticals.length !== 1 ? 's' : ''}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto px-0 py-0 hover:bg-transparent font-semibold text-[10px] text-violet-700 dark:text-violet-400 gap-1"
        >
          <span>{displayText}</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="start" 
        className="w-[320px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4"
        sideOffset={8}
      >
        <div className="space-y-3">
          {/* Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
              Select Vertical
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {scope.segment} • {scope.verticals.length} vertical{scope.verticals.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {/* Show All Option */}
          {onVerticalSelect && (
            <div
              onClick={() => {
                onVerticalSelect(null);
                setOpen(false);
              }}
              className="flex items-center justify-between gap-2 p-2 rounded-md bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:border-violet-300 dark:hover:border-violet-600/50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className="text-[10px] bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600 shrink-0"
                >
                  All
                </Badge>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                  All Verticals
                </span>
              </div>
              {!selectedVertical && (
                <Check className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              )}
            </div>
          )}
          
          {/* Verticals List */}
          <div className="space-y-2 max-h-[320px] overflow-y-auto">
            {scope.verticals.map((vertical, index) => (
              <div 
                key={vertical}
                onClick={() => handleVerticalClick(vertical)}
                className="flex items-center justify-between gap-2 p-2 rounded-md bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:border-violet-300 dark:hover:border-violet-600/50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className="text-[10px] bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border-violet-300 dark:border-violet-600 shrink-0"
                  >
                    {index + 1}
                  </Badge>
                  <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {vertical}
                  </span>
                </div>
                {selectedVertical === vertical && (
                  <Check className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                )}
              </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              {selectedVertical 
                ? `Showing data for ${selectedVertical}` 
                : 'Showing data for all verticals'}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
