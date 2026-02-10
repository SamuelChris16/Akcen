
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  target?: string | number; // New optional prop for " / 14"
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, target, icon, trend, trendUp }) => {
  return (
    <div className="flex flex-col justify-between p-5 bg-white rounded-3xl border border-akcen-gray shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
      <div className="flex justify-between items-start mb-3">
        <div className="p-2.5 rounded-xl bg-akcen-white border border-akcen-gray text-akcen-blue group-hover:bg-akcen-blue group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        {trend && (
          <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold font-sans ${
            trendUp 
              ? 'bg-akcen-green/20 text-green-700' 
              : 'bg-red-100 text-red-600'
          }`}>
            {trend}
          </div>
        )}
      </div>
      <div>
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-3xl font-serif font-bold text-akcen-text">{value}</span>
          {target && (
            <span className="text-lg font-serif font-medium text-akcen-muted">
               / {target}
            </span>
          )}
        </div>
        <span className="text-xs font-medium text-akcen-muted uppercase tracking-wider font-sans">{title}</span>
      </div>
    </div>
  );
};

export default StatsCard;
