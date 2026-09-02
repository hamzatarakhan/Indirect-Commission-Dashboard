import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PerformanceTooltipProps {
  previousValue: number | string;
  currentValue: number | string;
  changePercent: number;
  previousLabel?: string;
  currentLabel?: string;
  isVisible: boolean;
  children: React.ReactNode;
  previousTarget?: number;
  currentTarget?: number;
  formatTarget?: (value: number) => string;
}

export function PerformanceTooltip({
  previousValue,
  currentValue,
  changePercent,
  previousLabel = 'Previous Quarter (Q2)',
  currentLabel = 'Current Quarter (Q3)',
  isVisible,
  children,
  previousTarget,
  currentTarget,
  formatTarget
}: PerformanceTooltipProps) {
  const [position, setPosition] = useState<{ top: number; left: number; placement: 'top' | 'bottom' | 'right' }>({
    top: 0,
    left: 0,
    placement: 'top'
  });
  const triggerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted (for SSR compatibility)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate tooltip position based on trigger element
  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const updatePosition = () => {
        const triggerRect = triggerRef.current!.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // Tooltip dimensions (approximate)
        const tooltipWidth = 280;
        const tooltipHeight = 220;
        const offset = 12;
        const arrowSize = 8;

        let top = 0;
        let left = 0;
        let placement: 'top' | 'bottom' | 'right' = 'top';

        // Try to position above (default)
        if (triggerRect.top - tooltipHeight - offset - arrowSize >= 0) {
          placement = 'top';
          top = triggerRect.top - tooltipHeight - offset - arrowSize;
          left = triggerRect.left + (triggerRect.width / 2) - (tooltipWidth / 2);
        } 
        // Try below
        else if (triggerRect.bottom + tooltipHeight + offset + arrowSize <= viewportHeight) {
          placement = 'bottom';
          top = triggerRect.bottom + offset + arrowSize;
          left = triggerRect.left + (triggerRect.width / 2) - (tooltipWidth / 2);
        } 
        // Use right as fallback
        else {
          placement = 'right';
          top = triggerRect.top + (triggerRect.height / 2) - (tooltipHeight / 2);
          left = triggerRect.right + offset + arrowSize;
        }

        // Ensure tooltip stays within viewport horizontally
        if (left < 8) left = 8;
        if (left + tooltipWidth > viewportWidth - 8) {
          left = viewportWidth - tooltipWidth - 8;
        }

        setPosition({ top, left, placement });
      };

      updatePosition();
      
      // Update position on scroll or resize
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isVisible]);

  const formatValue = (value: number | string): string => {
    if (typeof value === 'string') return value;
    return value.toLocaleString();
  };

  const calculateAchievement = (actual: number | string, target: number): number => {
    const actualNum = typeof actual === 'string' 
      ? parseFloat(actual.replace(/[^0-9.-]/g, '')) 
      : actual;
    if (target === 0) return 0;
    return (actualNum / target) * 100;
  };

  const getArrowStyles = () => {
    if (!triggerRef.current) return {};
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const arrowLeft = triggerRect.left + (triggerRect.width / 2) - position.left;

    switch (position.placement) {
      case 'bottom':
        return {
          position: 'absolute' as const,
          top: '-8px',
          left: `${arrowLeft}px`,
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderBottom: '8px solid #FFFFFF',
        };
      case 'right':
        return {
          position: 'absolute' as const,
          left: '-8px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 0,
          height: 0,
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          borderRight: '8px solid #FFFFFF',
        };
      case 'top':
      default:
        return {
          position: 'absolute' as const,
          bottom: '-8px',
          left: `${arrowLeft}px`,
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '8px solid #FFFFFF',
        };
    }
  };

  const hasTargets = previousTarget !== undefined && currentTarget !== undefined && formatTarget !== undefined;

  // Tooltip content rendered via Portal at document level
  const tooltipContent = mounted && isVisible ? (
    <div
      className="bu-kpi-tooltip"
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 999,
        pointerEvents: 'none',
      }}
    >
      <div 
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: '0 6px 14px rgba(0, 0, 0, 0.12)',
          borderRadius: '8px',
          padding: '12px 16px',
          minWidth: '220px',
          maxWidth: '320px',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '12px',
          color: '#475569'
        }}
      >
        <p style={{ fontWeight: 600, color: '#111827', marginBottom: '8px', fontSize: '12px' }}>
          Compared to Previous Quarter
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Previous Quarter */}
          <div style={{ background: '#F9FAFB', borderRadius: '6px', padding: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#374151' }}>{previousLabel}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
              <span style={{ color: '#6B7280' }}>Actual:</span>
              <span style={{ fontWeight: 600, color: '#111827' }}>
                {formatValue(previousValue)}
              </span>
            </div>
            {hasTargets && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginTop: '2px' }}>
                  <span style={{ color: '#6B7280' }}>Target:</span>
                  <span style={{ fontWeight: 500, color: '#374151' }}>
                    {formatTarget(previousTarget)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginTop: '2px' }}>
                  <span style={{ color: '#6B7280' }}>Achievement:</span>
                  <span style={{ 
                    fontWeight: 600, 
                    color: calculateAchievement(previousValue, previousTarget) >= 100 ? '#059669' : '#D97706'
                  }}>
                    {calculateAchievement(previousValue, previousTarget).toFixed(1)}%
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Current Quarter */}
          <div style={{ background: '#EFF6FF', borderRadius: '6px', padding: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#374151' }}>{currentLabel}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
              <span style={{ color: '#6B7280' }}>Actual:</span>
              <span style={{ fontWeight: 600, color: '#111827' }}>
                {formatValue(currentValue)}
              </span>
            </div>
            {hasTargets && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginTop: '2px' }}>
                  <span style={{ color: '#6B7280' }}>Target:</span>
                  <span style={{ fontWeight: 500, color: '#374151' }}>
                    {formatTarget(currentTarget)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginTop: '2px' }}>
                  <span style={{ color: '#6B7280' }}>Achievement:</span>
                  <span style={{ 
                    fontWeight: 600, 
                    color: calculateAchievement(currentValue, currentTarget) >= 100 ? '#059669' : '#D97706'
                  }}>
                    {calculateAchievement(currentValue, currentTarget).toFixed(1)}%
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Change */}
          <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#6B7280' }}>Change:</span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: changePercent > 0 ? '#059669' : changePercent < 0 ? '#DC2626' : '#6B7280'
                }}
              >
                {changePercent > 0 ? '+' : ''}{changePercent.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Arrow Pointer */}
      <div style={getArrowStyles()} />
    </div>
  ) : null;

  return (
    <>
      <div ref={triggerRef} className="relative inline-block">
        {children}
      </div>
      {/* Render tooltip in Portal at document body level */}
      {mounted && tooltipContent && createPortal(tooltipContent, document.body)}
    </>
  );
}

// Utility function to calculate QoQ percentage
export function calculateQoQPercentage(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

// Utility component for percentage badge with tooltip
interface PercentageBadgeProps {
  current: number;
  previous: number;
  currentLabel?: string;
  previousLabel?: string;
  formatValue?: (value: number) => string;
  currentTarget?: number;
  previousTarget?: number;
  formatTarget?: (value: number) => string;
  isCompareActive?: boolean;
}

export function PercentageBadge({
  current,
  previous,
  currentLabel,
  previousLabel,
  formatValue = (val) => val.toLocaleString(),
  currentTarget,
  previousTarget,
  formatTarget,
  isCompareActive = false
}: PercentageBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const percentage = calculateQoQPercentage(current, previous);

  // Hide badge if compare mode is not active
  if (!isCompareActive) {
    return null;
  }

  return (
    <PerformanceTooltip
      previousValue={formatValue(previous)}
      currentValue={formatValue(current)}
      changePercent={percentage}
      previousLabel={previousLabel}
      currentLabel={currentLabel}
      isVisible={isHovered}
      previousTarget={previousTarget}
      currentTarget={currentTarget}
      formatTarget={formatTarget}
    >
      <span
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`px-2 py-0.5 rounded-md text-xs font-semibold cursor-help transition-all duration-200 ${
          percentage > 0
            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
            : percentage < 0
            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
            : 'bg-gray-100 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400'
        }`}
      >
        {percentage > 0 ? '+' : ''}{percentage.toFixed(1)}%
      </span>
    </PerformanceTooltip>
  );
}