
import React, { useState } from 'react';
import { 
  Menu, 
  Bell, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  ChevronRight, 
  User, 
  Star, 
  CheckCircle2,
  Phone,
  MessageCircle,
  Home,
  Navigation
} from 'lucide-react';
import { MOCK_MENTORS } from '../constants';
import { User as UserType } from '../types';

interface MentoringViewProps {
  onToggleSidebar: () => void;
  onNavigate: (tab: string) => void;
}

// Mock Data for specific slots
const AVAILABLE_SLOTS = [
    { id: 's1', time: '09:00 AM', status: 'available' },
    { id: 's2', time: '10:30 AM', status: 'booked' },
    { id: 's3', time: '01:00 PM', status: 'available' },
    { id: 's4', time: '03:30 PM', status: 'available' },
    { id: 's5', time: '05:00 PM', status: 'available' },
];

const MentoringView: React.FC<MentoringViewProps> = ({ onToggleSidebar, onNavigate }) => {
  const [selectedMentor, setSelectedMentor] = useState<UserType>(MOCK_MENTORS[0]);
  const [selectedDate, setSelectedDate] = useState<string>('Mon, Jul 12');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [sessionMode, setSessionMode] = useState<'online' | 'in-person'>('online');
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  const handleBookSession = () => {
      setShowBookingSuccess(true);
      setTimeout(() => {
          setShowBookingSuccess(false);
          setSelectedSlot(null);
      }, 3000);
  };

  return (
    <div className="flex flex-col h-full bg-akcen-white relative">
        
        {/* Success Overlay */}
        {showBookingSuccess && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm animate-in fade-in">
                <div className="bg-white p-8 rounded-[2rem] shadow-2xl text-center border border-akcen-gray transform scale-110 transition-transform">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-akcen-green">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-akcen-text">Session Confirmed!</h2>
                    <p className="text-sm text-akcen-muted mt-2">
                        {sessionMode === 'in-person' ? 'Mentor is scheduled for a Home Visit.' : 'Online meeting link generated.'}
                    </p>
                </div>
            </div>
        )}

        {/* Header */}
        <header className="h-24 flex items-center justify-between px-8 sticky top-0 z-20 transition-all duration-300 bg-akcen-white/90 backdrop-blur-md border-b border-akcen-gray">
          <div className="flex items-center gap-4">
            <button onClick={onToggleSidebar} className="lg:hidden p-2 text-akcen-muted hover:text-akcen-blue -ml-2">
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif font-bold text-akcen-text tracking-tight">Mentoring</h1>
              <p className="text-xs text-akcen-muted font-sans font-medium">1:1 Sessions & Private Coaching</p>
            </div>
          </div>
          
          <button className="relative p-2.5 rounded-full hover:bg-white text-akcen-muted hover:text-akcen-blue transition-colors">
            <Bell size={22} />
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-10 py-8 custom-scrollbar space-y-8">
            
            {/* 1. UPCOMING SESSION CARD (HERO) */}
            <section className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[2.5rem] p-8 text-white shadow-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-akcen-blue/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                                <Clock size={12} /> Up Next
                            </span>
                            <span className="text-slate-400 text-xs font-bold">Tomorrow, 10:00 AM</span>
                        </div>
                        <h2 className="text-3xl font-serif font-bold mb-2">Physics: Dynamics Deep Dive</h2>
                        
                        {/* Dynamic Mode Display */}
                        <div className="flex items-center gap-4 mt-4">
                             <div className="flex items-center gap-3">
                                <img src="https://picsum.photos/40/40?random=20" className="w-10 h-10 rounded-full border-2 border-slate-600" alt="Mentor" />
                                <div>
                                    <p className="text-sm font-bold">Dr. Emily Chen</p>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold">Lead Mentor</p>
                                </div>
                             </div>
                             <div className="w-px h-8 bg-slate-700"></div>
                             <div className="flex items-center gap-2">
                                 <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-green-400">
                                     <Home size={20} />
                                 </div>
                                 <div>
                                     <p className="text-xs font-bold text-slate-300">Home Visit</p>
                                     <p className="text-[10px] text-slate-500">Jl. Sudirman No. 45</p>
                                 </div>
                             </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="px-6 py-4 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all flex items-center gap-2 shadow-lg">
                            <MessageCircle size={18} /> Chat Mentor
                        </button>
                        <button className="px-6 py-4 bg-slate-700 text-white border border-slate-600 rounded-xl font-bold text-sm hover:bg-slate-600 transition-all flex items-center gap-2">
                             Reschedule
                        </button>
                    </div>
                </div>
            </section>

            {/* 2. BOOKING SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left: Mentor & Slot Selection (8 cols) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <h3 className="text-xl font-serif font-bold text-akcen-text">Book a Session</h3>
                    
                    {/* Mentor Selector */}
                    <div className="bg-white p-6 rounded-[2rem] border border-akcen-gray shadow-sm">
                        <h4 className="text-xs font-bold text-akcen-muted uppercase mb-4">Select Mentor</h4>
                        <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                            {MOCK_MENTORS.map(mentor => (
                                <div 
                                    key={mentor.id}
                                    onClick={() => setSelectedMentor(mentor)}
                                    className={`flex-shrink-0 w-48 p-4 rounded-2xl border cursor-pointer transition-all group
                                        ${selectedMentor.id === mentor.id 
                                            ? 'bg-akcen-blue text-white border-akcen-blue shadow-lg ring-2 ring-akcen-blue/20' 
                                            : 'bg-akcen-white border-transparent hover:bg-white hover:border-akcen-gray'
                                        }
                                    `}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <img src={mentor.avatar} className="w-12 h-12 rounded-full border-2 border-white object-cover" alt={mentor.name} />
                                        {selectedMentor.id === mentor.id && <CheckCircle2 size={20} className="text-white" />}
                                    </div>
                                    <p className={`font-serif font-bold text-sm ${selectedMentor.id === mentor.id ? 'text-white' : 'text-akcen-text'}`}>{mentor.name}</p>
                                    <p className={`text-[10px] font-bold uppercase mt-1 ${selectedMentor.id === mentor.id ? 'text-blue-100' : 'text-akcen-muted'}`}>{mentor.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Date & Slot Grid */}
                    <div className="bg-white p-6 rounded-[2rem] border border-akcen-gray shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-xs font-bold text-akcen-muted uppercase">Select Slot for {selectedDate}</h4>
                            <div className="flex gap-2">
                                {['Mon, Jul 12', 'Tue, Jul 13', 'Wed, Jul 14'].map(day => (
                                    <button 
                                        key={day}
                                        onClick={() => {setSelectedDate(day); setSelectedSlot(null);}}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedDate === day ? 'bg-akcen-text text-white' : 'bg-akcen-white text-akcen-muted hover:bg-gray-200'}`}
                                    >
                                        {day.split(',')[0]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {AVAILABLE_SLOTS.map(slot => (
                                <button
                                    key={slot.id}
                                    disabled={slot.status === 'booked'}
                                    onClick={() => setSelectedSlot(slot.id)}
                                    className={`py-4 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all
                                        ${slot.status === 'booked' 
                                            ? 'bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed decoration-slice' 
                                            : selectedSlot === slot.id 
                                                ? 'bg-akcen-blue text-white border-akcen-blue shadow-md scale-105' 
                                                : 'bg-akcen-white border-akcen-gray text-akcen-text hover:border-akcen-blue hover:text-akcen-blue'
                                        }
                                    `}
                                >
                                    <span className="text-sm font-bold">{slot.time}</span>
                                    <span className="text-[10px] uppercase font-bold opacity-70">
                                        {slot.status === 'booked' ? 'Booked' : 'Available'}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Confirmation Panel (4 cols) */}
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-[2.5rem] p-6 border border-akcen-gray shadow-card sticky top-28">
                         <h3 className="font-serif font-bold text-lg mb-6 text-akcen-text">Session Details</h3>
                         
                         {/* Details List */}
                         <div className="space-y-6">
                             <div>
                                 <label className="text-[10px] font-bold text-akcen-muted uppercase tracking-wider mb-2 block">Mentor</label>
                                 <div className="flex items-center gap-3">
                                     <img src={selectedMentor.avatar} className="w-10 h-10 rounded-full border border-akcen-gray" alt="Mentor" />
                                     <div>
                                         <p className="text-sm font-bold text-akcen-text">{selectedMentor.name}</p>
                                         <p className="text-xs text-akcen-muted">{selectedMentor.level}</p>
                                     </div>
                                 </div>
                             </div>

                             <div>
                                 <label className="text-[10px] font-bold text-akcen-muted uppercase tracking-wider mb-2 block">Date & Time</label>
                                 <div className="flex items-center gap-3 p-3 bg-akcen-white rounded-xl border border-akcen-gray">
                                     <Calendar size={18} className="text-akcen-blue" />
                                     <p className="text-sm font-bold text-akcen-text">
                                         {selectedDate} • {AVAILABLE_SLOTS.find(s => s.id === selectedSlot)?.time || '--:--'}
                                     </p>
                                 </div>
                             </div>

                             {/* Session Mode Toggle */}
                             <div>
                                 <label className="text-[10px] font-bold text-akcen-muted uppercase tracking-wider mb-2 block">Session Mode</label>
                                 <div className="grid grid-cols-2 gap-3">
                                     <button 
                                        onClick={() => setSessionMode('online')}
                                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all
                                            ${sessionMode === 'online' ? 'bg-blue-50 border-akcen-blue text-akcen-blue' : 'bg-white border-akcen-gray text-akcen-muted hover:bg-gray-50'}
                                        `}
                                     >
                                         <Video size={20} />
                                         <span className="text-xs font-bold">Online</span>
                                     </button>
                                     <button 
                                        onClick={() => setSessionMode('in-person')}
                                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all
                                            ${sessionMode === 'in-person' ? 'bg-green-50 border-green-600 text-green-700' : 'bg-white border-akcen-gray text-akcen-muted hover:bg-gray-50'}
                                        `}
                                     >
                                         <Home size={20} />
                                         <span className="text-xs font-bold">Home Visit</span>
                                     </button>
                                 </div>
                                 {sessionMode === 'in-person' && (
                                     <div className="mt-2 text-[10px] text-akcen-muted bg-gray-50 p-2 rounded border border-gray-100 text-center">
                                         Mentor will travel to your registered address.
                                     </div>
                                 )}
                             </div>
                         </div>

                         <div className="mt-8 pt-6 border-t border-akcen-gray">
                             <div className="flex justify-between items-center mb-4 text-xs font-bold text-akcen-muted">
                                 <span>Session Cost</span>
                                 <span className="text-akcen-text">1 Credit</span>
                             </div>
                             <button 
                                disabled={!selectedSlot}
                                onClick={handleBookSession}
                                className="w-full py-4 bg-akcen-text text-white rounded-xl font-bold text-sm shadow-lg hover:bg-akcen-text/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                             >
                                Confirm Booking
                             </button>
                         </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};

export default MentoringView;
