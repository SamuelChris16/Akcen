
import React from 'react';
import { 
  Bell, 
  Atom, 
  Search,
  MessageCircle,
  Download,
  Info,
  Menu
} from 'lucide-react';
import ActivityChart from './ActivityChart';
import PhysicsRadarChart from './PhysicsRadarChart';
import ChapterBarChart from './ChapterBarChart';
import WorksheetList from './WorksheetList';
import { CHART_DATA, PHYSICS_RADAR_DATA, CHAPTER_PERFORMANCE_DATA, MOCK_EVENTS, MOCK_MENTORS } from '../constants';

interface AnalyticsViewProps {
  onToggleSidebar: () => void;
  onNavigate: (tab: string) => void;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onToggleSidebar, onNavigate }) => {
  return (
    <div className="flex flex-col h-full">
        {/* Header */}
        <header className="h-24 flex items-center justify-between px-8 sticky top-0 z-20 transition-all duration-300 bg-akcen-white/80 backdrop-blur-md border-b border-akcen-gray">
          
          <div className="relative flex items-center gap-6 w-full max-w-2xl">
            <button 
              onClick={onToggleSidebar}
              className="lg:hidden p-2 text-akcen-muted hover:text-akcen-blue"
            >
              <Menu size={24} />
            </button>
            
            <div className="hidden md:flex flex-col">
              <div className="flex items-center gap-3">
                 <h1 className="text-2xl font-serif font-bold text-akcen-text tracking-tight">Physics Insights</h1>
                 <span className="bg-akcen-white border border-akcen-gray text-akcen-muted text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Info size={10} /> Learn more
                 </span>
              </div>
              <p className="text-xs text-akcen-muted font-sans font-medium">Analyze chapter performance and topic mastery across your worksheets</p>
            </div>
          </div>

          <div className="relative flex items-center gap-6">
            <button className="hidden sm:flex text-akcen-muted hover:text-akcen-blue text-xs font-semibold items-center gap-2 transition-all">
              <Download size={14} />
              <span className="font-sans">Export report</span>
            </button>
            
            <div className="flex items-center gap-4 pl-4 border-l border-akcen-gray h-8">
              <button 
                onClick={() => onNavigate('notifications')}
                className="relative p-2 text-akcen-muted hover:text-akcen-blue transition-colors"
              >
                <Bell size={22} />
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-akcen-white"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
          
          {/* Top Section: Radar Charts Area */}
          <div className="bg-white rounded-[2rem] p-8 border border-akcen-gray shadow-card">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-akcen-blue/10 rounded-lg text-akcen-blue">
                   <Atom size={20} />
                </div>
                <h2 className="text-lg font-serif font-bold text-akcen-text">Topic Mastery Analysis</h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 1. Main Mastery Radar */}
                <div className="col-span-1 md:col-span-1 flex flex-col items-center">
                   <h3 className="text-akcen-blue text-sm font-bold font-sans mb-2">Core Concepts</h3>
                   <div className="text-xs text-akcen-muted mb-4">Mechanics & Energy</div>
                   <div className="w-full h-64">
                      <PhysicsRadarChart data={PHYSICS_RADAR_DATA.slice(0, 3)} />
                   </div>
                   <div className="flex gap-4 mt-2">
                      <div className="flex items-center gap-1 text-[10px] text-akcen-muted uppercase font-bold">
                         <div className="w-2 h-2 rounded-full bg-akcen-blue opacity-50"></div> You
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-akcen-muted uppercase font-bold">
                         <div className="w-2 h-2 rounded-full bg-akcen-green opacity-50"></div> Class
                      </div>
                   </div>
                </div>

                {/* 2. Secondary Mastery Radar */}
                 <div className="col-span-1 md:col-span-1 flex flex-col items-center border-l border-r border-akcen-gray/50 px-4">
                   <h3 className="text-akcen-blue text-sm font-bold font-sans mb-2">Applied Physics</h3>
                   <div className="text-xs text-akcen-muted mb-4">Waves, Optics & Modern</div>
                   <div className="w-full h-64">
                      <PhysicsRadarChart data={PHYSICS_RADAR_DATA.slice(3, 6)} />
                   </div>
                   <div className="flex justify-between w-full px-8 mt-4">
                      <div className="text-center">
                         <div className="text-xl font-bold text-akcen-text font-serif">85%</div>
                         <div className="text-[10px] text-akcen-muted uppercase">Avg Score</div>
                      </div>
                      <div className="text-center">
                         <div className="text-xl font-bold text-akcen-text font-serif">12</div>
                         <div className="text-[10px] text-akcen-muted uppercase">Topics</div>
                      </div>
                   </div>
                </div>

                {/* 3. Text Stats / Summary */}
                <div className="col-span-1 md:col-span-1 flex flex-col justify-center pl-4 space-y-6">
                   <div>
                      <h4 className="text-sm font-bold text-akcen-text font-serif">Strongest Area</h4>
                      <p className="text-akcen-green text-lg font-bold">Kinematics</p>
                      <p className="text-xs text-akcen-muted mt-1">You are performing 15% better than class average in 2D Motion.</p>
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-akcen-text font-serif">Needs Focus</h4>
                      <p className="text-orange-400 text-lg font-bold">Optics</p>
                      <p className="text-xs text-akcen-muted mt-1">Review reflection and refraction principles.</p>
                   </div>
                   <button className="w-full py-2.5 rounded-xl border border-akcen-gray text-akcen-text text-xs font-bold font-sans hover:border-akcen-blue hover:text-akcen-blue transition-all">
                      View Detailed Breakdown
                   </button>
                </div>
             </div>
          </div>

          {/* Bottom Section: Split Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             
             {/* Bottom Left: Study Consistency (Line/Area Chart) */}
             <div className="bg-white rounded-[2rem] p-6 border border-akcen-gray shadow-card">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-lg font-serif font-bold text-akcen-text flex items-center gap-2">
                      <div className="w-1 h-5 bg-akcen-blue rounded-full"></div>
                      Study Consistency
                   </h3>
                   <div className="flex gap-2">
                      <span className="text-xs font-bold px-2 py-1 rounded bg-akcen-white text-akcen-text border border-akcen-gray">Weekly</span>
                   </div>
                </div>
                <div className="h-64">
                   <ActivityChart data={CHART_DATA} />
                </div>
             </div>

             {/* Bottom Right: Chapter Performance (Bar Chart) */}
             <div className="bg-white rounded-[2rem] p-6 border border-akcen-gray shadow-card">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-lg font-serif font-bold text-akcen-text flex items-center gap-2">
                      <div className="w-1 h-5 bg-akcen-green rounded-full"></div>
                      Chapter Performance
                   </h3>
                </div>
                <div className="h-64">
                   <ChapterBarChart data={CHAPTER_PERFORMANCE_DATA} />
                </div>
             </div>

          </div>

          {/* Bottom Grid: Tutors & Recent */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2 flex flex-col space-y-4">
               <h3 className="font-serif font-bold text-akcen-text text-lg px-2">Previous Chapters Worksheets</h3>
               <WorksheetList events={MOCK_EVENTS.filter(e => e.subject === 'Science' || e.subject === 'Physics')} />
             </div>
             
             <div className="bg-white rounded-[2rem] border border-akcen-gray p-6 flex flex-col shadow-card">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="font-serif font-bold text-akcen-text text-lg">Ask Tutor</h3>
                 <span className="text-[10px] font-bold text-akcen-blue bg-blue-50 px-2 py-1 rounded-full">3 Online</span>
               </div>
               <div className="space-y-3">
                  {MOCK_MENTORS.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-akcen-white cursor-pointer transition-colors">
                       <div className="flex items-center gap-3">
                          <img src={user.avatar} className="w-8 h-8 rounded-full border border-white shadow-sm" alt={user.name} />
                          <div>
                            <p className="text-xs font-bold text-akcen-text font-serif">{user.name}</p>
                            <p className="text-[10px] text-akcen-muted font-sans">{user.role}</p>
                          </div>
                       </div>
                       <button className="p-2 rounded-full bg-akcen-white text-akcen-blue hover:bg-akcen-blue hover:text-white transition-all">
                          <MessageCircle size={14} />
                       </button>
                    </div>
                  ))}
               </div>
             </div>
          </div>

        </div>
    </div>
  );
};

export default AnalyticsView;
