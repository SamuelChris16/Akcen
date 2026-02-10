
import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  LogOut, 
  Camera, 
  Check, 
  ChevronRight, 
  Menu,
  CreditCard,
  Zap,
  Target,
  Smartphone,
  Users,
  Plus,
  Shield
} from 'lucide-react';

interface SettingsViewProps {
  onToggleSidebar?: () => void;
  onNavigate: (tab: string) => void;
  isMentor?: boolean;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onToggleSidebar, onNavigate, isMentor = false }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [dailyTarget, setDailyTarget] = useState(3);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);

  // Define tabs based on role
  const studentTabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'learning', label: 'Learning Goals', icon: Target },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Plan & Billing', icon: CreditCard },
  ];

  const mentorTabs = [
    { id: 'profile', label: 'Public Profile', icon: User },
    { id: 'classroom', label: 'Class Settings', icon: Users },
    // Schedule tab removed from here
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const tabs = isMentor ? mentorTabs : studentTabs;

  return (
    <div className="flex flex-col h-full bg-akcen-white">
      {/* Header */}
      <header className="h-24 flex items-center justify-between px-8 sticky top-0 z-20 transition-all duration-300 bg-akcen-white/80 backdrop-blur-md border-b border-akcen-gray">
          <div className="flex items-center gap-4">
            {onToggleSidebar && (
              <button 
                onClick={onToggleSidebar}
                className="lg:hidden p-2 text-akcen-muted hover:text-akcen-blue -ml-2"
              >
                <Menu size={24} />
              </button>
            )}
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif font-bold text-akcen-text tracking-tight">Settings</h1>
              <p className="text-xs text-akcen-muted font-sans font-medium">Manage your account and preferences.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="px-6 py-2.5 bg-akcen-text text-white rounded-xl text-xs font-bold shadow-lg hover:bg-akcen-text/90 transition-all flex items-center gap-2">
                <Check size={14} strokeWidth={3} />
                Save Changes
             </button>
          </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-8 custom-scrollbar">
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT: Navigation (3 Cols) */}
            <div className="lg:col-span-3 flex flex-col gap-6">
                <div className="bg-white rounded-[2rem] p-4 border border-akcen-gray shadow-card">
                   <nav className="space-y-1">
                      {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button 
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200
                                ${isActive 
                                    ? 'bg-akcen-blue text-white shadow-md font-bold' 
                                    : 'text-akcen-muted hover:bg-akcen-white hover:text-akcen-text'
                                }
                              `}
                            >
                              <Icon size={18} className={isActive ? 'text-white' : 'text-akcen-muted'} />
                              <span className="font-sans">{tab.label}</span>
                              {isActive && <ChevronRight size={14} className="ml-auto opacity-70" />}
                            </button>
                        );
                      })}
                   </nav>
                </div>

                <div className="bg-red-50 rounded-[2rem] p-6 border border-red-100 shadow-card">
                    <h4 className="font-serif font-bold text-red-600 mb-2">Danger Zone</h4>
                    <p className="text-xs text-red-400 mb-4 leading-relaxed">
                        Sign out of your account on all devices.
                    </p>
                    <button className="w-full py-3 bg-white border border-red-100 text-red-500 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2">
                        <LogOut size={14} />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* RIGHT: Content (9 Cols) */}
            <div className="lg:col-span-9 flex flex-col gap-6">
               
               {/* TAB: PROFILE (Shared structure but different data) */}
               {activeTab === 'profile' && (
                   <div className="bg-white rounded-[2rem] p-8 border border-akcen-gray shadow-card animate-in fade-in duration-300">
                       <div className="flex items-center gap-3 mb-6 pb-6 border-b border-akcen-gray">
                           <div className="p-2 bg-akcen-blue/10 rounded-lg text-akcen-blue">
                              <User size={20} />
                           </div>
                           <h2 className="text-xl font-serif font-bold text-akcen-text">Public Profile</h2>
                       </div>

                       <div className="flex flex-col md:flex-row gap-8 items-start">
                           {/* Avatar Upload */}
                           <div className="flex flex-col items-center gap-4">
                               <div className="relative group cursor-pointer">
                                   <div className="w-32 h-32 rounded-full p-1 border-2 border-akcen-gray group-hover:border-akcen-blue transition-colors">
                                       <img src={isMentor ? "https://picsum.photos/200/200?random=5" : "https://picsum.photos/200/200"} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                   </div>
                                   <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                       <Camera size={24} className="text-white" />
                                   </div>
                               </div>
                               <button className="text-xs font-bold text-akcen-blue hover:underline">Change Photo</button>
                           </div>

                           {/* Form Fields */}
                           <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="space-y-2">
                                   <label className="text-xs font-bold text-akcen-muted uppercase tracking-wider">Full Name</label>
                                   <input 
                                     type="text" 
                                     defaultValue={isMentor ? "Dr. Emily Chen" : "Alex Morgan"}
                                     className="w-full bg-akcen-white border border-akcen-gray rounded-xl px-4 py-3 text-sm font-medium text-akcen-text focus:outline-none focus:border-akcen-blue focus:ring-4 focus:ring-akcen-blue/5 transition-all"
                                   />
                               </div>
                               <div className="space-y-2">
                                   <label className="text-xs font-bold text-akcen-muted uppercase tracking-wider">{isMentor ? "Title / Role" : "Username"}</label>
                                   <input 
                                     type="text" 
                                     defaultValue={isMentor ? "Senior Physics Lecturer" : "@alexphysics"} 
                                     className="w-full bg-akcen-white border border-akcen-gray rounded-xl px-4 py-3 text-sm font-medium text-akcen-text focus:outline-none focus:border-akcen-blue focus:ring-4 focus:ring-akcen-blue/5 transition-all"
                                   />
                               </div>
                               <div className="space-y-2 md:col-span-2">
                                   <label className="text-xs font-bold text-akcen-muted uppercase tracking-wider">Bio</label>
                                   <textarea 
                                     rows={3}
                                     defaultValue={isMentor ? "Passionate about making complex physics accessible to everyone." : "Aspiring Astrophysicist. Loving the Kinematics grind! 🚀"} 
                                     className="w-full bg-akcen-white border border-akcen-gray rounded-xl px-4 py-3 text-sm font-medium text-akcen-text focus:outline-none focus:border-akcen-blue focus:ring-4 focus:ring-akcen-blue/5 transition-all resize-none"
                                   />
                               </div>
                               <div className="space-y-2">
                                   <label className="text-xs font-bold text-akcen-muted uppercase tracking-wider">Email</label>
                                   <div className="relative">
                                     <input 
                                       type="email" 
                                       defaultValue={isMentor ? "emily.c@university.edu" : "alex.morgan@example.com"} 
                                       className="w-full bg-akcen-white border border-akcen-gray rounded-xl px-4 py-3 text-sm font-medium text-akcen-text focus:outline-none focus:border-akcen-blue focus:ring-4 focus:ring-akcen-blue/5 transition-all pr-10"
                                     />
                                     <Lock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-akcen-muted" />
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               )}

               {/* TAB: CLASSROOM (Mentor Only) */}
               {activeTab === 'classroom' && isMentor && (
                   <div className="bg-white rounded-[2rem] p-8 border border-akcen-gray shadow-card animate-in fade-in duration-300">
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-akcen-gray">
                           <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                              <Users size={20} />
                           </div>
                           <h2 className="text-xl font-serif font-bold text-akcen-text">Classroom Configuration</h2>
                        </div>
                        
                        <div className="space-y-6">
                             <div className="flex items-center justify-between p-4 bg-akcen-white rounded-xl border border-akcen-gray">
                                 <div>
                                     <h4 className="font-bold text-sm text-akcen-text">Cohort Name</h4>
                                     <p className="text-xs text-akcen-muted">Physics Level 2 • Sem 2</p>
                                 </div>
                                 <button className="text-xs font-bold text-akcen-blue hover:underline">Edit</button>
                             </div>
                             
                             <div>
                                 <h4 className="font-bold text-sm text-akcen-text mb-2">Enrollment Key</h4>
                                 <div className="flex gap-2">
                                     <input type="text" value="PHYS-2024-SEM2" readOnly className="flex-1 bg-akcen-white border border-akcen-gray rounded-xl px-4 py-2 text-sm font-mono text-akcen-text" />
                                     <button className="px-4 py-2 bg-akcen-text text-white rounded-xl text-xs font-bold">Copy</button>
                                     <button className="px-4 py-2 bg-white border border-akcen-gray text-akcen-text rounded-xl text-xs font-bold">Reset</button>
                                 </div>
                             </div>

                             <div>
                                 <h4 className="font-bold text-sm text-akcen-text mb-2">Class Permissions</h4>
                                 <div className="space-y-3">
                                     {['Allow students to see class leaderboard', 'Enable peer discussions', 'Auto-release solution after deadline'].map((perm, i) => (
                                         <label key={i} className="flex items-center gap-3 cursor-pointer">
                                             <input type="checkbox" defaultChecked className="w-4 h-4 text-akcen-blue rounded border-gray-300 focus:ring-akcen-blue" />
                                             <span className="text-sm text-akcen-text">{perm}</span>
                                         </label>
                                     ))}
                                 </div>
                             </div>
                        </div>
                   </div>
               )}

               {/* TAB: LEARNING GOALS (Student Only) */}
               {activeTab === 'learning' && !isMentor && (
                  <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                      <div className="bg-white rounded-[2rem] p-8 border border-akcen-gray shadow-card">
                           <div className="flex items-center gap-3 mb-6 pb-6 border-b border-akcen-gray">
                               <div className="p-2 bg-akcen-yellow rounded-lg text-orange-700">
                                  <Target size={20} />
                               </div>
                               <h2 className="text-xl font-serif font-bold text-akcen-text">Learning Intensity</h2>
                           </div>

                           <div className="space-y-8">
                               <div>
                                  <div className="flex justify-between items-end mb-4">
                                     <div>
                                        <label className="text-sm font-bold text-akcen-text">Daily Worksheet Target</label>
                                        <p className="text-xs text-akcen-muted mt-1">How many problem sets do you want to crush daily?</p>
                                     </div>
                                     <div className="text-2xl font-serif font-bold text-akcen-blue">{dailyTarget} <span className="text-xs font-sans text-akcen-muted">/ day</span></div>
                                  </div>
                                  <input 
                                    type="range" 
                                    min="1" 
                                    max="10" 
                                    value={dailyTarget} 
                                    onChange={(e) => setDailyTarget(parseInt(e.target.value))}
                                    className="w-full h-3 bg-akcen-gray rounded-lg appearance-none cursor-pointer accent-akcen-blue hover:accent-blue-600 transition-all"
                                  />
                                  <div className="flex justify-between text-[10px] font-bold text-akcen-muted mt-2 uppercase">
                                     <span>Casual (1)</span>
                                     <span>Serious (5)</span>
                                     <span>Insane (10)</span>
                                  </div>
                               </div>
                           </div>
                      </div>

                      <div className="bg-white rounded-[2rem] p-8 border border-akcen-gray shadow-card">
                           <div className="flex items-center gap-3 mb-6 pb-6 border-b border-akcen-gray">
                               <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                  <Shield size={20} />
                               </div>
                               <h2 className="text-xl font-serif font-bold text-akcen-text">Focus Areas</h2>
                           </div>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics', 'Relativity'].map((topic) => (
                                <label key={topic} className="flex items-center gap-3 p-4 rounded-xl border border-akcen-gray cursor-pointer hover:bg-akcen-white transition-all group">
                                   <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-akcen-blue focus:ring-akcen-blue" defaultChecked={['Mechanics', 'Optics'].includes(topic)} />
                                   <span className="text-sm font-medium text-akcen-text group-hover:text-akcen-blue transition-colors">{topic}</span>
                                </label>
                              ))}
                           </div>
                      </div>
                  </div>
               )}

               {/* TAB: NOTIFICATIONS (Shared) */}
               {activeTab === 'notifications' && (
                   <div className="bg-white rounded-[2rem] p-8 border border-akcen-gray shadow-card animate-in fade-in duration-300">
                       <div className="flex items-center gap-3 mb-6 pb-6 border-b border-akcen-gray">
                           <div className="p-2 bg-red-50 rounded-lg text-red-500">
                              <Bell size={20} />
                           </div>
                           <h2 className="text-xl font-serif font-bold text-akcen-text">Notifications</h2>
                       </div>

                       <div className="space-y-6">
                           <div className="flex items-center justify-between p-4 bg-akcen-white rounded-xl border border-transparent hover:border-akcen-gray transition-colors">
                              <div className="flex items-center gap-4">
                                 <div className="p-2 bg-white rounded-full shadow-sm text-akcen-text"><Smartphone size={18}/></div>
                                 <div>
                                    <h4 className="font-bold text-sm text-akcen-text">Push Notifications</h4>
                                    <p className="text-xs text-akcen-muted">Receive alerts on your mobile device.</p>
                                 </div>
                              </div>
                              <div 
                                onClick={() => setPushNotifs(!pushNotifs)}
                                className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300 ${pushNotifs ? 'bg-akcen-blue' : 'bg-gray-300'}`}
                              >
                                 <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${pushNotifs ? 'translate-x-5' : 'translate-x-0'}`}></div>
                              </div>
                           </div>

                           <div className="flex items-center justify-between p-4 bg-akcen-white rounded-xl border border-transparent hover:border-akcen-gray transition-colors">
                              <div className="flex items-center gap-4">
                                 <div className="p-2 bg-white rounded-full shadow-sm text-akcen-text"><Menu size={18}/></div>
                                 <div>
                                    <h4 className="font-bold text-sm text-akcen-text">Email Updates</h4>
                                    <p className="text-xs text-akcen-muted">Weekly summaries and mentor feedback.</p>
                                 </div>
                              </div>
                              <div 
                                onClick={() => setEmailNotifs(!emailNotifs)}
                                className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300 ${emailNotifs ? 'bg-akcen-blue' : 'bg-gray-300'}`}
                              >
                                 <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${emailNotifs ? 'translate-x-5' : 'translate-x-0'}`}></div>
                              </div>
                           </div>

                           <div className="pt-6 border-t border-akcen-gray">
                               <h4 className="text-xs font-bold text-akcen-muted uppercase tracking-wider mb-4">Notify me when...</h4>
                               <div className="space-y-3">
                                   {isMentor ? 
                                       ['A student submits work', 'A student is flagged at-risk', 'Daily summary is ready'].map((item, i) => (
                                           <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                               <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${i < 2 ? 'bg-akcen-blue border-akcen-blue' : 'border-akcen-muted/50 bg-white'}`}>
                                                  {i < 2 && <Check size={12} className="text-white" />}
                                               </div>
                                               <span className="text-sm text-akcen-text group-hover:text-akcen-blue transition-colors">{item}</span>
                                           </label>
                                       ))
                                   :
                                       ['A worksheet is graded', 'A mentor replies to my message', 'I reach a new streak milestone', 'New worksheets are assigned'].map((item, i) => (
                                           <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                               <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${i < 3 ? 'bg-akcen-blue border-akcen-blue' : 'border-akcen-muted/50 bg-white'}`}>
                                                  {i < 3 && <Check size={12} className="text-white" />}
                                               </div>
                                               <span className="text-sm text-akcen-text group-hover:text-akcen-blue transition-colors">{item}</span>
                                           </label>
                                       ))
                                   }
                               </div>
                           </div>
                       </div>
                   </div>
               )}

               {/* TAB: BILLING (Student Only) */}
               {activeTab === 'billing' && !isMentor && (
                   <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                       
                       {/* Current Plan Card */}
                       <div className="bg-gradient-to-br from-slate-800 to-akcen-text rounded-[2rem] p-8 shadow-card text-white relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                           
                           <div className="flex justify-between items-start mb-8 relative z-10">
                              <div>
                                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-akcen-yellow text-orange-900 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                                     <Zap size={10} fill="currentColor" /> Pro Plan
                                 </div>
                                 <h2 className="text-3xl font-serif font-bold">Akcen Pro</h2>
                                 <p className="text-blue-200 text-sm mt-1">Next billing date: July 12, 2024</p>
                              </div>
                              <div className="text-right">
                                 <div className="text-3xl font-bold">$12<span className="text-base font-medium text-blue-200">/mo</span></div>
                              </div>
                           </div>

                           <div className="flex items-center gap-4 relative z-10">
                              <button className="px-6 py-3 bg-white text-akcen-text rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors">
                                 Manage Subscription
                              </button>
                              <button className="px-6 py-3 bg-transparent border border-white/20 text-white rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">
                                 View Invoices
                              </button>
                           </div>
                       </div>

                       <div className="bg-white rounded-[2rem] p-8 border border-akcen-gray shadow-card">
                          <h3 className="font-serif font-bold text-akcen-text mb-4">Payment Method</h3>
                          <div className="flex items-center justify-between p-4 border border-akcen-gray rounded-xl">
                              <div className="flex items-center gap-4">
                                  <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center text-white font-bold text-[10px] tracking-widest">VISA</div>
                                  <div>
                                     <p className="text-sm font-bold text-akcen-text">Visa ending in 4242</p>
                                     <p className="text-xs text-akcen-muted">Expires 12/25</p>
                                  </div>
                              </div>
                              <button className="text-xs font-bold text-akcen-blue hover:underline">Edit</button>
                          </div>
                          <button className="mt-4 flex items-center gap-2 text-xs font-bold text-akcen-muted hover:text-akcen-text transition-colors">
                             <Plus size={14} /> Add new payment method
                          </button>
                       </div>
                   </div>
               )}

            </div>
         </div>
      </div>
    </div>
  );
};

export default SettingsView;
