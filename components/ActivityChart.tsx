import React from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, CartesianGrid } from 'recharts';
import { ChartDataPoint } from '../types';

interface ActivityChartProps {
  data: ChartDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-akcen-gray p-4 rounded-xl shadow-soft">
        <p className="text-akcen-muted text-xs mb-1 font-serif italic">{label}</p>
        <p className="text-akcen-blue font-bold text-lg font-serif">
          {payload[0].value} <span className="text-akcen-text text-xs font-sans font-normal">Worksheets</span>
        </p>
      </div>
    );
  }
  return null;
};

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  return (
    <div className="w-full h-72 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorWorksheets" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5D86BC" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#5D86BC" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E7EB" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'Inter' }} 
            dy={15}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'Inter' }} 
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#5D86BC', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Area 
            type="monotone" 
            dataKey="worksheets" 
            stroke="#5D86BC" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorWorksheets)" 
            activeDot={{ r: 6, strokeWidth: 3, stroke: '#fff', fill: '#5D86BC' }}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;