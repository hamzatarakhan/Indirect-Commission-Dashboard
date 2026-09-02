import React, { useState, useEffect, useRef } from "react";
import { DashboardHeader } from "./components/DashboardHeader";
import { MetricsCards } from "./components/MetricsCards";
import { PayoutCalculation } from "./components/PayoutCalculation";
import { CXMetrics } from "./components/CXMetrics";
import { TeamLeaderboard } from "./components/TeamLeaderboard";
import { StrategicPriorities } from "./components/StrategicPriorities";
import { RevenueBreakdown } from "./components/RevenueBreakdown";
import { ImprovedPerformanceTrends } from "./components/ImprovedPerformanceTrends";
import { ImprovedScoreDistribution } from "./components/ImprovedScoreDistribution";
import { CompanyPerformance } from "./components/CompanyPerformance";
import { CompaniesPerformance } from "./components/CompaniesPerformance";
import { PerformanceDashboard } from "./components/PerformanceDashboard";
import { IndirectCommissionDashboard } from "./components/IndirectCommissionDashboard";
import { ServiceDetailsPage } from "./components/ServiceDetailsPage";
import { CompanyDetailsPage } from "./components/CompanyDetailsPage";
import { ActivationDetailsPage } from "./components/ActivationDetailsPage";
import { TerminationDetailsPage } from "./components/TerminationDetailsPage";
import { CustomerBaseDetailsPage } from "./components/CustomerBaseDetailsPage";
import { ChurnRateDetailsPage } from "./components/ChurnRateDetailsPage";
import { motion, useScroll, useTransform } from "motion/react";
import { User, RotateCcw, Home, ChevronRight, Users, UserCircle, Briefcase } from "lucide-react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./components/ui/breadcrumb";
import premiumBackground from "figma:asset/c4c4eca424f7dfcdec68ff554dfed783b9abbc09.png";
import { resolveUserScope, type UserScope } from "./utils/scopeResolver";
import svgPaths from "./imports/svg-cn46a646zj";

// Enhanced Futuristic Grid Pattern
const BusinessGrid = () => {
  return (
    <motion.div
      className="absolute inset-0 opacity-20 dark:opacity-40"
      style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.06) 1px, transparent 1px),
          linear-gradient(rgba(88, 201, 255, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(88, 201, 255, 0.04) 1px, transparent 1px)
        `,
        backgroundSize:
          "40px 40px, 40px 40px, 120px 120px, 120px 120px",
      }}
      animate={{
        backgroundPosition: [
          "0px 0px, 0px 0px, 0px 0px, 0px 0px",
          "40px 40px, 40px 40px, 120px 120px, 120px 120px",
        ],
      }}
      transition={{
        duration: 80,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

// Simple Professional Accent
const ProfessionalAccent = ({ index }: { index: number }) => {
  const positions = [
    { left: "10%", top: "20%" },
    { right: "15%", top: "30%" },
    { left: "20%", bottom: "25%" },
    { right: "10%", bottom: "20%" },
  ];

  const position = positions[index % positions.length];

  return (
    <motion.div
      className="absolute w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500/5 to-indigo-500/3 backdrop-blur-sm border border-blue-500/10"
      style={position}
      animate={{
        scale: [1, 1.05, 1],
        rotate: [0, 2, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 8 + index * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 1.5,
      }}
    />
  );
};

// Enhanced Futuristic Data Visualization Elements
const DataVisualizationDots = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full hidden dark:block"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${10 + (i % 5) * 18}%`,
            top: `${15 + Math.floor(i / 5) * 20}%`,
            background:
              i % 4 === 0
                ? "rgba(88, 201, 255, 0.4)"
                : i % 4 === 1
                  ? "rgba(139, 92, 246, 0.3)"
                  : i % 4 === 2
                    ? "rgba(34, 197, 94, 0.3)"
                    : "rgba(59, 130, 246, 0.3)",
            boxShadow:
              i % 3 === 0
                ? "0 0 8px rgba(88, 201, 255, 0.4)"
                : "0 0 6px rgba(139, 92, 246, 0.3)",
          }}
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.2, 0.8, 0.2],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Light Mode Dots */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`light-${i}`}
          className="absolute w-2 h-2 bg-blue-400/20 rounded-full dark:hidden"
          style={{
            left: `${15 + (i % 4) * 20}%`,
            top: `${20 + Math.floor(i / 4) * 25}%`,
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  // Initialize user scope from hierarchy as General Manager
  const [userScope, setUserScope] = useState<UserScope | null>(() => {
    const scope = resolveUserScope('GM001', 'General Manager');
    
    if (!scope) {
      console.warn('Could not resolve user scope from hierarchy');
      return null;
    }
    
    // Add the user's name
    return {
      ...scope,
      name: 'Khalid Al-Maamari'
    };
  });

  // Track if we're viewing as a Senior Manager (drilling down from GM view)
  const [viewingAsSM, setViewingAsSM] = useState<UserScope | null>(null);

  // Track if we're viewing as a VM
  const [viewingAsVM, setViewingAsVM] = useState<UserScope | null>(null);
  
  // Track if we're viewing as a KAM (drilling down from VM view)
  interface KAMScope {
    kamId: string;
    name: string;
    role: string;
    vertical: string;
    segment: string;
  }
  const [viewingAsKAM, setViewingAsKAM] = useState<KAMScope | null>(null);

  const [period, setPeriod] = useState("Quarterly");
  const [quarter, setQuarter] = useState("Q3");
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("2024");
  const [showCaretaker, setShowCaretaker] = useState(false);
  const [selectedVertical, setSelectedVertical] = useState<string | null>(null);
  const [activeDashboard, setActiveDashboard] = useState<'commission' | 'performance' | 'indirect-commission'>('indirect-commission');

  // Service Details Page navigation
  interface ServiceDetailsState {
    serviceName: string;
    serviceColor: string;
  }
  const [selectedServiceDetails, setSelectedServiceDetails] = useState<ServiceDetailsState | null>(null);

  // Service details segment/vertical state
  const [serviceDetailsSegment, setServiceDetailsSegment] = useState('All');
  const [serviceDetailsVertical, setServiceDetailsVertical] = useState('All Verticals');

  // Company Details Page navigation
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);

  // Activation and Termination Details Pages navigation
  const [showActivationDetails, setShowActivationDetails] = useState(false);
  const [showTerminationDetails, setShowTerminationDetails] = useState(false);
  
  // Customer Base and Churn Rate Details Pages navigation
  const [showCustomerBaseDetails, setShowCustomerBaseDetails] = useState(false);
  const [showChurnRateDetails, setShowChurnRateDetails] = useState(false);

  // Global filter state for Performance Dashboard
  const [selectedSegments, setSelectedSegments] = useState<string[]>(["All"]);
  const [selectedVerticals, setSelectedVerticals] = useState<string[]>(["All Verticals"]);

  // Comparison state for Performance Dashboard
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonPeriod, setComparisonPeriod] = useState("Quarterly");
  const [comparisonQuarter, setComparisonQuarter] = useState("Q2");
  const [comparisonMonth, setComparisonMonth] = useState("January");
  const [comparisonYear, setComparisonYear] = useState("2024");

  // Handle filter changes with data refresh animation
  const handlePeriodChange = async (newPeriod: string) => {
    setIsDataRefreshing(true);
    setPeriod(newPeriod);

    // Simulate data refresh with a short delay
    setTimeout(() => {
      setIsDataRefreshing(false);
    }, 1500);
  };

  const handleQuarterChange = async (newQuarter: string) => {
    setIsDataRefreshing(true);
    setQuarter(newQuarter);

    // Simulate data refresh with a short delay
    setTimeout(() => {
      setIsDataRefreshing(false);
    }, 1500);
  };

  const handleYearChange = async (newYear: string) => {
    setIsDataRefreshing(true);
    setYear(newYear);

    // Simulate data refresh with a short delay
    setTimeout(() => {
      setIsDataRefreshing(false);
    }, 1500);
  };

  const handleVerticalChange = async (vertical: string | null) => {
    setIsDataRefreshing(true);
    setSelectedVertical(vertical);

    // Simulate data refresh with a short delay
    setTimeout(() => {
      setIsDataRefreshing(false);
    }, 1500);
  };

  // Handle global segments filter change
  const handleSegmentsChange = async (segments: string[]) => {
    setSelectedSegments(segments);
  };

  // Handle global verticals filter change
  const handleVerticalsChange = async (verticals: string[]) => {
    setSelectedVerticals(verticals);
  };

  const [selectedTeamMember, setSelectedTeamMember] =
    useState("");
  const [performanceLevel, setPerformanceLevel] = 
    useState<'high' | 'low' | 'normal'>('high'); // GM view shows all metrics as successful
  const [isViewingMemberDetail, setIsViewingMemberDetail] = useState(false); // Track if viewing from Team Leaderboard
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isDataRefreshing, setIsDataRefreshing] =
    useState(false);
  
  // Strategic Priorities achievement state (synced with StrategicPriorities component)
  const [spAchieved, setSpAchieved] = useState(true);
  const [spPercentage, setSpPercentage] = useState(100);

  // KPI Card percentages for synchronization across widgets
  const revenuePct = 92.1;  // Fixed value from MetricsCards
  const cxPct = 78.2;       // Fixed value from MetricsCards

  // Handle Strategic Priorities achievement updates
  const handleSpAchievementChange = (isAchieved: boolean, percentage: number) => {
    setSpAchieved(isAchieved);
    setSpPercentage(percentage);
  };

  // Handle team member selection with loading and scroll
  const handleTeamMemberSelect = async (memberData: any) => {
    // Check what level we're navigating from
    
    // GM → SM navigation
    if (memberData && 'managerId' in memberData && memberData.role === 'Senior Manager' && userScope?.role === 'General Manager' && !viewingAsSM && !viewingAsVM) {
      // We're GM clicking on a Senior Manager
      if (memberData.name === selectedTeamMember) return; // Don't reload if same SM

      setIsLoading(true);
      setLoadingProgress(0);

      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Simulate loading progress for SM
      const loadingSteps = [
        {
          progress: 25,
          delay: 200,
          message: "Loading Senior Manager data...",
        },
        {
          progress: 50,
          delay: 300,
          message: "Filtering by segment...",
        },
        {
          progress: 75,
          delay: 400,
          message: "Updating charts and analytics...",
        },
        {
          progress: 100,
          delay: 500,
          message: "Preparing SM dashboard view...",
        },
      ];

      for (const step of loadingSteps) {
        setLoadingMessage(step.message);
        await new Promise((resolve) =>
          setTimeout(resolve, step.delay),
        );
        setLoadingProgress(step.progress);
      }

      // Create an SM scope from the data
      const smScope: UserScope = {
        role: 'Senior Manager',
        managerId: memberData.managerId,
        segment: memberData.segment,
        verticals: memberData.verticals || ['All Verticals'],
        selection: 'all',
        name: memberData.name
      };

      // Set viewing as SM
      setViewingAsSM(smScope);
      setViewingAsVM(null);
      setViewingAsKAM(null);
      setSelectedTeamMember(memberData.name);
      setPerformanceLevel(memberData.performanceLevel || 'normal');
      setIsViewingMemberDetail(true); // Show breadcrumb and user card

      // Final delay before hiding loader
      await new Promise((resolve) => setTimeout(resolve, 300));
      setIsLoading(false);
      setLoadingProgress(0);
      setLoadingMessage("");
    } 
    // GM → VM navigation (when GM directly clicks on VM in Verticals tab)
    else if (memberData && 'managerId' in memberData && memberData.role === 'Vertical Manager' && userScope?.role === 'General Manager' && !viewingAsSM && !viewingAsVM) {
      // We're GM clicking directly on a Vertical Manager
      if (memberData.name === selectedTeamMember) return; // Don't reload if same VM

      setIsLoading(true);
      setLoadingProgress(0);

      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Simulate loading progress
      const loadingSteps = [
        {
          progress: 25,
          delay: 200,
          message: "Loading Vertical Manager data...",
        },
        {
          progress: 50,
          delay: 300,
          message: "Filtering by segment and vertical...",
        },
        {
          progress: 75,
          delay: 400,
          message: "Updating charts and analytics...",
        },
        {
          progress: 100,
          delay: 500,
          message: "Preparing VM dashboard view...",
        },
      ];

      for (const step of loadingSteps) {
        setLoadingMessage(step.message);
        await new Promise((resolve) =>
          setTimeout(resolve, step.delay),
        );
        setLoadingProgress(step.progress);
      }

      // Create a VM scope from the data
      const vmScope: UserScope = {
        role: 'Vertical Manager',
        managerId: memberData.managerId,
        segment: memberData.segment,
        verticals: memberData.verticals,
        selection: 'all',
        name: memberData.name
      };

      // Set viewing as VM (skip SM level)
      setViewingAsVM(vmScope);
      setViewingAsSM(null); // Important: Don't set SM when going directly to VM
      setViewingAsKAM(null);
      setSelectedTeamMember(memberData.name);
      setPerformanceLevel(memberData.performanceLevel || 'normal');
      setIsViewingMemberDetail(true); // Show breadcrumb and user card

      // Final delay before hiding loader
      await new Promise((resolve) => setTimeout(resolve, 300));
      setIsLoading(false);
      setLoadingProgress(0);
      setLoadingMessage("");
    }
    // SM → VM navigation (or GM viewing as SM → VM)
    else if (memberData && 'managerId' in memberData && memberData.role === 'Vertical Manager' && (userScope?.role === 'Senior Manager' || viewingAsSM) && !viewingAsVM) {
      // We're SM (or GM viewing as SM) clicking on a Vertical Manager
      if (memberData.name === selectedTeamMember) return; // Don't reload if same VM

      setIsLoading(true);
      setLoadingProgress(0);

      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Simulate loading progress
      const loadingSteps = [
        {
          progress: 25,
          delay: 200,
          message: "Loading Vertical Manager data...",
        },
        {
          progress: 50,
          delay: 300,
          message: "Filtering by segment and vertical...",
        },
        {
          progress: 75,
          delay: 400,
          message: "Updating charts and analytics...",
        },
        {
          progress: 100,
          delay: 500,
          message: "Preparing VM dashboard view...",
        },
      ];

      for (const step of loadingSteps) {
        setLoadingMessage(step.message);
        await new Promise((resolve) =>
          setTimeout(resolve, step.delay),
        );
        setLoadingProgress(step.progress);
      }

      // Create a VM scope from the data
      const vmScope: UserScope = {
        role: 'Vertical Manager',
        managerId: memberData.managerId,
        segment: memberData.segment,
        verticals: memberData.verticals,
        selection: 'all',
        name: memberData.name
      };

      // Set viewing as VM
      setViewingAsVM(vmScope);
      setViewingAsKAM(null); // Clear any KAM view
      setSelectedTeamMember(memberData.name);
      setPerformanceLevel(memberData.performanceLevel || 'normal');
      setIsViewingMemberDetail(true); // Show breadcrumb and user card

      // Final delay before hiding loader
      await new Promise((resolve) => setTimeout(resolve, 300));
      setIsLoading(false);
      setLoadingProgress(0);
      setLoadingMessage("");
    } 
    // VM → KAM navigation
    else if (memberData && 'kamId' in memberData) {
      // We're viewing as a KAM (drilling down from VM view)
      if (memberData.name === selectedTeamMember) return; // Don't reload if same KAM

      setIsLoading(true);
      setLoadingProgress(0);

      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Simulate loading progress for KAM
      const loadingSteps = [
        {
          progress: 30,
          delay: 200,
          message: "Loading KAM data...",
        },
        {
          progress: 60,
          delay: 300,
          message: "Filtering by vertical...",
        },
        {
          progress: 100,
          delay: 400,
          message: "Preparing KAM dashboard...",
        },
      ];

      for (const step of loadingSteps) {
        setLoadingMessage(step.message);
        await new Promise((resolve) =>
          setTimeout(resolve, step.delay),
        );
        setLoadingProgress(step.progress);
      }

      // Set viewing as KAM
      setViewingAsKAM({
        kamId: memberData.kamId || memberData.id,
        name: memberData.name,
        role: memberData.role,
        vertical: memberData.vertical,
        segment: memberData.segment || viewingAsVM?.segment || viewingAsSM?.segment || ''
      });
      setSelectedTeamMember(memberData.name);
      setPerformanceLevel(memberData.performanceLevel || 'normal');
      setIsViewingMemberDetail(true); // Show breadcrumb and user card

      // Final delay before hiding loader
      await new Promise((resolve) => setTimeout(resolve, 300));
      setIsLoading(false);
      setLoadingProgress(0);
      setLoadingMessage("");
    } else {
      // Legacy behavior for KAM selection (if ever needed)
      // For now, do nothing
    }
  };

  // Handle reset to overall view with loading and scroll
  const handleResetToOverallView = async () => {
    setIsLoading(true);
    setLoadingProgress(0);

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // If viewing as KAM, go back to VM view
    if (viewingAsKAM && viewingAsVM) {
      const loadingSteps = [
        {
          progress: 40,
          delay: 200,
          message: "Returning to VM view...",
        },
        {
          progress: 100,
          delay: 300,
          message: "Ready!",
        },
      ];

      for (const step of loadingSteps) {
        setLoadingMessage(step.message);
        await new Promise((resolve) =>
          setTimeout(resolve, step.delay),
        );
        setLoadingProgress(step.progress);
      }

      // Go back to VM view (clear KAM, keep VM and SM if any)
      setViewingAsKAM(null);
      setSelectedTeamMember(viewingAsVM.name || '');
      setPerformanceLevel('normal'); // Reset to normal when going back

      await new Promise((resolve) => setTimeout(resolve, 200));
      setIsLoading(false);
      setLoadingProgress(0);
      setLoadingMessage("");
      return;
    }

    // If viewing as VM, go back to SM view (or GM if no SM)
    if (viewingAsVM && viewingAsSM) {
      const loadingSteps = [
        {
          progress: 40,
          delay: 200,
          message: "Returning to SM view...",
        },
        {
          progress: 100,
          delay: 300,
          message: "Ready!",
        },
      ];

      for (const step of loadingSteps) {
        setLoadingMessage(step.message);
        await new Promise((resolve) =>
          setTimeout(resolve, step.delay),
        );
        setLoadingProgress(step.progress);
      }

      // Go back to SM view (clear VM, keep SM)
      setViewingAsVM(null);
      setViewingAsKAM(null);
      setSelectedTeamMember(viewingAsSM.name || '');
      setPerformanceLevel('normal'); // Reset to normal when going back

      await new Promise((resolve) => setTimeout(resolve, 200));
      setIsLoading(false);
      setLoadingProgress(0);
      setLoadingMessage("");
      return;
    }

    // If viewing as SM, go back to GM view
    if (viewingAsSM) {
      const loadingSteps = [
        {
          progress: 40,
          delay: 200,
          message: "Returning to GM view...",
        },
        {
          progress: 100,
          delay: 300,
          message: "Ready!",
        },
      ];

      for (const step of loadingSteps) {
        setLoadingMessage(step.message);
        await new Promise((resolve) =>
          setTimeout(resolve, step.delay),
        );
        setLoadingProgress(step.progress);
      }

      // Go back to GM view (clear SM)
      setViewingAsSM(null);
      setViewingAsVM(null);
      setViewingAsKAM(null);
      setSelectedTeamMember('');
      setPerformanceLevel('high'); // GM view shows all metrics as successful

      await new Promise((resolve) => setTimeout(resolve, 200));
      setIsLoading(false);
      setLoadingProgress(0);
      setLoadingMessage("");
      return;
    }

    // Otherwise, full reset
    const loadingSteps = [
      {
        progress: 30,
        delay: 200,
        message: userScope?.role === 'General Manager' ? "Returning to General Manager view..." : "Returning to overview...",
      },
      {
        progress: 60,
        delay: 300,
        message: "Loading overall metrics...",
      },
      { progress: 100, delay: 400, message: "Ready!" },
    ];

    for (const step of loadingSteps) {
      setLoadingMessage(step.message);
      await new Promise((resolve) =>
        setTimeout(resolve, step.delay),
      );
      setLoadingProgress(step.progress);
    }

    // Reset to overall view
    setSelectedTeamMember("");
    setViewingAsSM(null); // Clear SM view
    setViewingAsVM(null); // Clear VM view
    setViewingAsKAM(null); // Clear KAM view
    setPerformanceLevel('high'); // GM view shows all metrics as successful

    // Final delay before hiding loader
    await new Promise((resolve) => setTimeout(resolve, 200));
    setIsLoading(false);
    setLoadingProgress(0);
    setLoadingMessage("");
  };

  // Get selected member data for personalized header
  const getSelectedMemberData = () => {
    // If viewing as KAM, return KAM data
    if (viewingAsKAM) {
      return {
        name: viewingAsKAM.name,
        role: viewingAsKAM.role,
        avatar: viewingAsKAM.name.charAt(0),
        vertical: viewingAsKAM.vertical,
        segment: viewingAsKAM.segment
      };
    }
    
    // If viewing as VM, return VM data
    if (viewingAsVM) {
      return {
        name: viewingAsVM.name || selectedTeamMember,
        role: "Vertical Manager",
        avatar: viewingAsVM.name?.charAt(0) || "V",
        segment: viewingAsVM.segment,
        verticals: viewingAsVM.verticals,
        managerId: viewingAsVM.managerId
      };
    }

    // If viewing as SM, return SM data
    if (viewingAsSM) {
      return {
        name: viewingAsSM.name || selectedTeamMember,
        role: "Senior Manager",
        avatar: viewingAsSM.name?.charAt(0) || "S",
        segment: viewingAsSM.segment,
        verticals: viewingAsSM.verticals,
        managerId: viewingAsSM.managerId
      };
    }
    
    // Otherwise return KAM data (legacy)
    const teamMembers = [
      {
        name: "Ahmed Al-Rashid",
        role: "Key Account Manager",
        avatar: "A",
      },
      {
        name: "Fatima Al-Zahra",
        role: "Key Account Manager",
        avatar: "F",
      },
      {
        name: "Mohamed Al-Balushi",
        role: "Key Account Manager",
        avatar: "M",
      },
      {
        name: "Sarah Al-Kindi",
        role: "Key Account Manager",
        avatar: "S",
      },
      {
        name: "Michael Chen",
        role: "Key Account Manager",
        avatar: "M",
      },
      {
        name: "Layla Al-Zahra",
        role: "Key Account Manager",
        avatar: "L",
      },
      {
        name: "Omar Al-Rashid",
        role: "Key Account Manager",
        avatar: "O",
      },
      {
        name: "Aisha Al-Balushi",
        role: "Key Account Manager",
        avatar: "A",
      },
      {
        name: "Hassan Al-Kindi",
        role: "Key Account Manager",
        avatar: "H",
      },
      {
        name: "Maryam Al-Said",
        role: "Key Account Manager",
        avatar: "M",
      },
    ];
    return teamMembers.find(
      (member) => member.name === selectedTeamMember,
    );
  };

  const selectedMemberData = getSelectedMemberData();
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute effective user scope for widgets
  // Priority: viewingAsKAM > viewingAsVM > userScope
  const effectiveUserScope = viewingAsKAM 
    ? {
        role: 'Key Account Manager',
        managerId: viewingAsKAM.kamId,
        segment: viewingAsKAM.segment,
        verticals: [viewingAsKAM.vertical],
        selection: 'all' as const,
        name: viewingAsKAM.name
      }
    : viewingAsVM || userScope;

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, -50]);
  const opacityParallax = useTransform(
    scrollY,
    [0, 400],
    [1, 0.8],
  );

  // Generate professional accents
  const professionalAccents = Array.from(
    { length: 4 },
    (_, i) => <ProfessionalAccent key={i} index={i} />,
  );

  // Determine if we're in KAM level view (only when viewing as KAM)
  // GM level: Shows Senior Managers in Team Leaderboard
  // SM level: Shows Vertical Managers in Team Leaderboard
  // VM level: Shows KAMs in Team Leaderboard
  // KAM level: Individual KAM view (hide Team Leaderboard)
  const isKAMLevel = !!viewingAsKAM;

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-background"
      style={{ overflow: "hidden auto" }}
    >
      {/* Data Refresh Indicator */}
      {isDataRefreshing && (
        <motion.div
          className="fixed top-4 right-4 z-40 flex items-center gap-3 bg-blue-500/90 dark:bg-blue-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-300"
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <span className="text-sm font-medium">
            Refreshing data...
          </span>
        </motion.div>
      )}

      {/* Enhanced Loading Spinner */}
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 w-16 h-16 border-2 border-blue-200/50 rounded-full"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
            <motion.div
              className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full relative z-10"
              animate={{ rotate: 360 }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute inset-2 bg-blue-500/20 rounded-full"
              animate={{
                scale: [0.5, 1, 0.5],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Theme-Aware Futuristic Background */}
      <div className="fixed inset-0 -z-10 transition-colors duration-500">
        {/* Light Mode - Clean Professional Base */}
        <motion.div
          className="absolute inset-0 dark:hidden bg-gradient-to-br from-gray-50 via-white to-gray-100"
          style={{
            y: yParallax,
            opacity: opacityParallax,
          }}
        />

        {/* Dark Mode - Premium Radial Background */}
        <motion.div
          className="absolute inset-0 hidden dark:block"
          style={{
            y: yParallax,
            opacity: opacityParallax,
            backgroundImage: `url(${premiumBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 25,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Dark Mode Fallback Gradient (in case image fails to load) */}
        <motion.div
          className="absolute inset-0 hidden dark:block -z-10"
          style={{
            y: yParallax,
            opacity: opacityParallax,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, #1e3a8a 0%, #1e293b 50%, #0f172a 100%)",
          }}
        />

        {/* Subtle Enhancement Overlay - Dark Mode Only */}
        <motion.div
          className="absolute inset-0 hidden dark:block"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(88, 201, 255, 0.03) 0%, transparent 70%),
              radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.02) 0%, transparent 70%),
              radial-gradient(ellipse 120% 80% at 50% 0%, rgba(59, 130, 246, 0.02) 0%, transparent 60%)
            `,
          }}
          animate={{
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 30,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Light Mode Subtle Professional Gradient */}
        <motion.div
          className="absolute inset-0 dark:hidden"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59, 130, 246, 0.04) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 50% 100%, rgba(99, 102, 241, 0.03) 0%, transparent 60%)
            `,
          }}
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Business Grid Pattern */}
        <BusinessGrid />

        {/* Professional Accent Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {professionalAccents}
        </div>

        {/* Data Visualization Elements */}
        <DataVisualizationDots />

        {/* Enhanced Futuristic Corner Accents */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Top Left - Ambient Blue Glow */}
          <motion.div
            className="absolute w-80 h-80 rounded-full transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(circle, rgba(88, 201, 255, 0.12) 0%, rgba(59, 130, 246, 0.06) 40%, transparent 70%)",
              filter: "blur(50px)",
              top: "-10%",
              left: "-10%",
              opacity: 0.6,
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 18,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          {/* Bottom Right - Purple Accent */}
          <motion.div
            className="absolute w-64 h-64 rounded-full transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 70%)",
              filter: "blur(40px)",
              bottom: "-8%",
              right: "-8%",
              opacity: 0.5,
            }}
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 22,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 8,
            }}
          />

          {/* Center Right - Floating Tech Orb */}
          <motion.div
            className="absolute w-32 h-32 rounded-full hidden dark:block"
            style={{
              background:
                "radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%)",
              filter: "blur(25px)",
              top: "40%",
              right: "5%",
            }}
            animate={{
              scale: [0.8, 1.3, 0.8],
              opacity: [0.2, 0.5, 0.2],
              x: [0, 20, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 16,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 4,
            }}
          />

          {/* Light Mode Subtle Accents */}
          <motion.div
            className="absolute w-64 h-64 rounded-full dark:hidden opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)",
              filter: "blur(40px)",
              top: "-5%",
              left: "-5%",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 12,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          <motion.div
            className="absolute w-48 h-48 rounded-full dark:hidden opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)",
              filter: "blur(30px)",
              bottom: "-5%",
              right: "-5%",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 15,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 5,
            }}
          />
        </div>

        {/* Futuristic Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay transition-opacity duration-500"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Animated Light Rays - Dark Mode Only */}
        <div className="absolute inset-0 overflow-hidden hidden dark:block">
          <motion.div
            className="absolute w-1 h-full bg-gradient-to-b from-transparent via-blue-400/10 to-transparent"
            style={{ left: "25%" }}
            animate={{
              opacity: [0, 0.3, 0],
              scaleY: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute w-1 h-full bg-gradient-to-b from-transparent via-purple-400/8 to-transparent"
            style={{ left: "75%" }}
            animate={{
              opacity: [0, 0.2, 0],
              scaleY: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 6,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10"
        animate={{ opacity: isLoading ? 0.3 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="space-y-4">
          <DashboardHeader
            period={period}
            setPeriod={handlePeriodChange}
            quarter={quarter}
            setQuarter={handleQuarterChange}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={handleYearChange}
            showCaretaker={showCaretaker}
            setShowCaretaker={setShowCaretaker}
            userScope={userScope}
            setUserScope={setUserScope}
            selectedVertical={selectedVertical}
            onVerticalSelect={handleVerticalChange}
            viewingAsSM={viewingAsSM}
            viewingAsVM={viewingAsVM}
            viewingAsKAM={viewingAsKAM}
            activeDashboard={activeDashboard}
            onNavigateToPerformance={() => {
              setActiveDashboard(activeDashboard === 'commission' ? 'performance' : 'commission');
            }}
            onNavigateToCommission={() => {
              setActiveDashboard('performance');
            }}
            onNavigateToIndirectCommission={() => {
              setActiveDashboard(activeDashboard === 'indirect-commission' ? 'performance' : 'indirect-commission');
            }}
            comparisonMode={comparisonMode}
            setComparisonMode={setComparisonMode}
            comparisonPeriod={comparisonPeriod}
            setComparisonPeriod={setComparisonPeriod}
            comparisonQuarter={comparisonQuarter}
            setComparisonQuarter={setComparisonQuarter}
            comparisonMonth={comparisonMonth}
            setComparisonMonth={setComparisonMonth}
            comparisonYear={comparisonYear}
            setComparisonYear={setComparisonYear}
            selectedServiceDetails={selectedServiceDetails}
            serviceDetailsSegment={serviceDetailsSegment}
            serviceDetailsVertical={serviceDetailsVertical}
            selectedSegments={selectedSegments}
            selectedVerticals={selectedVerticals}
          />

          {/* Personalized Team Member Header */}
          {selectedTeamMember &&
            selectedMemberData &&
            !isLoading &&
            isViewingMemberDetail && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mx-6"
              >
                <div className="bg-gradient-to-r from-[rgba(239,246,255,0.8)] to-[rgba(238,242,255,0.8)] dark:from-blue-900/20 dark:to-indigo-900/20 rounded-[4px] border border-[rgba(190,219,255,0.3)] dark:border-blue-500/20 shadow-[0px_10px_15px_-3px_rgba(43,127,255,0.05),0px_4px_6px_-4px_rgba(43,127,255,0.05)] dark:shadow-blue-500/10 transition-colors duration-300">
                  <div className="p-2">
                    <div className="flex items-center justify-between gap-4">
                      {/* Breadcrumb Navigation - Left Side */}
                      <div className="flex items-center">
                        <Breadcrumb>
                          <BreadcrumbList className="flex items-center gap-2">
                            <BreadcrumbItem>
                              <BreadcrumbLink
                                onClick={() => {
                                  // Reset to GM view - clear all levels
                                  setViewingAsSM(null);
                                  setViewingAsVM(null);
                                  setViewingAsKAM(null);
                                  setSelectedTeamMember('');
                                }}
                                className="flex items-center gap-[3.5px] cursor-pointer hover:opacity-80 transition-opacity"
                              >
                                <div className="w-[10.5px] h-[10.5px]">
                                  <svg className="block w-full h-full" fill="none" viewBox="0 0 11 11">
                                    <path d={svgPaths.p1a7081e0} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
                                    <path d={svgPaths.p3286e6c0} stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.875" />
                                  </svg>
                                </div>
                                <span className="text-[11px] text-[#155dfc] dark:text-blue-400 leading-[14.667px]">General Manager</span>
                              </BreadcrumbLink>
                            </BreadcrumbItem>
                            
                            {(viewingAsSM || viewingAsVM || viewingAsKAM) && (
                              <>
                                <BreadcrumbSeparator className="mx-0">
                                  <div className="w-[12.25px] h-[12.25px]">
                                    <svg className="block w-full h-full" fill="none" viewBox="0 0 13 13">
                                      <path d={svgPaths.p9c60250} stroke="#51A2FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
                                    </svg>
                                  </div>
                                </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                  {(viewingAsVM || viewingAsKAM) ? (
                                    <BreadcrumbLink
                                      onClick={() => {
                                        // Reset to SM view - keep SM, clear VM and KAM
                                        setViewingAsVM(null);
                                        setViewingAsKAM(null);
                                        setSelectedTeamMember(viewingAsSM?.name || '');
                                      }}
                                      className="cursor-pointer hover:opacity-80 transition-opacity text-[11px] text-[#155dfc] dark:text-blue-400 leading-[14.667px]"
                                    >
                                      {viewingAsSM?.name || 'Senior Manager'}
                                    </BreadcrumbLink>
                                  ) : (
                                    <BreadcrumbPage className="text-[11px] text-[#193cb8] dark:text-blue-200 leading-[14.667px] font-bold">
                                      {viewingAsSM?.name || 'Senior Manager'}
                                    </BreadcrumbPage>
                                  )}
                                </BreadcrumbItem>
                              </>
                            )}
                            
                            {(viewingAsVM || viewingAsKAM) && (
                              <>
                                <BreadcrumbSeparator className="mx-0">
                                  <div className="w-[12.25px] h-[12.25px]">
                                    <svg className="block w-full h-full" fill="none" viewBox="0 0 13 13">
                                      <path d={svgPaths.p9c60250} stroke="#51A2FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
                                    </svg>
                                  </div>
                                </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                  {viewingAsKAM ? (
                                    <BreadcrumbLink
                                      onClick={() => {
                                        // Reset to VM view - keep SM and VM, clear KAM
                                        setViewingAsKAM(null);
                                        setSelectedTeamMember(viewingAsVM?.name || '');
                                      }}
                                      className="cursor-pointer hover:opacity-80 transition-opacity text-[11px] text-[#155dfc] dark:text-blue-400 leading-[14.667px]"
                                    >
                                      {viewingAsVM?.name || 'Vertical Manager'}
                                    </BreadcrumbLink>
                                  ) : (
                                    <BreadcrumbPage className="text-[11px] text-[#193cb8] dark:text-blue-200 leading-[14.667px] font-bold">
                                      {viewingAsVM?.name || 'Vertical Manager'}
                                    </BreadcrumbPage>
                                  )}
                                </BreadcrumbItem>
                              </>
                            )}
                            
                            {viewingAsKAM && (
                              <>
                                <BreadcrumbSeparator className="mx-0">
                                  <div className="w-[12.25px] h-[12.25px]">
                                    <svg className="block w-full h-full" fill="none" viewBox="0 0 13 13">
                                      <path d={svgPaths.p9c60250} stroke="#51A2FF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.02083" />
                                    </svg>
                                  </div>
                                </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                  <BreadcrumbPage className="text-[11px] text-[#193cb8] dark:text-blue-200 leading-[14.667px] font-bold">
                                    {viewingAsKAM.name}
                                  </BreadcrumbPage>
                                </BreadcrumbItem>
                              </>
                            )}
                          </BreadcrumbList>
                        </Breadcrumb>
                      </div>

                      {/* User Info Card - Right Side */}
                      <div className="bg-gradient-to-r from-[#d4e2f4] to-[#e6ecff] dark:from-blue-800/30 dark:to-indigo-800/30 rounded-[8.75px] border border-[#bedbff] dark:border-blue-600/30 p-[9px] transition-colors duration-300">
                        <div className="flex items-center gap-[7px]">
                          <div className="w-[28px] h-[28px] bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center shadow-[0px_0px_0px_2px_rgba(190,219,255,0.5)] transition-colors duration-300 flex-shrink-0">
                            <span className="text-white text-[10.5px] leading-[14px]">
                              {selectedMemberData.avatar}
                            </span>
                          </div>
                          <div className="flex flex-col gap-[1.75px]">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h2 className="text-[10.5px] leading-[14px] font-bold text-[#101828] dark:text-white transition-colors duration-300">
                                {selectedMemberData.name}
                              </h2>
                              <Badge className="h-[20.5px] px-[6.25px] py-[2.75px] bg-blue-100 dark:bg-blue-800/50 text-[#1447e6] dark:text-blue-200 border-[#bedbff] dark:border-blue-600/30 text-[10px] leading-[15px] transition-colors duration-300">
                                {viewingAsKAM ? 'KAM Level View' : viewingAsVM ? 'VM Level View' : viewingAsSM ? 'SM Level View' : 'Level View'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-[7px] flex-wrap">
                              <p className="text-[#4a5565] dark:text-gray-400 text-[11px] leading-[16.5px] transition-colors duration-300">
                                {selectedMemberData.role}
                              </p>
                            </div>
                            <p className="text-[#155dfc] dark:text-blue-400 text-[10.5px] leading-[14px] transition-colors duration-300">
                              Viewing personalized performance data for {period.toLowerCase()} {period === "Yearly" ? year : quarter}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
        </div>

        <div
          className="p-6 space-y-4"
          style={{
            contain: "layout",
            pointerEvents: isLoading ? "none" : "auto",
          }}
        >
          {/* Data Update Notification */}
          {isDataRefreshing && (
            <motion.div
              className="mx-auto max-w-md bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-500/30 rounded-lg p-4 text-center mb-6 transition-colors duration-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-center gap-2 text-blue-700 dark:text-blue-300 transition-colors duration-300">
                <motion.div
                  className="w-4 h-4 border-2 border-blue-500 dark:border-blue-400 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="text-sm font-medium">
                  Updating dashboard metrics for {period}{" "}
                  {period === "Yearly" ? year : quarter}...
                </span>
              </div>
            </motion.div>
          )}

          {/* Dashboard Content - Conditional Rendering */}
          {showActivationDetails ? (
            <div className="pb-[28px]">
              <ActivationDetailsPage
                comparisonMode={comparisonMode}
                onBack={() => {
                  setShowActivationDetails(false);
                }}
              />
            </div>
          ) : showTerminationDetails ? (
            <div className="pb-[28px]">
              <TerminationDetailsPage
                comparisonMode={comparisonMode}
                onBack={() => {
                  setShowTerminationDetails(false);
                }}
              />
            </div>
          ) : showCustomerBaseDetails ? (
            <div className="pb-[28px]">
              <CustomerBaseDetailsPage
                comparisonMode={comparisonMode}
                periodType={period}
                year={year}
                quarter={quarter}
                month={month}
                onBack={() => {
                  setShowCustomerBaseDetails(false);
                }}
              />
            </div>
          ) : showChurnRateDetails ? (
            <div className="pb-[28px]">
              <ChurnRateDetailsPage
                comparisonMode={comparisonMode}
                periodType={period}
                year={year}
                quarter={quarter}
                month={month}
                onBack={() => {
                  setShowChurnRateDetails(false);
                }}
              />
            </div>
          ) : selectedCustomer ? (
            <div className="pb-[28px]">
              <CompanyDetailsPage
                customer={selectedCustomer}
                comparisonMode={comparisonMode}
                onBack={() => {
                  setSelectedCustomer(null);
                }}
              />
            </div>
          ) : selectedServiceDetails ? (
            <div className="pb-[28px]">
              <ServiceDetailsPage
                serviceName={selectedServiceDetails.serviceName}
                serviceColor={selectedServiceDetails.serviceColor}
                userRole={effectiveUserScope?.role || 'General Manager'}
                comparisonMode={comparisonMode}
                comparisonYear={comparisonYear}
                year={year}
                onBack={() => {
                  setSelectedServiceDetails(null);
                  // Reset service details filters when going back
                  setServiceDetailsSegment('All');
                  setServiceDetailsVertical('All Verticals');
                }}
                onSegmentVerticalChange={(segment, vertical) => {
                  setServiceDetailsSegment(segment);
                  setServiceDetailsVertical(vertical);
                }}
              />
            </div>
          ) : activeDashboard === 'indirect-commission' ? (
            <IndirectCommissionDashboard
              period={period}
              quarter={quarter}
              year={year}
            />
          ) : activeDashboard === 'performance' ? (
            <PerformanceDashboard
              period={period}
              quarter={quarter}
              year={year}
              userScope={userScope}
              viewingAsSM={viewingAsSM}
              viewingAsVM={viewingAsVM}
              viewingAsKAM={viewingAsKAM}
              isDataRefreshing={isDataRefreshing}
              comparisonMode={comparisonMode}
              comparisonYear={comparisonYear}
              selectedSegments={selectedSegments}
              selectedVerticals={selectedVerticals}
              onSegmentsChange={handleSegmentsChange}
              onVerticalsChange={handleVerticalsChange}
              onServiceSelect={(serviceName: string, serviceColor: string) => {
                setSelectedServiceDetails({ serviceName, serviceColor });
              }}
              onCustomerSelect={(customer: any) => {
                setSelectedCustomer(customer);
              }}
              onActivationClick={() => {
                setShowActivationDetails(true);
              }}
              onTerminationClick={() => {
                setShowTerminationDetails(true);
              }}
              onCustomerBaseClick={() => {
                setShowCustomerBaseDetails(true);
              }}
              onChurnRateClick={() => {
                setShowChurnRateDetails(true);
              }}
            />
          ) : (
            <>
          {/* User View Navigation Tabs - Modern & Interactive */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center px-4"
          >
            <div className="inline-flex items-center gap-1.5 p-1 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-sm">
              {/* GM - Soft Purple */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setViewingAsSM(null);
                  setViewingAsVM(null);
                  setViewingAsKAM(null);
                  setSelectedTeamMember('');
                  setPerformanceLevel('high');
                  setIsViewingMemberDetail(false); // Clean view - no breadcrumb/user card
                }}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200
                  ${!viewingAsSM && !viewingAsVM && !viewingAsKAM
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50/50 dark:hover:bg-purple-900/10'
                  }
                `}
              >
                <Home className="w-4 h-4" />
                <span className="whitespace-nowrap">GM</span>
              </motion.button>
              {/* Senior Manager - Soft Blue */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const defaultSM: UserScope = {
                    role: 'Senior Manager',
                    managerId: 'SM001',
                    segment: 'Large Business',
                    verticals: ['Government & Financial Accounts', 'Healthcare', 'Education & Hospitality Accounts', 'Retail & Technology Accounts', 'Manufacturing & Infrastructure Accounts'],
                    selection: 'all',
                    name: 'Sami Talal Khaled'
                  };
                  setViewingAsSM(defaultSM);
                  setViewingAsVM(null);
                  setViewingAsKAM(null);
                  setSelectedTeamMember('');
                  setPerformanceLevel('normal');
                  setIsViewingMemberDetail(false); // Clean view - no breadcrumb/user card
                }}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200
                  ${viewingAsSM && !viewingAsVM && !viewingAsKAM
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
                  }
                `}
              >
                <Users className="w-4 h-4" />
                <span className="whitespace-nowrap">Senior Manager</span>
              </motion.button>
              {/* Vertical Manager - Soft Green */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const defaultSM: UserScope = {
                    role: 'Senior Manager',
                    managerId: 'SM001',
                    segment: 'Large Business',
                    verticals: ['Government & Financial Accounts', 'Healthcare', 'Education & Hospitality Accounts', 'Retail & Technology Accounts', 'Manufacturing & Infrastructure Accounts'],
                    selection: 'all',
                    name: 'Sami Talal Khaled'
                  };
                  const defaultVM: UserScope = {
                    role: 'Vertical Manager',
                    managerId: 'VM0001',
                    segment: 'Large Business',
                    verticals: ['Retail & Technology Accounts'],
                    selection: 'all',
                    name: 'Ahmed Al-Rashid'
                  };
                  setViewingAsSM(defaultSM);
                  setViewingAsVM(defaultVM);
                  setViewingAsKAM(null);
                  setSelectedTeamMember('');
                  setPerformanceLevel('normal');
                  setIsViewingMemberDetail(false); // Clean view - no breadcrumb/user card
                }}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200
                  ${viewingAsVM && !viewingAsKAM
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-green-50/50 dark:hover:bg-green-900/10'
                  }
                `}
              >
                <UserCircle className="w-4 h-4" />
                <span className="whitespace-nowrap">Vertical Manager</span>
              </motion.button>
              {/* KAM - Soft Orange */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const defaultSM: UserScope = {
                    role: 'Senior Manager',
                    managerId: 'SM001',
                    segment: 'Large Business',
                    verticals: ['Government & Financial Accounts', 'Healthcare', 'Education & Hospitality Accounts', 'Retail & Technology Accounts', 'Manufacturing & Infrastructure Accounts'],
                    selection: 'all',
                    name: 'Sami Talal Khaled'
                  };
                  const defaultVM: UserScope = {
                    role: 'Vertical Manager',
                    managerId: 'VM0001',
                    segment: 'Large Business',
                    verticals: ['Retail & Technology Accounts'],
                    selection: 'all',
                    name: 'Ahmed Al-Rashid'
                  };
                  setViewingAsSM(defaultSM);
                  setViewingAsVM(defaultVM);
                  setViewingAsKAM({
                    kamId: 'KAM001',
                    name: 'Ahmed Al-Rashid',
                    role: 'Key Account Manager',
                    vertical: 'Retail & Technology Accounts',
                    segment: 'Large Business'
                  });
                  setSelectedTeamMember('');
                  setPerformanceLevel('normal');
                  setIsViewingMemberDetail(false); // Clean view - no breadcrumb/user card
                }}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200
                  ${viewingAsKAM
                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-orange-50/50 dark:hover:bg-orange-900/10'
                  }
                `}
              >
                <Briefcase className="w-4 h-4" />
                <span className="whitespace-nowrap">KAM</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Performance Metrics Cards */}
          <motion.div
            style={{ contain: "layout" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: isDataRefreshing ? 0.7 : 1,
              y: 0,
              scale: isDataRefreshing ? 0.98 : 1,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileInView={{
              scale: [0.95, 1],
              transition: { duration: 0.5 },
            }}
            viewport={{ once: true }}
          >
            <MetricsCards
              quarter={quarter}
              selectedTeamMember={selectedTeamMember}
              period={period}
              showCaretaker={showCaretaker}
              userScope={effectiveUserScope}
              selectedVertical={selectedVertical}
              spAchieved={spAchieved}
              spPercentage={spPercentage}
              performanceLevel={performanceLevel}
            />
          </motion.div>

          {/* Row 1: Revenue Summary, Strategic Priority, Customer Satisfaction */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:items-stretch"
            style={{ contain: "layout" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut",
            }}
            whileInView={{
              scale: [0.95, 1],
              transition: {
                duration: 0.5,
                staggerChildren: 0.1,
              },
            }}
            viewport={{ once: true }}
          >
            {/* Revenue Summary - Left */}
            <motion.div
              className="rounded-xl overflow-hidden backdrop-blur-sm h-full flex flex-col bg-white/95 dark:bg-[#111D41] border border-gray-200/50 dark:border-[#213066]"
              initial={{
                borderColor: "rgba(229, 231, 235, 0.2)",
                boxShadow: "none",
              }}
              whileHover={{
                borderColor: "rgba(245, 158, 11, 0.3)",
                boxShadow:
                  "0 0 0 1px rgba(245, 158, 11, 0.3), 0 8px 25px rgba(245, 158, 11, 0.08)",
                transition: {
                  duration: 0.25,
                  ease: "easeInOut",
                },
              }}
            >
              <RevenueBreakdown
                selectedTeamMember={selectedTeamMember}
                hideChart={true}
                period={period}
                quarter={quarter}
                userScope={effectiveUserScope}
                selectedVertical={selectedVertical}
              />
            </motion.div>

            {/* Strategic Priority (SP Q1over Q2) - Center */}
            <motion.div
              className="rounded-xl overflow-hidden backdrop-blur-sm h-full flex flex-col bg-white/95 dark:bg-[#111D41] border border-gray-200/50 dark:border-[#213066]"
              initial={{
                borderColor: "rgba(229, 231, 235, 0.2)",
                boxShadow: "none",
              }}
              whileHover={{
                borderColor: "rgba(244, 63, 94, 0.3)",
                boxShadow:
                  "0 0 0 1px rgba(244, 63, 94, 0.3), 0 8px 25px rgba(244, 63, 94, 0.08)",
                transition: {
                  duration: 0.25,
                  ease: "easeInOut",
                },
              }}
            >
              <StrategicPriorities
                selectedTeamMember={selectedTeamMember}
                userScope={effectiveUserScope}
                selectedVertical={selectedVertical}
                period={period}
                quarter={quarter}
                onAchievementChange={handleSpAchievementChange}
                performanceLevel={performanceLevel}
              />
            </motion.div>

            {/* Customer Satisfaction - Right */}
            <motion.div
              className="rounded-xl overflow-hidden backdrop-blur-sm h-full flex flex-col bg-white/95 dark:bg-[#111D41] border border-gray-200/50 dark:border-[#213066]"
              initial={{
                borderColor: "rgba(229, 231, 235, 0.2)",
                boxShadow: "none",
              }}
              whileHover={{
                borderColor: "rgba(16, 185, 129, 0.3)",
                boxShadow:
                  "0 0 0 1px rgba(16, 185, 129, 0.3), 0 8px 25px rgba(16, 185, 129, 0.08)",
                transition: {
                  duration: 0.25,
                  ease: "easeInOut",
                },
              }}
            >
              <CXMetrics
                selectedTeamMember={selectedTeamMember}
                period={period}
                quarter={quarter}
                userScope={userScope}
                selectedVertical={selectedVertical}
                viewingAsVM={viewingAsVM}
                viewingAsKAM={viewingAsKAM}
                performanceLevel={performanceLevel}
              />
            </motion.div>
          </motion.div>

          {/* Conditional Layout: Vertical Level vs KAM Level */}
          {!isKAMLevel ? (
            /* Vertical Level Layout - Row 2: Team Performance Leaderboard (Full Width) */
            <motion.div
              className="grid grid-cols-1"
              style={{ contain: "layout" }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: "easeOut",
              }}
              whileInView={{
                scale: [0.95, 1],
                transition: { duration: 0.5 },
              }}
              viewport={{ once: true }}
            >
              {/* Team Performance Leaderboard - Full width */}
              <motion.div
                className="rounded-xl overflow-hidden backdrop-blur-sm h-full bg-white/95 dark:bg-[#111D41] border border-gray-200/50 dark:border-[#213066]"
                initial={{
                  borderColor: "rgba(229, 231, 235, 0.2)",
                  boxShadow: "none",
                }}
                whileHover={{
                  borderColor: "rgba(139, 92, 246, 0.3)",
                  boxShadow:
                    "0 0 0 1px rgba(139, 92, 246, 0.3), 0 8px 25px rgba(139, 92, 246, 0.08)",
                  transition: {
                    duration: 0.25,
                    ease: "easeInOut",
                  },
                }}
              >
                <TeamLeaderboard
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedTeamMember={selectedTeamMember}
                  onTeamMemberSelect={
                    isLoading
                      ? () => {}
                      : handleTeamMemberSelect
                  }
                  userRole={userScope?.role}
                  viewingAsSM={viewingAsSM}
                  viewingAsVM={viewingAsVM}
                  period={period}
                  quarter={quarter}
                  onNavigateToCommission={() => setActiveDashboard('commission')}
                  activeDashboard={activeDashboard}
                />
              </motion.div>
            </motion.div>
          ) : (
            /* KAM Level Layout - Row 2: Monthly Performance Trend & Commission Distribution */
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-4"
              style={{ contain: "layout" }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: "easeOut",
              }}
              whileInView={{
                scale: [0.95, 1],
                transition: { duration: 0.5 },
              }}
              viewport={{ once: true }}
            >
              {/* Monthly Performance Trend */}
              <motion.div
                className="rounded-xl overflow-hidden h-full backdrop-blur-sm bg-white/95 dark:bg-[#111D41] border border-gray-200/50 dark:border-[#213066]"
                style={{ contain: "layout style" }}
                initial={{
                  borderColor: "rgba(229, 231, 235, 0.2)",
                  boxShadow: "none",
                }}
                whileHover={{
                  borderColor: "rgba(14, 165, 233, 0.3)",
                  boxShadow:
                    "0 0 0 1px rgba(14, 165, 233, 0.3), 0 8px 25px rgba(14, 165, 233, 0.08)",
                  transition: {
                    duration: 0.25,
                    ease: "easeInOut",
                  },
                }}
              >
                <ImprovedPerformanceTrends
                  selectedTeamMember={selectedTeamMember}
                  period={period}
                  quarter={quarter}
                  year={year}
                />
              </motion.div>

              {/* Commission Distribution (Score Distribution) */}
              <motion.div
                className="rounded-xl overflow-hidden h-full backdrop-blur-sm bg-white/95 dark:bg-[#111D41] border border-gray-200/50 dark:border-[#213066]"
                initial={{
                  borderColor: "rgba(229, 231, 235, 0.2)",
                  boxShadow: "none",
                }}
                whileHover={{
                  borderColor: "rgba(99, 102, 241, 0.3)",
                  boxShadow:
                    "0 0 0 1px rgba(99, 102, 241, 0.3), 0 8px 25px rgba(99, 102, 241, 0.08)",
                  transition: {
                    duration: 0.25,
                    ease: "easeInOut",
                  },
                }}
              >
                <ImprovedScoreDistribution
                  selectedTeamMember={selectedTeamMember}
                  showCaretaker={showCaretaker}
                  period={period}
                  quarter={quarter}
                  year={year}
                  revenuePct={revenuePct}
                  strategicPct={spPercentage}
                  cxPct={cxPct}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Companies Performance Widget - Hidden */}
          {false && !isKAMLevel && (
            <motion.div
              className="grid grid-cols-1"
              style={{ contain: "layout" }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: "easeOut",
              }}
              whileInView={{
                scale: [0.95, 1],
                transition: { duration: 0.5 },
              }}
              viewport={{ once: true }}
            >
              <motion.div
                className="rounded-xl overflow-hidden backdrop-blur-sm h-full bg-white/95 dark:bg-[#111D41] border border-gray-200/50 dark:border-[#213066]"
                initial={{
                  borderColor: "rgba(229, 231, 235, 0.2)",
                  boxShadow: "none",
                }}
                whileHover={{
                  borderColor: "rgba(59, 130, 246, 0.3)",
                  boxShadow:
                    "0 0 0 1px rgba(59, 130, 246, 0.3), 0 8px 25px rgba(59, 130, 246, 0.08)",
                  transition: {
                    duration: 0.25,
                    ease: "easeInOut",
                  },
                }}
              >
                <CompaniesPerformance period={period} quarter={quarter} year={year} />
              </motion.div>
            </motion.div>
          )}

          {/* Row 3: Performance Trends & Score Distribution - Only for Vertical Level */}
          {!isKAMLevel && (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-[6fr_4fr] gap-4"
              style={{ contain: "layout" }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: "easeOut",
              }}
              whileInView={{
                scale: [0.95, 1],
                transition: { duration: 0.5 },
              }}
              viewport={{ once: true }}
            >
              {/* Performance Trends (60% width) */}
              <motion.div
                className="rounded-xl overflow-hidden h-full backdrop-blur-sm bg-white/95 dark:bg-[#111D41] border border-gray-200/50 dark:border-[#213066]"
                style={{ contain: "layout style" }}
                initial={{
                  borderColor: "rgba(229, 231, 235, 0.2)",
                  boxShadow: "none",
                }}
                whileHover={{
                  borderColor: "rgba(14, 165, 233, 0.3)",
                  boxShadow:
                    "0 0 0 1px rgba(14, 165, 233, 0.3), 0 8px 25px rgba(14, 165, 233, 0.08)",
                  transition: {
                    duration: 0.25,
                    ease: "easeInOut",
                  },
                }}
              >
                <ImprovedPerformanceTrends
                  selectedTeamMember={selectedTeamMember}
                  period={period}
                  quarter={quarter}
                  year={year}
                />
              </motion.div>

              {/* Score Distribution (40% width) */}
              <motion.div
                className="rounded-xl overflow-hidden h-full backdrop-blur-sm bg-white/95 dark:bg-[#111D41] border border-gray-200/50 dark:border-[#213066]"
                initial={{
                  borderColor: "rgba(229, 231, 235, 0.2)",
                  boxShadow: "none",
                }}
                whileHover={{
                  borderColor: "rgba(99, 102, 241, 0.3)",
                  boxShadow:
                    "0 0 0 1px rgba(99, 102, 241, 0.3), 0 8px 25px rgba(99, 102, 241, 0.08)",
                  transition: {
                    duration: 0.25,
                    ease: "easeInOut",
                  },
                }}
              >
                <ImprovedScoreDistribution
                  selectedTeamMember={selectedTeamMember}
                  showCaretaker={showCaretaker}
                  period={period}
                  quarter={quarter}
                  year={year}
                  revenuePct={revenuePct}
                  strategicPct={spPercentage}
                  cxPct={cxPct}
                />
              </motion.div>
            </motion.div>
          )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}