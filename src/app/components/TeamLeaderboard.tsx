import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { getAllVerticalManagers, getKAMsByVerticalManager, getAllSeniorManagers, getVMsBySeniorManager, getAllKAMs, getKAMsBySeniorManager, type VerticalManagerData, type UserScope, type KAMData, type SeniorManagerData } from '../utils/scopeResolver';

interface TeamLeaderboardProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTeamMember: string;
  onTeamMemberSelect: (data: any) => void;
  userRole?: string; // To determine if user is GM, Senior Manager, or VM
  viewingAsSM?: UserScope | null; // When GM is viewing a SM's dashboard
  viewingAsVM?: UserScope | null; // When SM or GM is viewing a VM's dashboard
  period?: string;
  quarter?: string;
  selectedSegments?: string[]; // From global filters
  selectedVerticals?: string[]; // From global filters
  onNavigateToCommission?: () => void; // Navigate to commission dashboard
  activeDashboard?: 'commission' | 'performance'; // Current active dashboard
}

export function TeamLeaderboard({ 
  searchQuery, 
  setSearchQuery, 
  selectedTeamMember, 
  onTeamMemberSelect, 
  userRole, 
  viewingAsSM, 
  viewingAsVM,
  period = 'Quarterly',
  quarter = 'Q3',
  selectedSegments = ['All'],
  selectedVerticals = ['All Verticals'],
  onNavigateToCommission,
  activeDashboard = 'performance'
}: TeamLeaderboardProps) {
  const [sortBy, setSortBy] = useState('Overall Achievement');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all'); // all | achieved | not-met
  const [activeTab, setActiveTab] = useState('seniors'); // Tab state for GM view: seniors | verticals | kams
  const [smActiveTab, setSMActiveTab] = useState('verticals'); // Tab state for SM view: verticals | kams
  const itemsPerPage = 4;

  // Generate seasonal variation for achievement percentages
  const applySeasonalVariation = (base: number): number => {
    let seasonalMultiplier = 1;
    
    switch (quarter) {
      case 'Q1':
        seasonalMultiplier = 0.90;
        break;
      case 'Q2':
        seasonalMultiplier = 0.95;
        break;
      case 'Q3':
        seasonalMultiplier = 1.0;
        break;
      case 'Q4':
        seasonalMultiplier = 1.08;
        break;
    }
    
    if (period === 'Monthly') {
      seasonalMultiplier *= 0.93;
    } else if (period === 'Yearly') {
      seasonalMultiplier *= 1.05;
    }
    
    return Math.round(base * seasonalMultiplier * 100) / 100;
  };

  // For General Manager (not viewing as SM or VM), show Senior Managers
  const isGeneralManager = userRole === 'General Manager' && !viewingAsSM && !viewingAsVM;
  // For Senior Manager (or GM viewing as SM, not viewing as VM), show Vertical Managers
  const isSeniorManagerLevel = (userRole === 'Senior Manager' || viewingAsSM) && !viewingAsVM;
  
  // Senior Managers for GM view
  const seniorManagers = useMemo(() => {
    if (!isGeneralManager) return [];
    
    const sms = getAllSeniorManagers();
    
    // Add mock performance data for each SM with seasonal variations (10 Senior Managers)
    const baseAchievements = [92, 88, 85, 87, 90, 84, 91, 86, 89, 83];
    const mockChanges = ['+14.2%', '+11.8%', '+8.5%', '+10.1%', '+12.3%', '+9.7%', '+13.1%', '+10.5%', '+11.9%', '+8.8%'];
    const mockPayouts = ['2,845 OMR', '2,556 OMR', '2,187 OMR', '2,389 OMR', '2,634 OMR', '2,421 OMR', '2,758 OMR', '2,498 OMR', '2,612 OMR', '2,345 OMR'];
    
    return sms.map((sm, index) => {
      const achievement = applySeasonalVariation(baseAchievements[index] || 85);
      return {
        id: index + 1,
        name: sm.name,
        managerId: sm.managerId,
        role: 'Senior Manager',
        segment: sm.segment,
        verticals: ['All Verticals'], // SMs manage all verticals in their segment
        avatar: sm.avatar,
        achievement,
        change: mockChanges[index] || '+10%',
        payout: mockPayouts[index] || '2,450 OMR',
        rank: index + 1,
        isTopPerformer: index === 0,
        isBottomPerformer: index === 2,
        status: (achievement < 80) ? 'not-met' as const : 'achieved' as const,
      };
    });
  }, [isGeneralManager, period, quarter]);
  
  // All Vertical Managers for GM view (when GM wants to see all VMs across all SMs)
  const gmAllVerticals = useMemo(() => {
    if (!isGeneralManager) return [];
    
    const vms = getAllVerticalManagers();
    
    // Add mock performance data for each VM with seasonal variations (28 Vertical Managers)
    const baseAchievements = [90, 84, 78, 88, 82, 86, 79, 92, 81, 85, 77, 89, 83, 87, 80, 91, 76, 88, 84, 82, 79, 93, 81, 86, 78, 85, 80, 87];
    const mockChanges = ['+12.2%', '+7.8%', '+5.5%', '+9.1%', '+6.3%', '+8.2%', '+4.8%', '+13.5%', '+7.1%', '+9.8%', '+5.2%', '+11.4%', '+8.3%', '+10.2%', '+6.7%', '+12.8%', '+4.5%', '+10.9%', '+8.5%', '+7.4%', '+5.8%', '+14.2%', '+7.6%', '+9.3%', '+5.9%', '+9.7%', '+6.8%', '+10.4%'];
    const mockPayouts = ['1,245 OMR', '1,156 OMR', '987 OMR', '1,089 OMR', '1,034 OMR', '1,178 OMR', '956 OMR', '1,312 OMR', '1,023 OMR', '1,198 OMR', '934 OMR', '1,267 OMR', '1,067 OMR', '1,221 OMR', '1,012 OMR', '1,289 OMR', '923 OMR', '1,234 OMR', '1,145 OMR', '1,078 OMR', '978 OMR', '1,334 OMR', '1,045 OMR', '1,189 OMR', '989 OMR', '1,212 OMR', '1,023 OMR', '1,198 OMR'];
    
    return vms.map((vm, index) => {
      const achievement = applySeasonalVariation(baseAchievements[index] || 80);
      return {
        id: index + 1,
        name: vm.name,
        managerId: vm.managerId,
        role: 'Vertical Manager',
        segment: vm.segment,
        verticals: vm.verticals,
        avatar: vm.avatar,
        achievement,
        change: mockChanges[index] || '+7%',
        payout: mockPayouts[index] || '1,000 OMR',
        rank: index + 1,
        isTopPerformer: index === 7,
        isBottomPerformer: index === 10,
        status: achievement >= 80 ? 'achieved' as const : 'not-met' as const,
        vertical: vm.verticals[0] || ''
      };
    });
  }, [isGeneralManager, period, quarter]);
  
  // All KAMs for GM view (when GM wants to see all KAMs across all VMs)
  const gmAllKAMs = useMemo(() => {
    if (!isGeneralManager) return [];
    
    const kams = getAllKAMs();
    
    // Add mock performance data for each KAM with seasonal variations (68 KAMs)
    const baseAchievements = [90, 84, 68, 95, 75, 82, 78, 55, 69, 73, 88, 91, 62, 85, 79, 71, 93, 66, 87, 74, 81, 58, 89, 76, 94, 67, 83, 72, 86, 64, 92, 77, 59, 80, 70, 96, 63, 88, 75, 84, 68, 90, 73, 78, 65, 87, 71, 82, 76, 89, 69, 85, 72, 91, 67, 83, 74, 88, 70, 86, 73, 92, 68, 84, 75, 90, 71, 87];
    const mockChanges = ['+12.2%', '+7.8%', '+9.1%', '-2.5%', '+10.2%', '+5.3%', '+8.7%', '+15.2%', '+3.8%', '+4.2%', '+11.5%', '+13.1%', '+6.4%', '+9.8%', '+7.2%', '+4.9%', '+14.3%', '+5.8%', '+10.7%', '+6.1%', '+8.4%', '+3.2%', '+12.6%', '+7.5%', '+15.8%', '+5.1%', '+9.3%', '+6.8%', '+11.2%', '+4.5%', '+13.9%', '+7.9%', '+3.5%', '+8.9%', '+5.7%', '+16.4%', '+4.3%', '+10.9%', '+6.5%', '+9.5%', '+5.9%', '+12.1%', '+7.3%', '+8.2%', '+4.7%', '+10.5%', '+6.2%', '+8.8%', '+7.1%', '+12.3%', '+5.4%', '+9.7%', '+6.9%', '+13.2%', '+5.2%', '+9.1%', '+7.4%', '+11.6%', '+5.8%', '+10.3%', '+7.0%', '+13.7%', '+5.6%', '+9.4%', '+7.5%', '+12.0%', '+6.1%', '+10.8%'];
    const mockPayouts = ['942 OMR', '365 OMR', '547 OMR', '112 OMR', '879 OMR', '623 OMR', '534 OMR', '423 OMR', '387 OMR', '456 OMR', '789 OMR', '912 OMR', '298 OMR', '734 OMR', '567 OMR', '445 OMR', '856 OMR', '321 OMR', '678 OMR', '498 OMR', '601 OMR', '267 OMR', '823 OMR', '512 OMR', '934 OMR', '334 OMR', '712 OMR', '467 OMR', '756 OMR', '312 OMR', '878 OMR', '545 OMR', '289 OMR', '645 OMR', '423 OMR', '967 OMR', '301 OMR', '789 OMR', '523 OMR', '698 OMR', '378 OMR', '834 OMR', '489 OMR', '612 OMR', '345 OMR', '745 OMR', '456 OMR', '723 OMR', '512 OMR', '821 OMR', '398 OMR', '689 OMR', '476 OMR', '856 OMR', '334 OMR', '698 OMR', '523 OMR', '778 OMR', '412 OMR', '756 OMR', '489 OMR', '889 OMR', '356 OMR', '712 OMR', '534 OMR', '845 OMR', '423 OMR', '767 OMR'];
    
    return kams.map((kam, index) => {
      const achievement = applySeasonalVariation(baseAchievements[index] || 75);
      return {
        id: index + 1,
        kamId: kam.id,
        name: kam.name,
        role: kam.role,
        avatar: kam.avatar,
        achievement,
        change: mockChanges[index] || '+5%',
        payout: mockPayouts[index] || '500 OMR',
        rank: index + 1,
        isTopPerformer: index === 35,
        isBottomPerformer: index === 7,
        status: achievement >= 70 ? 'achieved' as const : 'not-met' as const,
        vertical: kam.vertical,
        segment: kam.segment
      };
    });
  }, [isGeneralManager, period, quarter]);
  
  const verticalManagers = useMemo(() => {
    if (!isSeniorManagerLevel) return [];
    
    // If viewing as SM, get VMs for that SM; otherwise get all VMs
    const vms = viewingAsSM 
      ? getVMsBySeniorManager(viewingAsSM.managerId)
      : getAllVerticalManagers();
    
    // Add mock performance data for each VM with seasonal variations
    const baseAchievements = [90, 84, 78, 88, 82];
    return vms.map((vm, index) => {
      const achievement = applySeasonalVariation(baseAchievements[index] || 75);
      return {
        id: index + 1,
        name: vm.name,
        managerId: vm.managerId,
        role: 'Vertical Manager',
        segment: vm.segment,
        verticals: vm.verticals,
        avatar: vm.avatar,
        achievement,
        change: ['+12.2%', '+7.8%', '+5.5%', '+9.1%', '+6.3%'][index] || '+5%',
        payout: ['1,245 OMR', '1,156 OMR', '987 OMR', '1,089 OMR', '1,034 OMR'][index] || '950 OMR',
        rank: index + 1,
        isTopPerformer: index === 0,
        isBottomPerformer: index === 2,
        status: achievement >= 80 ? 'achieved' as const : 'not-met' as const,
        vertical: vm.verticals[0] || ''
      };
    });
  }, [isSeniorManagerLevel, viewingAsSM, period, quarter]);

  // KAMs for a specific VM (when viewing as VM)
  const kamMembers = useMemo(() => {
    if (!viewingAsVM) return [];
    
    const kams = getKAMsByVerticalManager(viewingAsVM.managerId);
    
    // Add mock performance data for each KAM with seasonal variations
    const baseAchievements = [90, 84, 68, 95, 75, 82, 78, 55, 69, 73];
    const mockChanges = ['+12.2%', '+7.8%', '+9.1%', '-2.5%', '+10.2%', '+5.3%', '+8.7%', '+15.2%', '+3.8%', '+4.2%'];
    const mockPayouts = ['942 OMR', '365 OMR', '547 OMR', '112 OMR', '879 OMR', '623 OMR', '534 OMR', '423 OMR', '387 OMR', '456 OMR'];
    
    // Create base members array
    const members = kams.map((kam, index) => {
      const achievement = applySeasonalVariation(baseAchievements[index] || 75);
      return {
        id: index + 1,
        kamId: kam.id,
        name: kam.name,
        role: kam.role,
        avatar: kam.avatar,
        achievement,
        change: mockChanges[index] || '+5%',
        payout: mockPayouts[index] || '500 OMR',
        rank: index + 1,
        isTopPerformer: false,
        status: achievement >= 70 ? 'achieved' as const : 'not-met' as const,
        vertical: kam.vertical,
        segment: kam.segment,
        isBottomPerformer: false
      };
    });
    
    // Find top and bottom performers
    if (members.length > 0) {
      const topIndex = members.reduce((maxIdx, curr, idx, arr) => 
        curr.achievement > arr[maxIdx].achievement ? idx : maxIdx, 0);
      const bottomIndex = members.reduce((minIdx, curr, idx, arr) => 
        curr.achievement < arr[minIdx].achievement ? idx : minIdx, 0);
      
      members[topIndex].isTopPerformer = true;
      members[bottomIndex].isBottomPerformer = true;
    }
    
    return members;
  }, [viewingAsVM, period, quarter]);

  // All KAMs for SM view (when SM views all KAMs across their VMs)
  const smAllKAMs = useMemo(() => {
    if (!isSeniorManagerLevel || !viewingAsSM) return [];
    
    const kams = getKAMsBySeniorManager(viewingAsSM.managerId);
    
    // Add mock performance data for each KAM with seasonal variations
    const baseAchievements = [90, 84, 68, 95, 75, 82, 78, 55, 69, 73, 88, 91, 62, 85, 79, 71, 93, 66, 87, 74, 81, 58];
    const mockChanges = ['+12.2%', '+7.8%', '+9.1%', '-2.5%', '+10.2%', '+5.3%', '+8.7%', '+15.2%', '+3.8%', '+4.2%', '+11.5%', '+13.1%', '+6.4%', '+9.8%', '+7.2%', '+4.9%', '+14.3%', '+5.8%', '+10.7%', '+6.1%', '+8.4%', '+3.2%'];
    const mockPayouts = ['942 OMR', '365 OMR', '547 OMR', '112 OMR', '879 OMR', '623 OMR', '534 OMR', '423 OMR', '387 OMR', '456 OMR', '789 OMR', '912 OMR', '298 OMR', '734 OMR', '567 OMR', '445 OMR', '856 OMR', '321 OMR', '678 OMR', '498 OMR', '601 OMR', '267 OMR'];
    
    return kams.map((kam, index) => {
      const achievement = applySeasonalVariation(baseAchievements[index] || 75);
      return {
        id: index + 1,
        kamId: kam.id,
        name: kam.name,
        role: kam.role,
        avatar: kam.avatar,
        achievement,
        change: mockChanges[index] || '+5%',
        payout: mockPayouts[index] || '500 OMR',
        rank: index + 1,
        isTopPerformer: index === 3,
        isBottomPerformer: index === 7,
        status: achievement >= 70 ? 'achieved' as const : 'not-met' as const,
        vertical: kam.vertical,
        segment: kam.segment
      };
    });
  }, [isSeniorManagerLevel, viewingAsSM, period, quarter]);

  // Determine which data to show based on context and active tab
  const teamMembers = isGeneralManager 
    ? (activeTab === 'verticals' ? gmAllVerticals : activeTab === 'kams' ? gmAllKAMs : seniorManagers)
    : isSeniorManagerLevel 
      ? (smActiveTab === 'verticals' ? verticalManagers : smAllKAMs)
      : (viewingAsVM ? kamMembers : [
        {
          id: 1,
          name: 'Ahmed Al-Rashid',
          role: 'Key Account Manager',
          avatar: 'A',
          achievement: 90,
          change: '+12.2%',
          payout: '942 OMR',
          rank: 1,
          isTopPerformer: true,
          status: 'achieved' as const,
          vertical: 'Government & Finance'
        },
        {
          id: 2,
          name: 'Fatima Al-Zahra',
          role: 'Key Account Manager',
          avatar: 'F',
          achievement: 84,
          change: '+7.8%',
          payout: '365 OMR',
          rank: 2,
          status: 'achieved' as const,
          vertical: 'Enterprise'
        },
        {
          id: 3,
          name: 'Mohamed Al-Balushi',
          role: 'Key Account Manager',
          avatar: 'M',
          achievement: 68,
          change: '+9.1%',
          payout: '547 OMR',
          rank: 3,
          status: 'not-met' as const,
          vertical: 'Government & Finance'
        },
        {
          id: 4,
          name: 'Sarah Al-Kindi',
          role: 'Key Account Manager',
          avatar: 'S',
          achievement: 95,
          change: '-2.5%',
          payout: '112 OMR',
          rank: 4,
          status: 'achieved' as const,
          vertical: 'Oil & Gas'
        },
        {
          id: 5,
          name: 'Michael Chen',
          role: 'Key Account Manager',
          avatar: 'M',
          achievement: 75,
          change: '+10.2%',
          payout: '879 OMR',
          rank: 5,
          status: 'achieved' as const,
          vertical: 'Banking'
        },
        {
          id: 6,
          name: 'Layla Al-Zahra',
          role: 'Key Account Manager',
          avatar: 'L',
          achievement: 82,
          change: '+5.3%',
          payout: '623 OMR',
          rank: 6,
          status: 'achieved' as const,
          vertical: 'Healthcare'
        },
        {
          id: 7,
          name: 'Omar Al-Rashid',
          role: 'Key Account Manager',
          avatar: 'O',
          achievement: 78,
          change: '+8.7%',
          payout: '534 OMR',
          rank: 7,
          status: 'achieved' as const,
          vertical: 'Government & Finance'
        },
        {
          id: 8,
          name: 'Aisha Al-Balushi',
          role: 'Key Account Manager',
          avatar: 'A',
          achievement: 55,
          change: '+15.2%',
          payout: '423 OMR',
          rank: 8,
          status: 'not-met' as const,
          vertical: 'Enterprise',
          isBottomPerformer: true
        },
        {
          id: 9,
          name: 'Hassan Al-Kindi',
          role: 'Key Account Manager',
          avatar: 'H',
          achievement: 69,
          change: '+3.8%',
          payout: '387 OMR',
          rank: 9,
          status: 'not-met' as const,
          vertical: 'Government & Finance'
        },
        {
          id: 10,
          name: 'Maryam Al-Said',
          role: 'Key Account Manager',
          avatar: 'M',
          achievement: 67,
          change: '+7.1%',
          payout: '298 OMR',
          rank: 10,
          status: 'not-met' as const,
          vertical: 'Retail'
        }
      ]);

  // Calculate stats - dynamically find top and bottom performers from current teamMembers
  const passedCount = teamMembers.filter(m => m.status === 'achieved').length;
  const notMetCount = teamMembers.filter(m => m.status === 'not-met').length;
  
  // Dynamically find top and bottom performers based on achievement scores
  const topPerformer = teamMembers.length > 0 
    ? teamMembers.reduce((max, member) => member.achievement > max.achievement ? member : max, teamMembers[0])
    : null;
  
  const bottomPerformer = teamMembers.length > 0
    ? teamMembers.reduce((min, member) => member.achievement < min.achievement ? member : min, teamMembers[0])
    : null;

  const filteredMembers = useMemo(() => {
    let filtered = teamMembers.filter(member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply status filter
    if (statusFilter === 'achieved') {
      filtered = filtered.filter(m => m.status === 'achieved');
    } else if (statusFilter === 'not-met') {
      filtered = filtered.filter(m => m.status === 'not-met');
    }

    // Apply segment filter from global filters
    if (selectedSegments && selectedSegments.length > 0 && !selectedSegments.includes('All')) {
      filtered = filtered.filter(m => {
        // Handle SME Business grouping
        const memberSegment = m.segment || '';
        const isSMESegment = memberSegment.includes('SME');
        
        if (selectedSegments.includes('SME Business') && isSMESegment) {
          return true;
        }
        return selectedSegments.includes(memberSegment);
      });
    }

    // Apply vertical filter from global filters
    if (selectedVerticals && selectedVerticals.length > 0 && !selectedVerticals.includes('All Verticals')) {
      filtered = filtered.filter(m => {
        const memberVertical = m.vertical || (m.verticals && m.verticals[0]) || '';
        // Also check if verticals array contains the selected vertical
        if (m.verticals && Array.isArray(m.verticals)) {
          return m.verticals.some(v => selectedVerticals.includes(v));
        }
        return selectedVerticals.includes(memberVertical);
      });
    }

    return filtered;
  }, [searchQuery, statusFilter, teamMembers, selectedSegments, selectedVerticals]);

  const sortedMembers = useMemo(() => {
    return [...filteredMembers].sort((a, b) => {
      switch (sortBy) {
        case 'Overall Achievement':
          return b.achievement - a.achievement;
        case 'Name':
          return a.name.localeCompare(b.name);
        case 'Payout':
          return parseInt(b.payout) - parseInt(a.payout);
        default:
          return 0;
      }
    });
  }, [filteredMembers, sortBy]);

  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedMembers.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedMembers, currentPage]);

  const totalPages = Math.ceil(sortedMembers.length / itemsPerPage);

  const CircularProgress = ({ value }: { value: number }) => (
    <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-gray-200 dark:text-gray-700 transition-colors duration-300"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${value * 2.83} 283`}
          strokeLinecap="round"
          className="text-blue-600 dark:text-blue-400 transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-blue-600 dark:text-blue-400 font-medium text-xs sm:text-sm transition-colors duration-300">{value}%</span>
      </div>
    </div>
  );

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col dark:border-gray-700/40 transition-colors duration-300">
      <CardHeader className="pb-[0px] px-4 pt-[14px] flex-shrink-0 pr-[14px] pl-[14px]">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30 transition-colors duration-300">
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400 transition-colors duration-300" />
            </div>
            <span className="widget-title">
              Team Performance Leaderboard
              <span className="contents">
                <Badge className="ml-3 px-2.5 py-1 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/60 shadow-sm font-semibold">
                  {viewingAsVM 
                    ? viewingAsVM.segment 
                    : (viewingAsSM?.segment 
                      || ((selectedSegments && selectedSegments.length > 0 && !selectedSegments.includes('All'))
                        ? selectedSegments.join(', ')
                        : 'All Segments'))
                  }
                </Badge>
                <Badge className="ml-2 px-2.5 py-1 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/40 dark:to-purple-800/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/60 shadow-sm font-semibold">
                  {viewingAsVM 
                    ? viewingAsVM.verticals[0]
                    : (viewingAsSM?.verticals?.[0]
                      || ((selectedVerticals && selectedVerticals.length > 0 && !selectedVerticals.includes('All Verticals'))
                        ? selectedVerticals.join(', ')
                        : 'All Verticals'))
                  }
                </Badge>
              </span>
            </span>
          </CardTitle>
          
          {/* Stats Chips */}
          <div className="flex items-center gap-2">
            <Badge className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700/50 px-2 py-1">
              Achieved: {passedCount}
            </Badge>
            <Badge className="bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600/50 px-2 py-1">
              Not Met: {notMetCount}
            </Badge>
          </div>
        </div>

        {/* Total Payout & Top/Bottom Performers */}
        <div className="mt-3">
          {/* All Cards in One Row */}
          <div className={`grid grid-cols-1 ${activeDashboard === 'commission' ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-2`}>
            {/* Total Payout Card */}
            {activeDashboard === 'commission' && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg p-2 border border-indigo-200 dark:border-indigo-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                    <p className="text-sm text-indigo-600 dark:text-indigo-400">Total Payout</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-indigo-900 dark:text-indigo-100 text-sm">
                      {(() => {
                        // Parse payout string like "2,845 OMR" to number
                        const parsePayout = (payoutStr: string): number => {
                          return parseFloat(payoutStr.replace(/,/g, '').replace(' OMR', ''));
                        };
                        
                        // Calculate total from filtered members
                        const total = filteredMembers.reduce((sum, member) => {
                          return sum + parsePayout(member.payout);
                        }, 0);
                        
                        // Format total with commas
                        const formatTotal = (num: number): string => {
                          return num.toLocaleString('en-US', { maximumFractionDigits: 0 });
                        };
                        
                        return `${formatTotal(total)} OMR`;
                      })()}
                    </p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400">
                      {filteredMembers.length} {filteredMembers.length === 1 ? 'Member' : 'Members'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Top Performer */}
            {topPerformer && (
              <div 
                onClick={() => {
                  // Determine the navigation based on current view context
                  if (isGeneralManager) {
                    if (activeTab === 'seniors' && 'managerId' in topPerformer) {
                      // Navigate to Senior Manager's dashboard with high performance
                      onTeamMemberSelect({
                        managerId: topPerformer.managerId,
                        name: topPerformer.name,
                        role: 'Senior Manager',
                        segment: topPerformer.segment,
                        verticals: topPerformer.verticals,
                        avatar: topPerformer.avatar,
                        performanceLevel: 'high',
                        achievement: topPerformer.achievement
                      });
                    } else if (activeTab === 'verticals' && 'managerId' in topPerformer) {
                      // Navigate to Vertical Manager's dashboard with high performance
                      onTeamMemberSelect({
                        managerId: topPerformer.managerId,
                        name: topPerformer.name,
                        role: 'Vertical Manager',
                        segment: topPerformer.segment,
                        verticals: topPerformer.verticals,
                        avatar: topPerformer.avatar,
                        performanceLevel: 'high',
                        achievement: topPerformer.achievement
                      });
                    } else if (activeTab === 'kams' && 'kamId' in topPerformer) {
                      // Navigate to KAM's dashboard with high performance
                      onTeamMemberSelect({
                        kamId: topPerformer.kamId.toString(),
                        id: topPerformer.id,
                        name: topPerformer.name,
                        role: topPerformer.role,
                        vertical: topPerformer.vertical || '',
                        segment: topPerformer.segment,
                        avatar: topPerformer.avatar,
                        performanceLevel: 'high',
                        achievement: topPerformer.achievement
                      });
                    }
                  } else if (isSeniorManagerLevel) {
                    if (smActiveTab === 'verticals' && 'managerId' in topPerformer) {
                      // Navigate to Vertical Manager's dashboard with high performance
                      onTeamMemberSelect({
                        managerId: topPerformer.managerId,
                        name: topPerformer.name,
                        role: 'Vertical Manager',
                        segment: topPerformer.segment,
                        verticals: topPerformer.verticals,
                        avatar: topPerformer.avatar,
                        performanceLevel: 'high',
                        achievement: topPerformer.achievement
                      });
                    } else if (smActiveTab === 'kams' && 'kamId' in topPerformer) {
                      // Navigate to KAM's dashboard with high performance
                      onTeamMemberSelect({
                        kamId: topPerformer.kamId.toString(),
                        id: topPerformer.id,
                        name: topPerformer.name,
                        role: topPerformer.role,
                        vertical: topPerformer.vertical || '',
                        segment: topPerformer.segment,
                        avatar: topPerformer.avatar,
                        performanceLevel: 'high',
                        achievement: topPerformer.achievement
                      });
                    }
                  } else if (viewingAsVM && 'kamId' in topPerformer) {
                    // Navigate to KAM's dashboard with high performance
                    onTeamMemberSelect({
                      kamId: topPerformer.kamId.toString(),
                      id: topPerformer.id,
                      name: topPerformer.name,
                      role: topPerformer.role,
                      vertical: topPerformer.vertical || '',
                      segment: topPerformer.segment,
                      avatar: topPerformer.avatar,
                      performanceLevel: 'high',
                      achievement: topPerformer.achievement
                    });
                  }
                }}
                className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 border border-green-200 dark:border-green-700/50 cursor-pointer transition-all duration-200 hover:shadow-sm hover:scale-[1.01] hover:border-green-300 dark:hover:border-green-600"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <p className="text-sm text-green-600 dark:text-green-400">Top Performer</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">{topPerformer.name}</p>
                    {activeDashboard === 'commission' && (
                      <p className="text-xs text-green-600 dark:text-green-400">{topPerformer.payout}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Performer */}
            {bottomPerformer && (
              <div 
                onClick={() => {
                  // Determine the navigation based on current view context
                  if (isGeneralManager) {
                    if (activeTab === 'seniors' && 'managerId' in bottomPerformer) {
                      // Navigate to Senior Manager's dashboard with low performance
                      onTeamMemberSelect({
                        managerId: bottomPerformer.managerId,
                        name: bottomPerformer.name,
                        role: 'Senior Manager',
                        segment: bottomPerformer.segment,
                        verticals: bottomPerformer.verticals,
                        avatar: bottomPerformer.avatar,
                        performanceLevel: 'low',
                        achievement: bottomPerformer.achievement
                      });
                    } else if (activeTab === 'verticals' && 'managerId' in bottomPerformer) {
                      // Navigate to Vertical Manager's dashboard with low performance
                      onTeamMemberSelect({
                        managerId: bottomPerformer.managerId,
                        name: bottomPerformer.name,
                        role: 'Vertical Manager',
                        segment: bottomPerformer.segment,
                        verticals: bottomPerformer.verticals,
                        avatar: bottomPerformer.avatar,
                        performanceLevel: 'low',
                        achievement: bottomPerformer.achievement
                      });
                    } else if (activeTab === 'kams' && 'kamId' in bottomPerformer) {
                      // Navigate to KAM's dashboard with low performance
                      onTeamMemberSelect({
                        kamId: bottomPerformer.kamId.toString(),
                        id: bottomPerformer.id,
                        name: bottomPerformer.name,
                        role: bottomPerformer.role,
                        vertical: bottomPerformer.vertical || '',
                        segment: bottomPerformer.segment,
                        avatar: bottomPerformer.avatar,
                        performanceLevel: 'low',
                        achievement: bottomPerformer.achievement
                      });
                    }
                  } else if (isSeniorManagerLevel) {
                    if (smActiveTab === 'verticals' && 'managerId' in bottomPerformer) {
                      // Navigate to Vertical Manager's dashboard with low performance
                      onTeamMemberSelect({
                        managerId: bottomPerformer.managerId,
                        name: bottomPerformer.name,
                        role: 'Vertical Manager',
                        segment: bottomPerformer.segment,
                        verticals: bottomPerformer.verticals,
                        avatar: bottomPerformer.avatar,
                        performanceLevel: 'low',
                        achievement: bottomPerformer.achievement
                      });
                    } else if (smActiveTab === 'kams' && 'kamId' in bottomPerformer) {
                      // Navigate to KAM's dashboard with low performance
                      onTeamMemberSelect({
                        kamId: bottomPerformer.kamId.toString(),
                        id: bottomPerformer.id,
                        name: bottomPerformer.name,
                        role: bottomPerformer.role,
                        vertical: bottomPerformer.vertical || '',
                        segment: bottomPerformer.segment,
                        avatar: bottomPerformer.avatar,
                        performanceLevel: 'low',
                        achievement: bottomPerformer.achievement
                      });
                    }
                  } else if (viewingAsVM && 'kamId' in bottomPerformer) {
                    // Navigate to KAM's dashboard with low performance
                    onTeamMemberSelect({
                      kamId: bottomPerformer.kamId.toString(),
                      id: bottomPerformer.id,
                      name: bottomPerformer.name,
                      role: bottomPerformer.role,
                      vertical: bottomPerformer.vertical || '',
                      segment: bottomPerformer.segment,
                      avatar: bottomPerformer.avatar,
                      performanceLevel: 'low',
                      achievement: bottomPerformer.achievement
                    });
                  }
                }}
                className="bg-red-50 dark:bg-red-900/20 rounded-lg p-2 border border-red-200 dark:border-red-700/50 cursor-pointer transition-all duration-200 hover:shadow-sm hover:scale-[1.01] hover:border-red-300 dark:hover:border-red-600"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-600 dark:text-red-400">Lowest Performer</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-red-900 dark:text-red-100">{bottomPerformer.name}</p>
                    {activeDashboard === 'commission' && (
                      <p className="text-xs text-red-600 dark:text-red-400">{bottomPerformer.payout}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-3">
          {/* Performance Level Tabs - Always Visible */}
          <div className="flex items-center gap-1 p-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-100 dark:border-indigo-700/40">
            <button
              onClick={() => {
                const setter = isGeneralManager ? setActiveTab : (isSeniorManagerLevel ? setSMActiveTab : setActiveTab);
                setter('seniors');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                (isGeneralManager ? activeTab === 'seniors' : (isSeniorManagerLevel ? smActiveTab === 'seniors' : activeTab === 'seniors'))
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
                  : 'text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-100'
              }`}
            >
              Seniors ({seniorManagers?.length || 8})
            </button>
            <button
              onClick={() => {
                const setter = isGeneralManager ? setActiveTab : (isSeniorManagerLevel ? setSMActiveTab : setActiveTab);
                setter('verticals');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                (isGeneralManager ? activeTab === 'verticals' : (isSeniorManagerLevel ? smActiveTab === 'verticals' : activeTab === 'verticals'))
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
                  : 'text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-100'
              }`}
            >
              Verticals ({gmAllVerticals?.length || verticalManagers?.length || 24})
            </button>
            <button
              onClick={() => {
                const setter = isGeneralManager ? setActiveTab : (isSeniorManagerLevel ? setSMActiveTab : setActiveTab);
                setter('kams');
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                (isGeneralManager ? activeTab === 'kams' : (isSeniorManagerLevel ? smActiveTab === 'kams' : activeTab === 'kams'))
                  ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md'
                  : 'text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-100'
              }`}
            >
              KAMs ({gmAllKAMs?.length || smAllKAMs?.length || 156})
            </button>
          </div>
          
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                statusFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('achieved')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                statusFilter === 'achieved'
                  ? 'bg-white dark:bg-slate-700 text-green-700 dark:text-green-300 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Achieved
            </button>
            <button
              onClick={() => setStatusFilter('not-met')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                statusFilter === 'not-met'
                  ? 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Not Met
            </button>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-40 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Overall Achievement">Achievement</SelectItem>
              <SelectItem value="Name">Name</SelectItem>
              <SelectItem value="Payout">Payout</SelectItem>
            </SelectContent>
          </Select>

          <div className="w-full sm:w-[30%] sm:ml-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-400 transition-colors duration-300" />
            <Input
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full h-9 focus:ring-0 focus:border-blue-100/30 dark:focus:border-blue-400/15 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none transition-all duration-200"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0 flex-1 flex flex-col">
        {/* Fixed height container for 4 team member cards */}
        <div className="flex-1" style={{ minHeight: '380px', maxHeight: '380px' }}>
          <div className="space-y-3 h-full overflow-hidden">
          {paginatedMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => {
                // Navigate to commission page
                if (onNavigateToCommission) {
                  onNavigateToCommission();
                }
              }}
              className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                selectedTeamMember === member.name
                  ? 'bg-blue-50/80 dark:bg-blue-900/30 border-blue-300 dark:border-blue-500/50 ring-2 ring-blue-200 dark:ring-blue-400/30'
                  : member.isTopPerformer 
                    ? 'bg-gradient-to-br from-amber-50/90 via-yellow-50/70 to-orange-50/60 dark:bg-gradient-to-br dark:from-amber-900/25 dark:via-yellow-900/20 dark:to-orange-900/15 border-yellow-200/70 dark:border-yellow-700/50 hover:border-amber-400/80 dark:hover:border-amber-500/70 hover:shadow-lg hover:shadow-amber-200/40 dark:hover:shadow-amber-900/30' 
                    : 'bg-slate-50/80 dark:bg-slate-800/30 border-slate-200/60 dark:border-slate-700/40 hover:border-blue-300/70 dark:hover:border-blue-600/60 hover:shadow-lg hover:shadow-blue-100/30 dark:hover:shadow-blue-900/20'
              }`}
              style={{ minHeight: '88px' }}
            >
              {/* Mobile Layout */}
              <div className="flex sm:hidden flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedTeamMember === member.name
                        ? 'bg-blue-700 dark:bg-blue-600 ring-2 ring-blue-300 dark:ring-blue-400/50'
                        : 'bg-blue-600 dark:bg-blue-500'
                    } transition-colors duration-300`}>
                      <span className="text-white font-medium text-sm">{member.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium truncate transition-colors duration-300 ${
                        selectedTeamMember === member.name ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
                      }`}>{member.name}</h4>
                      <p className={`text-sm truncate transition-colors duration-300 ${
                        selectedTeamMember === member.name ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'
                      }`}>
                        {member.role}
                        {activeDashboard === 'commission' && (
                          <span className="ml-2 font-semibold text-green-600 dark:text-green-400">
                            • {member.payout}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <CircularProgress value={member.achievement} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {member.isTopPerformer && (
                      <Badge className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-700/50 text-xs transition-colors duration-300">
                        #1 Performer
                      </Badge>
                    )}
                    <div className="flex items-center gap-1">
                      {member.change.startsWith('+') ? (
                        <TrendingUp className="w-3 h-3 text-green-500 dark:text-green-400 transition-colors duration-300" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500 dark:text-red-400 transition-colors duration-300" />
                      )}
                      <span className={`text-xs transition-colors duration-300 ${
                        member.change.startsWith('+') ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
                      }`}>
                        {member.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    selectedTeamMember === member.name
                      ? 'bg-blue-700 dark:bg-blue-600 ring-2 ring-blue-300 dark:ring-blue-400/50'
                      : 'bg-blue-600 dark:bg-blue-500'
                  } transition-colors duration-300`}>
                    <span className="text-white font-medium">{member.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium truncate transition-colors duration-300 ${
                      selectedTeamMember === member.name ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
                    }`}>{member.name}</h4>
                    <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                      selectedTeamMember === member.name ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      <span className="truncate">{member.role}</span>
                      {activeDashboard === 'commission' && (
                        <span className="contents">
                          <span className="text-gray-300 dark:text-gray-600">•</span>
                          <span className="font-semibold text-green-600 dark:text-green-400">{member.payout}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 flex-shrink-0">
                  {member.isTopPerformer && (
                    <div className="flex flex-col items-center">
                      <Badge className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-700/50 transition-colors duration-300">
                        <span className="text-xs">#1 Performer</span>
                      </Badge>
                      <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400 transition-colors duration-300" />
                        <span className="text-sm text-green-500 dark:text-green-400 transition-colors duration-300">{member.change}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap transition-colors duration-300">vs last period</span>
                      </div>
                    </div>
                  )}
                  
                  {!member.isTopPerformer && (
                    <div className="flex items-center gap-1">
                      {member.change.startsWith('+') ? (
                        <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400 transition-colors duration-300" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 dark:text-red-400 transition-colors duration-300" />
                      )}
                      <span className={`text-sm transition-colors duration-300 ${
                        member.change.startsWith('+') ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'
                      }`}>
                        {member.change}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap transition-colors duration-300">vs last period</span>
                    </div>
                  )}
                  
                  <CircularProgress value={member.achievement} />
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
        
        {/* Clean Pagination - Fixed at bottom */}
        {totalPages > 1 && (
          <div className="flex-shrink-0 pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="flex items-center justify-between">
              {/* Results Info */}
              <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedMembers.length)} of {sortedMembers.length} results
              </div>
              
              {/* Clean Pagination Controls */}
              <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0 px-[10px] py-[0px]">
                {/* First Page Button */}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(1)}
                  className={`flex-shrink-0 hidden sm:flex w-9 h-9 p-0 rounded-lg border-gray-300/60 dark:border-gray-600/50 transition-all duration-300 ${
                    currentPage === 1 
                      ? 'opacity-40 cursor-not-allowed' 
                      : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:scale-105'
                  }`}
                  title="First page"
                >
                  <span className="text-sm font-medium">««</span>
                </Button>
                
                {/* Previous Page Button */}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className={`flex-shrink-0 w-9 h-9 p-0 rounded-lg border-gray-300/60 dark:border-gray-600/50 transition-all duration-300 ${
                    currentPage === 1 
                      ? 'opacity-40 cursor-not-allowed' 
                      : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:scale-105'
                  }`}
                  title="Previous page"
                >
                  <span className="text-sm font-medium">‹</span>
                </Button>
                
                {/* Smart page number display */}
                <div className="flex items-center gap-1">
                  {/* Mobile: Enhanced current/total display */}
                  <div className="sm:hidden flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-gray-900/40 rounded-lg border border-gray-200/50 dark:border-gray-600/30 backdrop-blur-sm">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors duration-300">
                      Page
                    </span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md transition-colors duration-300">
                      {currentPage}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                      of {totalPages}
                    </span>
                  </div>
                  
                  {/* Desktop: Enhanced page numbers */}
                  <div className="hidden sm:flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        // Show first page, last page, current page, and adjacent pages
                        if (page === 1 || page === totalPages) return true;
                        if (Math.abs(page - currentPage) <= 1) return true;
                        return false;
                      })
                      .map((page, index, array) => {
                        const prevPage = array[index - 1];
                        const showEllipsis = prevPage && page - prevPage > 1;
                        
                        return (
                          <span key={page} className="contents">
                            {showEllipsis && (
                              <span className="px-2 py-1 text-gray-400 dark:text-gray-500 text-sm font-medium transition-colors duration-300 select-none">
                                •••
                              </span>
                            )}
                            <Button
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                              className={`flex-shrink-0 w-9 h-9 p-0 rounded-lg font-medium transition-all duration-300 ${
                                currentPage === page 
                                  ? 'bg-blue-500 dark:bg-blue-600 text-white border-blue-500 dark:border-blue-600 shadow-lg shadow-blue-500/25 scale-105 ring-2 ring-blue-200 dark:ring-blue-400/30' 
                                  : 'border-gray-300/60 dark:border-gray-600/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:scale-105'
                              }`}
                              title={`Go to page ${page}`}
                            >
                              <span className="text-sm">{page}</span>
                            </Button>
                          </span>
                        );
                      })}
                  </div>
                </div>
                
                {/* Next Page Button */}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className={`flex-shrink-0 w-9 h-9 p-0 rounded-lg border-gray-300/60 dark:border-gray-600/50 transition-all duration-300 ${
                    currentPage === totalPages 
                      ? 'opacity-40 cursor-not-allowed' 
                      : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:scale-105'
                  }`}
                  title="Next page"
                >
                  <span className="text-sm font-medium">›</span>
                </Button>
                
                {/* Last Page Button */}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                  className={`flex-shrink-0 hidden sm:flex w-9 h-9 p-0 rounded-lg border-gray-300/60 dark:border-gray-600/50 transition-all duration-300 ${
                    currentPage === totalPages 
                      ? 'opacity-40 cursor-not-allowed' 
                      : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:scale-105'
                  }`}
                  title="Last page"
                >
                  <span className="text-sm font-medium">»»</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}