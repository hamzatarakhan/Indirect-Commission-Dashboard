import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function ScoreDistribution() {
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  const data = [
    { name: 'Revenue', value: 50, color: '#2563eb' },
    { name: 'Strategic', value: 30, color: '#10b981' },
    { name: 'CX', value: 20, color: '#8b5cf6' }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          Score Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={(_, index) => setHoveredSlice(data[index].name)}
                onMouseLeave={() => setHoveredSlice(null)}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    style={{
                      filter: hoveredSlice === entry.name ? 'brightness(1.1)' : 'brightness(1)',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-3">
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-2 rounded transition-all duration-200 cursor-pointer ${
                hoveredSlice === item.name ? 'bg-gray-50' : ''
              }`}
              onMouseEnter={() => setHoveredSlice(item.name)}
              onMouseLeave={() => setHoveredSlice(null)}
            >
              <div 
                className="w-8 h-2 rounded"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium text-gray-900 text-sm tracking-wide">
                {item.name}({item.value}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}