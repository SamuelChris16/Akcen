import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- Existing Imports ---
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import AnalyticsView from './components/AnalyticsView';
import WorksheetsView from './components/WorksheetsView';
import CommunityView from './components/CommunityView';
import HomeView from './components/HomeView';
import SettingsView from './components/SettingsView';
import NotificationsView from './components/NotificationsView';
import MessagesView from './components/MessagesView';
import MentoringView from './components/MentoringView'; 
import MentorDashboardView from './components/MentorDashboardView';
import MentorStudentsView from './components/MentorStudentsView';
import MentorCurriculumView from './components/MentorCurriculumView';
import GradingView from './components/GradingView';
import { ToggleRight, ToggleLeft } from 'lucide-react';

import PublicLandingPage from './components/PublicLandingPage';
import LoginView from './components/LoginView';

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('jwt');
  });


  const [userRole, setUserRole] = useState<'student' | 'mentor'>(() => {
    const savedRole = localStorage.getItem('userRole');
    return (savedRole === 'mentor' || savedRole === 'student') ? savedRole : 'student';
  });


  const [activeTab, setActiveTab] = useState<string>(() => {
    const savedRole = localStorage.getItem('userRole');
    return savedRole === 'mentor' ? 'mentor-dashboard' : 'home';
  });


  const [sidebarOpen, setSidebarOpen] = useState(false);


  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  // const toggleRole = () => {
  //   const newRole = userRole === 'student' ? 'mentor' : 'student';
  //   setUserRole(newRole);
  //   setActiveTab(newRole === 'mentor' ? 'mentor-dashboard' : 'home');
  // };
  const handleLoginSuccess = () => {
    const savedRole = localStorage.getItem('userRole');
    const newRole = (savedRole === 'mentor' || savedRole === 'student') ? savedRole : 'student';
    
    setUserRole(newRole);
    setActiveTab(newRole === 'mentor' ? 'mentor-dashboard' : 'home');
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    
    setIsAuthenticated(false); 
    setActiveTab('home'); 
  };

  const renderContent = () => {
    // --- STUDENT ROUTES ---
    if (userRole.toLowerCase() === 'student') {
        switch (activeTab) {
        case 'home':
            return <HomeView onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />;
        case 'dashboard':
            return <DashboardView onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} onNavigate={handleNavigate} />;
        case 'mentoring': 
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

  const AuthenticatedLayout = (
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
        onLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col min-w-0 z-10 relative h-screen overflow-hidden">
        {renderContent()}
      </main>

      {/* DEBUG: ROLE TOGGLE SWITCH (Fixed Bottom Right)
      <button 
        onClick={toggleRole}
        className="fixed bottom-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-full shadow-2xl font-bold text-xs flex items-center gap-2 hover:scale-105 transition-transform"
      >
        {userRole === 'student' ? <ToggleLeft size={16}/> : <ToggleRight size={16}/>}
        Switch to {userRole === 'student' ? 'Mentor' : 'Student'} View
      </button> */}
    </div>
  );

  return (
    <Routes>
      {/* Public Landing Page */}
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/app" /> : <PublicLandingPage />} 
      />
      
      {/* Login Page */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? (
            <Navigate to="/app" />
          ) : (
            <LoginView onLogin={handleLoginSuccess} />
          )
        } 
      />

      {/* Your Existing Application (Protected Route) */}
      <Route 
        path="/app/*" 
        element={isAuthenticated ? AuthenticatedLayout : <Navigate to="/login" />} 
      />

      {/* Fallback: redirect any unknown URLs */}
      <Route 
        path="*" 
        element={<Navigate to={isAuthenticated ? "/app" : "/"} />} 
      />
    </Routes>
  );
};

// Wrap the app in the BrowserRouter
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;