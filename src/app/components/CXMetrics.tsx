import React, { useState } from 'react';
import { Phone, User, BarChart3, Activity, TrendingUp, TrendingDown, MessageCircle, UserCheck, Layers, Building2, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useDashboardData } from '../hooks/useDashboardData';
import { motion } from 'motion/react';
import svgPaths from '../imports/svg-bt4ferlwwr';
import svgPathsCard from '../imports/svg-tp70icpswy';

interface DashboardData {
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

// Mode data structures
interface VOCModeData {
  score: number;
  accountManagerCsat: { level: string; score: number };
  amAvgResult: { value: number; change: number };
  sectorManager: string;
  accountManager: string;
}

interface ThermometerModeData {
  score: number;
  nps: { value: number; change: number };
  frequency: { value: number; change: number };
  feedback: {
    gold: number;
    green: number;
    yellow: number;
    red: number;
    totalChange: number;
  };
}

// Color scheme type
interface ColorScheme {
  bg: string;
  bgDark: string;
  hoverBg: string;
  hoverBgDark: string;
  border: string;
  borderDark: string;
  hoverBorder: string;
  hoverBorderDark: string;
  icon: string;
  iconDark: string;
  hoverIcon: string;
  hoverIconDark: string;
  shadow: string;
}

// Individual KPI Card Component with softer hover border
function KPICard({ 
  title, 
  children, 
  icon,
  delay = 0,
  colorScheme
}: { 
  title: string; 
  children: React.ReactNode; 
  icon: React.ReactNode;
  delay?: number;
  colorScheme?: ColorScheme;
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Default blue color scheme
  const defaultScheme: ColorScheme = {
    bg: 'bg-blue-50/40',
    bgDark: 'dark:bg-blue-900/10',
    hoverBg: 'hover:bg-blue-100/60',
    hoverBgDark: 'dark:hover:bg-blue-900/20',
    border: 'border-blue-200/50',
    borderDark: 'dark:border-blue-800/30',
    hoverBorder: 'hover:border-blue-300/70',
    hoverBorderDark: 'dark:hover:border-blue-600/50',
    icon: 'text-blue-600',
    iconDark: 'dark:text-blue-400',
    hoverIcon: 'group-hover:text-blue-700',
    hoverIconDark: 'dark:group-hover:text-blue-300',
    shadow: 'shadow-blue-500/5'
  };

  const scheme = colorScheme || defaultScheme;

  return (
    <motion.div
      className={`group relative rounded-lg w-full h-full cursor-default transition-all duration-200 ease-in-out ${scheme.bg} ${scheme.bgDark} ${scheme.hoverBg} ${scheme.hoverBgDark} border-2 ${
        isHovered 
          ? `${scheme.hoverBorder} ${scheme.hoverBorderDark} shadow-lg ${scheme.shadow}` 
          : `${scheme.border} ${scheme.borderDark}`
      }`}
      style={{
        minHeight: '44px', // Further reduced for compact layout
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex justify-between items-center h-full px-[24px] px-[8px] py-[7px]">
        {/* Left Section: Icon + Title */}
        <div className="flex items-center justify-center gap-3">
          <div className={`w-4 h-4 flex items-center justify-center transition-colors duration-200 ${scheme.icon} ${scheme.iconDark} ${scheme.hoverIcon} ${scheme.hoverIconDark}`}>
            {icon}
          </div>
          <span className="font-medium text-gray-900 dark:text-gray-100 text-sm transition-colors duration-300 leading-none">
            {title}
          </span>
        </div>
        
        {/* Right Section: Content */}
        <div className="flex items-center gap-2">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

// VOC Mode Cards
function AccountManagerCSATCard({ 
  vocData, 
  period, 
  quarter, 
  userScope, 
  selectedVertical, 
  viewingAsVM, 
  viewingAsKAM 
}: { 
  vocData: VOCModeData; 
  period: string; 
  quarter: string;
  userScope?: any;
  selectedVertical?: string | null;
  viewingAsVM?: any;
  viewingAsKAM?: any;
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Determine role and title
  let roleTitle = "Senior Manager  Overview ";
  let showVerticals = true;
  let verticalsCount = 5;
  let companiesCount = 12;
  let kamsCount = 8;

  // KAM level - viewing as specific KAM
  if (viewingAsKAM) {
    roleTitle = "KAM Overview ";
    showVerticals = false; // Hide verticals for KAM
    verticalsCount = 1;
    companiesCount = 8; // Average companies per KAM
    kamsCount = 1; // Just the KAM themselves
  }
  // Vertical Manager level - viewing as VM or specific vertical selected
  else if (viewingAsVM || (selectedVertical && selectedVertical !== 'all')) {
    roleTitle = "Vertical Manager Overview ";
    showVerticals = false; // Hide verticals for VM
    verticalsCount = 1;
    companiesCount = 11; // Average companies per vertical
    kamsCount = 3; // Average KAMs per vertical
  }
  // Senior Manager level
  else if (userScope?.role === 'Senior Manager') {
    roleTitle = "Senior Manager  Overview ";
    showVerticals = true;
    verticalsCount = 8; // Total unique verticals
    companiesCount = 87; // Total companies
    kamsCount = 24; // Total KAMs
  }
  // Default Vertical Manager
  else if (userScope?.role === 'Vertical Manager') {
    roleTitle = "Vertical Manager Overview ";
    showVerticals = false;
    const verticalCount = Array.isArray(userScope?.verticals) ? userScope.verticals.length : 1;
    verticalsCount = verticalCount;
    companiesCount = verticalCount * 11;
    kamsCount = verticalCount * 3;
  }
  // Default KAM
  else if (userScope?.role === 'Key Account Manager') {
    roleTitle = "KAM Overview ";
    showVerticals = false;
    verticalsCount = 1;
    companiesCount = 8;
    kamsCount = 1;
  }

  // User/Team icon component from Figma
  function UserIconSVG() {
    return (
      <div className="h-5 w-5 overflow-clip relative shrink-0">
        <div className="absolute inset-[12.5%_8.33%]">
          <div className="absolute inset-[37.5%_8.33%_45.83%_66.67%]">
            <div className="absolute inset-[-25%_-16.67%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 4">
                <path d={svgPathsCard.p3ab203c0} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[62.5%_33.33%_12.5%_8.33%]">
            <div className="absolute inset-[-16.67%_-7.14%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
                <path d={svgPathsCard.p17bf7080} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[12.5%_45.83%_54.17%_20.83%]">
            <div className="absolute inset-[-12.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
                <path d={svgPathsCard.p3ca63380} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Verticals Icon SVG
  function VerticalsIconSVG() {
    return (
      <div className="h-[12.25px] overflow-clip relative w-[12.25px]">
        <div className="absolute inset-[8.33%_8.27%_50%_8.35%]">
          <div className="absolute inset-[-10%_-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
              <path d={svgPathsCard.paa63700} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[29.18%] left-[8.33%] right-[8.33%] top-1/2">
          <div className="absolute inset-[-20.01%_-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 5">
              <path d={svgPathsCard.p13a5b380} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[70.83%_8.33%_8.34%_8.33%]">
          <div className="absolute inset-[-20.01%_-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 5">
              <path d={svgPathsCard.p13a5b380} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // Companies Icon SVG
  function CompaniesIconSVG() {
    return (
      <div className="h-[12.25px] overflow-clip relative w-[12.25px]">
        <div className="absolute bottom-[8.33%] left-1/4 right-1/4 top-[8.33%]">
          <div className="absolute inset-[-5%_-8.33%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 12">
              <path d={svgPathsCard.p2ce4adc0} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[8.33%] left-[8.33%] right-3/4 top-1/2">
          <div className="absolute inset-[-10%_-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 7">
              <path d={svgPathsCard.p216e1180} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[8.33%] left-3/4 right-[8.33%] top-[37.5%]">
          <div className="absolute inset-[-7.69%_-25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 9">
              <path d={svgPathsCard.p38afd500} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // Account Managers Icon SVG
  function AccountManagersIconSVG() {
    return (
      <div className="h-[12.25px] overflow-clip relative w-[12.25px]">
        <div className="absolute inset-[62.5%_33.33%_12.5%_8.33%]">
          <div className="absolute inset-[-16.67%_-7.14%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5">
              <path d={svgPathsCard.p282d5200} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[13.03%_20.85%_54.7%_66.67%]">
          <div className="absolute inset-[-12.92%_-33.38%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 6">
              <path d={svgPathsCard.p325702c0} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[63.04%_8.33%_12.5%_79.17%]">
          <div className="absolute inset-[-17.04%_-33.33%_-17.04%_-33.34%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 5">
              <path d={svgPathsCard.p32e0be80} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[12.5%_45.83%_54.17%_20.83%]">
          <div className="absolute inset-[-12.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
              <path d={svgPathsCard.p33930070} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="relative rounded-lg w-full h-full cursor-default transition-all duration-200 ease-in-out bg-[rgba(239,246,255,0.4)] dark:bg-blue-900/10 hover:bg-[rgba(239,246,255,0.6)] dark:hover:bg-blue-900/20 border-2 border-[rgba(190,219,255,0.5)] dark:border-blue-800/30"
      style={{
        minHeight: '50px',
        boxShadow: isHovered
          ? '0 2px 8px rgba(21, 93, 252, 0.1)'
          : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center justify-between h-full px-3 sm:px-4 md:px-5 lg:px-6 py-2.5">
        {/* Left Section: Icon + Title */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-[14px] h-[14px] flex-shrink-0">
            <UserIconSVG />
          </div>
          <motion.p 
            className="text-[#101828] dark:text-gray-100 text-[11px] sm:text-[12.25px] whitespace-nowrap font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {roleTitle}
          </motion.p>
        </div>

        {/* Right Section: Stats */}
        <TooltipProvider>
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Verticals Stat - Only show for Senior Manager */}
            {showVerticals && (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div 
                      className="flex items-center gap-[1.75px] cursor-help hover:opacity-80 transition-opacity"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <VerticalsIconSVG />
                      <p className="font-bold text-[#101828] dark:text-gray-100 text-[10.5px]">{verticalsCount}</p>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Verticals</p>
                  </TooltipContent>
                </Tooltip>
                
                {/* Divider */}
                <div className="bg-[#d1d5dc] dark:bg-gray-600 h-[14px] w-px flex-shrink-0" />
              </>
            )}
            
            {/* Companies Stat */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div 
                  className="flex items-center gap-[1.75px] cursor-help hover:opacity-80 transition-opacity"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: showVerticals ? 0.25 : 0.2 }}
                >
                  <CompaniesIconSVG />
                  <p className="font-bold text-[#101828] dark:text-gray-100 text-[10.5px]">{companiesCount}</p>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Companies</p>
              </TooltipContent>
            </Tooltip>
            
            {/* Divider */}
            <div className="bg-[#d1d5dc] dark:bg-gray-600 h-[14px] w-px flex-shrink-0" />
            
            {/* Account Managers Stat */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div 
                  className="flex items-center gap-[1.75px] cursor-help hover:opacity-80 transition-opacity"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: showVerticals ? 0.3 : 0.25 }}
                >
                  <AccountManagersIconSVG />
                  <p className="font-bold text-[#101828] dark:text-gray-100 text-[10.5px]">{kamsCount}</p>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Account Managers</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </motion.div>
  );
}

function AMAvgResultCard({ vocData, period, quarter }: { vocData: VOCModeData, period: string, quarter: string }) {
  const greenScheme: ColorScheme = {
    bg: 'bg-green-50/40',
    bgDark: 'dark:bg-green-900/10',
    hoverBg: 'hover:bg-green-100/60',
    hoverBgDark: 'dark:hover:bg-green-900/20',
    border: 'border-green-200/50',
    borderDark: 'dark:border-green-800/30',
    hoverBorder: 'hover:border-green-300/70',
    hoverBorderDark: 'dark:hover:border-green-600/50',
    icon: 'text-green-600',
    iconDark: 'dark:text-green-400',
    hoverIcon: 'group-hover:text-green-700',
    hoverIconDark: 'dark:group-hover:text-green-300',
    shadow: 'shadow-green-500/5'
  };

  return (
    <KPICard
      title="AM AVG Result"
      icon={<BarChart3 className="w-5 h-5" />}
      delay={0.2}
      colorScheme={greenScheme}
    >
      <motion.span 
        className="font-semibold text-gray-900 dark:text-gray-100 text-base"
        key={`am-avg-${period}-${quarter}`}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {vocData.amAvgResult.value.toFixed(1)}%
      </motion.span>
    </KPICard>
  );
}

// Thermometer Mode Cards
function NetPromoterScoreCard({ thermometerData, period, quarter }: { thermometerData: ThermometerModeData, period: string, quarter: string }) {
  const purpleScheme: ColorScheme = {
    bg: 'bg-purple-50/40',
    bgDark: 'dark:bg-purple-900/10',
    hoverBg: 'hover:bg-purple-100/60',
    hoverBgDark: 'dark:hover:bg-purple-900/20',
    border: 'border-purple-200/50',
    borderDark: 'dark:border-purple-800/30',
    hoverBorder: 'hover:border-purple-300/70',
    hoverBorderDark: 'dark:hover:border-purple-600/50',
    icon: 'text-purple-600',
    iconDark: 'dark:text-purple-400',
    hoverIcon: 'group-hover:text-purple-700',
    hoverIconDark: 'dark:group-hover:text-purple-300',
    shadow: 'shadow-purple-500/5'
  };

  return (
    <KPICard
      title="Net Promoter Score"
      icon={<BarChart3 className="w-5 h-5" />}
      delay={0.1}
      colorScheme={purpleScheme}
    >
      <motion.span 
        className="font-semibold text-gray-900 dark:text-gray-100 text-base"
        key={`nps-thermo-${period}-${quarter}`}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {thermometerData.nps.value}
      </motion.span>
    </KPICard>
  );
}

function HighFrequencyScoreCard({ thermometerData, period, quarter }: { thermometerData: ThermometerModeData, period: string, quarter: string }) {
  const orangeScheme: ColorScheme = {
    bg: 'bg-orange-50/40',
    bgDark: 'dark:bg-orange-900/10',
    hoverBg: 'hover:bg-orange-100/60',
    hoverBgDark: 'dark:hover:bg-orange-900/20',
    border: 'border-orange-200/50',
    borderDark: 'dark:border-orange-800/30',
    hoverBorder: 'hover:border-orange-300/70',
    hoverBorderDark: 'dark:hover:border-orange-600/50',
    icon: 'text-orange-600',
    iconDark: 'dark:text-orange-400',
    hoverIcon: 'group-hover:text-orange-700',
    hoverIconDark: 'dark:group-hover:text-orange-300',
    shadow: 'shadow-orange-500/5'
  };

  return (
    <KPICard
      title="Happiness Factor"
      icon={<Activity className="w-5 h-5" />}
      delay={0.2}
      colorScheme={orangeScheme}
    >
      <motion.span 
        className="font-semibold text-gray-900 dark:text-gray-100 text-base"
        key={`freq-thermo-${period}-${quarter}`}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {thermometerData.frequency.value.toFixed(2)}%
      </motion.span>
    </KPICard>
  );
}

function FeedbackDistributionCard({ thermometerData, period, quarter }: { thermometerData: ThermometerModeData, period: string, quarter: string }) {
  const pinkScheme: ColorScheme = {
    bg: 'bg-pink-50/40',
    bgDark: 'dark:bg-pink-900/10',
    hoverBg: 'hover:bg-pink-100/60',
    hoverBgDark: 'dark:hover:bg-pink-900/20',
    border: 'border-pink-200/50',
    borderDark: 'dark:border-pink-800/30',
    hoverBorder: 'hover:border-pink-300/70',
    hoverBorderDark: 'dark:hover:border-pink-600/50',
    icon: 'text-pink-600',
    iconDark: 'dark:text-pink-400',
    hoverIcon: 'group-hover:text-pink-700',
    hoverIconDark: 'dark:group-hover:text-pink-300',
    shadow: 'shadow-pink-500/5'
  };

  return (
    <KPICard
      title="Feedback Distribution"
      icon={<MessageCircle className="w-5 h-5" />}
      delay={0.3}
      colorScheme={pinkScheme}
    >
      <div className="flex items-center gap-1.5 text-xs font-semibold">
        <motion.span 
          style={{ color: '#FFD700' }}
          key={`gold-thermo-${period}-${quarter}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Gold: {thermometerData.feedback.gold}
        </motion.span>
        <span className="text-gray-400 dark:text-gray-500">|</span>
        <motion.span 
          style={{ color: '#28a745' }}
          key={`green-thermo-${period}-${quarter}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          Green: {thermometerData.feedback.green}
        </motion.span>
        <span className="text-gray-400 dark:text-gray-500">|</span>
        <motion.span 
          style={{ color: '#ffc107' }}
          key={`yellow-thermo-${period}-${quarter}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Yellow: {thermometerData.feedback.yellow}
        </motion.span>
        <span className="text-gray-400 dark:text-gray-500">|</span>
        <motion.span 
          style={{ color: '#dc3545' }}
          key={`red-thermo-${period}-${quarter}`}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          Red: {thermometerData.feedback.red}
        </motion.span>
      </div>
    </KPICard>
  );
}

export function CXMetrics({ 
  selectedTeamMember, 
  period = 'Quarterly', 
  quarter = 'Q3',
  userScope = null,
  selectedVertical = null,
  viewingAsVM = null,
  viewingAsKAM = null,
  performanceLevel = 'normal'
}: { 
  selectedTeamMember?: string; 
  period?: string; 
  quarter?: string;
  userScope?: any;
  selectedVertical?: string | null;
  viewingAsVM?: any;
  viewingAsKAM?: any;
  performanceLevel?: 'high' | 'low' | 'normal';
}) {
  const dashboardData = useDashboardData(period, quarter, selectedTeamMember);
  const [activeMode, setActiveMode] = useState<'VOC' | 'Thermometer'>('VOC');
  
  // Adjust CX score based on performance level
  let cxScore: number;
  let csatScore: number;
  let csatLevel: string;
  
  if (performanceLevel === 'high') {
    cxScore = 92.3; // High performers have high CX scores
    csatScore = 4.7;
    csatLevel = 'Excellent';
  } else if (performanceLevel === 'low') {
    cxScore = 62.8; // Low performers have low CX scores
    csatScore = 3.1;
    csatLevel = 'Needs Improvement';
  } else {
    cxScore = 78.2; // Normal default value
    csatScore = 4.2;
    csatLevel = 'Satisfied';
  }
  
  // Mock data for both modes - Updated to sync with KPI cards
  const vocData: VOCModeData = {
    score: cxScore,
    accountManagerCsat: { 
      level: csatLevel,
      score: csatScore
    },
    amAvgResult: { 
      value: cxScore,
      change: 5.8 
    },
    sectorManager: 'Sarah Al-Mansouri',
    accountManager: 'Ahmed Al-Rashid'
  };
  
  const thermometerData: ThermometerModeData = {
    score: 78.2, // Updated from 72.1 to match CX KPI card for consistency
    nps: { value: 38, change: -5.3 },
    frequency: { value: 78.20, change: -3.7 }, // Updated to match main score
    feedback: {
      gold: 57,
      green: 15,
      yellow: 6,
      red: 1,
      totalChange: 12.8
    }
  };
  
  const currentScore = activeMode === 'VOC' ? vocData.score : thermometerData.score;
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      <CardHeader className="pb-0 pt-3 px-4 sm:pt-3 sm:px-4 flex-shrink-0">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2.5 text-lg sm:text-[22px] font-medium">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/30 transition-colors duration-300">
              <Phone className="w-5 h-5 text-green-600 dark:text-green-400 transition-colors duration-300" />
            </div>
            <span className="widget-title">Customer Satisfaction</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:ml-auto items-start sm:items-center gap-3 sm:gap-2 w-full sm:w-auto">
            {/* Demo Toggle Tags */}
            <div className="flex items-center gap-1 w-full sm:w-auto">
              <button
                onClick={() => setActiveMode('VOC')}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer flex-1 sm:flex-none ${
                  activeMode === 'VOC'
                    ? 'bg-blue-500 dark:bg-blue-600 text-white border-blue-600 dark:border-blue-500 shadow-sm'
                    : 'bg-transparent text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                }`}
              >
                VOC
              </button>
              <button
                onClick={() => setActiveMode('Thermometer')}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer flex-1 sm:flex-none ${
                  activeMode === 'Thermometer'
                    ? 'bg-blue-500 dark:bg-blue-600 text-white border-blue-600 dark:border-blue-500 shadow-sm'
                    : 'bg-transparent text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                }`}
              >
                Thermometer
              </button>
            </div>
            
            <motion.span 
              className={`text-lg font-bold self-end sm:self-auto ${
                currentScore >= 80 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}
              key={`${activeMode}-${period}-${quarter}-${selectedTeamMember}`}
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {currentScore.toFixed(1)}%
            </motion.span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col pt-2 px-4 sm:px-4 pb-[12px] space-y-2 pr-[14px] pl-[14px] -mt-3">
        {/* Mode-Specific Information Note - Compact */}
        <div className="p-2.5 sm:p-3 bg-slate-50/50 dark:bg-slate-800/50 rounded-lg border border-slate-100/50 dark:border-slate-700/50 min-h-[52px] flex items-center transition-colors duration-300">
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 transition-colors duration-300 leading-relaxed">
            <span className="font-medium">Customer Experience Metrics:</span> {
              activeMode === 'VOC' 
                ? 'VOC mode based on high feedback volume – displaying aggregated customer satisfaction scores and manager-level performance details.'
                : 'Thermometer mode based on low feedback volume – displaying quick pulse satisfaction metrics and distribution breakdown.'
            }
          </p>
        </div>

        {/* Dynamic Mode Cards - Compact Layout */}
        <div className="flex flex-col flex-1 gap-1.5 sm:gap-2">
          {activeMode === 'VOC' ? (
            // VOC Mode Cards
            <>
              <div className="flex-1 min-h-[50px]">
                <AccountManagerCSATCard 
                  vocData={vocData} 
                  period={period} 
                  quarter={quarter}
                  userScope={userScope}
                  selectedVertical={selectedVertical}
                  viewingAsVM={viewingAsVM}
                  viewingAsKAM={viewingAsKAM}
                />
              </div>
              <div className="flex-1 min-h-[50px]">
                <AMAvgResultCard vocData={vocData} period={period} quarter={quarter} />
              </div>
            </>
          ) : (
            // Thermometer Mode Cards
            <>
              <div className="flex-1 min-h-[50px]">
                <NetPromoterScoreCard thermometerData={thermometerData} period={period} quarter={quarter} />
              </div>
              <div className="flex-1 min-h-[50px]">
                <HighFrequencyScoreCard thermometerData={thermometerData} period={period} quarter={quarter} />
              </div>
              <div className="flex-1 min-h-[50px]">
                <FeedbackDistributionCard thermometerData={thermometerData} period={period} quarter={quarter} />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
