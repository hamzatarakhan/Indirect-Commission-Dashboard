import { useMemo } from 'react';
import type { UserScope } from '../utils/scopeResolver';

interface DashboardData {
  user: {
    name: string;
    role: string;
    email: string;
    segment: string;
    vertical: string;
  };
  overall: {
    score: number;
    payout: number;
    revenue: number;
    growth: number;
  };
  metrics: {
    calls: number;
    newClients: number;
    conversion: number;
    satisfaction: number;
  };
  cx: {
    csat: number;
    nps: number;
    frequency: number;
    goldFeedback: number;
    redFeedback: number;
    // Extended for dynamic VOC/Thermometer mode support
    totalFeedback?: number;
    greenFeedback?: number;
    yellowFeedback?: number;
  };
  revenue: {
    total: number;
    advisory: number;
    transactions: number;
    lending: number;
    growth: number;
  };
  team: {
    position: number;
    score: number;
    improvement: number;
  };
}

const generateSeasonalVariation = (base: number, period: string, quarter: string): number => {
  let seasonalMultiplier = 1;
  
  // Quarter-based variations
  switch (quarter) {
    case 'Q1':
      seasonalMultiplier = 0.85; // Lower performance in Q1
      break;
    case 'Q2':
      seasonalMultiplier = 0.95;
      break;
    case 'Q3':
      seasonalMultiplier = 1.0; // Base performance
      break;
    case 'Q4':
      seasonalMultiplier = 1.15; // Higher performance in Q4
      break;
  }
  
  // Period-based variations
  if (period === 'Monthly') {
    seasonalMultiplier *= 0.9; // Slightly lower for monthly view
  } else if (period === 'Yearly') {
    seasonalMultiplier *= 1.1; // Slightly higher for yearly view
  }
  
  // Add small random variation to make it feel more realistic
  const randomVariation = 0.95 + (Math.random() * 0.1); // ±5% variation
  
  return Math.round(base * seasonalMultiplier * randomVariation * 100) / 100;
};

export function useDashboardData(
  period: string, 
  quarter: string, 
  selectedTeamMember?: string,
  userScope?: UserScope
): DashboardData {
  return useMemo(() => {
    // Base data for overall view - use scope if provided
    const baseData = {
      user: {
        name: 'Sami Talal Khaled',
        role: 'Vertical Manager',
        email: 'sami.khaled@omantel.om',
        segment: userScope?.segment || 'Large Business',
        vertical: userScope?.vertical || 'Retail & Technology Accounts'
      },
      overall: {
        score: 88.5,
        payout: 12450,
        revenue: 856000,
        growth: 12.8
      },
      metrics: {
        calls: 156,
        newClients: 23,
        conversion: 14.7,
        satisfaction: 92.3
      },
      cx: {
        csat: 4.3,
        nps: 45,
        frequency: 96.88,
        goldFeedback: 58,
        redFeedback: 1,
        // Extended feedback data for VOC/Thermometer mode switching
        greenFeedback: 15,
        yellowFeedback: 6,
        totalFeedback: 80
      },
      revenue: {
        total: 856000,
        advisory: 425000,
        transactions: 285000,
        lending: 146000,
        growth: 12.8
      },
      team: {
        position: 3,
        score: 88.5,
        improvement: 5.2
      }
    };

    // Adjust data based on selected team member
    if (selectedTeamMember) {
      const memberMultipliers = {
        'Ahmed Al-Rashid': { performance: 1.15, revenue: 1.2 },
        'Fatima Al-Zahra': { performance: 0.95, revenue: 1.05 },
        'Mohamed Al-Balushi': { performance: 0.85, revenue: 0.9 },
        'Sarah Al-Kindi': { performance: 1.05, revenue: 1.1 },
        'Michael Chen': { performance: 1.1, revenue: 1.15 },
        'Layla Al-Zahra': { performance: 0.9, revenue: 0.95 },
        'Omar Al-Rashid': { performance: 0.88, revenue: 0.92 },
        'Aisha Al-Balushi': { performance: 0.82, revenue: 0.85 },
        'Hassan Al-Kindi': { performance: 0.75, revenue: 0.8 },
        'Maryam Al-Said': { performance: 0.7, revenue: 0.75 }
      };

      const multiplier = memberMultipliers[selectedTeamMember as keyof typeof memberMultipliers] || 
                        { performance: 1, revenue: 1 };

      baseData.overall.score *= multiplier.performance;
      baseData.overall.payout *= multiplier.performance;
      baseData.overall.revenue *= multiplier.revenue;
      baseData.metrics.calls = Math.round(baseData.metrics.calls * multiplier.performance);
      baseData.metrics.newClients = Math.round(baseData.metrics.newClients * multiplier.performance);
      baseData.metrics.conversion *= multiplier.performance;
      baseData.revenue.total *= multiplier.revenue;
      baseData.revenue.advisory *= multiplier.revenue;
      baseData.revenue.transactions *= multiplier.revenue;
      baseData.revenue.lending *= multiplier.revenue;
    }

    // Apply seasonal variations to all values
    return {
      overall: {
        score: generateSeasonalVariation(baseData.overall.score, period, quarter),
        payout: generateSeasonalVariation(baseData.overall.payout, period, quarter),
        revenue: generateSeasonalVariation(baseData.overall.revenue, period, quarter),
        growth: generateSeasonalVariation(baseData.overall.growth, period, quarter)
      },
      metrics: {
        calls: Math.round(generateSeasonalVariation(baseData.metrics.calls, period, quarter)),
        newClients: Math.round(generateSeasonalVariation(baseData.metrics.newClients, period, quarter)),
        conversion: generateSeasonalVariation(baseData.metrics.conversion, period, quarter),
        satisfaction: generateSeasonalVariation(baseData.metrics.satisfaction, period, quarter)
      },
      cx: {
        csat: generateSeasonalVariation(baseData.cx.csat, period, quarter),
        nps: Math.round(generateSeasonalVariation(baseData.cx.nps, period, quarter)),
        frequency: generateSeasonalVariation(baseData.cx.frequency, period, quarter),
        goldFeedback: Math.round(generateSeasonalVariation(baseData.cx.goldFeedback, period, quarter)),
        redFeedback: Math.max(1, Math.round(generateSeasonalVariation(baseData.cx.redFeedback, period, quarter))),
        // Extended feedback data with seasonal variations
        greenFeedback: Math.round(generateSeasonalVariation(baseData.cx.greenFeedback || 15, period, quarter)),
        yellowFeedback: Math.round(generateSeasonalVariation(baseData.cx.yellowFeedback || 6, period, quarter)),
        totalFeedback: Math.round(generateSeasonalVariation(baseData.cx.totalFeedback || 80, period, quarter))
      },
      revenue: {
        total: generateSeasonalVariation(baseData.revenue.total, period, quarter),
        advisory: generateSeasonalVariation(baseData.revenue.advisory, period, quarter),
        transactions: generateSeasonalVariation(baseData.revenue.transactions, period, quarter),
        lending: generateSeasonalVariation(baseData.revenue.lending, period, quarter),
        growth: generateSeasonalVariation(baseData.revenue.growth, period, quarter)
      },
      team: {
        position: baseData.team.position,
        score: generateSeasonalVariation(baseData.overall.score, period, quarter),
        improvement: generateSeasonalVariation(baseData.team.improvement, period, quarter)
      },
      user: baseData.user
    };
  }, [period, quarter, selectedTeamMember, userScope]);
}