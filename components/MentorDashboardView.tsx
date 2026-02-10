
import React from 'react';
import { 
  Users, 
  ClipboardList, 
  AlertCircle, 
  TrendingUp, 
  Menu, 
  Bell, 
  Search,
  ChevronRight,
  MoreHorizontal,
  Calendar,
  Clock,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import StatsCard from './StatsCard';
import ActivityChart from './ActivityChart';
import { CHART_DATA } from '../constants';

interface MentorDashboardViewProps {
  onToggleSidebar: () => void;
  onNavigate: (tab: string) => void;
}

const MentorDashboardView: React.FC<MentorDashboardViewProps> = ({ onToggleSidebar, onNavigate }) => {
  
  const STUDENTS_AT_RISK = [
    { name: 'Ryan G.', risk: 'High', reason: 'Missed 3 assignments', avatar: 'https://picsum.photos/40/40?random=52' },
    { name: 'Sarah L.', risk: 'Medium', reason: 'Score dropped 15%', avatar: 'https://picsum.photos/40/40?random=60' },
  ];

  const UPCOMING_SESSIONS = [
    { time: '10:00 AM', title: 'Physics 101: Review', type: 'Live Class', students: 24, duration: '1h' },
    { time: '02:00 PM', title: '1:1 with Alex Morgan', type: 'Mentoring', students: 1, duration: '30m' },
  ];

  return (
    <div className="flex flex-col h-full bg-akcen-white">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 sticky top-0 z-20 transition-all duration-300 bg-white/80 backdrop-blur-xl border-b border-akcen-gray">
          <div className="flex items-center gap-4">
            <button 
              onClick={onToggleSidebar}
              className="lg:hidden p-2 text-akcen-muted hover:text-akcen-blue -ml-2"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif font-bold text-akcen-text tracking-tight">Overview</h1>
              <p className="text-xs text-akcen-muted font-sans font-medium flex items-center gap-1">
                Physics Level 2 <span className="w-1 h-1 rounded-full bg-akcen-grayDark"></span> Sem 2 Cohort
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center bg-akcen-white/50 border border-akcen-gray rounded-full px-4 py-2 focus-within:bg-white focus-within:border-akcen-blue focus-within:ring-2 focus-within:ring-akcen-blue/10 transition-all w-64">
                 <Search size={16} className="text-akcen-muted mr-2" />
                 <input type="text" placeholder="Search students, assignments..." className="bg-transparent text-sm focus:outline-none w-full text-akcen-text placeholder:text-akcen-muted/70" />
             </div>
             <button className="relative p-2.5 rounded-full hover:bg-akcen-white text-akcen-muted hover:text-akcen-text transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
             </button>
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-akcen-blue to-indigo-600 text-white flex items-center justify-center font-serif font-bold text-xs shadow-md">
                 EC
             </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-10 py-8 space-y-8 custom-scrollbar">
            
            {/* 1. Quick Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div onClick={() => onNavigate('grading')} className="cursor-pointer group">
                    <StatsCard 
                        title="Pending Review" 
                        value={12} 
                        icon={<ClipboardList size={20}/>} 
                        trend="+4 new" 
                        trendUp={false}
                    />
                </div>
                <div className="group">
                    <StatsCard 
                       title="Cohort Avg Score" 
                       value="84%" 
                       icon={<TrendingUp size={20}/>} 
                       trend="+2% vs last week" 
                       trendUp={true} 
                    />
                </div>
                <div onClick={() => onNavigate('students')} className="cursor-pointer group">
                    <StatsCard 
                        title="Active Students" 
                        value="26" 
                        target="28" 
                        icon={<Users size={20}/>} 
                    />
                </div>
                <div className="group">
                    <StatsCard 
                       title="Needs Attention" 
                       value={2} 
                       icon={<AlertCircle size={20}/>} 
                       trend="Critical" 
                       trendUp={false}
                    />
                </div>
            </div>

            {/* 2. Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Col: Activity Chart & Grading (8 cols) */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    
                    {/* Activity Chart */}
                    <div className="bg-white rounded-3xl p-6 border border-akcen-gray shadow-sm hover:shadow-card transition-shadow">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="font-serif font-bold text-akcen-text text-lg">Engagement Overview</h3>
                                <p className="text-xs text-akcen-muted">Student submission volume over time</p>
                            </div>
                            <div className="flex bg-akcen-white p-1 rounded-lg">
                                <button className="px-3 py-1 text-xs font-bold rounded-md bg-white shadow-sm text-akcen-text">Weekly</button>
                                <button className="px-3 py-1 text-xs font-bold rounded-md text-akcen-muted hover:text-akcen-text">Monthly</button>
                            </div>
                        </div>
                        <div className="h-72 w-full">
                            <ActivityChart data={CHART_DATA.map(d => ({...d, worksheets: d.worksheets * 5}))} />
                        </div>
                    </div>

                    {/* Recent Submissions Table */}
                    <div className="bg-white rounded-3xl border border-akcen-gray shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-akcen-gray flex justify-between items-center bg-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-akcen-yellow/20 rounded-lg text-yellow-700">
                                    <ClipboardList size={20} />
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-akcen-text text-lg leading-none">Grading Queue</h3>
                                    <p className="text-xs text-akcen-muted mt-1">FIFO Priority • 12 Pending</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => onNavigate('grading')}
                                className="px-5 py-2.5 bg-akcen-text text-white rounded-xl text-xs font-bold shadow-lg shadow-akcen-text/20 hover:bg-akcen-text/90 transition-all flex items-center gap-2"
                            >
                                Start Grading <ArrowUpRight size={14} />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                           <table className="w-full text-left border-collapse">
                               <thead className="bg-akcen-white/50 text-xs text-akcen-muted font-bold uppercase tracking-wider border-b border-akcen-gray">
                                   <tr>
                                       <th className="px-6 py-4 font-sans">Student</th>
                                       <th className="px-6 py-4 font-sans">Task</th>
                                       <th className="px-6 py-4 font-sans">Time</th>
                                       <th className="px-6 py-4 font-sans">AI Confidence</th>
                                       <th className="px-6 py-4 font-sans text-right">Action</th>
                                   </tr>
                               </thead>
                               <tbody className="divide-y divide-akcen-gray/50">
                                   {[1,2,3].map((row) => (
                                       <tr key={row} className="hover:bg-akcen-blueLight/30 transition-colors group cursor-pointer" onClick={() => onNavigate('grading')}>
                                           <td className="px-6 py-4">
                                               <div className="flex items-center gap-3">
                                                   <img src={`https://picsum.photos/30/30?random=${row + 10}`} className="w-9 h-9 rounded-full bg-gray-200 border border-white shadow-sm" alt="S" />
                                                   <span className="text-sm font-bold text-akcen-text font-serif">Alex Morgan</span>
                                               </div>
                                           </td>
                                           <td className="px-6 py-4">
                                               <span className="text-sm text-akcen-text block font-bold">Newton's Laws</span>
                                               <span className="text-xs text-akcen-muted">Problem 6: Isolating...</span>
                                           </td>
                                           <td className="px-6 py-4 text-xs text-akcen-muted font-medium">2h ago</td>
                                           <td className="px-6 py-4">
                                               <div className="flex items-center gap-2">
                                                   <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                       <div className="h-full bg-akcen-green w-[92%] rounded-full"></div>
                                                   </div>
                                                   <span className="text-xs font-bold text-akcen-green">92%</span>
                                               </div>
                                           </td>
                                           <td className="px-6 py-4 text-right">
                                               <button className="text-xs font-bold text-akcen-blue hover:text-akcen-text flex items-center justify-end gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                                   Review <ChevronRight size={12} />
                                               </button>
                                           </td>
                                       </tr>
                                   ))}
                               </tbody>
                           </table>
                        </div>
                    </div>
                </div>

                {/* Right Col: Schedule & Lists (4 cols) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    
                    {/* Today's Schedule */}
                    <div className="bg-white rounded-3xl p-6 border border-akcen-gray shadow-sm">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="font-serif font-bold text-akcen-text text-lg">Today's Schedule</h3>
                            <div className="px-2 py-1 bg-akcen-white rounded-lg text-xs font-bold text-akcen-text border border-akcen-gray">
                                {new Date().toLocaleDateString('en-US', {weekday: 'short', day: 'numeric'})}
                            </div>
                        </div>
                        
                        <div className="relative pl-4 space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-akcen-gray/50">
                            {UPCOMING_SESSIONS.map((session, i) => (
                                <div key={i} className="relative pl-6 group cursor-pointer">
                                    <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-akcen-blue z-10 group-hover:bg-akcen-blue transition-colors"></div>
                                    <div className="bg-akcen-white/40 p-3 rounded-2xl border border-transparent hover:border-akcen-gray hover:bg-white hover:shadow-sm transition-all">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="text-sm font-bold text-akcen-text leading-tight">{session.title}</h4>
                                            <MoreHorizontal size={14} className="text-akcen-muted hover:text-akcen-text" />
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-akcen-muted mt-1">
                                            <span className="flex items-center gap-1 font-medium text-akcen-text"><Clock size={12} /> {session.time}</span>
                                            <span>•</span>
                                            <span>{session.duration}</span>
                                        </div>
                                        <div className="mt-2 flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${session.type === 'Live Class' ? 'bg-indigo-50 text-indigo-600' : 'bg-green-50 text-green-700'}`}>
                                                {session.type}
                                            </span>
                                            <span className="text-[10px] text-akcen-muted font-medium flex items-center gap-1">
                                                <Users size={10} /> {session.students}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Needs Attention */}
                    <div className="bg-white rounded-3xl p-6 border border-akcen-gray shadow-sm flex-1">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="font-serif font-bold text-akcen-text text-lg">At Risk</h3>
                            <span className="text-xs font-bold bg-red-50 text-red-500 px-2.5 py-1 rounded-full border border-red-100">2 flagged</span>
                        </div>
                        
                        <div className="space-y-3">
                            {STUDENTS_AT_RISK.map((student, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-red-50/40 border border-red-100/50 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer group" onClick={() => onNavigate('students')}>
                                    <img src={student.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Avt" />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-sm text-akcen-text truncate group-hover:text-red-700 transition-colors">{student.name}</h4>
                                        <p className="text-xs text-red-500 font-medium truncate flex items-center gap-1">
                                            <AlertCircle size={10} /> {student.reason}
                                        </p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white text-red-300 flex items-center justify-center group-hover:text-red-500 shadow-sm">
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => onNavigate('students')} className="w-full mt-4 py-2 text-xs font-bold text-akcen-muted hover:text-akcen-text border border-dashed border-akcen-gray rounded-xl hover:bg-akcen-white transition-all">
                            View All Students
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
  );
};

export default MentorDashboardView;
