// This is a temporary file to create the new card design
// Will be merged back into ServiceMatrix.tsx

{/* NEW SIMPLIFIED CARD DESIGN */}
<div 
  className={`grid gap-4 ${
    comparisonMode
      ? 'grid-cols-1'
      : selectedServiceTab === 'All' 
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
        : 'grid-cols-1'
  }`} 
  style={{ overflow: 'visible' }}
>
  {services
    .filter(service => selectedServiceTab === 'All' || service.name === selectedServiceTab)
    .map((service, index) => {
    const colors = getColorClasses(service.color);
    const Icon = service.icon;
    const isHovered = hoveredSegment === index;
    
    // Determine performance status color
    const getPerformanceColor = (score: number) => {
      if (score >= 90) return {
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        text: 'text-emerald-700 dark:text-emerald-400',
        label: 'Excellent',
        barColor: '#34d399',
        ringColor: 'ring-emerald-500/20'
      };
      if (score >= 75) return {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-700 dark:text-blue-400',
        label: 'Good',
        barColor: '#60a5fa',
        ringColor: 'ring-blue-500/20'
      };
      if (score >= 60) return {
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        text: 'text-amber-700 dark:text-amber-400',
        label: 'Fair',
        barColor: '#fbbf24',
        ringColor: 'ring-amber-500/20'
      };
      return {
        bg: 'bg-red-50 dark:bg-red-900/20',
        text: 'text-red-700 dark:text-red-400',
        label: 'Needs Attention',
        barColor: '#f87171',
        ringColor: 'ring-red-500/20'
      };
    };
    
    const performanceStatus = getPerformanceColor(service.performance);
    
    // Calculate YoY data
    const currentYearTotal = service.monthlyData.reduce((sum, bar) => sum + bar.revenue, 0);
    const previousYearTotal = service.monthlyData.reduce((sum, bar) => sum + bar.compRevenue, 0);
    const yoyChange = previousYearTotal > 0 ? (((currentYearTotal - previousYearTotal) / previousYearTotal) * 100) : 0;
    const isYoyPositive = yoyChange >= 0;
    
    return (
      <motion.div
        key={service.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        onMouseEnter={() => setHoveredSegment(index)}
        onMouseLeave={() => setHoveredSegment(null)}
        className={`group relative rounded-xl border transition-all duration-300 cursor-pointer bg-white dark:bg-[#07112F] hover:shadow-lg ${
          isHovered 
            ? `border-2 ${colors.border}` 
            : 'border-gray-200 dark:border-gray-700/50'
        }`}
        onClick={() => {
          console.log(`Navigate to ${service.name} details page`);
        }}
      >
        {/* Card Content */}
        <div className="p-5 space-y-4">
          {/* Header: Icon + Name + Performance Score */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className={`p-2.5 rounded-xl transition-all duration-300 ${colors.iconBg}`}>
                <Icon className={`w-5 h-5 ${colors.icon}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {service.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Service Revenue
                </p>
              </div>
            </div>
            
            {/* Performance Score Circle */}
            <div className="flex flex-col items-end">
              <div className={`flex items-center justify-center w-14 h-14 rounded-full ${performanceStatus.bg} ring-4 ${performanceStatus.ringColor}`}>
                <span className={`font-bold text-lg ${performanceStatus.text}`}>
                  {service.performance}
                </span>
              </div>
              <span className={`text-[10px] font-medium mt-1 ${performanceStatus.text}`}>
                {performanceStatus.label}
              </span>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Current Revenue */}
            <div className="space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Revenue
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(service.value)}
              </p>
            </div>
            
            {/* Target */}
            <div className="space-y-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Target
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(service.target)}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400">Target Achievement</span>
              <span className={`font-semibold ${performanceStatus.text}`}>
                {service.performance}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-800/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: performanceStatus.barColor }}
                initial={{ width: 0 }}
                animate={{ width: `${service.performance}%` }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Sparkline Chart */}
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                10-Month Trend
              </span>
              <div className="flex items-center gap-1">
                {isYoyPositive ? (
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                <span className={`text-xs font-semibold ${isYoyPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                  {isYoyPositive ? '+' : ''}{yoyChange.toFixed(1)}%
                </span>
              </div>
            </div>
            
            {/* Simple Sparkline using Recharts */}
            <div className="h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={service.monthlyData}>
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke={performanceStatus.barColor}
                    strokeWidth={2}
                    dot={false}
                    animationDuration={800}
                    animationBegin={index * 100}
                  />
                  {comparisonMode && (
                    <Line 
                      type="monotone" 
                      dataKey="compRevenue" 
                      stroke="#93C5FD"
                      strokeWidth={2}
                      strokeDasharray="3 3"
                      dot={false}
                      animationDuration={800}
                      animationBegin={index * 100}
                    />
                  )}
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px',
                      padding: '8px'
                    }}
                    formatter={(value: any) => [`${value.toFixed(2)}M`, '']}
                    labelFormatter={(label, payload) => {
                      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
                      return months[label as number] || '';
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Comparison Mode: YoY Metrics */}
          {comparisonMode && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="pt-3 border-t border-gray-200 dark:border-gray-700/50"
            >
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">
                    {year}
                  </p>
                  <p className="text-sm font-bold text-orange-600 dark:text-orange-400">
                    {currentYearTotal.toFixed(1)}M
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">
                    {comparisonYear}
                  </p>
                  <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {previousYearTotal.toFixed(1)}M
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">
                    Change
                  </p>
                  <p className={`text-sm font-bold ${isYoyPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {isYoyPositive ? '+' : ''}{yoyChange.toFixed(1)}%
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* View Details Indicator */}
          <div className="flex items-center justify-center gap-2 pt-2 text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <span>View Details</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </motion.div>
    );
  })}
</div>
