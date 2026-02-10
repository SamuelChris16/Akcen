
import React, { useState } from 'react';
import { 
  Play, 
  Flame, 
  Target, 
  Clock, 
  BrainCircuit, 
  BookOpen,
  Menu,
  Bell,
  ArrowRight,
  CheckCircle2,
  FileText,
  Trophy,
  Crown,
  ChevronRight,
  TrendingUp,
  Sword,
  Shield,
  Zap,
  Star
} from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';
import RankCard from './RankCard';
import { MOCK_NOTIFICATIONS, DAILY_QUESTS, CURRENT_USER_STATS, RANK_SYSTEM } from '../constants';

interface HomeViewProps {
  onToggleSidebar: () => void;
  onNavigate: (tab: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onToggleSidebar, onNavigate }) => {
  const [leaderboardTab, setLeaderboardTab] = useState<'Daily' | 'Weekly'>('Weekly');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  
  // Local state for Quests to demonstrate interactivity
  const [quests, setQuests] = useState(DAILY_QUESTS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkRead = (id: string) => {
     setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleQuestAction = (id: number) => {
      setQuests(prev => prev.map(q => {
          if (q.id === id) {
              if (q.completed && !q.claimed) {
                  return { ...q, claimed: true };
              } else if (!q.completed) {
                  // Simulate progress/completion
                  return { ...q, current: q.target, completed: true };
              }
          }
          return q;
      }));
  };

  // Mock Data for specific tabs
  const LEADERBOARD_DATA = {
      'Daily': [
          { rank: 1, name: 'Jessica W.', pages: 12, avatar: 'https://picsum.photos/40/40?random=50' },
          { rank: 2, name: 'Alex Morgan', pages: 8, avatar: 'https://picsum.photos/40/40?random=10', isMe: true },
          { rank: 3, name: 'Sarah L.', pages: 5, avatar: 'https://picsum.photos/40/40?random=60' },
      ],
      'Weekly': [
          { rank: 1, name: 'David K.', pages: 45, avatar: 'https://picsum.photos/40/40?random=51' },
          { rank: 2, name: 'Jessica W.', pages: 38, avatar: 'https://picsum.photos/40/40?random=50' },
          { rank: 3, name: 'Alex Morgan', pages: 22, avatar: 'https://picsum.photos/40/40?random=10', isMe: true },
      ]
  };

  const currentLeaderboard = LEADERBOARD_DATA[leaderboardTab];

  // Determine Rank Logic
  const currentRankIndex = RANK_SYSTEM.findIndex((tier, i) => {
    const nextTier = RANK_SYSTEM[i + 1];
    if (!nextTier) return true; 
    return (
        CURRENT_USER_STATS.pagesCompleted >= tier.minPages && 
        CURRENT_USER_STATS.pagesCompleted < nextTier.minPages
    );
  });
  const nextTier = RANK_SYSTEM[currentRankIndex + 1];
  const maxPagesForLevel = nextTier ? nextTier.minPages : CURRENT_USER_STATS.pagesCompleted;
  const currentLevelProgress = nextTier 
    ? (CURRENT_USER_STATS.pagesCompleted / nextTier.minPages) * 100 
    : 100;

  return (
    <div className="flex flex-col h-full bg-akcen-white">
      {/* Header - PLAYER CARD STYLE */}
      <header className="h-28 flex items-center justify-between px-8 sticky top-0 z-20 transition-all duration-300 bg-akcen-white/90 backdrop-blur-md border-b border-white/50 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={onToggleSidebar}
              className="lg:hidden p-2 text-akcen-muted hover:text-akcen-blue -ml-2"
            >
              <Menu size={24} />
            </button>
            
            {/* Player Stats Block */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <img src="https://picsum.photos/200/200?random=10" className="w-14 h-14 rounded-xl border-2 border-akcen-text object-cover shadow-md" alt="Avatar" />
                    <div className="absolute -bottom-2 -right-2 bg-akcen-text text-white text-[10px] font-bold px-1.5 py-0.5 rounded border border-white shadow-sm">
                        Lvl {currentRankIndex + 1}
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-lg font-serif font-bold text-akcen-text leading-none">Alex Morgan</h1>
                    
                    {/* Bars */}
                    <div className="flex flex-col gap-1 w-44">
                         {/* Module Progress Bar */}
                         <div className="flex items-center justify-between text-[9px] font-bold text-akcen-muted leading-none mb-0.5">
                            <span className="text-akcen-blue uppercase tracking-wide">Pages Submitted</span>
                            <span>{CURRENT_USER_STATS.pagesCompleted} / {maxPagesForLevel}</span>
                         </div>
                         <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                             <div className="h-full bg-akcen-blue rounded-full transition-all duration-500" style={{ width: `${currentLevelProgress}%` }}></div>
                         </div>
                    </div>
                </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
                 <div className="flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg border border-orange-100">
                     <Flame size={12} className="fill-orange-600" /> 5 Day Streak
                 </div>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2.5 transition-colors rounded-xl border ${showNotifications ? 'text-akcen-blue bg-blue-50 border-blue-100' : 'text-akcen-muted hover:text-akcen-blue bg-white border-akcen-gray'}`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>

              {/* Popup Dropdown */}
              {showNotifications && (
                  <NotificationDropdown 
                      notifications={notifications}
                      onNavigate={onNavigate}
                      onClose={() => setShowNotifications(false)}
                      onMarkRead={handleMarkRead}
                  />
              )}
            </div>

          </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar space-y-8">
          
          {/* 1. HERO: CURRENT QUEST */}
          <section className="relative w-full bg-slate-900 rounded-[2.5rem] p-8 text-white overflow-hidden shadow-card group cursor-pointer transition-transform hover:scale-[1.005] duration-500 border border-slate-700">
             <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"></div>
             <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>

             <div className="relative z-10 flex flex-col md:flex-row justify-between items-end h-full gap-6">
                <div className="flex-1 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/20 backdrop-blur-md border border-yellow-500/50 rounded-lg text-xs font-bold text-yellow-400 uppercase tracking-wider shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                        <BookOpen size={12} />
                        Current Focus
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-white drop-shadow-md">The Laws of Motion</h2>
                        <p className="text-slate-300 font-sans text-sm md:text-base max-w-lg leading-relaxed">
                            Objective: Complete <span className="text-white font-bold">Problem 6 (Acceleration)</span> to finish the set.
                            <br/><span className="text-yellow-400 font-bold text-xs mt-2 inline-block">Reward: Chapter Completion Badge</span>
                        </p>
                    </div>
                    {/* Progress Bar inside Hero */}
                    <div className="max-w-md pt-2">
                        <div className="flex justify-between text-xs font-bold text-slate-400 mb-1.5">
                            <span>Stage 3/5</span>
                            <span>85% Complete</span>
                        </div>
                        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[85%] rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)]"></div>
                        </div>
                    </div>
                </div>

                <button 
                  onClick={() => onNavigate('worksheets')}
                  className="flex-shrink-0 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-sm hover:bg-cyan-50 hover:text-cyan-900 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-3 border-b-4 border-slate-300 active:border-b-0 active:translate-y-1"
                >
                    Resume Learning
                    <ArrowRight size={18} />
                </button>
             </div>
          </section>

          {/* 2. DAILY QUESTS & STATS */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left: Daily Quests (8 Cols) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                 <h3 className="font-serif font-bold text-akcen-text text-xl flex items-center gap-2">
                    <Target size={20} className="text-akcen-yellow fill-akcen-yellow" /> Daily Goals
                 </h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quests.map(quest => (
                        <div 
                            key={quest.id} 
                            onClick={() => !quest.completed && handleQuestAction(quest.id)}
                            className={`p-4 rounded-2xl border flex flex-col justify-between h-36 relative overflow-hidden group transition-all cursor-pointer
                            ${quest.completed 
                                ? 'bg-gradient-to-br from-green-50 to-white border-green-200' 
                                : 'bg-white border-akcen-gray hover:border-akcen-blue hover:shadow-md'
                            }
                        `}>
                            {quest.completed && <div className="absolute top-0 right-0 p-2 animate-in zoom-in"><CheckCircle2 className="text-akcen-green" size={18}/></div>}
                            
                            <div>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-colors ${quest.completed ? 'bg-green-100 text-green-700' : 'bg-akcen-white text-akcen-text group-hover:bg-blue-50 group-hover:text-akcen-blue'}`}>
                                    <quest.icon size={16} />
                                </div>
                                <h4 className="font-bold text-sm text-akcen-text leading-tight">{quest.title}</h4>
                                <p className="text-[10px] text-akcen-muted mt-1">{quest.desc}</p>
                            </div>

                            <div>
                                {quest.completed ? (
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleQuestAction(quest.id); }}
                                        disabled={quest.claimed}
                                        className={`w-full py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all
                                        ${quest.claimed 
                                            ? 'bg-gray-100 text-gray-400 cursor-default' 
                                            : 'bg-akcen-green text-white hover:bg-green-600 shadow-sm animate-pulse'
                                        }`}
                                    >
                                        {quest.claimed ? 'Done' : 'Claim Reward'}
                                    </button>
                                ) : (
                                    <div className="w-full h-1.5 bg-akcen-gray rounded-full overflow-hidden mt-2">
                                        <div className="h-full bg-akcen-blue rounded-full transition-all duration-700" style={{ width: `${(quest.current/quest.target)*100}%` }}></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                 </div>

                 {/* Up Next / Loot Preview */}
                 <div className="mt-4">
                     <h3 className="font-serif font-bold text-akcen-text text-xl mb-4 flex items-center gap-2">
                        <Star size={20} className="text-purple-500 fill-purple-500"/> Milestone Loot
                     </h3>
                     <div 
                      onClick={() => onNavigate('worksheets')}
                      className="bg-white p-5 rounded-[2rem] border border-akcen-gray shadow-card hover:shadow-soft transition-all cursor-pointer group flex items-center gap-5"
                    >
                        <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-purple-600 border border-purple-100 group-hover:scale-105 transition-transform">
                            <Shield size={32} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full uppercase">Locked Set</span>
                            </div>
                            <h4 className="font-serif font-bold text-lg text-akcen-text group-hover:text-purple-700 transition-colors">Complex Equations Badge</h4>
                            <p className="text-xs text-akcen-muted mt-1 max-w-sm">Requires completion of "Isolating Variables" questline.</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-akcen-white flex items-center justify-center text-akcen-muted/50 border border-transparent group-hover:bg-purple-50 group-hover:text-purple-600 transition-all">
                            <ArrowRight size={20} />
                        </div>
                    </div>
                 </div>
              </div>

              {/* Right: Rank & Stats (4 Cols) */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                   <RankCard />
                   
                   {/* Mini Stat - Accuracy */}
                   <div className="bg-white p-5 rounded-[2rem] border border-akcen-gray shadow-card relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                       <div className="flex justify-between items-center mb-2">
                           <h4 className="font-bold text-sm text-akcen-text">Precision Rating</h4>
                           <BrainCircuit size={16} className="text-akcen-green" />
                       </div>
                       <div className="flex items-end gap-2">
                           <span className="text-3xl font-serif font-bold text-akcen-text">92%</span>
                           <span className="text-xs text-akcen-green font-bold mb-1.5">+2%</span>
                       </div>
                       <div className="w-full h-1 bg-akcen-gray mt-3 rounded-full overflow-hidden">
                           <div className="h-full bg-akcen-green w-[92%]"></div>
                       </div>
                   </div>
              </div>
          </section>

          {/* 3. LEADERBOARD WIDGET */}
          <section className="bg-white rounded-[2rem] border border-akcen-gray shadow-card p-6 flex flex-col relative overflow-hidden">
               <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-3">
                       <div className="p-2 bg-akcen-yellow rounded-xl text-orange-700 shadow-sm">
                           <Trophy size={20} />
                       </div>
                       <div>
                           <h3 className="font-serif font-bold text-akcen-text text-lg">Class Rankings</h3>
                           <p className="text-[10px] text-akcen-muted font-bold uppercase">{leaderboardTab} Pages</p>
                       </div>
                   </div>
                   <div className="flex bg-akcen-white p-1 rounded-lg">
                       <button 
                        onClick={() => setLeaderboardTab('Daily')}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${leaderboardTab === 'Daily' ? 'bg-white shadow-sm text-akcen-text' : 'text-akcen-muted hover:text-akcen-text'}`}>
                        Daily
                       </button>
                       <button 
                        onClick={() => setLeaderboardTab('Weekly')}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${leaderboardTab === 'Weekly' ? 'bg-white shadow-sm text-akcen-text' : 'text-akcen-muted hover:text-akcen-text'}`}>
                        Weekly
                       </button>
                   </div>
               </div>

               <div className="space-y-4">
                   {currentLeaderboard.map((user, index) => (
                       <div key={index} className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${user.isMe ? 'bg-blue-50/50 border-akcen-blue/30 shadow-sm scale-[1.01]' : 'bg-white border-transparent hover:bg-akcen-white'}`}>
                           <div className="flex items-center gap-3">
                               <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold 
                                   ${index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                                     index === 1 ? 'bg-gray-100 text-gray-600' : 
                                     index === 2 ? 'bg-orange-50 text-orange-700' : 'bg-transparent text-akcen-muted'}`}>
                                   {index === 0 ? <Crown size={14} /> : user.rank}
                               </div>
                               <img src={user.avatar} className="w-10 h-10 rounded-full border border-white shadow-sm" alt={user.name} />
                               <div>
                                   <p className="text-sm font-bold text-akcen-text font-serif">{user.name}</p>
                                   <p className="text-[10px] text-akcen-muted font-bold uppercase">{user.isMe ? 'You' : 'Classmate'}</p>
                               </div>
                           </div>
                           <div className="text-right">
                               <p className="text-sm font-bold text-akcen-blue">{user.pages}</p>
                               <p className="text-[10px] text-akcen-muted uppercase">Pages</p>
                           </div>
                       </div>
                   ))}
               </div>
               
               <button onClick={() => onNavigate('community')} className="w-full mt-6 py-3 rounded-xl border border-akcen-gray text-xs font-bold text-akcen-muted hover:text-akcen-text hover:bg-akcen-white transition-all">
                   View Full List
               </button>
          </section>
      </div>
    </div>
  );
};

export default HomeView;
