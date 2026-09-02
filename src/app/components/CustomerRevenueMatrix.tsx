import React, { useState, useEffect, useMemo } from 'react';
import { TrendingUp, TrendingDown, Users, Wifi, Smartphone, Server, Search, BarChart3, ChevronRight, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { PercentageBadge } from './PerformanceTooltip';
import { ComparisonIndicator } from './ComparisonIndicator';
import { topCustomers, bottomCustomers } from './customerData';

interface CustomerRevenueMatrixProps {
  userRole: string;
  compareMode?: boolean;
  selectedVertical?: string;
  onCustomerSelect?: (customer: any) => void;
}

export function CustomerRevenueMatrix({ userRole, compareMode, selectedVertical = 'All Verticals', onCustomerSelect }: CustomerRevenueMatrixProps) {
  const [rankingTab, setRankingTab] = useState<'top' | 'bottom'>('top');
  const [productFilter, setProductFilter] = useState<'all' | 'Mobile' | 'Fixed' | 'ICT' | 'SMS'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Memoize the base list to ensure randomization is consistent for pagination
  const randomizedBase = useMemo(() => {
    const customers = rankingTab === 'top' ? [...topCustomers] : [...bottomCustomers];
    // Only shuffle when "All Verticals" is active to provide the "diverse initial view"
    if (selectedVertical === 'All Verticals' && !searchQuery.trim()) {
      return customers.sort(() => Math.random() - 0.5);
    }
    return customers;
  }, [rankingTab, selectedVertical === 'All Verticals', searchQuery.trim() === '']);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [rankingTab, productFilter, searchQuery, selectedVertical]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M OMR`;
    }
    return `${(value / 1000).toFixed(0)}K OMR`;
  };

  return (
    <div className="space-y-4 w-full h-full">
      {/* Responsive Customer Performance Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-[#07112F] rounded-xl p-4 sm:p-6 border border-[#E2E8F0] dark:border-[#E2E8F0]/20 transition-all duration-200 flex flex-col w-full h-full"
      >
        {/* Title with Icon */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-100/60 to-blue-50/30 dark:from-blue-900/20 dark:to-blue-800/10 rounded-lg">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-sm sm:text-[15px] font-medium text-gray-900 dark:text-gray-100 truncate">
                {userRole === 'General Manager' ? 'Customers Revenue' : userRole === 'KAM' ? 'My Customer Performance Matrix' : 'Customers Revenue'}
              </h2>
              {selectedVertical && selectedVertical !== 'All Verticals' && (
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                  Filtered by: {selectedVertical}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Responsive Controls Section */}
        <div className="flex-shrink-0 space-y-3 sm:space-y-4 m-[0px]">
          {/* Top KPI Cards - Responsive Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
            {/* Total Revenue Card */}
            <div 
              onClick={() => setProductFilter('all')}
              className={`relative bg-slate-50/50 dark:bg-[#07112F] rounded-xl p-4 border transition-all duration-300 hover:shadow-md ${
                productFilter === 'all' 
                  ? 'border-slate-300/60 dark:border-slate-500/40 ring-2 ring-slate-200/50 dark:ring-slate-600/20' 
                  : 'border-gray-200/60 dark:border-white/[0.08] hover:border-slate-300/60 dark:hover:border-slate-500/40'
              }`}
            >
              {compareMode && (
                <div className="absolute top-3 right-3 z-10">
                  <ComparisonIndicator
                    currentValue={topCustomers.reduce((sum, c) => sum + c.mobile + c.fixed + c.ict + c.sms, 0)}
                    previousValue={topCustomers.reduce((sum, c) => sum + (c.mobile + c.fixed + c.ict + c.sms) / (1 + c.trend / 100), 0)}
                    formatValue={(val) => formatCurrency(val)}
                    label="Total Revenue YoY"
                    additionalInfo={[
                      {
                        label: 'SMS',
                        current: formatCurrency(topCustomers.reduce((sum, c) => sum + c.sms, 0)),
                        previous: formatCurrency(topCustomers.reduce((sum, c) => sum + c.sms / (1 + c.trend / 100), 0))
                      },
                      {
                        label: 'Mobile',
                        current: formatCurrency(topCustomers.reduce((sum, c) => sum + c.mobile, 0)),
                        previous: formatCurrency(topCustomers.reduce((sum, c) => sum + c.mobile / (1 + c.trend / 100), 0))
                      },
                      {
                        label: 'Fixed',
                        current: formatCurrency(topCustomers.reduce((sum, c) => sum + c.fixed, 0)),
                        previous: formatCurrency(topCustomers.reduce((sum, c) => sum + c.fixed / (1 + c.trend / 100), 0))
                      },
                      {
                        label: 'ICT',
                        current: formatCurrency(topCustomers.reduce((sum, c) => sum + c.ict, 0)),
                        previous: formatCurrency(topCustomers.reduce((sum, c) => sum + c.ict / (1 + c.trend / 100), 0))
                      }
                    ]}
                  />
                </div>
              )}
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-slate-100/80 dark:bg-slate-900/30 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </div>
                {!compareMode && (
                  <PercentageBadge
                    current={topCustomers.reduce((sum, c) => sum + c.mobile + c.fixed + c.ict + c.sms, 0)}
                    previous={topCustomers.reduce((sum, c) => sum + (c.mobile + c.fixed + c.ict + c.sms) / (1 + c.trend / 100), 0)}
                    formatValue={(val) => formatCurrency(val).replace('OMR ', '').replace(' OMR', '')}
                    currentTarget={topCustomers.reduce((sum, c) => sum + (c.mobile + c.fixed + c.ict + c.sms) * c.targetMultiplier, 0)}
                    previousTarget={topCustomers.reduce((sum, c) => sum + ((c.mobile + c.fixed + c.ict + c.sms) / (1 + c.trend / 100)) * c.targetMultiplier, 0)}
                    formatTarget={(val) => formatCurrency(val).replace('OMR ', '').replace(' OMR', '')}
                  />
                )}
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Total Revenue</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100" style={{ fontSize: '16px' }}>
                {formatCurrency(topCustomers.reduce((sum, c) => sum + c.mobile + c.fixed + c.ict + c.sms, 0)).replace('OMR ', '').replace(' OMR', '')}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">All services Revenue</p>
            </div>

            {/* Mobile Revenue Card */}
            <div 
              onClick={() => setProductFilter('Mobile')}
              className={`relative bg-gradient-to-br from-purple-50/80 to-purple-100/40 dark:from-purple-950/20 dark:to-purple-900/10 rounded-xl p-4 border transition-all duration-300 hover:shadow-md ${
                productFilter === 'Mobile' 
                  ? 'border-purple-300/60 dark:border-purple-500/40 ring-2 ring-purple-200/50 dark:ring-purple-600/20' 
                  : 'border-gray-200/60 dark:border-white/[0.08] hover:border-purple-300/60 dark:hover:border-purple-500/40'
              }`}
            >
              {compareMode && (
                <div className="absolute top-3 right-3 z-10">
                  <ComparisonIndicator
                    currentValue={topCustomers.reduce((sum, c) => sum + c.mobile, 0)}
                    previousValue={topCustomers.reduce((sum, c) => sum + c.mobile / (1 + c.trend / 100), 0)}
                    formatValue={(val) => formatCurrency(val)}
                    label="Mobile Revenue YoY"
                  />
                </div>
              )}
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-purple-100/80 dark:bg-purple-900/30 rounded-lg">
                  <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                {!compareMode && (
                  <PercentageBadge
                    current={topCustomers.reduce((sum, c) => sum + c.mobile, 0)}
                    previous={topCustomers.reduce((sum, c) => sum + c.mobile / (1 + c.trend / 100), 0)}
                    formatValue={(val) => formatCurrency(val).replace('OMR ', '').replace(' OMR', '')}
                    currentTarget={topCustomers.reduce((sum, c) => sum + c.mobile * c.targetMultiplier, 0)}
                    previousTarget={topCustomers.reduce((sum, c) => sum + (c.mobile / (1 + c.trend / 100)) * c.targetMultiplier, 0)}
                    formatTarget={(val) => formatCurrency(val).replace('OMR ', '').replace(' OMR', '')}
                  />
                )}
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Mobile</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100" style={{ fontSize: '16px' }}>
                {formatCurrency(topCustomers.reduce((sum, c) => sum + c.mobile, 0)).replace('OMR ', '').replace(' OMR', '')}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Mobile Revenue</p>
            </div>

            {/* Fixed Revenue Card */}
            <div 
              onClick={() => setProductFilter('Fixed')}
              className={`relative bg-gradient-to-br from-blue-50/80 to-blue-100/40 dark:from-blue-950/20 dark:to-blue-900/10 rounded-xl p-4 border transition-all duration-300 hover:shadow-md ${
                productFilter === 'Fixed' 
                  ? 'border-blue-300/60 dark:border-blue-500/40 ring-2 ring-blue-200/50 dark:ring-blue-600/20' 
                  : 'border-gray-200/60 dark:border-white/[0.08] hover:border-blue-300/60 dark:hover:border-blue-500/40'
              }`}
            >
              {compareMode && (
                <div className="absolute top-3 right-3 z-10">
                  <ComparisonIndicator
                    currentValue={topCustomers.reduce((sum, c) => sum + c.fixed, 0)}
                    previousValue={topCustomers.reduce((sum, c) => sum + c.fixed / (1 + c.trend / 100), 0)}
                    formatValue={(val) => formatCurrency(val)}
                    label="Fixed Revenue YoY"
                  />
                </div>
              )}
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-blue-100/80 dark:bg-blue-900/30 rounded-lg">
                  <Wifi className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                {!compareMode && (
                  <PercentageBadge
                    current={topCustomers.reduce((sum, c) => sum + c.fixed, 0)}
                    previous={topCustomers.reduce((sum, c) => sum + c.fixed / (1 + c.trend / 100), 0)}
                    formatValue={(val) => formatCurrency(val).replace('OMR ', '').replace(' OMR', '')}
                    currentTarget={topCustomers.reduce((sum, c) => sum + c.fixed * c.targetMultiplier, 0)}
                    previousTarget={topCustomers.reduce((sum, c) => sum + (c.fixed / (1 + c.trend / 100)) * c.targetMultiplier, 0)}
                    formatTarget={(val) => formatCurrency(val).replace('OMR ', '').replace(' OMR', '')}
                  />
                )}
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Fixed</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100" style={{ fontSize: '16px' }}>
                {formatCurrency(topCustomers.reduce((sum, c) => sum + c.fixed, 0)).replace('OMR ', '').replace(' OMR', '')}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Fixed Revenue</p>
            </div>

            {/* ICT Revenue Card */}
            <div 
              onClick={() => setProductFilter('ICT')}
              className={`relative bg-gradient-to-br from-indigo-50/80 to-indigo-100/40 dark:from-indigo-950/20 dark:to-indigo-900/10 rounded-xl p-4 border transition-all duration-300 hover:shadow-md ${
                productFilter === 'ICT' 
                  ? 'border-indigo-300/60 dark:border-indigo-500/40 ring-2 ring-indigo-200/50 dark:ring-indigo-600/20' 
                  : 'border-gray-200/60 dark:border-white/[0.08] hover:border-indigo-300/60 dark:hover:border-indigo-500/40'
              }`}
            >
              {compareMode && (
                <div className="absolute top-3 right-3 z-10">
                  <ComparisonIndicator
                    currentValue={topCustomers.reduce((sum, c) => sum + c.ict, 0)}
                    previousValue={topCustomers.reduce((sum, c) => sum + c.ict / (1 + c.trend / 100), 0)}
                    formatValue={(val) => formatCurrency(val)}
                    label="ICT Revenue YoY"
                  />
                </div>
              )}
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-indigo-100/80 dark:bg-indigo-900/30 rounded-lg">
                  <Server className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                {!compareMode && (
                  <PercentageBadge
                    current={topCustomers.reduce((sum, c) => sum + c.ict, 0)}
                    previous={topCustomers.reduce((sum, c) => sum + c.ict / (1 + c.trend / 100), 0)}
                    formatValue={(val) => formatCurrency(val).replace('OMR ', '').replace(' OMR', '')}
                    currentTarget={topCustomers.reduce((sum, c) => sum + c.ict * c.targetMultiplier, 0)}
                    previousTarget={topCustomers.reduce((sum, c) => sum + (c.ict / (1 + c.trend / 100)) * c.targetMultiplier, 0)}
                    formatTarget={(val) => formatCurrency(val).replace('OMR ', '').replace(' OMR', '')}
                  />
                )}
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">ICT</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100" style={{ fontSize: '16px' }}>
                {formatCurrency(topCustomers.reduce((sum, c) => sum + c.ict, 0)).replace('OMR ', '').replace(' OMR', '')}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">ICT revenue</p>
            </div>

            {/* SMS Revenue Card */}
            <div 
              onClick={() => setProductFilter('SMS')}
              className={`relative bg-gradient-to-br from-emerald-50/80 to-emerald-100/40 dark:from-emerald-950/20 dark:to-emerald-900/10 rounded-xl p-4 border transition-all duration-300 hover:shadow-md cursor-pointer ${
                productFilter === 'SMS' 
                  ? 'border-emerald-300/60 dark:border-emerald-500/40 ring-2 ring-emerald-200/50 dark:ring-emerald-600/20' 
                  : 'border-gray-200/60 dark:border-white/[0.08] hover:border-emerald-300/60 dark:hover:border-emerald-500/40'
              }`}
            >
              {compareMode && (
                <div className="absolute top-3 right-3 z-10">
                  <ComparisonIndicator
                    currentValue={topCustomers.reduce((sum, c) => sum + c.sms, 0)}
                    previousValue={topCustomers.reduce((sum, c) => sum + c.sms / (1 + c.trend / 100), 0)}
                    formatValue={(val) => formatCurrency(val)}
                    label="SMS Revenue YoY"
                  />
                </div>
              )}
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 bg-emerald-100/80 dark:bg-emerald-900/30 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                {!compareMode && (
                  <PercentageBadge
                    current={topCustomers.reduce((sum, c) => sum + c.sms, 0)}
                    previous={topCustomers.reduce((sum, c) => sum + c.sms / (1 + c.trend / 100), 0)}
                    formatValue={(val) => formatCurrency(val).replace('OMR ', '').replace(' OMR', '')}
                    currentTarget={topCustomers.reduce((sum, c) => sum + c.sms * c.targetMultiplier, 0)}
                    previousTarget={topCustomers.reduce((sum, c) => sum + (c.sms / (1 + c.trend / 100)) * c.targetMultiplier, 0)}
                    formatTarget={(val) => formatCurrency(val).replace('OMR ', '').replace(' OMR', '')}
                  />
                )}
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">SMS</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100" style={{ fontSize: '16px' }}>
                {formatCurrency(topCustomers.reduce((sum, c) => sum + c.sms, 0)).replace('OMR ', '').replace(' OMR', '')}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">SMS Revenue</p>
            </div>
          </div>

          {/* Responsive Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-2 sm:gap-3">
            {/* Top/Bottom Tabs */}
            <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50">
              <button
                onClick={() => setRankingTab('top')}
                className={`flex-1 min-h-[44px] sm:min-h-0 px-3 py-2 rounded text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  rankingTab === 'top'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Top 25
              </button>
              <button
                onClick={() => setRankingTab('bottom')}
                className={`flex-1 min-h-[44px] sm:min-h-0 px-3 py-2 rounded text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  rankingTab === 'bottom'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Bottom 25
              </button>
            </div>

            {/* Search Input - Full width on mobile */}
            <div className="w-full sm:w-[30%] relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-400 transition-colors duration-300 pointer-events-none" />
              <Input
                placeholder="Search by name, CR, company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full min-h-[44px] sm:min-h-0 sm:h-9 focus:ring-0 focus:border-blue-100/30 dark:focus:border-blue-400/15 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Table Header - Desktop Only */}
          <div className="hidden bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
            <div className={`grid gap-3 text-xs font-semibold text-gray-600 dark:text-gray-400 ${
              productFilter === 'all' ? 'grid-cols-12' : 'grid-cols-6'
            }`}>
              <div className="col-span-1 text-center">#</div>
              <div className={productFilter === 'all' ? 'col-span-3' : 'col-span-3'}>Customer</div>
              {productFilter === 'all' && (
                <span className="contents">
                  <div className="col-span-2">
                    <div className="flex items-center gap-1">
                      <span>Total</span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-1">
                      <Smartphone className="w-3 h-3" />
                      <span>Mobile</span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-1">
                      <Wifi className="w-3 h-3" />
                      <span>Fixed</span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-1">
                      <Server className="w-3 h-3" />
                      <span>ICT</span>
                    </div>
                  </div>
                </span>
              )}
              {productFilter !== 'all' && (
                <div className="col-span-2">{productFilter} Revenue</div>
              )}
            </div>
          </div>
        </div>

        {/* Customer List */}
        <div className="space-y-2 sm:space-y-3 flex-1 flex flex-col justify-start">
          {(() => {
            const customers = randomizedBase;
            let filteredCustomers = customers;
            
            // Apply search filter
            if (searchQuery.trim()) {
              filteredCustomers = filteredCustomers.filter(c => 
                c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.segment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.vertical.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.company.toLowerCase().includes(searchQuery.toLowerCase())
              );
            }
            
            // Apply vertical filter if not 'All Verticals'
            if (selectedVertical && selectedVertical !== 'All Verticals') {
              filteredCustomers = filteredCustomers.filter(c => 
                c.vertical === selectedVertical
              );
            }
            
            // Apply product filter if not 'all'
            if (productFilter !== 'all') {
              filteredCustomers = filteredCustomers.filter(c => {
                const productRevenue = productFilter === 'Mobile' ? c.mobile : 
                                      productFilter === 'Fixed' ? c.fixed : 
                                      productFilter === 'ICT' ? c.ict : c.sms;
                return productRevenue > 0;
              });
              
              // Sort by selected product revenue
              filteredCustomers = [...filteredCustomers].sort((a, b) => {
                const aRevenue = productFilter === 'Mobile' ? a.mobile : 
                               productFilter === 'Fixed' ? a.fixed : 
                               productFilter === 'ICT' ? a.ict : a.sms;
                const bRevenue = productFilter === 'Mobile' ? b.mobile : 
                               productFilter === 'Fixed' ? b.fixed : 
                               productFilter === 'ICT' ? b.ict : b.sms;
                return rankingTab === 'top' ? bRevenue - aRevenue : aRevenue - bRevenue;
              });
            }
            
            // Calculate pagination
            const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);
            
            const isTop = rankingTab === 'top';
            
            return paginatedCustomers.length > 0 ? (
              <span className="contents">
                {/* Desktop Table View */}
                <div className="hidden lg:block bg-white/40 dark:bg-gray-900/20 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
                  <table className="w-full table-fixed">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left px-2 py-2 text-[9px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide bg-gray-50/50 dark:bg-gray-800/30 w-16">CR</th>
                        <th className="text-left px-2 py-2 text-[9px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide bg-gray-50/50 dark:bg-gray-800/30">Customer</th>
                        {productFilter === 'all' && (
                          <>
                            <th className="text-left px-2 py-2 text-[9px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide bg-gray-50/50 dark:bg-gray-800/30 w-20">Total</th>
                            <th className="text-left px-2 py-2 text-[9px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide bg-gray-50/50 dark:bg-gray-800/30 w-20">Mobile</th>
                            <th className="text-left px-2 py-2 text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide bg-gray-50/50 dark:bg-gray-800/30 w-20">Fixed</th>
                            <th className="text-left px-2 py-2 text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide bg-gray-50/50 dark:bg-gray-800/30 w-20">ICT</th>
                          </>
                        )}
                        {productFilter === 'Mobile' && (
                          <th className="text-left px-2 py-2 text-[9px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide bg-gray-50/50 dark:bg-gray-800/30 w-28">Mobile Rev</th>
                        )}
                        {productFilter === 'Fixed' && (
                          <th className="text-left px-2 py-2 text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide bg-gray-50/50 dark:bg-gray-800/30 w-28">Fixed Rev</th>
                        )}
                        {productFilter === 'ICT' && (
                          <th className="text-left px-2 py-2 text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide bg-gray-50/50 dark:bg-gray-800/30 w-28">ICT Rev</th>
                        )}
                        {productFilter === 'SMS' && (
                          <th className="text-left px-2 py-2 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide bg-gray-50/50 dark:bg-gray-800/30 w-28">SMS Rev</th>
                        )}
                        <th className="w-8 bg-gray-50/50 dark:bg-gray-800/30"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Table Rows */}
                {paginatedCustomers.map((customer, index) => {
              const totalRevenue = customer.mobile + customer.fixed + customer.ict + customer.sms;
              const previousTotalRevenue = totalRevenue / (1 + customer.trend / 100);
              const previousMobile = customer.mobile / (1 + customer.trend / 100);
              const previousFixed = customer.fixed / (1 + customer.trend / 100);
              const previousICT = customer.ict / (1 + customer.trend / 100);
              
              const currentTotalTarget = totalRevenue * customer.targetMultiplier;
              const currentMobileTarget = customer.mobile * customer.targetMultiplier;
              const currentFixedTarget = customer.fixed * customer.targetMultiplier;
              const currentICTTarget = customer.ict * customer.targetMultiplier;
              
              const previousTotalTarget = previousTotalRevenue * customer.targetMultiplier;
              const previousMobileTarget = previousMobile * customer.targetMultiplier;
              const previousFixedTarget = previousFixed * customer.targetMultiplier;
              const previousICTTarget = previousICT * customer.targetMultiplier;
              
              const actualRank = startIndex + index + 1;

              // Helper to determine service trend status
              const getServiceTrend = (serviceName: 'Mobile' | 'Fixed' | 'ICT' | 'SMS', value: number) => {
                const isExplicitDrop = customer.declineService === serviceName;
                
                // If this is the explicitly marked decline service
                if (isExplicitDrop) {
                   const prevVal = value / (1 + (customer.trend / 100));
                   const diff = Math.abs(value - prevVal);
                   return { 
                     type: 'drop', 
                     date: customer.declineDate || 'Q4 2024', 
                     diff, 
                     percent: Math.abs(customer.trend) 
                   };
                }

                // For all other cases, derive from overall trend
                const isPositive = customer.trend >= 0;
                const percent = Math.abs(customer.trend);
                const prevVal = value / (1 + (customer.trend / 100));
                const diff = Math.abs(value - prevVal);
                
                return { 
                    type: isPositive ? 'growth' : 'drop', 
                    date: isPositive ? 'Q4 2024' : (customer.declineDate || 'Q4 2024'),
                    diff, 
                    percent 
                };
              };
              
              return (
                  <tr 
                    key={`${customer.name}-${actualRank}`}
                    onClick={() => onCustomerSelect?.(customer)}
                    className={`cursor-pointer border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors ${
                      isTop 
                        ? 'border-l-2 border-l-emerald-500'
                        : 'border-l-2 border-l-orange-500'
                    }`}
                  >
                    {/* Customer ID */}
                    <td className="px-2 py-2">
                      <div className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        isTop 
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-700/30'
                          : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-700/30'
                      }`}>
                        {customer.id}
                      </div>
                    </td>
                    
                    {/* Customer Info */}
                    <td className="px-2 py-2">
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold text-gray-900 dark:text-gray-100 truncate">{customer.company}</p>
                        <p className="text-[9px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
                          {selectedVertical === 'All Verticals' ? `${customer.segment} • ${customer.vertical}` : customer.segment}
                        </p>
                        <p className="text-[8px] text-gray-400 dark:text-gray-500 truncate mt-0.5 text-[10px]">{customer.name}</p>
                      </div>
                    </td>
                    
                    {/* Revenue Columns */}
                    {productFilter === 'all' && (
                      <>
                        <td className="px-2 py-2">
                          <p className="text-[11px] font-semibold text-gray-900 dark:text-gray-100 mb-1 truncate">{totalRevenue.toFixed(0)}</p>
                          <PercentageBadge current={totalRevenue} previous={previousTotalRevenue} formatValue={(val) => val.toFixed(0)} currentTarget={currentTotalTarget} previousTarget={previousTotalTarget} formatTarget={(val) => val.toFixed(0)} />
                        </td>
                        {/* Mobile Column */}
                        <td className="px-2 py-2 group/mobile relative">
                          <div className="flex items-center gap-0.5">
                            <p className="text-[11px] font-semibold text-purple-700 dark:text-purple-300 truncate">{customer.mobile.toFixed(0)}</p>
                            {(() => {
                              const trend = getServiceTrend('Mobile', customer.mobile);
                              if (trend) return (
                                <div className="cursor-help relative flex-shrink-0">
                                  {trend.type === 'drop' ? (
                                    <TrendingDown className="w-2.5 h-2.5 text-red-500" />
                                  ) : (
                                    <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
                                  )}
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/mobile:block z-50">
                                    <div className="bg-slate-900 text-white text-xs rounded py-1.5 px-2.5 whitespace-nowrap shadow-xl border border-slate-700/50">
                                      <p className="font-semibold text-xs mb-0.5">{trend.type === 'drop' ? 'Mobile Revenue Drop' : 'Mobile Growth Driver'}</p>
                                      <div className="flex items-center gap-2 text-xs opacity-90">
                                        <span>{trend.type === 'drop' ? '-' : '+'}{trend.diff.toFixed(0)}</span>
                                        <span className={trend.type === 'drop' ? 'text-red-300' : 'text-emerald-300'}>
                                          ({trend.percent.toFixed(1)}%)
                                        </span>
                                      </div>
                                      <p className="text-slate-400 text-[10px] mt-1 pt-1 border-t border-slate-700/50">Since {trend.date}</p>
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </td>
                        
                        {/* Fixed Column */}
                        <td className="px-2 py-2 group/fixed relative">
                           <div className="flex items-center gap-0.5">
                            <p className="text-[11px] font-semibold text-blue-700 dark:text-blue-300 truncate">{customer.fixed.toFixed(0)}</p>
                            {(() => {
                              const trend = getServiceTrend('Fixed', customer.fixed);
                              if (trend) return (
                                <div className="cursor-help relative flex-shrink-0">
                                  {trend.type === 'drop' ? (
                                    <TrendingDown className="w-2.5 h-2.5 text-red-500" />
                                  ) : (
                                    <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
                                  )}
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/fixed:block z-50">
                                    <div className="bg-slate-900 text-white text-xs rounded py-1.5 px-2.5 whitespace-nowrap shadow-xl border border-slate-700/50">
                                      <p className="font-semibold text-xs mb-0.5">{trend.type === 'drop' ? 'Fixed Revenue Drop' : 'Fixed Growth Driver'}</p>
                                      <div className="flex items-center gap-2 text-xs opacity-90">
                                        <span>{trend.type === 'drop' ? '-' : '+'}{trend.diff.toFixed(0)}</span>
                                        <span className={trend.type === 'drop' ? 'text-red-300' : 'text-emerald-300'}>
                                          ({trend.percent.toFixed(1)}%)
                                        </span>
                                      </div>
                                      <p className="text-slate-400 text-[10px] mt-1 pt-1 border-t border-slate-700/50">Since {trend.date}</p>
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </td>

                        {/* ICT Column */}
                        <td className="px-2 py-2 group/ict relative">
                           <div className="flex items-center gap-0.5">
                            <p className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 truncate">{customer.ict.toFixed(0)}</p>
                            {(() => {
                              const trend = getServiceTrend('ICT', customer.ict);
                              if (trend) return (
                                <div className="cursor-help relative flex-shrink-0">
                                  {trend.type === 'drop' ? (
                                    <TrendingDown className="w-2.5 h-2.5 text-red-500" />
                                  ) : (
                                    <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
                                  )}
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/ict:block z-50">
                                    <div className="bg-slate-900 text-white text-xs rounded py-1.5 px-2.5 whitespace-nowrap shadow-xl border border-slate-700/50">
                                      <p className="font-semibold text-xs mb-0.5">{trend.type === 'drop' ? 'ICT Revenue Drop' : 'ICT Growth Driver'}</p>
                                      <div className="flex items-center gap-2 text-xs opacity-90">
                                        <span>{trend.type === 'drop' ? '-' : '+'}{trend.diff.toFixed(0)}</span>
                                        <span className={trend.type === 'drop' ? 'text-red-300' : 'text-emerald-300'}>
                                          ({trend.percent.toFixed(1)}%)
                                        </span>
                                      </div>
                                      <p className="text-slate-400 text-[10px] mt-1 pt-1 border-t border-slate-700/50">Since {trend.date}</p>
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </td>
                      </>
                    )}
                    {productFilter === 'Mobile' && (
                      <td className="px-2 py-2 group/mobile-filter relative">
                        <div className="flex items-center gap-0.5 mb-1">
                          <p className="text-[11px] font-semibold text-purple-700 dark:text-purple-300 truncate">{customer.mobile.toFixed(0)}</p>
                          {(() => {
                            const trend = getServiceTrend('Mobile', customer.mobile);
                            if (trend) return (
                              <div className="cursor-help relative flex-shrink-0">
                                {trend.type === 'drop' ? (
                                  <TrendingDown className="w-2.5 h-2.5 text-red-500" />
                                ) : (
                                  <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
                                )}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/mobile-filter:block z-50">
                                  <div className="bg-slate-900 text-white text-xs rounded py-1.5 px-2.5 whitespace-nowrap shadow-xl border border-slate-700/50">
                                    <p className="font-semibold text-xs mb-0.5">{trend.type === 'drop' ? 'Mobile Revenue Drop' : 'Mobile Growth Driver'}</p>
                                    <div className="flex items-center gap-2 text-xs opacity-90">
                                      <span>{trend.type === 'drop' ? '-' : '+'}{trend.diff.toFixed(0)}</span>
                                      <span className={trend.type === 'drop' ? 'text-red-300' : 'text-emerald-300'}>
                                        ({trend.percent.toFixed(1)}%)
                                      </span>
                                    </div>
                                    <p className="text-slate-400 text-[10px] mt-1 pt-1 border-t border-slate-700/50">Since {trend.date}</p>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                        <PercentageBadge current={customer.mobile} previous={previousMobile} formatValue={(val) => val.toFixed(0)} currentTarget={currentMobileTarget} previousTarget={previousMobileTarget} formatTarget={(val) => val.toFixed(0)} />
                      </td>
                    )}
                    {productFilter === 'Fixed' && (
                      <td className="px-2 py-2 group/fixed-filter relative">
                        <div className="flex items-center gap-0.5 mb-1">
                          <p className="text-[11px] font-semibold text-blue-700 dark:text-blue-300 truncate">{customer.fixed.toFixed(0)}</p>
                          {(() => {
                            const trend = getServiceTrend('Fixed', customer.fixed);
                            if (trend) return (
                              <div className="cursor-help relative flex-shrink-0">
                                {trend.type === 'drop' ? (
                                  <TrendingDown className="w-2.5 h-2.5 text-red-500" />
                                ) : (
                                  <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
                                )}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/fixed-filter:block z-50">
                                  <div className="bg-slate-900 text-white text-xs rounded py-1.5 px-2.5 whitespace-nowrap shadow-xl border border-slate-700/50">
                                    <p className="font-semibold text-xs mb-0.5">{trend.type === 'drop' ? 'Fixed Revenue Drop' : 'Fixed Growth Driver'}</p>
                                    <div className="flex items-center gap-2 text-xs opacity-90">
                                      <span>{trend.type === 'drop' ? '-' : '+'}{trend.diff.toFixed(0)}</span>
                                      <span className={trend.type === 'drop' ? 'text-red-300' : 'text-emerald-300'}>
                                        ({trend.percent.toFixed(1)}%)
                                      </span>
                                    </div>
                                    <p className="text-slate-400 text-[10px] mt-1 pt-1 border-t border-slate-700/50">Since {trend.date}</p>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                        <PercentageBadge current={customer.fixed} previous={previousFixed} formatValue={(val) => val.toFixed(0)} currentTarget={currentFixedTarget} previousTarget={previousFixedTarget} formatTarget={(val) => val.toFixed(0)} />
                      </td>
                    )}
                    {productFilter === 'ICT' && (
                      <td className="px-2 py-2 group/ict-filter relative">
                        <div className="flex items-center gap-0.5 mb-1">
                          <p className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 truncate">{customer.ict.toFixed(0)}</p>
                          {(() => {
                            const trend = getServiceTrend('ICT', customer.ict);
                            if (trend) return (
                              <div className="cursor-help relative flex-shrink-0">
                                {trend.type === 'drop' ? (
                                  <TrendingDown className="w-2.5 h-2.5 text-red-500" />
                                ) : (
                                  <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
                                )}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/ict-filter:block z-50">
                                  <div className="bg-slate-900 text-white text-xs rounded py-1.5 px-2.5 whitespace-nowrap shadow-xl border border-slate-700/50">
                                    <p className="font-semibold text-xs mb-0.5">{trend.type === 'drop' ? 'ICT Revenue Drop' : 'ICT Growth Driver'}</p>
                                    <div className="flex items-center gap-2 text-xs opacity-90">
                                      <span>{trend.type === 'drop' ? '-' : '+'}{trend.diff.toFixed(0)}</span>
                                      <span className={trend.type === 'drop' ? 'text-red-300' : 'text-emerald-300'}>
                                        ({trend.percent.toFixed(1)}%)
                                      </span>
                                    </div>
                                    <p className="text-slate-400 text-[10px] mt-1 pt-1 border-t border-slate-700/50">Since {trend.date}</p>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                        <PercentageBadge current={customer.ict} previous={previousICT} formatValue={(val) => val.toFixed(0)} currentTarget={currentICTTarget} previousTarget={previousICTTarget} formatTarget={(val) => val.toFixed(0)} />
                      </td>
                    )}
                    {productFilter === 'SMS' && (
                      <td className="px-2 py-2 group/sms-filter relative">
                        <div className="flex items-center gap-0.5 mb-1">
                          <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 truncate">{customer.sms.toFixed(0)}</p>
                          {(() => {
                            const trend = getServiceTrend('SMS', customer.sms);
                            if (trend) return (
                              <div className="cursor-help relative flex-shrink-0">
                                {trend.type === 'drop' ? (
                                  <TrendingDown className="w-2.5 h-2.5 text-red-500" />
                                ) : (
                                  <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
                                )}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/sms-filter:block z-50">
                                  <div className="bg-slate-900 text-white text-xs rounded py-1.5 px-2.5 whitespace-nowrap shadow-xl border border-slate-700/50">
                                    <p className="font-semibold text-xs mb-0.5">{trend.type === 'drop' ? 'SMS Revenue Drop' : 'SMS Growth Driver'}</p>
                                    <div className="flex items-center gap-2 text-xs opacity-90">
                                      <span>{trend.type === 'drop' ? '-' : '+'}{trend.diff.toFixed(0)}</span>
                                      <span className={trend.type === 'drop' ? 'text-red-300' : 'text-emerald-300'}>
                                        ({trend.percent.toFixed(1)}%)
                                      </span>
                                    </div>
                                    <p className="text-slate-400 text-[10px] mt-1 pt-1 border-t border-slate-700/50">Since {trend.date}</p>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                        <PercentageBadge current={customer.sms} previous={customer.sms / (1 + customer.trend / 100)} formatValue={(val) => val.toFixed(0)} currentTarget={customer.sms * customer.targetMultiplier} previousTarget={(customer.sms / (1 + customer.trend / 100)) * customer.targetMultiplier} formatTarget={(val) => val.toFixed(0)} />
                      </td>
                    )}
                    
                    {/* Arrow Icon */}
                    <td className="px-2 py-2 text-right">
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 inline-block" />
                    </td>
                  </tr>
              );
            })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile List View */}
                <div className="lg:hidden space-y-2">
                  {paginatedCustomers.map((customer, index) => {
              const totalRevenue = customer.mobile + customer.fixed + customer.ict + customer.sms;
              const previousTotalRevenue = totalRevenue / (1 + customer.trend / 100);
              const previousMobile = customer.mobile / (1 + customer.trend / 100);
              const previousFixed = customer.fixed / (1 + customer.trend / 100);
              const previousICT = customer.ict / (1 + customer.trend / 100);
              
              const currentTotalTarget = totalRevenue * customer.targetMultiplier;
              const currentMobileTarget = customer.mobile * customer.targetMultiplier;
              const currentFixedTarget = customer.fixed * customer.targetMultiplier;
              const currentICTTarget = customer.ict * customer.targetMultiplier;
              
              const previousTotalTarget = previousTotalRevenue * customer.targetMultiplier;
              const previousMobileTarget = previousMobile * customer.targetMultiplier;
              const previousFixedTarget = previousFixed * customer.targetMultiplier;
              const previousICTTarget = previousICT * customer.targetMultiplier;
              
              const actualRank = startIndex + index + 1;

              // Helper to determine service trend status
              const getServiceTrend = (serviceName: 'Mobile' | 'Fixed' | 'ICT' | 'SMS', value: number) => {
                const isExplicitDrop = customer.declineService === serviceName;
                
                // If this is the explicitly marked decline service
                if (isExplicitDrop) {
                   const prevVal = value / (1 + (customer.trend / 100));
                   const diff = Math.abs(value - prevVal);
                   return { 
                     type: 'drop', 
                     date: customer.declineDate || 'Q4 2024', 
                     diff, 
                     percent: Math.abs(customer.trend) 
                   };
                }

                // For all other cases, derive from overall trend
                const isPositive = customer.trend >= 0;
                const percent = Math.abs(customer.trend);
                const prevVal = value / (1 + (customer.trend / 100));
                const diff = Math.abs(value - prevVal);
                
                return { 
                    type: isPositive ? 'growth' : 'drop', 
                    date: isPositive ? 'Q4 2024' : (customer.declineDate || 'Q4 2024'),
                    diff, 
                    percent 
                };
              };
              
              const isTop = rankingTab === 'top';

              return (
                  <div
                    key={`mobile-${customer.name}-${actualRank}`} 
                    onClick={() => onCustomerSelect?.(customer)}
                    className={`lg:hidden flex flex-col px-3 py-2 cursor-pointer ${
                      isTop 
                        ? 'bg-white/60 dark:bg-[#0A1628]/60 border-l-2 border-l-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20'
                        : 'bg-white/60 dark:bg-[#0A1628]/60 border-l-2 border-l-orange-500 hover:bg-orange-50/50 dark:hover:bg-orange-950/20'
                    } border-b border-gray-100/50 dark:border-gray-800/50 hover:shadow-sm transition-all duration-200 space-y-2`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <div className={`px-1.5 py-0.5 rounded flex items-center justify-center flex-shrink-0 ${
                          isTop 
                            ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-700/30'
                            : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200/60 dark:border-amber-700/30'
                        }`}>
                          <span className={`text-[9px] font-bold ${
                            isTop ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'
                          }`}>{customer.id}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 truncate">{customer.name}</p>
                            {customer.declineDate && (
                              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30">
                                <TrendingDown className="w-2.5 h-2.5 text-red-600 dark:text-red-400" />
                                <span className="text-[9px] font-medium text-red-700 dark:text-red-300 whitespace-nowrap">
                                  {customer.declineService ? `${customer.declineService} drop since ${customer.declineDate}` : `Since ${customer.declineDate}`}
                                </span>
                              </div>
                            )}
                          </div>
                          <p className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 truncate mt-0.5">
                            {selectedVertical === 'All Verticals' ? `${customer.segment} • ${customer.vertical}` : customer.segment}
                          </p>
                          <p className="text-[9px] text-gray-400 dark:text-gray-500 truncate mt-0.5">{customer.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {productFilter === 'all' && (
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">{totalRevenue.toFixed(0)}</p>
                            <PercentageBadge current={totalRevenue} previous={previousTotalRevenue} formatValue={(val) => val.toFixed(0)} currentTarget={currentTotalTarget} previousTarget={previousTotalTarget} formatTarget={(val) => val.toFixed(0)} />
                          </div>
                        )}
                        <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                      </div>
                    </div>

                    {/* Revenue Breakdown */}
                    {productFilter === 'all' ? (
                      <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-gray-200/50 dark:border-gray-700/50">
                        <div className="text-center group/mobile relative">
                          <div className="flex items-center justify-center gap-0.5 mb-1">
                            <Smartphone className="w-2.5 h-2.5 text-purple-600 dark:text-purple-400" />
                            <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400">Mobile</p>
                            {(() => {
                              const trend = getServiceTrend('Mobile', customer.mobile);
                              if (trend) return (
                                <div className="cursor-help relative">
                                  {trend.type === 'drop' ? (
                                    <TrendingDown className="w-2.5 h-2.5 text-red-500" />
                                  ) : (
                                    <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
                                  )}
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/mobile:block z-50">
                                    <div className="bg-slate-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-xl border border-slate-700/50">
                                      <p className="font-semibold text-[10px] mb-0.5">{trend.type === 'drop' ? 'Drop' : 'Growth'}</p>
                                      <div className="flex items-center gap-1 text-[10px] opacity-90">
                                        <span>{trend.type === 'drop' ? '-' : '+'}{trend.diff.toFixed(0)}</span>
                                      </div>
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                          <p className="text-[10px] sm:text-xs font-bold text-purple-700 dark:text-purple-300 truncate">{customer.mobile.toFixed(0)}</p>
                        </div>
                        <div className="text-center group/fixed relative">
                          <div className="flex items-center justify-center gap-0.5 mb-1">
                            <Wifi className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
                            <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400">Fixed</p>
                            {(() => {
                              const trend = getServiceTrend('Fixed', customer.fixed);
                              if (trend) return (
                                <div className="cursor-help relative">
                                  {trend.type === 'drop' ? (
                                    <TrendingDown className="w-2.5 h-2.5 text-red-500" />
                                  ) : (
                                    <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
                                  )}
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/fixed:block z-50">
                                    <div className="bg-slate-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-xl border border-slate-700/50">
                                      <p className="font-semibold text-[10px] mb-0.5">{trend.type === 'drop' ? 'Drop' : 'Growth'}</p>
                                      <div className="flex items-center gap-1 text-[10px] opacity-90">
                                        <span>{trend.type === 'drop' ? '-' : '+'}{trend.diff.toFixed(0)}</span>
                                      </div>
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                          <p className="text-[10px] sm:text-xs font-bold text-blue-700 dark:text-blue-300 truncate">{customer.fixed.toFixed(0)}</p>
                        </div>
                        <div className="text-center group/ict relative">
                          <div className="flex items-center justify-center gap-0.5 mb-1">
                            <Server className="w-2.5 h-2.5 text-indigo-600 dark:text-indigo-400" />
                            <p className="text-[9px] sm:text-[10px] font-medium text-gray-500 dark:text-gray-400">ICT</p>
                            {(() => {
                              const trend = getServiceTrend('ICT', customer.ict);
                              if (trend) return (
                                <div className="cursor-help relative">
                                  {trend.type === 'drop' ? (
                                    <TrendingDown className="w-2.5 h-2.5 text-red-500" />
                                  ) : (
                                    <TrendingUp className="w-2.5 h-2.5 text-emerald-500" />
                                  )}
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/ict:block z-50">
                                    <div className="bg-slate-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-xl border border-slate-700/50">
                                      <p className="font-semibold text-[10px] mb-0.5">{trend.type === 'drop' ? 'Drop' : 'Growth'}</p>
                                      <div className="flex items-center gap-1 text-[10px] opacity-90">
                                        <span>{trend.type === 'drop' ? '-' : '+'}{trend.diff.toFixed(0)}</span>
                                      </div>
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                          <p className="text-[10px] sm:text-xs font-bold text-indigo-700 dark:text-indigo-300 truncate">{customer.ict.toFixed(0)}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="pt-2.5 border-t border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {productFilter === 'Mobile' && <Smartphone className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />}
                            {productFilter === 'Fixed' && <Wifi className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                            {productFilter === 'ICT' && <Server className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                            {productFilter === 'SMS' && <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">{productFilter}</p>
                          </div>
                          <div className="text-right group/mobile-filter-mobile relative">
                            <div className="flex items-center justify-end gap-1">
                              <p className={`text-xs sm:text-sm font-bold ${
                                productFilter === 'Mobile' ? 'text-purple-700 dark:text-purple-300' :
                                productFilter === 'Fixed' ? 'text-blue-700 dark:text-blue-300' :
                                productFilter === 'ICT' ? 'text-indigo-700 dark:text-indigo-300' :
                                'text-emerald-700 dark:text-emerald-300'
                              }`}>
                                {(productFilter === 'Mobile' ? customer.mobile : productFilter === 'Fixed' ? customer.fixed : productFilter === 'ICT' ? customer.ict : customer.sms).toFixed(0)}
                              </p>
                              {(() => {
                                const serviceName = productFilter as 'Mobile' | 'Fixed' | 'ICT' | 'SMS';
                                const serviceValue = productFilter === 'Mobile' ? customer.mobile : productFilter === 'Fixed' ? customer.fixed : productFilter === 'ICT' ? customer.ict : customer.sms;
                                const trend = getServiceTrend(serviceName, serviceValue);
                                if (trend) return (
                                  <div className="cursor-help relative">
                                    {trend.type === 'drop' ? (
                                      <TrendingDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
                                    ) : (
                                      <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500" />
                                    )}
                                    <div className="absolute bottom-full right-0 mb-2 hidden group-hover/mobile-filter-mobile:block z-50">
                                      <div className="bg-slate-900 text-white text-xs rounded py-1.5 px-2.5 whitespace-nowrap shadow-xl border border-slate-700/50">
                                        <p className="font-semibold text-xs mb-0.5">{trend.type === 'drop' ? `${productFilter} Revenue Drop` : `${productFilter} Growth Driver`}</p>
                                        <div className="flex items-center gap-2 text-xs opacity-90">
                                          <span>{trend.type === 'drop' ? '-' : '+'}{trend.diff.toFixed(0)}</span>
                                          <span className={trend.type === 'drop' ? 'text-red-300' : 'text-emerald-300'}>
                                            ({trend.percent.toFixed(1)}%)
                                          </span>
                                        </div>
                                        <p className="text-slate-400 text-[10px] mt-1 pt-1 border-t border-slate-700/50">Since {trend.date}</p>
                                        <div className="absolute top-full right-4 border-4 border-transparent border-t-slate-900"></div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                            <PercentageBadge 
                              current={productFilter === 'Mobile' ? customer.mobile : productFilter === 'Fixed' ? customer.fixed : productFilter === 'ICT' ? customer.ict : customer.sms} 
                              previous={productFilter === 'Mobile' ? previousMobile : productFilter === 'Fixed' ? previousFixed : productFilter === 'ICT' ? previousICT : customer.sms / (1 + customer.trend / 100)} 
                              formatValue={(val) => val.toFixed(0)} 
                              currentTarget={productFilter === 'Mobile' ? currentMobileTarget : productFilter === 'Fixed' ? currentFixedTarget : productFilter === 'ICT' ? currentICTTarget : customer.sms * customer.targetMultiplier} 
                              previousTarget={productFilter === 'Mobile' ? previousMobileTarget : productFilter === 'Fixed' ? previousFixedTarget : productFilter === 'ICT' ? previousICTTarget : (customer.sms / (1 + customer.trend / 100)) * customer.targetMultiplier} 
                              formatTarget={(val) => val.toFixed(0)} 
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
              );
            })}
                </div>
              </span>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p className="text-sm">
                  {searchQuery ? `No customers found matching "${searchQuery}"` : `No customers found`}
                </p>
              </div>
            );
          })()}
        </div>
        
        {/* Premium Pagination */}
        {(() => {
          const customers = randomizedBase;
          let filteredCustomers = customers;
          
          if (searchQuery.trim()) {
            filteredCustomers = filteredCustomers.filter(c => 
              c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
              c.segment.toLowerCase().includes(searchQuery.toLowerCase()) ||
              c.vertical.toLowerCase().includes(searchQuery.toLowerCase()) ||
              c.company.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }
          
          if (productFilter !== 'all') {
            filteredCustomers = filteredCustomers.filter(c => {
              const productRevenue = productFilter === 'Mobile' ? c.mobile : 
                                    productFilter === 'Fixed' ? c.fixed : 
                                    productFilter === 'ICT' ? c.ict : c.sms;
              return productRevenue > 0;
            });
          }
          
          const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
          
          return totalPages > 1 ? (
            <div className="flex-shrink-0 pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Results Info - Hidden on mobile */}
                <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-300">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length}
                </div>
                
                {/* Pagination Controls */}
                <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                    className={`hidden sm:flex min-h-[44px] sm:min-h-0 w-9 h-9 p-0 rounded-lg ${
                      currentPage === 1 
                        ? 'opacity-40 cursor-not-allowed' 
                        : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500/40'
                    }`}
                  >
                    <span>««</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className={`min-h-[44px] sm:min-h-0 w-9 h-9 p-0 rounded-lg ${
                      currentPage === 1 
                        ? 'opacity-40 cursor-not-allowed' 
                        : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500/40'
                    }`}
                  >
                    <span>‹</span>
                  </Button>
                  
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-gray-900/40 rounded-lg border border-gray-200/50 dark:border-gray-600/30">
                    <span className="text-sm text-gray-700 dark:text-gray-200">Page</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{currentPage}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">of {totalPages}</span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className={`min-h-[44px] sm:min-h-0 w-9 h-9 p-0 rounded-lg ${
                      currentPage === totalPages 
                        ? 'opacity-40 cursor-not-allowed' 
                        : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500/40'
                    }`}
                  >
                    <span>›</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    className={`hidden sm:flex min-h-[44px] sm:min-h-0 w-9 h-9 p-0 rounded-lg ${
                      currentPage === totalPages 
                        ? 'opacity-40 cursor-not-allowed' 
                        : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-500/40'
                    }`}
                  >
                    <span>»»</span>
                  </Button>
                </div>
              </div>
            </div>
          ) : null;
        })()}
      </motion.div>
    </div>
  );
}