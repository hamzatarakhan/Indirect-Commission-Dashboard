import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Percent, Activity, Wifi, Smartphone, Server, Building2, MapPin, Users, Phone, MessageSquare, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import type { Customer } from './customerData';

interface CompanyDetailsPageProps {
  customer: Customer;
  onBack: () => void;
  comparisonMode?: boolean;
}

export function CompanyDetailsPage({ customer, onBack, comparisonMode = false }: CompanyDetailsPageProps) {
  const [activeService, setActiveService] = useState<'all' | 'mobile' | 'fixed' | 'ict' | 'sms'>('all');
  
  // Calculate metrics
  const totalRevenue = customer.mobile + customer.fixed + customer.ict + customer.sms;
  const previousTotalRevenue = totalRevenue / (1 + customer.trend / 100);
  
  // Calculate bad debt (simulated as 2-5% of total revenue based on customer trend)
  const badDebtRate = customer.trend < 0 ? 0.05 : customer.trend < 5 ? 0.03 : 0.02;
  const badDebt = totalRevenue * badDebtRate;
  const previousBadDebt = previousTotalRevenue * badDebtRate;
  
  // Generate monthly trend data for the company
  const generateMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    const baseRevenue = previousTotalRevenue / 10; // Average monthly from previous
    const currentAvg = totalRevenue / 10;
    
    return months.map((month, idx) => {
      // Create a growth trend from previous to current
      const progress = idx / 9; // 0 to 1
      const monthlyRevenue = baseRevenue + (currentAvg - baseRevenue) * progress;
      const variance = (Math.random() - 0.5) * 0.1 * monthlyRevenue; // 10% variance
      
      const mobile = (customer.mobile / totalRevenue) * (monthlyRevenue + variance);
      const fixed = (customer.fixed / totalRevenue) * (monthlyRevenue + variance);
      const ict = (customer.ict / totalRevenue) * (monthlyRevenue + variance);
      const sms = (customer.sms / totalRevenue) * (monthlyRevenue + variance);
      const badDebt = (monthlyRevenue + variance) * badDebtRate;
      
      return {
        month,
        total: monthlyRevenue + variance,
        mobile,
        fixed,
        ict,
        sms,
        badDebt,
        prevTotal: idx > 0 ? baseRevenue + (Math.random() - 0.5) * 0.05 * baseRevenue : baseRevenue
      };
    });
  };

  const monthlyData = generateMonthlyData();

  // Product revenue breakdown
  const allProductData = [
    { name: 'Mobile', revenue: customer.mobile, color: '#a855f7', percentage: ((customer.mobile / totalRevenue) * 100).toFixed(1) },
    { name: 'Fixed', revenue: customer.fixed, color: '#3b82f6', percentage: ((customer.fixed / totalRevenue) * 100).toFixed(1) },
    { name: 'ICT', revenue: customer.ict, color: '#6366f1', percentage: ((customer.ict / totalRevenue) * 100).toFixed(1) },
    { name: 'SMS', revenue: customer.mobile * 0.15, color: '#ec4899', percentage: (((customer.mobile * 0.15) / totalRevenue) * 100).toFixed(1) }
  ];
  
  // Filter product data based on active service
  const productData = activeService === 'all' 
    ? allProductData 
    : allProductData.filter(p => p.name.toLowerCase() === activeService);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M OMR`;
    }
    return `${(value / 1000).toFixed(0)}K OMR`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div data-section="header" className="space-y-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#07112F] border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-[#0a1425] transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Back to Dashboard</span>
          </button>
        </div>

        {/* Company Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/40 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-purple-950/10 rounded-xl p-6 border border-blue-200/60 dark:border-blue-800/30"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{customer.company}</h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40">
                    {customer.id}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{customer.segment}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>{customer.vertical}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4" />
                    <span>Account Manager: {customer.name}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Revenue Display */}
            <div className="flex flex-col items-end gap-1 bg-gradient-to-br from-emerald-50/80 to-emerald-100/40 dark:from-emerald-900/20 dark:to-emerald-800/10 rounded-lg px-4 py-2.5 border border-emerald-200/60 dark:border-emerald-700/30">
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-medium">
                Total Revenue
              </p>
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300 leading-tight whitespace-nowrap">
                {formatCurrency(totalRevenue)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2. KPI Cards */}
      <div data-section="overview-cards" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Revenue Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="group relative bg-[rgba(239,246,255,0.5)] dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-[rgba(190,219,255,0.5)] dark:border-white/[0.08] hover:border-blue-300/60 dark:hover:border-blue-500/40 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col gap-[11px] relative z-10">
            {/* Icon */}
            <div className="size-[31.5px] shrink-0 bg-blue-100 dark:bg-blue-500/10 rounded-[8.75px] flex items-center justify-center">
              <DollarSign className="w-[14px] h-[14px] text-blue-600 dark:text-blue-400" />
            </div>
            
            <div className="flex gap-[11px] items-start">
              {/* Left Column - Total Revenue */}
              <div className="flex-1 flex flex-col gap-[7px]">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">TOTAL REVENUE YTD</p>
                <div className="flex flex-col gap-[1.75px]">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                    {formatCurrency(totalRevenue)}
                  </p>
                  {comparisonMode && (
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">
                      Prev: {formatCurrency(previousTotalRevenue)}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Right Column - YoY Growth */}
              {comparisonMode && (
                <div className="flex-1 flex flex-col gap-[7px]">
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">YOY GROWTH</p>
                  <div className="flex flex-col gap-[1.75px]">
                    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md w-fit text-[10px] font-bold border ${
                      customer.trend >= 0 
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30' 
                        : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800/30'
                    }`}>
                      {customer.trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(customer.trend).toFixed(1)}%
                    </div>
                    <p className={`text-[10px] leading-[15px] ${totalRevenue >= previousTotalRevenue ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {totalRevenue >= previousTotalRevenue ? '+' : ''}
                      {formatCurrency(totalRevenue - previousTotalRevenue)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="h-[80px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 5, bottom: 0, left: 0, right: 0 }}>
                <defs>
                  <linearGradient id="gradientRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900/95 backdrop-blur border border-slate-700/50 p-2 rounded-lg shadow-xl min-w-[100px]">
                          <p className="text-[10px] text-slate-400 font-medium mb-1">{data.month}</p>
                          <div className="flex flex-col gap-0.5">
                            <div className="flex justify-between items-center gap-3">
                              <span className="text-[10px] text-blue-400 font-medium">Total</span>
                              <span className="text-xs font-bold text-white">{formatCurrency(data.total)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {comparisonMode && (
                  <Area 
                    type="monotone" 
                    dataKey="prevTotal" 
                    stroke="#94a3b8" 
                    strokeWidth={2}
                    strokeDasharray="4 4" 
                    fill="transparent"
                  />
                )}
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  fill="url(#gradientRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Mobile Revenue Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="group relative bg-purple-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-purple-200/50 dark:border-white/[0.08] hover:border-purple-300/60 dark:hover:border-purple-500/40 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col gap-[11px] relative z-10">
            <div className="size-[31.5px] shrink-0 bg-purple-100 dark:bg-purple-500/10 rounded-[8.75px] flex items-center justify-center">
              <Smartphone className="w-[14px] h-[14px] text-purple-600 dark:text-purple-400" />
            </div>
            
            <div className="flex gap-[11px] items-start">
              {/* Left Column - Mobile Revenue */}
              <div className="flex-1 flex flex-col gap-[7px]">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">MOBILE REVENUE</p>
                <div className="flex flex-col gap-[1.75px]">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                    {formatCurrency(customer.mobile)}
                  </p>
                  {comparisonMode && (
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">
                      Prev: {formatCurrency(customer.mobile / (1 + customer.trend / 100))}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Right Column - YoY Growth */}
              {comparisonMode && (
                <div className="flex-1 flex flex-col gap-[7px]">
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">YOY GROWTH</p>
                  <div className="flex flex-col gap-[1.75px]">
                    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md w-fit text-[10px] font-bold border ${
                      customer.trend >= 0 
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30' 
                        : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800/30'
                    }`}>
                      {customer.trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(customer.trend).toFixed(1)}%
                    </div>
                    <p className={`text-[10px] leading-[15px] ${customer.trend >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {customer.trend >= 0 ? '+' : ''}
                      {formatCurrency(customer.mobile - (customer.mobile / (1 + customer.trend / 100)))}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="h-[80px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 5, bottom: 0, left: 0, right: 0 }}>
                <defs>
                  <linearGradient id="gradientMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  cursor={{ stroke: '#a855f7', strokeWidth: 1, strokeDasharray: '4 4' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900/95 backdrop-blur border border-slate-700/50 p-2 rounded-lg shadow-xl min-w-[100px]">
                          <p className="text-[10px] text-slate-400 font-medium mb-1">{data.month}</p>
                          <div className="flex justify-between items-center gap-3">
                            <span className="text-[10px] text-purple-400 font-medium">Mobile</span>
                            <span className="text-xs font-bold text-white">{formatCurrency(data.mobile)}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="mobile" 
                  stroke="#a855f7" 
                  strokeWidth={2} 
                  fill="url(#gradientMobile)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Fixed Revenue Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="group relative bg-cyan-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-cyan-200/50 dark:border-white/[0.08] hover:border-cyan-300/60 dark:hover:border-cyan-500/40 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col gap-[11px] relative z-10">
            <div className="size-[31.5px] shrink-0 bg-cyan-100 dark:bg-cyan-500/10 rounded-[8.75px] flex items-center justify-center">
              <Wifi className="w-[14px] h-[14px] text-cyan-600 dark:text-cyan-400" />
            </div>
            
            <div className="flex gap-[11px] items-start">
              {/* Left Column - Fixed Revenue */}
              <div className="flex-1 flex flex-col gap-[7px]">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">FIXED REVENUE</p>
                <div className="flex flex-col gap-[1.75px]">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                    {formatCurrency(customer.fixed)}
                  </p>
                  {comparisonMode && (
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">
                      Prev: {formatCurrency(customer.fixed / (1 + customer.trend / 100))}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Right Column - YoY Growth */}
              {comparisonMode && (
                <div className="flex-1 flex flex-col gap-[7px]">
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">YOY GROWTH</p>
                  <div className="flex flex-col gap-[1.75px]">
                    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md w-fit text-[10px] font-bold border ${
                      customer.trend >= 0 
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30' 
                        : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800/30'
                    }`}>
                      {customer.trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(customer.trend).toFixed(1)}%
                    </div>
                    <p className={`text-[10px] leading-[15px] ${customer.trend >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {customer.trend >= 0 ? '+' : ''}
                      {formatCurrency(customer.fixed - (customer.fixed / (1 + customer.trend / 100)))}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="h-[80px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 5, bottom: 0, left: 0, right: 0 }}>
                <defs>
                  <linearGradient id="gradientFixed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  cursor={{ stroke: '#06b6d4', strokeWidth: 1, strokeDasharray: '4 4' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900/95 backdrop-blur border border-slate-700/50 p-2 rounded-lg shadow-xl min-w-[100px]">
                          <p className="text-[10px] text-slate-400 font-medium mb-1">{data.month}</p>
                          <div className="flex justify-between items-center gap-3">
                            <span className="text-[10px] text-cyan-400 font-medium">Fixed</span>
                            <span className="text-xs font-bold text-white">{formatCurrency(data.fixed)}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="fixed" 
                  stroke="#06b6d4" 
                  strokeWidth={2} 
                  fill="url(#gradientFixed)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ICT Revenue Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="group relative bg-indigo-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-indigo-200/50 dark:border-white/[0.08] hover:border-indigo-300/60 dark:hover:border-indigo-500/40 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col gap-[11px] relative z-10">
            <div className="size-[31.5px] shrink-0 bg-indigo-100 dark:bg-indigo-500/10 rounded-[8.75px] flex items-center justify-center">
              <Server className="w-[14px] h-[14px] text-indigo-600 dark:text-indigo-400" />
            </div>
            
            <div className="flex gap-[11px] items-start">
              {/* Left Column - ICT Revenue */}
              <div className="flex-1 flex flex-col gap-[7px]">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">ICT REVENUE</p>
                <div className="flex flex-col gap-[1.75px]">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                    {formatCurrency(customer.ict)}
                  </p>
                  {comparisonMode && (
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">
                      Prev: {formatCurrency(customer.ict / (1 + customer.trend / 100))}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Right Column - YoY Growth */}
              {comparisonMode && (
                <div className="flex-1 flex flex-col gap-[7px]">
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">YOY GROWTH</p>
                  <div className="flex flex-col gap-[1.75px]">
                    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md w-fit text-[10px] font-bold border ${
                      customer.trend >= 0 
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30' 
                        : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800/30'
                    }`}>
                      {customer.trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(customer.trend).toFixed(1)}%
                    </div>
                    <p className={`text-[10px] leading-[15px] ${customer.trend >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {customer.trend >= 0 ? '+' : ''}
                      {formatCurrency(customer.ict - (customer.ict / (1 + customer.trend / 100)))}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="h-[80px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 5, bottom: 0, left: 0, right: 0 }}>
                <defs>
                  <linearGradient id="gradientICT" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900/95 backdrop-blur border border-slate-700/50 p-2 rounded-lg shadow-xl min-w-[100px]">
                          <p className="text-[10px] text-slate-400 font-medium mb-1">{data.month}</p>
                          <div className="flex justify-between items-center gap-3">
                            <span className="text-[10px] text-indigo-400 font-medium">ICT</span>
                            <span className="text-xs font-bold text-white">{formatCurrency(data.ict)}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="ict" 
                  stroke="#6366f1" 
                  strokeWidth={2} 
                  fill="url(#gradientICT)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* SMS Revenue Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="group relative bg-emerald-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-emerald-200/50 dark:border-white/[0.08] hover:border-emerald-300/60 dark:hover:border-emerald-500/40 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col gap-[11px] relative z-10">
            <div className="size-[31.5px] shrink-0 bg-emerald-100 dark:bg-emerald-500/10 rounded-[8.75px] flex items-center justify-center">
              <MessageSquare className="w-[14px] h-[14px] text-emerald-600 dark:text-emerald-400" />
            </div>
            
            <div className="flex gap-[11px] items-start">
              {/* Left Column - SMS Revenue */}
              <div className="flex-1 flex flex-col gap-[7px]">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">SMS REVENUE</p>
                <div className="flex flex-col gap-[1.75px]">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                    {formatCurrency(customer.sms)}
                  </p>
                  {comparisonMode && (
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">
                      Prev: {formatCurrency(customer.sms / (1 + customer.trend / 100))}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Right Column - YoY Growth */}
              {comparisonMode && (
                <div className="flex-1 flex flex-col gap-[7px]">
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">YOY GROWTH</p>
                  <div className="flex flex-col gap-[1.75px]">
                    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md w-fit text-[10px] font-bold border ${
                      customer.trend >= 0 
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/30' 
                        : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800/30'
                    }`}>
                      {customer.trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(customer.trend).toFixed(1)}%
                    </div>
                    <p className={`text-[10px] leading-[15px] ${customer.trend >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {customer.trend >= 0 ? '+' : ''}
                      {formatCurrency(customer.sms - (customer.sms / (1 + customer.trend / 100)))}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="h-[80px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 5, bottom: 0, left: 0, right: 0 }}>
                <defs>
                  <linearGradient id="gradientSMS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '4 4' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900/95 backdrop-blur border border-slate-700/50 p-2 rounded-lg shadow-xl min-w-[100px]">
                          <p className="text-[10px] text-slate-400 font-medium mb-1">{data.month}</p>
                          <div className="flex justify-between items-center gap-3">
                            <span className="text-[10px] text-emerald-400 font-medium">SMS</span>
                            <span className="text-xs font-bold text-white">{formatCurrency(data.sms)}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sms" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  fill="url(#gradientSMS)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bad Debt Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="group relative bg-red-50/50 dark:bg-[#07112F] rounded-[12.75px] p-[15px] border border-red-200/50 dark:border-white/[0.08] hover:border-red-300/60 dark:hover:border-red-500/40 hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col gap-[11px] relative z-10">
            <div className="size-[31.5px] shrink-0 bg-red-100 dark:bg-red-500/10 rounded-[8.75px] flex items-center justify-center">
              <AlertTriangle className="w-[14px] h-[14px] text-red-600 dark:text-red-400" />
            </div>
            
            <div className="flex gap-[11px] items-start">
              {/* Left Column - Bad Debt */}
              <div className="flex-1 flex flex-col gap-[7px]">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">BAD DEBT</p>
                <div className="flex flex-col gap-[1.75px]">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white leading-tight">
                    {formatCurrency(badDebt)}
                  </p>
                  {comparisonMode && (
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-[15px]">
                      Prev: {formatCurrency(previousBadDebt)}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Right Column - Rate */}
              {comparisonMode && (
                <div className="flex-1 flex flex-col gap-[7px]">
                  <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-[0.5px] leading-[15px]">DEBT RATE</p>
                  <div className="flex flex-col gap-[1.75px]">
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md w-fit text-[10px] font-bold border bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-100 dark:border-red-800/30">
                      <Percent className="w-3 h-3" />
                      {(badDebtRate * 100).toFixed(1)}%
                    </div>
                    <p className="text-[10px] leading-[15px] text-red-600 dark:text-red-400">
                      of total revenue
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="h-[80px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 5, bottom: 0, left: 0, right: 0 }}>
                <defs>
                  <linearGradient id="gradientBadDebt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  cursor={{ stroke: '#ef4444', strokeWidth: 1, strokeDasharray: '4 4' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900/95 backdrop-blur border border-slate-700/50 p-2 rounded-lg shadow-xl min-w-[100px]">
                          <p className="text-[10px] text-slate-400 font-medium mb-1">{data.month}</p>
                          <div className="flex justify-between items-center gap-3">
                            <span className="text-[10px] text-red-400 font-medium">Bad Debt</span>
                            <span className="text-xs font-bold text-white">{formatCurrency(data.badDebt)}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="badDebt" 
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  fill="url(#gradientBadDebt)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* 3. Monthly Revenue Trend Chart */}
      <div data-section="revenue-trend">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white dark:bg-[#07112F] rounded-xl p-4 sm:p-6 border border-[#E2E8F0] dark:border-[#E2E8F0]/20"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
              Monthly Revenue Trend
            </h3>
          </div>
          


          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              YoY Growth
            </span>
            <div className="flex items-center gap-1.5">
              {customer.trend >= 0 ? (
                <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500" />
              ) : (
                <TrendingDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
              )}
              <span className={`text-xs font-bold ${customer.trend >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                {customer.trend >= 0 ? '+' : ''}{customer.trend.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            {(() => {
              const maxValue = Math.max(
                ...monthlyData.map(d => Math.max(d.total, comparisonMode ? d.prevTotal : 0))
              );
              
              // Helper function to create a lighter version of a color
              const lightenColor = (hex: string, percent: number = 40) => {
                const num = parseInt(hex.replace('#', ''), 16);
                const r = Math.min(255, ((num >> 16) + Math.round((255 - (num >> 16)) * percent / 100)));
                const g = Math.min(255, (((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * percent / 100)));
                const b = Math.min(255, ((num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * percent / 100)));
                return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
              };
              
              const colors = { solid: '#3b82f6' }; // Blue color for total revenue
              
              return (
                <>
                  <div className="relative w-full overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex items-end justify-between gap-1 sm:gap-2 bg-gray-50/50 dark:bg-gray-800/20 rounded-lg pt-9 pb-2 px-1 sm:px-2 border border-gray-200 dark:border-gray-700/30 h-[250px] sm:h-[320px] min-w-[320px] sm:min-w-0">
                      {monthlyData.map((monthData, monthIndex) => {
                        const revenueHeight = Math.max((monthData.total / maxValue) * 100, 8);
                        const prevRevenueHeight = comparisonMode ? Math.max((monthData.prevTotal / maxValue) * 100, 8) : 0;
                        
                        // Calculate YoY growth for comparison mode
                        const yoyGrowth = comparisonMode && monthData.prevTotal > 0 
                          ? (((monthData.total - monthData.prevTotal) / monthData.prevTotal) * 100).toFixed(1) 
                          : '0.0';
                        const isYoyPositive = parseFloat(yoyGrowth) >= 0;
                        
                        return (
                          <div key={monthIndex} className="flex-1 flex flex-col items-center gap-1 sm:gap-1.5 group/month relative h-full justify-end hover:z-50 min-w-[20px] sm:min-w-0">
                            {/* YoY Growth Indicator - Inside container above bars in comparison mode */}
                            {comparisonMode && (
                              <motion.div
                                className="absolute -top-6 left-1/2 -translate-x-1/2 z-20"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: monthIndex * 0.05 + 0.4 }}
                              >
                                <div className={`flex items-center gap-0.5 px-1 sm:px-1.5 py-0.5 rounded-md ${
                                  isYoyPositive 
                                    ? 'bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700' 
                                    : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
                                }`}>
                                  {isYoyPositive ? (
                                    <TrendingUp className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-emerald-600 dark:text-emerald-400" />
                                  ) : (
                                    <TrendingDown className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-red-600 dark:text-red-400" />
                                  )}
                                  <span className={`font-['Roboto',sans-serif] font-bold text-[7px] sm:text-[8px] whitespace-nowrap ${
                                    isYoyPositive 
                                      ? 'text-emerald-700 dark:text-emerald-400' 
                                      : 'text-red-700 dark:text-red-400'
                                  }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                                    {isYoyPositive ? '+' : ''}{yoyGrowth}%
                                  </span>
                                </div>
                              </motion.div>
                            )}
                            
                            <div className="w-full relative flex items-end justify-center gap-0.5 h-full">
                              
                              {comparisonMode && (
                                <div className="relative flex-1 flex items-end h-full group/comp z-30">
                                  <motion.div
                                    className="relative w-full rounded-t-[2px] sm:rounded-t-[4px] transition-all duration-200 min-h-[8px] sm:min-h-[12px] flex items-end justify-center pb-0.5 sm:pb-1 cursor-pointer hover:brightness-110"
                                    style={{ 
                                      height: `${prevRevenueHeight}%`,
                                      backgroundColor: lightenColor(colors.solid, 40)
                                    }}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${prevRevenueHeight}%` }}
                                    transition={{ duration: 0.6, delay: monthIndex * 0.05 }}
                                  >
                                    {/* Value label inside bar - hidden if too small */}
                                    {prevRevenueHeight > 15 && (
                                      <span className="hidden sm:block text-[8px] sm:text-[10px] font-bold text-white whitespace-nowrap mb-0.5 sm:mb-1">
                                        {formatCurrency(monthData.prevTotal).replace(' OMR', '')}
                                      </span>
                                    )}
                                    
                                    {/* Tooltip for comparison bar */}
                                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover/comp:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                      <div className="bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg shadow-xl border border-gray-700 dark:border-gray-600 whitespace-nowrap">
                                        <div className="text-[10px] font-semibold mb-0.5">{monthData.month} 2023</div>
                                        <div className="text-xs font-bold">{formatCurrency(monthData.prevTotal)}</div>
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 border-r border-b border-gray-700 dark:border-gray-600 rotate-45" />
                                      </div>
                                    </div>
                                  </motion.div>
                                </div>
                              )}

                              <div className="relative flex-1 flex items-end h-full group/main z-30">
                                <motion.div
                                  className="relative w-full rounded-t-[2px] sm:rounded-t-[4px] transition-all duration-200 min-h-[8px] sm:min-h-[12px] flex items-end justify-center pb-0.5 sm:pb-1 cursor-pointer hover:brightness-110"
                                  style={{ 
                                    height: `${revenueHeight}%`,
                                    backgroundColor: colors.solid
                                  }}
                                  initial={{ height: 0 }}
                                  animate={{ height: `${revenueHeight}%` }}
                                  transition={{ duration: 0.6, delay: monthIndex * 0.05 + 0.1 }}
                                >
                                  {/* Value label inside bar */}
                                  {revenueHeight > 15 && (
                                    <span className="hidden sm:block text-[8px] sm:text-[10px] font-bold text-white whitespace-nowrap mb-0.5 sm:mb-1">
                                      {formatCurrency(monthData.total).replace(' OMR', '')}
                                    </span>
                                  )}
                                  
                                  {/* Tooltip for main bar */}
                                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover/main:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                    <div className="bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg shadow-xl border border-gray-700 dark:border-gray-600 whitespace-nowrap">
                                      <div className="text-[10px] font-semibold mb-0.5">{monthData.month} 2024</div>
                                      <div className="text-xs font-bold">{formatCurrency(monthData.total)}</div>
                                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 border-r border-b border-gray-700 dark:border-gray-600 rotate-45" />
                                    </div>
                                  </div>
                                </motion.div>
                              </div>

                            </div>
                            
                            {/* Baseline */}
                            <div className="w-full h-[1px] sm:h-[2px] bg-gray-300 dark:bg-gray-600/50 rounded-full" />
                            
                            {/* Month Label */}
                            <span className="text-[8px] sm:text-[9px] font-medium text-gray-500 dark:text-gray-400">
                              {monthData.month}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="flex items-center justify-center gap-3 pt-1 text-[9px] sm:text-[10px] text-gray-600 dark:text-gray-400">
                    {comparisonMode && (
                      <div className="flex items-center gap-1.5">
                        <div 
                          className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm" 
                          style={{ 
                            backgroundColor: lightenColor(colors.solid, 40)
                          }} 
                        />
                        <span>2023 Revenue</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm" style={{ backgroundColor: colors.solid }} />
                      <span>2024 Revenue</span>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </motion.div>
      </div>

      {/* 4. Product Revenue Breakdown */}
      <div data-section="product-breakdown" className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
              Revenue by Product
            </h3>
            
            {/* Service Tabs */}
            <div className="flex items-center gap-1.5 bg-gray-100/80 dark:bg-gray-800/50 rounded-lg p-1 border border-gray-200/60 dark:border-gray-700/30">
              <button
                onClick={() => setActiveService('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  activeService === 'all'
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveService('mobile')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  activeService === 'mobile'
                    ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Mobile
              </button>
              <button
                onClick={() => setActiveService('fixed')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  activeService === 'fixed'
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Fixed
              </button>
              <button
                onClick={() => setActiveService('ict')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  activeService === 'ict'
                    ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                ICT
              </button>
              <button
                onClick={() => setActiveService('sms')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  activeService === 'sms'
                    ? 'bg-white dark:bg-gray-700 text-pink-600 dark:text-pink-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                SMS
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {productData.map((product, index) => {
              // Calculate derived metrics
              const target = product.revenue * 1.1; // Simulated target
              const performance = Math.min(100, Math.round((product.revenue / target) * 100));
              const isYoyPositive = customer.trend >= 0;
              
              // Generate mock monthly data for the product based on its current revenue
              const productMonthlyData = Array.from({ length: 10 }, (_, i) => {
                const variance = 1 + (Math.random() * 0.4 - 0.2); // +/- 20%
                const value = (product.revenue / 10 * variance); // Average monthly
                return {
                  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][i],
                  revenue: Math.round(value),
                  prevRevenue: Math.round(value * (1 - (customer.trend / 100))) // Derived previous year
                };
              });

              const Icon = product.name === 'Mobile' ? Smartphone : product.name === 'Fixed' ? Wifi : product.name === 'SMS' ? Activity : Server;

              return (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 + 0.5 }}
                  className="group relative rounded-xl border transition-all duration-300 bg-white dark:bg-[#07112F] hover:shadow-md border-gray-200 dark:border-gray-700/50 hover:border-blue-300/60 dark:hover:border-blue-400/60"
                >
                  <div className="p-6 space-y-5">
                    {/* Header */}
                    <div className="flex items-start gap-3 w-full">
                      <div className={`p-3 rounded-xl shrink-0 ${
                        [
                          'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
                          'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400',
                          'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                          'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
                          'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                        ][index % 5]
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-base font-semibold text-gray-800 dark:text-gray-100 leading-tight tracking-tight truncate">
                            Product Name
                          </h4>
                          <div className="flex flex-col items-end bg-slate-100 dark:bg-slate-800/50 rounded-lg px-3 py-1.5 border border-slate-200 dark:border-slate-700/50">
                            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                              Total Revenue YTD
                            </span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                              {formatCurrency(product.revenue)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Monthly Performance Trend */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          YoY Growth
                        </span>
                        <div className="flex items-center gap-1.5">
                          {isYoyPositive ? (
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                          )}
                          <span className={`text-xs font-bold ${isYoyPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                            {isYoyPositive ? '+' : ''}{customer.trend.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      
                      {/* Vertical Bar Chart (Mini Version) */}
                      <div className="space-y-2">
                        {(() => {
                          const maxValue = Math.max(
                            ...productMonthlyData.map(d => Math.max(d.revenue, comparisonMode ? d.prevRevenue : 0))
                          );
                          
                          // Helper to lighten color
                          const lightenColor = (hex: string, percent: number) => {
                            const num = parseInt(hex.replace('#', ''), 16);
                            const r = Math.min(255, ((num >> 16) + Math.round((255 - (num >> 16)) * percent / 100)));
                            const g = Math.min(255, (((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * percent / 100)));
                            const b = Math.min(255, ((num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * percent / 100)));
                            return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
                          };

                          const colors = { 
                            solid: product.name === 'Mobile' ? '#a855f7' : product.name === 'Fixed' ? '#06b6d4' : '#6366f1'
                          };
                          
                          return (
                            <>
                              <div className="flex items-end justify-between gap-2 bg-gray-50/50 dark:bg-gray-800/20 rounded-lg pt-9 pb-2 px-2 border border-gray-200 dark:border-gray-700/30">
                                {productMonthlyData.map((monthData, monthIndex) => {
                                  const revenueHeight = Math.max((monthData.revenue / maxValue) * 100, 8);
                                  const prevRevenueHeight = comparisonMode ? Math.max((monthData.prevRevenue / maxValue) * 100, 8) : 0;

                                  // Calculate YoY
                                  const yoyGrowth = comparisonMode && monthData.prevRevenue > 0 
                                    ? (((monthData.revenue - monthData.prevRevenue) / monthData.prevRevenue) * 100).toFixed(1) 
                                    : '0.0';
                                  const isYoyPositive = parseFloat(yoyGrowth) >= 0;

                                  return (
                                    <div key={monthIndex} className="flex-1 flex flex-col items-center gap-1.5 group/month relative hover:z-50">
                                      {/* YoY Growth Indicator */}
                                      {comparisonMode && (
                                        <motion.div
                                          className="absolute -top-6 left-1/2 -translate-x-1/2 z-20"
                                          initial={{ opacity: 0, y: 5 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ duration: 0.3, delay: monthIndex * 0.05 + 0.4 }}
                                        >
                                          <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-md ${
                                            isYoyPositive 
                                              ? 'bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700' 
                                              : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
                                          }`}>
                                            {isYoyPositive ? (
                                              <TrendingUp className="w-2 h-2 text-emerald-600 dark:text-emerald-400" />
                                            ) : (
                                              <TrendingDown className="w-2 h-2 text-red-600 dark:text-red-400" />
                                            )}
                                            <span className={`font-['Roboto',sans-serif] font-bold text-[8px] whitespace-nowrap ${
                                              isYoyPositive 
                                                ? 'text-emerald-700 dark:text-emerald-400' 
                                                : 'text-red-700 dark:text-red-400'
                                            }`} style={{ fontVariationSettings: "'wdth' 100" }}>
                                              {isYoyPositive ? '+' : ''}{yoyGrowth}%
                                            </span>
                                          </div>
                                        </motion.div>
                                      )}

                                      <div className="w-full relative flex items-end justify-center gap-0.5 h-32">
                                        {/* Comparison Bar */}
                                        {comparisonMode && (
                                          <div className="relative flex-1 flex items-end h-full group/comp z-30">
                                            <motion.div
                                              className="relative w-full rounded-t-[4px] transition-all duration-200 min-h-[12px] flex items-end justify-center pb-1 cursor-pointer hover:brightness-110"
                                              style={{ 
                                                height: `${prevRevenueHeight}%`,
                                                backgroundColor: lightenColor(colors.solid, 40)
                                              }}
                                              initial={{ height: 0 }}
                                              animate={{ height: `${prevRevenueHeight}%` }}
                                              transition={{ duration: 0.6, delay: monthIndex * 0.05 }}
                                            >
                                              {prevRevenueHeight > 15 && (
                                                <span className="text-[9px] font-bold text-white whitespace-nowrap mb-1">
                                                  {(monthData.prevRevenue / 1000).toFixed(0)}K
                                                </span>
                                              )}
                                              
                                              <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover/comp:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                                <div className="bg-gray-900 dark:bg-gray-800 text-white px-2.5 py-1.5 rounded-lg shadow-xl border border-gray-700 dark:border-gray-600 whitespace-nowrap">
                                                  <div className="text-[9px] font-medium text-gray-400 mb-0.5">{monthData.month} 2023</div>
                                                  <div className="text-[11px] font-bold">{formatCurrency(monthData.prevRevenue)}</div>
                                                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 border-r border-b border-gray-700 dark:border-gray-600 rotate-45" />
                                                </div>
                                              </div>
                                            </motion.div>
                                          </div>
                                        )}

                                        {/* Main Bar */}
                                        <div className="relative flex-1 flex items-end h-full group/main z-30">
                                          <motion.div
                                            className="relative w-full rounded-t-[4px] transition-all duration-200 min-h-[12px] flex items-end justify-center pb-1 cursor-pointer hover:brightness-110"
                                            style={{ 
                                              height: `${revenueHeight}%`,
                                              backgroundColor: colors.solid
                                            }}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${revenueHeight}%` }}
                                            transition={{ duration: 0.6, delay: monthIndex * 0.05 + 0.1 }}
                                          >
                                            {revenueHeight > 15 && (
                                              <span className="text-[10px] font-bold text-white whitespace-nowrap mb-1">
                                                {(monthData.revenue / 1000).toFixed(0)}K
                                              </span>
                                            )}
                                            
                                            <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover/main:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                              <div className="bg-gray-900 dark:bg-gray-800 text-white px-2.5 py-1.5 rounded-lg shadow-xl border border-gray-700 dark:border-gray-600 whitespace-nowrap">
                                                <div className="text-[9px] font-medium text-gray-400 mb-0.5">{monthData.month} 2024</div>
                                                <div className="text-[11px] font-bold">{formatCurrency(monthData.revenue)}</div>
                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 border-r border-b border-gray-700 dark:border-gray-600 rotate-45" />
                                              </div>
                                            </div>
                                          </motion.div>
                                        </div>
                                      </div>
                                      
                                      {/* Baseline */}
                                      <div className="w-full h-[2px] bg-gray-300 dark:bg-gray-600/50 rounded-full" />
                                      
                                      {/* Month Label */}
                                      <div className="text-[9px] font-medium text-gray-500 dark:text-gray-400">
                                        {monthData.month}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              
                              {/* Legend */}
                              <div className="flex items-center justify-center gap-3 pt-1 text-[10px] text-gray-600 dark:text-gray-400">
                                {comparisonMode && (
                                  <div className="flex items-center gap-1.5">
                                    <div 
                                      className="w-2.5 h-2.5 rounded-sm" 
                                      style={{ 
                                        backgroundColor: lightenColor(colors.solid, 40)
                                      }} 
                                    />
                                    <span>2023 Revenue</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1.5">
                                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: colors.solid }} />
                                  <span>2024 Revenue</span>
                                </div>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
      </div>
    </div>
  );
}