import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';
import svgPaths from '../imports/svg-gf9d3jyd3w';

interface GaugeChartProps {
  type: 'year' | 'quarter';
  value: number;
  comparisonValue?: number;
  target: number;
  achievement: number;
  comparisonAchievement?: number;
  year: string;
  comparisonYear?: string;
  comparisonMode?: boolean;
  quarterId?: number;
  delay?: number;
}

export function ImprovedGaugeChart({
  type,
  value,
  comparisonValue,
  target,
  achievement,
  comparisonAchievement,
  year,
  comparisonYear,
  comparisonMode = false,
  quarterId = 1,
  delay = 0
}: GaugeChartProps) {
  const isYear = type === 'year';
  const viewBox = isYear ? "0 0 414 207" : "0 0 277 139";
  const strokeWidth = isYear ? 58 : 38;
  const innerStrokeWidth = Math.round(strokeWidth * 0.45); // 45% of outer
  
  // For year gauge
  const yearOuterRadius = 177; // Main arc radius
  const yearInnerRadius = Math.round(yearOuterRadius * 0.82); // 82% of outer
  
  // For quarterly gauge
  const quarterOuterRadius = 118; // Main arc radius  
  const quarterInnerRadius = Math.round(quarterOuterRadius * 0.82); // 82% of outer

  return (
    <div className="relative w-full h-full" style={{ overflow: 'visible', zIndex: 10 }}>
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.4, duration: 0.6, ease: "easeOut" }}
        style={{ overflow: 'visible' }}
      >
        <svg 
          className="w-full h-full" 
          viewBox={viewBox} 
          fill="none" 
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Outer Arc Gradients - Primary Year */}
            <linearGradient 
              gradientUnits="userSpaceOnUse" 
              id={`paint0_${type}_${quarterId}`} 
              x1={isYear ? "207" : "138.024"} 
              x2={isYear ? "207" : "138.024"} 
              y1={isYear ? "30" : "20.0035"} 
              y2={isYear ? "207" : "138.024"}
            >
              <stop stopColor="#FFD572" />
              <stop offset="1" stopColor="#FEBD38" />
            </linearGradient>
            <linearGradient 
              gradientUnits="userSpaceOnUse" 
              id={`paint1_${type}_${quarterId}`} 
              x1={isYear ? "181" : "120.688"} 
              x2={isYear ? "181" : "120.688"} 
              y1={isYear ? "30" : "20.0035"} 
              y2={isYear ? "207" : "138.024"}
            >
              <stop stopColor="#FF9364" />
              <stop offset="1" stopColor="#F25F33" />
            </linearGradient>
            
            {/* Inner Arc Gradients - Comparison Year with transparency */}
            <linearGradient 
              gradientUnits="userSpaceOnUse" 
              id={`paint2_comp_${type}_${quarterId}`} 
              x1={isYear ? "207" : "138.024"} 
              x2={isYear ? "207" : "138.024"} 
              y1={isYear ? "60" : "40"} 
              y2={isYear ? "177" : "118"}
            >
              <stop stopColor="#93C5FD" stopOpacity="0.5" />
              <stop offset="1" stopColor="#60A5FA" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient 
              gradientUnits="userSpaceOnUse" 
              id={`paint3_comp_${type}_${quarterId}`} 
              x1={isYear ? "207" : "138.024"} 
              x2={isYear ? "207" : "138.024"} 
              y1={isYear ? "60" : "40"} 
              y2={isYear ? "177" : "118"}
            >
              <stop stopColor="#60A5FA" stopOpacity="0.55" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0.55" />
            </linearGradient>
            
            {/* Inner shadow for depth */}
            <filter id={`innerShadow_${type}_${quarterId}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation={isYear ? "3" : "2"}/>
              <feOffset dx="0" dy={isYear ? "2" : "1"} result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <g>
            {comparisonMode ? (
              <>
                {/* OUTER ARC - Primary Year */}
                {/* Background arc */}
                <motion.path 
                  d={isYear ? svgPaths.p1978be80 : svgPaths.p3a429a80}
                  stroke={`url(#paint0_${type}_${quarterId})`}
                  strokeWidth={strokeWidth}
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: delay + 0.6, duration: 1.2, ease: "easeInOut" }}
                />
                {/* Progress arc */}
                <motion.path 
                  d={isYear ? svgPaths.p2581f440 : svgPaths.p381947c0}
                  stroke={`url(#paint1_${type}_${quarterId})`}
                  strokeWidth={strokeWidth}
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: delay + 0.9, duration: 1.5, ease: "easeInOut" }}
                />
                
                {/* INNER ARC - Comparison Year (82% radius, 45% thickness) */}
                {isYear ? (
                  <>
                    {/* Year gauge inner arcs */}
                    <motion.path 
                      d="M 77 177 A 130 130 0 0 1 337 177"
                      stroke={`url(#paint2_comp_${type}_${quarterId})`}
                      strokeWidth={innerStrokeWidth}
                      fill="none"
                      filter={`url(#innerShadow_${type}_${quarterId})`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: delay + 0.7, duration: 1.2, ease: "easeInOut" }}
                    />
                    <motion.path 
                      d="M 77 177 A 130 130 0 0 1 300 87"
                      stroke={`url(#paint3_comp_${type}_${quarterId})`}
                      strokeWidth={innerStrokeWidth}
                      fill="none"
                      filter={`url(#innerShadow_${type}_${quarterId})`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: delay + 1.0, duration: 1.5, ease: "easeInOut" }}
                    />
                  </>
                ) : (
                  <>
                    {/* Quarterly gauge inner arcs */}
                    <motion.path 
                      d="M 52 118 A 86 86 0 0 1 224 118"
                      stroke={`url(#paint2_comp_${type}_${quarterId})`}
                      strokeWidth={innerStrokeWidth}
                      fill="none"
                      filter={`url(#innerShadow_${type}_${quarterId})`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: delay + 0.8, duration: 0.8, ease: "easeInOut" }}
                    />
                    {/* Progress arc based on quarter ID and comparison achievement */}
                    <motion.path 
                      d={
                        quarterId === 1 ? "M 52 118 A 86 86 0 0 1 194 58" : // Q1 78%
                        quarterId === 2 ? "M 52 118 A 86 86 0 0 1 172 70" : // Q2 63.6%
                        quarterId === 3 ? "M 52 118 A 86 86 0 0 1 207 52" : // Q3 85.7%
                        "M 52 118 A 86 86 0 0 1 150 84"                // Q4 52%
                      }
                      stroke={`url(#paint3_comp_${type}_${quarterId})`}
                      strokeWidth={innerStrokeWidth}
                      fill="none"
                      filter={`url(#innerShadow_${type}_${quarterId})`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: delay + 1.0, duration: 1, ease: "easeInOut" }}
                    />
                  </>
                )}
                
                {/* NEEDLES - Properly positioned */}
                {/* Primary Year Needle - Orange */}
                <motion.path 
                  d={isYear ? "M310 103L353 60" : svgPaths.p2dc0a3c0}
                  stroke="#F25F33" 
                  strokeWidth={isYear ? "5" : "3.2"}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: delay + 1.8, duration: 0.5, ease: "easeOut" }}
                />
                {/* Comparison Year Needle - Blue, anchored to inner arc */}
                <motion.path 
                  d={
                    isYear ? "M287 107L318 60" :
                    quarterId === 1 ? "M182 65L162 38" : 
                    quarterId === 2 ? "M165 75L145 48" : 
                    quarterId === 3 ? "M195 60L175 33" : 
                    "M145 88L125 61"
                  }
                  stroke="#3B82F6" 
                  strokeWidth={isYear ? "4" : "2.8"}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.85 }}
                  transition={{ delay: delay + 2.1, duration: 0.5, ease: "easeOut" }}
                />
              </>
            ) : (
              <>
                {/* Single Arc Mode - Current Year Only */}
                <motion.path 
                  d={isYear ? svgPaths.p1978be80 : svgPaths.p3a429a80}
                  stroke={`url(#paint0_${type}_${quarterId})`}
                  strokeWidth={strokeWidth}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: delay + 0.6, duration: 1.2, ease: "easeInOut" }}
                />
                <motion.path 
                  d={isYear ? svgPaths.p2581f440 : svgPaths.p381947c0}
                  stroke={`url(#paint1_${type}_${quarterId})`}
                  strokeWidth={strokeWidth}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: delay + 0.9, duration: 1.5, ease: "easeInOut" }}
                />
                <motion.path 
                  d={isYear ? "M310 103L353 60" : svgPaths.p2dc0a3c0}
                  stroke="#F25F33" 
                  strokeWidth={isYear ? "5" : "3.2"}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: delay + 1.8, duration: 0.5, ease: "easeOut" }}
                />
              </>
            )}
          </g>
        </svg>
      </motion.div>

      {/* Value Display */}
      <motion.div 
        className={`absolute ${isYear ? 'inset-[76.35%_32.32%_auto_32.68%]' : 'inset-[74.45%_32.32%_auto_32.68%]'}`}
        initial={{ opacity: 0, y: isYear ? 10 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 1.2, duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center gap-0.5">
          <motion.p 
            className={`font-['Roboto',sans-serif] font-bold ${isYear ? 'text-[32px] sm:text-[40px] leading-[32px] sm:leading-[40px]' : 'text-[24px] leading-[24px]'} text-[#000b25] dark:text-gray-100 transition-colors duration-300 whitespace-nowrap`}
            style={{ fontVariationSettings: "'wdth' 100" }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 1.4, duration: 0.4, type: "spring", stiffness: 150 }}
          >
            {isYear ? '84M' : value}
          </motion.p>
          {comparisonMode && comparisonValue && (
            <>
              <motion.p 
                className={`font-['Roboto',sans-serif] font-medium ${isYear ? 'text-[13px] sm:text-[14px]' : 'text-[10px]'} text-blue-600 dark:text-blue-400 transition-colors duration-300 whitespace-nowrap`}
                style={{ fontVariationSettings: "'wdth' 100" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 2.2, duration: 0.4 }}
              >
                vs {comparisonValue}
              </motion.p>
              {isYear && (
                <motion.div
                  className="flex items-center gap-1 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mt-1"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: delay + 2.4, duration: 0.3, type: "spring" }}
                >
                  <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-['Roboto',sans-serif] font-bold text-[10px] text-emerald-700 dark:text-emerald-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                    +12%
                  </span>
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.div>

      {/* Enhanced Legend - Only show in comparison mode */}
      {comparisonMode && (
        <motion.div 
          className={`absolute ${isYear ? 'bottom-[-42px]' : 'bottom-[-32px]'} left-1/2 -translate-x-1/2 flex items-center ${isYear ? 'gap-3 sm:gap-4 px-3 sm:px-4 py-2' : 'gap-2 px-2 py-1'} bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 dark:border-gray-700`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 2.3, duration: 0.4 }}
          style={{ zIndex: 50 }}
        >
          <div className="flex items-center gap-1.5">
            <div className={`${isYear ? 'w-3 h-3' : 'w-2 h-2'} rounded-full bg-gradient-to-br from-[#93C5FD] to-[#3B82F6] opacity-70 shadow-sm`} />
            <span className={`font-['Roboto',sans-serif] font-semibold ${isYear ? 'text-[10px] sm:text-[11px]' : 'text-[8px]'} text-gray-700 dark:text-gray-300`} style={{ fontVariationSettings: "'wdth' 100" }}>
              {comparisonYear}{isYear && comparisonAchievement && ` (${comparisonAchievement}%)`}
            </span>
          </div>
          {isYear && <div className="w-px h-3 bg-gray-300 dark:bg-gray-600" />}
          <div className="flex items-center gap-1.5">
            <div className={`${isYear ? 'w-3 h-3' : 'w-2 h-2'} rounded-full bg-gradient-to-br from-[#FF9364] to-[#F25F33] shadow-sm`} />
            <span className={`font-['Roboto',sans-serif] font-semibold ${isYear ? 'text-[10px] sm:text-[11px]' : 'text-[8px]'} text-gray-700 dark:text-gray-300`} style={{ fontVariationSettings: "'wdth' 100" }}>
              {year}{isYear && ` (${achievement}%)`}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
