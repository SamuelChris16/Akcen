import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { RadarDataPoint } from '../types';

interface PhysicsRadarChartProps {
  data: RadarDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-akcen-gray p-3 rounded-xl shadow-soft">
        <p className="text-akcen-text font-serif font-bold text-sm mb-1">{label}</p>
        <p className="text-akcen-blue text-xs">
          Your Score: <span className="font-bold">{payload[0].value}</span>
        </p>
        <p className="text-akcen-muted text-xs">
          Avg Peer Score: <span className="font-bold">{payload[1].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const PhysicsRadarChart: React.FC<PhysicsRadarChartProps> = ({ data }) => {
  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#E6E7EB" />
          <PolarAngleAxis 
            dataKey="topic" 
            tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'Inter', fontWeight: 500 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="My Score"
            dataKey="A"
            stroke="#5D86BC"
            strokeWidth={2}
            fill="#5D86BC"
            fillOpacity={0.3}
          />
          <Radar
            name="Class Avg"
            dataKey="B"
            stroke="#9CCB8E"
            strokeWidth={2}
            fill="#9CCB8E"
            fillOpacity={0.1}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PhysicsRadarChart;