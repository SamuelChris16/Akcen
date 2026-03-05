// src/components/LoginView.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { loginUser } from '@/src/services/auth';

interface LoginViewProps {
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [role, setRole] = useState<'student' | 'mentor'>('student');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      const result = await loginUser(email, password, role);
      if (result) {
        onLogin();
        navigate('/app'); 
      }
    } catch (err) {
      setErrorMsg(`Cannot find ${role} with the given email or password.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-akcen-white flex items-center justify-center p-6 relative overflow-hidden font-sans text-akcen-text">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none z-0"></div>
      
      {/* Back to Home */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-sm font-bold text-akcen-muted hover:text-akcen-blue transition-colors z-20"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Login Card */}
      <div className="bg-white w-full max-w-md rounded-[2rem] border border-akcen-gray shadow-card p-10 relative z-10">
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-blue-50 text-akcen-blue rounded-full flex items-center justify-center mb-4">
            <BookOpen size={32} />
          </div>
          <h2 className="text-3xl font-serif font-bold tracking-tight">Welcome to Akcen</h2>
          <p className="text-sm text-akcen-muted mt-2">Enter your credentials to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Error Message Display */}
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-500 text-sm font-bold border border-red-100 rounded-xl text-center">
              {errorMsg}
            </div>
          )}

          <div className="flex bg-akcen-white p-1.5 rounded-xl border border-akcen-gray w-full">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all font-sans uppercase tracking-wide ${role === 'student' ? 'bg-black shadow-sm text-white' : 'text-akcen-muted hover:text-akcen-text'}`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole('mentor')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all font-sans uppercase tracking-wide ${role === 'mentor' ? 'bg-black shadow-sm text-white' : 'text-akcen-muted hover:text-akcen-text'}`}
            >
              Mentor
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-akcen-muted uppercase tracking-wide ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-akcen-muted">
                <User size={18} />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-akcen-white/50 border border-akcen-gray rounded-xl text-sm focus:outline-none focus:border-akcen-blue focus:ring-1 focus:ring-akcen-blue transition-all"
                placeholder={`${role === 'student' ? 'student' : 'mentor'}@akcen.edu`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
               <label className="text-xs font-bold text-akcen-muted uppercase tracking-wide">Password</label>
               <a href="#" className="text-xs font-bold text-akcen-blue hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-akcen-muted">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-akcen-white/50 border border-akcen-gray rounded-xl text-sm focus:outline-none focus:border-akcen-blue focus:ring-1 focus:ring-akcen-blue transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-akcen-text text-white py-4 rounded-xl font-bold text-sm hover:bg-akcen-text/90 transition-colors shadow-lg border-b-4 border-black active:border-b-0 active:translate-y-1 mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Authenticating...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;