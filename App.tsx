import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import AnalyticsView from './components/AnalyticsView';
import WorksheetsView from './components/WorksheetsView';
import CommunityView from './components/CommunityView';
import HomeView from './components/HomeView';
import SettingsView from './components/SettingsView';
import NotificationsView from './components/NotificationsView';
import MessagesView from './components/MessagesView';
import MentoringView from './components/MentoringView'; // Import
import MentorDashboardView from './components/MentorDashboardView';
import MentorStudentsView from './components/MentorStudentsView';
import MentorCurriculumView from './components/MentorCurriculumView';
import GradingView from './components/GradingView';
import { ToggleRight, ToggleLeft } from 'lucide-react'; // Import icons for toggle

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'mentor'>('student');
  // Default tabs per role
  const [activeTab, setActiveTab] = useState('home');

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const toggleRole = () => {
    const newRole = userRole === 'student' ? 'mentor' : 'student';
    setUserRole(newRole);
    setActiveTab(newRole === 'mentor' ? 'mentor-dashboard' : 'home');
  };

  const renderContent = () => {
    // --- STUDENT ROUTES ---
    if (userRole === 'student') {
        switch (activeTab) {
        case 'home':
            return <HomeView onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />;
        case 'dashboard':
            return <DashboardView onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />;
        case 'mentoring': // New Route
            return <MentoringView onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />;
        case 'analytics':
            return <AnalyticsView onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />;
        case 'worksheets':
            return <WorksheetsView onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />; 
        case 'community':
            return <CommunityView onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />;
        case 'messages':
            return <MessagesView onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />;
        case 'settings':
            return <SettingsView isMentor={false} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />;
        case 'notifications':
            return <NotificationsView onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />;
        default:
            return <DashboardView onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />;
        }
    } 
    
    // --- MENTOR ROUTES ---
    else {
        switch (activeTab) {
            case 'mentor-dashboard':
                return <MentorDashboardView onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />;
            case 'grading':
                return <GradingView onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />;
            case 'students':
                return <MentorStudentsView onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />;
            case 'curriculum':
                return <MentorCurriculumView onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />;
            case 'messages':
                return <MessagesView onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />;
            case 'settings':
                return <SettingsView isMentor={true} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />;
            default:
                return <MentorDashboardView onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />;
        }
    }
  };

  return (
    <div className="min-h-screen bg-akcen-white flex text-akcen-text font-sans selection:bg-akcen-yellow selection:text-akcen-text relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="fixed top-0 right-0 w-[50%] h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-0"></div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-akcen-text/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar 
        isOpen={sidebarOpen} 
        activeTab={activeTab} 
        onNavigate={handleNavigate} 
        isMentor={userRole === 'mentor'}
      />

      <main className="flex-1 flex flex-col min-w-0 z-10 relative h-screen overflow-hidden">
        {renderContent()}
      </main>

      {/* DEBUG: ROLE TOGGLE SWITCH (Fixed Bottom Right) */}
      <button 
        onClick={toggleRole}
        className="fixed bottom-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-full shadow-2xl font-bold text-xs flex items-center gap-2 hover:scale-105 transition-transform"
      >
        {userRole === 'student' ? <ToggleLeft size={16}/> : <ToggleRight size={16}/>}
        Switch to {userRole === 'student' ? 'Mentor' : 'Student'} View
      </button>

    </div>
  );
};

export default App;
