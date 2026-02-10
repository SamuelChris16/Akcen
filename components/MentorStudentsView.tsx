
import React, { useState } from 'react';
import { 
  Search, 
  Menu, 
  MoreHorizontal, 
  Filter, 
  ArrowUpDown,
  MessageCircle,
  AlertTriangle,
  CheckCircle2,
  Download,
  Users,
  Briefcase,
  Star,
  Calendar,
  Clock,
  ChevronDown
} from 'lucide-react';

interface MentorStudentsViewProps {
  onToggleSidebar: () => void;
  onNavigate: (tab: string) => void;
}

type StudentType = 'homeroom' | 'private';

interface StudentData {
  id: number;
  name: string;
  avatar: string;
  type: StudentType;
  progress: number;
  avgScore: number;
  lastActive: string;
  status: 'Online' | 'Offline';
  risk: 'High' | 'Medium' | 'Low';
  nextSession?: string; // Only for Private
  plan?: string; // Only for Private
}

const MOCK_STUDENTS: StudentData[] = [
    // Private Students (VIP/1:1)
    { id: 1, name: 'Alex Morgan', avatar: 'https://picsum.photos/40/40?random=10', type: 'private', progress: 85, avgScore: 92, lastActive: '2m ago', status: 'Online', risk: 'Low', nextSession: 'Today, 2:00 PM', plan: 'Elite Prep' },
    { id: 3, name: 'Ryan Gosling', avatar: 'https://picsum.photos/40/40?random=52', type: 'private', progress: 45, avgScore: 72, lastActive: '2d ago', status: 'Offline', risk: 'High', nextSession: 'Tomorrow, 10:00 AM', plan: 'Remedial' },
    
    // Homeroom Students (Class Cohort)
    { id: 2, name: 'Jessica Williams', avatar: 'https://picsum.photos/40/40?random=50', type: 'homeroom', progress: 90, avgScore: 95, lastActive: '1h ago', status: 'Offline', risk: 'Low' },
    { id: 4, name: 'Sarah Lee', avatar: 'https://picsum.photos/40/40?random=60', type: 'homeroom', progress: 60, avgScore: 78, lastActive: '5h ago', status: 'Offline', risk: 'Medium' },
    { id: 5, name: 'David Kim', avatar: 'https://picsum.photos/40/40?random=51', type: 'homeroom', progress: 75, avgScore: 88, lastActive: '10m ago', status: 'Online', risk: 'Low' },
    { id: 6, name: 'Emily Blunt', avatar: 'https://picsum.photos/40/40?random=62', type: 'homeroom', progress: 20, avgScore: 65, lastActive: '1w ago', status: 'Offline', risk: 'High' },
    { id: 7, name: 'Chris Evans', avatar: 'https://picsum.photos/40/40?random=70', type: 'homeroom', progress: 88, avgScore: 85, lastActive: '30m ago', status: 'Online', risk: 'Low' },
];

const MentorStudentsView: React.FC<MentorStudentsViewProps> = ({ onToggleSidebar, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [viewMode, setViewMode] = useState<'all' | 'homeroom' | 'private'>('all');

  // --- FILTER LOGIC ---
  const filteredStudents = MOCK_STUDENTS.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRisk = filterRisk === 'All' || s.risk === filterRisk;
      const matchesView = viewMode === 'all' || s.type === viewMode;
      return matchesSearch && matchesRisk && matchesView;
  });

  // --- STATS CALCULATION ---
  const statsStudents = viewMode === 'all' ? MOCK_STUDENTS : MOCK_STUDENTS.filter(s => s.type === viewMode);
  const totalCount = statsStudents.length;
  const avgProgress = Math.round(statsStudents.reduce((acc, s) => acc + s.progress, 0) / (totalCount || 1));
  const riskCount = statsStudents.filter(s => s.risk === 'High').length;

  return (
    <div className="flex flex-col h-full bg-akcen-white">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 sticky top-0 z-20 transition-all duration-300 bg-white/80 backdrop-blur-xl border-b border-akcen-gray">
          <div className="flex items-center gap-4">
            <button onClick={onToggleSidebar} className="lg:hidden p-2 text-akcen-muted hover:text-akcen-blue -ml-2">
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif font-bold text-akcen-text tracking-tight">Student Management</h1>
              <div className="flex items-center gap-2 text-xs text-akcen-muted font-sans font-medium">
                 <span className="flex items-center gap-1"><Briefcase size={12}/> Physics Department</span>
                 <span className="w-1 h-1 rounded-full bg-akcen-grayDark"></span>
                 <span>Semester 2</span>
              </div>
            </div>
          </div>
          <button className="hidden sm:flex bg-white text-akcen-text border border-akcen-gray px-4 py-2 rounded-xl text-xs font-bold hover:bg-akcen-white transition-all items-center gap-2 shadow-sm">
             <Download size={14} /> Export Report
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-10 py-8 custom-scrollbar space-y-8">
            
            {/* 1. MENTOR TYPE TABS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="bg-white p-1.5 rounded-2xl border border-akcen-gray shadow-sm flex gap-1 w-full sm:w-auto overflow-x-auto no-scrollbar">
                    <button 
                        onClick={() => setViewMode('all')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap
                        ${viewMode === 'all' ? 'bg-akcen-text text-white shadow-md' : 'text-akcen-muted hover:bg-akcen-white hover:text-akcen-text'}`}
                    >
                        <Users size={14} /> All Students
                    </button>
                    <button 
                        onClick={() => setViewMode('homeroom')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap
                        ${viewMode === 'homeroom' ? 'bg-akcen-blue text-white shadow-md' : 'text-akcen-muted hover:bg-akcen-white hover:text-akcen-text'}`}
                    >
                        <Briefcase size={14} /> Homeroom Cohort
                        <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">{MOCK_STUDENTS.filter(s => s.type === 'homeroom').length}</span>
                    </button>
                    <button 
                        onClick={() => setViewMode('private')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap
                        ${viewMode === 'private' ? 'bg-purple-600 text-white shadow-md' : 'text-akcen-muted hover:bg-akcen-white hover:text-akcen-text'}`}
                    >
                        <Star size={14} /> Private 1:1
                        <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">{MOCK_STUDENTS.filter(s => s.type === 'private').length}</span>
                    </button>
                </div>

                {/* Quick Stats Summary based on View */}
                <div className="flex gap-4 text-xs">
                     <div className="bg-white px-4 py-2 rounded-xl border border-akcen-gray shadow-sm">
                         <span className="text-akcen-muted block font-bold uppercase text-[10px]">Avg Progress</span>
                         <span className="font-bold text-lg text-akcen-blue">{avgProgress}%</span>
                     </div>
                     <div className="bg-white px-4 py-2 rounded-xl border border-akcen-gray shadow-sm">
                         <span className="text-akcen-muted block font-bold uppercase text-[10px]">At Risk</span>
                         <span className={`font-bold text-lg ${riskCount > 0 ? 'text-red-500' : 'text-akcen-green'}`}>{riskCount}</span>
                     </div>
                </div>
            </div>
            
            {/* 2. FILTERS & SEARCH */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-3xl border border-akcen-gray shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-akcen-muted" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search student name..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-akcen-white border border-transparent rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:bg-white focus:border-akcen-blue focus:ring-2 focus:ring-akcen-blue/10 transition-all"
                    />
                </div>
                
                <div className="flex gap-2 items-center overflow-x-auto w-full md:w-auto no-scrollbar">
                    <span className="text-xs font-bold text-akcen-muted uppercase mr-2 tracking-wider whitespace-nowrap">Filter Risk:</span>
                    {['All', 'High', 'Medium', 'Low'].map(level => (
                        <button 
                            key={level}
                            onClick={() => setFilterRisk(level as any)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                                filterRisk === level 
                                ? 'bg-red-50 text-red-600 border-red-200 shadow-sm' 
                                : 'bg-white text-akcen-muted border-akcen-gray hover:border-akcen-text hover:text-akcen-text'
                            }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. STUDENTS TABLE */}
            <div className="bg-white rounded-[2rem] border border-akcen-gray shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-akcen-white/50 text-xs text-akcen-muted font-bold uppercase tracking-wider border-b border-akcen-gray">
                            <tr>
                                <th className="px-6 py-5 font-sans">Student Name</th>
                                <th className="px-6 py-5 font-sans">Type</th>
                                <th className="px-6 py-5 cursor-pointer hover:text-akcen-blue flex items-center gap-1 font-sans">Progress <ArrowUpDown size={12}/></th>
                                <th className="px-6 py-5 cursor-pointer hover:text-akcen-blue font-sans">Avg Score</th>
                                
                                {/* Dynamic Column: Next Session for Private, Last Active for Homeroom */}
                                <th className="px-6 py-5 font-sans">
                                    {viewMode === 'private' ? 'Next Session' : 'Last Active'}
                                </th>
                                
                                <th className="px-6 py-5 font-sans">Risk Level</th>
                                <th className="px-6 py-5 font-sans text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-akcen-gray/60">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-akcen-white/50 transition-colors group">
                                    
                                    {/* Name & Avatar */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img src={student.avatar} className="w-10 h-10 rounded-full border border-akcen-gray shadow-sm object-cover" alt={student.name} />
                                                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${student.status === 'Online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-akcen-text font-serif">{student.name}</p>
                                                {student.type === 'private' && (
                                                    <p className="text-[10px] text-purple-600 font-bold">{student.plan}</p>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Type Badge */}
                                    <td className="px-6 py-4">
                                        {student.type === 'private' ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                                                <Star size={10} fill="currentColor" /> Private
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-akcen-blue border border-blue-200">
                                                <Briefcase size={10} /> Homeroom
                                            </span>
                                        )}
                                    </td>

                                    {/* Progress Bar */}
                                    <td className="px-6 py-4">
                                        <div className="w-full max-w-[140px]">
                                            <div className="flex justify-between text-[10px] font-bold text-akcen-muted mb-1.5">
                                                <span>Level 2</span>
                                                <span className="text-akcen-text">{student.progress}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-akcen-blue rounded-full shadow-[0_0_10px_rgba(74,111,165,0.3)]"
                                                    style={{ width: `${student.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Score */}
                                    <td className="px-6 py-4">
                                        <span className={`text-sm font-bold font-mono px-2 py-1 rounded-md ${
                                            student.avgScore >= 80 ? 'bg-green-50 text-green-700' : 
                                            student.avgScore >= 70 ? 'bg-blue-50 text-akcen-blue' : 'bg-red-50 text-red-500'
                                        }`}>
                                            {student.avgScore}%
                                        </span>
                                    </td>

                                    {/* Dynamic: Next Session / Last Active */}
                                    <td className="px-6 py-4">
                                        {student.type === 'private' && student.nextSession ? (
                                            <div className="flex items-center gap-2 text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100 w-fit">
                                                <Calendar size={12} /> {student.nextSession}
                                            </div>
                                        ) : (
                                            <span className="text-xs text-akcen-muted font-medium flex items-center gap-1">
                                                <Clock size={12} /> {student.lastActive}
                                            </span>
                                        )}
                                    </td>

                                    {/* Risk */}
                                    <td className="px-6 py-4">
                                        {student.risk === 'High' && (
                                            <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100 w-fit">
                                                <AlertTriangle size={14} /> High
                                            </span>
                                        )}
                                        {student.risk === 'Medium' && (
                                            <span className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100 w-fit">
                                                <AlertTriangle size={14} /> Medium
                                            </span>
                                        )}
                                        {student.risk === 'Low' && (
                                            <span className="flex items-center gap-1 text-xs font-bold text-akcen-green bg-green-50 px-2.5 py-1 rounded-full border border-green-100 w-fit">
                                                <CheckCircle2 size={14} /> Healthy
                                            </span>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => onNavigate('messages')}
                                                className="p-2 text-akcen-muted hover:text-akcen-blue hover:bg-blue-50 rounded-lg transition-colors" 
                                                title="Message"
                                            >
                                                <MessageCircle size={18} />
                                            </button>
                                            <button className="p-2 text-akcen-muted hover:text-akcen-text hover:bg-gray-100 rounded-lg transition-colors">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredStudents.length === 0 && (
                    <div className="p-12 text-center text-akcen-muted">
                        <div className="w-16 h-16 bg-akcen-gray/50 rounded-full flex items-center justify-center mx-auto mb-4 text-akcen-muted">
                            <Users size={32} />
                        </div>
                        <p className="text-sm font-medium">No students found.</p>
                        <button onClick={() => {setSearchTerm(''); setFilterRisk('All'); setViewMode('all')}} className="mt-2 text-xs font-bold text-akcen-blue hover:underline">Clear Filters</button>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default MentorStudentsView;
