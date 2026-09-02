import React, { useState } from 'react';
import { Building2, TrendingUp, TrendingDown, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { motion } from 'motion/react';

interface CompanyData {
  company: string;
  revenue: string;
  quarterChange: number;
  ict: string;
  mobile: string;
  fixed: string;
  trend: 'up' | 'down';
}

export function CompanyPerformance() {
  const [quarterFilter, setQuarterFilter] = useState('Q3');
  const [performanceFilter, setPerformanceFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('revenue');

  // Mock company data
  const companies: CompanyData[] = [
    {
      company: 'Oman Oil Company',
      revenue: '2.8M OMR',
      quarterChange: 12.5,
      ict: '980K',
      mobile: '1.2M',
      fixed: '620K',
      trend: 'up'
    },
    {
      company: 'Ministry of Finance',
      revenue: '2.1M OMR',
      quarterChange: -3.2,
      ict: '1.5M',
      mobile: '400K',
      fixed: '200K',
      trend: 'down'
    },
    {
      company: 'Bank Muscat',
      revenue: '1.9M OMR',
      quarterChange: 8.7,
      ict: '850K',
      mobile: '720K',
      fixed: '330K',
      trend: 'up'
    },
    {
      company: 'Omantel Corporate',
      revenue: '1.6M OMR',
      quarterChange: 15.3,
      ict: '420K',
      mobile: '890K',
      fixed: '290K',
      trend: 'up'
    },
    {
      company: 'PDO (Petroleum)',
      revenue: '1.4M OMR',
      quarterChange: -2.1,
      ict: '720K',
      mobile: '480K',
      fixed: '200K',
      trend: 'down'
    },
    {
      company: 'Ministry of Health',
      revenue: '1.2M OMR',
      quarterChange: 5.4,
      ict: '680K',
      mobile: '350K',
      fixed: '170K',
      trend: 'up'
    }
  ];

  // Filter and sort data
  const filteredCompanies = companies
    .filter(c => {
      if (performanceFilter === 'growth' && c.quarterChange <= 0) return false;
      if (performanceFilter === 'decline' && c.quarterChange >= 0) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'revenue') {
        return parseFloat(b.revenue.replace(/[^0-9.]/g, '')) - parseFloat(a.revenue.replace(/[^0-9.]/g, ''));
      } else {
        return b.quarterChange - a.quarterChange;
      }
    });

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col dark:border-gray-700/40">
      <CardHeader className="pb-3 px-4 pt-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
              <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span>Company Performance</span>
          </CardTitle>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Quarter Selector */}
            <Select value={quarterFilter} onValueChange={setQuarterFilter}>
              <SelectTrigger className="w-[90px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Q1">Q1</SelectItem>
                <SelectItem value="Q2">Q2</SelectItem>
                <SelectItem value="Q3">Q3</SelectItem>
                <SelectItem value="Q4">Q4</SelectItem>
              </SelectContent>
            </Select>

            {/* Performance Filter */}
            <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
              <SelectTrigger className="w-[110px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="growth">Growth</SelectItem>
                <SelectItem value="decline">Decline</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[120px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="growth">Growth %</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 flex-1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700/50">
                <th className="text-left py-2 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400">Company</th>
                <th className="text-right py-2 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400">Revenue</th>
                <th className="text-right py-2 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400">Δ%</th>
                <th className="text-right py-2 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400">ICT</th>
                <th className="text-right py-2 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400">Mobile</th>
                <th className="text-right py-2 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400">Fixed</th>
                <th className="text-center py-2 px-2 text-xs font-semibold text-gray-600 dark:text-gray-400">Trend</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company, index) => (
                <motion.tr
                  key={company.company}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-3 px-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{company.company}</span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{company.revenue}</span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className={`text-sm font-semibold ${
                      company.quarterChange >= 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {company.quarterChange >= 0 ? '+' : ''}{company.quarterChange}%
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{company.ict}</span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{company.mobile}</span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{company.fixed}</span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    {company.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 inline" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400 inline" />
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700/50">
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Showing {filteredCompanies.length} companies</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                {filteredCompanies.filter(c => c.quarterChange >= 0).length} Growth
              </span>
              <span className="flex items-center gap-1">
                <TrendingDown className="w-3 h-3 text-red-600" />
                {filteredCompanies.filter(c => c.quarterChange < 0).length} Decline
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
