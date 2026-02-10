
import React, { useState } from 'react';
import { 
  Bell, 
  Menu, 
  Trophy, 
  Flame, 
  Zap, 
  Crown,
  Users,
  Star,
  TrendingUp,
  GraduationCap,
  History,
  Lock,
  CheckCircle2,
  MessageCircle,
  Calendar,
  Clock,
  Sun,
  ChevronDown,
  ChevronUp,
  Loader2
} from 'lucide-react';
import { RANK_SYSTEM, CURRENT_USER_STATS } from '../constants';

// --- MOCK DATA ---

const ACADEMIC_LEVELS = RANK_SYSTEM; // Use consolidated rank system

const CURRENT_USER = {
  name: 'Alex Morgan',
  level: 3,
  pagesDone: CURRENT_USER_STATS.pagesCompleted,
  cohortRank: 4,
};

// Updated Leaderboard Data with Daily, Weekly, Total stats based on PAGES
const COHORT_LEADERBOARD = [
  { 
    rank: 1, name: 'Jessica W.', 
    dailyPages: 12,
    weeklyPages: 35,
    totalPages: 88, 
    avatar: 'https://picsum.photos/40/40?random=50', status: 'on_fire' 
  },
  { 
    rank: 2, name: 'Alex Morgan', 
    dailyPages: 8, 
    weeklyPages: 22, 
    totalPages: 64, 
    avatar: 'https://picsum.photos/40/40?random=10', isMe: true, status: 'climbing' 
  },
  { 
    rank: 3, name: 'David Kim', 
    dailyPages: 0,
    weeklyPages: 15, 
    totalPages: 72, 
    avatar: 'https://picsum.photos/40/40?random=51', status: 'stable' 
  },
  { 
    rank: 4, name: 'Sarah Lee', 
    dailyPages: 4, 
    weeklyPages: 10, 
    totalPages: 55, 
    avatar: 'https://picsum.photos/40/40?random=60', status: 'falling' 
  },
  { 
    rank: 5, name: 'Ryan G.', 
    dailyPages: 0, 
    weeklyPages: 5, 
    totalPages: 30, 
    avatar: 'https://picsum.photos/40/40?random=52', status: 'stable' 
  },
  { 
    rank: 6, name: 'Emily B.', 
    dailyPages: 0, 
    weeklyPages: 0, 
    totalPages: 28, 
    avatar: 'https://picsum.photos/40/40?random=62', status: 'stable' 
  },
  // Extra data for expansion
  { rank: 7, name: 'Chris P.', dailyPages: 0, weeklyPages: 2, totalPages: 25, avatar: 'https://picsum.photos/40/40?random=65', status: 'stable' },
  { rank: 8, name: 'Tom H.', dailyPages: 2, weeklyPages: 4, totalPages: 22, avatar: 'https://picsum.photos/40/40?random=66', status: 'falling' },
  { rank: 9, name: 'Zendaya C.', dailyPages: 5, weeklyPages: 12, totalPages: 20, avatar: 'https://picsum.photos/40/40?random=67', status: 'climbing' },
  { rank: 10, name: 'Hugh J.', dailyPages: 0, weeklyPages: 0, totalPages: 15, avatar: 'https://picsum.photos/40/40?random=68', status: 'stable' },
];

const SENIOR_ACTIVITY = [
  { 
    id: 1, 
    seniorName: 'Dr. Emily Chen', 
    seniorRank: 'Professor', 
    action: 'Rapid Drill', 
    target: 'Kinematics Basics', 
    time: '1m 20s',
    message: 'Even experts practice the basics. Can you beat my time?',
    avatar: 'https://picsum.photos/40/40?random=20'
  },
  { 
    id: 2, 
    seniorName: 'Mark Z.', 
    seniorRank: 'Research Fellow', 
    action: 'Reviewing', 
    target: 'Newton\'s Laws', 
    time: 'Just now',
    message: 'Refreshing core concepts for the advanced mechanics exam.',
    avatar: 'https://picsum.photos/40/40?random=99'
  }
];

const MILESTONES = [
  { id: 1, title: "First Steps", desc: "Submit 5 Pages", completed: true },
  { id: 2, title: "Consistency", desc: "7 Day Streak", completed: true },
  { id: 3, title: "Mastery", desc: "Score 100% on a Chapter", completed: true },
  { id: 4, title: "The Grinder", desc: "Submit 100 Pages", completed: false, progress: 64, total: 100 },
  { id: 5, title: "Peer Mentor", desc: "Help 10 Students", completed: false, progress: 2, total: 10, locked: true },
];

interface CommunityViewProps {
  onToggleSidebar?: () => void;
  onNavigate: (tab: string) => void;
}

const CommunityView: React.FC<CommunityViewProps> = ({ onToggleSidebar, onNavigate }) => {
  const [leaderboardType, setLeaderboardType] = useState<'daily' | 'weekly' | 'allTime'>('daily');
  const [showFullList, setShowFullList] = useState(false);
  const [challengeStarted, setChallengeStarted] = useState(false);

  // Determine current level based on pages
  const currentLevelIndex = ACADEMIC_LEVELS.findIndex((l, i) => {
      const next = ACADEMIC_LEVELS[i+1];
      if(!next) return true;
      return CURRENT_USER.pagesDone >= l.minPages && CURRENT_USER.pagesDone < next.minPages;
  });
  
  const currentLevelData = ACADEMIC_LEVELS[currentLevelIndex] || ACADEMIC_LEVELS[0];
  const nextLevelData = ACADEMIC_LEVELS[currentLevelIndex + 1];
  
  // Calculate progress based on PAGES
  const pageRange = nextLevelData 
    ? nextLevelData.minPages - currentLevelData.minPages 
    : 1;
  const pageProgressInLevel = CURRENT_USER.pagesDone - currentLevelData.minPages;
  const progressPercent = nextLevelData 
    ? Math.min(100, Math.max(0, (pageProgressInLevel / pageRange) * 100))
    : 100;

  // Sort logic based on type (Pages count is priority for Daily/Weekly)
  const sortedList = [...COHORT_LEADERBOARD].sort((a, b) => {
    if (leaderboardType === 'daily') return b.dailyPages - a.dailyPages;
    if (leaderboardType === 'weekly') return b.weeklyPages - a.weeklyPages;
    return b.totalPages - a.totalPages;
  });

  const displayLeaderboard = showFullList ? sortedList : sortedList.slice(0, 6);

  const handleChallenge = () => {
      setChallengeStarted(true);
      setTimeout(() => {
          setChallengeStarted(false);
          onNavigate('worksheets');
      }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-akcen-white">
      {/* Header */}
      <header className="h-24 flex items-center justify-between px-8 sticky top-0 z-20 transition-all duration-300 bg-akcen-white/80 backdrop-blur-md border-b border-akcen-gray">
          <div className="flex items-center gap-4">
            {onToggleSidebar && (
              <button onClick={onToggleSidebar} className="lg:hidden p-2 text-akcen-muted hover:text-akcen-blue -ml-2">
                <Menu size={24} />
              </button>
            )}
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif font-bold text-akcen-text tracking-tight">Academic Standing</h1>
              <p className="text-xs text-akcen-muted font-sans font-medium">Track your academic journey & ranking.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-white border border-akcen-gray px-3 py-1.5 rounded-full shadow-sm">
                <GraduationCap size={16} className="text-akcen-blue" />
                <span className="text-xs font-bold text-akcen-text">{currentLevelData?.title}</span>
            </div>
            <button className="relative p-2 text-akcen-muted hover:text-akcen-blue transition-colors">
              <Bell size={22} />
            </button>
          </div>
      </header>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-8 custom-scrollbar space-y-8">
         
         {/* 1. HERO: CAREER STATUS */}
         <div className="bg-gradient-to-br from-slate-800 to-akcen-text rounded-[2.5rem] p-8 text-white shadow-card relative overflow-hidden">
             {/* Background Effects */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-akcen-blue/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>

             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                 
                 {/* Left: Avatar & Rank */}
                 <div className="lg:col-span-4 flex items-center gap-6">
                     <div className="relative">
                         <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg">
                             <img src="https://picsum.photos/200/200?random=10" className="w-full h-full rounded-full border-4 border-slate-800 object-cover" alt="Profile" />
                         </div>
                         <div className="absolute -bottom-2 -right-2 bg-akcen-blue text-white w-8 h-8 flex items-center justify-center rounded-full border-4 border-slate-800 font-bold text-xs shadow-sm">
                            {currentLevelIndex + 1}
                         </div>
                     </div>
                     <div>
                         <div className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1">Current Status</div>
                         <h2 className="text-3xl font-serif font-bold text-white leading-none">{currentLevelData?.title}</h2>
                         <div className="flex items-center gap-2 mt-2 bg-white/10 w-fit px-3 py-1 rounded-full border border-white/10">
                            <Users size={12} className="text-akcen-yellow" />
                            <span className="text-xs font-medium text-white">Equivalent to: <span className="font-bold text-akcen-yellow">{currentLevelData?.subtitle}</span></span>
                         </div>
                     </div>
                 </div>

                 {/* Middle: Progress Bar */}
                 <div className="lg:col-span-5">
                     <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-bold text-blue-200">Level Progress</span>
                        <span className="text-xs font-bold text-white">{Math.round(progressPercent)}% to {nextLevelData?.title || 'Max Level'}</span>
                     </div>
                     <div className="w-full h-4 bg-black/30 rounded-full overflow-hidden backdrop-blur-sm border border-white/10 relative">
                         <div className="h-full bg-gradient-to-r from-akcen-blue to-cyan-400 rounded-full shadow-[0_0_15px_rgba(74,111,165,0.6)] transition-all duration-1000 relative" style={{ width: `${progressPercent}%` }}>
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 blur-[1px]"></div>
                         </div>
                     </div>
                     <p className="text-[10px] text-blue-300 mt-2 text-right">
                        {nextLevelData ? `${nextLevelData.minPages - CURRENT_USER.pagesDone} more pages needed for promotion` : 'Max level reached'}
                     </p>
                 </div>

                 {/* Right: Stats */}
                 <div className="lg:col-span-3 flex justify-between lg:justify-end gap-8 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-8">
                     <div>
                        <div className="text-2xl font-bold font-serif">{CURRENT_USER.pagesDone}</div>
                        <div className="text-[10px] text-blue-200 uppercase font-bold">Pages Done</div>
                     </div>
                     <div>
                        <div className="text-2xl font-bold font-serif text-akcen-yellow">#{CURRENT_USER.cohortRank}</div>
                        <div className="text-[10px] text-blue-200 uppercase font-bold">Class Rank</div>
                     </div>
                 </div>
             </div>
         </div>

         {/* 2. MILESTONE MAP */}
         <div>
             <div className="flex items-center justify-between px-2 mb-4">
                <h3 className="font-serif font-bold text-akcen-text text-lg">Academic Milestones</h3>
                <span className="text-xs text-akcen-muted font-medium">Scroll to see future</span>
             </div>
             
             <div className="relative">
                 <div className="absolute top-1/2 left-0 w-full h-1 bg-akcen-gray -translate-y-1/2 z-0 hidden md:block"></div>
                 <div className="flex gap-4 overflow-x-auto pb-6 pt-2 custom-scrollbar px-2 relative z-10">
                    {MILESTONES.map((milestone, index) => (
                        <div 
                          key={milestone.id}
                          className={`flex-shrink-0 w-48 p-4 rounded-2xl border transition-all relative group
                            ${milestone.completed 
                                ? 'bg-white border-akcen-green shadow-sm' 
                                : milestone.locked 
                                  ? 'bg-akcen-white border-akcen-gray opacity-70' 
                                  : 'bg-white border-akcen-blue shadow-md scale-105'
                            }
                          `}
                        >
                            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-20
                                ${milestone.completed ? 'bg-akcen-green text-white' : milestone.locked ? 'bg-akcen-gray text-akcen-muted' : 'bg-akcen-blue text-white'}
                            `}>
                                {milestone.completed ? <CheckCircle2 size={16} /> : milestone.locked ? <Lock size={14} /> : <Star size={16} />}
                            </div>

                            <div className="mt-4 text-center">
                                <h4 className={`font-bold text-sm mb-1 ${milestone.completed ? 'text-akcen-green' : milestone.locked ? 'text-akcen-muted' : 'text-akcen-blue'}`}>
                                    {milestone.title}
                                </h4>
                                <p className="text-[10px] text-akcen-muted leading-tight">{milestone.desc}</p>
                            </div>
                        </div>
                    ))}
                 </div>
             </div>
         </div>

         {/* 3. SPLIT SECTION: LEADERBOARD & SENIOR WATCH */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             
             {/* LEFT: LEADERBOARD */}
             <div className="lg:col-span-7 bg-white rounded-[2rem] border border-akcen-gray shadow-card p-6">
                 
                 {/* Header & Toggle */}
                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-akcen-yellow rounded-xl text-orange-800 shadow-sm">
                            <Trophy size={20} />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-akcen-text text-lg leading-tight">Physics 101 League</h3>
                            <p className="text-[10px] text-akcen-muted font-bold uppercase mt-0.5">Cohort of 32 Students</p>
                        </div>
                    </div>
                    
                    {/* Toggle */}
                    <div className="flex bg-akcen-white p-1 rounded-xl border border-akcen-gray self-end sm:self-auto overflow-hidden">
                        <button 
                          onClick={() => setLeaderboardType('daily')}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${leaderboardType === 'daily' ? 'bg-white text-akcen-text shadow-sm' : 'text-akcen-muted hover:text-akcen-text'}`}
                        >
                          Today
                        </button>
                        <button 
                          onClick={() => setLeaderboardType('weekly')}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${leaderboardType === 'weekly' ? 'bg-white text-akcen-text shadow-sm' : 'text-akcen-muted hover:text-akcen-text'}`}
                        >
                          Weekly
                        </button>
                        <button 
                          onClick={() => setLeaderboardType('allTime')}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${leaderboardType === 'allTime' ? 'bg-white text-akcen-text shadow-sm' : 'text-akcen-muted hover:text-akcen-text'}`}
                        >
                          All Time
                        </button>
                    </div>
                 </div>

                 {/* Context Banners */}
                 {leaderboardType === 'daily' && (
                     <div className="mb-4 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-100 rounded-xl p-3 flex items-center justify-between animate-in fade-in">
                        <div className="flex items-center gap-2 text-orange-700">
                            <Sun size={14} />
                            <span className="text-xs font-bold">Daily Activity</span>
                        </div>
                        <div className="flex items-center gap-2 text-orange-600 bg-white px-2 py-1 rounded-lg border border-orange-100 shadow-sm">
                            <Clock size={12} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Resets at midnight</span>
                        </div>
                     </div>
                 )}

                 {leaderboardType === 'weekly' && (
                     <div className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-3 flex items-center justify-between animate-in fade-in">
                        <div className="flex items-center gap-2 text-akcen-blue">
                            <Calendar size={14} />
                            <span className="text-xs font-bold">Week 12 Sprint</span>
                        </div>
                        <div className="flex items-center gap-2 text-orange-600 bg-white px-2 py-1 rounded-lg border border-orange-100 shadow-sm">
                            <Clock size={12} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Resets in 2d 14h</span>
                        </div>
                     </div>
                 )}

                 {/* List */}
                 <div className="space-y-3">
                    {displayLeaderboard.map((user, index) => {
                        // Logic to determine what metric to show
                        let primaryMetric = `${user.totalPages}`;
                        let metricLabel = 'Pages';
                        let metricColor = 'text-akcen-blue';

                        if (leaderboardType === 'daily') {
                            primaryMetric = `${user.dailyPages}`;
                            metricLabel = 'Pages Today';
                            metricColor = user.dailyPages > 0 ? 'text-akcen-green' : 'text-akcen-muted';
                        } else if (leaderboardType === 'weekly') {
                            primaryMetric = `${user.weeklyPages}`;
                            metricLabel = 'Pages/Week';
                            metricColor = user.weeklyPages > 0 ? 'text-akcen-blue' : 'text-akcen-muted';
                        }

                        return (
                            <div 
                            key={index} 
                            className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-300 group
                                ${user.isMe 
                                    ? 'bg-akcen-text text-white border-akcen-text shadow-lg scale-[1.02]' 
                                    : 'bg-white border-transparent hover:border-akcen-gray hover:bg-akcen-white/50'
                                }
                            `}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-8 h-8 flex items-center justify-center rounded-xl font-bold text-sm
                                        ${user.isMe ? 'bg-white/20 text-white' : 'bg-akcen-white text-akcen-muted'}
                                    `}>
                                        {index + 1}
                                    </div>
                                    <div className="relative">
                                        <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt={user.name} />
                                        {index <= 2 && (
                                            <div className="absolute -top-2 -left-1">
                                                <Crown size={14} className="fill-akcen-yellow text-akcen-yellow drop-shadow-sm" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className={`text-sm font-bold font-serif ${user.isMe ? 'text-white' : 'text-akcen-text'}`}>{user.name}</p>
                                        <div className="flex items-center gap-2 text-[10px] opacity-80">
                                            <span className={user.isMe ? 'text-blue-200' : 'text-akcen-muted'}>
                                                Level {user.rank + 1}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="text-right">
                                    <p className={`text-sm font-bold font-mono ${user.isMe ? 'text-akcen-yellow' : metricColor}`}>
                                        {primaryMetric}
                                    </p>
                                    <p className={`text-[10px] font-bold uppercase ${user.isMe ? 'text-blue-200' : 'text-akcen-muted'}`}>{metricLabel}</p>
                                </div>
                            </div>
                        );
                    })}
                 </div>
                 
                 <button 
                    onClick={() => setShowFullList(!showFullList)}
                    className="w-full mt-4 py-3 text-xs font-bold text-akcen-muted border border-dashed border-akcen-gray rounded-xl hover:bg-akcen-white transition-all flex items-center justify-center gap-2"
                 >
                    {showFullList ? 'Collapse List' : 'View Full Cohort (32)'}
                    {showFullList ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                 </button>
             </div>

             {/* RIGHT: SENIOR ACTIVITY */}
             <div className="lg:col-span-5 flex flex-col gap-6">
                 
                 <div className="bg-gradient-to-b from-white to-purple-50 rounded-[2rem] border border-purple-100 shadow-card p-6 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-xl -mr-10 -mt-10"></div>
                     <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl shadow-sm">
                            <History size={20} />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-akcen-text text-lg leading-tight">Faculty Insights</h3>
                            <p className="text-[10px] text-purple-600 font-bold uppercase mt-0.5">Mentor Activity Feed</p>
                        </div>
                     </div>

                     <div className="space-y-4 relative z-10">
                        {SENIOR_ACTIVITY.map(activity => (
                            <div key={activity.id} className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-purple-100 shadow-sm hover:scale-[1.02] transition-transform">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <img src={activity.avatar} className="w-6 h-6 rounded-full" alt="senior" />
                                        <span className="text-xs font-bold text-akcen-text">{activity.seniorName}</span>
                                        <span className="text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded border border-purple-200 uppercase font-bold">{activity.seniorRank}</span>
                                    </div>
                                    <span className="text-[10px] text-akcen-muted font-mono">{activity.time}</span>
                                </div>
                                <p className="text-sm font-serif font-bold text-akcen-text mb-1">
                                    {activity.action}: <span className="text-akcen-blue">{activity.target}</span>
                                </p>
                                <div className="bg-purple-50 p-2 rounded-lg border border-purple-100 mt-2 flex gap-2">
                                    <MessageCircle size={14} className="text-purple-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-purple-800 italic leading-snug">"{activity.message}"</p>
                                </div>
                            </div>
                        ))}
                     </div>
                 </div>

                 <div className="bg-white rounded-[2rem] border border-akcen-gray shadow-card p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Zap size={18} className="text-akcen-yellow fill-akcen-yellow" />
                        <h4 className="font-bold text-sm text-akcen-text">Time Challenge</h4>
                    </div>
                    <p className="text-xs text-akcen-muted mb-4">Dr. Emily Chen finished "Kinematics 1D" in 1m 20s. Can you get within 10% of her time?</p>
                    <button 
                        onClick={handleChallenge}
                        disabled={challengeStarted}
                        className="w-full py-2 bg-akcen-text text-white rounded-xl text-xs font-bold shadow-lg hover:bg-akcen-text/90 flex items-center justify-center gap-2"
                    >
                        {challengeStarted ? <><Loader2 size={14} className="animate-spin"/> Starting...</> : 'Attempt Challenge'}
                    </button>
                 </div>

             </div>
         </div>
      </div>
    </div>
  );
};

export default CommunityView;
