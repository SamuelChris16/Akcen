
import React, { useState } from 'react';
import { 
  Bell, 
  Menu, 
  CheckCircle2, 
  MessageCircle, 
  Flame, 
  Zap, 
  Lock, 
  ChevronRight, 
  Trash2,
  Check
} from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../constants';

interface NotificationsViewProps {
  onToggleSidebar: () => void;
  onNavigate: (tab: string) => void;
}

const NotificationsView: React.FC<NotificationsViewProps> = ({ onToggleSidebar, onNavigate }) => {
  const [filter, setFilter] = useState<'All' | 'Unread'>('All');
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = filter === 'All' 
    ? notifications 
    : notifications.filter(n => !n.read);

  const getIcon = (type: string) => {
    switch(type) {
        case 'grade': return <CheckCircle2 size={20} className="text-akcen-green" />;
        case 'mentor': return <MessageCircle size={20} className="text-akcen-blue" />;
        case 'streak': return <Flame size={20} className="text-orange-500 fill-orange-500" />;
        case 'unlock': return <Lock size={20} className="text-purple-500" />;
        case 'system': return <Zap size={20} className="text-akcen-yellow fill-akcen-yellow" />;
        default: return <Bell size={20} className="text-akcen-muted" />;
    }
  };

  const getBgColor = (type: string) => {
    switch(type) {
        case 'grade': return 'bg-green-50 border-green-100';
        case 'mentor': return 'bg-blue-50 border-blue-100';
        case 'streak': return 'bg-orange-50 border-orange-100';
        case 'unlock': return 'bg-purple-50 border-purple-100';
        case 'system': return 'bg-yellow-50 border-yellow-100';
        default: return 'bg-akcen-white border-akcen-gray';
    }
  };

  return (
    <div className="flex flex-col h-full bg-akcen-white">
      {/* Header */}
      <header className="h-24 flex items-center justify-between px-8 sticky top-0 z-20 transition-all duration-300 bg-akcen-white/80 backdrop-blur-md border-b border-akcen-gray">
          <div className="flex items-center gap-4">
            <button 
              onClick={onToggleSidebar}
              className="lg:hidden p-2 text-akcen-muted hover:text-akcen-blue -ml-2"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif font-bold text-akcen-text tracking-tight">Notifications</h1>
              <p className="text-xs text-akcen-muted font-sans font-medium">Stay updated with your progress.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
                onClick={handleMarkAllRead}
                className="px-4 py-2 bg-white border border-akcen-gray text-akcen-text rounded-xl text-xs font-bold hover:bg-akcen-white transition-all flex items-center gap-2"
             >
                <Check size={14} />
                <span className="hidden sm:inline">Mark all read</span>
             </button>
             <button 
                onClick={handleClearAll}
                className="p-2.5 text-akcen-muted hover:text-red-500 transition-colors"
                title="Clear all"
             >
                <Trash2 size={18} />
             </button>
          </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-8 custom-scrollbar">
         <div className="max-w-3xl mx-auto flex flex-col gap-6">
            
            {/* Filter Tabs */}
            <div className="flex gap-2 p-1 bg-white rounded-xl border border-akcen-gray w-fit shadow-sm">
                {['All', 'Unread'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab as any)}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === tab ? 'bg-akcen-text text-white shadow-sm' : 'text-akcen-muted hover:text-akcen-text'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Notifications List */}
            {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-akcen-gray/50 rounded-full flex items-center justify-center text-akcen-muted mb-4">
                        <Bell size={32} />
                    </div>
                    <h3 className="font-serif font-bold text-akcen-text text-lg">All caught up!</h3>
                    <p className="text-sm text-akcen-muted">No new notifications to show.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredNotifications.map((notification) => (
                        <div 
                            key={notification.id}
                            className={`group relative flex gap-4 p-5 rounded-[1.5rem] border transition-all duration-300 hover:shadow-card cursor-pointer
                                ${notification.read ? 'bg-white border-akcen-gray opacity-80 hover:opacity-100' : 'bg-white border-akcen-blue/30 shadow-sm'}
                            `}
                            onClick={() => notification.targetTab && onNavigate(notification.targetTab)}
                        >
                            {/* Icon Box */}
                            <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border ${getBgColor(notification.type)}`}>
                                {getIcon(notification.type)}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 pt-0.5">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={`text-sm font-serif font-bold text-akcen-text ${!notification.read ? 'text-akcen-blue' : ''}`}>
                                        {notification.title}
                                    </h4>
                                    <span className="text-[10px] text-akcen-muted font-bold whitespace-nowrap ml-2">
                                        {notification.time}
                                    </span>
                                </div>
                                <p className="text-sm text-akcen-text/80 font-sans leading-relaxed mb-3">
                                    {notification.message}
                                </p>
                                
                                {notification.actionLabel && (
                                    <button className="text-xs font-bold text-akcen-blue flex items-center gap-1 group-hover:underline">
                                        {notification.actionLabel} <ChevronRight size={12} />
                                    </button>
                                )}
                            </div>

                            {/* Unread Dot */}
                            {!notification.read && (
                                <div className="absolute top-6 right-6 w-2 h-2 bg-akcen-blue rounded-full"></div>
                            )}
                        </div>
                    ))}
                </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default NotificationsView;
