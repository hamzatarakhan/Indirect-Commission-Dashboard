import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface GlobalFiltersProps {
  selectedSegments: string[];
  selectedVerticals: string[];
  onSegmentsChange: (segments: string[]) => void;
  onVerticalsChange: (verticals: string[]) => void;
  onLoadingChange?: (isLoading: boolean) => void;
}

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
  'SME Business': [
    'All Verticals',
    'Medium Services',
    'Medium Business',
    'Micro-Retail',
    'Indirect-Small'
  ]
};

const SEGMENTS = ['All', 'SME Business', 'Large Business', 'BMB', 'Key Account', 'Dhofar'];

// SME Business group segments
const SME_SEGMENTS = ['Micro-Retail', 'Medium Services', 'Medium Business', 'Indirect-Small'];

export function GlobalFilters({
  selectedSegments,
  selectedVerticals,
  onSegmentsChange,
  onVerticalsChange,
  onLoadingChange
}: GlobalFiltersProps) {
  const segmentScrollRef = useRef<HTMLDivElement>(null);
  const verticalScrollRef = useRef<HTMLDivElement>(null);
  const [showSegmentLeftArrow, setShowSegmentLeftArrow] = useState(false);
  const [showSegmentRightArrow, setShowSegmentRightArrow] = useState(false);
  const [showVerticalLeftArrow, setShowVerticalLeftArrow] = useState(false);
  const [showVerticalRightArrow, setShowVerticalRightArrow] = useState(false);
  const [isSegmentChanging, setIsSegmentChanging] = useState(false);
  const [isVerticalChanging, setIsVerticalChanging] = useState(false);

  // Get verticals for currently selected segments (union of all verticals)
  const currentVerticals = React.useMemo(() => {
    if (selectedSegments.length === 0 || selectedSegments.includes('All')) {
      return SEGMENT_VERTICALS['All'];
    }
    
    // Get union of all verticals for selected segments
    const verticalsSet = new Set<string>();
    selectedSegments.forEach(segment => {
      const verticals = SEGMENT_VERTICALS[segment] || [];
      verticals.forEach(v => verticalsSet.add(v));
    });
    
    // Always include "All Verticals" at the start
    const result = Array.from(verticalsSet);
    if (!result.includes('All Verticals')) {
      result.unshift('All Verticals');
    }
    
    console.log('Selected Segments:', selectedSegments);
    console.log('Current Verticals:', result);
    
    return result;
  }, [selectedSegments]);

  // Check if filters are active (not default state)
  const hasActiveFilters = selectedSegments.some(segment => segment !== 'All') || selectedVerticals.some(vertical => vertical !== 'All Verticals');

  // Check scroll position for arrows
  const checkScrollPosition = (ref: React.RefObject<HTMLDivElement>, setLeft: (val: boolean) => void, setRight: (val: boolean) => void) => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;
    setLeft(scrollLeft > 0);
    setRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  // Update arrows on mount and scroll
  useEffect(() => {
    checkScrollPosition(segmentScrollRef, setShowSegmentLeftArrow, setShowSegmentRightArrow);
    checkScrollPosition(verticalScrollRef, setShowVerticalLeftArrow, setShowVerticalRightArrow);
  }, [selectedSegments, currentVerticals]);

  // Scroll functions
  const scrollSegments = (direction: 'left' | 'right') => {
    if (!segmentScrollRef.current) return;
    const scrollAmount = 300;
    segmentScrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const scrollVerticals = (direction: 'left' | 'right') => {
    if (!verticalScrollRef.current) return;
    const scrollAmount = 300;
    verticalScrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Handle segment change with single-select
  const handleSegmentChange = (segment: string) => {
    setIsSegmentChanging(true);
    
    // Single select - always replace with new selection
    const newSegments = [segment];
    
    onSegmentsChange(newSegments);
    
    // If selecting "All", reset verticals to All Verticals
    if (segment === 'All') {
      onVerticalsChange(['All Verticals']);
    } else {
      // Filter verticals to only those available in new segment
      const availableVerticals = SEGMENT_VERTICALS[segment] || [];
      const availableVerticalsSet = new Set(availableVerticals);
      
      const filteredVerticals = selectedVerticals.filter(v => 
        availableVerticalsSet.has(v)
      );
      
      if (filteredVerticals.length === 0) {
        onVerticalsChange(['All Verticals']);
      } else {
        onVerticalsChange(filteredVerticals);
      }
    }
    
    if (onLoadingChange) onLoadingChange(true);
    setTimeout(() => {
      setIsSegmentChanging(false);
      if (onLoadingChange) onLoadingChange(false);
    }, 400);
  };

  // Handle vertical change with single-select
  const handleVerticalChange = (vertical: string) => {
    setIsVerticalChanging(true);
    
    // Single select - always replace with new selection
    const newVerticals = [vertical];
    
    onVerticalsChange(newVerticals);
    
    if (onLoadingChange) onLoadingChange(true);
    setTimeout(() => {
      setIsVerticalChanging(false);
      if (onLoadingChange) onLoadingChange(false);
    }, 400);
  };

  return (
    <div className="bg-white dark:bg-[#07112F] rounded-xl p-6 border border-[#E2E8F0] dark:border-[#E2E8F0]/20">
      <div className="space-y-3">
        {/* First Level: Segment Tabs */}
        <div className="relative">
          {/* Left Arrow */}
          {showSegmentLeftArrow && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scrollSegments('left')}
              className="absolute -left-1 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </motion.button>
          )}

          {/* Tabs */}
          <div className="flex gap-1.5 p-1.5 bg-slate-100 dark:bg-gray-800/50 rounded-lg transition-colors duration-300">
            <div
              ref={segmentScrollRef}
              onScroll={() => checkScrollPosition(segmentScrollRef, setShowSegmentLeftArrow, setShowSegmentRightArrow)}
              className="flex gap-1.5 overflow-x-auto scrollbar-hide scroll-smooth w-full"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {SEGMENTS.map((segment) => {
                const isActive = selectedSegments.includes(segment);
                return (
                  <motion.button
                    key={segment}
                    onClick={() => handleSegmentChange(segment)}
                    className={`
                      relative flex items-center gap-1.5 flex-1 px-4 sm:px-5 py-2 sm:py-2.5 rounded-md font-['Roboto',sans-serif] font-medium text-xs sm:text-sm transition-all duration-200 whitespace-nowrap
                      ${isActive
                        ? 'bg-white dark:bg-gray-700 text-[#000b25] dark:text-gray-100 shadow-sm'
                        : 'text-[rgba(0,11,37,0.64)] dark:text-gray-400 hover:text-[#000b25] dark:hover:text-gray-200'
                      }
                    `}
                    style={{ fontVariationSettings: "'wdth' 100" }}
                    whileHover={{ scale: isActive ? 1 : 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {segment === 'All' ? 'All Segments' : segment}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Arrow */}
          {showSegmentRightArrow && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scrollSegments('right')}
              className="absolute -right-1 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </motion.button>
          )}
        </div>

        {/* Second Level: Vertical Tabs */}
        <div className="relative">
          {/* Left Arrow */}
          {showVerticalLeftArrow && currentVerticals.length > 1 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scrollVerticals('left')}
              className="absolute -left-1 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
            </motion.button>
          )}

          {/* Tabs */}
          <div className="flex gap-1.5 p-1.5 bg-slate-100 dark:bg-gray-800/50 rounded-lg transition-colors duration-300">
            <div
              ref={verticalScrollRef}
              onScroll={() => checkScrollPosition(verticalScrollRef, setShowVerticalLeftArrow, setShowVerticalRightArrow)}
              className="flex gap-1.5 overflow-x-auto scrollbar-hide scroll-smooth w-full"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {currentVerticals.map((vertical) => {
                const isActive = selectedVerticals.includes(vertical);
                return (
                  <motion.button
                    key={vertical}
                    onClick={() => handleVerticalChange(vertical)}
                    className={`
                      relative flex items-center justify-center flex-1 min-w-fit px-3 sm:px-4 py-2 sm:py-2.5 rounded-md font-['Roboto',sans-serif] font-medium text-[10px] sm:text-xs transition-all duration-200 whitespace-nowrap
                      ${isActive
                        ? 'bg-white dark:bg-gray-700 text-[#000b25] dark:text-gray-100 shadow-sm'
                        : 'text-[rgba(0,11,37,0.64)] dark:text-gray-400 hover:text-[#000b25] dark:hover:text-gray-200'
                      }
                    `}
                    style={{ fontVariationSettings: "'wdth' 100" }}
                    whileHover={{ scale: isActive ? 1 : 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{vertical}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Arrow */}
          {showVerticalRightArrow && currentVerticals.length > 1 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scrollVerticals('right')}
              className="absolute -right-1 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}