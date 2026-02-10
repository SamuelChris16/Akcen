
import React from 'react';
import { ChevronRight, Lock, BookOpen, Star, FileText } from 'lucide-react';
import { RANK_SYSTEM, CURRENT_USER_STATS } from '../constants';

const RankCard: React.FC = () => {
  // Logic to determine current rank based solely on pages submitted
  const currentRankIndex = RANK_SYSTEM.findIndex((tier, i) => {
    const nextTier = RANK_SYSTEM[i + 1];
    if (!nextTier) return true; // Max rank
    return (
        CURRENT_USER_STATS.pagesCompleted >= tier.minPages && 
        CURRENT_USER_STATS.pagesCompleted < nextTier.minPages
    );
  });

  const currentTier = RANK_SYSTEM[currentRankIndex] || RANK_SYSTEM[0];
  const nextTier = RANK_SYSTEM[currentRankIndex + 1];

  // Calculate Progress % for Pages
  const pagesRange = nextTier ? nextTier.minPages - currentTier.minPages : 1;
  const pagesProgress = nextTier
    ? Math.min(100, Math.max(0, ((CURRENT_USER_STATS.pagesCompleted - currentTier.minPages) / pagesRange) * 100))
    : 100;

  const Icon = currentTier.icon;
  const NextIcon = nextTier ? nextTier.icon : currentTier.icon;

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-[2rem] border border-akcen-gray shadow-card relative overflow-hidden group hover:shadow-soft transition-all h-full">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 p-4 opacity-5">
         <Icon size={120} />
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between">
          
          {/* Header: Current Rank */}
          <div>
              <div className="flex items-center justify-between mb-2">
                 <p className="text-xs text-akcen-muted font-bold uppercase tracking-wider">Current Academic Level</p>
                 <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border bg-white ${currentTier.color.replace('text', 'border').replace('500', '200').replace('600', '200')} ${currentTier.color}`}>
                    Lvl {currentTier.id}
                 </div>
              </div>
              
              <div className="flex items-center gap-3 mb-1">
                 <div className={`p-2 rounded-xl bg-white shadow-sm ${currentTier.color}`}>
                    <Icon size={24} />
                 </div>
                 <div>
                    <h3 className="text-xl font-serif font-bold text-akcen-text leading-tight">{currentTier.title}</h3>
                    <p className="text-xs text-akcen-blue font-bold">{currentTier.subtitle}</p>
                 </div>
              </div>
          </div>

          {/* Progress Bars Section */}
          <div className="mt-4 space-y-4">
             {nextTier ? (
                 <>
                    {/* Worksheet Requirement */}
                    <div>
                        <div className="flex justify-between text-[10px] font-bold text-akcen-muted mb-1.5 uppercase tracking-wide">
                            <span className="flex items-center gap-1"><FileText size={10} /> Pages Submitted</span>
                            <span className="text-akcen-text">{CURRENT_USER_STATS.pagesCompleted} / {nextTier.minPages}</span>
                        </div>
                        <div className="w-full h-2 bg-akcen-gray rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-akcen-blue rounded-full transition-all duration-1000"
                                style={{ width: `${pagesProgress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Next Rank Teaser */}
                    <div className="flex items-center justify-between pt-2 border-t border-akcen-gray/50 mt-2">
                        <div className="flex items-center gap-2 opacity-60">
                            <Lock size={12} className="text-akcen-muted" />
                            <span className="text-xs font-serif text-akcen-muted">Next: {nextTier.title}</span>
                        </div>
                        <div className="p-1 rounded-full bg-white text-akcen-muted">
                            <NextIcon size={14} />
                        </div>
                    </div>
                 </>
             ) : (
                 <div className="py-4 text-center">
                    <p className="text-sm font-bold text-akcen-blue">Maximum Level Reached!</p>
                    <p className="text-xs text-akcen-muted">You are a legend.</p>
                 </div>
             )}
          </div>

      </div>
    </div>
  );
};

export default RankCard;
