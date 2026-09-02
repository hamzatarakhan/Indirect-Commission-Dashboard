import React, { useState, useMemo, useRef, useEffect } from 'react';
import { TrendingUp, TrendingDown, Target, Calendar, PieChart, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { PercentageBadge } from './PerformanceTooltip';
import svgPaths from '../imports/svg-gf9d3jyd3w';
import searchSvgPaths from '../imports/svg-qqb0x6d05m';

interface RevenueMatrixProps {
  userRole: string;
  period: string;
  quarter: string;
  year: string;
  comparisonMode?: boolean;
  comparisonYear?: string;
  selectedSegments?: string[];
  selectedVerticals?: string[];
  titleOverride?: string;
  headerRight?: React.ReactNode;
  iconBoxed?: boolean;
}

export function RevenueMatrix({
  userRole,
  period,
  quarter,
  year,
  comparisonMode = false,
  comparisonYear = '2023',
  selectedSegments = ['All'],
  selectedVerticals = ['All Verticals'],
  titleOverride,
  headerRight,
  iconBoxed = false
}: RevenueMatrixProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredGauge, setHoveredGauge] = useState<'year' | 'q1' | 'q2' | 'q3' | 'q4' | null>(null);
  const [expandedSections, setExpandedSections] = useState({ year: false, quarterly: false, monthly: true });
  const [activeTab, setActiveTab] = useState<'all' | 'year' | 'quarters' | 'monthly'>('all');
  const [crSearch, setCrSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedCustomer, setSelectedCustomer] = useState<typeof allCustomersData[0] | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Determine filter scope
  const isAllSegments = selectedSegments.includes('All') || selectedSegments.length === 0;
  const isAllVerticals = selectedVerticals.includes('All Verticals') || selectedVerticals.length === 0;
  
  // Get filtered scope label for display
  const getFilterLabel = () => {
    if (isAllSegments && isAllVerticals) return 'Company-Wide';
    if (!isAllSegments && isAllVerticals) {
      return selectedSegments[0];
    }
    if (!isAllSegments && !isAllVerticals) {
      return selectedVerticals[0];
    }
    return 'Performance Overview';
  };
  
  // Customer-level data that aggregates to the totals
  const allCustomersData = [
    { cr: 'C-10001', name: 'Oman Oil Company', actual: 12500000, target: 11500000, q1: 2800000, q2: 3100000, q3: 3300000, q4: 3300000 },
    { cr: 'C-10002', name: 'PDO', actual: 11200000, target: 10200000, q1: 2500000, q2: 2800000, q3: 3000000, q4: 2900000 },
    { cr: 'C-10003', name: 'Oman Gas Company', actual: 8900000, target: 8100000, q1: 2000000, q2: 2300000, q3: 2400000, q4: 2200000 },
    { cr: 'C-10004', name: 'Sohar Port', actual: 7200000, target: 6800000, q1: 1600000, q2: 1800000, q3: 1900000, q4: 1900000 },
    { cr: 'C-10005', name: 'Omantel', actual: 6000000, target: 5400000, q1: 1300000, q2: 1500000, q3: 1600000, q4: 1600000 },
  ];
  
  // Mock data - in real app, this would come from API based on user role
  const revenueData = {
    overview: {
      actual: 45800000,
      previous: 40700000, // Previous quarter data
      target: 42000000,
      previousTarget: 38500000, // Previous quarter target
      achievement: 109.0,
      trend: 7.8
    },
    quarterly: {
      q1: { actual: 10200000, previous: 9300000, target: 10000000, previousTarget: 9000000 },
      q2: { actual: 11500000, previous: 10200000, target: 10500000, previousTarget: 9800000 },
      q3: { actual: 12100000, previous: 11500000, target: 11000000, previousTarget: 10300000 },
      q4: { actual: 12000000, previous: 12100000, target: 10500000, previousTarget: 9400000 }
    },
    monthly: [
      { month: 'Jan', actual: 3400000, target: 3200000 },
      { month: 'Feb', actual: 3500000, target: 3400000 },
      { month: 'Mar', actual: 3300000, target: 3400000 },
      { month: 'Apr', actual: 3800000, target: 3500000 },
      { month: 'May', actual: 3900000, target: 3500000 },
      { month: 'Jun', actual: 3800000, target: 3500000 },
    ],
    ytdContribution: 78.5,
    ytdPrevious: 68.1, // Previous quarter YTD
    ytdTarget: 82.0,
    ytdPreviousTarget: 75.0
  };

  // Segment-specific data
  const segmentDataMap: Record<string, any> = {
    'All': {
      year: { revenue: 84000000, target: 98000000, achievement: 89.4 },
      quarters: [
        { revenue: 22100000, target: 25000000, achievement: 88.4 },
        { revenue: 20300000, target: 28000000, achievement: 72.5 },
        { revenue: 24900000, target: 25800000, achievement: 96.5 },
        { revenue: 16700000, target: 30000000, achievement: 55.7 }
      ],
      monthly: [
        { actual: 3400000, target: 4000000 },
        { actual: 3900000, target: 4200000 },
        { actual: 2100000, target: 3800000 },
        { actual: 4200000, target: 4500000 },
        { actual: 2800000, target: 3500000 },
        { actual: 3900000, target: 4000000 },
        { actual: 1800000, target: 3200000 },
        { actual: 4500000, target: 4300000 },
        { actual: 4900000, target: 4600000 },
        { actual: 4200000, target: 4800000 }
      ]
    },
    'Large Business': {
      year: { revenue: 27000000, target: 30000000, achievement: 90.0 },
      quarters: [
        { revenue: 6500000, target: 7500000, achievement: 86.7 },
        { revenue: 6800000, target: 7000000, achievement: 97.1 },
        { revenue: 7200000, target: 7800000, achievement: 92.3 },
        { revenue: 6500000, target: 7700000, achievement: 84.4 }
      ],
      monthly: [
        { actual: 2100000, target: 2500000 },
        { actual: 2300000, target: 2500000 },
        { actual: 2100000, target: 2500000 },
        { actual: 2200000, target: 2300000 },
        { actual: 2400000, target: 2300000 },
        { actual: 2200000, target: 2400000 },
        { actual: 2300000, target: 2600000 },
        { actual: 2400000, target: 2600000 },
        { actual: 2500000, target: 2600000 },
        { actual: 2100000, target: 2500000 }
      ]
    },
    'BMB': {
      year: { revenue: 35000000, target: 38000000, achievement: 92.1 },
      quarters: [
        { revenue: 8500000, target: 9500000, achievement: 89.5 },
        { revenue: 8800000, target: 9500000, achievement: 92.6 },
        { revenue: 9200000, target: 9500000, achievement: 96.8 },
        { revenue: 8500000, target: 9500000, achievement: 89.5 }
      ],
      monthly: [
        { actual: 2800000, target: 3200000 },
        { actual: 2900000, target: 3200000 },
        { actual: 2800000, target: 3100000 },
        { actual: 2900000, target: 3200000 },
        { actual: 3000000, target: 3200000 },
        { actual: 2900000, target: 3100000 },
        { actual: 3000000, target: 3200000 },
        { actual: 3100000, target: 3200000 },
        { actual: 3100000, target: 3100000 },
        { actual: 3000000, target: 3200000 }
      ]
    },
    'Medium Services': {
      year: { revenue: 22000000, target: 30000000, achievement: 73.3 },
      quarters: [
        { revenue: 7100000, target: 8000000, achievement: 88.8 },
        { revenue: 4700000, target: 11500000, achievement: 40.9 },
        { revenue: 8500000, target: 8300000, achievement: 102.4 },
        { revenue: 1700000, target: 12200000, achievement: 13.9 }
      ],
      monthly: [
        { actual: 2500000, target: 2700000 },
        { actual: 2700000, target: 2700000 },
        { actual: 1900000, target: 2600000 },
        { actual: 1700000, target: 3800000 },
        { actual: 1400000, target: 3900000 },
        { actual: 1600000, target: 3800000 },
        { actual: 2800000, target: 2800000 },
        { actual: 2900000, target: 2700000 },
        { actual: 2800000, target: 2800000 },
        { actual: 1100000, target: 4200000 }
      ]
    }
  };

  // Vertical-specific data (within segments)
  const verticalDataMap: Record<string, any> = {
    'Manufacturing & Infrastructure Accounts': {
      segment: 'Large Business',
      year: { revenue: 8500000, target: 8800000, achievement: 96.6 },
      quarters: [
        { revenue: 2100000, target: 2200000, achievement: 95.5 },
        { revenue: 2200000, target: 2200000, achievement: 100.0 },
        { revenue: 2300000, target: 2200000, achievement: 104.5 },
        { revenue: 1900000, target: 2200000, achievement: 86.4 }
      ],
      monthly: [
        { actual: 700000, target: 733000 },
        { actual: 720000, target: 733000 },
        { actual: 680000, target: 734000 },
        { actual: 730000, target: 733000 },
        { actual: 740000, target: 733000 },
        { actual: 730000, target: 734000 },
        { actual: 760000, target: 733000 },
        { actual: 770000, target: 733000 },
        { actual: 770000, target: 734000 },
        { actual: 700000, target: 733000 }
      ]
    },
    'Energy & Industrial Accounts': {
      segment: 'Large Business',
      year: { revenue: 7200000, target: 7400000, achievement: 97.3 },
      quarters: [
        { revenue: 1700000, target: 1850000, achievement: 91.9 },
        { revenue: 1800000, target: 1850000, achievement: 97.3 },
        { revenue: 1900000, target: 1850000, achievement: 102.7 },
        { revenue: 1800000, target: 1850000, achievement: 97.3 }
      ],
      monthly: [
        { actual: 560000, target: 617000 },
        { actual: 580000, target: 617000 },
        { actual: 560000, target: 616000 },
        { actual: 600000, target: 617000 },
        { actual: 610000, target: 617000 },
        { actual: 590000, target: 616000 },
        { actual: 630000, target: 617000 },
        { actual: 640000, target: 617000 },
        { actual: 630000, target: 616000 },
        { actual: 600000, target: 617000 }
      ]
    },
    'Key Energy Accounts': {
      segment: 'Large Business',
      year: { revenue: 6100000, target: 6400000, achievement: 95.3 },
      quarters: [
        { revenue: 1500000, target: 1600000, achievement: 93.8 },
        { revenue: 1550000, target: 1600000, achievement: 96.9 },
        { revenue: 1600000, target: 1600000, achievement: 100.0 },
        { revenue: 1450000, target: 1600000, achievement: 90.6 }
      ],
      monthly: [
        { actual: 500000, target: 533000 },
        { actual: 520000, target: 533000 },
        { actual: 480000, target: 534000 },
        { actual: 510000, target: 533000 },
        { actual: 530000, target: 533000 },
        { actual: 510000, target: 534000 },
        { actual: 530000, target: 533000 },
        { actual: 540000, target: 533000 },
        { actual: 530000, target: 534000 },
        { actual: 450000, target: 533000 }
      ]
    },
    'BMB': {
      segment: 'BMB',
      year: { revenue: 6700000, target: 7200000, achievement: 93.1 },
      quarters: [
        { revenue: 1650000, target: 1800000, achievement: 91.7 },
        { revenue: 1700000, target: 1800000, achievement: 94.4 },
        { revenue: 1750000, target: 1800000, achievement: 97.2 },
        { revenue: 1600000, target: 1800000, achievement: 88.9 }
      ],
      monthly: [
        { actual: 550000, target: 600000 },
        { actual: 570000, target: 600000 },
        { actual: 530000, target: 600000 },
        { actual: 560000, target: 600000 },
        { actual: 580000, target: 600000 },
        { actual: 560000, target: 600000 },
        { actual: 580000, target: 600000 },
        { actual: 590000, target: 600000 },
        { actual: 580000, target: 600000 },
        { actual: 530000, target: 600000 }
      ]
    },
    'Business Centers': {
      segment: 'BMB',
      year: { revenue: 5800000, target: 6300000, achievement: 92.1 },
      quarters: [
        { revenue: 1450000, target: 1575000, achievement: 92.1 },
        { revenue: 1500000, target: 1575000, achievement: 95.2 },
        { revenue: 1550000, target: 1575000, achievement: 98.4 },
        { revenue: 1300000, target: 1575000, achievement: 82.5 }
      ],
      monthly: [
        { actual: 480000, target: 525000 },
        { actual: 500000, target: 525000 },
        { actual: 470000, target: 525000 },
        { actual: 500000, target: 525000 },
        { actual: 510000, target: 525000 },
        { actual: 490000, target: 525000 },
        { actual: 510000, target: 525000 },
        { actual: 520000, target: 525000 },
        { actual: 520000, target: 525000 },
        { actual: 400000, target: 525000 }
      ]
    },
    'Government & Financial Accounts': {
      segment: 'BMB',
      year: { revenue: 5300000, target: 5700000, achievement: 93.0 },
      quarters: [
        { revenue: 1300000, target: 1425000, achievement: 91.2 },
        { revenue: 1350000, target: 1425000, achievement: 94.7 },
        { revenue: 1400000, target: 1425000, achievement: 98.2 },
        { revenue: 1250000, target: 1425000, achievement: 87.7 }
      ],
      monthly: [
        { actual: 430000, target: 475000 },
        { actual: 445000, target: 475000 },
        { actual: 425000, target: 475000 },
        { actual: 450000, target: 475000 },
        { actual: 455000, target: 475000 },
        { actual: 445000, target: 475000 },
        { actual: 465000, target: 475000 },
        { actual: 470000, target: 475000 },
        { actual: 465000, target: 475000 },
        { actual: 450000, target: 475000 }
      ]
    },
    'Services': {
      segment: 'Medium Services',
      year: { revenue: 4900000, target: 5600000, achievement: 87.5 },
      quarters: [
        { revenue: 1200000, target: 1400000, achievement: 85.7 },
        { revenue: 1250000, target: 1400000, achievement: 89.3 },
        { revenue: 1300000, target: 1400000, achievement: 92.9 },
        { revenue: 1150000, target: 1400000, achievement: 82.1 }
      ],
      monthly: [
        { actual: 400000, target: 467000 },
        { actual: 410000, target: 467000 },
        { actual: 390000, target: 466000 },
        { actual: 420000, target: 467000 },
        { actual: 430000, target: 467000 },
        { actual: 400000, target: 466000 },
        { actual: 430000, target: 467000 },
        { actual: 440000, target: 467000 },
        { actual: 430000, target: 466000 },
        { actual: 350000, target: 467000 }
      ]
    },
    'Medium Segment': {
      segment: 'Medium Services',
      year: { revenue: 4400000, target: 5300000, achievement: 83.0 },
      quarters: [
        { revenue: 1100000, target: 1325000, achievement: 83.0 },
        { revenue: 1150000, target: 1325000, achievement: 86.8 },
        { revenue: 1200000, target: 1325000, achievement: 90.6 },
        { revenue: 950000, target: 1325000, achievement: 71.7 }
      ],
      monthly: [
        { actual: 360000, target: 442000 },
        { actual: 380000, target: 442000 },
        { actual: 360000, target: 441000 },
        { actual: 390000, target: 442000 },
        { actual: 400000, target: 442000 },
        { actual: 360000, target: 441000 },
        { actual: 400000, target: 442000 },
        { actual: 410000, target: 442000 },
        { actual: 390000, target: 441000 },
        { actual: 350000, target: 442000 }
      ]
    },
    'Healthcare Education & Hospitality Accounts': {
      segment: 'Medium Services',
      year: { revenue: 4000000, target: 5500000, achievement: 72.7 },
      quarters: [
        { revenue: 1100000, target: 1375000, achievement: 80.0 },
        { revenue: 900000, target: 1375000, achievement: 65.5 },
        { revenue: 1200000, target: 1375000, achievement: 87.3 },
        { revenue: 800000, target: 1375000, achievement: 58.2 }
      ],
      monthly: [
        { actual: 360000, target: 458000 },
        { actual: 380000, target: 458000 },
        { actual: 360000, target: 459000 },
        { actual: 300000, target: 458000 },
        { actual: 280000, target: 458000 },
        { actual: 320000, target: 459000 },
        { actual: 400000, target: 458000 },
        { actual: 410000, target: 458000 },
        { actual: 390000, target: 459000 },
        { actual: 200000, target: 458000 }
      ]
    }
  };

  // Get the current filtered data based on segment/vertical selection
  const getCurrentData = () => {
    // Level 3: Specific vertical selected
    if (!isAllVerticals && selectedVerticals[0] !== 'All Verticals') {
      const verticalKey = selectedVerticals[0];
      if (verticalDataMap[verticalKey]) {
        return verticalDataMap[verticalKey];
      }
    }
    
    // Level 2: Specific segment selected (but all verticals)
    if (!isAllSegments) {
      const segmentKey = selectedSegments[0];
      if (segmentDataMap[segmentKey]) {
        return segmentDataMap[segmentKey];
      }
    }
    
    // Level 1: Company-wide (All segments, all verticals)
    return segmentDataMap['All'];
  };

  const currentFilteredData = getCurrentData();

  // Generate comparison data based on current filtered data
  // Scale down the current data by ~89% to simulate previous year performance
  const getFilteredComparisonData = () => {
    const scaleFactor = 0.89; // Comparison year was ~11% lower
    const targetScaleFactor = 0.96; // Targets were also slightly lower
    
    return {
      year: {
        revenue: Math.round(currentFilteredData.year.revenue * scaleFactor),
        target: Math.round(currentFilteredData.year.target * targetScaleFactor),
        achievement: 0 // Will be calculated
      },
      quarters: currentFilteredData.quarters.map((q: any) => ({
        revenue: Math.round(q.revenue * scaleFactor),
        target: Math.round(q.target * targetScaleFactor),
        achievement: 0 // Will be calculated
      })),
      monthly: currentFilteredData.monthly.map((m: any) => ({
        actual: Math.round(m.actual * scaleFactor),
        target: Math.round(m.target * targetScaleFactor)
      }))
    };
  };

  const filteredComparisonData = getFilteredComparisonData();
  
  // Calculate achievements for comparison data
  filteredComparisonData.year.achievement = (filteredComparisonData.year.revenue / filteredComparisonData.year.target) * 100;
  filteredComparisonData.quarters = filteredComparisonData.quarters.map((q: any) => ({
    ...q,
    achievement: (q.revenue / q.target) * 100
  }));

  // Comparison data (simulating previous year)
  const comparisonData = {
    year: {
      revenue: 75000000, // 75M for comparison year
      target: 94000000,
      achievement: 79.8
    },
    quarters: [
      { revenue: 19500000, target: 25000000, achievement: 78.0 }, // Q1
      { revenue: 17800000, target: 28000000, achievement: 63.6 }, // Q2
      { revenue: 22100000, target: 25800000, achievement: 85.7 }, // Q3
      { revenue: 15600000, target: 30000000, achievement: 52.0 }  // Q4
    ],
    monthly: [
      { month: 'Jan', actual: 3000000, target: 3000000 }, // Month 1
      { month: 'Feb', actual: 3400000, target: 3200000 }, // Month 2
      { month: 'Mar', actual: 1900000, target: 3500000 }, // Month 3
      { month: 'Apr', actual: 3700000, target: 4000000 }, // Month 4
      { month: 'May', actual: 2500000, target: 3200000 }, // Month 5
      { month: 'Jun', actual: 3500000, target: 3800000 }, // Month 6
      { month: 'Jul', actual: 1600000, target: 3000000 }, // Month 7
      { month: 'Aug', actual: 4000000, target: 4000000 }, // Month 8
      { month: 'Sep', actual: 4400000, target: 4200000 }, // Month 9
      { month: 'Oct', actual: 3800000, target: 4500000 }  // Month 10
    ]
  };

  // Get suggestions based on search input
  const suggestions = useMemo(() => {
    if (!crSearch.trim()) return [];
    return allCustomersData.filter(customer => 
      customer.cr.toLowerCase().includes(crSearch.toLowerCase()) ||
      customer.name.toLowerCase().includes(crSearch.toLowerCase())
    );
  }, [crSearch]);

  // Filter customers based on selected customer (not search)
  const filteredCustomers = useMemo(() => {
    if (selectedCustomer) return [selectedCustomer];
    return allCustomersData;
  }, [selectedCustomer]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          selectCustomer(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Select a customer from dropdown
  const selectCustomer = (customer: typeof allCustomersData[0]) => {
    setSelectedCustomer(customer);
    setCrSearch('');
    setShowDropdown(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  // Clear customer filter
  const clearCustomerFilter = () => {
    setSelectedCustomer(null);
    setCrSearch('');
  };

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCrSearch(e.target.value);
    setShowDropdown(true);
    setSelectedIndex(-1);
  };

  // Helper function to format revenue in millions
  const formatRevenue = (value: number): string => {
    return `${(value / 1000000).toFixed(1)}M`;
  };

  // Helper function to format achievement percentage
  const formatAchievement = (revenue: number, target: number): string => {
    return ((revenue / target) * 100).toFixed(1);
  };
  
  // Recalculate revenue data based on filtered customers
  const filteredRevenueData = useMemo(() => {
    if (filteredCustomers.length === 0 || filteredCustomers.length === allCustomersData.length) {
      return revenueData;
    }
    
    const totalActual = filteredCustomers.reduce((sum, c) => sum + c.actual, 0);
    const totalTarget = filteredCustomers.reduce((sum, c) => sum + c.target, 0);
    const q1Total = filteredCustomers.reduce((sum, c) => sum + c.q1, 0);
    const q2Total = filteredCustomers.reduce((sum, c) => sum + c.q2, 0);
    const q3Total = filteredCustomers.reduce((sum, c) => sum + c.q3, 0);
    const q4Total = filteredCustomers.reduce((sum, c) => sum + c.q4, 0);
    
    return {
      overview: {
        actual: totalActual,
        previous: totalActual * 0.89, // ~11% growth
        target: totalTarget,
        previousTarget: totalTarget * 0.92,
        achievement: (totalActual / totalTarget) * 100,
        trend: 7.8
      },
      quarterly: {
        q1: { actual: q1Total, previous: q1Total * 0.91, target: q1Total * 0.98, previousTarget: q1Total * 0.9 },
        q2: { actual: q2Total, previous: q2Total * 0.89, target: q2Total * 0.91, previousTarget: q2Total * 0.86 },
        q3: { actual: q3Total, previous: q3Total * 0.95, target: q3Total * 0.91, previousTarget: q3Total * 0.85 },
        q4: { actual: q4Total, previous: q4Total * 1.01, target: q4Total * 0.88, previousTarget: q4Total * 0.78 }
      },
      monthly: revenueData.monthly,
      ytdContribution: 78.5,
      ytdPrevious: 68.1,
      ytdTarget: 82.0,
      ytdPreviousTarget: 75.0
    };
  }, [filteredCustomers]);

  const formatCurrency = (value: number) => {
    return `${(value / 1000000).toFixed(2)}M OMR`;
  };

  // Calculate current and previous YTD values
  const currentYTD = Math.round(filteredRevenueData.overview.actual * (filteredRevenueData.ytdContribution / 100));
  const previousYTD = Math.round(filteredRevenueData.overview.previous * (filteredRevenueData.ytdPrevious / 100));
  
  // Calculate YTD targets
  const currentYTDTarget = Math.round(filteredRevenueData.overview.target * (filteredRevenueData.ytdTarget / 100));
  const previousYTDTarget = Math.round(filteredRevenueData.overview.previousTarget * (filteredRevenueData.ytdPreviousTarget / 100));

  // Calculate monthly averages
  const currentMonthlyAvg = Math.round(filteredRevenueData.monthly.reduce((sum, m) => sum + m.actual, 0) / filteredRevenueData.monthly.length);
  const previousMonthlyAvg = Math.round(currentMonthlyAvg / 1.032); // +3.2% growth
  
  // Calculate monthly target averages
  const currentMonthlyTargetAvg = Math.round(filteredRevenueData.monthly.reduce((sum, m) => sum + m.target, 0) / filteredRevenueData.monthly.length);
  const previousMonthlyTargetAvg = Math.round(currentMonthlyTargetAvg * 0.95); // 5% lower target in previous quarter

  return (
    <div className="space-y-4">
      <div className="hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Revenue vs Target Overview - Primary Metric */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0 }}
          whileHover={{ scale: 1.015, transition: { duration: 0.2, ease: "easeOut" } }}
          onHoverStart={() => setHoveredCard(0)}
          onHoverEnd={() => setHoveredCard(null)}
          className="relative rounded-xl w-full border-l-4 border border-black/[0.08] dark:border-white/[0.08] transition-all duration-200"
          style={{ 
            isolation: "isolate",
            boxShadow: hoveredCard === 0 ? "0 6px 20px rgba(35, 97, 255, 0.15)" : "0 2px 8px rgba(0, 0, 0, 0.1)",
            borderLeftColor: hoveredCard === 0 ? "#2361FF" : "#60A5FA",
            overflow: "visible"
          }}
        >
          <div className="flex flex-row items-center relative size-full">
            <div className="box-border content-stretch flex flex-row items-center justify-start p-[16px] relative size-full bg-white dark:bg-[#07112F] transition-colors duration-300 rounded-xl">
              <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow h-full items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
                  <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                    {/* Title with Trend Badge */}
                    <div className="flex items-center justify-between w-full">
                      <div className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] text-[13px] sm:text-[15px] text-[rgba(0,11,37,0.64)] dark:text-gray-200 transition-colors duration-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="block leading-[1.2] whitespace-pre">Revenue vs Target</p>
                      </div>
                      <PercentageBadge
                        current={filteredRevenueData.overview.actual}
                        previous={filteredRevenueData.overview.previous}
                        formatValue={formatCurrency}
                        currentTarget={filteredRevenueData.overview.target}
                        previousTarget={filteredRevenueData.overview.previousTarget}
                        formatTarget={formatCurrency}
                      />
                    </div>

                    {/* Icon + Amount */}
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="bg-[rgba(59,130,246,0.1)] dark:bg-blue-500/20 flex items-center justify-center h-[40px] w-[36px] rounded-md relative transition-colors duration-300"
                        whileHover={{ backgroundColor: "rgba(59,130,246,0.15)", transition: { duration: 0.2 } }}
                      >
                        <div className="absolute border border-blue-200/40 dark:border-blue-500/20 border-solid inset-0 pointer-events-none rounded-md transition-colors duration-300" />
                        <Target className="w-5 h-5 text-[#0066ff] dark:text-blue-400 transition-colors duration-300" />
                      </motion.div>
                      <div className="flex flex-col flex-1">
                        <div className="font-['Roboto:Bold',_sans-serif] font-bold text-[16px] sm:text-[18px] text-[#274afa]" style={{ fontVariationSettings: "'wdth' 100", WebkitTextFillColor: "#274afa" }}>
                          <p className="block leading-[1.2]">
                            <span className="font-bold text-[14px] sm:text-[18px] text-[#274afa]">{((filteredRevenueData.overview.actual / filteredRevenueData.overview.target) * 100).toFixed(1)}%</span>
                            <span className="mx-1.5 text-gray-400 dark:text-gray-500">|</span>
                            <span className="font-normal text-[#274afa] text-[14px] sm:text-[16px]">{formatCurrency(filteredRevenueData.overview.actual)}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Insight */}
                    <div className="font-['Roboto:Regular',_sans-serif] font-normal text-[11px] text-[rgba(0,11,37,0.64)] dark:text-gray-400 transition-colors duration-300">
                      <p className="block leading-[1.3]">{filteredRevenueData.overview.achievement.toFixed(1)}% of {formatCurrency(filteredRevenueData.overview.target)} target</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. YTD Contribution - Annual Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ scale: 1.015, transition: { duration: 0.2, ease: "easeOut" } }}
          onHoverStart={() => setHoveredCard(1)}
          onHoverEnd={() => setHoveredCard(null)}
          className="relative rounded-xl w-full border-l-4 border border-black/[0.08] dark:border-white/[0.08] transition-all duration-200"
          style={{ 
            isolation: "isolate",
            boxShadow: hoveredCard === 1 ? "0 6px 20px rgba(35, 97, 255, 0.15)" : "0 2px 8px rgba(0, 0, 0, 0.1)",
            borderLeftColor: hoveredCard === 1 ? "#2361FF" : "#60A5FA",
            overflow: "visible"
          }}
        >
          <div className="flex flex-row items-center relative size-full">
            <div className="box-border content-stretch flex flex-row items-center justify-start p-[16px] relative size-full bg-white dark:bg-[#07112F] transition-colors duration-300 rounded-xl">
              <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow h-full items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
                  <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                    {/* Title with Trend Badge */}
                    <div className="flex items-center justify-between w-full">
                      <div className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] text-[13px] sm:text-[15px] text-[rgba(0,11,37,0.64)] dark:text-gray-200 transition-colors duration-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="block leading-[1.2] whitespace-pre">YTD Progress</p>
                      </div>
                      <PercentageBadge
                        current={currentYTD}
                        previous={previousYTD}
                        formatValue={formatCurrency}
                        currentTarget={currentYTDTarget}
                        previousTarget={previousYTDTarget}
                        formatTarget={formatCurrency}
                      />
                    </div>

                    {/* Icon + Amount */}
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="bg-[rgba(59,130,246,0.1)] dark:bg-blue-500/20 flex items-center justify-center h-[40px] w-[36px] rounded-md relative transition-colors duration-300"
                        whileHover={{ backgroundColor: "rgba(59,130,246,0.15)", transition: { duration: 0.2 } }}
                      >
                        <div className="absolute border border-blue-200/40 dark:border-blue-500/20 border-solid inset-0 pointer-events-none rounded-md transition-colors duration-300" />
                        <TrendingUp className="w-5 h-5 text-[#0066ff] dark:text-blue-400 transition-colors duration-300" />
                      </motion.div>
                      <div className="flex flex-col flex-1">
                        <div className="font-['Roboto:Bold',_sans-serif] font-bold text-[16px] sm:text-[18px] text-[#274afa]" style={{ fontVariationSettings: "'wdth' 100", WebkitTextFillColor: "#274afa" }}>
                          <p className="block leading-[1.2]">
                            <span className="font-bold text-[14px] sm:text-[18px] text-[#274afa]">{filteredRevenueData.ytdContribution.toFixed(1)}%</span>
                            <span className="mx-1.5 text-gray-400 dark:text-gray-500">|</span>
                            <span className="font-normal text-[#274afa] text-[14px] sm:text-[16px]">{formatCurrency(currentYTD)}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Insight */}
                    <div className="font-['Roboto:Regular',_sans-serif] font-normal text-[11px] text-[rgba(0,11,37,0.64)] dark:text-gray-400 transition-colors duration-300">
                      <p className="block leading-[1.3]">{filteredRevenueData.ytdContribution}% of annual target achieved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. Quarterly Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          whileHover={{ scale: 1.015, transition: { duration: 0.2, ease: "easeOut" } }}
          onHoverStart={() => setHoveredCard(2)}
          onHoverEnd={() => setHoveredCard(null)}
          className="relative rounded-xl w-full border-l-4 border border-black/[0.08] dark:border-white/[0.08] transition-all duration-200"
          style={{ 
            isolation: "isolate",
            boxShadow: hoveredCard === 2 ? "0 6px 20px rgba(35, 97, 255, 0.15)" : "0 2px 8px rgba(0, 0, 0, 0.1)",
            borderLeftColor: hoveredCard === 2 ? "#2361FF" : "#60A5FA",
            overflow: "visible"
          }}
        >
          <div className="flex flex-row items-center relative size-full">
            <div className="box-border content-stretch flex flex-row items-center justify-start p-[16px] relative size-full bg-white dark:bg-[#07112F] transition-colors duration-300 rounded-xl">
              <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow h-full items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
                  <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                    {/* Title with Trend Badge */}
                    <div className="flex items-center justify-between w-full">
                      <div className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] text-[13px] sm:text-[15px] text-[rgba(0,11,37,0.64)] dark:text-gray-200 transition-colors duration-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="block leading-[1.2] whitespace-pre">Quarterly Breakdown</p>
                      </div>
                      <PercentageBadge
                        current={filteredRevenueData.quarterly[quarter.toLowerCase() as 'q1' | 'q2' | 'q3' | 'q4']?.actual || 0}
                        previous={filteredRevenueData.quarterly[quarter.toLowerCase() as 'q1' | 'q2' | 'q3' | 'q4']?.previous || 0}
                        formatValue={formatCurrency}
                        currentTarget={filteredRevenueData.quarterly[quarter.toLowerCase() as 'q1' | 'q2' | 'q3' | 'q4']?.target || 0}
                        previousTarget={filteredRevenueData.quarterly[quarter.toLowerCase() as 'q1' | 'q2' | 'q3' | 'q4']?.previousTarget || 0}
                        formatTarget={formatCurrency}
                      />
                    </div>

                    {/* Icon + Amount */}
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="bg-[rgba(59,130,246,0.1)] dark:bg-blue-500/20 flex items-center justify-center h-[40px] w-[36px] rounded-md relative transition-colors duration-300"
                        whileHover={{ backgroundColor: "rgba(59,130,246,0.15)", transition: { duration: 0.2 } }}
                      >
                        <div className="absolute border border-blue-200/40 dark:border-blue-500/20 border-solid inset-0 pointer-events-none rounded-md transition-colors duration-300" />
                        <PieChart className="w-5 h-5 text-[#0066ff] dark:text-blue-400 transition-colors duration-300" />
                      </motion.div>
                      <div className="flex flex-col flex-1">
                        <div className="font-['Roboto:Bold',_sans-serif] font-bold text-[16px] sm:text-[18px] text-[#274afa]" style={{ fontVariationSettings: "'wdth' 100", WebkitTextFillColor: "#274afa" }}>
                          <p className="block leading-[1.2]">
                            <span className="font-bold text-[14px] sm:text-[18px] text-[#274afa]">{((filteredRevenueData.quarterly[quarter.toLowerCase() as 'q1' | 'q2' | 'q3' | 'q4']?.actual || 0) / (filteredRevenueData.quarterly[quarter.toLowerCase() as 'q1' | 'q2' | 'q3' | 'q4']?.target || 1) * 100).toFixed(1)}%</span>
                            <span className="mx-1.5 text-gray-400 dark:text-gray-500">|</span>
                            <span className="font-normal text-[#274afa] text-[14px] sm:text-[16px]">{formatCurrency(filteredRevenueData.quarterly[quarter.toLowerCase() as 'q1' | 'q2' | 'q3' | 'q4']?.actual || 0)}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Insight */}
                    <div className="font-['Roboto:Regular',_sans-serif] font-normal text-[11px] text-[rgba(0,11,37,0.64)] dark:text-gray-400 transition-colors duration-300">
                      <p className="block leading-[1.3]">Current quarter ({quarter}) revenue</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4. Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          whileHover={{ scale: 1.015, transition: { duration: 0.2, ease: "easeOut" } }}
          onHoverStart={() => setHoveredCard(3)}
          onHoverEnd={() => setHoveredCard(null)}
          className="relative rounded-xl w-full border-l-4 border border-black/[0.08] dark:border-white/[0.08] transition-all duration-200"
          style={{ 
            isolation: "isolate",
            boxShadow: hoveredCard === 3 ? "0 6px 20px rgba(35, 97, 255, 0.15)" : "0 2px 8px rgba(0, 0, 0, 0.1)",
            borderLeftColor: hoveredCard === 3 ? "#2361FF" : "#60A5FA",
            overflow: "visible"
          }}
        >
          <div className="flex flex-row items-center relative size-full">
            <div className="box-border content-stretch flex flex-row items-center justify-start p-[16px] relative size-full bg-white dark:bg-[#07112F] transition-colors duration-300 rounded-xl">
              <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow h-full items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
                  <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                    {/* Title with Trend Badge */}
                    <div className="flex items-center justify-between w-full">
                      <div className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] text-[13px] sm:text-[15px] text-[rgba(0,11,37,0.64)] dark:text-gray-200 transition-colors duration-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                        <p className="block leading-[1.2] whitespace-pre">Monthly Analysis</p>
                      </div>
                      <PercentageBadge
                        current={currentMonthlyAvg}
                        previous={previousMonthlyAvg}
                        formatValue={formatCurrency}
                        currentTarget={currentMonthlyTargetAvg}
                        previousTarget={previousMonthlyTargetAvg}
                        formatTarget={formatCurrency}
                      />
                    </div>

                    {/* Icon + Amount */}
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="bg-[rgba(59,130,246,0.1)] dark:bg-blue-500/20 flex items-center justify-center h-[40px] w-[36px] rounded-md relative transition-colors duration-300"
                        whileHover={{ backgroundColor: "rgba(59,130,246,0.15)", transition: { duration: 0.2 } }}
                      >
                        <div className="absolute border border-blue-200/40 dark:border-blue-500/20 border-solid inset-0 pointer-events-none rounded-md transition-colors duration-300" />
                        <Calendar className="w-5 h-5 text-[#0066ff] dark:text-blue-400 transition-colors duration-300" />
                      </motion.div>
                      <div className="flex flex-col flex-1">
                        <div className="font-['Roboto:Bold',_sans-serif] font-bold text-[16px] sm:text-[18px] text-[#274afa]" style={{ fontVariationSettings: "'wdth' 100", WebkitTextFillColor: "#274afa" }}>
                          <p className="block leading-[1.2]">
                            <span className="font-bold text-[14px] sm:text-[18px] text-[#274afa]">{((currentMonthlyAvg / (filteredRevenueData.monthly.reduce((sum, m) => sum + m.target, 0) / filteredRevenueData.monthly.length)) * 100).toFixed(1)}%</span>
                            <span className="mx-1.5 text-gray-400 dark:text-gray-500">|</span>
                            <span className="font-normal text-[#274afa] text-[14px] sm:text-[16px]">{formatCurrency(currentMonthlyAvg)}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Insight */}
                    <div className="font-['Roboto:Regular',_sans-serif] font-normal text-[11px] text-[rgba(0,11,37,0.64)] dark:text-gray-400 transition-colors duration-300">
                      <p className="block leading-[1.3]">Average monthly revenue performance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Performance Overview - Figma Design */}
      <div className="bg-white dark:bg-[#07112F] relative rounded-xl transition-all duration-300 p-4 sm:p-6">
        <div className="absolute border border-[#E2E8F0] dark:border-[#E2E8F0]/20 border-solid inset-0 pointer-events-none rounded-xl transition-colors duration-300" />
        
        <div className="space-y-4 sm:space-y-6 relative">
          {/* Header */}
          <div className="flex gap-2.5 items-center w-full justify-between">
            <div className="flex gap-2.5 items-center flex-1">
              {iconBoxed ? (
                <div className="shrink-0 rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                </div>
              ) : (
                <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                </div>
              )}
              <div className="flex-1 flex items-center gap-2">
                <h3 className="font-['Roboto',sans-serif] font-medium text-[15px] sm:text-[17px] text-[#000b25] dark:text-gray-100 transition-colors duration-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {titleOverride ?? 'Performance Overview'}
                </h3>
                {/* Filter Scope Badge */}
                {!isAllSegments || !isAllVerticals ? (
                  <span className="hidden px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-[10px] sm:text-[11px] font-semibold text-blue-700 dark:text-blue-400 whitespace-nowrap">
                    {getFilterLabel()}
                  </span>
                ) : null}
              </div>
            </div>

            {headerRight && <div className="shrink-0">{headerRight}</div>}

            {/* CR Search Input */}
            <div ref={searchRef} className="relative flex items-center shrink-0" style={{ width: '167.705px', height: '31.485px' }}>
              <div className="absolute inset-0 bg-[#f3f3f5] dark:bg-gray-800/50 rounded-[6.75px] transition-colors duration-300" />
              <div className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10">
                <svg className="block" width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <path d={searchSvgPaths.p1d4cac00} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16546" />
                  <path d={searchSvgPaths.p15a39800} stroke="#99A1AF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16546" />
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search by name or CR number"
                value={crSearch}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={() => crSearch && setShowDropdown(true)}
                aria-label="Search customers by name or CR number"
                className="relative w-full h-full bg-transparent border-0 outline-none pl-[35px] pr-[10.5px] py-[3.5px] font-['Arial',sans-serif] font-normal text-[12.25px] text-gray-900 dark:text-gray-100 placeholder:text-[#717182] placeholder:font-normal dark:placeholder:text-gray-500 rounded-[6.75px] transition-colors duration-300"
                style={{ zIndex: 1 }}
                autoComplete="off"
              />

              {/* Autocomplete Dropdown */}
              {showDropdown && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  style={{ minWidth: '200px' }}
                >
                  <div className="max-h-[240px] overflow-y-auto">
                    {suggestions.map((customer, index) => (
                      <div
                        key={customer.cr}
                        onClick={() => selectCustomer(customer)}
                        className={`px-3 py-2 cursor-pointer transition-colors duration-150 ${
                          index === selectedIndex
                            ? 'bg-blue-50 dark:bg-blue-900/30'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="font-['Roboto',sans-serif] font-semibold text-[11px] text-gray-900 dark:text-gray-100 truncate">
                              {customer.name}
                            </div>
                            <div className="font-['Roboto',sans-serif] font-normal text-[10px] text-gray-500 dark:text-gray-400">
                              {customer.cr}
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="font-['Roboto',sans-serif] font-bold text-[10px] text-blue-600 dark:text-blue-400">
                              {((customer.actual / customer.target) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Customer Filter Badge */}
          {selectedCustomer && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700/40 rounded-lg"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="p-1.5 bg-blue-500/10 dark:bg-blue-400/10 rounded-md">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">
                    Filtered by Customer
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-['Roboto',sans-serif] font-semibold text-[13px] text-gray-900 dark:text-gray-100 truncate">
                      {selectedCustomer.name}
                    </span>
                    <span className="font-['Roboto',sans-serif] font-normal text-[11px] text-gray-500 dark:text-gray-400">
                      ({selectedCustomer.cr})
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={clearCustomerFilter}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 shrink-0"
              >
                <svg className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300">Clear</span>
              </button>
            </motion.div>
          )}

          {/* Tab Navigation */}
          <div className="flex gap-1 sm:gap-2 p-1 bg-slate-100 dark:bg-gray-800/50 rounded-lg transition-colors duration-300">
            {[
              { id: 'all' as const, label: 'All' },
              { id: 'year' as const, label: 'Year' },
              { id: 'quarters' as const, label: 'Quarters' },
              { id: 'monthly' as const, label: 'Monthly' }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md font-['Roboto',sans-serif] font-medium text-[11px] sm:text-[13px] transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-[#000b25] dark:text-gray-100'
                    : 'text-[rgba(0,11,37,0.64)] dark:text-gray-400 hover:text-[#000b25] dark:hover:text-gray-200'
                }`}
                style={{ fontVariationSettings: "'wdth' 100" }}
                whileHover={{ scale: activeTab === tab.id ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Global Comparison Legend - Only show when comparison mode is active */}
          {comparisonMode && (
            <motion.div 
              className="flex items-center justify-center gap-6 py-3 px-4 bg-gradient-to-r from-blue-50/50 via-orange-50/30 to-blue-50/50 dark:from-blue-900/10 dark:via-orange-900/10 dark:to-blue-900/10 rounded-lg border border-blue-100/50 dark:border-blue-800/30"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]" />
                <span className="font-['Roboto',sans-serif] font-semibold text-[12px] sm:text-[13px] text-gray-700 dark:text-gray-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Comparison Year ({comparisonYear})
                </span>
              </div>
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#FB923C] to-[#F97316]" />
                <span className="font-['Roboto',sans-serif] font-semibold text-[12px] sm:text-[13px] text-gray-700 dark:text-gray-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Primary Year ({year})
                </span>
              </div>
            </motion.div>
          )}

          {/* Year and Quarterly Performance - Conditional Rendering */}
          {(activeTab === 'all' || activeTab === 'year' || activeTab === 'quarters') && (
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch w-full">
              {/* Year Performance - Left Side (Larger Primary KPI) */}
              {(activeTab === 'all' || activeTab === 'year') && (
                <motion.div 
                  className="bg-[#F8FAFC] dark:bg-[#07112F] relative rounded-xl border border-gray-200 dark:border-gray-700 hover:border-slate-300/70 dark:hover:border-slate-500/40 transition-all duration-300 w-full lg:w-[520px] lg:shrink-0"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  whileHover={{ 
                    scale: 1.002,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  {/* Card Header */}
                  <motion.div 
                    className="flex items-center justify-between px-4 sm:px-6 pt-3 sm:pt-4 pb-2 sm:pb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-2">
                      <h4 className="font-['Roboto',sans-serif] font-semibold text-[13px] sm:text-[15px] text-[#000b25] dark:text-gray-100 transition-colors duration-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Year Performance
                      </h4>
                    </div>
                    {/* Achievement Badge */}
                    <motion.div 
                      className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#E0F7F4] dark:bg-emerald-900/30"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        delay: 0.5, 
                        duration: 0.4, 
                        type: "spring", 
                        stiffness: 200 
                      }}
                    >
                      <span className="font-['Roboto',sans-serif] font-bold text-[11px] sm:text-[13px] text-[#009B7B] dark:text-emerald-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {comparisonMode 
                          ? `${formatAchievement(currentFilteredData.year.revenue, currentFilteredData.year.target)}% / ${formatAchievement(filteredComparisonData.year.revenue, filteredComparisonData.year.target)}%`
                          : `${formatAchievement(currentFilteredData.year.revenue, currentFilteredData.year.target)}% Target`
                        }
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* Difference Metrics Box - Top Left Corner (Comparison Mode Only) */}
                  {comparisonMode && (
                    <motion.div
                      className="absolute top-16 left-4 sm:left-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 px-3 py-2 z-10"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.5, duration: 0.4 }}
                    >
                      <div className="flex flex-col gap-1">
                        {/* Value Difference */}
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="font-['Roboto',sans-serif] font-bold text-[13px] text-emerald-600 dark:text-emerald-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                            +9M
                          </span>
                        </div>
                        {/* YoY Percentage */}
                        <div className="flex items-center gap-1.5">
                          <span className="font-['Roboto',sans-serif] font-medium text-[11px] text-gray-600 dark:text-gray-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                            YoY:
                          </span>
                          <span className="font-['Roboto',sans-serif] font-bold text-[11px] text-emerald-600 dark:text-emerald-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                            +12.0%
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Gauge Chart Container */}
                  <div className="px-4 sm:px-6 py-4 sm:py-6 pb-6 sm:pb-8 flex flex-col items-center justify-center min-h-[280px]">
                    <div 
                      className="relative w-full max-w-[340px] h-[140px] sm:h-[170px]" 
                      style={{ overflow: 'visible' }}
                      onMouseEnter={() => setHoveredGauge('year')}
                      onMouseLeave={() => setHoveredGauge(null)}
                    >
                      {/* Hover Tooltip */}
                      {hoveredGauge === 'year' && (
                        <motion.div
                          className="absolute top-[-50px] left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 px-4 py-2.5 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-[100]"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {comparisonMode ? (
                            <div className="flex flex-col gap-2 min-w-[200px]">
                              {/* Current Year Section */}
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#FB923C] to-[#F97316]" />
                                  <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{year}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3 pl-3.5">
                                  <span className="text-xs text-gray-600 dark:text-gray-300">Achieved:</span>
                                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{formatRevenue(currentFilteredData.year.revenue)}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3 pl-3.5">
                                  <span className="text-xs text-gray-600 dark:text-gray-300">Remaining:</span>
                                  <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{formatRevenue(currentFilteredData.year.target - currentFilteredData.year.revenue)}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3 pl-3.5">
                                  <span className="text-xs text-gray-600 dark:text-gray-300">Target:</span>
                                  <span className="text-sm font-bold text-gray-900 dark:text-white">{formatRevenue(currentFilteredData.year.target)}</span>
                                </div>
                              </div>
                              
                              <div className="h-px bg-gray-200 dark:bg-gray-700" />
                              
                              {/* Comparison Year Section */}
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]" />
                                  <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{comparisonYear}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3 pl-3.5">
                                  <span className="text-xs text-gray-600 dark:text-gray-300">Achieved:</span>
                                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{formatRevenue(filteredComparisonData.year.revenue)}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3 pl-3.5">
                                  <span className="text-xs text-gray-600 dark:text-gray-300">Remaining:</span>
                                  <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{formatRevenue(filteredComparisonData.year.target - filteredComparisonData.year.revenue)}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3 pl-3.5">
                                  <span className="text-xs text-gray-600 dark:text-gray-300">Target:</span>
                                  <span className="text-sm font-bold text-gray-900 dark:text-white">{formatRevenue(filteredComparisonData.year.target)}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-1 min-w-[160px]">
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-xs text-gray-600 dark:text-gray-300">Achieved:</span>
                                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">84M</span>
                              </div>
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-xs text-gray-600 dark:text-gray-300">Remaining:</span>
                                <span className="text-sm font-bold text-orange-600 dark:text-orange-400">14M</span>
                              </div>
                              <div className="h-px bg-gray-200 dark:bg-gray-700 my-0.5" />
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-xs text-gray-600 dark:text-gray-300">Target:</span>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">98M</span>
                              </div>
                            </div>
                          )}
                          {/* Arrow */}
                          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45" />
                        </motion.div>
                      )}
                      
                      {/* SVG Gauge - Animated Arcs */}
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                        style={{ overflow: 'visible' }}
                      >
                        <svg className="w-full h-full" viewBox="0 0 414 207" fill="none" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
                          <defs>
                            {/* Outer Arc Gradients - Primary Year (Solid, Bold) */}
                            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_year" x1="207" x2="207" y1="30" y2="207">
                              <stop stopColor="#FED7AA" />
                              <stop offset="1" stopColor="#FDBA74" />
                            </linearGradient>
                            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_year" x1="181" x2="181" y1="30" y2="207">
                              <stop stopColor="#FB923C" />
                              <stop offset="1" stopColor="#F97316" />
                            </linearGradient>
                            {/* Inner Arc Gradient - Comparison Year */}
                            <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_year_comparison" x1="207" x2="207" y1="62" y2="207">
                              <stop stopColor="#DBEAFE" />
                              <stop offset="1" stopColor="#93C5FD" />
                            </linearGradient>
                          </defs>
                          <g>
                            {comparisonMode ? (
                              <g>
                                {/* Outer Arc - Current Year (2024) */}
                                {/* Background arc - outer */}
                                <motion.path 
                                  d={svgPaths.p1978be80} 
                                  stroke="url(#paint0_linear_year)" 
                                  strokeWidth="58"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
                                />
                                {/* Progress arc - outer (current year) */}
                                <motion.path 
                                  d={svgPaths.p2581f440} 
                                  stroke="url(#paint1_linear_year)" 
                                  strokeWidth="58"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ delay: 0.9, duration: 1.5, ease: "easeInOut" }}
                                />
                                
                                {/* Inner Arc - Comparison Year (2023) */}
                                {/* Center: (207, 207), Inner radius: 127, strokeWidth: 25 - scaled from Q1 settings */}
                                {/* Background arc - inner semicircle (light blue, 35% opacity) */}
                                <motion.path 
                                  d="M 80 207 A 127 127 0 0 1 334 207"
                                  stroke="#DBEAFE" 
                                  strokeWidth="25"
                                  strokeLinecap="butt"
                                  fill="none"
                                  strokeOpacity="0.6"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ delay: 0.7, duration: 1.2, ease: "easeInOut" }}
                                />
                                {/* Progress arc - inner (comparison year - 79.8% achievement = 143.64° of 180°) */}
                                <motion.path 
                                  d="M 80 207 A 127 127 0 0 1 284 108"
                                  stroke="url(#paint2_linear_year_comparison)" 
                                  strokeWidth="25"
                                  strokeLinecap="butt"
                                  fill="none"
                                  strokeOpacity="0.9"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ delay: 1.0, duration: 1.5, ease: "easeInOut" }}
                                />
                              </g>
                            ) : (
                              <g>
                                {/* Single Arc Mode - Current Year Only */}
                                <motion.path 
                                  d={svgPaths.p1978be80} 
                                  stroke="url(#paint0_linear_year)" 
                                  strokeWidth="58"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
                                />
                                <motion.path 
                                  d={svgPaths.p2581f440} 
                                  stroke="url(#paint1_linear_year)" 
                                  strokeWidth="58"
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ delay: 0.9, duration: 1.5, ease: "easeInOut" }}
                                />
                              </g>
                            )}
                          </g>
                        </svg>
                      </motion.div>

                      {/* Revenue amount - Counter Animation */}
                      <motion.div 
                        className="absolute inset-[76.35%_32.32%_auto_32.68%]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                      >
                        <div className="flex flex-col items-center gap-0.5">
                          <motion.p 
                            className="font-['Roboto',sans-serif] font-bold text-[32px] sm:text-[40px] leading-[32px] sm:leading-[40px] text-[#000b25] dark:text-gray-100 transition-colors duration-300 whitespace-nowrap" 
                            style={{ fontVariationSettings: "'wdth' 100" }}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.4, duration: 0.4, type: "spring", stiffness: 150 }}
                          >
                            {formatRevenue(currentFilteredData.year.revenue)}
                          </motion.p>
                          {comparisonMode && (
                            <motion.p 
                              className="font-['Roboto',sans-serif] font-medium text-[14px] sm:text-[16px] text-blue-600 dark:text-blue-400 transition-colors duration-300 whitespace-nowrap" 
                              style={{ fontVariationSettings: "'wdth' 100" }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 2.2, duration: 0.4 }}
                            >
                              vs {formatRevenue(filteredComparisonData.year.revenue)}
                            </motion.p>
                          )}
                        </div>
                      </motion.div>

                      {/* Enhanced Legend - Only show in comparison mode */}
                      {comparisonMode && (
                        <motion.div 
                          className="absolute top-[-42px] left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2.3, duration: 0.4 }}
                          style={{ zIndex: 50 }}
                        >
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]" />
                            <span className="font-['Roboto',sans-serif] font-semibold text-[10px] sm:text-[11px] text-gray-700 dark:text-gray-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                              {comparisonYear} ({formatAchievement(filteredComparisonData.year.revenue, filteredComparisonData.year.target)}%)
                            </span>
                          </div>
                          <div className="w-px h-3 bg-gray-300 dark:bg-gray-600" />
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#FB923C] to-[#F97316]" />
                            <span className="font-['Roboto',sans-serif] font-semibold text-[10px] sm:text-[11px] text-gray-700 dark:text-gray-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                              {year} ({formatAchievement(currentFilteredData.year.revenue, currentFilteredData.year.target)}%)
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {/* Scale labels - Fade in */}
                      <motion.div 
                        className="absolute left-[7%] top-[100%] mt-2 -translate-x-1/2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6, duration: 0.5 }}
                      >
                        <p className="font-['Roboto',sans-serif] font-bold text-[12px] sm:text-[14px] leading-[16px] sm:leading-[19.5px] text-[#4a5568] dark:text-gray-300 transition-colors duration-300 whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          0M
                        </p>
                      </motion.div>
                      <motion.div 
                        className="absolute right-[7%] top-[100%] mt-2 translate-x-1/2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.7, duration: 0.5 }}
                      >
                        <p className="font-['Roboto',sans-serif] font-bold text-[12px] sm:text-[14px] leading-[16px] sm:leading-[19.5px] text-[#4a5568] dark:text-gray-300 transition-colors duration-300 whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                          98M
                        </p>
                      </motion.div>

                      {/* Inner Arc Scale labels - Only show in comparison mode */}
                      {comparisonMode && (
                        <span className="contents">
                          <motion.div 
                            className="absolute top-[100%] mt-2 -translate-x-1/2"
                            style={{ left: '19.32%' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.0, duration: 0.5 }}
                          >
                            <p className="font-['Roboto',sans-serif] font-semibold text-[10px] sm:text-[11px] leading-[14px] sm:leading-[15px] text-blue-600 dark:text-blue-400 transition-colors duration-300 whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                              0M
                            </p>
                          </motion.div>
                          <motion.div 
                            className="absolute top-[100%] mt-2 translate-x-1/2"
                            style={{ right: '19.32%' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.1, duration: 0.5 }}
                          >
                            <p className="font-['Roboto',sans-serif] font-semibold text-[10px] sm:text-[11px] leading-[14px] sm:leading-[15px] text-blue-600 dark:text-blue-400 transition-colors duration-300 whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                              94M
                            </p>
                          </motion.div>
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quarterly Performance - Right Side (2x2 Consistent Grid) */}
              {(activeTab === 'all' || activeTab === 'quarters') && (
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { q: 1, label: 'Quarter 1', revenue: '22.1M', target: '25M', achievement: 88.4, compRevenue: 19.5, compAchievement: 78.0, diff: '+2.6M', yoyPct: '+13.3%', isPositive: true, minOffset: '-8.25px', maxOffset: '0px', isCurrent: false },
                    { q: 2, label: 'Quarter 2', revenue: '20.3M', target: '28M', achievement: 72.5, compRevenue: 17.8, compAchievement: 63.6, diff: '+2.5M', yoyPct: '+14.0%', isPositive: true, minOffset: '-8.75px', maxOffset: '8.39px', isCurrent: false },
                    { q: 3, label: 'Quarter 3', revenue: '24.9M', target: '25.8M', achievement: 96.5, compRevenue: 22.1, compAchievement: 85.7, diff: '+2.8M', yoyPct: '+12.7%', isPositive: true, minOffset: '-5.25px', maxOffset: '12.05px', isCurrent: false },
                    { q: 4, label: 'Quarter 4', revenue: '16.7M', target: '30M', achievement: 55.7, compRevenue: 15.6, compAchievement: 52.0, diff: '+1.1M', yoyPct: '+7.1%', isPositive: true, minOffset: '-5.75px', maxOffset: '0px', isCurrent: true }
                  ].map((quarter, index) => (
                    <motion.div
                      key={quarter.q}
                      className={`bg-[#F8FAFC] dark:bg-[#07112F] relative rounded-xl border transition-all duration-300 h-full ${
                        quarter.isCurrent 
                          ? 'border-blue-200/60 dark:border-blue-400/30 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-slate-300/70 dark:hover:border-slate-500/40'
                      }`}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        ease: "easeOut", 
                        delay: 0.2 + (index * 0.1)
                      }}
                      whileHover={{ 
                        scale: 1.005,
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                    >
                      {/* Current Quarter Badge - Top Right */}
                      {quarter.isCurrent && (
                        <motion.div
                          className="absolute -top-2 right-3 z-20"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + (index * 0.1), duration: 0.4, type: "spring", stiffness: 200 }}
                        >
                          <div className="flex items-center gap-1.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-2 py-1 rounded-full border border-blue-200/50 dark:border-blue-400/30">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
                            <span className="font-['Roboto',sans-serif] font-medium text-[9px] text-blue-600 dark:text-blue-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                              Current
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {/* Card Header */}
                      <motion.div 
                        className="flex items-center justify-between px-4 pt-3 pb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + (index * 0.1), duration: 0.3 }}
                      >
                        <h5 className="font-['Roboto',sans-serif] font-semibold text-[13px] text-[#000b25] dark:text-gray-100 transition-colors duration-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                          {quarter.label}
                        </h5>
                        {/* Mini Achievement Badge */}
                        <motion.div 
                          className="px-2 py-0.5 rounded-full bg-[#E0F7F4] dark:bg-emerald-900/30"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            delay: 0.6 + (index * 0.1), 
                            duration: 0.3, 
                            type: "spring", 
                            stiffness: 200 
                          }}
                        >
                          <span className="font-['Roboto',sans-serif] font-bold text-[11px] text-[#009B7B] dark:text-emerald-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                            {comparisonMode ? `${quarter.achievement.toFixed(1)}% / ${quarter.compAchievement.toFixed(1)}%` : `${quarter.achievement.toFixed(1)}%`}
                          </span>
                        </motion.div>
                      </motion.div>

                      {/* Difference Metrics Box - Top Left Corner (Comparison Mode Only) */}
                      {comparisonMode && (
                        <motion.div
                          className="absolute top-14 left-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 px-2 py-1.5 z-10"
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 2.2 + (index * 0.1), duration: 0.4 }}
                        >
                          <div className="flex flex-col gap-0.5">
                            {/* Value Difference */}
                            <div className="flex items-center gap-1">
                              {quarter.isPositive ? (
                                <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              ) : (
                                <TrendingDown className="w-3 h-3 text-red-600 dark:text-red-400" />
                              )}
                              <span className={`font-['Roboto',sans-serif] font-bold text-[11px] ${
                                quarter.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                              }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                                {quarter.diff}
                              </span>
                            </div>
                            {/* YoY Percentage */}
                            <div className="flex items-center gap-1">
                              <span className="font-['Roboto',sans-serif] font-medium text-[9px] text-gray-600 dark:text-gray-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                                YoY:
                              </span>
                              <span className={`font-['Roboto',sans-serif] font-bold text-[9px] ${
                                quarter.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                              }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                                {quarter.yoyPct}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Gauge Chart Container */}
                      <div className="px-4 py-4 pb-6">
                        <div 
                          className="relative w-[200px] h-[100px] mx-auto mb-10" 
                          style={{ overflow: 'visible' }}
                          onMouseEnter={() => setHoveredGauge(`q${quarter.q}` as 'q1' | 'q2' | 'q3' | 'q4')}
                          onMouseLeave={() => setHoveredGauge(null)}
                        >
                          {/* Hover Tooltip */}
                          {hoveredGauge === `q${quarter.q}` && (
                            <motion.div
                              className="absolute top-[-50px] left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-[100]"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {comparisonMode ? (
                                <div className="flex flex-col gap-2 min-w-[180px]">
                                  {/* Current Year Section */}
                                  <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                      <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#FB923C] to-[#F97316]" />
                                      <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{year}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 pl-3.5">
                                      <span className="text-xs text-gray-600 dark:text-gray-300">Achieved:</span>
                                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{quarter.revenue}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 pl-3.5">
                                      <span className="text-xs text-gray-600 dark:text-gray-300">Remaining:</span>
                                      <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                                        {(parseFloat(quarter.target.replace('M', '')) - parseFloat(quarter.revenue.replace('M', ''))).toFixed(1)}M
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 pl-3.5">
                                      <span className="text-xs text-gray-600 dark:text-gray-300">Target:</span>
                                      <span className="text-sm font-bold text-gray-900 dark:text-white">{quarter.target}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="h-px bg-gray-200 dark:bg-gray-700" />
                                  
                                  {/* Comparison Year Section */}
                                  <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                      <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]" />
                                      <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{comparisonYear}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 pl-3.5">
                                      <span className="text-xs text-gray-600 dark:text-gray-300">Achieved:</span>
                                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{quarter.compRevenue}M</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 pl-3.5">
                                      <span className="text-xs text-gray-600 dark:text-gray-300">Remaining:</span>
                                      <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                                        {(parseFloat(quarter.target.replace('M', '')) - quarter.compRevenue).toFixed(1)}M
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 pl-3.5">
                                      <span className="text-xs text-gray-600 dark:text-gray-300">Target:</span>
                                      <span className="text-sm font-bold text-gray-900 dark:text-white">{quarter.target}</span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-col gap-1 min-w-[140px]">
                                  <div className="flex items-center justify-between gap-3">
                                    <span className="text-xs text-gray-600 dark:text-gray-300">Achieved:</span>
                                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{quarter.revenue}</span>
                                  </div>
                                  <div className="flex items-center justify-between gap-3">
                                    <span className="text-xs text-gray-600 dark:text-gray-300">Remaining:</span>
                                    <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                                      {(parseFloat(quarter.target.replace('M', '')) - parseFloat(quarter.revenue.replace('M', ''))).toFixed(1)}M
                                    </span>
                                  </div>
                                  <div className="h-px bg-gray-200 dark:bg-gray-700 my-0.5" />
                                  <div className="flex items-center justify-between gap-3">
                                    <span className="text-xs text-gray-600 dark:text-gray-300">Target:</span>
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">{quarter.target}</span>
                                  </div>
                                </div>
                              )}
                              {/* Arrow */}
                              <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45" />
                            </motion.div>
                          )}
                          
                          {/* SVG Gauge - Animated */}
                          <motion.div 
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + (index * 0.1), duration: 0.5, ease: "easeOut" }}
                            style={{ overflow: 'visible' }}
                          >
                            <svg className="w-full h-full" viewBox="0 0 277 139" fill="none" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
                              <defs>
                                {/* Outer Arc Gradients - Primary Year (Solid, Bold) */}
                                <linearGradient gradientUnits="userSpaceOnUse" id={`paint0_linear_q${quarter.q}`} x1="138.024" x2="138.024" y1="20.0035" y2="138.024">
                                  <stop stopColor="#FED7AA" />
                                  <stop offset="1" stopColor="#FDBA74" />
                                </linearGradient>
                                <linearGradient gradientUnits="userSpaceOnUse" id={`paint1_linear_q${quarter.q}`} x1="120.688" x2="120.688" y1="20.0035" y2="138.024">
                                  <stop stopColor="#FB923C" />
                                  <stop offset="1" stopColor="#F97316" />
                                </linearGradient>
                                {/* Inner Arc Gradient - Comparison Year */}
                                <linearGradient gradientUnits="userSpaceOnUse" id={`paint2_linear_q${quarter.q}_comp`} x1="138.5" x2="138.5" y1="41.5" y2="138.5">
                                  <stop stopColor="#DBEAFE" />
                                  <stop offset="1" stopColor="#93C5FD" />
                                </linearGradient>
                              </defs>
                              <g>
                                {comparisonMode ? (
                                  <g>
                                    {/* Outer Arc - Current Year */}
                                    <motion.path 
                                      d={svgPaths.p3a429a80} 
                                      stroke={`url(#paint0_linear_q${quarter.q})`} 
                                      strokeWidth="38"
                                      initial={{ pathLength: 0, opacity: 0 }}
                                      animate={{ pathLength: 1, opacity: 1 }}
                                      transition={{ delay: 0.7 + (index * 0.1), duration: 0.8, ease: "easeInOut" }}
                                    />
                                    <motion.path 
                                      d={svgPaths.p381947c0} 
                                      stroke={`url(#paint1_linear_q${quarter.q})`} 
                                      strokeWidth="38"
                                      initial={{ pathLength: 0, opacity: 0 }}
                                      animate={{ pathLength: 1, opacity: 1 }}
                                      transition={{ delay: 0.9 + (index * 0.1), duration: 1, ease: "easeInOut" }}
                                    />
                                    
                                    {/* Inner Arc - Comparison Year */}
                                    {/* Center: (138.5, 138.5), Inner radius: 85, strokeWidth: 17 - properly positioned inside outer arc */}
                                    {/* Background arc - inner semicircle (light blue, 30% opacity) */}
                                    <motion.path 
                                      d="M 53.5 138.5 A 85 85 0 0 1 223.5 138.5"
                                      stroke="#DBEAFE" 
                                      strokeWidth="17"
                                      strokeLinecap="butt"
                                      fill="none"
                                      strokeOpacity="0.6"
                                      initial={{ pathLength: 0, opacity: 0 }}
                                      animate={{ pathLength: 1, opacity: 1 }}
                                      transition={{ delay: 0.8 + (index * 0.1), duration: 0.8, ease: "easeInOut" }}
                                    />
                                    {/* Inner progress arc - comparison year achievement on same scale */}
                                    <motion.path 
                                      d={
                                        index === 0 ? "M 53.5 138.5 A 85 85 0 0 1 190 72" : // Q1 78% = 140.4°
                                        index === 1 ? "M 53.5 138.5 A 85 85 0 0 1 174 61" : // Q2 63.6% = 114.48°
                                        index === 2 ? "M 53.5 138.5 A 85 85 0 0 1 215 102" : // Q3 85.7% = 154.26°
                                        "M 53.5 138.5 A 85 85 0 0 1 144 54"                // Q4 52% = 93.6°
                                      }
                                      stroke={`url(#paint2_linear_q${quarter.q}_comp)`} 
                                      strokeWidth="17"
                                      strokeLinecap="butt"
                                      fill="none"
                                      strokeOpacity="0.9"
                                      initial={{ pathLength: 0, opacity: 0 }}
                                      animate={{ pathLength: 1, opacity: 1 }}
                                      transition={{ delay: 1.0 + (index * 0.1), duration: 1, ease: "easeInOut" }}
                                    />
                                  </g>
                                ) : (
                                  <g>
                                    {/* Single Arc Mode - Current Year Only */}
                                    <motion.path 
                                      d={svgPaths.p3a429a80} 
                                      stroke={`url(#paint0_linear_q${quarter.q})`} 
                                      strokeWidth="38"
                                      initial={{ pathLength: 0, opacity: 0 }}
                                      animate={{ pathLength: 1, opacity: 1 }}
                                      transition={{ delay: 0.7 + (index * 0.1), duration: 0.8, ease: "easeInOut" }}
                                    />
                                    <motion.path 
                                      d={svgPaths.p381947c0} 
                                      stroke={`url(#paint1_linear_q${quarter.q})`} 
                                      strokeWidth="38"
                                      initial={{ pathLength: 0, opacity: 0 }}
                                      animate={{ pathLength: 1, opacity: 1 }}
                                      transition={{ delay: 0.9 + (index * 0.1), duration: 1, ease: "easeInOut" }}
                                    />
                                  </g>
                                )}
                              </g>
                            </svg>
                          </motion.div>

                          {/* Revenue amount - Counter Animation */}
                          <motion.div 
                            className="absolute inset-[74.45%_32.32%_auto_32.68%]"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 + (index * 0.1), duration: 0.5, ease: "easeOut" }}
                          >
                            <div className="flex flex-col items-center gap-0">
                              <motion.p 
                                className="font-['Roboto',sans-serif] font-bold text-[24px] leading-[24px] text-[#000b25] dark:text-gray-100 transition-colors duration-300 whitespace-nowrap" 
                                style={{ fontVariationSettings: "'wdth' 100" }}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.2 + (index * 0.1), duration: 0.3, type: "spring", stiffness: 150 }}
                              >
                                {quarter.revenue}
                              </motion.p>
                              {comparisonMode && (
                                <motion.p 
                                  className="font-['Roboto',sans-serif] font-medium text-[11px] text-blue-600 dark:text-blue-400 transition-colors duration-300 whitespace-nowrap" 
                                  style={{ fontVariationSettings: "'wdth' 100" }}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 1.9 + (index * 0.1), duration: 0.3 }}
                                >
                                  vs {(comparisonData.quarters[index].revenue / 1000000).toFixed(1)}M
                                </motion.p>
                              )}
                            </div>
                          </motion.div>

                          {/* Enhanced Legend - Only show in comparison mode */}
                          {comparisonMode && (
                            <motion.div 
                              className="absolute top-[-32px] left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-2 py-1 rounded-md shadow-md border border-gray-200 dark:border-gray-700"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 2.0 + (index * 0.1), duration: 0.3 }}
                              style={{ zIndex: 50 }}
                            >
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]" />
                                <span className="font-['Roboto',sans-serif] font-semibold text-[8px] text-gray-700 dark:text-gray-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                                  {comparisonYear} ({quarter.compAchievement.toFixed(1)}%)
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#FB923C] to-[#F97316]" />
                                <span className="font-['Roboto',sans-serif] font-semibold text-[8px] text-gray-700 dark:text-gray-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                                  {year} ({quarter.achievement.toFixed(1)}%)
                                </span>
                              </div>
                            </motion.div>
                          )}

                          {/* Scale labels - Fade in */}
                          <motion.div 
                            className="absolute left-[7%] top-[100%] mt-2 -translate-x-1/2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4 + (index * 0.1), duration: 0.4 }}
                          >
                            <p className="font-['Roboto',sans-serif] font-bold text-[11px] leading-[18px] text-[#4a5568] dark:text-gray-300 transition-colors duration-300 whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                              0M
                            </p>
                          </motion.div>
                          <motion.div 
                            className="absolute right-[7%] top-[100%] mt-2 translate-x-1/2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 + (index * 0.1), duration: 0.4 }}
                          >
                            <p className="font-['Roboto',sans-serif] font-bold text-[11px] leading-[18px] text-[#4a5568] dark:text-gray-300 transition-colors duration-300 whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                              {quarter.target}
                            </p>
                          </motion.div>

                          {/* Inner Arc Scale labels - Only show in comparison mode */}
                          {comparisonMode && (
                            <span className="contents">
                              <motion.div 
                                className="absolute top-[100%] mt-2 -translate-x-1/2"
                                style={{ left: '19.31%' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.9 + (index * 0.1), duration: 0.4 }}
                              >
                                <p className="font-['Roboto',sans-serif] font-semibold text-[9px] leading-[13px] text-blue-600 dark:text-blue-400 transition-colors duration-300 whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                                  0M
                                </p>
                              </motion.div>
                              <motion.div 
                                className="absolute top-[100%] mt-2 translate-x-1/2"
                                style={{ right: '19.31%' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.0 + (index * 0.1), duration: 0.4 }}
                              >
                                <p className="font-['Roboto',sans-serif] font-semibold text-[9px] leading-[13px] text-blue-600 dark:text-blue-400 transition-colors duration-300 whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                                  {quarter.target}
                                </p>
                              </motion.div>
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Monthly Performance Section */}
          {(activeTab === 'all' || activeTab === 'monthly') && (
            <div className="space-y-3 sm:space-y-4">
              {/* Header with Collapse */}
              <motion.div 
                className="bg-slate-100 dark:bg-gray-800/70 rounded-[8px] border border-slate-200 dark:border-gray-700 transition-colors duration-300 cursor-pointer hover:bg-slate-200/50 dark:hover:bg-gray-800/90"
                onClick={() => setExpandedSections(prev => ({ ...prev, monthly: !prev.monthly }))}
              >
                <div className="flex items-center h-[35px] pl-px pr-[13px] py-px">
                  {/* Blue Vertical Bar */}
                  <div className="flex items-center justify-center h-full w-8">
                    <div className="bg-[#0072ce] dark:bg-blue-400 h-[25px] w-[2px] rounded-full transition-colors duration-300" />
                  </div>
                  
                  {/* Text */}
                  <div className="flex-1">
                    <p className="font-['Roboto',sans-serif] font-medium text-[14px] text-[#000b25] dark:text-gray-200 transition-colors duration-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Monthly Performance
                    </p>
                  </div>
                  
                  {/* Chevron Icon */}
                  <motion.div 
                    className="flex items-center justify-center size-[17.482px]"
                    animate={{ rotate: expandedSections.monthly ? 0 : 180 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <svg className="block size-[13.997px]" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                      <path d="M3.49925 5.24887L6.9985 8.74812L10.4977 5.24887" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.64" strokeWidth="1.16642" className="text-[#000B25] dark:text-gray-400 transition-colors duration-300" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>

              {/* Chart - Animated Expand/Collapse */}
              <motion.div
                initial={false}
                animate={{
                  height: expandedSections.monthly ? "auto" : 0,
                  opacity: expandedSections.monthly ? 1 : 0,
                  marginTop: expandedSections.monthly ? "0.75rem" : 0
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ overflow: "visible" }}
              >
                <div className="bg-[#F8FAFC] dark:bg-[#07112F] rounded-xl border border-[#E2E8F0] dark:border-[#E2E8F0]/20 transition-colors duration-300 pt-[12px] sm:pt-[21px] pr-[12px] sm:pr-[21px] pb-[0px] pl-[12px] sm:pl-[21px]" style={{ overflow: 'visible' }}>
                  <div className="flex gap-3 sm:gap-6 items-start" style={{ paddingTop: '12px', paddingBottom: '12px', overflow: 'visible' }}>
                    {/* Y-axis */}
                    <div className="flex flex-col justify-between h-[140px] sm:h-[166px] py-1">
                      {['10M', '8M', '6M', '4M', '2M', '0'].map((label, i) => (
                        <p key={i} className="font-['Roboto',sans-serif] font-medium text-[11px] sm:text-[13px] text-gray-500 dark:text-gray-400 transition-colors duration-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                          {label}
                        </p>
                      ))}
                    </div>

                    {/* Chart area */}
                    <div className="flex-1 flex flex-col gap-3" style={{ overflow: 'visible' }}>
                      {/* Grid lines and bars */}
                      <div className="relative h-[140px] sm:h-[166px]" style={{ overflow: 'visible' }}>
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-[0.5px] bg-slate-200/70 dark:bg-gray-700/40 w-full transition-colors duration-300" />
                          ))}
                        </div>
                        
                        {/* Bars */}
                        <div className="absolute inset-0 flex gap-2 sm:gap-6 items-end px-1 sm:px-4" style={{ overflow: 'visible' }}>
                          {[
                            { height: 95, value: '3.4M', target: 4.0, revenue: 3.4, compRevenue: 3.0, compTarget: 3.0 },
                            { height: 118, value: '3.9M', target: 4.2, revenue: 3.9, compRevenue: 3.4, compTarget: 3.2 },
                            { height: 54, value: '2.1M', target: 3.8, revenue: 2.1, compRevenue: 1.9, compTarget: 3.5 },
                            { height: 141, value: '4.2M', target: 4.5, revenue: 4.2, compRevenue: 3.7, compTarget: 4.0 },
                            { height: 81, value: '2.8M', target: 3.5, revenue: 2.8, compRevenue: 2.5, compTarget: 3.2 },
                            { height: 118, value: '3.9M', target: 4.0, revenue: 3.9, compRevenue: 3.5, compTarget: 3.8 },
                            { height: 42, value: '1.8M', target: 3.2, revenue: 1.8, compRevenue: 1.6, compTarget: 3.0 },
                            { height: 150, value: '4.5M', target: 4.3, revenue: 4.5, compRevenue: 4.0, compTarget: 4.0 },
                            { height: 165, value: '4.9M', target: 4.6, revenue: 4.9, compRevenue: 4.4, compTarget: 4.2 },
                            { height: 141, value: '4.2M', target: 4.8, revenue: 4.2, compRevenue: 3.8, compTarget: 4.5 }
                          ].map((bar, i) => {
                            const achievement = ((bar.revenue / bar.target) * 100).toFixed(1);
                            const isAboveTarget = bar.revenue >= bar.target;
                            const difference = (bar.revenue - bar.target).toFixed(1);
                            // Calculate target line height (10M = 166px on desktop, 140px on mobile)
                            const maxHeight = typeof window !== 'undefined' && window.innerWidth < 640 ? 140 : 166;
                            const targetLineHeight = (bar.target / 10) * maxHeight;
                            const barHeight = (bar.revenue / 10) * maxHeight;
                            
                            // Calculate month-over-month growth
                            const prevRevenue = i > 0 ? [3.4, 3.9, 2.1, 4.2, 2.8, 3.9, 1.8, 4.5, 4.9, 4.2][i - 1] : bar.revenue;
                            const momGrowth = i > 0 ? (((bar.revenue - prevRevenue) / prevRevenue) * 100).toFixed(1) : '0.0';
                            const isGrowthPositive = parseFloat(momGrowth) >= 0;
                            
                            // Month names
                            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'];
                            
                            // Calculate comparison data
                            const compBarHeight = (bar.compRevenue / 10) * maxHeight;
                            const compTargetLineHeight = (bar.compTarget / 10) * maxHeight;
                            const compAchievement = ((bar.compRevenue / bar.compTarget) * 100).toFixed(1);
                            const isCompAboveTarget = bar.compRevenue >= bar.compTarget;
                            
                            // Calculate YoY growth (Primary year vs Comparison year)
                            const yoyGrowth = bar.compRevenue > 0 ? (((bar.revenue - bar.compRevenue) / bar.compRevenue) * 100).toFixed(1) : '0.0';
                            const isYoyPositive = parseFloat(yoyGrowth) >= 0;
                            
                            return (
                              <div key={i} className="flex-1 relative group/bar cursor-pointer" style={{ overflow: 'visible', zIndex: 1 }}>
                                {comparisonMode ? (
                                  <span className="contents">
                                    {/* Dual Bars Mode */}
                                    <div className="flex gap-0.5 sm:gap-1 h-full">
                                      {/* Comparison Bar (Previous Year) - Left */}
                                      <div className="flex-1 relative" style={{ overflow: 'visible' }}>
                                        {/* Target Background */}
                                        <motion.div
                                          className="absolute bottom-0 rounded-t-lg transition-all duration-300"
                                          style={{ 
                                            left: '0',
                                            right: '0',
                                            height: `${compTargetLineHeight}px`,
                                            backgroundColor: 'rgba(94, 179, 228, 0.15)',
                                            zIndex: 3
                                          }}
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ 
                                            height: expandedSections.monthly ? `${compTargetLineHeight}px` : 0, 
                                            opacity: expandedSections.monthly ? 1 : 0 
                                          }}
                                          transition={{ duration: 0.5, delay: expandedSections.monthly ? i * 0.08 : 0, ease: "easeOut" }}
                                        />
                                        

                                        
                                        {/* Comparison Bar */}
                                        <motion.div
                                          className="absolute bottom-0 left-0 right-0 rounded-t-lg transition-all duration-200 flex flex-col items-center justify-between py-1"
                                          style={{ 
                                            height: `${compBarHeight}px`, 
                                            zIndex: 10,
                                            backgroundColor: '#5EB3E4'
                                          }}
                                          whileHover={{ 
                                            scale: 1.02,
                                            transition: { duration: 0.15 }
                                          }}
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ 
                                            height: expandedSections.monthly ? `${compBarHeight}px` : 0, 
                                            opacity: expandedSections.monthly ? 1 : 0 
                                          }}
                                          transition={{ duration: 0.6, delay: expandedSections.monthly ? i * 0.1 : 0, ease: "easeOut" }}
                                        >
                                          {/* Revenue Value - Top of bar */}
                                          {compBarHeight > 30 && (
                                            <motion.div
                                              className="flex items-center justify-center"
                                              initial={{ opacity: 0, y: -10 }}
                                              animate={{ 
                                                opacity: expandedSections.monthly ? 1 : 0, 
                                                y: expandedSections.monthly ? 0 : -10 
                                              }}
                                              transition={{ duration: 0.4, delay: expandedSections.monthly ? 0.8 + (i * 0.1) : 0, ease: "easeOut" }}
                                            >
                                              <span className="font-['Roboto',sans-serif] font-bold text-[7px] sm:text-[9px] text-white drop-shadow-sm whitespace-nowrap hidden sm:inline" style={{ fontVariationSettings: "'wdth' 100" }}>
                                                {bar.compRevenue}M
                                              </span>
                                            </motion.div>
                                          )}
                                          
                                          {/* Achievement Badge - Bottom of bar */}
                                          {compBarHeight > 45 && (
                                            <motion.div
                                              className="flex items-center justify-center"
                                              initial={{ opacity: 0, scale: 0 }}
                                              animate={{ 
                                                opacity: expandedSections.monthly ? 1 : 0,
                                                scale: expandedSections.monthly ? 1 : 0
                                              }}
                                              transition={{ 
                                                duration: 0.5, 
                                                delay: expandedSections.monthly ? 0.6 + (i * 0.08) : 0,
                                                type: "spring",
                                                stiffness: 200
                                              }}
                                            >
                                              <div className={`px-2 py-1 rounded-full ${
                                                isCompAboveTarget 
                                                  ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700' 
                                                  : 'bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700'
                                              }`}>
                                                <span className={`font-['Roboto',sans-serif] font-bold text-[7px] sm:text-[9px] whitespace-nowrap ${
                                                  isCompAboveTarget 
                                                    ? 'text-green-700 dark:text-green-400' 
                                                    : 'text-orange-700 dark:text-orange-400'
                                                }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                                                  {compAchievement}%
                                                </span>
                                              </div>
                                            </motion.div>
                                          )}
                                        </motion.div>
                                        
                                        {/* Revenue Value - Above bar when too small */}
                                        {compBarHeight <= 30 && (
                                          <motion.div
                                            className="absolute left-1/2 -translate-x-1/2"
                                            style={{ 
                                              bottom: `${compBarHeight + 4}px`,
                                              zIndex: 20
                                            }}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ 
                                              opacity: expandedSections.monthly ? 1 : 0, 
                                              y: expandedSections.monthly ? 0 : 10 
                                            }}
                                            transition={{ duration: 0.4, delay: expandedSections.monthly ? 0.8 + (i * 0.1) : 0, ease: "easeOut" }}
                                          >
                                            <span className="font-['Roboto',sans-serif] font-bold text-[7px] sm:text-[9px] text-[#5EB3E4] dark:text-[#5EB3E4] drop-shadow-sm whitespace-nowrap hidden sm:inline" style={{ fontVariationSettings: "'wdth' 100" }}>
                                              {bar.compRevenue}M
                                            </span>
                                          </motion.div>
                                        )}
                                      </div>
                                      
                                      {/* Primary Bar (Current Year) - Right */}
                                      <div className="flex-1 relative" style={{ overflow: 'visible' }}>
                                        {/* Target Background */}
                                        <motion.div
                                          className="absolute bottom-0 rounded-t-lg transition-all duration-300"
                                          style={{ 
                                            left: '0',
                                            right: '0',
                                            height: `${targetLineHeight}px`,
                                            backgroundColor: 'rgba(0, 119, 200, 0.15)',
                                            zIndex: 3
                                          }}
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ 
                                            height: expandedSections.monthly ? `${targetLineHeight}px` : 0, 
                                            opacity: expandedSections.monthly ? 1 : 0 
                                          }}
                                          transition={{ duration: 0.5, delay: expandedSections.monthly ? i * 0.08 + 0.1 : 0, ease: "easeOut" }}
                                        />
                                        

                                        
                                        {/* Primary Bar */}
                                        <motion.div
                                          className="absolute bottom-0 left-0 right-0 rounded-t-lg transition-all duration-200 flex flex-col items-center justify-between py-1"
                                          style={{ 
                                            height: `${barHeight}px`, 
                                            zIndex: 10,
                                            backgroundColor: '#0077C8'
                                          }}
                                          whileHover={{ 
                                            scale: 1.02,
                                            transition: { duration: 0.15 }
                                          }}
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ 
                                            height: expandedSections.monthly ? `${barHeight}px` : 0, 
                                            opacity: expandedSections.monthly ? 1 : 0 
                                          }}
                                          transition={{ duration: 0.6, delay: expandedSections.monthly ? i * 0.1 + 0.1 : 0, ease: "easeOut" }}
                                        >
                                          {/* Revenue Value - Top of bar */}
                                          {barHeight > 30 && (
                                            <motion.div
                                              className="flex items-center justify-center"
                                              initial={{ opacity: 0, y: -10 }}
                                              animate={{ 
                                                opacity: expandedSections.monthly ? 1 : 0, 
                                                y: expandedSections.monthly ? 0 : -10 
                                              }}
                                              transition={{ duration: 0.4, delay: expandedSections.monthly ? 0.8 + (i * 0.1) : 0, ease: "easeOut" }}
                                            >
                                              <span className="font-['Roboto',sans-serif] font-bold text-[7px] sm:text-[9px] text-white drop-shadow-sm whitespace-nowrap hidden sm:inline" style={{ fontVariationSettings: "'wdth' 100" }}>
                                                {bar.value}
                                              </span>
                                            </motion.div>
                                          )}
                                          
                                          {/* Achievement Badge - Bottom of bar */}
                                          {barHeight > 45 && (
                                            <motion.div
                                              className="flex items-center justify-center"
                                              initial={{ opacity: 0, scale: 0 }}
                                              animate={{ 
                                                opacity: expandedSections.monthly ? 1 : 0,
                                                scale: expandedSections.monthly ? 1 : 0
                                              }}
                                              transition={{ 
                                                duration: 0.5, 
                                                delay: expandedSections.monthly ? 0.6 + (i * 0.08) : 0,
                                                type: "spring",
                                                stiffness: 200
                                              }}
                                            >
                                              <div className={`px-2 py-1 rounded-full ${
                                                isAboveTarget 
                                                  ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700' 
                                                  : 'bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700'
                                              }`}>
                                                <span className={`font-['Roboto',sans-serif] font-bold text-[7px] sm:text-[9px] whitespace-nowrap ${
                                                  isAboveTarget 
                                                    ? 'text-green-700 dark:text-green-400' 
                                                    : 'text-orange-700 dark:text-orange-400'
                                                }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                                                  {achievement}%
                                                </span>
                                              </div>
                                            </motion.div>
                                          )}
                                        </motion.div>
                                        
                                        {/* Revenue Value - Above bar when too small */}
                                        {barHeight <= 30 && (
                                          <motion.div
                                            className="absolute left-1/2 -translate-x-1/2"
                                            style={{ 
                                              bottom: `${barHeight + 4}px`,
                                              zIndex: 20
                                            }}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ 
                                              opacity: expandedSections.monthly ? 1 : 0, 
                                              y: expandedSections.monthly ? 0 : 10 
                                            }}
                                            transition={{ duration: 0.4, delay: expandedSections.monthly ? 0.8 + (i * 0.1) : 0, ease: "easeOut" }}
                                          >
                                            <span className="font-['Roboto',sans-serif] font-bold text-[7px] sm:text-[9px] text-[#0077C8] dark:text-[#5EB3E4] drop-shadow-sm whitespace-nowrap hidden sm:inline" style={{ fontVariationSettings: "'wdth' 100" }}>
                                              {bar.value}
                                            </span>
                                          </motion.div>
                                        )}
                                      </div>
                                    </div>
                                    
                                    {/* YoY Growth Indicator - Above bars in comparison mode */}
                                    <motion.div
                                      className="absolute left-1/2 -translate-x-1/2 hidden sm:block"
                                      style={{ 
                                        bottom: `${Math.max(targetLineHeight, barHeight, compTargetLineHeight, compBarHeight) + 4}px`,
                                        zIndex: 15,
                                      }}
                                      initial={{ opacity: 0, y: -5 }}
                                      animate={{ 
                                        opacity: expandedSections.monthly ? 1 : 0,
                                        y: expandedSections.monthly ? 0 : -5
                                      }}
                                      transition={{ duration: 0.3, delay: expandedSections.monthly ? 0.4 + (i * 0.08) : 0, ease: "easeOut" }}
                                    >
                                      <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                                        isYoyPositive 
                                          ? 'bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700' 
                                          : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
                                      }`}>
                                        {isYoyPositive ? (
                                          <TrendingUp className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                                        ) : (
                                          <TrendingDown className="w-2.5 h-2.5 text-red-600 dark:text-red-400" />
                                        )}
                                        <span className={`font-['Roboto',sans-serif] font-bold text-[9px] whitespace-nowrap ${
                                          isYoyPositive 
                                            ? 'text-emerald-700 dark:text-emerald-400' 
                                            : 'text-red-700 dark:text-red-400'
                                        }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                                          {isYoyPositive ? '+' : ''}{yoyGrowth}%
                                        </span>
                                      </div>
                                    </motion.div>
                                  </span>
                                ) : (
                                  <span className="contents">
                                    {/* Single Bar Mode */}
                                    {/* Target Background Bar with Opacity */}
                                    <motion.div
                                      className="absolute bottom-0 rounded-t-lg transition-all duration-300"
                                      style={{ 
                                        left: '-2px',
                                        right: '-2px',
                                        height: `${targetLineHeight}px`,
                                        backgroundColor: 'rgba(0, 119, 200, 0.15)',
                                        zIndex: 3
                                      }}
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ 
                                        height: expandedSections.monthly ? `${targetLineHeight}px` : 0, 
                                        opacity: expandedSections.monthly ? 1 : 0 
                                      }}
                                      whileHover={{
                                        backgroundColor: 'rgba(0, 119, 200, 0.2)',
                                        transition: { duration: 0.2 }
                                      }}
                                      transition={{ duration: 0.5, delay: expandedSections.monthly ? i * 0.08 : 0, ease: "easeOut" }}
                                    />
                                
                                    {/* Target Value Label - Above Target Bar OR Above Actual Bar if exceeded */}
                                    <motion.div
                                      className="absolute left-1/2 -translate-x-1/2 hidden sm:block"
                                      style={{ 
                                        bottom: `${Math.max(targetLineHeight, barHeight) + 6}px`,
                                        zIndex: 15
                                      }}
                                      initial={{ opacity: 0, y: -5 }}
                                      animate={{ 
                                        opacity: expandedSections.monthly ? 1 : 0,
                                        y: expandedSections.monthly ? 0 : -5
                                      }}
                                      transition={{ duration: 0.3, delay: expandedSections.monthly ? 0.4 + (i * 0.08) : 0, ease: "easeOut" }}
                                    >
                                      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-md border border-gray-200 dark:border-gray-700">
                                        <div className="px-2 py-1">
                                          <span className="font-['Roboto',sans-serif] font-medium text-[10px] text-gray-600 dark:text-gray-300 whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
                                            Target: {bar.target}M
                                          </span>
                                        </div>
                                      </div>
                                    </motion.div>

                                    {/* Bar */}
                                    <motion.div
                                      className="w-full rounded-t-lg transition-all duration-200 relative group cursor-pointer"
                                      style={{ 
                                        height: `${barHeight}px`, 
                                        zIndex: 10, 
                                        overflow: 'visible',
                                        backgroundColor: '#0077C8'
                                      }}
                                      whileHover={{ 
                                        scale: 1.02,
                                        transition: { duration: 0.15 }
                                      }}
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ 
                                        height: expandedSections.monthly ? `${barHeight}px` : 0, 
                                        opacity: expandedSections.monthly ? 1 : 0 
                                      }}
                                      transition={{ duration: 0.6, delay: expandedSections.monthly ? i * 0.1 : 0, ease: "easeOut" }}
                                    >
                                      {/* Revenue Value Inside Bar - Top (Only when tall enough) */}
                                      {barHeight > 30 && (
                                        <motion.div
                                          className="absolute inset-x-0 top-1 sm:top-2 flex items-center justify-center"
                                          initial={{ opacity: 0, y: -10 }}
                                          animate={{ 
                                            opacity: expandedSections.monthly ? 1 : 0, 
                                            y: expandedSections.monthly ? 0 : -10 
                                          }}
                                          transition={{ duration: 0.4, delay: expandedSections.monthly ? 0.8 + (i * 0.1) : 0, ease: "easeOut" }}
                                        >
                                          <span className="font-['Roboto',sans-serif] font-bold text-[9px] sm:text-[11px] text-white drop-shadow-sm whitespace-nowrap hidden sm:inline" style={{ fontVariationSettings: "'wdth' 100" }}>
                                            {bar.value}
                                          </span>
                                        </motion.div>
                                      )}
                                      
                                      {/* Achievement Badge - Inside Bar at Bottom (Smaller on mobile) */}
                                      <motion.div
                                        className="absolute inset-x-0 bottom-1 sm:bottom-2 flex items-center justify-center"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ 
                                          opacity: expandedSections.monthly ? 1 : 0,
                                          scale: expandedSections.monthly ? 1 : 0
                                        }}
                                        transition={{ 
                                          duration: 0.5, 
                                          delay: expandedSections.monthly ? 0.6 + (i * 0.08) : 0,
                                          type: "spring",
                                          stiffness: 200
                                        }}
                                      >
                                        <div className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${
                                          isAboveTarget 
                                            ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700' 
                                            : 'bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700'
                                        }`}>
                                          <span className={`font-['Roboto',sans-serif] font-bold text-[8px] sm:text-[10px] whitespace-nowrap ${
                                            isAboveTarget 
                                              ? 'text-green-700 dark:text-green-400' 
                                              : 'text-orange-700 dark:text-orange-400'
                                          }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                                            {achievement}%
                                          </span>
                                        </div>
                                      </motion.div>
                                    </motion.div>
                                    
                                    {/* Revenue Value - Above bar when too small (Single Mode) */}
                                    {barHeight <= 30 && (
                                      <motion.div
                                        className="absolute left-1/2 -translate-x-1/2"
                                        style={{ 
                                          bottom: `${barHeight + 4}px`,
                                          zIndex: 20
                                        }}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ 
                                          opacity: expandedSections.monthly ? 1 : 0, 
                                          y: expandedSections.monthly ? 0 : 10 
                                        }}
                                        transition={{ duration: 0.4, delay: expandedSections.monthly ? 0.8 + (i * 0.1) : 0, ease: "easeOut" }}
                                      >
                                        <span className="font-['Roboto',sans-serif] font-bold text-[9px] sm:text-[11px] text-[#0077C8] dark:text-[#5EB3E4] drop-shadow-sm whitespace-nowrap hidden sm:inline" style={{ fontVariationSettings: "'wdth' 100" }}>
                                          {bar.value}
                                        </span>
                                      </motion.div>
                                    )}
                                  </span>
                                )}
                                  
                                {/* Enhanced Interactive Tooltip on Hover - Combined for both modes */}
                                <div
                                    className={`absolute bg-white dark:bg-gray-800 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-all duration-200 pointer-events-none ${
                                      i === 0 ? 'left-0 scale-95 group-hover/bar:scale-100' : i === 9 ? 'right-0 scale-95 group-hover/bar:scale-100' : 'left-1/2 -translate-x-1/2 scale-95 group-hover/bar:scale-100'
                                    }`}
                                    style={{
                                      padding: '12px',
                                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15), 0 2px 6px rgba(0, 0, 0, 0.1)',
                                      width: comparisonMode ? '200px' : '180px',
                                      maxWidth: comparisonMode ? '200px' : '180px',
                                      bottom: comparisonMode 
                                        ? `${Math.max(targetLineHeight, barHeight, compTargetLineHeight, compBarHeight) + 40}px`
                                        : `${Math.max(targetLineHeight, barHeight) + 36}px`,
                                      zIndex: 999999,
                                      border: '1px solid rgba(229, 231, 235, 0.5)',
                                      backdropFilter: 'blur(8px)'
                                    }}
                                  >
                                    {/* Month Header */}
                                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                                      <Calendar className="w-4 h-4 text-[#0077C8]" />
                                      <span className="font-['Roboto',sans-serif] font-bold text-[13px] text-[#1F2937] dark:text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
                                        {monthNames[i]}
                                      </span>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                      {comparisonMode ? (
                                        <span className="contents">
                                          {/* Primary Year Section */}
                                          <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 mb-1">
                                              <div className="w-2.5 h-2.5 rounded-full bg-[#0077C8]" />
                                              <span className="font-['Roboto',sans-serif] font-bold text-[10px] text-gray-700 dark:text-gray-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                                                {year}
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between pl-3.5">
                                              <span className="font-['Roboto',sans-serif] font-normal text-[10px] text-gray-600 dark:text-gray-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                                                Revenue
                                              </span>
                                              <span className="font-['Roboto',sans-serif] font-bold text-[11px] text-[#0077C8]" style={{ fontVariationSettings: "'wdth' 100" }}>
                                                ${bar.value}
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between pl-3.5">
                                              <span className="font-['Roboto',sans-serif] font-normal text-[10px] text-gray-600 dark:text-gray-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                                                Target
                                              </span>
                                              <span className="font-['Roboto',sans-serif] font-bold text-[11px] text-gray-500 dark:text-gray-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                                                ${bar.target}M
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between pl-3.5">
                                              <span className="font-['Roboto',sans-serif] font-normal text-[10px] text-gray-600 dark:text-gray-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                                                Achievement
                                              </span>
                                              <span className={`font-['Roboto',sans-serif] font-bold text-[11px] ${
                                                isAboveTarget ? 'text-emerald-600' : 'text-amber-600'
                                              }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                                                {achievement}%
                                              </span>
                                            </div>
                                          </div>
                                          
                                          {/* Divider */}
                                          <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                                          
                                          {/* Comparison Year Section */}
                                          <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 mb-1">
                                              <div className="w-2.5 h-2.5 rounded-full bg-[#5EB3E4]" />
                                              <span className="font-['Roboto',sans-serif] font-bold text-[10px] text-gray-700 dark:text-gray-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                                                {comparisonYear}
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between pl-3.5">
                                              <span className="font-['Roboto',sans-serif] font-normal text-[10px] text-gray-600 dark:text-gray-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                                                Revenue
                                              </span>
                                              <span className="font-['Roboto',sans-serif] font-bold text-[11px] text-[#5EB3E4]" style={{ fontVariationSettings: "'wdth' 100" }}>
                                                ${bar.compRevenue}M
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between pl-3.5">
                                              <span className="font-['Roboto',sans-serif] font-normal text-[10px] text-gray-600 dark:text-gray-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                                                Target
                                              </span>
                                              <span className="font-['Roboto',sans-serif] font-bold text-[11px] text-gray-500 dark:text-gray-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                                                ${bar.compTarget}M
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between pl-3.5">
                                              <span className="font-['Roboto',sans-serif] font-normal text-[10px] text-gray-600 dark:text-gray-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                                                Achievement
                                              </span>
                                              <span className={`font-['Roboto',sans-serif] font-bold text-[11px] ${
                                                isCompAboveTarget ? 'text-emerald-600' : 'text-amber-600'
                                              }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                                                {compAchievement}%
                                              </span>
                                            </div>
                                          </div>
                                          
                                          {/* YoY Growth */}
                                          <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                                          <div className="flex items-center justify-between">
                                            <span className="font-['Roboto',sans-serif] font-normal text-[10px] text-gray-600 dark:text-gray-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                                              YoY Growth
                                            </span>
                                            <div className="flex items-center gap-1">
                                              {isYoyPositive ? (
                                                <TrendingUp className="w-3 h-3 text-emerald-600" />
                                              ) : (
                                                <TrendingDown className="w-3 h-3 text-red-600" />
                                              )}
                                              <span className={`font-['Roboto',sans-serif] font-bold text-[11px] ${
                                                isYoyPositive ? 'text-emerald-600' : 'text-red-600'
                                              }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                                                {isYoyPositive ? '+' : ''}{yoyGrowth}%
                                              </span>
                                            </div>
                                          </div>
                                        </span>
                                      ) : (
                                        <span className="contents">
                                          {/* Single Mode - Original Tooltip */}
                                          <div className="flex items-center justify-between">
                                            <span className="font-['Roboto',sans-serif] font-normal text-[11px] text-gray-600 dark:text-gray-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                                              Target
                                            </span>
                                            <span className="font-['Roboto',sans-serif] font-bold text-[12px] text-gray-500 dark:text-gray-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                                              ${bar.target}M
                                            </span>
                                          </div>

                                          <div className="flex items-center justify-between">
                                            <span className="font-['Roboto',sans-serif] font-normal text-[11px] text-gray-600 dark:text-gray-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                                              Revenue
                                            </span>
                                            <span className="font-['Roboto',sans-serif] font-bold text-[12px] text-[#0077C8] dark:text-[#5EB3E4]" style={{ fontVariationSettings: "'wdth' 100" }}>
                                              ${bar.value}
                                            </span>
                                          </div>

                                          <div className="flex items-center justify-between pt-1.5 border-t border-gray-100 dark:border-gray-700">
                                            <span className="font-['Roboto',sans-serif] font-normal text-[11px] text-gray-600 dark:text-gray-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                                              Achievement
                                            </span>
                                            <div className="flex items-center gap-1">
                                              {isAboveTarget ? (
                                                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                              ) : (
                                                <TrendingDown className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                                              )}
                                              <span className={`font-['Roboto',sans-serif] font-bold text-[12px] ${
                                                isAboveTarget ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                                              }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                                                {achievement}%
                                              </span>
                                            </div>
                                          </div>

                                          {i > 0 && (
                                            <div className="flex items-center justify-between pt-1.5 border-t border-gray-100 dark:border-gray-700">
                                              <span className="font-['Roboto',sans-serif] font-normal text-[11px] text-gray-600 dark:text-gray-400" style={{ fontVariationSettings: "'wdth' 100" }}>
                                                MoM Growth
                                              </span>
                                              <div className="flex items-center gap-1">
                                                {isGrowthPositive ? (
                                                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                                ) : (
                                                  <TrendingDown className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                                                )}
                                                <span className={`font-['Roboto',sans-serif] font-bold text-[12px] ${
                                                  isGrowthPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                                                }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                                                  {isGrowthPositive ? '+' : ''}{momGrowth}%
                                                </span>
                                              </div>
                                            </div>
                                          )}
                                        </span>
                                      )}
                                    </div>

                                    {/* Tooltip Arrow */}
                                    <div 
                                      className="absolute top-full"
                                      style={{
                                        left: i === 0 ? '24px' : i === 9 ? 'auto' : '50%',
                                        right: i === 9 ? '24px' : 'auto',
                                        transform: i === 0 || i === 9 ? 'none' : 'translateX(-50%)'
                                      }}
                                    >
                                      <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }} />
                                    </div>
                                  </div>
                                </div>
                              );
                          })}
                        </div>
                      </div>

                      {/* X-axis labels */}
                      <div className="flex gap-1 sm:gap-3 px-1 sm:px-2" style={{ paddingBottom: '10px' }}>
                        {Array.from({ length: 10 }, (_, i) => (
                          <div key={i} className="flex-1 text-center">
                            <p className="font-['Roboto',sans-serif] font-medium text-[10px] sm:text-[13px] text-gray-500 dark:text-gray-400 transition-colors duration-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                              <span className="hidden sm:inline">Month {i + 1}</span>
                              <span className="sm:hidden">M{i + 1}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      {/* Global Legend - Only show in comparison mode */}
                      {comparisonMode && (
                        <motion.div 
                          className="flex items-center justify-center gap-6 pt-4 pb-2"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8, duration: 0.4 }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-3 bg-[#5EB3E4] rounded" />
                            <span className="font-['Roboto',sans-serif] font-medium text-[11px] sm:text-[12px] text-gray-700 dark:text-gray-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                              Comparison ({comparisonYear})
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-3 bg-[#0077C8] rounded" />
                            <span className="font-['Roboto',sans-serif] font-medium text-[11px] sm:text-[12px] text-gray-700 dark:text-gray-300" style={{ fontVariationSettings: "'wdth' 100" }}>
                              Primary ({year})
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}