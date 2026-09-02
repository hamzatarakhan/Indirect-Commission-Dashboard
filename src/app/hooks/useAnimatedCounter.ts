import { useState, useEffect, useRef } from 'react';

interface UseAnimatedCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  decimals?: number;
  onComplete?: () => void;
  suffix?: string;
  prefix?: string;
}

export function useAnimatedCounter({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
  onComplete,
  suffix = '',
  prefix = ''
}: UseAnimatedCounterOptions) {
  const [currentValue, setCurrentValue] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (end === currentValue) return;

    setIsAnimating(true);
    startTimeRef.current = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - (startTimeRef.current || now);
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = start + (end - start) * easeOutQuart;

      setCurrentValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        onComplete?.();
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, start, duration, onComplete]);

  const formatValue = (value: number) => {
    const formatted = decimals > 0 
      ? value.toFixed(decimals)
      : Math.round(value).toString();
    
    return `${prefix}${formatted}${suffix}`;
  };

  return {
    value: formatValue(currentValue),
    rawValue: currentValue,
    isAnimating
  };
}

// Hook for percentage values
export function useAnimatedPercentage(targetPercentage: number, options?: Omit<UseAnimatedCounterOptions, 'suffix'>) {
  return useAnimatedCounter({
    ...options,
    end: targetPercentage,
    suffix: '%',
    decimals: options?.decimals ?? 1
  });
}

// Hook for currency values
export function useAnimatedCurrency(targetAmount: number, options?: Omit<UseAnimatedCounterOptions, 'prefix'>) {
  return useAnimatedCounter({
    ...options,
    end: targetAmount,
    prefix: options?.prefix ?? '$',
    decimals: options?.decimals ?? 0
  });
}

// Hook for simple numbers with formatting
export function useAnimatedNumber(targetNumber: number, options?: UseAnimatedCounterOptions) {
  return useAnimatedCounter({
    ...options,
    end: targetNumber
  });
}