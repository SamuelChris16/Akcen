
import React, { useState } from 'react';
import { 
  Search, 
  Menu, 
  Phone, 
  Video, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Smile, 
  CheckCheck,
  Circle,
  Clock,
  MessageCircle
} from 'lucide-react';
import { Conversation, Message, User } from '../types';

// Mock Data for Messages
const CURRENT_USER_ID = 'me';

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    user: { id: 'u1', name: 'Dr. Emily Chen', avatar: 'https://picsum.photos/40/40?random=20', status: 'online', role: 'Mentor' },
    lastMessage: 'Great job on the vector worksheet! Keep it up.',
    lastTime: '10:30 AM',
    unread: 2,
    messages: [
      { id: 'm1', senderId: 'u1', text: 'Hi Alex, I reviewed your submission.', timestamp: '10:28 AM', isMe: false },
      { id: 'm2', senderId: 'u1', text: 'Great job on the vector worksheet! Keep it up.', timestamp: '10:30 AM', isMe: false },
    ]
  },
  {
    id: 'c2',
    user: { id: 'u2', name: 'Study Squad Alpha', avatar: 'https://picsum.photos/40/40?random=99', status: 'offline', role: 'Group' },
    lastMessage: 'Jessica: Anyone solved Q5 yet?',
    lastTime: 'Yesterday',
    unread: 0,
    messages: [
      { id: 'm3', senderId: 'me', text: 'I am stuck on Q4 honestly.', timestamp: 'Yesterday', isMe: true },
      { id: 'm4', senderId: 'u3', text: 'Anyone solved Q5 yet?', timestamp: 'Yesterday', isMe: false },
    ]
  },
  {
    id: 'c3',
    user: { id: 'u3', name: 'Prof. Alan Grant', avatar: 'https://picsum.photos/40/40?random=21', status: 'busy', role: 'Lab Instructor' },
    lastMessage: 'Please submit the lab report by Friday.',
    lastTime: 'Mon',
    unread: 0,
    messages: [
       { id: 'm5', senderId: 'u3', text: 'Please submit the lab report by Friday.', timestamp: 'Mon', isMe: false }
    ]
  }
];

interface MessagesViewProps {
  onToggleSidebar?: () => void;
  onNavigate: (tab: string) => void;
}

const MessagesView: React.FC<MessagesViewProps> = ({ onToggleSidebar }) => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>('c1');
  const [inputText, setInputText] = useState('');
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);

  const activeConversation = conversations.find(c => c.id === selectedChatId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedChatId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: CURRENT_USER_ID,
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setConversations(prev => prev.map(c => {
      if (c.id === selectedChatId) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessage: inputText,
          lastTime: 'Just now'
        };
      }
      return c;
    }));

    setInputText('');
  };

  return (
    <div className="flex h-full bg-akcen-white overflow-hidden">
      
      {/* LEFT PANEL: Chat List */}
      <div className={`w-full md:w-80 lg:w-96 flex-col bg-white border-r border-akcen-gray ${selectedChatId ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-akcen-gray flex-shrink-0">
          <div className="flex items-center gap-3">
             {onToggleSidebar && (
              <button onClick={onToggleSidebar} className="lg:hidden text-akcen-muted mr-2">
                <Menu size={24} />
              </button>
             )}
             <h1 className="text-2xl font-serif font-bold text-akcen-text">Messages</h1>
          </div>
          <button className="p-2 bg-akcen-white rounded-full text-akcen-blue hover:bg-akcen-blue hover:text-white transition-colors">
            <Search size={18} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
           {conversations.map(chat => (
             <div 
               key={chat.id}
               onClick={() => setSelectedChatId(chat.id)}
               className={`group flex gap-4 p-4 rounded-2xl cursor-pointer transition-all border
                 ${selectedChatId === chat.id 
                    ? 'bg-akcen-blue text-white shadow-md border-akcen-blue' 
                    : 'bg-white border-transparent hover:bg-akcen-white hover:border-akcen-gray'
                 }
               `}
             >
                <div className="relative flex-shrink-0">
                   <img src={chat.user.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-white" alt={chat.user.name} />
                   {chat.user.status === 'online' && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>}
                   {chat.user.status === 'busy' && <div className="absolute bottom-0 right-0 w-3 h-3 bg-orange-400 rounded-full border-2 border-white"></div>}
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-baseline mb-1">
                      <h4 className={`text-sm font-serif font-bold truncate ${selectedChatId === chat.id ? 'text-white' : 'text-akcen-text'}`}>
                        {chat.user.name}
                      </h4>
                      <span className={`text-[10px] font-medium ${selectedChatId === chat.id ? 'text-blue-100' : 'text-akcen-muted'}`}>
                        {chat.lastTime}
                      </span>
                   </div>
                   <p className={`text-xs truncate ${selectedChatId === chat.id ? 'text-blue-100' : 'text-akcen-muted'}`}>
                     {chat.lastMessage}
                   </p>
                </div>
                {chat.unread > 0 && selectedChatId !== chat.id && (
                  <div className="flex items-center">
                    <span className="w-5 h-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full">
                      {chat.unread}
                    </span>
                  </div>
                )}
             </div>
           ))}
        </div>
      </div>

      {/* RIGHT PANEL: Active Chat */}
      {activeConversation ? (
        <div className={`flex-1 flex flex-col bg-[#FDFDFD] ${!selectedChatId ? 'hidden md:flex' : 'flex'}`}>
          
          {/* Chat Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-akcen-gray bg-white/80 backdrop-blur-md sticky top-0 z-10">
             <div className="flex items-center gap-4">
                <button onClick={() => setSelectedChatId(null)} className="md:hidden text-akcen-muted">
                   <Menu size={24} className="rotate-180" /> {/* Back Icon Sim */}
                </button>
                <div className="relative">
                   <img src={activeConversation.user.avatar} className="w-10 h-10 rounded-full border border-gray-200" alt="Avatar" />
                   <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-white ${activeConversation.user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                </div>
                <div>
                   <h2 className="text-lg font-serif font-bold text-akcen-text leading-tight">
                     {activeConversation.user.name}
                   </h2>
                   <p className="text-xs text-akcen-muted font-medium">
                     {activeConversation.user.role} • {activeConversation.user.status === 'online' ? 'Active Now' : 'Last seen recently'}
                   </p>
                </div>
             </div>
             
             <div className="flex items-center gap-3 text-akcen-muted">
                <button className="p-2 hover:bg-akcen-white rounded-full transition-colors"><Phone size={20} /></button>
                <button className="p-2 hover:bg-akcen-white rounded-full transition-colors"><Video size={20} /></button>
                <div className="w-px h-6 bg-akcen-gray mx-1"></div>
                <button className="p-2 hover:bg-akcen-white rounded-full transition-colors"><MoreVertical size={20} /></button>
             </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/30">
             <div className="flex justify-center my-4">
                <span className="text-[10px] font-bold text-akcen-muted uppercase bg-akcen-gray/30 px-3 py-1 rounded-full">Today</span>
             </div>
             
             {activeConversation.messages.map((msg) => (
                <div key={msg.id} className={`flex w-full ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                   <div className={`flex flex-col max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
                      <div className={`px-5 py-3 rounded-2xl text-sm font-medium leading-relaxed shadow-sm relative group
                        ${msg.isMe 
                           ? 'bg-akcen-blue text-white rounded-tr-sm' 
                           : 'bg-white text-akcen-text border border-akcen-gray rounded-tl-sm'
                        }
                      `}>
                         {msg.text}
                         {/* Timestamp overlay on hover */}
                         <div className={`absolute bottom-0 ${msg.isMe ? '-left-12' : '-right-12'} opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-akcen-muted font-bold py-3`}>
                            {msg.timestamp}
                         </div>
                      </div>
                      {msg.isMe && (
                        <span className="text-[10px] text-akcen-muted mt-1 mr-1 flex items-center gap-1">
                           Read <CheckCheck size={12} className="text-akcen-blue" />
                        </span>
                      )}
                   </div>
                </div>
             ))}
          </div>

          {/* Input Area */}
          <div className="p-5 bg-white border-t border-akcen-gray">
             <form onSubmit={handleSendMessage} className="flex items-end gap-3 bg-akcen-white p-2 rounded-[1.5rem] border border-akcen-gray focus-within:border-akcen-blue/50 focus-within:ring-4 focus-within:ring-akcen-blue/5 transition-all">
                <button type="button" className="p-3 text-akcen-muted hover:text-akcen-blue transition-colors rounded-full hover:bg-white">
                   <Paperclip size={20} />
                </button>
                <textarea 
                  rows={1}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-akcen-text placeholder:text-akcen-muted py-3 resize-none custom-scrollbar max-h-32"
                />
                <button type="button" className="p-3 text-akcen-muted hover:text-akcen-yellow transition-colors rounded-full hover:bg-white">
                   <Smile size={20} />
                </button>
                <button 
                  type="submit"
                  disabled={!inputText.trim()} 
                  className="p-3 bg-akcen-blue text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                >
                   <Send size={18} fill="currentColor" />
                </button>
             </form>
          </div>

        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center flex-col text-akcen-muted">
           <div className="w-20 h-20 bg-akcen-gray/30 rounded-full flex items-center justify-center mb-4">
              <MessageCircle size={40} className="text-akcen-muted/50" />
           </div>
           <p className="font-serif font-bold text-lg">Select a conversation</p>
        </div>
      )}
    </div>
  );
};

export default MessagesView;
