
import React from 'react';
import { CheckCircle2, Clock, AlertCircle, ArrowRight, Atom } from 'lucide-react';
import { WorksheetEvent } from '../types';

interface WorksheetListProps {
  events: WorksheetEvent[];
  onNavigate?: (tab: string) => void;
}

const WorksheetList: React.FC<WorksheetListProps> = ({ events, onNavigate }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="text-akcen-green" size={18} />;
      case 'in-progress': return <Clock className="text-akcen-blue" size={18} />;
      default: return <AlertCircle className="text-akcen-yellow" size={18} />;
    }
  };

  const handleClick = () => {
      if (onNavigate) {
          onNavigate('worksheets');
      }
  };

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <div 
            key={event.id} 
            onClick={handleClick}
            className="group flex items-center justify-between p-4 rounded-2xl bg-white border border-akcen-gray hover:border-akcen-blue hover:shadow-soft transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-akcen-white border border-akcen-gray group-hover:bg-blue-50 transition-colors`}>
               <Atom size={20} className="text-akcen-text group-hover:text-akcen-blue transition-colors" />
            </div>
            <div>
              <h4 className="text-sm font-serif font-bold text-akcen-text group-hover:text-akcen-blue transition-colors">{event.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-akcen-white text-akcen-muted border border-akcen-gray`}>
                  {event.subject}
                </span>
                <span className="text-xs text-akcen-muted font-sans flex items-center gap-1">
                  {event.status === 'completed' ? (
                     <>
                        • <span className="text-akcen-green font-bold">{event.score}%</span>
                     </>
                  ) : (
                     <>• Pending</>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right flex items-center gap-4">
             <div className="hidden sm:block">
                 <div className="text-[10px] text-akcen-muted uppercase font-bold text-right mb-0.5">Due Date</div>
                 <span className="text-xs text-akcen-text font-medium font-sans">
                   {new Date(event.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                 </span>
             </div>
             <div className="w-8 h-8 rounded-full bg-akcen-white flex items-center justify-center group-hover:bg-akcen-blue group-hover:text-white transition-all text-akcen-muted ml-2">
                <ArrowRight size={14} />
             </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorksheetList;
