
import React, { useState, useMemo } from 'react';
import { 
  Menu, 
  CheckCircle2, 
  ChevronRight, 
  ChevronDown, 
  ChevronLeft,
  Bot, 
  FileText,
  Check,
  X,
  ShieldCheck,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2
} from 'lucide-react';
import { StudentSubmission } from '../types';

// --- INITIAL MOCK DATA ---
const INITIAL_QUEUE: StudentSubmission[] = [
  {
    id: 'sub-1',
    studentName: 'Alex Morgan',
    studentAvatar: 'https://picsum.photos/40/40?random=10',
    worksheetTitle: 'Newton\'s Laws: Master Set',
    submittedAt: '2 days ago',
    status: 'pending',
    aisuggestedScore: 88,
    stages: [
      {
        id: 'st-1',
        title: 'Stage 1: Concept',
        pages: [
          { 
            id: 'p1-1', pageNumber: 1, imageUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=1000&auto=format&fit=crop', 
            aiConfidence: 98,
            mentorVerified: false,
            questions: [
                { id: 'q1-1-1', label: 'Q1', status: 'correct', aiVerdict: 'correct', maxPoints: 1 },
                { id: 'q1-1-2', label: 'Q2', status: 'correct', aiVerdict: 'correct', maxPoints: 1 },
                { id: 'q1-1-3', label: 'Q3', status: 'incorrect', aiVerdict: 'incorrect', maxPoints: 1 }
            ]
          },
          { 
            id: 'p1-2', pageNumber: 2, imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop',
            aiConfidence: 85,
            mentorVerified: false,
            questions: [
                { id: 'q1-2-1', label: 'Q4', status: 'correct', aiVerdict: 'correct', maxPoints: 1 },
                { id: 'q1-2-2', label: 'Q5', status: 'incorrect', aiVerdict: 'correct', maxPoints: 1 } 
            ] 
          }
        ]
      },
      {
        id: 'st-2',
        title: 'Stage 2: Basic Drill',
        pages: [
          { 
            id: 'p2-1', pageNumber: 1, imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop',
            aiConfidence: 92,
            mentorVerified: false,
            questions: [
                { id: 'q2-1-1', label: 'Q1', status: 'correct', aiVerdict: 'correct', maxPoints: 1 },
                { id: 'q2-1-2', label: 'Q2', status: 'correct', aiVerdict: 'correct', maxPoints: 1 },
                { id: 'q2-1-3', label: 'Q3', status: 'correct', aiVerdict: 'correct', maxPoints: 1 },
                { id: 'q2-1-4', label: 'Q4', status: 'correct', aiVerdict: 'correct', maxPoints: 1 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sub-2',
    studentName: 'Jessica Williams',
    studentAvatar: 'https://picsum.photos/40/40?random=50',
    worksheetTitle: 'Kinematics: Master Set',
    submittedAt: '5 hours ago',
    status: 'pending',
    stages: Array(3).fill(null).map((_, i) => ({
        id: `st-2-${i}`,
        title: `Stage ${i+1}: Module`,
        pages: [{ 
            id: `p-2-${i}-1`, 
            pageNumber: 1, 
            imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop',
            aiConfidence: 90,
            mentorVerified: false,
            questions: [
                { id: `q-2-${i}-1`, label: 'Q1', status: 'correct', aiVerdict: 'correct', maxPoints: 1 },
                { id: `q-2-${i}-2`, label: 'Q2', status: 'incorrect', aiVerdict: 'incorrect', maxPoints: 1 }
            ]
        }]
    }))
  }
];

// Mock Answer Keys
const MOCK_ANSWERS: Record<string, any[]> = {
  'Stage 1: Concept': [
    { q: 'Q1', a: "F = ma definition." },
    { q: 'Q2', a: "Unit conversion: kg -> g." },
    { q: 'Q3', a: "Newton's 3rd Law example." },
    { q: 'Q4', a: "Inertia concept." },
    { q: 'Q5', a: "Free body diagram check." }
  ],
  'Stage 2: Basic Drill': [
    { q: 'Q1', a: "a = 5 m/s²" },
    { q: 'Q2', a: "m = 50 kg" },
    { q: 'Q3', a: "F = 200 N" },
    { q: 'Q4', a: "v = 15 m/s" }
  ]
};

interface GradingViewProps {
  onToggleSidebar?: () => void;
}

const GradingView: React.FC<GradingViewProps> = ({ onToggleSidebar }) => {
  // --- STATE ---
  const [queueData, setQueueData] = useState<StudentSubmission[]>(INITIAL_QUEUE);
  
  // Navigation State
  const [selectedSubId, setSelectedSubId] = useState<string>('sub-1');
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [activePageIdx, setActivePageIdx] = useState(0);
  const [expandedStudents, setExpandedStudents] = useState<string[]>(['Alex Morgan']);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // UI State
  const [activeTab, setActiveTab] = useState<'verify' | 'key'>('verify');
  const [finalizingStage, setFinalizingStage] = useState(false);

  // --- DERIVED DATA ---
  const selectedSubmission = queueData.find(s => s.id === selectedSubId) || queueData[0];
  const currentStage = selectedSubmission.stages[activeStageIdx];
  const currentPage = currentStage.pages[activePageIdx];
  const currentAnswerKey = MOCK_ANSWERS[currentStage.title] || [];

  const currentPageScore = useMemo(() => {
     if (!currentPage) return 0;
     const total = currentPage.questions.length;
     if (total === 0) return 0;
     const correct = currentPage.questions.filter(q => q.status === 'correct').length;
     return Math.round((correct / total) * 100);
  }, [currentPage]);

  const currentStageScore = useMemo(() => {
     if (!currentStage) return 0;
     const pageScores = currentStage.pages.map(p => {
         const total = p.questions.length;
         if (total === 0) return 0;
         const correct = p.questions.filter(q => q.status === 'correct').length;
         return (correct / total) * 100;
     });
     const sum = pageScores.reduce((a, b) => a + b, 0);
     return Math.round(sum / pageScores.length);
  }, [currentStage]);


  // --- ACTIONS ---
  const handleToggleVerdict = (questionId: string) => {
      setQueueData(prev => prev.map(sub => {
          if (sub.id !== selectedSubId) return sub;
          return {
              ...sub,
              stages: sub.stages.map((stage, sIdx) => {
                  if (sIdx !== activeStageIdx) return stage;
                  return {
                      ...stage,
                      pages: stage.pages.map((page, pIdx) => {
                          if (pIdx !== activePageIdx) return page;
                          return {
                              ...page,
                              questions: page.questions.map(q => 
                                  q.id === questionId ? { ...q, status: q.status === 'correct' ? 'incorrect' : 'correct' } : q
                              )
                          };
                      })
                  };
              })
          };
      }));
  };

  const handleApprovePage = () => {
      setQueueData(prev => prev.map(sub => {
          if (sub.id !== selectedSubId) return sub;
          return {
              ...sub,
              stages: sub.stages.map((stage, sIdx) => {
                  if (sIdx !== activeStageIdx) return stage;
                  return {
                      ...stage,
                      pages: stage.pages.map((page, pIdx) => {
                          if (pIdx !== activePageIdx) return page;
                          return { ...page, mentorVerified: true };
                      })
                  };
              })
          };
      }));
      handleNextPage();
  };

  const handleFinalizeStage = () => {
      setFinalizingStage(true);
      setTimeout(() => {
          setFinalizingStage(false);
          // Here you would navigate to next stage or finish
          if (activeStageIdx < selectedSubmission.stages.length - 1) {
              setActiveStageIdx(prev => prev + 1);
              setActivePageIdx(0);
          } else {
              alert("Grading Complete for this submission!");
          }
      }, 1500);
  }

  const handleNextPage = () => {
    if (activePageIdx < currentStage.pages.length - 1) {
      setActivePageIdx(prev => prev + 1);
    } else if (activeStageIdx < selectedSubmission.stages.length - 1) {
      setActiveStageIdx(prev => prev + 1);
      setActivePageIdx(0);
    }
  };

  const handlePrevPage = () => {
    if (activePageIdx > 0) {
      setActivePageIdx(prev => prev - 1);
    } else if (activeStageIdx > 0) {
      const prevStageIdx = activeStageIdx - 1;
      setActiveStageIdx(prevStageIdx);
      setActivePageIdx(selectedSubmission.stages[prevStageIdx].pages.length - 1); 
    }
  };

  // Group by Student
  const groupedQueue = useMemo(() => {
    const groups: Record<string, StudentSubmission[]> = {};
    queueData.forEach(item => {
        if (!groups[item.studentName]) groups[item.studentName] = [];
        groups[item.studentName].push(item);
    });
    return Object.keys(groups).map(name => ({
        studentName: name,
        studentAvatar: groups[name][0].studentAvatar,
        submissions: groups[name],
        count: groups[name].length
    }));
  }, [queueData]);

  const toggleStudentExpand = (name: string) => {
    setExpandedStudents(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="flex h-full bg-akcen-white overflow-hidden relative">
      
      {/* --- LEFT SIDEBAR: QUEUE --- */}
      <div className="w-72 bg-white border-r border-akcen-gray flex flex-col flex-shrink-0 z-20 hidden lg:flex shadow-[4px_0_20px_rgba(0,0,0,0.02)]">
         <div className="h-20 px-6 border-b border-akcen-gray flex items-center justify-between flex-shrink-0">
             <div>
                <h2 className="font-serif font-bold text-akcen-text text-lg leading-none">Grading Queue</h2>
                <p className="text-[10px] text-akcen-muted font-bold uppercase tracking-wider mt-1">AI Pre-Graded</p>
             </div>
             <div className="px-2 py-0.5 bg-akcen-blue text-white text-xs font-bold rounded-full shadow-sm">
                {queueData.length}
             </div>
         </div>
         
         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
             {groupedQueue.map((group) => {
                 const isExpanded = expandedStudents.includes(group.studentName);
                 return (
                     <div key={group.studentName} className="rounded-2xl border border-akcen-gray bg-white overflow-hidden transition-all shadow-sm">
                         <div 
                            onClick={() => toggleStudentExpand(group.studentName)}
                            className="p-3 flex items-center gap-3 cursor-pointer hover:bg-akcen-white transition-colors"
                         >
                            <div className="relative">
                                <img src={group.studentAvatar} className="w-10 h-10 rounded-full object-cover border border-akcen-gray shadow-sm" alt="Avt" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-akcen-blue text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                                    {group.count}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold font-serif text-akcen-text truncate">{group.studentName}</h4>
                                <p className="text-[10px] text-akcen-muted font-medium">Needs Verification</p>
                            </div>
                            {isExpanded ? <ChevronDown size={16} className="text-akcen-muted"/> : <ChevronRight size={16} className="text-akcen-muted"/>}
                         </div>

                         {isExpanded && (
                             <div className="bg-akcen-white/30 border-t border-akcen-gray">
                                 {group.submissions.map(sub => (
                                     <div 
                                        key={sub.id}
                                        onClick={() => {
                                            setSelectedSubId(sub.id);
                                            setActiveStageIdx(0);
                                            setActivePageIdx(0);
                                        }}
                                        className={`pl-16 pr-4 py-3 cursor-pointer border-l-[3px] transition-all flex flex-col gap-1
                                            ${selectedSubId === sub.id 
                                                ? 'border-l-akcen-blue bg-blue-50/50' 
                                                : 'border-l-transparent hover:bg-akcen-white'
                                            }
                                        `}
                                     >
                                         <p className={`text-xs font-bold ${selectedSubId === sub.id ? 'text-akcen-blue' : 'text-akcen-text'}`}>
                                             {sub.worksheetTitle}
                                         </p>
                                         <div className="flex items-center gap-2">
                                            <span className="text-[9px] px-1.5 py-0.5 bg-akcen-gray rounded text-akcen-text font-bold">
                                                {sub.stages.length} Stages
                                            </span>
                                            {sub.aisuggestedScore && (
                                                <span className="text-[9px] px-1.5 py-0.5 bg-green-50 text-green-700 rounded font-bold flex items-center gap-1">
                                                    <Bot size={10}/> {sub.aisuggestedScore}%
                                                </span>
                                            )}
                                         </div>
                                     </div>
                                 ))}
                             </div>
                         )}
                     </div>
                 )
             })}
         </div>
      </div>

      {/* --- MIDDLE: WORKSPACE --- */}
      <div className="flex-1 flex flex-col bg-akcen-gray/30 relative min-w-0">
          
          {/* Top Bar: Stages & Scores */}
          <div className="bg-white border-b border-akcen-gray flex flex-col flex-shrink-0 z-10 shadow-sm">
              <div className="px-6 py-2 border-b border-akcen-gray/50 flex justify-between items-center h-16">
                  <div className="flex items-center gap-3">
                      {onToggleSidebar && (
                        <button onClick={onToggleSidebar} className="lg:hidden text-akcen-muted mr-2">
                            <Menu size={24} />
                        </button>
                      )}
                      <div className="flex flex-col">
                         <span className="text-sm font-serif font-bold text-akcen-text">{selectedSubmission.worksheetTitle}</span>
                         <div className="flex items-center gap-2 text-xs text-akcen-muted">
                            <span className="font-medium">{selectedSubmission.studentName}</span>
                         </div>
                      </div>
                  </div>
                  
                  {/* Stage Score Display */}
                  <div className="flex items-center gap-6">
                      <div className="flex flex-col items-end">
                          <span className="text-[10px] font-bold text-akcen-muted uppercase tracking-wider">Stage Average</span>
                          <span className={`text-xl font-serif font-bold ${currentStageScore >= 75 ? 'text-akcen-green' : 'text-akcen-blue'}`}>
                             {currentStageScore}%
                          </span>
                      </div>
                  </div>
              </div>

              {/* Stage Tabs */}
              <div className="flex px-6 pt-0 overflow-x-auto no-scrollbar bg-akcen-white/40">
                  {selectedSubmission.stages.map((stage, idx) => {
                      const isActive = activeStageIdx === idx;
                      // Calculate completion based on mentor verified pages
                      const verifiedPages = stage.pages.filter(p => p.mentorVerified).length;
                      const isComplete = verifiedPages === stage.pages.length;

                      return (
                          <button
                            key={stage.id}
                            onClick={() => { setActiveStageIdx(idx); setActivePageIdx(0); }}
                            className={`flex-1 min-w-[140px] py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap flex items-center justify-center gap-2 group
                                ${isActive ? 'border-akcen-blue text-akcen-blue bg-white' : 'border-transparent text-akcen-muted hover:text-akcen-text hover:bg-white/50'}
                            `}
                          >
                                {isComplete ? <CheckCircle2 size={14} className="text-akcen-green" /> : <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-akcen-blue' : 'bg-akcen-gray'}`}></div>}
                                <span className={`font-sans ${isActive ? 'font-bold' : ''}`}>Stage {idx + 1}</span>
                          </button>
                      )
                  })}
              </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 overflow-hidden flex flex-col relative bg-[#F0F2F5]">
             
             {/* Toolbar Overlay */}
             <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-white/90 backdrop-blur-md border border-akcen-gray shadow-lg rounded-full px-4 py-2 flex items-center gap-4 transition-all opacity-0 hover:opacity-100 focus-within:opacity-100">
                <button onClick={() => setZoomLevel(z => Math.max(0.5, z - 0.1))} className="p-1.5 hover:bg-akcen-gray rounded-full text-akcen-muted"><ZoomOut size={16}/></button>
                <span className="text-xs font-bold w-8 text-center">{Math.round(zoomLevel * 100)}%</span>
                <button onClick={() => setZoomLevel(z => Math.min(2, z + 0.1))} className="p-1.5 hover:bg-akcen-gray rounded-full text-akcen-muted"><ZoomIn size={16}/></button>
                <div className="w-px h-4 bg-akcen-gray"></div>
                <button onClick={() => setZoomLevel(1)} className="p-1.5 hover:bg-akcen-gray rounded-full text-akcen-muted"><RotateCcw size={16}/></button>
             </div>

             <div className="flex-1 overflow-auto p-8 flex justify-center items-start custom-scrollbar">
                 <div 
                    className="bg-white shadow-2xl border border-akcen-gray relative transition-transform duration-200 ease-out origin-top"
                    style={{ 
                        width: '100%', 
                        maxWidth: '800px',
                        transform: `scale(${zoomLevel})`
                    }}
                 >
                     <img 
                        src={currentPage.imageUrl} 
                        className="w-full h-auto block" 
                        alt={`Page ${currentPage.pageNumber}`} 
                     />
                     
                     <div className="absolute top-6 right-6 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-white text-[10px] font-bold shadow-lg uppercase tracking-wider">
                        Page {activePageIdx + 1} / {currentStage.pages.length}
                     </div>
                     
                     {currentPage.mentorVerified && (
                         <div className="absolute top-6 left-6 px-4 py-2 bg-green-500/90 text-white rounded-xl shadow-xl flex items-center gap-2 backdrop-blur-md animate-fade-in">
                             <ShieldCheck size={20} />
                             <span className="font-bold text-sm tracking-wide">VERIFIED</span>
                         </div>
                     )}
                 </div>
             </div>

             {/* Bottom Navigation Bar */}
             <div className="h-20 bg-white border-t border-akcen-gray flex items-center justify-between px-8 z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
                 <button 
                    onClick={handlePrevPage}
                    disabled={activeStageIdx === 0 && activePageIdx === 0}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-akcen-white disabled:opacity-30 disabled:cursor-not-allowed text-akcen-text font-bold text-sm transition-colors"
                 >
                    <ChevronLeft size={18} /> Previous
                 </button>
                 
                 <div className="flex items-center gap-1">
                     {currentStage.pages.map((_, idx) => (
                         <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === activePageIdx ? 'bg-akcen-blue w-6' : 'bg-akcen-gray'}`}></div>
                     ))}
                 </div>

                 <button 
                    onClick={handleNextPage}
                    disabled={activeStageIdx === selectedSubmission.stages.length -1 && activePageIdx === currentStage.pages.length - 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-akcen-white disabled:opacity-30 disabled:cursor-not-allowed text-akcen-text font-bold text-sm transition-colors"
                 >
                    Next <ChevronRight size={18} />
                 </button>
             </div>
          </div>
      </div>

      {/* --- RIGHT: AI VERIFICATION PANEL --- */}
      <div className="w-96 bg-white border-l border-akcen-gray flex flex-col flex-shrink-0 z-20 shadow-[-5px_0_30px_rgba(0,0,0,0.03)]">
         
         {/* AI Grading Header */}
         <div className="p-6 border-b border-akcen-gray bg-white">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-akcen-blue/10 text-akcen-blue rounded-xl">
                        <Bot size={20} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-akcen-text font-serif">AI Assessment</h3>
                        <p className="text-[10px] text-akcen-muted uppercase font-bold tracking-wider">Review Required</p>
                    </div>
                </div>
             </div>
             
             {/* Confidence Meter */}
             <div className="bg-akcen-white p-4 rounded-2xl border border-akcen-gray">
                 <div className="flex justify-between items-end mb-2">
                     <span className="text-xs font-bold text-akcen-muted uppercase">Confidence Score</span>
                     <span className={`text-sm font-bold ${currentPage.aiConfidence && currentPage.aiConfidence > 90 ? 'text-akcen-green' : 'text-orange-500'}`}>
                         {currentPage.aiConfidence}%
                     </span>
                 </div>
                 <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                     <div 
                         className={`h-full rounded-full transition-all duration-1000 ${currentPage.aiConfidence && currentPage.aiConfidence > 90 ? 'bg-akcen-green' : 'bg-orange-500'}`}
                         style={{ width: `${currentPage.aiConfidence}%` }}
                     ></div>
                 </div>
             </div>
         </div>

         {/* Tabs */}
         <div className="flex border-b border-akcen-gray bg-white">
             <button 
               onClick={() => setActiveTab('verify')}
               className={`flex-1 py-3 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors flex items-center justify-center gap-2
                 ${activeTab === 'verify' ? 'border-akcen-blue text-akcen-blue' : 'border-transparent text-akcen-muted hover:text-akcen-text'}
               `}
             >
                <ShieldCheck size={14} /> Verify
             </button>
             <button 
               onClick={() => setActiveTab('key')}
               className={`flex-1 py-3 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors flex items-center justify-center gap-2
                 ${activeTab === 'key' ? 'border-akcen-blue text-akcen-blue' : 'border-transparent text-akcen-muted hover:text-akcen-text'}
               `}
             >
                <FileText size={14} /> Answer Key
             </button>
         </div>

         <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-white">
             
             {/* VERIFICATION LIST */}
             {activeTab === 'verify' && (
                 <div className="space-y-4">
                    {currentPage.questions.map((q) => {
                        const isEdited = q.status !== q.aiVerdict;
                        return (
                            <div key={q.id} className="group flex items-center justify-between p-4 rounded-2xl border border-akcen-gray bg-white shadow-sm hover:shadow-md transition-all">
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-akcen-text text-white flex items-center justify-center font-bold text-sm font-serif shadow-md">
                                        {q.label}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-sm font-bold ${q.status === 'correct' ? 'text-akcen-green' : 'text-red-500'}`}>
                                                {q.status === 'correct' ? 'Correct' : 'Incorrect'}
                                            </span>
                                            {isEdited && (
                                                <span className="text-[9px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full border border-orange-200 font-bold uppercase tracking-wide">
                                                    Edited
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-[10px] text-akcen-muted flex items-center gap-1 mt-0.5">
                                            AI Verdict: <span className={`font-bold uppercase ${q.aiVerdict === 'correct' ? 'text-akcen-green' : 'text-red-500'}`}>{q.aiVerdict}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={() => handleToggleVerdict(q.id)}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all border
                                        ${q.status === 'correct' 
                                            ? 'bg-green-50 border-green-200 text-green-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200' 
                                            : 'bg-red-50 border-red-200 text-red-500 hover:bg-green-50 hover:text-green-600 hover:border-green-200'
                                        }`}
                                    title={q.status === 'correct' ? "Mark Incorrect" : "Mark Correct"}
                                >
                                    {q.status === 'correct' ? <Check size={20} strokeWidth={3} /> : <X size={20} strokeWidth={3} />}
                                </button>
                            </div>
                        );
                    })}
                 </div>
             )}

             {/* ANSWER KEY */}
             {activeTab === 'key' && (
                 <div className="space-y-4">
                    {currentAnswerKey.map((item, i) => (
                        <div key={i} className="p-4 bg-akcen-white/50 rounded-2xl border border-akcen-gray">
                            <h4 className="font-bold text-xs text-akcen-text mb-2 flex items-center gap-2">
                                <span className="bg-akcen-text text-white px-2 py-0.5 rounded-md text-[10px] shadow-sm">{item.q}</span>
                            </h4>
                            <p className="text-sm text-akcen-text/80 font-serif leading-relaxed">{item.a}</p>
                        </div>
                    ))}
                 </div>
             )}
         </div>

         {/* Bottom Actions */}
         <div className="p-6 border-t border-akcen-gray bg-white space-y-4 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
             <div className="flex justify-between items-center text-xs text-akcen-muted">
                <span className="uppercase tracking-wider font-bold">Current Score</span>
                <span className="text-akcen-text font-serif font-bold text-2xl">{currentPageScore}%</span>
             </div>

             {/* Dynamic Button based on stage progress */}
             {activePageIdx === currentStage.pages.length - 1 ? (
                <button 
                    onClick={handleFinalizeStage}
                    disabled={finalizingStage}
                    className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg
                        ${finalizingStage 
                            ? 'bg-akcen-green text-white scale-95' 
                            : 'bg-akcen-text text-white hover:bg-akcen-text/90 hover:scale-[1.02]'
                        }
                    `}
                >
                    {finalizingStage ? (
                         <> <CheckCircle2 size={18} className="animate-bounce" /> Finalizing... </>
                    ) : (
                         <> <CheckCircle2 size={18} /> Finalize Stage </>
                    )}
                </button>
             ) : (
                <button 
                    onClick={handleApprovePage}
                    className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg
                        ${currentPage.mentorVerified 
                            ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100' 
                            : 'bg-akcen-blue text-white hover:bg-akcen-blue/90 hover:scale-[1.02]'
                        }
                    `}
                >
                    {currentPage.mentorVerified ? (
                        <> <CheckCircle2 size={18} /> Verified - Go Next </>
                    ) : (
                        <> <ShieldCheck size={18} /> Approve AI Grading </>
                    )}
                </button>
             )}
         </div>

      </div>

    </div>
  );
};

export default GradingView;
