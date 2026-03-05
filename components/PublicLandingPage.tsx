// src/components/PublicLandingPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight, TrendingUp, Zap } from 'lucide-react';

const PublicLandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-akcen-white flex flex-col text-akcen-text font-sans relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="fixed top-0 right-0 w-[60%] h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none z-0"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-akcen-blue rounded-full blur-[100px] opacity-20 z-0"></div>

      {/* Header */}
      <header className="h-24 flex items-center justify-between px-8 sm:px-12 relative z-10 border-b border-transparent">
        <div className="flex items-center gap-3 text-akcen-blue">
          <BookOpen size={32} />
          <span className="font-serif font-bold text-2xl text-akcen-text tracking-tight">Akcen</span>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="px-6 py-2.5 rounded-xl font-bold text-sm bg-white border border-akcen-gray shadow-sm hover:border-akcen-blue hover:text-akcen-blue transition-all"
        >
          Sign In
        </button>
      </header>

      {/* Hero Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-akcen-blue text-xs font-bold uppercase tracking-wide mb-8">
          <Zap size={14} /> Next-Gen Learning
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight max-w-4xl leading-tight mb-6">
          Master your curriculum with <span className="text-akcen-blue">targeted precision.</span>
        </h1>
        
        <p className="text-lg text-akcen-muted max-w-2xl mb-12 leading-relaxed">
          Track your daily activity, connect with expert mentors, and focus on exactly what you need to review to reach peak academic performance.
        </p>
        
        <button 
          onClick={() => navigate('/login')}
          className="group flex items-center gap-3 px-8 py-4 bg-akcen-text text-white rounded-2xl font-bold shadow-lg hover:bg-akcen-text/90 transition-all hover:scale-105"
        >
          Get Started 
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Mini Feature preview matching your dashboard stats card style */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
           {/* <div className="bg-white rounded-[2rem] p-6 border border-akcen-gray shadow-card flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-akcen-blue">
                <TrendingUp size={24} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg">Mastery Curve</h3>
                <p className="text-sm text-akcen-muted">Visualize your learning progress daily.</p>
              </div>
           </div> */}
           {/* You can add more features here */}
        </div>
      </main>
    </div>
  );
};

export default PublicLandingPage;