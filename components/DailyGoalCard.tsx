
import React from 'react';
import { Target, CheckCircle2, Flame } from 'lucide-react';

interface DailyGoalCardProps {
  current: number;
  target: number;
}

const DailyGoalCard: React.FC<DailyGoalCardProps> = ({ current, target }) => {
  const percentage = Math.min((current / target) * 100, 100);
  const isCompleted = current >= target;

  return (
    <div className="bg-gradient-to-br from-akcen-blue to-blue-600 rounded-[2rem] p-6 text-white shadow-card relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-transform group-hover:scale-110 duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Target size={16} className="text-akcen-yellow" />
                </div>
                <h3 className="font-serif font-bold text-lg text-white">Daily Target</h3>
            </div>
            <p className="text-blue-100 text-xs font-sans font-medium">Keep your momentum going!</p>
          </div>
          
           {/* Streak Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-full border border-white/10">
             <Flame size={12} className="text-orange-300 fill-orange-300" />
             <span className="text-xs font-bold text-white">5 Day Streak</span>
          </div>
        </div>

        <div className="mt-6 mb-4">
            <div className="flex justify-between items-end mb-2">
                <span className="text-4xl font-serif font-bold tracking-tight">{current} <span className="text-lg text-blue-200 font-medium">/ {target}</span></span>
                <span className="text-xs font-bold text-akcen-yellow uppercase tracking-wide">{Math.round(percentage)}% Done</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden p-0.5">
                <div 
                    className="h-full bg-gradient-to-r from-akcen-yellow to-orange-300 rounded-full shadow-sm relative transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-between">
           <span className="text-xs text-blue-100 font-medium flex items-center gap-1">
             {isCompleted ? (
                <>
                    <CheckCircle2 size={14} className="text-akcen-green" /> All tasks completed!
                </>
             ) : (
                `${target - current} worksheets remaining`
             )}
           </span>
           <button className="text-[10px] font-bold bg-white text-akcen-blue px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
             View Tasks
           </button>
        </div>
      </div>
    </div>
  );
};

export default DailyGoalCard;
