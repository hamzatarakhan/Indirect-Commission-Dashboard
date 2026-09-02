import React, { useState } from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function PerformanceTrends() {
  const [selectedPeriod, setSelectedPeriod] = useState('Q3');

  const data = [
    { name: 'Week 1', Achievement: 75, Target: 90 },
    { name: 'Week 2', Achievement: 82, Target: 90 },
    { name: 'Week 3', Achievement: 88, Target: 90 },
    { name: 'Week 4', Achievement: 90, Target: 90 },
  ];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          Performance Trends - Q3
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-2 bg-blue-600 rounded" />
              <span className="text-sm font-medium text-gray-700">Achievement</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-2 bg-green-500 rounded" />
              <span className="text-sm font-medium text-gray-700">Target</span>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#f9fafb', 
                    border: '1px solid #d1d5db',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Achievement" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Target" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}