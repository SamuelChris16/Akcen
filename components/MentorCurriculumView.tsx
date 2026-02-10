
import React, { useState } from 'react';
import { 
  Menu, 
  Clock, 
  Calendar as CalendarIcon, 
  ChevronRight, 
  ChevronLeft,
  User, 
  Star,
  Briefcase,
  Zap,
  Video,
  Lock,
  CalendarDays,
  MapPin,
  Navigation
} from 'lucide-react';

interface MentorScheduleViewProps {
  onToggleSidebar: () => void;
  onNavigate: (tab: string) => void;
}

// --- TYPES ---
type StudentPlan = 'Private' | 'Standard';
type SlotStatus = 'Open' | 'Booked' | 'Completed';
type ViewMode = 'today' | 'tomorrow' | 'calendar' | 'availability';
type SessionType = 'online' | 'in-person';

interface SessionSlot {
  id: string;
  time: string;
  endTime: string;
  status: SlotStatus;
  studentName?: string;
  studentAvatar?: string;
  studentPlan?: StudentPlan;
  sessionType?: SessionType;
  studentAddress?: string;
  topic?: string;
  notes?: string;
}

// --- MOCK DATA ---
const SCHEDULE_DATA: Record<string, SessionSlot[]> = {
    'today': [
        { 
            id: 's1', time: '09:00 AM', endTime: '10:00 AM', status: 'Booked', 
            studentName: 'Alex Morgan', studentAvatar: 'https://picsum.photos/40/40?random=10', 
            studentPlan: 'Private', 
            sessionType: 'in-person',
            studentAddress: 'Jl. Sudirman No. 45, Jakarta Selatan',
            topic: 'Physics 101: Kinematics Review',
            notes: 'Home Visit. Focus on Projectile Motion.'
        },
        { 
            id: 's2', time: '10:30 AM', endTime: '11:30 AM', status: 'Open' 
        },
        { 
            id: 's3', time: '01:00 PM', endTime: '02:00 PM', status: 'Booked', 
            studentName: 'Sarah Lee', studentAvatar: 'https://picsum.photos/40/40?random=60', 
            studentPlan: 'Standard', 
            sessionType: 'online',
            topic: 'Homeroom Check-in',
            notes: 'Monthly academic review (Wali Kelas).'
        },
        { 
            id: 's4', time: '03:00 PM', endTime: '04:00 PM', status: 'Open' 
        }
    ],
    'tomorrow': [
        { 
            id: 's5', time: '09:00 AM', endTime: '10:00 AM', status: 'Booked', 
            studentName: 'Ryan Gosling', studentAvatar: 'https://picsum.photos/40/40?random=52', 
            studentPlan: 'Private', 
            sessionType: 'online',
            topic: 'Deep Dive: Dynamics',
            notes: 'Reviewing Newton\'s Laws application.'
        }
    ],
    // For calendar/availability
    'calendar': [],
    'availability': []
};

const MentorScheduleView: React.FC<MentorScheduleViewProps> = ({ onToggleSidebar }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('today');
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>('s1');
  
  // Availability State
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const TIME_SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
  const [schedule, setSchedule] = useState<Record<string, string[]>>({
      'Mon': ['09:00', '10:00', '14:00'],
      'Wed': ['13:00', '14:00'],
      'Fri': ['09:00', '10:00', '11:00']
  });

  const toggleSlot = (day: string, time: string) => {
      setSchedule(prev => {
          const currentDaySlots = prev[day] || [];
          if (currentDaySlots.includes(time)) {
              return { ...prev, [day]: currentDaySlots.filter(t => t !== time) };
          } else {
              return { ...prev, [day]: [...currentDaySlots, time] };
          }
      });
  };
  
  // Logic to switch data source
  const currentSlots = SCHEDULE_DATA[viewMode] || [];
  const selectedSlot = (viewMode === 'today' || viewMode === 'tomorrow') 
    ? (currentSlots.find(s => s.id === selectedSlotId) || currentSlots[0]) 
    : null;

  const handleUpgradeStudent = () => {
      alert(`Upgrade request sent!`);
  };

  return (
    <div className="flex flex-col h-full bg-akcen-white">
        {/* Header */}
        <header className="h-24 flex items-center justify-between px-8 sticky top-0 z-20 transition-all duration-300 bg-akcen-white/90 backdrop-blur-md border-b border-akcen-gray">
          <div className="flex items-center gap-4">
            <button onClick={onToggleSidebar} className="lg:hidden p-2 text-akcen-muted hover:text-akcen-blue -ml-2">
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif font-bold text-akcen-text tracking-tight">My Schedule</h1>
              <p className="text-xs text-akcen-muted font-sans font-medium">Manage sessions and availability.</p>
            </div>
          </div>
          
          <div className="bg-white p-1 rounded-xl border border-akcen-gray shadow-sm flex overflow-x-auto no-scrollbar">
             {(['today', 'tomorrow', 'calendar', 'availability'] as ViewMode[]).map((mode) => (
                 <button
                    key={mode}
                    onClick={() => { setViewMode(mode); setSelectedSlotId(null); }}
                    className={`px-4 lg:px-6 py-2 rounded-lg text-xs font-bold capitalize transition-all ${viewMode === mode ? 'bg-akcen-text text-white shadow-sm' : 'text-akcen-muted hover:text-akcen-text hover:bg-akcen-white'}`}
                 >
                    {mode}
                 </button>
             ))}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
            
            {/* MAIN PANEL */}
            <div className={`flex-1 overflow-y-auto px-6 lg:px-8 py-8 custom-scrollbar ${viewMode !== 'availability' && viewMode !== 'calendar' ? 'border-r border-akcen-gray/50' : ''}`}>
                
                {viewMode === 'availability' && (
                    // --- AVAILABILITY CONFIGURATOR ---
                    <div className="bg-white rounded-[2rem] p-8 border border-akcen-gray shadow-sm animate-in fade-in">
                        <div className="flex items-center justify-between mb-8">
                           <div className="flex items-center gap-3">
                               <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                  <Clock size={20} />
                               </div>
                               <div>
                                   <h2 className="text-xl font-serif font-bold text-akcen-text">Availability & Slots</h2>
                                   <p className="text-xs text-akcen-muted">Click slots to toggle availability for 1:1 booking.</p>
                               </div>
                           </div>
                           <button className="flex items-center gap-2 px-4 py-2 bg-akcen-blue/10 text-akcen-blue rounded-lg text-xs font-bold hover:bg-akcen-blue/20 transition-colors">
                               <Zap size={14} /> Auto-fill Work Hours
                           </button>
                        </div>
                        
                        <div className="overflow-x-auto pb-4">
                            <div className="min-w-[600px]">
                                {/* Header Row */}
                                <div className="grid grid-cols-6 gap-3 mb-3">
                                    <div className="col-span-1"></div>
                                    {TIME_SLOTS.map(time => (
                                        <div key={time} className="text-center text-xs font-bold text-akcen-muted uppercase">
                                            {time}
                                        </div>
                                    ))}
                                </div>

                                {/* Days Rows */}
                                <div className="space-y-3">
                                    {DAYS.map(day => (
                                        <div key={day} className="grid grid-cols-6 gap-3 items-center">
                                            <div className="col-span-1 font-bold text-sm text-akcen-text bg-akcen-white py-3 rounded-xl text-center border border-akcen-gray">
                                                {day}
                                            </div>
                                            {TIME_SLOTS.map(time => {
                                                const isAvailable = schedule[day]?.includes(time);
                                                return (
                                                    <button
                                                        key={`${day}-${time}`}
                                                        onClick={() => toggleSlot(day, time)}
                                                        className={`col-span-1 py-3 rounded-xl text-xs font-bold border transition-all duration-200 flex flex-col items-center justify-center gap-1
                                                            ${isAvailable 
                                                                ? 'bg-akcen-blue text-white border-akcen-blue shadow-md transform scale-105' 
                                                                : 'bg-white text-akcen-muted border-akcen-gray hover:border-akcen-blue/50 hover:bg-blue-50/50'
                                                            }
                                                        `}
                                                    >
                                                        {isAvailable ? 'Open' : '-'}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-akcen-white border border-akcen-gray rounded-xl flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                 <Clock size={18} className="text-akcen-muted" />
                                 <div>
                                     <h4 className="text-sm font-bold text-akcen-text">Session Duration</h4>
                                     <p className="text-xs text-akcen-muted">Standard slot length for bookings</p>
                                 </div>
                             </div>
                             <select className="bg-white border border-akcen-gray text-akcen-text text-xs font-bold px-4 py-2 rounded-lg outline-none focus:border-akcen-blue">
                                 <option>30 Minutes</option>
                                 <option>45 Minutes</option>
                                 <option>60 Minutes</option>
                             </select>
                        </div>
                    </div>
                )}

                {viewMode === 'calendar' && (
                    // --- CALENDAR VIEW ---
                    <div className="bg-white rounded-[2rem] p-8 border border-akcen-gray shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-serif font-bold text-akcen-text">July 2024</h2>
                            <div className="flex gap-2">
                                <button className="p-2 border border-akcen-gray rounded-lg hover:bg-akcen-white"><ChevronLeft size={16}/></button>
                                <button className="p-2 border border-akcen-gray rounded-lg hover:bg-akcen-white"><ChevronRight size={16}/></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-4 mb-4 text-center">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                <div key={d} className="text-xs font-bold text-akcen-muted uppercase">{d}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-4">
                             {/* Mock Calendar Days */}
                             {Array.from({length: 31}, (_, i) => i + 1).map((day) => {
                                 const hasSession = [2, 5, 12, 14, 19, 23, 26].includes(day);
                                 const isToday = day === 12; // Mock Today
                                 return (
                                     <div key={day} className={`aspect-square rounded-xl border flex flex-col items-center justify-start pt-2 cursor-pointer transition-all hover:border-akcen-blue
                                         ${isToday ? 'bg-akcen-text text-white border-akcen-text shadow-md' : 'bg-white border-akcen-gray text-akcen-text'}
                                     `}>
                                         <span className="text-sm font-bold">{day}</span>
                                         {hasSession && (
                                             <div className="flex gap-1 mt-2">
                                                 <div className={`w-1.5 h-1.5 rounded-full ${isToday ? 'bg-white' : 'bg-purple-500'}`}></div>
                                                 {day % 2 === 0 && <div className={`w-1.5 h-1.5 rounded-full ${isToday ? 'bg-white/70' : 'bg-akcen-blue'}`}></div>}
                                             </div>
                                         )}
                                     </div>
                                 )
                             })}
                        </div>
                    </div>
                )}

                {(viewMode === 'today' || viewMode === 'tomorrow') && (
                    // --- TODAY / TOMORROW LIST VIEW ---
                    <div className="space-y-4">
                        {currentSlots.length === 0 ? (
                            <div className="p-10 text-center text-akcen-muted border border-dashed border-akcen-gray rounded-2xl">
                                <Clock size={32} className="mx-auto mb-2 opacity-50" />
                                <p>No sessions scheduled.</p>
                            </div>
                        ) : (
                            currentSlots.map((slot) => {
                                const isSelected = selectedSlotId === slot.id;
                                const isPrivate = slot.studentPlan === 'Private';
                                const isInPerson = slot.sessionType === 'in-person';

                                return (
                                    <div 
                                        key={slot.id}
                                        onClick={() => setSelectedSlotId(slot.id)}
                                        className={`group relative p-5 rounded-[1.5rem] border transition-all cursor-pointer flex gap-5 items-center
                                            ${isSelected 
                                                ? 'bg-white border-akcen-blue shadow-lg ring-1 ring-akcen-blue/20 scale-[1.01]' 
                                                : 'bg-white border-akcen-gray hover:border-akcen-blue/50 hover:shadow-md'
                                            }
                                        `}
                                    >
                                        {/* Time Column */}
                                        <div className="flex flex-col items-center justify-center w-24 flex-shrink-0 border-r border-akcen-gray/50 pr-5">
                                            <span className={`text-sm font-bold ${isSelected ? 'text-akcen-blue' : 'text-akcen-text'}`}>
                                                {slot.time.split(' ')[0]}
                                            </span>
                                            <span className="text-[10px] text-akcen-muted font-bold uppercase">{slot.time.split(' ')[1]}</span>
                                        </div>

                                        {/* Detail Column */}
                                        <div className="flex-1 min-w-0">
                                            {slot.status === 'Open' ? (
                                                <div className="flex items-center gap-2 text-akcen-muted">
                                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                                    <span className="text-sm font-bold">Available Slot</span>
                                                </div>
                                            ) : (
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-3">
                                                        <img src={slot.studentAvatar} className="w-10 h-10 rounded-full border border-akcen-gray object-cover" alt="Student" />
                                                        <div>
                                                            <h4 className="text-sm font-bold text-akcen-text font-serif">{slot.studentName}</h4>
                                                            <div className="flex items-center gap-2">
                                                                {isPrivate ? (
                                                                    <span className="text-[9px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-100 font-bold uppercase flex items-center gap-1">
                                                                        <Star size={8} fill="currentColor"/> Private
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-[9px] bg-blue-50 text-akcen-blue px-1.5 py-0.5 rounded border border-blue-100 font-bold uppercase flex items-center gap-1">
                                                                        <Briefcase size={8} /> Standard
                                                                    </span>
                                                                )}
                                                                {isInPerson && (
                                                                    <span className="text-[9px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-100 font-bold uppercase flex items-center gap-1">
                                                                        <MapPin size={8} /> Home Visit
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions/Status */}
                                        <div className="text-right">
                                            {slot.status === 'Open' ? (
                                                <div className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Open</div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    {isInPerson ? <MapPin size={16} className="text-akcen-muted"/> : <Video size={16} className="text-akcen-muted"/>}
                                                    <ChevronRight size={18} className={`transition-transform ${isSelected ? 'text-akcen-blue translate-x-1' : 'text-akcen-gray'}`} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>

            {/* RIGHT PANEL: DETAILS (Only for Today/Tomorrow) */}
            {(viewMode === 'today' || viewMode === 'tomorrow') && selectedSlot && (
                <div className="w-full lg:w-[400px] bg-white border-l border-akcen-gray flex flex-col z-10 shadow-[-5px_0_30px_rgba(0,0,0,0.02)]">
                    
                    {/* Detail Header */}
                    <div className="p-6 border-b border-akcen-gray flex justify-between items-start">
                        <div>
                            <span className="text-[10px] font-bold text-akcen-muted uppercase tracking-wider block mb-1">Session Info</span>
                            <h2 className="text-xl font-serif font-bold text-akcen-text">{selectedSlot.time}</h2>
                            <p className="text-xs text-akcen-muted font-medium mt-1 flex items-center gap-1">
                                <CalendarIcon size={12} /> {viewMode === 'today' ? 'Today, July 12' : 'Tomorrow, July 13'}
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {selectedSlot.status === 'Open' ? (
                            <div className="flex flex-col items-center justify-center h-64 text-center space-y-4 opacity-50">
                                <Clock size={40} />
                                <p className="text-sm font-bold">This slot is open for booking.</p>
                            </div>
                        ) : (
                            <>
                                {/* Student Card */}
                                <div className="bg-akcen-white/50 p-5 rounded-[1.5rem] border border-akcen-gray text-center relative overflow-hidden">
                                     {selectedSlot.studentPlan === 'Private' && (
                                         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                                     )}
                                     
                                     <img src={selectedSlot.studentAvatar} className="w-20 h-20 rounded-full border-4 border-white shadow-sm mx-auto mb-3 object-cover" alt="Student" />
                                     
                                     <h3 className="text-lg font-serif font-bold text-akcen-text">{selectedSlot.studentName}</h3>
                                     
                                     <div className="flex justify-center gap-2 mt-2 mb-4">
                                         {selectedSlot.studentPlan === 'Private' ? (
                                             <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200">
                                                 <Star size={12} fill="currentColor" /> Private 1:1 Plan
                                             </span>
                                         ) : (
                                             <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-akcen-blue border border-blue-200">
                                                 <Briefcase size={12} /> Standard Plan
                                             </span>
                                         )}
                                     </div>
                                </div>

                                {/* RESTRICTION CARD FOR STANDARD STUDENTS */}
                                {selectedSlot.studentPlan === 'Standard' ? (
                                    <div className="bg-red-50 border border-red-100 p-5 rounded-2xl relative overflow-hidden">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-white rounded-lg text-red-500 shadow-sm">
                                                <Lock size={18} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-red-900">1:1 Coaching Unavailable</h4>
                                                <p className="text-xs text-red-700 mt-1 leading-relaxed">
                                                    Standard students do not have access to private 1:1 coaching sessions. This slot is reserved for <strong>Homeroom Check-ins</strong> only.
                                                </p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={handleUpgradeStudent}
                                            className="w-full mt-4 bg-white text-red-600 border border-red-200 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2"
                                        >
                                            <Zap size={14} fill="currentColor" /> Recommend Upgrade
                                        </button>
                                    </div>
                                ) : (
                                    // CONTENT FOR PRIVATE STUDENTS
                                    <>
                                        {/* LOCATION / MODE INFO */}
                                        <div>
                                            <h4 className="text-xs font-bold text-akcen-muted uppercase mb-2">Session Mode</h4>
                                            {selectedSlot.sessionType === 'in-person' ? (
                                                <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <MapPin size={18} className="text-green-700" />
                                                        <span className="text-sm font-bold text-green-900">Home Visit (In-Person)</span>
                                                    </div>
                                                    <p className="text-xs text-green-800 mb-3">{selectedSlot.studentAddress}</p>
                                                    <div className="h-24 w-full bg-green-200 rounded-lg flex items-center justify-center text-green-700 text-xs font-bold border border-green-300">
                                                        Map Preview
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                                                    <div className="flex items-center gap-2">
                                                        <Video size={18} className="text-akcen-blue" />
                                                        <span className="text-sm font-bold text-akcen-blue">Online Video Call</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Session Topic */}
                                        <div>
                                            <h4 className="text-xs font-bold text-akcen-muted uppercase mb-2">Topic</h4>
                                            <div className="p-4 bg-white border border-akcen-gray rounded-xl">
                                                <p className="text-sm font-bold text-akcen-text">{selectedSlot.topic}</p>
                                            </div>
                                        </div>

                                        {/* Notes */}
                                        <div>
                                            <h4 className="text-xs font-bold text-akcen-muted uppercase mb-2">Private Notes</h4>
                                            <div className="p-4 bg-white border border-akcen-gray rounded-xl min-h-[100px]">
                                                <p className="text-sm text-akcen-muted italic">{selectedSlot.notes || "No notes provided."}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    
                    {/* Footer Actions */}
                    <div className="p-4 border-t border-akcen-gray bg-white">
                        {selectedSlot.status === 'Booked' && selectedSlot.studentPlan === 'Private' && (
                            <>
                                {selectedSlot.sessionType === 'in-person' ? (
                                    <button className="w-full py-3.5 bg-akcen-green text-white rounded-xl text-sm font-bold shadow-lg hover:bg-akcen-green/90 transition-all flex items-center justify-center gap-2">
                                        <Navigation size={18} /> Get Directions
                                    </button>
                                ) : (
                                    <button className="w-full py-3.5 bg-akcen-blue text-white rounded-xl text-sm font-bold shadow-lg hover:bg-akcen-blue/90 transition-all flex items-center justify-center gap-2">
                                        <Video size={18} /> Join Online Session
                                    </button>
                                )}
                            </>
                        )}
                        {selectedSlot.status === 'Booked' && selectedSlot.studentPlan === 'Standard' && (
                            <button className="w-full py-3.5 bg-white border border-akcen-gray text-akcen-muted rounded-xl text-sm font-bold hover:bg-akcen-white transition-all flex items-center justify-center gap-2 cursor-not-allowed opacity-70">
                                <Lock size={16} /> Session Locked
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* PLACEHOLDER FOR CALENDAR DETAIL PANEL */}
            {viewMode === 'calendar' && (
                 <div className="hidden lg:flex w-[300px] bg-white border-l border-akcen-gray flex-col items-center justify-center text-center p-8 text-akcen-muted">
                     <CalendarDays size={48} className="mb-4 opacity-20" />
                     <h3 className="text-lg font-bold text-akcen-text">Monthly View</h3>
                     <p className="text-xs mt-2">Select a date to view detailed slots.</p>
                 </div>
            )}
        </div>
    </div>
  );
};

export default MentorScheduleView;
