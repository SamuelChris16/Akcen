
import React from 'react';
import { 
  Home, 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  MessageSquare, 
  BarChart2, 
  Settings, 
  LogOut,
  GraduationCap,
  ClipboardCheck,
  Briefcase,
  CalendarDays,
  Calendar
} from 'lucide-react';
import { RANK_SYSTEM, CURRENT_USER_STATS } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  onNavigate: (tab: string) => void;
  isMentor?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, onNavigate, isMentor = false }) => {
  
  const studentMenuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'dashboard', icon: LayoutDashboard, label: 'My Dashboard' },
    { id: 'mentoring', icon: Calendar, label: 'Mentoring' }, // NEW ITEM
    { id: 'worksheets', icon: BookOpen, label: 'Worksheets' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics' },
  ];

  const mentorMenuItems = [
    { id: 'mentor-dashboard', icon: LayoutDashboard, label: 'Overview' },
    { id: 'grading', icon: ClipboardCheck, label: 'Grading Queue' },
    { id: 'students', icon: Users, label: 'My Students' },
    { id: 'curriculum', icon: CalendarDays, label: 'My Schedule' }, 
    { id: 'messages', icon: MessageSquare, label: 'Mentoring' },
  ];

  const menuItems = isMentor ? mentorMenuItems : studentMenuItems;
  
  // Settings is always at bottom
  const settingsItem = { id: 'settings', icon: Settings, label: 'Settings' };

  // Determine Rank
  const currentRankIndex = RANK_SYSTEM.findIndex((tier, i) => {
    const nextTier = RANK_SYSTEM[i + 1];
    if (!nextTier) return true; 
    return (
        CURRENT_USER_STATS.points >= tier.minPoints && 
        CURRENT_USER_STATS.points < nextTier.minPoints
    );
  });
  const currentTier = RANK_SYSTEM[currentRankIndex] || RANK_SYSTEM[0];

  return (
    <div className={`fixed inset-y-0 left-0 z-40 w-72 bg-white text-akcen-text border-r border-akcen-gray transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0 shadow-2xl lg:shadow-none flex flex-col`}>
      
      {/* Logo Area */}
      <div className="h-24 flex items-center px-8 flex-shrink-0">
        <div className="flex items-center gap-3">
           <div className={`p-2.5 rounded-xl ${isMentor ? 'bg-akcen-yellow text-akcen-text' : 'bg-akcen-blue text-white'} shadow-sm`}>
               <GraduationCap size={24} strokeWidth={2.5} />
           </div>
           <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-akcen-text font-serif leading-none">Akcen.</span>
              <span className="text-[10px] font-bold text-akcen-muted uppercase tracking-[0.2em] mt-0.5">Learning</span>
           </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 custom-scrollbar">
        <p className="px-4 text-[10px] font-bold text-akcen-muted/60 uppercase tracking-widest mb-3 font-sans">
          {isMentor ? 'Faculty Workspace' : 'Student Learning'}
        </p>
        
        {menuItems.map((item) => {
           const Icon = item.icon;
           const isActive = activeTab === item.id;
           return (
             <button
               key={item.id}
               onClick={() => onNavigate(item.id)}
               className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group relative
                 ${isActive
                   ? isMentor ? 'bg-akcen-yellow text-akcen-text shadow-lg shadow-akcen-yellow/20' : 'bg-akcen-blue text-white shadow-lg shadow-akcen-blue/20'
                   : 'text-akcen-muted hover:bg-akcen-gray/50 hover:text-akcen-text'
                 }`}
             >
               <Icon 
                  size={18} 
                  className={`transition-colors ${isActive ? (isMentor ? 'text-akcen-text' : 'text-white') : 'text-akcen-muted group-hover:text-akcen-text'}`} 
               />
               <span className={`font-sans tracking-wide ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.label}</span>
               
               {/* Active Indicator Dot */}
               {isActive && (
                 <div className={`absolute right-4 w-1.5 h-1.5 rounded-full ${isMentor ? 'bg-akcen-text' : 'bg-white'} opacity-50`}></div>
               )}
             </button>
           );
        })}

        <div className="my-6 border-t border-akcen-gray/50 mx-4"></div>
        
        <button
           onClick={() => onNavigate(settingsItem.id)}
           className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group
             ${activeTab === settingsItem.id
               ? 'bg-akcen-gray text-akcen-text' 
               : 'text-akcen-muted hover:bg-akcen-gray/50 hover:text-akcen-text'
             }`}
         >
           <Settings size={18} className="text-akcen-muted group-hover:text-akcen-text" />
           <span className="font-sans">Settings</span>
         </button>

      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-akcen-gray/50 bg-akcen-white/30">
        <div className="bg-white rounded-2xl p-3 border border-akcen-gray shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
           <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={isMentor ? "https://picsum.photos/40/40?random=20" : "https://picsum.photos/40/40?random=10"} 
                  alt="User" 
                  className="w-10 h-10 rounded-full object-cover border border-akcen-gray" 
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                 <p className="text-sm font-bold text-akcen-text truncate font-serif">{isMentor ? "Dr. Emily Chen" : "Alex Morgan"}</p>
                 <p className="text-[10px] text-akcen-muted truncate font-sans font-medium">
                   {isMentor ? "Physics Lead" : currentTier.title}
                 </p>
              </div>
              <LogOut size={16} className="text-akcen-muted opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
