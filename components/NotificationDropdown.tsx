
import React from 'react';
import { 
  Bell, 
  CheckCircle2, 
  MessageCircle, 
  Flame, 
  Zap, 
  Lock, 
  ChevronRight,
  X
} from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationDropdownProps {
  notifications: NotificationItem[];
  onNavigate: (tab: string) => void;
  onClose: () => void;
  onMarkRead: (id: string) => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ notifications, onNavigate, onClose, onMarkRead }) => {
  
  const getIcon = (type: string) => {
    switch(type) {
        case 'grade': return <CheckCircle2 size={16} className="text-akcen-green" />;
        case 'mentor': return <MessageCircle size={16} className="text-akcen-blue" />;
        case 'streak': return <Flame size={16} className="text-orange-500 fill-orange-500" />;
        case 'unlock': return <Lock size={16} className="text-purple-500" />;
        case 'system': return <Zap size={16} className="text-akcen-yellow fill-akcen-yellow" />;
        default: return <Bell size={16} className="text-akcen-muted" />;
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
    <>
        {/* Backdrop to close when clicking outside */}
        <div className="fixed inset-0 z-40 cursor-default" onClick={onClose}></div>

        {/* Dropdown Content */}
        <div className="absolute right-0 top-12 w-80 md:w-96 bg-white/95 backdrop-blur-xl rounded-[1.5rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-akcen-gray z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
            
            <div className="flex items-center justify-between p-4 border-b border-akcen-gray/50">
                <h3 className="font-serif font-bold text-akcen-text">Notifications</h3>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-akcen-white text-akcen-muted transition-colors">
                    <X size={16} />
                </button>
            </div>

            <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                    <div className="p-8 text-center text-akcen-muted">
                        <p className="text-xs">No new notifications.</p>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {notifications.slice(0, 5).map((notification) => (
                            <div 
                                key={notification.id}
                                onClick={() => {
                                    if(notification.targetTab) onNavigate(notification.targetTab);
                                    onMarkRead(notification.id);
                                }}
                                className={`flex gap-3 p-4 border-b border-akcen-gray/50 hover:bg-akcen-blue/5 transition-colors cursor-pointer ${!notification.read ? 'bg-akcen-white/50' : ''}`}
                            >
                                <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border ${getBgColor(notification.type)}`}>
                                    {getIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5">
                                        <h4 className={`text-xs font-bold font-serif truncate pr-2 ${!notification.read ? 'text-akcen-blue' : 'text-akcen-text'}`}>
                                            {notification.title}
                                        </h4>
                                        <span className="text-[9px] text-akcen-muted font-bold whitespace-nowrap opacity-70">
                                            {notification.time}
                                        </span>
                                    </div>
                                    <p className="text-xs text-akcen-text/80 font-sans line-clamp-2 leading-relaxed">
                                        {notification.message}
                                    </p>
                                </div>
                                {!notification.read && <div className="w-1.5 h-1.5 bg-akcen-blue rounded-full mt-2 flex-shrink-0"></div>}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-2 bg-akcen-white/50 border-t border-akcen-gray/50">
                <button 
                    onClick={() => {
                        onNavigate('notifications');
                        onClose();
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-akcen-muted hover:text-akcen-text hover:bg-white transition-all flex items-center justify-center gap-1"
                >
                    View All Activity <ChevronRight size={12} />
                </button>
            </div>
        </div>
    </>
  );
};

export default NotificationDropdown;
