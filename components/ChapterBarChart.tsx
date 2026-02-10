import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChapterDataPoint } from '../types';

interface ChapterBarChartProps {
  data: ChapterDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-akcen-gray p-3 rounded-xl shadow-soft">
        <p className="text-akcen-text font-serif font-bold text-sm mb-1">{label}</p>
        <p className="text-akcen-blue text-xs">
          Avg Score: <span className="font-bold">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const ChapterBarChart: React.FC<ChapterBarChartProps> = ({ data }) => {
  return (
    <div className="w-full h-full min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E6E7EB" />
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false}
            tickLine={false}
            width={90}
            tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'Inter', fontWeight: 500 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{fill: '#F8F9FB'}} />
          <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.score > 85 ? '#9CCB8E' : entry.score > 70 ? '#5D86BC' : '#FFEDC0'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChapterBarChart;