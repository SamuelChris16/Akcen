
import React, { useState } from 'react';
import { 
  Bell, 
  TrendingUp, 
  Trophy, 
  Clock, 
  Target, 
  Zap,
  BookOpen,
  AlertCircle,
  Menu,
  MessageCircle,
  Video,
  FileText,
  CheckCircle2,
  X,
  Calendar,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Home,
  Microscope,
  Briefcase
} from 'lucide-react';
import ProgressSCurve from './ProgressSCurve';
import StatsCard from './StatsCard';
import WorksheetList from './WorksheetList';
import DailyGoalCard from './DailyGoalCard';
import NotificationDropdown from './NotificationDropdown';
import { SCURVE_DATA, CHART_DATA, WEEKLY_ACTIVITY_DATA, MOCK_EVENTS, MOCK_MENTORS, WEEKLY_WORK_TARGET, MOCK_NOTIFICATIONS } from '../constants';
import { User } from '../types';

interface DashboardViewProps {
  onToggleSidebar: () => void;
  onNavigate: (tab: string) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ onToggleSidebar, onNavigate }) => {
  const [chartMode, setChartMode] = useState<'daily' | 'weekly' | 'cumulative'>('daily');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  
  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedMentorForBooking, setSelectedMentorForBooking] = useState<User | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('Mon');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<'online' | 'in-person'>('online'); // New State
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkRead = (id: string) => {
     setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleOpenBooking = (mentor?: User) => {
      setSelectedMentorForBooking(mentor || MOCK_MENTORS[0]);
      setBookingModalOpen(true);
      setBookingConfirmed(false);
      setSelectedTime(null);
      setSessionType('online'); // Reset to default
  };

  const handleConfirmBooking = () => {
      setBookingConfirmed(true);
      setTimeout(() => {
          setBookingModalOpen(false);
          setBookingConfirmed(false);
      }, 3000);
  };

  // Mock Available Slots (Student View)
  const AVAILABLE_SLOTS = {
      'Mon': ['09:00', '10:00', '14:00'],
      'Tue': ['11:00', '13:00'],
      'Wed': ['09:00', '15:00'],
      'Thu': ['10:00', '14:00', '16:00'],
      'Fri': ['09:00', '11:00']
  };

  // Calculate Weekly Metrics Logic
  // Sum of CHART_DATA worksheets which contains the daily actuals
  const actualWorksheets = CHART_DATA.reduce((sum, day) => sum + day.worksheets, 0);
  const targetWorksheets = WEEKLY_WORK_TARGET;
  const worksheetDiff = actualWorksheets - targetWorksheets;
  const worksheetTrend = worksheetDiff > 0 ? `+${worksheetDiff}` : `${worksheetDiff}`;
  const isWorksheetAhead = worksheetDiff >= 0;

  // Find Today's Data
  const todayData = CHART_DATA.find(d => d.isToday) || CHART_DATA[CHART_DATA.length - 1];
  const todayProgress = todayData.worksheets;
  const todayTarget = todayData.target;

  const getChartData = () => {
      switch(chartMode) {
          case 'daily': return CHART_DATA;
          case 'weekly': return WEEKLY_ACTIVITY_DATA;
          case 'cumulative': return SCURVE_DATA;
          default: return CHART_DATA;
      }
  };

  const getChartTitle = () => {
    switch(chartMode) {
          case 'daily': return 'Daily Activity';
          case 'weekly': return 'Weekly Volume';
          case 'cumulative': return 'Mastery Curve';
          default: return '';
      }
  };

  return (
    <div className="flex flex-col h-full relative">
        
        {/* --- BOOKING MODAL OVERLAY --- */}
        {bookingModalOpen && selectedMentorForBooking && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-akcen-text/30 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                    {bookingConfirmed ? (
                        <div className="p-10 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
                                <CheckCircle2 size={40} className="text-akcen-green" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-akcen-text mb-2">Booking Confirmed!</h3>
                            <p className="text-sm text-akcen-muted mb-1">
                                You are scheduled with {selectedMentorForBooking.name} on {selectedDate} at {selectedTime}.
                            </p>
                            <p className="text-sm font-bold text-akcen-blue mb-6 flex items-center gap-2 justify-center">
                                {sessionType === 'online' ? <Video size={14}/> : <MapPin size={14}/>}
                                Mode: {sessionType === 'online' ? 'Online Video Call' : 'In-Person Home Visit'}
                            </p>
                            <button onClick={() => setBookingModalOpen(false)} className="px-8 py-3 bg-akcen-text text-white rounded-xl font-bold text-sm">Close</button>
                        </div>
                    ) : (
                        <>
                            <div className="p-6 border-b border-akcen-gray flex justify-between items-center bg-akcen-white/50">
                                <h3 className="font-serif font-bold text-lg text-akcen-text">Book 1:1 Session</h3>
                                <button onClick={() => setBookingModalOpen(false)} className="p-2 hover:bg-akcen-gray rounded-full text-akcen-muted">
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                {/* Mentor Info */}
                                <div className="flex items-center gap-4 mb-6">
                                    <img src={selectedMentorForBooking.avatar} className="w-14 h-14 rounded-full border-2 border-white shadow-sm object-cover" alt="Mentor" />
                                    <div>
                                        <h4 className="font-bold text-akcen-text text-lg leading-tight">{selectedMentorForBooking.name}</h4>
                                        <p className="text-xs text-akcen-muted">{selectedMentorForBooking.level} • {selectedMentorForBooking.role}</p>
                                    </div>
                                </div>

                                {/* Session Mode Selector */}
                                <div className="mb-6">
                                    <label className="text-xs font-bold text-akcen-muted uppercase mb-3 block">Session Mode</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button 
                                            onClick={() => setSessionType('online')}
                                            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all
                                                ${sessionType === 'online' 
                                                    ? 'bg-blue-50 border-akcen-blue text-akcen-blue shadow-sm' 
                                                    : 'bg-white border-akcen-gray text-akcen-muted hover:border-akcen-blue/50'
                                                }
                                            `}
                                        >
                                            <Video size={24} />
                                            <span className="text-xs font-bold">Online Video</span>
                                        </button>
                                        <button 
                                            onClick={() => setSessionType('in-person')}
                                            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all
                                                ${sessionType === 'in-person' 
                                                    ? 'bg-green-50 border-akcen-green text-akcen-green shadow-sm' 
                                                    : 'bg-white border-akcen-gray text-akcen-muted hover:border-akcen-green/50'
                                                }
                                            `}
                                        >
                                            <Home size={24} />
                                            <span className="text-xs font-bold">Home Visit</span>
                                        </button>
                                    </div>
                                    {sessionType === 'in-person' && (
                                        <p className="text-[10px] text-akcen-muted mt-2 text-center bg-gray-50 p-2 rounded-lg border border-gray-100">
                                            Mentor will travel to your registered home address.
                                        </p>
                                    )}
                                </div>

                                {/* Date Selector */}
                                <div className="mb-6">
                                    <label className="text-xs font-bold text-akcen-muted uppercase mb-3 block">Select Day</label>
                                    <div className="flex justify-between bg-akcen-white p-1 rounded-xl border border-akcen-gray">
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                                            <button 
                                                key={day}
                                                onClick={() => setSelectedDate(day)}
                                                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${selectedDate === day ? 'bg-white shadow-sm text-akcen-blue' : 'text-akcen-muted hover:text-akcen-text'}`}
                                            >
                                                {day}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Time Slots */}
                                <div className="mb-8">
                                    <label className="text-xs font-bold text-akcen-muted uppercase mb-3 block">Available Slots</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {(AVAILABLE_SLOTS[selectedDate as keyof typeof AVAILABLE_SLOTS] || []).map(time => (
                                            <button 
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`py-3 rounded-xl border text-sm font-bold transition-all duration-200
                                                    ${selectedTime === time 
                                                        ? 'bg-akcen-blue text-white border-akcen-blue shadow-md' 
                                                        : 'bg-white text-akcen-text border-akcen-gray hover:border-akcen-blue hover:text-akcen-blue'
                                                    }
                                                `}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button 
                                    disabled={!selectedTime}
                                    onClick={handleConfirmBooking}
                                    className="w-full py-4 bg-akcen-text text-white rounded-xl font-bold text-sm shadow-lg hover:bg-akcen-text/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                >
                                    Confirm {sessionType === 'in-person' ? 'Home Visit' : 'Video Session'} {selectedTime ? `(${selectedTime})` : ''}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        )}

        {/* Header - Styled like the reference image */}
        <header className="h-24 flex items-center justify-between px-8 sticky top-0 z-20 transition-all duration-300 bg-akcen-white/90 backdrop-blur-md border-b border-transparent">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onToggleSidebar}
              className="p-2 text-akcen-muted hover:text-akcen-blue -ml-2"
            >
              <Menu size={28} />
            </button>
            
            <div className="flex flex-col">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-akcen-text tracking-tight leading-none">Stats</h1>
              <p className="text-sm text-akcen-muted font-sans font-medium mt-1">Academic Performance & History</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 pl-2 h-8 relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 transition-colors ${showNotifications ? 'text-akcen-blue bg-blue-50 rounded-full' : 'text-akcen-muted hover:text-akcen-blue'}`}
              >
                <Bell size={24} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-akcen-white"></span>
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

        {/* Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-10">
          
          {/* Main Hero Section: Chart + Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Chart Card */}
            <div className="lg:col-span-8 bg-white rounded-[2rem] p-8 border border-akcen-gray shadow-card relative overflow-hidden group">
              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <div>
                   <h2 className="text-xl font-serif font-bold flex items-center gap-3 text-akcen-text">
                     <span className="w-10 h-10 rounded-full bg-akcen-blue/10 flex items-center justify-center text-akcen-blue">
                        <TrendingUp size={20} />
                     </span>
                     {getChartTitle()}
                   </h2>
                </div>
                
                <div className="flex bg-akcen-white p-1.5 rounded-full border border-akcen-gray mt-4 sm:mt-0">
                   {[
                       { id: 'daily', label: 'Daily' }, 
                       { id: 'weekly', label: 'Weekly' }, 
                       { id: 'cumulative', label: 'Cumulative' }
                   ].map((tab) => (
                     <button 
                        key={tab.id}
                        onClick={() => setChartMode(tab.id as any)}
                        className={`px-5 py-2 text-xs font-bold rounded-full transition-all font-sans uppercase tracking-wide ${chartMode === tab.id ? 'bg-akcen-blue text-white shadow-md' : 'text-akcen-muted hover:text-akcen-text'}`}
                     >
                       {tab.label}
                     </button>
                   ))}
                </div>
              </div>

              <div className="relative h-80">
                 <ProgressSCurve data={getChartData()} mode={chartMode} />
              </div>
            </div>

            {/* Right: Daily Goal & Aggregated Stats Grid */}
            <div className="lg:col-span-4 flex flex-col gap-6">
               
               {/* Daily Goal Section */}
               <DailyGoalCard current={todayProgress} target={todayTarget} />

               {/* Weekly Metrics */}
               <div>
                  <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="text-akcen-text font-serif font-bold text-lg">Attributes</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <StatsCard 
                      title="Tasks Completed" 
                      value={actualWorksheets}
                      target={targetWorksheets}
                      icon={<FileText size={18} />} 
                      trend={worksheetTrend}
                      trendUp={isWorksheetAhead}
                    />
                    <StatsCard 
                      title="Accuracy" 
                      value="88%" 
                      icon={<Trophy size={18} />} 
                      trend="+5%"
                      trendUp={true}
                    />
                    <StatsCard 
                      title="Focus Time" 
                      value="45m" 
                      icon={<Clock size={18} />} 
                    />
                    <StatsCard 
                      title="Topics Mastered" 
                      value="4" 
                      icon={<Zap size={18} />} 
                    />
                  </div>
               </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Col 1: Completed Chapters */}
            <div className="flex flex-col space-y-4">
               <div className="flex justify-between items-center px-2">
                 <h3 className="font-serif font-bold text-akcen-text text-lg">
                    Activity History
                 </h3>
                 <button onClick={() => onNavigate('worksheets')} className="text-xs text-akcen-muted hover:text-akcen-blue font-bold uppercase tracking-wide transition-colors">View All</button>
               </div>
               {/* Passed onNavigate prop to enable clicking */}
               <WorksheetList 
                  events={MOCK_EVENTS.filter(e => e.status === 'completed' || e.status === 'in-progress')} 
                  onNavigate={onNavigate}
               />
            </div>

            {/* Col 2: Chapter Review Center */}
            <div className="bg-orange-50/50 rounded-[2rem] border border-orange-100 p-6 flex flex-col relative overflow-hidden">
               {/* Decor */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-30 -mr-10 -mt-10"></div>

               <div className="flex justify-between items-center mb-6 relative z-10">
                 <h3 className="font-serif font-bold text-akcen-text text-lg flex items-center gap-2">
                    <Microscope size={18} className="text-orange-500" /> Targeted Review
                 </h3>
                 <span className="text-xs font-bold bg-white text-orange-600 px-3 py-1 rounded-full shadow-sm">3 Focus Areas</span>
               </div>

               <div className="flex-1 space-y-4 relative z-10">
                  {/* Review Item 1 */}
                  <div 
                    onClick={() => onNavigate('worksheets')}
                    className="bg-white/60 p-4 rounded-2xl border border-white/50 hover:bg-white hover:shadow-soft transition-all cursor-pointer group"
                  >
                    <div className="flex gap-3">
                      <div className="mt-1">
                        <div className="w-8 h-8 rounded-full bg-akcen-blue/20 flex items-center justify-center text-akcen-blue">
                           <Target size={16} />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-akcen-text font-serif group-hover:text-akcen-blue transition-colors">Ch 3: Kinematics 2D</h4>
                        <p className="text-xs text-akcen-muted mt-1 leading-relaxed font-sans">
                          Review projectile motion concepts. 2 Questions incorrect.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Review Item 2 */}
                  <div 
                    onClick={() => onNavigate('worksheets')}
                    className="bg-white/60 p-4 rounded-2xl border border-white/50 hover:bg-white hover:shadow-soft transition-all cursor-pointer group"
                  >
                    <div className="flex gap-3">
                       <div className="mt-1">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                           <AlertCircle size={16} />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-akcen-text font-serif group-hover:text-akcen-blue transition-colors">Ch 4: Newton's Laws</h4>
                        <p className="text-xs text-akcen-muted mt-1 leading-relaxed font-sans">
                          Mistakes in Free Body Diagrams found.
                        </p>
                      </div>
                    </div>
                  </div>
               </div>
               
               <button 
                onClick={() => onNavigate('worksheets')}
                className="w-full mt-4 bg-orange-500 text-white py-3 rounded-xl font-medium text-sm hover:bg-orange-600 transition-colors shadow-lg font-sans border-b-4 border-orange-700 active:border-b-0 active:translate-y-1"
               >
                 Start Review
               </button>
            </div>

            {/* Col 3: Mentors */}
            <div className="bg-white rounded-[2rem] border border-akcen-gray p-6 flex flex-col shadow-card">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="font-serif font-bold text-akcen-text text-lg">
                    Faculty Team
                 </h3>
                 <span className="text-xs font-medium text-akcen-blue bg-blue-50 px-2 py-1 rounded-lg">Online Now</span>
               </div>
               
               <div className="flex-1 space-y-4">
                  {MOCK_MENTORS.map(user => (
                    <div 
                      key={user.id} 
                      onClick={() => handleOpenBooking(user)}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-akcen-white transition-colors cursor-pointer border border-transparent hover:border-akcen-gray"
                    >
                       <div className="flex items-center gap-3">
                          <div className="relative">
                            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full bg-gray-200 object-cover border border-white shadow-sm" />
                            <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${
                              user.status === 'online' ? 'bg-akcen-green' : 
                              user.status === 'busy' ? 'bg-orange-400' : 'bg-gray-400'
                            }`}></div>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-akcen-text font-serif group-hover:text-akcen-blue transition-colors">{user.name}</p>
                            <p className="text-[10px] uppercase font-bold text-akcen-blue font-sans">{user.level}</p>
                          </div>
                       </div>
                       <div className="flex gap-1">
                          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-akcen-white text-akcen-text hover:bg-akcen-blue hover:text-white transition-all">
                            <MessageCircle size={16} />
                          </button>
                          {user.status === 'online' && (
                             <button className="w-8 h-8 flex items-center justify-center rounded-full bg-akcen-white text-akcen-text hover:bg-akcen-green hover:text-white transition-all">
                                <Video size={16} />
                             </button>
                          )}
                       </div>
                    </div>
                  ))}
               </div>
               
               <div className="mt-4 pt-4 border-t border-akcen-gray">
                  <button 
                    onClick={() => handleOpenBooking()}
                    className="w-full py-2 rounded-xl border-2 border-dashed border-akcen-gray text-akcen-muted text-xs font-bold font-sans hover:text-akcen-blue hover:border-akcen-blue hover:bg-blue-50 transition-all"
                  >
                    + Contact Instructor
                  </button>
               </div>
            </div>

          </div>
        </div>
    </div>
  );
};

export default DashboardView;
