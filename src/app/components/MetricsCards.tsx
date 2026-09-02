import React, { useState, useEffect } from "react";
import {
  Trophy,
  TrendingUp,
  Target,
  Users,
  AlertTriangle,
} from "lucide-react";
import { motion, useAnimationControls } from "motion/react";
import {
  useAnimatedPercentage,
  useAnimatedNumber,
} from "../hooks/useAnimatedCounter";
import { useDashboardData } from "../hooks/useDashboardData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface MetricCardProps {
  title: string;
  value: string;
  percentage: string;
  threshold: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ReactNode;
  label: string;
  isMain?: boolean;
  index: number;
  kpiWeight?: string;
  isUnderThreshold?: boolean;
  animatedValue?: string;
  isAnimating?: boolean;
  showCaretaker?: boolean;
  caretakerValue?: string;
}

interface CaretakerChipProps {
  value: string;
  title: string;
}

// Caretaker Chip Component
function CaretakerChip({ value, title }: CaretakerChipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="inline-flex items-center px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-full border border-orange-200 dark:border-orange-700/50 cursor-help ml-2"
          >
            <span className="text-xs font-medium">
              {value}
            </span>
          </motion.span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Caretaker contribution included when covering another role.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// ---------- Drop-in JS/TS fix (front-end) ----------
type PctLike = number | string | { value?: number | string };
type MoneyLike = number | string | { value?: number | string };

const toNum = (v: PctLike | MoneyLike): number => {
  const x =
    typeof v === "object" && v !== null ? (v as any).value : v;
  if (typeof x === "number") return x;
  if (typeof x === "string")
    return parseFloat(x.replace(/[^\d.-]/g, "")) || 0;
  return 0;
};

// If your source is 0.858 instead of 85.8, set FRACTION_INPUT=true
const FRACTION_INPUT = false;

const normalizePct = (v: PctLike): number => {
  const n = toNum(v);
  return FRACTION_INPUT ? n * 100 : n; // ensure result in [0..100] %
};

const formatPct = (n: number, digits = 1) =>
  `${n.toFixed(digits)}%`;
const formatMoney = (n: number) =>
  `${n >= 1000 ? (n / 1000).toFixed(1) + "K" : n.toFixed(0)} OMR`;

function AnimatedValue({
  value,
  isAnimating,
  showCaretaker,
  caretakerValue,
  title,
}: {
  value: string;
  isAnimating?: boolean;
  showCaretaker?: boolean;
  caretakerValue?: string;
  title?: string;
}) {
  // Check if the value contains a dual format (percentage | amount)
  if (value.includes("|")) {
    const [firstPart, secondPart] = value
      .split("|")
      .map((part) => part.trim());

    // Format the percentage part - ensure it includes the % symbol if it's a number
    const formattedFirstPart = 
      firstPart && !firstPart.includes("%") && !isNaN(Number(firstPart))
        ? `${firstPart}%`
        : firstPart;

    // All cards: Percentage first (bold), amount second (normal weight)
    return (
      <span className="inline-flex items-center flex-wrap">
        <motion.span
          className="inline-block"
          animate={
            isAnimating
              ? {
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 1],
                }
              : {}
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="font-bold text-[14px] sm:text-[18px] text-[#274afa]">
            {formattedFirstPart}
          </span>
          <span className="mx-1.5 text-gray-400 dark:text-gray-500">
            |
          </span>
          <span className="font-normal text-[#274afa] text-[14px] sm:text-[16px]">
            {secondPart}
          </span>
        </motion.span>
      </span>
    );
  }

  // Single value (fallback)
  return (
    <span className="inline-flex items-center flex-wrap">
      <motion.span
        className="inline-block"
        style={{
          WebkitTextFillColor: "inherit",
          color: "inherit",
        }}
        animate={
          isAnimating
            ? {
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 1],
              }
            : {}
        }
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {value}
      </motion.span>
    </span>
  );
}

function MetricCard({
  title,
  value,
  percentage,
  threshold,
  change,
  changeType,
  icon,
  label,
  isMain = false,
  index,
  kpiWeight,
  isUnderThreshold = false,
  animatedValue,
  isAnimating,
  showCaretaker = false,
  caretakerValue,
}: MetricCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const iconControls = useAnimationControls();

  const handleHoverStart = () => {
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  const displayValue = animatedValue || value;

  if (isMain) {
    // Overall Achievement card - with circle background behind tagchip
    return (
      <motion.div
        className="relative rounded-xl w-full min-h-[140px] sm:min-h-[150px] border-l-4 border-l-blue-400 border border-black/[0.08] dark:border-white/[0.08] transition-all duration-200 ease-out overflow-hidden"
        data-name="Total Revenue Card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.1,
          duration: 0.5,
          ease: "easeOut",
        }}
        whileHover={{
          scale: 1.015,
          transition: { duration: 0.2, ease: "easeOut" },
        }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        style={{
          contain: "layout style paint",
          isolation: "isolate",
          willChange: isHovered ? "transform" : "auto",
          boxShadow: isHovered
            ? "0 6px 20px rgba(35, 97, 255, 0.15)"
            : "0 2px 8px rgba(0, 0, 0, 0.1)",
          borderLeftColor: isHovered ? "#2361FF" : "#60A5FA",
        }}
        title="Weighted: Strategic 40%, CX 30%, Revenue 30%"
      >
        <div className="flex flex-row items-center relative size-full">
          <div className="box-border content-stretch flex flex-row items-center justify-start overflow-clip p-[16px] relative size-full bg-white dark:bg-[#07112F] transition-colors duration-300">
            <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
              <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow h-full items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
                <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                  {/* Header */}
                  <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
                    <div className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                      <div className="flex items-center gap-2">
                        <div
                          className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[13px] sm:text-[15px] text-[rgba(0,11,37,0.64)] dark:text-gray-200 text-left transition-colors duration-300"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          <p className="block leading-[1.2] whitespace-pre">
                            {title}
                          </p>
                        </div>
                        {isUnderThreshold && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              delay: 0.3,
                              type: "spring",
                              stiffness: 150,
                            }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                          </motion.div>
                        )}
                      </div>
                    </div>
                    <div className="relative rounded-[29px] shrink-0">
                      <div className="flex flex-row items-center relative size-full">
                        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start overflow-clip px-3 py-1 relative size-full">
                          <div
                            className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[#0066ff] dark:text-blue-400 text-[14px] text-left text-nowrap transition-colors duration-300"
                            style={{
                              fontVariationSettings:
                                "'wdth' 100",
                            }}
                          >
                            <p className="block leading-[1.2] whitespace-pre text-[14px] text-[13px]">
                              Overall KPI Result
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        aria-hidden="true"
                        className="absolute border border-blue-200/30 dark:border-blue-500/20 border-solid inset-0 pointer-events-none rounded-[29px] transition-colors duration-300"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
                    <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                      <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                        <div className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full">
                          <div className="basis-0 box-border content-stretch flex flex-row gap-3 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
                            {/* Trophy Icon */}
                            <motion.div
                              className="bg-[rgba(59,130,246,0.1)] dark:bg-blue-500/20 box-border content-stretch flex flex-row gap-[5.889px] h-[40px] items-center justify-center p-0 relative rounded-[7.361px] shrink-0 w-[36px] transition-colors duration-300"
                              whileHover={{
                                backgroundColor:
                                  "rgba(59,130,246,0.15)",
                                transition: { duration: 0.2 },
                              }}
                              transition={{ duration: 0.2 }}
                              style={{
                                transformOrigin: "center",
                              }}
                            >
                              <div className="absolute border-[1.472px] border-blue-200/40 dark:border-blue-500/20 border-solid inset-0 pointer-events-none rounded-[7.361px] transition-colors duration-300" />
                              <motion.div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#0066ff] dark:text-blue-400 text-[29.444px] text-center text-nowrap transition-colors duration-300">
                                <Trophy size={20} />
                              </motion.div>
                            </motion.div>

                            {/* Container */}
                            <div className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                              <motion.div
                                className="font-['Roboto:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] sm:text-[24px] text-left"
                                style={{
                                  fontVariationSettings:
                                    "'wdth' 100",
                                  color: "#274afa", // Always visible for better readability
                                  WebkitTextFillColor:
                                    "#274afa",
                                }}
                              >
                                <p className="block leading-[1.2] whitespace-pre">
                                  <AnimatedValue
                                    value={displayValue}
                                    isAnimating={isAnimating}
                                    showCaretaker={showCaretaker}
                                    caretakerValue={caretakerValue}
                                    title={title}
                                  />
                                </p>
                              </motion.div>
                              {/* Footer */}
                              <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] p-0 relative shrink-0 text-[14px] text-left w-full">
                                <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-[rgba(0,11,37,0.57)] text-nowrap">
                                  <p className="block leading-[normal] whitespace-pre"></p>
                                </div>
                                <motion.div
                                  className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow min-h-px min-w-px relative shrink-0 text-[rgba(0,11,37,0.64)] dark:text-gray-300 transition-colors duration-300"
                                  style={{
                                    fontVariationSettings:
                                      "'wdth' 100",
                                  }}
                                >
                                  <p className="block leading-[24px] inline-flex items-center gap-1 flex-wrap">
                                    <span>
                                      {isMain
                                        ? "Combined KPI"
                                        : threshold}
                                    </span>
                                    {showCaretaker && caretakerValue && (
                                      <CaretakerChip value={caretakerValue} title={title} />
                                    )}
                                  </p>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="h-0 relative shrink-0 w-full">
                    <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 288 1"
                      >
                        <motion.line
                          stroke="currentColor"
                          className="text-gray-200 dark:text-gray-700 transition-colors duration-300"
                          x2="288"
                          y1="0.5"
                          y2="0.5"
                          animate={
                            isHovered
                              ? { stroke: "#3b82f6" }
                              : { stroke: "currentColor" }
                          }
                          transition={{ duration: 0.3 }}
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Footer Container */}
                  <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
                      <div className="flex flex-row items-center self-stretch">
                        <div className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-start leading-[0] p-0 relative shrink-0 text-nowrap">
                          {/* Revenue Icon */}
                          <div className="box-border content-stretch flex flex-row gap-1 h-full items-center justify-center p-0 relative rounded-[5px] shrink-0 text-[16px] text-green-500">
                            <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-center">
                              <p className="block leading-[normal] text-nowrap whitespace-pre"></p>
                            </div>
                            <motion.div
                              className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-left text-green-500"
                              style={{
                                fontVariationSettings:
                                  "'wdth' 100",
                                display: "inline-block",
                              }}
                              animate={
                                isHovered
                                  ? { scale: 1.02 }
                                  : { scale: 1 }
                              }
                              transition={{ duration: 0.2 }}
                            >
                              <p className="block leading-[1.2] text-nowrap whitespace-pre">
                                {change}
                              </p>
                            </motion.div>
                          </div>
                          <div
                            className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[12px] text-[rgba(0,11,37,0.64)] dark:text-gray-400 text-left transition-colors duration-300"
                            style={{
                              fontVariationSettings:
                                "'wdth' 100",
                            }}
                          >
                            <p className="block leading-[1.2] text-nowrap whitespace-pre">
                              vs last period
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Label */}
                      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
                        <motion.div
                          className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-blue-500 dark:text-blue-400 text-left text-nowrap transition-colors duration-300"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                          }}
                        >
                          <p className="block leading-[24px] whitespace-pre">
                            {label}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Background Circle - kept for Overall Achievement */}
            <motion.div
              className="absolute right-0 top-0 size-[100px] pointer-events-none hidden lg:block"
              animate={
                isHovered
                  ? { scale: 1.1, opacity: 0.8 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ transformOrigin: "center" }}
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  fill="var(--fill-0, #3B82F6)"
                  fillOpacity="0.05"
                  r="50"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Other cards - NO circle background behind tagchips
  return (
    <motion.div
      className="relative rounded-xl w-full min-h-[140px] sm:min-h-[150px] border-l-4 border-l-blue-400 border border-black/[0.08] dark:border-white/[0.08] transition-all duration-200 ease-out overflow-hidden bg-white/[0.15] dark:bg-white/[0.05] backdrop-blur-[8px]"
      data-name="Total Revenue Card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.015,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      style={{
        contain: "layout style paint",
        isolation: "isolate",
        willChange: isHovered ? "transform" : "auto",
        boxShadow: isHovered
          ? "0 6px 20px rgba(35, 97, 255, 0.15)"
          : "0 2px 8px rgba(0, 0, 0, 0.1)",
        borderLeftColor: isHovered ? "#2361FF" : "#60A5FA",
      }}
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start p-[16px] relative w-full bg-white dark:bg-[#07112F] transition-colors duration-300">
          <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
            <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow h-full items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
              <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                {/* Header */}
                <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
                  <div className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="font-['Roboto:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[13px] sm:text-[15px] text-[rgba(0,11,37,0.64)] dark:text-gray-200 text-left transition-colors duration-300"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                        }}
                      >
                        <p className="block leading-[1.2] whitespace-pre">
                          {title}
                        </p>
                      </motion.div>
                      {isUnderThreshold && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 150,
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                  {/* Tagchip WITHOUT circle background */}
                  <motion.div
                    className="relative rounded-[29px] shrink-0 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200/30 dark:border-blue-500/20 transition-colors duration-300"
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-row items-center relative size-full">
                      <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center overflow-clip px-3 py-1 relative size-full">
                        <div
                          className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-[#0066ff] dark:text-blue-400 text-[14px] text-center text-nowrap transition-colors duration-300"
                          style={{
                            fontVariationSettings: "'wdth' 100",
                            lineHeight: '1',
                          }}
                        >
                          <p className="block whitespace-pre" style={{ lineHeight: '1' }}>
                            {kpiWeight || "40%"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
                  <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                      <div className="box-border content-stretch flex flex-row items-center justify-start p-0 relative shrink-0 w-full">
                        <div className="basis-0 box-border content-stretch flex flex-row gap-3 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
                          {/* Icon */}
                          <motion.div
                            className="bg-[rgba(59,130,246,0.1)] dark:bg-blue-500/20 box-border content-stretch flex flex-row gap-[5.889px] h-[40px] items-center justify-center p-0 relative rounded-[7.361px] shrink-0 w-[36px] transition-colors duration-300"
                            whileHover={{
                              backgroundColor:
                                "rgba(59,130,246,0.15)",
                              transition: { duration: 0.2 },
                            }}
                            transition={{ duration: 0.2 }}
                            style={{
                              transformOrigin: "center",
                            }}
                          >
                            <div className="absolute border-[1.472px] border-blue-200/40 dark:border-blue-500/20 border-solid inset-0 pointer-events-none rounded-[7.361px] transition-colors duration-300" />
                            <motion.div className="text-[#0066ff] dark:text-blue-400 text-[29.444px] transition-colors duration-300">
                              {icon}
                            </motion.div>
                          </motion.div>

                          {/* Value and Threshold */}
                          <div className="basis-0 box-border content-stretch flex flex-col gap-0 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                            <motion.div
                              className="font-['Roboto:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[20px] sm:text-[24px] text-left"
                              style={{
                                fontVariationSettings:
                                  "'wdth' 100",
                                background:
                                  "linear-gradient(to top, #274afa, #4a43fbcc)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "#274afa", // Always visible
                                WebkitTextFillColor: "#274afa", // Always visible
                              }}
                            >
                              <p className="block leading-[1.2] whitespace-pre">
                                <AnimatedValue
                                  value={displayValue}
                                  isAnimating={isAnimating}
                                  showCaretaker={showCaretaker}
                                  caretakerValue={caretakerValue}
                                  title={title}
                                />
                              </p>
                            </motion.div>
                            <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] p-0 relative shrink-0 text-[14px] text-left w-full">
                              <motion.div
                                className="basis-0 font-['Roboto:Regular',_sans-serif] font-normal grow min-h-px min-w-px relative shrink-0 text-[rgba(0,11,37,0.64)] dark:text-gray-300 transition-colors duration-300"
                                style={{
                                  fontVariationSettings:
                                    "'wdth' 100",
                                }}
                              >
                                <p className="block leading-[24px] inline-flex items-center gap-1 flex-wrap">
                                  <span>
                                    {isMain
                                      ? "Combined KPI Result"
                                      : threshold}
                                  </span>
                                  {showCaretaker && caretakerValue && (
                                    <CaretakerChip value={caretakerValue} title={title} />
                                  )}
                                </p>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Separator */}
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 288 1"
                    >
                      <motion.line
                        stroke="currentColor"
                        className="text-gray-200 dark:text-gray-700 transition-colors duration-300"
                        x2="288"
                        y1="0.5"
                        y2="0.5"
                        animate={
                          isHovered
                            ? { stroke: "#3b82f6" }
                            : { stroke: "currentColor" }
                        }
                        transition={{ duration: 0.3 }}
                      />
                    </svg>
                  </div>
                </div>

                {/* Footer Container */}
                <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-full">
                  <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
                    <div className="flex flex-row items-center self-stretch">
                      <div className="box-border content-stretch flex flex-row gap-2 h-full items-center justify-start leading-[0] p-0 relative shrink-0 text-nowrap">
                        {/* Revenue Icon */}
                        <div className="box-border content-stretch flex flex-row gap-1 h-full items-center justify-center p-0 relative rounded-[5px] shrink-0 text-[16px] text-green-500">
                          <div className="font-['Font_Awesome_6_Pro:Regular',_sans-serif] not-italic relative shrink-0 text-center">
                            <p className="block leading-[normal] text-nowrap whitespace-pre"></p>
                          </div>
                          <motion.div
                            className="font-['Roboto:Medium',_sans-serif] font-medium relative shrink-0 text-left text-green-500"
                            style={{
                              fontVariationSettings:
                                "'wdth' 100",
                              display: "inline-block",
                            }}
                            animate={
                              isHovered
                                ? { scale: 1.02 }
                                : { scale: 1 }
                            }
                            transition={{ duration: 0.2 }}
                          >
                            <p className="block leading-[1.2] text-nowrap whitespace-pre">
                              {change}
                            </p>
                          </motion.div>
                        </div>
                        <div
                          className="font-['Roboto:Regular',_sans-serif] font-normal relative shrink-0 text-[12px] text-[rgba(0,11,37,0.64)] dark:text-gray-400 text-left transition-colors duration-300"
                          style={{
                            fontVariationSettings:
                              "'wdth' 100",
                          }}
                        >
                          <p className="block leading-[1.2] text-nowrap whitespace-pre">
                            vs last period
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Label */}
                    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
                      <motion.div
                        className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[14px] text-blue-500 dark:text-blue-400 text-left text-nowrap transition-colors duration-300"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                        }}
                      >
                        <p className="block leading-[24px] whitespace-pre text-[12px]">
                          {label}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import type { UserScope } from '../utils/scopeResolver';

interface MetricsCardsProps {
  quarter: string;
  selectedTeamMember?: string;
  period: string;
  showCaretaker?: boolean;
  userScope?: UserScope;
  selectedVertical?: string | null;
  spAchieved?: boolean;
  spPercentage?: number;
  performanceLevel?: 'high' | 'low' | 'normal';
}

export function MetricsCards({ 
  quarter, 
  selectedTeamMember, 
  period,
  showCaretaker = false,
  userScope,
  selectedVertical,
  spAchieved = true,
  spPercentage = 100,
  performanceLevel = 'normal'
}: MetricsCardsProps) {
  const dashboardData = useDashboardData(period, quarter, selectedTeamMember, userScope, selectedVertical);

  // Adjust KPI values based on performance level
  let revenuePct: number;
  let strategicPct: number;
  let cxPct: number;

  if (performanceLevel === 'high') {
    // Top performer - all KPIs should be high (above 90%)
    revenuePct = 96.5;
    strategicPct = 100; // Binary: Strategic Priorities is either 0% or 100%
    cxPct = 92.3;
  } else if (performanceLevel === 'low') {
    // Lowest performer - all KPIs should be low (below 70%)
    revenuePct = 65.2;
    strategicPct = 0; // Binary: Strategic Priorities is either 0% or 100%
    cxPct = 62.8;
  } else {
    // Normal - use default values
    revenuePct = 92.1;
    strategicPct = spPercentage; // Use Strategic Priorities achievement from StrategicPriorities component
    cxPct = 78.2;
  }

  // Calculate overall achievement using weighted formula (50/30/20)
  const overallPct = (revenuePct * 50 + strategicPct * 30 + cxPct * 20) / 100;

  // Calculate base OMR amounts (scaled versions)
  const revenueOMR = (revenuePct / 100) * 97000; // ~89.37K OMR
  const strategicOMR = (strategicPct / 100) * 34000; // ~29.17K OMR
  const cxOMR = (cxPct / 100) * 38000; // ~29.72K OMR  
  const overallOMR = revenueOMR + strategicOMR + cxOMR; // ~148.26K OMR

  // Caretaker contributions (example values)
  const caretakerContributions = showCaretaker ? {
    revenue: "+4.1K OMR",
    strategic: "+3.2K OMR",
    cx: "+2.8K OMR", 
    overall: "+10.1K OMR"
  } : undefined;

  const animatedRevenue = useAnimatedPercentage(revenuePct, { duration: 1900 });
  const animatedStrategic = useAnimatedPercentage(strategicPct, { duration: 2000 });
  const animatedCX = useAnimatedPercentage(cxPct, { duration: 2100 });
  const animatedOverall = useAnimatedPercentage(overallPct, { duration: 2200 });

  // Check if revenue is below target - impacts achievement card
  const revenueUnderTarget = revenuePct < 90;

  // Determine status labels based on thresholds
  const getRevenueStatus = () => {
    if (revenuePct >= 90) return "Excellent";
    if (revenuePct >= 80) return "On Track";
    return "Needs Focus";
  };

  const getStrategicStatus = () => {
    // Use the spAchieved flag from StrategicPriorities component
    if (spAchieved) return "Achieved";
    return "Not Met";
  };

  const getCXStatus = () => {
    if (cxPct >= 80) return "Satisfied";
    return "Needs Improvement";
  };

  const getOverallStatus = () => {
    if (revenueUnderTarget) return "Needs Attention";
    if (overallPct >= 85) return "Target Met";
    return "Below Target";
  };

  const metrics = [
    {
      title: "Revenue vs Target",
      value: `${revenuePct}% | ${(revenueOMR / 1000).toFixed(1)}K OMR`,
      percentage: `${revenuePct}%`,
      threshold: "Target: 90%",
      change: `+${(revenuePct - 88).toFixed(1)}%`,
      changeType: "positive" as const,
      icon: <TrendingUp size={20} />,
      label: getRevenueStatus(),
      isMain: false,
      kpiWeight: "50%",
      isUnderThreshold: revenuePct < 90,
      animatedValue: `${animatedRevenue.value} | ${(revenueOMR / 1000).toFixed(1)}K OMR`,
      isAnimating: animatedRevenue.isAnimating,
      caretakerValue: caretakerContributions?.revenue,
    },
    {
      title: "Strategic Priorities",
      value: `${strategicPct}% | ${(strategicOMR / 1000).toFixed(1)}K OMR`,
      percentage: `${strategicPct}%`,
      threshold: "Target: >0",
      change: `+${(strategicPct - 80).toFixed(1)}%`,
      changeType: "positive" as const,
      icon: <Target size={20} />,
      label: getStrategicStatus(),
      isMain: false,
      kpiWeight: "30%",
      isUnderThreshold: strategicPct <= 0,
      animatedValue: `${animatedStrategic.value} | ${(strategicOMR / 1000).toFixed(1)}K OMR`,
      isAnimating: animatedStrategic.isAnimating,
      caretakerValue: caretakerContributions?.strategic,
    },
    {
      title: "Customer Satisfaction",
      value: `${cxPct}% | ${(cxOMR / 1000).toFixed(1)}K OMR`,
      percentage: `${cxPct}%`,
      threshold: "Target: 80%",
      change: `+${(cxPct - 75).toFixed(1)}%`,
      changeType: "positive" as const,
      icon: <Users size={20} />,
      label: getCXStatus(),
      isMain: false,
      kpiWeight: "20%",
      isUnderThreshold: cxPct < 80,
      animatedValue: `${animatedCX.value} | ${(cxOMR / 1000).toFixed(1)}K OMR`,
      isAnimating: animatedCX.isAnimating,
      caretakerValue: caretakerContributions?.cx,
    },
    {
      title: "Achievement",
      value: `${Math.round(overallPct * 10) / 10}% | ${(overallOMR / 1000).toFixed(1)}K OMR`,
      percentage: `${Math.round(overallPct * 10) / 10}%`,
      threshold: "Weighted KPI Result",
      change: `+${(overallPct - 82).toFixed(1)}%`,
      changeType: "positive" as const,
      icon: <Trophy size={20} />,
      label: getOverallStatus(),
      isMain: true,
      kpiWeight: "Combined",
      isUnderThreshold: revenueUnderTarget || overallPct < 85,
      animatedValue: `${animatedOverall.value} | ${(overallOMR / 1000).toFixed(1)}K OMR`,
      isAnimating: animatedOverall.isAnimating,
      caretakerValue: caretakerContributions?.overall,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          percentage={metric.percentage}
          threshold={metric.threshold}
          change={metric.change}
          changeType={metric.changeType}
          icon={metric.icon}
          label={metric.label}
          isMain={metric.isMain}
          index={index}
          kpiWeight={metric.kpiWeight}
          isUnderThreshold={metric.isUnderThreshold}
          animatedValue={metric.animatedValue}
          isAnimating={metric.isAnimating}
          showCaretaker={showCaretaker}
          caretakerValue={metric.caretakerValue}
        />
      ))}
    </div>
  );
}