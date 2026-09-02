import React, { useState, useMemo, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Target, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';
import { Badge } from './ui/badge';

interface ImprovedPerformanceTrendsProps {
  selectedTeamMember?: string;
  period?: string;
  quarter?: string;
  year?: string;
}

export function ImprovedPerformanceTrends({ 
  selectedTeamMember, 
  period = 'Quarterly', 
  quarter = 'Q3', 
  year = '2024' 
}: ImprovedPerformanceTrendsProps) {
  const [screenWidth, setScreenWidth] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  // Monthly data
  const monthlyData = useMemo(() => [
    { 
      name: 'Jan', 
      Achievement: 72, 
      Target: 90,
      trend: 'up',
      variance: -18,
      details: 'Strong start to the year with steady growth'
    },
    { 
      name: 'Feb', 
      Achievement: 76, 
      Target: 90,
      trend: 'up',
      variance: -14,
      details: 'Continued improvement in key performance areas'
    },
    { 
      name: 'Mar', 
      Achievement: 80, 
      Target: 90,
      trend: 'up',
      variance: -10,
      details: 'Q1 ended strong with significant progress'
    },
    { 
      name: 'Apr', 
      Achievement: 83, 
      Target: 90,
      trend: 'up',
      variance: -7,
      details: 'Momentum building toward target achievement'
    },
    { 
      name: 'May', 
      Achievement: 85, 
      Target: 90,
      trend: 'up',
      variance: -5,
      details: 'Consistent performance growth maintained'
    },
    { 
      name: 'Jun', 
      Achievement: 88, 
      Target: 90,
      trend: 'up',
      variance: -2,
      details: 'Q2 concluded with near-target achievement'
    },
    { 
      name: 'Jul', 
      Achievement: 89, 
      Target: 90,
      trend: 'up',
      variance: -1,
      details: 'Very close to target, excellent trajectory'
    },
    { 
      name: 'Aug', 
      Achievement: 91, 
      Target: 90,
      trend: 'stable',
      variance: +1,
      details: 'Target exceeded! Outstanding performance'
    },
    { 
      name: 'Sep', 
      Achievement: 90, 
      Target: 90,
      trend: 'stable',
      variance: 0,
      details: 'Q3 ended on target with sustained excellence'
    },
    { 
      name: 'Oct', 
      Achievement: 92, 
      Target: 90,
      trend: 'up',
      variance: +2,
      details: 'Continued excellence above target levels'
    },
    { 
      name: 'Nov', 
      Achievement: 91, 
      Target: 90,
      trend: 'stable',
      variance: +1,
      details: 'Maintaining high performance standards'
    },
    { 
      name: 'Dec', 
      Achievement: 93, 
      Target: 90,
      trend: 'up',
      variance: +3,
      details: 'Year-end finish strong, exceeding all targets'
    },
  ], []);

  // Quarter to months mapping
  const quarterMonths: { [key: string]: string[] } = {
    'Q1': ['Jan', 'Feb', 'Mar'],
    'Q2': ['Apr', 'May', 'Jun'],
    'Q3': ['Jul', 'Aug', 'Sep'],
    'Q4': ['Oct', 'Nov', 'Dec']
  };

  // Select data based on period
  const data = useMemo(() => {
    if (period === 'Yearly') {
      // Show all 12 months
      return monthlyData;
    } else {
      // Show only months in the selected quarter
      const monthsInQuarter = quarterMonths[quarter] || ['Jul', 'Aug', 'Sep'];
      return monthlyData.filter(item => monthsInQuarter.includes(item.name));
    }
  }, [period, quarter, monthlyData]);

  const performanceInsights = useMemo(() => {
    const latestAchievement = data[data.length - 1].Achievement;
    const firstAchievement = data[0].Achievement;
    const improvement = latestAchievement - firstAchievement;
    // Use the absolute improvement value as percentage (15 points = 15%)
    const improvementPercentage = improvement;
    const targetMet = latestAchievement >= 90;
    
    // Find when target was first achieved
    const targetAchievedIndex = data.findIndex(d => d.Achievement >= d.Target);
    const targetAchievedMonth = targetAchievedIndex >= 0 ? data[targetAchievedIndex].name : null;

    return {
      improvement,
      improvementPercentage,
      targetMet,
      targetAchievedMonth,
      latestAchievement,
      trend: improvement > 0 ? 'positive' : improvement < 0 ? 'negative' : 'stable'
    };
  }, [data]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg min-w-[280px] transition-colors duration-300">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 transition-colors duration-300">{label}</h4>
            <Badge variant={data.variance === 0 ? "default" : data.variance > 0 ? "default" : "secondary"}>
              {data.variance === 0 ? 'On Target' : data.variance > 0 ? `+${data.variance}%` : `${data.variance}%`}
            </Badge>
          </div>
          
          <div className="space-y-2 mb-3">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{entry.dataKey}:</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-300">{entry.value}%</span>
              </div>
            ))}
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 border-t dark:border-gray-700 pt-2 transition-colors duration-300">{data.details}</p>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props: any) => {
    const { cx, cy, payload, dataKey } = props;
    const isHovered = hoveredPoint === `${payload.name}-${dataKey}`;
    // Highlight the last month in the current view (Dec for yearly, last month of quarter for quarterly)
    const lastMonthInView = data[data.length - 1]?.name;
    const isLastPoint = payload.name === lastMonthInView;
    const isAchievement = dataKey === 'Achievement';
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={isLastPoint && isAchievement ? 7 : isHovered ? 6 : 4}
        fill={isAchievement ? '#2563eb' : '#10b981'}
        stroke={isLastPoint && isAchievement ? '#00ffcc' : "white"}
        strokeWidth={isLastPoint && isAchievement ? 3 : 2}
        className="transition-all duration-200 cursor-pointer"
        style={{
          filter: isHovered || (isLastPoint && isAchievement) ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' : 'none'
        }}
        onMouseEnter={() => setHoveredPoint(`${payload.name}-${dataKey}`)}
        onMouseLeave={() => setHoveredPoint(null)}
      />
    );
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-200 dark:border-gray-700/40 transition-colors duration-300">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30 transition-colors duration-300">
              <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400 transition-colors duration-300" />
            </div>
            <div>
              <CardTitle className="widget-title text-gray-900 dark:text-gray-100 transition-colors duration-300">
                Monthly Performance Trend
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300">
                {period === 'Yearly' ? `${year} Full Year Progress` : `${quarter} ${year} Progress`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              variant={performanceInsights.targetMet ? "default" : "secondary"}
              className={`font-medium ${
                performanceInsights.targetMet 
                  ? 'bg-green-100 hover:bg-green-200 text-green-700 border-green-300 dark:bg-green-900/30 dark:hover:bg-green-900/40 dark:text-green-300 dark:border-green-700/50' 
                  : 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 dark:border-amber-500'
              }`}
            >
              {performanceInsights.targetMet ? 'Target Met' : 'In Progress'}
            </Badge>
            <div className="flex items-center gap-1 text-sm">
              {performanceInsights.trend === 'positive' ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : performanceInsights.trend === 'negative' ? (
                <TrendingDown className="w-4 h-4 text-red-500" />
              ) : (
                <Target className="w-4 h-4 text-blue-500" />
              )}
              <span className={`font-medium ${
                performanceInsights.trend === 'positive' ? 'text-green-600' : 
                performanceInsights.trend === 'negative' ? 'text-red-600' : 'text-blue-600'
              }`}>
                {performanceInsights.improvement > 0 ? '+' : ''}{performanceInsights.improvement}%
              </span>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-8 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-blue-600 rounded" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">Achievement</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-green-500 rounded" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">Target</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 flex-1 flex flex-col min-h-0">
        {/* Chart Container - Takes remaining height */}
        <div className="flex-1 w-full" style={{ minHeight: screenWidth < 640 ? '300px' : screenWidth < 768 ? '350px' : '400px' }}>
          <ResponsiveContainer width="100%" height="100%" minHeight={screenWidth < 640 ? 300 : screenWidth < 768 ? 350 : 400}>
            <LineChart
              data={data}
              margin={{
                top: screenWidth < 768 ? 15 : 20,
                right: screenWidth < 640 ? 8 : screenWidth < 768 ? 12 : 20,
                left: screenWidth < 640 ? 5 : screenWidth < 768 ? 8 : 10,
                bottom: screenWidth < 640 ? 25 : screenWidth < 768 ? 35 : 40,
              }}
            >
              {/* Performance Zones */}
              <ReferenceArea 
                y1={95} 
                y2={100} 
                fill="#dcfce7" 
                fillOpacity={0.3}
                stroke="none"
              />
              <ReferenceArea 
                y1={90} 
                y2={95} 
                fill="#dbeafe" 
                fillOpacity={0.2}
                stroke="none"
              />
              <ReferenceArea 
                y1={80} 
                y2={90} 
                fill="#fef3c7" 
                fillOpacity={0.2}
                stroke="none"
              />
              <ReferenceArea 
                y1={60} 
                y2={80} 
                fill="#fee2e2" 
                fillOpacity={0.2}
                stroke="none"
              />
              
              {/* Simplified Grid Lines */}
              <CartesianGrid 
                strokeDasharray="1 3" 
                stroke="#e2e8f0" 
                strokeOpacity={0.6}
                horizontal={true}
                vertical={screenWidth >= 640}
              />
              
              <XAxis 
                dataKey="name" 
                stroke="#64748b"
                fontSize={screenWidth < 640 ? 9 : screenWidth < 768 ? 10 : 11}
                fontWeight={500}
                axisLine={{
                  stroke: '#e2e8f0',
                  strokeWidth: 1
                }}
                tickLine={{
                  stroke: '#e2e8f0',
                  strokeWidth: 1
                }}
                dy={5}
                tick={{ 
                  fill: '#64748b',
                  fontSize: screenWidth < 640 ? 9 : screenWidth < 768 ? 10 : 11
                }}
                height={screenWidth < 640 ? 25 : screenWidth < 768 ? 28 : 30}
                interval={screenWidth < 640 ? 1 : 0}
                angle={screenWidth < 640 ? -45 : 0}
                textAnchor={screenWidth < 640 ? 'end' : 'middle'}
              />
              
              <YAxis 
                stroke="#64748b"
                fontSize={screenWidth < 640 ? 9 : screenWidth < 768 ? 10 : 11}
                fontWeight={500}
                axisLine={{
                  stroke: '#e2e8f0',
                  strokeWidth: 1
                }}
                tickLine={{
                  stroke: '#e2e8f0',
                  strokeWidth: 1
                }}
                dx={-5}
                domain={[60, 100]}
                tickFormatter={(value) => `${value}%`}
                tick={{ 
                  fill: '#64748b',
                  fontSize: screenWidth < 640 ? 9 : screenWidth < 768 ? 10 : 11
                }}
                ticks={screenWidth < 640 ? [60, 80, 100] : [60, 70, 80, 90, 100]}
                width={screenWidth < 640 ? 28 : screenWidth < 768 ? 32 : 35}
              />
              
              <Tooltip content={<CustomTooltip />} />
              
              {/* Performance Zone Labels - Only show on larger screens or simplified on mobile */}
              {screenWidth >= 768 ? (
                <>
                  <ReferenceLine 
                    y={97.5} 
                    stroke="transparent"
                    label={{ 
                      value: "Excellent", 
                      position: "insideTopLeft",
                      style: { 
                        fontSize: '10px', 
                        fontWeight: '500', 
                        fill: '#16a34a',
                        opacity: 0.7
                      }
                    }}
                  />
                  
                  <ReferenceLine 
                    y={92.5} 
                    stroke="transparent"
                    label={{ 
                      value: "Good", 
                      position: "insideTopLeft",
                      style: { 
                        fontSize: '10px', 
                        fontWeight: '500', 
                        fill: '#2563eb',
                        opacity: 0.7
                      }
                    }}
                  />
                  
                  <ReferenceLine 
                    y={85} 
                    stroke="transparent"
                    label={{ 
                      value: "Fair", 
                      position: "insideTopLeft",
                      style: { 
                        fontSize: '10px', 
                        fontWeight: '500', 
                        fill: '#d97706',
                        opacity: 0.7
                      }
                    }}
                  />
                  
                  <ReferenceLine 
                    y={70} 
                    stroke="transparent"
                    label={{ 
                      value: "Needs Improvement", 
                      position: "insideTopLeft",
                      style: { 
                        fontSize: '10px', 
                        fontWeight: '500', 
                        fill: '#dc2626',
                        opacity: 0.7
                      }
                    }}
                  />
                </>
              ) : screenWidth >= 640 ? (
                <>
                  <ReferenceLine 
                    y={95} 
                    stroke="transparent"
                    label={{ 
                      value: "Exc", 
                      position: "insideTopLeft",
                      style: { 
                        fontSize: '8px', 
                        fontWeight: '500', 
                        fill: '#16a34a',
                        opacity: 0.7
                      }
                    }}
                  />
                  
                  <ReferenceLine 
                    y={85} 
                    stroke="transparent"
                    label={{ 
                      value: "Fair", 
                      position: "insideTopLeft",
                      style: { 
                        fontSize: '8px', 
                        fontWeight: '500', 
                        fill: '#d97706',
                        opacity: 0.7
                      }
                    }}
                  />
                </>
              ) : null}
              
              {/* Target Reference Line */}
              <ReferenceLine 
                y={90} 
                stroke="#10b981" 
                strokeDasharray="4 4" 
                strokeWidth={screenWidth < 640 ? 1.5 : 2}
                label={screenWidth >= 640 ? { 
                  value: screenWidth < 768 ? "Target" : "90% Target", 
                  position: "insideTopRight",
                  style: { 
                    fontSize: screenWidth < 768 ? '10px' : '12px', 
                    fontWeight: '600', 
                    fill: '#059669'
                  }
                } : undefined}
              />
              
              {/* Milestone Lines - Simplified on mobile */}
              {screenWidth >= 640 && (
                <>
                  <ReferenceLine 
                    y={80} 
                    stroke="#f59e0b" 
                    strokeDasharray="2 2" 
                    strokeWidth={1}
                    strokeOpacity={0.6}
                  />
                  
                  <ReferenceLine 
                    y={95} 
                    stroke="#059669" 
                    strokeDasharray="2 2" 
                    strokeWidth={1}
                    strokeOpacity={0.6}
                  />
                </>
              )}
              
              {/* Achievement Line with responsive styling and smooth curves */}
              <Line 
                type="monotone" 
                dataKey="Achievement" 
                stroke="#2563eb" 
                strokeWidth={screenWidth < 640 ? 2.5 : 3}
                dot={<CustomDot />}
                activeDot={false}
                connectNulls={false}
                tension={0.3}
              />
              
              {/* Target Line with responsive styling and smooth curves */}
              <Line 
                type="monotone" 
                dataKey="Target" 
                stroke="#10b981" 
                strokeWidth={screenWidth < 640 ? 1.5 : 2}
                strokeOpacity={0.8}
                dot={<CustomDot />}
                activeDot={false}
                connectNulls={false}
                strokeDasharray="0"
                tension={0.3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Performance Summary */}
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex-shrink-0 transition-colors duration-300">
          <div className={`flex ${screenWidth < 640 ? 'flex-col' : 'flex-row'} gap-3 w-full`}>
            <div className={`flex-1 bg-blue-500/10 dark:bg-blue-400/10 ${screenWidth < 640 ? 'p-2.5' : 'p-3'} rounded-lg border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 cursor-default transition-all duration-300`}>
              <div className="flex items-center gap-2 mb-1.5">
                <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400 transition-colors duration-300" />
                <span className={`${screenWidth < 640 ? 'text-xs' : 'text-sm'} font-medium text-gray-900 dark:text-white transition-colors duration-300`}>Current</span>
              </div>
              <div className={`${screenWidth < 640 ? 'text-lg' : 'text-xl'} font-bold text-blue-600 dark:text-blue-400 mb-1 transition-colors duration-300`}>{performanceInsights.latestAchievement}%</div>
              <div className="flex items-center gap-1">
                {performanceInsights.trend === 'positive' ? (
                  <TrendingUp className="w-3 h-3 text-green-500 dark:text-green-400 transition-colors duration-300" />
                ) : performanceInsights.trend === 'negative' ? (
                  <TrendingDown className="w-3 h-3 text-red-500 dark:text-red-400 transition-colors duration-300" />
                ) : (
                  <TrendingUp className="w-3 h-3 text-gray-500 dark:text-gray-400 transition-colors duration-300" />
                )}
                <span className={`text-xs font-medium transition-colors duration-300 ${
                  performanceInsights.trend === 'positive' ? 'text-green-600 dark:text-green-400' : 
                  performanceInsights.trend === 'negative' ? 'text-red-600 dark:text-red-400' : 
                  'text-gray-600 dark:text-gray-400'
                }`}>
                  {performanceInsights.improvement > 0 ? '+' : ''}{performanceInsights.improvementPercentage}% growth
                </span>
              </div>
            </div>
            
            <div className={`flex-1 bg-green-500/10 dark:bg-green-400/10 ${screenWidth < 640 ? 'p-2.5' : 'p-3'} rounded-lg border-2 border-transparent hover:border-green-500 dark:hover:border-green-400 cursor-default transition-all duration-300`}>
              <div className="flex items-center gap-2 mb-1.5">
                <Target className="w-4 h-4 text-green-600 dark:text-green-400 transition-colors duration-300" />
                <span className={`${screenWidth < 640 ? 'text-xs' : 'text-sm'} font-medium text-gray-900 dark:text-white transition-colors duration-300`}>Target Status</span>
              </div>
              <div className={`${screenWidth < 640 ? 'text-lg' : 'text-xl'} font-bold text-green-600 dark:text-green-400 mb-1 transition-colors duration-300`}>
                {performanceInsights.targetMet ? 'Met' : 'Not Met'}
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium transition-colors duration-300">
                {performanceInsights.targetAchievedMonth ? `${performanceInsights.targetAchievedMonth} achievement` : 'Target not yet met'}
              </span>
            </div>
            
            <div className={`hidden bg-purple-500/10 dark:bg-purple-400/10 ${screenWidth < 640 ? 'p-2.5' : 'p-3'} rounded-lg border-2 border-transparent hover:border-purple-500 dark:hover:border-purple-400 cursor-default transition-all duration-300`}>
              <div className="flex items-center gap-2 mb-1.5">
                <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400 transition-colors duration-300" />
                <span className={`${screenWidth < 640 ? 'text-xs' : 'text-sm'} font-medium text-gray-900 dark:text-white transition-colors duration-300`}>Velocity</span>
              </div>
              <div className={`${screenWidth < 640 ? 'text-lg' : 'text-xl'} font-bold text-purple-600 dark:text-purple-400 mb-1 transition-colors duration-300`}>+5%</div>
              <span className="text-xs text-purple-600 dark:text-purple-400 font-medium transition-colors duration-300">Weekly avg. growth</span>
            </div>
          </div>
          
          {/* Insights */}
          <div className={`mt-3 ${screenWidth < 640 ? 'p-2.5' : 'p-3'} bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600/30 transition-colors duration-300`}>
            <div className="flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0 transition-colors duration-300" />
              <div>
                <p className={`${screenWidth < 640 ? 'text-xs' : 'text-xs'} font-medium text-gray-900 dark:text-white mb-0.5 transition-colors duration-300`}>Performance Insights</p>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-snug transition-colors duration-300">
                  {screenWidth < 640 ? 
                    `${performanceInsights.improvementPercentage.toFixed(1)}% improvement. Target achieved!` :
                    `Consistent upward trajectory with ${performanceInsights.improvementPercentage.toFixed(1)}% improvement over the period. Target achievement in Week 4 demonstrates strong execution and momentum.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}